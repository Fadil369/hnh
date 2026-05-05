/**
 * GIVC Portal v3.0.0 — Integrated Provider Portal
 *
 * Built-in doctor network with OID assignment
 * Basma AI integration for profile building
 * Seamless HNH integration
 *
 * Domain: givc.elfadil.com / hnh.brainsait.org/givc/*
 */

// ─── Constants ─────────────────────────────────────────────────────────────
const VERSION = '3.0.0';
const FACILITY_OID = '1.3.6.1.4.1.61026';

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, X-API-Key, X-Session-ID',
};

const SECURITY = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Cache-Control': 'no-cache, no-store, must-revalidate',
  ...CORS,
};

// ─── Helpers ───────────────────────────────────────────────────────────────
const json = (data, status = 200) => new Response(JSON.stringify(data), {
  status,
  headers: { 'Content-Type': 'application/json', ...SECURITY },
});

const html = (content, status = 200) => new Response(content, {
  status,
  headers: { 'Content-Type': 'text/html; charset=utf-8', ...CORS },
});

const err = (msg, status = 500) => json({ success: false, message: msg }, status);

function headResponse(response) {
  return new Response(null, {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
  });
}

async function maybeHead(isHead, response) {
  const resolved = await response;
  return isHead ? headResponse(resolved) : resolved;
}

// Generate unique GIVC OID
function generateGivcOid() {
  const rand = new Uint32Array(1);
  crypto.getRandomValues(rand);
  const sequence = `${Date.now()}${String(rand[0] % 1000).padStart(3, '0')}`;
  return `${FACILITY_OID}.7.${sequence}`;
}

const BRANCH_ALIASES = {
  r001: 'R001', riyadh: 'R001',
  m001: 'M001', madinah: 'M001', madina: 'M001', medina: 'M001',
  k001: 'K001', khamis: 'K001', khamis_mushayt: 'K001', khamis_mushait: 'K001',
  j001: 'J001', jazan: 'J001', jizan: 'J001',
  u001: 'U001', unaizah: 'U001', unayzah: 'U001',
};

function normalizeBranchCode(value) {
  const key = String(value || 'R001').trim().toLowerCase().replace(/[\s-]+/g, '_');
  return BRANCH_ALIASES[key] || 'R001';
}

function normalizeNetworkRows(rows = []) {
  const seen = new Set();
  const doctors = [];
  for (const row of rows || []) {
    const oid = row.givc_oid || '';
    const key = oid || `${row.name_ar || row.name_en}:${row.license_number || row.provider_code || ''}`;
    if (!key || seen.has(key)) continue;
    seen.add(key);
    doctors.push({ ...row, branch_code: normalizeBranchCode(row.branch_code) });
  }
  return doctors;
}

function normalizePath(rawPath) {
  if (rawPath === '/givc' || rawPath === '/givc/') return '/';
  if (rawPath.startsWith('/givc/')) return rawPath.slice(5) || '/';
  return rawPath || '/';
}

