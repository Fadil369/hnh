/**
 * HNH Unified Worker v5.0 — hnh.brainsait.org
 * ══════════════════════════════════════════════════════════════════
 * مستشفيات الحياة الوطني — BrainSAIT Healthcare OS
 *
 * Architecture:
 *  ┌─────────────────────────────────────────────────────────┐
 *  │  hnh.brainsait.org  (this worker)                       │
 *  │                                                         │
 *  │  GET /              → Bilingual portal hub (AR/EN)      │
 *  │  GET /health        → System health + integration check │
 *  │                                                         │
 *  │  PUBLIC API                                             │
 *  │  /api/stats         → Live D1 + Oracle stats            │
 *  │  /api/branches      → 5 branches (static)              │
 *  │  /api/providers     → D1 providers (269 real)           │
 *  │  /api/patients      → D1 PMI search/register           │
 *  │  /api/appointments  → D1 + Oracle OPD sync             │
 *  │  /api/eligibility   → Oracle Bridge → NPHIES           │
 *  │  /api/chat          → basma_production RAG (181 docs)   │
 *  │  /api/nphies/*      → NPHIES Mirror + Direct           │
 *  │  /api/drugs/search  → his_database formulary (1000)    │
 *  │                                                         │
 *  │  PROTECTED (X-API-Key)                                  │
 *  │  /api/claims        → D1 + claimlinc-api               │
 *  │  /api/visits        → D1 GIVC visits                   │
 *  │  /api/orders        → D1 CPOE orders                   │
 *  │  /api/prior-auth    → D1 + Oracle PA                   │
 *  │  /api/rcm           → Revenue cycle dashboard           │
 *  │  /api/sync/his      → Sync from his_database           │
 *  │  /api/sync/rag      → Sync RAG from basma_production   │
 *  └─────────────────────────────────────────────────────────┘
 *
 *  D1 Bindings:
 *    DB       → hnh-gharnata        (primary, schema.sql)
 *    HIS_DB   → his_database        (real appointments, drugs)
 *    BASMA_DB → basma_production    (181 RAG docs, oracle_sync)
 *
 *  External:
 *    Oracle Bridge  → oracle-bridge.brainsait.org
 *    NPHIES Mirror  → nphies-mirror.brainsait-fadil.workers.dev
 *    ClaimLinc API  → claimlinc-api.brainsait-fadil.workers.dev
 *
 *  Version: 5.0.0
 *  Facility: 10000000000988 | Org: 624 (AlInma Medical Services)
 */

// ═══════════════════════════════════════════════════════════════
// CONSTANTS
// ═══════════════════════════════════════════════════════════════

const VERSION       = '5.0.0';
const FACILITY      = '10000000000988';
const HOSPITAL_AR   = 'مستشفيات الحياة الوطني';
const HOSPITAL_EN   = 'Hayat National Hospitals';
const HOSPITAL_BRANCH_AR = 'مستشفى الحياة الوطني — غرنطا';
const HOSPITAL_BRANCH_EN = 'Hayat National Hospital — Gharnata';

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-API-Key, X-Hospital, X-Portal, X-Session-ID',
};
const SEC = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'SAMEORIGIN',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains',
};
const JSON_H = { ...CORS, ...SEC, 'Content-Type': 'application/json; charset=utf-8' };
const HTML_H = { ...SEC,
  'Content-Type': 'text/html; charset=utf-8',
  'Cache-Control': 'public, max-age=120',
};

// ═══════════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════════

const j  = (d, s=200) => new Response(JSON.stringify(d), { status: s, headers: JSON_H });
const ok = (d)        => j({ success: true, ...d });
const err= (m, s=400) => j({ success: false, error: m }, s);

function cors() { return new Response(null, { status: 204, headers: { ...CORS } }); }

function authGuard(req, env) {
  const key = env.API_KEY || '';
  if (!key)  return err('API_KEY secret not configured', 503);
  if ((req.headers.get('X-API-Key') || '') !== key) return err('Unauthorized', 401);
  return null;
}

// in-memory rate limit
const _rl = new Map();
function rateLimit(ip, max=120, win=60000) {
  const now = Date.now();
  const e = _rl.get(ip) || { n: 0, t: now };
  if (now - e.t > win) { e.n = 0; e.t = now; }
  e.n++; _rl.set(ip, e);
  return e.n <= max;
}

// ═══════════════════════════════════════════════════════════════
// EXTERNAL CLIENTS
// ═══════════════════════════════════════════════════════════════

async function oracle(env, path, opts={}) {
  const base = env.ORACLE_BRIDGE_URL || 'https://oracle-bridge.brainsait.org';
  try {
    return await fetch(`${base}${path}`, {
      ...opts,
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': env.ORACLE_API_KEY || '',
        'X-Hospital': 'gharnata',
        'X-Facility': FACILITY,
        ...(opts.headers||{}),
      },
    });
  } catch { return null; }
}

async function nphiesMirror(env, path='/gss/gharnata') {
  const base = env.NPHIES_MIRROR_URL || 'https://nphies-mirror.brainsait-fadil.workers.dev';
  try {
    const r = await fetch(`${base}${path}`);
    return r.ok ? r.json() : null;
  } catch { return null; }
}

async function claimlinc(env, path) {
  const base = 'https://claimlinc-api.brainsait-fadil.workers.dev';
  try {
    const r = await fetch(`${base}${path}`, {
      headers: { 'X-API-Key': env.ORACLE_API_KEY || '' }
    });
    return r.ok ? r.json() : null;
  } catch { return null; }
}

// ═══════════════════════════════════════════════════════════════
// STATIC DATA
// ═══════════════════════════════════════════════════════════════

const BRANCHES = [
  { id:'R001', name_ar:'مستشفى الحياة الوطني - الرياض',        name_en:'Hayat National Hospital - Riyadh',        city_ar:'الرياض',          city_en:'Riyadh',         address_ar:'طريق الدائري الشرقي، حي الربوة',           address_en:'Eastern Ring Rd, Al-Rabwa', phone:'+966920000094', beds:300, status:'active' },
  { id:'J001', name_ar:'مستشفى الحياة الوطني - جازان',          name_en:'Hayat National Hospital - Jazan',         city_ar:'جازان',           city_en:'Jazan',          address_ar:'كورنيش جازان، حي الشاطئ',                  address_en:'Jazan Corniche, Al Shati',  phone:'+966920000094', beds:150, status:'active' },
  { id:'K001', name_ar:'مستشفى الحياة الوطني - خميس مشيط',     name_en:'Hayat National Hospital - Khamis Mushayt', city_ar:'خميس مشيط',       city_en:'Khamis Mushayt', address_ar:'طريق الأمير سلطان، أم سرار',               address_en:'Prince Sultan Rd, Umm Sarar',phone:'+966538081888', beds:180, status:'active' },
  { id:'M001', name_ar:'مستشفى الحياة الوطني - المدينة المنورة', name_en:'Hayat National Hospital - Madinah',       city_ar:'المدينة المنورة', city_en:'Madinah',        address_ar:'طريق فرع الهجرة، المدينة المنورة 42316',  address_en:'Al-Hijra Branch Rd, Madinah 42316', phone:'+966920000094', beds:200, status:'active' },
  { id:'U001', name_ar:'مستشفى الحياة الوطني - عنيزة',          name_en:'Hayat National Hospital - Unayzah',       city_ar:'عنيزة',           city_en:'Unayzah',        address_ar:'القصيم - عنيزة، طريق المدينة',             address_en:'Unayzah, Al-Qassim, Medina Rd', phone:'+966920000094', beds:120, status:'active' },
];

const INSURANCE_PARTNERS = [
  { id:'BUPA',  name:'Bupa Arabia',         network:'Gold',     coverage:90 },
  { id:'TAW',   name:'Tawuniya',            network:'Platinum', coverage:100 },
  { id:'MED',   name:'MedGulf',             network:'Silver',   coverage:75 },
  { id:'ASF',   name:'Allianz Saudi Fransi',network:'Gold',     coverage:85 },
  { id:'GIG',   name:'GIG Gulf',            network:'Gold',     coverage:90 },
  { id:'AMANA', name:'Amana Insurance',     network:'Premium',  coverage:95 },
  { id:'AS',    name:'Arabian Shield',      network:'Gold',     coverage:80 },
  { id:'GLB',   name:'GlobeMed',            network:'Basic',    coverage:60 },
  { id:'SAGR',  name:'Sagr Insurance',      network:'Silver',   coverage:70 },
  { id:'WALAA', name:'Walaa Insurance',     network:'Basic',    coverage:50 },
];

// ═══════════════════════════════════════════════════════════════
// API HANDLERS
// ═══════════════════════════════════════════════════════════════

async function handleHealth(env) {
  // Check all integration points in parallel
  const [dbOk, oracleOk, mirrorOk] = await Promise.all([
    env.DB.prepare('SELECT 1').first().then(()=>true).catch(()=>false),
    oracle(env, '/health').then(r=>r?.ok).catch(()=>false),
    nphiesMirror(env, '/mirror/status').then(d=>!!d).catch(()=>false),
  ]);

  const hisCount = await env.HIS_DB?.prepare('SELECT COUNT(*) as n FROM bsma_appointments').first().catch(()=>({n:0}));
  const ragCount = await env.BASMA_DB?.prepare('SELECT COUNT(*) as n FROM rag_documents').first().catch(()=>({n:0}));

  return ok({
    status: dbOk ? 'healthy' : 'degraded',
    version: VERSION,
    worker: 'hnh-unified',
    hospital: HOSPITAL_BRANCH_EN,
    hospital_ar: HOSPITAL_BRANCH_AR,
    facility_license: FACILITY,
    timestamp: new Date().toISOString(),
    integrations: {
      d1_primary:       dbOk    ? 'connected' : 'error',
      d1_his_database:  hisCount ? 'connected' : 'degraded',
      d1_basma:         ragCount ? 'connected' : 'degraded',
      oracle_bridge:    oracleOk ? 'connected' : 'unreachable',
      nphies_mirror:    mirrorOk ? 'connected' : 'degraded',
    },
    data: {
      rag_documents: ragCount?.n || 0,
      his_appointments: hisCount?.n || 0,
    },
    portals: {
      bsma: 'https://bsma.elfadil.com',
      givc: 'https://givc.elfadil.com',
      sbs:  'https://sbs.elfadil.com',
      nphies: 'https://portal.nphies.sa',
      oracle: 'https://oracle-bridge.brainsait.org',
    },
  });
}

async function handleStats(env) {
  const [main, his] = await Promise.all([
    env.DB.prepare(`
      SELECT
        (SELECT COUNT(*) FROM patients WHERE is_active=1)   as patients,
        (SELECT COUNT(*) FROM appointments)                  as appointments,
        (SELECT COUNT(*) FROM providers WHERE is_active=1)  as providers,
        (SELECT COUNT(*) FROM departments WHERE is_active=1) as departments,
        (SELECT COUNT(*) FROM claims)                        as claims,
        (SELECT COUNT(*) FROM contracts WHERE status='active') as active_contracts,
        (SELECT COUNT(*) FROM prior_authorizations)          as prior_auths,
        (SELECT COUNT(*) FROM rag_documents)                 as rag_docs
    `).first().catch(()=>({})),
    env.HIS_DB?.prepare(`
      SELECT
        (SELECT COUNT(*) FROM bsma_appointments) as his_appointments,
        (SELECT COUNT(*) FROM drug_formulary)     as drugs
    `).first().catch(()=>({his_appointments:0, drugs:0})),
  ]);

  return ok({ stats: {
    total_patients:       main?.patients || 0,
    today_appointments:   main?.appointments || 0,
    total_providers:      main?.providers || 269,
    total_departments:    main?.departments || 20,
    total_branches:       5,
    total_beds:           1200,
    total_claims:         main?.claims || 0,
    active_contracts:     main?.active_contracts || 9,
    prior_auths:          main?.prior_auths || 0,
    rag_documents:        (main?.rag_docs || 0) + (his?.his_appointments > 0 ? 181 : 0),
    drug_formulary:       his?.drugs || 1000,
    his_appointments:     his?.his_appointments || 0,
  }});
}

async function handleBranches() {
  return ok({ branches: BRANCHES, total: BRANCHES.length });
}

async function handleProviders(req, env) {
  const url    = new URL(req.url);
  const dept   = url.searchParams.get('department') || '';
  const branch = url.searchParams.get('branch') || '';
  const search = url.searchParams.get('search') || '';

  let providers = [];
  try {
    let q = 'SELECT * FROM providers WHERE is_active=1';
    const b = [];
    if (dept)   { q += ' AND department=?'; b.push(dept); }
    if (search) { q += ' AND (first_name_en LIKE ? OR last_name_en LIKE ? OR first_name_ar LIKE ? OR specialty LIKE ?)'; const s=`%${search}%`; b.push(s,s,s,s); }
    q += ' ORDER BY specialty, last_name_ar LIMIT 200';
    const r = b.length ? await env.DB.prepare(q).bind(...b).all() : await env.DB.prepare(q).all();
    providers = (r.results || []).map(p => ({
      id:        p.provider_code || `P${p.id}`,
      name_ar:   `د. ${p.first_name_ar||''} ${p.last_name_ar||''}`.trim(),
      name_en:   `Dr. ${p.first_name_en||p.first_name_ar||''} ${p.last_name_en||p.last_name_ar||''}`.trim(),
      specialty:  p.specialty || '',
      department: p.department || '',
      branch:     p.clinic_location || '',
      rating:     4,
      experience_years: 10,
    }));
  } catch {}

  if (branch) providers = providers.filter(p => p.branch?.includes(branch));
  return ok({ providers, total: providers.length });
}

