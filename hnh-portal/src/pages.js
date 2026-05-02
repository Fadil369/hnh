/**
 * HNH Portal — Premium Corporate Site with Integrated Ecosystem
 * Production: hnh.brainsait.org
 * v9.0 — SEO + Static Pages (Academy, Blog, Courses, About, FAQ)
 */
import * as S from './sites.js';

const STATIC_PAGES = {
  'about': S.about,
  'academy': S.academy,
  'blog': S.blog,
  'branches': S.branches,
  'contact': S.contact,
  'departments': S.departments,
  'doctors': S.doctors,
  'faq': S.faq,
  'packages': S.packages,
  'index': S.index,
};

const L = {
  "ar": {
    "desc": "مجموعة مستشفيات الحياة الوطني — منظومة صحية متكاملة مع بوابات BSMA و GIVC و SBS و Oracle و NPHIES.",
    "title": "مستشفيات الحياة الوطني | HNH — المنظومة المتكاملة",
    "titleShort": "مستشفى الحياة الوطني",
    "osVer": "BrainSAIT Healthcare OS v5.0",
    "heroBadge": "بيانات حية — متصل بـ BrainSAIT",
    "heroH1": "مجموعة مستشفيات<br><span class=\"gd\">الحياة الوطني</span>",
    "heroP": "منظومة صحية ذكية متكاملة — تكامل BSMA الصوتي · GIVC · SBS · Oracle · NPHIES · ClaimLinc",
    "heroBookBtn": "📅 احجز موعد",
    "heroDeptBtn": "تصفح الأقسام",
    "statDoctors": "طبيب",
    "statBranches": "فرع",
    "statDepts": "قسم طبي",
    "statBeds": "سرير",
    "navDepts": "الأقسام",
    "navBranches": "الفروع",
    "navDoctors": "الأطباء",
    "navPortal": "المنظومة",
    "navEcosystem": "المنظومة",
    "navBook": "📅 احجز موعد",
    "langBtn": "EN",
    "secDeptsTitle": "الأقسام الطبية",
    "secDeptsSub": "أكثر من 30 تخصصاً طبياً",
    "secBranchesTitle": "فروعنا",
    "secBranchesSub": "خمسة فروع في المملكة",
    "secDoctorsTitle": "أطباؤنا",
    "secDoctorsSub": "فريق من أمهر الاستشاريين",
    "ecosystemTitle": "المنظومة الصحية المتكاملة",
    "ecosystemSub": "بوابات ذكية لكل مستخدم — بيانات حية وتكامل كامل بين الأنظمة",
    "patientTitle": "المريض",
    "patientDesc": "استعراض الفحوصات، حجز المواعيد، متابعة المطالبات، الدردشة الذكية مع بسمة",
    "providerTitle": "المزود الصحي",
    "providerDesc": "جدول المواعيد، ملفات المرضى، التكامل مع Oracle و NPHIES، تقارير الأداء",
    "payerTitle": "التأمين",
    "payerDesc": "التحقق من الأهلية، إدارة الموافقات المسبقة، متابعة دورة الإيرادات",
    "studentTitle": "الطالب",
    "studentDesc": "الأكاديمية الطبية — دورات تدريبية، شهادات، مكتبة طبية إلكترونية",
    "adminTitle": "الإدارة",
    "adminDesc": "لوحة تحكم شاملة — إحصائيات، تقارير، إدارة المستخدمين والصلاحيات",
    "receptionTitle": "الاستقبال",
    "receptionDesc": "تسجيل المرضى، إدارة المواعيد، التحقق من التأمين، طباعة التقارير",
    "rcmTitle": "دورة الإيرادات",
    "rcmDesc": "المطالبات المالية، متابعة التحصيل، تحليل الأداء المالي، تقارير NPHIES",
    "integrationsTitle": "التكاملات الحية",
    "integrationsSub": "جميع الأنظمة متصلة وتعمل بشكل مباشر",
    "aiTitle": "بسمة — المساعد الطبي الذكي",
    "aiDesc": "تحدث مع بسمة بالصوت أو الكتابة — حجز مواعيد، فحص الأهلية، متابعة المطالبات، استفسارات طبية",
    "aiTalkBtn": "تحدث مع بسمة 🎙️",
    "aiChatBtn": "💬 دردشة نصية",
    "ctaTitle": "صحتك أولاً",
    "ctaSub": "احجز موعدك الآن عبر المنظومة المتكاملة",
    "ctaBook": "احجز موعد الآن",
    "ctaCall": "اتصل بنا",
    "fAbout": "منظومة صحية ذكية متكاملة — منذ 25 عاماً من التميز.",
    "fLinks": "روابط سريعة",
    "fContact": "تواصل معنا",
    "fServices": "خدمات",
    "fEmerg": "طوارئ 24/7",
    "fAppt": "حجز موعد",
    "fEcosystem": "المنظومة",
    "fPortal": "البوابة",
    "fBSMA": "بسمة AI",
    "fPowered": "مشغّل بنظام",
    "fCopy": "© 2026 جميع الحقوق محفوظة",
    "statusConnected": "متصل",
    "statusWarning": "تحذير",
    "statusOffline": "غير متصل",
    "loading": "جاري التحميل...",
    "systemOnline": "جميع الأنظمة تعمل",
    "oracleBridge": "جسر Oracle",
    "nphiesPortal": "بوابة NPHIES",
    "claimlincPortal": "ClaimLinc",
    "bsmaPortal": "بسمة AI",
    "sbsPortal": "SBS",
    "givcPortal": "GIVC"
  },
  "en": {
    "desc": "Hayat National Hospitals Group — Integrated Healthcare Ecosystem with BSMA, GIVC, SBS, Oracle & NPHIES portals.",
    "title": "Hayat National Hospitals | HNH — Integrated Ecosystem",
    "titleShort": "Hayat National Hospital",
    "osVer": "BrainSAIT Healthcare OS v5.0",
    "heroBadge": "Live Data — Connected to BrainSAIT",
    "heroH1": "Hayat National<br><span class=\"gd\">Hospitals Group</span>",
    "heroP": "Integrated Smart Healthcare — BSMA Voice · GIVC · SBS · Oracle · NPHIES · ClaimLinc",
    "heroBookBtn": "📅 Book Appointment",
    "heroDeptBtn": "Browse Departments",
    "statDoctors": "Doctors",
    "statBranches": "Branches",
    "statDepts": "Departments",
    "statBeds": "Beds",
    "navDepts": "Departments",
    "navBranches": "Branches",
    "navDoctors": "Doctors",
    "navPortal": "Ecosystem",
    "navEcosystem": "Ecosystem",
    "navBook": "📅 Book Now",
    "langBtn": "العربية",
    "secDeptsTitle": "Medical Departments",
    "secDeptsSub": "Over 30 medical specialties",
    "secBranchesTitle": "Our Branches",
    "secBranchesSub": "Five branches across KSA",
    "secDoctorsTitle": "Our Doctors",
    "secDoctorsSub": "Team of expert consultants",
    "ecosystemTitle": "Integrated Healthcare Ecosystem",
    "ecosystemSub": "Smart portals for every user — live data and full system integration",
    "patientTitle": "Patient",
    "patientDesc": "View lab results, book appointments, track claims, AI chat with Basma",
    "providerTitle": "Provider",
    "providerDesc": "Schedule management, patient records, Oracle & NPHIES integration, performance reports",
    "payerTitle": "Payer / Insurance",
    "payerDesc": "Eligibility verification, pre-authorization management, revenue cycle tracking",
    "studentTitle": "Student",
    "studentDesc": "Medical academy — training courses, certificates, digital medical library",
    "adminTitle": "Admin",
    "adminDesc": "Full dashboard — analytics, reports, user & permission management",
    "receptionTitle": "Reception",
    "receptionDesc": "Patient registration, appointment management, insurance verification, reports",
    "rcmTitle": "Revenue Cycle",
    "rcmDesc": "Claims management, collection tracking, financial analytics, NPHIES reporting",
    "integrationsTitle": "Live Integrations",
    "integrationsSub": "All systems connected and operational",
    "aiTitle": "Basma — AI Medical Assistant",
    "aiDesc": "Talk to Basma by voice or text — book appointments, check eligibility, track claims, medical inquiries",
    "aiTalkBtn": "Talk to Basma 🎙️",
    "aiChatBtn": "💬 Chat Now",
    "ctaTitle": "Your Health First",
    "ctaSub": "Book your appointment now through our integrated ecosystem",
    "ctaBook": "Book Now",
    "ctaCall": "Call Us",
    "fAbout": "An intelligent integrated healthcare ecosystem — 25 years of excellence.",
    "fLinks": "Quick Links",
    "fContact": "Contact Us",
    "fServices": "Services",
    "fEmerg": "Emergency 24/7",
    "fAppt": "Book Appointment",
    "fEcosystem": "Ecosystem",
    "fPortal": "Portal",
    "fBSMA": "Basma AI",
    "fPowered": "Powered by",
    "fCopy": "© 2026 All rights reserved",
    "statusConnected": "Online",
    "statusWarning": "Warning",
    "statusOffline": "Offline",
    "loading": "Loading...",
    "systemOnline": "All systems operational",
    "oracleBridge": "Oracle Bridge",
    "nphiesPortal": "NPHIES Portal",
    "claimlincPortal": "ClaimLinc",
    "bsmaPortal": "Basma AI",
    "sbsPortal": "SBS Portal",
    "givcPortal": "GIVC Portal"
  }
};

