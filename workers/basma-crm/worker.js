// ════════════════════════════════════════════════════════════════════════════
// BASMA CRM — BrainSAIT Patient & Revenue Cycle Management
// Worker: basma-crm | Route: crm.brainsait.org
// ════════════════════════════════════════════════════════════════════════════

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type,Authorization,X-API-Key',
};

const HTML_H = { 'Content-Type': 'text/html;charset=utf-8', 'Cache-Control': 'no-cache' };

export default {
  async fetch(req, env) {
    const url = new URL(req.url);
    const path = url.pathname;
    if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: CORS });

    // ── API Routes ──────────────────────────────────────────────────────────
    if (path.startsWith('/api/')) return handleAPI(req, env, url, path);

    // ── CRM Pages ───────────────────────────────────────────────────────────
    if (path === '/' || path === '/dashboard') return buildPage('dashboard', env);
    if (path === '/patients') return buildPage('patients', env);
    if (path === '/appointments') return buildPage('appointments', env);
    if (path === '/claims') return buildPage('claims', env);
    if (path === '/handoffs') return buildPage('handoffs', env);
    if (path === '/rcm') return buildPage('rcm', env);

    return new Response('Not found', { status: 404 });
  }
};

// ═══════════════════════════════════════════════════════════════════════════
// API HANDLERS
// ═══════════════════════════════════════════════════════════════════════════