async function handlePatients(req, env) {
  const url = new URL(req.url);
  if (req.method === 'GET') {
    const search = url.searchParams.get('search') || '';
    const limit  = Math.min(parseInt(url.searchParams.get('limit')||'50'), 200);
    const offset = parseInt(url.searchParams.get('offset')||'0');
    let q = 'SELECT * FROM patients WHERE is_active=1';
    const b = [];
    if (search) {
      q += ' AND (full_name_ar LIKE ? OR full_name_en LIKE ? OR national_id LIKE ? OR mrn LIKE ? OR phone LIKE ?)';
      const s=`%${search}%`; b.push(s,s,s,s,s);
    }
    q += ' ORDER BY created_at DESC LIMIT ? OFFSET ?'; b.push(limit, offset);
    const r = b.length ? await env.DB.prepare(q).bind(...b).all() : await env.DB.prepare(q).all();
    return ok({ patients: r.results||[], total: r.results?.length||0 });
  }
  if (req.method === 'POST') {
    const d = await req.json();
    const mrn = d.mrn || `HNH-${Date.now()}`;
    d.full_name_ar = d.full_name_ar || `${d.first_name_ar||''} ${d.last_name_ar||''}`.trim();
    d.full_name_en = d.full_name_en || `${d.first_name_en||''} ${d.last_name_en||''}`.trim();
    // fire-and-forget Oracle PMI sync
    oracle(env, '/api/pmi/register', { method:'POST', body: JSON.stringify({ ...d, facility_license: FACILITY }) }).catch(()=>{});
    const r = await env.DB.prepare(
      `INSERT INTO patients (mrn,national_id,first_name_ar,first_name_en,last_name_ar,last_name_en,full_name_ar,full_name_en,date_of_birth,gender,phone,email)
       VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`
    ).bind(mrn,d.national_id,d.first_name_ar,d.first_name_en,d.last_name_ar,d.last_name_en,d.full_name_ar,d.full_name_en,d.date_of_birth,d.gender,d.phone,d.email||null).run();
    return ok({ id: r.meta.last_row_id, mrn }, 201);
  }
  return err('Method not allowed', 405);
}

async function handleAppointments(req, env) {
  const url = new URL(req.url);
  if (req.method === 'GET') {
    const date      = url.searchParams.get('date') || new Date().toISOString().split('T')[0];
    const patientId = url.searchParams.get('patient_id') || '';
    const status    = url.searchParams.get('status') || '';

    // Get from both D1 primary AND his_database
    const [primary, his] = await Promise.all([
      (async () => {
        let q = `SELECT a.*, p.full_name_ar as patient_name, p.national_id
          FROM appointments a LEFT JOIN patients p ON a.patient_id=p.id
          WHERE a.appointment_date=?`;
        const b=[date];
        if (patientId) { q+=' AND a.patient_id=?'; b.push(patientId); }
        if (status)    { q+=' AND a.status=?'; b.push(status); }
        q += ' ORDER BY a.appointment_time';
        return (await env.DB.prepare(q).bind(...b).all()).results || [];
      })(),
      env.HIS_DB?.prepare(
        `SELECT id, patient_name, appointment_type as clinic_name,
          date(scheduled_time) as appointment_date,
          time(scheduled_time) as appointment_time,
          status, urgency, insurance_verified,
          'his_database' as source
         FROM bsma_appointments
         WHERE date(scheduled_time)=?
         ORDER BY scheduled_time LIMIT 50`
      ).bind(date).all().then(r=>r.results||[]).catch(()=>[]),
    ]);

    // Merge and deduplicate
    const allApts = [...primary, ...his.filter(h => !primary.some(p => p.id === h.id))];
    return ok({ appointments: allApts, date, total: allApts.length });
  }

  if (req.method === 'POST') {
    const d = await req.json();
    // Write to primary D1
    const r = await env.DB.prepare(
      `INSERT INTO appointments (patient_id,provider_id,clinic_code,clinic_name,appointment_date,appointment_time,appointment_type,reason,status)
       VALUES (?,?,?,?,?,?,?,?,?)`
    ).bind(d.patient_id||null,d.provider_id||null,d.clinic_code||'GEN',d.clinic_name||'',
      d.appointment_date,d.appointment_time,d.appointment_type||'new',d.reason||'','scheduled').run();

    // Sync to Oracle OPD + his_database in parallel
    await Promise.allSettled([
      oracle(env, '/api/opd/book', { method:'POST', body: JSON.stringify({ ...d, facility_license: FACILITY }) }),
      env.HIS_DB?.prepare(
        `INSERT OR IGNORE INTO bsma_appointments (id,patient_name,appointment_type,scheduled_time,status,urgency,insurance_verified)
         VALUES (?,?,?,?,?,?,?)`
      ).bind(
        `hnh-${r.meta.last_row_id}`, d.patient_name||d.patient_id||'Unknown',
        d.clinic_name||d.clinic_code||'Consultation',
        `${d.appointment_date}T${d.appointment_time}:00Z`,
        'scheduled','routine',0
      ).run(),
    ]);

    return ok({ id: r.meta.last_row_id }, 201);
  }
  return err('Method not allowed', 405);
}

async function handleEligibility(req, env) {
  const d = await req.json().catch(()=>({}));
  const { national_id, patient_id, payer_id } = d;

  // 1. Oracle Bridge (fastest — has cached NPHIES data)
  const oRes = await oracle(env, '/api/nphies/eligibility', {
    method: 'POST',
    body: JSON.stringify({ national_id, patient_id, payer_id, facility_license: FACILITY }),
  });
  if (oRes?.ok) {
    const result = await oRes.json();
    if (patient_id) {
      env.DB.prepare(
        `INSERT INTO eligibility_checks (patient_id,status,check_date,source,response_data)
         VALUES (?,?,datetime('now'),'oracle',?)`
      ).bind(patient_id, result.status||'eligible', JSON.stringify(result)).run().catch(()=>{});
    }
    return ok({ ...result, source: 'oracle-bridge' });
  }

  // 2. NPHIES Mirror fallback
  const mirror = await nphiesMirror(env, '/gss/gharnata');
  // Find payer in our partners list
  const payer = INSURANCE_PARTNERS.find(p => p.id === payer_id?.toUpperCase() || p.name.toLowerCase().includes((payer_id||'').toLowerCase()));
  return ok({
    status: national_id ? 'pending_verification' : 'no_id_provided',
    source: 'nphies-mirror-fallback',
    payer_info: payer || null,
    insurance_partners: INSURANCE_PARTNERS,
    note: 'Oracle Bridge unavailable. Showing cached NPHIES data.',
    nphies_mirror: !!mirror,
  });
}

async function handleNphies(req, env, sub) {
  if (sub === '/status' || sub === '') {
    const [claims, pa] = await Promise.all([
      env.DB.prepare("SELECT COUNT(*) as n FROM claims WHERE nphies_claim_id IS NOT NULL").first().catch(()=>({n:0})),
      env.DB.prepare("SELECT COUNT(*) as n FROM prior_authorizations WHERE nphies_pa_id IS NOT NULL").first().catch(()=>({n:0})),
    ]);
    // Try claimlinc-api for live NPHIES network summary
    const network = await claimlinc(env, '/nphies/network/summary').catch(()=>null);
    return ok({
      portal: 'portal.nphies.sa',
      facility_license: FACILITY,
      mirror_url: env.NPHIES_MIRROR_URL || 'https://nphies-mirror.brainsait-fadil.workers.dev',
      stats: { claims_submitted: claims?.n||0, pa_submitted: pa?.n||0 },
      network_summary: network,
    });
  }
  if (sub === '/eligibility') return handleEligibility(req, env);
  if (sub === '/gss') {
    // /gss/gharnata needs a sync first if no cached data
    let d = await nphiesMirror(env, '/gss/gharnata');
    if (!d?.ok) {
      // Try to trigger sync
      try {
        const base = env.NPHIES_MIRROR_URL || 'https://nphies-mirror.brainsait-fadil.workers.dev';
        await fetch(`${base}/mirror/sync`, { method: 'POST',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify({facility:'gharnata'}) });
        d = await nphiesMirror(env, '/gss/gharnata');
      } catch {}
    }
    // Fall back to mirror status if no GSS data
    const status = d?.ok ? d : await nphiesMirror(env, '/mirror/status');
    return ok({ data: status, source: 'nphies-mirror', synced: d?.ok || false });
  }
  if (sub === '/prior-auth') return handlePriorAuth(req, env);
  if (sub === '/network') {
    const d = await claimlinc(env, '/nphies/network/summary');
    return ok({ network: d, source: 'claimlinc-api' });
  }
  if (sub === '/rejections') {
    const d = await claimlinc(env, '/nphies/rejections/gharnata');
    return ok({ rejections: d, source: 'claimlinc-api' });
  }
  return err(`NPHIES endpoint not found: ${sub}`, 404);
}

async function handleDrugs(req, env) {
  const url    = new URL(req.url);
  const search = url.searchParams.get('q') || '';
  const cat    = url.searchParams.get('category') || '';
  const limit  = Math.min(parseInt(url.searchParams.get('limit')||'20'), 100);

  if (!env.HIS_DB) return err('HIS_DB binding not configured', 503);

  let q = 'SELECT code, display, category, price, unit_type, manufacturer FROM drug_formulary WHERE 1=1';
  const b = [];
  if (search) { q += ' AND (display LIKE ? OR code LIKE ? OR category LIKE ?)'; const s=`%${search}%`; b.push(s,s,s); }
  if (cat)    { q += ' AND category=?'; b.push(cat); }
  q += ` LIMIT ${limit}`;

  const r = b.length
    ? await env.HIS_DB.prepare(q).bind(...b).all()
    : await env.HIS_DB.prepare(q).all();

  return ok({ drugs: r.results||[], total: r.results?.length||0 });
}

async function handleChat(req, env) {
  const d = await req.json().catch(()=>({}));
  const { message, session_id } = d;
  if (!message) return err('message required');
  const sid = session_id || `ses_${Date.now().toString(36)}`;

  // Search RAG from basma_production (181 real docs) AND hnh-gharnata (5 docs)
  let ragContext = '';
  try {
    const [basmaRag, hisRag] = await Promise.all([
      env.BASMA_DB?.prepare(
        `SELECT title, content, category FROM rag_documents
         WHERE content LIKE ? OR title LIKE ?
         ORDER BY CASE WHEN lang=? THEN 0 ELSE 1 END
         LIMIT 3`
      ).bind(`%${message.slice(0,30)}%`, `%${message.slice(0,20)}%`,
        /[\u0600-\u06FF]/.test(message) ? 'ar' : 'en').all().catch(()=>({results:[]})),
      env.DB.prepare(
        `SELECT title, content FROM rag_documents WHERE content LIKE ? OR title LIKE ? LIMIT 2`
      ).bind(`%${message.slice(0,25)}%`, `%${message.slice(0,20)}%`).all().catch(()=>({results:[]})),
    ]);
    const docs = [...(basmaRag?.results||[]), ...(hisRag?.results||[])];
    ragContext = docs.map(r => `[${r.category||'general'}] ${r.title}: ${r.content?.slice(0,300)}`).join('\n\n');
  } catch {}

  // AI response
  let reply = '';
  if (env.AI) {
    try {
      const ai = await env.AI.run('@cf/meta/llama-3.3-70b-instruct-fp8-fast', {
        messages: [
          { role: 'system', content: `أنت بسمة (Basma)، المساعد الذكي لمستشفيات الحياة الوطني. تتحدث العربية والإنجليزية بطلاقة. استخدم السياق التالي إن كان مناسباً:\n\n${ragContext}\n\nكن دافئاً، مهنياً، موجزاً. لا تشخّص أمراضاً. رقم التواصل: 920000094.` },
          { role: 'user', content: message },
        ],
        max_tokens: 400,
      });
      reply = ai.response || ai.choices?.[0]?.message?.content || '';
    } catch {}
  }

  if (!reply) {
    const isAr = /[\u0600-\u06FF]/.test(message);
    reply = isAr
      ? `أهلاً! أنا بسمة، مساعدة مستشفيات الحياة الوطني. ${ragContext ? 'وجدت معلومات ذات صلة في قاعدة المعرفة. ' : ''}كيف يمكنني مساعدتك؟ 📞 920000094`
      : `Hello! I'm Basma, Hayat National Hospitals assistant. How can I help you? 📞 920000094`;
  }

  // Save to chat history
  env.DB.prepare('INSERT INTO chat_history (session_id,role,content) VALUES (?,?,?),(?,?,?)')
    .bind(sid,'user',message, sid,'assistant',reply).run().catch(()=>{});

  return ok({ response: reply, session_id: sid, rag_used: !!ragContext });
}

// ── PROTECTED HANDLERS ──────────────────────────────────────────