const DE = [{"i":"❤️","nA":"القلب والأوعية","nE":"Cardiology","dA":"تشخيص وعلاج أمراض القلب","dE":"Heart disease diagnosis"},{"i":"🦴","nA":"جراحة العظام","nE":"Orthopedics","dA":"جراحة المفاصل والكسور","dE":"Joint surgery & fractures"},{"i":"👶","nA":"طب الأطفال","nE":"Pediatrics","dA":"رعاية الأطفال حديثي الولادة","dE":"Newborn & child care"},{"i":"👩","nA":"النساء والولادة","nE":"OB/GYN","dA":"متابعة الحمل والولادة","dE":"Pregnancy & delivery"},{"i":"💆","nA":"الجلدية والتجميل","nE":"Dermatology","dA":"علاج الأمراض الجلدية","dE":"Skin disease treatment"},{"i":"🩺","nA":"الباطنية","nE":"Internal Med","dA":"تشخيص الأمراض الباطنية","dE":"Internal disease diagnosis"},{"i":"🔪","nA":"الجراحة العامة","nE":"General Surgery","dA":"جراحة عامة ومناظير","dE":"General & laparoscopic"},{"i":"🧠","nA":"الأعصاب","nE":"Neurology","dA":"أمراض المخ والأعصاب","dE":"Brain & nerve diseases"}];
const BR = [{"nA":"المدينة المنورة","nE":"Madinah","aA":"طريق فرع الحجاز","aE":"Al-Hijra Branch Road"},{"nA":"الرياض","nE":"Riyadh","aA":"حي الربوة","aE":"Al-Rabwa District"},{"nA":"جازان","nE":"Jazan","aA":"طريق الكورنيش","aE":"Corniche Road"},{"nA":"خميس مشيط","nE":"Khamis Mushayt","aA":"طريق الأمير سلطان","aE":"Prince Sultan Road"},{"nA":"عنيزة","nE":"Unayzah","aA":"القصيم — طريق المدينة","aE":"Al-Qassim — Medina Road"}];
const DO = [{"nA":"د. معاوية دبورة","nE":"Dr. Muawiya Daboura","sA":"جراحة التجميل","sE":"Plastic Surgery"},{"nA":"د. نهلة طالب ديب","nE":"Dr. Nahla Taleb Deeb","sA":"النساء والولادة","sE":"OB/GYN"},{"nA":"د. وسام فاروق","nE":"Dr. Wisam Farouk","sA":"النساء والولادة","sE":"OB/GYN"},{"nA":"د. أميرة البيلي","nE":"Dr. Amira Al-Bili","sA":"الجلدية","sE":"Dermatology"},{"nA":"د. سعد القحطاني","nE":"Dr. Saad Al-Qahtani","sA":"القلب","sE":"Cardiology"},{"nA":"د. ليلى الشهري","nE":"Dr. Layla Al-Shehri","sA":"طب الأطفال","sE":"Pediatrics"},{"nA":"د. عبدالله العتيبي","nE":"Dr. Abdullah Al-Otaibi","sA":"جراحة العظام","sE":"Orthopedics"},{"nA":"د. مريم الحسيني","nE":"Dr. Maryam Al-Husseini","sA":"النساء والولادة","sE":"OB/GYN"}];

