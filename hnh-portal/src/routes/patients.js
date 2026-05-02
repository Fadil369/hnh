import { json } from '../utils/response.js';

export async function createPatient(req, env) {
  const body = await req.json();
  const id = 'PAT' + Date.now().toString(36).toUpperCase();
  
  const mrn = 'HNH-' + Date.now();
  
  const { data: result } = await env.DB.prepare(
    `INSERT INTO patients (id, mrn, national_id, first_name_ar, last_name_ar, full_name_ar, first_name_en, last_name_en, full_name_en, phone, email, date_of_birth, gender, blood_type, allergies)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).bind(
    id, mrn, body.national_id || null,
    body.first_name_ar || body.name_ar, body.last_name_ar || '',
    body.full_name_ar || body.name_ar,
    body.first_name_en || '', body.last_name_en || '',
    body.full_name_en || body.name_en || '',
    body.phone, body.email || null,
    body.date_of_birth || body.dob || null, body.gender || null,
    body.blood_type || null, body.allergies || null
  ).run();

  return json({ success: true, patient_id: id, message: 'Patient created successfully' }, 201);
}

export async function getPatients(req, env, ctx, params, url) {
  if (!url) url = new URL(req.url);
  const search = url.searchParams.get('search') || '';
  const branch = url.searchParams.get('branch') || '';
  const limit = parseInt(url.searchParams.get('limit') || '50');
  const offset = parseInt(url.searchParams.get('offset') || '0');

  let query = 'SELECT * FROM patients';
  let binds = [];
  const conditions = [];

  if (search) {
    conditions.push('(full_name_ar LIKE ? OR full_name_en LIKE ? OR phone LIKE ? OR national_id LIKE ?)');
    const s = `%${search}%`;
    binds.push(s, s, s, s);
  }

  if (conditions.length) {
    query += ' WHERE ' + conditions.join(' AND ');
  }

  query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
  binds.push(limit, offset);

  const { results } = await env.DB.prepare(query).bind(...binds).all();
  return json({ success: true, patients: results || [], total: results?.length || 0 });
}

export async function getPatient(req, env, ctx, params) {
  const id = params[0];
  const patient = await env.DB.prepare('SELECT * FROM patients WHERE id = ? OR national_id = ?').bind(id, id).first();
  
  if (!patient) {
    return new Response(JSON.stringify({ success: false, message: 'Patient not found' }), {
      status: 404, headers: { 'Content-Type': 'application/json' },
    });
  }
  
  return json({ success: true, patient });
}

export async function updatePatient(req, env, ctx, params) {
  const id = params[0];
  const body = await req.json();
  
  const fields = [];
  const binds = [];
  
  for (const [key, value] of Object.entries(body)) {
    const allowed = ['national_id','name_ar','name_en','phone','email','dob','gender','insurance_company','insurance_id','blood_type','allergies'];
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
  
  await env.DB.prepare(`UPDATE patients SET ${fields.join(', ')} WHERE id = ?`).bind(...binds).run();
  
  return json({ success: true, message: 'Patient updated' });
}
