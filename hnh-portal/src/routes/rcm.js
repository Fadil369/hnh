/**
 * RCM — Revenue Cycle Management Routes
 * HNH Portal | BrainSAIT ClaimLinc Integration
 *
 * Routes:
 *   GET  /api/rcm/health                      → RCM module health
 *   GET  /api/rcm/batch/:batch_id             → Batch rejection summary
 *   POST /api/rcm/validate/price              → Price vs contract (BE-1-6)
 *   POST /api/rcm/validate/duplicate          → Duplicate detector (BE-1-5)
 *   POST /api/rcm/validate/pbm               → Drug-diagnosis validator (MN-1-1)
 *   POST /api/rcm/validate                   → Full validation pipeline
 *   POST /api/rcm/appeal/generate             → Appeal letter context
 *   GET  /api/rcm/dashboard/:branch           → Branch RCM KPI dashboard
 *   GET  /api/rcm/claims/rejected             → Rejected claims from D1
 *   POST /api/rcm/claims/:id/appeal           → Mark claim as appealed in D1
 *   POST /api/rcm/claims/:id/resubmit         → Mark claim for resubmission
 *
 * Based on production case: Batch 550181, BUPA Arabia, Riyadh, Feb 2026
 */

import { json } from '../utils/response.js';

// ── BUPA contract prices (Riyadh — Batch 550181 verified) ─────────────────
const CONTRACT_PRICES = {
  BUPA: {
    '0109222573': 3.16,  // Normal Saline IV 0.9% 1ml
    '0109222574': 6.32,
    '0109222575': 9.48,
    '0109222576': 12.64,
    '0109222577': 15.80,
  },
};

// ── PBM rules (drug-diagnosis pairing) ────────────────────────────────────
const PBM_RULES = [
  {
    drug_class: 'antiemetic_5ht3',
    name_patterns: ['ondansetron', 'zoron', 'zenorit', 'zofran', 'novoban'],
    codes: ['1001233084', '2205222049'],
    valid_icd_prefixes: ['C', 'K', 'R11', 'R10', 'Z51', 'Z79', 'T', 'G'],
    invalid_standalone: ['J02', 'J06', 'J00', 'J01', 'J03', 'J04', 'J05'],
    flag: 'MN-1-1',
    message: '5-HT3 antiemetic not justified for this diagnosis without oncology/procedural context',
    suggestion: 'Add secondary ICD: R11.2 (nausea/vomiting) or Z51.1 (chemo) or document procedure-related nausea',
  },
  {
    drug_class: 'PPI',
    name_patterns: ['toprazole', 'omeprazole', 'pantoprazole', 'esomeprazole', 'rabeprazole', 'lansoprazole'],
    codes: ['0411246139', '0411246140', '0411246141'],
    valid_icd_prefixes: ['C', 'K21', 'K25', 'K26', 'K27', 'K28', 'Z51', 'K92', 'T'],
    invalid_standalone: ['J02', 'J06', 'J00', 'Z00', 'Z01'],
    flag: 'MN-1-1',
    message: 'PPI not indicated as primary treatment for this diagnosis',
    suggestion: 'Add secondary ICD: K21.0 (GERD), K25 (Gastric ulcer), or K92.1 (Melena) for oncology GI prophylaxis',
  },
];

// ── Appeal context map ─────────────────────────────────────────────────────
const APPEAL_MAP = {
  'MN-1-1': {
    desc: 'Service not clinically justified per CPG without additional supporting diagnosis',
    cchi: 'CCHI Unified Policy Article 15 — Medically Necessary Services',
    docs: ['Clinical notes (date of service)', 'Physician justification letter', 'PA approval (if exists)', 'Lab/imaging results', 'Pharmacy dispensing record'],
    icd_suggestions: ['R11.2 Nausea/vomiting as reason for care', 'K21.0 GERD', 'Z51.1 Antineoplastic chemo', 'K92.1 Melena'],
  },
  'BE-1-6': {
    desc: 'Billed above contractual/agreed price — calculation discrepancy',
    cchi: 'CCHI Unified Policy Article 8 — Billing and Pricing Standards',
    docs: ['Corrected claim at contracted price', 'BUPA contract price schedule', 'HIS price master update confirmation'],
    icd_suggestions: [],
  },
  'BE-1-5': {
    desc: 'Duplicate / Repeated billing',
    cchi: 'CCHI Unified Policy Article 8 — Billing Accuracy',
    docs: ['Two separate clinical encounter notes', 'Evidence of distinct presenting complaints', 'Different physician confirmation'],
    icd_suggestions: [],
  },
  'AD-3-1': {
    desc: 'Service billed within free follow-up period',
    cchi: 'CCHI Unified Policy Article 11 — Follow-up Period Rules',
    docs: ['Original visit note', 'New complaint visit note (clearly different)', 'Physician attestation of new episode'],
    icd_suggestions: [],
  },
  'CV-1-4': {
    desc: 'Service or procedure not covered under patient policy',
    cchi: 'CCHI Unified Policy Annex A — Coverage Table',
    docs: ['Patient policy schedule', 'Benefit table showing coverage', 'Clinical justification letter'],
    icd_suggestions: [],
  },
};

