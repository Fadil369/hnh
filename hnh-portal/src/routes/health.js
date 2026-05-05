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

export async function health(env) {
  const stats = env.DB
    ? await env.DB.prepare(
        `SELECT
          (SELECT COUNT(*) FROM patients) as total_patients,
          (SELECT COUNT(*) FROM appointments WHERE date(appointment_date) = date('now')) as today_appointments,
          (SELECT COUNT(*) FROM providers) as total_providers,
          (SELECT COUNT(*) FROM claims) as total_claims,
          (SELECT COUNT(*) FROM claims WHERE status = 'pending') as pending_claims`
      ).first()
    : {};

  // Check all integrations with lightweight health pings
  const oracleBase = env.ORACLE_BRIDGE_URL || 'https://oracle-bridge.brainsait.org';
  const mirrorBase = env.NPHIES_MIRROR_URL || 'https://nphies-mirror.brainsait-fadil.workers.dev';

  const [oracleStatus, nphiesStatus, claimlincStatus, basmaStatus, sbsStatus, givcStatus] = await Promise.allSettled([
    checkIntegration(`${oracleBase}/health`, 3000),
    checkIntegration(`${mirrorBase}/health`, 3000),
    checkClaimLinc(env),
    checkIntegration('https://bsma.elfadil.com/health', 3000),
    checkIntegration('https://sbs.elfadil.com/api/health', 3000),
    checkGivc(env),
  ]);

  // Fetch NPHIES stats for Basma ecosystem card
  let nphiesMirror = null;
  try {
    const mirrorBase = env.NPHIES_MIRROR_URL || 'https://nphies-mirror.brainsait-fadil.workers.dev';
    const nmRes = await fetch(`${mirrorBase}/mirror/status`, { signal: AbortSignal.timeout(4000) });
    if (nmRes.ok) {
      const nmData = await nmRes.json();
      nphiesMirror = { total_gss: nmData.total_gss || 81, total_pa: nmData.total_pa || 51297 };
    }
  } catch {}

  return {
    success: true,
    status: 'healthy',
    version: env.HUB_VERSION || '9.0.1',
    name: 'HNH Portal - BrainSAIT Healthcare OS',
    timestamp: new Date().toISOString(),
    database: env.DB ? 'connected' : 'unavailable',
    his_database: env.HIS_DB ? 'connected' : 'unavailable',
    stats: stats || {},
    environment: env.NPHIES_ENVIRONMENT || 'sandbox',
    integrations: {
      oracle_bridge: oracleStatus.status === 'fulfilled' ? oracleStatus.value : 'offline',
      nphies_mirror: nphiesStatus.status === 'fulfilled' ? nphiesStatus.value : 'offline',
      claimlinc: claimlincStatus.status === 'fulfilled' ? claimlincStatus.value : 'offline',
      basma_portal: basmaStatus.status === 'fulfilled' ? basmaStatus.value : 'offline',
      sbs_portal: sbsStatus.status === 'fulfilled' ? sbsStatus.value : 'offline',
      givc_portal: givcStatus.status === 'fulfilled' ? givcStatus.value : 'offline',
    },
    oracle_tunnel: 'Oracle Cloud@Riyadh',
    nphies_mirror: nphiesMirror,
  };
}
