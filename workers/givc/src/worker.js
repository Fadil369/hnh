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

// ─── Design System ────────────────────────────────────────────────────────
function pageHead(title, lang, isAr) {
  const dir = isAr ? 'rtl' : 'ltr';
  const fontStack = isAr
    ? "'IBM Plex Sans Arabic', Inter, sans-serif"
    : "Inter, 'IBM Plex Sans Arabic', sans-serif";
  return `<!DOCTYPE html>
<html lang="${lang}" dir="${dir}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet">
  <script src="https://cdn.tailwindcss.com"><\/script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            primary: '#1193d4',
            'primary-dark': '#0c6fa0',
            'bg-base': '#f6f7f8',
            'surface': '#ffffff',
            'border-base': '#f0f3f4',
          }
        }
      }
    };
  <\/script>
  <style>
    * { box-sizing: border-box; }
    body { font-family: ${fontStack}; background: #f6f7f8; }
    .mso {
      font-family: 'Material Symbols Outlined';
      font-weight: normal; font-style: normal;
      font-size: 24px; line-height: 1;
      display: inline-block;
      text-transform: none; letter-spacing: normal;
      white-space: nowrap; direction: ltr;
      font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
    }
    .mso-f { font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
    .pill { display: inline-flex; align-items: center; padding: 2px 10px; border-radius: 20px; font-size: 0.72rem; font-weight: 600; }
    .pill-ok  { background: #dcfce7; color: #16a34a; }
    .pill-warn{ background: #fef3c7; color: #92400e; }
    .pill-err { background: #fee2e2; color: #991b1b; }
    .pill-blue{ background: #dbeafe; color: #1d4ed8; }
    a { text-decoration: none; }
    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 2px; }
  </style>
</head>
<body class="min-h-screen flex flex-col">
  <div class="flex-1 pb-20">`;
}

function pageFooter(active, base, lang) {
  const isAr = lang === 'ar';
  const tabs = [
    { key: 'dashboard',    icon: 'home',          arLabel: 'الرئيسية', enLabel: 'Home',      href: `${base}/` },
    { key: 'patients',     icon: 'person',         arLabel: 'المرضى',  enLabel: 'Patients',  href: `${base}/patients?lang=${lang}` },
    { key: 'appointments', icon: 'calendar_today', arLabel: 'المواعيد',enLabel: 'Schedule',  href: `${base}/appointments?lang=${lang}` },
    { key: 'nphies',       icon: 'receipt_long',   arLabel: 'مطالبات', enLabel: 'NPHIES',    href: `${base}/nphies?lang=${lang}` },
  ];
  const tabsHtml = tabs.map(t => {
    const isActive = t.key === active;
    const label = isAr ? t.arLabel : t.enLabel;
    return `<a href="${t.href}" class="flex flex-col items-center gap-0.5 flex-1 py-2 ${isActive ? 'text-[#1193d4]' : 'text-gray-400'} hover:text-[#1193d4] transition-colors">
      <span class="mso ${isActive ? 'mso-f' : ''} text-[22px]">${t.icon}</span>
      <span class="text-[10px] font-semibold">${label}</span>
    </a>`;
  }).join('');
  return `  </div>
  <nav class="fixed bottom-0 left-0 right-0 bg-white border-t border-[#f0f3f4] flex items-center z-50" style="padding-bottom:env(safe-area-inset-bottom)">
    ${tabsHtml}
  </nav>
</body>
</html>`;
}

// ─── HTML Templates ───────────────────────────────────────────────────────