// ── Seeded batch data ──────────────────────────────────────────────────────
const KNOWN_BATCHES = {
  '550181': {
    batch_id: '550181', stm_id: '938269',
    payer: 'BUPA Arabia', payer_id: 'INS-307',
    branch: 'riyadh', facility: 'Al Hayat National Hospital - Riyadh',
    provider_code: '21420', period: '202602', period_label: 'February 2026',
    claim_type: 'Out Patient', received_date: '2026-03-25',
    financials: {
      presented_sr: 510386.25, presented_deductible: 66205.51,
      net_billed_sr: 444180.74, vat_sr: 37443.98,
      net_with_vat_sr: 481624.72, total_shortfall_sr: 73862.47,
    },
    rejection_lines: 1415,
    shortfall_by_classification: {
      Medical_Necessity:          { sr: 43478.53, code: 'MN-1-1', pct: 58.9 },
      Pharmacy_Benefit_Management:{ sr: 36880.91, bundle: 'PBM',   pct: 49.9 },
      Billing_Error:              { sr: 15088.57, code: 'BE-1-6', pct: 20.4 },
      Coverage:                   { sr: 9079.85,  code: 'CV-1-4', pct: 12.3 },
      Administrative:             { sr: 3418.88,  code: 'AD-3-1', pct: 4.6  },
      Supporting_Evidence:        { sr: 2796.64,                   pct: 3.8  },
    },
    top_rejections: [
      { reason: 'Billed above contractual prices',            count: 102, code: 'BE-1-6', sr: 15088.57, action: 'Price correct + resubmit' },
      { reason: 'Duplicate / Repeated billing',               count: 57,  code: 'BE-1-5', sr: 8000,    action: 'Audit 4-type classification' },
      { reason: 'Consultation within free follow-up period',  count: 47,  code: 'AD-3-1', sr: 3418.88, action: 'Document new episode or accept' },
      { reason: 'Medication not indicated with diagnosis',    count: 200, code: 'MN-1-1', sr: 43478.53, action: 'Physician appeal letter' },
    ],
    recovery_forecast: { total_shortfall_sr: 73862.47, expected_recovery_sr: 64000, write_off_sr: 9862, recovery_pct: 87, timeline_weeks: 6 },
    corrective_actions: {
      'BE-1-6': 'Update HIS price master to match BUPA contract schedule for all active Riyadh service codes',
      'BE-1-5': 'Enable SBS pre-submission deduplication flag; add same-patient same-service alert',
      'MN-1-1': 'Integrate PBM validator at pharmacy order entry (/api/rcm/validate/pbm)',
      'AD-3-1': 'Add 14-day follow-up period alert in HIS appointment booking module',
    },
    top_customers: ['Majal Enjaz Co.', 'Riyadh Cables Group Company', 'Saudi Aramex Co. Ltd'],
  },
};

// ═══════════════════════════════════════════════════════════════════════════
// HANDLERS
// ═══════════════════════════════════════════════════════════════════════════

export function rcmHealth() {
  return json({
    ok: true, version: '1.0.0',
    module: 'RCM — Revenue Cycle Management',
    powered_by: 'BrainSAIT ClaimLinc',
    endpoints: [
      'GET  /api/rcm/batch/:id',
      'POST /api/rcm/validate/price',
      'POST /api/rcm/validate/duplicate',
      'POST /api/rcm/validate/pbm',
      'POST /api/rcm/validate',
      'POST /api/rcm/appeal/generate',
      'GET  /api/rcm/dashboard/:branch',
      'GET  /api/rcm/claims/rejected',
      'POST /api/rcm/claims/:id/appeal',
      'POST /api/rcm/claims/:id/resubmit',
    ],
    case_study: 'Batch 550181 — BUPA Arabia Riyadh Feb 2026 | SR 73,862 shortfall | 87% recovery target',
  });
}