const CSS = "*,::after,::before{box-sizing:border-box;margin:0;padding:0}:root{--p:#0066CC;--pd:#004A99;--a:#C9A84C;--al:#E0C878;--n:#1A2B4A;--of:#F8FAFC;--l:#F1F5F9;--g:#E8EDF3;--g3:#94A3B8;--t:#1E293B;--tl:#64748B;--s:#10B981;--d:#EF4444;--w:#F59E0B;--gr:linear-gradient(135deg,#1A2B4A,var(--p));--ga:linear-gradient(135deg,#C9A84C,#E0C878);--gg:linear-gradient(135deg,#D4A843,#F0D88A,#C9A84C);--sm:0 1px 3px rgba(0,0,0,.08);--md:0 4px 16px rgba(0,0,0,.1);--lg:0 8px 32px rgba(0,0,0,.12);--r:8px;--rm:12px;--rl:16px;--rxl:24px;--rf:9999px;--fa:Tajawal,sans-serif;--fe:Inter,sans-serif;--tr:.3s cubic-bezier(.4,0,.2,1);--cc:1280px;--hh:80px}body{font-family:var(--fa);color:var(--t);background:var(--of);line-height:1.7;overflow-x:hidden;-webkit-font-smoothing:antialiased}html{scroll-behavior:smooth}.h{position:fixed;top:0;inset-inline:0;z-index:1000;background:rgba(255,255,255,.92);-webkit-backdrop-filter:blur(24px);backdrop-filter:blur(24px);box-shadow:0 1px 0 rgba(0,0,0,.06);height:var(--hh)}.h.sc{background:rgba(255,255,255,.97);box-shadow:0 4px 20px rgba(0,0,0,.08)}.hi{max-width:var(--cc);margin:0 auto;padding:0 24px;height:100%;display:flex;align-items:center;justify-content:space-between;gap:16px}.l{display:flex;align-items:center;gap:12px;text-decoration:none}.li{width:44px;height:44px;background:var(--gr);border-radius:var(--rm);display:flex;align-items:center;justify-content:center;font-size:1.4rem;box-shadow:var(--sm)}.lt{font-size:1.05rem;font-weight:800;color:var(--n);line-height:1.2}.lt sm{display:block;font-size:.6rem;font-weight:400;color:var(--g3);text-transform:uppercase;letter-spacing:.3px}.nv{display:flex;align-items:center;gap:4px}.nv a{text-decoration:none;color:var(--t);font-weight:500;font-size:.88rem;padding:8px 14px;border-radius:var(--rf)}.nv a:hover{background:var(--l);color:var(--p)}.lb{padding:6px 14px;border-radius:var(--rf);background:var(--l);border:1px solid var(--g);cursor:pointer;font-family:inherit;font-size:.82rem;font-weight:600;color:var(--n)}.lb:hover{background:var(--g)}.btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;padding:12px 24px;border-radius:var(--rf);font-weight:600;font-size:.9rem;cursor:pointer;border:none;text-decoration:none;white-space:nowrap;font-family:inherit}.bp{background:var(--gr);color:#fff;box-shadow:var(--md)}.bp:hover{transform:translateY(-2px);box-shadow:var(--lg)}.ba{background:var(--ga);color:var(--n);box-shadow:var(--md)}.ba:hover{transform:translateY(-2px);box-shadow:var(--lg)}.bw{background:rgba(255,255,255,.95);color:var(--n);box-shadow:var(--sm)}.bw:hover{background:#fff;transform:translateY(-1px)}.bl{padding:14px 32px;font-size:1rem}.bs{padding:8px 18px;font-size:.82rem}.mb{display:none;background:none;border:none;cursor:pointer;font-size:1.5rem;color:var(--n);padding:8px;border-radius:var(--r)}.he{min-height:100vh;display:flex;align-items:center;padding-top:var(--hh);position:relative;overflow:hidden;background:var(--gr)}.he::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 20% 50%,rgba(0,163,224,.12),transparent 50%),radial-gradient(ellipse at 80% 20%,rgba(201,168,76,.08),transparent 50%)}.hp{position:absolute;inset:0;overflow:hidden}.pt{position:absolute;border-radius:50%;background:radial-gradient(circle,rgba(255,255,255,.04),transparent);animation:fl 20s ease-in-out infinite}@keyframes fl{0%,100%{transform:translate(0,0)scale(1)}25%{transform:translate(30px,-40px)scale(1.1)}50%{transform:translate(-20px,20px)scale(.95)}75%{transform:translate(15px,30px)scale(1.05)}}.he .co{position:relative;z-index:2;max-width:var(--cc);margin:0 auto;padding:40px 24px;width:100%}.hc{max-width:680px}.hb{display:inline-flex;align-items:center;gap:6px;padding:6px 16px;border-radius:var(--rf);background:rgba(16,185,129,.12);color:var(--s);font-size:.78rem;font-weight:600;margin-bottom:24px;border:1px solid rgba(16,185,129,.2);box-shadow:0 0 20px rgba(16,185,129,.08)}.hb::before{content:'';width:8px;height:8px;border-radius:50%;background:var(--s);animation:pu 2s infinite}@keyframes pu{0%,100%{opacity:1;box-shadow:0 0 0 0 rgba(16,185,129,.5)}50%{opacity:.5;box-shadow:0 0 0 6px rgba(16,185,129,0)}}.he h1{font-size:clamp(2.2rem,5.5vw,3.6rem);font-weight:900;color:#fff;line-height:1.15;margin-bottom:20px}.he h1 .gd{background:var(--gg);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}.he p{font-size:1.1rem;color:rgba(255,255,255,.75);max-width:680px;margin-bottom:32px;line-height:1.8}.hbt{display:flex;gap:12px;flex-wrap:wrap;margin-bottom:48px}.hs{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}.hst{background:rgba(255,255,255,.08);-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.1);border-radius:var(--rxl);padding:20px;text-align:center;transition:var(--tr)}.hst:hover{background:rgba(255,255,255,.12);transform:translateY(-3px);box-shadow:0 8px 24px rgba(0,0,0,.12)}.hst .nm{font-size:2rem;font-weight:800;color:#fff;display:inline}.hst .sf{font-size:1rem;font-weight:400;color:var(--a)}.hst .lb{font-size:.82rem;color:rgba(255,255,255,.6);margin-top:4px;display:block}.se{padding:80px 0}.sea{background:#fff}.sel{background:var(--of)}.co{max-width:var(--cc);margin:0 auto;padding:0 24px}.sh{text-align:center;margin-bottom:48px}.sh h2{font-size:clamp(1.5rem,3vw,2.2rem);font-weight:800;color:var(--n);margin-bottom:8px}.sh .gl{width:60px;height:3px;background:var(--gg);margin:12px auto;border-radius:2px}.sh p{color:var(--tl);font-size:1rem;margin-top:4px}.g3{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}.g4{display:grid;grid-template-columns:repeat(4,1fr);gap:20px}.g5{display:grid;grid-template-columns:repeat(5,1fr);gap:16px}.g6{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}.cd{background:#fff;border:1px solid var(--g);border-radius:var(--rxl);padding:24px;transition:var(--tr)}.cd:hover{box-shadow:var(--lg);transform:translateY(-4px);border-color:rgba(0,102,204,.1)}.ci{width:56px;height:56px;border-radius:var(--rm);background:var(--gr);display:flex;align-items:center;justify-content:center;font-size:1.5rem;margin-bottom:16px;box-shadow:var(--md)}.cd h3{font-size:1rem;font-weight:700;margin-bottom:8px;color:var(--n)}.cd p{font-size:.88rem;color:var(--tl);line-height:1.7}.dc{text-align:center}.dc .ci{margin:0 auto 16px}.dcc{text-align:center}.da{width:80px;height:80px;border-radius:50%;background:var(--ga);margin:0 auto 16px;display:flex;align-items:center;justify-content:center;font-size:1.8rem;font-weight:800;color:var(--n);box-shadow:var(--md)}.sp{color:var(--p);font-weight:600;font-size:.85rem;margin-bottom:4px}.bc{padding:0;overflow:hidden}.bh{background:var(--gr);padding:28px 24px;color:#fff}.bh h3{color:#fff;font-size:1.1rem;margin-bottom:4px}.bh .bcx{color:rgba(255,255,255,.7);font-size:.85rem;margin-top:4px}.bb{padding:24px}.bb p{color:var(--tl);font-size:.88rem;margin-bottom:16px}.cs{background:var(--gr);padding:80px 0;text-align:center;position:relative;overflow:hidden}.cs::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 50% 0,rgba(255,255,255,.05),transparent 50%)}.cs .co{position:relative;z-index:2}.cs h2{font-size:2rem;font-weight:800;color:#fff;margin-bottom:12px}.cs p{color:rgba(255,255,255,.7);margin-bottom:32px;font-size:1.05rem}.cb{display:flex;gap:12px;justify-content:center;flex-wrap:wrap}.ft{background:var(--n);color:rgba(255,255,255,.6);padding:56px 0 24px}.fg{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:32px;margin-bottom:40px}.ft h4{color:#fff;margin-bottom:16px;font-size:.95rem;font-weight:700}.ft a{color:rgba(255,255,255,.5);text-decoration:none;display:block;margin-bottom:8px;font-size:.88rem}.ft a:hover{color:var(--a);padding-inline-start:4px}.ft p{font-size:.88rem;margin-bottom:8px}.sl{display:flex;gap:12px;margin-top:16px}.sl a{width:40px;height:40px;border-radius:50%;background:rgba(255,255,255,.06);display:flex;align-items:center;justify-content:center;font-size:1.1rem;text-decoration:none;color:rgba(255,255,255,.5)}.sl a:hover{background:rgba(255,255,255,.12)}.fb{border-top:1px solid rgba(255,255,255,.08);padding-top:20px;text-align:center;font-size:.8rem}.fb .pw{color:var(--a);font-weight:600}.wa{position:fixed;bottom:24px;left:24px;width:56px;height:56px;border-radius:50%;display:flex;align-items:center;justify-content:center;z-index:99;font-size:1.6rem;text-decoration:none}.wa:hover{transform:scale(1.1)}.wa .pr{position:absolute;inset:-4px;border-radius:50%;border:2px solid rgba(37,211,102,.2)}.an{opacity:0;transform:translateY(30px);transition:all .7s cubic-bezier(.4,0,.2,1)}.an.vi{opacity:1;transform:translateY(0)}.d1{transition-delay:.1s}.d2{transition-delay:.2s}.d3{transition-delay:.3s}.d4{transition-delay:.4s}.d5{transition-delay:.5s}.d6{transition-delay:.6s}.ld{display:flex;justify-content:center;padding:40px}.spn{width:32px;height:32px;border:3px solid var(--g);border-top-color:var(--p);border-radius:50%;animation:sp .7s linear infinite}@keyframes sp{to{transform:rotate(360deg)}}.ts{position:fixed;bottom:24px;right:24px;padding:14px 24px;border-radius:var(--rm);color:#fff;font-weight:600;z-index:9999;opacity:0;transform:translateY(100px);transition:all .4s}.ts.sh{opacity:1;transform:translateY(0)}.ts.s{background:var(--s)}.ts.e{background:var(--d)}.ts.w{background:var(--w);color:#1a1a1a}.pr{position:relative}.blink{animation:blink 1.5s infinite}.ec{margin-bottom:60px}.ec-g{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:24px}.ec-c{background:#fff;border:1px solid var(--g);border-radius:var(--rxl);padding:20px;text-align:center;transition:var(--tr);position:relative;overflow:hidden}.ec-c:hover{transform:translateY(-3px);box-shadow:var(--lg);border-color:rgba(0,102,204,.15)}.ec-c.l{background:linear-gradient(180deg,#F0F7FF,#fff)}.ec-c.r{border-color:rgba(16,185,129,.25)}.ec-c.r .ec-d{border-color:var(--s)}.ec-ic{width:48px;height:48px;border-radius:50%;background:var(--gr);display:flex;align-items:center;justify-content:center;font-size:1.2rem;margin:0 auto 12px;box-shadow:var(--sm)}.ec-n{font-size:.9rem;font-weight:700;color:var(--n);margin-bottom:4px}.ec-d{font-size:.8rem;color:var(--tl);line-height:1.5}.ec-badge{position:absolute;top:8px;right:8px;display:flex;align-items:center;gap:4px;font-size:.6rem;font-weight:800;padding:3px 7px;border-radius:var(--rf);text-transform:uppercase;letter-spacing:.5px}.ec-b.ok{background:rgba(16,185,129,.12);color:var(--s)}.ec-b.warn{background:rgba(245,158,11,.12);color:var(--w)}.ec-b.off{background:rgba(239,68,68,.1);color:var(--d)}.ec-b::before{content:'';width:5px;height:5px;border-radius:50%}.ec-b.ok::before{background:var(--s)}.ec-b.warn::before{background:var(--w);animation:pu 2s infinite}.ec-b.off::before{background:var(--d)}.ec-b.pf::before{background:var(--p)}.ig{display:grid;grid-template-columns:repeat(2,1fr);gap:16px;margin-top:20px}.ig-c{background:#fff;border:1px solid var(--g);border-radius:var(--rl);padding:18px;display:flex;align-items:center;gap:14px;transition:var(--tr)}.ig-c:hover{box-shadow:var(--md);transform:translateY(-2px);border-color:rgba(0,102,204,.1)}.ig-ic{width:44px;height:44px;border-radius:var(--rm);background:var(--gr);display:flex;align-items:center;justify-content:center;font-size:1.1rem;flex-shrink:0;box-shadow:var(--sm)}.ig-c.g{background:linear-gradient(135deg,#F0FDF4,#f0fdf4)}.ig-c.w{background:linear-gradient(135deg,#FFFBEB,#fffbeb)}.ig-n{font-size:.88rem;font-weight:700;color:var(--t)}.ig-s{font-size:.75rem;color:var(--tl);margin-top:2px}.ig-b{font-size:.65rem;font-weight:800;padding:4px 10px;border-radius:var(--rf);white-space:nowrap}.ig-b.ok{background:rgba(16,185,129,.12);color:var(--s)}.ig-b.warn{background:rgba(245,158,11,.12);color:var(--w)}.ig-b.off{background:rgba(239,68,68,.1);color:var(--d)}.ai-s{background:#fff;border:1px solid var(--g);border-radius:var(--rxl);overflow:hidden;margin-top:20px;display:grid;grid-template-columns:1fr 1fr;gap:0;box-shadow:var(--md)}.ai-v{border-radius:var(--rxl) 0 0 var(--rxl);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;padding:40px;background:linear-gradient(135deg,#F0F7FF,#E8F4FF);text-align:center}.ai-v .ai-orb{width:100px;height:100px;border-radius:50%;background:var(--gr);display:grid;place-items:center;font-size:2rem;box-shadow:0 0 0 6px rgba(0,102,204,.08),0 20px 44px rgba(0,102,204,.16);position:relative}.ai-v .ai-orb::before{content:'';position:absolute;inset:-8px;border-radius:50%;border:2px solid rgba(0,102,204,.15);animation:pu 3s infinite}.ai-v .ai-orb::after{content:'';position:absolute;inset:-16px;border-radius:50%;border:1px solid rgba(0,102,204,.08);animation:pu 3s infinite .5s}.ai-v p{font-size:.9rem;color:var(--tl);max-width:280px}.ai-c{padding:40px;border-radius:0 var(--rxl) var(--rxl) 0;display:flex;flex-direction:column;justify-content:center;gap:16px}.ai-c h3{font-size:1.2rem;font-weight:800;color:var(--n);margin-bottom:4px}.ai-c p{font-size:.85rem;color:var(--tl);line-height:1.6}.ai-btns{display:flex;gap:10px;flex-wrap:wrap}.ai-btns .btn{gap:8px}.pf{display:inline-flex;align-items:center;gap:6px;padding:4px 10px;border-radius:var(--rf);background:rgba(0,102,204,.08);color:var(--p);font-size:.68rem;font-weight:700;font-family:inherit;cursor:pointer;border:none;transition:var(--tr)}.pf:hover{background:rgba(0,102,204,.14)}.eh{display:flex;flex-wrap:wrap;gap:6px;margin-top:8px}.eh-c{padding:3px 8px;border-radius:var(--rf);background:rgba(201,168,76,.1);color:var(--a);font-size:.6rem;font-weight:700}.mb{display:none;background:none;border:none;cursor:pointer;font-size:1.5rem;color:var(--n);padding:8px;border-radius:var(--r)}@media(max-width:1024px){.ec-g{grid-template-columns:1fr 1fr}}@media(max-width:900px){.nv{display:none}.mb{display:block}.nv.op{display:flex;flex-direction:column;position:fixed;inset:0;background:#fff;padding:80px 24px 24px;z-index:500;gap:0}.nv.op a{padding:14px 0;border-bottom:1px solid var(--g);border-radius:0}.hs,.g3,.g4{grid-template-columns:1fr 1fr}.fg{grid-template-columns:1fr 1fr}.ec-g{grid-template-columns:1fr 1fr}.ig{grid-template-columns:1fr}.ai-s{grid-template-columns:1fr}.ai-v{border-radius:var(--rxl) var(--rxl) 0 0}.ai-c{border-radius:0 0 var(--rxl) var(--rxl)}}@media(max-width:480px){.hs,.g3,.g4,.fg,.ec-g{grid-template-columns:1fr}}";


