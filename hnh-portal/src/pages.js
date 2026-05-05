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
    "desc": "مجموعة مستشفيات الحياة الوطني — منظومة صحية متكاملة مع بسمة و GIVC و SBS و Oracle و NPHIES.",
    "title": "مستشفيات الحياة الوطني | HNH — المنظومة المتكاملة",
    "titleShort": "مستشفى الحياة الوطني",
    "osVer": "BrainSAIT Healthcare OS v5.0",
    "heroBadge": "بيانات حية — متصل بـ BrainSAIT",
    "heroH1": "مجموعة مستشفيات<br><span class=\"gd\">الحياة الوطني</span>",
    "heroP": "منظومة صحية ذكية متكاملة — بسمة الصوتية · GIVC · SBS · Oracle · NPHIES · ClaimLinc",
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
    "navCommand": "المركز الحي",
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
    "givcTitle": "GIVC — الرعاية الافتراضية المتكاملة",
    "givcDesc": "Global Integrated Virtual Care — شبكة الأطباء، تسجيل المزودين، التحقق من الأهلية مع OID",
    "givcRegister": "تسجيل طبيب جديد",
    "givcNetwork": "تصفح الشبكة",
    "givcOidLabel": "رقم التعريف (OID)",
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
    "fBasma": "بسمة AI",
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
    "basmaPortal": "بسمة AI",
    "sbsPortal": "SBS",
    "givcPortal": "GIVC",
    "searchTitle": "البحث الذكي بالذكاء الاصطناعي",
    "searchSub": "اسأل عن أي طبيب أو قسم أو إجراء أو دواء — إجابات فورية من قاعدة معرفة المستشفى",
    "searchPlaceholder": "مثال: أطباء القلب، ساعات الطوارئ، التأمين الطبي، الرعاية المنزلية...",
    "searchBtn": "🔍 ابحث الآن",
    "hcTitle": "الرعاية الصحية المنزلية",
    "hcSub": "فريق متخصص يأتي إليك",
    "hcDesc": "زيارات منزلية من ممرضات وأطباء معتمدين — فحوصات، علاج وريدي، رعاية ما بعد الجراحة، متابعة الأمراض المزمنة.",
    "thTitle": "التطبيب عن بُعد",
    "thSub": "استشارة طبية من أي مكان",
    "thDesc": "تحدث مع طبيبك فيديو أو صوت — دون الحاجة للزيارة. متاح 24/7 مع أطباء الحياة الوطني.",
    "digitalTitle": "الخدمات الصحية الرقمية",
    "digitalSub": "ابتكار رقمي في خدمة صحتك — بحث ذكي، رعاية منزلية، واستشارات فيديو مباشرة",
    "emailTitle": "التواصل الإلكتروني الذكي",
    "emailDesc": "تأكيدات، تذكيرات، ووصفات إلكترونية — بريد ذكي ثنائي اللغة لكل مريض.",
    "openAction": "افتح الخدمة",
    "bookModalTitle": "حجز موعد سريع",
    "basmaModalTitle": "بسمة داخل HNH",
    "homecareModalTitle": "جدولة زيارة منزلية",
    "telehealthModalTitle": "إنشاء جلسة تطبيب عن بعد",
    "eligModalTitle": "تحقق التأمين والأهلية",
    "quickName": "اسم المريض",
    "quickPhone": "رقم الجوال",
    "quickNational": "الهوية / الإقامة",
    "quickInsurance": "رقم التأمين",
    "quickDept": "القسم",
    "quickDate": "التاريخ",
    "quickTime": "الوقت",
    "quickAddress": "العنوان",
    "quickComplaint": "سبب الطلب",
    "sendRequest": "إرسال الطلب",
    "askBasma": "اسأل بسمة",
    "resultReady": "تم تنفيذ العملية",
    "missingFields": "أكمل الحقول المطلوبة",
    "failedAction": "تعذر تنفيذ الطلب. حاول لاحقاً."
    ,"commandTitle": "مركز التحكم الحي"
    ,"commandSub": "مؤشرات تشغيلية مباشرة من HNH و GIVC و NPHIES و ClaimLinc — صفحة واحدة لمراقبة الحركة السريرية والرقمية."
    ,"opsPatients": "ملفات المرضى"
    ,"opsAppointments": "مواعيد اليوم"
    ,"opsProviders": "مزود صحي"
    ,"opsClaims": "مطالبة"
    ,"homecareMetric": "زيارات منزلية"
    ,"telehealthMetric": "جلسات عن بعد"
    ,"givcMetric": "أطباء GIVC"
    ,"connectedMetric": "أنظمة متصلة"
    ,"featureTitle": "ميزات جديدة جاهزة للتشغيل"
    ,"featureSub": "خدمات رقمية متصلة مباشرة بواجهات HNH — لا نماذج وهمية، كل إجراء يستدعي API حي."
    ,"featureProvider": "لوحة الطبيب"
    ,"featureProviderDesc": "مساحة عمل للطبيب مع المواعيد، المرضى، FHIR، GIVC، و NPHIES."
    ,"featureEligibility": "تحقق الأهلية عبر GIVC"
    ,"featureEligibilityDesc": "نقطة دخول مباشرة لفحص التغطية وربط OID وشبكة الأطباء."
    ,"featureHomecare": "الرعاية المنزلية"
    ,"featureHomecareDesc": "جدولة زيارة منزلية مع سبب الطلب والعنوان والوقت."
    ,"featureTelehealth": "التطبيب عن بعد"
    ,"featureTelehealthDesc": "إنشاء جلسة رقمية مع رابط غرفة Telehealth فوري."
    ,"featureSearch": "البحث الطبي الذكي"
    ,"featureSearchDesc": "AutoRAG و DeepSeek للبحث في معرفة المستشفى."
    ,"featureRcm": "دورة الإيرادات"
    ,"featureRcmDesc": "صحة ClaimLinc، المطالبات، والتدقيق قبل الإرسال."
    ,"launch": "تشغيل"
  },
  "en": {
    "desc": "Hayat National Hospitals Group — Integrated Healthcare Ecosystem with Basma, GIVC, SBS, Oracle & NPHIES portals.",
    "title": "Hayat National Hospitals | HNH — Integrated Ecosystem",
    "titleShort": "Hayat National Hospital",
    "osVer": "BrainSAIT Healthcare OS v5.0",
    "heroBadge": "Live Data — Connected to BrainSAIT",
    "heroH1": "Hayat National<br><span class=\"gd\">Hospitals Group</span>",
    "heroP": "Integrated Smart Healthcare — Basma Voice · GIVC · SBS · Oracle · NPHIES · ClaimLinc",
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
    "navCommand": "Live OS",
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
    "givcTitle": "GIVC — Global Integrated Virtual Care",
    "givcDesc": "Provider network, doctor registration, OID-based eligibility verification",
    "givcRegister": "Register New Doctor",
    "givcNetwork": "Browse Network",
    "givcOidLabel": "Identifier (OID)",
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
    "fBasma": "Basma AI",
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
    "basmaPortal": "Basma AI",
    "sbsPortal": "SBS Portal",
    "givcPortal": "GIVC Portal",
    "searchTitle": "AI-Powered Smart Search",
    "searchSub": "Ask about any doctor, department, procedure, or medication — instant answers from hospital knowledge base",
    "searchPlaceholder": "e.g. cardiologists, emergency hours, insurance, home care...",
    "searchBtn": "🔍 Search Now",
    "hcTitle": "Home Healthcare",
    "hcSub": "Our team comes to you",
    "hcDesc": "Home visits by certified nurses and doctors — checkups, IV therapy, post-surgery care, chronic disease management.",
    "thTitle": "Telehealth",
    "thSub": "Medical consultation anywhere",
    "thDesc": "Video or voice consultation with your doctor — no hospital visit needed. 24/7 with HNH specialists.",
    "digitalTitle": "Digital Health Services",
    "digitalSub": "Smart innovation in healthcare — AI search, home care, and live video consultations",
    "emailTitle": "Smart Patient Communications",
    "emailDesc": "Confirmations, reminders, and e-prescriptions — bilingual smart email for every patient.",
    "openAction": "Open service",
    "bookModalTitle": "Quick appointment booking",
    "basmaModalTitle": "Basma inside HNH",
    "homecareModalTitle": "Schedule home care visit",
    "telehealthModalTitle": "Create telehealth session",
    "eligModalTitle": "Insurance and eligibility check",
    "quickName": "Patient name",
    "quickPhone": "Mobile number",
    "quickNational": "National / Iqama ID",
    "quickInsurance": "Insurance ID",
    "quickDept": "Department",
    "quickDate": "Date",
    "quickTime": "Time",
    "quickAddress": "Address",
    "quickComplaint": "Reason",
    "sendRequest": "Submit request",
    "askBasma": "Ask Basma",
    "resultReady": "Action completed",
    "missingFields": "Complete the required fields",
    "failedAction": "Unable to complete the request. Try again later."
    ,"commandTitle": "Live Command Center"
    ,"commandSub": "Operational signals from HNH, GIVC, NPHIES, and ClaimLinc — one view for clinical and digital throughput."
    ,"opsPatients": "Patient records"
    ,"opsAppointments": "Today visits"
    ,"opsProviders": "Providers"
    ,"opsClaims": "Claims"
    ,"homecareMetric": "Home visits"
    ,"telehealthMetric": "Telehealth sessions"
    ,"givcMetric": "GIVC doctors"
    ,"connectedMetric": "Connected systems"
    ,"featureTitle": "New Features Ready To Launch"
    ,"featureSub": "Digital services wired directly to HNH APIs — no static mockups, every action opens a live workflow."
    ,"featureProvider": "Doctor Dashboard"
    ,"featureProviderDesc": "Clinical workspace with appointments, patients, FHIR, GIVC, and NPHIES context."
    ,"featureEligibility": "GIVC Eligibility"
    ,"featureEligibilityDesc": "Direct entry for coverage checks, provider OIDs, and network verification."
    ,"featureHomecare": "Home Healthcare"
    ,"featureHomecareDesc": "Schedule field-care visits with address, timing, and reason."
    ,"featureTelehealth": "Telehealth Rooms"
    ,"featureTelehealthDesc": "Create digital sessions with instant room links."
    ,"featureSearch": "AI Medical Search"
    ,"featureSearchDesc": "AutoRAG and DeepSeek across hospital knowledge."
    ,"featureRcm": "Revenue Cycle"
    ,"featureRcmDesc": "ClaimLinc health, claims status, and pre-submission checks."
    ,"launch": "Launch"
  }
};

const DE = [{"i":"❤️","nA":"القلب والأوعية","nE":"Cardiology","dA":"تشخيص وعلاج أمراض القلب","dE":"Heart disease diagnosis"},{"i":"🦴","nA":"جراحة العظام","nE":"Orthopedics","dA":"جراحة المفاصل والكسور","dE":"Joint surgery & fractures"},{"i":"👶","nA":"طب الأطفال","nE":"Pediatrics","dA":"رعاية الأطفال حديثي الولادة","dE":"Newborn & child care"},{"i":"👩","nA":"النساء والولادة","nE":"OB/GYN","dA":"متابعة الحمل والولادة","dE":"Pregnancy & delivery"},{"i":"💆","nA":"الجلدية والتجميل","nE":"Dermatology","dA":"علاج الأمراض الجلدية","dE":"Skin disease treatment"},{"i":"🩺","nA":"الباطنية","nE":"Internal Med","dA":"تشخيص الأمراض الباطنية","dE":"Internal disease diagnosis"},{"i":"🔪","nA":"الجراحة العامة","nE":"General Surgery","dA":"جراحة عامة ومناظير","dE":"General & laparoscopic"},{"i":"🧠","nA":"الأعصاب","nE":"Neurology","dA":"أمراض المخ والأعصاب","dE":"Brain & nerve diseases"}];
const BR = [{"nA":"المدينة المنورة","nE":"Madinah","aA":"طريق فرع الحجاز","aE":"Al-Hijra Branch Road"},{"nA":"الرياض","nE":"Riyadh","aA":"حي الربوة","aE":"Al-Rabwa District"},{"nA":"جازان","nE":"Jazan","aA":"طريق الكورنيش","aE":"Corniche Road"},{"nA":"خميس مشيط","nE":"Khamis Mushayt","aA":"طريق الأمير سلطان","aE":"Prince Sultan Road"},{"nA":"عنيزة","nE":"Unayzah","aA":"القصيم — طريق المدينة","aE":"Al-Qassim — Medina Road"}];
const DO = [{"nA":"د. معاوية دبورة","nE":"Dr. Muawiya Daboura","sA":"جراحة التجميل","sE":"Plastic Surgery"},{"nA":"د. نهلة طالب ديب","nE":"Dr. Nahla Taleb Deeb","sA":"النساء والولادة","sE":"OB/GYN"},{"nA":"د. وسام فاروق","nE":"Dr. Wisam Farouk","sA":"النساء والولادة","sE":"OB/GYN"},{"nA":"د. أميرة البيلي","nE":"Dr. Amira Al-Bili","sA":"الجلدية","sE":"Dermatology"},{"nA":"د. سعد القحطاني","nE":"Dr. Saad Al-Qahtani","sA":"القلب","sE":"Cardiology"},{"nA":"د. ليلى الشهري","nE":"Dr. Layla Al-Shehri","sA":"طب الأطفال","sE":"Pediatrics"},{"nA":"د. عبدالله العتيبي","nE":"Dr. Abdullah Al-Otaibi","sA":"جراحة العظام","sE":"Orthopedics"},{"nA":"د. مريم الحسيني","nE":"Dr. Maryam Al-Husseini","sA":"النساء والولادة","sE":"OB/GYN"}];

