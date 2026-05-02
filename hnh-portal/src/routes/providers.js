export const providers = [
  {
    id: 'P001',
    name_ar: 'د. محمد بكري',
    name_en: 'Dr. Mohamed Bakry',
    department_id: 'surgery',
    specializations: ['جراحة تجميلية', 'جراحة الوجه والفكين'],
    specializations_en: ['Plastic Surgery', 'Maxillofacial Surgery'],
    languages: ['ar', 'en'],
    branch_id: 'R001',
    consultation_fee: 500,
    education: [{ degree: 'MD', institution: 'Cairo University', year: 2005 }],
    experience_years: 19,
    rating: 4.9,
    bio_ar: 'استشاري جراحة التجميل والترميم، خبرة واسعة في عمليات الوجه والفكين.',
    bio_en: 'Consultant Plastic and Reconstructive Surgeon with extensive experience in facial surgery.',
  },
  {
    id: 'P002',
    name_ar: 'د. عبدالله القحطاني',
    name_en: 'Dr. Abdullah Al-Qahtani',
    department_id: 'cardiology',
    specializations: ['قسطرة قلبية', 'أمراض القلب التداخلية'],
    specializations_en: ['Cardiac Catheterization', 'Interventional Cardiology'],
    languages: ['ar', 'en'],
    branch_id: 'R001',
    consultation_fee: 400,
    education: [{ degree: 'MD', institution: 'King Saud University', year: 2008 }],
    experience_years: 16,
    rating: 4.7,
    bio_ar: 'استشاري أمراض القلب والقسطرة، رئيس قسم القلب بمستشفى الرياض.',
    bio_en: 'Consultant Cardiologist and Interventionalist, Head of Cardiology at Riyadh branch.',
  },
  {
    id: 'P003',
    name_ar: 'د. فاطمة الزهراني',
    name_en: 'Dr. Fatima Al-Zahrani',
    department_id: 'obgyn',
    specializations: ['نساء وولادة', 'عقم وأطفال أنابيب'],
    specializations_en: ['Obstetrics & Gynecology', 'Infertility & IVF'],
    languages: ['ar', 'en'],
    branch_id: 'R001',
    consultation_fee: 350,
    education: [{ degree: 'MD', institution: 'King Abdulaziz University', year: 2010 }],
    experience_years: 14,
    rating: 4.8,
    bio_ar: 'استشارية نساء وولادة، متخصصة في علاج العقم وأطفال الأنابيب.',
    bio_en: 'Consultant OB/GYN specializing in infertility treatment and IVF.',
  },
  {
    id: 'P004',
    name_ar: 'د. خالد الشهراني',
    name_en: 'Dr. Khaled Al-Shahrani',
    department_id: 'orthopedics',
    specializations: ['جراحة العظام', 'جراحة المفاصل', 'منظار المفاصل'],
    specializations_en: ['Orthopedic Surgery', 'Joint Surgery', 'Arthroscopy'],
    languages: ['ar', 'en'],
    branch_id: 'R001',
    consultation_fee: 400,
    education: [{ degree: 'MD', institution: 'King Faisal University', year: 2009 }],
    experience_years: 15,
    rating: 4.6,
    bio_ar: 'استشاري جراحة العظام والمفاصل، خبرة في عمليات المنظار والتبديل.',
    bio_en: 'Consultant Orthopedic and Joint Surgeon, experienced in arthroscopy and joint replacement.',
  },
  {
    id: 'P005',
    name_ar: 'د. سارة الحربي',
    name_en: 'Dr. Sarah Al-Harbi',
    department_id: 'pediatrics',
    specializations: ['طب الأطفال', 'حديثي الولادة'],
    specializations_en: ['Pediatrics', 'Neonatology'],
    languages: ['ar', 'en'],
    branch_id: 'J001',
    consultation_fee: 250,
    education: [{ degree: 'MD', institution: 'Umm Al-Qura University', year: 2012 }],
    experience_years: 12,
    rating: 4.5,
    bio_ar: 'استشارية طب أطفال وحديثي الولادة، رئيسة قسم الأطفال بجازان.',
    bio_en: 'Consultant Pediatrician and Neonatologist, Head of Pediatrics at Jazan.',
  },
  {
    id: 'P006',
    name_ar: 'د. أحمد المطيري',
    name_en: 'Dr. Ahmed Al-Mutairi',
    department_id: 'neurology',
    specializations: ['طب الأعصاب', 'الصرع', 'الصداع النصفي'],
    specializations_en: ['Neurology', 'Epilepsy', 'Migraine'],
    languages: ['ar', 'en'],
    branch_id: 'M001',
    consultation_fee: 350,
    education: [{ degree: 'MD', institution: 'King Saud University', year: 2007 }],
    experience_years: 17,
    rating: 4.7,
    bio_ar: 'استشاري طب الأعصاب، متخصص في علاج الصرع والصداع المزمن.',
    bio_en: 'Consultant Neurologist specializing in epilepsy and chronic headache management.',
  },
  {
    id: 'P007',
    name_ar: 'د. نورة الدوسري',
    name_en: 'Dr. Noura Al-Dosari',
    department_id: 'dermatology',
    specializations: ['جلدية', 'ليزر', 'علاج البهاق والصدفية'],
    specializations_en: ['Dermatology', 'Laser Therapy', 'Vitiligo & Psoriasis'],
    languages: ['ar', 'en'],
    branch_id: 'R001',
    consultation_fee: 300,
    education: [{ degree: 'MD', institution: 'King Saud University', year: 2013 }],
    experience_years: 11,
    rating: 4.8,
    bio_ar: 'استشارية جلدية وتجميل، متخصصة في الليزر وعلاج الأمراض الجلدية المزمنة.',
    bio_en: 'Consultant Dermatologist specializing in laser therapy and chronic skin conditions.',
  },
  {
    id: 'P008',
    name_ar: 'د. فيصل الغامدي',
    name_en: 'Dr. Faisal Al-Ghamdi',
    department_id: 'ophthalmology',
    specializations: ['طب العيون', 'جراحة المياه البيضاء', 'تصحيح النظر بالليزك'],
    specializations_en: ['Ophthalmology', 'Cataract Surgery', 'LASIK'],
    languages: ['ar', 'en'],
    branch_id: 'R001',
    consultation_fee: 350,
    education: [{ degree: 'MD', institution: 'King Saud University', year: 2006 }],
    experience_years: 18,
    rating: 4.6,
    bio_ar: 'استشاري طب وجراحة العيون، خبرة في عمليات المياه البيضاء والليزك.',
    bio_en: 'Consultant Ophthalmologist experienced in cataract surgery and LASIK.',
  },
  {
    id: 'P009',
    name_ar: 'د. مها العنزي',
    name_en: 'Dr. Maha Al-Anazi',
    department_id: 'internal',
    specializations: ['باطنية', 'سكري', 'غدد صماء'],
    specializations_en: ['Internal Medicine', 'Diabetes', 'Endocrinology'],
    languages: ['ar', 'en'],
    branch_id: 'R001',
    consultation_fee: 250,
    education: [{ degree: 'MD', institution: 'King Khalid University', year: 2011 }],
    experience_years: 13,
    rating: 4.4,
    bio_ar: 'استشارية باطنية وغدد صماء، متخصصة في علاج السكري واضطرابات الغدة الدرقية.',
    bio_en: 'Consultant Internist and Endocrinologist specializing in diabetes and thyroid disorders.',
  },
  {
    id: 'P010',
    name_ar: 'د. حسن اليامي',
    name_en: 'Dr. Hassan Al-Yami',
    department_id: 'dentistry',
    specializations: ['طب الأسنان', 'زراعة الأسنان', 'تقويم الأسنان'],
    specializations_en: ['Dentistry', 'Dental Implants', 'Orthodontics'],
    languages: ['ar', 'en'],
    branch_id: 'R001',
    consultation_fee: 200,
    education: [{ degree: 'BDS', institution: 'Riyadh Colleges of Dentistry', year: 2014 }],
    experience_years: 10,
    rating: 4.5,
    bio_ar: 'أخصائي طب الأسنان، خبرة في الزراعة والتقويم التجميلي.',
    bio_en: 'Dental Specialist in implants and cosmetic orthodontics.',
  },
  {
    id: 'P011',
    name_ar: 'د. سامي الجهني',
    name_en: 'Dr. Sami Al-Juhani',
    department_id: 'urology',
    specializations: ['مسالك بولية', 'جراحة الكلى', 'حصوات المسالك'],
    specializations_en: ['Urology', 'Kidney Surgery', 'Urinary Stones'],
    languages: ['ar', 'en'],
    branch_id: 'U001',
    consultation_fee: 300,
    education: [{ degree: 'MD', institution: 'Taibah University', year: 2010 }],
    experience_years: 14,
    rating: 4.3,
    bio_ar: 'استشاري مسالك بولية، خبرة في جراحات الكلى والحصوات بالمنظار.',
    bio_en: 'Consultant Urologist experienced in laparoscopic kidney and stone surgeries.',
  },
  {
    id: 'P012',
    name_ar: 'د. ليلى القرشي',
    name_en: 'Dr. Layla Al-Qurashi',
    department_id: 'psychiatry',
    specializations: ['طب نفسي', 'القلق والاكتئاب', 'الصحة النفسية'],
    specializations_en: ['Psychiatry', 'Anxiety & Depression', 'Mental Health'],
    languages: ['ar', 'en'],
    branch_id: 'R001',
    consultation_fee: 350,
    education: [{ degree: 'MD', institution: 'King Saud University', year: 2013 }],
    experience_years: 11,
    rating: 4.7,
    bio_ar: 'استشارية طب نفسي، متخصصة في علاج القلق والاكتئاب والاضطرابات النفسية.',
    bio_en: 'Consultant Psychiatrist specializing in anxiety, depression, and mental health disorders.',
  },
];


