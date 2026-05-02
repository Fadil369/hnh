/**
 * HNH Unified Worker v7.9.0 — hnh.brainsait.org
 * مستشفيات الحياة الوطني — Hayat National Hospitals
 * BrainSAIT Healthcare OS
 *
 * Architecture: Clean ES module, no nested template literal issues
 * All inline JS uses string concatenation — zero backtick nesting
 *
 * v7.9.0: routing fixes (/ar, /api/academy/:id), 401→404 for unknowns,
 *         X-Request-ID + X-HNH-Version on all responses, Retry-After on 429,
 *         inflight request dedup, rate-limiter cleanup, /api/version,
 *         /api/dashboard (unified), oracle/hospitals from TUNNEL_STATUS,
 *         structured JSON request logs, apiStats enriched.
 */

// ─── CONSTANTS ────────────────────────────────────────────────────────────────
const VERSION        = '8.0.0';
const FACILITY_LIC   = '10000000000988';
const ORG_NAME_AR    = 'مستشفيات الحياة الوطني';
const ORG_NAME_EN    = 'Hayat National Hospitals';
const PHONE          = '920000094';
const CLAIMLINC_BASE = 'https://api.brainsait.org/nphies';
const CLAIMLINC_KEY  = 'tWapQjRdpCUzlfE2aGdLBneyrBJX8cJkRafFUiWL';

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-API-Key',
};
const SEC = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'SAMEORIGIN',
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains',
};
const JSON_H = { ...CORS, ...SEC, 'Content-Type': 'application/json; charset=utf-8' };
const HTML_H = { ...SEC, 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-cache, must-revalidate' };

// ─── HELPERS ──────────────────────────────────────────────────────────────────
const ok  = d       => new Response(JSON.stringify({ success: true,  ...d }), { headers: JSON_H });
const err = (m, s=400) => new Response(JSON.stringify({ success: false, error: m }), { status: s, headers: JSON_H });
const cors = ()     => new Response(null, { status: 204, headers: { ...CORS } });

// Strip PHI fields from patient objects returned on public (unauthenticated) endpoints
const PHI_FIELDS = ['national_id','iqama_id','passport_id','date_of_birth','phone','email',
  'address','emergency_contact_name','emergency_contact_phone','blood_type','allergies'];
function maskPatient(p) {
  if (!p || typeof p !== 'object') return p;
  const m = { ...p };
  for (const f of PHI_FIELDS) delete m[f];
  if (m.mrn) m.mrn = '****' + String(m.mrn).slice(-4);
  return m;
}

function authGuard(req, env) {
  const k = env.API_KEY || '';
  if (!k) return err('API_KEY not configured', 503);
  if ((req.headers.get('X-API-Key') || '') !== k) return err('Unauthorized', 401);
  return null;
}

// Simple in-memory rate limiter
const _rl = new Map();
function rateOk(ip, max = 120, win = 60000) {
  const now = Date.now(), e = _rl.get(ip) || { n: 0, t: now };
  if (now - e.t > win) { e.n = 0; e.t = now; }
  e.n++; _rl.set(ip, e);
  return e.n <= max;
}
// Periodic cleanup of expired rate-limiter entries (runs at most once per minute per isolate)
let _rlLastClean = 0;
function rlCleanup() {
  const now = Date.now();
  if (now - _rlLastClean < 60000) return;
  _rlLastClean = now;
  for (const [k, v] of _rl) { if (now - v.t > 120000) _rl.delete(k); }
}

// Lightweight in-memory TTL cache (shared across requests within same isolate)
const _mc = new Map();
function mcGet(k) { const e = _mc.get(k); return (e && e.exp > Date.now()) ? e.v : null; }
function mcSet(k, v, ttlMs) { _mc.set(k, { v, exp: Date.now() + ttlMs }); }

// Inflight deduplication — coalesces concurrent requests for the same key
const _inflight = new Map();
async function dedupe(key, fn) {
  if (_inflight.has(key)) return _inflight.get(key);
  const p = fn().finally(() => _inflight.delete(key));
  _inflight.set(key, p);
  return p;
}

// ─── EXTERNAL SERVICES ────────────────────────────────────────────────────────
// ─── ORACLE INTEGRATION LAYER ────────────────────────────────
// hayath-mcp tunnel: e5cb8c86 | healthy | 8 connections (mrs06+ruh02)
// Reachable: madinah ✅ khamis ✅ abha ✅ | Timeout: riyadh unaizah jizan

const ORACLE_BRIDGE    = 'https://oracle-bridge.brainsait.org';
const ORACLE_SCANNER   = 'https://oracle-claim-scanner.brainsait-fadil.workers.dev';
const ORACLE_PATIENT   = 'https://oracle-patient-search.brainsait-fadil.workers.dev';
const ORACLE_BRIDGE_KEY= 'bsma-oracle-b2af3196522b556636b09f5d268cb976';

// Tunnel reachability map — last live check: 2026-05-02 (all hospitals timing out via CF egress)
const TUNNEL_STATUS = {
  riyadh:  { reachable: false, ms: 10000, loginPath: '/prod/faces/Login.jsf',  note: 'timeout 2026-05-02' },
  madinah: { reachable: false, ms: 10000, loginPath: '/Oasis/faces/Login.jsf', note: 'timeout 2026-05-02' },
  unaizah: { reachable: false, ms: 10000, loginPath: '/prod/faces/Login.jsf',  note: 'timeout 2026-05-02' },
  khamis:  { reachable: false, ms: 10000, loginPath: '/prod/faces/Login.jsf',  note: 'timeout 2026-05-02' },
  jizan:   { reachable: false, ms: 3101,  loginPath: '/prod/faces/Login.jsf',  note: 'login page not found 2026-05-02' },
  abha:    { reachable: false, ms: 10001, loginPath: '/Oasis/faces/Home',      note: 'timeout 2026-05-02' },
};

async function oracleFetch(env, path, opts = {}) {
  try {
    const r = await fetch(`${ORACLE_BRIDGE}${path}`, {
      ...opts,
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key':     env.ORACLE_API_KEY || ORACLE_BRIDGE_KEY,
        'X-Oracle-User': env.ORACLE_USER     || 'U29200',
        'X-Oracle-Pass': env.ORACLE_PASSWORD || 'U29201',
        'X-Hospital':    opts.hospital || 'madinah',
        ...(opts.headers || {})
      },
      signal: AbortSignal.timeout(12000),
    });
    return r.ok ? r : null;
  } catch { return null; }
}