export async function getRcmBatch(req, env, ctx, batchId) {
  const batch = KNOWN_BATCHES[batchId];
  if (!batch) return json({ error: `Batch ${batchId} not found`, available: Object.keys(KNOWN_BATCHES) }, 404);

  // Enrich with live D1 claim count if available
  if (env.DB) {
    try {
      const counts = await env.DB.prepare(
        `SELECT status, COUNT(*) as count, SUM(total_amount) as total
         FROM claims WHERE batch_number = ? GROUP BY status`
      ).bind(batchId).all();
      if (counts.results?.length) {
        batch.live_db_counts = counts.results;
      }
    } catch {}
  }
  return json({ success: true, batch });
}

export async function validatePrice(req) {
  const body = await req.json();
  const items = body.items ?? [];
  const payer = body.payer ?? 'BUPA';
  const priceMap = CONTRACT_PRICES[payer] ?? CONTRACT_PRICES['BUPA'];

  const violations = [], clean_items = [];
  let total_overcharge = 0;

  for (const item of items) {
    const contracted = priceMap[item.serv_code];
    if (contracted === undefined) {
      clean_items.push({ ...item, note: 'No contract price on file — verify manually' });
      continue;
    }
    const diff = Math.round((item.billed_amount - contracted) * 100) / 100;
    if (diff > 0.01) {
      total_overcharge += diff;
      violations.push({
        serv_code: item.serv_code,
        serv_desc: item.serv_desc ?? '',
        billed_amount: item.billed_amount,
        contracted_amount: contracted,
        overcharge_sr: diff,
        flag: 'BE-1-6',
        action: `Change price from ${item.billed_amount} SR to ${contracted} SR in HIS → resubmit`,
      });
    } else {
      clean_items.push({ ...item, contracted_amount: contracted, status: 'PASS' });
    }
  }

  return json({
    valid: violations.length === 0,
    total_items: items.length,
    violations_count: violations.length,
    clean_count: clean_items.length,
    total_overcharge_sr: Math.round(total_overcharge * 100) / 100,
    violations, clean_items, payer,
    summary: violations.length === 0
      ? '✅ All prices match contract schedule'
      : `❌ ${violations.length} pricing violation(s) — total overcharge: SR ${total_overcharge.toFixed(2)}`,
  });
}

export async function validateDuplicate(req) {
  const body = await req.json();
  const claims = body.claims ?? [];
  const windowDays = body.window_days ?? 14;
  const duplicates = [], seen = new Map();

  for (const claim of claims) {
    const key = `${claim.patient_id}::${claim.serv_code}`;
    const existing = seen.get(key);
    if (existing) {
      const gapDays = Math.abs((new Date(claim.inv_date) - new Date(existing.inv_date)) / 86400000);
      const type = gapDays < 0.01 ? 'TYPE_1_SYSTEM_DOUBLE_SEND'
        : gapDays <= windowDays ? 'TYPE_4_FOLLOW_UP_PERIOD'
        : 'TYPE_3_GENUINE_REPEAT';
      duplicates.push({
        claim_id: claim.claim_id, duplicate_of: existing.claim_id,
        patient_id: claim.patient_id, serv_code: claim.serv_code,
        gap_days: Math.round(gapDays * 10) / 10, type, flag: 'BE-1-5',
        action: type === 'TYPE_1_SYSTEM_DOUBLE_SEND' ? 'REMOVE from batch — same-day system double-send'
          : type === 'TYPE_4_FOLLOW_UP_PERIOD' ? `Within ${windowDays}-day follow-up — document new complaint if different episode`
          : 'Genuine repeat — document distinct clinical episodes',
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
      type1_system: duplicates.filter(d => d.type === 'TYPE_1_SYSTEM_DOUBLE_SEND').length,
      type4_follow_up: duplicates.filter(d => d.type === 'TYPE_4_FOLLOW_UP_PERIOD').length,
      type3_genuine: duplicates.filter(d => d.type === 'TYPE_3_GENUINE_REPEAT').length,
    },
    duplicates,
    summary: duplicates.length === 0 ? `✅ No duplicates in ${claims.length} claims`
      : `⚠️ ${duplicates.length} duplicate(s) found`,
  });
}

export async function validatePbm(req) {
  const body = await req.json();
  const items = body.items ?? [];
  const violations = [], valid_items = [];

  for (const item of items) {
    const drugCode = item.drug_code ?? '';
    const drugName = (item.drug_name ?? item.serv_desc ?? '').toLowerCase();
    const icds = item.icd_codes ?? [];

    const rule = PBM_RULES.find(r =>
      r.codes.includes(drugCode) || r.name_patterns.some(p => drugName.includes(p))
    );
    if (!rule) { valid_items.push({ ...item, status: 'NO_RULE' }); continue; }

    const hasValidIcd = icds.some(icd => rule.valid_icd_prefixes.some(p => icd.startsWith(p)));
    const onlyInvalid = icds.every(icd => rule.invalid_standalone.some(b => icd.startsWith(b)));

    if (hasValidIcd) {
      valid_items.push({ ...item, status: 'PASS', matched_rule: rule.drug_class });
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
        appeal_strength: onlyInvalid ? 'WEAK' : 'MEDIUM',
        action: onlyInvalid
          ? 'Add supporting secondary ICD at prescription time, or document procedural context'
          : 'Add secondary ICD to support drug indication before resubmission',
      });
    }
  }

  return json({
    total_items: items.length,
    violations_count: violations.length,
    valid_count: valid_items.length,
    violations, valid_items,
    summary: violations.length === 0
      ? '✅ All drug-diagnosis pairs validated — no MN-1-1 risks'
      : `⚠️ ${violations.length} PBM violation(s) — risk of MN-1-1 rejection`,
  });
}

