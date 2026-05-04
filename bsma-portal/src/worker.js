/**
 * BSMA Portal v3.0 — Enhanced Frontend Worker
 * 
 * Serves the BSMA AI Healthcare Assistant portal at bsma.elfadil.com
 * Backend proxies to HNH healthcare services, NPHIES, and Oracle.
 */
import bsmaHtml from './html.js';

// Security headers
const CORS = {
  'Access-Control-Allow-Origin': 'https://bsma.elfadil.com',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, X-Session-ID, X-Hospital, X-API-Key',
};

const SECURITY_HEADERS = {
  'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: blob:; connect-src 'self' https://bsma.elfadil.com https://hnh.brainsait.org https://api.brainsait.org https://voice.elfadil.com https://nphies-mirror.brainsait-fadil.workers.dev https://maillinc.brainsait-fadil.workers.dev; media-src 'self' blob:; frame-ancestors 'none'; form-action 'self'",
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'microphone=self, camera=(), geolocation=(), interest-cohort=()',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
  'X-XSS-Protection': '1; mode=block',
  'Cache-Control': 'no-cache, no-store, must-revalidate',
  ...CORS,
};

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;
    const method = request.method;

    // CORS preflight
    if (method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: CORS });
    }

    // Health & status
    if (path === '/health' || path === '/basma/status') {
      return new Response(JSON.stringify({
        service: 'BSMA Healthcare Portal',
        version: '3.0.0',
        status: 'healthy',
        timestamp: new Date().toISOString(),
        features: ['voice', 'chat', 'oracle', 'nphies', 'insights', 'eligibility', 'sms', 'call', 'whatsapp'],
        hospitals: ['riyadh', 'madinah', 'unaizah', 'khamis', 'jizan', 'abha'],
      }), {
        headers: { 'Content-Type': 'application/json', ...CORS },
      });
    }

    // === API PROXY: /basma/* routes (match old healthcare-gateway API) ===

    // /basma/chat → Voice Agent (DeepSeek via voice.elfadil.com)
    if (path === '/basma/chat' && method === 'POST') {
      try {
        const voiceAgentUrl = env.VOICE_AGENT_URL || 'https://voice.elfadil.com';
        const body = await request.json();
        const res = await fetch(`${voiceAgentUrl}/bsma/chat`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'X-Source': 'bsma-portal' },
          body: JSON.stringify(body),
          signal: AbortSignal.timeout(20000),
        });
        const data = await res.json();
        return new Response(JSON.stringify(data), {
          status: res.ok ? 200 : res.status,
          headers: { 'Content-Type': 'application/json', ...CORS, 'Cache-Control': 'no-cache' },
        });
      } catch (err) {
        return new Response(JSON.stringify({ error: true, message: 'Chat service error', detail: err.message }), {
          status: 503,
          headers: { 'Content-Type': 'application/json', ...CORS },
        });
      }
    }

    // /basma/tts → ElevenLabs TTS proxy
    if (path === '/basma/tts' && method === 'POST') {
      try {
        const { text, lang = 'ar' } = await request.json();
        const apiKey = env.ELEVENLABS_API_KEY || 'c1d91fafae6e5acfeae2366c3163e3a9';
        const voiceId = lang === 'ar' ? 'KxMRrXEjbJ6kZ93yT3fq' : 'EXAVITQu4vr4xnSDxMaL';
        const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}/stream`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'xi-api-key': apiKey,
          },
          body: JSON.stringify({
            text: text.slice(0, 400),
            model_id: lang === 'ar' ? 'eleven_multilingual_v2' : 'eleven_turbo_v2_5',
            voice_settings: { stability: 0.4, similarity_boost: 0.8, style: 0.25, speaker_boost: true },
          }),
          signal: AbortSignal.timeout(20000),
        });
        return new Response(res.body, {
          status: res.status,
          headers: { 'Content-Type': 'audio/mpeg', ...CORS, 'Cache-Control': 'no-cache' },
        });
      } catch (err) {
        return new Response(JSON.stringify({ error: true, message: 'TTS service error' }), {
          status: 503,
          headers: { 'Content-Type': 'application/json', ...CORS },
        });
      }
    }

    // /basma/network → ClaimLinc Network Summary
    if (path === '/basma/network') {
      try {
        const claimLincUrl = env.CLAIMLINC_URL || 'https://api.brainsait.org';
        const apiKey = env.CLAIMLINC_API_KEY || '';
        const res = await fetch(`${claimLincUrl}/nphies/network/summary`, {
          headers: { 'X-API-Key': apiKey },
          signal: AbortSignal.timeout(15000),
        });
        const data = res.ok ? await res.json() : { error: 'Network summary unavailable' };
        return new Response(JSON.stringify(data), {
          status: res.ok ? 200 : 502,
          headers: { 'Content-Type': 'application/json', ...CORS, 'Cache-Control': 'max-age=300' },
        });
      } catch (err) {
        return new Response(JSON.stringify({ error: true, message: 'Network service unavailable' }), {
          status: 503,
          headers: { 'Content-Type': 'application/json', ...CORS },
        });
      }
    }

    // /basma/mirror → NPHIES Mirror Status
    if (path === '/basma/mirror') {
      try {
        const mirrorUrl = env.NPHIES_MIRROR_URL || 'https://nphies-mirror.brainsait-fadil.workers.dev';
        const res = await fetch(`${mirrorUrl}/mirror/status`, { signal: AbortSignal.timeout(8000) });
        const data = res.ok ? await res.json() : { error: true, message: 'Mirror unavailable' };
        return new Response(JSON.stringify(data), {
          status: res.ok ? 200 : 502,
          headers: { 'Content-Type': 'application/json', ...CORS, 'Cache-Control': 'max-age=120' },
        });
      } catch (err) {
        return new Response(JSON.stringify({ error: true, message: 'NPHIES mirror timeout' }), {
          status: 504,
          headers: { 'Content-Type': 'application/json', ...CORS },
        });
      }
    }

    // /basma/session → Generate new session
    if (path === '/basma/session') {
      return new Response(JSON.stringify({
        session_id: crypto.randomUUID(),
        model: 'deepseek-chat',
        compliance: 'PDPL',
        version: '3.0.0',
      }), { headers: { 'Content-Type': 'application/json', ...CORS } });
    }

    // /basma/drugs → Drug search proxy (via voice agent)
    if (path.startsWith('/basma/drugs')) {
      try {
        const voiceAgentUrl = env.VOICE_AGENT_URL || 'https://voice.elfadil.com';
        const qs = url.search || '';
        const res = await fetch(`${voiceAgentUrl}${path}${qs}`, {
          signal: AbortSignal.timeout(10000),
        });
        const data = await res.json();
        return new Response(JSON.stringify(data), {
          headers: { 'Content-Type': 'application/json', ...CORS },
        });
      } catch (err) {
        return new Response(JSON.stringify({ error: true, message: 'Drug search unavailable' }), {
          status: 503,
          headers: { 'Content-Type': 'application/json', ...CORS },
        });
      }
    }

    // /basma/oracle → Oracle Health proxy
    if (path.startsWith('/basma/oracle')) {
      try {
        const voiceAgentUrl = env.VOICE_AGENT_URL || 'https://voice.elfadil.com';
        const opts = { method, headers: { 'Content-Type': 'application/json' } };
        if (method === 'POST') opts.body = await request.clone().text();
        const res = await fetch(`${voiceAgentUrl}${path}${url.search}`, {
          ...opts,
          signal: AbortSignal.timeout(15000),
        });
        const data = await res.json();
        return new Response(JSON.stringify(data), {
          headers: { 'Content-Type': 'application/json', ...CORS },
        });
      } catch (err) {
        return new Response(JSON.stringify({ error: true, message: 'Oracle service unavailable' }), {
          status: 503,
          headers: { 'Content-Type': 'application/json', ...CORS },
        });
      }
    }

    // /basma/rag/* → RAG (Retrieval Augmented Generation)
    if (path.startsWith('/basma/rag/') && method === 'POST') {
      try {
        const voiceAgentUrl = env.VOICE_AGENT_URL || 'https://voice.elfadil.com';
        const opts = { method, headers: { 'Content-Type': 'application/json' } };
        opts.body = await request.clone().text();
        const res = await fetch(`${voiceAgentUrl}${path}${url.search}`, {
          ...opts,
          signal: AbortSignal.timeout(15000),
        });
        const data = await res.json();
        return new Response(JSON.stringify(data), {
          headers: { 'Content-Type': 'application/json', ...CORS },
        });
      } catch (err) {
        return new Response(JSON.stringify({ error: true, message: 'RAG service unavailable' }), {
          status: 503,
          headers: { 'Content-Type': 'application/json', ...CORS },
        });
      }
    }

    // /basma/crm → Patient CRM data
    if (path === '/basma/crm') {
      try {
        // Proxy to HNH backend patient list
        const res = await fetch(`${env.HNH_BACKEND || 'https://hnh.brainsait.org'}/api/patients`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json', 'X-Source': 'bsma-portal' },
          signal: AbortSignal.timeout(10000),
        });
        const patients = res.ok ? await res.json() : [];
        
        // Also try claims from HNH
        let claims = [];
        try {
          const cRes = await fetch(`${env.HNH_BACKEND || 'https://hnh.brainsait.org'}/api/claims`, {
            headers: { 'Content-Type': 'application/json', 'X-Source': 'bsma-portal' },
            signal: AbortSignal.timeout(5000),
          });
          if (cRes.ok) claims = await cRes.json();
        } catch {}

        return new Response(JSON.stringify({ visitors: patients.results || [], appointments: claims.results || [], segments: [{ id: 's1', name: 'All Patients', color: '#0ea5e9' }] }), {
          headers: { 'Content-Type': 'application/json', ...CORS },
        });
      } catch (err) {
        return new Response(JSON.stringify({ visitors: [], appointments: [], error: err.message }), {
          status: 200,
          headers: { 'Content-Type': 'application/json', ...CORS },
        });
      }
    }

    // /basma/moh → Ministry of Health proxy
    if (path.startsWith('/basma/moh')) {
      try {
        const voiceAgentUrl = env.VOICE_AGENT_URL || 'https://voice.elfadil.com';
        const opts = { method, headers: { 'Content-Type': 'application/json' } };
        if (method === 'POST') opts.body = await request.clone().text();
        const res = await fetch(`${voiceAgentUrl}${path}${url.search}`, {
          ...opts,
          signal: AbortSignal.timeout(10000),
        });
        const data = await res.json();
        return new Response(JSON.stringify(data), {
          headers: { 'Content-Type': 'application/json', ...CORS },
        });
      } catch (err) {
        return new Response(JSON.stringify({ error: true, message: 'MOH service unavailable' }), {
          status: 503,
          headers: { 'Content-Type': 'application/json', ...CORS },
        });
      }
    }

    // /basma/hospitals → Hospital list
    if (path === '/basma/hospitals') {
      return new Response(JSON.stringify({
        hospitals: [
          { id: 'riyadh', name_ar: 'الرياض', name_en: 'Riyadh', city: 'Riyadh' },
          { id: 'madinah', name_ar: 'المدينة المنورة', name_en: 'Madinah', city: 'Madinah' },
          { id: 'unaizah', name_ar: 'عنيزة', name_en: 'Unaizah', city: 'Unaizah' },
          { id: 'khamis', name_ar: 'خميس مشيط', name_en: 'Khamis Mushait', city: 'Khamis Mushait' },
          { id: 'jizan', name_ar: 'جازان', name_en: 'Jizan', city: 'Jizan' },
          { id: 'abha', name_ar: 'أبها', name_en: 'Abha', city: 'Abha' },
        ],
      }), { headers: { 'Content-Type': 'application/json', ...CORS, 'Cache-Control': 'max-age=3600' } });
    }

    // === /basma/riyadh-live → NPHIES Riyadh GSS from KV cache (pushed by Pi every 30min) ===
    if (path === '/basma/riyadh-live' && method === 'GET') {
      try {
        const cached = env.BSMA_CACHE ? await env.BSMA_CACHE.get('riyadh-gss') : null;
        if (cached) {
          return new Response(cached, { headers: { 'Content-Type': 'application/json', ...CORS, 'X-Cache': 'HIT' } });
        }
        return new Response(JSON.stringify({ ok: false, error: 'Cache miss — sync pending' }), {
          status: 503, headers: { 'Content-Type': 'application/json', ...CORS, 'X-Cache': 'MISS' },
        });
      } catch (err) {
        return new Response(JSON.stringify({ ok: false, error: err.message }), {
          status: 502, headers: { 'Content-Type': 'application/json', ...CORS },
        });
      }
    }

    // === /comms/whatsapp-template → Twilio ContentSid template sender ===
    if (path === '/comms/whatsapp-template' && method === 'POST') {
      try {
        const body = await request.json();
        const { to, content_sid, variables } = body;
        if (!to || !content_sid) return new Response(JSON.stringify({ error: 'to and content_sid required' }), { status: 400, headers: { 'Content-Type': 'application/json', ...CORS } });
        const phone = to.startsWith('+') ? to : '+966' + to.replace(/^0/, '');
        const TWILIO_SID = env.TWILIO_ACCOUNT_SID;
        const TWILIO_TOKEN = env.TWILIO_AUTH_TOKEN;
        const FROM = 'whatsapp:+14155238886';
        const form = new URLSearchParams({
          To: 'whatsapp:' + phone,
          From: FROM,
          ContentSid: content_sid,
          ContentVariables: JSON.stringify(variables || {}),
        });
        const r = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${TWILIO_SID}/Messages.json`, {
          method: 'POST',
          headers: {
            'Authorization': 'Basic ' + btoa(TWILIO_SID + ':' + TWILIO_TOKEN),
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: form.toString(),
          signal: AbortSignal.timeout(15000),
        });
        const data = await r.json();
        return new Response(JSON.stringify({ success: !!data.sid, sid: data.sid, status: data.status, to: phone }), {
          headers: { 'Content-Type': 'application/json', ...CORS },
        });
      } catch (err) {
        return new Response(JSON.stringify({ error: true, message: err.message }), { status: 502, headers: { 'Content-Type': 'application/json', ...CORS } });
      }
    }


    // === /comms/* → MailLinc Communication Proxy ===
    if (path.startsWith('/comms/')) {
      try {
        const maillincUrl = env.MAILLINC_URL || 'https://maillinc.brainsait-fadil.workers.dev';
        const maillincPath = path.replace('/comms', '');
        const res = await fetch(`${maillincUrl}${maillincPath}${url.search}`, {
          method,
          headers: {
            'Content-Type': 'application/json',
            'X-Source': 'bsma-portal',
            ...(env.MAILLINC_API_KEY ? { 'X-API-Key': env.MAILLINC_API_KEY } : {}),
          },
          body: method === 'POST' ? await request.clone().text() : undefined,
          signal: AbortSignal.timeout(15000),
        });
        const data = await res.text();
        return new Response(data, {
          status: res.status,
          headers: { 'Content-Type': res.headers.get('Content-Type') || 'application/json', ...CORS },
        });
      } catch (err) {
        return new Response(JSON.stringify({ error: true, message: 'MailLinc unavailable', detail: err.message }), {
          status: 502,
          headers: { 'Content-Type': 'application/json', ...CORS },
        });
      }
    }


    // === /api/* → HNH Backend Proxy ===
    if (path.startsWith('/api/')) {
      try {
        const backendResponse = await fetch(`${env.HNH_BACKEND || 'https://hnh.brainsait.org'}${path}${url.search}`, {
          method: method,
          headers: {
            'Content-Type': 'application/json',
            'X-Source': 'bsma-portal',
            ...(method === 'POST' ? { 'Content-Type': 'application/json' } : {}),
          },
          body: method === 'POST' ? await request.clone().text() : undefined,
          signal: AbortSignal.timeout(10000),
        });
        const contentType = backendResponse.headers.get('Content-Type') || 'application/json';
        const responseData = await backendResponse.text();
        return new Response(responseData, {
          status: backendResponse.status,
          headers: { 'Content-Type': contentType, ...CORS, 'Cache-Control': 'no-cache' },
        });
      } catch (err) {
        return new Response(JSON.stringify({ error: true, message: 'HNH backend unavailable' }), {
          status: 502,
          headers: { 'Content-Type': 'application/json', ...CORS },
        });
      }
    }

    // === SPA: Serve BSMA v3.0 HTML ===
    return new Response(bsmaHtml, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        ...SECURITY_HEADERS,
      },
    });
  },
};
