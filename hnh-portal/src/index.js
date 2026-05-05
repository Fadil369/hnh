import { Router } from './router.js';
import { json, err, handleCors, getAllowedOrigin } from './utils/response.js';
import { rateLimit } from './utils/rate-limit.js';
import { CONFIG, SECURITY_HEADERS } from './config.js';
import { health } from './routes/health.js';
import { branches, getBranches, getBranch } from './routes/branches.js';
import { createAppointment, getAppointments, getAppointment, updateAppointment, cancelAppointment } from './routes/appointments.js';
import { createPatient, getPatients, getPatient, updatePatient } from './routes/patients.js';
import { createClaim, getClaims, getClaim, submitClaimToNPHIES, getClaimNPHIESStatus } from './routes/claims.js';
import { checkEligibility, verifyInsurance, getEligibilityHistory } from './routes/eligibility.js';
import { getProviders, getProvider } from './routes/providers.js';
import { submit270, submit278, submit837, getClaimStatus276, receive835 } from './routes/nphies.js';
import { getFHIRPatient, searchFHIRPatients, getFHIRPractitioner, getFHIRAppointment, getFHIRClaim, getFHIRCoverage } from './routes/fhir.js';
import { getStats } from './routes/statistics.js';
import { handleChat } from './ai/chat.js';
import { handleVoiceSpeak, handleVoiceChat, handleVoiceVoices, handleVoiceOptions } from './routes/voice.js';
import {
  rcmHealth, getRcmBatch, validatePrice, validateDuplicate, validatePbm, validateAll,
  generateAppeal, getRcmDashboard, getRejectedClaims, markAppeal, markResubmit,
} from './routes/rcm.js';
import { handleSearch } from './routes/search.js';
import {
  createVisit, listVisits, getVisit, updateVisit, recordVitals,
  listNurses, createNurse, getNurseSchedule, getHomecareStats,
} from './routes/homecare.js';
import {
  createSession, listSessions, getSession, updateSession,
  startSession, endSession, issuePrescription, getPrescriptions,
  getProviderAvailability, getTelehealthStats, getIceConfig,
} from './routes/telehealth.js';
import {
  emailAppointment, emailHomecare, emailTelehealth, emailFollowup, emailSend, getEmailLog, emailWebhook,
} from './routes/email.js';
import {
  sendSms, sendAppointmentSms, sendTelehealthSms, sendHomecareSms,
  sendWhatsApp, sendWhatsAppAppointment, notifyStatus,
} from './routes/notify.js';
import { servePage } from './pages.js';

const router = new Router();

// Health
router.get('/api/health', async (_, env) => json(await health(env)));

// Stats / Dashboard
router.get('/api/stats', (_, env) => getStats(env));

// Branches
router.get('/api/branches', (req, env, ctx, p, url) => json({ success: true, branches: getBranches() }));
router.get('/api/branches/([^/]+)', (req, env, ctx, p) => {
  const b = getBranch(p[0]);
  return b ? json({ success: true, branch: b }) : json({ success: false, message: 'Branch not found' }, 404);
});

// Patients
router.get('/api/patients', (req, env, ctx, p, url) => getPatients(req, env, ctx, p, url));
router.get('/api/patients/([^/]+)', (req, env, ctx, p) => getPatient(req, env, ctx, p));
router.post('/api/patients', (req, env) => createPatient(req, env));
router.patch('/api/patients/([^/]+)', (req, env, ctx, p) => updatePatient(req, env, ctx, p));

