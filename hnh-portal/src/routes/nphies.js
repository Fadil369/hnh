import { json } from '../utils/response.js';

// NPHIES X12 5010 format endpoints
// 270/271 Eligibility & Benefits
export async function submit270(req, env) {
  const body = await req.json();
  
  // Mock X12 270 request acknowledgment
  const transactionId = 'NPH270-' + Date.now().toString(36).toUpperCase();
  
  const response271 = {
    nphies_version: 'V2',
    transaction_type: '270',
    ack: {
      transaction_id: transactionId,
      status: 'accepted',
      timestamp: new Date().toISOString(),
    },
    response_271: {
      subscriber: {
        id: body.subscriber_id || 'Unknown',
        name: body.subscriber_name || 'Patient',
        eligibility_status: 'Active',
        effective_date: '2026-01-01',
        benefits_end_date: '2026-12-31',
      },
      benefits: {
        inpatient: { status: 'Active', deductible: 1000, co_pay: '10%', max_benefit: 500000 },
        outpatient: { status: 'Active', deductible: 200, co_pay: '20%', max_visits: 12 },
        emergency: { status: 'Active', deductible: 0, co_pay: '10%' },
        pharmacy: { status: 'Active', co_pay: '15%', max_annual: 10000 },
      },
      rejection_info: null,
    },
    raw_x12: 'ISA*00*          *00*          *ZZ*PAYER         *ZZ*PROVIDER       *...',
  };

  return json({ success: true, ...response271 });
}

// 278 Prior Authorization
export async function submit278(req, env) {
  const body = await req.json();
  const transactionId = 'NPH278-' + Date.now().toString(36).toUpperCase();
  
  const response = {
    nphies_version: 'V2',
    transaction_type: '278',
    ack: {
      transaction_id: transactionId,
      status: 'accepted',
      timestamp: new Date().toISOString(),
    },
    authorization: {
      reference_number: 'AUTH-' + Date.now().toString(36).toUpperCase(),
      status: 'Approved',
      service_type: body.service_type || 'Medical Care',
      diagnosis_code: body.diagnosis_code || 'Z00.00',
      procedure_code: body.procedure_code || '99213',
      authorized_units: 1,
      effective_date: new Date().toISOString().split('T')[0],
      expiration_date: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
      provider_notes: 'Prior authorization approved per clinical guidelines.',
    },
    raw_x12: 'ISA*00*          *00*          *ZZ*PAYER         *ZZ*PROVIDER       *...',
  };

  return json({ success: true, ...response });
}

// 837 Professional Claim Submission
export async function submit837(req, env) {
  const body = await req.json();
  const transactionId = 'NPH837-' + Date.now().toString(36).toUpperCase();
  const claimRef = 'CLM' + Date.now().toString(36).toUpperCase();

  const response = {
    nphies_version: 'V2',
    transaction_type: '837P',
    ack: {
      transaction_id: transactionId,
      claim_reference: claimRef,
      status: 'Accepted',
      timestamp: new Date().toISOString(),
      edi_ack_code: 'TA1',
      ack_detail: 'Claim accepted for processing. Acknowledgment sent.',
    },
    claim: {
      claim_reference: claimRef,
      submitted_amount: body.total_amount || 1000.00,
      patient_responsibility: body.patient_share || 0,
      payer: body.insurance_company || 'Bupa Arabia',
      status: 'acknowledged',
    },
    raw_x12: 'ISA*00*          *00*          *ZZ*PAYER         *ZZ*PROVIDER       *...',
  };

  return json({ success: true, ...response });
}

// 276/277 Claim Status
export async function getClaimStatus276(req, env, ctx, params) {
  const claimId = params[0];
  const transactionId = 'NPH276-' + Date.now().toString(36).toUpperCase();
  
  const statuses = ['Processed', 'Pending Review', 'Partially Paid', 'Denied', 'Paid in Full'];
  
  const response = {
    nphies_version: 'V2',
    transaction_type: '276/277',
    ack: {
      transaction_id: transactionId,
      timestamp: new Date().toISOString(),
    },
    claim_status: {
      claim_id: claimId,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      payer_claim_number: 'PCN-' + claimId,
      patient_responsibility: Math.random() * 500,
      paid_amount: Math.random() * 5000,
      pending_amount: Math.random() * 2000,
      last_updated: new Date().toISOString(),
    },
  };

  return json({ success: true, ...response });
}

// 835 Payment & Remittance Advice
export async function receive835(req, env) {
  const body = await req.json();
  const transactionId = 'NPH835-' + Date.now().toString(36).toUpperCase();

  const response = {
    nphies_version: 'V2',
    transaction_type: '835',
    ack: {
      transaction_id: transactionId,
      status: 'Processed',
      timestamp: new Date().toISOString(),
    },
    payment: {
      payer: body.payer || 'Bupa Arabia',
      total_paid: body.total_paid || 5000.00,
      check_number: 'CHK' + Date.now().toString(36).toUpperCase(),
      payment_date: new Date().toISOString().split('T')[0],
      claims_covered: body.claims_covered || 3,
      claims_denied: 0,
      adjustment_reason: 'Contractual adjustment - 90% coverage applied',
    },
  };

  return json({ success: true, ...response });
}
