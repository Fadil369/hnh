/**
 * Email Routes — HNH Portal v9.1.0
 * BrainSAIT Healthcare OS — البريد الإلكتروني
 *
 * Routes:
 *   POST /api/email/appointment     → Appointment confirmation email
 *   POST /api/email/homecare        → Home care visit confirmation
 *   POST /api/email/telehealth      → Telehealth session link email
 *   POST /api/email/followup        → Post-visit follow-up email
 *   POST /api/email/send            → Generic send (subject + html)
 *   GET  /api/email/log             → Email send log
 *
 * Backend: MailLinc proxy at env.MAILLINC_URL
 */

import { json } from '../utils/response.js';

// ── Brand constants ────────────────────────────────────────────────────────

const BRAND = {
  name_ar: 'مستشفيات الحياة الوطنية',
  name_en: 'Hayat National Hospital',
  from: 'noreply@hnh.brainsait.org',
  from_name: 'HNH – مستشفيات الحياة',
  logo_url: 'https://hnh.brainsait.org/logo.png',
  primary: '#1a5276',
  accent: '#2980b9',
  website: 'https://hnh.brainsait.org',
  support_phone: '920000094',
  footer_ar: 'جميع الحقوق محفوظة © مستشفيات الحياة الوطنية',
};

// ── HTML email wrapper ─────────────────────────────────────────────────────

function wrapEmail(title, bodyHtml) {
  return `<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>${title}</title>
<style>
  body { margin:0; padding:0; background:#f4f6fb; font-family: 'Segoe UI', Arial, sans-serif; direction:rtl; }
  .wrap { max-width:600px; margin:32px auto; background:#fff; border-radius:12px; overflow:hidden;
          box-shadow:0 2px 12px rgba(0,0,0,.1); }
  .header { background:${BRAND.primary}; padding:28px 32px; text-align:center; }
  .header h1 { margin:0; color:#fff; font-size:22px; font-weight:700; }
  .header p  { margin:4px 0 0; color:#aed6f1; font-size:14px; }
  .body { padding:32px; }
  .card { background:#eaf4fb; border-right:4px solid ${BRAND.accent};
          border-radius:8px; padding:16px 20px; margin:16px 0; }
  .card .label { font-size:12px; color:#666; margin:0 0 2px; }
  .card .value { font-size:16px; color:${BRAND.primary}; font-weight:600; margin:0; }
  .btn { display:inline-block; background:${BRAND.accent}; color:#fff !important;
         text-decoration:none; padding:12px 28px; border-radius:8px; font-size:15px;
         font-weight:600; margin:20px 0; }
  .alert { background:#fef9e7; border-right:4px solid #f39c12; border-radius:8px;
           padding:12px 16px; margin:16px 0; font-size:14px; color:#7d6608; }
  .footer { background:#f4f6fb; padding:20px 32px; text-align:center; font-size:12px; color:#888; }
  h2 { color:${BRAND.primary}; font-size:18px; margin-top:0; }
  p  { color:#444; line-height:1.7; font-size:15px; }
  .divider { border:none; border-top:1px solid #eee; margin:20px 0; }
</style>
</head>
<body>
<div class="wrap">
  <div class="header">
    <h1>${BRAND.name_ar}</h1>
    <p>${BRAND.name_en}</p>
  </div>
  <div class="body">
    ${bodyHtml}
  </div>
  <div class="footer">
    <p>${BRAND.footer_ar}</p>
    <p>للاستفسار: <strong>${BRAND.support_phone}</strong> | <a href="${BRAND.website}" style="color:${BRAND.accent}">${BRAND.website}</a></p>
  </div>
</div>
</body>
</html>`;
}

// ── Email templates ────────────────────────────────────────────────────────