function hdr(t,p) {
  return '<header class="h" id="hdr"><div class="hi"><a href="/" class="l"><div class="li">\u{1F3E5}</div><div class="lt">'+t.titleShort+'<sm>'+t.osVer+'</sm></div></a><nav class="nv" id="mn"><a href="#depts">'+t.navDepts+'</a><a href="#branches">'+t.navBranches+'</a><a href="#doctors">'+t.navDoctors+'</a><a href="#ecosystem"><span style="font-size:.75rem;opacity:.6;">\u{1F310}</span> '+t.navEcosystem+'</a><button class="lb" id="lb">'+t.langBtn+'</button><a href="tel:'+p+'" class="btn bp bs">'+t.navBook+'</a></nav><button class="mb" onclick="document.getElementById(\'mn\').classList.toggle(\'op\');return false;">\u{2630}</button></div></header>';
}

function ecoSys(t) {
  return '<section class="se sea" id="ecosystem"><div class="co"><div class="sh an"><h2>'+t.ecosystemTitle+'</h2><div class="gl"></div><p>'+t.ecosystemSub+'</p></div><div class="ec"><h3 style="font-size:1.1rem;font-weight:700;color:var(--n);margin-bottom:16px;">\u{1F465} '+t.navPortal+'</h3><div class="ec-g">'+
    '  <a href="/patient" class="ec-c an d1"><div class="ec-badge ok pf">Live</div><div class="ec-ic" style="background:linear-gradient(135deg,#0066CC,#0EA5E9)">\u{1F9D1}\u200D\u{1F3EB}</div><div class="ec-n">'+t.patientTitle+'</div><div class="ec-d">'+t.patientDesc+'</div></a>'+
    '  <a href="/provider" class="ec-c an d2"><div class="ec-badge ok pf">Live</div><div class="ec-ic" style="background:linear-gradient(135deg,#10B981,#34D399)">\u{2B50}</div><div class="ec-n">'+t.providerTitle+'</div><div class="ec-d">'+t.providerDesc+'</div></a>'+
    '  <a href="/payer" class="ec-c an d3"><div class="ec-badge ok pf">Live</div><div class="ec-ic" style="background:linear-gradient(135deg,#F59E0B,#FBBF24)">\u{1F3E6}</div><div class="ec-n">'+t.payerTitle+'</div><div class="ec-d">'+t.payerDesc+'</div></a>'+
    '  <a href="/student" class="ec-c an d4"><div class="ec-badge ok pf">Live</div><div class="ec-ic" style="background:linear-gradient(135deg,#8B5CF6,#A78BFA)">\u{1F393}</div><div class="ec-n">'+t.studentTitle+'</div><div class="ec-d">'+t.studentDesc+'</div></a>'+
    '  <a href="/reception" class="ec-c an d5"><div class="ec-badge ok pf">Live</div><div class="ec-ic" style="background:linear-gradient(135deg,#EC4899,#F472B6)">\u{1F481}</div><div class="ec-n">'+t.receptionTitle+'</div><div class="ec-d">'+t.receptionDesc+'</div></a>'+
    '  <a href="/admin" class="ec-c an d6 l"><div class="ec-badge warn pf">Secure</div><div class="ec-ic" style="background:linear-gradient(135deg,#64748B,#94A3B8)">\u{1F512}</div><div class="ec-n">'+t.adminTitle+'</div><div class="ec-d">'+t.adminDesc+'</div></a>'+
    '  <a href="/rcm" class="ec-c an d5 l"><div class="ec-badge warn pf">Secure</div><div class="ec-ic" style="background:linear-gradient(135deg,#DC2626,#EF4444)">\u{1F4B0}</div><div class="ec-n">'+t.rcmTitle+'</div><div class="ec-d">'+t.rcmDesc+'</div></a>'+
    '  <a href="https://bsma.elfadil.com" target="_blank" class="ec-c an d6 r"><div class="ec-badge ok">BSMA</div><div class="ec-ic" style="background:linear-gradient(135deg,#059669,#10B981)">\u{1F399}\uFE0F</div><div class="ec-n">'+t.bsmaPortal+'</div><div class="ec-d">'+t.aiDesc+'</div></a>'+
  '</div></div><div class="ec"><h3 style="font-size:1.1rem;font-weight:700;color:var(--n);margin-bottom:16px;">\u{1F517} '+t.integrationsTitle+'</h3><div class="ig" id="liveStatus"><div class="ld"><div class="spn"></div></div></div></div><div class="ec"><h3 style="font-size:1.1rem;font-weight:700;color:var(--n);margin-bottom:16px;">\u{1F916} '+t.aiTitle+'</h3><div class="ai-s"><div class="ai-v"><div class="ai-orb">\u{1F399}\uFE0F</div><p>'+t.aiDesc+'</p></div><div class="ai-c"><h3>'+t.aiTitle+'</h3><p>'+t.aiDesc+'</p><div class="ai-btns"><a href="https://bsma.elfadil.com" target="_blank" class="btn ba bs">'+t.aiTalkBtn+'</a><a href="/patient" class="btn bp bs">'+t.aiChatBtn+'</a></div><div class="eh"><span class="eh-c">DeepSeek AI</span><span class="eh-c">Oracle Health</span><span class="eh-c">NPHIES</span><span class="eh-c">Multi-language</span></div></div></div></div></div></section>';
}