const CSS = "*,::after,::before{box-sizing:border-box;margin:0;padding:0}:root{--p:#0066CC;--pd:#004A99;--a:#C9A84C;--al:#E0C878;--n:#1A2B4A;--of:#F8FAFC;--l:#F1F5F9;--g:#E8EDF3;--g3:#94A3B8;--t:#1E293B;--tl:#64748B;--s:#10B981;--d:#EF4444;--w:#F59E0B;--gr:linear-gradient(135deg,#1A2B4A,var(--p));--ga:linear-gradient(135deg,#C9A84C,#E0C878);--gg:linear-gradient(135deg,#D4A843,#F0D88A,#C9A84C);--sm:0 1px 3px rgba(0,0,0,.08);--md:0 4px 16px rgba(0,0,0,.1);--lg:0 8px 32px rgba(0,0,0,.12);--r:8px;--rm:12px;--rl:16px;--rxl:24px;--rf:9999px;--fa:Tajawal,sans-serif;--fe:Inter,sans-serif;--tr:.3s cubic-bezier(.4,0,.2,1);--cc:1280px;--hh:80px}body{font-family:var(--fa);color:var(--t);background:var(--of);line-height:1.7;overflow-x:hidden;-webkit-font-smoothing:antialiased}html{scroll-behavior:smooth}.h{position:fixed;top:0;inset-inline:0;z-index:1000;background:rgba(255,255,255,.92);-webkit-backdrop-filter:blur(24px);backdrop-filter:blur(24px);box-shadow:0 1px 0 rgba(0,0,0,.06);height:var(--hh)}.h.sc{background:rgba(255,255,255,.97);box-shadow:0 4px 20px rgba(0,0,0,.08)}.hi{max-width:var(--cc);margin:0 auto;padding:0 24px;height:100%;display:flex;align-items:center;justify-content:space-between;gap:16px}.l{display:flex;align-items:center;gap:12px;text-decoration:none}.li{width:44px;height:44px;background:var(--gr);border-radius:var(--rm);display:flex;align-items:center;justify-content:center;font-size:1.4rem;box-shadow:var(--sm)}.lt{font-size:1.05rem;font-weight:800;color:var(--n);line-height:1.2}.lt sm{display:block;font-size:.6rem;font-weight:400;color:var(--g3);text-transform:uppercase;letter-spacing:.3px}.nv{display:flex;align-items:center;gap:4px}.nv a{text-decoration:none;color:var(--t);font-weight:500;font-size:.88rem;padding:8px 14px;border-radius:var(--rf)}.nv a:hover{background:var(--l);color:var(--p)}.lb{padding:6px 14px;border-radius:var(--rf);background:var(--l);border:1px solid var(--g);cursor:pointer;font-family:inherit;font-size:.82rem;font-weight:600;color:var(--n)}.lb:hover{background:var(--g)}.btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;padding:12px 24px;border-radius:var(--rf);font-weight:600;font-size:.9rem;cursor:pointer;border:none;text-decoration:none;white-space:nowrap;font-family:inherit}.bp{background:var(--gr);color:#fff;box-shadow:var(--md)}.bp:hover{transform:translateY(-2px);box-shadow:var(--lg)}.ba{background:var(--ga);color:var(--n);box-shadow:var(--md)}.ba:hover{transform:translateY(-2px);box-shadow:var(--lg)}.bw{background:rgba(255,255,255,.95);color:var(--n);box-shadow:var(--sm)}.bw:hover{background:#fff;transform:translateY(-1px)}.bl{padding:14px 32px;font-size:1rem}.bs{padding:8px 18px;font-size:.82rem}.mb{display:none;background:none;border:none;cursor:pointer;font-size:1.5rem;color:var(--n);padding:8px;border-radius:var(--r)}.he{min-height:100vh;display:flex;align-items:center;padding-top:var(--hh);position:relative;overflow:hidden;background:var(--gr)}.he::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 20% 50%,rgba(0,163,224,.12),transparent 50%),radial-gradient(ellipse at 80% 20%,rgba(201,168,76,.08),transparent 50%)}.hp{position:absolute;inset:0;overflow:hidden}.pt{position:absolute;border-radius:50%;background:radial-gradient(circle,rgba(255,255,255,.04),transparent);animation:fl 20s ease-in-out infinite}@keyframes fl{0%,100%{transform:translate(0,0)scale(1)}25%{transform:translate(30px,-40px)scale(1.1)}50%{transform:translate(-20px,20px)scale(.95)}75%{transform:translate(15px,30px)scale(1.05)}}.he .co{position:relative;z-index:2;max-width:var(--cc);margin:0 auto;padding:40px 24px;width:100%}.hc{max-width:680px}.hb{display:inline-flex;align-items:center;gap:6px;padding:6px 16px;border-radius:var(--rf);background:rgba(16,185,129,.12);color:var(--s);font-size:.78rem;font-weight:600;margin-bottom:24px;border:1px solid rgba(16,185,129,.2);box-shadow:0 0 20px rgba(16,185,129,.08)}.hb::before{content:'';width:8px;height:8px;border-radius:50%;background:var(--s);animation:pu 2s infinite}@keyframes pu{0%,100%{opacity:1;box-shadow:0 0 0 0 rgba(16,185,129,.5)}50%{opacity:.5;box-shadow:0 0 0 6px rgba(16,185,129,0)}}.he h1{font-size:clamp(2.2rem,5.5vw,3.6rem);font-weight:900;color:#fff;line-height:1.15;margin-bottom:20px}.he h1 .gd{background:var(--gg);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}.he p{font-size:1.1rem;color:rgba(255,255,255,.75);max-width:680px;margin-bottom:32px;line-height:1.8}.hbt{display:flex;gap:12px;flex-wrap:wrap;margin-bottom:48px}.hs{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}.hst{background:rgba(255,255,255,.08);-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.1);border-radius:var(--rxl);padding:20px;text-align:center;transition:var(--tr)}.hst:hover{background:rgba(255,255,255,.12);transform:translateY(-3px);box-shadow:0 8px 24px rgba(0,0,0,.12)}.hst .nm{font-size:2rem;font-weight:800;color:#fff;display:inline}.hst .sf{font-size:1rem;font-weight:400;color:var(--a)}.hst .lb{font-size:.82rem;color:rgba(255,255,255,.6);margin-top:4px;display:block}.se{padding:80px 0}.sea{background:#fff}.sel{background:var(--of)}.co{max-width:var(--cc);margin:0 auto;padding:0 24px}.sh{text-align:center;margin-bottom:48px}.sh h2{font-size:clamp(1.5rem,3vw,2.2rem);font-weight:800;color:var(--n);margin-bottom:8px}.sh .gl{width:60px;height:3px;background:var(--gg);margin:12px auto;border-radius:2px}.sh p{color:var(--tl);font-size:1rem;margin-top:4px}.g3{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}.g4{display:grid;grid-template-columns:repeat(4,1fr);gap:20px}.g5{display:grid;grid-template-columns:repeat(5,1fr);gap:16px}.g6{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}.cd{background:#fff;border:1px solid var(--g);border-radius:var(--rxl);padding:24px;transition:var(--tr)}.cd:hover{box-shadow:var(--lg);transform:translateY(-4px);border-color:rgba(0,102,204,.1)}.ci{width:56px;height:56px;border-radius:var(--rm);background:var(--gr);display:flex;align-items:center;justify-content:center;font-size:1.5rem;margin-bottom:16px;box-shadow:var(--md)}.cd h3{font-size:1rem;font-weight:700;margin-bottom:8px;color:var(--n)}.cd p{font-size:.88rem;color:var(--tl);line-height:1.7}.dc{text-align:center}.dc .ci{margin:0 auto 16px}.dcc{text-align:center}.da{width:80px;height:80px;border-radius:50%;background:var(--ga);margin:0 auto 16px;display:flex;align-items:center;justify-content:center;font-size:1.8rem;font-weight:800;color:var(--n);box-shadow:var(--md)}.sp{color:var(--p);font-weight:600;font-size:.85rem;margin-bottom:4px}.bc{padding:0;overflow:hidden}.bh{background:var(--gr);padding:28px 24px;color:#fff}.bh h3{color:#fff;font-size:1.1rem;margin-bottom:4px}.bh .bcx{color:rgba(255,255,255,.7);font-size:.85rem;margin-top:4px}.bb{padding:24px}.bb p{color:var(--tl);font-size:.88rem;margin-bottom:16px}.cs{background:var(--gr);padding:80px 0;text-align:center;position:relative;overflow:hidden}.cs::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 50% 0,rgba(255,255,255,.05),transparent 50%)}.cs .co{position:relative;z-index:2}.cs h2{font-size:2rem;font-weight:800;color:#fff;margin-bottom:12px}.cs p{color:rgba(255,255,255,.7);margin-bottom:32px;font-size:1.05rem}.cb{display:flex;gap:12px;justify-content:center;flex-wrap:wrap}.ft{background:var(--n);color:rgba(255,255,255,.6);padding:56px 0 24px}.fg{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:32px;margin-bottom:40px}.ft h4{color:#fff;margin-bottom:16px;font-size:.95rem;font-weight:700}.ft a{color:rgba(255,255,255,.5);text-decoration:none;display:block;margin-bottom:8px;font-size:.88rem}.ft a:hover{color:var(--a);padding-inline-start:4px}.ft p{font-size:.88rem;margin-bottom:8px}.sl{display:flex;gap:12px;margin-top:16px}.sl a{width:40px;height:40px;border-radius:50%;background:rgba(255,255,255,.06);display:flex;align-items:center;justify-content:center;font-size:1.1rem;text-decoration:none;color:rgba(255,255,255,.5)}.sl a:hover{background:rgba(255,255,255,.12)}.fb{border-top:1px solid rgba(255,255,255,.08);padding-top:20px;text-align:center;font-size:.8rem}.fb .pw{color:var(--a);font-weight:600}.wa{position:fixed;bottom:24px;left:24px;width:56px;height:56px;border-radius:50%;display:flex;align-items:center;justify-content:center;z-index:99;font-size:1.6rem;text-decoration:none}.wa:hover{transform:scale(1.1)}.wa .pr{position:absolute;inset:-4px;border-radius:50%;border:2px solid rgba(37,211,102,.2)}.an{opacity:0;transform:translateY(30px);transition:all .7s cubic-bezier(.4,0,.2,1)}.an.vi{opacity:1;transform:translateY(0)}.d1{transition-delay:.1s}.d2{transition-delay:.2s}.d3{transition-delay:.3s}.d4{transition-delay:.4s}.d5{transition-delay:.5s}.d6{transition-delay:.6s}.ld{display:flex;justify-content:center;padding:40px}.spn{width:32px;height:32px;border:3px solid var(--g);border-top-color:var(--p);border-radius:50%;animation:sp .7s linear infinite}@keyframes sp{to{transform:rotate(360deg)}}.ts{position:fixed;bottom:24px;right:24px;padding:14px 24px;border-radius:var(--rm);color:#fff;font-weight:600;z-index:9999;opacity:0;transform:translateY(100px);transition:all .4s}.ts.sh{opacity:1;transform:translateY(0)}.ts.s{background:var(--s)}.ts.e{background:var(--d)}.ts.w{background:var(--w);color:#1a1a1a}.pr{position:relative}.blink{animation:blink 1.5s infinite}.ec{margin-bottom:60px}.ec-g{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:24px}.ec-c{background:#fff;border:1px solid var(--g);border-radius:var(--rxl);padding:20px;text-align:center;transition:var(--tr);position:relative;overflow:hidden}.ec-c:hover{transform:translateY(-3px);box-shadow:var(--lg);border-color:rgba(0,102,204,.15)}.ec-c.l{background:linear-gradient(180deg,#F0F7FF,#fff)}.ec-c.r{border-color:rgba(16,185,129,.25)}.ec-c.r .ec-d{border-color:var(--s)}.ec-ic{width:48px;height:48px;border-radius:50%;background:var(--gr);display:flex;align-items:center;justify-content:center;font-size:1.2rem;margin:0 auto 12px;box-shadow:var(--sm)}.ec-n{font-size:.9rem;font-weight:700;color:var(--n);margin-bottom:4px}.ec-d{font-size:.8rem;color:var(--tl);line-height:1.5}.ec-badge{position:absolute;top:8px;right:8px;display:flex;align-items:center;gap:4px;font-size:.6rem;font-weight:800;padding:3px 7px;border-radius:var(--rf);text-transform:uppercase;letter-spacing:.5px}.ec-b.ok{background:rgba(16,185,129,.12);color:var(--s)}.ec-b.warn{background:rgba(245,158,11,.12);color:var(--w)}.ec-b.off{background:rgba(239,68,68,.1);color:var(--d)}.ec-b::before{content:'';width:5px;height:5px;border-radius:50%}.ec-b.ok::before{background:var(--s)}.ec-b.warn::before{background:var(--w);animation:pu 2s infinite}.ec-b.off::before{background:var(--d)}.ec-b.pf::before{background:var(--p)}.ig{display:grid;grid-template-columns:repeat(2,1fr);gap:16px;margin-top:20px}.ig-c{background:#fff;border:1px solid var(--g);border-radius:var(--rl);padding:18px;display:flex;align-items:center;gap:14px;transition:var(--tr)}.ig-c:hover{box-shadow:var(--md);transform:translateY(-2px);border-color:rgba(0,102,204,.1)}.ig-ic{width:44px;height:44px;border-radius:var(--rm);background:var(--gr);display:flex;align-items:center;justify-content:center;font-size:1.1rem;flex-shrink:0;box-shadow:var(--sm)}.ig-c.g{background:linear-gradient(135deg,#F0FDF4,#f0fdf4)}.ig-c.w{background:linear-gradient(135deg,#FFFBEB,#fffbeb)}.ig-n{font-size:.88rem;font-weight:700;color:var(--t)}.ig-s{font-size:.75rem;color:var(--tl);margin-top:2px}.ig-b{font-size:.65rem;font-weight:800;padding:4px 10px;border-radius:var(--rf);white-space:nowrap}.ig-b.ok{background:rgba(16,185,129,.12);color:var(--s)}.ig-b.warn{background:rgba(245,158,11,.12);color:var(--w)}.ig-b.off{background:rgba(239,68,68,.1);color:var(--d)}.ai-s{background:#fff;border:1px solid var(--g);border-radius:var(--rxl);overflow:hidden;margin-top:20px;display:grid;grid-template-columns:1fr 1fr;gap:0;box-shadow:var(--md)}.ai-v{border-radius:var(--rxl) 0 0 var(--rxl);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;padding:40px;background:linear-gradient(135deg,#F0F7FF,#E8F4FF);text-align:center}.ai-v .ai-orb{width:100px;height:100px;border-radius:50%;background:var(--gr);display:grid;place-items:center;font-size:2rem;box-shadow:0 0 0 6px rgba(0,102,204,.08),0 20px 44px rgba(0,102,204,.16);position:relative}.ai-v .ai-orb::before{content:'';position:absolute;inset:-8px;border-radius:50%;border:2px solid rgba(0,102,204,.15);animation:pu 3s infinite}.ai-v .ai-orb::after{content:'';position:absolute;inset:-16px;border-radius:50%;border:1px solid rgba(0,102,204,.08);animation:pu 3s infinite .5s}.ai-v p{font-size:.9rem;color:var(--tl);max-width:280px}.ai-c{padding:40px;border-radius:0 var(--rxl) var(--rxl) 0;display:flex;flex-direction:column;justify-content:center;gap:16px}.ai-c h3{font-size:1.2rem;font-weight:800;color:var(--n);margin-bottom:4px}.ai-c p{font-size:.85rem;color:var(--tl);line-height:1.6}.ai-btns{display:flex;gap:10px;flex-wrap:wrap}.ai-btns .btn{gap:8px}.pf{display:inline-flex;align-items:center;gap:6px;padding:4px 10px;border-radius:var(--rf);background:rgba(0,102,204,.08);color:var(--p);font-size:.68rem;font-weight:700;font-family:inherit;cursor:pointer;border:none;transition:var(--tr)}.pf:hover{background:rgba(0,102,204,.14)}.eh{display:flex;flex-wrap:wrap;gap:6px;margin-top:8px}.eh-c{padding:3px 8px;border-radius:var(--rf);background:rgba(201,168,76,.1);color:var(--a);font-size:.6rem;font-weight:700}.mb{display:none;background:none;border:none;cursor:pointer;font-size:1.5rem;color:var(--n);padding:8px;border-radius:var(--r)}@media(max-width:1024px){.ec-g{grid-template-columns:1fr 1fr}}@media(max-width:900px){.nv{display:none}.mb{display:block}.nv.op{display:flex;flex-direction:column;position:fixed;inset:0;background:#fff;padding:80px 24px 24px;z-index:500;gap:0}.nv.op a{padding:14px 0;border-bottom:1px solid var(--g);border-radius:0}.hs,.g3,.g4{grid-template-columns:1fr 1fr}.fg{grid-template-columns:1fr 1fr}.ec-g{grid-template-columns:1fr 1fr}.ig{grid-template-columns:1fr}.ai-s{grid-template-columns:1fr}.ai-v{border-radius:var(--rxl) var(--rxl) 0 0}.ai-c{border-radius:0 0 var(--rxl) var(--rxl)}}@media(max-width:480px){.hs,.g3,.g4,.fg,.ec-g{grid-template-columns:1fr}}.ss{padding:72px 0;background:linear-gradient(135deg,var(--n) 0%,var(--p) 100%);position:relative;overflow:hidden}.ss::before{content:'';position:absolute;inset:0;background:url(data:image/svg+xml,%3Csvg%20width='60'%20height='60'%20viewBox='0%200%2060%2060'%20xmlns='http://www.w3.org/2000/svg'%3E%3Cg%20fill='none'%20fill-rule='evenodd'%3E%3Cg%20fill='%23ffffff'%20fill-opacity='0.03'%3E%3Cpath%20d='M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E);}.ss .sh h2{color:#fff!important}.ss .sh p{color:rgba(255,255,255,.75)!important}.ss .gl{background:linear-gradient(90deg,rgba(255,255,255,0),var(--al),rgba(255,255,255,0))!important}.sb-wrap{max-width:720px;margin:0 auto}.sb-box{display:flex;border-radius:var(--rl);overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,.3)}.sb-in{flex:1;padding:18px 24px;font-size:1rem;border:none;outline:none;background:#fff;color:var(--t);font-family:var(--fa)}.sb-in::placeholder{color:var(--tl)}.sb-btn{padding:18px 28px;background:var(--ga);border:none;cursor:pointer;font-family:var(--fa);font-size:.95rem;font-weight:700;color:var(--n);white-space:nowrap;transition:var(--tr)}.sb-btn:hover{background:var(--gg)}.sr-res{margin-top:24px}.sr-ans{background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.2);border-radius:var(--rm);padding:20px 24px;color:#fff;font-size:.92rem;line-height:1.9;-webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px)}.sr-src{display:flex;flex-wrap:wrap;gap:8px;margin-top:14px}.sr-src span{padding:4px 12px;border-radius:var(--rf);background:rgba(201,168,76,.25);color:var(--al);font-size:.75rem;border:1px solid rgba(201,168,76,.35)}.sr-pow{font-size:.72rem;color:rgba(255,255,255,.5);margin-top:12px}.dhs{padding:96px 0;background:var(--of)}.dhs-g{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:28px;margin-top:48px}.dhs-c{background:#fff;border-radius:var(--rxl);padding:36px 32px;box-shadow:var(--md);border:1px solid var(--g);position:relative;overflow:hidden;transition:var(--tr)}.dhs-c:hover{transform:translateY(-5px);box-shadow:var(--lg)}.dhs-c::after{content:'';position:absolute;top:0;left:0;right:0;height:3px}.dhs-c.hc::after{background:linear-gradient(90deg,#10B981,#34D399)}.dhs-c.th::after{background:linear-gradient(90deg,#0066CC,#0EA5E9)}.dhs-c.em::after{background:linear-gradient(90deg,#8B5CF6,#A78BFA)}.dhs-ic{width:72px;height:72px;border-radius:var(--rm);display:flex;align-items:center;justify-content:center;font-size:2rem;margin-bottom:24px}.dhs-ic.hc{background:linear-gradient(135deg,rgba(16,185,129,.12),rgba(52,211,153,.08))}.dhs-ic.th{background:linear-gradient(135deg,rgba(0,102,204,.12),rgba(14,165,233,.08))}.dhs-ic.em{background:linear-gradient(135deg,rgba(139,92,246,.12),rgba(167,139,250,.08))}.dhs-new{position:absolute;top:20px;inset-inline-end:20px;background:var(--ga);color:var(--n);padding:4px 12px;border-radius:var(--rf);font-size:.65rem;font-weight:800;letter-spacing:.5px}@media(max-width:900px){.sb-box{flex-direction:column}.sb-btn{border-radius:0 0 var(--rl) var(--rl)}.dhs-g{grid-template-columns:1fr}}";


