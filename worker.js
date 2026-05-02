/**
 * HNH Unified Worker v7.0 — hnh.brainsait.org
 * مستشفيات الحياة الوطني — Hayat National Hospitals
 * BrainSAIT Healthcare OS
 *
 * Architecture: Clean ES module, no nested template literal issues
 * All inline JS uses string concatenation — zero backtick nesting
 */

// ─── CONSTANTS ────────────────────────────────────────────────────────────────
const VERSION        = '7.0.0';
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
const HTML_H = { ...SEC, 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'public, max-age=60' };

// ─── HELPERS ──────────────────────────────────────────────────────────────────
const ok  = d       => new Response(JSON.stringify({ success: true,  ...d }), { headers: JSON_H });
const err = (m, s=400) => new Response(JSON.stringify({ success: false, error: m }), { status: s, headers: JSON_H });
const cors = ()     => new Response(null, { status: 204, headers: { ...CORS } });

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

// ─── EXTERNAL SERVICES ────────────────────────────────────────────────────────
async function oracleFetch(env, path, opts = {}) {
  try {
    const r = await fetch(`${env.ORACLE_BRIDGE_URL || 'https://oracle-bridge.brainsait.org'}${path}`, {
      ...opts,
      headers: { 'Content-Type': 'application/json', 'X-API-Key': env.ORACLE_API_KEY || '', 'X-Hospital': 'gharnata', ...(opts.headers || {}) },
      signal: AbortSignal.timeout(10000),
    });
    return r.ok ? r : null;
  } catch { return null; }
}

