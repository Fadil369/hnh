/**
 * Telehealth Routes — HNH Portal v9.1.0
 * BrainSAIT Healthcare OS — استشارات طبية عن بُعد
 *
 * Routes:
 *   POST   /api/telehealth/sessions                     → Create session
 *   GET    /api/telehealth/sessions                     → List sessions (filters)
 *   GET    /api/telehealth/sessions/:id                 → Get session
 *   PATCH  /api/telehealth/sessions/:id                 → Update session
 *   POST   /api/telehealth/sessions/:id/start           → Start (generates room)
 *   POST   /api/telehealth/sessions/:id/end             → End session
 *   POST   /api/telehealth/sessions/:id/prescriptions   → Issue prescription
 *   GET    /api/telehealth/sessions/:id/prescriptions   → Get prescriptions
 *   GET    /api/telehealth/providers/:id/availability   → Provider availability
 *   GET    /api/telehealth/stats                        → KPI dashboard
 */

import { json } from '../utils/response.js';

// ── Helpers ────────────────────────────────────────────────────────────────

const newId  = (prefix) => prefix + Date.now().toString(36).toUpperCase();

const REALTIME_HUB = 'https://brainsait-realtime-hub.brainsait-fadil.workers.dev';

// Generate a short alphanumeric room code
function genRoomCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  const arr = new Uint8Array(8);
  crypto.getRandomValues(arr);
  for (const b of arr) code += chars[b % chars.length];
  return code.slice(0, 4) + '-' + code.slice(4);
}

const SESSION_TYPES    = ['consultation', 'follow-up', 'second-opinion', 'mental-health', 'nutrition', 'pharmacy'];
const SESSION_STATUSES = ['scheduled', 'waiting', 'in-progress', 'completed', 'cancelled', 'no-show'];

// ── POST /api/telehealth/sessions ─────────────────────────────────────────

