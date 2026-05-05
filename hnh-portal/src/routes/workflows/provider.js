/**
 * hnh-portal/src/routes/workflows/provider.js
 * Provider Workflow Orchestration — HNH BrainSAIT Healthcare OS v9.2.0
 *
 * Endpoints:
 *   POST /api/workflows/provider/clinical-decision
 *   POST /api/workflows/provider/smart-billing
 *   POST /api/workflows/provider/cohort-outreach
 *   POST /api/workflows/provider/prescription
 *   GET  /api/workflows/provider/schedule/:providerId
 */

import { json } from '../utils.js';

const AI_MODEL = '@cf/meta/llama-3.3-70b-instruct-fp8-fast';
const AI_FALLBACK = '@cf/meta/llama-3-8b-instruct';

async function runAI(env, messages, model = AI_MODEL) {
  try {
    const res = await env.AI.run(model, { messages, max_tokens: 2048 });
    return res?.response || res?.result?.response || '';
  } catch {
    if (model !== AI_FALLBACK) return runAI(env, messages, AI_FALLBACK);
    return '';
  }
}

// SBS (Saudi Billing System) code mapping via AI
async function generateSBSCodes(env, soapNotes, diagnoses) {
  const prompt = `Based on these clinical SOAP notes and diagnoses, generate the appropriate SBS/ICD-10 procedure and diagnosis codes for Saudi Arabia NPHIES claims submission.

SOAP Notes: ${soapNotes}
Diagnoses: ${JSON.stringify(diagnoses)}

Return a JSON object with:
- diagnosis_codes: array of {code, description, type: "principal"|"secondary"}
- procedure_codes: array of {code, description, quantity, unit}
- drg_code: string (if applicable)
- clinical_rationale: string

Return ONLY the JSON, no extra text.`;

  try {
    const res = await env.AI.run(AI_MODEL, {
      messages: [
        { role: 'system', content: 'You are a medical coding expert specializing in Saudi Arabia SBS/NPHIES claims. Always return valid JSON.' },
        { role: 'user', content: prompt },
      ],
      max_tokens: 1024,
    });
    const raw = res?.response || '{}';
    return JSON.parse(raw.replace(/```json\n?|\n?```/g, '').trim());
  } catch {
    return { diagnosis_codes: [], procedure_codes: [], drg_code: null, clinical_rationale: 'Coding unavailable' };
  }
}

/**
 * POST /api/workflows/provider/clinical-decision
 * Analyze SOAP notes → clinical guidelines → medication suggestions → draft Wasfaty prescription
 */
export async function providerClinicalDecision(request, env) {
  try {
    const { providerId, patientId, soapNotes, condition, language = 'ar' } = await request.json();
    if (!soapNotes) return json({ success: false, error: 'soapNotes required' }, 400);

    const isAr = language === 'ar';

    // 1. Clinical decision support
    const clinicalAnalysis = await runAI(env, [
      {
        role: 'system',
        content: `You are a clinical AI assistant for Hayat National Hospital. Analyze SOAP notes and provide evidence-based clinical decision support aligned with Saudi MOH clinical practice guidelines and Vision 2030 quality standards. ${isAr ? 'Respond in Arabic.' : 'Respond in English.'}`,
      },
      {
        role: 'user',
        content: `Patient Condition: ${condition || 'unspecified'}\n\nSOAP Notes:\n${soapNotes}\n\nProvide:\n1. Clinical assessment\n2. Guideline-based recommendations\n3. Suggested medication adjustments (if applicable)\n4. Follow-up plan\n5. Any safety alerts or contraindications`,
      },
    ]);

    // 2. Draft Wasfaty prescription (Saudi e-prescribing system)
    const prescriptionDraft = await runAI(env, [
      {
        role: 'system',
        content: 'You are a pharmacist assistant. Draft a Wasfaty-compatible e-prescription based on the clinical notes. Return valid JSON with: medications (array of {name, dose, frequency, duration, route, instructions_ar, instructions_en}), prescribing_notes.',
      },
      {
        role: 'user',
        content: `SOAP Notes: ${soapNotes}\nCondition: ${condition}\nClinical recommendation: ${clinicalAnalysis}`,
      },
    ]);

    let prescription = null;
    try {
      prescription = JSON.parse(prescriptionDraft.replace(/```json\n?|\n?```/g, '').trim());
    } catch {
      prescription = { medications: [], prescribing_notes: prescriptionDraft };
    }

    // 3. Store clinical note in DB
    let noteId = null;
    if (env.DB && patientId) {
      try {
        const ins = await env.DB.prepare(
          `INSERT INTO clinical_notes (patient_id, provider_id, soap_notes, ai_analysis, created_at)
           VALUES (?, ?, ?, ?, datetime('now')) RETURNING id`
        ).bind(patientId, providerId || null, soapNotes, clinicalAnalysis).first();
        noteId = ins?.id;
      } catch {}
    }

    return json({
      success: true,
      workflow: 'clinical_decision_support',
      clinical_analysis: clinicalAnalysis,
      prescription_draft: prescription,
      wasfaty_ready: prescription?.medications?.length > 0,
      note_id: noteId,
      next_steps: ['review_prescription', 'submit_billing', 'schedule_followup'],
      language,
    });
  } catch (e) {
    return json({ success: false, error: e.message }, 500);
  }
}

