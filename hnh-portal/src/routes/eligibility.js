import { json } from '../utils/response.js';

// NPHIES Eligibility & Benefits (270/271)
export async function checkEligibility(req, env) {
  const body = await req.json();
  
  const {
    patient_id,
    insurance_id,
    insurance_company,
    service_type,  // medical, dental, pharmacy, hospital
    provider_npi,
  } = body;

  if (!insurance_id) {
    return json({ success: false, message: 'Insurance ID required' }, 400);
  }

  // Look up patient
  let patient = null;
  if (patient_id) {
    patient = await env.DB.prepare('SELECT * FROM patients WHERE id = ?').bind(patient_id).first();
  }

  // Mock 271 response
  const eligibilityResponse = {
    transaction_id: 'NPH-EB-' + Date.now().toString(36).toUpperCase(),
    subscriber: {
      insurance_id: insurance_id,
      name: patient ? patient.name_ar : 'Patient',
      relationship: 'Self',
    },
    payer: {
      company: insurance_company || 'Bupa Arabia',
      payer_id: 'BUPA001',
    },
    status: 'active',
    coverage: {
      inpatient: {
        covered: true,
        deductible: 1000,
        deductible_remaining: 500,
        co_pay_percentage: 10,
        max_benefit: 500000,
        max_benefit_remaining: 350000,
      },
      outpatient: {
        covered: true,
        deductible: 200,
        deductible_remaining: 100,
        co_pay_percentage: 20,
        max_visits: 12,
        visits_remaining: 8,
      },
      pharmacy: {
        covered: true,
        co_pay_percentage: 15,
        max_annual: 10000,
      },
      dental: {
        covered: service_type === 'dental',
        co_pay_percentage: 20,
        max_annual: 5000,
      },
    },
    exclusions: [
      'Pre-existing conditions (first 6 months)',
      'Cosmetic surgery',
      'Experimental treatments',
    ],
    effective_date: '2026-01-01',
    expiry_date: '2026-12-31',
    network: 'Preferred Provider Network',
  };

  // Log the check
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
      'completed'
    ).run();
  }

  return json({ success: true, eligibility: eligibilityResponse });
}

export async function verifyInsurance(req, env) {
  const body = await req.json();
  const { insurance_id, insurance_company } = body;

  if (!insurance_id) {
    return json({ success: false, message: 'Insurance ID required' }, 400);
  }

  const mockCompanies = [
    { name: 'Bupa Arabia', id: 'BUPA', network: 'Gold', coverage: 90 },
    { name: 'Tawuniya', id: 'TAW', network: 'Platinum', coverage: 100 },
    { name: 'MedGulf', id: 'MED', network: 'Silver', coverage: 75 },
    { name: 'Allianz Saudi Fransi', id: 'ASF', network: 'Gold', coverage: 85 },
    { name: 'GlobeMed', id: 'GLB', network: 'Basic', coverage: 60 },
    { name: 'Amana', id: 'AMA', network: 'Premium', coverage: 95 },
    { name: 'Arabian Shield', id: 'AS', network: 'Gold', coverage: 80 },
    { name: 'Sagr', id: 'SGR', network: 'Silver', coverage: 70 },
    { name: 'GIG Gulf', id: 'GIG', network: 'Platinum', coverage: 90 },
    { name: 'Walaa', id: 'WAL', network: 'Basic', coverage: 50 },
  ];

  const company = mockCompanies.find(c => 
    insurance_company ? c.name.toLowerCase().includes(insurance_company.toLowerCase()) : true
  ) || mockCompanies[0];

  const isValid = insurance_id.length >= 8 && /^\d+$/.test(insurance_id.replace(/-/g, ''));

  return json({
    success: true,
    verified: isValid,
    details: isValid ? {
      company: company.name,
      network: company.network,
      coverage_percentage: company.coverage,
      insurance_id: insurance_id,
      valid_until: '2026-12-31',
      member_since: '2024-01-01',
    } : null,
    message: isValid ? 'Insurance verified successfully' : 'Insurance ID format invalid',
  });
}

export async function getEligibilityHistory(req, env, ctx, params) {
  const patientId = params[0];
  const { results } = await env.DB.prepare(
    'SELECT * FROM eligibility_checks WHERE patient_id = ? ORDER BY check_date DESC LIMIT 20'
  ).bind(patientId).all();

  if (results) {
    for (const r of results) {
      try { r.response_json = JSON.parse(r.response_json); } catch(e) {}
    }
  }

  return json({ success: true, checks: results || [] });
}