// Dashboard
const DASHBOARD_HTML = (lang = 'ar', stats = {}, base = '') => {
  const isAr = lang === 'ar';
  const { networkCount = 0, todayCount = 0, pendingClaims = 0 } = stats;
  const title = isAr ? 'بوابة GIVC' : 'GIVC Portal';

  return pageHead(title, lang, isAr) + `
    <!-- Blue header -->
    <div class="bg-gradient-to-br from-[#1193d4] to-[#0c6fa0] text-white px-4 pt-6 pb-10">
      <div class="flex items-center gap-3 mb-1">
        <div class="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-xl flex-shrink-0">🌐</div>
        <div>
          <h1 class="text-base font-bold leading-tight">${isAr ? 'الرعاية الافتراضية المتكاملة' : 'Global Integrated Virtual Care'}</h1>
          <p class="text-xs text-white/70">Hayat National Hospitals · BrainSAIT · v${VERSION}</p>
        </div>
      </div>
      <!-- Stats row -->
      <div class="grid grid-cols-3 gap-2 mt-5">
        <div class="bg-white/15 rounded-xl p-3 text-center">
          <div class="text-2xl font-bold">${networkCount}</div>
          <div class="text-[11px] text-white/75">${isAr ? 'الأطباء' : 'Doctors'}</div>
        </div>
        <div class="bg-white/15 rounded-xl p-3 text-center">
          <div class="text-2xl font-bold">${todayCount}</div>
          <div class="text-[11px] text-white/75">${isAr ? 'مواعيد اليوم' : "Today's Appts"}</div>
        </div>
        <div class="bg-white/15 rounded-xl p-3 text-center">
          <div class="text-2xl font-bold">${pendingClaims}</div>
          <div class="text-[11px] text-white/75">${isAr ? 'مطالبات معلقة' : 'Pending Claims'}</div>
        </div>
      </div>
    </div>

    <!-- Content lifted up -->
    <div class="-mt-5 px-4 space-y-4">
      <!-- Registration card -->
      <div class="bg-white rounded-2xl p-5 shadow-sm border border-[#f0f3f4]">
        <h2 class="text-sm font-bold text-[#1193d4] mb-1">🩺 ${isAr ? 'تسجيل طبيب جديد في GIVC' : 'Register New Doctor in GIVC'}</h2>
        <p class="text-xs text-gray-400 mb-4">${isAr ? 'سيتم إصدار OID تلقائياً وربطه بـ NPHIES' : 'OID auto-generated and linked to NPHIES ecosystem'}</p>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-xs font-semibold text-gray-500 mb-1">${isAr ? 'الاسم عربي *' : 'Name (AR) *'}</label>
            <input id="rNameAr" class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1193d4]" placeholder="${isAr ? 'د. محمد أحمد' : 'Dr. Mohamed Ahmad'}">
          </div>
          <div>
            <label class="block text-xs font-semibold text-gray-500 mb-1">${isAr ? 'الاسم إنجليزي' : 'Name (EN)'}</label>
            <input id="rNameEn" class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1193d4]" placeholder="Dr. Mohamed Ahmad">
          </div>
          <div>
            <label class="block text-xs font-semibold text-gray-500 mb-1">${isAr ? 'رقم الهوية *' : 'National ID *'}</label>
            <input id="rNat" class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1193d4]" placeholder="1XXXXXXXXX">
          </div>
          <div>
            <label class="block text-xs font-semibold text-gray-500 mb-1">${isAr ? 'التخصص *' : 'Specialty *'}</label>
            <input id="rSpec" class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1193d4]" placeholder="${isAr ? 'طب القلب' : 'Cardiology'}">
          </div>
          <div>
            <label class="block text-xs font-semibold text-gray-500 mb-1">${isAr ? 'رقم الترخيص' : 'License #'}</label>
            <input id="rLic" class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1193d4]" placeholder="SCFHS-XXXXXX">
          </div>
          <div>
            <label class="block text-xs font-semibold text-gray-500 mb-1">${isAr ? 'الفرع' : 'Branch'}</label>
            <select id="rBranch" class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1193d4]">
              <option value="R001">${isAr ? 'الرياض' : 'Riyadh'}</option>
              <option value="M001">${isAr ? 'المدينة' : 'Madinah'}</option>
              <option value="K001">${isAr ? 'خميس مشيط' : 'Khamis'}</option>
              <option value="J001">${isAr ? 'جيزان' : 'Jizan'}</option>
              <option value="U001">${isAr ? 'عنيزة' : 'Unaizah'}</option>
            </select>
          </div>
        </div>
        <button onclick="doRegister()" class="mt-4 w-full bg-[#1193d4] hover:bg-[#0c6fa0] text-white py-2.5 rounded-lg font-semibold text-sm transition-colors">
          ${isAr ? 'تسجيل وإصدار OID' : 'Register & Issue OID'}
        </button>
        <div id="res" class="hidden mt-3 text-sm p-3 rounded-lg"></div>
      </div>

      <!-- Quick actions grid -->
      <div class="grid grid-cols-2 gap-3">
        <a href="${base}/network?lang=${lang}" class="bg-white rounded-2xl p-4 flex flex-col items-center gap-2 text-center shadow-sm border border-[#f0f3f4] hover:border-[#1193d4] transition-colors">
          <span class="mso text-[#1193d4] text-3xl">groups</span>
          <span class="text-sm font-semibold text-gray-800">${isAr ? 'شبكة الأطباء' : 'Doctor Network'}</span>
          <span class="text-xs text-gray-400">${networkCount} ${isAr ? 'طبيب' : 'doctors'}</span>
        </a>
        <a href="${base}/patients?lang=${lang}" class="bg-white rounded-2xl p-4 flex flex-col items-center gap-2 text-center shadow-sm border border-[#f0f3f4] hover:border-[#1193d4] transition-colors">
          <span class="mso text-[#1193d4] text-3xl">people</span>
          <span class="text-sm font-semibold text-gray-800">${isAr ? 'المرضى' : 'Patients'}</span>
          <span class="text-xs text-gray-400">${isAr ? 'إدارة المرضى' : 'Manage patients'}</span>
        </a>
        <a href="${base}/appointments?lang=${lang}" class="bg-white rounded-2xl p-4 flex flex-col items-center gap-2 text-center shadow-sm border border-[#f0f3f4] hover:border-[#1193d4] transition-colors">
          <span class="mso text-[#1193d4] text-3xl">calendar_today</span>
          <span class="text-sm font-semibold text-gray-800">${isAr ? 'المواعيد' : 'Appointments'}</span>
          <span class="text-xs text-gray-400">${todayCount} ${isAr ? 'اليوم' : 'today'}</span>
        </a>
        <a href="${base}/nphies?lang=${lang}" class="bg-white rounded-2xl p-4 flex flex-col items-center gap-2 text-center shadow-sm border border-[#f0f3f4] hover:border-[#1193d4] transition-colors">
          <span class="mso text-[#1193d4] text-3xl">receipt_long</span>
          <span class="text-sm font-semibold text-gray-800">${isAr ? 'مطالبات NPHIES' : 'NPHIES Claims'}</span>
          <span class="text-xs text-gray-400">${pendingClaims} ${isAr ? 'معلقة' : 'pending'}</span>
        </a>
      </div>

      <!-- Eligibility check -->
      <div class="bg-white rounded-2xl p-5 shadow-sm border border-[#f0f3f4]">
        <h3 class="text-sm font-bold text-gray-800 mb-3">✅ ${isAr ? 'التحقق من التغطية التأمينية' : 'Insurance Eligibility Check'}</h3>
        <div class="flex gap-2">
          <input id="insId" type="text" class="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1193d4]" placeholder="${isAr ? 'رقم التأمين...' : 'Insurance ID...'}">
          <button onclick="checkEligibility()" class="bg-[#1193d4] hover:bg-[#0c6fa0] text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors">${isAr ? 'تحقق' : 'Check'}</button>
        </div>
        <div id="eligRes" class="mt-2 text-xs text-gray-500"></div>
      </div>
    </div>

    <script>
      async function doRegister() {
        const n   = document.getElementById('rNameAr')?.value?.trim();
        const nat = document.getElementById('rNat')?.value?.trim();
        const spec= document.getElementById('rSpec')?.value?.trim();
        if (!n || !nat || !spec) { showRes('${isAr ? 'يرجى تعبئة الحقول المطلوبة (*)' : 'Please fill required fields (*)'}', 'er'); return; }
        showRes('${isAr ? 'جارٍ التسجيل...' : 'Registering...'}', '');
        try {
          const r = await fetch('${base}/api/providers/givc-register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name_ar: n,
              name_en: document.getElementById('rNameEn')?.value?.trim() || n,
              national_id: nat, specialty: spec,
              license_number: document.getElementById('rLic')?.value?.trim(),
              branch_code: document.getElementById('rBranch')?.value || 'R001'
            })
          });
          const d = await r.json();
          if (d.success) showRes('✅ ${isAr ? 'تم التسجيل! OID: ' : 'Registered! OID: '}' + d.givc_oid, 'ok');
          else showRes('❌ ' + (d.message || 'Error'), 'er');
        } catch(e) { showRes('❌ ' + e.message, 'er'); }
      }
      async function checkEligibility() {
        const ins = document.getElementById('insId')?.value?.trim();
        const el  = document.getElementById('eligRes');
        if (!ins) { el.textContent = '${isAr ? 'أدخل رقم التأمين' : 'Enter insurance ID'}'; return; }
        el.textContent = '${isAr ? 'جارٍ التحقق...' : 'Checking...'}';
        try {
          const apiBase = location.hostname === 'givc.elfadil.com' ? 'https://hnh.brainsait.org' : '';
          const r = await fetch(apiBase + '/api/eligibility/check', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ insurance_id: ins, service_type: 'medical' })
          });
          const d = await r.json();
          const live = d.eligibility && d.eligibility.source === 'claimlinc-live';
          const st = (d.eligibility && d.eligibility.status) || 'unknown';
          el.textContent = live
            ? '✅ ${isAr ? 'NPHIES: ' : 'NPHIES verified: '}' + st
            : '⚠️ ${isAr ? 'تعذر التحقق المباشر' : 'Live check unavailable'}';
        } catch { el.textContent = '${isAr ? 'تعذر التحقق' : 'Check failed'}'; }
      }
      function showRes(msg, cls) {
        const el = document.getElementById('res');
        if (!el) return;
        el.textContent = msg;
        el.className = 'mt-3 text-sm p-3 rounded-lg ' + (
          cls === 'ok' ? 'bg-green-50 text-green-700' :
          cls === 'er' ? 'bg-red-50 text-red-700' : 'bg-gray-50 text-gray-600'
        );
        el.classList.remove('hidden');
      }
    <\/script>
` + pageFooter('dashboard', base, lang);
};