/**
 * POST /api/workflows/provider/smart-billing
 * SOAP notes → SBS code generation → eligibility check → clean claim submission via GIVC
 */
export async function providerSmartBilling(request, env) {
  try {
    const { providerId, patientId, appointmentId, soapNotes, diagnoses } = await request.json();
    if (!soapNotes || !patientId) return json({ success: false, error: 'soapNotes and patientId required' }, 400);

    // 1. Generate SBS codes
    const coding = await generateSBSCodes(env, soapNotes, diagnoses || []);

    // 2. Real-time eligibility via NPHIES
    let eligibility = { eligible: null, status: 'not_checked' };
    try {
      const mirrorBase = env.NPHIES_MIRROR_URL || 'https://nphies-mirror.brainsait-fadil.workers.dev';
      const res = await fetch(`${mirrorBase}/eligibility/realtime`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ patientId }),
        signal: AbortSignal.timeout(6000),
      });
      if (res.ok) eligibility = await res.json();
    } catch {}

    // 3. Flag potential issues before submission
    const flags = [];
    if (coding.diagnosis_codes?.length === 0) flags.push('MISSING_DIAGNOSIS_CODES');
    if (coding.procedure_codes?.length === 0) flags.push('MISSING_PROCEDURE_CODES');
    if (eligibility.eligible === false) flags.push('PATIENT_NOT_ELIGIBLE');
    if (eligibility.eligible === null) flags.push('ELIGIBILITY_UNVERIFIED');

    // 4. Create clean claim in DB
    let claimId = null;
    if (env.DB && flags.length === 0) {
      try {
        const ins = await env.DB.prepare(
          `INSERT INTO claims (patient_id, provider_id, appointment_id, status, diagnosis_codes, procedure_codes, drg_code, submitted_at, created_at)
           VALUES (?, ?, ?, 'pending', ?, ?, ?, datetime('now'), datetime('now'))
           RETURNING id`
        ).bind(
          patientId, providerId, appointmentId || null,
          JSON.stringify(coding.diagnosis_codes),
          JSON.stringify(coding.procedure_codes),
          coding.drg_code || null
        ).first();
        claimId = ins?.id;
      } catch {}
    }

    // 5. Submit to ClaimLinc/GIVC
    let givcResult = { status: 'not_submitted', reason: flags.length > 0 ? 'Flags require review' : null };
    if (claimId && env.CLAIMLINC_SERVICE) {
      try {
        const res = await env.CLAIMLINC_SERVICE.fetch(new Request('https://claimlinc.internal/claims/submit-clean', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ claimId, patientId, providerId, coding, eligibility }),
        }));
        givcResult = res.ok ? { status: 'submitted', ...await res.json() } : { status: 'failed', code: res.status };
      } catch { givcResult = { status: 'service_unavailable' }; }
    }

    return json({
      success: true,
      workflow: 'smart_billing',
      sbs_codes: coding,
      eligibility,
      flags,
      claim_id: claimId,
      givc_submission: givcResult,
      ready_to_submit: flags.length === 0,
      denial_risk: flags.length > 0 ? 'high' : 'low',
    });
  } catch (e) {
    return json({ success: false, error: e.message }, 500);
  }
}

/**
 * POST /api/workflows/provider/cohort-outreach
 * Identify patient cohort → draft personalized outreach messages → queue notifications
 */
