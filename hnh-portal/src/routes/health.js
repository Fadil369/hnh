async function checkIntegration(url, timeoutMs = 4000) {
  try {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeoutMs);
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(id);
    if (res.ok) return 'connected';
    return res.status >= 500 ? 'warning' : 'degraded';
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
  const [oracleStatus, nphiesStatus, claimlincStatus, bsmaStatus, sbsStatus, givcStatus] = await Promise.allSettled([
    checkIntegration('https://oracle-bridge.brainsait-fadil.workers.dev/health', 3000),
    checkIntegration('https://nphies-mirror.brainsait-fadil.workers.dev/health', 3000),
    checkIntegration('https://claimlinc-worker.fadil369.workers.dev/health', 3000),
    checkIntegration('https://bsma.elfadil.com/api/health', 3000),
    checkIntegration('https://sbs.elfadil.com/api/health', 3000),
    checkIntegration('https://givc.elfadil.com/api/health', 3000),
  ]);

  // Fetch NPHIES stats for BSMA ecosystem card
  let nphiesMirror = null;
  try {
    const nmRes = await fetch('https://nphies-mirror.brainsait-fadil.workers.dev/mirror/status', { signal: AbortSignal.timeout(4000) });
    if (nmRes.ok) {
      const nmData = await nmRes.json();
      nphiesMirror = { total_gss: nmData.total_gss || 81, total_pa: nmData.total_pa || 51297 };
    }
  } catch {}

  return {
    success: true,
    status: 'healthy',
    version: '9.0.0',
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
      bsma_portal: bsmaStatus.status === 'fulfilled' ? bsmaStatus.value : 'offline',
      sbs_portal: sbsStatus.status === 'fulfilled' ? sbsStatus.value : 'offline',
      givc_portal: givcStatus.status === 'fulfilled' ? givcStatus.value : 'offline',
    },
    oracle_tunnel: 'Oracle Cloud@Riyadh',
    nphies_mirror: nphiesMirror,
  };
}