// Providers
router.get('/api/providers', async (req, env, ctx, p, url) => {
  if (!url) url = new URL(req.url);
  const branch = url?.searchParams?.get('branch') || '';
  const dept = url?.searchParams?.get('department') || '';
  let list = await getProviders(env);
  if (branch) {
    const b = branch.toLowerCase();
    const branchAliases = {
      riyadh: 'r001', r001: 'r001',
      madinah: 'm001', madina: 'm001', medina: 'm001', m001: 'm001',
      khamis: 'k001', khamis_mushayt: 'k001', khamis_mushait: 'k001', k001: 'k001',
      jazan: 'j001', jizan: 'j001', j001: 'j001',
      unaizah: 'u001', unayzah: 'u001', u001: 'u001',
    };
    const norm = branchAliases[b.replace(/[\s-]+/g, '_')] || b;
    list = list.filter(p => {
      const pb = String(p.branch || '').toLowerCase().replace(/[\s-]+/g, '_');
      const pid = String(p.branch_id || '').toLowerCase();
      return pb === b || pid === b || (branchAliases[pb] || pid) === norm;
    });
  }
  if (dept) list = list.filter(p => (p.department === dept || p.department_id === dept));
  return json({ success: true, providers: list, total: list.length });
});
router.get('/api/providers/([^/]+)', async (req, env, ctx, p) => {
  const prov = await getProvider(p[0], env);
  return prov ? json({ success: true, provider: prov }) : json({ success: false, message: 'Provider not found' }, 404);
});

// Appointments
router.get('/api/appointments', (req, env, ctx, p, url) => getAppointments(req, env, ctx, p, url));
router.get('/api/appointments/([^/]+)', (req, env, ctx, p) => getAppointment(req, env, ctx, p));
router.post('/api/appointments', (req, env) => createAppointment(req, env));
router.patch('/api/appointments/([^/]+)', (req, env, ctx, p) => updateAppointment(req, env, ctx, p));
router.delete('/api/appointments/([^/]+)', (req, env, ctx, p) => cancelAppointment(req, env, ctx, p));

// Claims
router.get('/api/claims', (req, env, ctx, p, url) => getClaims(req, env, ctx, p, url));
router.get('/api/claims/([^/]+)', (req, env, ctx, p) => getClaim(req, env, ctx, p));
router.post('/api/claims', (req, env) => createClaim(req, env));
router.post('/api/claims/([^/]+)/submit', (req, env, ctx, p) => submitClaimToNPHIES(req, env, ctx, p));
router.get('/api/claims/([^/]+)/nphies-status', (req, env, ctx, p) => getClaimNPHIESStatus(req, env, ctx, p));

// Eligibility
router.post('/api/eligibility/check', (req, env) => checkEligibility(req, env));
router.post('/api/eligibility/verify', (req, env) => verifyInsurance(req, env));
router.get('/api/eligibility/history/([^/]+)', (req, env, ctx, p) => getEligibilityHistory(req, env, ctx, p));

// NPHIES X12 endpoints
router.post('/api/nphies/270', (req, env) => submit270(req, env));
router.post('/api/nphies/278', (req, env) => submit278(req, env));
router.post('/api/nphies/837', (req, env) => submit837(req, env));
router.get('/api/nphies/276/([^/]+)', (req, env, ctx, p) => getClaimStatus276(req, env, ctx, p));
router.post('/api/nphies/835', (req, env) => receive835(req, env));

// FHIR R4
router.get('/api/fhir/Patient/([^/]+)', (req, env, ctx, p) => getFHIRPatient(req, env, ctx, p));
router.get('/api/fhir/Patient', (req, env, ctx, p, url) => searchFHIRPatients(req, env, ctx, p, url));
router.get('/api/fhir/Practitioner/([^/]+)', (req, env, ctx, p) => getFHIRPractitioner(req, env, ctx, p));
router.get('/api/fhir/Appointment/([^/]+)', (req, env, ctx, p) => getFHIRAppointment(req, env, ctx, p));
router.get('/api/fhir/Claim/([^/]+)', (req, env, ctx, p) => getFHIRClaim(req, env, ctx, p));
router.get('/api/fhir/Coverage/([^/]+)', (req, env, ctx, p) => getFHIRCoverage(req, env, ctx, p));

// AI Chat (BasmaGuist Medical)
router.post('/api/chat', (req, env) => handleChat(req, env));