function templateAppointment(data) {
  const subject = `تأكيد موعدك – ${data.date} | ${BRAND.name_ar}`;
  const html = wrapEmail(subject, `
    <h2>تم تأكيد موعدك ✓</h2>
    <p>عزيزي/عزيزتي <strong>${data.patient_name || 'المريض'}</strong>،</p>
    <p>يسعدنا إبلاغك بتأكيد موعدك لدى ${BRAND.name_ar}.</p>
    <div class="card">
      <p class="label">التاريخ</p>
      <p class="value">${data.date}</p>
    </div>
    <div class="card">
      <p class="label">الوقت</p>
      <p class="value">${data.time}</p>
    </div>
    <div class="card">
      <p class="label">القسم / التخصص</p>
      <p class="value">${data.department || '—'}</p>
    </div>
    <div class="card">
      <p class="label">الفرع</p>
      <p class="value">${data.branch || 'الرياض'}</p>
    </div>
    ${data.provider ? `<div class="card"><p class="label">الطبيب</p><p class="value">${data.provider}</p></div>` : ''}
    <hr class="divider"/>
    <div class="alert">
      ⏰ يرجى الحضور قبل 15 دقيقة من موعدك مع إحضار الهوية الوطنية وبطاقة التأمين.
    </div>
    ${data.appointment_id ? `<p style="font-size:12px;color:#999">رقم الموعد: ${data.appointment_id}</p>` : ''}
  `);
  return { subject, html };
}

function templateHomecare(data) {
  const subject = `تأكيد زيارة الرعاية المنزلية – ${data.date} | ${BRAND.name_ar}`;
  const html = wrapEmail(subject, `
    <h2>تأكيد زيارة الرعاية المنزلية 🏠</h2>
    <p>عزيزي/عزيزتي <strong>${data.patient_name || 'المريض'}</strong>،</p>
    <p>تم جدولة زيارة الرعاية المنزلية لك وفق التفاصيل التالية:</p>
    <div class="card">
      <p class="label">تاريخ الزيارة</p>
      <p class="value">${data.date}</p>
    </div>
    ${data.time ? `<div class="card"><p class="label">الوقت المقدر</p><p class="value">${data.time}</p></div>` : ''}
    <div class="card">
      <p class="label">العنوان</p>
      <p class="value">${data.address}</p>
    </div>
    <div class="card">
      <p class="label">نوع الزيارة</p>
      <p class="value">${data.visit_type || 'روتينية'}</p>
    </div>
    ${data.nurse_name ? `<div class="card"><p class="label">الممرض/ة المسؤول/ة</p><p class="value">${data.nurse_name}</p></div>` : ''}
    <hr class="divider"/>
    <div class="alert">
      📞 في حال الحاجة لتغيير أو إلغاء الزيارة، يرجى التواصل معنا على الرقم ${BRAND.support_phone} قبل 3 ساعات على الأقل.
    </div>
    ${data.visit_id ? `<p style="font-size:12px;color:#999">رقم الزيارة: ${data.visit_id}</p>` : ''}
  `);
  return { subject, html };
}

function templateTelehealth(data) {
  const subject = `رابط جلسة الاستشارة عن بُعد – ${data.date} | ${BRAND.name_ar}`;
  const html = wrapEmail(subject, `
    <h2>جلسة الاستشارة الطبية عن بُعد 🎥</h2>
    <p>عزيزي/عزيزتي <strong>${data.patient_name || 'المريض'}</strong>،</p>
    <p>تم جدولة جلسة استشارتك الطبية عبر الفيديو. انضم في الوقت المحدد من خلال الرابط أدناه.</p>
    <div class="card">
      <p class="label">تاريخ الجلسة</p>
      <p class="value">${data.date}</p>
    </div>
    <div class="card">
      <p class="label">وقت الجلسة</p>
      <p class="value">${data.time}</p>
    </div>
    <div class="card">
      <p class="label">المدة</p>
      <p class="value">${data.duration || 30} دقيقة</p>
    </div>
    ${data.provider ? `<div class="card"><p class="label">الطبيب/ة</p><p class="value">${data.provider}</p></div>` : ''}
    <div style="text-align:center;margin:28px 0;">
      <a href="${data.join_url}" class="btn">📹 انضم للجلسة الآن</a>
    </div>
    <div class="card" style="direction:ltr;text-align:left">
      <p class="label" style="text-align:right">رمز الغرفة</p>
      <p class="value" style="font-family:monospace;letter-spacing:4px;font-size:20px;text-align:center">${data.room_code}</p>
    </div>
    <hr class="divider"/>
    <div class="alert">
      💡 تأكد من وجود كاميرا وميكروفون يعمل بشكل صحيح. يُنصح باستخدام متصفح Chrome أو Edge.
    </div>
    ${data.session_id ? `<p style="font-size:12px;color:#999">رقم الجلسة: ${data.session_id}</p>` : ''}
  `);
  return { subject, html };
}

