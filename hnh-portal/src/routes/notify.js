/**
 * Notify Routes — HNH Portal v9.2.0
 * BrainSAIT Healthcare OS — الإشعارات
 *
 * Routes:
 *   POST /api/sms/send             → Send SMS via Twilio
 *   POST /api/sms/appointment      → Appointment reminder SMS
 *   POST /api/whatsapp/send        → Send WhatsApp message
 *   POST /api/whatsapp/appointment → Appointment reminder via WhatsApp
 *   GET  /api/notify/status        → Check notification service status
 *
 * Backend: Twilio REST API + WhatsApp Business API
 */

import { json } from '../utils/response.js';

// ── Constants ───────────────────────────────────────────────────────────────

const TWILIO_API = 'https://api.twilio.com/2010-04-01';
const WHATSAPP_API = 'https://graph.facebook.com/v20.0';

// ── Helpers ─────────────────────────────────────────────────────────────────

function normalizeSaudiPhone(phone) {
  const digits = String(phone || '').replace(/\D/g, '');
  if (digits.startsWith('966')) return '+' + digits;
  if (digits.startsWith('05') || digits.startsWith('5')) {
    const local = digits.replace(/^0/, '');
    return '+966' + local;
  }
  return '+' + digits;
}

function twilioAuth(env) {
  const sid = env.TWILIO_ACCOUNT_SID || '';
  const token = env.TWILIO_AUTH_TOKEN || '';
  if (!sid || !token) return null;
  return 'Basic ' + btoa(sid + ':' + token);
}

// ── Arabic / English SMS templates ──────────────────────────────────────────

function appointmentSmsAr({ patientName, date, time, clinic, phone }) {
  return `مرحباً ${patientName}،\nتذكير بموعدك في مستشفيات الحياة الوطنية\nالتاريخ: ${date}\nالوقت: ${time}\nالعيادة: ${clinic}\nللاستفسار: 920000094`;
}

function appointmentSmsEn({ patientName, date, time, clinic }) {
  return `Hello ${patientName},\nReminder: Your appointment at Hayat National Hospital\nDate: ${date} | Time: ${time}\nClinic: ${clinic}\nInquiries: 920000094`;
}

function telehealthSmsAr({ patientName, date, time, joinUrl }) {
  return `مرحباً ${patientName}،\nموعد استشارتك الطبية الافتراضية\nالتاريخ: ${date} | الوقت: ${time}\nرابط الجلسة: ${joinUrl}\nمستشفيات الحياة الوطنية`;
}

function homecareSmsAr({ patientName, date, time, address }) {
  return `مرحباً ${patientName}،\nتم تأكيد زيارة الرعاية المنزلية\nالتاريخ: ${date} | الوقت: ${time}\nالعنوان: ${address}\nمستشفيات الحياة الوطنية`;
}

// ── Core Twilio SMS sender ───────────────────────────────────────────────────

async function sendTwilioSms(env, to, body) {
  const auth = twilioAuth(env);
  if (!auth) {
    return { success: false, error: 'Twilio not configured', code: 'NOT_CONFIGURED' };
  }

  const from = env.TWILIO_PHONE_NUMBER || '';
  if (!from) {
    return { success: false, error: 'TWILIO_PHONE_NUMBER not set', code: 'NO_SENDER' };
  }

  const accountSid = env.TWILIO_ACCOUNT_SID;
  const params = new URLSearchParams({ To: normalizeSaudiPhone(to), From: from, Body: body });

  try {
    const res = await fetch(`${TWILIO_API}/Accounts/${accountSid}/Messages.json`, {
      method: 'POST',
      headers: {
        'Authorization': auth,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
      signal: AbortSignal.timeout(10000),
    });

    const data = await res.json();
    if (res.ok && data.sid) {
      return { success: true, sid: data.sid, status: data.status, to: data.to };
    }
    return { success: false, error: data.message || 'Twilio error', code: data.code };
  } catch (e) {
    return { success: false, error: e.message || 'Network error', code: 'NETWORK_ERROR' };
  }
}

// ── Core WhatsApp sender ────────────────────────────────────────────────────

async function sendWhatsAppText(env, to, text) {
  const token = env.WHATSAPP_TOKEN || '';
  const phoneId = env.WHATSAPP_PHONE_ID || '';

  if (!token || !phoneId) {
    return { success: false, error: 'WhatsApp not configured', code: 'NOT_CONFIGURED' };
  }

  const payload = {
    messaging_product: 'whatsapp',
    recipient_type: 'individual',
    to: normalizeSaudiPhone(to),
    type: 'text',
    text: { preview_url: false, body: text },
  };

  try {
    const res = await fetch(`${WHATSAPP_API}/${phoneId}/messages`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(10000),
    });

    const data = await res.json();
    if (res.ok && data.messages?.[0]?.id) {
      return { success: true, message_id: data.messages[0].id, to: normalizeSaudiPhone(to) };
    }
    return { success: false, error: data.error?.message || 'WhatsApp error', code: data.error?.code };
  } catch (e) {
    return { success: false, error: e.message || 'Network error', code: 'NETWORK_ERROR' };
  }
}