function bdy(t,A,p) {
  var dir = A ? "right" : "left";
  return '<section class="he"><div class="hp"><div class="pt" style="width:120px;height:120px;top:10%;'+dir+':15%"></div><div class="pt" style="width:80px;height:80px;top:60%;'+dir+':70%;animation-delay:3s"></div><div class="pt" style="width:60px;height:60px;top:30%;'+dir+':40%;animation-delay:6s"></div><div class="pt" style="width:100px;height:100px;top:70%;'+dir+':20%;animation-delay:2s"></div></div><div class="co"><div class="hc"><div class="hb">\u25CF '+t.heroBadge+'</div><h1>'+t.heroH1+'</h1><p>'+t.heroP+'</p><div class="hbt"><a href="tel:'+p+'" class="btn ba bl">'+t.heroBookBtn+'</a><a href="#ecosystem" class="btn bw bl">\u{1F310} '+t.navEcosystem+'</a></div><div class="hs" id="hs"><div class="hst"><span class="nm" id="sd">\u2014</span><span class="sf">+</span><span class="lb">'+t.statDoctors+'</span></div><div class="hst"><span class="nm">5</span><span class="lb">'+t.statBranches+'</span></div><div class="hst"><span class="nm" id="sdp">\u2014</span><span class="sf">+</span><span class="lb">'+t.statDepts+'</span></div><div class="hst"><span class="nm">1200</span><span class="sf">+</span><span class="lb">'+t.statBeds+'</span></div></div></div></div></section>';
}

