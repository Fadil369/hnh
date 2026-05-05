/**
 * Home Care Routes — HNH Portal v9.1.0
 * BrainSAIT Healthcare OS — رعاية منزلية
 *
 * Routes:
 *   POST   /api/homecare/visits                    → Schedule home visit
 *   GET    /api/homecare/visits                    → List visits (filters: patient, status, date, nurse, branch)
 *   GET    /api/homecare/visits/:id                → Get single visit
 *   PATCH  /api/homecare/visits/:id                → Update visit (status, nurse, notes)
 *   POST   /api/homecare/visits/:id/vitals         → Record vitals for a visit
 *   GET    /api/homecare/nurses                    → List nurses/field staff
 *   POST   /api/homecare/nurses                    → Register new nurse
 *   GET    /api/homecare/nurses/:id/schedule       → Nurse daily schedule
 *   GET    /api/homecare/stats                     → Home care KPIs
 */

import { json } from '../utils/response.js';

// ── Helpers ────────────────────────────────────────────────────────────────

const newId = (prefix) => prefix + Date.now().toString(36).toUpperCase();

const VISIT_TYPES = ['routine', 'post-op', 'wound-care', 'iv-therapy', 'physiotherapy', 'palliative', 'maternal', 'pediatric'];
const VISIT_STATUSES = ['scheduled', 'en-route', 'in-progress', 'completed', 'cancelled', 'no-show'];

// ── POST /api/homecare/visits ──────────────────────────────────────────────