const UX_CSS = `button{font-family:inherit}.ec-c{border:0;text-align:inherit;cursor:pointer;width:100%}.ft button{display:block;background:none;border:0;color:#CBD5E1;font:inherit;cursor:pointer;padding:4px 0;text-align:inherit}.ft button:hover{color:#fff}.mx{position:fixed;inset:0;z-index:3000;display:none;align-items:center;justify-content:center;padding:20px}.mx.on{display:flex}.mx-b{position:absolute;inset:0;background:rgba(15,23,42,.56);backdrop-filter:blur(10px)}.mx-p{position:relative;width:min(760px,100%);max-height:86vh;overflow:auto;background:linear-gradient(180deg,#fff,#F8FAFC);border:1px solid rgba(148,163,184,.28);border-radius:28px;box-shadow:0 32px 90px rgba(15,23,42,.28);padding:24px}.mx-x{position:absolute;top:14px;inset-inline-end:14px;width:38px;height:38px;border:0;border-radius:50%;background:#EEF2F7;color:var(--n);cursor:pointer;font-size:1.2rem}.mx-h{padding-inline-end:44px;margin-bottom:18px}.mx-h h3{font-size:1.35rem;color:var(--n);margin-bottom:4px}.mx-h p{color:var(--tl);font-size:.92rem}.fx{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}.fx .full{grid-column:1/-1}.fi{display:flex;flex-direction:column;gap:5px}.fi label{font-weight:700;font-size:.8rem;color:var(--n)}.fi input,.fi select,.fi textarea{width:100%;border:1px solid var(--g);border-radius:14px;padding:12px 13px;background:#fff;color:var(--t);font:inherit;outline:none}.fi textarea{min-height:86px;resize:vertical}.fi input:focus,.fi select:focus,.fi textarea:focus{border-color:var(--p);box-shadow:0 0 0 4px rgba(0,102,204,.12)}.mx-a{display:flex;gap:10px;flex-wrap:wrap;margin-top:16px}.mx-r{margin-top:16px;border-radius:18px;background:#F1F5F9;padding:14px;color:var(--t);font-size:.9rem;line-height:1.8;white-space:normal}.mx-r.ok{background:#ECFDF5;color:#065F46}.mx-r.er{background:#FEF2F2;color:#991B1B}.mini-g{display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:10px}.mini-c{background:#fff;border:1px solid var(--g);border-radius:16px;padding:12px}.mini-c strong{display:block;color:var(--n);margin-bottom:4px}.mini-c span{display:block;color:var(--tl);font-size:.82rem}@media(max-width:640px){.fx{grid-template-columns:1fr}.mx-p{border-radius:22px;padding:18px}.mx{padding:12px}}`;
const ENHANCE_CSS = `.cmd{position:relative;background:#08111f;color:#fff;padding:72px 0;overflow:hidden}.cmd:before{content:"";position:absolute;inset:-30%;background:radial-gradient(circle at 20% 20%,rgba(14,165,233,.32),transparent 28%),radial-gradient(circle at 80% 0%,rgba(201,168,76,.26),transparent 24%),linear-gradient(135deg,#08111f,#122946);opacity:.95}.cmd:after{content:"";position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.045) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.045) 1px,transparent 1px);background-size:42px 42px;mask-image:linear-gradient(180deg,transparent,#000 18%,#000 82%,transparent)}.cmd .co{position:relative;z-index:1}.cmd-shell{display:grid;grid-template-columns:minmax(0,.85fr) minmax(380px,1.15fr);gap:28px;align-items:center}.cmd-copy h2{font-size:clamp(2rem,4vw,4.4rem);line-height:.95;letter-spacing:-.06em;margin:12px 0;color:#fff}.cmd-copy p{color:#bdd2df;max-width:620px;font-size:1.02rem}.cmd-k{display:inline-flex;align-items:center;gap:8px;border:1px solid rgba(255,255,255,.18);background:rgba(255,255,255,.08);border-radius:999px;padding:8px 12px;color:#a8e8ff;font-weight:900;font-size:.76rem;text-transform:uppercase;letter-spacing:.12em}.cmd-k:before{content:"";width:8px;height:8px;border-radius:50%;background:#10b981;box-shadow:0 0 18px #10b981}.cmd-actions{display:flex;gap:10px;flex-wrap:wrap;margin-top:24px}.cmd-board{background:linear-gradient(180deg,rgba(255,255,255,.12),rgba(255,255,255,.06));border:1px solid rgba(255,255,255,.18);border-radius:30px;padding:16px;box-shadow:0 28px 90px rgba(0,0,0,.35);backdrop-filter:blur(18px)}.cmd-top{display:flex;gap:7px;align-items:center;margin-bottom:14px;color:#8ee6ff;font-size:.72rem;font-weight:900;letter-spacing:.18em}.cmd-top span{width:10px;height:10px;border-radius:50%;background:#ef4444}.cmd-top span:nth-child(2){background:#f59e0b}.cmd-top span:nth-child(3){background:#10b981}.cmd-top b{margin-inline-start:auto}.cmd-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px}.cmd-m{min-height:132px;border-radius:22px;background:rgba(8,17,31,.62);border:1px solid rgba(255,255,255,.12);padding:18px;display:flex;flex-direction:column;justify-content:space-between}.cmd-m strong{font-size:clamp(1.7rem,3vw,3rem);line-height:1;color:#fff;letter-spacing:-.05em}.cmd-m span,.cmd-strip span{color:#9fb8c7;font-size:.78rem;font-weight:800}.cmd-strip{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px;margin-top:10px}.cmd-strip div{border-radius:18px;background:rgba(255,255,255,.08);padding:14px;border:1px solid rgba(255,255,255,.1)}.cmd-strip b{display:block;color:#dff6ff;font-size:1.35rem}.nf{background:linear-gradient(180deg,#f8fafc,#eef6fb);padding:72px 0}.nf-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));grid-auto-rows:minmax(210px,auto);gap:14px}.nf-card{position:relative;display:flex;flex-direction:column;align-items:flex-start;text-align:inherit;text-decoration:none;border:0;border-radius:28px;padding:24px;background:#fff;color:var(--n);box-shadow:0 18px 50px rgba(15,23,42,.08);overflow:hidden;cursor:pointer;min-height:210px;transition:transform .25s ease,box-shadow .25s ease}.nf-card:before{content:"";position:absolute;inset:auto -40px -70px auto;width:170px;height:170px;border-radius:50%;background:linear-gradient(135deg,rgba(0,102,204,.18),rgba(201,168,76,.24));transition:transform .3s ease}.nf-card:hover{transform:translateY(-6px);box-shadow:0 26px 70px rgba(15,23,42,.14)}.nf-card:hover:before{transform:scale(1.2)}.nf-card.big{grid-column:span 2;grid-row:span 2;background:linear-gradient(135deg,#10213f,#0066cc);color:#fff}.nf-card span{font-size:.76rem;font-weight:950;color:var(--a);letter-spacing:.14em}.nf-card h3{font-size:1.25rem;line-height:1.1;margin:18px 0 10px;max-width:90%}.nf-card.big h3{font-size:clamp(1.8rem,3vw,3.1rem);letter-spacing:-.05em}.nf-card p{color:var(--tl);font-size:.9rem;line-height:1.7;max-width:95%;position:relative;z-index:1}.nf-card.big p{color:#d8e9f4;font-size:1rem}.nf-card b{margin-top:auto;color:inherit;position:relative;z-index:1}.nf-card:nth-child(2){background:#fff7ed}.nf-card:nth-child(3){background:#ecfdf5}.nf-card:nth-child(4){background:#eff6ff}.nf-card:nth-child(5){background:#f5f3ff}.nf-card:nth-child(6){background:#fff1f2}@media(max-width:980px){.cmd-shell{grid-template-columns:1fr}.cmd-grid,.cmd-strip{grid-template-columns:repeat(2,minmax(0,1fr))}.nf-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.nf-card.big{grid-column:span 2;grid-row:span 1}}@media(max-width:560px){.cmd{padding:48px 0}.cmd-grid,.cmd-strip,.nf-grid{grid-template-columns:1fr}.nf-card.big{grid-column:span 1}.cmd-board{border-radius:22px}.cmd-m{min-height:110px}}`;

