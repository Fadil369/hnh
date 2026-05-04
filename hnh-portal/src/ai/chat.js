import { json } from '../utils/response.js';
import { CONFIG } from '../config.js';

const SYSTEM_PROMPT = `You are BasmaGuist Medical (بسمة غيست الطبية), the official AI assistant for مستشفيات الحياة الوطني (Hayat National Hospitals Group), powered by BrainSAIT Healthcare OS.

## ABOUT THE GROUP
- Full Name: Hayat National Hospitals Group (مجموعة مستشفيات الحياة الوطني)
- Owner/Operator: Al-Inmaa Medical Services Company (شركة الانماء للخدمات الطبية)
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
- Greet with Islamic/Saudi greetings (السلام عليكم, كيف حالك, الله يعافيك, يا هلا)
- Mix Arabic and English naturally
- For emergencies: direct to ER + call 997 (Saudi Red Crescent)
- NEVER prescribe medication or make definitive diagnoses
- Respond in the patient's language (Arabic/English)
- Maximum 400 characters per response`;

export async function handleChat(req, env) {
  const body = await req.json();
  const { message, session_id, language } = body;

  if (!message) {
    return json({ success: false, message: 'Message is required' }, 400);
  }

  const sid = session_id || 'ses_' + Date.now().toString(36);

  // Get session history (last 6 messages)
  let history = [];
  try {
    const { results } = await env.DB.prepare(
      'SELECT role, content FROM chat_history WHERE session_id = ? ORDER BY created_at DESC LIMIT 6'
    ).bind(sid).all();
    if (results) {
      history = results.reverse().map(r => ({ role: r.role, content: r.content }));
    }
  } catch (e) {
    console.error('DB history error:', e);
  }

  // Build messages array
  const messages = [
    { role: 'system', content: SYSTEM_PROMPT },
    ...history,
    { role: 'user', content: message },
  ];

  let aiResponse;
  try {
    const ai = await env.AI.run(CONFIG.AI_MODEL, {
      messages,
      max_tokens: CONFIG.AI_MAX_TOKENS,
      temperature: CONFIG.AI_TEMPERATURE,
    });
    aiResponse = ai.response || ai.choices?.[0]?.message?.content || '';
  } catch (e) {
    console.error('AI error, trying CF fallback:', e);
    try {
      const ai = await env.AI.run(CONFIG.AI_FALLBACK_MODEL, {
        messages,
        max_tokens: CONFIG.AI_MAX_TOKENS,
        temperature: CONFIG.AI_TEMPERATURE,
      });
      aiResponse = ai.response || ai.choices?.[0]?.message?.content || '';
    } catch (e2) {
      // DeepSeek as final AI fallback before hardcoded responses
      if (env.DEEPSEEK_API_KEY) {
        try {
          const dsRes = await fetch('https://api.deepseek.com/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${env.DEEPSEEK_API_KEY}`,
            },
            body: JSON.stringify({
              model: 'deepseek-chat',
              messages,
              max_tokens: CONFIG.AI_MAX_TOKENS,
              temperature: CONFIG.AI_TEMPERATURE,
            }),
            signal: AbortSignal.timeout(15000),
          });
          const dsData = await dsRes.json();
          aiResponse = dsData.choices?.[0]?.message?.content || getFallbackResponse(message, language);
        } catch (e3) {
          console.error('DeepSeek fallback error:', e3);
          aiResponse = getFallbackResponse(message, language);
        }
      } else {
        aiResponse = getFallbackResponse(message, language);
      }
    }
  }

  // Save to history
  try {
    await env.DB.prepare(
      'INSERT INTO chat_history (session_id, role, content) VALUES (?, ?, ?), (?, ?, ?)'
    ).bind(sid, 'user', message, sid, 'assistant', aiResponse).run();
  } catch (e) {
    console.error('DB save error:', e);
  }

  return json({
    success: true,
    response: aiResponse,
    session_id: sid,
  });
}