// RCM — Revenue Cycle Management
router.get('/api/rcm/health',                              () => rcmHealth());
router.get('/api/rcm/batch/([^/]+)',                        (req, env, ctx, p) => getRcmBatch(req, env, ctx, p));
router.post('/api/rcm/validate/price',                      (req) => validatePrice(req));
router.post('/api/rcm/validate/duplicate',                  (req) => validateDuplicate(req));
router.post('/api/rcm/validate/pbm',                        (req) => validatePbm(req));
router.post('/api/rcm/validate',                            (req) => validateAll(req));
router.post('/api/rcm/appeal/generate',                     (req) => generateAppeal(req));
router.get('/api/rcm/dashboard/([^/]+)',                    (req, env, ctx, p) => getRcmDashboard(req, env, ctx, p));
router.get('/api/rcm/claims/rejected',                      (req, env, ctx, p, url) => getRejectedClaims(req, env, ctx, p, url));
router.post('/api/rcm/claims/([^/]+)/appeal',               (req, env, ctx, p) => markAppeal(req, env, ctx, p));
router.post('/api/rcm/claims/([^/]+)/resubmit',             (req, env, ctx, p) => markResubmit(req, env, ctx, p));


// Voice Routes (ElevenLabs TTS Proxy for Basma Agent)
router.post('/api/voice/speak', (req, env) => handleVoiceSpeak(req, env));
router.post('/api/voice/chat', (req, env) => handleVoiceChat(req, env));
router.get('/api/voice/voices', () => handleVoiceVoices());
// Voice OPTIONS handled in voice handler itself

// AI Search (AutoRAG brainsait-ai-search)
router.get('/api/search', (req, env) => handleSearch(req, env));
router.post('/api/search', (req, env) => handleSearch(req, env));

// Home Care — رعاية منزلية
router.post('/api/homecare/visits',                     (req, env) => createVisit(req, env));
router.get('/api/homecare/visits',                      (req, env) => listVisits(req, env));
router.get('/api/homecare/visits/([^/]+)',               (req, env, ctx, p) => getVisit(req, env, ctx, p));
router.patch('/api/homecare/visits/([^/]+)',             (req, env, ctx, p) => updateVisit(req, env, ctx, p));
router.post('/api/homecare/visits/([^/]+)/vitals',       (req, env, ctx, p) => recordVitals(req, env, ctx, p));
router.get('/api/homecare/nurses',                      (req, env) => listNurses(req, env));
router.post('/api/homecare/nurses',                     (req, env) => createNurse(req, env));
router.get('/api/homecare/nurses/([^/]+)/schedule',     (req, env, ctx, p) => getNurseSchedule(req, env, ctx, p));
router.get('/api/homecare/stats',                       (_, env) => getHomecareStats(_, env));

// Telehealth — استشارات عن بُعد
router.post('/api/telehealth/sessions',                              (req, env) => createSession(req, env));
router.get('/api/telehealth/sessions',                               (req, env) => listSessions(req, env));
router.get('/api/telehealth/sessions/([^/]+)',                        (req, env, ctx, p) => getSession(req, env, ctx, p));
router.patch('/api/telehealth/sessions/([^/]+)',                      (req, env, ctx, p) => updateSession(req, env, ctx, p));
router.post('/api/telehealth/sessions/([^/]+)/start',                 (req, env, ctx, p) => startSession(req, env, ctx, p));
router.post('/api/telehealth/sessions/([^/]+)/end',                   (req, env, ctx, p) => endSession(req, env, ctx, p));
router.post('/api/telehealth/sessions/([^/]+)/prescriptions',         (req, env, ctx, p) => issuePrescription(req, env, ctx, p));
router.get('/api/telehealth/sessions/([^/]+)/prescriptions',          (req, env, ctx, p) => getPrescriptions(req, env, ctx, p));
router.get('/api/telehealth/providers/([^/]+)/availability',          (req, env, ctx, p) => getProviderAvailability(req, env, ctx, p));
router.get('/api/telehealth/stats',                                   (_, env) => getTelehealthStats(_, env));
router.get('/api/telehealth/ice-servers',                              (req, env) => getIceConfig(req, env));

