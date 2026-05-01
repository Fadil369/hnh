// HNH Unified Hub — API Gateway Worker
// Portals: BSMA (Patient) · GIVC (Provider) · SBS (Billing/RCM) · NPHIES · Oracle
// Version: 3.0

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-API-Key, X-Hospital, X-Session-ID, X-Portal',
};
const JSON_HEADERS = { ...CORS, 'Content-Type': 'application/json' };

const FACILITY_LICENSE = '10000000000988';
const HOSPITAL_NAME = 'Hayat National Hospital - Gharnata';

// ─── Oracle Bridge Client ─────────────────────────────────────────────────
function oracleBridge(env, path, options = {}) {
  const base = env.ORACLE_BRIDGE_URL || 'https://oracle-bridge.brainsait.org';
  return fetch(`${base}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': env.ORACLE_API_KEY || '',
      'X-Hospital': 'gharnata',
      'X-Facility': FACILITY_LICENSE,
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

// ─── NPHIES Direct Client (portal.nphies.sa) ──────────────────────────────
async function nphiesDirect(env, path, options = {}) {
  if (!env.NPHIES_TOKEN) return null;
  const base = 'https://portal.nphies.sa';
  try {
    const res = await fetch(`${base}${path}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${env.NPHIES_TOKEN}`,
        'X-Facility': FACILITY_LICENSE,
        ...options.headers,
      },
      ...options,
    });
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
  const url = new URL(request.url);
  const dept = url.searchParams.get('department');
  let query = 'SELECT * FROM providers WHERE is_active = 1';
  const binds = [];
  if (dept) { query += ' AND department = ?'; binds.push(dept); }
  query += ' ORDER BY specialty, last_name_ar';
  const result = binds.length
    ? await env.DB.prepare(query).bind(...binds).all()
    : await env.DB.prepare(query).all();
  return new Response(JSON.stringify({ providers: result.results }), { headers: JSON_HEADERS });
}

// ─── Departments ───────────────────────────────────────────────────────────
async function handleDepartments(request, env) {
  const result = await env.DB.prepare('SELECT * FROM departments WHERE is_active = 1 ORDER BY dept_name_ar').all();
  return new Response(JSON.stringify({ departments: result.results }), { headers: JSON_HEADERS });
}

// ─── GIVC: Visits / Encounters ─────────────────────────────────────────────
async function handleVisits(request, env) {
  const url = new URL(request.url);
  const method = request.method;

  if (method === 'GET') {
    const patientId = url.searchParams.get('patient_id');
    const status = url.searchParams.get('status') || 'open';
    let query = `SELECT v.*, p.full_name_ar as patient_name, p.mrn,
      pr.first_name_ar || ' ' || pr.last_name_ar as provider_name
      FROM visits v
      LEFT JOIN patients p ON v.patient_id = p.id
      LEFT JOIN providers pr ON v.provider_id = pr.id`;
    const conditions = [];
    const binds = [];
    if (patientId) { conditions.push('v.patient_id = ?'); binds.push(patientId); }
    if (status !== 'all') { conditions.push('v.status = ?'); binds.push(status); }
    if (conditions.length) query += ' WHERE ' + conditions.join(' AND ');
    query += ' ORDER BY v.visit_date DESC LIMIT 100';
    const result = binds.length
      ? await env.DB.prepare(query).bind(...binds).all()
      : await env.DB.prepare(query).all();
    return new Response(JSON.stringify({ visits: result.results }), { headers: JSON_HEADERS });
  }

  if (method === 'POST') {
    const data = await request.json();
    const result = await env.DB.prepare(
      `INSERT INTO visits (patient_id, provider_id, visit_type, chief_complaint, diagnosis_code, diagnosis_description, status)
       VALUES (?, ?, ?, ?, ?, ?, ?)`
    ).bind(data.patient_id, data.provider_id, data.visit_type || 'opd',
      data.chief_complaint, data.diagnosis_code, data.diagnosis_description, 'open').run();

    const visitId = result.meta.last_row_id;
    oracleBridge(env, '/api/visits/open', {
      method: 'POST',
      body: JSON.stringify({ visit_id: visitId, patient_id: data.patient_id, visit_type: data.visit_type }),
    }).catch(() => {});

    return new Response(JSON.stringify({ success: true, id: visitId }), { headers: JSON_HEADERS });
  }

  if (method === 'PUT') {
    const visitRouteMatch = url.pathname.match(/^\/api\/visits\/(\d+)$/);
    if (!visitRouteMatch) {
      return new Response(
        JSON.stringify({ error: 'Invalid visit route. Expected /api/visits/:id with a numeric id' }),
        { status: 400, headers: JSON_HEADERS }
      );
    }
    const visitId = Number(visitRouteMatch[1]);
    const data = await request.json();
    const result = await env.DB.prepare(
      `UPDATE visits SET diagnosis_code = ?, diagnosis_description = ?, status = ? WHERE id = ?`
    ).bind(data.diagnosis_code, data.diagnosis_description, data.status || 'open', visitId).run();
    if (!result.meta || !result.meta.changes) {
      return new Response(JSON.stringify({ error: 'Visit not found' }), { status: 404, headers: JSON_HEADERS });
    }
    return new Response(JSON.stringify({ success: true }), { headers: JSON_HEADERS });
  }

  return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405, headers: JSON_HEADERS });
}

// ─── GIVC: Orders (CPOE) ───────────────────────────────────────────────────
async function handleOrders(request, env) {
  const url = new URL(request.url);
  const method = request.method;

  if (method === 'GET') {
    const visitId = url.searchParams.get('visit_id');
    const patientId = url.searchParams.get('patient_id');
    const type = url.searchParams.get('type');
    const conditions = [];
    const binds = [];
    if (visitId) { conditions.push('o.visit_id = ?'); binds.push(visitId); }
    if (patientId) { conditions.push('o.patient_id = ?'); binds.push(patientId); }
    if (type) { conditions.push('o.order_type = ?'); binds.push(type); }
    let query = `SELECT o.*, p.full_name_ar as patient_name FROM orders o
      LEFT JOIN patients p ON o.patient_id = p.id`;
    if (conditions.length) query += ' WHERE ' + conditions.join(' AND ');
    query += ' ORDER BY o.order_date DESC LIMIT 200';
    const result = binds.length
      ? await env.DB.prepare(query).bind(...binds).all()
      : await env.DB.prepare(query).all();
    return new Response(JSON.stringify({ orders: result.results }), { headers: JSON_HEADERS });
  }

  if (method === 'POST') {
    const data = await request.json();
    const result = await env.DB.prepare(
      `INSERT INTO orders (visit_id, patient_id, provider_id, order_type, order_item, order_item_code, quantity, instructions, priority, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).bind(data.visit_id, data.patient_id, data.provider_id, data.order_type,
      data.order_item, data.order_item_code, data.quantity || 1,
      data.instructions, data.priority || 'routine', 'ordered').run();

    const orderId = result.meta.last_row_id;
    oracleBridge(env, '/api/orders/create', {
      method: 'POST',
      body: JSON.stringify({ order_id: orderId, ...data, facility_license: FACILITY_LICENSE }),
    }).catch(() => {});

    return new Response(JSON.stringify({ success: true, id: orderId }), { headers: JSON_HEADERS });
  }

  return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405, headers: JSON_HEADERS });
}

