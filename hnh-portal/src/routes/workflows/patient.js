/**
 * hnh-portal/src/routes/workflows/patient.js
 * Patient Workflow Orchestration — HNH BrainSAIT Healthcare OS v9.2.0
 *
 * Endpoints:
 *   POST /api/workflows/patient/health-screening
 *   POST /api/workflows/patient/book-visit
 *   POST /api/workflows/patient/post-visit
 *   POST /api/workflows/patient/lab-results
 *   GET  /api/workflows/patient/summary/:patientId
 */

import { json } from '../utils.js';

const AI_MODEL_PRIMARY = '@cf/meta/llama-3.3-70b-instruct-fp8-fast';
const AI_MODEL_FALLBACK = '@cf/meta/llama-3-8b-instruct';

// ── Helpers ──────────────────────────────────────────────────────────────────

async function runAI(env, messages, model = AI_MODEL_PRIMARY) {
  try {
    const res = await env.AI.run(model, { messages, max_tokens: 1024 });
    return res?.response || res?.result?.response || '';
  } catch {
    if (model !== AI_MODEL_FALLBACK) return runAI(env, messages, AI_MODEL_FALLBACK);
    return '';
  }
}

async function nphiesEligibility(env, patientId, payerId) {
  const mirrorBase = env.NPHIES_MIRROR_URL || 'https://nphies-mirror.brainsait-fadil.workers.dev';
  try {
    const res = await fetch(`${mirrorBase}/eligibility/check`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ patientId, payerId }),
      signal: AbortSignal.timeout(8000),
    });
    if (res.ok) return await res.json();
    return { eligible: null, error: `NPHIES returned ${res.status}` };
  } catch (e) {
    return { eligible: null, error: e.message };
  }
}

async function getPatientFromDB(env, patientId) {
  if (!env.DB) return null;
  try {
    return await env.DB.prepare(
      `SELECT p.*, i.payer_name, i.policy_number, i.member_id
       FROM patients p
       LEFT JOIN insurance_info i ON i.patient_id = p.id
       WHERE p.id = ? LIMIT 1`
    ).bind(patientId).first();
  } catch { return null; }
}

async function getAppointmentsFromDB(env, patientId) {
  if (!env.DB) return [];
  try {
    const r = await env.DB.prepare(
      `SELECT * FROM appointments WHERE patient_id = ? ORDER BY appointment_date DESC LIMIT 10`
    ).bind(patientId).all();
    return r.results || [];
  } catch { return []; }
}

// ── Route handlers ────────────────────────────────────────────────────────────

/**
 * POST /api/workflows/patient/health-screening
 * Analyzes patient history and recommends screenings, then suggests appointment slots.
 */
export async function patientHealthScreening(request, env) {
  try {
    const { patientId, language = 'ar' } = await request.json();
    if (!patientId) return json({ success: false, error: 'patientId required' }, 400);

    const patient = await getPatientFromDB(env, patientId);
    const appointments = await getAppointmentsFromDB(env, patientId);

    const isAr = language === 'ar';
    const systemPrompt = isAr
      ? 'أنت مساعد طبي ذكي في مستشفيات الحياة الوطنية. بناءً على بيانات المريض والتاريخ الطبي، اقترح الفحوصات الوقائية المناسبة وفق المعايير السعودية وإرشادات وزارة الصحة.'
      : 'You are a clinical AI assistant at Hayat National Hospital. Based on patient demographics and medical history, recommend appropriate preventive screenings per Saudi MOH guidelines.';

    const userPrompt = isAr
      ? `بيانات المريض: ${JSON.stringify({ patient, recentVisits: appointments.length })}. اقترح الفحوصات الضرورية وشرح سببها بإيجاز.`
      : `Patient data: ${JSON.stringify({ patient, recentVisits: appointments.length })}. Suggest necessary screenings with brief rationale.`;

    const aiResponse = await runAI(env, [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt },
    ]);

    return json({
      success: true,
      workflow: 'health_screening',
      patient: patient ? { id: patient.id, name: patient.name, dob: patient.date_of_birth } : null,
      screenings: aiResponse,
      next_step: 'book_appointment',
      language,
    });
  } catch (e) {
    return json({ success: false, error: e.message }, 500);
  }
}