async function handleAPI(req, env, url, path) {
  const json = (d, s = 200) => new Response(JSON.stringify(d), {
    status: s, headers: { 'Content-Type': 'application/json', ...CORS }
  });

  // ── Dashboard Stats ──────────────────────────────────────────────────────
  if (path === '/api/stats') {
    const [pts, appts, clms, hdfs, rjcts, net] = await Promise.allSettled([
      env.DB.prepare('SELECT COUNT(*) as n FROM patients WHERE is_active=1').first(),
      env.DB.prepare("SELECT COUNT(*) as n FROM appointments WHERE status='scheduled'").first(),
      env.DB.prepare("SELECT COUNT(*) as n, COALESCE(SUM(total_amount),0) as total FROM claims").first(),
      env.DB.prepare("SELECT COUNT(*) as n FROM bsma_handoffs WHERE status='pending'").first(),
      env.DB.prepare("SELECT COUNT(*) as n, COALESCE(SUM(total_amount),0) as sar FROM claims WHERE status='rejected'").first(),
      fetch('https://bsma.elfadil.com/basma/network', { signal: AbortSignal.timeout(5000) }).then(r => r.json()).catch(() => null),
    ]);
    return json({
      patients:    pts.status === 'fulfilled' ? pts.value?.n : 0,
      appointments: appts.status === 'fulfilled' ? appts.value?.n : 0,
      claims_total: clms.status === 'fulfilled' ? { count: clms.value?.n, sar: clms.value?.total } : null,
      handoffs_pending: hdfs.status === 'fulfilled' ? hdfs.value?.n : 0,
      rejections: rjcts.status === 'fulfilled' ? { count: rjcts.value?.n, sar: rjcts.value?.sar } : null,
      network: net.status === 'fulfilled' ? net.value?.financials : null,
    });
  }

  // ── Patients ─────────────────────────────────────────────────────────────
  if (path === '/api/patients') {
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '20');
    const search = url.searchParams.get('q') || '';
    const offset = (page - 1) * limit;

    let sql = `SELECT id, mrn, full_name_ar, full_name_en, national_id, phone, email, 
               date_of_birth, gender, nationality, blood_type, created_at, is_active
               FROM patients`;
    const params = [];
    if (search) {
      sql += ` WHERE (full_name_ar LIKE ? OR full_name_en LIKE ? OR national_id LIKE ? OR mrn LIKE ? OR phone LIKE ?)`;
      const s = `%${search}%`;
      params.push(s, s, s, s, s);
    }
    sql += ` ORDER BY created_at DESC LIMIT ? OFFSET ?`;
    params.push(limit, offset);

    const [rows, countRow] = await Promise.all([
      env.DB.prepare(sql).bind(...params).all(),
      env.DB.prepare(`SELECT COUNT(*) as n FROM patients${search ? ' WHERE (full_name_ar LIKE ? OR full_name_en LIKE ? OR national_id LIKE ? OR mrn LIKE ? OR phone LIKE ?)' : ''}`).bind(...(search ? [`%${search}%`,`%${search}%`,`%${search}%`,`%${search}%`,`%${search}%`] : [])).first(),
    ]);
    return json({ patients: rows.results, total: countRow?.n || 0, page, limit });
  }

  if (path.match(/^\/api\/patients\/\d+$/)) {
    const id = path.split('/')[3];
    const [pt, appts, claims] = await Promise.all([
      env.DB.prepare('SELECT * FROM patients WHERE id=?').bind(id).first(),
      env.DB.prepare('SELECT * FROM appointments WHERE patient_id=? ORDER BY appointment_date DESC LIMIT 10').bind(id).all(),
      env.DB.prepare('SELECT * FROM claims WHERE patient_id=? ORDER BY created_at DESC LIMIT 10').bind(id).all(),
    ]);
    if (!pt) return json({ error: 'Not found' }, 404);
    return json({ patient: pt, appointments: appts.results, claims: claims.results });
  }

  // ── Appointments ─────────────────────────────────────────────────────────
  if (path === '/api/appointments') {
    const status = url.searchParams.get('status') || '';
    const branch = url.searchParams.get('branch') || '';
    const date = url.searchParams.get('date') || '';
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '25');

    let sql = `SELECT a.*, p.full_name_ar, p.full_name_en, p.phone FROM appointments a
               LEFT JOIN patients p ON a.patient_id = p.id WHERE 1=1`;
    const params = [];
    if (status) { sql += ' AND a.status=?'; params.push(status); }
    if (branch) { sql += ' AND a.notes LIKE ?'; params.push(`%branch: ${branch}%`); }
    if (date) { sql += ' AND a.appointment_date=?'; params.push(date); }
    sql += ` ORDER BY a.appointment_date DESC, a.appointment_time DESC LIMIT ? OFFSET ?`;
    params.push(limit, (page - 1) * limit);

    const rows = await env.DB.prepare(sql).bind(...params).all();
    return json({ appointments: rows.results, page, limit });
  }

  // ── Claims ────────────────────────────────────────────────────────────────
  if (path === '/api/claims') {
    const status = url.searchParams.get('status') || '';
    const payer = url.searchParams.get('payer') || '';
    const branch = url.searchParams.get('branch') || '';
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '25');

    let sql = `SELECT c.*, p.full_name_ar, p.full_name_en FROM claims c
               LEFT JOIN patients p ON c.patient_id = p.id WHERE 1=1`;
    const params = [];
    if (status) { sql += ' AND c.status=?'; params.push(status); }
    if (payer) { sql += ' AND c.payer_name LIKE ?'; params.push(`%${payer}%`); }
    if (branch) { sql += ' AND c.branch=?'; params.push(branch); }
    sql += ` ORDER BY c.created_at DESC LIMIT ? OFFSET ?`;
    params.push(limit, (page - 1) * limit);

    const [rows, summary] = await Promise.all([
      env.DB.prepare(sql).bind(...params).all(),
      env.DB.prepare(`SELECT status, COUNT(*) as count, COALESCE(SUM(total_amount),0) as total 
                      FROM claims GROUP BY status`).all(),
    ]);
    return json({ claims: rows.results, summary: summary.results, page, limit });
  }

  // ── Handoffs ──────────────────────────────────────────────────────────────
  if (path === '/api/handoffs') {
    const status = url.searchParams.get('status') || 'pending';
    const rows = await env.DB.prepare(
      `SELECT * FROM bsma_handoffs WHERE status=? ORDER BY created_at DESC LIMIT 50`
    ).bind(status).all();
    return json({ handoffs: rows.results, count: rows.results.length });
  }

  if (path === '/api/handoffs/pickup' && req.method === 'POST') {
    const { id, picked_by } = await req.json();
    await env.DB.prepare(
      "UPDATE bsma_handoffs SET status='picked', picked_by=?, picked_at=CURRENT_TIMESTAMP WHERE id=?"
    ).bind(picked_by || 'crm-operator', id).run();
    return json({ success: true });
  }

  // ── RCM Summary ───────────────────────────────────────────────────────────
  if (path === '/api/rcm') {
    const [byStatus, byPayer, byCode, total] = await Promise.all([
      env.DB.prepare(`SELECT status, COUNT(*) as count, COALESCE(SUM(total_amount),0) as sar FROM claims GROUP BY status`).all(),
      env.DB.prepare(`SELECT payer_name, COUNT(*) as count, COALESCE(SUM(total_amount),0) as sar FROM claims GROUP BY payer_name ORDER BY sar DESC LIMIT 10`).all(),
      env.DB.prepare(`SELECT rejection_code, COUNT(*) as count, COALESCE(SUM(total_amount),0) as sar FROM claims WHERE status='rejected' AND rejection_code IS NOT NULL GROUP BY rejection_code ORDER BY sar DESC`).all(),
      env.DB.prepare(`SELECT COUNT(*) as count, COALESCE(SUM(total_amount),0) as total, COALESCE(SUM(approved_amount),0) as approved FROM claims`).first(),
    ]);
    return json({
      by_status: byStatus.results,
      by_payer: byPayer.results,
      by_rejection_code: byCode.results,
      totals: total,
      approval_rate: total?.total > 0 ? Math.round((total.approved / total.total) * 1000) / 10 : 0,
    });
  }

  return new Response(JSON.stringify({ error: 'Not found' }), { status: 404, headers: CORS });
}

// ═══════════════════════════════════════════════════════════════════════════
// PAGE BUILDER
// ═══════════════════════════════════════════════════════════════════════════

function buildPage(page, env) {
  const pages = {
    dashboard: buildDashboard,
    patients: buildPatients,
    appointments: buildAppointments,
    claims: buildClaims,
    handoffs: buildHandoffs,
    rcm: buildRCM,
  };
  const fn = pages[page] || buildDashboard;
  return new Response(fn(), { headers: HTML_H });
}

