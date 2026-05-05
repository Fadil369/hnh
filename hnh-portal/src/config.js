export const CONFIG = {
  NAME: 'HNH Portal - BrainSAIT Healthcare OS',
  VERSION: '9.3.0',
  SITE_URL: 'https://hnh.brainsait.org',
  CONTACT_EMAIL: 'info@hnh.brainsait.org',

  // AI model
  AI_MODEL: '@cf/meta/llama-3.3-70b-instruct-fp8-fast',
  AI_FALLBACK_MODEL: '@cf/meta/llama-3-8b-instruct',
  AI_MAX_TOKENS: 600,
  AI_TEMPERATURE: 0.6,

  // Rate limiting
  RATE_LIMIT_WINDOW_MS: 60000,
  RATE_LIMIT_MAX_REQUESTS: 100,

  // NPHIES
  NPHIES_VERSION: 'V2',
  NPHIES_CLAIMS_VERSION: '5010',

  // Branch IDs
  BRANCHES: {
    RIYADH: 'R001',
    JAZAN: 'J001',
    KHAMIS_MUSHAIT: 'K001',
    MADINAH: 'M001',
    UNAYZAH: 'U001',
  },

  // Corporate info (from hayathospitals.com cached content)
  CORPORATE: {
    FOUNDED: 1999,
    OWNER: 'Al-Inmaa Medical Services Company (شركة الانماء للخدمات الطبية)',
    CHAIRMAN: 'A. Mohammed bin Nasser bin Jar Allah',
    CEO: { name_ar: 'د. فوزية الجار الله', name_en: 'Dr. Fawzia Al-Jar Allah' },
    CEO_ASSISTANT: { name_ar: 'د. حسين بن حسوسة', name_en: 'Dr. Hussein bin Husousa' },
    CEO_ACHIEVEMENT: 'Selected among top 100 healthcare leaders in the Middle East',
    YEARS_OPERATING: '25+ years',
    STATS: {
      doctors: 700,
      outpatient_clinics: 500,
      employees: 3500,
      beds: 1200,
      surgeries_per_year: 40000,
      nurses: 1200,
      branches: 5,
      annual_outpatient_visits: 2200000,
    },
    VISION: 'To be a leader in healthcare in Saudi Arabia and the Middle East through continuous innovation, high-quality care meeting global standards, and horizontal expansion across the Kingdom.',
    MISSION: 'Providing distinguished, integrated, patient-focused healthcare committed to innovative treatment supported by highly experienced specialists, with quality, efficiency, and compassion.',
    VALUES: [
      'Superior and professional healthcare',
      'Honesty and credibility',
      'Commitment to social responsibility',
      'Full commitment to patient and visitor privacy',
      'Commitment to Islamic teachings',
      'Quality and safety',
    ],
  },

  // Departments (from hayathospitals.com cached content)
  DEPARTMENTS: [
    { id: 'emergency', ar: 'طوارئ', en: 'Emergency' },
    { id: 'internal', ar: 'باطنية', en: 'Internal Medicine' },
    { id: 'surgery', ar: 'جراحة عامة وجراحة سمنة', en: 'General & Bariatric Surgery' },
    { id: 'orthopedics', ar: 'عظام', en: 'Orthopedics' },
    { id: 'pediatrics', ar: 'أطفال', en: 'Pediatrics' },
    { id: 'obgyn', ar: 'نساء وولادة', en: 'Obstetrics & Gynecology' },
    { id: 'cardiology', ar: 'قلب (قسطرة قلبية)', en: 'Cardiology (Catheterization)' },
    { id: 'dermatology', ar: 'جلدية وليزر', en: 'Dermatology & Laser' },
    { id: 'ent', ar: 'أنف وأذن وحنجرة', en: 'Ear, Nose & Throat (ENT)' },
    { id: 'dentistry', ar: 'أسنان', en: 'Dentistry' },
    { id: 'ophthalmology', ar: 'عيون', en: 'Ophthalmology' },
    { id: 'urology', ar: 'مسالك بولية', en: 'Urology' },
    { id: 'neurology', ar: 'مخ وأعصاب وجراحة أعصاب', en: 'Neurology & Neurosurgery' },
    { id: 'nephrology', ar: 'أمراض الكلى', en: 'Nephrology' },
    { id: 'endocrinology', ar: 'غدد صماء', en: 'Endocrinology' },
    { id: 'psychiatry', ar: 'طب نفسي', en: 'Psychiatry' },
    { id: 'radiology', ar: 'أشعة', en: 'Radiology' },
    { id: 'laboratory', ar: 'مختبر', en: 'Laboratory' },
    { id: 'pharmacy', ar: 'صيدلية', en: 'Pharmacy' },
  ],


  // Full departments list (42) from hayathospitals.com
  DEPARTMENTS_FULL: [
    // Surgical
    { id: 'general_surgery', ar: 'جراحة عامة', en: 'General Surgery' },
    { id: 'bariatric_surgery', ar: 'جراحة سمنة', en: 'Bariatric Surgery' },
    { id: 'plastic_surgery', ar: 'جراحة تجميل وترميم', en: 'Plastic & Reconstructive Surgery' },
    { id: 'orthopedic_surgery', ar: 'جراحة عظام', en: 'Orthopedic Surgery' },
    { id: 'neurosurgery', ar: 'جراحة مخ وأعصاب وعمود فقري', en: 'Neurosurgery & Spine Surgery' },
    { id: 'vascular_surgery', ar: 'جراحة أوعية دموية', en: 'Vascular Surgery' },
    { id: 'urology_surgery', ar: 'جراحة مسالك بولية', en: 'Urology Surgery' },
    { id: 'ophthalmology_surgery', ar: 'جراحة عيون', en: 'Ophthalmology Surgery' },
    { id: 'ent_surgery', ar: 'جراحة أنف وأذن وحنجرة', en: 'ENT Surgery' },
    { id: 'pediatric_surgery', ar: 'جراحة أطفال', en: 'Pediatric Surgery' },
    { id: 'cardiothoracic_surgery', ar: 'جراحة قلب', en: 'Cardiothoracic Surgery' },
    { id: 'oral_surgery', ar: 'جراحة وجه وأسنان', en: 'Oral & Maxillofacial Surgery' },
    // Medical
    { id: 'internal_medicine', ar: 'باطنية', en: 'Internal Medicine' },
    { id: 'cardiology', ar: 'قلب (قسطرة قلبية)', en: 'Cardiology (Catheterization)' },
    { id: 'neurology', ar: 'مخ وأعصاب', en: 'Neurology' },
    { id: 'nephrology', ar: 'أمراض الكلى', en: 'Nephrology' },
    { id: 'endocrinology', ar: 'غدد صماء وسكري', en: 'Endocrinology & Diabetes' },
    { id: 'pulmonology', ar: 'صدرية وجهاز تنفسي', en: 'Pulmonology' },
    { id: 'gastroenterology', ar: 'جهاز هضمي ومناظير', en: 'Gastroenterology & Hepatology' },
    { id: 'rheumatology', ar: 'روماتيزم', en: 'Rheumatology' },
    { id: 'psychiatry', ar: 'طب نفسي', en: 'Psychiatry' },
    { id: 'dermatology', ar: 'جلدية وليزر', en: 'Dermatology & Laser' },
    { id: 'oncology', ar: 'أورام', en: 'Oncology' },
    { id: 'pain_management', ar: 'علاج الألم', en: 'Pain Management' },
    { id: 'allergy_immunology', ar: 'حساسية ومناعة', en: 'Allergy & Immunology' },
    // Women & Children
    { id: 'obgyn', ar: 'نساء وولادة', en: 'Obstetrics & Gynecology' },
    { id: 'infertility', ar: 'عقم وأطفال أنابيب', en: 'Infertility & IVF' },
    { id: 'pediatrics', ar: 'أطفال', en: 'Pediatrics' },
    { id: 'neonatology', ar: 'حديثي ولادة', en: 'Neonatology' },
    { id: 'pediatric_cardiology', ar: 'قلب أطفال', en: 'Pediatric Cardiology' },
    // Support
    { id: 'radiology', ar: 'أشعة وتصوير طبي', en: 'Radiology & Medical Imaging' },
    { id: 'laboratory', ar: 'مختبر وبنك دم', en: 'Laboratory & Pathology' },
    { id: 'nuclear_medicine', ar: 'طب نووي', en: 'Nuclear Medicine' },
    { id: 'rehabilitation', ar: 'طب طبيعي وإعادة تأهيل', en: 'Physical Therapy & Rehabilitation' },
    { id: 'respiratory_therapy', ar: 'علاج تنفسي', en: 'Respiratory Therapy' },
    { id: 'nutrition', ar: 'تغذية وعلاج غذائي', en: 'Nutrition & Dietetics' },
    { id: 'emergency', ar: 'طوارئ', en: 'Emergency Department' },
    { id: 'icu', ar: 'عناية مركزة', en: 'Intensive Care Unit (ICU)' },
    { id: 'nicu', ar: 'عناية أطفال حديثي ولادة', en: 'Neonatal ICU (NICU)' },
    { id: 'dentistry', ar: 'أسنان', en: 'Dentistry' },
    { id: 'pharmacy', ar: 'صيدلية', en: 'Pharmacy' },
    { id: 'home_healthcare', ar: 'رعاية منزلية', en: 'Home Healthcare' },
  ],

  // Insurance partners (from hayathospitals.com)
  INSURANCE_PARTNERS: [
    'Bupa Arabia', 'Tawuniya', 'MedGulf', 'Allianz Saudi Fransi',
    'GlobeMed', 'Amana Insurance', 'Arabian Shield', 'Sagr Insurance',
    'GIG Gulf', 'Walaa Insurance'
  ],

  // General contact
  GENERAL_PHONE: '966920000094',
  EMERGENCY: '997', // Saudi Red Crescent
  MOBILE_APP: {
    ios: 'https://apps.apple.com/app/id6449023535',
    android: 'https://play.google.com/store/apps/details?id=com.alhayat.patientapp',
  },
  SUBDOMAINS: ['riyadh', 'jazan', 'khamis', 'unaizah'],
  HAYAT_ACADEMY: true,
  HOME_HEALTHCARE: 'https://homecare.hayathospitals.com',
  MEDICAL_JOURNAL: 'https://hayathospitals.com/journal/',
  ARAB_HEALTH_2023: true,
  NAFIS_PLATFORM_AWARD: true,
};

export const SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(self), geolocation=()',
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
  'Cache-Control': 'no-cache, no-store, must-revalidate',
};