function hdr(t,p) {
  return '<header class="h" id="hdr"><div class="hi"><a href="/" class="l"><div class="li">\u{1F3E5}</div><div class="lt">'+t.titleShort+'<sm>'+t.osVer+'</sm></div></a><nav class="nv" id="mn"><a href="#command">'+t.navCommand+'</a><a href="#depts">'+t.navDepts+'</a><a href="#branches">'+t.navBranches+'</a><a href="#doctors">'+t.navDoctors+'</a><a href="#ecosystem"><span style="font-size:.75rem;opacity:.6;">\u{1F310}</span> '+t.navEcosystem+'</a><button class="lb" id="lb">'+t.langBtn+'</button><button class="btn bp bs" data-open="appointment">'+t.navBook+'</button></nav><button class="mb" onclick="document.getElementById(\'mn\').classList.toggle(\'op\');return false;">\u{2630}</button></div></header>';
}

function ecoSys(t) {
  return '<section class="se sea" id="ecosystem"><div class="co"><div class="sh an"><h2>'+t.ecosystemTitle+'</h2><div class="gl"></div><p>'+t.ecosystemSub+'</p></div><div class="ec"><h3 style="font-size:1.1rem;font-weight:700;color:var(--n);margin-bottom:16px;">\u{1F465} '+t.navPortal+'</h3><div class="ec-g">'+
    '  <button class="ec-c an d1" data-open="patient"><div class="ec-badge ok pf">Live</div><div class="ec-ic" style="background:linear-gradient(135deg,#0066CC,#0EA5E9)">\u{1F9D1}\u200D\u{1F3EB}</div><div class="ec-n">'+t.patientTitle+'</div><div class="ec-d">'+t.patientDesc+'</div></button>'+
    '  <a href="/provider-dashboard" class="ec-c an d2" style="display:block;text-decoration:none;color:inherit"><div class="ec-badge ok pf">Live</div><div class="ec-ic" style="background:linear-gradient(135deg,#10B981,#34D399)">\u{2B50}</div><div class="ec-n">'+t.providerTitle+'</div><div class="ec-d">'+t.providerDesc+'</div></a>'+
    '  <button class="ec-c an d3" data-open="eligibility"><div class="ec-badge ok pf">Live</div><div class="ec-ic" style="background:linear-gradient(135deg,#F59E0B,#FBBF24)">\u{1F3E6}</div><div class="ec-n">'+t.payerTitle+'</div><div class="ec-d">'+t.payerDesc+'</div></button>'+
    '  <a href="/academy" class="ec-c an d4"><div class="ec-badge ok pf">Live</div><div class="ec-ic" style="background:linear-gradient(135deg,#8B5CF6,#A78BFA)">\u{1F393}</div><div class="ec-n">'+t.studentTitle+'</div><div class="ec-d">'+t.studentDesc+'</div></a>'+
    '  <button class="ec-c an d5" data-open="appointment"><div class="ec-badge ok pf">Live</div><div class="ec-ic" style="background:linear-gradient(135deg,#EC4899,#F472B6)">\u{1F481}</div><div class="ec-n">'+t.receptionTitle+'</div><div class="ec-d">'+t.receptionDesc+'</div></button>'+
    '  <button class="ec-c an d6 l" data-open="status"><div class="ec-badge warn pf">Secure</div><div class="ec-ic" style="background:linear-gradient(135deg,#64748B,#94A3B8)">\u{1F512}</div><div class="ec-n">'+t.adminTitle+'</div><div class="ec-d">'+t.adminDesc+'</div></button>'+
    '  <button class="ec-c an d5 l" data-open="rcm"><div class="ec-badge warn pf">Secure</div><div class="ec-ic" style="background:linear-gradient(135deg,#DC2626,#EF4444)">\u{1F4B0}</div><div class="ec-n">'+t.rcmTitle+'</div><div class="ec-d">'+t.rcmDesc+'</div></button>'+
    '  <button class="ec-c an d6 r" data-open="basma"><div class="ec-badge ok">Basma</div><div class="ec-ic" style="background:linear-gradient(135deg,#059669,#10B981)">\u{1F399}\uFE0F</div><div class="ec-n">'+t.basmaPortal+'</div><div class="ec-d">'+t.aiDesc+'</div></button>'+
    '  <button class="ec-c an d1" data-open="homecare"><div class="ec-badge ok pf">New</div><div class="ec-ic" style="background:linear-gradient(135deg,#10B981,#34D399)">\u{1F3E0}</div><div class="ec-n">'+t.hcTitle+'</div><div class="ec-d">'+t.hcSub+'</div></button>'+
    '  <button class="ec-c an d2" data-open="telehealth"><div class="ec-badge ok pf">New</div><div class="ec-ic" style="background:linear-gradient(135deg,#0EA5E9,#38BDF8)">\u{1F3A5}</div><div class="ec-n">'+t.thTitle+'</div><div class="ec-d">'+t.thSub+'</div></button>'+
    '  <button class="ec-c an d1" data-open="givc"><div class="ec-badge ok">GIVC</div><div class="ec-ic" style="background:linear-gradient(135deg,#7C3AED,#A855F7)">\u{1F310}</div><div class="ec-n">'+t.givcPortal+'</div><div class="ec-d">'+t.givcDesc+'</div></button>'+
  '</div></div><div class="ec"><h3 style="font-size:1.1rem;font-weight:700;color:var(--n);margin-bottom:16px;">\u{1F517} '+t.integrationsTitle+'</h3><div class="ig" id="liveStatus"><div class="ld"><div class="spn"></div></div></div></div><div class="ec"><h3 style="font-size:1.1rem;font-weight:700;color:var(--n);margin-bottom:16px;">\u{1F916} '+t.aiTitle+'</h3><div class="ai-s"><div class="ai-v"><div class="ai-orb">\u{1F399}\uFE0F</div><p>'+t.aiDesc+'</p></div><div class="ai-c"><h3>'+t.aiTitle+'</h3><p>'+t.aiDesc+'</p><div class="ai-btns"><button data-open="basma" class="btn ba bs">'+t.aiTalkBtn+'</button><button data-open="basma" class="btn bp bs">'+t.aiChatBtn+'</button></div><div class="eh"><span class="eh-c">DeepSeek AI</span><span class="eh-c">Oracle Health</span><span class="eh-c">NPHIES</span><span class="eh-c">Multi-language</span></div></div></div></div></div></section>';
}