const SHELL = (title, active, content, extraScript = '') => `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title} — Basma CRM</title>
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
:root{
  --bg:#060c18;--sf:#0d1829;--b:#1e2d45;--n:#e8eaf0;--ts:#8899aa;
  --a:#0066cc;--a2:#0055aa;--green:#00c864;--red:#ff5050;--warn:#ffb400;
  --blue:#4ea5ff;--purple:#a78bfa;
  --font:'IBM Plex Sans Arabic',sans-serif;
  --font-en:'Plus Jakarta Sans',sans-serif;
  --r:12px;--sh:0 8px 32px rgba(0,0,0,.4);
}
body{font-family:var(--font);background:var(--bg);color:var(--n);min-height:100vh;display:flex}
/* ── Sidebar ── */
.sidebar{width:220px;min-height:100vh;background:rgba(13,24,41,.95);border-left:1px solid var(--b);
  display:flex;flex-direction:column;position:fixed;right:0;top:0;bottom:0;z-index:100}
.logo{padding:20px 16px;border-bottom:1px solid var(--b)}
.logo-title{font-size:1.1rem;font-weight:700;color:#fff}
.logo-sub{font-size:.72rem;color:var(--ts);margin-top:2px}
.nav{padding:12px 8px;flex:1}
.nav-link{display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:10px;
  text-decoration:none;color:var(--ts);font-size:.85rem;font-weight:500;transition:all .2s;margin-bottom:2px}
.nav-link:hover{background:rgba(255,255,255,.06);color:var(--n)}
.nav-link.active{background:rgba(0,102,204,.15);color:var(--blue);border:1px solid rgba(0,102,204,.25)}
.nav-icon{font-size:1.1rem;width:20px;text-align:center}
.sidebar-footer{padding:14px 12px;border-top:1px solid var(--b);font-size:.75rem;color:var(--ts)}
/* ── Main ── */
.main{margin-right:220px;padding:24px;min-height:100vh;width:calc(100% - 220px)}
.topbar{display:flex;align-items:center;justify-content:space-between;margin-bottom:24px}
.page-title{font-size:1.5rem;font-weight:700}
.page-sub{font-size:.82rem;color:var(--ts);margin-top:3px}
.topbar-actions{display:flex;gap:10px;align-items:center}
/* ── Cards ── */
.card{background:var(--sf);border:1px solid var(--b);border-radius:var(--r);padding:20px}
.stat-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:14px;margin-bottom:24px}
.stat{background:var(--sf);border:1px solid var(--b);border-radius:var(--r);padding:18px;position:relative;overflow:hidden}
.stat::before{content:'';position:absolute;top:0;right:0;width:60px;height:60px;
  background:radial-gradient(circle,var(--glow,rgba(0,102,204,.1)) 0%,transparent 70%);pointer-events:none}
.stat-icon{font-size:1.6rem;margin-bottom:8px;display:block}
.stat-val{font-size:1.8rem;font-weight:800;color:var(--scolor,var(--blue));font-family:var(--font-en)}
.stat-lbl{font-size:.76rem;color:var(--ts);margin-top:3px}
.stat-sub{font-size:.72rem;color:var(--ts);margin-top:4px}
/* ── Table ── */
.table-wrap{overflow-x:auto;border-radius:var(--r);border:1px solid var(--b);margin-top:16px}
table{width:100%;border-collapse:collapse;font-size:.83rem}
thead{background:rgba(0,0,0,.3)}
th{padding:11px 14px;text-align:right;color:var(--ts);font-weight:600;font-size:.75rem;
  text-transform:uppercase;letter-spacing:.05em;white-space:nowrap;border-bottom:1px solid var(--b)}
td{padding:11px 14px;border-bottom:1px solid rgba(30,45,69,.5);vertical-align:middle}
tr:last-child td{border-bottom:none}
tr:hover td{background:rgba(255,255,255,.02)}
/* ── Badges ── */
.badge{padding:3px 10px;border-radius:20px;font-size:.72rem;font-weight:600;white-space:nowrap}
.badge.green{background:rgba(0,200,100,.12);color:var(--green);border:1px solid rgba(0,200,100,.25)}
.badge.red{background:rgba(255,80,80,.12);color:var(--red);border:1px solid rgba(255,80,80,.25)}
.badge.warn{background:rgba(255,180,0,.12);color:var(--warn);border:1px solid rgba(255,180,0,.25)}
.badge.blue{background:rgba(78,165,255,.12);color:var(--blue);border:1px solid rgba(78,165,255,.25)}
.badge.purple{background:rgba(167,139,250,.12);color:var(--purple);border:1px solid rgba(167,139,250,.25)}
.badge.gray{background:rgba(136,153,170,.1);color:var(--ts);border:1px solid rgba(136,153,170,.2)}
/* ── Controls ── */
.search-bar{display:flex;gap:10px;margin-bottom:16px}
.search-inp{flex:1;padding:9px 14px;background:rgba(255,255,255,.05);border:1px solid var(--b);
  border-radius:9px;color:var(--n);font-family:var(--font);font-size:.85rem;outline:none}
.search-inp:focus{border-color:var(--a)}
.btn{padding:8px 16px;border-radius:9px;font-size:.82rem;font-weight:600;cursor:pointer;
  border:none;transition:all .2s;font-family:var(--font)}
.btn-primary{background:var(--a);color:#fff}
.btn-primary:hover{background:var(--a2)}
.btn-ghost{background:rgba(255,255,255,.06);color:var(--n);border:1px solid var(--b)}
.btn-ghost:hover{background:rgba(255,255,255,.1)}
.btn-success{background:rgba(0,200,100,.15);color:var(--green);border:1px solid rgba(0,200,100,.3)}
.btn-danger{background:rgba(255,80,80,.12);color:var(--red);border:1px solid rgba(255,80,80,.25)}
select.btn{padding:8px 14px;-webkit-appearance:none}
/* ── Loading ── */
.ld{text-align:center;padding:40px;color:var(--ts);font-size:.88rem}
.ld::before{content:'⏳ '}
/* ── Charts ── */
.bar-chart{display:flex;flex-direction:column;gap:10px}
.bar-row{display:flex;align-items:center;gap:10px;font-size:.8rem}
.bar-label{width:120px;text-align:right;color:var(--ts);flex-shrink:0}
.bar-track{flex:1;height:8px;background:rgba(255,255,255,.06);border-radius:4px;overflow:hidden}
.bar-fill{height:100%;border-radius:4px;transition:width .6s ease}
.bar-val{width:80px;color:var(--ts);font-size:.75rem;font-family:var(--font-en)}
/* ── Patient card ── */
.patient-card{background:var(--sf);border:1px solid var(--b);border-radius:var(--r);
  padding:16px;cursor:pointer;transition:all .2s}
.patient-card:hover{border-color:var(--a);transform:translateY(-2px)}
.pt-name{font-weight:600;font-size:.95rem}
.pt-meta{font-size:.76rem;color:var(--ts);margin-top:3px}
/* ── Grid ── */
.g2{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.g3{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
@media(max-width:900px){.g2,.g3{grid-template-columns:1fr}.sidebar{width:60px}.main{margin-right:60px;width:calc(100%-60px)}.nav-link span{display:none}}
</style>
</head>
<body>
<nav class="sidebar">
  <div class="logo">
    <div class="logo-title">😊 Basma CRM</div>
    <div class="logo-sub">BrainSAIT — مستشفيات الحياة</div>
  </div>
  <div class="nav">
    <a href="/dashboard" class="nav-link ${active==='dashboard'?'active':''}"><span class="nav-icon">📊</span><span>لوحة التحكم</span></a>
    <a href="/patients" class="nav-link ${active==='patients'?'active':''}"><span class="nav-icon">🧑‍⚕️</span><span>المرضى</span></a>
    <a href="/appointments" class="nav-link ${active==='appointments'?'active':''}"><span class="nav-icon">📅</span><span>المواعيد</span></a>
    <a href="/claims" class="nav-link ${active==='claims'?'active':''}"><span class="nav-icon">📋</span><span>المطالبات</span></a>
    <a href="/handoffs" class="nav-link ${active==='handoffs'?'active':''}"><span class="nav-icon">🔁</span><span>التحويلات</span></a>
    <a href="/rcm" class="nav-link ${active==='rcm'?'active':''}"><span class="nav-icon">💰</span><span>دورة الإيراد</span></a>
    <div style="margin-top:16px;padding:10px 12px;border-top:1px solid var(--b)">
      <a href="https://hnh.brainsait.org" target="_blank" class="nav-link" style="font-size:.75rem;color:var(--ts)">🏥 HNH</a>
      <a href="https://bsma.elfadil.com" target="_blank" class="nav-link" style="font-size:.75rem;color:var(--ts)">🎙️ BSMA</a>
      <a href="https://givc.elfadil.com" target="_blank" class="nav-link" style="font-size:.75rem;color:var(--ts)">🩺 GIVC</a>
    </div>
  </div>
  <div class="sidebar-footer">v1.0.0 · 2026-05-03</div>
</nav>
<main class="main">
${content}
</main>
<script>
const API = '';
function fmt(n){return n!=null?Number(n).toLocaleString('ar-SA'):'—';}
function sar(n){return n?'SAR '+(Number(n)/1e6).toFixed(2)+'M':'—';}
function badge(s){
  const map={scheduled:'blue',completed:'green',cancelled:'gray',rejected:'red',approved:'green',
    pending:'warn',draft:'gray',submitted:'blue',picked:'blue',paid:'green',
    inpatient:'purple',outpatient:'blue',emergency:'red'};
  const c=map[s]||'gray';
  return '<span class="badge '+c+'">'+s+'</span>';
}
${extraScript}
</script>
</body></html>`;