// Network (doctor list)
const NETWORK_HTML = (doctors = [], lang = 'ar', base = '') => {
  const isAr = lang === 'ar';
  const title = isAr ? 'شبكة الأطباء - GIVC' : 'Doctors Network - GIVC';

  const cards = doctors.map(d => {
    const name = isAr ? d.name_ar : (d.name_en || d.name_ar);
    const initials = (name || '').split(' ').filter(Boolean).slice(0, 2).map(w => w[0]).join('').toUpperCase() || '?';
    const statusCls = d.givc_status === 'active' ? 'pill-ok' : 'pill-warn';
    const statusTxt = isAr ? (d.givc_status === 'active' ? 'نشط' : 'معلق') : (d.givc_status || 'pending');
    return `<div class="bg-white rounded-xl p-4 flex items-center gap-3 shadow-sm border border-[#f0f3f4]">
      <div class="w-10 h-10 rounded-full bg-[#1193d4] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">${initials}</div>
      <div class="flex-1 min-w-0">
        <div class="text-sm font-semibold text-gray-800 truncate">${name || '—'}</div>
        <div class="text-xs text-gray-500">${d.specialty || '—'} · ${d.branch_code || 'R001'}</div>
        <div class="font-mono text-[10px] text-gray-300 mt-0.5 truncate">${d.givc_oid || ''}</div>
      </div>
      <span class="pill ${statusCls}">${statusTxt}</span>
    </div>`;
  }).join('');

  return pageHead(title, lang, isAr) + `
    <!-- Header -->
    <div class="bg-gradient-to-br from-[#1193d4] to-[#0c6fa0] text-white px-4 py-5">
      <a href="${base}/?lang=${lang}" class="text-white/60 text-xs mb-3 flex items-center gap-1 w-fit">
        <span class="mso text-base">${isAr ? 'arrow_forward' : 'arrow_back'}</span>
        ${isAr ? 'الرئيسية' : 'Dashboard'}
      </a>
      <h1 class="text-lg font-bold mt-2">${isAr ? 'شبكة الأطباء' : 'Doctors Network'}</h1>
      <p class="text-xs text-white/70 mt-0.5">${doctors.length} ${isAr ? 'طبيب مسجل' : 'registered doctors'}</p>
    </div>
    <div class="px-4 py-3 space-y-2">
      ${cards || `<div class="text-center text-gray-400 py-12 text-sm">${isAr ? 'لا يوجد أطباء مسجلون بعد' : 'No doctors registered yet'}</div>`}
    </div>
` + pageFooter('dashboard', base, lang);
};