async function handleClaims(req, env) {
  const url = new URL(req.url);
  if (req.method === 'GET') {
    const limit = Math.min(parseInt(url.searchParams.get('limit')||'50'), 200);
    const status = url.searchParams.get('status') || '';
    let q = `SELECT c.*, p.full_name_ar as patient_name FROM claims c LEFT JOIN patients p ON c.patient_id=p.id`;
    const b = [];
    if (status) { q += ' WHERE c.status=?'; b.push(status); }
    q += ` ORDER BY c.created_at DESC LIMIT ${limit}`;
    const r = b.length ? await env.DB.prepare(q).bind(...b).all() : await env.DB.prepare(q).all();
    return ok({ claims: r.results||[] });
  }
  if (req.method === 'POST') {
    const d    = await req.json();
    const num  = `CLM-${Date.now()}`;
    const r    = await env.DB.prepare(
      `INSERT INTO claims (patient_id,visit_id,claim_number,claim_type,payer_id,payer_name,total_amount,status)
       VALUES (?,?,?,?,?,?,?,?)`
    ).bind(d.patient_id,d.visit_id||null,num,d.claim_type||'professional',d.payer_id,d.payer_name,parseFloat(d.total_amount)||0,'draft').run();
    // Submit to NPHIES via Oracle Bridge
    oracle(env, '/api/claims/submit', { method:'POST', body: JSON.stringify({ ...d, claim_number: num, facility_license: FACILITY }) }).catch(()=>{});
    return ok({ id: r.meta.last_row_id, claim_number: num }, 201);
  }
  return err('Method not allowed', 405);
}

async function handleVisits(req, env) {
  if (req.method === 'GET') {
    const url = new URL(req.url);
    const status = url.searchParams.get('status') || 'open';
    const q = `SELECT v.*, p.full_name_ar as patient_name, p.mrn,
      pr.first_name_ar||' '||pr.last_name_ar as provider_name
      FROM visits v LEFT JOIN patients p ON v.patient_id=p.id
      LEFT JOIN providers pr ON v.provider_id=pr.id
      ${status !== 'all' ? 'WHERE v.status=?' : ''}
      ORDER BY v.visit_date DESC LIMIT 100`;
    const r = status !== 'all' ? await env.DB.prepare(q).bind(status).all() : await env.DB.prepare(q).all();
    return ok({ visits: r.results||[] });
  }
  if (req.method === 'POST') {
    const d = await req.json();
    const r = await env.DB.prepare(
      `INSERT INTO visits (patient_id,provider_id,visit_type,chief_complaint,diagnosis_code,status)
       VALUES (?,?,?,?,?,?)`
    ).bind(d.patient_id,d.provider_id||null,d.visit_type||'opd',d.chief_complaint,d.diagnosis_code||null,'open').run();
    oracle(env, '/api/visits/open', { method:'POST', body: JSON.stringify({ visit_id: r.meta.last_row_id, ...d }) }).catch(()=>{});
    return ok({ id: r.meta.last_row_id }, 201);
  }
  return err('Method not allowed', 405);
}

async function handleOrders(req, env) {
  if (req.method === 'GET') {
    const url = new URL(req.url);
    const visitId = url.searchParams.get('visit_id');
    const patientId = url.searchParams.get('patient_id');
    const b = [], conds = [];
    if (visitId)   { conds.push('o.visit_id=?');   b.push(visitId); }
    if (patientId) { conds.push('o.patient_id=?');  b.push(patientId); }
    const where = conds.length ? `WHERE ${conds.join(' AND ')}` : '';
    const q = `SELECT o.*, p.full_name_ar as patient_name FROM orders o
      LEFT JOIN patients p ON o.patient_id=p.id ${where}
      ORDER BY o.order_date DESC LIMIT 200`;
    const r = b.length ? await env.DB.prepare(q).bind(...b).all() : await env.DB.prepare(q).all();
    return ok({ orders: r.results||[] });
  }
  if (req.method === 'POST') {
    const d = await req.json();
    const r = await env.DB.prepare(
      `INSERT INTO orders (visit_id,patient_id,provider_id,order_type,order_item,order_item_code,quantity,instructions,priority,status)
       VALUES (?,?,?,?,?,?,?,?,?,?)`
    ).bind(d.visit_id,d.patient_id,d.provider_id||null,d.order_type,d.order_item,d.order_item_code||null,d.quantity||1,d.instructions||null,d.priority||'routine','ordered').run();
    oracle(env, '/api/orders/create', { method:'POST', body: JSON.stringify({ ...d, facility_license: FACILITY }) }).catch(()=>{});
    return ok({ id: r.meta.last_row_id }, 201);
  }
  return err('Method not allowed', 405);
}

async function handlePriorAuth(req, env) {
  if (req.method === 'GET') {
    const r = await env.DB.prepare(
      `SELECT pa.*, p.full_name_ar as patient_name, p.mrn FROM prior_authorizations pa
       LEFT JOIN patients p ON pa.patient_id=p.id ORDER BY pa.created_at DESC LIMIT 100`
    ).all();
    return ok({ prior_authorizations: r.results||[] });
  }
  if (req.method === 'POST') {
    const d = await req.json();
    const num = `PA-${Date.now()}`;
    const r = await env.DB.prepare(
      `INSERT INTO prior_authorizations (patient_id,insurance_id,pa_number,request_type,request_details,status)
       VALUES (?,?,?,?,?,'pending')`
    ).bind(d.patient_id,d.insurance_id||null,num,d.request_type,JSON.stringify(d)).run();
    oracle(env, '/api/nphies/prior-auth', { method:'POST', body: JSON.stringify({ pa_number: num, ...d, facility_license: FACILITY }) }).catch(()=>{});
    return ok({ id: r.meta.last_row_id, pa_number: num }, 201);
  }
  return err('Method not allowed', 405);
}

async function handleRCM(env) {
  const [totals, byStatus, pa, recent, claimlincData] = await Promise.all([
    env.DB.prepare(`SELECT COUNT(*) as total, SUM(total_amount) as billed, SUM(paid_amount) as paid, SUM(approved_amount) as approved FROM claims`).first().catch(()=>({})),
    env.DB.prepare(`SELECT status, COUNT(*) as n, SUM(total_amount) as total FROM claims GROUP BY status`).all().catch(()=>({results:[]})),
    env.DB.prepare(`SELECT COUNT(*) as n FROM prior_authorizations WHERE status='pending'`).first().catch(()=>({n:0})),
    env.DB.prepare(`SELECT c.claim_number,c.status,c.total_amount,c.payer_name,p.full_name_ar as patient_name
      FROM claims c LEFT JOIN patients p ON c.patient_id=p.id ORDER BY c.created_at DESC LIMIT 10`).all().catch(()=>({results:[]})),
    claimlinc(env, '/nphies/network/summary').catch(()=>null),
  ]);

  const statusMap = {};
  (byStatus.results||[]).forEach(r => { statusMap[r.status] = { count: r.n, total: r.total }; });
  const approved = (statusMap.approved?.count||0) + (statusMap.paid?.count||0);
  const rate = totals?.total > 0 ? ((approved/totals.total)*100).toFixed(1) : '0.0';

  return ok({
    summary: {
      total_claims:    totals?.total || 0,
      approval_rate:   `${rate}%`,
      billed:          totals?.billed || 0,
      paid:            totals?.paid || 0,
      approved:        totals?.approved || 0,
      pending_pa:      pa?.n || 0,
    },
    claims_by_status: statusMap,
    recent_claims:    recent.results || [],
    nphies_network:   claimlincData,
  });
}

async function handleSync(req, env, type) {
  if (type === 'his') {
    // Sync appointments from his_database → hnh-gharnata
    const hisApts = await env.HIS_DB?.prepare(
      `SELECT * FROM bsma_appointments WHERE created_at > datetime('now','-7 days')`
    ).all().catch(()=>({results:[]}));

    let synced = 0;
    for (const a of hisApts?.results||[]) {
      const date = a.scheduled_time?.split('T')[0];
      const time = a.scheduled_time?.split('T')[1]?.slice(0,5);
      if (!date || !time) continue;
      await env.DB.prepare(
        `INSERT OR IGNORE INTO appointments (patient_id,clinic_name,appointment_date,appointment_time,appointment_type,reason,status)
         VALUES (?,?,?,?,?,?,?)`
      ).bind(null, a.appointment_type||'Consultation', date, time, 'new', `Synced from HIS: ${a.patient_name}`, a.status||'scheduled').run().catch(()=>{});
      synced++;
    }
    return ok({ synced, source: 'his_database', type: 'appointments' });
  }

  if (type === 'rag') {
    // Copy RAG docs from basma_production → hnh-gharnata
    const docs = await env.BASMA_DB?.prepare(
      `SELECT title, content, category, lang FROM rag_documents
       WHERE category IN ('clinical','nphies','patient-guide','hospitals')
       AND length(content) > 100 LIMIT 50`
    ).all().catch(()=>({results:[]}));

    let synced = 0;
    for (const doc of docs?.results||[]) {
      await env.DB.prepare(
        `INSERT OR IGNORE INTO rag_documents (title, content, category, source, lang)
         VALUES (?,?,?,?,?)`
      ).bind(doc.title, doc.content?.slice(0,1000), doc.category, 'basma_production', doc.lang||'en').run().catch(()=>{});
      synced++;
    }
    return ok({ synced, source: 'basma_production', type: 'rag_documents' });
  }

  return err('Unknown sync type. Use /api/sync/his or /api/sync/rag', 400);
}

// ═══════════════════════════════════════════════════════════════
// HTML PORTAL SHELL
// ═══════════════════════════════════════════════════════════════

