// HNH Gharnata Branch - API Gateway Worker with Oracle/NPHIES Integration
// Version: 2.0

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-API-Key, X-Hospital, X-Session-ID',
};
const JSON_HEADERS = { ...CORS, 'Content-Type': 'application/json' };

// ─── Oracle Bridge Client ─────────────────────────────────────────────────
function oracleBridge(env, path, options = {}) {
  const base = env.ORACLE_BRIDGE_URL || 'https://oracle-bridge.brainsait.org';
  const url = `${base}${path}`;
  return fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': env.ORACLE_API_KEY || '',
      'X-Hospital': 'gharnata',
      ...options.headers,
    },
    ...options,
  });
}

// ─── NPHIES Mirror Client ─────────────────────────────────────────────────
async function nphiesLookup(env, type, branch = 'gharnata') {
  const base = env.NPHIES_MIRROR_URL || 'https://nphies-mirror.brainsait-fadil.workers.dev';
  try {
    const res = await fetch(`${base}/${type}/${branch}`);
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

// ─── Eligibility ───────────────────────────────────────────────────────────
async function handleEligibility(request, env) {
  const data = await request.json();
  const { patient_id, national_id } = data;

  // Try DB cache first
  const cached = await env.DB.prepare(
    'SELECT * FROM eligibility_checks WHERE patient_id = ? ORDER BY check_date DESC LIMIT 1'
  ).bind(patient_id || '').first();

  if (cached) {
    const age = (Date.now() - new Date(cached.check_date).getTime()) / 3600000;
    if (age < 24) {
      return new Response(JSON.stringify({ eligibility: cached, source: 'cache' }), { headers: JSON_HEADERS });
    }
  }

  // Try Oracle Bridge
  try {
    const oracleRes = await oracleBridge(env, '/api/eligibility', {
      method: 'POST',
      body: JSON.stringify({ national_id, patient_id, facility_license: '10000000000988' }),
    });
    if (oracleRes.ok) {
      const result = await oracleRes.json();
      await env.DB.prepare(
        'INSERT INTO eligibility_checks (patient_id, status, check_date, source, response_data) VALUES (?, ?, datetime(\'now\'), ?, ?)'
      ).bind(patient_id, result.status || 'eligible', 'oracle', JSON.stringify(result)).run();
      return new Response(JSON.stringify({ eligibility: result, source: 'oracle' }), { headers: JSON_HEADERS });
    }
  } catch {}

  // Fallback to NPHIES Mirror
  const nphiesData = await nphiesLookup(env, 'gss');
  return new Response(JSON.stringify({
    eligibility: { status: 'pending', note: 'Real-time check unavailable, using cached data' },
    source: 'nphies-mirror',
    nphies: nphiesData,
  }), { headers: JSON_HEADERS });
}

// ─── Patients ──────────────────────────────────────────────────────────────
async function handlePatients(request, env) {
  const url = new URL(request.url);
  const method = request.method;

  if (method === 'GET') {
    const search = url.searchParams.get('search');
    let result;
    if (search) {
      result = await env.DB.prepare(
        `SELECT * FROM patients WHERE is_active = 1 AND (
          full_name_ar LIKE ? OR full_name_en LIKE ? OR national_id LIKE ? OR mrn LIKE ? OR phone LIKE ?
        ) ORDER BY created_at DESC LIMIT 50`
      ).bind(`%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`).all();
    } else {
      result = await env.DB.prepare('SELECT * FROM patients WHERE is_active = 1 ORDER BY created_at DESC LIMIT 100').all();
    }
    return new Response(JSON.stringify({ patients: result.results }), { headers: JSON_HEADERS });
  }

  if (method === 'POST') {
    const data = await request.json();
    data.full_name_ar = data.full_name_ar || `${data.first_name_ar || ''} ${data.last_name_ar || ''}`.trim();
    data.full_name_en = data.full_name_en || `${data.first_name_en || ''} ${data.last_name_en || ''}`.trim();
    const mrn = data.mrn || `HNH-${Date.now()}`;

    // Register in Oracle PMI
    let oracleId = null;
    try {
      const oracleRes = await oracleBridge(env, '/api/pmi/register', {
        method: 'POST',
        body: JSON.stringify({
          national_id: data.national_id,
          first_name_en: data.first_name_en,
          last_name_en: data.last_name_en,
          first_name_ar: data.first_name_ar,
          last_name_ar: data.last_name_ar,
          date_of_birth: data.date_of_birth,
          gender: data.gender,
          phone: data.phone,
          email: data.email,
        }),
      });
      if (oracleRes.ok) {
        const or = await oracleRes.json();
        oracleId = or.patient_id || or.id;
      }
    } catch {}

    const result = await env.DB.prepare(
      'INSERT INTO patients (mrn, national_id, first_name_ar, first_name_en, last_name_ar, last_name_en, full_name_ar, full_name_en, date_of_birth, gender, phone, email, oracle_patient_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
    ).bind(mrn, data.national_id, data.first_name_ar, data.first_name_en, data.last_name_ar, data.last_name_en, data.full_name_ar, data.full_name_en, data.date_of_birth, data.gender, data.phone, data.email, oracleId).run();

    const patientId = result.meta.last_row_id;

    // Enrich: check eligibility automatically (fire-and-forget)
    oracleBridge(env, '/api/eligibility', {
      method: 'POST',
      body: JSON.stringify({ national_id: data.national_id, patient_id: patientId, facility_license: '10000000000988' }),
    }).catch(() => {});

    return new Response(JSON.stringify({ success: true, id: patientId, mrn, oracle_synced: !!oracleId }), { headers: JSON_HEADERS });
  }

  return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405, headers: JSON_HEADERS });
}