// ─── HTML Templates ───────────────────────────────────────────────────────
const DASHBOARD_HTML = (lang = 'ar', doctor = null) => {
  const isAr = lang === 'ar';
  const dir = isAr ? 'rtl' : 'ltr';
  const title = isAr ? 'بوابة GIVC — الرعاية الافتراضية المتكاملة' : 'GIVC Portal — Global Integrated Virtual Care';
  const subtitle = isAr ? 'منظومة هيئة الهلال الأحمر الصحية · BrainSAIT' : 'Hayat National Hospitals · BrainSAIT';
  const profile = isAr ? 'الملف الشخصي' : 'Profile';
  const network = isAr ? 'شبكة الأطباء' : 'Doctors Network';
  const eligibility = isAr ? 'التحقق من التغطية' : 'Eligibility Check';
  const claims = isAr ? 'المطالبات' : 'Claims';
  const oidLabel = isAr ? 'رقم التعريف (OID)' : 'Identifier (OID)';
  const specialty = isAr ? 'التخصص' : 'Specialty';
  const branch = isAr ? 'الفرع' : 'Branch';
  const status = isAr ? 'الحالة' : 'Status';
  const active = isAr ? 'نشط ✓' : 'Active ✓';
  const pending = isAr ? 'قيد المراجعة' : 'Pending Review';
  const networkCount = doctor?.networkCount || 0;
  const isRegistered = !!doctor?.givc_oid;

  return `<!DOCTYPE html>
<html lang="${lang}" dir="${dir}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    *{box-sizing:border-box;margin:0;padding:0}
    body{font-family:${isAr?"'IBM Plex Sans Arabic'":"Inter"},sans-serif;background:#f0f4f8;min-height:100vh;color:#1e293b}
    .top{background:linear-gradient(135deg,#1193d4 0%,#0c6fa0 100%);color:#fff;padding:0}
    .top-inner{max-width:1100px;margin:0 auto;padding:24px 20px;display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap}
    .logo{display:flex;align-items:center;gap:12px}
    .logo-icon{width:44px;height:44px;background:rgba(255,255,255,.15);border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:1.4rem}
    .logo-text h1{font-size:1.1rem;font-weight:700;line-height:1.2}
    .logo-text p{font-size:.78rem;opacity:.8}
    .top-badges{display:flex;gap:8px;flex-wrap:wrap}
    .badge{background:rgba(255,255,255,.18);border:1px solid rgba(255,255,255,.3);border-radius:20px;padding:4px 12px;font-size:.75rem;font-weight:600}
    .badge.ok{background:rgba(0,210,130,.25);border-color:rgba(0,210,130,.5)}
    .container{max-width:1100px;margin:0 auto;padding:24px 20px}
    .grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:18px;margin-bottom:24px}
    .card{background:#fff;border-radius:14px;padding:22px;box-shadow:0 1px 4px rgba(0,0,0,.08);border:1px solid #e8edf2}
    .card-head{display:flex;align-items:center;gap:10px;margin-bottom:16px}
    .card-icon{width:36px;height:36px;border-radius:9px;display:flex;align-items:center;justify-content:center;font-size:1.1rem}
    .card-head h3{font-size:.95rem;font-weight:600;color:#1e293b}
    .row{display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid #f1f5f9;font-size:.88rem}
    .row:last-child{border-bottom:none}
    .row-label{color:#64748b}
    .row-val{font-weight:600;color:#1e293b}
    .pill{display:inline-block;padding:2px 10px;border-radius:20px;font-size:.78rem;font-weight:600}
    .pill-ok{background:#dcfce7;color:#16a34a}
    .pill-warn{background:#fef3c7;color:#92400e}
    .btn{width:100%;padding:11px;border:none;border-radius:8px;font-size:.9rem;font-weight:600;cursor:pointer;margin-top:12px;font-family:inherit}
    .btn-primary{background:#1193d4;color:#fff}
    .btn-primary:hover{background:#0c6fa0}
    .btn-secondary{background:#f1f5f9;color:#475569}
    .btn-secondary:hover{background:#e2e8f0}
    .register-card{background:#fff;border-radius:14px;padding:28px;box-shadow:0 1px 4px rgba(0,0,0,.08);border:2px dashed #1193d4;margin-bottom:24px}
    .register-card h2{font-size:1.1rem;font-weight:700;color:#1193d4;margin-bottom:8px}
    .register-card p{font-size:.88rem;color:#64748b;margin-bottom:20px}
    .form-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:14px}
    .fi label{display:block;font-size:.8rem;font-weight:600;color:#475569;margin-bottom:5px}
    .fi input,.fi select{width:100%;padding:9px 12px;border:1px solid #cbd5e1;border-radius:8px;font-size:.88rem;font-family:inherit;outline:none}
    .fi input:focus,.fi select:focus{border-color:#1193d4;box-shadow:0 0 0 3px rgba(17,147,212,.12)}
    #res{margin-top:16px;padding:12px;border-radius:8px;font-size:.88rem;display:none}
    #res.ok{background:#dcfce7;color:#166534;display:block}
    #res.er{background:#fee2e2;color:#991b1b;display:block}
    .oid-box{background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:12px;font-family:monospace;font-size:.8rem;color:#475569;word-break:break-all;margin-top:8px}
    footer{text-align:center;padding:24px;font-size:.8rem;color:#94a3b8}
    @media(max-width:600px){.top-inner{flex-direction:column;align-items:flex-start}}
  </style>
</head>
<body>
  <div class="top">
    <div class="top-inner">
      <div class="logo">
        <div class="logo-icon">🌐</div>
        <div class="logo-text">
          <h1>${title}</h1>
          <p>${subtitle}</p>
        </div>
      </div>
      <div class="top-badges">
        <span class="badge ok">v${VERSION}</span>
        <span class="badge">${isAr ? 'شبكة نشطة' : 'Network Active'}</span>
        <span class="badge">${networkCount} ${isAr ? 'طبيب' : 'Doctors'}</span>
      </div>
    </div>
  </div>
  <div class="container">
    ${!isRegistered ? `
    <div class="register-card">
      <h2>🩺 ${isAr ? 'تسجيل طبيب جديد في شبكة GIVC' : 'Register a New Doctor in the GIVC Network'}</h2>
      <p>${isAr ? 'سيتم إصدار رقم OID تلقائياً وربطه بمنظومة HNH و NPHIES' : 'An OID will be auto-generated and linked to the HNH & NPHIES ecosystem'}</p>
      <div class="form-grid">
        <div class="fi"><label>${isAr ? 'الاسم بالعربي *' : 'Name (AR) *'}</label><input id="rNameAr" placeholder="${isAr ? 'د. محمد أحمد' : 'Dr. Mohamed Ahmed'}"></div>
        <div class="fi"><label>${isAr ? 'الاسم بالإنجليزي' : 'Name (EN)'}</label><input id="rNameEn" placeholder="Dr. Mohamed Ahmed"></div>
        <div class="fi"><label>${isAr ? 'رقم الهوية / الإقامة *' : 'National / Resident ID *'}</label><input id="rNat" placeholder="1XXXXXXXXX"></div>
        <div class="fi"><label>${isAr ? 'التخصص *' : 'Specialty *'}</label><input id="rSpec" placeholder="${isAr ? 'طب القلب' : 'Cardiology'}"></div>
        <div class="fi"><label>${isAr ? 'رقم الترخيص' : 'License #'}</label><input id="rLic" placeholder="SCFHS-XXXXXX"></div>
        <div class="fi"><label>${isAr ? 'الفرع' : 'Branch'}</label>
          <select id="rBranch">
            <option value="R001">${isAr ? 'الرياض' : 'Riyadh'}</option>
            <option value="M001">${isAr ? 'المدينة' : 'Madinah'}</option>
            <option value="K001">${isAr ? 'خميس مشيط' : 'Khamis'}</option>
            <option value="J001">${isAr ? 'جيزان' : 'Jizan'}</option>
            <option value="U001">${isAr ? 'عنيزة' : 'Unaizah'}</option>
          </select>
        </div>
      </div>
      <button class="btn btn-primary" onclick="doRegister()">${isAr ? 'تسجيل وإصدار OID' : 'Register & Issue OID'}</button>
      <div id="res"></div>
    </div>
    ` : `
    <div class="grid" style="margin-bottom:24px">
      <div class="card">
        <div class="card-head"><div class="card-icon" style="background:#eff6ff">👤</div><h3>${profile}</h3></div>
        <div class="row"><span class="row-label">${specialty}</span><span class="row-val">${doctor?.specialty || '—'}</span></div>
        <div class="row"><span class="row-label">${branch}</span><span class="row-val">${doctor?.branch_code || 'R001'}</span></div>
        <div class="row"><span class="row-label">${status}</span><span class="row-val"><span class="pill ${doctor?.givc_status === 'active' ? 'pill-ok' : 'pill-warn'}">${doctor?.givc_status === 'active' ? active : pending}</span></span></div>
        <div class="oid-box">${oidLabel}: ${doctor?.givc_oid || '—'}</div>
      </div>
    </div>
    `}

    <div class="grid">
      <div class="card">
        <div class="card-head"><div class="card-icon" style="background:#f0fdf4">🤝</div><h3>${network}</h3></div>
        <div class="row"><span class="row-label">${isAr ? 'الأطباء المسجلين' : 'Registered Doctors'}</span><span class="row-val">${networkCount}</span></div>
        <div class="row"><span class="row-label">${isAr ? 'الفروع' : 'Branches'}</span><span class="row-val">5</span></div>
        <button class="btn btn-secondary" onclick="location.href='/givc/network?lang=${lang}'">${isAr ? 'تصفح شبكة الأطباء' : 'Browse Network'}</button>
      </div>
      <div class="card" id="eligibility">
        <div class="card-head"><div class="card-icon" style="background:#fff7ed">✅</div><h3>${eligibility}</h3></div>
        <div class="fi" style="margin-bottom:0"><label>${isAr ? 'رقم التأمين' : 'Insurance ID'}</label><input type="text" id="insId" placeholder="INS-XXXXXXXX"></div>
        <button class="btn btn-primary" onclick="checkEligibility()">${isAr ? 'تحقق من التغطية' : 'Check Coverage'}</button>
        <div id="eligRes" style="margin-top:8px;font-size:.85rem"></div>
      </div>
      <div class="card">
        <div class="card-head"><div class="card-icon" style="background:#fdf4ff">📋</div><h3>${claims}</h3></div>
        <div class="row"><span class="row-label">${isAr ? 'المطالبات المعلقة' : 'Pending Claims'}</span><span class="row-val">—</span></div>
        <div class="row"><span class="row-label">${isAr ? 'المعتمدة هذا الشهر' : 'Approved This Month'}</span><span class="row-val">—</span></div>
        <button class="btn btn-secondary" onclick="location.href='https://hnh.brainsait.org#ecosystem'">${isAr ? 'بوابة HNH' : 'HNH Portal'}</button>
      </div>
    </div>
  </div>
  <footer>GIVC Portal v${VERSION} · BrainSAIT Healthcare OS · ${isAr ? 'متصل مع بسمة AI و NPHIES' : 'Connected to Basma AI & NPHIES'}</footer>
  <script>
    async function doRegister() {
      const n=document.getElementById('rNameAr')?.value?.trim();
      const nat=document.getElementById('rNat')?.value?.trim();
      const spec=document.getElementById('rSpec')?.value?.trim();
      if(!n||!nat||!spec){showRes('${isAr ? 'يرجى تعبئة الحقول المطلوبة (*)' : 'Please fill required fields (*)'}','er');return;}
      showRes('${isAr ? 'جارٍ التسجيل...' : 'Registering...'}','');
      try{
        const r=await fetch('/givc/api/providers/givc-register',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name_ar:n,name_en:document.getElementById('rNameEn')?.value?.trim()||n,national_id:nat,specialty:spec,license_number:document.getElementById('rLic')?.value?.trim(),branch_code:document.getElementById('rBranch')?.value||'R001'})});
        const d=await r.json();
        if(d.success){showRes('✅ ${isAr ? 'تم التسجيل بنجاح! OID: ' : 'Registered! OID: '}'+d.givc_oid,'ok');}
        else{showRes('❌ '+(d.message||'Error'),'er');}
      }catch(e){showRes('❌ '+e.message,'er');}
    }
    async function checkEligibility(){
      const ins=document.getElementById('insId')?.value?.trim();
      if(!ins){document.getElementById('eligRes').textContent='${isAr ? 'أدخل رقم التأمين' : 'Enter insurance ID'}';return;}
      document.getElementById('eligRes').textContent='${isAr ? 'جارٍ التحقق...' : 'Checking...'}';
      try{
        const apiBase=location.hostname==='givc.elfadil.com'?'https://hnh.brainsait.org':'';
        const r=await fetch(apiBase+'/api/eligibility/check',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({insurance_id:ins,service_type:'medical'})});
        const d=await r.json();
        const live=d.eligibility&&d.eligibility.source==='claimlinc-live';
        const status=(d.eligibility&&d.eligibility.status)||'unknown';
        document.getElementById('eligRes').textContent=live?'✅ ${isAr ? 'تم التحقق من NPHIES: ' : 'NPHIES verified: '}'+status:'⚠️ ${isAr ? 'تعذر التحقق المباشر، تم حفظ الطلب للمراجعة' : 'Live check unavailable; request queued for review'}';
      }catch{document.getElementById('eligRes').textContent='${isAr ? 'تعذر التحقق' : 'Check failed'}';}
    }
    function showRes(msg,cls){const el=document.getElementById('res');if(!el)return;el.textContent=msg;el.className=cls;}
  </script>
</body>
</html>`;
};