// ─── GIVC: Lab Results ─────────────────────────────────────────────────────
async function handleLabResults(request, env) {
  const url = new URL(request.url);
  const patientId = url.searchParams.get('patient_id');
  const orderId = url.searchParams.get('order_id');
  const conditions = [];
  const binds = [];
  if (patientId) { conditions.push('lr.patient_id = ?'); binds.push(patientId); }
  if (orderId) { conditions.push('lr.order_id = ?'); binds.push(orderId); }
  let query = `SELECT lr.*, p.full_name_ar as patient_name FROM lab_results lr
    LEFT JOIN patients p ON lr.patient_id = p.id`;
  if (conditions.length) query += ' WHERE ' + conditions.join(' AND ');
  query += ' ORDER BY lr.result_date DESC LIMIT 200';
  const result = binds.length
    ? await env.DB.prepare(query).bind(...binds).all()
    : await env.DB.prepare(query).all();

  // Enrich with Oracle if specific patient
  let oracleResults = null;
  if (patientId) {
    try {
      const or = await oracleBridge(env, `/api/lab/results?patient_id=${encodeURIComponent(patientId)}`);
      if (or.ok) oracleResults = await or.json();
    } catch {}
  }

  return new Response(JSON.stringify({
    lab_results: result.results,
    oracle_results: oracleResults,
  }), { headers: JSON_HEADERS });
}