function buildDashboard() {
  return SHELL('لوحة التحكم', 'dashboard', `
<div class="topbar">
  <div>
    <div class="page-title">لوحة التحكم</div>
    <div class="page-sub" id="topbar-date">مستشفيات الحياة الوطني — Al Hayat National Hospital</div>
  </div>
  <div class="topbar-actions">
    <button class="btn btn-ghost" onclick="loadStats()">🔄 تحديث</button>
    <a href="https://bsma.elfadil.com" target="_blank" class="btn btn-primary">🎙️ بسمة</a>
  </div>
</div>

<div class="stat-grid" id="stats">
  <div class="ld">جاري التحميل...</div>
</div>

<div class="g2">
  <div class="card">
    <div style="font-weight:600;margin-bottom:14px">📅 أحدث المواعيد</div>
    <div id="recent-appts"><div class="ld"></div></div>
  </div>
  <div class="card">
    <div style="font-weight:600;margin-bottom:14px">🔁 التحويلات المعلقة</div>
    <div id="pending-handoffs"><div class="ld"></div></div>
  </div>
</div>

<div class="card" style="margin-top:16px">
  <div style="font-weight:600;margin-bottom:14px">💰 المطالبات — توزيع الحالة</div>
  <div id="claims-chart"><div class="ld"></div></div>
</div>
`, `
document.getElementById('topbar-date').textContent = new Date().toLocaleDateString('ar-SA',{weekday:'long',year:'numeric',month:'long',day:'numeric'});

async function loadStats(){
  const d = await fetch(API+'/api/stats').then(r=>r.json()).catch(()=>({}));
  const net = d.network||{};
  document.getElementById('stats').innerHTML = \`
    <div class="stat" style="--glow:rgba(78,165,255,.12);--scolor:var(--blue)">
      <span class="stat-icon">🧑‍⚕️</span>
      <div class="stat-val">\${fmt(d.patients)}</div>
      <div class="stat-lbl">مريض نشط</div>
    </div>
    <div class="stat" style="--glow:rgba(0,200,100,.1);--scolor:var(--green)">
      <span class="stat-icon">📅</span>
      <div class="stat-val">\${fmt(d.appointments)}</div>
      <div class="stat-lbl">موعد مجدول</div>
    </div>
    <div class="stat" style="--glow:rgba(167,139,250,.1);--scolor:var(--purple)">
      <span class="stat-icon">📋</span>
      <div class="stat-val">\${fmt(d.claims_total?.count)}</div>
      <div class="stat-lbl">مطالبات</div>
      <div class="stat-sub">\${sar(d.claims_total?.sar)}</div>
    </div>
    <div class="stat" style="--glow:rgba(255,80,80,.1);--scolor:var(--red)">
      <span class="stat-icon">⚠️</span>
      <div class="stat-val">\${fmt(d.rejections?.count)}</div>
      <div class="stat-lbl">مطالبات مرفوضة</div>
      <div class="stat-sub">\${sar(d.rejections?.sar)}</div>
    </div>
    <div class="stat" style="--glow:rgba(255,180,0,.1);--scolor:var(--warn)">
      <span class="stat-icon">🔁</span>
      <div class="stat-val">\${fmt(d.handoffs_pending)}</div>
      <div class="stat-lbl">تحويلات معلقة</div>
    </div>
    <div class="stat" style="--glow:rgba(0,200,100,.08);--scolor:var(--green)">
      <span class="stat-icon">📊</span>
      <div class="stat-val">\${net.network_approval_rate_pct||'98.6'}%</div>
      <div class="stat-lbl">نسبة الموافقة</div>
      <div class="stat-sub">الشبكة الكاملة</div>
    </div>
  \`;
}

async function loadRecentAppts(){
  const d = await fetch(API+'/api/appointments?limit=5').then(r=>r.json()).catch(()=>({appointments:[]}));
  const rows = (d.appointments||[]).map(a=>\`
    <tr>
      <td>\${a.full_name_ar||a.full_name_en||'—'}</td>
      <td>\${a.clinic_name||'—'}</td>
      <td style="font-family:var(--font-en)">\${a.appointment_date} \${a.appointment_time}</td>
      <td>\${badge(a.status)}</td>
    </tr>
  \`).join('');
  document.getElementById('recent-appts').innerHTML = rows
    ? '<table><thead><tr><th>المريض</th><th>القسم</th><th>الموعد</th><th>الحالة</th></tr></thead><tbody>'+rows+'</tbody></table>'
    : '<div style="color:var(--ts);font-size:.83rem;text-align:center;padding:20px">لا توجد مواعيد</div>';
}

async function loadHandoffs(){
  const d = await fetch(API+'/api/handoffs?status=pending').then(r=>r.json()).catch(()=>({handoffs:[]}));
  const rows = (d.handoffs||[]).slice(0,5).map(h=>\`
    <div style="padding:10px 0;border-bottom:1px solid var(--b);display:flex;justify-content:space-between;align-items:center">
      <div>
        <div style="font-weight:500;font-size:.88rem">\${h.patient_name||'—'}</div>
        <div style="font-size:.74rem;color:var(--ts)">\${h.department} · \${h.branch}</div>
      </div>
      <button class="btn btn-success" style="font-size:.72rem;padding:5px 10px" onclick="pickup(\${h.id},this)">استلام</button>
    </div>
  \`).join('');
  document.getElementById('pending-handoffs').innerHTML = rows||'<div style="color:var(--ts);font-size:.83rem;text-align:center;padding:20px">لا تحويلات معلقة</div>';
}

async function pickup(id,btn){
  btn.disabled=true;btn.textContent='...';
  await fetch(API+'/api/handoffs/pickup',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({id,picked_by:'crm-operator'})});
  loadHandoffs();
}

async function loadClaimsChart(){
  const d = await fetch(API+'/api/rcm').then(r=>r.json()).catch(()=>({by_status:[]}));
  const total = (d.by_status||[]).reduce((s,r)=>s+Number(r.sar),0);
  const rows = (d.by_status||[]).map(r=>{
    const pct = total>0?Math.round(Number(r.sar)/total*100):0;
    const color = r.status==='approved'?'var(--green)':r.status==='rejected'?'var(--red)':r.status==='pending'?'var(--warn)':'var(--blue)';
    return \`<div class="bar-row">
      <div class="bar-label">\${r.status}</div>
      <div class="bar-track"><div class="bar-fill" style="width:\${pct}%;background:\${color}"></div></div>
      <div class="bar-val">\${fmt(r.count)} · \${sar(r.sar)}</div>
    </div>\`;
  }).join('');
  document.getElementById('claims-chart').innerHTML = rows?'<div class="bar-chart">'+rows+'</div>':'<div class="ld"></div>';
}

loadStats();loadRecentAppts();loadHandoffs();loadClaimsChart();
`);
}

