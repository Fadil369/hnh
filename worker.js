/**
 * HNH Unified Worker — hnh.brainsait.org
 * =======================================
 * Single canonical Cloudflare Worker that replaces BOTH:
 *   - hnh-portal         (frontend + embedded API)
 *   - hnh-gharnata-api   (dedicated API gateway)
 *
 * Architecture:
 *   GET /           → HTML shell (bilingual, RTL/LTR)
 *   GET /api/*      → REST API (patients, appointments, claims, NPHIES, Oracle)
 *   GET /health     → Health check
 *
 * Bindings required (wrangler.toml):
 *   DB              → D1: hnh-gharnata (d6960732-d5d0-4271-84e9-ba988c9c32dc)
 *   AI              → Cloudflare AI (optional, for Basma chat)
 *
 * Secrets required (wrangler secret put):
 *   ORACLE_API_KEY  → Oracle Bridge API key
 *   API_KEY         → Internal API key for protected routes
 *   NPHIES_TOKEN    → NPHIES portal bearer token (optional)
 *   ELEVENLABS_API_KEY → ElevenLabs TTS (optional)
 *
 * Version: 4.0.0 (Unified)
 * Author:  BrainSAIT Engineering
 */

// ─── Constants ────────────────────────────────────────────────────────────────

const VERSION = '4.0.0';
const HOSPITAL_NAME = 'Hayat National Hospital - Gharnata';
const FACILITY_LICENSE = '10000000000988';
const ORG_ID = '624';

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-API-Key, X-Hospital, X-Session-ID, X-Portal',
};

const SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'SAMEORIGIN',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
};

const JSON_HEADERS = { ...CORS, ...SECURITY_HEADERS, 'Content-Type': 'application/json; charset=utf-8' };
const HTML_HEADERS = { ...SECURITY_HEADERS, 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'public, max-age=300' };

// ─── Helpers ──────────────────────────────────────────────────────────────────

function jsonRes(data, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: JSON_HEADERS });
}

function corsOptions() {
  return new Response(null, { status: 204, headers: CORS });
}

function requireApiKey(request, env) {
  const expected = env.API_KEY || '';
  if (!expected) return jsonRes({ error: 'Service unavailable: API_KEY not configured' }, 503);
  const provided = request.headers.get('X-API-Key') || '';
  if (provided !== expected) return jsonRes({ error: 'Unauthorized' }, 401);
  return null; // OK
}

// Rate limiting (in-memory, resets per isolate)
const _rateCounts = new Map();
function rateLimit(ip, maxReq = 120, windowMs = 60000) {
  const now = Date.now();
  const entry = _rateCounts.get(ip) || { count: 0, ts: now };
  if (now - entry.ts > windowMs) { entry.count = 0; entry.ts = now; }
  entry.count++;
  _rateCounts.set(ip, entry);
  return entry.count <= maxReq;
}

// ─── External Clients ─────────────────────────────────────────────────────────

function oracleFetch(env, path, options = {}) {
  const base = env.ORACLE_BRIDGE_URL || 'https://oracle-bridge.brainsait.org';
  return fetch(`${base}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': env.ORACLE_API_KEY || '',
      'X-Hospital': 'gharnata',
      'X-Facility': FACILITY_LICENSE,
      ...(options.headers || {}),
    },
  });
}

async function nphiesMirror(env, type) {
  const base = env.NPHIES_MIRROR_URL || 'https://nphies-mirror.brainsait-fadil.workers.dev';
  try {
    const res = await fetch(`${base}/${type}/gharnata`);
    return res.ok ? res.json() : null;
  } catch { return null; }
}

// ─── API Handlers ─────────────────────────────────────────────────────────────

// GET /health
async function handleHealth(env) {
  let dbOk = false;
  try {
    await env.DB.prepare('SELECT 1').first();
    dbOk = true;
  } catch {}

  return jsonRes({
    status: dbOk ? 'healthy' : 'degraded',
    version: VERSION,
    worker: 'hnh-unified',
    hospital: HOSPITAL_NAME,
    facility_license: FACILITY_LICENSE,
    timestamp: new Date().toISOString(),
    db: dbOk ? 'connected' : 'error',
    portals: {
      bsma: 'https://bsma.elfadil.com',
      givc: 'https://givc.elfadil.com',
      sbs: 'https://sbs.elfadil.com',
    },
  });
}

// GET /api/stats
async function handleStats(env) {
  const stats = await env.DB.prepare(`
    SELECT
      (SELECT COUNT(*) FROM patients WHERE is_active = 1) as total_patients,
      (SELECT COUNT(*) FROM appointments WHERE date(appointment_date) = date('now')) as today_appointments,
      (SELECT COUNT(*) FROM providers WHERE is_active = 1) as total_providers,
      (SELECT COUNT(*) FROM departments WHERE is_active = 1) as total_departments,
      (SELECT COUNT(*) FROM claims) as total_claims,
      (SELECT COUNT(*) FROM claims WHERE status = 'submitted') as submitted_claims,
      (SELECT COUNT(*) FROM claims WHERE status = 'paid') as paid_claims
  `).first().catch(() => ({}));

  return jsonRes({
    success: true,
    stats: {
      total_patients: stats?.total_patients || 0,
      today_appointments: stats?.today_appointments || 0,
      total_providers: stats?.total_providers || 700,
      total_departments: stats?.total_departments || 42,
      total_branches: 5,
      total_beds: 1200,
      total_claims: stats?.total_claims || 0,
      submitted_claims: stats?.submitted_claims || 0,
      paid_claims: stats?.paid_claims || 0,
    },
    timestamp: new Date().toISOString(),
  });
}

// /api/branches
const BRANCHES = [
  { id: 'R001', name_ar: 'الرياض', name_en: 'Riyadh', city_ar: 'الرياض', city_en: 'Riyadh', address_ar: 'طريق الدائري الشرقي - حي الربوة', address_en: 'Eastern Ring Road, Al-Rabwa', phone: '+966920000094', beds: 300 },
  { id: 'J001', name_ar: 'جازان', name_en: 'Jazan', city_ar: 'جازان', city_en: 'Jazan', address_ar: 'كورنيش جازان - حي الشاطئ', address_en: 'Jazan Corniche, Al Shati', phone: '+966920000094', beds: 150 },
  { id: 'K001', name_ar: 'خميس مشيط', name_en: 'Khamis Mushayt', city_ar: 'خميس مشيط', city_en: 'Khamis Mushayt', address_ar: 'طريق الأمير سلطان - أم سرار', address_en: 'Prince Sultan Road, Umm Sarar', phone: '+966538081888', beds: 180 },
  { id: 'M001', name_ar: 'المدينة المنورة', name_en: 'Madinah', city_ar: 'المدينة المنورة', city_en: 'Madinah', address_ar: 'طريق فرع الهجرة، المدينة المنورة 42316', address_en: 'Al-Hijra Branch Road, Madinah 42316', phone: '+966920000094', beds: 200 },
  { id: 'U001', name_ar: 'عنيزة', name_en: 'Unayzah', city_ar: 'عنيزة', city_en: 'Unayzah', address_ar: 'القصيم - عنيزة، طريق المدينة', address_en: 'Al-Qassim, Unayzah, Medina Road', phone: '+966920000094', beds: 120 },
];

async function handleBranches() {
  return jsonRes({ success: true, branches: BRANCHES, total: BRANCHES.length });
}

// /api/patients
async function handlePatients(request, env) {
  const url = new URL(request.url);
  const method = request.method;

  if (method === 'GET') {
    const search = url.searchParams.get('search') || '';
    const limit = Math.min(parseInt(url.searchParams.get('limit') || '50'), 200);
    const offset = parseInt(url.searchParams.get('offset') || '0');
    let query = 'SELECT * FROM patients WHERE is_active = 1';
    const binds = [];
    if (search) {
      query += ' AND (full_name_ar LIKE ? OR full_name_en LIKE ? OR national_id LIKE ? OR mrn LIKE ? OR phone LIKE ?)';
      const s = `%${search}%`;
      binds.push(s, s, s, s, s);
    }
    query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    binds.push(limit, offset);
    const result = await env.DB.prepare(query).bind(...binds).all();
    return jsonRes({ success: true, patients: result.results || [], total: result.results?.length || 0 });
  }

  if (method === 'POST') {
    const data = await request.json();
    const mrn = data.mrn || `HNH-${Date.now()}`;
    data.full_name_ar = data.full_name_ar || `${data.first_name_ar || ''} ${data.last_name_ar || ''}`.trim();
    data.full_name_en = data.full_name_en || `${data.first_name_en || ''} ${data.last_name_en || ''}`.trim();

    // Fire-and-forget Oracle PMI sync
    oracleFetch(env, '/api/pmi/register', {
      method: 'POST',
      body: JSON.stringify({ national_id: data.national_id, ...data, facility_license: FACILITY_LICENSE }),
    }).catch(() => {});

    const r = await env.DB.prepare(
      `INSERT INTO patients (mrn, national_id, first_name_ar, first_name_en, last_name_ar, last_name_en,
        full_name_ar, full_name_en, date_of_birth, gender, phone, email)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).bind(mrn, data.national_id, data.first_name_ar, data.first_name_en, data.last_name_ar, data.last_name_en,
      data.full_name_ar, data.full_name_en, data.date_of_birth, data.gender, data.phone, data.email || null).run();

    return jsonRes({ success: true, id: r.meta.last_row_id, mrn }, 201);
  }

  return jsonRes({ error: 'Method not allowed' }, 405);
}