export async function createSession(req, env) {
  const body = await req.json().catch(() => ({}));

  const required = ['patient_id', 'session_date', 'session_time'];
  for (const f of required) {
    if (!body[f]) return json({ success: false, message: `Missing required field: ${f}` }, 400);
  }

  if (body.session_type && !SESSION_TYPES.includes(body.session_type)) {
    return json({ success: false, message: `Invalid session_type. Valid: ${SESSION_TYPES.join(', ')}` }, 400);
  }

  const id = newId('TLH');
  const room_code = genRoomCode();
  const join_url = `https://telehealth.brainsait.org/room/${room_code}`;

  await env.DB.prepare(
    `INSERT INTO telehealth_sessions
       (id, patient_id, provider_id, branch_id, session_date, session_time, duration_min,
        status, session_type, department_id, chief_complaint, room_code, join_url, notes)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).bind(
    id,
    body.patient_id,
    body.provider_id || null,
    body.branch_id || 'R001',
    body.session_date,
    body.session_time,
    body.duration_min || 30,
    'scheduled',
    body.session_type || 'consultation',
    body.department_id || null,
    body.chief_complaint || null,
    room_code,
    join_url,
    body.notes || null,
  ).run();

  const session = await env.DB.prepare('SELECT * FROM telehealth_sessions WHERE id = ?').bind(id).first();
  return json({ success: true, session_id: id, room_code, join_url, session }, 201);
}

// ── GET /api/telehealth/sessions ──────────────────────────────────────────

export async function listSessions(req, env) {
  const url = new URL(req.url);
  const patient  = url.searchParams.get('patient_id') || '';
  const provider = url.searchParams.get('provider_id') || '';
  const status   = url.searchParams.get('status') || '';
  const date     = url.searchParams.get('date') || '';
  const branch   = url.searchParams.get('branch_id') || '';
  const limit    = Math.min(parseInt(url.searchParams.get('limit') || '50'), 200);
  const offset   = parseInt(url.searchParams.get('offset') || '0');

  let q = `SELECT s.*,
             p.name_ar as patient_name_ar, p.name_en as patient_name_en, p.phone as patient_phone
           FROM telehealth_sessions s
           LEFT JOIN patients p ON s.patient_id = p.id`;
  const binds = [];
  const conds = [];

  if (patient)  { conds.push('s.patient_id = ?');  binds.push(patient); }
  if (provider) { conds.push('s.provider_id = ?'); binds.push(provider); }
  if (status)   { conds.push('s.status = ?');      binds.push(status); }
  if (date)     { conds.push('s.session_date = ?'); binds.push(date); }
  if (branch)   { conds.push('s.branch_id = ?');   binds.push(branch); }

  if (conds.length) q += ' WHERE ' + conds.join(' AND ');
  q += ' ORDER BY s.session_date ASC, s.session_time ASC LIMIT ? OFFSET ?';
  binds.push(limit, offset);

  const { results } = await env.DB.prepare(q).bind(...binds).all();
  return json({ success: true, sessions: results || [], total: results?.length || 0 });
}

// ── GET /api/telehealth/sessions/:id ──────────────────────────────────────

export async function getSession(req, env, ctx, params) {
  const id = params[0];
  const session = await env.DB.prepare(
    `SELECT s.*,
       p.name_ar as patient_name_ar, p.name_en as patient_name_en,
       p.phone as patient_phone, p.insurance_company as patient_insurance
     FROM telehealth_sessions s
     LEFT JOIN patients p ON s.patient_id = p.id
     WHERE s.id = ?`
  ).bind(id).first();

  if (!session) return json({ success: false, message: 'Session not found' }, 404);
  return json({ success: true, session });
}

// ── PATCH /api/telehealth/sessions/:id ────────────────────────────────────

export async function updateSession(req, env, ctx, params) {
  const id = params[0];
  const body = await req.json().catch(() => ({}));

  const ALLOWED = ['status', 'provider_id', 'session_date', 'session_time', 'duration_min',
                   'chief_complaint', 'notes', 'department_id', 'session_type'];
  const fields = [];
  const binds = [];

  for (const [k, v] of Object.entries(body)) {
    if (ALLOWED.includes(k)) { fields.push(`${k} = ?`); binds.push(v); }
  }

  if (!fields.length) return json({ success: false, message: 'No updatable fields provided' }, 400);

  fields.push('updated_at = ?');
  binds.push(new Date().toISOString(), id);

  await env.DB.prepare(`UPDATE telehealth_sessions SET ${fields.join(', ')} WHERE id = ?`)
    .bind(...binds).run();

  const session = await env.DB.prepare('SELECT * FROM telehealth_sessions WHERE id = ?').bind(id).first();
  return json({ success: true, session });
}

// ── POST /api/telehealth/sessions/:id/start ───────────────────────────────

export async function startSession(req, env, ctx, params) {
  const id = params[0];
  const session = await env.DB.prepare('SELECT * FROM telehealth_sessions WHERE id = ?').bind(id).first();
  if (!session) return json({ success: false, message: 'Session not found' }, 404);
  if (session.status === 'completed') return json({ success: false, message: 'Session already completed' }, 409);

  const started_at = new Date().toISOString();
  await env.DB.prepare(
    `UPDATE telehealth_sessions SET status = 'in-progress', started_at = ?, updated_at = ? WHERE id = ?`
  ).bind(started_at, started_at, id).run();

  // Notify realtime hub (fire-and-forget)
  try {
    await fetch(`${REALTIME_HUB}/rooms/${session.room_code}/activate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ session_id: id, started_at }),
    });
  } catch (_) { /* non-blocking */ }

  return json({
    success: true,
    session_id: id,
    room_code: session.room_code,
    join_url: session.join_url,
    started_at,
    status: 'in-progress',
  });
}

// ── POST /api/telehealth/sessions/:id/end ─────────────────────────────────

export async function endSession(req, env, ctx, params) {
  const id = params[0];
  const body = await req.json().catch(() => ({}));
  const session = await env.DB.prepare('SELECT * FROM telehealth_sessions WHERE id = ?').bind(id).first();
  if (!session) return json({ success: false, message: 'Session not found' }, 404);

  const ended_at = new Date().toISOString();
  await env.DB.prepare(
    `UPDATE telehealth_sessions SET status = 'completed', ended_at = ?, notes = ?, updated_at = ? WHERE id = ?`
  ).bind(ended_at, body.notes || session.notes, ended_at, id).run();

  return json({ success: true, session_id: id, ended_at, status: 'completed' });
}

// ── POST /api/telehealth/sessions/:id/prescriptions ───────────────────────