function templateFollowup(data) {
  const subject = `متابعة بعد زيارتك – ${BRAND.name_ar}`;
  const html = wrapEmail(subject, `
    <h2>متابعة بعد زيارتك 💙</h2>
    <p>عزيزي/عزيزتي <strong>${data.patient_name || 'المريض'}</strong>،</p>
    <p>نتمنى لك الصحة والعافية. نتواصل معك للاطمئنان بعد زيارتك بتاريخ <strong>${data.visit_date}</strong>.</p>
    ${data.notes ? `<div class="card"><p class="label">ملاحظات الطبيب</p><p class="value">${data.notes}</p></div>` : ''}
    ${data.next_appointment ? `<div class="card"><p class="label">موعدك القادم</p><p class="value">${data.next_appointment}</p></div>` : ''}
    ${data.medications?.length ? `
    <h3 style="color:${BRAND.primary};font-size:16px;">الأدوية الموصوفة</h3>
    <ul style="padding-right:20px;color:#444;">
      ${data.medications.map(m => `<li><strong>${m.name}</strong> — ${m.dose || ''} ${m.frequency || ''}</li>`).join('')}
    </ul>` : ''}
    <hr class="divider"/>
    <div class="alert">
      🏥 في حال تدهور حالتك أو وجود أعراض جديدة، يرجى زيارة أقرب طوارئ أو الاتصال بـ <strong>997</strong>.
    </div>
    <div style="text-align:center;margin:20px 0;">
      <a href="${BRAND.website}" class="btn">احجز موعداً جديداً</a>
    </div>
  `);
  return { subject, html };
}

// ── Core send function ─────────────────────────────────────────────────────