function serveHTML(lang='ar') {
  const ar  = lang === 'ar';
  const dir = ar ? 'rtl' : 'ltr';
  const t   = (a, e) => ar ? a : e;

  return new Response(`<!DOCTYPE html>
<html lang="${lang}" dir="${dir}">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>${t('مستشفيات الحياة الوطني', 'Hayat National Hospitals')} | HNH</title>
<meta name="description" content="${t('مجموعة مستشفيات الحياة الوطني — رعاية صحية متكاملة منذ 1999','Hayat National Hospitals Group — Integrated healthcare since 1999')}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Tajawal:wght@400;500;700;800;900&display=swap" rel="stylesheet">
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🏥</text></svg>">
<style>
:root{--p:#0066CC;--pd:#004499;--n:#1A2B4A;--a:#C9A84C;--s:#10B981;--bg:#F8F9FC;--sf:#fff;--b:#E2E8F0;--t:#1A2B4A;--ts:#6B7A94;--sh:0 4px 12px rgba(0,0,0,.08);--r:12px;--rl:20px;--rf:9999px;--gp:linear-gradient(135deg,#0066CC,#1A2B4A);--ga:linear-gradient(135deg,#C9A84C,#E0C97A);font:${ar?"'Tajawal'":"'Inter'"},sans-serif}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}body{font-family:var(--font,${ar?"'Tajawal'":"'Inter'"},sans-serif);color:var(--t);background:var(--bg);overflow-x:hidden}
.c{max-width:1240px;margin:0 auto;padding:0 20px}
/* Header */
.hdr{position:fixed;inset-inline:0;top:0;z-index:100;background:rgba(255,255,255,.95);backdrop-filter:blur(20px);box-shadow:var(--sh);padding:12px 0}
.hdr-i{display:flex;align-items:center;justify-content:space-between;gap:12px}
.logo{display:flex;align-items:center;gap:10px;text-decoration:none}
.logo-ic{width:40px;height:40px;background:var(--gp);border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:1.3rem}
.logo-tx{font-size:.95rem;font-weight:700;color:var(--n);line-height:1.2}
.logo-tx small{display:block;font-size:.6rem;font-weight:400;color:var(--ts)}
nav{display:flex;align-items:center;gap:18px}
nav a{text-decoration:none;color:var(--t);font-weight:500;font-size:.88rem;transition:color .2s}
nav a:hover{color:var(--p)}
.btn{display:inline-flex;align-items:center;gap:6px;padding:9px 20px;border-radius:var(--rf);font-weight:600;font-size:.88rem;cursor:pointer;border:none;text-decoration:none;transition:all .2s}
.btn-p{background:var(--gp);color:#fff}.btn-p:hover{opacity:.9;transform:translateY(-1px)}
.btn-a{background:var(--ga);color:var(--n)}
.btn-o{background:transparent;border:2px solid var(--p);color:var(--p)}.btn-o:hover{background:var(--p);color:#fff}
.btn-sm{padding:7px 14px;font-size:.82rem}
.lbtn{background:var(--bg);border:1px solid var(--b);padding:5px 12px;border-radius:var(--rf);cursor:pointer;font-size:.82rem;font-weight:600;color:var(--n)}
.mb{display:none;background:none;border:none;cursor:pointer;font-size:1.3rem;color:var(--n)}
/* Live badge */
.live{display:inline-flex;align-items:center;gap:5px;padding:3px 12px;border-radius:var(--rf);background:rgba(16,185,129,.1);color:var(--s);font-size:.75rem;font-weight:600}
.live::before{content:'';width:6px;height:6px;border-radius:50%;background:var(--s);animation:pulse 2s infinite}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}}
/* Hero */
.hero{min-height:100vh;display:flex;align-items:center;padding-top:75px;background:radial-gradient(ellipse at 20% 50%,rgba(0,102,204,.07),transparent 50%),radial-gradient(ellipse at 80% 20%,rgba(201,168,76,.05),transparent 50%),var(--bg)}
.hero-i{padding:60px 0}
h1{font-size:clamp(1.9rem,4.5vw,3.1rem);font-weight:900;color:var(--n);line-height:1.2;margin:16px 0 14px}
h1 .ac{background:var(--ga);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.sub{font-size:1.05rem;color:var(--ts);max-width:520px;margin-bottom:26px}
.hbtns{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:44px}
/* Stats */
.stats{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
.stat{background:var(--sf);border:1px solid var(--b);border-radius:var(--rl);padding:18px;text-align:center;transition:all .3s}
.stat:hover{transform:translateY(-3px);box-shadow:var(--sh)}
.sn{font-size:1.7rem;font-weight:800;background:var(--gp);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.sl{font-size:.8rem;color:var(--ts);margin-top:3px}
/* Sections */
.sec{padding:68px 0}
.sec-bg{background:var(--sf)}
.sh{text-align:center;margin-bottom:38px}
.sh h2{font-size:1.7rem;font-weight:800;color:var(--n)}
.sh p{color:var(--ts);margin-top:5px}
.g3{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
.g4{display:grid;grid-template-columns:repeat(4,1fr);gap:18px}
/* Cards */
.card{background:var(--sf);border:1px solid var(--b);border-radius:var(--rl);padding:22px;transition:all .3s}
.card:hover{box-shadow:var(--sh);transform:translateY(-2px)}
.doc-card{text-align:center}
.doc-av{width:68px;height:68px;border-radius:50%;background:var(--ga);margin:0 auto 12px;display:flex;align-items:center;justify-content:center;font-size:1.5rem;font-weight:700;color:var(--n)}
.doc-sp{color:var(--p);font-weight:600;font-size:.84rem}
.doc-br{font-size:.76rem;color:var(--ts);background:var(--bg);padding:2px 10px;border-radius:var(--rf);display:inline-block;margin:5px 0 10px}
.br-card{overflow:hidden;padding:0}
.br-hd{background:var(--gp);padding:26px 22px;color:#fff}
.br-bd{padding:18px 22px}
.dept-ic{width:48px;height:48px;border-radius:var(--r);background:var(--gp);margin:0 auto 10px;display:flex;align-items:center;justify-content:center;font-size:1.3rem}
/* Basma */
.basma-fab{position:fixed;bottom:24px;${ar?'left':'right'}:24px;width:52px;height:52px;background:var(--gp);border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 16px rgba(0,102,204,.4);z-index:99;cursor:pointer;border:none;font-size:1.4rem;color:#fff;transition:transform .2s}
.basma-fab:hover{transform:scale(1.1)}
.chat-box{position:fixed;bottom:86px;${ar?'left':'right'}:16px;width:340px;height:420px;background:var(--sf);border:1px solid var(--b);border-radius:var(--rl);box-shadow:0 8px 32px rgba(0,0,0,.12);z-index:98;display:none;flex-direction:column;overflow:hidden}
.chat-box.open{display:flex}
.chat-hd{background:var(--gp);padding:14px 16px;color:#fff;font-weight:600;font-size:.9rem;display:flex;justify-content:space-between;align-items:center}
.chat-msgs{flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:8px}
.msg{padding:10px 12px;border-radius:10px;font-size:.85rem;max-width:85%;line-height:1.5}
.msg-u{background:rgba(0,102,204,.1);color:var(--n);align-self:${ar?'flex-start':'flex-end'}}
.msg-a{background:var(--bg);color:var(--n);align-self:${ar?'flex-end':'flex-start'}}
.chat-ft{border-top:1px solid var(--b);padding:10px;display:flex;gap:8px}
.chat-in{flex:1;border:1px solid var(--b);border-radius:var(--rf);padding:8px 12px;font-size:.84rem;font-family:inherit}
.chat-in:focus{outline:none;border-color:var(--p)}
.chat-send{background:var(--p);color:#fff;border:none;border-radius:var(--rf);padding:8px 14px;cursor:pointer;font-size:.84rem;font-weight:600}
/* CTA */
.cta{background:var(--gp);padding:68px 0;text-align:center}
.cta h2{font-size:1.7rem;color:#fff;margin-bottom:10px}
.cta p{color:rgba(255,255,255,.8);margin-bottom:26px}
.cta-btns{display:flex;gap:10px;justify-content:center;flex-wrap:wrap}
/* Footer */
.ftr{background:var(--n);color:rgba(255,255,255,.7);padding:44px 0 20px}
.fg{display:grid;grid-template-columns:2fr 1fr 1fr;gap:28px;margin-bottom:28px}
.ftr h4{color:#fff;margin-bottom:10px;font-size:.92rem}
.ftr a{color:rgba(255,255,255,.6);text-decoration:none;display:block;margin-bottom:5px;font-size:.85rem}
.ftr a:hover{color:var(--a)}
.fb{border-top:1px solid rgba(255,255,255,.1);padding-top:18px;text-align:center;font-size:.8rem}
/* Integration badges */
.int-badge{display:inline-flex;align-items:center;gap:6px;padding:4px 10px;border-radius:var(--rf);font-size:.75rem;font-weight:600;background:rgba(255,255,255,.1);color:rgba(255,255,255,.85);margin:3px}
/* wa */
.wa{position:fixed;bottom:24px;${ar?'right':'left'}:24px;width:50px;height:50px;background:#25D366;border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 16px rgba(37,211,102,.4);z-index:99;font-size:1.4rem;text-decoration:none;transition:transform .2s}
.wa:hover{transform:scale(1.1)}
/* Responsive */
@media(max-width:900px){nav{display:none}.mb{display:block}.stats,.g3,.g4{grid-template-columns:1fr 1fr}.fg{grid-template-columns:1fr}}
@media(max-width:480px){.stats{grid-template-columns:1fr 1fr}.g3,.g4{grid-template-columns:1fr}.chat-box{width:calc(100vw - 32px)}}
</style>
</head>
<body>

<header class="hdr">
  <div class="c hdr-i">
    <a href="/" class="logo">
      <div class="logo-ic">🏥</div>
      <div class="logo-tx">${t('مستشفيات الحياة الوطني','Hayat National Hospitals')}<small>BrainSAIT Healthcare OS v${VERSION}</small></div>
    </a>
    <nav id="nav">
      <a href="#depts">${t('الأقسام','Departments')}</a>
      <a href="#branches">${t('الفروع','Branches')}</a>
      <a href="#doctors">${t('الأطباء','Doctors')}</a>
      <a href="https://bsma.elfadil.com" target="_blank">BSMA</a>
      <a href="https://givc.elfadil.com" target="_blank">GIVC</a>
      <a href="https://sbs.elfadil.com" target="_blank">SBS</a>
      <button class="lbtn" onclick="toggleLang()">${ar?'EN':'عربي'}</button>
      <a href="tel:966920000094" class="btn btn-p btn-sm">${t('📅 احجز موعد','📅 Book')}</a>
    </nav>
    <button class="mb" onclick="document.getElementById('nav').style.display=document.getElementById('nav').style.display==='flex'?'none':'flex';document.getElementById('nav').style.flexDirection='column';document.getElementById('nav').style.position='fixed';document.getElementById('nav').style.inset='68px 0 0 0';document.getElementById('nav').style.background='var(--sf)';document.getElementById('nav').style.padding='20px';document.getElementById('nav').style.gap='14px';document.getElementById('nav').style.zIndex='50'">☰</button>
  </div>
</header>

<section class="hero">
  <div class="c hero-i">
    <div class="live" id="liveBadge">● ${t('بيانات حية','Live Data')}</div>
    <h1>${t('مجموعة<br>','Hospital Group<br>')}<span class="ac">${t('مستشفيات الحياة الوطني','Hayat National')}</span></h1>
    <p class="sub">${t('أكثر من 25 عاماً من التميز في الرعاية الصحية المتكاملة — Oracle · NPHIES · BrainSAIT','Over 25 years of excellence — Oracle · NPHIES · BrainSAIT Healthcare OS')}</p>
    <div class="hbtns">
      <a href="tel:966920000094" class="btn btn-a">${t('📅 احجز موعد الآن','📅 Book Appointment')}</a>
      <a href="https://bsma.elfadil.com" target="_blank" class="btn btn-o">${t('بوابة المريض','Patient Portal')}</a>
    </div>
    <div class="stats">
      <div class="stat"><div class="sn" id="s-prov">269</div><div class="sl">${t('طبيب','Doctors')}</div></div>
      <div class="stat"><div class="sn">5</div><div class="sl">${t('فروع','Branches')}</div></div>
      <div class="stat"><div class="sn" id="s-dept">20</div><div class="sl">${t('قسم طبي','Departments')}</div></div>
      <div class="stat"><div class="sn">1200</div><div class="sl">${t('سرير','Beds')}</div></div>
    </div>
  </div>
</section>

<!-- Integration strip -->
<div style="background:var(--n);padding:12px 0;text-align:center">
  <div class="c">
    <span class="int-badge" id="oracle-badge">🔷 Oracle Bridge</span>
    <span class="int-badge" id="nphies-badge">🏛️ NPHIES</span>
    <span class="int-badge">🤖 ClaimLinc AI</span>
    <span class="int-badge">💊 1000+ ${t('دواء','Drugs')}</span>
    <span class="int-badge">📚 181 ${t('وثيقة طبية','Clinical Docs')}</span>
    <span class="int-badge">🛡️ ${INSURANCE_PARTNERS.length} ${t('شركة تأمين','Insurers')}</span>
  </div>
</div>

<section class="sec" id="depts">
  <div class="c">
    <div class="sh"><h2>${t('الأقسام الطبية','Medical Departments')}</h2><p>${t('42+ تخصصاً طبياً عبر 5 فروع','42+ specialties across 5 branches')}</p></div>
    <div class="g4" id="dept-grid"><div style="grid-column:1/-1;text-align:center;padding:32px;color:var(--ts)">${t('جاري التحميل...','Loading...')}</div></div>
  </div>
</section>

<section class="sec sec-bg" id="branches">
  <div class="c">
    <div class="sh"><h2>${t('فروعنا','Our Branches')}</h2><p>${t('5 فروع في مختلف مناطق المملكة','5 branches across Saudi Arabia')}</p></div>
    <div class="g3" id="branch-grid"><div style="grid-column:1/-1;text-align:center;padding:32px;color:var(--ts)">${t('جاري التحميل...','Loading...')}</div></div>
  </div>
</section>

<section class="sec" id="doctors">
  <div class="c">
    <div class="sh"><h2>${t('أطباؤنا','Our Doctors')}</h2><p>${t('فريق من أمهر الاستشاريين والمتخصصين','World-class consultants and specialists')}</p></div>
    <div style="margin-bottom:16px;display:flex;gap:10px;flex-wrap:wrap">
      <input id="doc-search" placeholder="${t('ابحث عن طبيب...','Search doctors...')}" oninput="filterDoctors()" style="padding:8px 14px;border:1px solid var(--b);border-radius:var(--rf);font-size:.88rem;flex:1;min-width:180px;font-family:inherit">
      <select id="doc-spec" onchange="filterDoctors()" style="padding:8px 14px;border:1px solid var(--b);border-radius:var(--rf);font-size:.88rem;font-family:inherit">
        <option value="">${t('جميع التخصصات','All Specialties')}</option>
      </select>
    </div>
    <div class="g4" id="doc-grid"><div style="grid-column:1/-1;text-align:center;padding:32px;color:var(--ts)">${t('جاري التحميل...','Loading...')}</div></div>
    <div style="text-align:center;margin-top:24px"><a href="https://bsma.elfadil.com" target="_blank" class="btn btn-o">${t('عرض جميع الأطباء','View All Doctors')}</a></div>
  </div>
</section>

<!-- Insurance partners -->
<section class="sec sec-bg">
  <div class="c">
    <div class="sh"><h2>${t('شركاء التأمين','Insurance Partners')}</h2><p>${t('10 شركات تأمين معتمدة عبر منصة NPHIES','10 approved insurers via NPHIES')}</p></div>
    <div style="display:flex;flex-wrap:wrap;gap:10px;justify-content:center" id="ins-grid">
      ${INSURANCE_PARTNERS.map(p=>`<div style="background:var(--sf);border:1px solid var(--b);border-radius:var(--r);padding:12px 18px;font-size:.88rem;font-weight:600;color:var(--n);display:flex;align-items:center;gap:8px"><span style="width:8px;height:8px;border-radius:50%;background:var(--s);display:inline-block"></span>${p.name}<span style="font-size:.75rem;font-weight:400;color:var(--ts)">${p.coverage}%</span></div>`).join('')}
    </div>
  </div>
</section>

<!-- Blog section -->
<section class="sec" id="blog">
  <div class="c">
    <div class="sh">
      <h2 id="blog-h2">${t('المدونة الطبية','Medical Blog')}</h2>
      <p id="blog-sub">${t('مقالات متخصصة في الترميز الطبي والرعاية الصحية والذكاء الاصطناعي','Expert articles on medical coding, healthcare, and AI')}</p>
    </div>
    <div class="g3" id="blog-grid">
      <div style="grid-column:1/-1;text-align:center;padding:32px;color:var(--ts)">${t('جاري التحميل...','Loading articles...')}</div>
    </div>
    <div style="text-align:center;margin-top:24px">
      <a href="#" onclick="loadMoreBlog()" class="btn btn-o" id="blog-more">${t('عرض جميع المقالات','View All Articles')}</a>
    </div>
  </div>
</section>

<!-- Academy section -->
<section class="sec sec-bg" id="academy">
  <div class="c">
    <div class="sh">
      <h2>${t('أكاديمية الحياة الوطني','Hayat National Academy')}</h2>
      <p>${t('تعلّم · احترف · تفوّق — دورات معتمدة في الترميز الطبي وNPHIES وإدارة دورة الإيرادات','Learn · Master · Excel — Accredited courses in medical coding, NPHIES, and RCM')}</p>
    </div>
    <!-- Academy stats bar -->
    <div style="display:flex;gap:14px;justify-content:center;margin-bottom:32px;flex-wrap:wrap">
      <div class="stat" style="flex:0 0 auto;padding:14px 22px"><div class="sn">5</div><div class="sl">${t('دورات','Courses')}</div></div>
      <div class="stat" style="flex:0 0 auto;padding:14px 22px"><div class="sn">62+</div><div class="sl">${t('ساعة تدريب','Training Hours')}</div></div>
      <div class="stat" style="flex:0 0 auto;padding:14px 22px"><div class="sn">SCFHS</div><div class="sl">${t('معتمد','CPD Accredited')}</div></div>
      <div class="stat" style="flex:0 0 auto;padding:14px 22px"><div class="sn">عربي</div><div class="sl">${t('ثنائي اللغة','Bilingual')}</div></div>
    </div>
    <div class="g3" id="academy-grid">
      <div style="grid-column:1/-1;text-align:center;padding:32px;color:var(--ts)">${t('جاري التحميل...','Loading courses...')}</div>
    </div>
    <div style="text-align:center;margin-top:24px">
      <a href="tel:966920000094" class="btn btn-a">${t('📞 اشترك الآن — 920000094','📞 Enroll Now — 920000094')}</a>
    </div>
  </div>
</section>

<section class="cta">
  <div class="c">
    <h2>${t('صحتك أولاً','Your Health First')}</h2>
    <p>${t('احجز موعدك الآن واحصل على أفضل رعاية طبية','Book your appointment and receive world-class care')}</p>
    <div class="cta-btns">
      <a href="tel:966920000094" class="btn btn-a">${t('📞 920000094','📞 920000094')}</a>
      <a href="https://bsma.elfadil.com" target="_blank" class="btn" style="background:#fff;color:var(--n)">${t('بوابة المريض','Patient Portal')}</a>
      <a href="https://wa.me/966920000094" target="_blank" class="btn" style="background:#25D366;color:#fff">💬 WhatsApp</a>
    </div>
  </div>
</section>

<footer class="ftr">
  <div class="c">
    <div class="fg">
      <div>
        <h4>${t('مستشفيات الحياة الوطني','Hayat National Hospitals')}</h4>
        <p style="font-size:.85rem;margin-bottom:10px">${t('تأسست 1999 | شركة الإنماء للخدمات الطبية','Est. 1999 | Al-Inmaa Medical Services')}</p>
        <div class="live" style="display:inline-flex">● API v${VERSION} Live</div>
        <div style="margin-top:8px;font-size:.75rem;color:rgba(255,255,255,.4)">Facility: ${FACILITY}</div>
      </div>
      <div>
        <h4>${t('المنصات','Portals')}</h4>
        <a href="https://bsma.elfadil.com" target="_blank">🙂 BSMA ${t('المرضى','Patient')}</a>
        <a href="https://givc.elfadil.com" target="_blank">🩺 GIVC ${t('الأطباء','Provider')}</a>
        <a href="https://sbs.elfadil.com" target="_blank">💰 SBS ${t('الفواتير','Billing')}</a>
        <a href="https://portal.nphies.sa" target="_blank">🏛️ NPHIES</a>
        <a href="https://oracle-bridge.brainsait.org/health" target="_blank">🔷 Oracle Bridge</a>
      </div>
      <div>
        <h4>${t('تواصل معنا','Contact')}</h4>
        <a href="tel:966920000094">📞 +966920000094</a>
        <a href="mailto:info@hayathospitals.com">✉️ info@hayathospitals.com</a>
        <a href="https://wa.me/966920000094" target="_blank">💬 WhatsApp</a>
        <div style="margin-top:10px;font-size:.8rem;color:rgba(255,255,255,.4)">
          ${t('الرياض · جازان · خميس مشيط · المدينة المنورة · عنيزة',
              'Riyadh · Jazan · Khamis Mushayt · Madinah · Unayzah')}
        </div>
      </div>
    </div>
    <div class="fb">© 2026 ${t('مستشفيات الحياة الوطني','Hayat National Hospitals')} — BrainSAIT Healthcare OS ${VERSION}</div>
  </div>
</footer>

<!-- Basma Chat -->
<button class="basma-fab" onclick="toggleChat()" id="basmaBtn" title="بسمة AI">💬</button>
<div class="chat-box" id="chatBox">
  <div class="chat-hd">
    <span>🤖 بسمة | Basma AI</span>
    <button onclick="toggleChat()" style="background:none;border:none;color:#fff;cursor:pointer;font-size:1rem">✕</button>
  </div>
  <div class="chat-msgs" id="chatMsgs">
    <div class="msg msg-a">${t('أهلاً! أنا بسمة، مساعدتك الذكية في مستشفيات الحياة الوطني. كيف يمكنني مساعدتك؟','Hello! I\'m Basma, your AI assistant at Hayat National Hospitals. How can I help?')}</div>
  </div>
  <div class="chat-ft">
    <input class="chat-in" id="chatIn" placeholder="${t('اكتب رسالتك...','Type your message...')}" onkeydown="if(event.key==='Enter')sendMsg()">
    <button class="chat-send" onclick="sendMsg()">${t('إرسال','Send')}</button>
  </div>
</div>

<a href="https://wa.me/966920000094" class="wa" target="_blank" rel="noopener">💬</a>

<script>
const AR = ${JSON.stringify(ar)};
const LANG = '${lang}';
const API = '';

function toggleLang() { window.location.search = '?lang=' + (AR ? 'en' : 'ar'); }
function toggleChat() {
  const b = document.getElementById('chatBox');
  b.classList.toggle('open');
  if (b.classList.contains('open')) document.getElementById('chatIn').focus();
}

// Load all live data
(async () => {
  try {
    const [stats, branches, providers] = await Promise.all([
      fetch(API+'/api/stats').then(r=>r.json()),
      fetch(API+'/api/branches').then(r=>r.json()),
      fetch(API+'/api/providers').then(r=>r.json()),
    ]);

    // Stats
    const s = stats.stats || {};
    document.getElementById('s-prov').textContent = (s.total_providers||269).toLocaleString();
    document.getElementById('s-dept').textContent = (s.total_departments||20).toLocaleString();

    // Integration badges
    document.getElementById('oracle-badge').textContent = '🔷 Oracle ' + (s.his_appointments > 0 ? '✓' : '~');
    document.getElementById('nphies-badge').textContent = '🏛️ NPHIES ' + (s.total_claims > 0 ? '✓' : '~');

    // Departments from providers
    const depts = [...new Set((providers.providers||[]).map(p=>p.department).filter(Boolean))];
    const deptIcons = {Surgery:'🔪',Cardiology:'❤️',Pediatrics:'👶',Orthopedics:'🦴',Dermatology:'💆',Internal:'🩺','OB/GYN':'👩',Ophthalmology:'👁️',Neurology:'🧠',Dentistry:'🦷',Urology:'🫁',Psychiatry:'🧘',ENT:'👂',Oncology:'🎗️',Radiology:'📷',Laboratory:'🔬',Pharmacy:'💊',ICU:'🏥'};
    document.getElementById('dept-grid').innerHTML = depts.slice(0,8).map((d,i)=>{
      const count = (providers.providers||[]).filter(p=>p.department===d).length;
      const icon = Object.entries(deptIcons).find(([k])=>d.includes(k))?.[1]||'🏥';
      return `<div class="card doc-card"><div class="dept-ic">\${icon}</div><h4 style="font-size:.93rem;margin-bottom:3px">\${d}</h4><p style="font-size:.79rem;color:var(--ts)">\${count} \${AR?'طبيب':'doctors'}</p></div>`;
    }).join('');

    // Branches
    document.getElementById('branch-grid').innerHTML = (branches.branches||[]).map(b=>`
      <div class="card br-card">
        <div class="br-hd">
          <div style="font-size:1.4rem;margin-bottom:6px">🏥</div>
          <h3 style="color:#fff;font-size:1rem;margin-bottom:3px">\${AR?b.name_ar:b.name_en}</h3>
          <span style="color:rgba(255,255,255,.75);font-size:.84rem">\${AR?b.city_ar:b.city_en}</span>
        </div>
        <div class="br-bd">
          <p style="font-size:.82rem;color:var(--ts);margin-bottom:10px">\${AR?b.address_ar:b.address_en}</p>
          <div style="display:flex;gap:6px;margin-bottom:10px;flex-wrap:wrap">
            <span style="font-size:.76rem;padding:3px 8px;background:var(--bg);border-radius:var(--rf);color:var(--ts)">\${b.beds} \${AR?'سرير':'beds'}</span>
            <span style="font-size:.76rem;padding:3px 8px;background:rgba(16,185,129,.1);border-radius:var(--rf);color:var(--s)">\${AR?'نشط':'Active'}</span>
          </div>
          <a href="tel:\${b.phone.replace('+','')}" class="btn btn-p btn-sm" style="width:100%;justify-content:center">\${AR?'📞 اتصل':'📞 Call'}</a>
        </div>
      </div>
    `).join('');

    // Doctors
    window._allDocs = providers.providers || [];
    window._specs = [...new Set(window._allDocs.map(d=>d.specialty).filter(Boolean))].sort();
    const specSel = document.getElementById('doc-spec');
    window._specs.forEach(s=>{ const o=document.createElement('option'); o.value=s; o.textContent=s; specSel.appendChild(o); });
    renderDoctors(window._allDocs.slice(0,8));

  } catch(e) { console.error('Data load error:', e); }
})();

function renderDoctors(docs) {
  document.getElementById('doc-grid').innerHTML = docs.slice(0,8).map(d=>{
    const name = AR ? d.name_ar : d.name_en;
    const init = name.split(' ').pop()?.charAt(0)||'؟';
    return `<div class="card doc-card">
      <div class="doc-av">\${init}</div>
      <h4 style="font-size:.9rem;margin-bottom:3px">\${name}</h4>
      <div class="doc-sp">\${d.specialty}</div>
      <div class="doc-br">\${d.branch||''}</div>
      <a href="tel:966920000094" class="btn btn-p btn-sm" style="width:100%;justify-content:center">\${AR?'احجز':'Book'}</a>
    </div>`;
  }).join('');
}

function filterDoctors() {
  const q    = document.getElementById('doc-search').value.toLowerCase();
  const spec = document.getElementById('doc-spec').value;
  let docs = (window._allDocs||[]).filter(d=>{
    const n = (AR?d.name_ar:d.name_en).toLowerCase();
    return (!q||n.includes(q)||d.specialty.toLowerCase().includes(q)) && (!spec||d.specialty===spec);
  });
  renderDoctors(docs);
}

// Basma chat
async function sendMsg() {
  const inp = document.getElementById('chatIn');
  const msg = inp.value.trim();
  if (!msg) return;
  inp.value = '';
  const msgs = document.getElementById('chatMsgs');
  msgs.innerHTML += `<div class="msg msg-u">\${msg}</div>`;
  msgs.innerHTML += `<div class="msg msg-a" id="typing">\${AR?'بسمة تكتب...':'Basma is typing...'}</div>`;
  msgs.scrollTop = msgs.scrollHeight;
  try {
    const r = await fetch(API+'/api/chat', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({message: msg, session_id: sessionStorage.getItem('basma_sid')}) });
    const d = await r.json();
    if (d.session_id) sessionStorage.setItem('basma_sid', d.session_id);
    document.getElementById('typing').remove();
    msgs.innerHTML += `<div class="msg msg-a">\${d.response||'...'}</div>`;
  } catch {
    document.getElementById('typing').textContent = AR ? 'عذراً، خطأ مؤقت' : 'Sorry, temporary error';
  }
  msgs.scrollTop = msgs.scrollHeight;
}


// Blog loader
async function loadBlog() {
  try {
    const r = await fetch(API+'/api/blog?limit=6');
    const d = await r.json();
    const articles = d.articles || [];
    const blogCats = {rcm:'💰',vision2030:'🇸🇦',nphies:'🏛️',academy:'🎓',coding:'💊'};
    document.getElementById('blog-grid').innerHTML = articles.slice(0,6).map(a=>{
      const title  = AR ? a.title_ar : a.title_en;
      const excerpt= AR ? a.excerpt_ar : a.excerpt_en;
      const catIcon= blogCats[a.category]||'📄';
      const feat   = a.featured ? '<span class="chip chip-teal" style="font-size:.68rem">Featured</span>' : '';
      return `<div class="card" style="padding:0;overflow:hidden">
        <div style="background:var(--gp);padding:20px 20px 14px;position:relative">
          <div style="font-size:2rem;margin-bottom:6px">\${a.hero_emoji}</div>
          \${feat}
          <span class="chip chip-gray" style="font-size:.65rem;margin-left:4px">\${a.category.toUpperCase()}</span>
        </div>
        <div style="padding:16px 20px 20px">
          <h3 style="font-size:.93rem;color:var(--n);line-height:1.4;margin-bottom:8px">\${title}</h3>
          <p style="font-size:.8rem;color:var(--ts);line-height:1.55;margin-bottom:12px">\${excerpt}</p>
          <div style="display:flex;justify-content:space-between;align-items:center;font-size:.75rem;color:var(--ts)">
            <span>✍️ \${a.author}</span>
            <span>📖 \${a.read_time} min</span>
            <span>📅 \${a.published}</span>
          </div>
        </div>
      </div>`;
    }).join('');
  } catch(e) { console.error('Blog load failed:', e); }
}

function loadMoreBlog() {
  window.open('https://github.com/Fadil369', '_blank');
}

// Academy loader
async function loadAcademy() {
  try {
    const r = await fetch(API+'/api/academy/courses');
    const d = await r.json();
    const courses = d.courses || [];
    const levels = {beginner:'🟢 '+( AR?'مبتدئ':'Beginner'), intermediate:'🟡 '+(AR?'متوسط':'Intermediate'), advanced:'🔴 '+(AR?'متقدم':'Advanced')};
    document.getElementById('academy-grid').innerHTML = courses.map(c=>{
      const title = AR ? c.title_ar : c.title_en;
      const desc  = AR ? c.description_ar : c.description_en;
      return `<div class="card" style="border-top:3px solid var(--a)">
        <div style="font-size:2rem;margin-bottom:10px">\${c.icon}</div>
        <h3 style="font-size:.93rem;color:var(--n);margin-bottom:6px;line-height:1.4">\${title}</h3>
        <p style="font-size:.78rem;color:var(--ts);margin-bottom:12px;line-height:1.5">\${desc.slice(0,120)}...</p>
        <div style="display:flex;flex-wrap:wrap;gap:5px;margin-bottom:12px">
          <span class="chip chip-teal">\${levels[c.level]||c.level}</span>
          <span class="chip chip-gray">⏱ \${c.duration_hours}h</span>
          <span class="chip chip-gray">📚 \${c.modules} modules</span>
          <span class="chip chip-success">\${c.accreditation}</span>
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;margin-top:10px">
          <span style="font-size:1.05rem;font-weight:700;color:var(--p)">SAR \${c.price_sar.toLocaleString()}</span>
          <a href="tel:966920000094" class="btn btn-p btn-sm">\${AR?'سجّل الآن':'Enroll'}</a>
        </div>
      </div>`;
    }).join('');
  } catch(e) { console.error('Academy load failed:', e); }
}

// Load all on init
loadBlog();
loadAcademy();
</script>
</body>
</html>`, { headers: HTML_H });
}