export async function createVisit(req, env) {
  const body = await req.json().catch(() => ({}));

  const required = ['patient_id', 'visit_date', 'address'];
  for (const f of required) {
    if (!body[f]) return json({ success: false, message: `Missing required field: ${f}` }, 400);
  }

  if (body.visit_type && !VISIT_TYPES.includes(body.visit_type)) {
    return json({ success: false, message: `Invalid visit_type. Valid: ${VISIT_TYPES.join(', ')}` }, 400);
  }

  const id = newId('HCV');

  await env.DB.prepare(
    `INSERT INTO homecare_visits
       (id, patient_id, nurse_id, branch_id, visit_date, visit_time, status, visit_type,
        address, city, lat, lng, chief_complaint, notes, insurance_company, insurance_id)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).bind(
    id,
    body.patient_id,
    body.nurse_id || null,
    body.branch_id || 'R001',
    body.visit_date,
    body.visit_time || null,
    'scheduled',
    body.visit_type || 'routine',
    body.address,
    body.city || 'الرياض',
    body.lat || null,
    body.lng || null,
    body.chief_complaint || null,
    body.notes || null,
    body.insurance_company || null,
    body.insurance_id || null,
  ).run();

  const visit = await env.DB.prepare('SELECT * FROM homecare_visits WHERE id = ?').bind(id).first();
  return json({ success: true, visit_id: id, visit }, 201);
}

// ── GET /api/homecare/visits ───────────────────────────────────────────────

export async function listVisits(req, env) {
  const url = new URL(req.url);
  const patient  = url.searchParams.get('patient_id') || '';
  const status   = url.searchParams.get('status') || '';
  const date     = url.searchParams.get('date') || '';
  const nurse    = url.searchParams.get('nurse_id') || '';
  const branch   = url.searchParams.get('branch_id') || '';
  const limit    = Math.min(parseInt(url.searchParams.get('limit') || '50'), 200);
  const offset   = parseInt(url.searchParams.get('offset') || '0');

  let q = `SELECT v.*, p.full_name_ar as patient_name_ar, p.full_name_en as patient_name_en, p.phone as patient_phone,
                  n.name_ar as nurse_name_ar, n.name_en as nurse_name_en, n.phone as nurse_phone
           FROM homecare_visits v
           LEFT JOIN patients p ON v.patient_id = p.id
           LEFT JOIN homecare_nurses n ON v.nurse_id = n.id`;
  const binds = [];
  const conds = [];

  if (patient) { conds.push('v.patient_id = ?');  binds.push(patient); }
  if (status)  { conds.push('v.status = ?');       binds.push(status); }
  if (date)    { conds.push('v.visit_date = ?');   binds.push(date); }
  if (nurse)   { conds.push('v.nurse_id = ?');     binds.push(nurse); }
  if (branch)  { conds.push('v.branch_id = ?');    binds.push(branch); }

  if (conds.length) q += ' WHERE ' + conds.join(' AND ');
  q += ' ORDER BY v.visit_date ASC, v.visit_time ASC LIMIT ? OFFSET ?';
  binds.push(limit, offset);

  const { results } = await env.DB.prepare(q).bind(...binds).all();
  return json({ success: true, visits: results || [], total: results?.length || 0 });
}

// ── GET /api/homecare/visits/:id ───────────────────────────────────────────

export async function getVisit(req, env, ctx, params) {
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

  if (!visit) return json({ success: false, message: 'Visit not found' }, 404);
  if (visit.vitals_json) {
    try { visit.vitals = JSON.parse(visit.vitals_json); } catch (_) {}
  }
  return json({ success: true, visit });
}

// ── PATCH /api/homecare/visits/:id ────────────────────────────────────────

export async function updateVisit(req, env, ctx, params) {
  const id = params[0];
  const body = await req.json().catch(() => ({}));

  const ALLOWED = ['status', 'nurse_id', 'visit_date', 'visit_time', 'address', 'city',
                   'chief_complaint', 'notes', 'visit_type', 'lat', 'lng'];
  const fields = [];
  const binds = [];

  for (const [k, v] of Object.entries(body)) {
    if (ALLOWED.includes(k)) { fields.push(`${k} = ?`); binds.push(v); }
  }

  if (body.status === 'completed') {
    fields.push('completed_at = ?');
    binds.push(new Date().toISOString());
  }

  if (!fields.length) return json({ success: false, message: 'No updatable fields provided' }, 400);

  fields.push('updated_at = ?');
  binds.push(new Date().toISOString(), id);

  await env.DB.prepare(`UPDATE homecare_visits SET ${fields.join(', ')} WHERE id = ?`).bind(...binds).run();
  const visit = await env.DB.prepare('SELECT * FROM homecare_visits WHERE id = ?').bind(id).first();
  return json({ success: true, visit });
}

// ── POST /api/homecare/visits/:id/vitals ──────────────────────────────────

export async function recordVitals(req, env, ctx, params) {
  const id = params[0];
  const body = await req.json().catch(() => ({}));

  // Accepted vitals: bp_systolic, bp_diastolic, heart_rate, temperature, spo2, weight, blood_glucose, notes
  const vitals = {
    recorded_at: new Date().toISOString(),
    bp_systolic: body.bp_systolic || null,
    bp_diastolic: body.bp_diastolic || null,
    heart_rate: body.heart_rate || null,
    temperature: body.temperature || null,
    spo2: body.spo2 || null,
    weight_kg: body.weight_kg || null,
    blood_glucose: body.blood_glucose || null,
    respiratory_rate: body.respiratory_rate || null,
    pain_score: body.pain_score || null,
    notes: body.notes || null,
  };

  // Alert flags
  const alerts = [];
  if (vitals.spo2 !== null && vitals.spo2 < 92) alerts.push('CRITICAL: SpO2 < 92%');
  if (vitals.bp_systolic !== null && vitals.bp_systolic > 180) alerts.push('HIGH BP: systolic > 180');
  if (vitals.heart_rate !== null && (vitals.heart_rate > 120 || vitals.heart_rate < 50)) alerts.push('ABNORMAL HR');
  if (vitals.temperature !== null && vitals.temperature > 38.5) alerts.push('FEVER: > 38.5°C');
  if (vitals.blood_glucose !== null && vitals.blood_glucose > 13.9) alerts.push('HYPERGLYCEMIA: > 250 mg/dL');

  vitals.alerts = alerts;

  await env.DB.prepare(
    `UPDATE homecare_visits SET vitals_json = ?, updated_at = ? WHERE id = ?`
  ).bind(JSON.stringify(vitals), new Date().toISOString(), id).run();

  return json({ success: true, vitals, alerts, visit_id: id });
}

// ── GET /api/homecare/nurses ───────────────────────────────────────────────

export async function listNurses(req, env) {
  const url = new URL(req.url);
  const branch = url.searchParams.get('branch_id') || '';
  const status = url.searchParams.get('status') || 'active';

  let q = 'SELECT * FROM homecare_nurses';
  const binds = [];
  const conds = [];
  if (branch) { conds.push('branch_id = ?'); binds.push(branch); }
  if (status) { conds.push('status = ?');    binds.push(status); }
  if (conds.length) q += ' WHERE ' + conds.join(' AND ');
  q += ' ORDER BY name_ar ASC';

  const { results } = await env.DB.prepare(q).bind(...binds).all();
  return json({ success: true, nurses: results || [], total: results?.length || 0 });
}

// ── POST /api/homecare/nurses ──────────────────────────────────────────────

export async function createNurse(req, env) {
  const body = await req.json().catch(() => ({}));
  if (!body.name_ar) return json({ success: false, message: 'name_ar is required' }, 400);

  const id = newId('NRS');
  await env.DB.prepare(
    `INSERT INTO homecare_nurses (id, name_ar, name_en, phone, branch_id, specialty, status)
     VALUES (?, ?, ?, ?, ?, ?, ?)`
  ).bind(
    id, body.name_ar, body.name_en || null, body.phone || null,
    body.branch_id || 'R001', body.specialty || 'general', body.status || 'active'
  ).run();

  return json({ success: true, nurse_id: id }, 201);
}

// ── GET /api/homecare/nurses/:id/schedule ─────────────────────────────────

export async function getNurseSchedule(req, env, ctx, params) {
  const id = params[0];
  const url = new URL(req.url);
  const date = url.searchParams.get('date') || new Date().toISOString().split('T')[0];

  const nurse = await env.DB.prepare('SELECT * FROM homecare_nurses WHERE id = ?').bind(id).first();
  if (!nurse) return json({ success: false, message: 'Nurse not found' }, 404);

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
    visit_count: results?.length || 0,
  });
}

// ── GET /api/homecare/stats ────────────────────────────────────────────────

export async function getHomecareStats(req, env) {
  const [totals, byStatus, byType] = await Promise.all([
    env.DB.prepare(`SELECT COUNT(*) as total,
      SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as completed,
      SUM(CASE WHEN status = 'scheduled' THEN 1 ELSE 0 END) as scheduled,
      SUM(CASE WHEN status = 'cancelled' THEN 1 ELSE 0 END) as cancelled,
      SUM(CASE WHEN date(visit_date) = date('now') THEN 1 ELSE 0 END) as today
      FROM homecare_visits`).first(),
    env.DB.prepare(`SELECT status, COUNT(*) as count FROM homecare_visits GROUP BY status`).all(),
    env.DB.prepare(`SELECT visit_type, COUNT(*) as count FROM homecare_visits GROUP BY visit_type ORDER BY count DESC`).all(),
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
      by_type: byType?.results || [],
    },
  });
}