function buildPatients() {
  return SHELL('المرضى', 'patients', `
<div class="topbar">
  <div><div class="page-title">🧑‍⚕️ المرضى</div><div class="page-sub" id="ptotal"></div></div>
  <div class="topbar-actions">
    <a href="https://bsma.elfadil.com" target="_blank" class="btn btn-primary">+ مريض جديد عبر بسمة</a>
  </div>
</div>
<div class="search-bar">
  <input class="search-inp" id="search" placeholder="ابحث بالاسم · الهوية · الرقم الطبي · الجوال" oninput="debSearch()">
  <button class="btn btn-ghost" onclick="load()">🔄</button>
</div>
<div id="patients-list"><div class="ld">جاري التحميل...</div></div>
<div id="pagination" style="display:flex;gap:8px;justify-content:center;margin-top:16px"></div>
`, `
let page=1,total=0,search='',timer;
function debSearch(){clearTimeout(timer);timer=setTimeout(()=>{page=1;search=document.getElementById('search').value.trim();load();},350);}
async function load(){
  document.getElementById('patients-list').innerHTML='<div class="ld">جاري التحميل...</div>';
  const d=await fetch(API+\`/api/patients?page=\${page}&limit=20&q=\${encodeURIComponent(search)}\`).then(r=>r.json()).catch(()=>({patients:[],total:0}));
  total=d.total||0;
  document.getElementById('ptotal').textContent=fmt(total)+' مريض مسجل';
  if(!d.patients?.length){document.getElementById('patients-list').innerHTML='<div class="ld">لا نتائج</div>';return;}
  const rows=d.patients.map(p=>\`
    <tr onclick="openPt(\${p.id})" style="cursor:pointer">
      <td><div style="font-weight:500">\${p.full_name_ar||p.full_name_en||'—'}</div><div style="font-size:.72rem;color:var(--ts)">\${p.full_name_en||''}</div></td>
      <td style="font-family:var(--font-en)">\${p.mrn||'—'}</td>
      <td style="font-family:var(--font-en)">\${p.national_id||'—'}</td>
      <td style="font-family:var(--font-en)">\${p.phone||'—'}</td>
      <td>\${p.gender==='male'?'ذكر':p.gender==='female'?'أنثى':'—'}</td>
      <td>\${p.nationality||'—'}</td>
      <td>\${p.blood_type||'—'}</td>
      <td>\${badge(p.is_active?'active':'inactive')}</td>
    </tr>
  \`).join('');
  document.getElementById('patients-list').innerHTML='<div class="table-wrap"><table><thead><tr><th>الاسم</th><th>رقم الملف</th><th>الهوية</th><th>الجوال</th><th>الجنس</th><th>الجنسية</th><th>فصيلة الدم</th><th>الحالة</th></tr></thead><tbody>'+rows+'</tbody></table></div>';
  const pages=Math.ceil(total/20);
  document.getElementById('pagination').innerHTML=[...Array(Math.min(pages,10))].map((_,i)=>\`<button class="btn \${page===i+1?'btn-primary':'btn-ghost'}" onclick="page=\${i+1};load()">\${i+1}</button>\`).join('');
}
function openPt(id){window.location='/patients/'+id;}
load();
`);
}