export async function validateAll(req) {
  const body = await req.json();
  const bodyStr = JSON.stringify(body);

  const makeReq = () => new Request('https://internal/validate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: bodyStr,
  });

  const [priceResult, dupResult, pbmResult] = await Promise.allSettled([
    validatePrice(makeReq()),
    validateDuplicate(makeReq()),
    validatePbm(makeReq()),
  ]);

  const price = priceResult.status === 'fulfilled' ? await priceResult.value.json() : { error: 'price check failed' };
  const dup   = dupResult.status === 'fulfilled'   ? await dupResult.value.json()   : { error: 'duplicate check failed' };
  const pbm   = pbmResult.status === 'fulfilled'   ? await pbmResult.value.json()   : { error: 'pbm check failed' };

  const totalErrors = (price.violations_count ?? 0) + (dup.duplicates_found ?? 0) + (pbm.violations_count ?? 0);

  return json({
    overall_ready: totalErrors === 0,
    total_errors: totalErrors,
    validators: { price, duplicate: dup, pbm },
    summary: totalErrors === 0
      ? '✅ Claim passed all validators — safe for NPHIES submission'
      : `❌ ${totalErrors} issue(s) — fix before submission`,
  });
}

export async function generateAppeal(req) {
  const body = await req.json();
  const code = body.rejection_code ?? 'MN-1-1';
  const map = APPEAL_MAP[code] ?? APPEAL_MAP['MN-1-1'];
  const icds = body.icd_codes ?? [];
  const hasPa = !!body.pa_number;
  const hasOncology = icds.some(i => i.startsWith('C'));
  const amount = body.rejection_amount_sr ?? 0;

  let score = 0;
  if (hasPa) score += 3;
  if (hasOncology) score += 2;
  if (body.clinical_context) score += 2;
  if (amount > 500) score += 1;
  const strength = score >= 5 ? 'strong' : score >= 3 ? 'medium' : 'weak';

  return json({
    claim_id: body.claim_id,
    rejection_code: code,
    payer: body.payer ?? 'BUPA Arabia',
    branch: body.branch ?? 'riyadh',
    nphies_description: map.desc,
    cchi_article: map.cchi,
    appeal_strength: strength,
    strength_score: score,
    pa_number: body.pa_number,
    pa_status: hasPa ? 'EXISTS — strong appeal factor' : 'MISSING — weaker case without PA',
    icd_codes: icds,
    oncology_case: hasOncology,
    drug_code: body.drug_code,
    drug_name: body.drug_name,
    supporting_docs_required: map.docs,
    icd_suggestions: map.icd_suggestions,
    action_steps: [
      hasPa ? `✅ Attach PA #${body.pa_number} approval letter` : '⚠️ No PA — strengthen with physician narrative',
      'Complete physician appeal letter (use /api/rcm/batch/550181 template)',
      hasOncology ? '✅ Oncology case — reference NCCN/ESMO/Saudi MOH CPG' : 'Reference Saudi MOH CPG for this condition',
      'Department head countersign for claims > SR 500',
      'Submit via BUPA provider portal + NPHIES ClaimResponse appeal workflow',
    ],
    recommendation: strength === 'strong'
      ? '🟢 STRONG — proceed with full appeal package'
      : strength === 'medium'
      ? '🟡 MEDIUM — strengthen documentation before submitting'
      : '🔴 WEAK — review clinical basis; consider write-off if no supporting evidence',
    generated_at: new Date().toISOString(),
  });
}

