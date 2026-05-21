const ORACLE_PORTALS = [
    { key: 'riyadh', label: 'Riyadh', url: 'https://oracle-riyadh.brainsait.org' },
    { key: 'madinah', label: 'Madinah', url: 'https://oracle-madinah.brainsait.org' },
    { key: 'unaizah', label: 'Unaizah', url: 'https://oracle-unaizah.brainsait.org' },
    { key: 'khamis', label: 'Khamis Mushait', url: 'https://oracle-khamis.brainsait.org' },
    { key: 'jizan', label: 'Jizan', url: 'https://oracle-jizan.brainsait.org' },
    { key: 'abha', label: 'Abha', url: 'https://oracle-abha.brainsait.org' },
];

const SECURITY_HEADERS = {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
    'Cache-Control': 'no-cache, no-store, must-revalidate',
};

function json(data, status = 200) {
    return new Response(JSON.stringify(data), {
        status,
        headers: {
            'content-type': 'application/json; charset=utf-8',
            ...SECURITY_HEADERS,
            'access-control-allow-origin': 'https://portals.brainsait.org',
            'access-control-allow-methods': 'GET,OPTIONS',
            'access-control-allow-headers': 'Content-Type,Authorization',
        },
    });
}

async function check(url, timeoutMs = 5000, headers = {}) {
    const started = Date.now();
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
        const res = await fetch(url, { signal: controller.signal, headers });
        return {
            ok: res.ok,
            status: res.status,
            latency_ms: Date.now() - started,
        };
    } catch {
        return {
            ok: false,
            status: 0,
            latency_ms: Date.now() - started,
        };
    } finally {
        clearTimeout(timer);
    }
}

async function buildStatus(env) {
    const oracleHeaders = env.ORACLE_API_KEY
        ? { 'x-api-key': env.ORACLE_API_KEY }
        : {};

    const authProbePath = env.ORACLE_SESSION_PROBE_PATH || '/portal/session/health';
    const [hnh, oracleBridge, nphiesMirror, nphiesHealth, portals, oracleAuthProbe] = await Promise.all([
        check(`${env.HNH_API_URL || 'https://hnh.brainsait.org'}/api/health`, 5000),
        check(`${env.ORACLE_BRIDGE_URL || 'https://oracle-bridge.brainsait.org'}/health`, 5000, oracleHeaders),
        check(`${env.NPHIES_MIRROR_URL || 'https://nphies-mirror.brainsait-fadil.workers.dev'}/health`, 5000),
        check('https://api.brainsait.org/nphies/health', 5000, env.CLAIMLINC_KEY ? { 'x-api-key': env.CLAIMLINC_KEY } : {}),
        Promise.all(
            ORACLE_PORTALS.map(async (portal) => {
                const portalCheck = await check(`${portal.url}/prod/faces/Login.jsf`, 5000);
                return {
                    ...portal,
                    ...portalCheck,
                };
            })
        ),
        check(`${env.ORACLE_BRIDGE_URL || 'https://oracle-bridge.brainsait.org'}${authProbePath}`, 5000, oracleHeaders),
    ]);

    const onlinePortals = portals.filter((p) => p.ok).length;
    return {
        success: true,
        service: 'control-tower',
        version: env.PORTAL_VERSION || '1.0.0',
        timestamp: new Date().toISOString(),
        compliance_tags: ['HIPAA', 'NPHIES', 'PDPL'],
        endpoints: {
            hnh,
            oracle_bridge: oracleBridge,
            oracle_authenticated_probe: oracleAuthProbe,
            nphies_mirror: nphiesMirror,
            nphies_core: nphiesHealth,
        },
        oracle_portals: {
            total: portals.length,
            online: onlinePortals,
            offline: portals.length - onlinePortals,
            branches: portals,
        },
    };
}