function buildAppointments() {
  return SHELL('المواعيد', 'appointments', `
<div class="topbar">
  <div><div class="page-title">📅 المواعيد</div></div>
  <div class="topbar-actions">
    <select class="btn btn-ghost" id="status-filter" onchange="load()">
      <option value="">جميع الحالات</option>
      <option value="scheduled">مجدول</option>
      <option value="completed">مكتمل</option>
      <option value="cancelled">ملغي</option>
    </select>
    <input type="date" class="btn btn-ghost" id="date-filter" onchange="load()" style="color:var(--n);background:rgba(255,255,255,.06);border:1px solid var(--b)">
    <button class="btn btn-ghost" onclick="load()">🔄</button>
    <a href="https://bsma.elfadil.com" target="_blank" class="btn btn-primary">+ حجز جديد</a>
  </div>
</div>
<div id="appts-list"><div class="ld">جاري التحميل...</div></div>
`, `
async function load(){
  const status=document.getElementById('status-filter').value;
  const date=document.getElementById('date-filter').value;
  const d=await fetch(API+\`/api/appointments?status=\${status}&date=\${date}&limit=50\`).then(r=>r.json()).catch(()=>({appointments:[]}));
  const rows=(d.appointments||[]).map(a=>\`
    <tr>
      <td><div style="font-weight:500">\${a.full_name_ar||'مريض #'+a.patient_id}</div><div style="font-size:.72rem;color:var(--ts)">\${a.phone||''}</div></td>
      <td>\${a.clinic_name||'—'}</td>
      <td style="font-family:var(--font-en)">\${a.appointment_date}</td>
      <td style="font-family:var(--font-en)">\${a.appointment_time}</td>
      <td>\${badge(a.appointment_type||'outpatient')}</td>
      <td>\${badge(a.status)}</td>
      <td style="font-size:.75rem;color:var(--ts)">\${(a.notes||'').slice(0,40)}</td>
    </tr>
  \`).join('');
  document.getElementById('appts-list').innerHTML=rows?'<div class="table-wrap"><table><thead><tr><th>المريض</th><th>القسم</th><th>التاريخ</th><th>الوقت</th><th>النوع</th><th>الحالة</th><th>ملاحظات</th></tr></thead><tbody>'+rows+'</tbody></table></div>':'<div class="ld">لا توجد مواعيد</div>';
}
load();
`);
}