// /api/providers
const STATIC_PROVIDERS = [
  { id: 'P001', name_ar: 'د. محمد بكري', name_en: 'Dr. Mohamed Bakry', specialty: 'Plastic Surgery', department: 'Surgery', branch: 'Riyadh', rating: 4.9, experience_years: 19 },
  { id: 'P002', name_ar: 'د. عبدالله القحطاني', name_en: 'Dr. Abdullah Al-Qahtani', specialty: 'Cardiology', department: 'Cardiology', branch: 'Riyadh', rating: 4.7, experience_years: 16 },
  { id: 'P003', name_ar: 'د. فاطمة الزهراني', name_en: 'Dr. Fatima Al-Zahrani', specialty: 'Obstetrics & Gynecology', department: 'OB/GYN', branch: 'Riyadh', rating: 4.8, experience_years: 14 },
  { id: 'P004', name_ar: 'د. خالد الشهراني', name_en: 'Dr. Khaled Al-Shahrani', specialty: 'Orthopedics', department: 'Orthopedics', branch: 'Riyadh', rating: 4.6, experience_years: 15 },
  { id: 'P005', name_ar: 'د. سارة الحربي', name_en: 'Dr. Sarah Al-Harbi', specialty: 'Pediatrics', department: 'Pediatrics', branch: 'Jazan', rating: 4.5, experience_years: 12 },
  { id: 'P006', name_ar: 'د. أحمد المطيري', name_en: 'Dr. Ahmed Al-Mutairi', specialty: 'Neurology', department: 'Neurology', branch: 'Madinah', rating: 4.7, experience_years: 17 },
  { id: 'P007', name_ar: 'د. نورة الدوسري', name_en: 'Dr. Noura Al-Dosari', specialty: 'Dermatology', department: 'Dermatology', branch: 'Riyadh', rating: 4.8, experience_years: 11 },
  { id: 'P008', name_ar: 'د. فيصل الغامدي', name_en: 'Dr. Faisal Al-Ghamdi', specialty: 'Ophthalmology', department: 'Ophthalmology', branch: 'Riyadh', rating: 4.6, experience_years: 18 },
  { id: 'P009', name_ar: 'د. مها العنزي', name_en: 'Dr. Maha Al-Anazi', specialty: 'Internal Medicine', department: 'Internal', branch: 'Riyadh', rating: 4.4, experience_years: 13 },
  { id: 'P010', name_ar: 'د. حسن اليامي', name_en: 'Dr. Hassan Al-Yami', specialty: 'Dentistry', department: 'Dental', branch: 'Riyadh', rating: 4.5, experience_years: 10 },
  { id: 'P011', name_ar: 'د. سامي الجهني', name_en: 'Dr. Sami Al-Juhani', specialty: 'Urology', department: 'Urology', branch: 'Unayzah', rating: 4.3, experience_years: 14 },
  { id: 'P012', name_ar: 'د. ليلى القرشي', name_en: 'Dr. Layla Al-Qurashi', specialty: 'Psychiatry', department: 'Psychiatry', branch: 'Riyadh', rating: 4.7, experience_years: 11 },
];

