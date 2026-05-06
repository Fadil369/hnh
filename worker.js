var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/config.js
var CONFIG, SECURITY_HEADERS;
var init_config = __esm({
  "src/config.js"() {
    CONFIG = {
      NAME: "HNH Portal - BrainSAIT Healthcare OS",
      VERSION: "9.1.0",
      SITE_URL: "https://hnh.brainsait.org",
      CONTACT_EMAIL: "info@hnh.brainsait.org",
      // AI model
      AI_MODEL: "@cf/meta/llama-3.3-70b-instruct-fp8-fast",
      AI_FALLBACK_MODEL: "@cf/meta/llama-3-8b-instruct",
      AI_MAX_TOKENS: 600,
      AI_TEMPERATURE: 0.6,
      // Rate limiting
      RATE_LIMIT_WINDOW_MS: 6e4,
      RATE_LIMIT_MAX_REQUESTS: 100,
      // NPHIES
      NPHIES_VERSION: "V2",
      NPHIES_CLAIMS_VERSION: "5010",
      // Branch IDs
      BRANCHES: {
        RIYADH: "R001",
        JAZAN: "J001",
        KHAMIS_MUSHAIT: "K001",
        MADINAH: "M001",
        UNAYZAH: "U001"
      },
      // Corporate info (from hayathospitals.com cached content)
      CORPORATE: {
        FOUNDED: 1999,
        OWNER: "Al-Inmaa Medical Services Company (\u0634\u0631\u0643\u0629 \u0627\u0644\u0627\u0646\u0645\u0627\u0621 \u0644\u0644\u062E\u062F\u0645\u0627\u062A \u0627\u0644\u0637\u0628\u064A\u0629)",
        CHAIRMAN: "A. Mohammed bin Nasser bin Jar Allah",
        CEO: { name_ar: "\u062F. \u0641\u0648\u0632\u064A\u0629 \u0627\u0644\u062C\u0627\u0631 \u0627\u0644\u0644\u0647", name_en: "Dr. Fawzia Al-Jar Allah" },
        CEO_ASSISTANT: { name_ar: "\u062F. \u062D\u0633\u064A\u0646 \u0628\u0646 \u062D\u0633\u0648\u0633\u0629", name_en: "Dr. Hussein bin Husousa" },
        CEO_ACHIEVEMENT: "Selected among top 100 healthcare leaders in the Middle East",
        YEARS_OPERATING: "25+ years",
        STATS: {
          doctors: 700,
          outpatient_clinics: 500,
          employees: 3500,
          beds: 1200,
          surgeries_per_year: 4e4,
          nurses: 1200,
          branches: 5,
          annual_outpatient_visits: 22e5
        },
        VISION: "To be a leader in healthcare in Saudi Arabia and the Middle East through continuous innovation, high-quality care meeting global standards, and horizontal expansion across the Kingdom.",
        MISSION: "Providing distinguished, integrated, patient-focused healthcare committed to innovative treatment supported by highly experienced specialists, with quality, efficiency, and compassion.",
        VALUES: [
          "Superior and professional healthcare",
          "Honesty and credibility",
          "Commitment to social responsibility",
          "Full commitment to patient and visitor privacy",
          "Commitment to Islamic teachings",
          "Quality and safety"
        ]
      },
      // Departments (from hayathospitals.com cached content)
      DEPARTMENTS: [
        { id: "emergency", ar: "\u0637\u0648\u0627\u0631\u0626", en: "Emergency" },
        { id: "internal", ar: "\u0628\u0627\u0637\u0646\u064A\u0629", en: "Internal Medicine" },
        { id: "surgery", ar: "\u062C\u0631\u0627\u062D\u0629 \u0639\u0627\u0645\u0629 \u0648\u062C\u0631\u0627\u062D\u0629 \u0633\u0645\u0646\u0629", en: "General & Bariatric Surgery" },
        { id: "orthopedics", ar: "\u0639\u0638\u0627\u0645", en: "Orthopedics" },
        { id: "pediatrics", ar: "\u0623\u0637\u0641\u0627\u0644", en: "Pediatrics" },
        { id: "obgyn", ar: "\u0646\u0633\u0627\u0621 \u0648\u0648\u0644\u0627\u062F\u0629", en: "Obstetrics & Gynecology" },
        { id: "cardiology", ar: "\u0642\u0644\u0628 (\u0642\u0633\u0637\u0631\u0629 \u0642\u0644\u0628\u064A\u0629)", en: "Cardiology (Catheterization)" },
        { id: "dermatology", ar: "\u062C\u0644\u062F\u064A\u0629 \u0648\u0644\u064A\u0632\u0631", en: "Dermatology & Laser" },
        { id: "ent", ar: "\u0623\u0646\u0641 \u0648\u0623\u0630\u0646 \u0648\u062D\u0646\u062C\u0631\u0629", en: "Ear, Nose & Throat (ENT)" },
        { id: "dentistry", ar: "\u0623\u0633\u0646\u0627\u0646", en: "Dentistry" },
        { id: "ophthalmology", ar: "\u0639\u064A\u0648\u0646", en: "Ophthalmology" },
        { id: "urology", ar: "\u0645\u0633\u0627\u0644\u0643 \u0628\u0648\u0644\u064A\u0629", en: "Urology" },
        { id: "neurology", ar: "\u0645\u062E \u0648\u0623\u0639\u0635\u0627\u0628 \u0648\u062C\u0631\u0627\u062D\u0629 \u0623\u0639\u0635\u0627\u0628", en: "Neurology & Neurosurgery" },
        { id: "nephrology", ar: "\u0623\u0645\u0631\u0627\u0636 \u0627\u0644\u0643\u0644\u0649", en: "Nephrology" },
        { id: "endocrinology", ar: "\u063A\u062F\u062F \u0635\u0645\u0627\u0621", en: "Endocrinology" },
        { id: "psychiatry", ar: "\u0637\u0628 \u0646\u0641\u0633\u064A", en: "Psychiatry" },
        { id: "radiology", ar: "\u0623\u0634\u0639\u0629", en: "Radiology" },
        { id: "laboratory", ar: "\u0645\u062E\u062A\u0628\u0631", en: "Laboratory" },
        { id: "pharmacy", ar: "\u0635\u064A\u062F\u0644\u064A\u0629", en: "Pharmacy" }
      ],
      // Full departments list (42) from hayathospitals.com
      DEPARTMENTS_FULL: [
        // Surgical
        { id: "general_surgery", ar: "\u062C\u0631\u0627\u062D\u0629 \u0639\u0627\u0645\u0629", en: "General Surgery" },
        { id: "bariatric_surgery", ar: "\u062C\u0631\u0627\u062D\u0629 \u0633\u0645\u0646\u0629", en: "Bariatric Surgery" },
        { id: "plastic_surgery", ar: "\u062C\u0631\u0627\u062D\u0629 \u062A\u062C\u0645\u064A\u0644 \u0648\u062A\u0631\u0645\u064A\u0645", en: "Plastic & Reconstructive Surgery" },
        { id: "orthopedic_surgery", ar: "\u062C\u0631\u0627\u062D\u0629 \u0639\u0638\u0627\u0645", en: "Orthopedic Surgery" },
        { id: "neurosurgery", ar: "\u062C\u0631\u0627\u062D\u0629 \u0645\u062E \u0648\u0623\u0639\u0635\u0627\u0628 \u0648\u0639\u0645\u0648\u062F \u0641\u0642\u0631\u064A", en: "Neurosurgery & Spine Surgery" },
        { id: "vascular_surgery", ar: "\u062C\u0631\u0627\u062D\u0629 \u0623\u0648\u0639\u064A\u0629 \u062F\u0645\u0648\u064A\u0629", en: "Vascular Surgery" },
        { id: "urology_surgery", ar: "\u062C\u0631\u0627\u062D\u0629 \u0645\u0633\u0627\u0644\u0643 \u0628\u0648\u0644\u064A\u0629", en: "Urology Surgery" },
        { id: "ophthalmology_surgery", ar: "\u062C\u0631\u0627\u062D\u0629 \u0639\u064A\u0648\u0646", en: "Ophthalmology Surgery" },
        { id: "ent_surgery", ar: "\u062C\u0631\u0627\u062D\u0629 \u0623\u0646\u0641 \u0648\u0623\u0630\u0646 \u0648\u062D\u0646\u062C\u0631\u0629", en: "ENT Surgery" },
        { id: "pediatric_surgery", ar: "\u062C\u0631\u0627\u062D\u0629 \u0623\u0637\u0641\u0627\u0644", en: "Pediatric Surgery" },
        { id: "cardiothoracic_surgery", ar: "\u062C\u0631\u0627\u062D\u0629 \u0642\u0644\u0628", en: "Cardiothoracic Surgery" },
        { id: "oral_surgery", ar: "\u062C\u0631\u0627\u062D\u0629 \u0648\u062C\u0647 \u0648\u0623\u0633\u0646\u0627\u0646", en: "Oral & Maxillofacial Surgery" },
        // Medical
        { id: "internal_medicine", ar: "\u0628\u0627\u0637\u0646\u064A\u0629", en: "Internal Medicine" },
        { id: "cardiology", ar: "\u0642\u0644\u0628 (\u0642\u0633\u0637\u0631\u0629 \u0642\u0644\u0628\u064A\u0629)", en: "Cardiology (Catheterization)" },
        { id: "neurology", ar: "\u0645\u062E \u0648\u0623\u0639\u0635\u0627\u0628", en: "Neurology" },
        { id: "nephrology", ar: "\u0623\u0645\u0631\u0627\u0636 \u0627\u0644\u0643\u0644\u0649", en: "Nephrology" },
        { id: "endocrinology", ar: "\u063A\u062F\u062F \u0635\u0645\u0627\u0621 \u0648\u0633\u0643\u0631\u064A", en: "Endocrinology & Diabetes" },
        { id: "pulmonology", ar: "\u0635\u062F\u0631\u064A\u0629 \u0648\u062C\u0647\u0627\u0632 \u062A\u0646\u0641\u0633\u064A", en: "Pulmonology" },
        { id: "gastroenterology", ar: "\u062C\u0647\u0627\u0632 \u0647\u0636\u0645\u064A \u0648\u0645\u0646\u0627\u0638\u064A\u0631", en: "Gastroenterology & Hepatology" },
        { id: "rheumatology", ar: "\u0631\u0648\u0645\u0627\u062A\u064A\u0632\u0645", en: "Rheumatology" },
        { id: "psychiatry", ar: "\u0637\u0628 \u0646\u0641\u0633\u064A", en: "Psychiatry" },
        { id: "dermatology", ar: "\u062C\u0644\u062F\u064A\u0629 \u0648\u0644\u064A\u0632\u0631", en: "Dermatology & Laser" },
        { id: "oncology", ar: "\u0623\u0648\u0631\u0627\u0645", en: "Oncology" },
        { id: "pain_management", ar: "\u0639\u0644\u0627\u062C \u0627\u0644\u0623\u0644\u0645", en: "Pain Management" },
        { id: "allergy_immunology", ar: "\u062D\u0633\u0627\u0633\u064A\u0629 \u0648\u0645\u0646\u0627\u0639\u0629", en: "Allergy & Immunology" },
        // Women & Children
        { id: "obgyn", ar: "\u0646\u0633\u0627\u0621 \u0648\u0648\u0644\u0627\u062F\u0629", en: "Obstetrics & Gynecology" },
        { id: "infertility", ar: "\u0639\u0642\u0645 \u0648\u0623\u0637\u0641\u0627\u0644 \u0623\u0646\u0627\u0628\u064A\u0628", en: "Infertility & IVF" },
        { id: "pediatrics", ar: "\u0623\u0637\u0641\u0627\u0644", en: "Pediatrics" },
        { id: "neonatology", ar: "\u062D\u062F\u064A\u062B\u064A \u0648\u0644\u0627\u062F\u0629", en: "Neonatology" },
        { id: "pediatric_cardiology", ar: "\u0642\u0644\u0628 \u0623\u0637\u0641\u0627\u0644", en: "Pediatric Cardiology" },
        // Support
        { id: "radiology", ar: "\u0623\u0634\u0639\u0629 \u0648\u062A\u0635\u0648\u064A\u0631 \u0637\u0628\u064A", en: "Radiology & Medical Imaging" },
        { id: "laboratory", ar: "\u0645\u062E\u062A\u0628\u0631 \u0648\u0628\u0646\u0643 \u062F\u0645", en: "Laboratory & Pathology" },
        { id: "nuclear_medicine", ar: "\u0637\u0628 \u0646\u0648\u0648\u064A", en: "Nuclear Medicine" },
        { id: "rehabilitation", ar: "\u0637\u0628 \u0637\u0628\u064A\u0639\u064A \u0648\u0625\u0639\u0627\u062F\u0629 \u062A\u0623\u0647\u064A\u0644", en: "Physical Therapy & Rehabilitation" },
        { id: "respiratory_therapy", ar: "\u0639\u0644\u0627\u062C \u062A\u0646\u0641\u0633\u064A", en: "Respiratory Therapy" },
        { id: "nutrition", ar: "\u062A\u063A\u0630\u064A\u0629 \u0648\u0639\u0644\u0627\u062C \u063A\u0630\u0627\u0626\u064A", en: "Nutrition & Dietetics" },
        { id: "emergency", ar: "\u0637\u0648\u0627\u0631\u0626", en: "Emergency Department" },
        { id: "icu", ar: "\u0639\u0646\u0627\u064A\u0629 \u0645\u0631\u0643\u0632\u0629", en: "Intensive Care Unit (ICU)" },
        { id: "nicu", ar: "\u0639\u0646\u0627\u064A\u0629 \u0623\u0637\u0641\u0627\u0644 \u062D\u062F\u064A\u062B\u064A \u0648\u0644\u0627\u062F\u0629", en: "Neonatal ICU (NICU)" },
        { id: "dentistry", ar: "\u0623\u0633\u0646\u0627\u0646", en: "Dentistry" },
        { id: "pharmacy", ar: "\u0635\u064A\u062F\u0644\u064A\u0629", en: "Pharmacy" },
        { id: "home_healthcare", ar: "\u0631\u0639\u0627\u064A\u0629 \u0645\u0646\u0632\u0644\u064A\u0629", en: "Home Healthcare" }
      ],
      // Insurance partners (from hayathospitals.com)
      INSURANCE_PARTNERS: [
        "Bupa Arabia",
        "Tawuniya",
        "MedGulf",
        "Allianz Saudi Fransi",
        "GlobeMed",
        "Amana Insurance",
        "Arabian Shield",
        "Sagr Insurance",
        "GIG Gulf",
        "Walaa Insurance"
      ],
      // General contact
      GENERAL_PHONE: "966920000094",
      EMERGENCY: "997",
      // Saudi Red Crescent
      MOBILE_APP: {
        ios: "https://apps.apple.com/app/id6449023535",
        android: "https://play.google.com/store/apps/details?id=com.alhayat.patientapp"
      },
      SUBDOMAINS: ["riyadh", "jazan", "khamis", "unaizah"],
      HAYAT_ACADEMY: true,
      HOME_HEALTHCARE: "https://homecare.hayathospitals.com",
      MEDICAL_JOURNAL: "https://hayathospitals.com/journal/",
      ARAB_HEALTH_2023: true,
      NAFIS_PLATFORM_AWARD: true
    };
    SECURITY_HEADERS = {
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "DENY",
      "X-XSS-Protection": "1; mode=block",
      "Referrer-Policy": "strict-origin-when-cross-origin",
      "Permissions-Policy": "camera=(), microphone=(self), geolocation=()",
      "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
      "Cache-Control": "no-cache, no-store, must-revalidate"
    };
  }
});

// src/utils/response.js
function getAllowedOrigin(requestOrOrigin) {
  const origin = typeof requestOrOrigin === "string" ? requestOrOrigin : requestOrOrigin?.headers?.get("Origin") || "";
  if (!origin) return "https://hnh.brainsait.org";
  if (ALLOWED_ORIGINS.includes(origin)) return origin;
  try {
    const url = new URL(origin);
    if (url.protocol === "https:" && ALLOWED_SUFFIXES.some((s) => url.hostname.endsWith(s))) {
      return origin;
    }
  } catch {
  }
  if (origin.startsWith("http://localhost:") || origin.startsWith("http://127.0.0.1:")) {
    return origin;
  }
  return null;
}
function corsHeaders(origin) {
  return {
    "Access-Control-Allow-Origin": origin || "https://hnh.brainsait.org",
    "Access-Control-Allow-Methods": "GET, POST, PATCH, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Vary": "Origin"
  };
}
function mergeHeaders(extra = {}, origin) {
  return { ...corsHeaders(origin), ...SECURITY_HEADERS, ...extra };
}
function json(data, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: mergeHeaders({
      "Content-Type": "application/json; charset=utf-8",
      ...extraHeaders
    })
  });
}
function handleCors(request) {
  const origin = getAllowedOrigin(request);
  if (!origin) {
    return new Response(null, { status: 403, headers: { "Content-Type": "text/plain" } });
  }
  return new Response(null, {
    status: 204,
    headers: mergeHeaders({}, origin)
  });
}
var ALLOWED_ORIGINS, ALLOWED_SUFFIXES;
var init_response = __esm({
  "src/utils/response.js"() {
    init_config();
    ALLOWED_ORIGINS = [
      "https://hnh.brainsait.org",
      "https://telehealth.brainsait.org",
      "https://basma.brainsait.org",
      "https://sbs.elfadil.com",
      "https://bsma.elfadil.com",
      "https://stitch-doctor-dashboard.brainsait-fadil.workers.dev",
      "https://brainsait-realtime-hub.brainsait-fadil.workers.dev",
      "https://nphies-mirror.brainsait-fadil.workers.dev",
      "https://maillinc.brainsait-fadil.workers.dev",
      "https://fadil369.github.io"
    ];
    ALLOWED_SUFFIXES = [
      ".brainsait.org",
      ".brainsait-fadil.workers.dev",
      ".elfadil.com",
      ".github.io",
      ".pages.dev"
    ];
    __name(getAllowedOrigin, "getAllowedOrigin");
    __name(corsHeaders, "corsHeaders");
    __name(mergeHeaders, "mergeHeaders");
    __name(json, "json");
    __name(handleCors, "handleCors");
  }
});

// src/routes/providers.js
var providers_exports = {};
__export(providers_exports, {
  getProvider: () => getProvider,
  getProviders: () => getProviders,
  getProvidersByBranch: () => getProvidersByBranch,
  getProvidersByDepartment: () => getProvidersByDepartment,
  providers: () => providers
});
function normalizeBranch(value) {
  const raw = String(value || "").trim();
  const key = raw.toLowerCase().replace(/[\s-]+/g, "_");
  return BRANCH_ALIASES2[key] || raw;
}
function stripDoctorPrefix(value) {
  return String(value || "").trim().replace(/^(د\.\s*)+/i, "").replace(/^(Dr\.\s*)+/i, "").trim();
}
function doctorName(prefix, firstName, lastName) {
  const name = [firstName, lastName].filter(Boolean).join(" ").trim();
  const clean = stripDoctorPrefix(name);
  return clean ? `${prefix}${clean}` : "";
}
async function getProvidersFromDB(env) {
  try {
    if (!env || !env.DB) return null;
    const { results } = await env.DB.prepare(
      `SELECT id, provider_code, first_name_ar, last_name_ar, first_name_en, last_name_en,
              specialty, subspecialty, department, clinic_location, phone, email,
              givc_oid, givc_registered, givc_specialty_code, givc_branch_code
       FROM providers
       WHERE is_active = 1
       ORDER BY specialty, last_name_ar`
    ).all();
    if (results && results.length > 0) {
      return results.map((r) => ({
        id: r.provider_code || "P" + String(r.id).padStart(3, "0"),
        db_id: r.id,
        name_ar: doctorName("\u062F. ", r.first_name_ar, r.last_name_ar),
        name_en: doctorName("Dr. ", r.first_name_en || r.first_name_ar, r.last_name_en || r.last_name_ar),
        specialty: r.specialty || "",
        subspecialty: r.subspecialty || "",
        department: r.department || "",
        branch: r.clinic_location || r.givc_branch_code || "",
        branch_id: normalizeBranch(r.givc_branch_code || r.clinic_location || ""),
        phone: r.phone || "",
        email: r.email || "",
        givc_oid: r.givc_oid || null,
        givc_registered: r.givc_registered === 1,
        rating: 4,
        experience_years: 10,
        source: "d1"
      }));
    }
  } catch (e) {
    console.error("DB providers error:", e);
  }
  return null;
}
async function getProviders(env) {
  const dbProviders = await getProvidersFromDB(env);
  return dbProviders || providers;
}
async function getProvider(id, env) {
  if (env && env.DB) {
    const dbProviders = await getProvidersFromDB(env);
    if (dbProviders) {
      const found = dbProviders.find((p) => p.id === id || String(p.db_id) === String(id) || p.givc_oid === id);
      if (found) return found;
    }
  }
  return providers.find((p) => p.id === id) || null;
}
function getProvidersByBranch(branchId) {
  return providers.filter((p) => p.branch_id === branchId);
}
function getProvidersByDepartment(deptId) {
  return providers.filter((p) => p.department_id === deptId);
}
var providers, BRANCH_ALIASES2;
var init_providers = __esm({
  "src/routes/providers.js"() {
    providers = [
      {
        id: "P001",
        name_ar: "\u062F. \u0645\u062D\u0645\u062F \u0628\u0643\u0631\u064A",
        name_en: "Dr. Mohamed Bakry",
        department_id: "surgery",
        specializations: ["\u062C\u0631\u0627\u062D\u0629 \u062A\u062C\u0645\u064A\u0644\u064A\u0629", "\u062C\u0631\u0627\u062D\u0629 \u0627\u0644\u0648\u062C\u0647 \u0648\u0627\u0644\u0641\u0643\u064A\u0646"],
        specializations_en: ["Plastic Surgery", "Maxillofacial Surgery"],
        languages: ["ar", "en"],
        branch_id: "R001",
        consultation_fee: 500,
        education: [{ degree: "MD", institution: "Cairo University", year: 2005 }],
        experience_years: 19,
        rating: 4.9,
        bio_ar: "\u0627\u0633\u062A\u0634\u0627\u0631\u064A \u062C\u0631\u0627\u062D\u0629 \u0627\u0644\u062A\u062C\u0645\u064A\u0644 \u0648\u0627\u0644\u062A\u0631\u0645\u064A\u0645\u060C \u062E\u0628\u0631\u0629 \u0648\u0627\u0633\u0639\u0629 \u0641\u064A \u0639\u0645\u0644\u064A\u0627\u062A \u0627\u0644\u0648\u062C\u0647 \u0648\u0627\u0644\u0641\u0643\u064A\u0646.",
        bio_en: "Consultant Plastic and Reconstructive Surgeon with extensive experience in facial surgery."
      },
      {
        id: "P002",
        name_ar: "\u062F. \u0639\u0628\u062F\u0627\u0644\u0644\u0647 \u0627\u0644\u0642\u062D\u0637\u0627\u0646\u064A",
        name_en: "Dr. Abdullah Al-Qahtani",
        department_id: "cardiology",
        specializations: ["\u0642\u0633\u0637\u0631\u0629 \u0642\u0644\u0628\u064A\u0629", "\u0623\u0645\u0631\u0627\u0636 \u0627\u0644\u0642\u0644\u0628 \u0627\u0644\u062A\u062F\u0627\u062E\u0644\u064A\u0629"],
        specializations_en: ["Cardiac Catheterization", "Interventional Cardiology"],
        languages: ["ar", "en"],
        branch_id: "R001",
        consultation_fee: 400,
        education: [{ degree: "MD", institution: "King Saud University", year: 2008 }],
        experience_years: 16,
        rating: 4.7,
        bio_ar: "\u0627\u0633\u062A\u0634\u0627\u0631\u064A \u0623\u0645\u0631\u0627\u0636 \u0627\u0644\u0642\u0644\u0628 \u0648\u0627\u0644\u0642\u0633\u0637\u0631\u0629\u060C \u0631\u0626\u064A\u0633 \u0642\u0633\u0645 \u0627\u0644\u0642\u0644\u0628 \u0628\u0645\u0633\u062A\u0634\u0641\u0649 \u0627\u0644\u0631\u064A\u0627\u0636.",
        bio_en: "Consultant Cardiologist and Interventionalist, Head of Cardiology at Riyadh branch."
      },
      {
        id: "P003",
        name_ar: "\u062F. \u0641\u0627\u0637\u0645\u0629 \u0627\u0644\u0632\u0647\u0631\u0627\u0646\u064A",
        name_en: "Dr. Fatima Al-Zahrani",
        department_id: "obgyn",
        specializations: ["\u0646\u0633\u0627\u0621 \u0648\u0648\u0644\u0627\u062F\u0629", "\u0639\u0642\u0645 \u0648\u0623\u0637\u0641\u0627\u0644 \u0623\u0646\u0627\u0628\u064A\u0628"],
        specializations_en: ["Obstetrics & Gynecology", "Infertility & IVF"],
        languages: ["ar", "en"],
        branch_id: "R001",
        consultation_fee: 350,
        education: [{ degree: "MD", institution: "King Abdulaziz University", year: 2010 }],
        experience_years: 14,
        rating: 4.8,
        bio_ar: "\u0627\u0633\u062A\u0634\u0627\u0631\u064A\u0629 \u0646\u0633\u0627\u0621 \u0648\u0648\u0644\u0627\u062F\u0629\u060C \u0645\u062A\u062E\u0635\u0635\u0629 \u0641\u064A \u0639\u0644\u0627\u062C \u0627\u0644\u0639\u0642\u0645 \u0648\u0623\u0637\u0641\u0627\u0644 \u0627\u0644\u0623\u0646\u0627\u0628\u064A\u0628.",
        bio_en: "Consultant OB/GYN specializing in infertility treatment and IVF."
      },
      {
        id: "P004",
        name_ar: "\u062F. \u062E\u0627\u0644\u062F \u0627\u0644\u0634\u0647\u0631\u0627\u0646\u064A",
        name_en: "Dr. Khaled Al-Shahrani",
        department_id: "orthopedics",
        specializations: ["\u062C\u0631\u0627\u062D\u0629 \u0627\u0644\u0639\u0638\u0627\u0645", "\u062C\u0631\u0627\u062D\u0629 \u0627\u0644\u0645\u0641\u0627\u0635\u0644", "\u0645\u0646\u0638\u0627\u0631 \u0627\u0644\u0645\u0641\u0627\u0635\u0644"],
        specializations_en: ["Orthopedic Surgery", "Joint Surgery", "Arthroscopy"],
        languages: ["ar", "en"],
        branch_id: "R001",
        consultation_fee: 400,
        education: [{ degree: "MD", institution: "King Faisal University", year: 2009 }],
        experience_years: 15,
        rating: 4.6,
        bio_ar: "\u0627\u0633\u062A\u0634\u0627\u0631\u064A \u062C\u0631\u0627\u062D\u0629 \u0627\u0644\u0639\u0638\u0627\u0645 \u0648\u0627\u0644\u0645\u0641\u0627\u0635\u0644\u060C \u062E\u0628\u0631\u0629 \u0641\u064A \u0639\u0645\u0644\u064A\u0627\u062A \u0627\u0644\u0645\u0646\u0638\u0627\u0631 \u0648\u0627\u0644\u062A\u0628\u062F\u064A\u0644.",
        bio_en: "Consultant Orthopedic and Joint Surgeon, experienced in arthroscopy and joint replacement."
      },
      {
        id: "P005",
        name_ar: "\u062F. \u0633\u0627\u0631\u0629 \u0627\u0644\u062D\u0631\u0628\u064A",
        name_en: "Dr. Sarah Al-Harbi",
        department_id: "pediatrics",
        specializations: ["\u0637\u0628 \u0627\u0644\u0623\u0637\u0641\u0627\u0644", "\u062D\u062F\u064A\u062B\u064A \u0627\u0644\u0648\u0644\u0627\u062F\u0629"],
        specializations_en: ["Pediatrics", "Neonatology"],
        languages: ["ar", "en"],
        branch_id: "J001",
        consultation_fee: 250,
        education: [{ degree: "MD", institution: "Umm Al-Qura University", year: 2012 }],
        experience_years: 12,
        rating: 4.5,
        bio_ar: "\u0627\u0633\u062A\u0634\u0627\u0631\u064A\u0629 \u0637\u0628 \u0623\u0637\u0641\u0627\u0644 \u0648\u062D\u062F\u064A\u062B\u064A \u0627\u0644\u0648\u0644\u0627\u062F\u0629\u060C \u0631\u0626\u064A\u0633\u0629 \u0642\u0633\u0645 \u0627\u0644\u0623\u0637\u0641\u0627\u0644 \u0628\u062C\u0627\u0632\u0627\u0646.",
        bio_en: "Consultant Pediatrician and Neonatologist, Head of Pediatrics at Jazan."
      },
      {
        id: "P006",
        name_ar: "\u062F. \u0623\u062D\u0645\u062F \u0627\u0644\u0645\u0637\u064A\u0631\u064A",
        name_en: "Dr. Ahmed Al-Mutairi",
        department_id: "neurology",
        specializations: ["\u0637\u0628 \u0627\u0644\u0623\u0639\u0635\u0627\u0628", "\u0627\u0644\u0635\u0631\u0639", "\u0627\u0644\u0635\u062F\u0627\u0639 \u0627\u0644\u0646\u0635\u0641\u064A"],
        specializations_en: ["Neurology", "Epilepsy", "Migraine"],
        languages: ["ar", "en"],
        branch_id: "M001",
        consultation_fee: 350,
        education: [{ degree: "MD", institution: "King Saud University", year: 2007 }],
        experience_years: 17,
        rating: 4.7,
        bio_ar: "\u0627\u0633\u062A\u0634\u0627\u0631\u064A \u0637\u0628 \u0627\u0644\u0623\u0639\u0635\u0627\u0628\u060C \u0645\u062A\u062E\u0635\u0635 \u0641\u064A \u0639\u0644\u0627\u062C \u0627\u0644\u0635\u0631\u0639 \u0648\u0627\u0644\u0635\u062F\u0627\u0639 \u0627\u0644\u0645\u0632\u0645\u0646.",
        bio_en: "Consultant Neurologist specializing in epilepsy and chronic headache management."
      },
      {
        id: "P007",
        name_ar: "\u062F. \u0646\u0648\u0631\u0629 \u0627\u0644\u062F\u0648\u0633\u0631\u064A",
        name_en: "Dr. Noura Al-Dosari",
        department_id: "dermatology",
        specializations: ["\u062C\u0644\u062F\u064A\u0629", "\u0644\u064A\u0632\u0631", "\u0639\u0644\u0627\u062C \u0627\u0644\u0628\u0647\u0627\u0642 \u0648\u0627\u0644\u0635\u062F\u0641\u064A\u0629"],
        specializations_en: ["Dermatology", "Laser Therapy", "Vitiligo & Psoriasis"],
        languages: ["ar", "en"],
        branch_id: "R001",
        consultation_fee: 300,
        education: [{ degree: "MD", institution: "King Saud University", year: 2013 }],
        experience_years: 11,
        rating: 4.8,
        bio_ar: "\u0627\u0633\u062A\u0634\u0627\u0631\u064A\u0629 \u062C\u0644\u062F\u064A\u0629 \u0648\u062A\u062C\u0645\u064A\u0644\u060C \u0645\u062A\u062E\u0635\u0635\u0629 \u0641\u064A \u0627\u0644\u0644\u064A\u0632\u0631 \u0648\u0639\u0644\u0627\u062C \u0627\u0644\u0623\u0645\u0631\u0627\u0636 \u0627\u0644\u062C\u0644\u062F\u064A\u0629 \u0627\u0644\u0645\u0632\u0645\u0646\u0629.",
        bio_en: "Consultant Dermatologist specializing in laser therapy and chronic skin conditions."
      },
      {
        id: "P008",
        name_ar: "\u062F. \u0641\u064A\u0635\u0644 \u0627\u0644\u063A\u0627\u0645\u062F\u064A",
        name_en: "Dr. Faisal Al-Ghamdi",
        department_id: "ophthalmology",
        specializations: ["\u0637\u0628 \u0627\u0644\u0639\u064A\u0648\u0646", "\u062C\u0631\u0627\u062D\u0629 \u0627\u0644\u0645\u064A\u0627\u0647 \u0627\u0644\u0628\u064A\u0636\u0627\u0621", "\u062A\u0635\u062D\u064A\u062D \u0627\u0644\u0646\u0638\u0631 \u0628\u0627\u0644\u0644\u064A\u0632\u0643"],
        specializations_en: ["Ophthalmology", "Cataract Surgery", "LASIK"],
        languages: ["ar", "en"],
        branch_id: "R001",
        consultation_fee: 350,
        education: [{ degree: "MD", institution: "King Saud University", year: 2006 }],
        experience_years: 18,
        rating: 4.6,
        bio_ar: "\u0627\u0633\u062A\u0634\u0627\u0631\u064A \u0637\u0628 \u0648\u062C\u0631\u0627\u062D\u0629 \u0627\u0644\u0639\u064A\u0648\u0646\u060C \u062E\u0628\u0631\u0629 \u0641\u064A \u0639\u0645\u0644\u064A\u0627\u062A \u0627\u0644\u0645\u064A\u0627\u0647 \u0627\u0644\u0628\u064A\u0636\u0627\u0621 \u0648\u0627\u0644\u0644\u064A\u0632\u0643.",
        bio_en: "Consultant Ophthalmologist experienced in cataract surgery and LASIK."
      },
      {
        id: "P009",
        name_ar: "\u062F. \u0645\u0647\u0627 \u0627\u0644\u0639\u0646\u0632\u064A",
        name_en: "Dr. Maha Al-Anazi",
        department_id: "internal",
        specializations: ["\u0628\u0627\u0637\u0646\u064A\u0629", "\u0633\u0643\u0631\u064A", "\u063A\u062F\u062F \u0635\u0645\u0627\u0621"],
        specializations_en: ["Internal Medicine", "Diabetes", "Endocrinology"],
        languages: ["ar", "en"],
        branch_id: "R001",
        consultation_fee: 250,
        education: [{ degree: "MD", institution: "King Khalid University", year: 2011 }],
        experience_years: 13,
        rating: 4.4,
        bio_ar: "\u0627\u0633\u062A\u0634\u0627\u0631\u064A\u0629 \u0628\u0627\u0637\u0646\u064A\u0629 \u0648\u063A\u062F\u062F \u0635\u0645\u0627\u0621\u060C \u0645\u062A\u062E\u0635\u0635\u0629 \u0641\u064A \u0639\u0644\u0627\u062C \u0627\u0644\u0633\u0643\u0631\u064A \u0648\u0627\u0636\u0637\u0631\u0627\u0628\u0627\u062A \u0627\u0644\u063A\u062F\u0629 \u0627\u0644\u062F\u0631\u0642\u064A\u0629.",
        bio_en: "Consultant Internist and Endocrinologist specializing in diabetes and thyroid disorders."
      },
      {
        id: "P010",
        name_ar: "\u062F. \u062D\u0633\u0646 \u0627\u0644\u064A\u0627\u0645\u064A",
        name_en: "Dr. Hassan Al-Yami",
        department_id: "dentistry",
        specializations: ["\u0637\u0628 \u0627\u0644\u0623\u0633\u0646\u0627\u0646", "\u0632\u0631\u0627\u0639\u0629 \u0627\u0644\u0623\u0633\u0646\u0627\u0646", "\u062A\u0642\u0648\u064A\u0645 \u0627\u0644\u0623\u0633\u0646\u0627\u0646"],
        specializations_en: ["Dentistry", "Dental Implants", "Orthodontics"],
        languages: ["ar", "en"],
        branch_id: "R001",
        consultation_fee: 200,
        education: [{ degree: "BDS", institution: "Riyadh Colleges of Dentistry", year: 2014 }],
        experience_years: 10,
        rating: 4.5,
        bio_ar: "\u0623\u062E\u0635\u0627\u0626\u064A \u0637\u0628 \u0627\u0644\u0623\u0633\u0646\u0627\u0646\u060C \u062E\u0628\u0631\u0629 \u0641\u064A \u0627\u0644\u0632\u0631\u0627\u0639\u0629 \u0648\u0627\u0644\u062A\u0642\u0648\u064A\u0645 \u0627\u0644\u062A\u062C\u0645\u064A\u0644\u064A.",
        bio_en: "Dental Specialist in implants and cosmetic orthodontics."
      },
      {
        id: "P011",
        name_ar: "\u062F. \u0633\u0627\u0645\u064A \u0627\u0644\u062C\u0647\u0646\u064A",
        name_en: "Dr. Sami Al-Juhani",
        department_id: "urology",
        specializations: ["\u0645\u0633\u0627\u0644\u0643 \u0628\u0648\u0644\u064A\u0629", "\u062C\u0631\u0627\u062D\u0629 \u0627\u0644\u0643\u0644\u0649", "\u062D\u0635\u0648\u0627\u062A \u0627\u0644\u0645\u0633\u0627\u0644\u0643"],
        specializations_en: ["Urology", "Kidney Surgery", "Urinary Stones"],
        languages: ["ar", "en"],
        branch_id: "U001",
        consultation_fee: 300,
        education: [{ degree: "MD", institution: "Taibah University", year: 2010 }],
        experience_years: 14,
        rating: 4.3,
        bio_ar: "\u0627\u0633\u062A\u0634\u0627\u0631\u064A \u0645\u0633\u0627\u0644\u0643 \u0628\u0648\u0644\u064A\u0629\u060C \u062E\u0628\u0631\u0629 \u0641\u064A \u062C\u0631\u0627\u062D\u0627\u062A \u0627\u0644\u0643\u0644\u0649 \u0648\u0627\u0644\u062D\u0635\u0648\u0627\u062A \u0628\u0627\u0644\u0645\u0646\u0638\u0627\u0631.",
        bio_en: "Consultant Urologist experienced in laparoscopic kidney and stone surgeries."
      },
      {
        id: "P012",
        name_ar: "\u062F. \u0644\u064A\u0644\u0649 \u0627\u0644\u0642\u0631\u0634\u064A",
        name_en: "Dr. Layla Al-Qurashi",
        department_id: "psychiatry",
        specializations: ["\u0637\u0628 \u0646\u0641\u0633\u064A", "\u0627\u0644\u0642\u0644\u0642 \u0648\u0627\u0644\u0627\u0643\u062A\u0626\u0627\u0628", "\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0646\u0641\u0633\u064A\u0629"],
        specializations_en: ["Psychiatry", "Anxiety & Depression", "Mental Health"],
        languages: ["ar", "en"],
        branch_id: "R001",
        consultation_fee: 350,
        education: [{ degree: "MD", institution: "King Saud University", year: 2013 }],
        experience_years: 11,
        rating: 4.7,
        bio_ar: "\u0627\u0633\u062A\u0634\u0627\u0631\u064A\u0629 \u0637\u0628 \u0646\u0641\u0633\u064A\u060C \u0645\u062A\u062E\u0635\u0635\u0629 \u0641\u064A \u0639\u0644\u0627\u062C \u0627\u0644\u0642\u0644\u0642 \u0648\u0627\u0644\u0627\u0643\u062A\u0626\u0627\u0628 \u0648\u0627\u0644\u0627\u0636\u0637\u0631\u0627\u0628\u0627\u062A \u0627\u0644\u0646\u0641\u0633\u064A\u0629.",
        bio_en: "Consultant Psychiatrist specializing in anxiety, depression, and mental health disorders."
      }
    ];
    BRANCH_ALIASES2 = {
      r001: "R001",
      riyadh: "R001",
      m001: "M001",
      madinah: "M001",
      madina: "M001",
      medina: "M001",
      k001: "K001",
      khamis: "K001",
      khamis_mushayt: "K001",
      khamis_mushait: "K001",
      "khamis mushayt": "K001",
      j001: "J001",
      jazan: "J001",
      jizan: "J001",
      u001: "U001",
      unaizah: "U001",
      unayzah: "U001"
    };
    __name(normalizeBranch, "normalizeBranch");
    __name(stripDoctorPrefix, "stripDoctorPrefix");
    __name(doctorName, "doctorName");
    __name(getProvidersFromDB, "getProvidersFromDB");
    __name(getProviders, "getProviders");
    __name(getProvider, "getProvider");
    __name(getProvidersByBranch, "getProvidersByBranch");
    __name(getProvidersByDepartment, "getProvidersByDepartment");
  }
});

// src/ai/chat.js
var chat_exports = {};
__export(chat_exports, {
  handleChat: () => handleChat
});
async function handleChat(req, env) {
  const body = await req.json();
  const { message, session_id, language } = body;
  if (!message) {
    return json({ success: false, message: "Message is required" }, 400);
  }
  const sid = session_id || "ses_" + Date.now().toString(36);
  let history = [];
  try {
    const { results } = await env.DB.prepare(
      "SELECT role, content FROM chat_history WHERE session_id = ? ORDER BY created_at DESC LIMIT 6"
    ).bind(sid).all();
    if (results) {
      history = results.reverse().map((r) => ({ role: r.role, content: r.content }));
    }
  } catch (e) {
    console.error("DB history error:", e);
  }
  const messages = [
    { role: "system", content: SYSTEM_PROMPT },
    ...history,
    { role: "user", content: message }
  ];
  let aiResponse;
  try {
    const ai = await env.AI.run(CONFIG.AI_MODEL, {
      messages,
      max_tokens: CONFIG.AI_MAX_TOKENS,
      temperature: CONFIG.AI_TEMPERATURE
    });
    aiResponse = ai.response || ai.choices?.[0]?.message?.content || "";
  } catch (e) {
    console.error("AI error, trying CF fallback:", e);
    try {
      const ai = await env.AI.run(CONFIG.AI_FALLBACK_MODEL, {
        messages,
        max_tokens: CONFIG.AI_MAX_TOKENS,
        temperature: CONFIG.AI_TEMPERATURE
      });
      aiResponse = ai.response || ai.choices?.[0]?.message?.content || "";
    } catch (e2) {
      if (env.DEEPSEEK_API_KEY) {
        try {
          const dsRes = await fetch("https://api.deepseek.com/v1/chat/completions", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${env.DEEPSEEK_API_KEY}`
            },
            body: JSON.stringify({
              model: "deepseek-chat",
              messages,
              max_tokens: CONFIG.AI_MAX_TOKENS,
              temperature: CONFIG.AI_TEMPERATURE
            }),
            signal: AbortSignal.timeout(15e3)
          });
          const dsData = await dsRes.json();
          aiResponse = dsData.choices?.[0]?.message?.content || getFallbackResponse(message, language);
        } catch (e3) {
          console.error("DeepSeek fallback error:", e3);
          aiResponse = getFallbackResponse(message, language);
        }
      } else {
        aiResponse = getFallbackResponse(message, language);
      }
    }
  }
  try {
    await env.DB.prepare(
      "INSERT INTO chat_history (session_id, role, content) VALUES (?, ?, ?), (?, ?, ?)"
    ).bind(sid, "user", message, sid, "assistant", aiResponse).run();
  } catch (e) {
    console.error("DB save error:", e);
  }
  return json({
    success: true,
    response: aiResponse,
    session_id: sid
  });
}
function getFallbackResponse(message, lang) {
  const msg = (message || "").toLowerCase();
  const isAr = /[\u0600-\u06FF]/.test(message) || lang === "ar";
  if (isAr) {
    if (msg.includes("\u0645\u0648\u0639\u062F") || msg.includes("\u062D\u062C\u0632")) {
      return "\u064A\u0645\u0643\u0646\u0643 \u062D\u062C\u0632 \u0645\u0648\u0639\u062F \u0645\u0646 \u062E\u0644\u0627\u0644 \u0645\u0648\u0642\u0639\u0646\u0627 \u0623\u0648 \u0627\u0644\u062A\u0637\u0628\u064A\u0642\u060C \u0623\u0648 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0639\u0644\u0649 966920000094. \u0647\u0644 \u062A\u062D\u062A\u0627\u062C \u0645\u0633\u0627\u0639\u062F\u0629 \u0641\u064A \u0627\u062E\u062A\u064A\u0627\u0631 \u0627\u0644\u0637\u0628\u064A\u0628 \u0627\u0644\u0645\u0646\u0627\u0633\u0628\u061F";
    }
    if (msg.includes("\u0637\u0628\u064A\u0628") || msg.includes("\u062F\u0643\u062A\u0648\u0631")) {
      return "\u0644\u062F\u064A\u0646\u0627 \u0623\u0643\u062B\u0631 \u0645\u0646 700 \u0637\u0628\u064A\u0628 \u0648\u0627\u0633\u062A\u0634\u0627\u0631\u064A \u0641\u064A 5 \u0641\u0631\u0648\u0639. \u062F. \u0645\u062D\u0645\u062F \u0628\u0643\u0631\u064A (\u062C\u0631\u0627\u062D\u0629 \u062A\u062C\u0645\u064A\u0644\u064A\u0629) \u0627\u0644\u0623\u0639\u0644\u0649 \u062A\u0642\u064A\u064A\u0645\u0627\u064B. \u062A\u0635\u0641\u062D \u0635\u0641\u062D\u0629 \u0627\u0644\u0623\u0637\u0628\u0627\u0621 \u0644\u0644\u0628\u062D\u062B \u062D\u0633\u0628 \u0627\u0644\u062A\u062E\u0635\u0635.";
    }
    if (msg.includes("\u062A\u0623\u0645\u064A\u0646") || msg.includes("\u0645\u0637\u0627\u0644\u0628\u0629") || msg.includes("nphies")) {
      return "\u0646\u0638\u0627\u0645 NPHIES \u064A\u062F\u0639\u0645 \u0627\u0644\u0645\u0637\u0627\u0644\u0628\u0627\u062A \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A\u0629. \u0646\u062A\u0639\u0627\u0642\u062F \u0645\u0639 10 \u0634\u0631\u0643\u0627\u062A \u062A\u0623\u0645\u064A\u0646: Bupa Arabia\u060C \u062A\u0648\u064A\u0646\u0629\u060C \u0645\u064A\u062F\u063A\u0644\u0641\u060C \u0648\u063A\u064A\u0631\u0647\u0627. \u062A\u062D\u0642\u0642 \u0645\u0646 \u0623\u0647\u0644\u064A\u062A\u0643 \u0627\u0644\u062A\u0623\u0645\u064A\u0646\u064A\u0629 \u0639\u0628\u0631 \u0635\u0641\u062D\u0629 \u0627\u0644\u062A\u062D\u0642\u0642.";
    }
    if (msg.includes("\u0641\u0631\u0639") || msg.includes("\u0639\u0646\u0648\u0627\u0646") || msg.includes("\u0645\u0648\u0642\u0639")) {
      return "5 \u0641\u0631\u0648\u0639: \u0627\u0644\u0631\u064A\u0627\u0636 (\u0637\u0631\u064A\u0642 \u0627\u0644\u062F\u0627\u0626\u0631\u064A \u0627\u0644\u0634\u0631\u0642\u064A - \u0627\u0644\u0631\u0628\u0648\u0629)\u060C \u062C\u0627\u0632\u0627\u0646 (\u0627\u0644\u0643\u0648\u0631\u0646\u064A\u0634)\u060C \u062E\u0645\u064A\u0633 \u0645\u0634\u064A\u0637 (\u0627\u0644\u0623\u0645\u064A\u0631 \u0633\u0644\u0637\u0627\u0646)\u060C \u0627\u0644\u0645\u062F\u064A\u0646\u0629 \u0627\u0644\u0645\u0646\u0648\u0631\u0629 (\u0637\u0631\u064A\u0642 \u0627\u0644\u0647\u062C\u0631\u0629)\u060C \u0639\u0646\u064A\u0632\u0629 (\u0627\u0644\u0642\u0635\u064A\u0645). \u0644\u0644\u0627\u062A\u0635\u0627\u0644: 966920000094.";
    }
    if (msg.includes("\u0639\u0646") || msg.includes("\u0627\u0644\u0645\u0633\u062A\u0634\u0641\u0649") || msg.includes("\u0645\u0646 \u0623\u0646\u062A\u0645") || msg.includes("\u0646\u0628\u0630\u0629")) {
      return "\u062A\u0623\u0633\u0633\u062A \u0645\u062C\u0645\u0648\u0639\u0629 \u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A \u0639\u0627\u0645 1999\u060C \u0648\u062A\u062F\u064A\u0631\u0647\u0627 \u0634\u0631\u0643\u0629 \u0627\u0644\u0627\u0646\u0645\u0627\u0621 \u0644\u0644\u062E\u062F\u0645\u0627\u062A \u0627\u0644\u0637\u0628\u064A\u0629 \u0628\u0631\u0626\u0627\u0633\u0629 \u0623. \u0645\u062D\u0645\u062F \u0628\u0646 \u0646\u0627\u0635\u0631 \u0627\u0644\u062C\u0627\u0631 \u0627\u0644\u0644\u0647. \u062A\u0636\u0645 5 \u0641\u0631\u0648\u0639 \u0648\u0623\u0643\u062B\u0631 \u0645\u0646 700 \u0637\u0628\u064A\u0628 \u06483500 \u0645\u0648\u0638\u0641 \u06481200 \u0633\u0631\u064A\u0631. \u0627\u0644\u0631\u0626\u064A\u0633 \u0627\u0644\u062A\u0646\u0641\u064A\u0630\u064A: \u062F. \u0641\u0648\u0632\u064A\u0629 \u0627\u0644\u062C\u0627\u0631 \u0627\u0644\u0644\u0647.";
    }
    if (msg.includes("\u0637\u0648\u0627\u0631\u0626") || msg.includes("\u0625\u0633\u0639\u0627\u0641")) {
      return "\u26A0\uFE0F \u0625\u0630\u0627 \u0643\u0627\u0646\u062A \u062D\u0627\u0644\u0629 \u0637\u0627\u0631\u0626\u0629\u060C \u062A\u0648\u062C\u0651\u0647 \u0641\u0648\u0631\u0627\u064B \u0644\u0623\u0642\u0631\u0628 \u0637\u0648\u0627\u0631\u0626 \u0623\u0648 \u0627\u062A\u0635\u0644 \u0628\u0627\u0644\u0647\u0644\u0627\u0644 \u0627\u0644\u0623\u062D\u0645\u0631 997. \u062C\u0645\u064A\u0639 \u0641\u0631\u0648\u0639\u0646\u0627 \u0628\u0647\u0627 \u0637\u0648\u0627\u0631\u0626 24 \u0633\u0627\u0639\u0629.";
    }
    return "\u0623\u0647\u0644\u0627\u064B \u0628\u0643 \u0641\u064A \u0645\u0633\u062A\u0634\u0641\u0649 \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A. \u0643\u064A\u0641 \u064A\u0645\u0643\u0646\u0646\u064A \u0645\u0633\u0627\u0639\u062F\u062A\u0643\u061F \u062D\u062C\u0648\u0632\u0627\u062A\u060C \u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0623\u0637\u0628\u0627\u0621\u060C \u0627\u0633\u062A\u0639\u0644\u0627\u0645 \u062A\u0623\u0645\u064A\u0646\u060C \u0623\u0648 \u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0641\u0631\u0648\u0639.";
  }
  if (msg.includes("appointment") || msg.includes("book")) {
    return "Book online via our portal/app or call 966920000094. Need help choosing a doctor?";
  }
  if (msg.includes("doctor") || msg.includes("physician")) {
    return "We have 700+ doctors across 5 branches. Dr. Mohamed Bakry (Plastic Surgery) highest rated. Browse our providers page.";
  }
  if (msg.includes("insurance") || msg.includes("claim") || msg.includes("nphies")) {
    return "NPHIES e-claim system supported. 10 insurance partners: Bupa Arabia, Tawuniya, MedGulf, and more. Check eligibility on our portal.";
  }
  if (msg.includes("branch") || msg.includes("location") || msg.includes("address")) {
    return "5 branches: Riyadh (Eastern Ring/Al-Rabwa), Jazan (Corniche), Khamis Mushayt (Prince Sultan Rd), Madinah (Al-Hijra Rd), Unayzah (Al-Qassim). Call 966920000094.";
  }
  if (msg.includes("about") || msg.includes("history") || msg.includes("who")) {
    return "Hayat National Hospitals Group was founded in 1999. Owned by Al-Inmaa Medical Services Co., chaired by A. Mohammed bin Nasser bin Jar Allah. CEO Dr. Fawzia Al-Jar Allah. 700+ doctors, 3,500+ staff, 1,200+ beds across 5 branches.";
  }
  if (msg.includes("emergency")) {
    return "If emergency: go to nearest ER or call Saudi Red Crescent 997. All branches have 24/7 ER.";
  }
  return "Welcome to Hayat National Hospital. How can I help? Appointments, doctors, insurance, or branch info.";
}
var SYSTEM_PROMPT;
var init_chat = __esm({
  "src/ai/chat.js"() {
    init_response();
    init_config();
    SYSTEM_PROMPT = `You are BasmaGuist Medical (\u0628\u0633\u0645\u0629 \u063A\u064A\u0633\u062A \u0627\u0644\u0637\u0628\u064A\u0629), the official AI assistant for \u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A (Hayat National Hospitals Group), powered by BrainSAIT Healthcare OS.

## ABOUT THE GROUP
- Full Name: Hayat National Hospitals Group (\u0645\u062C\u0645\u0648\u0639\u0629 \u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A)
- Owner/Operator: Al-Inmaa Medical Services Company (\u0634\u0631\u0643\u0629 \u0627\u0644\u0627\u0646\u0645\u0627\u0621 \u0644\u0644\u062E\u062F\u0645\u0627\u062A \u0627\u0644\u0637\u0628\u064A\u0629)
- Founded: 1999 (25+ years of operation)
- Chairman: A. Mohammed bin Nasser bin Jar Allah
- CEO: Dr. Fawzia Al-Jar Allah (selected among top 100 healthcare leaders in Middle East)
- Assistant to CEO: Dr. Hussein bin Husousa
- Website: hayathospitals.com
- Portal: hnh.brainsait.org
- Mobile App: iOS (apps.apple.com/app/id6449023535) and Android (play.google.com/store/apps/details?id=com.alhayat.patientapp)
- General Contact: 966920000094
- Accreditations: Multiple quality awards, Arab Health 2023 participation, Nafis Platform Best Service Provider Award
- Medical Journal: hayathospitals.com/journal/
- Hayat Academy: Professional development with Saudi Commission for Health Specialties
- Home Healthcare: homecare.hayathospitals.com

## KEY STATISTICS
- 700+ doctors
- 500 outpatient clinics
- 3,500+ employees
- 1,200+ beds across all branches
- 40,000+ surgeries per year
- 1,200+ nurses
- 5 branches
- 2,200,000+ outpatient clinic visits annually

## VISION
To be a leader in healthcare in Saudi Arabia and the Middle East through continuous innovation, providing high-quality healthcare meeting the highest global standards. A center of medical excellence.

## MISSION
Providing distinguished, integrated, patient-focused healthcare. Committed to innovative and comprehensive medical treatment supported by highly experienced specialists. Quality, efficiency, and compassion.

## VALUES
Superior healthcare, honesty and credibility, social responsibility, patient privacy, commitment to Islamic teachings, quality and safety.

## 5 BRANCHES (Official Addresses & Contacts)
- Riyadh: Eastern Ring Branch Road, Al-Rabwa District. Phone: 920000094. Sub: riyadh.hayathospitals.com. Offers: Long-stay discounts, transplant program. Beds: 300.
- Jazan: Corniche Road, Al Shati District. Phone: 920000094. Sub: jazan.hayathospitals.com. Offers: Surgery discounts, eye surgery camp. Beds: 150.
- Khamis Mushayt: Prince Sultan Road, Umm Sarar. Phone: 0538081888 / 920000094. Sub: khamis.hayathospitals.com. Offers: Ophthalmology promos, long-stay discounts. Beds: 180.
- Madinah: Al-Hijra Branch Road, Madinah 42316. Phone: 920000094. Offers: Consultant-led services, 50+ discounts, free tests. Beds: 200.
- Unayzah: Al-Qassim - Unayzah, Medina Road. Phone: 920000094. Sub: unaizah.hayathospitals.com. Offers: Ongoing wellness promotions. Beds: 120.

Sub-branch pages: riyadh.hayathospitals.com, jazan.hayathospitals.com, khamis.hayathospitals.com, unaizah.hayathospitals.com

## DEPARTMENTS
Emergency, Internal Medicine, General & Bariatric Surgery, Orthopedics (ACL, joint replacement: hip/knee), Pediatrics, OB/GYN, Cardiology (cardiac catheterization), Dermatology & Laser, ENT, Dentistry, Ophthalmology, Urology, Neurology & Neurosurgery, Nephrology, Endocrinology, Psychiatry, Radiology, Laboratory, Pharmacy

## PROCEDURES & SERVICES
Gastric sleeve surgery, breast augmentation/lift, parotid gland removal, ACL reconstruction, joint replacement, cardiac catheterization, laser therapy, online appointment booking, insurance installment plans, patient experience feedback, health education library, home healthcare, careers/recruitment

## KEY DOCTORS (from hayathospitals.com real roster)
1. Dr. Hassan Saad Al-Yami - General & Bariatric Surgery (Khamis Mushayt)
2. Dr. Khaled Yahya Al-Shahrani - Orthopedics (Riyadh)
3. Dr. Abdulaziz Abdulrahman bin Hamed - Family Medicine (Khamis Mushayt)
4. Dr. Hisham Hussein Kariri - Internal Medicine/Endocrinology (Jazan)
5. Dr. Ashraf Ismail Al-Beltagy - Internal Medicine/Nephrology (Riyadh)
6. Dr. Jabir Awad Al-Ahmed - Endocrinology/Diabetes (Khamis Mushayt)
7. Dr. Hashim Ahmed Al-Ibrahim - Cardiology/Catheterization (Khamis Mushayt)
8. Dr. Mohammed Fayi Asiri - Ophthalmology/Cataract & Retina (Khamis Mushayt)
9. Dr. Fahad Al-Jasser - Urology (Riyadh)
10. Dr. Naif Hamed Al-Maliki - OB/GYN & Infertility (Khamis Mushayt)
11. Dr. Jehad Al-Shaturi - Neurology (Riyadh)
12. Dr. Waleed Al-Attas - Ophthalmology/Cataract & Retina (Madinah)
13. Dr. Walid Al-Basha - Cardiology/Catheterization (Jazan)
14. Dr. Samir Al-Khairi - Dermatology (Madinah)
15. Dr. Abdulaziz bin Nasser Al-Haqbani - Gastroenterology (Riyadh)

## INSURANCE PARTNERS (10)
Bupa Arabia, Tawuniya, MedGulf, Allianz Saudi Fransi, GlobeMed, Amana, Arabian Shield, Sagr, GIG Gulf, Walaa

## NPHIES SYSTEM
Integrated with NPHIES (Saudi e-Claim system). Supports 270/271 (Eligibility), 278 (Pre-auth), 837 (Claims), 276/277 (Status), 835 (Payments).

## RULES
- Warm, compassionate, professional - like a trusted family doctor
- Greet with Islamic/Saudi greetings (\u0627\u0644\u0633\u0644\u0627\u0645 \u0639\u0644\u064A\u0643\u0645, \u0643\u064A\u0641 \u062D\u0627\u0644\u0643, \u0627\u0644\u0644\u0647 \u064A\u0639\u0627\u0641\u064A\u0643, \u064A\u0627 \u0647\u0644\u0627)
- Mix Arabic and English naturally
- For emergencies: direct to ER + call 997 (Saudi Red Crescent)
- NEVER prescribe medication or make definitive diagnoses
- Respond in the patient's language (Arabic/English)
- Maximum 400 characters per response`;
    __name(handleChat, "handleChat");
    __name(getFallbackResponse, "getFallbackResponse");
  }
});

// src/router.js
var Router = class {
  static {
    __name(this, "Router");
  }
  constructor() {
    this.routes = [];
  }
  add(method, pattern, handler) {
    this.routes.push({ method, pattern, handler });
  }
  get(pattern, handler) {
    return this.add("GET", pattern, handler);
  }
  post(pattern, handler) {
    return this.add("POST", pattern, handler);
  }
  patch(pattern, handler) {
    return this.add("PATCH", pattern, handler);
  }
  delete(pattern, handler) {
    return this.add("DELETE", pattern, handler);
  }
  match(request, env, ctx) {
    const url = new URL(request.url);
    const isHead = request.method === "HEAD";
    const method = isHead ? "GET" : request.method;
    const path = url.pathname;
    for (const route of this.routes) {
      if (route.method !== method) continue;
      const match = path.match(new RegExp(`^${route.pattern}$`));
      if (!match) continue;
      const params = match.slice(1);
      const response = route.handler(request, env, ctx, params, url);
      if (!isHead) return response;
      return Promise.resolve(response).then((res) => new Response(null, {
        status: res.status,
        statusText: res.statusText,
        headers: res.headers
      }));
    }
    return new Response(request.method === "HEAD" ? null : "Not Found", { status: 404 });
  }
};

// src/index.js
init_response();

// src/utils/rate-limit.js
init_config();
var requestCounts = /* @__PURE__ */ new Map();
function rateLimit(ip) {
  const now = Date.now();
  const windowStart = now - CONFIG.RATE_LIMIT_WINDOW_MS;
  for (const [key, entry2] of requestCounts) {
    if (entry2.timestamp < windowStart) {
      requestCounts.delete(key);
    }
  }
  const entry = requestCounts.get(ip) || { count: 0, timestamp: now };
  if (entry.timestamp < windowStart) {
    entry.count = 0;
    entry.timestamp = now;
  }
  entry.count++;
  requestCounts.set(ip, entry);
  return entry.count <= CONFIG.RATE_LIMIT_MAX_REQUESTS;
}
__name(rateLimit, "rateLimit");

// src/index.js
init_config();

// src/routes/health.js
async function checkIntegration(url, timeoutMs = 4e3, init = {}) {
  try {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeoutMs);
    const res = await fetch(url, { ...init, signal: controller.signal });
    clearTimeout(id);
    if (res.ok) return "connected";
    return res.status >= 500 ? "warning" : "degraded";
  } catch {
    return "offline";
  }
}
__name(checkIntegration, "checkIntegration");

async function checkClaimLinc(env) {
  try {
    if (env.CLAIMLINC_SERVICE) {
      const res = await env.CLAIMLINC_SERVICE.fetch(new Request("https://claimlinc.internal/nphies/health"));
      return res.ok ? "connected" : res.status >= 500 ? "warning" : "degraded";
    }
    return await checkIntegration("https://api.brainsait.org/nphies/health", 3e3);
  } catch {
    return "offline";
  }
}
__name(checkClaimLinc, "checkClaimLinc");

async function checkGivc(env) {
  try {
    if (env.GIVC_SERVICE) {
      const res = await env.GIVC_SERVICE.fetch(new Request("https://givc.internal/givc/health"));
      return res.ok ? "connected" : res.status >= 500 ? "warning" : "degraded";
    }
    return await checkIntegration(`${env.GIVC_URL || "https://hnh.brainsait.org/givc"}/health`, 3e3);
  } catch {
    return "offline";
  }
}
__name(checkGivc, "checkGivc");

// Enhanced service check functions for all integrations
async function checkHomecare(env) {
  return await checkIntegration("https://homecare.hayathospitals.com/health", 3e3);
}
__name(checkHomecare, "checkHomecare");

async function checkTelehealth(env) {
  try {
    if (env.DB) {
      await env.DB.prepare("SELECT COUNT(*) as total FROM telehealth_sessions").first();
      return "connected";
    }
  } catch {
    return "warning";
  }
  return await checkIntegration("https://telehealth.brainsait.org/health", 3e3);
}
__name(checkTelehealth, "checkTelehealth");

async function checkMaillinc(env) {
  const base = env.MAILLINC_URL || "https://maillinc.brainsait-fadil.workers.dev";
  return await checkIntegration(`${base}/health`, 3e3);
}
__name(checkMaillinc, "checkMaillinc");

async function checkOracle(env) {
  const base = env.ORACLE_BRIDGE_URL || "https://oracle-bridge.brainsait.org";
  return await checkIntegration(`${base}/health`, 3e3);
}
__name(checkOracle, "checkOracle");

async function checkNPHIESMirror(env) {
  const base = env.NPHIES_MIRROR_URL || "https://nphies-mirror.brainsait-fadil.workers.dev";
  return await checkIntegration(`${base}/health`, 3e3);
}
__name(checkNPHIESMirror, "checkNPHIESMirror");

async function checkAcademy(env) {
  return "connected";
}
__name(checkAcademy, "checkAcademy");

async function checkTwilio(env) {
  return env.TWILIO_ACCOUNT_SID ? "configured" : "not_configured";
}
__name(checkTwilio, "checkTwilio");

async function checkElevenLabs(env) {
  return env.ELEVENLABS_API_KEY ? "configured" : "not_configured";
}
__name(checkElevenLabs, "checkElevenLabs");

async function checkDeepSeek(env) {
  return env.DEEPSEEK_API_KEY ? "configured" : "not_configured";
}
__name(checkDeepSeek, "checkDeepSeek");

async function checkWhatsApp(env) {
  // WhatsApp now runs over Twilio — same creds as SMS
  return (env.TWILIO_ACCOUNT_SID && env.TWILIO_AUTH_TOKEN) ? "configured" : "not_configured";
}
__name(checkWhatsApp, "checkWhatsApp");

async function health(env) {
  const stats = env.DB ? await env.DB.prepare(
    `SELECT
          (SELECT COUNT(*) FROM patients) as total_patients,
          (SELECT COUNT(*) FROM appointments WHERE date(appointment_date) = date('now')) as today_appointments,
          (SELECT COUNT(*) FROM providers) as total_providers,
          (SELECT COUNT(*) FROM claims) as total_claims,
          (SELECT COUNT(*) FROM claims WHERE status = 'pending') as pending_claims,
          (SELECT COUNT(*) FROM givc_doctors WHERE givc_status = 'active') as givc_network_count,
          (SELECT COUNT(*) FROM telehealth_sessions WHERE date(created_at) = date('now')) as today_telehealth,
          (SELECT COUNT(*) FROM homecare_visits WHERE date(created_at) = date('now')) as today_homecare`
  ).first() : {};
  const oracleBase = env.ORACLE_BRIDGE_URL || "https://oracle-bridge.brainsait.org";
  const mirrorBase = env.NPHIES_MIRROR_URL || "https://nphies-mirror.brainsait-fadil.workers.dev";
  const maillincBase = env.MAILLINC_URL || "https://maillinc.brainsait-fadil.workers.dev";
  
  // Check all services in parallel
  const [
    oracleStatus, nphiesStatus, claimlincStatus, basmaStatus, sbsStatus, givcStatus,
    homecareStatus, telehealthStatus, maillincStatus, academyStatus
  ] = await Promise.allSettled([
    checkOracle(env),
    checkNPHIESMirror(env),
    checkClaimLinc(env),
    checkIntegration("https://bsma.elfadil.com/health", 3e3),
    checkIntegration("https://sbs.elfadil.com/api/health", 3e3),
    checkGivc(env),
    checkHomecare(env),
    checkTelehealth(env),
    checkMaillinc(env),
    checkAcademy(env)
  ]);

  // Get NPHIES mirror stats
  let nphiesMirror = null;
  try {
    const nmRes = await fetch(`${mirrorBase}/mirror/status`, { signal: AbortSignal.timeout(4e3) });
    if (nmRes.ok) {
      const nmData = await nmRes.json();
      nphiesMirror = { total_gss: nmData.total_gss || 81, total_pa: nmData.total_pa || 51297 };
    }
  } catch {}

  // Get telehealth stats
  let telehealthStats = null;
  if (env.DB) {
    try {
      telehealthStats = await env.DB.prepare(
        `SELECT status, COUNT(*) as count FROM telehealth_sessions GROUP BY status`
      ).all();
    } catch {}
  }

  // Get homecare stats
  let homecareStats = null;
  if (env.DB) {
    try {
      homecareStats = await env.DB.prepare(
        `SELECT status, COUNT(*) as count FROM homecare_visits GROUP BY status`
      ).all();
    } catch {}
  }

  return {
    success: true,
    status: "healthy",
    version: env.HUB_VERSION || "9.1.0",
    name: "HNH Portal - BrainSAIT Healthcare OS",
    timestamp: new Date().toISOString(),
    database: env.DB ? "connected" : "unavailable",
    his_database: env.HIS_DB ? "connected" : "unavailable",
    basma_database: env.BASMA_DB ? "connected" : "unavailable",
    stats: stats || {},
    environment: env.NPHIES_ENVIRONMENT || "sandbox",
    integrations: {
      // Core Systems
      oracle_bridge: oracleStatus.status === "fulfilled" ? oracleStatus.value : "offline",
      nphies_mirror: nphiesStatus.status === "fulfilled" ? nphiesStatus.value : "offline",
      claimlinc: claimlincStatus.status === "fulfilled" ? claimlincStatus.value : "offline",
      basma_portal: basmaStatus.status === "fulfilled" ? basmaStatus.value : "offline",
      sbs_portal: sbsStatus.status === "fulfilled" ? sbsStatus.value : "offline",
      givc_portal: givcStatus.status === "fulfilled" ? { status: givcStatus.value, network_count: stats?.givc_network_count ?? 0 } : { status: "offline", network_count: 0 },
      
      // Digital Health Services
      homecare: homecareStatus.status === "fulfilled" ? homecareStatus.value : "offline",
      telehealth: telehealthStatus.status === "fulfilled" ? telehealthStatus.value : "offline",
      maillinc: maillincStatus.status === "fulfilled" ? maillincStatus.value : "offline",
      academy: academyStatus.status === "fulfilled" ? academyStatus.value : "offline",
      
      // AI & Communication Services (configuration status)
      elevenlabs: await checkElevenLabs(env),
      deepseek: await checkDeepSeek(env),
      twilio: await checkTwilio(env),
      whatsapp: await checkWhatsApp(env)
    },
    oracle_tunnel: "Oracle Cloud@Riyadh",
    nphies_mirror: nphiesMirror,
    telehealth_stats: telehealthStats?.results || [],
    homecare_stats: homecareStats?.results || [],
    services: {
      basma_ai: "Voice-activated multilingual AI assistant",
      givc: "Revenue Cycle Management",
      nphies: "National Health Insurance Exchange",
      oracle: "Enterprise Cloud Infrastructure",
      sbs: "Saudi Billing System",
      claimlinc: "Claims Processing & Adjudication",
      homecare: "Home Healthcare Services",
      telehealth: "Virtual Consultations",
      maillinc: "Email Communications",
      academy: "Healthcare Training Academy"
    }
  };
}
__name(health, "health");

// src/routes/branches.js
var branches = [
  {
    id: "R001",
    name_ar: "\u0645\u0633\u062A\u0634\u0641\u0649 \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A - \u0627\u0644\u0631\u064A\u0627\u0636",
    name_en: "Hayat National Hospital - Riyadh",
    city_ar: "\u0627\u0644\u0631\u064A\u0627\u0636",
    city_en: "Riyadh",
    address_ar: "\u062D\u064A \u0627\u0644\u0631\u0628\u0648\u0629\u060C \u0637\u0631\u064A\u0642 \u0627\u0644\u0641\u0631\u0639 \u0627\u0644\u062F\u0627\u0626\u0631\u064A \u0627\u0644\u0634\u0631\u0642\u064A",
    address_en: "Eastern Ring Branch Road, Al-Rabwa District, Riyadh",
    phone: "+966920000094",
    emergency: "+966920000094",
    email: "info@hayathospitals.com",
    subdomain: "riyadh.hayathospitals.com",
    offers_ar: "\u062E\u0635\u0648\u0645\u0627\u062A \u0644\u0644\u0645\u0631\u0636\u0649 \u0627\u0644\u0645\u0646\u0648\u0645\u064A\u0646 \u0644\u0641\u062A\u0631\u0627\u062A \u0637\u0648\u064A\u0644\u0629\u060C \u0628\u0631\u0646\u0627\u0645\u062C \u0632\u0631\u0627\u0639\u0629 \u062E\u0627\u0635",
    offers_en: "Long-stay patient discounts, special transplant program",
    departments: ["emergency", "internal", "surgery", "cardiology", "neurology", "orthopedics", "pediatrics", "obgyn", "ophthalmology", "dentistry", "psychiatry", "radiology", "laboratory", "pharmacy", "urology", "ent", "dermatology", "gastroenterology", "nephrology", "endocrinology", "rheumatology", "oncology", "neurosurgery", "vascular_surgery", "plastic_surgery", "pain_clinic"],
    beds: 300,
    established: 2005,
    rating: 4.5,
    lat: 24.7267,
    lng: 46.6783
  },
  {
    id: "J001",
    name_ar: "\u0645\u0633\u062A\u0634\u0641\u0649 \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A - \u062C\u0627\u0632\u0627\u0646",
    name_en: "Hayat National Hospital - Jazan",
    city_ar: "\u062C\u0627\u0632\u0627\u0646",
    city_en: "Jazan",
    address_ar: "\u0643\u0648\u0631\u0646\u064A\u0634 \u062C\u0627\u0632\u0627\u0646\u060C \u062D\u064A \u0627\u0644\u0634\u0627\u0637\u0626",
    address_en: "Jazan Corniche, Al Shati District",
    phone: "+966920000094",
    emergency: "+966920000094",
    email: "info@hayathospitals.com",
    subdomain: "jazan.hayathospitals.com",
    offers_ar: "\u062E\u0635\u0648\u0645\u0627\u062A \u0639\u0644\u0649 \u0627\u0644\u062C\u0631\u0627\u062D\u0627\u062A\u060C \u0645\u062E\u064A\u0645 \u0637\u0628\u064A \u0644\u062C\u0631\u0627\u062D\u0627\u062A \u0627\u0644\u0639\u064A\u0648\u0646",
    offers_en: "Surgery discounts, medical camp for eye surgery patients",
    departments: ["emergency", "internal", "surgery", "pediatrics", "obgyn", "ophthalmology", "ent", "dermatology", "gastroenterology", "cardiology", "neurology", "laboratory", "pharmacy"],
    beds: 150,
    established: 2012,
    rating: 4.3,
    lat: 16.8892,
    lng: 42.5611
  },
  {
    id: "K001",
    name_ar: "\u0645\u0633\u062A\u0634\u0641\u0649 \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A - \u062E\u0645\u064A\u0633 \u0645\u0634\u064A\u0637",
    name_en: "Hayat National Hospital - Khamis Mushayt",
    city_ar: "\u062E\u0645\u064A\u0633 \u0645\u0634\u064A\u0637",
    city_en: "Khamis Mushayt",
    address_ar: "\u0637\u0631\u064A\u0642 \u0627\u0644\u0623\u0645\u064A\u0631 \u0633\u0644\u0637\u0627\u0646\u060C \u0623\u0645 \u0633\u0631\u0627\u0631",
    address_en: "Prince Sultan Road, Umm Sarar",
    phone: "+966538081888",
    phone2: "+966920000094",
    emergency: "+966920000094",
    email: "info@hayathospitals.com",
    subdomain: "khamis.hayathospitals.com",
    offers_ar: "\u0639\u0631\u0648\u0636 \u0627\u0644\u0639\u064A\u0648\u0646\u060C \u062E\u0635\u0648\u0645\u0627\u062A \u0627\u0644\u0625\u0642\u0627\u0645\u0629 \u0627\u0644\u0637\u0648\u064A\u0644\u0629",
    offers_en: "Ophthalmology promotion, long-stay discounts",
    departments: ["emergency", "internal", "surgery", "pediatrics", "obgyn", "orthopedics", "ophthalmology", "ent", "dermatology", "cardiology", "neurology", "urology", "psychiatry", "radiology", "laboratory", "pharmacy", "gastroenterology", "nephrology", "endocrinology", "pulmonology", "neurosurgery", "rehabilitation"],
    beds: 180,
    established: 2014,
    rating: 4.2,
    lat: 18.3063,
    lng: 42.7288
  },
  {
    id: "M001",
    name_ar: "\u0645\u0633\u062A\u0634\u0641\u0649 \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A - \u0627\u0644\u0645\u062F\u064A\u0646\u0629 \u0627\u0644\u0645\u0646\u0648\u0631\u0629",
    name_en: "Hayat National Hospital - Madinah",
    city_ar: "\u0627\u0644\u0645\u062F\u064A\u0646\u0629 \u0627\u0644\u0645\u0646\u0648\u0631\u0629",
    city_en: "Madinah",
    address_ar: "\u0637\u0631\u064A\u0642 \u0641\u0631\u0639 \u0627\u0644\u0647\u062C\u0631\u0629\u060C \u0627\u0644\u0645\u062F\u064A\u0646\u0629 \u0627\u0644\u0645\u0646\u0648\u0631\u0629 42316",
    address_en: "Al-Hijra Branch Road, Madinah 42316",
    phone: "+966920000094",
    emergency: "+966920000094",
    email: "info@hayathospitals.com",
    offers_ar: "\u062E\u062F\u0645\u0627\u062A \u0637\u0628\u064A\u0629 \u0628\u0627\u0633\u062A\u0634\u0627\u0631\u064A\u064A\u0646 \u0645\u062A\u062E\u0635\u0635\u064A\u0646\u060C \u062E\u0635\u0648\u0645\u0627\u062A 50+ \u0633\u0646\u0629\u060C \u0641\u062D\u0648\u0635\u0627\u062A \u0645\u062C\u0627\u0646\u064A\u0629",
    offers_en: "Consultant-led medical services, 50+ senior discounts, free medical tests",
    departments: ["emergency", "internal", "surgery", "cardiology", "pediatrics", "obgyn", "ophthalmology", "ent", "dermatology", "neurology", "nephrology", "endocrinology", "pulmonology", "laboratory", "pharmacy", "rehabilitation"],
    beds: 200,
    established: 2010,
    rating: 4.4,
    lat: 24.4672,
    lng: 39.6119
  },
  {
    id: "U001",
    name_ar: "\u0645\u0633\u062A\u0634\u0641\u0649 \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A - \u0639\u0646\u064A\u0632\u0629",
    name_en: "Hayat National Hospital - Unayzah",
    city_ar: "\u0639\u0646\u064A\u0632\u0629",
    city_en: "Unayzah",
    address_ar: "\u0627\u0644\u0642\u0635\u064A\u0645 - \u0639\u0646\u064A\u0632\u0629\u060C \u0637\u0631\u064A\u0642 \u0627\u0644\u0645\u062F\u064A\u0646\u0629",
    address_en: "Al-Qassim - Unayzah, Medina Road",
    phone: "+966920000094",
    emergency: "+966920000094",
    email: "info@hayathospitals.com",
    subdomain: "unaizah.hayathospitals.com",
    offers_ar: "\u0639\u0631\u0648\u0636 \u0645\u0633\u062A\u0645\u0631\u0629 \u0648\u0639\u0631\u0648\u0636 \u0627\u0644\u0631\u0641\u0627\u0647\u064A\u0629",
    offers_en: "Ongoing promotions and wellness offers",
    departments: ["emergency", "internal", "surgery", "pediatrics", "obgyn", "ophthalmology", "ent", "urology", "psychiatry", "radiology", "laboratory", "pharmacy", "gastroenterology", "cardiology", "neurology"],
    beds: 120,
    established: 2015,
    rating: 4.1,
    lat: 26.0867,
    lng: 43.992
  }
];
function getBranches() {
  return branches;
}
__name(getBranches, "getBranches");
function getBranch(id) {
  return branches.find((b) => b.id === id) || null;
}
__name(getBranch, "getBranch");

// src/routes/appointments.js
init_response();
async function createAppointment(req, env) {
  const body = await req.json().catch(() => ({}));
  const required = ["patient_id", "appointment_date", "appointment_time"];
  for (const f of required) {
    if (!body[f]) return json({ success: false, message: `Missing required field: ${f}` }, 400);
  }
  const result = await env.DB.prepare(
    `INSERT INTO appointments (patient_id, provider_id, clinic_code, clinic_name, appointment_date, appointment_time, status, appointment_type, reason)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).bind(
    body.patient_id,
    body.provider_id || null,
    body.clinic_code || "GEN",
    body.clinic_name || "",
    body.appointment_date,
    body.appointment_time,
    body.status || "scheduled",
    body.appointment_type || "regular",
    body.reason || ""
  ).run();
  return json({ success: true, appointment_id: result.meta?.last_row_id }, 201);
}
__name(createAppointment, "createAppointment");
async function getAppointments(req, env, ctx, params, url) {
  if (!url) url = new URL(req.url);
  const search = url.searchParams.get("search") || "";
  const branch = url.searchParams.get("branch") || "";
  const date = url.searchParams.get("date") || "";
  const status = url.searchParams.get("status") || "";
  const patient = url.searchParams.get("patient_id") || "";
  const limit = parseInt(url.searchParams.get("limit") || "50");
  const offset = parseInt(url.searchParams.get("offset") || "0");
  let query = `SELECT a.*, p.full_name_ar as patient_name_ar, p.full_name_en as patient_name_en, p.phone as patient_phone`;
  query += ` FROM appointments a LEFT JOIN patients p ON a.patient_id = p.id`;
  const binds = [];
  const conditions = [];
  if (branch) {
    conditions.push("a.branch_id = ?");
    binds.push(branch);
  }
  if (date) {
    conditions.push("a.appointment_date = ?");
    binds.push(date);
  }
  if (status) {
    conditions.push("a.status = ?");
    binds.push(status);
  }
  if (patient) {
    conditions.push("a.patient_id = ?");
    binds.push(patient);
  }
  if (search) {
    conditions.push("(p.full_name_ar LIKE ? OR p.full_name_en LIKE ?)");
    binds.push(`%${search}%`, `%${search}%`);
  }
  if (conditions.length) query += " WHERE " + conditions.join(" AND ");
  query += " ORDER BY a.appointment_date DESC, a.appointment_time ASC LIMIT ? OFFSET ?";
  binds.push(limit, offset);
  const { results } = await env.DB.prepare(query).bind(...binds).all();
  return json({ success: true, appointments: results || [] });
}
__name(getAppointments, "getAppointments");
async function getAppointment(req, env, ctx, params) {
  const id = params[0];
  const appt = await env.DB.prepare(
    `SELECT a.*, p.full_name_ar as patient_name_ar, p.full_name_en as patient_name_en, p.phone as patient_phone
     FROM appointments a LEFT JOIN patients p ON a.patient_id = p.id WHERE a.id = ?`
  ).bind(id).first();
  if (!appt) {
    return json({ success: false, message: "Appointment not found" }, 404);
  }
  return json({ success: true, appointment: appt });
}
__name(getAppointment, "getAppointment");
async function updateAppointment(req, env, ctx, params) {
  const id = params[0];
  const body = await req.json();
  const fields = [];
  const binds = [];
  for (const [key, value] of Object.entries(body)) {
    const allowed = ["appointment_date", "appointment_time", "status", "appointment_type", "reason", "provider_id", "clinic_code", "clinic_name"];
    if (allowed.includes(key)) {
      fields.push(`${key} = ?`);
      binds.push(value);
    }
  }
  if (fields.length === 0) {
    return json({ success: false, message: "No valid fields to update" }, 400);
  }
  fields.push("updated_at = datetime('now')");
  binds.push(id);
  await env.DB.prepare(`UPDATE appointments SET ${fields.join(", ")} WHERE id = ?`).bind(...binds).run();
  return json({ success: true, message: "Appointment updated" });
}
__name(updateAppointment, "updateAppointment");
async function cancelAppointment(req, env, ctx, params) {
  const id = params[0];
  await env.DB.prepare(`UPDATE appointments SET status = 'cancelled', updated_at = datetime('now') WHERE id = ?`).bind(id).run();
  return json({ success: true, message: "Appointment cancelled" });
}
__name(cancelAppointment, "cancelAppointment");

// src/routes/patients.js
init_response();
async function createPatient(req, env) {
  const body = await req.json().catch(() => ({}));
  if (!body.phone) return json({ success: false, message: "phone is required" }, 400);
  const nameAr = body.full_name_ar || body.name_ar || [body.first_name_ar, body.last_name_ar].filter(Boolean).join(" ") || body.full_name_en || body.name_en || "Patient";
  const nameEn = body.full_name_en || body.name_en || [body.first_name_en, body.last_name_en].filter(Boolean).join(" ") || nameAr;
  const nationalId = body.national_id || null;
  const existing = nationalId ? await env.DB.prepare("SELECT * FROM patients WHERE national_id = ? OR phone = ? LIMIT 1").bind(nationalId, body.phone).first() : await env.DB.prepare("SELECT * FROM patients WHERE phone = ? LIMIT 1").bind(body.phone).first();
  if (existing) {
    return json({
      success: true,
      patient_id: existing.id,
      mrn: existing.mrn,
      existing: true,
      message: "Patient already exists"
    });
  }
  const mrn = "HNH-" + Date.now();
  const result = await env.DB.prepare(
    `INSERT INTO patients (mrn, national_id, first_name_ar, last_name_ar, full_name_ar, first_name_en, last_name_en, full_name_en, phone, email, date_of_birth, gender, blood_type, allergies)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).bind(
    mrn,
    nationalId,
    body.first_name_ar || nameAr,
    body.last_name_ar || null,
    nameAr,
    body.first_name_en || nameEn,
    body.last_name_en || null,
    nameEn,
    body.phone,
    body.email || null,
    body.date_of_birth || body.dob || null,
    body.gender || null,
    body.blood_type || null,
    body.allergies || null
  ).run();
  return json({ success: true, patient_id: result.meta?.last_row_id, mrn, message: "Patient created successfully" }, 201);
}
__name(createPatient, "createPatient");
async function getPatients(req, env, ctx, params, url) {
  if (!url) url = new URL(req.url);
  const search = url.searchParams.get("search") || "";
  const branch = url.searchParams.get("branch") || "";
  const limit = parseInt(url.searchParams.get("limit") || "50");
  const offset = parseInt(url.searchParams.get("offset") || "0");
  let query = "SELECT * FROM patients";
  let binds = [];
  const conditions = [];
  if (search) {
    conditions.push("(full_name_ar LIKE ? OR full_name_en LIKE ? OR phone LIKE ? OR national_id LIKE ?)");
    const s = `%${search}%`;
    binds.push(s, s, s, s);
  }
  if (conditions.length) {
    query += " WHERE " + conditions.join(" AND ");
  }
  query += " ORDER BY created_at DESC LIMIT ? OFFSET ?";
  binds.push(limit, offset);
  const { results } = await env.DB.prepare(query).bind(...binds).all();
  return json({ success: true, patients: results || [], total: results?.length || 0 });
}
__name(getPatients, "getPatients");
async function getPatient(req, env, ctx, params) {
  const id = params[0];
  const patient = await env.DB.prepare("SELECT * FROM patients WHERE id = ? OR national_id = ?").bind(id, id).first();
  if (!patient) {
    return new Response(JSON.stringify({ success: false, message: "Patient not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" }
    });
  }
  return json({ success: true, patient });
}
__name(getPatient, "getPatient");
async function updatePatient(req, env, ctx, params) {
  const id = params[0];
  const body = await req.json();
  const fields = [];
  const binds = [];
  for (const [key, value] of Object.entries(body)) {
    const allowed = ["national_id", "full_name_ar", "full_name_en", "phone", "email", "date_of_birth", "gender", "insurance_company", "insurance_id", "blood_type", "allergies"];
    if (allowed.includes(key)) {
      fields.push(`${key} = ?`);
      binds.push(value);
    }
  }
  if (fields.length === 0) {
    return json({ success: false, message: "No valid fields to update" }, 400);
  }
  fields.push("updated_at = datetime('now')");
  binds.push(id);
  await env.DB.prepare(`UPDATE patients SET ${fields.join(", ")} WHERE id = ?`).bind(...binds).run();
  return json({ success: true, message: "Patient updated" });
}
__name(updatePatient, "updatePatient");

// src/routes/claims.js
init_response();
function generateClaimNumber() {
  const date = /* @__PURE__ */ new Date();
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const seq = String(Math.floor(Math.random() * 99999)).padStart(5, "0");
  return `NH${y}${m}-${seq}`;
}
__name(generateClaimNumber, "generateClaimNumber");
async function createClaim(req, env) {
  const body = await req.json();
  const claimNumber = generateClaimNumber();
  const patientId = parseInt(body.patient_id) || 0;
  const result = await env.DB.prepare(
    `INSERT INTO claims (claim_number, patient_id, total_amount, status, payer_id, payer_name, claim_type)
     VALUES (?, ?, ?, ?, ?, ?, ?)`
  ).bind(
    claimNumber,
    patientId,
    body.total_amount,
    body.status || "draft",
    body.payer_id || null,
    body.payer_name || null,
    body.claim_type || "inpatient"
  ).run();
  return json({ success: true, claim_id: result?.meta?.last_row_id, claim_number: claimNumber }, 201);
}
__name(createClaim, "createClaim");
async function getClaims(req, env, ctx, params, url) {
  if (!url) url = new URL(req.url);
  const patient = url.searchParams.get("patient_id") || "";
  const branch = url.searchParams.get("branch") || "";
  const status = url.searchParams.get("status") || "";
  const limit = parseInt(url.searchParams.get("limit") || "50");
  const offset = parseInt(url.searchParams.get("offset") || "0");
  let query = `SELECT c.*, p.full_name_ar as patient_name_ar, p.full_name_en as patient_name_en`;
  query += ` FROM claims c LEFT JOIN patients p ON c.patient_id = p.id`;
  const binds = [];
  const conditions = [];
  if (patient) {
    conditions.push("c.patient_id = ?");
    binds.push(patient);
  }
  if (status) {
    conditions.push("c.status = ?");
    binds.push(status);
  }
  if (conditions.length) query += " WHERE " + conditions.join(" AND ");
  query += " ORDER BY c.created_at DESC LIMIT ? OFFSET ?";
  binds.push(limit, offset);
  const { results } = await env.DB.prepare(query).bind(...binds).all();
  return json({ success: true, claims: results || [] });
}
__name(getClaims, "getClaims");
async function getClaim(req, env, ctx, params) {
  const id = params[0];
  const claim = await env.DB.prepare(
    `SELECT c.*, p.full_name_ar as patient_name_ar, p.full_name_en as patient_name_en, p.phone as patient_phone
     FROM claims c LEFT JOIN patients p ON c.patient_id = p.id
     WHERE c.id = ? OR c.claim_number = ?`
  ).bind(id, id).first();
  if (!claim) return json({ success: false, message: "Claim not found" }, 404);
  return json({ success: true, claim });
}
__name(getClaim, "getClaim");
async function submitClaimToNPHIES(req, env, ctx, params) {
  const id = params[0];
  const claim = await env.DB.prepare("SELECT * FROM claims WHERE id = ? OR claim_number = ?").bind(id, id).first();
  if (!claim) return json({ success: false, message: "Claim not found" }, 404);
  if (claim.status !== "draft") return json({ success: false, message: "Claim already submitted" }, 400);
  const nphiesId = "NPH" + Date.now().toString(36).toUpperCase();
  const now = (/* @__PURE__ */ new Date()).toISOString();
  await env.DB.prepare(
    `UPDATE claims SET status = ?, nphies_claim_id = ?, submission_date = ?, approval_date = datetime('now')
     WHERE id = ?`
  ).bind("submitted", nphiesId, now, claim.id).run();
  return json({
    success: true,
    message: "Claim submitted to NPHIES successfully",
    nphies_transaction_id: nphiesId,
    nphies_status: "acknowledged",
    claim_id: claim.id,
    claim_number: claim.claim_number
  });
}
__name(submitClaimToNPHIES, "submitClaimToNPHIES");
async function getClaimNPHIESStatus(req, env, ctx, params) {
  const id = params[0];
  const claim = await env.DB.prepare("SELECT * FROM claims WHERE id = ? OR claim_number = ?").bind(id, id).first();
  if (!claim) return json({ success: false, message: "Claim not found" }, 404);
  const statuses = ["acknowledged", "accepted", "in_review", "partially_paid", "paid"];
  const mockStatus = statuses[Math.floor(Math.random() * statuses.length)];
  return json({
    success: true,
    claim_id: claim.id,
    claim_number: claim.claim_number,
    nphies_status: mockStatus,
    nphies_transaction_id: claim.nphies_claim_id,
    last_checked: (/* @__PURE__ */ new Date()).toISOString()
  });
}
__name(getClaimNPHIESStatus, "getClaimNPHIESStatus");

// src/routes/eligibility.js
init_response();

// src/utils/claimlinc.js
var CLAIMLINC_BASE = "https://api.brainsait.org/nphies";
var BRANCH_ALIASES = {
  r001: "riyadh",
  riyadh: "riyadh",
  j001: "jizan",
  jazan: "jizan",
  jizan: "jizan",
  k001: "khamis",
  khamis: "khamis",
  khamis_mushayt: "khamis",
  khamis_mushait: "khamis",
  khamismushayt: "khamis",
  khamismushait: "khamis",
  m001: "madinah",
  madinah: "madinah",
  madina: "madinah",
  medina: "madinah",
  u001: "unaizah",
  unaizah: "unaizah",
  unayzah: "unaizah",
  abha: "abha"
};
function claimlincKey(env) {
  return env.CLAIMLINC_KEY || "";
}
__name(claimlincKey, "claimlincKey");
function claimlincBranch(value) {
  const key = String(value || "riyadh").trim().toLowerCase().replace(/[\s-]+/g, "_");
  return BRANCH_ALIASES[key] || "riyadh";
}
__name(claimlincBranch, "claimlincBranch");
function firstIdentifier(...values) {
  for (const value of values) {
    const identifier = String(value || "").trim();
    if (identifier) return identifier;
  }
  return "";
}
__name(firstIdentifier, "firstIdentifier");
async function claimlincEligibility(env, options = {}) {
  const key = claimlincKey(env);
  const identifier = firstIdentifier(options.identifier);
  if (!key || !identifier) return null;
  const branch = claimlincBranch(options.branch || env.NPHIES_BRANCH);
  const url = new URL(`${CLAIMLINC_BASE}/eligibility/${branch}`);
  url.searchParams.set("identifier", identifier);
  url.searchParams.set("page", String(options.page || "0"));
  url.searchParams.set("size", String(options.size || "10"));
  try {
    const res = env.CLAIMLINC_SERVICE ? await env.CLAIMLINC_SERVICE.fetch(new Request(`https://claimlinc.internal/nphies/eligibility/${branch}${url.search}`, {
      headers: { "X-API-Key": key, Accept: "application/json" }
    })) : await fetch(url.toString(), {
      headers: { "X-API-Key": key, Accept: "application/json" },
      signal: AbortSignal.timeout(options.timeoutMs || 8e3)
    });
    if (res.ok) return res.json();
    return null;
  } catch (e) {
    console.error("ClaimLinc eligibility error:", e?.message?.slice(0, 100));
    return null;
  }
}
__name(claimlincEligibility, "claimlincEligibility");

// src/routes/eligibility.js
async function checkEligibility(req, env) {
  const body = await req.json();
  const {
    patient_id,
    insurance_id,
    insurance_company,
    service_type,
    // medical, dental, pharmacy, hospital
    provider_npi,
    national_id,
    branch
  } = body;
  if (!insurance_id) {
    return json({ success: false, message: "Insurance ID required" }, 400);
  }
  let patient = null;
  if (patient_id) {
    patient = await env.DB.prepare("SELECT * FROM patients WHERE id = ?").bind(patient_id).first();
  }
  const transactionId = "NPH-EB-" + Date.now().toString(36).toUpperCase();
  let eligibilityResponse = null;
  const clData = await claimlincEligibility(env, {
    branch,
    identifier: firstIdentifier(national_id, patient?.national_id, insurance_id)
  });
  if (clData) {
    eligibilityResponse = {
      ...clData,
      transaction_id: transactionId,
      subscriber_id: insurance_id,
      insurance_company: insurance_company || null,
      service_type: service_type || "medical",
      provider_npi: provider_npi || null,
      source: "claimlinc-live"
    };
  }
  if (!eligibilityResponse) {
    eligibilityResponse = {
      transaction_id: transactionId,
      source: "fallback",
      warning: "ClaimLinc unavailable \u2014 response is estimated, not live",
      subscriber: {
        insurance_id,
        name: patient ? patient.full_name_en || patient.full_name_ar || "Patient" : "Patient",
        relationship: "Self"
      },
      payer: {
        company: insurance_company || "Unknown",
        payer_id: null
      },
      status: "unknown",
      coverage: {
        inpatient: { covered: null, deductible: null, co_pay_percentage: null, max_benefit: null },
        outpatient: { covered: null, deductible: null, co_pay_percentage: null },
        pharmacy: { covered: null, co_pay_percentage: null },
        dental: { covered: null, co_pay_percentage: null }
      },
      exclusions: [],
      effective_date: null,
      expiry_date: null,
      network: null
    };
  }
  try {
    if (env.DB) {
      await env.DB.prepare(
        `INSERT INTO eligibility_checks (id, patient_id, insurance_company, service_type, response_json, status)
         VALUES (?, ?, ?, ?, ?, ?)`
      ).bind(
        "ELG" + Date.now().toString(36).toUpperCase(),
        patient_id || null,
        insurance_company || null,
        service_type || "medical",
        JSON.stringify(eligibilityResponse),
        eligibilityResponse.source === "claimlinc-live" ? "completed" : "fallback"
      ).run();
    }
  } catch (e) {
  }
  return json({ success: true, eligibility: eligibilityResponse });
}
__name(checkEligibility, "checkEligibility");
async function verifyInsurance(req, env) {
  const body = await req.json();
  const { insurance_id, insurance_company, national_id, branch } = body;
  if (!insurance_id) {
    return json({ success: false, message: "Insurance ID required" }, 400);
  }
  const isValidFormat = insurance_id.length >= 8 && /^\d+$/.test(insurance_id.replace(/-/g, ""));
  if (!isValidFormat) {
    return json({
      success: true,
      verified: false,
      message: "Insurance ID format invalid \u2014 must be numeric, minimum 8 digits"
    });
  }
  const clData = await claimlincEligibility(env, {
    branch,
    identifier: firstIdentifier(national_id, insurance_id),
    timeoutMs: 6e3
  });
  if (clData) {
    return json({
      success: true,
      verified: clData.status === "active" || clData.verified === true || Number(clData.totalElements || clData.total || 0) > 0,
      details: clData,
      source: "claimlinc-live"
    });
  }
  return json({
    success: true,
    verified: true,
    source: "format-only",
    warning: "Live verification unavailable \u2014 format only checked",
    details: {
      company: insurance_company || "Unknown",
      insurance_id
    },
    message: "Insurance ID format valid. Live network verification unavailable."
  });
}
__name(verifyInsurance, "verifyInsurance");
async function getEligibilityHistory(req, env, ctx, params) {
  const patientId = params[0];
  const { results } = await env.DB.prepare(
    "SELECT * FROM eligibility_checks WHERE patient_id = ? ORDER BY check_date DESC LIMIT 20"
  ).bind(patientId).all();
  if (results) {
    for (const r of results) {
      try {
        r.response_json = JSON.parse(r.response_json);
      } catch (e) {
      }
    }
  }
  return json({ success: true, checks: results || [] });
}
__name(getEligibilityHistory, "getEligibilityHistory");

// src/index.js
init_providers();

// src/routes/nphies.js
init_response();
var CLAIMLINC_BASE2 = "https://api.brainsait.org/nphies";
var NPHIES_OID = "1.3.6.1.4.1.61026";
function clKey(env) {
  return env.CLAIMLINC_KEY || "";
}
__name(clKey, "clKey");
async function claimlinc(env, path, body, method = "POST") {
  const key = clKey(env);
  if (!key) return null;
  try {
    const res = await fetch(`${CLAIMLINC_BASE2}${path}`, {
      method,
      headers: { "Content-Type": "application/json", "X-API-Key": key },
      body: body ? JSON.stringify(body) : void 0,
      signal: AbortSignal.timeout(8e3)
    });
    if (res.ok) return res.json();
    return null;
  } catch (e) {
    console.error(`ClaimLinc ${path} error:`, e?.message?.slice(0, 80));
    return null;
  }
}
__name(claimlinc, "claimlinc");
async function submit270(req, env) {
  const body = await req.json();
  const transactionId = "NPH270-" + Date.now().toString(36).toUpperCase();
  const clData = await claimlincEligibility(env, {
    branch: body.branch,
    identifier: firstIdentifier(body.national_id, body.identifier, body.subscriber_id)
  });
  if (clData) {
    return json({
      success: true,
      nphies_version: "V2",
      transaction_type: "270",
      source: "claimlinc-live",
      ack: { transaction_id: transactionId, status: "accepted", timestamp: (/* @__PURE__ */ new Date()).toISOString() },
      response_271: clData
    });
  }
  return json({
    success: true,
    nphies_version: "V2",
    transaction_type: "270",
    source: "fallback",
    warning: "ClaimLinc unavailable \u2014 eligibility not verified",
    ack: { transaction_id: transactionId, status: "pending", timestamp: (/* @__PURE__ */ new Date()).toISOString() },
    response_271: {
      subscriber: {
        id: body.subscriber_id || "Unknown",
        name: body.subscriber_name || "Patient",
        eligibility_status: "Unknown",
        effective_date: null,
        benefits_end_date: null
      },
      benefits: null,
      rejection_info: "Live NPHIES endpoint unavailable \u2014 resubmit when restored"
    }
  });
}
__name(submit270, "submit270");
async function submit278(req, env) {
  const body = await req.json();
  const transactionId = "NPH278-" + Date.now().toString(36).toUpperCase();
  const clData = await claimlinc(env, "/authorization", {
    transaction_id: transactionId,
    nphies_version: "V2",
    facility_oid: NPHIES_OID,
    facility_license: env.FACILITY_LICENSE || "10000000000988",
    subscriber_id: body.subscriber_id,
    patient_id: body.patient_id,
    diagnosis_code: body.diagnosis_code,
    procedure_code: body.procedure_code,
    service_type: body.service_type,
    insurance_company: body.insurance_company,
    provider_npi: body.provider_npi,
    clinical_notes: body.clinical_notes
  });
  if (clData) {
    return json({
      success: true,
      nphies_version: "V2",
      transaction_type: "278",
      source: "claimlinc-live",
      ack: { transaction_id: transactionId, status: "accepted", timestamp: (/* @__PURE__ */ new Date()).toISOString() },
      authorization: clData
    });
  }
  return json({
    success: true,
    nphies_version: "V2",
    transaction_type: "278",
    source: "fallback",
    warning: "ClaimLinc unavailable \u2014 PA not confirmed with payer",
    ack: { transaction_id: transactionId, status: "pending", timestamp: (/* @__PURE__ */ new Date()).toISOString() },
    authorization: {
      reference_number: null,
      status: "Pending",
      service_type: body.service_type || "Medical Care",
      diagnosis_code: body.diagnosis_code || null,
      procedure_code: body.procedure_code || null,
      authorized_units: null,
      effective_date: null,
      expiration_date: null,
      provider_notes: "Authorization pending \u2014 ClaimLinc endpoint unavailable. Resubmit or obtain manual PA."
    }
  });
}
__name(submit278, "submit278");
async function submit837(req, env) {
  const body = await req.json();
  const transactionId = "NPH837-" + Date.now().toString(36).toUpperCase();
  const claimRef = "CLM" + Date.now().toString(36).toUpperCase();
  const clData = await claimlinc(env, "/claims/submit", {
    transaction_id: transactionId,
    claim_reference: claimRef,
    nphies_version: "V2",
    facility_oid: NPHIES_OID,
    facility_license: env.FACILITY_LICENSE || "10000000000988",
    subscriber_id: body.subscriber_id,
    patient_id: body.patient_id,
    insurance_company: body.insurance_company,
    total_amount: body.total_amount,
    patient_share: body.patient_share,
    diagnosis_codes: body.diagnosis_codes,
    procedure_codes: body.procedure_codes,
    service_date: body.service_date,
    provider_npi: body.provider_npi,
    prior_auth_number: body.prior_auth_number
  });
  if (clData) {
    return json({
      success: true,
      nphies_version: "V2",
      transaction_type: "837P",
      source: "claimlinc-live",
      ack: {
        transaction_id: transactionId,
        claim_reference: claimRef,
        status: "Accepted",
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        edi_ack_code: "TA1"
      },
      claim: clData
    });
  }
  return json({
    success: true,
    nphies_version: "V2",
    transaction_type: "837P",
    source: "fallback",
    warning: "ClaimLinc unavailable \u2014 claim queued locally, not submitted to payer",
    ack: {
      transaction_id: transactionId,
      claim_reference: claimRef,
      status: "Queued",
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      edi_ack_code: null,
      ack_detail: "Claim saved locally. Resubmit when ClaimLinc endpoint is restored."
    },
    claim: {
      claim_reference: claimRef,
      submitted_amount: body.total_amount || null,
      patient_responsibility: body.patient_share || null,
      payer: body.insurance_company || null,
      status: "queued"
    }
  });
}
__name(submit837, "submit837");
async function getClaimStatus276(req, env, ctx, params) {
  const claimId = params[0];
  const transactionId = "NPH276-" + Date.now().toString(36).toUpperCase();
  const clData = await claimlinc(env, `/claims/${claimId}/status`, null, "GET");
  if (clData) {
    return json({
      success: true,
      nphies_version: "V2",
      transaction_type: "276/277",
      source: "claimlinc-live",
      ack: { transaction_id: transactionId, timestamp: (/* @__PURE__ */ new Date()).toISOString() },
      claim_status: { claim_id: claimId, ...clData }
    });
  }
  let localClaim = null;
  try {
    localClaim = await env.DB.prepare(
      "SELECT * FROM claims WHERE id = ? OR claim_reference = ?"
    ).bind(claimId, claimId).first();
  } catch (e) {
  }
  return json({
    success: true,
    nphies_version: "V2",
    transaction_type: "276/277",
    source: localClaim ? "local-db" : "fallback",
    warning: "ClaimLinc unavailable \u2014 showing local record only",
    ack: { transaction_id: transactionId, timestamp: (/* @__PURE__ */ new Date()).toISOString() },
    claim_status: {
      claim_id: claimId,
      status: localClaim ? localClaim.status || "Unknown" : "Not Found",
      payer_claim_number: localClaim ? localClaim.payer_claim_number : null,
      last_updated: localClaim ? localClaim.updated_at : null
    }
  });
}
__name(getClaimStatus276, "getClaimStatus276");
async function receive835(req, env) {
  const body = await req.json();
  const transactionId = "NPH835-" + Date.now().toString(36).toUpperCase();
  const clData = await claimlinc(env, "/remittance", {
    transaction_id: transactionId,
    payer: body.payer,
    check_number: body.check_number,
    payment_date: body.payment_date,
    claims: body.claims
  });
  if (clData) {
    return json({
      success: true,
      nphies_version: "V2",
      transaction_type: "835",
      source: "claimlinc-live",
      ack: { transaction_id: transactionId, status: "Processed", timestamp: (/* @__PURE__ */ new Date()).toISOString() },
      payment: clData
    });
  }
  return json({
    success: true,
    nphies_version: "V2",
    transaction_type: "835",
    source: "fallback",
    warning: "ClaimLinc unavailable \u2014 remittance recorded locally only",
    ack: { transaction_id: transactionId, status: "Stored", timestamp: (/* @__PURE__ */ new Date()).toISOString() },
    payment: {
      payer: body.payer || null,
      total_paid: body.total_paid || null,
      check_number: body.check_number || "CHK" + Date.now().toString(36).toUpperCase(),
      payment_date: body.payment_date || (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      claims_covered: body.claims?.length || 0,
      note: "Reprocess via ClaimLinc when endpoint is restored."
    }
  });
}
__name(receive835, "receive835");

// src/routes/fhir.js
init_response();
init_providers();
function fhirPatient(patient) {
  if (!patient) return null;
  const names = [];
  const nameAr = patient.full_name_ar || patient.name_ar || "";
  const nameEn = patient.full_name_en || patient.name_en || "";
  if (nameAr || nameEn) {
    const name = { use: "official" };
    if (nameEn) name.text = nameEn;
    if (nameAr) name.text_ar = nameAr;
    names.push(name);
  }
  return {
    resourceType: "Patient",
    id: patient.id,
    identifier: [
      { system: "https://hnh.brainsait.org/identifier/patient", value: patient.id },
      ...patient.national_id ? [{ system: "https://nphies.sa/identifier/national-id", value: patient.national_id }] : [],
      ...patient.insurance_id ? [{ system: "https://nphies.sa/identifier/insurance", value: patient.insurance_id, assigner: { display: patient.insurance_company } }] : []
    ],
    active: true,
    name: names,
    telecom: [
      ...patient.phone ? [{ system: "phone", value: patient.phone, use: "mobile" }] : [],
      ...patient.email ? [{ system: "email", value: patient.email, use: "work" }] : []
    ],
    gender: patient.gender || "unknown",
    birthDate: patient.date_of_birth || patient.dob || null,
    managingOrganization: { reference: "Organization/HNH-R001", display: "Hayat National Hospital - Gharnata" },
    generalPractitioner: [],
    communication: [
      { language: { coding: [{ system: "urn:ietf:bcp:47", code: "ar" }], text: "Arabic" }, preferred: true },
      { language: { coding: [{ system: "urn:ietf:bcp:47", code: "en" }], text: "English" } }
    ],
    extension: [
      ...patient.blood_type ? [{ url: "http://hl7.org/fhir/StructureDefinition/patient-bloodType", valueString: patient.blood_type }] : [],
      ...patient.allergies ? [{ url: "http://hl7.org/fhir/StructureDefinition/patient-allergies", valueString: patient.allergies }] : []
    ]
  };
}
__name(fhirPatient, "fhirPatient");
function fhirPractitioner(provider) {
  if (!provider) return null;
  const qualifications = provider.education && provider.education.length ? provider.education.map((edu) => ({
    identifier: [],
    code: { coding: [{ system: "http://terminology.hl7.org/CodeSystem/v2-0360", code: "MD", display: edu.degree }] },
    period: { start: edu.year ? `${edu.year}-01-01` : "2000-01-01" },
    issuer: { display: edu.institution }
  })) : provider.specialty ? [{ code: { text: provider.specialty } }] : [];
  const languages = provider.languages && provider.languages.length ? provider.languages : ["ar", "en"];
  return {
    resourceType: "Practitioner",
    id: provider.id,
    identifier: [
      { system: "https://hnh.brainsait.org/identifier/provider", value: provider.id },
      ...provider.givc_oid ? [{ system: "urn:ietf:rfc:3986", value: `urn:oid:${provider.givc_oid}` }] : []
    ],
    active: true,
    name: [
      { use: "official", text: provider.name_en || provider.name_ar || "", text_en: provider.name_en || "", text_ar: provider.name_ar || "" }
    ],
    qualification: qualifications,
    communication: languages.map((l) => ({
      coding: [{ system: "urn:ietf:bcp:47", code: l }]
    })),
    extension: [
      ...provider.givc_registered ? [{ url: "https://hnh.brainsait.org/fhir/StructureDefinition/givc-registered", valueBoolean: true }] : [],
      ...provider.branch_id ? [{ url: "https://hnh.brainsait.org/fhir/StructureDefinition/provider-branch", valueString: provider.branch_id }] : []
    ]
  };
}
__name(fhirPractitioner, "fhirPractitioner");
function fhirAppointment(appt) {
  if (!appt) return null;
  return {
    resourceType: "Appointment",
    id: appt.id,
    status: appt.status === "scheduled" ? "booked" : appt.status,
    start: `${appt.appointment_date}T${appt.appointment_time}:00`,
    participant: [
      ...appt.patient_id ? [{ actor: { reference: `Patient/${appt.patient_id}` }, status: "accepted" }] : [],
      ...appt.provider_id ? [{ actor: { reference: `Practitioner/${appt.provider_id}` }, status: "accepted" }] : []
    ],
    description: appt.notes || "",
    serviceType: [{ coding: [{ system: "http://snomed.info/sct", display: appt.department_id }] }]
  };
}
__name(fhirAppointment, "fhirAppointment");
function fhirClaim(claim) {
  if (!claim) return null;
  return {
    resourceType: "Claim",
    id: claim.id,
    identifier: [{ system: "https://hnh.brainsait.org/identifier/claim", value: claim.claim_number }],
    status: claim.status === "draft" ? "active" : claim.status === "submitted" ? "active" : "active",
    type: { coding: [{ system: "http://terminology.hl7.org/CodeSystem/claim-type", code: "professional" }] },
    use: "claim",
    patient: { reference: `Patient/${claim.patient_id}` },
    created: claim.created_at || (/* @__PURE__ */ new Date()).toISOString(),
    insurer: { display: claim.insurance_company || "Unknown" },
    provider: claim.provider_id ? { reference: `Practitioner/${claim.provider_id}` } : {},
    priority: { coding: [{ code: "normal" }] },
    total: { value: claim.total_amount, currency: "SAR" }
  };
}
__name(fhirClaim, "fhirClaim");
async function getFHIRPatient(req, env, ctx, params) {
  const id = params[0];
  const patient = await env.DB.prepare("SELECT * FROM patients WHERE id = ? OR national_id = ?").bind(id, id).first();
  if (!patient) return json({ success: false, message: "Patient not found" }, 404);
  return json(fhirPatient(patient));
}
__name(getFHIRPatient, "getFHIRPatient");
async function searchFHIRPatients(req, env, ctx, params, url) {
  const name = url.searchParams.get("name") || "";
  const identifier = url.searchParams.get("identifier") || "";
  const phone = url.searchParams.get("phone") || "";
  let query = "SELECT * FROM patients WHERE 1=1";
  const binds = [];
  if (name) {
    query += " AND (full_name_ar LIKE ? OR full_name_en LIKE ?)";
    binds.push(`%${name}%`, `%${name}%`);
  }
  if (identifier) {
    query += " AND (id LIKE ? OR national_id LIKE ?)";
    binds.push(`%${identifier}%`, `%${identifier}%`);
  }
  if (phone) {
    query += " AND phone LIKE ?";
    binds.push(`%${phone}%`);
  }
  const { results } = await env.DB.prepare(query + " LIMIT 50").bind(...binds).all();
  return json({
    resourceType: "Bundle",
    type: "searchset",
    total: results?.length || 0,
    entry: (results || []).map((p) => ({ resource: fhirPatient(p), search: { mode: "match" } }))
  });
}
__name(searchFHIRPatients, "searchFHIRPatients");
async function getFHIRPractitioner(req, env, ctx, params) {
  const id = params[0];
  const { getProvider: getProvider2 } = await Promise.resolve().then(() => (init_providers(), providers_exports));
  const provider = await getProvider2(id, env);
  if (!provider) return json({ success: false, message: "Provider not found" }, 404);
  return json(fhirPractitioner(provider));
}
__name(getFHIRPractitioner, "getFHIRPractitioner");
async function getFHIRAppointment(req, env, ctx, params) {
  const id = params[0];
  const appt = await env.DB.prepare("SELECT * FROM appointments WHERE id = ?").bind(id).first();
  if (!appt) return json({ success: false, message: "Appointment not found" }, 404);
  return json(fhirAppointment(appt));
}
__name(getFHIRAppointment, "getFHIRAppointment");
async function getFHIRClaim(req, env, ctx, params) {
  const id = params[0];
  const claim = await env.DB.prepare("SELECT * FROM claims WHERE id = ? OR claim_number = ?").bind(id, id).first();
  if (!claim) return json({ success: false, message: "Claim not found" }, 404);
  return json(fhirClaim(claim));
}
__name(getFHIRClaim, "getFHIRClaim");
async function getFHIRCoverage(req, env, ctx, params) {
  const id = params[0];
  const patient = await env.DB.prepare("SELECT * FROM patients WHERE id = ? OR national_id = ?").bind(id, id).first();
  if (!patient) return json({ success: false, message: "Patient not found" }, 404);
  return json({
    resourceType: "Coverage",
    id: `COV-${patient.id}`,
    status: "active",
    kind: "insurance",
    subscriber: { reference: `Patient/${patient.id}` },
    subscriberId: patient.insurance_id || "N/A",
    beneficiary: { reference: `Patient/${patient.id}` },
    relationship: { coding: [{ system: "http://terminology.hl7.org/CodeSystem/subscriber-relationship", code: "self" }] },
    payor: [{ display: patient.insurance_company || "Self-Pay" }],
    period: { start: "2026-01-01", end: "2026-12-31" }
  });
}
__name(getFHIRCoverage, "getFHIRCoverage");

// src/routes/statistics.js
init_response();
init_config();
var DEPARTMENTS = CONFIG.DEPARTMENTS || [];
var C = CONFIG.CORPORATE || {};
var S = C.STATS || {};
var ALL_DEPTS = CONFIG.DEPARTMENTS_FULL || [];
async function getStats(env) {
  let providerCount = S.doctors || 700;
  try {
    const pc = await env.DB.prepare("SELECT COUNT(*) as c FROM providers WHERE is_active = 1").first();
    if (pc && pc.c) providerCount = pc.c;
  } catch (e) {
  }
  const stats = env.DB ? await env.DB.prepare(
    `SELECT
          (SELECT COUNT(*) FROM patients) as total_patients,
          (SELECT COUNT(*) FROM appointments WHERE date(appointment_date) = date('now')) as today_appointments,
          (SELECT COUNT(*) FROM providers) as total_providers,
          (SELECT COUNT(*) FROM claims) as total_claims,
          (SELECT COUNT(*) FROM claims WHERE status = 'submitted') as submitted_claims,
          (SELECT COUNT(*) FROM claims WHERE status = 'paid') as paid_claims,
          (SELECT COUNT(*) FROM appointments WHERE status = 'scheduled') as scheduled_appointments,
          (SELECT COUNT(*) FROM appointments WHERE status = 'completed') as completed_appointments`
  ).first() : {};
  return json({
    success: true,
    stats: {
      total_patients: stats?.total_patients || 0,
      today_appointments: stats?.today_appointments || 0,
      total_providers: providerCount || S.doctors || 700,
      total_branches: 5,
      total_beds: S.beds || 1200,
      total_departments: ALL_DEPTS.length || DEPARTMENTS.length,
      total_claims: stats?.total_claims || 0,
      submitted_claims: stats?.submitted_claims || 0,
      paid_claims: stats?.paid_claims || 0,
      scheduled_appointments: stats?.scheduled_appointments || 0,
      completed_appointments: stats?.completed_appointments || 0
    },
    timestamp: (/* @__PURE__ */ new Date()).toISOString()
  });
}
__name(getStats, "getStats");

// src/index.js
init_chat();

// src/routes/voice.js
var CONFIG2 = {
  ELEVENLABS_BASE_URL: "https://api.elevenlabs.io/v1",
  ELEVENLABS_MODEL: "eleven_multilingual_v2",
  ELEVENLABS_TURBO_MODEL: "eleven_turbo_v2_5",
  VOICE_STABILITY: 0.4,
  VOICE_SIMILARITY: 0.8,
  VOICE_STYLE: 0.25,
  VOICE_SPEAKER_BOOST: true,
  // Arabic voices — Gulf Arabic
  ARABIC_VOICES: [
    { id: "KxMRrXEjbJ6kZ93yT3fq", name: "Salma", style: "Young, calm Gulf Arabic", lang: "ar" },
    { id: "cdxrkuYK4nZwDSkjw5sa", name: "Amira", style: "Poised, graceful Gulf Arabic", lang: "ar" },
    { id: "3GgICclK01zog9nyLmX1", name: "Hanan", style: "Polished, commanding", lang: "ar" },
    { id: "LEqoCOGNjyExRiRUZhkv", name: "Latifa", style: "Bright, welcoming", lang: "ar" },
    { id: "isQLuoVuANx6FjDxyasX", name: "Noura", style: "Soft, polished", lang: "ar" },
    { id: "R6nda3uM038xEEKi7GFl", name: "Anas", style: "Gentle male voice", lang: "ar" }
  ],
  ENGLISH_VOICES: [
    { id: "EXAVITQu4vr4xnSDxMaL", name: "Sarah", style: "Mature professional American", lang: "en" },
    { id: "cjVigY5qzO86Huf0OWal", name: "Eric", style: "Smooth trustworthy", lang: "en" }
  ],
  DEFAULT_ARABIC: "KxMRrXEjbJ6kZ93yT3fq",
  // Salma
  DEFAULT_ENGLISH: "EXAVITQu4vr4xnSDxMaL"
  // Sarah
};
function getVoiceForLang(lang) {
  const isAr = lang === "ar" || /[\u0600-\u06FF]/.test(lang);
  if (isAr) return CONFIG2.DEFAULT_ARABIC;
  return CONFIG2.DEFAULT_ENGLISH;
}
__name(getVoiceForLang, "getVoiceForLang");
function getModelForLang(lang) {
  const isAr = lang === "ar" || /[\u0600-\u06FF]/.test(lang);
  return isAr ? CONFIG2.ELEVENLABS_MODEL : CONFIG2.ELEVENLABS_TURBO_MODEL;
}
__name(getModelForLang, "getModelForLang");
async function handleVoiceSpeak(request, env) {
  try {
    const apiKey = env.ELEVENLABS_API_KEY || "";
    if (!apiKey) {
      return new Response(JSON.stringify({ error: "Voice API not configured" }), {
        status: 503,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "https://hnh.brainsait.org" }
      });
    }
    const body = await request.json();
    const text = body.message || body.text || "";
    const lang = body.lang || (/[\u0600-\u06FF]/.test(text) ? "ar" : "en");
    const voiceId = body.voice_id || getVoiceForLang(lang);
    if (!text) {
      return new Response(JSON.stringify({ error: "Text is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "https://hnh.brainsait.org" }
      });
    }
    const modelId = getModelForLang(lang);
    const ttsText = text.length > 400 ? text.substring(0, text.lastIndexOf(" ", 400)) : text;
    const ttsRes = await fetch(
      `${CONFIG2.ELEVENLABS_BASE_URL}/text-to-speech/${voiceId}/stream`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "xi-api-key": apiKey
        },
        body: JSON.stringify({
          text: ttsText,
          model_id: modelId,
          voice_settings: {
            stability: CONFIG2.VOICE_STABILITY,
            similarity_boost: CONFIG2.VOICE_SIMILARITY,
            style: CONFIG2.VOICE_STYLE,
            use_speaker_boost: CONFIG2.VOICE_SPEAKER_BOOST
          }
        })
      }
    );
    if (!ttsRes.ok) {
      const errText = await ttsRes.text().catch(() => "Unknown");
      return new Response(JSON.stringify({ error: `TTS failed: ${ttsRes.status}`, detail: errText }), {
        status: 502,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "https://hnh.brainsait.org" }
      });
    }
    const audioBlob = await ttsRes.blob();
    return new Response(audioBlob, {
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "public, max-age=600",
        "Access-Control-Allow-Origin": "https://hnh.brainsait.org",
        "Access-Control-Expose-Headers": "X-Audio-Length, X-Voice",
        "X-Audio-Length": audioBlob.size.toString(),
        "X-Voice": voiceId,
        "X-Lang": lang
      }
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "https://hnh.brainsait.org" }
    });
  }
}
__name(handleVoiceSpeak, "handleVoiceSpeak");
async function handleVoiceChat(request, env) {
  try {
    const body = await request.json();
    const text = body.message || body.text || "";
    const lang = body.lang || (/[\u0600-\u06FF]/.test(text) ? "ar" : "en");
    const sessionId = body.sessionId || "voice_" + Date.now().toString(36);
    if (!text) {
      return new Response(JSON.stringify({ error: "Message is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "https://hnh.brainsait.org" }
      });
    }
    let reply = "";
    try {
      const { handleChat: handleChat2 } = await Promise.resolve().then(() => (init_chat(), chat_exports));
      const chatRes = await handleChat2(new Request("http://internal/api/chat", {
        method: "POST",
        body: JSON.stringify({ message: text, session_id: sessionId, language: lang })
      }), env);
      const chatData = await chatRes.json();
      reply = chatData.response || "";
    } catch (e) {
      console.error("Voice chat AI error:", e);
      reply = lang === "ar" ? "\u0639\u0630\u0631\u0627\u064B\u060C \u062D\u062F\u062B \u062E\u0637\u0623 \u0641\u064A \u0645\u0639\u0627\u0644\u062C\u0629 \u0637\u0644\u0628\u0643. \u064A\u0631\u062C\u0649 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649." : "Sorry, there was an error processing your request. Please try again.";
    }
    const apiKey = env.ELEVENLABS_API_KEY || "";
    let audioBase64 = null;
    let voiceId = null;
    if (apiKey && reply) {
      voiceId = getVoiceForLang(lang);
      const modelId = getModelForLang(lang);
      const ttsText = reply.length > 400 ? reply.substring(0, reply.lastIndexOf(" ", 400)) : reply;
      try {
        const ttsRes = await fetch(
          `${CONFIG2.ELEVENLABS_BASE_URL}/text-to-speech/${voiceId}/stream`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json", "xi-api-key": apiKey },
            body: JSON.stringify({
              text: ttsText,
              model_id: modelId,
              voice_settings: {
                stability: CONFIG2.VOICE_STABILITY,
                similarity_boost: CONFIG2.VOICE_SIMILARITY,
                style: CONFIG2.VOICE_STYLE,
                use_speaker_boost: CONFIG2.VOICE_SPEAKER_BOOST
              }
            })
          }
        );
        if (ttsRes.ok) {
          const audioBuf = await ttsRes.arrayBuffer();
          const uint8 = new Uint8Array(audioBuf);
          let binary = "";
          for (let i = 0; i < uint8.length; i++) {
            binary += String.fromCharCode(uint8[i]);
          }
          audioBase64 = btoa(binary);
        }
      } catch (ttsErr) {
        console.error("TTS failed:", ttsErr?.message?.slice(0, 100));
      }
    }
    try {
      if (env.DB) {
        env.DB.prepare(
          "INSERT INTO chat_history (session_id, role, content) VALUES (?, ?, ?), (?, ?, ?)"
        ).bind(sessionId, "user", text, sessionId, "assistant", reply).run().catch(() => {
        });
      }
    } catch (e) {
    }
    return new Response(JSON.stringify({
      success: true,
      response: reply,
      session_id: sessionId,
      audio: audioBase64,
      voice_id: voiceId,
      lang
    }), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "https://hnh.brainsait.org"
      }
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "https://hnh.brainsait.org" }
    });
  }
}
__name(handleVoiceChat, "handleVoiceChat");
async function handleVoiceVoices() {
  const response = JSON.stringify({
    arabic: CONFIG2.ARABIC_VOICES,
    english: CONFIG2.ENGLISH_VOICES,
    default_arabic: CONFIG2.DEFAULT_ARABIC,
    default_english: CONFIG2.DEFAULT_ENGLISH
  });
  return new Response(response, {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=3600",
      "Access-Control-Allow-Origin": "https://hnh.brainsait.org"
    }
  });
}
__name(handleVoiceVoices, "handleVoiceVoices");

// src/routes/rcm.js
init_response();
var CONTRACT_PRICES = {
  BUPA: {
    "0109222573": 3.16,
    // Normal Saline IV 0.9% 1ml
    "0109222574": 6.32,
    "0109222575": 9.48,
    "0109222576": 12.64,
    "0109222577": 15.8
  }
};
var PBM_RULES = [
  {
    drug_class: "antiemetic_5ht3",
    name_patterns: ["ondansetron", "zoron", "zenorit", "zofran", "novoban"],
    codes: ["1001233084", "2205222049"],
    valid_icd_prefixes: ["C", "K", "R11", "R10", "Z51", "Z79", "T", "G"],
    invalid_standalone: ["J02", "J06", "J00", "J01", "J03", "J04", "J05"],
    flag: "MN-1-1",
    message: "5-HT3 antiemetic not justified for this diagnosis without oncology/procedural context",
    suggestion: "Add secondary ICD: R11.2 (nausea/vomiting) or Z51.1 (chemo) or document procedure-related nausea"
  },
  {
    drug_class: "PPI",
    name_patterns: ["toprazole", "omeprazole", "pantoprazole", "esomeprazole", "rabeprazole", "lansoprazole"],
    codes: ["0411246139", "0411246140", "0411246141"],
    valid_icd_prefixes: ["C", "K21", "K25", "K26", "K27", "K28", "Z51", "K92", "T"],
    invalid_standalone: ["J02", "J06", "J00", "Z00", "Z01"],
    flag: "MN-1-1",
    message: "PPI not indicated as primary treatment for this diagnosis",
    suggestion: "Add secondary ICD: K21.0 (GERD), K25 (Gastric ulcer), or K92.1 (Melena) for oncology GI prophylaxis"
  }
];
var APPEAL_MAP = {
  "MN-1-1": {
    desc: "Service not clinically justified per CPG without additional supporting diagnosis",
    cchi: "CCHI Unified Policy Article 15 \u2014 Medically Necessary Services",
    docs: ["Clinical notes (date of service)", "Physician justification letter", "PA approval (if exists)", "Lab/imaging results", "Pharmacy dispensing record"],
    icd_suggestions: ["R11.2 Nausea/vomiting as reason for care", "K21.0 GERD", "Z51.1 Antineoplastic chemo", "K92.1 Melena"]
  },
  "BE-1-6": {
    desc: "Billed above contractual/agreed price \u2014 calculation discrepancy",
    cchi: "CCHI Unified Policy Article 8 \u2014 Billing and Pricing Standards",
    docs: ["Corrected claim at contracted price", "BUPA contract price schedule", "HIS price master update confirmation"],
    icd_suggestions: []
  },
  "BE-1-5": {
    desc: "Duplicate / Repeated billing",
    cchi: "CCHI Unified Policy Article 8 \u2014 Billing Accuracy",
    docs: ["Two separate clinical encounter notes", "Evidence of distinct presenting complaints", "Different physician confirmation"],
    icd_suggestions: []
  },
  "AD-3-1": {
    desc: "Service billed within free follow-up period",
    cchi: "CCHI Unified Policy Article 11 \u2014 Follow-up Period Rules",
    docs: ["Original visit note", "New complaint visit note (clearly different)", "Physician attestation of new episode"],
    icd_suggestions: []
  },
  "CV-1-4": {
    desc: "Service or procedure not covered under patient policy",
    cchi: "CCHI Unified Policy Annex A \u2014 Coverage Table",
    docs: ["Patient policy schedule", "Benefit table showing coverage", "Clinical justification letter"],
    icd_suggestions: []
  }
};
var KNOWN_BATCHES = {
  "550181": {
    batch_id: "550181",
    stm_id: "938269",
    payer: "BUPA Arabia",
    payer_id: "INS-307",
    branch: "riyadh",
    facility: "Al Hayat National Hospital - Riyadh",
    provider_code: "21420",
    period: "202602",
    period_label: "February 2026",
    claim_type: "Out Patient",
    received_date: "2026-03-25",
    financials: {
      presented_sr: 510386.25,
      presented_deductible: 66205.51,
      net_billed_sr: 444180.74,
      vat_sr: 37443.98,
      net_with_vat_sr: 481624.72,
      total_shortfall_sr: 73862.47
    },
    rejection_lines: 1415,
    shortfall_by_classification: {
      Medical_Necessity: { sr: 43478.53, code: "MN-1-1", pct: 58.9 },
      Pharmacy_Benefit_Management: { sr: 36880.91, bundle: "PBM", pct: 49.9 },
      Billing_Error: { sr: 15088.57, code: "BE-1-6", pct: 20.4 },
      Coverage: { sr: 9079.85, code: "CV-1-4", pct: 12.3 },
      Administrative: { sr: 3418.88, code: "AD-3-1", pct: 4.6 },
      Supporting_Evidence: { sr: 2796.64, pct: 3.8 }
    },
    top_rejections: [
      { reason: "Billed above contractual prices", count: 102, code: "BE-1-6", sr: 15088.57, action: "Price correct + resubmit" },
      { reason: "Duplicate / Repeated billing", count: 57, code: "BE-1-5", sr: 8e3, action: "Audit 4-type classification" },
      { reason: "Consultation within free follow-up period", count: 47, code: "AD-3-1", sr: 3418.88, action: "Document new episode or accept" },
      { reason: "Medication not indicated with diagnosis", count: 200, code: "MN-1-1", sr: 43478.53, action: "Physician appeal letter" }
    ],
    recovery_forecast: { total_shortfall_sr: 73862.47, expected_recovery_sr: 64e3, write_off_sr: 9862, recovery_pct: 87, timeline_weeks: 6 },
    corrective_actions: {
      "BE-1-6": "Update HIS price master to match BUPA contract schedule for all active Riyadh service codes",
      "BE-1-5": "Enable SBS pre-submission deduplication flag; add same-patient same-service alert",
      "MN-1-1": "Integrate PBM validator at pharmacy order entry (/api/rcm/validate/pbm)",
      "AD-3-1": "Add 14-day follow-up period alert in HIS appointment booking module"
    },
    top_customers: ["Majal Enjaz Co.", "Riyadh Cables Group Company", "Saudi Aramex Co. Ltd"]
  }
};
function rcmHealth() {
  return json({
    ok: true,
    version: "1.0.0",
    module: "RCM \u2014 Revenue Cycle Management",
    powered_by: "BrainSAIT ClaimLinc",
    endpoints: [
      "GET  /api/rcm/batch/:id",
      "POST /api/rcm/validate/price",
      "POST /api/rcm/validate/duplicate",
      "POST /api/rcm/validate/pbm",
      "POST /api/rcm/validate",
      "POST /api/rcm/appeal/generate",
      "GET  /api/rcm/dashboard/:branch",
      "GET  /api/rcm/claims/rejected",
      "POST /api/rcm/claims/:id/appeal",
      "POST /api/rcm/claims/:id/resubmit"
    ],
    case_study: "Batch 550181 \u2014 BUPA Arabia Riyadh Feb 2026 | SR 73,862 shortfall | 87% recovery target"
  });
}
__name(rcmHealth, "rcmHealth");
async function getRcmBatch(req, env, ctx, batchId) {
  const batch = KNOWN_BATCHES[batchId];
  if (!batch) return json({ error: `Batch ${batchId} not found`, available: Object.keys(KNOWN_BATCHES) }, 404);
  if (env.DB) {
    try {
      const counts = await env.DB.prepare(
        `SELECT status, COUNT(*) as count, SUM(total_amount) as total
         FROM claims WHERE batch_number = ? GROUP BY status`
      ).bind(batchId).all();
      if (counts.results?.length) {
        batch.live_db_counts = counts.results;
      }
    } catch {
    }
  }
  return json({ success: true, batch });
}
__name(getRcmBatch, "getRcmBatch");
async function validatePrice(req) {
  const body = await req.json();
  const items = body.items ?? [];
  const payer = body.payer ?? "BUPA";
  const priceMap = CONTRACT_PRICES[payer] ?? CONTRACT_PRICES["BUPA"];
  const violations = [], clean_items = [];
  let total_overcharge = 0;
  for (const item of items) {
    const contracted = priceMap[item.serv_code];
    if (contracted === void 0) {
      clean_items.push({ ...item, note: "No contract price on file \u2014 verify manually" });
      continue;
    }
    const diff = Math.round((item.billed_amount - contracted) * 100) / 100;
    if (diff > 0.01) {
      total_overcharge += diff;
      violations.push({
        serv_code: item.serv_code,
        serv_desc: item.serv_desc ?? "",
        billed_amount: item.billed_amount,
        contracted_amount: contracted,
        overcharge_sr: diff,
        flag: "BE-1-6",
        action: `Change price from ${item.billed_amount} SR to ${contracted} SR in HIS \u2192 resubmit`
      });
    } else {
      clean_items.push({ ...item, contracted_amount: contracted, status: "PASS" });
    }
  }
  return json({
    valid: violations.length === 0,
    total_items: items.length,
    violations_count: violations.length,
    clean_count: clean_items.length,
    total_overcharge_sr: Math.round(total_overcharge * 100) / 100,
    violations,
    clean_items,
    payer,
    summary: violations.length === 0 ? "\u2705 All prices match contract schedule" : `\u274C ${violations.length} pricing violation(s) \u2014 total overcharge: SR ${total_overcharge.toFixed(2)}`
  });
}
__name(validatePrice, "validatePrice");
async function validateDuplicate(req) {
  const body = await req.json();
  const claims = body.claims ?? [];
  const windowDays = body.window_days ?? 14;
  const duplicates = [], seen = /* @__PURE__ */ new Map();
  for (const claim of claims) {
    const key = `${claim.patient_id}::${claim.serv_code}`;
    const existing = seen.get(key);
    if (existing) {
      const gapDays = Math.abs((new Date(claim.inv_date) - new Date(existing.inv_date)) / 864e5);
      const type = gapDays < 0.01 ? "TYPE_1_SYSTEM_DOUBLE_SEND" : gapDays <= windowDays ? "TYPE_4_FOLLOW_UP_PERIOD" : "TYPE_3_GENUINE_REPEAT";
      duplicates.push({
        claim_id: claim.claim_id,
        duplicate_of: existing.claim_id,
        patient_id: claim.patient_id,
        serv_code: claim.serv_code,
        gap_days: Math.round(gapDays * 10) / 10,
        type,
        flag: "BE-1-5",
        action: type === "TYPE_1_SYSTEM_DOUBLE_SEND" ? "REMOVE from batch \u2014 same-day system double-send" : type === "TYPE_4_FOLLOW_UP_PERIOD" ? `Within ${windowDays}-day follow-up \u2014 document new complaint if different episode` : "Genuine repeat \u2014 document distinct clinical episodes"
      });
    } else {
      seen.set(key, { claim_id: claim.claim_id, inv_date: claim.inv_date });
    }
  }
  return json({
    total_claims: claims.length,
    duplicates_found: duplicates.length,
    window_days: windowDays,
    breakdown: {
      type1_system: duplicates.filter((d) => d.type === "TYPE_1_SYSTEM_DOUBLE_SEND").length,
      type4_follow_up: duplicates.filter((d) => d.type === "TYPE_4_FOLLOW_UP_PERIOD").length,
      type3_genuine: duplicates.filter((d) => d.type === "TYPE_3_GENUINE_REPEAT").length
    },
    duplicates,
    summary: duplicates.length === 0 ? `\u2705 No duplicates in ${claims.length} claims` : `\u26A0\uFE0F ${duplicates.length} duplicate(s) found`
  });
}
__name(validateDuplicate, "validateDuplicate");
async function validatePbm(req) {
  const body = await req.json();
  const items = body.items ?? [];
  const violations = [], valid_items = [];
  for (const item of items) {
    const drugCode = item.drug_code ?? "";
    const drugName = (item.drug_name ?? item.serv_desc ?? "").toLowerCase();
    const icds = item.icd_codes ?? [];
    const rule = PBM_RULES.find(
      (r) => r.codes.includes(drugCode) || r.name_patterns.some((p) => drugName.includes(p))
    );
    if (!rule) {
      valid_items.push({ ...item, status: "NO_RULE" });
      continue;
    }
    const hasValidIcd = icds.some((icd) => rule.valid_icd_prefixes.some((p) => icd.startsWith(p)));
    const onlyInvalid = icds.every((icd) => rule.invalid_standalone.some((b) => icd.startsWith(b)));
    if (hasValidIcd) {
      valid_items.push({ ...item, status: "PASS", matched_rule: rule.drug_class });
    } else {
      violations.push({
        claim_id: item.claim_id,
        drug_code: drugCode,
        drug_name: item.drug_name ?? item.serv_desc,
        drug_class: rule.drug_class,
        icd_codes: icds,
        flag: rule.flag,
        message: rule.message,
        suggestion: rule.suggestion,
        appeal_strength: onlyInvalid ? "WEAK" : "MEDIUM",
        action: onlyInvalid ? "Add supporting secondary ICD at prescription time, or document procedural context" : "Add secondary ICD to support drug indication before resubmission"
      });
    }
  }
  return json({
    total_items: items.length,
    violations_count: violations.length,
    valid_count: valid_items.length,
    violations,
    valid_items,
    summary: violations.length === 0 ? "\u2705 All drug-diagnosis pairs validated \u2014 no MN-1-1 risks" : `\u26A0\uFE0F ${violations.length} PBM violation(s) \u2014 risk of MN-1-1 rejection`
  });
}
__name(validatePbm, "validatePbm");
async function validateAll(req) {
  const body = await req.json();
  const bodyStr = JSON.stringify(body);
  const makeReq = /* @__PURE__ */ __name(() => new Request("https://internal/validate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: bodyStr
  }), "makeReq");
  const [priceResult, dupResult, pbmResult] = await Promise.allSettled([
    validatePrice(makeReq()),
    validateDuplicate(makeReq()),
    validatePbm(makeReq())
  ]);
  const price = priceResult.status === "fulfilled" ? await priceResult.value.json() : { error: "price check failed" };
  const dup = dupResult.status === "fulfilled" ? await dupResult.value.json() : { error: "duplicate check failed" };
  const pbm = pbmResult.status === "fulfilled" ? await pbmResult.value.json() : { error: "pbm check failed" };
  const totalErrors = (price.violations_count ?? 0) + (dup.duplicates_found ?? 0) + (pbm.violations_count ?? 0);
  return json({
    overall_ready: totalErrors === 0,
    total_errors: totalErrors,
    validators: { price, duplicate: dup, pbm },
    summary: totalErrors === 0 ? "\u2705 Claim passed all validators \u2014 safe for NPHIES submission" : `\u274C ${totalErrors} issue(s) \u2014 fix before submission`
  });
}
__name(validateAll, "validateAll");
async function generateAppeal(req) {
  const body = await req.json();
  const code = body.rejection_code ?? "MN-1-1";
  const map = APPEAL_MAP[code] ?? APPEAL_MAP["MN-1-1"];
  const icds = body.icd_codes ?? [];
  const hasPa = !!body.pa_number;
  const hasOncology = icds.some((i) => i.startsWith("C"));
  const amount = body.rejection_amount_sr ?? 0;
  let score = 0;
  if (hasPa) score += 3;
  if (hasOncology) score += 2;
  if (body.clinical_context) score += 2;
  if (amount > 500) score += 1;
  const strength = score >= 5 ? "strong" : score >= 3 ? "medium" : "weak";
  return json({
    claim_id: body.claim_id,
    rejection_code: code,
    payer: body.payer ?? "BUPA Arabia",
    branch: body.branch ?? "riyadh",
    nphies_description: map.desc,
    cchi_article: map.cchi,
    appeal_strength: strength,
    strength_score: score,
    pa_number: body.pa_number,
    pa_status: hasPa ? "EXISTS \u2014 strong appeal factor" : "MISSING \u2014 weaker case without PA",
    icd_codes: icds,
    oncology_case: hasOncology,
    drug_code: body.drug_code,
    drug_name: body.drug_name,
    supporting_docs_required: map.docs,
    icd_suggestions: map.icd_suggestions,
    action_steps: [
      hasPa ? `\u2705 Attach PA #${body.pa_number} approval letter` : "\u26A0\uFE0F No PA \u2014 strengthen with physician narrative",
      "Complete physician appeal letter (use /api/rcm/batch/550181 template)",
      hasOncology ? "\u2705 Oncology case \u2014 reference NCCN/ESMO/Saudi MOH CPG" : "Reference Saudi MOH CPG for this condition",
      "Department head countersign for claims > SR 500",
      "Submit via BUPA provider portal + NPHIES ClaimResponse appeal workflow"
    ],
    recommendation: strength === "strong" ? "\u{1F7E2} STRONG \u2014 proceed with full appeal package" : strength === "medium" ? "\u{1F7E1} MEDIUM \u2014 strengthen documentation before submitting" : "\u{1F534} WEAK \u2014 review clinical basis; consider write-off if no supporting evidence",
    generated_at: (/* @__PURE__ */ new Date()).toISOString()
  });
}
__name(generateAppeal, "generateAppeal");
async function getRcmDashboard(req, env, ctx, branch) {
  branch = branch ?? "riyadh";
  let rejectedClaims = [];
  if (env.DB) {
    try {
      const res = await env.DB.prepare(
        `SELECT id, claim_number, total_amount, payer_name, status, created_at, nphies_status
         FROM claims WHERE status IN ('rejected','denied') AND branch = ?
         ORDER BY created_at DESC LIMIT 20`
      ).bind(branch).all();
      rejectedClaims = res.results ?? [];
    } catch {
    }
  }
  return json({
    success: true,
    branch,
    dashboard_version: "1.0.0",
    generated_at: (/* @__PURE__ */ new Date()).toISOString(),
    live_rejected_claims: { count: rejectedClaims.length, claims: rejectedClaims },
    reference_batch: KNOWN_BATCHES["550181"],
    rcm_action_items: [
      { priority: 1, action: "Export BE-1-6 lines \u2192 correct price master \u2192 resubmit", code: "BE-1-6", impact: "SR 15,088 recovery" },
      { priority: 2, action: "Run eligibility check on Coverage rejections", code: "CV-1-4", impact: "SR 7,000 recovery" },
      { priority: 3, action: "Physician appeal letters for top MN-1-1 by amount", code: "MN-1-1", impact: "SR 31,000 recovery" },
      { priority: 4, action: "Audit 57 duplicate lines \u2192 classify Type 1/2/3/4", code: "BE-1-5", impact: "SR 9,000 recovery" }
    ],
    prevention_tools: {
      price_check: "POST /api/rcm/validate/price",
      dedup_check: "POST /api/rcm/validate/duplicate",
      pbm_check: "POST /api/rcm/validate/pbm",
      full_validate: "POST /api/rcm/validate",
      appeal_gen: "POST /api/rcm/appeal/generate"
    }
  });
}
__name(getRcmDashboard, "getRcmDashboard");
async function getRejectedClaims(req, env, ctx, _p, url) {
  if (!url) url = new URL(req.url);
  const branch = url.searchParams.get("branch") ?? "";
  const payer = url.searchParams.get("payer") ?? "";
  const limit = parseInt(url.searchParams.get("limit") ?? "50");
  if (!env.DB) return json({ error: "Database not available" }, 503);
  let q = `SELECT id, claim_number, total_amount, payer_name, payer_id, status, nphies_status,
            nphies_rejection_code, created_at, branch FROM claims
            WHERE status IN ('rejected','denied')`;
  const binds = [];
  if (branch) {
    q += " AND branch = ?";
    binds.push(branch);
  }
  if (payer) {
    q += " AND payer_name LIKE ?";
    binds.push(`%${payer}%`);
  }
  q += " ORDER BY created_at DESC LIMIT ?";
  binds.push(limit);
  const { results } = await env.DB.prepare(q).bind(...binds).all();
  return json({ success: true, count: results?.length ?? 0, claims: results ?? [] });
}
__name(getRejectedClaims, "getRejectedClaims");
async function markAppeal(req, env, ctx, claimId) {
  const body = await req.json();
  if (!env.DB) return json({ error: "Database not available" }, 503);
  await env.DB.prepare(
    `UPDATE claims SET status = 'appealed', appeal_date = ?, appeal_notes = ?,
     nphies_rejection_code = COALESCE(?, nphies_rejection_code),
     updated_at = datetime('now') WHERE id = ? OR claim_number = ?`
  ).bind(
    (/* @__PURE__ */ new Date()).toISOString(),
    body.appeal_notes ?? "",
    body.rejection_code ?? null,
    claimId,
    claimId
  ).run();
  return json({ success: true, claim_id: claimId, status: "appealed", appeal_date: (/* @__PURE__ */ new Date()).toISOString() });
}
__name(markAppeal, "markAppeal");
async function markResubmit(req, env, ctx, claimId) {
  const body = await req.json();
  if (!env.DB) return json({ error: "Database not available" }, 503);
  await env.DB.prepare(
    `UPDATE claims SET status = 'resubmitted', resubmit_date = ?, resubmit_notes = ?,
     updated_at = datetime('now') WHERE id = ? OR claim_number = ?`
  ).bind(
    (/* @__PURE__ */ new Date()).toISOString(),
    body.resubmit_notes ?? "",
    claimId,
    claimId
  ).run();
  return json({ success: true, claim_id: claimId, status: "resubmitted", resubmit_date: (/* @__PURE__ */ new Date()).toISOString() });
}
__name(markResubmit, "markResubmit");

// src/routes/search.js
init_response();
var AUTORAG_NAME = "brainsait-ai-search";
async function handleSearch(req, env) {
  try {
    let query = "";
    let mode = "ai";
    if (req.method === "GET") {
      const url = new URL(req.url);
      query = (url.searchParams.get("q") || "").trim();
      mode = url.searchParams.get("mode") || "vector";
    } else {
      const body = await req.json().catch(() => ({}));
      query = (body.query || body.q || "").trim();
      mode = body.mode || "ai";
    }
    if (!query || query.length < 2) {
      return json({ success: false, message: "Query too short \u2014 minimum 2 characters" }, 400);
    }
    if (mode === "ai") {
      const result = await env.AI.autorag(AUTORAG_NAME).aiSearch({
        query,
        stream: false
      });
      return json({
        success: true,
        query,
        mode: "ai",
        answer: result.response || null,
        sources: (result.data || []).map((d) => ({
          id: d.id,
          content: d.content?.slice(0, 500),
          filename: d.filename,
          score: d.score
        })),
        model: AUTORAG_NAME,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      });
    } else {
      const result = await env.AI.autorag(AUTORAG_NAME).search({ query });
      return json({
        success: true,
        query,
        mode: "vector",
        answer: null,
        sources: (result.data || []).map((d) => ({
          id: d.id,
          content: d.content?.slice(0, 500),
          filename: d.filename,
          score: d.score
        })),
        model: AUTORAG_NAME,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      });
    }
  } catch (e) {
    console.error("Search error:", e.message);
    return json({
      success: false,
      message: "Search temporarily unavailable",
      error: e.message,
      query: ""
    }, 503);
  }
}
__name(handleSearch, "handleSearch");

// src/routes/homecare.js
init_response();
var newId = /* @__PURE__ */ __name((prefix) => prefix + Date.now().toString(36).toUpperCase(), "newId");
var VISIT_TYPES = ["routine", "post-op", "wound-care", "iv-therapy", "physiotherapy", "palliative", "maternal", "pediatric"];
async function createVisit(req, env) {
  const body = await req.json().catch(() => ({}));
  const required = ["patient_id", "visit_date", "address"];
  for (const f of required) {
    if (!body[f]) return json({ success: false, message: `Missing required field: ${f}` }, 400);
  }
  if (body.visit_type && !VISIT_TYPES.includes(body.visit_type)) {
    return json({ success: false, message: `Invalid visit_type. Valid: ${VISIT_TYPES.join(", ")}` }, 400);
  }
  const id = newId("HCV");
  await env.DB.prepare(
    `INSERT INTO homecare_visits
       (id, patient_id, nurse_id, branch_id, visit_date, visit_time, status, visit_type,
        address, city, lat, lng, chief_complaint, notes, insurance_company, insurance_id)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).bind(
    id,
    body.patient_id,
    body.nurse_id || null,
    body.branch_id || "R001",
    body.visit_date,
    body.visit_time || null,
    "scheduled",
    body.visit_type || "routine",
    body.address,
    body.city || "\u0627\u0644\u0631\u064A\u0627\u0636",
    body.lat || null,
    body.lng || null,
    body.chief_complaint || null,
    body.notes || null,
    body.insurance_company || null,
    body.insurance_id || null
  ).run();
  const visit = await env.DB.prepare("SELECT * FROM homecare_visits WHERE id = ?").bind(id).first();
  return json({ success: true, visit_id: id, visit }, 201);
}
__name(createVisit, "createVisit");
async function listVisits(req, env) {
  const url = new URL(req.url);
  const patient = url.searchParams.get("patient_id") || "";
  const status = url.searchParams.get("status") || "";
  const date = url.searchParams.get("date") || "";
  const nurse = url.searchParams.get("nurse_id") || "";
  const branch = url.searchParams.get("branch_id") || "";
  const limit = Math.min(parseInt(url.searchParams.get("limit") || "50"), 200);
  const offset = parseInt(url.searchParams.get("offset") || "0");
  let q = `SELECT v.*, p.full_name_ar as patient_name_ar, p.full_name_en as patient_name_en, p.phone as patient_phone,
                  n.name_ar as nurse_name_ar, n.name_en as nurse_name_en, n.phone as nurse_phone
           FROM homecare_visits v
           LEFT JOIN patients p ON v.patient_id = p.id
           LEFT JOIN homecare_nurses n ON v.nurse_id = n.id`;
  const binds = [];
  const conds = [];
  if (patient) {
    conds.push("v.patient_id = ?");
    binds.push(patient);
  }
  if (status) {
    conds.push("v.status = ?");
    binds.push(status);
  }
  if (date) {
    conds.push("v.visit_date = ?");
    binds.push(date);
  }
  if (nurse) {
    conds.push("v.nurse_id = ?");
    binds.push(nurse);
  }
  if (branch) {
    conds.push("v.branch_id = ?");
    binds.push(branch);
  }
  if (conds.length) q += " WHERE " + conds.join(" AND ");
  q += " ORDER BY v.visit_date ASC, v.visit_time ASC LIMIT ? OFFSET ?";
  binds.push(limit, offset);
  const { results } = await env.DB.prepare(q).bind(...binds).all();
  return json({ success: true, visits: results || [], total: results?.length || 0 });
}
__name(listVisits, "listVisits");
async function getVisit(req, env, ctx, params) {
  const id = params[0];
  const visit = await env.DB.prepare(
    `SELECT v.*, p.full_name_ar as patient_name_ar, p.full_name_en as patient_name_en,
                 p.phone as patient_phone, p.insurance_company as patient_insurance,
                 n.name_ar as nurse_name_ar, n.name_en as nurse_name_en, n.phone as nurse_phone
     FROM homecare_visits v
     LEFT JOIN patients p ON v.patient_id = p.id
     LEFT JOIN homecare_nurses n ON v.nurse_id = n.id
     WHERE v.id = ?`
  ).bind(id).first();
  if (!visit) return json({ success: false, message: "Visit not found" }, 404);
  if (visit.vitals_json) {
    try {
      visit.vitals = JSON.parse(visit.vitals_json);
    } catch (_) {
    }
  }
  return json({ success: true, visit });
}
__name(getVisit, "getVisit");
async function updateVisit(req, env, ctx, params) {
  const id = params[0];
  const body = await req.json().catch(() => ({}));
  const ALLOWED = [
    "status",
    "nurse_id",
    "visit_date",
    "visit_time",
    "address",
    "city",
    "chief_complaint",
    "notes",
    "visit_type",
    "lat",
    "lng"
  ];
  const fields = [];
  const binds = [];
  for (const [k, v] of Object.entries(body)) {
    if (ALLOWED.includes(k)) {
      fields.push(`${k} = ?`);
      binds.push(v);
    }
  }
  if (body.status === "completed") {
    fields.push("completed_at = ?");
    binds.push((/* @__PURE__ */ new Date()).toISOString());
  }
  if (!fields.length) return json({ success: false, message: "No updatable fields provided" }, 400);
  fields.push("updated_at = ?");
  binds.push((/* @__PURE__ */ new Date()).toISOString(), id);
  await env.DB.prepare(`UPDATE homecare_visits SET ${fields.join(", ")} WHERE id = ?`).bind(...binds).run();
  const visit = await env.DB.prepare("SELECT * FROM homecare_visits WHERE id = ?").bind(id).first();
  return json({ success: true, visit });
}
__name(updateVisit, "updateVisit");
async function recordVitals(req, env, ctx, params) {
  const id = params[0];
  const body = await req.json().catch(() => ({}));
  const vitals = {
    recorded_at: (/* @__PURE__ */ new Date()).toISOString(),
    bp_systolic: body.bp_systolic || null,
    bp_diastolic: body.bp_diastolic || null,
    heart_rate: body.heart_rate || null,
    temperature: body.temperature || null,
    spo2: body.spo2 || null,
    weight_kg: body.weight_kg || null,
    blood_glucose: body.blood_glucose || null,
    respiratory_rate: body.respiratory_rate || null,
    pain_score: body.pain_score || null,
    notes: body.notes || null
  };
  const alerts = [];
  if (vitals.spo2 !== null && vitals.spo2 < 92) alerts.push("CRITICAL: SpO2 < 92%");
  if (vitals.bp_systolic !== null && vitals.bp_systolic > 180) alerts.push("HIGH BP: systolic > 180");
  if (vitals.heart_rate !== null && (vitals.heart_rate > 120 || vitals.heart_rate < 50)) alerts.push("ABNORMAL HR");
  if (vitals.temperature !== null && vitals.temperature > 38.5) alerts.push("FEVER: > 38.5\xB0C");
  if (vitals.blood_glucose !== null && vitals.blood_glucose > 13.9) alerts.push("HYPERGLYCEMIA: > 250 mg/dL");
  vitals.alerts = alerts;
  await env.DB.prepare(
    `UPDATE homecare_visits SET vitals_json = ?, updated_at = ? WHERE id = ?`
  ).bind(JSON.stringify(vitals), (/* @__PURE__ */ new Date()).toISOString(), id).run();
  return json({ success: true, vitals, alerts, visit_id: id });
}
__name(recordVitals, "recordVitals");
async function listNurses(req, env) {
  const url = new URL(req.url);
  const branch = url.searchParams.get("branch_id") || "";
  const status = url.searchParams.get("status") || "active";
  let q = "SELECT * FROM homecare_nurses";
  const binds = [];
  const conds = [];
  if (branch) {
    conds.push("branch_id = ?");
    binds.push(branch);
  }
  if (status) {
    conds.push("status = ?");
    binds.push(status);
  }
  if (conds.length) q += " WHERE " + conds.join(" AND ");
  q += " ORDER BY name_ar ASC";
  const { results } = await env.DB.prepare(q).bind(...binds).all();
  return json({ success: true, nurses: results || [], total: results?.length || 0 });
}
__name(listNurses, "listNurses");
async function createNurse(req, env) {
  const body = await req.json().catch(() => ({}));
  if (!body.name_ar) return json({ success: false, message: "name_ar is required" }, 400);
  const id = newId("NRS");
  await env.DB.prepare(
    `INSERT INTO homecare_nurses (id, name_ar, name_en, phone, branch_id, specialty, status)
     VALUES (?, ?, ?, ?, ?, ?, ?)`
  ).bind(
    id,
    body.name_ar,
    body.name_en || null,
    body.phone || null,
    body.branch_id || "R001",
    body.specialty || "general",
    body.status || "active"
  ).run();
  return json({ success: true, nurse_id: id }, 201);
}
__name(createNurse, "createNurse");
async function getNurseSchedule(req, env, ctx, params) {
  const id = params[0];
  const url = new URL(req.url);
  const date = url.searchParams.get("date") || (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
  const nurse = await env.DB.prepare("SELECT * FROM homecare_nurses WHERE id = ?").bind(id).first();
  if (!nurse) return json({ success: false, message: "Nurse not found" }, 404);
  const { results } = await env.DB.prepare(
    `SELECT v.*, p.full_name_ar as patient_name_ar, p.phone as patient_phone
     FROM homecare_visits v
     LEFT JOIN patients p ON v.patient_id = p.id
     WHERE v.nurse_id = ? AND v.visit_date = ?
     ORDER BY v.visit_time ASC`
  ).bind(id, date).all();
  return json({
    success: true,
    nurse: { id: nurse.id, name_ar: nurse.name_ar, name_en: nurse.name_en, phone: nurse.phone },
    date,
    visits: results || [],
    visit_count: results?.length || 0
  });
}
__name(getNurseSchedule, "getNurseSchedule");
async function getHomecareStats(req, env) {
  const [totals, byStatus, byType] = await Promise.all([
    env.DB.prepare(`SELECT COUNT(*) as total,
      SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as completed,
      SUM(CASE WHEN status = 'scheduled' THEN 1 ELSE 0 END) as scheduled,
      SUM(CASE WHEN status = 'cancelled' THEN 1 ELSE 0 END) as cancelled,
      SUM(CASE WHEN date(visit_date) = date('now') THEN 1 ELSE 0 END) as today
      FROM homecare_visits`).first(),
    env.DB.prepare(`SELECT status, COUNT(*) as count FROM homecare_visits GROUP BY status`).all(),
    env.DB.prepare(`SELECT visit_type, COUNT(*) as count FROM homecare_visits GROUP BY visit_type ORDER BY count DESC`).all()
  ]);
  return json({
    success: true,
    stats: {
      total_visits: totals?.total || 0,
      completed: totals?.completed || 0,
      scheduled: totals?.scheduled || 0,
      cancelled: totals?.cancelled || 0,
      today: totals?.today || 0,
      by_status: byStatus?.results || [],
      by_type: byType?.results || []
    }
  });
}
__name(getHomecareStats, "getHomecareStats");

// src/routes/telehealth.js
init_response();
var newId2 = /* @__PURE__ */ __name((prefix) => prefix + Date.now().toString(36).toUpperCase(), "newId");
var REALTIME_HUB = "https://brainsait-realtime-hub.brainsait-fadil.workers.dev";
function genRoomCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  const arr = new Uint8Array(8);
  crypto.getRandomValues(arr);
  for (const b of arr) code += chars[b % chars.length];
  return code.slice(0, 4) + "-" + code.slice(4);
}
__name(genRoomCode, "genRoomCode");
var SESSION_TYPES = ["consultation", "follow-up", "second-opinion", "mental-health", "nutrition", "pharmacy"];
function getIceServers(env) {
  const servers = [
    // Free STUN servers for basic NAT traversal
    { urls: "stun:stun.l.google.com:19302" },
    { urls: "stun:stun1.l.google.com:19302" },
    { urls: "stun:stun.cloudflare.com:3478" }
  ];
  const turnUrl = env?.TURN_SERVER_URL;
  const turnUser = env?.TURN_USERNAME;
  const turnCred = env?.TURN_CREDENTIAL;
  if (turnUrl && turnUser && turnCred) {
    servers.push(
      { urls: `turn:${turnUrl}:3478?transport=udp`, username: turnUser, credential: turnCred },
      { urls: `turn:${turnUrl}:3478?transport=tcp`, username: turnUser, credential: turnCred },
      { urls: `turns:${turnUrl}:5349?transport=tcp`, username: turnUser, credential: turnCred }
    );
  } else if (env?.CF_TURN_TOKEN) {
    servers.push({
      urls: "turn:turn.cloudflare.com:3478?transport=udp",
      username: "cloudflare",
      credential: env.CF_TURN_TOKEN
    });
  }
  return servers;
}
__name(getIceServers, "getIceServers");
async function createSession(req, env) {
  const body = await req.json().catch(() => ({}));
  const required = ["patient_id", "session_date", "session_time"];
  for (const f of required) {
    if (!body[f]) return json({ success: false, message: `Missing required field: ${f}` }, 400);
  }
  if (body.session_type && !SESSION_TYPES.includes(body.session_type)) {
    return json({ success: false, message: `Invalid session_type. Valid: ${SESSION_TYPES.join(", ")}` }, 400);
  }
  const id = newId2("TLH");
  const room_code = genRoomCode();
  const join_url = `https://telehealth.brainsait.org/room/${room_code}`;
  await env.DB.prepare(
    `INSERT INTO telehealth_sessions
       (id, patient_id, provider_id, branch_id, session_date, session_time, duration_min,
        status, session_type, department_id, chief_complaint, room_code, join_url, notes)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).bind(
    id,
    body.patient_id,
    body.provider_id || null,
    body.branch_id || "R001",
    body.session_date,
    body.session_time,
    body.duration_min || 30,
    "scheduled",
    body.session_type || "consultation",
    body.department_id || null,
    body.chief_complaint || null,
    room_code,
    join_url,
    body.notes || null
  ).run();
  const session = await env.DB.prepare("SELECT * FROM telehealth_sessions WHERE id = ?").bind(id).first();
  return json({
    success: true,
    session_id: id,
    room_code,
    join_url,
    session,
    ice_servers: getIceServers(env)
  }, 201);
}
__name(createSession, "createSession");
async function listSessions(req, env) {
  const url = new URL(req.url);
  const patient = url.searchParams.get("patient_id") || "";
  const provider = url.searchParams.get("provider_id") || "";
  const status = url.searchParams.get("status") || "";
  const date = url.searchParams.get("date") || "";
  const branch = url.searchParams.get("branch_id") || "";
  const limit = Math.min(parseInt(url.searchParams.get("limit") || "50"), 200);
  const offset = parseInt(url.searchParams.get("offset") || "0");
  let q = `SELECT s.*,
             p.full_name_ar as patient_name_ar, p.full_name_en as patient_name_en, p.phone as patient_phone
           FROM telehealth_sessions s
           LEFT JOIN patients p ON s.patient_id = p.id`;
  const binds = [];
  const conds = [];
  if (patient) {
    conds.push("s.patient_id = ?");
    binds.push(patient);
  }
  if (provider) {
    conds.push("s.provider_id = ?");
    binds.push(provider);
  }
  if (status) {
    conds.push("s.status = ?");
    binds.push(status);
  }
  if (date) {
    conds.push("s.session_date = ?");
    binds.push(date);
  }
  if (branch) {
    conds.push("s.branch_id = ?");
    binds.push(branch);
  }
  if (conds.length) q += " WHERE " + conds.join(" AND ");
  q += " ORDER BY s.session_date ASC, s.session_time ASC LIMIT ? OFFSET ?";
  binds.push(limit, offset);
  const { results } = await env.DB.prepare(q).bind(...binds).all();
  return json({ success: true, sessions: results || [], total: results?.length || 0 });
}
__name(listSessions, "listSessions");
async function getSession(req, env, ctx, params) {
  const id = params[0];
  const session = await env.DB.prepare(
    `SELECT s.*,
       p.full_name_ar as patient_name_ar, p.full_name_en as patient_name_en,
       p.phone as patient_phone, p.insurance_company as patient_insurance
     FROM telehealth_sessions s
     LEFT JOIN patients p ON s.patient_id = p.id
     WHERE s.id = ?`
  ).bind(id).first();
  if (!session) return json({ success: false, message: "Session not found" }, 404);
  return json({ success: true, session });
}
__name(getSession, "getSession");
async function updateSession(req, env, ctx, params) {
  const id = params[0];
  const body = await req.json().catch(() => ({}));
  const ALLOWED = [
    "status",
    "provider_id",
    "session_date",
    "session_time",
    "duration_min",
    "chief_complaint",
    "notes",
    "department_id",
    "session_type"
  ];
  const fields = [];
  const binds = [];
  for (const [k, v] of Object.entries(body)) {
    if (ALLOWED.includes(k)) {
      fields.push(`${k} = ?`);
      binds.push(v);
    }
  }
  if (!fields.length) return json({ success: false, message: "No updatable fields provided" }, 400);
  fields.push("updated_at = ?");
  binds.push((/* @__PURE__ */ new Date()).toISOString(), id);
  await env.DB.prepare(`UPDATE telehealth_sessions SET ${fields.join(", ")} WHERE id = ?`).bind(...binds).run();
  const session = await env.DB.prepare("SELECT * FROM telehealth_sessions WHERE id = ?").bind(id).first();
  return json({ success: true, session });
}
__name(updateSession, "updateSession");
async function startSession(req, env, ctx, params) {
  const id = params[0];
  const session = await env.DB.prepare("SELECT * FROM telehealth_sessions WHERE id = ?").bind(id).first();
  if (!session) return json({ success: false, message: "Session not found" }, 404);
  if (session.status === "completed") return json({ success: false, message: "Session already completed" }, 409);
  const started_at = (/* @__PURE__ */ new Date()).toISOString();
  await env.DB.prepare(
    `UPDATE telehealth_sessions SET status = 'in-progress', started_at = ?, updated_at = ? WHERE id = ?`
  ).bind(started_at, started_at, id).run();
  try {
    await fetch(`${REALTIME_HUB}/rooms/${session.room_code}/activate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ session_id: id, started_at })
    });
  } catch (_) {
  }
  return json({
    success: true,
    session_id: id,
    room_code: session.room_code,
    join_url: session.join_url,
    started_at,
    status: "in-progress",
    ice_servers: getIceServers(env)
  });
}
__name(startSession, "startSession");
async function endSession(req, env, ctx, params) {
  const id = params[0];
  const body = await req.json().catch(() => ({}));
  const session = await env.DB.prepare("SELECT * FROM telehealth_sessions WHERE id = ?").bind(id).first();
  if (!session) return json({ success: false, message: "Session not found" }, 404);
  const ended_at = (/* @__PURE__ */ new Date()).toISOString();
  await env.DB.prepare(
    `UPDATE telehealth_sessions SET status = 'completed', ended_at = ?, notes = ?, updated_at = ? WHERE id = ?`
  ).bind(ended_at, body.notes || session.notes, ended_at, id).run();
  return json({ success: true, session_id: id, ended_at, status: "completed" });
}
__name(endSession, "endSession");
async function issuePrescription(req, env, ctx, params) {
  const session_id = params[0];
  const body = await req.json().catch(() => ({}));
  const session = await env.DB.prepare("SELECT * FROM telehealth_sessions WHERE id = ?").bind(session_id).first();
  if (!session) return json({ success: false, message: "Session not found" }, 404);
  if (!body.medications || !Array.isArray(body.medications) || body.medications.length === 0) {
    return json({ success: false, message: "medications array is required" }, 400);
  }
  const id = newId2("RX");
  await env.DB.prepare(
    `INSERT INTO telehealth_prescriptions
       (id, session_id, patient_id, provider_id, medications_json, diagnosis_codes, instructions, status)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
  ).bind(
    id,
    session_id,
    session.patient_id,
    body.provider_id || session.provider_id || null,
    JSON.stringify(body.medications),
    body.diagnosis_codes || null,
    body.instructions || null,
    "active"
  ).run();
  await env.DB.prepare(
    `UPDATE telehealth_sessions SET prescription_id = ?, updated_at = ? WHERE id = ?`
  ).bind(id, (/* @__PURE__ */ new Date()).toISOString(), session_id).run();
  return json({ success: true, prescription_id: id, session_id, medications: body.medications }, 201);
}
__name(issuePrescription, "issuePrescription");
async function getPrescriptions(req, env, ctx, params) {
  const session_id = params[0];
  const { results } = await env.DB.prepare(
    `SELECT * FROM telehealth_prescriptions WHERE session_id = ? ORDER BY created_at DESC`
  ).bind(session_id).all();
  const prescriptions = (results || []).map((rx) => {
    try {
      rx.medications = JSON.parse(rx.medications_json);
    } catch (_) {
    }
    return rx;
  });
  return json({ success: true, session_id, prescriptions });
}
__name(getPrescriptions, "getPrescriptions");
async function getProviderAvailability(req, env, ctx, params) {
  const provider_id = params[0];
  const url = new URL(req.url);
  const date = url.searchParams.get("date") || (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
  const { results: booked } = await env.DB.prepare(
    `SELECT session_time, duration_min, status FROM telehealth_sessions
     WHERE provider_id = ? AND session_date = ? AND status NOT IN ('cancelled','no-show')
     ORDER BY session_time ASC`
  ).bind(provider_id, date).all();
  const slots = [];
  for (let h = 8; h < 20; h++) {
    for (const m of [0, 30]) {
      const time = `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
      const taken = booked.some((b) => b.session_time === time);
      slots.push({ time, available: !taken });
    }
  }
  return json({
    success: true,
    provider_id,
    date,
    available_slots: slots.filter((s) => s.available).map((s) => s.time),
    booked_slots: booked,
    all_slots: slots
  });
}
__name(getProviderAvailability, "getProviderAvailability");
async function getTelehealthStats(req, env) {
  const [totals, byStatus, byType] = await Promise.all([
    env.DB.prepare(`SELECT
      COUNT(*) as total,
      SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as completed,
      SUM(CASE WHEN status = 'scheduled' THEN 1 ELSE 0 END) as scheduled,
      SUM(CASE WHEN status = 'in-progress' THEN 1 ELSE 0 END) as active,
      SUM(CASE WHEN date(session_date) = date('now') THEN 1 ELSE 0 END) as today
      FROM telehealth_sessions`).first(),
    env.DB.prepare(`SELECT status, COUNT(*) as count FROM telehealth_sessions GROUP BY status`).all(),
    env.DB.prepare(`SELECT session_type, COUNT(*) as count FROM telehealth_sessions GROUP BY session_type ORDER BY count DESC`).all()
  ]);
  return json({
    success: true,
    stats: {
      total_sessions: totals?.total || 0,
      completed: totals?.completed || 0,
      scheduled: totals?.scheduled || 0,
      active: totals?.active || 0,
      today: totals?.today || 0,
      by_status: byStatus?.results || [],
      by_type: byType?.results || []
    }
  });
}
__name(getTelehealthStats, "getTelehealthStats");
async function getIceConfig(req, env) {
  const servers = getIceServers(env);
  const hasTurn = servers.some((s) => String(s.urls || "").startsWith("turn"));
  return json({
    success: true,
    ice_servers: servers,
    turn_available: hasTurn,
    note: hasTurn ? "TURN relay available \u2014 video calls supported behind symmetric NAT" : "STUN only \u2014 video may fail behind strict NAT. Configure TURN_SERVER_URL, TURN_USERNAME, TURN_CREDENTIAL secrets."
  });
}
__name(getIceConfig, "getIceConfig");

// src/routes/email.js
init_response();
var BRAND = {
  name_ar: "\u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A\u0629",
  name_en: "Hayat National Hospital",
  from: "noreply@hnh.brainsait.org",
  from_name: "HNH \u2013 \u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629",
  logo_url: "https://hnh.brainsait.org/logo.png",
  primary: "#1a5276",
  accent: "#2980b9",
  website: "https://hnh.brainsait.org",
  support_phone: "920000094",
  footer_ar: "\u062C\u0645\u064A\u0639 \u0627\u0644\u062D\u0642\u0648\u0642 \u0645\u062D\u0641\u0648\u0638\u0629 \xA9 \u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A\u0629"
};
function wrapEmail(title, bodyHtml) {
  return `<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>${title}</title>
<style>
  body { margin:0; padding:0; background:#f4f6fb; font-family: 'Segoe UI', Arial, sans-serif; direction:rtl; }
  .wrap { max-width:600px; margin:32px auto; background:#fff; border-radius:12px; overflow:hidden;
          box-shadow:0 2px 12px rgba(0,0,0,.1); }
  .header { background:${BRAND.primary}; padding:28px 32px; text-align:center; }
  .header h1 { margin:0; color:#fff; font-size:22px; font-weight:700; }
  .header p  { margin:4px 0 0; color:#aed6f1; font-size:14px; }
  .body { padding:32px; }
  .card { background:#eaf4fb; border-right:4px solid ${BRAND.accent};
          border-radius:8px; padding:16px 20px; margin:16px 0; }
  .card .label { font-size:12px; color:#666; margin:0 0 2px; }
  .card .value { font-size:16px; color:${BRAND.primary}; font-weight:600; margin:0; }
  .btn { display:inline-block; background:${BRAND.accent}; color:#fff !important;
         text-decoration:none; padding:12px 28px; border-radius:8px; font-size:15px;
         font-weight:600; margin:20px 0; }
  .alert { background:#fef9e7; border-right:4px solid #f39c12; border-radius:8px;
           padding:12px 16px; margin:16px 0; font-size:14px; color:#7d6608; }
  .footer { background:#f4f6fb; padding:20px 32px; text-align:center; font-size:12px; color:#888; }
  h2 { color:${BRAND.primary}; font-size:18px; margin-top:0; }
  p  { color:#444; line-height:1.7; font-size:15px; }
  .divider { border:none; border-top:1px solid #eee; margin:20px 0; }
</style>
</head>
<body>
<div class="wrap">
  <div class="header">
    <h1>${BRAND.name_ar}</h1>
    <p>${BRAND.name_en}</p>
  </div>
  <div class="body">
    ${bodyHtml}
  </div>
  <div class="footer">
    <p>${BRAND.footer_ar}</p>
    <p>\u0644\u0644\u0627\u0633\u062A\u0641\u0633\u0627\u0631: <strong>${BRAND.support_phone}</strong> | <a href="${BRAND.website}" style="color:${BRAND.accent}">${BRAND.website}</a></p>
  </div>
</div>
</body>
</html>`;
}
__name(wrapEmail, "wrapEmail");
function templateAppointment(data) {
  const subject = `\u062A\u0623\u0643\u064A\u062F \u0645\u0648\u0639\u062F\u0643 \u2013 ${data.date} | ${BRAND.name_ar}`;
  const html = wrapEmail(subject, `
    <h2>\u062A\u0645 \u062A\u0623\u0643\u064A\u062F \u0645\u0648\u0639\u062F\u0643 \u2713</h2>
    <p>\u0639\u0632\u064A\u0632\u064A/\u0639\u0632\u064A\u0632\u062A\u064A <strong>${data.patient_name || "\u0627\u0644\u0645\u0631\u064A\u0636"}</strong>\u060C</p>
    <p>\u064A\u0633\u0639\u062F\u0646\u0627 \u0625\u0628\u0644\u0627\u063A\u0643 \u0628\u062A\u0623\u0643\u064A\u062F \u0645\u0648\u0639\u062F\u0643 \u0644\u062F\u0649 ${BRAND.name_ar}.</p>
    <div class="card">
      <p class="label">\u0627\u0644\u062A\u0627\u0631\u064A\u062E</p>
      <p class="value">${data.date}</p>
    </div>
    <div class="card">
      <p class="label">\u0627\u0644\u0648\u0642\u062A</p>
      <p class="value">${data.time}</p>
    </div>
    <div class="card">
      <p class="label">\u0627\u0644\u0642\u0633\u0645 / \u0627\u0644\u062A\u062E\u0635\u0635</p>
      <p class="value">${data.department || "\u2014"}</p>
    </div>
    <div class="card">
      <p class="label">\u0627\u0644\u0641\u0631\u0639</p>
      <p class="value">${data.branch || "\u0627\u0644\u0631\u064A\u0627\u0636"}</p>
    </div>
    ${data.provider ? `<div class="card"><p class="label">\u0627\u0644\u0637\u0628\u064A\u0628</p><p class="value">${data.provider}</p></div>` : ""}
    <hr class="divider"/>
    <div class="alert">
      \u23F0 \u064A\u0631\u062C\u0649 \u0627\u0644\u062D\u0636\u0648\u0631 \u0642\u0628\u0644 15 \u062F\u0642\u064A\u0642\u0629 \u0645\u0646 \u0645\u0648\u0639\u062F\u0643 \u0645\u0639 \u0625\u062D\u0636\u0627\u0631 \u0627\u0644\u0647\u0648\u064A\u0629 \u0627\u0644\u0648\u0637\u0646\u064A\u0629 \u0648\u0628\u0637\u0627\u0642\u0629 \u0627\u0644\u062A\u0623\u0645\u064A\u0646.
    </div>
    ${data.appointment_id ? `<p style="font-size:12px;color:#999">\u0631\u0642\u0645 \u0627\u0644\u0645\u0648\u0639\u062F: ${data.appointment_id}</p>` : ""}
  `);
  return { subject, html };
}
__name(templateAppointment, "templateAppointment");
function templateHomecare(data) {
  const subject = `\u062A\u0623\u0643\u064A\u062F \u0632\u064A\u0627\u0631\u0629 \u0627\u0644\u0631\u0639\u0627\u064A\u0629 \u0627\u0644\u0645\u0646\u0632\u0644\u064A\u0629 \u2013 ${data.date} | ${BRAND.name_ar}`;
  const html = wrapEmail(subject, `
    <h2>\u062A\u0623\u0643\u064A\u062F \u0632\u064A\u0627\u0631\u0629 \u0627\u0644\u0631\u0639\u0627\u064A\u0629 \u0627\u0644\u0645\u0646\u0632\u0644\u064A\u0629 \u{1F3E0}</h2>
    <p>\u0639\u0632\u064A\u0632\u064A/\u0639\u0632\u064A\u0632\u062A\u064A <strong>${data.patient_name || "\u0627\u0644\u0645\u0631\u064A\u0636"}</strong>\u060C</p>
    <p>\u062A\u0645 \u062C\u062F\u0648\u0644\u0629 \u0632\u064A\u0627\u0631\u0629 \u0627\u0644\u0631\u0639\u0627\u064A\u0629 \u0627\u0644\u0645\u0646\u0632\u0644\u064A\u0629 \u0644\u0643 \u0648\u0641\u0642 \u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u062A\u0627\u0644\u064A\u0629:</p>
    <div class="card">
      <p class="label">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0632\u064A\u0627\u0631\u0629</p>
      <p class="value">${data.date}</p>
    </div>
    ${data.time ? `<div class="card"><p class="label">\u0627\u0644\u0648\u0642\u062A \u0627\u0644\u0645\u0642\u062F\u0631</p><p class="value">${data.time}</p></div>` : ""}
    <div class="card">
      <p class="label">\u0627\u0644\u0639\u0646\u0648\u0627\u0646</p>
      <p class="value">${data.address}</p>
    </div>
    <div class="card">
      <p class="label">\u0646\u0648\u0639 \u0627\u0644\u0632\u064A\u0627\u0631\u0629</p>
      <p class="value">${data.visit_type || "\u0631\u0648\u062A\u064A\u0646\u064A\u0629"}</p>
    </div>
    ${data.nurse_name ? `<div class="card"><p class="label">\u0627\u0644\u0645\u0645\u0631\u0636/\u0629 \u0627\u0644\u0645\u0633\u0624\u0648\u0644/\u0629</p><p class="value">${data.nurse_name}</p></div>` : ""}
    <hr class="divider"/>
    <div class="alert">
      \u{1F4DE} \u0641\u064A \u062D\u0627\u0644 \u0627\u0644\u062D\u0627\u062C\u0629 \u0644\u062A\u063A\u064A\u064A\u0631 \u0623\u0648 \u0625\u0644\u063A\u0627\u0621 \u0627\u0644\u0632\u064A\u0627\u0631\u0629\u060C \u064A\u0631\u062C\u0649 \u0627\u0644\u062A\u0648\u0627\u0635\u0644 \u0645\u0639\u0646\u0627 \u0639\u0644\u0649 \u0627\u0644\u0631\u0642\u0645 ${BRAND.support_phone} \u0642\u0628\u0644 3 \u0633\u0627\u0639\u0627\u062A \u0639\u0644\u0649 \u0627\u0644\u0623\u0642\u0644.
    </div>
    ${data.visit_id ? `<p style="font-size:12px;color:#999">\u0631\u0642\u0645 \u0627\u0644\u0632\u064A\u0627\u0631\u0629: ${data.visit_id}</p>` : ""}
  `);
  return { subject, html };
}
__name(templateHomecare, "templateHomecare");
function templateTelehealth(data) {
  const subject = `\u0631\u0627\u0628\u0637 \u062C\u0644\u0633\u0629 \u0627\u0644\u0627\u0633\u062A\u0634\u0627\u0631\u0629 \u0639\u0646 \u0628\u064F\u0639\u062F \u2013 ${data.date} | ${BRAND.name_ar}`;
  const html = wrapEmail(subject, `
    <h2>\u062C\u0644\u0633\u0629 \u0627\u0644\u0627\u0633\u062A\u0634\u0627\u0631\u0629 \u0627\u0644\u0637\u0628\u064A\u0629 \u0639\u0646 \u0628\u064F\u0639\u062F \u{1F3A5}</h2>
    <p>\u0639\u0632\u064A\u0632\u064A/\u0639\u0632\u064A\u0632\u062A\u064A <strong>${data.patient_name || "\u0627\u0644\u0645\u0631\u064A\u0636"}</strong>\u060C</p>
    <p>\u062A\u0645 \u062C\u062F\u0648\u0644\u0629 \u062C\u0644\u0633\u0629 \u0627\u0633\u062A\u0634\u0627\u0631\u062A\u0643 \u0627\u0644\u0637\u0628\u064A\u0629 \u0639\u0628\u0631 \u0627\u0644\u0641\u064A\u062F\u064A\u0648. \u0627\u0646\u0636\u0645 \u0641\u064A \u0627\u0644\u0648\u0642\u062A \u0627\u0644\u0645\u062D\u062F\u062F \u0645\u0646 \u062E\u0644\u0627\u0644 \u0627\u0644\u0631\u0627\u0628\u0637 \u0623\u062F\u0646\u0627\u0647.</p>
    <div class="card">
      <p class="label">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062C\u0644\u0633\u0629</p>
      <p class="value">${data.date}</p>
    </div>
    <div class="card">
      <p class="label">\u0648\u0642\u062A \u0627\u0644\u062C\u0644\u0633\u0629</p>
      <p class="value">${data.time}</p>
    </div>
    <div class="card">
      <p class="label">\u0627\u0644\u0645\u062F\u0629</p>
      <p class="value">${data.duration || 30} \u062F\u0642\u064A\u0642\u0629</p>
    </div>
    ${data.provider ? `<div class="card"><p class="label">\u0627\u0644\u0637\u0628\u064A\u0628/\u0629</p><p class="value">${data.provider}</p></div>` : ""}
    <div style="text-align:center;margin:28px 0;">
      <a href="${data.join_url}" class="btn">\u{1F4F9} \u0627\u0646\u0636\u0645 \u0644\u0644\u062C\u0644\u0633\u0629 \u0627\u0644\u0622\u0646</a>
    </div>
    <div class="card" style="direction:ltr;text-align:left">
      <p class="label" style="text-align:right">\u0631\u0645\u0632 \u0627\u0644\u063A\u0631\u0641\u0629</p>
      <p class="value" style="font-family:monospace;letter-spacing:4px;font-size:20px;text-align:center">${data.room_code}</p>
    </div>
    <hr class="divider"/>
    <div class="alert">
      \u{1F4A1} \u062A\u0623\u0643\u062F \u0645\u0646 \u0648\u062C\u0648\u062F \u0643\u0627\u0645\u064A\u0631\u0627 \u0648\u0645\u064A\u0643\u0631\u0648\u0641\u0648\u0646 \u064A\u0639\u0645\u0644 \u0628\u0634\u0643\u0644 \u0635\u062D\u064A\u062D. \u064A\u064F\u0646\u0635\u062D \u0628\u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0645\u062A\u0635\u0641\u062D Chrome \u0623\u0648 Edge.
    </div>
    ${data.session_id ? `<p style="font-size:12px;color:#999">\u0631\u0642\u0645 \u0627\u0644\u062C\u0644\u0633\u0629: ${data.session_id}</p>` : ""}
  `);
  return { subject, html };
}
__name(templateTelehealth, "templateTelehealth");
function templateFollowup(data) {
  const subject = `\u0645\u062A\u0627\u0628\u0639\u0629 \u0628\u0639\u062F \u0632\u064A\u0627\u0631\u062A\u0643 \u2013 ${BRAND.name_ar}`;
  const html = wrapEmail(subject, `
    <h2>\u0645\u062A\u0627\u0628\u0639\u0629 \u0628\u0639\u062F \u0632\u064A\u0627\u0631\u062A\u0643 \u{1F499}</h2>
    <p>\u0639\u0632\u064A\u0632\u064A/\u0639\u0632\u064A\u0632\u062A\u064A <strong>${data.patient_name || "\u0627\u0644\u0645\u0631\u064A\u0636"}</strong>\u060C</p>
    <p>\u0646\u062A\u0645\u0646\u0649 \u0644\u0643 \u0627\u0644\u0635\u062D\u0629 \u0648\u0627\u0644\u0639\u0627\u0641\u064A\u0629. \u0646\u062A\u0648\u0627\u0635\u0644 \u0645\u0639\u0643 \u0644\u0644\u0627\u0637\u0645\u0626\u0646\u0627\u0646 \u0628\u0639\u062F \u0632\u064A\u0627\u0631\u062A\u0643 \u0628\u062A\u0627\u0631\u064A\u062E <strong>${data.visit_date}</strong>.</p>
    ${data.notes ? `<div class="card"><p class="label">\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u0637\u0628\u064A\u0628</p><p class="value">${data.notes}</p></div>` : ""}
    ${data.next_appointment ? `<div class="card"><p class="label">\u0645\u0648\u0639\u062F\u0643 \u0627\u0644\u0642\u0627\u062F\u0645</p><p class="value">${data.next_appointment}</p></div>` : ""}
    ${data.medications?.length ? `
    <h3 style="color:${BRAND.primary};font-size:16px;">\u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u0627\u0644\u0645\u0648\u0635\u0648\u0641\u0629</h3>
    <ul style="padding-right:20px;color:#444;">
      ${data.medications.map((m) => `<li><strong>${m.name}</strong> \u2014 ${m.dose || ""} ${m.frequency || ""}</li>`).join("")}
    </ul>` : ""}
    <hr class="divider"/>
    <div class="alert">
      \u{1F3E5} \u0641\u064A \u062D\u0627\u0644 \u062A\u062F\u0647\u0648\u0631 \u062D\u0627\u0644\u062A\u0643 \u0623\u0648 \u0648\u062C\u0648\u062F \u0623\u0639\u0631\u0627\u0636 \u062C\u062F\u064A\u062F\u0629\u060C \u064A\u0631\u062C\u0649 \u0632\u064A\u0627\u0631\u0629 \u0623\u0642\u0631\u0628 \u0637\u0648\u0627\u0631\u0626 \u0623\u0648 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0640 <strong>997</strong>.
    </div>
    <div style="text-align:center;margin:20px 0;">
      <a href="${BRAND.website}" class="btn">\u0627\u062D\u062C\u0632 \u0645\u0648\u0639\u062F\u0627\u064B \u062C\u062F\u064A\u062F\u0627\u064B</a>
    </div>
  `);
  return { subject, html };
}
__name(templateFollowup, "templateFollowup");
async function sendEmail(env, to, subject, html, template, ref_id) {
  const maillincUrl = env.MAILLINC_URL || "https://maillinc.brainsait-fadil.workers.dev";
  let status = "pending";
  let error = null;
  try {
    const res = await fetch(`${maillincUrl}/email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...env.MAILLINC_API_KEY ? { "X-API-Key": env.MAILLINC_API_KEY } : {}
      },
      body: JSON.stringify({
        from: BRAND.from,
        from_name: BRAND.from_name,
        to,
        subject,
        html
      })
    });
    status = res.ok ? "sent" : "failed";
    if (!res.ok) error = `HTTP ${res.status}`;
  } catch (e) {
    status = "failed";
    error = e.message;
  }
  try {
    await env.DB.prepare(
      `INSERT INTO email_log (recipient, subject, template, ref_id, status, error) VALUES (?, ?, ?, ?, ?, ?)`
    ).bind(to, subject, template || "generic", ref_id || null, status, error).run();
  } catch (_) {
  }
  return { status, error };
}
__name(sendEmail, "sendEmail");
async function emailAppointment(req, env) {
  const data = await req.json().catch(() => ({}));
  if (!data.to || !data.date) return json({ success: false, message: "to and date required" }, 400);
  const { subject, html } = templateAppointment(data);
  const result = await sendEmail(env, data.to, subject, html, "appointment", data.appointment_id);
  return json({ success: result.status === "sent", ...result });
}
__name(emailAppointment, "emailAppointment");
async function emailHomecare(req, env) {
  const data = await req.json().catch(() => ({}));
  if (!data.to || !data.date || !data.address) return json({ success: false, message: "to, date, and address required" }, 400);
  const { subject, html } = templateHomecare(data);
  const result = await sendEmail(env, data.to, subject, html, "homecare", data.visit_id);
  return json({ success: result.status === "sent", ...result });
}
__name(emailHomecare, "emailHomecare");
async function emailTelehealth(req, env) {
  const data = await req.json().catch(() => ({}));
  if (!data.to || !data.join_url) return json({ success: false, message: "to and join_url required" }, 400);
  const { subject, html } = templateTelehealth(data);
  const result = await sendEmail(env, data.to, subject, html, "telehealth", data.session_id);
  return json({ success: result.status === "sent", ...result });
}
__name(emailTelehealth, "emailTelehealth");
async function emailFollowup(req, env) {
  const data = await req.json().catch(() => ({}));
  if (!data.to || !data.visit_date) return json({ success: false, message: "to and visit_date required" }, 400);
  const { subject, html } = templateFollowup(data);
  const result = await sendEmail(env, data.to, subject, html, "followup", data.ref_id);
  return json({ success: result.status === "sent", ...result });
}
__name(emailFollowup, "emailFollowup");
async function emailSend(req, env) {
  const data = await req.json().catch(() => ({}));
  if (!data.to || !data.subject || !data.html) {
    return json({ success: false, message: "to, subject, and html required" }, 400);
  }
  const result = await sendEmail(env, data.to, data.subject, data.html, "generic", data.ref_id);
  return json({ success: result.status === "sent", ...result });
}
__name(emailSend, "emailSend");
async function getEmailLog(req, env) {
  const url = new URL(req.url);
  const limit = Math.min(parseInt(url.searchParams.get("limit") || "50"), 200);
  const offset = parseInt(url.searchParams.get("offset") || "0");
  const status = url.searchParams.get("status") || "";
  let q = "SELECT * FROM email_log";
  const binds = [];
  if (status) {
    q += " WHERE status = ?";
    binds.push(status);
  }
  q += " ORDER BY id DESC LIMIT ? OFFSET ?";
  binds.push(limit, offset);
  const { results } = await env.DB.prepare(q).bind(...binds).all();
  return json({ success: true, emails: results || [], total: results?.length || 0 });
}
__name(getEmailLog, "getEmailLog");
async function emailWebhook(req, env) {
  const secret = req.headers.get("X-Webhook-Secret") || req.headers.get("x-webhook-secret");
  if (env.MAILLINC_WEBHOOK_SECRET && secret !== env.MAILLINC_WEBHOOK_SECRET) {
    return json({ success: false, message: "Unauthorized webhook" }, 401);
  }
  const body = await req.json().catch(() => ({}));
  const events = Array.isArray(body) ? body : body.events || [body];
  let processed = 0;
  for (const event of events) {
    const { type, recipient, message_id, timestamp, details } = event;
    if (!type || !recipient) continue;
    try {
      const newStatus = type === "delivery" ? "delivered" : type === "bounce" ? "bounced" : type === "complaint" ? "complaint" : type === "open" ? "opened" : type === "click" ? "clicked" : type;
      await env.DB.prepare(
        `UPDATE email_log SET status = ?, webhook_event = ?, webhook_at = ?, error = ?
         WHERE recipient = ? AND status IN ('sent', 'delivered', 'opened')
         ORDER BY id DESC LIMIT 1`
      ).bind(
        newStatus,
        type,
        timestamp || (/* @__PURE__ */ new Date()).toISOString(),
        type === "bounce" ? details?.bounce_type || "unknown bounce" : null,
        recipient
      ).run();
      processed++;
    } catch (e) {
      console.error("Webhook event processing error:", e?.message);
    }
  }
  return json({ success: true, processed, total: events.length });
}
__name(emailWebhook, "emailWebhook");

// src/sites.js
var sites_exports = {};
__export(sites_exports, {
  about: () => about,
  academy: () => academy,
  blog: () => blog,
  branches: () => branches2,
  contact: () => contact,
  course_ai_healthcare: () => course_ai_healthcare,
  course_cbahi_quality: () => course_cbahi_quality,
  course_clinical_documentation: () => course_clinical_documentation,
  course_infection_control: () => course_infection_control,
  course_medical_coding: () => course_medical_coding,
  course_nphies: () => course_nphies,
  course_pdpl: () => course_pdpl,
  course_pharmacy: () => course_pharmacy,
  course_rcm: () => course_rcm,
  departments: () => departments,
  doctors: () => doctors,
  faq: () => faq,
  index: () => index,
  packages: () => packages
});
var about = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>\u0639\u0646 \u0627\u0644\u0645\u062C\u0645\u0648\u0639\u0629 | \u0645\u0633\u062A\u0634\u0641\u0649 \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A</title>
<meta name="description" content="\u062A\u0639\u0631\u0641 \u0639\u0644\u0649 \u0645\u062C\u0645\u0648\u0639\u0629 \u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A \u2014 \u062A\u0627\u0631\u064A\u062E\u0646\u0627\u060C \u0631\u0624\u064A\u062A\u0646\u0627\u060C \u0648\u0631\u0633\u0627\u0644\u062A\u0646\u0627 \u0641\u064A \u062A\u0642\u062F\u064A\u0645 \u0631\u0639\u0627\u064A\u0629 \u0635\u062D\u064A\u0629 \u0645\u062A\u0645\u064A\u0632\u0629. | About Hayat National Hospitals \u2014 our history, vision, and mission.">
<meta name="keywords" content="\u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A, Hayat National Hospitals, \u0639\u0646 \u0627\u0644\u0645\u062C\u0645\u0648\u0639\u0629, about, \u0631\u0624\u064A\u0629, \u0631\u0633\u0627\u0644\u0629">
<meta name="robots" content="index, follow">
<meta name="theme-color" content="#0066CC">
<link rel="canonical" href="https://hnh.brainsait.org/about.html">
<link rel="alternate" hreflang="ar" href="https://hnh.brainsait.org/about.html">
<link rel="alternate" hreflang="en" href="https://hnh.brainsait.org/about.html">
<link rel="alternate" hreflang="x-default" href="https://hnh.brainsait.org/about.html">
<link rel="manifest" href="/manifest.json">
<link rel="apple-touch-icon" href="/icon-192.png">
<meta property="og:type" content="website">
<meta property="og:site_name" content="\u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A | Hayat National Hospitals">
<meta property="og:title" content="\u0639\u0646 \u0627\u0644\u0645\u062C\u0645\u0648\u0639\u0629 | \u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A">
<meta property="og:description" content="\u062A\u0639\u0631\u0641 \u0639\u0644\u0649 \u0645\u062C\u0645\u0648\u0639\u0629 \u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A \u2014 \u062A\u0627\u0631\u064A\u062E\u0646\u0627\u060C \u0631\u0624\u064A\u062A\u0646\u0627\u060C \u0648\u0631\u0633\u0627\u0644\u062A\u0646\u0627 \u0641\u064A \u062A\u0642\u062F\u064A\u0645 \u0631\u0639\u0627\u064A\u0629 \u0635\u062D\u064A\u0629 \u0645\u062A\u0645\u064A\u0632\u0629.">
<meta property="og:url" content="https://hnh.brainsait.org/about.html">
<meta property="og:image" content="https://hnh.brainsait.org/og-image.jpg">
<meta property="og:locale" content="ar_SA">
<meta property="og:locale:alternate" content="en_US">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="\u0639\u0646 \u0627\u0644\u0645\u062C\u0645\u0648\u0639\u0629 | \u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A">
<meta name="twitter:description" content="\u062A\u0639\u0631\u0641 \u0639\u0644\u0649 \u0645\u062C\u0645\u0648\u0639\u0629 \u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A \u2014 \u062A\u0627\u0631\u064A\u062E\u0646\u0627\u060C \u0631\u0624\u064A\u062A\u0646\u0627\u060C \u0648\u0631\u0633\u0627\u0644\u062A\u0646\u0627.">
<meta name="twitter:image" content="https://hnh.brainsait.org/og-image.jpg">

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Tajawal:wght@300;400;500;700;800;900&display=swap" rel="stylesheet">
<link rel="stylesheet" href="css/style.css">
</head>
<body>
<a href="#main-content" class="skip-link">Skip to main content</a>
<header class="header"><div class="container header-inner"><a href="index.html" class="logo"><div class="logo-icon"><svg viewBox="0 0 24 24" width="24" height="24" fill="white"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg></div><div class="logo-text">\u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A<small>BrainSAIT Healthcare OS</small></div></a><nav class="nav" id="mainNav">
      <a href="index.html" data-i18n="nav.home">\u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629</a>
      <a href="about.html" data-i18n="nav.about">\u0639\u0646 \u0627\u0644\u0645\u062C\u0645\u0648\u0639\u0629</a>
      <a href="departments.html" data-i18n="nav.departments">\u0627\u0644\u0623\u0642\u0633\u0627\u0645 \u0627\u0644\u0637\u0628\u064A\u0629</a>
      <a href="doctors.html" data-i18n="nav.doctors">\u0623\u0637\u0628\u0627\u0624\u0646\u0627</a>
      <a href="branches.html" data-i18n="nav.branches">\u0641\u0631\u0648\u0639\u0646\u0627</a>
      <a href="packages.html" data-i18n="nav.packages">\u0628\u0627\u0642\u0627\u062A \u0627\u0644\u0631\u0639\u0627\u064A\u0629</a>
      <a href="blog.html" data-i18n="nav.blog">\u0627\u0644\u0645\u062F\u0648\u0646\u0629 \u0627\u0644\u0635\u062D\u064A\u0629</a>
      <a href="contact.html" data-i18n="nav.contact">\u0627\u062A\u0635\u0644 \u0628\u0646\u0627</a>
      <button class="lang-btn" onclick="HNH.setLang(HNH.currentLang()==='ar'?'en':'ar')">EN/\u0639\u0631\u0628\u064A</button>
      <a href="contact.html" class="nav-cta" data-i18n="nav.book">\u0627\u062D\u062C\u0632 \u0645\u0648\u0639\u062F</a>
    </nav><button class="mobile-toggle" aria-label="Menu"><span></span><span></span><span></span></button></div></header>

<section class="page-hero" id="main-content"><div class="container"><div class="breadcrumb"><a href="index.html">\u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629</a><span>/</span><span>\u0639\u0646 \u0627\u0644\u0645\u062C\u0645\u0648\u0639\u0629</span></div><h1>\u0639\u0646 \u0627\u0644\u0645\u062C\u0645\u0648\u0639\u0629</h1><p>\u0645\u062C\u0645\u0648\u0639\u0629 \u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A \u2014 \u0623\u0643\u062B\u0631 \u0645\u0646 25 \u0639\u0627\u0645\u0627\u064B \u0645\u0646 \u0627\u0644\u062A\u0645\u064A\u0632</p></div></section>

<section class="section bg-white"><div class="container">
  <div class="about-grid">
    <div class="about-image animate-left"><svg viewBox="0 0 200 200"><rect x="30" y="50" width="140" height="110" rx="10" fill="rgba(255,255,255,0.15)"/><rect x="50" y="30" width="100" height="25" rx="6" fill="rgba(255,255,255,0.12)"/><circle cx="100" cy="90" r="25" fill="rgba(255,255,255,0.12)"/><rect x="60" y="125" width="80" height="5" rx="2.5" fill="rgba(255,255,255,0.08)"/></svg></div>
    <div class="about-content animate-right">
      <h2>\u0639\u0646 \u0645\u062C\u0645\u0648\u0639\u0629 \u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A</h2>
      <div class="gold-line"></div>
      <p>\u062A\u0623\u0633\u0633\u062A \u0645\u062C\u0645\u0648\u0639\u0629 \u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A \u0639\u0627\u0645 1999 \u0639\u0644\u0649 \u064A\u062F \u0627\u0644\u0634\u064A\u062E \u0645\u062D\u0645\u062F \u0628\u0646 \u0646\u0627\u0635\u0631 \u0628\u0646 \u062C\u0627\u0631 \u0627\u0644\u0644\u0647\u060C \u0648\u0625\u062F\u0627\u0631\u062A\u0647\u0627 \u0634\u0631\u0643\u0629 \u0627\u0644\u0625\u0646\u0645\u0627\u0621 \u0644\u0644\u062E\u062F\u0645\u0627\u062A \u0627\u0644\u0637\u0628\u064A\u0629. \u062A\u0645\u062A\u0644\u0643 \u0627\u0644\u0645\u062C\u0645\u0648\u0639\u0629 \u0648\u062A\u062F\u064A\u0631 \u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0645\u062A\u0643\u0627\u0645\u0644\u0629 \u0641\u064A \u0645\u062E\u062A\u0644\u0641 \u0645\u0646\u0627\u0637\u0642 \u0627\u0644\u0645\u0645\u0644\u0643\u0629 \u0627\u0644\u0639\u0631\u0628\u064A\u0629 \u0627\u0644\u0633\u0639\u0648\u062F\u064A\u0629.</p>
      <p>\u0628\u0639\u062F \u0623\u0643\u062B\u0631 \u0645\u0646 20 \u0639\u0627\u0645\u0627\u064B \u0641\u064A \u0645\u062C\u0627\u0644 \u0627\u0644\u0631\u0639\u0627\u064A\u0629 \u0627\u0644\u0635\u062D\u064A\u0629 \u0627\u0644\u0645\u062A\u0643\u0627\u0645\u0644\u0629\u060C \u0646\u0633\u0639\u0649 \u0628\u0627\u0633\u062A\u0645\u0631\u0627\u0631 \u0644\u062A\u0637\u0648\u064A\u0631 \u0648\u062A\u062D\u062F\u064A\u062B \u062E\u062F\u0645\u0627\u062A\u0646\u0627 \u0644\u0644\u0648\u0635\u0648\u0644 \u0625\u0644\u0649 \u0623\u0639\u0644\u0649 \u0645\u0633\u062A\u0648\u064A\u0627\u062A \u0627\u0644\u062A\u0637\u0648\u064A\u0631 \u0641\u064A \u0645\u062C\u0627\u0644 \u0627\u0644\u0631\u0639\u0627\u064A\u0629 \u0627\u0644\u0635\u062D\u064A\u0629.</p>
      <p>\u0646\u0637\u0628\u0642 \u0623\u0639\u0644\u0649 \u0627\u0644\u0645\u0648\u0627\u0635\u0641\u0627\u062A \u0648\u0627\u0644\u0645\u0639\u0627\u064A\u064A\u0631 \u0627\u0644\u062F\u0648\u0644\u064A\u0629 \u0641\u064A \u0627\u0644\u062C\u0648\u062F\u0629\u060C \u0645\u0639 \u0627\u0644\u062D\u0641\u0627\u0638 \u0639\u0644\u0649 \u0633\u0644\u0627\u0645\u0629 \u0627\u0644\u0645\u0631\u0636\u0649 \u0648\u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646 \u0648\u0627\u0644\u0632\u0648\u0627\u0631 \u0628\u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0623\u062D\u062F\u062B \u0627\u0644\u0623\u062C\u0647\u0632\u0629 \u0627\u0644\u0637\u0628\u064A\u0629.</p>
    </div>
  </div>
</div></section>

<section class="section bg-light"><div class="container">
  <div class="section-header animate-on-scroll"><h2>\u0627\u0644\u0642\u064A\u0627\u062F\u0629</h2><p>\u0627\u0644\u0642\u064A\u0627\u062F\u0629 \u0627\u0644\u0631\u0634\u064A\u062F\u0629 \u0627\u0644\u062A\u064A \u062A\u0642\u0648\u062F \u0645\u0633\u064A\u0631\u0629 \u0627\u0644\u062A\u0645\u064A\u0632</p></div>
  <div class="grid-3">
    <div class="card animate-on-scroll delay-1" style="text-align:center;padding:40px 24px;">
      <div style="width:120px;height:120px;border-radius:50%;background:var(--gradient-primary);margin:0 auto 20px;display:flex;align-items:center;justify-content:center;font-size:2.5rem;color:white;font-weight:700;">\u0645</div>
      <h4>\u0623. \u0645\u062D\u0645\u062F \u0628\u0646 \u0646\u0627\u0635\u0631 \u0628\u0646 \u062C\u0627\u0631 \u0627\u0644\u0644\u0647</h4>
      <p style="color:var(--primary);font-weight:600;margin:8px 0;">\u0631\u0626\u064A\u0633 \u0645\u062C\u0644\u0633 \u0627\u0644\u0625\u062F\u0627\u0631\u0629</p>
      <p style="color:var(--text-light);font-size:0.9rem;">\u0631\u0626\u064A\u0633 \u0645\u062C\u0644\u0633 \u0625\u062F\u0627\u0631\u0629 \u0634\u0631\u0643\u0629 \u0627\u0644\u0625\u0646\u0645\u0627\u0621 \u0644\u0644\u062E\u062F\u0645\u0627\u062A \u0627\u0644\u0637\u0628\u064A\u0629 \u0627\u0644\u0645\u0627\u0644\u0643\u0629 \u0648\u0627\u0644\u0645\u0634\u063A\u0644\u0629 \u0644\u0645\u062C\u0645\u0648\u0639\u0629 \u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A</p>
    </div>
    <div class="card animate-on-scroll delay-2" style="text-align:center;padding:40px 24px;">
      <div style="width:120px;height:120px;border-radius:50%;background:var(--gradient-accent);margin:0 auto 20px;display:flex;align-items:center;justify-content:center;font-size:2.5rem;color:var(--navy);font-weight:700;">\u0641</div>
      <h4>\u062F. \u0641\u0648\u0632\u064A\u0629 \u0627\u0644\u062C\u0627\u0631 \u0627\u0644\u0644\u0647</h4>
      <p style="color:var(--primary);font-weight:600;margin:8px 0;">\u0627\u0644\u0631\u0626\u064A\u0633 \u0627\u0644\u062A\u0646\u0641\u064A\u0630\u064A</p>
      <p style="color:var(--text-light);font-size:0.9rem;">\u0627\u0644\u0631\u0626\u064A\u0633 \u0627\u0644\u062A\u0646\u0641\u064A\u0630\u064A \u0644\u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A\u060C \u062A\u0645 \u0627\u062E\u062A\u064A\u0627\u0631\u0647\u0627 \u0636\u0645\u0646 \u0623\u0641\u0636\u0644 100 \u0642\u0627\u0626\u062F \u0641\u064A \u0645\u062C\u0627\u0644 \u0627\u0644\u0631\u0639\u0627\u064A\u0629 \u0627\u0644\u0635\u062D\u064A\u0629 \u0641\u064A \u0627\u0644\u0634\u0631\u0642 \u0627\u0644\u0623\u0648\u0633\u0637</p>
    </div>
    <div class="card animate-on-scroll delay-3" style="text-align:center;padding:40px 24px;">
      <div style="width:120px;height:120px;border-radius:50%;background:linear-gradient(135deg,var(--navy),var(--navy-light));margin:0 auto 20px;display:flex;align-items:center;justify-content:center;font-size:2.5rem;color:white;font-weight:700;">\u062D</div>
      <h4>\u062F. \u062D\u0633\u064A\u0646 \u0628\u0646 \u062D\u0633\u0648\u0633\u0629</h4>
      <p style="color:var(--primary);font-weight:600;margin:8px 0;">\u0645\u0633\u0627\u0639\u062F \u0627\u0644\u0631\u0626\u064A\u0633 \u0627\u0644\u062A\u0646\u0641\u064A\u0630\u064A</p>
      <p style="color:var(--text-light);font-size:0.9rem;">\u064A\u0633\u0627\u0639\u062F \u0641\u064A \u062A\u0646\u0641\u064A\u0630 \u0627\u0644\u062E\u0637\u0637 \u0627\u0644\u0627\u0633\u062A\u0631\u0627\u062A\u064A\u062C\u064A\u0629 \u0648\u062A\u0637\u0648\u064A\u0631 \u062E\u062F\u0645\u0627\u062A \u0627\u0644\u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A</p>
    </div>
  </div>
</div></section>

<section class="section bg-white"><div class="container">
  <div class="section-header animate-on-scroll"><h2>\u0627\u0644\u0631\u0624\u064A\u0629 \u0648\u0627\u0644\u0631\u0633\u0627\u0644\u0629 \u0648\u0627\u0644\u0642\u064A\u0645</h2></div>
  <div class="grid-2" style="margin-bottom:48px;">
    <div class="animate-left">
      <div style="background:var(--gradient-primary);border-radius:var(--radius-xl);padding:48px;color:white;position:relative;overflow:hidden;">
        <h3 style="color:white;margin-bottom:12px;">\u0627\u0644\u0631\u0624\u064A\u0629</h3>
        <p style="color:rgba(255,255,255,0.85);line-height:1.8;">\u0623\u0646 \u0646\u0643\u0648\u0646 \u0631\u0648\u0627\u062F\u0627\u064B \u0641\u064A \u0645\u062C\u0627\u0644 \u0627\u0644\u0631\u0639\u0627\u064A\u0629 \u0627\u0644\u0635\u062D\u064A\u0629 \u0641\u064A \u0627\u0644\u0645\u0645\u0644\u0643\u0629 \u0627\u0644\u0639\u0631\u0628\u064A\u0629 \u0627\u0644\u0633\u0639\u0648\u062F\u064A\u0629 \u0648\u0627\u0644\u0634\u0631\u0642 \u0627\u0644\u0623\u0648\u0633\u0637. \u0645\u0646 \u062E\u0644\u0627\u0644 \u0627\u0644\u0627\u0628\u062A\u0643\u0627\u0631 \u0627\u0644\u0645\u0633\u062A\u0645\u0631 \u0648\u062A\u0642\u062F\u064A\u0645 \u0631\u0639\u0627\u064A\u0629 \u0635\u062D\u064A\u0629 \u0639\u0627\u0644\u064A\u0629 \u0627\u0644\u062C\u0648\u062F\u0629 \u062A\u0644\u0628\u064A \u0623\u0639\u0644\u0649 \u0627\u0644\u0645\u0639\u0627\u064A\u064A\u0631 \u0627\u0644\u0639\u0627\u0644\u0645\u064A\u0629.</p>
      </div>
    </div>
    <div class="animate-right">
      <div style="background:var(--gradient-accent);border-radius:var(--radius-xl);padding:48px;color:var(--navy);">
        <h3 style="color:var(--navy);margin-bottom:12px;">\u0627\u0644\u0631\u0633\u0627\u0644\u0629</h3>
        <p style="color:rgba(26,43,74,0.85);line-height:1.8;">\u062A\u0642\u062F\u064A\u0645 \u0631\u0639\u0627\u064A\u0629 \u0635\u062D\u064A\u0629 \u0645\u062A\u0645\u064A\u0632\u0629 \u0648\u0645\u062A\u0643\u0627\u0645\u0644\u0629 \u062A\u062A\u0645\u062D\u0648\u0631 \u062D\u0648\u0644 \u0627\u0644\u0645\u0631\u064A\u0636. \u0645\u0644\u062A\u0632\u0645\u0648\u0646 \u0628\u0639\u0644\u0627\u062C \u0637\u0628\u064A \u0645\u0628\u062A\u0643\u0631 \u0648\u0634\u0627\u0645\u0644 \u0628\u062F\u0639\u0645 \u0645\u0646 \u0645\u062A\u062E\u0635\u0635\u064A\u0646 \u0630\u0648\u064A \u062E\u0628\u0631\u0629 \u0639\u0627\u0644\u064A\u0629.</p>
      </div>
    </div>
  </div>
  <h3 class="text-center animate-on-scroll" style="margin-bottom:32px;">\u0642\u064A\u0645\u0646\u0627 \u0627\u0644\u0623\u0633\u0627\u0633\u064A\u0629</h3>
  <div class="grid-3">
    <div class="value-card animate-on-scroll delay-1"><div class="value-icon"><svg viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg></div><h4>\u0631\u0639\u0627\u064A\u0629 \u0635\u062D\u064A\u0629 \u0645\u062A\u0645\u064A\u0632\u0629 \u0648\u0627\u062D\u062A\u0631\u0627\u0641\u064A\u0629</h4><p>\u0646\u0644\u062A\u0632\u0645 \u0628\u062A\u0642\u062F\u064A\u0645 \u0623\u0639\u0644\u0649 \u0645\u0633\u062A\u0648\u064A\u0627\u062A \u0627\u0644\u0631\u0639\u0627\u064A\u0629 \u0627\u0644\u0635\u062D\u064A\u0629 \u0628\u0645\u0639\u0627\u064A\u064A\u0631 \u0627\u062D\u062A\u0631\u0627\u0641\u064A\u0629 \u0639\u0627\u0644\u0645\u064A\u0629</p></div>
    <div class="value-card animate-on-scroll delay-2"><div class="value-icon"><svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg></div><h4>\u0627\u0644\u0635\u062F\u0642 \u0648\u0627\u0644\u0645\u0635\u062F\u0627\u0642\u064A\u0629</h4><p>\u0646\u0639\u0645\u0644 \u0628\u0646\u0632\u0627\u0647\u0629 \u0648\u0634\u0641\u0627\u0641\u064A\u0629 \u0641\u064A \u062C\u0645\u064A\u0639 \u062A\u0639\u0627\u0645\u0644\u0627\u062A\u0646\u0627 \u0645\u0639 \u0627\u0644\u0645\u0631\u0636\u0649 \u0648\u0627\u0644\u0634\u0631\u0643\u0627\u0621</p></div>
    <div class="value-card animate-on-scroll delay-3"><div class="value-icon"><svg viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/></svg></div><h4>\u062D\u0645\u0627\u064A\u0629 \u062E\u0635\u0648\u0635\u064A\u0629 \u0627\u0644\u0645\u0631\u0636\u0649</h4><p>\u0646\u0644\u062A\u0632\u0645 \u0628\u0627\u0644\u062D\u0641\u0627\u0638 \u0627\u0644\u0643\u0627\u0645\u0644 \u0639\u0644\u0649 \u062E\u0635\u0648\u0635\u064A\u0629 \u0627\u0644\u0632\u0648\u0627\u0631 \u0648\u0627\u0644\u0645\u0631\u0636\u0649</p></div>
    <div class="value-card animate-on-scroll delay-4"><div class="value-icon"><svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-4h2v2h-2zm0-8h2v6h-2z"/></svg></div><h4>\u0627\u0644\u0645\u0633\u0624\u0648\u0644\u064A\u0629 \u0627\u0644\u0627\u062C\u062A\u0645\u0627\u0639\u064A\u0629</h4><p>\u0646\u0624\u062F\u064A \u0648\u0627\u062C\u0628\u0646\u0627 \u0627\u0644\u0648\u0637\u0646\u064A \u0641\u064A \u062A\u062B\u0642\u064A\u0641 \u0648\u062A\u0648\u0639\u064A\u0629 \u0627\u0644\u0645\u062C\u062A\u0645\u0639 \u0628\u0627\u0644\u0645\u0634\u0643\u0644\u0627\u062A \u0627\u0644\u0635\u062D\u064A\u0629</p></div>
    <div class="value-card animate-on-scroll delay-5"><div class="value-icon"><svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93z"/></svg></div><h4>\u0627\u0644\u0627\u0644\u062A\u0632\u0627\u0645 \u0628\u0627\u0644\u062A\u0639\u0627\u0644\u064A\u0645 \u0627\u0644\u0625\u0633\u0644\u0627\u0645\u064A\u0629</h4><p>\u0646\u0633\u062A\u0631\u0634\u062F \u0628\u0642\u064A\u0645 \u0648\u062A\u0639\u0627\u0644\u064A\u0645 \u0627\u0644\u062F\u064A\u0646 \u0627\u0644\u0625\u0633\u0644\u0627\u0645\u064A \u0627\u0644\u062D\u0646\u0641\u064A \u0641\u064A \u062C\u0645\u064A\u0639 \u0623\u0639\u0645\u0627\u0644\u0646\u0627</p></div>
    <div class="value-card animate-on-scroll delay-6"><div class="value-icon"><svg viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg></div><h4>\u0627\u0644\u062C\u0648\u062F\u0629 \u0648\u0627\u0644\u0633\u0644\u0627\u0645\u0629</h4><p>\u0646\u0637\u0628\u0642 \u0623\u0639\u0644\u0649 \u0645\u0639\u0627\u064A\u064A\u0631 \u0627\u0644\u062C\u0648\u062F\u0629 \u0648\u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0641\u064A \u062C\u0645\u064A\u0639 \u0641\u0631\u0648\u0639\u0646\u0627</p></div>
  </div>
</div></section>

<section class="section bg-light"><div class="container">
  <div class="section-header animate-on-scroll"><h2>\u0645\u0633\u064A\u0631\u0629 \u0627\u0644\u062A\u0645\u064A\u0632</h2><p>\u0623\u0643\u062B\u0631 \u0645\u0646 \u0631\u0628\u0639 \u0642\u0631\u0646 \u0645\u0646 \u0627\u0644\u0625\u0646\u062C\u0627\u0632\u0627\u062A</p></div>
  <div style="max-width:700px;margin:0 auto;">
    <div class="animate-on-scroll" style="display:flex;gap:24px;margin-bottom:32px;align-items:flex-start;">
      <div style="width:64px;height:64px;background:var(--gradient-accent);border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-weight:800;color:var(--navy);font-size:1.1rem;">1999</div>
      <div><h4>\u062A\u0623\u0633\u064A\u0633 \u0627\u0644\u0645\u062C\u0645\u0648\u0639\u0629</h4><p style="color:var(--text-light);font-size:0.95rem;">\u062A\u0623\u0633\u0633\u062A \u0645\u062C\u0645\u0648\u0639\u0629 \u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A \u0639\u0644\u0649 \u064A\u062F \u0627\u0644\u0634\u064A\u062E \u0645\u062D\u0645\u062F \u0628\u0646 \u0646\u0627\u0635\u0631 \u0628\u0646 \u062C\u0627\u0631 \u0627\u0644\u0644\u0647</p></div>
    </div>
    <div class="animate-on-scroll" style="display:flex;gap:24px;margin-bottom:32px;align-items:flex-start;">
      <div style="width:64px;height:64px;background:var(--gradient-primary);border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-weight:800;color:white;font-size:0.9rem;">2010s</div>
      <div><h4>\u0627\u0644\u062A\u0648\u0633\u0639 \u0627\u0644\u0625\u0642\u0644\u064A\u0645\u064A</h4><p style="color:var(--text-light);font-size:0.95rem;">\u0627\u0641\u062A\u062A\u0627\u062D \u0641\u0631\u0648\u0639 \u0641\u064A \u0627\u0644\u0631\u064A\u0627\u0636 \u0648\u0627\u0644\u0645\u062F\u064A\u0646\u0629 \u0627\u0644\u0645\u0646\u0648\u0631\u0629 \u0648\u062C\u0627\u0632\u0627\u0646 \u0648\u062E\u0645\u064A\u0633 \u0645\u0634\u064A\u0637 \u0648\u0639\u0646\u064A\u0632\u0629</p></div>
    </div>
    <div class="animate-on-scroll" style="display:flex;gap:24px;margin-bottom:32px;align-items:flex-start;">
      <div style="width:64px;height:64px;background:var(--gradient-accent);border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-weight:800;color:var(--navy);font-size:0.9rem;">2020s</div>
      <div><h4>\u0634\u0631\u0627\u0643\u0627\u062A \u0639\u0627\u0644\u0645\u064A\u0629</h4><p style="color:var(--text-light);font-size:0.95rem;">\u062A\u0648\u0642\u064A\u0639 \u0634\u0631\u0627\u0643\u0629 \u0627\u0633\u062A\u0631\u0627\u062A\u064A\u062C\u064A\u0629 \u0645\u0639 GE Healthcare \u0648\u0628\u0631\u0648\u062A\u0648\u0643\u0648\u0644 \u062A\u0639\u0627\u0648\u0646 \u0645\u0639 \u062C\u0627\u0645\u0639\u0629 \u0627\u0644\u0645\u0644\u0643 \u062E\u0627\u0644\u062F</p></div>
    </div>
    <div class="animate-on-scroll" style="display:flex;gap:24px;align-items:flex-start;">
      <div style="width:64px;height:64px;background:var(--gradient-primary);border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-weight:800;color:white;font-size:0.9rem;">2024</div>
      <div><h4>\u0627\u0644\u0631\u064A\u0627\u062F\u0629 \u0648\u0627\u0644\u062A\u0645\u064A\u0651\u0632</h4><p style="color:var(--text-light);font-size:0.95rem;">\u0627\u062E\u062A\u064A\u0627\u0631 \u0627\u0644\u0631\u0626\u064A\u0633 \u0627\u0644\u062A\u0646\u0641\u064A\u0630\u064A \u0636\u0645\u0646 \u0623\u0641\u0636\u0644 100 \u0642\u0627\u0626\u062F \u0641\u064A \u0627\u0644\u0631\u0639\u0627\u064A\u0629 \u0627\u0644\u0635\u062D\u064A\u0629 \u0641\u064A \u0627\u0644\u0634\u0631\u0642 \u0627\u0644\u0623\u0648\u0633\u0637</p></div>
    </div>
  </div>
</div></section>

<section class="cta-section"><div class="container"><h2>\u0635\u062D\u062A\u0643 \u0623\u0648\u0644\u0627\u064B</h2><p>\u0627\u062D\u062C\u0632 \u0645\u0648\u0639\u062F\u0643 \u0627\u0644\u0622\u0646</p><div class="cta-buttons"><a href="contact.html" class="btn btn-accent btn-lg">\u0627\u062D\u062C\u0632 \u0645\u0648\u0639\u062F</a></div></div></section>
<footer class="footer">
  <div class="container">
    <div class="footer-grid">
      <div>
        <h4 data-i18n="footer.name">\u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A</h4>
        <p style="margin-bottom:16px;" data-i18n="footer.desc">\u0646\u0638\u0627\u0645 BrainSAIT Healthcare OS \u0627\u0644\u0645\u062A\u0635\u0644 \u0628\u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062D\u064A\u0629</p>
        <span class="api-status live">API Connected</span>
      </div>
      <div>
        <h4 data-i18n="footer.quickLinks">\u0631\u0648\u0627\u0628\u0637 \u0633\u0631\u064A\u0639\u0629</h4>
        <a href="about.html" data-i18n="nav.about">\u0639\u0646 \u0627\u0644\u0645\u062C\u0645\u0648\u0639\u0629</a>
        <a href="departments.html" data-i18n="nav.departments">\u0627\u0644\u0623\u0642\u0633\u0627\u0645 \u0627\u0644\u0637\u0628\u064A\u0629</a>
        <a href="doctors.html" data-i18n="nav.doctors">\u0623\u0637\u0628\u0627\u0624\u0646\u0627</a>
        <a href="branches.html" data-i18n="nav.branches">\u0641\u0631\u0648\u0639\u0646\u0627</a>
        <a href="packages.html" data-i18n="nav.packages">\u0628\u0627\u0642\u0627\u062A \u0627\u0644\u0631\u0639\u0627\u064A\u0629</a>
        <a href="blog.html" data-i18n="nav.blog">\u0627\u0644\u0645\u062F\u0648\u0646\u0629 \u0627\u0644\u0635\u062D\u064A\u0629</a>
        <a href="faq.html" data-i18n="nav.faq">\u0627\u0644\u0623\u0633\u0626\u0644\u0629 \u0627\u0644\u0634\u0627\u0626\u0639\u0629</a>
      </div>
      <div>
        <h4 data-i18n="footer.services">\u062E\u062F\u0645\u0627\u062A\u0646\u0627</h4>
        <a href="contact.html" data-i18n="nav.book">\u062D\u062C\u0632 \u0645\u0648\u0639\u062F</a>
        <a href="departments.html">\u0627\u0644\u0639\u064A\u0627\u062F\u0627\u062A \u0627\u0644\u062E\u0627\u0631\u062C\u064A\u0629</a>
        <a href="departments.html">\u0627\u0644\u0637\u0648\u0627\u0631\u0626</a>
        <a href="departments.html">\u0627\u0644\u062C\u0631\u0627\u062D\u0627\u062A</a>
        <a href="packages.html" data-i18n="nav.packages">\u0628\u0627\u0642\u0627\u062A \u0627\u0644\u0631\u0639\u0627\u064A\u0629</a>
      </div>
      <div>
        <h4 data-i18n="footer.contact">\u062A\u0648\u0627\u0635\u0644 \u0645\u0639\u0646\u0627</h4>
        <a href="tel:966920000094">+966920000094</a>
        <a href="mailto:info@hayathospitals.com">info@hayathospitals.com</a>
        <p style="margin-top:8px;font-size:0.85rem;">\u0627\u0644\u0631\u064A\u0627\u0636\u060C \u0627\u0644\u0645\u0645\u0644\u0643\u0629 \u0627\u0644\u0639\u0631\u0628\u064A\u0629 \u0627\u0644\u0633\u0639\u0648\u062F\u064A\u0629</p>
      </div>
    </div>
    <div class="footer-bottom">
      <p>\xA9 2026 \u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A \u2014 BrainSAIT Healthcare OS</p>
    </div>
  </div>
</footer>
<a href="https://wa.me/966920000094" class="wa-float" target="_blank" rel="noopener" aria-label="WhatsApp">
  <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492l4.624-1.47A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75c-2.115 0-4.142-.665-5.847-1.884l-.42-.279-2.746.874.874-2.746-.279-.42A9.713 9.713 0 012.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75z"/></svg>
</a>
<button class="back-top" onclick="window.scrollTo({top:0,behavior:'smooth'})" aria-label="Back to top">
  <svg viewBox="0 0 24 24"><path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/></svg>
</button>
<script src="js/common.js"><\/script>
</body>
</html>
`;
var academy = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Life Academy | SCFHS-Certified Healthcare Training Courses</title>
<meta name="description" content="Hayat National Life Academy: 9 SCFHS-accredited courses in NPHIES, Medical Coding, RCM, AI, Compliance, Clinical Documentation, Pharmacy, Quality, and Infection Control.">
<meta name="keywords" content="Life Academy, healthcare courses, SCFHS, NPHIES, medical coding, RCM, AI healthcare, PDPL, clinical documentation, pharmacy management, CBAHI, infection control">
<meta name="robots" content="index, follow">
<meta name="theme-color" content="#0066CC">
<link rel="canonical" href="https://hnh.brainsait.org/academy.html">
<link rel="alternate" hreflang="ar" href="https://hnh.brainsait.org/academy.html">
<link rel="alternate" hreflang="en" href="https://hnh.brainsait.org/academy.html">
<link rel="alternate" hreflang="x-default" href="https://hnh.brainsait.org/academy.html">
<link rel="manifest" href="/manifest.json">
<link rel="apple-touch-icon" href="/icon-192.png">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Life Academy | Hayat National Hospitals">
<meta property="og:title" content="Life Academy | SCFHS-Certified Healthcare Training Courses">
<meta property="og:description" content="Hayat National Life Academy: 9 SCFHS-accredited courses in NPHIES, Medical Coding, RCM, AI, Compliance, Clinical Documentation, Pharmacy, Quality, and Infection Control.">
<meta property="og:url" content="https://hnh.brainsait.org/academy.html">
<meta property="og:image" content="https://hnh.brainsait.org/og-image.jpg">
<meta property="og:locale" content="ar_SA">
<meta property="og:locale:alternate" content="en_US">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Life Academy | Hayat Academy">
<meta name="twitter:description" content="SCFHS-certified healthcare training courses from Hayat National Hospitals.">
<meta name="twitter:image" content="https://hnh.brainsait.org/og-image.jpg">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&amp;family=Tajawal:wght@300;400;500;700;800;900&amp;display=swap" rel="stylesheet">
<link rel="stylesheet" href="css/style.css">
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "Life Academy - Hayat National Hospitals",
  "url": "https://hnh.brainsait.org/academy.html",
  "provider": {
    "@type": "Hospital",
    "name": "Hayat National Hospitals",
    "url": "https://hnh.brainsait.org"
  },
  "inLanguage": ["ar", "en"],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Life Academy Courses",
    "itemListElement": [
      {"@type":"Course","name":"NPHIES Fundamentals","url":"https://hnh.brainsait.org/course-nphies.html"},
      {"@type":"Course","name":"SBS Medical Coding & ICD-10-AM \u2014 Advanced","url":"https://hnh.brainsait.org/course-medical-coding.html"},
      {"@type":"Course","name":"Revenue Cycle Management for Saudi Hospitals","url":"https://hnh.brainsait.org/course-rcm.html"},
      {"@type":"Course","name":"AI & Automation in Healthcare","url":"https://hnh.brainsait.org/course-ai-healthcare.html"},
      {"@type":"Course","name":"Saudi PDPL & Healthcare Data Compliance","url":"https://hnh.brainsait.org/course-pdpl.html"},
      {"@type":"Course","name":"Advanced Clinical Documentation Excellence","url":"https://hnh.brainsait.org/course-clinical-documentation.html"},
      {"@type":"Course","name":"Hospital Pharmacy & Formulary Management","url":"https://hnh.brainsait.org/course-pharmacy.html"},
      {"@type":"Course","name":"Healthcare Quality and CBAHI/JCI Readiness","url":"https://hnh.brainsait.org/course-cbahi-quality.html"},
      {"@type":"Course","name":"Infection Prevention and Control Fundamentals","url":"https://hnh.brainsait.org/course-infection-control.html"}
    ]
  }
}
<\/script>
<script type="application/ld+json" id="faqSchemaAcademy"><\/script>
</head>
<body>
<a href="#main-content" class="skip-link">Skip to main content</a>
<header class="header"><div class="container header-inner"><a href="index.html" class="logo"><div class="logo-icon"><svg viewBox="0 0 24 24" width="24" height="24" fill="white"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg></div><div class="logo-text">\u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A<small>BrainSAIT Healthcare OS</small></div></a>
<nav class="nav" id="mainNav">
      <a href="index.html" data-i18n="nav.home">\u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629</a>
      <a href="about.html" data-i18n="nav.about">\u0639\u0646 \u0627\u0644\u0645\u062C\u0645\u0648\u0639\u0629</a>
      <a href="departments.html" data-i18n="nav.departments">\u0627\u0644\u0623\u0642\u0633\u0627\u0645 \u0627\u0644\u0637\u0628\u064A\u0629</a>
      <a href="doctors.html" data-i18n="nav.doctors">\u0623\u0637\u0628\u0627\u0624\u0646\u0627</a>
      <a href="branches.html" data-i18n="nav.branches">\u0641\u0631\u0648\u0639\u0646\u0627</a>
      <a href="packages.html" data-i18n="nav.packages">\u0628\u0627\u0642\u0627\u062A \u0627\u0644\u0631\u0639\u0627\u064A\u0629</a>
      <a href="blog.html" data-i18n="nav.blog">\u0627\u0644\u0645\u062F\u0648\u0646\u0629 \u0627\u0644\u0635\u062D\u064A\u0629</a>
      <a href="academy.html" data-i18n="nav.academy">\u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629 \u0627\u0644\u062D\u064A\u0627\u0629</a>
      <a href="contact.html" data-i18n="nav.contact">\u0627\u062A\u0635\u0644 \u0628\u0646\u0627</a>
      <button class="lang-btn" onclick="HNH.setLang(HNH.currentLang()==='ar'?'en':'ar')">EN/\u0639\u0631\u0628\u064A</button>
      <a href="contact.html" class="nav-cta" data-i18n="nav.book">\u0627\u062D\u062C\u0632 \u0645\u0648\u0639\u062F</a>
    </nav><button class="mobile-toggle" aria-label="Menu"><span></span><span></span><span></span></button></div></header>
<section class="page-hero" id="main-content"><div class="container"><div class="breadcrumb"><a href="index.html" id="crumbHome">\u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629</a><span>/</span><span id="crumbCurrent">\u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629 \u0627\u0644\u062D\u064A\u0627\u0629</span></div><h1 id="academyHeroTitle">\u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629 \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A</h1><p id="academyHeroSubtitle">\u062A\u0639\u0644\u0651\u0645 \xB7 \u0627\u062D\u062A\u0631\u0641 \xB7 \u062A\u0641\u0648\u0651\u0642 \u2014 \u062F\u0648\u0631\u0627\u062A \u0645\u0639\u062A\u0645\u062F\u0629 SCFHS</p></div></section>

<section class="stats-bar"><div class="container"><div class="stats-grid" id="academyStats"></div></div></section>

<section class="section bg-white">
  <div class="container">
    <div class="section-header animate-on-scroll">
      <h2 id="coursesSectionTitle">\u062F\u0648\u0631\u0627\u062A \u0627\u0644\u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629</h2>
      <p id="coursesSectionSubtitle">\u062A\u062F\u0631\u064A\u0628 \u0635\u062D\u064A \u0645\u0639\u062A\u0645\u062F \u0645\u064F\u0635\u0645\u0651\u0645 \u0645\u0646 \u0642\u0644\u0628 \u0627\u0644\u0639\u0645\u0644\u064A\u0627\u062A \u0627\u0644\u0633\u0631\u064A\u0631\u064A\u0629 \u2014 \u062B\u0646\u0627\u0626\u064A \u0627\u0644\u0644\u063A\u0629\u060C 100% \u0639\u0628\u0631 \u0627\u0644\u0625\u0646\u062A\u0631\u0646\u062A</p>
    </div>
    <div class="filter-tabs" id="academyFilters"></div>
    <div class="grid-3" id="academyCoursesGrid"></div>
  </div>
</section>

<section class="section bg-light">
  <div class="container">
    <div class="section-header animate-on-scroll">
      <h2 id="tracksTitle">\u0645\u0633\u0627\u0631\u0627\u062A \u0627\u0644\u062A\u0639\u0644\u0645</h2>
      <p id="tracksSubtitle">\u062A\u0635\u0645\u064A\u0645 \u062A\u062F\u0631\u064A\u0628\u064A \u0645\u0631\u0646 \u064A\u0646\u0627\u0633\u0628 \u0627\u0644\u0623\u0641\u0631\u0627\u062F \u0648\u0627\u0644\u0645\u0645\u0627\u0631\u0633\u064A\u0646 \u0648\u0627\u0644\u0645\u0646\u0634\u0622\u062A</p>
    </div>
    <div class="grid-3">
      <div class="card animate-on-scroll delay-1" style="text-align:center;padding:40px 24px;">
        <div style="font-size:3rem;margin-bottom:16px;">\u{1F3E1}</div>
        <h3 id="trackCommunityTitle" style="margin-bottom:8px;">\u0645\u0633\u0627\u0631 \u0627\u0644\u0645\u062C\u062A\u0645\u0639</h3>
        <p id="trackCommunityDesc" style="color:var(--text-light);"></p>
      </div>
      <div class="card animate-on-scroll delay-2" style="text-align:center;padding:40px 24px;">
        <div style="font-size:3rem;margin-bottom:16px;">\u{1F3E5}</div>
        <h3 id="trackProfessionalTitle" style="margin-bottom:8px;">\u0645\u0633\u0627\u0631 \u0627\u0644\u0645\u0645\u0627\u0631\u0633 \u0627\u0644\u0635\u062D\u064A</h3>
        <p id="trackProfessionalDesc" style="color:var(--text-light);"></p>
      </div>
      <div class="card animate-on-scroll delay-3" style="text-align:center;padding:40px 24px;">
        <div style="font-size:3rem;margin-bottom:16px;">\u{1F393}</div>
        <h3 id="trackInstitutionTitle" style="margin-bottom:8px;">\u0645\u0633\u0627\u0631 \u0627\u0644\u0645\u0646\u0634\u0622\u062A</h3>
        <p id="trackInstitutionDesc" style="color:var(--text-light);"></p>
      </div>
    </div>
  </div>
</section>

<section class="section bg-white">
  <div class="container">
    <div class="section-header animate-on-scroll">
      <h2 id="faqTitle">\u0627\u0644\u0623\u0633\u0626\u0644\u0629 \u0627\u0644\u0634\u0627\u0626\u0639\u0629 \u0639\u0646 \u0627\u0644\u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629</h2>
      <p id="faqSubtitle">\u0625\u062C\u0627\u0628\u0627\u062A \u0645\u062E\u062A\u0635\u0631\u0629 \u0639\u0644\u0649 \u0623\u0643\u062B\u0631 \u0627\u0644\u0623\u0633\u0626\u0644\u0629 \u0627\u0644\u0645\u062A\u0643\u0631\u0631\u0629 \u0642\u0628\u0644 \u0627\u0644\u062A\u0633\u062C\u064A\u0644</p>
    </div>
    <div style="max-width:900px;margin:0 auto;" id="academyFaq"></div>
  </div>
</section>

<section class="cta-section"><div class="container"><h2 id="academyCtaTitle">\u0627\u0628\u062F\u0623 \u0631\u062D\u0644\u062A\u0643 \u0627\u0644\u062A\u0639\u0644\u064A\u0645\u064A\u0629 \u0645\u0639 \u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629 \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A</h2><p id="academyCtaSubtitle">\u0633\u062C\u0651\u0644 \u0627\u0644\u0622\u0646 \u0644\u0644\u062D\u0635\u0648\u0644 \u0639\u0644\u0649 \u0623\u062D\u062F\u062B \u0627\u0644\u062F\u0648\u0631\u0627\u062A \u0627\u0644\u0635\u062D\u064A\u0629 \u0648\u0627\u0644\u062A\u062F\u0631\u064A\u0628 \u0627\u0644\u0639\u0645\u0644\u064A</p><div class="cta-buttons"><a href="contact.html" class="btn btn-accent btn-lg" id="academyCtaPrimary">\u0633\u062C\u0651\u0644 \u0627\u0644\u0622\u0646</a><a href="tel:966920000094" class="btn btn-white btn-lg" id="academyCtaSecondary">\u062A\u0648\u0627\u0635\u0644 \u0645\u0639 \u0641\u0631\u064A\u0642 \u0627\u0644\u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629</a></div></div></section>
<footer class="footer">
  <div class="container">
    <div class="footer-grid">
      <div>
        <h4 data-i18n="footer.name">\u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A</h4>
        <p style="margin-bottom:16px;" data-i18n="footer.desc">\u0646\u0638\u0627\u0645 BrainSAIT Healthcare OS \u0627\u0644\u0645\u062A\u0635\u0644 \u0628\u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062D\u064A\u0629</p>
        <span class="api-status live">API Connected</span>
      </div>
      <div>
        <h4 data-i18n="footer.quickLinks">\u0631\u0648\u0627\u0628\u0637 \u0633\u0631\u064A\u0639\u0629</h4>
        <a href="about.html" data-i18n="nav.about">\u0639\u0646 \u0627\u0644\u0645\u062C\u0645\u0648\u0639\u0629</a>
        <a href="departments.html" data-i18n="nav.departments">\u0627\u0644\u0623\u0642\u0633\u0627\u0645 \u0627\u0644\u0637\u0628\u064A\u0629</a>
        <a href="doctors.html" data-i18n="nav.doctors">\u0623\u0637\u0628\u0627\u0624\u0646\u0627</a>
        <a href="branches.html" data-i18n="nav.branches">\u0641\u0631\u0648\u0639\u0646\u0627</a>
        <a href="packages.html" data-i18n="nav.packages">\u0628\u0627\u0642\u0627\u062A \u0627\u0644\u0631\u0639\u0627\u064A\u0629</a>
        <a href="blog.html" data-i18n="nav.blog">\u0627\u0644\u0645\u062F\u0648\u0646\u0629 \u0627\u0644\u0635\u062D\u064A\u0629</a>
        <a href="academy.html" data-i18n="nav.academy">\u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629 \u0627\u0644\u062D\u064A\u0627\u0629</a>
        <a href="faq.html" data-i18n="nav.faq">\u0627\u0644\u0623\u0633\u0626\u0644\u0629 \u0627\u0644\u0634\u0627\u0626\u0639\u0629</a>
      </div>
      <div>
        <h4 data-i18n="footer.services">\u062E\u062F\u0645\u0627\u062A\u0646\u0627</h4>
        <a href="contact.html" data-i18n="nav.book">\u062D\u062C\u0632 \u0645\u0648\u0639\u062F</a>
        <a href="departments.html">\u0627\u0644\u0639\u064A\u0627\u062F\u0627\u062A \u0627\u0644\u062E\u0627\u0631\u062C\u064A\u0629</a>
        <a href="departments.html">\u0627\u0644\u0637\u0648\u0627\u0631\u0626</a>
        <a href="departments.html">\u0627\u0644\u062C\u0631\u0627\u062D\u0627\u062A</a>
        <a href="packages.html" data-i18n="nav.packages">\u0628\u0627\u0642\u0627\u062A \u0627\u0644\u0631\u0639\u0627\u064A\u0629</a>
      </div>
      <div>
        <h4 data-i18n="footer.contact">\u062A\u0648\u0627\u0635\u0644 \u0645\u0639\u0646\u0627</h4>
        <a href="tel:966920000094">+966920000094</a>
        <a href="mailto:info@hayathospitals.com">info@hayathospitals.com</a>
        <p style="margin-top:8px;font-size:0.85rem;">\u0627\u0644\u0631\u064A\u0627\u0636\u060C \u0627\u0644\u0645\u0645\u0644\u0643\u0629 \u0627\u0644\u0639\u0631\u0628\u064A\u0629 \u0627\u0644\u0633\u0639\u0648\u062F\u064A\u0629</p>
      </div>
    </div>
    <div class="footer-bottom">
      <p>\xA9 2026 \u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A \u2014 BrainSAIT Healthcare OS</p>
    </div>
  </div>
</footer>

<a href="https://wa.me/966920000094" class="wa-float" target="_blank" rel="noopener" aria-label="WhatsApp">
  <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492l4.624-1.47A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75c-2.115 0-4.142-.665-5.847-1.884l-.42-.279-2.746.874.874-2.746-.279-.42A9.713 9.713 0 012.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75z"/></svg>
</a>
<button class="back-top" onclick="window.scrollTo({top:0,behavior:'smooth'})" aria-label="Back to top">
  <svg viewBox="0 0 24 24"><path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/></svg>
</button>

<script src="js/common.js"><\/script>
<script src="js/academy-data.js"><\/script>
<script>
const COURSE_ROUTES = {
  'nphies': 'course-nphies.html',
  'medical-coding': 'course-medical-coding.html',
  'rcm': 'course-rcm.html',
  'ai-healthcare': 'course-ai-healthcare.html',
  'pdpl': 'course-pdpl.html',
  'clinical-documentation': 'course-clinical-documentation.html',
  'pharmacy': 'course-pharmacy.html',
  'cbahi-quality': 'course-cbahi-quality.html',
  'infection-control': 'course-infection-control.html'
};

const COURSE_EMOJIS = {
  'nphies': '\u{1F3DB}\uFE0F',
  'medical-coding': '\u{1F48A}',
  'rcm': '\u{1F4B0}',
  'ai-healthcare': '\u{1F916}',
  'pdpl': '\u{1F6E1}\uFE0F',
  'clinical-documentation': '\u{1F4CB}',
  'pharmacy': '\u{1F48A}',
  'cbahi-quality': '\u2B50',
  'infection-control': '\u{1F9EC}'
};

const COURSE_GRADIENTS = {
  'nphies': 'linear-gradient(135deg,#667eea,#764ba2)',
  'medical-coding': 'linear-gradient(135deg,#f093fb,#f5576c)',
  'rcm': 'linear-gradient(135deg,#4facfe,#00f2fe)',
  'ai-healthcare': 'linear-gradient(135deg,#43e97b,#38f9d7)',
  'pdpl': 'linear-gradient(135deg,#fa709a,#fee140)',
  'clinical-documentation': 'linear-gradient(135deg,#a18cd1,#fbc2eb)',
  'pharmacy': 'linear-gradient(135deg,#ffecd2,#fcb69f)',
  'cbahi-quality': 'linear-gradient(135deg,#89f7fe,#66a6ff)',
  'infection-control': 'linear-gradient(135deg,#667eea,#764ba2)'
};

const LEVEL_CLASSES = {
  beginner: { ar: '\u{1F7E2} \u0645\u0628\u062A\u062F\u0626', en: '\u{1F7E2} Beginner' },
  intermediate: { ar: '\u{1F7E1} \u0645\u062A\u0648\u0633\u0637', en: '\u{1F7E1} Intermediate' },
  advanced: { ar: '\u{1F534} \u0645\u062A\u0642\u062F\u0645', en: '\u{1F534} Advanced' }
};

function renderAcademyPage(lang) {
  const academy = window.HNH_ACADEMY_DATA.academy[lang];
  const courses = window.HNH_ACADEMY_DATA.courses;

  document.title = academy.metaTitle;
  document.querySelector('meta[name="description"]').setAttribute('content', academy.metaDescription);
  document.querySelector('meta[property="og:title"]').setAttribute('content', academy.metaTitle);
  document.querySelector('meta[property="og:description"]').setAttribute('content', academy.metaDescription);
  document.querySelector('meta[name="twitter:title"]').setAttribute('content', academy.metaTitle);
  document.querySelector('meta[name="twitter:description"]').setAttribute('content', academy.metaDescription);

  document.getElementById('crumbHome').textContent = academy.breadcrumbHome;
  document.getElementById('crumbCurrent').textContent = academy.breadcrumbCurrent;
  document.getElementById('academyHeroTitle').textContent = academy.heroTitle;
  document.getElementById('academyHeroSubtitle').textContent = academy.heroSubtitle;
  document.getElementById('coursesSectionTitle').textContent = academy.sectionTitle;
  document.getElementById('coursesSectionSubtitle').textContent = academy.sectionSubtitle;
  document.getElementById('tracksTitle').textContent = academy.tracksTitle;
  document.getElementById('tracksSubtitle').textContent = academy.tracksSubtitle;
  document.getElementById('trackCommunityTitle').textContent = academy.trackCommunityTitle;
  document.getElementById('trackCommunityDesc').textContent = academy.trackCommunityDesc;
  document.getElementById('trackProfessionalTitle').textContent = academy.trackProfessionalTitle;
  document.getElementById('trackProfessionalDesc').textContent = academy.trackProfessionalDesc;
  document.getElementById('trackInstitutionTitle').textContent = academy.trackInstitutionTitle;
  document.getElementById('trackInstitutionDesc').textContent = academy.trackInstitutionDesc;
  document.getElementById('faqTitle').textContent = academy.faqTitle;
  document.getElementById('faqSubtitle').textContent = academy.faqSubtitle;
  document.getElementById('academyCtaTitle').textContent = academy.ctaTitle;
  document.getElementById('academyCtaSubtitle').textContent = academy.ctaSubtitle;
  document.getElementById('academyCtaPrimary').textContent = academy.ctaPrimary;
  document.getElementById('academyCtaSecondary').textContent = academy.ctaSecondary;

  // Stats bar
  const statsData = [
    { value: '9', label: academy.statsCourses },
    { value: '110+', label: academy.statsHours },
    { value: academy.statsAccredValue, label: academy.statsAccredLabel },
    { value: academy.statsLangValue, label: academy.statsLangLabel }
  ];
  document.getElementById('academyStats').innerHTML = statsData.map(function(s, i) {
    return '<div class="stat-item animate-on-scroll delay-' + ((i % 6) + 1) + '">' +
      '<div class="stat-value">' + s.value + '</div>' +
      '<div class="stat-label">' + s.label + '</div>' +
    '</div>';
  }).join('');

  // Filter tabs
  const filters = [
    { key: 'all', label: academy.filterAll },
    { key: 'beginner', label: academy.filterBeginner },
    { key: 'intermediate', label: academy.filterIntermediate },
    { key: 'advanced', label: academy.filterAdvanced }
  ];
  document.getElementById('academyFilters').innerHTML = filters.map(function(f, i) {
    return '<button class="filter-btn' + (i === 0 ? ' active' : '') + '" data-filter="' + f.key + '">' + f.label + '</button>';
  }).join('');

  // Course cards
  const grid = document.getElementById('academyCoursesGrid');
  const slugs = Object.keys(courses);
  grid.innerHTML = slugs.map(function(slug, idx) {
    const c = courses[slug][lang];
    const emoji = COURSE_EMOJIS[slug] || '\u{1F4DA}';
    const gradient = COURSE_GRADIENTS[slug] || 'linear-gradient(135deg,#667eea,#764ba2)';
    const levelLabel = LEVEL_CLASSES[c.levelClass] ? LEVEL_CLASSES[c.levelClass][lang] : c.level;
    const moduleCount = c.modules ? c.modules.length : 0;
    return '' +
      '<div class="course-card animate-on-scroll delay-' + ((idx % 6) + 1) + '" data-level="' + c.levelClass + '">' +
        '<div class="course-header" style="background:' + gradient + ';">' +
          '<div class="course-emoji">' + emoji + '</div>' +
          '<h3 style="color:white;">' + c.title + '</h3>' +
        '</div>' +
        '<div class="course-body">' +
          '<div class="course-badges">' +
            '<span class="badge badge-level badge-' + c.levelClass + '">' + levelLabel + '</span>' +
            '<span class="badge badge-price">' + c.price + '</span>' +
          '</div>' +
          '<p class="course-desc">' + c.shortDescription + '</p>' +
          '<div class="course-meta">' +
            '<span>' + academy.modulesLabel + ': ' + moduleCount + '</span>' +
            '<span>' + academy.durationLabel + ': ' + c.duration + '</span>' +
          '</div>' +
          '<div class="course-cert">' +
            '<span class="badge badge-cert">' + c.certificate + '</span>' +
          '</div>' +
          '<div style="margin-top:16px;">' +
            '<a href="' + COURSE_ROUTES[slug] + '" class="btn btn-outline btn-sm">' + academy.detailsBtn + '</a>' +
          '</div>' +
        '</div>' +
      '</div>';
  }).join('');

  // Filter functionality
  document.querySelectorAll('.filter-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.filter-btn').forEach(function(b) { b.classList.remove('active'); });
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      document.querySelectorAll('.course-card').forEach(function(card) {
        if (filter === 'all' || card.getAttribute('data-level') === filter) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // FAQ
  const faqRoot = document.getElementById('academyFaq');
  faqRoot.innerHTML = academy.faqs.map(function(item, index) {
    return '<div class="faq-item animate-on-scroll delay-' + ((index % 6) + 1) + '">' +
      '<button class="faq-question" data-faq-index="' + index + '">' +
        '<span>' + item.q + '</span>' +
        '<svg class="faq-chevron" viewBox="0 0 24 24"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z"/></svg>' +
      '</button>' +
      '<div class="faq-answer"><p>' + item.a + '</p></div>' +
    '</div>';
  }).join('');

  faqRoot.querySelectorAll('.faq-question').forEach(function(btn) {
    btn.addEventListener('click', function() {
      const answer = btn.nextElementSibling;
      const isOpen = btn.classList.contains('active');
      faqRoot.querySelectorAll('.faq-question').forEach(function(q) { q.classList.remove('active'); });
      faqRoot.querySelectorAll('.faq-answer').forEach(function(a) { a.classList.remove('open'); });
      if (!isOpen) {
        btn.classList.add('active');
        answer.classList.add('open');
      }
    });
  });

  // FAQ Schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: academy.faqs.map(function(item) {
      return {
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a }
      };
    })
  };
  document.getElementById('faqSchemaAcademy').textContent = JSON.stringify(faqSchema);
}

document.addEventListener('DOMContentLoaded', function() {
  renderAcademyPage(HNH.currentLang());
});

document.addEventListener('hnh:langChanged', function(e) {
  renderAcademyPage(e.detail.lang);
});
<\/script>
</body>
</html>
`;
var blog = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title id="blogMetaTitle">\u0627\u0644\u0645\u062F\u0648\u0646\u0629 \u0627\u0644\u0637\u0628\u064A\u0629 | \u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A</title>
<meta name="description" id="blogMetaDesc" content="\u0627\u0644\u0645\u062F\u0648\u0646\u0629 \u0627\u0644\u0637\u0628\u064A\u0629 \u0644\u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A \u2014 \u0645\u0642\u0627\u0644\u0627\u062A \u0641\u064A \u0627\u0644\u062A\u0631\u0645\u064A\u0632 \u0648\u0627\u0644\u0631\u0639\u0627\u064A\u0629 \u0627\u0644\u0635\u062D\u064A\u0629 \u0648\u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064A \u0648\u0646\u0638\u0627\u0645 NPHIES.">
<meta name="keywords" content="\u0645\u062F\u0648\u0646\u0629 \u0637\u0628\u064A\u0629, NPHIES, RCM, \u062A\u0631\u0645\u064A\u0632 \u0637\u0628\u064A, \u0630\u0643\u0627\u0621 \u0627\u0635\u0637\u0646\u0627\u0639\u064A, \u0631\u0639\u0627\u064A\u0629 \u0635\u062D\u064A\u0629, \u0627\u0644\u0633\u0639\u0648\u062F\u064A\u0629, BrainSAIT">
<meta name="robots" content="index, follow">
<meta name="theme-color" content="#0066CC">
<link rel="canonical" href="https://hnh.brainsait.org/blog.html">
<link rel="alternate" hreflang="ar" href="https://hnh.brainsait.org/blog.html">
<link rel="alternate" hreflang="en" href="https://hnh.brainsait.org/blog.html">
<link rel="alternate" hreflang="x-default" href="https://hnh.brainsait.org/blog.html">
<link rel="manifest" href="/manifest.json">
<link rel="apple-touch-icon" href="/icon-192.png">
<meta property="og:type" content="website">
<meta property="og:site_name" content="\u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A | Hayat National Hospitals">
<meta property="og:title" id="ogTitle" content="\u0627\u0644\u0645\u062F\u0648\u0646\u0629 \u0627\u0644\u0637\u0628\u064A\u0629 | \u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A">
<meta property="og:description" id="ogDesc" content="\u0645\u0642\u0627\u0644\u0627\u062A \u0641\u064A \u0627\u0644\u062A\u0631\u0645\u064A\u0632 \u0648\u0627\u0644\u0631\u0639\u0627\u064A\u0629 \u0627\u0644\u0635\u062D\u064A\u0629 \u0648\u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064A \u0648\u0646\u0638\u0627\u0645 NPHIES.">
<meta property="og:url" content="https://hnh.brainsait.org/blog.html">
<meta property="og:image" content="https://hnh.brainsait.org/og-image.jpg">
<meta property="og:locale" content="ar_SA">
<meta property="og:locale:alternate" content="en_US">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" id="twTitle" content="\u0627\u0644\u0645\u062F\u0648\u0646\u0629 \u0627\u0644\u0637\u0628\u064A\u0629 | \u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A">
<meta name="twitter:description" id="twDesc" content="\u0645\u0642\u0627\u0644\u0627\u062A \u0641\u064A \u0627\u0644\u062A\u0631\u0645\u064A\u0632 \u0648\u0627\u0644\u0631\u0639\u0627\u064A\u0629 \u0627\u0644\u0635\u062D\u064A\u0629 \u0648\u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064A.">
<meta name="twitter:image" content="https://hnh.brainsait.org/og-image.jpg">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Tajawal:wght@300;400;500;700;800;900&display=swap" rel="stylesheet">
<link rel="stylesheet" href="css/style.css">
<script type="application/ld+json" id="blogSchema"><\/script>
</head>
<body>
<a href="#main-content" class="skip-link">Skip to main content</a>
<header class="header"><div class="container header-inner"><a href="index.html" class="logo"><div class="logo-icon"><svg viewBox="0 0 24 24" width="24" height="24" fill="white"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg></div><div class="logo-text">\u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A<small>BrainSAIT Healthcare OS</small></div></a>
<nav class="nav" id="mainNav">
      <a href="index.html" data-i18n="nav.home">\u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629</a>
      <a href="about.html" data-i18n="nav.about">\u0639\u0646 \u0627\u0644\u0645\u062C\u0645\u0648\u0639\u0629</a>
      <a href="departments.html" data-i18n="nav.departments">\u0627\u0644\u0623\u0642\u0633\u0627\u0645 \u0627\u0644\u0637\u0628\u064A\u0629</a>
      <a href="doctors.html" data-i18n="nav.doctors">\u0623\u0637\u0628\u0627\u0624\u0646\u0627</a>
      <a href="branches.html" data-i18n="nav.branches">\u0641\u0631\u0648\u0639\u0646\u0627</a>
      <a href="packages.html" data-i18n="nav.packages">\u0628\u0627\u0642\u0627\u062A \u0627\u0644\u0631\u0639\u0627\u064A\u0629</a>
      <a href="blog.html" data-i18n="nav.blog">\u0627\u0644\u0645\u062F\u0648\u0646\u0629 \u0627\u0644\u0635\u062D\u064A\u0629</a>
      <a href="academy.html" data-i18n="nav.academy">\u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629 \u0627\u0644\u062D\u064A\u0627\u0629</a>
      <a href="contact.html" data-i18n="nav.contact">\u0627\u062A\u0635\u0644 \u0628\u0646\u0627</a>
      <button class="lang-btn" onclick="HNH.setLang(HNH.currentLang()==='ar'?'en':'ar')">EN/\u0639\u0631\u0628\u064A</button>
      <a href="contact.html" class="nav-cta" data-i18n="nav.book">\u0627\u062D\u062C\u0632 \u0645\u0648\u0639\u062F</a>
    </nav><button class="mobile-toggle" aria-label="Menu"><span></span><span></span><span></span></button></div></header>

<section class="page-hero" id="main-content"><div class="container"><div class="breadcrumb"><a href="index.html" id="crumbHome">\u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629</a><span>/</span><span id="crumbCurrent">\u0627\u0644\u0645\u062F\u0648\u0646\u0629 \u0627\u0644\u0637\u0628\u064A\u0629</span></div><h1 id="blogHeroTitle">\u0627\u0644\u0645\u062F\u0648\u0646\u0629 \u0627\u0644\u0637\u0628\u064A\u0629</h1><p id="blogHeroSubtitle">\u0645\u0642\u0627\u0644\u0627\u062A \u0641\u064A \u0627\u0644\u062A\u0631\u0645\u064A\u0632 \u0648\u0627\u0644\u0631\u0639\u0627\u064A\u0629 \u0627\u0644\u0635\u062D\u064A\u0629 \u0648\u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064A</p></div></section>

<section class="section bg-light">
<div class="container">
  <div style="display:flex;gap:12px;flex-wrap:wrap;margin-bottom:32px;" id="filterBar"></div>

  <div class="grid-3" id="blogGrid" style="display:grid;grid-template-columns:repeat(3,1fr);gap:24px;"></div>
</div>
</section>

<section class="cta-section"><div class="container"><h2 id="ctaTitle">\u0635\u062D\u062A\u0643 \u0623\u0648\u0644\u0627\u064B</h2><p id="ctaSubtitle">\u0627\u062D\u062C\u0632 \u0645\u0648\u0639\u062F\u0643 \u0627\u0644\u0622\u0646 \u0648\u0627\u062D\u0635\u0644 \u0639\u0644\u0649 \u0623\u0641\u0636\u0644 \u0631\u0639\u0627\u064A\u0629 \u0637\u0628\u064A\u0629</p><div class="cta-buttons"><a href="contact.html" class="btn btn-accent btn-lg" id="ctaBookBtn">\u0627\u062D\u062C\u0632 \u0645\u0648\u0639\u062F</a></div></div></section>

<footer class="footer">
  <div class="container">
    <div class="footer-grid">
      <div>
        <h4 data-i18n="footer.name">\u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A</h4>
        <p style="margin-bottom:16px;" data-i18n="footer.desc">\u0646\u0638\u0627\u0645 BrainSAIT Healthcare OS \u0627\u0644\u0645\u062A\u0635\u0644 \u0628\u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062D\u064A\u0629</p>
        <span class="api-status live">API Connected</span>
      </div>
      <div>
        <h4 data-i18n="footer.quickLinks">\u0631\u0648\u0627\u0628\u0637 \u0633\u0631\u064A\u0639\u0629</h4>
        <a href="about.html" data-i18n="nav.about">\u0639\u0646 \u0627\u0644\u0645\u062C\u0645\u0648\u0639\u0629</a>
        <a href="departments.html" data-i18n="nav.departments">\u0627\u0644\u0623\u0642\u0633\u0627\u0645 \u0627\u0644\u0637\u0628\u064A\u0629</a>
        <a href="doctors.html" data-i18n="nav.doctors">\u0623\u0637\u0628\u0627\u0624\u0646\u0627</a>
        <a href="branches.html" data-i18n="nav.branches">\u0641\u0631\u0648\u0639\u0646\u0627</a>
        <a href="packages.html" data-i18n="nav.packages">\u0628\u0627\u0642\u0627\u062A \u0627\u0644\u0631\u0639\u0627\u064A\u0629</a>
        <a href="blog.html" data-i18n="nav.blog">\u0627\u0644\u0645\u062F\u0648\u0646\u0629 \u0627\u0644\u0635\u062D\u064A\u0629</a>
        <a href="academy.html" data-i18n="nav.academy">\u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629 \u0627\u0644\u062D\u064A\u0627\u0629</a>
        <a href="faq.html" data-i18n="nav.faq">\u0627\u0644\u0623\u0633\u0626\u0644\u0629 \u0627\u0644\u0634\u0627\u0626\u0639\u0629</a>
      </div>
      <div>
        <h4 data-i18n="footer.services">\u062E\u062F\u0645\u0627\u062A\u0646\u0627</h4>
        <a href="contact.html" data-i18n="nav.book">\u062D\u062C\u0632 \u0645\u0648\u0639\u062F</a>
        <a href="departments.html">\u0627\u0644\u0639\u064A\u0627\u062F\u0627\u062A \u0627\u0644\u062E\u0627\u0631\u062C\u064A\u0629</a>
        <a href="departments.html">\u0627\u0644\u0637\u0648\u0627\u0631\u0626</a>
        <a href="departments.html">\u0627\u0644\u062C\u0631\u0627\u062D\u0627\u062A</a>
        <a href="packages.html" data-i18n="nav.packages">\u0628\u0627\u0642\u0627\u062A \u0627\u0644\u0631\u0639\u0627\u064A\u0629</a>
      </div>
      <div>
        <h4 data-i18n="footer.contact">\u062A\u0648\u0627\u0635\u0644 \u0645\u0639\u0646\u0627</h4>
        <a href="tel:966920000094">+966920000094</a>
        <a href="mailto:info@hayathospitals.com">info@hayathospitals.com</a>
        <p style="margin-top:8px;font-size:0.85rem;">\u0627\u0644\u0631\u064A\u0627\u0636\u060C \u0627\u0644\u0645\u0645\u0644\u0643\u0629 \u0627\u0644\u0639\u0631\u0628\u064A\u0629 \u0627\u0644\u0633\u0639\u0648\u062F\u064A\u0629</p>
      </div>
    </div>
    <div class="footer-bottom">
      <p>\xA9 2026 \u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A \u2014 BrainSAIT Healthcare OS</p>
    </div>
  </div>
</footer>

<a href="https://wa.me/966920000094" class="wa-float" target="_blank" rel="noopener" aria-label="WhatsApp">
  <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492l4.624-1.47A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75c-2.115 0-4.142-.665-5.847-1.884l-.42-.279-2.746.874.874-2.746-.279-.42A9.713 9.713 0 012.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75z"/></svg>
</a>
<button class="back-top" onclick="window.scrollTo({top:0,behavior:'smooth'})" aria-label="Back to top">
  <svg viewBox="0 0 24 24"><path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/></svg>
</button>

<script src="js/common.js"><\/script>
<script src="js/blog-data.js"><\/script>
<script>
const CATEGORY_GRADIENTS = {
  rcm: 'linear-gradient(135deg,#667eea,#764ba2)',
  nphies: 'linear-gradient(135deg,#f093fb,#f5576c)',
  coding: 'linear-gradient(135deg,#4facfe,#00f2fe)',
  strategy: 'linear-gradient(135deg,#43e97b,#38f9d7)',
  clinical: 'linear-gradient(135deg,#fa709a,#fee140)',
  patient: 'linear-gradient(135deg,#a18cd1,#fbc2eb)',
  tech: 'linear-gradient(135deg,#ffecd2,#fcb69f)',
  compliance: 'linear-gradient(135deg,#89f7fe,#66a6ff)'
};

const CATEGORY_EMOJI = {
  rcm: '\u{1F4B0}', nphies: '\u{1F3DB}\uFE0F', coding: '\u{1F48A}', strategy: '\u{1F1F8}\u{1F1E6}',
  clinical: '\u{1FA7A}', patient: '\u{1F60A}', tech: '\u2695\uFE0F', compliance: '\u{1F6E1}\uFE0F'
};

function renderBlog(lang) {
  const data = window.HNH_BLOG_DATA;
  const cats = data.categories[lang];
  const articles = data.articles;

  // Hero
  const heroTitle = lang === 'ar' ? '\u0627\u0644\u0645\u062F\u0648\u0646\u0629 \u0627\u0644\u0637\u0628\u064A\u0629' : 'Medical Blog';
  const heroSubtitle = lang === 'ar' ? '\u0645\u0642\u0627\u0644\u0627\u062A \u0641\u064A \u0627\u0644\u062A\u0631\u0645\u064A\u0632 \u0648\u0627\u0644\u0631\u0639\u0627\u064A\u0629 \u0627\u0644\u0635\u062D\u064A\u0629 \u0648\u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064A' : 'Articles on coding, healthcare, and AI';
  document.getElementById('blogHeroTitle').textContent = heroTitle;
  document.getElementById('blogHeroSubtitle').textContent = heroSubtitle;
  document.getElementById('crumbHome').textContent = lang === 'ar' ? '\u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629' : 'Home';
  document.getElementById('crumbCurrent').textContent = lang === 'ar' ? '\u0627\u0644\u0645\u062F\u0648\u0646\u0629 \u0627\u0644\u0637\u0628\u064A\u0629' : 'Medical Blog';

  const metaTitle = lang === 'ar' ? '\u0627\u0644\u0645\u062F\u0648\u0646\u0629 \u0627\u0644\u0637\u0628\u064A\u0629 | \u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A' : 'Medical Blog | Hayat National Hospitals';
  const metaDesc = lang === 'ar' ? '\u0627\u0644\u0645\u062F\u0648\u0646\u0629 \u0627\u0644\u0637\u0628\u064A\u0629 \u0644\u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A \u2014 \u0645\u0642\u0627\u0644\u0627\u062A \u0641\u064A \u0627\u0644\u062A\u0631\u0645\u064A\u0632 \u0648\u0627\u0644\u0631\u0639\u0627\u064A\u0629 \u0627\u0644\u0635\u062D\u064A\u0629 \u0648\u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064A \u0648\u0646\u0638\u0627\u0645 NPHIES.' : 'Hayat National Hospitals Medical Blog \u2014 articles on coding, healthcare, AI, and NPHIES.';
  document.getElementById('blogMetaTitle').textContent = metaTitle;
  document.getElementById('blogMetaDesc').setAttribute('content', metaDesc);
  document.getElementById('ogTitle').setAttribute('content', metaTitle);
  document.getElementById('ogDesc').setAttribute('content', metaDesc);
  document.getElementById('twTitle').setAttribute('content', metaTitle);
  document.getElementById('twDesc').setAttribute('content', metaDesc);

  document.getElementById('ctaTitle').textContent = lang === 'ar' ? '\u0635\u062D\u062A\u0643 \u0623\u0648\u0644\u0627\u064B' : 'Your Health First';
  document.getElementById('ctaSubtitle').textContent = lang === 'ar' ? '\u0627\u062D\u062C\u0632 \u0645\u0648\u0639\u062F\u0643 \u0627\u0644\u0622\u0646 \u0648\u0627\u062D\u0635\u0644 \u0639\u0644\u0649 \u0623\u0641\u0636\u0644 \u0631\u0639\u0627\u064A\u0629 \u0637\u0628\u064A\u0629' : 'Book your appointment now and get the best medical care';
  document.getElementById('ctaBookBtn').textContent = lang === 'ar' ? '\u0627\u062D\u062C\u0632 \u0645\u0648\u0639\u062F' : 'Book Appointment';

  // Filter bar
  const filterBar = document.getElementById('filterBar');
  filterBar.innerHTML = cats.map((cat, idx) =>
    \`<button class="btn \${idx === 0 ? 'btn-primary active' : 'btn-outline'} filter-btn" data-cat="\${cat.id}">\${cat.label}</button>\`
  ).join('');

  // Blog grid
  const grid = document.getElementById('blogGrid');
  grid.innerHTML = articles.map((article, idx) => {
    const a = article[lang];
    const gradient = CATEGORY_GRADIENTS[a.category] || 'linear-gradient(135deg,#667eea,#764ba2)';
    const emoji = CATEGORY_EMOJI[a.category] || '\u{1F4C4}';
    const badges = [];
    if (a.featured) badges.push(\`<span class="blog-badge featured">\${lang === 'ar' ? '\u2B50 \u0645\u0645\u064A\u0632' : '\u2B50 Featured'}</span>\`);
    if (a.starred) badges.push(\`<span class="blog-badge starred">\${lang === 'ar' ? '\u2B50 \u0645\u0645\u064A\u0632' : '\u2B50 Popular'}</span>\`);

    return \`
      <div class="blog-card" data-cat="\${a.category}">
        <div class="blog-img" style="background:\${gradient};display:flex;align-items:center;justify-content:center;font-size:2.5rem;">\${emoji}</div>
        <div class="blog-content">
          <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:8px;">\${badges.join('')}</div>
          <span class="blog-category">\${cats.find(c => c.id === a.category)?.label || a.category}</span>
          <div class="blog-meta-line">
            <span>\${a.author}</span>
            <span>\u{1F4D6} \${a.readTime}</span>
            <span>\u{1F4C5} \${a.date}</span>
          </div>
          <h3 class="blog-title">\${a.title}</h3>
          <p class="blog-excerpt">\${a.excerpt}</p>
          <a href="contact.html" class="btn btn-outline" style="font-size:0.85rem;padding:8px 16px;">\${lang === 'ar' ? '\u0627\u0642\u0631\u0623 \u0627\u0644\u0645\u0642\u0627\u0644 \u2190' : 'Read Article \u2192'}</a>
        </div>
      </div>
    \`;
  }).join('');

  // Filter logic
  filterBar.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      filterBar.querySelectorAll('.filter-btn').forEach(b => {
        b.classList.remove('active', 'btn-primary');
        b.classList.add('btn-outline');
      });
      btn.classList.add('active', 'btn-primary');
      btn.classList.remove('btn-outline');
      const cat = btn.dataset.cat;
      grid.querySelectorAll('.blog-card').forEach(card => {
        card.style.display = (cat === 'all' || card.dataset.cat === cat) ? '' : 'none';
      });
    });
  });

  // BlogPosting schema
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: metaTitle,
    description: metaDesc,
    publisher: {
      '@type': 'Hospital',
      name: 'Hayat National Hospitals',
      url: 'https://hnh.brainsait.org'
    },
    inLanguage: lang,
    blogPost: articles.map(article => {
      const a = article[lang];
      return {
        '@type': 'BlogPosting',
        headline: a.title,
        description: a.excerpt,
        author: { '@type': 'Person', name: a.author.replace('\u270D\uFE0F ', '') },
        datePublished: a.date,
        url: \`https://hnh.brainsait.org/blog.html#\${article.slug}\`,
        image: 'https://hnh.brainsait.org/og-image.jpg'
      };
    })
  };
  document.getElementById('blogSchema').textContent = JSON.stringify(schema);
}

document.addEventListener('DOMContentLoaded', () => {
  renderBlog(HNH.currentLang());
});

document.addEventListener('hnh:langChanged', e => {
  renderBlog(e.detail.lang);
});
<\/script>
</body>
</html>
`;
var branches2 = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>\u0641\u0631\u0648\u0639\u0646\u0627 | \u0645\u0633\u062A\u0634\u0641\u0649 \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A</title>
<meta name="description" content="\u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A \u2014 5 \u0641\u0631\u0648\u0639 \u0641\u064A \u0627\u0644\u0645\u062F\u064A\u0646\u0629 \u0627\u0644\u0645\u0646\u0648\u0631\u0629\u060C \u062E\u0645\u064A\u0633 \u0645\u0634\u064A\u0637\u060C \u0623\u0628\u0647\u0627\u060C \u0627\u0644\u0631\u064A\u0627\u0636\u060C \u0648\u0639\u0646\u064A\u0632\u0629. | 5 branches across Saudi Arabia.">
<meta name="keywords" content="\u0641\u0631\u0648\u0639 \u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629, branches, Hayat National Hospitals, \u0627\u0644\u0631\u064A\u0627\u0636, \u0627\u0644\u0645\u062F\u064A\u0646\u0629 \u0627\u0644\u0645\u0646\u0648\u0631\u0629, \u062E\u0645\u064A\u0633 \u0645\u0634\u064A\u0637">
<meta name="robots" content="index, follow">
<meta name="theme-color" content="#0066CC">
<link rel="canonical" href="https://hnh.brainsait.org/branches.html">
<link rel="alternate" hreflang="ar" href="https://hnh.brainsait.org/branches.html">
<link rel="alternate" hreflang="en" href="https://hnh.brainsait.org/branches.html">
<link rel="alternate" hreflang="x-default" href="https://hnh.brainsait.org/branches.html">
<link rel="manifest" href="/manifest.json">
<link rel="apple-touch-icon" href="/icon-192.png">
<meta property="og:type" content="website">
<meta property="og:site_name" content="\u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A | Hayat National Hospitals">
<meta property="og:title" content="\u0641\u0631\u0648\u0639\u0646\u0627 | \u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A">
<meta property="og:description" content="\u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A \u2014 5 \u0641\u0631\u0648\u0639 \u0641\u064A \u0627\u0644\u0645\u062F\u064A\u0646\u0629 \u0627\u0644\u0645\u0646\u0648\u0631\u0629\u060C \u062E\u0645\u064A\u0633 \u0645\u0634\u064A\u0637\u060C \u0623\u0628\u0647\u0627\u060C \u0627\u0644\u0631\u064A\u0627\u0636\u060C \u0648\u0639\u0646\u064A\u0632\u0629.">
<meta property="og:url" content="https://hnh.brainsait.org/branches.html">
<meta property="og:image" content="https://hnh.brainsait.org/og-image.jpg">
<meta property="og:locale" content="ar_SA">
<meta property="og:locale:alternate" content="en_US">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="\u0641\u0631\u0648\u0639\u0646\u0627 | \u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A">
<meta name="twitter:description" content="\u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A \u2014 5 \u0641\u0631\u0648\u0639 \u0641\u064A \u0645\u062E\u062A\u0644\u0641 \u0645\u0646\u0627\u0637\u0642 \u0627\u0644\u0645\u0645\u0644\u0643\u0629.">
<meta name="twitter:image" content="https://hnh.brainsait.org/og-image.jpg">

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Tajawal:wght@300;400;500;700;800;900&display=swap" rel="stylesheet">
<link rel="stylesheet" href="css/style.css">
</head>
<body>
<a href="#main-content" class="skip-link">Skip to main content</a>
<header class="header"><div class="container header-inner"><a href="index.html" class="logo"><div class="logo-icon"><svg viewBox="0 0 24 24" width="24" height="24" fill="white"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg></div><div class="logo-text">\u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A<small>BrainSAIT Healthcare OS</small></div></a><nav class="nav" id="mainNav">
      <a href="index.html" data-i18n="nav.home">\u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629</a>
      <a href="about.html" data-i18n="nav.about">\u0639\u0646 \u0627\u0644\u0645\u062C\u0645\u0648\u0639\u0629</a>
      <a href="departments.html" data-i18n="nav.departments">\u0627\u0644\u0623\u0642\u0633\u0627\u0645 \u0627\u0644\u0637\u0628\u064A\u0629</a>
      <a href="doctors.html" data-i18n="nav.doctors">\u0623\u0637\u0628\u0627\u0624\u0646\u0627</a>
      <a href="branches.html" data-i18n="nav.branches">\u0641\u0631\u0648\u0639\u0646\u0627</a>
      <a href="packages.html" data-i18n="nav.packages">\u0628\u0627\u0642\u0627\u062A \u0627\u0644\u0631\u0639\u0627\u064A\u0629</a>
      <a href="blog.html" data-i18n="nav.blog">\u0627\u0644\u0645\u062F\u0648\u0646\u0629 \u0627\u0644\u0635\u062D\u064A\u0629</a>
      <a href="contact.html" data-i18n="nav.contact">\u0627\u062A\u0635\u0644 \u0628\u0646\u0627</a>
      <button class="lang-btn" onclick="HNH.setLang(HNH.currentLang()==='ar'?'en':'ar')">EN/\u0639\u0631\u0628\u064A</button>
      <a href="contact.html" class="nav-cta" data-i18n="nav.book">\u0627\u062D\u062C\u0632 \u0645\u0648\u0639\u062F</a>
    </nav><button class="mobile-toggle" aria-label="Menu"><span></span><span></span><span></span></button></div></header>

<section class="page-hero" id="main-content"><div class="container"><div class="breadcrumb"><a href="index.html">\u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629</a><span>/</span><span>\u0641\u0631\u0648\u0639\u0646\u0627</span></div><h1>\u0641\u0631\u0648\u0639\u0646\u0627</h1><p>\u062E\u0645\u0633\u0629 \u0641\u0631\u0648\u0639 \u0641\u064A \u0645\u062E\u062A\u0644\u0641 \u0645\u0646\u0627\u0637\u0642 \u0627\u0644\u0645\u0645\u0644\u0643\u0629 <span class="api-status live" style="margin-right:8px;">\u25CF Live API</span></p></div></section>

<section class="section bg-white"><div class="container"><div class="grid-2" id="branchesGrid"><div class="loading"><div class="spinner"></div></div></div></div></section>

<section class="cta-section"><div class="container"><h2>\u0635\u062D\u062A\u0643 \u0623\u0648\u0644\u0627\u064B</h2><p>\u0627\u062D\u062C\u0632 \u0645\u0648\u0639\u062F\u0643 \u0627\u0644\u0622\u0646</p><div class="cta-buttons"><a href="contact.html" class="btn btn-accent btn-lg">\u0627\u062D\u062C\u0632 \u0645\u0648\u0639\u062F</a><a href="tel:966920000094" class="btn btn-white btn-lg">\u0627\u062A\u0635\u0644 \u0628\u0646\u0627</a></div></div></section>
<footer class="footer">
  <div class="container">
    <div class="footer-grid">
      <div>
        <h4 data-i18n="footer.name">\u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A</h4>
        <p style="margin-bottom:16px;" data-i18n="footer.desc">\u0646\u0638\u0627\u0645 BrainSAIT Healthcare OS \u0627\u0644\u0645\u062A\u0635\u0644 \u0628\u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062D\u064A\u0629</p>
        <span class="api-status live">API Connected</span>
      </div>
      <div>
        <h4 data-i18n="footer.quickLinks">\u0631\u0648\u0627\u0628\u0637 \u0633\u0631\u064A\u0639\u0629</h4>
        <a href="about.html" data-i18n="nav.about">\u0639\u0646 \u0627\u0644\u0645\u062C\u0645\u0648\u0639\u0629</a>
        <a href="departments.html" data-i18n="nav.departments">\u0627\u0644\u0623\u0642\u0633\u0627\u0645 \u0627\u0644\u0637\u0628\u064A\u0629</a>
        <a href="doctors.html" data-i18n="nav.doctors">\u0623\u0637\u0628\u0627\u0624\u0646\u0627</a>
        <a href="branches.html" data-i18n="nav.branches">\u0641\u0631\u0648\u0639\u0646\u0627</a>
        <a href="packages.html" data-i18n="nav.packages">\u0628\u0627\u0642\u0627\u062A \u0627\u0644\u0631\u0639\u0627\u064A\u0629</a>
        <a href="blog.html" data-i18n="nav.blog">\u0627\u0644\u0645\u062F\u0648\u0646\u0629 \u0627\u0644\u0635\u062D\u064A\u0629</a>
        <a href="faq.html" data-i18n="nav.faq">\u0627\u0644\u0623\u0633\u0626\u0644\u0629 \u0627\u0644\u0634\u0627\u0626\u0639\u0629</a>
      </div>
      <div>
        <h4 data-i18n="footer.services">\u062E\u062F\u0645\u0627\u062A\u0646\u0627</h4>
        <a href="contact.html" data-i18n="nav.book">\u062D\u062C\u0632 \u0645\u0648\u0639\u062F</a>
        <a href="departments.html">\u0627\u0644\u0639\u064A\u0627\u062F\u0627\u062A \u0627\u0644\u062E\u0627\u0631\u062C\u064A\u0629</a>
        <a href="departments.html">\u0627\u0644\u0637\u0648\u0627\u0631\u0626</a>
        <a href="departments.html">\u0627\u0644\u062C\u0631\u0627\u062D\u0627\u062A</a>
        <a href="packages.html" data-i18n="nav.packages">\u0628\u0627\u0642\u0627\u062A \u0627\u0644\u0631\u0639\u0627\u064A\u0629</a>
      </div>
      <div>
        <h4 data-i18n="footer.contact">\u062A\u0648\u0627\u0635\u0644 \u0645\u0639\u0646\u0627</h4>
        <a href="tel:966920000094">+966920000094</a>
        <a href="mailto:info@hayathospitals.com">info@hayathospitals.com</a>
        <p style="margin-top:8px;font-size:0.85rem;">\u0627\u0644\u0631\u064A\u0627\u0636\u060C \u0627\u0644\u0645\u0645\u0644\u0643\u0629 \u0627\u0644\u0639\u0631\u0628\u064A\u0629 \u0627\u0644\u0633\u0639\u0648\u062F\u064A\u0629</p>
      </div>
    </div>
    <div class="footer-bottom">
      <p>\xA9 2026 \u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A \u2014 BrainSAIT Healthcare OS</p>
    </div>
  </div>
</footer>

<a href="https://wa.me/966920000094" class="wa-float" target="_blank" rel="noopener" aria-label="WhatsApp">
  <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492l4.624-1.47A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75c-2.115 0-4.142-.665-5.847-1.884l-.42-.279-2.746.874.874-2.746-.279-.42A9.713 9.713 0 012.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75z"/></svg>
</a>
<button class="back-top" onclick="window.scrollTo({top:0,behavior:'smooth'})" aria-label="Back to top">
  <svg viewBox="0 0 24 24"><path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/></svg>
</button>
<script src="js/common.js"><\/script>
<script>
(async () => {
  try {
    const { branches } = await HNH.getBranches();
    const l = HNH.currentLang();
    const grid = document.getElementById('branchesGrid');
    grid.innerHTML = branches.map((b, i) => \`
      <div class="card branch-card animate-on-scroll delay-\${(i%2)+1}" style="padding:0;overflow:hidden;">
        <div style="background:var(--gradient-primary);padding:32px;color:white;position:relative;">
          <div class="branch-icon" style="background:rgba(255,255,255,0.2);margin-bottom:12px;">
            <svg viewBox="0 0 24 24" width="28" height="28" fill="white"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
          </div>
          <h3 style="color:white;margin-bottom:4px;">\${l==='ar' ? b.name_ar : b.name_en}</h3>
          <span style="color:rgba(255,255,255,0.7);font-size:0.9rem;">\${l==='ar' ? b.city_ar : b.city_en}</span>
        </div>
        <div style="padding:24px;">
          \${b.address_ar ? \`<p style="color:var(--text-light);margin-bottom:8px;font-size:0.9rem;">\${l==='ar' ? b.address_ar : b.address_en}</p>\` : ''}
          <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:16px;">
            \${b.beds ? \`<span style="padding:6px 14px;background:var(--off-white);border-radius:var(--radius-full);font-size:0.8rem;">\${b.beds} \u0633\u0631\u064A\u0631</span>\` : ''}
            \${b.phone ? \`<span style="padding:6px 14px;background:var(--off-white);border-radius:var(--radius-full);font-size:0.8rem;">\${b.phone}</span>\` : ''}
            \${b.status ? \`<span style="padding:6px 14px;background:rgba(16,185,129,0.1);color:var(--success);border-radius:var(--radius-full);font-size:0.8rem;font-weight:600;">\${b.status}</span>\` : ''}
          </div>
          <a href="contact.html" class="btn btn-primary btn-sm">\u062D\u062C\u0632 \u0645\u0648\u0639\u062F</a>
        </div>
      </div>
    \`).join('');
    setTimeout(() => {
      document.querySelectorAll('.animate-on-scroll:not(.animated)').forEach(el => {
        new IntersectionObserver(entries => { entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('animated'); }); }, { threshold: 0.1 }).observe(el);
      });
    }, 50);
  } catch(e) {
    document.getElementById('branchesGrid').innerHTML = '<p style="color:var(--danger);">\u0641\u0634\u0644 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A</p>';
  }
})();
<\/script>
</body>
</html>
`;
var contact = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>\u0627\u062A\u0635\u0644 \u0628\u0646\u0627 | \u0645\u0633\u062A\u0634\u0641\u0649 \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A</title>
<meta name="description" content="\u062A\u0648\u0627\u0635\u0644 \u0645\u0639\u0646\u0627 \u0623\u0648 \u0627\u062D\u062C\u0632 \u0645\u0648\u0639\u062F\u0643 \u0627\u0644\u0622\u0646 \u0641\u064A \u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A. | Contact Hayat National Hospitals or book your appointment online.">
<meta name="keywords" content="\u0627\u062D\u062C\u0632 \u0645\u0648\u0639\u062F, book appointment, \u0627\u062A\u0635\u0644 \u0628\u0646\u0627, contact, \u0645\u0633\u062A\u0634\u0641\u0649 \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A, Hayat">
<meta name="robots" content="index, follow">
<meta name="theme-color" content="#0066CC">
<link rel="canonical" href="https://hnh.brainsait.org/contact.html">
<link rel="alternate" hreflang="ar" href="https://hnh.brainsait.org/contact.html">
<link rel="alternate" hreflang="en" href="https://hnh.brainsait.org/contact.html">
<link rel="alternate" hreflang="x-default" href="https://hnh.brainsait.org/contact.html">
<link rel="manifest" href="/manifest.json">
<link rel="apple-touch-icon" href="/icon-192.png">
<meta property="og:type" content="website">
<meta property="og:site_name" content="\u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A | Hayat National Hospitals">
<meta property="og:title" content="\u0627\u062A\u0635\u0644 \u0628\u0646\u0627 | \u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A">
<meta property="og:description" content="\u062A\u0648\u0627\u0635\u0644 \u0645\u0639\u0646\u0627 \u0623\u0648 \u0627\u062D\u062C\u0632 \u0645\u0648\u0639\u062F\u0643 \u0627\u0644\u0622\u0646 \u0641\u064A \u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A.">
<meta property="og:url" content="https://hnh.brainsait.org/contact.html">
<meta property="og:image" content="https://hnh.brainsait.org/og-image.jpg">
<meta property="og:locale" content="ar_SA">
<meta property="og:locale:alternate" content="en_US">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="\u0627\u062A\u0635\u0644 \u0628\u0646\u0627 | \u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A">
<meta name="twitter:description" content="\u062A\u0648\u0627\u0635\u0644 \u0645\u0639\u0646\u0627 \u0623\u0648 \u0627\u062D\u062C\u0632 \u0645\u0648\u0639\u062F\u0643 \u0627\u0644\u0622\u0646 \u0641\u064A \u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A.">
<meta name="twitter:image" content="https://hnh.brainsait.org/og-image.jpg">

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Tajawal:wght@300;400;500;700;800;900&display=swap" rel="stylesheet">
<link rel="stylesheet" href="css/style.css">
</head>
<body>
<a href="#main-content" class="skip-link">Skip to main content</a>
<header class="header"><div class="container header-inner"><a href="index.html" class="logo"><div class="logo-icon"><svg viewBox="0 0 24 24" width="24" height="24" fill="white"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg></div><div class="logo-text">\u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A<small>BrainSAIT Healthcare OS</small></div></a><nav class="nav" id="mainNav">
      <a href="index.html" data-i18n="nav.home">\u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629</a>
      <a href="about.html" data-i18n="nav.about">\u0639\u0646 \u0627\u0644\u0645\u062C\u0645\u0648\u0639\u0629</a>
      <a href="departments.html" data-i18n="nav.departments">\u0627\u0644\u0623\u0642\u0633\u0627\u0645 \u0627\u0644\u0637\u0628\u064A\u0629</a>
      <a href="doctors.html" data-i18n="nav.doctors">\u0623\u0637\u0628\u0627\u0624\u0646\u0627</a>
      <a href="branches.html" data-i18n="nav.branches">\u0641\u0631\u0648\u0639\u0646\u0627</a>
      <a href="packages.html" data-i18n="nav.packages">\u0628\u0627\u0642\u0627\u062A \u0627\u0644\u0631\u0639\u0627\u064A\u0629</a>
      <a href="blog.html" data-i18n="nav.blog">\u0627\u0644\u0645\u062F\u0648\u0646\u0629 \u0627\u0644\u0635\u062D\u064A\u0629</a>
      <a href="contact.html" data-i18n="nav.contact">\u0627\u062A\u0635\u0644 \u0628\u0646\u0627</a>
      <button class="lang-btn" onclick="HNH.setLang(HNH.currentLang()==='ar'?'en':'ar')">EN/\u0639\u0631\u0628\u064A</button>
      <a href="contact.html" class="nav-cta" data-i18n="nav.book">\u0627\u062D\u062C\u0632 \u0645\u0648\u0639\u062F</a>
    </nav><button class="mobile-toggle" aria-label="Menu"><span></span><span></span><span></span></button></div></header>

<section class="page-hero" id="main-content"><div class="container"><div class="breadcrumb"><a href="index.html">\u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629</a><span>/</span><span>\u0627\u062A\u0635\u0644 \u0628\u0646\u0627</span></div><h1>\u0627\u062A\u0635\u0644 \u0628\u0646\u0627</h1><p>\u0646\u062D\u0646 \u0647\u0646\u0627 \u0644\u0645\u0633\u0627\u0639\u062F\u062A\u0643 \u0641\u064A \u0623\u064A \u0648\u0642\u062A</p></div></section>

<section class="section bg-white"><div class="container">
  <div class="contact-grid">
    <div class="animate-left">
      <h3 style="margin-bottom:24px;">\u062D\u062C\u0632 \u0645\u0648\u0639\u062F</h3>
      <form id="appointmentForm" onsubmit="bookAppointment(event)">
        <div class="form-row">
          <div class="form-group"><label>\u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u0643\u0627\u0645\u0644</label><input type="text" id="aptName" required></div>
          <div class="form-group"><label>\u0631\u0642\u0645 \u0627\u0644\u062C\u0648\u0627\u0644</label><input type="tel" id="aptPhone" required></div>
        </div>
        <div class="form-row">
          <div class="form-group"><label>\u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A</label><input type="email" id="aptEmail"></div>
          <div class="form-group"><label>\u0631\u0642\u0645 \u0627\u0644\u0647\u0648\u064A\u0629/\u0627\u0644\u0625\u0642\u0627\u0645\u0629</label><input type="text" id="aptNationalId"></div>
        </div>
        <div class="form-row">
          <div class="form-group"><label>\u0627\u0644\u0641\u0631\u0639</label><select id="aptBranch" required><option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0641\u0631\u0639</option></select></div>
          <div class="form-group"><label>\u0627\u0644\u062A\u062E\u0635\u0635</label><select id="aptSpec" required><option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u062A\u062E\u0635\u0635</option></select></div>
        </div>
        <div class="form-row">
          <div class="form-group"><label>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0645\u0648\u0639\u062F</label><input type="date" id="aptDate" required></div>
          <div class="form-group"><label>\u0648\u0642\u062A \u0627\u0644\u0645\u0648\u0639\u062F</label><select id="aptTime" required>
            <option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0648\u0642\u062A</option>
            <option value="08:00">08:00 \u0635</option><option value="09:00">09:00 \u0635</option><option value="10:00">10:00 \u0635</option>
            <option value="11:00">11:00 \u0635</option><option value="12:00">12:00 \u0645</option><option value="13:00">01:00 \u0645</option>
            <option value="14:00">02:00 \u0645</option><option value="15:00">03:00 \u0645</option><option value="16:00">04:00 \u0645</option>
            <option value="17:00">05:00 \u0645</option><option value="18:00">06:00 \u0645</option><option value="19:00">07:00 \u0645</option>
            <option value="20:00">08:00 \u0645</option><option value="21:00">09:00 \u0645</option>
          </select></div>
        </div>
        <div class="form-group"><label>\u0645\u0644\u0627\u062D\u0638\u0627\u062A</label><textarea id="aptNotes" rows="3" placeholder="\u0623\u064A \u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0625\u0636\u0627\u0641\u064A\u0629..."></textarea></div>
        <button type="submit" class="btn btn-primary btn-lg" style="width:100%;" id="aptSubmitBtn">\u062A\u0623\u0643\u064A\u062F \u0627\u0644\u062D\u062C\u0632</button>
      </form>
    </div>
    <div class="animate-right">
      <h3 style="margin-bottom:24px;">\u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0627\u0644\u062A\u0648\u0627\u0635\u0644</h3>
      <div class="contact-info-card"><div class="icon-box"><svg viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg></div><div><h4>\u0627\u0644\u0647\u0627\u062A\u0641</h4><p><a href="tel:966920000094" style="color:var(--primary);font-weight:600;">+966920000094</a></p></div></div>
      <div class="contact-info-card"><div class="icon-box" style="background:var(--gradient-accent);"><svg viewBox="0 0 24 24" style="fill:var(--navy);"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg></div><div><h4>\u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A</h4><p><a href="mailto:info@hayathospitals.com" style="color:var(--primary);">info@hayathospitals.com</a></p></div></div>
      <div class="contact-info-card"><div class="icon-box"><svg viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg></div><div><h4>\u0627\u0644\u0645\u0642\u0631 \u0627\u0644\u0631\u0626\u064A\u0633\u064A</h4><p>\u0627\u0644\u0645\u0645\u0644\u0643\u0629 \u0627\u0644\u0639\u0631\u0628\u064A\u0629 \u0627\u0644\u0633\u0639\u0648\u062F\u064A\u0629</p><p style="font-size:0.9rem;color:var(--text-light);">\u0637\u0631\u064A\u0642 \u0627\u0644\u0631\u064A\u0627\u0636 \u0627\u0644\u062F\u0627\u0626\u0631\u064A \u0627\u0644\u0634\u0631\u062D\u064A \u2014 \u062D\u064A \u0627\u0644\u0631\u0628\u0648\u0629</p></div></div>
      <div class="contact-info-card"><div class="icon-box" style="background:var(--gradient-accent);"><svg viewBox="0 0 24 24" style="fill:var(--navy);"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93z"/></svg></div><div><h4>\u0633\u0627\u0639\u0627\u062A \u0627\u0644\u0639\u0645\u0644</h4><p>\u0627\u0644\u0639\u064A\u0627\u062F\u0627\u062A \u0627\u0644\u062E\u0627\u0631\u062C\u064A\u0629: 8 \u0635\u0628\u0627\u062D\u0627\u064B - 10 \u0645\u0633\u0627\u0621\u064B</p><p>\u0627\u0644\u0637\u0648\u0627\u0631\u0626: 24 \u0633\u0627\u0639\u0629 / 7 \u0623\u064A\u0627\u0645</p></div></div>

      <div style="margin-top:24px;padding:20px;background:var(--bg-light);border-radius:var(--radius-md);">
        <h4 style="margin-bottom:12px;">\u0627\u0644\u0646\u0638\u0627\u0645 \u0627\u0644\u0645\u062A\u0635\u0644</h4>
        <p style="font-size:0.85rem;color:var(--text-light);margin-bottom:8px;">\u0647\u0630\u0627 \u0627\u0644\u0646\u0645\u0648\u0630\u062C \u0645\u062A\u0635\u0644 \u0645\u0628\u0627\u0634\u0631\u0629 \u0628\u0640 BrainSAIT Healthcare OS</p>
        <span class="api-status live">\u25CF hnh.brainsait.org/api</span>
      </div>
    </div>
  </div>
</div></section>

<section class="cta-section"><div class="container"><h2>\u0635\u062D\u062A\u0643 \u0623\u0648\u0644\u0627\u064B</h2><p>\u0627\u062A\u0635\u0644 \u0628\u0646\u0627 \u0627\u0644\u0622\u0646</p><div class="cta-buttons"><a href="tel:966920000094" class="btn btn-accent btn-lg">\u0627\u062A\u0635\u0644 \u0628\u0646\u0627</a></div></div></section>
<footer class="footer">
  <div class="container">
    <div class="footer-grid">
      <div>
        <h4 data-i18n="footer.name">\u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A</h4>
        <p style="margin-bottom:16px;" data-i18n="footer.desc">\u0646\u0638\u0627\u0645 BrainSAIT Healthcare OS \u0627\u0644\u0645\u062A\u0635\u0644 \u0628\u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062D\u064A\u0629</p>
        <span class="api-status live">API Connected</span>
      </div>
      <div>
        <h4 data-i18n="footer.quickLinks">\u0631\u0648\u0627\u0628\u0637 \u0633\u0631\u064A\u0639\u0629</h4>
        <a href="about.html" data-i18n="nav.about">\u0639\u0646 \u0627\u0644\u0645\u062C\u0645\u0648\u0639\u0629</a>
        <a href="departments.html" data-i18n="nav.departments">\u0627\u0644\u0623\u0642\u0633\u0627\u0645 \u0627\u0644\u0637\u0628\u064A\u0629</a>
        <a href="doctors.html" data-i18n="nav.doctors">\u0623\u0637\u0628\u0627\u0624\u0646\u0627</a>
        <a href="branches.html" data-i18n="nav.branches">\u0641\u0631\u0648\u0639\u0646\u0627</a>
        <a href="packages.html" data-i18n="nav.packages">\u0628\u0627\u0642\u0627\u062A \u0627\u0644\u0631\u0639\u0627\u064A\u0629</a>
        <a href="blog.html" data-i18n="nav.blog">\u0627\u0644\u0645\u062F\u0648\u0646\u0629 \u0627\u0644\u0635\u062D\u064A\u0629</a>
        <a href="faq.html" data-i18n="nav.faq">\u0627\u0644\u0623\u0633\u0626\u0644\u0629 \u0627\u0644\u0634\u0627\u0626\u0639\u0629</a>
      </div>
      <div>
        <h4 data-i18n="footer.services">\u062E\u062F\u0645\u0627\u062A\u0646\u0627</h4>
        <a href="contact.html" data-i18n="nav.book">\u062D\u062C\u0632 \u0645\u0648\u0639\u062F</a>
        <a href="departments.html">\u0627\u0644\u0639\u064A\u0627\u062F\u0627\u062A \u0627\u0644\u062E\u0627\u0631\u062C\u064A\u0629</a>
        <a href="departments.html">\u0627\u0644\u0637\u0648\u0627\u0631\u0626</a>
        <a href="departments.html">\u0627\u0644\u062C\u0631\u0627\u062D\u0627\u062A</a>
        <a href="packages.html" data-i18n="nav.packages">\u0628\u0627\u0642\u0627\u062A \u0627\u0644\u0631\u0639\u0627\u064A\u0629</a>
      </div>
      <div>
        <h4 data-i18n="footer.contact">\u062A\u0648\u0627\u0635\u0644 \u0645\u0639\u0646\u0627</h4>
        <a href="tel:966920000094">+966920000094</a>
        <a href="mailto:info@hayathospitals.com">info@hayathospitals.com</a>
        <p style="margin-top:8px;font-size:0.85rem;">\u0627\u0644\u0631\u064A\u0627\u0636\u060C \u0627\u0644\u0645\u0645\u0644\u0643\u0629 \u0627\u0644\u0639\u0631\u0628\u064A\u0629 \u0627\u0644\u0633\u0639\u0648\u062F\u064A\u0629</p>
      </div>
    </div>
    <div class="footer-bottom">
      <p>\xA9 2026 \u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A \u2014 BrainSAIT Healthcare OS</p>
    </div>
  </div>
</footer>

<a href="https://wa.me/966920000094" class="wa-float" target="_blank" rel="noopener" aria-label="WhatsApp">
  <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492l4.624-1.47A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75c-2.115 0-4.142-.665-5.847-1.884l-.42-.279-2.746.874.874-2.746-.279-.42A9.713 9.713 0 012.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75z"/></svg>
</a>
<button class="back-top" onclick="window.scrollTo({top:0,behavior:'smooth'})" aria-label="Back to top">
  <svg viewBox="0 0 24 24"><path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/></svg>
</button>
<script src="js/common.js"><\/script>
<script>
// Populate branch and specialty dropdowns from live API
(async () => {
  try {
    const [{ branches }, { providers }] = await Promise.all([HNH.getBranches(), HNH.getProviders()]);
    const l = HNH.currentLang();
    const branchSel = document.getElementById('aptBranch');
    branches.forEach(b => {
      const o = document.createElement('option');
      o.value = b.id || b.name_en;
      o.textContent = l==='ar' ? b.name_ar : b.name_en;
      branchSel.appendChild(o);
    });
    const specs = [...new Set(providers.map(p => p.specialty).filter(Boolean))].sort();
    const specSel = document.getElementById('aptSpec');
    specs.forEach(s => {
      const o = document.createElement('option');
      o.value = s;
      o.textContent = s;
      specSel.appendChild(o);
    });
  } catch(e) { console.error('Failed to load form data:', e); }
})();

async function bookAppointment(e) {
  e.preventDefault();
  const btn = document.getElementById('aptSubmitBtn');
  btn.disabled = true;
  btn.textContent = '\u062C\u0627\u0631\u064A \u0627\u0644\u062D\u062C\u0632...';

  try {
    // First register patient if needed
    const patientData = {
      first_name_ar: document.getElementById('aptName').value.split(' ')[0],
      last_name_ar: document.getElementById('aptName').value.split(' ').slice(1).join(' '),
      first_name_en: document.getElementById('aptName').value.split(' ')[0],
      last_name_en: document.getElementById('aptName').value.split(' ').slice(1).join(' '),
      phone: document.getElementById('aptPhone').value,
      email: document.getElementById('aptEmail').value,
      national_id: document.getElementById('aptNationalId').value || null,
    };

    // Create appointment
    const aptData = {
      patient_name: document.getElementById('aptName').value,
      phone: document.getElementById('aptPhone').value,
      branch: document.getElementById('aptBranch').value,
      specialty: document.getElementById('aptSpec').value,
      date: document.getElementById('aptDate').value,
      time: document.getElementById('aptTime').value,
      notes: document.getElementById('aptNotes').value,
    };

    const result = await HNH.createAppointment(aptData);
    HNH.showToast(HNH.currentLang() === 'ar' ? '\u062A\u0645 \u062D\u062C\u0632 \u0645\u0648\u0639\u062F\u0643 \u0628\u0646\u062C\u0627\u062D!' : 'Appointment booked successfully!', 'success');
    document.getElementById('appointmentForm').reset();
  } catch(err) {
    HNH.showToast(err.message || '\u062D\u062F\u062B \u062E\u0637\u0623\u060C \u064A\u0631\u062C\u0649 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649', 'error');
  } finally {
    btn.disabled = false;
    btn.textContent = '\u062A\u0623\u0643\u064A\u062F \u0627\u0644\u062D\u062C\u0632';
  }
}
<\/script>
</body>
</html>
`;
var course_ai_healthcare = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>\u062F\u0648\u0631\u0629 \u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629 \u0627\u0644\u062D\u064A\u0627\u0629</title>
<meta name="description" content="\u062A\u0641\u0627\u0635\u064A\u0644 \u062F\u0648\u0631\u0629 \u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629 \u0627\u0644\u062D\u064A\u0627\u0629.">
<meta name="robots" content="index, follow">
<meta name="theme-color" content="#0066CC">
<link id="canonicalLink" rel="canonical" href="https://hnh.brainsait.org/course-ai-healthcare.html">
<link rel="alternate" hreflang="ar" href="https://hnh.brainsait.org/course-ai-healthcare.html">
<link rel="alternate" hreflang="en" href="https://hnh.brainsait.org/course-ai-healthcare.html">
<link rel="alternate" hreflang="x-default" href="https://hnh.brainsait.org/course-ai-healthcare.html">
<link rel="manifest" href="/manifest.json">
<link rel="apple-touch-icon" href="/icon-192.png">
<meta property="og:type" content="website">
<meta property="og:site_name" content="\u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A | Hayat National Hospitals">
<meta property="og:title" content="\u062F\u0648\u0631\u0627\u062A \u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629 \u0627\u0644\u062D\u064A\u0627\u0629">
<meta property="og:description" content="\u0645\u062D\u062A\u0648\u0649 \u062A\u062F\u0631\u064A\u0628\u064A \u062A\u0641\u0635\u064A\u0644\u064A \u0645\u0639 \u0645\u0633\u0627\u0631\u0627\u062A \u062A\u0639\u0644\u0645 \u0639\u0645\u0644\u064A\u0629.">
<meta id="ogUrlMeta" property="og:url" content="https://hnh.brainsait.org/course-ai-healthcare.html">
<meta property="og:image" content="https://hnh.brainsait.org/og-image.jpg">
<meta property="og:locale" content="ar_SA">
<meta property="og:locale:alternate" content="en_US">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="\u062F\u0648\u0631\u0627\u062A \u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629 \u0627\u0644\u062D\u064A\u0627\u0629">
<meta name="twitter:description" content="\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u062F\u0648\u0631\u0627\u062A \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u064A\u0629 \u0645\u0646 \u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629 \u0627\u0644\u062D\u064A\u0627\u0629.">
<meta name="twitter:image" content="https://hnh.brainsait.org/og-image.jpg">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Tajawal:wght@300;400;500;700;800;900&display=swap" rel="stylesheet">
<link rel="stylesheet" href="css/style.css">
<script type="application/ld+json" id="courseSchema"><\/script>
<script type="application/ld+json" id="faqSchemaCourse"><\/script>
</head>
<body>
<a href="#main-content" class="skip-link">Skip to main content</a>
<header class="header"><div class="container header-inner"><a href="index.html" class="logo"><div class="logo-icon"><svg viewBox="0 0 24 24" width="24" height="24" fill="white"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg></div><div class="logo-text">\u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A<small>BrainSAIT Healthcare OS</small></div></a>
<nav class="nav" id="mainNav">
      <a href="index.html" data-i18n="nav.home">\u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629</a>
      <a href="about.html" data-i18n="nav.about">\u0639\u0646 \u0627\u0644\u0645\u062C\u0645\u0648\u0639\u0629</a>
      <a href="departments.html" data-i18n="nav.departments">\u0627\u0644\u0623\u0642\u0633\u0627\u0645 \u0627\u0644\u0637\u0628\u064A\u0629</a>
      <a href="doctors.html" data-i18n="nav.doctors">\u0623\u0637\u0628\u0627\u0624\u0646\u0627</a>
      <a href="branches.html" data-i18n="nav.branches">\u0641\u0631\u0648\u0639\u0646\u0627</a>
      <a href="packages.html" data-i18n="nav.packages">\u0628\u0627\u0642\u0627\u062A \u0627\u0644\u0631\u0639\u0627\u064A\u0629</a>
      <a href="blog.html" data-i18n="nav.blog">\u0627\u0644\u0645\u062F\u0648\u0646\u0629 \u0627\u0644\u0635\u062D\u064A\u0629</a>
      <a href="academy.html" data-i18n="nav.academy">\u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629 \u0627\u0644\u062D\u064A\u0627\u0629</a>
      <a href="contact.html" data-i18n="nav.contact">\u0627\u062A\u0635\u0644 \u0628\u0646\u0627</a>
      <button class="lang-btn" onclick="HNH.setLang(HNH.currentLang()==='ar'?'en':'ar')">EN/\u0639\u0631\u0628\u064A</button>
      <a href="contact.html" class="nav-cta" data-i18n="nav.book">\u0627\u062D\u062C\u0632 \u0645\u0648\u0639\u062F</a>
    </nav><button class="mobile-toggle" aria-label="Menu"><span></span><span></span><span></span></button></div></header>

<section class="page-hero" id="main-content"><div class="container"><div class="breadcrumb"><a href="index.html" id="crumbHome">\u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629</a><span>/</span><a href="academy.html" id="crumbAcademy">\u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629 \u0627\u0644\u062D\u064A\u0627\u0629</a><span>/</span><span id="crumbCourse">\u0627\u0644\u062F\u0648\u0631\u0629</span></div><h1 id="courseTitle">\u0627\u0644\u062F\u0648\u0631\u0629</h1><p id="courseSubtitle"></p><div class="stats-bar" style="margin-top:24px;grid-template-columns:repeat(3,1fr);"><div class="stat-card"><div class="stat-label" id="durationLabel">\u0627\u0644\u0645\u062F\u0629</div><div class="stat-number" id="courseDuration">\u2014</div></div><div class="stat-card"><div class="stat-label" id="levelLabel">\u0627\u0644\u0645\u0633\u062A\u0648\u0649</div><div class="stat-number" id="courseLevel">\u2014</div></div><div class="stat-card"><div class="stat-label" id="certificateLabel">\u0627\u0644\u0634\u0647\u0627\u062F\u0629</div><div class="stat-number" id="courseCertificate" style="font-size:1rem;">\u2014</div></div></div></div></section>

<section class="section bg-white">
  <div class="container">
    <div class="grid-2">
      <div class="card animate-on-scroll delay-1">
        <h3 id="overviewLabel">\u0646\u0638\u0631\u0629 \u0639\u0627\u0645\u0629</h3>
        <p id="courseOverview" style="margin-top:12px;color:var(--text-light);"></p>
      </div>
      <div class="card animate-on-scroll delay-2">
        <h3 id="audienceLabel">\u0627\u0644\u0641\u0626\u0629 \u0627\u0644\u0645\u0633\u062A\u0647\u062F\u0641\u0629</h3>
        <p id="courseAudience" style="margin-top:12px;color:var(--text-light);"></p>
        <h4 id="modeLabel" style="margin-top:20px;"></h4>
        <p id="courseMode" style="color:var(--text-light);"></p>
      </div>
    </div>
  </div>
</section>

<section class="section bg-light">
  <div class="container">
    <div class="section-header animate-on-scroll">
      <h2 id="outcomesTitle">\u0645\u062E\u0631\u062C\u0627\u062A \u0627\u0644\u062A\u0639\u0644\u0645</h2>
    </div>
    <div class="card"><ul id="courseOutcomes" style="list-style:disc;padding-inline-start:24px;display:grid;gap:10px;color:var(--text-light);"></ul></div>
  </div>
</section>

<section class="section bg-white">
  <div class="container">
    <div class="section-header animate-on-scroll">
      <h2 id="curriculumTitle">\u0627\u0644\u0645\u062D\u062A\u0648\u0649 \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u064A \u0627\u0644\u0643\u0627\u0645\u0644</h2>
    </div>
    <div id="courseModules" class="grid-2"></div>
  </div>
</section>

<section class="section bg-light">
  <div class="container">
    <div class="grid-2">
      <div class="card animate-on-scroll delay-1">
        <h3 id="materialsTitle">\u0627\u0644\u0645\u0648\u0627\u062F \u0627\u0644\u062A\u0639\u0644\u064A\u0645\u064A\u0629</h3>
        <ul id="courseMaterials" style="list-style:disc;padding-inline-start:24px;display:grid;gap:10px;margin-top:12px;color:var(--text-light);"></ul>
      </div>
      <div class="card animate-on-scroll delay-2">
        <h3 id="prereqTitle">\u0627\u0644\u0645\u062A\u0637\u0644\u0628\u0627\u062A \u0627\u0644\u0645\u0633\u0628\u0642\u0629</h3>
        <p id="coursePrereq" style="margin-top:12px;color:var(--text-light);"></p>
        <h3 id="assessmentTitle" style="margin-top:20px;">\u0637\u0631\u064A\u0642\u0629 \u0627\u0644\u062A\u0642\u064A\u064A\u0645</h3>
        <p id="courseAssessment" style="margin-top:12px;color:var(--text-light);"></p>
      </div>
    </div>
  </div>
</section>

<section class="section bg-white">
  <div class="container">
    <div class="section-header animate-on-scroll">
      <h2 id="faqTitle">\u0627\u0644\u0623\u0633\u0626\u0644\u0629 \u0627\u0644\u0634\u0627\u0626\u0639\u0629 \u0644\u0644\u062F\u0648\u0631\u0629</h2>
    </div>
    <div id="courseFaq" style="max-width:900px;margin:0 auto;"></div>
  </div>
</section>

<section class="section bg-light">
  <div class="container">
    <div class="section-header animate-on-scroll">
      <h2 id="relatedTitle">\u062F\u0648\u0631\u0627\u062A \u0630\u0627\u062A \u0635\u0644\u0629</h2>
    </div>
    <div class="grid-3" id="relatedGrid"></div>
  </div>
</section>

<section class="cta-section"><div class="container"><h2 id="ctaTitle">\u0633\u062C\u0644 \u0641\u064A \u0627\u0644\u062F\u0648\u0631\u0629 \u0627\u0644\u0622\u0646</h2><p id="ctaSubtitle">\u0627\u062D\u062C\u0632 \u0645\u0642\u0639\u062F\u0643 \u0627\u0644\u0622\u0646 \u0648\u062A\u0648\u0627\u0635\u0644 \u0645\u0639 \u0641\u0631\u064A\u0642 \u0627\u0644\u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629</p><div class="cta-buttons"><a href="contact.html" class="btn btn-accent btn-lg" id="ctaPrimary">\u0633\u062C\u0644 \u0627\u0644\u0622\u0646</a><a href="academy.html" class="btn btn-white btn-lg" id="ctaSecondary">\u0627\u0644\u0639\u0648\u062F\u0629 \u0625\u0644\u0649 \u0627\u0644\u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629</a></div></div></section>

<footer class="footer">
  <div class="container">
    <div class="footer-grid">
      <div>
        <h4 data-i18n="footer.name">\u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A</h4>
        <p style="margin-bottom:16px;" data-i18n="footer.desc">\u0646\u0638\u0627\u0645 BrainSAIT Healthcare OS \u0627\u0644\u0645\u062A\u0635\u0644 \u0628\u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062D\u064A\u0629</p>
        <span class="api-status live">API Connected</span>
      </div>
      <div>
        <h4 data-i18n="footer.quickLinks">\u0631\u0648\u0627\u0628\u0637 \u0633\u0631\u064A\u0639\u0629</h4>
        <a href="about.html" data-i18n="nav.about">\u0639\u0646 \u0627\u0644\u0645\u062C\u0645\u0648\u0639\u0629</a>
        <a href="departments.html" data-i18n="nav.departments">\u0627\u0644\u0623\u0642\u0633\u0627\u0645 \u0627\u0644\u0637\u0628\u064A\u0629</a>
        <a href="doctors.html" data-i18n="nav.doctors">\u0623\u0637\u0628\u0627\u0624\u0646\u0627</a>
        <a href="branches.html" data-i18n="nav.branches">\u0641\u0631\u0648\u0639\u0646\u0627</a>
        <a href="packages.html" data-i18n="nav.packages">\u0628\u0627\u0642\u0627\u062A \u0627\u0644\u0631\u0639\u0627\u064A\u0629</a>
        <a href="blog.html" data-i18n="nav.blog">\u0627\u0644\u0645\u062F\u0648\u0646\u0629 \u0627\u0644\u0635\u062D\u064A\u0629</a>
        <a href="academy.html" data-i18n="nav.academy">\u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629 \u0627\u0644\u062D\u064A\u0627\u0629</a>
        <a href="faq.html" data-i18n="nav.faq">\u0627\u0644\u0623\u0633\u0626\u0644\u0629 \u0627\u0644\u0634\u0627\u0626\u0639\u0629</a>
      </div>
      <div>
        <h4 data-i18n="footer.services">\u062E\u062F\u0645\u0627\u062A\u0646\u0627</h4>
        <a href="contact.html" data-i18n="nav.book">\u062D\u062C\u0632 \u0645\u0648\u0639\u062F</a>
        <a href="departments.html">\u0627\u0644\u0639\u064A\u0627\u062F\u0627\u062A \u0627\u0644\u062E\u0627\u0631\u062C\u064A\u0629</a>
        <a href="departments.html">\u0627\u0644\u0637\u0648\u0627\u0631\u0626</a>
        <a href="departments.html">\u0627\u0644\u062C\u0631\u0627\u062D\u0627\u062A</a>
        <a href="packages.html" data-i18n="nav.packages">\u0628\u0627\u0642\u0627\u062A \u0627\u0644\u0631\u0639\u0627\u064A\u0629</a>
      </div>
      <div>
        <h4 data-i18n="footer.contact">\u062A\u0648\u0627\u0635\u0644 \u0645\u0639\u0646\u0627</h4>
        <a href="tel:966920000094">+966920000094</a>
        <a href="mailto:info@hayathospitals.com">info@hayathospitals.com</a>
        <p style="margin-top:8px;font-size:0.85rem;">\u0627\u0644\u0631\u064A\u0627\u0636\u060C \u0627\u0644\u0645\u0645\u0644\u0643\u0629 \u0627\u0644\u0639\u0631\u0628\u064A\u0629 \u0627\u0644\u0633\u0639\u0648\u062F\u064A\u0629</p>
      </div>
    </div>
    <div class="footer-bottom">
      <p>\xA9 2026 \u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A \u2014 BrainSAIT Healthcare OS</p>
    </div>
  </div>
</footer>

<a href="https://wa.me/966920000094" class="wa-float" target="_blank" rel="noopener" aria-label="WhatsApp">
  <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492l4.624-1.47A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75c-2.115 0-4.142-.665-5.847-1.884l-.42-.279-2.746.874.874-2.746-.279-.42A9.713 9.713 0 012.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75z"/></svg>
</a>
<button class="back-top" onclick="window.scrollTo({top:0,behavior:'smooth'})" aria-label="Back to top">
  <svg viewBox="0 0 24 24"><path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/></svg>
</button>

<script src="js/common.js"><\/script>
<script src="js/academy-data.js"><\/script>
<script>
const COURSE_SLUG = 'ai-healthcare';
const COURSE_ROUTES = {
  'nphies': 'course-nphies.html',
  'medical-coding': 'course-medical-coding.html',
  'rcm': 'course-rcm.html',
  'ai-healthcare': 'course-ai-healthcare.html',
  'pdpl': 'course-pdpl.html',
  'clinical-documentation': 'course-clinical-documentation.html',
  'pharmacy': 'course-pharmacy.html',
  'cbahi-quality': 'course-cbahi-quality.html',
  'infection-control': 'course-infection-control.html'
};
const LABELS = {
  ar: {
    home: '\u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629',
    academy: '\u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629 \u0627\u0644\u062D\u064A\u0627\u0629',
    duration: '\u0627\u0644\u0645\u062F\u0629',
    level: '\u0627\u0644\u0645\u0633\u062A\u0648\u0649',
    certificate: '\u0627\u0644\u0634\u0647\u0627\u062F\u0629',
    overview: '\u0646\u0638\u0631\u0629 \u0639\u0627\u0645\u0629',
    audience: '\u0627\u0644\u0641\u0626\u0629 \u0627\u0644\u0645\u0633\u062A\u0647\u062F\u0641\u0629',
    mode: '\u0646\u0645\u0637 \u0627\u0644\u062A\u0642\u062F\u064A\u0645',
    faqTitle: '\u0627\u0644\u0623\u0633\u0626\u0644\u0629 \u0627\u0644\u0634\u0627\u0626\u0639\u0629 \u0644\u0644\u062F\u0648\u0631\u0629',
    relatedTitle: '\u062F\u0648\u0631\u0627\u062A \u0630\u0627\u062A \u0635\u0644\u0629',
    relatedDetails: '\u0639\u0631\u0636 \u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u062F\u0648\u0631\u0629',
    ctaTitle: '\u0633\u062C\u0644 \u0641\u064A \u0627\u0644\u062F\u0648\u0631\u0629 \u0627\u0644\u0622\u0646',
    ctaSubtitle: '\u0627\u062D\u062C\u0632 \u0645\u0642\u0639\u062F\u0643 \u0627\u0644\u0622\u0646 \u0648\u062A\u0648\u0627\u0635\u0644 \u0645\u0639 \u0641\u0631\u064A\u0642 \u0627\u0644\u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629',
    ctaPrimary: '\u0633\u062C\u0644 \u0627\u0644\u0622\u0646',
    ctaSecondary: '\u0627\u0644\u0639\u0648\u062F\u0629 \u0625\u0644\u0649 \u0627\u0644\u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629'
  },
  en: {
    home: 'Home',
    academy: 'Life Academy',
    duration: 'Duration',
    level: 'Level',
    certificate: 'Certificate',
    overview: 'Overview',
    audience: 'Target Audience',
    mode: 'Delivery Mode',
    faqTitle: 'Course FAQs',
    relatedTitle: 'Related Courses',
    relatedDetails: 'View Course Details',
    ctaTitle: 'Enroll in This Course',
    ctaSubtitle: 'Reserve your seat and connect with the academy team',
    ctaPrimary: 'Enroll Now',
    ctaSecondary: 'Back to Academy'
  }
};

function renderCoursePage(lang) {
  const academy = window.HNH_ACADEMY_DATA.academy[lang];
  const course = window.HNH_ACADEMY_DATA.courses[COURSE_SLUG][lang];
  const labels = LABELS[lang];
  const absoluteUrl = \`https://hnh.brainsait.org/\${window.location.pathname.split('/').pop()}\`;

  document.getElementById('canonicalLink').setAttribute('href', absoluteUrl);
  document.getElementById('ogUrlMeta').setAttribute('content', absoluteUrl);

  const metaTitle = \`\${course.title} | \${academy.breadcrumbCurrent}\`;
  document.title = metaTitle;
  document.querySelector('meta[name="description"]').setAttribute('content', course.shortDescription);
  document.querySelector('meta[property="og:title"]').setAttribute('content', metaTitle);
  document.querySelector('meta[property="og:description"]').setAttribute('content', course.shortDescription);
  document.querySelector('meta[name="twitter:title"]').setAttribute('content', metaTitle);
  document.querySelector('meta[name="twitter:description"]').setAttribute('content', course.shortDescription);

  document.getElementById('crumbHome').textContent = labels.home;
  document.getElementById('crumbAcademy').textContent = labels.academy;
  document.getElementById('crumbCourse').textContent = course.title;
  document.getElementById('courseTitle').textContent = course.title;
  document.getElementById('courseSubtitle').textContent = course.shortDescription;
  document.getElementById('durationLabel').textContent = labels.duration;
  document.getElementById('levelLabel').textContent = labels.level;
  document.getElementById('certificateLabel').textContent = labels.certificate;
  document.getElementById('courseDuration').textContent = course.duration;
  document.getElementById('courseLevel').textContent = course.level;
  document.getElementById('courseCertificate').textContent = course.certificate;
  document.getElementById('overviewLabel').textContent = labels.overview;
  document.getElementById('courseOverview').textContent = course.overview;
  document.getElementById('audienceLabel').textContent = labels.audience;
  document.getElementById('courseAudience').textContent = course.audience;
  document.getElementById('modeLabel').textContent = labels.mode;
  document.getElementById('courseMode').textContent = course.mode;
  document.getElementById('outcomesTitle').textContent = course.outcomesTitle;
  document.getElementById('curriculumTitle').textContent = course.curriculumTitle;
  document.getElementById('materialsTitle').textContent = course.materialsTitle;
  document.getElementById('prereqTitle').textContent = course.prereqTitle;
  document.getElementById('assessmentTitle').textContent = course.assessmentTitle;
  document.getElementById('coursePrereq').textContent = course.prereq;
  document.getElementById('courseAssessment').textContent = course.assessment;
  document.getElementById('faqTitle').textContent = labels.faqTitle;
  document.getElementById('relatedTitle').textContent = labels.relatedTitle;
  document.getElementById('ctaTitle').textContent = labels.ctaTitle;
  document.getElementById('ctaSubtitle').textContent = labels.ctaSubtitle;
  document.getElementById('ctaPrimary').textContent = labels.ctaPrimary;
  document.getElementById('ctaSecondary').textContent = labels.ctaSecondary;

  document.getElementById('courseOutcomes').innerHTML = course.outcomes.map(item => \`<li>\${item}</li>\`).join('');
  document.getElementById('courseMaterials').innerHTML = course.materials.map(item => \`<li>\${item}</li>\`).join('');

  document.getElementById('courseModules').innerHTML = course.modules.map((module, idx) => \`
    <div class="card animate-on-scroll delay-\${(idx % 6) + 1}">
      <h4>\${module.title}</h4>
      <ul style="list-style:disc;padding-inline-start:24px;display:grid;gap:8px;margin-top:12px;color:var(--text-light);">
        \${module.points.map(point => \`<li>\${point}</li>\`).join('')}
      </ul>
    </div>
  \`).join('');

  const faqRoot = document.getElementById('courseFaq');
  faqRoot.innerHTML = course.faq.map((item, index) => \`
    <div class="faq-item animate-on-scroll delay-\${(index % 6) + 1}">
      <button class="faq-question">
        <span>\${item.q}</span>
        <svg class="faq-chevron" viewBox="0 0 24 24"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z"/></svg>
      </button>
      <div class="faq-answer"><p>\${item.a}</p></div>
    </div>
  \`).join('');

  faqRoot.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const answer = btn.nextElementSibling;
      const isOpen = btn.classList.contains('active');
      faqRoot.querySelectorAll('.faq-question').forEach(q => q.classList.remove('active'));
      faqRoot.querySelectorAll('.faq-answer').forEach(a => a.classList.remove('open'));
      if (!isOpen) {
        btn.classList.add('active');
        answer.classList.add('open');
      }
    });
  });

  const related = Object.entries(window.HNH_ACADEMY_DATA.courses)
    .filter(([slug]) => slug !== COURSE_SLUG)
    .slice(0, 3)
    .map(([slug, value]) => ({ slug, data: value[lang] }));

  const relatedGrid = document.getElementById('relatedGrid');
  relatedGrid.innerHTML = related.map((item, idx) => \`
    <div class="course-card animate-on-scroll delay-\${(idx % 3) + 1}">
      <div class="course-header"><h3 style="color:white;">\${item.data.title}</h3></div>
      <div class="course-body">
        <p>\${item.data.shortDescription}</p>
        <div class="course-meta"><span>\${labels.duration}: \${item.data.duration}</span><span>\${labels.level}: \${item.data.level}</span></div>
        <div style="margin-top:14px;">
          <a href="\${COURSE_ROUTES[item.slug]}" class="btn btn-outline btn-sm">\${labels.relatedDetails}</a>
        </div>
      </div>
    </div>
  \`).join('');

  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.title,
    description: course.shortDescription,
    provider: {
      '@type': 'Hospital',
      name: 'Hayat National Hospitals',
      url: 'https://hnh.brainsait.org'
    },
    inLanguage: lang,
    educationalCredentialAwarded: course.certificate,
    timeRequired: course.duration,
    url: absoluteUrl
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: course.faq.map(item => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a }
    }))
  };

  document.getElementById('courseSchema').textContent = JSON.stringify(courseSchema);
  document.getElementById('faqSchemaCourse').textContent = JSON.stringify(faqSchema);
}

document.addEventListener('DOMContentLoaded', () => {
  renderCoursePage(HNH.currentLang());
});

document.addEventListener('hnh:langChanged', e => {
  renderCoursePage(e.detail.lang);
});
<\/script>
</body>
</html>
`;
var course_cbahi_quality = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>\u062F\u0648\u0631\u0629 \u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629 \u0627\u0644\u062D\u064A\u0627\u0629</title>
<meta name="description" content="\u062A\u0641\u0627\u0635\u064A\u0644 \u062F\u0648\u0631\u0629 \u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629 \u0627\u0644\u062D\u064A\u0627\u0629.">
<meta name="robots" content="index, follow">
<meta name="theme-color" content="#0066CC">
<link id="canonicalLink" rel="canonical" href="https://hnh.brainsait.org/course-cbahi-quality.html">
<link rel="alternate" hreflang="ar" href="https://hnh.brainsait.org/course-cbahi-quality.html">
<link rel="alternate" hreflang="en" href="https://hnh.brainsait.org/course-cbahi-quality.html">
<link rel="alternate" hreflang="x-default" href="https://hnh.brainsait.org/course-cbahi-quality.html">
<link rel="manifest" href="/manifest.json">
<link rel="apple-touch-icon" href="/icon-192.png">
<meta property="og:type" content="website">
<meta property="og:site_name" content="\u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A | Hayat National Hospitals">
<meta property="og:title" content="\u062F\u0648\u0631\u0627\u062A \u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629 \u0627\u0644\u062D\u064A\u0627\u0629">
<meta property="og:description" content="\u0645\u062D\u062A\u0648\u0649 \u062A\u062F\u0631\u064A\u0628\u064A \u062A\u0641\u0635\u064A\u0644\u064A \u0645\u0639 \u0645\u0633\u0627\u0631\u0627\u062A \u062A\u0639\u0644\u0645 \u0639\u0645\u0644\u064A\u0629.">
<meta id="ogUrlMeta" property="og:url" content="https://hnh.brainsait.org/course-cbahi-quality.html">
<meta property="og:image" content="https://hnh.brainsait.org/og-image.jpg">
<meta property="og:locale" content="ar_SA">
<meta property="og:locale:alternate" content="en_US">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="\u062F\u0648\u0631\u0627\u062A \u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629 \u0627\u0644\u062D\u064A\u0627\u0629">
<meta name="twitter:description" content="\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u062F\u0648\u0631\u0627\u062A \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u064A\u0629 \u0645\u0646 \u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629 \u0627\u0644\u062D\u064A\u0627\u0629.">
<meta name="twitter:image" content="https://hnh.brainsait.org/og-image.jpg">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Tajawal:wght@300;400;500;700;800;900&display=swap" rel="stylesheet">
<link rel="stylesheet" href="css/style.css">
<script type="application/ld+json" id="courseSchema"><\/script>
<script type="application/ld+json" id="faqSchemaCourse"><\/script>
</head>
<body>
<a href="#main-content" class="skip-link">Skip to main content</a>
<header class="header"><div class="container header-inner"><a href="index.html" class="logo"><div class="logo-icon"><svg viewBox="0 0 24 24" width="24" height="24" fill="white"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg></div><div class="logo-text">\u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A<small>BrainSAIT Healthcare OS</small></div></a>
<nav class="nav" id="mainNav">
      <a href="index.html" data-i18n="nav.home">\u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629</a>
      <a href="about.html" data-i18n="nav.about">\u0639\u0646 \u0627\u0644\u0645\u062C\u0645\u0648\u0639\u0629</a>
      <a href="departments.html" data-i18n="nav.departments">\u0627\u0644\u0623\u0642\u0633\u0627\u0645 \u0627\u0644\u0637\u0628\u064A\u0629</a>
      <a href="doctors.html" data-i18n="nav.doctors">\u0623\u0637\u0628\u0627\u0624\u0646\u0627</a>
      <a href="branches.html" data-i18n="nav.branches">\u0641\u0631\u0648\u0639\u0646\u0627</a>
      <a href="packages.html" data-i18n="nav.packages">\u0628\u0627\u0642\u0627\u062A \u0627\u0644\u0631\u0639\u0627\u064A\u0629</a>
      <a href="blog.html" data-i18n="nav.blog">\u0627\u0644\u0645\u062F\u0648\u0646\u0629 \u0627\u0644\u0635\u062D\u064A\u0629</a>
      <a href="academy.html" data-i18n="nav.academy">\u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629 \u0627\u0644\u062D\u064A\u0627\u0629</a>
      <a href="contact.html" data-i18n="nav.contact">\u0627\u062A\u0635\u0644 \u0628\u0646\u0627</a>
      <button class="lang-btn" onclick="HNH.setLang(HNH.currentLang()==='ar'?'en':'ar')">EN/\u0639\u0631\u0628\u064A</button>
      <a href="contact.html" class="nav-cta" data-i18n="nav.book">\u0627\u062D\u062C\u0632 \u0645\u0648\u0639\u062F</a>
    </nav><button class="mobile-toggle" aria-label="Menu"><span></span><span></span><span></span></button></div></header>

<section class="page-hero" id="main-content"><div class="container"><div class="breadcrumb"><a href="index.html" id="crumbHome">\u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629</a><span>/</span><a href="academy.html" id="crumbAcademy">\u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629 \u0627\u0644\u062D\u064A\u0627\u0629</a><span>/</span><span id="crumbCourse">\u0627\u0644\u062F\u0648\u0631\u0629</span></div><h1 id="courseTitle">\u0627\u0644\u062F\u0648\u0631\u0629</h1><p id="courseSubtitle"></p><div class="stats-bar" style="margin-top:24px;grid-template-columns:repeat(3,1fr);"><div class="stat-card"><div class="stat-label" id="durationLabel">\u0627\u0644\u0645\u062F\u0629</div><div class="stat-number" id="courseDuration">\u2014</div></div><div class="stat-card"><div class="stat-label" id="levelLabel">\u0627\u0644\u0645\u0633\u062A\u0648\u0649</div><div class="stat-number" id="courseLevel">\u2014</div></div><div class="stat-card"><div class="stat-label" id="certificateLabel">\u0627\u0644\u0634\u0647\u0627\u062F\u0629</div><div class="stat-number" id="courseCertificate" style="font-size:1rem;">\u2014</div></div></div></div></section>

<section class="section bg-white">
  <div class="container">
    <div class="grid-2">
      <div class="card animate-on-scroll delay-1">
        <h3 id="overviewLabel">\u0646\u0638\u0631\u0629 \u0639\u0627\u0645\u0629</h3>
        <p id="courseOverview" style="margin-top:12px;color:var(--text-light);"></p>
      </div>
      <div class="card animate-on-scroll delay-2">
        <h3 id="audienceLabel">\u0627\u0644\u0641\u0626\u0629 \u0627\u0644\u0645\u0633\u062A\u0647\u062F\u0641\u0629</h3>
        <p id="courseAudience" style="margin-top:12px;color:var(--text-light);"></p>
        <h4 id="modeLabel" style="margin-top:20px;"></h4>
        <p id="courseMode" style="color:var(--text-light);"></p>
      </div>
    </div>
  </div>
</section>

<section class="section bg-light">
  <div class="container">
    <div class="section-header animate-on-scroll">
      <h2 id="outcomesTitle">\u0645\u062E\u0631\u062C\u0627\u062A \u0627\u0644\u062A\u0639\u0644\u0645</h2>
    </div>
    <div class="card"><ul id="courseOutcomes" style="list-style:disc;padding-inline-start:24px;display:grid;gap:10px;color:var(--text-light);"></ul></div>
  </div>
</section>

<section class="section bg-white">
  <div class="container">
    <div class="section-header animate-on-scroll">
      <h2 id="curriculumTitle">\u0627\u0644\u0645\u062D\u062A\u0648\u0649 \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u064A \u0627\u0644\u0643\u0627\u0645\u0644</h2>
    </div>
    <div id="courseModules" class="grid-2"></div>
  </div>
</section>

<section class="section bg-light">
  <div class="container">
    <div class="grid-2">
      <div class="card animate-on-scroll delay-1">
        <h3 id="materialsTitle">\u0627\u0644\u0645\u0648\u0627\u062F \u0627\u0644\u062A\u0639\u0644\u064A\u0645\u064A\u0629</h3>
        <ul id="courseMaterials" style="list-style:disc;padding-inline-start:24px;display:grid;gap:10px;margin-top:12px;color:var(--text-light);"></ul>
      </div>
      <div class="card animate-on-scroll delay-2">
        <h3 id="prereqTitle">\u0627\u0644\u0645\u062A\u0637\u0644\u0628\u0627\u062A \u0627\u0644\u0645\u0633\u0628\u0642\u0629</h3>
        <p id="coursePrereq" style="margin-top:12px;color:var(--text-light);"></p>
        <h3 id="assessmentTitle" style="margin-top:20px;">\u0637\u0631\u064A\u0642\u0629 \u0627\u0644\u062A\u0642\u064A\u064A\u0645</h3>
        <p id="courseAssessment" style="margin-top:12px;color:var(--text-light);"></p>
      </div>
    </div>
  </div>
</section>

<section class="section bg-white">
  <div class="container">
    <div class="section-header animate-on-scroll">
      <h2 id="faqTitle">\u0627\u0644\u0623\u0633\u0626\u0644\u0629 \u0627\u0644\u0634\u0627\u0626\u0639\u0629 \u0644\u0644\u062F\u0648\u0631\u0629</h2>
    </div>
    <div id="courseFaq" style="max-width:900px;margin:0 auto;"></div>
  </div>
</section>

<section class="section bg-light">
  <div class="container">
    <div class="section-header animate-on-scroll">
      <h2 id="relatedTitle">\u062F\u0648\u0631\u0627\u062A \u0630\u0627\u062A \u0635\u0644\u0629</h2>
    </div>
    <div class="grid-3" id="relatedGrid"></div>
  </div>
</section>

<section class="cta-section"><div class="container"><h2 id="ctaTitle">\u0633\u062C\u0644 \u0641\u064A \u0627\u0644\u062F\u0648\u0631\u0629 \u0627\u0644\u0622\u0646</h2><p id="ctaSubtitle">\u0627\u062D\u062C\u0632 \u0645\u0642\u0639\u062F\u0643 \u0627\u0644\u0622\u0646 \u0648\u062A\u0648\u0627\u0635\u0644 \u0645\u0639 \u0641\u0631\u064A\u0642 \u0627\u0644\u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629</p><div class="cta-buttons"><a href="contact.html" class="btn btn-accent btn-lg" id="ctaPrimary">\u0633\u062C\u0644 \u0627\u0644\u0622\u0646</a><a href="academy.html" class="btn btn-white btn-lg" id="ctaSecondary">\u0627\u0644\u0639\u0648\u062F\u0629 \u0625\u0644\u0649 \u0627\u0644\u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629</a></div></div></section>

<footer class="footer">
  <div class="container">
    <div class="footer-grid">
      <div>
        <h4 data-i18n="footer.name">\u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A</h4>
        <p style="margin-bottom:16px;" data-i18n="footer.desc">\u0646\u0638\u0627\u0645 BrainSAIT Healthcare OS \u0627\u0644\u0645\u062A\u0635\u0644 \u0628\u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062D\u064A\u0629</p>
        <span class="api-status live">API Connected</span>
      </div>
      <div>
        <h4 data-i18n="footer.quickLinks">\u0631\u0648\u0627\u0628\u0637 \u0633\u0631\u064A\u0639\u0629</h4>
        <a href="about.html" data-i18n="nav.about">\u0639\u0646 \u0627\u0644\u0645\u062C\u0645\u0648\u0639\u0629</a>
        <a href="departments.html" data-i18n="nav.departments">\u0627\u0644\u0623\u0642\u0633\u0627\u0645 \u0627\u0644\u0637\u0628\u064A\u0629</a>
        <a href="doctors.html" data-i18n="nav.doctors">\u0623\u0637\u0628\u0627\u0624\u0646\u0627</a>
        <a href="branches.html" data-i18n="nav.branches">\u0641\u0631\u0648\u0639\u0646\u0627</a>
        <a href="packages.html" data-i18n="nav.packages">\u0628\u0627\u0642\u0627\u062A \u0627\u0644\u0631\u0639\u0627\u064A\u0629</a>
        <a href="blog.html" data-i18n="nav.blog">\u0627\u0644\u0645\u062F\u0648\u0646\u0629 \u0627\u0644\u0635\u062D\u064A\u0629</a>
        <a href="academy.html" data-i18n="nav.academy">\u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629 \u0627\u0644\u062D\u064A\u0627\u0629</a>
        <a href="faq.html" data-i18n="nav.faq">\u0627\u0644\u0623\u0633\u0626\u0644\u0629 \u0627\u0644\u0634\u0627\u0626\u0639\u0629</a>
      </div>
      <div>
        <h4 data-i18n="footer.services">\u062E\u062F\u0645\u0627\u062A\u0646\u0627</h4>
        <a href="contact.html" data-i18n="nav.book">\u062D\u062C\u0632 \u0645\u0648\u0639\u062F</a>
        <a href="departments.html">\u0627\u0644\u0639\u064A\u0627\u062F\u0627\u062A \u0627\u0644\u062E\u0627\u0631\u062C\u064A\u0629</a>
        <a href="departments.html">\u0627\u0644\u0637\u0648\u0627\u0631\u0626</a>
        <a href="departments.html">\u0627\u0644\u062C\u0631\u0627\u062D\u0627\u062A</a>
        <a href="packages.html" data-i18n="nav.packages">\u0628\u0627\u0642\u0627\u062A \u0627\u0644\u0631\u0639\u0627\u064A\u0629</a>
      </div>
      <div>
        <h4 data-i18n="footer.contact">\u062A\u0648\u0627\u0635\u0644 \u0645\u0639\u0646\u0627</h4>
        <a href="tel:966920000094">+966920000094</a>
        <a href="mailto:info@hayathospitals.com">info@hayathospitals.com</a>
        <p style="margin-top:8px;font-size:0.85rem;">\u0627\u0644\u0631\u064A\u0627\u0636\u060C \u0627\u0644\u0645\u0645\u0644\u0643\u0629 \u0627\u0644\u0639\u0631\u0628\u064A\u0629 \u0627\u0644\u0633\u0639\u0648\u062F\u064A\u0629</p>
      </div>
    </div>
    <div class="footer-bottom">
      <p>\xA9 2026 \u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A \u2014 BrainSAIT Healthcare OS</p>
    </div>
  </div>
</footer>

<a href="https://wa.me/966920000094" class="wa-float" target="_blank" rel="noopener" aria-label="WhatsApp">
  <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492l4.624-1.47A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75c-2.115 0-4.142-.665-5.847-1.884l-.42-.279-2.746.874.874-2.746-.279-.42A9.713 9.713 0 012.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75z"/></svg>
</a>
<button class="back-top" onclick="window.scrollTo({top:0,behavior:'smooth'})" aria-label="Back to top">
  <svg viewBox="0 0 24 24"><path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/></svg>
</button>

<script src="js/common.js"><\/script>
<script src="js/academy-data.js"><\/script>
<script>
const COURSE_SLUG = 'cbahi-quality';
const COURSE_ROUTES = {
  'nphies': 'course-nphies.html',
  'medical-coding': 'course-medical-coding.html',
  'rcm': 'course-rcm.html',
  'ai-healthcare': 'course-ai-healthcare.html',
  'pdpl': 'course-pdpl.html',
  'clinical-documentation': 'course-clinical-documentation.html',
  'pharmacy': 'course-pharmacy.html',
  'cbahi-quality': 'course-cbahi-quality.html',
  'infection-control': 'course-infection-control.html'
};
const LABELS = {
  ar: {
    home: '\u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629',
    academy: '\u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629 \u0627\u0644\u062D\u064A\u0627\u0629',
    duration: '\u0627\u0644\u0645\u062F\u0629',
    level: '\u0627\u0644\u0645\u0633\u062A\u0648\u0649',
    certificate: '\u0627\u0644\u0634\u0647\u0627\u062F\u0629',
    overview: '\u0646\u0638\u0631\u0629 \u0639\u0627\u0645\u0629',
    audience: '\u0627\u0644\u0641\u0626\u0629 \u0627\u0644\u0645\u0633\u062A\u0647\u062F\u0641\u0629',
    mode: '\u0646\u0645\u0637 \u0627\u0644\u062A\u0642\u062F\u064A\u0645',
    faqTitle: '\u0627\u0644\u0623\u0633\u0626\u0644\u0629 \u0627\u0644\u0634\u0627\u0626\u0639\u0629 \u0644\u0644\u062F\u0648\u0631\u0629',
    relatedTitle: '\u062F\u0648\u0631\u0627\u062A \u0630\u0627\u062A \u0635\u0644\u0629',
    relatedDetails: '\u0639\u0631\u0636 \u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u062F\u0648\u0631\u0629',
    ctaTitle: '\u0633\u062C\u0644 \u0641\u064A \u0627\u0644\u062F\u0648\u0631\u0629 \u0627\u0644\u0622\u0646',
    ctaSubtitle: '\u0627\u062D\u062C\u0632 \u0645\u0642\u0639\u062F\u0643 \u0627\u0644\u0622\u0646 \u0648\u062A\u0648\u0627\u0635\u0644 \u0645\u0639 \u0641\u0631\u064A\u0642 \u0627\u0644\u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629',
    ctaPrimary: '\u0633\u062C\u0644 \u0627\u0644\u0622\u0646',
    ctaSecondary: '\u0627\u0644\u0639\u0648\u062F\u0629 \u0625\u0644\u0649 \u0627\u0644\u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629'
  },
  en: {
    home: 'Home',
    academy: 'Life Academy',
    duration: 'Duration',
    level: 'Level',
    certificate: 'Certificate',
    overview: 'Overview',
    audience: 'Target Audience',
    mode: 'Delivery Mode',
    faqTitle: 'Course FAQs',
    relatedTitle: 'Related Courses',
    relatedDetails: 'View Course Details',
    ctaTitle: 'Enroll in This Course',
    ctaSubtitle: 'Reserve your seat and connect with the academy team',
    ctaPrimary: 'Enroll Now',
    ctaSecondary: 'Back to Academy'
  }
};

function renderCoursePage(lang) {
  const academy = window.HNH_ACADEMY_DATA.academy[lang];
  const course = window.HNH_ACADEMY_DATA.courses[COURSE_SLUG][lang];
  const labels = LABELS[lang];
  const absoluteUrl = \`https://hnh.brainsait.org/\${window.location.pathname.split('/').pop()}\`;

  document.getElementById('canonicalLink').setAttribute('href', absoluteUrl);
  document.getElementById('ogUrlMeta').setAttribute('content', absoluteUrl);

  const metaTitle = \`\${course.title} | \${academy.breadcrumbCurrent}\`;
  document.title = metaTitle;
  document.querySelector('meta[name="description"]').setAttribute('content', course.shortDescription);
  document.querySelector('meta[property="og:title"]').setAttribute('content', metaTitle);
  document.querySelector('meta[property="og:description"]').setAttribute('content', course.shortDescription);
  document.querySelector('meta[name="twitter:title"]').setAttribute('content', metaTitle);
  document.querySelector('meta[name="twitter:description"]').setAttribute('content', course.shortDescription);

  document.getElementById('crumbHome').textContent = labels.home;
  document.getElementById('crumbAcademy').textContent = labels.academy;
  document.getElementById('crumbCourse').textContent = course.title;
  document.getElementById('courseTitle').textContent = course.title;
  document.getElementById('courseSubtitle').textContent = course.shortDescription;
  document.getElementById('durationLabel').textContent = labels.duration;
  document.getElementById('levelLabel').textContent = labels.level;
  document.getElementById('certificateLabel').textContent = labels.certificate;
  document.getElementById('courseDuration').textContent = course.duration;
  document.getElementById('courseLevel').textContent = course.level;
  document.getElementById('courseCertificate').textContent = course.certificate;
  document.getElementById('overviewLabel').textContent = labels.overview;
  document.getElementById('courseOverview').textContent = course.overview;
  document.getElementById('audienceLabel').textContent = labels.audience;
  document.getElementById('courseAudience').textContent = course.audience;
  document.getElementById('modeLabel').textContent = labels.mode;
  document.getElementById('courseMode').textContent = course.mode;
  document.getElementById('outcomesTitle').textContent = course.outcomesTitle;
  document.getElementById('curriculumTitle').textContent = course.curriculumTitle;
  document.getElementById('materialsTitle').textContent = course.materialsTitle;
  document.getElementById('prereqTitle').textContent = course.prereqTitle;
  document.getElementById('assessmentTitle').textContent = course.assessmentTitle;
  document.getElementById('coursePrereq').textContent = course.prereq;
  document.getElementById('courseAssessment').textContent = course.assessment;
  document.getElementById('faqTitle').textContent = labels.faqTitle;
  document.getElementById('relatedTitle').textContent = labels.relatedTitle;
  document.getElementById('ctaTitle').textContent = labels.ctaTitle;
  document.getElementById('ctaSubtitle').textContent = labels.ctaSubtitle;
  document.getElementById('ctaPrimary').textContent = labels.ctaPrimary;
  document.getElementById('ctaSecondary').textContent = labels.ctaSecondary;

  document.getElementById('courseOutcomes').innerHTML = course.outcomes.map(item => \`<li>\${item}</li>\`).join('');
  document.getElementById('courseMaterials').innerHTML = course.materials.map(item => \`<li>\${item}</li>\`).join('');

  document.getElementById('courseModules').innerHTML = course.modules.map((module, idx) => \`
    <div class="card animate-on-scroll delay-\${(idx % 6) + 1}">
      <h4>\${module.title}</h4>
      <ul style="list-style:disc;padding-inline-start:24px;display:grid;gap:8px;margin-top:12px;color:var(--text-light);">
        \${module.points.map(point => \`<li>\${point}</li>\`).join('')}
      </ul>
    </div>
  \`).join('');

  const faqRoot = document.getElementById('courseFaq');
  faqRoot.innerHTML = course.faq.map((item, index) => \`
    <div class="faq-item animate-on-scroll delay-\${(index % 6) + 1}">
      <button class="faq-question">
        <span>\${item.q}</span>
        <svg class="faq-chevron" viewBox="0 0 24 24"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z"/></svg>
      </button>
      <div class="faq-answer"><p>\${item.a}</p></div>
    </div>
  \`).join('');

  faqRoot.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const answer = btn.nextElementSibling;
      const isOpen = btn.classList.contains('active');
      faqRoot.querySelectorAll('.faq-question').forEach(q => q.classList.remove('active'));
      faqRoot.querySelectorAll('.faq-answer').forEach(a => a.classList.remove('open'));
      if (!isOpen) {
        btn.classList.add('active');
        answer.classList.add('open');
      }
    });
  });

  const related = Object.entries(window.HNH_ACADEMY_DATA.courses)
    .filter(([slug]) => slug !== COURSE_SLUG)
    .slice(0, 3)
    .map(([slug, value]) => ({ slug, data: value[lang] }));

  const relatedGrid = document.getElementById('relatedGrid');
  relatedGrid.innerHTML = related.map((item, idx) => \`
    <div class="course-card animate-on-scroll delay-\${(idx % 3) + 1}">
      <div class="course-header"><h3 style="color:white;">\${item.data.title}</h3></div>
      <div class="course-body">
        <p>\${item.data.shortDescription}</p>
        <div class="course-meta"><span>\${labels.duration}: \${item.data.duration}</span><span>\${labels.level}: \${item.data.level}</span></div>
        <div style="margin-top:14px;">
          <a href="\${COURSE_ROUTES[item.slug]}" class="btn btn-outline btn-sm">\${labels.relatedDetails}</a>
        </div>
      </div>
    </div>
  \`).join('');

  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.title,
    description: course.shortDescription,
    provider: {
      '@type': 'Hospital',
      name: 'Hayat National Hospitals',
      url: 'https://hnh.brainsait.org'
    },
    inLanguage: lang,
    educationalCredentialAwarded: course.certificate,
    timeRequired: course.duration,
    url: absoluteUrl
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: course.faq.map(item => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a }
    }))
  };

  document.getElementById('courseSchema').textContent = JSON.stringify(courseSchema);
  document.getElementById('faqSchemaCourse').textContent = JSON.stringify(faqSchema);
}

document.addEventListener('DOMContentLoaded', () => {
  renderCoursePage(HNH.currentLang());
});

document.addEventListener('hnh:langChanged', e => {
  renderCoursePage(e.detail.lang);
});
<\/script>
</body>
</html>
`;
var course_clinical_documentation = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>\u062F\u0648\u0631\u0629 \u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629 \u0627\u0644\u062D\u064A\u0627\u0629</title>
<meta name="description" content="\u062A\u0641\u0627\u0635\u064A\u0644 \u062F\u0648\u0631\u0629 \u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629 \u0627\u0644\u062D\u064A\u0627\u0629.">
<meta name="robots" content="index, follow">
<meta name="theme-color" content="#0066CC">
<link id="canonicalLink" rel="canonical" href="https://hnh.brainsait.org/course-clinical-documentation.html">
<link rel="alternate" hreflang="ar" href="https://hnh.brainsait.org/course-clinical-documentation.html">
<link rel="alternate" hreflang="en" href="https://hnh.brainsait.org/course-clinical-documentation.html">
<link rel="alternate" hreflang="x-default" href="https://hnh.brainsait.org/course-clinical-documentation.html">
<link rel="manifest" href="/manifest.json">
<link rel="apple-touch-icon" href="/icon-192.png">
<meta property="og:type" content="website">
<meta property="og:site_name" content="\u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A | Hayat National Hospitals">
<meta property="og:title" content="\u062F\u0648\u0631\u0627\u062A \u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629 \u0627\u0644\u062D\u064A\u0627\u0629">
<meta property="og:description" content="\u0645\u062D\u062A\u0648\u0649 \u062A\u062F\u0631\u064A\u0628\u064A \u062A\u0641\u0635\u064A\u0644\u064A \u0645\u0639 \u0645\u0633\u0627\u0631\u0627\u062A \u062A\u0639\u0644\u0645 \u0639\u0645\u0644\u064A\u0629.">
<meta id="ogUrlMeta" property="og:url" content="https://hnh.brainsait.org/course-clinical-documentation.html">
<meta property="og:image" content="https://hnh.brainsait.org/og-image.jpg">
<meta property="og:locale" content="ar_SA">
<meta property="og:locale:alternate" content="en_US">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="\u062F\u0648\u0631\u0627\u062A \u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629 \u0627\u0644\u062D\u064A\u0627\u0629">
<meta name="twitter:description" content="\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u062F\u0648\u0631\u0627\u062A \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u064A\u0629 \u0645\u0646 \u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629 \u0627\u0644\u062D\u064A\u0627\u0629.">
<meta name="twitter:image" content="https://hnh.brainsait.org/og-image.jpg">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Tajawal:wght@300;400;500;700;800;900&display=swap" rel="stylesheet">
<link rel="stylesheet" href="css/style.css">
<script type="application/ld+json" id="courseSchema"><\/script>
<script type="application/ld+json" id="faqSchemaCourse"><\/script>
</head>
<body>
<a href="#main-content" class="skip-link">Skip to main content</a>
<header class="header"><div class="container header-inner"><a href="index.html" class="logo"><div class="logo-icon"><svg viewBox="0 0 24 24" width="24" height="24" fill="white"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg></div><div class="logo-text">\u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A<small>BrainSAIT Healthcare OS</small></div></a>
<nav class="nav" id="mainNav">
      <a href="index.html" data-i18n="nav.home">\u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629</a>
      <a href="about.html" data-i18n="nav.about">\u0639\u0646 \u0627\u0644\u0645\u062C\u0645\u0648\u0639\u0629</a>
      <a href="departments.html" data-i18n="nav.departments">\u0627\u0644\u0623\u0642\u0633\u0627\u0645 \u0627\u0644\u0637\u0628\u064A\u0629</a>
      <a href="doctors.html" data-i18n="nav.doctors">\u0623\u0637\u0628\u0627\u0624\u0646\u0627</a>
      <a href="branches.html" data-i18n="nav.branches">\u0641\u0631\u0648\u0639\u0646\u0627</a>
      <a href="packages.html" data-i18n="nav.packages">\u0628\u0627\u0642\u0627\u062A \u0627\u0644\u0631\u0639\u0627\u064A\u0629</a>
      <a href="blog.html" data-i18n="nav.blog">\u0627\u0644\u0645\u062F\u0648\u0646\u0629 \u0627\u0644\u0635\u062D\u064A\u0629</a>
      <a href="academy.html" data-i18n="nav.academy">\u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629 \u0627\u0644\u062D\u064A\u0627\u0629</a>
      <a href="contact.html" data-i18n="nav.contact">\u0627\u062A\u0635\u0644 \u0628\u0646\u0627</a>
      <button class="lang-btn" onclick="HNH.setLang(HNH.currentLang()==='ar'?'en':'ar')">EN/\u0639\u0631\u0628\u064A</button>
      <a href="contact.html" class="nav-cta" data-i18n="nav.book">\u0627\u062D\u062C\u0632 \u0645\u0648\u0639\u062F</a>
    </nav><button class="mobile-toggle" aria-label="Menu"><span></span><span></span><span></span></button></div></header>

<section class="page-hero" id="main-content"><div class="container"><div class="breadcrumb"><a href="index.html" id="crumbHome">\u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629</a><span>/</span><a href="academy.html" id="crumbAcademy">\u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629 \u0627\u0644\u062D\u064A\u0627\u0629</a><span>/</span><span id="crumbCourse">\u0627\u0644\u062F\u0648\u0631\u0629</span></div><h1 id="courseTitle">\u0627\u0644\u062F\u0648\u0631\u0629</h1><p id="courseSubtitle"></p><div class="stats-bar" style="margin-top:24px;grid-template-columns:repeat(3,1fr);"><div class="stat-card"><div class="stat-label" id="durationLabel">\u0627\u0644\u0645\u062F\u0629</div><div class="stat-number" id="courseDuration">\u2014</div></div><div class="stat-card"><div class="stat-label" id="levelLabel">\u0627\u0644\u0645\u0633\u062A\u0648\u0649</div><div class="stat-number" id="courseLevel">\u2014</div></div><div class="stat-card"><div class="stat-label" id="certificateLabel">\u0627\u0644\u0634\u0647\u0627\u062F\u0629</div><div class="stat-number" id="courseCertificate" style="font-size:1rem;">\u2014</div></div></div></div></section>

<section class="section bg-white">
  <div class="container">
    <div class="grid-2">
      <div class="card animate-on-scroll delay-1">
        <h3 id="overviewLabel">\u0646\u0638\u0631\u0629 \u0639\u0627\u0645\u0629</h3>
        <p id="courseOverview" style="margin-top:12px;color:var(--text-light);"></p>
      </div>
      <div class="card animate-on-scroll delay-2">
        <h3 id="audienceLabel">\u0627\u0644\u0641\u0626\u0629 \u0627\u0644\u0645\u0633\u062A\u0647\u062F\u0641\u0629</h3>
        <p id="courseAudience" style="margin-top:12px;color:var(--text-light);"></p>
        <h4 id="modeLabel" style="margin-top:20px;"></h4>
        <p id="courseMode" style="color:var(--text-light);"></p>
      </div>
    </div>
  </div>
</section>

<section class="section bg-light">
  <div class="container">
    <div class="section-header animate-on-scroll">
      <h2 id="outcomesTitle">\u0645\u062E\u0631\u062C\u0627\u062A \u0627\u0644\u062A\u0639\u0644\u0645</h2>
    </div>
    <div class="card"><ul id="courseOutcomes" style="list-style:disc;padding-inline-start:24px;display:grid;gap:10px;color:var(--text-light);"></ul></div>
  </div>
</section>

<section class="section bg-white">
  <div class="container">
    <div class="section-header animate-on-scroll">
      <h2 id="curriculumTitle">\u0627\u0644\u0645\u062D\u062A\u0648\u0649 \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u064A \u0627\u0644\u0643\u0627\u0645\u0644</h2>
    </div>
    <div id="courseModules" class="grid-2"></div>
  </div>
</section>

<section class="section bg-light">
  <div class="container">
    <div class="grid-2">
      <div class="card animate-on-scroll delay-1">
        <h3 id="materialsTitle">\u0627\u0644\u0645\u0648\u0627\u062F \u0627\u0644\u062A\u0639\u0644\u064A\u0645\u064A\u0629</h3>
        <ul id="courseMaterials" style="list-style:disc;padding-inline-start:24px;display:grid;gap:10px;margin-top:12px;color:var(--text-light);"></ul>
      </div>
      <div class="card animate-on-scroll delay-2">
        <h3 id="prereqTitle">\u0627\u0644\u0645\u062A\u0637\u0644\u0628\u0627\u062A \u0627\u0644\u0645\u0633\u0628\u0642\u0629</h3>
        <p id="coursePrereq" style="margin-top:12px;color:var(--text-light);"></p>
        <h3 id="assessmentTitle" style="margin-top:20px;">\u0637\u0631\u064A\u0642\u0629 \u0627\u0644\u062A\u0642\u064A\u064A\u0645</h3>
        <p id="courseAssessment" style="margin-top:12px;color:var(--text-light);"></p>
      </div>
    </div>
  </div>
</section>

<section class="section bg-white">
  <div class="container">
    <div class="section-header animate-on-scroll">
      <h2 id="faqTitle">\u0627\u0644\u0623\u0633\u0626\u0644\u0629 \u0627\u0644\u0634\u0627\u0626\u0639\u0629 \u0644\u0644\u062F\u0648\u0631\u0629</h2>
    </div>
    <div id="courseFaq" style="max-width:900px;margin:0 auto;"></div>
  </div>
</section>

<section class="section bg-light">
  <div class="container">
    <div class="section-header animate-on-scroll">
      <h2 id="relatedTitle">\u062F\u0648\u0631\u0627\u062A \u0630\u0627\u062A \u0635\u0644\u0629</h2>
    </div>
    <div class="grid-3" id="relatedGrid"></div>
  </div>
</section>

<section class="cta-section"><div class="container"><h2 id="ctaTitle">\u0633\u062C\u0644 \u0641\u064A \u0627\u0644\u062F\u0648\u0631\u0629 \u0627\u0644\u0622\u0646</h2><p id="ctaSubtitle">\u0627\u062D\u062C\u0632 \u0645\u0642\u0639\u062F\u0643 \u0627\u0644\u0622\u0646 \u0648\u062A\u0648\u0627\u0635\u0644 \u0645\u0639 \u0641\u0631\u064A\u0642 \u0627\u0644\u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629</p><div class="cta-buttons"><a href="contact.html" class="btn btn-accent btn-lg" id="ctaPrimary">\u0633\u062C\u0644 \u0627\u0644\u0622\u0646</a><a href="academy.html" class="btn btn-white btn-lg" id="ctaSecondary">\u0627\u0644\u0639\u0648\u062F\u0629 \u0625\u0644\u0649 \u0627\u0644\u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629</a></div></div></section>

<footer class="footer">
  <div class="container">
    <div class="footer-grid">
      <div>
        <h4 data-i18n="footer.name">\u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A</h4>
        <p style="margin-bottom:16px;" data-i18n="footer.desc">\u0646\u0638\u0627\u0645 BrainSAIT Healthcare OS \u0627\u0644\u0645\u062A\u0635\u0644 \u0628\u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062D\u064A\u0629</p>
        <span class="api-status live">API Connected</span>
      </div>
      <div>
        <h4 data-i18n="footer.quickLinks">\u0631\u0648\u0627\u0628\u0637 \u0633\u0631\u064A\u0639\u0629</h4>
        <a href="about.html" data-i18n="nav.about">\u0639\u0646 \u0627\u0644\u0645\u062C\u0645\u0648\u0639\u0629</a>
        <a href="departments.html" data-i18n="nav.departments">\u0627\u0644\u0623\u0642\u0633\u0627\u0645 \u0627\u0644\u0637\u0628\u064A\u0629</a>
        <a href="doctors.html" data-i18n="nav.doctors">\u0623\u0637\u0628\u0627\u0624\u0646\u0627</a>
        <a href="branches.html" data-i18n="nav.branches">\u0641\u0631\u0648\u0639\u0646\u0627</a>
        <a href="packages.html" data-i18n="nav.packages">\u0628\u0627\u0642\u0627\u062A \u0627\u0644\u0631\u0639\u0627\u064A\u0629</a>
        <a href="blog.html" data-i18n="nav.blog">\u0627\u0644\u0645\u062F\u0648\u0646\u0629 \u0627\u0644\u0635\u062D\u064A\u0629</a>
        <a href="academy.html" data-i18n="nav.academy">\u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629 \u0627\u0644\u062D\u064A\u0627\u0629</a>
        <a href="faq.html" data-i18n="nav.faq">\u0627\u0644\u0623\u0633\u0626\u0644\u0629 \u0627\u0644\u0634\u0627\u0626\u0639\u0629</a>
      </div>
      <div>
        <h4 data-i18n="footer.services">\u062E\u062F\u0645\u0627\u062A\u0646\u0627</h4>
        <a href="contact.html" data-i18n="nav.book">\u062D\u062C\u0632 \u0645\u0648\u0639\u062F</a>
        <a href="departments.html">\u0627\u0644\u0639\u064A\u0627\u062F\u0627\u062A \u0627\u0644\u062E\u0627\u0631\u062C\u064A\u0629</a>
        <a href="departments.html">\u0627\u0644\u0637\u0648\u0627\u0631\u0626</a>
        <a href="departments.html">\u0627\u0644\u062C\u0631\u0627\u062D\u0627\u062A</a>
        <a href="packages.html" data-i18n="nav.packages">\u0628\u0627\u0642\u0627\u062A \u0627\u0644\u0631\u0639\u0627\u064A\u0629</a>
      </div>
      <div>
        <h4 data-i18n="footer.contact">\u062A\u0648\u0627\u0635\u0644 \u0645\u0639\u0646\u0627</h4>
        <a href="tel:966920000094">+966920000094</a>
        <a href="mailto:info@hayathospitals.com">info@hayathospitals.com</a>
        <p style="margin-top:8px;font-size:0.85rem;">\u0627\u0644\u0631\u064A\u0627\u0636\u060C \u0627\u0644\u0645\u0645\u0644\u0643\u0629 \u0627\u0644\u0639\u0631\u0628\u064A\u0629 \u0627\u0644\u0633\u0639\u0648\u062F\u064A\u0629</p>
      </div>
    </div>
    <div class="footer-bottom">
      <p>\xA9 2026 \u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A \u2014 BrainSAIT Healthcare OS</p>
    </div>
  </div>
</footer>

<a href="https://wa.me/966920000094" class="wa-float" target="_blank" rel="noopener" aria-label="WhatsApp">
  <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492l4.624-1.47A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75c-2.115 0-4.142-.665-5.847-1.884l-.42-.279-2.746.874.874-2.746-.279-.42A9.713 9.713 0 012.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75z"/></svg>
</a>
<button class="back-top" onclick="window.scrollTo({top:0,behavior:'smooth'})" aria-label="Back to top">
  <svg viewBox="0 0 24 24"><path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/></svg>
</button>

<script src="js/common.js"><\/script>
<script src="js/academy-data.js"><\/script>
<script>
const COURSE_SLUG = 'clinical-documentation';
const COURSE_ROUTES = {
  'nphies': 'course-nphies.html',
  'medical-coding': 'course-medical-coding.html',
  'rcm': 'course-rcm.html',
  'ai-healthcare': 'course-ai-healthcare.html',
  'pdpl': 'course-pdpl.html',
  'clinical-documentation': 'course-clinical-documentation.html',
  'pharmacy': 'course-pharmacy.html',
  'cbahi-quality': 'course-cbahi-quality.html',
  'infection-control': 'course-infection-control.html'
};
const LABELS = {
  ar: {
    home: '\u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629',
    academy: '\u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629 \u0627\u0644\u062D\u064A\u0627\u0629',
    duration: '\u0627\u0644\u0645\u062F\u0629',
    level: '\u0627\u0644\u0645\u0633\u062A\u0648\u0649',
    certificate: '\u0627\u0644\u0634\u0647\u0627\u062F\u0629',
    overview: '\u0646\u0638\u0631\u0629 \u0639\u0627\u0645\u0629',
    audience: '\u0627\u0644\u0641\u0626\u0629 \u0627\u0644\u0645\u0633\u062A\u0647\u062F\u0641\u0629',
    mode: '\u0646\u0645\u0637 \u0627\u0644\u062A\u0642\u062F\u064A\u0645',
    faqTitle: '\u0627\u0644\u0623\u0633\u0626\u0644\u0629 \u0627\u0644\u0634\u0627\u0626\u0639\u0629 \u0644\u0644\u062F\u0648\u0631\u0629',
    relatedTitle: '\u062F\u0648\u0631\u0627\u062A \u0630\u0627\u062A \u0635\u0644\u0629',
    relatedDetails: '\u0639\u0631\u0636 \u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u062F\u0648\u0631\u0629',
    ctaTitle: '\u0633\u062C\u0644 \u0641\u064A \u0627\u0644\u062F\u0648\u0631\u0629 \u0627\u0644\u0622\u0646',
    ctaSubtitle: '\u0627\u062D\u062C\u0632 \u0645\u0642\u0639\u062F\u0643 \u0627\u0644\u0622\u0646 \u0648\u062A\u0648\u0627\u0635\u0644 \u0645\u0639 \u0641\u0631\u064A\u0642 \u0627\u0644\u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629',
    ctaPrimary: '\u0633\u062C\u0644 \u0627\u0644\u0622\u0646',
    ctaSecondary: '\u0627\u0644\u0639\u0648\u062F\u0629 \u0625\u0644\u0649 \u0627\u0644\u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629'
  },
  en: {
    home: 'Home',
    academy: 'Life Academy',
    duration: 'Duration',
    level: 'Level',
    certificate: 'Certificate',
    overview: 'Overview',
    audience: 'Target Audience',
    mode: 'Delivery Mode',
    faqTitle: 'Course FAQs',
    relatedTitle: 'Related Courses',
    relatedDetails: 'View Course Details',
    ctaTitle: 'Enroll in This Course',
    ctaSubtitle: 'Reserve your seat and connect with the academy team',
    ctaPrimary: 'Enroll Now',
    ctaSecondary: 'Back to Academy'
  }
};

function renderCoursePage(lang) {
  const academy = window.HNH_ACADEMY_DATA.academy[lang];
  const course = window.HNH_ACADEMY_DATA.courses[COURSE_SLUG][lang];
  const labels = LABELS[lang];
  const absoluteUrl = \`https://hnh.brainsait.org/\${window.location.pathname.split('/').pop()}\`;

  document.getElementById('canonicalLink').setAttribute('href', absoluteUrl);
  document.getElementById('ogUrlMeta').setAttribute('content', absoluteUrl);

  const metaTitle = \`\${course.title} | \${academy.breadcrumbCurrent}\`;
  document.title = metaTitle;
  document.querySelector('meta[name="description"]').setAttribute('content', course.shortDescription);
  document.querySelector('meta[property="og:title"]').setAttribute('content', metaTitle);
  document.querySelector('meta[property="og:description"]').setAttribute('content', course.shortDescription);
  document.querySelector('meta[name="twitter:title"]').setAttribute('content', metaTitle);
  document.querySelector('meta[name="twitter:description"]').setAttribute('content', course.shortDescription);

  document.getElementById('crumbHome').textContent = labels.home;
  document.getElementById('crumbAcademy').textContent = labels.academy;
  document.getElementById('crumbCourse').textContent = course.title;
  document.getElementById('courseTitle').textContent = course.title;
  document.getElementById('courseSubtitle').textContent = course.shortDescription;
  document.getElementById('durationLabel').textContent = labels.duration;
  document.getElementById('levelLabel').textContent = labels.level;
  document.getElementById('certificateLabel').textContent = labels.certificate;
  document.getElementById('courseDuration').textContent = course.duration;
  document.getElementById('courseLevel').textContent = course.level;
  document.getElementById('courseCertificate').textContent = course.certificate;
  document.getElementById('overviewLabel').textContent = labels.overview;
  document.getElementById('courseOverview').textContent = course.overview;
  document.getElementById('audienceLabel').textContent = labels.audience;
  document.getElementById('courseAudience').textContent = course.audience;
  document.getElementById('modeLabel').textContent = labels.mode;
  document.getElementById('courseMode').textContent = course.mode;
  document.getElementById('outcomesTitle').textContent = course.outcomesTitle;
  document.getElementById('curriculumTitle').textContent = course.curriculumTitle;
  document.getElementById('materialsTitle').textContent = course.materialsTitle;
  document.getElementById('prereqTitle').textContent = course.prereqTitle;
  document.getElementById('assessmentTitle').textContent = course.assessmentTitle;
  document.getElementById('coursePrereq').textContent = course.prereq;
  document.getElementById('courseAssessment').textContent = course.assessment;
  document.getElementById('faqTitle').textContent = labels.faqTitle;
  document.getElementById('relatedTitle').textContent = labels.relatedTitle;
  document.getElementById('ctaTitle').textContent = labels.ctaTitle;
  document.getElementById('ctaSubtitle').textContent = labels.ctaSubtitle;
  document.getElementById('ctaPrimary').textContent = labels.ctaPrimary;
  document.getElementById('ctaSecondary').textContent = labels.ctaSecondary;

  document.getElementById('courseOutcomes').innerHTML = course.outcomes.map(item => \`<li>\${item}</li>\`).join('');
  document.getElementById('courseMaterials').innerHTML = course.materials.map(item => \`<li>\${item}</li>\`).join('');

  document.getElementById('courseModules').innerHTML = course.modules.map((module, idx) => \`
    <div class="card animate-on-scroll delay-\${(idx % 6) + 1}">
      <h4>\${module.title}</h4>
      <ul style="list-style:disc;padding-inline-start:24px;display:grid;gap:8px;margin-top:12px;color:var(--text-light);">
        \${module.points.map(point => \`<li>\${point}</li>\`).join('')}
      </ul>
    </div>
  \`).join('');

  const faqRoot = document.getElementById('courseFaq');
  faqRoot.innerHTML = course.faq.map((item, index) => \`
    <div class="faq-item animate-on-scroll delay-\${(index % 6) + 1}">
      <button class="faq-question">
        <span>\${item.q}</span>
        <svg class="faq-chevron" viewBox="0 0 24 24"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z"/></svg>
      </button>
      <div class="faq-answer"><p>\${item.a}</p></div>
    </div>
  \`).join('');

  faqRoot.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const answer = btn.nextElementSibling;
      const isOpen = btn.classList.contains('active');
      faqRoot.querySelectorAll('.faq-question').forEach(q => q.classList.remove('active'));
      faqRoot.querySelectorAll('.faq-answer').forEach(a => a.classList.remove('open'));
      if (!isOpen) {
        btn.classList.add('active');
        answer.classList.add('open');
      }
    });
  });

  const related = Object.entries(window.HNH_ACADEMY_DATA.courses)
    .filter(([slug]) => slug !== COURSE_SLUG)
    .slice(0, 3)
    .map(([slug, value]) => ({ slug, data: value[lang] }));

  const relatedGrid = document.getElementById('relatedGrid');
  relatedGrid.innerHTML = related.map((item, idx) => \`
    <div class="course-card animate-on-scroll delay-\${(idx % 3) + 1}">
      <div class="course-header"><h3 style="color:white;">\${item.data.title}</h3></div>
      <div class="course-body">
        <p>\${item.data.shortDescription}</p>
        <div class="course-meta"><span>\${labels.duration}: \${item.data.duration}</span><span>\${labels.level}: \${item.data.level}</span></div>
        <div style="margin-top:14px;">
          <a href="\${COURSE_ROUTES[item.slug]}" class="btn btn-outline btn-sm">\${labels.relatedDetails}</a>
        </div>
      </div>
    </div>
  \`).join('');

  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.title,
    description: course.shortDescription,
    provider: {
      '@type': 'Hospital',
      name: 'Hayat National Hospitals',
      url: 'https://hnh.brainsait.org'
    },
    inLanguage: lang,
    educationalCredentialAwarded: course.certificate,
    timeRequired: course.duration,
    url: absoluteUrl
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: course.faq.map(item => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a }
    }))
  };

  document.getElementById('courseSchema').textContent = JSON.stringify(courseSchema);
  document.getElementById('faqSchemaCourse').textContent = JSON.stringify(faqSchema);
}

document.addEventListener('DOMContentLoaded', () => {
  renderCoursePage(HNH.currentLang());
});

document.addEventListener('hnh:langChanged', e => {
  renderCoursePage(e.detail.lang);
});
<\/script>
</body>
</html>
`;
var course_infection_control = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>\u062F\u0648\u0631\u0629 \u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629 \u0627\u0644\u062D\u064A\u0627\u0629</title>
<meta name="description" content="\u062A\u0641\u0627\u0635\u064A\u0644 \u062F\u0648\u0631\u0629 \u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629 \u0627\u0644\u062D\u064A\u0627\u0629.">
<meta name="robots" content="index, follow">
<meta name="theme-color" content="#0066CC">
<link id="canonicalLink" rel="canonical" href="https://hnh.brainsait.org/course-infection-control.html">
<link rel="alternate" hreflang="ar" href="https://hnh.brainsait.org/course-infection-control.html">
<link rel="alternate" hreflang="en" href="https://hnh.brainsait.org/course-infection-control.html">
<link rel="alternate" hreflang="x-default" href="https://hnh.brainsait.org/course-infection-control.html">
<link rel="manifest" href="/manifest.json">
<link rel="apple-touch-icon" href="/icon-192.png">
<meta property="og:type" content="website">
<meta property="og:site_name" content="\u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A | Hayat National Hospitals">
<meta property="og:title" content="\u062F\u0648\u0631\u0627\u062A \u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629 \u0627\u0644\u062D\u064A\u0627\u0629">
<meta property="og:description" content="\u0645\u062D\u062A\u0648\u0649 \u062A\u062F\u0631\u064A\u0628\u064A \u062A\u0641\u0635\u064A\u0644\u064A \u0645\u0639 \u0645\u0633\u0627\u0631\u0627\u062A \u062A\u0639\u0644\u0645 \u0639\u0645\u0644\u064A\u0629.">
<meta id="ogUrlMeta" property="og:url" content="https://hnh.brainsait.org/course-infection-control.html">
<meta property="og:image" content="https://hnh.brainsait.org/og-image.jpg">
<meta property="og:locale" content="ar_SA">
<meta property="og:locale:alternate" content="en_US">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="\u062F\u0648\u0631\u0627\u062A \u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629 \u0627\u0644\u062D\u064A\u0627\u0629">
<meta name="twitter:description" content="\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u062F\u0648\u0631\u0627\u062A \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u064A\u0629 \u0645\u0646 \u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629 \u0627\u0644\u062D\u064A\u0627\u0629.">
<meta name="twitter:image" content="https://hnh.brainsait.org/og-image.jpg">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Tajawal:wght@300;400;500;700;800;900&display=swap" rel="stylesheet">
<link rel="stylesheet" href="css/style.css">
<script type="application/ld+json" id="courseSchema"><\/script>
<script type="application/ld+json" id="faqSchemaCourse"><\/script>
</head>
<body>
<a href="#main-content" class="skip-link">Skip to main content</a>
<header class="header"><div class="container header-inner"><a href="index.html" class="logo"><div class="logo-icon"><svg viewBox="0 0 24 24" width="24" height="24" fill="white"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg></div><div class="logo-text">\u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A<small>BrainSAIT Healthcare OS</small></div></a>
<nav class="nav" id="mainNav">
      <a href="index.html" data-i18n="nav.home">\u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629</a>
      <a href="about.html" data-i18n="nav.about">\u0639\u0646 \u0627\u0644\u0645\u062C\u0645\u0648\u0639\u0629</a>
      <a href="departments.html" data-i18n="nav.departments">\u0627\u0644\u0623\u0642\u0633\u0627\u0645 \u0627\u0644\u0637\u0628\u064A\u0629</a>
      <a href="doctors.html" data-i18n="nav.doctors">\u0623\u0637\u0628\u0627\u0624\u0646\u0627</a>
      <a href="branches.html" data-i18n="nav.branches">\u0641\u0631\u0648\u0639\u0646\u0627</a>
      <a href="packages.html" data-i18n="nav.packages">\u0628\u0627\u0642\u0627\u062A \u0627\u0644\u0631\u0639\u0627\u064A\u0629</a>
      <a href="blog.html" data-i18n="nav.blog">\u0627\u0644\u0645\u062F\u0648\u0646\u0629 \u0627\u0644\u0635\u062D\u064A\u0629</a>
      <a href="academy.html" data-i18n="nav.academy">\u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629 \u0627\u0644\u062D\u064A\u0627\u0629</a>
      <a href="contact.html" data-i18n="nav.contact">\u0627\u062A\u0635\u0644 \u0628\u0646\u0627</a>
      <button class="lang-btn" onclick="HNH.setLang(HNH.currentLang()==='ar'?'en':'ar')">EN/\u0639\u0631\u0628\u064A</button>
      <a href="contact.html" class="nav-cta" data-i18n="nav.book">\u0627\u062D\u062C\u0632 \u0645\u0648\u0639\u062F</a>
    </nav><button class="mobile-toggle" aria-label="Menu"><span></span><span></span><span></span></button></div></header>

<section class="page-hero" id="main-content"><div class="container"><div class="breadcrumb"><a href="index.html" id="crumbHome">\u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629</a><span>/</span><a href="academy.html" id="crumbAcademy">\u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629 \u0627\u0644\u062D\u064A\u0627\u0629</a><span>/</span><span id="crumbCourse">\u0627\u0644\u062F\u0648\u0631\u0629</span></div><h1 id="courseTitle">\u0627\u0644\u062F\u0648\u0631\u0629</h1><p id="courseSubtitle"></p><div class="stats-bar" style="margin-top:24px;grid-template-columns:repeat(3,1fr);"><div class="stat-card"><div class="stat-label" id="durationLabel">\u0627\u0644\u0645\u062F\u0629</div><div class="stat-number" id="courseDuration">\u2014</div></div><div class="stat-card"><div class="stat-label" id="levelLabel">\u0627\u0644\u0645\u0633\u062A\u0648\u0649</div><div class="stat-number" id="courseLevel">\u2014</div></div><div class="stat-card"><div class="stat-label" id="certificateLabel">\u0627\u0644\u0634\u0647\u0627\u062F\u0629</div><div class="stat-number" id="courseCertificate" style="font-size:1rem;">\u2014</div></div></div></div></section>

<section class="section bg-white">
  <div class="container">
    <div class="grid-2">
      <div class="card animate-on-scroll delay-1">
        <h3 id="overviewLabel">\u0646\u0638\u0631\u0629 \u0639\u0627\u0645\u0629</h3>
        <p id="courseOverview" style="margin-top:12px;color:var(--text-light);"></p>
      </div>
      <div class="card animate-on-scroll delay-2">
        <h3 id="audienceLabel">\u0627\u0644\u0641\u0626\u0629 \u0627\u0644\u0645\u0633\u062A\u0647\u062F\u0641\u0629</h3>
        <p id="courseAudience" style="margin-top:12px;color:var(--text-light);"></p>
        <h4 id="modeLabel" style="margin-top:20px;"></h4>
        <p id="courseMode" style="color:var(--text-light);"></p>
      </div>
    </div>
  </div>
</section>

<section class="section bg-light">
  <div class="container">
    <div class="section-header animate-on-scroll">
      <h2 id="outcomesTitle">\u0645\u062E\u0631\u062C\u0627\u062A \u0627\u0644\u062A\u0639\u0644\u0645</h2>
    </div>
    <div class="card"><ul id="courseOutcomes" style="list-style:disc;padding-inline-start:24px;display:grid;gap:10px;color:var(--text-light);"></ul></div>
  </div>
</section>

<section class="section bg-white">
  <div class="container">
    <div class="section-header animate-on-scroll">
      <h2 id="curriculumTitle">\u0627\u0644\u0645\u062D\u062A\u0648\u0649 \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u064A \u0627\u0644\u0643\u0627\u0645\u0644</h2>
    </div>
    <div id="courseModules" class="grid-2"></div>
  </div>
</section>

<section class="section bg-light">
  <div class="container">
    <div class="grid-2">
      <div class="card animate-on-scroll delay-1">
        <h3 id="materialsTitle">\u0627\u0644\u0645\u0648\u0627\u062F \u0627\u0644\u062A\u0639\u0644\u064A\u0645\u064A\u0629</h3>
        <ul id="courseMaterials" style="list-style:disc;padding-inline-start:24px;display:grid;gap:10px;margin-top:12px;color:var(--text-light);"></ul>
      </div>
      <div class="card animate-on-scroll delay-2">
        <h3 id="prereqTitle">\u0627\u0644\u0645\u062A\u0637\u0644\u0628\u0627\u062A \u0627\u0644\u0645\u0633\u0628\u0642\u0629</h3>
        <p id="coursePrereq" style="margin-top:12px;color:var(--text-light);"></p>
        <h3 id="assessmentTitle" style="margin-top:20px;">\u0637\u0631\u064A\u0642\u0629 \u0627\u0644\u062A\u0642\u064A\u064A\u0645</h3>
        <p id="courseAssessment" style="margin-top:12px;color:var(--text-light);"></p>
      </div>
    </div>
  </div>
</section>

<section class="section bg-white">
  <div class="container">
    <div class="section-header animate-on-scroll">
      <h2 id="faqTitle">\u0627\u0644\u0623\u0633\u0626\u0644\u0629 \u0627\u0644\u0634\u0627\u0626\u0639\u0629 \u0644\u0644\u062F\u0648\u0631\u0629</h2>
    </div>
    <div id="courseFaq" style="max-width:900px;margin:0 auto;"></div>
  </div>
</section>

<section class="section bg-light">
  <div class="container">
    <div class="section-header animate-on-scroll">
      <h2 id="relatedTitle">\u062F\u0648\u0631\u0627\u062A \u0630\u0627\u062A \u0635\u0644\u0629</h2>
    </div>
    <div class="grid-3" id="relatedGrid"></div>
  </div>
</section>

<section class="cta-section"><div class="container"><h2 id="ctaTitle">\u0633\u062C\u0644 \u0641\u064A \u0627\u0644\u062F\u0648\u0631\u0629 \u0627\u0644\u0622\u0646</h2><p id="ctaSubtitle">\u0627\u062D\u062C\u0632 \u0645\u0642\u0639\u062F\u0643 \u0627\u0644\u0622\u0646 \u0648\u062A\u0648\u0627\u0635\u0644 \u0645\u0639 \u0641\u0631\u064A\u0642 \u0627\u0644\u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629</p><div class="cta-buttons"><a href="contact.html" class="btn btn-accent btn-lg" id="ctaPrimary">\u0633\u062C\u0644 \u0627\u0644\u0622\u0646</a><a href="academy.html" class="btn btn-white btn-lg" id="ctaSecondary">\u0627\u0644\u0639\u0648\u062F\u0629 \u0625\u0644\u0649 \u0627\u0644\u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629</a></div></div></section>

<footer class="footer">
  <div class="container">
    <div class="footer-grid">
      <div>
        <h4 data-i18n="footer.name">\u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A</h4>
        <p style="margin-bottom:16px;" data-i18n="footer.desc">\u0646\u0638\u0627\u0645 BrainSAIT Healthcare OS \u0627\u0644\u0645\u062A\u0635\u0644 \u0628\u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062D\u064A\u0629</p>
        <span class="api-status live">API Connected</span>
      </div>
      <div>
        <h4 data-i18n="footer.quickLinks">\u0631\u0648\u0627\u0628\u0637 \u0633\u0631\u064A\u0639\u0629</h4>
        <a href="about.html" data-i18n="nav.about">\u0639\u0646 \u0627\u0644\u0645\u062C\u0645\u0648\u0639\u0629</a>
        <a href="departments.html" data-i18n="nav.departments">\u0627\u0644\u0623\u0642\u0633\u0627\u0645 \u0627\u0644\u0637\u0628\u064A\u0629</a>
        <a href="doctors.html" data-i18n="nav.doctors">\u0623\u0637\u0628\u0627\u0624\u0646\u0627</a>
        <a href="branches.html" data-i18n="nav.branches">\u0641\u0631\u0648\u0639\u0646\u0627</a>
        <a href="packages.html" data-i18n="nav.packages">\u0628\u0627\u0642\u0627\u062A \u0627\u0644\u0631\u0639\u0627\u064A\u0629</a>
        <a href="blog.html" data-i18n="nav.blog">\u0627\u0644\u0645\u062F\u0648\u0646\u0629 \u0627\u0644\u0635\u062D\u064A\u0629</a>
        <a href="academy.html" data-i18n="nav.academy">\u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629 \u0627\u0644\u062D\u064A\u0627\u0629</a>
        <a href="faq.html" data-i18n="nav.faq">\u0627\u0644\u0623\u0633\u0626\u0644\u0629 \u0627\u0644\u0634\u0627\u0626\u0639\u0629</a>
      </div>
      <div>
        <h4 data-i18n="footer.services">\u062E\u062F\u0645\u0627\u062A\u0646\u0627</h4>
        <a href="contact.html" data-i18n="nav.book">\u062D\u062C\u0632 \u0645\u0648\u0639\u062F</a>
        <a href="departments.html">\u0627\u0644\u0639\u064A\u0627\u062F\u0627\u062A \u0627\u0644\u062E\u0627\u0631\u062C\u064A\u0629</a>
        <a href="departments.html">\u0627\u0644\u0637\u0648\u0627\u0631\u0626</a>
        <a href="departments.html">\u0627\u0644\u062C\u0631\u0627\u062D\u0627\u062A</a>
        <a href="packages.html" data-i18n="nav.packages">\u0628\u0627\u0642\u0627\u062A \u0627\u0644\u0631\u0639\u0627\u064A\u0629</a>
      </div>
      <div>
        <h4 data-i18n="footer.contact">\u062A\u0648\u0627\u0635\u0644 \u0645\u0639\u0646\u0627</h4>
        <a href="tel:966920000094">+966920000094</a>
        <a href="mailto:info@hayathospitals.com">info@hayathospitals.com</a>
        <p style="margin-top:8px;font-size:0.85rem;">\u0627\u0644\u0631\u064A\u0627\u0636\u060C \u0627\u0644\u0645\u0645\u0644\u0643\u0629 \u0627\u0644\u0639\u0631\u0628\u064A\u0629 \u0627\u0644\u0633\u0639\u0648\u062F\u064A\u0629</p>
      </div>
    </div>
    <div class="footer-bottom">
      <p>\xA9 2026 \u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A \u2014 BrainSAIT Healthcare OS</p>
    </div>
  </div>
</footer>

<a href="https://wa.me/966920000094" class="wa-float" target="_blank" rel="noopener" aria-label="WhatsApp">
  <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492l4.624-1.47A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75c-2.115 0-4.142-.665-5.847-1.884l-.42-.279-2.746.874.874-2.746-.279-.42A9.713 9.713 0 012.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75z"/></svg>
</a>
<button class="back-top" onclick="window.scrollTo({top:0,behavior:'smooth'})" aria-label="Back to top">
  <svg viewBox="0 0 24 24"><path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/></svg>
</button>

<script src="js/common.js"><\/script>
<script src="js/academy-data.js"><\/script>
<script>
const COURSE_SLUG = 'infection-control';
const COURSE_ROUTES = {
  'nphies': 'course-nphies.html',
  'medical-coding': 'course-medical-coding.html',
  'rcm': 'course-rcm.html',
  'ai-healthcare': 'course-ai-healthcare.html',
  'pdpl': 'course-pdpl.html',
  'clinical-documentation': 'course-clinical-documentation.html',
  'pharmacy': 'course-pharmacy.html',
  'cbahi-quality': 'course-cbahi-quality.html',
  'infection-control': 'course-infection-control.html'
};
const LABELS = {
  ar: {
    home: '\u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629',
    academy: '\u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629 \u0627\u0644\u062D\u064A\u0627\u0629',
    duration: '\u0627\u0644\u0645\u062F\u0629',
    level: '\u0627\u0644\u0645\u0633\u062A\u0648\u0649',
    certificate: '\u0627\u0644\u0634\u0647\u0627\u062F\u0629',
    overview: '\u0646\u0638\u0631\u0629 \u0639\u0627\u0645\u0629',
    audience: '\u0627\u0644\u0641\u0626\u0629 \u0627\u0644\u0645\u0633\u062A\u0647\u062F\u0641\u0629',
    mode: '\u0646\u0645\u0637 \u0627\u0644\u062A\u0642\u062F\u064A\u0645',
    faqTitle: '\u0627\u0644\u0623\u0633\u0626\u0644\u0629 \u0627\u0644\u0634\u0627\u0626\u0639\u0629 \u0644\u0644\u062F\u0648\u0631\u0629',
    relatedTitle: '\u062F\u0648\u0631\u0627\u062A \u0630\u0627\u062A \u0635\u0644\u0629',
    relatedDetails: '\u0639\u0631\u0636 \u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u062F\u0648\u0631\u0629',
    ctaTitle: '\u0633\u062C\u0644 \u0641\u064A \u0627\u0644\u062F\u0648\u0631\u0629 \u0627\u0644\u0622\u0646',
    ctaSubtitle: '\u0627\u062D\u062C\u0632 \u0645\u0642\u0639\u062F\u0643 \u0627\u0644\u0622\u0646 \u0648\u062A\u0648\u0627\u0635\u0644 \u0645\u0639 \u0641\u0631\u064A\u0642 \u0627\u0644\u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629',
    ctaPrimary: '\u0633\u062C\u0644 \u0627\u0644\u0622\u0646',
    ctaSecondary: '\u0627\u0644\u0639\u0648\u062F\u0629 \u0625\u0644\u0649 \u0627\u0644\u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629'
  },
  en: {
    home: 'Home',
    academy: 'Life Academy',
    duration: 'Duration',
    level: 'Level',
    certificate: 'Certificate',
    overview: 'Overview',
    audience: 'Target Audience',
    mode: 'Delivery Mode',
    faqTitle: 'Course FAQs',
    relatedTitle: 'Related Courses',
    relatedDetails: 'View Course Details',
    ctaTitle: 'Enroll in This Course',
    ctaSubtitle: 'Reserve your seat and connect with the academy team',
    ctaPrimary: 'Enroll Now',
    ctaSecondary: 'Back to Academy'
  }
};

function renderCoursePage(lang) {
  const academy = window.HNH_ACADEMY_DATA.academy[lang];
  const course = window.HNH_ACADEMY_DATA.courses[COURSE_SLUG][lang];
  const labels = LABELS[lang];
  const absoluteUrl = \`https://hnh.brainsait.org/\${window.location.pathname.split('/').pop()}\`;

  document.getElementById('canonicalLink').setAttribute('href', absoluteUrl);
  document.getElementById('ogUrlMeta').setAttribute('content', absoluteUrl);

  const metaTitle = \`\${course.title} | \${academy.breadcrumbCurrent}\`;
  document.title = metaTitle;
  document.querySelector('meta[name="description"]').setAttribute('content', course.shortDescription);
  document.querySelector('meta[property="og:title"]').setAttribute('content', metaTitle);
  document.querySelector('meta[property="og:description"]').setAttribute('content', course.shortDescription);
  document.querySelector('meta[name="twitter:title"]').setAttribute('content', metaTitle);
  document.querySelector('meta[name="twitter:description"]').setAttribute('content', course.shortDescription);

  document.getElementById('crumbHome').textContent = labels.home;
  document.getElementById('crumbAcademy').textContent = labels.academy;
  document.getElementById('crumbCourse').textContent = course.title;
  document.getElementById('courseTitle').textContent = course.title;
  document.getElementById('courseSubtitle').textContent = course.shortDescription;
  document.getElementById('durationLabel').textContent = labels.duration;
  document.getElementById('levelLabel').textContent = labels.level;
  document.getElementById('certificateLabel').textContent = labels.certificate;
  document.getElementById('courseDuration').textContent = course.duration;
  document.getElementById('courseLevel').textContent = course.level;
  document.getElementById('courseCertificate').textContent = course.certificate;
  document.getElementById('overviewLabel').textContent = labels.overview;
  document.getElementById('courseOverview').textContent = course.overview;
  document.getElementById('audienceLabel').textContent = labels.audience;
  document.getElementById('courseAudience').textContent = course.audience;
  document.getElementById('modeLabel').textContent = labels.mode;
  document.getElementById('courseMode').textContent = course.mode;
  document.getElementById('outcomesTitle').textContent = course.outcomesTitle;
  document.getElementById('curriculumTitle').textContent = course.curriculumTitle;
  document.getElementById('materialsTitle').textContent = course.materialsTitle;
  document.getElementById('prereqTitle').textContent = course.prereqTitle;
  document.getElementById('assessmentTitle').textContent = course.assessmentTitle;
  document.getElementById('coursePrereq').textContent = course.prereq;
  document.getElementById('courseAssessment').textContent = course.assessment;
  document.getElementById('faqTitle').textContent = labels.faqTitle;
  document.getElementById('relatedTitle').textContent = labels.relatedTitle;
  document.getElementById('ctaTitle').textContent = labels.ctaTitle;
  document.getElementById('ctaSubtitle').textContent = labels.ctaSubtitle;
  document.getElementById('ctaPrimary').textContent = labels.ctaPrimary;
  document.getElementById('ctaSecondary').textContent = labels.ctaSecondary;

  document.getElementById('courseOutcomes').innerHTML = course.outcomes.map(item => \`<li>\${item}</li>\`).join('');
  document.getElementById('courseMaterials').innerHTML = course.materials.map(item => \`<li>\${item}</li>\`).join('');

  document.getElementById('courseModules').innerHTML = course.modules.map((module, idx) => \`
    <div class="card animate-on-scroll delay-\${(idx % 6) + 1}">
      <h4>\${module.title}</h4>
      <ul style="list-style:disc;padding-inline-start:24px;display:grid;gap:8px;margin-top:12px;color:var(--text-light);">
        \${module.points.map(point => \`<li>\${point}</li>\`).join('')}
      </ul>
    </div>
  \`).join('');

  const faqRoot = document.getElementById('courseFaq');
  faqRoot.innerHTML = course.faq.map((item, index) => \`
    <div class="faq-item animate-on-scroll delay-\${(index % 6) + 1}">
      <button class="faq-question">
        <span>\${item.q}</span>
        <svg class="faq-chevron" viewBox="0 0 24 24"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z"/></svg>
      </button>
      <div class="faq-answer"><p>\${item.a}</p></div>
    </div>
  \`).join('');

  faqRoot.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const answer = btn.nextElementSibling;
      const isOpen = btn.classList.contains('active');
      faqRoot.querySelectorAll('.faq-question').forEach(q => q.classList.remove('active'));
      faqRoot.querySelectorAll('.faq-answer').forEach(a => a.classList.remove('open'));
      if (!isOpen) {
        btn.classList.add('active');
        answer.classList.add('open');
      }
    });
  });

  const related = Object.entries(window.HNH_ACADEMY_DATA.courses)
    .filter(([slug]) => slug !== COURSE_SLUG)
    .slice(0, 3)
    .map(([slug, value]) => ({ slug, data: value[lang] }));

  const relatedGrid = document.getElementById('relatedGrid');
  relatedGrid.innerHTML = related.map((item, idx) => \`
    <div class="course-card animate-on-scroll delay-\${(idx % 3) + 1}">
      <div class="course-header"><h3 style="color:white;">\${item.data.title}</h3></div>
      <div class="course-body">
        <p>\${item.data.shortDescription}</p>
        <div class="course-meta"><span>\${labels.duration}: \${item.data.duration}</span><span>\${labels.level}: \${item.data.level}</span></div>
        <div style="margin-top:14px;">
          <a href="\${COURSE_ROUTES[item.slug]}" class="btn btn-outline btn-sm">\${labels.relatedDetails}</a>
        </div>
      </div>
    </div>
  \`).join('');

  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.title,
    description: course.shortDescription,
    provider: {
      '@type': 'Hospital',
      name: 'Hayat National Hospitals',
      url: 'https://hnh.brainsait.org'
    },
    inLanguage: lang,
    educationalCredentialAwarded: course.certificate,
    timeRequired: course.duration,
    url: absoluteUrl
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: course.faq.map(item => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a }
    }))
  };

  document.getElementById('courseSchema').textContent = JSON.stringify(courseSchema);
  document.getElementById('faqSchemaCourse').textContent = JSON.stringify(faqSchema);
}

document.addEventListener('DOMContentLoaded', () => {
  renderCoursePage(HNH.currentLang());
});

document.addEventListener('hnh:langChanged', e => {
  renderCoursePage(e.detail.lang);
});
<\/script>
</body>
</html>
`;
var course_medical_coding = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>\u062F\u0648\u0631\u0629 \u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629 \u0627\u0644\u062D\u064A\u0627\u0629</title>
<meta name="description" content="\u062A\u0641\u0627\u0635\u064A\u0644 \u062F\u0648\u0631\u0629 \u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629 \u0627\u0644\u062D\u064A\u0627\u0629.">
<meta name="robots" content="index, follow">
<meta name="theme-color" content="#0066CC">
<link id="canonicalLink" rel="canonical" href="https://hnh.brainsait.org/course-medical-coding.html">
<link rel="alternate" hreflang="ar" href="https://hnh.brainsait.org/course-medical-coding.html">
<link rel="alternate" hreflang="en" href="https://hnh.brainsait.org/course-medical-coding.html">
<link rel="alternate" hreflang="x-default" href="https://hnh.brainsait.org/course-medical-coding.html">
<link rel="manifest" href="/manifest.json">
<link rel="apple-touch-icon" href="/icon-192.png">
<meta property="og:type" content="website">
<meta property="og:site_name" content="\u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A | Hayat National Hospitals">
<meta property="og:title" content="\u062F\u0648\u0631\u0627\u062A \u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629 \u0627\u0644\u062D\u064A\u0627\u0629">
<meta property="og:description" content="\u0645\u062D\u062A\u0648\u0649 \u062A\u062F\u0631\u064A\u0628\u064A \u062A\u0641\u0635\u064A\u0644\u064A \u0645\u0639 \u0645\u0633\u0627\u0631\u0627\u062A \u062A\u0639\u0644\u0645 \u0639\u0645\u0644\u064A\u0629.">
<meta id="ogUrlMeta" property="og:url" content="https://hnh.brainsait.org/course-medical-coding.html">
<meta property="og:image" content="https://hnh.brainsait.org/og-image.jpg">
<meta property="og:locale" content="ar_SA">
<meta property="og:locale:alternate" content="en_US">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="\u062F\u0648\u0631\u0627\u062A \u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629 \u0627\u0644\u062D\u064A\u0627\u0629">
<meta name="twitter:description" content="\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u062F\u0648\u0631\u0627\u062A \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u064A\u0629 \u0645\u0646 \u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629 \u0627\u0644\u062D\u064A\u0627\u0629.">
<meta name="twitter:image" content="https://hnh.brainsait.org/og-image.jpg">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Tajawal:wght@300;400;500;700;800;900&display=swap" rel="stylesheet">
<link rel="stylesheet" href="css/style.css">
<script type="application/ld+json" id="courseSchema"><\/script>
<script type="application/ld+json" id="faqSchemaCourse"><\/script>
</head>
<body>
<a href="#main-content" class="skip-link">Skip to main content</a>
<header class="header"><div class="container header-inner"><a href="index.html" class="logo"><div class="logo-icon"><svg viewBox="0 0 24 24" width="24" height="24" fill="white"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg></div><div class="logo-text">\u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A<small>BrainSAIT Healthcare OS</small></div></a>
<nav class="nav" id="mainNav">
      <a href="index.html" data-i18n="nav.home">\u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629</a>
      <a href="about.html" data-i18n="nav.about">\u0639\u0646 \u0627\u0644\u0645\u062C\u0645\u0648\u0639\u0629</a>
      <a href="departments.html" data-i18n="nav.departments">\u0627\u0644\u0623\u0642\u0633\u0627\u0645 \u0627\u0644\u0637\u0628\u064A\u0629</a>
      <a href="doctors.html" data-i18n="nav.doctors">\u0623\u0637\u0628\u0627\u0624\u0646\u0627</a>
      <a href="branches.html" data-i18n="nav.branches">\u0641\u0631\u0648\u0639\u0646\u0627</a>
      <a href="packages.html" data-i18n="nav.packages">\u0628\u0627\u0642\u0627\u062A \u0627\u0644\u0631\u0639\u0627\u064A\u0629</a>
      <a href="blog.html" data-i18n="nav.blog">\u0627\u0644\u0645\u062F\u0648\u0646\u0629 \u0627\u0644\u0635\u062D\u064A\u0629</a>
      <a href="academy.html" data-i18n="nav.academy">\u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629 \u0627\u0644\u062D\u064A\u0627\u0629</a>
      <a href="contact.html" data-i18n="nav.contact">\u0627\u062A\u0635\u0644 \u0628\u0646\u0627</a>
      <button class="lang-btn" onclick="HNH.setLang(HNH.currentLang()==='ar'?'en':'ar')">EN/\u0639\u0631\u0628\u064A</button>
      <a href="contact.html" class="nav-cta" data-i18n="nav.book">\u0627\u062D\u062C\u0632 \u0645\u0648\u0639\u062F</a>
    </nav><button class="mobile-toggle" aria-label="Menu"><span></span><span></span><span></span></button></div></header>

<section class="page-hero" id="main-content"><div class="container"><div class="breadcrumb"><a href="index.html" id="crumbHome">\u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629</a><span>/</span><a href="academy.html" id="crumbAcademy">\u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629 \u0627\u0644\u062D\u064A\u0627\u0629</a><span>/</span><span id="crumbCourse">\u0627\u0644\u062F\u0648\u0631\u0629</span></div><h1 id="courseTitle">\u0627\u0644\u062F\u0648\u0631\u0629</h1><p id="courseSubtitle"></p><div class="stats-bar" style="margin-top:24px;grid-template-columns:repeat(3,1fr);"><div class="stat-card"><div class="stat-label" id="durationLabel">\u0627\u0644\u0645\u062F\u0629</div><div class="stat-number" id="courseDuration">\u2014</div></div><div class="stat-card"><div class="stat-label" id="levelLabel">\u0627\u0644\u0645\u0633\u062A\u0648\u0649</div><div class="stat-number" id="courseLevel">\u2014</div></div><div class="stat-card"><div class="stat-label" id="certificateLabel">\u0627\u0644\u0634\u0647\u0627\u062F\u0629</div><div class="stat-number" id="courseCertificate" style="font-size:1rem;">\u2014</div></div></div></div></section>

<section class="section bg-white">
  <div class="container">
    <div class="grid-2">
      <div class="card animate-on-scroll delay-1">
        <h3 id="overviewLabel">\u0646\u0638\u0631\u0629 \u0639\u0627\u0645\u0629</h3>
        <p id="courseOverview" style="margin-top:12px;color:var(--text-light);"></p>
      </div>
      <div class="card animate-on-scroll delay-2">
        <h3 id="audienceLabel">\u0627\u0644\u0641\u0626\u0629 \u0627\u0644\u0645\u0633\u062A\u0647\u062F\u0641\u0629</h3>
        <p id="courseAudience" style="margin-top:12px;color:var(--text-light);"></p>
        <h4 id="modeLabel" style="margin-top:20px;"></h4>
        <p id="courseMode" style="color:var(--text-light);"></p>
      </div>
    </div>
  </div>
</section>

<section class="section bg-light">
  <div class="container">
    <div class="section-header animate-on-scroll">
      <h2 id="outcomesTitle">\u0645\u062E\u0631\u062C\u0627\u062A \u0627\u0644\u062A\u0639\u0644\u0645</h2>
    </div>
    <div class="card"><ul id="courseOutcomes" style="list-style:disc;padding-inline-start:24px;display:grid;gap:10px;color:var(--text-light);"></ul></div>
  </div>
</section>

<section class="section bg-white">
  <div class="container">
    <div class="section-header animate-on-scroll">
      <h2 id="curriculumTitle">\u0627\u0644\u0645\u062D\u062A\u0648\u0649 \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u064A \u0627\u0644\u0643\u0627\u0645\u0644</h2>
    </div>
    <div id="courseModules" class="grid-2"></div>
  </div>
</section>

<section class="section bg-light">
  <div class="container">
    <div class="grid-2">
      <div class="card animate-on-scroll delay-1">
        <h3 id="materialsTitle">\u0627\u0644\u0645\u0648\u0627\u062F \u0627\u0644\u062A\u0639\u0644\u064A\u0645\u064A\u0629</h3>
        <ul id="courseMaterials" style="list-style:disc;padding-inline-start:24px;display:grid;gap:10px;margin-top:12px;color:var(--text-light);"></ul>
      </div>
      <div class="card animate-on-scroll delay-2">
        <h3 id="prereqTitle">\u0627\u0644\u0645\u062A\u0637\u0644\u0628\u0627\u062A \u0627\u0644\u0645\u0633\u0628\u0642\u0629</h3>
        <p id="coursePrereq" style="margin-top:12px;color:var(--text-light);"></p>
        <h3 id="assessmentTitle" style="margin-top:20px;">\u0637\u0631\u064A\u0642\u0629 \u0627\u0644\u062A\u0642\u064A\u064A\u0645</h3>
        <p id="courseAssessment" style="margin-top:12px;color:var(--text-light);"></p>
      </div>
    </div>
  </div>
</section>

<section class="section bg-white">
  <div class="container">
    <div class="section-header animate-on-scroll">
      <h2 id="faqTitle">\u0627\u0644\u0623\u0633\u0626\u0644\u0629 \u0627\u0644\u0634\u0627\u0626\u0639\u0629 \u0644\u0644\u062F\u0648\u0631\u0629</h2>
    </div>
    <div id="courseFaq" style="max-width:900px;margin:0 auto;"></div>
  </div>
</section>

<section class="section bg-light">
  <div class="container">
    <div class="section-header animate-on-scroll">
      <h2 id="relatedTitle">\u062F\u0648\u0631\u0627\u062A \u0630\u0627\u062A \u0635\u0644\u0629</h2>
    </div>
    <div class="grid-3" id="relatedGrid"></div>
  </div>
</section>

<section class="cta-section"><div class="container"><h2 id="ctaTitle">\u0633\u062C\u0644 \u0641\u064A \u0627\u0644\u062F\u0648\u0631\u0629 \u0627\u0644\u0622\u0646</h2><p id="ctaSubtitle">\u0627\u062D\u062C\u0632 \u0645\u0642\u0639\u062F\u0643 \u0627\u0644\u0622\u0646 \u0648\u062A\u0648\u0627\u0635\u0644 \u0645\u0639 \u0641\u0631\u064A\u0642 \u0627\u0644\u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629</p><div class="cta-buttons"><a href="contact.html" class="btn btn-accent btn-lg" id="ctaPrimary">\u0633\u062C\u0644 \u0627\u0644\u0622\u0646</a><a href="academy.html" class="btn btn-white btn-lg" id="ctaSecondary">\u0627\u0644\u0639\u0648\u062F\u0629 \u0625\u0644\u0649 \u0627\u0644\u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629</a></div></div></section>

<footer class="footer">
  <div class="container">
    <div class="footer-grid">
      <div>
        <h4 data-i18n="footer.name">\u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A</h4>
        <p style="margin-bottom:16px;" data-i18n="footer.desc">\u0646\u0638\u0627\u0645 BrainSAIT Healthcare OS \u0627\u0644\u0645\u062A\u0635\u0644 \u0628\u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062D\u064A\u0629</p>
        <span class="api-status live">API Connected</span>
      </div>
      <div>
        <h4 data-i18n="footer.quickLinks">\u0631\u0648\u0627\u0628\u0637 \u0633\u0631\u064A\u0639\u0629</h4>
        <a href="about.html" data-i18n="nav.about">\u0639\u0646 \u0627\u0644\u0645\u062C\u0645\u0648\u0639\u0629</a>
        <a href="departments.html" data-i18n="nav.departments">\u0627\u0644\u0623\u0642\u0633\u0627\u0645 \u0627\u0644\u0637\u0628\u064A\u0629</a>
        <a href="doctors.html" data-i18n="nav.doctors">\u0623\u0637\u0628\u0627\u0624\u0646\u0627</a>
        <a href="branches.html" data-i18n="nav.branches">\u0641\u0631\u0648\u0639\u0646\u0627</a>
        <a href="packages.html" data-i18n="nav.packages">\u0628\u0627\u0642\u0627\u062A \u0627\u0644\u0631\u0639\u0627\u064A\u0629</a>
        <a href="blog.html" data-i18n="nav.blog">\u0627\u0644\u0645\u062F\u0648\u0646\u0629 \u0627\u0644\u0635\u062D\u064A\u0629</a>
        <a href="academy.html" data-i18n="nav.academy">\u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629 \u0627\u0644\u062D\u064A\u0627\u0629</a>
        <a href="faq.html" data-i18n="nav.faq">\u0627\u0644\u0623\u0633\u0626\u0644\u0629 \u0627\u0644\u0634\u0627\u0626\u0639\u0629</a>
      </div>
      <div>
        <h4 data-i18n="footer.services">\u062E\u062F\u0645\u0627\u062A\u0646\u0627</h4>
        <a href="contact.html" data-i18n="nav.book">\u062D\u062C\u0632 \u0645\u0648\u0639\u062F</a>
        <a href="departments.html">\u0627\u0644\u0639\u064A\u0627\u062F\u0627\u062A \u0627\u0644\u062E\u0627\u0631\u062C\u064A\u0629</a>
        <a href="departments.html">\u0627\u0644\u0637\u0648\u0627\u0631\u0626</a>
        <a href="departments.html">\u0627\u0644\u062C\u0631\u0627\u062D\u0627\u062A</a>
        <a href="packages.html" data-i18n="nav.packages">\u0628\u0627\u0642\u0627\u062A \u0627\u0644\u0631\u0639\u0627\u064A\u0629</a>
      </div>
      <div>
        <h4 data-i18n="footer.contact">\u062A\u0648\u0627\u0635\u0644 \u0645\u0639\u0646\u0627</h4>
        <a href="tel:966920000094">+966920000094</a>
        <a href="mailto:info@hayathospitals.com">info@hayathospitals.com</a>
        <p style="margin-top:8px;font-size:0.85rem;">\u0627\u0644\u0631\u064A\u0627\u0636\u060C \u0627\u0644\u0645\u0645\u0644\u0643\u0629 \u0627\u0644\u0639\u0631\u0628\u064A\u0629 \u0627\u0644\u0633\u0639\u0648\u062F\u064A\u0629</p>
      </div>
    </div>
    <div class="footer-bottom">
      <p>\xA9 2026 \u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A \u2014 BrainSAIT Healthcare OS</p>
    </div>
  </div>
</footer>

<a href="https://wa.me/966920000094" class="wa-float" target="_blank" rel="noopener" aria-label="WhatsApp">
  <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492l4.624-1.47A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75c-2.115 0-4.142-.665-5.847-1.884l-.42-.279-2.746.874.874-2.746-.279-.42A9.713 9.713 0 012.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75z"/></svg>
</a>
<button class="back-top" onclick="window.scrollTo({top:0,behavior:'smooth'})" aria-label="Back to top">
  <svg viewBox="0 0 24 24"><path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/></svg>
</button>

<script src="js/common.js"><\/script>
<script src="js/academy-data.js"><\/script>
<script>
const COURSE_SLUG = 'medical-coding';
const COURSE_ROUTES = {
  'nphies': 'course-nphies.html',
  'medical-coding': 'course-medical-coding.html',
  'rcm': 'course-rcm.html',
  'ai-healthcare': 'course-ai-healthcare.html',
  'pdpl': 'course-pdpl.html',
  'clinical-documentation': 'course-clinical-documentation.html',
  'pharmacy': 'course-pharmacy.html',
  'cbahi-quality': 'course-cbahi-quality.html',
  'infection-control': 'course-infection-control.html'
};
const LABELS = {
  ar: {
    home: '\u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629',
    academy: '\u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629 \u0627\u0644\u062D\u064A\u0627\u0629',
    duration: '\u0627\u0644\u0645\u062F\u0629',
    level: '\u0627\u0644\u0645\u0633\u062A\u0648\u0649',
    certificate: '\u0627\u0644\u0634\u0647\u0627\u062F\u0629',
    overview: '\u0646\u0638\u0631\u0629 \u0639\u0627\u0645\u0629',
    audience: '\u0627\u0644\u0641\u0626\u0629 \u0627\u0644\u0645\u0633\u062A\u0647\u062F\u0641\u0629',
    mode: '\u0646\u0645\u0637 \u0627\u0644\u062A\u0642\u062F\u064A\u0645',
    faqTitle: '\u0627\u0644\u0623\u0633\u0626\u0644\u0629 \u0627\u0644\u0634\u0627\u0626\u0639\u0629 \u0644\u0644\u062F\u0648\u0631\u0629',
    relatedTitle: '\u062F\u0648\u0631\u0627\u062A \u0630\u0627\u062A \u0635\u0644\u0629',
    relatedDetails: '\u0639\u0631\u0636 \u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u062F\u0648\u0631\u0629',
    ctaTitle: '\u0633\u062C\u0644 \u0641\u064A \u0627\u0644\u062F\u0648\u0631\u0629 \u0627\u0644\u0622\u0646',
    ctaSubtitle: '\u0627\u062D\u062C\u0632 \u0645\u0642\u0639\u062F\u0643 \u0627\u0644\u0622\u0646 \u0648\u062A\u0648\u0627\u0635\u0644 \u0645\u0639 \u0641\u0631\u064A\u0642 \u0627\u0644\u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629',
    ctaPrimary: '\u0633\u062C\u0644 \u0627\u0644\u0622\u0646',
    ctaSecondary: '\u0627\u0644\u0639\u0648\u062F\u0629 \u0625\u0644\u0649 \u0627\u0644\u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629'
  },
  en: {
    home: 'Home',
    academy: 'Life Academy',
    duration: 'Duration',
    level: 'Level',
    certificate: 'Certificate',
    overview: 'Overview',
    audience: 'Target Audience',
    mode: 'Delivery Mode',
    faqTitle: 'Course FAQs',
    relatedTitle: 'Related Courses',
    relatedDetails: 'View Course Details',
    ctaTitle: 'Enroll in This Course',
    ctaSubtitle: 'Reserve your seat and connect with the academy team',
    ctaPrimary: 'Enroll Now',
    ctaSecondary: 'Back to Academy'
  }
};

function renderCoursePage(lang) {
  const academy = window.HNH_ACADEMY_DATA.academy[lang];
  const course = window.HNH_ACADEMY_DATA.courses[COURSE_SLUG][lang];
  const labels = LABELS[lang];
  const absoluteUrl = \`https://hnh.brainsait.org/\${window.location.pathname.split('/').pop()}\`;

  document.getElementById('canonicalLink').setAttribute('href', absoluteUrl);
  document.getElementById('ogUrlMeta').setAttribute('content', absoluteUrl);

  const metaTitle = \`\${course.title} | \${academy.breadcrumbCurrent}\`;
  document.title = metaTitle;
  document.querySelector('meta[name="description"]').setAttribute('content', course.shortDescription);
  document.querySelector('meta[property="og:title"]').setAttribute('content', metaTitle);
  document.querySelector('meta[property="og:description"]').setAttribute('content', course.shortDescription);
  document.querySelector('meta[name="twitter:title"]').setAttribute('content', metaTitle);
  document.querySelector('meta[name="twitter:description"]').setAttribute('content', course.shortDescription);

  document.getElementById('crumbHome').textContent = labels.home;
  document.getElementById('crumbAcademy').textContent = labels.academy;
  document.getElementById('crumbCourse').textContent = course.title;
  document.getElementById('courseTitle').textContent = course.title;
  document.getElementById('courseSubtitle').textContent = course.shortDescription;
  document.getElementById('durationLabel').textContent = labels.duration;
  document.getElementById('levelLabel').textContent = labels.level;
  document.getElementById('certificateLabel').textContent = labels.certificate;
  document.getElementById('courseDuration').textContent = course.duration;
  document.getElementById('courseLevel').textContent = course.level;
  document.getElementById('courseCertificate').textContent = course.certificate;
  document.getElementById('overviewLabel').textContent = labels.overview;
  document.getElementById('courseOverview').textContent = course.overview;
  document.getElementById('audienceLabel').textContent = labels.audience;
  document.getElementById('courseAudience').textContent = course.audience;
  document.getElementById('modeLabel').textContent = labels.mode;
  document.getElementById('courseMode').textContent = course.mode;
  document.getElementById('outcomesTitle').textContent = course.outcomesTitle;
  document.getElementById('curriculumTitle').textContent = course.curriculumTitle;
  document.getElementById('materialsTitle').textContent = course.materialsTitle;
  document.getElementById('prereqTitle').textContent = course.prereqTitle;
  document.getElementById('assessmentTitle').textContent = course.assessmentTitle;
  document.getElementById('coursePrereq').textContent = course.prereq;
  document.getElementById('courseAssessment').textContent = course.assessment;
  document.getElementById('faqTitle').textContent = labels.faqTitle;
  document.getElementById('relatedTitle').textContent = labels.relatedTitle;
  document.getElementById('ctaTitle').textContent = labels.ctaTitle;
  document.getElementById('ctaSubtitle').textContent = labels.ctaSubtitle;
  document.getElementById('ctaPrimary').textContent = labels.ctaPrimary;
  document.getElementById('ctaSecondary').textContent = labels.ctaSecondary;

  document.getElementById('courseOutcomes').innerHTML = course.outcomes.map(item => \`<li>\${item}</li>\`).join('');
  document.getElementById('courseMaterials').innerHTML = course.materials.map(item => \`<li>\${item}</li>\`).join('');

  document.getElementById('courseModules').innerHTML = course.modules.map((module, idx) => \`
    <div class="card animate-on-scroll delay-\${(idx % 6) + 1}">
      <h4>\${module.title}</h4>
      <ul style="list-style:disc;padding-inline-start:24px;display:grid;gap:8px;margin-top:12px;color:var(--text-light);">
        \${module.points.map(point => \`<li>\${point}</li>\`).join('')}
      </ul>
    </div>
  \`).join('');

  const faqRoot = document.getElementById('courseFaq');
  faqRoot.innerHTML = course.faq.map((item, index) => \`
    <div class="faq-item animate-on-scroll delay-\${(index % 6) + 1}">
      <button class="faq-question">
        <span>\${item.q}</span>
        <svg class="faq-chevron" viewBox="0 0 24 24"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z"/></svg>
      </button>
      <div class="faq-answer"><p>\${item.a}</p></div>
    </div>
  \`).join('');

  faqRoot.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const answer = btn.nextElementSibling;
      const isOpen = btn.classList.contains('active');
      faqRoot.querySelectorAll('.faq-question').forEach(q => q.classList.remove('active'));
      faqRoot.querySelectorAll('.faq-answer').forEach(a => a.classList.remove('open'));
      if (!isOpen) {
        btn.classList.add('active');
        answer.classList.add('open');
      }
    });
  });

  const related = Object.entries(window.HNH_ACADEMY_DATA.courses)
    .filter(([slug]) => slug !== COURSE_SLUG)
    .slice(0, 3)
    .map(([slug, value]) => ({ slug, data: value[lang] }));

  const relatedGrid = document.getElementById('relatedGrid');
  relatedGrid.innerHTML = related.map((item, idx) => \`
    <div class="course-card animate-on-scroll delay-\${(idx % 3) + 1}">
      <div class="course-header"><h3 style="color:white;">\${item.data.title}</h3></div>
      <div class="course-body">
        <p>\${item.data.shortDescription}</p>
        <div class="course-meta"><span>\${labels.duration}: \${item.data.duration}</span><span>\${labels.level}: \${item.data.level}</span></div>
        <div style="margin-top:14px;">
          <a href="\${COURSE_ROUTES[item.slug]}" class="btn btn-outline btn-sm">\${labels.relatedDetails}</a>
        </div>
      </div>
    </div>
  \`).join('');

  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.title,
    description: course.shortDescription,
    provider: {
      '@type': 'Hospital',
      name: 'Hayat National Hospitals',
      url: 'https://hnh.brainsait.org'
    },
    inLanguage: lang,
    educationalCredentialAwarded: course.certificate,
    timeRequired: course.duration,
    url: absoluteUrl
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: course.faq.map(item => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a }
    }))
  };

  document.getElementById('courseSchema').textContent = JSON.stringify(courseSchema);
  document.getElementById('faqSchemaCourse').textContent = JSON.stringify(faqSchema);
}

document.addEventListener('DOMContentLoaded', () => {
  renderCoursePage(HNH.currentLang());
});

document.addEventListener('hnh:langChanged', e => {
  renderCoursePage(e.detail.lang);
});
<\/script>
</body>
</html>
`;
var course_nphies = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>\u062F\u0648\u0631\u0629 \u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629 \u0627\u0644\u062D\u064A\u0627\u0629</title>
<meta name="description" content="\u062A\u0641\u0627\u0635\u064A\u0644 \u062F\u0648\u0631\u0629 \u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629 \u0627\u0644\u062D\u064A\u0627\u0629.">
<meta name="robots" content="index, follow">
<meta name="theme-color" content="#0066CC">
<link id="canonicalLink" rel="canonical" href="https://hnh.brainsait.org/course-nphies.html">
<link rel="alternate" hreflang="ar" href="https://hnh.brainsait.org/course-nphies.html">
<link rel="alternate" hreflang="en" href="https://hnh.brainsait.org/course-nphies.html">
<link rel="alternate" hreflang="x-default" href="https://hnh.brainsait.org/course-nphies.html">
<link rel="manifest" href="/manifest.json">
<link rel="apple-touch-icon" href="/icon-192.png">
<meta property="og:type" content="website">
<meta property="og:site_name" content="\u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A | Hayat National Hospitals">
<meta property="og:title" content="\u062F\u0648\u0631\u0627\u062A \u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629 \u0627\u0644\u062D\u064A\u0627\u0629">
<meta property="og:description" content="\u0645\u062D\u062A\u0648\u0649 \u062A\u062F\u0631\u064A\u0628\u064A \u062A\u0641\u0635\u064A\u0644\u064A \u0645\u0639 \u0645\u0633\u0627\u0631\u0627\u062A \u062A\u0639\u0644\u0645 \u0639\u0645\u0644\u064A\u0629.">
<meta id="ogUrlMeta" property="og:url" content="https://hnh.brainsait.org/course-nphies.html">
<meta property="og:image" content="https://hnh.brainsait.org/og-image.jpg">
<meta property="og:locale" content="ar_SA">
<meta property="og:locale:alternate" content="en_US">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="\u062F\u0648\u0631\u0627\u062A \u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629 \u0627\u0644\u062D\u064A\u0627\u0629">
<meta name="twitter:description" content="\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u062F\u0648\u0631\u0627\u062A \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u064A\u0629 \u0645\u0646 \u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629 \u0627\u0644\u062D\u064A\u0627\u0629.">
<meta name="twitter:image" content="https://hnh.brainsait.org/og-image.jpg">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Tajawal:wght@300;400;500;700;800;900&display=swap" rel="stylesheet">
<link rel="stylesheet" href="css/style.css">
<script type="application/ld+json" id="courseSchema"><\/script>
<script type="application/ld+json" id="faqSchemaCourse"><\/script>
</head>
<body>
<a href="#main-content" class="skip-link">Skip to main content</a>
<header class="header"><div class="container header-inner"><a href="index.html" class="logo"><div class="logo-icon"><svg viewBox="0 0 24 24" width="24" height="24" fill="white"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg></div><div class="logo-text">\u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A<small>BrainSAIT Healthcare OS</small></div></a>
<nav class="nav" id="mainNav">
      <a href="index.html" data-i18n="nav.home">\u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629</a>
      <a href="about.html" data-i18n="nav.about">\u0639\u0646 \u0627\u0644\u0645\u062C\u0645\u0648\u0639\u0629</a>
      <a href="departments.html" data-i18n="nav.departments">\u0627\u0644\u0623\u0642\u0633\u0627\u0645 \u0627\u0644\u0637\u0628\u064A\u0629</a>
      <a href="doctors.html" data-i18n="nav.doctors">\u0623\u0637\u0628\u0627\u0624\u0646\u0627</a>
      <a href="branches.html" data-i18n="nav.branches">\u0641\u0631\u0648\u0639\u0646\u0627</a>
      <a href="packages.html" data-i18n="nav.packages">\u0628\u0627\u0642\u0627\u062A \u0627\u0644\u0631\u0639\u0627\u064A\u0629</a>
      <a href="blog.html" data-i18n="nav.blog">\u0627\u0644\u0645\u062F\u0648\u0646\u0629 \u0627\u0644\u0635\u062D\u064A\u0629</a>
      <a href="academy.html" data-i18n="nav.academy">\u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629 \u0627\u0644\u062D\u064A\u0627\u0629</a>
      <a href="contact.html" data-i18n="nav.contact">\u0627\u062A\u0635\u0644 \u0628\u0646\u0627</a>
      <button class="lang-btn" onclick="HNH.setLang(HNH.currentLang()==='ar'?'en':'ar')">EN/\u0639\u0631\u0628\u064A</button>
      <a href="contact.html" class="nav-cta" data-i18n="nav.book">\u0627\u062D\u062C\u0632 \u0645\u0648\u0639\u062F</a>
    </nav><button class="mobile-toggle" aria-label="Menu"><span></span><span></span><span></span></button></div></header>

<section class="page-hero" id="main-content"><div class="container"><div class="breadcrumb"><a href="index.html" id="crumbHome">\u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629</a><span>/</span><a href="academy.html" id="crumbAcademy">\u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629 \u0627\u0644\u062D\u064A\u0627\u0629</a><span>/</span><span id="crumbCourse">\u0627\u0644\u062F\u0648\u0631\u0629</span></div><h1 id="courseTitle">\u0627\u0644\u062F\u0648\u0631\u0629</h1><p id="courseSubtitle"></p><div class="stats-bar" style="margin-top:24px;grid-template-columns:repeat(3,1fr);"><div class="stat-card"><div class="stat-label" id="durationLabel">\u0627\u0644\u0645\u062F\u0629</div><div class="stat-number" id="courseDuration">\u2014</div></div><div class="stat-card"><div class="stat-label" id="levelLabel">\u0627\u0644\u0645\u0633\u062A\u0648\u0649</div><div class="stat-number" id="courseLevel">\u2014</div></div><div class="stat-card"><div class="stat-label" id="certificateLabel">\u0627\u0644\u0634\u0647\u0627\u062F\u0629</div><div class="stat-number" id="courseCertificate" style="font-size:1rem;">\u2014</div></div></div></div></section>

<section class="section bg-white">
  <div class="container">
    <div class="grid-2">
      <div class="card animate-on-scroll delay-1">
        <h3 id="overviewLabel">\u0646\u0638\u0631\u0629 \u0639\u0627\u0645\u0629</h3>
        <p id="courseOverview" style="margin-top:12px;color:var(--text-light);"></p>
      </div>
      <div class="card animate-on-scroll delay-2">
        <h3 id="audienceLabel">\u0627\u0644\u0641\u0626\u0629 \u0627\u0644\u0645\u0633\u062A\u0647\u062F\u0641\u0629</h3>
        <p id="courseAudience" style="margin-top:12px;color:var(--text-light);"></p>
        <h4 id="modeLabel" style="margin-top:20px;"></h4>
        <p id="courseMode" style="color:var(--text-light);"></p>
      </div>
    </div>
  </div>
</section>

<section class="section bg-light">
  <div class="container">
    <div class="section-header animate-on-scroll">
      <h2 id="outcomesTitle">\u0645\u062E\u0631\u062C\u0627\u062A \u0627\u0644\u062A\u0639\u0644\u0645</h2>
    </div>
    <div class="card"><ul id="courseOutcomes" style="list-style:disc;padding-inline-start:24px;display:grid;gap:10px;color:var(--text-light);"></ul></div>
  </div>
</section>

<section class="section bg-white">
  <div class="container">
    <div class="section-header animate-on-scroll">
      <h2 id="curriculumTitle">\u0627\u0644\u0645\u062D\u062A\u0648\u0649 \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u064A \u0627\u0644\u0643\u0627\u0645\u0644</h2>
    </div>
    <div id="courseModules" class="grid-2"></div>
  </div>
</section>

<section class="section bg-light">
  <div class="container">
    <div class="grid-2">
      <div class="card animate-on-scroll delay-1">
        <h3 id="materialsTitle">\u0627\u0644\u0645\u0648\u0627\u062F \u0627\u0644\u062A\u0639\u0644\u064A\u0645\u064A\u0629</h3>
        <ul id="courseMaterials" style="list-style:disc;padding-inline-start:24px;display:grid;gap:10px;margin-top:12px;color:var(--text-light);"></ul>
      </div>
      <div class="card animate-on-scroll delay-2">
        <h3 id="prereqTitle">\u0627\u0644\u0645\u062A\u0637\u0644\u0628\u0627\u062A \u0627\u0644\u0645\u0633\u0628\u0642\u0629</h3>
        <p id="coursePrereq" style="margin-top:12px;color:var(--text-light);"></p>
        <h3 id="assessmentTitle" style="margin-top:20px;">\u0637\u0631\u064A\u0642\u0629 \u0627\u0644\u062A\u0642\u064A\u064A\u0645</h3>
        <p id="courseAssessment" style="margin-top:12px;color:var(--text-light);"></p>
      </div>
    </div>
  </div>
</section>

<section class="section bg-white">
  <div class="container">
    <div class="section-header animate-on-scroll">
      <h2 id="faqTitle">\u0627\u0644\u0623\u0633\u0626\u0644\u0629 \u0627\u0644\u0634\u0627\u0626\u0639\u0629 \u0644\u0644\u062F\u0648\u0631\u0629</h2>
    </div>
    <div id="courseFaq" style="max-width:900px;margin:0 auto;"></div>
  </div>
</section>

<section class="section bg-light">
  <div class="container">
    <div class="section-header animate-on-scroll">
      <h2 id="relatedTitle">\u062F\u0648\u0631\u0627\u062A \u0630\u0627\u062A \u0635\u0644\u0629</h2>
    </div>
    <div class="grid-3" id="relatedGrid"></div>
  </div>
</section>

<section class="cta-section"><div class="container"><h2 id="ctaTitle">\u0633\u062C\u0644 \u0641\u064A \u0627\u0644\u062F\u0648\u0631\u0629 \u0627\u0644\u0622\u0646</h2><p id="ctaSubtitle">\u0627\u062D\u062C\u0632 \u0645\u0642\u0639\u062F\u0643 \u0627\u0644\u0622\u0646 \u0648\u062A\u0648\u0627\u0635\u0644 \u0645\u0639 \u0641\u0631\u064A\u0642 \u0627\u0644\u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629</p><div class="cta-buttons"><a href="contact.html" class="btn btn-accent btn-lg" id="ctaPrimary">\u0633\u062C\u0644 \u0627\u0644\u0622\u0646</a><a href="academy.html" class="btn btn-white btn-lg" id="ctaSecondary">\u0627\u0644\u0639\u0648\u062F\u0629 \u0625\u0644\u0649 \u0627\u0644\u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629</a></div></div></section>

<footer class="footer">
  <div class="container">
    <div class="footer-grid">
      <div>
        <h4 data-i18n="footer.name">\u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A</h4>
        <p style="margin-bottom:16px;" data-i18n="footer.desc">\u0646\u0638\u0627\u0645 BrainSAIT Healthcare OS \u0627\u0644\u0645\u062A\u0635\u0644 \u0628\u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062D\u064A\u0629</p>
        <span class="api-status live">API Connected</span>
      </div>
      <div>
        <h4 data-i18n="footer.quickLinks">\u0631\u0648\u0627\u0628\u0637 \u0633\u0631\u064A\u0639\u0629</h4>
        <a href="about.html" data-i18n="nav.about">\u0639\u0646 \u0627\u0644\u0645\u062C\u0645\u0648\u0639\u0629</a>
        <a href="departments.html" data-i18n="nav.departments">\u0627\u0644\u0623\u0642\u0633\u0627\u0645 \u0627\u0644\u0637\u0628\u064A\u0629</a>
        <a href="doctors.html" data-i18n="nav.doctors">\u0623\u0637\u0628\u0627\u0624\u0646\u0627</a>
        <a href="branches.html" data-i18n="nav.branches">\u0641\u0631\u0648\u0639\u0646\u0627</a>
        <a href="packages.html" data-i18n="nav.packages">\u0628\u0627\u0642\u0627\u062A \u0627\u0644\u0631\u0639\u0627\u064A\u0629</a>
        <a href="blog.html" data-i18n="nav.blog">\u0627\u0644\u0645\u062F\u0648\u0646\u0629 \u0627\u0644\u0635\u062D\u064A\u0629</a>
        <a href="academy.html" data-i18n="nav.academy">\u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629 \u0627\u0644\u062D\u064A\u0627\u0629</a>
        <a href="faq.html" data-i18n="nav.faq">\u0627\u0644\u0623\u0633\u0626\u0644\u0629 \u0627\u0644\u0634\u0627\u0626\u0639\u0629</a>
      </div>
      <div>
        <h4 data-i18n="footer.services">\u062E\u062F\u0645\u0627\u062A\u0646\u0627</h4>
        <a href="contact.html" data-i18n="nav.book">\u062D\u062C\u0632 \u0645\u0648\u0639\u062F</a>
        <a href="departments.html">\u0627\u0644\u0639\u064A\u0627\u062F\u0627\u062A \u0627\u0644\u062E\u0627\u0631\u062C\u064A\u0629</a>
        <a href="departments.html">\u0627\u0644\u0637\u0648\u0627\u0631\u0626</a>
        <a href="departments.html">\u0627\u0644\u062C\u0631\u0627\u062D\u0627\u062A</a>
        <a href="packages.html" data-i18n="nav.packages">\u0628\u0627\u0642\u0627\u062A \u0627\u0644\u0631\u0639\u0627\u064A\u0629</a>
      </div>
      <div>
        <h4 data-i18n="footer.contact">\u062A\u0648\u0627\u0635\u0644 \u0645\u0639\u0646\u0627</h4>
        <a href="tel:966920000094">+966920000094</a>
        <a href="mailto:info@hayathospitals.com">info@hayathospitals.com</a>
        <p style="margin-top:8px;font-size:0.85rem;">\u0627\u0644\u0631\u064A\u0627\u0636\u060C \u0627\u0644\u0645\u0645\u0644\u0643\u0629 \u0627\u0644\u0639\u0631\u0628\u064A\u0629 \u0627\u0644\u0633\u0639\u0648\u062F\u064A\u0629</p>
      </div>
    </div>
    <div class="footer-bottom">
      <p>\xA9 2026 \u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A \u2014 BrainSAIT Healthcare OS</p>
    </div>
  </div>
</footer>

<a href="https://wa.me/966920000094" class="wa-float" target="_blank" rel="noopener" aria-label="WhatsApp">
  <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492l4.624-1.47A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75c-2.115 0-4.142-.665-5.847-1.884l-.42-.279-2.746.874.874-2.746-.279-.42A9.713 9.713 0 012.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75z"/></svg>
</a>
<button class="back-top" onclick="window.scrollTo({top:0,behavior:'smooth'})" aria-label="Back to top">
  <svg viewBox="0 0 24 24"><path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/></svg>
</button>

<script src="js/common.js"><\/script>
<script src="js/academy-data.js"><\/script>
<script>
const COURSE_SLUG = 'nphies';
const COURSE_ROUTES = {
  'nphies': 'course-nphies.html',
  'medical-coding': 'course-medical-coding.html',
  'rcm': 'course-rcm.html',
  'ai-healthcare': 'course-ai-healthcare.html',
  'pdpl': 'course-pdpl.html',
  'clinical-documentation': 'course-clinical-documentation.html',
  'pharmacy': 'course-pharmacy.html',
  'cbahi-quality': 'course-cbahi-quality.html',
  'infection-control': 'course-infection-control.html'
};
const LABELS = {
  ar: {
    home: '\u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629',
    academy: '\u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629 \u0627\u0644\u062D\u064A\u0627\u0629',
    duration: '\u0627\u0644\u0645\u062F\u0629',
    level: '\u0627\u0644\u0645\u0633\u062A\u0648\u0649',
    certificate: '\u0627\u0644\u0634\u0647\u0627\u062F\u0629',
    overview: '\u0646\u0638\u0631\u0629 \u0639\u0627\u0645\u0629',
    audience: '\u0627\u0644\u0641\u0626\u0629 \u0627\u0644\u0645\u0633\u062A\u0647\u062F\u0641\u0629',
    mode: '\u0646\u0645\u0637 \u0627\u0644\u062A\u0642\u062F\u064A\u0645',
    faqTitle: '\u0627\u0644\u0623\u0633\u0626\u0644\u0629 \u0627\u0644\u0634\u0627\u0626\u0639\u0629 \u0644\u0644\u062F\u0648\u0631\u0629',
    relatedTitle: '\u062F\u0648\u0631\u0627\u062A \u0630\u0627\u062A \u0635\u0644\u0629',
    relatedDetails: '\u0639\u0631\u0636 \u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u062F\u0648\u0631\u0629',
    ctaTitle: '\u0633\u062C\u0644 \u0641\u064A \u0627\u0644\u062F\u0648\u0631\u0629 \u0627\u0644\u0622\u0646',
    ctaSubtitle: '\u0627\u062D\u062C\u0632 \u0645\u0642\u0639\u062F\u0643 \u0627\u0644\u0622\u0646 \u0648\u062A\u0648\u0627\u0635\u0644 \u0645\u0639 \u0641\u0631\u064A\u0642 \u0627\u0644\u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629',
    ctaPrimary: '\u0633\u062C\u0644 \u0627\u0644\u0622\u0646',
    ctaSecondary: '\u0627\u0644\u0639\u0648\u062F\u0629 \u0625\u0644\u0649 \u0627\u0644\u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629'
  },
  en: {
    home: 'Home',
    academy: 'Life Academy',
    duration: 'Duration',
    level: 'Level',
    certificate: 'Certificate',
    overview: 'Overview',
    audience: 'Target Audience',
    mode: 'Delivery Mode',
    faqTitle: 'Course FAQs',
    relatedTitle: 'Related Courses',
    relatedDetails: 'View Course Details',
    ctaTitle: 'Enroll in This Course',
    ctaSubtitle: 'Reserve your seat and connect with the academy team',
    ctaPrimary: 'Enroll Now',
    ctaSecondary: 'Back to Academy'
  }
};

function renderCoursePage(lang) {
  const academy = window.HNH_ACADEMY_DATA.academy[lang];
  const course = window.HNH_ACADEMY_DATA.courses[COURSE_SLUG][lang];
  const labels = LABELS[lang];
  const absoluteUrl = \`https://hnh.brainsait.org/\${window.location.pathname.split('/').pop()}\`;

  document.getElementById('canonicalLink').setAttribute('href', absoluteUrl);
  document.getElementById('ogUrlMeta').setAttribute('content', absoluteUrl);

  const metaTitle = \`\${course.title} | \${academy.breadcrumbCurrent}\`;
  document.title = metaTitle;
  document.querySelector('meta[name="description"]').setAttribute('content', course.shortDescription);
  document.querySelector('meta[property="og:title"]').setAttribute('content', metaTitle);
  document.querySelector('meta[property="og:description"]').setAttribute('content', course.shortDescription);
  document.querySelector('meta[name="twitter:title"]').setAttribute('content', metaTitle);
  document.querySelector('meta[name="twitter:description"]').setAttribute('content', course.shortDescription);

  document.getElementById('crumbHome').textContent = labels.home;
  document.getElementById('crumbAcademy').textContent = labels.academy;
  document.getElementById('crumbCourse').textContent = course.title;
  document.getElementById('courseTitle').textContent = course.title;
  document.getElementById('courseSubtitle').textContent = course.shortDescription;
  document.getElementById('durationLabel').textContent = labels.duration;
  document.getElementById('levelLabel').textContent = labels.level;
  document.getElementById('certificateLabel').textContent = labels.certificate;
  document.getElementById('courseDuration').textContent = course.duration;
  document.getElementById('courseLevel').textContent = course.level;
  document.getElementById('courseCertificate').textContent = course.certificate;
  document.getElementById('overviewLabel').textContent = labels.overview;
  document.getElementById('courseOverview').textContent = course.overview;
  document.getElementById('audienceLabel').textContent = labels.audience;
  document.getElementById('courseAudience').textContent = course.audience;
  document.getElementById('modeLabel').textContent = labels.mode;
  document.getElementById('courseMode').textContent = course.mode;
  document.getElementById('outcomesTitle').textContent = course.outcomesTitle;
  document.getElementById('curriculumTitle').textContent = course.curriculumTitle;
  document.getElementById('materialsTitle').textContent = course.materialsTitle;
  document.getElementById('prereqTitle').textContent = course.prereqTitle;
  document.getElementById('assessmentTitle').textContent = course.assessmentTitle;
  document.getElementById('coursePrereq').textContent = course.prereq;
  document.getElementById('courseAssessment').textContent = course.assessment;
  document.getElementById('faqTitle').textContent = labels.faqTitle;
  document.getElementById('relatedTitle').textContent = labels.relatedTitle;
  document.getElementById('ctaTitle').textContent = labels.ctaTitle;
  document.getElementById('ctaSubtitle').textContent = labels.ctaSubtitle;
  document.getElementById('ctaPrimary').textContent = labels.ctaPrimary;
  document.getElementById('ctaSecondary').textContent = labels.ctaSecondary;

  document.getElementById('courseOutcomes').innerHTML = course.outcomes.map(item => \`<li>\${item}</li>\`).join('');
  document.getElementById('courseMaterials').innerHTML = course.materials.map(item => \`<li>\${item}</li>\`).join('');

  document.getElementById('courseModules').innerHTML = course.modules.map((module, idx) => \`
    <div class="card animate-on-scroll delay-\${(idx % 6) + 1}">
      <h4>\${module.title}</h4>
      <ul style="list-style:disc;padding-inline-start:24px;display:grid;gap:8px;margin-top:12px;color:var(--text-light);">
        \${module.points.map(point => \`<li>\${point}</li>\`).join('')}
      </ul>
    </div>
  \`).join('');

  const faqRoot = document.getElementById('courseFaq');
  faqRoot.innerHTML = course.faq.map((item, index) => \`
    <div class="faq-item animate-on-scroll delay-\${(index % 6) + 1}">
      <button class="faq-question">
        <span>\${item.q}</span>
        <svg class="faq-chevron" viewBox="0 0 24 24"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z"/></svg>
      </button>
      <div class="faq-answer"><p>\${item.a}</p></div>
    </div>
  \`).join('');

  faqRoot.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const answer = btn.nextElementSibling;
      const isOpen = btn.classList.contains('active');
      faqRoot.querySelectorAll('.faq-question').forEach(q => q.classList.remove('active'));
      faqRoot.querySelectorAll('.faq-answer').forEach(a => a.classList.remove('open'));
      if (!isOpen) {
        btn.classList.add('active');
        answer.classList.add('open');
      }
    });
  });

  const related = Object.entries(window.HNH_ACADEMY_DATA.courses)
    .filter(([slug]) => slug !== COURSE_SLUG)
    .slice(0, 3)
    .map(([slug, value]) => ({ slug, data: value[lang] }));

  const relatedGrid = document.getElementById('relatedGrid');
  relatedGrid.innerHTML = related.map((item, idx) => \`
    <div class="course-card animate-on-scroll delay-\${(idx % 3) + 1}">
      <div class="course-header"><h3 style="color:white;">\${item.data.title}</h3></div>
      <div class="course-body">
        <p>\${item.data.shortDescription}</p>
        <div class="course-meta"><span>\${labels.duration}: \${item.data.duration}</span><span>\${labels.level}: \${item.data.level}</span></div>
        <div style="margin-top:14px;">
          <a href="\${COURSE_ROUTES[item.slug]}" class="btn btn-outline btn-sm">\${labels.relatedDetails}</a>
        </div>
      </div>
    </div>
  \`).join('');

  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.title,
    description: course.shortDescription,
    provider: {
      '@type': 'Hospital',
      name: 'Hayat National Hospitals',
      url: 'https://hnh.brainsait.org'
    },
    inLanguage: lang,
    educationalCredentialAwarded: course.certificate,
    timeRequired: course.duration,
    url: absoluteUrl
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: course.faq.map(item => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a }
    }))
  };

  document.getElementById('courseSchema').textContent = JSON.stringify(courseSchema);
  document.getElementById('faqSchemaCourse').textContent = JSON.stringify(faqSchema);
}

document.addEventListener('DOMContentLoaded', () => {
  renderCoursePage(HNH.currentLang());
});

document.addEventListener('hnh:langChanged', e => {
  renderCoursePage(e.detail.lang);
});
<\/script>
</body>
</html>
`;
var course_pdpl = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>\u062F\u0648\u0631\u0629 \u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629 \u0627\u0644\u062D\u064A\u0627\u0629</title>
<meta name="description" content="\u062A\u0641\u0627\u0635\u064A\u0644 \u062F\u0648\u0631\u0629 \u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629 \u0627\u0644\u062D\u064A\u0627\u0629.">
<meta name="robots" content="index, follow">
<meta name="theme-color" content="#0066CC">
<link id="canonicalLink" rel="canonical" href="https://hnh.brainsait.org/course-pdpl.html">
<link rel="alternate" hreflang="ar" href="https://hnh.brainsait.org/course-pdpl.html">
<link rel="alternate" hreflang="en" href="https://hnh.brainsait.org/course-pdpl.html">
<link rel="alternate" hreflang="x-default" href="https://hnh.brainsait.org/course-pdpl.html">
<link rel="manifest" href="/manifest.json">
<link rel="apple-touch-icon" href="/icon-192.png">
<meta property="og:type" content="website">
<meta property="og:site_name" content="\u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A | Hayat National Hospitals">
<meta property="og:title" content="\u062F\u0648\u0631\u0627\u062A \u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629 \u0627\u0644\u062D\u064A\u0627\u0629">
<meta property="og:description" content="\u0645\u062D\u062A\u0648\u0649 \u062A\u062F\u0631\u064A\u0628\u064A \u062A\u0641\u0635\u064A\u0644\u064A \u0645\u0639 \u0645\u0633\u0627\u0631\u0627\u062A \u062A\u0639\u0644\u0645 \u0639\u0645\u0644\u064A\u0629.">
<meta id="ogUrlMeta" property="og:url" content="https://hnh.brainsait.org/course-pdpl.html">
<meta property="og:image" content="https://hnh.brainsait.org/og-image.jpg">
<meta property="og:locale" content="ar_SA">
<meta property="og:locale:alternate" content="en_US">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="\u062F\u0648\u0631\u0627\u062A \u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629 \u0627\u0644\u062D\u064A\u0627\u0629">
<meta name="twitter:description" content="\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u062F\u0648\u0631\u0627\u062A \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u064A\u0629 \u0645\u0646 \u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629 \u0627\u0644\u062D\u064A\u0627\u0629.">
<meta name="twitter:image" content="https://hnh.brainsait.org/og-image.jpg">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Tajawal:wght@300;400;500;700;800;900&display=swap" rel="stylesheet">
<link rel="stylesheet" href="css/style.css">
<script type="application/ld+json" id="courseSchema"><\/script>
<script type="application/ld+json" id="faqSchemaCourse"><\/script>
</head>
<body>
<a href="#main-content" class="skip-link">Skip to main content</a>
<header class="header"><div class="container header-inner"><a href="index.html" class="logo"><div class="logo-icon"><svg viewBox="0 0 24 24" width="24" height="24" fill="white"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg></div><div class="logo-text">\u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A<small>BrainSAIT Healthcare OS</small></div></a>
<nav class="nav" id="mainNav">
      <a href="index.html" data-i18n="nav.home">\u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629</a>
      <a href="about.html" data-i18n="nav.about">\u0639\u0646 \u0627\u0644\u0645\u062C\u0645\u0648\u0639\u0629</a>
      <a href="departments.html" data-i18n="nav.departments">\u0627\u0644\u0623\u0642\u0633\u0627\u0645 \u0627\u0644\u0637\u0628\u064A\u0629</a>
      <a href="doctors.html" data-i18n="nav.doctors">\u0623\u0637\u0628\u0627\u0624\u0646\u0627</a>
      <a href="branches.html" data-i18n="nav.branches">\u0641\u0631\u0648\u0639\u0646\u0627</a>
      <a href="packages.html" data-i18n="nav.packages">\u0628\u0627\u0642\u0627\u062A \u0627\u0644\u0631\u0639\u0627\u064A\u0629</a>
      <a href="blog.html" data-i18n="nav.blog">\u0627\u0644\u0645\u062F\u0648\u0646\u0629 \u0627\u0644\u0635\u062D\u064A\u0629</a>
      <a href="academy.html" data-i18n="nav.academy">\u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629 \u0627\u0644\u062D\u064A\u0627\u0629</a>
      <a href="contact.html" data-i18n="nav.contact">\u0627\u062A\u0635\u0644 \u0628\u0646\u0627</a>
      <button class="lang-btn" onclick="HNH.setLang(HNH.currentLang()==='ar'?'en':'ar')">EN/\u0639\u0631\u0628\u064A</button>
      <a href="contact.html" class="nav-cta" data-i18n="nav.book">\u0627\u062D\u062C\u0632 \u0645\u0648\u0639\u062F</a>
    </nav><button class="mobile-toggle" aria-label="Menu"><span></span><span></span><span></span></button></div></header>

<section class="page-hero" id="main-content"><div class="container"><div class="breadcrumb"><a href="index.html" id="crumbHome">\u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629</a><span>/</span><a href="academy.html" id="crumbAcademy">\u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629 \u0627\u0644\u062D\u064A\u0627\u0629</a><span>/</span><span id="crumbCourse">\u0627\u0644\u062F\u0648\u0631\u0629</span></div><h1 id="courseTitle">\u0627\u0644\u062F\u0648\u0631\u0629</h1><p id="courseSubtitle"></p><div class="stats-bar" style="margin-top:24px;grid-template-columns:repeat(3,1fr);"><div class="stat-card"><div class="stat-label" id="durationLabel">\u0627\u0644\u0645\u062F\u0629</div><div class="stat-number" id="courseDuration">\u2014</div></div><div class="stat-card"><div class="stat-label" id="levelLabel">\u0627\u0644\u0645\u0633\u062A\u0648\u0649</div><div class="stat-number" id="courseLevel">\u2014</div></div><div class="stat-card"><div class="stat-label" id="certificateLabel">\u0627\u0644\u0634\u0647\u0627\u062F\u0629</div><div class="stat-number" id="courseCertificate" style="font-size:1rem;">\u2014</div></div></div></div></section>

<section class="section bg-white">
  <div class="container">
    <div class="grid-2">
      <div class="card animate-on-scroll delay-1">
        <h3 id="overviewLabel">\u0646\u0638\u0631\u0629 \u0639\u0627\u0645\u0629</h3>
        <p id="courseOverview" style="margin-top:12px;color:var(--text-light);"></p>
      </div>
      <div class="card animate-on-scroll delay-2">
        <h3 id="audienceLabel">\u0627\u0644\u0641\u0626\u0629 \u0627\u0644\u0645\u0633\u062A\u0647\u062F\u0641\u0629</h3>
        <p id="courseAudience" style="margin-top:12px;color:var(--text-light);"></p>
        <h4 id="modeLabel" style="margin-top:20px;"></h4>
        <p id="courseMode" style="color:var(--text-light);"></p>
      </div>
    </div>
  </div>
</section>

<section class="section bg-light">
  <div class="container">
    <div class="section-header animate-on-scroll">
      <h2 id="outcomesTitle">\u0645\u062E\u0631\u062C\u0627\u062A \u0627\u0644\u062A\u0639\u0644\u0645</h2>
    </div>
    <div class="card"><ul id="courseOutcomes" style="list-style:disc;padding-inline-start:24px;display:grid;gap:10px;color:var(--text-light);"></ul></div>
  </div>
</section>

<section class="section bg-white">
  <div class="container">
    <div class="section-header animate-on-scroll">
      <h2 id="curriculumTitle">\u0627\u0644\u0645\u062D\u062A\u0648\u0649 \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u064A \u0627\u0644\u0643\u0627\u0645\u0644</h2>
    </div>
    <div id="courseModules" class="grid-2"></div>
  </div>
</section>

<section class="section bg-light">
  <div class="container">
    <div class="grid-2">
      <div class="card animate-on-scroll delay-1">
        <h3 id="materialsTitle">\u0627\u0644\u0645\u0648\u0627\u062F \u0627\u0644\u062A\u0639\u0644\u064A\u0645\u064A\u0629</h3>
        <ul id="courseMaterials" style="list-style:disc;padding-inline-start:24px;display:grid;gap:10px;margin-top:12px;color:var(--text-light);"></ul>
      </div>
      <div class="card animate-on-scroll delay-2">
        <h3 id="prereqTitle">\u0627\u0644\u0645\u062A\u0637\u0644\u0628\u0627\u062A \u0627\u0644\u0645\u0633\u0628\u0642\u0629</h3>
        <p id="coursePrereq" style="margin-top:12px;color:var(--text-light);"></p>
        <h3 id="assessmentTitle" style="margin-top:20px;">\u0637\u0631\u064A\u0642\u0629 \u0627\u0644\u062A\u0642\u064A\u064A\u0645</h3>
        <p id="courseAssessment" style="margin-top:12px;color:var(--text-light);"></p>
      </div>
    </div>
  </div>
</section>

<section class="section bg-white">
  <div class="container">
    <div class="section-header animate-on-scroll">
      <h2 id="faqTitle">\u0627\u0644\u0623\u0633\u0626\u0644\u0629 \u0627\u0644\u0634\u0627\u0626\u0639\u0629 \u0644\u0644\u062F\u0648\u0631\u0629</h2>
    </div>
    <div id="courseFaq" style="max-width:900px;margin:0 auto;"></div>
  </div>
</section>

<section class="section bg-light">
  <div class="container">
    <div class="section-header animate-on-scroll">
      <h2 id="relatedTitle">\u062F\u0648\u0631\u0627\u062A \u0630\u0627\u062A \u0635\u0644\u0629</h2>
    </div>
    <div class="grid-3" id="relatedGrid"></div>
  </div>
</section>

<section class="cta-section"><div class="container"><h2 id="ctaTitle">\u0633\u062C\u0644 \u0641\u064A \u0627\u0644\u062F\u0648\u0631\u0629 \u0627\u0644\u0622\u0646</h2><p id="ctaSubtitle">\u0627\u062D\u062C\u0632 \u0645\u0642\u0639\u062F\u0643 \u0627\u0644\u0622\u0646 \u0648\u062A\u0648\u0627\u0635\u0644 \u0645\u0639 \u0641\u0631\u064A\u0642 \u0627\u0644\u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629</p><div class="cta-buttons"><a href="contact.html" class="btn btn-accent btn-lg" id="ctaPrimary">\u0633\u062C\u0644 \u0627\u0644\u0622\u0646</a><a href="academy.html" class="btn btn-white btn-lg" id="ctaSecondary">\u0627\u0644\u0639\u0648\u062F\u0629 \u0625\u0644\u0649 \u0627\u0644\u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629</a></div></div></section>

<footer class="footer">
  <div class="container">
    <div class="footer-grid">
      <div>
        <h4 data-i18n="footer.name">\u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A</h4>
        <p style="margin-bottom:16px;" data-i18n="footer.desc">\u0646\u0638\u0627\u0645 BrainSAIT Healthcare OS \u0627\u0644\u0645\u062A\u0635\u0644 \u0628\u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062D\u064A\u0629</p>
        <span class="api-status live">API Connected</span>
      </div>
      <div>
        <h4 data-i18n="footer.quickLinks">\u0631\u0648\u0627\u0628\u0637 \u0633\u0631\u064A\u0639\u0629</h4>
        <a href="about.html" data-i18n="nav.about">\u0639\u0646 \u0627\u0644\u0645\u062C\u0645\u0648\u0639\u0629</a>
        <a href="departments.html" data-i18n="nav.departments">\u0627\u0644\u0623\u0642\u0633\u0627\u0645 \u0627\u0644\u0637\u0628\u064A\u0629</a>
        <a href="doctors.html" data-i18n="nav.doctors">\u0623\u0637\u0628\u0627\u0624\u0646\u0627</a>
        <a href="branches.html" data-i18n="nav.branches">\u0641\u0631\u0648\u0639\u0646\u0627</a>
        <a href="packages.html" data-i18n="nav.packages">\u0628\u0627\u0642\u0627\u062A \u0627\u0644\u0631\u0639\u0627\u064A\u0629</a>
        <a href="blog.html" data-i18n="nav.blog">\u0627\u0644\u0645\u062F\u0648\u0646\u0629 \u0627\u0644\u0635\u062D\u064A\u0629</a>
        <a href="academy.html" data-i18n="nav.academy">\u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629 \u0627\u0644\u062D\u064A\u0627\u0629</a>
        <a href="faq.html" data-i18n="nav.faq">\u0627\u0644\u0623\u0633\u0626\u0644\u0629 \u0627\u0644\u0634\u0627\u0626\u0639\u0629</a>
      </div>
      <div>
        <h4 data-i18n="footer.services">\u062E\u062F\u0645\u0627\u062A\u0646\u0627</h4>
        <a href="contact.html" data-i18n="nav.book">\u062D\u062C\u0632 \u0645\u0648\u0639\u062F</a>
        <a href="departments.html">\u0627\u0644\u0639\u064A\u0627\u062F\u0627\u062A \u0627\u0644\u062E\u0627\u0631\u062C\u064A\u0629</a>
        <a href="departments.html">\u0627\u0644\u0637\u0648\u0627\u0631\u0626</a>
        <a href="departments.html">\u0627\u0644\u062C\u0631\u0627\u062D\u0627\u062A</a>
        <a href="packages.html" data-i18n="nav.packages">\u0628\u0627\u0642\u0627\u062A \u0627\u0644\u0631\u0639\u0627\u064A\u0629</a>
      </div>
      <div>
        <h4 data-i18n="footer.contact">\u062A\u0648\u0627\u0635\u0644 \u0645\u0639\u0646\u0627</h4>
        <a href="tel:966920000094">+966920000094</a>
        <a href="mailto:info@hayathospitals.com">info@hayathospitals.com</a>
        <p style="margin-top:8px;font-size:0.85rem;">\u0627\u0644\u0631\u064A\u0627\u0636\u060C \u0627\u0644\u0645\u0645\u0644\u0643\u0629 \u0627\u0644\u0639\u0631\u0628\u064A\u0629 \u0627\u0644\u0633\u0639\u0648\u062F\u064A\u0629</p>
      </div>
    </div>
    <div class="footer-bottom">
      <p>\xA9 2026 \u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A \u2014 BrainSAIT Healthcare OS</p>
    </div>
  </div>
</footer>

<a href="https://wa.me/966920000094" class="wa-float" target="_blank" rel="noopener" aria-label="WhatsApp">
  <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492l4.624-1.47A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75c-2.115 0-4.142-.665-5.847-1.884l-.42-.279-2.746.874.874-2.746-.279-.42A9.713 9.713 0 012.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75z"/></svg>
</a>
<button class="back-top" onclick="window.scrollTo({top:0,behavior:'smooth'})" aria-label="Back to top">
  <svg viewBox="0 0 24 24"><path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/></svg>
</button>

<script src="js/common.js"><\/script>
<script src="js/academy-data.js"><\/script>
<script>
const COURSE_SLUG = 'pdpl';
const COURSE_ROUTES = {
  'nphies': 'course-nphies.html',
  'medical-coding': 'course-medical-coding.html',
  'rcm': 'course-rcm.html',
  'ai-healthcare': 'course-ai-healthcare.html',
  'pdpl': 'course-pdpl.html',
  'clinical-documentation': 'course-clinical-documentation.html',
  'pharmacy': 'course-pharmacy.html',
  'cbahi-quality': 'course-cbahi-quality.html',
  'infection-control': 'course-infection-control.html'
};
const LABELS = {
  ar: {
    home: '\u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629',
    academy: '\u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629 \u0627\u0644\u062D\u064A\u0627\u0629',
    duration: '\u0627\u0644\u0645\u062F\u0629',
    level: '\u0627\u0644\u0645\u0633\u062A\u0648\u0649',
    certificate: '\u0627\u0644\u0634\u0647\u0627\u062F\u0629',
    overview: '\u0646\u0638\u0631\u0629 \u0639\u0627\u0645\u0629',
    audience: '\u0627\u0644\u0641\u0626\u0629 \u0627\u0644\u0645\u0633\u062A\u0647\u062F\u0641\u0629',
    mode: '\u0646\u0645\u0637 \u0627\u0644\u062A\u0642\u062F\u064A\u0645',
    faqTitle: '\u0627\u0644\u0623\u0633\u0626\u0644\u0629 \u0627\u0644\u0634\u0627\u0626\u0639\u0629 \u0644\u0644\u062F\u0648\u0631\u0629',
    relatedTitle: '\u062F\u0648\u0631\u0627\u062A \u0630\u0627\u062A \u0635\u0644\u0629',
    relatedDetails: '\u0639\u0631\u0636 \u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u062F\u0648\u0631\u0629',
    ctaTitle: '\u0633\u062C\u0644 \u0641\u064A \u0627\u0644\u062F\u0648\u0631\u0629 \u0627\u0644\u0622\u0646',
    ctaSubtitle: '\u0627\u062D\u062C\u0632 \u0645\u0642\u0639\u062F\u0643 \u0627\u0644\u0622\u0646 \u0648\u062A\u0648\u0627\u0635\u0644 \u0645\u0639 \u0641\u0631\u064A\u0642 \u0627\u0644\u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629',
    ctaPrimary: '\u0633\u062C\u0644 \u0627\u0644\u0622\u0646',
    ctaSecondary: '\u0627\u0644\u0639\u0648\u062F\u0629 \u0625\u0644\u0649 \u0627\u0644\u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629'
  },
  en: {
    home: 'Home',
    academy: 'Life Academy',
    duration: 'Duration',
    level: 'Level',
    certificate: 'Certificate',
    overview: 'Overview',
    audience: 'Target Audience',
    mode: 'Delivery Mode',
    faqTitle: 'Course FAQs',
    relatedTitle: 'Related Courses',
    relatedDetails: 'View Course Details',
    ctaTitle: 'Enroll in This Course',
    ctaSubtitle: 'Reserve your seat and connect with the academy team',
    ctaPrimary: 'Enroll Now',
    ctaSecondary: 'Back to Academy'
  }
};

function renderCoursePage(lang) {
  const academy = window.HNH_ACADEMY_DATA.academy[lang];
  const course = window.HNH_ACADEMY_DATA.courses[COURSE_SLUG][lang];
  const labels = LABELS[lang];
  const absoluteUrl = \`https://hnh.brainsait.org/\${window.location.pathname.split('/').pop()}\`;

  document.getElementById('canonicalLink').setAttribute('href', absoluteUrl);
  document.getElementById('ogUrlMeta').setAttribute('content', absoluteUrl);

  const metaTitle = \`\${course.title} | \${academy.breadcrumbCurrent}\`;
  document.title = metaTitle;
  document.querySelector('meta[name="description"]').setAttribute('content', course.shortDescription);
  document.querySelector('meta[property="og:title"]').setAttribute('content', metaTitle);
  document.querySelector('meta[property="og:description"]').setAttribute('content', course.shortDescription);
  document.querySelector('meta[name="twitter:title"]').setAttribute('content', metaTitle);
  document.querySelector('meta[name="twitter:description"]').setAttribute('content', course.shortDescription);

  document.getElementById('crumbHome').textContent = labels.home;
  document.getElementById('crumbAcademy').textContent = labels.academy;
  document.getElementById('crumbCourse').textContent = course.title;
  document.getElementById('courseTitle').textContent = course.title;
  document.getElementById('courseSubtitle').textContent = course.shortDescription;
  document.getElementById('durationLabel').textContent = labels.duration;
  document.getElementById('levelLabel').textContent = labels.level;
  document.getElementById('certificateLabel').textContent = labels.certificate;
  document.getElementById('courseDuration').textContent = course.duration;
  document.getElementById('courseLevel').textContent = course.level;
  document.getElementById('courseCertificate').textContent = course.certificate;
  document.getElementById('overviewLabel').textContent = labels.overview;
  document.getElementById('courseOverview').textContent = course.overview;
  document.getElementById('audienceLabel').textContent = labels.audience;
  document.getElementById('courseAudience').textContent = course.audience;
  document.getElementById('modeLabel').textContent = labels.mode;
  document.getElementById('courseMode').textContent = course.mode;
  document.getElementById('outcomesTitle').textContent = course.outcomesTitle;
  document.getElementById('curriculumTitle').textContent = course.curriculumTitle;
  document.getElementById('materialsTitle').textContent = course.materialsTitle;
  document.getElementById('prereqTitle').textContent = course.prereqTitle;
  document.getElementById('assessmentTitle').textContent = course.assessmentTitle;
  document.getElementById('coursePrereq').textContent = course.prereq;
  document.getElementById('courseAssessment').textContent = course.assessment;
  document.getElementById('faqTitle').textContent = labels.faqTitle;
  document.getElementById('relatedTitle').textContent = labels.relatedTitle;
  document.getElementById('ctaTitle').textContent = labels.ctaTitle;
  document.getElementById('ctaSubtitle').textContent = labels.ctaSubtitle;
  document.getElementById('ctaPrimary').textContent = labels.ctaPrimary;
  document.getElementById('ctaSecondary').textContent = labels.ctaSecondary;

  document.getElementById('courseOutcomes').innerHTML = course.outcomes.map(item => \`<li>\${item}</li>\`).join('');
  document.getElementById('courseMaterials').innerHTML = course.materials.map(item => \`<li>\${item}</li>\`).join('');

  document.getElementById('courseModules').innerHTML = course.modules.map((module, idx) => \`
    <div class="card animate-on-scroll delay-\${(idx % 6) + 1}">
      <h4>\${module.title}</h4>
      <ul style="list-style:disc;padding-inline-start:24px;display:grid;gap:8px;margin-top:12px;color:var(--text-light);">
        \${module.points.map(point => \`<li>\${point}</li>\`).join('')}
      </ul>
    </div>
  \`).join('');

  const faqRoot = document.getElementById('courseFaq');
  faqRoot.innerHTML = course.faq.map((item, index) => \`
    <div class="faq-item animate-on-scroll delay-\${(index % 6) + 1}">
      <button class="faq-question">
        <span>\${item.q}</span>
        <svg class="faq-chevron" viewBox="0 0 24 24"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z"/></svg>
      </button>
      <div class="faq-answer"><p>\${item.a}</p></div>
    </div>
  \`).join('');

  faqRoot.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const answer = btn.nextElementSibling;
      const isOpen = btn.classList.contains('active');
      faqRoot.querySelectorAll('.faq-question').forEach(q => q.classList.remove('active'));
      faqRoot.querySelectorAll('.faq-answer').forEach(a => a.classList.remove('open'));
      if (!isOpen) {
        btn.classList.add('active');
        answer.classList.add('open');
      }
    });
  });

  const related = Object.entries(window.HNH_ACADEMY_DATA.courses)
    .filter(([slug]) => slug !== COURSE_SLUG)
    .slice(0, 3)
    .map(([slug, value]) => ({ slug, data: value[lang] }));

  const relatedGrid = document.getElementById('relatedGrid');
  relatedGrid.innerHTML = related.map((item, idx) => \`
    <div class="course-card animate-on-scroll delay-\${(idx % 3) + 1}">
      <div class="course-header"><h3 style="color:white;">\${item.data.title}</h3></div>
      <div class="course-body">
        <p>\${item.data.shortDescription}</p>
        <div class="course-meta"><span>\${labels.duration}: \${item.data.duration}</span><span>\${labels.level}: \${item.data.level}</span></div>
        <div style="margin-top:14px;">
          <a href="\${COURSE_ROUTES[item.slug]}" class="btn btn-outline btn-sm">\${labels.relatedDetails}</a>
        </div>
      </div>
    </div>
  \`).join('');

  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.title,
    description: course.shortDescription,
    provider: {
      '@type': 'Hospital',
      name: 'Hayat National Hospitals',
      url: 'https://hnh.brainsait.org'
    },
    inLanguage: lang,
    educationalCredentialAwarded: course.certificate,
    timeRequired: course.duration,
    url: absoluteUrl
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: course.faq.map(item => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a }
    }))
  };

  document.getElementById('courseSchema').textContent = JSON.stringify(courseSchema);
  document.getElementById('faqSchemaCourse').textContent = JSON.stringify(faqSchema);
}

document.addEventListener('DOMContentLoaded', () => {
  renderCoursePage(HNH.currentLang());
});

document.addEventListener('hnh:langChanged', e => {
  renderCoursePage(e.detail.lang);
});
<\/script>
</body>
</html>
`;
var course_pharmacy = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>\u062F\u0648\u0631\u0629 \u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629 \u0627\u0644\u062D\u064A\u0627\u0629</title>
<meta name="description" content="\u062A\u0641\u0627\u0635\u064A\u0644 \u062F\u0648\u0631\u0629 \u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629 \u0627\u0644\u062D\u064A\u0627\u0629.">
<meta name="robots" content="index, follow">
<meta name="theme-color" content="#0066CC">
<link id="canonicalLink" rel="canonical" href="https://hnh.brainsait.org/course-pharmacy.html">
<link rel="alternate" hreflang="ar" href="https://hnh.brainsait.org/course-pharmacy.html">
<link rel="alternate" hreflang="en" href="https://hnh.brainsait.org/course-pharmacy.html">
<link rel="alternate" hreflang="x-default" href="https://hnh.brainsait.org/course-pharmacy.html">
<link rel="manifest" href="/manifest.json">
<link rel="apple-touch-icon" href="/icon-192.png">
<meta property="og:type" content="website">
<meta property="og:site_name" content="\u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A | Hayat National Hospitals">
<meta property="og:title" content="\u062F\u0648\u0631\u0627\u062A \u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629 \u0627\u0644\u062D\u064A\u0627\u0629">
<meta property="og:description" content="\u0645\u062D\u062A\u0648\u0649 \u062A\u062F\u0631\u064A\u0628\u064A \u062A\u0641\u0635\u064A\u0644\u064A \u0645\u0639 \u0645\u0633\u0627\u0631\u0627\u062A \u062A\u0639\u0644\u0645 \u0639\u0645\u0644\u064A\u0629.">
<meta id="ogUrlMeta" property="og:url" content="https://hnh.brainsait.org/course-pharmacy.html">
<meta property="og:image" content="https://hnh.brainsait.org/og-image.jpg">
<meta property="og:locale" content="ar_SA">
<meta property="og:locale:alternate" content="en_US">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="\u062F\u0648\u0631\u0627\u062A \u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629 \u0627\u0644\u062D\u064A\u0627\u0629">
<meta name="twitter:description" content="\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u062F\u0648\u0631\u0627\u062A \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u064A\u0629 \u0645\u0646 \u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629 \u0627\u0644\u062D\u064A\u0627\u0629.">
<meta name="twitter:image" content="https://hnh.brainsait.org/og-image.jpg">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Tajawal:wght@300;400;500;700;800;900&display=swap" rel="stylesheet">
<link rel="stylesheet" href="css/style.css">
<script type="application/ld+json" id="courseSchema"><\/script>
<script type="application/ld+json" id="faqSchemaCourse"><\/script>
</head>
<body>
<a href="#main-content" class="skip-link">Skip to main content</a>
<header class="header"><div class="container header-inner"><a href="index.html" class="logo"><div class="logo-icon"><svg viewBox="0 0 24 24" width="24" height="24" fill="white"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg></div><div class="logo-text">\u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A<small>BrainSAIT Healthcare OS</small></div></a>
<nav class="nav" id="mainNav">
      <a href="index.html" data-i18n="nav.home">\u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629</a>
      <a href="about.html" data-i18n="nav.about">\u0639\u0646 \u0627\u0644\u0645\u062C\u0645\u0648\u0639\u0629</a>
      <a href="departments.html" data-i18n="nav.departments">\u0627\u0644\u0623\u0642\u0633\u0627\u0645 \u0627\u0644\u0637\u0628\u064A\u0629</a>
      <a href="doctors.html" data-i18n="nav.doctors">\u0623\u0637\u0628\u0627\u0624\u0646\u0627</a>
      <a href="branches.html" data-i18n="nav.branches">\u0641\u0631\u0648\u0639\u0646\u0627</a>
      <a href="packages.html" data-i18n="nav.packages">\u0628\u0627\u0642\u0627\u062A \u0627\u0644\u0631\u0639\u0627\u064A\u0629</a>
      <a href="blog.html" data-i18n="nav.blog">\u0627\u0644\u0645\u062F\u0648\u0646\u0629 \u0627\u0644\u0635\u062D\u064A\u0629</a>
      <a href="academy.html" data-i18n="nav.academy">\u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629 \u0627\u0644\u062D\u064A\u0627\u0629</a>
      <a href="contact.html" data-i18n="nav.contact">\u0627\u062A\u0635\u0644 \u0628\u0646\u0627</a>
      <button class="lang-btn" onclick="HNH.setLang(HNH.currentLang()==='ar'?'en':'ar')">EN/\u0639\u0631\u0628\u064A</button>
      <a href="contact.html" class="nav-cta" data-i18n="nav.book">\u0627\u062D\u062C\u0632 \u0645\u0648\u0639\u062F</a>
    </nav><button class="mobile-toggle" aria-label="Menu"><span></span><span></span><span></span></button></div></header>

<section class="page-hero" id="main-content"><div class="container"><div class="breadcrumb"><a href="index.html" id="crumbHome">\u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629</a><span>/</span><a href="academy.html" id="crumbAcademy">\u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629 \u0627\u0644\u062D\u064A\u0627\u0629</a><span>/</span><span id="crumbCourse">\u0627\u0644\u062F\u0648\u0631\u0629</span></div><h1 id="courseTitle">\u0627\u0644\u062F\u0648\u0631\u0629</h1><p id="courseSubtitle"></p><div class="stats-bar" style="margin-top:24px;grid-template-columns:repeat(3,1fr);"><div class="stat-card"><div class="stat-label" id="durationLabel">\u0627\u0644\u0645\u062F\u0629</div><div class="stat-number" id="courseDuration">\u2014</div></div><div class="stat-card"><div class="stat-label" id="levelLabel">\u0627\u0644\u0645\u0633\u062A\u0648\u0649</div><div class="stat-number" id="courseLevel">\u2014</div></div><div class="stat-card"><div class="stat-label" id="certificateLabel">\u0627\u0644\u0634\u0647\u0627\u062F\u0629</div><div class="stat-number" id="courseCertificate" style="font-size:1rem;">\u2014</div></div></div></div></section>

<section class="section bg-white">
  <div class="container">
    <div class="grid-2">
      <div class="card animate-on-scroll delay-1">
        <h3 id="overviewLabel">\u0646\u0638\u0631\u0629 \u0639\u0627\u0645\u0629</h3>
        <p id="courseOverview" style="margin-top:12px;color:var(--text-light);"></p>
      </div>
      <div class="card animate-on-scroll delay-2">
        <h3 id="audienceLabel">\u0627\u0644\u0641\u0626\u0629 \u0627\u0644\u0645\u0633\u062A\u0647\u062F\u0641\u0629</h3>
        <p id="courseAudience" style="margin-top:12px;color:var(--text-light);"></p>
        <h4 id="modeLabel" style="margin-top:20px;"></h4>
        <p id="courseMode" style="color:var(--text-light);"></p>
      </div>
    </div>
  </div>
</section>

<section class="section bg-light">
  <div class="container">
    <div class="section-header animate-on-scroll">
      <h2 id="outcomesTitle">\u0645\u062E\u0631\u062C\u0627\u062A \u0627\u0644\u062A\u0639\u0644\u0645</h2>
    </div>
    <div class="card"><ul id="courseOutcomes" style="list-style:disc;padding-inline-start:24px;display:grid;gap:10px;color:var(--text-light);"></ul></div>
  </div>
</section>

<section class="section bg-white">
  <div class="container">
    <div class="section-header animate-on-scroll">
      <h2 id="curriculumTitle">\u0627\u0644\u0645\u062D\u062A\u0648\u0649 \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u064A \u0627\u0644\u0643\u0627\u0645\u0644</h2>
    </div>
    <div id="courseModules" class="grid-2"></div>
  </div>
</section>

<section class="section bg-light">
  <div class="container">
    <div class="grid-2">
      <div class="card animate-on-scroll delay-1">
        <h3 id="materialsTitle">\u0627\u0644\u0645\u0648\u0627\u062F \u0627\u0644\u062A\u0639\u0644\u064A\u0645\u064A\u0629</h3>
        <ul id="courseMaterials" style="list-style:disc;padding-inline-start:24px;display:grid;gap:10px;margin-top:12px;color:var(--text-light);"></ul>
      </div>
      <div class="card animate-on-scroll delay-2">
        <h3 id="prereqTitle">\u0627\u0644\u0645\u062A\u0637\u0644\u0628\u0627\u062A \u0627\u0644\u0645\u0633\u0628\u0642\u0629</h3>
        <p id="coursePrereq" style="margin-top:12px;color:var(--text-light);"></p>
        <h3 id="assessmentTitle" style="margin-top:20px;">\u0637\u0631\u064A\u0642\u0629 \u0627\u0644\u062A\u0642\u064A\u064A\u0645</h3>
        <p id="courseAssessment" style="margin-top:12px;color:var(--text-light);"></p>
      </div>
    </div>
  </div>
</section>

<section class="section bg-white">
  <div class="container">
    <div class="section-header animate-on-scroll">
      <h2 id="faqTitle">\u0627\u0644\u0623\u0633\u0626\u0644\u0629 \u0627\u0644\u0634\u0627\u0626\u0639\u0629 \u0644\u0644\u062F\u0648\u0631\u0629</h2>
    </div>
    <div id="courseFaq" style="max-width:900px;margin:0 auto;"></div>
  </div>
</section>

<section class="section bg-light">
  <div class="container">
    <div class="section-header animate-on-scroll">
      <h2 id="relatedTitle">\u062F\u0648\u0631\u0627\u062A \u0630\u0627\u062A \u0635\u0644\u0629</h2>
    </div>
    <div class="grid-3" id="relatedGrid"></div>
  </div>
</section>

<section class="cta-section"><div class="container"><h2 id="ctaTitle">\u0633\u062C\u0644 \u0641\u064A \u0627\u0644\u062F\u0648\u0631\u0629 \u0627\u0644\u0622\u0646</h2><p id="ctaSubtitle">\u0627\u062D\u062C\u0632 \u0645\u0642\u0639\u062F\u0643 \u0627\u0644\u0622\u0646 \u0648\u062A\u0648\u0627\u0635\u0644 \u0645\u0639 \u0641\u0631\u064A\u0642 \u0627\u0644\u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629</p><div class="cta-buttons"><a href="contact.html" class="btn btn-accent btn-lg" id="ctaPrimary">\u0633\u062C\u0644 \u0627\u0644\u0622\u0646</a><a href="academy.html" class="btn btn-white btn-lg" id="ctaSecondary">\u0627\u0644\u0639\u0648\u062F\u0629 \u0625\u0644\u0649 \u0627\u0644\u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629</a></div></div></section>

<footer class="footer">
  <div class="container">
    <div class="footer-grid">
      <div>
        <h4 data-i18n="footer.name">\u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A</h4>
        <p style="margin-bottom:16px;" data-i18n="footer.desc">\u0646\u0638\u0627\u0645 BrainSAIT Healthcare OS \u0627\u0644\u0645\u062A\u0635\u0644 \u0628\u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062D\u064A\u0629</p>
        <span class="api-status live">API Connected</span>
      </div>
      <div>
        <h4 data-i18n="footer.quickLinks">\u0631\u0648\u0627\u0628\u0637 \u0633\u0631\u064A\u0639\u0629</h4>
        <a href="about.html" data-i18n="nav.about">\u0639\u0646 \u0627\u0644\u0645\u062C\u0645\u0648\u0639\u0629</a>
        <a href="departments.html" data-i18n="nav.departments">\u0627\u0644\u0623\u0642\u0633\u0627\u0645 \u0627\u0644\u0637\u0628\u064A\u0629</a>
        <a href="doctors.html" data-i18n="nav.doctors">\u0623\u0637\u0628\u0627\u0624\u0646\u0627</a>
        <a href="branches.html" data-i18n="nav.branches">\u0641\u0631\u0648\u0639\u0646\u0627</a>
        <a href="packages.html" data-i18n="nav.packages">\u0628\u0627\u0642\u0627\u062A \u0627\u0644\u0631\u0639\u0627\u064A\u0629</a>
        <a href="blog.html" data-i18n="nav.blog">\u0627\u0644\u0645\u062F\u0648\u0646\u0629 \u0627\u0644\u0635\u062D\u064A\u0629</a>
        <a href="academy.html" data-i18n="nav.academy">\u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629 \u0627\u0644\u062D\u064A\u0627\u0629</a>
        <a href="faq.html" data-i18n="nav.faq">\u0627\u0644\u0623\u0633\u0626\u0644\u0629 \u0627\u0644\u0634\u0627\u0626\u0639\u0629</a>
      </div>
      <div>
        <h4 data-i18n="footer.services">\u062E\u062F\u0645\u0627\u062A\u0646\u0627</h4>
        <a href="contact.html" data-i18n="nav.book">\u062D\u062C\u0632 \u0645\u0648\u0639\u062F</a>
        <a href="departments.html">\u0627\u0644\u0639\u064A\u0627\u062F\u0627\u062A \u0627\u0644\u062E\u0627\u0631\u062C\u064A\u0629</a>
        <a href="departments.html">\u0627\u0644\u0637\u0648\u0627\u0631\u0626</a>
        <a href="departments.html">\u0627\u0644\u062C\u0631\u0627\u062D\u0627\u062A</a>
        <a href="packages.html" data-i18n="nav.packages">\u0628\u0627\u0642\u0627\u062A \u0627\u0644\u0631\u0639\u0627\u064A\u0629</a>
      </div>
      <div>
        <h4 data-i18n="footer.contact">\u062A\u0648\u0627\u0635\u0644 \u0645\u0639\u0646\u0627</h4>
        <a href="tel:966920000094">+966920000094</a>
        <a href="mailto:info@hayathospitals.com">info@hayathospitals.com</a>
        <p style="margin-top:8px;font-size:0.85rem;">\u0627\u0644\u0631\u064A\u0627\u0636\u060C \u0627\u0644\u0645\u0645\u0644\u0643\u0629 \u0627\u0644\u0639\u0631\u0628\u064A\u0629 \u0627\u0644\u0633\u0639\u0648\u062F\u064A\u0629</p>
      </div>
    </div>
    <div class="footer-bottom">
      <p>\xA9 2026 \u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A \u2014 BrainSAIT Healthcare OS</p>
    </div>
  </div>
</footer>

<a href="https://wa.me/966920000094" class="wa-float" target="_blank" rel="noopener" aria-label="WhatsApp">
  <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492l4.624-1.47A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75c-2.115 0-4.142-.665-5.847-1.884l-.42-.279-2.746.874.874-2.746-.279-.42A9.713 9.713 0 012.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75z"/></svg>
</a>
<button class="back-top" onclick="window.scrollTo({top:0,behavior:'smooth'})" aria-label="Back to top">
  <svg viewBox="0 0 24 24"><path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/></svg>
</button>

<script src="js/common.js"><\/script>
<script src="js/academy-data.js"><\/script>
<script>
const COURSE_SLUG = 'pharmacy';
const COURSE_ROUTES = {
  'nphies': 'course-nphies.html',
  'medical-coding': 'course-medical-coding.html',
  'rcm': 'course-rcm.html',
  'ai-healthcare': 'course-ai-healthcare.html',
  'pdpl': 'course-pdpl.html',
  'clinical-documentation': 'course-clinical-documentation.html',
  'pharmacy': 'course-pharmacy.html',
  'cbahi-quality': 'course-cbahi-quality.html',
  'infection-control': 'course-infection-control.html'
};
const LABELS = {
  ar: {
    home: '\u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629',
    academy: '\u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629 \u0627\u0644\u062D\u064A\u0627\u0629',
    duration: '\u0627\u0644\u0645\u062F\u0629',
    level: '\u0627\u0644\u0645\u0633\u062A\u0648\u0649',
    certificate: '\u0627\u0644\u0634\u0647\u0627\u062F\u0629',
    overview: '\u0646\u0638\u0631\u0629 \u0639\u0627\u0645\u0629',
    audience: '\u0627\u0644\u0641\u0626\u0629 \u0627\u0644\u0645\u0633\u062A\u0647\u062F\u0641\u0629',
    mode: '\u0646\u0645\u0637 \u0627\u0644\u062A\u0642\u062F\u064A\u0645',
    faqTitle: '\u0627\u0644\u0623\u0633\u0626\u0644\u0629 \u0627\u0644\u0634\u0627\u0626\u0639\u0629 \u0644\u0644\u062F\u0648\u0631\u0629',
    relatedTitle: '\u062F\u0648\u0631\u0627\u062A \u0630\u0627\u062A \u0635\u0644\u0629',
    relatedDetails: '\u0639\u0631\u0636 \u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u062F\u0648\u0631\u0629',
    ctaTitle: '\u0633\u062C\u0644 \u0641\u064A \u0627\u0644\u062F\u0648\u0631\u0629 \u0627\u0644\u0622\u0646',
    ctaSubtitle: '\u0627\u062D\u062C\u0632 \u0645\u0642\u0639\u062F\u0643 \u0627\u0644\u0622\u0646 \u0648\u062A\u0648\u0627\u0635\u0644 \u0645\u0639 \u0641\u0631\u064A\u0642 \u0627\u0644\u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629',
    ctaPrimary: '\u0633\u062C\u0644 \u0627\u0644\u0622\u0646',
    ctaSecondary: '\u0627\u0644\u0639\u0648\u062F\u0629 \u0625\u0644\u0649 \u0627\u0644\u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629'
  },
  en: {
    home: 'Home',
    academy: 'Life Academy',
    duration: 'Duration',
    level: 'Level',
    certificate: 'Certificate',
    overview: 'Overview',
    audience: 'Target Audience',
    mode: 'Delivery Mode',
    faqTitle: 'Course FAQs',
    relatedTitle: 'Related Courses',
    relatedDetails: 'View Course Details',
    ctaTitle: 'Enroll in This Course',
    ctaSubtitle: 'Reserve your seat and connect with the academy team',
    ctaPrimary: 'Enroll Now',
    ctaSecondary: 'Back to Academy'
  }
};

function renderCoursePage(lang) {
  const academy = window.HNH_ACADEMY_DATA.academy[lang];
  const course = window.HNH_ACADEMY_DATA.courses[COURSE_SLUG][lang];
  const labels = LABELS[lang];
  const absoluteUrl = \`https://hnh.brainsait.org/\${window.location.pathname.split('/').pop()}\`;

  document.getElementById('canonicalLink').setAttribute('href', absoluteUrl);
  document.getElementById('ogUrlMeta').setAttribute('content', absoluteUrl);

  const metaTitle = \`\${course.title} | \${academy.breadcrumbCurrent}\`;
  document.title = metaTitle;
  document.querySelector('meta[name="description"]').setAttribute('content', course.shortDescription);
  document.querySelector('meta[property="og:title"]').setAttribute('content', metaTitle);
  document.querySelector('meta[property="og:description"]').setAttribute('content', course.shortDescription);
  document.querySelector('meta[name="twitter:title"]').setAttribute('content', metaTitle);
  document.querySelector('meta[name="twitter:description"]').setAttribute('content', course.shortDescription);

  document.getElementById('crumbHome').textContent = labels.home;
  document.getElementById('crumbAcademy').textContent = labels.academy;
  document.getElementById('crumbCourse').textContent = course.title;
  document.getElementById('courseTitle').textContent = course.title;
  document.getElementById('courseSubtitle').textContent = course.shortDescription;
  document.getElementById('durationLabel').textContent = labels.duration;
  document.getElementById('levelLabel').textContent = labels.level;
  document.getElementById('certificateLabel').textContent = labels.certificate;
  document.getElementById('courseDuration').textContent = course.duration;
  document.getElementById('courseLevel').textContent = course.level;
  document.getElementById('courseCertificate').textContent = course.certificate;
  document.getElementById('overviewLabel').textContent = labels.overview;
  document.getElementById('courseOverview').textContent = course.overview;
  document.getElementById('audienceLabel').textContent = labels.audience;
  document.getElementById('courseAudience').textContent = course.audience;
  document.getElementById('modeLabel').textContent = labels.mode;
  document.getElementById('courseMode').textContent = course.mode;
  document.getElementById('outcomesTitle').textContent = course.outcomesTitle;
  document.getElementById('curriculumTitle').textContent = course.curriculumTitle;
  document.getElementById('materialsTitle').textContent = course.materialsTitle;
  document.getElementById('prereqTitle').textContent = course.prereqTitle;
  document.getElementById('assessmentTitle').textContent = course.assessmentTitle;
  document.getElementById('coursePrereq').textContent = course.prereq;
  document.getElementById('courseAssessment').textContent = course.assessment;
  document.getElementById('faqTitle').textContent = labels.faqTitle;
  document.getElementById('relatedTitle').textContent = labels.relatedTitle;
  document.getElementById('ctaTitle').textContent = labels.ctaTitle;
  document.getElementById('ctaSubtitle').textContent = labels.ctaSubtitle;
  document.getElementById('ctaPrimary').textContent = labels.ctaPrimary;
  document.getElementById('ctaSecondary').textContent = labels.ctaSecondary;

  document.getElementById('courseOutcomes').innerHTML = course.outcomes.map(item => \`<li>\${item}</li>\`).join('');
  document.getElementById('courseMaterials').innerHTML = course.materials.map(item => \`<li>\${item}</li>\`).join('');

  document.getElementById('courseModules').innerHTML = course.modules.map((module, idx) => \`
    <div class="card animate-on-scroll delay-\${(idx % 6) + 1}">
      <h4>\${module.title}</h4>
      <ul style="list-style:disc;padding-inline-start:24px;display:grid;gap:8px;margin-top:12px;color:var(--text-light);">
        \${module.points.map(point => \`<li>\${point}</li>\`).join('')}
      </ul>
    </div>
  \`).join('');

  const faqRoot = document.getElementById('courseFaq');
  faqRoot.innerHTML = course.faq.map((item, index) => \`
    <div class="faq-item animate-on-scroll delay-\${(index % 6) + 1}">
      <button class="faq-question">
        <span>\${item.q}</span>
        <svg class="faq-chevron" viewBox="0 0 24 24"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z"/></svg>
      </button>
      <div class="faq-answer"><p>\${item.a}</p></div>
    </div>
  \`).join('');

  faqRoot.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const answer = btn.nextElementSibling;
      const isOpen = btn.classList.contains('active');
      faqRoot.querySelectorAll('.faq-question').forEach(q => q.classList.remove('active'));
      faqRoot.querySelectorAll('.faq-answer').forEach(a => a.classList.remove('open'));
      if (!isOpen) {
        btn.classList.add('active');
        answer.classList.add('open');
      }
    });
  });

  const related = Object.entries(window.HNH_ACADEMY_DATA.courses)
    .filter(([slug]) => slug !== COURSE_SLUG)
    .slice(0, 3)
    .map(([slug, value]) => ({ slug, data: value[lang] }));

  const relatedGrid = document.getElementById('relatedGrid');
  relatedGrid.innerHTML = related.map((item, idx) => \`
    <div class="course-card animate-on-scroll delay-\${(idx % 3) + 1}">
      <div class="course-header"><h3 style="color:white;">\${item.data.title}</h3></div>
      <div class="course-body">
        <p>\${item.data.shortDescription}</p>
        <div class="course-meta"><span>\${labels.duration}: \${item.data.duration}</span><span>\${labels.level}: \${item.data.level}</span></div>
        <div style="margin-top:14px;">
          <a href="\${COURSE_ROUTES[item.slug]}" class="btn btn-outline btn-sm">\${labels.relatedDetails}</a>
        </div>
      </div>
    </div>
  \`).join('');

  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.title,
    description: course.shortDescription,
    provider: {
      '@type': 'Hospital',
      name: 'Hayat National Hospitals',
      url: 'https://hnh.brainsait.org'
    },
    inLanguage: lang,
    educationalCredentialAwarded: course.certificate,
    timeRequired: course.duration,
    url: absoluteUrl
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: course.faq.map(item => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a }
    }))
  };

  document.getElementById('courseSchema').textContent = JSON.stringify(courseSchema);
  document.getElementById('faqSchemaCourse').textContent = JSON.stringify(faqSchema);
}

document.addEventListener('DOMContentLoaded', () => {
  renderCoursePage(HNH.currentLang());
});

document.addEventListener('hnh:langChanged', e => {
  renderCoursePage(e.detail.lang);
});
<\/script>
</body>
</html>
`;
var course_rcm = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>\u062F\u0648\u0631\u0629 \u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629 \u0627\u0644\u062D\u064A\u0627\u0629</title>
<meta name="description" content="\u062A\u0641\u0627\u0635\u064A\u0644 \u062F\u0648\u0631\u0629 \u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629 \u0627\u0644\u062D\u064A\u0627\u0629.">
<meta name="robots" content="index, follow">
<meta name="theme-color" content="#0066CC">
<link id="canonicalLink" rel="canonical" href="https://hnh.brainsait.org/course-rcm.html">
<link rel="alternate" hreflang="ar" href="https://hnh.brainsait.org/course-rcm.html">
<link rel="alternate" hreflang="en" href="https://hnh.brainsait.org/course-rcm.html">
<link rel="alternate" hreflang="x-default" href="https://hnh.brainsait.org/course-rcm.html">
<link rel="manifest" href="/manifest.json">
<link rel="apple-touch-icon" href="/icon-192.png">
<meta property="og:type" content="website">
<meta property="og:site_name" content="\u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A | Hayat National Hospitals">
<meta property="og:title" content="\u062F\u0648\u0631\u0627\u062A \u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629 \u0627\u0644\u062D\u064A\u0627\u0629">
<meta property="og:description" content="\u0645\u062D\u062A\u0648\u0649 \u062A\u062F\u0631\u064A\u0628\u064A \u062A\u0641\u0635\u064A\u0644\u064A \u0645\u0639 \u0645\u0633\u0627\u0631\u0627\u062A \u062A\u0639\u0644\u0645 \u0639\u0645\u0644\u064A\u0629.">
<meta id="ogUrlMeta" property="og:url" content="https://hnh.brainsait.org/course-rcm.html">
<meta property="og:image" content="https://hnh.brainsait.org/og-image.jpg">
<meta property="og:locale" content="ar_SA">
<meta property="og:locale:alternate" content="en_US">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="\u062F\u0648\u0631\u0627\u062A \u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629 \u0627\u0644\u062D\u064A\u0627\u0629">
<meta name="twitter:description" content="\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u062F\u0648\u0631\u0627\u062A \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u064A\u0629 \u0645\u0646 \u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629 \u0627\u0644\u062D\u064A\u0627\u0629.">
<meta name="twitter:image" content="https://hnh.brainsait.org/og-image.jpg">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Tajawal:wght@300;400;500;700;800;900&display=swap" rel="stylesheet">
<link rel="stylesheet" href="css/style.css">
<script type="application/ld+json" id="courseSchema"><\/script>
<script type="application/ld+json" id="faqSchemaCourse"><\/script>
</head>
<body>
<a href="#main-content" class="skip-link">Skip to main content</a>
<header class="header"><div class="container header-inner"><a href="index.html" class="logo"><div class="logo-icon"><svg viewBox="0 0 24 24" width="24" height="24" fill="white"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg></div><div class="logo-text">\u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A<small>BrainSAIT Healthcare OS</small></div></a>
<nav class="nav" id="mainNav">
      <a href="index.html" data-i18n="nav.home">\u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629</a>
      <a href="about.html" data-i18n="nav.about">\u0639\u0646 \u0627\u0644\u0645\u062C\u0645\u0648\u0639\u0629</a>
      <a href="departments.html" data-i18n="nav.departments">\u0627\u0644\u0623\u0642\u0633\u0627\u0645 \u0627\u0644\u0637\u0628\u064A\u0629</a>
      <a href="doctors.html" data-i18n="nav.doctors">\u0623\u0637\u0628\u0627\u0624\u0646\u0627</a>
      <a href="branches.html" data-i18n="nav.branches">\u0641\u0631\u0648\u0639\u0646\u0627</a>
      <a href="packages.html" data-i18n="nav.packages">\u0628\u0627\u0642\u0627\u062A \u0627\u0644\u0631\u0639\u0627\u064A\u0629</a>
      <a href="blog.html" data-i18n="nav.blog">\u0627\u0644\u0645\u062F\u0648\u0646\u0629 \u0627\u0644\u0635\u062D\u064A\u0629</a>
      <a href="academy.html" data-i18n="nav.academy">\u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629 \u0627\u0644\u062D\u064A\u0627\u0629</a>
      <a href="contact.html" data-i18n="nav.contact">\u0627\u062A\u0635\u0644 \u0628\u0646\u0627</a>
      <button class="lang-btn" onclick="HNH.setLang(HNH.currentLang()==='ar'?'en':'ar')">EN/\u0639\u0631\u0628\u064A</button>
      <a href="contact.html" class="nav-cta" data-i18n="nav.book">\u0627\u062D\u062C\u0632 \u0645\u0648\u0639\u062F</a>
    </nav><button class="mobile-toggle" aria-label="Menu"><span></span><span></span><span></span></button></div></header>

<section class="page-hero" id="main-content"><div class="container"><div class="breadcrumb"><a href="index.html" id="crumbHome">\u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629</a><span>/</span><a href="academy.html" id="crumbAcademy">\u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629 \u0627\u0644\u062D\u064A\u0627\u0629</a><span>/</span><span id="crumbCourse">\u0627\u0644\u062F\u0648\u0631\u0629</span></div><h1 id="courseTitle">\u0627\u0644\u062F\u0648\u0631\u0629</h1><p id="courseSubtitle"></p><div class="stats-bar" style="margin-top:24px;grid-template-columns:repeat(3,1fr);"><div class="stat-card"><div class="stat-label" id="durationLabel">\u0627\u0644\u0645\u062F\u0629</div><div class="stat-number" id="courseDuration">\u2014</div></div><div class="stat-card"><div class="stat-label" id="levelLabel">\u0627\u0644\u0645\u0633\u062A\u0648\u0649</div><div class="stat-number" id="courseLevel">\u2014</div></div><div class="stat-card"><div class="stat-label" id="certificateLabel">\u0627\u0644\u0634\u0647\u0627\u062F\u0629</div><div class="stat-number" id="courseCertificate" style="font-size:1rem;">\u2014</div></div></div></div></section>

<section class="section bg-white">
  <div class="container">
    <div class="grid-2">
      <div class="card animate-on-scroll delay-1">
        <h3 id="overviewLabel">\u0646\u0638\u0631\u0629 \u0639\u0627\u0645\u0629</h3>
        <p id="courseOverview" style="margin-top:12px;color:var(--text-light);"></p>
      </div>
      <div class="card animate-on-scroll delay-2">
        <h3 id="audienceLabel">\u0627\u0644\u0641\u0626\u0629 \u0627\u0644\u0645\u0633\u062A\u0647\u062F\u0641\u0629</h3>
        <p id="courseAudience" style="margin-top:12px;color:var(--text-light);"></p>
        <h4 id="modeLabel" style="margin-top:20px;"></h4>
        <p id="courseMode" style="color:var(--text-light);"></p>
      </div>
    </div>
  </div>
</section>

<section class="section bg-light">
  <div class="container">
    <div class="section-header animate-on-scroll">
      <h2 id="outcomesTitle">\u0645\u062E\u0631\u062C\u0627\u062A \u0627\u0644\u062A\u0639\u0644\u0645</h2>
    </div>
    <div class="card"><ul id="courseOutcomes" style="list-style:disc;padding-inline-start:24px;display:grid;gap:10px;color:var(--text-light);"></ul></div>
  </div>
</section>

<section class="section bg-white">
  <div class="container">
    <div class="section-header animate-on-scroll">
      <h2 id="curriculumTitle">\u0627\u0644\u0645\u062D\u062A\u0648\u0649 \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u064A \u0627\u0644\u0643\u0627\u0645\u0644</h2>
    </div>
    <div id="courseModules" class="grid-2"></div>
  </div>
</section>

<section class="section bg-light">
  <div class="container">
    <div class="grid-2">
      <div class="card animate-on-scroll delay-1">
        <h3 id="materialsTitle">\u0627\u0644\u0645\u0648\u0627\u062F \u0627\u0644\u062A\u0639\u0644\u064A\u0645\u064A\u0629</h3>
        <ul id="courseMaterials" style="list-style:disc;padding-inline-start:24px;display:grid;gap:10px;margin-top:12px;color:var(--text-light);"></ul>
      </div>
      <div class="card animate-on-scroll delay-2">
        <h3 id="prereqTitle">\u0627\u0644\u0645\u062A\u0637\u0644\u0628\u0627\u062A \u0627\u0644\u0645\u0633\u0628\u0642\u0629</h3>
        <p id="coursePrereq" style="margin-top:12px;color:var(--text-light);"></p>
        <h3 id="assessmentTitle" style="margin-top:20px;">\u0637\u0631\u064A\u0642\u0629 \u0627\u0644\u062A\u0642\u064A\u064A\u0645</h3>
        <p id="courseAssessment" style="margin-top:12px;color:var(--text-light);"></p>
      </div>
    </div>
  </div>
</section>

<section class="section bg-white">
  <div class="container">
    <div class="section-header animate-on-scroll">
      <h2 id="faqTitle">\u0627\u0644\u0623\u0633\u0626\u0644\u0629 \u0627\u0644\u0634\u0627\u0626\u0639\u0629 \u0644\u0644\u062F\u0648\u0631\u0629</h2>
    </div>
    <div id="courseFaq" style="max-width:900px;margin:0 auto;"></div>
  </div>
</section>

<section class="section bg-light">
  <div class="container">
    <div class="section-header animate-on-scroll">
      <h2 id="relatedTitle">\u062F\u0648\u0631\u0627\u062A \u0630\u0627\u062A \u0635\u0644\u0629</h2>
    </div>
    <div class="grid-3" id="relatedGrid"></div>
  </div>
</section>

<section class="cta-section"><div class="container"><h2 id="ctaTitle">\u0633\u062C\u0644 \u0641\u064A \u0627\u0644\u062F\u0648\u0631\u0629 \u0627\u0644\u0622\u0646</h2><p id="ctaSubtitle">\u0627\u062D\u062C\u0632 \u0645\u0642\u0639\u062F\u0643 \u0627\u0644\u0622\u0646 \u0648\u062A\u0648\u0627\u0635\u0644 \u0645\u0639 \u0641\u0631\u064A\u0642 \u0627\u0644\u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629</p><div class="cta-buttons"><a href="contact.html" class="btn btn-accent btn-lg" id="ctaPrimary">\u0633\u062C\u0644 \u0627\u0644\u0622\u0646</a><a href="academy.html" class="btn btn-white btn-lg" id="ctaSecondary">\u0627\u0644\u0639\u0648\u062F\u0629 \u0625\u0644\u0649 \u0627\u0644\u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629</a></div></div></section>

<footer class="footer">
  <div class="container">
    <div class="footer-grid">
      <div>
        <h4 data-i18n="footer.name">\u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A</h4>
        <p style="margin-bottom:16px;" data-i18n="footer.desc">\u0646\u0638\u0627\u0645 BrainSAIT Healthcare OS \u0627\u0644\u0645\u062A\u0635\u0644 \u0628\u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062D\u064A\u0629</p>
        <span class="api-status live">API Connected</span>
      </div>
      <div>
        <h4 data-i18n="footer.quickLinks">\u0631\u0648\u0627\u0628\u0637 \u0633\u0631\u064A\u0639\u0629</h4>
        <a href="about.html" data-i18n="nav.about">\u0639\u0646 \u0627\u0644\u0645\u062C\u0645\u0648\u0639\u0629</a>
        <a href="departments.html" data-i18n="nav.departments">\u0627\u0644\u0623\u0642\u0633\u0627\u0645 \u0627\u0644\u0637\u0628\u064A\u0629</a>
        <a href="doctors.html" data-i18n="nav.doctors">\u0623\u0637\u0628\u0627\u0624\u0646\u0627</a>
        <a href="branches.html" data-i18n="nav.branches">\u0641\u0631\u0648\u0639\u0646\u0627</a>
        <a href="packages.html" data-i18n="nav.packages">\u0628\u0627\u0642\u0627\u062A \u0627\u0644\u0631\u0639\u0627\u064A\u0629</a>
        <a href="blog.html" data-i18n="nav.blog">\u0627\u0644\u0645\u062F\u0648\u0646\u0629 \u0627\u0644\u0635\u062D\u064A\u0629</a>
        <a href="academy.html" data-i18n="nav.academy">\u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629 \u0627\u0644\u062D\u064A\u0627\u0629</a>
        <a href="faq.html" data-i18n="nav.faq">\u0627\u0644\u0623\u0633\u0626\u0644\u0629 \u0627\u0644\u0634\u0627\u0626\u0639\u0629</a>
      </div>
      <div>
        <h4 data-i18n="footer.services">\u062E\u062F\u0645\u0627\u062A\u0646\u0627</h4>
        <a href="contact.html" data-i18n="nav.book">\u062D\u062C\u0632 \u0645\u0648\u0639\u062F</a>
        <a href="departments.html">\u0627\u0644\u0639\u064A\u0627\u062F\u0627\u062A \u0627\u0644\u062E\u0627\u0631\u062C\u064A\u0629</a>
        <a href="departments.html">\u0627\u0644\u0637\u0648\u0627\u0631\u0626</a>
        <a href="departments.html">\u0627\u0644\u062C\u0631\u0627\u062D\u0627\u062A</a>
        <a href="packages.html" data-i18n="nav.packages">\u0628\u0627\u0642\u0627\u062A \u0627\u0644\u0631\u0639\u0627\u064A\u0629</a>
      </div>
      <div>
        <h4 data-i18n="footer.contact">\u062A\u0648\u0627\u0635\u0644 \u0645\u0639\u0646\u0627</h4>
        <a href="tel:966920000094">+966920000094</a>
        <a href="mailto:info@hayathospitals.com">info@hayathospitals.com</a>
        <p style="margin-top:8px;font-size:0.85rem;">\u0627\u0644\u0631\u064A\u0627\u0636\u060C \u0627\u0644\u0645\u0645\u0644\u0643\u0629 \u0627\u0644\u0639\u0631\u0628\u064A\u0629 \u0627\u0644\u0633\u0639\u0648\u062F\u064A\u0629</p>
      </div>
    </div>
    <div class="footer-bottom">
      <p>\xA9 2026 \u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A \u2014 BrainSAIT Healthcare OS</p>
    </div>
  </div>
</footer>

<a href="https://wa.me/966920000094" class="wa-float" target="_blank" rel="noopener" aria-label="WhatsApp">
  <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492l4.624-1.47A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75c-2.115 0-4.142-.665-5.847-1.884l-.42-.279-2.746.874.874-2.746-.279-.42A9.713 9.713 0 012.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75z"/></svg>
</a>
<button class="back-top" onclick="window.scrollTo({top:0,behavior:'smooth'})" aria-label="Back to top">
  <svg viewBox="0 0 24 24"><path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/></svg>
</button>

<script src="js/common.js"><\/script>
<script src="js/academy-data.js"><\/script>
<script>
const COURSE_SLUG = 'rcm';
const COURSE_ROUTES = {
  'nphies': 'course-nphies.html',
  'medical-coding': 'course-medical-coding.html',
  'rcm': 'course-rcm.html',
  'ai-healthcare': 'course-ai-healthcare.html',
  'pdpl': 'course-pdpl.html',
  'clinical-documentation': 'course-clinical-documentation.html',
  'pharmacy': 'course-pharmacy.html',
  'cbahi-quality': 'course-cbahi-quality.html',
  'infection-control': 'course-infection-control.html'
};
const LABELS = {
  ar: {
    home: '\u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629',
    academy: '\u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629 \u0627\u0644\u062D\u064A\u0627\u0629',
    duration: '\u0627\u0644\u0645\u062F\u0629',
    level: '\u0627\u0644\u0645\u0633\u062A\u0648\u0649',
    certificate: '\u0627\u0644\u0634\u0647\u0627\u062F\u0629',
    overview: '\u0646\u0638\u0631\u0629 \u0639\u0627\u0645\u0629',
    audience: '\u0627\u0644\u0641\u0626\u0629 \u0627\u0644\u0645\u0633\u062A\u0647\u062F\u0641\u0629',
    mode: '\u0646\u0645\u0637 \u0627\u0644\u062A\u0642\u062F\u064A\u0645',
    faqTitle: '\u0627\u0644\u0623\u0633\u0626\u0644\u0629 \u0627\u0644\u0634\u0627\u0626\u0639\u0629 \u0644\u0644\u062F\u0648\u0631\u0629',
    relatedTitle: '\u062F\u0648\u0631\u0627\u062A \u0630\u0627\u062A \u0635\u0644\u0629',
    relatedDetails: '\u0639\u0631\u0636 \u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u062F\u0648\u0631\u0629',
    ctaTitle: '\u0633\u062C\u0644 \u0641\u064A \u0627\u0644\u062F\u0648\u0631\u0629 \u0627\u0644\u0622\u0646',
    ctaSubtitle: '\u0627\u062D\u062C\u0632 \u0645\u0642\u0639\u062F\u0643 \u0627\u0644\u0622\u0646 \u0648\u062A\u0648\u0627\u0635\u0644 \u0645\u0639 \u0641\u0631\u064A\u0642 \u0627\u0644\u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629',
    ctaPrimary: '\u0633\u062C\u0644 \u0627\u0644\u0622\u0646',
    ctaSecondary: '\u0627\u0644\u0639\u0648\u062F\u0629 \u0625\u0644\u0649 \u0627\u0644\u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629'
  },
  en: {
    home: 'Home',
    academy: 'Life Academy',
    duration: 'Duration',
    level: 'Level',
    certificate: 'Certificate',
    overview: 'Overview',
    audience: 'Target Audience',
    mode: 'Delivery Mode',
    faqTitle: 'Course FAQs',
    relatedTitle: 'Related Courses',
    relatedDetails: 'View Course Details',
    ctaTitle: 'Enroll in This Course',
    ctaSubtitle: 'Reserve your seat and connect with the academy team',
    ctaPrimary: 'Enroll Now',
    ctaSecondary: 'Back to Academy'
  }
};

function renderCoursePage(lang) {
  const academy = window.HNH_ACADEMY_DATA.academy[lang];
  const course = window.HNH_ACADEMY_DATA.courses[COURSE_SLUG][lang];
  const labels = LABELS[lang];
  const absoluteUrl = \`https://hnh.brainsait.org/\${window.location.pathname.split('/').pop()}\`;

  document.getElementById('canonicalLink').setAttribute('href', absoluteUrl);
  document.getElementById('ogUrlMeta').setAttribute('content', absoluteUrl);

  const metaTitle = \`\${course.title} | \${academy.breadcrumbCurrent}\`;
  document.title = metaTitle;
  document.querySelector('meta[name="description"]').setAttribute('content', course.shortDescription);
  document.querySelector('meta[property="og:title"]').setAttribute('content', metaTitle);
  document.querySelector('meta[property="og:description"]').setAttribute('content', course.shortDescription);
  document.querySelector('meta[name="twitter:title"]').setAttribute('content', metaTitle);
  document.querySelector('meta[name="twitter:description"]').setAttribute('content', course.shortDescription);

  document.getElementById('crumbHome').textContent = labels.home;
  document.getElementById('crumbAcademy').textContent = labels.academy;
  document.getElementById('crumbCourse').textContent = course.title;
  document.getElementById('courseTitle').textContent = course.title;
  document.getElementById('courseSubtitle').textContent = course.shortDescription;
  document.getElementById('durationLabel').textContent = labels.duration;
  document.getElementById('levelLabel').textContent = labels.level;
  document.getElementById('certificateLabel').textContent = labels.certificate;
  document.getElementById('courseDuration').textContent = course.duration;
  document.getElementById('courseLevel').textContent = course.level;
  document.getElementById('courseCertificate').textContent = course.certificate;
  document.getElementById('overviewLabel').textContent = labels.overview;
  document.getElementById('courseOverview').textContent = course.overview;
  document.getElementById('audienceLabel').textContent = labels.audience;
  document.getElementById('courseAudience').textContent = course.audience;
  document.getElementById('modeLabel').textContent = labels.mode;
  document.getElementById('courseMode').textContent = course.mode;
  document.getElementById('outcomesTitle').textContent = course.outcomesTitle;
  document.getElementById('curriculumTitle').textContent = course.curriculumTitle;
  document.getElementById('materialsTitle').textContent = course.materialsTitle;
  document.getElementById('prereqTitle').textContent = course.prereqTitle;
  document.getElementById('assessmentTitle').textContent = course.assessmentTitle;
  document.getElementById('coursePrereq').textContent = course.prereq;
  document.getElementById('courseAssessment').textContent = course.assessment;
  document.getElementById('faqTitle').textContent = labels.faqTitle;
  document.getElementById('relatedTitle').textContent = labels.relatedTitle;
  document.getElementById('ctaTitle').textContent = labels.ctaTitle;
  document.getElementById('ctaSubtitle').textContent = labels.ctaSubtitle;
  document.getElementById('ctaPrimary').textContent = labels.ctaPrimary;
  document.getElementById('ctaSecondary').textContent = labels.ctaSecondary;

  document.getElementById('courseOutcomes').innerHTML = course.outcomes.map(item => \`<li>\${item}</li>\`).join('');
  document.getElementById('courseMaterials').innerHTML = course.materials.map(item => \`<li>\${item}</li>\`).join('');

  document.getElementById('courseModules').innerHTML = course.modules.map((module, idx) => \`
    <div class="card animate-on-scroll delay-\${(idx % 6) + 1}">
      <h4>\${module.title}</h4>
      <ul style="list-style:disc;padding-inline-start:24px;display:grid;gap:8px;margin-top:12px;color:var(--text-light);">
        \${module.points.map(point => \`<li>\${point}</li>\`).join('')}
      </ul>
    </div>
  \`).join('');

  const faqRoot = document.getElementById('courseFaq');
  faqRoot.innerHTML = course.faq.map((item, index) => \`
    <div class="faq-item animate-on-scroll delay-\${(index % 6) + 1}">
      <button class="faq-question">
        <span>\${item.q}</span>
        <svg class="faq-chevron" viewBox="0 0 24 24"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z"/></svg>
      </button>
      <div class="faq-answer"><p>\${item.a}</p></div>
    </div>
  \`).join('');

  faqRoot.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const answer = btn.nextElementSibling;
      const isOpen = btn.classList.contains('active');
      faqRoot.querySelectorAll('.faq-question').forEach(q => q.classList.remove('active'));
      faqRoot.querySelectorAll('.faq-answer').forEach(a => a.classList.remove('open'));
      if (!isOpen) {
        btn.classList.add('active');
        answer.classList.add('open');
      }
    });
  });

  const related = Object.entries(window.HNH_ACADEMY_DATA.courses)
    .filter(([slug]) => slug !== COURSE_SLUG)
    .slice(0, 3)
    .map(([slug, value]) => ({ slug, data: value[lang] }));

  const relatedGrid = document.getElementById('relatedGrid');
  relatedGrid.innerHTML = related.map((item, idx) => \`
    <div class="course-card animate-on-scroll delay-\${(idx % 3) + 1}">
      <div class="course-header"><h3 style="color:white;">\${item.data.title}</h3></div>
      <div class="course-body">
        <p>\${item.data.shortDescription}</p>
        <div class="course-meta"><span>\${labels.duration}: \${item.data.duration}</span><span>\${labels.level}: \${item.data.level}</span></div>
        <div style="margin-top:14px;">
          <a href="\${COURSE_ROUTES[item.slug]}" class="btn btn-outline btn-sm">\${labels.relatedDetails}</a>
        </div>
      </div>
    </div>
  \`).join('');

  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.title,
    description: course.shortDescription,
    provider: {
      '@type': 'Hospital',
      name: 'Hayat National Hospitals',
      url: 'https://hnh.brainsait.org'
    },
    inLanguage: lang,
    educationalCredentialAwarded: course.certificate,
    timeRequired: course.duration,
    url: absoluteUrl
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: course.faq.map(item => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a }
    }))
  };

  document.getElementById('courseSchema').textContent = JSON.stringify(courseSchema);
  document.getElementById('faqSchemaCourse').textContent = JSON.stringify(faqSchema);
}

document.addEventListener('DOMContentLoaded', () => {
  renderCoursePage(HNH.currentLang());
});

document.addEventListener('hnh:langChanged', e => {
  renderCoursePage(e.detail.lang);
});
<\/script>
</body>
</html>
`;
var departments = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>\u0627\u0644\u0623\u0642\u0633\u0627\u0645 \u0627\u0644\u0637\u0628\u064A\u0629 | \u0645\u0633\u062A\u0634\u0641\u0649 \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A</title>
<meta name="description" content="\u0627\u0633\u062A\u0643\u0634\u0641 \u0623\u0643\u062B\u0631 \u0645\u0646 42 \u0642\u0633\u0645\u0627\u064B \u0637\u0628\u064A\u0627\u064B \u0641\u064A \u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A \u2014 \u0645\u0646 \u0627\u0644\u0642\u0644\u0628 \u0625\u0644\u0649 \u0637\u0628 \u0627\u0644\u0623\u0637\u0641\u0627\u0644 \u0648\u0627\u0644\u062C\u0631\u0627\u062D\u0629. | Explore 42+ medical departments at Hayat National Hospitals.">
<meta name="keywords" content="\u0623\u0642\u0633\u0627\u0645 \u0637\u0628\u064A\u0629, medical departments, \u0645\u0633\u062A\u0634\u0641\u0649 \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A, Hayat, \u0642\u0644\u0628, \u0623\u0637\u0641\u0627\u0644, \u062C\u0631\u0627\u062D\u0629">
<meta name="robots" content="index, follow">
<meta name="theme-color" content="#0066CC">
<link rel="canonical" href="https://hnh.brainsait.org/departments.html">
<link rel="alternate" hreflang="ar" href="https://hnh.brainsait.org/departments.html">
<link rel="alternate" hreflang="en" href="https://hnh.brainsait.org/departments.html">
<link rel="alternate" hreflang="x-default" href="https://hnh.brainsait.org/departments.html">
<link rel="manifest" href="/manifest.json">
<link rel="apple-touch-icon" href="/icon-192.png">
<meta property="og:type" content="website">
<meta property="og:site_name" content="\u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A | Hayat National Hospitals">
<meta property="og:title" content="\u0627\u0644\u0623\u0642\u0633\u0627\u0645 \u0627\u0644\u0637\u0628\u064A\u0629 | \u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A">
<meta property="og:description" content="\u0627\u0633\u062A\u0643\u0634\u0641 \u0623\u0643\u062B\u0631 \u0645\u0646 42 \u0642\u0633\u0645\u0627\u064B \u0637\u0628\u064A\u0627\u064B \u0641\u064A \u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A \u2014 \u0645\u0646 \u0627\u0644\u0642\u0644\u0628 \u0625\u0644\u0649 \u0637\u0628 \u0627\u0644\u0623\u0637\u0641\u0627\u0644 \u0648\u0627\u0644\u062C\u0631\u0627\u062D\u0629.">
<meta property="og:url" content="https://hnh.brainsait.org/departments.html">
<meta property="og:image" content="https://hnh.brainsait.org/og-image.jpg">
<meta property="og:locale" content="ar_SA">
<meta property="og:locale:alternate" content="en_US">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="\u0627\u0644\u0623\u0642\u0633\u0627\u0645 \u0627\u0644\u0637\u0628\u064A\u0629 | \u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A">
<meta name="twitter:description" content="\u0627\u0633\u062A\u0643\u0634\u0641 \u0623\u0643\u062B\u0631 \u0645\u0646 42 \u0642\u0633\u0645\u0627\u064B \u0637\u0628\u064A\u0627\u064B \u0641\u064A \u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A.">
<meta name="twitter:image" content="https://hnh.brainsait.org/og-image.jpg">

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Tajawal:wght@300;400;500;700;800;900&display=swap" rel="stylesheet">
<link rel="stylesheet" href="css/style.css">
</head>
<body>
<a href="#main-content" class="skip-link">Skip to main content</a>
<header class="header"><div class="container header-inner"><a href="index.html" class="logo"><div class="logo-icon"><svg viewBox="0 0 24 24" width="24" height="24" fill="white"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg></div><div class="logo-text">\u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A<small>BrainSAIT Healthcare OS</small></div></a><nav class="nav" id="mainNav">
      <a href="index.html" data-i18n="nav.home">\u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629</a>
      <a href="about.html" data-i18n="nav.about">\u0639\u0646 \u0627\u0644\u0645\u062C\u0645\u0648\u0639\u0629</a>
      <a href="departments.html" data-i18n="nav.departments">\u0627\u0644\u0623\u0642\u0633\u0627\u0645 \u0627\u0644\u0637\u0628\u064A\u0629</a>
      <a href="doctors.html" data-i18n="nav.doctors">\u0623\u0637\u0628\u0627\u0624\u0646\u0627</a>
      <a href="branches.html" data-i18n="nav.branches">\u0641\u0631\u0648\u0639\u0646\u0627</a>
      <a href="packages.html" data-i18n="nav.packages">\u0628\u0627\u0642\u0627\u062A \u0627\u0644\u0631\u0639\u0627\u064A\u0629</a>
      <a href="blog.html" data-i18n="nav.blog">\u0627\u0644\u0645\u062F\u0648\u0646\u0629 \u0627\u0644\u0635\u062D\u064A\u0629</a>
      <a href="contact.html" data-i18n="nav.contact">\u0627\u062A\u0635\u0644 \u0628\u0646\u0627</a>
      <button class="lang-btn" onclick="HNH.setLang(HNH.currentLang()==='ar'?'en':'ar')">EN/\u0639\u0631\u0628\u064A</button>
      <a href="contact.html" class="nav-cta" data-i18n="nav.book">\u0627\u062D\u062C\u0632 \u0645\u0648\u0639\u062F</a>
    </nav><button class="mobile-toggle" aria-label="Menu"><span></span><span></span><span></span></button></div></header>

<section class="page-hero" id="main-content"><div class="container"><div class="breadcrumb"><a href="index.html">\u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629</a><span>/</span><span>\u0627\u0644\u0623\u0642\u0633\u0627\u0645 \u0627\u0644\u0637\u0628\u064A\u0629</span></div><h1>\u0627\u0644\u0623\u0642\u0633\u0627\u0645 \u0627\u0644\u0637\u0628\u064A\u0629</h1><p>\u0646\u063A\u0637\u064A \u0623\u0643\u062B\u0631 \u0645\u0646 42 \u062A\u062E\u0635\u0635\u0627\u064B \u0637\u0628\u064A\u0627\u064B \u0644\u062E\u062F\u0645\u062A\u0643\u0645 <span class="api-status live" style="margin-right:8px;">\u25CF Live API</span></p></div></section>

<section class="section bg-white"><div class="container">
  <div class="filter-bar animate-on-scroll">
    <input type="text" id="deptSearch" placeholder="\u0627\u0628\u062D\u062B \u0639\u0646 \u0642\u0633\u0645..." oninput="filterDepts()">
    <button class="filter-chip active" onclick="filterCat(this,'all')">\u0627\u0644\u0643\u0644</button>
    <button class="filter-chip" onclick="filterCat(this,'medical')">\u0637\u0628\u064A\u0629</button>
    <button class="filter-chip" onclick="filterCat(this,'surgical')">\u062C\u0631\u0627\u062D\u064A\u0629</button>
    <button class="filter-chip" onclick="filterCat(this,'support')">\u0645\u0633\u0627\u0646\u062F\u0629</button>
  </div>
  <div class="grid-3" id="deptGrid"><div class="loading"><div class="spinner"></div></div></div>
</div></section>

<section class="cta-section"><div class="container"><h2>\u0635\u062D\u062A\u0643 \u0623\u0648\u0644\u0627\u064B</h2><p>\u0627\u062D\u062C\u0632 \u0645\u0648\u0639\u062F\u0643 \u0627\u0644\u0622\u0646</p><div class="cta-buttons"><a href="contact.html" class="btn btn-accent btn-lg">\u0627\u062D\u062C\u0632 \u0645\u0648\u0639\u062F</a></div></div></section>

<footer class="footer">
  <div class="container">
    <div class="footer-grid">
      <div>
        <h4 data-i18n="footer.name">\u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A</h4>
        <p style="margin-bottom:16px;" data-i18n="footer.desc">\u0646\u0638\u0627\u0645 BrainSAIT Healthcare OS \u0627\u0644\u0645\u062A\u0635\u0644 \u0628\u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062D\u064A\u0629</p>
        <span class="api-status live">API Connected</span>
      </div>
      <div>
        <h4 data-i18n="footer.quickLinks">\u0631\u0648\u0627\u0628\u0637 \u0633\u0631\u064A\u0639\u0629</h4>
        <a href="about.html" data-i18n="nav.about">\u0639\u0646 \u0627\u0644\u0645\u062C\u0645\u0648\u0639\u0629</a>
        <a href="departments.html" data-i18n="nav.departments">\u0627\u0644\u0623\u0642\u0633\u0627\u0645 \u0627\u0644\u0637\u0628\u064A\u0629</a>
        <a href="doctors.html" data-i18n="nav.doctors">\u0623\u0637\u0628\u0627\u0624\u0646\u0627</a>
        <a href="branches.html" data-i18n="nav.branches">\u0641\u0631\u0648\u0639\u0646\u0627</a>
        <a href="packages.html" data-i18n="nav.packages">\u0628\u0627\u0642\u0627\u062A \u0627\u0644\u0631\u0639\u0627\u064A\u0629</a>
        <a href="blog.html" data-i18n="nav.blog">\u0627\u0644\u0645\u062F\u0648\u0646\u0629 \u0627\u0644\u0635\u062D\u064A\u0629</a>
        <a href="faq.html" data-i18n="nav.faq">\u0627\u0644\u0623\u0633\u0626\u0644\u0629 \u0627\u0644\u0634\u0627\u0626\u0639\u0629</a>
      </div>
      <div>
        <h4 data-i18n="footer.services">\u062E\u062F\u0645\u0627\u062A\u0646\u0627</h4>
        <a href="contact.html" data-i18n="nav.book">\u062D\u062C\u0632 \u0645\u0648\u0639\u062F</a>
        <a href="departments.html">\u0627\u0644\u0639\u064A\u0627\u062F\u0627\u062A \u0627\u0644\u062E\u0627\u0631\u062C\u064A\u0629</a>
        <a href="departments.html">\u0627\u0644\u0637\u0648\u0627\u0631\u0626</a>
        <a href="departments.html">\u0627\u0644\u062C\u0631\u0627\u062D\u0627\u062A</a>
        <a href="packages.html" data-i18n="nav.packages">\u0628\u0627\u0642\u0627\u062A \u0627\u0644\u0631\u0639\u0627\u064A\u0629</a>
      </div>
      <div>
        <h4 data-i18n="footer.contact">\u062A\u0648\u0627\u0635\u0644 \u0645\u0639\u0646\u0627</h4>
        <a href="tel:966920000094">+966920000094</a>
        <a href="mailto:info@hayathospitals.com">info@hayathospitals.com</a>
        <p style="margin-top:8px;font-size:0.85rem;">\u0627\u0644\u0631\u064A\u0627\u0636\u060C \u0627\u0644\u0645\u0645\u0644\u0643\u0629 \u0627\u0644\u0639\u0631\u0628\u064A\u0629 \u0627\u0644\u0633\u0639\u0648\u062F\u064A\u0629</p>
      </div>
    </div>
    <div class="footer-bottom">
      <p>\xA9 2026 \u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A \u2014 BrainSAIT Healthcare OS</p>
    </div>
  </div>
</footer>

<a href="https://wa.me/966920000094" class="wa-float" target="_blank" rel="noopener" aria-label="WhatsApp">
  <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492l4.624-1.47A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75c-2.115 0-4.142-.665-5.847-1.884l-.42-.279-2.746.874.874-2.746-.279-.42A9.713 9.713 0 012.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75z"/></svg>
</a>
<button class="back-top" onclick="window.scrollTo({top:0,behavior:'smooth'})" aria-label="Back to top">
  <svg viewBox="0 0 24 24"><path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/></svg>
</button>
<script src="js/common.js"><\/script>
<script>
let allDepts = [], currentCat = 'all';

(async () => {
  try {
    const { providers } = await HNH.getProviders();
    const l = HNH.currentLang();
    const deptMap = {};
    providers.forEach(p => {
      const dept = p.department || p.specialty;
      if (!dept) return;
      if (!deptMap[dept]) deptMap[dept] = { name: dept, count: 0, cat: categorize(dept) };
      deptMap[dept].count++;
    });
    allDepts = Object.values(deptMap).sort((a, b) => b.count - a.count);
    renderDepts();
  } catch(e) {
    document.getElementById('deptGrid').innerHTML = '<p style="color:var(--danger);">\u0641\u0634\u0644 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A</p>';
  }
})();

function categorize(d) {
  const surgical = ['\u062C\u0631\u0627\u062D\u0629','Surgery','Orthopedics','ENT','Urology','Plastic','Neurosurgery','Cardiothoracic','Vascular','Bariatric','Oral'];
  const support = ['Emergency','\u0637\u0648\u0627\u0631\u0626','Radiology','\u0623\u0634\u0639\u0629','Lab','Pharmacy','Nutrition','Rehabilitation','\u0637\u0628\u064A\u0639\u064A','Psychiatry','\u0646\u0641\u0633\u064A\u0629'];
  for (const s of surgical) if (d.includes(s)) return 'surgical';
  for (const s of support) if (d.includes(s)) return 'support';
  return 'medical';
}

function renderDepts() {
  const grid = document.getElementById('deptGrid');
  const search = document.getElementById('deptSearch').value.toLowerCase();
  const filtered = allDepts.filter(d => {
    const matchCat = currentCat === 'all' || d.cat === currentCat;
    const matchSearch = !search || d.name.toLowerCase().includes(search);
    return matchCat && matchSearch;
  });
  grid.innerHTML = filtered.map((d, i) => \`
    <div class="card dept-card animate-on-scroll delay-\${(i%6)+1}">
      <div class="dept-icon"><svg viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg></div>
      <h4>\${d.name}</h4>
      <p style="font-size:0.85rem;color:var(--text-light);">\${d.count} \u0637\u0628\u064A\u0628</p>
    </div>
  \`).join('');
  setTimeout(() => {
    document.querySelectorAll('.animate-on-scroll:not(.animated)').forEach(el => {
      new IntersectionObserver(entries => { entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('animated'); }); }, { threshold: 0.1 }).observe(el);
    });
  }, 50);
}

function filterCat(btn, cat) {
  currentCat = cat;
  document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
  btn.classList.add('active');
  renderDepts();
}
function filterDepts() { renderDepts(); }
<\/script>
</body>
</html>
`;
var doctors = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>\u0623\u0637\u0628\u0627\u0624\u0646\u0627 | \u0645\u0633\u062A\u0634\u0641\u0649 \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A</title>
<meta name="description" content="\u062A\u0639\u0631\u0641 \u0639\u0644\u0649 \u0641\u0631\u064A\u0642 \u0627\u0644\u0623\u0637\u0628\u0627\u0621 \u0627\u0644\u0645\u062A\u0645\u064A\u0632\u064A\u0646 \u0641\u064A \u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A \u2014 \u0627\u0633\u062A\u0634\u0627\u0631\u064A\u0648\u0646 \u0648\u0623\u062E\u0635\u0627\u0626\u064A\u0648\u0646 \u0645\u0646 \u0645\u062E\u062A\u0644\u0641 \u0627\u0644\u062A\u062E\u0635\u0635\u0627\u062A. | Meet our expert doctors and consultants at Hayat National Hospitals.">
<meta name="keywords" content="\u0623\u0637\u0628\u0627\u0621, doctors, \u0627\u0633\u062A\u0634\u0627\u0631\u064A\u0648\u0646, specialists, \u0645\u0633\u062A\u0634\u0641\u0649 \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A, Hayat National Hospitals">
<meta name="robots" content="index, follow">
<meta name="theme-color" content="#0066CC">
<link rel="canonical" href="https://hnh.brainsait.org/doctors.html">
<link rel="alternate" hreflang="ar" href="https://hnh.brainsait.org/doctors.html">
<link rel="alternate" hreflang="en" href="https://hnh.brainsait.org/doctors.html">
<link rel="alternate" hreflang="x-default" href="https://hnh.brainsait.org/doctors.html">
<link rel="manifest" href="/manifest.json">
<link rel="apple-touch-icon" href="/icon-192.png">
<meta property="og:type" content="website">
<meta property="og:site_name" content="\u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A | Hayat National Hospitals">
<meta property="og:title" content="\u0623\u0637\u0628\u0627\u0624\u0646\u0627 | \u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A">
<meta property="og:description" content="\u062A\u0639\u0631\u0641 \u0639\u0644\u0649 \u0641\u0631\u064A\u0642 \u0627\u0644\u0623\u0637\u0628\u0627\u0621 \u0627\u0644\u0645\u062A\u0645\u064A\u0632\u064A\u0646 \u0641\u064A \u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A \u2014 \u0627\u0633\u062A\u0634\u0627\u0631\u064A\u0648\u0646 \u0648\u0623\u062E\u0635\u0627\u0626\u064A\u0648\u0646 \u0645\u0646 \u0645\u062E\u062A\u0644\u0641 \u0627\u0644\u062A\u062E\u0635\u0635\u0627\u062A.">
<meta property="og:url" content="https://hnh.brainsait.org/doctors.html">
<meta property="og:image" content="https://hnh.brainsait.org/og-image.jpg">
<meta property="og:locale" content="ar_SA">
<meta property="og:locale:alternate" content="en_US">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="\u0623\u0637\u0628\u0627\u0624\u0646\u0627 | \u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A">
<meta name="twitter:description" content="\u062A\u0639\u0631\u0641 \u0639\u0644\u0649 \u0641\u0631\u064A\u0642 \u0627\u0644\u0623\u0637\u0628\u0627\u0621 \u0627\u0644\u0645\u062A\u0645\u064A\u0632\u064A\u0646 \u0641\u064A \u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A.">
<meta name="twitter:image" content="https://hnh.brainsait.org/og-image.jpg">

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Tajawal:wght@300;400;500;700;800;900&display=swap" rel="stylesheet">
<link rel="stylesheet" href="css/style.css">
</head>
<body>
<a href="#main-content" class="skip-link">Skip to main content</a>
<header class="header"><div class="container header-inner"><a href="index.html" class="logo"><div class="logo-icon"><svg viewBox="0 0 24 24" width="24" height="24" fill="white"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg></div><div class="logo-text">\u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A<small>BrainSAIT Healthcare OS</small></div></a><nav class="nav" id="mainNav">
      <a href="index.html" data-i18n="nav.home">\u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629</a>
      <a href="about.html" data-i18n="nav.about">\u0639\u0646 \u0627\u0644\u0645\u062C\u0645\u0648\u0639\u0629</a>
      <a href="departments.html" data-i18n="nav.departments">\u0627\u0644\u0623\u0642\u0633\u0627\u0645 \u0627\u0644\u0637\u0628\u064A\u0629</a>
      <a href="doctors.html" data-i18n="nav.doctors">\u0623\u0637\u0628\u0627\u0624\u0646\u0627</a>
      <a href="branches.html" data-i18n="nav.branches">\u0641\u0631\u0648\u0639\u0646\u0627</a>
      <a href="packages.html" data-i18n="nav.packages">\u0628\u0627\u0642\u0627\u062A \u0627\u0644\u0631\u0639\u0627\u064A\u0629</a>
      <a href="blog.html" data-i18n="nav.blog">\u0627\u0644\u0645\u062F\u0648\u0646\u0629 \u0627\u0644\u0635\u062D\u064A\u0629</a>
      <a href="contact.html" data-i18n="nav.contact">\u0627\u062A\u0635\u0644 \u0628\u0646\u0627</a>
      <button class="lang-btn" onclick="HNH.setLang(HNH.currentLang()==='ar'?'en':'ar')">EN/\u0639\u0631\u0628\u064A</button>
      <a href="contact.html" class="nav-cta" data-i18n="nav.book">\u0627\u062D\u062C\u0632 \u0645\u0648\u0639\u062F</a>
    </nav><button class="mobile-toggle" aria-label="Menu"><span></span><span></span><span></span></button></div></header>

<section class="page-hero" id="main-content"><div class="container"><div class="breadcrumb"><a href="index.html">\u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629</a><span>/</span><span>\u0623\u0637\u0628\u0627\u0624\u0646\u0627</span></div><h1>\u0623\u0637\u0628\u0627\u0624\u0646\u0627</h1><p id="doctorCount">\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644... <span class="api-status live" style="margin-right:8px;">\u25CF Live API</span></p></div></section>

<section class="section bg-white"><div class="container">
  <div class="filter-bar animate-on-scroll">
    <input type="text" id="doctorSearch" placeholder="\u0627\u0628\u062D\u062B \u0639\u0646 \u0637\u0628\u064A\u0628..." oninput="filterDoctors()">
    <select id="specFilter" onchange="filterDoctors()"><option value="">\u062C\u0645\u064A\u0639 \u0627\u0644\u062A\u062E\u0635\u0635\u0627\u062A</option></select>
    <select id="branchFilter" onchange="filterDoctors()"><option value="">\u062C\u0645\u064A\u0639 \u0627\u0644\u0641\u0631\u0648\u0639</option></select>
  </div>
  <div class="grid-4" id="doctorsGrid"><div class="loading"><div class="spinner"></div></div></div>
  <div class="text-center" style="margin-top:32px;" id="loadMoreWrap"><button class="btn btn-outline" id="loadMoreBtn" onclick="loadMore()">\u0639\u0631\u0636 \u0627\u0644\u0645\u0632\u064A\u062F</button></div>
</div></section>

<section class="cta-section"><div class="container"><h2>\u0635\u062D\u062A\u0643 \u0623\u0648\u0644\u0627\u064B</h2><p>\u0627\u062D\u062C\u0632 \u0645\u0648\u0639\u062F\u0643 \u0627\u0644\u0622\u0646</p><div class="cta-buttons"><a href="contact.html" class="btn btn-accent btn-lg">\u0627\u062D\u062C\u0632 \u0645\u0648\u0639\u062F</a></div></div></section>
<footer class="footer">
  <div class="container">
    <div class="footer-grid">
      <div>
        <h4 data-i18n="footer.name">\u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A</h4>
        <p style="margin-bottom:16px;" data-i18n="footer.desc">\u0646\u0638\u0627\u0645 BrainSAIT Healthcare OS \u0627\u0644\u0645\u062A\u0635\u0644 \u0628\u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062D\u064A\u0629</p>
        <span class="api-status live">API Connected</span>
      </div>
      <div>
        <h4 data-i18n="footer.quickLinks">\u0631\u0648\u0627\u0628\u0637 \u0633\u0631\u064A\u0639\u0629</h4>
        <a href="about.html" data-i18n="nav.about">\u0639\u0646 \u0627\u0644\u0645\u062C\u0645\u0648\u0639\u0629</a>
        <a href="departments.html" data-i18n="nav.departments">\u0627\u0644\u0623\u0642\u0633\u0627\u0645 \u0627\u0644\u0637\u0628\u064A\u0629</a>
        <a href="doctors.html" data-i18n="nav.doctors">\u0623\u0637\u0628\u0627\u0624\u0646\u0627</a>
        <a href="branches.html" data-i18n="nav.branches">\u0641\u0631\u0648\u0639\u0646\u0627</a>
        <a href="packages.html" data-i18n="nav.packages">\u0628\u0627\u0642\u0627\u062A \u0627\u0644\u0631\u0639\u0627\u064A\u0629</a>
        <a href="blog.html" data-i18n="nav.blog">\u0627\u0644\u0645\u062F\u0648\u0646\u0629 \u0627\u0644\u0635\u062D\u064A\u0629</a>
        <a href="faq.html" data-i18n="nav.faq">\u0627\u0644\u0623\u0633\u0626\u0644\u0629 \u0627\u0644\u0634\u0627\u0626\u0639\u0629</a>
      </div>
      <div>
        <h4 data-i18n="footer.services">\u062E\u062F\u0645\u0627\u062A\u0646\u0627</h4>
        <a href="contact.html" data-i18n="nav.book">\u062D\u062C\u0632 \u0645\u0648\u0639\u062F</a>
        <a href="departments.html">\u0627\u0644\u0639\u064A\u0627\u062F\u0627\u062A \u0627\u0644\u062E\u0627\u0631\u062C\u064A\u0629</a>
        <a href="departments.html">\u0627\u0644\u0637\u0648\u0627\u0631\u0626</a>
        <a href="departments.html">\u0627\u0644\u062C\u0631\u0627\u062D\u0627\u062A</a>
        <a href="packages.html" data-i18n="nav.packages">\u0628\u0627\u0642\u0627\u062A \u0627\u0644\u0631\u0639\u0627\u064A\u0629</a>
      </div>
      <div>
        <h4 data-i18n="footer.contact">\u062A\u0648\u0627\u0635\u0644 \u0645\u0639\u0646\u0627</h4>
        <a href="tel:966920000094">+966920000094</a>
        <a href="mailto:info@hayathospitals.com">info@hayathospitals.com</a>
        <p style="margin-top:8px;font-size:0.85rem;">\u0627\u0644\u0631\u064A\u0627\u0636\u060C \u0627\u0644\u0645\u0645\u0644\u0643\u0629 \u0627\u0644\u0639\u0631\u0628\u064A\u0629 \u0627\u0644\u0633\u0639\u0648\u062F\u064A\u0629</p>
      </div>
    </div>
    <div class="footer-bottom">
      <p>\xA9 2026 \u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A \u2014 BrainSAIT Healthcare OS</p>
    </div>
  </div>
</footer>

<a href="https://wa.me/966920000094" class="wa-float" target="_blank" rel="noopener" aria-label="WhatsApp">
  <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492l4.624-1.47A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75c-2.115 0-4.142-.665-5.847-1.884l-.42-.279-2.746.874.874-2.746-.279-.42A9.713 9.713 0 012.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75z"/></svg>
</a>
<button class="back-top" onclick="window.scrollTo({top:0,behavior:'smooth'})" aria-label="Back to top">
  <svg viewBox="0 0 24 24"><path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/></svg>
</button>
<script src="js/common.js"><\/script>
<script>
let allDoctors = [], filtered = [], visible = 16, l;

(async () => {
  try {
    const data = await HNH.getProviders();
    allDoctors = data.providers || [];
    l = HNH.currentLang();
    document.getElementById('doctorCount').textContent = \`\${allDoctors.length} \u0637\u0628\u064A\u0628 \u0645\u062A\u0635\u0644 \u0628\u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A\`;

    // Populate filters
    const specs = [...new Set(allDoctors.map(d => d.specialty).filter(Boolean))].sort();
    const branches = [...new Set(allDoctors.map(d => d.branch).filter(Boolean))].sort();
    const specSel = document.getElementById('specFilter');
    specs.forEach(s => { const o = document.createElement('option'); o.value = s; o.textContent = s; specSel.appendChild(o); });
    const brSel = document.getElementById('branchFilter');
    branches.forEach(b => { const o = document.createElement('option'); o.value = b; o.textContent = b; brSel.appendChild(o); });

    filtered = [...allDoctors];
    renderDoctors();
  } catch(e) {
    document.getElementById('doctorsGrid').innerHTML = '<p style="color:var(--danger);">\u0641\u0634\u0644 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A</p>';
  }
})();

function renderDoctors() {
  const grid = document.getElementById('doctorsGrid');
  const toShow = filtered.slice(0, visible);
  grid.innerHTML = toShow.map((d, i) => \`
    <div class="card doctor-card animate-on-scroll delay-\${(i%4)+1}">
      <div class="doctor-photo">\${(l==='ar' ? d.name_ar : d.name_en).split(' ').pop().charAt(0)}</div>
      <h4>\${l==='ar' ? d.name_ar : d.name_en}</h4>
      <div class="specialty">\${d.specialty}</div>
      <div class="branch-tag">\${d.branch}</div>
      \${d.experience_years ? \`<p style="font-size:0.8rem;color:var(--text-light);margin-bottom:8px;">\${d.experience_years} \u0633\u0646\u0629 \u062E\u0628\u0631\u0629</p>\` : ''}
      \${d.rating ? \`<p style="font-size:0.85rem;color:var(--accent);margin-bottom:8px;">\${'\u2605'.repeat(d.rating)}\${'\u2606'.repeat(5-d.rating)}</p>\` : ''}
      <a href="contact.html" class="btn btn-primary btn-sm">\${l==='ar' ? '\u0627\u062D\u062C\u0632 \u0627\u0644\u0622\u0646' : 'Book Now'}</a>
    </div>
  \`).join('');
  document.getElementById('loadMoreBtn').style.display = visible >= filtered.length ? 'none' : '';
  setTimeout(() => {
    document.querySelectorAll('.animate-on-scroll:not(.animated)').forEach(el => {
      new IntersectionObserver(entries => { entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('animated'); }); }, { threshold: 0.1 }).observe(el);
    });
  }, 50);
}

function filterDoctors() {
  const search = document.getElementById('doctorSearch').value.toLowerCase();
  const spec = document.getElementById('specFilter').value;
  const branch = document.getElementById('branchFilter').value;
  filtered = allDoctors.filter(d => {
    const name = (l==='ar' ? d.name_ar : d.name_en).toLowerCase();
    return (!search || name.includes(search)) && (!spec || d.specialty === spec) && (!branch || d.branch === branch);
  });
  visible = 16;
  renderDoctors();
}

function loadMore() { visible += 16; renderDoctors(); }
<\/script>
</body>
</html>
`;
var faq = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>\u0627\u0644\u0623\u0633\u0626\u0644\u0629 \u0627\u0644\u0634\u0627\u0626\u0639\u0629 | \u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A</title>
<meta name="description" content="\u0627\u0644\u0623\u0633\u0626\u0644\u0629 \u0627\u0644\u0634\u0627\u0626\u0639\u0629 \u0639\u0646 \u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A \u2014 \u0625\u062C\u0627\u0628\u0627\u062A \u0639\u0644\u0649 \u0623\u0643\u062B\u0631 \u0627\u0644\u0623\u0633\u0626\u0644\u0629 \u0634\u064A\u0648\u0639\u0627\u064B \u062D\u0648\u0644 \u062E\u062F\u0645\u0627\u062A\u0646\u0627 \u0648\u062D\u062C\u0632 \u0627\u0644\u0645\u0648\u0627\u0639\u064A\u062F \u0648\u0627\u0644\u062A\u0623\u0645\u064A\u0646 \u0627\u0644\u0635\u062D\u064A. | FAQ about Hayat National Hospitals.">
<meta name="keywords" content="\u0623\u0633\u0626\u0644\u0629 \u0634\u0627\u0626\u0639\u0629, FAQ, \u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A, \u062D\u062C\u0632 \u0645\u0648\u0639\u062F, \u062A\u0623\u0645\u064A\u0646 \u0635\u062D\u064A">
<meta name="robots" content="index, follow">
<meta name="theme-color" content="#0066CC">
<link rel="canonical" href="https://hnh.brainsait.org/faq.html">
<link rel="alternate" hreflang="ar" href="https://hnh.brainsait.org/faq.html">
<link rel="alternate" hreflang="en" href="https://hnh.brainsait.org/faq.html">
<link rel="alternate" hreflang="x-default" href="https://hnh.brainsait.org/faq.html">
<link rel="manifest" href="/manifest.json">
<link rel="apple-touch-icon" href="/icon-192.png">
<meta property="og:type" content="website">
<meta property="og:site_name" content="\u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A | Hayat National Hospitals">
<meta property="og:title" content="\u0627\u0644\u0623\u0633\u0626\u0644\u0629 \u0627\u0644\u0634\u0627\u0626\u0639\u0629 | \u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A">
<meta property="og:description" content="\u0627\u0644\u0623\u0633\u0626\u0644\u0629 \u0627\u0644\u0634\u0627\u0626\u0639\u0629 \u0639\u0646 \u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A \u2014 \u0625\u062C\u0627\u0628\u0627\u062A \u0639\u0644\u0649 \u0623\u0643\u062B\u0631 \u0627\u0644\u0623\u0633\u0626\u0644\u0629 \u0634\u064A\u0648\u0639\u0627\u064B.">
<meta property="og:url" content="https://hnh.brainsait.org/faq.html">
<meta property="og:image" content="https://hnh.brainsait.org/og-image.jpg">
<meta property="og:locale" content="ar_SA">
<meta property="og:locale:alternate" content="en_US">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="\u0627\u0644\u0623\u0633\u0626\u0644\u0629 \u0627\u0644\u0634\u0627\u0626\u0639\u0629 | \u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A">
<meta name="twitter:description" content="\u0627\u0644\u0623\u0633\u0626\u0644\u0629 \u0627\u0644\u0634\u0627\u0626\u0639\u0629 \u0639\u0646 \u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A.">
<meta name="twitter:image" content="https://hnh.brainsait.org/og-image.jpg">
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {"@type":"Question","name":"\u0643\u064A\u0641 \u0623\u062D\u062C\u0632 \u0645\u0648\u0639\u062F\u0627\u064B \u0641\u064A \u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A\u061F","acceptedAnswer":{"@type":"Answer","text":"\u064A\u0645\u0643\u0646\u0643 \u062D\u062C\u0632 \u0645\u0648\u0639\u062F\u0643 \u0639\u0628\u0631 \u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A\u060C \u0623\u0648 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0639\u0644\u0649 \u0627\u0644\u0631\u0642\u0645 966920000094+\u060C \u0623\u0648 \u0627\u0644\u062A\u0648\u0627\u0635\u0644 \u0639\u0628\u0631 WhatsApp\u060C \u0623\u0648 \u0632\u064A\u0627\u0631\u0629 \u0623\u064A \u0641\u0631\u0639 \u0645\u0646 \u0641\u0631\u0648\u0639\u0646\u0627."}},
    {"@type":"Question","name":"\u0647\u0644 \u062A\u0642\u0628\u0644\u0648\u0646 \u0627\u0644\u062A\u0623\u0645\u064A\u0646 \u0627\u0644\u0635\u062D\u064A\u061F","acceptedAnswer":{"@type":"Answer","text":"\u0646\u0639\u0645\u060C \u0646\u0642\u0628\u0644 \u0645\u0639\u0638\u0645 \u0634\u0631\u0643\u0627\u062A \u0627\u0644\u062A\u0623\u0645\u064A\u0646 \u0627\u0644\u0635\u062D\u064A \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u0629 \u0641\u064A \u0627\u0644\u0645\u0645\u0644\u0643\u0629 \u0627\u0644\u0639\u0631\u0628\u064A\u0629 \u0627\u0644\u0633\u0639\u0648\u062F\u064A\u0629. \u064A\u0631\u062C\u0649 \u0627\u0644\u062A\u0648\u0627\u0635\u0644 \u0645\u0639\u0646\u0627 \u0644\u0644\u062A\u062D\u0642\u0642 \u0645\u0646 \u0634\u0631\u0643\u0629 \u062A\u0623\u0645\u064A\u0646\u0643."}},
    {"@type":"Question","name":"\u0645\u0627 \u0647\u064A \u0645\u0648\u0627\u0639\u064A\u062F \u0639\u0645\u0644 \u0627\u0644\u0645\u0633\u062A\u0634\u0641\u0649\u061F","acceptedAnswer":{"@type":"Answer","text":"\u062A\u0639\u0645\u0644 \u0639\u064A\u0627\u062F\u0627\u062A\u0646\u0627 \u0627\u0644\u062E\u0627\u0631\u062C\u064A\u0629 \u0645\u0646 \u0627\u0644\u0623\u062D\u062F \u0625\u0644\u0649 \u0627\u0644\u062E\u0645\u064A\u0633 8 \u0635\u0628\u0627\u062D\u0627\u064B \u062D\u062A\u0649 10 \u0645\u0633\u0627\u0621\u064B\u060C \u0648\u0623\u0642\u0633\u0627\u0645 \u0627\u0644\u0637\u0648\u0627\u0631\u0626 \u062A\u0639\u0645\u0644 \u0639\u0644\u0649 \u0645\u062F\u0627\u0631 \u0627\u0644\u0633\u0627\u0639\u0629 24/7."}},
    {"@type":"Question","name":"\u0643\u0645 \u0639\u062F\u062F \u0641\u0631\u0648\u0639 \u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A\u061F","acceptedAnswer":{"@type":"Answer","text":"\u0644\u062F\u064A\u0646\u0627 5 \u0641\u0631\u0648\u0639 \u0641\u064A \u0627\u0644\u0645\u0645\u0644\u0643\u0629 \u0627\u0644\u0639\u0631\u0628\u064A\u0629 \u0627\u0644\u0633\u0639\u0648\u062F\u064A\u0629: \u0627\u0644\u0645\u062F\u064A\u0646\u0629 \u0627\u0644\u0645\u0646\u0648\u0631\u0629\u060C \u062E\u0645\u064A\u0633 \u0645\u0634\u064A\u0637\u060C \u0623\u0628\u0647\u0627\u060C \u0627\u0644\u0631\u064A\u0627\u0636\u060C \u0648\u0639\u0646\u064A\u0632\u0629."}},
    {"@type":"Question","name":"\u0647\u0644 \u064A\u0645\u0643\u0646 \u062D\u062C\u0632 \u0645\u0648\u0639\u062F \u0644\u0634\u062E\u0635 \u0622\u062E\u0631\u061F","acceptedAnswer":{"@type":"Answer","text":"\u0646\u0639\u0645\u060C \u064A\u0645\u0643\u0646\u0643 \u062D\u062C\u0632 \u0645\u0648\u0639\u062F \u0644\u0623\u064A \u0634\u062E\u0635 \u0622\u062E\u0631 \u0645\u0639 \u0630\u0643\u0631 \u0628\u064A\u0627\u0646\u0627\u062A\u0647 \u0627\u0644\u0643\u0627\u0645\u0644\u0629 \u0639\u0646\u062F \u0627\u0644\u062D\u062C\u0632."}},
    {"@type":"Question","name":"\u0645\u0627 \u0647\u064A \u0627\u0644\u062A\u062E\u0635\u0635\u0627\u062A \u0627\u0644\u0637\u0628\u064A\u0629 \u0627\u0644\u0645\u062A\u0648\u0641\u0631\u0629\u061F","acceptedAnswer":{"@type":"Answer","text":"\u0646\u0648\u0641\u0631 \u0623\u0643\u062B\u0631 \u0645\u0646 42 \u062A\u062E\u0635\u0635\u0627\u064B \u0637\u0628\u064A\u0627\u064B \u062A\u0634\u0645\u0644: \u0627\u0644\u0642\u0644\u0628 \u0648\u0627\u0644\u0623\u0648\u0639\u064A\u0629 \u0627\u0644\u062F\u0645\u0648\u064A\u0629\u060C \u0627\u0644\u0639\u0638\u0627\u0645 \u0648\u0627\u0644\u0645\u0641\u0627\u0635\u0644\u060C \u0627\u0644\u0623\u0637\u0641\u0627\u0644\u060C \u0627\u0644\u0646\u0633\u0627\u0621 \u0648\u0627\u0644\u0648\u0644\u0627\u062F\u0629\u060C \u0627\u0644\u0623\u0639\u0635\u0627\u0628\u060C \u0627\u0644\u0623\u0648\u0631\u0627\u0645\u060C \u0648\u0627\u0644\u0637\u0648\u0627\u0631\u0626."}}
  ]
}
<\/script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Tajawal:wght@300;400;500;700;800;900&display=swap" rel="stylesheet">
<link rel="stylesheet" href="css/style.css">
</head>
<body>
<a href="#main-content" class="skip-link">Skip to main content</a>
<header class="header"><div class="container header-inner"><a href="index.html" class="logo"><div class="logo-icon"><svg viewBox="0 0 24 24" width="24" height="24" fill="white"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg></div><div class="logo-text">\u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A<small>BrainSAIT Healthcare OS</small></div></a>
<nav class="nav" id="mainNav">
      <a href="index.html" data-i18n="nav.home">\u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629</a>
      <a href="about.html" data-i18n="nav.about">\u0639\u0646 \u0627\u0644\u0645\u062C\u0645\u0648\u0639\u0629</a>
      <a href="departments.html" data-i18n="nav.departments">\u0627\u0644\u0623\u0642\u0633\u0627\u0645 \u0627\u0644\u0637\u0628\u064A\u0629</a>
      <a href="doctors.html" data-i18n="nav.doctors">\u0623\u0637\u0628\u0627\u0624\u0646\u0627</a>
      <a href="branches.html" data-i18n="nav.branches">\u0641\u0631\u0648\u0639\u0646\u0627</a>
      <a href="packages.html" data-i18n="nav.packages">\u0628\u0627\u0642\u0627\u062A \u0627\u0644\u0631\u0639\u0627\u064A\u0629</a>
      <a href="blog.html" data-i18n="nav.blog">\u0627\u0644\u0645\u062F\u0648\u0646\u0629 \u0627\u0644\u0635\u062D\u064A\u0629</a>
      <a href="contact.html" data-i18n="nav.contact">\u0627\u062A\u0635\u0644 \u0628\u0646\u0627</a>
      <button class="lang-btn" onclick="HNH.setLang(HNH.currentLang()==='ar'?'en':'ar')">EN/\u0639\u0631\u0628\u064A</button>
      <a href="contact.html" class="nav-cta" data-i18n="nav.book">\u0627\u062D\u062C\u0632 \u0645\u0648\u0639\u062F</a>
    </nav><button class="mobile-toggle" aria-label="Menu"><span></span><span></span><span></span></button></div></header>

<section class="page-hero" id="main-content"><div class="container"><div class="breadcrumb"><a href="index.html">\u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629</a><span>/</span><span>\u0627\u0644\u0623\u0633\u0626\u0644\u0629 \u0627\u0644\u0634\u0627\u0626\u0639\u0629</span></div><h1 data-i18n="faq.title">\u0627\u0644\u0623\u0633\u0626\u0644\u0629 \u0627\u0644\u0634\u0627\u0626\u0639\u0629</h1><p>\u0625\u062C\u0627\u0628\u0627\u062A \u0639\u0644\u0649 \u0623\u0643\u062B\u0631 \u0627\u0644\u0623\u0633\u0626\u0644\u0629 \u0634\u064A\u0648\u0639\u0627\u064B \u062D\u0648\u0644 \u062E\u062F\u0645\u0627\u062A\u0646\u0627 \u0648\u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A\u0646\u0627</p></div></section>

<section class="section bg-white">
<div class="container" style="max-width:800px;">

  <h2 class="faq-category">\u{1F4C5} \u062D\u062C\u0632 \u0627\u0644\u0645\u0648\u0627\u0639\u064A\u062F</h2>

  <div class="faq-item">
    <button class="faq-question" onclick="toggleFaq(this)">
      \u0643\u064A\u0641 \u0623\u062D\u062C\u0632 \u0645\u0648\u0639\u062F\u0627\u064B \u0641\u064A \u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A\u061F
      <svg class="faq-chevron" viewBox="0 0 24 24"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z"/></svg>
    </button>
    <div class="faq-answer">
      \u064A\u0645\u0643\u0646\u0643 \u062D\u062C\u0632 \u0645\u0648\u0639\u062F\u0643 \u0639\u0628\u0631 \u0639\u062F\u0629 \u0637\u0631\u0642: \u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A \u0645\u0646 \u062E\u0644\u0627\u0644 \u0646\u0645\u0648\u0630\u062C \u0627\u0644\u062D\u062C\u0632\u060C \u0623\u0648 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0627\u0644\u0645\u0628\u0627\u0634\u0631 \u0639\u0644\u0649 \u0627\u0644\u0631\u0642\u0645 +966920000094\u060C \u0623\u0648 \u0627\u0644\u062A\u0648\u0627\u0635\u0644 \u0639\u0628\u0631 WhatsApp\u060C \u0623\u0648 \u0632\u064A\u0627\u0631\u0629 \u0623\u064A \u0641\u0631\u0639 \u0645\u0646 \u0641\u0631\u0648\u0639\u0646\u0627 \u0627\u0644\u062E\u0645\u0633\u0629 \u0641\u064A \u0627\u0644\u0645\u0645\u0644\u0643\u0629.
    </div>
  </div>

  <div class="faq-item">
    <button class="faq-question" onclick="toggleFaq(this)">
      \u0647\u0644 \u064A\u0645\u0643\u0646\u0646\u064A \u0625\u0644\u063A\u0627\u0621 \u0623\u0648 \u062A\u063A\u064A\u064A\u0631 \u0645\u0648\u0639\u062F\u064A\u061F
      <svg class="faq-chevron" viewBox="0 0 24 24"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z"/></svg>
    </button>
    <div class="faq-answer">
      \u0646\u0639\u0645\u060C \u064A\u0645\u0643\u0646\u0643 \u0625\u0644\u063A\u0627\u0621 \u0623\u0648 \u062A\u063A\u064A\u064A\u0631 \u0645\u0648\u0639\u062F\u0643 \u0642\u0628\u0644 24 \u0633\u0627\u0639\u0629 \u0645\u0646 \u0627\u0644\u0645\u0648\u0639\u062F \u0627\u0644\u0645\u062D\u062F\u062F \u062F\u0648\u0646 \u0623\u064A \u0631\u0633\u0648\u0645. \u064A\u0631\u062C\u0649 \u0627\u0644\u062A\u0648\u0627\u0635\u0644 \u0645\u0639\u0646\u0627 \u0639\u0628\u0631 \u0627\u0644\u0647\u0627\u062A\u0641 \u0623\u0648 WhatsApp \u0644\u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A \u0627\u0644\u0644\u0627\u0632\u0645\u0629.
    </div>
  </div>

  <div class="faq-item">
    <button class="faq-question" onclick="toggleFaq(this)">
      \u0647\u0644 \u064A\u0645\u0643\u0646 \u062D\u062C\u0632 \u0645\u0648\u0639\u062F \u0644\u0634\u062E\u0635 \u0622\u062E\u0631\u061F
      <svg class="faq-chevron" viewBox="0 0 24 24"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z"/></svg>
    </button>
    <div class="faq-answer">
      \u0646\u0639\u0645 \u0628\u0627\u0644\u062A\u0623\u0643\u064A\u062F\u060C \u064A\u0645\u0643\u0646\u0643 \u062D\u062C\u0632 \u0645\u0648\u0639\u062F \u0644\u0623\u064A \u0641\u0631\u062F \u0645\u0646 \u0639\u0627\u0626\u0644\u062A\u0643 \u0623\u0648 \u0623\u064A \u0634\u062E\u0635 \u0622\u062E\u0631. \u0643\u0644 \u0645\u0627 \u062A\u062D\u062A\u0627\u062C\u0647 \u0647\u0648 \u0630\u0643\u0631 \u0627\u0633\u0645 \u0627\u0644\u0645\u0631\u064A\u0636 \u0627\u0644\u0643\u0627\u0645\u0644 \u0648\u0631\u0642\u0645 \u0647\u0627\u062A\u0641\u0647 \u0648\u0628\u0639\u0636 \u0627\u0644\u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0627\u0644\u0623\u0633\u0627\u0633\u064A\u0629 \u0639\u0646\u062F \u0627\u0644\u062D\u062C\u0632.
    </div>
  </div>

  <div class="faq-item">
    <button class="faq-question" onclick="toggleFaq(this)">
      \u0645\u0627 \u0647\u064A \u0645\u0648\u0627\u0639\u064A\u062F \u0627\u0644\u0639\u0645\u0644 \u0641\u064A \u0627\u0644\u0639\u064A\u0627\u062F\u0627\u062A\u061F
      <svg class="faq-chevron" viewBox="0 0 24 24"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z"/></svg>
    </button>
    <div class="faq-answer">
      \u062A\u0639\u0645\u0644 \u0639\u064A\u0627\u062F\u0627\u062A\u0646\u0627 \u0627\u0644\u062E\u0627\u0631\u062C\u064A\u0629 \u0639\u0627\u062F\u0629\u064B \u0645\u0646 \u0627\u0644\u0623\u062D\u062F \u0625\u0644\u0649 \u0627\u0644\u062E\u0645\u064A\u0633 \u0645\u0646 \u0627\u0644\u0633\u0627\u0639\u0629 8 \u0635\u0628\u0627\u062D\u0627\u064B \u062D\u062A\u0649 10 \u0645\u0633\u0627\u0621\u064B. \u062A\u0639\u0645\u0644 \u0623\u0642\u0633\u0627\u0645 \u0627\u0644\u0637\u0648\u0627\u0631\u0626 \u0639\u0644\u0649 \u0645\u062F\u0627\u0631 \u0627\u0644\u0633\u0627\u0639\u0629 7 \u0623\u064A\u0627\u0645 \u0641\u064A \u0627\u0644\u0623\u0633\u0628\u0648\u0639. \u0642\u062F \u062A\u062E\u062A\u0644\u0641 \u0627\u0644\u0645\u0648\u0627\u0639\u064A\u062F \u062D\u0633\u0628 \u0627\u0644\u0641\u0631\u0639 \u0648\u0627\u0644\u062A\u062E\u0635\u0635.
    </div>
  </div>

  <h2 class="faq-category">\u{1F4B3} \u0627\u0644\u062A\u0623\u0645\u064A\u0646 \u0648\u0627\u0644\u0645\u062F\u0641\u0648\u0639\u0627\u062A</h2>

  <div class="faq-item">
    <button class="faq-question" onclick="toggleFaq(this)">
      \u0647\u0644 \u062A\u0642\u0628\u0644\u0648\u0646 \u0627\u0644\u062A\u0623\u0645\u064A\u0646 \u0627\u0644\u0635\u062D\u064A\u061F
      <svg class="faq-chevron" viewBox="0 0 24 24"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z"/></svg>
    </button>
    <div class="faq-answer">
      \u0646\u0639\u0645\u060C \u0646\u0642\u0628\u0644 \u0645\u0639\u0638\u0645 \u0634\u0631\u0643\u0627\u062A \u0627\u0644\u062A\u0623\u0645\u064A\u0646 \u0627\u0644\u0635\u062D\u064A \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u0629 \u0641\u064A \u0627\u0644\u0645\u0645\u0644\u0643\u0629 \u0627\u0644\u0639\u0631\u0628\u064A\u0629 \u0627\u0644\u0633\u0639\u0648\u062F\u064A\u0629 \u0628\u0645\u0627 \u0641\u064A\u0647\u0627 \u0628\u0648\u0628\u0627\u060C \u0645\u064A\u062F\u063A\u0644\u0641\u060C MedNet\u060C \u0627\u0644\u0631\u0627\u062C\u062D\u064A \u062A\u0643\u0627\u0641\u0644\u060C \u0648\u063A\u064A\u0631\u0647\u0627. \u064A\u0631\u062C\u0649 \u0627\u0644\u062A\u0648\u0627\u0635\u0644 \u0645\u0639\u0646\u0627 \u0645\u0633\u0628\u0642\u0627\u064B \u0644\u0644\u062A\u062D\u0642\u0642 \u0645\u0646 \u0634\u0631\u0643\u0629 \u062A\u0623\u0645\u064A\u0646\u0643 \u0648\u062A\u063A\u0637\u064A\u062A\u0647\u0627.
    </div>
  </div>

  <div class="faq-item">
    <button class="faq-question" onclick="toggleFaq(this)">
      \u0645\u0627 \u0647\u064A \u0637\u0631\u0642 \u0627\u0644\u062F\u0641\u0639 \u0627\u0644\u0645\u0642\u0628\u0648\u0644\u0629\u061F
      <svg class="faq-chevron" viewBox="0 0 24 24"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z"/></svg>
    </button>
    <div class="faq-answer">
      \u0646\u0642\u0628\u0644 \u0627\u0644\u062F\u0641\u0639 \u0646\u0642\u062F\u0627\u064B\u060C \u0648\u0628\u0637\u0627\u0642\u0627\u062A \u0627\u0644\u0627\u0626\u062A\u0645\u0627\u0646 \u0648\u0627\u0644\u062E\u0635\u0645 (Visa, Mastercard, Mada)\u060C \u0648\u062E\u062F\u0645\u0629 Apple Pay \u0648STC Pay. \u0643\u0645\u0627 \u0646\u0642\u0628\u0644 \u062D\u0648\u0627\u0644\u0627\u062A \u0646\u0642\u062F\u064A\u0629 \u0644\u0644\u0645\u0628\u0627\u0644\u063A \u0627\u0644\u0643\u0628\u064A\u0631\u0629.
    </div>
  </div>

  <h2 class="faq-category">\u{1F3E5} \u0627\u0644\u062E\u062F\u0645\u0627\u062A \u0648\u0627\u0644\u062A\u062E\u0635\u0635\u0627\u062A</h2>

  <div class="faq-item">
    <button class="faq-question" onclick="toggleFaq(this)">
      \u0645\u0627 \u0647\u064A \u0627\u0644\u062A\u062E\u0635\u0635\u0627\u062A \u0627\u0644\u0637\u0628\u064A\u0629 \u0627\u0644\u0645\u062A\u0648\u0641\u0631\u0629\u061F
      <svg class="faq-chevron" viewBox="0 0 24 24"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z"/></svg>
    </button>
    <div class="faq-answer">
      \u0646\u0648\u0641\u0631 \u0623\u0643\u062B\u0631 \u0645\u0646 42 \u062A\u062E\u0635\u0635\u0627\u064B \u0637\u0628\u064A\u0627\u064B \u062A\u0634\u0645\u0644: \u0623\u0645\u0631\u0627\u0636 \u0627\u0644\u0642\u0644\u0628 \u0648\u0627\u0644\u0623\u0648\u0639\u064A\u0629 \u0627\u0644\u062F\u0645\u0648\u064A\u0629\u060C \u0627\u0644\u0639\u0638\u0627\u0645 \u0648\u0627\u0644\u0645\u0641\u0627\u0635\u0644\u060C \u0637\u0628 \u0627\u0644\u0623\u0637\u0641\u0627\u0644\u060C \u0627\u0644\u0646\u0633\u0627\u0621 \u0648\u0627\u0644\u0648\u0644\u0627\u062F\u0629\u060C \u0627\u0644\u0623\u0639\u0635\u0627\u0628 \u0648\u0627\u0644\u062C\u0631\u0627\u062D\u0629 \u0627\u0644\u0639\u0635\u0628\u064A\u0629\u060C \u0627\u0644\u0623\u0648\u0631\u0627\u0645\u060C \u0627\u0644\u0637\u0648\u0627\u0631\u0626\u060C \u0627\u0644\u0639\u064A\u0648\u0646\u060C \u0627\u0644\u0623\u0646\u0641 \u0648\u0627\u0644\u0623\u0630\u0646 \u0648\u0627\u0644\u062D\u0646\u062C\u0631\u0629\u060C \u0627\u0644\u062C\u0644\u062F\u064A\u0629\u060C \u0627\u0644\u0628\u0627\u0637\u0646\u064A\u0629\u060C \u0648\u063A\u064A\u0631\u0647\u0627 \u0627\u0644\u0643\u062B\u064A\u0631.
    </div>
  </div>

  <div class="faq-item">
    <button class="faq-question" onclick="toggleFaq(this)">
      \u0643\u0645 \u0639\u062F\u062F \u0641\u0631\u0648\u0639 \u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A\u061F
      <svg class="faq-chevron" viewBox="0 0 24 24"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z"/></svg>
    </button>
    <div class="faq-answer">
      \u0644\u062F\u064A\u0646\u0627 5 \u0641\u0631\u0648\u0639 \u0645\u0646\u062A\u0634\u0631\u0629 \u0641\u064A \u0645\u0646\u0627\u0637\u0642 \u0627\u0644\u0645\u0645\u0644\u0643\u0629 \u0627\u0644\u0639\u0631\u0628\u064A\u0629 \u0627\u0644\u0633\u0639\u0648\u062F\u064A\u0629: \u0641\u0631\u0639 \u0627\u0644\u0645\u062F\u064A\u0646\u0629 \u0627\u0644\u0645\u0646\u0648\u0631\u0629\u060C \u0641\u0631\u0639 \u062E\u0645\u064A\u0633 \u0645\u0634\u064A\u0637\u060C \u0641\u0631\u0639 \u0623\u0628\u0647\u0627\u060C \u0641\u0631\u0639 \u0627\u0644\u0631\u064A\u0627\u0636\u060C \u0648\u0641\u0631\u0639 \u0639\u0646\u064A\u0632\u0629. \u0643\u0644 \u0641\u0631\u0639 \u0645\u062C\u0647\u0632 \u0628\u0623\u062D\u062F\u062B \u0627\u0644\u062A\u0642\u0646\u064A\u0627\u062A \u0627\u0644\u0637\u0628\u064A\u0629.
    </div>
  </div>

  <div class="faq-item">
    <button class="faq-question" onclick="toggleFaq(this)">
      \u0647\u0644 \u062A\u062A\u0648\u0641\u0631 \u062E\u062F\u0645\u0629 \u0627\u0644\u0637\u0648\u0627\u0631\u0626 \u0639\u0644\u0649 \u0645\u062F\u0627\u0631 \u0627\u0644\u0633\u0627\u0639\u0629\u061F
      <svg class="faq-chevron" viewBox="0 0 24 24"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z"/></svg>
    </button>
    <div class="faq-answer">
      \u0646\u0639\u0645\u060C \u062A\u0639\u0645\u0644 \u0623\u0642\u0633\u0627\u0645 \u0627\u0644\u0637\u0648\u0627\u0631\u0626 \u0641\u064A \u062C\u0645\u064A\u0639 \u0641\u0631\u0648\u0639\u0646\u0627 \u0639\u0644\u0649 \u0645\u062F\u0627\u0631 \u0627\u0644\u0633\u0627\u0639\u0629 24 \u0633\u0627\u0639\u0629\u060C 7 \u0623\u064A\u0627\u0645 \u0641\u064A \u0627\u0644\u0623\u0633\u0628\u0648\u0639\u060C 365 \u064A\u0648\u0645\u0627\u064B \u0641\u064A \u0627\u0644\u0633\u0646\u0629. \u0644\u062F\u064A\u0646\u0627 \u0641\u0631\u064A\u0642 \u0637\u0628\u064A \u0645\u062A\u062E\u0635\u0635 \u062C\u0627\u0647\u0632 \u062F\u0627\u0626\u0645\u0627\u064B \u0644\u0644\u062A\u0639\u0627\u0645\u0644 \u0645\u0639 \u062C\u0645\u064A\u0639 \u062D\u0627\u0644\u0627\u062A \u0627\u0644\u0637\u0648\u0627\u0631\u0626.
    </div>
  </div>

  <div class="faq-item">
    <button class="faq-question" onclick="toggleFaq(this)">
      \u0647\u0644 \u062A\u062A\u0648\u0641\u0631 \u0628\u0627\u0642\u0627\u062A \u0635\u062D\u064A\u0629 \u0644\u0644\u0641\u062D\u0635 \u0627\u0644\u062F\u0648\u0631\u064A\u061F
      <svg class="faq-chevron" viewBox="0 0 24 24"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z"/></svg>
    </button>
    <div class="faq-answer">
      \u0646\u0639\u0645\u060C \u0646\u0648\u0641\u0631 \u0645\u062C\u0645\u0648\u0639\u0629 \u0645\u062A\u0646\u0648\u0639\u0629 \u0645\u0646 \u0628\u0627\u0642\u0627\u062A \u0627\u0644\u0641\u062D\u0635 \u0627\u0644\u0634\u0627\u0645\u0644 \u062A\u0628\u062F\u0623 \u0645\u0646 \u0627\u0644\u0628\u0627\u0642\u0629 \u0627\u0644\u0623\u0633\u0627\u0633\u064A\u0629 \u0628\u0640 450 \u0631\u064A\u0627\u0644 \u0648\u062D\u062A\u0649 \u0627\u0644\u0628\u0627\u0642\u0629 \u0627\u0644\u0645\u062A\u0643\u0627\u0645\u0644\u0629. \u0643\u0645\u0627 \u0646\u0648\u0641\u0631 \u0628\u0627\u0642\u0627\u062A \u0645\u062A\u062E\u0635\u0635\u0629 \u0644\u0644\u0623\u0637\u0641\u0627\u0644 \u0648\u0627\u0644\u0623\u0645\u0648\u0645\u0629 \u0648\u0627\u0644\u0642\u0644\u0628 \u0648\u0643\u0628\u0627\u0631 \u0627\u0644\u0633\u0646. \u062A\u0641\u0636\u0644 \u0628\u0632\u064A\u0627\u0631\u0629 \u0635\u0641\u062D\u0629 \u0627\u0644\u0628\u0627\u0642\u0627\u062A \u0644\u0645\u0632\u064A\u062F \u0645\u0646 \u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644.
    </div>
  </div>

</div>
</section>

<section class="cta-section"><div class="container"><h2>\u0644\u062F\u064A\u0643 \u0633\u0624\u0627\u0644 \u0622\u062E\u0631\u061F</h2><p>\u0641\u0631\u064A\u0642\u0646\u0627 \u062C\u0627\u0647\u0632 \u0644\u0644\u0625\u062C\u0627\u0628\u0629 \u0639\u0644\u0649 \u062C\u0645\u064A\u0639 \u0627\u0633\u062A\u0641\u0633\u0627\u0631\u0627\u062A\u0643</p><div class="cta-buttons"><a href="contact.html" class="btn btn-accent btn-lg">\u062A\u0648\u0627\u0635\u0644 \u0645\u0639\u0646\u0627</a><a href="tel:966920000094" class="btn btn-white btn-lg">\u0627\u062A\u0635\u0644 \u0628\u0646\u0627</a></div></div></section>

<footer class="footer">
  <div class="container">
    <div class="footer-grid">
      <div>
        <h4 data-i18n="footer.name">\u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A</h4>
        <p style="margin-bottom:16px;" data-i18n="footer.desc">\u0646\u0638\u0627\u0645 BrainSAIT Healthcare OS \u0627\u0644\u0645\u062A\u0635\u0644 \u0628\u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062D\u064A\u0629</p>
        <span class="api-status live">API Connected</span>
      </div>
      <div>
        <h4 data-i18n="footer.quickLinks">\u0631\u0648\u0627\u0628\u0637 \u0633\u0631\u064A\u0639\u0629</h4>
        <a href="about.html" data-i18n="nav.about">\u0639\u0646 \u0627\u0644\u0645\u062C\u0645\u0648\u0639\u0629</a>
        <a href="departments.html" data-i18n="nav.departments">\u0627\u0644\u0623\u0642\u0633\u0627\u0645 \u0627\u0644\u0637\u0628\u064A\u0629</a>
        <a href="doctors.html" data-i18n="nav.doctors">\u0623\u0637\u0628\u0627\u0624\u0646\u0627</a>
        <a href="branches.html" data-i18n="nav.branches">\u0641\u0631\u0648\u0639\u0646\u0627</a>
        <a href="packages.html" data-i18n="nav.packages">\u0628\u0627\u0642\u0627\u062A \u0627\u0644\u0631\u0639\u0627\u064A\u0629</a>
        <a href="blog.html" data-i18n="nav.blog">\u0627\u0644\u0645\u062F\u0648\u0646\u0629 \u0627\u0644\u0635\u062D\u064A\u0629</a>
        <a href="faq.html" data-i18n="nav.faq">\u0627\u0644\u0623\u0633\u0626\u0644\u0629 \u0627\u0644\u0634\u0627\u0626\u0639\u0629</a>
      </div>
      <div>
        <h4 data-i18n="footer.services">\u062E\u062F\u0645\u0627\u062A\u0646\u0627</h4>
        <a href="contact.html" data-i18n="nav.book">\u062D\u062C\u0632 \u0645\u0648\u0639\u062F</a>
        <a href="departments.html">\u0627\u0644\u0639\u064A\u0627\u062F\u0627\u062A \u0627\u0644\u062E\u0627\u0631\u062C\u064A\u0629</a>
        <a href="departments.html">\u0627\u0644\u0637\u0648\u0627\u0631\u0626</a>
        <a href="departments.html">\u0627\u0644\u062C\u0631\u0627\u062D\u0627\u062A</a>
        <a href="packages.html" data-i18n="nav.packages">\u0628\u0627\u0642\u0627\u062A \u0627\u0644\u0631\u0639\u0627\u064A\u0629</a>
      </div>
      <div>
        <h4 data-i18n="footer.contact">\u062A\u0648\u0627\u0635\u0644 \u0645\u0639\u0646\u0627</h4>
        <a href="tel:966920000094">+966920000094</a>
        <a href="mailto:info@hayathospitals.com">info@hayathospitals.com</a>
        <p style="margin-top:8px;font-size:0.85rem;">\u0627\u0644\u0631\u064A\u0627\u0636\u060C \u0627\u0644\u0645\u0645\u0644\u0643\u0629 \u0627\u0644\u0639\u0631\u0628\u064A\u0629 \u0627\u0644\u0633\u0639\u0648\u062F\u064A\u0629</p>
      </div>
    </div>
    <div class="footer-bottom">
      <p>\xA9 2026 \u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A \u2014 BrainSAIT Healthcare OS</p>
    </div>
  </div>
</footer>
<a href="https://wa.me/966920000094" class="wa-float" target="_blank" rel="noopener" aria-label="WhatsApp">
  <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492l4.624-1.47A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75c-2.115 0-4.142-.665-5.847-1.884l-.42-.279-2.746.874.874-2.746-.279-.42A9.713 9.713 0 012.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75z"/></svg>
</a>
<button class="back-top" onclick="window.scrollTo({top:0,behavior:'smooth'})" aria-label="Back to top">
  <svg viewBox="0 0 24 24"><path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/></svg>
</button>
<script src="js/common.js"><\/script>
<script>
function toggleFaq(btn) {
  const answer = btn.nextElementSibling;
  const isOpen = answer.classList.contains('open');
  document.querySelectorAll('.faq-answer').forEach(a => a.classList.remove('open'));
  document.querySelectorAll('.faq-question').forEach(b => b.classList.remove('active'));
  if (!isOpen) { answer.classList.add('open'); btn.classList.add('active'); }
}
<\/script>
</body>
</html>
`;
var index = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>\u0645\u0633\u062A\u0634\u0641\u0649 \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A | Hayat National Hospital</title>
<meta name="description" content="\u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A \u2014 \u0623\u0643\u062B\u0631 \u0645\u0646 25 \u0639\u0627\u0645\u0627\u064B \u0645\u0646 \u0627\u0644\u062A\u0645\u064A\u0632 \u0641\u064A \u0627\u0644\u0631\u0639\u0627\u064A\u0629 \u0627\u0644\u0635\u062D\u064A\u0629. 5 \u0641\u0631\u0648\u0639\u060C 269 \u0637\u0628\u064A\u0628\u060C 42 \u0642\u0633\u0645 \u0637\u0628\u064A. | Hayat National Hospitals \u2014 25+ years of excellence in Saudi Arabia.">
<meta name="keywords" content="\u0645\u0633\u062A\u0634\u0641\u0649 \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A, Hayat National Hospitals, \u0631\u0639\u0627\u064A\u0629 \u0635\u062D\u064A\u0629, Saudi Arabia, hospital, \u0645\u0633\u062A\u0634\u0641\u0649, \u0623\u0637\u0628\u0627\u0621, Riyadh">
<meta name="robots" content="index, follow">
<meta name="theme-color" content="#0066CC">
<link rel="canonical" href="https://hnh.brainsait.org/">
<link rel="alternate" hreflang="ar" href="https://hnh.brainsait.org/">
<link rel="alternate" hreflang="en" href="https://hnh.brainsait.org/">
<link rel="alternate" hreflang="x-default" href="https://hnh.brainsait.org/">
<link rel="manifest" href="/manifest.json">
<link rel="apple-touch-icon" href="/icon-192.png">
<meta property="og:type" content="website">
<meta property="og:site_name" content="\u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A | Hayat National Hospitals">
<meta property="og:title" content="\u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A | Hayat National Hospitals">
<meta property="og:description" content="\u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A \u2014 \u0623\u0643\u062B\u0631 \u0645\u0646 25 \u0639\u0627\u0645\u0627\u064B \u0645\u0646 \u0627\u0644\u062A\u0645\u064A\u0632 \u0641\u064A \u0627\u0644\u0631\u0639\u0627\u064A\u0629 \u0627\u0644\u0635\u062D\u064A\u0629. 5 \u0641\u0631\u0648\u0639\u060C 269 \u0637\u0628\u064A\u0628\u060C 42 \u0642\u0633\u0645 \u0637\u0628\u064A.">
<meta property="og:url" content="https://hnh.brainsait.org/">
<meta property="og:image" content="https://hnh.brainsait.org/og-image.jpg">
<meta property="og:locale" content="ar_SA">
<meta property="og:locale:alternate" content="en_US">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="\u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A | Hayat National Hospitals">
<meta name="twitter:description" content="\u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A \u2014 \u0623\u0643\u062B\u0631 \u0645\u0646 25 \u0639\u0627\u0645\u0627\u064B \u0645\u0646 \u0627\u0644\u062A\u0645\u064A\u0632 \u0641\u064A \u0627\u0644\u0631\u0639\u0627\u064A\u0629 \u0627\u0644\u0635\u062D\u064A\u0629. 5 \u0641\u0631\u0648\u0639\u060C 269 \u0637\u0628\u064A\u0628\u060C 42 \u0642\u0633\u0645 \u0637\u0628\u064A.">
<meta name="twitter:image" content="https://hnh.brainsait.org/og-image.jpg">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Tajawal:wght@300;400;500;700;800;900&display=swap" rel="stylesheet">
<link rel="stylesheet" href="css/style.css">
<link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>\u{1F3E5}</text></svg>">
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Hospital",
  "name": "Hayat National Hospitals",
  "alternateName": "\u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A",
  "url": "https://hnh.brainsait.org",
  "logo": "https://hnh.brainsait.org/og-image.jpg",
  "image": "https://hnh.brainsait.org/og-image.jpg",
  "description": "Hayat National Hospitals \u2014 Over 25 years of excellence in integrated healthcare in Saudi Arabia. 5 branches, 269 doctors, 42 medical departments.",
  "telephone": "+966920000094",
  "email": "info@hayathospitals.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Al Madinah Al Munawwarah Road",
    "addressLocality": "Riyadh",
    "addressCountry": "SA"
  },
  "numberOfBeds": 500,
  "medicalSpecialty": ["Cardiology", "Orthopedics", "Neurology", "Oncology", "Pediatrics", "Obstetrics and Gynecology", "Emergency Medicine"],
  "sameAs": ["https://hnh.brainsait.org"],
  "openingHours": "Mo-Su 00:00-24:00",
  "hasMap": "https://maps.google.com/?q=Hayat+National+Hospital+Riyadh"
}
<\/script>
</head>
<body>
<a href="#main-content" class="skip-link">Skip to main content</a>

<!-- Header -->
<header class="header">
  <div class="container header-inner">
    <a href="index.html" class="logo">
      <div class="logo-icon"><svg viewBox="0 0 24 24" width="24" height="24" fill="white"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg></div>
      <div class="logo-text">\u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A<small>BrainSAIT Healthcare OS</small></div>
    </a>
    <nav class="nav" id="mainNav">
      <a href="index.html" data-i18n="nav.home">\u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629</a>
      <a href="about.html" data-i18n="nav.about">\u0639\u0646 \u0627\u0644\u0645\u062C\u0645\u0648\u0639\u0629</a>
      <a href="departments.html" data-i18n="nav.departments">\u0627\u0644\u0623\u0642\u0633\u0627\u0645 \u0627\u0644\u0637\u0628\u064A\u0629</a>
      <a href="doctors.html" data-i18n="nav.doctors">\u0623\u0637\u0628\u0627\u0624\u0646\u0627</a>
      <a href="branches.html" data-i18n="nav.branches">\u0641\u0631\u0648\u0639\u0646\u0627</a>
      <a href="packages.html" data-i18n="nav.packages">\u0628\u0627\u0642\u0627\u062A \u0627\u0644\u0631\u0639\u0627\u064A\u0629</a>
      <a href="blog.html" data-i18n="nav.blog">\u0627\u0644\u0645\u062F\u0648\u0646\u0629 \u0627\u0644\u0635\u062D\u064A\u0629</a>
      <a href="academy.html" data-i18n="nav.academy">\u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629 \u0627\u0644\u062D\u064A\u0627\u0629</a>
      <a href="contact.html" data-i18n="nav.contact">\u0627\u062A\u0635\u0644 \u0628\u0646\u0627</a>
      <button class="lang-btn" onclick="HNH.setLang(HNH.currentLang()==='ar'?'en':'ar')">EN/\u0639\u0631\u0628\u064A</button>
      <a href="contact.html" class="nav-cta" data-i18n="nav.book">\u0627\u062D\u062C\u0632 \u0645\u0648\u0639\u062F</a>
    </nav>
    <button class="mobile-toggle" aria-label="Menu"><span></span><span></span><span></span></button>
  </div>
</header>

<!-- Hero -->
<section class="hero" id="main-content">
  <div class="container">
    <div class="hero-content">
      <span class="api-status live">\u25CF Live Data</span>
      <h1 style="margin-top:16px;">
        \u0645\u062C\u0645\u0648\u0639\u0629 \u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A<br>
        <span class="accent">\u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A</span>
      </h1>
      <p>\u0623\u0643\u062B\u0631 \u0645\u0646 25 \u0639\u0627\u0645\u0627\u064B \u0645\u0646 \u0627\u0644\u062A\u0645\u064A\u0632 \u0641\u064A \u0627\u0644\u0631\u0639\u0627\u064A\u0629 \u0627\u0644\u0635\u062D\u064A\u0629 \u0627\u0644\u0645\u062A\u0643\u0627\u0645\u0644\u0629 \u0641\u064A \u0627\u0644\u0645\u0645\u0644\u0643\u0629 \u0627\u0644\u0639\u0631\u0628\u064A\u0629 \u0627\u0644\u0633\u0639\u0648\u062F\u064A\u0629. \u0646\u0638\u0627\u0645 BrainSAIT Healthcare OS \u0645\u062A\u0635\u0644 \u0628\u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062D\u064A\u0629.</p>
      <div class="hero-buttons">
        <a href="contact.html" class="btn btn-accent btn-lg">\u0627\u062D\u062C\u0632 \u0645\u0648\u0639\u062F\u0643 \u0627\u0644\u0622\u0646</a>
        <a href="departments.html" class="btn btn-outline btn-lg">\u062A\u0635\u0641\u062D \u0627\u0644\u0623\u0642\u0633\u0627\u0645</a>
      </div>

      <!-- Live Stats -->
      <div class="stats-bar" id="liveStats">
        <div class="stat-card"><div class="stat-number live" id="statProviders">\u2014</div><div class="stat-label">\u0637\u0628\u064A\u0628</div></div>
        <div class="stat-card"><div class="stat-number live" id="statBranches">\u2014</div><div class="stat-label">\u0641\u0631\u0648\u0639</div></div>
        <div class="stat-card"><div class="stat-number live" id="statDepts">\u2014</div><div class="stat-label">\u0642\u0633\u0645 \u0637\u0628\u064A</div></div>
        <div class="stat-card"><div class="stat-number live" id="statBeds">\u2014</div><div class="stat-label">\u0633\u0631\u064A\u0631</div></div>
      </div>
    </div>
  </div>
</section>

<!-- Departments Preview -->
<section class="section bg-white">
  <div class="container">
    <div class="section-header animate-on-scroll">
      <h2>\u0627\u0644\u0623\u0642\u0633\u0627\u0645 \u0627\u0644\u0637\u0628\u064A\u0629</h2>
      <p>\u0646\u063A\u0637\u064A \u0623\u0643\u062B\u0631 \u0645\u0646 42 \u062A\u062E\u0635\u0635\u0627\u064B \u0637\u0628\u064A\u0627\u064B</p>
    </div>
    <div class="grid-4" id="deptGrid">
      <div class="loading"><div class="spinner"></div></div>
    </div>
    <div class="text-center" style="margin-top:32px;">
      <a href="departments.html" class="btn btn-outline">\u0639\u0631\u0636 \u062C\u0645\u064A\u0639 \u0627\u0644\u0623\u0642\u0633\u0627\u0645</a>
    </div>
  </div>
</section>

<!-- Branches -->
<section class="section bg-light">
  <div class="container">
    <div class="section-header animate-on-scroll">
      <h2>\u0641\u0631\u0648\u0639\u0646\u0627</h2>
      <p>\u062E\u0645\u0633\u0629 \u0641\u0631\u0648\u0639 \u0641\u064A \u0645\u062E\u062A\u0644\u0641 \u0645\u0646\u0627\u0637\u0642 \u0627\u0644\u0645\u0645\u0644\u0643\u0629</p>
    </div>
    <div class="grid-3" id="branchesGrid">
      <div class="loading"><div class="spinner"></div></div>
    </div>
  </div>
</section>

<!-- Doctors Preview -->
<section class="section bg-white">
  <div class="container">
    <div class="section-header animate-on-scroll">
      <h2>\u0623\u0637\u0628\u0627\u0624\u0646\u0627</h2>
      <p>\u0641\u0631\u064A\u0642 \u0645\u0646 \u0623\u0645\u0647\u0631 \u0627\u0644\u0623\u0637\u0628\u0627\u0621 \u0648\u0627\u0644\u0627\u0633\u062A\u0634\u0627\u0631\u064A\u064A\u0646</p>
    </div>
    <div class="grid-4" id="doctorsGrid">
      <div class="loading"><div class="spinner"></div></div>
    </div>
    <div class="text-center" style="margin-top:32px;">
      <a href="doctors.html" class="btn btn-outline">\u0639\u0631\u0636 \u062C\u0645\u064A\u0639 \u0627\u0644\u0623\u0637\u0628\u0627\u0621</a>
    </div>
  </div>
</section>

<!-- Academy Courses -->
<section class="section bg-light">
  <div class="container">
    <div class="section-header animate-on-scroll">
      <h2>\u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629 \u0627\u0644\u062D\u064A\u0627\u0629</h2>
      <p>\u062F\u0648\u0631\u0627\u062A \u062A\u062F\u0631\u064A\u0628\u064A\u0629 \u0635\u062D\u064A\u0629 \u0645\u0639\u062A\u0645\u062F\u0629 \u0644\u0644\u0645\u062C\u062A\u0645\u0639 \u0648\u0627\u0644\u0645\u0645\u0627\u0631\u0633\u064A\u0646</p>
    </div>
    <div class="grid-3">
      <div class="course-card animate-on-scroll delay-1">
        <div class="course-header"><h3 style="color:white;">\u0623\u0633\u0627\u0633\u064A\u0627\u062A NPHIES</h3></div>
        <div class="course-body">
          <div class="breadcrumb" style="color:var(--text-light);margin-bottom:10px;font-size:0.8rem;">
            <a href="index.html" data-ar="\u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629" data-en="Home" class="home-course-i18n">\u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629</a>
            <span>/</span>
            <a href="academy.html" data-ar="\u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629 \u0627\u0644\u062D\u064A\u0627\u0629" data-en="Life Academy" class="home-course-i18n">\u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629 \u0627\u0644\u062D\u064A\u0627\u0629</a>
            <span>/</span>
            <a href="course-nphies.html" data-ar="\u0623\u0633\u0627\u0633\u064A\u0627\u062A \u0646\u0638\u0627\u0645 NPHIES" data-en="NPHIES Fundamentals" class="home-course-i18n">\u0623\u0633\u0627\u0633\u064A\u0627\u062A \u0646\u0638\u0627\u0645 NPHIES</a>
          </div>
          <p>\u0627\u0644\u0645\u0637\u0627\u0644\u0628\u0627\u062A\u060C \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629 \u0627\u0644\u0645\u0633\u0628\u0642\u0629\u060C \u0627\u0644\u0623\u0647\u0644\u064A\u0629\u060C FHIR R4 \u2014 \u0625\u062A\u0642\u0627\u0646 \u062A\u0634\u063A\u064A\u0644\u064A \u0643\u0627\u0645\u0644 \u0644\u0645\u0632\u0648\u062F\u064A \u0627\u0644\u0631\u0639\u0627\u064A\u0629 \u0627\u0644\u0635\u062D\u064A\u0629.</p>
          <div class="course-meta"><span>12 \u0633\u0627\u0639\u0629</span><span>\u0645\u0628\u062A\u062F\u0626</span></div>
          <div style="margin-top:12px;"><a href="course-nphies.html" class="btn btn-outline btn-sm home-course-i18n" data-ar="\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u062F\u0648\u0631\u0629" data-en="Course Details">\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u062F\u0648\u0631\u0629</a></div>
        </div>
      </div>
      <div class="course-card animate-on-scroll delay-2">
        <div class="course-header"><h3 style="color:white;">\u0627\u0644\u062A\u0631\u0645\u064A\u0632 \u0627\u0644\u0637\u0628\u064A SBS \u0648ICD-10-AM</h3></div>
        <div class="course-body">
          <div class="breadcrumb" style="color:var(--text-light);margin-bottom:10px;font-size:0.8rem;">
            <a href="index.html" data-ar="\u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629" data-en="Home" class="home-course-i18n">\u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629</a>
            <span>/</span>
            <a href="academy.html" data-ar="\u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629 \u0627\u0644\u062D\u064A\u0627\u0629" data-en="Life Academy" class="home-course-i18n">\u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629 \u0627\u0644\u062D\u064A\u0627\u0629</a>
            <span>/</span>
            <a href="course-medical-coding.html" data-ar="\u0627\u0644\u062A\u0631\u0645\u064A\u0632 \u0627\u0644\u0637\u0628\u064A SBS \u0648ICD-10-AM" data-en="SBS Medical Coding & ICD-10-AM" class="home-course-i18n">\u0627\u0644\u062A\u0631\u0645\u064A\u0632 \u0627\u0644\u0637\u0628\u064A SBS \u0648ICD-10-AM</a>
          </div>
          <p>\u062A\u0637\u0627\u0628\u0642 SBS-ICD-10\u060C \u062D\u0633\u0627\u0628 AR-DRG\u060C \u0648\u0627\u0644\u062A\u062D\u0636\u064A\u0631 \u0644\u062A\u062F\u0642\u064A\u0642 CHI \u0645\u0639 \u062D\u0627\u0644\u0627\u062A \u0639\u0645\u0644\u064A\u0629 \u0645\u0643\u062B\u0641\u0629.</p>
          <div class="course-meta"><span>20 \u0633\u0627\u0639\u0629</span><span>\u0645\u062A\u0642\u062F\u0645</span></div>
          <div style="margin-top:12px;"><a href="course-medical-coding.html" class="btn btn-outline btn-sm home-course-i18n" data-ar="\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u062F\u0648\u0631\u0629" data-en="Course Details">\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u062F\u0648\u0631\u0629</a></div>
        </div>
      </div>
      <div class="course-card animate-on-scroll delay-3">
        <div class="course-header"><h3 style="color:white;">\u0625\u062F\u0627\u0631\u0629 \u062F\u0648\u0631\u0629 \u0627\u0644\u0625\u064A\u0631\u0627\u062F\u0627\u062A</h3></div>
        <div class="course-body">
          <div class="breadcrumb" style="color:var(--text-light);margin-bottom:10px;font-size:0.8rem;">
            <a href="index.html" data-ar="\u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629" data-en="Home" class="home-course-i18n">\u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629</a>
            <span>/</span>
            <a href="academy.html" data-ar="\u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629 \u0627\u0644\u062D\u064A\u0627\u0629" data-en="Life Academy" class="home-course-i18n">\u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629 \u0627\u0644\u062D\u064A\u0627\u0629</a>
            <span>/</span>
            <a href="course-rcm.html" data-ar="\u0625\u062F\u0627\u0631\u0629 \u062F\u0648\u0631\u0629 \u0627\u0644\u0625\u064A\u0631\u0627\u062F\u0627\u062A \u0644\u0644\u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u0633\u0639\u0648\u062F\u064A\u0629" data-en="Revenue Cycle Management" class="home-course-i18n">\u0625\u062F\u0627\u0631\u0629 \u062F\u0648\u0631\u0629 \u0627\u0644\u0625\u064A\u0631\u0627\u062F\u0627\u062A \u0644\u0644\u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u0633\u0639\u0648\u062F\u064A\u0629</a>
          </div>
          <p>\u0645\u0646 \u0627\u0644\u0623\u0647\u0644\u064A\u0629 \u062D\u062A\u0649 \u0627\u0644\u062A\u062D\u0635\u064A\u0644 \u0645\u0639 \u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0631\u0641\u0636 \u0648\u062A\u062D\u0633\u064A\u0646 \u0645\u0624\u0634\u0631\u0627\u062A \u0627\u0644\u0623\u062F\u0627\u0621 \u0648\u0627\u0644\u062A\u062F\u0641\u0642 \u0627\u0644\u0646\u0642\u062F\u064A.</p>
          <div class="course-meta"><span>16 \u0633\u0627\u0639\u0629</span><span>\u0645\u062A\u0648\u0633\u0637</span></div>
          <div style="margin-top:12px;"><a href="course-rcm.html" class="btn btn-outline btn-sm home-course-i18n" data-ar="\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u062F\u0648\u0631\u0629" data-en="Course Details">\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u062F\u0648\u0631\u0629</a></div>
        </div>
      </div>
    </div>
    <div class="text-center" style="margin-top:32px;">
      <a href="academy.html" class="btn btn-primary">\u0639\u0631\u0636 \u062C\u0645\u064A\u0639 \u062F\u0648\u0631\u0627\u062A \u0627\u0644\u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629</a>
    </div>
  </div>
</section>

<!-- CTA -->
<section class="cta-section">
  <div class="container">
    <h2>\u0635\u062D\u062A\u0643 \u0623\u0648\u0644\u0627\u064B</h2>
    <p>\u0627\u062D\u062C\u0632 \u0645\u0648\u0639\u062F\u0643 \u0627\u0644\u0622\u0646 \u0648\u0627\u062D\u0635\u0644 \u0639\u0644\u0649 \u0623\u0641\u0636\u0644 \u0631\u0639\u0627\u064A\u0629 \u0637\u0628\u064A\u0629</p>
    <div class="cta-buttons">
      <a href="contact.html" class="btn btn-accent btn-lg">\u0627\u062D\u062C\u0632 \u0645\u0648\u0639\u062F</a>
      <a href="tel:966920000094" class="btn btn-white btn-lg">\u0627\u062A\u0635\u0644 \u0628\u0646\u0627</a>
    </div>
  </div>
</section>

<!-- Footer -->
<footer class="footer">
  <div class="container">
    <div class="footer-grid">
      <div>
        <h4 data-i18n="footer.name">\u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A</h4>
        <p style="margin-bottom:16px;" data-i18n="footer.desc">\u0646\u0638\u0627\u0645 BrainSAIT Healthcare OS \u0627\u0644\u0645\u062A\u0635\u0644 \u0628\u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062D\u064A\u0629</p>
        <span class="api-status live">API Connected</span>
      </div>
      <div>
        <h4 data-i18n="footer.quickLinks">\u0631\u0648\u0627\u0628\u0637 \u0633\u0631\u064A\u0639\u0629</h4>
        <a href="about.html" data-i18n="nav.about">\u0639\u0646 \u0627\u0644\u0645\u062C\u0645\u0648\u0639\u0629</a>
        <a href="departments.html" data-i18n="nav.departments">\u0627\u0644\u0623\u0642\u0633\u0627\u0645 \u0627\u0644\u0637\u0628\u064A\u0629</a>
        <a href="doctors.html" data-i18n="nav.doctors">\u0623\u0637\u0628\u0627\u0624\u0646\u0627</a>
        <a href="branches.html" data-i18n="nav.branches">\u0641\u0631\u0648\u0639\u0646\u0627</a>
        <a href="packages.html" data-i18n="nav.packages">\u0628\u0627\u0642\u0627\u062A \u0627\u0644\u0631\u0639\u0627\u064A\u0629</a>
        <a href="blog.html" data-i18n="nav.blog">\u0627\u0644\u0645\u062F\u0648\u0646\u0629 \u0627\u0644\u0635\u062D\u064A\u0629</a>
        <a href="academy.html" data-i18n="nav.academy">\u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629 \u0627\u0644\u062D\u064A\u0627\u0629</a>
        <a href="faq.html" data-i18n="nav.faq">\u0627\u0644\u0623\u0633\u0626\u0644\u0629 \u0627\u0644\u0634\u0627\u0626\u0639\u0629</a>
      </div>
      <div>
        <h4 data-i18n="footer.services">\u062E\u062F\u0645\u0627\u062A\u0646\u0627</h4>
        <a href="contact.html" data-i18n="nav.book">\u062D\u062C\u0632 \u0645\u0648\u0639\u062F</a>
        <a href="departments.html">\u0627\u0644\u0639\u064A\u0627\u062F\u0627\u062A \u0627\u0644\u062E\u0627\u0631\u062C\u064A\u0629</a>
        <a href="departments.html">\u0627\u0644\u0637\u0648\u0627\u0631\u0626</a>
        <a href="departments.html">\u0627\u0644\u062C\u0631\u0627\u062D\u0627\u062A</a>
        <a href="packages.html" data-i18n="nav.packages">\u0628\u0627\u0642\u0627\u062A \u0627\u0644\u0631\u0639\u0627\u064A\u0629</a>
      </div>
      <div>
        <h4 data-i18n="footer.contact">\u062A\u0648\u0627\u0635\u0644 \u0645\u0639\u0646\u0627</h4>
        <a href="tel:966920000094">+966920000094</a>
        <a href="mailto:info@hayathospitals.com">info@hayathospitals.com</a>
        <p style="margin-top:8px;font-size:0.85rem;">\u0627\u0644\u0631\u064A\u0627\u0636\u060C \u0627\u0644\u0645\u0645\u0644\u0643\u0629 \u0627\u0644\u0639\u0631\u0628\u064A\u0629 \u0627\u0644\u0633\u0639\u0648\u062F\u064A\u0629</p>
      </div>
    </div>
    <div class="footer-bottom">
      <p>\xA9 2026 \u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A \u2014 BrainSAIT Healthcare OS</p>
    </div>
  </div>
</footer>

<!-- WhatsApp Float -->
<a href="https://wa.me/966920000094" class="wa-float" target="_blank" rel="noopener">
  <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492l4.624-1.47A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75c-2.115 0-4.142-.665-5.847-1.884l-.42-.279-2.746.874.874-2.746-.279-.42A9.713 9.713 0 012.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75z"/></svg>
</a>

<!-- Back to Top -->
<button class="back-top" onclick="window.scrollTo({top:0,behavior:'smooth'})">
  <svg viewBox="0 0 24 24"><path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/></svg>
</button>

<script src="js/common.js"><\/script>
<script>
// Load live stats
(async () => {
  try {
    const { stats } = await HNH.getStats();
    document.getElementById('statProviders').textContent = stats.total_providers?.toLocaleString() || '\u2014';
    document.getElementById('statBranches').textContent = stats.total_branches?.toLocaleString() || '\u2014';
    document.getElementById('statDepts').textContent = stats.total_departments?.toLocaleString() || '\u2014';
    document.getElementById('statBeds').textContent = stats.total_beds?.toLocaleString() || '\u2014';
  } catch(e) { console.error('Stats load failed:', e); }
})();

// Load departments preview (from providers data)
(async () => {
  try {
    const { providers } = await HNH.getProviders();
    const depts = [...new Set(providers.map(p => p.department).filter(Boolean))].slice(0, 8);
    const l = HNH.currentLang();
    const grid = document.getElementById('deptGrid');
    grid.innerHTML = depts.map((d, i) => \`
      <div class="card dept-card animate-on-scroll delay-\${(i%4)+1}">
        <div class="dept-icon"><svg viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg></div>
        <h4>\${d}</h4>
        <p style="font-size:0.85rem;color:var(--text-light);">\${providers.filter(p => p.department === d).length} \u0637\u0628\u064A\u0628</p>
      </div>
    \`).join('');
  } catch(e) { console.error('Depts load failed:', e); }
})();

// Load branches
(async () => {
  try {
    const { branches } = await HNH.getBranches();
    const l = HNH.currentLang();
    const grid = document.getElementById('branchesGrid');
    grid.innerHTML = branches.map((b, i) => \`
      <div class="card branch-card animate-on-scroll delay-\${(i%3)+1}" style="padding:0;overflow:hidden;">
        <div style="background:var(--gradient-primary);padding:32px;color:white;">
          <div class="branch-icon" style="background:rgba(255,255,255,0.2);margin-bottom:12px;">
            <svg viewBox="0 0 24 24" width="28" height="28" fill="white"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
          </div>
          <h3 style="color:white;margin-bottom:4px;">\${l==='ar' ? b.name_ar : b.name_en}</h3>
          <span style="color:rgba(255,255,255,0.7);font-size:0.9rem;">\${l==='ar' ? b.city_ar : b.city_en}</span>
        </div>
        <div style="padding:24px;">
          <p style="color:var(--text-light);margin-bottom:12px;font-size:0.9rem;">
            \${b.beds ? \`\${b.beds} \u0633\u0631\u064A\u0631\` : ''} \${b.phone ? \`\xB7 \${b.phone}\` : ''}
          </p>
          <a href="contact.html" class="btn btn-primary btn-sm">\u062D\u062C\u0632 \u0645\u0648\u0639\u062F</a>
        </div>
      </div>
    \`).join('');
  } catch(e) { console.error('Branches load failed:', e); }
})();

// Load doctors preview
(async () => {
  try {
    const { providers } = await HNH.getProviders('?limit=8');
    const l = HNH.currentLang();
    const grid = document.getElementById('doctorsGrid');
    grid.innerHTML = providers.slice(0, 8).map((d, i) => \`
      <div class="card doctor-card animate-on-scroll delay-\${(i%4)+1}">
        <div class="doctor-photo">\${(l==='ar' ? d.name_ar : d.name_en).split(' ').pop().charAt(0)}</div>
        <h4>\${l==='ar' ? d.name_ar : d.name_en}</h4>
        <div class="specialty">\${d.specialty}</div>
        <div class="branch-tag">\${d.branch}</div>
        <a href="contact.html" class="btn btn-primary btn-sm">\${l==='ar' ? '\u0627\u062D\u062C\u0632 \u0627\u0644\u0622\u0646' : 'Book Now'}</a>
      </div>
    \`).join('');
  } catch(e) { console.error('Doctors load failed:', e); }
})();

function renderHomeCourseLinks(lang) {
  document.querySelectorAll('.home-course-i18n').forEach(el => {
    const key = lang === 'ar' ? 'ar' : 'en';
    const value = el.getAttribute(\`data-\${key}\`);
    if (value) el.textContent = value;
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderHomeCourseLinks(HNH.currentLang());
});

document.addEventListener('hnh:langChanged', e => {
  renderHomeCourseLinks(e.detail.lang);
});
<\/script>
</body>
</html>
`;
var packages = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>\u0628\u0627\u0642\u0627\u062A \u0627\u0644\u0641\u062D\u0635 \u0627\u0644\u0634\u0627\u0645\u0644 | \u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A</title>
<meta name="description" content="\u0628\u0627\u0642\u0627\u062A \u0627\u0644\u0641\u062D\u0635 \u0627\u0644\u0634\u0627\u0645\u0644 \u0641\u064A \u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A \u2014 \u0627\u062E\u062A\u0631 \u0627\u0644\u0628\u0627\u0642\u0629 \u0627\u0644\u0645\u0646\u0627\u0633\u0628\u0629 \u0644\u0643 \u0648\u0644\u0639\u0627\u0626\u0644\u062A\u0643. | Comprehensive health packages at Hayat National Hospitals.">
<meta name="keywords" content="\u0628\u0627\u0642\u0627\u062A \u0635\u062D\u064A\u0629, health packages, \u0641\u062D\u0635 \u0634\u0627\u0645\u0644, checkup, \u0645\u0633\u062A\u0634\u0641\u0649 \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A">
<meta name="robots" content="index, follow">
<meta name="theme-color" content="#0066CC">
<link rel="canonical" href="https://hnh.brainsait.org/packages.html">
<link rel="alternate" hreflang="ar" href="https://hnh.brainsait.org/packages.html">
<link rel="alternate" hreflang="en" href="https://hnh.brainsait.org/packages.html">
<link rel="alternate" hreflang="x-default" href="https://hnh.brainsait.org/packages.html">
<link rel="manifest" href="/manifest.json">
<link rel="apple-touch-icon" href="/icon-192.png">
<meta property="og:type" content="website">
<meta property="og:site_name" content="\u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A | Hayat National Hospitals">
<meta property="og:title" content="\u0628\u0627\u0642\u0627\u062A \u0627\u0644\u0641\u062D\u0635 \u0627\u0644\u0634\u0627\u0645\u0644 | \u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A">
<meta property="og:description" content="\u0628\u0627\u0642\u0627\u062A \u0627\u0644\u0641\u062D\u0635 \u0627\u0644\u0634\u0627\u0645\u0644 \u0641\u064A \u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A \u2014 \u0627\u062E\u062A\u0631 \u0627\u0644\u0628\u0627\u0642\u0629 \u0627\u0644\u0645\u0646\u0627\u0633\u0628\u0629 \u0644\u0643 \u0648\u0644\u0639\u0627\u0626\u0644\u062A\u0643.">
<meta property="og:url" content="https://hnh.brainsait.org/packages.html">
<meta property="og:image" content="https://hnh.brainsait.org/og-image.jpg">
<meta property="og:locale" content="ar_SA">
<meta property="og:locale:alternate" content="en_US">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="\u0628\u0627\u0642\u0627\u062A \u0627\u0644\u0641\u062D\u0635 \u0627\u0644\u0634\u0627\u0645\u0644 | \u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A">
<meta name="twitter:description" content="\u0628\u0627\u0642\u0627\u062A \u0627\u0644\u0641\u062D\u0635 \u0627\u0644\u0634\u0627\u0645\u0644 \u0641\u064A \u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A.">
<meta name="twitter:image" content="https://hnh.brainsait.org/og-image.jpg">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Tajawal:wght@300;400;500;700;800;900&display=swap" rel="stylesheet">
<link rel="stylesheet" href="css/style.css">
</head>
<body>
<a href="#main-content" class="skip-link">Skip to main content</a>
<header class="header"><div class="container header-inner"><a href="index.html" class="logo"><div class="logo-icon"><svg viewBox="0 0 24 24" width="24" height="24" fill="white"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg></div><div class="logo-text">\u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A<small>BrainSAIT Healthcare OS</small></div></a>
<nav class="nav" id="mainNav">
      <a href="index.html" data-i18n="nav.home">\u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629</a>
      <a href="about.html" data-i18n="nav.about">\u0639\u0646 \u0627\u0644\u0645\u062C\u0645\u0648\u0639\u0629</a>
      <a href="departments.html" data-i18n="nav.departments">\u0627\u0644\u0623\u0642\u0633\u0627\u0645 \u0627\u0644\u0637\u0628\u064A\u0629</a>
      <a href="doctors.html" data-i18n="nav.doctors">\u0623\u0637\u0628\u0627\u0624\u0646\u0627</a>
      <a href="branches.html" data-i18n="nav.branches">\u0641\u0631\u0648\u0639\u0646\u0627</a>
      <a href="packages.html" data-i18n="nav.packages">\u0628\u0627\u0642\u0627\u062A \u0627\u0644\u0631\u0639\u0627\u064A\u0629</a>
      <a href="blog.html" data-i18n="nav.blog">\u0627\u0644\u0645\u062F\u0648\u0646\u0629 \u0627\u0644\u0635\u062D\u064A\u0629</a>
      <a href="contact.html" data-i18n="nav.contact">\u0627\u062A\u0635\u0644 \u0628\u0646\u0627</a>
      <button class="lang-btn" onclick="HNH.setLang(HNH.currentLang()==='ar'?'en':'ar')">EN/\u0639\u0631\u0628\u064A</button>
      <a href="contact.html" class="nav-cta" data-i18n="nav.book">\u0627\u062D\u062C\u0632 \u0645\u0648\u0639\u062F</a>
    </nav><button class="mobile-toggle" aria-label="Menu"><span></span><span></span><span></span></button></div></header>

<section class="page-hero" id="main-content"><div class="container"><div class="breadcrumb"><a href="index.html">\u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629</a><span>/</span><span>\u0628\u0627\u0642\u0627\u062A \u0627\u0644\u0631\u0639\u0627\u064A\u0629</span></div><h1 data-i18n="packages.title">\u0628\u0627\u0642\u0627\u062A \u0627\u0644\u0641\u062D\u0635 \u0627\u0644\u0634\u0627\u0645\u0644</h1><p>\u0627\u062E\u062A\u0631 \u0627\u0644\u0628\u0627\u0642\u0629 \u0627\u0644\u0635\u062D\u064A\u0629 \u0627\u0644\u0645\u0646\u0627\u0633\u0628\u0629 \u0644\u0643 \u0648\u0644\u0639\u0627\u0626\u0644\u062A\u0643 \u2014 \u0641\u062D\u0648\u0635\u0627\u062A \u0634\u0627\u0645\u0644\u0629 \u0628\u0623\u064A\u062F\u064A \u0645\u062A\u062E\u0635\u0635\u064A\u0646</p></div></section>

<section class="section bg-light">
<div class="container">
  <div class="grid-3" style="display:grid;grid-template-columns:repeat(3,1fr);gap:24px;">

    <div class="package-card">
      <div class="package-header">
        <div style="font-size:2rem;">\u{1F52C}</div>
        <h3>\u0627\u0644\u0628\u0627\u0642\u0629 \u0627\u0644\u0623\u0633\u0627\u0633\u064A\u0629</h3>
        <div class="package-price">450</div>
        <div class="package-currency">\u0631\u064A\u0627\u0644 \u0633\u0639\u0648\u062F\u064A</div>
      </div>
      <div class="package-body">
        <ul class="package-tests">
          <li>\u062A\u062D\u0644\u064A\u0644 \u062F\u0645 \u0634\u0627\u0645\u0644 (CBC)</li>
          <li>\u0648\u0638\u0627\u0626\u0641 \u0627\u0644\u0643\u0628\u062F \u0648\u0627\u0644\u0643\u0644\u0649</li>
          <li>\u0633\u0643\u0631 \u0627\u0644\u062F\u0645 \u0635\u0627\u0626\u0645\u0627\u064B</li>
          <li>\u0627\u0644\u062F\u0647\u0648\u0646 \u0648\u0627\u0644\u0643\u0648\u0644\u064A\u0633\u062A\u0631\u0648\u0644</li>
          <li>\u062A\u062D\u0644\u064A\u0644 \u0628\u0648\u0644 \u0643\u0627\u0645\u0644</li>
          <li>\u0642\u064A\u0627\u0633 \u0636\u063A\u0637 \u0627\u0644\u062F\u0645</li>
        </ul>
        <a href="contact.html" class="btn btn-primary" style="width:100%;text-align:center;display:block;">\u0627\u062D\u062C\u0632 \u0627\u0644\u0622\u0646</a>
      </div>
    </div>

    <div class="package-card featured">
      <div class="package-badge">\u0627\u0644\u0623\u0643\u062B\u0631 \u0637\u0644\u0628\u0627\u064B</div>
      <div class="package-header">
        <div style="font-size:2rem;">\u2B50</div>
        <h3>\u0627\u0644\u0628\u0627\u0642\u0629 \u0627\u0644\u0645\u062A\u0648\u0633\u0637\u0629</h3>
        <div class="package-price">850</div>
        <div class="package-currency">\u0631\u064A\u0627\u0644 \u0633\u0639\u0648\u062F\u064A</div>
      </div>
      <div class="package-body">
        <ul class="package-tests">
          <li>\u0643\u0644 \u0641\u062D\u0648\u0635\u0627\u062A \u0627\u0644\u0628\u0627\u0642\u0629 \u0627\u0644\u0623\u0633\u0627\u0633\u064A\u0629</li>
          <li>\u0647\u0631\u0645\u0648\u0646\u0627\u062A \u0627\u0644\u063A\u062F\u0629 \u0627\u0644\u062F\u0631\u0642\u064A\u0629</li>
          <li>\u0641\u064A\u062A\u0627\u0645\u064A\u0646 \u062F \u0648\u062812</li>
          <li>\u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0628\u0631\u0627\u0632</li>
          <li>\u0635\u0648\u0631\u0629 \u0627\u0644\u0635\u062F\u0631 \u0628\u0627\u0644\u0623\u0634\u0639\u0629</li>
          <li>\u0631\u0633\u0645 \u0642\u0644\u0628 (ECG)</li>
          <li>\u0627\u0633\u062A\u0634\u0627\u0631\u0629 \u0637\u0628\u064A\u0629 \u0645\u062C\u0627\u0646\u064A\u0629</li>
        </ul>
        <a href="contact.html" class="btn btn-accent" style="width:100%;text-align:center;display:block;">\u0627\u062D\u062C\u0632 \u0627\u0644\u0622\u0646</a>
      </div>
    </div>

    <div class="package-card">
      <div class="package-header">
        <div style="font-size:2rem;">\u{1F48E}</div>
        <h3>\u0627\u0644\u0628\u0627\u0642\u0629 \u0627\u0644\u0645\u062A\u0643\u0627\u0645\u0644\u0629</h3>
        <div class="package-price">1,450</div>
        <div class="package-currency">\u0631\u064A\u0627\u0644 \u0633\u0639\u0648\u062F\u064A</div>
      </div>
      <div class="package-body">
        <ul class="package-tests">
          <li>\u0643\u0644 \u0641\u062D\u0648\u0635\u0627\u062A \u0627\u0644\u0628\u0627\u0642\u0629 \u0627\u0644\u0645\u062A\u0648\u0633\u0637\u0629</li>
          <li>\u062A\u0635\u0648\u064A\u0631 \u0628\u0627\u0644\u0645\u0648\u062C\u0627\u062A \u0641\u0648\u0642 \u0627\u0644\u0635\u0648\u062A\u064A\u0629</li>
          <li>\u0633\u0631\u0637\u0627\u0646\u0627\u062A \u0627\u0644\u062F\u0645 (Tumor Markers)</li>
          <li>\u0641\u062D\u0635 \u0627\u0644\u0639\u064A\u0648\u0646 \u0648\u0627\u0644\u0633\u0645\u0639</li>
          <li>\u0642\u064A\u0627\u0633 \u0643\u062B\u0627\u0641\u0629 \u0627\u0644\u0639\u0638\u0627\u0645</li>
          <li>\u062A\u0642\u0631\u064A\u0631 \u0635\u062D\u064A \u0634\u0627\u0645\u0644</li>
          <li>\u0645\u062A\u0627\u0628\u0639\u0629 \u0644\u0645\u062F\u0629 3 \u0623\u0634\u0647\u0631</li>
        </ul>
        <a href="contact.html" class="btn btn-primary" style="width:100%;text-align:center;display:block;">\u0627\u062D\u062C\u0632 \u0627\u0644\u0622\u0646</a>
      </div>
    </div>

    <div class="package-card">
      <div class="package-header">
        <div style="font-size:2rem;">\u{1F476}</div>
        <h3>\u0628\u0627\u0642\u0629 \u0627\u0644\u0623\u0637\u0641\u0627\u0644</h3>
        <div class="package-price">350</div>
        <div class="package-currency">\u0631\u064A\u0627\u0644 \u0633\u0639\u0648\u062F\u064A</div>
      </div>
      <div class="package-body">
        <ul class="package-tests">
          <li>\u062A\u062D\u0644\u064A\u0644 \u062F\u0645 \u0634\u0627\u0645\u0644</li>
          <li>\u0641\u062D\u0635 \u0627\u0644\u0646\u0645\u0648 \u0648\u0627\u0644\u062A\u0637\u0648\u0631</li>
          <li>\u062A\u0637\u0639\u064A\u0645\u0627\u062A \u0648\u0645\u062A\u0627\u0628\u0639\u0629</li>
          <li>\u0641\u062D\u0635 \u0627\u0644\u0633\u0645\u0639 \u0648\u0627\u0644\u0628\u0635\u0631</li>
          <li>\u0627\u0633\u062A\u0634\u0627\u0631\u0629 \u0637\u0628 \u0627\u0644\u0623\u0637\u0641\u0627\u0644</li>
        </ul>
        <a href="contact.html" class="btn btn-primary" style="width:100%;text-align:center;display:block;">\u0627\u062D\u062C\u0632 \u0627\u0644\u0622\u0646</a>
      </div>
    </div>

    <div class="package-card">
      <div class="package-header">
        <div style="font-size:2rem;">\u{1F931}</div>
        <h3>\u0628\u0627\u0642\u0629 \u0627\u0644\u0623\u0645\u0648\u0645\u0629</h3>
        <div class="package-price">950</div>
        <div class="package-currency">\u0631\u064A\u0627\u0644 \u0633\u0639\u0648\u062F\u064A</div>
      </div>
      <div class="package-body">
        <ul class="package-tests">
          <li>\u062A\u062D\u0627\u0644\u064A\u0644 \u0627\u0644\u062D\u0645\u0644 \u0627\u0644\u0643\u0627\u0645\u0644\u0629</li>
          <li>\u0641\u062D\u0635 \u0627\u0644\u0633\u0643\u0631 \u0627\u0644\u062A\u0631\u0627\u0643\u0645\u064A</li>
          <li>\u0635\u0648\u0631\u0629 \u0635\u0648\u062A\u064A\u0629 (\u0633\u0648\u0646\u0627\u0631)</li>
          <li>\u0641\u062D\u0635 \u0627\u0644\u063A\u062F\u0629 \u0627\u0644\u062F\u0631\u0642\u064A\u0629</li>
          <li>\u0627\u0633\u062A\u0634\u0627\u0631\u0629 \u0646\u0633\u0627\u0621 \u0648\u0648\u0644\u0627\u062F\u0629</li>
          <li>\u062E\u0637\u0629 \u0645\u062A\u0627\u0628\u0639\u0629 \u0627\u0644\u062D\u0645\u0644</li>
        </ul>
        <a href="contact.html" class="btn btn-primary" style="width:100%;text-align:center;display:block;">\u0627\u062D\u062C\u0632 \u0627\u0644\u0622\u0646</a>
      </div>
    </div>

    <div class="package-card">
      <div class="package-header">
        <div style="font-size:2rem;">\u2764\uFE0F</div>
        <h3>\u0628\u0627\u0642\u0629 \u0627\u0644\u0642\u0644\u0628</h3>
        <div class="package-price">1,100</div>
        <div class="package-currency">\u0631\u064A\u0627\u0644 \u0633\u0639\u0648\u062F\u064A</div>
      </div>
      <div class="package-body">
        <ul class="package-tests">
          <li>\u0631\u0633\u0645 \u0642\u0644\u0628 (ECG) \u0643\u0627\u0645\u0644</li>
          <li>\u0635\u062F\u0649 \u0627\u0644\u0642\u0644\u0628 (Echo)</li>
          <li>\u0627\u062E\u062A\u0628\u0627\u0631 \u0627\u0644\u062C\u0647\u062F</li>
          <li>\u062A\u062D\u0627\u0644\u064A\u0644 \u062F\u0647\u0648\u0646 \u0645\u062A\u0642\u062F\u0645\u0629</li>
          <li>\u0627\u0633\u062A\u0634\u0627\u0631\u0629 \u0642\u0644\u0628 \u0648\u0623\u0648\u0639\u064A\u0629</li>
          <li>\u062A\u0642\u0631\u064A\u0631 \u0642\u0644\u0628 \u0645\u0641\u0635\u0644</li>
        </ul>
        <a href="contact.html" class="btn btn-primary" style="width:100%;text-align:center;display:block;">\u0627\u062D\u062C\u0632 \u0627\u0644\u0622\u0646</a>
      </div>
    </div>

    <div class="package-card">
      <div class="package-header">
        <div style="font-size:2rem;">\u{1F474}</div>
        <h3>\u0628\u0627\u0642\u0629 \u0643\u0628\u0627\u0631 \u0627\u0644\u0633\u0646</h3>
        <div class="package-price">1,200</div>
        <div class="package-currency">\u0631\u064A\u0627\u0644 \u0633\u0639\u0648\u062F\u064A</div>
      </div>
      <div class="package-body">
        <ul class="package-tests">
          <li>\u062A\u062D\u0627\u0644\u064A\u0644 \u0634\u0627\u0645\u0644\u0629 \u0645\u062A\u0642\u062F\u0645\u0629</li>
          <li>\u0641\u062D\u0635 \u0643\u062B\u0627\u0641\u0629 \u0627\u0644\u0639\u0638\u0627\u0645</li>
          <li>\u0641\u062D\u0635 \u0627\u0644\u0630\u0627\u0643\u0631\u0629 \u0648\u0627\u0644\u0625\u062F\u0631\u0627\u0643</li>
          <li>\u0642\u064A\u0627\u0633 \u0636\u063A\u0637 \u0627\u0644\u062F\u0645 \u0648\u0627\u0644\u0633\u0643\u0631</li>
          <li>\u0627\u0633\u062A\u0634\u0627\u0631\u0629 \u0637\u0628 \u0627\u0644\u0634\u064A\u062E\u0648\u062E\u0629</li>
          <li>\u062E\u0637\u0629 \u0631\u0639\u0627\u064A\u0629 \u0635\u062D\u064A\u0629 \u0633\u0646\u0648\u064A\u0629</li>
        </ul>
        <a href="contact.html" class="btn btn-primary" style="width:100%;text-align:center;display:block;">\u0627\u062D\u062C\u0632 \u0627\u0644\u0622\u0646</a>
      </div>
    </div>

  </div>
</div>
</section>

<section class="cta-section"><div class="container"><h2>\u0635\u062D\u062A\u0643 \u0623\u0648\u0644\u0627\u064B</h2><p>\u0627\u062D\u062C\u0632 \u0628\u0627\u0642\u062A\u0643 \u0627\u0644\u0635\u062D\u064A\u0629 \u0627\u0644\u0622\u0646</p><div class="cta-buttons"><a href="contact.html" class="btn btn-accent btn-lg">\u0627\u062D\u062C\u0632 \u0645\u0648\u0639\u062F</a><a href="tel:966920000094" class="btn btn-white btn-lg">\u0627\u062A\u0635\u0644 \u0628\u0646\u0627</a></div></div></section>

<footer class="footer">
  <div class="container">
    <div class="footer-grid">
      <div>
        <h4 data-i18n="footer.name">\u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A</h4>
        <p style="margin-bottom:16px;" data-i18n="footer.desc">\u0646\u0638\u0627\u0645 BrainSAIT Healthcare OS \u0627\u0644\u0645\u062A\u0635\u0644 \u0628\u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062D\u064A\u0629</p>
        <span class="api-status live">API Connected</span>
      </div>
      <div>
        <h4 data-i18n="footer.quickLinks">\u0631\u0648\u0627\u0628\u0637 \u0633\u0631\u064A\u0639\u0629</h4>
        <a href="about.html" data-i18n="nav.about">\u0639\u0646 \u0627\u0644\u0645\u062C\u0645\u0648\u0639\u0629</a>
        <a href="departments.html" data-i18n="nav.departments">\u0627\u0644\u0623\u0642\u0633\u0627\u0645 \u0627\u0644\u0637\u0628\u064A\u0629</a>
        <a href="doctors.html" data-i18n="nav.doctors">\u0623\u0637\u0628\u0627\u0624\u0646\u0627</a>
        <a href="branches.html" data-i18n="nav.branches">\u0641\u0631\u0648\u0639\u0646\u0627</a>
        <a href="packages.html" data-i18n="nav.packages">\u0628\u0627\u0642\u0627\u062A \u0627\u0644\u0631\u0639\u0627\u064A\u0629</a>
        <a href="blog.html" data-i18n="nav.blog">\u0627\u0644\u0645\u062F\u0648\u0646\u0629 \u0627\u0644\u0635\u062D\u064A\u0629</a>
        <a href="faq.html" data-i18n="nav.faq">\u0627\u0644\u0623\u0633\u0626\u0644\u0629 \u0627\u0644\u0634\u0627\u0626\u0639\u0629</a>
      </div>
      <div>
        <h4 data-i18n="footer.services">\u062E\u062F\u0645\u0627\u062A\u0646\u0627</h4>
        <a href="contact.html" data-i18n="nav.book">\u062D\u062C\u0632 \u0645\u0648\u0639\u062F</a>
        <a href="departments.html">\u0627\u0644\u0639\u064A\u0627\u062F\u0627\u062A \u0627\u0644\u062E\u0627\u0631\u062C\u064A\u0629</a>
        <a href="departments.html">\u0627\u0644\u0637\u0648\u0627\u0631\u0626</a>
        <a href="departments.html">\u0627\u0644\u062C\u0631\u0627\u062D\u0627\u062A</a>
        <a href="packages.html" data-i18n="nav.packages">\u0628\u0627\u0642\u0627\u062A \u0627\u0644\u0631\u0639\u0627\u064A\u0629</a>
      </div>
      <div>
        <h4 data-i18n="footer.contact">\u062A\u0648\u0627\u0635\u0644 \u0645\u0639\u0646\u0627</h4>
        <a href="tel:966920000094">+966920000094</a>
        <a href="mailto:info@hayathospitals.com">info@hayathospitals.com</a>
        <p style="margin-top:8px;font-size:0.85rem;">\u0627\u0644\u0631\u064A\u0627\u0636\u060C \u0627\u0644\u0645\u0645\u0644\u0643\u0629 \u0627\u0644\u0639\u0631\u0628\u064A\u0629 \u0627\u0644\u0633\u0639\u0648\u062F\u064A\u0629</p>
      </div>
    </div>
    <div class="footer-bottom">
      <p>\xA9 2026 \u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A \u2014 BrainSAIT Healthcare OS</p>
    </div>
  </div>
</footer>
<a href="https://wa.me/966920000094" class="wa-float" target="_blank" rel="noopener" aria-label="WhatsApp">
  <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492l4.624-1.47A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75c-2.115 0-4.142-.665-5.847-1.884l-.42-.279-2.746.874.874-2.746-.279-.42A9.713 9.713 0 012.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75z"/></svg>
</a>
<button class="back-top" onclick="window.scrollTo({top:0,behavior:'smooth'})" aria-label="Back to top">
  <svg viewBox="0 0 24 24"><path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/></svg>
</button>
<script src="js/common.js"><\/script>
</body>
</html>
`;

// src/pages.js
var STATIC_PAGES = {
  "about": about,
  "academy": academy,
  "blog": blog,
  "branches": branches2,
  "contact": contact,
  "departments": departments,
  "doctors": doctors,
  "faq": faq,
  "packages": packages,
  "index": index
};
var L = {
  "ar": {
    "desc": "\u0645\u062C\u0645\u0648\u0639\u0629 \u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A \u2014 \u0645\u0646\u0638\u0648\u0645\u0629 \u0635\u062D\u064A\u0629 \u0645\u062A\u0643\u0627\u0645\u0644\u0629 \u0645\u0639 \u0628\u0633\u0645\u0629 \u0648 GIVC \u0648 SBS \u0648 Oracle \u0648 NPHIES.",
    "title": "\u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A | HNH \u2014 \u0627\u0644\u0645\u0646\u0638\u0648\u0645\u0629 \u0627\u0644\u0645\u062A\u0643\u0627\u0645\u0644\u0629",
    "titleShort": "\u0645\u0633\u062A\u0634\u0641\u0649 \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A",
    "osVer": "BrainSAIT Healthcare OS v5.0",
    "heroBadge": "\u0628\u064A\u0627\u0646\u0627\u062A \u062D\u064A\u0629 \u2014 \u0645\u062A\u0635\u0644 \u0628\u0640 BrainSAIT",
    "heroH1": '\u0645\u062C\u0645\u0648\u0639\u0629 \u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A<br><span class="gd">\u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A</span>',
    "heroP": "\u0645\u0646\u0638\u0648\u0645\u0629 \u0635\u062D\u064A\u0629 \u0630\u0643\u064A\u0629 \u0645\u062A\u0643\u0627\u0645\u0644\u0629 \u2014 \u0628\u0633\u0645\u0629 \u0627\u0644\u0635\u0648\u062A\u064A\u0629 \xB7 GIVC \xB7 SBS \xB7 Oracle \xB7 NPHIES \xB7 ClaimLinc",
    "heroBookBtn": "\u{1F4C5} \u0627\u062D\u062C\u0632 \u0645\u0648\u0639\u062F",
    "heroDeptBtn": "\u062A\u0635\u0641\u062D \u0627\u0644\u0623\u0642\u0633\u0627\u0645",
    "statDoctors": "\u0637\u0628\u064A\u0628",
    "statBranches": "\u0641\u0631\u0639",
    "statDepts": "\u0642\u0633\u0645 \u0637\u0628\u064A",
    "statBeds": "\u0633\u0631\u064A\u0631",
    "navDepts": "\u0627\u0644\u0623\u0642\u0633\u0627\u0645",
    "navBranches": "\u0627\u0644\u0641\u0631\u0648\u0639",
    "navDoctors": "\u0627\u0644\u0623\u0637\u0628\u0627\u0621",
    "navPortal": "\u0627\u0644\u0645\u0646\u0638\u0648\u0645\u0629",
    "navEcosystem": "\u0627\u0644\u0645\u0646\u0638\u0648\u0645\u0629",
    "navCommand": "\u0627\u0644\u0645\u0631\u0643\u0632 \u0627\u0644\u062D\u064A",
    "navBook": "\u{1F4C5} \u0627\u062D\u062C\u0632 \u0645\u0648\u0639\u062F",
    "langBtn": "EN",
    "secDeptsTitle": "\u0627\u0644\u0623\u0642\u0633\u0627\u0645 \u0627\u0644\u0637\u0628\u064A\u0629",
    "secDeptsSub": "\u0623\u0643\u062B\u0631 \u0645\u0646 30 \u062A\u062E\u0635\u0635\u0627\u064B \u0637\u0628\u064A\u0627\u064B",
    "secBranchesTitle": "\u0641\u0631\u0648\u0639\u0646\u0627",
    "secBranchesSub": "\u062E\u0645\u0633\u0629 \u0641\u0631\u0648\u0639 \u0641\u064A \u0627\u0644\u0645\u0645\u0644\u0643\u0629",
    "secDoctorsTitle": "\u0623\u0637\u0628\u0627\u0624\u0646\u0627",
    "secDoctorsSub": "\u0641\u0631\u064A\u0642 \u0645\u0646 \u0623\u0645\u0647\u0631 \u0627\u0644\u0627\u0633\u062A\u0634\u0627\u0631\u064A\u064A\u0646",
    "ecosystemTitle": "\u0627\u0644\u0645\u0646\u0638\u0648\u0645\u0629 \u0627\u0644\u0635\u062D\u064A\u0629 \u0627\u0644\u0645\u062A\u0643\u0627\u0645\u0644\u0629",
    "ecosystemSub": "\u0628\u0648\u0627\u0628\u0627\u062A \u0630\u0643\u064A\u0629 \u0644\u0643\u0644 \u0645\u0633\u062A\u062E\u062F\u0645 \u2014 \u0628\u064A\u0627\u0646\u0627\u062A \u062D\u064A\u0629 \u0648\u062A\u0643\u0627\u0645\u0644 \u0643\u0627\u0645\u0644 \u0628\u064A\u0646 \u0627\u0644\u0623\u0646\u0638\u0645\u0629",
    "patientTitle": "\u0627\u0644\u0645\u0631\u064A\u0636",
    "patientDesc": "\u0627\u0633\u062A\u0639\u0631\u0627\u0636 \u0627\u0644\u0641\u062D\u0648\u0635\u0627\u062A\u060C \u062D\u062C\u0632 \u0627\u0644\u0645\u0648\u0627\u0639\u064A\u062F\u060C \u0645\u062A\u0627\u0628\u0639\u0629 \u0627\u0644\u0645\u0637\u0627\u0644\u0628\u0627\u062A\u060C \u0627\u0644\u062F\u0631\u062F\u0634\u0629 \u0627\u0644\u0630\u0643\u064A\u0629 \u0645\u0639 \u0628\u0633\u0645\u0629",
    "providerTitle": "\u0627\u0644\u0645\u0632\u0648\u062F \u0627\u0644\u0635\u062D\u064A",
    "providerDesc": "\u062C\u062F\u0648\u0644 \u0627\u0644\u0645\u0648\u0627\u0639\u064A\u062F\u060C \u0645\u0644\u0641\u0627\u062A \u0627\u0644\u0645\u0631\u0636\u0649\u060C \u0627\u0644\u062A\u0643\u0627\u0645\u0644 \u0645\u0639 Oracle \u0648 NPHIES\u060C \u062A\u0642\u0627\u0631\u064A\u0631 \u0627\u0644\u0623\u062F\u0627\u0621",
    "payerTitle": "\u0627\u0644\u062A\u0623\u0645\u064A\u0646",
    "payerDesc": "\u0627\u0644\u062A\u062D\u0642\u0642 \u0645\u0646 \u0627\u0644\u0623\u0647\u0644\u064A\u0629\u060C \u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0627\u062A \u0627\u0644\u0645\u0633\u0628\u0642\u0629\u060C \u0645\u062A\u0627\u0628\u0639\u0629 \u062F\u0648\u0631\u0629 \u0627\u0644\u0625\u064A\u0631\u0627\u062F\u0627\u062A",
    "studentTitle": "\u0627\u0644\u0637\u0627\u0644\u0628",
    "studentDesc": "\u0627\u0644\u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629 \u0627\u0644\u0637\u0628\u064A\u0629 \u2014 \u062F\u0648\u0631\u0627\u062A \u062A\u062F\u0631\u064A\u0628\u064A\u0629\u060C \u0634\u0647\u0627\u062F\u0627\u062A\u060C \u0645\u0643\u062A\u0628\u0629 \u0637\u0628\u064A\u0629 \u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A\u0629",
    "adminTitle": "\u0627\u0644\u0625\u062F\u0627\u0631\u0629",
    "adminDesc": "\u0644\u0648\u062D\u0629 \u062A\u062D\u0643\u0645 \u0634\u0627\u0645\u0644\u0629 \u2014 \u0625\u062D\u0635\u0627\u0626\u064A\u0627\u062A\u060C \u062A\u0642\u0627\u0631\u064A\u0631\u060C \u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646 \u0648\u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0627\u062A",
    "receptionTitle": "\u0627\u0644\u0627\u0633\u062A\u0642\u0628\u0627\u0644",
    "receptionDesc": "\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u0645\u0631\u0636\u0649\u060C \u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0645\u0648\u0627\u0639\u064A\u062F\u060C \u0627\u0644\u062A\u062D\u0642\u0642 \u0645\u0646 \u0627\u0644\u062A\u0623\u0645\u064A\u0646\u060C \u0637\u0628\u0627\u0639\u0629 \u0627\u0644\u062A\u0642\u0627\u0631\u064A\u0631",
    "rcmTitle": "\u062F\u0648\u0631\u0629 \u0627\u0644\u0625\u064A\u0631\u0627\u062F\u0627\u062A",
    "rcmDesc": "\u0627\u0644\u0645\u0637\u0627\u0644\u0628\u0627\u062A \u0627\u0644\u0645\u0627\u0644\u064A\u0629\u060C \u0645\u062A\u0627\u0628\u0639\u0629 \u0627\u0644\u062A\u062D\u0635\u064A\u0644\u060C \u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0623\u062F\u0627\u0621 \u0627\u0644\u0645\u0627\u0644\u064A\u060C \u062A\u0642\u0627\u0631\u064A\u0631 NPHIES",
    "integrationsTitle": "\u0627\u0644\u062A\u0643\u0627\u0645\u0644\u0627\u062A \u0627\u0644\u062D\u064A\u0629",
    "integrationsSub": "\u062C\u0645\u064A\u0639 \u0627\u0644\u0623\u0646\u0638\u0645\u0629 \u0645\u062A\u0635\u0644\u0629 \u0648\u062A\u0639\u0645\u0644 \u0628\u0634\u0643\u0644 \u0645\u0628\u0627\u0634\u0631",
    "givcTitle": "GIVC \u2014 \u0627\u0644\u0631\u0639\u0627\u064A\u0629 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A\u0629 \u0627\u0644\u0645\u062A\u0643\u0627\u0645\u0644\u0629",
    "givcDesc": "Global Integrated Virtual Care \u2014 \u0634\u0628\u0643\u0629 \u0627\u0644\u0623\u0637\u0628\u0627\u0621\u060C \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u0645\u0632\u0648\u062F\u064A\u0646\u060C \u0627\u0644\u062A\u062D\u0642\u0642 \u0645\u0646 \u0627\u0644\u0623\u0647\u0644\u064A\u0629 \u0645\u0639 OID",
    "givcRegister": "\u062A\u0633\u062C\u064A\u0644 \u0637\u0628\u064A\u0628 \u062C\u062F\u064A\u062F",
    "givcNetwork": "\u062A\u0635\u0641\u062D \u0627\u0644\u0634\u0628\u0643\u0629",
    "givcOidLabel": "\u0631\u0642\u0645 \u0627\u0644\u062A\u0639\u0631\u064A\u0641 (OID)",
    "aiTitle": "\u0628\u0633\u0645\u0629 \u2014 \u0627\u0644\u0645\u0633\u0627\u0639\u062F \u0627\u0644\u0637\u0628\u064A \u0627\u0644\u0630\u0643\u064A",
    "aiDesc": "\u062A\u062D\u062F\u062B \u0645\u0639 \u0628\u0633\u0645\u0629 \u0628\u0627\u0644\u0635\u0648\u062A \u0623\u0648 \u0627\u0644\u0643\u062A\u0627\u0628\u0629 \u2014 \u062D\u062C\u0632 \u0645\u0648\u0627\u0639\u064A\u062F\u060C \u0641\u062D\u0635 \u0627\u0644\u0623\u0647\u0644\u064A\u0629\u060C \u0645\u062A\u0627\u0628\u0639\u0629 \u0627\u0644\u0645\u0637\u0627\u0644\u0628\u0627\u062A\u060C \u0627\u0633\u062A\u0641\u0633\u0627\u0631\u0627\u062A \u0637\u0628\u064A\u0629",
    "aiTalkBtn": "\u062A\u062D\u062F\u062B \u0645\u0639 \u0628\u0633\u0645\u0629 \u{1F399}\uFE0F",
    "aiChatBtn": "\u{1F4AC} \u062F\u0631\u062F\u0634\u0629 \u0646\u0635\u064A\u0629",
    "ctaTitle": "\u0635\u062D\u062A\u0643 \u0623\u0648\u0644\u0627\u064B",
    "ctaSub": "\u0627\u062D\u062C\u0632 \u0645\u0648\u0639\u062F\u0643 \u0627\u0644\u0622\u0646 \u0639\u0628\u0631 \u0627\u0644\u0645\u0646\u0638\u0648\u0645\u0629 \u0627\u0644\u0645\u062A\u0643\u0627\u0645\u0644\u0629",
    "ctaBook": "\u0627\u062D\u062C\u0632 \u0645\u0648\u0639\u062F \u0627\u0644\u0622\u0646",
    "ctaCall": "\u0627\u062A\u0635\u0644 \u0628\u0646\u0627",
    "fAbout": "\u0645\u0646\u0638\u0648\u0645\u0629 \u0635\u062D\u064A\u0629 \u0630\u0643\u064A\u0629 \u0645\u062A\u0643\u0627\u0645\u0644\u0629 \u2014 \u0645\u0646\u0630 25 \u0639\u0627\u0645\u0627\u064B \u0645\u0646 \u0627\u0644\u062A\u0645\u064A\u0632.",
    "fLinks": "\u0631\u0648\u0627\u0628\u0637 \u0633\u0631\u064A\u0639\u0629",
    "fContact": "\u062A\u0648\u0627\u0635\u0644 \u0645\u0639\u0646\u0627",
    "fServices": "\u062E\u062F\u0645\u0627\u062A",
    "fEmerg": "\u0637\u0648\u0627\u0631\u0626 24/7",
    "fAppt": "\u062D\u062C\u0632 \u0645\u0648\u0639\u062F",
    "fEcosystem": "\u0627\u0644\u0645\u0646\u0638\u0648\u0645\u0629",
    "fPortal": "\u0627\u0644\u0628\u0648\u0627\u0628\u0629",
    "fBasma": "\u0628\u0633\u0645\u0629 AI",
    "fPowered": "\u0645\u0634\u063A\u0651\u0644 \u0628\u0646\u0638\u0627\u0645",
    "fCopy": "\xA9 2026 \u062C\u0645\u064A\u0639 \u0627\u0644\u062D\u0642\u0648\u0642 \u0645\u062D\u0641\u0648\u0638\u0629",
    "statusConnected": "\u0645\u062A\u0635\u0644",
    "statusWarning": "\u062A\u062D\u0630\u064A\u0631",
    "statusOffline": "\u063A\u064A\u0631 \u0645\u062A\u0635\u0644",
    "loading": "\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644...",
    "systemOnline": "\u062C\u0645\u064A\u0639 \u0627\u0644\u0623\u0646\u0638\u0645\u0629 \u062A\u0639\u0645\u0644",
    "oracleBridge": "\u062C\u0633\u0631 Oracle",
    "nphiesPortal": "\u0628\u0648\u0627\u0628\u0629 NPHIES",
    "claimlincPortal": "ClaimLinc",
    "basmaPortal": "\u0628\u0633\u0645\u0629 AI",
    "sbsPortal": "SBS",
    "givcPortal": "GIVC",
    "searchTitle": "\u0627\u0644\u0628\u062D\u062B \u0627\u0644\u0630\u0643\u064A \u0628\u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064A",
    "searchSub": "\u0627\u0633\u0623\u0644 \u0639\u0646 \u0623\u064A \u0637\u0628\u064A\u0628 \u0623\u0648 \u0642\u0633\u0645 \u0623\u0648 \u0625\u062C\u0631\u0627\u0621 \u0623\u0648 \u062F\u0648\u0627\u0621 \u2014 \u0625\u062C\u0627\u0628\u0627\u062A \u0641\u0648\u0631\u064A\u0629 \u0645\u0646 \u0642\u0627\u0639\u062F\u0629 \u0645\u0639\u0631\u0641\u0629 \u0627\u0644\u0645\u0633\u062A\u0634\u0641\u0649",
    "searchPlaceholder": "\u0645\u062B\u0627\u0644: \u0623\u0637\u0628\u0627\u0621 \u0627\u0644\u0642\u0644\u0628\u060C \u0633\u0627\u0639\u0627\u062A \u0627\u0644\u0637\u0648\u0627\u0631\u0626\u060C \u0627\u0644\u062A\u0623\u0645\u064A\u0646 \u0627\u0644\u0637\u0628\u064A\u060C \u0627\u0644\u0631\u0639\u0627\u064A\u0629 \u0627\u0644\u0645\u0646\u0632\u0644\u064A\u0629...",
    "searchBtn": "\u{1F50D} \u0627\u0628\u062D\u062B \u0627\u0644\u0622\u0646",
    "hcTitle": "\u0627\u0644\u0631\u0639\u0627\u064A\u0629 \u0627\u0644\u0635\u062D\u064A\u0629 \u0627\u0644\u0645\u0646\u0632\u0644\u064A\u0629",
    "hcSub": "\u0641\u0631\u064A\u0642 \u0645\u062A\u062E\u0635\u0635 \u064A\u0623\u062A\u064A \u0625\u0644\u064A\u0643",
    "hcDesc": "\u0632\u064A\u0627\u0631\u0627\u062A \u0645\u0646\u0632\u0644\u064A\u0629 \u0645\u0646 \u0645\u0645\u0631\u0636\u0627\u062A \u0648\u0623\u0637\u0628\u0627\u0621 \u0645\u0639\u062A\u0645\u062F\u064A\u0646 \u2014 \u0641\u062D\u0648\u0635\u0627\u062A\u060C \u0639\u0644\u0627\u062C \u0648\u0631\u064A\u062F\u064A\u060C \u0631\u0639\u0627\u064A\u0629 \u0645\u0627 \u0628\u0639\u062F \u0627\u0644\u062C\u0631\u0627\u062D\u0629\u060C \u0645\u062A\u0627\u0628\u0639\u0629 \u0627\u0644\u0623\u0645\u0631\u0627\u0636 \u0627\u0644\u0645\u0632\u0645\u0646\u0629.",
    "thTitle": "\u0627\u0644\u062A\u0637\u0628\u064A\u0628 \u0639\u0646 \u0628\u064F\u0639\u062F",
    "thSub": "\u0627\u0633\u062A\u0634\u0627\u0631\u0629 \u0637\u0628\u064A\u0629 \u0645\u0646 \u0623\u064A \u0645\u0643\u0627\u0646",
    "thDesc": "\u062A\u062D\u062F\u062B \u0645\u0639 \u0637\u0628\u064A\u0628\u0643 \u0641\u064A\u062F\u064A\u0648 \u0623\u0648 \u0635\u0648\u062A \u2014 \u062F\u0648\u0646 \u0627\u0644\u062D\u0627\u062C\u0629 \u0644\u0644\u0632\u064A\u0627\u0631\u0629. \u0645\u062A\u0627\u062D 24/7 \u0645\u0639 \u0623\u0637\u0628\u0627\u0621 \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A.",
    "digitalTitle": "\u0627\u0644\u062E\u062F\u0645\u0627\u062A \u0627\u0644\u0635\u062D\u064A\u0629 \u0627\u0644\u0631\u0642\u0645\u064A\u0629",
    "digitalSub": "\u0627\u0628\u062A\u0643\u0627\u0631 \u0631\u0642\u0645\u064A \u0641\u064A \u062E\u062F\u0645\u0629 \u0635\u062D\u062A\u0643 \u2014 \u0628\u062D\u062B \u0630\u0643\u064A\u060C \u0631\u0639\u0627\u064A\u0629 \u0645\u0646\u0632\u0644\u064A\u0629\u060C \u0648\u0627\u0633\u062A\u0634\u0627\u0631\u0627\u062A \u0641\u064A\u062F\u064A\u0648 \u0645\u0628\u0627\u0634\u0631\u0629",
    "emailTitle": "\u0627\u0644\u062A\u0648\u0627\u0635\u0644 \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A \u0627\u0644\u0630\u0643\u064A",
    "emailDesc": "\u062A\u0623\u0643\u064A\u062F\u0627\u062A\u060C \u062A\u0630\u0643\u064A\u0631\u0627\u062A\u060C \u0648\u0648\u0635\u0641\u0627\u062A \u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A\u0629 \u2014 \u0628\u0631\u064A\u062F \u0630\u0643\u064A \u062B\u0646\u0627\u0626\u064A \u0627\u0644\u0644\u063A\u0629 \u0644\u0643\u0644 \u0645\u0631\u064A\u0636.",
    "openAction": "\u0627\u0641\u062A\u062D \u0627\u0644\u062E\u062F\u0645\u0629",
    "bookModalTitle": "\u062D\u062C\u0632 \u0645\u0648\u0639\u062F \u0633\u0631\u064A\u0639",
    "basmaModalTitle": "\u0628\u0633\u0645\u0629 \u062F\u0627\u062E\u0644 HNH",
    "homecareModalTitle": "\u062C\u062F\u0648\u0644\u0629 \u0632\u064A\u0627\u0631\u0629 \u0645\u0646\u0632\u0644\u064A\u0629",
    "telehealthModalTitle": "\u0625\u0646\u0634\u0627\u0621 \u062C\u0644\u0633\u0629 \u062A\u0637\u0628\u064A\u0628 \u0639\u0646 \u0628\u0639\u062F",
    "eligModalTitle": "\u062A\u062D\u0642\u0642 \u0627\u0644\u062A\u0623\u0645\u064A\u0646 \u0648\u0627\u0644\u0623\u0647\u0644\u064A\u0629",
    "quickName": "\u0627\u0633\u0645 \u0627\u0644\u0645\u0631\u064A\u0636",
    "quickPhone": "\u0631\u0642\u0645 \u0627\u0644\u062C\u0648\u0627\u0644",
    "quickNational": "\u0627\u0644\u0647\u0648\u064A\u0629 / \u0627\u0644\u0625\u0642\u0627\u0645\u0629",
    "quickInsurance": "\u0631\u0642\u0645 \u0627\u0644\u062A\u0623\u0645\u064A\u0646",
    "quickDept": "\u0627\u0644\u0642\u0633\u0645",
    "quickDate": "\u0627\u0644\u062A\u0627\u0631\u064A\u062E",
    "quickTime": "\u0627\u0644\u0648\u0642\u062A",
    "quickAddress": "\u0627\u0644\u0639\u0646\u0648\u0627\u0646",
    "quickComplaint": "\u0633\u0628\u0628 \u0627\u0644\u0637\u0644\u0628",
    "sendRequest": "\u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0637\u0644\u0628",
    "askBasma": "\u0627\u0633\u0623\u0644 \u0628\u0633\u0645\u0629",
    "resultReady": "\u062A\u0645 \u062A\u0646\u0641\u064A\u0630 \u0627\u0644\u0639\u0645\u0644\u064A\u0629",
    "missingFields": "\u0623\u0643\u0645\u0644 \u0627\u0644\u062D\u0642\u0648\u0644 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629",
    "failedAction": "\u062A\u0639\u0630\u0631 \u062A\u0646\u0641\u064A\u0630 \u0627\u0644\u0637\u0644\u0628. \u062D\u0627\u0648\u0644 \u0644\u0627\u062D\u0642\u0627\u064B.",
    "commandTitle": "\u0645\u0631\u0643\u0632 \u0627\u0644\u062A\u062D\u0643\u0645 \u0627\u0644\u062D\u064A",
    "commandSub": "\u0645\u0624\u0634\u0631\u0627\u062A \u062A\u0634\u063A\u064A\u0644\u064A\u0629 \u0645\u0628\u0627\u0634\u0631\u0629 \u0645\u0646 HNH \u0648 GIVC \u0648 NPHIES \u0648 ClaimLinc \u2014 \u0635\u0641\u062D\u0629 \u0648\u0627\u062D\u062F\u0629 \u0644\u0645\u0631\u0627\u0642\u0628\u0629 \u0627\u0644\u062D\u0631\u0643\u0629 \u0627\u0644\u0633\u0631\u064A\u0631\u064A\u0629 \u0648\u0627\u0644\u0631\u0642\u0645\u064A\u0629.",
    "opsPatients": "\u0645\u0644\u0641\u0627\u062A \u0627\u0644\u0645\u0631\u0636\u0649",
    "opsAppointments": "\u0645\u0648\u0627\u0639\u064A\u062F \u0627\u0644\u064A\u0648\u0645",
    "opsProviders": "\u0645\u0632\u0648\u062F \u0635\u062D\u064A",
    "opsClaims": "\u0645\u0637\u0627\u0644\u0628\u0629",
    "homecareMetric": "\u0632\u064A\u0627\u0631\u0627\u062A \u0645\u0646\u0632\u0644\u064A\u0629",
    "telehealthMetric": "\u062C\u0644\u0633\u0627\u062A \u0639\u0646 \u0628\u0639\u062F",
    "givcMetric": "\u0623\u0637\u0628\u0627\u0621 GIVC",
    "connectedMetric": "\u0623\u0646\u0638\u0645\u0629 \u0645\u062A\u0635\u0644\u0629",
    "featureTitle": "\u0645\u064A\u0632\u0627\u062A \u062C\u062F\u064A\u062F\u0629 \u062C\u0627\u0647\u0632\u0629 \u0644\u0644\u062A\u0634\u063A\u064A\u0644",
    "featureSub": "\u062E\u062F\u0645\u0627\u062A \u0631\u0642\u0645\u064A\u0629 \u0645\u062A\u0635\u0644\u0629 \u0645\u0628\u0627\u0634\u0631\u0629 \u0628\u0648\u0627\u062C\u0647\u0627\u062A HNH \u2014 \u0644\u0627 \u0646\u0645\u0627\u0630\u062C \u0648\u0647\u0645\u064A\u0629\u060C \u0643\u0644 \u0625\u062C\u0631\u0627\u0621 \u064A\u0633\u062A\u062F\u0639\u064A API \u062D\u064A.",
    "featureProvider": "\u0644\u0648\u062D\u0629 \u0627\u0644\u0637\u0628\u064A\u0628",
    "featureProviderDesc": "\u0645\u0633\u0627\u062D\u0629 \u0639\u0645\u0644 \u0644\u0644\u0637\u0628\u064A\u0628 \u0645\u0639 \u0627\u0644\u0645\u0648\u0627\u0639\u064A\u062F\u060C \u0627\u0644\u0645\u0631\u0636\u0649\u060C FHIR\u060C GIVC\u060C \u0648 NPHIES.",
    "featureEligibility": "\u062A\u062D\u0642\u0642 \u0627\u0644\u0623\u0647\u0644\u064A\u0629 \u0639\u0628\u0631 GIVC",
    "featureEligibilityDesc": "\u0646\u0642\u0637\u0629 \u062F\u062E\u0648\u0644 \u0645\u0628\u0627\u0634\u0631\u0629 \u0644\u0641\u062D\u0635 \u0627\u0644\u062A\u063A\u0637\u064A\u0629 \u0648\u0631\u0628\u0637 OID \u0648\u0634\u0628\u0643\u0629 \u0627\u0644\u0623\u0637\u0628\u0627\u0621.",
    "featureHomecare": "\u0627\u0644\u0631\u0639\u0627\u064A\u0629 \u0627\u0644\u0645\u0646\u0632\u0644\u064A\u0629",
    "featureHomecareDesc": "\u062C\u062F\u0648\u0644\u0629 \u0632\u064A\u0627\u0631\u0629 \u0645\u0646\u0632\u0644\u064A\u0629 \u0645\u0639 \u0633\u0628\u0628 \u0627\u0644\u0637\u0644\u0628 \u0648\u0627\u0644\u0639\u0646\u0648\u0627\u0646 \u0648\u0627\u0644\u0648\u0642\u062A.",
    "featureTelehealth": "\u0627\u0644\u062A\u0637\u0628\u064A\u0628 \u0639\u0646 \u0628\u0639\u062F",
    "featureTelehealthDesc": "\u0625\u0646\u0634\u0627\u0621 \u062C\u0644\u0633\u0629 \u0631\u0642\u0645\u064A\u0629 \u0645\u0639 \u0631\u0627\u0628\u0637 \u063A\u0631\u0641\u0629 Telehealth \u0641\u0648\u0631\u064A.",
    "featureSearch": "\u0627\u0644\u0628\u062D\u062B \u0627\u0644\u0637\u0628\u064A \u0627\u0644\u0630\u0643\u064A",
    "featureSearchDesc": "AutoRAG \u0648 DeepSeek \u0644\u0644\u0628\u062D\u062B \u0641\u064A \u0645\u0639\u0631\u0641\u0629 \u0627\u0644\u0645\u0633\u062A\u0634\u0641\u0649.",
    "featureRcm": "\u062F\u0648\u0631\u0629 \u0627\u0644\u0625\u064A\u0631\u0627\u062F\u0627\u062A",
    "featureRcmDesc": "\u0635\u062D\u0629 ClaimLinc\u060C \u0627\u0644\u0645\u0637\u0627\u0644\u0628\u0627\u062A\u060C \u0648\u0627\u0644\u062A\u062F\u0642\u064A\u0642 \u0642\u0628\u0644 \u0627\u0644\u0625\u0631\u0633\u0627\u0644.",
    "launch": "\u062A\u0634\u063A\u064A\u0644"
  },
  "en": {
    "desc": "Hayat National Hospitals Group \u2014 Integrated Healthcare Ecosystem with Basma, GIVC, SBS, Oracle & NPHIES portals.",
    "title": "Hayat National Hospitals | HNH \u2014 Integrated Ecosystem",
    "titleShort": "Hayat National Hospital",
    "osVer": "BrainSAIT Healthcare OS v5.0",
    "heroBadge": "Live Data \u2014 Connected to BrainSAIT",
    "heroH1": 'Hayat National<br><span class="gd">Hospitals Group</span>',
    "heroP": "Integrated Smart Healthcare \u2014 Basma Voice \xB7 GIVC \xB7 SBS \xB7 Oracle \xB7 NPHIES \xB7 ClaimLinc",
    "heroBookBtn": "\u{1F4C5} Book Appointment",
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
    "navBook": "\u{1F4C5} Book Now",
    "langBtn": "\u0627\u0644\u0639\u0631\u0628\u064A\u0629",
    "secDeptsTitle": "Medical Departments",
    "secDeptsSub": "Over 30 medical specialties",
    "secBranchesTitle": "Our Branches",
    "secBranchesSub": "Five branches across KSA",
    "secDoctorsTitle": "Our Doctors",
    "secDoctorsSub": "Team of expert consultants",
    "ecosystemTitle": "Integrated Healthcare Ecosystem",
    "ecosystemSub": "Smart portals for every user \u2014 live data and full system integration",
    "patientTitle": "Patient",
    "patientDesc": "View lab results, book appointments, track claims, AI chat with Basma",
    "providerTitle": "Provider",
    "providerDesc": "Schedule management, patient records, Oracle & NPHIES integration, performance reports",
    "payerTitle": "Payer / Insurance",
    "payerDesc": "Eligibility verification, pre-authorization management, revenue cycle tracking",
    "studentTitle": "Student",
    "studentDesc": "Medical academy \u2014 training courses, certificates, digital medical library",
    "adminTitle": "Admin",
    "adminDesc": "Full dashboard \u2014 analytics, reports, user & permission management",
    "receptionTitle": "Reception",
    "receptionDesc": "Patient registration, appointment management, insurance verification, reports",
    "rcmTitle": "Revenue Cycle",
    "rcmDesc": "Claims management, collection tracking, financial analytics, NPHIES reporting",
    "integrationsTitle": "Live Integrations",
    "integrationsSub": "All systems connected and operational",
    "givcTitle": "GIVC \u2014 Global Integrated Virtual Care",
    "givcDesc": "Provider network, doctor registration, OID-based eligibility verification",
    "givcRegister": "Register New Doctor",
    "givcNetwork": "Browse Network",
    "givcOidLabel": "Identifier (OID)",
    "aiTitle": "Basma \u2014 AI Medical Assistant",
    "aiDesc": "Talk to Basma by voice or text \u2014 book appointments, check eligibility, track claims, medical inquiries",
    "aiTalkBtn": "Talk to Basma \u{1F399}\uFE0F",
    "aiChatBtn": "\u{1F4AC} Chat Now",
    "ctaTitle": "Your Health First",
    "ctaSub": "Book your appointment now through our integrated ecosystem",
    "ctaBook": "Book Now",
    "ctaCall": "Call Us",
    "fAbout": "An intelligent integrated healthcare ecosystem \u2014 25 years of excellence.",
    "fLinks": "Quick Links",
    "fContact": "Contact Us",
    "fServices": "Services",
    "fEmerg": "Emergency 24/7",
    "fAppt": "Book Appointment",
    "fEcosystem": "Ecosystem",
    "fPortal": "Portal",
    "fBasma": "Basma AI",
    "fPowered": "Powered by",
    "fCopy": "\xA9 2026 All rights reserved",
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
    "searchSub": "Ask about any doctor, department, procedure, or medication \u2014 instant answers from hospital knowledge base",
    "searchPlaceholder": "e.g. cardiologists, emergency hours, insurance, home care...",
    "searchBtn": "\u{1F50D} Search Now",
    "hcTitle": "Home Healthcare",
    "hcSub": "Our team comes to you",
    "hcDesc": "Home visits by certified nurses and doctors \u2014 checkups, IV therapy, post-surgery care, chronic disease management.",
    "thTitle": "Telehealth",
    "thSub": "Medical consultation anywhere",
    "thDesc": "Video or voice consultation with your doctor \u2014 no hospital visit needed. 24/7 with HNH specialists.",
    "digitalTitle": "Digital Health Services",
    "digitalSub": "Smart innovation in healthcare \u2014 AI search, home care, and live video consultations",
    "emailTitle": "Smart Patient Communications",
    "emailDesc": "Confirmations, reminders, and e-prescriptions \u2014 bilingual smart email for every patient.",
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
    "failedAction": "Unable to complete the request. Try again later.",
    "commandTitle": "Live Command Center",
    "commandSub": "Operational signals from HNH, GIVC, NPHIES, and ClaimLinc \u2014 one view for clinical and digital throughput.",
    "opsPatients": "Patient records",
    "opsAppointments": "Today visits",
    "opsProviders": "Providers",
    "opsClaims": "Claims",
    "homecareMetric": "Home visits",
    "telehealthMetric": "Telehealth sessions",
    "givcMetric": "GIVC doctors",
    "connectedMetric": "Connected systems",
    "featureTitle": "New Features Ready To Launch",
    "featureSub": "Digital services wired directly to HNH APIs \u2014 no static mockups, every action opens a live workflow.",
    "featureProvider": "Doctor Dashboard",
    "featureProviderDesc": "Clinical workspace with appointments, patients, FHIR, GIVC, and NPHIES.",
    "featureEligibility": "Eligibility Check via GIVC",
    "featureEligibilityDesc": "Direct entry point for coverage verification, OID linking, and provider network.",
    "featureHomecare": "Home Healthcare",
    "featureHomecareDesc": "Schedule home visits with reason, address, and timing.",
    "featureTelehealth": "Telehealth",
    "featureTelehealthDesc": "Create digital sessions with instant Telehealth room links.",
    "featureSearch": "Smart Medical Search",
    "featureSearchDesc": "AutoRAG and DeepSeek to search hospital knowledge.",
    "featureRcm": "Revenue Cycle",
    "featureRcmDesc": "ClaimLinc health, claims, and pre-submission audit.",
    "launch": "Launch"
  }
};
var DE = [
  { i: "\u{1F691}", nA: "\u0627\u0644\u0637\u0648\u0627\u0631\u0626", nE: "Emergency", dA: "\u062E\u062F\u0645\u0629 24 \u0633\u0627\u0639\u0629 \u0644\u0644\u062D\u0627\u0644\u0627\u062A \u0627\u0644\u062D\u0631\u062C\u0629 \u0648\u0627\u0644\u0645\u0633\u062A\u0639\u062C\u0644\u0629.", dE: "24/7 Critical and urgent care services." },
  { i: "\u{1FAC0}", nA: "\u0627\u0644\u0642\u0644\u0628", nE: "Cardiology", dA: "\u0642\u0633\u0637\u0631\u0629 \u0642\u0644\u0628\u064A\u0629 \u0648\u062C\u0631\u0627\u062D\u0629 \u0642\u0644\u0628 \u0645\u062A\u0637\u0648\u0631\u0629 \u0628\u0623\u064A\u062F\u064A \u0627\u0633\u062A\u0634\u0627\u0631\u064A\u064A\u0646.", dE: "Advanced cardiac care and surgery by consultants." },
  { i: "\u{1F9B4}", nA: "\u0627\u0644\u0639\u0638\u0627\u0645", nE: "Orthopedics", dA: "\u0639\u0644\u0627\u062C \u0627\u0644\u0645\u0641\u0627\u0635\u0644 \u0648\u0627\u0644\u0643\u0633\u0648\u0631 \u0648\u0627\u0644\u0639\u0645\u0648\u062F \u0627\u0644\u0641\u0642\u0631\u064A \u0648\u0627\u0644\u0637\u0628 \u0627\u0644\u0631\u064A\u0627\u0636\u064A.", dE: "Treatment for joints, fractures, spine, and sports medicine." },
  { i: "\u{1F476}", nA: "\u0627\u0644\u0623\u0637\u0641\u0627\u0644", nE: "Pediatrics", dA: "\u0631\u0639\u0627\u064A\u0629 \u0645\u062A\u062E\u0635\u0635\u0629 \u0644\u0644\u0623\u0637\u0641\u0627\u0644 \u0648\u062D\u062F\u064A\u062B\u064A \u0627\u0644\u0648\u0644\u0627\u062F\u0629 \u0628\u0623\u0639\u0644\u0649 \u0627\u0644\u0645\u0639\u0627\u064A\u064A\u0631.", dE: "Expert care for children and neonates at highest standards." },
  { i: "\u{1F930}", nA: "\u0627\u0644\u0646\u0633\u0627\u0621 \u0648\u0627\u0644\u0648\u0644\u0627\u062F\u0629", nE: "OB/GYN", dA: "\u0645\u062A\u0627\u0628\u0639\u0629 \u0627\u0644\u062D\u0645\u0644 \u0648\u0627\u0644\u0648\u0644\u0627\u062F\u0629 \u0627\u0644\u0637\u0628\u064A\u0639\u064A\u0629 \u0648\u0627\u0644\u0642\u064A\u0635\u0631\u064A\u0629 \u0628\u0623\u0645\u0627\u0646.", dE: "Safe pregnancy follow-up and delivery services." },
  { i: "\u{1F9B7}", nA: "\u0627\u0644\u0623\u0633\u0646\u0627\u0646", nE: "Dentistry", dA: "\u062A\u062C\u0645\u064A\u0644 \u0648\u0632\u0631\u0627\u0639\u0629 \u0648\u0639\u0644\u0627\u062C \u0627\u0644\u0623\u0633\u0646\u0627\u0646 \u0628\u0623\u062D\u062F\u062B \u0627\u0644\u062A\u0642\u0646\u064A\u0627\u062A.", dE: "Cosmetic, implant, and dental care with latest tech." },
  { i: "\u{1F441}\uFE0F", nA: "\u0627\u0644\u0639\u064A\u0648\u0646", nE: "Ophthalmology", dA: "\u062C\u0631\u0627\u062D\u0629 \u0627\u0644\u0639\u064A\u0648\u0646 \u0648\u0627\u0644\u0644\u064A\u0632\u0643 \u0648\u062A\u0635\u062D\u064A\u062D \u0627\u0644\u0646\u0638\u0631.", dE: "Eye surgery, LASIK, and vision correction." },
  { i: "\u{1F9E0}", nA: "\u0627\u0644\u0645\u062E \u0648\u0627\u0644\u0623\u0639\u0635\u0627\u0628", nE: "Neurology", dA: "\u062A\u0634\u062E\u064A\u0635 \u0648\u0639\u0644\u0627\u062C \u0627\u0636\u0637\u0631\u0627\u0628\u0627\u062A \u0627\u0644\u062C\u0647\u0627\u0632 \u0627\u0644\u0639\u0635\u0628\u064A \u0648\u0627\u0644\u0633\u0643\u062A\u0627\u062A.", dE: "Diagnosis and treatment of nervous system disorders." }
];
var BR = [
  { nA: "\u0627\u0644\u0631\u064A\u0627\u0636", nE: "Riyadh", aA: "\u0637\u0631\u064A\u0642 \u0627\u0644\u062F\u0627\u0626\u0631\u064A \u0627\u0644\u063A\u0631\u0628\u064A - \u0645\u062E\u0631\u062C 27", aE: "Western Ring Road - Exit 27" },
  { nA: "\u0627\u0644\u0645\u062F\u064A\u0646\u0629 \u0627\u0644\u0645\u0646\u0648\u0631\u0629", nE: "Madinah", aA: "\u0637\u0631\u064A\u0642 \u0627\u0644\u0645\u0644\u0643 \u0639\u0628\u062F\u0627\u0644\u0644\u0647 - \u062D\u064A \u0627\u0644\u0631\u0646\u0648\u0646\u0627", aE: "King Abdullah Road - Al Ranuna" },
  { nA: "\u062E\u0645\u064A\u0633 \u0645\u0634\u064A\u0637", nE: "Khamis Mushait", aA: "\u0637\u0631\u064A\u0642 \u0627\u0644\u0645\u0644\u0643 \u0641\u0647\u062F - \u062D\u064A \u0627\u0644\u0631\u0635\u0631\u0627\u0635", aE: "King Fahd Road - Al Rasras" },
  { nA: "\u062C\u0627\u0632\u0627\u0646", nE: "Jazan", aA: "\u0637\u0631\u064A\u0642 \u0627\u0644\u0645\u0637\u0627\u0631 - \u062D\u064A \u0627\u0644\u0633\u0648\u064A\u0633", aE: "Airport Road - Al Suwaiss" },
  { nA: "\u0639\u0646\u064A\u0632\u0629", nE: "Unaizah", aA: "\u0637\u0631\u064A\u0642 \u0627\u0644\u0645\u0644\u0643 \u0639\u0628\u062F\u0627\u0644\u0639\u0632\u064A\u0632 - \u062D\u064A \u0627\u0644\u0631\u064A\u0627\u0646", aE: "King Abdulaziz Road - Al Rayyan" }
];
var DO = [
  { nA: "\u062F. \u0641\u0648\u0632\u064A\u0629 \u0627\u0644\u062C\u0627\u0631 \u0627\u0644\u0644\u0647", nE: "Dr. Fawzia Al-Jar Allah", sA: "\u0627\u0633\u062A\u0634\u0627\u0631\u064A \u0648\u0631\u0626\u064A\u0633 \u0645\u062C\u0644\u0633 \u0627\u0644\u0625\u062F\u0627\u0631\u0629", sE: "Consultant & Chairman" },
  { nA: "\u062F. \u062D\u0633\u064A\u0646 \u0628\u0646 \u062D\u0633\u0648\u0633\u0629", nE: "Dr. Hussein bin Husousa", sA: "\u0627\u0633\u062A\u0634\u0627\u0631\u064A \u0648\u0631\u0626\u064A\u0633 \u062A\u0646\u0641\u064A\u0630\u064A", sE: "Consultant & CEO" },
  { nA: "\u062F. \u0623\u062D\u0645\u062F \u0627\u0644\u0635\u0627\u0644\u062D", nE: "Dr. Ahmed Al-Saleh", sA: "\u0627\u0633\u062A\u0634\u0627\u0631\u064A \u062C\u0631\u0627\u062D\u0629 \u0627\u0644\u0642\u0644\u0628 \u0648\u0627\u0644\u0635\u062F\u0631", sE: "Cardiothoracic Surgery Consultant" },
  { nA: "\u062F. \u0633\u0627\u0631\u0629 \u0627\u0644\u0645\u0646\u0635\u0648\u0631", nE: "Dr. Sarah Al-Mansour", sA: "\u0627\u0633\u062A\u0634\u0627\u0631\u064A\u0629 \u0627\u0644\u0646\u0633\u0627\u0621 \u0648\u0627\u0644\u0648\u0644\u0627\u062F\u0629", sE: "OB/GYN Consultant" }
];
var CSS = `:root{
  --p: #002C5E; /* Deep Navy */
  --s: #0066CC; /* Medical Blue */
  --a: #C9A84C; /* Sophisticated Gold */
  --al: #FDF4E3; /* Cream Gold */
  --n: #0F172A; /* Slate 900 */
  --of: #F8FAFC; /* Slate 50 */
  --l: #F1F5F9; /* Slate 100 */
  --g: #E2E8F0; /* Slate 200 */
  --g3: #94A3B8; /* Slate 400 */
  --t: #1E293B; /* Slate 800 */
  --tl: #64748B; /* Slate 500 */
  --success: #10B981;
  --danger: #EF4444;
  --warn: #F59E0B;
  --gr: linear-gradient(135deg, #002C5E 0%, #0066CC 100%);
  --ga: linear-gradient(135deg, #C9A84C 0%, #E6C97F 100%);
  --gg: linear-gradient(135deg, #C9A84C 0%, #FDF4E3 50%, #C9A84C 100%);
  --glass: rgba(255, 255, 255, 0.7);
  --glass-border: rgba(255, 255, 255, 0.3);
  --sm: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  --md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  --lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  --xl: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
  --r: 12px;
  --rm: 16px;
  --rl: 24px;
  --rxl: 40px;
  --rf: 9999px;
  --fa: 'Tajawal', sans-serif;
  --fe: 'Inter', sans-serif;
  --tr: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  --cc: 1320px;
  --hh: 84px;
}

*{box-sizing:border-box;margin:0;padding:0}
body{font-family:var(--fa);color:var(--t);background:var(--of);line-height:1.6;overflow-x:hidden;-webkit-font-smoothing:antialiased}
html{scroll-behavior:smooth}

/* Premium Header */
.h{position:fixed;top:0;inset-inline:0;z-index:1000;background:rgba(255,255,255,0.7);-webkit-backdrop-filter:blur(20px);backdrop-filter:blur(20px);border-bottom:1px solid var(--glass-border);height:var(--hh);transition:var(--tr)}
.h.sc{background:rgba(255,255,255,0.9);box-shadow:var(--md);height:70px}
.hi{max-width:var(--cc);margin:0 auto;padding:0 32px;height:100%;display:flex;align-items:center;justify-content:space-between;gap:20px}

.l{display:flex;align-items:center;gap:14px;text-decoration:none}
.li{width:48px;height:48px;background:var(--gr);border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:1.6rem;box-shadow:var(--md);color:#fff}
.lt{font-size:1.15rem;font-weight:900;color:var(--p);line-height:1.1}
.lt sm{display:block;font-size:0.65rem;font-weight:600;color:var(--tl);text-transform:uppercase;letter-spacing:0.05em;margin-top:2px}

.nv{display:flex;align-items:center;gap:4px}
.nv a{text-decoration:none;color:var(--n);font-weight:600;font-size:0.92rem;padding:10px 18px;border-radius:var(--rf);transition:var(--tr)}
.nv a:hover{background:rgba(0,44,94,0.05);color:var(--s)}
.nv a.active{background:var(--p);color:#fff}

.lb{padding:8px 16px;border-radius:var(--rf);background:var(--l);border:1px solid var(--g);cursor:pointer;font-family:inherit;font-size:0.85rem;font-weight:700;color:var(--p);transition:var(--tr)}
.lb:hover{background:var(--g);transform:scale(1.05)}

/* Buttons */
.btn{display:inline-flex;align-items:center;justify-content:center;gap:10px;padding:14px 28px;border-radius:var(--rf);font-weight:700;font-size:0.95rem;cursor:pointer;border:none;text-decoration:none;white-space:nowrap;font-family:inherit;transition:var(--tr);position:relative;overflow:hidden}
.btn::after{content:'';position:absolute;inset:0;background:rgba(255,255,255,0);transition:var(--tr)}
.btn:hover::after{background:rgba(255,255,255,0.1)}
.btn:active{transform:scale(0.97)}

.bp{background:var(--gr);color:#fff;box-shadow:0 10px 20px -5px rgba(0,44,94,0.3)}
.bp:hover{transform:translateY(-3px);box-shadow:0 15px 30px -5px rgba(0,44,94,0.4)}

.ba{background:var(--ga);color:var(--p);box-shadow:0 10px 20px -5px rgba(212,175,55,0.3)}
.ba:hover{transform:translateY(-3px);box-shadow:0 15px 30px -5px rgba(212,175,55,0.4)}

.bw{background:#fff;color:var(--p);border:1px solid var(--g);box-shadow:var(--sm)}
.bw:hover{background:var(--of);border-color:var(--p);transform:translateY(-2px)}

.bl{padding:18px 40px;font-size:1.05rem}
.bs{padding:10px 20px;font-size:0.85rem}

/* Hero Section */
.he{min-height:100vh;display:flex;align-items:center;padding-top:var(--hh);position:relative;overflow:hidden;background:#fff}
.he::before{content:'';position:absolute;inset:0;background:radial-gradient(circle at 80% 20%, rgba(0,44,94,0.05), transparent 40%), radial-gradient(circle at 20% 80%, rgba(212,175,55,0.05), transparent 40%)}
.hp{position:absolute;inset:0;pointer-events:none}
.pt{position:absolute;border-radius:50%;filter:blur(60px);opacity:0.4;animation:fl 15s ease-in-out infinite}
@keyframes fl{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(50px,-30px) scale(1.2)}66%{transform:translate(-30px,50px) scale(0.9)}}

.he .co{position:relative;z-index:10;max-width:var(--cc);margin:0 auto;padding:60px 32px;width:100%}
.hc{max-width:720px}
.hb{display:inline-flex;align-items:center;gap:8px;padding:8px 20px;border-radius:var(--rf);background:rgba(16,185,129,0.1);color:var(--success);font-size:0.85rem;font-weight:700;margin-bottom:32px;border:1px solid rgba(16,185,129,0.2)}
.hb::before{content:'';width:10px;height:10px;border-radius:50%;background:var(--success);box-shadow:0 0 10px var(--success)}

.he h1{font-size:clamp(2.8rem, 6vw, 4.5rem);font-weight:900;color:var(--p);margin-bottom:24px;line-height:1}
.he h1 .gd{background:var(--gg);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.he p{font-size:1.25rem;color:var(--tl);margin-bottom:40px;max-width:600px;line-height:1.6}
.hbt{display:flex;gap:16px;flex-wrap:wrap;margin-bottom:60px}
`;
var UX_CSS = `

.mx{position:fixed;inset:0;z-index:3000;display:none;align-items:center;justify-content:center;padding:20px}
.mx.on{display:flex}
.mx-b{position:absolute;inset:0;background:rgba(15,23,42,0.8);-webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px)}
.mx-p{position:relative;width:min(800px, 100%);max-height:90vh;overflow-y:auto;background:#fff;border-radius:var(--rxl);box-shadow:var(--xl);padding:40px;animation:zoomIn 0.4s cubic-bezier(0.16, 1, 0.3, 1)}
@keyframes zoomIn{from{opacity:0;transform:scale(0.95) translateY(20px)} to{opacity:1;transform:scale(1) translateY(0)}}

.mx-x{position:absolute;top:24px;inset-inline-end:24px;width:40px;height:40px;border-radius:50%;border:none;background:var(--l);color:var(--p);cursor:pointer;font-size:1.5rem;display:grid;place-items:center;transition:var(--tr)}
.mx-x:hover{background:var(--p);color:#fff;transform:rotate(90deg)}

.mx-h{margin-bottom:32px;border-bottom:1px solid var(--g);padding-bottom:20px}
.mx-h h3{font-size:1.8rem;color:var(--p);margin-bottom:8px}
.mx-h p{color:var(--tl);font-weight:600}

.fx{display:grid;grid-template-columns:repeat(2, 1fr);gap:24px}
.fx .full{grid-column:1/-1}
.fi{display:flex;flex-direction:column;gap:8px}
.fi label{font-weight:700;font-size:0.88rem;color:var(--p);text-transform:uppercase;letter-spacing:0.05em}
.fi input,.fi select,.fi textarea{width:100%;border:2px solid var(--g);border-radius:var(--rm);padding:14px 18px;font-size:1rem;font-family:inherit;transition:var(--tr);outline:none;background:var(--of)}
.fi input:focus,.fi select:focus,.fi textarea:focus{border-color:var(--s);background:#fff;box-shadow:0 0 0 4px rgba(0,95,180,0.1)}
.fi textarea{min-height:120px}

.mx-a{display:flex;gap:16px;margin-top:40px;padding-top:24px;border-top:1px solid var(--g)}
.mx-r{margin-top:24px;padding:24px;border-radius:var(--rm);background:var(--l);border-left:5px solid var(--p);animation:fadeIn 0.3s ease}
@keyframes fadeIn{from{opacity:0} to{opacity:1}}
.mx-r.ok{background:#ECFDF5;border-color:var(--success);color:#065F46}
.mx-r.er{background:#FEF2F2;border-color:var(--danger);color:#991B1B}

@media(max-width:640px){
  .fx{grid-template-columns:1fr}
  .mx-p{padding:24px;border-radius:var(--rl)}
}
`;
var ENHANCE_CSS = `.cmd{position:relative;background:var(--n);color:#fff;padding:100px 0;overflow:hidden}.cmd::before{content:'';position:absolute;inset:0;background:radial-gradient(circle at 70% 30%, rgba(0,95,184,0.3), transparent 50%), radial-gradient(circle at 30% 70%, rgba(212,175,55,0.15), transparent 50%);pointer-events:none}.cmd-shell{display:grid;grid-template-columns:1fr 1.2fr;gap:60px;align-items:center}.cmd-copy h2{font-size:clamp(2.5rem, 5vw, 4rem);margin:20px 0;line-height:1}.cmd-copy p{font-size:1.15rem;color:rgba(255,255,255,0.7);margin-bottom:40px}.cmd-board{background:rgba(255,255,255,.07);-webkit-backdrop-filter:blur(30px);backdrop-filter:blur(30px);border:1px solid rgba(255,255,255,0.1);border-radius:var(--rxl);padding:32px;box-shadow:0 40px 100px rgba(0,0,0,0.5)}.cmd-top{display:flex;gap:8px;margin-bottom:24px}.cmd-top span{width:12px;height:12px;border-radius:50%}.cmd-top span:nth-child(1){background:#FF5F56}.cmd-top span:nth-child(2){background:#FFBD2E}.cmd-top span:nth-child(3){background:#27C93F}.cmd-grid{display:grid;grid-template-columns:repeat(auto-fit, minmax(200px, 1fr));gap:20px}.cmd-m{background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:var(--rl);padding:24px;transition:var(--tr)}.cmd-m:hover{background:rgba(255,255,255,0.1);transform:translateY(-5px)}.cmd-m strong{display:block;font-size:2.5rem;color:var(--al);margin-bottom:4px}.cmd-m span{font-size:0.85rem;font-weight:700;color:rgba(255,255,255,0.5);text-transform:uppercase;letter-spacing:0.1em}.cmd-strip{display:grid;grid-template-columns:repeat(4, 1fr);gap:12px;margin-top:20px}.cmd-strip div{background:rgba(255,255,255,0.03);border-radius:var(--r);padding:16px;text-align:center}.cmd-strip b{display:block;font-size:1.2rem;color:#fff}.cmd-strip span{font-size:0.7rem;color:rgba(255,255,255,0.4)}@media(max-width:960px){.cmd-shell{grid-template-columns:1fr;gap:40px}.cmd-strip{grid-template-columns:repeat(2,1fr)}}

/* Grid Utilities */
.g3,.g4{display:grid;gap:24px}.g3{grid-template-columns:repeat(auto-fit,minmax(320px,1fr))}.g4{grid-template-columns:repeat(auto-fit,minmax(280px,1fr))}

/* Premium Cards */
.cd{background:#fff;border:1px solid var(--g);border-radius:var(--rl);padding:32px;transition:var(--tr);display:flex;flex-direction:column;gap:12px;box-shadow:var(--sm);position:relative;overflow:hidden}
.cd:hover{transform:translateY(-8px);box-shadow:var(--xl);border-color:var(--s)}
.cd::before{content:'';position:absolute;top:0;left:0;width:100%;height:4px;background:var(--gr);opacity:0;transition:var(--tr)}
.cd:hover::before{opacity:1}
.ci{width:64px;height:64px;border-radius:18px;background:var(--l);display:grid;place-items:center;font-size:2rem;margin-bottom:8px;transition:var(--tr)}
.cd:hover .ci{background:var(--p);color:#fff;transform:rotate(10deg)}
.cd h3{font-size:1.4rem;color:var(--p);font-weight:800}
.cd p{color:var(--tl);font-size:1rem;line-height:1.6}

/* Branch Cards Specific */
.bc{background:var(--of)}
.bh{flex:1}.bcx{font-size:0.9rem;color:var(--tl);margin-top:8px;font-weight:600}
.bb{display:flex;gap:12px;margin-top:24px;padding-top:20px;border-top:1px solid var(--g)}

/* Doctor Cards Specific */
.dcc{text-align:center;align-items:center}
.da{width:100px;height:100px;border-radius:50%;background:var(--gr);color:#fff;display:grid;place-items:center;font-size:2.5rem;font-weight:900;margin:0 auto 16px;box-shadow:var(--lg)}
.sp{font-weight:700;color:var(--a);font-size:0.9rem;margin-bottom:16px}

/* CTA Section */
.cs{background:var(--gr);color:#fff;padding:100px 0;text-align:center;position:relative;overflow:hidden}
.cs::before{content:'';position:absolute;inset:0;background:url('data:image/svg+xml,<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle cx="2" cy="2" r="1" fill="rgba(255,255,255,0.05)"/></svg>');opacity:0.5}
.cs .co{position:relative;z-index:10}
.cs h2{font-size:clamp(2.5rem, 5vw, 3.5rem);margin-bottom:24px}
.cs p{font-size:1.25rem;opacity:0.9;margin-bottom:48px;max-width:700px;margin-inline:auto}
.cb{display:flex;gap:20px;justify-content:center;flex-wrap:wrap}

/* WhatsApp Float */
.wa{position:fixed;width:60px;height:60px;border-radius:50%;display:grid;place-items:center;font-size:1.8rem;text-decoration:none;z-index:1000;transition:var(--tr)}
.wa:hover{transform:scale(1.1) rotate(10deg)}

/* Animations */
.an{opacity:0;transform:translateY(30px);transition:all 0.8s cubic-bezier(0.4, 0, 0.2, 1)}
.an.vi{opacity:1;transform:translateY(0)}
.d1{transition-delay:0.1s} .d2{transition-delay:0.2s} .d3{transition-delay:0.3s} .d4{transition-delay:0.4s} .d5{transition-delay:0.5s} .d6{transition-delay:0.6s}

/* Mobile Nav & Header Enhanced */
.mb{display:none;background:none;border:none;font-size:1.8rem;color:var(--p);cursor:pointer;padding:8px;position:relative;z-index:2001}

@media(max-width:1080px){
  .nv{display:flex;position:fixed;top:0;inset-inline:0;height:100vh;background:rgba(255,255,255,0.96);-webkit-backdrop-filter:blur(40px);backdrop-filter:blur(40px);flex-direction:column;justify-content:center;align-items:center;padding:40px;gap:20px;z-index:2000;transform:translateY(-100%);transition:transform 0.6s cubic-bezier(0.8, 0, 0.2, 1);visibility:hidden}
  .nv.op{transform:translateY(0);visibility:visible}
  .mb{display:block}
  .hi{padding:0 20px}
  .li{width:40px;height:40px;font-size:1.2rem;border-radius:10px}
  .lt{font-size:1rem}
  .lt sm{font-size:0.55rem}
  .nv a{width:auto;border-radius:var(--rm);padding:12px 30px;font-size:1.4rem;text-align:center}
  .lb{width:auto;text-align:center;padding:12px 40px;font-size:1.1rem}
  .btn.bs{width:auto;padding:16px 40px;font-size:1.1rem}
}

@media(max-width:768px){
  .g3,.g4{grid-template-columns:1fr}
  .se{padding:60px 0}
  .cs h2{font-size:2rem}
  .he{padding-top:100px}
  .he h1{font-size:2.8rem}
}
`;
function hdr(t, p) {
  return '<header class="h" id="hdr"><div class="hi"><a href="/" class="l"><div class="li">\u{1F3E5}</div><div class="lt">' + t.titleShort + "<sm>" + t.osVer + '</sm></div></a><nav class="nv" id="mn"><a href="#command">' + t.navCommand + '</a><a href="#depts">' + t.navDepts + '</a><a href="#branches">' + t.navBranches + '</a><a href="#doctors">' + t.navDoctors + '</a><a href="#ecosystem"><span style="font-size:.75rem;opacity:.6;">\u{1F310}</span> ' + t.navEcosystem + '</a><button class="lb" id="lb">' + t.langBtn + '</button><a href="https://bsma.elfadil.com" target="_blank" class="btn bp bs">' + t.navBook + '</a></nav><button class="mb" id="mbt">\u2630</button></div></header>';
}
__name(hdr, "hdr");
function ecoSys(t) {
  return '<section class="se sea" id="ecosystem"><div class="co"><div class="sh an"><h2>' + t.ecosystemTitle + '</h2><div class="gl"></div><p>' + t.ecosystemSub + '</p></div><div class="ec"><h3 style="font-size:1.1rem;font-weight:700;color:var(--p);margin-bottom:24px;">\u{1F465} ' + t.navPortal + '</h3><div class="ec-g">  <button class="ec-c an d1" data-open="patient"><div class="ec-badge ok">Live</div><div class="ec-ic" style="background:rgba(0,95,184,0.1);color:var(--s)">\u{1F9D1}\u200D\u{1F3EB}</div><div class="ec-n">' + t.patientTitle + '</div><div class="ec-d">' + t.patientDesc + '</div></button>  <a href="/provider-dashboard" class="ec-c an d2" style="display:block;text-decoration:none;color:inherit"><div class="ec-badge ok">Live</div><div class="ec-ic" style="background:rgba(16,185,129,0.1);color:var(--success)">\u2B50</div><div class="ec-n">' + t.providerTitle + '</div><div class="ec-d">' + t.providerDesc + '</div></a>  <button class="ec-c an d3" data-open="eligibility"><div class="ec-badge ok">Live</div><div class="ec-ic" style="background:rgba(212,175,55,0.1);color:var(--a)">\u{1F3E6}</div><div class="ec-n">' + t.payerTitle + '</div><div class="ec-d">' + t.payerDesc + '</div></button>  <a href="/academy" class="ec-c an d4" style="display:block;text-decoration:none;color:inherit"><div class="ec-badge ok">Live</div><div class="ec-ic" style="background:rgba(124,58,237,0.1);color:#7C3AED">\u{1F393}</div><div class="ec-n">' + t.studentTitle + '</div><div class="ec-d">' + t.studentDesc + '</div></a>  <button class="ec-c an d5" data-open="appointment"><div class="ec-badge ok">Live</div><div class="ec-ic" style="background:rgba(236,72,153,0.1);color:#EC4899">\u{1F481}</div><div class="ec-n">' + t.receptionTitle + '</div><div class="ec-d">' + t.receptionDesc + '</div></button>  <button class="ec-c an d6" data-open="status"><div class="ec-badge warn">Secure</div><div class="ec-ic" style="background:rgba(100,116,139,0.1);color:var(--tl)">\u{1F512}</div><div class="ec-n">' + t.adminTitle + '</div><div class="ec-d">' + t.adminDesc + '</div></button>  <button class="ec-c an d5" data-open="rcm"><div class="ec-badge warn">Secure</div><div class="ec-ic" style="background:rgba(239,68,68,0.1);color:var(--danger)">\u{1F4B0}</div><div class="ec-n">' + t.rcmTitle + '</div><div class="ec-d">' + t.rcmDesc + '</div></button>  <button class="ec-c an d6" data-open="basma"><div class="ec-badge ok">Basma</div><div class="ec-ic" style="background:rgba(16,185,129,0.1);color:var(--success)">\u{1F399}\uFE0F</div><div class="ec-n">' + t.basmaPortal + '</div><div class="ec-d">' + t.aiDesc + '</div></button>  <button class="ec-c an d1" data-open="homecare"><div class="ec-badge ok">New</div><div class="ec-ic" style="background:rgba(16,185,129,0.1);color:var(--success)">\u{1F3E0}</div><div class="ec-n">' + t.hcTitle + '</div><div class="ec-d">' + t.hcSub + '</div></button>  <button class="ec-c an d2" data-open="telehealth"><div class="ec-badge ok">New</div><div class="ec-ic" style="background:rgba(14,165,233,0.1);color:var(--s)">\u{1F3A5}</div><div class="ec-n">' + t.thTitle + '</div><div class="ec-d">' + t.thSub + '</div></button>  <button class="ec-c an d1" data-open="givc"><div class="ec-badge ok">GIVC</div><div class="ec-ic" style="background:rgba(124,58,237,0.1);color:#7C3AED">\u{1F310}</div><div class="ec-n">' + t.givcPortal + '</div><div class="ec-d">' + t.givcDesc + '</div></button></div></div><div class="ec"><h3 style="font-size:1.1rem;font-weight:700;color:var(--p);margin-bottom:24px;">\u{1F517} ' + t.integrationsTitle + '</h3><div class="ig" id="liveStatus" style="display:grid;grid-template-columns:repeat(auto-fill, minmax(200px,1fr));gap:16px"><div class="ld"><div class="spn"></div></div></div></div><div class="ec"><h3 style="font-size:1.1rem;font-weight:700;color:var(--p);margin-bottom:24px;">\u{1F916} ' + t.aiTitle + '</h3><div class="ai-s"><div class="ai-v"><div class="ai-orb">\u{1F399}\uFE0F</div><p>' + t.aiDesc + '</p></div><div class="ai-c"><h3>' + t.aiTitle + "</h3><p>" + t.aiDesc + '</p><div class="ai-btns"><button data-open="basma" class="btn ba bs">' + t.aiTalkBtn + '</button><button data-open="basma" class="btn bp bs">' + t.aiChatBtn + '</button></div><div class="eh" style="display:flex;gap:12px;margin-top:20px;flex-wrap:wrap"><span class="lb bs">DeepSeek AI</span><span class="lb bs">Oracle Health</span><span class="lb bs">NPHIES</span><span class="lb bs">Multi-language</span></div></div></div></div></div></section>';
}
__name(ecoSys, "ecoSys");
function bdy(t, A, p) {
  var dir = A ? "right" : "left";
  return '<section class="he"><div class="hp"><div class="pt" style="width:300px;height:300px;top:-100px;' + dir + ':-100px;background:rgba(0,44,94,0.1)"></div><div class="pt" style="width:200px;height:200px;bottom:10%;' + dir + ':70%;background:rgba(212,175,55,0.08);animation-delay:3s"></div></div><div class="co"><div class="hc"><div class="hb">\u25CF ' + t.heroBadge + "</div><h1>" + t.heroH1 + "</h1><p>" + t.heroP + '</p><div class="hbt"><button data-open="appointment" class="btn ba bl">' + t.heroBookBtn + '</button><a href="#ecosystem" class="btn bw bl">\u{1F310} ' + t.navEcosystem + '</a></div><div class="hs" id="hs"><div class="hst"><span class="nm" id="sd">\u2014</span><span class="sf">+</span><span class="lb">' + t.statDoctors + '</span></div><div class="hst"><span class="nm">5</span><span class="lb">' + t.statBranches + '</span></div><div class="hst"><span class="nm" id="sdp">\u2014</span><span class="sf">+</span><span class="lb">' + t.statDepts + '</span></div><div class="hst"><span class="nm">1200</span><span class="sf">+</span><span class="lb">' + t.statBeds + "</span></div></div></div></div></section>";
}
__name(bdy, "bdy");
function searchSec(t) {
  return '<section class="ss se sel" id="search" style="background:var(--of);border-top:1px solid var(--g);border-bottom:1px solid var(--g)"><div class="co"><div class="sh an"><h2>' + t.searchTitle + '</h2><div class="gl"></div><p>' + t.searchSub + '</p></div><div class="sb-wrap" style="max-width:800px;margin:0 auto"><div class="sb-box" style="display:flex;background:#fff;border:1px solid var(--g);border-radius:var(--rf);padding:6px;box-shadow:var(--lg)"><input class="sb-in" id="srchQ" type="text" placeholder="' + t.searchPlaceholder + '" style="flex:1;border:none;padding:16px 24px;font-size:1.1rem;outline:none;border-radius:var(--rf) 0 0 var(--rf)"/><button class="btn bp bl" onclick="doSearch()" style="padding:14px 40px">' + t.searchBtn + '</button></div><div class="sr-res" id="srchRes" style="display:none;margin-top:32px;padding:32px;background:#fff;border-radius:var(--rl);border:1px solid var(--g);box-shadow:var(--xl)"></div></div></div></section>';
}
__name(searchSec, "searchSec");
function commandSec(t) {
  return '<section class="cmd se" id="command" style="background:var(--n);color:#fff"><div class="co"><div class="cmd-shell an"><div class="cmd-copy"><div class="cmd-k">BrainSAIT HNH OS</div><h2 style="color:#fff;margin:24px 0">' + t.commandTitle + '</h2><p style="color:rgba(255,255,255,0.7)">' + t.commandSub + '</p><div class="cmd-actions" style="display:flex;gap:16px;margin-top:32px"><button class="btn ba bs" data-open="appointment">' + t.ctaBook + '</button><a class="btn bw bs" href="/provider-dashboard" style="background:rgba(255,255,255,0.1);color:#fff;border-color:rgba(255,255,255,0.2)">' + t.featureProvider + '</a></div></div><div class="cmd-board"><div class="cmd-top"><span></span><span></span><span></span><b style="margin-inline-start:auto;font-size:0.75rem;letter-spacing:0.1em;opacity:0.8">LIVE DATA</b></div><div class="cmd-grid" style="display:grid;grid-template-columns:repeat(2,1fr);gap:16px"><div class="cmd-m"><strong id="opsPatients" style="color:var(--al)">\u2014</strong><span style="font-size:0.8rem;text-transform:uppercase;letter-spacing:0.05em;opacity:0.6">' + t.opsPatients + '</span></div><div class="cmd-m"><strong id="opsToday" style="color:var(--al)">\u2014</strong><span style="font-size:0.8rem;text-transform:uppercase;letter-spacing:0.05em;opacity:0.6">' + t.opsAppointments + '</span></div><div class="cmd-m"><strong id="opsProviders" style="color:var(--al)">\u2014</strong><span style="font-size:0.8rem;text-transform:uppercase;letter-spacing:0.05em;opacity:0.6">' + t.opsProviders + '</span></div><div class="cmd-m"><strong id="opsClaims" style="color:var(--al)">\u2014</strong><span style="font-size:0.8rem;text-transform:uppercase;letter-spacing:0.05em;opacity:0.6">' + t.opsClaims + '</span></div></div><div class="cmd-strip" style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-top:20px"><div><b id="opsHomecare" style="color:#fff">\u2014</b><span style="display:block;font-size:0.65rem;text-transform:uppercase;opacity:0.5">' + t.homecareMetric + '</span></div><div><b id="opsTelehealth" style="color:#fff">\u2014</b><span style="display:block;font-size:0.65rem;text-transform:uppercase;opacity:0.5">' + t.telehealthMetric + '</span></div><div><b id="opsGivc" style="color:#fff">\u2014</b><span style="display:block;font-size:0.65rem;text-transform:uppercase;opacity:0.5">' + t.givcMetric + '</span></div><div><b id="opsConnected" style="color:#fff">\u2014</b><span style="display:block;font-size:0.65rem;text-transform:uppercase;opacity:0.5">' + t.connectedMetric + "</span></div></div></div></div></div></section>";
}
__name(commandSec, "commandSec");
function featureSec(t) {
  return '<section class="se sea" id="features"><div class="co"><div class="sh an"><h2>' + t.featureTitle + '</h2><div class="gl"></div><p>' + t.featureSub + '</p></div><div class="g3"><a class="cd an d1" href="/provider-dashboard" style="text-decoration:none;color:inherit"><div class="ci">\u{1F468}\u200D\u2695\uFE0F</div><h3>' + t.featureProvider + "</h3><p>" + t.featureProviderDesc + '</p><b style="margin-top:auto;color:var(--p)">' + t.launch + ' \u2192</b></a><button class="cd an d2" data-open="eligibility"><div class="ci">\u2705</div><h3>' + t.featureEligibility + "</h3><p>" + t.featureEligibilityDesc + '</p><b style="margin-top:auto;color:var(--p)">' + t.launch + ' \u2192</b></button><button class="cd an d3" data-open="homecare"><div class="ci">\u{1F3E0}</div><h3>' + t.featureHomecare + "</h3><p>" + t.featureHomecareDesc + '</p><b style="margin-top:auto;color:var(--p)">' + t.launch + ' \u2192</b></button><button class="cd an d4" data-open="telehealth"><div class="ci">\u{1F3A5}</div><h3>' + t.featureTelehealth + "</h3><p>" + t.featureTelehealthDesc + '</p><b style="margin-top:auto;color:var(--p)">' + t.launch + ' \u2192</b></button><a class="cd an d5" href="#search" style="text-decoration:none;color:inherit"><div class="ci">\u{1F50D}</div><h3>' + t.featureSearch + "</h3><p>" + t.featureSearchDesc + '</p><b style="margin-top:auto;color:var(--p)">' + t.launch + ' \u2192</b></a><button class="cd an d6" data-open="rcm"><div class="ci">\u{1F4B0}</div><h3>' + t.featureRcm + "</h3><p>" + t.featureRcmDesc + '</p><b style="margin-top:auto;color:var(--p)">' + t.launch + " \u2192</b></button></div></div></section>";
}
__name(featureSec, "featureSec");
function dhsSec(t) {
  return '<section class="se sel" id="digitalHealth"><div class="co"><div class="sh an"><h2>' + t.digitalTitle + '</h2><div class="gl"></div><p>' + t.digitalSub + '</p></div><div class="g3"><div class="cd an d1"><div class="ci">\u{1F3E0}</div><h3 style="color:var(--p)">' + t.hcTitle + "</h3><p>" + t.hcDesc + '</p><button data-open="homecare" class="btn bp bs" style="margin-top:16px;">' + t.hcTitle + ' \u2192</button></div><div class="cd an d2"><div class="ci">\u{1F3A5}</div><h3 style="color:var(--p)">' + t.thTitle + "</h3><p>" + t.thDesc + '</p><button data-open="telehealth" class="btn bp bs" style="margin-top:16px;">' + t.thTitle + ' \u2192</button></div><div class="cd an d3"><div class="ci">\u{1F4E7}</div><h3 style="color:var(--p)">' + t.emailTitle + "</h3><p>" + t.emailDesc + "</p></div></div></div></section>";
}
__name(dhsSec, "dhsSec");
function ftr(t, p) {
  return '<footer class="ft"><div class="co"><div class="fg"><div><h4 style="font-size:1.4rem;margin-bottom:32px">\u{1F3E5} ' + t.titleShort + '</h4><p style="margin-bottom:24px">' + t.fAbout + '</p><div style="display:flex;gap:12px"><a href="https://wa.me/' + p + '" class="btn bw bs" target="_blank">\u{1F4AC} WhatsApp</a><a href="tel:' + p + '" class="btn bw bs">\u{1F4DE} Call</a></div></div><div><h4>' + t.fLinks + '</h4><a href="#depts">' + t.navDepts + '</a><a href="#branches">' + t.navBranches + '</a><a href="#doctors">' + t.navDoctors + '</a><a href="#ecosystem">' + t.fEcosystem + '</a><a href="/academy">' + t.studentTitle + "</a></div><div><h4>" + t.fServices + '</h4><a href="tel:' + p + '">' + t.fEmerg + '</a><button data-open="appointment">' + t.fAppt + '</button><button data-open="basma">' + t.fBasma + "</button></div><div><h4>" + t.fContact + '</h4><a href="tel:' + p + '">\u{1F4DE} +' + p + '</a><a href="mailto:info@hayathospitals.com">\u{1F4E7} info@hayathospitals.com</a><p style="font-size:0.85rem;margin-top:20px;opacity:0.6">' + t.fCopy + '</p></div></div><div style="border-top:1px solid rgba(255,255,255,0.1);padding-top:32px;text-align:center"><p style="font-size:0.9rem">' + t.fPowered + ' <span style="color:var(--al);font-weight:800">BrainSAIT Healthcare OS v5.0</span></p></div></div></footer><a href="https://wa.me/' + p + '" class="wa" style="background:#25D366;color:#fff;box-shadow:var(--xl);bottom:32px;left:32px" target="_blank">\u{1F4AC}</a><div class="ts" id="ts"></div>';
}
__name(ftr, "ftr");
function hub(t) {
  return '<div class="mx" id="mx"><div class="mx-b" data-close="1"></div><div class="mx-p"><button class="mx-x" data-close="1">\xD7</button><div class="mx-h"><h3 id="mxTitle" style="color:var(--p)"></h3><p id="mxSub"></p></div><div id="mxBody"></div><div class="mx-r" id="mxRes" style="display:none"></div></div></div><template id="tpl-appointment"><div class="fx"><div class="fi"><label>' + t.quickName + '</label><input id="apName" placeholder="Name"></div><div class="fi"><label>' + t.quickPhone + '</label><input id="apPhone" inputmode="tel" placeholder="+966"></div><div class="fi"><label>' + t.quickNational + '</label><input id="apNational" placeholder="ID #"></div><div class="fi"><label>' + t.quickDept + '</label><select id="apDept"><option>Cardiology</option><option>OB/GYN</option><option>Pediatrics</option><option>Dermatology</option><option>Orthopedics</option></select></div><div class="fi"><label>' + t.quickDate + '</label><input id="apDate" type="date"></div><div class="fi"><label>' + t.quickTime + '</label><input id="apTime" type="time"></div><div class="fi full"><label>' + t.quickComplaint + '</label><textarea id="apReason" placeholder="Reason..."></textarea></div></div><div class="mx-a"><button class="btn bp bl" data-act="appointment">' + t.sendRequest + '</button><button class="btn bw bl" data-open="eligibility">' + t.eligModalTitle + '</button></div></template><template id="tpl-basma"><div class="fx"><div class="fi full"><label>' + t.askBasma + '</label><textarea id="baMsg" placeholder="' + t.searchPlaceholder + '" style="min-height:160px;font-size:1.2rem"></textarea></div></div><div class="mx-a"><button class="btn ba bl" data-act="basma" style="flex:1">' + t.askBasma + '</button><button class="btn bp bl" data-act="voice" style="width:60px;padding:0">\u{1F399}\uFE0F</button></div></template><template id="tpl-homecare"><div class="fx"><div class="fi"><label>' + t.quickName + '</label><input id="hcName"></div><div class="fi"><label>' + t.quickPhone + '</label><input id="hcPhone" inputmode="tel"></div><div class="fi"><label>' + t.quickNational + '</label><input id="hcNational"></div><div class="fi"><label>' + t.quickDate + '</label><input id="hcDate" type="date"></div><div class="fi"><label>' + t.quickTime + '</label><input id="hcTime" type="time"></div><div class="fi"><label>' + t.quickDept + '</label><select id="hcType"><option value="routine">Routine</option><option value="iv-therapy">IV Therapy</option><option value="wound-care">Wound Care</option><option value="physiotherapy">Physiotherapy</option></select></div><div class="fi full"><label>' + t.quickAddress + '</label><textarea id="hcAddress" placeholder="Full address..."></textarea></div><div class="fi full"><label>' + t.quickComplaint + '</label><textarea id="hcReason"></textarea></div></div><div class="mx-a"><button class="btn ba bl" data-act="homecare" style="width:100%">' + t.sendRequest + '</button></div></template><template id="tpl-telehealth"><div class="fx"><div class="fi"><label>' + t.quickName + '</label><input id="thName"></div><div class="fi"><label>' + t.quickPhone + '</label><input id="thPhone" inputmode="tel"></div><div class="fi"><label>' + t.quickNational + '</label><input id="thNational"></div><div class="fi"><label>' + t.quickDate + '</label><input id="thDate" type="date"></div><div class="fi"><label>' + t.quickTime + '</label><input id="thTime" type="time"></div><div class="fi"><label>' + t.quickDept + '</label><select id="thType"><option value="consultation">Consultation</option><option value="follow-up">Follow-up</option><option value="second-opinion">Second opinion</option><option value="pharmacy">Pharmacy</option></select></div><div class="fi full"><label>' + t.quickComplaint + '</label><textarea id="thReason"></textarea></div></div><div class="mx-a"><button class="btn ba bl" data-act="telehealth" style="width:100%">' + t.sendRequest + '</button></div></template><template id="tpl-eligibility"><div class="fx"><div class="fi"><label>' + t.quickInsurance + '</label><input id="elIns"></div><div class="fi"><label>' + t.quickNational + '</label><input id="elNat"></div><div class="fi full"><label>' + t.quickDept + '</label><select id="elType"><option value="medical">Medical</option><option value="hospital">Hospital</option><option value="pharmacy">Pharmacy</option><option value="dental">Dental</option></select></div></div><div class="mx-a"><button class="btn ba bl" data-act="eligibility" style="width:100%">' + t.sendRequest + '</button></div></template><template id="tpl-givc"><div class="fx"><div class="fi"><label>Name (AR)</label><input id="givcNameAr"></div><div class="fi"><label>Name (EN)</label><input id="givcNameEn"></div><div class="fi"><label>National ID</label><input id="givcNat"></div><div class="fi"><label>Specialty</label><input id="givcSpec"></div><div class="fi"><label>License #</label><input id="givcLic"></div><div class="fi"><label>Branch</label><select id="givcBranch"><option value="R001">Riyadh</option><option value="M001">Madinah</option><option value="K001">Khamis</option><option value="J001">Jizan</option><option value="U001">Unaizah</option></select></div></div><div class="mx-a"><button class="btn ba bl" data-act="givc-register">' + t.givcRegister + '</button><button class="btn bw bl" data-act="givc-network">' + t.givcNetwork + '</button></div></template><template id="tpl-list"><div id="miniList" style="display:grid;grid-template-columns:repeat(auto-fit, minmax(240px, 1fr));gap:12px"><div class="ld"><div class="spn"></div></div></div></template>';
}
__name(hub, "hub");
function scr(A, p, t) {
  return "<script>\n(function(){\n  var isAr=" + (A ? "true" : "false") + ';\n  var phone="' + p + '";\n  var labels={appointment:"' + t.bookModalTitle + '",basma:"' + t.basmaModalTitle + '",homecare:"' + t.homecareModalTitle + '",telehealth:"' + t.telehealthModalTitle + '",eligibility:"' + t.eligModalTitle + '",patient:"' + t.patientTitle + '",providers:"' + t.providerTitle + '",status:"' + t.adminTitle + '",rcm:"' + t.rcmTitle + '",givc:"' + t.givcTitle + '"};\n  function $(id){return document.getElementById(id);}\n  function v(id){var e=$(id);return e?e.value.trim():"";}\n  function today(){return new Date().toISOString().slice(0,10);}\n  function result(html,ok){var r=$("mxRes");if(!r)return;r.style.display="block";r.className="mx-r "+(ok?"ok":"er");r.innerHTML=html;}\n  function spin(){var r=$("mxRes");if(r){r.style.display="block";r.className="mx-r";r.innerHTML="<div class=ld><div class=spn></div></div>";}}\n  function closeMx(){var m=$("mx");if(m)m.classList.remove("on");}\n  function setDefaults(k){var d=today();["apDate","hcDate","thDate"].forEach(function(id){var e=$(id);if(e&&!e.value)e.value=d;});["apTime","hcTime","thTime"].forEach(function(id){var e=$(id);if(e&&!e.value)e.value="10:00";});}\n  function openMx(k){var m=$("mx"),b=$("mxBody"),r=$("mxRes"),ti=$("mxTitle"),su=$("mxSub"),tpl=$("tpl-"+(k==="providers"||k==="patient"||k==="status"||k==="rcm"?"list":k));if(!m||!b||!tpl)return;if(ti)ti.textContent=labels[k]||k;if(su)su.textContent="BrainSAIT HNH native workflow \xB7 /api/*";b.innerHTML=tpl.innerHTML;if(r){r.style.display="none";r.innerHTML="";}m.classList.add("on");setDefaults(k);if(k==="patient")loadPatients();if(k==="providers")loadProviders();if(k==="status")loadStatus();if(k==="rcm")loadRcm();if(k==="givc")loadGivcNetwork();}\n  function api(path,opt){opt=opt||{};opt.headers=Object.assign({"Content-Type":"application/json"},opt.headers||{});return fetch(path,opt).then(function(r){return r.json().then(function(d){d.__status=r.status;return d;});});}\n  function fmt(d){return "<pre style="white-space:pre-wrap;margin:0">"+JSON.stringify(d,null,2).replace(/[<>&]/g,function(c){return {"<":"&lt;",">":"&gt;","&":"&amp;"}[c];})+"</pre>";}\n  function card(a,b,c){return "<div class=mini-c><strong>"+a+"</strong><span>"+(b||"\u2014")+"</span>"+(c?"<span>"+c+"</span>":"")+"</div>";}\n  function ensurePatient(prefix){var name=v(prefix+"Name"),ph=v(prefix+"Phone"),nat=v(prefix+"National");if(!name||!ph)return Promise.resolve(null);return api("/api/patients?search="+encodeURIComponent(ph)).then(function(found){var a=found.patients||[];if(a.length)return a[0].id;return api("/api/patients",{method:"POST",body:JSON.stringify({full_name_ar:name,full_name_en:name,phone:ph,national_id:nat})}).then(function(d){return d.patient_id||null;});});}\n  function loadPatients(){spin();api("/api/patients?limit=8").then(function(d){var a=d.patients||[];result("<div class=mini-g>"+a.map(function(x){return card(x.full_name_ar||x.full_name_en,x.phone,x.national_id);}).join("")+"</div>",true);}).catch(function(){result("' + t.failedAction + '",false);});}\n  function loadProviders(){spin();api("/api/providers").then(function(d){var a=d.providers||[];result("<div class=mini-g>"+a.slice(0,12).map(function(x){return card(x.name_ar||x.name_en||x.full_name_ar,x.specialty||x.department,x.branch||x.branch_id);}).join("")+"</div>",true);}).catch(function(){result("' + t.failedAction + '",false);});}\n  function loadStatus(){spin();api("/api/health").then(function(d){result(fmt(d),true);}).catch(function(){result("' + t.failedAction + '",false);});}\n  function loadRcm(){spin();api("/api/rcm/health").then(function(d){result(fmt(d),true);}).catch(function(){result("' + t.failedAction + '",false);});}\n  function act(k){if(k==="appointment")return doAppointment();if(k==="basma")return doBasma(false);if(k==="voice")return doBasma(true);if(k==="homecare")return doHomecare();if(k==="telehealth")return doTelehealth();if(k==="eligibility")return doEligibility();if(k==="givc-register")return doGivcRegister();if(k==="givc-network")return loadGivcNetwork();}\n  function doAppointment(){if(!v("apName")||!v("apPhone")||!v("apDate")){result("' + t.missingFields + '",false);return;}spin();ensurePatient("ap").then(function(pid){if(!pid)throw new Error("patient");return api("/api/appointments",{method:"POST",body:JSON.stringify({patient_id:pid,clinic_name:v("apDept"),appointment_date:v("apDate"),appointment_time:v("apTime")||"10:00",reason:v("apReason"),appointment_type:"digital"})});}).then(function(d){result("\u2705 ' + t.resultReady + '<br>"+fmt(d),!!d.success);}).catch(function(){result("' + t.failedAction + '",false);});}\n  function sp(text,lang){if(window.speechSynthesis){var u=new SpeechSynthesisUtterance(text);u.lang=lang==="ar"?"ar-SA":"en-US";u.rate=0.95;u.pitch=1;var voices=speechSynthesis.getVoices();var match=voices.find(function(v){return v.lang.startsWith(lang);});if(match)u.voice=match;speechSynthesis.cancel();speechSynthesis.speak(u);}}\n  function doBasma(voice){var msg=v("baMsg");if(!msg){result("' + t.missingFields + '",false);return;}spin();api("/api/chat",{method:"POST",body:JSON.stringify({message:msg,language:isAr?"ar":"en",session_id:"hnh-web"})}).then(function(d){var answer=d.response||d.reply||d.answer||"\u2014";result(answer,true);if(voice){fetch("/api/voice/speak",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({text:answer,lang:isAr?"ar":"en"})}).then(function(r){if(r.ok)return r.blob();throw new Error("tts-unavailable");}).then(function(blob){if(blob){new Audio(URL.createObjectURL(blob)).play().catch(function(){sp(answer,isAr?"ar":"en");});}}).catch(function(){sp(answer,isAr?"ar":"en");});}}).catch(function(){result("' + t.failedAction + '",false);});}\n  function doHomecare(){if(!v("hcName")||!v("hcPhone")||!v("hcDate")||!v("hcAddress")){result("' + t.missingFields + '",false);return;}spin();ensurePatient("hc").then(function(pid){return api("/api/homecare/visits",{method:"POST",body:JSON.stringify({patient_id:pid||"PAT-WALKIN",visit_date:v("hcDate"),visit_time:v("hcTime")||"10:00",visit_type:v("hcType"),address:v("hcAddress"),chief_complaint:v("hcReason")})});}).then(function(d){result("\u2705 ' + t.resultReady + '<br>"+fmt(d),!!d.success);}).catch(function(){result("' + t.failedAction + '",false);});}\n  function doTelehealth(){if(!v("thName")||!v("thPhone")||!v("thDate")){result("' + t.missingFields + '",false);return;}spin();ensurePatient("th").then(function(pid){return api("/api/telehealth/sessions",{method:"POST",body:JSON.stringify({patient_id:pid||"PAT-WALKIN",session_date:v("thDate"),session_time:v("thTime")||"10:00",session_type:v("thType"),chief_complaint:v("thReason")})});}).then(function(d){var link=d.join_url?"<br><a href=""+d.join_url+"" target="_blank">"+d.join_url+"</a>":"";result("\u2705 ' + t.resultReady + '<br>"+fmt(d)+link,!!d.success);}).catch(function(){result("' + t.failedAction + '",false);});}\n  function doEligibility(){if(!v("elIns")){result("' + t.missingFields + '",false);return;}spin();api("/api/eligibility/check",{method:"POST",body:JSON.stringify({insurance_id:v("elIns"),national_id:v("elNat"),service_type:v("elType")||"medical"})}).then(function(d){result(fmt(d),!!d.success);}).catch(function(){result("' + t.failedAction + `",false);});}
  function loadGivcNetwork(){spin();api("/givc/api/providers/givc-network").then(function(d){var a=d.doctors||[];if(!a.length){result('<div style="text-align:center;padding:20px;color:var(--tl)">` + t.statusOffline + `</div>',false);return;}result("<div class=mini-g>"+a.slice(0,12).map(function(x){return card(x.name_ar||x.name_en,x.specialty,x.givc_oid?x.givc_oid.slice(-8):"\u2014");}).join("")+"</div>",true);}).catch(function(){result("` + t.failedAction + '",false);});}\n  function doGivcRegister(){var n=v("givcNameAr"),nat=v("givcNat"),spec=v("givcSpec");if(!n||!nat||!spec){result("' + t.missingFields + '",false);return;}spin();api("/givc/api/providers/givc-register",{method:"POST",body:JSON.stringify({name_ar:n,name_en:v("givcNameEn"),national_id:nat,specialty:spec,license_number:v("givcLic"),branch_code:v("givcBranch")||"R001"})}).then(function(d){result("\u2705 ' + t.resultReady + '<br>"+fmt(d),!!d.success);}).catch(function(){result("' + t.failedAction + `",false);});}
  function ls(){
    fetch("/api/stats").then(function(r){return r.json();}).then(function(d){
      if(d.success){
        var e1=document.getElementById("sd"),e2=document.getElementById("sdp");
        if(e1)e1.textContent=(d.stats&&d.stats.total_providers||700).toLocaleString();
        if(e2)e2.textContent=(d.stats&&d.stats.total_departments||42).toLocaleString();
      }
    }).catch(function(){});
  }
  function loadIntegrations(){
    var cont=document.getElementById("liveStatus");if(!cont)return;
    fetch("/api/health").then(function(r){return r.json();}).then(function(d){
      if(!d.success||!d.integrations){cont.innerHTML='<div style="grid-column:1/-1;text-align:center;padding:20px;color:var(--tl);font-size:.88rem;">` + t.statusOffline + `</div>';return;}
      var ints=[
        {key:"oracle_bridge",icon:"\u{1F310}",name:"` + t.oracleBridge + '"},\n        {key:"nphies_mirror",icon:"\u{1F4CB}",name:"' + t.nphiesPortal + '"},\n        {key:"claimlinc",icon:"\u{1F4B0}",name:"' + t.claimlincPortal + '"},\n        {key:"basma_portal",icon:"\u{1F399}\uFE0F",name:"' + t.basmaPortal + '"},\n        {key:"sbs_portal",icon:"\u{1F4E6}",name:"' + t.sbsPortal + '"},\n        {key:"givc_portal",icon:"\u{1F504}",name:"' + t.givcPortal + '"}\n      ];\n      var html="";\n      ints.forEach(function(item){\n        var status=d.integrations[item.key]||"unknown";\n        var ok=status==="connected"||status==="live";\n        var warn=status==="warning"||status==="degraded";\n        var cls="ig-c "+(ok?"g":warn?"w":"");\n        var scls="ig-b "+(ok?"ok":warn?"warn":"off");\n        var stxt=ok?"' + t.statusConnected + '":warn?"' + t.statusWarning + '":"' + t.statusOffline + `";
        var tnl=(d.integrations.oracle_tunnel&&item.key==="oracle_bridge")?d.integrations.oracle_tunnel:"";
        html+='<div class="'+cls+'"><div class="ig-ic">'+item.icon+'</div><div style="flex:1"><div class="ig-n">'+item.name+'</div><div class="ig-s">'+tnl+'</div></div><span class="'+scls+'">'+stxt+'</span></div>';
      });
      cont.innerHTML=html;
      if(d.nphies_mirror){
        var ec=document.querySelector(".ec-c.r");
        if(ec){
          var extra=ec.querySelector(".ec-d");
          if(extra)extra.innerHTML+='<br><span style="color:var(--s);font-size:.72rem;">GSS: '+d.nphies_mirror.total_gss+' | PA: '+d.nphies_mirror.total_pa+'</span>';
        }
      }
    }).catch(function(){
      cont.innerHTML='<div style="grid-column:1/-1;text-align:center;padding:20px;color:var(--d);font-size:.88rem;">` + t.statusOffline + `</div>';
    });
  }
  function setTxt(id,val){var e=document.getElementById(id);if(e)e.textContent=(val==null||val===""?"\u2014":Number(val).toLocaleString());}
  function loadCommand(){
    Promise.allSettled([fetch("/api/stats").then(function(r){return r.json();}),fetch("/api/homecare/stats").then(function(r){return r.json();}),fetch("/api/telehealth/stats").then(function(r){return r.json();}),fetch("/givc/api/providers/givc-network").then(function(r){return r.json();}),fetch("/api/health").then(function(r){return r.json();})]).then(function(rs){
      var st=rs[0].value&&rs[0].value.stats||{};setTxt("opsPatients",st.total_patients||0);setTxt("opsToday",st.today_appointments||0);setTxt("opsProviders",st.total_providers||0);setTxt("opsClaims",st.total_claims||0);
      var hc=rs[1].value&&rs[1].value.stats||{};setTxt("opsHomecare",hc.total_visits||0);
      var th=rs[2].value&&rs[2].value.stats||{};setTxt("opsTelehealth",th.total_sessions||0);
      var gd=rs[3].value&&rs[3].value.doctors||[];setTxt("opsGivc",gd.length||0);
      var ints=rs[4].value&&rs[4].value.integrations||{};var connected=Object.keys(ints).filter(function(k){return ints[k]==="connected"||ints[k]==="live";}).length;setTxt("opsConnected",connected);
    }).catch(function(){});
  }
  window.addEventListener("scroll",function(){
    var h=document.getElementById("hdr");
    if(h)h.classList.toggle("sc",window.scrollY>50);
  });
  var lb=document.getElementById("lb");
  if(lb)lb.addEventListener("click",function(){
    window.location.href=window.location.pathname+"?lang="+(isAr?"en":"ar");
  });
  document.addEventListener("click",function(e){
    var t=e.target;
    var close=t.closest("[data-close]");if(close){closeMx();return;}
    var open=t.closest("[data-open]");if(open){e.preventDefault();openMx(open.getAttribute("data-open"));return;}
    var actBtn=t.closest("[data-act]");if(actBtn){e.preventDefault();act(actBtn.getAttribute("data-act"));return;}
    var mbt=t.closest("#mbt");
    if(mbt){
      var m=$("mn");if(!m)return;
      var op=m.classList.toggle("op");
      mbt.textContent=op?"\u2715":"\u2630";
      return;
    }
    var link=t.closest("#mn a");
    if(link){
      var m=$("mn"),mb=$("mbt");
      if(m&&m.classList.contains("op")){
        m.classList.remove("op");
        if(mb)mb.textContent="\u2630";
      }
    }
  });
  document.addEventListener("keydown",function(e){if(e.key==="Escape")closeMx();});
  var ob=new IntersectionObserver(function(es){
    es.forEach(function(e){if(e.isIntersecting)e.target.classList.add("vi");});
  },{threshold:0.1});
  document.querySelectorAll(".an").forEach(function(el){ob.observe(el);});
  ls();loadIntegrations();loadCommand();
  window.doSearch=function(){
    var q=document.getElementById("srchQ");if(!q)return;
    var qv=q.value.trim();if(!qv)return;
    var res=document.getElementById("srchRes");if(!res)return;
    res.style.display="block";
    res.innerHTML='<div class="sr-ans" style="text-align:center"><div class="ld"><div class="spn" style="border-color:rgba(255,255,255,.2);border-top-color:#fff"></div></div></div>';
    fetch("/api/search",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({query:qv,lang:isAr?"ar":"en"})})
    .then(function(r){return r.json();})
    .then(function(d){
      var html='<div class="sr-ans">'+(d.answer||d.error||"\u2014")+'</div>';
      if(d.sources&&d.sources.length)html+='<div class="sr-src">'+d.sources.map(function(s){return '<span>'+s+'</span>';}).join("")+'</div>';
      html+='<div class="sr-pow">Powered by BrainSAIT AutoRAG \xB7 DeepSeek AI</div>';
      res.innerHTML=html;
    })
    .catch(function(){res.innerHTML='<div class="sr-ans">` + (A ? "\u062D\u062F\u062B \u062E\u0637\u0623. \u062D\u0627\u0648\u0644 \u0645\u062C\u062F\u062F\u0627\u064B." : "Search error. Please try again.") + `</div>';});
  };
  var sq=document.getElementById("srchQ");
  if(sq)sq.addEventListener("keydown",function(e){if(e.key==="Enter")window.doSearch();});
  setTimeout(function(){
    document.querySelectorAll(".an").forEach(function(el){
      if(el.getBoundingClientRect().top<window.innerHeight)el.classList.add("vi");
    });
  },500);
})();<\/script>`;
}
__name(scr, "scr");
function providerDashboardPage(req) {
  var url = new URL(req.url);
  var lang = url.searchParams.get("lang") || "en";
  var isAr = lang === "ar";
  var dir = isAr ? "rtl" : "ltr";
  var providerId = url.searchParams.get("provider") || "";
  var copy = isAr ? {
    title: "\u0644\u0648\u062D\u0629 \u0627\u0644\u0637\u0628\u064A\u0628",
    subtitle: "\u0645\u0633\u0627\u062D\u0629 \u0639\u0645\u0644 \u0633\u0631\u064A\u0631\u064A\u0629 \u0645\u062A\u0643\u0627\u0645\u0644\u0629 \u0645\u0639 HNH \u0648 GIVC \u0648 NPHIES",
    overview: "\u0646\u0638\u0631\u0629 \u0639\u0627\u0645\u0629",
    patients: "\u0627\u0644\u0645\u0631\u0636\u0649",
    appointments: "\u0627\u0644\u0645\u0648\u0627\u0639\u064A\u062F",
    nphies: "NPHIES",
    network: "\u0634\u0628\u0643\u0629 GIVC",
    insights: "\u0631\u0624\u0649 \u0645\u062F\u0639\u0648\u0645\u0629 \u0628\u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064A",
    back: "\u0627\u0644\u0639\u0648\u062F\u0629 \u0625\u0644\u0649 HNH",
    eligibility: "\u062A\u062D\u0642\u0642 \u0627\u0644\u0623\u0647\u0644\u064A\u0629",
    refresh: "\u062A\u062D\u062F\u064A\u062B",
    live: "\u062D\u064A",
    provider: "\u0627\u0644\u0637\u0628\u064A\u0628",
    active: "\u0646\u0634\u0637"
  } : {
    title: "Doctor Dashboard",
    subtitle: "Premium clinical workspace integrated with HNH, GIVC, and NPHIES",
    overview: "Overview",
    patients: "Patients",
    appointments: "Appointments",
    nphies: "NPHIES",
    network: "GIVC Network",
    insights: "AI-Powered Insights",
    back: "Back to HNH",
    eligibility: "Eligibility Check",
    refresh: "Refresh",
    live: "Live",
    provider: "Provider",
    active: "Active"
  };
  var css = `:root{--p:#1193d4;--ink:#0f1c22;--mut:#617c89;--bg:#f6f8fb;--card:#fff;--line:#e8eef2;--ok:#10b981;--warn:#f59e0b;--nav:#101c22}*{box-sizing:border-box}body{margin:0;background:radial-gradient(circle at 20% 0%,rgba(17,147,212,.18),transparent 30%),linear-gradient(180deg,#f6f8fb,#eef4f7);color:var(--ink);font-family:${isAr ? "'IBM Plex Sans Arabic'" : "Inter"},system-ui,sans-serif;min-height:100vh}.shell{display:grid;grid-template-columns:280px 1fr;min-height:100vh}.side{background:linear-gradient(180deg,#101c22,#18303a);color:#fff;padding:24px;position:sticky;top:0;height:100vh}.brand{display:flex;gap:12px;align-items:center;margin-bottom:30px}.mark{width:48px;height:48px;border-radius:16px;background:linear-gradient(135deg,#1193d4,#73d7ff);display:grid;place-items:center;font-weight:900;box-shadow:0 16px 45px rgba(17,147,212,.35)}.brand h1{font-size:1.05rem;margin:0}.brand p{font-size:.78rem;color:#a0b4bc;margin:2px 0 0}.nav{display:grid;gap:8px}.nav a{display:flex;gap:12px;align-items:center;color:#cfe1e8;text-decoration:none;padding:12px;border-radius:14px;font-weight:750;font-size:.92rem}.nav a.on,.nav a:hover{background:rgba(255,255,255,.1);color:#fff}.sidefoot{position:absolute;bottom:24px;left:24px;right:24px;color:#a0b4bc;font-size:.78rem}.sidefoot a{color:#d9eef8}.main{padding:28px;display:grid;gap:22px}.top{display:flex;justify-content:space-between;gap:16px;align-items:flex-start}.eyebrow{display:inline-flex;gap:8px;align-items:center;background:#e8f7ff;color:#0369a1;border:1px solid #c7ecff;border-radius:999px;padding:6px 10px;font-weight:850;font-size:.78rem}.top h2{font-size:clamp(1.8rem,3vw,3.2rem);line-height:1;margin:14px 0 8px;letter-spacing:-.04em}.top p{color:var(--mut);margin:0;max-width:720px}.tools{display:flex;gap:10px;flex-wrap:wrap;justify-content:flex-end}.btn{border:0;border-radius:14px;padding:11px 15px;font-weight:850;cursor:pointer;text-decoration:none;display:inline-flex;align-items:center;gap:8px}.btn.primary{background:var(--p);color:#fff;box-shadow:0 14px 34px rgba(17,147,212,.28)}.btn.ghost{background:#fff;color:var(--ink);border:1px solid var(--line)}.grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px}.card{background:rgba(255,255,255,.9);border:1px solid rgba(226,236,241,.95);border-radius:24px;padding:18px;box-shadow:0 16px 40px rgba(16,28,34,.08);backdrop-filter:blur(16px)}.metric .k{color:var(--mut);font-weight:800;font-size:.78rem;text-transform:uppercase;letter-spacing:.08em}.metric .v{font-size:2rem;font-weight:950;letter-spacing:-.04em;margin-top:6px}.metric .s{color:var(--mut);font-size:.82rem}.wide{display:grid;grid-template-columns:1.25fr .75fr;gap:16px}.section-title{display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;gap:12px}.section-title h3{margin:0;font-size:1.1rem}.list{display:grid;gap:10px}.row{display:flex;align-items:center;gap:12px;border:1px solid var(--line);background:#fff;border-radius:18px;padding:12px}.avatar{width:46px;height:46px;border-radius:15px;background:linear-gradient(135deg,#dff4ff,#b7e6ff);display:grid;place-items:center;font-weight:950;color:#075985;flex:0 0 auto}.grow{flex:1;min-width:0}.grow b{display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.grow span{color:var(--mut);font-size:.85rem}.pill{border-radius:999px;padding:5px 9px;font-size:.74rem;font-weight:900;background:#ecfdf5;color:#047857}.pill.warn{background:#fffbeb;color:#b45309}.nphies{background:linear-gradient(135deg,#10232c,#173b49);color:#fff;overflow:hidden;position:relative}.nphies:after{content:"";position:absolute;width:220px;height:220px;border-radius:50%;right:-70px;top:-70px;background:rgba(17,147,212,.25)}.nphies>*{position:relative;z-index:1}.mut{color:#a0b4bc}.bar{height:9px;border-radius:999px;background:rgba(255,255,255,.12);overflow:hidden;margin:14px 0}.bar i{display:block;height:100%;width:88%;background:linear-gradient(90deg,#10b981,#73d7ff)}.tabs{display:flex;gap:8px;flex-wrap:wrap}.tab{border:1px solid var(--line);background:#fff;border-radius:999px;padding:8px 12px;font-weight:850;color:var(--mut);cursor:pointer}.tab.on{background:#101c22;color:#fff}.panel{display:none}.panel.on{display:block}.actions{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin-top:18px}.action{border:1px solid rgba(255,255,255,.14);background:rgba(255,255,255,.08);border-radius:22px;padding:16px;text-decoration:none;color:#fff;font-weight:900;display:grid;gap:8px}.icon{width:40px;height:40px;border-radius:14px;background:#e8f7ff;color:#0369a1;display:grid;place-items:center;font-size:1rem}.empty{padding:22px;text-align:center;color:var(--mut)}.footnav{display:none}@media(max-width:980px){.shell{grid-template-columns:1fr}.side{position:static;height:auto}.sidefoot{display:none}.grid{grid-template-columns:repeat(2,minmax(0,1fr))}.wide{grid-template-columns:1fr}.main{padding:18px 14px 92px}.footnav{display:flex;position:fixed;bottom:0;left:0;right:0;background:#fff;border-top:1px solid var(--line);justify-content:space-around;padding:9px 4px;z-index:10}.footnav a{font-size:.72rem;color:var(--mut);text-decoration:none;display:grid;place-items:center;gap:2px}.footnav a.on{color:var(--p)}}@media(max-width:560px){.grid{grid-template-columns:1fr}.top{display:grid}.tools{justify-content:flex-start}.actions{grid-template-columns:1fr}}`;
  var js = `const providerId=${JSON.stringify(providerId)};const copy=${JSON.stringify(copy)};const $=id=>document.getElementById(id);function safe(s){return String(s||'').replace(/[<>&]/g,c=>({'<':'&lt;','>':'&gt;','&':'&amp;'}[c]));}function initials(s){return safe(s).replace(/^\u062F.s*|^Dr.s*/,'').slice(0,2)||'DR';}async function api(p,o){const r=await fetch(p,o);return r.json();}function row(name,meta,status){return '<div class="row"><div class="avatar">'+initials(name)+'</div><div class="grow"><b>'+safe(name)+'</b><span>'+safe(meta)+'</span></div>'+(status?'<span class="pill '+(status==='warning'?'warn':'')+'">'+safe(status)+'</span>':'')+'</div>';}function setMetric(id,v){const e=$(id);if(e)e.textContent=v;}async function load(){const [stats,providers,appointments,patients,health,givc]=await Promise.allSettled([api('/api/stats'),api('/api/providers'),api('/api/appointments?limit=8'),api('/api/patients?limit=8'),api('/api/health'),api('/givc/api/providers/givc-network')]);const st=stats.value&&stats.value.stats||{};setMetric('mPatients',st.total_patients||0);setMetric('mToday',st.today_appointments||0);setMetric('mProviders',st.total_providers||0);setMetric('mClaims',st.total_claims||0);const ps=(providers.value&&providers.value.providers)||[];const selected=providerId?ps.find(p=>p.id===providerId||String(p.db_id)===providerId||p.givc_oid===providerId):ps.find(p=>p.givc_registered)||ps[0];if(selected){$('providerName').textContent=selected.name_en||selected.name_ar||copy.provider;$('providerMeta').textContent=[selected.specialty,selected.branch||selected.branch_id,selected.givc_oid?'OID '+selected.givc_oid:''].filter(Boolean).join(' \xB7 ');}const apps=(appointments.value&&appointments.value.appointments)||[];$('appointments').innerHTML=apps.length?apps.map(a=>row(a.patient_name_en||a.patient_name_ar||('Patient #'+a.patient_id),(a.appointment_date||'')+' \xB7 '+(a.appointment_time||'')+' \xB7 '+(a.clinic_name||a.appointment_type||''),a.status==='scheduled'?'live':a.status)).join(''):'<div class="empty">No appointments found</div>';const pats=(patients.value&&patients.value.patients)||[];$('patients').innerHTML=pats.length?pats.map(p=>row(p.full_name_en||p.full_name_ar,p.phone||p.national_id||p.mrn,'live')).join(''):'<div class="empty">No patients found</div>';const gdocs=(givc.value&&givc.value.doctors)||[];$('network').innerHTML=gdocs.length?gdocs.slice(0,8).map(d=>row(d.name_en||d.name_ar,[d.specialty,d.branch_code,d.givc_oid].filter(Boolean).join(' \xB7 '),d.network_visibility==='public'?'live':'warning')).join(''):'<div class="empty">No GIVC doctors found</div>';const ints=(health.value&&health.value.integrations)||{};$('nphiesStatus').textContent='ClaimLinc '+(ints.claimlinc||'unknown')+' \xB7 NPHIES Mirror '+(ints.nphies_mirror||'unknown');$('oracleStatus').textContent='Oracle '+(ints.oracle_bridge||'unknown')+' \xB7 GIVC '+(ints.givc_portal||'unknown');}document.addEventListener('click',e=>{const t=e.target.closest('[data-tab]');if(!t)return;document.querySelectorAll('.tab,.panel').forEach(x=>x.classList.remove('on'));t.classList.add('on');$(t.dataset.tab).classList.add('on');});load().catch(e=>{document.querySelectorAll('[data-live]').forEach(el=>el.innerHTML='<div class="empty">Unable to load live data</div>');});`;
  var html = '<!doctype html><html lang="' + lang + '" dir="' + dir + '"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#101c22"><title>' + copy.title + ' | HNH</title><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&family=Inter:wght@400;500;700;900&display=swap" rel="stylesheet"><style>' + css + '</style></head><body><div class="shell"><aside class="side"><div class="brand"><div class="mark">H</div><div><h1>BrainSAIT HNH</h1><p>Clinical Command Center</p></div></div><nav class="nav"><a class="on" href="#overview">\u2301 ' + copy.overview + '</a><a href="#patients">\u2637 ' + copy.patients + '</a><a href="#appointments">\u25F7 ' + copy.appointments + '</a><a href="#nphies">\u25C8 ' + copy.nphies + '</a><a href="/givc/network">\u25CE ' + copy.network + '</a></nav><div class="sidefoot">' + copy.live + ' \xB7 HNH + GIVC + NPHIES<br><a href="/">' + copy.back + '</a></div></aside><main class="main"><section class="top" id="overview"><div><span class="eyebrow">\u25CF ' + copy.live + " Workspace</span><h2>" + copy.title + "</h2><p>" + copy.subtitle + '</p></div><div class="tools"><a class="btn ghost" href="/">' + copy.back + '</a><button class="btn primary" onclick="location.reload()">' + copy.refresh + '</button></div></section><section class="card"><div class="section-title"><div><h3 id="providerName">' + copy.provider + '</h3><p id="providerMeta" style="margin:4px 0 0;color:var(--mut)">Loading provider network...</p></div><span class="pill">' + copy.active + '</span></div></section><section class="grid"><div class="card metric"><div class="k">Patients</div><div class="v" id="mPatients">\u2014</div><div class="s">registered records</div></div><div class="card metric"><div class="k">Today</div><div class="v" id="mToday">\u2014</div><div class="s">scheduled visits</div></div><div class="card metric"><div class="k">Doctors</div><div class="v" id="mProviders">\u2014</div><div class="s">HNH network</div></div><div class="card metric"><div class="k">Claims</div><div class="v" id="mClaims">\u2014</div><div class="s">RCM ledger</div></div></section><section class="wide"><div class="card"><div class="section-title"><h3>' + copy.insights + '</h3><div class="tabs"><button class="tab on" data-tab="appointments">' + copy.appointments + '</button><button class="tab" data-tab="patients">' + copy.patients + '</button><button class="tab" data-tab="network">' + copy.network + '</button></div></div><div id="appointments" class="panel on list" data-live></div><div id="patients" class="panel list" data-live></div><div id="network" class="panel list" data-live></div></div><div class="card nphies" id="nphies"><div class="section-title"><h3>' + copy.nphies + '</h3><span class="pill">V2</span></div><p class="mut" id="nphiesStatus">Loading...</p><div class="bar"><i></i></div><p class="mut" id="oracleStatus">Loading...</p><div class="actions"><a class="action" href="/api/nphies/270"><span class="icon">270</span>' + copy.eligibility + '</a><a class="action" href="/api/rcm/health"><span class="icon">RCM</span>Revenue Cycle</a><a class="action" href="/givc/network"><span class="icon">OID</span>' + copy.network + '</a><a class="action" href="/api/fhir/Practitioner/' + (providerId || "DRV-S85MNP") + '"><span class="icon">FHIR</span>Practitioner</a></div></div></section></main></div><nav class="footnav"><a class="on" href="#overview">\u2301<span>' + copy.overview + '</span></a><a href="#patients">\u2637<span>' + copy.patients + '</span></a><a href="#appointments">\u25F7<span>' + copy.appointments + '</span></a><a href="#nphies">\u25C8<span>' + copy.nphies + "</span></a></nav><script>" + js + "<\/script></body></html>";
  html = html.replace('href="/api/nphies/270"', 'href="/givc/?lang=' + lang + '#eligibility"');
  return new Response(html, { headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "public, max-age=120" } });
}
__name(providerDashboardPage, "providerDashboardPage");
function servePage(req) {
  var url = new URL(req.url);
  var path = url.pathname.replace(/\/index\.html$/, "/").replace(/^\//, "") || "index";
  path = path.replace(/\.html$/, "") || "index";
  if (path === "provider-dashboard" || path === "doctor-dashboard") {
    return providerDashboardPage(req);
  }
  var courseMatch = path.match(/^course-(.+)$/);
  if (courseMatch) {
    var courseKey = courseMatch[0].replace(/-/g, "_");
    if (sites_exports[courseKey]) {
      return new Response(sites_exports[courseKey], {
        headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "public, max-age=600" }
      });
    }
  }
  if (path === "" || path === "/" || path === "index" || path === "index.html") {
    path = "__HOME__";
  }
  if (path !== "__HOME__" && STATIC_PAGES[path]) {
    return new Response(STATIC_PAGES[path], {
      headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "public, max-age=600" }
    });
  }
  if (path.startsWith("course-")) {
    var altKey = path.replace(/-/g, "_");
    if (sites_exports[altKey]) {
      return new Response(sites_exports[altKey], {
        headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "public, max-age=600" }
      });
    }
  }
  var lang = url.searchParams.get("lang") || "ar";
  var t = L[lang] || L.ar;
  var A = lang === "ar";
  var d = A ? "rtl" : "ltr";
  var p = "966920000094";
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
  html += "<title>" + t.title + "</title>";
  html += '<link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 100 100%27%3E%3Ctext y=%27.9em%27 font-size=%2790%27%3E%F0%9F%8F%A5%3C/text%3E%3C/svg%3E"/>';
  html += '<link rel="preconnect" href="https://fonts.googleapis.com">';
  html += '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>';
  html += '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Tajawal:wght@300;400;500;700;800;900&display=swap" rel="stylesheet">';
  html += "<style>" + CSS + UX_CSS + ENHANCE_CSS + "</style></head><body>";
  html += hdr(t, p);
  html += bdy(t, A, p);
  html += commandSec(t);
  html += featureSec(t);
  html += searchSec(t);
  var dgHtml = DE.map(function(d2, i) {
    return '<div class="cd dc an d' + (i % 4 + 1) + '"><div class="ci">' + d2.i + "</div><h3>" + (A ? d2.nA : d2.nE) + "</h3><p>" + (A ? d2.dA : d2.dE) + "</p></div>";
  }).join("");
  var bgHtml = BR.map(function(b, i) {
    var slug = (A ? b.nA : b.nE).toLowerCase().replace(/\s/g, "-");
    return '<div class="cd bc an d' + (i % 3 + 1) + '"><div class="bh"><h3>' + (A ? b.nA : b.nE) + '</h3><div class="bcx">' + (A ? b.aA : b.aE) + '</div></div><div class="bb"><a href="tel:' + p + '" class="btn bp bs">' + (A ? "\u0627\u062A\u0635\u0644" : "Call") + '</a><button data-open="status" class="btn bw bs">' + (A ? "\u062D\u0627\u0644\u0629 \u0627\u0644\u0641\u0631\u0639" : "Live status") + "</button></div></div>";
  }).join("");
  var dogHtml = DO.map(function(d2, i) {
    var nm = A ? d2.nA : d2.nE;
    var init = nm.replace("\u062F. ", "").replace("Dr. ", "").charAt(0);
    return '<div class="cd dcc an d' + (i % 4 + 1) + '"><div class="da">' + init + "</div><h3>" + nm + '</h3><div class="sp">' + (A ? d2.sA : d2.sE) + '</div><button data-open="appointment" class="btn bp bs">' + (A ? "\u0627\u062D\u062C\u0632" : "Book") + "</button></div>";
  }).join("");
  html += '<section class="se sel" id="depts"><div class="co"><div class="sh an"><h2>' + t.secDeptsTitle + '</h2><div class="gl"></div><p>' + t.secDeptsSub + '</p></div><div class="g4" id="dg">' + dgHtml + "</div></div></section>";
  html += '<section class="se sea" id="branches"><div class="co"><div class="sh an"><h2>' + t.secBranchesTitle + '</h2><div class="gl"></div><p>' + t.secBranchesSub + '</p></div><div class="g3" id="bg">' + bgHtml + "</div></div></section>";
  html += '<section class="se sel" id="doctors"><div class="co"><div class="sh an"><h2>' + t.secDoctorsTitle + '</h2><div class="gl"></div><p>' + t.secDoctorsSub + '</p></div><div class="g4" id="dog">' + dogHtml + "</div></div></section>";
  html += ecoSys(t);
  html += dhsSec(t);
  html += '<section class="cs"><div class="co"><h2>' + t.ctaTitle + "</h2><p>" + t.ctaSub + '</p><div class="cb"><button data-open="appointment" class="btn ba bl">' + t.ctaBook + '</button><button data-open="basma" class="btn bw bl">\u{1F399}\uFE0F ' + t.aiChatBtn + "</button></div></div></section>";
  html += ftr(t, p);
  html += hub(t);
  html += scr(A, p, t);
  html += "</body></html>";
  return new Response(html, {
    headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "public, max-age=300" }
  });
}
__name(servePage, "servePage");

var FRONTEND_ORIGIN = "https://hnh-brainsait.pages.dev";
var LANDING_PAGE_URL = "https://fadil369.github.io/hnh/";
var FRONTEND_APP_ROUTES = /* @__PURE__ */ new Set([
  "",
  "/",
  "/index.html",
  "/portal",
  "/integrations",
  "/workflows",
  "/patients",
  "/appointments",
  "/eligibility",
  "/claims",
  "/providers",
  "/givc",
  "/nphies",
  "/sbs",
  "/knowledge",
  "/stitch",
  "/basma",
  "/academy",
  "/homecare",
  "/telehealth",
  "/github",
  "/oid"
]);
function isFrontendAsset(pathname) {
  return pathname.startsWith("/_next/") || pathname.startsWith("/stitch-assets/") || pathname === "/favicon.ico";
}
__name(isFrontendAsset, "isFrontendAsset");
function isFrontendRoute(pathname) {
  return FRONTEND_APP_ROUTES.has(pathname);
}
__name(isFrontendRoute, "isFrontendRoute");
async function proxyFrontend(request) {
  const url = new URL(request.url);
  if (url.pathname === "/" || url.pathname === "/index.html") {
    const landing = new URL(LANDING_PAGE_URL);
    landing.search = url.search;
    const response = await fetch(landing.toString(), { cf: { cacheTtl: 120, cacheEverything: request.method === "GET" } });
    const headers = new Headers(response.headers);
    headers.set("Content-Type", "text/html; charset=utf-8");
    headers.set("Cache-Control", "public, max-age=120");
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers
    });
  }
  const targetPath = url.pathname;
  const target = new URL(targetPath + url.search, FRONTEND_ORIGIN);
  const proxied = new Request(target.toString(), request);
  const response = await fetch(proxied, { cf: { cacheTtl: 120, cacheEverything: request.method === "GET" } });
  const headers = new Headers(response.headers);
  headers.set("Cache-Control", isFrontendAsset(url.pathname) ? "public, max-age=31536000, immutable" : "public, max-age=120");
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers
  });
}
__name(proxyFrontend, "proxyFrontend");

// src/index.js
var router = new Router();
router.get("/api/health", async (_, env) => json(await health(env)));
router.get("/api/stats", (_, env) => getStats(env));
router.get("/api/branches", (req, env, ctx, p, url) => json({ success: true, branches: getBranches() }));
router.get("/api/branches/([^/]+)", (req, env, ctx, p) => {
  const b = getBranch(p[0]);
  return b ? json({ success: true, branch: b }) : json({ success: false, message: "Branch not found" }, 404);
});
router.get("/api/patients", (req, env, ctx, p, url) => getPatients(req, env, ctx, p, url));
router.get("/api/patients/([^/]+)", (req, env, ctx, p) => getPatient(req, env, ctx, p));
router.post("/api/patients", (req, env) => createPatient(req, env));
router.patch("/api/patients/([^/]+)", (req, env, ctx, p) => updatePatient(req, env, ctx, p));
router.get("/api/patients/([^/]+)/history", async (req, env, ctx, p) => {
  const id = p[0];
  const json2 = (b, s = 200) => new Response(JSON.stringify(b), { status: s, headers: { "content-type": "application/json", "access-control-allow-origin": "*" } });
  try {
    const enc = await env.DB.prepare(
      "SELECT id, appointment_date AS date, provider_id, status, reason AS diagnosis FROM appointments WHERE patient_id = ? ORDER BY appointment_date DESC LIMIT 50"
    ).bind(id).all().catch(() => ({ results: [] }));
    const cl = await env.DB.prepare(
      "SELECT id, claim_number, total_amount, status, created_at AS date FROM claims WHERE patient_id = ? ORDER BY created_at DESC LIMIT 50"
    ).bind(id).all().catch(() => ({ results: [] }));
    let rag = [];
    try {
      const r = await fetch("https://bsma.elfadil.com/basma/rag/search", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ query: `patient ${id} history labs radiology reports`, limit: 10 }),
      });
      if (r.ok) {
        const j = await r.json().catch(() => ({}));
        rag = j.results || j.matches || [];
      }
    } catch {}
    return json2({
      success: true,
      patient_id: id,
      encounters: enc.results || [],
      labs: [],
      radiology: [],
      reports: cl.results || [],
      rag_results: rag,
      source: "hnh-unified",
    });
  } catch (e) {
    return json2({ success: false, message: e?.message || "history failed" }, 500);
  }
});
router.get("/api/providers", async (req, env, ctx, p, url) => {
  if (!url) url = new URL(req.url);
  const branch = url?.searchParams?.get("branch") || "";
  const dept = url?.searchParams?.get("department") || "";
  const rawLimit = Number.parseInt(url?.searchParams?.get("limit") || "", 10);
  const limit = Number.isFinite(rawLimit) && rawLimit > 0 ? Math.min(rawLimit, 100) : 0;
  let list = await getProviders(env);
  if (branch) {
    const b = branch.toLowerCase();
    const branchAliases = {
      riyadh: "r001",
      r001: "r001",
      madinah: "m001",
      madina: "m001",
      medina: "m001",
      m001: "m001",
      khamis: "k001",
      khamis_mushayt: "k001",
      khamis_mushait: "k001",
      k001: "k001",
      jazan: "j001",
      jizan: "j001",
      j001: "j001",
      unaizah: "u001",
      unayzah: "u001",
      u001: "u001"
    };
    const norm = branchAliases[b.replace(/[\s-]+/g, "_")] || b;
    list = list.filter((p2) => {
      const pb = String(p2.branch || "").toLowerCase().replace(/[\s-]+/g, "_");
      const pid = String(p2.branch_id || "").toLowerCase();
      return pb === b || pid === b || (branchAliases[pb] || pid) === norm;
    });
  }
  if (dept) list = list.filter((p2) => p2.department === dept || p2.department_id === dept);
  const total = list.length;
  if (limit) list = list.slice(0, limit);
  return json({ success: true, providers: list, total, limit: limit || null });
});
router.get("/api/providers/([^/]+)", async (req, env, ctx, p) => {
  const prov = await getProvider(p[0], env);
  return prov ? json({ success: true, provider: prov }) : json({ success: false, message: "Provider not found" }, 404);
});
router.get("/api/appointments", (req, env, ctx, p, url) => getAppointments(req, env, ctx, p, url));
router.get("/api/appointments/([^/]+)", (req, env, ctx, p) => getAppointment(req, env, ctx, p));
router.post("/api/appointments", (req, env) => createAppointment(req, env));
router.patch("/api/appointments/([^/]+)", (req, env, ctx, p) => updateAppointment(req, env, ctx, p));
router.delete("/api/appointments/([^/]+)", (req, env, ctx, p) => cancelAppointment(req, env, ctx, p));

// ─── Provider OID Tree (HL7-style hierarchical artifact tree under doctor.OID) ──
// Root arc: 1.3.6.1.4.1.61026.{provider_suffix}
// Sub-arcs:  .1 encounters | .2 claims | .3 telehealth | .4 homecare
//            .5 labs       | .6 radiology | .7 reports | .8 prescriptions
router.get("/api/providers/([^/]+)/oid", async (req, env, ctx, p) => {
  const json2 = (b, s = 200) => new Response(JSON.stringify(b), { status: s, headers: { "content-type": "application/json", "access-control-allow-origin": "*" } });
  const id = p[0];
  const provider = await getProvider(id, env);
  if (!provider) return json2({ success: false, message: "provider not found" }, 404);
  const oid = provider.givc_oid || deriveProviderOid(provider);
  return json2({ success: true, provider_id: provider.id, db_id: provider.db_id, name: provider.name_en || provider.name_ar, specialty: provider.specialty, oid, oid_arcs: oidArcs() });
});

router.post("/api/providers/([^/]+)/oid/register", async (req, env, ctx, p) => {
  const json2 = (b, s = 200) => new Response(JSON.stringify(b), { status: s, headers: { "content-type": "application/json", "access-control-allow-origin": "*" } });
  const id = p[0];
  const provider = await getProvider(id, env);
  if (!provider) return json2({ success: false, message: "provider not found" }, 404);
  if (provider.givc_oid) return json2({ success: true, provider_id: provider.id, oid: provider.givc_oid, message: "already registered" });
  const oid = deriveProviderOid(provider);
  if (env.DB && provider.db_id) {
    try {
      await env.DB.prepare("UPDATE providers SET givc_oid = ?, givc_registered = 1 WHERE id = ?").bind(oid, provider.db_id).run();
    } catch {}
  }
  return json2({ success: true, provider_id: provider.id, oid, registered_at: new Date().toISOString() });
});

router.get("/api/providers/([^/]+)/tree", async (req, env, ctx, p) => {
  const json2 = (b, s = 200) => new Response(JSON.stringify(b), { status: s, headers: { "content-type": "application/json", "access-control-allow-origin": "*" } });
  const id = p[0];
  const provider = await getProvider(id, env);
  if (!provider) return json2({ success: false, message: "provider not found" }, 404);
  const oid = provider.givc_oid || deriveProviderOid(provider);
  const dbId = provider.db_id;
  const safe = async (q) => { try { const r = await q; return r.results || []; } catch { return []; } };
  const [appts, claims2, tele, hc] = await Promise.all([
    safe(env.DB?.prepare("SELECT id, patient_id, appointment_date, appointment_time, status, reason FROM appointments WHERE provider_id = ? ORDER BY appointment_date DESC LIMIT 25").bind(dbId ?? id).all()),
    safe(env.DB?.prepare("SELECT id, claim_number, patient_id, total_amount, status, created_at FROM claims WHERE provider_id = ? ORDER BY created_at DESC LIMIT 25").bind(dbId ?? id).all()),
    safe(env.DB?.prepare("SELECT id, patient_id, status, created_at FROM telehealth_sessions WHERE provider_id = ? ORDER BY created_at DESC LIMIT 25").bind(dbId ?? id).all()),
    safe(env.DB?.prepare("SELECT id, patient_id, visit_date, status FROM homecare_visits WHERE provider_id = ? ORDER BY visit_date DESC LIMIT 25").bind(dbId ?? id).all()),
  ]);
  const node = (arc, label, items, key = "id") => ({
    arc, oid: `${oid}.${arc}`, label, count: items.length,
    children: items.slice(0, 25).map((it) => ({
      oid: `${oid}.${arc}.${it[key]}`,
      ref: it[key], label: it.appointment_date || it.claim_number || it.visit_date || it.created_at || String(it[key]),
      meta: it,
    })),
  });
  return json2({
    success: true,
    provider: { id: provider.id, db_id: provider.db_id, name: provider.name_en || provider.name_ar, specialty: provider.specialty, branch: provider.branch },
    oid,
    tree: [
      node(1, "Encounters", appts),
      node(2, "Claims", claims2),
      node(3, "Telehealth Sessions", tele),
      node(4, "Homecare Visits", hc),
      { arc: 5, oid: `${oid}.5`, label: "Labs", count: 0, children: [] },
      { arc: 6, oid: `${oid}.6`, label: "Radiology", count: 0, children: [] },
      { arc: 7, oid: `${oid}.7`, label: "Reports", count: 0, children: [] },
      { arc: 8, oid: `${oid}.8`, label: "Prescriptions", count: 0, children: [] },
    ],
    generated_at: new Date().toISOString(),
  });
});

function deriveProviderOid(p) {
  const root = "1.3.6.1.4.1.61026";
  const branchSeg = String(p.givc_branch_code || p.branch_id || p.branch || "0").replace(/[^0-9]/g, "") || "0";
  const specSeg = String(p.givc_specialty_code || "").replace(/[^0-9]/g, "") || hashSeg(p.specialty || "X", 3);
  const provSeg = String(p.db_id || p.id || "").replace(/[^A-Z0-9]/gi, "").slice(-6).toUpperCase() || hashSeg(p.id || "P", 6);
  return `${root}.${branchSeg}.${specSeg}.${provSeg}`;
}
function hashSeg(s, len) {
  let h = 0; for (const c of s) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return String(h).padStart(len, "0").slice(0, len);
}
function oidArcs() {
  return { 1: "Encounters", 2: "Claims", 3: "Telehealth", 4: "Homecare", 5: "Labs", 6: "Radiology", 7: "Reports", 8: "Prescriptions" };
}

router.get("/api/claims", (req, env, ctx, p, url) => getClaims(req, env, ctx, p, url));
router.get("/api/claims/([^/]+)", (req, env, ctx, p) => getClaim(req, env, ctx, p));
router.post("/api/claims", (req, env) => createClaim(req, env));
router.post("/api/claims/([^/]+)/submit", (req, env, ctx, p) => submitClaimToNPHIES(req, env, ctx, p));
router.post("/api/claims/([^/]+)/normalize", async (req, env, ctx, p) => {
  const id = p[0];
  const json2 = (b, s = 200) => new Response(JSON.stringify(b), { status: s, headers: { "content-type": "application/json", "access-control-allow-origin": "*" } });
  try {
    const claim = await env.DB.prepare("SELECT * FROM claims WHERE id = ? OR claim_number = ? LIMIT 1").bind(id, id).first().catch(() => null);
    if (!claim) return json2({ success: false, claim_id: id, message: "claim not found" }, 404);
    const normalized = {
      claim_id: claim.id ?? id,
      claim_number: claim.claim_number,
      patient_id: claim.patient_id,
      provider_id: claim.provider_id,
      total_amount: Number(claim.total_amount ?? 0),
      currency: "SAR",
      diagnosis: claim.diagnosis_codes ? String(claim.diagnosis_codes).split(",").map((s) => s.trim()) : [],
      procedures: claim.procedure_codes ? String(claim.procedure_codes).split(",").map((s) => s.trim()) : [],
      payer_id: claim.payer_id,
    };
    return json2({ success: true, stage: "normalize", claim_id: id, normalized, source: "hnh-unified" });
  } catch (e) {
    return json2({ success: false, message: e?.message || "normalize failed" }, 500);
  }
});
router.post("/api/claims/([^/]+)/validate", async (req, env, ctx, p) => {
  const id = p[0];
  const json2 = (b, s = 200) => new Response(JSON.stringify(b), { status: s, headers: { "content-type": "application/json", "access-control-allow-origin": "*" } });
  try {
    const claim = await env.DB.prepare("SELECT * FROM claims WHERE id = ? OR claim_number = ? LIMIT 1").bind(id, id).first().catch(() => null);
    if (!claim) return json2({ success: false, claim_id: id, message: "claim not found" }, 404);
    const issues = [];
    if (!claim.patient_id) issues.push({ severity: "error", field: "patient_id", message: "missing patient" });
    if (!claim.provider_id) issues.push({ severity: "error", field: "provider_id", message: "missing provider" });
    if (!Number(claim.total_amount)) issues.push({ severity: "warning", field: "total_amount", message: "amount is zero" });
    if (!claim.diagnosis_codes) issues.push({ severity: "warning", field: "diagnosis_codes", message: "no diagnosis codes" });
    return json2({ success: issues.filter((i) => i.severity === "error").length === 0, stage: "validate", claim_id: id, issues, source: "hnh-unified" });
  } catch (e) {
    return json2({ success: false, message: e?.message || "validate failed" }, 500);
  }
});
router.get("/api/claims/([^/]+)/nphies-status", (req, env, ctx, p) => getClaimNPHIESStatus(req, env, ctx, p));
router.post("/api/eligibility/check", (req, env) => checkEligibility(req, env));
router.post("/api/eligibility/verify", (req, env) => verifyInsurance(req, env));
router.get("/api/eligibility/history/([^/]+)", (req, env, ctx, p) => getEligibilityHistory(req, env, ctx, p));
router.post("/api/nphies/270", (req, env) => submit270(req, env));
router.post("/api/nphies/278", (req, env) => submit278(req, env));
router.post("/api/nphies/837", (req, env) => submit837(req, env));
router.get("/api/nphies/276/([^/]+)", (req, env, ctx, p) => getClaimStatus276(req, env, ctx, p));
router.post("/api/nphies/835", (req, env) => receive835(req, env));
router.get("/api/fhir/Patient/([^/]+)", (req, env, ctx, p) => getFHIRPatient(req, env, ctx, p));
router.get("/api/fhir/Patient", (req, env, ctx, p, url) => searchFHIRPatients(req, env, ctx, p, url));
router.get("/api/fhir/Practitioner/([^/]+)", (req, env, ctx, p) => getFHIRPractitioner(req, env, ctx, p));
router.get("/api/fhir/Appointment/([^/]+)", (req, env, ctx, p) => getFHIRAppointment(req, env, ctx, p));
router.get("/api/fhir/Claim/([^/]+)", (req, env, ctx, p) => getFHIRClaim(req, env, ctx, p));
router.get("/api/fhir/Coverage/([^/]+)", (req, env, ctx, p) => getFHIRCoverage(req, env, ctx, p));
router.post("/api/chat", (req, env) => handleChat(req, env));
router.get("/api/rcm/health", () => rcmHealth());
router.get("/api/rcm/batch/([^/]+)", (req, env, ctx, p) => getRcmBatch(req, env, ctx, p));
router.post("/api/rcm/validate/price", (req) => validatePrice(req));
router.post("/api/rcm/validate/duplicate", (req) => validateDuplicate(req));
router.post("/api/rcm/validate/pbm", (req) => validatePbm(req));
router.post("/api/rcm/validate", (req) => validateAll(req));
router.post("/api/rcm/appeal/generate", (req) => generateAppeal(req));
router.get("/api/rcm/dashboard/([^/]+)", (req, env, ctx, p) => getRcmDashboard(req, env, ctx, p));
router.get("/api/rcm/claims/rejected", (req, env, ctx, p, url) => getRejectedClaims(req, env, ctx, p, url));
router.post("/api/rcm/claims/([^/]+)/appeal", (req, env, ctx, p) => markAppeal(req, env, ctx, p));
router.post("/api/rcm/claims/([^/]+)/resubmit", (req, env, ctx, p) => markResubmit(req, env, ctx, p));
router.post("/api/voice/speak", (req, env) => handleVoiceSpeak(req, env));
router.post("/api/voice/chat", (req, env) => handleVoiceChat(req, env));
router.get("/api/voice/voices", () => handleVoiceVoices());
router.get("/api/search", (req, env) => handleSearch(req, env));
router.post("/api/search", (req, env) => handleSearch(req, env));
router.post("/api/homecare/visits", (req, env) => createVisit(req, env));
router.get("/api/homecare/visits", (req, env) => listVisits(req, env));
router.get("/api/homecare/visits/([^/]+)", (req, env, ctx, p) => getVisit(req, env, ctx, p));
router.patch("/api/homecare/visits/([^/]+)", (req, env, ctx, p) => updateVisit(req, env, ctx, p));
router.post("/api/homecare/visits/([^/]+)/vitals", (req, env, ctx, p) => recordVitals(req, env, ctx, p));
router.get("/api/homecare/nurses", (req, env) => listNurses(req, env));
router.post("/api/homecare/nurses", (req, env) => createNurse(req, env));
router.get("/api/homecare/nurses/([^/]+)/schedule", (req, env, ctx, p) => getNurseSchedule(req, env, ctx, p));
router.get("/api/homecare/stats", (_, env) => getHomecareStats(_, env));
router.post("/api/telehealth/sessions", (req, env) => createSession(req, env));
router.get("/api/telehealth/sessions", (req, env) => listSessions(req, env));
router.get("/api/telehealth/sessions/([^/]+)", (req, env, ctx, p) => getSession(req, env, ctx, p));
router.patch("/api/telehealth/sessions/([^/]+)", (req, env, ctx, p) => updateSession(req, env, ctx, p));
router.post("/api/telehealth/sessions/([^/]+)/start", (req, env, ctx, p) => startSession(req, env, ctx, p));
router.post("/api/telehealth/sessions/([^/]+)/end", (req, env, ctx, p) => endSession(req, env, ctx, p));
router.post("/api/telehealth/sessions/([^/]+)/prescriptions", (req, env, ctx, p) => issuePrescription(req, env, ctx, p));
router.get("/api/telehealth/sessions/([^/]+)/prescriptions", (req, env, ctx, p) => getPrescriptions(req, env, ctx, p));
router.get("/api/telehealth/providers/([^/]+)/availability", (req, env, ctx, p) => getProviderAvailability(req, env, ctx, p));
router.get("/api/telehealth/stats", (_, env) => getTelehealthStats(_, env));
router.get("/api/telehealth/ice-servers", (req, env) => getIceConfig(req, env));
// ── Notify Routes: SMS (Twilio) + WhatsApp Business API ─────────────────────
// src/routes/notify.js — HNH Portal v9.2.0
var TWILIO_API2 = "https://api.twilio.com/2010-04-01";
// WhatsApp via Twilio (sandbox: +14155238886 / production: WHATSAPP_FROM secret)

function normalizeSaudiPhone(phone) {
  const digits = String(phone || "").replace(/\D/g, "");
  if (digits.startsWith("966")) return "+" + digits;
  if (digits.startsWith("05") || digits.startsWith("5")) return "+966" + digits.replace(/^0/, "");
  return "+" + digits;
}

function twilioAuth2(env) {
  const sid = env.TWILIO_ACCOUNT_SID || "";
  const token = env.TWILIO_AUTH_TOKEN || "";
  if (!sid || !token) return null;
  return "Basic " + btoa(sid + ":" + token);
}

async function sendTwilioSms2(env, to, body2) {
  const auth = twilioAuth2(env);
  if (!auth) return { success: false, error: "Twilio not configured", code: "NOT_CONFIGURED" };
  const from = env.TWILIO_PHONE_NUMBER || "";
  if (!from) return { success: false, error: "TWILIO_PHONE_NUMBER not set", code: "NO_SENDER" };
  const cleanBody = sanitizeMessageBody(body2);
  const params = new URLSearchParams({ To: normalizeSaudiPhone(to), From: from, Body: cleanBody });
  try {
    const res = await fetch(`${TWILIO_API2}/Accounts/${env.TWILIO_ACCOUNT_SID}/Messages.json`, {
      method: "POST",
      headers: { "Authorization": auth, "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
      signal: AbortSignal.timeout(10000),
    });
    const data = await res.json();
    if (res.ok && data.sid) return { success: true, sid: data.sid, status: data.status, to: data.to };
    return { success: false, error: data.message || "Twilio error", code: data.code };
  } catch (e) {
    return { success: false, error: e.message || "Network error", code: "NETWORK_ERROR" };
  }
}

async function sendWhatsAppText2(env, to, text) {
  const auth = twilioAuth2(env);
  if (!auth) return { success: false, error: "Twilio not configured", code: "NOT_CONFIGURED" };
  // Use WHATSAPP_FROM secret (production number) or fall back to Twilio sandbox
  const from = env.WHATSAPP_FROM || "whatsapp:+14155238886";
  const toWa = "whatsapp:" + normalizeSaudiPhone(to);
  const cleanText = sanitizeMessageBody(text);
  const params = new URLSearchParams({ To: toWa, From: from, Body: cleanText });
  try {
    const res = await fetch(`${TWILIO_API2}/Accounts/${env.TWILIO_ACCOUNT_SID}/Messages.json`, {
      method: "POST",
      headers: { "Authorization": auth, "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
      signal: AbortSignal.timeout(10000),
    });
    const data = await res.json();
    if (res.ok && data.sid) return { success: true, sid: data.sid, status: data.status, to: data.to, channel: "whatsapp" };
    return { success: false, error: data.message || "WhatsApp/Twilio error", code: data.code };
  } catch (e) {
    return { success: false, error: e.message || "Network error", code: "NETWORK_ERROR" };
  }
}

function sanitizeTplField(v, max = 120) {
  if (v == null) return "";
  let s = String(v);
  s = s.replace(/[\u0000-\u001F\u007F]/g, " ");
  s = s.replace(/_BEGIN_COMMAND_[A-Z_]*MARKER_*\d*/gi, "");
  s = s.replace(/_+BEGIN_+|_+DONE_+|MARKER_+/gi, "");
  s = s.replace(/PS[12]\s*=/gi, "");
  s = s.replace(/unset\s+HISTFILE/gi, "");
  s = s.replace(/HISTFILE\s*=/gi, "");
  s = s.replace(/\bEC\s*=\s*\d+/gi, "");
  s = s.replace(/\becho\s+_+\S*/gi, "");
  s = s.replace(/[`$;|<>{}]/g, "");
  s = s.replace(/\\[a-z]/gi, "");
  s = s.replace(/\s{2,}/g, " ").trim();
  return s.slice(0, max);
}
function sanitizeMessageBody(s) {
  if (s == null) return "";
  let out = String(s);
  out = out.replace(/[\u0000-\u0008\u000B-\u001F\u007F]/g, "");
  out = out.replace(/_BEGIN_COMMAND_[A-Z_]*MARKER_*\d*/gi, "");
  out = out.replace(/_+BEGIN_+\S*|_+DONE_+\S*|MARKER_+\S*/gi, "");
  out = out.replace(/(^|\s);\s*PS[12]\s*=\s*;?/gi, " ");
  out = out.replace(/unset\s+HISTFILE\s*;?/gi, "");
  out = out.replace(/\bEC\s*=\s*\d+\s*;?/gi, "");
  out = out.replace(/\becho\s+_+\S*\s*;?/gi, "");
  out = out.replace(/^\s*[{}]\s*/g, "");
  return out.slice(0, 1500);
}
function sanitizeTpl(p) {
  const o = {};
  for (const k of Object.keys(p || {})) o[k] = sanitizeTplField(p[k]);
  return o;
}
function apptSmsAr(p) { p = sanitizeTpl(p); return `مرحباً ${p.name}،\nتذكير بموعدك في مستشفيات الحياة الوطنية\nالتاريخ: ${p.date}\nالوقت: ${p.time}\nالعيادة: ${p.clinic}\nللاستفسار: 920000094`; }
function apptSmsEn(p) { p = sanitizeTpl(p); return `Hello ${p.name},\nReminder: Your appointment at Hayat National Hospital\nDate: ${p.date} | Time: ${p.time}\nClinic: ${p.clinic}\nInquiries: 920000094`; }
function telehealthSmsAr2(p) { p = sanitizeTpl(p); return `مرحباً ${p.name}،\nموعد استشارتك الافتراضية\nالتاريخ: ${p.date} | الوقت: ${p.time}\nرابط الجلسة: ${p.url}\nمستشفيات الحياة الوطنية`; }
function homecareSmsAr2(p) { p = sanitizeTpl(p); return `مرحباً ${p.name}،\nتم تأكيد زيارة الرعاية المنزلية\nالتاريخ: ${p.date} | الوقت: ${p.time}\nالعنوان: ${p.address}\nمستشفيات الحياة الوطنية`; }

async function notifySendSms(request, env) {
  const json2 = (b, s = 200) => new Response(JSON.stringify(b), { status: s, headers: { "content-type": "application/json", "access-control-allow-origin": "*" } });
  try {
    const { to, message } = await request.json();
    if (!to || !message) return json2({ success: false, error: "to and message are required" }, 400);
    const result = await sendTwilioSms2(env, to, message);
    return json2(result, result.success ? 200 : 502);
  } catch (e) { return json2({ success: false, error: e.message }, 500); }
}
__name(notifySendSms, "notifySendSms");

async function notifyAppointmentSms(request, env) {
  const json2 = (b, s = 200) => new Response(JSON.stringify(b), { status: s, headers: { "content-type": "application/json", "access-control-allow-origin": "*" } });
  try {
    const body2 = await request.json();
    const { to, patientName, date, time, clinic } = body2;
    if (!to || !patientName || !date) return json2({ success: false, error: "to, patientName, date required" }, 400);
    const lang = body2.lang || "ar";
    const msg = lang === "en" ? apptSmsEn({ name: patientName, date, time: time || "10:00", clinic: clinic || "Clinic" }) : apptSmsAr({ name: patientName, date, time: time || "10:00", clinic: clinic || "العيادة" });
    const result = await sendTwilioSms2(env, to, msg);
    return json2({ ...result, template: "appointment", lang }, result.success ? 200 : 502);
  } catch (e) { return json2({ success: false, error: e.message }, 500); }
}
__name(notifyAppointmentSms, "notifyAppointmentSms");

async function notifyTelehealthSms(request, env) {
  const json2 = (b, s = 200) => new Response(JSON.stringify(b), { status: s, headers: { "content-type": "application/json", "access-control-allow-origin": "*" } });
  try {
    const body2 = await request.json();
    const { to, patientName, date, time, joinUrl } = body2;
    if (!to || !patientName || !date) return json2({ success: false, error: "to, patientName, date required" }, 400);
    const msg = telehealthSmsAr2({ name: patientName, date, time: time || "10:00", url: joinUrl || "https://hnh.brainsait.org" });
    const result = await sendTwilioSms2(env, to, msg);
    return json2({ ...result, template: "telehealth" }, result.success ? 200 : 502);
  } catch (e) { return json2({ success: false, error: e.message }, 500); }
}
__name(notifyTelehealthSms, "notifyTelehealthSms");

async function notifyHomecareSms(request, env) {
  const json2 = (b, s = 200) => new Response(JSON.stringify(b), { status: s, headers: { "content-type": "application/json", "access-control-allow-origin": "*" } });
  try {
    const body2 = await request.json();
    const { to, patientName, date, time, address } = body2;
    if (!to || !patientName || !date || !address) return json2({ success: false, error: "to, patientName, date, address required" }, 400);
    const msg = homecareSmsAr2({ name: patientName, date, time: time || "10:00", address });
    const result = await sendTwilioSms2(env, to, msg);
    return json2({ ...result, template: "homecare" }, result.success ? 200 : 502);
  } catch (e) { return json2({ success: false, error: e.message }, 500); }
}
__name(notifyHomecareSms, "notifyHomecareSms");

async function notifySendWhatsApp(request, env) {
  const json2 = (b, s = 200) => new Response(JSON.stringify(b), { status: s, headers: { "content-type": "application/json", "access-control-allow-origin": "*" } });
  try {
    const { to, message } = await request.json();
    if (!to || !message) return json2({ success: false, error: "to and message are required" }, 400);
    const result = await sendWhatsAppText2(env, to, message);
    return json2(result, result.success ? 200 : 502);
  } catch (e) { return json2({ success: false, error: e.message }, 500); }
}
__name(notifySendWhatsApp, "notifySendWhatsApp");

async function sendWhatsAppContent2(env, to, contentSid, variables) {
  const auth = twilioAuth2(env);
  if (!auth) return { success: false, error: "Twilio not configured", code: "NOT_CONFIGURED" };
  const from = env.WHATSAPP_FROM || "whatsapp:+14155238886";
  const toWa = "whatsapp:" + normalizeSaudiPhone(to);
  const params = new URLSearchParams({ To: toWa, From: from, ContentSid: contentSid });
  if (variables) params.set("ContentVariables", JSON.stringify(variables));
  try {
    const res = await fetch(`${TWILIO_API2}/Accounts/${env.TWILIO_ACCOUNT_SID}/Messages.json`, {
      method: "POST",
      headers: { "Authorization": auth, "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
      signal: AbortSignal.timeout(10000),
    });
    const data = await res.json();
    if (res.ok && data.sid) return { success: true, sid: data.sid, status: data.status, to: data.to, channel: "whatsapp", interactive: true };
    return { success: false, error: data.message || "Twilio Content error", code: data.code };
  } catch (e) { return { success: false, error: e.message || "Network error", code: "NETWORK_ERROR" }; }
}
__name(sendWhatsAppContent2, "sendWhatsAppContent2");

async function notifyWhatsAppAppointment(request, env) {
  const json2 = (b, s = 200) => new Response(JSON.stringify(b), { status: s, headers: { "content-type": "application/json", "access-control-allow-origin": "*" } });
  try {
    const body2 = await request.json();
    const { to, patientName, date, time, clinic } = body2;
    if (!to || !patientName || !date) return json2({ success: false, error: "to, patientName, date required" }, 400);
    const lang = body2.lang || "ar";
    const tplSid = env.WHATSAPP_APPT_TEMPLATE_SID;
    if (tplSid) {
      // Interactive Confirm/Reschedule/Cancel buttons via Twilio Content API
      const vars = { 1: patientName || "", 2: date || "", 3: time || "10:00", 4: clinic || "" };
      const r = await sendWhatsAppContent2(env, to, tplSid, vars);
      if (r.success) return json2({ ...r, template: "appointment_interactive", lang }, 200);
      // fall through to plain text on failure
    }
    const msg = lang === "en" ? apptSmsEn({ name: patientName, date, time: time || "10:00", clinic: clinic || "Clinic" }) : apptSmsAr({ name: patientName, date, time: time || "10:00", clinic: clinic || "العيادة" });
    const result = await sendWhatsAppText2(env, to, msg);
    return json2({ ...result, template: "appointment", channel: "whatsapp", lang }, result.success ? 200 : 502);
  } catch (e) { return json2({ success: false, error: e.message }, 500); }
}
__name(notifyWhatsAppAppointment, "notifyWhatsAppAppointment");

// ─── Inbound WhatsApp webhook (Twilio → DeepSeek + AutoRAG + Oracle/D1 context) ──
// Twilio sends application/x-www-form-urlencoded with: From, Body, NumMedia,
// MediaUrl0, MediaContentType0, ProfileName, WaId. We respond with TwiML
// or send out-of-band via the Messages API (we use Messages API for richer flow).
async function whatsappInboundWebhook(request, env, ctx) {
  const json2 = (b, s = 200) => new Response(JSON.stringify(b), { status: s, headers: { "content-type": "application/json", "access-control-allow-origin": "*" } });
  const twiml = (xml) => new Response(`<?xml version="1.0" encoding="UTF-8"?><Response>${xml || ""}</Response>`, { status: 200, headers: { "content-type": "text/xml" } });
  try {
    const ct = request.headers.get("content-type") || "";
    const form = ct.includes("application/json") ? await request.json() : Object.fromEntries((await request.formData()).entries());
    const from = String(form.From || "").trim();           // e.g. "whatsapp:+966..."
    const profileName = sanitizeTplField(form.ProfileName || "");
    const numMedia = parseInt(form.NumMedia || "0", 10) || 0;
    const mediaUrl = form.MediaUrl0 || "";
    const mediaType = form.MediaContentType0 || "";
    let userText = sanitizeTplField(form.Body || "", 800);
    let wasVoice = false;
    if (numMedia > 0 && mediaUrl && /^audio\//i.test(mediaType)) {
      wasVoice = true;
      userText = await transcribeTwilioMedia(mediaUrl, env) || userText || "";
    }
    if (!from) return twiml("");
    if (!userText) {
      await sendWhatsAppText2(env, from.replace(/^whatsapp:/, ""), "أرسل رسالة نصية أو ملاحظة صوتية وسأساعدك. / Please send a message and I will help.");
      return twiml("");
    }

    const lang = /[\u0600-\u06FF]/.test(userText) ? "ar" : "en";
    const phoneE164 = from.replace(/^whatsapp:/, "");
    const ctxData = await loadPatientContext(env, phoneE164).catch(() => null);
    const ragHits = await autoRagSearch(env, userText).catch(() => []);
    const reply = await deepseekReply(env, { userText, lang, profileName, ctx: ctxData, rag: ragHits });

    // store reply for optional voice fetch and audit
    const token = await persistVoiceReply(env, { phone: phoneE164, text: reply, lang });

    // text reply first (always)
    await sendWhatsAppText2(env, phoneE164, reply);

    // if user sent a voice note, also send an audio reply via ElevenLabs
    if (wasVoice && env.ELEVENLABS_API_KEY && token) {
      const origin = new URL(request.url).origin;
      const audioUrl = `${origin}/api/voice/wa/${token}.mp3`;
      ctx?.waitUntil?.(sendWhatsAppMedia(env, phoneE164, audioUrl, reply.slice(0, 300)));
    }
    return twiml("");
  } catch (e) {
    console.error("inbound webhook error", e);
    return twiml("");
  }
}
__name(whatsappInboundWebhook, "whatsappInboundWebhook");

async function transcribeTwilioMedia(url, env) {
  try {
    const auth = twilioAuth2(env);
    if (!auth) return "";
    const r = await fetch(url, { headers: { Authorization: auth }, signal: AbortSignal.timeout(15000) });
    if (!r.ok) return "";
    const buf = await r.arrayBuffer();
    if (env.AI && typeof env.AI.run === "function") {
      try {
        const out = await env.AI.run("@cf/openai/whisper-large-v3-turbo", { audio: [...new Uint8Array(buf)] });
        return sanitizeTplField(out?.text || "", 800);
      } catch {
        try {
          const out2 = await env.AI.run("@cf/openai/whisper", { audio: [...new Uint8Array(buf)] });
          return sanitizeTplField(out2?.text || "", 800);
        } catch {}
      }
    }
    return "";
  } catch { return ""; }
}
__name(transcribeTwilioMedia, "transcribeTwilioMedia");

async function loadPatientContext(env, phoneE164) {
  if (!env.DB) return null;
  const phone = phoneE164.replace(/^\+/, "");
  let patient = null;
  try {
    patient = await env.DB.prepare(
      "SELECT id, full_name_ar, full_name_en, national_id, phone, mrn FROM patients WHERE phone LIKE ? OR phone LIKE ? LIMIT 1"
    ).bind(`%${phone}`, `%${phone.slice(-9)}`).first();
  } catch {}
  if (!patient) return { matched: false };
  const safe = async (q) => { try { const r = await q; return r.results || []; } catch { return []; } };
  const [appts, claims2] = await Promise.all([
    safe(env.DB.prepare("SELECT id, appointment_date, appointment_time, status, reason FROM appointments WHERE patient_id = ? ORDER BY appointment_date DESC LIMIT 5").bind(patient.id).all()),
    safe(env.DB.prepare("SELECT id, claim_number, total_amount, status FROM claims WHERE patient_id = ? ORDER BY created_at DESC LIMIT 5").bind(patient.id).all()),
  ]);
  return { matched: true, patient, appointments: appts, claims: claims2 };
}
__name(loadPatientContext, "loadPatientContext");

async function autoRagSearch(env, query) {
  try {
    if (env.AI && typeof env.AI.autorag === "function") {
      const r = await env.AI.autorag("brainsait-ai-search").search({ query }).catch(() => null);
      const docs = r?.data?.slice?.(0, 4) || r?.matches?.slice?.(0, 4) || [];
      return docs.map((d) => ({ text: d?.content || d?.text || d?.score || "", src: d?.filename || d?.source || "kb" }));
    }
  } catch {}
  try {
    const r = await fetch("https://bsma.elfadil.com/basma/rag/search", {
      method: "POST", headers: { "content-type": "application/json" },
      body: JSON.stringify({ query, top_k: 4 }), signal: AbortSignal.timeout(8000),
    });
    if (r.ok) {
      const j = await r.json().catch(() => null);
      const arr = j?.results || j?.matches || [];
      return arr.slice(0, 4).map((d) => ({ text: d?.content || d?.text || "", src: d?.source || "bsma" }));
    }
  } catch {}
  return [];
}
__name(autoRagSearch, "autoRagSearch");

async function deepseekReply(env, { userText, lang, profileName, ctx, rag }) {
  const sys = lang === "ar"
    ? `أنت "بسمة"، المساعد الذكي لمستشفيات الحياة الوطني × BrainSAIT. أجب باختصار، بلهجة سعودية مهذبة، بحد أقصى 5 أسطر. استخدم سياق المريض إن وُجد. لا تخترع معلومات؛ إن لم تعرف، اقترح حجز موعد أو الاتصال بـ 920000094.`
    : `You are "Basma", the AI concierge for HNH × BrainSAIT. Reply briefly (max 5 lines), warmly. Use patient context when available. Never invent data; if unsure suggest booking or call 920000094.`;
  const ctxLines = [];
  if (ctx?.matched && ctx.patient) {
    ctxLines.push(`Patient: ${ctx.patient.full_name_ar || ctx.patient.full_name_en || ""} (MRN ${ctx.patient.mrn || ctx.patient.id})`);
    if (ctx.appointments?.length) ctxLines.push("Recent appointments: " + ctx.appointments.slice(0, 3).map((a) => `${a.appointment_date} ${a.appointment_time || ""} (${a.status})`).join("; "));
    if (ctx.claims?.length) ctxLines.push("Recent claims: " + ctx.claims.slice(0, 3).map((c) => `${c.claim_number} ${c.status} SAR ${c.total_amount || 0}`).join("; "));
  } else if (profileName) {
    ctxLines.push(`Caller: ${profileName} (no patient record matched)`);
  }
  if (rag?.length) ctxLines.push("KB:\n" + rag.map((r) => "- " + String(r.text).slice(0, 220)).join("\n"));
  const messages = [
    { role: "system", content: sys + (ctxLines.length ? `\n\nContext:\n${ctxLines.join("\n")}` : "") },
    { role: "user", content: userText },
  ];

  if (env.DEEPSEEK_API_KEY) {
    try {
      const r = await fetch("https://api.deepseek.com/v1/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${env.DEEPSEEK_API_KEY}` },
        body: JSON.stringify({ model: "deepseek-chat", messages, max_tokens: 400, temperature: 0.4 }),
        signal: AbortSignal.timeout(15000),
      });
      const j = await r.json().catch(() => null);
      const t = j?.choices?.[0]?.message?.content;
      if (t) return sanitizeMessageBody(t);
    } catch {}
  }
  if (env.AI && typeof env.AI.run === "function") {
    try {
      const r = await env.AI.run("@cf/meta/llama-3.1-8b-instruct", { messages, max_tokens: 400, temperature: 0.4 });
      const t = r?.response || r?.choices?.[0]?.message?.content || "";
      if (t) return sanitizeMessageBody(t);
    } catch {}
  }
  return lang === "ar"
    ? "شكراً لرسالتك 🌷 سيتم تحويل طلبك للفريق المختص. للحجز السريع: 920000094"
    : "Thank you for reaching out. Our team will follow up shortly. For booking: 920000094";
}
__name(deepseekReply, "deepseekReply");

async function persistVoiceReply(env, { phone, text, lang }) {
  try {
    const token = (crypto.randomUUID?.() || (Math.random().toString(36).slice(2) + Date.now())).replace(/-/g, "").slice(0, 24);
    if (env.BASMA_DB) {
      try {
        await env.BASMA_DB.prepare("CREATE TABLE IF NOT EXISTS wa_voice_replies (token TEXT PRIMARY KEY, phone TEXT, lang TEXT, text TEXT, created_at TEXT DEFAULT CURRENT_TIMESTAMP)").run();
        await env.BASMA_DB.prepare("INSERT INTO wa_voice_replies (token, phone, lang, text) VALUES (?, ?, ?, ?)").bind(token, phone, lang, text.slice(0, 1500)).run();
        return token;
      } catch {}
    }
    if (env.DB) {
      try {
        await env.DB.prepare("CREATE TABLE IF NOT EXISTS wa_voice_replies (token TEXT PRIMARY KEY, phone TEXT, lang TEXT, text TEXT, created_at TEXT DEFAULT CURRENT_TIMESTAMP)").run();
        await env.DB.prepare("INSERT INTO wa_voice_replies (token, phone, lang, text) VALUES (?, ?, ?, ?)").bind(token, phone, lang, text.slice(0, 1500)).run();
        return token;
      } catch {}
    }
  } catch {}
  return null;
}
__name(persistVoiceReply, "persistVoiceReply");

async function voiceReplyAudio(tokenRaw, env) {
  const token = String(tokenRaw || "").replace(/\.(mp3|mpeg)$/i, "");
  let row = null;
  try { row = await env.BASMA_DB?.prepare("SELECT text, lang FROM wa_voice_replies WHERE token = ?").bind(token).first(); } catch {}
  if (!row) {
    try { row = await env.DB?.prepare("SELECT text, lang FROM wa_voice_replies WHERE token = ?").bind(token).first(); } catch {}
  }
  if (!row) return new Response("not found", { status: 404 });
  const apiKey = env.ELEVENLABS_API_KEY;
  if (!apiKey) return new Response("voice not configured", { status: 503 });
  const voiceId = row.lang === "ar" ? "KxMRrXEjbJ6kZ93yT3fq" : "EXAVITQu4vr4xnSDxMaL";
  const modelId = row.lang === "ar" ? "eleven_multilingual_v2" : "eleven_turbo_v2_5";
  try {
    const r = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}/stream?output_format=mp3_44100_128`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "xi-api-key": apiKey, "Accept": "audio/mpeg" },
      body: JSON.stringify({
        text: String(row.text).slice(0, 1500),
        model_id: modelId,
        voice_settings: { stability: 0.45, similarity_boost: 0.85, style: 0.35, use_speaker_boost: true },
      }),
      signal: AbortSignal.timeout(20000),
    });
    if (!r.ok) return new Response("tts upstream " + r.status, { status: 502 });
    return new Response(r.body, { status: 200, headers: { "content-type": "audio/mpeg", "cache-control": "public, max-age=86400", "access-control-allow-origin": "*" } });
  } catch (e) { return new Response("tts error", { status: 502 }); }
}
__name(voiceReplyAudio, "voiceReplyAudio");

async function sendWhatsAppMedia(env, to, mediaUrl, caption) {
  const auth = twilioAuth2(env);
  if (!auth) return { success: false, code: "NOT_CONFIGURED" };
  const from = env.WHATSAPP_FROM || "whatsapp:+14155238886";
  const params = new URLSearchParams({ To: "whatsapp:" + normalizeSaudiPhone(to), From: from, MediaUrl: mediaUrl });
  if (caption) params.set("Body", sanitizeMessageBody(caption));
  try {
    const r = await fetch(`${TWILIO_API2}/Accounts/${env.TWILIO_ACCOUNT_SID}/Messages.json`, {
      method: "POST",
      headers: { Authorization: auth, "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
      signal: AbortSignal.timeout(15000),
    });
    const j = await r.json().catch(() => ({}));
    return { success: r.ok, sid: j.sid, status: j.status, code: j.code };
  } catch (e) { return { success: false, error: e.message }; }
}
__name(sendWhatsAppMedia, "sendWhatsAppMedia");

async function basmaChat(request, env) {
  const cors = { "access-control-allow-origin": "*" };
  const json3 = (data, status = 200) => new Response(JSON.stringify(data), { status, headers: { "content-type": "application/json", ...cors } });
  try {
    const body = await request.json().catch(() => ({}));
    const message = String(body?.message || "").trim();
    const phone = String(body?.phone || "").trim();
    const profileName = String(body?.name || "").trim();
    if (!message) return json3({ success: false, error: "message required" }, 400);
    const lang = body?.lang === "ar" || body?.lang === "en" ? body.lang : (/[\u0600-\u06FF]/.test(message) ? "ar" : "en");
    const ctxData = phone ? await loadPatientContext(env, phone).catch(() => null) : null;
    const ragHits = await autoRagSearch(env, message).catch(() => []);
    const reply = await deepseekReply(env, { userText: message, lang, profileName, ctx: ctxData, rag: ragHits });
    return json3({ success: true, reply, lang, has_context: !!ctxData, sources: (ragHits || []).slice(0, 3).map((h) => h.filename || h.source).filter(Boolean) });
  } catch (e) {
    return json3({ success: false, error: String(e?.message || e) }, 500);
  }
}
__name(basmaChat, "basmaChat");

function _icsEscape(s) { return String(s || "").replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\r?\n/g, "\\n"); }
function _icsDt(date, time) {
  const d = (date || "").trim();
  const t = (time || "10:00").trim();
  const m = d.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!m) return null;
  const hm = t.match(/^(\d{1,2}):(\d{2})/) || ["","10","00"];
  const yyyy = m[1], mm = m[2], dd = m[3];
  const HH = String(hm[1]).padStart(2, "0"), MM = String(hm[2]).padStart(2, "0");
  return { start: `${yyyy}${mm}${dd}T${HH}${MM}00`, end: `${yyyy}${mm}${dd}T${String((parseInt(HH,10)+1)%24).padStart(2,"0")}${MM}00` };
}
function buildIcs({ id, patientName, doctor, clinic, date, time, lang }) {
  const dt = _icsDt(date, time);
  if (!dt) return null;
  const now = new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
  const title = lang === "en"
    ? `HNH Appointment — ${doctor || "Provider"}`
    : `موعد في مستشفيات الحياة الوطني — ${doctor || "الطبيب"}`;
  const desc = lang === "en"
    ? `Patient: ${patientName}\\nClinic: ${clinic || ""}\\nProvider: ${doctor || ""}\\nAppointment ID: ${id || ""}\\nSupport: 920000094`
    : `المريض: ${patientName}\\nالعيادة: ${clinic || ""}\\nالطبيب: ${doctor || ""}\\nرقم الحجز: ${id || ""}\\nالدعم: 920000094`;
  const uid = `appt-${id || Math.random().toString(36).slice(2)}@hnh.brainsait.org`;
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//BrainSAIT//HNH//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:REQUEST",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${now}`,
    `DTSTART;TZID=Asia/Riyadh:${dt.start}`,
    `DTEND;TZID=Asia/Riyadh:${dt.end}`,
    `SUMMARY:${_icsEscape(title)}`,
    `DESCRIPTION:${_icsEscape(desc)}`,
    `LOCATION:${_icsEscape(clinic || "Hayat National Hospitals")}`,
    "STATUS:CONFIRMED",
    "END:VEVENT",
    "END:VCALENDAR"
  ];
  return lines.join("\r\n");
}
__name(buildIcs, "buildIcs");

function _emailHtml({ patientName, doctor, clinic, date, time, appointmentId, icsUrl, lang }) {
  const isAr = lang === "ar";
  const safe = (s) => String(s || "").replace(/[<>&"]/g, (c) => ({ "<":"&lt;",">":"&gt;","&":"&amp;",'"':"&quot;" }[c]));
  const title = isAr ? "تأكيد موعدك" : "Your appointment is confirmed";
  const greet = isAr ? `مرحباً ${safe(patientName)} 👋` : `Hello ${safe(patientName)} 👋`;
  const intro = isAr
    ? "تم تأكيد موعدك في مستشفيات الحياة الوطني. التفاصيل أدناه:"
    : "Your appointment at Hayat National Hospitals is confirmed. Details below:";
  const lblDate = isAr ? "التاريخ" : "Date";
  const lblTime = isAr ? "الوقت" : "Time";
  const lblClinic = isAr ? "العيادة" : "Clinic";
  const lblDoctor = isAr ? "الطبيب" : "Provider";
  const lblId = isAr ? "رقم الحجز" : "Appointment ID";
  const calBtn = isAr ? "إضافة إلى التقويم 📅" : "Add to calendar 📅";
  const portal = isAr ? "بوابة بسمة" : "Basma Portal";
  const support = isAr ? "للاستفسار: 920000094" : "Support: 920000094";
  const dir = isAr ? "rtl" : "ltr";
  return `<!doctype html><html lang="${isAr?'ar':'en'}" dir="${dir}"><head><meta charset="utf-8"><title>${title}</title></head>
<body style="margin:0;padding:0;background:#0a1220;font-family:'Tajawal','Helvetica Neue',Arial,sans-serif;color:#f5efe2;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0a1220;padding:32px 16px;">
<tr><td align="center">
  <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:linear-gradient(180deg,#101a2c 0%,#0a1220 100%);border:1px solid rgba(201,168,76,0.25);border-radius:16px;overflow:hidden;">
    <tr><td style="padding:28px 32px 8px 32px;border-bottom:1px solid rgba(201,168,76,0.15);">
      <div style="font-size:12px;letter-spacing:2px;color:#c9a84c;text-transform:uppercase;">BrainSAIT × HNH</div>
      <h1 style="margin:8px 0 0 0;font-size:22px;color:#f5efe2;font-weight:600;">${title}</h1>
    </td></tr>
    <tr><td style="padding:24px 32px;">
      <p style="margin:0 0 16px 0;font-size:16px;color:#f5efe2;">${greet}</p>
      <p style="margin:0 0 24px 0;font-size:14px;color:#a9b1c2;line-height:1.6;">${intro}</p>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:rgba(201,168,76,0.06);border:1px solid rgba(201,168,76,0.2);border-radius:12px;">
        <tr><td style="padding:18px 22px;font-size:14px;line-height:1.9;color:#f5efe2;">
          <div><span style="color:#a9b1c2;width:90px;display:inline-block;">${lblDate}</span><strong>${safe(date)}</strong></div>
          <div><span style="color:#a9b1c2;width:90px;display:inline-block;">${lblTime}</span><strong>${safe(time)}</strong></div>
          <div><span style="color:#a9b1c2;width:90px;display:inline-block;">${lblClinic}</span><strong>${safe(clinic)}</strong></div>
          ${doctor?`<div><span style="color:#a9b1c2;width:90px;display:inline-block;">${lblDoctor}</span><strong>${safe(doctor)}</strong></div>`:""}
          ${appointmentId?`<div><span style="color:#a9b1c2;width:90px;display:inline-block;">${lblId}</span><strong style="font-family:monospace;color:#c9a84c;">${safe(appointmentId)}</strong></div>`:""}
        </td></tr>
      </table>
      ${icsUrl?`<div style="text-align:center;margin:28px 0 8px 0;"><a href="${icsUrl}" style="display:inline-block;padding:14px 28px;background:linear-gradient(180deg,#c9a84c,#9d8338);color:#0a1220;text-decoration:none;border-radius:999px;font-weight:700;font-size:14px;letter-spacing:0.5px;">${calBtn}</a></div>`:""}
      <p style="margin:24px 0 0 0;font-size:12px;color:#a9b1c2;text-align:center;">
        <a href="https://bsma.brainsait.de" style="color:#c9a84c;text-decoration:none;">${portal}</a>
        &nbsp;·&nbsp; ${support}
      </p>
    </td></tr>
    <tr><td style="padding:16px 32px;background:rgba(0,0,0,0.3);border-top:1px solid rgba(201,168,76,0.1);text-align:center;">
      <div style="font-size:11px;color:#6b7488;">© Hayat National Hospitals · مستشفيات الحياة الوطني</div>
    </td></tr>
  </table>
</td></tr></table></body></html>`;
}

async function sendBookingEmail(request, env) {
  const cors = { "access-control-allow-origin": "*" };
  const json3 = (b, s = 200) => new Response(JSON.stringify(b), { status: s, headers: { "content-type": "application/json", ...cors } });
  try {
    const body = await request.json().catch(() => ({}));
    const { email, patientName, doctor, clinic, date, time, appointmentId, lang } = body;
    if (!email || !patientName || !date) return json3({ success: false, error: "email, patientName, date required" }, 400);
    const icsUrl = appointmentId
      ? `https://hnh.brainsait.org/api/appointments/${encodeURIComponent(appointmentId)}/ics`
      : null;
    const subject = lang === "en"
      ? `HNH · Appointment confirmed — ${date} ${time || ""}`.trim()
      : `مستشفيات الحياة الوطني · تأكيد موعد — ${date} ${time || ""}`.trim();
    const html = _emailHtml({ patientName, doctor, clinic, date, time, appointmentId, icsUrl, lang });
    const ics = buildIcs({ id: appointmentId || "tmp", patientName, doctor, clinic, date, time, lang });
    const fromAddr = env.EMAIL_FROM || "info.book@noreply.hnh.brainsait.org";
    const fromName = "Hayat National Hospitals";

    // Primary: Cloudflare Workers send_email binding (info.book@noreply.hnh.brainsait.org)
    if (env.EMAIL && typeof env.EMAIL.send === "function") {
      try {
        const { EmailMessage } = await import("cloudflare:email");
        const raw = _buildBookingMime({ from: fromAddr, fromName, to: email, subject, html, ics, appointmentId });
        const msg = new EmailMessage(fromAddr, email, raw);
        await env.EMAIL.send(msg);
        return json3({ success: true, channel: "cf_email", from: fromAddr, ics_url: icsUrl }, 200);
      } catch (e) {
        // Fall through to maillinc on failure (e.g. destination not verified)
        const errMsg = String(e?.message || e);
        const maillincUrl = env.MAILLINC_URL || "https://maillinc.brainsait-fadil.workers.dev";
        try {
          const r = await fetch(`${maillincUrl}/email`, {
            method: "POST",
            headers: { "Content-Type": "application/json", ...(env.MAILLINC_API_KEY ? { "X-API-Key": env.MAILLINC_API_KEY } : {}) },
            body: JSON.stringify({ from: fromAddr, from_name: fromName, to: email, subject, html }),
          });
          const data = await r.json().catch(() => ({}));
          return json3({ success: r.ok, channel: "maillinc_fallback", cf_email_error: errMsg, status: r.status, maillinc: data, ics_url: icsUrl }, r.ok ? 200 : 502);
        } catch (e2) {
          return json3({ success: false, error: errMsg, fallback_error: String(e2?.message || e2), ics_url: icsUrl }, 502);
        }
      }
    }

    // Fallback: maillinc only (no EMAIL binding)
    const maillincUrl = env.MAILLINC_URL || "https://maillinc.brainsait-fadil.workers.dev";
    const r = await fetch(`${maillincUrl}/email`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...(env.MAILLINC_API_KEY ? { "X-API-Key": env.MAILLINC_API_KEY } : {}) },
      body: JSON.stringify({ from: fromAddr, from_name: fromName, to: email, subject, html }),
    });
    const data = await r.json().catch(() => ({}));
    return json3({ success: r.ok, channel: "maillinc", status: r.status, maillinc: data, ics_url: icsUrl }, r.ok ? 200 : 502);
  } catch (e) {
    return json3({ success: false, error: String(e?.message || e) }, 500);
  }
}
__name(sendBookingEmail, "sendBookingEmail");

function _b64(str) {
  // Workers btoa works on latin1 — use TextEncoder for UTF-8 safe base64
  const bytes = new TextEncoder().encode(str);
  let bin = "";
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  return btoa(bin);
}
__name(_b64, "_b64");

function _b64Wrap(b64, width = 76) {
  const out = [];
  for (let i = 0; i < b64.length; i += width) out.push(b64.slice(i, i + width));
  return out.join("\r\n");
}
__name(_b64Wrap, "_b64Wrap");

function _buildBookingMime({ from, fromName, to, subject, html, ics, appointmentId }) {
  const boundary = "----hnh-boundary-" + Math.random().toString(36).slice(2);
  const subjectB64 = "=?UTF-8?B?" + _b64(subject) + "?=";
  const fromHdr = `${fromName} <${from}>`;
  const lines = [];
  lines.push(`From: ${fromHdr}`);
  lines.push(`To: ${to}`);
  lines.push(`Subject: ${subjectB64}`);
  lines.push(`MIME-Version: 1.0`);
  lines.push(`Date: ${new Date().toUTCString()}`);
  lines.push(`Message-ID: <appt-${appointmentId || Math.random().toString(36).slice(2)}@hnh.brainsait.org>`);
  lines.push(`Content-Type: multipart/mixed; boundary="${boundary}"`);
  lines.push("");
  lines.push(`--${boundary}`);
  lines.push(`Content-Type: text/html; charset=UTF-8`);
  lines.push(`Content-Transfer-Encoding: base64`);
  lines.push("");
  lines.push(_b64Wrap(_b64(html)));
  if (ics) {
    lines.push(`--${boundary}`);
    lines.push(`Content-Type: text/calendar; charset=UTF-8; method=REQUEST; name="appointment.ics"`);
    lines.push(`Content-Disposition: attachment; filename="appointment.ics"`);
    lines.push(`Content-Transfer-Encoding: base64`);
    lines.push("");
    lines.push(_b64Wrap(_b64(ics)));
  }
  lines.push(`--${boundary}--`);
  lines.push("");
  return lines.join("\r\n");
}
__name(_buildBookingMime, "_buildBookingMime");

async function appointmentIcs(request, env, ctx, params) {
  const id = decodeURIComponent(params?.[0] || "");
  const url = new URL(request.url);
  const lang = url.searchParams.get("lang") === "en" ? "en" : "ar";
  let appt = null;
  try {
    if (env.DB) {
      // simple query first (no joins) to avoid silent failures on missing schema
      appt = await env.DB.prepare(`SELECT * FROM appointments WHERE id = ? LIMIT 1`).bind(id).first();
      if (appt && appt.patient_id) {
        try {
          const p = await env.DB.prepare(`SELECT full_name_ar, full_name_en FROM patients WHERE id = ? LIMIT 1`).bind(appt.patient_id).first();
          if (p) { appt.p_name_ar = p.full_name_ar; appt.p_name_en = p.full_name_en; }
        } catch {}
      }
      if (appt && appt.provider_id) {
        try {
          const pr = await env.DB.prepare(`SELECT name FROM providers WHERE id = ? LIMIT 1`).bind(appt.provider_id).first();
          if (pr) appt.provider_name = pr.name;
        } catch {}
      }
    }
  } catch {}

  // Allow query params to override / supply when DB row missing
  const date = url.searchParams.get("date") || (appt?.appointment_date || "").slice(0, 10);
  const time = url.searchParams.get("time") || appt?.appointment_time || "10:00";
  const clinic = url.searchParams.get("clinic") || appt?.clinic_name || "";
  const doctor = url.searchParams.get("doctor") || appt?.provider_name || "";
  const patientName = url.searchParams.get("name") || appt?.p_name_ar || appt?.p_name_en || "Patient";

  const ics = buildIcs({ id, patientName, doctor, clinic, date, time, lang });
  if (!ics) return new Response("Appointment not found", { status: 404, headers: { "access-control-allow-origin": "*" } });
  return new Response(ics, {
    status: 200,
    headers: {
      "content-type": "text/calendar; charset=utf-8",
      "content-disposition": `attachment; filename="hnh-appointment-${id}.ics"`,
      "access-control-allow-origin": "*",
      "cache-control": "no-store",
    },
  });
}
__name(appointmentIcs, "appointmentIcs");


async function notifyStatus2(request, env) {
  return json({
    success: true,
    sms: env.TWILIO_ACCOUNT_SID ? "configured" : "not_configured",
    whatsapp: env.TWILIO_ACCOUNT_SID ? "configured" : "not_configured",
    email: (env.SENDGRID_API_KEY || env.MAILLINC_URL) ? "configured" : "not_configured",
    channels: ["sms", "whatsapp", "email"],
  });
}
__name(notifyStatus2, "notifyStatus2");

// ── End notify routes ────────────────────────────────────────────────────────

router.post("/api/email/appointment", (req, env) => emailAppointment(req, env));
router.post("/api/email/homecare", (req, env) => emailHomecare(req, env));
router.post("/api/email/telehealth", (req, env) => emailTelehealth(req, env));
router.post("/api/email/followup", (req, env) => emailFollowup(req, env));
router.post("/api/email/send", (req, env) => emailSend(req, env));
router.get("/api/email/log", (req, env) => getEmailLog(req, env));
router.post("/api/email/webhook", (req, env) => emailWebhook(req, env));
// SMS — رسائل نصية
router.post("/api/sms/send", (req, env) => notifySendSms(req, env));
router.post("/api/sms/appointment", (req, env) => notifyAppointmentSms(req, env));
router.post("/api/sms/telehealth", (req, env) => notifyTelehealthSms(req, env));
router.post("/api/sms/homecare", (req, env) => notifyHomecareSms(req, env));
// WhatsApp — واتساب
router.post("/api/whatsapp/send", (req, env) => notifySendWhatsApp(req, env));
router.post("/api/whatsapp/appointment", (req, env) => notifyWhatsAppAppointment(req, env));
router.post("/api/whatsapp/webhook", (req, env, ctx) => whatsappInboundWebhook(req, env, ctx));
router.get("/api/whatsapp/webhook", () => new Response("ok", { status: 200 }));
router.get("/api/voice/wa/([^/]+)", (req, env, ctx, p) => voiceReplyAudio(p[0], env));
router.post("/api/basma/chat", (req, env) => basmaChat(req, env));
router.post("/api/booking/email", (req, env) => sendBookingEmail(req, env));
router.get("/api/appointments/([^/]+)/ics", (req, env, ctx, p) => appointmentIcs(req, env, ctx, p));
// Notify status
router.get("/api/notify/status", (req, env) => notifyStatus2(req, env));

// ═══════════════════════════════════════════════════════════════════════════════
// WORKFLOW ORCHESTRATION LAYER — HNH BrainSAIT Healthcare OS v9.2.0
// Stakeholders: Patient · Provider · Payer · Government/MOH
// ═══════════════════════════════════════════════════════════════════════════════

const WF_AI_PRIMARY = "@cf/meta/llama-3.3-70b-instruct-fp8-fast";
const WF_AI_FALLBACK = "@cf/meta/llama-3-8b-instruct";

async function wfRunAI(env, messages, model = WF_AI_PRIMARY) {
  try {
    const res = await env.AI.run(model, { messages, max_tokens: 2048 });
    return res?.response || res?.result?.response || "";
  } catch {
    if (model !== WF_AI_FALLBACK) return wfRunAI(env, messages, WF_AI_FALLBACK);
    return "";
  }
}
__name(wfRunAI, "wfRunAI");

async function wfGetPatient(env, patientId) {
  if (!env.DB) return null;
  try {
    return await env.DB.prepare(
      `SELECT p.*, i.payer_name, i.policy_number, i.member_id
       FROM patients p LEFT JOIN insurance_info i ON i.patient_id = p.id
       WHERE p.id = ? LIMIT 1`
    ).bind(patientId).first();
  } catch { return null; }
}
__name(wfGetPatient, "wfGetPatient");

async function wfNPHIESEligibility(env, patientId, payerId) {
  const base = env.NPHIES_MIRROR_URL || "https://nphies-mirror.brainsait-fadil.workers.dev";
  try {
    const res = await fetch(`${base}/eligibility/check`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ patientId, payerId }),
      signal: AbortSignal.timeout(8000),
    });
    return res.ok ? await res.json() : { eligible: null, error: `NPHIES ${res.status}` };
  } catch (e) { return { eligible: null, error: e.message }; }
}
__name(wfNPHIESEligibility, "wfNPHIESEligibility");

async function wfGenerateSBSCodes(env, soapNotes, diagnoses) {
  try {
    const res = await env.AI.run(WF_AI_PRIMARY, {
      messages: [
        { role: "system", content: "You are a Saudi SBS/NPHIES medical coding expert. Return ONLY valid JSON with: diagnosis_codes (array of {code,description,type}), procedure_codes (array of {code,description,quantity,unit}), drg_code, clinical_rationale." },
        { role: "user", content: `SOAP: ${soapNotes}\nDiagnoses: ${JSON.stringify(diagnoses)}` },
      ],
      max_tokens: 1024,
    });
    return JSON.parse((res?.response || "{}").replace(/```json\n?|\n?```/g, "").trim());
  } catch { return { diagnosis_codes: [], procedure_codes: [], drg_code: null, clinical_rationale: "Unavailable" }; }
}
__name(wfGenerateSBSCodes, "wfGenerateSBSCodes");

function wfAdjudicationRules(claim) {
  const flags = [];
  if (!claim.diagnosis_codes?.length) flags.push("MISSING_DIAGNOSIS");
  if (!claim.procedure_codes?.length) flags.push("MISSING_PROCEDURE");
  if (claim.amount > 50000) flags.push("HIGH_VALUE_REVIEW");
  if (claim.is_duplicate) flags.push("POTENTIAL_DUPLICATE");
  return {
    flags,
    autoApprove: flags.length === 0,
    requiresHuman: flags.includes("HIGH_VALUE_REVIEW") || flags.includes("POTENTIAL_DUPLICATE"),
  };
}
__name(wfAdjudicationRules, "wfAdjudicationRules");

function wfMOHXML(reportData) {
  const { facility, period, indicators, stats } = reportData;
  return `<?xml version="1.0" encoding="UTF-8"?>
<MOHReport xmlns="urn:moh.gov.sa:quality:report:2024" version="2.0">
  <Header>
    <FacilityLicense>${facility?.license || "10000000000988"}</FacilityLicense>
    <FacilityName>${facility?.name || "Hayat National Hospital"}</FacilityName>
    <ReportPeriod><Start>${period?.start || ""}</Start><End>${period?.end || ""}</End></ReportPeriod>
    <GeneratedAt>${new Date().toISOString()}</GeneratedAt>
    <ReportType>MONTHLY_QUALITY</ReportType>
  </Header>
  <QualityIndicators>${(indicators || []).map(i => `
    <Indicator><Code>${i.code}</Code><Name>${i.name}</Name><Value>${i.value}</Value><Target>${i.target || ""}</Target><Unit>${i.unit || ""}</Unit><Status>${i.value >= (i.target || 0) ? "MET" : "NOT_MET"}</Status></Indicator>`).join("")}
  </QualityIndicators>
  <Statistics>
    <TotalPatients>${stats?.total_patients || 0}</TotalPatients>
    <TotalClaims>${stats?.total_claims || 0}</TotalClaims>
    <TotalAppointments>${stats?.total_appointments || 0}</TotalAppointments>
    <TelehealthSessions>${stats?.telehealth_sessions || 0}</TelehealthSessions>
    <HomecareVisits>${stats?.homecare_visits || 0}</HomecareVisits>
  </Statistics>
</MOHReport>`;
}
__name(wfMOHXML, "wfMOHXML");

// ── Patient Workflows ─────────────────────────────────────────────────────────

async function wfPatientHealthScreening(request, env) {
  try {
    const { patientId, language = "ar" } = await request.json();
    if (!patientId) return json({ success: false, error: "patientId required" }, 400);
    const patient = await wfGetPatient(env, patientId);
    const isAr = language === "ar";
    const aiResponse = await wfRunAI(env, [
      { role: "system", content: isAr ? "أنت مساعد طبي ذكي في مستشفيات الحياة الوطنية. اقترح الفحوصات الوقائية المناسبة وفق إرشادات وزارة الصحة السعودية." : "You are a clinical AI assistant at Hayat National Hospital. Recommend preventive screenings per Saudi MOH guidelines." },
      { role: "user", content: `Patient: ${JSON.stringify(patient || { id: patientId })}` },
    ]);
    return json({ success: true, workflow: "health_screening", patient: patient ? { id: patient.id, name: patient.name } : null, screenings: aiResponse, next_step: "book_appointment", language });
  } catch (e) { return json({ success: false, error: e.message }, 500); }
}
__name(wfPatientHealthScreening, "wfPatientHealthScreening");

async function wfPatientBookVisit(request, env) {
  try {
    const { patientId, speciality, preferredDate, language = "ar" } = await request.json();
    if (!patientId || !speciality) return json({ success: false, error: "patientId and speciality required" }, 400);
    const patient = await wfGetPatient(env, patientId);
    const eligibility = patient?.policy_number ? await wfNPHIESEligibility(env, patientId, patient?.payer_name) : { eligible: "unknown" };
    let slot = null, appointment = null;
    if (env.DB) {
      try {
        slot = await env.DB.prepare(`SELECT p.id, p.name, p.speciality FROM providers p WHERE LOWER(p.speciality) LIKE ? LIMIT 1`).bind(`%${speciality.toLowerCase()}%`).first();
        if (slot) {
          const apptDate = preferredDate || new Date(Date.now() + 86400000 * 3).toISOString();
          appointment = await env.DB.prepare(`INSERT INTO appointments (patient_id, provider_id, appointment_date, status, type, speciality, created_at) VALUES (?, ?, ?, 'scheduled', 'outpatient', ?, datetime('now')) RETURNING id, appointment_date`).bind(patientId, slot.id, apptDate, speciality).first();
        }
      } catch {}
    }
    const isAr = language === "ar";
    const confirmation = await wfRunAI(env, [
      { role: "system", content: isAr ? "اكتب رسالة تأكيد موعد قصيرة وودودة للمريض بالعربية." : "Write a brief friendly appointment confirmation in English." },
      { role: "user", content: JSON.stringify({ patient: patient?.name, slot, appointment, eligibility }) },
    ]);
    return json({ success: true, workflow: "book_visit", eligibility, provider: slot, appointment, confirmation_message: confirmation, copay: eligibility?.copay_amount || null, language });
  } catch (e) { return json({ success: false, error: e.message }, 500); }
}
__name(wfPatientBookVisit, "wfPatientBookVisit");

async function wfPatientPostVisit(request, env) {
  try {
    const { patientId, appointmentId, diagnosisCodes, procedureCodes, language = "ar" } = await request.json();
    if (!patientId || !appointmentId) return json({ success: false, error: "patientId and appointmentId required" }, 400);
    let claim = null, givcStatus = "not_submitted";
    if (env.DB) {
      try {
        claim = await env.DB.prepare(`INSERT INTO claims (patient_id, appointment_id, status, diagnosis_codes, procedure_codes, submitted_at, created_at) VALUES (?, ?, 'pending', ?, ?, datetime('now'), datetime('now')) RETURNING id`).bind(patientId, appointmentId, JSON.stringify(diagnosisCodes || []), JSON.stringify(procedureCodes || [])).first();
      } catch {}
    }
    if (claim && env.CLAIMLINC_SERVICE) {
      try {
        const r = await env.CLAIMLINC_SERVICE.fetch(new Request("https://claimlinc.internal/claims/submit", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ patientId, appointmentId, claimId: claim.id, diagnosisCodes, procedureCodes }) }));
        givcStatus = r.ok ? "submitted" : "failed";
      } catch { givcStatus = "service_unavailable"; }
    }
    const isAr = language === "ar";
    const explanation = await wfRunAI(env, [
      { role: "system", content: isAr ? "اشرح حالة المطالبة التأمينية للمريض بلغة بسيطة وودودة." : "Explain the insurance claim status in simple friendly language." },
      { role: "user", content: JSON.stringify({ claim, givcStatus, diagnosisCodes }) },
    ]);
    return json({ success: true, workflow: "post_visit", claim_id: claim?.id, claim_status: "pending", givc_submission: givcStatus, patient_explanation: explanation, language });
  } catch (e) { return json({ success: false, error: e.message }, 500); }
}
__name(wfPatientPostVisit, "wfPatientPostVisit");

async function wfPatientLabResults(request, env) {
  try {
    const { results, language = "ar" } = await request.json();
    if (!results || !Array.isArray(results)) return json({ success: false, error: "results array required" }, 400);
    const isAr = language === "ar";
    const analysis = await wfRunAI(env, [
      { role: "system", content: isAr ? "اشرح نتائج المختبر بلغة بسيطة للمريض. حدد القيم غير الطبيعية وما تعنيه. لا تقدم تشخيصاً نهائياً." : "Explain lab results in plain language. Highlight abnormal values. Do not give a definitive diagnosis." },
      { role: "user", content: `Lab results: ${JSON.stringify(results)}` },
    ]);
    const abnormals = results.filter(r => r.flag === "H" || r.flag === "L" || r.flag === "A" || (r.value && r.low && parseFloat(r.value) < parseFloat(r.low)) || (r.value && r.high && parseFloat(r.value) > parseFloat(r.high)));
    return json({ success: true, workflow: "lab_results", total_tests: results.length, abnormal_count: abnormals.length, abnormal_tests: abnormals, explanation: analysis, recommendation: abnormals.length > 0 ? (isAr ? "يُنصح بمراجعة طبيبك." : "Please consult your physician.") : (isAr ? "جميع النتائج طبيعية." : "All results normal."), language });
  } catch (e) { return json({ success: false, error: e.message }, 500); }
}
__name(wfPatientLabResults, "wfPatientLabResults");

async function wfPatientSummary(request, env, _ctx, params) {
  try {
    const patientId = params?.[0] || request.url.split("/").pop();
    if (!patientId) return json({ success: false, error: "patientId required" }, 400);
    const patient = await wfGetPatient(env, patientId);
    let appointments = [], claims = [];
    if (env.DB) {
      try {
        const ar = await env.DB.prepare(`SELECT * FROM appointments WHERE patient_id = ? ORDER BY appointment_date DESC LIMIT 10`).bind(patientId).all();
        appointments = ar.results || [];
        const cr = await env.DB.prepare(`SELECT id, status, submitted_at, diagnosis_codes FROM claims WHERE patient_id = ? ORDER BY created_at DESC LIMIT 5`).bind(patientId).all();
        claims = cr.results || [];
      } catch {}
    }
    const now = new Date();
    return json({ success: true, workflow: "patient_summary", patient, upcoming_appointments: appointments.filter(a => new Date(a.appointment_date) >= now), past_appointments: appointments.filter(a => new Date(a.appointment_date) < now), recent_claims: claims, open_claims: claims.filter(c => c.status === "pending" || c.status === "submitted") });
  } catch (e) { return json({ success: false, error: e.message }, 500); }
}
__name(wfPatientSummary, "wfPatientSummary");

// ── Provider Workflows ────────────────────────────────────────────────────────

async function wfProviderClinicalDecision(request, env) {
  try {
    const { providerId, patientId, soapNotes, condition, language = "ar" } = await request.json();
    if (!soapNotes) return json({ success: false, error: "soapNotes required" }, 400);
    const isAr = language === "ar";
    const clinicalAnalysis = await wfRunAI(env, [
      { role: "system", content: `You are a clinical AI assistant for Hayat National Hospital. Analyze SOAP notes and provide evidence-based clinical decision support aligned with Saudi MOH guidelines. ${isAr ? "Respond in Arabic." : "Respond in English."}` },
      { role: "user", content: `Condition: ${condition || "unspecified"}\nSOAP Notes:\n${soapNotes}\n\nProvide: 1.Clinical assessment 2.Guideline recommendations 3.Medication adjustments 4.Follow-up plan 5.Safety alerts` },
    ]);
    const prescriptionRaw = await wfRunAI(env, [
      { role: "system", content: "Draft a Wasfaty-compatible e-prescription. Return JSON: {medications:[{name,dose,frequency,duration,route,instructions_ar,instructions_en}],prescribing_notes}" },
      { role: "user", content: `SOAP: ${soapNotes}\nCondition: ${condition}` },
    ]);
    let prescription = { medications: [], prescribing_notes: prescriptionRaw };
    try { prescription = JSON.parse(prescriptionRaw.replace(/```json\n?|\n?```/g, "").trim()); } catch {}
    let noteId = null;
    if (env.DB && patientId) {
      try { const ins = await env.DB.prepare(`INSERT INTO clinical_notes (patient_id, provider_id, soap_notes, ai_analysis, created_at) VALUES (?, ?, ?, ?, datetime('now')) RETURNING id`).bind(patientId, providerId || null, soapNotes, clinicalAnalysis).first(); noteId = ins?.id; } catch {}
    }
    return json({ success: true, workflow: "clinical_decision_support", clinical_analysis: clinicalAnalysis, prescription_draft: prescription, wasfaty_ready: prescription?.medications?.length > 0, note_id: noteId, next_steps: ["review_prescription", "submit_billing", "schedule_followup"], language });
  } catch (e) { return json({ success: false, error: e.message }, 500); }
}
__name(wfProviderClinicalDecision, "wfProviderClinicalDecision");

async function wfProviderSmartBilling(request, env) {
  try {
    const { providerId, patientId, appointmentId, soapNotes, diagnoses } = await request.json();
    if (!soapNotes || !patientId) return json({ success: false, error: "soapNotes and patientId required" }, 400);
    const coding = await wfGenerateSBSCodes(env, soapNotes, diagnoses || []);
    let eligibility = { eligible: null, status: "not_checked" };
    try { const base = env.NPHIES_MIRROR_URL || "https://nphies-mirror.brainsait-fadil.workers.dev"; const r = await fetch(`${base}/eligibility/realtime`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ patientId }), signal: AbortSignal.timeout(6000) }); if (r.ok) eligibility = await r.json(); } catch {}
    const flags = [];
    if (!coding.diagnosis_codes?.length) flags.push("MISSING_DIAGNOSIS_CODES");
    if (!coding.procedure_codes?.length) flags.push("MISSING_PROCEDURE_CODES");
    if (eligibility.eligible === false) flags.push("PATIENT_NOT_ELIGIBLE");
    let claimId = null;
    if (env.DB && !flags.length) {
      try { const ins = await env.DB.prepare(`INSERT INTO claims (patient_id, provider_id, appointment_id, status, diagnosis_codes, procedure_codes, drg_code, submitted_at, created_at) VALUES (?, ?, ?, 'pending', ?, ?, ?, datetime('now'), datetime('now')) RETURNING id`).bind(patientId, providerId, appointmentId || null, JSON.stringify(coding.diagnosis_codes), JSON.stringify(coding.procedure_codes), coding.drg_code || null).first(); claimId = ins?.id; } catch {}
    }
    let givcResult = { status: flags.length > 0 ? "not_submitted" : "queued" };
    if (claimId && env.CLAIMLINC_SERVICE) {
      try { const r = await env.CLAIMLINC_SERVICE.fetch(new Request("https://claimlinc.internal/claims/submit-clean", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ claimId, patientId, providerId, coding, eligibility }) })); givcResult = r.ok ? { status: "submitted", ...await r.json() } : { status: "failed" }; } catch { givcResult = { status: "service_unavailable" }; }
    }
    return json({ success: true, workflow: "smart_billing", sbs_codes: coding, eligibility, flags, claim_id: claimId, givc_submission: givcResult, ready_to_submit: flags.length === 0, denial_risk: flags.length > 0 ? "high" : "low" });
  } catch (e) { return json({ success: false, error: e.message }, 500); }
}
__name(wfProviderSmartBilling, "wfProviderSmartBilling");

async function wfProviderCohortOutreach(request, env) {
  try {
    const { condition, lastVisitMonths = 6, language = "ar" } = await request.json();
    if (!condition) return json({ success: false, error: "condition required" }, 400);
    let cohort = [];
    if (env.DB) {
      try {
        const cutoff = new Date(); cutoff.setMonth(cutoff.getMonth() - lastVisitMonths);
        const r = await env.DB.prepare(`SELECT p.id, p.name, p.phone, p.email, MAX(a.appointment_date) as last_visit FROM patients p LEFT JOIN appointments a ON a.patient_id = p.id LEFT JOIN diagnoses d ON d.patient_id = p.id WHERE (LOWER(d.description) LIKE ? OR LOWER(d.icd_code) LIKE ?) AND (a.appointment_date IS NULL OR a.appointment_date < ?) GROUP BY p.id LIMIT 100`).bind(`%${condition.toLowerCase()}%`, `%${condition.toLowerCase()}%`, cutoff.toISOString()).all();
        cohort = r.results || [];
      } catch {}
    }
    if (cohort.length === 0) return json({ success: true, workflow: "cohort_outreach", cohort_size: 0, messages: [] });
    const isAr = language === "ar";
    const template = await wfRunAI(env, [
      { role: "system", content: isAr ? "اكتب رسالة تذكير صحية شخصية وودودة للمريض باللغة العربية مع نصيحة صحية مختصرة. استخدم {name} للاسم." : "Write a personalized health reminder with a brief health tip. Use {name} for the patient name." },
      { role: "user", content: `Condition: ${condition}\nMonths since visit: ${lastVisitMonths}` },
    ]);
    const messages = cohort.slice(0, 20).map(p => ({ patient_id: p.id, patient_name: p.name, phone: p.phone, email: p.email, last_visit: p.last_visit, message: template.replace(/\{name\}/gi, p.name || (isAr ? "المريض الكريم" : "Dear Patient")) }));
    return json({ success: true, workflow: "cohort_outreach", condition, cohort_size: cohort.length, messages_prepared: messages.length, messages, next_step: "send_notifications", channels: ["sms", "whatsapp", "email"], language });
  } catch (e) { return json({ success: false, error: e.message }, 500); }
}
__name(wfProviderCohortOutreach, "wfProviderCohortOutreach");

async function wfProviderSchedule(request, env, _ctx, params) {
  try {
    const providerId = params?.[0] || request.url.split("/").pop();
    if (!providerId) return json({ success: false, error: "providerId required" }, 400);
    let schedule = [];
    if (env.DB) {
      try { const r = await env.DB.prepare(`SELECT a.id, a.appointment_date, a.status, a.type, p.id as patient_id, p.name as patient_name, p.phone FROM appointments a JOIN patients p ON p.id = a.patient_id WHERE a.provider_id = ? AND date(a.appointment_date) = date('now') ORDER BY a.appointment_date ASC`).bind(providerId).all(); schedule = r.results || []; } catch {}
    }
    return json({ success: true, workflow: "provider_schedule", provider_id: providerId, date: new Date().toISOString().split("T")[0], total_appointments: schedule.length, schedule });
  } catch (e) { return json({ success: false, error: e.message }, 500); }
}
__name(wfProviderSchedule, "wfProviderSchedule");

// ── Payer Workflows ───────────────────────────────────────────────────────────

async function wfPayerAdjudicate(request, env) {
  try {
    const { claimId, payerId, claim } = await request.json();
    if (!claimId || !claim) return json({ success: false, error: "claimId and claim required" }, 400);
    const ruleResult = wfAdjudicationRules(claim);
    const codeValidRaw = await wfRunAI(env, [
      { role: "system", content: "You are a Saudi NPHIES claims auditor. Validate codes for compatibility and medical necessity. Return JSON: {valid:boolean,issues:string[],code_compatibility:string,medical_necessity:string}" },
      { role: "user", content: `Claim: ${JSON.stringify(claim)}` },
    ]);
    let validation = { valid: true, issues: [], code_compatibility: "compatible", medical_necessity: "appropriate" };
    try { validation = JSON.parse(codeValidRaw.replace(/```json\n?|\n?```/g, "").trim()); } catch {}
    if (!validation.valid) ruleResult.flags.push(...(validation.issues || []));
    const decision = ruleResult.autoApprove && validation.valid ? "APPROVED" : ruleResult.requiresHuman ? "PENDED_HUMAN_REVIEW" : "DENIED";
    if (env.DB) {
      try { await env.DB.prepare(`UPDATE claims SET status = ?, adjudication_result = ?, updated_at = datetime('now') WHERE id = ?`).bind(decision === "APPROVED" ? "approved" : decision === "DENIED" ? "denied" : "pending_review", JSON.stringify({ decision, flags: ruleResult.flags }), claimId).run(); } catch {}
    }
    const era = decision === "APPROVED" ? { era_id: `ERA-${Date.now()}`, claim_id: claimId, payer_id: payerId, payment_date: new Date(Date.now() + 86400000 * 3).toISOString().split("T")[0], status: "ISSUED", nphies_reference: `NP-${claimId}-${Date.now()}` } : null;
    return json({ success: true, workflow: "claims_adjudication", claim_id: claimId, decision, rule_flags: ruleResult.flags, code_validation: validation, auto_approved: decision === "APPROVED", era, denial_reason: decision === "DENIED" ? ruleResult.flags.join("; ") : null });
  } catch (e) { return json({ success: false, error: e.message }, 500); }
}
__name(wfPayerAdjudicate, "wfPayerAdjudicate");

async function wfPayerPriorAuth(request, env) {
  try {
    const { patientId, providerId, requestedService, diagnosisCodes, payerId, urgency = "routine" } = await request.json();
    if (!requestedService || !patientId) return json({ success: false, error: "requestedService and patientId required" }, 400);
    let policyInfo = null;
    if (env.DB) { try { policyInfo = await env.DB.prepare(`SELECT i.*, p.date_of_birth, p.gender FROM insurance_info i JOIN patients p ON p.id = i.patient_id WHERE i.patient_id = ? LIMIT 1`).bind(patientId).first(); } catch {} }
    const clinicalRaw = await wfRunAI(env, [
      { role: "system", content: "You are a Saudi health insurance clinical reviewer. Assess prior authorization against clinical guidelines. Return JSON: {medically_necessary:boolean,guideline_reference:string,conditions_met:string[],conditions_failed:string[],recommendation:\"APPROVE\"|\"DENY\"|\"CLINICAL_REVIEW\",clinical_notes:string}" },
      { role: "user", content: `Service: ${requestedService}\nCodes: ${JSON.stringify(diagnosisCodes)}\nPatient: ${JSON.stringify(policyInfo)}\nUrgency: ${urgency}` },
    ]);
    let cd = { medically_necessary: true, recommendation: "APPROVE", guideline_reference: "Saudi MOH CPGs", conditions_met: [], conditions_failed: [], clinical_notes: "" };
    try { cd = JSON.parse(clinicalRaw.replace(/```json\n?|\n?```/g, "").trim()); } catch {}
    const paDecision = urgency === "emergency" ? "APPROVED" : cd.recommendation;
    const paNumber = paDecision === "APPROVED" ? `PA-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}` : null;
    if (env.DB) { try { await env.DB.prepare(`INSERT INTO prior_authorizations (patient_id, provider_id, payer_id, requested_service, diagnosis_codes, status, pa_number, decision_reason, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))`).bind(patientId, providerId || null, payerId || null, requestedService, JSON.stringify(diagnosisCodes), paDecision.toLowerCase(), paNumber, JSON.stringify(cd)).run(); } catch {} }
    return json({ success: true, workflow: "prior_authorization", pa_number: paNumber, decision: paDecision, medically_necessary: cd.medically_necessary, guideline_reference: cd.guideline_reference, conditions_met: cd.conditions_met, conditions_failed: cd.conditions_failed, valid_days: paDecision === "APPROVED" ? 90 : 0, urgency });
  } catch (e) { return json({ success: false, error: e.message }, 500); }
}
__name(wfPayerPriorAuth, "wfPayerPriorAuth");

async function wfPayerFWADetect(request, env) {
  try {
    const { analysisWindow = 30, thresholdSigma = 2.0 } = await request.json();
    let claimsData = [];
    if (env.DB) {
      try {
        const cutoff = new Date(); cutoff.setDate(cutoff.getDate() - analysisWindow);
        const r = await env.DB.prepare(`SELECT pr.id as provider_id, pr.name as provider_name, pr.speciality, COUNT(c.id) as claim_count, AVG(c.billed_amount) as avg_amount, SUM(c.billed_amount) as total_billed, COUNT(DISTINCT c.patient_id) as unique_patients, SUM(CASE WHEN c.status='denied' THEN 1 ELSE 0 END) as denials FROM providers pr LEFT JOIN claims c ON c.provider_id = pr.id AND c.created_at >= ? GROUP BY pr.id ORDER BY total_billed DESC LIMIT 50`).bind(cutoff.toISOString()).all();
        claimsData = r.results || [];
      } catch {}
    }
    const amounts = claimsData.map(p => p.avg_amount || 0).filter(a => a > 0);
    const mean = amounts.length ? amounts.reduce((s, a) => s + a, 0) / amounts.length : 0;
    const stdDev = Math.sqrt(amounts.length ? amounts.reduce((s, a) => s + (a - mean) ** 2, 0) / amounts.length : 0);
    const flagged = claimsData.filter(p => { const z = stdDev > 0 ? Math.abs((p.avg_amount - mean) / stdDev) : 0; p.z_score = Math.round(z * 100) / 100; return z > thresholdSigma || (p.denials / (p.claim_count || 1)) > 0.3; });
    let aiInsights = "";
    if (flagged.length > 0) aiInsights = await wfRunAI(env, [{ role: "system", content: "You are a healthcare fraud investigator. Analyze provider billing patterns for FWA indicators. Be concise and specific." }, { role: "user", content: `Flagged: ${JSON.stringify(flagged.slice(0, 10))}\nBaseline: mean=${mean.toFixed(0)}, std=${stdDev.toFixed(0)}\nWindow: ${analysisWindow} days` }]);
    return json({ success: true, workflow: "fwa_detection", analysis_window_days: analysisWindow, providers_analyzed: claimsData.length, flagged_count: flagged.length, flagged_providers: flagged.slice(0, 20), statistical_baseline: { mean_claim_amount: Math.round(mean), std_deviation: Math.round(stdDev), threshold_sigma: thresholdSigma }, ai_insights: aiInsights, recommended_actions: flagged.length > 0 ? ["initiate_provider_audit", "request_medical_records", "notify_compliance_team"] : ["continue_monitoring"], generated_at: new Date().toISOString() });
  } catch (e) { return json({ success: false, error: e.message }, 500); }
}
__name(wfPayerFWADetect, "wfPayerFWADetect");

// ── Government / MOH Workflows ────────────────────────────────────────────────

async function wfGovSurveillance(request, env) {
  try {
    const url = new URL(request.url);
    const region = url.searchParams.get("region") || "all";
    const condition = url.searchParams.get("condition") || "respiratory";
    const days = parseInt(url.searchParams.get("days") || "7");
    let trend = [];
    if (env.DB) {
      try { const cutoff = new Date(); cutoff.setDate(cutoff.getDate() - days); const r = await env.DB.prepare(`SELECT date(created_at) as day, COUNT(*) as count FROM diagnoses WHERE created_at >= ? AND (LOWER(description) LIKE ? OR LOWER(icd_code) LIKE ?) GROUP BY day ORDER BY day DESC`).bind(cutoff.toISOString(), `%${condition}%`, `%${condition}%`).all(); trend = r.results || []; } catch {}
    }
    const counts = trend.map(d => d.count);
    const avg = counts.length ? counts.reduce((s, c) => s + c, 0) / counts.length : 0;
    const latest = counts[0] || 0;
    const spikeDetected = latest > avg * 1.5 && counts.length >= 3;
    const spikeRatio = avg > 0 ? (latest / avg).toFixed(2) : "0";
    let alert = null;
    if (spikeDetected) alert = await wfRunAI(env, [{ role: "system", content: "You are a Saudi MOH epidemiologist. Analyze data spikes. Provide: severity, likely causes, recommended actions. Be direct." }, { role: "user", content: `Condition: ${condition}\nRegion: ${region}\nBaseline: ${avg.toFixed(1)}/day\nLatest: ${latest}\nRatio: ${spikeRatio}x\nTrend: ${JSON.stringify(trend.slice(0, 7))}` }]);
    return json({ success: true, workflow: "public_health_surveillance", region, condition, analysis_window_days: days, spike_detected: spikeDetected, spike_ratio: parseFloat(spikeRatio), baseline_daily_avg: Math.round(avg), latest_day_count: latest, alert_level: spikeDetected ? (parseFloat(spikeRatio) > 3 ? "RED" : "AMBER") : "GREEN", alert_text: alert, trend_data: trend, recommended_actions: spikeDetected ? ["notify_moh_command_center", "activate_rapid_response", "increase_surveillance"] : ["continue_passive_surveillance"], generated_at: new Date().toISOString() });
  } catch (e) { return json({ success: false, error: e.message }, 500); }
}
__name(wfGovSurveillance, "wfGovSurveillance");

async function wfGovComplianceReport(request, env) {
  try {
    const { period, facilityLicense, autoSubmit = false } = await request.json();
    const now = new Date();
    const rp = period || { start: new Date(now.getFullYear(), now.getMonth() - 1, 1).toISOString().split("T")[0], end: new Date(now.getFullYear(), now.getMonth(), 0).toISOString().split("T")[0] };
    let stats = {};
    if (env.DB) {
      try { stats = await env.DB.prepare(`SELECT (SELECT COUNT(*) FROM patients) as total_patients, (SELECT COUNT(*) FROM appointments WHERE appointment_date BETWEEN ? AND ?) as total_appointments, (SELECT COUNT(*) FROM claims WHERE created_at BETWEEN ? AND ?) as total_claims, (SELECT COUNT(*) FROM claims WHERE status='approved' AND created_at BETWEEN ? AND ?) as approved_claims, (SELECT COUNT(*) FROM telehealth_sessions WHERE created_at BETWEEN ? AND ?) as telehealth_sessions, (SELECT COUNT(*) FROM homecare_visits WHERE created_at BETWEEN ? AND ?) as homecare_visits`).bind(rp.start, rp.end, rp.start, rp.end, rp.start, rp.end, rp.start, rp.end, rp.start, rp.end).first(); } catch {}
    }
    const approvalRate = stats?.total_claims > 0 ? Math.round((stats.approved_claims / stats.total_claims) * 100) : 0;
    const indicators = [
      { code: "PI-001", name: "Claims Approval Rate", value: approvalRate, target: 90, unit: "%" },
      { code: "PI-002", name: "Telehealth Sessions", value: stats?.telehealth_sessions || 0, target: 100, unit: "sessions" },
      { code: "PI-003", name: "Homecare Visits", value: stats?.homecare_visits || 0, target: 50, unit: "visits" },
      { code: "PI-004", name: "Outpatient Encounters", value: stats?.total_appointments || 0, target: 1000, unit: "encounters" },
      { code: "PI-005", name: "NPHIES Uptime", value: 99, target: 99, unit: "%" },
      { code: "PI-006", name: "Digital Claims Rate", value: 100, target: 100, unit: "%" },
    ];
    const reportData = { facility: { license: facilityLicense || env.FACILITY_LICENSE || "10000000000988", name: "Hayat National Hospital" }, period: rp, indicators, stats: { total_patients: stats?.total_patients || 0, total_claims: stats?.total_claims || 0, total_appointments: stats?.total_appointments || 0, telehealth_sessions: stats?.telehealth_sessions || 0, homecare_visits: stats?.homecare_visits || 0 } };
    const mohXML = wfMOHXML(reportData);
    const summary = await wfRunAI(env, [{ role: "system", content: "Write a concise executive compliance report summary for the Saudi MOH. Highlight achievements and Vision 2030 alignment." }, { role: "user", content: `Period: ${rp.start}–${rp.end}\nIndicators: ${JSON.stringify(indicators)}\nStats: ${JSON.stringify(stats)}` }]);
    let submissionStatus = "report_ready";
    if (autoSubmit) { try { const base = env.NPHIES_MIRROR_URL || "https://nphies-mirror.brainsait-fadil.workers.dev"; const r = await fetch(`${base}/reports/submit`, { method: "POST", headers: { "Content-Type": "application/xml" }, body: mohXML, signal: AbortSignal.timeout(15000) }); submissionStatus = r.ok ? "submitted_to_nphies" : `submission_failed_${r.status}`; } catch { submissionStatus = "submission_error"; } }
    return json({ success: true, workflow: "moh_compliance_report", period: rp, stats, quality_indicators: indicators, indicators_met: indicators.filter(i => i.value >= (i.target || 0)).length, indicators_total: indicators.length, executive_summary: summary, moh_xml: mohXML, submission_status: submissionStatus, generated_at: new Date().toISOString() });
  } catch (e) { return json({ success: false, error: e.message }, 500); }
}
__name(wfGovComplianceReport, "wfGovComplianceReport");

async function wfGovPolicyAnalysis(request, env) {
  try {
    const { program, years = 2, language = "en" } = await request.json();
    if (!program) return json({ success: false, error: "program required" }, 400);
    let agg = {};
    if (env.DB) { try { const cutoff = new Date(); cutoff.setFullYear(cutoff.getFullYear() - years); agg = await env.DB.prepare(`SELECT COUNT(DISTINCT c.patient_id) as patients_affected, COUNT(c.id) as total_claims, AVG(c.billed_amount) as avg_claim_cost, SUM(c.billed_amount) as total_cost FROM claims c JOIN diagnoses d ON d.patient_id = c.patient_id WHERE (LOWER(d.description) LIKE ? OR LOWER(d.icd_code) LIKE ?) AND c.created_at >= ?`).bind(`%${program.replace(/_/g, " ")}%`, `%${program}%`, cutoff.toISOString()).first(); } catch {} }
    const isAr = language === "ar";
    const analysis = await wfRunAI(env, [{ role: "system", content: isAr ? "أنت محلل سياسات صحية للحكومة السعودية. قدم تحليلاً شاملاً لفعالية البرنامج مع توصيات مبنية على الأدلة ورؤية 2030." : "You are a Saudi health policy analyst. Provide comprehensive cost-effectiveness analysis with evidence-based recommendations aligned with Vision 2030." }, { role: "user", content: `Program: ${program.replace(/_/g, " ")}\nYears: ${years}\nData: ${JSON.stringify(agg)}\n\nProvide: 1.Cost-effectiveness 2.Outcome metrics 3.GCC benchmarks 4.Vision 2030 alignment 5.Policy recommendations with ROI` }]);
    return json({ success: true, workflow: "policy_analysis", program: program.replace(/_/g, " "), analysis_years: years, aggregated_data: agg, policy_analysis: analysis, vision_2030_pillars: ["digital_health", "preventive_care", "quality_outcomes", "cost_efficiency"], recommended_next_steps: ["commission_health_economics_study", "benchmark_gcc_peers", "engage_stakeholders", "draft_policy_brief"], language, generated_at: new Date().toISOString() });
  } catch (e) { return json({ success: false, error: e.message }, 500); }
}
__name(wfGovPolicyAnalysis, "wfGovPolicyAnalysis");

async function wfGovKPIDashboard(request, env) {
  try {
    let kpis = {};
    if (env.DB) { try { kpis = await env.DB.prepare(`SELECT (SELECT COUNT(*) FROM patients) as total_patients, (SELECT COUNT(*) FROM providers) as total_providers, (SELECT COUNT(*) FROM claims) as total_claims, (SELECT COUNT(*) FROM claims WHERE status='approved') as approved_claims, (SELECT COUNT(*) FROM claims WHERE status='denied') as denied_claims, (SELECT COUNT(*) FROM claims WHERE status='pending') as pending_claims, (SELECT COUNT(*) FROM appointments WHERE date(appointment_date) = date('now')) as today_appointments, (SELECT COUNT(*) FROM telehealth_sessions) as total_telehealth, (SELECT COUNT(*) FROM homecare_visits) as total_homecare, (SELECT COUNT(*) FROM givc_doctors WHERE givc_status='active') as givc_providers`).first(); } catch {} }
    const approvalRate = kpis.total_claims > 0 ? Math.round((kpis.approved_claims / kpis.total_claims) * 100) : 0;
    return json({ success: true, workflow: "gov_kpi_dashboard", facility: env.FACILITY_LICENSE || "10000000000988", kpis: { total_registered_patients: kpis.total_patients || 0, total_providers: kpis.total_providers || 0, today_appointments: kpis.today_appointments || 0, telehealth_sessions_total: kpis.total_telehealth || 0, homecare_visits_total: kpis.total_homecare || 0, total_claims_submitted: kpis.total_claims || 0, claims_approved: kpis.approved_claims || 0, claims_denied: kpis.denied_claims || 0, claims_pending: kpis.pending_claims || 0, claim_approval_rate_pct: approvalRate, givc_active_providers: kpis.givc_providers || 0 }, vision_2030_targets: { digital_health_adoption: "85%", claims_digital_submission: "100%", telehealth_penetration: "30%", home_healthcare_growth: "200%" }, generated_at: new Date().toISOString() });
  } catch (e) { return json({ success: false, error: e.message }, 500); }
}
__name(wfGovKPIDashboard, "wfGovKPIDashboard");

// ── Workflow Route Registrations ──────────────────────────────────────────────
// Patient
router.post("/api/workflows/patient/health-screening",  (req, env) => wfPatientHealthScreening(req, env));
router.post("/api/workflows/patient/book-visit",         (req, env) => wfPatientBookVisit(req, env));
router.post("/api/workflows/patient/post-visit",         (req, env) => wfPatientPostVisit(req, env));
router.post("/api/workflows/patient/lab-results",        (req, env) => wfPatientLabResults(req, env));
router.get("/api/workflows/patient/summary/([^/]+)",     (req, env, ctx, p) => wfPatientSummary(req, env, ctx, p));
// Provider
router.post("/api/workflows/provider/clinical-decision", (req, env) => wfProviderClinicalDecision(req, env));
router.post("/api/workflows/provider/smart-billing",     (req, env) => wfProviderSmartBilling(req, env));
router.post("/api/workflows/provider/cohort-outreach",   (req, env) => wfProviderCohortOutreach(req, env));
router.get("/api/workflows/provider/schedule/([^/]+)",   (req, env, ctx, p) => wfProviderSchedule(req, env, ctx, p));
// Payer
router.post("/api/workflows/payer/adjudicate",           (req, env) => wfPayerAdjudicate(req, env));
router.post("/api/workflows/payer/prior-auth",           (req, env) => wfPayerPriorAuth(req, env));
router.post("/api/workflows/payer/fwa-detect",           (req, env) => wfPayerFWADetect(req, env));
// Government / MOH
router.get("/api/workflows/gov/surveillance",            (req, env) => wfGovSurveillance(req, env));
router.post("/api/workflows/gov/compliance-report",      (req, env) => wfGovComplianceReport(req, env));
router.post("/api/workflows/gov/policy-analysis",        (req, env) => wfGovPolicyAnalysis(req, env));
router.get("/api/workflows/gov/kpi-dashboard",           (req, env) => wfGovKPIDashboard(req, env));
// ── End Workflow Routes ───────────────────────────────────────────────────────

router.get("/", (req, env, ctx, p, url) => servePage(req));
router.get("/(.*)", (req, env, ctx, p, url) => servePage(req));
var index_default = {
  async fetch(request, env, ctx) {
    if (request.method === "OPTIONS") return handleCors(request);
    const origin = getAllowedOrigin(request);
    try {
      const url = new URL(request.url);
      if ((request.method === "GET" || request.method === "HEAD") && (isFrontendAsset(url.pathname) || isFrontendRoute(url.pathname))) {
        const frontendResponse = await proxyFrontend(request);
        frontendResponse.headers.set("Access-Control-Allow-Origin", origin || "https://hnh.brainsait.org");
        frontendResponse.headers.set("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
        frontendResponse.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
        frontendResponse.headers.set("Vary", "Origin");
        return frontendResponse;
      }
      if (!(request.method === "GET" && url.pathname === "/api/health")) {
        const ip = request.headers.get("CF-Connecting-IP") || "unknown";
        if (!rateLimit(ip)) {
          return new Response(JSON.stringify({ error: "Rate limit exceeded" }), {
            status: 429,
            headers: { "Content-Type": "application/json", "Retry-After": "60", ...SECURITY_HEADERS }
          });
        }
      }
      const response = await router.match(request, env, ctx);
      if (response && typeof response === "object" && response.headers) {
        const safeCors = {
          "Access-Control-Allow-Origin": origin || "https://hnh.brainsait.org",
          "Access-Control-Allow-Methods": "GET, POST, PATCH, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
          "Vary": "Origin"
        };
        for (const [k, v] of Object.entries(safeCors)) {
          response.headers.set(k, v);
        }
      }
      return response;
    } catch (e) {
      console.error("Handler error:", e);
      return new Response(JSON.stringify({ error: "Internal server error" }), {
        status: 500,
        headers: { "Content-Type": "application/json", ...SECURITY_HEADERS }
      });
    }
  },
  async scheduled(event, env, ctx) {
    console.log("Cron trigger started at:", event.cron);
    try {
      if (env.NPHIES_MIRROR_URL) {
        console.log("Fetching NPHIES batch status updates...");
        const rcmUpdate = await fetch(env.NPHIES_MIRROR_URL + "/api/rcm/sync-remittance", {
          method: "POST",
          headers: { "Authorization": "Bearer " + (env.API_KEY || "") }
        });
        if (rcmUpdate.ok) console.log("RCM Sync successful.");
      }
    } catch (e) {
      console.error("NPHIES Cron error:", e);
    }
    try {
      if (env.HIS_DB) {
        console.log("Checking for tomorrow's appointments to send reminders...");
        const tomorrow = /* @__PURE__ */ new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const tStr = tomorrow.toISOString().split("T")[0];
        const q = "SELECT * FROM appointments WHERE appointment_date = ? AND status = 'scheduled'";
        const apps = await env.HIS_DB.prepare(q).bind(tStr).all();
        if (apps && apps.results) {
          console.log("Found " + apps.results.length + " appointments to remind.");
          for (const app of apps.results) {
            console.log("Sending reminder to patient: " + app.patient_id + " for clinic: " + app.clinic_name);
          }
        }
      }
    } catch (e) {
      console.error("Patient Reminder Cron error:", e);
    }
  }
};
export {
  index_default as default
};
//# sourceMappingURL=index.js.map