// Patients list
const PATIENTS_HTML = (patients = [], lang = 'ar', base = '') => {
  const isAr = lang === 'ar';
  const title = isAr ? 'المرضى - GIVC' : 'Patients - GIVC';

  const cards = patients.map(p => {
    const name = isAr
      ? (p.full_name_ar || `${p.first_name_ar || ''} ${p.last_name_ar || ''}`.trim())
      : (p.full_name_en || `${p.first_name_en || ''} ${p.last_name_en || ''}`.trim() || p.full_name_ar || '');
    const initials = (name || '').split(' ').filter(Boolean).slice(0, 2).map(w => w[0]).join('').toUpperCase() || '?';
    const mrn = p.mrn || '';
    const dob = p.date_of_birth ? String(p.date_of_birth).split('T')[0] : '';
    const gender = isAr
      ? (p.gender === 'male' ? 'ذكر' : p.gender === 'female' ? 'أنثى' : '')
      : (p.gender || '');
    return `<a href="${base}/patients/${p.id}?lang=${lang}" data-name="${name.toLowerCase()}" data-mrn="${mrn.toLowerCase()}"
       class="bg-white rounded-xl p-4 flex items-center gap-3 shadow-sm border border-[#f0f3f4] hover:border-[#1193d4] transition-colors">
      <div class="w-10 h-10 rounded-full bg-[#1193d4] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">${initials}</div>
      <div class="flex-1 min-w-0">
        <div class="font-semibold text-gray-800 text-sm truncate">${name || '—'}</div>
        <div class="text-xs text-gray-400">${mrn ? `MRN: ${mrn}` : ''}${dob ? ` · ${dob}` : ''}${gender ? ` · ${gender}` : ''}</div>
      </div>
      <span class="mso text-gray-300 text-xl">${isAr ? 'chevron_left' : 'chevron_right'}</span>
    </a>`;
  }).join('');

  return pageHead(title, lang, isAr) + `
    <!-- Header -->
    <div class="bg-gradient-to-br from-[#1193d4] to-[#0c6fa0] text-white px-4 py-5">
      <h1 class="text-lg font-bold">${isAr ? 'المرضى' : 'Patients'}</h1>
      <p class="text-xs text-white/70 mt-0.5">${patients.length} ${isAr ? 'مريض مسجل' : 'registered patients'}</p>
    </div>
    <!-- Search -->
    <div class="px-4 py-3 bg-white border-b border-[#f0f3f4] sticky top-0 z-10">
      <div class="relative">
        <span class="mso absolute ${isAr ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 text-gray-400 text-xl pointer-events-none">search</span>
        <input id="searchInput" type="search" oninput="filterPts()"
          class="w-full ${isAr ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-2.5 bg-[#f6f7f8] border border-[#f0f3f4] rounded-xl text-sm focus:outline-none focus:border-[#1193d4]"
          placeholder="${isAr ? 'بحث بالاسم أو MRN...' : 'Search by name or MRN...'}">
      </div>
    </div>
    <!-- List -->
    <div class="px-4 py-3 space-y-2" id="ptList">
      ${cards || `<div class="text-center text-gray-400 py-12 text-sm">${isAr ? 'لا يوجد مرضى مسجلون' : 'No patients registered'}</div>`}
    </div>
    <script>
      function filterPts() {
        const q = document.getElementById('searchInput').value.toLowerCase().trim();
        document.querySelectorAll('#ptList > a').forEach(el => {
          const show = !q || (el.dataset.name||'').includes(q) || (el.dataset.mrn||'').includes(q);
          el.style.display = show ? '' : 'none';
        });
      }
    <\/script>
` + pageFooter('patients', base, lang);
};