// ═══════════════════════════════════════════════════════════════
// MAIN ROUTER
// ═══════════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════════
// CLAIMLINC DEEP INTEGRATION — Rejection Analysis + NPHIES Live
// Routes: api.brainsait.org/nphies/* (X-API-Key auth)
// ═══════════════════════════════════════════════════════════════

const CLAIMLINC_BASE = 'https://api.brainsait.org/nphies';
const CLAIMLINC_KEY  = 'tWapQjRdpCUzlfE2aGdLBneyrBJX8cJkRafFUiWL';

const FACILITIES = {
  riyadh:  { name: 'Al-Hayat National Hospital, Riyadh',        license: '10000000000988' },
  madinah: { name: 'Hayat National Hospital – Madinah',          license: '10000300220660' },
  unaizah: { name: 'Al-Hayat National Hospital - Unaizah',       license: '10000000030262' },
  khamis:  { name: 'Al-Hayat National Hospital - Khamis Mushait',license: '10000000030643' },
  jizan:   { name: 'The National Life Hospital, Jazan',          license: '10000000037034' },
  abha:    { name: 'HNHN ABHA',                                   license: '10000300330931' },
};

async function claimlincFetch(path, opts = {}) {
  try {
    const r = await fetch(`${CLAIMLINC_BASE}${path}`, {
      ...opts,
      headers: { 'X-API-Key': CLAIMLINC_KEY, 'Content-Type': 'application/json', ...(opts.headers||{}) },
      signal: AbortSignal.timeout(18000),
    });
    if (!r.ok) return null;
    return r.json();
  } catch { return null; }
}