// Email — البريد الإلكتروني
router.post('/api/email/appointment', (req, env) => emailAppointment(req, env));
router.post('/api/email/homecare',    (req, env) => emailHomecare(req, env));
router.post('/api/email/telehealth',  (req, env) => emailTelehealth(req, env));
router.post('/api/email/followup',    (req, env) => emailFollowup(req, env));
router.post('/api/email/send',        (req, env) => emailSend(req, env));
router.get('/api/email/log',          (req, env) => getEmailLog(req, env));
router.post('/api/email/webhook',     (req, env) => emailWebhook(req, env));

// SMS — الرسائل النصية (Twilio)
router.post('/api/sms/send',         (req, env) => sendSms(req, env));
router.post('/api/sms/appointment',  (req, env) => sendAppointmentSms(req, env));
router.post('/api/sms/telehealth',   (req, env) => sendTelehealthSms(req, env));
router.post('/api/sms/homecare',     (req, env) => sendHomecareSms(req, env));

// WhatsApp — واتساب (WhatsApp Business API)
router.post('/api/whatsapp/send',        (req, env) => sendWhatsApp(req, env));
router.post('/api/whatsapp/appointment', (req, env) => sendWhatsAppAppointment(req, env));

// Notify status
router.get('/api/notify/status', (req, env) => notifyStatus(req, env));


// SPA — serve for everything else
router.get('/', (req, env, ctx, p, url) => servePage(req));
router.get('/(.*)', (req, env, ctx, p, url) => servePage(req));

// Worker handler
export default {
  async fetch(request, env, ctx) {
    // CORS preflight — validate origin
    if (request.method === 'OPTIONS') return handleCors(request);

    const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
    if (!rateLimit(ip)) {
      return new Response(JSON.stringify({ error: 'Rate limit exceeded' }), {
        status: 429, headers: { 'Content-Type': 'application/json', 'Retry-After': '60', ...SECURITY_HEADERS },
      });
    }

    // Resolve the allowed origin for this request
    const origin = getAllowedOrigin(request);

    try {
      const response = await router.match(request, env, ctx);
      // Attach validated CORS headers to all responses
      if (response && typeof response === 'object' && response.headers) {
        const safeCors = {
          'Access-Control-Allow-Origin': origin || 'https://hnh.brainsait.org',
          'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          'Vary': 'Origin',
        };
        for (const [k, v] of Object.entries(safeCors)) {
          if (!response.headers.has(k)) response.headers.set(k, v);
        }
      }
      return response;
    } catch (e) {
      console.error('Handler error:', e);
      return new Response(JSON.stringify({ error: 'Internal server error' }), {
        status: 500, headers: { 'Content-Type': 'application/json', ...SECURITY_HEADERS },
      });
    }
  },
  async scheduled(event, env, ctx) {
    console.log("Cron trigger started at:", event.cron);
    
    // 1. RCM / NPHIES Automation: Auto-fetch claim statuses (276) and Remittance Advices (835)
    try {
      if (env.NPHIES_MIRROR_URL) {
        console.log("Fetching NPHIES batch status updates...");
        const rcmUpdate = await fetch(env.NPHIES_MIRROR_URL + "/api/rcm/sync-remittance", {
          method: "POST",
          headers: { "Authorization": "Bearer " + (env.API_KEY || "") }
        });
        if(rcmUpdate.ok) console.log("RCM Sync successful.");
      }
    } catch(e) {
      console.error("NPHIES Cron error:", e);
    }
    
    // 2. Patient Automation: Send appointment reminders
    try {
      if (env.HIS_DB) {
        console.log("Checking for tomorrow's appointments to send reminders...");
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const tStr = tomorrow.toISOString().split('T')[0];
        
        const q = "SELECT * FROM appointments WHERE appointment_date = ? AND status = 'scheduled'";
        const apps = await env.HIS_DB.prepare(q).bind(tStr).all();
        if (apps && apps.results) {
           console.log("Found " + apps.results.length + " appointments to remind.");
           for(const app of apps.results) {
             console.log("Sending reminder to patient: " + app.patient_id + " for clinic: " + app.clinic_name);
           }
        }
      }
    } catch(e) {
      console.error("Patient Reminder Cron error:", e);
    }
  },
};