// ─── GIVC: Prescriptions ───────────────────────────────────────────────────
async function handlePrescriptions(request, env) {
  const url = new URL(request.url);
  const method = request.method;

  if (method === 'GET') {
    const patientId = url.searchParams.get('patient_id');
    const visitId = url.searchParams.get('visit_id');
    const conditions = [];
    const binds = [];
    if (patientId) { conditions.push('pr.patient_id = ?'); binds.push(patientId); }
    if (visitId) { conditions.push('pr.visit_id = ?'); binds.push(visitId); }
    let query = `SELECT pr.*, p.full_name_ar as patient_name FROM prescriptions pr
      LEFT JOIN patients p ON pr.patient_id = p.id`;
    if (conditions.length) query += ' WHERE ' + conditions.join(' AND ');
    query += ' ORDER BY pr.rowid DESC LIMIT 100';
    const result = binds.length
      ? await env.DB.prepare(query).bind(...binds).all()
      : await env.DB.prepare(query).all();
    return new Response(JSON.stringify({ prescriptions: result.results }), { headers: JSON_HEADERS });
  }

  if (method === 'POST') {
    const data = await request.json();
    const result = await env.DB.prepare(
      `INSERT INTO prescriptions (visit_id, patient_id, provider_id, drug_name, drug_code, dosage, frequency, duration, route, quantity, refills, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).bind(data.visit_id, data.patient_id, data.provider_id, data.drug_name,
      data.drug_code, data.dosage, data.frequency, data.duration,
      data.route, data.quantity, data.refills || 0, 'active').run();

    oracleBridge(env, '/api/pharmacy/prescribe', {
      method: 'POST',
      body: JSON.stringify({ prescription_id: result.meta.last_row_id, ...data }),
    }).catch(() => {});

    return new Response(JSON.stringify({ success: true, id: result.meta.last_row_id }), { headers: JSON_HEADERS });
  }

  return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405, headers: JSON_HEADERS });
}

// ─── NPHIES: Full Integration ──────────────────────────────────────────────
async function handleNphies(request, env) {
  const url = new URL(request.url);
  const method = request.method;
  const subpath = url.pathname.replace('/api/nphies', '');

  // Mirror proxy fallback
  if (subpath.startsWith('/mirror/')) {
    const type = subpath.replace('/mirror/', '');
    const data = await nphiesLookup(env, type);
    return new Response(JSON.stringify({ data, type, source: 'nphies-mirror' }), { headers: JSON_HEADERS });
  }

  // Direct portal eligibility
  if (subpath === '/eligibility' || subpath === '/eligibility/') {
    const data = method === 'POST' ? await request.json() : {};
    const { national_id, patient_id, payer_id } = data;

    // 1. Try Oracle Bridge first (fastest, has cached NPHIES data)
    try {
      const oracleRes = await oracleBridge(env, '/api/nphies/eligibility', {
        method: 'POST',
        body: JSON.stringify({ national_id, patient_id, payer_id, facility_license: FACILITY_LICENSE }),
      });
      if (oracleRes.ok) {
        const result = await oracleRes.json();
        if (patient_id) {
          await env.DB.prepare(
            `INSERT INTO eligibility_checks (patient_id, status, check_date, source, response_data)
             VALUES (?, ?, datetime('now'), 'nphies-oracle', ?)`
          ).bind(patient_id, result.status || 'eligible', JSON.stringify(result)).run();
        }
        return new Response(JSON.stringify({ ...result, source: 'nphies-oracle' }), { headers: JSON_HEADERS });
      }
    } catch {}

    // 2. Try NPHIES direct portal (requires NPHIES_TOKEN secret)
    const directResult = await nphiesDirect(env, '/api/eligibility', {
      method: 'POST',
      body: JSON.stringify({ national_id, payer_id, facility_license: FACILITY_LICENSE }),
    });
    if (directResult) {
      if (patient_id) {
        await env.DB.prepare(
          `INSERT INTO eligibility_checks (patient_id, status, check_date, source, response_data)
           VALUES (?, ?, datetime('now'), 'nphies-direct', ?)`
        ).bind(patient_id, directResult.status || 'eligible', JSON.stringify(directResult)).run().catch(() => {});
      }
      return new Response(JSON.stringify({ ...directResult, source: 'nphies-direct' }), { headers: JSON_HEADERS });
    }

    // 3. Fallback to NPHIES mirror (cached GSS data)
    const mirrorData = await nphiesLookup(env, 'gss');
    return new Response(JSON.stringify({
      status: 'pending',
      note: 'Using cached NPHIES data',
      source: 'nphies-mirror',
      data: mirrorData,
    }), { headers: JSON_HEADERS });
  }

  // Prior Authorization to NPHIES
  if (subpath === '/prior-auth' || subpath === '/prior-auth/') {
    if (method === 'POST') {
      const data = await request.json();
      const paNumber = 'PA-' + Date.now();
      const result = await env.DB.prepare(
        `INSERT INTO prior_authorizations (patient_id, insurance_id, pa_number, request_type, request_details, status)
         VALUES (?, ?, ?, ?, ?, 'pending')`
      ).bind(data.patient_id, data.insurance_id, paNumber, data.request_type, JSON.stringify(data)).run();

      // Submit to NPHIES via Oracle Bridge
      oracleBridge(env, '/api/nphies/prior-auth', {
        method: 'POST',
        body: JSON.stringify({ pa_number: paNumber, ...data, facility_license: FACILITY_LICENSE }),
      }).then(async (res) => {
        if (res.ok) {
          const pa = await res.json();
          await env.DB.prepare(
            `UPDATE prior_authorizations SET nphies_pa_id = ?, status = ?, updated_at = datetime('now') WHERE id = ?`
          ).bind(pa.pa_id || pa.reference, pa.status || 'pending', result.meta.last_row_id).run();
        }
      }).catch(() => {});

      return new Response(JSON.stringify({ success: true, id: result.meta.last_row_id, pa_number: paNumber }), { headers: JSON_HEADERS });
    }

    const results = await env.DB.prepare(
      `SELECT pa.*, p.full_name_ar as patient_name FROM prior_authorizations pa
       LEFT JOIN patients p ON pa.patient_id = p.id ORDER BY pa.created_at DESC LIMIT 100`
    ).all();
    return new Response(JSON.stringify({ prior_authorizations: results.results }), { headers: JSON_HEADERS });
  }

  // GSS data (payers list, coverage)
  if (subpath.startsWith('/gss')) {
    const gss = await nphiesLookup(env, 'gss');
    return new Response(JSON.stringify({ gss, source: 'nphies-mirror' }), { headers: JSON_HEADERS });
  }

  // NPHIES status / health
  if (subpath === '/status' || subpath === '') {
    const oracleBridgeBase = (env.ORACLE_BRIDGE_URL || 'https://oracle-bridge.brainsait.org').replace(/\/+$/, '');
    const [claimsRes, paRes, eligibilityRes, oracleCheck, mirrorCheck] = await Promise.allSettled([
      env.DB.prepare("SELECT COUNT(*) as c FROM claims WHERE nphies_claim_id IS NOT NULL").first().catch(() => ({ c: 0 })),
      env.DB.prepare("SELECT COUNT(*) as c FROM prior_authorizations WHERE nphies_pa_id IS NOT NULL").first().catch(() => ({ c: 0 })),
      env.DB.prepare("SELECT COUNT(*) as c FROM eligibility_checks WHERE source LIKE 'nphies%'").first().catch(() => ({ c: 0 })),
      fetch(`${oracleBridgeBase}/health`, { method: 'GET', headers: { 'X-API-Key': env.ORACLE_API_KEY || '' } }),
      nphiesLookup(env, 'gss'),
    ]);

    const oracleReachable =
      oracleCheck.status === 'fulfilled' &&
      !!oracleCheck.value &&
      oracleCheck.value.status < 500;

    const mirrorReachable =
      mirrorCheck.status === 'fulfilled' &&
      mirrorCheck.value !== null;

    const nphiesTokenPresent = !!(env.NPHIES_TOKEN);
    const connected = oracleReachable || mirrorReachable;

    const claims = claimsRes.status === 'fulfilled' ? claimsRes.value : { c: 0 };
    const pa = paRes.status === 'fulfilled' ? paRes.value : { c: 0 };
    const eligibility = eligibilityRes.status === 'fulfilled' ? eligibilityRes.value : { c: 0 };

    return new Response(JSON.stringify({
      portal: 'portal.nphies.sa',
      facility_license: FACILITY_LICENSE,
      connected,
      checks: {
        oracle_bridge: {
          reachable: oracleReachable,
          url: oracleBridgeBase,
          error: !oracleReachable
            ? (oracleCheck.status === 'rejected'
              ? (oracleCheck.reason?.message || String(oracleCheck.reason))
              : `HTTP ${oracleCheck.value?.status || 'unknown'}`)
            : undefined,
        },
        nphies_mirror: { reachable: mirrorReachable },
        nphies_direct: { token_present: nphiesTokenPresent },
      },
      stats: {
        claims_submitted: claims?.c || 0,
        pa_submitted: pa?.c || 0,
        eligibility_checks: eligibility?.c || 0,
      },
    }), { headers: JSON_HEADERS });
  }

  return new Response(JSON.stringify({ error: 'NPHIES endpoint not found', subpath }), { status: 404, headers: JSON_HEADERS });
}

// ─── SBS: Prior Authorization ──────────────────────────────────────────────
async function handlePriorAuth(request, env) {
  const url = new URL(request.url);
  const method = request.method;

  if (method === 'GET') {
    const status = url.searchParams.get('status');
    let query = `SELECT pa.*, p.full_name_ar as patient_name, p.mrn FROM prior_authorizations pa
      LEFT JOIN patients p ON pa.patient_id = p.id`;
    const binds = [];
    if (status) { query += ' WHERE pa.status = ?'; binds.push(status); }
    query += ' ORDER BY pa.created_at DESC LIMIT 100';
    const result = binds.length
      ? await env.DB.prepare(query).bind(...binds).all()
      : await env.DB.prepare(query).all();
    return new Response(JSON.stringify({ prior_authorizations: result.results }), { headers: JSON_HEADERS });
  }

  if (method === 'POST') {
    const data = await request.json();
    const paNumber = 'PA-' + Date.now();
    const result = await env.DB.prepare(
      `INSERT INTO prior_authorizations (patient_id, insurance_id, pa_number, request_type, request_details, status)
       VALUES (?, ?, ?, ?, ?, 'pending')`
    ).bind(data.patient_id, data.insurance_id, paNumber, data.request_type, JSON.stringify(data)).run();

    oracleBridge(env, '/api/nphies/prior-auth', {
      method: 'POST',
      body: JSON.stringify({ pa_number: paNumber, ...data, facility_license: FACILITY_LICENSE }),
    }).catch(() => {});

    return new Response(JSON.stringify({ success: true, id: result.meta.last_row_id, pa_number: paNumber }), { headers: JSON_HEADERS });
  }

  return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405, headers: JSON_HEADERS });
}

// ─── SBS: Contracts ────────────────────────────────────────────────────────
async function handleContracts(request, env) {
  const url = new URL(request.url);
  const method = request.method;

  if (method === 'GET') {
    const status = url.searchParams.get('status');
    let query = 'SELECT * FROM contracts';
    const binds = [];
    if (status) { query += ' WHERE status = ?'; binds.push(status); }
    query += ' ORDER BY end_date ASC LIMIT 200';
    const result = binds.length
      ? await env.DB.prepare(query).bind(...binds).all()
      : await env.DB.prepare(query).all();

    // Enrich with Oracle contract data
    let oracleContracts = null;
    try {
      const or = await oracleBridge(env, '/api/contracts');
      if (or.ok) oracleContracts = await or.json();
    } catch {}

    return new Response(JSON.stringify({
      contracts: result.results,
      oracle_contracts: oracleContracts,
    }), { headers: JSON_HEADERS });
  }

  if (method === 'POST') {
    const data = await request.json();
    const result = await env.DB.prepare(
      `INSERT INTO contracts (payer_id, payer_name, contract_class, contract_type, start_date, end_date, status, discount_percentage, tariff_rules, contract_details)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).bind(
      data.payer_id, data.payer_name,
      data.contract_type || data.contract_class,
      data.contract_type,
      data.start_date, data.end_date,
      data.status || 'active',
      data.discount_percentage || null,
      data.tariff_rules ? JSON.stringify(data.tariff_rules) : null,
      JSON.stringify(data)
    ).run();
    return new Response(JSON.stringify({ success: true, id: result.meta.last_row_id }), { headers: JSON_HEADERS });
  }

  return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405, headers: JSON_HEADERS });
}