async function getProvidersFromDB(env) {
  try {
    if (!env || !env.DB) return null;
    const { results } = await env.DB.prepare(
      "SELECT id, provider_code, first_name_ar, last_name_ar, first_name_en, last_name_en, specialty, subspecialty, department, clinic_location, phone, email FROM providers WHERE is_active = 1 ORDER BY specialty, last_name_ar"
    ).all();
    if (results && results.length > 0) {
      return results.map(r => ({
        id: r.provider_code || ("P" + String(r.id).padStart(3, "0")),
        name_ar: ("د. " + (r.first_name_ar || "") + " " + (r.last_name_ar || "")).trim(),
        name_en: ("Dr. " + (r.first_name_en || r.first_name_ar || "") + " " + (r.last_name_en || r.last_name_ar || "")).trim(),
        specialty: r.specialty || "",
        subspecialty: r.subspecialty || "",
        department: r.department || "",
        branch: r.clinic_location || "",
        phone: r.phone || "",
        email: r.email || "",
        rating: 4.0,
        experience_years: 10,
        source: "d1",
      }));
    }
  } catch (e) {
    console.error("DB providers error:", e);
  }
  return null;
}

export async function getProviders(env) {
  const dbProviders = await getProvidersFromDB(env);
  return dbProviders || providers;
}

export async function getProvider(id, env) {
  if (env && env.DB) {
    const dbProviders = await getProvidersFromDB(env);
    if (dbProviders) {
      const found = dbProviders.find(p => p.id === id);
      if (found) return found;
    }
  }
  return providers.find(p => p.id === id) || null;
}

export function getProvidersByBranch(branchId) {
  return providers.filter(p => p.branch_id === branchId);
}

export function getProvidersByDepartment(deptId) {
  return providers.filter(p => p.department_id === deptId);
}
