/**
 * hnh-portal/src/routes/workflows/payer.js
 * Payer Workflow Orchestration — HNH BrainSAIT Healthcare OS v9.2.0
 *
 * Endpoints:
 *   POST /api/workflows/payer/adjudicate
 *   POST /api/workflows/payer/prior-auth
 *   POST /api/workflows/payer/fwa-detect
 *   GET  /api/workflows/payer/era/:claimId
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

// Adjudication rule engine
function applyAdjudicationRules(claim) {
  const flags = [];
  const { diagnosis_codes = [], procedure_codes = [], amount, patient_age } = claim;

  // Rule: Diagnosis-procedure mismatch
  if (diagnosis_codes.length === 0 && procedure_codes.length > 0) flags.push('MISSING_DIAGNOSIS');
  if (procedure_codes.length === 0 && diagnosis_codes.length > 0) flags.push('MISSING_PROCEDURE');

  // Rule: Amount threshold
  if (amount > 50000) flags.push('HIGH_VALUE_REVIEW');

  // Rule: Age-procedure check
  if (patient_age && patient_age < 18 && procedure_codes.some(p => p.code?.startsWith('9'))) {
    flags.push('PEDIATRIC_PROCEDURE_REVIEW');
  }

  // Rule: Duplicate detection window (simplified)
  if (claim.is_duplicate) flags.push('POTENTIAL_DUPLICATE');

  const autoApprove = flags.length === 0;
  const requiresHuman = flags.includes('HIGH_VALUE_REVIEW') || flags.includes('POTENTIAL_DUPLICATE');

  return { flags, autoApprove, requiresHuman, score: flags.length };
}

/**
 * POST /api/workflows/payer/adjudicate
 * Real-time claims adjudication: rule engine → AI analysis → auto-approve or route to auditor
 */
export async function payerAdjudicate(request, env) {
  try {
    const { claimId, payerId, claim } = await request.json();
    if (!claimId || !claim) return json({ success: false, error: 'claimId and claim required' }, 400);

    // 1. Rule engine pass
    const ruleResult = applyAdjudicationRules(claim);

    // 2. SBS code validation via AI
    const codeValidation = await runAI(env, [
      {
        role: 'system',
        content: 'You are a Saudi NPHIES claims auditor. Validate that the diagnosis codes and procedure codes are compatible and appropriate. Check for unbundling, upcoding, or medically unnecessary procedures. Return JSON: {valid: boolean, issues: string[], code_compatibility: string, medical_necessity: string}',
      },
      {
        role: 'user',
        content: `Claim: ${JSON.stringify(claim)}`,
      },
    ]);

    let validation = { valid: true, issues: [], code_compatibility: 'compatible', medical_necessity: 'appropriate' };
    try {
      validation = JSON.parse(codeValidation.replace(/```json\n?|\n?```/g, '').trim());
    } catch {}

    if (!validation.valid) ruleResult.flags.push(...(validation.issues || []));

    // 3. Make adjudication decision
    const decision = ruleResult.autoApprove && validation.valid ? 'APPROVED' :
      ruleResult.requiresHuman ? 'PENDED_HUMAN_REVIEW' : 'DENIED';

    // 4. Update claim status in DB
    if (env.DB && claimId) {
      try {
        await env.DB.prepare(
          `UPDATE claims SET status = ?, adjudication_result = ?, updated_at = datetime('now') WHERE id = ?`
        ).bind(
          decision === 'APPROVED' ? 'approved' : decision === 'DENIED' ? 'denied' : 'pending_review',
          JSON.stringify({ decision, flags: ruleResult.flags, validation }),
          claimId
        ).run();
      } catch {}
    }

    // 5. Generate ERA (Electronic Remittance Advice) if approved
    let era = null;
    if (decision === 'APPROVED') {
      era = {
        era_id: `ERA-${Date.now()}`,
        claim_id: claimId,
        payer_id: payerId,
        payment_amount: claim.amount || 0,
        adjustment_amount: 0,
        payment_date: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
        status: 'ISSUED',
        nphies_reference: `NP-${claimId}-${Date.now()}`,
      };
    }

    return json({
      success: true,
      workflow: 'claims_adjudication',
      claim_id: claimId,
      decision,
      rule_flags: ruleResult.flags,
      code_validation: validation,
      auto_approved: decision === 'APPROVED',
      requires_human: ruleResult.requiresHuman,
      era,
      denial_reason: decision === 'DENIED' ? ruleResult.flags.join('; ') : null,
      auditor_summary: ruleResult.requiresHuman
        ? `Claim ${claimId} flagged for: ${ruleResult.flags.join(', ')}. Manual review required.`
        : null,
    });
  } catch (e) {
    return json({ success: false, error: e.message }, 500);
  }
}