async function handleProviders(request, env) {
  const url = new URL(request.url);
  const dept = url.searchParams.get('department') || '';
  const branch = url.searchParams.get('branch') || '';

  // Try DB first, fall back to static
  let providers = STATIC_PROVIDERS;
  try {
    const r = await env.DB.prepare('SELECT * FROM providers WHERE is_active = 1 ORDER BY specialty, last_name_ar').all();
    if (r.results && r.results.length > 0) {
      providers = r.results.map(p => ({
        id: p.provider_code || `P${p.id}`,
        name_ar: `د. ${p.first_name_ar || ''} ${p.last_name_ar || ''}`.trim(),
        name_en: `Dr. ${p.first_name_en || p.first_name_ar || ''} ${p.last_name_en || p.last_name_ar || ''}`.trim(),
        specialty: p.specialty || '',
        department: p.department || '',
        branch: p.clinic_location || '',
        experience_years: 10,
        rating: 4,
        source: 'd1',
      }));
    }
  } catch {}

  if (dept) providers = providers.filter(p => p.department === dept);
  if (branch) providers = providers.filter(p => p.branch === branch);

  return jsonRes({ success: true, providers, total: providers.length });
}

// /api/appointments
async function handleAppointments(request, env) {
  const url = new URL(request.url);
  const method = request.method;

  if (method === 'GET') {
    const date = url.searchParams.get('date') || new Date().toISOString().split('T')[0];
    const patientId = url.searchParams.get('patient_id') || '';
    let query = `SELECT a.*, p.full_name_ar as patient_name, p.national_id
      FROM appointments a LEFT JOIN patients p ON a.patient_id = p.id`;
    const binds = [];
    const conditions = ['a.appointment_date = ?'];
    binds.push(date);
    if (patientId) { conditions.push('a.patient_id = ?'); binds.push(patientId); }
    query += ' WHERE ' + conditions.join(' AND ') + ' ORDER BY a.appointment_time';
    const r = await env.DB.prepare(query).bind(...binds).all();
    return jsonRes({ success: true, appointments: r.results || [], date });
  }

  if (method === 'POST') {
    const data = await request.json();
    const r = await env.DB.prepare(
      `INSERT INTO appointments (patient_id, provider_id, clinic_code, clinic_name, appointment_date, appointment_time, appointment_type, reason, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).bind(data.patient_id || null, data.provider_id || null, data.clinic_code || 'GEN', data.clinic_name || '',
      data.appointment_date, data.appointment_time, data.appointment_type || 'new', data.reason || '', 'scheduled').run();

    // Fire-and-forget Oracle OPD sync
    oracleFetch(env, '/api/opd/book', {
      method: 'POST',
      body: JSON.stringify({ ...data, facility_license: FACILITY_LICENSE }),
    }).catch(() => {});

    return jsonRes({ success: true, id: r.meta.last_row_id }, 201);
  }

  return jsonRes({ error: 'Method not allowed' }, 405);
}

// /api/claims
async function handleClaims(request, env) {
  const url = new URL(request.url);
  const method = request.method;

  if (method === 'GET') {
    const limit = Math.min(parseInt(url.searchParams.get('limit') || '50'), 200);
    const r = await env.DB.prepare(
      `SELECT c.*, p.full_name_ar as patient_name FROM claims c
       LEFT JOIN patients p ON c.patient_id = p.id
       ORDER BY c.created_at DESC LIMIT ?`
    ).bind(limit).all();
    return jsonRes({ success: true, claims: r.results || [] });
  }

  if (method === 'POST') {
    const data = await request.json();
    const claimNumber = `CLM-${Date.now()}`;
    const r = await env.DB.prepare(
      `INSERT INTO claims (patient_id, visit_id, claim_number, claim_type, payer_id, payer_name, total_amount, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
    ).bind(data.patient_id, data.visit_id || null, claimNumber, data.claim_type || 'professional',
      data.payer_id, data.payer_name, parseFloat(data.total_amount) || 0, 'draft').run();
    return jsonRes({ success: true, id: r.meta.last_row_id, claim_number: claimNumber }, 201);
  }

  return jsonRes({ error: 'Method not allowed' }, 405);
}

// /api/departments
async function handleDepartments(env) {
  const r = await env.DB.prepare('SELECT * FROM departments WHERE is_active = 1 ORDER BY dept_name_ar').all().catch(() => ({ results: [] }));
  return jsonRes({ success: true, departments: r.results || [] });
}

// /api/visits
async function handleVisits(request, env) {
  const url = new URL(request.url);
  const method = request.method;

  if (method === 'GET') {
    const status = url.searchParams.get('status') || 'open';
    const patientId = url.searchParams.get('patient_id');
    let query = `SELECT v.*, p.full_name_ar as patient_name, p.mrn,
      pr.first_name_ar || ' ' || pr.last_name_ar as provider_name
      FROM visits v
      LEFT JOIN patients p ON v.patient_id = p.id
      LEFT JOIN providers pr ON v.provider_id = pr.id`;
    const conditions = [];
    const binds = [];
    if (status !== 'all') { conditions.push('v.status = ?'); binds.push(status); }
    if (patientId) { conditions.push('v.patient_id = ?'); binds.push(patientId); }
    if (conditions.length) query += ' WHERE ' + conditions.join(' AND ');
    query += ' ORDER BY v.visit_date DESC LIMIT 100';
    const r = binds.length ? await env.DB.prepare(query).bind(...binds).all() : await env.DB.prepare(query).all();
    return jsonRes({ success: true, visits: r.results || [] });
  }

  if (method === 'POST') {
    const data = await request.json();
    const r = await env.DB.prepare(
      `INSERT INTO visits (patient_id, provider_id, visit_type, chief_complaint, diagnosis_code, status)
       VALUES (?, ?, ?, ?, ?, ?)`
    ).bind(data.patient_id, data.provider_id || null, data.visit_type || 'opd',
      data.chief_complaint, data.diagnosis_code || null, 'open').run();
    return jsonRes({ success: true, id: r.meta.last_row_id }, 201);
  }

  return jsonRes({ error: 'Method not allowed' }, 405);
}

// /api/orders
async function handleOrders(request, env) {
  const url = new URL(request.url);
  const method = request.method;

  if (method === 'GET') {
    const visitId = url.searchParams.get('visit_id');
    const patientId = url.searchParams.get('patient_id');
    const conditions = [];
    const binds = [];
    if (visitId) { conditions.push('o.visit_id = ?'); binds.push(visitId); }
    if (patientId) { conditions.push('o.patient_id = ?'); binds.push(patientId); }
    let query = `SELECT o.*, p.full_name_ar as patient_name FROM orders o LEFT JOIN patients p ON o.patient_id = p.id`;
    if (conditions.length) query += ' WHERE ' + conditions.join(' AND ');
    query += ' ORDER BY o.order_date DESC LIMIT 200';
    const r = binds.length ? await env.DB.prepare(query).bind(...binds).all() : await env.DB.prepare(query).all();
    return jsonRes({ success: true, orders: r.results || [] });
  }

  if (method === 'POST') {
    const data = await request.json();
    const r = await env.DB.prepare(
      `INSERT INTO orders (visit_id, patient_id, provider_id, order_type, order_item, order_item_code, quantity, instructions, priority, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).bind(data.visit_id, data.patient_id, data.provider_id || null, data.order_type,
      data.order_item, data.order_item_code || null, data.quantity || 1,
      data.instructions || null, data.priority || 'routine', 'ordered').run();
    return jsonRes({ success: true, id: r.meta.last_row_id }, 201);
  }

  return jsonRes({ error: 'Method not allowed' }, 405);
}

// /api/lab-results
async function handleLabResults(request, env) {
  const url = new URL(request.url);
  const patientId = url.searchParams.get('patient_id');
  const conditions = [];
  const binds = [];
  if (patientId) { conditions.push('lr.patient_id = ?'); binds.push(patientId); }
  let query = `SELECT lr.*, p.full_name_ar as patient_name FROM lab_results lr LEFT JOIN patients p ON lr.patient_id = p.id`;
  if (conditions.length) query += ' WHERE ' + conditions.join(' AND ');
  query += ' ORDER BY lr.result_date DESC LIMIT 200';
  const r = binds.length ? await env.DB.prepare(query).bind(...binds).all() : await env.DB.prepare(query).all();
  return jsonRes({ success: true, lab_results: r.results || [] });
}

// /api/prior-auth
async function handlePriorAuth(request, env) {
  const url = new URL(request.url);
  const method = request.method;

  if (method === 'GET') {
    const r = await env.DB.prepare(
      `SELECT pa.*, p.full_name_ar as patient_name, p.mrn FROM prior_authorizations pa
       LEFT JOIN patients p ON pa.patient_id = p.id ORDER BY pa.created_at DESC LIMIT 100`
    ).all();
    return jsonRes({ success: true, prior_authorizations: r.results || [] });
  }

  if (method === 'POST') {
    const data = await request.json();
    const paNumber = `PA-${Date.now()}`;
    const r = await env.DB.prepare(
      `INSERT INTO prior_authorizations (patient_id, insurance_id, pa_number, request_type, request_details, status)
       VALUES (?, ?, ?, ?, ?, 'pending')`
    ).bind(data.patient_id, data.insurance_id || null, paNumber, data.request_type, JSON.stringify(data)).run();
    oracleFetch(env, '/api/nphies/prior-auth', {
      method: 'POST',
      body: JSON.stringify({ pa_number: paNumber, ...data, facility_license: FACILITY_LICENSE }),
    }).catch(() => {});
    return jsonRes({ success: true, id: r.meta.last_row_id, pa_number: paNumber }, 201);
  }

  return jsonRes({ error: 'Method not allowed' }, 405);
}

// /api/rcm
async function handleRCM(env) {
  const [total, byStatus, revenue, pendingPA, recent] = await Promise.all([
    env.DB.prepare('SELECT COUNT(*) as c FROM claims').first().catch(() => ({ c: 0 })),
    env.DB.prepare('SELECT status, COUNT(*) as count, SUM(total_amount) as total FROM claims GROUP BY status').all().catch(() => ({ results: [] })),
    env.DB.prepare('SELECT SUM(paid_amount) as paid, SUM(approved_amount) as approved, SUM(total_amount) as billed FROM claims').first().catch(() => ({})),
    env.DB.prepare("SELECT COUNT(*) as c FROM prior_authorizations WHERE status = 'pending'").first().catch(() => ({ c: 0 })),
    env.DB.prepare(`SELECT c.claim_number, c.status, c.total_amount, c.payer_name, p.full_name_ar as patient_name
      FROM claims c LEFT JOIN patients p ON c.patient_id = p.id ORDER BY c.created_at DESC LIMIT 10`).all().catch(() => ({ results: [] })),
  ]);

  const statusMap = {};
  (byStatus.results || []).forEach(r => { statusMap[r.status] = { count: r.count, total: r.total }; });
  const approvedCount = (statusMap.approved?.count || 0) + (statusMap.paid?.count || 0);
  const approvalRate = total.c > 0 ? ((approvedCount / total.c) * 100).toFixed(1) : '0.0';

  return jsonRes({
    summary: {
      total_claims: total.c,
      approval_rate: `${approvalRate}%`,
      billed: revenue?.billed || 0,
      approved: revenue?.approved || 0,
      paid: revenue?.paid || 0,
      pending_pa: pendingPA.c,
    },
    claims_by_status: statusMap,
    recent_claims: recent.results || [],
  });
}

// /api/eligibility
async function handleEligibility(request, env) {
  const data = await request.json().catch(() => ({}));
  const { national_id, patient_id, payer_id } = data;

  // Try Oracle Bridge
  try {
    const oRes = await oracleFetch(env, '/api/nphies/eligibility', {
      method: 'POST',
      body: JSON.stringify({ national_id, patient_id, payer_id, facility_license: FACILITY_LICENSE }),
    });
    if (oRes.ok) {
      const result = await oRes.json();
      if (patient_id) {
        await env.DB.prepare(
          `INSERT INTO eligibility_checks (patient_id, status, check_date, source, response_data) VALUES (?, ?, datetime('now'), 'oracle', ?)`
        ).bind(patient_id, result.status || 'eligible', JSON.stringify(result)).run().catch(() => {});
      }
      return jsonRes({ ...result, source: 'oracle' });
    }
  } catch {}

  // Fallback: NPHIES mirror
  const mirrorData = await nphiesMirror(env, 'gss');
  return jsonRes({
    status: 'pending',
    source: 'nphies-mirror',
    note: 'Real-time check unavailable, using cached NPHIES data',
    data: mirrorData,
  });
}

// /api/nphies/*
async function handleNphies(request, env, subpath) {
  const method = request.method;

  if (subpath === '/status' || subpath === '') {
    const [claims, pa, eligChecks] = await Promise.all([
      env.DB.prepare('SELECT COUNT(*) as c FROM claims WHERE nphies_claim_id IS NOT NULL').first().catch(() => ({ c: 0 })),
      env.DB.prepare('SELECT COUNT(*) as c FROM prior_authorizations WHERE nphies_pa_id IS NOT NULL').first().catch(() => ({ c: 0 })),
      env.DB.prepare("SELECT COUNT(*) as c FROM eligibility_checks WHERE source LIKE 'nphies%'").first().catch(() => ({ c: 0 })),
    ]);
    const mirror = await nphiesMirror(env, 'gss');
    return jsonRes({
      portal: 'portal.nphies.sa',
      facility_license: FACILITY_LICENSE,
      connected: !!mirror,
      stats: { claims_submitted: claims?.c || 0, pa_submitted: pa?.c || 0, eligibility_checks: eligChecks?.c || 0 },
    });
  }

  if (subpath === '/eligibility') {
    return handleEligibility(request, env);
  }

  if (subpath === '/prior-auth') {
    return handlePriorAuth(request, env);
  }

  if (subpath === '/gss') {
    const data = await nphiesMirror(env, 'gss');
    return jsonRes({ data, source: 'nphies-mirror' });
  }

  return jsonRes({ error: 'NPHIES endpoint not found', subpath }, 404);
}

// /api/chat  (Basma AI)
async function handleChat(request, env) {
  const data = await request.json().catch(() => ({}));
  const { message, session_id } = data;
  if (!message) return jsonRes({ error: 'message required' }, 400);

  const sid = session_id || `ses_${Date.now().toString(36)}`;

  if (!env.AI) {
    return jsonRes({
      success: true,
      response: 'أهلاً! أنا بسمة، مساعدة مستشفى الحياة الوطني. يمكنني مساعدتك في حجز المواعيد والاستفسارات الطبية. Hello! I\'m Basma, Hayat Hospital\'s AI assistant.',
      session_id: sid,
    });
  }

  try {
    const ai = await env.AI.run('@cf/meta/llama-3.3-70b-instruct-fp8-fast', {
      messages: [
        { role: 'system', content: 'You are Basma (بسمة), the AI assistant for Hayat National Hospital. Respond in the same language the user writes in (Arabic or English). Be warm, professional, and concise. Never provide medical diagnoses. Always recommend consulting a doctor for medical concerns.' },
        { role: 'user', content: message },
      ],
      max_tokens: 500,
    });
    const reply = ai.response || ai.choices?.[0]?.message?.content || 'عذراً، لم أستطع معالجة طلبك.';

    await env.DB.prepare(
      'INSERT INTO chat_history (session_id, role, content) VALUES (?, ?, ?), (?, ?, ?)'
    ).bind(sid, 'user', message, sid, 'assistant', reply).run().catch(() => {});

    return jsonRes({ success: true, response: reply, session_id: sid });
  } catch (e) {
    return jsonRes({ success: false, response: 'عذراً، حدث خطأ مؤقت. Sorry, a temporary error occurred.', session_id: sid });
  }
}

// ─── HTML Shell ───────────────────────────────────────────────────────────────

function serveHTML(lang = 'ar') {
  const isAr = lang !== 'en';
  const dir = isAr ? 'rtl' : 'ltr';
  const t = (ar, en) => isAr ? ar : en;

  const html = `<!DOCTYPE html>
<html lang="${lang}" dir="${dir}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${t('مستشفيات الحياة الوطني | HNH', 'Hayat National Hospital | HNH')}</title>
<meta name="description" content="${t('مجموعة مستشفيات الحياة الوطني — 25+ عاماً من التميز', 'Hayat National Hospitals Group — 25+ years of excellence')}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Tajawal:wght@400;500;700;800;900&display=swap" rel="stylesheet">
<link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🏥</text></svg>">
<style>
:root {
  --primary: #0066CC; --primary-dark: #004499; --navy: #1A2B4A;
  --accent: #C9A84C; --success: #10B981; --danger: #EF4444;
  --text: #1A2B4A; --text-light: #6B7A94; --bg: #F8F9FC; --surface: #FFFFFF;
  --border: #E2E8F0; --shadow: 0 4px 12px rgba(0,0,0,0.08);
  --radius: 12px; --radius-lg: 20px; --radius-full: 9999px;
  --grad: linear-gradient(135deg, #0066CC, #1A2B4A);
  --grad-accent: linear-gradient(135deg, #C9A84C, #E0C97A);
  --font: ${isAr ? "'Tajawal'" : "'Inter'"}, sans-serif;
}
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body { font-family: var(--font); color: var(--text); background: var(--bg); line-height: 1.7; overflow-x: hidden; }

/* Header */
.header { position: fixed; top: 0; inset-inline: 0; z-index: 1000; background: rgba(255,255,255,0.95); backdrop-filter: blur(20px); box-shadow: var(--shadow); }
.header-inner { max-width: 1240px; margin: 0 auto; padding: 14px 24px; display: flex; align-items: center; justify-content: space-between; gap: 16px; }
.logo { display: flex; align-items: center; gap: 10px; text-decoration: none; }
.logo-icon { width: 40px; height: 40px; background: var(--grad); border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 1.3rem; }
.logo-text { font-size: 1rem; font-weight: 700; color: var(--navy); line-height: 1.2; }
.logo-text small { display: block; font-size: 0.65rem; font-weight: 400; color: var(--text-light); }
.nav { display: flex; align-items: center; gap: 20px; }
.nav a { text-decoration: none; color: var(--text); font-weight: 500; font-size: 0.9rem; transition: color 0.2s; }
.nav a:hover { color: var(--primary); }
.btn { display: inline-flex; align-items: center; gap: 6px; padding: 10px 22px; border-radius: var(--radius-full); font-weight: 600; font-size: 0.9rem; cursor: pointer; border: none; text-decoration: none; transition: all 0.2s; }
.btn-primary { background: var(--grad); color: #fff; }
.btn-primary:hover { opacity: 0.9; transform: translateY(-1px); }
.btn-accent { background: var(--grad-accent); color: var(--navy); }
.btn-outline { background: transparent; border: 2px solid var(--primary); color: var(--primary); }
.btn-outline:hover { background: var(--primary); color: #fff; }
.btn-sm { padding: 7px 16px; font-size: 0.82rem; }
.lang-btn { background: var(--bg); border: 1px solid var(--border); padding: 5px 12px; border-radius: var(--radius-full); cursor: pointer; font-size: 0.82rem; font-weight: 600; color: var(--navy); }

/* Hero */
.hero { min-height: 100vh; display: flex; align-items: center; padding-top: 80px; background: radial-gradient(ellipse at 20% 50%, rgba(0,102,204,0.07), transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(201,168,76,0.05), transparent 50%), var(--bg); }
.hero-inner { max-width: 1240px; margin: 0 auto; padding: 60px 24px; }
.api-live { display: inline-flex; align-items: center; gap: 6px; padding: 4px 14px; border-radius: var(--radius-full); background: rgba(16,185,129,0.1); color: var(--success); font-size: 0.78rem; font-weight: 600; margin-bottom: 20px; }
.api-live::before { content: ''; width: 6px; height: 6px; border-radius: 50%; background: var(--success); animation: pulse 2s infinite; }
@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
.hero h1 { font-size: clamp(2rem, 5vw, 3.2rem); font-weight: 900; color: var(--navy); line-height: 1.2; margin-bottom: 16px; }
.hero h1 .accent { background: var(--grad-accent); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
.hero p { font-size: 1.1rem; color: var(--text-light); max-width: 540px; margin-bottom: 28px; }
.hero-btns { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 48px; }

/* Stats */
.stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
.stat { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 20px; text-align: center; transition: all 0.3s; }
.stat:hover { transform: translateY(-3px); box-shadow: var(--shadow); }
.stat-num { font-size: 1.8rem; font-weight: 800; background: var(--grad); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
.stat-label { font-size: 0.82rem; color: var(--text-light); margin-top: 4px; }

/* Sections */
.section { padding: 72px 0; }
.section.bg-surface { background: var(--surface); }
.container { max-width: 1240px; margin: 0 auto; padding: 0 24px; }
.section-header { text-align: center; margin-bottom: 40px; }
.section-header h2 { font-size: 1.8rem; font-weight: 800; color: var(--navy); }
.section-header p { color: var(--text-light); margin-top: 6px; }
.grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
.grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }

/* Cards */
.card { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 24px; transition: all 0.3s; }
.card:hover { box-shadow: var(--shadow); transform: translateY(-2px); }
.doctor-card { text-align: center; }
.doctor-avatar { width: 72px; height: 72px; border-radius: 50%; background: var(--grad-accent); margin: 0 auto 14px; display: flex; align-items: center; justify-content: center; font-size: 1.6rem; font-weight: 700; color: var(--navy); }
.specialty-tag { color: var(--primary); font-weight: 600; font-size: 0.85rem; }
.branch-chip { font-size: 0.78rem; color: var(--text-light); background: var(--bg); padding: 2px 10px; border-radius: var(--radius-full); display: inline-block; margin: 6px 0 12px; }
.dept-card { text-align: center; }
.dept-icon { width: 52px; height: 52px; border-radius: var(--radius); background: var(--grad); margin: 0 auto 12px; display: flex; align-items: center; justify-content: center; font-size: 1.4rem; }
.branch-card { overflow: hidden; padding: 0; }
.branch-header { background: var(--grad); padding: 28px 24px; color: white; }
.branch-body { padding: 20px 24px; }

/* CTA */
.cta { background: var(--grad); padding: 72px 0; text-align: center; }
.cta h2 { font-size: 1.8rem; color: white; margin-bottom: 10px; }
.cta p { color: rgba(255,255,255,0.8); margin-bottom: 28px; }
.cta-btns { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }

/* Footer */
.footer { background: var(--navy); color: rgba(255,255,255,0.7); padding: 48px 0 24px; }
.footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 32px; margin-bottom: 32px; }
.footer h4 { color: white; margin-bottom: 12px; font-size: 0.95rem; }
.footer a { color: rgba(255,255,255,0.6); text-decoration: none; display: block; margin-bottom: 6px; font-size: 0.88rem; }
.footer a:hover { color: var(--accent); }
.footer-bottom { border-top: 1px solid rgba(255,255,255,0.1); padding-top: 20px; text-align: center; font-size: 0.82rem; }

/* WhatsApp */
.wa { position: fixed; bottom: 24px; ${isAr ? 'left' : 'right'}: 24px; width: 52px; height: 52px; background: #25D366; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 16px rgba(37,211,102,0.4); z-index: 99; font-size: 1.5rem; text-decoration: none; transition: transform 0.2s; }
.wa:hover { transform: scale(1.1); }

/* Loading */
.loader { display: flex; justify-content: center; padding: 32px; }
.spinner { width: 28px; height: 28px; border: 3px solid var(--border); border-top-color: var(--primary); border-radius: 50%; animation: spin 0.8s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }

/* Toast */
.toast { position: fixed; bottom: 24px; ${isAr ? 'right' : 'left'}: 24px; padding: 14px 20px; border-radius: var(--radius); color: white; font-weight: 600; z-index: 9999; transform: translateY(80px); opacity: 0; transition: all 0.4s; }
.toast.show { transform: translateY(0); opacity: 1; }
.toast.success { background: var(--success); }
.toast.error { background: var(--danger); }

/* Mobile toggle */
.mobile-btn { display: none; background: none; border: none; cursor: pointer; font-size: 1.4rem; }

@media (max-width: 900px) {
  .nav { display: none; }
  .mobile-btn { display: block; }
  .nav.open { display: flex; flex-direction: column; position: fixed; inset: 0; background: white; padding: 80px 24px 24px; z-index: 500; gap: 12px; }
  .stats, .grid-3, .grid-4 { grid-template-columns: 1fr 1fr; }
  .footer-grid { grid-template-columns: 1fr; }
}
@media (max-width: 480px) {
  .stats { grid-template-columns: 1fr 1fr; }
  .grid-3, .grid-4 { grid-template-columns: 1fr; }
}
</style>
</head>
<body>

<header class="header">
  <div class="header-inner">
    <a href="/" class="logo">
      <div class="logo-icon">🏥</div>
      <div class="logo-text">${t('الحياة الوطني', 'Hayat National')}<small>BrainSAIT Healthcare OS v${VERSION}</small></div>
    </a>
    <nav class="nav" id="mainNav">
      <a href="#departments">${t('الأقسام', 'Departments')}</a>
      <a href="#branches">${t('الفروع', 'Branches')}</a>
      <a href="#doctors">${t('الأطباء', 'Doctors')}</a>
      <a href="/api/health" target="_blank">${t('الحالة', 'Status')}</a>
      <button class="lang-btn" onclick="toggleLang()">${isAr ? 'EN' : 'عربي'}</button>
      <a href="tel:966920000094" class="btn btn-primary btn-sm">${t('احجز موعد', 'Book Now')}</a>
    </nav>
    <button class="mobile-btn" onclick="document.getElementById('mainNav').classList.toggle('open')">☰</button>
  </div>
</header>

<section class="hero">
  <div class="hero-inner">
    <div class="api-live">● ${t('بيانات حية', 'Live Data')}</div>
    <h1>${t('مجموعة مستشفيات<br>', 'Hospital Group<br>')}<span class="accent">${t('الحياة الوطني', 'Hayat National')}</span></h1>
    <p>${t('أكثر من 25 عاماً من التميز في الرعاية الصحية المتكاملة — مشغّل بنظام BrainSAIT Healthcare OS', 'Over 25 years of integrated healthcare excellence — Powered by BrainSAIT Healthcare OS')}</p>
    <div class="hero-btns">
      <a href="tel:966920000094" class="btn btn-accent">${t('📅 احجز موعد', '📅 Book Appointment')}</a>
      <a href="#departments" class="btn btn-outline">${t('تصفح الأقسام', 'Browse Departments')}</a>
    </div>
    <div class="stats">
      <div class="stat"><div class="stat-num" id="s-providers">—</div><div class="stat-label">${t('طبيب', 'Doctors')}</div></div>
      <div class="stat"><div class="stat-num">5</div><div class="stat-label">${t('فروع', 'Branches')}</div></div>
      <div class="stat"><div class="stat-num" id="s-depts">—</div><div class="stat-label">${t('قسم طبي', 'Departments')}</div></div>
      <div class="stat"><div class="stat-num">1200</div><div class="stat-label">${t('سرير', 'Beds')}</div></div>
    </div>
  </div>
</section>

<section class="section bg-surface" id="departments">
  <div class="container">
    <div class="section-header"><h2>${t('الأقسام الطبية', 'Medical Departments')}</h2><p>${t('42+ تخصصاً طبياً', '42+ medical specialties')}</p></div>
    <div class="grid-4" id="dept-grid"><div class="loader"><div class="spinner"></div></div></div>
  </div>
</section>

<section class="section" id="branches">
  <div class="container">
    <div class="section-header"><h2>${t('فروعنا', 'Our Branches')}</h2><p>${t('5 فروع في مختلف مناطق المملكة', '5 branches across Saudi Arabia')}</p></div>
    <div class="grid-3" id="branch-grid"><div class="loader"><div class="spinner"></div></div></div>
  </div>
</section>

<section class="section bg-surface" id="doctors">
  <div class="container">
    <div class="section-header"><h2>${t('أطباؤنا', 'Our Doctors')}</h2><p>${t('فريق من أمهر الاستشاريين', 'World-class consultants')}</p></div>
    <div class="grid-4" id="doctor-grid"><div class="loader"><div class="spinner"></div></div></div>
    <div style="text-align:center;margin-top:28px;"><a href="tel:966920000094" class="btn btn-outline">${t('عرض جميع الأطباء', 'View All Doctors')}</a></div>
  </div>
</section>

<section class="cta">
  <div class="container">
    <h2>${t('صحتك أولاً', 'Your Health First')}</h2>
    <p>${t('احجز موعدك الآن واحصل على أفضل رعاية طبية في المملكة', 'Book your appointment and receive world-class healthcare')}</p>
    <div class="cta-btns">
      <a href="tel:966920000094" class="btn btn-accent">${t('احجز موعد الآن', 'Book Now')}</a>
      <a href="https://wa.me/966920000094" class="btn" style="background:white;color:var(--navy);">${t('واتساب', 'WhatsApp')}</a>
    </div>
  </div>
</section>

<footer class="footer">
  <div class="container">
    <div class="footer-grid">
      <div>
        <h4>${t('مستشفى الحياة الوطني', 'Hayat National Hospital')}</h4>
        <p style="font-size:0.88rem;margin-bottom:12px;">${t('نظام BrainSAIT Healthcare OS — Oracle + NPHIES', 'BrainSAIT Healthcare OS — Oracle + NPHIES')}</p>
        <div class="api-live" style="display:inline-flex;">● API v${VERSION}</div>
      </div>
      <div>
        <h4>${t('روابط سريعة', 'Quick Links')}</h4>
        <a href="#departments">${t('الأقسام الطبية', 'Departments')}</a>
        <a href="#branches">${t('فروعنا', 'Branches')}</a>
        <a href="#doctors">${t('أطباؤنا', 'Doctors')}</a>
        <a href="/api/health">${t('حالة الخدمة', 'Service Status')}</a>
      </div>
      <div>
        <h4>${t('تواصل معنا', 'Contact')}</h4>
        <a href="tel:966920000094">+966920000094</a>
        <a href="mailto:info@hayathospitals.com">info@hayathospitals.com</a>
        <a href="https://wa.me/966920000094">${t('واتساب', 'WhatsApp')}</a>
      </div>
    </div>
    <div class="footer-bottom">© 2026 ${t('مستشفى الحياة الوطني', 'Hayat National Hospital')} — BrainSAIT Healthcare OS ${VERSION}</div>
  </div>
</footer>

<a href="https://wa.me/966920000094" class="wa" target="_blank" rel="noopener">💬</a>
<div class="toast" id="toast"></div>

<script>
const API = '';  // same origin
const LANG = '${lang}';
const IS_AR = LANG === 'ar';

function toggleLang() {
  const next = IS_AR ? 'en' : 'ar';
  window.location.search = '?lang=' + next;
}

function showToast(msg, type = 'success') {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = 'toast ' + type + ' show';
  setTimeout(() => t.className = 'toast', 3000);
}

async function loadStats() {
  try {
    const r = await fetch(API + '/api/stats');
    const d = await r.json();
    document.getElementById('s-providers').textContent = (d.stats?.total_providers || 700).toLocaleString();
    document.getElementById('s-depts').textContent = (d.stats?.total_departments || 42).toLocaleString();
  } catch {}
}

async function loadDepartments() {
  try {
    const r = await fetch(API + '/api/providers');
    const d = await r.json();
    const depts = [...new Set((d.providers || []).map(p => p.department).filter(Boolean))].slice(0, 8);
    const grid = document.getElementById('dept-grid');
    if (!depts.length) { grid.innerHTML = '<p style="color:var(--text-light);text-align:center;">—</p>'; return; }
    grid.innerHTML = depts.map(dep => {
      const icons = {Surgery:'🔪',Cardiology:'❤️',Pediatrics:'👶',Orthopedics:'🦴',Dermatology:'💆','Internal':'🩺','OB/GYN':'👩',Ophthalmology:'👁️',Neurology:'🧠',Dentistry:'🦷',Urology:'🫁',Psychiatry:'🧘'};
      const icon = Object.entries(icons).find(([k]) => dep.includes(k))?.[1] || '🏥';
      const count = (d.providers || []).filter(p => p.department === dep).length;
      return \`<div class="card dept-card"><div class="dept-icon">\${icon}</div><h4 style="font-size:0.95rem;margin-bottom:4px;">\${dep}</h4><p style="font-size:0.8rem;color:var(--text-light);">\${count} \${IS_AR ? 'طبيب' : 'doctors'}</p></div>\`;
    }).join('');
  } catch {}
}

async function loadBranches() {
  try {
    const r = await fetch(API + '/api/branches');
    const d = await r.json();
    const grid = document.getElementById('branch-grid');
    grid.innerHTML = (d.branches || []).map(b => \`
      <div class="card branch-card">
        <div class="branch-header">
          <div style="font-size:1.5rem;margin-bottom:8px;">🏥</div>
          <h3 style="color:white;margin-bottom:4px;">\${IS_AR ? b.name_ar : b.name_en}</h3>
          <span style="color:rgba(255,255,255,0.75);font-size:0.88rem;">\${IS_AR ? b.city_ar : b.city_en}</span>
        </div>
        <div class="branch-body">
          <p style="font-size:0.85rem;color:var(--text-light);margin-bottom:12px;">\${IS_AR ? b.address_ar : b.address_en}</p>
          <a href="tel:\${b.phone.replace('+','')}" class="btn btn-primary btn-sm">\${IS_AR ? '📞 اتصل' : '📞 Call'}</a>
        </div>
      </div>
    \`).join('');
  } catch {}
}

async function loadDoctors() {
  try {
    const r = await fetch(API + '/api/providers');
    const d = await r.json();
    const grid = document.getElementById('doctor-grid');
    const docs = (d.providers || []).slice(0, 8);
    grid.innerHTML = docs.map(doc => {
      const name = IS_AR ? doc.name_ar : doc.name_en;
      const initial = name.split(' ').pop()?.charAt(0) || '؟';
      return \`<div class="card doctor-card">
        <div class="doctor-avatar">\${initial}</div>
        <h4 style="font-size:0.95rem;margin-bottom:4px;">\${name}</h4>
        <div class="specialty-tag">\${doc.specialty}</div>
        <div class="branch-chip">\${doc.branch}</div>
        <a href="tel:966920000094" class="btn btn-primary btn-sm">\${IS_AR ? 'احجز' : 'Book'}</a>
      </div>\`;
    }).join('');
  } catch {}
}

// Load all data
Promise.all([loadStats(), loadDepartments(), loadBranches(), loadDoctors()]);
</script>
</body>
</html>`;

  return new Response(html, { headers: HTML_HEADERS });
}

// ─── Main Router ──────────────────────────────────────────────────────────────

export default {
  async fetch(request, env, ctx) {
    // CORS preflight
    if (request.method === 'OPTIONS') return corsOptions();

    const url = new URL(request.url);
    const path = url.pathname;
    const ip = request.headers.get('CF-Connecting-IP') || 'unknown';

    // Rate limit
    if (!rateLimit(ip)) {
      return jsonRes({ error: 'Rate limit exceeded. Try again in 60s.' }, 429);
    }

    // ── HTML routes ──────────────────────────────────────────────────────────
    if (path === '/' || path === '/index.html') {
      const lang = url.searchParams.get('lang') || 'ar';
      return serveHTML(lang);
    }

    // ── Health ───────────────────────────────────────────────────────────────
    if (path === '/health') return handleHealth(env);

    // ── Public API routes ────────────────────────────────────────────────────
    if (path === '/api/health') return handleHealth(env);
    if (path === '/api/stats') return handleStats(env);
    if (path === '/api/branches') return handleBranches();
    if (path.startsWith('/api/providers')) return handleProviders(request, env);
    if (path.startsWith('/api/departments')) return handleDepartments(env);
    if (path.startsWith('/api/patients')) return handlePatients(request, env);
    if (path.startsWith('/api/appointments')) return handleAppointments(request, env);
    if (path.startsWith('/api/eligibility')) return handleEligibility(request, env);
    if (path.startsWith('/api/nphies')) {
      const sub = path.replace('/api/nphies', '') || '';
      return handleNphies(request, env, sub);
    }
    if (path.startsWith('/api/chat')) return handleChat(request, env);

    // ── Protected API routes (require X-API-Key) ─────────────────────────────
    const authErr = requireApiKey(request, env);
    if (authErr) return authErr;

    if (path.startsWith('/api/claims')) return handleClaims(request, env);
    if (path.startsWith('/api/visits')) return handleVisits(request, env);
    if (path.startsWith('/api/orders')) return handleOrders(request, env);
    if (path.startsWith('/api/lab-results')) return handleLabResults(request, env);
    if (path.startsWith('/api/prior-auth')) return handlePriorAuth(request, env);
    if (path === '/api/rcm') return handleRCM(env);

    // ── DB schema info ───────────────────────────────────────────────────────
    if (path === '/api/schema') {
      const tables = ['patients', 'appointments', 'claims', 'providers', 'departments',
        'eligibility_checks', 'visits', 'orders', 'lab_results', 'prior_authorizations'];
      const info = {};
      for (const t of tables) {
        const r = await env.DB.prepare(`SELECT COUNT(*) as count FROM ${t}`).first().catch(() => ({ count: 0 }));
        info[t] = { count: r?.count || 0 };
      }
      return jsonRes({ database: 'hnh-gharnata', version: VERSION, tables: info });
    }

    // Fallback: serve HTML for unknown routes (SPA-style)
    const lang = url.searchParams.get('lang') || 'ar';
    return serveHTML(lang);
  },
};
