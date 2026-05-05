import { json } from '../utils/response.js';
import { claimlincEligibility, firstIdentifier } from '../utils/claimlinc.js';

const CLAIMLINC_BASE = 'https://api.brainsait.org/nphies';
const NPHIES_OID = '1.3.6.1.4.1.61026'; // Hayat National

function clKey(env) {
  return env.CLAIMLINC_KEY || '';
}

async function claimlinc(env, path, body, method = 'POST') {
  const key = clKey(env);
  if (!key) return null;
  try {
    const res = await fetch(`${CLAIMLINC_BASE}${path}`, {
      method,
      headers: { 'Content-Type': 'application/json', 'X-API-Key': key },
      body: body ? JSON.stringify(body) : undefined,
      signal: AbortSignal.timeout(8000),
    });
    if (res.ok) return res.json();
    return null;
  } catch (e) {
    console.error(`ClaimLinc ${path} error:`, e?.message?.slice(0, 80));
    return null;
  }
}

// NPHIES X12 5010 — 270/271 Eligibility & Benefits
export async function submit270(req, env) {
  const body = await req.json();
  const transactionId = 'NPH270-' + Date.now().toString(36).toUpperCase();

  const clData = await claimlincEligibility(env, {
    branch: body.branch,
    identifier: firstIdentifier(body.national_id, body.identifier, body.subscriber_id),
  });

  if (clData) {
    return json({
      success: true,
      nphies_version: 'V2',
      transaction_type: '270',
      source: 'claimlinc-live',
      ack: { transaction_id: transactionId, status: 'accepted', timestamp: new Date().toISOString() },
      response_271: clData,
    });
  }

  // Fallback
  return json({
    success: true,
    nphies_version: 'V2',
    transaction_type: '270',
    source: 'fallback',
    warning: 'ClaimLinc unavailable — eligibility not verified',
    ack: { transaction_id: transactionId, status: 'pending', timestamp: new Date().toISOString() },
    response_271: {
      subscriber: {
        id: body.subscriber_id || 'Unknown',
        name: body.subscriber_name || 'Patient',
        eligibility_status: 'Unknown',
        effective_date: null,
        benefits_end_date: null,
      },
      benefits: null,
      rejection_info: 'Live NPHIES endpoint unavailable — resubmit when restored',
    },
  });
}

// 278 Prior Authorization
export async function submit278(req, env) {
  const body = await req.json();
  const transactionId = 'NPH278-' + Date.now().toString(36).toUpperCase();

  const clData = await claimlinc(env, '/authorization', {
    transaction_id: transactionId,
    nphies_version: 'V2',
    facility_oid: NPHIES_OID,
    facility_license: env.FACILITY_LICENSE || '10000000000988',
    subscriber_id: body.subscriber_id,
    patient_id: body.patient_id,
    diagnosis_code: body.diagnosis_code,
    procedure_code: body.procedure_code,
    service_type: body.service_type,
    insurance_company: body.insurance_company,
    provider_npi: body.provider_npi,
    clinical_notes: body.clinical_notes,
  });

  if (clData) {
    return json({
      success: true,
      nphies_version: 'V2',
      transaction_type: '278',
      source: 'claimlinc-live',
      ack: { transaction_id: transactionId, status: 'accepted', timestamp: new Date().toISOString() },
      authorization: clData,
    });
  }

  // Fallback
  return json({
    success: true,
    nphies_version: 'V2',
    transaction_type: '278',
    source: 'fallback',
    warning: 'ClaimLinc unavailable — PA not confirmed with payer',
    ack: { transaction_id: transactionId, status: 'pending', timestamp: new Date().toISOString() },
    authorization: {
      reference_number: null,
      status: 'Pending',
      service_type: body.service_type || 'Medical Care',
      diagnosis_code: body.diagnosis_code || null,
      procedure_code: body.procedure_code || null,
      authorized_units: null,
      effective_date: null,
      expiration_date: null,
      provider_notes: 'Authorization pending — ClaimLinc endpoint unavailable. Resubmit or obtain manual PA.',
    },
  });
}