function ftr(t,p) {
  return '<footer class="ft"><div class="co"><div class="fg"><div><h4>\u{1F3E5} '+t.titleShort+'</h4><p>'+t.fAbout+'</p><div class="sl"><a href="https://wa.me/'+p+'" target="_blank">\u{1F4AC}</a><a href="tel:'+p+'">\u{1F4DE}</a><a href="mailto:info@hayathospitals.com">\u{1F4E7}</a></div></div><div><h4>'+t.fLinks+'</h4><a href="#depts">'+t.navDepts+'</a><a href="#branches">'+t.navBranches+'</a><a href="#doctors">'+t.navDoctors+'</a><a href="#ecosystem">'+t.fEcosystem+'</a><a href="/portal">'+t.fPortal+'</a></div><div><h4>'+t.fServices+'</h4><a href="tel:'+p+'">'+t.fEmerg+'</a><a href="tel:'+p+'">'+t.fAppt+'</a><a href="https://bsma.elfadil.com" target="_blank">'+t.fBSMA+'</a></div><div><h4>'+t.fContact+'</h4><a href="tel:'+p+'">\u{1F4DE} +'+p+'</a><a href="mailto:info@hayathospitals.com">\u{1F4E7} info@hayathospitals.com</a><a href="https://wa.me/'+p+'" target="_blank">\u{1F4AC} WhatsApp</a></div></div><div class="fb"><p>'+t.fCopy+'</p><p style="margin-top:4px;font-size:.78rem;">'+t.fPowered+' <span class="pw">BrainSAIT Healthcare OS v5.0</span></p></div></div></footer><a href="https://wa.me/'+p+'" class="wa" target="_blank">\u{1F4AC}<div class="pr"></div></a><div class="ts" id="ts"></div>';
}