// ─── SBS: RCM Dashboard ────────────────────────────────────────────────────
async function handleRCM(request, env) {
  const [
    totalClaims,
    claimsByStatus,
    totalRevenue,
    pendingPA,
    eligibilityChecks,
    recentClaims,
  ] = await Promise.all([
    env.DB.prepare("SELECT COUNT(*) as c FROM claims").first().catch(() => ({ c: 0 })),
    env.DB.prepare("SELECT status, COUNT(*) as count, SUM(total_amount) as total FROM claims GROUP BY status").all().catch(() => ({ results: [] })),
    env.DB.prepare("SELECT SUM(paid_amount) as paid, SUM(approved_amount) as approved, SUM(total_amount) as billed FROM claims").first().catch(() => ({})),
    env.DB.prepare("SELECT COUNT(*) as c FROM prior_authorizations WHERE status = 'pending'").first().catch(() => ({ c: 0 })),
    env.DB.prepare("SELECT COUNT(*) as c FROM eligibility_checks WHERE check_date >= date('now', '-30 days')").first().catch(() => ({ c: 0 })),
    env.DB.prepare("SELECT c.claim_number, c.status, c.total_amount, c.payer_name, p.full_name_ar as patient_name FROM claims c LEFT JOIN patients p ON c.patient_id = p.id ORDER BY c.created_at DESC LIMIT 10").all().catch(() => ({ results: [] })),
  ]);

  // Pull Oracle RCM summary
  let oracleRCM = null;
  try {
    const or = await oracleBridge(env, '/api/billing/rcm-summary');
    if (or.ok) oracleRCM = await or.json();
  } catch {}

  const statusMap = {};
  (claimsByStatus.results || []).forEach(r => { statusMap[r.status] = { count: r.count, total: r.total }; });
  const approvalRate = (totalClaims.c > 0)
    ? (((statusMap.approved?.count || 0) + (statusMap.paid?.count || 0)) / totalClaims.c * 100).toFixed(1)
    : '0.0';

  return new Response(JSON.stringify({
    summary: {
      total_claims: totalClaims.c,
      approval_rate: `${approvalRate}%`,
      billed: totalRevenue?.billed || 0,
      approved: totalRevenue?.approved || 0,
      paid: totalRevenue?.paid || 0,
      pending_pa: pendingPA.c,
      eligibility_checks_30d: eligibilityChecks.c,
    },
    claims_by_status: statusMap,
    recent_claims: recentClaims.results,
    oracle_rcm: oracleRCM,
  }), { headers: JSON_HEADERS });
}

