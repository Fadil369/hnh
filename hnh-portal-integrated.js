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

// src/routes/providers.js
var providers_exports = {};
__export(providers_exports, {
  getProvider: () => getProvider,
  getProviders: () => getProviders,
  getProvidersByBranch: () => getProvidersByBranch,
  getProvidersByDepartment: () => getProvidersByDepartment,
  providers: () => providers
});
async function getProvidersFromDB(env) {
  try {
    if (!env || !env.DB) return null;
    const { results } = await env.DB.prepare(
      "SELECT id, provider_code, first_name_ar, last_name_ar, first_name_en, last_name_en, specialty, subspecialty, department, clinic_location, phone, email FROM providers WHERE is_active = 1 ORDER BY specialty, last_name_ar"
    ).all();
    if (results && results.length > 0) {
      return results.map((r) => ({
        id: r.provider_code || "P" + String(r.id).padStart(3, "0"),
        name_ar: ("\u062F. " + (r.first_name_ar || "") + " " + (r.last_name_ar || "")).trim(),
        name_en: ("Dr. " + (r.first_name_en || r.first_name_ar || "") + " " + (r.last_name_en || r.last_name_ar || "")).trim(),
        specialty: r.specialty || "",
        subspecialty: r.subspecialty || "",
        department: r.department || "",
        branch: r.clinic_location || "",
        phone: r.phone || "",
        email: r.email || "",
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
      const found = dbProviders.find((p) => p.id === id);
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
var providers;
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
    __name(getProvidersFromDB, "getProvidersFromDB");
    __name(getProviders, "getProviders");
    __name(getProvider, "getProvider");
    __name(getProvidersByBranch, "getProvidersByBranch");
    __name(getProvidersByDepartment, "getProvidersByDepartment");
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
    const method = request.method;
    const path = url.pathname;
    for (const route of this.routes) {
      if (route.method !== method) continue;
      const match = path.match(new RegExp(`^${route.pattern}$`));
      if (!match) continue;
      const params = match.slice(1);
      return route.handler(request, env, ctx, ...params, url);
    }
    return new Response("Not Found", { status: 404 });
  }
};

// src/config.js
var CONFIG = {
  NAME: "HNH Portal - BrainSAIT Healthcare OS",
  VERSION: "1.1.0",
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
var SECURITY_HEADERS = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "X-XSS-Protection": "1; mode=block",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(self), geolocation=()",
  "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
  "Cache-Control": "no-cache, no-store, must-revalidate"
};

// src/utils/response.js
var CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PATCH, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization"
};
function mergeHeaders(extra = {}) {
  return { ...CORS_HEADERS, ...SECURITY_HEADERS, ...extra };
}
__name(mergeHeaders, "mergeHeaders");
function json(data, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: mergeHeaders({
      "Content-Type": "application/json; charset=utf-8",
      ...extraHeaders
    })
  });
}
__name(json, "json");
function handleCors() {
  return new Response(null, {
    status: 204,
    headers: mergeHeaders()
  });
}
__name(handleCors, "handleCors");

// src/utils/rate-limit.js
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
async function createAppointment(req, env) {
  const body = await req.json();
  const id = "APT" + Date.now().toString(36).toUpperCase();
  await env.DB.prepare(
    `INSERT INTO appointments (id, patient_id, provider_id, clinic_code, clinic_name, appointment_date, appointment_time, status, appointment_type, reason)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).bind(
    id,
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
  return json({ success: true, appointment_id: id }, 201);
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
    conditions.push("(p.name_ar LIKE ? OR p.name_en LIKE ?)");
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
async function createPatient(req, env) {
  const body = await req.json();
  const id = "PAT" + Date.now().toString(36).toUpperCase();
  const mrn = "HNH-" + Date.now();
  const { data: result } = await env.DB.prepare(
    `INSERT INTO patients (id, mrn, national_id, first_name_ar, last_name_ar, full_name_ar, first_name_en, last_name_en, full_name_en, phone, email, date_of_birth, gender, blood_type, allergies)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).bind(
    id,
    mrn,
    body.national_id || null,
    body.first_name_ar || body.name_ar,
    body.last_name_ar || "",
    body.full_name_ar || body.name_ar,
    body.first_name_en || "",
    body.last_name_en || "",
    body.full_name_en || body.name_en || "",
    body.phone,
    body.email || null,
    body.date_of_birth || body.dob || null,
    body.gender || null,
    body.blood_type || null,
    body.allergies || null
  ).run();
  return json({ success: true, patient_id: id, message: "Patient created successfully" }, 201);
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
    const allowed = ["national_id", "name_ar", "name_en", "phone", "email", "dob", "gender", "insurance_company", "insurance_id", "blood_type", "allergies"];
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
async function checkEligibility(req, env) {
  const body = await req.json();
  const {
    patient_id,
    insurance_id,
    insurance_company,
    service_type,
    // medical, dental, pharmacy, hospital
    provider_npi
  } = body;
  if (!insurance_id) {
    return json({ success: false, message: "Insurance ID required" }, 400);
  }
  let patient = null;
  if (patient_id) {
    patient = await env.DB.prepare("SELECT * FROM patients WHERE id = ?").bind(patient_id).first();
  }
  const eligibilityResponse = {
    transaction_id: "NPH-EB-" + Date.now().toString(36).toUpperCase(),
    subscriber: {
      insurance_id,
      name: patient ? patient.name_ar : "Patient",
      relationship: "Self"
    },
    payer: {
      company: insurance_company || "Bupa Arabia",
      payer_id: "BUPA001"
    },
    status: "active",
    coverage: {
      inpatient: {
        covered: true,
        deductible: 1e3,
        deductible_remaining: 500,
        co_pay_percentage: 10,
        max_benefit: 5e5,
        max_benefit_remaining: 35e4
      },
      outpatient: {
        covered: true,
        deductible: 200,
        deductible_remaining: 100,
        co_pay_percentage: 20,
        max_visits: 12,
        visits_remaining: 8
      },
      pharmacy: {
        covered: true,
        co_pay_percentage: 15,
        max_annual: 1e4
      },
      dental: {
        covered: service_type === "dental",
        co_pay_percentage: 20,
        max_annual: 5e3
      }
    },
    exclusions: [
      "Pre-existing conditions (first 6 months)",
      "Cosmetic surgery",
      "Experimental treatments"
    ],
    effective_date: "2026-01-01",
    expiry_date: "2026-12-31",
    network: "Preferred Provider Network"
  };
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
      "completed"
    ).run();
  }
  return json({ success: true, eligibility: eligibilityResponse });
}
__name(checkEligibility, "checkEligibility");
async function verifyInsurance(req, env) {
  const body = await req.json();
  const { insurance_id, insurance_company } = body;
  if (!insurance_id) {
    return json({ success: false, message: "Insurance ID required" }, 400);
  }
  const mockCompanies = [
    { name: "Bupa Arabia", id: "BUPA", network: "Gold", coverage: 90 },
    { name: "Tawuniya", id: "TAW", network: "Platinum", coverage: 100 },
    { name: "MedGulf", id: "MED", network: "Silver", coverage: 75 },
    { name: "Allianz Saudi Fransi", id: "ASF", network: "Gold", coverage: 85 },
    { name: "GlobeMed", id: "GLB", network: "Basic", coverage: 60 },
    { name: "Amana", id: "AMA", network: "Premium", coverage: 95 },
    { name: "Arabian Shield", id: "AS", network: "Gold", coverage: 80 },
    { name: "Sagr", id: "SGR", network: "Silver", coverage: 70 },
    { name: "GIG Gulf", id: "GIG", network: "Platinum", coverage: 90 },
    { name: "Walaa", id: "WAL", network: "Basic", coverage: 50 }
  ];
  const company = mockCompanies.find(
    (c) => insurance_company ? c.name.toLowerCase().includes(insurance_company.toLowerCase()) : true
  ) || mockCompanies[0];
  const isValid = insurance_id.length >= 8 && /^\d+$/.test(insurance_id.replace(/-/g, ""));
  return json({
    success: true,
    verified: isValid,
    details: isValid ? {
      company: company.name,
      network: company.network,
      coverage_percentage: company.coverage,
      insurance_id,
      valid_until: "2026-12-31",
      member_since: "2024-01-01"
    } : null,
    message: isValid ? "Insurance verified successfully" : "Insurance ID format invalid"
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
async function submit270(req, env) {
  const body = await req.json();
  const transactionId = "NPH270-" + Date.now().toString(36).toUpperCase();
  const response271 = {
    nphies_version: "V2",
    transaction_type: "270",
    ack: {
      transaction_id: transactionId,
      status: "accepted",
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    },
    response_271: {
      subscriber: {
        id: body.subscriber_id || "Unknown",
        name: body.subscriber_name || "Patient",
        eligibility_status: "Active",
        effective_date: "2026-01-01",
        benefits_end_date: "2026-12-31"
      },
      benefits: {
        inpatient: { status: "Active", deductible: 1e3, co_pay: "10%", max_benefit: 5e5 },
        outpatient: { status: "Active", deductible: 200, co_pay: "20%", max_visits: 12 },
        emergency: { status: "Active", deductible: 0, co_pay: "10%" },
        pharmacy: { status: "Active", co_pay: "15%", max_annual: 1e4 }
      },
      rejection_info: null
    },
    raw_x12: "ISA*00*          *00*          *ZZ*PAYER         *ZZ*PROVIDER       *..."
  };
  return json({ success: true, ...response271 });
}
__name(submit270, "submit270");
async function submit278(req, env) {
  const body = await req.json();
  const transactionId = "NPH278-" + Date.now().toString(36).toUpperCase();
  const response = {
    nphies_version: "V2",
    transaction_type: "278",
    ack: {
      transaction_id: transactionId,
      status: "accepted",
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    },
    authorization: {
      reference_number: "AUTH-" + Date.now().toString(36).toUpperCase(),
      status: "Approved",
      service_type: body.service_type || "Medical Care",
      diagnosis_code: body.diagnosis_code || "Z00.00",
      procedure_code: body.procedure_code || "99213",
      authorized_units: 1,
      effective_date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      expiration_date: new Date(Date.now() + 30 * 864e5).toISOString().split("T")[0],
      provider_notes: "Prior authorization approved per clinical guidelines."
    },
    raw_x12: "ISA*00*          *00*          *ZZ*PAYER         *ZZ*PROVIDER       *..."
  };
  return json({ success: true, ...response });
}
__name(submit278, "submit278");
async function submit837(req, env) {
  const body = await req.json();
  const transactionId = "NPH837-" + Date.now().toString(36).toUpperCase();
  const claimRef = "CLM" + Date.now().toString(36).toUpperCase();
  const response = {
    nphies_version: "V2",
    transaction_type: "837P",
    ack: {
      transaction_id: transactionId,
      claim_reference: claimRef,
      status: "Accepted",
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      edi_ack_code: "TA1",
      ack_detail: "Claim accepted for processing. Acknowledgment sent."
    },
    claim: {
      claim_reference: claimRef,
      submitted_amount: body.total_amount || 1e3,
      patient_responsibility: body.patient_share || 0,
      payer: body.insurance_company || "Bupa Arabia",
      status: "acknowledged"
    },
    raw_x12: "ISA*00*          *00*          *ZZ*PAYER         *ZZ*PROVIDER       *..."
  };
  return json({ success: true, ...response });
}
__name(submit837, "submit837");
async function getClaimStatus276(req, env, ctx, params) {
  const claimId = params[0];
  const transactionId = "NPH276-" + Date.now().toString(36).toUpperCase();
  const statuses = ["Processed", "Pending Review", "Partially Paid", "Denied", "Paid in Full"];
  const response = {
    nphies_version: "V2",
    transaction_type: "276/277",
    ack: {
      transaction_id: transactionId,
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    },
    claim_status: {
      claim_id: claimId,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      payer_claim_number: "PCN-" + claimId,
      patient_responsibility: Math.random() * 500,
      paid_amount: Math.random() * 5e3,
      pending_amount: Math.random() * 2e3,
      last_updated: (/* @__PURE__ */ new Date()).toISOString()
    }
  };
  return json({ success: true, ...response });
}
__name(getClaimStatus276, "getClaimStatus276");
async function receive835(req, env) {
  const body = await req.json();
  const transactionId = "NPH835-" + Date.now().toString(36).toUpperCase();
  const response = {
    nphies_version: "V2",
    transaction_type: "835",
    ack: {
      transaction_id: transactionId,
      status: "Processed",
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    },
    payment: {
      payer: body.payer || "Bupa Arabia",
      total_paid: body.total_paid || 5e3,
      check_number: "CHK" + Date.now().toString(36).toUpperCase(),
      payment_date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      claims_covered: body.claims_covered || 3,
      claims_denied: 0,
      adjustment_reason: "Contractual adjustment - 90% coverage applied"
    }
  };
  return json({ success: true, ...response });
}
__name(receive835, "receive835");

// src/routes/fhir.js
init_providers();
function fhirPatient(patient) {
  if (!patient) return null;
  const names = [];
  if (patient.name_ar || patient.name_en) {
    const name = { use: "official" };
    if (patient.name_en) name.text = patient.name_en;
    if (patient.name_ar) name.text_ar = patient.name_ar;
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
    birthDate: patient.dob || null,
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
  return {
    resourceType: "Practitioner",
    id: provider.id,
    identifier: [{ system: "https://hnh.brainsait.org/identifier/provider", value: provider.id }],
    active: true,
    name: [
      { use: "official", text_en: provider.name_en || "", text_ar: provider.name_ar || "" }
    ],
    qualification: (provider.education || []).map((edu) => ({
      identifier: [],
      code: { coding: [{ system: "http://terminology.hl7.org/CodeSystem/v2-0360", code: "MD", display: edu.degree }] },
      period: { start: edu.year ? `${edu.year}-01-01` : "2000-01-01" },
      issuer: { display: edu.institution }
    })),
    communication: (provider.languages || []).map((l) => ({
      coding: [{ system: "urn:ietf:bcp:47", code: l }]
    }))
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
  const id = params;
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
    query += " AND (name_ar LIKE ? OR name_en LIKE ?)";
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
  const id = params;
  const { getProvider: getProvider2 } = await Promise.resolve().then(() => (init_providers(), providers_exports));
  const provider = await getProvider2(id, env);
  if (!provider) return json({ success: false, message: "Provider not found" }, 404);
  return json(fhirPractitioner(provider));
}
__name(getFHIRPractitioner, "getFHIRPractitioner");
async function getFHIRAppointment(req, env, ctx, params) {
  const id = params;
  const appt = await env.DB.prepare("SELECT * FROM appointments WHERE id = ?").bind(id).first();
  if (!appt) return json({ success: false, message: "Appointment not found" }, 404);
  return json(fhirAppointment(appt));
}
__name(getFHIRAppointment, "getFHIRAppointment");
async function getFHIRClaim(req, env, ctx, params) {
  const id = params;
  const claim = await env.DB.prepare("SELECT * FROM claims WHERE id = ? OR claim_number = ?").bind(id, id).first();
  if (!claim) return json({ success: false, message: "Claim not found" }, 404);
  return json(fhirClaim(claim));
}
__name(getFHIRClaim, "getFHIRClaim");
async function getFHIRCoverage(req, env, ctx, params) {
  const id = params;
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
      total_branches: 5,
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

// src/ai/chat.js
var SYSTEM_PROMPT = `You are BasmaGuist Medical (\u0628\u0633\u0645\u0629 \u063A\u064A\u0633\u062A \u0627\u0644\u0637\u0628\u064A\u0629), the official AI assistant for \u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A (Hayat National Hospitals Group), powered by BrainSAIT Healthcare OS.

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
    console.error("AI error, trying fallback:", e);
    try {
      const ai = await env.AI.run(CONFIG.AI_FALLBACK_MODEL, {
        messages,
        max_tokens: CONFIG.AI_MAX_TOKENS,
        temperature: CONFIG.AI_TEMPERATURE
      });
      aiResponse = ai.response || ai.choices?.[0]?.message?.content || "";
    } catch (e2) {
      aiResponse = getFallbackResponse(message, language);
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
__name(handleChat, "handleChat");
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
__name(getFallbackResponse, "getFallbackResponse");

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
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
      });
    }
    const body = await request.json();
    const text = body.message || body.text || "";
    const lang = body.lang || (/[\u0600-\u06FF]/.test(text) ? "ar" : "en");
    const voiceId = body.voice_id || getVoiceForLang(lang);
    if (!text) {
      return new Response(JSON.stringify({ error: "Text is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
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
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
      });
    }
    const audioBlob = await ttsRes.blob();
    return new Response(audioBlob, {
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "public, max-age=600",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Expose-Headers": "X-Audio-Length, X-Voice",
        "X-Audio-Length": audioBlob.size.toString(),
        "X-Voice": voiceId,
        "X-Lang": lang
      }
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
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
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
      });
    }
    let reply = "";
    try {
      const { handleChat: handleChat2 } = await import("./routes/chat.js");
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
        "Access-Control-Allow-Origin": "*"
      }
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
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
      "Access-Control-Allow-Origin": "*"
    }
  });
}
__name(handleVoiceVoices, "handleVoiceVoices");

// src/pages.js
var CSS_CONTENT = "/* HNH Premium Design System \u2014 API-Integrated */\n:root {\n  --primary: #0066CC;\n  --primary-dark: #004499;\n  --primary-light: #3388DD;\n  --navy: #1A2B4A;\n  --navy-light: #2D4470;\n  --accent: #C9A84C;\n  --accent-light: #E0C97A;\n  --success: #10B981;\n  --danger: #EF4444;\n  --warning: #F59E0B;\n  --text: #1A2B4A;\n  --text-light: #6B7A94;\n  --bg: #FFFFFF;\n  --bg-light: #F8F9FC;\n  --off-white: #F1F3F8;\n  --border: #E2E8F0;\n  --shadow-sm: 0 1px 3px rgba(0,0,0,0.08);\n  --shadow-md: 0 4px 12px rgba(0,0,0,0.1);\n  --shadow-lg: 0 8px 30px rgba(0,0,0,0.12);\n  --shadow-xl: 0 20px 60px rgba(0,0,0,0.15);\n  --radius-sm: 8px;\n  --radius-md: 12px;\n  --radius-lg: 20px;\n  --radius-xl: 28px;\n  --radius-full: 9999px;\n  --gradient-primary: linear-gradient(135deg, #0066CC, #1A2B4A);\n  --gradient-accent: linear-gradient(135deg, #C9A84C, #E0C97A);\n  --gradient-mesh: radial-gradient(ellipse at 20% 50%, rgba(0,102,204,0.08), transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(201,168,76,0.06), transparent 50%);\n  --font-ar: 'Tajawal', sans-serif;\n  --font-en: 'Inter', sans-serif;\n}\n*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }\nhtml { scroll-behavior: smooth; }\nbody { font-family: var(--font-ar); color: var(--text); background: var(--bg); line-height: 1.7; overflow-x: hidden; }\n[dir=\"ltr\"] body { font-family: var(--font-en); }\n.container { max-width: 1240px; margin: 0 auto; padding: 0 24px; }\n/* Header */\n.header { position: fixed; top: 0; left: 0; right: 0; z-index: 1000; transition: all 0.4s ease; padding: 16px 0; }\n.header.scrolled { background: rgba(255,255,255,0.92); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); box-shadow: var(--shadow-md); padding: 10px 0; }\n.header-inner { display: flex; align-items: center; justify-content: space-between; }\n.logo { display: flex; align-items: center; gap: 12px; text-decoration: none; }\n.logo-icon { width: 44px; height: 44px; background: var(--gradient-primary); border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; }\n.logo-text { font-size: 1.1rem; font-weight: 700; color: var(--navy); }\n.logo-text small { display: block; font-size: 0.7rem; font-weight: 400; color: var(--text-light); }\n.nav { display: flex; align-items: center; gap: 28px; }\n.nav a { text-decoration: none; color: var(--text); font-weight: 500; font-size: 0.95rem; transition: color 0.3s; }\n.nav a:hover { color: var(--primary); }\n.nav-cta { background: var(--gradient-primary); color: white !important; padding: 10px 24px; border-radius: var(--radius-full); font-weight: 600 !important; }\n.nav-cta:hover { opacity: 0.9; }\n.lang-btn { background: var(--off-white); border: 1px solid var(--border); padding: 6px 14px; border-radius: var(--radius-full); cursor: pointer; font-size: 0.85rem; font-weight: 600; color: var(--navy); }\n.mobile-toggle { display: none; background: none; border: none; cursor: pointer; padding: 8px; }\n.mobile-toggle span { display: block; width: 24px; height: 2px; background: var(--navy); margin: 5px 0; transition: 0.3s; }\n/* Hero */\n.hero { min-height: 100vh; display: flex; align-items: center; position: relative; overflow: hidden; background: var(--gradient-mesh), var(--bg-light); padding-top: 80px; }\n.hero::before { content: ''; position: absolute; top: -50%; right: -20%; width: 800px; height: 800px; background: radial-gradient(circle, rgba(0,102,204,0.06) 0%, transparent 70%); animation: float 20s infinite ease-in-out; }\n.hero::after { content: ''; position: absolute; bottom: -30%; left: -10%; width: 600px; height: 600px; background: radial-gradient(circle, rgba(201,168,76,0.05) 0%, transparent 70%); animation: float 25s infinite ease-in-out reverse; }\n@keyframes float { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(30px, -40px); } }\n.hero-content { position: relative; z-index: 2; }\n.hero h1 { font-size: clamp(2.2rem, 5vw, 3.5rem); font-weight: 800; color: var(--navy); line-height: 1.2; margin-bottom: 20px; }\n.hero h1 .accent { background: var(--gradient-accent); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }\n.hero p { font-size: 1.15rem; color: var(--text-light); max-width: 560px; margin-bottom: 32px; }\n.hero-buttons { display: flex; gap: 16px; flex-wrap: wrap; }\n/* Stats */\n.stats-bar { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; margin-top: 48px; }\n.stat-card { background: white; border-radius: var(--radius-lg); padding: 24px; text-align: center; box-shadow: var(--shadow-sm); border: 1px solid var(--border); transition: all 0.4s; }\n.stat-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-lg); }\n.stat-number { font-size: 2rem; font-weight: 800; background: var(--gradient-primary); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }\n.stat-number.live { position: relative; }\n.stat-number.live::after { content: ''; display: inline-block; width: 8px; height: 8px; background: var(--success); border-radius: 50%; margin-right: 6px; animation: pulse 2s infinite; vertical-align: middle; }\n@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }\n.stat-label { font-size: 0.85rem; color: var(--text-light); margin-top: 4px; }\n/* Sections */\n.section { padding: 80px 0; }\n.section.bg-light { background: var(--bg-light); }\n.section-header { text-align: center; margin-bottom: 48px; }\n.section-header h2 { font-size: 2rem; font-weight: 800; color: var(--navy); margin-bottom: 8px; }\n.section-header p { color: var(--text-light); font-size: 1.05rem; }\n/* Grids */\n.grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; }\n.grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }\n.grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }\n/* Cards */\n.card { background: white; border-radius: var(--radius-lg); padding: 28px; box-shadow: var(--shadow-sm); border: 1px solid var(--border); transition: all 0.4s; }\n.card:hover { box-shadow: var(--shadow-lg); transform: translateY(-2px); }\n.dept-card { text-align: center; padding: 32px 20px; }\n.dept-icon { width: 56px; height: 56px; background: var(--gradient-primary); border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; color: white; }\n.dept-icon svg { width: 28px; height: 28px; fill: currentColor; }\n.doctor-card { text-align: center; padding: 32px 20px; }\n.doctor-photo { width: 80px; height: 80px; border-radius: 50%; background: var(--gradient-accent); display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; font-size: 1.8rem; font-weight: 700; color: var(--navy); }\n.specialty { color: var(--primary); font-weight: 600; font-size: 0.9rem; margin-bottom: 4px; }\n.branch-tag { color: var(--text-light); font-size: 0.8rem; background: var(--off-white); display: inline-block; padding: 3px 12px; border-radius: var(--radius-full); margin-bottom: 12px; }\n.branch-card { padding: 0; overflow: hidden; }\n.branch-icon { width: 48px; height: 48px; background: var(--gradient-accent); border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; }\n.branch-info { display: flex; gap: 16px; margin: 12px 0; font-size: 0.9rem; color: var(--text-light); }\n/* Buttons */\n.btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; padding: 12px 28px; border-radius: var(--radius-full); font-weight: 600; font-size: 0.95rem; text-decoration: none; border: none; cursor: pointer; transition: all 0.3s; }\n.btn-primary { background: var(--gradient-primary); color: white; }\n.btn-primary:hover { opacity: 0.9; transform: translateY(-1px); }\n.btn-accent { background: var(--gradient-accent); color: var(--navy); }\n.btn-outline { background: transparent; border: 2px solid var(--primary); color: var(--primary); }\n.btn-outline:hover { background: var(--primary); color: white; }\n.btn-white { background: white; color: var(--navy); }\n.btn-sm { padding: 8px 20px; font-size: 0.85rem; }\n.btn-lg { padding: 16px 36px; font-size: 1.05rem; }\n/* Filter Bar */\n.filter-bar { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 32px; align-items: center; }\n.filter-bar input, .filter-bar select { padding: 10px 16px; border: 1px solid var(--border); border-radius: var(--radius-full); font-size: 0.9rem; background: white; color: var(--text); min-width: 200px; }\n.filter-bar input:focus, .filter-bar select:focus { outline: none; border-color: var(--primary); box-shadow: 0 0 0 3px rgba(0,102,204,0.1); }\n.filter-chip { padding: 8px 20px; border: 1px solid var(--border); border-radius: var(--radius-full); background: white; cursor: pointer; font-size: 0.85rem; font-weight: 500; transition: all 0.3s; }\n.filter-chip.active, .filter-chip:hover { background: var(--primary); color: white; border-color: var(--primary); }\n/* Forms */\n.form-group { margin-bottom: 20px; }\n.form-group label { display: block; font-weight: 600; font-size: 0.9rem; margin-bottom: 6px; color: var(--navy); }\n.form-group input, .form-group select, .form-group textarea { width: 100%; padding: 12px 16px; border: 1px solid var(--border); border-radius: var(--radius-md); font-size: 0.95rem; transition: all 0.3s; font-family: inherit; }\n.form-group input:focus, .form-group select:focus, .form-group textarea:focus { outline: none; border-color: var(--primary); box-shadow: 0 0 0 3px rgba(0,102,204,0.1); }\n.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }\n/* Toast */\n.toast { position: fixed; bottom: 24px; right: 24px; padding: 16px 24px; border-radius: var(--radius-md); color: white; font-weight: 600; z-index: 9999; transform: translateY(100px); opacity: 0; transition: all 0.4s; }\n.toast.show { transform: translateY(0); opacity: 1; }\n.toast.success { background: var(--success); }\n.toast.error { background: var(--danger); }\n/* CTA Section */\n.cta-section { background: var(--gradient-primary); padding: 80px 0; text-align: center; position: relative; overflow: hidden; }\n.cta-section::before { content: ''; position: absolute; inset: 0; background: var(--gradient-mesh); opacity: 0.3; }\n.cta-section h2 { font-size: 2rem; color: white; margin-bottom: 12px; position: relative; z-index: 1; }\n.cta-section p { color: rgba(255,255,255,0.8); font-size: 1.1rem; margin-bottom: 32px; position: relative; z-index: 1; }\n.cta-buttons { display: flex; gap: 16px; justify-content: center; position: relative; z-index: 1; }\n/* Page Hero */\n.page-hero { background: var(--gradient-primary); padding: 140px 0 60px; color: white; position: relative; }\n.page-hero h1 { font-size: 2.5rem; font-weight: 800; margin-bottom: 8px; }\n.page-hero p { color: rgba(255,255,255,0.7); }\n.breadcrumb { display: flex; gap: 8px; font-size: 0.85rem; color: rgba(255,255,255,0.6); margin-bottom: 16px; }\n.breadcrumb a { color: rgba(255,255,255,0.6); text-decoration: none; }\n.breadcrumb a:hover { color: var(--accent); }\n/* Loading */\n.loading { display: flex; align-items: center; justify-content: center; padding: 40px; }\n.spinner { width: 32px; height: 32px; border: 3px solid var(--border); border-top-color: var(--primary); border-radius: 50%; animation: spin 0.8s linear infinite; }\n@keyframes spin { to { transform: rotate(360deg); } }\n/* Contact Grid */\n.contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; }\n.contact-info-card { display: flex; gap: 16px; padding: 20px; background: var(--bg-light); border-radius: var(--radius-md); margin-bottom: 16px; }\n.icon-box { width: 48px; height: 48px; background: var(--gradient-primary); border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }\n.icon-box svg { width: 22px; height: 22px; fill: white; }\n/* Achievement Cards */\n.achievement-card { padding: 32px; text-align: center; }\n.achievement-card h4 { margin-bottom: 8px; }\n/* Blog Cards */\n.blog-card { border-radius: var(--radius-lg); overflow: hidden; box-shadow: var(--shadow-sm); border: 1px solid var(--border); }\n.blog-img { height: 200px; background: var(--gradient-primary); display: flex; align-items: center; justify-content: center; }\n.blog-img svg { width: 48px; height: 48px; fill: rgba(255,255,255,0.3); }\n.blog-body { padding: 24px; }\n.blog-date { font-size: 0.8rem; color: var(--text-light); margin-bottom: 8px; }\n.read-more { color: var(--primary); font-weight: 600; text-decoration: none; font-size: 0.9rem; }\n/* Offer Cards */\n.offer-card { border-radius: var(--radius-lg); overflow: hidden; box-shadow: var(--shadow-sm); border: 1px solid var(--border); position: relative; }\n.offer-badge { position: absolute; top: 16px; right: 16px; background: var(--accent); color: var(--navy); padding: 4px 14px; border-radius: var(--radius-full); font-weight: 700; font-size: 0.85rem; z-index: 2; }\n.offer-img { height: 180px; background: var(--gradient-primary); display: flex; align-items: center; justify-content: center; }\n.offer-img svg { width: 48px; height: 48px; fill: rgba(255,255,255,0.3); }\n.offer-body { padding: 20px; }\n.offer-branch { font-size: 0.8rem; color: var(--primary); font-weight: 600; margin-bottom: 4px; }\n/* Career Cards */\n.career-card { padding: 28px; position: relative; }\n.career-branch { display: inline-block; background: var(--off-white); color: var(--primary); padding: 4px 14px; border-radius: var(--radius-full); font-size: 0.8rem; font-weight: 600; margin-bottom: 12px; }\n.career-tags { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 12px; }\n.tag { padding: 4px 12px; background: var(--off-white); border-radius: var(--radius-full); font-size: 0.8rem; color: var(--text-light); }\n/* Course Cards */\n.course-card { border-radius: var(--radius-lg); overflow: hidden; box-shadow: var(--shadow-sm); border: 1px solid var(--border); }\n.course-header { background: var(--gradient-primary); padding: 24px; }\n.course-body { padding: 24px; }\n.course-meta { display: flex; gap: 16px; margin-top: 12px; font-size: 0.85rem; color: var(--text-light); }\n/* Value Cards */\n.value-card { text-align: center; padding: 32px 20px; }\n.value-icon { width: 56px; height: 56px; background: linear-gradient(135deg, rgba(0,102,204,0.1), rgba(0,102,204,0.05)); border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; }\n.value-icon svg { width: 28px; height: 28px; fill: var(--primary); }\n.gold-line { width: 60px; height: 3px; background: var(--gradient-accent); margin: 12px 0 20px; border-radius: 2px; }\n.about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center; }\n.about-image { border-radius: var(--radius-xl); overflow: hidden; aspect-ratio: 4/3; background: var(--gradient-primary); display: flex; align-items: center; justify-content: center; }\n.about-image svg { width: 120px; height: 120px; fill: rgba(255,255,255,0.15); }\n/* WhatsApp Float */\n.wa-float { position: fixed; bottom: 24px; left: 24px; width: 56px; height: 56px; background: #25D366; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 16px rgba(37,211,102,0.4); z-index: 999; transition: transform 0.3s; }\n.wa-float:hover { transform: scale(1.1); }\n.wa-float svg { width: 28px; height: 28px; fill: white; }\n/* Back to top */\n.back-top { position: fixed; bottom: 24px; right: 24px; width: 44px; height: 44px; background: var(--navy); border-radius: 50%; display: flex; align-items: center; justify-content: center; z-index: 999; opacity: 0; transform: translateY(20px); transition: all 0.3s; cursor: pointer; border: none; }\n.back-top.show { opacity: 1; transform: translateY(0); }\n.back-top svg { width: 20px; height: 20px; fill: white; }\n/* API Status Badge */\n.api-status { display: inline-flex; align-items: center; gap: 6px; padding: 4px 12px; border-radius: var(--radius-full); font-size: 0.75rem; font-weight: 600; }\n.api-status.live { background: rgba(16,185,129,0.1); color: var(--success); }\n.api-status.live::before { content: ''; width: 6px; height: 6px; background: var(--success); border-radius: 50%; animation: pulse 2s infinite; }\n/* Footer */\n.footer { background: var(--navy); color: rgba(255,255,255,0.7); padding: 60px 0 24px; }\n.footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 40px; margin-bottom: 40px; }\n.footer h4 { color: white; font-size: 1rem; margin-bottom: 16px; }\n.footer a { color: rgba(255,255,255,0.6); text-decoration: none; display: block; margin-bottom: 8px; font-size: 0.9rem; }\n.footer a:hover { color: var(--accent); }\n.footer-bottom { border-top: 1px solid rgba(255,255,255,0.1); padding-top: 24px; text-align: center; font-size: 0.85rem; }\n/* Responsive */\n@media (max-width: 1024px) {\n  .grid-4 { grid-template-columns: repeat(2, 1fr); }\n  .footer-grid { grid-template-columns: 1fr 1fr; }\n}\n@media (max-width: 768px) {\n  .nav { display: none; }\n  .mobile-toggle { display: block; }\n  .nav.open { display: flex; flex-direction: column; position: absolute; top: 100%; left: 0; right: 0; background: white; padding: 24px; box-shadow: var(--shadow-lg); gap: 16px; }\n  .grid-2, .grid-3, .grid-4 { grid-template-columns: 1fr; }\n  .stats-bar { grid-template-columns: repeat(2, 1fr); }\n  .hero h1 { font-size: 2rem; }\n  .contact-grid { grid-template-columns: 1fr; }\n  .about-grid { grid-template-columns: 1fr; }\n  .form-row { grid-template-columns: 1fr; }\n  .footer-grid { grid-template-columns: 1fr; }\n  .page-hero { padding: 120px 0 40px; }\n  .page-hero h1 { font-size: 1.8rem; }\n}\n/* Animations */\n.animate-on-scroll { opacity: 0; transform: translateY(30px); transition: all 0.6s ease; }\n.animate-on-scroll.animated { opacity: 1; transform: translateY(0); }\n.animate-on-scroll.delay-1 { transition-delay: 0.1s; }\n.animate-on-scroll.delay-2 { transition-delay: 0.2s; }\n.animate-on-scroll.delay-3 { transition-delay: 0.3s; }\n.animate-on-scroll.delay-4 { transition-delay: 0.4s; }\n.animate-on-scroll.delay-5 { transition-delay: 0.5s; }\n.animate-on-scroll.delay-6 { transition-delay: 0.6s; }\n";
var JS_CONTENT = "/* HNH API Client \\u2014 Wired to live hnh.brainsait.org APIs */\\nconst API_BASE = 'https://hnh.brainsait.org/api';\\n\\nconst HNH = {\\n  // Language management\\n  _lang: localStorage.getItem('hnh_lang') || 'ar',\\n  currentLang() { return this._lang; },\\n  setLang(lang) {\\n    this._lang = lang;\\n    localStorage.setItem('hnh_lang', lang);\\n    document.documentElement.lang = lang;\\n    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';\\n    document.querySelectorAll('[data-i18n]').forEach(el => {\\n      const key = el.getAttribute('data-i18n');\\n      if (I18N[lang] && I18N[lang][key]) el.textContent = I18N[lang][key];\\n    });\\n  },\\n\\n  // API fetcher with error handling\\n  async api(path, opts = {}) {\\n    try {\\n      const url = \`\${API_BASE}\${path}\`;\\n      const res = await fetch(url, {\\n        headers: { 'Content-Type': 'application/json', ...opts.headers },\\n        ...opts\\n      });\\n      const data = await res.json();\\n      if (!res.ok) throw new Error(data.error || \`HTTP \${res.status}\`);\\n      return data;\\n    } catch (err) {\\n      console.error(\`API \${path}:\`, err);\\n      throw err;\\n    }\\n  },\\n\\n  // GET helpers\\n  async getStats() { return this.api('/stats'); },\\n  async getBranches() { return this.api('/branches'); },\\n  async getProviders(params = '') { return this.api(\`/providers\${params}\`); },\\n  async getPatients(params = '') { return this.api(\`/patients\${params}\`); },\\n  async getAppointments(params = '') { return this.api(\`/appointments\${params}\`); },\\n  async getClaims(params = '') { return this.api(\`/claims\${params}\`); },\\n\\n  // POST helpers\\n  async createPatient(data) {\\n    return this.api('/patients', { method: 'POST', body: JSON.stringify(data) });\\n  },\\n  async createAppointment(data) {\\n    return this.api('/appointments', { method: 'POST', body: JSON.stringify(data) });\\n  },\\n\\n  // NPHIES integration\\n  async checkEligibility(memberId, payer) {\\n    return this.api('/nphies/eligibility', {\\n      method: 'POST',\\n      body: JSON.stringify({ member_id: memberId, payer })\\n    });\\n  },\\n\\n  // Toast notification\\n  showToast(msg, type = 'success') {\\n    let t = document.querySelector('.toast');\\n    if (!t) { t = document.createElement('div'); t.className = 'toast'; document.body.appendChild(t); }\\n    t.textContent = msg;\\n    t.className = \`toast \${type} show\`;\\n    setTimeout(() => t.classList.remove('show'), 3500);\\n  }\\n};\\n\\n// i18n strings\\nconst I18N = {\\n  ar: {\\n    'nav.home': '\\u0627\\u0644\\u0631\\u0626\\u064a\\u0633\\u064a\\u0629', 'nav.about': '\\u0639\\u0646 \\u0627\\u0644\\u0645\\u062c\\u0645\\u0648\\u0639\\u0629', 'nav.departments': '\\u0627\\u0644\\u0623\\u0642\\u0633\\u0627\\u0645 \\u0627\\u0644\\u0637\\u0628\\u064a\\u0629',\\n    'nav.doctors': '\\u0623\\u0637\\u0628\\u0627\\u0624\\u0646\\u0627', 'nav.branches': '\\u0641\\u0631\\u0648\\u0639\\u0646\\u0627', 'nav.contact': '\\u0627\\u062a\\u0635\\u0644 \\u0628\\u0646\\u0627',\\n    'nav.blog': '\\u0627\\u0644\\u0645\\u062f\\u0648\\u0646\\u0629', 'nav.achievements': '\\u0627\\u0644\\u0625\\u0646\\u062c\\u0627\\u0632\\u0627\\u062a', 'nav.academy': '\\u0623\\u0643\\u0627\\u062f\\u064a\\u0645\\u064a\\u0629 \\u0627\\u0644\\u062d\\u064a\\u0627\\u0629',\\n    'nav.careers': '\\u0627\\u0644\\u062a\\u0648\\u0638\\u064a\\u0641', 'nav.offers': '\\u0627\\u0644\\u0639\\u0631\\u0648\\u0636', 'nav.book': '\\u0627\\u062d\\u062c\\u0632 \\u0645\\u0648\\u0639\\u062f',\\n    'cta.title': '\\u0635\\u062d\\u062a\\u0643 \\u0623\\u0648\\u0644\\u0627\\u064b', 'cta.subtitle': '\\u0627\\u062d\\u062c\\u0632 \\u0645\\u0648\\u0639\\u062f\\u0643 \\u0627\\u0644\\u0622\\u0646 \\u0648\\u0627\\u062d\\u0635\\u0644 \\u0639\\u0644\\u0649 \\u0623\\u0641\\u0636\\u0644 \\u0631\\u0639\\u0627\\u064a\\u0629 \\u0637\\u0628\\u064a\\u0629',\\n    'cta.bookBtn': '\\u0627\\u062d\\u062c\\u0632 \\u0645\\u0648\\u0639\\u062f', 'cta.callBtn': '\\u0627\\u062a\\u0635\\u0644 \\u0628\\u0646\\u0627',\\n    'departments.title': '\\u0627\\u0644\\u0623\\u0642\\u0633\\u0627\\u0645 \\u0627\\u0644\\u0637\\u0628\\u064a\\u0629', 'doctors.title': '\\u0623\\u0637\\u0628\\u0627\\u0624\\u0646\\u0627',\\n    'branches.title': '\\u0641\\u0631\\u0648\\u0639\\u0646\\u0627', 'contact.title': '\\u0627\\u062a\\u0635\\u0644 \\u0628\\u0646\\u0627',\\n    'loading': '\\u062c\\u0627\\u0631\\u064a \\u0627\\u0644\\u062a\\u062d\\u0645\\u064a\\u0644...', 'noData': '\\u0644\\u0627 \\u062a\\u0648\\u062c\\u062f \\u0628\\u064a\\u0627\\u0646\\u0627\\u062a',\\n    'form.name': '\\u0627\\u0644\\u0627\\u0633\\u0645 \\u0627\\u0644\\u0643\\u0627\\u0645\\u0644', 'form.email': '\\u0627\\u0644\\u0628\\u0631\\u064a\\u062f \\u0627\\u0644\\u0625\\u0644\\u0643\\u062a\\u0631\\u0648\\u0646\\u064a', 'form.phone': '\\u0631\\u0642\\u0645 \\u0627\\u0644\\u062c\\u0648\\u0627\\u0644',\\n    'form.branch': '\\u0627\\u0644\\u0641\\u0631\\u0639', 'form.message': '\\u0631\\u0633\\u0627\\u0644\\u062a\\u0643', 'form.submit': '\\u0625\\u0631\\u0633\\u0627\\u0644 \\u0627\\u0644\\u0631\\u0633\\u0627\\u0644\\u0629',\\n    'form.select': '\\u0627\\u062e\\u062a\\u0631', 'form.success': '\\u062a\\u0645 \\u0625\\u0631\\u0633\\u0627\\u0644 \\u0631\\u0633\\u0627\\u0644\\u062a\\u0643 \\u0628\\u0646\\u062c\\u0627\\u062d! \\u0633\\u0646\\u062a\\u0648\\u0627\\u0635\\u0644 \\u0645\\u0639\\u0643 \\u0642\\u0631\\u064a\\u0628\\u0627\\u064b.',\\n    'form.appointment.success': '\\u062a\\u0645 \\u062d\\u062c\\u0632 \\u0645\\u0648\\u0639\\u062f\\u0643 \\u0628\\u0646\\u062c\\u0627\\u062d!',\\n  },\\n  en: {\\n    'nav.home': 'Home', 'nav.about': 'About', 'nav.departments': 'Departments',\\n    'nav.doctors': 'Doctors', 'nav.branches': 'Branches', 'nav.contact': 'Contact',\\n    'nav.blog': 'Blog', 'nav.achievements': 'Achievements', 'nav.academy': 'Life Academy',\\n    'nav.careers': 'Careers', 'nav.offers': 'Offers', 'nav.book': 'Book Appointment',\\n    'cta.title': 'Your Health First', 'cta.subtitle': 'Book your appointment now and get the best medical care',\\n    'cta.bookBtn': 'Book Appointment', 'cta.callBtn': 'Call Us',\\n    'departments.title': 'Medical Departments', 'doctors.title': 'Our Doctors',\\n    'branches.title': 'Our Branches', 'contact.title': 'Contact Us',\\n    'loading': 'Loading...', 'noData': 'No data available',\\n    'form.name': 'Full Name', 'form.email': 'Email', 'form.phone': 'Phone',\\n    'form.branch': 'Branch', 'form.message': 'Your Message', 'form.submit': 'Send Message',\\n    'form.select': 'Select', 'form.success': 'Your message has been sent successfully!',\\n    'form.appointment.success': 'Your appointment has been booked successfully!',\\n  }\\n};\\n\\n// Scroll animations observer\\ndocument.addEventListener('DOMContentLoaded', () => {\\n  const obs = new IntersectionObserver(entries => {\\n    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('animated'); obs.unobserve(e.target); } });\\n  }, { threshold: 0.1 });\\n  document.querySelectorAll('.animate-on-scroll').forEach(el => obs.observe(el));\\n\\n  // Header scroll\\n  window.addEventListener('scroll', () => {\\n    document.querySelector('.header')?.classList.toggle('scrolled', window.scrollY > 50);\\n    const bt = document.querySelector('.back-top');\\n    if (bt) bt.classList.toggle('show', window.scrollY > 400);\\n  });\\n\\n  // Mobile toggle\\n  document.querySelector('.mobile-toggle')?.addEventListener('click', () => {\\n    document.querySelector('.nav')?.classList.toggle('open');\\n  });\\n\\n  // Set initial lang\\n  HNH.setLang(HNH._lang);\\n});\\n";
function servePage(req) {
  const url = new URL(req.url);
  const lang = url.searchParams.get("lang") || "ar";
  const isAr = lang === "ar";
  const L = lang;
  const A = isAr;
  const dir = A ? "rtl" : "ltr";

  // Serve CSS
  if (url.pathname === "/css/style.css") {
    return new Response(CSS_CONTENT, {
      headers: { "Content-Type": "text/css; charset=utf-8", "Cache-Control": "public, max-age=86400" }
    });
  }
  // Serve JS
  if (url.pathname === "/js/common.js") {
    return new Response(JS_CONTENT, {
      headers: { "Content-Type": "application/javascript; charset=utf-8", "Cache-Control": "public, max-age=86400" }
    });
  }

  const t = (ar, en) => A ? ar : en;
  const html = \`<!DOCTYPE html>
<html lang="\${L}" dir="\${dir}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>\${t('مستشفى الحياة الوطني | HNH Portal', 'Hayat National Hospital | HNH Portal')}</title>
<meta name="description" content="\${t('مجموعة مستشفيات الحياة الوطني — BrainSAIT Healthcare OS', 'Hayat National Hospital Group — BrainSAIT Healthcare OS')}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Tajawal:wght@300;400;500;700;800;900&display=swap" rel="stylesheet">
<style>/* HNH Premium Design System — API-Integrated */
:root {
  --primary: #0066CC;
  --primary-dark: #004499;
  --primary-light: #3388DD;
  --navy: #1A2B4A;
  --navy-light: #2D4470;
  --accent: #C9A84C;
  --accent-light: #E0C97A;
  --success: #10B981;
  --danger: #EF4444;
  --warning: #F59E0B;
  --text: #1A2B4A;
  --text-light: #6B7A94;
  --bg: #FFFFFF;
  --bg-light: #F8F9FC;
  --off-white: #F1F3F8;
  --border: #E2E8F0;
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.08);
  --shadow-md: 0 4px 12px rgba(0,0,0,0.1);
  --shadow-lg: 0 8px 30px rgba(0,0,0,0.12);
  --shadow-xl: 0 20px 60px rgba(0,0,0,0.15);
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 20px;
  --radius-xl: 28px;
  --radius-full: 9999px;
  --gradient-primary: linear-gradient(135deg, #0066CC, #1A2B4A);
  --gradient-accent: linear-gradient(135deg, #C9A84C, #E0C97A);
  --gradient-mesh: radial-gradient(ellipse at 20% 50%, rgba(0,102,204,0.08), transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(201,168,76,0.06), transparent 50%);
  --font-ar: 'Tajawal', sans-serif;
  --font-en: 'Inter', sans-serif;
}
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body { font-family: var(--font-ar); color: var(--text); background: var(--bg); line-height: 1.7; overflow-x: hidden; }
[dir="ltr"] body { font-family: var(--font-en); }
.container { max-width: 1240px; margin: 0 auto; padding: 0 24px; }
/* Header */
.header { position: fixed; top: 0; left: 0; right: 0; z-index: 1000; transition: all 0.4s ease; padding: 16px 0; }
.header.scrolled { background: rgba(255,255,255,0.92); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); box-shadow: var(--shadow-md); padding: 10px 0; }
.header-inner { display: flex; align-items: center; justify-content: space-between; }
.logo { display: flex; align-items: center; gap: 12px; text-decoration: none; }
.logo-icon { width: 44px; height: 44px; background: var(--gradient-primary); border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; }
.logo-text { font-size: 1.1rem; font-weight: 700; color: var(--navy); }
.logo-text small { display: block; font-size: 0.7rem; font-weight: 400; color: var(--text-light); }
.nav { display: flex; align-items: center; gap: 28px; }
.nav a { text-decoration: none; color: var(--text); font-weight: 500; font-size: 0.95rem; transition: color 0.3s; }
.nav a:hover { color: var(--primary); }
.nav-cta { background: var(--gradient-primary); color: white !important; padding: 10px 24px; border-radius: var(--radius-full); font-weight: 600 !important; }
.nav-cta:hover { opacity: 0.9; }
.lang-btn { background: var(--off-white); border: 1px solid var(--border); padding: 6px 14px; border-radius: var(--radius-full); cursor: pointer; font-size: 0.85rem; font-weight: 600; color: var(--navy); }
.mobile-toggle { display: none; background: none; border: none; cursor: pointer; padding: 8px; }
.mobile-toggle span { display: block; width: 24px; height: 2px; background: var(--navy); margin: 5px 0; transition: 0.3s; }
/* Hero */
.hero { min-height: 100vh; display: flex; align-items: center; position: relative; overflow: hidden; background: var(--gradient-mesh), var(--bg-light); padding-top: 80px; }
.hero::before { content: ''; position: absolute; top: -50%; right: -20%; width: 800px; height: 800px; background: radial-gradient(circle, rgba(0,102,204,0.06) 0%, transparent 70%); animation: float 20s infinite ease-in-out; }
.hero::after { content: ''; position: absolute; bottom: -30%; left: -10%; width: 600px; height: 600px; background: radial-gradient(circle, rgba(201,168,76,0.05) 0%, transparent 70%); animation: float 25s infinite ease-in-out reverse; }
@keyframes float { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(30px, -40px); } }
.hero-content { position: relative; z-index: 2; }
.hero h1 { font-size: clamp(2.2rem, 5vw, 3.5rem); font-weight: 800; color: var(--navy); line-height: 1.2; margin-bottom: 20px; }
.hero h1 .accent { background: var(--gradient-accent); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
.hero p { font-size: 1.15rem; color: var(--text-light); max-width: 560px; margin-bottom: 32px; }
.hero-buttons { display: flex; gap: 16px; flex-wrap: wrap; }
/* Stats */
.stats-bar { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; margin-top: 48px; }
.stat-card { background: white; border-radius: var(--radius-lg); padding: 24px; text-align: center; box-shadow: var(--shadow-sm); border: 1px solid var(--border); transition: all 0.4s; }
.stat-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-lg); }
.stat-number { font-size: 2rem; font-weight: 800; background: var(--gradient-primary); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
.stat-number.live { position: relative; }
.stat-number.live::after { content: ''; display: inline-block; width: 8px; height: 8px; background: var(--success); border-radius: 50%; margin-right: 6px; animation: pulse 2s infinite; vertical-align: middle; }
@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
.stat-label { font-size: 0.85rem; color: var(--text-light); margin-top: 4px; }
/* Sections */
.section { padding: 80px 0; }
.section.bg-light { background: var(--bg-light); }
.section-header { text-align: center; margin-bottom: 48px; }
.section-header h2 { font-size: 2rem; font-weight: 800; color: var(--navy); margin-bottom: 8px; }
.section-header p { color: var(--text-light); font-size: 1.05rem; }
/* Grids */
.grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; }
.grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
.grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
/* Cards */
.card { background: white; border-radius: var(--radius-lg); padding: 28px; box-shadow: var(--shadow-sm); border: 1px solid var(--border); transition: all 0.4s; }
.card:hover { box-shadow: var(--shadow-lg); transform: translateY(-2px); }
.dept-card { text-align: center; padding: 32px 20px; }
.dept-icon { width: 56px; height: 56px; background: var(--gradient-primary); border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; color: white; }
.dept-icon svg { width: 28px; height: 28px; fill: currentColor; }
.doctor-card { text-align: center; padding: 32px 20px; }
.doctor-photo { width: 80px; height: 80px; border-radius: 50%; background: var(--gradient-accent); display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; font-size: 1.8rem; font-weight: 700; color: var(--navy); }
.specialty { color: var(--primary); font-weight: 600; font-size: 0.9rem; margin-bottom: 4px; }
.branch-tag { color: var(--text-light); font-size: 0.8rem; background: var(--off-white); display: inline-block; padding: 3px 12px; border-radius: var(--radius-full); margin-bottom: 12px; }
.branch-card { padding: 0; overflow: hidden; }
.branch-icon { width: 48px; height: 48px; background: var(--gradient-accent); border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; }
.branch-info { display: flex; gap: 16px; margin: 12px 0; font-size: 0.9rem; color: var(--text-light); }
/* Buttons */
.btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; padding: 12px 28px; border-radius: var(--radius-full); font-weight: 600; font-size: 0.95rem; text-decoration: none; border: none; cursor: pointer; transition: all 0.3s; }
.btn-primary { background: var(--gradient-primary); color: white; }
.btn-primary:hover { opacity: 0.9; transform: translateY(-1px); }
.btn-accent { background: var(--gradient-accent); color: var(--navy); }
.btn-outline { background: transparent; border: 2px solid var(--primary); color: var(--primary); }
.btn-outline:hover { background: var(--primary); color: white; }
.btn-white { background: white; color: var(--navy); }
.btn-sm { padding: 8px 20px; font-size: 0.85rem; }
.btn-lg { padding: 16px 36px; font-size: 1.05rem; }
/* Filter Bar */
.filter-bar { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 32px; align-items: center; }
.filter-bar input, .filter-bar select { padding: 10px 16px; border: 1px solid var(--border); border-radius: var(--radius-full); font-size: 0.9rem; background: white; color: var(--text); min-width: 200px; }
.filter-bar input:focus, .filter-bar select:focus { outline: none; border-color: var(--primary); box-shadow: 0 0 0 3px rgba(0,102,204,0.1); }
.filter-chip { padding: 8px 20px; border: 1px solid var(--border); border-radius: var(--radius-full); background: white; cursor: pointer; font-size: 0.85rem; font-weight: 500; transition: all 0.3s; }
.filter-chip.active, .filter-chip:hover { background: var(--primary); color: white; border-color: var(--primary); }
/* Forms */
.form-group { margin-bottom: 20px; }
.form-group label { display: block; font-weight: 600; font-size: 0.9rem; margin-bottom: 6px; color: var(--navy); }
.form-group input, .form-group select, .form-group textarea { width: 100%; padding: 12px 16px; border: 1px solid var(--border); border-radius: var(--radius-md); font-size: 0.95rem; transition: all 0.3s; font-family: inherit; }
.form-group input:focus, .form-group select:focus, .form-group textarea:focus { outline: none; border-color: var(--primary); box-shadow: 0 0 0 3px rgba(0,102,204,0.1); }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
/* Toast */
.toast { position: fixed; bottom: 24px; right: 24px; padding: 16px 24px; border-radius: var(--radius-md); color: white; font-weight: 600; z-index: 9999; transform: translateY(100px); opacity: 0; transition: all 0.4s; }
.toast.show { transform: translateY(0); opacity: 1; }
.toast.success { background: var(--success); }
.toast.error { background: var(--danger); }
/* CTA Section */
.cta-section { background: var(--gradient-primary); padding: 80px 0; text-align: center; position: relative; overflow: hidden; }
.cta-section::before { content: ''; position: absolute; inset: 0; background: var(--gradient-mesh); opacity: 0.3; }
.cta-section h2 { font-size: 2rem; color: white; margin-bottom: 12px; position: relative; z-index: 1; }
.cta-section p { color: rgba(255,255,255,0.8); font-size: 1.1rem; margin-bottom: 32px; position: relative; z-index: 1; }
.cta-buttons { display: flex; gap: 16px; justify-content: center; position: relative; z-index: 1; }
/* Page Hero */
.page-hero { background: var(--gradient-primary); padding: 140px 0 60px; color: white; position: relative; }
.page-hero h1 { font-size: 2.5rem; font-weight: 800; margin-bottom: 8px; }
.page-hero p { color: rgba(255,255,255,0.7); }
.breadcrumb { display: flex; gap: 8px; font-size: 0.85rem; color: rgba(255,255,255,0.6); margin-bottom: 16px; }
.breadcrumb a { color: rgba(255,255,255,0.6); text-decoration: none; }
.breadcrumb a:hover { color: var(--accent); }
/* Loading */
.loading { display: flex; align-items: center; justify-content: center; padding: 40px; }
.spinner { width: 32px; height: 32px; border: 3px solid var(--border); border-top-color: var(--primary); border-radius: 50%; animation: spin 0.8s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
/* Contact Grid */
.contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; }
.contact-info-card { display: flex; gap: 16px; padding: 20px; background: var(--bg-light); border-radius: var(--radius-md); margin-bottom: 16px; }
.icon-box { width: 48px; height: 48px; background: var(--gradient-primary); border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.icon-box svg { width: 22px; height: 22px; fill: white; }
/* Achievement Cards */
.achievement-card { padding: 32px; text-align: center; }
.achievement-card h4 { margin-bottom: 8px; }
/* Blog Cards */
.blog-card { border-radius: var(--radius-lg); overflow: hidden; box-shadow: var(--shadow-sm); border: 1px solid var(--border); }
.blog-img { height: 200px; background: var(--gradient-primary); display: flex; align-items: center; justify-content: center; }
.blog-img svg { width: 48px; height: 48px; fill: rgba(255,255,255,0.3); }
.blog-body { padding: 24px; }
.blog-date { font-size: 0.8rem; color: var(--text-light); margin-bottom: 8px; }
.read-more { color: var(--primary); font-weight: 600; text-decoration: none; font-size: 0.9rem; }
/* Offer Cards */
.offer-card { border-radius: var(--radius-lg); overflow: hidden; box-shadow: var(--shadow-sm); border: 1px solid var(--border); position: relative; }
.offer-badge { position: absolute; top: 16px; right: 16px; background: var(--accent); color: var(--navy); padding: 4px 14px; border-radius: var(--radius-full); font-weight: 700; font-size: 0.85rem; z-index: 2; }
.offer-img { height: 180px; background: var(--gradient-primary); display: flex; align-items: center; justify-content: center; }
.offer-img svg { width: 48px; height: 48px; fill: rgba(255,255,255,0.3); }
.offer-body { padding: 20px; }
.offer-branch { font-size: 0.8rem; color: var(--primary); font-weight: 600; margin-bottom: 4px; }
/* Career Cards */
.career-card { padding: 28px; position: relative; }
.career-branch { display: inline-block; background: var(--off-white); color: var(--primary); padding: 4px 14px; border-radius: var(--radius-full); font-size: 0.8rem; font-weight: 600; margin-bottom: 12px; }
.career-tags { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 12px; }
.tag { padding: 4px 12px; background: var(--off-white); border-radius: var(--radius-full); font-size: 0.8rem; color: var(--text-light); }
/* Course Cards */
.course-card { border-radius: var(--radius-lg); overflow: hidden; box-shadow: var(--shadow-sm); border: 1px solid var(--border); }
.course-header { background: var(--gradient-primary); padding: 24px; }
.course-body { padding: 24px; }
.course-meta { display: flex; gap: 16px; margin-top: 12px; font-size: 0.85rem; color: var(--text-light); }
/* Value Cards */
.value-card { text-align: center; padding: 32px 20px; }
.value-icon { width: 56px; height: 56px; background: linear-gradient(135deg, rgba(0,102,204,0.1), rgba(0,102,204,0.05)); border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; }
.value-icon svg { width: 28px; height: 28px; fill: var(--primary); }
.gold-line { width: 60px; height: 3px; background: var(--gradient-accent); margin: 12px 0 20px; border-radius: 2px; }
.about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center; }
.about-image { border-radius: var(--radius-xl); overflow: hidden; aspect-ratio: 4/3; background: var(--gradient-primary); display: flex; align-items: center; justify-content: center; }
.about-image svg { width: 120px; height: 120px; fill: rgba(255,255,255,0.15); }
/* WhatsApp Float */
.wa-float { position: fixed; bottom: 24px; left: 24px; width: 56px; height: 56px; background: #25D366; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 16px rgba(37,211,102,0.4); z-index: 999; transition: transform 0.3s; }
.wa-float:hover { transform: scale(1.1); }
.wa-float svg { width: 28px; height: 28px; fill: white; }
/* Back to top */
.back-top { position: fixed; bottom: 24px; right: 24px; width: 44px; height: 44px; background: var(--navy); border-radius: 50%; display: flex; align-items: center; justify-content: center; z-index: 999; opacity: 0; transform: translateY(20px); transition: all 0.3s; cursor: pointer; border: none; }
.back-top.show { opacity: 1; transform: translateY(0); }
.back-top svg { width: 20px; height: 20px; fill: white; }
/* API Status Badge */
.api-status { display: inline-flex; align-items: center; gap: 6px; padding: 4px 12px; border-radius: var(--radius-full); font-size: 0.75rem; font-weight: 600; }
.api-status.live { background: rgba(16,185,129,0.1); color: var(--success); }
.api-status.live::before { content: ''; width: 6px; height: 6px; background: var(--success); border-radius: 50%; animation: pulse 2s infinite; }
/* Footer */
.footer { background: var(--navy); color: rgba(255,255,255,0.7); padding: 60px 0 24px; }
.footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 40px; margin-bottom: 40px; }
.footer h4 { color: white; font-size: 1rem; margin-bottom: 16px; }
.footer a { color: rgba(255,255,255,0.6); text-decoration: none; display: block; margin-bottom: 8px; font-size: 0.9rem; }
.footer a:hover { color: var(--accent); }
.footer-bottom { border-top: 1px solid rgba(255,255,255,0.1); padding-top: 24px; text-align: center; font-size: 0.85rem; }
/* Responsive */
@media (max-width: 1024px) {
  .grid-4 { grid-template-columns: repeat(2, 1fr); }
  .footer-grid { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 768px) {
  .nav { display: none; }
  .mobile-toggle { display: block; }
  .nav.open { display: flex; flex-direction: column; position: absolute; top: 100%; left: 0; right: 0; background: white; padding: 24px; box-shadow: var(--shadow-lg); gap: 16px; }
  .grid-2, .grid-3, .grid-4 { grid-template-columns: 1fr; }
  .stats-bar { grid-template-columns: repeat(2, 1fr); }
  .hero h1 { font-size: 2rem; }
  .contact-grid { grid-template-columns: 1fr; }
  .about-grid { grid-template-columns: 1fr; }
  .form-row { grid-template-columns: 1fr; }
  .footer-grid { grid-template-columns: 1fr; }
  .page-hero { padding: 120px 0 40px; }
  .page-hero h1 { font-size: 1.8rem; }
}
/* Animations */
.animate-on-scroll { opacity: 0; transform: translateY(30px); transition: all 0.6s ease; }
.animate-on-scroll.animated { opacity: 1; transform: translateY(0); }
.animate-on-scroll.delay-1 { transition-delay: 0.1s; }
.animate-on-scroll.delay-2 { transition-delay: 0.2s; }
.animate-on-scroll.delay-3 { transition-delay: 0.3s; }
.animate-on-scroll.delay-4 { transition-delay: 0.4s; }
.animate-on-scroll.delay-5 { transition-delay: 0.5s; }
.animate-on-scroll.delay-6 { transition-delay: 0.6s; }
</style>
<link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🏥</text></svg>">
</head>
<body>
<header class="header">
  <div class="container header-inner">
    <a href="/" class="logo">
      <div class="logo-icon"><svg viewBox="0 0 24 24" width="24" height="24" fill="white"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg></div>
      <div class="logo-text">\${t('الحياة الوطني', 'Hayat National')}<small>BrainSAIT Healthcare OS</small></div>
    </a>
    <nav class="nav" id="mainNav">
      <a href="/" data-i18n="nav.home">\${t('الرئيسية', 'Home')}</a>
      <a href="/departments" data-i18n="nav.departments">\${t('الأقسام الطبية', 'Departments')}</a>
      <a href="/doctors" data-i18n="nav.doctors">\${t('أطباؤنا', 'Doctors')}</a>
      <a href="/branches" data-i18n="nav.branches">\${t('فروعنا', 'Branches')}</a>
      <a href="/contact" data-i18n="nav.contact">\${t('اتصل بنا', 'Contact')}</a>
      <button class="lang-btn" onclick="HNH.setLang(HNH.currentLang()==='ar'?'en':'ar')">EN/عربي</button>
      <a href="/contact" class="nav-cta">\${t('احجز موعد', 'Book Now')}</a>
    </nav>
    <button class="mobile-toggle" aria-label="Menu"><span></span><span></span><span></span></button>
  </div>
</header>

<section class="hero">
  <div class="container">
    <div class="hero-content">
      <span class="api-status live">● \${t('بيانات حية', 'Live Data')}</span>
      <h1 style="margin-top:16px;">\${t('مجموعة مستشفيات<br>', 'Hospital Group<br>')}<span class="accent">\${t('الحياة الوطني', 'Hayat National')}</span></h1>
      <p>\${t('أكثر من 25 عاماً من التميز في الرعاية الصحية — نظام BrainSAIT Healthcare OS متصل بقاعدة البيانات الحية', 'Over 25 years of healthcare excellence — BrainSAIT Healthcare OS connected to live database')}</p>
      <div class="hero-buttons">
        <a href="/contact" class="btn btn-accent btn-lg">\${t('احجز موعدك الآن', 'Book Appointment')}</a>
        <a href="/departments" class="btn btn-outline btn-lg">\${t('تصفح الأقسام', 'Browse Departments')}</a>
      </div>
      <div class="stats-bar" id="liveStats">
        <div class="stat-card"><div class="stat-number live" id="statProviders">—</div><div class="stat-label">\${t('طبيب', 'Doctors')}</div></div>
        <div class="stat-card"><div class="stat-number live" id="statBranches">—</div><div class="stat-label">\${t('فروع', 'Branches')}</div></div>
        <div class="stat-card"><div class="stat-number live" id="statDepts">—</div><div class="stat-label">\${t('قسم طبي', 'Departments')}</div></div>
        <div class="stat-card"><div class="stat-number live" id="statBeds">—</div><div class="stat-label">\${t('سرير', 'Beds')}</div></div>
      </div>
    </div>
  </div>
</section>

<section class="section bg-white">
  <div class="container">
    <div class="section-header animate-on-scroll"><h2>\${t('الأقسام الطبية', 'Departments')}</h2><p>\${t('نغطي أكثر من 42 تخصصاً طبياً', 'Covering 42+ medical specialties')}</p></div>
    <div class="grid-4" id="deptGrid"><div class="loading"><div class="spinner"></div></div></div>
  </div>
</section>

<section class="section bg-light">
  <div class="container">
    <div class="section-header animate-on-scroll"><h2>\${t('فروعنا', 'Our Branches')}</h2><p>\${t('خمسة فروع في مختلف مناطق المملكة', '5 branches across the Kingdom')}</p></div>
    <div class="grid-3" id="branchesGrid"><div class="loading"><div class="spinner"></div></div></div>
  </div>
</section>

<section class="section bg-white">
  <div class="container">
    <div class="section-header animate-on-scroll"><h2>\${t('أطباؤنا', 'Our Doctors')}</h2><p>\${t('فريق من أمهر الأطباء', 'Expert medical team')}</p></div>
    <div class="grid-4" id="doctorsGrid"><div class="loading"><div class="spinner"></div></div></div>
  </div>
</section>

<section class="cta-section">
  <div class="container">
    <h2>\${t('صحتك أولاً', 'Your Health First')}</h2>
    <p>\${t('احجز موعدك الآن', 'Book your appointment now')}</p>
    <div class="cta-buttons">
      <a href="/contact" class="btn btn-accent btn-lg">\${t('احجز موعد', 'Book Now')}</a>
      <a href="tel:966920000094" class="btn btn-white btn-lg">\${t('اتصل بنا', 'Call Us')}</a>
    </div>
  </div>
</section>

<footer class="footer">
  <div class="container">
    <div class="footer-grid">
      <div><h4>\${t('مستشفى الحياة الوطني', 'Hayat National Hospital')}</h4><p style="margin-bottom:12px;">\${t('نظام BrainSAIT Healthcare OS المتصل بقاعدة البيانات الحية', 'BrainSAIT Healthcare OS connected to live database')}</p><span class="api-status live">● API Connected</span></div>
      <div><h4>\${t('روابط سريعة', 'Quick Links')}</h4><a href="/departments">\${t('الأقسام الطبية', 'Departments')}</a><a href="/doctors">\${t('أطباؤنا', 'Doctors')}</a><a href="/branches">\${t('فروعنا', 'Branches')}</a></div>
      <div><h4>\${t('تواصل معنا', 'Contact')}</h4><a href="tel:966920000094">+966920000094</a><a href="mailto:info@hayathospitals.com">info@hayathospitals.com</a></div>
    </div>
    <div class="footer-bottom"><p>© 2026 \${t('مستشفى الحياة الوطني', 'Hayat National Hospital')} — BrainSAIT Healthcare OS</p></div>
  </div>
</footer>

<a href="https://wa.me/966920000094" class="wa-float" target="_blank" rel="noopener"><svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492l4.624-1.47A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75c-2.115 0-4.142-.665-5.847-1.884l-.42-.279-2.746.874.874-2.746-.279-.42A9.713 9.713 0 012.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75z"/></svg></a>
<button class="back-top" onclick="window.scrollTo({top:0,behavior:'smooth'})"><svg viewBox="0 0 24 24"><path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/></svg></button>

<script>/* HNH API Client — Wired to live hnh.brainsait.org APIs */
const API_BASE = 'https://hnh.brainsait.org/api';

const HNH = {
  // Language management
  _lang: localStorage.getItem('hnh_lang') || 'ar',
  currentLang() { return this._lang; },
  setLang(lang) {
    this._lang = lang;
    localStorage.setItem('hnh_lang', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (I18N[lang] && I18N[lang][key]) el.textContent = I18N[lang][key];
    });
  },

  // API fetcher with error handling
  async api(path, opts = {}) {
    try {
      const url = \`\${API_BASE}\${path}\`;
      const res = await fetch(url, {
        headers: { 'Content-Type': 'application/json', ...opts.headers },
        ...opts
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || \`HTTP \${res.status}\`);
      return data;
    } catch (err) {
      console.error(\`API \${path}:\`, err);
      throw err;
    }
  },

  // GET helpers
  async getStats() { return this.api('/stats'); },
  async getBranches() { return this.api('/branches'); },
  async getProviders(params = '') { return this.api(\`/providers\${params}\`); },
  async getPatients(params = '') { return this.api(\`/patients\${params}\`); },
  async getAppointments(params = '') { return this.api(\`/appointments\${params}\`); },
  async getClaims(params = '') { return this.api(\`/claims\${params}\`); },

  // POST helpers
  async createPatient(data) {
    return this.api('/patients', { method: 'POST', body: JSON.stringify(data) });
  },
  async createAppointment(data) {
    return this.api('/appointments', { method: 'POST', body: JSON.stringify(data) });
  },

  // NPHIES integration
  async checkEligibility(memberId, payer) {
    return this.api('/nphies/eligibility', {
      method: 'POST',
      body: JSON.stringify({ member_id: memberId, payer })
    });
  },

  // Toast notification
  showToast(msg, type = 'success') {
    let t = document.querySelector('.toast');
    if (!t) { t = document.createElement('div'); t.className = 'toast'; document.body.appendChild(t); }
    t.textContent = msg;
    t.className = \`toast \${type} show\`;
    setTimeout(() => t.classList.remove('show'), 3500);
  }
};

// i18n strings
const I18N = {
  ar: {
    'nav.home': 'الرئيسية', 'nav.about': 'عن المجموعة', 'nav.departments': 'الأقسام الطبية',
    'nav.doctors': 'أطباؤنا', 'nav.branches': 'فروعنا', 'nav.contact': 'اتصل بنا',
    'nav.blog': 'المدونة', 'nav.achievements': 'الإنجازات', 'nav.academy': 'أكاديمية الحياة',
    'nav.careers': 'التوظيف', 'nav.offers': 'العروض', 'nav.book': 'احجز موعد',
    'cta.title': 'صحتك أولاً', 'cta.subtitle': 'احجز موعدك الآن واحصل على أفضل رعاية طبية',
    'cta.bookBtn': 'احجز موعد', 'cta.callBtn': 'اتصل بنا',
    'departments.title': 'الأقسام الطبية', 'doctors.title': 'أطباؤنا',
    'branches.title': 'فروعنا', 'contact.title': 'اتصل بنا',
    'loading': 'جاري التحميل...', 'noData': 'لا توجد بيانات',
    'form.name': 'الاسم الكامل', 'form.email': 'البريد الإلكتروني', 'form.phone': 'رقم الجوال',
    'form.branch': 'الفرع', 'form.message': 'رسالتك', 'form.submit': 'إرسال الرسالة',
    'form.select': 'اختر', 'form.success': 'تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.',
    'form.appointment.success': 'تم حجز موعدك بنجاح!',
  },
  en: {
    'nav.home': 'Home', 'nav.about': 'About', 'nav.departments': 'Departments',
    'nav.doctors': 'Doctors', 'nav.branches': 'Branches', 'nav.contact': 'Contact',
    'nav.blog': 'Blog', 'nav.achievements': 'Achievements', 'nav.academy': 'Life Academy',
    'nav.careers': 'Careers', 'nav.offers': 'Offers', 'nav.book': 'Book Appointment',
    'cta.title': 'Your Health First', 'cta.subtitle': 'Book your appointment now and get the best medical care',
    'cta.bookBtn': 'Book Appointment', 'cta.callBtn': 'Call Us',
    'departments.title': 'Medical Departments', 'doctors.title': 'Our Doctors',
    'branches.title': 'Our Branches', 'contact.title': 'Contact Us',
    'loading': 'Loading...', 'noData': 'No data available',
    'form.name': 'Full Name', 'form.email': 'Email', 'form.phone': 'Phone',
    'form.branch': 'Branch', 'form.message': 'Your Message', 'form.submit': 'Send Message',
    'form.select': 'Select', 'form.success': 'Your message has been sent successfully!',
    'form.appointment.success': 'Your appointment has been booked successfully!',
  }
};

// Scroll animations observer
document.addEventListener('DOMContentLoaded', () => {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('animated'); obs.unobserve(e.target); } });
  }, { threshold: 0.1 });
  document.querySelectorAll('.animate-on-scroll').forEach(el => obs.observe(el));

  // Header scroll
  window.addEventListener('scroll', () => {
    document.querySelector('.header')?.classList.toggle('scrolled', window.scrollY > 50);
    const bt = document.querySelector('.back-top');
    if (bt) bt.classList.toggle('show', window.scrollY > 400);
  });

  // Mobile toggle
  document.querySelector('.mobile-toggle')?.addEventListener('click', () => {
    document.querySelector('.nav')?.classList.toggle('open');
  });

  // Set initial lang
  HNH.setLang(HNH._lang);
});
</script>
<script>
const API_BASE = location.origin + '/api';
(async () => {
  try {
    const [statsRes, provRes, branchRes] = await Promise.all([
      fetch(API_BASE + '/stats').then(r => r.json()),
      fetch(API_BASE + '/providers').then(r => r.json()),
      fetch(API_BASE + '/branches').then(r => r.json())
    ]);
    const stats = statsRes.stats || {};
    const providers = provRes.providers || [];
    const branches = branchRes.branches || [];
    const l = HNH?.currentLang?.() || '${L}';
    // Stats
    document.getElementById('statProviders').textContent = (stats.total_providers || 0).toLocaleString();
    document.getElementById('statBranches').textContent = (stats.total_branches || 0).toLocaleString();
    document.getElementById('statDepts').textContent = (stats.total_departments || 0).toLocaleString();
    document.getElementById('statBeds').textContent = (stats.total_beds || 0).toLocaleString();
    // Departments
    const depts = [...new Set(providers.map(p => p.department).filter(Boolean))].slice(0, 8);
    document.getElementById('deptGrid').innerHTML = depts.map((d, i) => {
      const count = providers.filter(p => p.department === d).length;
      return '<div class="card dept-card animate-on-scroll delay-' + ((i%4)+1) + '"><div class="dept-icon"><svg viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg></div><h4>' + d + '</h4><p style="font-size:0.85rem;color:var(--text-light);">' + count + ' ${t('طبيب', 'doctors')}</p></div>';
    }).join('');
    // Branches
    document.getElementById('branchesGrid').innerHTML = branches.map((b, i) => {
      const name = l === 'ar' ? b.name_ar : b.name_en;
      const city = l === 'ar' ? b.city_ar : b.city_en;
      return '<div class="card branch-card animate-on-scroll delay-' + ((i%3)+1) + '" style="padding:0;overflow:hidden;"><div style="background:var(--gradient-primary);padding:32px;color:white;"><div class="branch-icon" style="background:rgba(255,255,255,0.2);margin-bottom:12px;"><svg viewBox="0 0 24 24" width="28" height="28" fill="white"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg></div><h3 style="color:white;margin-bottom:4px;">' + name + '</h3><span style="color:rgba(255,255,255,0.7);font-size:0.9rem;">' + city + '</span></div><div style="padding:24px;"><a href="/contact" class="btn btn-primary btn-sm">${t('حجز موعد', 'Book Appointment')}</a></div></div>';
    }).join('');
    // Doctors
    document.getElementById('doctorsGrid').innerHTML = providers.slice(0, 8).map((d, i) => {
      const name = l === 'ar' ? d.name_ar : d.name_en;
      const initial = name.split(' ').pop().charAt(0);
      return '<div class="card doctor-card animate-on-scroll delay-' + ((i%4)+1) + '"><div class="doctor-photo">' + initial + '</div><h4>' + name + '</h4><div class="specialty">' + d.specialty + '</div><div class="branch-tag">' + d.branch + '</div><a href="/contact" class="btn btn-primary btn-sm">${t('احجز الآن', 'Book Now')}</a></div>';
    }).join('');
    // Re-observe animations
    const obs = new IntersectionObserver(entries => { entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('animated'); obs.unobserve(e.target); } }); }, { threshold: 0.1 });
    document.querySelectorAll('.animate-on-scroll').forEach(el => obs.observe(el));
  } catch(e) { console.error('Data load error:', e); }
})();
</script>
</body>
</html>`;
  return new Response(html, {
    headers: { "Content-Type": "text/html; charset=utf-8" }
  });
}
__name(servePage, "servePage");

// src/index.js
var router = new Router();
router.get("/api/health", (_, env) => json({ status: "healthy", version: CONFIG.VERSION, name: CONFIG.NAME }));
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
router.get("/api/providers", async (req, env, ctx, p, url) => {
  if (!url) url = new URL(req.url);
  const branch = url?.searchParams?.get("branch") || "";
  const dept = url?.searchParams?.get("department") || "";
  let list = await getProviders(env);
  if (branch) list = list.filter((p2) => p2.branch === branch || p2.branch_id === branch);
  if (dept) list = list.filter((p2) => p2.department === dept || p2.department_id === dept);
  return json({ success: true, providers: list, total: list.length });
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
router.get("/api/claims", (req, env, ctx, p, url) => getClaims(req, env, ctx, p, url));
router.get("/api/claims/([^/]+)", (req, env, ctx, p) => getClaim(req, env, ctx, p));
router.post("/api/claims", (req, env) => createClaim(req, env));
router.post("/api/claims/([^/]+)/submit", (req, env, ctx, p) => submitClaimToNPHIES(req, env, ctx, p));
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
router.post("/api/voice/speak", (req, env) => handleVoiceSpeak(req, env));
router.post("/api/voice/chat", (req, env) => handleVoiceChat(req, env));
router.get("/api/voice/voices", () => handleVoiceVoices());
router.get("/", (req, env, ctx, p, url) => servePage(req));
router.get("/(.*)", (req, env, ctx, p, url) => servePage(req));
var index_default = {
  async fetch(request, env, ctx) {
    if (request.method === "OPTIONS") return handleCors();
    const ip = request.headers.get("CF-Connecting-IP") || "unknown";
    if (!rateLimit(ip)) {
      return new Response(JSON.stringify({ error: "Rate limit exceeded" }), {
        status: 429,
        headers: { "Content-Type": "application/json", "Retry-After": "60", ...SECURITY_HEADERS }
      });
    }
    try {
      const response = await router.match(request, env, ctx);
      if (response && typeof response === "object" && response.headers) {
        const corsHeaders = {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PATCH, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization"
        };
        for (const [k, v] of Object.entries(corsHeaders)) {
          if (!response.headers.has(k)) response.headers.set(k, v);
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
  }
};
export {
  index_default as default
};
//# sourceMappingURL=index.js.map