// Patient detail
const PATIENT_DETAIL_HTML = (patient = {}, appointments = [], lang = 'ar', base = '') => {
  const isAr = lang === 'ar';
  const fullName = isAr
    ? (patient.full_name_ar || `${patient.first_name_ar || ''} ${patient.last_name_ar || ''}`.trim())
    : (patient.full_name_en || `${patient.first_name_en || ''} ${patient.last_name_en || ''}`.trim() || patient.full_name_ar || '—');
  const initials = fullName.split(' ').filter(Boolean).slice(0, 2).map(w => w[0]).join('').toUpperCase() || '?';
  const title = `${fullName} - GIVC`;

  const infoRows = [
    { label: isAr ? 'تاريخ الميلاد' : 'Date of Birth', val: String(patient.date_of_birth || '').split('T')[0] || '—' },
    { label: isAr ? 'الجنس'         : 'Gender',         val: isAr ? (patient.gender === 'male' ? 'ذكر' : patient.gender === 'female' ? 'أنثى' : '—') : (patient.gender || '—') },
    { label: isAr ? 'فصيلة الدم'    : 'Blood Type',     val: patient.blood_type || '—' },
    { label: isAr ? 'الهاتف'        : 'Phone',          val: patient.phone || '—' },
    { label: isAr ? 'رقم الهوية'    : 'National ID',    val: patient.national_id || '—' },
    { label: 'MRN',                                      val: patient.mrn || '—' },
  ].map(r => `<div class="flex justify-between items-center py-2.5 border-b border-[#f0f3f4] last:border-0">
    <span class="text-xs text-gray-400">${r.label}</span>
    <span class="text-sm font-medium text-gray-800">${r.val}</span>
  </div>`).join('');

  const allergiesBlock = patient.allergies
    ? `<div class="mt-3 p-3 bg-red-50 rounded-xl">
        <div class="text-xs font-bold text-red-600 mb-1">⚠️ ${isAr ? 'الحساسية' : 'Allergies'}</div>
        <div class="text-sm text-red-700">${patient.allergies}</div>
       </div>` : '';

  const statusMap = isAr
    ? { scheduled: 'مجدول', confirmed: 'مؤكد', completed: 'مكتمل', cancelled: 'ملغي', 'no-show': 'لم يحضر' }
    : {};
  const apptRows = (appointments || []).slice(0, 10).map(a => {
    const cls = a.status === 'completed' ? 'pill-ok' : a.status === 'cancelled' ? 'pill-err' : a.status === 'confirmed' ? 'pill-blue' : 'pill-warn';
    const txt = isAr ? (statusMap[a.status] || a.status) : (a.status || '—');
    return `<div class="flex items-center justify-between py-2.5 border-b border-[#f0f3f4] last:border-0">
      <div>
        <div class="text-sm font-medium text-gray-800">${a.appointment_date || ''} ${a.appointment_time ? String(a.appointment_time).slice(0,5) : ''}</div>
        <div class="text-xs text-gray-400">${a.type || (isAr ? 'زيارة عيادة' : 'Clinic Visit')}</div>
      </div>
      <span class="pill ${cls}">${txt}</span>
    </div>`;
  }).join('');

  return pageHead(title, lang, isAr) + `
    <!-- Header -->
    <div class="bg-gradient-to-br from-[#1193d4] to-[#0c6fa0] text-white px-4 py-5">
      <a href="${base}/patients?lang=${lang}" class="text-white/60 text-xs mb-3 flex items-center gap-1 w-fit">
        <span class="mso text-base">${isAr ? 'arrow_forward' : 'arrow_back'}</span>
        ${isAr ? 'المرضى' : 'Patients'}
      </a>
      <div class="flex items-center gap-4 mt-2">
        <div class="w-14 h-14 rounded-full bg-white/25 flex items-center justify-center text-white font-bold text-xl flex-shrink-0">${initials}</div>
        <div>
          <h1 class="text-lg font-bold leading-tight">${fullName}</h1>
          <p class="text-xs text-white/70">${patient.mrn ? `MRN: ${patient.mrn}` : ''}</p>
        </div>
      </div>
    </div>

    <div class="px-4 py-3 space-y-4">
      <!-- Medical info -->
      <div class="bg-white rounded-2xl p-4 shadow-sm border border-[#f0f3f4]">
        <h2 class="text-sm font-bold text-gray-800 mb-2">${isAr ? 'المعلومات الطبية' : 'Medical Information'}</h2>
        ${infoRows}
        ${allergiesBlock}
      </div>

      <!-- Appointments -->
      <div class="bg-white rounded-2xl p-4 shadow-sm border border-[#f0f3f4]">
        <h2 class="text-sm font-bold text-gray-800 mb-2">${isAr ? 'المواعيد' : 'Appointments'} (${(appointments || []).length})</h2>
        ${apptRows || `<div class="text-sm text-gray-400 text-center py-4">${isAr ? 'لا توجد مواعيد' : 'No appointments'}</div>`}
      </div>
    </div>
` + pageFooter('patients', base, lang);
};

// Appointments (today's schedule)
const APPOINTMENTS_HTML = (appointments = [], dateStr = '', lang = 'ar', base = '') => {
  const isAr = lang === 'ar';
  const title = isAr ? 'المواعيد - GIVC' : 'Appointments - GIVC';
  const statusMap = isAr
    ? { scheduled: 'مجدول', confirmed: 'مؤكد', completed: 'مكتمل', cancelled: 'ملغي', 'no-show': 'لم يحضر' }
    : {};

  const total     = appointments.length;
  const scheduled = appointments.filter(a => a.status === 'scheduled' || a.status === 'confirmed').length;
  const completed = appointments.filter(a => a.status === 'completed').length;
  const cancelled = appointments.filter(a => a.status === 'cancelled').length;

  const rows = appointments.map(a => {
    const cls = a.status === 'completed' ? 'pill-ok' : a.status === 'cancelled' ? 'pill-err' : a.status === 'confirmed' ? 'pill-blue' : 'pill-warn';
    const txt = isAr ? (statusMap[a.status] || a.status) : (a.status || '—');
    const patName = isAr
      ? (a.patient_full_name_ar || a.patient_name || '—')
      : (a.patient_full_name_en || a.patient_name || a.patient_full_name_ar || '—');
    return `<div class="bg-white rounded-xl p-4 flex items-center gap-3 shadow-sm border border-[#f0f3f4]">
      <div class="w-12 text-center flex-shrink-0">
        <div class="text-sm font-bold text-[#1193d4]">${a.appointment_time ? String(a.appointment_time).slice(0,5) : '—'}</div>
      </div>
      <div class="flex-1 min-w-0">
        <div class="text-sm font-semibold text-gray-800 truncate">${patName}</div>
        <div class="text-xs text-gray-400">${a.type || (isAr ? 'زيارة عيادة' : 'Clinic Visit')}</div>
      </div>
      <span class="pill ${cls}">${txt}</span>
    </div>`;
  }).join('');

  return pageHead(title, lang, isAr) + `
    <!-- Header -->
    <div class="bg-gradient-to-br from-[#1193d4] to-[#0c6fa0] text-white px-4 py-5">
      <h1 class="text-lg font-bold">${isAr ? 'المواعيد' : 'Appointments'}</h1>
      <p class="text-xs text-white/70 mt-0.5">${dateStr}</p>
    </div>
    <!-- Stats strip -->
    <div class="bg-white border-b border-[#f0f3f4] px-4 py-3 grid grid-cols-4 divide-x divide-[#f0f3f4]">
      <div class="text-center px-2">
        <div class="text-lg font-bold text-gray-800">${total}</div>
        <div class="text-[10px] text-gray-400">${isAr ? 'الكل' : 'Total'}</div>
      </div>
      <div class="text-center px-2">
        <div class="text-lg font-bold text-[#1193d4]">${scheduled}</div>
        <div class="text-[10px] text-gray-400">${isAr ? 'مجدول' : 'Scheduled'}</div>
      </div>
      <div class="text-center px-2">
        <div class="text-lg font-bold text-green-600">${completed}</div>
        <div class="text-[10px] text-gray-400">${isAr ? 'مكتمل' : 'Completed'}</div>
      </div>
      <div class="text-center px-2">
        <div class="text-lg font-bold text-red-500">${cancelled}</div>
        <div class="text-[10px] text-gray-400">${isAr ? 'ملغي' : 'Cancelled'}</div>
      </div>
    </div>
    <!-- List -->
    <div class="px-4 py-3 space-y-2">
      ${rows || `<div class="text-center text-gray-400 py-12 text-sm">${isAr ? 'لا توجد مواعيد اليوم' : 'No appointments today'}</div>`}
    </div>
` + pageFooter('appointments', base, lang);
};

