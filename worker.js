// HNH Gharnata Branch - API Gateway Worker
// Version: 1.0

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-API-Key',
};

const jsonHeaders = { ...corsHeaders, 'Content-Type': 'application/json' };

async function handlePatients(request, env) {
  const url = new URL(request.url);
  const method = request.method;

  if (method === 'GET' && url.pathname === '/api/patients') {
    const result = await env.DB.prepare('SELECT * FROM patients WHERE is_active = 1 ORDER BY created_at DESC LIMIT 100').all();
    return new Response(JSON.stringify({ patients: result.results }), { headers: jsonHeaders });
  }

  if (method === 'POST' && url.pathname === '/api/patients') {
    const data = await request.json();
    const result = await env.DB.prepare(
      'INSERT INTO patients (mrn, national_id, first_name_ar, first_name_en, last_name_ar, last_name_en, full_name_ar, full_name_en, date_of_birth, gender, phone, email) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
    ).bind(data.mrn, data.national_id, data.first_name_ar, data.first_name_en, data.last_name_ar, data.last_name_en, data.full_name_ar, data.full_name_en, data.date_of_birth, data.gender, data.phone, data.email).run();
    return new Response(JSON.stringify({ success: true, id: result.meta.last_row_id }), { headers: jsonHeaders });
  }

  return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405, headers: jsonHeaders });
}

async function handleAppointments(request, env) {
  const url = new URL(request.url);
  const method = request.method;

  if (method === 'GET') {
    const date = url.searchParams.get('date') || new Date().toISOString().split('T')[0];
    const result = await env.DB.prepare(
      'SELECT a.*, p.full_name_ar as patient_name FROM appointments a LEFT JOIN patients p ON a.patient_id = p.id WHERE a.appointment_date = ? ORDER BY a.appointment_time'
    ).bind(date).all();
    return new Response(JSON.stringify({ appointments: result.results, date }), { headers: jsonHeaders });
  }

  if (method === 'POST') {
    const data = await request.json();
    const result = await env.DB.prepare(
      'INSERT INTO appointments (patient_id, provider_id, clinic_code, clinic_name, appointment_date, appointment_time, appointment_type, reason) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
    ).bind(data.patient_id, data.provider_id, data.clinic_code, data.clinic_name, data.appointment_date, data.appointment_time, data.appointment_type, data.reason).run();
    return new Response(JSON.stringify({ success: true, id: result.meta.last_row_id }), { headers: jsonHeaders });
  }

  return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405, headers: jsonHeaders });
}

async function handleClaims(request, env) {
  const method = request.method;

  if (method === 'GET') {
    const result = await env.DB.prepare(
      'SELECT c.*, p.full_name_ar as patient_name FROM claims c LEFT JOIN patients p ON c.patient_id = p.id ORDER BY c.created_at DESC LIMIT 100'
    ).all();
    return new Response(JSON.stringify({ claims: result.results }), { headers: jsonHeaders });
  }

  if (method === 'POST') {
    const data = await request.json();
    const claimNumber = 'CLM-' + Date.now();
    const result = await env.DB.prepare(
      'INSERT INTO claims (patient_id, visit_id, claim_number, claim_type, payer_id, payer_name, total_amount, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
    ).bind(data.patient_id, data.visit_id, claimNumber, data.claim_type, data.payer_id, data.payer_name, data.total_amount, 'draft').run();
    return new Response(JSON.stringify({ success: true, id: result.meta.last_row_id, claim_number: claimNumber }), { headers: jsonHeaders });
  }

  return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405, headers: jsonHeaders });
}

async function handleProviders(request, env) {
  const result = await env.DB.prepare('SELECT * FROM providers WHERE is_active = 1').all();
  return new Response(JSON.stringify({ providers: result.results }), { headers: jsonHeaders });
}

async function handleDepartments(request, env) {
  const result = await env.DB.prepare('SELECT * FROM departments WHERE is_active = 1').all();
  return new Response(JSON.stringify({ departments: result.results }), { headers: jsonHeaders });
}

async function handleEligibility(request, env) {
  const data = await request.json();
  const result = await env.DB.prepare(
    'SELECT * FROM eligibility_checks WHERE patient_id = ? ORDER BY check_date DESC LIMIT 1'
  ).bind(data.patient_id).first();
  return new Response(JSON.stringify({ eligibility: result || { status: 'pending' }, source: result ? 'cache' : 'oracle' }), { headers: jsonHeaders });
}

export default {
  async fetch(request, env, ctx) {
    return handleRequest(request, env);
  }
};

async function handleRequest(request, env) {
  const url = new URL(request.url);
  const path = url.pathname;
  const method = request.method;

  if (method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (path === '/health' || path === '/') {
    return new Response(JSON.stringify({
      status: 'healthy',
      service: 'hnh-gharnata-api',
      version: '1.0.0',
      timestamp: new Date().toISOString()
    }), { headers: jsonHeaders });
  }

  try {
    if (path.startsWith('/api/patients')) return await handlePatients(request, env);
    if (path.startsWith('/api/appointments')) return await handleAppointments(request, env);
    if (path.startsWith('/api/eligibility')) return await handleEligibility(request, env);
    if (path.startsWith('/api/claims')) return await handleClaims(request, env);
    if (path.startsWith('/api/providers')) return await handleProviders(request, env);
    if (path.startsWith('/api/departments')) return await handleDepartments(request, env);
    return new Response(JSON.stringify({ error: 'Not found' }), { status: 404, headers: jsonHeaders });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: jsonHeaders });
  }
}
