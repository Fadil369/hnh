# MEMORY.md — Long-Term Memory

## System Architecture

### Live Deployments
- **hnh.brainsait.org** — `hnh-unified` worker v9.0.1 (monolith, deployed from root `wrangler.toml`)
- **oracle-bridge.brainsait.org** — v2.0.1 (separate worker, elfadil.com zone for tunnel routing)
- **api.brainsait.org** — ecosystem orchestrator (routes: /ecosystem/*, /claimlinc/*)
- **claimlinc-api** — ClaimLinc integration worker (code deployed, routes need CF Dashboard setup)

### Tunnel Infrastructure
- **hayath-mcp** (`e5cb8c86`) — main tunnel, 3 connectors (Windows at hospital, Linux ARM, MacBook)
- **Tunnel routes**: 6 private IP subnets for all hospitals
- **DNS**: oracle-*.elfadil.com (proxy) → tunnel → hospital private IPs
- **Bridge health**: `/diagnose` from inside CF Workers unreliable (proxy loop). Dashboard uses `TUNNEL_STATUS` constants.

### Oracle Hospitals (all 6 reachable ✅)
- Riyadh (RUH) — 128.1.1.185, /prod
- Madinah (MED) — 172.25.11.26, /Oasis
- Unayzah (UNA) — 10.0.100.105, /prod
- Khamis (KHM) — 172.30.0.77, /prod
- Jizan (JZN) — 172.17.4.84, /prod
- Abha (ABH) — 172.19.1.1, /Oasis

### Key Secrets on Cloudflare Workers
- **hnh-unified**: API_KEY, CLAIMLINC_KEY, DEEPSEEK_API_KEY, ORACLE_API_KEY, ORACLE_PASSWORD, ORACLE_USER
- **oracle-bridge**: ORACLE_BRIDGE_API_KEY, ORACLE_CREDS_*, ORACLE_PASS_*, ORACLE_USER_*

## Known Issues
1. CF API token expired — can't add new routes via wrangler
2. ClaimLinc / NPHIES ClaimLinc still degraded — needs API key fix
3. D1 migration 0005 prepared but not executed (needs CF token refresh)
4. Wrangler 4.76.0 — update to 4.87.0 available

## Git Repos
- `/Users/fadil369/.openclaw/workspace` → `Fadil369/hnh` (HNH portal worker)
- `/Users/fadil369/repos/oracle-setup` → `Fadil369/oracle-setup` (bridge + infra)
- `/Users/fadil369/repos/brainsait-org` → ecosystem orchestrator