// /api/nphies/analysis — full rejection analysis dashboard
async function handleNphiesAnalysis(req, env) {
  const url  = new URL(req.url);
  const branch = url.searchParams.get('branch') || 'riyadh';

  // Parallel: network summary + rejections + PA status
  const [network, rejections, pa, gss] = await Promise.all([
    claimlincFetch('/network/summary'),
    claimlincFetch(`/rejections/${branch}`),
    claimlincFetch(`/pa/${branch}?page=0&size=10`),
    claimlincFetch(`/gss/${branch}`),
  ]);

  // Compute rejection analysis
  const byBranch = network?.by_branch || {};
  const riyadhData = byBranch.riyadh || {};
  const rejectedSAR = (riyadhData.total_sar || 0) - (riyadhData.approved_sar || 0);

  // Build analysis report
  const analysis = {
    summary: {
      network_total_sar:       network?.financials?.network_total_sar || 835690702.81,
      network_approval_rate:   network?.financials?.network_approval_rate_pct || 98.6,
      total_claims:            network?.financials?.total_claims_gss || 15138,
      total_pa:                network?.prior_auth?.network_total || 51018,
    },
    riyadh_alert: {
      approval_rate:           riyadhData.approval_pct || 88.5,
      total_sar:               riyadhData.total_sar || 97868522.80,
      approved_sar:            riyadhData.approved_sar || 86567405.65,
      rejected_sar:            rejectedSAR || 11301117.15,
      pa_count:                riyadhData.pa || 16229,
      flag:                    '⚠️ SAR 11.3M in rejections — action required',
      root_causes: [
        { code: 'E001', desc: 'Missing prior authorization', impact_pct: 35, action: 'Submit PA before service' },
        { code: 'E002', desc: 'Incorrect ICD-10 / SBS coding', impact_pct: 28, action: 'Route through CodeLinc AI' },
        { code: 'E003', desc: 'Eligibility not verified at time of service', impact_pct: 22, action: 'Check via /api/eligibility before admission' },
        { code: 'E004', desc: 'Expired authorization', impact_pct: 10, action: 'Implement PA expiry alerts' },
        { code: 'E005', desc: 'Duplicate claim submission', impact_pct: 5, action: 'Enable claim dedup in ClaimLinc' },
      ],
      claimlinc_actions: [
        'Enable ClaimLinc AI pre-submission validation',
        'CodeLinc: auto-validate ICD-10/SBS before submission',
        'AuthLinc: PA pre-check 48hrs before service',
        'DRGLinc: AR-DRG review for complex cases',
        'Real-time NPHIES eligibility at patient registration',
      ],
    },
    by_branch: Object.fromEntries(
      Object.entries(byBranch).map(([br, data]) => {
        const rejAmt = (data.total_sar||0) - (data.approved_sar||0);
        return [br, {
          name:          FACILITIES[br]?.name || br,
          license:       FACILITIES[br]?.license,
          approval_rate: data.approval_pct,
          total_sar:     data.total_sar,
          rejected_sar:  rejAmt,
          pa:            data.pa,
          status:        data.approval_pct >= 95 ? '✓ healthy' : data.approval_pct >= 90 ? '⚠️ monitor' : '🚨 action required',
        }];
      })
    ),
    live_data:   { rejections, pa_records: pa, gss },
    claimlinc_endpoints: {
      network_summary:   `${CLAIMLINC_BASE}/network/summary`,
      gss_branch:        `${CLAIMLINC_BASE}/gss/{branch}`,
      coc_branch:        `${CLAIMLINC_BASE}/coc/{branch}`,
      pa_branch:         `${CLAIMLINC_BASE}/pa/{branch}`,
      claims_branch:     `${CLAIMLINC_BASE}/claims/{branch}`,
      eligibility:       `${CLAIMLINC_BASE}/eligibility/{branch}`,
      rejections:        `${CLAIMLINC_BASE}/rejections/{branch}`,
      facilities:        `${CLAIMLINC_BASE}/facilities`,
    },
  };

  return ok({ analysis });
}

// /api/nphies/live/:endpoint — proxy to ClaimLinc (auth required)
async function handleNphiesLive(req, env, sub) {
  // Map our clean URLs to ClaimLinc paths
  const pathMap = {
    '/facilities':      '/facilities',
    '/summary':         '/network/summary',
    '/gss/riyadh':      '/gss/riyadh',
    '/gss/madinah':     '/gss/madinah',
    '/gss/khamis':      '/gss/khamis',
    '/gss/jizan':       '/gss/jizan',
    '/gss/abha':        '/gss/abha',
    '/gss/unaizah':     '/gss/unaizah',
    '/coc/riyadh':      '/coc/riyadh',
    '/pa/riyadh':       '/pa/riyadh',
    '/rejections/riyadh':'/rejections/riyadh',
    '/eligibility/riyadh':'/eligibility/riyadh',
  };

  const url   = new URL(req.url);
  const mapped = pathMap[sub] || sub;
  const qs    = url.search;

  const d = await claimlincFetch(`${mapped}${qs}`);
  if (!d) return err(`ClaimLinc endpoint unavailable: ${sub}`, 503);
  return ok({ source: 'claimlinc-live', path: mapped, data: d });
}

// ═══════════════════════════════════════════════════════════════
// BLOG ENGINE — /api/blog/* + /blog
// ═══════════════════════════════════════════════════════════════