/**
 * POST /api/workflows/payer/prior-auth
 * Intelligent prior authorization: policy check → clinical guidelines → instant decision
 */
export async function payerPriorAuth(request, env) {
  try {
    const { patientId, providerId, requestedService, diagnosisCodes, payerId, urgency = 'routine' } = await request.json();
    if (!requestedService || !patientId) return json({ success: false, error: 'requestedService and patientId required' }, 400);

    // 1. Check patient policy & deductibles
    let policyInfo = null;
    if (env.DB) {
      try {
        policyInfo = await env.DB.prepare(
          `SELECT i.*, p.date_of_birth, p.gender
           FROM insurance_info i
           JOIN patients p ON p.id = i.patient_id
           WHERE i.patient_id = ? LIMIT 1`
        ).bind(patientId).first();
      } catch {}
    }

    // 2. AI clinical guideline check
    const clinicalReview = await runAI(env, [
      {
        role: 'system',
        content: 'You are a Saudi health insurance clinical reviewer. Assess prior authorization requests against clinical guidelines and medical necessity criteria. Return JSON: {medically_necessary: boolean, guideline_reference: string, conditions_met: string[], conditions_failed: string[], recommendation: "APPROVE"|"DENY"|"CLINICAL_REVIEW", clinical_notes: string}',
      },
      {
        role: 'user',
        content: `Service requested: ${requestedService}\nDiagnosis codes: ${JSON.stringify(diagnosisCodes)}\nPatient info: ${JSON.stringify(policyInfo)}\nUrgency: ${urgency}`,
      },
    ]);

    let clinicalDecision = {
      medically_necessary: true,
      recommendation: 'APPROVE',
      guideline_reference: 'Saudi MOH Clinical Practice Guidelines',
      conditions_met: [],
      conditions_failed: [],
      clinical_notes: '',
    };
    try {
      clinicalDecision = JSON.parse(clinicalReview.replace(/```json\n?|\n?```/g, '').trim());
    } catch {}

    // 3. Final PA decision
    const paDecision = urgency === 'emergency' ? 'APPROVED' : clinicalDecision.recommendation;
    const paNumber = paDecision === 'APPROVED' ? `PA-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}` : null;

    // 4. Store PA record
    if (env.DB) {
      try {
        await env.DB.prepare(
          `INSERT INTO prior_authorizations (patient_id, provider_id, payer_id, requested_service, diagnosis_codes, status, pa_number, decision_reason, created_at)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))`
        ).bind(
          patientId, providerId || null, payerId || null,
          requestedService, JSON.stringify(diagnosisCodes),
          paDecision.toLowerCase().replace('_', '_'),
          paNumber,
          JSON.stringify(clinicalDecision)
        ).run();
      } catch {}
    }

    return json({
      success: true,
      workflow: 'prior_authorization',
      pa_number: paNumber,
      decision: paDecision,
      medically_necessary: clinicalDecision.medically_necessary,
      guideline_reference: clinicalDecision.guideline_reference,
      conditions_met: clinicalDecision.conditions_met,
      conditions_failed: clinicalDecision.conditions_failed,
      clinical_notes: clinicalDecision.clinical_notes,
      valid_days: paDecision === 'APPROVED' ? 90 : 0,
      requires_clinical_review: paDecision === 'CLINICAL_REVIEW',
      urgency,
    });
  } catch (e) {
    return json({ success: false, error: e.message }, 500);
  }
}

/**
 * POST /api/workflows/payer/fwa-detect
 * Fraud, Waste & Abuse detection: statistical analysis + AI pattern recognition
 */
