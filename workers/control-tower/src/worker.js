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
            'access-control-allow-methods': 'GET,POST,OPTIONS',
            'access-control-allow-headers': 'Content-Type,Authorization,X-Control-Tower-Key',
        },
    });
}

function mustAuth(request, env) {
    if (!env.CONTROL_TOWER_KEY) return true;
    const incoming = request.headers.get('x-control-tower-key') || '';
    return incoming === env.CONTROL_TOWER_KEY;
}

function toBool(value) {
    return value === true || value === 'true' || value === '1';
}

function percentile(values, p) {
    if (!values.length) return 0;
    const sorted = [...values].sort((a, b) => a - b);
    const idx = Math.min(sorted.length - 1, Math.max(0, Math.ceil((p / 100) * sorted.length) - 1));
    return sorted[idx];
}

function flattenChecks(status) {
    const checks = [];
    for (const [name, value] of Object.entries(status.endpoints)) {
        checks.push({ scope: 'endpoint', name, ok: value.ok ? 1 : 0, status_code: value.status, latency_ms: value.latency_ms });
    }
    for (const branch of status.oracle_portals.branches) {
        checks.push({
            scope: 'oracle_portal',
            name: `oracle_${branch.key}`,
            ok: branch.ok ? 1 : 0,
            status_code: branch.status,
            latency_ms: branch.latency_ms,
        });
    }
    return checks;
}

function computeSlaSnapshot(status, slaTargetPct) {
    const checks = flattenChecks(status);
    const total = checks.length;
    const okCount = checks.reduce((sum, c) => sum + c.ok, 0);
    const availabilityPct = total > 0 ? Number(((okCount / total) * 100).toFixed(2)) : 0;
    const latencies = checks.map((c) => c.latency_ms);
    const p95Latency = percentile(latencies, 95);
    return {
        target_pct: slaTargetPct,
        availability_pct: availabilityPct,
        p95_latency_ms: p95Latency,
        breach: availabilityPct < slaTargetPct,
        total_checks: total,
        passing_checks: okCount,
        failing_checks: total - okCount,
    };
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

async function sendTelegram(env, message) {
    if (!env.TELEGRAM_BOT_TOKEN || !env.TELEGRAM_CHAT_ID) {
        return { sent: false, reason: 'not_configured' };
    }
    const url = `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`;
    const payload = {
        chat_id: env.TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'Markdown',
        disable_web_page_preview: true,
    };
    const res = await fetch(url, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
    });
    return { sent: res.ok, status: res.status };
}

async function sendOpenClaw(env, payload) {
    if (!env.OPENCLAW_AGENT_WEBHOOK_URL) {
        return { sent: false, reason: 'not_configured' };
    }
    const headers = { 'content-type': 'application/json' };
    if (env.OPENCLAW_AGENT_TOKEN) {
        headers.authorization = `Bearer ${env.OPENCLAW_AGENT_TOKEN}`;
    }
    const res = await fetch(env.OPENCLAW_AGENT_WEBHOOK_URL, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload),
    });
    return { sent: res.ok, status: res.status };
}

async function summarizeForGateway(env, mode, payload) {
    const model = env.AI_MODEL || '@cf/meta/llama-3.3-70b-instruct-fp8-fast';
    const fallback = {
        text: payload?.message || 'Control Tower update received.',
        model,
        via_ai: false,
    };

    if (!env.AI || typeof env.AI.run !== 'function') {
        return fallback;
    }

    const systemPrompt = mode === 'alert'
        ? 'You are an operations triage assistant. Write a concise Telegram-ready incident alert for healthcare operations. Keep it under 900 chars. Include severity, impacted systems, recommended next action, and preserve HIPAA+NPHIES+PDPL tags.'
        : 'You are an operations enablement assistant. Write a concise Telegram-ready training/update digest for engineering and operations. Keep it under 900 chars. Include what changed, why it matters, immediate actions, and preserve HIPAA+NPHIES+PDPL tags.';

    const userPrompt = JSON.stringify(payload).slice(0, 8000);
    try {
        const response = await env.AI.run(model, {
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: userPrompt },
            ],
            max_tokens: 500,
            temperature: 0.2,
        });

        const text = response?.response || response?.result?.response || response?.text || fallback.text;
        return {
            text,
            model,
            via_ai: true,
        };
    } catch {
        return fallback;
    }
}

async function openClawToTelegramGateway(env, mode, payload) {
    const ai = await summarizeForGateway(env, mode, payload);
    const enrichedPayload = {
        ...payload,
        gateway: {
            source: 'control-tower-v2',
            mode,
            ai_model: ai.model,
            ai_summary: ai.text,
            via_ai: ai.via_ai,
            timestamp: new Date().toISOString(),
        },
    };

    const [openclaw, telegram] = await Promise.all([
        sendOpenClaw(env, enrichedPayload),
        sendTelegram(env, ai.text),
    ]);

    return {
        mode,
        ai,
        channels: {
            openclaw,
            telegram,
        },
    };
}