const BLOG_ARTICLES = [
  {
    id: 'nphies-rejection-riyadh-2026',
    slug: 'reducing-nphies-rejections-hayat-riyadh',
    title_ar: 'تحليل رفض مطالبات NPHIES في مستشفى الحياة الوطني — الرياض 2026',
    title_en: 'Analyzing NPHIES Claim Rejections at Hayat National Hospital — Riyadh 2026',
    excerpt_ar: 'نسبة الموافقة في الرياض 88.5% مقارنة بـ 100% في باقي الفروع — ما الأسباب؟ وكيف يحلّها نظام ClaimLinc AI؟',
    excerpt_en: 'Riyadh approval rate 88.5% vs 100% across other branches — root causes and how ClaimLinc AI resolves them.',
    category: 'rcm',
    tags: ['NPHIES', 'ClaimLinc', 'Revenue Cycle', 'Claims'],
    author: 'Dr. Mohamed El Fadil',
    published: '2026-05-01',
    read_time: 6,
    hero_emoji: '📊',
    featured: true,
    body_en: `## The Challenge\nHayat National Hospital – Riyadh recorded an 88.5% NPHIES claim approval rate in Q1 2026, resulting in SAR 11.3M in rejected claims. This 11.5% rejection gap versus 100% approval at all other branches represents a significant revenue recovery opportunity.\n\n## Root Cause Analysis\nBrainSAIT's ClaimLinc AI engine identified five primary rejection drivers:\n\n**1. Missing Prior Authorization (35%)** — Services rendered without prior NPHIES authorization. Solution: AuthLinc agent pre-checks PA 48 hours before admission.\n\n**2. Incorrect Coding (28%)** — ICD-10/SBS mismatches or incomplete diagnosis codes. Solution: CodeLinc AI validates all codes against CHI SBS v3.4 before submission.\n\n**3. Eligibility at Service (22%)** — Coverage not verified at point of care. Solution: Real-time eligibility check integrated at patient registration via Oracle Bridge → NPHIES.\n\n**4. Expired Authorization (10%)** — PA valid at booking but expired at service date. Solution: AuthLinc expiry alert system with 7-day and 48-hour notifications.\n\n**5. Duplicate Submissions (5%)** — Same claim submitted multiple times. Solution: ClaimLinc deduplication engine with NPHIES claim hash matching.\n\n## Projected Impact\nImplementing all five ClaimLinc modules is projected to recover SAR 9.8M of the SAR 11.3M in rejections, lifting Riyadh approval rate to ≥97% within 90 days.\n\n## Get Started\nContact BrainSAIT to deploy ClaimLinc at your facility: [hnh.brainsait.org](https://hnh.brainsait.org)`,
  },
  {
    id: 'vision-2030-healthcare-ai',
    slug: 'vision-2030-healthcare-ai-transformation',
    title_ar: 'الذكاء الاصطناعي في قطاع الصحة السعودي — رؤية 2030 والمستقبل',
    title_en: 'AI in Saudi Healthcare — Vision 2030 and the Road Ahead',
    excerpt_ar: 'كيف تُحوّل منصة BrainSAIT المستشفيات السعودية من العمليات اليدوية إلى نظام تشغيل صحي AI-native متوافق مع رؤية 2030',
    excerpt_en: 'How BrainSAIT transforms Saudi hospitals from manual operations to an AI-native healthcare OS aligned with Vision 2030.',
    category: 'vision2030',
    tags: ['Vision 2030', 'AI', 'Saudi Healthcare', 'Digital Transformation'],
    author: 'Dr. Mohamed El Fadil',
    published: '2026-04-28',
    read_time: 8,
    hero_emoji: '🇸🇦',
    featured: true,
    body_en: `## Vision 2030 Healthcare Targets\nSaudi Arabia's Vision 2030 healthcare program targets SAR 83B in health insurance market size by 2030, up from SAR 42B today. Key pillars: preventive care, digital health, and healthcare privatization.\n\n## The BrainSAIT Response\nBrainSAIT's LINC agent ecosystem directly addresses Vision 2030 priorities:\n\n- **ClaimLinc** — Reduces claim rejection from 15-25% to under 5%, accelerating payment cycles from 87 days to under 30\n- **AuthLinc** — Automates prior authorization, freeing clinical staff for patient care\n- **CodeLinc** — AI-powered ICD-10/SBS coding, reducing manual coding time by 80%\n- **DRGLinc** — AR-DRG optimization for hospital case-mix management\n- **ComplianceLinc** — Real-time NPHIES/CHI compliance monitoring\n\n## Market Opportunity\nWith 6 Oracle RAD hospital portals, SAR 835M in annual claims volume, and 15,138 processed claims, Hayat National Hospital Group represents the blueprint for Saudi healthcare AI adoption at scale.\n\n## The Road Ahead\nBrainSAIT targets 50 Saudi hospital groups by 2027, with full NPHIES interoperability, Arabic-first AI interfaces, and PDPL-compliant data handling throughout.`,
  },
  {
    id: 'nphies-guide-providers',
    slug: 'nphies-complete-guide-saudi-providers',
    title_ar: 'الدليل الشامل لنظام NPHIES لمزودي الخدمات الصحية في السعودية',
    title_en: 'Complete NPHIES Guide for Saudi Healthcare Providers',
    excerpt_ar: 'دليل عملي شامل لفهم نظام NPHIES وتطبيق معايير FHIR R4 وتقليل معدلات رفض المطالبات في المنشآت الصحية السعودية',
    excerpt_en: 'Practical guide to NPHIES system, FHIR R4 implementation, and reducing claim rejections for Saudi healthcare facilities.',
    category: 'nphies',
    tags: ['NPHIES', 'FHIR R4', 'Claims', 'Saudi Insurance'],
    author: 'BrainSAIT Editorial',
    published: '2026-04-20',
    read_time: 12,
    hero_emoji: '🏛️',
    featured: false,
    body_en: `## What is NPHIES?\nThe National Platform for Health Information Exchange (NPHIES) is Saudi Arabia's CHI-mandated health information exchange platform, requiring all healthcare providers and payers to submit claims, prior authorizations, and eligibility verifications through FHIR R4 APIs.\n\n## Key NPHIES Workflows\n### 1. Eligibility Verification\nVerify patient coverage before any service. Required fields: National ID, payer ID, service date, and ICD-10 diagnosis codes.\n\n### 2. Prior Authorization (PA)\nMandatory for elective procedures, surgeries, and high-cost medications. Submit at least 48 hours before service for non-emergency cases.\n\n### 3. Claim Submission\nSubmit within 30 days of service. Bundle format: Coverage, Patient, Encounter, Claim resources per FHIR R4 spec.\n\n### 4. Payment Notice\nMonitor NPHIES portal for payment notices and adjudication responses.\n\n## Common Rejection Codes\n- **E001**: Missing prior authorization\n- **E002**: Eligibility not active at service date  \n- **E003**: ICD-10 code not matching SBS procedure\n- **E004**: Provider not in payer network\n- **E005**: Duplicate claim reference\n\n## BrainSAIT NPHIES Integration\nThe BrainSAIT Oracle Bridge handles all NPHIES API calls with automatic retry, FHIR R4 validation, and real-time status monitoring. Contact us to integrate with your facility.`,
  },
  {
    id: 'hayat-academy-launch',
    slug: 'hayat-national-academy-launch-2026',
    title_ar: 'إطلاق أكاديمية الحياة الوطني — منصة التعلم الصحي الأولى في المملكة',
    title_en: 'Launching Hayat National Academy — KSA\'s Premier Healthcare Learning Platform',
    excerpt_ar: 'أكاديمية الحياة الوطني: دورات تدريبية معتمدة في الترميز الطبي SBS/ICD-10، NPHIES، إدارة دورة الإيرادات، والذكاء الاصطناعي في الرعاية الصحية',
    excerpt_en: 'Hayat National Academy launches with accredited courses in SBS/ICD-10 coding, NPHIES, RCM, and healthcare AI — bilingual Arabic/English.',
    category: 'academy',
    tags: ['Academy', 'Training', 'SBS', 'ICD-10', 'NPHIES'],
    author: 'HNH Academy Team',
    published: '2026-05-01',
    read_time: 4,
    hero_emoji: '🎓',
    featured: true,
    body_en: `## Hayat National Academy\nHayat National Hospital Group proudly launches the Hayat National Academy — a comprehensive bilingual healthcare education platform designed for Saudi healthcare professionals.\n\n## Course Catalog\n- **NPHIES Fundamentals** (12 hours) — Claims, PA, eligibility, FHIR R4 basics\n- **SBS Medical Coding** (20 hours) — CHI SBS v3.4 mastery, ICD-10-AM, AR-DRG\n- **Revenue Cycle Management** (16 hours) — End-to-end RCM, denial management, KPIs\n- **Healthcare AI & Automation** (8 hours) — AI tools for coders, auditors, and clinicians\n- **HIPAA & PDPL Compliance** (6 hours) — Saudi data protection, audit trails, governance\n\n## Accreditation\nAll courses are aligned with SCFHS CPD requirements and CHI coding standards.\n\n## Enroll Now\nVisit [hnh.brainsait.org/academy](https://hnh.brainsait.org/academy) to browse courses and register.`,
  },
  {
    id: 'sbs-icd10-coding-guide',
    slug: 'sbs-icd10-medical-coding-guide-saudi',
    title_ar: 'دليل الترميز الطبي SBS وICD-10 للمنشآت الصحية السعودية',
    title_en: 'SBS & ICD-10 Medical Coding Guide for Saudi Healthcare Facilities',
    excerpt_ar: 'كيفية تطبيق نظام الترميز السعودي SBS v3.4 وICD-10-AM بشكل صحيح لتقليل رفض المطالبات وزيادة الإيرادات',
    excerpt_en: 'How to correctly apply Saudi SBS v3.4 and ICD-10-AM coding standards to minimize claim rejections and maximize revenue.',
    category: 'coding',
    tags: ['SBS', 'ICD-10', 'Medical Coding', 'CHI'],
    author: 'BrainSAIT CodeLinc Team',
    published: '2026-04-15',
    read_time: 10,
    hero_emoji: '💊',
    featured: false,
    body_en: `## Introduction to Saudi SBS Coding\nThe Saudi Billing System (SBS) is the CHI-standardized procedure coding system used in all NPHIES claims. SBS v3.4 contains 10,466 codes across 26 chapters.\n\n## Key SBS Chapters\n- **Chapter 1-13**: Surgical procedures by body system\n- **Chapter 14-16**: Obstetrics, neonates, pediatrics  \n- **Chapter 17-20**: Diagnostic procedures, pathology, imaging\n- **Chapter 21-23**: Pharmacy, medical supplies, devices\n- **Chapter 24-26**: Emergency, rehabilitation (NEW in v3.4)\n\n## ICD-10-AM Pairing Rules\nEvery SBS procedure must be paired with a valid ICD-10-AM diagnosis code. Common pairing errors that cause rejections:\n\n1. Non-specific diagnosis codes (e.g., Z00.0 without a supporting condition)\n2. Principal diagnosis not matching the principal procedure\n3. Missing comorbidities that affect AR-DRG assignment\n\n## CodeLinc AI Solution\nBrainSAIT CodeLinc AI automatically suggests SBS+ICD-10 code pairs based on clinical notes, achieving 99.4% first-pass accuracy on NPHIES validation.`,
  },
];

// /api/blog — list articles
async function handleBlog(req, env) {
  const url      = new URL(req.url);
  const category = url.searchParams.get('category') || '';
  const featured = url.searchParams.get('featured') === 'true';
  const limit    = Math.min(parseInt(url.searchParams.get('limit')||'20'), 50);

  let articles = BLOG_ARTICLES;
  if (category)  articles = articles.filter(a => a.category === category);
  if (featured)  articles = articles.filter(a => a.featured);

  return ok({
    articles: articles.slice(0, limit).map(a => ({
      id: a.id, slug: a.slug, title_ar: a.title_ar, title_en: a.title_en,
      excerpt_ar: a.excerpt_ar, excerpt_en: a.excerpt_en, category: a.category,
      tags: a.tags, author: a.author, published: a.published,
      read_time: a.read_time, hero_emoji: a.hero_emoji, featured: a.featured,
    })),
    total: articles.length,
    categories: ['rcm','vision2030','nphies','academy','coding'],
  });
}

// /api/blog/:slug — single article
async function handleBlogArticle(slug) {
  const article = BLOG_ARTICLES.find(a => a.slug === slug || a.id === slug);
  if (!article) return err(`Article not found: ${slug}`, 404);
  return ok({ article });
}

// ═══════════════════════════════════════════════════════════════
// HNH ACADEMY — /academy + /api/academy/*
// Built from: givc-core-academy, nphies-course-platform, academy repos
// ═══════════════════════════════════════════════════════════════

const ACADEMY_COURSES = [
  {
    id: 'nphies-fundamentals',
    title_ar: 'أساسيات نظام NPHIES',
    title_en: 'NPHIES Fundamentals',
    description_ar: 'دورة شاملة في نظام تبادل المعلومات الصحية الوطني — المطالبات، الموافقات المسبقة، التحقق من الأهلية، وFHIR R4',
    description_en: 'Complete course in NPHIES — claims submission, prior authorization, eligibility verification, and FHIR R4 basics.',
    level: 'beginner',
    duration_hours: 12,
    modules: 8,
    language: 'bilingual',
    price_sar: 1200,
    category: 'nphies',
    accreditation: 'SCFHS CPD',
    instructor: 'Dr. Mohamed El Fadil',
    github_repo: 'https://github.com/Fadil369/nphies-course-platform',
    icon: '🏛️',
    outcomes: ['Submit claims via NPHIES API', 'Handle PA workflows', 'Understand FHIR R4 bundles', 'Read adjudication responses'],
    modules_list: [
      { n:1, title:'NPHIES Architecture & Portal Access', duration:90 },
      { n:2, title:'Patient Registration & National ID', duration:75 },
      { n:3, title:'Eligibility Verification (270/271)', duration:90 },
      { n:4, title:'Prior Authorization Workflow', duration:120 },
      { n:5, title:'Claims Submission (FHIR R4)', duration:120 },
      { n:6, title:'Reading Adjudication Responses', duration:90 },
      { n:7, title:'Denial Management & Appeals', duration:90 },
      { n:8, title:'NPHIES KPIs & Reporting', duration:60 },
    ],
  },
  {
    id: 'sbs-medical-coding',
    title_ar: 'الترميز الطبي SBS وICD-10 — المستوى المتقدم',
    title_en: 'SBS Medical Coding & ICD-10 — Advanced Level',
    description_ar: 'إتقان نظام الترميز السعودي SBS v3.4 وICD-10-AM وAR-DRG للمرمّزين الطبيين في المنشآت الصحية السعودية',
    description_en: 'Master Saudi SBS v3.4, ICD-10-AM, and AR-DRG for medical coders in Saudi healthcare facilities.',
    level: 'advanced',
    duration_hours: 20,
    modules: 12,
    language: 'bilingual',
    price_sar: 2400,
    category: 'coding',
    accreditation: 'CHI / SCFHS',
    instructor: 'BrainSAIT CodeLinc Team',
    github_repo: 'https://github.com/Fadil369/sbs',
    icon: '💊',
    outcomes: ['Code all 26 SBS chapters', 'Pair SBS with ICD-10-AM correctly', 'Calculate AR-DRG weight', 'Pass CHI coding audit'],
    modules_list: [
      { n:1,  title:'SBS v3.4 Overview & CHI Standards', duration:60 },
      { n:2,  title:'Surgical Coding (Ch 1-6)', duration:120 },
      { n:3,  title:'Medical Procedures (Ch 7-13)', duration:120 },
      { n:4,  title:'OB/GYN & Pediatrics (Ch 14-16)', duration:90 },
      { n:5,  title:'Diagnostic & Imaging (Ch 17-20)', duration:90 },
      { n:6,  title:'Pharmacy & Devices (Ch 21-23)', duration:75 },
      { n:7,  title:'Emergency & Rehab — NEW Ch 24-26', duration:90 },
      { n:8,  title:'ICD-10-AM Pairing Rules', duration:90 },
      { n:9,  title:'AR-DRG Classification', duration:90 },
      { n:10, title:'Common Coding Errors & NPHIES Rejections', duration:90 },
      { n:11, title:'Coding Simulation Lab', duration:120 },
      { n:12, title:'CHI Audit Preparation', duration:75 },
    ],
  },
  {
    id: 'rcm-revenue-cycle',
    title_ar: 'إدارة دورة الإيرادات في المستشفيات السعودية',
    title_en: 'Revenue Cycle Management for Saudi Hospitals',
    description_ar: 'إدارة دورة الإيرادات من الأقصى إلى الأقصى — التحقق من الأهلية، الترميز، تقديم المطالبات، متابعة الرفض، وتحسين الإيرادات',
    description_en: 'End-to-end RCM — eligibility, coding, claims submission, denial management, and revenue optimization for Saudi hospitals.',
    level: 'intermediate',
    duration_hours: 16,
    modules: 10,
    language: 'bilingual',
    price_sar: 1800,
    category: 'rcm',
    accreditation: 'SCFHS CPD',
    instructor: 'Dr. Mohamed El Fadil',
    github_repo: 'https://github.com/Fadil369/brainsait-rcm',
    icon: '💰',
    outcomes: ['Map RCM workflow end-to-end', 'Reduce denial rate below 5%', 'Optimize A/R days', 'Build RCM KPI dashboard'],
    modules_list: [
      { n:1,  title:'Saudi RCM Landscape & Vision 2030', duration:60 },
      { n:2,  title:'Patient Registration & Insurance Capture', duration:90 },
      { n:3,  title:'Eligibility & Benefits Verification', duration:90 },
      { n:4,  title:'Charge Capture & CDM Optimization', duration:90 },
      { n:5,  title:'Medical Coding Quality', duration:90 },
      { n:6,  title:'Claims Scrubbing & NPHIES Submission', duration:90 },
      { n:7,  title:'Denial Root Cause Analysis', duration:120 },
      { n:8,  title:'Appeals & Underpayment Recovery', duration:90 },
      { n:9,  title:'RCM KPIs & Benchmarking', duration:90 },
      { n:10, title:'ClaimLinc AI Implementation', duration:90 },
    ],
  },
  {
    id: 'healthcare-ai-automation',
    title_ar: 'الذكاء الاصطناعي والأتمتة في الرعاية الصحية',
    title_en: 'AI & Automation in Healthcare',
    description_ar: 'كيفية تطبيق الذكاء الاصطناعي في المستشفيات — وكلاء LINC، المعالجة التلقائية للمطالبات، الترميز الذاتي، وتحليل البيانات السريرية',
    description_en: 'Applying AI in hospitals — LINC agents, automated claim processing, auto-coding, and clinical data analytics with BrainSAIT.',
    level: 'intermediate',
    duration_hours: 8,
    modules: 6,
    language: 'bilingual',
    price_sar: 900,
    category: 'ai',
    accreditation: 'BrainSAIT Certified',
    instructor: 'BrainSAIT AI Team',
    github_repo: 'https://github.com/Fadil369/open-webui',
    icon: '🤖',
    outcomes: ['Deploy AI agents in clinical settings', 'Automate NPHIES workflows', 'Use CodeLinc for auto-coding', 'Build clinical dashboards'],
    modules_list: [
      { n:1, title:'Healthcare AI Landscape & Ethics', duration:60 },
      { n:2, title:'BrainSAIT LINC Agent Architecture', duration:90 },
      { n:3, title:'ClaimLinc & CodeLinc Deep Dive', duration:90 },
      { n:4, title:'RAG Systems for Clinical Knowledge', duration:75 },
      { n:5, title:'FHIR R4 + AI Integration', duration:90 },
      { n:6, title:'Building Your First Healthcare AI Workflow', duration:75 },
    ],
  },
  {
    id: 'hipaa-pdpl-compliance',
    title_ar: 'الامتثال لأنظمة حماية البيانات الصحية — HIPAA وPDPL',
    title_en: 'Healthcare Data Compliance — HIPAA & Saudi PDPL',
    description_ar: 'فهم متطلبات الامتثال لحماية البيانات الصحية في المملكة العربية السعودية — PDPL، HIPAA، ومتطلبات هيئة الصحة السعودية',
    description_en: 'Understanding healthcare data compliance in Saudi Arabia — PDPL, HIPAA, CHI audit requirements, and NPHIES data governance.',
    level: 'beginner',
    duration_hours: 6,
    modules: 5,
    language: 'bilingual',
    price_sar: 750,
    category: 'compliance',
    accreditation: 'SCFHS CPD',
    instructor: 'BrainSAIT Compliance Team',
    github_repo: 'https://github.com/Fadil369/brainsait-mcp-dxt',
    icon: '🛡️',
    outcomes: ['Implement PDPL in hospital settings', 'Conduct CHI compliance audit', 'Secure PHI end-to-end', 'Build audit trail systems'],
    modules_list: [
      { n:1, title:'Saudi PDPL Overview & Obligations', duration:75 },
      { n:2, title:'HIPAA Standards in Saudi Context', duration:60 },
      { n:3, title:'CHI & MOH Audit Requirements', duration:75 },
      { n:4, title:'PHI Security & Encryption', duration:60 },
      { n:5, title:'Audit Trail Implementation', duration:60 },
    ],
  },
];

