import { json } from '../utils/response.js';
import { CONFIG } from '../config.js';
const DEPARTMENTS = CONFIG.DEPARTMENTS || [];
const C = CONFIG.CORPORATE || {};
const S = C.STATS || {};
const ALL_DEPTS = CONFIG.DEPARTMENTS_FULL || [];

export async function getStats(env) {
  let providerCount = S.doctors || 700;
  try {
    const pc = await env.DB.prepare('SELECT COUNT(*) as c FROM providers WHERE is_active = 1').first();
    if (pc && pc.c) providerCount = pc.c;
  } catch(e) {}

  const stats = env.DB
    ? await env.DB.prepare(
        `SELECT
          (SELECT COUNT(*) FROM patients) as total_patients,
          (SELECT COUNT(*) FROM appointments WHERE date(appointment_date) = date('now')) as today_appointments,
          (SELECT COUNT(*) FROM providers) as total_providers,
          (SELECT COUNT(*) FROM claims) as total_claims,
          (SELECT COUNT(*) FROM claims WHERE status = 'submitted') as submitted_claims,
          (SELECT COUNT(*) FROM claims WHERE status = 'paid') as paid_claims,
          (SELECT COUNT(*) FROM appointments WHERE status = 'scheduled') as scheduled_appointments,
          (SELECT COUNT(*) FROM appointments WHERE status = 'completed') as completed_appointments`
      ).first()
    : {};

  return json({
    success: true,
    stats: {
      total_patients: stats?.total_patients || 0,
      today_appointments: stats?.today_appointments || 0,
      total_providers: providerCount || S.doctors || 700,
      total_branches: 5,
      total_beds: S.beds || 1200,
      total_branches: 5,
      total_departments: ALL_DEPTS.length || DEPARTMENTS.length,
      total_claims: stats?.total_claims || 0,
      submitted_claims: stats?.submitted_claims || 0,
      paid_claims: stats?.paid_claims || 0,
      scheduled_appointments: stats?.scheduled_appointments || 0,
      completed_appointments: stats?.completed_appointments || 0,
    },
    timestamp: new Date().toISOString(),
  });
}