function scr(A,p,t) {
  return '<script>' +
'\n(function(){' +
'\n  var isAr = '+(A?'true':'false')+';' +
'\n  var phone = "'+p+'";' +
'\n  function rd(){' +
'\n    var g=document.getElementById("dg");if(!g)return;' +
'\n    g.innerHTML=DE.map(function(d,i){' +
'\n      return "<div class=\"cd dc an d\"+(i%4+1)+\"\"><div class=\"ci\">"+d.i+"</div><h3>"+(isAr?d.nA:d.nE)+"</h3><p>"+(isAr?d.dA:d.dE)+"</p></div>";' +
'\n    }).join("");' +
'\n  }' +
'\n  function rb(){' +
'\n    var g=document.getElementById("bg");if(!g)return;' +
'\n    g.innerHTML=BR.map(function(b,i){' +
'\n      return "<div class=\"cd bc an d\"+(i%3+1)+\"\"><div class=\"bh\"><h3>"+(isAr?b.nA:b.nE)+"</h3><div class=\"bcx\">"+(isAr?b.aA:b.aE)+"</div></div><div class=\"bb\"><a href=\"tel:\"+phone+"\" class=\"btn bp bs\">"+(isAr?"\u0627\u062A\u0635\u0644":"Call")+"</a><a href=\"/branches/\"+(isAr?b.nA.toLowerCase().replace(/\\s/g,"-"):b.nE.toLowerCase().replace(/\\s/g,"-"))+"\" class=\"btn bw bs\">"+(isAr?"\u0627\u0644\u0645\u0632\u064A\u062F":"Details")+"</a></div></div>";' +
'\n    }).join("");' +
'\n  }' +
'\n  function rdo(){' +
'\n    var g=document.getElementById("dog");if(!g)return;' +
'\n    g.innerHTML=DO.map(function(d,i){' +
'\n      return "<div class=\"cd dcc an d\"+(i%4+1)+\"\"><div class=\"da\">"+d.nA.charAt(2)+"</div><h3>"+(isAr?d.nA:d.nE)+"</h3><div class=\"sp\">"+(isAr?d.sA:d.sE)+"</div><a href=\"tel:\"+phone+"\" class=\"btn bp bs\">"+(isAr?"\u0627\u062D\u062C\u0632":"Book")+"</a></div>";' +
'\n    }).join("");' +
'\n  }' +
'\n  function ls(){' +
'\n    fetch("/api/stats").then(function(r){return r.json();}).then(function(d){' +
'\n      if(d.success){' +
'\n        var e1=document.getElementById("sd"),e2=document.getElementById("sdp");' +
'\n        if(e1)e1.textContent=(d.stats&&d.stats.total_providers||700).toLocaleString();' +
'\n        if(e2)e2.textContent=(d.stats&&d.stats.total_departments||42).toLocaleString();' +
'\n      }' +
'\n    }).catch(function(){});' +
'\n  }' +
'\n  function loadIntegrations(){' +
'\n    var cont=document.getElementById("liveStatus");if(!cont)return;' +
'\n    fetch("/api/health").then(function(r){return r.json();}).then(function(d){' +
'\n      if(!d.success||!d.integrations){cont.innerHTML="<div style=\"grid-column:1/-1;text-align:center;padding:20px;color:var(--tl);font-size:.88rem;\">'+t.statusOffline+'</div>";return;}' +
'\n      var ints=[{key:"oracle_bridge",icon:"\u{1F310}",name:"'+t.oracleBridge+'"},{key:"nphies_mirror",icon:"\u{1F4CB}",name:"'+t.nphiesPortal+'"},{key:"claimlinc",icon:"\u{1F4B0}",name:"'+t.claimlincPortal+'"},{key:"bsma_portal",icon:"\u{1F399}\uFE0F",name:"'+t.bsmaPortal+'"},{key:"sbs_portal",icon:"\u{1F4E6}",name:"'+t.sbsPortal+'"},{key:"givc_portal",icon:"\u{1F504}",name:"'+t.givcPortal+'"}];' +
'\n      var html="";' +
'\n      ints.forEach(function(item){' +
'\n        var status=d.integrations[item.key]||"unknown";' +
'\n        var ok=status==="connected"||status==="live";' +
'\n        var warn=status==="warning"||status==="degraded";' +
'\n        html+="<div class=\"ig-c \"+(ok?"g":warn?"w":"")+"\"><div class=\"ig-ic\">"+item.icon+"</div><div style=\"flex:1\"><div class=\"ig-n\">"+item.name+"</div><div class=\"ig-s\">"+(d.integrations.oracle_tunnel&&item.key==="oracle_bridge"?d.integrations.oracle_tunnel:"")+"</div></div><span class=\"ig-b \"+(ok?"ok":warn?"warn":"off")+"\">"+(ok?"'+t.statusConnected+'\":warn?"'+t.statusWarning+'\":"'+t.statusOffline+'\")+"</span></div>";' +
'\n      });' +
'\n      cont.innerHTML=html;' +
'\n      // NPHIES stats from health endpoint' +
'\n      if(d.nphies_mirror){' +
'\n        var ec=document.querySelector(".ec-c.r");' +
'\n        if(ec){' +
'\n          var extra=ec.querySelector(".ec-d");' +
'\n          if(extra)extra.innerHTML+="<br><span style=\"color:var(--s);font-size:.72rem;\">GSS: "+d.nphies_mirror.total_gss+" | PA: "+d.nphies_mirror.total_pa+"</span>";' +
'\n        }' +
'\n      }' +
'\n    }).catch(function(){' +
'\n      cont.innerHTML="<div style=\"grid-column:1/-1;text-align:center;padding:20px;color:var(--d);font-size:.88rem;\">'+t.statusOffline+'</div>";' +
'\n    });' +
'\n  }' +
'\n  window.addEventListener("scroll",function(){' +
'\n    var h=document.getElementById("hdr");' +
'\n    if(h)h.classList.toggle("sc",window.scrollY>50);' +
'\n  });' +
'\n  var lb=document.getElementById("lb");' +
'\n  if(lb)lb.addEventListener("click",function(){' +
'\n    window.location.href=window.location.pathname+"?lang="+(isAr?"en":"ar");' +
'\n  });' +
'\n  var ob=new IntersectionObserver(function(es){' +
'\n    es.forEach(function(e){if(e.isIntersecting)e.target.classList.add("vi");});' +
'\n  },{threshold:0.1});' +
'\n  document.querySelectorAll(".an").forEach(function(el){ob.observe(el);});' +
'\n  rd();rb();rdo();ls();loadIntegrations();' +
'\n  setTimeout(function(){' +
'\n    document.querySelectorAll(".an").forEach(function(el){' +
'\n      if(el.getBoundingClientRect().top<window.innerHeight)el.classList.add("vi");' +
'\n    });' +
'\n  },500);' +
'\n})();' +
'<\/script>';
}