function buildClaims() {
  return SHELL('المطالبات', 'claims', `
<div class="topbar">
  <div><div class="page-title">📋 المطالبات</div></div>
  <div class="topbar-actions">
    <select class="btn btn-ghost" id="status-f" onchange="load()">
      <option value="">جميع الحالات</option>
      <option value="approved">معتمدة</option>
      <option value="rejected">مرفوضة</option>
      <option value="pending">معلقة</option>
      <option value="submitted">مقدمة</option>
      <option value="draft">مسودة</option>
    </select>
    <select class="btn btn-ghost" id="payer-f" onchange="load()">
      <option value="">جميع الجهات</option>
      <option value="BUPA Arabia">BUPA Arabia</option>
      <option value="Tawuniya">Tawuniya</option>
      <option value="GlobeMed">GlobeMed</option>
      <option value="Medgulf">Medgulf</option>
    </select>
    <button class="btn btn-ghost" onclick="load()">🔄</button>
    <a href="/rcm" class="btn btn-primary">📊 تحليل RCM</a>
  </div>
</div>
<div id="claims-list"><div class="ld">جاري التحميل...</div></div>
`, `
async function load(){
  const status=document.getElementById('status-f').value;
  const payer=document.getElementById('payer-f').value;
  const d=await fetch(API+\`/api/claims?status=\${status}&payer=\${encodeURIComponent(payer)}&limit=50\`).then(r=>r.json()).catch(()=>({claims:[]}));
  const rows=(d.claims||[]).map(c=>\`
    <tr>
      <td style="font-family:var(--font-en);font-size:.78rem">\${c.claim_number||'—'}</td>
      <td>\${c.full_name_ar||c.full_name_en||'مريض #'+c.patient_id}</td>
      <td>\${c.payer_name||'—'}</td>
      <td style="font-family:var(--font-en)">\${c.total_amount!=null?'SAR '+Number(c.total_amount).toLocaleString():'—'}</td>
      <td style="font-family:var(--font-en)">\${c.approved_amount!=null?'SAR '+Number(c.approved_amount).toLocaleString():'—'}</td>
      <td>\${badge(c.status)}</td>
      <td>\${c.rejection_code?'<span class="badge red">'+c.rejection_code+'</span>':'—'}</td>
      <td>\${c.branch||'—'}</td>
    </tr>
  \`).join('');
  document.getElementById('claims-list').innerHTML=rows?'<div class="table-wrap"><table><thead><tr><th>رقم المطالبة</th><th>المريض</th><th>الجهة الدافعة</th><th>المبلغ</th><th>المعتمد</th><th>الحالة</th><th>كود الرفض</th><th>الفرع</th></tr></thead><tbody>'+rows+'</tbody></table></div>':'<div class="ld">لا توجد مطالبات</div>';
}
load();
`);
}

function buildHandoffs() {
  return SHELL('التحويلات', 'handoffs', `
<div class="topbar">
  <div><div class="page-title">🔁 تحويلات BSMA → GIVC</div></div>
  <div class="topbar-actions">
    <select class="btn btn-ghost" id="sf" onchange="load()">
      <option value="pending">معلقة</option>
      <option value="picked">جاري المعالجة</option>
      <option value="">الكل</option>
    </select>
    <button class="btn btn-ghost" onclick="load()">🔄</button>
    <a href="https://givc.elfadil.com/handoff-board" target="_blank" class="btn btn-primary">لوحة الكانبان ↗</a>
  </div>
</div>
<div id="handoffs-list"><div class="ld">جاري التحميل...</div></div>
`, `
async function load(){
  const s=document.getElementById('sf').value;
  const d=await fetch(API+\`/api/handoffs?status=\${s}\`).then(r=>r.json()).catch(()=>({handoffs:[]}));
  const rows=(d.handoffs||[]).map(h=>\`
    <tr>
      <td><div style="font-weight:500">\${h.patient_name||'—'}</div><div style="font-size:.72rem;color:var(--ts)">\${h.patient_phone||''}</div></td>
      <td>\${h.department||'—'}</td>
      <td>\${h.branch||'—'}</td>
      <td style="font-family:var(--font-en)">\${h.date} \${h.time}</td>
      <td>\${badge(h.status)}</td>
      <td style="font-size:.75rem;color:var(--ts)">\${h.source||'—'}</td>
      <td>\${h.picked_by||'—'}</td>
      <td>\${h.status==='pending'?'<button class="btn btn-success" style="font-size:.72rem;padding:5px 10px" onclick="pickup('+h.id+',this)">استلام</button>':'—'}</td>
    </tr>
  \`).join('');
  document.getElementById('handoffs-list').innerHTML=rows?'<div class="table-wrap"><table><thead><tr><th>المريض</th><th>القسم</th><th>الفرع</th><th>الموعد</th><th>الحالة</th><th>المصدر</th><th>المستلم</th><th>إجراء</th></tr></thead><tbody>'+rows+'</tbody></table></div>':'<div class="ld">لا تحويلات</div>';
}
async function pickup(id,btn){
  btn.disabled=true;btn.textContent='...';
  await fetch(API+'/api/handoffs/pickup',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({id,picked_by:'crm-operator'})});
  load();
}
load();
`);
}