export async function issuePrescription(req, env, ctx, params) {
  const session_id = params[0];
  const body = await req.json().catch(() => ({}));

  const session = await env.DB.prepare('SELECT * FROM telehealth_sessions WHERE id = ?').bind(session_id).first();
  if (!session) return json({ success: false, message: 'Session not found' }, 404);

  if (!body.medications || !Array.isArray(body.medications) || body.medications.length === 0) {
    return json({ success: false, message: 'medications array is required' }, 400);
  }

  const id = newId('RX');
  await env.DB.prepare(
    `INSERT INTO telehealth_prescriptions
       (id, session_id, patient_id, provider_id, medications_json, diagnosis_codes, instructions, status)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
  ).bind(
    id,
    session_id,
    session.patient_id,
    body.provider_id || session.provider_id || null,
    JSON.stringify(body.medications),
    body.diagnosis_codes || null,
    body.instructions || null,
    'active',
  ).run();

  // Link prescription to session
  await env.DB.prepare(
    `UPDATE telehealth_sessions SET prescription_id = ?, updated_at = ? WHERE id = ?`
  ).bind(id, new Date().toISOString(), session_id).run();

  return json({ success: true, prescription_id: id, session_id, medications: body.medications }, 201);
}

// ── GET /api/telehealth/sessions/:id/prescriptions ────────────────────────

export async function getPrescriptions(req, env, ctx, params) {
  const session_id = params[0];
  const { results } = await env.DB.prepare(
    `SELECT * FROM telehealth_prescriptions WHERE session_id = ? ORDER BY created_at DESC`
  ).bind(session_id).all();

  const prescriptions = (results || []).map(rx => {
    try { rx.medications = JSON.parse(rx.medications_json); } catch (_) {}
    return rx;
  });

  return json({ success: true, session_id, prescriptions });
}

// ── GET /api/telehealth/providers/:id/availability ────────────────────────

export async function getProviderAvailability(req, env, ctx, params) {
  const provider_id = params[0];
  const url = new URL(req.url);
  const date = url.searchParams.get('date') || new Date().toISOString().split('T')[0];

  // Booked slots for this provider on this date
  const { results: booked } = await env.DB.prepare(
    `SELECT session_time, duration_min, status FROM telehealth_sessions
     WHERE provider_id = ? AND session_date = ? AND status NOT IN ('cancelled','no-show')
     ORDER BY session_time ASC`
  ).bind(provider_id, date).all();

  // Generate available 30-min slots: 08:00 – 20:00 (Gulf clinic hours)
  const slots = [];
  for (let h = 8; h < 20; h++) {
    for (const m of [0, 30]) {
      const time = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
      const taken = booked.some(b => b.session_time === time);
      slots.push({ time, available: !taken });
    }
  }

  return json({
    success: true,
    provider_id,
    date,
    available_slots: slots.filter(s => s.available).map(s => s.time),
    booked_slots: booked,
    all_slots: slots,
  });
}

// ── GET /api/telehealth/stats ──────────────────────────────────────────────

export async function getTelehealthStats(req, env) {
  const [totals, byStatus, byType] = await Promise.all([
    env.DB.prepare(`SELECT
      COUNT(*) as total,
      SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as completed,
      SUM(CASE WHEN status = 'scheduled' THEN 1 ELSE 0 END) as scheduled,
      SUM(CASE WHEN status = 'in-progress' THEN 1 ELSE 0 END) as active,
      SUM(CASE WHEN date(session_date) = date('now') THEN 1 ELSE 0 END) as today
      FROM telehealth_sessions`).first(),
    env.DB.prepare(`SELECT status, COUNT(*) as count FROM telehealth_sessions GROUP BY status`).all(),
    env.DB.prepare(`SELECT session_type, COUNT(*) as count FROM telehealth_sessions GROUP BY session_type ORDER BY count DESC`).all(),
  ]);

  return json({
    success: true,
    stats: {
      total_sessions: totals?.total || 0,
      completed: totals?.completed || 0,
      scheduled: totals?.scheduled || 0,
      active: totals?.active || 0,
      today: totals?.today || 0,
      by_status: byStatus?.results || [],
      by_type: byType?.results || [],
    },
  });
}