export function servePage(req) {
  var url = new URL(req.url);
  var path = url.pathname.replace(/\/index\.html$/, '/').replace(/^\//, '') || 'index';
  path = path.replace(/\.html$/, '') || 'index';
  
  // Check for course pages
  var courseMatch = path.match(/^course-(.+)$/);
  if (courseMatch) {
    var courseKey = courseMatch[0].replace(/-/g, '_');
    if (S[courseKey]) {
      return new Response(S[courseKey], {
        headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'public, max-age=600' }
      });
    }
  }
  
  // Premium homepage (serves the ecosystem hub)
  if (path === '' || path === '/' || path === 'index' || path === 'index.html') {
    path = '__HOME__'; // skip static pages check below
  }
  
  // Check for other static pages (not homepage)
  if (path !== '__HOME__' && STATIC_PAGES[path]) {
    return new Response(STATIC_PAGES[path], {
      headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'public, max-age=600' }
    });
  }
  
  // Also check for course-"something" in the path directly
  if (path.startsWith('course-')) {
    var altKey = path.replace(/-/g, '_');
    if (S[altKey]) {
      return new Response(S[altKey], {
        headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'public, max-age=600' }
      });
    }
  }

  // Premium homepage with ecosystem hub
  var lang = url.searchParams.get('lang') || 'ar';
  var t = L[lang] || L.ar;
  var A = lang === 'ar';
  var d = A ? 'rtl' : 'ltr';
  var p = '966920000094';

  var html = '<!DOCTYPE html><html lang="' + lang + '" dir="' + d + '"><head>';
  html += '<meta charset="utf-8"/>';
  html += '<meta name="viewport" content="width=device-width,initial-scale=1.0"/>';
  html += '<meta name="description" content="' + t.desc + '"/>';
  html += '<meta name="theme-color" content="#1A2B4A"/>';
  html += '<meta property="og:title" content="' + t.title + '"/>';
  html += '<meta property="og:description" content="' + t.desc + '"/>';
  html += '<meta property="og:type" content="website"/>';
  html += '<link rel="canonical" href="https://hnh.brainsait.org"/>';
  html += '<link rel="alternate" href="https://hnh.brainsait.org?lang=ar" hreflang="ar"/>';
  html += '<link rel="alternate" href="https://hnh.brainsait.org?lang=en" hreflang="en"/>';
  html += '<link rel="alternate" href="https://hnh.brainsait.org" hreflang="x-default"/>';
  html += '<title>' + t.title + '</title>';
  html += '<link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 100 100%27%3E%3Ctext y=%27.9em%27 font-size=%2790%27%3E%F0%9F%8F%A5%3C/text%3E%3C/svg%3E"/>';
  html += '<link rel="preconnect" href="https://fonts.googleapis.com">';
  html += '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>';
  html += '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Tajawal:wght@300;400;500;700;800;900&display=swap" rel="stylesheet">';
  html += '<style>' + CSS + '</style></head><body>';

  html += hdr(t, p);
  html += bdy(t, A, p);
  html += '<section class="se sel" id="depts"><div class="co"><div class="sh an"><h2>' + t.secDeptsTitle + '</h2><div class="gl"></div><p>' + t.secDeptsSub + '</p></div><div class="g4" id="dg"><div class="ld"><div class="spn"></div></div></div></div></section>';
  html += '<section class="se sea" id="branches"><div class="co"><div class="sh an"><h2>' + t.secBranchesTitle + '</h2><div class="gl"></div><p>' + t.secBranchesSub + '</p></div><div class="g3" id="bg"><div class="ld"><div class="spn"></div></div></div></div></section>';
  html += '<section class="se sel" id="doctors"><div class="co"><div class="sh an"><h2>' + t.secDoctorsTitle + '</h2><div class="gl"></div><p>' + t.secDoctorsSub + '</p></div><div class="g4" id="dog"><div class="ld"><div class="spn"></div></div></div></div></section>';
  html += ecoSys(t);
  html += '<section class="cs"><div class="co"><h2>' + t.ctaTitle + '</h2><p>' + t.ctaSub + '</p><div class="cb"><a href="tel:' + p + '" class="btn ba bl">' + t.ctaBook + '</a><a href="#ecosystem" class="btn bw bl">\u{1F310} ' + t.navEcosystem + '</a></div></div></section>';
  html += ftr(t, p);
  html += scr(A, p, t);
  html += '</body></html>';

  return new Response(html, {
    headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'public, max-age=300' }
  });
}
