import { Router } from './router.js';
import { json, err, handleCors } from './utils/response.js';
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
  if (branch) list = list.filter(p => (p.branch === branch || p.branch_id === branch));
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

// Voice Routes (ElevenLabs TTS Proxy for Basma Agent)
router.post('/api/voice/speak', (req, env) => handleVoiceSpeak(req, env));
router.post('/api/voice/chat', (req, env) => handleVoiceChat(req, env));
router.get('/api/voice/voices', () => handleVoiceVoices());
// Voice OPTIONS handled in voice handler itself

// SPA — serve for everything else
router.get('/', (req, env, ctx, p, url) => servePage(req));
router.get('/(.*)', (req, env, ctx, p, url) => servePage(req));

// Worker handler
export default {
  async fetch(request, env, ctx) {
    if (request.method === 'OPTIONS') return handleCors();
    const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
    if (!rateLimit(ip)) {
      return new Response(JSON.stringify({ error: 'Rate limit exceeded' }), {
        status: 429, headers: { 'Content-Type': 'application/json', 'Retry-After': '60', ...SECURITY_HEADERS },
      });
    }
    try {
      const response = await router.match(request, env, ctx);
      // Add CORS to all JSON responses
      if (response && typeof response === 'object' && response.headers) {
        const corsHeaders = {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        };
        for (const [k, v] of Object.entries(corsHeaders)) {
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
};