async function sendEmail(env, to, subject, html, template, ref_id) {
  const maillincUrl = env.MAILLINC_URL || 'https://maillinc.brainsait-fadil.workers.dev';

  let status = 'pending';
  let error = null;

  try {
    const res = await fetch(`${maillincUrl}/email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(env.MAILLINC_API_KEY ? { 'X-API-Key': env.MAILLINC_API_KEY } : {}),
      },
      body: JSON.stringify({
        from: BRAND.from,
        from_name: BRAND.from_name,
        to,
        subject,
        html,
      }),
    });

    status = res.ok ? 'sent' : 'failed';
    if (!res.ok) error = `HTTP ${res.status}`;
  } catch (e) {
    status = 'failed';
    error = e.message;
  }

  // Log to D1
  try {
    await env.DB.prepare(
      `INSERT INTO email_log (recipient, subject, template, ref_id, status, error) VALUES (?, ?, ?, ?, ?, ?)`
    ).bind(to, subject, template || 'generic', ref_id || null, status, error).run();
  } catch (_) { /* log failure must not break response */ }

  return { status, error };
}

// ── Route handlers ─────────────────────────────────────────────────────────

export async function emailAppointment(req, env) {
  const data = await req.json().catch(() => ({}));
  if (!data.to || !data.date) return json({ success: false, message: 'to and date required' }, 400);
  const { subject, html } = templateAppointment(data);
  const result = await sendEmail(env, data.to, subject, html, 'appointment', data.appointment_id);
  return json({ success: result.status === 'sent', ...result });
}

export async function emailHomecare(req, env) {
  const data = await req.json().catch(() => ({}));
  if (!data.to || !data.date || !data.address) return json({ success: false, message: 'to, date, and address required' }, 400);
  const { subject, html } = templateHomecare(data);
  const result = await sendEmail(env, data.to, subject, html, 'homecare', data.visit_id);
  return json({ success: result.status === 'sent', ...result });
}

export async function emailTelehealth(req, env) {
  const data = await req.json().catch(() => ({}));
  if (!data.to || !data.join_url) return json({ success: false, message: 'to and join_url required' }, 400);
  const { subject, html } = templateTelehealth(data);
  const result = await sendEmail(env, data.to, subject, html, 'telehealth', data.session_id);
  return json({ success: result.status === 'sent', ...result });
}

export async function emailFollowup(req, env) {
  const data = await req.json().catch(() => ({}));
  if (!data.to || !data.visit_date) return json({ success: false, message: 'to and visit_date required' }, 400);
  const { subject, html } = templateFollowup(data);
  const result = await sendEmail(env, data.to, subject, html, 'followup', data.ref_id);
  return json({ success: result.status === 'sent', ...result });
}

export async function emailSend(req, env) {
  const data = await req.json().catch(() => ({}));
  if (!data.to || !data.subject || !data.html) {
    return json({ success: false, message: 'to, subject, and html required' }, 400);
  }
  const result = await sendEmail(env, data.to, data.subject, data.html, 'generic', data.ref_id);
  return json({ success: result.status === 'sent', ...result });
}

export async function getEmailLog(req, env) {
  const url = new URL(req.url);
  const limit  = Math.min(parseInt(url.searchParams.get('limit') || '50'), 200);
  const offset = parseInt(url.searchParams.get('offset') || '0');
  const status = url.searchParams.get('status') || '';

  let q = 'SELECT * FROM email_log';
  const binds = [];
  if (status) { q += ' WHERE status = ?'; binds.push(status); }
  q += ' ORDER BY id DESC LIMIT ? OFFSET ?';
  binds.push(limit, offset);

  const { results } = await env.DB.prepare(q).bind(...binds).all();
  return json({ success: true, emails: results || [], total: results?.length || 0 });
}

// ── POST /api/email/webhook — Inbound MailLinc delivery events ──────────

/**
 * Handles incoming webhook events from MailLinc:
 *   - delivery: Email successfully delivered
 *   - bounce: Hard or soft bounce
 *   - complaint: Recipient marked email as spam
 *   - open/click: Tracking events
 *
 * Authenticates via X-Webhook-Secret header (env.MAILLINC_WEBHOOK_SECRET).
 */
export async function emailWebhook(req, env) {
  // Verify webhook secret
  const secret = req.headers.get('X-Webhook-Secret') || req.headers.get('x-webhook-secret');
  if (env.MAILLINC_WEBHOOK_SECRET && secret !== env.MAILLINC_WEBHOOK_SECRET) {
    return json({ success: false, message: 'Unauthorized webhook' }, 401);
  }

  const body = await req.json().catch(() => ({}));
  const events = Array.isArray(body) ? body : (body.events || [body]);
  let processed = 0;

  for (const event of events) {
    const { type, recipient, message_id, timestamp, details } = event;
    if (!type || !recipient) continue;

    try {
      // Update email_log with delivery status
      const newStatus = type === 'delivery' ? 'delivered'
        : type === 'bounce' ? 'bounced'
        : type === 'complaint' ? 'complaint'
        : type === 'open' ? 'opened'
        : type === 'click' ? 'clicked'
        : type;

      await env.DB.prepare(
        `UPDATE email_log SET status = ?, webhook_event = ?, webhook_at = ?, error = ?
         WHERE recipient = ? AND status IN ('sent', 'delivered', 'opened')
         ORDER BY id DESC LIMIT 1`
      ).bind(
        newStatus,
        type,
        timestamp || new Date().toISOString(),
        type === 'bounce' ? (details?.bounce_type || 'unknown bounce') : null,
        recipient,
      ).run();

      processed++;
    } catch (e) {
      console.error('Webhook event processing error:', e?.message);
    }
  }

  return json({ success: true, processed, total: events.length });
}