// ─── Oracle Sync ───────────────────────────────────────────────────────────
async function handleOracleSync(request, env) {
  const url = new URL(request.url);
  const module = url.searchParams.get('module') || 'all';
  const results = {};

  const modules = module === 'all'
    ? ['pmi', 'opd', 'lab', 'radiology', 'pharmacy', 'billing']
    : [module];

  for (const mod of modules) {
    try {
      const res = await oracleBridge(env, `/api/${mod}/sync?facility=${FACILITY_LICENSE}`);
      results[mod] = res.ok ? await res.json() : { error: 'sync failed' };
    } catch (e) {
      console.error(`Oracle sync failed for module ${mod}:`, e.message);
      results[mod] = { error: e.message };
    }
  }

  return new Response(JSON.stringify({
    synced_at: new Date().toISOString(),
    facility_license: FACILITY_LICENSE,
    modules: results,
  }), { headers: JSON_HEADERS });
}

// ─── Oracle Config ─────────────────────────────────────────────────────────
async function handleOracleConfig(env) {
  return new Response(JSON.stringify({
    base_url: env.ORACLE_BRIDGE_URL || 'https://oracle-bridge.brainsait.org',
    hospital: HOSPITAL_NAME,
    facility_license: FACILITY_LICENSE,
    org_id: '624',
    org_name: 'AlInma Medical Services Company',
    modules: ['pmi', 'opd', 'adt', 'lab', 'radiology', 'pharmacy', 'billing', 'nursing', 'consent'],
    portals: {
      bsma: 'https://bsma.elfadil.com',
      givc: 'https://givc.elfadil.com',
      sbs: 'https://sbs.elfadil.com',
    },
  }), { headers: JSON_HEADERS });
}