function bdy(t,A,p) {
  var dir = A ? "right" : "left";
  return '<section class="he"><div class="hp"><div class="pt" style="width:120px;height:120px;top:10%;'+dir+':15%"></div><div class="pt" style="width:80px;height:80px;top:60%;'+dir+':70%;animation-delay:3s"></div><div class="pt" style="width:60px;height:60px;top:30%;'+dir+':40%;animation-delay:6s"></div><div class="pt" style="width:100px;height:100px;top:70%;'+dir+':20%;animation-delay:2s"></div></div><div class="co"><div class="hc"><div class="hb">\u25CF '+t.heroBadge+'</div><h1>'+t.heroH1+'</h1><p>'+t.heroP+'</p><div class="hbt"><button data-open="appointment" class="btn ba bl">'+t.heroBookBtn+'</button><a href="#ecosystem" class="btn bw bl">\u{1F310} '+t.navEcosystem+'</a></div><div class="hs" id="hs"><div class="hst"><span class="nm" id="sd">\u2014</span><span class="sf">+</span><span class="lb">'+t.statDoctors+'</span></div><div class="hst"><span class="nm">5</span><span class="lb">'+t.statBranches+'</span></div><div class="hst"><span class="nm" id="sdp">\u2014</span><span class="sf">+</span><span class="lb">'+t.statDepts+'</span></div><div class="hst"><span class="nm">1200</span><span class="sf">+</span><span class="lb">'+t.statBeds+'</span></div></div></div></div></section>';
}

function searchSec(t) {
  return '<section class="ss" id="search"><div class="co"><div class="sh an"><h2>'+t.searchTitle+'</h2><div class="gl"></div><p>'+t.searchSub+'</p></div><div class="sb-wrap"><div class="sb-box"><input class="sb-in" id="srchQ" type="text" placeholder="'+t.searchPlaceholder+'"/><button class="sb-btn" onclick="doSearch()">'+t.searchBtn+'</button></div><div class="sr-res" id="srchRes" style="display:none"></div></div></div></section>';
}

function commandSec(t) {
  return '<section class="cmd" id="command"><div class="co"><div class="cmd-shell an"><div class="cmd-copy"><div class="cmd-k">BrainSAIT HNH OS</div><h2>'+t.commandTitle+'</h2><p>'+t.commandSub+'</p><div class="cmd-actions"><button class="btn ba bs" data-open="appointment">'+t.ctaBook+'</button><a class="btn bw bs" href="/provider-dashboard">'+t.featureProvider+'</a></div></div><div class="cmd-board"><div class="cmd-top"><span></span><span></span><span></span><b>LIVE</b></div><div class="cmd-grid"><div class="cmd-m"><strong id="opsPatients">—</strong><span>'+t.opsPatients+'</span></div><div class="cmd-m"><strong id="opsToday">—</strong><span>'+t.opsAppointments+'</span></div><div class="cmd-m"><strong id="opsProviders">—</strong><span>'+t.opsProviders+'</span></div><div class="cmd-m"><strong id="opsClaims">—</strong><span>'+t.opsClaims+'</span></div></div><div class="cmd-strip"><div><b id="opsHomecare">—</b><span>'+t.homecareMetric+'</span></div><div><b id="opsTelehealth">—</b><span>'+t.telehealthMetric+'</span></div><div><b id="opsGivc">—</b><span>'+t.givcMetric+'</span></div><div><b id="opsConnected">—</b><span>'+t.connectedMetric+'</span></div></div></div></div></div></section>';
}

function featureSec(t) {
  return '<section class="nf" id="features"><div class="co"><div class="sh an"><h2>'+t.featureTitle+'</h2><div class="gl"></div><p>'+t.featureSub+'</p></div><div class="nf-grid">'+
    '<a class="nf-card big an d1" href="/provider-dashboard"><span>01</span><h3>'+t.featureProvider+'</h3><p>'+t.featureProviderDesc+'</p><b>'+t.launch+' →</b></a>'+
    '<a class="nf-card an d2" href="/givc/?lang=en#eligibility"><span>02</span><h3>'+t.featureEligibility+'</h3><p>'+t.featureEligibilityDesc+'</p><b>'+t.launch+' →</b></a>'+
    '<button class="nf-card an d3" data-open="homecare"><span>03</span><h3>'+t.featureHomecare+'</h3><p>'+t.featureHomecareDesc+'</p><b>'+t.launch+' →</b></button>'+
    '<button class="nf-card an d4" data-open="telehealth"><span>04</span><h3>'+t.featureTelehealth+'</h3><p>'+t.featureTelehealthDesc+'</p><b>'+t.launch+' →</b></button>'+
    '<a class="nf-card an d5" href="#search"><span>05</span><h3>'+t.featureSearch+'</h3><p>'+t.featureSearchDesc+'</p><b>'+t.launch+' →</b></a>'+
    '<button class="nf-card an d6" data-open="rcm"><span>06</span><h3>'+t.featureRcm+'</h3><p>'+t.featureRcmDesc+'</p><b>'+t.launch+' →</b></button>'+
  '</div></div></section>';
}

function dhsSec(t) {
  return '<section class="dhs" id="digitalHealth"><div class="co"><div class="sh an"><h2>'+t.digitalTitle+'</h2><div class="gl"></div><p>'+t.digitalSub+'</p></div><div class="dhs-g">'+
    '<div class="dhs-c hc an d1"><div class="dhs-new">New</div><div class="dhs-ic hc">\u{1F3E0}</div><h3 style="font-size:1.1rem;font-weight:800;color:var(--n);margin-bottom:8px;">'+t.hcTitle+'</h3><p style="font-size:.88rem;color:var(--tl);margin-bottom:8px;">'+t.hcSub+'</p><p style="font-size:.82rem;color:var(--tl);line-height:1.7;">'+t.hcDesc+'</p><button data-open="homecare" class="btn bp bs" style="margin-top:20px;">'+t.hcTitle+' \u2192</button></div>'+
    '<div class="dhs-c th an d2"><div class="dhs-new">New</div><div class="dhs-ic th">\u{1F3A5}</div><h3 style="font-size:1.1rem;font-weight:800;color:var(--n);margin-bottom:8px;">'+t.thTitle+'</h3><p style="font-size:.88rem;color:var(--tl);margin-bottom:8px;">'+t.thSub+'</p><p style="font-size:.82rem;color:var(--tl);line-height:1.7;">'+t.thDesc+'</p><button data-open="telehealth" class="btn bp bs" style="margin-top:20px;">'+t.thTitle+' \u2192</button></div>'+
    '<div class="dhs-c em an d3"><div class="dhs-ic em">\u{1F4E7}</div><h3 style="font-size:1.1rem;font-weight:800;color:var(--n);margin-bottom:8px;">'+t.emailTitle+'</h3><p style="font-size:.82rem;color:var(--tl);line-height:1.7;margin-top:8px;">'+t.emailDesc+'</p></div>'+
  '</div></div></section>';
}

function ftr(t,p) {
  return '<footer class="ft"><div class="co"><div class="fg"><div><h4>\u{1F3E5} '+t.titleShort+'</h4><p>'+t.fAbout+'</p><div class="sl"><a href="https://wa.me/'+p+'" target="_blank">\u{1F4AC}</a><a href="tel:'+p+'">\u{1F4DE}</a><a href="mailto:info@hayathospitals.com">\u{1F4E7}</a></div></div><div><h4>'+t.fLinks+'</h4><a href="#depts">'+t.navDepts+'</a><a href="#branches">'+t.navBranches+'</a><a href="#doctors">'+t.navDoctors+'</a><a href="#ecosystem">'+t.fEcosystem+'</a><a href="#ecosystem">'+t.fPortal+'</a></div><div><h4>'+t.fServices+'</h4><a href="tel:'+p+'">'+t.fEmerg+'</a><button data-open="appointment">'+t.fAppt+'</button><button data-open="basma">'+t.fBasma+'</button></div><div><h4>'+t.fContact+'</h4><a href="tel:'+p+'">\u{1F4DE} +'+p+'</a><a href="mailto:info@hayathospitals.com">\u{1F4E7} info@hayathospitals.com</a><a href="https://wa.me/'+p+'" target="_blank">\u{1F4AC} WhatsApp</a></div></div><div class="fb"><p>'+t.fCopy+'</p><p style="margin-top:4px;font-size:.78rem;">'+t.fPowered+' <span class="pw">BrainSAIT Healthcare OS v5.0</span></p></div></div></footer><a href="https://wa.me/'+p+'" class="wa" target="_blank">\u{1F4AC}<div class="pr"></div></a><div class="ts" id="ts"></div>';
}

function hub(t) {
  return '<div class="mx" id="mx"><div class="mx-b" data-close="1"></div><div class="mx-p"><button class="mx-x" data-close="1">×</button><div class="mx-h"><h3 id="mxTitle"></h3><p id="mxSub"></p></div><div id="mxBody"></div><div class="mx-r" id="mxRes" style="display:none"></div></div></div>' +
    '<template id="tpl-appointment"><div class="fx"><div class="fi"><label>'+t.quickName+'</label><input id="apName" autocomplete="name"></div><div class="fi"><label>'+t.quickPhone+'</label><input id="apPhone" inputmode="tel"></div><div class="fi"><label>'+t.quickNational+'</label><input id="apNational"></div><div class="fi"><label>'+t.quickDept+'</label><select id="apDept"><option>Cardiology</option><option>OB/GYN</option><option>Pediatrics</option><option>Dermatology</option><option>Orthopedics</option></select></div><div class="fi"><label>'+t.quickDate+'</label><input id="apDate" type="date"></div><div class="fi"><label>'+t.quickTime+'</label><input id="apTime" type="time"></div><div class="fi full"><label>'+t.quickComplaint+'</label><textarea id="apReason"></textarea></div></div><div class="mx-a"><button class="btn ba bs" data-act="appointment">'+t.sendRequest+'</button><button class="btn bp bs" data-open="eligibility">'+t.eligModalTitle+'</button></div></template>' +
    '<template id="tpl-basma"><div class="fx"><div class="fi full"><label>'+t.askBasma+'</label><textarea id="baMsg" placeholder="'+t.searchPlaceholder+'"></textarea></div></div><div class="mx-a"><button class="btn ba bs" data-act="basma">'+t.askBasma+'</button><button class="btn bp bs" data-act="voice">'+t.aiTalkBtn+'</button></div></template>' +
    '<template id="tpl-homecare"><div class="fx"><div class="fi"><label>'+t.quickName+'</label><input id="hcName"></div><div class="fi"><label>'+t.quickPhone+'</label><input id="hcPhone" inputmode="tel"></div><div class="fi"><label>'+t.quickNational+'</label><input id="hcNational"></div><div class="fi"><label>'+t.quickDate+'</label><input id="hcDate" type="date"></div><div class="fi"><label>'+t.quickTime+'</label><input id="hcTime" type="time"></div><div class="fi"><label>'+t.quickDept+'</label><select id="hcType"><option value="routine">Routine</option><option value="iv-therapy">IV Therapy</option><option value="wound-care">Wound Care</option><option value="physiotherapy">Physiotherapy</option></select></div><div class="fi full"><label>'+t.quickAddress+'</label><textarea id="hcAddress"></textarea></div><div class="fi full"><label>'+t.quickComplaint+'</label><textarea id="hcReason"></textarea></div></div><div class="mx-a"><button class="btn ba bs" data-act="homecare">'+t.sendRequest+'</button></div></template>' +
    '<template id="tpl-telehealth"><div class="fx"><div class="fi"><label>'+t.quickName+'</label><input id="thName"></div><div class="fi"><label>'+t.quickPhone+'</label><input id="thPhone" inputmode="tel"></div><div class="fi"><label>'+t.quickNational+'</label><input id="thNational"></div><div class="fi"><label>'+t.quickDate+'</label><input id="thDate" type="date"></div><div class="fi"><label>'+t.quickTime+'</label><input id="thTime" type="time"></div><div class="fi"><label>'+t.quickDept+'</label><select id="thType"><option value="consultation">Consultation</option><option value="follow-up">Follow-up</option><option value="second-opinion">Second opinion</option><option value="pharmacy">Pharmacy</option></select></div><div class="fi full"><label>'+t.quickComplaint+'</label><textarea id="thReason"></textarea></div></div><div class="mx-a"><button class="btn ba bs" data-act="telehealth">'+t.sendRequest+'</button></div></template>' +
    '<template id="tpl-eligibility"><div class="fx"><div class="fi"><label>'+t.quickInsurance+'</label><input id="elIns"></div><div class="fi"><label>'+t.quickNational+'</label><input id="elNat"></div><div class="fi full"><label>'+t.quickDept+'</label><select id="elType"><option value="medical">Medical</option><option value="hospital">Hospital</option><option value="pharmacy">Pharmacy</option><option value="dental">Dental</option></select></div></div><div class="mx-a"><button class="btn ba bs" data-act="eligibility">'+t.sendRequest+'</button></div></template>' +
    '<template id="tpl-givc"><div class="fx"><div class="fi"><label>الاسم بالعربي / Name (AR)</label><input id="givcNameAr"></div><div class="fi"><label>الاسم بالإنجليزي / Name (EN)</label><input id="givcNameEn"></div><div class="fi"><label>رقم الهوية / National ID</label><input id="givcNat"></div><div class="fi"><label>التخصص / Specialty</label><input id="givcSpec"></div><div class="fi"><label>رقم الترخيص / License #</label><input id="givcLic"></div><div class="fi"><label>الفرع / Branch</label><select id="givcBranch"><option value="R001">Riyadh</option><option value="M001">Madinah</option><option value="K001">Khamis</option><option value="J001">Jizan</option><option value="U001">Unaizah</option></select></div></div><div class="mx-a"><button class="btn ba bs" data-act="givc-register">'+t.givcRegister+'</button><button class="btn bp bs" data-act="givc-network">'+t.givcNetwork+'</button></div></template>' +
    '<template id="tpl-list"><div id="miniList"><div class="ld"><div class="spn"></div></div></div></template>';
}