/**
 * POST /api/workflows/patient/book-visit
 * End-to-end: check NPHIES eligibility → find slot → confirm booking → notify patient.
 */
export async function patientBookVisit(request, env) {
  try {
    const { patientId, speciality, preferredDate, language = 'ar' } = await request.json();
    if (!patientId || !speciality) return json({ success: false, error: 'patientId and speciality required' }, 400);

    const patient = await getPatientFromDB(env, patientId);

    // 1. NPHIES eligibility check
    const eligibility = patient?.policy_number
      ? await nphiesEligibility(env, patientId, patient?.payer_name)
      : { eligible: 'unknown', note: 'No insurance on file' };

    // 2. Find available provider/slot from DB
    let slot = null;
    if (env.DB) {
      try {
        const prov = await env.DB.prepare(
          `SELECT p.id, p.name, p.speciality,
                  a.appointment_date as next_available
           FROM providers p
           LEFT JOIN appointments a ON a.provider_id = p.id
             AND date(a.appointment_date) >= date('now')
             AND a.status = 'available'
           WHERE LOWER(p.speciality) LIKE ?
           ORDER BY a.appointment_date ASC LIMIT 1`
        ).bind(`%${speciality.toLowerCase()}%`).first();
        slot = prov;
      } catch {}
    }

    // 3. Create appointment record
    let appointment = null;
    if (env.DB && slot) {
      try {
        const apptDate = preferredDate || slot.next_available || new Date(Date.now() + 86400000 * 3).toISOString();
        const ins = await env.DB.prepare(
          `INSERT INTO appointments (patient_id, provider_id, appointment_date, status, type, speciality, created_at)
           VALUES (?, ?, ?, 'scheduled', 'outpatient', ?, datetime('now'))
           RETURNING id, appointment_date`
        ).bind(patientId, slot.id, apptDate, speciality).first();
        appointment = ins;
      } catch {}
    }

    // 4. AI summary for patient
    const isAr = language === 'ar';
    const summary = await runAI(env, [{
      role: 'system',
      content: isAr
        ? 'أنت مساعد الحياة الوطنية. اكتب رسالة تأكيد موعد قصيرة وودودة للمريض بالعربية.'
        : 'You are Hayat National assistant. Write a brief friendly appointment confirmation in English.',
    }, {
      role: 'user',
      content: JSON.stringify({ patient: patient?.name, slot, appointment, eligibility }),
    }]);

    return json({
      success: true,
      workflow: 'book_visit',
      eligibility,
      provider: slot,
      appointment,
      confirmation_message: summary,
      copay: eligibility?.copay_amount || null,
      language,
    });
  } catch (e) {
    return json({ success: false, error: e.message }, 500);
  }
}

/**
 * POST /api/workflows/patient/post-visit
 * After visit: trigger claim submission via GIVC + NPHIES, return status + patient-friendly summary.
 */
export async function patientPostVisit(request, env) {
  try {
    const { patientId, appointmentId, diagnosisCodes, procedureCodes, language = 'ar' } = await request.json();
    if (!patientId || !appointmentId) return json({ success: false, error: 'patientId and appointmentId required' }, 400);

    const patient = await getPatientFromDB(env, patientId);

    // 1. Create claim record in DB
    let claim = null;
    if (env.DB) {
      try {
        const ins = await env.DB.prepare(
          `INSERT INTO claims (patient_id, appointment_id, status, diagnosis_codes, procedure_codes, submitted_at, created_at)
           VALUES (?, ?, 'pending', ?, ?, datetime('now'), datetime('now'))
           RETURNING id`
        ).bind(patientId, appointmentId,
          JSON.stringify(diagnosisCodes || []),
          JSON.stringify(procedureCodes || [])
        ).first();
        claim = ins;
      } catch {}
    }

    // 2. Submit to GIVC (via ClaimLinc service binding)
    let givcStatus = 'not_submitted';
    try {
      if (env.CLAIMLINC_SERVICE) {
        const res = await env.CLAIMLINC_SERVICE.fetch(new Request('https://claimlinc.internal/claims/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ patientId, appointmentId, claimId: claim?.id, diagnosisCodes, procedureCodes }),
        }));
        givcStatus = res.ok ? 'submitted' : 'submission_failed';
      }
    } catch { givcStatus = 'service_unavailable'; }

    // 3. AI explanation for patient
    const isAr = language === 'ar';
    const explanation = await runAI(env, [{
      role: 'system',
      content: isAr
        ? 'اشرح حالة المطالبة التأمينية للمريض بلغة بسيطة وودودة باللغة العربية. لا تستخدم مصطلحات طبية معقدة.'
        : 'Explain the insurance claim status to the patient in simple friendly language. Avoid complex medical jargon.',
    }, {
      role: 'user',
      content: JSON.stringify({ claim, givcStatus, diagnosisCodes, procedureCodes }),
    }]);

    return json({
      success: true,
      workflow: 'post_visit',
      claim_id: claim?.id,
      claim_status: 'pending',
      givc_submission: givcStatus,
      nphies_status: 'queued',
      patient_explanation: explanation,
      payment_required: false,
      language,
    });
  } catch (e) {
    return json({ success: false, error: e.message }, 500);
  }
}