// ─── Appointments ──────────────────────────────────────────────────────────
async function handleAppointments(request, env) {
  const url = new URL(request.url);
  const method = request.method;

  if (method === 'GET') {
    const date = url.searchParams.get('date') || new Date().toISOString().split('T')[0];
    const result = await env.DB.prepare(
      `SELECT a.*, p.full_name_ar as patient_name, p.national_id 
       FROM appointments a LEFT JOIN patients p ON a.patient_id = p.id 
       WHERE a.appointment_date = ? ORDER BY a.appointment_time`
    ).bind(date).all();
    return new Response(JSON.stringify({ appointments: result.results, date }), { headers: JSON_HEADERS });
  }

  if (method === 'POST') {
    const data = await request.json();
    const result = await env.DB.prepare(
      'INSERT INTO appointments (patient_id, provider_id, clinic_code, clinic_name, appointment_date, appointment_time, appointment_type, reason, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
    ).bind(data.patient_id, data.provider_id, data.clinic_code, data.clinic_name, data.appointment_date, data.appointment_time, data.appointment_type, data.reason, 'scheduled').run();

    // Sync to Oracle OPD (fire-and-forget)
    env.DB.prepare('SELECT full_name_ar, national_id FROM patients WHERE id = ?').bind(data.patient_id).first().then(patient => {
      oracleBridge(env, '/api/opd/book', {
        method: 'POST',
        body: JSON.stringify({
          patient_id: data.patient_id,
          patient_name: patient?.full_name_ar,
          national_id: patient?.national_id,
          clinic_code: data.clinic_code,
          appointment_date: data.appointment_date,
          appointment_time: data.appointment_time,
          appointment_type: data.appointment_type,
          reason: data.reason,
        }),
      }).catch(() => {});
    }).catch(() => {});

    return new Response(JSON.stringify({ success: true, id: result.meta.last_row_id }), { headers: JSON_HEADERS });
  }

  return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405, headers: JSON_HEADERS });
}

// ─── Claims ────────────────────────────────────────────────────────────────
async function handleClaims(request, env) {
  const method = request.method;

  if (method === 'GET') {
    const result = await env.DB.prepare(
      `SELECT c.*, p.full_name_ar as patient_name 
       FROM claims c LEFT JOIN patients p ON c.patient_id = p.id 
       ORDER BY c.created_at DESC LIMIT 100`
    ).all();
    return new Response(JSON.stringify({ claims: result.results }), { headers: JSON_HEADERS });
  }

  if (method === 'POST') {
    const data = await request.json();
    const claimNumber = 'CLM-' + Date.now();

    const result = await env.DB.prepare(
      'INSERT INTO claims (patient_id, visit_id, claim_number, claim_type, payer_id, payer_name, total_amount, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
    ).bind(data.patient_id, data.visit_id, claimNumber, data.claim_type, data.payer_id, data.payer_name, data.total_amount, 'draft').run();

    const claimId = result.meta.last_row_id;

    // Auto-submit to NPHIES via Oracle Bridge (fire-and-forget)
    oracleBridge(env, '/api/claims/submit', {
      method: 'POST',
      body: JSON.stringify({
        claim_id: claimId,
        claim_number: claimNumber,
        patient_id: data.patient_id,
        payer_id: data.payer_id,
        total_amount: data.total_amount,
        claim_type: data.claim_type,
        facility_license: '10000000000988',
      }),
    }).then(async (submitRes) => {
      if (submitRes.ok) {
        const submitData = await submitRes.json();
        await env.DB.prepare(
          'UPDATE claims SET status = ?, nphies_ref = ?, updated_at = datetime(\'now\') WHERE id = ?'
        ).bind(submitData.status || 'submitted', submitData.nphies_reference || null, claimId).run();
      }
    }).catch(() => {});

    return new Response(JSON.stringify({ success: true, id: claimId, claim_number: claimNumber }), { headers: JSON_HEADERS });
  }

  return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405, headers: JSON_HEADERS });
}