function buildRCM() {
  return SHELL('دورة الإيراد', 'rcm', `
<div class="topbar">
  <div><div class="page-title">💰 دورة الإيراد — RCM</div></div>
  <div class="topbar-actions">
    <button class="btn btn-ghost" onclick="load()">🔄</button>
    <a href="https://hnh.brainsait.org/denial" target="_blank" class="btn btn-primary">🔮 محلل الرفض AI</a>
  </div>
</div>
<div id="rcm-stats" class="stat-grid"><div class="ld">جاري التحميل...</div></div>
<div class="g2" style="margin-top:16px">
  <div class="card">
    <div style="font-weight:600;margin-bottom:14px">توزيع المطالبات حسب الجهة الدافعة</div>
    <div id="payer-chart"><div class="ld"></div></div>
  </div>
  <div class="card">
    <div style="font-weight:600;margin-bottom:14px">أكواد الرفض الأعلى تكلفة</div>
    <div id="code-chart"><div class="ld"></div></div>
  </div>
</div>
<div class="card" style="margin-top:16px">
  <div style="font-weight:600;margin-bottom:14px">حالة المطالبات</div>
  <div id="status-chart"><div class="ld"></div></div>
</div>
`, `
async function load(){
  const d=await fetch(API+'/api/rcm').then(r=>r.json()).catch(()=>({}));
  const t=d.totals||{};
  const approvalPct=t.total>0?Math.round(t.approved/t.total*100*10)/10:0;
  const rejections=(d.by_status||[]).find(s=>s.status==='rejected')||{count:0,sar:0};
  document.getElementById('rcm-stats').innerHTML=\`
    <div class="stat" style="--scolor:var(--blue)"><span class="stat-icon">📋</span><div class="stat-val">\${fmt(t.count)}</div><div class="stat-lbl">إجمالي المطالبات</div></div>
    <div class="stat" style="--scolor:var(--green)"><span class="stat-icon">✅</span><div class="stat-val">\${approvalPct}%</div><div class="stat-lbl">نسبة الموافقة</div><div class="stat-sub">\${sar(t.approved)}</div></div>
    <div class="stat" style="--scolor:var(--red)"><span class="stat-icon">❌</span><div class="stat-val">\${fmt(rejections.count)}</div><div class="stat-lbl">مرفوضة</div><div class="stat-sub">\${sar(rejections.sar)}</div></div>
    <div class="stat" style="--scolor:var(--warn)"><span class="stat-icon">💸</span><div class="stat-val">\${sar(t.total)}</div><div class="stat-lbl">إجمالي المُقدَّم</div></div>
  \`;
  // Payer chart
  const maxPayer=Math.max(...(d.by_payer||[]).map(p=>Number(p.sar)));
  document.getElementById('payer-chart').innerHTML='<div class="bar-chart">'+
    (d.by_payer||[]).slice(0,6).map(p=>\`
      <div class="bar-row">
        <div class="bar-label">\${p.payer_name}</div>
        <div class="bar-track"><div class="bar-fill" style="width:\${maxPayer>0?Math.round(p.sar/maxPayer*100):0}%;background:var(--blue)"></div></div>
        <div class="bar-val">\${fmt(p.count)} · \${sar(p.sar)}</div>
      </div>\`).join('')+'</div>';
  // Rejection codes
  const maxCode=Math.max(...(d.by_rejection_code||[]).map(c=>Number(c.sar)));
  const codeColors={
    'MN-1-1':'var(--red)','BE-1-6':'var(--warn)','BE-1-5':'var(--warn)',
    'AD-3-1':'var(--blue)','CV-1-4':'var(--purple)'
  };
  document.getElementById('code-chart').innerHTML=(d.by_rejection_code||[]).length?
    '<div class="bar-chart">'+
    (d.by_rejection_code||[]).slice(0,8).map(c=>\`
      <div class="bar-row">
        <div class="bar-label" style="font-family:var(--font-en)">\${c.rejection_code}</div>
        <div class="bar-track"><div class="bar-fill" style="width:\${maxCode>0?Math.round(c.sar/maxCode*100):0}%;background:\${codeColors[c.rejection_code]||'var(--red)'}"></div></div>
        <div class="bar-val">\${fmt(c.count)} · \${sar(c.sar)}</div>
      </div>\`).join('')+'</div>'
    :'<div style="color:var(--ts);font-size:.83rem;text-align:center;padding:20px">لا رفضات مسجلة</div>';
  // Status bars
  const maxSt=Math.max(...(d.by_status||[]).map(s=>Number(s.sar)));
  document.getElementById('status-chart').innerHTML='<div class="bar-chart">'+
    (d.by_status||[]).map(s=>{
      const c=s.status==='approved'?'var(--green)':s.status==='rejected'?'var(--red)':s.status==='pending'?'var(--warn)':'var(--blue)';
      return \`<div class="bar-row"><div class="bar-label">\${s.status}</div>
        <div class="bar-track"><div class="bar-fill" style="width:\${maxSt>0?Math.round(s.sar/maxSt*100):0}%;background:\${c}"></div></div>
        <div class="bar-val">\${fmt(s.count)} · \${sar(s.sar)}</div></div>\`;
    }).join('')+'</div>';
}
load();
`);
}
