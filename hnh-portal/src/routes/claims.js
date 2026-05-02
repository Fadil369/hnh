import { json } from '../utils/response.js';

function generateClaimNumber() {
  const date = new Date();
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const seq = String(Math.floor(Math.random() * 99999)).padStart(5, '0');
  return `NH${y}${m}-${seq}`;
}

export async function createClaim(req, env) {
  const body = await req.json();
  const claimNumber = generateClaimNumber();
  const patientId = parseInt(body.patient_id) || 0;
  
  const result = await env.DB.prepare(
    `INSERT INTO claims (claim_number, patient_id, total_amount, status, payer_id, payer_name, claim_type)
     VALUES (?, ?, ?, ?, ?, ?, ?)`
  ).bind(
    claimNumber, patientId,
    body.total_amount, body.status || 'draft',
    body.payer_id || null, body.payer_name || null,
    body.claim_type || 'inpatient'
  ).run();

  return json({ success: true, claim_id: result?.meta?.last_row_id, claim_number: claimNumber }, 201);
}

export async function getClaims(req, env, ctx, params, url) {
  if (!url) url = new URL(req.url);
  const patient = url.searchParams.get('patient_id') || '';
  const branch = url.searchParams.get('branch') || '';
  const status = url.searchParams.get('status') || '';
  const limit = parseInt(url.searchParams.get('limit') || '50');
  const offset = parseInt(url.searchParams.get('offset') || '0');

  let query = `SELECT c.*, p.full_name_ar as patient_name_ar, p.full_name_en as patient_name_en`;
  query += ` FROM claims c LEFT JOIN patients p ON c.patient_id = p.id`;
  const binds = [];
  const conditions = [];

  if (patient) { conditions.push('c.patient_id = ?'); binds.push(patient); }
  if (status) { conditions.push('c.status = ?'); binds.push(status); }

  if (conditions.length) query += ' WHERE ' + conditions.join(' AND ');
  query += ' ORDER BY c.created_at DESC LIMIT ? OFFSET ?';
  binds.push(limit, offset);

  const { results } = await env.DB.prepare(query).bind(...binds).all();
  return json({ success: true, claims: results || [] });
}

export async function getClaim(req, env, ctx, params) {
  const id = params[0];
  const claim = await env.DB.prepare(
    `SELECT c.*, p.full_name_ar as patient_name_ar, p.full_name_en as patient_name_en, p.phone as patient_phone
     FROM claims c LEFT JOIN patients p ON c.patient_id = p.id
     WHERE c.id = ? OR c.claim_number = ?`
  ).bind(id, id).first();

  if (!claim) return json({ success: false, message: 'Claim not found' }, 404);
  
  return json({ success: true, claim });
}

export async function submitClaimToNPHIES(req, env, ctx, params) {
  const id = params[0];
  const claim = await env.DB.prepare('SELECT * FROM claims WHERE id = ? OR claim_number = ?').bind(id, id).first();
  
  if (!claim) return json({ success: false, message: 'Claim not found' }, 404);
  if (claim.status !== 'draft') return json({ success: false, message: 'Claim already submitted' }, 400);

  // Mock NPHIES submission
  const nphiesId = 'NPH' + Date.now().toString(36).toUpperCase();
  const now = new Date().toISOString();
  
  await env.DB.prepare(
    `UPDATE claims SET status = ?, nphies_claim_id = ?, submission_date = ?, approval_date = datetime('now')
     WHERE id = ?`
  ).bind('submitted', nphiesId, now, claim.id).run();

  return json({
    success: true,
    message: 'Claim submitted to NPHIES successfully',
    nphies_transaction_id: nphiesId,
    nphies_status: 'acknowledged',
    claim_id: claim.id,
    claim_number: claim.claim_number,
  });
}

export async function getClaimNPHIESStatus(req, env, ctx, params) {
  const id = params[0];
  const claim = await env.DB.prepare('SELECT * FROM claims WHERE id = ? OR claim_number = ?').bind(id, id).first();
  
  if (!claim) return json({ success: false, message: 'Claim not found' }, 404);
  
  const statuses = ['acknowledged', 'accepted', 'in_review', 'partially_paid', 'paid'];
  const mockStatus = statuses[Math.floor(Math.random() * statuses.length)];
  
  return json({
    success: true,
    claim_id: claim.id,
    claim_number: claim.claim_number,
    nphies_status: mockStatus,
    nphies_transaction_id: claim.nphies_claim_id,
    last_checked: new Date().toISOString(),
  });
}