// ─── Providers ─────────────────────────────────────────────────────────────
async function handleProviders(request, env) {
  const result = await env.DB.prepare('SELECT * FROM providers WHERE is_active = 1').all();
  return new Response(JSON.stringify({ providers: result.results }), { headers: JSON_HEADERS });
}

// ─── Departments ───────────────────────────────────────────────────────────
async function handleDepartments(request, env) {
  const result = await env.DB.prepare('SELECT * FROM departments WHERE is_active = 1').all();
  return new Response(JSON.stringify({ departments: result.results }), { headers: JSON_HEADERS });
}

// ─── NPHIES Mirror Proxy ───────────────────────────────────────────────────
async function handleNphiesProxy(request, env) {
  const url = new URL(request.url);
  const type = url.pathname.replace('/api/nphies/', '');
  const data = await nphiesLookup(env, type);
  return new Response(JSON.stringify({ data, type, source: 'nphies-mirror' }), { headers: JSON_HEADERS });
}

// ─── Oracle Config ─────────────────────────────────────────────────────────
async function handleOracleConfig(env) {
  return new Response(JSON.stringify({
    base_url: env.ORACLE_BRIDGE_URL || 'https://oracle-bridge.brainsait.org',
    hospital: 'Hayat National Hospital - Gharnata',
    facility_license: '10000000000988',
    modules: ['pmi', 'opd', 'adt', 'lab', 'radiology', 'pharmacy', 'billing', 'nursing', 'consent'],
  }), { headers: JSON_HEADERS });
}

// ─── Schema (for /api/schema) ──────────────────────────────────────────────
async function handleSchema(env) {
  const tables = ['patients', 'appointments', 'claims', 'providers', 'departments', 'eligibility_checks', 'rag_documents'];
  const info = {};
  for (const table of tables) {
    const res = await env.DB.prepare(`SELECT COUNT(*) as count FROM ${table}`).first().catch(() => ({ count: 0 }));
    info[table] = { count: res?.count || 0 };
  }
  return new Response(JSON.stringify({ database: 'hnh-gharnata', tables: info }), { headers: JSON_HEADERS });
}

// ─── Router ────────────────────────────────────────────────────────────────
export default {
  async fetch(request, env, ctx) {
    return handleRequest(request, env, ctx);
  }
};

async function handleRequest(request, env, ctx) {
  const url = new URL(request.url);
  const path = url.pathname;
  const method = request.method;

  if (method === 'OPTIONS') {
    return new Response(null, { headers: CORS });
  }

  if (path === '/health' || path === '/') {
    return new Response(JSON.stringify({
      status: 'healthy',
      service: 'hnh-gharnata-api',
      version: '2.0.0',
      timestamp: new Date().toISOString(),
      integrations: {
        oracle: !!(env.ORACLE_BRIDGE_URL),
        nphies: !!(env.NPHIES_MIRROR_URL),
        d1: true,
      }
    }), { headers: JSON_HEADERS });
  }

  try {
    if (path.startsWith('/api/patients')) return await handlePatients(request, env, ctx);
    if (path.startsWith('/api/appointments')) return await handleAppointments(request, env, ctx);
    if (path.startsWith('/api/eligibility')) return await handleEligibility(request, env, ctx);
    if (path.startsWith('/api/claims')) return await handleClaims(request, env, ctx);
    if (path.startsWith('/api/providers')) return await handleProviders(request, env);
    if (path.startsWith('/api/departments')) return await handleDepartments(request, env);
    if (path.startsWith('/api/nphies/')) return await handleNphiesProxy(request, env);
    if (path === '/api/oracle-config') return await handleOracleConfig(env);
    if (path === '/api/schema') return await handleSchema(env);
    return new Response(JSON.stringify({ error: 'Not found' }), { status: 404, headers: JSON_HEADERS });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: JSON_HEADERS });
  }
}