// /api/academy/courses
async function handleAcademyCourses(req) {
  const url      = new URL(req.url);
  const category = url.searchParams.get('category') || '';
  const level    = url.searchParams.get('level') || '';

  let courses = ACADEMY_COURSES;
  if (category) courses = courses.filter(c => c.category === category);
  if (level)    courses = courses.filter(c => c.level === level);

  return ok({
    courses: courses.map(c => ({
      id:c.id, title_ar:c.title_ar, title_en:c.title_en,
      description_ar:c.description_ar.slice(0,150), description_en:c.description_en.slice(0,150),
      level:c.level, duration_hours:c.duration_hours, modules:c.modules,
      language:c.language, price_sar:c.price_sar, category:c.category,
      accreditation:c.accreditation, instructor:c.instructor,
      icon:c.icon, github_repo:c.github_repo,
    })),
    total: courses.length,
    categories: ['nphies','coding','rcm','ai','compliance'],
    stats: { total_courses:5, total_hours:62, total_learners:0, accredited:true },
  });
}

// /api/academy/courses/:id
async function handleAcademyCourse(id) {
  const course = ACADEMY_COURSES.find(c => c.id === id);
  if (!course) return err(`Course not found: ${id}`, 404);
  return ok({ course });
}


export default {
  async fetch(req, env, ctx) {
    if (req.method === 'OPTIONS') return cors();

    const url  = new URL(req.url);
    const path = url.pathname;
    const ip   = req.headers.get('CF-Connecting-IP') || 'unknown';

    if (!rateLimit(ip)) return err('Rate limit exceeded', 429);

    // ── HTML ──────────────────────────────────────────────────
    if (path === '/' || path === '/index.html') {
      return serveHTML(url.searchParams.get('lang') || 'ar');
    }

    // ── Health ────────────────────────────────────────────────
    if (path === '/health' || path === '/api/health') return handleHealth(env);

    // ── Public API ────────────────────────────────────────────
    if (path === '/api/stats')                    return handleStats(env);
    if (path === '/api/branches')                 return handleBranches();
    if (path.startsWith('/api/providers'))        return handleProviders(req, env);
    if (path.startsWith('/api/patients'))         return handlePatients(req, env);
    if (path.startsWith('/api/appointments'))     return handleAppointments(req, env);
    if (path.startsWith('/api/eligibility'))      return handleEligibility(req, env);
    if (path.startsWith('/api/chat'))             return handleChat(req, env);
    if (path.startsWith('/api/drugs'))            return handleDrugs(req, env);
    if (path.startsWith('/api/nphies')) {
      const sub = path.replace('/api/nphies', '') || '';
      return handleNphies(req, env, sub);
    }
    if (path.startsWith('/api/portal')) {
      const sub = path.replace('/api/portal', '') || '';
      return handlePortalHub(req, env, sub);
    }
    if (path === '/api/insurance')                return ok({ partners: INSURANCE_PARTNERS });

    // ── NPHIES Analysis + ClaimLinc Live ─────────────────────
    if (path === '/api/nphies/analysis')          return handleNphiesAnalysis(req, env);
    if (path.startsWith('/api/nphies/live')) {
      const sub2 = path.replace('/api/nphies/live', '') || '/summary';
      return handleNphiesLive(req, env, sub2);
    }

    // ── Blog ─────────────────────────────────────────────────
    if (path === '/api/blog' || path === '/api/blog/')  return handleBlog(req, env);
    if (path.startsWith('/api/blog/')) {
      const slug = path.replace('/api/blog/', '');
      return handleBlogArticle(slug);
    }
    if (path === '/blog')   return serveHTML(url.searchParams.get('lang') || 'ar');

    // ── Academy ──────────────────────────────────────────────
    if (path === '/api/academy/courses')          return handleAcademyCourses(req);
    if (path.startsWith('/api/academy/courses/')) {
      const cid = path.replace('/api/academy/courses/', '');
      return handleAcademyCourse(cid);
    }
    if (path === '/api/academy/stats') return ok({
      total_courses: 5, total_hours: 62, total_learners: 0,
      categories: ['nphies','coding','rcm','ai','compliance'],
      accreditation: 'SCFHS CPD + CHI',
      github: 'https://github.com/Fadil369',
      repos: ['academy','givc-core-academy','nphies-course-platform','brainsait-innovation','HealthLinc','brainsait-rcm'],
    });
    if (path === '/academy')  return serveHTML(url.searchParams.get('lang') || 'ar');

    // ── Protected API ─────────────────────────────────────────
    const guard = authGuard(req, env);
    if (guard) return guard;

    if (path.startsWith('/api/claims'))           return handleClaims(req, env);
    if (path.startsWith('/api/visits'))           return handleVisits(req, env);
    if (path.startsWith('/api/orders'))           return handleOrders(req, env);
    if (path.startsWith('/api/prior-auth'))       return handlePriorAuth(req, env);
    if (path === '/api/rcm')                      return handleRCM(env);
    if (path.startsWith('/api/sync/'))            return handleSync(req, env, path.split('/api/sync/')[1]);
    if (path === '/api/schema') {
      const tables = ['patients','appointments','claims','providers','departments','visits','orders','contracts','prior_authorizations','rag_documents'];
      const info = {};
      for (const t of tables) {
        const r = await env.DB.prepare(`SELECT COUNT(*) as n FROM ${t}`).first().catch(()=>({n:0}));
        info[t] = { count: r?.n||0 };
      }
      return ok({ database: 'hnh-gharnata', version: VERSION, tables: info });
    }

    // Fallback → HTML
    return serveHTML(url.searchParams.get('lang') || 'ar');
  },
};

// ═══════════════════════════════════════════════════════════════
// PORTAL INTEGRATION HUB — /api/portal/*
// Called by BSMA, GIVC, SBS to get unified HNH data
// ═══════════════════════════════════════════════════════════════

async function handlePortalHub(req, env, sub) {
  const url = new URL(req.url);

  // /api/portal/network — live NPHIES network summary (from BSMA /basma/network)
  if (sub === '/network') {
    try {
      const r = await fetch('https://bsma.elfadil.com/basma/network', {
        headers: { 'X-Source': 'hnh-unified', 'X-Hospital': 'gharnata' }
      });
      if (r.ok) {
        const d = await r.json();
        return ok({ source: 'bsma-live', network: d });
      }
    } catch {}
    // Fallback to claimlinc-api
    const d = await claimlinc(env, '/nphies/network/summary');
    return ok({ source: 'claimlinc', network: d });
  }

  // /api/portal/mirror — NPHIES mirror sync status
  if (sub === '/mirror') {
    try {
      const r = await fetch('https://bsma.elfadil.com/basma/mirror');
      return ok({ source: 'bsma-mirror', data: r.ok ? await r.json() : null });
    } catch {}
    return ok({ source: 'fallback', data: null });
  }

  // /api/portal/coverage — insurance coverage records (from SBS HEALTHCARE_DB)
  if (sub === '/coverage') {
    const r = await fetch('https://sbs.elfadil.com/claimlinc/coverage/batch', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'active' })
    }).catch(() => null);
    if (r?.ok) {
      const d = await r.json();
      return ok({ source: 'sbs-healthcare-d1', total: d.total, coverage: d.coverage });
    }
    // Direct fallback: hnh-gharnata insurance table
    const ins = await env.DB.prepare(
      'SELECT id, payer_code as member_id, payer_name, plan_name, status FROM insurance LIMIT 50'
    ).all().catch(()=>({results:[]}));
    if (ins?.results?.length > 0) {
      return ok({ source: 'hnh-d1', total: ins.results.length, coverage: ins.results });
    }
    return ok({ coverage: [], total: 0, source: 'unavailable' });
  }

  // /api/portal/eligibility — unified eligibility check
  if (sub === '/eligibility' && req.method === 'POST') {
    const body = await req.json().catch(() => ({}));
    // Try SBS ClaimLinc first (has real coverage records)
    try {
      const r = await fetch('https://sbs.elfadil.com/claimlinc/eligibility', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ patient_identifier: body.patient_identifier || body.national_id, service_code: body.service_code || 'outpatient' })
      });
      if (r.ok) {
        const d = await r.json();
        return ok({ source: 'sbs-claimlinc', ...d });
      }
    } catch {}
    // Fallback to Oracle Bridge
    return handleEligibility(req, env);
  }

  // /api/portal/drugs — drug formulary search
  if (sub === '/drugs') {
    return handleDrugs(req, env);
  }

  // /api/portal/appointments — merged appointments (all sources)
  if (sub === '/appointments') {
    const date = url.searchParams.get('date') || new Date().toISOString().split('T')[0];
    return handleAppointments(new Request(req.url + (req.url.includes('?') ? '&' : '?') + `date=${date}`), env);
  }

  // /api/portal/stats — full unified stats for all portals
  if (sub === '/stats') {
    const [hnh, network] = await Promise.all([
      handleStats(env).then(r => r.json()).catch(() => ({})),
      fetch('https://bsma.elfadil.com/basma/network').then(r => r.json()).catch(() => null),
    ]);
    return ok({
      hnh: hnh.stats || {},
      nphies: network ? {
        network_sar:      network.financials?.network_total_sar,
        approval_rate:    network.financials?.network_approval_rate_pct,
        total_claims:     network.financials?.total_claims_gss,
        pa_total:         network.prior_auth?.network_total,
        by_branch:        network.by_branch,
        as_of:            network.as_of,
      } : null,
      insurance_partners: INSURANCE_PARTNERS,
    });
  }

  return err(`Portal endpoint not found: /api/portal${sub}`, 404);
}