function getFallbackResponse(message, lang) {
  const msg = (message || '').toLowerCase();
  const isAr = /[\u0600-\u06FF]/.test(message) || lang === 'ar';

  if (isAr) {
    if (msg.includes('موعد') || msg.includes('حجز')) {
      return 'يمكنك حجز موعد من خلال موقعنا أو التطبيق، أو الاتصال على 966920000094. هل تحتاج مساعدة في اختيار الطبيب المناسب؟';
    }
    if (msg.includes('طبيب') || msg.includes('دكتور')) {
      return 'لدينا أكثر من 700 طبيب واستشاري في 5 فروع. د. محمد بكري (جراحة تجميلية) الأعلى تقييماً. تصفح صفحة الأطباء للبحث حسب التخصص.';
    }
    if (msg.includes('تأمين') || msg.includes('مطالبة') || msg.includes('nphies')) {
      return 'نظام NPHIES يدعم المطالبات الإلكترونية. نتعاقد مع 10 شركات تأمين: Bupa Arabia، توينة، ميدغلف، وغيرها. تحقق من أهليتك التأمينية عبر صفحة التحقق.';
    }
    if (msg.includes('فرع') || msg.includes('عنوان') || msg.includes('موقع')) {
      return '5 فروع: الرياض (طريق الدائري الشرقي - الربوة)، جازان (الكورنيش)، خميس مشيط (الأمير سلطان)، المدينة المنورة (طريق الهجرة)، عنيزة (القصيم). للاتصال: 966920000094.';
    }
    if (msg.includes('عن') || msg.includes('المستشفى') || msg.includes('من أنتم') || msg.includes('نبذة')) {
      return 'تأسست مجموعة مستشفيات الحياة الوطني عام 1999، وتديرها شركة الانماء للخدمات الطبية برئاسة أ. محمد بن ناصر الجار الله. تضم 5 فروع وأكثر من 700 طبيب و3500 موظف و1200 سرير. الرئيس التنفيذي: د. فوزية الجار الله.';
    }
    if (msg.includes('طوارئ') || msg.includes('إسعاف')) {
      return '⚠️ إذا كانت حالة طارئة، توجّه فوراً لأقرب طوارئ أو اتصل بالهلال الأحمر 997. جميع فروعنا بها طوارئ 24 ساعة.';
    }
    return 'أهلاً بك في مستشفى الحياة الوطني. كيف يمكنني مساعدتك؟ حجوزات، معلومات أطباء، استعلام تأمين، أو معلومات فروع.';
  }

  if (msg.includes('appointment') || msg.includes('book')) {
    return 'Book online via our portal/app or call 966920000094. Need help choosing a doctor?';
  }
  if (msg.includes('doctor') || msg.includes('physician')) {
    return 'We have 700+ doctors across 5 branches. Dr. Mohamed Bakry (Plastic Surgery) highest rated. Browse our providers page.';
  }
  if (msg.includes('insurance') || msg.includes('claim') || msg.includes('nphies')) {
    return 'NPHIES e-claim system supported. 10 insurance partners: Bupa Arabia, Tawuniya, MedGulf, and more. Check eligibility on our portal.';
  }
  if (msg.includes('branch') || msg.includes('location') || msg.includes('address')) {
    return '5 branches: Riyadh (Eastern Ring/Al-Rabwa), Jazan (Corniche), Khamis Mushayt (Prince Sultan Rd), Madinah (Al-Hijra Rd), Unayzah (Al-Qassim). Call 966920000094.';
  }
  if (msg.includes('about') || msg.includes('history') || msg.includes('who')) {
    return 'Hayat National Hospitals Group was founded in 1999. Owned by Al-Inmaa Medical Services Co., chaired by A. Mohammed bin Nasser bin Jar Allah. CEO Dr. Fawzia Al-Jar Allah. 700+ doctors, 3,500+ staff, 1,200+ beds across 5 branches.';
  }
  if (msg.includes('emergency')) {
    return 'If emergency: go to nearest ER or call Saudi Red Crescent 997. All branches have 24/7 ER.';
  }
  return 'Welcome to Hayat National Hospital. How can I help? Appointments, doctors, insurance, or branch info.';
}