function renderHtml(status) {
    const rows = status.oracle_portals.branches
        .map((p) => `<tr><td>${p.label}</td><td>${p.ok ? 'ONLINE' : 'OFFLINE'}</td><td>${p.status}</td><td>${p.latency_ms} ms</td></tr>`)
        .join('');

    return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>BrainSAIT Control Tower</title>
  <style>
    :root { --midnight:#1a365d; --medical:#2b6cb8; --teal:#0ea5e9; --bg:#f4f8fc; --text:#10233b; }
    body { margin:0; font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif; background:linear-gradient(145deg,#f4f8fc,#e8f1fb); color:var(--text); }
    .wrap { max-width:1100px; margin:0 auto; padding:28px 16px; }
    .hero { background:linear-gradient(135deg,var(--midnight),var(--medical)); color:white; border-radius:18px; padding:20px; }
    .hero h1 { margin:0 0 8px 0; font-size:28px; }
    .grid { margin-top:16px; display:grid; grid-template-columns:repeat(auto-fit,minmax(180px,1fr)); gap:12px; }
    .card { background:white; border:1px solid #d6e3f3; border-radius:14px; padding:14px; }
    .k { font-size:12px; color:#58759a; text-transform:uppercase; letter-spacing:.06em; }
    .v { margin-top:6px; font-size:20px; font-weight:700; color:var(--midnight); }
    table { width:100%; border-collapse:collapse; margin-top:14px; background:white; border-radius:14px; overflow:hidden; }
    th, td { padding:10px 12px; border-bottom:1px solid #e3edf8; text-align:left; font-size:14px; }
    th { background:#f0f6fd; color:#375a85; }
    .footer { margin-top:14px; font-size:12px; color:#5f7ea5; }
  </style>
</head>
<body>
  <div class="wrap">
    <div class="hero">
      <h1>Control Tower</h1>
      <div>portals.brainsait.org/control-tower</div>
      <div>Compliance: ${status.compliance_tags.join(' + ')}</div>
    </div>
    <div class="grid">
      <div class="card"><div class="k">HNH API</div><div class="v">${status.endpoints.hnh.ok ? 'ONLINE' : 'OFFLINE'}</div></div>
      <div class="card"><div class="k">Oracle Bridge</div><div class="v">${status.endpoints.oracle_bridge.ok ? 'ONLINE' : 'OFFLINE'}</div></div>
      <div class="card"><div class="k">NPHIES Mirror</div><div class="v">${status.endpoints.nphies_mirror.ok ? 'ONLINE' : 'OFFLINE'}</div></div>
      <div class="card"><div class="k">Oracle Portals</div><div class="v">${status.oracle_portals.online}/${status.oracle_portals.total}</div></div>
    </div>
    <table>
      <thead><tr><th>Branch</th><th>Status</th><th>HTTP</th><th>Latency</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
    <div class="footer">Updated: ${status.timestamp}</div>
  </div>
</body>
</html>`;
}

export default {
    async fetch(request, env) {
        const url = new URL(request.url);
        const path = url.pathname;

        if (request.method === 'OPTIONS') {
            return new Response(null, {
                status: 204,
                headers: {
                    'access-control-allow-origin': 'https://portals.brainsait.org',
                    'access-control-allow-methods': 'GET,OPTIONS',
                    'access-control-allow-headers': 'Content-Type,Authorization',
                },
            });
        }

        const isStatus = path === '/control-tower/status' || path === '/control-tower/api/status';
        const isRoot = path === '/control-tower' || path === '/control-tower/';

        if (!isStatus && !isRoot) {
            return json({ success: false, message: 'not_found' }, 404);
        }

        // Keep JSON API gated; allow dashboard HTML to render publicly.
        if (env.CONTROL_TOWER_KEY && isStatus) {
            const incoming = request.headers.get('x-control-tower-key') || '';
            if (!incoming || incoming !== env.CONTROL_TOWER_KEY) {
                return json({ success: false, message: 'unauthorized' }, 401);
            }
        }

        const status = await buildStatus(env);

        if (isStatus) return json(status);

        return new Response(renderHtml(status), {
            status: 200,
            headers: {
                'content-type': 'text/html; charset=utf-8',
                ...SECURITY_HEADERS,
            },
        });
    },
};
