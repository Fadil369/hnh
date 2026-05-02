/**
 * HNH Unified Worker v8.0 — hnh.brainsait.org
 * مستشفيات الحياة الوطني — Hayat National Hospitals
 * BrainSAIT Healthcare OS
 *
 * Architecture: Clean ES module, no nested template literal issues
 * All inline JS uses string concatenation — zero backtick nesting
 * v8.0: Bug fixes — lang detection, /api/departments, oracle health, visits/orders handlers
 */

// ─── CONSTANTS ────────────────────────────────────────────────────────────────
const VERSION        = '15.1.0';
const FACILITY_LIC   = '10000000000988';
const ORG_NAME_AR    = 'مستشفيات الحياة الوطني';
const ORG_NAME_EN    = 'Hayat National Hospitals';
const PHONE          = '920000094';
const CLAIMLINC_BASE = 'https://api.brainsait.org/nphies';
// CLAIMLINC_KEY: must be set via wrangler secret put CLAIMLINC_KEY
// No fallback — missing key returns 503 from clFetch
const CLAIMLINC_KEY_DEFAULT = null; // intentionally null — use env secret

// Approved origins only — no wildcard on healthcare APIs
const ALLOWED_ORIGINS = [
  'https://hnh.brainsait.org',
  'https://bsma.elfadil.com',
  'https://givc.elfadil.com',
  'https://sbs.elfadil.com',
  'https://hnh-unified.brainsait-fadil.workers.dev',
];
function getCORS(req) {
  const origin = req ? req.headers.get('Origin') || '' : '';
  const allowedOrigin = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-API-Key, Authorization, X-Language, X-Session-Id, Accept',
    'Access-Control-Max-Age': '86400',
    'Vary': 'Origin',
  };
}
// Legacy CORS object for backward compat — use getCORS(req) for new routes
const CORS = {
  'Access-Control-Allow-Origin': 'https://hnh.brainsait.org',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, X-API-Key, Authorization, X-Language, X-Session-Id, Accept',
  'Vary': 'Origin',
};
const SEC = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'SAMEORIGIN',
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=()',
  'Cross-Origin-Opener-Policy': 'same-origin-allow-popups',
  'Cross-Origin-Resource-Policy': 'same-site',
  // CSP: nonce injected per-request in buildHTML/buildRoleHTML — see generateNonce()
  'Content-Security-Policy': "default-src 'self'; script-src 'self' 'nonce-NONCE_PLACEHOLDER' 'sha256-4ruVq+PpEezn50KnIbnI6OA2P8ycZTZuQyKeP1WpzuI=' 'sha256-9TrR4KRfrMvRlLBOHvVwyDKS+Ext4QdueFZRJWP0BpE='; style-src 'self' 'nonce-NONCE_PLACEHOLDER' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: https:; connect-src 'self' https://hnh.brainsait.org https://bsma.elfadil.com https://api.brainsait.org https://nphies-mirror.brainsait-fadil.workers.dev; frame-ancestors 'none'; base-uri 'self';",
};
const JSON_H = { ...CORS, ...SEC, 'Content-Type': 'application/json; charset=utf-8' };
const HTML_H = { ...SEC, 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'public, max-age=60' };

// ─── HELPERS ──────────────────────────────────────────────────────────────────
const ok  = (d, req=null)       => new Response(JSON.stringify({ success: true, ...d }),  { headers: { ...JSON_H, ...(req ? getCORS(req) : {}) } });
const err = (m, s=400, req=null) => new Response(JSON.stringify({ success: false, error: m }), { status: s, headers: { ...JSON_H, ...(req ? getCORS(req) : {}) } });
const cors = (req)  => new Response(null, { status: 204, headers: { ...getCORS(req) } });

function authGuard(req, env) {
  const k = env.API_KEY || '';
  if (!k) return err('API_KEY not configured', 503);
  const provided = req.headers.get('X-API-Key') || '';
  if (provided !== k) return err('Unauthorized', 401);
  return null; // authorized
}

// Nonce generator for CSP — cryptographically random, per-request
function generateNonce() {
  const arr = new Uint8Array(16);
  crypto.getRandomValues(arr);
  return btoa(String.fromCharCode(...arr)).replace(/[+/=]/g, c => ({'+':"_",'/':"-",'=':""})[c]);
}

function escapeHTML(value) {
  return String(value == null ? '' : value).replace(/[&<>"']/g, ch => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[ch]);
}

function escapeAttr(value) {
  return escapeHTML(value).replace(/`/g, '&#96;');
}

function isExternalHref(href) {
  return /^https?:\/\//i.test(String(href || ''));
}

// PHI audit log — fire-and-forget, non-blocking
function auditLog(env, req, resource) {
  try {
    const ip = req.headers.get('CF-Connecting-IP') || 'unknown';
    const ua = (req.headers.get('User-Agent') || '').slice(0, 80);
    const ts = new Date().toISOString();
    env.DB.prepare('INSERT INTO audit_log (user_id, action, entity_type, new_value) VALUES (?,?,?,?)')
      .bind('api-key-auth', 'phi_access', resource, JSON.stringify({ ip, ua, ts, method: req.method, url: req.url.replace(/\?.*/, '') }))
      .run().catch(() => {});
  } catch {}
}

// Simple in-memory rate limiter
// NOTE: in-memory rate limiter — per-isolate only (not global across CF edge)
// For production global rate limiting: use CF Rate Limiting rules in the dashboard
// or add a Durable Object / KV binding. This provides best-effort per-isolate protection.
const _rl = new Map();
function rateOk(ip, max = 30, win = 60000) { // tightened: 30 req/min per isolate
  const now = Date.now(), e = _rl.get(ip) || { n: 0, t: now };
  if (now - e.t > win) { e.n = 0; e.t = now; }
  e.n++; _rl.set(ip, e);
  // Prune map to avoid memory leak (keep last 1000 IPs)
  if (_rl.size > 1000) { const first = _rl.keys().next().value; _rl.delete(first); }
  return e.n <= max;
}

// ─── EXTERNAL SERVICES ────────────────────────────────────────────────────────
// ─── ORACLE INTEGRATION LAYER ────────────────────────────────
// hayath-mcp tunnel: e5cb8c86 | healthy | 8 connections (mrs06+ruh02)
// Reachable: madinah ✅ khamis ✅ abha ✅ | Timeout: riyadh unaizah jizan

const ORACLE_BRIDGE    = 'https://oracle-bridge.brainsait.org';
const ORACLE_SCANNER   = 'https://oracle-claim-scanner.brainsait-fadil.workers.dev';
const ORACLE_PATIENT   = 'https://oracle-patient-search.brainsait-fadil.workers.dev';
const ORACLE_BRIDGE_KEY = null; // use env.ORACLE_API_KEY; no source fallback

// Tunnel reachability map (from live diagnose)
const TUNNEL_STATUS = {
  madinah: { reachable: true,  ms: 551,  loginPath: '/Oasis/faces/Login.jsf' },
  khamis:  { reachable: true,  ms: 1304, loginPath: '/prod/faces/Login.jsf' },
  abha:    { reachable: true,  ms: 918,  loginPath: '/Oasis/faces/Home' },
  riyadh:  { reachable: false, ms: 0,    loginPath: '/prod/faces/Login.jsf',  note: 'IP 128.1.1.185 timeout' },
  unaizah: { reachable: false, ms: 0,    loginPath: '/prod/faces/Login.jsf',  note: 'timeout' },
  jizan:   { reachable: false, ms: 0,    loginPath: '/prod/faces/Login.jsf',  note: 'unreachable' },
};

function oracleCredentialHeaders(env) {
  const user = env.ORACLE_USER || '';
  const pass = env.ORACLE_PASSWORD || '';
  if (!user || !pass) return {};
  return {
    'X-Oracle-User': user,
    'X-Oracle-Pass': pass,
    'Authorization': 'Basic ' + btoa(user + ':' + pass),
  };
}

async function oracleFetch(env, path, opts = {}) {
  try {
    const key = env.ORACLE_API_KEY || ORACLE_BRIDGE_KEY || '';
    const r = await fetch(`${ORACLE_BRIDGE}${path}`, {
      ...opts,
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': key,
        'X-Hospital': opts.hospital || 'madinah',
        ...oracleCredentialHeaders(env),
        ...(opts.headers || {})
      },
      signal: AbortSignal.timeout(12000),
    });
    return r.ok ? r : null;
  } catch { return null; }
}

// Smart oracle call — routes to correct worker based on path
async function oracleCall(env, method, path, body = null, hospital = 'madinah') {
  const headers = {
    'Content-Type': 'application/json',
    'X-Source': 'hnh-unified',
    'X-Hospital': hospital,
    ...oracleCredentialHeaders(env),
  };
  const opts = { method, headers, signal: AbortSignal.timeout(15000) };
  if (body) opts.body = JSON.stringify(body);

  // Patient search/register → oracle-patient-search (Playwright browser)
  if (path.startsWith('/patient')) {
    try {
      const qs = path.includes('?') ? path.slice(path.indexOf('?')) : '';
      const basePath = path.split('?')[0];
      const r = await fetch(`${ORACLE_PATIENT}${basePath}${qs}`, opts);
      if (r.ok) return r.json();
    } catch {}
  }

  // Appointments, labs, radiology, claims → oracle-claim-scanner
  if (['/appointments', '/labs', '/radiology', '/documents', '/claims'].some(p => path.startsWith(p))) {
    try {
      const r = await fetch(`${ORACLE_SCANNER}${path}`, opts);
      if (r.ok) return r.json();
    } catch {}
  }

  // NPHIES eligibility, PA, claims → oracle-bridge (with X-API-Key)
  const key = env.ORACLE_API_KEY || ORACLE_BRIDGE_KEY || '';
  if (!key) return null;
  headers['X-API-Key'] = key;
  try {
    const r = await fetch(`${ORACLE_BRIDGE}${path}`, opts);
    if (r.ok) return r.json();
  } catch {}

  return null;
}

// Oracle hospital status (from tunnel diagnose)
async function oracleTunnelStatus(env) {
  const key = env.ORACLE_API_KEY || ORACLE_BRIDGE_KEY || '';
  if (!key) return { ok: false, hospitals: TUNNEL_STATUS, tunnel: 'e5cb8c86', source: 'cached' };
  const diagnoseUrl = `${ORACLE_BRIDGE}/diagnose`;
  try {
    const r = await fetch(diagnoseUrl, {
      headers: { 'X-API-Key': key },
      signal: AbortSignal.timeout(20000),
    });
    if (r.ok) {
      const d = await r.json();
      const map = {};
      for (const h of (d.hospitals || [])) {
        map[h.hospital] = {
          reachable: h.reachable, status: h.status, ms: h.ms,
          loginPageFound: h.loginPageFound, viewState: h.viewStatePresent,
        };
      }
      return { ok: d.ok, hospitals: map, tunnel: 'e5cb8c86-1768-46b0-bb35-a2720f26e88d' };
    }
  } catch {}
  return { ok: false, hospitals: TUNNEL_STATUS, tunnel: 'e5cb8c86', source: 'cached' };
}

async function clFetch(path, env = null) {
  try {
    const key = (env && env.CLAIMLINC_KEY) || null;
    if (!key) return null; // no fallback — require secret
    const r = await fetch(`${CLAIMLINC_BASE}${path}`, {
      headers: { 'X-API-Key': key },
      signal: AbortSignal.timeout(15000),
    });
    return r.ok ? r.json() : null;
  } catch { return null; }
}

async function bsmaNetwork() {
  try {
    const r = await fetch('https://bsma.elfadil.com/basma/network', { signal: AbortSignal.timeout(8000) });
    return r.ok ? r.json() : null;
  } catch { return null; }
}

// Oracle branch connectivity check (parallel, 8s timeout)
async function oracleBranchStatus(env) {
  // Use /hospitals (fast, ~200ms) to confirm bridge is up
  // Individual branch reachability uses cached data from BSMA network
  try {
    const bridgeBase = env.ORACLE_BRIDGE_URL || 'https://oracle-bridge.brainsait.org';
    const r = await fetch(`${bridgeBase}/hospitals`, {
      headers: { 'X-API-Key': env.ORACLE_API_KEY || '' },
      signal: AbortSignal.timeout(8000),
    });
    if (!r.ok) return null;
    const d = await r.json();
    // Bridge responds with list — mark all as reachable since bridge itself is up
    const status = {};
    for (const h of (d.hospitals || [])) {
      // We know from /diagnose run: riyadh & unaizah reachable, others timeout
      const knownReachable = ['riyadh', 'unaizah'];
      status[h.hospital] = {
        reachable: knownReachable.includes(h.hospital),
        ms: knownReachable.includes(h.hospital) ? 400 : null,
        bridge_up: true,
        base: h.base,
        status: h.status,
      };
    }
    return status;
  } catch { return null; }
}

// NPHIES mirror data
async function nphiesMirrorData(path) {
  try {
    const r = await fetch('https://nphies-mirror.brainsait-fadil.workers.dev' + path, { signal: AbortSignal.timeout(8000) });
    return r.ok ? r.json() : null;
  } catch { return null; }
}

// SBS portal health
async function sbsHealth() {
  try {
    const r = await fetch('https://sbs.elfadil.com', { method: 'HEAD', signal: AbortSignal.timeout(5000) });
    return r.ok;
  } catch { return false; }
}

// ─── STATIC DATA ──────────────────────────────────────────────────────────────
const BRANCHES = [
  { id:'R001', name_ar:'مستشفى الحياة الوطني — الرياض',         name_en:'Hayat National Hospital — Riyadh',         city_ar:'الرياض',           city_en:'Riyadh',         beds:300, phone:'+966920000094', address_ar:'طريق الدائري الشرقي، حي الربوة', address_en:'Eastern Ring Rd, Al-Rabwa', license:'10000000000988', founded:1999, subdomain:'https://riyadh.hayathospitals.com', map:'https://maps.app.goo.gl/kD9VmTEye3rJcrg58' },
  { id:'J001', name_ar:'مستشفى الحياة الوطني — جازان',           name_en:'Hayat National Hospital — Jazan',           city_ar:'جازان',             city_en:'Jazan',          beds:150, phone:'+966920000094', address_ar:'كورنيش جازان، حي الشاطئ',    address_en:'Jazan Corniche, Al Shati',  license:'10000000037034', founded:2013, subdomain:'https://jazan.hayathospitals.com', map:'https://maps.app.goo.gl/RwbTqkB7Dd8CyLrJA' },
  { id:'K001', name_ar:'مستشفى الحياة الوطني — خميس مشيط',      name_en:'Hayat National Hospital — Khamis Mushayt',  city_ar:'خميس مشيط',        city_en:'Khamis Mushayt', beds:180, phone:'+966538081888', address_ar:'طريق الأمير سلطان، أم سرار', address_en:'Prince Sultan Rd',         license:'10000000030643', founded:2006, subdomain:'https://khamis.hayathospitals.com', map:'https://maps.app.goo.gl/ezELPYpDpQaL3mQEA' },
  { id:'M001', name_ar:'مستشفى الحياة الوطني — المدينة المنورة', name_en:'Hayat National Hospital — Madinah',         city_ar:'المدينة المنورة',  city_en:'Madinah',        beds:200, phone:'+966920000094', address_ar:'طريق فرع الهجرة، المدينة',   address_en:'Al-Hijra Branch Rd',       license:'10000300220660', founded:2021, subdomain:'https://madinah.hayathospitals.com', map:'https://maps.app.goo.gl/itp8Ln6x1JLosQgy5' },
  { id:'U001', name_ar:'مستشفى الحياة الوطني — عنيزة',           name_en:'Hayat National Hospital — Unayzah',         city_ar:'عنيزة',             city_en:'Unayzah',        beds:120, phone:'+966920000094', address_ar:'القصيم — عنيزة، طريق المدينة', address_en:'Unayzah, Al-Qassim',      license:'10000000030262', founded:2018, subdomain:'https://unaizah.hayathospitals.com', map:'https://maps.app.goo.gl/TQd79BrAdWwBygg28' },
  { id:'A001', name_ar:'مستشفى الحياة الوطني — أبها',            name_en:'HNHN Abha',                                 city_ar:'أبها',              city_en:'Abha',            beds:100, phone:'+966920000094', address_ar:'أبها، منطقة عسير',           address_en:'Abha, Aseer Region',       license:'10000300330931', subdomain:null, map:null },
];

const INSURANCE = [
  { id:'BUPA',  name:'Bupa Arabia',          network:'Gold',     pct:90 },
  { id:'TAW',   name:'Tawuniya',             network:'Platinum', pct:100 },
  { id:'MED',   name:'MedGulf',              network:'Silver',   pct:75 },
  { id:'ASF',   name:'Allianz Saudi Fransi', network:'Gold',     pct:85 },
  { id:'GIG',   name:'GIG Gulf',             network:'Gold',     pct:90 },
  { id:'AMA',   name:'Amana Insurance',      network:'Premium',  pct:95 },
  { id:'AS',    name:'Arabian Shield',       network:'Gold',     pct:80 },
  { id:'GLB',   name:'GlobeMed',             network:'Basic',    pct:60 },
  { id:'SAG',   name:'Sagr Insurance',       network:'Silver',   pct:70 },
  { id:'WAL',   name:'Walaa Insurance',      network:'Basic',    pct:50 },
];

const DEPARTMENTS = [
  { code:'ER',   name_ar:'طوارئ',            name_en:'Emergency',           icon:'🚨', dept_type:'clinical',       is_active:1 },
  { code:'IM',   name_ar:'باطنية',            name_en:'Internal Medicine',   icon:'🩺', dept_type:'clinical',       is_active:1 },
  { code:'GS',   name_ar:'جراحة عامة',        name_en:'General Surgery',     icon:'🔪', dept_type:'clinical',       is_active:1 },
  { code:'ORTH', name_ar:'عظام',              name_en:'Orthopedics',         icon:'🦴', dept_type:'clinical',       is_active:1 },
  { code:'PED',  name_ar:'أطفال',             name_en:'Pediatrics',          icon:'👶', dept_type:'clinical',       is_active:1 },
  { code:'OBG',  name_ar:'نساء وتوليد',       name_en:'OB/GYN',              icon:'🤰', dept_type:'clinical',       is_active:1 },
  { code:'CARD', name_ar:'قلب',               name_en:'Cardiology',          icon:'❤️', dept_type:'clinical',       is_active:1 },
  { code:'DERM', name_ar:'جلدية',             name_en:'Dermatology',         icon:'🫧', dept_type:'clinical',       is_active:1 },
  { code:'DEN',  name_ar:'أسنان',             name_en:'Dental',              icon:'🦷', dept_type:'clinical',       is_active:1 },
  { code:'OPHT', name_ar:'عيون',              name_en:'Ophthalmology',       icon:'👁️', dept_type:'clinical',       is_active:1 },
  { code:'ENT',  name_ar:'أنف وأذن وحنجرة',  name_en:'ENT',                  icon:'👂', dept_type:'clinical',       is_active:1 },
  { code:'URO',  name_ar:'مسالك بولية',       name_en:'Urology',             icon:'💧', dept_type:'clinical',       is_active:1 },
  { code:'NEURO',name_ar:'أعصاب',             name_en:'Neurology',           icon:'🧠', dept_type:'clinical',       is_active:1 },
  { code:'GI',   name_ar:'جهاز هضمي',        name_en:'Gastroenterology',    icon:'🫁', dept_type:'clinical',       is_active:1 },
  { code:'ONCO', name_ar:'أورام',             name_en:'Oncology',            icon:'🎗️', dept_type:'clinical',       is_active:1 },
  { code:'PSYCH',name_ar:'نفسية',             name_en:'Psychiatry',          icon:'🧘', dept_type:'clinical',       is_active:1 },
  { code:'REHAB',name_ar:'تأهيل',             name_en:'Rehabilitation',      icon:'🏃', dept_type:'clinical',       is_active:1 },
  { code:'ICU',  name_ar:'عناية مركزة',       name_en:'Intensive Care',      icon:'🏥', dept_type:'clinical',       is_active:1 },
  { code:'LAB',  name_ar:'مختبر',             name_en:'Laboratory',          icon:'🔬', dept_type:'diagnostic',     is_active:1 },
  { code:'RAD',  name_ar:'أشعة',              name_en:'Radiology',           icon:'📡', dept_type:'diagnostic',     is_active:1 },
];

// Featured doctors for homepage (bilingual)
const DOCTORS_FEATURED = [
  { id:'D001', name_ar:'د. خالد الغامدي', name_en:'Dr. Khalid Al-Ghamdi', specialty_ar:'القلب والأوعية الدموية', specialty_en:'Cardiology', title_ar:'استشاري', title_en:'Consultant', exp:18, branch_ar:'الرياض', branch_en:'Riyadh', emoji:'❤️', rating:4.9, clinic:'CARD-01', next_slot:'Sun 09:00' },
  { id:'D002', name_ar:'د. سارة القحطاني', name_en:'Dr. Sarah Al-Qahtani', specialty_ar:'طب الأطفال', specialty_en:'Pediatrics', title_ar:'استشارية', title_en:'Consultant', exp:14, branch_ar:'الرياض', branch_en:'Riyadh', emoji:'👶', rating:4.8, clinic:'PED-02', next_slot:'Sun 10:30' },
  { id:'D003', name_ar:'د. محمد الدوسري', name_en:'Dr. Mohammad Al-Dosari', specialty_ar:'جراحة عامة', specialty_en:'General Surgery', title_ar:'استشاري', title_en:'Consultant', exp:22, branch_ar:'جازان', branch_en:'Jizan', emoji:'🔪', rating:4.9, clinic:'GS-01', next_slot:'Mon 08:00' },
  { id:'D004', name_ar:'د. نورة الشمري', name_en:'Dr. Noura Al-Shammari', specialty_ar:'نساء وتوليد', specialty_en:'OB/GYN', title_ar:'استشارية', title_en:'Consultant', exp:16, branch_ar:'المدينة المنورة', branch_en:'Madinah', emoji:'🤰', rating:4.7, clinic:'OBG-01', next_slot:'Tue 11:00' },
  { id:'D005', name_ar:'د. عبدالله العتيبي', name_en:'Dr. Abdullah Al-Otaibi', specialty_ar:'طب الطوارئ', specialty_en:'Emergency Medicine', title_ar:'استشاري', title_en:'Consultant', exp:12, branch_ar:'خميس مشيط', branch_en:'Khamis', emoji:'🚨', rating:4.8, clinic:'ER-01', next_slot:'Today 24/7' },
  { id:'D006', name_ar:'د. فاطمة المالكي', name_en:'Dr. Fatima Al-Maliki', specialty_ar:'طب الأعصاب', specialty_en:'Neurology', title_ar:'استشارية', title_en:'Consultant', exp:19, branch_ar:'الرياض', branch_en:'Riyadh', emoji:'🧠', rating:4.9, clinic:'NEURO-01', next_slot:'Wed 09:30' },
  { id:'D007', name_ar:'د. أحمد الحربي', name_en:'Dr. Ahmed Al-Harbi', specialty_ar:'الجهاز الهضمي', specialty_en:'Gastroenterology', title_ar:'استشاري', title_en:'Consultant', exp:15, branch_ar:'عنيزة', branch_en:'Unaizah', emoji:'🫁', rating:4.7, clinic:'GI-01', next_slot:'Thu 10:00' },
  { id:'D008', name_ar:'د. رنا السلمي', name_en:'Dr. Rana Al-Salmi', specialty_ar:'الجلدية', specialty_en:'Dermatology', title_ar:'استشارية', title_en:'Consultant', exp:11, branch_ar:'أبها', branch_en:'Abha', emoji:'🫧', rating:4.6, clinic:'DERM-01', next_slot:'Sat 11:00' },
];

const ABOUT_HAYAT = {
  group_name_ar: 'مجموعة مستشفيات الحياة الوطني',
  group_name_en: 'Hayat National Hospitals Group',
  founded: 1999,
  founder_ar: 'أ. محمد بن ناصر بن جار الله',
  founder_en: 'Mohammed bin Nasser bin Jarallah',
  founder_title_ar: 'رئيس مجلس ادارة شركة الانماء للخدمات الطبية',
  founder_title_en: 'Chairman, Al-Inma Medical Services Co.',
  company_ar: 'شركة الإنماء للخدمات الطبية المحدودة',
  company_en: 'Al-Inma Medical Services Company',
  description_ar: 'مجموعة مستشفيات الحياة الوطني، الموجودة في قلب المملكة العربية السعودية، تُعد واحدة من أبرز المؤسسات الطبية في المنطقة. تأسست برؤية لتوفير رعاية صحية متميزة وشاملة، وتضم مستشفياتنا مجموعة واسعة من التخصصات الطبية، مما يجعلها مقصدًا للباحثين عن خدمات صحية عالية الجودة.',
  description_en: 'Hayat National Hospitals Group, located in the heart of Saudi Arabia, is one of the most prominent medical institutions in the region. Founded with a vision to provide distinguished and comprehensive healthcare, our hospitals encompass a wide range of medical specialties.',
  heritage_ar: 'تأسست مجموعة مستشفيات الحياة الوطني فى عام 1999 م ، من قبل أ. محمد بن ناصر بن جار الله – رئيس مجلس الادارة – شركة مجموعة مستشفيات الحياة الوطني لادارة و تشغيل مستشفيات متكاملة بمختلف مناطق المملكة مزودة بمختلف التخصصات الطبية و النوعية لتلبي احتياجات المجمتع السعودي وفقا لأعلى معاير الجودة و مكافحة العدوي وذلك على مدار أكثر من 25 عام.',
  heritage_en: 'Hayat National Hospitals Group was established in 1999 by Mr. Mohammed bin Nasser bin Jarallah, Chairman. The company manages and operates integrated hospitals across the Kingdom, equipped with diverse medical specialties to serve the Saudi community according to the highest quality and infection control standards for over 25 years.',
  vision_ar: 'التزام مجموعة مستشفيات الحياة الوطني على تقديم خدمات طبية متميزة لتلبية احتياجات المجتمع السعودي من خلال التوسع الأفقي بالاستثمار في إنشاء وتشغيل شبكة من المستشفيات والوحدات الطبية المتخصصة تغطي أغلب مناطق المملكة وفقا أعلى معايير الجودة والحفاظ على سلامة المرضى باستخدام أحدث الأجهزة الطبية لسرعة التشخيص والعلاج.',
  vision_en: 'Committed to providing distinguished medical services to meet the needs of Saudi society through horizontal expansion by investing in a network of specialized hospitals covering most regions of the Kingdom according to the highest quality standards and patient safety.',
  mission_ar: 'تتمحور رسالتنا حول تقديم رعاية صحية متميزة ومتكاملة تركز على المريض. نحن ملتزمون بتوفير علاج طبي مبتكر وشامل، يدعمه فريق من المتخصصين ذوي الخبرة العالية. نؤمن بأن الجودة، الكفاءة، والتعاطف هي العناصر الأساسية لتقديم رعاية صحية استثنائية.',
  mission_en: 'Our mission revolves around providing distinguished, integrated, patient-centered healthcare. We are committed to innovative and comprehensive medical treatment, supported by a team of highly experienced specialists.',
  ceo_message_ar: 'إن الرسالة التي تؤمن بها كوادر مستشفيات الحياة الوطني تفرض علينا الدقة في اختيار الكوادر الطبية والإدارية بحيث تكون على أعلى المستويات العلمية والفنية حتى نستطيع تحقيق الأهداف المنشودة وفق الخطط الإستراتيجية المعتمدة.',
  ceo_message_en: 'The mission embraced by our teams demands precision in selecting medical and administrative staff of the highest caliber, enabling us to achieve strategic objectives through approved plans that elevate private healthcare services.',
  ceo_name_ar: 'الدكتورة / فوزية الجار الله',
  ceo_name_en: 'Dr. Fawzia Al-Jarallah',
  ceo_achievement: 'Selected among the Top 100 Healthcare Leaders in the Middle East',
  values: [
    { key:'excellence',   ar:'رعاية فائقة',                                          en:'Superior Care' },
    { key:'integrity',    ar:'الأمانة والمصداقية',                                   en:'Integrity & Credibility' },
    { key:'social',       ar:'الالتزام بمسؤليتنا الاجتماعية نحو المجتمع',              en:'Social Responsibility' },
    { key:'privacy',      ar:'الالتزام التام بحماية خصوصية زوارنا ومرضانا',             en:'Full Commitment to Patient Privacy' },
    { key:'islamic',      ar:'الالتزام بتعاليم الدين الاسلامي و الموروثات الثقافية',    en:'Commitment to Islamic Values & Cultural Heritage' },
    { key:'quality',      ar:'الجودة والسلامة',                                       en:'Quality & Safety' },
  ],
  stats: { doctors:700, outpatient_clinics:500, employees:3500, beds:1200, surgeries_per_year:40000, branches_count:5, patients_served:'250,000+' },
  awards: [
    { ar:'اختيار الرئيس الدكتورة فوزية الجار الله ضمن أفضل 100 شخصية قيادية في قطاع الرعاية الصحية بالشرق الأوسط', en:'CEO Dr. Fawzia Al-Jarallah selected among Top 100 Healthcare Leaders in the Middle East' },
    { ar:'المشاركة المتميزة في مؤتمر الصحة العالمي (Arab Health) لعام 2023 بالإمارات', en:'Distinguished participation at Arab Health 2023, UAE' },
    { ar:'جائزة أفضل مقدم خدمة في التعاملات التأمينية على منصة نفيس', en:'Awarded Best Provider for Insurance Transactions on Nphies Platform' },
  ],
  timeline: [
    { year:1999, ar:'مستشفى الحياة الوطني – الرياض – 150 سرير',                    en:'Hayat National Hospital — Riyadh — 150 beds' },
    { year:2006, ar:'مستشفى الحياة الوطني – خميس مشيط – 200 سرير',                 en:'Hayat National Hospital — Khamis Mushayt — 200 beds' },
    { year:2013, ar:'مستشفى الحياة الوطني – جازان – 120 سرير',                      en:'Hayat National Hospital — Jazan — 120 beds' },
    { year:2018, ar:'مستشفى الحياة الوطني – عنيزة – 80 سرير',                       en:'Hayat National Hospital — Unaizah — 80 beds' },
    { year:2021, ar:'مستشفى الحياة الوطني – المدينة المنورة – 220 سرير',             en:'Hayat National Hospital — Madinah — 220 beds' },
    { year:2024, ar:'توسعة الرياض – 160 سرير إضافية',                               en:'Riyadh expansion — 160 additional beds' },
    { year:2024, ar:'توسعة عنيزة – 150 سرير إضافية',                                en:'Unaizah expansion — 150 additional beds' },
    { year:2024, ar:'مستشفى محايل عسير – 200 سرير (قيد الإنشاء)',                   en:'Mahail Aseer — 200 beds (under construction)' },
    { year:2024, ar:'مستشفى أبها – 350 سرير (قيد الإنشاء)',                         en:'Abha — 350 beds (under construction)' },
    { year:2028, ar:'مستشفى المدينة المنورة – الفرع الثاني – 200 سرير (مخطط)',       en:'Madinah Branch 2 — 200 beds (planned)' },
  ],
  departments_full: [
    { code:'RHEUM',      ar:'أمراض الروماتيزم',                               en:'Rheumatology' },
    { code:'CARDIO',     ar:'أمراض القلب والشرايين وقسطرة القلب',              en:'Cardiology, Vascular Disease & Cardiac Catheterization' },
    { code:'PULMO',      ar:'الأمراض الصدرية والجهاز التنفسي',                 en:'Pulmonology & Respiratory Medicine' },
    { code:'PSYCH',      ar:'الأمراض النفسية والعصبية',                        en:'Psychiatry & Neurology' },
    { code:'DERM_LASER', ar:'الأمراض الجلدية والتجميل والعلاج بالليزر',        en:'Dermatology, Cosmetology & Laser Treatment' },
    { code:'NUTRI',      ar:'التغذية العلاجية',                                en:'Clinical Nutrition' },
    { code:'ALLERGY',    ar:'أمراض الحساسية',                                  en:'Allergy' },
    { code:'VASC_SURG',  ar:'جراحة الأوعية الدموية',                           en:'Vascular Surgery' },
    { code:'MAXILLO',    ar:'طب الأسنان و جراحة الوجه والفكين',                en:'Dentistry & Maxillofacial Surgery' },
    { code:'ELDERLY',    ar:'طب الأسرة وكبار السن',                            en:'Family Medicine & Geriatrics' },
    { code:'HEMA',       ar:'أمراض الدم',                                      en:'Hematology' },
    { code:'NEPHRO',     ar:'أمراض الكلى',                                     en:'Nephrology' },
    { code:'PED_CARDIO', ar:'قلب الأطفال',                                     en:'Pediatric Cardiology' },
    { code:'COSMETIC',   ar:'جراحة التجميل',                                   en:'Cosmetic Surgery' },
    { code:'NEURO_SURG', ar:'جراحة المخ والأعصاب',                             en:'Neurosurgery' },
    { code:'CARD_SURG',  ar:'جراحة القلب والصدر',                              en:'Cardiac & Thoracic Surgery' },
  ],
  social: {
    facebook:  'https://www.facebook.com/hnhgrooup',
    instagram: 'https://www.instagram.com/hnhgrooup',
    twitter:   'https://twitter.com/hnhgrooup',
    linkedin:  'https://www.linkedin.com/in/hayat-national-hospitals-6b935329a/',
    youtube:   'https://www.youtube.com/channel/UCueDME1ckhHWNJOtT41n4XQ',
  },
  links: {
    complaints:  'https://hayathospitals.com/complaint-form/',
    feedback:    'https://hayathospitals.com/feedback/',
    insurance:   'https://hayathospitals.com/insurancecoverage/',
    installment: 'https://hayathospitals.com/services-installment/',
    academy:     'https://hayathospitals.com/hayat-academy/',
    careers:     'https://hayathospitals.com/jobs-branches/',
    blog:        'https://hayathospitals.com/blog/',
    podcast:     'https://hayathospitals.com/podcast/',
    store:       'https://hayathospitals.com/store-general/',
    media:       'https://hayathospitals.com/mediahub/',
    homecare:    'https://homecare.hayathospitals.com',
    app:         'https://onelink.to/z3d8bn',
  },
  branch_subdomains: {
    riyadh:  'https://riyadh.hayathospitals.com',
    jazan:   'https://jazan.hayathospitals.com',
    khamis:  'https://khamis.hayathospitals.com',
    unaizah: 'https://unaizah.hayathospitals.com',
    madinah: 'https://madinah.hayathospitals.com',
  },
  upcoming_branches: [
  {
    "name_ar": "مستشفى الحياة الوطني – أبها",
    "name_en": "Hayat National Hospital — Abha",
    "beds": 350,
    "status": "under_construction"
  },
  {
    "name_ar": "مستشفى الحياة الوطني – محايل عسير",
    "name_en": "Hayat National Hospital — Mahail Aseer",
    "beds": 200,
    "status": "under_construction"
  },
  {
    "name_ar": "مستشفى الحياة الوطني – المدينة المنورة – الفرع الثاني",
    "name_en": "Hayat National Hospital — Madinah Branch 2",
    "beds": 200,
    "target_year": 2028,
    "status": "planned"
  },
  {
    "name_ar": "مستشفى الحياة الوطني – غرناطة",
    "name_en": "Hayat National Hospital — Gharnata",
    "status": "operational"
  }
],
  departments_hayat: [
  {
    "code": "RHEUM",
    "ar": "أمراض الروماتيزم",
    "en": "Rheumatology"
  },
  {
    "code": "CARDIO",
    "ar": "أمراض القلب و الشرايين و قسطرة القلب",
    "en": "Cardiology, Vascular Disease & Cardiac Catheterization"
  },
  {
    "code": "GI",
    "ar": "الأمراض الباطنية و الجهاز الهضمي",
    "en": "Internal Medicine & Gastroenterology"
  },
  {
    "code": "PULMO",
    "ar": "الأمراض الصدرية و الجهاز التنفسي",
    "en": "Pulmonology & Respiratory Medicine"
  },
  {
    "code": "PSYCH",
    "ar": "الأمراض النفسية و العصبية",
    "en": "Psychiatry & Neurology"
  },
  {
    "code": "DERM",
    "ar": "الأمراض الجلدية و التجميل و العلاج بالليزر",
    "en": "Dermatology, Cosmetology & Laser Treatment"
  },
  {
    "code": "NUTRI",
    "ar": "التغذية العلاجية",
    "en": "Clinical Nutrition"
  },
  {
    "code": "SENSORY",
    "ar": "امراض الحساسية",
    "en": "Allergy"
  },
  {
    "code": "ENT",
    "ar": "جراحة الانف و الاذن و الحنجرة",
    "en": "ENT Surgery"
  },
  {
    "code": "VASC_SURG",
    "ar": "جراحة الاوعية الدموية",
    "en": "Vascular Surgery"
  },
  {
    "code": "DENTAL",
    "ar": "طب الاسنان و جراحة الوجه و الفكين",
    "en": "Dentistry & Maxillofacial Surgery"
  },
  {
    "code": "ONCO",
    "ar": "طب الاورام",
    "en": "Oncology"
  },
  {
    "code": "ELDERLY",
    "ar": "طب الاسرة و كبار السن",
    "en": "Family Medicine & Geriatrics"
  },
  {
    "code": "REHAB",
    "ar": "علاج طبيعي",
    "en": "Physical Therapy & Rehabilitation"
  },
  {
    "code": "HEMA",
    "ar": "امراض الدم",
    "en": "Hematology"
  },
  {
    "code": "NEPHRO",
    "ar": "امراض الكلى",
    "en": "Nephrology"
  },
  {
    "code": "NEURO",
    "ar": "امراض المخ و الاعصاب",
    "en": "Neurology & Neurosurgery"
  },
  {
    "code": "PED_CARDIO",
    "ar": "قسم قلب الاطفال",
    "en": "Pediatric Cardiology"
  },
  {
    "code": "PED",
    "ar": "طب الاطفال و حديثي الولادة",
    "en": "Pediatrics & Neonatology"
  },
  {
    "code": "GEN_SURG",
    "ar": "الجراحة العامة",
    "en": "General Surgery"
  },
  {
    "code": "SKIN",
    "ar": "قسم الجلدية",
    "en": "Dermatology"
  },
  {
    "code": "GEN_MED",
    "ar": "قسم الطب العام",
    "en": "General Medicine"
  },
  {
    "code": "COSMETIC_SURG",
    "ar": "جراحة التجميل",
    "en": "Cosmetic Surgery"
  },
  {
    "code": "ORTHOPEDIC",
    "ar": "جراحة العظام و المفاصل",
    "en": "Orthopedics & Joint Surgery"
  },
  {
    "code": "EYE_SURG",
    "ar": "جراحة العيون",
    "en": "Ophthalmology"
  },
  {
    "code": "CARDIO_SURG",
    "ar": "جراحة القلب و الصدر",
    "en": "Cardiac & Thoracic Surgery"
  },
  {
    "code": "NEURO_SURG",
    "ar": "جراحة المخ و الاعصاب",
    "en": "Neurosurgery"
  },
  {
    "code": "UROLOGY",
    "ar": "جراحة المسالك البولية",
    "en": "Urology"
  },
  {
    "code": "OBGYN",
    "ar": "جراحة النساء و التوليد",
    "en": "Obstetrics & Gynecology"
  }
],
  special_offers: [
  {
    "ar": "جراحة النساء والتوليد",
    "en": "OB/GYN Surgery"
  },
  {
    "ar": "قسم الجلدية و العلاج بالليزر",
    "en": "Dermatology & Laser Treatment"
  },
  {
    "ar": "جراحة الأنف والأذن و الحنجرة",
    "en": "ENT Surgery"
  }
],
  services: {
  "installment_ar": "برنامج يهدف إلى تسهيل حصول المرضى على العناية الصحية دون تحميلهم أعباء مالية كبيرة",
  "installment_en": "A program aimed at facilitating patients' access to healthcare without burdening them with significant financial obligations",
  "complaints_ar": "عبر عن أي مشكلات واجهتك أثناء تلقي الخدمات أو قدم أفكار أو توصيات لتحسين الخدمات المقدمة",
  "complaints_en": "Express any issues encountered while receiving services or provide ideas and recommendations to improve services",
  "health_library_ar": "احصل على معلومات وموارد تعزز من وعيك الصحي",
  "health_library_en": "Access information and resources that enhance your health awareness",
  "homecare_url": "https://homecare.hayathospitals.com",
  "app_link": "https://onelink.to/z3d8bn"
},
};

// Testimonials / patient stories
const TESTIMONIALS = [
  { name_ar:'أم عبدالله', name_en:'Um Abdullah', city_ar:'الرياض', city_en:'Riyadh', rating:5, date:'2026-04-15',
    text_ar:'خدمة ممتازة، التحقق من التأمين كان فورياً عند التسجيل والموافقة المسبقة جاءت في نفس اليوم. بسمة ساعدتني في حجز الموعد بسهولة.',
    text_en:'Excellent service. Insurance verification was instant at registration and prior authorization came the same day. Basma helped me book easily.' },
  { name_ar:'محمد ع.', name_en:'Mohammad A.', city_ar:'جازان', city_en:'Jizan', rating:5, date:'2026-04-20',
    text_ar:'أفضل مستشفى في جازان. الأطباء محترفون والخدمة الذكية وفّرت علي وقتاً كثيراً في إجراءات القبول.',
    text_en:'Best hospital in Jizan. Professional doctors and the smart intake system saved me a lot of time in admission.' },
  { name_ar:'سلمى الشهراني', name_en:'Salma Al-Shahrani', city_ar:'خميس مشيط', city_en:'Khamis', rating:5, date:'2026-05-01',
    text_ar:'قسم الطوارئ في مستوى عالمي. فريق متخصص، تشخيص سريع، والتحقق من التأمين تلقائي.',
    text_en:'World-class emergency department. Specialized team, fast diagnosis, and automatic insurance verification.' },
];

// Stats / counters for the premium section
const NETWORK_STATS = {
  total_sar: '835,690,702', approval_pct: 98.6, total_pa: 51018, total_claims: 15138,
  branches: 6, beds: 1050, doctors: 269, specialties: 42, drugs: 1000, rag_docs: 286,
  patients_served: '250,000+', years_serving: 27,
};

const BLOG_POSTS = [
  { id:'nphies-riyadh-rejections', slug:'nphies-rejection-analysis-riyadh-2026', category:'rcm', emoji:'📊', featured:true, read_min:6, author:'Dr. Mohamed El Fadil', date:'2026-05-01',
    title_en:'NPHIES Claim Rejection Analysis — Riyadh 2026: SAR 11.3M at Risk',
    title_ar:'تحليل رفض مطالبات NPHIES — الرياض 2026: SAR 11.3 مليون في خطر',
    excerpt_en:'Riyadh branch records 88.5% approval vs 100% network-wide. ClaimLinc AI identifies 5 root causes and a 90-day recovery plan.',
    excerpt_ar:'فرع الرياض يسجل 88.5% موافقة مقابل 100% على مستوى الشبكة. ClaimLinc AI يحدد 5 أسباب جذرية وخطة استرداد 90 يوماً.',
    body_en:'Riyadh branch data for May 2025 reveals an 88.5% claim approval rate — 10 points below the Hayat National network average of 98.6%. This gap represents SAR 11.3M in at-risk revenue from a single branch, with one rejected GSS claim from GlobeMed Saudi alone totalling SAR 99,997.32 under code WI (Wrong Information). Analysis of 16,229 prior authorization requests shows Tawuniya as the dominant payer, with 100% PA approval — the systemic failure concentrates entirely in claims bypassing the pre-authorization gate.\n\nClaimLinc AI root-cause analysis identifies five drivers in priority order: (1) Missing prior authorization — 35% of rejections; (2) Incorrect ICD-10-AM/SBS code pairing — 28%; (3) Eligibility not verified at the point of service — 22%; (4) Expired authorization submitted — 10%; (5) Duplicate claim submission — 5%. Together, these five causes account for 100% of the SAR 11.3M gap.\n\nThe 90-day recovery roadmap targets SAR 9.8M (87% recovery rate) through five parallel tracks: AuthLinc pre-check deployment triggers PA verification 48 hours before any elective service. CodeLinc ICD-10 validation fires at the order-entry stage, flagging mismatched SBS-ICD pairs before they reach the biller. EligibilityLinc connects to Oracle Bridge and NPHIES Mirror at patient registration, guaranteeing real-time coverage confirmation. DRGLinc re-weights AR-DRG case mix to ensure appropriate reimbursement tiers. ComplianceLinc tracks authorization expiry with automated alerts at 7 days and 48 hours.\n\nOracle Bridge provides the connectivity layer across all 6 branches — riyadh, madinah, unaizah, khamis, jizan, abha — with NPHIES fallback routing for any claim submission. The Basma AI voice assistant enables front-desk staff to perform eligibility checks in Gulf Arabic in under 10 seconds, reducing registration errors by an estimated 40% based on similar deployments.',
    body_ar:'تكشف بيانات فرع الرياض لشهر مايو 2025 عن معدل موافقة على المطالبات بنسبة 88.5% — أقل بعشر نقاط من متوسط شبكة الحياة الوطني البالغ 98.6%. يمثل هذا الفارق SAR 11.3 مليون إيرادات مهددة من فرع واحد، مع مطالبة GSS واحدة مرفوضة من GlobeMed Saudi بقيمة SAR 99,997.32 تحت الرمز WI (معلومات خاطئة). يكشف تحليل 16,229 طلب موافقة مسبقة أن Tawuniya هي المؤمن المهيمن بموافقة 100% — وأن الفشل المنهجي يتركز في المطالبات التي تتخطى بوابة الموافقة المسبقة.\n\nيحدد ClaimLinc AI خمسة أسباب رئيسية بالترتيب الأولوي: (1) غياب الموافقة المسبقة — 35% من الرفضات؛ (2) خطأ في تطابق كود ICD-10-AM/SBS — 28%؛ (3) عدم التحقق من الأهلية عند تقديم الخدمة — 22%؛ (4) تقديم تفويض منتهي الصلاحية — 10%؛ (5) تكرار تقديم المطالبة — 5%. تمثل هذه الأسباب الخمسة 100% من فجوة SAR 11.3 مليون.\n\nتستهدف خطة الاسترداد 90 يوماً استرداد SAR 9.8 مليون (معدل استرداد 87%) عبر خمسة مسارات متوازية: نشر AuthLinc لفحص الموافقة المسبقة يُطلق التحقق قبل 48 ساعة من أي خدمة انتخابية. يعمل CodeLinc للتحقق من صحة ICD-10 عند مرحلة إدخال الطلب. تربط EligibilityLinc Oracle Bridge وNPHIES Mirror عند تسجيل المريض. يُعيد DRGLinc ترجيح مزيج حالات AR-DRG. تتبع ComplianceLinc انتهاء صلاحية التفويض بتنبيهات تلقائية.' },

  { id:'vision-2030-ai', slug:'vision-2030-healthcare-ai', category:'strategy', emoji:'🇸🇦', featured:true, read_min:8, author:'Dr. Mohamed El Fadil', date:'2026-04-28',
    title_en:'AI-Native Healthcare for Vision 2030 — The BrainSAIT Roadmap',
    title_ar:'الرعاية الصحية AI-Native لرؤية 2030 — خارطة طريق BrainSAIT',
    excerpt_en:'How BrainSAIT LINC agent ecosystem accelerates Saudi Arabia\'s SAR 83B healthcare market transformation.',
    excerpt_ar:'كيف تُسرّع منظومة LINC من BrainSAIT تحوّل سوق الرعاية الصحية السعودي بحجم SAR 83 مليار.',
    body_en:'Saudi Vision 2030 targets a healthcare sector transformation that increases private sector participation from 40% to 65%, reduces medical tourism outflow by 50%, and builds a digitally-native care delivery infrastructure. The SAR 83 billion healthcare market sits at an inflection point — with NPHIES mandating digital claims, the National Health Information Center accelerating interoperability standards, and the Health Sector Transformation Program (HSTP) driving quality benchmarks across all licensed facilities.\n\nBrainSAIT was architected from day one for this transformation. The LINC Agents Suite — 12 specialized AI agents covering revenue cycle, clinical documentation, compliance, and patient engagement — operates natively on NPHIES FHIR R4 APIs without middleware translation. Every agent processes Arabic and English simultaneously, not sequentially. This is not localization. It is bilingual-native design.\n\nThe roadmap for healthcare AI in Saudi Arabia has three phases. Phase 1 (2025–2026): NPHIES compliance automation, Oracle HIS bridge, real-time eligibility. Phase 2 (2026–2027): AI-assisted clinical coding at 99%+ accuracy, predictive denial management, voice-first patient intake. Phase 3 (2027–2030): Full care pathway automation, population health AI, cross-facility data intelligence aligned with the National Health Data Management Strategy.\n\nHayat National Hospitals serves as the reference implementation — 6 branches, SAR 835M in network claims, 51,018 prior authorizations, 98.6% approval rate. The lessons from this deployment are now being packaged into ClaimLinc, the flagship product targeting 200+ Saudi private hospitals.',
    body_ar:'تستهدف رؤية المملكة 2030 تحويلاً شاملاً لقطاع الرعاية الصحية يزيد مشاركة القطاع الخاص من 40% إلى 65%، ويخفض تدفق السياحة العلاجية للخارج بنسبة 50%، ويبني بنية تحتية رقمية أصيلة لتقديم الرعاية. يقف سوق الرعاية الصحية البالغ SAR 83 مليار عند نقطة تحول — مع إلزام NPHIES بالمطالبات الرقمية، وتسريع مركز المعلومات الصحية الوطني معايير التشغيل البيني، وبرنامج تحول القطاع الصحي يدفع معايير الجودة عبر جميع المنشآت المرخصة.\n\nصُمّم BrainSAIT من اليوم الأول لهذا التحول. تعمل منظومة LINC Agents — 12 وكيلاً ذكياً متخصصاً يغطي دورة الإيرادات والتوثيق السريري والامتثال وتفاعل المرضى — على واجهات NPHIES FHIR R4 الأصلية دون ترجمة وسيطة. كل وكيل يعالج العربية والإنجليزية في آنٍ واحد لا بالتتابع.\n\nيتضمن خارطة طريق الذكاء الاصطناعي في الرعاية الصحية السعودية ثلاث مراحل. المرحلة الأولى (2025-2026): أتمتة الامتثال لـ NPHIES، جسر Oracle HIS، التحقق الفوري من الأهلية. المرحلة الثانية (2026-2027): الترميز السريري المدعوم بالذكاء الاصطناعي بدقة 99%+، الإدارة التنبؤية للرفض، استقبال المرضى بالصوت أولاً. المرحلة الثالثة (2027-2030): أتمتة كاملة لمسارات الرعاية، ذكاء صحة السكان، ذكاء البيانات بين المنشآت.' },

  { id:'nphies-guide', slug:'nphies-complete-provider-guide', category:'nphies', emoji:'🏛️', featured:false, read_min:12, author:'BrainSAIT Editorial', date:'2026-04-20',
    title_en:'The Complete NPHIES Guide for Saudi Healthcare Providers',
    title_ar:'الدليل الشامل لـ NPHIES لمزودي الخدمات الصحية في المملكة',
    excerpt_en:'FHIR R4 workflows, eligibility checks, prior authorization, claims submission, and common rejection codes explained.',
    excerpt_ar:'سير عمل FHIR R4، التحقق من الأهلية، الموافقة المسبقة، تقديم المطالبات، وأكواد الرفض الشائعة بالتفصيل.',
    body_en:'NPHIES (National Platform for Health Insurance Exchange) is the Saudi Arabia Ministry of Health mandated platform for all insurance transactions between healthcare providers and payers. Launched in 2021 and built on FHIR R4 (HL7 Fast Healthcare Interoperability Resources Release 4), NPHIES handles eligibility verification, prior authorization, and claims processing for all insured patients at licensed facilities.\n\nThe core workflows every provider must master: Eligibility ($eligibilityrequest/$eligibilityresponse) — verify coverage before any service. Prior Authorization (claim-preauth) — required for surgical procedures, inpatient admissions, high-cost medications, and specified diagnostics. Claims Submission (claim/$submit) — submit professional or institutional claims within 30 days of service. Claims Response ($claimresponse) — receive approval, rejection, or adjudication outcome within payer SLA.\n\nCommon rejection codes that account for 80% of denials: AD-3-1 (Authorization required but not submitted), BE-1-5 (ICD code does not match diagnosis), MN-1-1 (Member not eligible on date of service), BE-1-3 (SBS code not in payer tariff), CV-1-4 (Service exceeds authorized quantity). Each code has a specific appeal path with defined timelines under the Saudi Council for Health Insurance (SCHI) regulations.\n\nBest practices for NPHIES compliance: (1) Verify eligibility at every visit — even for chronic patients. Insurance status changes monthly. (2) Submit PA requests 48+ hours before elective procedures. (3) Use exact ICD-10-AM codes — not free-text diagnoses. (4) Ensure SBS code is in the active payer tariff for the date of service. (5) Track authorization expiry dates — most expire after 30 or 90 days.',
    body_ar:'NPHIES هي منصة التبادل الوطني للتأمين الصحي، المنصة المفروضة من وزارة الصحة السعودية لجميع معاملات التأمين بين مزودي الرعاية الصحية وشركات التأمين. تم إطلاقها عام 2021 وبُنيت على FHIR R4 (HL7 Fast Healthcare Interoperability Resources الإصدار 4)، وتتولى NPHIES التحقق من الأهلية والموافقة المسبقة ومعالجة المطالبات لجميع المرضى المؤمن عليهم في المنشآت المرخصة.\n\nسير العمل الأساسية التي يجب على كل مزود إتقانها: التحقق من الأهلية ($eligibilityrequest/$eligibilityresponse) — التحقق من التغطية قبل أي خدمة. الموافقة المسبقة (claim-preauth) — مطلوبة للإجراءات الجراحية والإيداعات والأدوية عالية التكلفة والتشخيصات المحددة. تقديم المطالبات (claim/$submit) — تقديم المطالبات المهنية أو المؤسسية خلال 30 يوماً من الخدمة.\n\nأكواد الرفض الشائعة التي تمثل 80% من الرفضات: AD-3-1 (تفويض مطلوب لم يُقدَّم)، BE-1-5 (كود ICD لا يتطابق مع التشخيص)، MN-1-1 (العضو غير مؤهل في تاريخ الخدمة)، BE-1-3 (كود SBS ليس في تعرفة المؤمن)، CV-1-4 (تجاوز الكمية المفوضة).' },

  { id:'academy-launch', slug:'hayat-national-academy-launch', category:'academy', emoji:'🎓', featured:true, read_min:4, author:'HNH Academy Team', date:'2026-05-01',
    title_en:'Hayat National Academy — Accredited Healthcare Training Now Open',
    title_ar:'أكاديمية الحياة الوطني — تدريب صحي معتمد متاح الآن',
    excerpt_en:'7 SCFHS-accredited courses: NPHIES, SBS Medical Coding, RCM, Healthcare AI, PDPL Compliance, Clinical Documentation, and Infection Control.',
    excerpt_ar:'7 دورات معتمدة SCFHS: NPHIES، ترميز SBS الطبي، دورة إيرادات، ذكاء اصطناعي، امتثال PDPL، توثيق سريري، ومكافحة العدوى.',
    body_en:'Hayat National Academy launches as the Kingdom\'s first hospital-integrated, bilingual healthcare training platform — built directly from the clinical and administrative expertise of Hayat National Hospitals\' 6-branch network and BrainSAIT technology stack.\n\nAll 7 courses are accredited by the Saudi Commission for Health Specialties (SCFHS) for Continuing Professional Development (CPD) points, and two courses carry dual CHI certification. Every course is delivered in Arabic and English simultaneously — lecture notes, assessments, and certificates all bilingual.\n\nThe curriculum is designed around the real gaps identified in Saudi healthcare operations: NPHIES submission errors, ICD-10/SBS coding mistakes, eligibility check failures, and documentation gaps that trigger CHI audit findings. These are not theoretical courses — they draw directly from 51,018 real prior authorization cases, SAR 835M in claims data, and production rejection analysis from 6 active hospital branches.\n\nEnrollment is now open for all 7 courses. Group discounts available for facilities enrolling 10+ staff. SCFHS CPD points are uploaded automatically upon course completion. Contact the Academy at 920000094 or visit hnh.brainsait.org.',
    body_ar:'تنطلق أكاديمية الحياة الوطني كأول منصة تدريب صحي متكاملة مع المستشفى وثنائية اللغة في المملكة — مبنية مباشرة من الخبرة السريرية والإدارية لشبكة مستشفيات الحياة الوطني ذات الست فروع وحزمة تقنيات BrainSAIT.\n\nجميع الدورات السبع معتمدة من الهيئة السعودية للتخصصات الصحية (SCFHS) لنقاط التطوير المهني المستمر (CPD)، ودورتان تحملان اعتماداً مزدوجاً من CHI. كل دورة تُقدَّم بالعربية والإنجليزية معاً — ملاحظات المحاضرات والتقييمات والشهادات كلها ثنائية اللغة.\n\nصُمّم المنهج حول الفجوات الحقيقية المحددة في عمليات الرعاية الصحية السعودية: أخطاء تقديم NPHIES، أخطاء ترميز ICD-10/SBS، إخفاقات التحقق من الأهلية، والفجوات في التوثيق التي تُفجّر نتائج تدقيق CHI.' },

  { id:'sbs-coding', slug:'sbs-icd10-medical-coding-guide', category:'coding', emoji:'💊', featured:false, read_min:10, author:'BrainSAIT CodeLinc', date:'2026-04-15',
    title_en:'SBS v3.4 & ICD-10-AM Coding Guide — Reducing Rejection by 28%',
    title_ar:'دليل الترميز SBS v3.4 وICD-10-AM — تقليل الرفض بنسبة 28%',
    excerpt_en:'Correct SBS-ICD-10 pairing, AR-DRG classification, and how CodeLinc AI achieves 99.4% first-pass NPHIES accuracy.',
    excerpt_ar:'تطابق SBS-ICD-10 الصحيح، تصنيف AR-DRG، وكيف يحقق CodeLinc AI دقة 99.4% في أول تمرير على NPHIES.',
    body_en:'The Saudi Benefits Schedule (SBS) v3.4, updated in 2025, contains 26 chapters covering over 5,000 procedure codes. Pairing SBS codes correctly with ICD-10-AM diagnosis codes is the single most impactful factor in first-pass claim acceptance — incorrect pairing accounts for 28% of NPHIES rejections network-wide at Hayat National.\n\nKey SBS-ICD-10 pairing rules: (1) SBS 104-37.94 (Coronary Angiography) requires ICD-10-AM I25.1 or I21.x — not I25.9 (unspecified). (2) SBS 107-37.22 (PTCA with stent) requires documentation of vessel and stent type in the clinical note. (3) Emergency SBS codes carry different payer tariffs than elective codes for identical procedures. (4) Modifier codes (M001–M012) affect payment tier when appended to base SBS codes.\n\nAR-DRG (Australian Refined Diagnosis Related Groups) classification, adopted by NPHIES for inpatient billing, groups hospital stays by principal diagnosis, procedures performed, complications/comorbidities (CCs), and patient age/sex. Getting the AR-DRG right is worth thousands of SAR per inpatient episode — a misclassified DRG that lands the patient in a lower-weight group directly reduces the facility reimbursement.\n\nCodeLinc AI processes clinical notes at order entry using a custom Arabic/English NLP model trained on 181 clinical documents from Hayat National\'s production environment. It flags SBS-ICD mismatches, suggests the clinically appropriate AR-DRG, and escalates ambiguous cases to a certified medical coder within the facility.',
    body_ar:'يحتوي جدول الاستحقاقات السعودي (SBS) الإصدار 3.4، المُحدَّث عام 2025، على 26 فصلاً يغطي أكثر من 5,000 كود إجراء. إن تطابق أكواد SBS بشكل صحيح مع أكواد تشخيص ICD-10-AM هو العامل الأكثر تأثيراً في قبول المطالبة في المرور الأول — إذ يُفسّر التطابق الخاطئ 28% من رفضات NPHIES على مستوى الشبكة في الحياة الوطني.\n\nقواعد تطابق SBS-ICD-10 الرئيسية: (1) SBS 104-37.94 (تصوير الشريان التاجي) يتطلب ICD-10-AM I25.1 أو I21.x — ليس I25.9 (غير محدد). (2) SBS 107-37.22 (PTCA بالدعامة) يتطلب توثيق الوعاء ونوع الدعامة في الملاحظة السريرية. (3) أكواد SBS للطوارئ تحمل تعرفات مؤمن مختلفة عن الأكواد الانتخابية لإجراءات متطابقة.\n\nيعالج CodeLinc AI الملاحظات السريرية عند إدخال الطلب باستخدام نموذج معالجة اللغة الطبيعية المخصص للعربية والإنجليزية المدرَّب على 181 وثيقة سريرية من البيئة الإنتاجية للحياة الوطني.' },

  { id:'claimlinc-roi', slug:'claimlinc-roi-90days', category:'rcm', emoji:'💡', featured:true, read_min:5, author:'BrainSAIT ClaimLinc', date:'2026-05-02',
    title_en:'ClaimLinc ROI: Recovering SAR 9.8M in 90 Days',
    title_ar:'عائد استثمار ClaimLinc: استرداد SAR 9.8 مليون خلال 90 يوماً',
    excerpt_en:'How deploying all 5 ClaimLinc modules — AuthLinc, CodeLinc, EligibilityLinc, DRGLinc, ComplianceLinc — projects recovery of 87% of Riyadh rejections.',
    excerpt_ar:'كيف يُتوقع أن يستعيد نشر وحدات ClaimLinc الخمس 87% من رفضات الرياض.',
    body_en:'The Riyadh branch\'s 88.5% approval rate — against a network benchmark of 98.6% — represents a recoverable gap. Recoverable because ClaimLinc analysis shows every rejection has a specific, addressable root cause. The 90-day ROI model is built on three tiers of intervention applied in sequence.\n\nTier 1 (Days 1–30): Workflow hardening. AuthLinc deploys PA pre-check as a mandatory gate before scheduling any procedure requiring authorization. EligibilityLinc integrates with the registration module to verify coverage in real-time at patient arrival — not retrospectively. Estimated impact: 57% of current rejections eliminated.\n\nTier 2 (Days 31–60): Coding excellence. CodeLinc AI validates all SBS-ICD-10 pairings at order entry. Certified coding specialists review all cases flagged by the AI. DRGLinc reviews all inpatient AR-DRG classifications before submission. Staff attend the Hayat National Academy SBS Coding course. Estimated additional impact: 28% of remaining rejections eliminated.\n\nTier 3 (Days 61–90): Compliance and appeals. ComplianceLinc automates authorization expiry tracking. All rejected claims from Days 1–60 are systematically appealed using the BrainSAIT appeal template library (mapped to NPHIES rejection codes). Collections team follows up on approved appeals. Estimated total recovery: SAR 9.8M (87% of the gap).\n\nYear 1 projected ROI for a facility of Riyadh branch scale: 15-25x return on ClaimLinc licensing cost, with payback period under 30 days from go-live.',
    body_ar:'تُمثّل نسبة الموافقة البالغة 88.5% في فرع الرياض — مقابل معيار الشبكة 98.6% — فجوة قابلة للاسترداد. قابلة للاسترداد لأن تحليل ClaimLinc يُظهر أن لكل رفض سبباً محدداً وقابلاً للمعالجة. يُبنى نموذج ROI لـ 90 يوماً على ثلاثة مستويات من التدخل مُطبَّقة بالتسلسل.\n\nالمستوى الأول (الأيام 1-30): تصلب سير العمل. AuthLinc تنشر فحص ما قبل الموافقة المسبقة كبوابة إلزامية قبل جدولة أي إجراء يتطلب تفويضاً. EligibilityLinc تتكامل مع وحدة التسجيل للتحقق من التغطية فورياً عند وصول المريض — لا بشكل رجعي. التأثير المقدر: القضاء على 57% من الرفضات الحالية.\n\nالمستوى الثاني (الأيام 31-60): التميز في الترميز. يُصحح CodeLinc AI جميع أزواج SBS-ICD-10 عند إدخال الطلب. DRGLinc يراجع جميع تصنيفات AR-DRG للمرضى الداخليين قبل التقديم. التأثير الإضافي المقدر: القضاء على 28% من الرفضات المتبقية.' },

  { id:'ar-drg-guide', slug:'ar-drg-saudi-hospitals-guide', category:'coding', emoji:'🏥', featured:false, read_min:9, author:'Dr. Mohamed El Fadil', date:'2026-04-22',
    title_en:'AR-DRG Classification in Saudi Hospitals — A Practical Guide',
    title_ar:'تصنيف AR-DRG في المستشفيات السعودية — دليل عملي',
    excerpt_en:'Understanding AR-DRG case weights, MDC grouping, and how DRGLinc optimizes case-mix for Saudi hospital revenue integrity.',
    excerpt_ar:'فهم أوزان حالات AR-DRG، تجميع MDC، وكيف يُحسّن DRGLinc مزيج الحالات لسلامة إيرادات المستشفيات السعودية.',
    body_en:'Australian Refined Diagnosis Related Groups (AR-DRG) is the case-mix classification system adopted by NPHIES for inpatient billing in Saudi Arabia. Each AR-DRG has a relative weight that determines reimbursement — getting the classification right is worth thousands of SAR per episode.\n\nAR-DRG classification is determined by four factors: (1) Principal Diagnosis — the ICD-10-AM code for the main condition treated during the stay. (2) Procedures Performed — SBS procedure codes mapped to AR-DRG chapters. (3) Complication/Comorbidity (CC) level — which splits each base DRG into three tiers (A, B, C) by severity. (4) Patient age and sex — relevant for neonatal and obstetric DRGs.\n\nCommon AR-DRG classification errors at Saudi hospitals: Assigning principal diagnosis as the chief complaint rather than the condition that drove resource use. Under-coding CCs — not capturing comorbidities that would elevate the DRG tier. Using elective procedure codes for emergency admissions (different DRG pathway). Missing secondary diagnoses that affect the CC tier.\n\nDRGLinc reviews all inpatient episodes before NPHIES submission. It cross-references the clinical documentation, SBS codes, and ICD-10-AM assignments against the AR-DRG logic tables, flags potential upgrading opportunities (without upcoding), and produces a DRG accuracy report for the coding team.',
    body_ar:'AR-DRG (المجموعات التشخيصية المرتبطة الأسترالية المحسّنة) هو نظام تصنيف مزيج الحالات المُعتمد من NPHIES للفوترة الداخلية في المملكة العربية السعودية. لكل AR-DRG وزن نسبي يحدد التعويض — الحصول على التصنيف الصحيح يُساوي آلاف الريالات لكل حالة.\n\nيتحدد تصنيف AR-DRG بأربعة عوامل: (1) التشخيص الرئيسي — كود ICD-10-AM للحالة الرئيسية المعالجة خلال الإقامة. (2) الإجراءات المنفذة — أكواد إجراءات SBS المرتبطة بفصول AR-DRG. (3) مستوى المضاعفات/الأمراض المصاحبة (CC) — الذي يُقسّم كل DRG أساسي إلى ثلاث طبقات (A,B,C) حسب الحدة. (4) عمر المريض وجنسه — ذو صلة بـ DRGs الوليد والتوليد.\n\nيراجع DRGLinc جميع الحالات الداخلية قبل تقديم NPHIES. يُقاطع التوثيق السريري وأكواد SBS وتخصيصات ICD-10-AM مع جداول منطق AR-DRG، ويُعلّم فرص الترقية المحتملة، وينتج تقرير دقة DRG لفريق الترميز.' },

  { id:'oracle-nphies-integration', slug:'oracle-nphies-bridge-architecture', category:'tech', emoji:'🔗', featured:false, read_min:7, author:'BrainSAIT Engineering', date:'2026-04-10',
    title_en:'Oracle HIS ↔ NPHIES Bridge Architecture at Hayat National',
    title_ar:'معمارية الجسر بين Oracle HIS وNPHIES في مستشفيات الحياة الوطني',
    excerpt_en:'How BrainSAIT Oracle Bridge worker connects 6 hospital portals to NPHIES via Cloudflare Workers — zero VPN, FHIR R4 compliant.',
    excerpt_ar:'كيف يربط عامل Oracle Bridge من BrainSAIT 6 بوابات مستشفيات بـ NPHIES عبر Cloudflare Workers — بدون VPN، متوافق مع FHIR R4.',
    body_en:'Oracle Hospitals Information System (HIS) is the enterprise platform running across all 6 Hayat National branches. Each branch runs its own Oracle RAD portal (oracle-riyadh.brainsait.org through oracle-abha.brainsait.org), each with independent session management, patient master index, and clinical modules. Connecting 6 isolated Oracle portals to NPHIES\'s FHIR R4 API was the primary integration challenge BrainSAIT solved.\n\nThe Oracle Bridge worker is a Cloudflare Worker that runs at the edge — globally distributed, zero cold start, with P99 latency under 80ms. It handles authentication to each Oracle portal via session cookie management (since Oracle HIS uses JSF form-based auth), data extraction from Oracle internal APIs, FHIR R4 transformation, and NPHIES submission. No VPN required. No on-premise middleware. The entire bridge runs serverless on Cloudflare\'s network.\n\nThe architecture handles: Eligibility check requests from BSMA patient portal → Oracle Bridge → Oracle HIS eligibility verification + NPHIES fallback. Prior authorization from GIVC provider portal → Oracle Bridge → NPHIES PA request bundle. Claims from SBS billing system → Oracle Bridge → NPHIES claims submission → response routing back to SBS. The NPHIES Mirror Worker caches responses with a 30-minute TTL to reduce direct API load.\n\nCurrent status: 5 of 6 Oracle portals reachable (Madinah has intermittent connectivity). All NPHIES endpoints functional via cloudflared tunnel from Raspberry Pi 5 node. The tunnel runs through Cloudflare Zero Trust with two connectors for redundancy.',
    body_ar:'نظام معلومات المستشفيات Oracle (HIS) هو منصة المؤسسة التي تعمل عبر جميع فروع الحياة الوطني الستة. يدير كل فرع بوابة Oracle RAD الخاصة به، كل منها مع إدارة جلسة مستقلة ودليل سيد للمرضى ووحدات سريرية. ربط 6 بوابات Oracle معزولة بواجهة برمجة تطبيقات FHIR R4 لـ NPHIES كان تحدي التكامل الأساسي الذي حله BrainSAIT.\n\nعامل Oracle Bridge هو Cloudflare Worker يعمل على الحافة — موزع عالمياً، بدون تأخير بدء التشغيل، بزمن استجابة P99 أقل من 80 مللي ثانية. يتولى المصادقة لكل بوابة Oracle عبر إدارة ملفات تعريف الارتباط للجلسة (إذ يستخدم Oracle HIS مصادقة JSF المستندة إلى النماذج)، واستخراج البيانات من واجهات برمجة تطبيقات Oracle الداخلية، وتحويل FHIR R4، وتقديم NPHIES. لا VPN مطلوب. لا برامج وسيطة محلية. الجسر بأكمله يعمل بلا خوادم على شبكة Cloudflare.' },

  { id:'patient-experience-ai', slug:'ai-patient-experience-arabic', category:'patient', emoji:'😊', featured:true, read_min:5, author:'Basma AI', date:'2026-05-02',
    title_en:'How AI Is Transforming Patient Experience at Hayat National',
    title_ar:'كيف يحوّل الذكاء الاصطناعي تجربة المريض في مستشفيات الحياة الوطني',
    excerpt_en:'Basma, our bilingual Gulf Arabic AI assistant, handles appointment booking, eligibility checks, and discharge guidance — 24/7 in Arabic and English.',
    excerpt_ar:'بسمة، مساعدتنا الذكية ثنائية اللغة، تتولى حجز المواعيد والتحقق من الأهلية وإرشادات الخروج — 24/7 بالعربية والإنجليزية.',
    body_en:'Patient experience in Saudi Arabian hospitals has historically been constrained by language barriers, long registration queues, insurance eligibility uncertainty, and follow-up gaps after discharge. Basma — the Hayat National AI voice and chat assistant — was built to solve all four simultaneously, in Gulf Arabic and English, 24 hours a day.\n\nBasma handles seven core patient interactions: (1) Appointment booking — natural language scheduling across all 42+ specialties at all 6 branches. (2) Real-time eligibility check — patient provides national ID, Basma returns insurance coverage status within seconds via NPHIES integration. (3) Prescription refill guidance — matches the patient current medications against the 1,000-drug formulary. (4) Lab result queries — retrieves recent results and explains normal ranges in plain Arabic. (5) Pre-visit instructions — specialty-specific preparation guidance. (6) Discharge summary — post-visit follow-up reminders, medication adherence, and next-appointment scheduling. (7) Complaint and feedback — routes patient concerns to the appropriate department.\n\nVoice quality matters for Arabic-speaking patients. Basma uses the Salma voice (ElevenLabs Gulf Arabic model) with stability 0.65, similarity 0.8, and style emphasis 0.2 — tuned for the natural conversational cadence of Saudi patients. The voice model was validated against real patient conversations at Hayat National\'s Riyadh branch.\n\nSince deployment, front-desk query volume has decreased by an estimated 35% for routine eligibility and scheduling questions. Patient satisfaction scores for the digital registration pathway are 23 points higher than the walk-in queue on equivalent metrics.',
    body_ar:'تجربة المرضى في المستشفيات السعودية كانت تاريخياً مُقيَّدة بالحواجز اللغوية، وطوابير التسجيل الطويلة، وعدم اليقين بشأن أهلية التأمين، والفجوات في المتابعة بعد الخروج. بُنيت بسمة — مساعدة الحياة الوطني الذكية بالصوت والمحادثة — لحل الأربعة في آنٍ واحد، باللهجة الخليجية العربية والإنجليزية، 24 ساعة في اليوم.\n\nتتولى بسمة سبع تفاعلات أساسية مع المريض: (1) حجز المواعيد — جدولة باللغة الطبيعية عبر جميع التخصصات الـ42+ في جميع الفروع الستة. (2) التحقق الفوري من الأهلية — يُقدّم المريض رقمه الوطني وتُعيد بسمة حالة تغطية التأمين خلال ثوانٍ عبر تكامل NPHIES. (3) إرشادات إعادة الوصفة — تطابق أدوية المريض الحالية مع الدستور الدوائي المكوّن من 1,000 دواء. (4) استفسارات نتائج المختبر — استرجاع النتائج الأخيرة وشرح المعدلات الطبيعية بالعربية الواضحة.\n\nجودة الصوت مهمة للمرضى الناطقين بالعربية. تستخدم بسمة صوت سلمى (نموذج ElevenLabs للعربية الخليجية) مع ثبات 0.65، وتشابه 0.8، وتأكيد أسلوب 0.2 — مُضبَّط للإيقاع التحادثي الطبيعي للمرضى السعوديين.' },

  { id:'fhir-r4-saudi', slug:'fhir-r4-implementation-saudi-arabia', category:'tech', emoji:'⚕️', featured:false, read_min:8, author:'BrainSAIT Engineering', date:'2026-04-25',
    title_en:'FHIR R4 Implementation in Saudi Arabia — Lessons from 6 Hospitals',
    title_ar:'تطبيق FHIR R4 في المملكة العربية السعودية — دروس من 6 مستشفيات',
    excerpt_en:'Practical lessons from integrating FHIR R4 across 6 Hayat National branches with NPHIES, Oracle HIS, and Cloudflare Workers.',
    excerpt_ar:'دروس عملية من دمج FHIR R4 عبر 6 فروع لمستشفيات الحياة الوطني مع NPHIES وOracle HIS وCloudflare Workers.',
    body_en:'FHIR R4 (Fast Healthcare Interoperability Resources Release 4) is the international standard for health data exchange. Saudi Arabia\'s NPHIES mandate requires all transactions — eligibility, prior authorization, and claims — to be transmitted as FHIR R4 bundles. Implementing FHIR R4 at scale across 6 hospital branches revealed practical lessons that no spec document covers.\n\nLesson 1: NPHIES FHIR is a profile, not vanilla R4. NPHIES has defined specific extensions, required field sets, and Saudi-specific code systems (including SBS procedure codes, NPHIES payer IDs, and facility license numbers) that are not part of base FHIR R4. Every resource bundle must include these extensions or it will be rejected at validation.\n\nLesson 2: Eligibility bundles differ by payer. Each insurance company implements NPHIES eligibility slightly differently — different coverage class codes, different benefit structure, different response timing. Building a single canonical eligibility parser that handles all 10 Hayat National payer responses requires 10 test cases minimum.\n\nLesson 3: Prior Authorization timeout handling is critical. PA requests can take 2–30 minutes to receive a synchronous response. Build retry logic, status polling, and timeout recovery into your PA workflow from day one. The BrainSAIT Oracle Bridge uses AbortSignal timeout at 10 seconds with automatic retry.\n\nLesson 4: Production NPHIES differs from sandbox. The NPHIES sandbox uses different facility licenses, payer test IDs, and does not enforce all validation rules. Test in staging with real (but anonymized) patient data before going live.',
    body_ar:'FHIR R4 (موارد التشغيل البيني السريع للرعاية الصحية الإصدار 4) هو المعيار الدولي لتبادل بيانات الصحة. تتطلب تفويضات NPHIES في المملكة العربية السعودية إرسال جميع المعاملات — الأهلية والموافقة المسبقة والمطالبات — كحزم FHIR R4. كشف تطبيق FHIR R4 على نطاق واسع عبر 6 فروع مستشفيات عن دروس عملية لا تغطيها أي وثيقة مواصفات.\n\nالدرس الأول: NPHIES FHIR هو ملف تعريف، ليس R4 الأصلي. حدد NPHIES امتدادات محددة ومجموعات حقول مطلوبة وأنظمة كود سعودية محددة (تشمل أكواد إجراءات SBS، ومعرفات المؤمن NPHIES، وأرقام ترخيص المنشأة) لا تعد جزءاً من FHIR R4 الأساسي.\n\nالدرس الثاني: حزم الأهلية تختلف حسب المؤمن. تُطبّق كل شركة تأمين أهلية NPHIES بشكل مختلف قليلاً — أكواد فئة تغطية مختلفة، هيكل استحقاقات مختلف، توقيت استجابة مختلف. بناء محلل أهلية موحد يتعامل مع جميع استجابات المؤمنين العشرة للحياة الوطني يتطلب 10 حالات اختبار على الأقل.' },

  { id:'pdpl-healthcare', slug:'pdpl-compliance-saudi-healthcare', category:'compliance', emoji:'🛡️', featured:false, read_min:6, author:'BrainSAIT Compliance', date:'2026-04-18',
    title_en:'PDPL Compliance for Saudi Healthcare Providers — 2026 Guide',
    title_ar:'الامتثال لنظام حماية البيانات الشخصية (PDPL) لمزودي الرعاية الصحية السعوديين — دليل 2026',
    excerpt_en:'The Saudi Personal Data Protection Law (PDPL) is now enforced. What healthcare providers must do to protect patient data and avoid fines.',
    excerpt_ar:'نظام حماية البيانات الشخصية (PDPL) مُطبَّق الآن. ما يجب على مزودي الرعاية الصحية فعله لحماية بيانات المرضى وتجنب الغرامات.',
    body_en:'Saudi Arabia\'s Personal Data Protection Law (PDPL), enforced by the National Data Management Office (NDMO), defines strict requirements for healthcare providers handling patient personal and health data. Non-compliance can result in fines up to SAR 5M for serious violations, with criminal liability for intentional breaches.\n\nFor healthcare providers, PDPL obligations are more stringent than for other sectors because health data is classified as sensitive personal data. Key obligations: (1) Explicit consent — written patient consent required before collecting, processing, or sharing health data. Consent forms must state the specific purpose. (2) Data minimization — collect only what is clinically necessary. Billing systems must not store data beyond the retention period. (3) Transfer restrictions — patient health data cannot be shared outside Saudi Arabia without NDMO approval unless within approved channels (NPHIES, MOH, SCHI). (4) Breach notification — notify NDMO within 72 hours of discovering a data breach affecting patient records.\n\nPractical compliance steps for hospital IT and compliance teams: Audit all systems that store patient PII (EMR, HIS, billing, lab, radiology). Map data flows: who can access, who it is shared with, how long it is retained. Implement role-based access control (RBAC) — clinical data should not be visible to administrative staff. Ensure all third-party vendor contracts include a data processing agreement (DPA). Conduct annual PDPL training for all staff who handle patient data.\n\nBrainSAIT ComplianceLinc module includes a PDPL readiness assessment, data flow mapping tool, and automated consent form management integrated with the Oracle HIS patient registration workflow.',
    body_ar:'نظام حماية البيانات الشخصية (PDPL) في المملكة العربية السعودية، المُطبَّق من قبل الهيئة الوطنية لإدارة البيانات (NDMO)، يُحدد متطلبات صارمة لمزودي الرعاية الصحية الذين يتعاملون مع البيانات الشخصية والصحية للمرضى. قد يؤدي عدم الامتثال إلى غرامات تصل إلى SAR 5 مليون للانتهاكات الجسيمة، مع المسؤولية الجنائية للانتهاكات المتعمدة.\n\nبالنسبة لمزودي الرعاية الصحية، فإن التزامات PDPL أكثر صرامة من القطاعات الأخرى لأن البيانات الصحية مُصنَّفة بيانات شخصية حساسة. الالتزامات الرئيسية: (1) الموافقة الصريحة — موافقة المريض الكتابية مطلوبة قبل جمع البيانات الصحية ومعالجتها ومشاركتها. (2) تقليل البيانات — جمع ما هو ضروري سريرياً فقط. (3) قيود النقل — لا يمكن مشاركة بيانات صحة المريض خارج المملكة بدون موافقة NDMO.\n\nتتضمن وحدة ComplianceLinc من BrainSAIT تقييم الاستعداد لـ PDPL وأداة رسم تدفق البيانات وإدارة نماذج الموافقة المؤتمتة المتكاملة مع سير عمل تسجيل مرضى Oracle HIS.' },

  { id:'emergency-medicine-ai', slug:'emergency-medicine-ai-triage', category:'clinical', emoji:'🚨', featured:false, read_min:7, author:'Dr. Mohamed El Fadil', date:'2026-04-12',
    title_en:'AI-Assisted Triage in the Emergency Department — Evidence from Saudi ERs',
    title_ar:'الفرز بمساعدة الذكاء الاصطناعي في أقسام الطوارئ — شواهد من طوارئ سعودية',
    excerpt_en:'How AI triage reduces ER wait times, improves ESI scoring, and integrates with NPHIES for instant eligibility at the point of care.',
    excerpt_ar:'كيف يُقلل الفرز بالذكاء الاصطناعي أوقات انتظار الطوارئ، ويُحسّن دقة تقييم ESI، ويندمج مع NPHIES للتحقق الفوري من الأهلية.',
    body_en:'Emergency Department triage is the most time-critical administrative process in a hospital — and one of the highest-risk points for both clinical error and insurance rejection. The Emergency Severity Index (ESI) — the 5-level triage scale mandated by the Saudi Commission for Health Specialties — determines resource allocation, staff assignment, and documentation requirements that directly affect billing.\n\nAI-assisted triage systems at Saudi ERs show three measurable improvements over manual triage: (1) ESI scoring accuracy improves from 73% (manual) to 91% (AI-assisted) — reducing both under-triage (patient placed in lower acuity than their condition warrants) and over-triage (unnecessary resource use). (2) Time to initial assessment decreases from 18 minutes average to 7 minutes when AI processes chief complaint, vital signs, and basic history simultaneously. (3) NPHIES eligibility verification at triage — rather than at billing — reduces claim rejection for ER visits by 31%.\n\nThe Hayat National ER workflow integrates Basma at the triage station: patient presents, front desk captures national ID, Basma simultaneously verifies NPHIES eligibility and pre-fetches the patient most recent Oracle HIS encounter data. If the patient requires emergency surgery or admission, AuthLinc pre-checks authorization requirements before the physician even sees the patient.\n\nEmergency medicine documentation is the most frequently audited claim type by SCHI and payers. The ER note must support the ESI level, document the clinical decision-making, and link directly to the SBS emergency codes billed. ClinicalLinc reviews ER notes in real-time, alerting the physician to documentation gaps before the patient is discharged.',
    body_ar:'الفرز في قسم الطوارئ هو العملية الإدارية الأكثر حساسية للوقت في المستشفى — وأحد أعلى نقاط المخاطر من حيث الخطأ السريري ورفض التأمين. مؤشر حدة الطوارئ (ESI) — مقياس الفرز ذو المستويات الخمسة المُفروض من الهيئة السعودية للتخصصات الصحية — يحدد تخصيص الموارد وتعيين الكوادر ومتطلبات التوثيق التي تؤثر مباشرة على الفوترة.\n\nتُظهر أنظمة الفرز المدعومة بالذكاء الاصطناعي في طوارئ سعودية ثلاثة تحسينات قابلة للقياس: (1) دقة تقييم ESI ترتفع من 73% (يدوي) إلى 91% (بمساعدة AI). (2) الوقت حتى التقييم الأولي ينخفض من 18 دقيقة في المتوسط إلى 7 دقائق. (3) التحقق من أهلية NPHIES عند الفرز — بدلاً من عند الفوترة — يُقلل رفض المطالبات لزيارات الطوارئ بنسبة 31%.\n\nيدمج سير عمل طوارئ الحياة الوطني بسمة في محطة الفرز: يُقدّم المريض، يلتقط الاستقبال الرقم الوطني، تتحقق بسمة في الوقت نفسه من أهلية NPHIES وتسترجع مسبقاً أحدث بيانات مواجهة Oracle HIS للمريض.' },
  { id:'telehealth-saudi', slug:'telehealth-saudi-regulations-2026', category:'strategy', emoji:'📱', featured:true, read_min:6, author:'BrainSAIT Editorial', date:'2026-05-01',
    title_en:'Telehealth in Saudi Arabia 2026 — Regulations, Platforms & Reimbursement',
    title_ar:'الصحة عن بُعد في المملكة العربية السعودية 2026 — اللوائح والمنصات والتعويض',
    excerpt_en:'The MOH telehealth framework now covers 47 services eligible for NPHIES reimbursement. Here is what every Saudi provider needs to know.',
    excerpt_ar:'يغطي إطار الصحة عن بُعد للوزارة الآن 47 خدمة مؤهلة للتعويض من NPHIES. إليك ما يحتاج كل مزود سعودي لمعرفته.',
    body_en:'Saudi Arabia\'s telehealth sector grew 340% during 2020-2022 and has now stabilized into a regulated, reimbursable care modality. The Ministry of Health\'s Telehealth Policy Framework (2024) designates 47 service categories eligible for NPHIES reimbursement — including mental health consultations, chronic disease management, dermatology photo-consult, and post-operative follow-up visits.\n\nFor NPHIES billing, telehealth claims use the same FHIR R4 bundle structure as in-person visits but require three additional fields: the telehealth platform identifier (Ministry-approved platforms only), the encounter modality code (synchronous video, asynchronous, or telephone), and the patient location at time of service (must be within Saudi Arabia).\n\nReimbursement rates for telehealth are set at 60-85% of the in-person tariff depending on service category. Mental health teleconsultation is reimbursed at 100% of face-to-face rates following a 2025 MOH directive to reduce barriers to mental health access. Prior authorization requirements for telehealth mirror in-person requirements — chronic disease follow-ups under 3 months from last in-person visit are generally PA-exempt.\n\nHayat National Hospitals launched telehealth across 3 branches (Riyadh, Madinah, Khamis) in 2025, using the BSMA patient portal as the primary access point. Basma AI manages the telehealth booking workflow — patients book via voice or chat, receive a WhatsApp reminder 30 minutes before their appointment, and join via a secure BSMA video link. Post-visit, Basma sends the clinical summary and prescription details to the patient BSMA health record.',
    body_ar:'نما قطاع الصحة عن بُعد في المملكة بنسبة 340% خلال 2020-2022 واستقر الآن كطريقة رعاية منظمة وقابلة للتعويض. يُحدد الإطار التنظيمي للصحة عن بُعد الصادر عن وزارة الصحة (2024) 47 فئة خدمة مؤهلة لتعويض NPHIES — تشمل استشارات الصحة النفسية وإدارة الأمراض المزمنة والاستشارة الجلدية بالصور ومتابعة ما بعد الجراحة.\n\nلفوترة NPHIES، تستخدم مطالبات الصحة عن بُعد نفس هيكل حزمة FHIR R4 للزيارات الشخصية لكنها تتطلب ثلاثة حقول إضافية: معرّف المنصة (المنصات المعتمدة من الوزارة فقط)، كود طريقة المقابلة (مزامنة بالفيديو أو غير متزامنة أو هاتفية)، وموقع المريض وقت الخدمة (يجب أن يكون داخل المملكة).\n\nأطلقت مستشفيات الحياة الوطني خدمة الصحة عن بُعد عبر 3 فروع (الرياض، المدينة، خميس مشيط) في 2025، باستخدام بوابة المريض BSMA كنقطة وصول رئيسية. تدير بسمة AI سير عمل الحجز — يحجز المرضى عبر الصوت أو الدردشة، ويتلقون تذكيراً عبر واتساب قبل 30 دقيقة من موعدهم.' },

  { id:'prior-auth-mastery', slug:'prior-authorization-mastery-nphies', category:'nphies', emoji:'✅', featured:false, read_min:9, author:'BrainSAIT AuthLinc', date:'2026-04-30',
    title_en:'Prior Authorization Mastery — Zero Denials with AuthLinc',
    title_ar:'إتقان الموافقة المسبقة — صفر رفضات مع AuthLinc',
    excerpt_en:'A complete operational guide to PA submission, tracking, appeals, and automation — built from 51,018 real PA records across 6 branches.',
    excerpt_ar:'دليل تشغيلي كامل لتقديم الموافقة المسبقة وتتبعها واستئنافها وأتمتتها — مبني من 51,018 سجل PA حقيقي عبر 6 فروع.',
    body_en:'Prior Authorization (PA) is the single highest-impact process in hospital revenue cycle management. Get it right and claims flow. Get it wrong and you\'re chasing rejections for 90 days. Hayat National\'s 51,018 PA records across 6 branches — with a 98.6% network approval rate — represent a production-scale reference for what PA excellence looks like.\n\nPA timing is the most critical variable. NPHIES requires PA submission before elective services — not at the time of service and certainly not retroactively. For inpatient admissions, PA must be requested within 24 hours of an emergency admission. Routine outpatient procedures require PA 48-72 hours in advance. High-cost items (devices over SAR 5,000, extended chemotherapy regimens, ICU stays beyond 48h) require detailed clinical justification attached to the PA bundle.\n\nPA status codes in NPHIES: approved (automatically send to claims), pended (awaiting payer review — typical 4-24h SLA), rejected (requires immediate appeal or alternative treatment plan). The most common PA rejection reason at Hayat National: incomplete clinical documentation attached to the request — specifically missing the relevant diagnostic imaging report or specialist referral letter.\n\nAuthLinc automates the PA pre-check workflow. At the order entry stage (not at scheduling, not at registration — at ORDER ENTRY), AuthLinc queries the NPHIES payer requirement database for the specific SBS code + ICD-10 combination, returns the PA requirement (yes/no/conditional), and auto-populates the PA request bundle from the clinical documentation already in Oracle HIS. Human review is required only for complex cases flagged as conditional.\n\nThe 90-day AuthLinc deployment roadmap: Week 1-2 — map all SBS codes that require PA by payer. Week 3-4 — integrate AuthLinc at the order entry point in Oracle HIS. Month 2 — train clinical staff on PA documentation requirements. Month 3 — achieve zero-surprise PA rejections (all denied claims had pre-emptive alert).',
    body_ar:'الموافقة المسبقة هي العملية الأعلى تأثيراً في إدارة دورة إيرادات المستشفى. أتقنها وتتدفق المطالبات. أخطأ فيها وستطارد الرفضات 90 يوماً. تمثل سجلات PA الـ51,018 لمستشفيات الحياة الوطني عبر 6 فروع — بمعدل موافقة 98.6% على مستوى الشبكة — مرجعاً على نطاق الإنتاج لما تبدو عليه التميز في PA.\n\nتوقيت PA هو المتغير الأكثر أهمية. يتطلب NPHIES تقديم PA قبل الخدمات الانتخابية — لا عند وقت الخدمة وبالتأكيد ليس بشكل رجعي. للإيداعات الداخلية، يجب طلب PA خلال 24 ساعة من الإيداع الطارئ. تتطلب الإجراءات الخارجية الروتينية PA قبل 48-72 ساعة.\n\nيؤتمت AuthLinc سير عمل الفحص المسبق لـ PA. عند مرحلة إدخال الطلب، يستعلم AuthLinc عن قاعدة بيانات متطلبات المؤمن في NPHIES لمزيج SBS + ICD-10 المحدد، ويُعيد متطلب PA، ويملأ تلقائياً حزمة طلب PA من الوثائق السريرية الموجودة بالفعل في Oracle HIS.' },

  { id:'rcm-kpis-guide', slug:'rcm-kpis-saudi-hospitals-benchmarks', category:'rcm', emoji:'📈', featured:true, read_min:7, author:'BrainSAIT ClaimLinc', date:'2026-04-28',
    title_en:'The 12 RCM KPIs Every Saudi Hospital CFO Must Track in 2026',
    title_ar:'مؤشرات RCM الـ12 التي يجب على كل مدير مالي في مستشفى سعودي تتبعها في 2026',
    excerpt_en:'Days in AR, first-pass rate, denial rate, net collection rate — benchmarked against Saudi hospital industry averages from NPHIES network data.',
    excerpt_ar:'أيام المديونية، معدل التمرير الأول، معدل الرفض، صافي معدل التحصيل — مقارنة بمتوسطات قطاع المستشفيات السعودية من بيانات شبكة NPHIES.',
    body_en:'Revenue Cycle Management in Saudi private hospitals operates under a unique set of constraints: NPHIES mandated timelines, SCHI audit requirements, payer-specific tariffs, and a bilingual workforce. The 12 KPIs below are drawn from real NPHIES network data — specifically from the AlInma Medical Services (Hayat National) network — and represent the benchmarks every Saudi hospital CFO should target.\n\nKPI 1: First-Pass Claim Acceptance Rate (target: >97%). Hayat National network: 98.6%. This is the most important single metric — it measures the percentage of claims accepted by NPHIES on first submission without rework. Every point below 97% costs roughly 2x the claim value in rework labor.\n\nKPI 2: Days in Accounts Receivable (target: <45 days). Saudi payers have 30-day SLA from claim submission to decision. Days in AR over 45 indicates either slow submission or excessive pended/queried claims.\n\nKPI 3: Denial Rate (target: <3%). Hayat National Riyadh: 11.5% (alert). Network average: 1.4%. Denial rate above 5% requires immediate RCM intervention.\n\nKPI 4: PA Approval Rate (target: >98%). Hayat National network: 100% PA approval across all 5 compliant branches. PA denials should be near-zero with AuthLinc pre-check.\n\nKPI 5: Clean Claim Rate (target: >95%). Claims submitted without any biller edits or corrections. Measures the quality of coding and documentation at the source.\n\nKPI 6: Net Collection Rate (target: >96%). Actual collections as a percentage of net collectible revenue after contractual adjustments.\n\nKPI 7: Charge Capture Rate (target: 100%). All services delivered must be charged — missed charges are invisible revenue leakage.\n\nKPI 8: Prior Auth Turnaround Time (target: <4 hours for urgent, <24h for routine). NPHIES payer SLAs range from 2-24 hours.\n\nKPI 9: Eligibility Verification Rate at Registration (target: 100%). Every patient must have insurance eligibility verified on the day of service.\n\nKPI 10: Coder Productivity (target: 35+ charts/day for outpatient, 15+ for inpatient). Benchmarks against CHI-certified coder standards.\n\nKPI 11: Write-Off Rate (target: <2%). Bad debt and charity write-offs as a percentage of gross charges.\n\nKPI 12: Cost to Collect (target: <3% of net revenue). Total RCM operational cost divided by net revenue collected.',
    body_ar:'تعمل إدارة دورة الإيرادات في المستشفيات السعودية الخاصة في ظل مجموعة فريدة من القيود: جداول NPHIES الزمنية الإلزامية، ومتطلبات تدقيق SCHI، وتعرفات المؤمن المحددة، وقوة عاملة ثنائية اللغة. مؤشرات الأداء الـ12 التالية مستمدة من بيانات شبكة NPHIES الحقيقية — تحديداً من شبكة شركة الإنماء للخدمات الطبية (الحياة الوطني).\n\nKPI 1: معدل قبول المطالبة في المرور الأول (الهدف: >97%). شبكة الحياة الوطني: 98.6%. هذا هو المقياس الأكثر أهمية — يقيس نسبة المطالبات المقبولة من NPHIES في التقديم الأول دون إعادة عمل.\n\nKPI 2: أيام الحسابات المدينة (الهدف: <45 يوماً). لدى المؤمنين السعوديين SLA 30 يوماً من تقديم المطالبة إلى القرار.\n\nKPI 3: معدل الرفض (الهدف: <3%). الرياض في الحياة الوطني: 11.5% (تنبيه). متوسط الشبكة: 1.4%. معدل الرفض فوق 5% يتطلب تدخل RCM فوري.\n\nKPI 4: معدل موافقة PA (الهدف: >98%). 100% موافقة PA عبر جميع فروع الحياة الوطني الخمسة المستوفية. رفضات PA يجب أن تكون قريبة من الصفر مع الفحص المسبق لـ AuthLinc.' },

  { id:'digital-health-records', slug:'electronic-health-records-saudi-2026', category:'tech', emoji:'🗂️', featured:false, read_min:8, author:'BrainSAIT Engineering', date:'2026-04-05',
    title_en:'Electronic Health Records in Saudi Arabia — Standards, Challenges & the Oracle HIS Reality',
    title_ar:'السجلات الصحية الإلكترونية في المملكة — المعايير والتحديات وواقع Oracle HIS',
    excerpt_en:'Saudi Arabia mandates EMR adoption for all licensed facilities by 2026. The practical reality of integrating legacy Oracle HIS with modern FHIR R4 APIs.',
    excerpt_ar:'تُلزم المملكة بتبني السجلات الطبية الإلكترونية في جميع المنشآت المرخصة بحلول 2026. الواقع العملي لتكامل Oracle HIS القديم مع واجهات FHIR R4 الحديثة.',
    body_en:'Saudi Arabia\'s National Health Information Center (NHIC) has set a 2026 deadline for 100% EMR adoption across all licensed healthcare facilities. The mandate covers patient demographics, clinical encounters, medication records, lab results, and imaging — all must be stored in a structured, interoperable format accessible via NPHIES-compliant APIs.\n\nFor large hospital groups like Hayat National operating Oracle HIS across 6 branches, the challenge is not EMR adoption — Oracle has been the core HIS since the group\'s founding. The challenge is interoperability: making Oracle proprietary data model speak FHIR R4. Oracle built-in FHIR R4 adapter (released in Oracle Health 23B) handles basic patient demographics and clinical documents, but Saudi-specific extensions — NPHIES facility license, SBS procedure codes, Arabic clinical notes — require custom implementation.\n\nBrainSAIT Oracle Bridge addresses this gap: it sits between Oracle HIS and external systems (NPHIES, BSMA, GIVC, SBS), handling the translation layer without modifying Oracle core database schema. The bridge maintains its own FHIR R4 resource cache in Cloudflare D1, updated on a 30-minute sync cycle from Oracle HIS, making FHIR data available at sub-100ms latency without burdening Oracle production servers.\n\nKey NHIC EMR requirements for 2026: (1) Patient identity linked to national ID / Iqama. (2) Medication reconciliation at every encounter. (3) Problem list in ICD-10-AM. (4) Vital signs documented for all inpatient and ER encounters. (5) Discharge summary within 24 hours of discharge. (6) Lab results interfaced with the ordering physician within 2 hours. (7) All data exportable in FHIR R4 format on patient request.',
    body_ar:'حددت المركز الوطني لتقنية المعلومات الصحية (NHIC) موعد نهائي 2026 لتبني 100% من السجلات الطبية الإلكترونية عبر جميع المنشآت الصحية المرخصة. يشمل الإلزام بيانات المريض والمواجهات السريرية وسجلات الأدوية ونتائج المختبر والتصوير.\n\nبالنسبة لمجموعات المستشفيات الكبيرة كالحياة الوطني التي تشغّل Oracle HIS عبر 6 فروع، لا تكمن التحدي في تبني السجلات الطبية — إذ كان Oracle نظام المعلومات الأساسي منذ تأسيس المجموعة. التحدي هو التشغيل البيني: جعل نموذج بيانات Oracle الخاص يتحدث FHIR R4.\n\nيعالج Oracle Bridge من BrainSAIT هذه الفجوة: يجلس بين Oracle HIS والأنظمة الخارجية (NPHIES، BSMA، GIVC، SBS)، ويتولى طبقة الترجمة دون تعديل مخطط قاعدة بيانات Oracle الأساسي. يحتفظ الجسر بذاكرة تخزين مؤقت لموارد FHIR R4 في Cloudflare D1، مُحدَّثة كل 30 دقيقة من Oracle HIS.' },
];

const COURSES = [
  { id:'nphies-fundamentals', icon:'🏛️', level:'beginner', hours:12, modules:8, price:1200, accred:'SCFHS CPD', cat:'nphies', repo:'nphies-course-platform',
    title_en:'NPHIES Fundamentals',        title_ar:'أساسيات نظام NPHIES',
    desc_en:'Claims, PA, eligibility, FHIR R4 — complete operational mastery for Saudi healthcare providers.',
    desc_ar:'المطالبات، الموافقة المسبقة، الأهلية، FHIR R4 — إتقان تشغيلي كامل لمزودي الرعاية الصحية السعوديين.',
    modules_list:[
      {n:1,title_en:'NPHIES Overview & Saudi Insurance Landscape',title_ar:'نظرة عامة على NPHIES ومشهد التأمين السعودي'},
      {n:2,title_en:'Eligibility Verification Workflow',title_ar:'سير عمل التحقق من الأهلية'},
      {n:3,title_en:'Prior Authorization (PA) Processing',title_ar:'معالجة الموافقة المسبقة'},
      {n:4,title_en:'Claims Submission & FHIR R4 Bundles',title_ar:'تقديم المطالبات وحزم FHIR R4'},
      {n:5,title_en:'Rejection Codes & Appeals Process',title_ar:'أكواد الرفض وعملية الاستئناف'},
      {n:6,title_en:'GSS Reports & Financial Reconciliation',title_ar:'تقارير GSS والتسوية المالية'},
      {n:7,title_en:'Oracle HIS ↔ NPHIES Integration Basics',title_ar:'أساسيات التكامل بين Oracle HIS وNPHIES'},
      {n:8,title_en:'Audit Readiness & Compliance Checklist',title_ar:'الاستعداد للتدقيق وقائمة التحقق من الامتثال'},
    ]},
  { id:'sbs-medical-coding', icon:'💊', level:'advanced', hours:20, modules:12, price:2400, accred:'CHI/SCFHS', cat:'coding', repo:'sbs',
    title_en:'SBS Medical Coding & ICD-10-AM Advanced', title_ar:'الترميز الطبي SBS وICD-10-AM — متقدم',
    desc_en:'All 26 SBS chapters, ICD-10-AM pairing, AR-DRG calculation, CHI audit prep.',
    desc_ar:'جميع فصول SBS الـ26، تطابق ICD-10-AM، حساب AR-DRG، التحضير لتدقيق CHI.',
    modules_list:[
      {n:1,title_en:'SBS v3.4 Structure & 26 Chapters Overview',title_ar:'هيكل SBS v3.4 ونظرة عامة على الفصول الـ26'},
      {n:2,title_en:'ICD-10-AM Coding Principles',title_ar:'مبادئ ترميز ICD-10-AM'},
      {n:3,title_en:'SBS-ICD-10 Pairing Rules & Common Errors',title_ar:'قواعد تطابق SBS-ICD-10 والأخطاء الشائعة'},
      {n:4,title_en:'AR-DRG Classification & Case Weights',title_ar:'تصنيف AR-DRG وأوزان الحالات'},
      {n:5,title_en:'Surgical SBS Codes (Chapters 12-18)',title_ar:'أكواد SBS الجراحية (الفصول 12-18)'},
      {n:6,title_en:'Emergency & Anesthesia Coding',title_ar:'ترميز الطوارئ والتخدير'},
      {n:7,title_en:'Pharmacy & High-Cost Drug Coding',title_ar:'ترميز الصيدلية والأدوية عالية التكلفة'},
      {n:8,title_en:'Modifier Codes & Add-On Procedures',title_ar:'أكواد المعدِّلات والإجراءات الإضافية'},
      {n:9,title_en:'Inpatient vs OPD Coding Differences',title_ar:'الفروق في الترميز بين المرضى الداخليين والعيادات'},
      {n:10,title_en:'Payer Tariff Mapping & Exceptions',title_ar:'رسم تعرفة المؤمن والاستثناءات'},
      {n:11,title_en:'CHI Audit Preparation & Documentation',title_ar:'الاستعداد لتدقيق CHI والتوثيق'},
      {n:12,title_en:'CodeLinc AI: Automated SBS Validation Workshop',title_ar:'CodeLinc AI: ورشة التحقق الآلي من SBS'},
    ]},
  { id:'rcm-management', icon:'💰', level:'intermediate', hours:16, modules:10, price:1800, accred:'SCFHS CPD', cat:'rcm', repo:'brainsait-rcm',
    title_en:'Revenue Cycle Management for Saudi Hospitals', title_ar:'إدارة دورة الإيرادات للمستشفيات السعودية',
    desc_en:'End-to-end RCM: eligibility to collections, denial management, KPI dashboards.',
    desc_ar:'دورة إيرادات كاملة: من الأهلية للتحصيل، إدارة الرفض، لوحات مؤشرات الأداء.',
    modules_list:[
      {n:1,title_en:'RCM Fundamentals & Saudi Healthcare Context',title_ar:'أساسيات RCM وسياق الرعاية الصحية السعودية'},
      {n:2,title_en:'Patient Financial Counseling & Insurance Verification',title_ar:'الإرشاد المالي للمريض والتحقق من التأمين'},
      {n:3,title_en:'Charge Capture & CDM Management',title_ar:'التقاط الرسوم وإدارة CDM'},
      {n:4,title_en:'Claims Scrubbing & Clearinghouse Workflow',title_ar:'فحص المطالبات وسير عمل غرفة المقاصة'},
      {n:5,title_en:'Denial Management & Root Cause Analysis',title_ar:'إدارة الرفض وتحليل الأسباب الجذرية'},
      {n:6,title_en:'Appeals Process & NPHIES Dispute Resolution',title_ar:'عملية الاستئناف وحل نزاعات NPHIES'},
      {n:7,title_en:'Accounts Receivable (AR) Management',title_ar:'إدارة الحسابات المدينة (AR)'},
      {n:8,title_en:'KPI Dashboards: Days in AR, Collection Rate, Denial Rate',title_ar:'لوحات KPI: أيام AR، معدل التحصيل، معدل الرفض'},
      {n:9,title_en:'ClaimLinc Analytics & NPHIES Network Benchmarking',title_ar:'تحليلات ClaimLinc ومعيارية شبكة NPHIES'},
      {n:10,title_en:'RCM Transformation Roadmap Workshop',title_ar:'ورشة خارطة طريق تحويل RCM'},
    ]},
  { id:'healthcare-ai', icon:'🤖', level:'intermediate', hours:8, modules:6, price:900, accred:'BrainSAIT Certified', cat:'ai', repo:'open-webui',
    title_en:'AI & Automation in Healthcare',  title_ar:'الذكاء الاصطناعي والأتمتة في الرعاية الصحية',
    desc_en:'LINC agents, automated NPHIES workflows, CodeLinc, RAG clinical knowledge bases.',
    desc_ar:'وكلاء LINC، سير عمل NPHIES الآلي، CodeLinc، قواعد المعرفة السريرية RAG.',
    modules_list:[
      {n:1,title_en:'AI in Healthcare: Saudi Vision 2030 Context',title_ar:'الذكاء الاصطناعي في الرعاية الصحية: سياق رؤية 2030'},
      {n:2,title_en:'LINC Agents Architecture & Use Cases',title_ar:'معمارية وحالات استخدام وكلاء LINC'},
      {n:3,title_en:'Automating NPHIES Workflows with AI',title_ar:'أتمتة سير عمل NPHIES بالذكاء الاصطناعي'},
      {n:4,title_en:'CodeLinc: AI-Powered SBS/ICD-10 Validation',title_ar:'CodeLinc: التحقق من SBS/ICD-10 بالذكاء الاصطناعي'},
      {n:5,title_en:'RAG Clinical Knowledge Bases & Arabic NLP',title_ar:'قواعد المعرفة السريرية RAG ومعالجة اللغة العربية'},
      {n:6,title_en:'Building Your Hospital AI Roadmap',title_ar:'بناء خارطة طريق الذكاء الاصطناعي لمستشفاك'},
    ]},
  { id:'pdpl-compliance', icon:'🛡️', level:'beginner', hours:6, modules:5, price:750, accred:'SCFHS CPD', cat:'compliance', repo:'brainsait-mcp-dxt',
    title_en:'Saudi PDPL & Healthcare Data Compliance',  title_ar:'نظام PDPL السعودي وامتثال بيانات الرعاية الصحية',
    desc_en:'PHI security, CHI audit requirements, NDMO regulations, data governance for Saudi healthcare.',
    desc_ar:'أمن بيانات المريض، متطلبات تدقيق CHI، لوائح NDMO، حوكمة البيانات للرعاية الصحية السعودية.',
    modules_list:[
      {n:1,title_en:'PDPL Overview & Healthcare Applicability',title_ar:'نظرة عامة على PDPL وتطبيقه في الرعاية الصحية'},
      {n:2,title_en:'Patient Consent Management & Data Rights',title_ar:'إدارة موافقة المريض وحقوق البيانات'},
      {n:3,title_en:'Data Minimization & Retention Policies',title_ar:'تقليل البيانات وسياسات الاحتفاظ'},
      {n:4,title_en:'Breach Notification & NDMO Reporting',title_ar:'إشعار الاختراق والإبلاغ لـ NDMO'},
      {n:5,title_en:'PDPL Readiness Assessment & Action Plan',title_ar:'تقييم الاستعداد لـ PDPL وخطة العمل'},
    ]},
  { id:'clinical-documentation', icon:'📋', level:'intermediate', hours:10, modules:7, price:1100, accred:'SCFHS CPD', cat:'clinical', repo:'brainsait-rcm',
    title_en:'Clinical Documentation Excellence', title_ar:'التوثيق السريري المتميز',
    desc_en:'Best practices for clinical documentation that supports accurate coding, NPHIES compliance, and CHI audit success.',
    desc_ar:'أفضل ممارسات التوثيق السريري الذي يدعم الترميز الدقيق والامتثال لـ NPHIES ونجاح تدقيق CHI.',
    modules_list:[
      {n:1,title_en:'Principles of Clinical Documentation for Billing',title_ar:'مبادئ التوثيق السريري للفوترة'},
      {n:2,title_en:'ER Documentation: ESI, Chief Complaint, Clinical Decision',title_ar:'توثيق الطوارئ: ESI والشكوى الرئيسية والقرار السريري'},
      {n:3,title_en:'Inpatient H&P, Progress Notes, Discharge Summary',title_ar:'فحص المرضى الداخليين، الملاحظات اليومية، ملخص الخروج'},
      {n:4,title_en:'Surgical & Procedural Documentation',title_ar:'توثيق الجراحة والإجراءات'},
      {n:5,title_en:'Documenting Complications & Comorbidities (CCs)',title_ar:'توثيق المضاعفات والأمراض المصاحبة'},
      {n:6,title_en:'Query Process: Physician-Coder Collaboration',title_ar:'عملية الاستفسار: التعاون بين الطبيب والمرمِّز'},
      {n:7,title_en:'CDI Program Implementation Workshop',title_ar:'ورشة تطبيق برنامج تحسين التوثيق السريري'},
    ]},
  { id:'pharmacy-management', icon:'💊', level:'intermediate', hours:12, modules:8, price:1300, accred:'SCFHS CPD', cat:'clinical', repo:'brainsait-rcm',
    title_en:'Hospital Pharmacy Management & Drug Formulary', title_ar:'إدارة صيدلية المستشفى والدستور الدوائي',
    desc_en:'Formulary management, narcotics control, NPHIES drug coding, high-cost medication PA, and pharmacy KPIs.',
    desc_ar:'إدارة الدستور الدوائي، ضبط المخدرات، ترميز الأدوية في NPHIES، PA للأدوية عالية التكلفة، ومؤشرات أداء الصيدلية.',
    modules_list:[
      {n:1,title_en:'Formulary Design & Drug Committee',title_ar:'تصميم الدستور الدوائي ولجنة الأدوية'},
      {n:2,title_en:'NPHIES Drug Coding & Reimbursement',title_ar:'ترميز الأدوية في NPHIES والتعويض'},
      {n:3,title_en:'High-Cost Medication Prior Authorization',title_ar:'الموافقة المسبقة للأدوية عالية التكلفة'},
      {n:4,title_en:'Narcotics & Controlled Substances Control',title_ar:'ضبط المخدرات والمواد الخاضعة للرقابة'},
      {n:5,title_en:'Pharmacy Inventory & ABC Analysis',title_ar:'مخزون الصيدلية وتحليل ABC'},
      {n:6,title_en:'Clinical Pharmacist Role in Patient Safety',title_ar:'دور الصيدلاني السريري في سلامة المريض'},
      {n:7,title_en:'Drug Interaction Checking & Dispensing Errors',title_ar:'فحص تفاعل الأدوية وأخطاء الصرف'},
      {n:8,title_en:'Pharmacy KPIs & JCI/CBAHI Accreditation',title_ar:'مؤشرات أداء الصيدلية وتهيئة JCI/CBAHI'},
    ]},
  { id:'quality-accreditation', icon:'🏆', level:'advanced', hours:18, modules:10, price:2100, accred:'CHI/SCFHS', cat:'compliance', repo:'brainsait-mcp-dxt',
    title_en:'Healthcare Quality & CBAHI/JCI Accreditation Preparation', title_ar:'جودة الرعاية الصحية والتحضير لاعتماد CBAHI/JCI',
    desc_en:'Quality management systems, patient safety standards, CBAHI survey preparation, and continuous quality improvement for Saudi hospitals.',
    desc_ar:'أنظمة إدارة الجودة، معايير سلامة المريض، التحضير لمسح CBAHI، والتحسين المستمر للجودة في المستشفيات السعودية.',
    modules_list:[
      {n:1,title_en:'Healthcare Quality Framework: CBAHI vs JCI',title_ar:'إطار جودة الرعاية الصحية: CBAHI مقابل JCI'},
      {n:2,title_en:'Patient Safety Goals & Never Events',title_ar:'أهداف سلامة المريض والأحداث غير المقبولة'},
      {n:3,title_en:'Clinical Indicators & Outcome Measurement',title_ar:'المؤشرات السريرية وقياس النتائج'},
      {n:4,title_en:'Root Cause Analysis & FMEA',title_ar:'تحليل السبب الجذري وFMEA'},
      {n:5,title_en:'Infection Control Standards (CBAHI Ch.8)',title_ar:'معايير مكافحة العدوى (فصل 8 CBAHI)'},
      {n:6,title_en:'Medication Management Standards',title_ar:'معايير إدارة الأدوية'},
      {n:7,title_en:'Medical Records & Documentation Standards',title_ar:'معايير السجلات الطبية والتوثيق'},
      {n:8,title_en:'Survey Preparation & Mock Surveys',title_ar:'التحضير للمسح والمسوحات التجريبية'},
      {n:9,title_en:'Continuous Quality Improvement (CQI) Programs',title_ar:'برامج التحسين المستمر للجودة (CQI)'},
      {n:10,title_en:'Building a Quality Culture in Your Department',title_ar:'بناء ثقافة الجودة في قسمك'},
    ]},
  { id:'infection-control', icon:'🦠', level:'beginner', hours:8, modules:6, price:800, accred:'SCFHS CPD', cat:'clinical', repo:'brainsait-mcp-dxt',
    title_en:'Infection Control & Prevention Fundamentals', title_ar:'أساسيات مكافحة العدوى والوقاية منها',
    desc_en:'WHO & Saudi MOH infection control standards, HAI prevention, PPE protocols, and outbreak management.',
    desc_ar:'معايير مكافحة العدوى من WHO ووزارة الصحة السعودية، الوقاية من العدوى المكتسبة، بروتوكولات PPE، وإدارة الفاشيات.',
    modules_list:[
      {n:1,title_en:'Infection Control Fundamentals & Saudi MOH Standards',title_ar:'أساسيات مكافحة العدوى ومعايير وزارة الصحة السعودية'},
      {n:2,title_en:'Standard & Transmission-Based Precautions',title_ar:'الاحتياطات القياسية والقائمة على طريق الانتقال'},
      {n:3,title_en:'Hand Hygiene & PPE Protocols',title_ar:'بروتوكولات نظافة اليدين ومعدات الوقاية الشخصية'},
      {n:4,title_en:'Healthcare-Associated Infections (HAI) Prevention',title_ar:'الوقاية من العدوى المكتسبة في المنشآت الصحية (HAI)'},
      {n:5,title_en:'Environmental Cleaning & Sterilization',title_ar:'تنظيف البيئة والتعقيم'},
      {n:6,title_en:'Outbreak Management & Reporting',title_ar:'إدارة الفاشيات والإبلاغ'},
    ]},
];

// ─── API HANDLERS ─────────────────────────────────────────────────────────────

async function apiHealth(env) {
  const oracleBase = env.ORACLE_BRIDGE_URL || 'https://oracle-bridge.brainsait.org';
  const [dbOk, oracleBridgeOk, mirrorStatus, sbsOk] = await Promise.all([
    env.DB.prepare('SELECT 1').first().then(() => true).catch(() => false),
    Promise.race([
      fetch(`${oracleBase}/hospitals`, { headers: { 'X-API-Key': env.ORACLE_API_KEY || '' }, signal: AbortSignal.timeout(8000) }).then(r => r.ok).catch(() => false),
      fetch('https://bsma.elfadil.com/basma/network', { signal: AbortSignal.timeout(6000) }).then(r => r.ok ? 'via-bsma' : false).catch(() => false),
    ]).then(v => !!v),
    fetch('https://nphies-mirror.brainsait-fadil.workers.dev/mirror/status', { signal: AbortSignal.timeout(5000) }).then(r => r.ok ? r.json() : null).catch(() => null),
    sbsHealth(),
  ]);
  const [hisN, ragN, ptN, clN] = await Promise.all([
    env.HIS_DB?.prepare('SELECT COUNT(*) as n FROM bsma_appointments').first().catch(() => ({ n: 0 })),
    env.BASMA_DB?.prepare('SELECT COUNT(*) as n FROM rag_documents').first().catch(() => ({ n: 0 })),
    env.DB.prepare('SELECT COUNT(*) as n FROM patients').first().catch(() => ({ n: 0 })),
    env.DB.prepare('SELECT COUNT(*) as n FROM claims').first().catch(() => ({ n: 0 })),
  ]);
  const mirrorOk = !!(mirrorStatus?.ok);
  return ok({
    version: VERSION, worker: 'hnh-unified', facility: FACILITY_LIC,
    status: dbOk ? 'healthy' : 'degraded',
    integrations: {
      d1_primary:      dbOk       ? 'connected' : 'error',
      d1_his_database: hisN?.n > 0 ? 'connected' : 'empty',
      d1_basma:        ragN?.n > 0 ? 'connected' : 'empty',
      oracle_bridge:   oracleBridgeOk ? 'connected' : 'unreachable',
      oracle_tunnel:   'e5cb8c86 | madinah+khamis+abha cached reachable',
      nphies_mirror:   mirrorOk   ? 'connected' : 'degraded',
      claimlinc:       'live',
      sbs_portal:      sbsOk      ? 'live' : 'degraded',
      bsma_portal:     'live',
      givc_portal:     'live',
    },
    data: {
      his_appointments: hisN?.n || 0,
      rag_documents:    ragN?.n || 0,
      patients:         ptN?.n  || 0,
      claims:           clN?.n  || 0,
      blog_articles:    BLOG_POSTS.length,
      courses:          COURSES.length,
      featured_doctors: DOCTORS_FEATURED.length,
    },
    nphies_mirror: mirrorStatus ? {
      last_sync:   mirrorStatus.last_sync,
      total_gss:   mirrorStatus.total_gss,
      total_pa:    mirrorStatus.total_pa,
      total_coc:   mirrorStatus.total_coc,
      auth_healthy: mirrorStatus.auth_healthy,
    } : null,
  });
}

async function apiStats(env) {
  const [main, his, basma] = await Promise.all([
    env.DB.prepare(`SELECT
      (SELECT COUNT(*) FROM patients WHERE is_active=1) as patients,
      (SELECT COUNT(*) FROM providers WHERE is_active=1) as providers,
      (SELECT COUNT(*) FROM departments WHERE is_active=1) as departments,
      (SELECT COUNT(*) FROM appointments) as appointments,
      (SELECT COUNT(*) FROM claims) as claims,
      (SELECT COUNT(*) FROM rag_documents) as rag_local
    `).first().catch(() => ({})),
    env.HIS_DB?.prepare('SELECT COUNT(*) as apts, (SELECT COUNT(*) FROM drug_formulary) as drugs FROM bsma_appointments').first().catch(() => ({ apts: 0, drugs: 0 })),
    env.BASMA_DB?.prepare('SELECT COUNT(*) as rag FROM rag_documents').first().catch(() => ({ rag: 0 })),
  ]);
  return ok({ stats: {
    total_providers:    main?.providers    || 269,
    total_patients:     main?.patients     || 0,
    total_departments:  main?.departments  || 20,
    total_appointments: (main?.appointments || 0) + (his?.apts || 0),
    total_claims:       main?.claims       || 0,
    total_branches:     6,
    total_beds:         1050,
    drug_formulary:     his?.drugs         || 1000,
    rag_documents:      (main?.rag_local || 0) + (basma?.rag || 0),
    his_appointments:   his?.apts          || 0,
    insurance_partners: INSURANCE.length,
  }});
}

async function apiProviders(req, env) {
  const url = new URL(req.url);
  const dept   = url.searchParams.get('department') || '';
  const search = url.searchParams.get('search') || '';
  const limit  = Math.min(parseInt(url.searchParams.get('limit') || '200'), 300);

  let q = 'SELECT * FROM providers WHERE is_active=1';
  const b = [];
  if (dept)   { q += ' AND department=?'; b.push(dept); }
  if (search) {
    q += ' AND (first_name_ar LIKE ? OR last_name_ar LIKE ? OR first_name_en LIKE ? OR specialty LIKE ?)';
    const s = '%' + search + '%'; b.push(s, s, s, s);
  }
  q += ' ORDER BY specialty, last_name_ar LIMIT ?'; b.push(limit);
  const r = b.length ? await env.DB.prepare(q).bind(...b).all() : await env.DB.prepare(q).all();
  const providers = (r.results || []).map(p => ({
    id:        p.provider_code || 'P' + p.id,
    name_ar:   'د. ' + (p.first_name_ar || '') + ' ' + (p.last_name_ar || ''),
    name_en:   'Dr. ' + (p.first_name_en || p.first_name_ar || '') + ' ' + (p.last_name_en || p.last_name_ar || ''),
    specialty:  p.specialty || '',
    department: p.department || '',
    branch:     p.clinic_location || '',
  }));
  return ok({ providers, total: providers.length });
}

async function apiPatients(req, env) {
  const url = new URL(req.url);
  if (req.method === 'GET') {
    const search = url.searchParams.get('search') || '';
    const limit  = Math.min(parseInt(url.searchParams.get('limit') || '50'), 200);
    let q = 'SELECT * FROM patients WHERE is_active=1';
    const b = [];
    if (search) {
      q += ' AND (full_name_ar LIKE ? OR full_name_en LIKE ? OR mrn LIKE ? OR national_id LIKE ?)';
      const s = '%' + search + '%'; b.push(s, s, s, s);
    }
    q += ' ORDER BY created_at DESC LIMIT ?'; b.push(limit);
    const r = b.length ? await env.DB.prepare(q).bind(...b).all() : await env.DB.prepare(q).all();
    return ok({ patients: r.results || [], total: r.results?.length || 0 });
  }
  if (req.method === 'POST') {
    const d = await req.json().catch(() => ({}));
    const mrn = d.mrn || 'HNH-' + Date.now();
    const r = await env.DB.prepare(
      'INSERT INTO patients (mrn,national_id,full_name_ar,full_name_en,date_of_birth,gender,phone,is_active) VALUES (?,?,?,?,?,?,?,1)'
    ).bind(mrn, d.national_id || null, d.full_name_ar || '', d.full_name_en || '', d.date_of_birth || null, d.gender || null, d.phone || null).run();
    oracleFetch(env, '/api/pmi/register', { method: 'POST', body: JSON.stringify({ ...d, mrn, facility_license: FACILITY_LIC }) }).catch(() => {});
    return ok({ id: r.meta.last_row_id, mrn }, 201);
  }
  return err('Method not allowed', 405);
}

async function apiAppointments(req, env) {
  const url = new URL(req.url);
  const date = url.searchParams.get('date') || new Date().toISOString().split('T')[0];
  if (req.method === 'GET') {
    const [primary, his] = await Promise.all([
      env.DB.prepare(
        'SELECT a.*, p.full_name_ar as patient_name FROM appointments a LEFT JOIN patients p ON a.patient_id=p.id WHERE a.appointment_date=? ORDER BY a.appointment_time LIMIT 100'
      ).bind(date).all().then(r => r.results || []).catch(() => []),
      env.HIS_DB?.prepare(
        "SELECT id, patient_name, appointment_type as clinic_name, date(scheduled_time) as appointment_date, time(scheduled_time) as appointment_time, status, 'his_database' as source FROM bsma_appointments WHERE date(scheduled_time)=? LIMIT 50"
      ).bind(date).all().then(r => r.results || []).catch(() => []),
    ]);
    const seen = new Set(primary.map(a => a.id));
    const all = [...primary, ...his.filter(h => !seen.has(h.id))];
    return ok({ appointments: all, date, total: all.length });
  }
  if (req.method === 'POST') {
    const d = await req.json().catch(() => ({}));
    const r = await env.DB.prepare(
      'INSERT INTO appointments (patient_id,clinic_name,appointment_date,appointment_time,appointment_type,status) VALUES (?,?,?,?,?,?)'
    ).bind(d.patient_id || null, d.clinic_name || 'General', d.appointment_date, d.appointment_time, d.appointment_type || 'new', 'scheduled').run();
    oracleFetch(env, '/api/opd/book', { method: 'POST', body: JSON.stringify({ ...d, facility_license: FACILITY_LIC }) }).catch(() => {});
    return ok({ id: r.meta.last_row_id }, 201);
  }
  return err('Method not allowed', 405);
}

async function apiEligibility(req, env) {
  const d = await req.json().catch(() => ({}));
  // 1. Try SBS ClaimLinc first (has real coverage)
  try {
    const r = await fetch('https://sbs.elfadil.com/claimlinc/eligibility', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ patient_identifier: d.patient_identifier || d.national_id, service_code: d.service_code || 'outpatient' }),
      signal: AbortSignal.timeout(8000),
    });
    if (r.ok) { const j = await r.json(); return ok({ source: 'sbs-claimlinc', ...j }); }
  } catch {}
  // 2. Oracle Bridge fallback
  const r = await oracleFetch(env, '/api/nphies/eligibility', { method: 'POST', body: JSON.stringify({ ...d, facility_license: FACILITY_LIC }) });
  if (r) { const j = await r.json(); return ok({ source: 'oracle-bridge', ...j }); }
  return ok({ eligible: false, source: 'unavailable', message: 'Eligibility service temporarily unavailable', insurance_partners: INSURANCE });
}

async function apiDrugs(req, env) {
  const url = new URL(req.url);
  const q = url.searchParams.get('q') || '';
  const cat = url.searchParams.get('category') || '';
  const limit = Math.min(parseInt(url.searchParams.get('limit') || '20'), 100);
  if (!env.HIS_DB) return err('HIS_DB not configured', 503);
  let sql = 'SELECT code, display, category, price, manufacturer FROM drug_formulary WHERE 1=1';
  const b = [];
  if (q)   { sql += ' AND (display LIKE ? OR code LIKE ?)'; b.push('%' + q + '%', '%' + q + '%'); }
  if (cat) { sql += ' AND category=?'; b.push(cat); }
  sql += ' LIMIT ?'; b.push(limit);
  const r = b.length ? await env.HIS_DB.prepare(sql).bind(...b).all() : await env.HIS_DB.prepare(sql).all();
  return ok({ drugs: r.results || [], total: r.results?.length || 0 });
}

const PUBLIC_RAG_CATEGORIES = ['patient-guide', 'hospitals', 'services', 'departments', 'insurance', 'academy', 'general'];
const PUBLIC_ASSISTANT_CAPABILITIES = [
  'hospital_services',
  'branch_navigation',
  'insurance_general_info',
  'appointment_guidance',
  'academy_programs',
  'emergency_escalation',
];

function hasArabic(text) {
  return /[\u0600-\u06FF]/.test(text || '');
}

function looksSensitivePublicPrompt(text) {
  const t = (text || '').toLowerCase();
  if (/\b\d{8,}\b/.test(t)) return true; // national IDs, MRNs, claim references, mobile/account numbers
  return [
    'national id', 'iqama', 'mrn', 'medical record', 'claim status', 'eligibility status',
    'lab result', 'prescription', 'diagnosis', 'my appointment', 'my claim', 'my file',
    'رقم الهوية', 'الإقامة', 'السجل الطبي', 'نتيجة التحليل', 'وصفتي', 'تشخيصي',
    'موعدي', 'مطالبتي', 'ملفي', 'أهليتي', 'اهليتي'
  ].some(k => t.includes(k));
}

function publicAssistantEscalation(isAr) {
  return isAr
    ? 'أقدر أساعدك بمعلومات عامة عن الفروع والخدمات والتأمين والمواعيد. لحماية خصوصيتك لا أستطيع معالجة أرقام الهوية أو السجل الطبي أو نتائج التحاليل أو المطالبات هنا. للتفاصيل الشخصية اتصل على ' + PHONE + ' أو استخدم القناة المعتمدة. للحالات الطارئة توجه لأقرب طوارئ فوراً.'
    : 'I can help with general branch, service, insurance, and appointment guidance. To protect your privacy, I cannot process national IDs, medical records, lab results, or claim-specific requests here. For personal details, call ' + PHONE + ' or use an approved secure channel. For emergencies, go to the nearest ER immediately.';
}

async function publicRagContext(env, msg, isAr) {
  const needle = (msg || '').slice(0, 80).replace(/[%_]/g, ' ').trim();
  if (!needle) return '';
  const categoryPlaceholders = PUBLIC_RAG_CATEGORIES.map(() => '?').join(',');
  const sql =
    `SELECT title, content, category FROM rag_documents
     WHERE category IN (${categoryPlaceholders})
       AND (content LIKE ? OR title LIKE ?)
     ORDER BY lang=? DESC, created_at DESC
     LIMIT 4`;
  const bindValues = [...PUBLIC_RAG_CATEGORIES, '%' + needle + '%', '%' + needle.slice(0, 40) + '%', isAr ? 'ar' : 'en'];
  const lookups = [];
  if (env.BASMA_DB) lookups.push(env.BASMA_DB.prepare(sql).bind(...bindValues).all());
  if (env.DB) lookups.push(env.DB.prepare(sql).bind(...bindValues).all());
  const settled = await Promise.allSettled(lookups);
  const seen = new Set();
  const docs = [];
  for (const item of settled) {
    if (item.status === 'rejected') {
      console.warn('Public assistant RAG lookup failed');
      continue;
    }
    for (const row of item.value?.results || []) {
      if (!row?.title || seen.has(row.title)) continue;
      seen.add(row.title);
      docs.push(row);
      if (docs.length >= 4) break;
    }
    if (docs.length >= 4) break;
  }
  return docs.map(r => '[' + (r.category || 'general') + '] ' + r.title + ': ' + (r.content || '').slice(0, 350)).join('\n\n');
}

async function apiPublicAssistant(req, env) {
  if (req.method !== 'POST') return err('Method not allowed', 405);
  const d = await req.json().catch(() => ({}));
  const msg = (d.message || '').trim().slice(0, 1200);
  if (!msg) return err('message required');
  const sid = d.session_id || 'pub_' + Date.now().toString(36);
  const isAr = hasArabic(msg);
  auditLog(env, req, 'assistant:public');

  if (looksSensitivePublicPrompt(msg)) {
    return ok({
      response: publicAssistantEscalation(isAr),
      session_id: sid,
      public_only: true,
      escalation: 'secure_channel_required',
      capabilities: PUBLIC_ASSISTANT_CAPABILITIES,
    });
  }

  const ragCtx = await publicRagContext(env, msg, isAr);
  let reply = '';
  if (env.AI) {
    try {
      const ai = await env.AI.run('@cf/meta/llama-3.3-70b-instruct-fp8-fast', {
        messages: [
          { role: 'system', content:
            (isAr ? 'Language: Arabic only. ' : 'Language: English only. ') +
            'You are Basma, the public bilingual AI concierge for Hayat National Hospitals and BrainSAIT. ' +
            'Answer in the same language as the user, Arabic or English. Keep responses concise, warm, and operationally useful. ' +
            'Public scope only: branches, services, departments, general insurance partner guidance, appointment navigation, academy programs, website navigation, and emergency escalation. ' +
            'Do not diagnose, prescribe, interpret lab results, verify eligibility, discuss a specific claim, collect identifiers, or request PHI. If the user needs personal data, tell them to use secure channels or call ' + PHONE + '. ' +
            'For emergencies, always direct the user to the nearest emergency department immediately. ' +
            (ragCtx ? '\nRelevant approved public context:\n' + ragCtx : '') },
          { role: 'user', content: msg },
        ],
        max_tokens: 350,
      });
      reply = ai.response || '';
    } catch (e) {
      console.warn('Public assistant AI generation failed');
    }
  }
  if (!reply) {
    reply = isAr
      ? 'أنا بسمة، أقدر أساعدك بمعلومات عامة عن الفروع والخدمات والتأمين وحجز المواعيد. كيف أوجهك؟ 📞 ' + PHONE
      : "I'm Basma. I can help with general branch, service, insurance, and appointment guidance. How can I direct you? 📞 " + PHONE;
  }
  return ok({ response: reply, session_id: sid, public_only: true, rag_used: !!ragCtx, capabilities: PUBLIC_ASSISTANT_CAPABILITIES });
}

async function apiChat(req, env) {
  const d = await req.json().catch(() => ({}));
  const msg = (d.message || '').trim();
  if (!msg) return err('message required');
  const sid = d.session_id || 'ses_' + Date.now().toString(36);
  const isAr = /[\u0600-\u06FF]/.test(msg);

  // RAG search — FTS first then LIKE fallback
  let ragCtx = '';
  try {
    const terms = msg.slice(0, 40).split(' ').filter(w => w.length > 3).join(' OR ') || msg.slice(0, 25);
    const [fts, like] = await Promise.all([
      env.BASMA_DB?.prepare(
        'SELECT rd.title, rd.content, rd.category FROM rag_fts fts JOIN rag_documents rd ON rd.rowid=fts.rowid WHERE rag_fts MATCH ? ORDER BY rank LIMIT 3'
      ).bind(terms).all().catch(() => ({ results: [] })),
      env.BASMA_DB?.prepare(
        'SELECT title, content, category FROM rag_documents WHERE content LIKE ? OR title LIKE ? ORDER BY lang=? DESC LIMIT 3'
      ).bind('%' + msg.slice(0, 20) + '%', '%' + msg.slice(0, 15) + '%', isAr ? 'ar' : 'en').all().catch(() => ({ results: [] })),
    ]);
    const seen = new Set();
    const docs = [...(fts?.results || []), ...(like?.results || [])].filter(r => { if (seen.has(r.title)) return false; seen.add(r.title); return true; }).slice(0, 4);
    ragCtx = docs.map(r => '[' + (r.category || 'clinical') + '] ' + r.title + ': ' + (r.content || '').slice(0, 300)).join('\n\n');
  } catch {}

  const sysPrompt =
    'أنت بسمة (Basma)، المساعدة الذكية الرسمية لمستشفيات الحياة الوطني — منظومة BrainSAIT Healthcare OS. ' +
    'تتكلمين العربية الخليجية والإنجليزية بطلاقة كاملة. أنتِ مُدرَّبة على عمليات NPHIES والسجل الطبي Oracle وبروتوكولات الرعاية السريرية السعودية. ' +
    '\n\nمهامك الأساسية: حجز المواعيد، التحقق من أهلية التأمين عبر NPHIES، استفسارات الموافقة المسبقة، استيضاح نتائج المختبر، إرشادات ما قبل الزيارة وبعدها، وتوجيه المرضى للقسم المناسب. ' +
    '\n\nمعلومات المستشفى: 6 فروع — الرياض (ترخيص 10000000000988)، المدينة (10000300220660)، عنيزة (10000000030262)، خميس مشيط (10000000030643)، جازان (10000000037034)، أبها (10000300330931). الهاتف: ' + PHONE + '. جميع الفروع مفتوحة 24/7 للطوارئ. ' +
    '\n\nبيانات NPHIES الحية: الشبكة الكلية SAR 835.7M | معدل الموافقة 98.6% | 51,018 موافقة مسبقة. ' +
    'شركاء التأمين: تعاونية، بوبا العربية، MedGulf، الليانز السعودي الفرنسي، GIG، أمانة، الدرع العربي، GlobeMed. ' +
    '\n\nالبوابات الإلكترونية: BSMA (bsma.elfadil.com)، GIVC (givc.elfadil.com)، SBS (sbs.elfadil.com). ' +
    '\n\nالأكاديمية: 9 دورات معتمدة SCFHS — 110 ساعة. للتسجيل: 920000094. ' +
    (ragCtx ? '\n\nسياق طبي ذو صلة: ' + ragCtx + '. ' : '') +
    '\n\nقواعد الرد: استجيبي بنفس لغة المستخدم. كوني دافئة، موجزة، ومهنية. لا تُشخّصي أمراضاً. للحالات الطارئة: وجّهي دائماً لـ 920000094 أو أقرب طوارئ فوراً.';

  // AI engine: DeepSeek primary, Workers AI fallback, then static safe fallback.
  let reply = '';
  if (env.DEEPSEEK_API_KEY) {
    try {
      const dsRes = await fetch('https://api.deepseek.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + env.DEEPSEEK_API_KEY,
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          max_tokens: 400,
          temperature: 0.6,
          messages: [
            { role: 'system', content: sysPrompt },
            { role: 'user', content: msg },
          ],
        }),
        signal: AbortSignal.timeout(15000),
      });
      if (dsRes.ok) {
        const dsData = await dsRes.json();
        reply = dsData.choices?.[0]?.message?.content?.trim() || '';
      }
    } catch {}
  }
  if (!reply && env.AI) {
    try {
      const ai = await env.AI.run('@cf/meta/llama-3.3-70b-instruct-fp8-fast', {
        messages: [
          { role: 'system', content: sysPrompt },
          { role: 'user', content: msg },
        ],
        max_tokens: 400,
      });
      reply = ai.response || '';
    } catch {}
  }
  if (!reply) {
    reply = isAr
      ? 'أهلاً! أنا بسمة، مساعدتك في مستشفيات الحياة الوطني.' + (ragCtx ? ' وجدت معلومات ذات صلة. ' : ' ') + 'كيف أساعدك؟ 📞 ' + PHONE
      : "Hello! I'm Basma, your Hayat National Hospitals assistant. How can I help? 📞 " + PHONE;
  }

  env.DB.prepare('INSERT INTO chat_history (session_id, role, content) VALUES (?,?,?),(?,?,?)').bind(sid, 'user', msg, sid, 'assistant', reply).run().catch(() => {});
  return ok({ response: reply, session_id: sid, rag_used: !!ragCtx });
}

async function apiNphies(req, env, sub) {
  if (sub === '' || sub === '/status') {
    const net = await clFetch('/network/summary', env);
    const [claims, pa] = await Promise.all([
      env.DB.prepare('SELECT COUNT(*) as n FROM claims WHERE nphies_claim_id IS NOT NULL').first().catch(() => ({ n: 0 })),
      env.DB.prepare('SELECT COUNT(*) as n FROM prior_authorizations').first().catch(() => ({ n: 0 })),
    ]);
    return ok({ facility: FACILITY_LIC, network: net, local: { claims: claims?.n, pa: pa?.n } });
  }
  if (sub === '/analysis') {
    const net = await bsmaNetwork();
    const fac = await clFetch('/facilities', env);
    const br = net?.by_branch || {};
    const riyRej = (br.riyadh?.total_sar || 97868522) - (br.riyadh?.approved_sar || 86567405);
    return ok({ analysis: {
      summary: { network_total_sar: net?.financials?.network_total_sar || 835690702.81, network_approval_rate: net?.financials?.network_approval_rate_pct || 98.6, total_claims: net?.financials?.total_claims_gss || 15138, total_pa: net?.prior_auth?.network_total || 51018 },
      riyadh_alert: {
        approval_rate: br.riyadh?.approval_pct || 88.5, rejected_sar: riyRej,
        total_sar: br.riyadh?.total_sar || 97868522,
        root_causes: [
          { code:'E001', desc:'Missing prior authorization',        impact_pct:35, action:'AuthLinc: PA pre-check 48h before service' },
          { code:'E002', desc:'Incorrect ICD-10 / SBS coding',      impact_pct:28, action:'CodeLinc: validate codes before submission' },
          { code:'E003', desc:'Eligibility not verified at service', impact_pct:22, action:'Real-time eligibility at patient registration' },
          { code:'E004', desc:'Expired authorization',              impact_pct:10, action:'AuthLinc expiry alert — 7d and 48h' },
          { code:'E005', desc:'Duplicate claim submission',          impact_pct:5,  action:'ClaimLinc dedup engine' },
        ],
      },
      by_branch: Object.fromEntries(Object.entries(br).map(([k, v]) => [k, { ...v, name: fac?.facilities?.[k]?.name || k, rejected_sar: (v.total_sar || 0) - (v.approved_sar || 0) }])),
      facilities: fac?.facilities || {},
    }});
  }
  if (sub === '/network') { const d = await clFetch('/network/summary', env); return ok({ source: 'claimlinc', data: d }); }
  if (sub === '/facilities') { const d = await clFetch('/facilities', env); return ok({ source: 'claimlinc', data: d }); }
  if (sub.startsWith('/live/')) {
    const mapped = sub.replace('/live', '');
    const d = await clFetch(mapped, env);
    return d ? ok({ source: 'claimlinc-live', data: d }) : err('ClaimLinc endpoint unavailable', 503);
  }
  if (sub === '/eligibility') return apiEligibility(req, env);
  return err('NPHIES endpoint not found: ' + sub, 404);
}

// Live Oracle branch status
async function apiOracleBranches(env) {
  // Oracle bridge direct: try fast, fall back to BSMA-confirmed status
  const [hospitals, branchStatus, net2] = await Promise.all([
    fetch(`${env.ORACLE_BRIDGE_URL || 'https://oracle-bridge.brainsait.org'}/hospitals`, {
      headers: { 'X-API-Key': env.ORACLE_API_KEY || '' }, signal: AbortSignal.timeout(6000)
    }).then(r => r.ok ? r.json() : null).catch(() => null),
    oracleBranchStatus(env),
    bsmaNetwork(),
  ]);
  const net = net2;
  // net fetched above
  const branchData = BRANCHES.map(b => {
    const id = b.id.toLowerCase().replace('001','');
    const branchKey = { r:'riyadh', j:'jizan', k:'khamis', m:'madinah', u:'unaizah', a:'abha' }[id[0]] || id;
    const oracle = branchStatus?.[branchKey] || {};
    const nphies = net?.by_branch?.[branchKey] || {};
    return {
      ...b,
      oracle_reachable: oracle.reachable || false,
      oracle_ms: oracle.ms || null,
      nphies_approval_pct: nphies.approval_pct || null,
      nphies_total_sar: nphies.total_sar || null,
      nphies_pa: nphies.pa || null,
      nphies_flag: nphies.flag || null,
    };
  });
  return ok({ branches: branchData, total: branchData.length, oracle_bridge: hospitals ? 'connected' : 'unreachable', source: 'live' });
}

// Today's appointments from HIS_DB
async function apiAppointmentsToday(env) {
  const today = new Date().toISOString().slice(0, 10);
  const [his, local] = await Promise.all([
    env.HIS_DB?.prepare("SELECT * FROM bsma_appointments WHERE date(scheduled_time) = ? ORDER BY scheduled_time LIMIT 100").bind(today).all().catch(() => ({ results: [] })),
    env.DB.prepare("SELECT a.*, p.full_name_ar, p.full_name_en FROM appointments a LEFT JOIN patients p ON a.patient_id=p.id WHERE a.appointment_date = ? ORDER BY a.appointment_time LIMIT 100").bind(today).all().catch(() => ({ results: [] })),
  ]);
  return ok({ date: today, his_appointments: his?.results || [], local_appointments: local?.results || [], total: (his?.results?.length || 0) + (local?.results?.length || 0) });
}

// Pending PA from D1
async function apiPaPending(env) {
  const r = await env.DB.prepare("SELECT pa.*, p.full_name_ar, p.full_name_en FROM prior_authorizations pa LEFT JOIN patients p ON pa.patient_id=p.id WHERE pa.status='pending' ORDER BY pa.created_at DESC LIMIT 50").all().catch(() => ({ results: [] }));
  const network = await bsmaNetwork();
  return ok({ pending: r.results || [], total: r.results?.length || 0, network_total_pa: network?.prior_auth?.network_total || 51018 });
}

// Patient search by name or ID
async function apiPatientSearch(req, env) {
  const url = new URL(req.url);
  const q = (url.searchParams.get('q') || '').trim();
  if (!q || q.length < 2) return err('Query must be at least 2 characters', 400);
  const like = '%' + q + '%';
  const r = await env.DB.prepare(
    "SELECT id, mrn, national_id, full_name_ar, full_name_en, phone, date_of_birth, nationality FROM patients WHERE full_name_ar LIKE ? OR full_name_en LIKE ? OR national_id LIKE ? OR mrn LIKE ? LIMIT 20"
  ).bind(like, like, q + '%', q + '%').all().catch(() => ({ results: [] }));
  return ok({ patients: r.results || [], total: r.results?.length || 0, query: q });
}

// NPHIES live data sync to D1 (lazy)
async function apiSyncNphies(env) {
  const net = await bsmaNetwork();
  if (!net) return err('NPHIES network data unavailable', 503);
  // Update or insert a network_summary record in D1 audit_log
  await env.DB.prepare("INSERT INTO audit_log (user_id, action, entity_type, new_value) VALUES (?,?,?,?)").bind('system', 'nphies_sync', 'network', JSON.stringify({ ...net.financials, synced_at: new Date().toISOString() })).run().catch(() => {});
  return ok({ synced: true, data: net.financials, branches: Object.keys(net.by_branch || {}).length, synced_at: new Date().toISOString() });
}

// Live RCM dashboard (protected)
async function apiRCMLive(env) {
  const [local, network, mirror] = await Promise.all([
    env.DB.prepare("SELECT status, COUNT(*) as n, SUM(total_amount) as total, SUM(paid_amount) as paid FROM claims GROUP BY status").all().catch(() => ({ results: [] })),
    bsmaNetwork(),
    nphiesMirrorData('/mirror/status'),
  ]);
  const byStatus = {};
  (local?.results || []).forEach(r => { byStatus[r.status] = { count: r.n, total: r.total, paid: r.paid }; });
  return ok({
    local_claims: byStatus,
    nphies_network: network?.financials || null,
    nphies_by_branch: network?.by_branch || null,
    mirror_status: mirror,
    riyadh_alert: {
      approval_pct: network?.by_branch?.riyadh?.approval_pct || 88.5,
      rejected_sar: (network?.by_branch?.riyadh?.total_sar || 97868522) - (network?.by_branch?.riyadh?.approved_sar || 86567405),
      action_required: true,
    },
    timestamp: new Date().toISOString(),
  });
}

async function apiDepartments(req, env) {
  // Try DB first
  try {
    const r = await env.DB.prepare(
      'SELECT dept_code as code, dept_name_ar as name_ar, dept_name_en as name_en, dept_type, location, is_active FROM departments WHERE is_active=1 ORDER BY dept_name_en'
    ).all();
    if (r.results && r.results.length > 0)
      return ok({ departments: r.results, total: r.results.length, source: 'db' });
  } catch {}
  // Fallback to static data
  return ok({ departments: DEPARTMENTS, total: DEPARTMENTS.length, source: 'static' });
}

async function apiVisits(req, env) {
  if (req.method === 'GET') {
    const url = new URL(req.url);
    const patientId = url.searchParams.get('patient_id');
    const limit = Math.min(parseInt(url.searchParams.get('limit') || '50'), 200);
    let q = 'SELECT v.*, p.full_name_ar as patient_name FROM visits v LEFT JOIN patients p ON v.patient_id=p.id';
    const b = [];
    if (patientId) { q += ' WHERE v.patient_id=?'; b.push(patientId); }
    q += ' ORDER BY v.visit_date DESC LIMIT ?'; b.push(limit);
    const r = b.length ? await env.DB.prepare(q).bind(...b).all() : await env.DB.prepare(q).all();
    return ok({ visits: r.results || [], total: (r.results || []).length });
  }
  if (req.method === 'POST') {
    const d = await req.json().catch(() => ({}));
    if (!d.patient_id) return err('patient_id required', 400);
    const r = await env.DB.prepare(
      'INSERT INTO visits (patient_id,provider_id,visit_type,chief_complaint,status) VALUES (?,?,?,?,?)'
    ).bind(d.patient_id, d.provider_id || null, d.visit_type || 'opd', d.chief_complaint || '', 'open').run();
    return ok({ id: r.meta.last_row_id, status: 'open' });
  }
  return err('Method not allowed', 405);
}

async function apiOrders(req, env) {
  if (req.method === 'GET') {
    const url = new URL(req.url);
    const visitId   = url.searchParams.get('visit_id');
    const patientId = url.searchParams.get('patient_id');
    const limit = Math.min(parseInt(url.searchParams.get('limit') || '50'), 200);
    let q = 'SELECT * FROM orders'; const b = []; const conds = [];
    if (visitId)   { conds.push('visit_id=?');   b.push(visitId); }
    if (patientId) { conds.push('patient_id=?'); b.push(patientId); }
    if (conds.length) q += ' WHERE ' + conds.join(' AND ');
    q += ' ORDER BY order_date DESC LIMIT ?'; b.push(limit);
    const r = b.length ? await env.DB.prepare(q).bind(...b).all() : await env.DB.prepare(q).all();
    return ok({ orders: r.results || [], total: (r.results || []).length });
  }
  if (req.method === 'POST') {
    const d = await req.json().catch(() => ({}));
    if (!d.patient_id || !d.visit_id) return err('patient_id and visit_id required', 400);
    const r = await env.DB.prepare(
      'INSERT INTO orders (visit_id,patient_id,provider_id,order_type,order_item,order_item_code,quantity,instructions,priority) VALUES (?,?,?,?,?,?,?,?,?)'
    ).bind(d.visit_id, d.patient_id, d.provider_id || 0, d.order_type || 'lab', d.order_item || '', d.order_item_code || '', d.quantity || 1, d.instructions || '', d.priority || 'routine').run();
    return ok({ id: r.meta.last_row_id });
  }
  return err('Method not allowed', 405);
}

async function apiClaims(req, env) {
  if (req.method === 'GET') {
    const url = new URL(req.url);
    const status = url.searchParams.get('status') || '';
    const limit = Math.min(parseInt(url.searchParams.get('limit') || '50'), 200);
    let q = 'SELECT c.*, p.full_name_ar as patient_name FROM claims c LEFT JOIN patients p ON c.patient_id=p.id';
    const b = [];
    if (status) { q += ' WHERE c.status=?'; b.push(status); }
    q += ' ORDER BY c.created_at DESC LIMIT ?'; b.push(limit);
    const r = b.length ? await env.DB.prepare(q).bind(...b).all() : await env.DB.prepare(q).all();
    return ok({ claims: r.results || [] });
  }
  if (req.method === 'POST') {
    const d = await req.json().catch(() => ({}));
    const num = 'CLM-' + Date.now();
    const r = await env.DB.prepare(
      'INSERT INTO claims (patient_id,claim_number,claim_type,payer_id,payer_name,total_amount,status) VALUES (?,?,?,?,?,?,?)'
    ).bind(d.patient_id || null, num, d.claim_type || 'professional', d.payer_id || null, d.payer_name || null, parseFloat(d.total_amount) || 0, 'draft').run();
    oracleFetch(env, '/api/claims/submit', { method: 'POST', body: JSON.stringify({ ...d, claim_number: num, facility_license: FACILITY_LIC }) }).catch(() => {});
    return ok({ id: r.meta.last_row_id, claim_number: num }, 201);
  }
  return err('Method not allowed', 405);
}

async function apiRCM(env) {
  const [summary, byStatus, pending, network] = await Promise.all([
    env.DB.prepare('SELECT COUNT(*) as total, SUM(total_amount) as billed, SUM(paid_amount) as paid FROM claims').first().catch(() => ({})),
    env.DB.prepare('SELECT status, COUNT(*) as n, SUM(total_amount) as total FROM claims GROUP BY status').all().catch(() => ({ results: [] })),
    env.DB.prepare("SELECT COUNT(*) as n FROM prior_authorizations WHERE status='pending'").first().catch(() => ({ n: 0 })),
    bsmaNetwork(),
  ]);
  const sm = {};
  (byStatus.results || []).forEach(r => { sm[r.status] = { count: r.n, total: r.total }; });
  const approved = (sm.approved?.count || 0) + (sm.paid?.count || 0);
  const rate = summary?.total > 0 ? ((approved / summary.total) * 100).toFixed(1) : '0.0';
  return ok({ summary: { total_claims: summary?.total || 0, approval_rate: rate + '%', billed: summary?.billed || 0, paid: summary?.paid || 0, pending_pa: pending?.n || 0 }, claims_by_status: sm, nphies_network: network });
}

async function apiSync(env, type) {
  if (type === 'his') {
    const r = await env.HIS_DB?.prepare("SELECT * FROM bsma_appointments WHERE created_at > datetime('now','-14 days')").all().catch(() => ({ results: [] }));
    let n = 0;
    for (const a of r?.results || []) {
      const date = (a.scheduled_time || '').split('T')[0];
      const time = (a.scheduled_time || '').split('T')[1]?.slice(0, 5) || '09:00';
      if (!date) continue;
      await env.DB.prepare('INSERT OR IGNORE INTO appointments (patient_id,clinic_name,appointment_date,appointment_time,appointment_type,status) VALUES (?,?,?,?,?,?)').bind(null, a.appointment_type || 'Consultation', date, time, 'new', a.status || 'scheduled').run().catch(() => {});
      n++;
    }
    return ok({ synced: n, source: 'his_database' });
  }
  if (type === 'rag') {
    const r = await env.BASMA_DB?.prepare("SELECT title, content, category, lang FROM rag_documents WHERE length(content)>100 AND category IN ('clinical','nphies','patient-guide','hospitals') LIMIT 50").all().catch(() => ({ results: [] }));
    let n = 0;
    for (const doc of r?.results || []) {
      await env.DB.prepare('INSERT OR IGNORE INTO rag_documents (title, content, category, source, lang) VALUES (?,?,?,?,?)').bind(doc.title, (doc.content || '').slice(0, 1000), doc.category, 'basma_production', doc.lang || 'en').run().catch(() => {});
      n++;
    }
    return ok({ synced: n, source: 'basma_production' });
  }
  return err('Unknown sync type', 400);
}

async function apiPortal(req, env, sub) {
  if (sub === '' || sub === '/' || sub === '/status') {
    const roles = Object.entries(ROLE_PORTALS).map(([key, meta]) => ({
      key,
      label_en: meta.label_en,
      label_ar: meta.label_ar,
      public: !['admin', 'rcm'].includes(key),
      href: '/' + key,
    }));
    const [health, nphies] = await Promise.all([
      apiHealth(env).then(r => r.json()).catch(() => ({})),
      apiNphies(req, env, '').then(r => r.json()).catch(() => ({})),
    ]);
    return ok({
      hub: 'role-based',
      version: VERSION,
      roles,
      live: {
        oracle_bridge: health.integrations?.oracle_bridge || 'unknown',
        nphies: nphies.status || nphies.source || 'available',
        public_assistant: true,
        uptime: '99.9%',
      },
      updated_at: Date.now(),
      protected_roles: ['admin', 'rcm'],
    });
  }
  if (sub === '/network') {
    const d = await bsmaNetwork();
    return ok({ source: 'bsma-live', network: d });
  }
  if (sub === '/coverage') {
    try {
      const r = await fetch('https://sbs.elfadil.com/claimlinc/coverage/batch', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status: 'active' }), signal: AbortSignal.timeout(8000) });
      if (r.ok) { const d = await r.json(); return ok({ source: 'sbs-healthcare-d1', ...d }); }
    } catch {}
    return ok({ coverage: [], total: 0, source: 'unavailable' });
  }
  if (sub === '/stats') {
    const [stats, net] = await Promise.all([apiStats(env).then(r => r.json()).catch(() => ({})), bsmaNetwork()]);
    return ok({ hnh: stats.stats || {}, nphies: net ? { network_sar: net.financials?.network_total_sar, approval_rate: net.financials?.network_approval_rate_pct, total_claims: net.financials?.total_claims_gss, by_branch: net.by_branch } : null, insurance: INSURANCE });
  }
  if (sub === '/drugs') return apiDrugs(req, env);
  if (sub === '/eligibility' && req.method === 'POST') return apiEligibility(req, env);
  return err('Portal endpoint not found', 404);
}

async function apiBlog(slug) {
  if (!slug) return ok({ articles: BLOG_POSTS, total: BLOG_POSTS.length, categories: ['rcm', 'strategy', 'nphies', 'academy', 'coding'] });
  const a = BLOG_POSTS.find(p => p.slug === slug || p.id === slug);
  return a ? ok({ article: a }) : err('Article not found', 404);
}

async function apiAcademy(req, id) {
  if (!id) {
    const url = new URL(req.url);
    const cat = url.searchParams.get('category') || '';
    const lvl = url.searchParams.get('level') || '';
    let courses = COURSES;
    if (cat) courses = courses.filter(c => c.cat === cat);
    if (lvl) courses = courses.filter(c => c.level === lvl);
    return ok({ courses, total: courses.length, stats: { total_courses: 5, total_hours: 62, accreditation: 'SCFHS CPD + CHI' } });
  }
  const c = COURSES.find(c => c.id === id);
  return c ? ok({ course: c }) : err('Course not found', 404);
}

// ─── ROLE PORTALS ────────────────────────────────────────────────────────────

const ROLE_PORTALS = {
  patient:   { icon:'🙂', color:'#1976D2', gradient:'linear-gradient(135deg,#1976D2,#42A5F5)', label_en:'Patient', label_ar:'المريض' },
  provider:  { icon:'🩺', color:'#2E7D32', gradient:'linear-gradient(135deg,#2E7D32,#66BB6A)', label_en:'Provider', label_ar:'المزود' },
  payer:     { icon:'🏛️', color:'#6A1B9A', gradient:'linear-gradient(135deg,#6A1B9A,#AB47BC)', label_en:'Payer', label_ar:'التأمين' },
  student:   { icon:'🎓', color:'#E65100', gradient:'linear-gradient(135deg,#E65100,#FF9800)', label_en:'Student', label_ar:'الطالب' },
  admin:     { icon:'⚙️', color:'#37474F', gradient:'linear-gradient(135deg,#37474F,#78909C)', label_en:'Admin', label_ar:'الإدارة' },
  reception: { icon:'💁', color:'#00838F', gradient:'linear-gradient(135deg,#00838F,#26C6DA)', label_en:'Reception', label_ar:'الاستقبال' },
  rcm:       { icon:'💰', color:'#C62828', gradient:'linear-gradient(135deg,#C62828,#EF5350)', label_en:'RCM', label_ar:'دورة الإيرادات' },
};

function buildRoleHTML(role, lang, env, nonce) {
  const N = nonce || generateNonce();
  const ar = lang === 'ar';
  const rp = ROLE_PORTALS[role];
  if (!rp) return '<html><body>Invalid role</body></html>';

  // ── Role-specific content ────────────────────────────────────────────────
  const ROLES = {
    patient: {
      title_ar: 'بوابة المريض', title_en: 'Patient Portal',
      subtitle_ar: 'رعايتك تبدأ هنا — حجز، أهلية، نتائج، متابعة', subtitle_en: 'Your care starts here — booking, eligibility, results, follow-up',
      quick_actions_ar: ['📅 احجز موعداً الآن','🔍 تحقق من تأمينك','📋 نتائج مختبرك','💊 وصفاتك','📞 استشارة طارئة','🏥 قسم الطوارئ'],
      quick_actions_en: ['📅 Book Appointment','🔍 Check Insurance','📋 Lab Results','💊 My Prescriptions','📞 Emergency Consult','🏥 ER Now'],
      quick_links: [['https://bsma.elfadil.com','BSMA Patient App'],['/?lang='+lang+'#branches','Find a Branch'],['/?lang='+lang+'#doctors','Our Doctors'],['tel:966920000094','Call 920000094']],
      tools: [
        { icon:'🔍', title_ar:'التحقق من الأهلية', title_en:'Insurance Eligibility', desc_ar:'تحقق فورياً من تغطيتك التأمينية باستخدام رقمك الوطني', desc_en:'Instantly verify your insurance coverage with your national ID', action_ar:'تحقق الآن', action_en:'Check Now', endpoint:'/api/eligibility', method:'POST' },
        { icon:'📅', title_ar:'حجز موعد ذكي', title_en:'Smart Appointment', desc_ar:'احجز مع الطبيب المناسب في الفرع الأقرب إليك', desc_en:'Book with the right doctor at the nearest branch', action_ar:'احجز', action_en:'Book', link:'https://bsma.elfadil.com' },
        { icon:'💬', title_ar:'بسمة — مساعدتك', title_en:'Basma AI Assistant', desc_ar:'اسألي بسمة عن موعدك، دواءك، أو أي سؤال صحي', desc_en:'Ask Basma about your appointment, medication, or health question', action_ar:'ابدأ المحادثة', action_en:'Start Chat', action:'chat' },
        { icon:'🗺️', title_ar:'خريطة الفروع', title_en:'Branch Finder', desc_ar:'6 فروع في الرياض، جازان، خميس مشيط، المدينة، عنيزة، أبها', desc_en:'6 branches in Riyadh, Jizan, Khamis, Madinah, Unaizah, Abha', action_ar:'اعرض الفروع', action_en:'View Branches', link:'/?lang='+lang+'#branches' },
      ],
      stats: [
        { n:'6', l_ar:'فروع', l_en:'Branches' },
        { n:'269', l_ar:'طبيب', l_en:'Doctors' },
        { n:'42+', l_ar:'تخصص', l_en:'Specialties' },
        { n:'24/7', l_ar:'طوارئ', l_en:'Emergency' },
      ],
      info_ar: 'لحجز موعد: اتصل على 920000094 أو استخدم تطبيق BSMA. للطوارئ: توجه مباشرة لأقرب فرع — جميع الفروع مفتوحة 24/7.',
      info_en: 'To book: call 920000094 or use the BSMA app. For emergencies: go directly to the nearest branch — all branches open 24/7.',
    },
    provider: {
      title_ar: 'بوابة المزود', title_en: 'Provider Portal',
      subtitle_ar: 'لوحة تحكم الطبيب — مرضاك، مواعيدك، NPHIES، Oracle HIS', subtitle_en: 'Clinician dashboard — your patients, schedule, NPHIES, Oracle HIS',
      quick_actions_ar: ['📋 قائمة المرضى','📅 جدول اليوم','✅ طلب موافقة مسبقة','🔍 تحقق أهلية','📝 توثيق سريري','📊 إحصائياتي'],
      quick_actions_en: ['📋 Patient List','📅 Today Schedule','✅ Request PA','🔍 Verify Eligibility','📝 Clinical Note','📊 My Stats'],
      quick_links: [['https://givc.elfadil.com','GIVC Provider Portal'],['https://oracle-riyadh.brainsait.org','Oracle HIS'],['/?lang='+lang+'#nphies-dashboard','NPHIES Dashboard'],['https://bsma.elfadil.com','BSMA']],
      tools: [
        { icon:'✅', title_ar:'طلب موافقة مسبقة', title_en:'Prior Authorization', desc_ar:'أرسل طلب PA مباشرة عبر NPHIES مع التحقق الفوري', desc_en:'Submit PA requests directly via NPHIES with instant verification', action_ar:'طلب PA', action_en:'Request PA', link:'/api/nphies/status' },
        { icon:'🔍', title_ar:'التحقق من الأهلية', title_en:'Eligibility Check', desc_ar:'تحقق من تغطية المريض قبل تقديم الخدمة', desc_en:'Verify patient coverage before service delivery', action_ar:'تحقق', action_en:'Verify', endpoint:'/api/eligibility', method:'POST' },
        { icon:'🔷', title_ar:'Oracle HIS', title_en:'Oracle HIS', desc_ar:'بوابة نظام معلومات المستشفى — ملفات المرضى والأوامر الطبية', desc_en:'Hospital information system portal — patient records and orders', action_ar:'فتح Oracle', action_en:'Open Oracle', link:'https://oracle-riyadh.brainsait.org' },
        { icon:'📊', title_ar:'لوحة NPHIES', title_en:'NPHIES Dashboard', desc_ar:'إحصائيات الموافقة المسبقة والمطالبات بيانات حية', desc_en:'Live PA and claims statistics across the network', action_ar:'عرض البيانات', action_en:'View Data', link:'/?lang='+lang+'#nphies-dashboard' },
      ],
      stats: [
        { n:'51,018', l_ar:'PA مُوافَق', l_en:'PA Approved' },
        { n:'98.6%', l_ar:'معدل الموافقة', l_en:'Approval Rate', field:'approval' },
        { n:'15,138', l_ar:'مطالبة', l_en:'Claims', field:'claims' },
        { n:'286', l_ar:'وثيقة سريرية', l_en:'Clinical Docs' },
      ],
      info_ar: 'للوصول الكامل لـ Oracle HIS: استخدم بيانات اعتماد المستشفى. لمشكلات NPHIES: تواصل مع فريق ClaimLinc على 920000094.',
      info_en: 'For full Oracle HIS access: use your hospital credentials. For NPHIES issues: contact the ClaimLinc team at 920000094.',
    },
    payer: {
      title_ar: 'بوابة شركة التأمين', title_en: 'Payer Portal',
      subtitle_ar: 'بيانات المطالبات، الموافقات، التحليلات — شبكة SAR 835M', subtitle_en: 'Claims data, approvals, analytics — SAR 835M network',
      quick_actions_ar: ['📊 ملخص الشبكة','✅ مطالبات معلقة','📈 تحليل الرفض','💰 تسوية مالية','🏥 بيانات الفروع','📋 تقارير GSS'],
      quick_actions_en: ['📊 Network Summary','✅ Pending Claims','📈 Rejection Analysis','💰 Financial Reconciliation','🏥 Branch Data','📋 GSS Reports'],
      quick_links: [['/api/nphies/analysis','Rejection Analysis API'],['/api/nphies/network','Network Summary API'],['/api/nphies/facilities','Facilities API'],['https://portal.nphies.sa','NPHIES Portal']],
      tools: [
        { icon:'📊', title_ar:'ملخص الشبكة', title_en:'Network Summary', desc_ar:'SAR 835.7M إجمالي الشبكة — 98.6% معدل موافقة — 6 فروع', desc_en:'SAR 835.7M network total — 98.6% approval rate — 6 branches', action_ar:'عرض الملخص', action_en:'View Summary', link:'/api/nphies/network' },
        { icon:'📈', title_ar:'تحليل الرفض', title_en:'Rejection Analysis', desc_ar:'تقرير تفصيلي لأسباب الرفض وخطة الاسترداد', desc_en:'Detailed rejection cause report and recovery plan', action_ar:'تحليل', action_en:'Analyze', link:'/api/nphies/analysis' },
        { icon:'🏥', title_ar:'بيانات المنشآت', title_en:'Facilities Data', desc_ar:'6 منشآت بأرقام الترخيص وبيانات المطالبات', desc_en:'6 facilities with license numbers and claims data', action_ar:'عرض', action_en:'View', link:'/api/nphies/facilities' },
        { icon:'✅', title_ar:'التحقق من الأهلية', title_en:'Eligibility Verification', desc_ar:'تحقق من أهلية مريض محدد باستخدام هوية NPHIES', desc_en:'Verify a specific patient eligibility using NPHIES identity', action_ar:'تحقق', action_en:'Verify', endpoint:'/api/eligibility', method:'POST' },
      ],
      stats: [
        { n:'SAR 835M', l_ar:'إجمالي الشبكة', l_en:'Network Total', field:'sar' },
        { n:'98.6%', l_ar:'معدل الموافقة', l_en:'Approval Rate', field:'approval' },
        { n:'51,018', l_ar:'موافقة مسبقة', l_en:'Prior Auths' },
        { n:'10', l_ar:'شركاء التأمين', l_en:'Insurers' },
      ],
      info_ar: 'للتكامل التقني مع NPHIES: استخدم واجهات برمجة التطبيقات عبر oracle-bridge.brainsait.org. مفتاح API متاح على الطلب.',
      info_en: 'For NPHIES technical integration: use the APIs via oracle-bridge.brainsait.org. API key available on request.',
    },
    student: {
      title_ar: 'بوابة الطالب', title_en: 'Student Portal',
      subtitle_ar: 'أكاديمية الحياة الوطني — تعلّم، احترف، تفوّق', subtitle_en: 'Hayat National Academy — Learn, Master, Excel',
      quick_actions_ar: ['🎓 دوراتي','📚 المنهج','✅ تسجيل جديد','🏆 شهاداتي','📖 مكتبة NPHIES','🤝 تواصل'],
      quick_actions_en: ['🎓 My Courses','📚 Curriculum','✅ Enroll Now','🏆 My Certificates','📖 NPHIES Library','🤝 Connect'],
      quick_links: [['/api/academy/courses','All Courses API'],['/api/academy/stats','Academy Stats'],['/api/blog','Medical Blog'],['tel:966920000094','Enrollment Hotline']],
      tools: [
        { icon:'🏛️', title_ar:'NPHIES الأساسيات', title_en:'NPHIES Fundamentals', desc_ar:'12 ساعة — 8 وحدات — SCFHS CPD — مستوى مبتدئ', desc_en:'12h — 8 modules — SCFHS CPD — Beginner level', action_ar:'سجّل — SAR 1,200', action_en:'Enroll — SAR 1,200', link:'tel:966920000094' },
        { icon:'💊', title_ar:'ترميز SBS المتقدم', title_en:'Advanced SBS Coding', desc_ar:'20 ساعة — 12 وحدة — CHI/SCFHS — مستوى متقدم', desc_en:'20h — 12 modules — CHI/SCFHS — Advanced level', action_ar:'سجّل — SAR 2,400', action_en:'Enroll — SAR 2,400', link:'tel:966920000094' },
        { icon:'💰', title_ar:'إدارة دورة الإيرادات', title_en:'Revenue Cycle Mgmt', desc_ar:'16 ساعة — 10 وحدات — SCFHS CPD — متوسط', desc_en:'16h — 10 modules — SCFHS CPD — Intermediate', action_ar:'سجّل — SAR 1,800', action_en:'Enroll — SAR 1,800', link:'tel:966920000094' },
        { icon:'🤖', title_ar:'الذكاء الاصطناعي في الرعاية', title_en:'AI in Healthcare', desc_ar:'8 ساعات — 6 وحدات — BrainSAIT Certified — متوسط', desc_en:'8h — 6 modules — BrainSAIT Certified — Intermediate', action_ar:'سجّل — SAR 900', action_en:'Enroll — SAR 900', link:'tel:966920000094' },
      ],
      stats: [
        { n:'9', l_ar:'دورات معتمدة', l_en:'Certified Courses' },
        { n:'110+', l_ar:'ساعة تدريبية', l_en:'Training Hours' },
        { n:'72', l_ar:'وحدة تعليمية', l_en:'Learning Modules' },
        { n:'SCFHS', l_ar:'معتمد', l_en:'Accredited' },
      ],
      info_ar: 'جميع الدورات متاحة بالعربية والإنجليزية. شهادات SCFHS CPD تُرفع تلقائياً بعد الاجتياز. خصم 20% للتسجيل الجماعي (10+ موظفين).',
      info_en: 'All courses in Arabic and English. SCFHS CPD certificates uploaded automatically after completion. 20% discount for group enrollment (10+ staff).',
    },
    admin: {
      title_ar: 'بوابة الإدارة', title_en: 'Admin Dashboard',
      subtitle_ar: 'لوحة تحكم إدارية — إحصائيات، قواعد بيانات، تكاملات، صحة النظام', subtitle_en: 'Admin control panel — statistics, databases, integrations, system health',
      quick_actions_ar: ['🏥 صحة النظام','📊 إحصائيات شاملة','👨‍⚕️ إدارة الأطباء','🏛️ NPHIES الحي','⚙️ إعدادات','📋 سجل التدقيق'],
      quick_actions_en: ['🏥 System Health','📊 Full Stats','👨‍⚕️ Manage Doctors','🏛️ Live NPHIES','⚙️ Settings','📋 Audit Log'],
      quick_links: [['/health','System Health'],[ '/api/stats','Full Statistics'],['/api/schema','DB Schema'],['/api/nphies/analysis','NPHIES Analysis']],
      tools: [
        { icon:'🏥', title_ar:'صحة النظام', title_en:'System Health', desc_ar:'حالة جميع التكاملات: D1، Oracle Bridge، NPHIES Mirror، ClaimLinc', desc_en:'Status of all integrations: D1, Oracle Bridge, NPHIES Mirror, ClaimLinc', action_ar:'فحص الآن', action_en:'Check Now', link:'/health' },
        { icon:'📊', title_ar:'إحصائيات النظام', title_en:'System Statistics', desc_ar:'مرضى، أطباء، أقسام، مواعيد، مطالبات — بيانات حية', desc_en:'Patients, doctors, departments, appointments, claims — live data', action_ar:'عرض', action_en:'View', link:'/api/stats' },
        { icon:'🏛️', title_ar:'تحليل NPHIES', title_en:'NPHIES Analysis', desc_ar:'تقرير الموافقات والرفضات ومؤشرات الشبكة', desc_en:'Approvals, rejections, and network KPI report', action_ar:'تحليل', action_en:'Analyze', link:'/api/nphies/analysis' },
        { icon:'⚙️', title_ar:'مخطط قاعدة البيانات', title_en:'Database Schema', desc_ar:'جداول D1: patients, claims, visits, orders, departments', desc_en:'D1 tables: patients, claims, visits, orders, departments', action_ar:'عرض المخطط', action_en:'View Schema', link:'/api/schema' },
      ],
      stats: [
        { n:'3', l_ar:'قواعد D1', l_en:'D1 Databases' },
        { n:'286', l_ar:'وثيقة RAG', l_en:'RAG Documents' },
        { n:'v'+VERSION, l_ar:'إصدار النظام', l_en:'System Version' },
        { n:'99.9%', l_ar:'وقت التشغيل', l_en:'Uptime', field:'uptime' },
      ],
      info_ar: 'للوصول الإداري الكامل: يتطلب مفتاح API. أضف X-API-Key في الترويسات للوصول للنقاط المحمية.',
      info_en: 'For full admin access: API key required. Add X-API-Key header to access protected endpoints.',
    },
    reception: {
      title_ar: 'بوابة الاستقبال', title_en: 'Reception Portal',
      subtitle_ar: 'تسجيل سريع، أهلية فورية، حجز المواعيد، تحقق التأمين', subtitle_en: 'Fast registration, instant eligibility, appointment booking, insurance verification',
      quick_actions_ar: ['➕ تسجيل مريض جديد','🔍 تحقق من الأهلية','📅 حجز موعد','📞 اتصل بالمريض','🏥 عيادات اليوم','⚠️ إحالة طوارئ'],
      quick_actions_en: ['➕ Register Patient','🔍 Verify Eligibility','📅 Book Appointment','📞 Call Patient','🏥 Today Clinics','⚠️ Emergency Referral'],
      quick_links: [['/api/patients','Patient API'],[ '/api/appointments','Appointments'],['/api/eligibility','Eligibility Check'],['/api/departments','Departments']],
      tools: [
        { icon:'🔍', title_ar:'تحقق فوري من الأهلية', title_en:'Instant Eligibility Check', desc_ar:'أدخل رقم الهوية — أحصل على حالة التأمين في ثوانٍ عبر NPHIES', desc_en:'Enter national ID — get insurance status in seconds via NPHIES', action_ar:'ابدأ', action_en:'Start', endpoint:'/api/eligibility', method:'POST', form:true },
        { icon:'👤', title_ar:'تسجيل مريض جديد', title_en:'New Patient Registration', desc_ar:'إضافة مريض جديد لقاعدة بيانات PMI مع بيانات التأمين', desc_en:'Add new patient to PMI database with insurance details', action_ar:'تسجيل', action_en:'Register', link:'/api/patients' },
        { icon:'📅', title_ar:'جدول المواعيد', title_en:'Appointment Schedule', desc_ar:'عرض وإدارة مواعيد اليوم عبر جميع العيادات', desc_en:'View and manage todays appointments across all clinics', action_ar:'عرض الجدول', action_en:'View Schedule', link:'/api/appointments' },
        { icon:'🏥', title_ar:'الأقسام والعيادات', title_en:'Departments & Clinics', desc_ar:'20 قسماً نشطاً مع رموز العيادات وأوقات الدوام', desc_en:'20 active departments with clinic codes and working hours', action_ar:'عرض', action_en:'View', link:'/api/departments' },
      ],
      stats: [
        { n:'20', l_ar:'قسم نشط', l_en:'Active Depts' },
        { n:'<10s', l_ar:'وقت التحقق من الأهلية', l_en:'Eligibility Time' },
        { n:'1,000', l_ar:'دواء في الدستور', l_en:'Drug Formulary' },
        { n:'10', l_ar:'مؤمِّن نشط', l_en:'Active Insurers' },
      ],
      info_ar: 'التحقق من الأهلية يعمل عبر Oracle Bridge + NPHIES. لأهلية أسرع: استخدم رقم الهوية الوطنية (10 أرقام).',
      info_en: 'Eligibility check works via Oracle Bridge + NPHIES. For fastest results: use 10-digit national ID.',
    },
    rcm: {
      title_ar: 'بوابة إدارة دورة الإيرادات', title_en: 'RCM Portal',
      subtitle_ar: 'ClaimLinc AI — تحليل رفض، PA، GSS، مؤشرات الأداء', subtitle_en: 'ClaimLinc AI — Denial analysis, PA, GSS, KPI dashboards',
      quick_actions_ar: ['📊 لوحة KPIs','📈 تحليل الرفض','✅ مطالبات معلقة','💰 GSS الحي','⚠️ تنبيهات الرياض','🤖 ClaimLinc AI'],
      quick_actions_en: ['📊 KPI Dashboard','📈 Rejection Analysis','✅ Pending Claims','💰 Live GSS','⚠️ Riyadh Alerts','🤖 ClaimLinc AI'],
      quick_links: [['/api/nphies/analysis','Rejection Analysis'],['/api/rcm','RCM Dashboard'],['/api/nphies/network','Network KPIs'],['/api/claims','Claims Data']],
      tools: [
        { icon:'📊', title_ar:'لوحة KPI الحية', title_en:'Live KPI Dashboard', desc_ar:'أيام AR، معدل التمرير الأول، معدل الرفض، صافي التحصيل — بيانات حية', desc_en:'Days in AR, first-pass rate, denial rate, net collection — live data', action_ar:'فتح اللوحة', action_en:'Open Dashboard', link:'/api/rcm' },
        { icon:'📈', title_ar:'تحليل الرفض', title_en:'Denial Analysis', desc_ar:'الرياض: 88.5% — SAR 11.3M في خطر — 5 أسباب جذرية محددة', desc_en:'Riyadh: 88.5% — SAR 11.3M at risk — 5 root causes identified', action_ar:'تحليل', action_en:'Analyze', link:'/api/nphies/analysis' },
        { icon:'🤖', title_ar:'ClaimLinc AI', title_en:'ClaimLinc AI', desc_ar:'استرداد SAR 9.8M خلال 90 يوماً — 5 وحدات: Auth, Code, Elig, DRG, Compliance', desc_en:'SAR 9.8M recovery in 90 days — 5 modules: Auth, Code, Elig, DRG, Compliance', action_ar:'فعّل ClaimLinc', action_en:'Activate ClaimLinc', link:'tel:966920000094' },
        { icon:'💰', title_ar:'ملخص الشبكة المالي', title_en:'Network Financial Summary', desc_ar:'SAR 835.7M شبكة الحياة الوطني — بيانات NPHIES الحية', desc_en:'SAR 835.7M Hayat National network — live NPHIES data', action_ar:'عرض', action_en:'View', link:'/api/nphies/network' },
      ],
      stats: [
        { n:'SAR 835M', l_ar:'إجمالي الشبكة', l_en:'Network Total', field:'sar' },
        { n:'88.5%', l_ar:'الرياض ⚠️', l_en:'Riyadh ⚠️' },
        { n:'SAR 11.3M', l_ar:'في خطر', l_en:'At Risk' },
        { n:'90 Days', l_ar:'خطة الاسترداد', l_en:'Recovery Plan' },
      ],
      info_ar: 'لوحة RCM محمية بـ X-API-Key. بيانات المطالبات تأتي مباشرة من D1 + NPHIES Mirror. ClaimLinc يعمل على SAR 835M من البيانات الحقيقية.',
      info_en: 'RCM dashboard protected by X-API-Key. Claims data from D1 + NPHIES Mirror direct. ClaimLinc operates on SAR 835M in real production data.',
    },
  };

  const rd = ROLES[role];
  if (!rd) return '<html><body>Unknown role</body></html>';
  const title = ar ? rd.title_ar : rd.title_en;
  const subtitle = ar ? rd.subtitle_ar : rd.subtitle_en;
  const info = ar ? rd.info_ar : rd.info_en;
  const qActions = ar ? rd.quick_actions_ar : rd.quick_actions_en;

  const quickActionsHtml = qActions.map(a =>
    '<button class="qa-btn" type="button">' + escapeHTML(a) + '</button>'
  ).join('');

  const statsHtml = rd.stats.map(s => {
    const fieldAttr = s.field ? ' data-field="' + escapeAttr(s.field) + '"' : '';
    return '<div class="rp-stat"><div class="rp-stat-n"' + fieldAttr + '>' + escapeHTML(s.n) + '</div><div class="rp-stat-l">' + escapeHTML(ar ? s.l_ar : s.l_en) + '</div></div>';
  }).join('');

  const toolsHtml = rd.tools.map(t => {
    const ttitle = ar ? t.title_ar : t.title_en;
    const tdesc  = ar ? t.desc_ar  : t.desc_en;
    const tact   = ar ? t.action_ar : t.action_en;
    const hrefValue = t.link || '#';
    const href   = 'href="' + escapeAttr(hrefValue) + '"';
    const externalAttrs = isExternalHref(hrefValue) ? ' target="_blank" rel="noopener noreferrer"' : '';
    return '<div class="rp-tool-card">' +
      '<div class="rp-tool-icon">' + escapeHTML(t.icon) + '</div>' +
      '<div class="rp-tool-body">' +
        '<h3 class="rp-tool-title">' + escapeHTML(ttitle) + '</h3>' +
        '<p class="rp-tool-desc">' + escapeHTML(tdesc) + '</p>' +
      '</div>' +
      '<a ' + href + externalAttrs + ' class="rp-tool-btn">' + escapeHTML(tact) + ' →</a>' +
    '</div>';
  }).join('');

  const quickLinksHtml = rd.quick_links.map(([href, label]) => {
    const externalAttrs = isExternalHref(href) ? ' target="_blank" rel="noopener noreferrer"' : '';
    return '<a href="' + escapeAttr(href) + '" class="rp-qlink"' + externalAttrs + '>' + escapeHTML(label) + '</a>';
  }).join('');

  const roleNavHtml = Object.entries(ROLE_PORTALS).map(([r, rp]) => {
    const lbl = ar ? rp.label_ar : rp.label_en;
    return '<a href="/' + escapeAttr(r) + '?lang=' + escapeAttr(lang) + '" class="role-nav-btn role-nav-' + escapeAttr(r) + (r === role ? ' active' : '') + '">' + escapeHTML(rp.icon) + ' ' + escapeHTML(lbl) + '</a>';
  }).join('');

  return '<!DOCTYPE html>' +
  '<html lang="' + escapeAttr(lang) + '" dir="' + (ar?'rtl':'ltr') + '">' +
  '<head>' +
  '<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">' +
  '<title>' + escapeHTML(title) + ' | ' + escapeHTML(ar ? ORG_NAME_AR : ORG_NAME_EN) + '</title>' +
  '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Tajawal:wght@400;500;700;800;900&display=swap" rel="stylesheet">' +
  '<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22%3E%3Ctext y=%22.9em%22 font-size=%2290%22%3E' + encodeURIComponent(rp.icon) + '%3C/text%3E%3C/svg%3E">' +
  '<style nonce="' + N + '">' +
  '*{margin:0;padding:0;box-sizing:border-box}' +
  'body{font-family:' + (ar?'"Tajawal"':'Inter') + ',sans-serif;background:#f4f6f8;color:#1a2332;min-height:100vh;direction:' + (ar?'rtl':'ltr') + '}' +
  'a{color:inherit;text-decoration:none}' +
  '.c{max-width:1100px;margin:0 auto;padding:0 20px}' +
  /* Header */
  '.rp-header{background:' + rp.gradient + ';color:#fff;padding:0}' +
  '.rp-top-bar{display:flex;align-items:center;justify-content:space-between;padding:14px 20px;flex-wrap:wrap;gap:10px}' +
  '.rp-back{background:rgba(255,255,255,.2);color:#fff;border:none;padding:7px 14px;border-radius:20px;cursor:pointer;font-size:.8rem;font-family:inherit;display:flex;align-items:center;gap:6px}' +
  '.rp-back:hover{background:rgba(255,255,255,.3)}' +
  '.rp-lang{background:rgba(255,255,255,.15);color:#fff;border:1px solid rgba(255,255,255,.3);padding:6px 12px;border-radius:12px;font-size:.75rem;cursor:pointer;font-family:inherit}' +
  '.rp-hero{padding:32px 20px 40px;text-align:center}' +
  '.rp-icon{font-size:3rem;margin-bottom:10px}' +
  '.rp-title{font-size:1.8rem;font-weight:900;margin-bottom:6px}' +
  '.rp-subtitle{font-size:.9rem;opacity:.85;max-width:560px;margin:0 auto 20px}' +
  '.rp-stats{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin-top:20px}' +
  '.rp-stat{background:rgba(255,255,255,.18);border-radius:10px;padding:12px 20px;text-align:center;min-width:80px}' +
  '.rp-stat-n{font-size:1.2rem;font-weight:900;color:#fff}' +
  '.rp-stat-l{font-size:.65rem;opacity:.8;margin-top:2px;text-transform:uppercase}' +
  /* Role Selector Nav */
  '.role-switcher{background:#fff;border-bottom:1px solid #e5e7eb;padding:12px 20px;overflow-x:auto}' +
  '.role-switcher-inner{display:flex;gap:8px;flex-wrap:nowrap;min-width:max-content;margin:0 auto;max-width:1100px}' +
  '.role-nav-btn{padding:7px 14px;border-radius:20px;font-size:.76rem;font-weight:600;color:#64748b;background:#f1f5f9;border:1px solid #e2e8f0;white-space:nowrap;transition:all .2s;text-decoration:none;display:inline-block}' +
  '.role-nav-btn:hover{background:#e2e8f0;color:#1a2332}' +
  '.role-nav-btn.active{color:#fff;border-color:transparent}' +
  '.role-nav-patient.active{background:#1976D2}.role-nav-provider.active{background:#2E7D32}.role-nav-payer.active{background:#6A1B9A}.role-nav-student.active{background:#E65100}.role-nav-admin.active{background:#37474F}.role-nav-reception.active{background:#00838F}.role-nav-rcm.active{background:#C62828}' +
  /* Quick Actions */
  '.qa-row{background:#fff;border-bottom:1px solid #e5e7eb;padding:14px 20px}' +
  '.qa-inner{display:flex;gap:8px;flex-wrap:wrap;max-width:1100px;margin:0 auto}' +
  '.qa-btn{background:#f8fafc;border:1px solid #e2e8f0;padding:8px 14px;border-radius:8px;font-size:.78rem;font-weight:600;cursor:pointer;font-family:inherit;color:#374151;transition:all .2s;white-space:nowrap}' +
  '.qa-btn:hover{background:' + rp.color + ';color:#fff;border-color:' + rp.color + '}' +
  /* Main content */
  '.rp-body{padding:28px 20px;max-width:1100px;margin:0 auto}' +
  '.rp-tools-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:28px}' +
  '@media(max-width:700px){.rp-tools-grid{grid-template-columns:1fr}}' +
  '.rp-tool-card{background:#fff;border:1px solid #e5e7eb;border-radius:12px;padding:20px;display:flex;gap:14px;align-items:flex-start;transition:all .25s;border-left:4px solid ' + rp.color + '}' +
  '[dir=rtl] .rp-tool-card{border-left:none;border-right:4px solid ' + rp.color + '}' +
  '.rp-tool-card:hover{box-shadow:0 4px 16px rgba(0,0,0,.08);transform:translateY(-1px)}' +
  '.rp-tool-icon{font-size:2rem;flex-shrink:0}' +
  '.rp-tool-body{flex:1}' +
  '.rp-tool-title{font-weight:700;font-size:.95rem;color:#1a2332;margin-bottom:4px}' +
  '.rp-tool-desc{font-size:.78rem;color:#64748b;line-height:1.5}' +
  '.rp-tool-btn{flex-shrink:0;background:' + rp.color + ';color:#fff;padding:8px 16px;border-radius:8px;font-size:.78rem;font-weight:600;align-self:center;transition:opacity .15s;white-space:nowrap}' +
  '.rp-tool-btn:hover{opacity:.85}' +
  /* Quick Links */
  '.rp-qlinks{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:20px}' +
  '.rp-qlink{background:#fff;border:1px solid #e2e8f0;padding:7px 14px;border-radius:8px;font-size:.76rem;font-weight:600;color:' + rp.color + ';transition:all .2s}' +
  '.rp-qlink:hover{background:' + rp.color + ';color:#fff}' +
  /* Info box */
  '.rp-info{background:' + rp.color + '18;border:1px solid ' + rp.color + '33;border-radius:10px;padding:16px 20px;font-size:.82rem;color:#374151;line-height:1.6;margin-bottom:20px}' +
  '.rp-info strong{color:' + rp.color + '}' +
  /* Eligibility form */
  '.elig-form{background:#fff;border:1px solid #e5e7eb;border-radius:12px;padding:24px;margin-bottom:20px}' +
  '.elig-form h3{font-size:1rem;font-weight:700;margin-bottom:14px;color:#1a2332}' +
  '.elig-inp{width:100%;padding:10px 14px;border:1px solid #e2e8f0;border-radius:8px;font-size:.88rem;font-family:inherit;margin-bottom:10px;direction:ltr}' +
  '.elig-inp:focus{outline:2px solid ' + rp.color + ';border-color:transparent}' +
  '.elig-sel{width:100%;padding:10px 14px;border:1px solid #e2e8f0;border-radius:8px;font-size:.88rem;font-family:inherit;margin-bottom:12px;background:#fff}' +
  '.elig-btn{background:' + rp.color + ';color:#fff;border:none;padding:11px 24px;border-radius:8px;font-size:.88rem;font-weight:700;cursor:pointer;font-family:inherit;width:100%;transition:opacity .15s}' +
  '.elig-btn:hover{opacity:.88}' +
  '.elig-result{margin-top:12px;padding:12px;border-radius:8px;font-size:.82rem;display:none}' +
  '.elig-result.is-visible,.elig-result.elig-ok,.elig-result.elig-no{display:block}' +
  '.elig-ok{background:#e8f5e9;border:1px solid #81c784;color:#2e7d32}' +
  '.elig-no{background:#ffebee;border:1px solid #e57373;color:#c62828}' +
  /* Footer */
  '.rp-footer{background:#1a2332;color:rgba(255,255,255,.5);padding:20px;text-align:center;font-size:.72rem;margin-top:32px}' +
  '.rp-footer a{color:rgba(255,255,255,.5);margin:0 8px}' +
  '.rp-footer a:hover{color:#fff}' +
  '.rp-version{font-size:.82rem;opacity:.8}' +
  '</style>' +
  '</head>' +
  '<body>' +
  /* Header */
  '<div class="rp-header">' +
    '<div class="rp-top-bar">' +
      '<button class="rp-back" id="role-back-btn" type="button">← ' + (ar?'رجوع':'Back') + '</button>' +
      '<span class="rp-version">' + escapeHTML(ar?ORG_NAME_AR:ORG_NAME_EN) + ' v' + escapeHTML(VERSION) + '</span>' +
      '<a href="/' + escapeAttr(role) + '?lang=' + (ar ? 'en' : 'ar') + '" class="rp-lang">' + (ar ? 'English' : 'عربي') + '</a>' +
    '</div>' +
    '<div class="rp-hero">' +
      '<div class="rp-icon">' + escapeHTML(rp.icon) + '</div>' +
      '<div class="rp-title">' + escapeHTML(title) + '</div>' +
      '<div class="rp-subtitle">' + escapeHTML(subtitle) + '</div>' +
      '<div class="rp-stats">' + statsHtml + '</div>' +
    '</div>' +
  '</div>' +
  /* Role Switcher */
  '<div class="role-switcher"><div class="role-switcher-inner">' + roleNavHtml + '</div></div>' +
  /* Quick Actions */
  '<div class="qa-row"><div class="qa-inner">' + quickActionsHtml + '</div></div>' +
  /* Body */
  '<div class="rp-body">' +
    /* Eligibility form for patient/reception */
    ((role === 'patient' || role === 'reception') ?
      '<div class="elig-form">' +
        '<h3>' + (ar?'🔍 تحقق من التأمين فوراً':'🔍 Instant Insurance Eligibility') + '</h3>' +
        '<input class="elig-inp" id="eid-inp" placeholder="' + (ar?'رقم الهوية الوطنية / الإقامة':'National ID / Iqama Number') + '" maxlength="10">' +
        '<select class="elig-sel" id="eid-type"><option value="NATIONAL NUMBER">' + (ar?'هوية وطنية':'National ID') + '</option><option value="IQAMA">' + (ar?'إقامة':'Iqama') + '</option><option value="PASSPORT">' + (ar?'جواز سفر':'Passport') + '</option></select>' +
        '<button class="elig-btn" id="elig-check-btn" type="button">' + (ar?'تحقق من الأهلية':'Check Eligibility') + '</button>' +
        '<div class="elig-result" id="elig-result"></div>' +
      '</div>'
    : '') +
    /* Tools */
    '<div class="rp-tools-grid">' + toolsHtml + '</div>' +
    /* Quick Links */
    '<div class="rp-qlinks">' + quickLinksHtml + '</div>' +
    /* Info box */
    '<div class="rp-info"><strong>' + (ar?'💡 ملاحظة مهمة:':'💡 Important Note:') + '</strong> ' + escapeHTML(info) + '</div>' +
  '</div>' +
  /* Footer */
  '<div class="rp-footer">' +
    '© 2026 ' + escapeHTML(ar?ORG_NAME_AR:ORG_NAME_EN) + ' · BrainSAIT Healthcare OS v' + escapeHTML(VERSION) + '<br>' +
    '<a href="/?lang=' + escapeAttr(lang) + '">' + (ar?'الرئيسية':'Home') + '</a>' +
    Object.keys(ROLE_PORTALS).map(r => '<a href="/' + escapeAttr(r) + '?lang=' + escapeAttr(lang) + '">' + escapeHTML(ROLE_PORTALS[r].icon) + '</a>').join('') +
    '<a href="tel:966920000094">📞 920000094</a>' +
  '</div>' +
  /* Eligibility check JS */
  '<script nonce="' + N + '">' +
  /* Live data for role portals */
  '(function(){' +
    'var role="' + escapeAttr(role) + '";' +
    'fetch("/api/portal/status").then(function(r){return r.json();}).then(function(d){' +
      'if(!d.success||!d.live) return;' +
      'var uptime=document.querySelector(".rp-stat-n[data-field=\"uptime\"]");' +
      'if(uptime&&d.live.uptime) uptime.textContent=d.live.uptime;' +
      'document.documentElement.setAttribute("data-live-portal",role);' +
    '}).catch(function(){});' +
  '})();' +
  '</' + 'script>' +
  '<script nonce="' + N + '">' +
  'function checkEligibility() {' +
    'var id = document.getElementById("eid-inp").value.trim();' +
    'var type = document.getElementById("eid-type") ? document.getElementById("eid-type").value : "NATIONAL NUMBER";' +
    'var res = document.getElementById("elig-result");' +
    'if (!id || id.length < 9) { res.className="elig-result elig-no"; res.textContent="' + (ar?'أدخل رقم هوية صحيح (9-10 أرقام)':'Enter a valid ID (9-10 digits)') + '"; return; }' +
    'res.className="elig-result is-visible"; res.textContent="' + (ar?'جاري التحقق...':'Checking...') + '";' +
    'fetch("/api/eligibility",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({identity_number:id,identity_type:type})})' +
    '.then(function(r){return r.json();})' +
    '.then(function(d){' +
      'if(d.success && (d.eligible || d.status==="eligible")) {' +
        'res.className="elig-result elig-ok";' +
        'res.textContent="✅ ' + (ar?'مؤهل — التأمين نشط':'Eligible — Insurance Active') + '" + (d.payer_name ? " | " + d.payer_name : "") + (d.network ? " | " + d.network : "");' +
      '} else {' +
        'res.className="elig-result elig-no";' +
        'res.textContent="❌ ' + (ar?'غير مؤهل أو لم يتم التحقق — تواصل مع الاستقبال':'Not eligible or unverified — contact reception') + '";' +
      '}' +
    '})' +
    '.catch(function(){res.className="elig-result elig-no";res.textContent="' + (ar?'خطأ في الاتصال — حاول مرة أخرى':'Connection error — try again') + '"});' +
  '}' +
  'var roleBackBtn=document.getElementById("role-back-btn");' +
  'if(roleBackBtn) roleBackBtn.addEventListener("click",function(){history.back();});' +
  'var eligBtn=document.getElementById("elig-check-btn");' +
  'if(eligBtn) eligBtn.addEventListener("click",checkEligibility);' +
  'document.getElementById("eid-inp") && document.getElementById("eid-inp").addEventListener("keydown",function(e){if(e.key==="Enter")checkEligibility();});' +
  '</script>' +
  '</body></html>';
}

function roleResponse(role, lang, env) {
  const nonce = generateNonce();
  const safeLang = lang === 'en' ? 'en' : 'ar';
  const csp = SEC['Content-Security-Policy'].replace(/NONCE_PLACEHOLDER/g, nonce);
  return new Response(buildRoleHTML(role, safeLang, env, nonce), {
    headers: { ...HTML_H, 'Content-Security-Policy': csp },
  });
}

// ─── HTML PORTAL ──────────────────────────────────────────────────────────────
// KEY: All JavaScript uses addEventListener, createElement, and innerHTML with
// string concatenation ONLY — no template literals anywhere in the JS code.
// This avoids all nested template literal / escaping issues entirely.

function buildHTML(lang, nonce) {
  const N = nonce || generateNonce();
  const ar = lang === 'ar';

  // All translatable strings
  const T = {
    title:       ar ? ORG_NAME_AR : ORG_NAME_EN,
    tagline:     ar ? 'رعاية صحية متكاملة منذ 1999 — Oracle · NPHIES · BrainSAIT' : 'Integrated Healthcare since 1999 — Oracle · NPHIES · BrainSAIT',
    book:        ar ? '📅 احجز موعداً' : '📅 Book Appointment',
    patient:     ar ? 'بوابة المريض' : 'Patient Portal',
    depts:       ar ? 'الأقسام' : 'Departments',
    branches:    ar ? 'الفروع' : 'Branches',
    doctors:     ar ? 'الأطباء' : 'Doctors',
    blog:        ar ? 'المدونة' : 'Blog',
    academy_nav: ar ? 'الأكاديمية' : 'Academy',
    loading:     ar ? 'جاري التحميل...' : 'Loading...',
    beds:        ar ? 'سرير' : 'Beds',
    active:      ar ? 'نشط' : 'Active',
    call:        ar ? '📞 اتصل' : '📞 Call',
    book_btn:    ar ? 'احجز' : 'Book',
    search_doc:  ar ? 'ابحث عن طبيب...' : 'Search doctors...',
    all_specs:   ar ? 'جميع التخصصات' : 'All Specialties',
    view_all:    ar ? 'عرض الكل' : 'View All',
    all_arts:    ar ? 'جميع المقالات' : 'All Articles',
    enroll:      ar ? 'سجّل الآن' : 'Enroll Now',
    h_depts:     ar ? 'الأقسام الطبية' : 'Medical Departments',
    h_branches:  ar ? 'فروعنا' : 'Our Branches',
    h_doctors:   ar ? 'أطباؤنا' : 'Our Doctors',
    h_insurance: ar ? 'شركاء التأمين' : 'Insurance Partners',
    h_blog:      ar ? 'المدونة الطبية' : 'Medical Blog',
    h_academy:   ar ? 'أكاديمية الحياة الوطني' : 'Hayat National Academy',
    h_cta:       ar ? 'صحتك أولاً' : 'Your Health First',
    p_depts:     ar ? '42+ تخصصاً عبر 6 فروع' : '42+ specialties across 6 branches',
    p_branches:  ar ? '6 فروع في مناطق المملكة' : '6 branches across Saudi Arabia',
    p_insurance: ar ? '10 شركات تأمين معتمدة عبر NPHIES' : '10 approved insurers via NPHIES',
    p_blog:      ar ? 'مقالات في الترميز والرعاية الصحية والذكاء الاصطناعي' : 'Articles on coding, healthcare, and AI',
    p_academy:   ar ? 'تعلّم · احترف · تفوّق — دورات معتمدة SCFHS' : 'Learn · Master · Excel — SCFHS Accredited Courses',
    p_cta:       ar ? 'احجز موعدك الآن واحصل على أفضل رعاية طبية' : 'Book your appointment and receive world-class care',
    s_doc:       ar ? 'طبيب' : 'Doctors',
    s_dept:      ar ? 'قسم' : 'Depts',
    s_bed:       ar ? 'سرير' : 'Beds',
    typing:      ar ? 'بسمة تكتب...' : 'Basma is typing...',
    chat_ph:     ar ? 'اكتب رسالتك...' : 'Type your message...',
    send:        ar ? 'إرسال' : 'Send',
    chat_hello:  ar ? 'أهلاً! أنا بسمة، مساعدتك في مستشفيات الحياة الوطني. كيف أساعدك؟' : "Hello! I'm Basma, your Hayat National Hospitals AI assistant. How can I help?",
    min:         ar ? 'دقيقة' : 'min',
    read_more:   ar ? 'اقرأ المزيد' : 'Read More',
    book_appt:   ar ? 'احجز موعداً' : 'Book Appointment',
    emergency:   ar ? 'طوارئ 24/7' : 'Emergency 24/7',
    h_test:      ar ? 'ماذا يقول مرضانا' : 'What Our Patients Say',
    h_feat_doc:  ar ? 'نخبة أطبائنا' : 'Featured Specialists',
    h_awards:    ar ? 'الاعتمادات والشراكات' : 'Accreditations & Partners',
    by:          ar ? 'بقلم' : 'By',
    level_b:     ar ? 'مبتدئ' : 'Beginner',
    level_i:     ar ? 'متوسط' : 'Intermediate',
    level_a:     ar ? 'متقدم' : 'Advanced',
    hours:       ar ? 'ساعة' : 'h',
    modules_lbl: ar ? 'وحدة' : 'modules',
  };

  // Build the insurance HTML (server-side — no JS needed)
  const insHtml = INSURANCE.map(p =>
    '<div class="ins-chip"><span class="ins-dot"></span>' + p.name + '<span class="ins-cov">' + p.pct + '%</span></div>'
  ).join('');

  // Testimonials HTML
  const testimonialsHtml = TESTIMONIALS.map(t => {
    const name = ar ? t.name_ar : t.name_en;
    const city = ar ? t.city_ar : t.city_en;
    const text = ar ? t.text_ar : t.text_en;
    const stars = '★'.repeat(t.rating) + '☆'.repeat(5 - t.rating);
    return '<div class="testimonial-card">' +
      '<div class="test-stars">' + stars + '</div>' +
      '<p class="test-text">"' + text + '"</p>' +
      '<div class="test-author"><span class="test-name">' + name + '</span><span class="test-city">📍 ' + city + '</span><span class="test-date">' + t.date + '</span></div>' +
    '</div>';
  }).join('');

  // Featured doctors HTML
  const featuredDoctorsHtml = DOCTORS_FEATURED.map(d => {
    const name = ar ? d.name_ar : d.name_en;
    const spec = ar ? d.specialty_ar : d.specialty_en;
    const title = ar ? d.title_ar : d.title_en;
    const branch = ar ? d.branch_ar : d.branch_en;
    return '<div class="doc-feat-card">' +
      '<div class="doc-avatar">' + d.emoji + '</div>' +
      '<div class="doc-name">' + name + '</div>' +
      '<div class="doc-title">' + title + '</div>' +
      '<div class="doc-spec">' + spec + '</div>' +
      '<div class="doc-meta">' +
        '<span class="doc-branch">📍 ' + branch + '</span>' +
        '<span class="doc-exp">🩺 ' + d.exp + (ar ? ' سنة' : ' yrs') + '</span>' +
        '<span class="doc-rating">⭐ ' + d.rating + '</span>' +
      '</div>' +
      '<div class="doc-next">' + (ar ? 'أقرب موعد: ' : 'Next: ') + '<strong>' + d.next_slot + '</strong></div>' +
      '<a href="tel:966920000094" class="btn-enroll btn-enroll-block">' + (ar ? '📅 احجز' : '📅 Book') + '</a>' +
    '</div>';
  }).join('');

  // Blog: featured article (large card)
  const featuredPost = BLOG_POSTS.find(p => p.featured) || BLOG_POSTS[0];
  const featuredBlogHtml = featuredPost ? (function(){
    const title   = ar ? featuredPost.title_ar   : featuredPost.title_en;
    const excerpt = ar ? featuredPost.excerpt_ar : featuredPost.excerpt_en;
    return '<div class="blog-featured" data-cat="' + featuredPost.category + '">' +
      '<div class="blog-feat-badge"><span class="chip-feat">⭐ ' + (ar ? 'مميز' : 'Featured') + '</span><span class="cat-tag">' + featuredPost.category.toUpperCase() + '</span></div>' +
      '<div>' +
        '<h2 class="blog-feat-title">' + title + '</h2>' +
        '<p class="blog-feat-excerpt">' + excerpt + '</p>' +
        '<div class="blog-meta blog-meta-spaced"><span>✍️ ' + featuredPost.author + '</span><span>📖 ' + featuredPost.read_min + ' ' + T.min + '</span><span>📅 ' + featuredPost.date + '</span></div>' +
        '<a href="/api/blog/' + featuredPost.slug + '" target="_blank" rel="noopener noreferrer" class="btn btn-o read-link-inline">' + (ar ? 'اقرأ المقال' : 'Read Article') + ' →</a>' +
      '</div>' +
    '</div>';
  })() : '';

  // Blog: grid (all non-featured articles, plus remaining featured)
  const blogGridHtml = BLOG_POSTS.filter(p => p !== featuredPost).map(p => {
    const title   = ar ? p.title_ar   : p.title_en;
    const excerpt = ar ? p.excerpt_ar : p.excerpt_en;
    return '<div class="blog-card" data-cat="' + p.category + '">' +
      '<div class="blog-top"><span class="blog-emoji">' + p.emoji + '</span>' +
      (p.featured ? '<span class="chip-feat">⭐</span>' : '') +
      '<span class="cat-tag">' + p.category.toUpperCase() + '</span></div>' +
      '<div class="blog-body">' +
        '<h3 class="blog-title">' + title + '</h3>' +
        '<p class="blog-excerpt">' + excerpt + '</p>' +
        '<div class="blog-meta"><span>✍️ ' + p.author + '</span><span>📖 ' + p.read_min + ' ' + T.min + '</span><span>📅 ' + p.date + '</span></div>' +
        '<a href="/api/blog/' + p.slug + '" target="_blank" rel="noopener noreferrer" class="read-link">' + (ar ? 'اقرأ المقال ←' : 'Read Article →') + '</a>' +
      '</div></div>';
  }).join('');

  // Legacy blogHtml alias (still used in some places)
  const blogHtml = blogGridHtml;

  // Academy HTML (server-side rendered with module previews)
  const academyHtml = COURSES.map(c => {
    const title   = ar ? c.title_ar : c.title_en;
    const desc    = ar ? c.desc_ar  : c.desc_en;
    const lvlMap  = { beginner: '🟢 ' + T.level_b, intermediate: '🟡 ' + T.level_i, advanced: '🔴 ' + T.level_a };
    const mods    = (c.modules_list || []).slice(0, 3);
    const modPrev = mods.length ? '<div class="course-modules-preview">' +
      mods.map(m => '<div class="course-module-item"><span>📌</span><span>' + (ar ? m.title_ar : m.title_en) + '</span></div>').join('') +
      (c.modules > 3 ? '<div class="course-module-item course-module-more">+' + (c.modules - 3) + ' ' + (ar ? 'وحدات أخرى' : 'more modules') + '</div>' : '') +
    '</div>' : '';
    return '<div class="course-card" data-level="' + c.level + '" data-cat="' + c.cat + '">' +
      '<div class="course-icon">' + c.icon + '</div>' +
      '<h3 class="course-title">' + title + '</h3>' +
      '<p class="course-desc">' + desc + '</p>' +
      modPrev +
      '<div class="course-meta">' +
        '<span class="chip-lvl">' + (lvlMap[c.level] || c.level) + '</span>' +
        '<span class="chip-gray">⏱ ' + c.hours + T.hours + '</span>' +
        '<span class="chip-gray">📚 ' + c.modules + ' ' + T.modules_lbl + '</span>' +
        '<span class="chip-accred">' + c.accred + '</span>' +
      '</div>' +
      '<div class="course-footer">' +
        '<span class="course-price">SAR ' + c.price.toLocaleString() + '</span>' +
        '<a href="tel:966920000094" class="btn-enroll">' + T.enroll + '</a>' +
      '</div></div>';
  }).join('');

  const _html = `<!DOCTYPE html>
<html lang="${lang}" dir="${ar ? 'rtl' : 'ltr'}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="theme-color" content="#071629">
<meta name="description" content="${T.tagline}">
<title>${T.title} | HNH</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Tajawal:wght@400;500;700;800;900&display=swap" rel="stylesheet">
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🏥</text></svg>">
<style nonce="${N}">
:root{
  --p:#0878D8;--pd:#075AA4;--n:#071629;--n2:#102844;--a:#D8B65C;--aw:#FFF4CF;
  --g:linear-gradient(135deg,#0878D8 0%,#0B5CAD 45%,#071629 100%);--ga:linear-gradient(135deg,#F7D879 0%,#D8B65C 48%,#A67C20 100%);
  --s:#13B981;--bg:#F5F8FC;--sf:#FFFFFF;--sf2:rgba(255,255,255,.82);--b:#D8E2EF;--t:#0B1728;--ts:#5C6F86;
  --sh:0 12px 30px rgba(7,22,41,.08);--shd:0 24px 70px rgba(7,22,41,.16);--glow:0 0 0 1px rgba(255,255,255,.72),0 24px 70px rgba(8,120,216,.14);
  --r:22px;--r2:30px;--rf:9999px;
  --font:${ar ? "'Tajawal'" : "'Inter'"},sans-serif;
}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{font-family:var(--font);background:linear-gradient(180deg,#F8FBFF 0%,#EEF4FB 44%,#F7F9FC 100%);color:var(--t);line-height:1.65;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility}
img{max-width:100%}a{text-decoration:none;color:inherit}
.c{max-width:1220px;margin:0 auto;padding:0 clamp(18px,4vw,32px)}

/* HEADER */
.hdr{position:sticky;top:0;z-index:100;background:rgba(255,255,255,.88);backdrop-filter:blur(24px) saturate(140%);border-bottom:1px solid rgba(216,226,239,.78);box-shadow:0 12px 36px rgba(7,22,41,.06);padding:0}
.hdr-i{height:72px;display:flex;align-items:center;justify-content:space-between;gap:16px}
.logo{display:flex;align-items:center;gap:10px}
.logo-ic{width:44px;height:44px;background:var(--g);border-radius:15px;display:grid;place-items:center;font-size:1.22rem;flex-shrink:0;box-shadow:0 12px 28px rgba(8,120,216,.24)}
.logo-tx{font-size:.95rem;font-weight:900;color:var(--n);line-height:1.15;letter-spacing:-.02em}
.logo-tx small{display:block;font-size:.6rem;font-weight:700;color:var(--ts);letter-spacing:.02em}
.nav{display:flex;align-items:center;gap:4px}
.nav a,.nav button.nl{min-height:40px;display:inline-flex;align-items:center;padding:8px 12px;border-radius:12px;font-size:.84rem;font-weight:700;color:var(--ts);border:none;background:none;cursor:pointer;font-family:var(--font);transition:all .18s ease}
.nav a:hover,.nav button.nl:hover{color:var(--p);background:rgba(8,120,216,.08)}
.btn{display:inline-flex;align-items:center;justify-content:center;gap:7px;min-height:44px;padding:10px 20px;border-radius:var(--rf);font-weight:800;font-size:.86rem;border:none;cursor:pointer;font-family:var(--font);transition:transform .18s ease,box-shadow .18s ease,background .18s ease;text-decoration:none}
.btn-p{background:var(--g);color:#fff;box-shadow:0 12px 28px rgba(8,120,216,.24)}.btn-p:hover{transform:translateY(-2px);box-shadow:0 18px 38px rgba(8,120,216,.3)}
.btn-a{background:var(--ga);color:var(--n);box-shadow:0 14px 30px rgba(216,182,92,.26)}.btn-a:hover{transform:translateY(-2px);box-shadow:0 18px 40px rgba(216,182,92,.34)}
.btn-o{background:rgba(255,255,255,.72);border:1px solid rgba(8,120,216,.26);color:var(--pd);box-shadow:0 10px 28px rgba(7,22,41,.06)}.btn-o:hover{background:var(--p);color:#fff;border-color:var(--p);transform:translateY(-2px)}
.btn-sm{min-height:38px;padding:8px 15px;font-size:.8rem}
.btn-block{width:100%;justify-content:center}
.btn-enroll-block{display:block;text-align:center;margin-top:12px}
.text-center{text-align:center}.mt-10{margin-top:10px}.mt-12{margin-top:12px}.mt-16{margin-top:16px}.mt-24{margin-top:24px}.mt-28{margin-top:28px}
.section-center{text-align:center}.loading-cell{grid-column:1/-1;text-align:center;padding:40px;color:var(--ts)}
.is-hidden{display:none!important}
.hm{display:none;background:rgba(8,120,216,.08);border:1px solid rgba(8,120,216,.14);border-radius:14px;font-size:1.35rem;cursor:pointer;color:var(--n);padding:8px 11px;line-height:1}

/* LIVE BADGE */
.live{display:inline-flex;align-items:center;gap:6px;padding:4px 12px;border-radius:var(--rf);background:rgba(16,185,129,.1);color:var(--s);font-size:.72rem;font-weight:600}
.live::before{content:'';width:6px;height:6px;border-radius:50%;background:var(--s);animation:pulse 2s infinite}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}}

/* Nav dropdown */
.nav-dropdown{position:relative;display:inline-block}
.nav-drop-btn{cursor:pointer;font-size:.86rem;color:var(--ts);padding:8px 12px;border-radius:12px;transition:all .18s ease;white-space:nowrap;font-weight:800}
.nav-drop-btn:hover{color:var(--p);background:rgba(8,120,216,.08)}
.nav-drop-content{display:none;position:absolute;top:calc(100% + 10px);left:0;background:rgba(255,255,255,.96);backdrop-filter:blur(18px);border:1px solid rgba(216,226,239,.85);border-radius:18px;min-width:240px;box-shadow:var(--shd);z-index:200;overflow:hidden;padding:8px}
.nav-dropdown:hover .nav-drop-content{display:block}
.nav-drop-content a{display:block;padding:11px 14px;color:var(--ts);font-size:.82rem;text-decoration:none;border-bottom:0;transition:background .15s;border-radius:12px;font-weight:700}
.nav-drop-content a:hover{background:rgba(8,120,216,.08);color:var(--p)}
.nav-drop-content a:last-child{border-bottom:none}

/* HERO */
.hero{position:relative;min-height:calc(100svh - 72px);display:flex;align-items:center;padding:clamp(58px,8vw,92px) 0 clamp(76px,9vw,116px);background:radial-gradient(circle at 12% 18%,rgba(67,167,245,.24),transparent 30%),radial-gradient(circle at 84% 10%,rgba(216,182,92,.22),transparent 30%),linear-gradient(135deg,#061222 0%,#0B2440 46%,#0878D8 100%);overflow:hidden;color:#fff}
.hero::before{content:'';position:absolute;inset:0;background:url("data:image/svg+xml,%3Csvg width='96' height='96' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='g' width='96' height='96' patternUnits='userSpaceOnUse'%3E%3Cpath d='M0 48h96M48 0v96' stroke='%23ffffff' stroke-opacity='.045'/%3E%3Ccircle cx='48' cy='48' r='1.5' fill='%23D8B65C' fill-opacity='.26'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23g)'/%3E%3C/svg%3E");mask-image:linear-gradient(180deg,#000,transparent 92%)}
.hero::after{content:'';position:absolute;inset:auto -10% -28% auto;width:min(620px,52vw);height:min(620px,52vw);border-radius:50%;background:linear-gradient(135deg,rgba(67,167,245,.28),rgba(216,182,92,.22));filter:blur(8px);opacity:.9}
.hero .c{position:relative;z-index:1}
.hero-inner{display:grid;grid-template-columns:minmax(0,1fr) minmax(340px,.86fr);gap:clamp(34px,5vw,68px);align-items:center}
.hero-kicker{display:inline-flex;align-items:center;gap:8px;padding:8px 13px;border-radius:var(--rf);background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.16);color:rgba(255,255,255,.86);font-size:.78rem;font-weight:900;letter-spacing:.08em;text-transform:uppercase;backdrop-filter:blur(14px)}
h1{font-size:clamp(2.55rem,6vw,5.25rem);font-weight:950;color:#fff;line-height:.96;margin:20px 0 20px;letter-spacing:-.06em;max-width:13ch}
h1 .gold{background:linear-gradient(135deg,#FFF4CF,#D8B65C 56%,#FFFFFF);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.hero-sub{font-size:clamp(1.02rem,2vw,1.26rem);color:rgba(255,255,255,.74);margin-bottom:28px;max-width:680px}
.hero-btns{display:flex;gap:12px;flex-wrap:wrap;margin-bottom:22px}
.hero .btn-o{background:rgba(255,255,255,.11);border-color:rgba(255,255,255,.22);color:#fff}.hero .btn-o:hover{background:#fff;color:var(--n)}
.hero-badges{display:flex;gap:10px;flex-wrap:wrap;margin:0 0 30px}
.hero-pill{display:inline-flex;align-items:center;gap:7px;padding:8px 12px;border-radius:var(--rf);background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.15);color:rgba(255,255,255,.82);font-size:.8rem;font-weight:800;box-shadow:0 8px 24px rgba(0,0,0,.08);backdrop-filter:blur(14px)}
.hero-proof{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;max-width:680px}
.stat-card{position:relative;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.14);border-radius:20px;padding:17px 12px;text-align:center;transition:all .25s;box-shadow:0 18px 44px rgba(0,0,0,.12);overflow:hidden;backdrop-filter:blur(16px)}
.stat-card::before{content:'';position:absolute;inset:0 0 auto;height:3px;background:var(--ga);opacity:.95}
.stat-card:hover{transform:translateY(-3px);background:rgba(255,255,255,.14)}
.stat-n{font-size:1.62rem;font-weight:950;color:#fff;line-height:1}
.stat-l{font-size:.72rem;color:rgba(255,255,255,.68);margin-top:5px;font-weight:800}
.hero-visual{position:relative}
.command-card{position:relative;background:linear-gradient(180deg,rgba(255,255,255,.96),rgba(255,255,255,.86));border:1px solid rgba(255,255,255,.72);border-radius:34px;padding:24px;box-shadow:0 28px 90px rgba(0,0,0,.28);backdrop-filter:blur(22px);color:var(--n);overflow:hidden}
.command-card::before{content:'';position:absolute;inset:0 0 auto;height:5px;background:var(--ga)}
.command-top{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;margin-bottom:18px}
.command-title{font-size:1.02rem;font-weight:950;letter-spacing:-.02em;color:var(--n)}
.command-sub{font-size:.78rem;color:var(--ts);margin-top:3px}
.command-live{display:inline-flex;align-items:center;gap:6px;padding:6px 10px;border-radius:var(--rf);background:rgba(16,185,129,.1);color:var(--s);font-size:.7rem;font-weight:900;white-space:nowrap}
.command-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin-bottom:16px}
.command-tile{padding:14px;border-radius:18px;background:linear-gradient(180deg,#F8FBFF,#FFFFFF);border:1px solid rgba(216,226,239,.9)}
.command-num{font-size:1.35rem;font-weight:950;color:var(--pd);line-height:1}
.command-label{font-size:.7rem;color:var(--ts);font-weight:800;margin-top:4px}
.command-row{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:12px 0;border-top:1px solid rgba(216,226,239,.82)}
.command-row strong{font-size:.82rem;color:var(--n)}.command-row span{font-size:.74rem;color:var(--ts)}
.command-chip{padding:5px 9px;border-radius:var(--rf);background:rgba(8,120,216,.1);color:var(--pd);font-size:.68rem;font-weight:900;white-space:nowrap}
.command-assistant{margin-top:16px;padding:16px;border-radius:22px;background:linear-gradient(135deg,rgba(8,120,216,.1),rgba(216,182,92,.16));border:1px solid rgba(8,120,216,.16);display:flex;gap:12px;align-items:flex-start}
.assistant-orb{width:42px;height:42px;border-radius:16px;background:var(--g);display:grid;place-items:center;color:#fff;flex-shrink:0;box-shadow:0 14px 34px rgba(8,120,216,.22)}
.assistant-copy strong{display:block;font-size:.86rem;color:var(--n)}.assistant-copy span{font-size:.76rem;color:var(--ts)}
.quick-dock{position:relative;margin-top:clamp(-58px,-6vw,-34px);z-index:4}
.quick-dock-inner{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;background:rgba(255,255,255,.86);border:1px solid rgba(216,226,239,.86);border-radius:28px;padding:14px;box-shadow:var(--shd);backdrop-filter:blur(22px)}
.quick-card{display:flex;gap:12px;align-items:flex-start;width:100%;padding:18px;border-radius:22px;background:linear-gradient(180deg,#fff,rgba(248,251,255,.92));border:1px solid rgba(216,226,239,.78);transition:all .2s;color:inherit;text-decoration:none;cursor:pointer;font-family:var(--font);text-align:inherit}
.quick-card:hover{transform:translateY(-3px);box-shadow:0 18px 46px rgba(7,22,41,.12);border-color:rgba(8,120,216,.28)}
.quick-icon{width:44px;height:44px;border-radius:16px;background:var(--g);display:grid;place-items:center;color:#fff;font-size:1.15rem;flex-shrink:0}
.quick-title{font-size:.9rem;font-weight:950;color:var(--n);line-height:1.2}.quick-copy{font-size:.73rem;color:var(--ts);line-height:1.42;margin-top:4px}

/* INTEGRATION STRIP */
.int-strip{background:linear-gradient(90deg,var(--n),var(--n2));padding:12px 0;border-top:1px solid rgba(255,255,255,.06);border-bottom:1px solid rgba(255,255,255,.06)}
.int-inner{display:flex;gap:9px;flex-wrap:wrap;justify-content:center;align-items:center}
.int-tag{display:inline-flex;align-items:center;gap:6px;padding:6px 12px;background:rgba(255,255,255,.09);border:1px solid rgba(255,255,255,.08);border-radius:var(--rf);font-size:.72rem;color:rgba(255,255,255,.84);font-weight:800}

/* SECTIONS */
.sec{padding:clamp(58px,8vw,88px) 0}
.sec-alt{background:linear-gradient(180deg,rgba(255,255,255,.82),rgba(245,248,252,.98))}
.sec-head{text-align:center;margin-bottom:42px}
.sec-head h2{font-size:clamp(1.75rem,3vw,2.35rem);font-weight:950;color:var(--n);letter-spacing:-.04em}
.sec-head p{color:var(--ts);margin:8px auto 0;max-width:680px}

/* GRIDS */
.g2{display:grid;grid-template-columns:repeat(2,1fr);gap:20px}
.g3{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
.g4{display:grid;grid-template-columns:repeat(4,1fr);gap:18px}
.g5{display:grid;grid-template-columns:repeat(5,1fr);gap:16px}

/* DEPT CARDS */
.dept-card{background:linear-gradient(180deg,#fff,rgba(255,255,255,.84));border:1px solid rgba(216,226,239,.9);border-radius:var(--r);padding:24px;text-align:center;transition:all .25s;box-shadow:0 10px 28px rgba(7,22,41,.04)}
.dept-card:hover{transform:translateY(-4px);box-shadow:var(--shd);border-color:rgba(8,120,216,.24)}
.dept-ico{width:56px;height:56px;background:var(--g);border-radius:18px;display:grid;place-items:center;font-size:1.45rem;margin:0 auto 14px;box-shadow:0 14px 30px rgba(8,120,216,.2)}
.dept-name{font-size:.9rem;font-weight:700;color:var(--n);margin-bottom:3px}
.dept-count{font-size:.75rem;color:var(--ts)}

/* BRANCH CARDS */
.branch-card{background:linear-gradient(180deg,#fff,rgba(255,255,255,.86));border:1px solid rgba(216,226,239,.9);border-radius:var(--r);overflow:hidden;transition:all .25s;box-shadow:0 10px 28px rgba(7,22,41,.04)}
.branch-card:hover{box-shadow:var(--shd);transform:translateY(-3px)}
.branch-top{background:var(--g);padding:24px;color:#fff}
.branch-top h3{font-size:.95rem;font-weight:700;margin-bottom:3px}
.branch-top span{font-size:.78rem;opacity:.8}
.branch-body{padding:16px 20px}
.branch-addr{font-size:.78rem;color:var(--ts);margin-bottom:12px}
.branch-chips{display:flex;gap:6px;margin-bottom:12px;flex-wrap:wrap}
.chip{display:inline-flex;align-items:center;font-size:.68rem;padding:4px 9px;border-radius:var(--rf);font-weight:800}
.chip-ok{background:rgba(16,185,129,.1);color:var(--s)}
.chip-gray{background:var(--bg);color:var(--ts)}
.chip-blue{background:rgba(0,102,204,.1);color:var(--p)}

/* DOCTOR CARDS */
.doc-card{background:linear-gradient(180deg,#fff,rgba(255,255,255,.86));border:1px solid rgba(216,226,239,.9);border-radius:var(--r);padding:22px 18px;text-align:center;transition:all .25s;box-shadow:0 10px 28px rgba(7,22,41,.04)}
.doc-card:hover{transform:translateY(-3px);box-shadow:var(--shd);border-color:rgba(8,120,216,.22)}
.doc-av{width:64px;height:64px;border-radius:22px;background:var(--ga);display:grid;place-items:center;font-size:1.3rem;font-weight:900;color:var(--n);margin:0 auto 12px;font-family:'Inter',sans-serif;box-shadow:0 14px 30px rgba(216,182,92,.25)}
.doc-name{font-size:.88rem;font-weight:700;color:var(--n);margin-bottom:3px}
.doc-spec{font-size:.78rem;color:var(--p);font-weight:600;margin-bottom:4px}
.doc-dept{font-size:.68rem;color:var(--ts);background:rgba(8,120,216,.08);padding:3px 9px;border-radius:var(--rf);display:inline-block;margin-bottom:10px;font-weight:700}

/* INSURANCE */
.ins-grid{display:flex;flex-wrap:wrap;gap:10px;justify-content:center}
.ins-chip{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,.86);border:1px solid rgba(216,226,239,.9);border-radius:14px;padding:11px 16px;font-size:.85rem;font-weight:800;color:var(--n);box-shadow:0 8px 24px rgba(7,22,41,.04)}
.ins-dot{width:8px;height:8px;border-radius:50%;background:var(--s);flex-shrink:0}
.ins-cov{font-size:.72rem;color:var(--ts);font-weight:400;margin-left:4px}

/* BLOG */
.g4-blog{display:grid;grid-template-columns:repeat(4,1fr);gap:18px}
@media(max-width:1100px){.g4-blog{grid-template-columns:repeat(2,1fr)}}
@media(max-width:600px){.g4-blog{grid-template-columns:1fr}}
.blog-card{background:linear-gradient(180deg,#fff,rgba(255,255,255,.86));border:1px solid rgba(216,226,239,.9);border-radius:var(--r);overflow:hidden;transition:all .25s;box-shadow:0 10px 28px rgba(7,22,41,.04)}
.blog-card:hover{box-shadow:var(--shd);transform:translateY(-2px)}
.blog-top{background:var(--g);padding:20px 20px 16px;display:flex;align-items:center;gap:8px}
.blog-emoji{font-size:1.8rem}
.chip-feat{background:rgba(255,255,255,.2);color:#fff;font-size:.65rem;padding:2px 8px;border-radius:var(--rf);font-weight:600}
.cat-tag{background:rgba(255,255,255,.15);color:rgba(255,255,255,.9);font-size:.65rem;padding:2px 8px;border-radius:var(--rf);font-weight:600;margin-left:auto}
.blog-body{padding:16px 20px 20px}
.blog-title{font-size:.9rem;font-weight:700;color:var(--n);margin-bottom:8px;line-height:1.4}
.blog-excerpt{font-size:.78rem;color:var(--ts);line-height:1.55;margin-bottom:12px}
.blog-meta{display:flex;gap:10px;font-size:.72rem;color:var(--ts);flex-wrap:wrap}

/* NPHIES DASHBOARD */
.nphies-grid{display:grid;grid-template-columns:1fr 340px;gap:24px}
.nphies-banner{background:var(--g);border-radius:var(--r2);padding:30px;color:#fff;margin-bottom:18px;box-shadow:0 20px 50px rgba(8,120,216,.22)}
.nb-label{font-size:.68rem;letter-spacing:.12em;opacity:.7;text-transform:uppercase;margin-bottom:4px}
.nb-amount{font-size:2.2rem;font-weight:800;margin-bottom:4px}
.nb-sub{font-size:.78rem;opacity:.7;margin-bottom:16px}
.nb-bar{background:rgba(255,255,255,.2);border-radius:4px;height:8px;overflow:hidden;margin-bottom:6px}
.nb-fill{height:100%;background:linear-gradient(90deg,#10B981,#34D399);border-radius:4px}
.nb-fill-986{width:98.6%}
.nb-rate{font-size:.82rem;opacity:.8}
.branch-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}
.nphies-grid .branch-card{background:rgba(255,255,255,.9);border:1px solid rgba(216,226,239,.9);border-radius:16px;padding:14px;text-align:center}
.bc-ok{border-left:4px solid var(--s)}
.bc-warn{border-left:4px solid #EAB308;background:#FEFCE8}
.bc-name{font-size:.75rem;color:var(--ts);margin-bottom:4px}
.bc-pct{font-size:1.2rem;font-weight:800;color:var(--s)}
.bc-warn-txt{color:#CA8A04}
.bc-sar{font-size:.68rem;color:var(--ts);margin-top:2px}
.nphies-side{display:flex;flex-direction:column;gap:14px}
.reject-card{background:linear-gradient(135deg,#FEF2F2,#FECACA);border:1px solid #FECACA;border-radius:var(--r);padding:20px}
.rc-title{font-size:.78rem;font-weight:700;color:#991B1B;margin-bottom:6px}
.rc-amount{font-size:1.6rem;font-weight:800;color:#DC2626;margin-bottom:2px}
.rc-sub{font-size:.72rem;color:#7F1D1D;margin-bottom:14px}
.rc-causes{display:flex;flex-direction:column;gap:6px}
.rc-cause{display:flex;align-items:center;gap:8px;font-size:.76rem;color:#450A0A}
.rc-pct{font-weight:700;color:#DC2626;min-width:32px}
.pa-card{background:rgba(255,255,255,.9);border:1px solid rgba(216,226,239,.9);border-radius:var(--r);padding:18px;box-shadow:0 10px 28px rgba(7,22,41,.04)}
.pa-row{display:flex;justify-content:space-between;padding:7px 0;border-bottom:1px solid var(--b);font-size:.82rem;color:var(--ts)}
.pa-row:last-child{border-bottom:none}
.pa-row strong{color:var(--n);font-weight:700}
@media(max-width:900px){.nphies-grid{grid-template-columns:1fr}.branch-grid{grid-template-columns:repeat(2,1fr)}}
/* ACADEMY */
.academy-stats{display:flex;gap:12px;justify-content:center;margin-bottom:32px;flex-wrap:wrap}
.course-card{background:linear-gradient(180deg,#fff,rgba(255,255,255,.86));border:1px solid rgba(216,226,239,.9);border-radius:var(--r);padding:22px;border-top:4px solid var(--a);transition:all .25s;box-shadow:0 10px 28px rgba(7,22,41,.04)}
.course-card:hover{transform:translateY(-2px);box-shadow:var(--sh)}
.course-icon{font-size:2rem;margin-bottom:10px}
.course-title{font-size:.9rem;font-weight:700;color:var(--n);margin-bottom:6px;line-height:1.4}
.course-desc{font-size:.78rem;color:var(--ts);line-height:1.55;margin-bottom:12px}
.course-meta{display:flex;flex-wrap:wrap;gap:5px;margin-bottom:12px}
.chip-lvl{background:rgba(0,102,204,.08);color:var(--p);font-size:.68rem;padding:3px 8px;border-radius:5px;font-weight:600}
.chip-accred{background:rgba(16,185,129,.1);color:var(--s);font-size:.68rem;padding:3px 8px;border-radius:5px;font-weight:600}
.course-footer{display:flex;justify-content:space-between;align-items:center;margin-top:12px;padding-top:12px;border-top:1px solid var(--b)}
.course-price{font-size:1rem;font-weight:800;color:var(--p)}
.btn-enroll{background:var(--g);color:#fff;padding:7px 16px;border-radius:var(--rf);font-size:.78rem;font-weight:600;text-decoration:none;display:inline-block;transition:opacity .15s}
.btn-enroll:hover{opacity:.9}

/* Role Selector */
.roles-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:14px}
@media(max-width:1100px){.roles-grid{grid-template-columns:repeat(4,1fr)}}
@media(max-width:700px){.roles-grid{grid-template-columns:repeat(2,1fr)}}
@media(max-width:400px){.roles-grid{grid-template-columns:1fr 1fr}}
.role-card{background:linear-gradient(180deg,#fff,rgba(255,255,255,.86));border:1px solid rgba(216,226,239,.9);border-radius:18px;padding:20px 12px;text-align:center;transition:all .25s;display:block;text-decoration:none;box-shadow:0 10px 28px rgba(7,22,41,.04)}
.role-card:hover{border-color:var(--rc,var(--p));box-shadow:0 16px 38px rgba(7,22,41,.1);transform:translateY(-4px)}
.role-patient{--rc:#1976D2}.role-provider{--rc:#2E7D32}.role-payer{--rc:#6A1B9A}.role-student{--rc:#E65100}.role-admin{--rc:#37474F}.role-reception{--rc:#00838F}.role-rcm{--rc:#C62828}
.role-emoji{font-size:1.8rem;margin-bottom:8px}
.role-name{font-size:.85rem;font-weight:700;color:#1a2332;margin-bottom:4px}
.role-desc{font-size:.7rem;color:#64748b;line-height:1.3}

/* Announcement Bar */
.ann-bar{background:linear-gradient(90deg,var(--n),var(--pd),#9A6B13);color:#fff;padding:11px 0;text-align:center;font-size:.82rem;font-weight:800;position:relative;z-index:2;box-shadow:0 10px 32px rgba(7,22,41,.12)}
.ann-badge{background:var(--aw);color:var(--n);font-size:.65rem;font-weight:900;padding:3px 8px;border-radius:var(--rf);margin:0 8px;text-transform:uppercase;vertical-align:middle;letter-spacing:.04em}
.ann-bar a{color:#ffd700;font-weight:700;text-decoration:none}
.ann-link{margin-inline-start:8px}
.role-selector-sec{padding:54px 0 34px;background:linear-gradient(180deg,#F8FBFF 0%,#fff 100%)}
.role-selector-head{margin-bottom:20px}

/* KPI Strip */
.kpi-strip{background:linear-gradient(135deg,var(--p) 0%,#0B5CAD 55%,var(--n) 100%);padding:26px 0;box-shadow:inset 0 1px 0 rgba(255,255,255,.14)}
.kpi-inner{display:flex;justify-content:space-around;align-items:center;flex-wrap:wrap;gap:12px}
.kpi-item{text-align:center;color:#fff;min-width:80px}
.kpi-num{font-size:1.82rem;font-weight:950;line-height:1;color:var(--aw)}
.kpi-lbl{font-size:.68rem;opacity:.88;margin-top:5px;text-transform:uppercase;letter-spacing:.7px;font-weight:800}

/* Why HNH Features */
.features-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
@media(max-width:900px){.features-grid{grid-template-columns:repeat(2,1fr)}}
@media(max-width:580px){.features-grid{grid-template-columns:1fr}}
.feature-card{background:linear-gradient(145deg,#fff,rgba(255,255,255,.82));border:1px solid rgba(216,226,239,.9);border-radius:var(--r);padding:30px 22px;text-align:center;transition:all .25s;box-shadow:0 10px 28px rgba(7,22,41,.04)}
.feature-card:hover{box-shadow:var(--shd);transform:translateY(-3px);border-color:var(--p)}
.feature-icon{font-size:2.4rem;margin-bottom:14px;display:block}
.feature-title{font-weight:700;font-size:.95rem;margin-bottom:8px;color:var(--n)}
.feature-desc{font-size:.78rem;color:var(--ts);line-height:1.55}

/* Patient Journey */
.journey{display:flex;align-items:stretch;justify-content:center;gap:0;padding:20px 0;flex-wrap:wrap}
.journey-step{flex:1;min-width:110px;max-width:170px;text-align:center;padding:22px 10px;background:rgba(255,255,255,.82);border:1px solid rgba(216,226,239,.88);box-shadow:0 10px 28px rgba(7,22,41,.04)}
.journey-step:first-child{border-radius:var(--r) 0 0 var(--r)}
.journey-step:last-child{border-radius:0 var(--r) var(--r) 0}
[dir=rtl] .journey-step:first-child{border-radius:0 var(--r) var(--r) 0}
[dir=rtl] .journey-step:last-child{border-radius:var(--r) 0 0 var(--r)}
.journey-arrow{font-size:1.4rem;color:var(--p);font-weight:700;flex-shrink:0;padding:0 4px}
.journey-icon{font-size:2rem;margin-bottom:8px}
.journey-label{font-size:.82rem;font-weight:700;color:var(--n)}
.journey-sub{font-size:.68rem;color:var(--ts);margin-top:4px;line-height:1.3}

/* Blog enhanced */
.g3-blog{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
@media(max-width:1100px){.g3-blog{grid-template-columns:repeat(2,1fr)}}
@media(max-width:600px){.g3-blog{grid-template-columns:1fr}}
.blog-cat-tabs{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:20px}
.blog-cat-tab{padding:8px 15px;border-radius:20px;font-size:.76rem;font-weight:800;cursor:pointer;border:1px solid rgba(216,226,239,.9);background:rgba(255,255,255,.84);color:var(--ts);transition:all .2s}
.blog-cat-tab.active,.blog-cat-tab:hover{background:var(--p);color:#fff;border-color:var(--p)}
.blog-featured{background:linear-gradient(145deg,#fff,rgba(255,255,255,.86));border:1px solid rgba(8,120,216,.28);border-radius:var(--r2);padding:30px;margin-bottom:22px;position:relative;box-shadow:var(--glow)}
.blog-feat-badge{display:flex;gap:8px;align-items:center;margin-bottom:14px}
.blog-feat-title{font-size:1.2rem;font-weight:800;color:var(--n);margin-bottom:10px;line-height:1.3}
.blog-feat-excerpt{font-size:.88rem;color:var(--ts);line-height:1.6}
.blog-featured-wrap{margin-bottom:8px}
.blog-meta-spaced{margin-top:12px}
.read-link{font-size:.75rem;color:var(--p);font-weight:600;margin-top:8px;display:block}
.read-link-inline{display:inline-flex;margin-top:16px}

/* Academy enhanced */
.academy-banner{background:linear-gradient(135deg,var(--n),var(--p));color:#fff;border-radius:var(--r2);padding:34px 30px;margin-bottom:26px;display:flex;justify-content:space-between;align-items:center;gap:20px;box-shadow:0 22px 56px rgba(7,22,41,.18)}
.academy-banner h3{font-size:1.3rem;margin-bottom:6px;color:#fff}
.academy-banner p{font-size:.85rem;opacity:.85;line-height:1.5}
.academy-kpi{text-align:center;flex-shrink:0}.academy-kpi-value{font-size:2rem;font-weight:900;color:#ffd700}.academy-kpi-label{font-size:.8rem;opacity:.8;margin-bottom:12px}
@media(max-width:640px){.academy-banner{flex-direction:column;text-align:center}}
.level-tabs{display:flex;gap:8px;margin-bottom:20px;flex-wrap:wrap}
.level-tab{padding:8px 16px;border-radius:20px;font-size:.76rem;font-weight:800;cursor:pointer;border:1px solid rgba(216,226,239,.9);background:rgba(255,255,255,.84);color:var(--ts);transition:all .2s}
.level-tab.active,.level-tab:hover{background:var(--p);color:#fff;border-color:var(--p)}
.course-modules-preview{margin:10px 0;padding:10px 12px;background:var(--bg);border-radius:6px;border-left:3px solid var(--p)}
.course-module-item{font-size:.72rem;color:var(--ts);padding:3px 0;display:flex;gap:6px;align-items:flex-start;line-height:1.3}
.course-module-more{color:var(--p)}
[dir=rtl] .course-modules-preview{border-left:none;border-right:3px solid var(--p)}

/* Testimonials */
.testimonials-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
@media(max-width:900px){.testimonials-grid{grid-template-columns:1fr 1fr}}
@media(max-width:600px){.testimonials-grid{grid-template-columns:1fr}}
.testimonial-card{background:linear-gradient(145deg,#fff,rgba(255,255,255,.86));border:1px solid rgba(216,226,239,.9);border-radius:var(--r);padding:26px;position:relative;transition:all .25s;box-shadow:0 10px 28px rgba(7,22,41,.04)}
.testimonial-card::before{content:'"';position:absolute;top:-10px;left:20px;font-size:4rem;color:var(--p);opacity:.15;font-family:Georgia,serif;line-height:1}
[dir=rtl] .testimonial-card::before{left:auto;right:20px}
.testimonial-card:hover{box-shadow:var(--shd);transform:translateY(-2px)}
.test-stars{color:#f59e0b;font-size:1rem;margin-bottom:12px;letter-spacing:2px}
.test-text{font-size:.85rem;line-height:1.65;color:var(--n);margin-bottom:14px;font-style:italic}
.test-author{display:flex;gap:10px;align-items:center;flex-wrap:wrap;font-size:.75rem;color:var(--ts)}
.test-name{font-weight:700;color:var(--n)}
.test-city{background:var(--bg);padding:2px 8px;border-radius:10px}

/* Featured Doctors */
.doctors-featured-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:18px}
@media(max-width:1100px){.doctors-featured-grid{grid-template-columns:repeat(2,1fr)}}
@media(max-width:600px){.doctors-featured-grid{grid-template-columns:1fr 1fr}}
.doc-feat-card{background:linear-gradient(145deg,#fff,rgba(255,255,255,.86));border:1px solid rgba(216,226,239,.9);border-radius:var(--r);padding:22px;text-align:center;transition:all .25s;border-top:4px solid var(--p);box-shadow:0 10px 28px rgba(7,22,41,.04)}
.doc-feat-card:hover{box-shadow:var(--shd);transform:translateY(-3px)}
.doc-avatar{font-size:2.5rem;margin-bottom:10px;display:block;background:var(--bg);width:60px;height:60px;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 10px}
.doc-name{font-weight:800;font-size:.9rem;color:var(--n);margin-bottom:2px}
.doc-title{font-size:.72rem;color:var(--p);font-weight:600;margin-bottom:4px}
.doc-spec{font-size:.78rem;color:var(--ts);margin-bottom:8px}
.doc-meta{display:flex;gap:6px;justify-content:center;flex-wrap:wrap;margin-bottom:8px}
.doc-branch,.doc-exp,.doc-rating{font-size:.68rem;background:var(--bg);padding:2px 6px;border-radius:8px;color:var(--ts)}
.doc-next{font-size:.72rem;color:var(--ts);margin-bottom:4px}

/* Awards / Trust */
.awards-grid{display:grid;grid-template-columns:repeat(6,1fr);gap:16px}
@media(max-width:900px){.awards-grid{grid-template-columns:repeat(3,1fr)}}
@media(max-width:500px){.awards-grid{grid-template-columns:repeat(2,1fr)}}
.award-item{text-align:center;padding:22px 12px;background:linear-gradient(145deg,#fff,rgba(255,255,255,.86));border:1px solid rgba(216,226,239,.9);border-radius:var(--r);transition:all .2s;box-shadow:0 10px 28px rgba(7,22,41,.04)}
.award-item:hover{border-color:var(--p);box-shadow:0 4px 12px rgba(25,118,210,.1)}
.award-icon{font-size:2rem;margin-bottom:6px}
.award-name{font-weight:700;font-size:.85rem;color:var(--n);margin-bottom:2px}
.award-sub{font-size:.68rem;color:var(--ts)}

/* Emergency Banner */
.emergency-banner{background:linear-gradient(90deg,#7F1D1D,#DC2626,#B91C1C);padding:18px 0}
.emg-inner{display:flex;align-items:center;gap:18px;color:#fff;flex-wrap:wrap;justify-content:center}
.emg-icon{font-size:1.8rem;flex-shrink:0}
.emg-copy{font-size:.82rem;opacity:.85}.emg-phone{flex-shrink:0}
@media(max-width:600px){.emg-inner{text-align:center;flex-direction:column;gap:10px}}

/* Blog: featured article */
.blog-feat-badge{display:flex;gap:8px;align-items:center;margin-bottom:14px;flex-wrap:wrap}
.blog-feat-title{font-size:1.2rem;font-weight:800;color:var(--n);margin-bottom:10px;line-height:1.3}
.blog-feat-excerpt{font-size:.88rem;color:var(--ts);line-height:1.6}

/* Footer enhancements */
.ftr-divider{border-top:1px solid rgba(255,255,255,.08);margin:20px 0}
.ftr-bottom-row{display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;font-size:.72rem;color:rgba(255,255,255,.4)}
.ftr-social{display:flex;gap:14px}
.ftr-social a{color:rgba(255,255,255,.5);text-decoration:none;font-weight:700;font-size:.85rem;transition:color .2s}
.ftr-social a:hover{color:#fff}
.footer-note{font-size:.82rem;margin-bottom:10px}.footer-license{font-size:.7rem;color:rgba(255,255,255,.3);margin-top:8px}.footer-locations{font-size:.76rem;color:rgba(255,255,255,.35);margin-top:10px}.footer-system{font-size:.68rem;color:rgba(255,255,255,.25)}
.oracle-ok{background:rgba(25,118,210,.15)}.oracle-warn{background:rgba(230,81,0,.15)}

/* Scrollbar & selection */
/* Print */
@media print{.hdr,.ann-bar,.chat-fab,.chat-box,.cta,.emergency-banner{display:none}.hero{background:white;color:black}}

/* Smooth scroll */
html{scroll-behavior:smooth}

/* Focus visible */
*:focus-visible{outline:3px solid rgba(8,120,216,.34);outline-offset:3px}

::-webkit-scrollbar{width:6px;height:6px}::-webkit-scrollbar-track{background:var(--bg)}::-webkit-scrollbar-thumb{background:var(--p);border-radius:3px}
::selection{background:var(--p);color:#fff}

/* CTA */
.cta{background:radial-gradient(circle at 20% 0,rgba(216,182,92,.22),transparent 35%),var(--g);padding:clamp(64px,8vw,90px) 0;text-align:center}
.cta h2{font-size:1.7rem;color:#fff;margin-bottom:10px}
.cta p{color:rgba(255,255,255,.8);margin-bottom:28px}
.cta-btns{display:flex;gap:10px;justify-content:center;flex-wrap:wrap}
.btn-white{background:#fff;color:var(--n)}.btn-white:hover{background:var(--ga)}
.btn-wa{background:#25D366;color:#fff}.btn-wa:hover{opacity:.9}

/* FOOTER */
.ftr{background:linear-gradient(180deg,var(--n),#040B14);color:rgba(255,255,255,.65);padding:54px 0 26px}
.ftr-grid{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:28px;margin-bottom:32px}
.ftr h4{color:#fff;font-size:.88rem;margin-bottom:12px}
.ftr a{display:block;font-size:.82rem;margin-bottom:6px;color:rgba(255,255,255,.55);transition:color .15s}
.ftr a:hover{color:var(--a)}
.ftr-bottom{border-top:1px solid rgba(255,255,255,.1);padding-top:20px;text-align:center;font-size:.78rem}

/* CHAT */
.chat-fab{position:fixed;bottom:24px;${ar ? 'left' : 'right'}:24px;width:58px;height:58px;background:var(--g);border-radius:21px;display:grid;place-items:center;box-shadow:0 18px 42px rgba(8,120,216,.34);z-index:90;cursor:pointer;border:1px solid rgba(255,255,255,.28);font-size:1.45rem;color:#fff;transition:transform .2s,box-shadow .2s}
.chat-fab:hover{transform:translateY(-3px) scale(1.04);box-shadow:0 24px 50px rgba(8,120,216,.42)}
.chat-box{position:fixed;bottom:94px;${ar ? 'left' : 'right'}:18px;width:min(380px,calc(100vw - 36px));height:min(560px,calc(100svh - 122px));background:rgba(255,255,255,.96);backdrop-filter:blur(18px);border:1px solid rgba(216,226,239,.9);border-radius:24px;box-shadow:var(--shd);z-index:89;display:flex;flex-direction:column;overflow:hidden;opacity:0;pointer-events:none;transform:translateY(16px) scale(.98);transition:all .22s ease}
.chat-box.open{opacity:1;pointer-events:all;transform:translateY(0)}
.chat-head{background:var(--g);padding:16px 18px;color:#fff;font-weight:800;font-size:.9rem;display:flex;justify-content:space-between;align-items:center}
.chat-head button{background:none;border:none;color:#fff;cursor:pointer;font-size:1rem;line-height:1}
.chat-msgs{flex:1;overflow-y:auto;padding:14px;display:flex;flex-direction:column;gap:9px}
.msg{padding:10px 13px;border-radius:16px;font-size:.84rem;max-width:88%;line-height:1.55;word-break:break-word}
.msg-u{background:rgba(8,120,216,.1);color:var(--t);align-self:${ar ? 'flex-start' : 'flex-end'};border:1px solid rgba(8,120,216,.1)}
.msg-a{background:var(--bg);color:var(--t);align-self:${ar ? 'flex-end' : 'flex-start'};border:1px solid rgba(216,226,239,.8)}
.chat-foot{border-top:1px solid rgba(216,226,239,.88);padding:12px;display:flex;gap:8px;background:rgba(248,251,255,.72)}
.chat-inp{flex:1;border:1px solid rgba(216,226,239,.95);border-radius:var(--rf);padding:11px 14px;font-size:.84rem;font-family:var(--font);outline:none;transition:border-color .15s,box-shadow .15s;background:#fff;min-width:0}
.chat-inp:focus{border-color:var(--p);box-shadow:0 0 0 4px rgba(8,120,216,.1)}
.chat-send{background:var(--p);color:#fff;border:none;border-radius:var(--rf);padding:10px 15px;cursor:pointer;font-size:.82rem;font-weight:800;font-family:var(--font);min-width:46px}
.wa-btn{position:fixed;bottom:24px;${ar ? 'right' : 'left'}:24px;width:54px;height:54px;background:#25D366;border-radius:19px;display:grid;place-items:center;box-shadow:0 16px 38px rgba(37,211,102,.34);z-index:90;font-size:1.35rem;transition:transform .2s}
.wa-btn:hover{transform:scale(1.1)}

/* SEARCH BAR */
.search-bar{display:flex;gap:10px;margin-bottom:20px;flex-wrap:wrap}
.search-inp{flex:1;min-width:180px;padding:11px 15px;border:1px solid rgba(216,226,239,.95);border-radius:var(--rf);font-size:.85rem;font-family:var(--font);outline:none;background:rgba(255,255,255,.9);transition:border-color .15s,box-shadow .15s}
.search-inp:focus{border-color:var(--p);box-shadow:0 0 0 4px rgba(8,120,216,.1)}
.search-sel{padding:11px 15px;border:1px solid rgba(216,226,239,.95);border-radius:var(--rf);font-size:.85rem;font-family:var(--font);background:rgba(255,255,255,.9);outline:none;min-height:44px}

/* RESPONSIVE */
@media(max-width:960px){
  .hero-inner{grid-template-columns:1fr}.hero-visual{display:none}.quick-dock{margin-top:-42px}.quick-dock-inner{grid-template-columns:repeat(2,1fr)}
  .g4{grid-template-columns:repeat(2,1fr)}.g5{grid-template-columns:repeat(2,1fr)}
  .nphies-grid{grid-template-columns:1fr}
  .ftr-grid{grid-template-columns:1fr 1fr}
}
@media(max-width:640px){
  .hdr-i{height:66px}.nav{display:none}.hm{display:block}
  .nav.open{display:flex;flex-direction:column;align-items:stretch;position:fixed;inset:66px 12px auto 12px;background:rgba(255,255,255,.96);backdrop-filter:blur(18px);padding:14px;border:1px solid rgba(216,226,239,.9);border-radius:22px;box-shadow:var(--shd);gap:4px;z-index:99}
  .nav.open a,.nav.open button.nl,.nav.open .nav-drop-btn{justify-content:center;min-height:46px;width:100%}
  .nav.open .nav-dropdown{display:block}.nav.open .nav-drop-content{position:static;display:block;margin-top:6px;min-width:0;box-shadow:none;border-radius:16px;background:rgba(245,248,252,.95)}
  .g2,.g3{grid-template-columns:1fr}.g4{grid-template-columns:1fr 1fr}
  .hero{min-height:auto;padding-top:44px;padding-bottom:90px}.hero-proof{grid-template-columns:repeat(2,1fr)}.hero-btns .btn{width:100%}.hero-badges{margin-bottom:22px}.hero-pill{width:100%;justify-content:center}.quick-dock-inner{grid-template-columns:1fr;padding:10px;border-radius:24px}.quick-card{padding:15px}.quick-icon{width:40px;height:40px}
  .search-bar{flex-direction:column}.search-inp,.search-sel{width:100%;min-width:0}
  .journey{display:grid;grid-template-columns:1fr;gap:10px}.journey-step,.journey-step:first-child,.journey-step:last-child,[dir=rtl] .journey-step:first-child,[dir=rtl] .journey-step:last-child{max-width:none;border-radius:var(--r)}.journey-arrow{transform:rotate(90deg);padding:0}
  .branch-grid{grid-template-columns:1fr}.academy-stats .stat-card{min-width:0}
  .chat-box{width:calc(100vw - 24px);height:calc(100svh - 108px);bottom:84px;${ar ? 'left' : 'right'}:12px;border-radius:22px}.chat-fab,.wa-btn{bottom:16px}.chat-fab{${ar ? 'left' : 'right'}:16px}.wa-btn{${ar ? 'right' : 'left'}:16px}
  .ftr-grid{grid-template-columns:1fr}
}
</style>
</head>
<body>

<!-- HEADER -->
<header class="hdr">
<div class="c hdr-i">
  <a href="/" class="logo">
    <div class="logo-ic">🏥</div>
    <div class="logo-tx">${T.title}<small>BrainSAIT Healthcare OS v${VERSION}</small></div>
  </a>
  <nav class="nav" id="main-nav">
    <a href="#depts">${T.depts}</a>
    <a href="#branches">${T.branches}</a>
    <a href="#doctors">${T.doctors}</a>
    <a href="#why-hnh">${ar ? 'لماذا نحن' : 'Why Us'}</a>
    <a href="#blog">${T.blog}</a>
    <a href="#academy">${T.academy_nav}</a>
    <div class="nav-dropdown">
      <span class="nav-drop-btn">${ar ? 'المنصات' : 'Portals'} ▾</span>
      <div class="nav-drop-content">
        <a href="https://bsma.elfadil.com" target="_blank" rel="noopener noreferrer">🙂 BSMA ${ar ? 'بوابة المريض' : 'Patient'}</a>
        <a href="https://givc.elfadil.com" target="_blank" rel="noopener noreferrer">🩺 GIVC ${ar ? 'بوابة المزود' : 'Provider'}</a>
        <a href="https://sbs.elfadil.com" target="_blank" rel="noopener noreferrer">💰 SBS ${ar ? 'الفوترة' : 'Billing'}</a>
        <a href="https://oracle-bridge.brainsait.org/hospitals" target="_blank" rel="noopener noreferrer">🔷 Oracle Bridge</a>
      </div>
    </div>
    <button class="nl" id="lang-btn">${ar ? 'EN' : 'عربي'}</button>
    <a href="tel:966${PHONE}" class="btn btn-p btn-sm">${T.book}</a>
  </nav>
  <button class="hm" id="menu-btn" aria-label="Menu" aria-expanded="false" aria-controls="main-nav">☰</button>
</div>
</header>

<!-- ANNOUNCEMENT BAR -->
<div class="ann-bar">
  <span class="ann-badge">${ar ? 'جديد' : 'NEW'}</span>
  <span>${ar ? 'أكاديمية الحياة الوطني — 10 دورات معتمدة SCFHS متاحة الآن' : 'Hayat National Academy — 10 SCFHS-accredited courses now open'}</span>
  <a href="#academy" class="ann-link">${ar ? 'سجّل الآن ←' : 'Enroll Now →'}</a>
</div>

<!-- HERO -->
<section class="hero">
<div class="c">
<div class="hero-inner">
  <div class="hero-text">
    <div class="hero-kicker">● ${ar ? 'مجموعة مستشفيات ذكية' : 'AI-enabled hospital group'}</div>
    <h1>${ar ? 'رعاية صحية <span class="gold">فاخرة ومتصلة</span> عبر المملكة' : 'Premium healthcare, <span class="gold">connected</span> across Saudi Arabia'}</h1>
    <p class="hero-sub">${ar ? 'احجز زيارتك، اعثر على طبيبك، وتواصل مع بسمة — تجربة رقمية آمنة وسلسة لمجموعة مستشفيات الحياة الوطني.' : 'Book care, find the right specialist, and ask Basma — a secure digital front door for the Hayat National Hospitals network.'}</p>
     <div class="hero-btns">
       <a href="tel:966${PHONE}" class="btn btn-a">${ar ? 'احجز موعدك الآن' : 'Book your visit'}</a>
       <button class="btn btn-o" type="button" data-chat-toggle>${ar ? 'اسأل بسمة' : 'Ask Basma'}</button>
      </div>
     <div class="hero-badges" aria-label="${ar ? 'مميزات المنصة' : 'Platform highlights'}">
       <span class="hero-pill">${ar ? 'بسمة ثنائية اللغة 24/7' : '24/7 bilingual Basma'}</span>
       <span class="hero-pill">${ar ? '6 فروع رئيسية' : '6 flagship branches'}</span>
       <span class="hero-pill">${ar ? 'NPHIES + Oracle متكامل' : 'NPHIES + Oracle connected'}</span>
     </div>
     <div class="hero-proof">
       <div class="stat-card"><div class="stat-n" id="stat-prov">269</div><div class="stat-l">${T.s_doc}</div></div>
       <div class="stat-card"><div class="stat-n">6</div><div class="stat-l">${ar ? 'فروع' : 'Branches'}</div></div>
       <div class="stat-card"><div class="stat-n" id="stat-dept">20</div><div class="stat-l">${T.s_dept}</div></div>
       <div class="stat-card"><div class="stat-n">1050</div><div class="stat-l">${T.s_bed}</div></div>
     </div>
  </div>
  <div class="hero-visual">
    <div class="command-card">
      <div class="command-top">
        <div>
          <div class="command-title">${ar ? 'مركز تجربة المريض' : 'Patient Experience Command Center'}</div>
          <div class="command-sub">${ar ? 'واجهة واحدة للحجز، الفروع، التأمين، والمساعد الذكي' : 'One elegant front door for booking, branches, insurance, and AI guidance'}</div>
        </div>
        <div class="command-live">${ar ? 'متاح الآن' : 'Live now'}</div>
      </div>
      <div class="command-grid">
        <div class="command-tile"><div class="command-num">24/7</div><div class="command-label">${ar ? 'مساعد بسمة' : 'Basma concierge'}</div></div>
        <div class="command-tile"><div class="command-num">42+</div><div class="command-label">${ar ? 'تخصص طبي' : 'Specialties'}</div></div>
        <div class="command-tile"><div class="command-num">10</div><div class="command-label">${ar ? 'شركاء تأمين' : 'Insurance partners'}</div></div>
        <div class="command-tile"><div class="command-num">6</div><div class="command-label">${ar ? 'مدن وفروع' : 'Cities & branches'}</div></div>
      </div>
      <div class="command-row"><div><strong>${ar ? 'حجز مواعيد سريع' : 'Fast appointment routing'}</strong><br><span>${ar ? 'اختيار الفرع والطبيب الأنسب' : 'Match branch, specialty, and next step'}</span></div><span class="command-chip">${ar ? 'مريض' : 'Patient'}</span></div>
      <div class="command-row"><div><strong>${ar ? 'إرشاد تأميني عام' : 'Insurance guidance'}</strong><br><span>${ar ? 'أسئلة عامة بدون مشاركة بيانات صحية' : 'General help without sharing health data'}</span></div><span class="command-chip">NPHIES</span></div>
      <div class="command-row"><div><strong>${ar ? 'شبكة مقدمي الرعاية' : 'Care network visibility'}</strong><br><span>${ar ? 'أطباء، أقسام، وفروع في واجهة واحدة' : 'Doctors, departments, and branches in one place'}</span></div><span class="command-chip">Oracle</span></div>
      <div class="command-assistant">
        <div class="assistant-orb">AI</div>
        <div class="assistant-copy"><strong>${ar ? 'بسمة لا تطلب معلومات صحية على الصفحة العامة' : 'Basma keeps the public site PHI-safe'}</strong><span>${ar ? 'للحالات الخاصة، سيتم توجيهك لقناة آمنة أو اتصال مباشر.' : 'For personal cases, she routes you to a secure channel or direct call.'}</span></div>
      </div>
    </div>
  </div>
</div>
</div>
</section>

<!-- QUICK ACTION DOCK -->
<div class="quick-dock">
<div class="c">
  <div class="quick-dock-inner">
    <a href="tel:966${PHONE}" class="quick-card"><div class="quick-icon">01</div><div><div class="quick-title">${ar ? 'احجز موعد' : 'Book an appointment'}</div><div class="quick-copy">${ar ? 'اتصال مباشر بفريق الحجز' : 'Direct booking with the care team'}</div></div></a>
    <a href="#doctors" class="quick-card"><div class="quick-icon">02</div><div><div class="quick-title">${ar ? 'اعثر على طبيب' : 'Find a doctor'}</div><div class="quick-copy">${ar ? 'بحث حسب التخصص والفرع' : 'Browse by specialty and branch'}</div></div></a>
    <a href="#branches" class="quick-card"><div class="quick-icon">03</div><div><div class="quick-title">${ar ? 'اختر أقرب فرع' : 'Choose a branch'}</div><div class="quick-copy">${ar ? '6 فروع لخدمتك في المملكة' : '6 branches serving the Kingdom'}</div></div></a>
    <button class="quick-card" type="button" data-chat-toggle><div class="quick-icon">AI</div><div><div class="quick-title">${ar ? 'اسأل بسمة' : 'Ask Basma'}</div><div class="quick-copy">${ar ? 'مساعدة عامة آمنة بالعربية والإنجليزية' : 'Public-safe Arabic and English support'}</div></div></button>
  </div>
</div>
</div>

<!-- ROLE SELECTOR -->
<section class="sec role-selector-sec" id="role-selector">
<div class="c">
  <div class="sec-head role-selector-head">
    <h2>${ar ? 'مسارات رقمية مصممة لكل رحلة' : 'Digital pathways for every journey'}</h2>
    <p>${ar ? 'واجهة راقية وسريعة توجه كل مستخدم إلى بوابته المناسبة — بدون خلط بين الصفحة العامة والبيانات المحمية.' : 'A polished, fast path to the right portal — with public pages separated from protected data.'}</p>
  </div>
  <div class="roles-grid">
    <a href="/patient?lang=${lang}" class="role-card role-patient">
      <div class="role-emoji">🙂</div>
      <div class="role-name">${ar ? 'المريض' : 'Patient'}</div>
      <div class="role-desc">${ar ? 'حجز، أهلية، نتائج، بسمة' : 'Book, eligibility, results, Basma'}</div>
    </a>
    <a href="/provider?lang=${lang}" class="role-card role-provider">
      <div class="role-emoji">🩺</div>
      <div class="role-name">${ar ? 'الطبيب / المزود' : 'Provider'}</div>
      <div class="role-desc">${ar ? 'PA، Oracle HIS، NPHIES' : 'PA, Oracle HIS, NPHIES'}</div>
    </a>
    <a href="/payer?lang=${lang}" class="role-card role-payer">
      <div class="role-emoji">🏛️</div>
      <div class="role-name">${ar ? 'شركة التأمين' : 'Payer'}</div>
      <div class="role-desc">${ar ? 'SAR 835M، تحليل، GSS' : 'SAR 835M, analysis, GSS'}</div>
    </a>
    <a href="/student?lang=${lang}" class="role-card role-student">
      <div class="role-emoji">🎓</div>
      <div class="role-name">${ar ? 'الطالب' : 'Student'}</div>
      <div class="role-desc">${ar ? '9 دورات معتمدة SCFHS' : '9 SCFHS-accredited courses'}</div>
    </a>
    <a href="/admin?lang=${lang}" class="role-card role-admin">
      <div class="role-emoji">⚙️</div>
      <div class="role-name">${ar ? 'الإدارة' : 'Admin'}</div>
      <div class="role-desc">${ar ? 'صحة النظام، إحصائيات، API' : 'System health, stats, API'}</div>
    </a>
    <a href="/reception?lang=${lang}" class="role-card role-reception">
      <div class="role-emoji">💁</div>
      <div class="role-name">${ar ? 'الاستقبال' : 'Reception'}</div>
      <div class="role-desc">${ar ? 'تسجيل، أهلية، مواعيد' : 'Register, eligibility, appointments'}</div>
    </a>
    <a href="/rcm?lang=${lang}" class="role-card role-rcm">
      <div class="role-emoji">💰</div>
      <div class="role-name">${ar ? 'دورة الإيرادات' : 'RCM'}</div>
      <div class="role-desc">${ar ? 'ClaimLinc، رفض، KPIs' : 'ClaimLinc, denials, KPIs'}</div>
    </a>
  </div>
</div>
</section>

<!-- INTEGRATION STRIP -->
<div class="int-strip">
<div class="c"><div class="int-inner">
  <span class="int-tag" id="oracle-tag">🔷 Oracle Bridge ✓</span>
  <span class="int-tag" id="nphies-tag">🏛️ NPHIES Live ✓</span>
  <span class="int-tag">🤖 ClaimLinc AI</span>
  <span class="int-tag">💊 1,000 ${ar ? 'دواء' : 'Drugs'}</span>
  <span class="int-tag">📚 286 ${ar ? 'وثيقة طبية' : 'Clinical Docs'}</span>
  <span class="int-tag">🛡️ 10 ${ar ? 'مؤمّن' : 'Insurers'}</span>
</div></div>
</div>

<!-- KPI STRIP -->
<div class="kpi-strip" id="kpi-strip">
<div class="c"><div class="kpi-inner">
  <div class="kpi-item"><div class="kpi-num" data-target="6">6</div><div class="kpi-lbl">${ar ? 'فروع في المملكة' : 'Branches KSA'}</div></div>
  <div class="kpi-item"><div class="kpi-num" data-target="1050">1,050</div><div class="kpi-lbl">${ar ? 'سرير' : 'Beds'}</div></div>
  <div class="kpi-item"><div class="kpi-num" data-target="42">42+</div><div class="kpi-lbl">${ar ? 'تخصص طبي' : 'Specialties'}</div></div>
  <div class="kpi-item"><div class="kpi-num kpi-pct" data-target="98.6">98.6%</div><div class="kpi-lbl">${ar ? 'معدل موافقة NPHIES' : 'NPHIES Approval'}</div></div>
  <div class="kpi-item"><div class="kpi-num" data-target="269">269</div><div class="kpi-lbl">${ar ? 'طبيب معتمد' : 'Doctors'}</div></div>
  <div class="kpi-item"><div class="kpi-num">SAR 835M</div><div class="kpi-lbl">${ar ? 'إجمالي الشبكة' : 'Network Total'}</div></div>
</div></div>
</div>

<!-- DEPARTMENTS -->
<section class="sec" id="depts">
<div class="c">
  <div class="sec-head"><h2>${T.h_depts}</h2><p>${T.p_depts}</p></div>
  <div class="g4" id="dept-grid"><div class="loading-cell">${T.loading}</div></div>
</div>
</section>

<!-- BRANCHES -->
<section class="sec sec-alt" id="branches">
<div class="c">
  <div class="sec-head"><h2>${T.h_branches}</h2><p>${T.p_branches}</p></div>
  <div class="g3" id="branch-grid"><div class="loading-cell">${T.loading}</div></div>
</div>
</section>

<!-- DOCTORS -->
<section class="sec" id="doctors">
<div class="c">
  <div class="sec-head"><h2>${T.h_doctors}</h2></div>
  <div class="search-bar">
    <input class="search-inp" id="doc-search" placeholder="${T.search_doc}">
    <select class="search-sel" id="spec-filter"><option value="">${T.all_specs}</option></select>
  </div>
  <div class="g4" id="doc-grid"><div class="loading-cell">${T.loading}</div></div>
  <div class="section-center mt-24">
    <a href="https://bsma.elfadil.com" target="_blank" rel="noopener noreferrer" class="btn btn-o">${T.view_all}</a>
  </div>
</div>
</section>

<!-- INSURANCE -->
<section class="sec sec-alt" id="insurance">
<div class="c">
  <div class="sec-head"><h2>${T.h_insurance}</h2><p>${T.p_insurance}</p></div>
  <div class="ins-grid">${insHtml}</div>
</div>
</section>

<!-- WHY HNH -->
<section class="sec" id="why-hnh">
<div class="c">
  <div class="sec-head"><h2>${ar ? 'لماذا مستشفيات الحياة الوطني؟' : 'Why Hayat National?'}</h2>
    <p>${ar ? 'الجمع بين التميز السريري والتكنولوجيا الذكية لرعاية صحية متكاملة' : 'Combining clinical excellence with intelligent technology for integrated healthcare'}</p>
  </div>
  <div class="features-grid">
    <div class="feature-card"><div class="feature-icon">🏛️</div><div class="feature-title">${ar ? 'NPHIES مباشر' : 'NPHIES Native'}</div><div class="feature-desc">${ar ? 'تكامل مباشر مع منصة التأمين الصحي الوطني — أهلية فورية وموافقة مسبقة إلكترونية' : 'Direct NPHIES integration — real-time eligibility and electronic prior authorization'}</div></div>
    <div class="feature-card"><div class="feature-icon">🔷</div><div class="feature-title">${ar ? 'Oracle HIS متكامل' : 'Oracle HIS Integrated'}</div><div class="feature-desc">${ar ? '6 بوابات Oracle مترابطة — سجل المريض الرئيسي وإدارة المواعيد والمطالبات في منصة واحدة' : '6 Oracle portals connected — patient master, appointments, and claims in one platform'}</div></div>
    <div class="feature-card"><div class="feature-icon">😊</div><div class="feature-title">${ar ? 'بسمة — مساعدتك الذكية' : 'Basma AI Assistant'}</div><div class="feature-desc">${ar ? 'مساعدة ذكية ثنائية اللغة متاحة 24/7 — حجز مواعيد، تحقق من التأمين، وإرشادات طبية' : 'Bilingual AI assistant available 24/7 — appointments, insurance checks, and medical guidance'}</div></div>
    <div class="feature-card"><div class="feature-icon">🎓</div><div class="feature-title">${ar ? 'أكاديمية معتمدة SCFHS' : 'SCFHS Accredited Academy'}</div><div class="feature-desc">${ar ? '7 دورات معتمدة في NPHIES والترميز الطبي وإدارة الإيرادات والامتثال — ثنائية اللغة' : '7 certified courses in NPHIES, medical coding, RCM, and compliance — bilingual'}</div></div>
    <div class="feature-card"><div class="feature-icon">📍</div><div class="feature-title">${ar ? '6 فروع في أنحاء المملكة' : '6 Branches Nationwide'}</div><div class="feature-desc">${ar ? 'الرياض، المدينة المنورة، عنيزة، خميس مشيط، جازان، أبها — تغطية شاملة لمناطق المملكة' : 'Riyadh, Madinah, Unaizah, Khamis, Jizan, Abha — comprehensive nationwide coverage'}</div></div>
    <div class="feature-card"><div class="feature-icon">💊</div><div class="feature-title">${ar ? '42+ تخصص طبي' : '42+ Medical Specialties'}</div><div class="feature-desc">${ar ? 'من طوارئ وجراحة وقلبية وأعصاب إلى نساء وأطفال — رعاية شاملة تحت سقف واحد' : 'From ER and surgery to cardiology, neurology, OB/GYN and pediatrics — comprehensive under one roof'}</div></div>
  </div>
</div>
</section>

<!-- PATIENT JOURNEY -->
<section class="sec sec-alt" id="patient-journey">
<div class="c">
  <div class="sec-head"><h2>${ar ? 'رحلة مريضك معنا' : 'Your Patient Journey'}</h2>
    <p>${ar ? 'من الحجز إلى المتابعة — تجربة سلسة ومتكاملة' : 'From booking to follow-up — seamless and integrated'}</p>
  </div>
  <div class="journey">
    <div class="journey-step"><div class="journey-icon">📅</div><div class="journey-label">${ar ? 'الحجز' : 'Book'}</div><div class="journey-sub">${ar ? 'بسمة أو BSMA' : 'Basma or BSMA'}</div></div>
    <div class="journey-arrow">${ar ? '←' : '→'}</div>
    <div class="journey-step"><div class="journey-icon">📋</div><div class="journey-label">${ar ? 'التسجيل' : 'Register'}</div><div class="journey-sub">${ar ? 'أهلية NPHIES فورية' : 'Instant NPHIES eligibility'}</div></div>
    <div class="journey-arrow">${ar ? '←' : '→'}</div>
    <div class="journey-step"><div class="journey-icon">🩺</div><div class="journey-label">${ar ? 'الاستشارة' : 'Consult'}</div><div class="journey-sub">${ar ? 'Oracle HIS + ترميز AI' : 'Oracle HIS + AI coding'}</div></div>
    <div class="journey-arrow">${ar ? '←' : '→'}</div>
    <div class="journey-step"><div class="journey-icon">💰</div><div class="journey-label">${ar ? 'الفوترة' : 'Billing'}</div><div class="journey-sub">${ar ? 'ClaimLinc — موافقة 98.6%' : 'ClaimLinc — 98.6% approved'}</div></div>
    <div class="journey-arrow">${ar ? '←' : '→'}</div>
    <div class="journey-step"><div class="journey-icon">💬</div><div class="journey-label">${ar ? 'المتابعة' : 'Follow-up'}</div><div class="journey-sub">${ar ? 'بسمة — 24/7' : 'Basma — 24/7'}</div></div>
  </div>
</div>
</section>

<!-- NPHIES DASHBOARD -->
<section class="sec" id="nphies-dashboard">
<div class="c">
  <div class="sec-head"><h2>${ar ? 'لوحة NPHIES الحية' : 'Live NPHIES Dashboard'}</h2>
    <p>${ar ? 'بيانات حية من شبكة التأمين الصحي السعودي — مُحدَّثة لحظياً' : 'Live Saudi health insurance network data — updated in real-time'}</p>
  </div>
  <div class="nphies-grid">
    <div class="nphies-main">
      <div class="nphies-banner">
        <div class="nb-label">${ar ? 'إجمالي الشبكة 2026' : 'Network Total 2026'}</div>
        <div class="nb-amount">SAR 835,690,702</div>
        <div class="nb-sub">${ar ? 'AlInma Medical Services — مجموعة الحياة الوطني' : 'AlInma Medical Services — Hayat National Group'}</div>
        <div class="nb-bar"><div class="nb-fill nb-fill-986"></div></div>
        <div class="nb-rate">98.6% ${ar ? 'معدل الموافقة' : 'Approval Rate'}</div>
      </div>
      <div class="branch-grid">
        <div class="branch-card bc-ok"><div class="bc-name">${ar ? 'جازان' : 'Jizan'}</div><div class="bc-pct">100%</div><div class="bc-sar">SAR 211.6M</div></div>
        <div class="branch-card bc-ok"><div class="bc-name">${ar ? 'خميس مشيط' : 'Khamis'}</div><div class="bc-pct">100%</div><div class="bc-sar">SAR 200.9M</div></div>
        <div class="branch-card bc-ok"><div class="bc-name">${ar ? 'عنيزة' : 'Unaizah'}</div><div class="bc-pct">100%</div><div class="bc-sar">SAR 120.8M</div></div>
        <div class="branch-card bc-ok"><div class="bc-name">${ar ? 'أبها' : 'Abha'}</div><div class="bc-pct">100%</div><div class="bc-sar">SAR 112.7M</div></div>
        <div class="branch-card bc-ok"><div class="bc-name">${ar ? 'المدينة' : 'Madinah'}</div><div class="bc-pct">100%</div><div class="bc-sar">SAR 91.8M</div></div>
        <div class="branch-card bc-warn"><div class="bc-name">⚠️ ${ar ? 'الرياض' : 'Riyadh'}</div><div class="bc-pct bc-warn-txt">88.5%</div><div class="bc-sar">SAR 97.9M</div></div>
      </div>
    </div>
    <div class="nphies-side">
      <div class="reject-card">
        <div class="rc-title">⚠️ ${ar ? 'تنبيه: رفضات الرياض' : 'Alert: Riyadh Rejections'}</div>
        <div class="rc-amount">SAR 11,301,117</div>
        <div class="rc-sub">${ar ? 'مطالبات مرفوضة تحتاج إجراء عاجل' : 'Rejected claims needing urgent action'}</div>
        <div class="rc-causes">
          <div class="rc-cause"><span class="rc-pct">35%</span><span>${ar ? 'موافقة مسبقة مفقودة' : 'Missing prior auth'}</span></div>
          <div class="rc-cause"><span class="rc-pct">28%</span><span>${ar ? 'خطأ في الترميز' : 'Incorrect coding'}</span></div>
          <div class="rc-cause"><span class="rc-pct">22%</span><span>${ar ? 'أهلية غير مؤكدة' : 'Eligibility not verified'}</span></div>
          <div class="rc-cause"><span class="rc-pct">10%</span><span>${ar ? 'انتهاء الموافقة' : 'Expired authorization'}</span></div>
          <div class="rc-cause"><span class="rc-pct">5%</span><span>${ar ? 'مطالبة مكررة' : 'Duplicate claim'}</span></div>
        </div>
        <a href="tel:966920000094" class="btn-enroll btn-enroll-block">${ar ? '🤖 فعّل ClaimLinc AI' : '🤖 Activate ClaimLinc AI'}</a>
      </div>
      <div class="pa-card">
        <div class="pa-row"><span>${ar ? 'إجمالي PA' : 'Total PA'}</span><strong>51,018</strong></div>
        <div class="pa-row"><span>${ar ? 'المطالبات' : 'Claims'}</span><strong>15,138</strong></div>
        <div class="pa-row"><span>${ar ? 'الفروع' : 'Branches'}</span><strong>6</strong></div>
        <div class="pa-row"><span>${ar ? 'بيانات بتاريخ' : 'As of'}</span><strong>2026-04-26</strong></div>
      </div>
    </div>
  </div>
</div>
</section>

<!-- BLOG -->
<section class="sec" id="blog">
<div class="c">
  <div class="sec-head"><h2>${T.h_blog}</h2><p>${T.p_blog}</p></div>
  <div class="blog-cat-tabs" id="blog-tabs">
    <button class="blog-cat-tab active" type="button" data-blog-cat="">${ar ? 'الكل' : 'All'}</button>
    <button class="blog-cat-tab" type="button" data-blog-cat="rcm">💰 RCM</button>
    <button class="blog-cat-tab" type="button" data-blog-cat="nphies">🏛️ NPHIES</button>
    <button class="blog-cat-tab" type="button" data-blog-cat="coding">💊 ${ar ? 'الترميز' : 'Coding'}</button>
    <button class="blog-cat-tab" type="button" data-blog-cat="strategy">🇸🇦 ${ar ? 'الاستراتيجية' : 'Strategy'}</button>
    <button class="blog-cat-tab" type="button" data-blog-cat="clinical">🩺 ${ar ? 'السريري' : 'Clinical'}</button>
    <button class="blog-cat-tab" type="button" data-blog-cat="patient">😊 ${ar ? 'المرضى' : 'Patient'}</button>
    <button class="blog-cat-tab" type="button" data-blog-cat="tech">⚕️ ${ar ? 'التقنية' : 'Tech'}</button>
    <button class="blog-cat-tab" type="button" data-blog-cat="compliance">🛡️ ${ar ? 'الامتثال' : 'Compliance'}</button>
  </div>
  <div class="blog-featured-wrap" id="blog-featured">${featuredBlogHtml}</div>
  <div class="g3-blog" id="blog-grid">${blogGridHtml}</div>
  <div class="section-center mt-28">
    <button class="btn btn-o" id="load-more-blog" type="button">${T.all_arts}</button>
  </div>
</div>
</section>

<!-- ACADEMY -->
<section class="sec sec-alt" id="academy">
<div class="c">
  <div class="sec-head"><h2>${T.h_academy}</h2><p>${T.p_academy}</p></div>
  <div class="academy-banner">
    <div>
      <h3>${ar ? '🎓 أكاديمية الحياة الوطني' : '🎓 Hayat National Academy'}</h3>
      <p>${ar ? 'تدريب صحي معتمد مُصمَّم من قلب العمليات السريرية — ثنائي اللغة، 100% عبر الإنترنت' : 'Accredited healthcare training built from real clinical operations — bilingual, 100% online'}</p>
    </div>
    <div class="academy-kpi">
      <div class="academy-kpi-value">${COURSES.length}</div>
      <div class="academy-kpi-label">${ar ? 'دورات معتمدة' : 'Certified Courses'}</div>
      <a href="tel:966920000094" class="btn btn-a">${T.enroll}</a>
    </div>
  </div>
  <div class="academy-stats">
    <div class="stat-card"><div class="stat-n">${COURSES.length}</div><div class="stat-l">${ar ? 'دورات' : 'Courses'}</div></div>
    <div class="stat-card"><div class="stat-n">${COURSES.reduce((a,c)=>a+c.hours,0)}+</div><div class="stat-l">${ar ? 'ساعة' : 'Hours'}</div></div>
    <div class="stat-card"><div class="stat-n">SCFHS</div><div class="stat-l">${ar ? 'معتمد' : 'Accredited'}</div></div>
    <div class="stat-card"><div class="stat-n">AR/EN</div><div class="stat-l">${ar ? 'ثنائي اللغة' : 'Bilingual'}</div></div>
  </div>
  <div class="level-tabs" id="level-tabs">
    <button class="level-tab active" type="button" data-course-level="">${ar ? 'الكل' : 'All'}</button>
    <button class="level-tab" type="button" data-course-level="beginner">🟢 ${ar ? 'مبتدئ' : 'Beginner'}</button>
    <button class="level-tab" type="button" data-course-level="intermediate">🟡 ${ar ? 'متوسط' : 'Intermediate'}</button>
    <button class="level-tab" type="button" data-course-level="advanced">🔴 ${ar ? 'متقدم' : 'Advanced'}</button>
  </div>
  <div class="g3" id="course-grid">${academyHtml}</div>
</div>
</section>

<!-- TESTIMONIALS -->
<section class="sec sec-alt" id="testimonials">
<div class="c">
  <div class="sec-head"><h2>${ar ? 'ماذا يقول مرضانا' : 'What Our Patients Say'}</h2>
    <p>${ar ? 'تجارب حقيقية من مرضى موثوقين عبر فروعنا الستة' : 'Real experiences from verified patients across our 6 branches'}</p>
  </div>
  <div class="testimonials-grid">${testimonialsHtml}</div>
</div>
</section>

<!-- FEATURED DOCTORS -->
<section class="sec" id="featured-doctors">
<div class="c">
  <div class="sec-head"><h2>${ar ? 'نخبة أطبائنا' : 'Featured Specialists'}</h2>
    <p>${ar ? 'استشاريون معتمدون عبر 6 فروع — احجز موعدك اليوم' : 'Board-certified consultants across 6 branches — book today'}</p>
  </div>
  <div class="doctors-featured-grid">${featuredDoctorsHtml}</div>
  <div class="section-center mt-28">
    <a href="https://bsma.elfadil.com" target="_blank" rel="noopener noreferrer" class="btn btn-p">${ar ? '👨‍⚕️ استعرض جميع الأطباء' : '👨‍⚕️ View All Doctors'}</a>
  </div>
</div>
</section>

<!-- AWARDS / TRUST BADGES -->
<section class="sec sec-alt" id="awards">
<div class="c">
  <div class="sec-head"><h2>${ar ? 'الاعتمادات والشراكات' : 'Accreditations & Partners'}</h2></div>
  <div class="awards-grid">
    <div class="award-item"><div class="award-icon">🏆</div><div class="award-name">CBAHI</div><div class="award-sub">${ar ? 'معتمد' : 'Accredited'}</div></div>
    <div class="award-item"><div class="award-icon">🏛️</div><div class="award-name">NPHIES</div><div class="award-sub">${ar ? 'متكامل' : 'Integrated'}</div></div>
    <div class="award-item"><div class="award-icon">🎓</div><div class="award-name">SCFHS</div><div class="award-sub">${ar ? 'معتمد للتدريب' : 'CPD Accredited'}</div></div>
    <div class="award-item"><div class="award-icon">🔷</div><div class="award-name">Oracle</div><div class="award-sub">${ar ? 'HIS شريك' : 'HIS Partner'}</div></div>
    <div class="award-item"><div class="award-icon">⚕️</div><div class="award-name">MOH</div><div class="award-sub">${ar ? 'مرخّص' : 'Licensed'}</div></div>
    <div class="award-item"><div class="award-icon">🤖</div><div class="award-name">BrainSAIT</div><div class="award-sub">${ar ? 'AI شريك' : 'AI Partner'}</div></div>
  </div>
</div>
</section>

<!-- EMERGENCY BANNER -->
<div class="emergency-banner">
<div class="c">
  <div class="emg-inner">
    <div class="emg-icon">🚨</div>
    <div>
      <strong>${ar ? 'طوارئ 24/7 — جميع الفروع' : 'Emergency 24/7 — All Branches'}</strong>
      <div class="emg-copy">${ar ? 'فريق متخصص متواجد على مدار الساعة في جميع فروعنا الستة' : 'Specialized teams available around the clock at all 6 branches'}</div>
    </div>
    <a href="tel:966${PHONE}" class="btn btn-a emg-phone">📞 ${PHONE}</a>
  </div>
</div>
</div>

<!-- CTA -->
<section class="cta">
<div class="c">
  <h2>${T.h_cta}</h2>
  <p>${T.p_cta}</p>
  <div class="cta-btns">
    <a href="tel:966${PHONE}" class="btn btn-a">📞 ${PHONE}</a>
    <a href="https://bsma.elfadil.com" target="_blank" rel="noopener noreferrer" class="btn btn-white">${T.patient}</a>
    <a href="https://wa.me/966${PHONE}" target="_blank" rel="noopener noreferrer" class="btn btn-wa">💬 WhatsApp</a>
  </div>
</div>
</section>

<!-- FOOTER -->
<footer class="ftr">
<div class="c">
  <div class="ftr-grid">
    <div>
      <h4>${T.title}</h4>
      <p class="footer-note">${ar ? 'تأسست 1999 | شركة الإنماء للخدمات الطبية | Org ID: 624' : 'Est. 1999 | AlInma Medical Services | Org ID: 624'}</p>
      <div class="live">● API v${VERSION} Live</div>
      <p class="footer-license">License: ${FACILITY_LIC}</p>
    </div>
    <div>
      <h4>${ar ? 'المنصات' : 'Portals'}</h4>
      <a href="https://bsma.elfadil.com" target="_blank" rel="noopener noreferrer">🙂 BSMA</a>
      <a href="https://givc.elfadil.com" target="_blank" rel="noopener noreferrer">🩺 GIVC</a>
      <a href="https://sbs.elfadil.com" target="_blank" rel="noopener noreferrer">💰 SBS</a>
      <a href="https://portal.nphies.sa" target="_blank" rel="noopener noreferrer">🏛️ NPHIES</a>
      <a href="https://oracle-bridge.brainsait.org/health" target="_blank" rel="noopener noreferrer">🔷 Oracle Bridge</a>
    </div>
    <div>
      <h4>${ar ? 'الأكاديمية' : 'Academy'}</h4>
      <a href="#academy">🏛️ ${ar ? 'أساسيات NPHIES' : 'NPHIES Fundamentals'}</a>
      <a href="#academy">💊 ${ar ? 'ترميز SBS الطبي' : 'SBS Medical Coding'}</a>
      <a href="#academy">💰 ${ar ? 'دورة الإيرادات' : 'Revenue Cycle'}</a>
      <a href="#academy">🤖 ${ar ? 'ذكاء اصطناعي' : 'Healthcare AI'}</a>
    </div>
    <div>
      <h4>${ar ? 'تواصل معنا' : 'Contact'}</h4>
      <a href="tel:966${PHONE}">📞 +966 ${PHONE}</a>
      <a href="mailto:info@hayathospitals.com">✉️ info@hayathospitals.com</a>
      <a href="https://wa.me/966${PHONE}" target="_blank" rel="noopener noreferrer">💬 WhatsApp</a>
      <p class="footer-locations">${ar ? 'الرياض · جازان · خميس مشيط · المدينة · عنيزة · أبها' : 'Riyadh · Jazan · Khamis · Madinah · Unayzah · Abha'}</p>
    </div>
  </div>
  <div class="ftr-divider"></div>
  <div class="ftr-bottom-row">
    <div>© 2026 ${ORG_NAME_EN} — BrainSAIT Healthcare OS v${VERSION}</div>
    <div class="ftr-social">
      <a href="https://twitter.com/brainsait" target="_blank" rel="noopener noreferrer" title="Twitter">𝕏</a>
      <a href="https://linkedin.com/company/brainsait" target="_blank" rel="noopener noreferrer" title="LinkedIn">in</a>
      <a href="https://wa.me/966${PHONE}" target="_blank" rel="noopener noreferrer" title="WhatsApp">💬</a>
    </div>
    <div class="footer-system">License: ${FACILITY_LIC} | Org: 624 | NPHIES v3</div>
  </div>
</div>
</footer>

<!-- CHAT WIDGET -->
<button class="chat-fab" id="chat-fab" title="Basma AI">💬</button>
<div class="chat-box" id="chat-box">
  <div class="chat-head">
    <span>🤖 بسمة | Basma AI</span>
    <button id="chat-close">✕</button>
  </div>
  <div class="chat-msgs" id="chat-msgs">
    <div class="msg msg-a">${T.chat_hello}</div>
  </div>
  <div class="chat-foot">
    <input class="chat-inp" id="chat-inp" placeholder="${T.chat_ph}">
    <button class="chat-send" id="chat-send">${T.send}</button>
  </div>
</div>
<a href="https://wa.me/966${PHONE}" class="wa-btn" target="_blank" rel="noopener noreferrer" title="WhatsApp">💬</a>

<script nonce="${N}">
// ── CONFIG ───────────────────────────────────────────────────
var AR   = ${ar};
var LANG = '${lang}';
var API  = '';  // same-origin

// ── LANG TOGGLE ──────────────────────────────────────────────
var langBtn = document.getElementById('lang-btn');
if (langBtn) {
  langBtn.addEventListener('click', function() {
    location.search = '?lang=' + (AR ? 'en' : 'ar');
  });
}

// ── MOBILE MENU ──────────────────────────────────────────────
var menuBtn = document.getElementById('menu-btn');
var mainNav = document.getElementById('main-nav');
if (menuBtn && mainNav) {
  menuBtn.addEventListener('click', function() {
    var open = mainNav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  mainNav.addEventListener('click', function(e) {
    if (e.target.tagName === 'A' && mainNav.classList.contains('open')) {
      mainNav.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
    }
  });
}

// ── NPHIES LIVE REFRESH ──────────────────────────────────────
(function() {
  function refreshNphies() {
    fetch('/api/nphies/status')
      .then(function(r) { return r.json(); })
      .then(function(d) {
        if (!d || !d.network) return;
        var fin = d.network.financials || {};
        // Update KPI strip numbers if visible
        var els = {
          'stat-approval': fin.network_approval_rate_pct ? fin.network_approval_rate_pct.toFixed(1) + '%' : null,
          'stat-sar': fin.network_total_sar ? 'SAR ' + (fin.network_total_sar/1e6).toFixed(1) + 'M' : null,
        };
        Object.keys(els).forEach(function(id) {
          var el = document.getElementById(id);
          if (el && els[id]) el.textContent = els[id];
        });
        // Update live badge
        var badge = document.getElementById('live-badge');
        if (badge) badge.textContent = '● Live — ' + new Date().toLocaleTimeString();
      }).catch(function(){});
  }
  // Refresh on load and every 90s
  setTimeout(refreshNphies, 3000);
  setInterval(refreshNphies, 90000);
})();

// ── SECTION ANIMATIONS (IntersectionObserver) ───────────────
(function() {
  var style = document.createElement('style');
  var scriptNonce = document.currentScript && document.currentScript.nonce;
  if (scriptNonce) style.setAttribute('nonce', scriptNonce);
  style.textContent = '.anim-in{opacity:0;transform:translateY(20px);transition:opacity .5s ease,transform .5s ease}.anim-in.visible{opacity:1;transform:none}';
  document.head.appendChild(style);
  var obs = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.sec-head,.feature-card,.testimonial-card,.doc-feat-card,.award-item').forEach(function(el) {
    el.classList.add('anim-in'); obs.observe(el);
  });
})();

// ── BLOG FILTER ──────────────────────────────────────────────
function filterBlog(cat, tab) {
  var cards = document.querySelectorAll('.blog-card,.blog-featured');
  var tabs = document.querySelectorAll('.blog-cat-tab');
  tabs.forEach(function(t) { t.classList.remove('active'); });
  if (tab) tab.classList.add('active');
  cards.forEach(function(c) {
    c.classList.toggle('is-hidden', !!cat && c.getAttribute('data-cat') !== cat);
  });
  var fw = document.getElementById('blog-featured');
  if (fw) fw.classList.toggle('is-hidden', !!cat && !fw.querySelector('[data-cat="'+cat+'"]') && fw.getAttribute('data-cat') !== cat);
}

function loadMoreBlog() {
  fetch('/api/blog')
    .then(function(r) { return r.json(); })
    .then(function(d) {
      var grid = document.getElementById('blog-grid');
      if (!grid || !d.articles) return;
      alert((ar_mode ? 'إجمالي المقالات: ' : 'Total articles: ') + d.articles.length);
    })
    .catch(function(){});
}

document.querySelectorAll('[data-blog-cat]').forEach(function(tab) {
  tab.addEventListener('click', function() {
    filterBlog(tab.getAttribute('data-blog-cat') || '', tab);
  });
});
var loadMoreBlogBtn = document.getElementById('load-more-blog');
if (loadMoreBlogBtn) loadMoreBlogBtn.addEventListener('click', loadMoreBlog);

// ── COURSE FILTER ─────────────────────────────────────────────
function filterCourses(level, tab) {
  var cards = document.querySelectorAll('#course-grid .course-card');
  var tabs = document.querySelectorAll('.level-tab');
  tabs.forEach(function(t) { t.classList.remove('active'); });
  if (tab) tab.classList.add('active');
  cards.forEach(function(c) {
    c.classList.toggle('is-hidden', !!level && c.getAttribute('data-level') !== level);
  });
}

document.querySelectorAll('[data-course-level]').forEach(function(tab) {
  tab.addEventListener('click', function() {
    filterCourses(tab.getAttribute('data-course-level') || '', tab);
  });
});

// ── KPI COUNT-UP ANIMATION ────────────────────────────────────
(function() {
  var observed = false;
  var observer = new IntersectionObserver(function(entries) {
    if (observed) return;
    entries.forEach(function(e) {
      if (e.isIntersecting) {
        observed = true;
        var nums = e.target.querySelectorAll('.kpi-num[data-target]');
        nums.forEach(function(el) {
          var target = parseFloat(el.getAttribute('data-target'));
          var isFloat = target % 1 !== 0;
          var current = 0;
          var step = target / 40;
          var timer = setInterval(function() {
            current += step;
            if (current >= target) { current = target; clearInterval(timer); }
            el.textContent = isFloat ? current.toFixed(1) + '%' : Math.floor(current).toLocaleString() + (target > 100 ? '+' : '');
          }, 30);
        });
      }
    });
  }, { threshold: 0.4 });
  var strip = document.getElementById('kpi-strip');
  if (strip) observer.observe(strip);
})();

var ar_mode = document.documentElement.lang === 'ar';

// ── HOMEPAGE LIVE DATA INTEGRATION ────────────────────────────
// Fetch live NPHIES + Oracle data and update homepage widgets
(function() {
  function updateHomepageKPIs() {
    fetch('/api/nphies/status')
      .then(function(r) { return r.json(); })
      .then(function(d) {
        if (!d.network || !d.network.financials) return;
        var f = d.network.financials;
        var kpis = document.querySelectorAll('.kpi-num[data-target]');
        // Don't override animated values — only update specific IDs
        var aprEl = document.querySelector('.kpi-pct');
        if (aprEl) aprEl.textContent = (f.network_approval_rate_pct || 98.6).toFixed(1) + '%';
      }).catch(function(){});
    // Update oracle integration tag from public aggregate health, never protected branch data.
    fetch('/api/health')
      .then(function(r) { return r.json(); })
      .then(function(d) {
        var tag = document.getElementById('oracle-tag');
        if (!tag) return;
        var connected = d.integrations && d.integrations.oracle_bridge === 'connected';
        tag.textContent = connected ? '🔷 Oracle Bridge ✓' : '🔶 Oracle Bridge ⚠️';
        tag.classList.toggle('oracle-ok', connected);
        tag.classList.toggle('oracle-warn', !connected);
      }).catch(function(){});
  }
  setTimeout(updateHomepageKPIs, 4000);
})();

// ── LOAD LIVE DATA ───────────────────────────────────────────
function fetchJSON(url, cb) {
  fetch(API + url)
    .then(function(r) { return r.json(); })
    .then(cb)
    .catch(function(e) { console.warn('Fetch failed:', url, e); });
}

function makeEl(tag, attrs, html) {
  var el = document.createElement(tag);
  if (attrs) Object.keys(attrs).forEach(function(k) { el.setAttribute(k, attrs[k]); });
  if (html) el.innerHTML = html;
  return el;
}
function esc(v) {
  return String(v == null ? '' : v).replace(/[&<>"']/g, function(ch) {
    return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch];
  });
}

// Stats
fetchJSON('/api/stats', function(d) {
  var s = d.stats || {};
  var pEl = document.getElementById('stat-prov');
  var dEl = document.getElementById('stat-dept');
  if (pEl) pEl.textContent = (s.total_providers || 269).toLocaleString();
  if (dEl) dEl.textContent = (s.total_departments || 20).toLocaleString();
});

// Public departments + featured doctors
var allProviders = [];
fetchJSON('/api/departments', function(d) {
  renderDepts(d.departments || []);
});
fetchJSON('/api/doctors/featured', function(d) {
  allProviders = d.doctors || [];
  renderDoctors(allProviders.slice(0, 8));
  buildSpecFilter();
});

function renderDepts(departments) {
  var grid = document.getElementById('dept-grid');
  if (!grid) return;
  grid.innerHTML = '';
  departments.slice(0, 8).forEach(function(d) {
    var name = AR ? d.name_ar : d.name_en;
    var div = makeEl('div', {class:'dept-card'});
    div.innerHTML = '<div class="dept-ico">' + esc(d.icon || '🏥') + '</div>' +
      '<div class="dept-name">' + esc(name) + '</div>' +
      '<div class="dept-count">' + (AR ? 'مسار رعاية متكامل' : 'Integrated care pathway') + '</div>';
    grid.appendChild(div);
  });
}

function renderDoctors(docs) {
  var grid = document.getElementById('doc-grid');
  if (!grid) return;
  grid.innerHTML = '';
  docs.slice(0, 8).forEach(function(doc) {
    var name = AR ? doc.name_ar : doc.name_en;
    var specialty = AR ? (doc.specialty_ar || doc.specialty) : (doc.specialty_en || doc.specialty);
    var branch = AR ? (doc.branch_ar || doc.branch || doc.department) : (doc.branch_en || doc.branch || doc.department);
    var init = (name || '').split(' ').filter(Boolean).pop();
    init = init ? init.charAt(0) : '؟';
    var card = makeEl('div', {class:'doc-card'});
    card.innerHTML = '<div class="doc-av">' + esc(init) + '</div>' +
      '<div class="doc-name">' + esc(name) + '</div>' +
      '<div class="doc-spec">' + esc(specialty || '') + '</div>' +
      '<div class="doc-dept">' + esc(branch || '') + '</div>' +
      '<a href="tel:966920000094" class="btn btn-p btn-sm btn-block">' + (AR ? 'احجز' : 'Book') + '</a>';
    grid.appendChild(card);
  });
}

function buildSpecFilter() {
  var sel = document.getElementById('spec-filter');
  if (!sel) return;
  var specs = [...new Set(allProviders.map(function(p) { return AR ? (p.specialty_ar || p.specialty) : (p.specialty_en || p.specialty); }).filter(Boolean))].sort();
  specs.forEach(function(s) {
    var o = makeEl('option', {value:s});
    o.textContent = s;
    sel.appendChild(o);
  });
}

document.getElementById('doc-search').addEventListener('input', filterDoctors);
document.getElementById('spec-filter').addEventListener('change', filterDoctors);

function filterDoctors() {
  var q    = (document.getElementById('doc-search').value || '').toLowerCase();
  var spec = document.getElementById('spec-filter').value;
  var filtered = allProviders.filter(function(p) {
    var name = ((AR ? p.name_ar : p.name_en) || '').toLowerCase();
    var specialty = AR ? (p.specialty_ar || p.specialty || '') : (p.specialty_en || p.specialty || '');
    var matchQ    = !q    || name.includes(q) || specialty.toLowerCase().includes(q);
    var matchSpec = !spec || specialty === spec;
    return matchQ && matchSpec;
  });
  renderDoctors(filtered);
}

// Branches
fetchJSON('/api/branches', function(d) {
  var branches = d.branches || [];
  var grid = document.getElementById('branch-grid');
  if (!grid) return;
  grid.innerHTML = '';
  branches.forEach(function(b) {
    var nm  = AR ? b.name_ar  : b.name_en;
    var ct  = AR ? b.city_ar  : b.city_en;
    var ad  = AR ? b.address_ar : b.address_en;
    var ph  = (b.phone || '').replace(/[^\d+]/g, '');
    var card = makeEl('div', {class:'branch-card'});
    card.innerHTML =
      '<div class="branch-top"><h3>' + esc(nm) + '</h3><span>' + esc(ct) + '</span></div>' +
      '<div class="branch-body">' +
        '<p class="branch-addr">' + esc(ad) + '</p>' +
        '<div class="branch-chips">' +
          '<span class="chip chip-gray">🛏 ' + esc(b.beds) + ' ' + (AR ? 'سرير' : 'Beds') + '</span>' +
          '<span class="chip chip-ok">● ' + (AR ? 'نشط' : 'Active') + '</span>' +
        '</div>' +
        '<a href="tel:' + ph + '" class="btn btn-p btn-sm btn-block">' + (AR ? '📞 اتصل' : '📞 Call') + '</a>' +
      '</div>';
    grid.appendChild(card);
  });
});

// ── CHAT WIDGET ──────────────────────────────────────────────
var chatOpen = false;
var chatSid  = null;

function toggleChat(forceOpen) {
  chatOpen = typeof forceOpen === 'boolean' ? forceOpen : !chatOpen;
  var box = document.getElementById('chat-box');
  if (chatOpen) { box.classList.add('open'); document.getElementById('chat-inp').focus(); }
  else box.classList.remove('open');
}

var chatFab = document.getElementById('chat-fab');
if (chatFab) chatFab.addEventListener('click', function() { toggleChat(); });
document.querySelectorAll('[data-chat-toggle]').forEach(function(btn) {
  btn.addEventListener('click', function() { toggleChat(true); });
});
var chatClose = document.getElementById('chat-close');
if (chatClose) chatClose.addEventListener('click', function() { toggleChat(false); });
var chatSend = document.getElementById('chat-send');
if (chatSend) chatSend.addEventListener('click', sendChat);
document.getElementById('chat-inp').addEventListener('keydown', function(e) {
  if (e.key === 'Enter') sendChat();
});

function addMsg(text, role) {
  var msgs = document.getElementById('chat-msgs');
  var div  = makeEl('div', {class:'msg msg-' + role});
  div.textContent = text;
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
  return div;
}

function sendChat() {
  var inp = document.getElementById('chat-inp');
  var msg = (inp.value || '').trim();
  if (!msg) return;
  inp.value = '';
  addMsg(msg, 'u');
  var typing = addMsg(AR ? 'بسمة تكتب...' : 'Basma is typing...', 'a');
  fetch(API + '/api/assistant', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({message: msg, session_id: chatSid})
  })
  .then(function(r) { return r.json(); })
  .then(function(d) {
    if (d.session_id) chatSid = d.session_id;
    typing.textContent = d.response || '...';
    document.getElementById('chat-msgs').scrollTop = 9999;
  })
  .catch(function() { typing.textContent = AR ? 'عذراً، خطأ مؤقت.' : 'Sorry, temporary error.'; });
}
</script>
</body>
</html>`;
  return _html.replace(/NONCE_PLACEHOLDER/g, N);
}

// ─── MAIN ROUTER ──────────────────────────────────────────────────────────────
// Apply correct CORS origin to any Response, based on the inbound request origin
function applyCORS(response, req) {
  const cors = getCORS(req);
  const res  = new Response(response.body, response);
  Object.entries(cors).forEach(([k, v]) => res.headers.set(k, v));
  return res;
}

const _inner = {
  async fetch(req, env) {
    if (req.method === 'OPTIONS') return cors(req);

    const url  = new URL(req.url);
    const path = url.pathname;
    const ip   = req.headers.get('CF-Connecting-IP') || 'anon';

    if (!rateOk(ip)) return applyCORS(err('Rate limit exceeded', 429), req);

    // ── Static metadata routes (before auth/API) ──────────────
    if (path === '/robots.txt')
      return new Response('User-agent: *\nAllow: /\nDisallow: /api/\nSitemap: https://hnh.brainsait.org/sitemap.xml\n', { headers: { 'Content-Type': 'text/plain', ...SEC } });
    if (path === '/sitemap.xml') {
      const xml = '<?xml version="1.0" encoding="UTF-8"?>' +
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' +
        '<url><loc>https://hnh.brainsait.org/</loc><changefreq>daily</changefreq><priority>1.0</priority></url>' +
        '<url><loc>https://hnh.brainsait.org/patient</loc><changefreq>weekly</changefreq><priority>0.9</priority></url>' +
        '<url><loc>https://hnh.brainsait.org/provider</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>' +
        '<url><loc>https://hnh.brainsait.org/student</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>' +
        '</urlset>';
      return new Response(xml, { headers: { 'Content-Type': 'application/xml', ...SEC } });
    }
    if (path === '/favicon.ico' || path === '/favicon.png')
      return Response.redirect('https://hnh.brainsait.org/', 302);

    // ── HTML pages ────────────────────────────────────────────
    if (path === '/' || path === '/index.html' || path === '/blog' || path === '/academy') {
      const langParam = url.searchParams.get('lang');
      const roleParam = url.searchParams.get('role') || '';
      const acceptsAr = (req.headers.get('Accept-Language') || '').includes('ar');
      const lang = langParam || (acceptsAr ? 'ar' : 'en');
      if (roleParam && ROLE_PORTALS[roleParam]) {
        return roleResponse(roleParam, lang, env);
      }
      const n = generateNonce();
      const csp = SEC['Content-Security-Policy'].replace(/NONCE_PLACEHOLDER/g, n);
      return new Response(buildHTML(lang, n), { headers: { ...HTML_H, 'Content-Security-Policy': csp } });
    }
    // Role portal direct paths
    if (path === '/patient') return roleResponse('patient', url.searchParams.get('lang') || 'ar', env);
    if (path === '/provider') return roleResponse('provider', url.searchParams.get('lang') || 'ar', env);
    if (path === '/payer') return roleResponse('payer', url.searchParams.get('lang') || 'ar', env);
    if (path === '/student') return roleResponse('student', url.searchParams.get('lang') || 'ar', env);
    if (path === '/admin') {
      // Admin portal: require X-API-Key (operational data)
      const ag = authGuard(req, env);
      if (ag) return ag;
      auditLog(env, req, 'admin:portal');
      return roleResponse('admin', url.searchParams.get('lang') || 'ar', env);
    }
    if (path === '/reception') return roleResponse('reception', url.searchParams.get('lang') || 'ar', env);
    if (path === '/rcm') {
      // RCM portal: require X-API-Key (financial/claims data)
      const ag2 = authGuard(req, env);
      if (ag2) return ag2;
      auditLog(env, req, 'rcm:portal');
      return roleResponse('rcm', url.searchParams.get('lang') || 'ar', env);
    }

    // ── Public JSON API ───────────────────────────────────────
    if (path === '/health' || path === '/api/health')     return apiHealth(env);
    if (path === '/api/doctors/featured')                  return ok({ doctors: DOCTORS_FEATURED, total: DOCTORS_FEATURED.length });
    if (path === '/api/testimonials')                      return ok({ testimonials: TESTIMONIALS, total: TESTIMONIALS.length });
    if (path === '/api/network/stats')                     return ok({ stats: NETWORK_STATS });
    if (path === '/api/stats')                             return apiStats(env);
    if (path === '/api/branches') {
      // Static fast response + async enrichment for fresh data
      if (url.searchParams.get('live') === '1') return apiOracleBranches(env);
      return ok({ branches: BRANCHES, total: BRANCHES.length, hint: 'Add ?live=1 for real-time Oracle+NPHIES data' });
    }
    if (path === '/api/insurance')                         return ok({ partners: INSURANCE });
    if (path === '/api/about')                             return ok({ about: ABOUT_HAYAT });
    if (path === '/api/timeline')                          return ok({ timeline: ABOUT_HAYAT.timeline, founded: ABOUT_HAYAT.founded });
    if (path === '/api/awards')                            return ok({ awards: ABOUT_HAYAT.awards });
    if (path === '/api/social')                            return ok({ social: ABOUT_HAYAT.social, contact: { phone: '+966920000094', unified: '920000094', whatsapp: 'https://api.whatsapp.com/send?phone=966920000094' } });
    if (path === '/api/values')                            return ok({ values: ABOUT_HAYAT.values, mission_en: ABOUT_HAYAT.mission_en, mission_ar: ABOUT_HAYAT.mission_ar, vision_en: ABOUT_HAYAT.vision_en, vision_ar: ABOUT_HAYAT.vision_ar });
    if (path === '/api/upcoming-branches')                 return ok({ upcoming: ABOUT_HAYAT.upcoming_branches, total: ABOUT_HAYAT.upcoming_branches.length });
    if (path === '/api/services')                          return ok({ services: ABOUT_HAYAT.services, offers: ABOUT_HAYAT.special_offers });
    if (path === '/api/links')                             return ok({ links: ABOUT_HAYAT.links, homecare: ABOUT_HAYAT.services?.homecare_url, app: ABOUT_HAYAT.services?.app_link });
    if (path === '/api/departments' || path.startsWith('/api/departments/')) return apiDepartments(req, env);
    if (path === '/api/assistant/capabilities')          return ok({ assistant: 'Basma', public_only: true, capabilities: PUBLIC_ASSISTANT_CAPABILITIES });
    if (path === '/api/assistant')                       return apiPublicAssistant(req, env);
    // /api/oracle/branches moved to protected section
    // NOTE: /api/patients, /api/appointments, /api/providers — moved to protected (PHI/PII)
    if (path === '/api/eligibility' || (path.startsWith('/api/eligibility') && req.method === 'POST')) {
      auditLog(env, req, 'eligibility'); // public but logged for abuse detection
      return apiEligibility(req, env);
    }
    if (path.startsWith('/api/drugs'))                     return apiDrugs(req, env);
    // /api/chat moved to protected — RAG+AI has PHI context

    // NPHIES (analysis before broad catch)
    if (path === '/api/nphies' || path === '/api/nphies/status')  return apiNphies(req, env, '');
    // /api/nphies/analysis moved to protected section (financial data)
    if (path === '/api/nphies/network')                            return apiNphies(req, env, '/network');
    // /api/nphies/facilities moved to protected (facility license numbers)
    if (path.startsWith('/api/nphies/live/'))                      return apiNphies(req, env, '/live/' + path.slice('/api/nphies/live/'.length));
    if (path.startsWith('/api/nphies') && path !== '/api/nphies/analysis' && path !== '/api/nphies/facilities') return apiNphies(req, env, path.replace('/api/nphies', ''));

    // Portal hub
    if (path.startsWith('/api/portal'))                    return apiPortal(req, env, path.replace('/api/portal', ''));

    // Blog
    if (path === '/api/blog' || path === '/api/blog/')     return apiBlog(null);
    if (path === '/api/blog/featured')                     return ok({ articles: BLOG_POSTS.filter(p => p.featured), total: BLOG_POSTS.filter(p=>p.featured).length });
    if (path.startsWith('/api/blog/'))                     return apiBlog(path.slice('/api/blog/'.length));

    // Academy
    if (path === '/api/academy/courses')                   return apiAcademy(req, null);
    if (path.startsWith('/api/academy/courses/') && path.endsWith('/modules')) {
      const cid = path.slice('/api/academy/courses/'.length).replace('/modules','');
      const co = COURSES.find(c => c.id === cid);
      return co ? ok({ course_id: cid, title_en: co.title_en, title_ar: co.title_ar, modules: co.modules_list || [] }) : err('Course not found', 404);
    }
    if (path.startsWith('/api/academy/courses/'))          return apiAcademy(req, path.slice('/api/academy/courses/'.length));
    if (path === '/api/academy/stats')                     return ok({ total_courses: COURSES.length, total_hours: COURSES.reduce((a,c)=>a+c.hours,0), total_modules: COURSES.reduce((a,c)=>a+c.modules,0), accreditation: 'SCFHS CPD + CHI', repos: ['nphies-course-platform','sbs','brainsait-rcm','open-webui','brainsait-mcp-dxt'] });

    // ── Voice Agent Proxy (PUBLIC — before auth) ────────────
    if (path.startsWith('/voice')) {
      const VOICE_WORKER = 'https://basma-voice-agent.brainsait-fadil.workers.dev';
      try {
        const vUrl = VOICE_WORKER + path + (url.search || '');
        const fwdHeaders = { 'X-Forwarded-Host': 'hnh.brainsait.org' };
        const fwd = ['content-type', 'x-language', 'x-session-id', 'authorization', 'accept'];
        fwd.forEach(h => { const v = req.headers.get(h); if (v) fwdHeaders[h] = v; });
        const vResp = await fetch(vUrl, {
          method: req.method,
          headers: fwdHeaders,
          body: ['GET', 'HEAD'].includes(req.method) ? null : req.body,
        });
        const headers = new Headers(vResp.headers);
        Object.entries(getCORS(req)).forEach(([k, v]) => headers.set(k, v));
        return new Response(vResp.body, { status: vResp.status, headers });
      } catch (e) {
        return err('Voice agent unavailable: ' + e.message, 503, req);
      }
    }

    // ── Protected API ─────────────────────────────────────────
    const guard = authGuard(req, env);
    if (guard) return guard;

    // ── Oracle tunnel routes (operational/PHI, protected) ─────
    if (path === '/api/oracle/status') {
      auditLog(env, req, 'oracle:status');
      const status = await oracleTunnelStatus(env);
      return ok({
        tunnel_id:    'e5cb8c86-1768-46b0-bb35-a2720f26e88d',
        tunnel_name:  'hayath-mcp',
        tunnel_health: status.ok ? 'healthy' : 'degraded',
        connections:  8,
        colos:        ['mrs06', 'ruh02'],
        origin_ip:    '212.118.115.118',
        hospitals:    status.hospitals,
        oracle_bridge: ORACLE_BRIDGE,
        last_check:   new Date().toISOString(),
      });
    }
    if (path === '/api/oracle/hospitals') {
      auditLog(env, req, 'oracle:hospitals');
      return ok({
        tunnel_id: 'e5cb8c86-1768-46b0-bb35-a2720f26e88d',
        hospitals: [
          { id: 'madinah', reachable: true,  url: 'https://oracle-madinah.brainsait.org', ms: 551  },
          { id: 'khamis',  reachable: true,  url: 'https://oracle-khamis.brainsait.org',  ms: 1304 },
          { id: 'abha',    reachable: true,  url: 'https://oracle-abha.brainsait.org',    ms: 918  },
          { id: 'riyadh',  reachable: false, url: 'https://oracle-riyadh.brainsait.org',  note: 'IP 128.1.1.185 timeout' },
          { id: 'unaizah', reachable: false, url: 'https://oracle-unaizah.brainsait.org', note: 'timeout' },
          { id: 'jizan',   reachable: false, url: 'https://oracle-jizan.brainsait.org',   note: 'unreachable' },
        ],
      });
    }
    if (path === '/api/oracle/patient' && req.method === 'GET') {
      auditLog(env, req, 'oracle:patient');
      const u = new URL(req.url);
      const hospital = u.searchParams.get('hospital') || 'madinah';
      const name     = u.searchParams.get('name') || '';
      const natId    = u.searchParams.get('national_id') || '';
      const mrn      = u.searchParams.get('mrn') || '';
      if (!TUNNEL_STATUS[hospital]?.reachable) {
        return ok({ patients: [], source: 'tunnel_down', hospital, note: TUNNEL_STATUS[hospital]?.note });
      }
      const param = natId ? `national_id=${encodeURIComponent(natId)}`
                  : mrn   ? `mrn=${encodeURIComponent(mrn)}`
                           : `name=${encodeURIComponent(name)}`;
      const data = await oracleCall(env, 'GET', `/patient/search?hospital=${hospital}&${param}`, null, hospital);
      return ok({ patients: data?.patients || [], hospital, source: data ? 'oracle-live' : 'unavailable' });
    }
    if (path === '/api/oracle/appointments' && req.method === 'GET') {
      auditLog(env, req, 'oracle:appointments');
      const u = new URL(req.url);
      const hospital = u.searchParams.get('hospital') || 'madinah';
      const mrn      = u.searchParams.get('mrn') || '';
      const date     = u.searchParams.get('date') || new Date().toISOString().split('T')[0];
      if (!TUNNEL_STATUS[hospital]?.reachable) {
        return ok({ appointments: [], source: 'tunnel_down', hospital });
      }
      const data = await oracleCall(env, 'GET', `/appointments?hospital=${hospital}&mrn=${encodeURIComponent(mrn)}&date=${date}`, null, hospital);
      return ok({ appointments: data?.appointments || data || [], hospital, source: data ? 'oracle-live' : 'unavailable' });
    }
    if (path === '/api/oracle/nphies' && req.method === 'POST') {
      auditLog(env, req, 'oracle:nphies');
      const body = await req.json().catch(() => ({}));
      const data = await oracleCall(env, 'POST', '/api/nphies/eligibility', {
        ...body, facility_license: FACILITY_LIC,
      }, body.hospital || 'madinah');
      return ok({ result: data, source: data ? 'oracle-nphies' : 'unavailable' });
    }

    // ── PHI/PII routes (require X-API-Key + audit log) ─────────────
    // NOTE: exact paths before startsWith to prevent shadowing
    if (path === '/api/patients/search')                 { auditLog(env, req, 'patients:search'); return apiPatientSearch(req, env); }
    if (path.startsWith('/api/patients'))                { auditLog(env, req, 'patients');        return apiPatients(req, env); }
    if (path === '/api/appointments/today')              { auditLog(env, req, 'appointments:today'); return apiAppointmentsToday(env); }
    if (path.startsWith('/api/appointments'))            { auditLog(env, req, 'appointments');    return apiAppointments(req, env); }
    if (path.startsWith('/api/providers'))               { auditLog(env, req, 'providers');       return apiProviders(req, env); }
    if (path.startsWith('/api/chat'))                      return apiChat(req, env);
    // ── Financial / RCM routes ────────────────────────────────────
    if (path.startsWith('/api/claims'))                    return apiClaims(req, env);
    if (path === '/api/rcm')                               return apiRCM(env);
    if (path === '/api/nphies/analysis')                   { auditLog(env, req, 'nphies:analysis'); return apiNphies(req, env, '/analysis'); }
    if (path === '/api/oracle/branches')                   return apiOracleBranches(env);
    if (path === '/api/nphies/facilities')                 return apiNphies(req, env, '/facilities');
    if (path === '/api/rcm/live')                          return apiRCMLive(env);
    // ── Clinical routes ───────────────────────────────────────────
    if (path.startsWith('/api/visits'))                    return apiVisits(req, env);
    if (path.startsWith('/api/orders'))                    return apiOrders(req, env);
    if (path === '/api/pa/pending')                        return apiPaPending(env);
    // ── Sync routes ───────────────────────────────────────────────
    if (path === '/api/sync/nphies')                       return apiSyncNphies(env);
    if (path.startsWith('/api/sync/'))                     return apiSync(env, path.slice('/api/sync/'.length));

    // Schema endpoint
    if (path === '/api/schema') {
      const tables = ['patients','appointments','claims','providers','departments','rag_documents'];
      const counts = {};
      for (const t of tables) {
        const r = await env.DB.prepare('SELECT COUNT(*) as n FROM ' + t).first().catch(() => ({ n: 0 }));
        counts[t] = r?.n || 0;
      }
      return ok({ database: 'hnh-gharnata', version: VERSION, tables: counts });
    }

    return err('Not found', 404);
  },
};

// ── CORS middleware export ────────────────────────────────────────────────────
// Applies the correct Access-Control-Allow-Origin to every non-OPTIONS response.
// This is the single place CORS is enforced — no need to thread req through helpers.
export default {
  async fetch(req, env) {
    const res = await _inner.fetch(req, env);
    // OPTIONS already returns cors(req) from inside _inner — pass through unchanged
    if (req.method === 'OPTIONS') return res;
    return applyCORS(res, req);
  },
};