// ── Route Handlers ───────────────────────────────────────────────────────────

/**
 * POST /api/sms/send
 * Body: { to, message }
 */
export async function sendSms(request, env) {
  try {
    const { to, message } = await request.json();
    if (!to || !message) {
      return json({ success: false, error: 'to and message are required' }, 400);
    }
    const result = await sendTwilioSms(env, to, message);
    return json(result, result.success ? 200 : 502);
  } catch (e) {
    return json({ success: false, error: e.message }, 500);
  }
}

/**
 * POST /api/sms/appointment
 * Body: { to, patientName, date, time, clinic, lang? }
 */
export async function sendAppointmentSms(request, env) {
  try {
    const body = await request.json();
    const { to, patientName, date, time, clinic } = body;
    if (!to || !patientName || !date) {
      return json({ success: false, error: 'to, patientName, date are required' }, 400);
    }
    const lang = body.lang || 'ar';
    const message = lang === 'en'
      ? appointmentSmsEn({ patientName, date, time: time || '10:00', clinic: clinic || 'العيادة' })
      : appointmentSmsAr({ patientName, date, time: time || '10:00', clinic: clinic || 'العيادة' });

    const result = await sendTwilioSms(env, to, message);
    return json({ ...result, template: 'appointment', lang }, result.success ? 200 : 502);
  } catch (e) {
    return json({ success: false, error: e.message }, 500);
  }
}

/**
 * POST /api/sms/telehealth
 * Body: { to, patientName, date, time, joinUrl, lang? }
 */
export async function sendTelehealthSms(request, env) {
  try {
    const body = await request.json();
    const { to, patientName, date, time, joinUrl } = body;
    if (!to || !patientName || !date) {
      return json({ success: false, error: 'to, patientName, date are required' }, 400);
    }
    const message = telehealthSmsAr({ patientName, date, time: time || '10:00', joinUrl: joinUrl || 'https://hnh.brainsait.org' });
    const result = await sendTwilioSms(env, to, message);
    return json({ ...result, template: 'telehealth' }, result.success ? 200 : 502);
  } catch (e) {
    return json({ success: false, error: e.message }, 500);
  }
}

/**
 * POST /api/sms/homecare
 * Body: { to, patientName, date, time, address }
 */
export async function sendHomecareSms(request, env) {
  try {
    const body = await request.json();
    const { to, patientName, date, time, address } = body;
    if (!to || !patientName || !date || !address) {
      return json({ success: false, error: 'to, patientName, date, address are required' }, 400);
    }
    const message = homecareSmsAr({ patientName, date, time: time || '10:00', address });
    const result = await sendTwilioSms(env, to, message);
    return json({ ...result, template: 'homecare' }, result.success ? 200 : 502);
  } catch (e) {
    return json({ success: false, error: e.message }, 500);
  }
}

/**
 * POST /api/whatsapp/send
 * Body: { to, message }
 */
export async function sendWhatsApp(request, env) {
  try {
    const { to, message } = await request.json();
    if (!to || !message) {
      return json({ success: false, error: 'to and message are required' }, 400);
    }
    const result = await sendWhatsAppText(env, to, message);
    return json(result, result.success ? 200 : 502);
  } catch (e) {
    return json({ success: false, error: e.message }, 500);
  }
}

/**
 * POST /api/whatsapp/appointment
 * Body: { to, patientName, date, time, clinic, lang? }
 */
export async function sendWhatsAppAppointment(request, env) {
  try {
    const body = await request.json();
    const { to, patientName, date, time, clinic } = body;
    if (!to || !patientName || !date) {
      return json({ success: false, error: 'to, patientName, date are required' }, 400);
    }
    const lang = body.lang || 'ar';
    const message = lang === 'en'
      ? appointmentSmsEn({ patientName, date, time: time || '10:00', clinic: clinic || 'Clinic' })
      : appointmentSmsAr({ patientName, date, time: time || '10:00', clinic: clinic || 'العيادة' });

    const result = await sendWhatsAppText(env, to, message);
    return json({ ...result, template: 'appointment', channel: 'whatsapp', lang }, result.success ? 200 : 502);
  } catch (e) {
    return json({ success: false, error: e.message }, 500);
  }
}

/**
 * GET /api/notify/status
 */
export async function notifyStatus(request, env) {
  return json({
    success: true,
    sms: env.TWILIO_ACCOUNT_SID ? 'configured' : 'not_configured',
    whatsapp: env.WHATSAPP_TOKEN ? 'configured' : 'not_configured',
    email: env.SENDGRID_API_KEY || env.MAILLINC_URL ? 'configured' : 'not_configured',
    channels: ['sms', 'whatsapp', 'email'],
  });
}