// NPHIES claims
const NPHIES_HTML = (claims = [], claimsStats = {}, lang = 'ar', base = '') => {
  const isAr = lang === 'ar';
  const title = isAr ? 'مطالبات NPHIES - GIVC' : 'NPHIES Claims - GIVC';
  const { total = 0, pending = 0, approved = 0, rejected = 0 } = claimsStats;
  const statusMap = isAr
    ? { draft: 'مسودة', submitted: 'مرسلة', approved: 'معتمدة', rejected: 'مرفوضة', paid: 'مدفوعة' }
    : {};

  const rows = claims.map(c => {
    const cls = (c.status === 'approved' || c.status === 'paid') ? 'pill-ok'
              : c.status === 'rejected' ? 'pill-err'
              : c.status === 'submitted' ? 'pill-blue' : 'pill-warn';
    const txt = isAr ? (statusMap[c.status] || c.status) : (c.status || '—');
    return `<div class="bg-white rounded-xl p-4 shadow-sm border border-[#f0f3f4]" data-claim="${(c.claim_number||'').toLowerCase()}" data-payer="${(c.payer_name||'').toLowerCase()}">
      <div class="flex items-center justify-between mb-1.5">
        <span class="font-mono text-xs text-gray-400">${c.claim_number || '—'}</span>
        <span class="pill ${cls}">${txt}</span>
      </div>
      <div class="flex items-center justify-between">
        <span class="text-sm text-gray-700">${c.payer_name || '—'}</span>
        <span class="text-sm font-bold text-gray-800">${c.total_amount ? Number(c.total_amount).toLocaleString() + ' SAR' : '—'}</span>
      </div>
      ${c.claim_type ? `<div class="text-xs text-gray-300 mt-1">${c.claim_type}</div>` : ''}
    </div>`;
  }).join('');

  return pageHead(title, lang, isAr) + `
    <!-- Header with stats -->
    <div class="bg-gradient-to-br from-[#1193d4] to-[#0c6fa0] text-white px-4 py-5">
      <h1 class="text-lg font-bold">${isAr ? 'مطالبات NPHIES' : 'NPHIES Claims'}</h1>
      <p class="text-xs text-white/70 mt-0.5">${isAr ? 'بوابة الفوترة الوطنية' : 'National Healthcare Claims Portal'}</p>
      <div class="grid grid-cols-4 gap-2 mt-4">
        <div class="bg-white/15 rounded-xl p-2 text-center">
          <div class="text-xl font-bold">${total}</div>
          <div class="text-[10px] text-white/70">${isAr ? 'الكل' : 'Total'}</div>
        </div>
        <div class="bg-white/15 rounded-xl p-2 text-center">
          <div class="text-xl font-bold">${pending}</div>
          <div class="text-[10px] text-white/70">${isAr ? 'معلقة' : 'Pending'}</div>
        </div>
        <div class="bg-white/15 rounded-xl p-2 text-center">
          <div class="text-xl font-bold">${approved}</div>
          <div class="text-[10px] text-white/70">${isAr ? 'معتمدة' : 'Approved'}</div>
        </div>
        <div class="bg-white/15 rounded-xl p-2 text-center">
          <div class="text-xl font-bold">${rejected}</div>
          <div class="text-[10px] text-white/70">${isAr ? 'مرفوضة' : 'Rejected'}</div>
        </div>
      </div>
    </div>
    <!-- Search -->
    <div class="px-4 py-3 bg-white border-b border-[#f0f3f4] sticky top-0 z-10">
      <div class="relative">
        <span class="mso absolute ${isAr ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 text-gray-400 text-xl pointer-events-none">search</span>
        <input id="claimSearch" type="search" oninput="filterClaims()"
          class="w-full ${isAr ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-2.5 bg-[#f6f7f8] border border-[#f0f3f4] rounded-xl text-sm focus:outline-none focus:border-[#1193d4]"
          placeholder="${isAr ? 'بحث برقم المطالبة أو الجهة...' : 'Search by claim # or payer...'}">
      </div>
    </div>
    <!-- List -->
    <div class="px-4 py-3 space-y-2" id="claimsList">
      ${rows || `<div class="text-center text-gray-400 py-12 text-sm">${isAr ? 'لا توجد مطالبات' : 'No claims found'}</div>`}
    </div>
    <script>
      function filterClaims() {
        const q = document.getElementById('claimSearch').value.toLowerCase().trim();
        document.querySelectorAll('#claimsList > div[data-claim]').forEach(el => {
          const show = !q || (el.dataset.claim||'').includes(q) || (el.dataset.payer||'').includes(q);
          el.style.display = show ? '' : 'none';
        });
      }
    <\/script>
` + pageFooter('nphies', base, lang);
};

