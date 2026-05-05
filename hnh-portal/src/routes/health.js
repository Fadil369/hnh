async function checkIntegration(url, timeoutMs = 4000, init = {}) {
  try {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeoutMs);
    const res = await fetch(url, { ...init, signal: controller.signal });
    clearTimeout(id);
    if (res.ok) return 'connected';
    return res.status >= 500 ? 'warning' : 'degraded';
  } catch {
    return 'offline';
  }
}

async function checkClaimLinc(env) {
  try {
    if (env.CLAIMLINC_SERVICE) {
      const res = await env.CLAIMLINC_SERVICE.fetch(new Request('https://claimlinc.internal/nphies/health'));
      return res.ok ? 'connected' : (res.status >= 500 ? 'warning' : 'degraded');
    }
    return await checkIntegration('https://api.brainsait.org/nphies/health', 3000);
  } catch {
    return 'offline';
  }
}

async function checkGivc(env) {
  try {
    if (env.GIVC_SERVICE) {
      const res = await env.GIVC_SERVICE.fetch(new Request('https://givc.internal/givc/health'));
      return res.ok ? 'connected' : (res.status >= 500 ? 'warning' : 'degraded');
    }
    return await checkIntegration(`${env.GIVC_URL || 'https://hnh.brainsait.org/givc'}/health`, 3000);
  } catch {
    return 'offline';
  }
}

// Extended service checks
async function checkHomecare(env) {
  return await checkIntegration('https://homecare.hayathospitals.com/health', 3000);
}

async function checkTelehealth(env) {
  return await checkIntegration('https://telehealth.brainsait.org/health', 3000);
}

async function checkMaillinc(env) {
  const base = env.MAILLINC_URL || 'https://maillinc.brainsait-fadil.workers.dev';
  return await checkIntegration(`${base}/health`, 3000);
}

async function checkOracle(env) {
  const base = env.ORACLE_BRIDGE_URL || 'https://oracle-bridge.brainsait.org';
  return await checkIntegration(`${base}/health`, 3000);
}

async function checkNPHIESMirror(env) {
  const base = env.NPHIES_MIRROR_URL || 'https://nphies-mirror.brainsait-fadil.workers.dev';
  return await checkIntegration(`${base}/health`, 3000);
}

async function checkAcademy(env) {
  return await checkIntegration('https://academy.hayathospitals.com/health', 3000);
}

// Configuration-only checks (no live ping needed)
async function checkTwilio(env) {
  return env.TWILIO_ACCOUNT_SID ? 'configured' : 'not_configured';
}

async function checkElevenLabs(env) {
  return env.ELEVENLABS_API_KEY ? 'configured' : 'not_configured';
}

async function checkDeepSeek(env) {
  return env.DEEPSEEK_API_KEY ? 'configured' : 'not_configured';
}

async function checkWhatsApp(env) {
  return env.WHATSAPP_TOKEN ? 'configured' : 'not_configured';
}