export async function payerFWADetect(request, env) {
  try {
    const { payerId, analysisWindow = 30, thresholdSigma = 2.0 } = await request.json();

    // 1. Pull claims data for analysis
    let claimsData = [];
    if (env.DB) {
      try {
        const cutoff = new Date();
        cutoff.setDate(cutoff.getDate() - analysisWindow);
        const r = await env.DB.prepare(
          `SELECT
            pr.id as provider_id, pr.name as provider_name, pr.speciality,
            COUNT(c.id) as claim_count,
            AVG(c.billed_amount) as avg_amount,
            MAX(c.billed_amount) as max_amount,
            SUM(c.billed_amount) as total_billed,
            COUNT(DISTINCT c.patient_id) as unique_patients,
            SUM(CASE WHEN c.status = 'denied' THEN 1 ELSE 0 END) as denials
           FROM providers pr
           LEFT JOIN claims c ON c.provider_id = pr.id AND c.created_at >= ?
           GROUP BY pr.id
           ORDER BY total_billed DESC
           LIMIT 50`
        ).bind(cutoff.toISOString()).all();
        claimsData = r.results || [];
      } catch {}
    }

    // 2. Statistical anomaly detection (z-score based)
    const amounts = claimsData.map(p => p.avg_amount || 0).filter(a => a > 0);
    const mean = amounts.length ? amounts.reduce((s, a) => s + a, 0) / amounts.length : 0;
    const variance = amounts.length ? amounts.reduce((s, a) => s + (a - mean) ** 2, 0) / amounts.length : 0;
    const stdDev = Math.sqrt(variance);

    const flaggedProviders = claimsData.filter(p => {
      const zScore = stdDev > 0 ? Math.abs((p.avg_amount - mean) / stdDev) : 0;
      p.z_score = Math.round(zScore * 100) / 100;
      return zScore > thresholdSigma || (p.denials / (p.claim_count || 1)) > 0.3;
    });

    // 3. AI pattern analysis on flagged providers
    let aiInsights = '';
    if (flaggedProviders.length > 0) {
      aiInsights = await runAI(env, [
        {
          role: 'system',
          content: 'You are a healthcare fraud investigator. Analyze provider billing patterns and identify specific FWA indicators. Focus on upcoding, unbundling, phantom billing, and unusual utilization patterns. Be concise and specific.',
        },
        {
          role: 'user',
          content: `Flagged providers: ${JSON.stringify(flaggedProviders.slice(0, 10))}\nBaseline: avg_amount=${mean.toFixed(0)}, std=${stdDev.toFixed(0)}\nAnalysis window: ${analysisWindow} days`,
        },
      ]);
    }

    return json({
      success: true,
      workflow: 'fwa_detection',
      analysis_window_days: analysisWindow,
      providers_analyzed: claimsData.length,
      flagged_count: flaggedProviders.length,
      flagged_providers: flaggedProviders.slice(0, 20),
      statistical_baseline: {
        mean_claim_amount: Math.round(mean),
        std_deviation: Math.round(stdDev),
        threshold_sigma: thresholdSigma,
      },
      ai_insights: aiInsights,
      recommended_actions: flaggedProviders.length > 0
        ? ['initiate_provider_audit', 'request_medical_records', 'pause_auto_payment', 'notify_compliance_team']
        : ['continue_monitoring'],
      generated_at: new Date().toISOString(),
    });
  } catch (e) {
    return json({ success: false, error: e.message }, 500);
  }
}

/**
 * GET /api/workflows/payer/era/:claimId
 * Retrieve Electronic Remittance Advice for a claim
 */
export async function payerGetERA(request, env, _ctx, params) {
  try {
    const claimId = params?.[0] || request.url.split('/').pop();
    if (!claimId) return json({ success: false, error: 'claimId required' }, 400);

    let claim = null;
    if (env.DB) {
      try {
        claim = await env.DB.prepare(
          `SELECT c.*, p.name as patient_name, pr.name as provider_name
           FROM claims c
           LEFT JOIN patients p ON p.id = c.patient_id
           LEFT JOIN providers pr ON pr.id = c.provider_id
           WHERE c.id = ? LIMIT 1`
        ).bind(claimId).first();
      } catch {}
    }

    if (!claim) return json({ success: false, error: 'Claim not found' }, 404);

    return json({
      success: true,
      workflow: 'era_retrieval',
      era: {
        era_id: `ERA-${claimId}`,
        claim_id: claimId,
        patient_name: claim.patient_name,
        provider_name: claim.provider_name,
        status: claim.status,
        billed_amount: claim.billed_amount || 0,
        allowed_amount: claim.allowed_amount || 0,
        paid_amount: claim.paid_amount || 0,
        patient_responsibility: claim.patient_responsibility || 0,
        adjudication_result: claim.adjudication_result ? JSON.parse(claim.adjudication_result) : null,
        submitted_at: claim.submitted_at,
        processed_at: claim.updated_at,
        nphies_reference: `NP-${claimId}`,
      },
    });
  } catch (e) {
    return json({ success: false, error: e.message }, 500);
  }
}