// ─── Main Handler ───────────────────────────────────────────────────────────
export default {
  async fetch(request, env) {
    const url     = new URL(request.url);
    const rawPath = url.pathname;
    const path    = normalizePath(rawPath);
    const isHead  = request.method === 'HEAD';
    const method  = isHead ? 'GET' : request.method;
    const lang    = url.searchParams.get('lang') || 'ar';

    // base: '' for givc.elfadil.com, '/givc' for all other hosts (hnh.brainsait.org, *.workers.dev)
    const base = url.hostname === 'givc.elfadil.com' ? '' : '/givc';

    // CORS preflight
    if (method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: CORS });
    }

    // ── Health ────────────────────────────────────────────────────────────
    if (path === '/health' || path === '/api/health') {
      return maybeHead(isHead, json({
        service: 'GIVC Portal', version: VERSION, status: 'healthy',
        timestamp: new Date().toISOString(),
        features: ['doctor-registration', 'oid-generation', 'network', 'patients', 'appointments', 'nphies', 'eligibility'],
        facility_oid: FACILITY_OID,
        database: env.DB ? 'connected' : 'unavailable',
      }));
    }

    // ── API: Register doctor ──────────────────────────────────────────────
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

          const givc_oid    = generateGivcOid();
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
            branchCode, phone || null, email || null,
            givc_oid, specialty || '', branchCode
          ).run();

          const providerId = result.meta?.last_row_id || null;

          await env.DB.prepare(`
            INSERT INTO givc_doctors (
              givc_oid, provider_id, national_id, name_ar, name_en, specialty, subspecialty,
              branch_code, department, license_number, phone, email, givc_status, network_visibility
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'active', 'public')
          `).bind(
            givc_oid, providerId, national_id,
            name_ar, name_en || name_ar,
            specialty || '', subspecialty || null,
            branchCode, department || null,
            license_number || null, phone || null, email || null
          ).run();

          return json({ success: true, provider_id: providerId, givc_oid, provider_code: providerCode, branch_code: branchCode });
        }

        const givc_oid    = generateGivcOid();
        const providerCode = 'DRV-' + Date.now().toString(36).toUpperCase().slice(-6);
        return json({ success: true, provider_id: null, givc_oid, provider_code: providerCode, note: 'DB not connected' });
      } catch (e) {
        return json({ success: false, message: e.message }, 500);
      }
    }

    // ── API: Get doctor by OID ────────────────────────────────────────────
    if (path.startsWith('/api/providers/givc/') && method === 'GET') {
      const givcOid = path.slice('/api/providers/givc/'.length);
      if (!givcOid) return json({ error: 'OID required' }, 400);
      try {
        if (env.DB) {
          const doctor = await env.DB.prepare(`
            SELECT p.*, g.givc_status, g.network_visibility
            FROM providers p
            LEFT JOIN givc_doctors g ON p.givc_oid = g.givc_oid
            WHERE p.givc_oid = ?
          `).bind(givcOid).first();
          if (doctor) return maybeHead(isHead, json({ success: true, doctor }));

          const givcDoctor = await env.DB.prepare(
            `SELECT * FROM givc_doctors WHERE givc_oid = ?`
          ).bind(givcOid).first();
          if (givcDoctor) return maybeHead(isHead, json({ success: true, doctor: givcDoctor, source: 'givc_doctors' }));
        }
        return maybeHead(isHead, json({ success: false, message: 'Doctor not found' }, 404));
      } catch (e) {
        return json({ success: false, message: e.message }, 500);
      }
    }

    // ── API: GIVC network list ────────────────────────────────────────────
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
              SELECT p.givc_oid, p.id,
                     TRIM(p.first_name_ar||' '||COALESCE(p.last_name_ar,'')) AS name_ar,
                     TRIM(p.first_name_en||' '||COALESCE(p.last_name_en,'')) AS name_en,
                     p.specialty, p.subspecialty,
                     COALESCE(p.givc_branch_code, p.clinic_location, 'R001') AS branch_code,
                     'active', 'public', p.provider_code, p.phone, p.email, p.created_at
              FROM providers p
              WHERE p.givc_registered = 1 AND p.givc_oid IS NOT NULL
            )
            ORDER BY sort_at DESC LIMIT 150
          `).all();
          return maybeHead(isHead, json({ success: true, doctors: normalizeNetworkRows(results), source: 'givc_network_union' }));
        }
        return maybeHead(isHead, json({ success: true, doctors: [], source: 'no_db' }));
      } catch (e) {
        return maybeHead(isHead, json({ success: false, doctors: [], error: e.message }, 500));
      }
    }

    // ── UI: Dashboard (/') ────────────────────────────────────────────────
    if (path === '/') {
      let networkCount = 0, todayCount = 0, pendingClaims = 0;
      try {
        if (env.DB) {
          const today = new Date().toISOString().split('T')[0];
          const [netRow, apptRow, claimRow] = await Promise.all([
            env.DB.prepare(`
              SELECT COUNT(DISTINCT givc_oid) AS cnt FROM (
                SELECT givc_oid FROM givc_doctors WHERE givc_status='active'
                UNION
                SELECT givc_oid FROM providers WHERE givc_registered=1 AND givc_oid IS NOT NULL
              )
            `).first(),
            env.DB.prepare(
              `SELECT COUNT(*) AS cnt FROM appointments WHERE appointment_date = ? AND status NOT IN ('cancelled')`
            ).bind(today).first(),
            env.DB.prepare(
              `SELECT COUNT(*) AS cnt FROM claims WHERE status IN ('draft', 'submitted')`
            ).first(),
          ]);
          networkCount  = netRow?.cnt   || 0;
          todayCount    = apptRow?.cnt  || 0;
          pendingClaims = claimRow?.cnt || 0;
        }
      } catch {}
      return maybeHead(isHead, html(DASHBOARD_HTML(lang, { networkCount, todayCount, pendingClaims }, base)));
    }

    // ── UI: Doctor network ────────────────────────────────────────────────
    if (path === '/network') {
      let doctors = [];
      try {
        if (env.DB) {
          const { results } = await env.DB.prepare(`
            SELECT givc_oid, name_ar, name_en, specialty, branch_code, givc_status
            FROM (
              SELECT g.givc_oid, g.name_ar, g.name_en, g.specialty, g.branch_code, g.givc_status, g.created_at AS s
              FROM givc_doctors g WHERE g.givc_status='active'
              UNION ALL
              SELECT p.givc_oid,
                     TRIM(p.first_name_ar||' '||COALESCE(p.last_name_ar,'')) AS name_ar,
                     TRIM(p.first_name_en||' '||COALESCE(p.last_name_en,'')) AS name_en,
                     p.specialty,
                     COALESCE(p.givc_branch_code, p.clinic_location, 'R001') AS branch_code,
                     'active' AS givc_status, p.created_at AS s
              FROM providers p WHERE p.givc_registered=1 AND p.givc_oid IS NOT NULL
            )
            ORDER BY s DESC LIMIT 150
          `).all();
          doctors = normalizeNetworkRows(results);
        }
      } catch {}
      return maybeHead(isHead, html(NETWORK_HTML(doctors, lang, base)));
    }

    // ── UI: Patients list ─────────────────────────────────────────────────
    if (path === '/patients' && !path.includes('/patients/')) {
      let patients = [];
      try {
        if (env.DB) {
          const { results } = await env.DB.prepare(`
            SELECT id, mrn, national_id, first_name_ar, last_name_ar, first_name_en, last_name_en,
                   full_name_ar, full_name_en, date_of_birth, gender, phone, is_active
            FROM patients
            WHERE is_active = 1
            ORDER BY full_name_ar ASC, created_at DESC
            LIMIT 50
          `).all();
          patients = results || [];
        }
      } catch {}
      return maybeHead(isHead, html(PATIENTS_HTML(patients, lang, base)));
    }

    // ── UI: Patient detail ────────────────────────────────────────────────
    if (path.startsWith('/patients/')) {
      const patientId = path.slice('/patients/'.length);
      if (patientId && !patientId.includes('/')) {
        let patient = null, appointments = [];
        try {
          if (env.DB) {
            const [p, appts] = await Promise.all([
              env.DB.prepare(`SELECT * FROM patients WHERE id = ?`).bind(patientId).first(),
              env.DB.prepare(`
                SELECT * FROM appointments WHERE patient_id = ?
                ORDER BY appointment_date DESC, appointment_time DESC
                LIMIT 20
              `).bind(patientId).all(),
            ]);
            patient      = p;
            appointments = appts?.results || [];
          }
        } catch {}
        if (!patient) return json({ error: 'Patient not found', id: patientId }, 404);
        return maybeHead(isHead, html(PATIENT_DETAIL_HTML(patient, appointments, lang, base)));
      }
    }

    // ── UI: Appointments (today) ──────────────────────────────────────────
    if (path === '/appointments') {
      let appointments = [];
      const today = new Date().toISOString().split('T')[0];
      try {
        if (env.DB) {
          const { results } = await env.DB.prepare(`
            SELECT a.id, a.patient_id, a.appointment_date, a.appointment_time, a.type, a.status,
                   p.full_name_ar AS patient_full_name_ar, p.full_name_en AS patient_full_name_en
            FROM appointments a
            LEFT JOIN patients p ON a.patient_id = p.id
            WHERE a.appointment_date = ?
            ORDER BY a.appointment_time ASC
            LIMIT 50
          `).bind(today).all();
          appointments = results || [];
        }
      } catch {}
      const dateStr = new Date().toLocaleDateString(lang === 'ar' ? 'ar-SA' : 'en-US', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
      });
      return maybeHead(isHead, html(APPOINTMENTS_HTML(appointments, dateStr, lang, base)));
    }

    // ── UI: NPHIES claims ─────────────────────────────────────────────────
    if (path === '/nphies') {
      let claims = [];
      let claimsStats = { total: 0, pending: 0, approved: 0, rejected: 0 };
      try {
        if (env.DB) {
          const [claimsResult, statsResult] = await Promise.all([
            env.DB.prepare(`
              SELECT id, claim_number, claim_type, payer_id, payer_name,
                     total_amount, approved_amount, paid_amount,
                     status, submission_date, nphies_claim_id
              FROM claims
              ORDER BY submission_date DESC, id DESC
              LIMIT 50
            `).all(),
            env.DB.prepare(
              `SELECT status, COUNT(*) AS cnt FROM claims GROUP BY status`
            ).all(),
          ]);
          claims = claimsResult.results || [];
          for (const row of (statsResult.results || [])) {
            claimsStats.total += row.cnt;
            if (row.status === 'draft' || row.status === 'submitted') claimsStats.pending  += row.cnt;
            if (row.status === 'approved' || row.status === 'paid')    claimsStats.approved += row.cnt;
            if (row.status === 'rejected')                              claimsStats.rejected += row.cnt;
          }
        }
      } catch {}
      return maybeHead(isHead, html(NPHIES_HTML(claims, claimsStats, lang, base)));
    }

    // ── Profile → redirect ────────────────────────────────────────────────
    if (path === '/profile') {
      return new Response(null, { status: 302, headers: { Location: `${base}/?lang=${lang}` } });
    }

    // ── 404 ───────────────────────────────────────────────────────────────
    return maybeHead(isHead, json({ error: 'Not found', path }, 404));
  }
};