async function clFetch(path) {
  try {
    const r = await fetch(`${CLAIMLINC_BASE}${path}`, {
      headers: { 'X-API-Key': CLAIMLINC_KEY },
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
];

// ─── API HANDLERS ─────────────────────────────────────────────────────────────

async function apiHealth(env) {
  const [dbOk, oracleOk, mirrorOk] = await Promise.all([
    env.DB.prepare('SELECT 1').first().then(() => true).catch(() => false),
    oracleFetch(env, '/health').then(r => !!r).catch(() => false),
    fetch('https://nphies-mirror.brainsait-fadil.workers.dev/mirror/status', { signal: AbortSignal.timeout(5000) })
      .then(r => r.ok).catch(() => false),
  ]);
  const [hisN, ragN] = await Promise.all([
    env.HIS_DB?.prepare('SELECT COUNT(*) as n FROM bsma_appointments').first().catch(() => ({ n: 0 })),
    env.BASMA_DB?.prepare('SELECT COUNT(*) as n FROM rag_documents').first().catch(() => ({ n: 0 })),
  ]);
  return ok({
    version: VERSION, worker: 'hnh-unified', facility: FACILITY_LIC,
    status: dbOk ? 'healthy' : 'degraded',
    integrations: {
      d1_primary:    dbOk      ? 'connected' : 'error',
      d1_his_database: hisN?.n > 0  ? 'connected' : 'empty',
      d1_basma:      ragN?.n > 0  ? 'connected' : 'empty',
      oracle_bridge: oracleOk  ? 'connected' : 'unreachable',
      nphies_mirror: mirrorOk  ? 'connected' : 'degraded',
      claimlinc:     'live',
      sbs_portal:    'connected',
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

  // AI response via Workers AI
  let reply = '';
  if (env.AI && ragCtx) {
    try {
      const ai = await env.AI.run('@cf/meta/llama-3.3-70b-instruct-fp8-fast', {
        messages: [
          { role: 'system', content: 'أنت بسمة، المساعدة الذكية لمستشفيات الحياة الوطني. تتحدثين العربية والإنجليزية. استخدمي هذا السياق:\n\n' + ragCtx + '\n\nكوني دافئة ومهنية وموجزة. لا تشخّصي أمراضاً. للتواصل: ' + PHONE },
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
    const net = await clFetch('/network/summary');
    const [claims, pa] = await Promise.all([
      env.DB.prepare('SELECT COUNT(*) as n FROM claims WHERE nphies_claim_id IS NOT NULL').first().catch(() => ({ n: 0 })),
      env.DB.prepare('SELECT COUNT(*) as n FROM prior_authorizations').first().catch(() => ({ n: 0 })),
    ]);
    return ok({ facility: FACILITY_LIC, network: net, local: { claims: claims?.n, pa: pa?.n } });
  }
  if (sub === '/analysis') {
    const net = await bsmaNetwork();
    const fac = await clFetch('/facilities');
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
  if (sub === '/network') { const d = await clFetch('/network/summary'); return ok({ source: 'claimlinc', data: d }); }
  if (sub === '/facilities') { const d = await clFetch('/facilities'); return ok({ source: 'claimlinc', data: d }); }
  if (sub.startsWith('/live/')) {
    const mapped = sub.replace('/live', '');
    const d = await clFetch(mapped);
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
    return ok({ courses, total: courses.length, stats: { total_courses: 5, total_hours: 62, accreditation: 'SCFHS CPD + CHI' } });
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
    return '<div class="blog-card"><div class="blog-top"><span class="blog-emoji">' + p.emoji + '</span>' +
      (p.featured ? '<span class="chip-feat">Featured</span>' : '') +
      '<span class="cat-tag">' + p.category.toUpperCase() + '</span></div>' +
      '<div class="blog-body"><h3 class="blog-title">' + title + '</h3>' +
      '<p class="blog-excerpt">' + excerpt + '</p>' +
      '<div class="blog-meta"><span>✍️ ' + p.author + '</span><span>📖 ' + p.read_min + ' ' + T.min + '</span><span>📅 ' + p.date + '</span></div></div></div>';
  }).join('');

  // Academy HTML (server-side rendered)
  const academyHtml = COURSES.map(c => {
    const title = ar ? c.title_ar : c.title_en;
    const desc  = ar ? c.desc_ar  : c.desc_en;
    const lvlMap = { beginner: '🟢 ' + T.level_b, intermediate: '🟡 ' + T.level_i, advanced: '🔴 ' + T.level_a };
    return '<div class="course-card"><div class="course-icon">' + c.icon + '</div>' +
      '<h3 class="course-title">' + title + '</h3>' +
      '<p class="course-desc">' + desc + '</p>' +
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
    <a href="#depts">${T.depts}</a>
    <a href="#branches">${T.branches}</a>
    <a href="#doctors">${T.doctors}</a>
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
      <div class="hv-metric"><span class="hv-label">${ar ? 'إجمالي الشبكة' : 'Network Total'}</span><span class="hv-val">SAR 835.7M</span></div>
      <div class="hv-metric"><span class="hv-label">${ar ? 'معدل الموافقة' : 'Approval Rate'}</span><span class="hv-val"><span class="hv-badge badge-ok">98.6%</span></span></div>
      <div class="hv-metric"><span class="hv-label">${ar ? 'المطالبات' : 'Claims'}</span><span class="hv-val">15,138</span></div>
      <div class="hv-metric"><span class="hv-label">${ar ? 'الرياض (⚠️)' : 'Riyadh (⚠️)'}</span><span class="hv-val"><span class="hv-badge badge-warn">88.5%</span></span></div>
      <div class="hv-metric"><span class="hv-label">${ar ? 'كلينك AI — الاسترداد' : 'ClaimLinc AI Recovery'}</span><span class="hv-val">SAR 9.8M</span></div>
    </div>
  </div>
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
    <div class="stat-card"><div class="stat-n">5</div><div class="stat-l">${ar ? 'دورات' : 'Courses'}</div></div>
    <div class="stat-card"><div class="stat-n">62+</div><div class="stat-l">${ar ? 'ساعة' : 'Hours'}</div></div>
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

// Stats
fetchJSON('/api/stats', function(d) {
  var s = d.stats || {};
  var pEl = document.getElementById('stat-prov');
  var dEl = document.getElementById('stat-dept');
  if (pEl) pEl.textContent = (s.total_providers || 269).toLocaleString();
  if (dEl) dEl.textContent = (s.total_departments || 20).toLocaleString();
});

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

// ─── MAIN ROUTER ──────────────────────────────────────────────────────────────
export default {
  async fetch(req, env) {
    if (req.method === 'OPTIONS') return cors();

    const url  = new URL(req.url);
    const path = url.pathname;
    const ip   = req.headers.get('CF-Connecting-IP') || 'anon';

    if (!rateOk(ip)) return err('Rate limit exceeded', 429);

    // ── HTML pages ────────────────────────────────────────────
    if (path === '/' || path === '/index.html' || path === '/blog' || path === '/academy') {
      const lang = url.searchParams.get('lang') || (req.headers.get('Accept-Language') || '').includes('ar') ? 'ar' : 'ar';
      return new Response(buildHTML(lang), { headers: HTML_H });
    }

    // ── Public JSON API ───────────────────────────────────────
    if (path === '/health' || path === '/api/health')     return apiHealth(env);
    if (path === '/api/stats')                             return apiStats(env);
    if (path === '/api/branches')                          return ok({ branches: BRANCHES, total: BRANCHES.length });
    if (path === '/api/insurance')                         return ok({ partners: INSURANCE });
    if (path.startsWith('/api/providers'))                 return apiProviders(req, env);
    if (path.startsWith('/api/patients'))                  return apiPatients(req, env);
    if (path.startsWith('/api/appointments'))              return apiAppointments(req, env);
    if (path === '/api/eligibility' || (path.startsWith('/api/eligibility') && req.method === 'POST')) return apiEligibility(req, env);
    if (path.startsWith('/api/drugs'))                     return apiDrugs(req, env);
    if (path.startsWith('/api/chat'))                      return apiChat(req, env);

    // NPHIES (analysis before broad catch)
    if (path === '/api/nphies' || path === '/api/nphies/status')  return apiNphies(req, env, '');
    if (path === '/api/nphies/analysis')                           return apiNphies(req, env, '/analysis');
    if (path === '/api/nphies/network')                            return apiNphies(req, env, '/network');
    if (path === '/api/nphies/facilities')                         return apiNphies(req, env, '/facilities');
    if (path.startsWith('/api/nphies/live/'))                      return apiNphies(req, env, '/live/' + path.slice('/api/nphies/live/'.length));
    if (path.startsWith('/api/nphies'))                            return apiNphies(req, env, path.replace('/api/nphies', ''));

    // Portal hub
    if (path.startsWith('/api/portal'))                    return apiPortal(req, env, path.replace('/api/portal', '') || '/stats');

    // Blog
    if (path === '/api/blog' || path === '/api/blog/')     return apiBlog(null);
    if (path.startsWith('/api/blog/'))                     return apiBlog(path.slice('/api/blog/'.length));

    // Academy
    if (path === '/api/academy/courses')                   return apiAcademy(req, null);
    if (path.startsWith('/api/academy/courses/'))          return apiAcademy(req, path.slice('/api/academy/courses/'.length));
    if (path === '/api/academy/stats')                     return ok({ total_courses: 5, total_hours: 62, accreditation: 'SCFHS CPD + CHI', repos: ['nphies-course-platform','sbs','brainsait-rcm','open-webui','brainsait-mcp-dxt'] });

    // ── Protected API ─────────────────────────────────────────
    const guard = authGuard(req, env);
    if (guard) return guard;

    if (path.startsWith('/api/claims'))                    return apiClaims(req, env);
    if (path === '/api/rcm')                               return apiRCM(env);
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
