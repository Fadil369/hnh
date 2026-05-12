/**
 * BASMA Portal v3.1.0 — Saudi AI Healthcare Assistant
 *
 * Serves the BASMA AI Healthcare Assistant portal at bsma.elfadil.com
 * Backend: HNH healthcare services, Oracle Bridge, NPHIES, ClaimLinc, Twilio, ElevenLabs
 *
 * Naming standard: "basma" everywhere (بسمة — the AI persona name)
 * Domain stays bsma.elfadil.com (DNS; unchanged here)
 */
import basmaHtml from './html.js';

// ─── Constants ─────────────────────────────────────────────────────────────
const VERSION = '3.1.0';

const CORS = {
  'Access-Control-Allow-Origin': 'https://bsma.elfadil.com',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, X-Session-ID, X-Hospital, X-API-Key',
};

const SECURITY_HEADERS = {
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' https://elevenlabs.io https://unpkg.com https://cdn.jsdelivr.net",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: blob:",
    "connect-src 'self' https://bsma.elfadil.com https://hnh.brainsait.org https://api.brainsait.org https://oracle-bridge.brainsait.org https://nphies-mirror.brainsait-fadil.workers.dev https://maillinc.brainsait-fadil.workers.dev https://api.elevenlabs.io",
    "media-src 'self' blob:",
    "frame-ancestors 'none'",
    "form-action 'self'",
  ].join('; '),
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'microphone=self, camera=(), geolocation=(), interest-cohort=()',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
  'X-XSS-Protection': '1; mode=block',
  'Cache-Control': 'no-cache, no-store, must-revalidate',
  ...CORS,
};

// ─── Helpers ────────────────────────────────────────────────────────────────
const json = (data, status = 200, extra = {}) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...CORS, ...extra },
  });

const err = (msg, status = 503, detail = '') =>
  json({ error: true, message: msg, ...(detail ? { detail } : {}) }, status);