export async function health(env) {
  const stats = env.DB
    ? await env.DB.prepare(
        `SELECT
          (SELECT COUNT(*) FROM patients) as total_patients,
          (SELECT COUNT(*) FROM appointments WHERE date(appointment_date) = date('now')) as today_appointments,
          (SELECT COUNT(*) FROM providers) as total_providers,
          (SELECT COUNT(*) FROM claims) as total_claims,
          (SELECT COUNT(*) FROM claims WHERE status = 'pending') as pending_claims,
          (SELECT COUNT(*) FROM givc_doctors WHERE givc_status = 'active') as givc_network_count,
          (SELECT COUNT(*) FROM telehealth_sessions WHERE date(created_at) = date('now')) as today_telehealth,
          (SELECT COUNT(*) FROM homecare_visits WHERE date(created_at) = date('now')) as today_homecare`
      ).first()
    : {};

  const mirrorBase = env.NPHIES_MIRROR_URL || 'https://nphies-mirror.brainsait-fadil.workers.dev';

  // Check all services in parallel
  const [
    oracleStatus, nphiesStatus, claimlincStatus, basmaStatus, sbsStatus, givcStatus,
    homecareStatus, telehealthStatus, maillincStatus, academyStatus,
  ] = await Promise.allSettled([
    checkOracle(env),
    checkNPHIESMirror(env),
    checkClaimLinc(env),
    checkIntegration('https://bsma.elfadil.com/health', 3000),
    checkIntegration('https://sbs.elfadil.com/api/health', 3000),
    checkGivc(env),
    checkHomecare(env),
    checkTelehealth(env),
    checkMaillinc(env),
    checkAcademy(env),
  ]);

  // Fetch NPHIES mirror stats
  let nphiesMirror = null;
  try {
    const nmRes = await fetch(`${mirrorBase}/mirror/status`, { signal: AbortSignal.timeout(4000) });
    if (nmRes.ok) {
      const nmData = await nmRes.json();
      nphiesMirror = { total_gss: nmData.total_gss || 81, total_pa: nmData.total_pa || 51297 };
    }
  } catch {}

  // Telehealth stats by status
  let telehealthStats = null;
  if (env.DB) {
    try {
      telehealthStats = await env.DB.prepare(
        `SELECT status, COUNT(*) as count FROM telehealth_sessions GROUP BY status`
      ).all();
    } catch {}
  }

  // Homecare stats by status
  let homecareStats = null;
  if (env.DB) {
    try {
      homecareStats = await env.DB.prepare(
        `SELECT status, COUNT(*) as count FROM homecare_visits GROUP BY status`
      ).all();
    } catch {}
  }

  return {
    success: true,
    status: 'healthy',
    version: env.HUB_VERSION || '9.2.0',
    name: 'HNH Portal - BrainSAIT Healthcare OS',
    timestamp: new Date().toISOString(),
    database: env.DB ? 'connected' : 'unavailable',
    his_database: env.HIS_DB ? 'connected' : 'unavailable',
    basma_database: env.BASMA_DB ? 'connected' : 'unavailable',
    stats: stats || {},
    environment: env.NPHIES_ENVIRONMENT || 'sandbox',
    integrations: {
      // Core systems
      oracle_bridge: oracleStatus.status === 'fulfilled' ? oracleStatus.value : 'offline',
      nphies_mirror: nphiesStatus.status === 'fulfilled' ? nphiesStatus.value : 'offline',
      claimlinc: claimlincStatus.status === 'fulfilled' ? claimlincStatus.value : 'offline',
      basma_portal: basmaStatus.status === 'fulfilled' ? basmaStatus.value : 'offline',
      sbs_portal: sbsStatus.status === 'fulfilled' ? sbsStatus.value : 'offline',
      givc_portal: givcStatus.status === 'fulfilled'
        ? { status: givcStatus.value, network_count: stats?.givc_network_count ?? 0 }
        : { status: 'offline', network_count: 0 },
      // Digital health services
      homecare: homecareStatus.status === 'fulfilled' ? homecareStatus.value : 'offline',
      telehealth: telehealthStatus.status === 'fulfilled' ? telehealthStatus.value : 'offline',
      maillinc: maillincStatus.status === 'fulfilled' ? maillincStatus.value : 'offline',
      academy: academyStatus.status === 'fulfilled' ? academyStatus.value : 'offline',
      // AI & communication (config status only)
      elevenlabs: checkElevenLabs(env),
      deepseek: checkDeepSeek(env),
      twilio: checkTwilio(env),
      whatsapp: checkWhatsApp(env),
    },
    oracle_tunnel: 'Oracle Cloud@Riyadh',
    nphies_mirror: nphiesMirror,
    telehealth_stats: telehealthStats?.results || [],
    homecare_stats: homecareStats?.results || [],
    services: {
      basma_ai: 'Voice-activated multilingual AI assistant',
      givc: 'Revenue Cycle Management',
      nphies: 'National Health Insurance Exchange',
      oracle: 'Enterprise Cloud Infrastructure',
      sbs: 'Saudi Billing System',
      claimlinc: 'Claims Processing & Adjudication',
      homecare: 'Home Healthcare Visit Management',
      telehealth: 'Virtual Consultation Platform',
      maillinc: 'Transactional Email Service',
      academy: 'Healthcare Training & CME',
      sms: 'SMS Notifications (Twilio)',
      whatsapp: 'WhatsApp Business Notifications',
      voice: 'ElevenLabs Multilingual TTS',
      ai: 'DeepSeek + Llama AI Models',
    },
  };
}