function scr(A,p,t) {
  return '<script>' +
'\n(function(){' +
'\n  var isAr='+(A?'true':'false')+';' +
'\n  var phone="'+p+'";' +
'\n  var labels={appointment:"'+t.bookModalTitle+'",basma:"'+t.basmaModalTitle+'",homecare:"'+t.homecareModalTitle+'",telehealth:"'+t.telehealthModalTitle+'",eligibility:"'+t.eligModalTitle+'",patient:"'+t.patientTitle+'",providers:"'+t.providerTitle+'",status:"'+t.adminTitle+'",rcm:"'+t.rcmTitle+'",givc:"'+t.givcTitle+'"};' +
'\n  function $(id){return document.getElementById(id);}' +
'\n  function v(id){var e=$(id);return e?e.value.trim():"";}' +
'\n  function today(){return new Date().toISOString().slice(0,10);}' +
'\n  function result(html,ok){var r=$("mxRes");if(!r)return;r.style.display="block";r.className="mx-r "+(ok?"ok":"er");r.innerHTML=html;}' +
'\n  function spin(){var r=$("mxRes");if(r){r.style.display="block";r.className="mx-r";r.innerHTML="<div class=ld><div class=spn></div></div>";}}' +
'\n  function closeMx(){var m=$("mx");if(m)m.classList.remove("on");}' +
'\n  function setDefaults(k){var d=today();["apDate","hcDate","thDate"].forEach(function(id){var e=$(id);if(e&&!e.value)e.value=d;});["apTime","hcTime","thTime"].forEach(function(id){var e=$(id);if(e&&!e.value)e.value="10:00";});}' +
'\n  function openMx(k){var m=$("mx"),b=$("mxBody"),r=$("mxRes"),ti=$("mxTitle"),su=$("mxSub"),tpl=$("tpl-"+(k==="providers"||k==="patient"||k==="status"||k==="rcm"?"list":k));if(!m||!b||!tpl)return;if(ti)ti.textContent=labels[k]||k;if(su)su.textContent="BrainSAIT HNH native workflow · /api/*";b.innerHTML=tpl.innerHTML;if(r){r.style.display="none";r.innerHTML="";}m.classList.add("on");setDefaults(k);if(k==="patient")loadPatients();if(k==="providers")loadProviders();if(k==="status")loadStatus();if(k==="rcm")loadRcm();if(k==="givc")loadGivcNetwork();}' +
'\n  function api(path,opt){opt=opt||{};opt.headers=Object.assign({"Content-Type":"application/json"},opt.headers||{});return fetch(path,opt).then(function(r){return r.json().then(function(d){d.__status=r.status;return d;});});}' +
'\n  function fmt(d){return "<pre style=\"white-space:pre-wrap;margin:0\">"+JSON.stringify(d,null,2).replace(/[<>&]/g,function(c){return {"<":"&lt;",">":"&gt;","&":"&amp;"}[c];})+"</pre>";}' +
'\n  function card(a,b,c){return "<div class=mini-c><strong>"+a+"</strong><span>"+(b||"—")+"</span>"+(c?"<span>"+c+"</span>":"")+"</div>";}' +
'\n  function ensurePatient(prefix){var name=v(prefix+"Name"),ph=v(prefix+"Phone"),nat=v(prefix+"National");if(!name||!ph)return Promise.resolve(null);return api("/api/patients?search="+encodeURIComponent(ph)).then(function(found){var a=found.patients||[];if(a.length)return a[0].id;return api("/api/patients",{method:"POST",body:JSON.stringify({full_name_ar:name,full_name_en:name,phone:ph,national_id:nat})}).then(function(d){return d.patient_id||null;});});}' +
'\n  function loadPatients(){spin();api("/api/patients?limit=8").then(function(d){var a=d.patients||[];result("<div class=mini-g>"+a.map(function(x){return card(x.full_name_ar||x.full_name_en,x.phone,x.national_id);}).join("")+"</div>",true);}).catch(function(){result("'+t.failedAction+'",false);});}' +
'\n  function loadProviders(){spin();api("/api/providers").then(function(d){var a=d.providers||[];result("<div class=mini-g>"+a.slice(0,12).map(function(x){return card(x.name_ar||x.name_en||x.full_name_ar,x.specialty||x.department,x.branch||x.branch_id);}).join("")+"</div>",true);}).catch(function(){result("'+t.failedAction+'",false);});}' +
'\n  function loadStatus(){spin();api("/api/health").then(function(d){result(fmt(d),true);}).catch(function(){result("'+t.failedAction+'",false);});}' +
'\n  function loadRcm(){spin();api("/api/rcm/health").then(function(d){result(fmt(d),true);}).catch(function(){result("'+t.failedAction+'",false);});}' +
'\n  function act(k){if(k==="appointment")return doAppointment();if(k==="basma")return doBasma(false);if(k==="voice")return doBasma(true);if(k==="homecare")return doHomecare();if(k==="telehealth")return doTelehealth();if(k==="eligibility")return doEligibility();if(k==="givc-register")return doGivcRegister();if(k==="givc-network")return loadGivcNetwork();}' +
'\n  function doAppointment(){if(!v("apName")||!v("apPhone")||!v("apDate")){result("'+t.missingFields+'",false);return;}spin();ensurePatient("ap").then(function(pid){if(!pid)throw new Error("patient");return api("/api/appointments",{method:"POST",body:JSON.stringify({patient_id:pid,clinic_name:v("apDept"),appointment_date:v("apDate"),appointment_time:v("apTime")||"10:00",reason:v("apReason"),appointment_type:"digital"})});}).then(function(d){result("✅ '+t.resultReady+'<br>"+fmt(d),!!d.success);}).catch(function(){result("'+t.failedAction+'",false);});}' +
'\n  function sp(text,lang){if(window.speechSynthesis){var u=new SpeechSynthesisUtterance(text);u.lang=lang==="ar"?"ar-SA":"en-US";u.rate=0.95;u.pitch=1;var voices=speechSynthesis.getVoices();var match=voices.find(function(v){return v.lang.startsWith(lang);});if(match)u.voice=match;speechSynthesis.cancel();speechSynthesis.speak(u);}}' +
'\n  function doBasma(voice){var msg=v("baMsg");if(!msg){result("'+t.missingFields+'",false);return;}spin();api("/api/chat",{method:"POST",body:JSON.stringify({message:msg,language:isAr?"ar":"en",session_id:"hnh-web"})}).then(function(d){var answer=d.response||d.reply||d.answer||"—";result(answer,true);if(voice){fetch("/api/voice/speak",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({text:answer,lang:isAr?"ar":"en"})}).then(function(r){if(r.ok)return r.blob();throw new Error("tts-unavailable");}).then(function(blob){if(blob){new Audio(URL.createObjectURL(blob)).play().catch(function(){sp(answer,isAr?"ar":"en");});}}).catch(function(){sp(answer,isAr?"ar":"en");});}}).catch(function(){result("'+t.failedAction+'",false);});}' +
'\n  function doHomecare(){if(!v("hcName")||!v("hcPhone")||!v("hcDate")||!v("hcAddress")){result("'+t.missingFields+'",false);return;}spin();ensurePatient("hc").then(function(pid){return api("/api/homecare/visits",{method:"POST",body:JSON.stringify({patient_id:pid||"PAT-WALKIN",visit_date:v("hcDate"),visit_time:v("hcTime")||"10:00",visit_type:v("hcType"),address:v("hcAddress"),chief_complaint:v("hcReason")})});}).then(function(d){result("✅ '+t.resultReady+'<br>"+fmt(d),!!d.success);}).catch(function(){result("'+t.failedAction+'",false);});}' +
'\n  function doTelehealth(){if(!v("thName")||!v("thPhone")||!v("thDate")){result("'+t.missingFields+'",false);return;}spin();ensurePatient("th").then(function(pid){return api("/api/telehealth/sessions",{method:"POST",body:JSON.stringify({patient_id:pid||"PAT-WALKIN",session_date:v("thDate"),session_time:v("thTime")||"10:00",session_type:v("thType"),chief_complaint:v("thReason")})});}).then(function(d){var link=d.join_url?"<br><a href=\""+d.join_url+"\" target=\"_blank\">"+d.join_url+"</a>":"";result("✅ '+t.resultReady+'<br>"+fmt(d)+link,!!d.success);}).catch(function(){result("'+t.failedAction+'",false);});}' +
'\n  function doEligibility(){if(!v("elIns")){result("'+t.missingFields+'",false);return;}spin();api("/api/eligibility/check",{method:"POST",body:JSON.stringify({insurance_id:v("elIns"),national_id:v("elNat"),service_type:v("elType")||"medical"})}).then(function(d){result(fmt(d),!!d.success);}).catch(function(){result("'+t.failedAction+'",false);});}' +
'\n  function loadGivcNetwork(){spin();api("/givc/api/providers/givc-network").then(function(d){var a=d.doctors||[];if(!a.length){result(\'<div style="text-align:center;padding:20px;color:var(--tl)">'+t.statusOffline+'</div>\',false);return;}result("<div class=mini-g>"+a.slice(0,12).map(function(x){return card(x.name_ar||x.name_en,x.specialty,x.givc_oid?x.givc_oid.slice(-8):"—");}).join("")+"</div>",true);}).catch(function(){result("'+t.failedAction+'",false);});}' +
'\n  function doGivcRegister(){var n=v("givcNameAr"),nat=v("givcNat"),spec=v("givcSpec");if(!n||!nat||!spec){result("'+t.missingFields+'",false);return;}spin();api("/givc/api/providers/givc-register",{method:"POST",body:JSON.stringify({name_ar:n,name_en:v("givcNameEn"),national_id:nat,specialty:spec,license_number:v("givcLic"),branch_code:v("givcBranch")||"R001"})}).then(function(d){result("✅ '+t.resultReady+'<br>"+fmt(d),!!d.success);}).catch(function(){result("'+t.failedAction+'",false);});}' +
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
'\n      if(!d.success||!d.integrations){cont.innerHTML=\'<div style="grid-column:1/-1;text-align:center;padding:20px;color:var(--tl);font-size:.88rem;">'+t.statusOffline+'</div>\';return;}' +
'\n      var ints=[' +
'\n        {key:"oracle_bridge",icon:"\u{1F310}",name:"'+t.oracleBridge+'"},' +
'\n        {key:"nphies_mirror",icon:"\u{1F4CB}",name:"'+t.nphiesPortal+'"},' +
'\n        {key:"claimlinc",icon:"\u{1F4B0}",name:"'+t.claimlincPortal+'"},' +
'\n        {key:"basma_portal",icon:"\u{1F399}\uFE0F",name:"'+t.basmaPortal+'"},' +
'\n        {key:"sbs_portal",icon:"\u{1F4E6}",name:"'+t.sbsPortal+'"},' +
'\n        {key:"givc_portal",icon:"\u{1F504}",name:"'+t.givcPortal+'"}' +
'\n      ];' +
'\n      var html="";' +
'\n      ints.forEach(function(item){' +
'\n        var status=d.integrations[item.key]||"unknown";' +
'\n        var ok=status==="connected"||status==="live";' +
'\n        var warn=status==="warning"||status==="degraded";' +
'\n        var cls="ig-c "+(ok?"g":warn?"w":"");' +
'\n        var scls="ig-b "+(ok?"ok":warn?"warn":"off");' +
'\n        var stxt=ok?"'+t.statusConnected+'":warn?"'+t.statusWarning+'":"'+t.statusOffline+'";' +
'\n        var tnl=(d.integrations.oracle_tunnel&&item.key==="oracle_bridge")?d.integrations.oracle_tunnel:"";' +
'\n        html+=\'<div class="\'+cls+\'"><div class="ig-ic">\'+item.icon+\'</div><div style="flex:1"><div class="ig-n">\'+item.name+\'</div><div class="ig-s">\'+tnl+\'</div></div><span class="\'+scls+\'">\'+stxt+\'</span></div>\';' +
'\n      });' +
'\n      cont.innerHTML=html;' +
'\n      if(d.nphies_mirror){' +
'\n        var ec=document.querySelector(".ec-c.r");' +
'\n        if(ec){' +
'\n          var extra=ec.querySelector(".ec-d");' +
'\n          if(extra)extra.innerHTML+=\'<br><span style="color:var(--s);font-size:.72rem;">GSS: \'+d.nphies_mirror.total_gss+\' | PA: \'+d.nphies_mirror.total_pa+\'</span>\';' +
'\n        }' +
'\n      }' +
'\n    }).catch(function(){' +
'\n      cont.innerHTML=\'<div style="grid-column:1/-1;text-align:center;padding:20px;color:var(--d);font-size:.88rem;">'+t.statusOffline+'</div>\';' +
'\n    });' +
'\n  }' +
'\n  function setTxt(id,val){var e=document.getElementById(id);if(e)e.textContent=(val==null||val===""?"—":Number(val).toLocaleString());}' +
'\n  function loadCommand(){' +
'\n    Promise.allSettled([fetch("/api/stats").then(function(r){return r.json();}),fetch("/api/homecare/stats").then(function(r){return r.json();}),fetch("/api/telehealth/stats").then(function(r){return r.json();}),fetch("/givc/api/providers/givc-network").then(function(r){return r.json();}),fetch("/api/health").then(function(r){return r.json();})]).then(function(rs){' +
'\n      var st=rs[0].value&&rs[0].value.stats||{};setTxt("opsPatients",st.total_patients||0);setTxt("opsToday",st.today_appointments||0);setTxt("opsProviders",st.total_providers||0);setTxt("opsClaims",st.total_claims||0);' +
'\n      var hc=rs[1].value&&rs[1].value.stats||{};setTxt("opsHomecare",hc.total_visits||0);' +
'\n      var th=rs[2].value&&rs[2].value.stats||{};setTxt("opsTelehealth",th.total_sessions||0);' +
'\n      var gd=rs[3].value&&rs[3].value.doctors||[];setTxt("opsGivc",gd.length||0);' +
'\n      var ints=rs[4].value&&rs[4].value.integrations||{};var connected=Object.keys(ints).filter(function(k){return ints[k]==="connected"||ints[k]==="live";}).length;setTxt("opsConnected",connected);' +
'\n    }).catch(function(){});' +
'\n  }' +
'\n  window.addEventListener("scroll",function(){' +
'\n    var h=document.getElementById("hdr");' +
'\n    if(h)h.classList.toggle("sc",window.scrollY>50);' +
'\n  });' +
'\n  var lb=document.getElementById("lb");' +
'\n  if(lb)lb.addEventListener("click",function(){' +
'\n    window.location.href=window.location.pathname+"?lang="+(isAr?"en":"ar");' +
'\n  });' +
'\n  document.addEventListener("click",function(e){var c=e.target.closest("[data-close]");if(c){closeMx();return;}var o=e.target.closest("[data-open]");if(o){e.preventDefault();openMx(o.getAttribute("data-open"));return;}var a=e.target.closest("[data-act]");if(a){e.preventDefault();act(a.getAttribute("data-act"));}});' +
'\n  document.addEventListener("keydown",function(e){if(e.key==="Escape")closeMx();});' +
'\n  var ob=new IntersectionObserver(function(es){' +
'\n    es.forEach(function(e){if(e.isIntersecting)e.target.classList.add("vi");});' +
'\n  },{threshold:0.1});' +
'\n  document.querySelectorAll(".an").forEach(function(el){ob.observe(el);});' +
'\n  ls();loadIntegrations();loadCommand();' +
'\n  window.doSearch=function(){' +
'\n    var q=document.getElementById("srchQ");if(!q)return;' +
'\n    var qv=q.value.trim();if(!qv)return;' +
'\n    var res=document.getElementById("srchRes");if(!res)return;' +
'\n    res.style.display="block";' +
'\n    res.innerHTML=\'<div class="sr-ans" style="text-align:center"><div class="ld"><div class="spn" style="border-color:rgba(255,255,255,.2);border-top-color:#fff"></div></div></div>\';' +
'\n    fetch("/api/search",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({query:qv,lang:isAr?"ar":"en"})})' +
'\n    .then(function(r){return r.json();})' +
'\n    .then(function(d){' +
'\n      var html=\'<div class="sr-ans">\'+(d.answer||d.error||"—")+\'</div>\';' +
'\n      if(d.sources&&d.sources.length)html+=\'<div class="sr-src">\'+d.sources.map(function(s){return \'<span>\'+s+\'</span>\';}).join("")+\'</div>\';' +
'\n      html+=\'<div class="sr-pow">Powered by BrainSAIT AutoRAG \xB7 DeepSeek AI</div>\';' +
'\n      res.innerHTML=html;' +
'\n    })' +
'\n    .catch(function(){res.innerHTML=\'<div class="sr-ans">'+(A?'حدث خطأ. حاول مجدداً.':'Search error. Please try again.')+'</div>\';});' +
'\n  };' +
'\n  var sq=document.getElementById("srchQ");' +
'\n  if(sq)sq.addEventListener("keydown",function(e){if(e.key==="Enter")window.doSearch();});' +
'\n  setTimeout(function(){' +
'\n    document.querySelectorAll(".an").forEach(function(el){' +
'\n      if(el.getBoundingClientRect().top<window.innerHeight)el.classList.add("vi");' +
'\n    });' +
'\n  },500);' +
'\n})();' +
'<\/script>';
}

