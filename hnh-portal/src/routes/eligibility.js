import { json } from '../utils/response.js';
import { claimlincEligibility, firstIdentifier } from '../utils/claimlinc.js';

// NPHIES Eligibility & Benefits (270/271) — via ClaimLinc
export async function checkEligibility(req, env) {
  const body = await req.json();

  const {
    patient_id,
    insurance_id,
    insurance_company,
    service_type,   // medical, dental, pharmacy, hospital
    provider_npi,
    national_id,
    branch,
  } = body;

  if (!insurance_id) {
    return json({ success: false, message: 'Insurance ID required' }, 400);
  }

  // Look up patient from DB
  let patient = null;
  if (patient_id) {
    patient = await env.DB.prepare('SELECT * FROM patients WHERE id = ?').bind(patient_id).first();
  }

  const transactionId = 'NPH-EB-' + Date.now().toString(36).toUpperCase();

  // === Attempt real ClaimLinc eligibility check ===
  let eligibilityResponse = null;
  const clData = await claimlincEligibility(env, {
    branch,
    identifier: firstIdentifier(national_id, patient?.national_id, insurance_id),
  });

  if (clData) {
    eligibilityResponse = {
      ...clData,
      transaction_id: transactionId,
      subscriber_id: insurance_id,
      insurance_company: insurance_company || null,
      service_type: service_type || 'medical',
      provider_npi: provider_npi || null,
      source: 'claimlinc-live',
    };
  }

  // === Fallback: structured mock response (clearly marked) ===
  if (!eligibilityResponse) {
    eligibilityResponse = {
      transaction_id: transactionId,
      source: 'fallback',
      warning: 'ClaimLinc unavailable — response is estimated, not live',
      subscriber: {
        insurance_id: insurance_id,
        name: patient ? (patient.full_name_en || patient.full_name_ar || 'Patient') : 'Patient',
        relationship: 'Self',
      },
      payer: {
        company: insurance_company || 'Unknown',
        payer_id: null,
      },
      status: 'unknown',
      coverage: {
        inpatient: { covered: null, deductible: null, co_pay_percentage: null, max_benefit: null },
        outpatient: { covered: null, deductible: null, co_pay_percentage: null },
        pharmacy: { covered: null, co_pay_percentage: null },
        dental: { covered: null, co_pay_percentage: null },
      },
      exclusions: [],
      effective_date: null,
      expiry_date: null,
      network: null,
    };
  }

  // Log the check
  try {
    if (env.DB) {
      await env.DB.prepare(
        `INSERT INTO eligibility_checks (id, patient_id, insurance_company, service_type, response_json, status)
         VALUES (?, ?, ?, ?, ?, ?)`
      ).bind(
        'ELG' + Date.now().toString(36).toUpperCase(),
        patient_id || null,
        insurance_company || null,
        service_type || 'medical',
        JSON.stringify(eligibilityResponse),
        eligibilityResponse.source === 'claimlinc-live' ? 'completed' : 'fallback'
      ).run();
    }
  } catch (e) {}

  return json({ success: true, eligibility: eligibilityResponse });
}

export async function verifyInsurance(req, env) {
  const body = await req.json();
  const { insurance_id, insurance_company, national_id, branch } = body;

  if (!insurance_id) {
    return json({ success: false, message: 'Insurance ID required' }, 400);
  }

  // Format validation (local, no API needed)
  const isValidFormat = insurance_id.length >= 8 && /^\d+$/.test(insurance_id.replace(/-/g, ''));

  if (!isValidFormat) {
    return json({
      success: true,
      verified: false,
      message: 'Insurance ID format invalid — must be numeric, minimum 8 digits',
    });
  }

  // Attempt ClaimLinc verification
  const clData = await claimlincEligibility(env, {
    branch,
    identifier: firstIdentifier(national_id, insurance_id),
    timeoutMs: 6000,
  });
  if (clData) {
    return json({
      success: true,
      verified: clData.status === 'active' || clData.verified === true || Number(clData.totalElements || clData.total || 0) > 0,
      details: clData,
      source: 'claimlinc-live',
    });
  }

  // Fallback: format-only verification
  return json({
    success: true,
    verified: true,
    source: 'format-only',
    warning: 'Live verification unavailable — format only checked',
    details: {
      company: insurance_company || 'Unknown',
      insurance_id: insurance_id,
    },
    message: 'Insurance ID format valid. Live network verification unavailable.',
  });
}

export async function getEligibilityHistory(req, env, ctx, params) {
  const patientId = params[0];
  const { results } = await env.DB.prepare(
    'SELECT * FROM eligibility_checks WHERE patient_id = ? ORDER BY check_date DESC LIMIT 20'
  ).bind(patientId).all();

  if (results) {
    for (const r of results) {
      try { r.response_json = JSON.parse(r.response_json); } catch (e) {}
    }
  }

  return json({ success: true, checks: results || [] });
}