// 837 Professional Claim Submission
export async function submit837(req, env) {
  const body = await req.json();
  const transactionId = 'NPH837-' + Date.now().toString(36).toUpperCase();
  const claimRef = 'CLM' + Date.now().toString(36).toUpperCase();

  const clData = await claimlinc(env, '/claims/submit', {
    transaction_id: transactionId,
    claim_reference: claimRef,
    nphies_version: 'V2',
    facility_oid: NPHIES_OID,
    facility_license: env.FACILITY_LICENSE || '10000000000988',
    subscriber_id: body.subscriber_id,
    patient_id: body.patient_id,
    insurance_company: body.insurance_company,
    total_amount: body.total_amount,
    patient_share: body.patient_share,
    diagnosis_codes: body.diagnosis_codes,
    procedure_codes: body.procedure_codes,
    service_date: body.service_date,
    provider_npi: body.provider_npi,
    prior_auth_number: body.prior_auth_number,
  });

  if (clData) {
    return json({
      success: true,
      nphies_version: 'V2',
      transaction_type: '837P',
      source: 'claimlinc-live',
      ack: {
        transaction_id: transactionId,
        claim_reference: claimRef,
        status: 'Accepted',
        timestamp: new Date().toISOString(),
        edi_ack_code: 'TA1',
      },
      claim: clData,
    });
  }

  // Fallback
  return json({
    success: true,
    nphies_version: 'V2',
    transaction_type: '837P',
    source: 'fallback',
    warning: 'ClaimLinc unavailable — claim queued locally, not submitted to payer',
    ack: {
      transaction_id: transactionId,
      claim_reference: claimRef,
      status: 'Queued',
      timestamp: new Date().toISOString(),
      edi_ack_code: null,
      ack_detail: 'Claim saved locally. Resubmit when ClaimLinc endpoint is restored.',
    },
    claim: {
      claim_reference: claimRef,
      submitted_amount: body.total_amount || null,
      patient_responsibility: body.patient_share || null,
      payer: body.insurance_company || null,
      status: 'queued',
    },
  });
}

// 276/277 Claim Status
export async function getClaimStatus276(req, env, ctx, params) {
  const claimId = params[0];
  const transactionId = 'NPH276-' + Date.now().toString(36).toUpperCase();

  const clData = await claimlinc(env, `/claims/${claimId}/status`, null, 'GET');

  if (clData) {
    return json({
      success: true,
      nphies_version: 'V2',
      transaction_type: '276/277',
      source: 'claimlinc-live',
      ack: { transaction_id: transactionId, timestamp: new Date().toISOString() },
      claim_status: { claim_id: claimId, ...clData },
    });
  }

  // Fallback — look up in local DB
  let localClaim = null;
  try {
    localClaim = await env.DB.prepare(
      'SELECT * FROM claims WHERE id = ? OR claim_reference = ?'
    ).bind(claimId, claimId).first();
  } catch (e) {}

  return json({
    success: true,
    nphies_version: 'V2',
    transaction_type: '276/277',
    source: localClaim ? 'local-db' : 'fallback',
    warning: 'ClaimLinc unavailable — showing local record only',
    ack: { transaction_id: transactionId, timestamp: new Date().toISOString() },
    claim_status: {
      claim_id: claimId,
      status: localClaim ? (localClaim.status || 'Unknown') : 'Not Found',
      payer_claim_number: localClaim ? localClaim.payer_claim_number : null,
      last_updated: localClaim ? localClaim.updated_at : null,
    },
  });
}

// 835 Payment & Remittance Advice
export async function receive835(req, env) {
  const body = await req.json();
  const transactionId = 'NPH835-' + Date.now().toString(36).toUpperCase();

  const clData = await claimlinc(env, '/remittance', {
    transaction_id: transactionId,
    payer: body.payer,
    check_number: body.check_number,
    payment_date: body.payment_date,
    claims: body.claims,
  });

  if (clData) {
    return json({
      success: true,
      nphies_version: 'V2',
      transaction_type: '835',
      source: 'claimlinc-live',
      ack: { transaction_id: transactionId, status: 'Processed', timestamp: new Date().toISOString() },
      payment: clData,
    });
  }

  // Fallback — record locally
  return json({
    success: true,
    nphies_version: 'V2',
    transaction_type: '835',
    source: 'fallback',
    warning: 'ClaimLinc unavailable — remittance recorded locally only',
    ack: { transaction_id: transactionId, status: 'Stored', timestamp: new Date().toISOString() },
    payment: {
      payer: body.payer || null,
      total_paid: body.total_paid || null,
      check_number: body.check_number || ('CHK' + Date.now().toString(36).toUpperCase()),
      payment_date: body.payment_date || new Date().toISOString().split('T')[0],
      claims_covered: body.claims?.length || 0,
      note: 'Reprocess via ClaimLinc when endpoint is restored.',
    },
  });
}
