import { json } from '../utils/response.js';

export async function createAppointment(req, env) {
  const body = await req.json();
  const id = 'APT' + Date.now().toString(36).toUpperCase();
  
  await env.DB.prepare(
    `INSERT INTO appointments (id, patient_id, provider_id, clinic_code, clinic_name, appointment_date, appointment_time, status, appointment_type, reason)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).bind(
    id, body.patient_id, body.provider_id || null,
    body.clinic_code || 'GEN', body.clinic_name || '',
    body.appointment_date, body.appointment_time,
    body.status || 'scheduled', body.appointment_type || 'regular',
    body.reason || ''
  ).run();

  return json({ success: true, appointment_id: id }, 201);
}

export async function getAppointments(req, env, ctx, params, url) {
  if (!url) url = new URL(req.url);
  const search = url.searchParams.get('search') || '';
  const branch = url.searchParams.get('branch') || '';
  const date = url.searchParams.get('date') || '';
  const status = url.searchParams.get('status') || '';
  const patient = url.searchParams.get('patient_id') || '';
  const limit = parseInt(url.searchParams.get('limit') || '50');
  const offset = parseInt(url.searchParams.get('offset') || '0');

  let query = `SELECT a.*, p.full_name_ar as patient_name_ar, p.full_name_en as patient_name_en, p.phone as patient_phone`;
  query += ` FROM appointments a LEFT JOIN patients p ON a.patient_id = p.id`;
  const binds = [];
  const conditions = [];

  if (branch) { conditions.push('a.branch_id = ?'); binds.push(branch); }
  if (date) { conditions.push('a.appointment_date = ?'); binds.push(date); }
  if (status) { conditions.push('a.status = ?'); binds.push(status); }
  if (patient) { conditions.push('a.patient_id = ?'); binds.push(patient); }
  if (search) {
    conditions.push('(p.name_ar LIKE ? OR p.name_en LIKE ?)');
    binds.push(`%${search}%`, `%${search}%`);
  }

  if (conditions.length) query += ' WHERE ' + conditions.join(' AND ');
  query += ' ORDER BY a.appointment_date DESC, a.appointment_time ASC LIMIT ? OFFSET ?';
  binds.push(limit, offset);

  const { results } = await env.DB.prepare(query).bind(...binds).all();
  return json({ success: true, appointments: results || [] });
}

export async function getAppointment(req, env, ctx, params) {
  const id = params[0];
  const appt = await env.DB.prepare(
    `SELECT a.*, p.full_name_ar as patient_name_ar, p.full_name_en as patient_name_en, p.phone as patient_phone
     FROM appointments a LEFT JOIN patients p ON a.patient_id = p.id WHERE a.id = ?`
  ).bind(id).first();

  if (!appt) {
    return json({ success: false, message: 'Appointment not found' }, 404);
  }
  return json({ success: true, appointment: appt });
}

export async function updateAppointment(req, env, ctx, params) {
  const id = params[0];
  const body = await req.json();
  
  const fields = [];
  const binds = [];
  
  for (const [key, value] of Object.entries(body)) {
    const allowed = ['appointment_date','appointment_time','status','appointment_type','reason','provider_id','clinic_code','clinic_name'];
    if (allowed.includes(key)) {
      fields.push(`${key} = ?`);
      binds.push(value);
    }
  }
  
  if (fields.length === 0) {
    return json({ success: false, message: 'No valid fields to update' }, 400);
  }
  
  fields.push('updated_at = datetime(\'now\')');
  binds.push(id);
  
  await env.DB.prepare(`UPDATE appointments SET ${fields.join(', ')} WHERE id = ?`).bind(...binds).run();
  return json({ success: true, message: 'Appointment updated' });
}

export async function cancelAppointment(req, env, ctx, params) {
  const id = params[0];
  await env.DB.prepare(`UPDATE appointments SET status = 'cancelled', updated_at = datetime('now') WHERE id = ?`).bind(id).run();
  return json({ success: true, message: 'Appointment cancelled' });
}