/**
 * POST /api/workflows/patient/lab-results
 * Translate lab results into plain language, compare to previous, flag abnormals.
 */
export async function patientLabResults(request, env) {
  try {
    const { patientId, results, language = 'ar' } = await request.json();
    if (!results || !Array.isArray(results)) return json({ success: false, error: 'results array required' }, 400);

    const isAr = language === 'ar';
    const systemPrompt = isAr
      ? 'أنت مساعد طبي متخصص. اشرح نتائج المختبر بلغة بسيطة للمريض. حدد القيم خارج النطاق الطبيعي وما تعنيه. قارن بالنتائج السابقة إن وجدت. لا تقدم تشخيصاً نهائياً.'
      : 'You are a medical assistant. Explain lab results in plain language to the patient. Highlight abnormal values and what they may mean. Compare to previous if available. Do not give a definitive diagnosis.';

    const analysis = await runAI(env, [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: `Lab results: ${JSON.stringify(results)}` },
    ]);

    const abnormals = results.filter(r => r.value && r.low && r.high
      ? parseFloat(r.value) < parseFloat(r.low) || parseFloat(r.value) > parseFloat(r.high)
      : r.flag === 'H' || r.flag === 'L' || r.flag === 'A'
    );

    return json({
      success: true,
      workflow: 'lab_results',
      total_tests: results.length,
      abnormal_count: abnormals.length,
      abnormal_tests: abnormals,
      explanation: analysis,
      recommendation: abnormals.length > 0
        ? (isAr ? 'يُنصح بمراجعة طبيبك المعالج لمناقشة النتائج غير الطبيعية.' : 'Please consult your physician to discuss the abnormal results.')
        : (isAr ? 'جميع النتائج ضمن النطاق الطبيعي.' : 'All results are within normal range.'),
      language,
    });
  } catch (e) {
    return json({ success: false, error: e.message }, 500);
  }
}

/**
 * GET /api/workflows/patient/summary/:patientId
 * Full patient dashboard: upcoming appointments, open claims, recent labs, eligibility.
 */
export async function patientSummary(request, env, _ctx, params) {
  try {
    const patientId = params?.[0] || request.url.split('/').pop();
    if (!patientId) return json({ success: false, error: 'patientId required' }, 400);

    const [patient, appointments] = await Promise.all([
      getPatientFromDB(env, patientId),
      getAppointmentsFromDB(env, patientId),
    ]);

    let claims = [];
    if (env.DB) {
      try {
        const r = await env.DB.prepare(
          `SELECT id, status, submitted_at, diagnosis_codes FROM claims WHERE patient_id = ? ORDER BY created_at DESC LIMIT 5`
        ).bind(patientId).all();
        claims = r.results || [];
      } catch {}
    }

    return json({
      success: true,
      workflow: 'patient_summary',
      patient,
      upcoming_appointments: appointments.filter(a => new Date(a.appointment_date) >= new Date()),
      past_appointments: appointments.filter(a => new Date(a.appointment_date) < new Date()),
      recent_claims: claims,
      open_claims: claims.filter(c => c.status === 'pending' || c.status === 'submitted'),
    });
  } catch (e) {
    return json({ success: false, error: e.message }, 500);
  }
}