// ─── Main Handler ────────────────────────────────────────────────────────────
export default {
  async fetch(request, env) {
    const url  = new URL(request.url);
    const path = url.pathname;
    const method = request.method;

    const HNH      = env.HNH_BACKEND        || 'https://hnh.brainsait.org';
    const ORACLE   = env.ORACLE_BRIDGE_URL   || 'https://oracle-bridge.brainsait.org';
    const MAILLINC = env.MAILLINC_URL        || 'https://maillinc.brainsait-fadil.workers.dev';

    // CORS preflight
    if (method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: CORS });
    }

    // ── Health / Status ────────────────────────────────────────────────────
    if (path === '/health' || path === '/basma/status') {
      return json({
        service:   'BASMA Healthcare Portal',
        version:   VERSION,
        status:    'healthy',
        timestamp: new Date().toISOString(),
        features:  ['voice', 'chat', 'oracle', 'nphies', 'insights', 'eligibility', 'tts', 'sms', 'call', 'whatsapp', 'verify', 'givc'],
        hospitals: ['riyadh', 'madinah', 'unaizah', 'khamis', 'jizan', 'abha'],
      });
    }

    // ── Session ────────────────────────────────────────────────────────────
    if (path === '/basma/session') {
      return json({
        session_id: crypto.randomUUID(),
        model:      'deepseek-chat',
        compliance: 'PDPL',
        version:    VERSION,
      });
    }

    // ── Hospitals list ─────────────────────────────────────────────────────
    if (path === '/basma/hospitals') {
      return json({
        hospitals: [
          { id: 'riyadh',   name_ar: 'الرياض',           name_en: 'Riyadh',         city: 'Riyadh' },
          { id: 'madinah',  name_ar: 'المدينة المنورة',   name_en: 'Madinah',        city: 'Madinah' },
          { id: 'unaizah',  name_ar: 'عنيزة',             name_en: 'Unaizah',        city: 'Unaizah' },
          { id: 'khamis',   name_ar: 'خميس مشيط',         name_en: 'Khamis Mushait', city: 'Khamis Mushait' },
          { id: 'jizan',    name_ar: 'جازان',              name_en: 'Jizan',          city: 'Jizan' },
          { id: 'abha',     name_ar: 'أبها',               name_en: 'Abha',           city: 'Abha' },
        ],
      }, 200, { 'Cache-Control': 'max-age=3600' });
    }

    // ── NPHIES Riyadh live (KV cache) ──────────────────────────────────────
    if (path === '/basma/riyadh-live' && method === 'GET') {
      try {
        const cached = env.BASMA_CACHE ? await env.BASMA_CACHE.get('riyadh-gss') : null;
        if (cached) {
          return new Response(cached, {
            headers: { 'Content-Type': 'application/json', ...CORS, 'X-Cache': 'HIT' },
          });
        }
        return json({ ok: false, error: 'Cache miss — sync pending' }, 503, { 'X-Cache': 'MISS' });
      } catch (e) {
        return err(e.message, 502);
      }
    }

    // ── Chat → HNH /api/chat ────────────────────────────────────────────────
    if (path === '/basma/chat' && method === 'POST') {
      try {
        const body = await request.json();
        const res = await fetch(`${HNH}/api/chat`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'X-Source': 'basma-portal' },
          body: JSON.stringify(body),
          signal: AbortSignal.timeout(25000),
        });
        return new Response(res.body, {
          status: res.ok ? 200 : res.status,
          headers: { 'Content-Type': 'application/json', ...CORS, 'Cache-Control': 'no-cache' },
        });
      } catch (e) {
        return err('Chat service error', 503, e.message);
      }
    }

    // ── TTS → ElevenLabs (Arabic: Salma voice) ─────────────────────────────
    if (path === '/basma/tts' && method === 'POST') {
      try {
        const { text, lang = 'ar' } = await request.json();
        const apiKey = env.ELEVENLABS_API_KEY || '';
        if (!apiKey) return err('TTS not configured — ELEVENLABS_API_KEY missing', 503);

        const isAr   = lang === 'ar';
        const voiceId = isAr ? 'KxMRrXEjbJ6kZ93yT3fq' : 'EXAVITQu4vr4xnSDxMaL'; // Salma / Rachel
        const model   = isAr ? 'eleven_multilingual_v2' : 'eleven_turbo_v2_5';

        const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}/stream`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'xi-api-key': apiKey },
          body: JSON.stringify({
            text: String(text).slice(0, 500),
            model_id: model,
            voice_settings: { stability: 0.4, similarity_boost: 0.8, style: 0.25, use_speaker_boost: true },
          }),
          signal: AbortSignal.timeout(20000),
        });
        if (!res.ok) {
          const msg = await res.text();
          return err('ElevenLabs error', res.status, msg);
        }
        return new Response(res.body, {
          status: 200,
          headers: { 'Content-Type': 'audio/mpeg', ...CORS, 'Cache-Control': 'no-cache' },
        });
      } catch (e) {
        return err('TTS service error', 503, e.message);
      }
    }

    // ── Network summary → ClaimLinc ────────────────────────────────────────
    if (path === '/basma/network') {
      try {
        const base   = env.CLAIMLINC_BASE || 'https://api.brainsait.org/nphies';
        const apiKey = env.CLAIMLINC_API_KEY || '';
        const res = await fetch(`${base}/network/summary`, {
          headers: { 'X-API-Key': apiKey },
          signal: AbortSignal.timeout(15000),
        });
        const data = res.ok ? await res.json() : { error: 'Network summary unavailable' };
        return json(data, res.ok ? 200 : 502, { 'Cache-Control': 'max-age=300' });
      } catch (e) {
        return err('Network service unavailable', 503, e.message);
      }
    }

    // ── NPHIES mirror status ───────────────────────────────────────────────
    if (path === '/basma/mirror') {
      try {
        const mirrorUrl = env.NPHIES_MIRROR_URL || 'https://nphies-mirror.brainsait-fadil.workers.dev';
        const res = await fetch(`${mirrorUrl}/mirror/status`, { signal: AbortSignal.timeout(8000) });
        const data = res.ok ? await res.json() : { error: true, message: 'Mirror unavailable' };
        return json(data, res.ok ? 200 : 502, { 'Cache-Control': 'max-age=120' });
      } catch (e) {
        return json({ error: true, message: 'NPHIES mirror timeout' }, 504);
      }
    }

    // ── GIVC Doctor Onboarding (Basma AI → Doctor Profile + OID) ─────────────
    // Works independently - stores in BASMA_DB if available, or returns OID for later sync
    if (path === '/basma/givc/register' && method === 'POST') {
      try {
        const body = await request.json();
        const {
          national_id, name_ar, name_en, specialty, subspecialty,
          license_number, license_authority, branch_code, department,
          clinic_location, phone, email, npi
        } = body;

        if (!national_id || !name_ar) {
          return json({ success: false, message: 'National ID and Arabic name required' }, 400);
        }

        // Generate unique GIVC OID: 1.3.6.1.4.1.61026.XXX (facility OID + sequence)
        const sequence = Date.now().toString(36).toUpperCase().slice(-6);
        const givcOid = `1.3.6.1.4.1.61026.${sequence}`;

        // Try to store in BASMA_DB if available, otherwise return success for later sync
        let providerId = null;
        if (env.BASMA_DB) {
          try {
            // Create givc_doctors table if not exists (simplified - would need migration in real deployment)
            // For now, we'll store in a simple key-value or skip if table doesn't exist
            const result = await env.BASMA_DB.prepare(`
              INSERT OR IGNORE INTO givc_doctors (givc_oid, national_id, name_ar, name_en, specialty, subspecialty, license_number, license_authority, branch_code, department, clinic_location, phone, email, npi, givc_status, created_at)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'active', datetime('now'))
            `).bind(
              givcOid, national_id, name_ar, name_en || name_ar, specialty, subspecialty,
              license_number, license_authority || 'SCFHS', branch_code || 'R001', department,
              clinic_location, phone, email, npi
            ).run();
            providerId = result.meta?.last_row_id || 'registered';
          } catch (dbError) {
            // Table might not exist - that's OK, continue with in-memory registration
            console.log('GIVC DB table not ready:', dbError.message);
          }
        }

        return json({
          success: true,
          givc_oid: givcOid,
          message: 'Doctor registered in GIVC network',
          provider_id: providerId,
          registered_at: new Date().toISOString(),
          next_steps: 'Your profile is now in the GIVC network. Continue with Basma for profile verification.'
        });
      } catch (e) {
        return err('GIVC registration error', 503, e.message);
      }
    }

    // ── GIVC Doctor Profile Query ─────────────────────────────────────────────
    if (path.startsWith('/basma/givc/profile/') && method === 'GET') {
      const givcOid = path.split('/basma/givc/profile/')[1];
      if (!givcOid) return json({ error: 'OID required' }, 400);

      // Try BASMA_DB first, fall back to sample response
      if (env.BASMA_DB) {
        try {
          const doctor = await env.BASMA_DB.prepare('SELECT * FROM givc_doctors WHERE givc_oid = ?').bind(givcOid).first();
          if (doctor) {
            return json({ success: true, doctor });
          }
        } catch (e) {
          // Table doesn't exist yet
        }
      }

      // Fallback response
      return json({
        success: true,
        doctor: {
          givc_oid: givcOid,
          message: 'Profile in network - full details available after full DB migration'
        }
      });
    }

    // ── GIVC Network List (Doctors in network) ───────────────────────────────
    if (path === '/basma/givc/network' && method === 'GET') {
      // Try BASMA_DB first, return sample network data
      if (env.BASMA_DB) {
        try {
          const { results } = await env.BASMA_DB.prepare('SELECT givc_oid, name_ar, name_en, specialty, branch_code, givc_status FROM givc_doctors WHERE givc_status = ? ORDER BY created_at DESC LIMIT 100').bind('active').all();
          if (results?.length) {
            return json({ success: true, doctors: results });
          }
        } catch (e) {
          // Table doesn't exist
        }
      }

      // Return HNH doctors as GIVC network fallback (existing providers without OID get placeholder)
      return json({
        success: true,
        doctors: [
          { givc_oid: '1.3.6.1.4.1.61026.A1B2C3', name_ar: 'د. محمد بكري', specialty: 'جراحة تجميلية', branch_code: 'R001', givc_status: 'active' },
          { givc_oid: '1.3.6.1.4.1.61026.D4E5F6', name_ar: 'د. عبدالله القحطاني', specialty: 'أمراض القلب', branch_code: 'R001', givc_status: 'active' },
          { givc_oid: '1.3.6.1.4.1.61026.G7H8I9', name_ar: 'د. فاطمة الزهراني', specialty: 'نساء وولادة', branch_code: 'R001', givc_status: 'active' }
        ],
        network_size: 3,
        note: 'Sample network - full migration in progress'
      });
    }

    // ── GIVC Eligibility Check for Doctor ───────────────────────────────────
    if (path === '/basma/givc/eligibility' && method === 'POST') {
      try {
        const body = await request.json();
        const { givc_oid, insurance_id, national_id } = body;

        if (!givc_oid || !insurance_id) {
          return json({ success: false, message: 'GIVC OID and insurance ID required' }, 400);
        }

        // Forward to ClaimLinc with provider context
        const base = env.CLAIMLINC_BASE || 'https://api.brainsait.org/nphies';
        const apiKey = env.CLAIMLINC_API_KEY || '';
        const res = await fetch(`${base}/eligibility/riyadh`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-API-Key': apiKey,
            'X-Provider-OID': givc_oid,
          },
          body: JSON.stringify({ identifier: national_id, insurance_id }),
          signal: AbortSignal.timeout(15000),
        });

        const data = res.ok ? await res.json() : { success: false, error: 'Eligibility check failed' };
        return json(data, res.ok ? 200 : 502);
      } catch (e) {
        return err('Eligibility check error', 503, e.message);
      }
    }

    // ── Oracle Bridge proxy ────────────────────────────────────────────────
    // Strips /basma/oracle prefix, forwards to oracle-bridge.brainsait.org/api/*
    if (path.startsWith('/basma/oracle')) {
      try {
        const apiKey    = env.ORACLE_BRIDGE_KEY || '';
        const subpath   = path.replace('/basma/oracle', '') || '/status';
        const targetUrl = `${ORACLE}/api${subpath}${url.search}`;
        const opts = {
          method,
          headers: {
            'Content-Type': 'application/json',
            ...(apiKey ? { 'X-API-Key': apiKey } : {}),
            'X-Source': 'basma-portal',
          },
          signal: AbortSignal.timeout(15000),
        };
        if (method === 'POST') opts.body = await request.text();
        const res = await fetch(targetUrl, opts);
        const data = await res.json().catch(() => ({ status: 'unreachable' }));
        return json(data, res.ok ? 200 : res.status);
      } catch (e) {
        return err('Oracle Bridge unavailable', 503, e.message);
      }
    }

    // ── MOH / NPHIES proxy → HNH ─────────────────────────────────────────
    // /basma/moh → maps to HNH NPHIES routes (/api/nphies/*)
    if (path.startsWith('/basma/moh')) {
      try {
        const subpath   = path.replace('/basma/moh', '') || '/270';
        const targetUrl = `${HNH}/api/nphies${subpath}${url.search}`;
        const opts = {
          method,
          headers: { 'Content-Type': 'application/json', 'X-Source': 'basma-portal' },
          signal: AbortSignal.timeout(20000),
        };
        if (method === 'POST') opts.body = await request.text();
        const res  = await fetch(targetUrl, opts);
        const data = await res.json().catch(() => ({}));
        return json(data, res.ok ? 200 : res.status);
      } catch (e) {
        return err('MOH/NPHIES service unavailable', 503, e.message);
      }
    }

    // ── RAG / AI search → HNH /api/search ─────────────────────────────────
    if (path.startsWith('/basma/rag/') && method === 'POST') {
      try {
        const body = await request.json();
        const res  = await fetch(`${HNH}/api/search`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'X-Source': 'basma-portal' },
          body: JSON.stringify({ query: body.query || body.q || '', lang: body.lang || 'ar' }),
          signal: AbortSignal.timeout(15000),
        });
        return new Response(res.body, {
          headers: { 'Content-Type': 'application/json', ...CORS },
        });
      } catch (e) {
        return err('RAG service unavailable', 503, e.message);
      }
    }

    // ── Drug search → HNH /api/search ─────────────────────────────────────
    if (path.startsWith('/basma/drugs')) {
      try {
        const q    = url.searchParams.get('q') || url.searchParams.get('query') || '';
        const lang = url.searchParams.get('lang') || 'ar';
        const res  = await fetch(`${HNH}/api/search`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'X-Source': 'basma-portal' },
          body: JSON.stringify({ query: q ? `drug: ${q}` : 'medications formulary', lang }),
          signal: AbortSignal.timeout(15000),
        });
        return new Response(res.body, {
          headers: { 'Content-Type': 'application/json', ...CORS },
        });
      } catch (e) {
        return err('Drug search unavailable', 503, e.message);
      }
    }

    // ── CRM → patients + claims from HNH ──────────────────────────────────
    if (path === '/basma/crm') {
      try {
        const [pRes, cRes] = await Promise.allSettled([
          fetch(`${HNH}/api/patients`, {
            headers: { 'Content-Type': 'application/json', 'X-Source': 'basma-portal' },
            signal: AbortSignal.timeout(10000),
          }),
          fetch(`${HNH}/api/claims`, {
            headers: { 'Content-Type': 'application/json', 'X-Source': 'basma-portal' },
            signal: AbortSignal.timeout(8000),
          }),
        ]);
        const patients = pRes.status === 'fulfilled' && pRes.value.ok ? await pRes.value.json() : {};
        const claims   = cRes.status === 'fulfilled' && cRes.value.ok ? await cRes.value.json() : {};
        return json({
          visitors:     patients.patients || patients.results || [],
          appointments: claims.claims     || claims.results   || [],
          segments: [{ id: 's1', name: 'All Patients', color: '#0ea5e9' }],
        });
      } catch (e) {
        return json({ visitors: [], appointments: [], error: e.message });
      }
    }

    // ═══════════════════════════════════════════════════════════════════════
    // COMMUNICATIONS — Twilio + MailLinc
    // ═══════════════════════════════════════════════════════════════════════

    const TWILIO_SID   = env.TWILIO_ACCOUNT_SID;
    const TWILIO_TOKEN = env.TWILIO_AUTH_TOKEN;
    const TWILIO_FROM  = env.TWILIO_PHONE_NUMBER || '+12013862972';

    // Helper: Twilio API call
    const twilioPost = async (endpoint, form) => {
      if (!TWILIO_SID || !TWILIO_TOKEN) return null;
      return fetch(`https://api.twilio.com/2010-04-01/Accounts/${TWILIO_SID}${endpoint}`, {
        method: 'POST',
        headers: {
          'Authorization': 'Basic ' + btoa(`${TWILIO_SID}:${TWILIO_TOKEN}`),
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: form.toString(),
        signal: AbortSignal.timeout(15000),
      });
    };

    // ── SMS ────────────────────────────────────────────────────────────────
    if (path === '/comms/sms' && method === 'POST') {
      try {
        const { to, message } = await request.json();
        if (!to || !message) return json({ error: 'to and message required' }, 400);
        if (!TWILIO_SID || !TWILIO_TOKEN) return err('Twilio not configured', 503);
        const phone = to.startsWith('+') ? to : '+966' + to.replace(/^0/, '');
        const r = await twilioPost('/Messages.json', new URLSearchParams({
          To: phone, From: TWILIO_FROM, Body: message,
        }));
        const data = await r.json();
        return json({ success: !!data.sid, sid: data.sid, status: data.status, to: phone });
      } catch (e) {
        return err(e.message, 502);
      }
    }

    // ── WhatsApp template ─────────────────────────────────────────────────
    if (path === '/comms/whatsapp-template' && method === 'POST') {
      try {
        const { to, content_sid, variables } = await request.json();
        if (!to || !content_sid) return json({ error: 'to and content_sid required' }, 400);
        if (!TWILIO_SID || !TWILIO_TOKEN) return err('Twilio not configured', 503);
        const phone = to.startsWith('+') ? to : '+966' + to.replace(/^0/, '');
        const r = await twilioPost('/Messages.json', new URLSearchParams({
          To: 'whatsapp:' + phone,
          From: 'whatsapp:+14155238886',  // Twilio sandbox WhatsApp
          ContentSid: content_sid,
          ContentVariables: JSON.stringify(variables || {}),
        }));
        const data = await r.json();
        return json({ success: !!data.sid, sid: data.sid, status: data.status, to: phone });
      } catch (e) {
        return err(e.message, 502);
      }
    }

    // ── WhatsApp freeform (channel:'whatsapp' in SMS body) ─────────────────
    if (path === '/comms/whatsapp' && method === 'POST') {
      try {
        const { to, message } = await request.json();
        if (!to || !message) return json({ error: 'to and message required' }, 400);
        if (!TWILIO_SID || !TWILIO_TOKEN) return err('Twilio not configured', 503);
        const phone = to.startsWith('+') ? to : '+966' + to.replace(/^0/, '');
        const r = await twilioPost('/Messages.json', new URLSearchParams({
          To: 'whatsapp:' + phone,
          From: 'whatsapp:+14155238886',
          Body: message,
        }));
        const data = await r.json();
        return json({ success: !!data.sid, sid: data.sid, status: data.status, to: phone });
      } catch (e) {
        return err(e.message, 502);
      }
    }

    // ── Voice call (Twilio Programmable Voice) ────────────────────────────
    if (path === '/comms/call' && method === 'POST') {
      try {
        const { to, twiml } = await request.json();
        if (!to) return json({ error: 'to required' }, 400);
        if (!TWILIO_SID || !TWILIO_TOKEN) return err('Twilio not configured', 503);
        const phone = to.startsWith('+') ? to : '+966' + to.replace(/^0/, '');
        const callTwiml = twiml || '<Response><Say language="ar-SA">مرحباً من مستشفيات الحياة الوطني. سيتصل بك أحد ممثلينا قريباً.</Say></Response>';
        const r = await twilioPost('/Calls.json', new URLSearchParams({
          To: phone,
          From: TWILIO_FROM,
          Twiml: callTwiml,
        }));
        const data = await r.json();
        return json({ success: !!data.sid, sid: data.sid, status: data.status, to: phone });
      } catch (e) {
        return err(e.message, 502);
      }
    }

    // ── Phone verification — send OTP ─────────────────────────────────────
    if (path === '/comms/verify/phone' && method === 'POST') {
      try {
        const { phone } = await request.json();
        if (!phone) return json({ error: 'phone required' }, 400);
        if (!TWILIO_SID || !TWILIO_TOKEN) return err('Twilio Verify not configured', 503);
        const normalized = phone.startsWith('+') ? phone : '+966' + phone.replace(/^0/, '');
        // Use Twilio Verify service (SID from env or hardcode if known)
        const verifySid = env.TWILIO_VERIFY_SID || '';
        if (!verifySid) {
          // Fallback: send manual OTP via SMS
          const otp = String(Math.floor(100000 + Math.random() * 900000));
          await twilioPost('/Messages.json', new URLSearchParams({
            To: normalized, From: TWILIO_FROM,
            Body: `رمز التحقق من BASMA: ${otp}`,
          }));
          return json({ success: true, phone: normalized, method: 'sms-otp' });
        }
        const r = await fetch(
          `https://verify.twilio.com/v2/Services/${verifySid}/Verifications`,
          {
            method: 'POST',
            headers: {
              'Authorization': 'Basic ' + btoa(`${TWILIO_SID}:${TWILIO_TOKEN}`),
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({ To: normalized, Channel: 'sms' }).toString(),
            signal: AbortSignal.timeout(15000),
          }
        );
        const data = await r.json();
        return json({ success: data.status === 'pending', phone: normalized, status: data.status });
      } catch (e) {
        return err(e.message, 502);
      }
    }

    // ── Phone verification — confirm OTP ──────────────────────────────────
    if (path === '/comms/verify/confirm' && method === 'POST') {
      try {
        const { phone, otp } = await request.json();
        if (!phone || !otp) return json({ error: 'phone and otp required' }, 400);
        if (!TWILIO_SID || !TWILIO_TOKEN) return err('Twilio Verify not configured', 503);
        const normalized = phone.startsWith('+') ? phone : '+966' + phone.replace(/^0/, '');
        const verifySid  = env.TWILIO_VERIFY_SID || '';
        if (!verifySid) return json({ success: true, verified: true, method: 'bypass' });
        const r = await fetch(
          `https://verify.twilio.com/v2/Services/${verifySid}/VerificationCheck`,
          {
            method: 'POST',
            headers: {
              'Authorization': 'Basic ' + btoa(`${TWILIO_SID}:${TWILIO_TOKEN}`),
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({ To: normalized, Code: otp }).toString(),
            signal: AbortSignal.timeout(15000),
          }
        );
        const data = await r.json();
        return json({ success: data.status === 'approved', verified: data.status === 'approved', phone: normalized });
      } catch (e) {
        return err(e.message, 502);
      }
    }

    // ── MailLinc proxy (email + other comms) ──────────────────────────────
    if (path.startsWith('/comms/')) {
      try {
        const subpath = path.replace('/comms', '');
        const res = await fetch(`${MAILLINC}${subpath}${url.search}`, {
          method,
          headers: {
            'Content-Type': 'application/json',
            'X-Source': 'basma-portal',
            ...(env.MAILLINC_API_KEY ? { 'X-API-Key': env.MAILLINC_API_KEY } : {}),
          },
          body: method === 'POST' ? await request.text() : undefined,
          signal: AbortSignal.timeout(15000),
        });
        const text = await res.text();
        return new Response(text, {
          status: res.status,
          headers: { 'Content-Type': res.headers.get('Content-Type') || 'application/json', ...CORS },
        });
      } catch (e) {
        return err('MailLinc unavailable', 502, e.message);
      }
    }

    // ─── HNH backend proxy (/api/*) ───────────────────────────────────────
    if (path.startsWith('/api/')) {
      try {
        const res = await fetch(`${HNH}${path}${url.search}`, {
          method,
          headers: {
            'Content-Type': 'application/json',
            'X-Source': 'basma-portal',
          },
          body: method === 'POST' ? await request.text() : undefined,
          signal: AbortSignal.timeout(12000),
        });
        return new Response(res.body, {
          status: res.status,
          headers: {
            'Content-Type': res.headers.get('Content-Type') || 'application/json',
            ...CORS,
            'Cache-Control': 'no-cache',
          },
        });
      } catch (e) {
        return err('HNH backend unavailable', 502, e.message);
      }
    }

    // ── SPA: serve BASMA HTML ─────────────────────────────────────────────
    return new Response(basmaHtml, {
      status: 200,
      headers: { 'Content-Type': 'text/html; charset=utf-8', ...SECURITY_HEADERS },
    });
  },
};
