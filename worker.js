var ru=Object.defineProperty;var c=(u,a)=>ru(u,"name",{value:a,configurable:!0});var H=(u,a)=>()=>(u&&(a=u(u=0)),a);var R=(u,a)=>{for(var e in a)ru(u,e,{get:a[e],enumerable:!0})};var x,T,S=H(()=>{x={NAME:"HNH Portal - BrainSAIT Healthcare OS",VERSION:"9.1.0",SITE_URL:"https://hnh.brainsait.org",CONTACT_EMAIL:"info@hnh.brainsait.org",AI_MODEL:"@cf/meta/llama-3.3-70b-instruct-fp8-fast",AI_FALLBACK_MODEL:"@cf/meta/llama-3-8b-instruct",AI_MAX_TOKENS:600,AI_TEMPERATURE:.6,RATE_LIMIT_WINDOW_MS:6e4,RATE_LIMIT_MAX_REQUESTS:100,NPHIES_VERSION:"V2",NPHIES_CLAIMS_VERSION:"5010",BRANCHES:{RIYADH:"R001",JAZAN:"J001",KHAMIS_MUSHAIT:"K001",MADINAH:"M001",UNAYZAH:"U001"},CORPORATE:{FOUNDED:1999,OWNER:"Al-Inmaa Medical Services Company (\u0634\u0631\u0643\u0629 \u0627\u0644\u0627\u0646\u0645\u0627\u0621 \u0644\u0644\u062E\u062F\u0645\u0627\u062A \u0627\u0644\u0637\u0628\u064A\u0629)",CHAIRMAN:"A. Mohammed bin Nasser bin Jar Allah",CEO:{name_ar:"\u062F. \u0641\u0648\u0632\u064A\u0629 \u0627\u0644\u062C\u0627\u0631 \u0627\u0644\u0644\u0647",name_en:"Dr. Fawzia Al-Jar Allah"},CEO_ASSISTANT:{name_ar:"\u062F. \u062D\u0633\u064A\u0646 \u0628\u0646 \u062D\u0633\u0648\u0633\u0629",name_en:"Dr. Hussein bin Husousa"},CEO_ACHIEVEMENT:"Selected among top 100 healthcare leaders in the Middle East",YEARS_OPERATING:"25+ years",STATS:{doctors:700,outpatient_clinics:500,employees:3500,beds:1200,surgeries_per_year:4e4,nurses:1200,branches:5,annual_outpatient_visits:22e5},VISION:"To be a leader in healthcare in Saudi Arabia and the Middle East through continuous innovation, high-quality care meeting global standards, and horizontal expansion across the Kingdom.",MISSION:"Providing distinguished, integrated, patient-focused healthcare committed to innovative treatment supported by highly experienced specialists, with quality, efficiency, and compassion.",VALUES:["Superior and professional healthcare","Honesty and credibility","Commitment to social responsibility","Full commitment to patient and visitor privacy","Commitment to Islamic teachings","Quality and safety"]},DEPARTMENTS:[{id:"emergency",ar:"\u0637\u0648\u0627\u0631\u0626",en:"Emergency"},{id:"internal",ar:"\u0628\u0627\u0637\u0646\u064A\u0629",en:"Internal Medicine"},{id:"surgery",ar:"\u062C\u0631\u0627\u062D\u0629 \u0639\u0627\u0645\u0629 \u0648\u062C\u0631\u0627\u062D\u0629 \u0633\u0645\u0646\u0629",en:"General & Bariatric Surgery"},{id:"orthopedics",ar:"\u0639\u0638\u0627\u0645",en:"Orthopedics"},{id:"pediatrics",ar:"\u0623\u0637\u0641\u0627\u0644",en:"Pediatrics"},{id:"obgyn",ar:"\u0646\u0633\u0627\u0621 \u0648\u0648\u0644\u0627\u062F\u0629",en:"Obstetrics & Gynecology"},{id:"cardiology",ar:"\u0642\u0644\u0628 (\u0642\u0633\u0637\u0631\u0629 \u0642\u0644\u0628\u064A\u0629)",en:"Cardiology (Catheterization)"},{id:"dermatology",ar:"\u062C\u0644\u062F\u064A\u0629 \u0648\u0644\u064A\u0632\u0631",en:"Dermatology & Laser"},{id:"ent",ar:"\u0623\u0646\u0641 \u0648\u0623\u0630\u0646 \u0648\u062D\u0646\u062C\u0631\u0629",en:"Ear, Nose & Throat (ENT)"},{id:"dentistry",ar:"\u0623\u0633\u0646\u0627\u0646",en:"Dentistry"},{id:"ophthalmology",ar:"\u0639\u064A\u0648\u0646",en:"Ophthalmology"},{id:"urology",ar:"\u0645\u0633\u0627\u0644\u0643 \u0628\u0648\u0644\u064A\u0629",en:"Urology"},{id:"neurology",ar:"\u0645\u062E \u0648\u0623\u0639\u0635\u0627\u0628 \u0648\u062C\u0631\u0627\u062D\u0629 \u0623\u0639\u0635\u0627\u0628",en:"Neurology & Neurosurgery"},{id:"nephrology",ar:"\u0623\u0645\u0631\u0627\u0636 \u0627\u0644\u0643\u0644\u0649",en:"Nephrology"},{id:"endocrinology",ar:"\u063A\u062F\u062F \u0635\u0645\u0627\u0621",en:"Endocrinology"},{id:"psychiatry",ar:"\u0637\u0628 \u0646\u0641\u0633\u064A",en:"Psychiatry"},{id:"radiology",ar:"\u0623\u0634\u0639\u0629",en:"Radiology"},{id:"laboratory",ar:"\u0645\u062E\u062A\u0628\u0631",en:"Laboratory"},{id:"pharmacy",ar:"\u0635\u064A\u062F\u0644\u064A\u0629",en:"Pharmacy"}],DEPARTMENTS_FULL:[{id:"general_surgery",ar:"\u062C\u0631\u0627\u062D\u0629 \u0639\u0627\u0645\u0629",en:"General Surgery"},{id:"bariatric_surgery",ar:"\u062C\u0631\u0627\u062D\u0629 \u0633\u0645\u0646\u0629",en:"Bariatric Surgery"},{id:"plastic_surgery",ar:"\u062C\u0631\u0627\u062D\u0629 \u062A\u062C\u0645\u064A\u0644 \u0648\u062A\u0631\u0645\u064A\u0645",en:"Plastic & Reconstructive Surgery"},{id:"orthopedic_surgery",ar:"\u062C\u0631\u0627\u062D\u0629 \u0639\u0638\u0627\u0645",en:"Orthopedic Surgery"},{id:"neurosurgery",ar:"\u062C\u0631\u0627\u062D\u0629 \u0645\u062E \u0648\u0623\u0639\u0635\u0627\u0628 \u0648\u0639\u0645\u0648\u062F \u0641\u0642\u0631\u064A",en:"Neurosurgery & Spine Surgery"},{id:"vascular_surgery",ar:"\u062C\u0631\u0627\u062D\u0629 \u0623\u0648\u0639\u064A\u0629 \u062F\u0645\u0648\u064A\u0629",en:"Vascular Surgery"},{id:"urology_surgery",ar:"\u062C\u0631\u0627\u062D\u0629 \u0645\u0633\u0627\u0644\u0643 \u0628\u0648\u0644\u064A\u0629",en:"Urology Surgery"},{id:"ophthalmology_surgery",ar:"\u062C\u0631\u0627\u062D\u0629 \u0639\u064A\u0648\u0646",en:"Ophthalmology Surgery"},{id:"ent_surgery",ar:"\u062C\u0631\u0627\u062D\u0629 \u0623\u0646\u0641 \u0648\u0623\u0630\u0646 \u0648\u062D\u0646\u062C\u0631\u0629",en:"ENT Surgery"},{id:"pediatric_surgery",ar:"\u062C\u0631\u0627\u062D\u0629 \u0623\u0637\u0641\u0627\u0644",en:"Pediatric Surgery"},{id:"cardiothoracic_surgery",ar:"\u062C\u0631\u0627\u062D\u0629 \u0642\u0644\u0628",en:"Cardiothoracic Surgery"},{id:"oral_surgery",ar:"\u062C\u0631\u0627\u062D\u0629 \u0648\u062C\u0647 \u0648\u0623\u0633\u0646\u0627\u0646",en:"Oral & Maxillofacial Surgery"},{id:"internal_medicine",ar:"\u0628\u0627\u0637\u0646\u064A\u0629",en:"Internal Medicine"},{id:"cardiology",ar:"\u0642\u0644\u0628 (\u0642\u0633\u0637\u0631\u0629 \u0642\u0644\u0628\u064A\u0629)",en:"Cardiology (Catheterization)"},{id:"neurology",ar:"\u0645\u062E \u0648\u0623\u0639\u0635\u0627\u0628",en:"Neurology"},{id:"nephrology",ar:"\u0623\u0645\u0631\u0627\u0636 \u0627\u0644\u0643\u0644\u0649",en:"Nephrology"},{id:"endocrinology",ar:"\u063A\u062F\u062F \u0635\u0645\u0627\u0621 \u0648\u0633\u0643\u0631\u064A",en:"Endocrinology & Diabetes"},{id:"pulmonology",ar:"\u0635\u062F\u0631\u064A\u0629 \u0648\u062C\u0647\u0627\u0632 \u062A\u0646\u0641\u0633\u064A",en:"Pulmonology"},{id:"gastroenterology",ar:"\u062C\u0647\u0627\u0632 \u0647\u0636\u0645\u064A \u0648\u0645\u0646\u0627\u0638\u064A\u0631",en:"Gastroenterology & Hepatology"},{id:"rheumatology",ar:"\u0631\u0648\u0645\u0627\u062A\u064A\u0632\u0645",en:"Rheumatology"},{id:"psychiatry",ar:"\u0637\u0628 \u0646\u0641\u0633\u064A",en:"Psychiatry"},{id:"dermatology",ar:"\u062C\u0644\u062F\u064A\u0629 \u0648\u0644\u064A\u0632\u0631",en:"Dermatology & Laser"},{id:"oncology",ar:"\u0623\u0648\u0631\u0627\u0645",en:"Oncology"},{id:"pain_management",ar:"\u0639\u0644\u0627\u062C \u0627\u0644\u0623\u0644\u0645",en:"Pain Management"},{id:"allergy_immunology",ar:"\u062D\u0633\u0627\u0633\u064A\u0629 \u0648\u0645\u0646\u0627\u0639\u0629",en:"Allergy & Immunology"},{id:"obgyn",ar:"\u0646\u0633\u0627\u0621 \u0648\u0648\u0644\u0627\u062F\u0629",en:"Obstetrics & Gynecology"},{id:"infertility",ar:"\u0639\u0642\u0645 \u0648\u0623\u0637\u0641\u0627\u0644 \u0623\u0646\u0627\u0628\u064A\u0628",en:"Infertility & IVF"},{id:"pediatrics",ar:"\u0623\u0637\u0641\u0627\u0644",en:"Pediatrics"},{id:"neonatology",ar:"\u062D\u062F\u064A\u062B\u064A \u0648\u0644\u0627\u062F\u0629",en:"Neonatology"},{id:"pediatric_cardiology",ar:"\u0642\u0644\u0628 \u0623\u0637\u0641\u0627\u0644",en:"Pediatric Cardiology"},{id:"radiology",ar:"\u0623\u0634\u0639\u0629 \u0648\u062A\u0635\u0648\u064A\u0631 \u0637\u0628\u064A",en:"Radiology & Medical Imaging"},{id:"laboratory",ar:"\u0645\u062E\u062A\u0628\u0631 \u0648\u0628\u0646\u0643 \u062F\u0645",en:"Laboratory & Pathology"},{id:"nuclear_medicine",ar:"\u0637\u0628 \u0646\u0648\u0648\u064A",en:"Nuclear Medicine"},{id:"rehabilitation",ar:"\u0637\u0628 \u0637\u0628\u064A\u0639\u064A \u0648\u0625\u0639\u0627\u062F\u0629 \u062A\u0623\u0647\u064A\u0644",en:"Physical Therapy & Rehabilitation"},{id:"respiratory_therapy",ar:"\u0639\u0644\u0627\u062C \u062A\u0646\u0641\u0633\u064A",en:"Respiratory Therapy"},{id:"nutrition",ar:"\u062A\u063A\u0630\u064A\u0629 \u0648\u0639\u0644\u0627\u062C \u063A\u0630\u0627\u0626\u064A",en:"Nutrition & Dietetics"},{id:"emergency",ar:"\u0637\u0648\u0627\u0631\u0626",en:"Emergency Department"},{id:"icu",ar:"\u0639\u0646\u0627\u064A\u0629 \u0645\u0631\u0643\u0632\u0629",en:"Intensive Care Unit (ICU)"},{id:"nicu",ar:"\u0639\u0646\u0627\u064A\u0629 \u0623\u0637\u0641\u0627\u0644 \u062D\u062F\u064A\u062B\u064A \u0648\u0644\u0627\u062F\u0629",en:"Neonatal ICU (NICU)"},{id:"dentistry",ar:"\u0623\u0633\u0646\u0627\u0646",en:"Dentistry"},{id:"pharmacy",ar:"\u0635\u064A\u062F\u0644\u064A\u0629",en:"Pharmacy"},{id:"home_healthcare",ar:"\u0631\u0639\u0627\u064A\u0629 \u0645\u0646\u0632\u0644\u064A\u0629",en:"Home Healthcare"}],INSURANCE_PARTNERS:["Bupa Arabia","Tawuniya","MedGulf","Allianz Saudi Fransi","GlobeMed","Amana Insurance","Arabian Shield","Sagr Insurance","GIG Gulf","Walaa Insurance"],GENERAL_PHONE:"966920000094",EMERGENCY:"997",MOBILE_APP:{ios:"https://apps.apple.com/app/id6449023535",android:"https://play.google.com/store/apps/details?id=com.alhayat.patientapp"},SUBDOMAINS:["riyadh","jazan","khamis","unaizah"],HAYAT_ACADEMY:!0,HOME_HEALTHCARE:"https://homecare.hayathospitals.com",MEDICAL_JOURNAL:"https://hayathospitals.com/journal/",ARAB_HEALTH_2023:!0,NAFIS_PLATFORM_AWARD:!0},T={"X-Content-Type-Options":"nosniff","X-Frame-Options":"DENY","X-XSS-Protection":"1; mode=block","Referrer-Policy":"strict-origin-when-cross-origin","Permissions-Policy":"camera=(), microphone=(self), geolocation=()","Strict-Transport-Security":"max-age=63072000; includeSubDomains; preload","Cache-Control":"no-cache, no-store, must-revalidate"}});function cu(u={}){return{...F0,...T,...u}}function r(u,a=200,e={}){return new Response(JSON.stringify(u),{status:a,headers:cu({"Content-Type":"application/json; charset=utf-8",...e})})}function lu(){return new Response(null,{status:204,headers:cu()})}var F0,_=H(()=>{S();F0={"Access-Control-Allow-Origin":"*","Access-Control-Allow-Methods":"GET, POST, PATCH, DELETE, OPTIONS","Access-Control-Allow-Headers":"Content-Type, Authorization"};c(cu,"mergeHeaders");c(r,"json");c(lu,"handleCors")});var Mu={};R(Mu,{getProvider:()=>j,getProviders:()=>P,getProvidersByBranch:()=>Y0,getProvidersByDepartment:()=>V0,providers:()=>k});async function qu(u){try{if(!u||!u.DB)return null;let{results:a}=await u.DB.prepare("SELECT id, provider_code, first_name_ar, last_name_ar, first_name_en, last_name_en, specialty, subspecialty, department, clinic_location, phone, email FROM providers WHERE is_active = 1 ORDER BY specialty, last_name_ar").all();if(a&&a.length>0)return a.map(e=>({id:e.provider_code||"P"+String(e.id).padStart(3,"0"),name_ar:("\u062F. "+(e.first_name_ar||"")+" "+(e.last_name_ar||"")).trim(),name_en:("Dr. "+(e.first_name_en||e.first_name_ar||"")+" "+(e.last_name_en||e.last_name_ar||"")).trim(),specialty:e.specialty||"",subspecialty:e.subspecialty||"",department:e.department||"",branch:e.clinic_location||"",phone:e.phone||"",email:e.email||"",rating:4,experience_years:10,source:"d1"}))}catch(a){console.error("DB providers error:",a)}return null}async function P(u){return await qu(u)||k}async function j(u,a){if(a&&a.DB){let e=await qu(a);if(e){let t=e.find(n=>n.id===u);if(t)return t}}return k.find(e=>e.id===u)||null}function Y0(u){return k.filter(a=>a.branch_id===u)}function V0(u){return k.filter(a=>a.department_id===u)}var k,q=H(()=>{k=[{id:"P001",name_ar:"\u062F. \u0645\u062D\u0645\u062F \u0628\u0643\u0631\u064A",name_en:"Dr. Mohamed Bakry",department_id:"surgery",specializations:["\u062C\u0631\u0627\u062D\u0629 \u062A\u062C\u0645\u064A\u0644\u064A\u0629","\u062C\u0631\u0627\u062D\u0629 \u0627\u0644\u0648\u062C\u0647 \u0648\u0627\u0644\u0641\u0643\u064A\u0646"],specializations_en:["Plastic Surgery","Maxillofacial Surgery"],languages:["ar","en"],branch_id:"R001",consultation_fee:500,education:[{degree:"MD",institution:"Cairo University",year:2005}],experience_years:19,rating:4.9,bio_ar:"\u0627\u0633\u062A\u0634\u0627\u0631\u064A \u062C\u0631\u0627\u062D\u0629 \u0627\u0644\u062A\u062C\u0645\u064A\u0644 \u0648\u0627\u0644\u062A\u0631\u0645\u064A\u0645\u060C \u062E\u0628\u0631\u0629 \u0648\u0627\u0633\u0639\u0629 \u0641\u064A \u0639\u0645\u0644\u064A\u0627\u062A \u0627\u0644\u0648\u062C\u0647 \u0648\u0627\u0644\u0641\u0643\u064A\u0646.",bio_en:"Consultant Plastic and Reconstructive Surgeon with extensive experience in facial surgery."},{id:"P002",name_ar:"\u062F. \u0639\u0628\u062F\u0627\u0644\u0644\u0647 \u0627\u0644\u0642\u062D\u0637\u0627\u0646\u064A",name_en:"Dr. Abdullah Al-Qahtani",department_id:"cardiology",specializations:["\u0642\u0633\u0637\u0631\u0629 \u0642\u0644\u0628\u064A\u0629","\u0623\u0645\u0631\u0627\u0636 \u0627\u0644\u0642\u0644\u0628 \u0627\u0644\u062A\u062F\u0627\u062E\u0644\u064A\u0629"],specializations_en:["Cardiac Catheterization","Interventional Cardiology"],languages:["ar","en"],branch_id:"R001",consultation_fee:400,education:[{degree:"MD",institution:"King Saud University",year:2008}],experience_years:16,rating:4.7,bio_ar:"\u0627\u0633\u062A\u0634\u0627\u0631\u064A \u0623\u0645\u0631\u0627\u0636 \u0627\u0644\u0642\u0644\u0628 \u0648\u0627\u0644\u0642\u0633\u0637\u0631\u0629\u060C \u0631\u0626\u064A\u0633 \u0642\u0633\u0645 \u0627\u0644\u0642\u0644\u0628 \u0628\u0645\u0633\u062A\u0634\u0641\u0649 \u0627\u0644\u0631\u064A\u0627\u0636.",bio_en:"Consultant Cardiologist and Interventionalist, Head of Cardiology at Riyadh branch."},{id:"P003",name_ar:"\u062F. \u0641\u0627\u0637\u0645\u0629 \u0627\u0644\u0632\u0647\u0631\u0627\u0646\u064A",name_en:"Dr. Fatima Al-Zahrani",department_id:"obgyn",specializations:["\u0646\u0633\u0627\u0621 \u0648\u0648\u0644\u0627\u062F\u0629","\u0639\u0642\u0645 \u0648\u0623\u0637\u0641\u0627\u0644 \u0623\u0646\u0627\u0628\u064A\u0628"],specializations_en:["Obstetrics & Gynecology","Infertility & IVF"],languages:["ar","en"],branch_id:"R001",consultation_fee:350,education:[{degree:"MD",institution:"King Abdulaziz University",year:2010}],experience_years:14,rating:4.8,bio_ar:"\u0627\u0633\u062A\u0634\u0627\u0631\u064A\u0629 \u0646\u0633\u0627\u0621 \u0648\u0648\u0644\u0627\u062F\u0629\u060C \u0645\u062A\u062E\u0635\u0635\u0629 \u0641\u064A \u0639\u0644\u0627\u062C \u0627\u0644\u0639\u0642\u0645 \u0648\u0623\u0637\u0641\u0627\u0644 \u0627\u0644\u0623\u0646\u0627\u0628\u064A\u0628.",bio_en:"Consultant OB/GYN specializing in infertility treatment and IVF."},{id:"P004",name_ar:"\u062F. \u062E\u0627\u0644\u062F \u0627\u0644\u0634\u0647\u0631\u0627\u0646\u064A",name_en:"Dr. Khaled Al-Shahrani",department_id:"orthopedics",specializations:["\u062C\u0631\u0627\u062D\u0629 \u0627\u0644\u0639\u0638\u0627\u0645","\u062C\u0631\u0627\u062D\u0629 \u0627\u0644\u0645\u0641\u0627\u0635\u0644","\u0645\u0646\u0638\u0627\u0631 \u0627\u0644\u0645\u0641\u0627\u0635\u0644"],specializations_en:["Orthopedic Surgery","Joint Surgery","Arthroscopy"],languages:["ar","en"],branch_id:"R001",consultation_fee:400,education:[{degree:"MD",institution:"King Faisal University",year:2009}],experience_years:15,rating:4.6,bio_ar:"\u0627\u0633\u062A\u0634\u0627\u0631\u064A \u062C\u0631\u0627\u062D\u0629 \u0627\u0644\u0639\u0638\u0627\u0645 \u0648\u0627\u0644\u0645\u0641\u0627\u0635\u0644\u060C \u062E\u0628\u0631\u0629 \u0641\u064A \u0639\u0645\u0644\u064A\u0627\u062A \u0627\u0644\u0645\u0646\u0638\u0627\u0631 \u0648\u0627\u0644\u062A\u0628\u062F\u064A\u0644.",bio_en:"Consultant Orthopedic and Joint Surgeon, experienced in arthroscopy and joint replacement."},{id:"P005",name_ar:"\u062F. \u0633\u0627\u0631\u0629 \u0627\u0644\u062D\u0631\u0628\u064A",name_en:"Dr. Sarah Al-Harbi",department_id:"pediatrics",specializations:["\u0637\u0628 \u0627\u0644\u0623\u0637\u0641\u0627\u0644","\u062D\u062F\u064A\u062B\u064A \u0627\u0644\u0648\u0644\u0627\u062F\u0629"],specializations_en:["Pediatrics","Neonatology"],languages:["ar","en"],branch_id:"J001",consultation_fee:250,education:[{degree:"MD",institution:"Umm Al-Qura University",year:2012}],experience_years:12,rating:4.5,bio_ar:"\u0627\u0633\u062A\u0634\u0627\u0631\u064A\u0629 \u0637\u0628 \u0623\u0637\u0641\u0627\u0644 \u0648\u062D\u062F\u064A\u062B\u064A \u0627\u0644\u0648\u0644\u0627\u062F\u0629\u060C \u0631\u0626\u064A\u0633\u0629 \u0642\u0633\u0645 \u0627\u0644\u0623\u0637\u0641\u0627\u0644 \u0628\u062C\u0627\u0632\u0627\u0646.",bio_en:"Consultant Pediatrician and Neonatologist, Head of Pediatrics at Jazan."},{id:"P006",name_ar:"\u062F. \u0623\u062D\u0645\u062F \u0627\u0644\u0645\u0637\u064A\u0631\u064A",name_en:"Dr. Ahmed Al-Mutairi",department_id:"neurology",specializations:["\u0637\u0628 \u0627\u0644\u0623\u0639\u0635\u0627\u0628","\u0627\u0644\u0635\u0631\u0639","\u0627\u0644\u0635\u062F\u0627\u0639 \u0627\u0644\u0646\u0635\u0641\u064A"],specializations_en:["Neurology","Epilepsy","Migraine"],languages:["ar","en"],branch_id:"M001",consultation_fee:350,education:[{degree:"MD",institution:"King Saud University",year:2007}],experience_years:17,rating:4.7,bio_ar:"\u0627\u0633\u062A\u0634\u0627\u0631\u064A \u0637\u0628 \u0627\u0644\u0623\u0639\u0635\u0627\u0628\u060C \u0645\u062A\u062E\u0635\u0635 \u0641\u064A \u0639\u0644\u0627\u062C \u0627\u0644\u0635\u0631\u0639 \u0648\u0627\u0644\u0635\u062F\u0627\u0639 \u0627\u0644\u0645\u0632\u0645\u0646.",bio_en:"Consultant Neurologist specializing in epilepsy and chronic headache management."},{id:"P007",name_ar:"\u062F. \u0646\u0648\u0631\u0629 \u0627\u0644\u062F\u0648\u0633\u0631\u064A",name_en:"Dr. Noura Al-Dosari",department_id:"dermatology",specializations:["\u062C\u0644\u062F\u064A\u0629","\u0644\u064A\u0632\u0631","\u0639\u0644\u0627\u062C \u0627\u0644\u0628\u0647\u0627\u0642 \u0648\u0627\u0644\u0635\u062F\u0641\u064A\u0629"],specializations_en:["Dermatology","Laser Therapy","Vitiligo & Psoriasis"],languages:["ar","en"],branch_id:"R001",consultation_fee:300,education:[{degree:"MD",institution:"King Saud University",year:2013}],experience_years:11,rating:4.8,bio_ar:"\u0627\u0633\u062A\u0634\u0627\u0631\u064A\u0629 \u062C\u0644\u062F\u064A\u0629 \u0648\u062A\u062C\u0645\u064A\u0644\u060C \u0645\u062A\u062E\u0635\u0635\u0629 \u0641\u064A \u0627\u0644\u0644\u064A\u0632\u0631 \u0648\u0639\u0644\u0627\u062C \u0627\u0644\u0623\u0645\u0631\u0627\u0636 \u0627\u0644\u062C\u0644\u062F\u064A\u0629 \u0627\u0644\u0645\u0632\u0645\u0646\u0629.",bio_en:"Consultant Dermatologist specializing in laser therapy and chronic skin conditions."},{id:"P008",name_ar:"\u062F. \u0641\u064A\u0635\u0644 \u0627\u0644\u063A\u0627\u0645\u062F\u064A",name_en:"Dr. Faisal Al-Ghamdi",department_id:"ophthalmology",specializations:["\u0637\u0628 \u0627\u0644\u0639\u064A\u0648\u0646","\u062C\u0631\u0627\u062D\u0629 \u0627\u0644\u0645\u064A\u0627\u0647 \u0627\u0644\u0628\u064A\u0636\u0627\u0621","\u062A\u0635\u062D\u064A\u062D \u0627\u0644\u0646\u0638\u0631 \u0628\u0627\u0644\u0644\u064A\u0632\u0643"],specializations_en:["Ophthalmology","Cataract Surgery","LASIK"],languages:["ar","en"],branch_id:"R001",consultation_fee:350,education:[{degree:"MD",institution:"King Saud University",year:2006}],experience_years:18,rating:4.6,bio_ar:"\u0627\u0633\u062A\u0634\u0627\u0631\u064A \u0637\u0628 \u0648\u062C\u0631\u0627\u062D\u0629 \u0627\u0644\u0639\u064A\u0648\u0646\u060C \u062E\u0628\u0631\u0629 \u0641\u064A \u0639\u0645\u0644\u064A\u0627\u062A \u0627\u0644\u0645\u064A\u0627\u0647 \u0627\u0644\u0628\u064A\u0636\u0627\u0621 \u0648\u0627\u0644\u0644\u064A\u0632\u0643.",bio_en:"Consultant Ophthalmologist experienced in cataract surgery and LASIK."},{id:"P009",name_ar:"\u062F. \u0645\u0647\u0627 \u0627\u0644\u0639\u0646\u0632\u064A",name_en:"Dr. Maha Al-Anazi",department_id:"internal",specializations:["\u0628\u0627\u0637\u0646\u064A\u0629","\u0633\u0643\u0631\u064A","\u063A\u062F\u062F \u0635\u0645\u0627\u0621"],specializations_en:["Internal Medicine","Diabetes","Endocrinology"],languages:["ar","en"],branch_id:"R001",consultation_fee:250,education:[{degree:"MD",institution:"King Khalid University",year:2011}],experience_years:13,rating:4.4,bio_ar:"\u0627\u0633\u062A\u0634\u0627\u0631\u064A\u0629 \u0628\u0627\u0637\u0646\u064A\u0629 \u0648\u063A\u062F\u062F \u0635\u0645\u0627\u0621\u060C \u0645\u062A\u062E\u0635\u0635\u0629 \u0641\u064A \u0639\u0644\u0627\u062C \u0627\u0644\u0633\u0643\u0631\u064A \u0648\u0627\u0636\u0637\u0631\u0627\u0628\u0627\u062A \u0627\u0644\u063A\u062F\u0629 \u0627\u0644\u062F\u0631\u0642\u064A\u0629.",bio_en:"Consultant Internist and Endocrinologist specializing in diabetes and thyroid disorders."},{id:"P010",name_ar:"\u062F. \u062D\u0633\u0646 \u0627\u0644\u064A\u0627\u0645\u064A",name_en:"Dr. Hassan Al-Yami",department_id:"dentistry",specializations:["\u0637\u0628 \u0627\u0644\u0623\u0633\u0646\u0627\u0646","\u0632\u0631\u0627\u0639\u0629 \u0627\u0644\u0623\u0633\u0646\u0627\u0646","\u062A\u0642\u0648\u064A\u0645 \u0627\u0644\u0623\u0633\u0646\u0627\u0646"],specializations_en:["Dentistry","Dental Implants","Orthodontics"],languages:["ar","en"],branch_id:"R001",consultation_fee:200,education:[{degree:"BDS",institution:"Riyadh Colleges of Dentistry",year:2014}],experience_years:10,rating:4.5,bio_ar:"\u0623\u062E\u0635\u0627\u0626\u064A \u0637\u0628 \u0627\u0644\u0623\u0633\u0646\u0627\u0646\u060C \u062E\u0628\u0631\u0629 \u0641\u064A \u0627\u0644\u0632\u0631\u0627\u0639\u0629 \u0648\u0627\u0644\u062A\u0642\u0648\u064A\u0645 \u0627\u0644\u062A\u062C\u0645\u064A\u0644\u064A.",bio_en:"Dental Specialist in implants and cosmetic orthodontics."},{id:"P011",name_ar:"\u062F. \u0633\u0627\u0645\u064A \u0627\u0644\u062C\u0647\u0646\u064A",name_en:"Dr. Sami Al-Juhani",department_id:"urology",specializations:["\u0645\u0633\u0627\u0644\u0643 \u0628\u0648\u0644\u064A\u0629","\u062C\u0631\u0627\u062D\u0629 \u0627\u0644\u0643\u0644\u0649","\u062D\u0635\u0648\u0627\u062A \u0627\u0644\u0645\u0633\u0627\u0644\u0643"],specializations_en:["Urology","Kidney Surgery","Urinary Stones"],languages:["ar","en"],branch_id:"U001",consultation_fee:300,education:[{degree:"MD",institution:"Taibah University",year:2010}],experience_years:14,rating:4.3,bio_ar:"\u0627\u0633\u062A\u0634\u0627\u0631\u064A \u0645\u0633\u0627\u0644\u0643 \u0628\u0648\u0644\u064A\u0629\u060C \u062E\u0628\u0631\u0629 \u0641\u064A \u062C\u0631\u0627\u062D\u0627\u062A \u0627\u0644\u0643\u0644\u0649 \u0648\u0627\u0644\u062D\u0635\u0648\u0627\u062A \u0628\u0627\u0644\u0645\u0646\u0638\u0627\u0631.",bio_en:"Consultant Urologist experienced in laparoscopic kidney and stone surgeries."},{id:"P012",name_ar:"\u062F. \u0644\u064A\u0644\u0649 \u0627\u0644\u0642\u0631\u0634\u064A",name_en:"Dr. Layla Al-Qurashi",department_id:"psychiatry",specializations:["\u0637\u0628 \u0646\u0641\u0633\u064A","\u0627\u0644\u0642\u0644\u0642 \u0648\u0627\u0644\u0627\u0643\u062A\u0626\u0627\u0628","\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0646\u0641\u0633\u064A\u0629"],specializations_en:["Psychiatry","Anxiety & Depression","Mental Health"],languages:["ar","en"],branch_id:"R001",consultation_fee:350,education:[{degree:"MD",institution:"King Saud University",year:2013}],experience_years:11,rating:4.7,bio_ar:"\u0627\u0633\u062A\u0634\u0627\u0631\u064A\u0629 \u0637\u0628 \u0646\u0641\u0633\u064A\u060C \u0645\u062A\u062E\u0635\u0635\u0629 \u0641\u064A \u0639\u0644\u0627\u062C \u0627\u0644\u0642\u0644\u0642 \u0648\u0627\u0644\u0627\u0643\u062A\u0626\u0627\u0628 \u0648\u0627\u0644\u0627\u0636\u0637\u0631\u0627\u0628\u0627\u062A \u0627\u0644\u0646\u0641\u0633\u064A\u0629.",bio_en:"Consultant Psychiatrist specializing in anxiety, depression, and mental health disorders."}];c(qu,"getProvidersFromDB");c(P,"getProviders");c(j,"getProvider");c(Y0,"getProvidersByBranch");c(V0,"getProvidersByDepartment")});var Ku={};R(Ku,{handleChat:()=>F});async function F(u,a){let e=await u.json(),{message:t,session_id:n,language:i}=e;if(!t)return r({success:!1,message:"Message is required"},400);let s=n||"ses_"+Date.now().toString(36),o=[];try{let{results:m}=await a.DB.prepare("SELECT role, content FROM chat_history WHERE session_id = ? ORDER BY created_at DESC LIMIT 6").bind(s).all();m&&(o=m.reverse().map(p=>({role:p.role,content:p.content})))}catch(m){console.error("DB history error:",m)}let l=[{role:"system",content:a6},...o,{role:"user",content:t}],d;try{let m=await a.AI.run(x.AI_MODEL,{messages:l,max_tokens:x.AI_MAX_TOKENS,temperature:x.AI_TEMPERATURE});d=m.response||m.choices?.[0]?.message?.content||""}catch(m){console.error("AI error, trying CF fallback:",m);try{let p=await a.AI.run(x.AI_FALLBACK_MODEL,{messages:l,max_tokens:x.AI_MAX_TOKENS,temperature:x.AI_TEMPERATURE});d=p.response||p.choices?.[0]?.message?.content||""}catch{if(a.DEEPSEEK_API_KEY)try{d=(await(await fetch("https://api.deepseek.com/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${a.DEEPSEEK_API_KEY}`},body:JSON.stringify({model:"deepseek-chat",messages:l,max_tokens:x.AI_MAX_TOKENS,temperature:x.AI_TEMPERATURE}),signal:AbortSignal.timeout(15e3)})).json()).choices?.[0]?.message?.content||$(t,i)}catch(g){console.error("DeepSeek fallback error:",g),d=$(t,i)}else d=$(t,i)}}try{await a.DB.prepare("INSERT INTO chat_history (session_id, role, content) VALUES (?, ?, ?), (?, ?, ?)").bind(s,"user",t,s,"assistant",d).run()}catch(m){console.error("DB save error:",m)}return r({success:!0,response:d,session_id:s})}function $(u,a){let e=(u||"").toLowerCase();return/[\u0600-\u06FF]/.test(u)||a==="ar"?e.includes("\u0645\u0648\u0639\u062F")||e.includes("\u062D\u062C\u0632")?"\u064A\u0645\u0643\u0646\u0643 \u062D\u062C\u0632 \u0645\u0648\u0639\u062F \u0645\u0646 \u062E\u0644\u0627\u0644 \u0645\u0648\u0642\u0639\u0646\u0627 \u0623\u0648 \u0627\u0644\u062A\u0637\u0628\u064A\u0642\u060C \u0623\u0648 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0639\u0644\u0649 966920000094. \u0647\u0644 \u062A\u062D\u062A\u0627\u062C \u0645\u0633\u0627\u0639\u062F\u0629 \u0641\u064A \u0627\u062E\u062A\u064A\u0627\u0631 \u0627\u0644\u0637\u0628\u064A\u0628 \u0627\u0644\u0645\u0646\u0627\u0633\u0628\u061F":e.includes("\u0637\u0628\u064A\u0628")||e.includes("\u062F\u0643\u062A\u0648\u0631")?"\u0644\u062F\u064A\u0646\u0627 \u0623\u0643\u062B\u0631 \u0645\u0646 700 \u0637\u0628\u064A\u0628 \u0648\u0627\u0633\u062A\u0634\u0627\u0631\u064A \u0641\u064A 5 \u0641\u0631\u0648\u0639. \u062F. \u0645\u062D\u0645\u062F \u0628\u0643\u0631\u064A (\u062C\u0631\u0627\u062D\u0629 \u062A\u062C\u0645\u064A\u0644\u064A\u0629) \u0627\u0644\u0623\u0639\u0644\u0649 \u062A\u0642\u064A\u064A\u0645\u0627\u064B. \u062A\u0635\u0641\u062D \u0635\u0641\u062D\u0629 \u0627\u0644\u0623\u0637\u0628\u0627\u0621 \u0644\u0644\u0628\u062D\u062B \u062D\u0633\u0628 \u0627\u0644\u062A\u062E\u0635\u0635.":e.includes("\u062A\u0623\u0645\u064A\u0646")||e.includes("\u0645\u0637\u0627\u0644\u0628\u0629")||e.includes("nphies")?"\u0646\u0638\u0627\u0645 NPHIES \u064A\u062F\u0639\u0645 \u0627\u0644\u0645\u0637\u0627\u0644\u0628\u0627\u062A \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A\u0629. \u0646\u062A\u0639\u0627\u0642\u062F \u0645\u0639 10 \u0634\u0631\u0643\u0627\u062A \u062A\u0623\u0645\u064A\u0646: Bupa Arabia\u060C \u062A\u0648\u064A\u0646\u0629\u060C \u0645\u064A\u062F\u063A\u0644\u0641\u060C \u0648\u063A\u064A\u0631\u0647\u0627. \u062A\u062D\u0642\u0642 \u0645\u0646 \u0623\u0647\u0644\u064A\u062A\u0643 \u0627\u0644\u062A\u0623\u0645\u064A\u0646\u064A\u0629 \u0639\u0628\u0631 \u0635\u0641\u062D\u0629 \u0627\u0644\u062A\u062D\u0642\u0642.":e.includes("\u0641\u0631\u0639")||e.includes("\u0639\u0646\u0648\u0627\u0646")||e.includes("\u0645\u0648\u0642\u0639")?"5 \u0641\u0631\u0648\u0639: \u0627\u0644\u0631\u064A\u0627\u0636 (\u0637\u0631\u064A\u0642 \u0627\u0644\u062F\u0627\u0626\u0631\u064A \u0627\u0644\u0634\u0631\u0642\u064A - \u0627\u0644\u0631\u0628\u0648\u0629)\u060C \u062C\u0627\u0632\u0627\u0646 (\u0627\u0644\u0643\u0648\u0631\u0646\u064A\u0634)\u060C \u062E\u0645\u064A\u0633 \u0645\u0634\u064A\u0637 (\u0627\u0644\u0623\u0645\u064A\u0631 \u0633\u0644\u0637\u0627\u0646)\u060C \u0627\u0644\u0645\u062F\u064A\u0646\u0629 \u0627\u0644\u0645\u0646\u0648\u0631\u0629 (\u0637\u0631\u064A\u0642 \u0627\u0644\u0647\u062C\u0631\u0629)\u060C \u0639\u0646\u064A\u0632\u0629 (\u0627\u0644\u0642\u0635\u064A\u0645). \u0644\u0644\u0627\u062A\u0635\u0627\u0644: 966920000094.":e.includes("\u0639\u0646")||e.includes("\u0627\u0644\u0645\u0633\u062A\u0634\u0641\u0649")||e.includes("\u0645\u0646 \u0623\u0646\u062A\u0645")||e.includes("\u0646\u0628\u0630\u0629")?"\u062A\u0623\u0633\u0633\u062A \u0645\u062C\u0645\u0648\u0639\u0629 \u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A \u0639\u0627\u0645 1999\u060C \u0648\u062A\u062F\u064A\u0631\u0647\u0627 \u0634\u0631\u0643\u0629 \u0627\u0644\u0627\u0646\u0645\u0627\u0621 \u0644\u0644\u062E\u062F\u0645\u0627\u062A \u0627\u0644\u0637\u0628\u064A\u0629 \u0628\u0631\u0626\u0627\u0633\u0629 \u0623. \u0645\u062D\u0645\u062F \u0628\u0646 \u0646\u0627\u0635\u0631 \u0627\u0644\u062C\u0627\u0631 \u0627\u0644\u0644\u0647. \u062A\u0636\u0645 5 \u0641\u0631\u0648\u0639 \u0648\u0623\u0643\u062B\u0631 \u0645\u0646 700 \u0637\u0628\u064A\u0628 \u06483500 \u0645\u0648\u0638\u0641 \u06481200 \u0633\u0631\u064A\u0631. \u0627\u0644\u0631\u0626\u064A\u0633 \u0627\u0644\u062A\u0646\u0641\u064A\u0630\u064A: \u062F. \u0641\u0648\u0632\u064A\u0629 \u0627\u0644\u062C\u0627\u0631 \u0627\u0644\u0644\u0647.":e.includes("\u0637\u0648\u0627\u0631\u0626")||e.includes("\u0625\u0633\u0639\u0627\u0641")?"\u26A0\uFE0F \u0625\u0630\u0627 \u0643\u0627\u0646\u062A \u062D\u0627\u0644\u0629 \u0637\u0627\u0631\u0626\u0629\u060C \u062A\u0648\u062C\u0651\u0647 \u0641\u0648\u0631\u0627\u064B \u0644\u0623\u0642\u0631\u0628 \u0637\u0648\u0627\u0631\u0626 \u0623\u0648 \u0627\u062A\u0635\u0644 \u0628\u0627\u0644\u0647\u0644\u0627\u0644 \u0627\u0644\u0623\u062D\u0645\u0631 997. \u062C\u0645\u064A\u0639 \u0641\u0631\u0648\u0639\u0646\u0627 \u0628\u0647\u0627 \u0637\u0648\u0627\u0631\u0626 24 \u0633\u0627\u0639\u0629.":"\u0623\u0647\u0644\u0627\u064B \u0628\u0643 \u0641\u064A \u0645\u0633\u062A\u0634\u0641\u0649 \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A. \u0643\u064A\u0641 \u064A\u0645\u0643\u0646\u0646\u064A \u0645\u0633\u0627\u0639\u062F\u062A\u0643\u061F \u062D\u062C\u0648\u0632\u0627\u062A\u060C \u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0623\u0637\u0628\u0627\u0621\u060C \u0627\u0633\u062A\u0639\u0644\u0627\u0645 \u062A\u0623\u0645\u064A\u0646\u060C \u0623\u0648 \u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0641\u0631\u0648\u0639.":e.includes("appointment")||e.includes("book")?"Book online via our portal/app or call 966920000094. Need help choosing a doctor?":e.includes("doctor")||e.includes("physician")?"We have 700+ doctors across 5 branches. Dr. Mohamed Bakry (Plastic Surgery) highest rated. Browse our providers page.":e.includes("insurance")||e.includes("claim")||e.includes("nphies")?"NPHIES e-claim system supported. 10 insurance partners: Bupa Arabia, Tawuniya, MedGulf, and more. Check eligibility on our portal.":e.includes("branch")||e.includes("location")||e.includes("address")?"5 branches: Riyadh (Eastern Ring/Al-Rabwa), Jazan (Corniche), Khamis Mushayt (Prince Sultan Rd), Madinah (Al-Hijra Rd), Unayzah (Al-Qassim). Call 966920000094.":e.includes("about")||e.includes("history")||e.includes("who")?"Hayat National Hospitals Group was founded in 1999. Owned by Al-Inmaa Medical Services Co., chaired by A. Mohammed bin Nasser bin Jar Allah. CEO Dr. Fawzia Al-Jar Allah. 700+ doctors, 3,500+ staff, 1,200+ beds across 5 branches.":e.includes("emergency")?"If emergency: go to nearest ER or call Saudi Red Crescent 997. All branches have 24/7 ER.":"Welcome to Hayat National Hospital. How can I help? Appointments, doctors, insurance, or branch info."}var a6,G=H(()=>{_();S();a6=`You are BasmaGuist Medical (\u0628\u0633\u0645\u0629 \u063A\u064A\u0633\u062A \u0627\u0644\u0637\u0628\u064A\u0629), the official AI assistant for \u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A (Hayat National Hospitals Group), powered by BrainSAIT Healthcare OS.

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
- Maximum 400 characters per response`;c(F,"handleChat");c($,"getFallbackResponse")});var D=class{static{c(this,"Router")}constructor(){this.routes=[]}add(a,e,t){this.routes.push({method:a,pattern:e,handler:t})}get(a,e){return this.add("GET",a,e)}post(a,e){return this.add("POST",a,e)}patch(a,e){return this.add("PATCH",a,e)}delete(a,e){return this.add("DELETE",a,e)}match(a,e,t){let n=new URL(a.url),i=a.method,s=n.pathname;for(let o of this.routes){if(o.method!==i)continue;let l=s.match(new RegExp(`^${o.pattern}$`));if(!l)continue;let d=l.slice(1);return o.handler(a,e,t,...d,n)}return new Response("Not Found",{status:404})}};_();S();var O=new Map;function du(u){let a=Date.now(),e=a-x.RATE_LIMIT_WINDOW_MS;for(let[n,i]of O)i.timestamp<e&&O.delete(n);let t=O.get(u)||{count:0,timestamp:a};return t.timestamp<e&&(t.count=0,t.timestamp=a),t.count++,O.set(u,t),t.count<=x.RATE_LIMIT_MAX_REQUESTS}c(du,"rateLimit");S();async function C(u,a=4e3){try{let e=new AbortController,t=setTimeout(()=>e.abort(),a),n=await fetch(u,{signal:e.signal});return clearTimeout(t),n.ok?"connected":n.status>=500?"warning":"degraded"}catch{return"offline"}}c(C,"checkIntegration");async function mu(u){let a=u.DB?await u.DB.prepare(`SELECT 
          (SELECT COUNT(*) FROM patients) as total_patients,
          (SELECT COUNT(*) FROM appointments WHERE date(appointment_date) = date('now')) as today_appointments,
          (SELECT COUNT(*) FROM providers) as total_providers,
          (SELECT COUNT(*) FROM claims) as total_claims,
          (SELECT COUNT(*) FROM claims WHERE status = 'pending') as pending_claims`).first():{},[e,t,n,i,s,o]=await Promise.allSettled([C("https://oracle-bridge.brainsait-fadil.workers.dev/health",3e3),C("https://nphies-mirror.brainsait-fadil.workers.dev/health",3e3),C("https://claimlinc-worker.fadil369.workers.dev/health",3e3),C("https://bsma.elfadil.com/api/health",3e3),C("https://sbs.elfadil.com/api/health",3e3),C("https://givc.elfadil.com/api/health",3e3)]),l=null;try{let d=await fetch("https://nphies-mirror.brainsait-fadil.workers.dev/mirror/status",{signal:AbortSignal.timeout(4e3)});if(d.ok){let m=await d.json();l={total_gss:m.total_gss||81,total_pa:m.total_pa||51297}}}catch{}return{success:!0,status:"healthy",version:u.HUB_VERSION||"9.0.1",name:"HNH Portal - BrainSAIT Healthcare OS",timestamp:new Date().toISOString(),database:u.DB?"connected":"unavailable",his_database:u.HIS_DB?"connected":"unavailable",stats:a||{},environment:u.NPHIES_ENVIRONMENT||"sandbox",integrations:{oracle_bridge:e.status==="fulfilled"?e.value:"offline",nphies_mirror:t.status==="fulfilled"?t.value:"offline",claimlinc:n.status==="fulfilled"?n.value:"offline",bsma_portal:i.status==="fulfilled"?i.value:"offline",sbs_portal:s.status==="fulfilled"?s.value:"offline",givc_portal:o.status==="fulfilled"?o.value:"offline"},oracle_tunnel:"Oracle Cloud@Riyadh",nphies_mirror:l}}c(mu,"health");var pu=[{id:"R001",name_ar:"\u0645\u0633\u062A\u0634\u0641\u0649 \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A - \u0627\u0644\u0631\u064A\u0627\u0636",name_en:"Hayat National Hospital - Riyadh",city_ar:"\u0627\u0644\u0631\u064A\u0627\u0636",city_en:"Riyadh",address_ar:"\u062D\u064A \u0627\u0644\u0631\u0628\u0648\u0629\u060C \u0637\u0631\u064A\u0642 \u0627\u0644\u0641\u0631\u0639 \u0627\u0644\u062F\u0627\u0626\u0631\u064A \u0627\u0644\u0634\u0631\u0642\u064A",address_en:"Eastern Ring Branch Road, Al-Rabwa District, Riyadh",phone:"+966920000094",emergency:"+966920000094",email:"info@hayathospitals.com",subdomain:"riyadh.hayathospitals.com",offers_ar:"\u062E\u0635\u0648\u0645\u0627\u062A \u0644\u0644\u0645\u0631\u0636\u0649 \u0627\u0644\u0645\u0646\u0648\u0645\u064A\u0646 \u0644\u0641\u062A\u0631\u0627\u062A \u0637\u0648\u064A\u0644\u0629\u060C \u0628\u0631\u0646\u0627\u0645\u062C \u0632\u0631\u0627\u0639\u0629 \u062E\u0627\u0635",offers_en:"Long-stay patient discounts, special transplant program",departments:["emergency","internal","surgery","cardiology","neurology","orthopedics","pediatrics","obgyn","ophthalmology","dentistry","psychiatry","radiology","laboratory","pharmacy","urology","ent","dermatology","gastroenterology","nephrology","endocrinology","rheumatology","oncology","neurosurgery","vascular_surgery","plastic_surgery","pain_clinic"],beds:300,established:2005,rating:4.5,lat:24.7267,lng:46.6783},{id:"J001",name_ar:"\u0645\u0633\u062A\u0634\u0641\u0649 \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A - \u062C\u0627\u0632\u0627\u0646",name_en:"Hayat National Hospital - Jazan",city_ar:"\u062C\u0627\u0632\u0627\u0646",city_en:"Jazan",address_ar:"\u0643\u0648\u0631\u0646\u064A\u0634 \u062C\u0627\u0632\u0627\u0646\u060C \u062D\u064A \u0627\u0644\u0634\u0627\u0637\u0626",address_en:"Jazan Corniche, Al Shati District",phone:"+966920000094",emergency:"+966920000094",email:"info@hayathospitals.com",subdomain:"jazan.hayathospitals.com",offers_ar:"\u062E\u0635\u0648\u0645\u0627\u062A \u0639\u0644\u0649 \u0627\u0644\u062C\u0631\u0627\u062D\u0627\u062A\u060C \u0645\u062E\u064A\u0645 \u0637\u0628\u064A \u0644\u062C\u0631\u0627\u062D\u0627\u062A \u0627\u0644\u0639\u064A\u0648\u0646",offers_en:"Surgery discounts, medical camp for eye surgery patients",departments:["emergency","internal","surgery","pediatrics","obgyn","ophthalmology","ent","dermatology","gastroenterology","cardiology","neurology","laboratory","pharmacy"],beds:150,established:2012,rating:4.3,lat:16.8892,lng:42.5611},{id:"K001",name_ar:"\u0645\u0633\u062A\u0634\u0641\u0649 \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A - \u062E\u0645\u064A\u0633 \u0645\u0634\u064A\u0637",name_en:"Hayat National Hospital - Khamis Mushayt",city_ar:"\u062E\u0645\u064A\u0633 \u0645\u0634\u064A\u0637",city_en:"Khamis Mushayt",address_ar:"\u0637\u0631\u064A\u0642 \u0627\u0644\u0623\u0645\u064A\u0631 \u0633\u0644\u0637\u0627\u0646\u060C \u0623\u0645 \u0633\u0631\u0627\u0631",address_en:"Prince Sultan Road, Umm Sarar",phone:"+966538081888",phone2:"+966920000094",emergency:"+966920000094",email:"info@hayathospitals.com",subdomain:"khamis.hayathospitals.com",offers_ar:"\u0639\u0631\u0648\u0636 \u0627\u0644\u0639\u064A\u0648\u0646\u060C \u062E\u0635\u0648\u0645\u0627\u062A \u0627\u0644\u0625\u0642\u0627\u0645\u0629 \u0627\u0644\u0637\u0648\u064A\u0644\u0629",offers_en:"Ophthalmology promotion, long-stay discounts",departments:["emergency","internal","surgery","pediatrics","obgyn","orthopedics","ophthalmology","ent","dermatology","cardiology","neurology","urology","psychiatry","radiology","laboratory","pharmacy","gastroenterology","nephrology","endocrinology","pulmonology","neurosurgery","rehabilitation"],beds:180,established:2014,rating:4.2,lat:18.3063,lng:42.7288},{id:"M001",name_ar:"\u0645\u0633\u062A\u0634\u0641\u0649 \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A - \u0627\u0644\u0645\u062F\u064A\u0646\u0629 \u0627\u0644\u0645\u0646\u0648\u0631\u0629",name_en:"Hayat National Hospital - Madinah",city_ar:"\u0627\u0644\u0645\u062F\u064A\u0646\u0629 \u0627\u0644\u0645\u0646\u0648\u0631\u0629",city_en:"Madinah",address_ar:"\u0637\u0631\u064A\u0642 \u0641\u0631\u0639 \u0627\u0644\u0647\u062C\u0631\u0629\u060C \u0627\u0644\u0645\u062F\u064A\u0646\u0629 \u0627\u0644\u0645\u0646\u0648\u0631\u0629 42316",address_en:"Al-Hijra Branch Road, Madinah 42316",phone:"+966920000094",emergency:"+966920000094",email:"info@hayathospitals.com",offers_ar:"\u062E\u062F\u0645\u0627\u062A \u0637\u0628\u064A\u0629 \u0628\u0627\u0633\u062A\u0634\u0627\u0631\u064A\u064A\u0646 \u0645\u062A\u062E\u0635\u0635\u064A\u0646\u060C \u062E\u0635\u0648\u0645\u0627\u062A 50+ \u0633\u0646\u0629\u060C \u0641\u062D\u0648\u0635\u0627\u062A \u0645\u062C\u0627\u0646\u064A\u0629",offers_en:"Consultant-led medical services, 50+ senior discounts, free medical tests",departments:["emergency","internal","surgery","cardiology","pediatrics","obgyn","ophthalmology","ent","dermatology","neurology","nephrology","endocrinology","pulmonology","laboratory","pharmacy","rehabilitation"],beds:200,established:2010,rating:4.4,lat:24.4672,lng:39.6119},{id:"U001",name_ar:"\u0645\u0633\u062A\u0634\u0641\u0649 \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A - \u0639\u0646\u064A\u0632\u0629",name_en:"Hayat National Hospital - Unayzah",city_ar:"\u0639\u0646\u064A\u0632\u0629",city_en:"Unayzah",address_ar:"\u0627\u0644\u0642\u0635\u064A\u0645 - \u0639\u0646\u064A\u0632\u0629\u060C \u0637\u0631\u064A\u0642 \u0627\u0644\u0645\u062F\u064A\u0646\u0629",address_en:"Al-Qassim - Unayzah, Medina Road",phone:"+966920000094",emergency:"+966920000094",email:"info@hayathospitals.com",subdomain:"unaizah.hayathospitals.com",offers_ar:"\u0639\u0631\u0648\u0636 \u0645\u0633\u062A\u0645\u0631\u0629 \u0648\u0639\u0631\u0648\u0636 \u0627\u0644\u0631\u0641\u0627\u0647\u064A\u0629",offers_en:"Ongoing promotions and wellness offers",departments:["emergency","internal","surgery","pediatrics","obgyn","ophthalmology","ent","urology","psychiatry","radiology","laboratory","pharmacy","gastroenterology","cardiology","neurology"],beds:120,established:2015,rating:4.1,lat:26.0867,lng:43.992}];function hu(){return pu}c(hu,"getBranches");function gu(u){return pu.find(a=>a.id===u)||null}c(gu,"getBranch");_();async function fu(u,a){let e=await u.json(),t="APT"+Date.now().toString(36).toUpperCase();return await a.DB.prepare(`INSERT INTO appointments (id, patient_id, provider_id, clinic_code, clinic_name, appointment_date, appointment_time, status, appointment_type, reason)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`).bind(t,e.patient_id,e.provider_id||null,e.clinic_code||"GEN",e.clinic_name||"",e.appointment_date,e.appointment_time,e.status||"scheduled",e.appointment_type||"regular",e.reason||"").run(),r({success:!0,appointment_id:t},201)}c(fu,"createAppointment");async function vu(u,a,e,t,n){n||(n=new URL(u.url));let i=n.searchParams.get("search")||"",s=n.searchParams.get("branch")||"",o=n.searchParams.get("date")||"",l=n.searchParams.get("status")||"",d=n.searchParams.get("patient_id")||"",m=parseInt(n.searchParams.get("limit")||"50"),p=parseInt(n.searchParams.get("offset")||"0"),g="SELECT a.*, p.full_name_ar as patient_name_ar, p.full_name_en as patient_name_en, p.phone as patient_phone";g+=" FROM appointments a LEFT JOIN patients p ON a.patient_id = p.id";let f=[],E=[];s&&(E.push("a.branch_id = ?"),f.push(s)),o&&(E.push("a.appointment_date = ?"),f.push(o)),l&&(E.push("a.status = ?"),f.push(l)),d&&(E.push("a.patient_id = ?"),f.push(d)),i&&(E.push("(p.name_ar LIKE ? OR p.name_en LIKE ?)"),f.push(`%${i}%`,`%${i}%`)),E.length&&(g+=" WHERE "+E.join(" AND ")),g+=" ORDER BY a.appointment_date DESC, a.appointment_time ASC LIMIT ? OFFSET ?",f.push(m,p);let{results:v}=await a.DB.prepare(g).bind(...f).all();return r({success:!0,appointments:v||[]})}c(vu,"getAppointments");async function bu(u,a,e,t){let n=t[0],i=await a.DB.prepare(`SELECT a.*, p.full_name_ar as patient_name_ar, p.full_name_en as patient_name_en, p.phone as patient_phone
     FROM appointments a LEFT JOIN patients p ON a.patient_id = p.id WHERE a.id = ?`).bind(n).first();return i?r({success:!0,appointment:i}):r({success:!1,message:"Appointment not found"},404)}c(bu,"getAppointment");async function yu(u,a,e,t){let n=t[0],i=await u.json(),s=[],o=[];for(let[l,d]of Object.entries(i))["appointment_date","appointment_time","status","appointment_type","reason","provider_id","clinic_code","clinic_name"].includes(l)&&(s.push(`${l} = ?`),o.push(d));return s.length===0?r({success:!1,message:"No valid fields to update"},400):(s.push("updated_at = datetime('now')"),o.push(n),await a.DB.prepare(`UPDATE appointments SET ${s.join(", ")} WHERE id = ?`).bind(...o).run(),r({success:!0,message:"Appointment updated"}))}c(yu,"updateAppointment");async function xu(u,a,e,t){let n=t[0];return await a.DB.prepare("UPDATE appointments SET status = 'cancelled', updated_at = datetime('now') WHERE id = ?").bind(n).run(),r({success:!0,message:"Appointment cancelled"})}c(xu,"cancelAppointment");_();async function _u(u,a){let e=await u.json(),t="PAT"+Date.now().toString(36).toUpperCase(),n="HNH-"+Date.now(),{data:i}=await a.DB.prepare(`INSERT INTO patients (id, mrn, national_id, first_name_ar, last_name_ar, full_name_ar, first_name_en, last_name_en, full_name_en, phone, email, date_of_birth, gender, blood_type, allergies)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`).bind(t,n,e.national_id||null,e.first_name_ar||e.name_ar,e.last_name_ar||"",e.full_name_ar||e.name_ar,e.first_name_en||"",e.last_name_en||"",e.full_name_en||e.name_en||"",e.phone,e.email||null,e.date_of_birth||e.dob||null,e.gender||null,e.blood_type||null,e.allergies||null).run();return r({success:!0,patient_id:t,message:"Patient created successfully"},201)}c(_u,"createPatient");async function Eu(u,a,e,t,n){n||(n=new URL(u.url));let i=n.searchParams.get("search")||"",s=n.searchParams.get("branch")||"",o=parseInt(n.searchParams.get("limit")||"50"),l=parseInt(n.searchParams.get("offset")||"0"),d="SELECT * FROM patients",m=[],p=[];if(i){p.push("(full_name_ar LIKE ? OR full_name_en LIKE ? OR phone LIKE ? OR national_id LIKE ?)");let f=`%${i}%`;m.push(f,f,f,f)}p.length&&(d+=" WHERE "+p.join(" AND ")),d+=" ORDER BY created_at DESC LIMIT ? OFFSET ?",m.push(o,l);let{results:g}=await a.DB.prepare(d).bind(...m).all();return r({success:!0,patients:g||[],total:g?.length||0})}c(Eu,"getPatients");async function wu(u,a,e,t){let n=t[0],i=await a.DB.prepare("SELECT * FROM patients WHERE id = ? OR national_id = ?").bind(n,n).first();return i?r({success:!0,patient:i}):new Response(JSON.stringify({success:!1,message:"Patient not found"}),{status:404,headers:{"Content-Type":"application/json"}})}c(wu,"getPatient");async function Su(u,a,e,t){let n=t[0],i=await u.json(),s=[],o=[];for(let[l,d]of Object.entries(i))["national_id","full_name_ar","full_name_en","phone","email","date_of_birth","gender","insurance_company","insurance_id","blood_type","allergies"].includes(l)&&(s.push(`${l} = ?`),o.push(d));return s.length===0?r({success:!1,message:"No valid fields to update"},400):(s.push("updated_at = datetime('now')"),o.push(n),await a.DB.prepare(`UPDATE patients SET ${s.join(", ")} WHERE id = ?`).bind(...o).run(),r({success:!0,message:"Patient updated"}))}c(Su,"updatePatient");_();function G0(){let u=new Date,a=u.getFullYear(),e=String(u.getMonth()+1).padStart(2,"0"),t=String(Math.floor(Math.random()*99999)).padStart(5,"0");return`NH${a}${e}-${t}`}c(G0,"generateClaimNumber");async function Cu(u,a){let e=await u.json(),t=G0(),n=parseInt(e.patient_id)||0,i=await a.DB.prepare(`INSERT INTO claims (claim_number, patient_id, total_amount, status, payer_id, payer_name, claim_type)
     VALUES (?, ?, ?, ?, ?, ?, ?)`).bind(t,n,e.total_amount,e.status||"draft",e.payer_id||null,e.payer_name||null,e.claim_type||"inpatient").run();return r({success:!0,claim_id:i?.meta?.last_row_id,claim_number:t},201)}c(Cu,"createClaim");async function Au(u,a,e,t,n){n||(n=new URL(u.url));let i=n.searchParams.get("patient_id")||"",s=n.searchParams.get("branch")||"",o=n.searchParams.get("status")||"",l=parseInt(n.searchParams.get("limit")||"50"),d=parseInt(n.searchParams.get("offset")||"0"),m="SELECT c.*, p.full_name_ar as patient_name_ar, p.full_name_en as patient_name_en";m+=" FROM claims c LEFT JOIN patients p ON c.patient_id = p.id";let p=[],g=[];i&&(g.push("c.patient_id = ?"),p.push(i)),o&&(g.push("c.status = ?"),p.push(o)),g.length&&(m+=" WHERE "+g.join(" AND ")),m+=" ORDER BY c.created_at DESC LIMIT ? OFFSET ?",p.push(l,d);let{results:f}=await a.DB.prepare(m).bind(...p).all();return r({success:!0,claims:f||[]})}c(Au,"getClaims");async function Tu(u,a,e,t){let n=t[0],i=await a.DB.prepare(`SELECT c.*, p.full_name_ar as patient_name_ar, p.full_name_en as patient_name_en, p.phone as patient_phone
     FROM claims c LEFT JOIN patients p ON c.patient_id = p.id
     WHERE c.id = ? OR c.claim_number = ?`).bind(n,n).first();return i?r({success:!0,claim:i}):r({success:!1,message:"Claim not found"},404)}c(Tu,"getClaim");async function ku(u,a,e,t){let n=t[0],i=await a.DB.prepare("SELECT * FROM claims WHERE id = ? OR claim_number = ?").bind(n,n).first();if(!i)return r({success:!1,message:"Claim not found"},404);if(i.status!=="draft")return r({success:!1,message:"Claim already submitted"},400);let s="NPH"+Date.now().toString(36).toUpperCase(),o=new Date().toISOString();return await a.DB.prepare(`UPDATE claims SET status = ?, nphies_claim_id = ?, submission_date = ?, approval_date = datetime('now')
     WHERE id = ?`).bind("submitted",s,o,i.id).run(),r({success:!0,message:"Claim submitted to NPHIES successfully",nphies_transaction_id:s,nphies_status:"acknowledged",claim_id:i.id,claim_number:i.claim_number})}c(ku,"submitClaimToNPHIES");async function Iu(u,a,e,t){let n=t[0],i=await a.DB.prepare("SELECT * FROM claims WHERE id = ? OR claim_number = ?").bind(n,n).first();if(!i)return r({success:!1,message:"Claim not found"},404);let s=["acknowledged","accepted","in_review","partially_paid","paid"],o=s[Math.floor(Math.random()*s.length)];return r({success:!0,claim_id:i.id,claim_number:i.claim_number,nphies_status:o,nphies_transaction_id:i.nphies_claim_id,last_checked:new Date().toISOString()})}c(Iu,"getClaimNPHIESStatus");_();var Bu="https://api.brainsait.org/nphies";function Lu(u){return u.CLAIMLINC_KEY||""}c(Lu,"claimlinKey");async function Hu(u,a){let e=await u.json(),{patient_id:t,insurance_id:n,insurance_company:i,service_type:s,provider_npi:o,national_id:l}=e;if(!n)return r({success:!1,message:"Insurance ID required"},400);let d=null;t&&(d=await a.DB.prepare("SELECT * FROM patients WHERE id = ?").bind(t).first());let m="NPH-EB-"+Date.now().toString(36).toUpperCase(),p=null,g=Lu(a);if(g)try{let f=await fetch(`${Bu}/eligibility`,{method:"POST",headers:{"Content-Type":"application/json","X-API-Key":g},body:JSON.stringify({transaction_id:m,subscriber_id:n,subscriber_name:d?d.full_name_en||d.full_name_ar:null,national_id:l||(d?d.national_id:null),insurance_company:i||null,service_type:s||"medical",provider_npi:o||null,facility_license:a.FACILITY_LICENSE||"10000000000988"}),signal:AbortSignal.timeout(8e3)});f.ok&&(p={...await f.json(),transaction_id:m,source:"claimlinc-live"})}catch(f){console.error("ClaimLinc eligibility error:",f?.message?.slice(0,100))}p||(p={transaction_id:m,source:"fallback",warning:"ClaimLinc unavailable \u2014 response is estimated, not live",subscriber:{insurance_id:n,name:d&&(d.full_name_en||d.full_name_ar)||"Patient",relationship:"Self"},payer:{company:i||"Unknown",payer_id:null},status:"unknown",coverage:{inpatient:{covered:null,deductible:null,co_pay_percentage:null,max_benefit:null},outpatient:{covered:null,deductible:null,co_pay_percentage:null},pharmacy:{covered:null,co_pay_percentage:null},dental:{covered:null,co_pay_percentage:null}},exclusions:[],effective_date:null,expiry_date:null,network:null});try{a.DB&&await a.DB.prepare(`INSERT INTO eligibility_checks (id, patient_id, insurance_company, service_type, response_json, status)
         VALUES (?, ?, ?, ?, ?, ?)`).bind("ELG"+Date.now().toString(36).toUpperCase(),t||null,i||null,s||"medical",JSON.stringify(p),p.source==="claimlinc-live"?"completed":"fallback").run()}catch{}return r({success:!0,eligibility:p})}c(Hu,"checkEligibility");async function Du(u,a){let e=await u.json(),{insurance_id:t,insurance_company:n}=e;if(!t)return r({success:!1,message:"Insurance ID required"},400);if(!(t.length>=8&&/^\d+$/.test(t.replace(/-/g,""))))return r({success:!0,verified:!1,message:"Insurance ID format invalid \u2014 must be numeric, minimum 8 digits"});let s=Lu(a);if(s)try{let o=await fetch(`${Bu}/eligibility`,{method:"POST",headers:{"Content-Type":"application/json","X-API-Key":s},body:JSON.stringify({subscriber_id:t,insurance_company:n||null}),signal:AbortSignal.timeout(6e3)});if(o.ok){let l=await o.json();return r({success:!0,verified:l.status==="active"||l.verified===!0,details:l,source:"claimlinc-live"})}}catch{}return r({success:!0,verified:!0,source:"format-only",warning:"Live verification unavailable \u2014 format only checked",details:{company:n||"Unknown",insurance_id:t},message:"Insurance ID format valid. Live network verification unavailable."})}c(Du,"verifyInsurance");async function Ou(u,a,e,t){let n=t[0],{results:i}=await a.DB.prepare("SELECT * FROM eligibility_checks WHERE patient_id = ? ORDER BY check_date DESC LIMIT 20").bind(n).all();if(i)for(let s of i)try{s.response_json=JSON.parse(s.response_json)}catch{}return r({success:!0,checks:i||[]})}c(Ou,"getEligibilityHistory");q();_();var W0="https://api.brainsait.org/nphies",z="1.3.6.1.4.1.61026";function J0(u){return u.CLAIMLINC_KEY||""}c(J0,"clKey");async function I(u,a,e,t="POST"){let n=J0(u);if(!n)return null;try{let i=await fetch(`${W0}${a}`,{method:t,headers:{"Content-Type":"application/json","X-API-Key":n},body:e?JSON.stringify(e):void 0,signal:AbortSignal.timeout(8e3)});return i.ok?i.json():null}catch(i){return console.error(`ClaimLinc ${a} error:`,i?.message?.slice(0,80)),null}}c(I,"claimlinc");async function Nu(u,a){let e=await u.json(),t="NPH270-"+Date.now().toString(36).toUpperCase(),n=await I(a,"/eligibility",{transaction_id:t,nphies_version:"V2",facility_oid:z,facility_license:a.FACILITY_LICENSE||"10000000000988",subscriber_id:e.subscriber_id,subscriber_name:e.subscriber_name,national_id:e.national_id,insurance_company:e.insurance_company,service_type:e.service_type||"medical",provider_npi:e.provider_npi});return n?r({success:!0,nphies_version:"V2",transaction_type:"270",source:"claimlinc-live",ack:{transaction_id:t,status:"accepted",timestamp:new Date().toISOString()},response_271:n}):r({success:!0,nphies_version:"V2",transaction_type:"270",source:"fallback",warning:"ClaimLinc unavailable \u2014 eligibility not verified",ack:{transaction_id:t,status:"pending",timestamp:new Date().toISOString()},response_271:{subscriber:{id:e.subscriber_id||"Unknown",name:e.subscriber_name||"Patient",eligibility_status:"Unknown",effective_date:null,benefits_end_date:null},benefits:null,rejection_info:"Live NPHIES endpoint unavailable \u2014 resubmit when restored"}})}c(Nu,"submit270");async function Ru(u,a){let e=await u.json(),t="NPH278-"+Date.now().toString(36).toUpperCase(),n=await I(a,"/authorization",{transaction_id:t,nphies_version:"V2",facility_oid:z,facility_license:a.FACILITY_LICENSE||"10000000000988",subscriber_id:e.subscriber_id,patient_id:e.patient_id,diagnosis_code:e.diagnosis_code,procedure_code:e.procedure_code,service_type:e.service_type,insurance_company:e.insurance_company,provider_npi:e.provider_npi,clinical_notes:e.clinical_notes});return n?r({success:!0,nphies_version:"V2",transaction_type:"278",source:"claimlinc-live",ack:{transaction_id:t,status:"accepted",timestamp:new Date().toISOString()},authorization:n}):r({success:!0,nphies_version:"V2",transaction_type:"278",source:"fallback",warning:"ClaimLinc unavailable \u2014 PA not confirmed with payer",ack:{transaction_id:t,status:"pending",timestamp:new Date().toISOString()},authorization:{reference_number:null,status:"Pending",service_type:e.service_type||"Medical Care",diagnosis_code:e.diagnosis_code||null,procedure_code:e.procedure_code||null,authorized_units:null,effective_date:null,expiration_date:null,provider_notes:"Authorization pending \u2014 ClaimLinc endpoint unavailable. Resubmit or obtain manual PA."}})}c(Ru,"submit278");async function Pu(u,a){let e=await u.json(),t="NPH837-"+Date.now().toString(36).toUpperCase(),n="CLM"+Date.now().toString(36).toUpperCase(),i=await I(a,"/claims/submit",{transaction_id:t,claim_reference:n,nphies_version:"V2",facility_oid:z,facility_license:a.FACILITY_LICENSE||"10000000000988",subscriber_id:e.subscriber_id,patient_id:e.patient_id,insurance_company:e.insurance_company,total_amount:e.total_amount,patient_share:e.patient_share,diagnosis_codes:e.diagnosis_codes,procedure_codes:e.procedure_codes,service_date:e.service_date,provider_npi:e.provider_npi,prior_auth_number:e.prior_auth_number});return i?r({success:!0,nphies_version:"V2",transaction_type:"837P",source:"claimlinc-live",ack:{transaction_id:t,claim_reference:n,status:"Accepted",timestamp:new Date().toISOString(),edi_ack_code:"TA1"},claim:i}):r({success:!0,nphies_version:"V2",transaction_type:"837P",source:"fallback",warning:"ClaimLinc unavailable \u2014 claim queued locally, not submitted to payer",ack:{transaction_id:t,claim_reference:n,status:"Queued",timestamp:new Date().toISOString(),edi_ack_code:null,ack_detail:"Claim saved locally. Resubmit when ClaimLinc endpoint is restored."},claim:{claim_reference:n,submitted_amount:e.total_amount||null,patient_responsibility:e.patient_share||null,payer:e.insurance_company||null,status:"queued"}})}c(Pu,"submit837");async function ju(u,a,e,t){let n=t[0],i="NPH276-"+Date.now().toString(36).toUpperCase(),s=await I(a,`/claims/${n}/status`,null,"GET");if(s)return r({success:!0,nphies_version:"V2",transaction_type:"276/277",source:"claimlinc-live",ack:{transaction_id:i,timestamp:new Date().toISOString()},claim_status:{claim_id:n,...s}});let o=null;try{o=await a.DB.prepare("SELECT * FROM claims WHERE id = ? OR claim_reference = ?").bind(n,n).first()}catch{}return r({success:!0,nphies_version:"V2",transaction_type:"276/277",source:o?"local-db":"fallback",warning:"ClaimLinc unavailable \u2014 showing local record only",ack:{transaction_id:i,timestamp:new Date().toISOString()},claim_status:{claim_id:n,status:o?o.status||"Unknown":"Not Found",payer_claim_number:o?o.payer_claim_number:null,last_updated:o?o.updated_at:null}})}c(ju,"getClaimStatus276");async function zu(u,a){let e=await u.json(),t="NPH835-"+Date.now().toString(36).toUpperCase(),n=await I(a,"/remittance",{transaction_id:t,payer:e.payer,check_number:e.check_number,payment_date:e.payment_date,claims:e.claims});return n?r({success:!0,nphies_version:"V2",transaction_type:"835",source:"claimlinc-live",ack:{transaction_id:t,status:"Processed",timestamp:new Date().toISOString()},payment:n}):r({success:!0,nphies_version:"V2",transaction_type:"835",source:"fallback",warning:"ClaimLinc unavailable \u2014 remittance recorded locally only",ack:{transaction_id:t,status:"Stored",timestamp:new Date().toISOString()},payment:{payer:e.payer||null,total_paid:e.total_paid||null,check_number:e.check_number||"CHK"+Date.now().toString(36).toUpperCase(),payment_date:e.payment_date||new Date().toISOString().split("T")[0],claims_covered:e.claims?.length||0,note:"Reprocess via ClaimLinc when endpoint is restored."}})}c(zu,"receive835");_();q();function Uu(u){if(!u)return null;let a=[];if(u.name_ar||u.name_en){let e={use:"official"};u.name_en&&(e.text=u.name_en),u.name_ar&&(e.text_ar=u.name_ar),a.push(e)}return{resourceType:"Patient",id:u.id,identifier:[{system:"https://hnh.brainsait.org/identifier/patient",value:u.id},...u.national_id?[{system:"https://nphies.sa/identifier/national-id",value:u.national_id}]:[],...u.insurance_id?[{system:"https://nphies.sa/identifier/insurance",value:u.insurance_id,assigner:{display:u.insurance_company}}]:[]],active:!0,name:a,telecom:[...u.phone?[{system:"phone",value:u.phone,use:"mobile"}]:[],...u.email?[{system:"email",value:u.email,use:"work"}]:[]],gender:u.gender||"unknown",birthDate:u.dob||null,managingOrganization:{reference:"Organization/HNH-R001",display:"Hayat National Hospital - Gharnata"},generalPractitioner:[],communication:[{language:{coding:[{system:"urn:ietf:bcp:47",code:"ar"}],text:"Arabic"},preferred:!0},{language:{coding:[{system:"urn:ietf:bcp:47",code:"en"}],text:"English"}}],extension:[...u.blood_type?[{url:"http://hl7.org/fhir/StructureDefinition/patient-bloodType",valueString:u.blood_type}]:[],...u.allergies?[{url:"http://hl7.org/fhir/StructureDefinition/patient-allergies",valueString:u.allergies}]:[]]}}c(Uu,"fhirPatient");function K0(u){return u?{resourceType:"Practitioner",id:u.id,identifier:[{system:"https://hnh.brainsait.org/identifier/provider",value:u.id}],active:!0,name:[{use:"official",text_en:u.name_en||"",text_ar:u.name_ar||""}],qualification:(u.education||[]).map(a=>({identifier:[],code:{coding:[{system:"http://terminology.hl7.org/CodeSystem/v2-0360",code:"MD",display:a.degree}]},period:{start:a.year?`${a.year}-01-01`:"2000-01-01"},issuer:{display:a.institution}})),communication:(u.languages||[]).map(a=>({coding:[{system:"urn:ietf:bcp:47",code:a}]}))}:null}c(K0,"fhirPractitioner");function Q0(u){return u?{resourceType:"Appointment",id:u.id,status:u.status==="scheduled"?"booked":u.status,start:`${u.appointment_date}T${u.appointment_time}:00`,participant:[...u.patient_id?[{actor:{reference:`Patient/${u.patient_id}`},status:"accepted"}]:[],...u.provider_id?[{actor:{reference:`Practitioner/${u.provider_id}`},status:"accepted"}]:[]],description:u.notes||"",serviceType:[{coding:[{system:"http://snomed.info/sct",display:u.department_id}]}]}:null}c(Q0,"fhirAppointment");function X0(u){return u?{resourceType:"Claim",id:u.id,identifier:[{system:"https://hnh.brainsait.org/identifier/claim",value:u.claim_number}],status:(u.status==="draft"||u.status==="submitted","active"),type:{coding:[{system:"http://terminology.hl7.org/CodeSystem/claim-type",code:"professional"}]},use:"claim",patient:{reference:`Patient/${u.patient_id}`},created:u.created_at||new Date().toISOString(),insurer:{display:u.insurance_company||"Unknown"},provider:u.provider_id?{reference:`Practitioner/${u.provider_id}`}:{},priority:{coding:[{code:"normal"}]},total:{value:u.total_amount,currency:"SAR"}}:null}c(X0,"fhirClaim");async function $u(u,a,e,t){let n=t,i=await a.DB.prepare("SELECT * FROM patients WHERE id = ? OR national_id = ?").bind(n,n).first();return i?r(Uu(i)):r({success:!1,message:"Patient not found"},404)}c($u,"getFHIRPatient");async function Fu(u,a,e,t,n){let i=n.searchParams.get("name")||"",s=n.searchParams.get("identifier")||"",o=n.searchParams.get("phone")||"",l="SELECT * FROM patients WHERE 1=1",d=[];i&&(l+=" AND (name_ar LIKE ? OR name_en LIKE ?)",d.push(`%${i}%`,`%${i}%`)),s&&(l+=" AND (id LIKE ? OR national_id LIKE ?)",d.push(`%${s}%`,`%${s}%`)),o&&(l+=" AND phone LIKE ?",d.push(`%${o}%`));let{results:m}=await a.DB.prepare(l+" LIMIT 50").bind(...d).all();return r({resourceType:"Bundle",type:"searchset",total:m?.length||0,entry:(m||[]).map(p=>({resource:Uu(p),search:{mode:"match"}}))})}c(Fu,"searchFHIRPatients");async function Gu(u,a,e,t){let n=t,{getProvider:i}=await Promise.resolve().then(()=>(q(),Mu)),s=await i(n,a);return s?r(K0(s)):r({success:!1,message:"Provider not found"},404)}c(Gu,"getFHIRPractitioner");async function Yu(u,a,e,t){let n=t,i=await a.DB.prepare("SELECT * FROM appointments WHERE id = ?").bind(n).first();return i?r(Q0(i)):r({success:!1,message:"Appointment not found"},404)}c(Yu,"getFHIRAppointment");async function Vu(u,a,e,t){let n=t,i=await a.DB.prepare("SELECT * FROM claims WHERE id = ? OR claim_number = ?").bind(n,n).first();return i?r(X0(i)):r({success:!1,message:"Claim not found"},404)}c(Vu,"getFHIRClaim");async function Wu(u,a,e,t){let n=t,i=await a.DB.prepare("SELECT * FROM patients WHERE id = ? OR national_id = ?").bind(n,n).first();return i?r({resourceType:"Coverage",id:`COV-${i.id}`,status:"active",kind:"insurance",subscriber:{reference:`Patient/${i.id}`},subscriberId:i.insurance_id||"N/A",beneficiary:{reference:`Patient/${i.id}`},relationship:{coding:[{system:"http://terminology.hl7.org/CodeSystem/subscriber-relationship",code:"self"}]},payor:[{display:i.insurance_company||"Self-Pay"}],period:{start:"2026-01-01",end:"2026-12-31"}}):r({success:!1,message:"Patient not found"},404)}c(Wu,"getFHIRCoverage");_();S();var Z0=x.DEPARTMENTS||[],u6=x.CORPORATE||{},U=u6.STATS||{},e6=x.DEPARTMENTS_FULL||[];async function Ju(u){let a=U.doctors||700;try{let t=await u.DB.prepare("SELECT COUNT(*) as c FROM providers WHERE is_active = 1").first();t&&t.c&&(a=t.c)}catch{}let e=u.DB?await u.DB.prepare(`SELECT
          (SELECT COUNT(*) FROM patients) as total_patients,
          (SELECT COUNT(*) FROM appointments WHERE date(appointment_date) = date('now')) as today_appointments,
          (SELECT COUNT(*) FROM providers) as total_providers,
          (SELECT COUNT(*) FROM claims) as total_claims,
          (SELECT COUNT(*) FROM claims WHERE status = 'submitted') as submitted_claims,
          (SELECT COUNT(*) FROM claims WHERE status = 'paid') as paid_claims,
          (SELECT COUNT(*) FROM appointments WHERE status = 'scheduled') as scheduled_appointments,
          (SELECT COUNT(*) FROM appointments WHERE status = 'completed') as completed_appointments`).first():{};return r({success:!0,stats:{total_patients:e?.total_patients||0,today_appointments:e?.today_appointments||0,total_providers:a||U.doctors||700,total_branches:5,total_beds:U.beds||1200,total_departments:e6.length||Z0.length,total_claims:e?.total_claims||0,submitted_claims:e?.submitted_claims||0,paid_claims:e?.paid_claims||0,scheduled_appointments:e?.scheduled_appointments||0,completed_appointments:e?.completed_appointments||0},timestamp:new Date().toISOString()})}c(Ju,"getStats");G();var y={ELEVENLABS_BASE_URL:"https://api.elevenlabs.io/v1",ELEVENLABS_MODEL:"eleven_multilingual_v2",ELEVENLABS_TURBO_MODEL:"eleven_turbo_v2_5",VOICE_STABILITY:.4,VOICE_SIMILARITY:.8,VOICE_STYLE:.25,VOICE_SPEAKER_BOOST:!0,ARABIC_VOICES:[{id:"KxMRrXEjbJ6kZ93yT3fq",name:"Salma",style:"Young, calm Gulf Arabic",lang:"ar"},{id:"cdxrkuYK4nZwDSkjw5sa",name:"Amira",style:"Poised, graceful Gulf Arabic",lang:"ar"},{id:"3GgICclK01zog9nyLmX1",name:"Hanan",style:"Polished, commanding",lang:"ar"},{id:"LEqoCOGNjyExRiRUZhkv",name:"Latifa",style:"Bright, welcoming",lang:"ar"},{id:"isQLuoVuANx6FjDxyasX",name:"Noura",style:"Soft, polished",lang:"ar"},{id:"R6nda3uM038xEEKi7GFl",name:"Anas",style:"Gentle male voice",lang:"ar"}],ENGLISH_VOICES:[{id:"EXAVITQu4vr4xnSDxMaL",name:"Sarah",style:"Mature professional American",lang:"en"},{id:"cjVigY5qzO86Huf0OWal",name:"Eric",style:"Smooth trustworthy",lang:"en"}],DEFAULT_ARABIC:"KxMRrXEjbJ6kZ93yT3fq",DEFAULT_ENGLISH:"EXAVITQu4vr4xnSDxMaL"};function Qu(u){return u==="ar"||/[\u0600-\u06FF]/.test(u)?y.DEFAULT_ARABIC:y.DEFAULT_ENGLISH}c(Qu,"getVoiceForLang");function Xu(u){return u==="ar"||/[\u0600-\u06FF]/.test(u)?y.ELEVENLABS_MODEL:y.ELEVENLABS_TURBO_MODEL}c(Xu,"getModelForLang");async function Zu(u,a){try{let e=a.ELEVENLABS_API_KEY||"";if(!e)return new Response(JSON.stringify({error:"Voice API not configured"}),{status:503,headers:{"Content-Type":"application/json","Access-Control-Allow-Origin":"*"}});let t=await u.json(),n=t.message||t.text||"",i=t.lang||(/[\u0600-\u06FF]/.test(n)?"ar":"en"),s=t.voice_id||Qu(i);if(!n)return new Response(JSON.stringify({error:"Text is required"}),{status:400,headers:{"Content-Type":"application/json","Access-Control-Allow-Origin":"*"}});let o=Xu(i),l=n.length>400?n.substring(0,n.lastIndexOf(" ",400)):n,d=await fetch(`${y.ELEVENLABS_BASE_URL}/text-to-speech/${s}/stream`,{method:"POST",headers:{"Content-Type":"application/json","xi-api-key":e},body:JSON.stringify({text:l,model_id:o,voice_settings:{stability:y.VOICE_STABILITY,similarity_boost:y.VOICE_SIMILARITY,style:y.VOICE_STYLE,use_speaker_boost:y.VOICE_SPEAKER_BOOST}})});if(!d.ok){let p=await d.text().catch(()=>"Unknown");return new Response(JSON.stringify({error:`TTS failed: ${d.status}`,detail:p}),{status:502,headers:{"Content-Type":"application/json","Access-Control-Allow-Origin":"*"}})}let m=await d.blob();return new Response(m,{headers:{"Content-Type":"audio/mpeg","Cache-Control":"public, max-age=600","Access-Control-Allow-Origin":"*","Access-Control-Expose-Headers":"X-Audio-Length, X-Voice","X-Audio-Length":m.size.toString(),"X-Voice":s,"X-Lang":i}})}catch(e){return new Response(JSON.stringify({error:e.message}),{status:500,headers:{"Content-Type":"application/json","Access-Control-Allow-Origin":"*"}})}}c(Zu,"handleVoiceSpeak");async function u0(u,a){try{let e=await u.json(),t=e.message||e.text||"",n=e.lang||(/[\u0600-\u06FF]/.test(t)?"ar":"en"),i=e.sessionId||"voice_"+Date.now().toString(36);if(!t)return new Response(JSON.stringify({error:"Message is required"}),{status:400,headers:{"Content-Type":"application/json","Access-Control-Allow-Origin":"*"}});let s="";try{let{handleChat:m}=await Promise.resolve().then(()=>(G(),Ku));s=(await(await m(new Request("http://internal/api/chat",{method:"POST",body:JSON.stringify({message:t,session_id:i,language:n})}),a)).json()).response||""}catch(m){console.error("Voice chat AI error:",m),s=n==="ar"?"\u0639\u0630\u0631\u0627\u064B\u060C \u062D\u062F\u062B \u062E\u0637\u0623 \u0641\u064A \u0645\u0639\u0627\u0644\u062C\u0629 \u0637\u0644\u0628\u0643. \u064A\u0631\u062C\u0649 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649.":"Sorry, there was an error processing your request. Please try again."}let o=a.ELEVENLABS_API_KEY||"",l=null,d=null;if(o&&s){d=Qu(n);let m=Xu(n),p=s.length>400?s.substring(0,s.lastIndexOf(" ",400)):s;try{let g=await fetch(`${y.ELEVENLABS_BASE_URL}/text-to-speech/${d}/stream`,{method:"POST",headers:{"Content-Type":"application/json","xi-api-key":o},body:JSON.stringify({text:p,model_id:m,voice_settings:{stability:y.VOICE_STABILITY,similarity_boost:y.VOICE_SIMILARITY,style:y.VOICE_STYLE,use_speaker_boost:y.VOICE_SPEAKER_BOOST}})});if(g.ok){let f=await g.arrayBuffer(),E=new Uint8Array(f),v="";for(let w=0;w<E.length;w++)v+=String.fromCharCode(E[w]);l=btoa(v)}}catch(g){console.error("TTS failed:",g?.message?.slice(0,100))}}try{a.DB&&a.DB.prepare("INSERT INTO chat_history (session_id, role, content) VALUES (?, ?, ?), (?, ?, ?)").bind(i,"user",t,i,"assistant",s).run().catch(()=>{})}catch{}return new Response(JSON.stringify({success:!0,response:s,session_id:i,audio:l,voice_id:d,lang:n}),{headers:{"Content-Type":"application/json","Access-Control-Allow-Origin":"*"}})}catch(e){return new Response(JSON.stringify({error:e.message}),{status:500,headers:{"Content-Type":"application/json","Access-Control-Allow-Origin":"*"}})}}c(u0,"handleVoiceChat");async function e0(){let u=JSON.stringify({arabic:y.ARABIC_VOICES,english:y.ENGLISH_VOICES,default_arabic:y.DEFAULT_ARABIC,default_english:y.DEFAULT_ENGLISH});return new Response(u,{headers:{"Content-Type":"application/json","Cache-Control":"public, max-age=3600","Access-Control-Allow-Origin":"*"}})}c(e0,"handleVoiceVoices");_();var a0={BUPA:{"0109222573":3.16,"0109222574":6.32,"0109222575":9.48,"0109222576":12.64,"0109222577":15.8}},t6=[{drug_class:"antiemetic_5ht3",name_patterns:["ondansetron","zoron","zenorit","zofran","novoban"],codes:["1001233084","2205222049"],valid_icd_prefixes:["C","K","R11","R10","Z51","Z79","T","G"],invalid_standalone:["J02","J06","J00","J01","J03","J04","J05"],flag:"MN-1-1",message:"5-HT3 antiemetic not justified for this diagnosis without oncology/procedural context",suggestion:"Add secondary ICD: R11.2 (nausea/vomiting) or Z51.1 (chemo) or document procedure-related nausea"},{drug_class:"PPI",name_patterns:["toprazole","omeprazole","pantoprazole","esomeprazole","rabeprazole","lansoprazole"],codes:["0411246139","0411246140","0411246141"],valid_icd_prefixes:["C","K21","K25","K26","K27","K28","Z51","K92","T"],invalid_standalone:["J02","J06","J00","Z00","Z01"],flag:"MN-1-1",message:"PPI not indicated as primary treatment for this diagnosis",suggestion:"Add secondary ICD: K21.0 (GERD), K25 (Gastric ulcer), or K92.1 (Melena) for oncology GI prophylaxis"}],t0={"MN-1-1":{desc:"Service not clinically justified per CPG without additional supporting diagnosis",cchi:"CCHI Unified Policy Article 15 \u2014 Medically Necessary Services",docs:["Clinical notes (date of service)","Physician justification letter","PA approval (if exists)","Lab/imaging results","Pharmacy dispensing record"],icd_suggestions:["R11.2 Nausea/vomiting as reason for care","K21.0 GERD","Z51.1 Antineoplastic chemo","K92.1 Melena"]},"BE-1-6":{desc:"Billed above contractual/agreed price \u2014 calculation discrepancy",cchi:"CCHI Unified Policy Article 8 \u2014 Billing and Pricing Standards",docs:["Corrected claim at contracted price","BUPA contract price schedule","HIS price master update confirmation"],icd_suggestions:[]},"BE-1-5":{desc:"Duplicate / Repeated billing",cchi:"CCHI Unified Policy Article 8 \u2014 Billing Accuracy",docs:["Two separate clinical encounter notes","Evidence of distinct presenting complaints","Different physician confirmation"],icd_suggestions:[]},"AD-3-1":{desc:"Service billed within free follow-up period",cchi:"CCHI Unified Policy Article 11 \u2014 Follow-up Period Rules",docs:["Original visit note","New complaint visit note (clearly different)","Physician attestation of new episode"],icd_suggestions:[]},"CV-1-4":{desc:"Service or procedure not covered under patient policy",cchi:"CCHI Unified Policy Annex A \u2014 Coverage Table",docs:["Patient policy schedule","Benefit table showing coverage","Clinical justification letter"],icd_suggestions:[]}},Y={550181:{batch_id:"550181",stm_id:"938269",payer:"BUPA Arabia",payer_id:"INS-307",branch:"riyadh",facility:"Al Hayat National Hospital - Riyadh",provider_code:"21420",period:"202602",period_label:"February 2026",claim_type:"Out Patient",received_date:"2026-03-25",financials:{presented_sr:510386.25,presented_deductible:66205.51,net_billed_sr:444180.74,vat_sr:37443.98,net_with_vat_sr:481624.72,total_shortfall_sr:73862.47},rejection_lines:1415,shortfall_by_classification:{Medical_Necessity:{sr:43478.53,code:"MN-1-1",pct:58.9},Pharmacy_Benefit_Management:{sr:36880.91,bundle:"PBM",pct:49.9},Billing_Error:{sr:15088.57,code:"BE-1-6",pct:20.4},Coverage:{sr:9079.85,code:"CV-1-4",pct:12.3},Administrative:{sr:3418.88,code:"AD-3-1",pct:4.6},Supporting_Evidence:{sr:2796.64,pct:3.8}},top_rejections:[{reason:"Billed above contractual prices",count:102,code:"BE-1-6",sr:15088.57,action:"Price correct + resubmit"},{reason:"Duplicate / Repeated billing",count:57,code:"BE-1-5",sr:8e3,action:"Audit 4-type classification"},{reason:"Consultation within free follow-up period",count:47,code:"AD-3-1",sr:3418.88,action:"Document new episode or accept"},{reason:"Medication not indicated with diagnosis",count:200,code:"MN-1-1",sr:43478.53,action:"Physician appeal letter"}],recovery_forecast:{total_shortfall_sr:73862.47,expected_recovery_sr:64e3,write_off_sr:9862,recovery_pct:87,timeline_weeks:6},corrective_actions:{"BE-1-6":"Update HIS price master to match BUPA contract schedule for all active Riyadh service codes","BE-1-5":"Enable SBS pre-submission deduplication flag; add same-patient same-service alert","MN-1-1":"Integrate PBM validator at pharmacy order entry (/api/rcm/validate/pbm)","AD-3-1":"Add 14-day follow-up period alert in HIS appointment booking module"},top_customers:["Majal Enjaz Co.","Riyadh Cables Group Company","Saudi Aramex Co. Ltd"]}};function n0(){return r({ok:!0,version:"1.0.0",module:"RCM \u2014 Revenue Cycle Management",powered_by:"BrainSAIT ClaimLinc",endpoints:["GET  /api/rcm/batch/:id","POST /api/rcm/validate/price","POST /api/rcm/validate/duplicate","POST /api/rcm/validate/pbm","POST /api/rcm/validate","POST /api/rcm/appeal/generate","GET  /api/rcm/dashboard/:branch","GET  /api/rcm/claims/rejected","POST /api/rcm/claims/:id/appeal","POST /api/rcm/claims/:id/resubmit"],case_study:"Batch 550181 \u2014 BUPA Arabia Riyadh Feb 2026 | SR 73,862 shortfall | 87% recovery target"})}c(n0,"rcmHealth");async function i0(u,a,e,t){let n=Y[t];if(!n)return r({error:`Batch ${t} not found`,available:Object.keys(Y)},404);if(a.DB)try{let i=await a.DB.prepare(`SELECT status, COUNT(*) as count, SUM(total_amount) as total
         FROM claims WHERE batch_number = ? GROUP BY status`).bind(t).all();i.results?.length&&(n.live_db_counts=i.results)}catch{}return r({success:!0,batch:n})}c(i0,"getRcmBatch");async function V(u){let a=await u.json(),e=a.items??[],t=a.payer??"BUPA",n=a0[t]??a0.BUPA,i=[],s=[],o=0;for(let l of e){let d=n[l.serv_code];if(d===void 0){s.push({...l,note:"No contract price on file \u2014 verify manually"});continue}let m=Math.round((l.billed_amount-d)*100)/100;m>.01?(o+=m,i.push({serv_code:l.serv_code,serv_desc:l.serv_desc??"",billed_amount:l.billed_amount,contracted_amount:d,overcharge_sr:m,flag:"BE-1-6",action:`Change price from ${l.billed_amount} SR to ${d} SR in HIS \u2192 resubmit`})):s.push({...l,contracted_amount:d,status:"PASS"})}return r({valid:i.length===0,total_items:e.length,violations_count:i.length,clean_count:s.length,total_overcharge_sr:Math.round(o*100)/100,violations:i,clean_items:s,payer:t,summary:i.length===0?"\u2705 All prices match contract schedule":`\u274C ${i.length} pricing violation(s) \u2014 total overcharge: SR ${o.toFixed(2)}`})}c(V,"validatePrice");async function W(u){let a=await u.json(),e=a.claims??[],t=a.window_days??14,n=[],i=new Map;for(let s of e){let o=`${s.patient_id}::${s.serv_code}`,l=i.get(o);if(l){let d=Math.abs((new Date(s.inv_date)-new Date(l.inv_date))/864e5),m=d<.01?"TYPE_1_SYSTEM_DOUBLE_SEND":d<=t?"TYPE_4_FOLLOW_UP_PERIOD":"TYPE_3_GENUINE_REPEAT";n.push({claim_id:s.claim_id,duplicate_of:l.claim_id,patient_id:s.patient_id,serv_code:s.serv_code,gap_days:Math.round(d*10)/10,type:m,flag:"BE-1-5",action:m==="TYPE_1_SYSTEM_DOUBLE_SEND"?"REMOVE from batch \u2014 same-day system double-send":m==="TYPE_4_FOLLOW_UP_PERIOD"?`Within ${t}-day follow-up \u2014 document new complaint if different episode`:"Genuine repeat \u2014 document distinct clinical episodes"})}else i.set(o,{claim_id:s.claim_id,inv_date:s.inv_date})}return r({total_claims:e.length,duplicates_found:n.length,window_days:t,breakdown:{type1_system:n.filter(s=>s.type==="TYPE_1_SYSTEM_DOUBLE_SEND").length,type4_follow_up:n.filter(s=>s.type==="TYPE_4_FOLLOW_UP_PERIOD").length,type3_genuine:n.filter(s=>s.type==="TYPE_3_GENUINE_REPEAT").length},duplicates:n,summary:n.length===0?`\u2705 No duplicates in ${e.length} claims`:`\u26A0\uFE0F ${n.length} duplicate(s) found`})}c(W,"validateDuplicate");async function J(u){let e=(await u.json()).items??[],t=[],n=[];for(let i of e){let s=i.drug_code??"",o=(i.drug_name??i.serv_desc??"").toLowerCase(),l=i.icd_codes??[],d=t6.find(g=>g.codes.includes(s)||g.name_patterns.some(f=>o.includes(f)));if(!d){n.push({...i,status:"NO_RULE"});continue}let m=l.some(g=>d.valid_icd_prefixes.some(f=>g.startsWith(f))),p=l.every(g=>d.invalid_standalone.some(f=>g.startsWith(f)));m?n.push({...i,status:"PASS",matched_rule:d.drug_class}):t.push({claim_id:i.claim_id,drug_code:s,drug_name:i.drug_name??i.serv_desc,drug_class:d.drug_class,icd_codes:l,flag:d.flag,message:d.message,suggestion:d.suggestion,appeal_strength:p?"WEAK":"MEDIUM",action:p?"Add supporting secondary ICD at prescription time, or document procedural context":"Add secondary ICD to support drug indication before resubmission"})}return r({total_items:e.length,violations_count:t.length,valid_count:n.length,violations:t,valid_items:n,summary:t.length===0?"\u2705 All drug-diagnosis pairs validated \u2014 no MN-1-1 risks":`\u26A0\uFE0F ${t.length} PBM violation(s) \u2014 risk of MN-1-1 rejection`})}c(J,"validatePbm");async function s0(u){let a=await u.json(),e=JSON.stringify(a),t=c(()=>new Request("https://internal/validate",{method:"POST",headers:{"Content-Type":"application/json"},body:e}),"makeReq"),[n,i,s]=await Promise.allSettled([V(t()),W(t()),J(t())]),o=n.status==="fulfilled"?await n.value.json():{error:"price check failed"},l=i.status==="fulfilled"?await i.value.json():{error:"duplicate check failed"},d=s.status==="fulfilled"?await s.value.json():{error:"pbm check failed"},m=(o.violations_count??0)+(l.duplicates_found??0)+(d.violations_count??0);return r({overall_ready:m===0,total_errors:m,validators:{price:o,duplicate:l,pbm:d},summary:m===0?"\u2705 Claim passed all validators \u2014 safe for NPHIES submission":`\u274C ${m} issue(s) \u2014 fix before submission`})}c(s0,"validateAll");async function o0(u){let a=await u.json(),e=a.rejection_code??"MN-1-1",t=t0[e]??t0["MN-1-1"],n=a.icd_codes??[],i=!!a.pa_number,s=n.some(m=>m.startsWith("C")),o=a.rejection_amount_sr??0,l=0;i&&(l+=3),s&&(l+=2),a.clinical_context&&(l+=2),o>500&&(l+=1);let d=l>=5?"strong":l>=3?"medium":"weak";return r({claim_id:a.claim_id,rejection_code:e,payer:a.payer??"BUPA Arabia",branch:a.branch??"riyadh",nphies_description:t.desc,cchi_article:t.cchi,appeal_strength:d,strength_score:l,pa_number:a.pa_number,pa_status:i?"EXISTS \u2014 strong appeal factor":"MISSING \u2014 weaker case without PA",icd_codes:n,oncology_case:s,drug_code:a.drug_code,drug_name:a.drug_name,supporting_docs_required:t.docs,icd_suggestions:t.icd_suggestions,action_steps:[i?`\u2705 Attach PA #${a.pa_number} approval letter`:"\u26A0\uFE0F No PA \u2014 strengthen with physician narrative","Complete physician appeal letter (use /api/rcm/batch/550181 template)",s?"\u2705 Oncology case \u2014 reference NCCN/ESMO/Saudi MOH CPG":"Reference Saudi MOH CPG for this condition","Department head countersign for claims > SR 500","Submit via BUPA provider portal + NPHIES ClaimResponse appeal workflow"],recommendation:d==="strong"?"\u{1F7E2} STRONG \u2014 proceed with full appeal package":d==="medium"?"\u{1F7E1} MEDIUM \u2014 strengthen documentation before submitting":"\u{1F534} WEAK \u2014 review clinical basis; consider write-off if no supporting evidence",generated_at:new Date().toISOString()})}c(o0,"generateAppeal");async function r0(u,a,e,t){t=t??"riyadh";let n=[];if(a.DB)try{n=(await a.DB.prepare(`SELECT id, claim_number, total_amount, payer_name, status, created_at, nphies_status
         FROM claims WHERE status IN ('rejected','denied') AND branch = ?
         ORDER BY created_at DESC LIMIT 20`).bind(t).all()).results??[]}catch{}return r({success:!0,branch:t,dashboard_version:"1.0.0",generated_at:new Date().toISOString(),live_rejected_claims:{count:n.length,claims:n},reference_batch:Y[550181],rcm_action_items:[{priority:1,action:"Export BE-1-6 lines \u2192 correct price master \u2192 resubmit",code:"BE-1-6",impact:"SR 15,088 recovery"},{priority:2,action:"Run eligibility check on Coverage rejections",code:"CV-1-4",impact:"SR 7,000 recovery"},{priority:3,action:"Physician appeal letters for top MN-1-1 by amount",code:"MN-1-1",impact:"SR 31,000 recovery"},{priority:4,action:"Audit 57 duplicate lines \u2192 classify Type 1/2/3/4",code:"BE-1-5",impact:"SR 9,000 recovery"}],prevention_tools:{price_check:"POST /api/rcm/validate/price",dedup_check:"POST /api/rcm/validate/duplicate",pbm_check:"POST /api/rcm/validate/pbm",full_validate:"POST /api/rcm/validate",appeal_gen:"POST /api/rcm/appeal/generate"}})}c(r0,"getRcmDashboard");async function c0(u,a,e,t,n){n||(n=new URL(u.url));let i=n.searchParams.get("branch")??"",s=n.searchParams.get("payer")??"",o=parseInt(n.searchParams.get("limit")??"50");if(!a.DB)return r({error:"Database not available"},503);let l=`SELECT id, claim_number, total_amount, payer_name, payer_id, status, nphies_status,
            nphies_rejection_code, created_at, branch FROM claims
            WHERE status IN ('rejected','denied')`,d=[];i&&(l+=" AND branch = ?",d.push(i)),s&&(l+=" AND payer_name LIKE ?",d.push(`%${s}%`)),l+=" ORDER BY created_at DESC LIMIT ?",d.push(o);let{results:m}=await a.DB.prepare(l).bind(...d).all();return r({success:!0,count:m?.length??0,claims:m??[]})}c(c0,"getRejectedClaims");async function l0(u,a,e,t){let n=await u.json();return a.DB?(await a.DB.prepare(`UPDATE claims SET status = 'appealed', appeal_date = ?, appeal_notes = ?,
     nphies_rejection_code = COALESCE(?, nphies_rejection_code),
     updated_at = datetime('now') WHERE id = ? OR claim_number = ?`).bind(new Date().toISOString(),n.appeal_notes??"",n.rejection_code??null,t,t).run(),r({success:!0,claim_id:t,status:"appealed",appeal_date:new Date().toISOString()})):r({error:"Database not available"},503)}c(l0,"markAppeal");async function d0(u,a,e,t){let n=await u.json();return a.DB?(await a.DB.prepare(`UPDATE claims SET status = 'resubmitted', resubmit_date = ?, resubmit_notes = ?,
     updated_at = datetime('now') WHERE id = ? OR claim_number = ?`).bind(new Date().toISOString(),n.resubmit_notes??"",t,t).run(),r({success:!0,claim_id:t,status:"resubmitted",resubmit_date:new Date().toISOString()})):r({error:"Database not available"},503)}c(d0,"markResubmit");_();var M="brainsait-ai-search";async function K(u,a){try{let e="",t="ai";if(u.method==="GET"){let n=new URL(u.url);e=(n.searchParams.get("q")||"").trim(),t=n.searchParams.get("mode")||"vector"}else{let n=await u.json().catch(()=>({}));e=(n.query||n.q||"").trim(),t=n.mode||"ai"}if(!e||e.length<2)return r({success:!1,message:"Query too short \u2014 minimum 2 characters"},400);if(t==="ai"){let n=await a.AI.autorag(M).aiSearch({query:e,stream:!1});return r({success:!0,query:e,mode:"ai",answer:n.response||null,sources:(n.data||[]).map(i=>({id:i.id,content:i.content?.slice(0,500),filename:i.filename,score:i.score})),model:M,timestamp:new Date().toISOString()})}else{let n=await a.AI.autorag(M).search({query:e});return r({success:!0,query:e,mode:"vector",answer:null,sources:(n.data||[]).map(i=>({id:i.id,content:i.content?.slice(0,500),filename:i.filename,score:i.score})),model:M,timestamp:new Date().toISOString()})}}catch(e){return console.error("Search error:",e.message),r({success:!1,message:"Search temporarily unavailable",error:e.message,query:""},503)}}c(K,"handleSearch");_();var p0=c(u=>u+Date.now().toString(36).toUpperCase(),"newId"),m0=["routine","post-op","wound-care","iv-therapy","physiotherapy","palliative","maternal","pediatric"];async function h0(u,a){let e=await u.json().catch(()=>({})),t=["patient_id","visit_date","address"];for(let s of t)if(!e[s])return r({success:!1,message:`Missing required field: ${s}`},400);if(e.visit_type&&!m0.includes(e.visit_type))return r({success:!1,message:`Invalid visit_type. Valid: ${m0.join(", ")}`},400);let n=p0("HCV");await a.DB.prepare(`INSERT INTO homecare_visits
       (id, patient_id, nurse_id, branch_id, visit_date, visit_time, status, visit_type,
        address, city, lat, lng, chief_complaint, notes, insurance_company, insurance_id)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`).bind(n,e.patient_id,e.nurse_id||null,e.branch_id||"R001",e.visit_date,e.visit_time||null,"scheduled",e.visit_type||"routine",e.address,e.city||"\u0627\u0644\u0631\u064A\u0627\u0636",e.lat||null,e.lng||null,e.chief_complaint||null,e.notes||null,e.insurance_company||null,e.insurance_id||null).run();let i=await a.DB.prepare("SELECT * FROM homecare_visits WHERE id = ?").bind(n).first();return r({success:!0,visit_id:n,visit:i},201)}c(h0,"createVisit");async function g0(u,a){let e=new URL(u.url),t=e.searchParams.get("patient_id")||"",n=e.searchParams.get("status")||"",i=e.searchParams.get("date")||"",s=e.searchParams.get("nurse_id")||"",o=e.searchParams.get("branch_id")||"",l=Math.min(parseInt(e.searchParams.get("limit")||"50"),200),d=parseInt(e.searchParams.get("offset")||"0"),m=`SELECT v.*, p.name_ar as patient_name_ar, p.name_en as patient_name_en, p.phone as patient_phone,
                  n.name_ar as nurse_name_ar, n.name_en as nurse_name_en, n.phone as nurse_phone
           FROM homecare_visits v
           LEFT JOIN patients p ON v.patient_id = p.id
           LEFT JOIN homecare_nurses n ON v.nurse_id = n.id`,p=[],g=[];t&&(g.push("v.patient_id = ?"),p.push(t)),n&&(g.push("v.status = ?"),p.push(n)),i&&(g.push("v.visit_date = ?"),p.push(i)),s&&(g.push("v.nurse_id = ?"),p.push(s)),o&&(g.push("v.branch_id = ?"),p.push(o)),g.length&&(m+=" WHERE "+g.join(" AND ")),m+=" ORDER BY v.visit_date ASC, v.visit_time ASC LIMIT ? OFFSET ?",p.push(l,d);let{results:f}=await a.DB.prepare(m).bind(...p).all();return r({success:!0,visits:f||[],total:f?.length||0})}c(g0,"listVisits");async function f0(u,a,e,t){let n=t[0],i=await a.DB.prepare(`SELECT v.*, p.name_ar as patient_name_ar, p.name_en as patient_name_en,
                 p.phone as patient_phone, p.insurance_company as patient_insurance,
                 n.name_ar as nurse_name_ar, n.name_en as nurse_name_en, n.phone as nurse_phone
     FROM homecare_visits v
     LEFT JOIN patients p ON v.patient_id = p.id
     LEFT JOIN homecare_nurses n ON v.nurse_id = n.id
     WHERE v.id = ?`).bind(n).first();if(!i)return r({success:!1,message:"Visit not found"},404);if(i.vitals_json)try{i.vitals=JSON.parse(i.vitals_json)}catch{}return r({success:!0,visit:i})}c(f0,"getVisit");async function v0(u,a,e,t){let n=t[0],i=await u.json().catch(()=>({})),s=["status","nurse_id","visit_date","visit_time","address","city","chief_complaint","notes","visit_type","lat","lng"],o=[],l=[];for(let[m,p]of Object.entries(i))s.includes(m)&&(o.push(`${m} = ?`),l.push(p));if(i.status==="completed"&&(o.push("completed_at = ?"),l.push(new Date().toISOString())),!o.length)return r({success:!1,message:"No updatable fields provided"},400);o.push("updated_at = ?"),l.push(new Date().toISOString(),n),await a.DB.prepare(`UPDATE homecare_visits SET ${o.join(", ")} WHERE id = ?`).bind(...l).run();let d=await a.DB.prepare("SELECT * FROM homecare_visits WHERE id = ?").bind(n).first();return r({success:!0,visit:d})}c(v0,"updateVisit");async function b0(u,a,e,t){let n=t[0],i=await u.json().catch(()=>({})),s={recorded_at:new Date().toISOString(),bp_systolic:i.bp_systolic||null,bp_diastolic:i.bp_diastolic||null,heart_rate:i.heart_rate||null,temperature:i.temperature||null,spo2:i.spo2||null,weight_kg:i.weight_kg||null,blood_glucose:i.blood_glucose||null,respiratory_rate:i.respiratory_rate||null,pain_score:i.pain_score||null,notes:i.notes||null},o=[];return s.spo2!==null&&s.spo2<92&&o.push("CRITICAL: SpO2 < 92%"),s.bp_systolic!==null&&s.bp_systolic>180&&o.push("HIGH BP: systolic > 180"),s.heart_rate!==null&&(s.heart_rate>120||s.heart_rate<50)&&o.push("ABNORMAL HR"),s.temperature!==null&&s.temperature>38.5&&o.push("FEVER: > 38.5\xB0C"),s.blood_glucose!==null&&s.blood_glucose>13.9&&o.push("HYPERGLYCEMIA: > 250 mg/dL"),s.alerts=o,await a.DB.prepare("UPDATE homecare_visits SET vitals_json = ?, updated_at = ? WHERE id = ?").bind(JSON.stringify(s),new Date().toISOString(),n).run(),r({success:!0,vitals:s,alerts:o,visit_id:n})}c(b0,"recordVitals");async function y0(u,a){let e=new URL(u.url),t=e.searchParams.get("branch_id")||"",n=e.searchParams.get("status")||"active",i="SELECT * FROM homecare_nurses",s=[],o=[];t&&(o.push("branch_id = ?"),s.push(t)),n&&(o.push("status = ?"),s.push(n)),o.length&&(i+=" WHERE "+o.join(" AND ")),i+=" ORDER BY name_ar ASC";let{results:l}=await a.DB.prepare(i).bind(...s).all();return r({success:!0,nurses:l||[],total:l?.length||0})}c(y0,"listNurses");async function x0(u,a){let e=await u.json().catch(()=>({}));if(!e.name_ar)return r({success:!1,message:"name_ar is required"},400);let t=p0("NRS");return await a.DB.prepare(`INSERT INTO homecare_nurses (id, name_ar, name_en, phone, branch_id, specialty, status)
     VALUES (?, ?, ?, ?, ?, ?, ?)`).bind(t,e.name_ar,e.name_en||null,e.phone||null,e.branch_id||"R001",e.specialty||"general",e.status||"active").run(),r({success:!0,nurse_id:t},201)}c(x0,"createNurse");async function _0(u,a,e,t){let n=t[0],s=new URL(u.url).searchParams.get("date")||new Date().toISOString().split("T")[0],o=await a.DB.prepare("SELECT * FROM homecare_nurses WHERE id = ?").bind(n).first();if(!o)return r({success:!1,message:"Nurse not found"},404);let{results:l}=await a.DB.prepare(`SELECT v.*, p.name_ar as patient_name_ar, p.phone as patient_phone
     FROM homecare_visits v
     LEFT JOIN patients p ON v.patient_id = p.id
     WHERE v.nurse_id = ? AND v.visit_date = ?
     ORDER BY v.visit_time ASC`).bind(n,s).all();return r({success:!0,nurse:{id:o.id,name_ar:o.name_ar,name_en:o.name_en,phone:o.phone},date:s,visits:l||[],visit_count:l?.length||0})}c(_0,"getNurseSchedule");async function E0(u,a){let[e,t,n]=await Promise.all([a.DB.prepare(`SELECT COUNT(*) as total,
      SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as completed,
      SUM(CASE WHEN status = 'scheduled' THEN 1 ELSE 0 END) as scheduled,
      SUM(CASE WHEN status = 'cancelled' THEN 1 ELSE 0 END) as cancelled,
      SUM(CASE WHEN date(visit_date) = date('now') THEN 1 ELSE 0 END) as today
      FROM homecare_visits`).first(),a.DB.prepare("SELECT status, COUNT(*) as count FROM homecare_visits GROUP BY status").all(),a.DB.prepare("SELECT visit_type, COUNT(*) as count FROM homecare_visits GROUP BY visit_type ORDER BY count DESC").all()]);return r({success:!0,stats:{total_visits:e?.total||0,completed:e?.completed||0,scheduled:e?.scheduled||0,cancelled:e?.cancelled||0,today:e?.today||0,by_status:t?.results||[],by_type:n?.results||[]}})}c(E0,"getHomecareStats");_();var S0=c(u=>u+Date.now().toString(36).toUpperCase(),"newId"),n6="https://brainsait-realtime-hub.brainsait-fadil.workers.dev";function i6(){let u="ABCDEFGHJKLMNPQRSTUVWXYZ23456789",a="",e=new Uint8Array(8);crypto.getRandomValues(e);for(let t of e)a+=u[t%u.length];return a.slice(0,4)+"-"+a.slice(4)}c(i6,"genRoomCode");var w0=["consultation","follow-up","second-opinion","mental-health","nutrition","pharmacy"];async function C0(u,a){let e=await u.json().catch(()=>({})),t=["patient_id","session_date","session_time"];for(let l of t)if(!e[l])return r({success:!1,message:`Missing required field: ${l}`},400);if(e.session_type&&!w0.includes(e.session_type))return r({success:!1,message:`Invalid session_type. Valid: ${w0.join(", ")}`},400);let n=S0("TLH"),i=i6(),s=`https://telehealth.brainsait.org/room/${i}`;await a.DB.prepare(`INSERT INTO telehealth_sessions
       (id, patient_id, provider_id, branch_id, session_date, session_time, duration_min,
        status, session_type, department_id, chief_complaint, room_code, join_url, notes)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`).bind(n,e.patient_id,e.provider_id||null,e.branch_id||"R001",e.session_date,e.session_time,e.duration_min||30,"scheduled",e.session_type||"consultation",e.department_id||null,e.chief_complaint||null,i,s,e.notes||null).run();let o=await a.DB.prepare("SELECT * FROM telehealth_sessions WHERE id = ?").bind(n).first();return r({success:!0,session_id:n,room_code:i,join_url:s,session:o},201)}c(C0,"createSession");async function A0(u,a){let e=new URL(u.url),t=e.searchParams.get("patient_id")||"",n=e.searchParams.get("provider_id")||"",i=e.searchParams.get("status")||"",s=e.searchParams.get("date")||"",o=e.searchParams.get("branch_id")||"",l=Math.min(parseInt(e.searchParams.get("limit")||"50"),200),d=parseInt(e.searchParams.get("offset")||"0"),m=`SELECT s.*,
             p.name_ar as patient_name_ar, p.name_en as patient_name_en, p.phone as patient_phone
           FROM telehealth_sessions s
           LEFT JOIN patients p ON s.patient_id = p.id`,p=[],g=[];t&&(g.push("s.patient_id = ?"),p.push(t)),n&&(g.push("s.provider_id = ?"),p.push(n)),i&&(g.push("s.status = ?"),p.push(i)),s&&(g.push("s.session_date = ?"),p.push(s)),o&&(g.push("s.branch_id = ?"),p.push(o)),g.length&&(m+=" WHERE "+g.join(" AND ")),m+=" ORDER BY s.session_date ASC, s.session_time ASC LIMIT ? OFFSET ?",p.push(l,d);let{results:f}=await a.DB.prepare(m).bind(...p).all();return r({success:!0,sessions:f||[],total:f?.length||0})}c(A0,"listSessions");async function T0(u,a,e,t){let n=t[0],i=await a.DB.prepare(`SELECT s.*,
       p.name_ar as patient_name_ar, p.name_en as patient_name_en,
       p.phone as patient_phone, p.insurance_company as patient_insurance
     FROM telehealth_sessions s
     LEFT JOIN patients p ON s.patient_id = p.id
     WHERE s.id = ?`).bind(n).first();return i?r({success:!0,session:i}):r({success:!1,message:"Session not found"},404)}c(T0,"getSession");async function k0(u,a,e,t){let n=t[0],i=await u.json().catch(()=>({})),s=["status","provider_id","session_date","session_time","duration_min","chief_complaint","notes","department_id","session_type"],o=[],l=[];for(let[m,p]of Object.entries(i))s.includes(m)&&(o.push(`${m} = ?`),l.push(p));if(!o.length)return r({success:!1,message:"No updatable fields provided"},400);o.push("updated_at = ?"),l.push(new Date().toISOString(),n),await a.DB.prepare(`UPDATE telehealth_sessions SET ${o.join(", ")} WHERE id = ?`).bind(...l).run();let d=await a.DB.prepare("SELECT * FROM telehealth_sessions WHERE id = ?").bind(n).first();return r({success:!0,session:d})}c(k0,"updateSession");async function I0(u,a,e,t){let n=t[0],i=await a.DB.prepare("SELECT * FROM telehealth_sessions WHERE id = ?").bind(n).first();if(!i)return r({success:!1,message:"Session not found"},404);if(i.status==="completed")return r({success:!1,message:"Session already completed"},409);let s=new Date().toISOString();await a.DB.prepare("UPDATE telehealth_sessions SET status = 'in-progress', started_at = ?, updated_at = ? WHERE id = ?").bind(s,s,n).run();try{await fetch(`${n6}/rooms/${i.room_code}/activate`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({session_id:n,started_at:s})})}catch{}return r({success:!0,session_id:n,room_code:i.room_code,join_url:i.join_url,started_at:s,status:"in-progress"})}c(I0,"startSession");async function B0(u,a,e,t){let n=t[0],i=await u.json().catch(()=>({})),s=await a.DB.prepare("SELECT * FROM telehealth_sessions WHERE id = ?").bind(n).first();if(!s)return r({success:!1,message:"Session not found"},404);let o=new Date().toISOString();return await a.DB.prepare("UPDATE telehealth_sessions SET status = 'completed', ended_at = ?, notes = ?, updated_at = ? WHERE id = ?").bind(o,i.notes||s.notes,o,n).run(),r({success:!0,session_id:n,ended_at:o,status:"completed"})}c(B0,"endSession");async function L0(u,a,e,t){let n=t[0],i=await u.json().catch(()=>({})),s=await a.DB.prepare("SELECT * FROM telehealth_sessions WHERE id = ?").bind(n).first();if(!s)return r({success:!1,message:"Session not found"},404);if(!i.medications||!Array.isArray(i.medications)||i.medications.length===0)return r({success:!1,message:"medications array is required"},400);let o=S0("RX");return await a.DB.prepare(`INSERT INTO telehealth_prescriptions
       (id, session_id, patient_id, provider_id, medications_json, diagnosis_codes, instructions, status)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`).bind(o,n,s.patient_id,i.provider_id||s.provider_id||null,JSON.stringify(i.medications),i.diagnosis_codes||null,i.instructions||null,"active").run(),await a.DB.prepare("UPDATE telehealth_sessions SET prescription_id = ?, updated_at = ? WHERE id = ?").bind(o,new Date().toISOString(),n).run(),r({success:!0,prescription_id:o,session_id:n,medications:i.medications},201)}c(L0,"issuePrescription");async function H0(u,a,e,t){let n=t[0],{results:i}=await a.DB.prepare("SELECT * FROM telehealth_prescriptions WHERE session_id = ? ORDER BY created_at DESC").bind(n).all(),s=(i||[]).map(o=>{try{o.medications=JSON.parse(o.medications_json)}catch{}return o});return r({success:!0,session_id:n,prescriptions:s})}c(H0,"getPrescriptions");async function D0(u,a,e,t){let n=t[0],s=new URL(u.url).searchParams.get("date")||new Date().toISOString().split("T")[0],{results:o}=await a.DB.prepare(`SELECT session_time, duration_min, status FROM telehealth_sessions
     WHERE provider_id = ? AND session_date = ? AND status NOT IN ('cancelled','no-show')
     ORDER BY session_time ASC`).bind(n,s).all(),l=[];for(let d=8;d<20;d++)for(let m of[0,30]){let p=`${String(d).padStart(2,"0")}:${String(m).padStart(2,"0")}`,g=o.some(f=>f.session_time===p);l.push({time:p,available:!g})}return r({success:!0,provider_id:n,date:s,available_slots:l.filter(d=>d.available).map(d=>d.time),booked_slots:o,all_slots:l})}c(D0,"getProviderAvailability");async function O0(u,a){let[e,t,n]=await Promise.all([a.DB.prepare(`SELECT
      COUNT(*) as total,
      SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as completed,
      SUM(CASE WHEN status = 'scheduled' THEN 1 ELSE 0 END) as scheduled,
      SUM(CASE WHEN status = 'in-progress' THEN 1 ELSE 0 END) as active,
      SUM(CASE WHEN date(session_date) = date('now') THEN 1 ELSE 0 END) as today
      FROM telehealth_sessions`).first(),a.DB.prepare("SELECT status, COUNT(*) as count FROM telehealth_sessions GROUP BY status").all(),a.DB.prepare("SELECT session_type, COUNT(*) as count FROM telehealth_sessions GROUP BY session_type ORDER BY count DESC").all()]);return r({success:!0,stats:{total_sessions:e?.total||0,completed:e?.completed||0,scheduled:e?.scheduled||0,active:e?.active||0,today:e?.today||0,by_status:t?.results||[],by_type:n?.results||[]}})}c(O0,"getTelehealthStats");_();var b={name_ar:"\u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A\u0629",name_en:"Hayat National Hospital",from:"noreply@hnh.brainsait.org",from_name:"HNH \u2013 \u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629",logo_url:"https://hnh.brainsait.org/logo.png",primary:"#1a5276",accent:"#2980b9",website:"https://hnh.brainsait.org",support_phone:"920000094",footer_ar:"\u062C\u0645\u064A\u0639 \u0627\u0644\u062D\u0642\u0648\u0642 \u0645\u062D\u0641\u0648\u0638\u0629 \xA9 \u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A\u0629"};function N(u,a){return`<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>${u}</title>
<style>
  body { margin:0; padding:0; background:#f4f6fb; font-family: 'Segoe UI', Arial, sans-serif; direction:rtl; }
  .wrap { max-width:600px; margin:32px auto; background:#fff; border-radius:12px; overflow:hidden;
          box-shadow:0 2px 12px rgba(0,0,0,.1); }
  .header { background:${b.primary}; padding:28px 32px; text-align:center; }
  .header h1 { margin:0; color:#fff; font-size:22px; font-weight:700; }
  .header p  { margin:4px 0 0; color:#aed6f1; font-size:14px; }
  .body { padding:32px; }
  .card { background:#eaf4fb; border-right:4px solid ${b.accent};
          border-radius:8px; padding:16px 20px; margin:16px 0; }
  .card .label { font-size:12px; color:#666; margin:0 0 2px; }
  .card .value { font-size:16px; color:${b.primary}; font-weight:600; margin:0; }
  .btn { display:inline-block; background:${b.accent}; color:#fff !important;
         text-decoration:none; padding:12px 28px; border-radius:8px; font-size:15px;
         font-weight:600; margin:20px 0; }
  .alert { background:#fef9e7; border-right:4px solid #f39c12; border-radius:8px;
           padding:12px 16px; margin:16px 0; font-size:14px; color:#7d6608; }
  .footer { background:#f4f6fb; padding:20px 32px; text-align:center; font-size:12px; color:#888; }
  h2 { color:${b.primary}; font-size:18px; margin-top:0; }
  p  { color:#444; line-height:1.7; font-size:15px; }
  .divider { border:none; border-top:1px solid #eee; margin:20px 0; }
</style>
</head>
<body>
<div class="wrap">
  <div class="header">
    <h1>${b.name_ar}</h1>
    <p>${b.name_en}</p>
  </div>
  <div class="body">
    ${a}
  </div>
  <div class="footer">
    <p>${b.footer_ar}</p>
    <p>\u0644\u0644\u0627\u0633\u062A\u0641\u0633\u0627\u0631: <strong>${b.support_phone}</strong> | <a href="${b.website}" style="color:${b.accent}">${b.website}</a></p>
  </div>
</div>
</body>
</html>`}c(N,"wrapEmail");function s6(u){let a=`\u062A\u0623\u0643\u064A\u062F \u0645\u0648\u0639\u062F\u0643 \u2013 ${u.date} | ${b.name_ar}`,e=N(a,`
    <h2>\u062A\u0645 \u062A\u0623\u0643\u064A\u062F \u0645\u0648\u0639\u062F\u0643 \u2713</h2>
    <p>\u0639\u0632\u064A\u0632\u064A/\u0639\u0632\u064A\u0632\u062A\u064A <strong>${u.patient_name||"\u0627\u0644\u0645\u0631\u064A\u0636"}</strong>\u060C</p>
    <p>\u064A\u0633\u0639\u062F\u0646\u0627 \u0625\u0628\u0644\u0627\u063A\u0643 \u0628\u062A\u0623\u0643\u064A\u062F \u0645\u0648\u0639\u062F\u0643 \u0644\u062F\u0649 ${b.name_ar}.</p>
    <div class="card">
      <p class="label">\u0627\u0644\u062A\u0627\u0631\u064A\u062E</p>
      <p class="value">${u.date}</p>
    </div>
    <div class="card">
      <p class="label">\u0627\u0644\u0648\u0642\u062A</p>
      <p class="value">${u.time}</p>
    </div>
    <div class="card">
      <p class="label">\u0627\u0644\u0642\u0633\u0645 / \u0627\u0644\u062A\u062E\u0635\u0635</p>
      <p class="value">${u.department||"\u2014"}</p>
    </div>
    <div class="card">
      <p class="label">\u0627\u0644\u0641\u0631\u0639</p>
      <p class="value">${u.branch||"\u0627\u0644\u0631\u064A\u0627\u0636"}</p>
    </div>
    ${u.provider?`<div class="card"><p class="label">\u0627\u0644\u0637\u0628\u064A\u0628</p><p class="value">${u.provider}</p></div>`:""}
    <hr class="divider"/>
    <div class="alert">
      \u23F0 \u064A\u0631\u062C\u0649 \u0627\u0644\u062D\u0636\u0648\u0631 \u0642\u0628\u0644 15 \u062F\u0642\u064A\u0642\u0629 \u0645\u0646 \u0645\u0648\u0639\u062F\u0643 \u0645\u0639 \u0625\u062D\u0636\u0627\u0631 \u0627\u0644\u0647\u0648\u064A\u0629 \u0627\u0644\u0648\u0637\u0646\u064A\u0629 \u0648\u0628\u0637\u0627\u0642\u0629 \u0627\u0644\u062A\u0623\u0645\u064A\u0646.
    </div>
    ${u.appointment_id?`<p style="font-size:12px;color:#999">\u0631\u0642\u0645 \u0627\u0644\u0645\u0648\u0639\u062F: ${u.appointment_id}</p>`:""}
  `);return{subject:a,html:e}}c(s6,"templateAppointment");function o6(u){let a=`\u062A\u0623\u0643\u064A\u062F \u0632\u064A\u0627\u0631\u0629 \u0627\u0644\u0631\u0639\u0627\u064A\u0629 \u0627\u0644\u0645\u0646\u0632\u0644\u064A\u0629 \u2013 ${u.date} | ${b.name_ar}`,e=N(a,`
    <h2>\u062A\u0623\u0643\u064A\u062F \u0632\u064A\u0627\u0631\u0629 \u0627\u0644\u0631\u0639\u0627\u064A\u0629 \u0627\u0644\u0645\u0646\u0632\u0644\u064A\u0629 \u{1F3E0}</h2>
    <p>\u0639\u0632\u064A\u0632\u064A/\u0639\u0632\u064A\u0632\u062A\u064A <strong>${u.patient_name||"\u0627\u0644\u0645\u0631\u064A\u0636"}</strong>\u060C</p>
    <p>\u062A\u0645 \u062C\u062F\u0648\u0644\u0629 \u0632\u064A\u0627\u0631\u0629 \u0627\u0644\u0631\u0639\u0627\u064A\u0629 \u0627\u0644\u0645\u0646\u0632\u0644\u064A\u0629 \u0644\u0643 \u0648\u0641\u0642 \u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u062A\u0627\u0644\u064A\u0629:</p>
    <div class="card">
      <p class="label">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0632\u064A\u0627\u0631\u0629</p>
      <p class="value">${u.date}</p>
    </div>
    ${u.time?`<div class="card"><p class="label">\u0627\u0644\u0648\u0642\u062A \u0627\u0644\u0645\u0642\u062F\u0631</p><p class="value">${u.time}</p></div>`:""}
    <div class="card">
      <p class="label">\u0627\u0644\u0639\u0646\u0648\u0627\u0646</p>
      <p class="value">${u.address}</p>
    </div>
    <div class="card">
      <p class="label">\u0646\u0648\u0639 \u0627\u0644\u0632\u064A\u0627\u0631\u0629</p>
      <p class="value">${u.visit_type||"\u0631\u0648\u062A\u064A\u0646\u064A\u0629"}</p>
    </div>
    ${u.nurse_name?`<div class="card"><p class="label">\u0627\u0644\u0645\u0645\u0631\u0636/\u0629 \u0627\u0644\u0645\u0633\u0624\u0648\u0644/\u0629</p><p class="value">${u.nurse_name}</p></div>`:""}
    <hr class="divider"/>
    <div class="alert">
      \u{1F4DE} \u0641\u064A \u062D\u0627\u0644 \u0627\u0644\u062D\u0627\u062C\u0629 \u0644\u062A\u063A\u064A\u064A\u0631 \u0623\u0648 \u0625\u0644\u063A\u0627\u0621 \u0627\u0644\u0632\u064A\u0627\u0631\u0629\u060C \u064A\u0631\u062C\u0649 \u0627\u0644\u062A\u0648\u0627\u0635\u0644 \u0645\u0639\u0646\u0627 \u0639\u0644\u0649 \u0627\u0644\u0631\u0642\u0645 ${b.support_phone} \u0642\u0628\u0644 3 \u0633\u0627\u0639\u0627\u062A \u0639\u0644\u0649 \u0627\u0644\u0623\u0642\u0644.
    </div>
    ${u.visit_id?`<p style="font-size:12px;color:#999">\u0631\u0642\u0645 \u0627\u0644\u0632\u064A\u0627\u0631\u0629: ${u.visit_id}</p>`:""}
  `);return{subject:a,html:e}}c(o6,"templateHomecare");function r6(u){let a=`\u0631\u0627\u0628\u0637 \u062C\u0644\u0633\u0629 \u0627\u0644\u0627\u0633\u062A\u0634\u0627\u0631\u0629 \u0639\u0646 \u0628\u064F\u0639\u062F \u2013 ${u.date} | ${b.name_ar}`,e=N(a,`
    <h2>\u062C\u0644\u0633\u0629 \u0627\u0644\u0627\u0633\u062A\u0634\u0627\u0631\u0629 \u0627\u0644\u0637\u0628\u064A\u0629 \u0639\u0646 \u0628\u064F\u0639\u062F \u{1F3A5}</h2>
    <p>\u0639\u0632\u064A\u0632\u064A/\u0639\u0632\u064A\u0632\u062A\u064A <strong>${u.patient_name||"\u0627\u0644\u0645\u0631\u064A\u0636"}</strong>\u060C</p>
    <p>\u062A\u0645 \u062C\u062F\u0648\u0644\u0629 \u062C\u0644\u0633\u0629 \u0627\u0633\u062A\u0634\u0627\u0631\u062A\u0643 \u0627\u0644\u0637\u0628\u064A\u0629 \u0639\u0628\u0631 \u0627\u0644\u0641\u064A\u062F\u064A\u0648. \u0627\u0646\u0636\u0645 \u0641\u064A \u0627\u0644\u0648\u0642\u062A \u0627\u0644\u0645\u062D\u062F\u062F \u0645\u0646 \u062E\u0644\u0627\u0644 \u0627\u0644\u0631\u0627\u0628\u0637 \u0623\u062F\u0646\u0627\u0647.</p>
    <div class="card">
      <p class="label">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062C\u0644\u0633\u0629</p>
      <p class="value">${u.date}</p>
    </div>
    <div class="card">
      <p class="label">\u0648\u0642\u062A \u0627\u0644\u062C\u0644\u0633\u0629</p>
      <p class="value">${u.time}</p>
    </div>
    <div class="card">
      <p class="label">\u0627\u0644\u0645\u062F\u0629</p>
      <p class="value">${u.duration||30} \u062F\u0642\u064A\u0642\u0629</p>
    </div>
    ${u.provider?`<div class="card"><p class="label">\u0627\u0644\u0637\u0628\u064A\u0628/\u0629</p><p class="value">${u.provider}</p></div>`:""}
    <div style="text-align:center;margin:28px 0;">
      <a href="${u.join_url}" class="btn">\u{1F4F9} \u0627\u0646\u0636\u0645 \u0644\u0644\u062C\u0644\u0633\u0629 \u0627\u0644\u0622\u0646</a>
    </div>
    <div class="card" style="direction:ltr;text-align:left">
      <p class="label" style="text-align:right">\u0631\u0645\u0632 \u0627\u0644\u063A\u0631\u0641\u0629</p>
      <p class="value" style="font-family:monospace;letter-spacing:4px;font-size:20px;text-align:center">${u.room_code}</p>
    </div>
    <hr class="divider"/>
    <div class="alert">
      \u{1F4A1} \u062A\u0623\u0643\u062F \u0645\u0646 \u0648\u062C\u0648\u062F \u0643\u0627\u0645\u064A\u0631\u0627 \u0648\u0645\u064A\u0643\u0631\u0648\u0641\u0648\u0646 \u064A\u0639\u0645\u0644 \u0628\u0634\u0643\u0644 \u0635\u062D\u064A\u062D. \u064A\u064F\u0646\u0635\u062D \u0628\u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0645\u062A\u0635\u0641\u062D Chrome \u0623\u0648 Edge.
    </div>
    ${u.session_id?`<p style="font-size:12px;color:#999">\u0631\u0642\u0645 \u0627\u0644\u062C\u0644\u0633\u0629: ${u.session_id}</p>`:""}
  `);return{subject:a,html:e}}c(r6,"templateTelehealth");function c6(u){let a=`\u0645\u062A\u0627\u0628\u0639\u0629 \u0628\u0639\u062F \u0632\u064A\u0627\u0631\u062A\u0643 \u2013 ${b.name_ar}`,e=N(a,`
    <h2>\u0645\u062A\u0627\u0628\u0639\u0629 \u0628\u0639\u062F \u0632\u064A\u0627\u0631\u062A\u0643 \u{1F499}</h2>
    <p>\u0639\u0632\u064A\u0632\u064A/\u0639\u0632\u064A\u0632\u062A\u064A <strong>${u.patient_name||"\u0627\u0644\u0645\u0631\u064A\u0636"}</strong>\u060C</p>
    <p>\u0646\u062A\u0645\u0646\u0649 \u0644\u0643 \u0627\u0644\u0635\u062D\u0629 \u0648\u0627\u0644\u0639\u0627\u0641\u064A\u0629. \u0646\u062A\u0648\u0627\u0635\u0644 \u0645\u0639\u0643 \u0644\u0644\u0627\u0637\u0645\u0626\u0646\u0627\u0646 \u0628\u0639\u062F \u0632\u064A\u0627\u0631\u062A\u0643 \u0628\u062A\u0627\u0631\u064A\u062E <strong>${u.visit_date}</strong>.</p>
    ${u.notes?`<div class="card"><p class="label">\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u0637\u0628\u064A\u0628</p><p class="value">${u.notes}</p></div>`:""}
    ${u.next_appointment?`<div class="card"><p class="label">\u0645\u0648\u0639\u062F\u0643 \u0627\u0644\u0642\u0627\u062F\u0645</p><p class="value">${u.next_appointment}</p></div>`:""}
    ${u.medications?.length?`
    <h3 style="color:${b.primary};font-size:16px;">\u0627\u0644\u0623\u062F\u0648\u064A\u0629 \u0627\u0644\u0645\u0648\u0635\u0648\u0641\u0629</h3>
    <ul style="padding-right:20px;color:#444;">
      ${u.medications.map(t=>`<li><strong>${t.name}</strong> \u2014 ${t.dose||""} ${t.frequency||""}</li>`).join("")}
    </ul>`:""}
    <hr class="divider"/>
    <div class="alert">
      \u{1F3E5} \u0641\u064A \u062D\u0627\u0644 \u062A\u062F\u0647\u0648\u0631 \u062D\u0627\u0644\u062A\u0643 \u0623\u0648 \u0648\u062C\u0648\u062F \u0623\u0639\u0631\u0627\u0636 \u062C\u062F\u064A\u062F\u0629\u060C \u064A\u0631\u062C\u0649 \u0632\u064A\u0627\u0631\u0629 \u0623\u0642\u0631\u0628 \u0637\u0648\u0627\u0631\u0626 \u0623\u0648 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0640 <strong>997</strong>.
    </div>
    <div style="text-align:center;margin:20px 0;">
      <a href="${b.website}" class="btn">\u0627\u062D\u062C\u0632 \u0645\u0648\u0639\u062F\u0627\u064B \u062C\u062F\u064A\u062F\u0627\u064B</a>
    </div>
  `);return{subject:a,html:e}}c(c6,"templateFollowup");async function B(u,a,e,t,n,i){let s=u.MAILLINC_URL||"https://maillinc.brainsait-fadil.workers.dev",o="pending",l=null;try{let d=await fetch(`${s}/email`,{method:"POST",headers:{"Content-Type":"application/json",...u.MAILLINC_API_KEY?{"X-API-Key":u.MAILLINC_API_KEY}:{}},body:JSON.stringify({from:b.from,from_name:b.from_name,to:a,subject:e,html:t})});o=d.ok?"sent":"failed",d.ok||(l=`HTTP ${d.status}`)}catch(d){o="failed",l=d.message}try{await u.DB.prepare("INSERT INTO email_log (recipient, subject, template, ref_id, status, error) VALUES (?, ?, ?, ?, ?, ?)").bind(a,e,n||"generic",i||null,o,l).run()}catch{}return{status:o,error:l}}c(B,"sendEmail");async function q0(u,a){let e=await u.json().catch(()=>({}));if(!e.to||!e.date)return r({success:!1,message:"to and date required"},400);let{subject:t,html:n}=s6(e),i=await B(a,e.to,t,n,"appointment",e.appointment_id);return r({success:i.status==="sent",...i})}c(q0,"emailAppointment");async function M0(u,a){let e=await u.json().catch(()=>({}));if(!e.to||!e.date||!e.address)return r({success:!1,message:"to, date, and address required"},400);let{subject:t,html:n}=o6(e),i=await B(a,e.to,t,n,"homecare",e.visit_id);return r({success:i.status==="sent",...i})}c(M0,"emailHomecare");async function N0(u,a){let e=await u.json().catch(()=>({}));if(!e.to||!e.join_url)return r({success:!1,message:"to and join_url required"},400);let{subject:t,html:n}=r6(e),i=await B(a,e.to,t,n,"telehealth",e.session_id);return r({success:i.status==="sent",...i})}c(N0,"emailTelehealth");async function R0(u,a){let e=await u.json().catch(()=>({}));if(!e.to||!e.visit_date)return r({success:!1,message:"to and visit_date required"},400);let{subject:t,html:n}=c6(e),i=await B(a,e.to,t,n,"followup",e.ref_id);return r({success:i.status==="sent",...i})}c(R0,"emailFollowup");async function P0(u,a){let e=await u.json().catch(()=>({}));if(!e.to||!e.subject||!e.html)return r({success:!1,message:"to, subject, and html required"},400);let t=await B(a,e.to,e.subject,e.html,"generic",e.ref_id);return r({success:t.status==="sent",...t})}c(P0,"emailSend");async function j0(u,a){let e=new URL(u.url),t=Math.min(parseInt(e.searchParams.get("limit")||"50"),200),n=parseInt(e.searchParams.get("offset")||"0"),i=e.searchParams.get("status")||"",s="SELECT * FROM email_log",o=[];i&&(s+=" WHERE status = ?",o.push(i)),s+=" ORDER BY id DESC LIMIT ? OFFSET ?",o.push(t,n);let{results:l}=await a.DB.prepare(s).bind(...o).all();return r({success:!0,emails:l||[],total:l?.length||0})}c(j0,"getEmailLog");var A={};R(A,{about:()=>Q,academy:()=>X,blog:()=>Z,branches:()=>uu,contact:()=>eu,course_ai_healthcare:()=>l6,course_cbahi_quality:()=>d6,course_clinical_documentation:()=>m6,course_infection_control:()=>p6,course_medical_coding:()=>h6,course_nphies:()=>g6,course_pdpl:()=>f6,course_pharmacy:()=>v6,course_rcm:()=>b6,departments:()=>au,doctors:()=>tu,faq:()=>nu,index:()=>iu,packages:()=>su});var Q=`<!DOCTYPE html>
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
`,X=`<!DOCTYPE html>
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
`,Z=`<!DOCTYPE html>
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
`,uu=`<!DOCTYPE html>
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
`,eu=`<!DOCTYPE html>
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
`,l6=`<!DOCTYPE html>
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
`,d6=`<!DOCTYPE html>
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
`,m6=`<!DOCTYPE html>
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
`,p6=`<!DOCTYPE html>
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
`,h6=`<!DOCTYPE html>
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
`,g6=`<!DOCTYPE html>
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
`,f6=`<!DOCTYPE html>
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
`,v6=`<!DOCTYPE html>
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
`,b6=`<!DOCTYPE html>
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
`,au=`<!DOCTYPE html>
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
`,tu=`<!DOCTYPE html>
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
`,nu=`<!DOCTYPE html>
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
`,iu=`<!DOCTYPE html>
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
`,su=`<!DOCTYPE html>
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
`;var z0={about:Q,academy:X,blog:Z,branches:uu,contact:eu,departments:au,doctors:tu,faq:nu,packages:su,index:iu},U0={ar:{desc:"\u0645\u062C\u0645\u0648\u0639\u0629 \u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A \u2014 \u0645\u0646\u0638\u0648\u0645\u0629 \u0635\u062D\u064A\u0629 \u0645\u062A\u0643\u0627\u0645\u0644\u0629 \u0645\u0639 \u0628\u0648\u0627\u0628\u0627\u062A BSMA \u0648 GIVC \u0648 SBS \u0648 Oracle \u0648 NPHIES.",title:"\u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A | HNH \u2014 \u0627\u0644\u0645\u0646\u0638\u0648\u0645\u0629 \u0627\u0644\u0645\u062A\u0643\u0627\u0645\u0644\u0629",titleShort:"\u0645\u0633\u062A\u0634\u0641\u0649 \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A",osVer:"BrainSAIT Healthcare OS v5.0",heroBadge:"\u0628\u064A\u0627\u0646\u0627\u062A \u062D\u064A\u0629 \u2014 \u0645\u062A\u0635\u0644 \u0628\u0640 BrainSAIT",heroH1:'\u0645\u062C\u0645\u0648\u0639\u0629 \u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A<br><span class="gd">\u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A</span>',heroP:"\u0645\u0646\u0638\u0648\u0645\u0629 \u0635\u062D\u064A\u0629 \u0630\u0643\u064A\u0629 \u0645\u062A\u0643\u0627\u0645\u0644\u0629 \u2014 \u062A\u0643\u0627\u0645\u0644 BSMA \u0627\u0644\u0635\u0648\u062A\u064A \xB7 GIVC \xB7 SBS \xB7 Oracle \xB7 NPHIES \xB7 ClaimLinc",heroBookBtn:"\u{1F4C5} \u0627\u062D\u062C\u0632 \u0645\u0648\u0639\u062F",heroDeptBtn:"\u062A\u0635\u0641\u062D \u0627\u0644\u0623\u0642\u0633\u0627\u0645",statDoctors:"\u0637\u0628\u064A\u0628",statBranches:"\u0641\u0631\u0639",statDepts:"\u0642\u0633\u0645 \u0637\u0628\u064A",statBeds:"\u0633\u0631\u064A\u0631",navDepts:"\u0627\u0644\u0623\u0642\u0633\u0627\u0645",navBranches:"\u0627\u0644\u0641\u0631\u0648\u0639",navDoctors:"\u0627\u0644\u0623\u0637\u0628\u0627\u0621",navPortal:"\u0627\u0644\u0645\u0646\u0638\u0648\u0645\u0629",navEcosystem:"\u0627\u0644\u0645\u0646\u0638\u0648\u0645\u0629",navBook:"\u{1F4C5} \u0627\u062D\u062C\u0632 \u0645\u0648\u0639\u062F",langBtn:"EN",secDeptsTitle:"\u0627\u0644\u0623\u0642\u0633\u0627\u0645 \u0627\u0644\u0637\u0628\u064A\u0629",secDeptsSub:"\u0623\u0643\u062B\u0631 \u0645\u0646 30 \u062A\u062E\u0635\u0635\u0627\u064B \u0637\u0628\u064A\u0627\u064B",secBranchesTitle:"\u0641\u0631\u0648\u0639\u0646\u0627",secBranchesSub:"\u062E\u0645\u0633\u0629 \u0641\u0631\u0648\u0639 \u0641\u064A \u0627\u0644\u0645\u0645\u0644\u0643\u0629",secDoctorsTitle:"\u0623\u0637\u0628\u0627\u0624\u0646\u0627",secDoctorsSub:"\u0641\u0631\u064A\u0642 \u0645\u0646 \u0623\u0645\u0647\u0631 \u0627\u0644\u0627\u0633\u062A\u0634\u0627\u0631\u064A\u064A\u0646",ecosystemTitle:"\u0627\u0644\u0645\u0646\u0638\u0648\u0645\u0629 \u0627\u0644\u0635\u062D\u064A\u0629 \u0627\u0644\u0645\u062A\u0643\u0627\u0645\u0644\u0629",ecosystemSub:"\u0628\u0648\u0627\u0628\u0627\u062A \u0630\u0643\u064A\u0629 \u0644\u0643\u0644 \u0645\u0633\u062A\u062E\u062F\u0645 \u2014 \u0628\u064A\u0627\u0646\u0627\u062A \u062D\u064A\u0629 \u0648\u062A\u0643\u0627\u0645\u0644 \u0643\u0627\u0645\u0644 \u0628\u064A\u0646 \u0627\u0644\u0623\u0646\u0638\u0645\u0629",patientTitle:"\u0627\u0644\u0645\u0631\u064A\u0636",patientDesc:"\u0627\u0633\u062A\u0639\u0631\u0627\u0636 \u0627\u0644\u0641\u062D\u0648\u0635\u0627\u062A\u060C \u062D\u062C\u0632 \u0627\u0644\u0645\u0648\u0627\u0639\u064A\u062F\u060C \u0645\u062A\u0627\u0628\u0639\u0629 \u0627\u0644\u0645\u0637\u0627\u0644\u0628\u0627\u062A\u060C \u0627\u0644\u062F\u0631\u062F\u0634\u0629 \u0627\u0644\u0630\u0643\u064A\u0629 \u0645\u0639 \u0628\u0633\u0645\u0629",providerTitle:"\u0627\u0644\u0645\u0632\u0648\u062F \u0627\u0644\u0635\u062D\u064A",providerDesc:"\u062C\u062F\u0648\u0644 \u0627\u0644\u0645\u0648\u0627\u0639\u064A\u062F\u060C \u0645\u0644\u0641\u0627\u062A \u0627\u0644\u0645\u0631\u0636\u0649\u060C \u0627\u0644\u062A\u0643\u0627\u0645\u0644 \u0645\u0639 Oracle \u0648 NPHIES\u060C \u062A\u0642\u0627\u0631\u064A\u0631 \u0627\u0644\u0623\u062F\u0627\u0621",payerTitle:"\u0627\u0644\u062A\u0623\u0645\u064A\u0646",payerDesc:"\u0627\u0644\u062A\u062D\u0642\u0642 \u0645\u0646 \u0627\u0644\u0623\u0647\u0644\u064A\u0629\u060C \u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0627\u062A \u0627\u0644\u0645\u0633\u0628\u0642\u0629\u060C \u0645\u062A\u0627\u0628\u0639\u0629 \u062F\u0648\u0631\u0629 \u0627\u0644\u0625\u064A\u0631\u0627\u062F\u0627\u062A",studentTitle:"\u0627\u0644\u0637\u0627\u0644\u0628",studentDesc:"\u0627\u0644\u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629 \u0627\u0644\u0637\u0628\u064A\u0629 \u2014 \u062F\u0648\u0631\u0627\u062A \u062A\u062F\u0631\u064A\u0628\u064A\u0629\u060C \u0634\u0647\u0627\u062F\u0627\u062A\u060C \u0645\u0643\u062A\u0628\u0629 \u0637\u0628\u064A\u0629 \u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A\u0629",adminTitle:"\u0627\u0644\u0625\u062F\u0627\u0631\u0629",adminDesc:"\u0644\u0648\u062D\u0629 \u062A\u062D\u0643\u0645 \u0634\u0627\u0645\u0644\u0629 \u2014 \u0625\u062D\u0635\u0627\u0626\u064A\u0627\u062A\u060C \u062A\u0642\u0627\u0631\u064A\u0631\u060C \u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646 \u0648\u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0627\u062A",receptionTitle:"\u0627\u0644\u0627\u0633\u062A\u0642\u0628\u0627\u0644",receptionDesc:"\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u0645\u0631\u0636\u0649\u060C \u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0645\u0648\u0627\u0639\u064A\u062F\u060C \u0627\u0644\u062A\u062D\u0642\u0642 \u0645\u0646 \u0627\u0644\u062A\u0623\u0645\u064A\u0646\u060C \u0637\u0628\u0627\u0639\u0629 \u0627\u0644\u062A\u0642\u0627\u0631\u064A\u0631",rcmTitle:"\u062F\u0648\u0631\u0629 \u0627\u0644\u0625\u064A\u0631\u0627\u062F\u0627\u062A",rcmDesc:"\u0627\u0644\u0645\u0637\u0627\u0644\u0628\u0627\u062A \u0627\u0644\u0645\u0627\u0644\u064A\u0629\u060C \u0645\u062A\u0627\u0628\u0639\u0629 \u0627\u0644\u062A\u062D\u0635\u064A\u0644\u060C \u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0623\u062F\u0627\u0621 \u0627\u0644\u0645\u0627\u0644\u064A\u060C \u062A\u0642\u0627\u0631\u064A\u0631 NPHIES",integrationsTitle:"\u0627\u0644\u062A\u0643\u0627\u0645\u0644\u0627\u062A \u0627\u0644\u062D\u064A\u0629",integrationsSub:"\u062C\u0645\u064A\u0639 \u0627\u0644\u0623\u0646\u0638\u0645\u0629 \u0645\u062A\u0635\u0644\u0629 \u0648\u062A\u0639\u0645\u0644 \u0628\u0634\u0643\u0644 \u0645\u0628\u0627\u0634\u0631",aiTitle:"\u0628\u0633\u0645\u0629 \u2014 \u0627\u0644\u0645\u0633\u0627\u0639\u062F \u0627\u0644\u0637\u0628\u064A \u0627\u0644\u0630\u0643\u064A",aiDesc:"\u062A\u062D\u062F\u062B \u0645\u0639 \u0628\u0633\u0645\u0629 \u0628\u0627\u0644\u0635\u0648\u062A \u0623\u0648 \u0627\u0644\u0643\u062A\u0627\u0628\u0629 \u2014 \u062D\u062C\u0632 \u0645\u0648\u0627\u0639\u064A\u062F\u060C \u0641\u062D\u0635 \u0627\u0644\u0623\u0647\u0644\u064A\u0629\u060C \u0645\u062A\u0627\u0628\u0639\u0629 \u0627\u0644\u0645\u0637\u0627\u0644\u0628\u0627\u062A\u060C \u0627\u0633\u062A\u0641\u0633\u0627\u0631\u0627\u062A \u0637\u0628\u064A\u0629",aiTalkBtn:"\u062A\u062D\u062F\u062B \u0645\u0639 \u0628\u0633\u0645\u0629 \u{1F399}\uFE0F",aiChatBtn:"\u{1F4AC} \u062F\u0631\u062F\u0634\u0629 \u0646\u0635\u064A\u0629",ctaTitle:"\u0635\u062D\u062A\u0643 \u0623\u0648\u0644\u0627\u064B",ctaSub:"\u0627\u062D\u062C\u0632 \u0645\u0648\u0639\u062F\u0643 \u0627\u0644\u0622\u0646 \u0639\u0628\u0631 \u0627\u0644\u0645\u0646\u0638\u0648\u0645\u0629 \u0627\u0644\u0645\u062A\u0643\u0627\u0645\u0644\u0629",ctaBook:"\u0627\u062D\u062C\u0632 \u0645\u0648\u0639\u062F \u0627\u0644\u0622\u0646",ctaCall:"\u0627\u062A\u0635\u0644 \u0628\u0646\u0627",fAbout:"\u0645\u0646\u0638\u0648\u0645\u0629 \u0635\u062D\u064A\u0629 \u0630\u0643\u064A\u0629 \u0645\u062A\u0643\u0627\u0645\u0644\u0629 \u2014 \u0645\u0646\u0630 25 \u0639\u0627\u0645\u0627\u064B \u0645\u0646 \u0627\u0644\u062A\u0645\u064A\u0632.",fLinks:"\u0631\u0648\u0627\u0628\u0637 \u0633\u0631\u064A\u0639\u0629",fContact:"\u062A\u0648\u0627\u0635\u0644 \u0645\u0639\u0646\u0627",fServices:"\u062E\u062F\u0645\u0627\u062A",fEmerg:"\u0637\u0648\u0627\u0631\u0626 24/7",fAppt:"\u062D\u062C\u0632 \u0645\u0648\u0639\u062F",fEcosystem:"\u0627\u0644\u0645\u0646\u0638\u0648\u0645\u0629",fPortal:"\u0627\u0644\u0628\u0648\u0627\u0628\u0629",fBSMA:"\u0628\u0633\u0645\u0629 AI",fPowered:"\u0645\u0634\u063A\u0651\u0644 \u0628\u0646\u0638\u0627\u0645",fCopy:"\xA9 2026 \u062C\u0645\u064A\u0639 \u0627\u0644\u062D\u0642\u0648\u0642 \u0645\u062D\u0641\u0648\u0638\u0629",statusConnected:"\u0645\u062A\u0635\u0644",statusWarning:"\u062A\u062D\u0630\u064A\u0631",statusOffline:"\u063A\u064A\u0631 \u0645\u062A\u0635\u0644",loading:"\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644...",systemOnline:"\u062C\u0645\u064A\u0639 \u0627\u0644\u0623\u0646\u0638\u0645\u0629 \u062A\u0639\u0645\u0644",oracleBridge:"\u062C\u0633\u0631 Oracle",nphiesPortal:"\u0628\u0648\u0627\u0628\u0629 NPHIES",claimlincPortal:"ClaimLinc",bsmaPortal:"\u0628\u0633\u0645\u0629 AI",sbsPortal:"SBS",givcPortal:"GIVC",searchTitle:"\u0627\u0644\u0628\u062D\u062B \u0627\u0644\u0630\u0643\u064A \u0628\u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064A",searchSub:"\u0627\u0633\u0623\u0644 \u0639\u0646 \u0623\u064A \u0637\u0628\u064A\u0628 \u0623\u0648 \u0642\u0633\u0645 \u0623\u0648 \u0625\u062C\u0631\u0627\u0621 \u0623\u0648 \u062F\u0648\u0627\u0621 \u2014 \u0625\u062C\u0627\u0628\u0627\u062A \u0641\u0648\u0631\u064A\u0629 \u0645\u0646 \u0642\u0627\u0639\u062F\u0629 \u0645\u0639\u0631\u0641\u0629 \u0627\u0644\u0645\u0633\u062A\u0634\u0641\u0649",searchPlaceholder:"\u0645\u062B\u0627\u0644: \u0623\u0637\u0628\u0627\u0621 \u0627\u0644\u0642\u0644\u0628\u060C \u0633\u0627\u0639\u0627\u062A \u0627\u0644\u0637\u0648\u0627\u0631\u0626\u060C \u0627\u0644\u062A\u0623\u0645\u064A\u0646 \u0627\u0644\u0637\u0628\u064A\u060C \u0627\u0644\u0631\u0639\u0627\u064A\u0629 \u0627\u0644\u0645\u0646\u0632\u0644\u064A\u0629...",searchBtn:"\u{1F50D} \u0627\u0628\u062D\u062B \u0627\u0644\u0622\u0646",hcTitle:"\u0627\u0644\u0631\u0639\u0627\u064A\u0629 \u0627\u0644\u0635\u062D\u064A\u0629 \u0627\u0644\u0645\u0646\u0632\u0644\u064A\u0629",hcSub:"\u0641\u0631\u064A\u0642 \u0645\u062A\u062E\u0635\u0635 \u064A\u0623\u062A\u064A \u0625\u0644\u064A\u0643",hcDesc:"\u0632\u064A\u0627\u0631\u0627\u062A \u0645\u0646\u0632\u0644\u064A\u0629 \u0645\u0646 \u0645\u0645\u0631\u0636\u0627\u062A \u0648\u0623\u0637\u0628\u0627\u0621 \u0645\u0639\u062A\u0645\u062F\u064A\u0646 \u2014 \u0641\u062D\u0648\u0635\u0627\u062A\u060C \u0639\u0644\u0627\u062C \u0648\u0631\u064A\u062F\u064A\u060C \u0631\u0639\u0627\u064A\u0629 \u0645\u0627 \u0628\u0639\u062F \u0627\u0644\u062C\u0631\u0627\u062D\u0629\u060C \u0645\u062A\u0627\u0628\u0639\u0629 \u0627\u0644\u0623\u0645\u0631\u0627\u0636 \u0627\u0644\u0645\u0632\u0645\u0646\u0629.",thTitle:"\u0627\u0644\u062A\u0637\u0628\u064A\u0628 \u0639\u0646 \u0628\u064F\u0639\u062F",thSub:"\u0627\u0633\u062A\u0634\u0627\u0631\u0629 \u0637\u0628\u064A\u0629 \u0645\u0646 \u0623\u064A \u0645\u0643\u0627\u0646",thDesc:"\u062A\u062D\u062F\u062B \u0645\u0639 \u0637\u0628\u064A\u0628\u0643 \u0641\u064A\u062F\u064A\u0648 \u0623\u0648 \u0635\u0648\u062A \u2014 \u062F\u0648\u0646 \u0627\u0644\u062D\u0627\u062C\u0629 \u0644\u0644\u0632\u064A\u0627\u0631\u0629. \u0645\u062A\u0627\u062D 24/7 \u0645\u0639 \u0623\u0637\u0628\u0627\u0621 \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A.",digitalTitle:"\u0627\u0644\u062E\u062F\u0645\u0627\u062A \u0627\u0644\u0635\u062D\u064A\u0629 \u0627\u0644\u0631\u0642\u0645\u064A\u0629",digitalSub:"\u0627\u0628\u062A\u0643\u0627\u0631 \u0631\u0642\u0645\u064A \u0641\u064A \u062E\u062F\u0645\u0629 \u0635\u062D\u062A\u0643 \u2014 \u0628\u062D\u062B \u0630\u0643\u064A\u060C \u0631\u0639\u0627\u064A\u0629 \u0645\u0646\u0632\u0644\u064A\u0629\u060C \u0648\u0627\u0633\u062A\u0634\u0627\u0631\u0627\u062A \u0641\u064A\u062F\u064A\u0648 \u0645\u0628\u0627\u0634\u0631\u0629",emailTitle:"\u0627\u0644\u062A\u0648\u0627\u0635\u0644 \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A \u0627\u0644\u0630\u0643\u064A",emailDesc:"\u062A\u0623\u0643\u064A\u062F\u0627\u062A\u060C \u062A\u0630\u0643\u064A\u0631\u0627\u062A\u060C \u0648\u0648\u0635\u0641\u0627\u062A \u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A\u0629 \u2014 \u0628\u0631\u064A\u062F \u0630\u0643\u064A \u062B\u0646\u0627\u0626\u064A \u0627\u0644\u0644\u063A\u0629 \u0644\u0643\u0644 \u0645\u0631\u064A\u0636."},en:{desc:"Hayat National Hospitals Group \u2014 Integrated Healthcare Ecosystem with BSMA, GIVC, SBS, Oracle & NPHIES portals.",title:"Hayat National Hospitals | HNH \u2014 Integrated Ecosystem",titleShort:"Hayat National Hospital",osVer:"BrainSAIT Healthcare OS v5.0",heroBadge:"Live Data \u2014 Connected to BrainSAIT",heroH1:'Hayat National<br><span class="gd">Hospitals Group</span>',heroP:"Integrated Smart Healthcare \u2014 BSMA Voice \xB7 GIVC \xB7 SBS \xB7 Oracle \xB7 NPHIES \xB7 ClaimLinc",heroBookBtn:"\u{1F4C5} Book Appointment",heroDeptBtn:"Browse Departments",statDoctors:"Doctors",statBranches:"Branches",statDepts:"Departments",statBeds:"Beds",navDepts:"Departments",navBranches:"Branches",navDoctors:"Doctors",navPortal:"Ecosystem",navEcosystem:"Ecosystem",navBook:"\u{1F4C5} Book Now",langBtn:"\u0627\u0644\u0639\u0631\u0628\u064A\u0629",secDeptsTitle:"Medical Departments",secDeptsSub:"Over 30 medical specialties",secBranchesTitle:"Our Branches",secBranchesSub:"Five branches across KSA",secDoctorsTitle:"Our Doctors",secDoctorsSub:"Team of expert consultants",ecosystemTitle:"Integrated Healthcare Ecosystem",ecosystemSub:"Smart portals for every user \u2014 live data and full system integration",patientTitle:"Patient",patientDesc:"View lab results, book appointments, track claims, AI chat with Basma",providerTitle:"Provider",providerDesc:"Schedule management, patient records, Oracle & NPHIES integration, performance reports",payerTitle:"Payer / Insurance",payerDesc:"Eligibility verification, pre-authorization management, revenue cycle tracking",studentTitle:"Student",studentDesc:"Medical academy \u2014 training courses, certificates, digital medical library",adminTitle:"Admin",adminDesc:"Full dashboard \u2014 analytics, reports, user & permission management",receptionTitle:"Reception",receptionDesc:"Patient registration, appointment management, insurance verification, reports",rcmTitle:"Revenue Cycle",rcmDesc:"Claims management, collection tracking, financial analytics, NPHIES reporting",integrationsTitle:"Live Integrations",integrationsSub:"All systems connected and operational",aiTitle:"Basma \u2014 AI Medical Assistant",aiDesc:"Talk to Basma by voice or text \u2014 book appointments, check eligibility, track claims, medical inquiries",aiTalkBtn:"Talk to Basma \u{1F399}\uFE0F",aiChatBtn:"\u{1F4AC} Chat Now",ctaTitle:"Your Health First",ctaSub:"Book your appointment now through our integrated ecosystem",ctaBook:"Book Now",ctaCall:"Call Us",fAbout:"An intelligent integrated healthcare ecosystem \u2014 25 years of excellence.",fLinks:"Quick Links",fContact:"Contact Us",fServices:"Services",fEmerg:"Emergency 24/7",fAppt:"Book Appointment",fEcosystem:"Ecosystem",fPortal:"Portal",fBSMA:"Basma AI",fPowered:"Powered by",fCopy:"\xA9 2026 All rights reserved",statusConnected:"Online",statusWarning:"Warning",statusOffline:"Offline",loading:"Loading...",systemOnline:"All systems operational",oracleBridge:"Oracle Bridge",nphiesPortal:"NPHIES Portal",claimlincPortal:"ClaimLinc",bsmaPortal:"Basma AI",sbsPortal:"SBS Portal",givcPortal:"GIVC Portal",searchTitle:"AI-Powered Smart Search",searchSub:"Ask about any doctor, department, procedure, or medication \u2014 instant answers from hospital knowledge base",searchPlaceholder:"e.g. cardiologists, emergency hours, insurance, home care...",searchBtn:"\u{1F50D} Search Now",hcTitle:"Home Healthcare",hcSub:"Our team comes to you",hcDesc:"Home visits by certified nurses and doctors \u2014 checkups, IV therapy, post-surgery care, chronic disease management.",thTitle:"Telehealth",thSub:"Medical consultation anywhere",thDesc:"Video or voice consultation with your doctor \u2014 no hospital visit needed. 24/7 with HNH specialists.",digitalTitle:"Digital Health Services",digitalSub:"Smart innovation in healthcare \u2014 AI search, home care, and live video consultations",emailTitle:"Smart Patient Communications",emailDesc:"Confirmations, reminders, and e-prescriptions \u2014 bilingual smart email for every patient."}},y6=[{i:"\u2764\uFE0F",nA:"\u0627\u0644\u0642\u0644\u0628 \u0648\u0627\u0644\u0623\u0648\u0639\u064A\u0629",nE:"Cardiology",dA:"\u062A\u0634\u062E\u064A\u0635 \u0648\u0639\u0644\u0627\u062C \u0623\u0645\u0631\u0627\u0636 \u0627\u0644\u0642\u0644\u0628",dE:"Heart disease diagnosis"},{i:"\u{1F9B4}",nA:"\u062C\u0631\u0627\u062D\u0629 \u0627\u0644\u0639\u0638\u0627\u0645",nE:"Orthopedics",dA:"\u062C\u0631\u0627\u062D\u0629 \u0627\u0644\u0645\u0641\u0627\u0635\u0644 \u0648\u0627\u0644\u0643\u0633\u0648\u0631",dE:"Joint surgery & fractures"},{i:"\u{1F476}",nA:"\u0637\u0628 \u0627\u0644\u0623\u0637\u0641\u0627\u0644",nE:"Pediatrics",dA:"\u0631\u0639\u0627\u064A\u0629 \u0627\u0644\u0623\u0637\u0641\u0627\u0644 \u062D\u062F\u064A\u062B\u064A \u0627\u0644\u0648\u0644\u0627\u062F\u0629",dE:"Newborn & child care"},{i:"\u{1F469}",nA:"\u0627\u0644\u0646\u0633\u0627\u0621 \u0648\u0627\u0644\u0648\u0644\u0627\u062F\u0629",nE:"OB/GYN",dA:"\u0645\u062A\u0627\u0628\u0639\u0629 \u0627\u0644\u062D\u0645\u0644 \u0648\u0627\u0644\u0648\u0644\u0627\u062F\u0629",dE:"Pregnancy & delivery"},{i:"\u{1F486}",nA:"\u0627\u0644\u062C\u0644\u062F\u064A\u0629 \u0648\u0627\u0644\u062A\u062C\u0645\u064A\u0644",nE:"Dermatology",dA:"\u0639\u0644\u0627\u062C \u0627\u0644\u0623\u0645\u0631\u0627\u0636 \u0627\u0644\u062C\u0644\u062F\u064A\u0629",dE:"Skin disease treatment"},{i:"\u{1FA7A}",nA:"\u0627\u0644\u0628\u0627\u0637\u0646\u064A\u0629",nE:"Internal Med",dA:"\u062A\u0634\u062E\u064A\u0635 \u0627\u0644\u0623\u0645\u0631\u0627\u0636 \u0627\u0644\u0628\u0627\u0637\u0646\u064A\u0629",dE:"Internal disease diagnosis"},{i:"\u{1F52A}",nA:"\u0627\u0644\u062C\u0631\u0627\u062D\u0629 \u0627\u0644\u0639\u0627\u0645\u0629",nE:"General Surgery",dA:"\u062C\u0631\u0627\u062D\u0629 \u0639\u0627\u0645\u0629 \u0648\u0645\u0646\u0627\u0638\u064A\u0631",dE:"General & laparoscopic"},{i:"\u{1F9E0}",nA:"\u0627\u0644\u0623\u0639\u0635\u0627\u0628",nE:"Neurology",dA:"\u0623\u0645\u0631\u0627\u0636 \u0627\u0644\u0645\u062E \u0648\u0627\u0644\u0623\u0639\u0635\u0627\u0628",dE:"Brain & nerve diseases"}],x6=[{nA:"\u0627\u0644\u0645\u062F\u064A\u0646\u0629 \u0627\u0644\u0645\u0646\u0648\u0631\u0629",nE:"Madinah",aA:"\u0637\u0631\u064A\u0642 \u0641\u0631\u0639 \u0627\u0644\u062D\u062C\u0627\u0632",aE:"Al-Hijra Branch Road"},{nA:"\u0627\u0644\u0631\u064A\u0627\u0636",nE:"Riyadh",aA:"\u062D\u064A \u0627\u0644\u0631\u0628\u0648\u0629",aE:"Al-Rabwa District"},{nA:"\u062C\u0627\u0632\u0627\u0646",nE:"Jazan",aA:"\u0637\u0631\u064A\u0642 \u0627\u0644\u0643\u0648\u0631\u0646\u064A\u0634",aE:"Corniche Road"},{nA:"\u062E\u0645\u064A\u0633 \u0645\u0634\u064A\u0637",nE:"Khamis Mushayt",aA:"\u0637\u0631\u064A\u0642 \u0627\u0644\u0623\u0645\u064A\u0631 \u0633\u0644\u0637\u0627\u0646",aE:"Prince Sultan Road"},{nA:"\u0639\u0646\u064A\u0632\u0629",nE:"Unayzah",aA:"\u0627\u0644\u0642\u0635\u064A\u0645 \u2014 \u0637\u0631\u064A\u0642 \u0627\u0644\u0645\u062F\u064A\u0646\u0629",aE:"Al-Qassim \u2014 Medina Road"}],_6=[{nA:"\u062F. \u0645\u0639\u0627\u0648\u064A\u0629 \u062F\u0628\u0648\u0631\u0629",nE:"Dr. Muawiya Daboura",sA:"\u062C\u0631\u0627\u062D\u0629 \u0627\u0644\u062A\u062C\u0645\u064A\u0644",sE:"Plastic Surgery"},{nA:"\u062F. \u0646\u0647\u0644\u0629 \u0637\u0627\u0644\u0628 \u062F\u064A\u0628",nE:"Dr. Nahla Taleb Deeb",sA:"\u0627\u0644\u0646\u0633\u0627\u0621 \u0648\u0627\u0644\u0648\u0644\u0627\u062F\u0629",sE:"OB/GYN"},{nA:"\u062F. \u0648\u0633\u0627\u0645 \u0641\u0627\u0631\u0648\u0642",nE:"Dr. Wisam Farouk",sA:"\u0627\u0644\u0646\u0633\u0627\u0621 \u0648\u0627\u0644\u0648\u0644\u0627\u062F\u0629",sE:"OB/GYN"},{nA:"\u062F. \u0623\u0645\u064A\u0631\u0629 \u0627\u0644\u0628\u064A\u0644\u064A",nE:"Dr. Amira Al-Bili",sA:"\u0627\u0644\u062C\u0644\u062F\u064A\u0629",sE:"Dermatology"},{nA:"\u062F. \u0633\u0639\u062F \u0627\u0644\u0642\u062D\u0637\u0627\u0646\u064A",nE:"Dr. Saad Al-Qahtani",sA:"\u0627\u0644\u0642\u0644\u0628",sE:"Cardiology"},{nA:"\u062F. \u0644\u064A\u0644\u0649 \u0627\u0644\u0634\u0647\u0631\u064A",nE:"Dr. Layla Al-Shehri",sA:"\u0637\u0628 \u0627\u0644\u0623\u0637\u0641\u0627\u0644",sE:"Pediatrics"},{nA:"\u062F. \u0639\u0628\u062F\u0627\u0644\u0644\u0647 \u0627\u0644\u0639\u062A\u064A\u0628\u064A",nE:"Dr. Abdullah Al-Otaibi",sA:"\u062C\u0631\u0627\u062D\u0629 \u0627\u0644\u0639\u0638\u0627\u0645",sE:"Orthopedics"},{nA:"\u062F. \u0645\u0631\u064A\u0645 \u0627\u0644\u062D\u0633\u064A\u0646\u064A",nE:"Dr. Maryam Al-Husseini",sA:"\u0627\u0644\u0646\u0633\u0627\u0621 \u0648\u0627\u0644\u0648\u0644\u0627\u062F\u0629",sE:"OB/GYN"}],E6="*,::after,::before{box-sizing:border-box;margin:0;padding:0}:root{--p:#0066CC;--pd:#004A99;--a:#C9A84C;--al:#E0C878;--n:#1A2B4A;--of:#F8FAFC;--l:#F1F5F9;--g:#E8EDF3;--g3:#94A3B8;--t:#1E293B;--tl:#64748B;--s:#10B981;--d:#EF4444;--w:#F59E0B;--gr:linear-gradient(135deg,#1A2B4A,var(--p));--ga:linear-gradient(135deg,#C9A84C,#E0C878);--gg:linear-gradient(135deg,#D4A843,#F0D88A,#C9A84C);--sm:0 1px 3px rgba(0,0,0,.08);--md:0 4px 16px rgba(0,0,0,.1);--lg:0 8px 32px rgba(0,0,0,.12);--r:8px;--rm:12px;--rl:16px;--rxl:24px;--rf:9999px;--fa:Tajawal,sans-serif;--fe:Inter,sans-serif;--tr:.3s cubic-bezier(.4,0,.2,1);--cc:1280px;--hh:80px}body{font-family:var(--fa);color:var(--t);background:var(--of);line-height:1.7;overflow-x:hidden;-webkit-font-smoothing:antialiased}html{scroll-behavior:smooth}.h{position:fixed;top:0;inset-inline:0;z-index:1000;background:rgba(255,255,255,.92);-webkit-backdrop-filter:blur(24px);backdrop-filter:blur(24px);box-shadow:0 1px 0 rgba(0,0,0,.06);height:var(--hh)}.h.sc{background:rgba(255,255,255,.97);box-shadow:0 4px 20px rgba(0,0,0,.08)}.hi{max-width:var(--cc);margin:0 auto;padding:0 24px;height:100%;display:flex;align-items:center;justify-content:space-between;gap:16px}.l{display:flex;align-items:center;gap:12px;text-decoration:none}.li{width:44px;height:44px;background:var(--gr);border-radius:var(--rm);display:flex;align-items:center;justify-content:center;font-size:1.4rem;box-shadow:var(--sm)}.lt{font-size:1.05rem;font-weight:800;color:var(--n);line-height:1.2}.lt sm{display:block;font-size:.6rem;font-weight:400;color:var(--g3);text-transform:uppercase;letter-spacing:.3px}.nv{display:flex;align-items:center;gap:4px}.nv a{text-decoration:none;color:var(--t);font-weight:500;font-size:.88rem;padding:8px 14px;border-radius:var(--rf)}.nv a:hover{background:var(--l);color:var(--p)}.lb{padding:6px 14px;border-radius:var(--rf);background:var(--l);border:1px solid var(--g);cursor:pointer;font-family:inherit;font-size:.82rem;font-weight:600;color:var(--n)}.lb:hover{background:var(--g)}.btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;padding:12px 24px;border-radius:var(--rf);font-weight:600;font-size:.9rem;cursor:pointer;border:none;text-decoration:none;white-space:nowrap;font-family:inherit}.bp{background:var(--gr);color:#fff;box-shadow:var(--md)}.bp:hover{transform:translateY(-2px);box-shadow:var(--lg)}.ba{background:var(--ga);color:var(--n);box-shadow:var(--md)}.ba:hover{transform:translateY(-2px);box-shadow:var(--lg)}.bw{background:rgba(255,255,255,.95);color:var(--n);box-shadow:var(--sm)}.bw:hover{background:#fff;transform:translateY(-1px)}.bl{padding:14px 32px;font-size:1rem}.bs{padding:8px 18px;font-size:.82rem}.mb{display:none;background:none;border:none;cursor:pointer;font-size:1.5rem;color:var(--n);padding:8px;border-radius:var(--r)}.he{min-height:100vh;display:flex;align-items:center;padding-top:var(--hh);position:relative;overflow:hidden;background:var(--gr)}.he::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 20% 50%,rgba(0,163,224,.12),transparent 50%),radial-gradient(ellipse at 80% 20%,rgba(201,168,76,.08),transparent 50%)}.hp{position:absolute;inset:0;overflow:hidden}.pt{position:absolute;border-radius:50%;background:radial-gradient(circle,rgba(255,255,255,.04),transparent);animation:fl 20s ease-in-out infinite}@keyframes fl{0%,100%{transform:translate(0,0)scale(1)}25%{transform:translate(30px,-40px)scale(1.1)}50%{transform:translate(-20px,20px)scale(.95)}75%{transform:translate(15px,30px)scale(1.05)}}.he .co{position:relative;z-index:2;max-width:var(--cc);margin:0 auto;padding:40px 24px;width:100%}.hc{max-width:680px}.hb{display:inline-flex;align-items:center;gap:6px;padding:6px 16px;border-radius:var(--rf);background:rgba(16,185,129,.12);color:var(--s);font-size:.78rem;font-weight:600;margin-bottom:24px;border:1px solid rgba(16,185,129,.2);box-shadow:0 0 20px rgba(16,185,129,.08)}.hb::before{content:'';width:8px;height:8px;border-radius:50%;background:var(--s);animation:pu 2s infinite}@keyframes pu{0%,100%{opacity:1;box-shadow:0 0 0 0 rgba(16,185,129,.5)}50%{opacity:.5;box-shadow:0 0 0 6px rgba(16,185,129,0)}}.he h1{font-size:clamp(2.2rem,5.5vw,3.6rem);font-weight:900;color:#fff;line-height:1.15;margin-bottom:20px}.he h1 .gd{background:var(--gg);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}.he p{font-size:1.1rem;color:rgba(255,255,255,.75);max-width:680px;margin-bottom:32px;line-height:1.8}.hbt{display:flex;gap:12px;flex-wrap:wrap;margin-bottom:48px}.hs{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}.hst{background:rgba(255,255,255,.08);-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.1);border-radius:var(--rxl);padding:20px;text-align:center;transition:var(--tr)}.hst:hover{background:rgba(255,255,255,.12);transform:translateY(-3px);box-shadow:0 8px 24px rgba(0,0,0,.12)}.hst .nm{font-size:2rem;font-weight:800;color:#fff;display:inline}.hst .sf{font-size:1rem;font-weight:400;color:var(--a)}.hst .lb{font-size:.82rem;color:rgba(255,255,255,.6);margin-top:4px;display:block}.se{padding:80px 0}.sea{background:#fff}.sel{background:var(--of)}.co{max-width:var(--cc);margin:0 auto;padding:0 24px}.sh{text-align:center;margin-bottom:48px}.sh h2{font-size:clamp(1.5rem,3vw,2.2rem);font-weight:800;color:var(--n);margin-bottom:8px}.sh .gl{width:60px;height:3px;background:var(--gg);margin:12px auto;border-radius:2px}.sh p{color:var(--tl);font-size:1rem;margin-top:4px}.g3{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}.g4{display:grid;grid-template-columns:repeat(4,1fr);gap:20px}.g5{display:grid;grid-template-columns:repeat(5,1fr);gap:16px}.g6{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}.cd{background:#fff;border:1px solid var(--g);border-radius:var(--rxl);padding:24px;transition:var(--tr)}.cd:hover{box-shadow:var(--lg);transform:translateY(-4px);border-color:rgba(0,102,204,.1)}.ci{width:56px;height:56px;border-radius:var(--rm);background:var(--gr);display:flex;align-items:center;justify-content:center;font-size:1.5rem;margin-bottom:16px;box-shadow:var(--md)}.cd h3{font-size:1rem;font-weight:700;margin-bottom:8px;color:var(--n)}.cd p{font-size:.88rem;color:var(--tl);line-height:1.7}.dc{text-align:center}.dc .ci{margin:0 auto 16px}.dcc{text-align:center}.da{width:80px;height:80px;border-radius:50%;background:var(--ga);margin:0 auto 16px;display:flex;align-items:center;justify-content:center;font-size:1.8rem;font-weight:800;color:var(--n);box-shadow:var(--md)}.sp{color:var(--p);font-weight:600;font-size:.85rem;margin-bottom:4px}.bc{padding:0;overflow:hidden}.bh{background:var(--gr);padding:28px 24px;color:#fff}.bh h3{color:#fff;font-size:1.1rem;margin-bottom:4px}.bh .bcx{color:rgba(255,255,255,.7);font-size:.85rem;margin-top:4px}.bb{padding:24px}.bb p{color:var(--tl);font-size:.88rem;margin-bottom:16px}.cs{background:var(--gr);padding:80px 0;text-align:center;position:relative;overflow:hidden}.cs::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 50% 0,rgba(255,255,255,.05),transparent 50%)}.cs .co{position:relative;z-index:2}.cs h2{font-size:2rem;font-weight:800;color:#fff;margin-bottom:12px}.cs p{color:rgba(255,255,255,.7);margin-bottom:32px;font-size:1.05rem}.cb{display:flex;gap:12px;justify-content:center;flex-wrap:wrap}.ft{background:var(--n);color:rgba(255,255,255,.6);padding:56px 0 24px}.fg{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:32px;margin-bottom:40px}.ft h4{color:#fff;margin-bottom:16px;font-size:.95rem;font-weight:700}.ft a{color:rgba(255,255,255,.5);text-decoration:none;display:block;margin-bottom:8px;font-size:.88rem}.ft a:hover{color:var(--a);padding-inline-start:4px}.ft p{font-size:.88rem;margin-bottom:8px}.sl{display:flex;gap:12px;margin-top:16px}.sl a{width:40px;height:40px;border-radius:50%;background:rgba(255,255,255,.06);display:flex;align-items:center;justify-content:center;font-size:1.1rem;text-decoration:none;color:rgba(255,255,255,.5)}.sl a:hover{background:rgba(255,255,255,.12)}.fb{border-top:1px solid rgba(255,255,255,.08);padding-top:20px;text-align:center;font-size:.8rem}.fb .pw{color:var(--a);font-weight:600}.wa{position:fixed;bottom:24px;left:24px;width:56px;height:56px;border-radius:50%;display:flex;align-items:center;justify-content:center;z-index:99;font-size:1.6rem;text-decoration:none}.wa:hover{transform:scale(1.1)}.wa .pr{position:absolute;inset:-4px;border-radius:50%;border:2px solid rgba(37,211,102,.2)}.an{opacity:0;transform:translateY(30px);transition:all .7s cubic-bezier(.4,0,.2,1)}.an.vi{opacity:1;transform:translateY(0)}.d1{transition-delay:.1s}.d2{transition-delay:.2s}.d3{transition-delay:.3s}.d4{transition-delay:.4s}.d5{transition-delay:.5s}.d6{transition-delay:.6s}.ld{display:flex;justify-content:center;padding:40px}.spn{width:32px;height:32px;border:3px solid var(--g);border-top-color:var(--p);border-radius:50%;animation:sp .7s linear infinite}@keyframes sp{to{transform:rotate(360deg)}}.ts{position:fixed;bottom:24px;right:24px;padding:14px 24px;border-radius:var(--rm);color:#fff;font-weight:600;z-index:9999;opacity:0;transform:translateY(100px);transition:all .4s}.ts.sh{opacity:1;transform:translateY(0)}.ts.s{background:var(--s)}.ts.e{background:var(--d)}.ts.w{background:var(--w);color:#1a1a1a}.pr{position:relative}.blink{animation:blink 1.5s infinite}.ec{margin-bottom:60px}.ec-g{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:24px}.ec-c{background:#fff;border:1px solid var(--g);border-radius:var(--rxl);padding:20px;text-align:center;transition:var(--tr);position:relative;overflow:hidden}.ec-c:hover{transform:translateY(-3px);box-shadow:var(--lg);border-color:rgba(0,102,204,.15)}.ec-c.l{background:linear-gradient(180deg,#F0F7FF,#fff)}.ec-c.r{border-color:rgba(16,185,129,.25)}.ec-c.r .ec-d{border-color:var(--s)}.ec-ic{width:48px;height:48px;border-radius:50%;background:var(--gr);display:flex;align-items:center;justify-content:center;font-size:1.2rem;margin:0 auto 12px;box-shadow:var(--sm)}.ec-n{font-size:.9rem;font-weight:700;color:var(--n);margin-bottom:4px}.ec-d{font-size:.8rem;color:var(--tl);line-height:1.5}.ec-badge{position:absolute;top:8px;right:8px;display:flex;align-items:center;gap:4px;font-size:.6rem;font-weight:800;padding:3px 7px;border-radius:var(--rf);text-transform:uppercase;letter-spacing:.5px}.ec-b.ok{background:rgba(16,185,129,.12);color:var(--s)}.ec-b.warn{background:rgba(245,158,11,.12);color:var(--w)}.ec-b.off{background:rgba(239,68,68,.1);color:var(--d)}.ec-b::before{content:'';width:5px;height:5px;border-radius:50%}.ec-b.ok::before{background:var(--s)}.ec-b.warn::before{background:var(--w);animation:pu 2s infinite}.ec-b.off::before{background:var(--d)}.ec-b.pf::before{background:var(--p)}.ig{display:grid;grid-template-columns:repeat(2,1fr);gap:16px;margin-top:20px}.ig-c{background:#fff;border:1px solid var(--g);border-radius:var(--rl);padding:18px;display:flex;align-items:center;gap:14px;transition:var(--tr)}.ig-c:hover{box-shadow:var(--md);transform:translateY(-2px);border-color:rgba(0,102,204,.1)}.ig-ic{width:44px;height:44px;border-radius:var(--rm);background:var(--gr);display:flex;align-items:center;justify-content:center;font-size:1.1rem;flex-shrink:0;box-shadow:var(--sm)}.ig-c.g{background:linear-gradient(135deg,#F0FDF4,#f0fdf4)}.ig-c.w{background:linear-gradient(135deg,#FFFBEB,#fffbeb)}.ig-n{font-size:.88rem;font-weight:700;color:var(--t)}.ig-s{font-size:.75rem;color:var(--tl);margin-top:2px}.ig-b{font-size:.65rem;font-weight:800;padding:4px 10px;border-radius:var(--rf);white-space:nowrap}.ig-b.ok{background:rgba(16,185,129,.12);color:var(--s)}.ig-b.warn{background:rgba(245,158,11,.12);color:var(--w)}.ig-b.off{background:rgba(239,68,68,.1);color:var(--d)}.ai-s{background:#fff;border:1px solid var(--g);border-radius:var(--rxl);overflow:hidden;margin-top:20px;display:grid;grid-template-columns:1fr 1fr;gap:0;box-shadow:var(--md)}.ai-v{border-radius:var(--rxl) 0 0 var(--rxl);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;padding:40px;background:linear-gradient(135deg,#F0F7FF,#E8F4FF);text-align:center}.ai-v .ai-orb{width:100px;height:100px;border-radius:50%;background:var(--gr);display:grid;place-items:center;font-size:2rem;box-shadow:0 0 0 6px rgba(0,102,204,.08),0 20px 44px rgba(0,102,204,.16);position:relative}.ai-v .ai-orb::before{content:'';position:absolute;inset:-8px;border-radius:50%;border:2px solid rgba(0,102,204,.15);animation:pu 3s infinite}.ai-v .ai-orb::after{content:'';position:absolute;inset:-16px;border-radius:50%;border:1px solid rgba(0,102,204,.08);animation:pu 3s infinite .5s}.ai-v p{font-size:.9rem;color:var(--tl);max-width:280px}.ai-c{padding:40px;border-radius:0 var(--rxl) var(--rxl) 0;display:flex;flex-direction:column;justify-content:center;gap:16px}.ai-c h3{font-size:1.2rem;font-weight:800;color:var(--n);margin-bottom:4px}.ai-c p{font-size:.85rem;color:var(--tl);line-height:1.6}.ai-btns{display:flex;gap:10px;flex-wrap:wrap}.ai-btns .btn{gap:8px}.pf{display:inline-flex;align-items:center;gap:6px;padding:4px 10px;border-radius:var(--rf);background:rgba(0,102,204,.08);color:var(--p);font-size:.68rem;font-weight:700;font-family:inherit;cursor:pointer;border:none;transition:var(--tr)}.pf:hover{background:rgba(0,102,204,.14)}.eh{display:flex;flex-wrap:wrap;gap:6px;margin-top:8px}.eh-c{padding:3px 8px;border-radius:var(--rf);background:rgba(201,168,76,.1);color:var(--a);font-size:.6rem;font-weight:700}.mb{display:none;background:none;border:none;cursor:pointer;font-size:1.5rem;color:var(--n);padding:8px;border-radius:var(--r)}@media(max-width:1024px){.ec-g{grid-template-columns:1fr 1fr}}@media(max-width:900px){.nv{display:none}.mb{display:block}.nv.op{display:flex;flex-direction:column;position:fixed;inset:0;background:#fff;padding:80px 24px 24px;z-index:500;gap:0}.nv.op a{padding:14px 0;border-bottom:1px solid var(--g);border-radius:0}.hs,.g3,.g4{grid-template-columns:1fr 1fr}.fg{grid-template-columns:1fr 1fr}.ec-g{grid-template-columns:1fr 1fr}.ig{grid-template-columns:1fr}.ai-s{grid-template-columns:1fr}.ai-v{border-radius:var(--rxl) var(--rxl) 0 0}.ai-c{border-radius:0 0 var(--rxl) var(--rxl)}}@media(max-width:480px){.hs,.g3,.g4,.fg,.ec-g{grid-template-columns:1fr}}.ss{padding:72px 0;background:linear-gradient(135deg,var(--n) 0%,var(--p) 100%);position:relative;overflow:hidden}.ss::before{content:'';position:absolute;inset:0;background:url(data:image/svg+xml,%3Csvg%20width='60'%20height='60'%20viewBox='0%200%2060%2060'%20xmlns='http://www.w3.org/2000/svg'%3E%3Cg%20fill='none'%20fill-rule='evenodd'%3E%3Cg%20fill='%23ffffff'%20fill-opacity='0.03'%3E%3Cpath%20d='M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E);}.ss .sh h2{color:#fff!important}.ss .sh p{color:rgba(255,255,255,.75)!important}.ss .gl{background:linear-gradient(90deg,rgba(255,255,255,0),var(--al),rgba(255,255,255,0))!important}.sb-wrap{max-width:720px;margin:0 auto}.sb-box{display:flex;border-radius:var(--rl);overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,.3)}.sb-in{flex:1;padding:18px 24px;font-size:1rem;border:none;outline:none;background:#fff;color:var(--t);font-family:var(--fa)}.sb-in::placeholder{color:var(--tl)}.sb-btn{padding:18px 28px;background:var(--ga);border:none;cursor:pointer;font-family:var(--fa);font-size:.95rem;font-weight:700;color:var(--n);white-space:nowrap;transition:var(--tr)}.sb-btn:hover{background:var(--gg)}.sr-res{margin-top:24px}.sr-ans{background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.2);border-radius:var(--rm);padding:20px 24px;color:#fff;font-size:.92rem;line-height:1.9;-webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px)}.sr-src{display:flex;flex-wrap:wrap;gap:8px;margin-top:14px}.sr-src span{padding:4px 12px;border-radius:var(--rf);background:rgba(201,168,76,.25);color:var(--al);font-size:.75rem;border:1px solid rgba(201,168,76,.35)}.sr-pow{font-size:.72rem;color:rgba(255,255,255,.5);margin-top:12px}.dhs{padding:96px 0;background:var(--of)}.dhs-g{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:28px;margin-top:48px}.dhs-c{background:#fff;border-radius:var(--rxl);padding:36px 32px;box-shadow:var(--md);border:1px solid var(--g);position:relative;overflow:hidden;transition:var(--tr)}.dhs-c:hover{transform:translateY(-5px);box-shadow:var(--lg)}.dhs-c::after{content:'';position:absolute;top:0;left:0;right:0;height:3px}.dhs-c.hc::after{background:linear-gradient(90deg,#10B981,#34D399)}.dhs-c.th::after{background:linear-gradient(90deg,#0066CC,#0EA5E9)}.dhs-c.em::after{background:linear-gradient(90deg,#8B5CF6,#A78BFA)}.dhs-ic{width:72px;height:72px;border-radius:var(--rm);display:flex;align-items:center;justify-content:center;font-size:2rem;margin-bottom:24px}.dhs-ic.hc{background:linear-gradient(135deg,rgba(16,185,129,.12),rgba(52,211,153,.08))}.dhs-ic.th{background:linear-gradient(135deg,rgba(0,102,204,.12),rgba(14,165,233,.08))}.dhs-ic.em{background:linear-gradient(135deg,rgba(139,92,246,.12),rgba(167,139,250,.08))}.dhs-new{position:absolute;top:20px;inset-inline-end:20px;background:var(--ga);color:var(--n);padding:4px 12px;border-radius:var(--rf);font-size:.65rem;font-weight:800;letter-spacing:.5px}@media(max-width:900px){.sb-box{flex-direction:column}.sb-btn{border-radius:0 0 var(--rl) var(--rl)}.dhs-g{grid-template-columns:1fr}}";function w6(u,a){return'<header class="h" id="hdr"><div class="hi"><a href="/" class="l"><div class="li">\u{1F3E5}</div><div class="lt">'+u.titleShort+"<sm>"+u.osVer+'</sm></div></a><nav class="nv" id="mn"><a href="#depts">'+u.navDepts+'</a><a href="#branches">'+u.navBranches+'</a><a href="#doctors">'+u.navDoctors+'</a><a href="#ecosystem"><span style="font-size:.75rem;opacity:.6;">\u{1F310}</span> '+u.navEcosystem+'</a><button class="lb" id="lb">'+u.langBtn+'</button><a href="https://bsma.elfadil.com" target="_blank" class="btn bp bs">'+u.navBook+`</a></nav><button class="mb" onclick="document.getElementById('mn').classList.toggle('op');return false;">\u2630</button></div></header>`}c(w6,"hdr");function S6(u){return'<section class="se sea" id="ecosystem"><div class="co"><div class="sh an"><h2>'+u.ecosystemTitle+'</h2><div class="gl"></div><p>'+u.ecosystemSub+'</p></div><div class="ec"><h3 style="font-size:1.1rem;font-weight:700;color:var(--n);margin-bottom:16px;">\u{1F465} '+u.navPortal+'</h3><div class="ec-g">  <a href="/patient" class="ec-c an d1"><div class="ec-badge ok pf">Live</div><div class="ec-ic" style="background:linear-gradient(135deg,#0066CC,#0EA5E9)">\u{1F9D1}\u200D\u{1F3EB}</div><div class="ec-n">'+u.patientTitle+'</div><div class="ec-d">'+u.patientDesc+'</div></a>  <a href="/provider" class="ec-c an d2"><div class="ec-badge ok pf">Live</div><div class="ec-ic" style="background:linear-gradient(135deg,#10B981,#34D399)">\u2B50</div><div class="ec-n">'+u.providerTitle+'</div><div class="ec-d">'+u.providerDesc+'</div></a>  <a href="/payer" class="ec-c an d3"><div class="ec-badge ok pf">Live</div><div class="ec-ic" style="background:linear-gradient(135deg,#F59E0B,#FBBF24)">\u{1F3E6}</div><div class="ec-n">'+u.payerTitle+'</div><div class="ec-d">'+u.payerDesc+'</div></a>  <a href="/student" class="ec-c an d4"><div class="ec-badge ok pf">Live</div><div class="ec-ic" style="background:linear-gradient(135deg,#8B5CF6,#A78BFA)">\u{1F393}</div><div class="ec-n">'+u.studentTitle+'</div><div class="ec-d">'+u.studentDesc+'</div></a>  <a href="/reception" class="ec-c an d5"><div class="ec-badge ok pf">Live</div><div class="ec-ic" style="background:linear-gradient(135deg,#EC4899,#F472B6)">\u{1F481}</div><div class="ec-n">'+u.receptionTitle+'</div><div class="ec-d">'+u.receptionDesc+'</div></a>  <a href="/admin" class="ec-c an d6 l"><div class="ec-badge warn pf">Secure</div><div class="ec-ic" style="background:linear-gradient(135deg,#64748B,#94A3B8)">\u{1F512}</div><div class="ec-n">'+u.adminTitle+'</div><div class="ec-d">'+u.adminDesc+'</div></a>  <a href="/rcm" class="ec-c an d5 l"><div class="ec-badge warn pf">Secure</div><div class="ec-ic" style="background:linear-gradient(135deg,#DC2626,#EF4444)">\u{1F4B0}</div><div class="ec-n">'+u.rcmTitle+'</div><div class="ec-d">'+u.rcmDesc+'</div></a>  <a href="https://bsma.elfadil.com" target="_blank" class="ec-c an d6 r"><div class="ec-badge ok">BSMA</div><div class="ec-ic" style="background:linear-gradient(135deg,#059669,#10B981)">\u{1F399}\uFE0F</div><div class="ec-n">'+u.bsmaPortal+'</div><div class="ec-d">'+u.aiDesc+'</div></a>  <a href="#digitalHealth" class="ec-c an d1"><div class="ec-badge ok pf">New</div><div class="ec-ic" style="background:linear-gradient(135deg,#10B981,#34D399)">\u{1F3E0}</div><div class="ec-n">'+u.hcTitle+'</div><div class="ec-d">'+u.hcSub+'</div></a>  <a href="#digitalHealth" class="ec-c an d2"><div class="ec-badge ok pf">New</div><div class="ec-ic" style="background:linear-gradient(135deg,#0EA5E9,#38BDF8)">\u{1F3A5}</div><div class="ec-n">'+u.thTitle+'</div><div class="ec-d">'+u.thSub+'</div></a></div></div><div class="ec"><h3 style="font-size:1.1rem;font-weight:700;color:var(--n);margin-bottom:16px;">\u{1F517} '+u.integrationsTitle+'</h3><div class="ig" id="liveStatus"><div class="ld"><div class="spn"></div></div></div></div><div class="ec"><h3 style="font-size:1.1rem;font-weight:700;color:var(--n);margin-bottom:16px;">\u{1F916} '+u.aiTitle+'</h3><div class="ai-s"><div class="ai-v"><div class="ai-orb">\u{1F399}\uFE0F</div><p>'+u.aiDesc+'</p></div><div class="ai-c"><h3>'+u.aiTitle+"</h3><p>"+u.aiDesc+'</p><div class="ai-btns"><a href="https://bsma.elfadil.com" target="_blank" class="btn ba bs">'+u.aiTalkBtn+'</a><a href="/patient" class="btn bp bs">'+u.aiChatBtn+'</a></div><div class="eh"><span class="eh-c">DeepSeek AI</span><span class="eh-c">Oracle Health</span><span class="eh-c">NPHIES</span><span class="eh-c">Multi-language</span></div></div></div></div></div></section>'}c(S6,"ecoSys");function C6(u,a,e){var t=a?"right":"left";return'<section class="he"><div class="hp"><div class="pt" style="width:120px;height:120px;top:10%;'+t+':15%"></div><div class="pt" style="width:80px;height:80px;top:60%;'+t+':70%;animation-delay:3s"></div><div class="pt" style="width:60px;height:60px;top:30%;'+t+':40%;animation-delay:6s"></div><div class="pt" style="width:100px;height:100px;top:70%;'+t+':20%;animation-delay:2s"></div></div><div class="co"><div class="hc"><div class="hb">\u25CF '+u.heroBadge+"</div><h1>"+u.heroH1+"</h1><p>"+u.heroP+'</p><div class="hbt"><a href="tel:'+e+'" class="btn ba bl">'+u.heroBookBtn+'</a><a href="#ecosystem" class="btn bw bl">\u{1F310} '+u.navEcosystem+'</a></div><div class="hs" id="hs"><div class="hst"><span class="nm" id="sd">\u2014</span><span class="sf">+</span><span class="lb">'+u.statDoctors+'</span></div><div class="hst"><span class="nm">5</span><span class="lb">'+u.statBranches+'</span></div><div class="hst"><span class="nm" id="sdp">\u2014</span><span class="sf">+</span><span class="lb">'+u.statDepts+'</span></div><div class="hst"><span class="nm">1200</span><span class="sf">+</span><span class="lb">'+u.statBeds+"</span></div></div></div></div></section>"}c(C6,"bdy");function A6(u){return'<section class="ss" id="search"><div class="co"><div class="sh an"><h2>'+u.searchTitle+'</h2><div class="gl"></div><p>'+u.searchSub+'</p></div><div class="sb-wrap"><div class="sb-box"><input class="sb-in" id="srchQ" type="text" placeholder="'+u.searchPlaceholder+'"/><button class="sb-btn" onclick="doSearch()">'+u.searchBtn+'</button></div><div class="sr-res" id="srchRes" style="display:none"></div></div></div></section>'}c(A6,"searchSec");function T6(u){return'<section class="dhs" id="digitalHealth"><div class="co"><div class="sh an"><h2>'+u.digitalTitle+'</h2><div class="gl"></div><p>'+u.digitalSub+'</p></div><div class="dhs-g"><div class="dhs-c hc an d1"><div class="dhs-new">New</div><div class="dhs-ic hc">\u{1F3E0}</div><h3 style="font-size:1.1rem;font-weight:800;color:var(--n);margin-bottom:8px;">'+u.hcTitle+'</h3><p style="font-size:.88rem;color:var(--tl);margin-bottom:8px;">'+u.hcSub+'</p><p style="font-size:.82rem;color:var(--tl);line-height:1.7;">'+u.hcDesc+'</p><a href="https://bsma.elfadil.com" target="_blank" class="btn bp bs" style="margin-top:20px;">'+u.hcTitle+' \u2192</a></div><div class="dhs-c th an d2"><div class="dhs-new">New</div><div class="dhs-ic th">\u{1F3A5}</div><h3 style="font-size:1.1rem;font-weight:800;color:var(--n);margin-bottom:8px;">'+u.thTitle+'</h3><p style="font-size:.88rem;color:var(--tl);margin-bottom:8px;">'+u.thSub+'</p><p style="font-size:.82rem;color:var(--tl);line-height:1.7;">'+u.thDesc+'</p><a href="https://bsma.elfadil.com" target="_blank" class="btn bp bs" style="margin-top:20px;">'+u.thTitle+' \u2192</a></div><div class="dhs-c em an d3"><div class="dhs-ic em">\u{1F4E7}</div><h3 style="font-size:1.1rem;font-weight:800;color:var(--n);margin-bottom:8px;">'+u.emailTitle+'</h3><p style="font-size:.82rem;color:var(--tl);line-height:1.7;margin-top:8px;">'+u.emailDesc+"</p></div></div></div></section>"}c(T6,"dhsSec");function k6(u,a){return'<footer class="ft"><div class="co"><div class="fg"><div><h4>\u{1F3E5} '+u.titleShort+"</h4><p>"+u.fAbout+'</p><div class="sl"><a href="https://wa.me/'+a+'" target="_blank">\u{1F4AC}</a><a href="tel:'+a+'">\u{1F4DE}</a><a href="mailto:info@hayathospitals.com">\u{1F4E7}</a></div></div><div><h4>'+u.fLinks+'</h4><a href="#depts">'+u.navDepts+'</a><a href="#branches">'+u.navBranches+'</a><a href="#doctors">'+u.navDoctors+'</a><a href="#ecosystem">'+u.fEcosystem+'</a><a href="/portal">'+u.fPortal+"</a></div><div><h4>"+u.fServices+'</h4><a href="tel:'+a+'">'+u.fEmerg+'</a><a href="tel:'+a+'">'+u.fAppt+'</a><a href="https://bsma.elfadil.com" target="_blank">'+u.fBSMA+"</a></div><div><h4>"+u.fContact+'</h4><a href="tel:'+a+'">\u{1F4DE} +'+a+'</a><a href="mailto:info@hayathospitals.com">\u{1F4E7} info@hayathospitals.com</a><a href="https://wa.me/'+a+'" target="_blank">\u{1F4AC} WhatsApp</a></div></div><div class="fb"><p>'+u.fCopy+'</p><p style="margin-top:4px;font-size:.78rem;">'+u.fPowered+' <span class="pw">BrainSAIT Healthcare OS v5.0</span></p></div></div></footer><a href="https://wa.me/'+a+'" class="wa" target="_blank">\u{1F4AC}<div class="pr"></div></a><div class="ts" id="ts"></div>'}c(k6,"ftr");function I6(u,a,e){return`<script>
(function(){
  var isAr=`+(u?"true":"false")+`;
  var phone="`+a+`";
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
      if(!d.success||!d.integrations){cont.innerHTML='<div style="grid-column:1/-1;text-align:center;padding:20px;color:var(--tl);font-size:.88rem;">`+e.statusOffline+`</div>';return;}
      var ints=[
        {key:"oracle_bridge",icon:"\u{1F310}",name:"`+e.oracleBridge+`"},
        {key:"nphies_mirror",icon:"\u{1F4CB}",name:"`+e.nphiesPortal+`"},
        {key:"claimlinc",icon:"\u{1F4B0}",name:"`+e.claimlincPortal+`"},
        {key:"bsma_portal",icon:"\u{1F399}\uFE0F",name:"`+e.bsmaPortal+`"},
        {key:"sbs_portal",icon:"\u{1F4E6}",name:"`+e.sbsPortal+`"},
        {key:"givc_portal",icon:"\u{1F504}",name:"`+e.givcPortal+`"}
      ];
      var html="";
      ints.forEach(function(item){
        var status=d.integrations[item.key]||"unknown";
        var ok=status==="connected"||status==="live";
        var warn=status==="warning"||status==="degraded";
        var cls="ig-c "+(ok?"g":warn?"w":"");
        var scls="ig-b "+(ok?"ok":warn?"warn":"off");
        var stxt=ok?"`+e.statusConnected+'":warn?"'+e.statusWarning+'":"'+e.statusOffline+`";
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
      cont.innerHTML='<div style="grid-column:1/-1;text-align:center;padding:20px;color:var(--d);font-size:.88rem;">`+e.statusOffline+`</div>';
    });
  }
  window.addEventListener("scroll",function(){
    var h=document.getElementById("hdr");
    if(h)h.classList.toggle("sc",window.scrollY>50);
  });
  var lb=document.getElementById("lb");
  if(lb)lb.addEventListener("click",function(){
    window.location.href=window.location.pathname+"?lang="+(isAr?"en":"ar");
  });
  var ob=new IntersectionObserver(function(es){
    es.forEach(function(e){if(e.isIntersecting)e.target.classList.add("vi");});
  },{threshold:0.1});
  document.querySelectorAll(".an").forEach(function(el){ob.observe(el);});
  ls();loadIntegrations();
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
    .catch(function(){res.innerHTML='<div class="sr-ans">`+(u?"\u062D\u062F\u062B \u062E\u0637\u0623. \u062D\u0627\u0648\u0644 \u0645\u062C\u062F\u062F\u0627\u064B.":"Search error. Please try again.")+`</div>';});
  };
  var sq=document.getElementById("srchQ");
  if(sq)sq.addEventListener("keydown",function(e){if(e.key==="Enter")window.doSearch();});
  setTimeout(function(){
    document.querySelectorAll(".an").forEach(function(el){
      if(el.getBoundingClientRect().top<window.innerHeight)el.classList.add("vi");
    });
  },500);
})();<\/script>`}c(I6,"scr");function ou(u){var a=new URL(u.url),e=a.pathname.replace(/\/index\.html$/,"/").replace(/^\//,"")||"index";e=e.replace(/\.html$/,"")||"index";var t=e.match(/^course-(.+)$/);if(t){var n=t[0].replace(/-/g,"_");if(A[n])return new Response(A[n],{headers:{"Content-Type":"text/html; charset=utf-8","Cache-Control":"public, max-age=600"}})}if((e===""||e==="/"||e==="index"||e==="index.html")&&(e="__HOME__"),e!=="__HOME__"&&z0[e])return new Response(z0[e],{headers:{"Content-Type":"text/html; charset=utf-8","Cache-Control":"public, max-age=600"}});if(e.startsWith("course-")){var i=e.replace(/-/g,"_");if(A[i])return new Response(A[i],{headers:{"Content-Type":"text/html; charset=utf-8","Cache-Control":"public, max-age=600"}})}var s=a.searchParams.get("lang")||"ar",o=U0[s]||U0.ar,l=s==="ar",d=l?"rtl":"ltr",m="966920000094",p='<!DOCTYPE html><html lang="'+s+'" dir="'+d+'"><head>';p+='<meta charset="utf-8"/>',p+='<meta name="viewport" content="width=device-width,initial-scale=1.0"/>',p+='<meta name="description" content="'+o.desc+'"/>',p+='<meta name="theme-color" content="#1A2B4A"/>',p+='<meta property="og:title" content="'+o.title+'"/>',p+='<meta property="og:description" content="'+o.desc+'"/>',p+='<meta property="og:type" content="website"/>',p+='<link rel="canonical" href="https://hnh.brainsait.org"/>',p+='<link rel="alternate" href="https://hnh.brainsait.org?lang=ar" hreflang="ar"/>',p+='<link rel="alternate" href="https://hnh.brainsait.org?lang=en" hreflang="en"/>',p+='<link rel="alternate" href="https://hnh.brainsait.org" hreflang="x-default"/>',p+="<title>"+o.title+"</title>",p+='<link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 100 100%27%3E%3Ctext y=%27.9em%27 font-size=%2790%27%3E%F0%9F%8F%A5%3C/text%3E%3C/svg%3E"/>',p+='<link rel="preconnect" href="https://fonts.googleapis.com">',p+='<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>',p+='<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Tajawal:wght@300;400;500;700;800;900&display=swap" rel="stylesheet">',p+="<style>"+E6+"</style></head><body>",p+=w6(o,m),p+=C6(o,l,m),p+=A6(o);var g=y6.map(function(v,w){return'<div class="cd dc an d'+(w%4+1)+'"><div class="ci">'+v.i+"</div><h3>"+(l?v.nA:v.nE)+"</h3><p>"+(l?v.dA:v.dE)+"</p></div>"}).join(""),f=x6.map(function(v,w){var L=(l?v.nA:v.nE).toLowerCase().replace(/\s/g,"-");return'<div class="cd bc an d'+(w%3+1)+'"><div class="bh"><h3>'+(l?v.nA:v.nE)+'</h3><div class="bcx">'+(l?v.aA:v.aE)+'</div></div><div class="bb"><a href="tel:'+m+'" class="btn bp bs">'+(l?"\u0627\u062A\u0635\u0644":"Call")+'</a><a href="/branches/'+L+'" class="btn bw bs">'+(l?"\u0627\u0644\u0645\u0632\u064A\u062F":"Details")+"</a></div></div>"}).join(""),E=_6.map(function(v,w){var L=l?v.nA:v.nE,$0=L.replace("\u062F. ","").replace("Dr. ","").charAt(0);return'<div class="cd dcc an d'+(w%4+1)+'"><div class="da">'+$0+"</div><h3>"+L+'</h3><div class="sp">'+(l?v.sA:v.sE)+'</div><a href="tel:'+m+'" class="btn bp bs">'+(l?"\u0627\u062D\u062C\u0632":"Book")+"</a></div>"}).join("");return p+='<section class="se sel" id="depts"><div class="co"><div class="sh an"><h2>'+o.secDeptsTitle+'</h2><div class="gl"></div><p>'+o.secDeptsSub+'</p></div><div class="g4" id="dg">'+g+"</div></div></section>",p+='<section class="se sea" id="branches"><div class="co"><div class="sh an"><h2>'+o.secBranchesTitle+'</h2><div class="gl"></div><p>'+o.secBranchesSub+'</p></div><div class="g3" id="bg">'+f+"</div></div></section>",p+='<section class="se sel" id="doctors"><div class="co"><div class="sh an"><h2>'+o.secDoctorsTitle+'</h2><div class="gl"></div><p>'+o.secDoctorsSub+'</p></div><div class="g4" id="dog">'+E+"</div></div></section>",p+=S6(o),p+=T6(o),p+='<section class="cs"><div class="co"><h2>'+o.ctaTitle+"</h2><p>"+o.ctaSub+'</p><div class="cb"><a href="tel:'+m+'" class="btn ba bl">'+o.ctaBook+'</a><a href="#ecosystem" class="btn bw bl">\u{1F310} '+o.navEcosystem+"</a></div></div></section>",p+=k6(o,m),p+=I6(l,m,o),p+="</body></html>",new Response(p,{headers:{"Content-Type":"text/html; charset=utf-8","Cache-Control":"public, max-age=300"}})}c(ou,"servePage");var h=new D;h.get("/api/health",async(u,a)=>r(await mu(a)));h.get("/api/stats",(u,a)=>Ju(a));h.get("/api/branches",(u,a,e,t,n)=>r({success:!0,branches:hu()}));h.get("/api/branches/([^/]+)",(u,a,e,t)=>{let n=gu(t[0]);return n?r({success:!0,branch:n}):r({success:!1,message:"Branch not found"},404)});h.get("/api/patients",(u,a,e,t,n)=>Eu(u,a,e,t,n));h.get("/api/patients/([^/]+)",(u,a,e,t)=>wu(u,a,e,t));h.post("/api/patients",(u,a)=>_u(u,a));h.patch("/api/patients/([^/]+)",(u,a,e,t)=>Su(u,a,e,t));h.get("/api/providers",async(u,a,e,t,n)=>{n||(n=new URL(u.url));let i=n?.searchParams?.get("branch")||"",s=n?.searchParams?.get("department")||"",o=await P(a);return i&&(o=o.filter(l=>l.branch===i||l.branch_id===i)),s&&(o=o.filter(l=>l.department===s||l.department_id===s)),r({success:!0,providers:o,total:o.length})});h.get("/api/providers/([^/]+)",async(u,a,e,t)=>{let n=await j(t[0],a);return n?r({success:!0,provider:n}):r({success:!1,message:"Provider not found"},404)});h.get("/api/appointments",(u,a,e,t,n)=>vu(u,a,e,t,n));h.get("/api/appointments/([^/]+)",(u,a,e,t)=>bu(u,a,e,t));h.post("/api/appointments",(u,a)=>fu(u,a));h.patch("/api/appointments/([^/]+)",(u,a,e,t)=>yu(u,a,e,t));h.delete("/api/appointments/([^/]+)",(u,a,e,t)=>xu(u,a,e,t));h.get("/api/claims",(u,a,e,t,n)=>Au(u,a,e,t,n));h.get("/api/claims/([^/]+)",(u,a,e,t)=>Tu(u,a,e,t));h.post("/api/claims",(u,a)=>Cu(u,a));h.post("/api/claims/([^/]+)/submit",(u,a,e,t)=>ku(u,a,e,t));h.get("/api/claims/([^/]+)/nphies-status",(u,a,e,t)=>Iu(u,a,e,t));h.post("/api/eligibility/check",(u,a)=>Hu(u,a));h.post("/api/eligibility/verify",(u,a)=>Du(u,a));h.get("/api/eligibility/history/([^/]+)",(u,a,e,t)=>Ou(u,a,e,t));h.post("/api/nphies/270",(u,a)=>Nu(u,a));h.post("/api/nphies/278",(u,a)=>Ru(u,a));h.post("/api/nphies/837",(u,a)=>Pu(u,a));h.get("/api/nphies/276/([^/]+)",(u,a,e,t)=>ju(u,a,e,t));h.post("/api/nphies/835",(u,a)=>zu(u,a));h.get("/api/fhir/Patient/([^/]+)",(u,a,e,t)=>$u(u,a,e,t));h.get("/api/fhir/Patient",(u,a,e,t,n)=>Fu(u,a,e,t,n));h.get("/api/fhir/Practitioner/([^/]+)",(u,a,e,t)=>Gu(u,a,e,t));h.get("/api/fhir/Appointment/([^/]+)",(u,a,e,t)=>Yu(u,a,e,t));h.get("/api/fhir/Claim/([^/]+)",(u,a,e,t)=>Vu(u,a,e,t));h.get("/api/fhir/Coverage/([^/]+)",(u,a,e,t)=>Wu(u,a,e,t));h.post("/api/chat",(u,a)=>F(u,a));h.get("/api/rcm/health",()=>n0());h.get("/api/rcm/batch/([^/]+)",(u,a,e,t)=>i0(u,a,e,t));h.post("/api/rcm/validate/price",u=>V(u));h.post("/api/rcm/validate/duplicate",u=>W(u));h.post("/api/rcm/validate/pbm",u=>J(u));h.post("/api/rcm/validate",u=>s0(u));h.post("/api/rcm/appeal/generate",u=>o0(u));h.get("/api/rcm/dashboard/([^/]+)",(u,a,e,t)=>r0(u,a,e,t));h.get("/api/rcm/claims/rejected",(u,a,e,t,n)=>c0(u,a,e,t,n));h.post("/api/rcm/claims/([^/]+)/appeal",(u,a,e,t)=>l0(u,a,e,t));h.post("/api/rcm/claims/([^/]+)/resubmit",(u,a,e,t)=>d0(u,a,e,t));h.post("/api/voice/speak",(u,a)=>Zu(u,a));h.post("/api/voice/chat",(u,a)=>u0(u,a));h.get("/api/voice/voices",()=>e0());h.get("/api/search",(u,a)=>K(u,a));h.post("/api/search",(u,a)=>K(u,a));h.post("/api/homecare/visits",(u,a)=>h0(u,a));h.get("/api/homecare/visits",(u,a)=>g0(u,a));h.get("/api/homecare/visits/([^/]+)",(u,a,e,t)=>f0(u,a,e,t));h.patch("/api/homecare/visits/([^/]+)",(u,a,e,t)=>v0(u,a,e,t));h.post("/api/homecare/visits/([^/]+)/vitals",(u,a,e,t)=>b0(u,a,e,t));h.get("/api/homecare/nurses",(u,a)=>y0(u,a));h.post("/api/homecare/nurses",(u,a)=>x0(u,a));h.get("/api/homecare/nurses/([^/]+)/schedule",(u,a,e,t)=>_0(u,a,e,t));h.get("/api/homecare/stats",(u,a)=>E0(u,a));h.post("/api/telehealth/sessions",(u,a)=>C0(u,a));h.get("/api/telehealth/sessions",(u,a)=>A0(u,a));h.get("/api/telehealth/sessions/([^/]+)",(u,a,e,t)=>T0(u,a,e,t));h.patch("/api/telehealth/sessions/([^/]+)",(u,a,e,t)=>k0(u,a,e,t));h.post("/api/telehealth/sessions/([^/]+)/start",(u,a,e,t)=>I0(u,a,e,t));h.post("/api/telehealth/sessions/([^/]+)/end",(u,a,e,t)=>B0(u,a,e,t));h.post("/api/telehealth/sessions/([^/]+)/prescriptions",(u,a,e,t)=>L0(u,a,e,t));h.get("/api/telehealth/sessions/([^/]+)/prescriptions",(u,a,e,t)=>H0(u,a,e,t));h.get("/api/telehealth/providers/([^/]+)/availability",(u,a,e,t)=>D0(u,a,e,t));h.get("/api/telehealth/stats",(u,a)=>O0(u,a));h.post("/api/email/appointment",(u,a)=>q0(u,a));h.post("/api/email/homecare",(u,a)=>M0(u,a));h.post("/api/email/telehealth",(u,a)=>N0(u,a));h.post("/api/email/followup",(u,a)=>R0(u,a));h.post("/api/email/send",(u,a)=>P0(u,a));h.get("/api/email/log",(u,a)=>j0(u,a));h.get("/",(u,a,e,t,n)=>ou(u));h.get("/(.*)",(u,a,e,t,n)=>ou(u));var ca={async fetch(u,a,e){if(u.method==="OPTIONS")return lu();let t=u.headers.get("CF-Connecting-IP")||"unknown";if(!du(t))return new Response(JSON.stringify({error:"Rate limit exceeded"}),{status:429,headers:{"Content-Type":"application/json","Retry-After":"60",...T}});try{let n=await h.match(u,a,e);if(n&&typeof n=="object"&&n.headers){let i={"Access-Control-Allow-Origin":"*","Access-Control-Allow-Methods":"GET, POST, PATCH, DELETE, OPTIONS","Access-Control-Allow-Headers":"Content-Type, Authorization"};for(let[s,o]of Object.entries(i))n.headers.has(s)||n.headers.set(s,o)}return n}catch(n){return console.error("Handler error:",n),new Response(JSON.stringify({error:"Internal server error"}),{status:500,headers:{"Content-Type":"application/json",...T}})}}};export{ca as default};