// Smart oracle call — routes to correct worker based on path
async function oracleCall(env, method, path, body = null, hospital = 'madinah') {
  // Build Basic auth from env creds (U29200:U29201)
  const oUser = env.ORACLE_USER     || 'U29200';
  const oPass = env.ORACLE_PASSWORD || 'U29201';
  const oAuth = 'Basic ' + btoa(oUser + ':' + oPass);
  const headers = {
    'Content-Type': 'application/json',
    'X-Source':      'hnh-unified',
    'X-Hospital':    hospital,
    'X-Oracle-User': oUser,
    'X-Oracle-Pass': oPass,
    'Authorization': oAuth,
  };
  const opts = { method, headers, signal: AbortSignal.timeout(15000) };
  if (body) opts.body = JSON.stringify(body);

  // Patient search/register → oracle-patient-search (Playwright browser)
  // Use a short 5s timeout — falls back to oracle-bridge if worker is unresponsive
  if (path.startsWith('/patient')) {
    try {
      const qs = path.includes('?') ? path.slice(path.indexOf('?')) : '';
      const basePath = path.split('?')[0];
      const r = await fetch(`${ORACLE_PATIENT}${basePath}${qs}`, { ...opts, signal: AbortSignal.timeout(5000) });
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
  headers['X-API-Key'] = env.ORACLE_API_KEY || ORACLE_BRIDGE_KEY;
  try {
    const r = await fetch(`${ORACLE_BRIDGE}${path}`, opts);
    if (r.ok) return r.json();
  } catch {}

  return null;
}

// Oracle hospital status — cached 60s, deduped so concurrent requests share one upstream call
async function oracleTunnelStatus(env) {
  const cached = mcGet('tunnel-status');
  if (cached) return cached;
  return dedupe('tunnel-status', async () => {
    const key = (env && env.ORACLE_API_KEY) || ORACLE_BRIDGE_KEY;
    try {
      const r = await fetch(`${ORACLE_BRIDGE}/diagnose`, {
        headers: { 'X-API-Key': key },
        signal: AbortSignal.timeout(8000),
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
        const result = { ok: d.ok, hospitals: map, tunnel: 'e5cb8c86-1768-46b0-bb35-a2720f26e88d', source: 'live', checked_at: new Date().toISOString() };
        mcSet('tunnel-status', result, 60000);
        return result;
      }
    } catch {}
    const fallback = { ok: false, hospitals: TUNNEL_STATUS, tunnel: 'e5cb8c86', source: 'cached', last_live: '2026-05-02' };
    mcSet('tunnel-status', fallback, 30000);
    return fallback;
  });
}

async function clFetch(path, env) {
  const key = (env && env.CLAIMLINC_KEY) || CLAIMLINC_KEY;
  try {
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

// ─── STATIC DATA ──────────────────────────────────────────────────────────────
const BRANCHES = [
  { id:'R001', name_ar:'مستشفى الحياة الوطني — الرياض',         name_en:'Hayat National Hospital — Riyadh',         city_ar:'الرياض',           city_en:'Riyadh',         beds:300, phone:'+966920000094', address_ar:'طريق الدائري الشرقي، حي الربوة', address_en:'Eastern Ring Rd, Al-Rabwa', license:'10000000000988' },
  { id:'J001', name_ar:'مستشفى الحياة الوطني — جازان',           name_en:'The National Life Hospital — Jazan',        city_ar:'جازان',             city_en:'Jazan',          beds:150, phone:'+966920000094', address_ar:'كورنيش جازان، حي الشاطئ',    address_en:'Jazan Corniche, Al Shati',  license:'10000000037034' },
  { id:'K001', name_ar:'مستشفى الحياة الوطني — خميس مشيط',      name_en:'Hayat National Hospital — Khamis Mushayt', city_ar:'خميس مشيط',        city_en:'Khamis Mushayt', beds:180, phone:'+966538081888', address_ar:'طريق الأمير سلطان، أم سرار', address_en:'Prince Sultan Rd',         license:'10000000030643' },
  { id:'M001', name_ar:'مستشفى الحياة الوطني — المدينة المنورة', name_en:'Hayat National Hospital — Madinah',        city_ar:'المدينة المنورة',  city_en:'Madinah',        beds:200, phone:'+966920000094', address_ar:'طريق فرع الهجرة، المدينة',   address_en:'Al-Hijra Branch Rd',       license:'10000300220660' },
  { id:'U001', name_ar:'مستشفى الحياة الوطني — عنيزة',           name_en:'Hayat National Hospital — Unayzah',        city_ar:'عنيزة',             city_en:'Unayzah',        beds:120, phone:'+966920000094', address_ar:'القصيم — عنيزة، طريق المدينة', address_en:'Unayzah, Al-Qassim',      license:'10000000030262' },
  { id:'A001', name_ar:'مستشفى الحياة الوطني — أبها',            name_en:'HNHN Abha',                                city_ar:'أبها',              city_en:'Abha',            beds:100, phone:'+966920000094', address_ar:'أبها، منطقة عسير',           address_en:'Abha, Aseer Region',       license:'10000300330931' },
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

const BLOG_POSTS = [
  { id:'nphies-riyadh-rejections', slug:'nphies-rejection-analysis-riyadh-2026', category:'rcm', emoji:'📊', featured:true, read_min:6, author:'Dr. Mohamed El Fadil', date:'2026-05-01',
    title_en:'NPHIES Claim Rejection Analysis — Riyadh 2026: SAR 11.3M at Risk',
    title_ar:'تحليل رفض مطالبات NPHIES — الرياض 2026: SAR 11.3 مليون في خطر',
    excerpt_en:'Riyadh branch records 88.5% approval vs 100% network-wide. ClaimLinc AI identifies 5 root causes and a 90-day recovery plan.',
    excerpt_ar:'فرع الرياض يسجل 88.5% موافقة مقابل 100% على مستوى الشبكة. ClaimLinc AI يحدد 5 أسباب جذرية وخطة استرداد 90 يوماً.' },
  { id:'vision-2030-ai', slug:'vision-2030-healthcare-ai', category:'strategy', emoji:'🇸🇦', featured:true, read_min:8, author:'Dr. Mohamed El Fadil', date:'2026-04-28',
    title_en:'AI-Native Healthcare for Vision 2030 — The BrainSAIT Roadmap',
    title_ar:'الرعاية الصحية AI-Native لرؤية 2030 — خارطة طريق BrainSAIT',
    excerpt_en:'How BrainSAIT\'s LINC agent ecosystem accelerates Saudi Arabia\'s SAR 83B healthcare market transformation.',
    excerpt_ar:'كيف تُسرّع منظومة LINC من BrainSAIT تحوّل سوق الرعاية الصحية السعودي بحجم SAR 83 مليار.' },
  { id:'nphies-guide', slug:'nphies-complete-provider-guide', category:'nphies', emoji:'🏛️', featured:false, read_min:12, author:'BrainSAIT Editorial', date:'2026-04-20',
    title_en:'The Complete NPHIES Guide for Saudi Healthcare Providers',
    title_ar:'الدليل الشامل لـ NPHIES لمزودي الخدمات الصحية في المملكة',
    excerpt_en:'FHIR R4 workflows, eligibility checks, prior authorization, claims submission, and common rejection codes explained.',
    excerpt_ar:'سير عمل FHIR R4، التحقق من الأهلية، الموافقة المسبقة، تقديم المطالبات، وأكواد الرفض الشائعة بالتفصيل.' },
  { id:'academy-launch', slug:'hayat-national-academy-launch', category:'academy', emoji:'🎓', featured:true, read_min:4, author:'HNH Academy Team', date:'2026-05-01',
    title_en:'Hayat National Academy — Accredited Healthcare Training Now Open',
    title_ar:'أكاديمية الحياة الوطني — تدريب صحي معتمد متاح الآن',
    excerpt_en:'5 SCFHS-accredited courses: NPHIES, SBS Medical Coding, RCM, Healthcare AI, and PDPL Compliance. Bilingual AR/EN.',
    excerpt_ar:'5 دورات معتمدة SCFHS: NPHIES، ترميز SBS الطبي، دورة إيرادات، ذكاء اصطناعي، وامتثال PDPL. ثنائية اللغة.' },
  { id:'sbs-coding', slug:'sbs-icd10-medical-coding-guide', category:'coding', emoji:'💊', featured:false, read_min:10, author:'BrainSAIT CodeLinc', date:'2026-04-15',
    title_en:'SBS v3.4 & ICD-10-AM Coding Guide — Reducing Rejection by 28%',
    title_ar:'دليل الترميز SBS v3.4 وICD-10-AM — تقليل الرفض بنسبة 28%',
    excerpt_en:'Correct SBS-ICD-10 pairing, AR-DRG classification, and how CodeLinc AI achieves 99.4% first-pass NPHIES accuracy.',
    excerpt_ar:'تطابق SBS-ICD-10 الصحيح، تصنيف AR-DRG، وكيف يحقق CodeLinc AI دقة 99.4% في أول تمرير على NPHIES.' },
  { id:'claimlinc-roi', slug:'claimlinc-roi-90days', category:'rcm', emoji:'💡', featured:true, read_min:5, author:'BrainSAIT ClaimLinc', date:'2026-05-02',
    title_en:'ClaimLinc ROI: Recovering SAR 9.8M in 90 Days',
    title_ar:'عائد استثمار ClaimLinc: استرداد SAR 9.8 مليون خلال 90 يوماً',
    excerpt_en:'How deploying all 5 ClaimLinc modules — AuthLinc, CodeLinc, EligibilityLinc, DRGLinc, ComplianceLinc — projects recovery of 87% of Riyadh rejections.',
    excerpt_ar:'كيف يُتوقع أن يستعيد نشر وحدات ClaimLinc الخمس — AuthLinc, CodeLinc, EligibilityLinc, DRGLinc, ComplianceLinc — 87% من رفضات الرياض.' },
  { id:'ar-drg-guide', slug:'ar-drg-saudi-hospitals-guide', category:'coding', emoji:'🏥', featured:false, read_min:9, author:'Dr. Mohamed El Fadil', date:'2026-04-22',
    title_en:'AR-DRG Classification in Saudi Hospitals — A Practical Guide',
    title_ar:'تصنيف AR-DRG في المستشفيات السعودية — دليل عملي',
    excerpt_en:'Understanding AR-DRG case weights, MDC grouping, and how DRGLinc optimizes case-mix for Saudi hospital revenue integrity.',
    excerpt_ar:'فهم أوزان حالات AR-DRG، تجميع MDC، وكيف يُحسّن DRGLinc مزيج الحالات لسلامة إيرادات المستشفيات السعودية.' },
  { id:'oracle-nphies-integration', slug:'oracle-nphies-bridge-architecture', category:'tech', emoji:'🔗', featured:false, read_min:7, author:'BrainSAIT Engineering', date:'2026-04-10',
    title_en:'Oracle HIS ↔ NPHIES Bridge Architecture at Hayat National',
    title_ar:'معمارية الجسر بين Oracle HIS وNPHIES في مستشفيات الحياة الوطني',
    excerpt_en:'How BrainSAIT Oracle Bridge worker connects 6 hospital portals to NPHIES via Cloudflare Workers — zero VPN, FHIR R4 compliant.',
    excerpt_ar:'كيف يربط عامل Oracle Bridge من BrainSAIT 6 بوابات مستشفيات بـ NPHIES عبر Cloudflare Workers — بدون VPN، متوافق مع FHIR R4.' },
  { id:'abha-nphies-triage', slug:'abha-nphies-claim-triage-2026', category:'rcm', emoji:'📊', featured:true, read_min:8, author:'Dr. Mohamed El Fadil', date:'2026-04-05',
    title_en:'Abha NPHIES Claim Triage — 4,914 Rejected Lines, 3 Action Tracks',
    title_ar:'تدقيق مطالبات NPHIES في أبها — 4,914 سطر مرفوض، 3 مسارات إجراء',
    excerpt_en:'Real-world claim triage from Hayat Abha: 2,181 resubmissions with supporting info, 2,650 contractual appeals, 83 new claims with prior linkage — and a portal limit check queue of 290.',
    excerpt_ar:'تدقيق حقيقي لمطالبات مستشفى الحياة أبها: 2,181 إعادة تقديم، 2,650 طعن تعاقدي، 83 مطالبة جديدة — وقائمة تحقق 290 من حدود الموافقات.' },
  { id:'compliancelinc-control-tower', slug:'compliancelinc-oracle-control-tower', category:'tech', emoji:'🏗️', featured:false, read_min:9, author:'BrainSAIT Engineering', date:'2026-03-28',
    title_en:'ComplianceLinc — Oracle Control Tower for 6 Saudi Hospital Branches',
    title_ar:'ComplianceLinc — برج التحكم Oracle لـ 6 فروع مستشفيات سعودية',
    excerpt_en:'How BrainSAIT ComplianceLinc connects 6 Oracle OASIS hospital portals via Cloudflare tunnel, processing claims, PA, and NPHIES submissions with real-time audit logging.',
    excerpt_ar:'كيف يربط ComplianceLinc 6 بوابات Oracle OASIS عبر نفق Cloudflare، لمعالجة المطالبات والموافقات المسبقة وتقديم NPHIES مع سجل تدقيق فوري.' },
  { id:'brainsait-rcm-ai', slug:'brainsait-rcm-ai-fraud-detection', category:'rcm', emoji:'🤖', featured:false, read_min:7, author:'BrainSAIT AI Team', date:'2026-03-15',
    title_en:'AI-Powered RCM: 5 Fraud Detection Algorithms + NPHIES Integration',
    title_ar:'إدارة دورة الإيرادات بالذكاء الاصطناعي: 5 خوارزميات كشف الاحتيال + NPHIES',
    excerpt_en:'BrainSAIT RCM system uses Isolation Forest ML, duplicate billing detection, upcoding alerts, and FHIR R4 validation to protect hospital revenue — with full bilingual AR/EN support.',
    excerpt_ar:'يستخدم نظام BrainSAIT للإيرادات Isolation Forest، وكشف الفوترة المكررة، وتنبيهات الترميز المرتفع، وFHIR R4 — بدعم ثنائي اللغة.' },
  { id:'deepseek-healthcare-ai', slug:'deepseek-v3-healthcare-basma-voice', category:'tech', emoji:'🎙️', featured:true, read_min:5, author:'BrainSAIT AI Team', date:'2026-05-01',
    title_en:'DeepSeek V3 Powers Basma — Bilingual Healthcare Voice Agent',
    title_ar:'DeepSeek V3 يُشغّل بسمة — وكيل صوتي ثنائي اللغة للرعاية الصحية',
    excerpt_en:'How Hayat National Hospitals deployed DeepSeek V3 as primary AI engine for Basma voice agent — Arabic-first, NPHIES-integrated, with ElevenLabs TTS and Oracle Bridge real-time lookup.',
    excerpt_ar:'كيف نشرت مستشفيات الحياة الوطني DeepSeek V3 محرك ذكاء اصطناعي رئيسي لبسمة — بالعربية أولاً، مدمج مع NPHIES، مع TTS من ElevenLabs وBridge Oracle لحظياً.' },
];

const COURSES = [
  { id:'nphies-fundamentals', icon:'🏛️', level:'beginner', hours:12, modules:8, price:1200, accred:'SCFHS CPD', cat:'nphies', repo:'nphies-course-platform',
    title_en:'NPHIES Fundamentals',        title_ar:'أساسيات نظام NPHIES',
    desc_en:'Claims, PA, eligibility, FHIR R4 — complete operational mastery.',
    desc_ar:'المطالبات، الموافقة المسبقة، الأهلية، FHIR R4 — إتقان تشغيلي كامل.' },
  { id:'sbs-medical-coding', icon:'💊', level:'advanced', hours:20, modules:12, price:2400, accred:'CHI/SCFHS', cat:'coding', repo:'sbs',
    title_en:'SBS Medical Coding & ICD-10 Advanced', title_ar:'الترميز الطبي SBS وICD-10 — متقدم',
    desc_en:'All 26 SBS chapters, ICD-10-AM pairing, AR-DRG calculation, CHI audit prep.',
    desc_ar:'جميع فصول SBS الـ26، تطابق ICD-10-AM، حساب AR-DRG، التحضير لتدقيق CHI.' },
  { id:'rcm-management', icon:'💰', level:'intermediate', hours:16, modules:10, price:1800, accred:'SCFHS CPD', cat:'rcm', repo:'brainsait-rcm',
    title_en:'Revenue Cycle Management for Saudi Hospitals', title_ar:'إدارة دورة الإيرادات للمستشفيات السعودية',
    desc_en:'End-to-end RCM: eligibility to collections, denial management, KPIs.',
    desc_ar:'دورة إيرادات كاملة: من الأهلية للتحصيل، إدارة الرفض، مؤشرات الأداء.' },
  { id:'healthcare-ai', icon:'🤖', level:'intermediate', hours:8, modules:6, price:900, accred:'BrainSAIT Certified', cat:'ai', repo:'open-webui',
    title_en:'AI & Automation in Healthcare',  title_ar:'الذكاء الاصطناعي والأتمتة في الرعاية الصحية',
    desc_en:'LINC agents, automated NPHIES workflows, CodeLinc, RAG clinical knowledge.',
    desc_ar:'وكلاء LINC، سير عمل NPHIES الآلي، CodeLinc، المعرفة السريرية RAG.' },
  { id:'pdpl-compliance', icon:'🛡️', level:'beginner', hours:6, modules:5, price:750, accred:'SCFHS CPD', cat:'compliance', repo:'brainsait-mcp-dxt',
    title_en:'HIPAA & Saudi PDPL Compliance',  title_ar:'الامتثال لـ HIPAA والنظام السعودي PDPL',
    desc_en:'PHI security, CHI audit requirements, data governance for Saudi facilities.',
    desc_ar:'أمن بيانات المريض، متطلبات تدقيق CHI، حوكمة البيانات للمنشآت السعودية.' },
  { id:'oracle-claims-mastery', icon:'🔷', level:'advanced', hours:10, modules:7, price:2800, accred:'BrainSAIT Certified', cat:'tech', repo:'oracle-setup',
    title_en:'Oracle OASIS Claims Mastery — ComplianceLinc', title_ar:'إتقان مطالبات Oracle OASIS — ComplianceLinc',
    desc_en:'Oracle HIS browser automation, session management, NPHIES bridge integration for 6 hospital branches — real Cloudflare tunnel workflow.',
    desc_ar:'أتمتة Oracle HIS، إدارة الجلسات، تكامل NPHIES لـ 6 فروع مستشفيات — عبر نفق Cloudflare الحقيقي.' },
  { id:'abha-claims-triage', icon:'📋', level:'intermediate', hours:6, modules:4, price:1500, accred:'CHI/SCFHS', cat:'rcm', repo:'abha-nphies-session-deliverables',
    title_en:'NPHIES Claim Triage — Real Data Workshop (Abha 2026)', title_ar:'ورشة تدقيق مطالبات NPHIES — بيانات حقيقية أبها 2026',
    desc_en:'Hands-on triage of 4,914 rejected lines: resubmit (2,181), appeal (2,650), new claim (83) — portal limit verification and NPHIES payload building.',
    desc_ar:'تدريب عملي على 4,914 سطر مرفوض: إعادة تقديم (2,181)، طعن (2,650)، مطالبة جديدة (83) — وبناء payloads NPHIES.' },
  { id:'un-innovation-healthcare', icon:'🌐', level:'intermediate', hours:8, modules:5, price:1100, accred:'BrainSAIT + UN', cat:'ai', repo:'brainsait-innovation',
    title_en:'UN Innovation Toolkit — AI for Saudi Health Sector', title_ar:'أدوات الابتكار الأممي — الذكاء الاصطناعي للصحة السعودية',
    desc_en:'SPACE framework, AI diagnostic profiles, 10 implementation tools, Arabic healthcare terminology — aligned with Vision 2030 health initiatives.',
    desc_ar:'إطار SPACE، ملفات التشخيص الذكية، 10 أدوات تطبيق، مصطلحات طبية عربية — متوافق مع مبادرات رؤية 2030 الصحية.' },
];

// ─── API HANDLERS ─────────────────────────────────────────────────────────────

async function apiHealth(env) {
  const [dbOk, oracleOk, mirrorOk, claimlinOk] = await Promise.all([
    env.DB.prepare('SELECT 1').first().then(() => true).catch(() => false),
    fetch(`${ORACLE_BRIDGE}/health`, {
      headers: { 'X-API-Key': env.ORACLE_API_KEY || ORACLE_BRIDGE_KEY },
      signal: AbortSignal.timeout(8000),
    }).then(r => r.status < 500).catch(() => false),
    fetch('https://nphies-mirror.brainsait-fadil.workers.dev/mirror/status', { signal: AbortSignal.timeout(5000) })
      .then(r => r.ok).catch(() => false),
    fetch(`${CLAIMLINC_BASE}/network/summary`, {
      headers: { 'X-API-Key': (env && env.CLAIMLINC_KEY) || CLAIMLINC_KEY },
      signal: AbortSignal.timeout(5000),
    }).then(r => r.ok).catch(() => false),
  ]);
  const nphiesOk = mirrorOk || claimlinOk; // ClaimLinc is the live fallback when mirror is down
  const [hisN, ragN] = await Promise.all([
    env.HIS_DB?.prepare('SELECT COUNT(*) as n FROM bsma_appointments').first().catch(() => ({ n: 0 })),
    env.BASMA_DB?.prepare('SELECT COUNT(*) as n FROM rag_documents').first().catch(() => ({ n: 0 })),
  ]);
  return ok({
    version: VERSION, worker: 'hnh-unified', facility: FACILITY_LIC,
    status: dbOk ? 'healthy' : 'degraded',
    oracle_ok:  oracleOk,
    nphies_ok:  nphiesOk,
    integrations: {
      d1_primary:      dbOk      ? 'connected' : 'error',
      d1_his_database: hisN?.n > 0  ? 'connected' : 'empty',
      d1_basma:        ragN?.n > 0  ? 'connected' : 'empty',
      oracle_bridge:   oracleOk  ? 'connected' : 'unreachable',
      oracle_tunnel:   'e5cb8c86 | all hospitals timeout (CF egress) | diagnose cached',
      nphies_mirror:   mirrorOk  ? 'connected' : 'degraded',
      nphies_claimlinc: claimlinOk ? 'connected' : 'degraded',
      claimlinc:       claimlinOk ? 'live'      : 'degraded',
      sbs_portal:      'connected',
    },
    data: { his_appointments: hisN?.n || 0, rag_documents: ragN?.n || 0 },
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
    total_visitors:     main?.patients     || 0,
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
  q += ' ORDER BY specialty, last_name_ar LIMIT ' + limit;
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
    q += ' ORDER BY created_at DESC LIMIT ' + limit;
    const r = b.length ? await env.DB.prepare(q).bind(...b).all() : await env.DB.prepare(q).all();
    return ok({ patients: (r.results || []).map(maskPatient), total: r.results?.length || 0 });
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
  sql += ' LIMIT ' + limit;
  const r = b.length ? await env.HIS_DB.prepare(sql).bind(...b).all() : await env.HIS_DB.prepare(sql).all();
  return ok({ drugs: r.results || [], total: r.results?.length || 0 });
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

  // AI engine: DeepSeek (primary) → CF AI (fallback)
  const sysPrompt = (isAr
    ? 'أنت بسمة، المساعدة الذكية لمستشفيات الحياة الوطني. تتحدثين العربية والإنجليزية. '
    : 'You are Basma, the AI assistant for Hayat National Hospitals. ') +
    (ragCtx ? (isAr ? 'استخدمي هذا السياق:\n\n' : 'Use this context:\n\n') + ragCtx + '\n\n' : '') +
    (isAr ? 'كوني دافئة ومهنية وموجزة. لا تشخّصي أمراضاً. للتواصل: ' : 'Be warm, professional, concise. No diagnosis. Contact: ') + PHONE;

  let reply = '';

  // ── 1. DeepSeek (primary) ─────────────────────────────────
  try {
    const dsKey = env.DEEPSEEK_API_KEY || 'sk-c228b2bf0a0444379218a045f00becac';
    const dsRes = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + dsKey },
      body: JSON.stringify({
        model: 'deepseek-chat',
        max_tokens: 400,
        temperature: 0.6,
        messages: [{ role: 'system', content: sysPrompt }, { role: 'user', content: msg }],
      }),
      signal: AbortSignal.timeout(15000),
    });
    if (dsRes.ok) {
      const dsData = await dsRes.json();
      reply = dsData.choices?.[0]?.message?.content?.trim() || '';
    }
  } catch {}

  // ── 2. CF Workers AI LLaMA (fallback) ────────────────────
  if (!reply && env.AI) {
    try {
      const ai = await env.AI.run('@cf/meta/llama-3.3-70b-instruct-fp8-fast', {
        messages: [{ role: 'system', content: sysPrompt }, { role: 'user', content: msg }],
        max_tokens: 400,
      });
      reply = ai.response || '';
    } catch {}
  }

  // ── 3. Static fallback ────────────────────────────────────
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
    // clFetch (ClaimLinc) is blocked by CF egress IP rules; fall back to bsmaNetwork which IS reachable
    const clNet = await clFetch('/network/summary', env);
    const net   = clNet || await bsmaNetwork();
    const src   = clNet ? 'claimlinc' : 'bsma-fallback';
    const [claims, pa] = await Promise.all([
      env.DB.prepare('SELECT COUNT(*) as n FROM claims WHERE nphies_claim_id IS NOT NULL').first().catch(() => ({ n: 0 })),
      env.DB.prepare('SELECT COUNT(*) as n FROM prior_authorizations').first().catch(() => ({ n: 0 })),
    ]);
    return ok({ facility: FACILITY_LIC, source: src, network: net, local: { claims: claims?.n, pa: pa?.n } });
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

async function apiClaims(req, env) {
  if (req.method === 'GET') {
    const url = new URL(req.url);
    const status = url.searchParams.get('status') || '';
    const limit = Math.min(parseInt(url.searchParams.get('limit') || '50'), 200);
    let q = 'SELECT c.*, p.full_name_ar as patient_name FROM claims c LEFT JOIN patients p ON c.patient_id=p.id';
    const b = [];
    if (status) { q += ' WHERE c.status=?'; b.push(status); }
    q += ' ORDER BY c.created_at DESC LIMIT ' + limit;
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
    return ok({ courses, total: courses.length, stats: { total_courses: 9, total_hours: 104, accreditation: 'SCFHS CPD + CHI' } });
  }
  const c = COURSES.find(c => c.id === id);
  return c ? ok({ course: c }) : err('Course not found', 404);
}

// ─── HTML PORTAL ──────────────────────────────────────────────────────────────
// KEY: All JavaScript uses addEventListener, createElement, and innerHTML with
// string concatenation ONLY — no template literals anywhere in the JS code.
// This avoids all nested template literal / escaping issues entirely.

function buildHTML(lang) {
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

  // Blog HTML (server-side rendered — graceful content even before JS)
  const blogHtml = BLOG_POSTS.map(p => {
    const title   = ar ? p.title_ar : p.title_en;
    const excerpt = ar ? p.excerpt_ar : p.excerpt_en;
    return '<a href="/blog/' + p.id + '?lang=' + lang + '" class="blog-card" style="text-decoration:none;color:inherit;display:block"><div class="blog-top"><span class="blog-emoji">' + p.emoji + '</span>' +
      (p.featured ? '<span class="chip-feat">' + (ar ? 'مميز' : 'Featured') + '</span>' : '') +
      '<span class="cat-tag">' + p.category.toUpperCase() + '</span></div>' +
      '<div class="blog-body"><h3 class="blog-title">' + title + '</h3>' +
      '<p class="blog-excerpt">' + excerpt + '</p>' +
      '<div class="blog-meta"><span>✍️ ' + p.author + '</span><span>📖 ' + p.read_min + ' ' + T.min + '</span><span>📅 ' + p.date + '</span></div></div></div>';
  }).join('');

  // Academy HTML (server-side rendered)
  const academyHtml = COURSES.map(c => {
    const title = ar ? c.title_ar : c.title_en;
    const desc  = ar ? c.desc_ar  : c.desc_en;
    const href  = '/academy/' + c.id + '?lang=' + lang;
    const lvlMap = { beginner: '\uD83D\uDFE2 ' + T.level_b, intermediate: '\uD83D\uDFE1 ' + T.level_i, advanced: '\uD83D\uDD34 ' + T.level_a };
    return '<div class="course-card"><div class="course-icon">' + c.icon + '</div>' +
      '<h3 class="course-title"><a href="' + href + '" style="color:inherit;text-decoration:none">' + title + '</a></h3>' +
      '<p class="course-desc">' + desc + '</p>' +
      '<div class="course-meta">' +
        '<span class="chip-lvl">' + (lvlMap[c.level] || c.level) + '</span>' +
        '<span class="chip-gray">&#9201; ' + c.hours + T.hours + '</span>' +
        '<span class="chip-gray">&#128218; ' + (c.modules||8) + ' ' + T.modules_lbl + '</span>' +
        '<span class="chip-accred">' + c.accred + '</span>' +
      '</div>' +
      '<div class="course-footer">' +
        '<span class="course-price">SAR ' + c.price.toLocaleString() + '</span>' +
        '<div style="display:flex;gap:6px;align-items:center">' +
          '<a href="' + href + '" style="padding:6px 11px;border-radius:16px;font-size:.74rem;font-weight:600;background:rgba(0,102,204,.08);color:#0066CC;border:1px solid rgba(0,102,204,.2);text-decoration:none">' + (ar ? 'عرض' : 'View') + '</a>' +
          '<a href="tel:966920000094" class="btn-enroll">' + T.enroll + '</a>' +
        '</div>' +
      '</div></div>';
  }).join('');

  return `<!DOCTYPE html>
<html lang="${lang}" dir="${ar ? 'rtl' : 'ltr'}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="description" content="${T.tagline}">
<title>${T.title} | HNH</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Tajawal:wght@400;500;700;800;900&display=swap" rel="stylesheet">
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🏥</text></svg>">
<style>
:root{
  --p:#0066CC;--pd:#004499;--n:#1A2B4A;--a:#C9A84C;--g:linear-gradient(135deg,#0066CC,#1A2B4A);--ga:linear-gradient(135deg,#C9A84C,#E8D48A);
  --s:#10B981;--bg:#F0F4FA;--sf:#FFFFFF;--b:#E2E8F0;--t:#0F172A;--ts:#64748B;
  --sh:0 2px 8px rgba(0,0,0,.08);--shd:0 8px 32px rgba(0,0,0,.12);--r:14px;--rf:9999px;
  --font:${ar ? "'Tajawal'" : "'Inter'"},sans-serif;
}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{font-family:var(--font);background:var(--bg);color:var(--t);line-height:1.6}
img{max-width:100%}a{text-decoration:none;color:inherit}
.c{max-width:1200px;margin:0 auto;padding:0 20px}

/* HEADER */
.hdr{position:sticky;top:0;z-index:100;background:rgba(255,255,255,.96);backdrop-filter:blur(20px);border-bottom:1px solid var(--b);padding:0}
.hdr-i{height:64px;display:flex;align-items:center;justify-content:space-between;gap:16px}
.logo{display:flex;align-items:center;gap:10px}
.logo-ic{width:38px;height:38px;background:var(--g);border-radius:10px;display:grid;place-items:center;font-size:1.2rem;flex-shrink:0}
.logo-tx{font-size:.9rem;font-weight:800;color:var(--n);line-height:1.2}
.logo-tx small{display:block;font-size:.6rem;font-weight:400;color:var(--ts)}
.nav{display:flex;align-items:center;gap:4px}
.nav a,.nav button.nl{padding:6px 12px;border-radius:8px;font-size:.84rem;font-weight:500;color:var(--ts);border:none;background:none;cursor:pointer;font-family:var(--font);transition:all .15s}
.nav a:hover,.nav button.nl:hover{color:var(--p);background:rgba(0,102,204,.06)}
.btn{display:inline-flex;align-items:center;gap:6px;padding:8px 18px;border-radius:var(--rf);font-weight:600;font-size:.84rem;border:none;cursor:pointer;font-family:var(--font);transition:all .15s;text-decoration:none}
.btn-p{background:var(--g);color:#fff}.btn-p:hover{opacity:.9;transform:translateY(-1px)}
.btn-a{background:var(--ga);color:var(--n)}.btn-a:hover{opacity:.9}
.btn-o{background:transparent;border:2px solid var(--p);color:var(--p)}.btn-o:hover{background:var(--p);color:#fff}
.btn-sm{padding:6px 14px;font-size:.8rem}
.hm{display:none;background:none;border:none;font-size:1.4rem;cursor:pointer;color:var(--n);padding:4px}

/* LIVE BADGE */
.live{display:inline-flex;align-items:center;gap:6px;padding:4px 12px;border-radius:var(--rf);background:rgba(16,185,129,.1);color:var(--s);font-size:.72rem;font-weight:600}
.live::before{content:'';width:6px;height:6px;border-radius:50%;background:var(--s);animation:pulse 2s infinite}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}}

/* HERO */
.hero{min-height:100svh;display:flex;align-items:center;padding:80px 0 60px;background:radial-gradient(ellipse at 20% 50%,rgba(0,102,204,.08),transparent 55%),radial-gradient(ellipse at 80% 20%,rgba(201,168,76,.06),transparent 50%),var(--bg)}
.hero-inner{display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center}
.hero-text{}
h1{font-size:clamp(2rem,4vw,3rem);font-weight:900;color:var(--n);line-height:1.15;margin:14px 0 12px}
h1 .gold{background:var(--ga);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.hero-sub{font-size:1.05rem;color:var(--ts);margin-bottom:28px;max-width:480px}
.hero-btns{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:40px}
.hero-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}
.stat-card{background:var(--sf);border:1px solid var(--b);border-radius:12px;padding:16px 12px;text-align:center;transition:all .25s}
.stat-card:hover{transform:translateY(-2px);box-shadow:var(--sh)}
.stat-n{font-size:1.6rem;font-weight:900;background:var(--g);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.stat-l{font-size:.72rem;color:var(--ts);margin-top:2px}
.hero-visual{position:relative}
.hero-card{background:var(--sf);border:1px solid var(--b);border-radius:20px;padding:28px;box-shadow:var(--shd)}
.hv-header{background:var(--g);border-radius:12px;padding:20px;margin-bottom:16px;color:#fff}
.hv-title{font-size:.95rem;font-weight:700;margin-bottom:4px}
.hv-sub{font-size:.75rem;opacity:.75}
.hv-metric{display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid var(--b)}
.hv-metric:last-child{border-bottom:none}
.hv-label{font-size:.8rem;color:var(--ts)}
.hv-val{font-size:.88rem;font-weight:700;color:var(--n)}
.hv-badge{font-size:.7rem;padding:2px 8px;border-radius:var(--rf);font-weight:600}
.badge-ok{background:rgba(16,185,129,.1);color:var(--s)}
.badge-warn{background:rgba(245,158,11,.1);color:#D97706}

/* INTEGRATION STRIP */
.int-strip{background:var(--n);padding:10px 0}
.int-inner{display:flex;gap:8px;flex-wrap:wrap;justify-content:center;align-items:center}
.int-tag{display:inline-flex;align-items:center;gap:5px;padding:4px 10px;background:rgba(255,255,255,.08);border-radius:var(--rf);font-size:.72rem;color:rgba(255,255,255,.8);font-weight:500}

/* SECTIONS */
.sec{padding:72px 0}
.sec-alt{background:var(--sf)}
.sec-head{text-align:center;margin-bottom:40px}
.sec-head h2{font-size:1.7rem;font-weight:800;color:var(--n)}
.sec-head p{color:var(--ts);margin-top:6px}

/* GRIDS */
.g2{display:grid;grid-template-columns:repeat(2,1fr);gap:18px}
.g3{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
.g4{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}
.g5{display:grid;grid-template-columns:repeat(5,1fr);gap:14px}

/* DEPT CARDS */
.dept-card{background:var(--sf);border:1px solid var(--b);border-radius:var(--r);padding:22px;text-align:center;transition:all .25s}
.dept-card:hover{transform:translateY(-3px);box-shadow:var(--sh)}
.dept-ico{width:52px;height:52px;background:var(--g);border-radius:12px;display:grid;place-items:center;font-size:1.4rem;margin:0 auto 12px}
.dept-name{font-size:.9rem;font-weight:700;color:var(--n);margin-bottom:3px}
.dept-count{font-size:.75rem;color:var(--ts)}

/* BRANCH CARDS */
.branch-card{background:var(--sf);border:1px solid var(--b);border-radius:var(--r);overflow:hidden;transition:all .25s}
.branch-card:hover{box-shadow:var(--shd);transform:translateY(-2px)}
.branch-top{background:var(--g);padding:22px;color:#fff}
.branch-top h3{font-size:.95rem;font-weight:700;margin-bottom:3px}
.branch-top span{font-size:.78rem;opacity:.8}
.branch-body{padding:16px 20px}
.branch-addr{font-size:.78rem;color:var(--ts);margin-bottom:12px}
.branch-chips{display:flex;gap:6px;margin-bottom:12px;flex-wrap:wrap}
.chip{display:inline-flex;align-items:center;font-size:.68rem;padding:3px 8px;border-radius:5px;font-weight:600}
.chip-ok{background:rgba(16,185,129,.1);color:var(--s)}
.chip-gray{background:var(--bg);color:var(--ts)}
.chip-blue{background:rgba(0,102,204,.1);color:var(--p)}

/* DOCTOR CARDS */
.doc-card{background:var(--sf);border:1px solid var(--b);border-radius:var(--r);padding:20px;text-align:center;transition:all .25s}
.doc-card:hover{transform:translateY(-2px);box-shadow:var(--sh)}
.doc-av{width:60px;height:60px;border-radius:50%;background:var(--ga);display:grid;place-items:center;font-size:1.3rem;font-weight:800;color:var(--n);margin:0 auto 12px;font-family:'Inter',sans-serif}
.doc-name{font-size:.88rem;font-weight:700;color:var(--n);margin-bottom:3px}
.doc-spec{font-size:.78rem;color:var(--p);font-weight:600;margin-bottom:4px}
.doc-dept{font-size:.68rem;color:var(--ts);background:var(--bg);padding:2px 8px;border-radius:var(--rf);display:inline-block;margin-bottom:10px}

/* INSURANCE */
.ins-grid{display:flex;flex-wrap:wrap;gap:10px;justify-content:center}
.ins-chip{display:inline-flex;align-items:center;gap:8px;background:var(--sf);border:1px solid var(--b);border-radius:10px;padding:10px 16px;font-size:.85rem;font-weight:600;color:var(--n)}
.ins-dot{width:8px;height:8px;border-radius:50%;background:var(--s);flex-shrink:0}
.ins-cov{font-size:.72rem;color:var(--ts);font-weight:400;margin-left:4px}

/* PORTAL HUB */
.status-tag{cursor:pointer;transition:all .2s}.status-tag:hover{transform:translateY(-2px);opacity:.85}
.pulse{color:var(--s);animation:pulseAnim 2s ease-in-out infinite;font-size:.7em}
@keyframes pulseAnim{0%,100%{opacity:1}50%{opacity:.3}}
#sar-badge,#rate-badge{font-weight:700;color:#fff}
.role-tabs{display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin-bottom:32px}
.role-tab{padding:9px 20px;border-radius:var(--rf);border:2px solid var(--b);background:var(--sf);
  color:var(--ts);font-size:.82rem;font-weight:600;cursor:pointer;transition:all .2s;font-family:inherit}
.role-tab.active{background:var(--p);color:#fff;border-color:var(--p)}
.role-tab:hover:not(.active){border-color:var(--p);color:var(--p)}
.portal-hub-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
.portal-card{background:var(--sf);border:1px solid var(--b);border-radius:var(--rl);
  overflow:hidden;transition:all .3s;display:flex;flex-direction:column}
.portal-card:hover{transform:translateY(-4px);box-shadow:0 12px 40px rgba(0,0,0,.1)}
.portal-card.hidden{display:none}
.pc-header{display:flex;align-items:center;gap:12px;padding:18px 20px;color:#fff}
.bsma-hdr{background:linear-gradient(135deg,#0066CC,#0891B2)}
.givc-hdr{background:linear-gradient(135deg,#059669,#0F766E)}
.sbs-hdr{background:linear-gradient(135deg,#7C3AED,#4F46E5)}
.oracle-hdr{background:linear-gradient(135deg,#C9A84C,#92400E)}
.nphies-hdr{background:linear-gradient(135deg,#1A2B4A,#0066CC)}
.voice-hdr{background:linear-gradient(135deg,#DB2777,#9333EA)}
.pc-icon{font-size:1.6rem;min-width:36px}
.pc-name{font-size:.95rem;font-weight:700;color:#fff}
.pc-sub{font-size:.72rem;color:rgba(255,255,255,.8)}
.pc-badge{margin-inline-start:auto;display:flex;align-items:center;gap:4px;
  background:rgba(255,255,255,.15);padding:3px 10px;border-radius:20px;
  font-size:.65rem;font-weight:700;color:#fff;white-space:nowrap}
.dot-live{width:6px;height:6px;border-radius:50%;background:#4ADE80;
  display:inline-block;animation:pulseAnim 2s infinite}
.dot-ok{color:#10B981}
.pc-body{padding:16px 20px;flex:1}
.pc-features{list-style:none;font-size:.79rem;color:var(--t);line-height:1.7;margin-bottom:14px}
.pc-features li{padding:2px 0;border-bottom:1px solid var(--b)}
.pc-features li:last-child{border:none}
.pc-stats{display:flex;border:1px solid var(--b);border-radius:var(--r);overflow:hidden;margin-top:10px}
.pcs{flex:1;text-align:center;padding:8px 4px;border-inline-end:1px solid var(--b)}
.pcs:last-child{border:none}
.pcs-n{font-size:.85rem;font-weight:700;color:var(--n)}
.pcs-l{font-size:.62rem;color:var(--ts);margin-top:1px}
.pc-footer{padding:14px 20px;border-top:1px solid var(--b);display:flex;gap:8px;align-items:center}
.btn-portal{flex:1;display:inline-flex;align-items:center;justify-content:center;
  padding:9px 14px;border-radius:var(--rf);font-size:.79rem;font-weight:700;
  text-decoration:none;color:#fff;transition:all .2s}
.btn-portal:hover{opacity:.88;transform:translateY(-1px)}
.bsma-btn{background:linear-gradient(135deg,#0066CC,#0891B2)}
.givc-btn{background:linear-gradient(135deg,#059669,#0F766E)}
.sbs-btn{background:linear-gradient(135deg,#7C3AED,#4F46E5)}
.oracle-btn{background:linear-gradient(135deg,#C9A84C,#92400E)}
.nphies-btn{background:linear-gradient(135deg,#1A2B4A,#0066CC)}
.voice-btn{background:linear-gradient(135deg,#DB2777,#9333EA)}
.btn-secondary-sm{padding:8px 12px;border-radius:var(--rf);font-size:.75rem;font-weight:600;
  border:1px solid var(--b);background:var(--bg);color:var(--ts);text-decoration:none;transition:all .2s}
.btn-secondary-sm:hover{border-color:var(--p);color:var(--p)}
.btn-voice{padding:8px 12px;border-radius:var(--rf);font-size:.75rem;font-weight:600;
  background:rgba(219,39,119,.1);border:1px solid rgba(219,39,119,.2);color:#DB2777;
  text-decoration:none;transition:all .2s;white-space:nowrap}
@media(max-width:1100px){.portal-hub-grid{grid-template-columns:repeat(2,1fr)}}
@media(max-width:680px){.portal-hub-grid{grid-template-columns:1fr}}
/* BLOG */
.g4-blog{display:grid;grid-template-columns:repeat(4,1fr);gap:18px}
@media(max-width:1100px){.g4-blog{grid-template-columns:repeat(2,1fr)}}
@media(max-width:600px){.g4-blog{grid-template-columns:1fr}}
.blog-card{background:var(--sf);border:1px solid var(--b);border-radius:var(--r);overflow:hidden;transition:all .25s}
.blog-card:hover{box-shadow:var(--shd);transform:translateY(-2px)}
.blog-top{background:var(--g);padding:18px 20px 14px;display:flex;align-items:center;gap:8px}
.blog-emoji{font-size:1.8rem}
.chip-feat{background:rgba(255,255,255,.2);color:#fff;font-size:.65rem;padding:2px 8px;border-radius:var(--rf);font-weight:600}
.cat-tag{background:rgba(255,255,255,.15);color:rgba(255,255,255,.9);font-size:.65rem;padding:2px 8px;border-radius:var(--rf);font-weight:600;margin-left:auto}
.blog-body{padding:16px 20px 20px}
.blog-title{font-size:.9rem;font-weight:700;color:var(--n);margin-bottom:8px;line-height:1.4}
.blog-excerpt{font-size:.78rem;color:var(--ts);line-height:1.55;margin-bottom:12px}
.blog-meta{display:flex;gap:10px;font-size:.72rem;color:var(--ts);flex-wrap:wrap}

/* NPHIES DASHBOARD */
.nphies-grid{display:grid;grid-template-columns:1fr 340px;gap:24px}
.nphies-banner{background:var(--g);border-radius:var(--r);padding:28px;color:#fff;margin-bottom:16px}
.nb-label{font-size:.68rem;letter-spacing:.12em;opacity:.7;text-transform:uppercase;margin-bottom:4px}
.nb-amount{font-size:2.2rem;font-weight:800;margin-bottom:4px}
.nb-sub{font-size:.78rem;opacity:.7;margin-bottom:16px}
.nb-bar{background:rgba(255,255,255,.2);border-radius:4px;height:8px;overflow:hidden;margin-bottom:6px}
.nb-fill{height:100%;background:linear-gradient(90deg,#10B981,#34D399);border-radius:4px}
.nb-rate{font-size:.82rem;opacity:.8}
.branch-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}
.branch-card{background:var(--sf);border:1px solid var(--b);border-radius:10px;padding:14px;text-align:center}
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
.pa-card{background:var(--sf);border:1px solid var(--b);border-radius:var(--r);padding:18px}
.pa-row{display:flex;justify-content:space-between;padding:7px 0;border-bottom:1px solid var(--b);font-size:.82rem;color:var(--ts)}
.pa-row:last-child{border-bottom:none}
.pa-row strong{color:var(--n);font-weight:700}
@media(max-width:900px){.nphies-grid{grid-template-columns:1fr}.branch-grid{grid-template-columns:repeat(2,1fr)}}
/* ACADEMY */
.academy-stats{display:flex;gap:12px;justify-content:center;margin-bottom:32px;flex-wrap:wrap}
.course-card{background:var(--sf);border:1px solid var(--b);border-radius:var(--r);padding:22px;border-top:4px solid var(--a);transition:all .25s}
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

/* CTA */
.cta{background:var(--g);padding:72px 0;text-align:center}
.cta h2{font-size:1.7rem;color:#fff;margin-bottom:10px}
.cta p{color:rgba(255,255,255,.8);margin-bottom:28px}
.cta-btns{display:flex;gap:10px;justify-content:center;flex-wrap:wrap}
.btn-white{background:#fff;color:var(--n)}.btn-white:hover{background:var(--ga)}
.btn-wa{background:#25D366;color:#fff}.btn-wa:hover{opacity:.9}

/* FOOTER */
.ftr{background:var(--n);color:rgba(255,255,255,.65);padding:48px 0 24px}
.ftr-grid{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:28px;margin-bottom:32px}
.ftr h4{color:#fff;font-size:.88rem;margin-bottom:12px}
.ftr a{display:block;font-size:.82rem;margin-bottom:6px;color:rgba(255,255,255,.55);transition:color .15s}
.ftr a:hover{color:var(--a)}
.ftr-bottom{border-top:1px solid rgba(255,255,255,.1);padding-top:20px;text-align:center;font-size:.78rem}

/* CHAT */
.chat-fab{position:fixed;bottom:24px;${ar ? 'left' : 'right'}:24px;width:52px;height:52px;background:var(--g);border-radius:50%;display:grid;place-items:center;box-shadow:0 4px 16px rgba(0,102,204,.4);z-index:90;cursor:pointer;border:none;font-size:1.4rem;color:#fff;transition:transform .2s}
.chat-fab:hover{transform:scale(1.1)}
.chat-box{position:fixed;bottom:86px;${ar ? 'left' : 'right'}:16px;width:340px;max-height:480px;background:var(--sf);border:1px solid var(--b);border-radius:var(--r);box-shadow:var(--shd);z-index:89;display:flex;flex-direction:column;overflow:hidden;opacity:0;pointer-events:none;transform:translateY(12px);transition:all .2s}
.chat-box.open{opacity:1;pointer-events:all;transform:translateY(0)}
.chat-head{background:var(--g);padding:14px 16px;color:#fff;font-weight:600;font-size:.88rem;display:flex;justify-content:space-between;align-items:center}
.chat-head button{background:none;border:none;color:#fff;cursor:pointer;font-size:1rem;line-height:1}
.chat-msgs{flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:8px}
.msg{padding:9px 12px;border-radius:10px;font-size:.82rem;max-width:86%;line-height:1.5;word-break:break-word}
.msg-u{background:rgba(0,102,204,.1);color:var(--t);align-self:${ar ? 'flex-start' : 'flex-end'}}
.msg-a{background:var(--bg);color:var(--t);align-self:${ar ? 'flex-end' : 'flex-start'}}
.chat-foot{border-top:1px solid var(--b);padding:10px;display:flex;gap:8px}
.chat-inp{flex:1;border:1px solid var(--b);border-radius:var(--rf);padding:8px 12px;font-size:.82rem;font-family:var(--font);outline:none;transition:border-color .15s}
.chat-inp:focus{border-color:var(--p)}
.chat-send{background:var(--p);color:#fff;border:none;border-radius:var(--rf);padding:8px 14px;cursor:pointer;font-size:.82rem;font-weight:600;font-family:var(--font)}
.wa-btn{position:fixed;bottom:24px;${ar ? 'right' : 'left'}:24px;width:48px;height:48px;background:#25D366;border-radius:50%;display:grid;place-items:center;box-shadow:0 4px 16px rgba(37,211,102,.4);z-index:90;font-size:1.3rem;transition:transform .2s}
.wa-btn:hover{transform:scale(1.1)}

/* SEARCH BAR */
.search-bar{display:flex;gap:10px;margin-bottom:20px;flex-wrap:wrap}
.search-inp{flex:1;min-width:180px;padding:9px 14px;border:1px solid var(--b);border-radius:var(--rf);font-size:.85rem;font-family:var(--font);outline:none;background:var(--sf);transition:border-color .15s}
.search-inp:focus{border-color:var(--p)}
.search-sel{padding:9px 14px;border:1px solid var(--b);border-radius:var(--rf);font-size:.85rem;font-family:var(--font);background:var(--sf);outline:none}

/* RESPONSIVE */
@media(max-width:960px){
  .hero-inner{grid-template-columns:1fr}.hero-visual{display:none}
  .g4{grid-template-columns:repeat(2,1fr)}.g5{grid-template-columns:repeat(2,1fr)}
  .ftr-grid{grid-template-columns:1fr 1fr}
}
@media(max-width:640px){
  .nav{display:none}.hm{display:block}
  .g2,.g3{grid-template-columns:1fr}.g4{grid-template-columns:1fr 1fr}
  .hero-stats{grid-template-columns:repeat(2,1fr)}
  .chat-box{width:calc(100vw - 32px)}
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
    <a href="/patient${lang === 'en' ? '?lang=en' : ''}">${ar ? '🙂 مريض' : '🙂 Patient'}</a>
    <a href="/clinician${lang === 'en' ? '?lang=en' : ''}">${ar ? '🩺 طبيب' : '🩺 Clinician'}</a>
    <a href="/billing${lang === 'en' ? '?lang=en' : ''}">${ar ? '💰 فواتير' : '💰 Billing'}</a>
    <a href="/status${lang === 'en' ? '?lang=en' : ''}">${ar ? '📊 الحالة' : '📊 Status'}</a>
    <a href="#depts">${T.depts}</a>
    <a href="#branches">${T.branches}</a>
    <a href="#doctors">${T.doctors}</a>
    <a href="#portals">${ar ? 'بواباتنا' : 'Portals'}</a>
    <a href="#blog">${T.blog}</a>
    <a href="#academy">${T.academy_nav}</a>
    <a href="https://bsma.elfadil.com" target="_blank">BSMA</a>
    <a href="https://givc.elfadil.com" target="_blank">GIVC</a>
    <a href="https://sbs.elfadil.com" target="_blank">SBS</a>
    <button class="nl" id="lang-btn">${ar ? 'EN' : 'عربي'}</button>
    <a href="tel:966${PHONE}" class="btn btn-p btn-sm">${T.book}</a>
  </nav>
  <button class="hm" id="menu-btn" aria-label="Menu">☰</button>
</div>
</header>

<!-- HERO -->
<section class="hero">
<div class="c">
<div class="hero-inner">
  <div class="hero-text">
    <div class="live" id="live-badge">● ${ar ? 'بيانات حية' : 'Live Data'}</div>
    <h1>${ar ? 'مجموعة<br><span class="gold">مستشفيات الحياة الوطني</span>' : 'Group of<br><span class="gold">Hayat National Hospitals</span>'}</h1>
    <p class="hero-sub">${T.tagline}</p>
    <div class="hero-btns">
      <a href="tel:966${PHONE}" class="btn btn-a">${T.book}</a>
      <a href="https://bsma.elfadil.com" target="_blank" class="btn btn-o">${T.patient}</a>
    </div>
    <div class="hero-stats">
      <div class="stat-card"><div class="stat-n" id="stat-prov">269</div><div class="stat-l">${T.s_doc}</div></div>
      <div class="stat-card"><div class="stat-n">6</div><div class="stat-l">${ar ? 'فروع' : 'Branches'}</div></div>
      <div class="stat-card"><div class="stat-n" id="stat-dept">20</div><div class="stat-l">${T.s_dept}</div></div>
      <div class="stat-card"><div class="stat-n">1050</div><div class="stat-l">${T.s_bed}</div></div>
    </div>
  </div>
  <div class="hero-visual">
    <div class="hero-card">
      <div class="hv-header">
        <div class="hv-title">🏥 NPHIES Network Dashboard</div>
        <div class="hv-sub">${ar ? 'شبكة مستشفيات الحياة الوطني — بيانات حية' : 'Hayat National Hospital Group — Live Data'}</div>
      </div>
      <div class="hv-metric"><span class="hv-label">${ar ? 'إجمالي الشبكة' : 'Network Total'}</span><span class="hv-val" id="hv-sar">SAR 835.7M</span></div>
      <div class="hv-metric"><span class="hv-label">${ar ? 'معدل الموافقة' : 'Approval Rate'}</span><span class="hv-val"><span class="hv-badge badge-ok" id="hv-rate">98.6%</span></span></div>
      <div class="hv-metric"><span class="hv-label">${ar ? 'المطالبات' : 'Claims'}</span><span class="hv-val" id="hv-claims">15,138</span></div>
      <div class="hv-metric"><span class="hv-label">${ar ? 'الرياض (⚠️)' : 'Riyadh (⚠️)'}</span><span class="hv-val"><span class="hv-badge badge-warn" id="hv-riyadh">88.5%</span></span></div>
      <div class="hv-metric"><span class="hv-label">${ar ? 'كلينك AI — الاسترداد' : 'ClaimLinc AI Recovery'}</span><span class="hv-val" id="hv-recovery">SAR 9.8M</span></div>
    </div>
  </div>
</div>
</div>
</section>

<!-- INTEGRATION STRIP — Live clickable status -->
<div class="int-strip">
<div class="c"><div class="int-inner">
  <span class="int-tag status-tag" id="bsma-badge" onclick="goPortal('bsma')" title="Patient Portal — bsma.elfadil.com">🙂 BSMA <span class="pulse">●</span></span>
  <span class="int-tag status-tag" id="givc-badge" onclick="goPortal('givc')" title="Clinician Portal — givc.elfadil.com">🩺 GIVC <span class="pulse">●</span></span>
  <span class="int-tag status-tag" id="sbs-badge"  onclick="goPortal('sbs')"  title="Billing Portal — sbs.elfadil.com">💰 SBS  <span class="pulse">●</span></span>
  <span class="int-tag status-tag" id="oracle-tag" onclick="goPortal('oracle')" title="${ar ? 'Oracle HIS — النفق متوقف (انتهت مهلة جميع الفروع)' : 'Oracle HIS — Tunnel degraded (all branches timeout)'}">🔷 Oracle ⚠</span>
  <span class="int-tag status-tag" id="nphies-tag" onclick="goPortal('nphies')" title="NPHIES Portal">🏛️ NPHIES <span class="pulse">●</span></span>
  <span class="int-tag" id="sar-badge" title="${ar ? 'إجمالي شبكة NPHIES' : 'Total NPHIES Network'}">💰 SAR <span id="sar-val">835.7M</span></span>
  <span class="int-tag" id="rate-badge" title="${ar ? 'معدل موافقة الشبكة' : 'Network Approval Rate'}"><span id="rate-val">98.6</span>% ${ar ? 'موافقة' : '✓ Approval'}</span>
  <span class="int-tag" style="cursor:pointer" onclick="document.getElementById('portals').scrollIntoView({behavior:'smooth'})">${ar ? '🎙️ بسمة AI' : '🎙️ Basma AI'}</span>
</div></div>
</div>

<!-- DEPARTMENTS -->
<section class="sec" id="depts">
<div class="c">
  <div class="sec-head"><h2>${T.h_depts}</h2><p>${T.p_depts}</p></div>
  <div class="g4" id="dept-grid"><div style="grid-column:1/-1;text-align:center;padding:40px;color:var(--ts)">${T.loading}</div></div>
</div>
</section>

<!-- BRANCHES -->
<section class="sec sec-alt" id="branches">
<div class="c">
  <div class="sec-head"><h2>${T.h_branches}</h2><p>${T.p_branches}</p></div>
  <div class="g3" id="branch-grid"><div style="grid-column:1/-1;text-align:center;padding:40px;color:var(--ts)">${T.loading}</div></div>
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
  <div class="g4" id="doc-grid"><div style="grid-column:1/-1;text-align:center;padding:40px;color:var(--ts)">${T.loading}</div></div>
  <div style="text-align:center;margin-top:24px">
    <a href="https://bsma.elfadil.com" target="_blank" class="btn btn-o">${T.view_all}</a>
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

<!-- PORTAL HUB — Role-based routing for all user types -->
<section class="sec sec-alt" id="portals">
<div class="c">
  <div class="sec-head">
    <h2>${ar ? 'بواباتنا الذكية' : 'Smart Portal Hub'}</h2>
    <p>${ar ? 'الوصول الفوري للبوابة المناسبة — حسب دورك ومهمتك' : 'Instant access to the right portal — by role and task'}</p>
  </div>

  <!-- Role selector tabs -->
  <div class="role-tabs">
    <button class="role-tab active" data-role="all"     onclick="setRole(this,'all')">${ar ? '🌐 الكل' : '🌐 All'}</button>
    <button class="role-tab"        data-role="patient"  onclick="setRole(this,'patient')">${ar ? '🙂 مريض' : '🙂 Patient'}</button>
    <button class="role-tab"        data-role="clinician" onclick="setRole(this,'clinician')">${ar ? '🩺 طبيب' : '🩺 Clinician'}</button>
    <button class="role-tab"        data-role="billing"  onclick="setRole(this,'billing')">${ar ? '💰 فواتير' : '💰 Billing'}</button>
    <button class="role-tab"        data-role="admin"    onclick="setRole(this,'admin')">${ar ? '⚙️ إداري' : '⚙️ Admin'}</button>
  </div>

  <!-- Portal cards grid -->
  <div class="portal-hub-grid" id="portal-grid">

    <!-- BSMA — Patient Portal -->
    <div class="portal-card" data-roles="all patient">
      <div class="pc-header bsma-hdr">
        <div class="pc-icon">🙂</div>
        <div>
          <div class="pc-name">BSMA</div>
          <div class="pc-sub">${ar ? 'بوابة المريض' : 'Patient Portal'}</div>
        </div>
        <div class="pc-badge" id="bsma-status"><span class="dot-live"></span>${ar ? 'مباشر' : 'Live'}</div>
      </div>
      <div class="pc-body">
        <ul class="pc-features">
          <li>📅 ${ar ? 'حجز مواعيد عبر Oracle OPD' : 'Book via Oracle OPD'}</li>
          <li>🛡️ ${ar ? 'التحقق من أهلية التأمين NPHIES' : 'NPHIES eligibility check'}</li>
          <li>📋 ${ar ? 'متابعة المطالبات' : 'Track claims'}</li>
          <li>🤖 ${ar ? 'بسمة — المساعدة الصوتية AI' : 'Basma — AI voice assistant'}</li>
          <li>🔍 ${ar ? 'البحث في السجل الطبي' : 'Medical record search'}</li>
        </ul>
        <div class="pc-stats" id="bsma-live-stats">
          <div class="pcs"><div class="pcs-n" id="bsma-pa">51,018</div><div class="pcs-l">${ar ? 'موافقة مسبقة' : 'Prior Auths'}</div></div>
          <div class="pcs"><div class="pcs-n" id="bsma-claims">15,138</div><div class="pcs-l">${ar ? 'مطالبة' : 'Claims'}</div></div>
          <div class="pcs"><div class="pcs-n">6</div><div class="pcs-l">${ar ? 'مستشفيات' : 'Hospitals'}</div></div>
        </div>
      </div>
      <div class="pc-footer">
        <a href="https://bsma.elfadil.com" target="_blank" class="btn btn-portal bsma-btn">${ar ? '🚀 الدخول لبوابة المريض' : '🚀 Enter Patient Portal'}</a>
        <a href="/voice/widget" target="_blank" class="btn btn-voice">🎙️ ${ar ? 'بسمة' : 'Basma Voice'}</a>
      </div>
    </div>

    <!-- GIVC — Clinician Portal -->
    <div class="portal-card" data-roles="all clinician">
      <div class="pc-header givc-hdr">
        <div class="pc-icon">🩺</div>
        <div>
          <div class="pc-name">GIVC</div>
          <div class="pc-sub">${ar ? 'بوابة الطبيب' : 'Clinician Portal'}</div>
        </div>
        <div class="pc-badge" id="givc-status"><span class="dot-live"></span>${ar ? 'مباشر' : 'Live'}</div>
      </div>
      <div class="pc-body">
        <ul class="pc-features">
          <li>🏥 ${ar ? 'قائمة انتظار المرضى المباشرة' : 'Live patient queue'}</li>
          <li>📝 ${ar ? 'توثيق سريري FHIR R4' : 'FHIR R4 clinical docs'}</li>
          <li>💊 ${ar ? 'الطلبات والصرف الدوائي' : 'Orders & prescriptions'}</li>
          <li>📊 ${ar ? 'لوحة إحصائيات NPHIES' : 'NPHIES stats dashboard'}</li>
          <li>🔗 ${ar ? 'الإحالات بين الأطباء' : 'Physician referrals'}</li>
        </ul>
        <div class="pc-stats" id="givc-live-stats">
          <div class="pcs"><div class="pcs-n" id="givc-queue">—</div><div class="pcs-l">${ar ? 'في الانتظار' : 'In Queue'}</div></div>
          <div class="pcs"><div class="pcs-n" id="givc-docs">5</div><div class="pcs-l">${ar ? 'طبيب متاح' : 'Doctors'}</div></div>
          <div class="pcs"><div class="pcs-n" id="givc-rate">98.6%</div><div class="pcs-l">${ar ? 'موافقة' : 'Approval'}</div></div>
        </div>
      </div>
      <div class="pc-footer">
        <a href="https://givc.elfadil.com" target="_blank" class="btn btn-portal givc-btn">${ar ? '🚀 الدخول لبوابة الطبيب' : '🚀 Enter Clinician Portal'}</a>
        <a href="https://sdc.elfadil.com" target="_blank" class="btn btn-secondary-sm">📋 SDC</a>
      </div>
    </div>

    <!-- SBS — Billing Portal -->
    <div class="portal-card" data-roles="all billing admin">
      <div class="pc-header sbs-hdr">
        <div class="pc-icon">💰</div>
        <div>
          <div class="pc-name">SBS ClaimLinc</div>
          <div class="pc-sub">${ar ? 'بوابة الفواتير' : 'Billing & Claims'}</div>
        </div>
        <div class="pc-badge" id="sbs-status"><span class="dot-live"></span>${ar ? 'مباشر' : 'Live'}</div>
      </div>
      <div class="pc-body">
        <ul class="pc-features">
          <li>📤 ${ar ? 'تقديم مطالبات NPHIES' : 'NPHIES claim submission'}</li>
          <li>🛡️ ${ar ? 'التحقق من تغطية التأمين' : 'Insurance coverage check'}</li>
          <li>⚠️ ${ar ? 'تحليل رفضات الرياض (88.5%)' : 'Riyadh rejections analysis (88.5%)'}</li>
          <li>🤖 ${ar ? 'ClaimLinc AI — تحسين تلقائي' : 'ClaimLinc AI auto-optimize'}</li>
          <li>📊 ${ar ? 'تقارير إيرادات AR-DRG' : 'AR-DRG revenue reports'}</li>
        </ul>
        <div class="pc-stats" id="sbs-live-stats">
          <div class="pcs"><div class="pcs-n">SAR 835M</div><div class="pcs-l">${ar ? 'إجمالي الشبكة' : 'Network'}</div></div>
          <div class="pcs"><div class="pcs-n" id="sbs-cov">6</div><div class="pcs-l">${ar ? 'وثائق تأمين' : 'Coverage'}</div></div>
          <div class="pcs"><div class="pcs-n" style="color:#EF4444">SAR 11.3M</div><div class="pcs-l">${ar ? 'رفضات RUH' : 'RUH Rejected'}</div></div>
        </div>
      </div>
      <div class="pc-footer">
        <a href="https://sbs.elfadil.com" target="_blank" class="btn btn-portal sbs-btn">${ar ? '🚀 الدخول لبوابة الفواتير' : '🚀 Enter Billing Portal'}</a>
        <a href="/api/nphies/analysis" target="_blank" class="btn btn-secondary-sm">📊 API</a>
      </div>
    </div>

    <!-- Oracle HIS — Admin/Clinical -->
    <div class="portal-card" data-roles="all admin clinician">
      <div class="pc-header oracle-hdr">
        <div class="pc-icon">🔷</div>
        <div>
          <div class="pc-name">Oracle OASIS</div>
          <div class="pc-sub">${ar ? 'نظام المستشفى HIS' : 'Hospital HIS'}</div>
        </div>
        <div class="pc-badge" id="oracle-status" style="background:rgba(239,68,68,.12);color:#EF4444"><span class="dot-live" style="background:#EF4444"></span>${ar ? 'متدهور' : 'Degraded'}</div>
      </div>
      <div class="pc-body">
        <ul class="pc-features">
          <li>🏥 ${ar ? '6 مستشفيات Oracle OASIS' : '6 Oracle OASIS hospitals'}</li>
          <li>🌐 ${ar ? 'جسر Cloudflare (بدون VPN)' : 'Cloudflare bridge (no VPN)'}</li>
          <li>🔐 ${ar ? 'FHIR R4 + HIPAA + PDPL' : 'FHIR R4 + HIPAA + PDPL'}</li>
          <li>🔄 ${ar ? 'مزامنة المواعيد تلقائياً' : 'Auto appointment sync'}</li>
          <li>🧪 ${ar ? 'نتائج المختبر والأشعة' : 'Lab & radiology results'}</li>
        </ul>
        <div class="pc-stats oracle-tunnel" id="oracle-tunnel-stats">
          <div class="pcs"><div class="pcs-n dot-ok">MED ✓</div><div class="pcs-l">Madinah</div></div>
          <div class="pcs"><div class="pcs-n dot-ok">KHM ✓</div><div class="pcs-l">Khamis</div></div>
          <div class="pcs"><div class="pcs-n dot-ok">ABH ✓</div><div class="pcs-l">Abha</div></div>
        </div>
      </div>
      <div class="pc-footer">
        <a href="https://oracle-riyadh.elfadil.com" target="_blank" class="btn btn-portal oracle-btn">${ar ? '🔷 Oracle الرياض' : '🔷 Oracle Riyadh'}</a>
        <a href="https://oracle-madinah.elfadil.com" target="_blank" class="btn btn-secondary-sm">المدينة</a>
      </div>
    </div>

    <!-- NPHIES — Compliance -->
    <div class="portal-card" data-roles="all admin billing">
      <div class="pc-header nphies-hdr">
        <div class="pc-icon">🏛️</div>
        <div>
          <div class="pc-name">NPHIES</div>
          <div class="pc-sub">${ar ? 'منصة التأمين الوطني' : 'National Health Insurance'}</div>
        </div>
        <div class="pc-badge"><span class="dot-live"></span>${ar ? 'مباشر' : 'Live'}</div>
      </div>
      <div class="pc-body">
        <ul class="pc-features">
          <li>✅ ${ar ? 'رفع مطالبات GSS مباشرة' : 'Direct GSS claim submission'}</li>
          <li>🔍 ${ar ? 'التحقق من الأهلية (270/271)' : 'Eligibility (270/271)'}</li>
          <li>📋 ${ar ? 'الموافقات المسبقة PA' : 'Prior authorizations'}</li>
          <li>📊 ${ar ? '81 مطالبة GSS | 51,297 PA' : '81 GSS claims | 51,297 PA'}</li>
          <li>🔔 ${ar ? 'تنبيهات رفض الرياض ⚠️' : 'Riyadh rejection alerts ⚠️'}</li>
        </ul>
        <div class="pc-stats">
          <div class="pcs"><div class="pcs-n">SAR 835M</div><div class="pcs-l">Network</div></div>
          <div class="pcs"><div class="pcs-n" style="color:#EAB308">88.5%</div><div class="pcs-l">RUH Rate</div></div>
          <div class="pcs"><div class="pcs-n" style="color:#10B981">100%</div><div class="pcs-l">Others</div></div>
        </div>
      </div>
      <div class="pc-footer">
        <a href="https://portal.nphies.sa" target="_blank" class="btn btn-portal nphies-btn">${ar ? '🏛️ بوابة NPHIES' : '🏛️ NPHIES Portal'}</a>
        <a href="/api/nphies/analysis" target="_blank" class="btn btn-secondary-sm">📊 ${ar ? 'تحليل' : 'Analysis'}</a>
      </div>
    </div>

    <!-- Basma Voice — AI Assistant -->
    <div class="portal-card" data-roles="all patient">
      <div class="pc-header voice-hdr">
        <div class="pc-icon">🎙️</div>
        <div>
          <div class="pc-name">${ar ? 'بسمة' : 'Basma AI'}</div>
          <div class="pc-sub">${ar ? 'المساعد الصوتي الذكي' : 'Voice AI Assistant'}</div>
        </div>
        <div class="pc-badge"><span class="dot-live"></span>ElevenLabs</div>
      </div>
      <div class="pc-body">
        <ul class="pc-features">
          <li>🎙️ ${ar ? 'تفاعل صوتي بالعربية والإنجليزية' : 'Arabic & English voice'}</li>
          <li>📅 ${ar ? 'حجز مواعيد بالصوت' : 'Voice appointment booking'}</li>
          <li>🛡️ ${ar ? 'التحقق الفوري من التأمين' : 'Instant eligibility check'}</li>
          <li>📋 ${ar ? 'متابعة مطالبات NPHIES' : 'Track NPHIES claims'}</li>
          <li>🤖 ${ar ? 'DeepSeek V4 + Claude Sonnet' : 'DeepSeek V4 + Claude Sonnet'}</li>
        </ul>
        <div class="pc-stats">
          <div class="pcs"><div class="pcs-n">v2.1</div><div class="pcs-l">Version</div></div>
          <div class="pcs"><div class="pcs-n">AR/EN</div><div class="pcs-l">Bilingual</div></div>
          <div class="pcs"><div class="pcs-n">24/7</div><div class="pcs-l">${ar ? 'متاح' : 'Available'}</div></div>
        </div>
      </div>
      <div class="pc-footer">
        <a href="/voice/widget" target="_blank" class="btn btn-portal voice-btn">${ar ? '🎙️ تحدث مع بسمة' : '🎙️ Talk to Basma'}</a>
        <a href="https://voice.hnh.brainsait.org" target="_blank" class="btn btn-secondary-sm">Web</a>
      </div>
    </div>

  </div><!-- /portal-hub-grid -->
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
        <div class="nb-bar"><div class="nb-fill" style="width:98.6%"></div></div>
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
        <a href="tel:966920000094" class="btn-enroll" style="display:block;text-align:center;margin-top:12px">${ar ? '🤖 فعّل ClaimLinc AI' : '🤖 Activate ClaimLinc AI'}</a>
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
  <div class="g4-blog" id="blog-grid">${blogHtml}</div>
  <div style="text-align:center;margin-top:28px">
    <a href="https://github.com/Fadil369" target="_blank" class="btn btn-o">${T.all_arts}</a>
  </div>
</div>
</section>

<!-- ACADEMY -->
<section class="sec sec-alt" id="academy">
<div class="c">
  <div class="sec-head"><h2>${T.h_academy}</h2><p>${T.p_academy}</p></div>
  <div class="academy-stats">
    <div class="stat-card"><div class="stat-n">9</div><div class="stat-l">${ar ? 'دورات' : 'Courses'}</div></div>
    <div class="stat-card"><div class="stat-n">104+</div><div class="stat-l">${ar ? 'ساعة' : 'Hours'}</div></div>
    <div class="stat-card"><div class="stat-n">SCFHS</div><div class="stat-l">${ar ? 'معتمد' : 'Accredited'}</div></div>
    <div class="stat-card"><div class="stat-n">AR/EN</div><div class="stat-l">${ar ? 'ثنائي اللغة' : 'Bilingual'}</div></div>
  </div>
  <div class="g3">${academyHtml}</div>
</div>
</section>

<!-- CTA -->
<section class="cta">
<div class="c">
  <h2>${T.h_cta}</h2>
  <p>${T.p_cta}</p>
  <div class="cta-btns">
    <a href="tel:966${PHONE}" class="btn btn-a">📞 ${PHONE}</a>
    <a href="https://bsma.elfadil.com" target="_blank" class="btn btn-white">${T.patient}</a>
    <a href="https://wa.me/966${PHONE}" target="_blank" class="btn btn-wa">💬 WhatsApp</a>
  </div>
</div>
</section>

<!-- FOOTER -->
<footer class="ftr">
<div class="c">
  <div class="ftr-grid">
    <div>
      <h4>${T.title}</h4>
      <p style="font-size:.82rem;margin-bottom:10px">${ar ? 'تأسست 1999 | شركة الإنماء للخدمات الطبية | Org ID: 624' : 'Est. 1999 | AlInma Medical Services | Org ID: 624'}</p>
      <div class="live">● API v${VERSION} Live</div>
      <p style="font-size:.7rem;color:rgba(255,255,255,.3);margin-top:8px">License: ${FACILITY_LIC}</p>
    </div>
    <div>
      <h4>${ar ? 'المنصات' : 'Portals'}</h4>
      <a href="https://bsma.elfadil.com" target="_blank">🙂 BSMA</a>
      <a href="https://givc.elfadil.com" target="_blank">🩺 GIVC</a>
      <a href="https://sbs.elfadil.com" target="_blank">💰 SBS</a>
      <a href="https://portal.nphies.sa" target="_blank">🏛️ NPHIES</a>
      <a href="https://oracle-bridge.brainsait.org/health" target="_blank">🔷 Oracle Bridge</a>
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
      <a href="https://wa.me/966${PHONE}" target="_blank">💬 WhatsApp</a>
      <p style="font-size:.76rem;color:rgba(255,255,255,.35);margin-top:10px">${ar ? 'الرياض · جازان · خميس مشيط · المدينة · عنيزة · أبها' : 'Riyadh · Jazan · Khamis · Madinah · Unayzah · Abha'}</p>
    </div>
  </div>
  <div class="ftr-bottom">© 2026 ${ORG_NAME_EN} — BrainSAIT Healthcare OS v${VERSION}</div>
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
<a href="https://wa.me/966${PHONE}" class="wa-btn" target="_blank" rel="noopener" title="WhatsApp">💬</a>

<script>
// ── CONFIG ───────────────────────────────────────────────────
var AR   = ${ar};
var LANG = '${lang}';
var API  = '';  // same-origin

// ── LANG TOGGLE ──────────────────────────────────────────────
document.getElementById('lang-btn').onclick = function() {
  location.search = '?lang=' + (AR ? 'en' : 'ar');
};

// ── MOBILE MENU ──────────────────────────────────────────────
var menuOpen = false;
document.getElementById('menu-btn').onclick = function() {
  var nav = document.getElementById('main-nav');
  menuOpen = !menuOpen;
  if (menuOpen) {
    nav.style.cssText = 'display:flex;flex-direction:column;position:fixed;inset:64px 0 0 0;background:#fff;padding:24px 20px;gap:4px;z-index:99;border-top:1px solid #E2E8F0';
  } else {
    nav.style.cssText = '';
  }
};

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

// ── PORTAL ROLE FILTER ───────────────────────────────────────
function setRole(btn, role) {
  document.querySelectorAll('.role-tab').forEach(function(t) { t.classList.remove('active'); });
  btn.classList.add('active');
  document.querySelectorAll('.portal-card').forEach(function(card) {
    var roles = card.getAttribute('data-roles') || 'all';
    if (role === 'all' || roles.split(' ').includes(role)) {
      card.classList.remove('hidden');
    } else {
      card.classList.add('hidden');
    }
  });
}

function goPortal(key) {
  var portals = {
    bsma:   'https://bsma.elfadil.com',
    givc:   'https://givc.elfadil.com',
    sbs:    'https://sbs.elfadil.com',
    oracle: 'https://oracle-bridge.brainsait.org/health',
    nphies: 'https://portal.nphies.sa'
  };
  if (portals[key]) window.open(portals[key], '_blank');
}

// Dashboard — single call replaces /api/stats + /api/portal-hub
(function loadDashboard() {
  fetch(API + '/api/dashboard')
    .then(function(r) { return r.json(); })
    .then(function(d) {
      var s   = d.stats  || {};
      var net = d.nphies || {};

      // Hero stats
      var pEl = document.getElementById('stat-prov');
      var dEl = document.getElementById('stat-dept');
      if (pEl) pEl.textContent = (d.total_providers || s.total_providers || 269).toLocaleString();
      if (dEl) dEl.textContent = (s.total_departments || 20).toLocaleString();

      // Hero card live values
      var hvSar  = document.getElementById('hv-sar');
      var hvRate = document.getElementById('hv-rate');
      var hvCl   = document.getElementById('hv-claims');
      if (hvSar  && net.total_sar)     hvSar.textContent  = 'SAR ' + (net.total_sar / 1e6).toFixed(1) + 'M';
      if (hvRate && net.approval_rate) hvRate.textContent = net.approval_rate + '%';
      if (hvCl   && net.total_claims)  hvCl.textContent   = Number(net.total_claims).toLocaleString();

      // Integration strip — SAR + approval rate
      var sarEl  = document.getElementById('sar-val');
      var rateEl = document.getElementById('rate-val');
      if (sarEl  && net.total_sar)     sarEl.textContent  = (net.total_sar / 1e6).toFixed(1) + 'M';
      if (rateEl && net.approval_rate) rateEl.textContent = net.approval_rate;

      // BSMA card stats
      var bPa = document.getElementById('bsma-pa');
      var bCl = document.getElementById('bsma-claims');
      if (bPa) bPa.textContent = Number(net.total_pa || 51018).toLocaleString();
      if (bCl) bCl.textContent = Number(net.total_claims || 15138).toLocaleString();

      // SBS coverage
      var sbsCov = document.getElementById('sbs-cov');
      if (sbsCov && d.coverage) sbsCov.textContent = d.coverage.total || 6;

      // GIVC approval rate
      var gRate = document.getElementById('givc-rate');
      if (gRate && net.approval_rate) gRate.textContent = net.approval_rate + '%';

      // Oracle badge in integration strip
      var oTag = document.getElementById('oracle-tag');
      if (oTag) oTag.innerHTML = d.oracle_status
        ? '🔷 Oracle <span class="pulse">●</span>'
        : '🔷 Oracle ⚠';

      // Oracle portal card status
      var oCard = document.getElementById('oracle-status');
      if (oCard) {
        if (d.oracle_status) {
          oCard.style.background = 'rgba(74,222,128,.15)';
          oCard.style.color = '#10B981';
          oCard.querySelector('.dot-live').style.background = '#4ADE80';
          oCard.innerHTML = '<span class="dot-live" style="background:#4ADE80"></span>' + (AR ? 'مباشر' : 'Live');
        }
        // stays degraded (red) if oracle_status === false — already rendered server-side
      }

      // NPHIES strip badge
      var nTag = document.getElementById('nphies-tag');
      if (nTag && net.total_sar > 0) nTag.innerHTML = '🏛️ NPHIES <span class="pulse">●</span>';

      // Portal card status badges (from portals map)
      Object.keys(d.portals || {}).forEach(function(k) {
        var el = document.getElementById(k + '-status');
        if (!el) return;
        var live = (d.portals[k].status || d.portals[k]) === 'live' || d.portals[k].status === 'live';
        el.style.background = live ? 'rgba(74,222,128,.2)' : 'rgba(239,68,68,.15)';
        var dot = el.querySelector('.dot-live');
        if (dot) dot.style.background = live ? '#4ADE80' : '#EF4444';
      });
    })
    .catch(function() {});

  // GIVC live queue (separate — slow external endpoint)
  fetch('https://givc.elfadil.com/api/queue', { signal: AbortSignal.timeout(5000) })
    .then(function(r) { return r.json(); })
    .then(function(d) {
      var el = document.getElementById('givc-queue');
      if (el) el.textContent = (d.queue || []).length;
    })
    .catch(function() {});
})();

// Providers → Departments + Doctors
var allProviders = [];
fetchJSON('/api/providers', function(d) {
  allProviders = d.providers || [];
  renderDepts();
  renderDoctors(allProviders.slice(0, 8));
  buildSpecFilter();
});

function renderDepts() {
  var deptMap = {};
  var deptIcons = {
    'Cardiology':'❤️','Surgery':'🔪','Pediatrics':'👶','Orthopedics':'🦴',
    'Dermatology':'💆','Internal':'🩺','Gynecology':'👩','Ophthalmology':'👁️',
    'Neurology':'🧠','Dentistry':'🦷','Urology':'🫁','Psychiatry':'🧘',
    'ENT':'👂','Oncology':'🎗️','Radiology':'📷','Laboratory':'🔬',
    'Pharmacy':'💊','ICU':'🏥','Emergency':'🚨','Rehabilitation':'🏃'
  };
  allProviders.forEach(function(p) {
    var d = p.department || p.specialty || '';
    if (d) deptMap[d] = (deptMap[d] || 0) + 1;
  });
  var depts = Object.keys(deptMap).slice(0, 8);
  var grid = document.getElementById('dept-grid');
  if (!grid) return;
  grid.innerHTML = '';
  depts.forEach(function(d) {
    var icon = '🏥';
    Object.keys(deptIcons).forEach(function(k) { if (d.includes(k)) icon = deptIcons[k]; });
    var div = makeEl('div', {class:'dept-card'});
    div.innerHTML = '<div class="dept-ico">' + icon + '</div>' +
      '<div class="dept-name">' + d + '</div>' +
      '<div class="dept-count">' + deptMap[d] + ' ' + (AR ? 'طبيب' : 'doctors') + '</div>';
    grid.appendChild(div);
  });
}

function renderDoctors(docs) {
  var grid = document.getElementById('doc-grid');
  if (!grid) return;
  grid.innerHTML = '';
  docs.slice(0, 8).forEach(function(doc) {
    var name = AR ? doc.name_ar : doc.name_en;
    var init = (name || '').split(' ').filter(Boolean).pop();
    init = init ? init.charAt(0) : '؟';
    var card = makeEl('div', {class:'doc-card'});
    card.innerHTML = '<div class="doc-av">' + init + '</div>' +
      '<div class="doc-name">' + name + '</div>' +
      '<div class="doc-spec">' + (doc.specialty || '') + '</div>' +
      '<div class="doc-dept">' + (doc.branch || doc.department || '') + '</div>' +
      '<a href="tel:966920000094" class="btn btn-p btn-sm" style="width:100%;justify-content:center">' + (AR ? 'احجز' : 'Book') + '</a>';
    grid.appendChild(card);
  });
}

function buildSpecFilter() {
  var sel = document.getElementById('spec-filter');
  if (!sel) return;
  var specs = [...new Set(allProviders.map(function(p) { return p.specialty; }).filter(Boolean))].sort();
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
    var matchQ    = !q    || name.includes(q) || (p.specialty || '').toLowerCase().includes(q);
    var matchSpec = !spec || p.specialty === spec;
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
    var ph  = (b.phone || '').replace('+', '');
    var card = makeEl('div', {class:'branch-card'});
    card.innerHTML =
      '<div class="branch-top"><h3>' + nm + '</h3><span>' + ct + '</span></div>' +
      '<div class="branch-body">' +
        '<p class="branch-addr">' + ad + '</p>' +
        '<div class="branch-chips">' +
          '<span class="chip chip-gray">🛏 ' + b.beds + ' ' + (AR ? 'سرير' : 'Beds') + '</span>' +
          '<span class="chip chip-ok">● ' + (AR ? 'نشط' : 'Active') + '</span>' +
        '</div>' +
        '<a href="tel:' + ph + '" class="btn btn-p btn-sm" style="width:100%;justify-content:center">' + (AR ? '📞 اتصل' : '📞 Call') + '</a>' +
      '</div>';
    grid.appendChild(card);
  });
});

// ── CHAT WIDGET ──────────────────────────────────────────────
var chatOpen = false;
var chatSid  = null;

document.getElementById('chat-fab').onclick = function() {
  chatOpen = !chatOpen;
  var box = document.getElementById('chat-box');
  if (chatOpen) { box.classList.add('open'); document.getElementById('chat-inp').focus(); }
  else box.classList.remove('open');
};
document.getElementById('chat-close').onclick = function() {
  chatOpen = false; document.getElementById('chat-box').classList.remove('open');
};
document.getElementById('chat-send').onclick = sendChat;
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
  fetch(API + '/api/chat', {
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
}

// ─── USER JOURNEY PAGES ────────────────────────────────────────────────────────
function buildRolePage(role, lang) {
  const ar = lang === 'ar';
  const font = ar ? "'Tajawal', sans-serif" : "'Inter', sans-serif";
  const dir  = ar ? 'rtl' : 'ltr';

  const ROLES = {
    patient: {
      icon:  '🙂',
      title: ar ? 'بوابة المريض' : 'Patient Portal',
      sub:   ar ? 'وصول سريع لخدماتك الصحية' : 'Quick access to your healthcare services',
      color: '#0066CC',
      links: [
        { icon: '📅', label: ar ? 'حجز موعد'       : 'Book Appointment',   href: 'https://bsma.elfadil.com/appointments',    ext: true },
        { icon: '📋', label: ar ? 'سجلاتي الطبية'   : 'My Medical Records', href: 'https://bsma.elfadil.com/records',          ext: true },
        { icon: '💊', label: ar ? 'وصفاتي'           : 'My Prescriptions',   href: 'https://bsma.elfadil.com/prescriptions',   ext: true },
        { icon: '💳', label: ar ? 'فواتيري'          : 'My Bills',           href: 'https://bsma.elfadil.com/billing',         ext: true },
        { icon: '📞', label: ar ? 'اتصل بنا'         : 'Call Us',            href: 'tel:966920000094',                          ext: false },
        { icon: '🎙️', label: ar ? 'بسمة AI'          : 'Basma AI Assistant', href: '/#chat',                                   ext: false },
      ],
      info: ar
        ? 'مرحباً بك في بوابة المرضى. يمكنك حجز المواعيد، الاطلاع على سجلاتك الطبية، ومتابعة فواتيرك بسهولة.'
        : 'Welcome to the Patient Portal. Book appointments, view your medical records, and track your bills — all in one place.',
    },
    clinician: {
      icon:  '🩺',
      title: ar ? 'بوابة الطاقم الطبي' : 'Clinician Portal',
      sub:   ar ? 'نظام متكامل للأطباء والممرضين' : 'Integrated system for doctors and nurses',
      color: '#10B981',
      links: [
        { icon: '📊', label: ar ? 'لوحة التحكم الطبية' : 'Clinical Dashboard',  href: 'https://givc.elfadil.com',               ext: true },
        { icon: '🧾', label: ar ? 'الترميز الطبي'       : 'Medical Coding',      href: 'https://givc.elfadil.com/coding',        ext: true },
        { icon: '👥', label: ar ? 'قائمة انتظاري'       : 'My Queue',            href: 'https://givc.elfadil.com/queue',         ext: true },
        { icon: '🔍', label: ar ? 'بحث المرضى'          : 'Patient Search',      href: 'https://givc.elfadil.com/patients',      ext: true },
        { icon: '📋', label: ar ? 'الأوامر الطبية'      : 'Orders',              href: 'https://givc.elfadil.com/orders',        ext: true },
        { icon: '🔬', label: ar ? 'نتائج المختبر'       : 'Lab Results',         href: 'https://givc.elfadil.com/lab',           ext: true },
      ],
      info: ar
        ? 'الوصول إلى جميع الأدوات السريرية: سجلات المرضى، الترميز، قوائم الانتظار، والنتائج عبر نظام GIVC.'
        : 'Access all clinical tools: patient records, coding, queues, and results via the GIVC system.',
    },
    admin: {
      icon:  '⚙️',
      title: ar ? 'بوابة الإدارة' : 'Admin Portal',
      sub:   ar ? 'إدارة الموارد والعمليات التشغيلية' : 'Resource and operations management',
      color: '#6366F1',
      links: [
        { icon: '🏥', label: ar ? 'Oracle OASIS HIS'    : 'Oracle OASIS HIS',    href: 'https://oracle-bridge.brainsait.org',    ext: true },
        { icon: '📊', label: ar ? 'تقارير الإيرادات'    : 'Revenue Reports',     href: 'https://sbs.elfadil.com/reports',        ext: true },
        { icon: '👨‍⚕️', label: ar ? 'الأطباء والموارد'   : 'Providers & Staff',   href: '/api/providers',                         ext: false },
        { icon: '🌿', label: ar ? 'فروع المجموعة'       : 'Group Branches',      href: '/api/branches',                          ext: false },
        { icon: '📊', label: ar ? 'لوحة NPHIES'         : 'NPHIES Dashboard',    href: '/api/nphies/analysis',                   ext: false },
        { icon: '🔒', label: ar ? 'الوصول الآمن'        : 'Secure Access',       href: 'https://oracle-bridge.brainsait.org/health', ext: true },
      ],
      info: ar
        ? 'إدارة مستشفيات مجموعة الحياة الوطني عبر Oracle OASIS، وتقارير SBS، ومتابعة نظام NPHIES.'
        : 'Manage Hayat National Hospitals Group via Oracle OASIS, SBS reports, and NPHIES monitoring.',
    },
    billing: {
      icon:  '💰',
      title: ar ? 'بوابة الفوترة' : 'Billing Portal',
      sub:   ar ? 'إدارة المطالبات والفوترة الطبية' : 'Claims and medical billing management',
      color: '#F59E0B',
      links: [
        { icon: '💸', label: ar ? 'نظام الفوترة SBS'    : 'SBS Billing System',   href: 'https://sbs.elfadil.com',               ext: true },
        { icon: '🏛️', label: ar ? 'بوابة NPHIES'        : 'NPHIES Portal',        href: 'https://portal.nphies.sa',              ext: true },
        { icon: '📋', label: ar ? 'مطالبات GSS'         : 'GSS Claims',           href: 'https://sbs.elfadil.com/claims',        ext: true },
        { icon: '✅', label: ar ? 'الموافقات المسبقة'   : 'Prior Authorizations', href: 'https://sbs.elfadil.com/pa',            ext: true },
        { icon: '📊', label: ar ? 'تحليل NPHIES'        : 'NPHIES Analysis',      href: '/api/nphies/analysis',                  ext: false },
        { icon: '🔍', label: ar ? 'الأهلية التأمينية'   : 'Eligibility Check',    href: '/api/eligibility',                      ext: false },
      ],
      info: ar
        ? 'إدارة المطالبات عبر نظام SBS وبوابة NPHIES. الشبكة: SAR 835M، معدل الموافقة 98.6% (الرياض 88.5% ⚠️).'
        : 'Manage claims via SBS and NPHIES. Network: SAR 835M, approval rate 98.6% (Riyadh 88.5% ⚠️).',
    },
    status: {
      icon:  '📊',
      title: ar ? 'حالة الأنظمة' : 'System Status',
      sub:   ar ? 'حالة جميع الأنظمة في الوقت الفعلي' : 'Real-time status of all systems',
      color: '#0066CC',
      links: [
        { icon: '🙂', label: 'BSMA — Patient Portal',      href: 'https://bsma.elfadil.com',                    ext: true },
        { icon: '🩺', label: 'GIVC — Clinician Portal',    href: 'https://givc.elfadil.com',                    ext: true },
        { icon: '💰', label: 'SBS  — Billing Portal',      href: 'https://sbs.elfadil.com',                     ext: true },
        { icon: '🔷', label: 'Oracle Bridge — Health',     href: 'https://oracle-bridge.brainsait.org/health',  ext: true },
        { icon: '🏛️', label: 'NPHIES Portal',              href: 'https://portal.nphies.sa',                    ext: true },
        { icon: '🎙️', label: 'Basma Voice Agent',          href: '/voice/health',                               ext: false },
      ],
      info: ar
        ? 'Oracle Tunnel: ❌ كل الفروع متوقفة عبر خوارج Cloudflare. BSMA / GIVC / SBS / NPHIES: ✅ يعمل. الجسر Oracle: ✅ صحي.'
        : 'Oracle Tunnel: ❌ all branches timeout via CF egress. BSMA / GIVC / SBS / NPHIES: ✅ up. Oracle Bridge: ✅ healthy.',
    },
  };

  const page  = ROLES[role] || ROLES.status;
  const color = page.color;
  const links = page.links.map(l =>
    '<a href="' + l.href + '"' + (l.ext ? ' target="_blank"' : '') + ' class="rp-link">' +
    '<span class="rp-ico">' + l.icon + '</span>' +
    '<span class="rp-lbl">' + l.label + '</span>' +
    '<span class="rp-arr">' + (ar ? '←' : '→') + '</span></a>'
  ).join('');

  return new Response(`<!DOCTYPE html>
<html lang="${lang}" dir="${dir}">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${page.title} | ${ar ? 'مستشفيات الحياة الوطني' : 'Hayat National Hospitals'}</title>
<meta name="robots" content="noindex">
<link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;700;800&family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:${font};background:#F0F4FA;color:#0F172A;min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;padding:32px 16px 64px}
.rp-wrap{width:100%;max-width:520px}
.rp-back{display:inline-flex;align-items:center;gap:6px;color:#64748B;text-decoration:none;font-size:.82rem;margin-bottom:24px}
.rp-back:hover{color:#0066CC}
.rp-card{background:#fff;border-radius:20px;box-shadow:0 4px 24px rgba(0,0,0,.08);overflow:hidden}
.rp-hdr{background:linear-gradient(135deg,${color},${color}CC);padding:32px 28px;color:#fff}
.rp-icon{font-size:2.8rem;margin-bottom:12px}
.rp-title{font-size:1.7rem;font-weight:800;margin-bottom:4px}
.rp-sub{font-size:.9rem;opacity:.85}
.rp-body{padding:20px 0}
.rp-link{display:flex;align-items:center;gap:14px;padding:14px 28px;text-decoration:none;color:#0F172A;border-bottom:1px solid #F1F5F9;transition:background .12s}
.rp-link:last-child{border-bottom:none}
.rp-link:hover{background:#F8FAFF}
.rp-ico{font-size:1.3rem;width:28px;flex-shrink:0}
.rp-lbl{flex:1;font-size:.95rem;font-weight:500}
.rp-arr{color:#CBD5E1;font-size:.9rem}
.rp-info{margin:20px 24px 0;padding:16px;background:#F0F4FA;border-radius:12px;font-size:.82rem;color:#64748B;line-height:1.6}
.rp-footer{margin-top:24px;text-align:center;font-size:.78rem;color:#94A3B8}
.rp-footer a{color:#0066CC;text-decoration:none}
</style>
</head>
<body>
<div class="rp-wrap">
  <a href="/${lang === 'en' ? '?lang=en' : ''}" class="rp-back">${ar ? '→ الرئيسية' : '← Home'}</a>
  <div class="rp-card">
    <div class="rp-hdr">
      <div class="rp-icon">${page.icon}</div>
      <div class="rp-title">${page.title}</div>
      <div class="rp-sub">${page.sub}</div>
    </div>
    <div class="rp-body">${links}</div>
    <div class="rp-info">${page.info}</div>
  </div>
  <div class="rp-footer">${ar ? 'مستشفيات الحياة الوطني' : 'Hayat National Hospitals'} &nbsp;·&nbsp; <a href="tel:966920000094">920-000-094</a> &nbsp;·&nbsp; <a href="/${lang === 'en' ? '?lang=en' : ''}">${ar ? 'الرئيسية' : 'Home'}</a></div>
</div>
</body>
</html>`, { headers: HTML_H });
}

// ─── MAIN ROUTER ──────────────────────────────────────────────────────────────
// ─── BLOG ARTICLE + ACADEMY COURSE PAGES ─────────────────────────────────────
function serveBlogArticle(slug, lang) {
  const ar = lang === 'ar';
  const post = BLOG_POSTS.find(p => p.id === slug || p.slug === slug);
  if (!post) return serveNotFound(ar, 'blog');
  const title   = ar ? post.title_ar   : post.title_en;
  const excerpt = ar ? post.excerpt_ar  : post.excerpt_en;
  const catAr   = {rcm:'إدارة الإيرادات',nphies:'NPHIES',coding:'الترميز الطبي',tech:'تقنية',strategy:'استراتيجية',academy:'الأكاديمية'};
  const catEn   = {rcm:'Revenue Cycle',nphies:'NPHIES',coding:'Medical Coding',tech:'Technology',strategy:'Strategy',academy:'Academy'};
  const cat = ar ? (catAr[post.category]||post.category) : (catEn[post.category]||post.category);
  const related = BLOG_POSTS.filter(p => p.id !== post.id && p.category === post.category).slice(0,2);

  return new Response(`<!DOCTYPE html>
<html lang="${lang}" dir="${ar?'rtl':'ltr'}">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title} | ${ar?'الحياة الوطني':'Hayat National'}</title>
<meta name="description" content="${excerpt}">
<link rel="canonical" href="https://hnh.brainsait.org/blog/${post.id}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${excerpt}">
<meta property="og:type" content="article">
<meta property="og:url" content="https://hnh.brainsait.org/blog/${post.id}">
<meta property="og:site_name" content="${ar?'مستشفيات الحياة الوطني':'Hayat National Hospitals'}">
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="${title}">
<meta name="twitter:description" content="${excerpt}">
<script type="application/ld+json">{"@context":"https://schema.org","@type":"Article","headline":"${title.replace(/"/g,"'")}","description":"${excerpt.replace(/"/g,"'")}","author":{"@type":"Person","name":"${post.author}"},"publisher":{"@type":"Organization","name":"Hayat National Hospitals","url":"https://hnh.brainsait.org"},"datePublished":"${post.date}","url":"https://hnh.brainsait.org/blog/${post.id}","inLanguage":"${lang}"}</script>
<link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;700;800&family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
<style>
*{box-sizing:border-box;margin:0;padding:0}
:root{--p:#0066CC;--n:#1A2B4A;--a:#C9A84C;--s:#10B981;--bg:#F0F4FA;--sf:#fff;--b:#E2E8F0;--t:#0F172A;--ts:#64748B}
body{font-family:${ar?"'Tajawal'":"'Inter'"},sans-serif;background:var(--bg);color:var(--t);line-height:1.7}
.hdr{background:var(--sf);border-bottom:1px solid var(--b);padding:12px 0;position:sticky;top:0;z-index:10;box-shadow:0 2px 8px rgba(0,0,0,.06)}
.hi{max-width:820px;margin:0 auto;padding:0 20px;display:flex;align-items:center;justify-content:space-between}
.logo{display:flex;align-items:center;gap:8px;text-decoration:none;font-weight:800;color:var(--n);font-size:.9rem}
.logo-i{width:32px;height:32px;background:linear-gradient(135deg,var(--p),var(--n));border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:.95rem}
.bk{color:var(--ts);text-decoration:none;font-size:.82rem}
.bk:hover{color:var(--p)}
.wrap{max-width:740px;margin:0 auto;padding:40px 20px 80px}
.badge{display:inline-flex;align-items:center;gap:5px;background:rgba(0,102,204,.08);color:var(--p);padding:4px 12px;border-radius:20px;font-size:.72rem;font-weight:700;margin-bottom:12px;text-transform:uppercase;letter-spacing:.06em}
h1{font-size:clamp(1.55rem,3.5vw,2.2rem);font-weight:800;color:var(--n);line-height:1.3;margin-bottom:14px}
.meta{display:flex;gap:14px;flex-wrap:wrap;font-size:.78rem;color:var(--ts);margin-bottom:22px}
.lede{background:linear-gradient(135deg,rgba(0,102,204,.04),rgba(201,168,76,.04));border-inline-start:4px solid var(--p);padding:14px 18px;border-radius:0 10px 10px 0;font-size:.94rem;color:var(--n);font-style:italic;margin-bottom:30px;line-height:1.7}
.body{font-size:.95rem;line-height:1.85;color:var(--t)}
.body h2{font-size:1.25rem;font-weight:700;color:var(--n);margin:30px 0 12px;padding-bottom:7px;border-bottom:2px solid var(--b)}
.body h3{font-size:1.02rem;font-weight:700;color:var(--n);margin:22px 0 8px}
.body p{margin-bottom:14px}
.body ul,.body ol{margin:10px 0 14px 22px}
.body li{margin-bottom:5px}
.body strong{color:var(--n)}
.kpi-row{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin:22px 0}
.kpi{background:var(--sf);border:1px solid var(--b);border-radius:10px;padding:14px;text-align:center}
.kpi-n{font-size:1.4rem;font-weight:800;color:var(--p);line-height:1}
.kpi-l{font-size:.68rem;color:var(--ts);margin-top:3px}
.related{margin-top:44px;padding-top:28px;border-top:1px solid var(--b)}
.rel-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:12px;margin-top:14px}
.rel-card{background:var(--sf);border:1px solid var(--b);border-radius:10px;padding:14px;text-decoration:none;display:block;transition:all .2s}
.rel-card:hover{border-color:var(--p);transform:translateY(-2px)}
.rel-card h4{font-size:.82rem;font-weight:700;color:var(--n);margin-bottom:4px;line-height:1.4}
.rel-card p{font-size:.72rem;color:var(--ts)}
.cta{background:linear-gradient(135deg,var(--n),#0066CC);border-radius:16px;padding:28px;text-align:center;margin-top:36px;color:#fff}
.cta h3{font-size:1.1rem;margin-bottom:6px}
.cta p{color:rgba(255,255,255,.8);font-size:.85rem;margin-bottom:18px}
.cta-btns{display:flex;gap:8px;justify-content:center;flex-wrap:wrap}
.btn-w{background:#fff;color:var(--n);padding:9px 20px;border-radius:20px;font-weight:700;font-size:.82rem;text-decoration:none}
.btn-t{background:rgba(255,255,255,.15);color:#fff;padding:9px 20px;border-radius:20px;font-weight:600;font-size:.82rem;text-decoration:none;border:1px solid rgba(255,255,255,.3)}
@media(max-width:560px){.kpi-row,.rel-grid{grid-template-columns:1fr 1fr}.cta-btns{flex-direction:column}}
</style></head>
<body>
<header class="hdr"><div class="hi">
  <a href="/" class="logo"><div class="logo-i">🏥</div>${ar?'الحياة الوطني':'Hayat National'}</a>
  <div style="display:flex;align-items:center;gap:12px">
    <a href="/#blog" class="bk">${ar?'← المدونة':'← Blog'}</a>
    <a href="/blog/${post.id}?lang=${ar?'en':'ar'}" style="font-size:.78rem;color:var(--p);font-weight:600;text-decoration:none;padding:4px 10px;border:1px solid rgba(0,102,204,.3);border-radius:12px">${ar?'EN':'عربي'}</a>
  </div>
</div></header>
<div class="wrap">
  <div class="badge">${post.emoji} ${cat}</div>
  <h1>${title}</h1>
  <div class="meta">
    <span>✍️ ${post.author}</span>
    <span>📅 ${post.date}</span>
    <span>⏱ ${post.read_min} ${ar?'دقائق':'min read'}</span>
  </div>
  <div class="lede">${excerpt}</div>
  <div class="body">
    ${getArticleBody(post.id, ar)}
  </div>
  <div class="related">
    <h3 style="font-size:1rem;font-weight:700;color:var(--n);margin-bottom:14px">${ar?'مقالات ذات صلة':'Related Articles'}</h3>
    <div class="rel-grid">
      ${related.map(p => '<a href="/blog/'+p.id+'?lang='+lang+'" class="rel-card"><div style="font-size:1.3rem;margin-bottom:6px">'+p.emoji+'</div><h4>'+(ar?p.title_ar:p.title_en)+'</h4><p>'+(ar?p.excerpt_ar:p.excerpt_en).slice(0,80)+'...</p></a>').join('')}
    </div>
  </div>
  <div class="cta">
    <h3>${ar?'تحسين إيرادات مستشفاك؟':'Improve your hospital revenue?'}</h3>
    <p>${ar?'ClaimLinc AI يقلل رفضات NPHIES بنسبة تصل إلى 87% خلال 90 يوماً':'ClaimLinc AI reduces NPHIES rejections by up to 87% in 90 days'}</p>
    <div class="cta-btns">
      <a href="tel:966920000094" class="btn-w">📞 ${ar?'تواصل معنا':'Contact Us'}</a>
      <a href="/#academy" class="btn-t">🎓 ${ar?'الأكاديمية':'Academy'}</a>
      <a href="https://bsma.elfadil.com" target="_blank" class="btn-t">🙂 BSMA</a>
    </div>
  </div>
</div>
</body></html>`,
  { headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'public, max-age=300' } });
}

function getArticleBody(id, ar) {
  const bodies = {
    'nphies-riyadh-rejections': ar
      ? '<h2>المشكلة</h2><p>سجّل مستشفى الحياة الوطني في الرياض نسبة موافقة 88.5% على مطالبات NPHIES في الربع الأول من 2026، ما أسفر عن <strong>SAR 11.3 مليون</strong> في مطالبات مرفوضة.</p><div class="kpi-row"><div class="kpi"><div class="kpi-n">88.5%</div><div class="kpi-l">نسبة موافقة الرياض</div></div><div class="kpi"><div class="kpi-n">SAR 11.3M</div><div class="kpi-l">مطالبات مرفوضة</div></div><div class="kpi"><div class="kpi-n">100%</div><div class="kpi-l">باقي الفروع</div></div></div><h2>الأسباب الجذرية</h2><h3>1. موافقة مسبقة مفقودة (35%)</h3><p>خدمات تُقدَّم دون الحصول على تصريح NPHIES المسبق. الحل: AuthLinc يفحص الموافقة 48 ساعة قبل الدخول.</p><h3>2. خطأ في الترميز (28%)</h3><p>عدم تطابق SBS/ICD-10. الحل: CodeLinc AI يتحقق من جميع الرموز قبل التقديم.</p><h3>3. أهلية غير مؤكدة (22%)</h3><p>الحل: فحص الأهلية الفوري عبر Oracle Bridge عند تسجيل المريض.</p><h2>التأثير المتوقع</h2><p>تطبيق ClaimLinc يُتوقع استرداد <strong>SAR 9.8 مليون</strong> خلال 90 يوماً، برفع نسبة الموافقة إلى ≥97%.</p>'
      : '<h2>The Challenge</h2><p>Riyadh recorded 88.5% NPHIES approval in Q1 2026 — <strong>SAR 11.3M in rejected claims</strong> vs 100% at all other branches.</p><div class="kpi-row"><div class="kpi"><div class="kpi-n">88.5%</div><div class="kpi-l">Riyadh Approval</div></div><div class="kpi"><div class="kpi-n">SAR 11.3M</div><div class="kpi-l">Rejected Claims</div></div><div class="kpi"><div class="kpi-n">100%</div><div class="kpi-l">Other 5 Branches</div></div></div><h2>Root Causes</h2><h3>1. Missing Prior Auth (35%)</h3><p>Services rendered without NPHIES pre-auth. Fix: AuthLinc checks 48h before admission.</p><h3>2. Wrong Coding (28%)</h3><p>ICD-10/SBS mismatches. Fix: CodeLinc AI validates before submission.</p><h3>3. Eligibility Miss (22%)</h3><p>Fix: Real-time check at patient registration via Oracle Bridge.</p><h2>Impact</h2><p>Deploying ClaimLinc projects recovery of <strong>SAR 9.8M</strong> within 90 days, lifting Riyadh to ≥97%.</p>',
    'abha-nphies-triage': ar
      ? '<h2>نظرة عامة</h2><p>تدقيق BrainSAIT لمطالبات مستشفى الحياة أبها أبريل 2026 كشف <strong>4,914 سطر مطالبة مرفوض</strong>.</p><div class="kpi-row"><div class="kpi"><div class="kpi-n">4,914</div><div class="kpi-l">سطر مرفوض</div></div><div class="kpi"><div class="kpi-n">2,181</div><div class="kpi-l">إعادة تقديم</div></div><div class="kpi"><div class="kpi-n">290</div><div class="kpi-l">طابور التحقق</div></div></div><h2>مسارات الإجراء</h2><h3>المسار 1: إعادة التقديم (2,181)</h3><p>مطالبات تُعاد بإضافة وثائق داعمة أو تصحيح بيانات المريض.</p><h3>المسار 2: طعن تعاقدي (2,650)</h3><p>خلافات تعاقدية مع شركات التأمين تتطلب مراسلة رسمية.</p><h3>المسار 3: مطالبة جديدة (83)</h3><p>حالات تحتاج مطالبة جديدة مع الإشارة للأصلية لإثبات الاستمرارية.</p>'
      : '<h2>Overview</h2><p>BrainSAIT triage of Hayat Abha claims (April 2026) revealed <strong>4,914 rejected lines</strong> requiring urgent action.</p><div class="kpi-row"><div class="kpi"><div class="kpi-n">4,914</div><div class="kpi-l">Rejected Lines</div></div><div class="kpi"><div class="kpi-n">2,181</div><div class="kpi-l">Resubmissions</div></div><div class="kpi"><div class="kpi-n">290</div><div class="kpi-l">Portal Queue</div></div></div><h2>Three Action Tracks</h2><h3>Track 1: Resubmit with Supporting Info (2,181)</h3><p>Claims resubmitted by adding clinical documentation or correcting patient data.</p><h3>Track 2: Contractual Appeal (2,650)</h3><p>Disputes with insurers requiring formal appeal correspondence.</p><h3>Track 3: New Claim with Prior Linkage (83)</h3><p>Cases needing a new claim referencing the original to establish clinical continuity.</p>',
    'deepseek-healthcare-ai': ar
      ? '<h2>لماذا DeepSeek؟</h2><p>اختار فريق BrainSAIT DeepSeek V3 محركاً رئيسياً لبسمة لأسباب عدة: دعم عربي ممتاز، سرعة استجابة أقل من 3 ثوانٍ، وتكامل مباشر مع NPHIES وOracle Bridge.</p><h2>سلسلة المحركات</h2><p>بسمة تستخدم سلسلة من 4 محركات: <strong>DeepSeek V3</strong> (الأساسي) ← Claude Sonnet 4 ← CF Workers AI LLaMA ← رد ثابت احتياطي.</p><h2>التكاملات الحية</h2><p>يستطيع المستخدم الحديث مع بسمة بالصوت وحجز موعد عبر Oracle OPD، التحقق من أهليته عبر NPHIES، ومتابعة مطالباته عبر ClaimLinc — كل ذلك في جلسة صوتية واحدة.</p>'
      : '<h2>Why DeepSeek?</h2><p>BrainSAIT selected DeepSeek V3 as primary AI for Basma due to superior Arabic support, sub-3s response time, and direct integration with NPHIES and Oracle Bridge.</p><h2>Engine Chain</h2><p>Basma uses a 4-engine chain: <strong>DeepSeek V3</strong> (primary) → Claude Sonnet 4 → CF Workers AI LLaMA → static fallback.</p><h2>Live Integrations</h2><p>Voice users can book appointments via Oracle OPD, check eligibility via NPHIES, and track claims via ClaimLinc — all in a single voice session.</p>',
  };
  return bodies[id] || '<p>' + (ar ? 'المقال الكامل قريباً. تواصل معنا للمزيد من المعلومات.' : 'Full article coming soon. Contact us for more details.') + '</p>';
}

function serveAcademyCourse(cid, lang) {
  const ar = lang === 'ar';
  const course = COURSES.find(c => c.id === cid);
  if (!course) return serveNotFound(ar, 'academy');
  const title = ar ? course.title_ar : course.title_en;
  const desc  = ar ? course.desc_ar  : course.desc_en;
  const lvl   = {beginner: ar?'مبتدئ':'Beginner', intermediate: ar?'متوسط':'Intermediate', advanced: ar?'متقدم':'Advanced'}[course.level] || course.level;
  const ghUrl = course.repo?.startsWith('http') ? course.repo : 'https://github.com/Fadil369/' + course.repo;
  let related = COURSES.filter(c => c.id !== course.id && c.cat === course.cat).slice(0,2);
  if (related.length < 2) {
    const more = COURSES.filter(c => c.id !== course.id && !related.find(r => r.id === c.id)).slice(0, 2 - related.length);
    related = related.concat(more);
  }

  return new Response(`<!DOCTYPE html>
<html lang="${lang}" dir="${ar?'rtl':'ltr'}">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title} | ${ar?'أكاديمية الحياة الوطني':'Hayat National Academy'}</title>
<meta name="description" content="${desc}">
<link rel="canonical" href="https://hnh.brainsait.org/academy/${course.id}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${desc}">
<meta property="og:type" content="website">
<meta property="og:url" content="https://hnh.brainsait.org/academy/${course.id}">
<meta property="og:site_name" content="${ar?'أكاديمية الحياة الوطني':'Hayat National Academy'}">
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="${title}">
<meta name="twitter:description" content="${desc}">
<script type="application/ld+json">{"@context":"https://schema.org","@type":"Course","name":"${title.replace(/"/g,"'")}","description":"${desc.replace(/"/g,"'")}","provider":{"@type":"EducationalOrganization","name":"Hayat National Academy","url":"https://hnh.brainsait.org/academy"},"url":"https://hnh.brainsait.org/academy/${course.id}","courseMode":"online","inLanguage":["ar","en"],"offers":{"@type":"Offer","price":"${course.price}","priceCurrency":"SAR"}}</script>
<link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;700;800&family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
<style>
*{box-sizing:border-box;margin:0;padding:0}
:root{--p:#0066CC;--n:#1A2B4A;--a:#C9A84C;--s:#10B981;--bg:#F0F4FA;--sf:#fff;--b:#E2E8F0;--t:#0F172A;--ts:#64748B}
body{font-family:${ar?"'Tajawal'":"'Inter'"},sans-serif;background:var(--bg);color:var(--t)}
.hdr{background:var(--sf);border-bottom:1px solid var(--b);padding:12px 0;position:sticky;top:0;z-index:10}
.hi{max-width:1000px;margin:0 auto;padding:0 20px;display:flex;align-items:center;justify-content:space-between}
.logo{display:flex;align-items:center;gap:8px;text-decoration:none;font-weight:800;color:var(--n);font-size:.9rem}
.logo-i{width:32px;height:32px;background:linear-gradient(135deg,var(--p),var(--n));border-radius:8px;display:flex;align-items:center;justify-content:center}
.bk{color:var(--ts);text-decoration:none;font-size:.82rem}
.hero{background:linear-gradient(135deg,var(--n),#0066CC);color:#fff;padding:52px 20px}
.hi2{max-width:1000px;margin:0 auto;display:grid;grid-template-columns:1fr 300px;gap:32px;align-items:start}
.chips{display:flex;gap:7px;flex-wrap:wrap;margin-bottom:14px}
.chip{padding:4px 11px;border-radius:20px;font-size:.7rem;font-weight:700;background:rgba(255,255,255,.15);color:#fff}
.chip-a{background:var(--a);color:var(--n)}
h1{font-size:clamp(1.5rem,2.8vw,2.1rem);font-weight:800;line-height:1.3;margin-bottom:14px}
.hero-desc{color:rgba(255,255,255,.85);font-size:.92rem;line-height:1.7;margin-bottom:22px}
.stats{display:flex;gap:20px;flex-wrap:wrap}
.st{text-align:center}.st-n{font-size:1.3rem;font-weight:800;color:var(--a)}.st-l{font-size:.68rem;color:rgba(255,255,255,.7);margin-top:2px}
.card-enroll{background:var(--sf);border-radius:16px;padding:24px;color:var(--t)}
.price{font-size:1.9rem;font-weight:800;color:var(--p);margin-bottom:2px}
.price-s{font-size:.77rem;color:var(--ts);margin-bottom:18px}
.btn-en{display:block;background:linear-gradient(135deg,var(--p),var(--n));color:#fff;text-decoration:none;text-align:center;padding:13px;border-radius:20px;font-weight:700;font-size:.9rem;margin-bottom:10px;transition:all .2s}
.btn-en:hover{opacity:.9}
.btn-gh{display:block;background:var(--bg);border:1px solid var(--b);color:var(--ts);text-decoration:none;text-align:center;padding:10px;border-radius:20px;font-size:.8rem;font-weight:600;transition:all .2s}
.btn-gh:hover{border-color:var(--p);color:var(--p)}
.inc{margin-top:14px;padding-top:12px;border-top:1px solid var(--b)}
.inc-i{display:flex;align-items:center;gap:7px;font-size:.78rem;color:var(--ts);padding:3px 0}
.inc-i::before{content:"✓";color:var(--s);font-weight:700;min-width:14px}
.main{max-width:1000px;margin:0 auto;padding:40px 20px 70px;display:grid;grid-template-columns:1fr 260px;gap:28px;align-items:start}
.sec-h{font-size:1.1rem;font-weight:700;color:var(--n);margin-bottom:14px;padding-bottom:7px;border-bottom:2px solid var(--b)}
.mods{display:flex;flex-direction:column;gap:6px;margin-bottom:32px}
.mod{background:var(--sf);border:1px solid var(--b);border-radius:9px;padding:12px 16px;display:flex;align-items:center;justify-content:space-between}
.mod-n{width:26px;height:26px;border-radius:50%;background:linear-gradient(135deg,var(--p),var(--n));color:#fff;display:flex;align-items:center;justify-content:center;font-size:.72rem;font-weight:700;flex-shrink:0}
.mod-t{font-size:.83rem;font-weight:600;color:var(--n);margin-inline:10px;flex:1}
.mod-d{font-size:.7rem;color:var(--ts)}
.rel-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:12px}
.rel-c{background:var(--sf);border:1px solid var(--b);border-radius:9px;padding:13px;text-decoration:none;transition:all .2s;display:block}
.rel-c:hover{border-color:var(--p);transform:translateY(-2px)}
.rel-c h4{font-size:.8rem;font-weight:700;color:var(--n);margin-bottom:3px;line-height:1.4}
.rel-c p{font-size:.71rem;color:var(--ts)}
.side-card{background:var(--sf);border:1px solid var(--b);border-radius:14px;padding:18px;position:sticky;top:70px}
.meta-r{display:flex;justify-content:space-between;padding:7px 0;border-bottom:1px solid var(--b);font-size:.8rem}
.meta-r:last-child{border:none}
.meta-r span:first-child{color:var(--ts)}.meta-r span:last-child{font-weight:600;color:var(--n)}
@media(max-width:700px){.hi2,.main{grid-template-columns:1fr}.rel-grid{grid-template-columns:1fr 1fr}}
</style></head>
<body>
<header class="hdr"><div class="hi">
  <a href="/" class="logo"><div class="logo-i">🎓</div>${ar?'أكاديمية الحياة الوطني':'Hayat National Academy'}</a>
  <div style="display:flex;align-items:center;gap:12px">
    <a href="/#academy" class="bk">${ar?'← الأكاديمية':'← Academy'}</a>
    <a href="/academy/${course.id}?lang=${ar?'en':'ar'}" style="font-size:.78rem;color:var(--p);font-weight:600;text-decoration:none;padding:4px 10px;border:1px solid rgba(0,102,204,.3);border-radius:12px">${ar?'EN':'عربي'}</a>
  </div>
</div></header>
<div class="hero"><div class="hi2">
  <div>
    <div class="chips">
      <span class="chip">${course.icon} ${course.cat?.toUpperCase()}</span>
      <span class="chip">${lvl}</span>
      <span class="chip chip-a">${course.accred}</span>
    </div>
    <h1>${title}</h1>
    <p class="hero-desc">${desc}</p>
    <div class="stats">
      <div class="st"><div class="st-n">${course.hours}h</div><div class="st-l">${ar?'ساعة':'Hours'}</div></div>
      <div class="st"><div class="st-n">${course.modules||8}</div><div class="st-l">${ar?'وحدة':'Modules'}</div></div>
      <div class="st"><div class="st-n">AR/EN</div><div class="st-l">${ar?'ثنائي اللغة':'Bilingual'}</div></div>
    </div>
  </div>
  <div class="card-enroll">
    <div class="price">SAR ${course.price?.toLocaleString()}</div>
    <div class="price-s">${ar?'شامل الشهادة المعتمدة':'Including accredited certificate'}</div>
    <a href="tel:966920000094" class="btn-en">📞 ${ar?'سجّل — 920000094':'Enroll — 920000094'}</a>
    <a href="${ghUrl}" target="_blank" class="btn-gh">⚙️ ${ar?'GitHub Repository':'GitHub Repository'}</a>
    <div class="inc">
      <div class="inc-i">${ar?'شهادة SCFHS معتمدة':'SCFHS Accredited Certificate'}</div>
      <div class="inc-i">${ar?'محتوى عربي/إنجليزي':'Arabic + English Content'}</div>
      <div class="inc-i">${ar?'بيانات وحالات حقيقية':'Real data & case studies'}</div>
      <div class="inc-i">${ar?'دعم 30 يوماً بعد الدورة':'30-day post-course support'}</div>
    </div>
  </div>
</div></div>
<div class="main">
  <div>
    <h2 class="sec-h">${ar?'محتوى الدورة':'Course Modules'}</h2>
    <div class="mods">
      ${Array.from({length: course.modules||8}, (_,i) => '<div class="mod"><div class="mod-n">'+(i+1)+'</div><div class="mod-t">'+(ar?'الوحدة '+(i+1)+' — تطبيق '+course.title_ar?.split(' ')[0]:'Module '+(i+1)+' — Applied '+course.title_en?.split(' ')[0])+'</div><div class="mod-d">'+Math.round((course.hours/(course.modules||8))*60)+' '+(ar?'دقيقة':'min')+'</div></div>').join('')}
    </div>
    <h2 class="sec-h" style="margin-top:10px">${ar?'دورات ذات صلة':'Related Courses'}</h2>
    <div class="rel-grid">
      ${related.map(c => '<a href="/academy/'+c.id+'?lang='+lang+'" class="rel-c"><div style="font-size:1.3rem;margin-bottom:6px">'+c.icon+'</div><h4>'+(ar?c.title_ar:c.title_en)+'</h4><p>SAR '+c.price+' · '+c.hours+'h</p></a>').join('')}
    </div>
  </div>
  <div class="side-card">
    <h3 style="font-size:.88rem;font-weight:700;color:var(--n);margin-bottom:12px">${ar?'تفاصيل الدورة':'Course Details'}</h3>
    <div class="meta-r"><span>${ar?'المستوى':'Level'}</span><span>${lvl}</span></div>
    <div class="meta-r"><span>${ar?'المدة':'Duration'}</span><span>${course.hours}h</span></div>
    <div class="meta-r"><span>${ar?'الوحدات':'Modules'}</span><span>${course.modules||8}</span></div>
    <div class="meta-r"><span>${ar?'اللغة':'Language'}</span><span>AR + EN</span></div>
    <div class="meta-r"><span>${ar?'الاعتماد':'Accreditation'}</span><span>${course.accred}</span></div>
    <div class="meta-r"><span>${ar?'السعر':'Price'}</span><span style="color:var(--p);font-weight:800">SAR ${course.price?.toLocaleString()}</span></div>
  </div>
</div>
</body></html>`,
  { headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'public, max-age=300' } });
}

function serveNotFound(ar, type) {
  const msg = type === 'blog'
    ? (ar ? 'المقال غير موجود' : 'Article Not Found')
    : (ar ? 'الدورة غير موجودة' : 'Course Not Found');
  const back = type === 'blog' ? '/#blog' : '/#academy';
  return new Response(`<!DOCTYPE html><html><head><meta charset="UTF-8"><title>404</title>
<style>body{font-family:sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;background:#F0F4FA;margin:0}
.b{background:#fff;border-radius:16px;padding:48px;text-align:center;max-width:420px}
h1{color:#1A2B4A;font-size:1.6rem;margin-bottom:10px}p{color:#64748B;margin-bottom:22px}a{background:#0066CC;color:#fff;padding:10px 22px;border-radius:20px;text-decoration:none;font-weight:700}</style></head>
<body><div class="b"><div style="font-size:2.5rem;margin-bottom:14px">🔍</div>
<h1>${msg}</h1><p>${ar?'الرابط الذي طلبته غير صحيح.':'The link you requested does not exist.'}</p>
<a href="${back}">${ar?'← العودة':'← Go Back'}</a></div></body></html>`,
  { status: 404, headers: { 'Content-Type': 'text/html; charset=utf-8' } });
}


// ─── PORTAL HUB API — aggregates BSMA + GIVC + SBS + Oracle + NPHIES live ──
async function apiPortalHub(env) {
  // Serve from in-memory cache (2 min TTL) to avoid hammering upstream on every page load
  const cached = mcGet('portal-hub');
  if (cached) return ok(cached);

  const oracleKey = (env && env.ORACLE_API_KEY) || ORACLE_BRIDGE_KEY;
  const [bsmaNet, givcData, sbsData, oracleData] = await Promise.allSettled([
    fetch('https://bsma.elfadil.com/basma/network',            { signal: AbortSignal.timeout(6000) }).then(r => r.ok ? r.json() : null),
    fetch('https://givc.elfadil.com/api/nphies/summary',       { signal: AbortSignal.timeout(6000) }).then(r => r.ok ? r.json() : null),
    fetch('https://sbs.elfadil.com/claimlinc/coverage/batch',  {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: '{"status":"active"}',                               signal: AbortSignal.timeout(6000),
    }).then(r => r.ok ? r.json() : null),
    fetch('https://oracle-bridge.brainsait.org/health',         {
      headers: { 'X-API-Key': oracleKey },
                                                                 signal: AbortSignal.timeout(5000),
    }).then(r => r.ok ? r.json() : null),
  ]);

  const net    = bsmaNet.status    === 'fulfilled' ? bsmaNet.value    : null;
  const givc   = givcData.status   === 'fulfilled' ? givcData.value   : null;
  const sbs    = sbsData.status    === 'fulfilled' ? sbsData.value    : null;
  const oracle = oracleData.status === 'fulfilled' ? oracleData.value : null;
  const fin    = net?.financials || {};
  const br     = net?.by_branch || {};

  const result = {
    timestamp: new Date().toISOString(),
    portals: {
      bsma:   { url: 'https://bsma.elfadil.com',   status: net   ? 'live' : 'degraded', label_ar: 'بوابة المريض',    label_en: 'Patient Portal',   emoji: '🙂', version: '3.0.0' },
      givc:   { url: 'https://givc.elfadil.com',   status: givc  ? 'live' : 'degraded', label_ar: 'بوابة الطبيب',   label_en: 'Clinician Portal',  emoji: '🩺', version: '2.2.1' },
      sbs:    { url: 'https://sbs.elfadil.com',    status: sbs   ? 'live' : 'degraded', label_ar: 'بوابة الفواتير', label_en: 'Billing Portal',    emoji: '💰', version: '2.2.0' },
      oracle: { url: 'https://oracle-bridge.brainsait.org', status: oracle ? 'live' : 'degraded', label_ar: 'Oracle HIS', label_en: 'Oracle HIS', emoji: '🔷', version: '2.0.0' },
      nphies: { url: 'https://portal.nphies.sa',   status: fin.network_total_sar ? 'live' : 'degraded', label_ar: 'NPHIES',  label_en: 'NPHIES',  emoji: '🏛️', version: 'live' },
    },
    nphies: {
      network_sar:   fin.network_total_sar    || 835690702.81,
      approval_rate: fin.network_approval_rate_pct || 98.6,
      total_claims:  fin.total_claims_gss     || 15138,
      total_pa:      net?.prior_auth?.network_total || 51018,
      by_branch:     br,
    },
    coverage: {
      total:    sbs?.total || 6,
      records:  sbs?.coverage || [],
    },
    oracle_status: oracle?.ok || false,
    givc_summary: givc || null,
  };

  mcSet('portal-hub', result, 120000); // cache 2 minutes
  return ok(result);
}

// ─── UNIFIED DASHBOARD ── single call replaces 3 client round-trips ──────────
async function apiDashboard(env) {
  const cached = mcGet('dashboard');
  if (cached) return ok(cached);
  return dedupe('dashboard', async () => {
    const [hubResp, bsmaNet, dbStats] = await Promise.allSettled([
      apiPortalHub(env).then(r => r.json()),
      bsmaNetwork(),
      Promise.all([
        env.DB.prepare('SELECT COUNT(*) as n FROM patients WHERE is_active=1').first().catch(() => ({ n: 0 })),
        env.DB.prepare('SELECT COUNT(*) as n FROM appointments WHERE status = ?').bind('confirmed').first().catch(() => ({ n: 0 })),
        env.DB.prepare('SELECT COUNT(*) as n FROM claims WHERE nphies_claim_id IS NOT NULL').first().catch(() => ({ n: 0 })),
        env.DB.prepare('SELECT COUNT(*) as n FROM providers WHERE is_active=1').first().catch(() => ({ n: 0 })),
        env.DB.prepare('SELECT COUNT(*) as n FROM departments WHERE is_active=1').first().catch(() => ({ n: 0 })),
      ]),
    ]);
    const hub  = hubResp.status  === 'fulfilled' ? hubResp.value  : {};
    const bsma = bsmaNet.status  === 'fulfilled' ? bsmaNet.value  : null;
    const db   = dbStats.status  === 'fulfilled' ? dbStats.value  : [{ n: 0 }, { n: 0 }, { n: 0 }, { n: 0 }, { n: 0 }];
    const fin  = bsma?.financials || {};
    const hubN = hub.nphies || {};
    const data = {
      ts:      Date.now(),
      version: VERSION,
      stats: {
        total_patients:      db[0]?.n || 0,
        active_appointments: db[1]?.n || 0,
        nphies_claims:       db[2]?.n || 0,
        total_departments:   db[4]?.n || 20,
      },
      total_providers:  db[3]?.n || 269,
      nphies: {
        approval_rate: fin.network_approval_rate_pct || hubN.approval_rate || 98.6,
        total_sar:     fin.network_total_sar          || 835690702.81,
        total_claims:  fin.total_claims_gss           || hubN.total_claims || 15138,
        total_pa:      bsma?.prior_auth?.network_total || hubN.total_pa    || 51018,
        source:        bsma ? 'bsma-live' : 'cached',
      },
      portals:       hub.portals  || {},
      coverage:      hub.coverage || { total: 6 },
      oracle_status: hub.oracle_status || false,
    };
    mcSet('dashboard', data, 60000); // 1-minute cache
    return ok(data);
  });
}


export default {
  async fetch(req, env) {
    if (req.method === 'OPTIONS') return cors();

    const t0   = Date.now();
    const url  = new URL(req.url);
    const path = url.pathname;
    const ip   = req.headers.get('CF-Connecting-IP') || 'anon';
    const reqId = Math.random().toString(36).slice(2, 10).toUpperCase();

    rlCleanup(); // periodic Map cleanup — runs at most once/min per isolate

    if (!rateOk(ip)) {
      const r = new Response(JSON.stringify({ success: false, error: 'Rate limit exceeded' }), { status: 429, headers: { ...JSON_H, 'Retry-After': '60' } });
      r.headers.set('X-Request-ID', reqId);
      return r;
    }

    const resp = await handleRequest(req, env, url, path);

    // Attach tracing headers to every response
    resp.headers.set('X-Request-ID',  reqId);
    resp.headers.set('X-HNH-Version', VERSION);

    // Structured request log (captured by Cloudflare Logpush)
    console.log(JSON.stringify({ v: VERSION, ts: Date.now(), m: req.method, p: path, s: resp.status, ms: Date.now() - t0, rid: reqId }));

    return resp;
  },
};

async function handleRequest(req, env, url, path) {
  // ── HTML pages ────────────────────────────────────────────
  if (path === '/' || path === '/index.html' || path === '/blog' || path === '/academy') {
    const lang = url.searchParams.get('lang') === 'en' ? 'en' : 'ar';
    return new Response(buildHTML(lang), { headers: HTML_H });
  }
  // Language-prefixed homepages
  if (path === '/ar' || path === '/ar/') return new Response(buildHTML('ar'), { headers: HTML_H });
  if (path === '/en' || path === '/en/') return new Response(buildHTML('en'), { headers: HTML_H });

  // User journey / role pages
  const _rl = url.searchParams.get('lang') === 'en' ? 'en' : 'ar';
  if (path === '/patient')   return buildRolePage('patient',   _rl);
  if (path === '/clinician') return buildRolePage('clinician', _rl);
  if (path === '/admin')     return buildRolePage('admin',     _rl);
  if (path === '/billing')   return buildRolePage('billing',   _rl);
  if (path === '/status')    return buildRolePage('status',    _rl);

  // ── Sitemap + Robots ──────────────────────────────────────
  if (path === '/sitemap.xml') {
    const base = 'https://hnh.brainsait.org';
    const blogUrls = BLOG_POSTS.map(p =>
      '  <url><loc>' + base + '/blog/' + p.id + '</loc><changefreq>monthly</changefreq><priority>0.8</priority>' +
      '<xhtml:link rel="alternate" hreflang="ar" href="' + base + '/blog/' + p.id + '?lang=ar"/>' +
      '<xhtml:link rel="alternate" hreflang="en" href="' + base + '/blog/' + p.id + '?lang=en"/></url>'
    ).join('\n');
    const courseUrls = COURSES.map(c =>
      '  <url><loc>' + base + '/academy/' + c.id + '</loc><changefreq>monthly</changefreq><priority>0.8</priority>' +
      '<xhtml:link rel="alternate" hreflang="ar" href="' + base + '/academy/' + c.id + '?lang=ar"/>' +
      '<xhtml:link rel="alternate" hreflang="en" href="' + base + '/academy/' + c.id + '?lang=en"/></url>'
    ).join('\n');
    const sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n' +
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n' +
      '  <url><loc>' + base + '/</loc><changefreq>daily</changefreq><priority>1.0</priority>' +
      '<xhtml:link rel="alternate" hreflang="ar" href="' + base + '/?lang=ar"/>' +
      '<xhtml:link rel="alternate" hreflang="en" href="' + base + '/?lang=en"/></url>\n' +
      blogUrls + '\n' + courseUrls + '\n</urlset>';
    return new Response(sitemap, { headers: { 'Content-Type': 'application/xml; charset=utf-8', 'Cache-Control': 'public, max-age=3600' } });
  }
  if (path === '/robots.txt') {
    return new Response('User-agent: *\nAllow: /\nSitemap: https://hnh.brainsait.org/sitemap.xml\n', { headers: { 'Content-Type': 'text/plain' } });
  }

  // ── Fast meta endpoints ────────────────────────────────────
  if (path === '/api/version') {
    return ok({ version: VERSION, worker: 'hnh-unified', facility: FACILITY_LIC, ts: Date.now() });
  }

  // ── Public JSON API ───────────────────────────────────────
  if (path === '/health' || path === '/api/health')     return apiHealth(env);
  if (path === '/api/stats')                             return apiStats(env);
  if (path === '/api/dashboard')                         return apiDashboard(env);
  if (path === '/api/branches')                          return ok({ branches: BRANCHES, total: BRANCHES.length });
  if (path === '/api/insurance')                         return ok({ partners: INSURANCE });

  // ── Oracle Portal Integration ─────────────────────────────
  if (path === '/api/oracle/status') {
    const status = await oracleTunnelStatus(env);
    return ok({
      tunnel_id:     'e5cb8c86-1768-46b0-bb35-a2720f26e88d',
      tunnel_name:   'hayath-mcp',
      tunnel_health: 'healthy',
      connections:   8,
      colos:         ['mrs06', 'ruh02'],
      origin_ip:     '212.118.115.118',
      hospitals:     status.hospitals,
      oracle_bridge: ORACLE_BRIDGE,
      last_check:    new Date().toISOString(),
    });
  }

  // Derive hospital list from authoritative TUNNEL_STATUS constant (no stale hardcoded data)
  if (path === '/api/oracle/hospitals') {
    return ok({
      tunnel_id: 'e5cb8c86-1768-46b0-bb35-a2720f26e88d',
      hospitals: Object.entries(TUNNEL_STATUS).map(([id, s]) => ({
        id, reachable: s.reachable, url: 'https://oracle-' + id + '.brainsait.org',
        ms: s.ms, note: s.note || (s.reachable ? 'ok' : 'timeout via CF egress'),
      })),
      updated: '2026-05-02',
      note: 'Oracle Bridge /health ok; hospitals unreachable via CF egress',
    });
  }

  if (path === '/api/oracle/patient' && req.method === 'GET') {
    const u = new URL(req.url);
    const hospital = u.searchParams.get('hospital') || 'madinah';
    const name     = u.searchParams.get('name') || '';
    const natId    = u.searchParams.get('national_id') || '';
    const mrn      = u.searchParams.get('mrn') || '';
    if (!TUNNEL_STATUS[hospital]?.reachable) {
      return ok({ patients: [], source: 'tunnel_down', hospital, note: TUNNEL_STATUS[hospital]?.note });
    }
    const param = natId ? 'national_id=' + encodeURIComponent(natId)
                : mrn   ? 'mrn='         + encodeURIComponent(mrn)
                         : 'name='        + encodeURIComponent(name);
    const data = await oracleCall(env, 'GET', '/patient/search?hospital=' + hospital + '&' + param, null, hospital);
    return ok({ patients: (data?.patients || []).map(maskPatient), hospital, source: data ? 'oracle-live' : 'unavailable' });
  }

  if (path === '/api/oracle/appointments' && req.method === 'GET') {
    const u = new URL(req.url);
    const hospital = u.searchParams.get('hospital') || 'madinah';
    const mrn      = u.searchParams.get('mrn') || '';
    const date     = u.searchParams.get('date') || new Date().toISOString().split('T')[0];
    if (!TUNNEL_STATUS[hospital]?.reachable) {
      return ok({ appointments: [], source: 'tunnel_down', hospital });
    }
    const data = await oracleCall(env, 'GET', '/appointments?hospital=' + hospital + '&mrn=' + encodeURIComponent(mrn) + '&date=' + date, null, hospital);
    return ok({ appointments: data?.appointments || data || [], hospital, source: data ? 'oracle-live' : 'unavailable' });
  }

  if (path === '/api/oracle/nphies' && req.method === 'POST') {
    const body = await req.json().catch(() => ({}));
    const data = await oracleCall(env, 'POST', '/api/nphies/eligibility', {
      ...body, facility_license: FACILITY_LIC,
    }, body.hospital || 'madinah');
    return ok({ result: data, source: data ? 'oracle-nphies' : 'unavailable' });
  }

  if (path.startsWith('/api/providers'))                 return apiProviders(req, env);
  if (path.startsWith('/api/patients'))                  return apiPatients(req, env);
  if (path.startsWith('/api/appointments'))              return apiAppointments(req, env);
  if (path === '/api/eligibility' || (path.startsWith('/api/eligibility') && req.method === 'POST')) return apiEligibility(req, env);
  if (path.startsWith('/api/drugs'))                     return apiDrugs(req, env);
  if (path.startsWith('/api/chat'))                      return apiChat(req, env);

  // NPHIES (specific routes before broad catch)
  if (path === '/api/nphies' || path === '/api/nphies/status')  return apiNphies(req, env, '');
  if (path === '/api/nphies/analysis')                           return apiNphies(req, env, '/analysis');
  if (path === '/api/nphies/network')                            return apiNphies(req, env, '/network');
  if (path === '/api/nphies/facilities')                         return apiNphies(req, env, '/facilities');
  if (path.startsWith('/api/nphies/live/'))                      return apiNphies(req, env, '/live/' + path.slice('/api/nphies/live/'.length));
  if (path.startsWith('/api/nphies'))                            return apiNphies(req, env, path.replace('/api/nphies', ''));

  // Portal hub (must come BEFORE the /api/portal catch-all)
  if (path === '/api/portal-hub')                        return apiPortalHub(env);
  if (path.startsWith('/api/portal'))                    return apiPortal(req, env, path.replace('/api/portal', '') || '/stats');

  // Blog
  if (path === '/api/blog' || path === '/api/blog/')     return apiBlog(null);
  if (path.startsWith('/api/blog/'))                     return apiBlog(path.slice('/api/blog/'.length));

  // Academy — all public, with and without /courses/ prefix
  if (path === '/api/academy' || path === '/api/academy/')       return apiAcademy(req, null);
  if (path === '/api/academy/courses')                            return apiAcademy(req, null);
  if (path.startsWith('/api/academy/courses/'))                   return apiAcademy(req, path.slice('/api/academy/courses/'.length));
  if (path === '/api/academy/stats')                              return ok({ total_courses: COURSES.length, total_hours: 104, accreditation: 'SCFHS CPD + CHI', repos: ['nphies-course-platform','sbs','brainsait-rcm','open-webui','brainsait-mcp-dxt'] });
  if (path.startsWith('/api/academy/'))                           return apiAcademy(req, path.slice('/api/academy/'.length));

  // ── Public article + course pages (NO auth) ──────────────
  if (path.startsWith('/blog/')) {
    const slug  = path.slice(6);
    const langP = url.searchParams.get('lang') || 'ar';
    return serveBlogArticle(slug, langP);
  }
  if (path.startsWith('/academy/')) {
    const cid   = path.slice(9);
    const langP = url.searchParams.get('lang') || 'ar';
    return serveAcademyCourse(cid, langP);
  }

  // ── Voice Agent Proxy (PUBLIC — before auth) ────────────
  if (path.startsWith('/voice')) {
    const VOICE_WORKER = 'https://basma-voice-agent.brainsait-fadil.workers.dev';
    try {
      const vUrl = VOICE_WORKER + path + (url.search || '');
      const fwdHeaders = { 'X-Forwarded-Host': 'hnh.brainsait.org' };
      ['content-type','x-language','x-session-id','authorization','accept'].forEach(h => {
        const v = req.headers.get(h); if (v) fwdHeaders[h] = v;
      });
      const vResp = await fetch(vUrl, {
        method: req.method, headers: fwdHeaders,
        body: ['GET','HEAD'].includes(req.method) ? null : req.body,
      });
      const headers = new Headers(vResp.headers);
      Object.entries(CORS).forEach(([k,v]) => headers.set(k,v));
      return new Response(vResp.body, { status: vResp.status, headers });
    } catch (e) {
      return err('Voice agent unavailable: ' + e.message, 503);
    }
  }

  // ── Protected API — explicit path list, 401 only for known protected routes ──
  const PROTECTED_PREFIXES = ['/api/claims', '/api/rcm', '/api/sync/', '/api/oracle/diagnose', '/api/schema'];
  if (PROTECTED_PREFIXES.some(p => path === p || path.startsWith(p))) {
    const guard = authGuard(req, env);
    if (guard) return guard;

    if (path.startsWith('/api/claims'))    return apiClaims(req, env);
    if (path === '/api/rcm')               return apiRCM(env);
    if (path.startsWith('/api/sync/'))     return apiSync(env, path.slice('/api/sync/'.length));

    if (path === '/api/schema') {
      const tables = ['patients','appointments','claims','providers','departments','rag_documents'];
      const counts = {};
      for (const t of tables) {
        const r = await env.DB.prepare('SELECT COUNT(*) as n FROM ' + t).first().catch(() => ({ n: 0 }));
        counts[t] = r?.n || 0;
      }
      return ok({ database: 'hnh-gharnata', version: VERSION, tables: counts });
    }
  }

  // ── Unrecognised path ─────────────────────────────────────
  return err('Not found', 404);
}