// ─── Schema / Health ───────────────────────────────────────────────────────
async function handleSchema(env) {
  const tables = ['patients', 'appointments', 'claims', 'providers', 'departments',
    'eligibility_checks', 'visits', 'orders', 'lab_results', 'prescriptions',
    'prior_authorizations', 'contracts', 'rag_documents'];
  const info = {};
  for (const table of tables) {
    const res = await env.DB.prepare(`SELECT COUNT(*) as count FROM ${table}`).first().catch(() => ({ count: 0 }));
    info[table] = { count: res?.count || 0 };
  }
  return new Response(JSON.stringify({ database: 'hnh-gharnata', tables: info }), { headers: JSON_HEADERS });
}

// ─── Auth Helper ───────────────────────────────────────────────────────────
function requireApiKey(request, env) {
  const key = request.headers.get('X-API-Key') || '';
  const expected = env.API_KEY || '';
  if (!expected || key === expected) return null; // pass if no key configured or key matches
  return new Response(
    JSON.stringify({ error: 'Unauthorized. Provide a valid X-API-Key header.' }),
    { status: 401, headers: JSON_HEADERS }
  );
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
      service: 'hnh-unified-hub-api',
      version: '3.0.0',
      hospital: HOSPITAL_NAME,
      facility_license: FACILITY_LICENSE,
      timestamp: new Date().toISOString(),
      portals: {
        bsma: 'bsma.elfadil.com',
        givc: 'givc.elfadil.com',
        sbs: 'sbs.elfadil.com',
      },
      integrations: {
        oracle: !!(env.ORACLE_BRIDGE_URL),
        nphies: !!(env.NPHIES_MIRROR_URL),
        d1: true,
      },
    }), { headers: JSON_HEADERS });
  }

  try {
    // ── BSMA: Patient Portal (public) ──
    if (path.startsWith('/api/patients')) return await handlePatients(request, env, ctx);
    if (path.startsWith('/api/appointments')) return await handleAppointments(request, env, ctx);
    if (path.startsWith('/api/eligibility')) return await handleEligibility(request, env, ctx);
    if (path.startsWith('/api/providers')) return await handleProviders(request, env);
    if (path.startsWith('/api/departments')) return await handleDepartments(request, env);
    if (path.startsWith('/api/nphies')) return await handleNphies(request, env);

    // ── Protected endpoints: require X-API-Key ──
    const authErr = requireApiKey(request, env);
    if (authErr) return authErr;

    // ── GIVC: Provider / Clinical Portal ──
    if (path.startsWith('/api/visits')) return await handleVisits(request, env);
    if (path.startsWith('/api/orders')) return await handleOrders(request, env);
    if (path.startsWith('/api/lab-results')) return await handleLabResults(request, env);
    if (path.startsWith('/api/prescriptions')) return await handlePrescriptions(request, env);

    // ── SBS: Billing / RCM / Insurance Portal ──
    if (path.startsWith('/api/claims')) return await handleClaims(request, env, ctx);
    if (path.startsWith('/api/prior-auth')) return await handlePriorAuth(request, env);
    if (path.startsWith('/api/contracts')) return await handleContracts(request, env);
    if (path === '/api/rcm') return await handleRCM(request, env);

    // ── Oracle Integration ──
    if (path === '/api/oracle-config') return await handleOracleConfig(env);
    if (path === '/api/oracle-sync') return await handleOracleSync(request, env);

    // ── Schema / Debug ──
    if (path === '/api/schema') return await handleSchema(env);

    return new Response(JSON.stringify({ error: 'Not found' }), { status: 404, headers: JSON_HEADERS });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: JSON_HEADERS });
  }
}