function providerDashboardPage(req) {
  var url = new URL(req.url);
  var lang = url.searchParams.get('lang') || 'en';
  var isAr = lang === 'ar';
  var dir = isAr ? 'rtl' : 'ltr';
  var providerId = url.searchParams.get('provider') || '';
  var copy = isAr ? {
    title: 'لوحة الطبيب', subtitle: 'مساحة عمل سريرية متكاملة مع HNH و GIVC و NPHIES', overview: 'نظرة عامة', patients: 'المرضى', appointments: 'المواعيد', nphies: 'NPHIES', network: 'شبكة GIVC', insights: 'رؤى مدعومة بالذكاء الاصطناعي', back: 'العودة إلى HNH', eligibility: 'تحقق الأهلية', refresh: 'تحديث', live: 'حي', provider: 'الطبيب', active: 'نشط'
  } : {
    title: 'Doctor Dashboard', subtitle: 'Premium clinical workspace integrated with HNH, GIVC, and NPHIES', overview: 'Overview', patients: 'Patients', appointments: 'Appointments', nphies: 'NPHIES', network: 'GIVC Network', insights: 'AI-Powered Insights', back: 'Back to HNH', eligibility: 'Eligibility Check', refresh: 'Refresh', live: 'Live', provider: 'Provider', active: 'Active'
  };
  var css = `:root{--p:#1193d4;--ink:#0f1c22;--mut:#617c89;--bg:#f6f8fb;--card:#fff;--line:#e8eef2;--ok:#10b981;--warn:#f59e0b;--nav:#101c22}*{box-sizing:border-box}body{margin:0;background:radial-gradient(circle at 20% 0%,rgba(17,147,212,.18),transparent 30%),linear-gradient(180deg,#f6f8fb,#eef4f7);color:var(--ink);font-family:${isAr ? "'IBM Plex Sans Arabic'" : "Inter"},system-ui,sans-serif;min-height:100vh}.shell{display:grid;grid-template-columns:280px 1fr;min-height:100vh}.side{background:linear-gradient(180deg,#101c22,#18303a);color:#fff;padding:24px;position:sticky;top:0;height:100vh}.brand{display:flex;gap:12px;align-items:center;margin-bottom:30px}.mark{width:48px;height:48px;border-radius:16px;background:linear-gradient(135deg,#1193d4,#73d7ff);display:grid;place-items:center;font-weight:900;box-shadow:0 16px 45px rgba(17,147,212,.35)}.brand h1{font-size:1.05rem;margin:0}.brand p{font-size:.78rem;color:#a0b4bc;margin:2px 0 0}.nav{display:grid;gap:8px}.nav a{display:flex;gap:12px;align-items:center;color:#cfe1e8;text-decoration:none;padding:12px;border-radius:14px;font-weight:750;font-size:.92rem}.nav a.on,.nav a:hover{background:rgba(255,255,255,.1);color:#fff}.sidefoot{position:absolute;bottom:24px;left:24px;right:24px;color:#a0b4bc;font-size:.78rem}.sidefoot a{color:#d9eef8}.main{padding:28px;display:grid;gap:22px}.top{display:flex;justify-content:space-between;gap:16px;align-items:flex-start}.eyebrow{display:inline-flex;gap:8px;align-items:center;background:#e8f7ff;color:#0369a1;border:1px solid #c7ecff;border-radius:999px;padding:6px 10px;font-weight:850;font-size:.78rem}.top h2{font-size:clamp(1.8rem,3vw,3.2rem);line-height:1;margin:14px 0 8px;letter-spacing:-.04em}.top p{color:var(--mut);margin:0;max-width:720px}.tools{display:flex;gap:10px;flex-wrap:wrap;justify-content:flex-end}.btn{border:0;border-radius:14px;padding:11px 15px;font-weight:850;cursor:pointer;text-decoration:none;display:inline-flex;align-items:center;gap:8px}.btn.primary{background:var(--p);color:#fff;box-shadow:0 14px 34px rgba(17,147,212,.28)}.btn.ghost{background:#fff;color:var(--ink);border:1px solid var(--line)}.grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px}.card{background:rgba(255,255,255,.9);border:1px solid rgba(226,236,241,.95);border-radius:24px;padding:18px;box-shadow:0 16px 40px rgba(16,28,34,.08);backdrop-filter:blur(16px)}.metric .k{color:var(--mut);font-weight:800;font-size:.78rem;text-transform:uppercase;letter-spacing:.08em}.metric .v{font-size:2rem;font-weight:950;letter-spacing:-.04em;margin-top:6px}.metric .s{color:var(--mut);font-size:.82rem}.wide{display:grid;grid-template-columns:1.25fr .75fr;gap:16px}.section-title{display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;gap:12px}.section-title h3{margin:0;font-size:1.1rem}.list{display:grid;gap:10px}.row{display:flex;align-items:center;gap:12px;border:1px solid var(--line);background:#fff;border-radius:18px;padding:12px}.avatar{width:46px;height:46px;border-radius:15px;background:linear-gradient(135deg,#dff4ff,#b7e6ff);display:grid;place-items:center;font-weight:950;color:#075985;flex:0 0 auto}.grow{flex:1;min-width:0}.grow b{display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.grow span{color:var(--mut);font-size:.85rem}.pill{border-radius:999px;padding:5px 9px;font-size:.74rem;font-weight:900;background:#ecfdf5;color:#047857}.pill.warn{background:#fffbeb;color:#b45309}.nphies{background:linear-gradient(135deg,#10232c,#173b49);color:#fff;overflow:hidden;position:relative}.nphies:after{content:"";position:absolute;width:220px;height:220px;border-radius:50%;right:-70px;top:-70px;background:rgba(17,147,212,.25)}.nphies>*{position:relative;z-index:1}.mut{color:#a0b4bc}.bar{height:9px;border-radius:999px;background:rgba(255,255,255,.12);overflow:hidden;margin:14px 0}.bar i{display:block;height:100%;width:88%;background:linear-gradient(90deg,#10b981,#73d7ff)}.tabs{display:flex;gap:8px;flex-wrap:wrap}.tab{border:1px solid var(--line);background:#fff;border-radius:999px;padding:8px 12px;font-weight:850;color:var(--mut);cursor:pointer}.tab.on{background:#101c22;color:#fff}.panel{display:none}.panel.on{display:block}.actions{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin-top:18px}.action{border:1px solid rgba(255,255,255,.14);background:rgba(255,255,255,.08);border-radius:22px;padding:16px;text-decoration:none;color:#fff;font-weight:900;display:grid;gap:8px}.icon{width:40px;height:40px;border-radius:14px;background:#e8f7ff;color:#0369a1;display:grid;place-items:center;font-size:1rem}.empty{padding:22px;text-align:center;color:var(--mut)}.footnav{display:none}@media(max-width:980px){.shell{grid-template-columns:1fr}.side{position:static;height:auto}.sidefoot{display:none}.grid{grid-template-columns:repeat(2,minmax(0,1fr))}.wide{grid-template-columns:1fr}.main{padding:18px 14px 92px}.footnav{display:flex;position:fixed;bottom:0;left:0;right:0;background:#fff;border-top:1px solid var(--line);justify-content:space-around;padding:9px 4px;z-index:10}.footnav a{font-size:.72rem;color:var(--mut);text-decoration:none;display:grid;place-items:center;gap:2px}.footnav a.on{color:var(--p)}}@media(max-width:560px){.grid{grid-template-columns:1fr}.top{display:grid}.tools{justify-content:flex-start}.actions{grid-template-columns:1fr}}`;
  var js = `const providerId=${JSON.stringify(providerId)};const copy=${JSON.stringify(copy)};const $=id=>document.getElementById(id);function safe(s){return String(s||'').replace(/[<>&]/g,c=>({'<':'&lt;','>':'&gt;','&':'&amp;'}[c]));}function initials(s){return safe(s).replace(/^د\.\s*|^Dr\.\s*/,'').slice(0,2)||'DR';}async function api(p,o){const r=await fetch(p,o);return r.json();}function row(name,meta,status){return '<div class="row"><div class="avatar">'+initials(name)+'</div><div class="grow"><b>'+safe(name)+'</b><span>'+safe(meta)+'</span></div>'+(status?'<span class="pill '+(status==='warning'?'warn':'')+'">'+safe(status)+'</span>':'')+'</div>';}function setMetric(id,v){const e=$(id);if(e)e.textContent=v;}async function load(){const [stats,providers,appointments,patients,health,givc]=await Promise.allSettled([api('/api/stats'),api('/api/providers'),api('/api/appointments?limit=8'),api('/api/patients?limit=8'),api('/api/health'),api('/givc/api/providers/givc-network')]);const st=stats.value&&stats.value.stats||{};setMetric('mPatients',st.total_patients||0);setMetric('mToday',st.today_appointments||0);setMetric('mProviders',st.total_providers||0);setMetric('mClaims',st.total_claims||0);const ps=(providers.value&&providers.value.providers)||[];const selected=providerId?ps.find(p=>p.id===providerId||String(p.db_id)===providerId||p.givc_oid===providerId):ps.find(p=>p.givc_registered)||ps[0];if(selected){$('providerName').textContent=selected.name_en||selected.name_ar||copy.provider;$('providerMeta').textContent=[selected.specialty,selected.branch||selected.branch_id,selected.givc_oid?'OID '+selected.givc_oid:''].filter(Boolean).join(' · ');}const apps=(appointments.value&&appointments.value.appointments)||[];$('appointments').innerHTML=apps.length?apps.map(a=>row(a.patient_name_en||a.patient_name_ar||('Patient #'+a.patient_id),(a.appointment_date||'')+' · '+(a.appointment_time||'')+' · '+(a.clinic_name||a.appointment_type||''),a.status==='scheduled'?'live':a.status)).join(''):'<div class="empty">No appointments found</div>';const pats=(patients.value&&patients.value.patients)||[];$('patients').innerHTML=pats.length?pats.map(p=>row(p.full_name_en||p.full_name_ar,p.phone||p.national_id||p.mrn,'live')).join(''):'<div class="empty">No patients found</div>';const gdocs=(givc.value&&givc.value.doctors)||[];$('network').innerHTML=gdocs.length?gdocs.slice(0,8).map(d=>row(d.name_en||d.name_ar,[d.specialty,d.branch_code,d.givc_oid].filter(Boolean).join(' · '),d.network_visibility==='public'?'live':'warning')).join(''):'<div class="empty">No GIVC doctors found</div>';const ints=(health.value&&health.value.integrations)||{};$('nphiesStatus').textContent='ClaimLinc '+(ints.claimlinc||'unknown')+' · NPHIES Mirror '+(ints.nphies_mirror||'unknown');$('oracleStatus').textContent='Oracle '+(ints.oracle_bridge||'unknown')+' · GIVC '+(ints.givc_portal||'unknown');}document.addEventListener('click',e=>{const t=e.target.closest('[data-tab]');if(!t)return;document.querySelectorAll('.tab,.panel').forEach(x=>x.classList.remove('on'));t.classList.add('on');$(t.dataset.tab).classList.add('on');});load().catch(e=>{document.querySelectorAll('[data-live]').forEach(el=>el.innerHTML='<div class="empty">Unable to load live data</div>');});`;
  var html = '<!doctype html><html lang="'+lang+'" dir="'+dir+'"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#101c22"><title>'+copy.title+' | HNH</title><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&family=Inter:wght@400;500;700;900&display=swap" rel="stylesheet"><style>'+css+'</style></head><body><div class="shell"><aside class="side"><div class="brand"><div class="mark">H</div><div><h1>BrainSAIT HNH</h1><p>Clinical Command Center</p></div></div><nav class="nav"><a class="on" href="#overview">⌁ '+copy.overview+'</a><a href="#patients">☷ '+copy.patients+'</a><a href="#appointments">◷ '+copy.appointments+'</a><a href="#nphies">◈ '+copy.nphies+'</a><a href="/givc/network">◎ '+copy.network+'</a></nav><div class="sidefoot">'+copy.live+' · HNH + GIVC + NPHIES<br><a href="/">'+copy.back+'</a></div></aside><main class="main"><section class="top" id="overview"><div><span class="eyebrow">● '+copy.live+' Workspace</span><h2>'+copy.title+'</h2><p>'+copy.subtitle+'</p></div><div class="tools"><a class="btn ghost" href="/">'+copy.back+'</a><button class="btn primary" onclick="location.reload()">'+copy.refresh+'</button></div></section><section class="card"><div class="section-title"><div><h3 id="providerName">'+copy.provider+'</h3><p id="providerMeta" style="margin:4px 0 0;color:var(--mut)">Loading provider network...</p></div><span class="pill">'+copy.active+'</span></div></section><section class="grid"><div class="card metric"><div class="k">Patients</div><div class="v" id="mPatients">—</div><div class="s">registered records</div></div><div class="card metric"><div class="k">Today</div><div class="v" id="mToday">—</div><div class="s">scheduled visits</div></div><div class="card metric"><div class="k">Doctors</div><div class="v" id="mProviders">—</div><div class="s">HNH network</div></div><div class="card metric"><div class="k">Claims</div><div class="v" id="mClaims">—</div><div class="s">RCM ledger</div></div></section><section class="wide"><div class="card"><div class="section-title"><h3>'+copy.insights+'</h3><div class="tabs"><button class="tab on" data-tab="appointments">'+copy.appointments+'</button><button class="tab" data-tab="patients">'+copy.patients+'</button><button class="tab" data-tab="network">'+copy.network+'</button></div></div><div id="appointments" class="panel on list" data-live></div><div id="patients" class="panel list" data-live></div><div id="network" class="panel list" data-live></div></div><div class="card nphies" id="nphies"><div class="section-title"><h3>'+copy.nphies+'</h3><span class="pill">V2</span></div><p class="mut" id="nphiesStatus">Loading...</p><div class="bar"><i></i></div><p class="mut" id="oracleStatus">Loading...</p><div class="actions"><a class="action" href="/api/nphies/270"><span class="icon">270</span>'+copy.eligibility+'</a><a class="action" href="/api/rcm/health"><span class="icon">RCM</span>Revenue Cycle</a><a class="action" href="/givc/network"><span class="icon">OID</span>'+copy.network+'</a><a class="action" href="/api/fhir/Practitioner/'+(providerId||'DRV-S85MNP')+'"><span class="icon">FHIR</span>Practitioner</a></div></div></section></main></div><nav class="footnav"><a class="on" href="#overview">⌁<span>'+copy.overview+'</span></a><a href="#patients">☷<span>'+copy.patients+'</span></a><a href="#appointments">◷<span>'+copy.appointments+'</span></a><a href="#nphies">◈<span>'+copy.nphies+'</span></a></nav><script>'+js+'<\/script></body></html>';
  html = html.replace('href="/api/nphies/270"', 'href="/givc/?lang=' + lang + '#eligibility"');
  return new Response(html, { headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'public, max-age=120' } });
}