export async function providerCohortOutreach(request, env) {
  try {
    const { providerId, condition, lastVisitMonths = 6, language = 'ar' } = await request.json();
    if (!condition) return json({ success: false, error: 'condition required' }, 400);

    // 1. Identify cohort from DB
    let cohort = [];
    if (env.DB) {
      try {
        const cutoff = new Date();
        cutoff.setMonth(cutoff.getMonth() - lastVisitMonths);
        const r = await env.DB.prepare(
          `SELECT p.id, p.name, p.phone, p.email, p.date_of_birth,
                  MAX(a.appointment_date) as last_visit
           FROM patients p
           LEFT JOIN appointments a ON a.patient_id = p.id
           LEFT JOIN diagnoses d ON d.patient_id = p.id
           WHERE (LOWER(d.description) LIKE ? OR LOWER(d.icd_code) LIKE ?)
             AND (a.appointment_date IS NULL OR a.appointment_date < ?)
           GROUP BY p.id
           LIMIT 100`
        ).bind(`%${condition.toLowerCase()}%`, `%${condition.toLowerCase()}%`, cutoff.toISOString()).all();
        cohort = r.results || [];
      } catch {}
    }

    if (cohort.length === 0) {
      return json({ success: true, workflow: 'cohort_outreach', cohort_size: 0, message: 'No patients found matching criteria', messages: [] });
    }

    // 2. Draft personalized message template via AI
    const isAr = language === 'ar';
    const template = await runAI(env, [
      {
        role: 'system',
        content: isAr
          ? 'أنت مساعد تواصل طبي. اكتب رسالة تذكير صحية شخصية وودودة للمريض باللغة العربية. يجب أن تكون الرسالة محترمة، تشجع على الزيارة، وتتضمن نصيحة صحية مختصرة.'
          : 'You are a healthcare communications assistant. Write a personalized, warm health reminder message. It must be respectful, encourage the visit, and include a brief health tip.',
      },
      {
        role: 'user',
        content: `Condition: ${condition}\nLanguage: ${language}\nWrite a template message for patients with {name} placeholder who haven't visited in ${lastVisitMonths} months. Include one actionable health tip for ${condition}.`,
      },
    ]);

    // 3. Personalize for each patient (use template, replace {name})
    const messages = cohort.slice(0, 20).map(p => ({
      patient_id: p.id,
      patient_name: p.name,
      phone: p.phone,
      email: p.email,
      last_visit: p.last_visit,
      message: template.replace(/\{name\}/gi, p.name || 'المريض الكريم'),
    }));

    return json({
      success: true,
      workflow: 'cohort_outreach',
      condition,
      cohort_size: cohort.length,
      messages_prepared: messages.length,
      messages,
      health_tip_template: template,
      next_step: 'send_notifications',
      channels: ['sms', 'whatsapp', 'email'],
      language,
    });
  } catch (e) {
    return json({ success: false, error: e.message }, 500);
  }
}

/**
 * POST /api/workflows/provider/prescription
 * Generate and store a Wasfaty-compatible prescription from clinical notes
 */
export async function providerPrescription(request, env) {
  try {
    const { providerId, patientId, medications, clinicalNotes, language = 'ar' } = await request.json();
    if (!medications || !patientId) return json({ success: false, error: 'medications and patientId required' }, 400);

    // Validate medications via AI safety check
    const safetyCheck = await runAI(env, [
      {
        role: 'system',
        content: 'You are a clinical pharmacist. Review the prescription for drug interactions, dosing errors, and contraindications. Return JSON: {safe: boolean, warnings: string[], interactions: string[], recommendations: string}',
      },
      {
        role: 'user',
        content: `Medications: ${JSON.stringify(medications)}\nClinical notes: ${clinicalNotes || ''}`,
      },
    ]);

    let safety = { safe: true, warnings: [], interactions: [], recommendations: '' };
    try {
      safety = JSON.parse(safetyCheck.replace(/```json\n?|\n?```/g, '').trim());
    } catch {}

    // Store prescription
    let prescriptionId = null;
    if (env.DB) {
      try {
        const ins = await env.DB.prepare(
          `INSERT INTO prescriptions (patient_id, provider_id, medications, clinical_notes, safety_check, wasfaty_status, created_at)
           VALUES (?, ?, ?, ?, ?, 'draft', datetime('now')) RETURNING id`
        ).bind(patientId, providerId, JSON.stringify(medications), clinicalNotes || '', JSON.stringify(safety)).first();
        prescriptionId = ins?.id;
      } catch {}
    }

    return json({
      success: true,
      workflow: 'prescription',
      prescription_id: prescriptionId,
      medications,
      safety_check: safety,
      wasfaty_status: 'draft',
      ready_to_send: safety.safe && safety.warnings?.length === 0,
      language,
    });
  } catch (e) {
    return json({ success: false, error: e.message }, 500);
  }
}

/**
 * GET /api/workflows/provider/schedule/:providerId
 * Provider's schedule with today's appointments and patient quick-cards
 */
export async function providerSchedule(request, env, _ctx, params) {
  try {
    const providerId = params?.[0] || request.url.split('/').pop();
    if (!providerId) return json({ success: false, error: 'providerId required' }, 400);

    let schedule = [];
    if (env.DB) {
      try {
        const r = await env.DB.prepare(
          `SELECT a.id, a.appointment_date, a.status, a.type, a.speciality,
                  p.id as patient_id, p.name as patient_name, p.date_of_birth,
                  p.phone, p.gender
           FROM appointments a
           JOIN patients p ON p.id = a.patient_id
           WHERE a.provider_id = ?
             AND date(a.appointment_date) = date('now')
           ORDER BY a.appointment_date ASC`
        ).bind(providerId).all();
        schedule = r.results || [];
      } catch {}
    }

    return json({
      success: true,
      workflow: 'provider_schedule',
      provider_id: providerId,
      date: new Date().toISOString().split('T')[0],
      total_appointments: schedule.length,
      schedule,
    });
  } catch (e) {
    return json({ success: false, error: e.message }, 500);
  }
}