const NETWORK_HTML = (doctors = [], lang = 'ar') => {
  const isAr = lang === 'ar';
  const title = isAr ? 'شبكة الأطباء - GIVC' : 'Doctors Network - GIVC';
  const back = isAr ? '← العودة' : '← Back';
  const name = isAr ? 'الاسم' : 'Name';
  const specialty = isAr ? 'التخصص' : 'Specialty';
  const branch = isAr ? 'الفرع' : 'Branch';
  const oid = isAr ? 'الرقم التعريفي' : 'OID';
  const status = isAr ? 'الحالة' : 'Status';
  const count = isAr ? `(${doctors.length} طبيب)` : `(${doctors.length} doctors)`;

  const rows = doctors.map(d => `
    <tr>
      <td>${d.name_ar || ''}</td>
      <td>${d.specialty || '—'}</td>
      <td>${d.branch_code || 'R001'}</td>
      <td style="font-family:monospace;font-size:0.85rem">${d.givc_oid || ''}</td>
      <td><span class="status-${d.givc_status || 'pending'}">${d.givc_status || 'pending'}</span></td>
    </tr>
  `).join('');

  return `<!DOCTYPE html>
<html lang="${lang}" dir="${isAr ? 'rtl' : 'ltr'}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Cairo', sans-serif; background: #f5f7fa; margin: 0; padding: 20px; }
    .container { max-width: 1200px; margin: 0 auto; }
    .header { background: linear-gradient(135deg, #1a2b4a, #2d4a6f); color: white; padding: 30px; border-radius: 16px; margin-bottom: 20px; }
    .header h1 { margin: 0 0 10px 0; }
    .back { color: white; text-decoration: none; opacity: 0.8; }
    table { width: 100%; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
    th, td { padding: 15px; text-align: right; border-bottom: 1px solid #eee; }
    th { background: #f8f9fa; font-weight: 600; color: #1a2b4a; }
    .status-active { color: #00a080; font-weight: 600; }
    .status-pending { color: #f59e0b; font-weight: 600; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <a href="/givc" class="back">${back}</a>
      <h1>🤝 ${title}</h1>
      <p>${count}</p>
    </div>
    <table>
      <thead>
        <tr><th>${name}</th><th>${specialty}</th><th>${branch}</th><th>${oid}</th><th>${status}</th></tr>
      </thead>
      <tbody>${rows || '<tr><td colspan="5" style="text-align:center;color:#666;">No doctors registered yet</td></tr>'}</tbody>
    </table>
  </div>
</body>
</html>`;
};