export async function getRcmDashboard(req, env, ctx, branch) {
  branch = branch ?? 'riyadh';

  // Live rejected claims from D1
  let rejectedClaims = [];
  if (env.DB) {
    try {
      const res = await env.DB.prepare(
        `SELECT id, claim_number, total_amount, payer_name, status, created_at, nphies_status
         FROM claims WHERE status IN ('rejected','denied') AND branch = ?
         ORDER BY created_at DESC LIMIT 20`
      ).bind(branch).all();
      rejectedClaims = res.results ?? [];
    } catch {}
  }

  return json({
    success: true, branch,
    dashboard_version: '1.0.0',
    generated_at: new Date().toISOString(),
    live_rejected_claims: { count: rejectedClaims.length, claims: rejectedClaims },
    reference_batch: KNOWN_BATCHES['550181'],
    rcm_action_items: [
      { priority: 1, action: 'Export BE-1-6 lines → correct price master → resubmit', code: 'BE-1-6', impact: 'SR 15,088 recovery' },
      { priority: 2, action: 'Run eligibility check on Coverage rejections', code: 'CV-1-4', impact: 'SR 7,000 recovery' },
      { priority: 3, action: 'Physician appeal letters for top MN-1-1 by amount', code: 'MN-1-1', impact: 'SR 31,000 recovery' },
      { priority: 4, action: 'Audit 57 duplicate lines → classify Type 1/2/3/4', code: 'BE-1-5', impact: 'SR 9,000 recovery' },
    ],
    prevention_tools: {
      price_check:  'POST /api/rcm/validate/price',
      dedup_check:  'POST /api/rcm/validate/duplicate',
      pbm_check:    'POST /api/rcm/validate/pbm',
      full_validate:'POST /api/rcm/validate',
      appeal_gen:   'POST /api/rcm/appeal/generate',
    },
  });
}

export async function getRejectedClaims(req, env, ctx, _p, url) {
  if (!url) url = new URL(req.url);
  const branch = url.searchParams.get('branch') ?? '';
  const payer  = url.searchParams.get('payer') ?? '';
  const limit  = parseInt(url.searchParams.get('limit') ?? '50');

  if (!env.DB) return json({ error: 'Database not available' }, 503);

  let q = `SELECT id, claim_number, total_amount, payer_name, payer_id, status, nphies_status,
            nphies_rejection_code, created_at, branch FROM claims
            WHERE status IN ('rejected','denied')`;
  const binds = [];
  if (branch) { q += ' AND branch = ?'; binds.push(branch); }
  if (payer)  { q += ' AND payer_name LIKE ?'; binds.push(`%${payer}%`); }
  q += ' ORDER BY created_at DESC LIMIT ?';
  binds.push(limit);

  const { results } = await env.DB.prepare(q).bind(...binds).all();
  return json({ success: true, count: results?.length ?? 0, claims: results ?? [] });
}

export async function markAppeal(req, env, ctx, claimId) {
  const body = await req.json();
  if (!env.DB) return json({ error: 'Database not available' }, 503);
  await env.DB.prepare(
    `UPDATE claims SET status = 'appealed', appeal_date = ?, appeal_notes = ?,
     nphies_rejection_code = COALESCE(?, nphies_rejection_code),
     updated_at = datetime('now') WHERE id = ? OR claim_number = ?`
  ).bind(
    new Date().toISOString(),
    body.appeal_notes ?? '',
    body.rejection_code ?? null,
    claimId, claimId
  ).run();
  return json({ success: true, claim_id: claimId, status: 'appealed', appeal_date: new Date().toISOString() });
}

export async function markResubmit(req, env, ctx, claimId) {
  const body = await req.json();
  if (!env.DB) return json({ error: 'Database not available' }, 503);
  await env.DB.prepare(
    `UPDATE claims SET status = 'resubmitted', resubmit_date = ?, resubmit_notes = ?,
     updated_at = datetime('now') WHERE id = ? OR claim_number = ?`
  ).bind(
    new Date().toISOString(),
    body.resubmit_notes ?? '',
    claimId, claimId
  ).run();
  return json({ success: true, claim_id: claimId, status: 'resubmitted', resubmit_date: new Date().toISOString() });
}