export function servePage(req) {
  var url = new URL(req.url);
  var path = url.pathname.replace(/\/index\.html$/, '/').replace(/^\//, '') || 'index';
  path = path.replace(/\.html$/, '') || 'index';

  if (path === 'provider-dashboard' || path === 'doctor-dashboard') {
    return providerDashboardPage(req);
  }
  
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
  html += '<style>' + CSS + UX_CSS + ENHANCE_CSS + '</style></head><body>';

  html += hdr(t, p);
  html += bdy(t, A, p);
  html += commandSec(t);
  html += featureSec(t);
  html += searchSec(t);
  // Pre-render grids server-side (eliminates client-side DE/BR/DO arrays)
  var dgHtml = DE.map(function(d,i){
    return '<div class="cd dc an d'+(i%4+1)+'"><div class="ci">'+d.i+'</div><h3>'+(A?d.nA:d.nE)+'</h3><p>'+(A?d.dA:d.dE)+'</p></div>';
  }).join('');
  var bgHtml = BR.map(function(b,i){
    var slug=(A?b.nA:b.nE).toLowerCase().replace(/\s/g,'-');
    return '<div class="cd bc an d'+(i%3+1)+'"><div class="bh"><h3>'+(A?b.nA:b.nE)+'</h3><div class="bcx">'+(A?b.aA:b.aE)+'</div></div><div class="bb"><a href="tel:'+p+'" class="btn bp bs">'+(A?'اتصل':'Call')+'</a><button data-open="status" class="btn bw bs">'+(A?'حالة الفرع':'Live status')+'</button></div></div>';
  }).join('');
  var dogHtml = DO.map(function(d,i){
    var nm=A?d.nA:d.nE;
    var init=nm.replace('د. ','').replace('Dr. ','').charAt(0);
    return '<div class="cd dcc an d'+(i%4+1)+'"><div class="da">'+init+'</div><h3>'+nm+'</h3><div class="sp">'+(A?d.sA:d.sE)+'</div><button data-open="appointment" class="btn bp bs">'+(A?'احجز':'Book')+'</button></div>';
  }).join('');

  html += '<section class="se sel" id="depts"><div class="co"><div class="sh an"><h2>' + t.secDeptsTitle + '</h2><div class="gl"></div><p>' + t.secDeptsSub + '</p></div><div class="g4" id="dg">' + dgHtml + '</div></div></section>';
  html += '<section class="se sea" id="branches"><div class="co"><div class="sh an"><h2>' + t.secBranchesTitle + '</h2><div class="gl"></div><p>' + t.secBranchesSub + '</p></div><div class="g3" id="bg">' + bgHtml + '</div></div></section>';
  html += '<section class="se sel" id="doctors"><div class="co"><div class="sh an"><h2>' + t.secDoctorsTitle + '</h2><div class="gl"></div><p>' + t.secDoctorsSub + '</p></div><div class="g4" id="dog">' + dogHtml + '</div></div></section>';
  html += ecoSys(t);
  html += dhsSec(t);
  html += '<section class="cs"><div class="co"><h2>' + t.ctaTitle + '</h2><p>' + t.ctaSub + '</p><div class="cb"><button data-open="appointment" class="btn ba bl">' + t.ctaBook + '</button><button data-open="basma" class="btn bw bl">\u{1F399}\uFE0F ' + t.aiChatBtn + '</button></div></div></section>';
  html += ftr(t, p);
  html += hub(t);
  html += scr(A, p, t);
  html += '</body></html>';

  return new Response(html, {
    headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'public, max-age=300' }
  });
}