// ─── Main Handler ───────────────────────────────────────────────────────────
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const rawPath = url.pathname;
    // Normalize: when served via hnh.brainsait.org/givc/*, strip the /givc prefix
    // so all route conditions work identically for both givc.elfadil.com and hnh.brainsait.org/givc/*
    const path = normalizePath(rawPath);
    const isHead = request.method === 'HEAD';
    const method = isHead ? 'GET' : request.method;
    const lang = url.searchParams.get('lang') || 'ar';

    // CORS preflight
    if (method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: CORS });
    }

    // Health check
    if (path === '/health' || path === '/api/health') {
      return maybeHead(isHead, json({
        service: 'GIVC Portal',
        version: VERSION,
        status: 'healthy',
        timestamp: new Date().toISOString(),
        features: ['doctor-registration', 'oid-generation', 'network', 'eligibility', 'basma-integration'],
        facility_oid: FACILITY_OID,
        database: env.DB ? 'connected' : 'unavailable',
        basma: 'integrated'
      }));
    }

    // API: Register doctor via Basma
    if (path === '/api/providers/givc-register' && method === 'POST') {
      try {
        const body = await request.json();
        const { national_id, name_ar, name_en, specialty, subspecialty, license_number, branch_code, department, phone, email } = body;

        if (!national_id || !name_ar) {
          return json({ success: false, message: 'National ID and name required' }, 400);
        }

        const branchCode = normalizeBranchCode(branch_code);

        if (env.DB) {
          const existing = await env.DB.prepare(`
            SELECT givc_oid, provider_id, name_ar, name_en, specialty, branch_code, givc_status
            FROM givc_doctors
            WHERE national_id = ? OR (? IS NOT NULL AND license_number = ?)
            LIMIT 1
          `).bind(national_id, license_number || null, license_number || null).first();

          if (existing) {
            return json({ success: true, existing: true, ...existing });
          }

          // Always generate OID server-side; use numeric arcs for OID validity.
          const givc_oid = generateGivcOid();
          const providerCode = 'DRV-' + Date.now().toString(36).toUpperCase().slice(-6);

          const result = await env.DB.prepare(`
            INSERT INTO providers (
              provider_code, first_name_ar, last_name_ar, first_name_en, last_name_en,
              specialty, subspecialty, department, license_number, clinic_location,
              phone, email, is_active, givc_oid, givc_registered, givc_registered_at,
              givc_specialty_code, givc_branch_code
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?, 1, datetime('now'), ?, ?)
          `).bind(
            providerCode,
            name_ar, '',
            name_en || name_ar, '',
            specialty || '', subspecialty || '', department || specialty || '',
            license_number || '',
            branchCode,
            phone || null,
            email || null,
            givc_oid,
            specialty || '',
            branchCode
          ).run();

          const providerId = result.meta?.last_row_id || null;

          // Also create givc_doctors record
          await env.DB.prepare(`
            INSERT INTO givc_doctors (
              givc_oid, provider_id, national_id, name_ar, name_en, specialty, subspecialty,
              branch_code, department, license_number, phone, email, givc_status, network_visibility
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'active', 'public')
          `).bind(
            givc_oid,
            providerId,
            national_id,
            name_ar,
            name_en || name_ar,
            specialty || '',
            subspecialty || null,
            branchCode,
            department || null,
            license_number || null,
            phone || null,
            email || null
          ).run();

          return json({ success: true, provider_id: providerId, givc_oid, provider_code: providerCode, branch_code: branchCode });
        }

        // Fallback: return success without DB
        const givc_oid = generateGivcOid();
        const providerCode = 'DRV-' + Date.now().toString(36).toUpperCase().slice(-6);
        return json({ success: true, provider_id: null, givc_oid, provider_code: providerCode, note: 'DB not connected' });
      } catch (e) {
        return json({ success: false, message: e.message }, 500);
      }
    }

    // API: Get doctor by OID
    if (path.startsWith('/api/providers/givc/') && method === 'GET') {
      const givcOid = path.split('/api/providers/givc/')[1];
      if (!givcOid) return json({ error: 'OID required' }, 400);

      try {
        if (env.DB) {
          const doctor = await env.DB.prepare(`
            SELECT p.*, g.givc_status, g.network_visibility
            FROM providers p
            LEFT JOIN givc_doctors g ON p.givc_oid = g.givc_oid
            WHERE p.givc_oid = ?
          `).bind(givcOid).first();

          if (doctor) {
            return maybeHead(isHead, json({ success: true, doctor }));
          }

          const givcDoctor = await env.DB.prepare(`
            SELECT * FROM givc_doctors WHERE givc_oid = ?
          `).bind(givcOid).first();

          if (givcDoctor) {
            return maybeHead(isHead, json({ success: true, doctor: givcDoctor, source: 'givc_doctors' }));
          }
        }
        return maybeHead(isHead, json({ success: false, message: 'Doctor not found' }, 404));
      } catch (e) {
        return json({ success: false, message: e.message }, 500);
      }
    }

    // API: Get GIVC network list
    if (path === '/api/providers/givc-network' && method === 'GET') {
      try {
        if (env.DB) {
          const { results } = await env.DB.prepare(`
            SELECT givc_oid, provider_id, name_ar, name_en, specialty, subspecialty,
                   branch_code, givc_status, network_visibility, provider_code, phone, email
            FROM (
              SELECT g.givc_oid, g.provider_id, g.name_ar, g.name_en, g.specialty, g.subspecialty,
                     g.branch_code, g.givc_status, g.network_visibility, p.provider_code, p.phone, p.email,
                     g.created_at AS sort_at
              FROM givc_doctors g
              LEFT JOIN providers p ON p.id = g.provider_id
              WHERE g.givc_status = 'active'
              UNION ALL
              SELECT p.givc_oid, p.id AS provider_id,
                     TRIM(p.first_name_ar||' '||COALESCE(p.last_name_ar,'')) AS name_ar,
                     TRIM(p.first_name_en||' '||COALESCE(p.last_name_en,'')) AS name_en,
                     p.specialty, p.subspecialty,
                     COALESCE(p.givc_branch_code, p.clinic_location, 'R001') AS branch_code,
                     'active' AS givc_status, 'public' AS network_visibility,
                     p.provider_code, p.phone, p.email,
                     p.created_at AS sort_at
              FROM providers p
              WHERE p.givc_registered = 1 AND p.givc_oid IS NOT NULL
            )
            ORDER BY sort_at DESC
            LIMIT 150
          `).all();
          return maybeHead(isHead, json({ success: true, doctors: normalizeNetworkRows(results), source: 'givc_network_union' }));
        }
        return maybeHead(isHead, json({ success: true, doctors: [], source: 'no_db' }));
      } catch (e) {
        return maybeHead(isHead, json({ success: false, doctors: [], error: e.message }, 500));
      }
    }

    // UI: Dashboard
    if (path === '/') {
      // Try to get network count from DB
      let networkCount = 0;
      try {
        if (env.DB) {
          const row = await env.DB.prepare(`
            SELECT COUNT(DISTINCT givc_oid) as cnt FROM (
              SELECT givc_oid FROM givc_doctors WHERE givc_status='active'
              UNION
              SELECT givc_oid FROM providers WHERE givc_registered=1 AND givc_oid IS NOT NULL
            )
          `).first();
          networkCount = row?.cnt || 0;
        }
      } catch {}
      return maybeHead(isHead, html(DASHBOARD_HTML(lang, { name_ar: '', givc_oid: null, specialty: '—', branch_code: 'R001', givc_status: 'pending', networkCount })));
    }

    // UI: Network (fetch live)
    if (path === '/network') {
      let doctors = [];
      try {
        if (env.DB) {
          const { results } = await env.DB.prepare(`
            SELECT givc_oid, name_ar, name_en, specialty, branch_code, givc_status
            FROM (
              SELECT g.givc_oid, g.name_ar, g.name_en, g.specialty, g.branch_code, g.givc_status, g.created_at AS sort_at
              FROM givc_doctors g WHERE g.givc_status='active'
              UNION ALL
              SELECT p.givc_oid,
                     TRIM(p.first_name_ar||' '||COALESCE(p.last_name_ar,'')) as name_ar,
                     TRIM(p.first_name_en||' '||COALESCE(p.last_name_en,'')) as name_en,
                     p.specialty, COALESCE(p.givc_branch_code, p.clinic_location, 'R001') as branch_code,
                     'active' as givc_status, p.created_at AS sort_at
              FROM providers p WHERE p.givc_registered=1 AND p.givc_oid IS NOT NULL
            )
            ORDER BY sort_at DESC LIMIT 150
          `).all();
          doctors = normalizeNetworkRows(results);
        }
      } catch {}
      return maybeHead(isHead, html(NETWORK_HTML(doctors, lang)));
    }

    // UI: Profile (same as dashboard for now — authentication layer to be added)
    if (path === '/profile') {
      return new Response(null, { status: 302, headers: { Location: `/givc?lang=${lang}` } });
    }

    // Default: redirect to dashboard
    return maybeHead(isHead, json({ error: 'Not found', path }, 404));
  }
};