async function buildStatus(env) {
    const oracleHeaders = env.ORACLE_API_KEY ? { 'x-api-key': env.ORACLE_API_KEY } : {};
    const authProbePath = env.ORACLE_SESSION_PROBE_PATH || '/portal/session/health';
    const [hnh, oracleBridge, nphiesMirror, nphiesHealth, portals, oracleAuthProbe] = await Promise.all([
        check(`${env.HNH_API_URL || 'https://hnh.brainsait.org'}/api/health`, 5000),
        check(`${env.ORACLE_BRIDGE_URL || 'https://oracle-bridge.brainsait.org'}/health`, 5000, oracleHeaders),
        check(`${env.NPHIES_MIRROR_URL || 'https://nphies-mirror.brainsait-fadil.workers.dev'}/health`, 5000),
        check('https://api.brainsait.org/nphies/health', 5000, env.CLAIMLINC_KEY ? { 'x-api-key': env.CLAIMLINC_KEY } : {}),
        Promise.all(
            ORACLE_PORTALS.map(async (portal) => {
                const portalCheck = await check(`${portal.url}/prod/faces/Login.jsf`, 5000);
                return { ...portal, ...portalCheck };
            })
        ),
        check(`${env.ORACLE_BRIDGE_URL || 'https://oracle-bridge.brainsait.org'}${authProbePath}`, 5000, oracleHeaders),
    ]);

    const onlinePortals = portals.filter((p) => p.ok).length;
    return {
        success: true,
        service: 'control-tower',
        version: env.PORTAL_VERSION || '2.0.0',
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

async function persistSnapshot(env, status, sla) {
    if (!env.CT_DB) return null;

    const runId = crypto.randomUUID();
    await env.CT_DB.prepare(
        `INSERT INTO control_tower_runs (
            id, recorded_at, version, availability_pct, p95_latency_ms, sla_target_pct, breach,
            oracle_online, oracle_total, notes
        ) VALUES (?, datetime('now'), ?, ?, ?, ?, ?, ?, ?, ?)`
    ).bind(
        runId,
        status.version,
        sla.availability_pct,
        sla.p95_latency_ms,
        sla.target_pct,
        sla.breach ? 1 : 0,
        status.oracle_portals.online,
        status.oracle_portals.total,
        'Control Tower v2 snapshot'
    ).run();

    const checks = flattenChecks(status);
    const checkStatements = checks.map((c) => env.CT_DB.prepare(
        `INSERT INTO control_tower_checks (
            run_id, recorded_at, scope, name, ok, status_code, latency_ms
        ) VALUES (?, datetime('now'), ?, ?, ?, ?, ?)`
    ).bind(runId, c.scope, c.name, c.ok, c.status_code, c.latency_ms));

    if (checkStatements.length) {
        await env.CT_DB.batch(checkStatements);
    }
    return runId;
}

async function getHistory(env, hours = 24) {
    if (!env.CT_DB) {
        return { available: false, reason: 'ct_db_not_configured', buckets: [] };
    }
    const safeHours = Math.min(168, Math.max(1, Number(hours) || 24));
    const windowExpr = `-${safeHours} hours`;

    const runs = await env.CT_DB.prepare(
        `SELECT id, recorded_at, availability_pct, p95_latency_ms, breach,
                        oracle_online, oracle_total
             FROM control_tower_runs
            WHERE recorded_at >= datetime('now', ?)
            ORDER BY recorded_at DESC
            LIMIT 200`
    ).bind(windowExpr).all();

    const buckets = await env.CT_DB.prepare(
        `SELECT strftime('%Y-%m-%dT%H:00:00Z', recorded_at) AS hour_bucket,
                        COUNT(*) AS checks,
                        SUM(CASE WHEN ok = 1 THEN 1 ELSE 0 END) AS ok_checks,
                        ROUND((100.0 * SUM(CASE WHEN ok = 1 THEN 1 ELSE 0 END)) / COUNT(*), 2) AS availability_pct,
                        ROUND(AVG(latency_ms), 2) AS avg_latency_ms
             FROM control_tower_checks
            WHERE recorded_at >= datetime('now', ?)
            GROUP BY strftime('%Y-%m-%dT%H', recorded_at)
            ORDER BY hour_bucket DESC`
    ).bind(windowExpr).all();

    return {
        available: true,
        hours: safeHours,
        run_count: runs.results?.length || 0,
        latest_runs: runs.results || [],
        buckets: buckets.results || [],
    };
}

async function shouldSendAlert(env, alertType, fingerprint) {
    if (!env.CT_DB) return true;
    const cooldownMinutes = Math.max(1, Number(env.ALERT_COOLDOWN_MINUTES || 20));
    const windowExpr = `-${cooldownMinutes} minutes`;
    const existing = await env.CT_DB.prepare(
        `SELECT id FROM control_tower_alerts
            WHERE alert_type = ? AND fingerprint = ?
                AND created_at >= datetime('now', ?)
            LIMIT 1`
    ).bind(alertType, fingerprint, windowExpr).first();
    return !existing;
}

async function storeAlert(env, payload) {
    if (!env.CT_DB) return;
    await env.CT_DB.prepare(
        `INSERT INTO control_tower_alerts (
            created_at, alert_type, severity, fingerprint, message, channels_json, payload_json
        ) VALUES (datetime('now'), ?, ?, ?, ?, ?, ?)`
    ).bind(
        payload.alert_type,
        payload.severity,
        payload.fingerprint,
        payload.message,
        JSON.stringify(payload.channels || {}),
        JSON.stringify(payload.payload || {})
    ).run();
}

async function dispatchOperationalAlert(env, status, sla, reason = 'auto') {
    const criticalDown = [];
    for (const critical of ['hnh', 'oracle_bridge', 'nphies_core']) {
        if (!status.endpoints[critical]?.ok) criticalDown.push(critical);
    }

    const oracleOffline = status.oracle_portals.offline;
    const shouldAlert = sla.breach || criticalDown.length > 0 || oracleOffline > 0;
    if (!shouldAlert) {
        return { sent: false, reason: 'healthy' };
    }

    const severity = criticalDown.length > 0 ? 'critical' : (sla.breach ? 'high' : 'medium');
    const fingerprint = [
        `critical:${criticalDown.sort().join(',') || 'none'}`,
        `oracle_offline:${oracleOffline}`,
        `sla_breach:${sla.breach ? 1 : 0}`,
    ].join('|');

    const canSend = await shouldSendAlert(env, 'operational', fingerprint);
    if (!canSend) {
        return { sent: false, reason: 'cooldown', fingerprint };
    }

    const message = [
        '*Control Tower v2 Alert*',
        `Severity: ${severity.toUpperCase()}`,
        `Reason: ${reason}`,
        `Availability: ${sla.availability_pct}% (target ${sla.target_pct}%)`,
        `Critical down: ${criticalDown.length ? criticalDown.join(', ') : 'none'}`,
        `Oracle portals online: ${status.oracle_portals.online}/${status.oracle_portals.total}`,
        `Time: ${status.timestamp}`,
        'Tags: HIPAA + NPHIES + PDPL',
    ].join('\n');

    const gatewayResult = await openClawToTelegramGateway(env, 'alert', {
        source: 'control-tower-v2',
        intent: 'incident-awareness',
        training_mode: true,
        severity,
        message,
        timestamp: status.timestamp,
        context: { sla, criticalDown, oracle_portals: status.oracle_portals },
    });

    await storeAlert(env, {
        alert_type: 'operational',
        severity,
        fingerprint,
        message: gatewayResult.ai.text,
        channels: gatewayResult.channels,
        payload: { status, sla },
    });

    return {
        sent: true,
        severity,
        fingerprint,
        gateway: gatewayResult,
    };
}

async function trainOpenClawUpdate(env, summary, metadata = {}) {
    const message = [
        '*Control Tower Update Digest*',
        summary,
        `Time: ${new Date().toISOString()}`,
        'Objective: keep OpenClaw + Telegram ops channel aware and continuously trained on latest platform state.',
    ].join('\n');

    const gatewayResult = await openClawToTelegramGateway(env, 'training', {
        source: 'control-tower-v2',
        intent: 'training-update',
        training_mode: true,
        message,
        metadata,
        timestamp: new Date().toISOString(),
    });

    if (env.CT_DB) {
        await env.CT_DB.prepare(
            `INSERT INTO control_tower_training_events (created_at, summary, channels_json, metadata_json)
             VALUES (datetime('now'), ?, ?, ?)`
        ).bind(summary, JSON.stringify(gatewayResult.channels), JSON.stringify(metadata)).run();
    }

    return {
        summary,
        gateway: gatewayResult,
        telegram: gatewayResult.channels.telegram,
        openclaw: gatewayResult.channels.openclaw,
    };
}

function renderHtml(status, sla) {
    const rows = status.oracle_portals.branches
        .map((p) => `<tr><td>${p.label}</td><td>${p.ok ? 'ONLINE' : 'OFFLINE'}</td><td>${p.status}</td><td>${p.latency_ms} ms</td></tr>`)
        .join('');

    return `<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>BrainSAIT Control Tower v2</title>
    <style>
        :root { --midnight:#1a365d; --medical:#2b6cb8; --teal:#0ea5e9; --bg:#f4f8fc; --text:#10233b; }
        body { margin:0; font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif; background:linear-gradient(145deg,#f4f8fc,#e8f1fb); color:var(--text); }
        .wrap { max-width:1120px; margin:0 auto; padding:28px 16px; }
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
            <h1>Control Tower v2</h1>
            <div>portals.brainsait.org/control-tower</div>
            <div>Compliance: ${status.compliance_tags.join(' + ')}</div>
        </div>
        <div class="grid">
            <div class="card"><div class="k">Availability</div><div class="v">${sla.availability_pct}%</div></div>
            <div class="card"><div class="k">SLA Target</div><div class="v">${sla.target_pct}%</div></div>
            <div class="card"><div class="k">P95 Latency</div><div class="v">${sla.p95_latency_ms} ms</div></div>
            <div class="card"><div class="k">Oracle Portals</div><div class="v">${status.oracle_portals.online}/${status.oracle_portals.total}</div></div>
        </div>
        <table>
            <thead><tr><th>Branch</th><th>Status</th><th>HTTP</th><th>Latency</th></tr></thead>
            <tbody>${rows}</tbody>
        </table>
        <div class="footer">Updated: ${status.timestamp} | v${status.version}</div>
    </div>
</body>
</html>`;
}

async function collectAndOptionallyPersist(env, persist = true) {
    const status = await buildStatus(env);
    const slaTarget = Number(env.SLA_TARGET_PERCENT || 99.5);
    const sla = computeSlaSnapshot(status, slaTarget);
    let runId = null;
    if (persist) {
        runId = await persistSnapshot(env, status, sla);
    }
    return { status, sla, runId };
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
                    'access-control-allow-methods': 'GET,POST,OPTIONS',
                    'access-control-allow-headers': 'Content-Type,Authorization,X-Control-Tower-Key',
                },
            });
        }

        const isRoot = path === '/control-tower' || path === '/control-tower/';
        const isStatus = path === '/control-tower/status' || path === '/control-tower/api/status';
        const isSla = path === '/control-tower/sla';
        const isHistory = path === '/control-tower/history';
        const isAlertTest = path === '/control-tower/alerts/test';
        const isTrainUpdate = path === '/control-tower/train-update';
        const isGatewayBridge = path === '/control-tower/gateway/openclaw-telegram';

        if (!isRoot && !isStatus && !isSla && !isHistory && !isAlertTest && !isTrainUpdate && !isGatewayBridge) {
            return json({ success: false, message: 'not_found' }, 404);
        }

        const requiresAuth = isStatus || isSla || isHistory || isAlertTest || isTrainUpdate || isGatewayBridge;
        if (requiresAuth && !mustAuth(request, env)) {
            return json({ success: false, message: 'unauthorized' }, 401);
        }

        if (isGatewayBridge && request.method === 'POST') {
            const body = await request.json().catch(() => ({}));
            const mode = body.mode === 'alert' ? 'alert' : 'training';
            const payload = body.payload && typeof body.payload === 'object'
                ? body.payload
                : { message: body.message || 'Gateway bridge update from control tower.' };
            const result = await openClawToTelegramGateway(env, mode, payload);
            return json({ success: true, result });
        }

        if (isTrainUpdate && request.method === 'POST') {
            const body = await request.json().catch(() => ({}));
            const summary = body.summary || 'Platform update synced into Control Tower v2.';
            const result = await trainOpenClawUpdate(env, summary, body.metadata || {});
            return json({ success: true, result });
        }

        if (isAlertTest) {
            const { status, sla, runId } = await collectAndOptionallyPersist(env, true);
            const alertResult = await dispatchOperationalAlert(env, status, sla, 'manual_test');
            return json({ success: true, run_id: runId, status, sla, alert: alertResult });
        }

        if (isHistory) {
            const hours = Number(url.searchParams.get('hours') || '24');
            const history = await getHistory(env, hours);
            return json({ success: true, history });
        }

        if (isSla) {
            const { status, sla, runId } = await collectAndOptionallyPersist(env, toBool(url.searchParams.get('persist')));
            return json({ success: true, run_id: runId, status, sla });
        }

        const { status, sla, runId } = await collectAndOptionallyPersist(env, true);
        await dispatchOperationalAlert(env, status, sla, 'live_probe');

        if (isStatus) {
            return json({ success: true, run_id: runId, status, sla });
        }

        return new Response(renderHtml(status, sla), {
            status: 200,
            headers: {
                'content-type': 'text/html; charset=utf-8',
                ...SECURITY_HEADERS,
            },
        });
    },

    async scheduled(_event, env, ctx) {
        ctx.waitUntil((async () => {
            const { status, sla } = await collectAndOptionallyPersist(env, true);
            await dispatchOperationalAlert(env, status, sla, 'scheduled_probe');
        })());
    },
};
