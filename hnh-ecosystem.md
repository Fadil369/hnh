# HNH Ecosystem Map
*CF Account: Brainsait — d7b99530559ab4f2545e9bdc72a7ab9b*
*Last audited: 2026-05-11*

---

## Live URLs & Routing

| URL Pattern | Worker | Status |
|---|---|---|
| `hnh.brainsait.org/*` | hnh-unified | ✅ 200 |
| `hnh.brainsait.org/basma*` | basma-portal | — |
| `hnh.brainsait.org/givc/*` | givc-portal | — |
| `voice.hnh.brainsait.org/*` | basma-voice-agent | — |
| `basma.hnh.brainsait.org/*` | basma-voice-agent | — |
| `oracle-bridge.brainsait.org/*` | oracle-bridge | ✅ healthy v2.0.0 |
| `oracle-scanner.brainsait.org/*` | oracle-claim-scanner | — |
| `api.brainsait.org/nphies/*` | claimlinc-api | — |
| `portals.brainsait.org/*` | brainsait-portals | ✅ control tower live |
| `crm.brainsait.org/*` | basma-crm | — |

Workers with no custom route (workers.dev only, behind CF Access): `sbs-portal`

---

## Workers & Bindings

### hnh-unified (main hub)
- D1: `DB`=hnh-gharnata, `HIS_DB`=his_database (f79d9487), `BASMA_DB`=basma_production
- Services: `CLAIMLINC_SERVICE`→claimlinc-api, `GIVC_SERVICE`→givc-portal
- 15+ secrets: ORACLE_API_KEY, DEEPSEEK_API_KEY, ELEVENLABS_API_KEY, etc.

### hnh-portal / hnh-portal-v2-modular / hnh-portal-v2-modular-production
- All bind same 3 DBs: DB + HIS_DB + BASMA_DB
- v2-modular adds: CLAIMLINC_KEY, DEEPSEEK_API_KEY, ORACLE_API_KEY secrets
- Plain vars: FACILITY_LICENSE, ORACLE_BRIDGE_URL, NPHIES_MIRROR_URL, SITE_URL, BRAINSAIT_OS_VERSION

### hnh-gharnata-api (AI-enabled HIS API)
- AI binding (Workers AI)
- D1: DB + HIS_DB + BASMA_DB (same 3 databases)
- Plain: FACILITY_LICENSE, HUB_VERSION, ORACLE_BRIDGE_URL, NPHIES_MIRROR_URL

### oracle-bridge (hospital Oracle API proxy)
- Secrets per hospital: ORACLE_CREDENTIALS_{RIYADH,MADINAH,UNAIZAH,KHAMIS,JIZAN,ABHA}
- KV: `ORACLE_RESULTS` (639ac84f), `SESSION_KV`
- Health endpoint: `oracle-bridge.brainsait.org/health` → `{"ok":true,"service":"oracle-bridge","version":"2.0.0"}`
- API requires `Authorization: Bearer $ORACLE_BRIDGE_API_KEY` (stored as secret in oracle-bridge)

### oracle-claim-scanner (headless Oracle portal scraper)
- BROWSER binding (Cloudflare Browser Rendering)
- KV: `RESULTS` (639ac84f), `SESSIONS` (b1785b72)
- Secrets: ORACLE_CREDENTIALS, ORACLE_PASS, ORACLE_PASS_RIYADH, ORACLE_PASSWORD, ORACLE_USER, ORACLE_USER_RIYADH
- Plain: PORTALS_URL, DEFAULT_HOSPITAL, ALLOW_UNAUTHENTICATED
- Route: `oracle-scanner.brainsait.org/*`

### basma-voice-agent (AI voice assistant)
- AI binding (Workers AI)
- D1: `DB`=basma_production (c30dd8f8), `HEALTHCARE_DB`=brainsait-healthcare-d1 (0def24ea, 31 tables)
- KV: `SESSIONS` (6bd969db)
- Secrets: DEEPSEEK_API_KEY, ELEVENLABS_API_KEY, ORACLE_API_KEY, ORACLE_PASSWORD, ORACLE_USER
- Plain: ENVIRONMENT
- Routes: `voice.hnh.brainsait.org/*`, `basma.hnh.brainsait.org/*`

### sbs-portal (SBS billing/claims portal)
- Service: `CLAIMLINC_SERVICE`→claimlinc-api
- D1: `DB`=hnh-gharnata (d6960732), `HEALTHCARE_DB`=brainsait-healthcare-d1 (0def24ea)
- No custom domain (workers.dev behind CF Access)

### claimlinc-api (NPHIES claims integration)
- Secrets: API_SECRET_KEY, CLAIMLINC_KEY, ELEVENLABS_API_KEY, NPHIES_PASSWORD, NPHIES_USERNAME
- Plain: ENVIRONMENT, NPHIES_CLIENT_ID, NPHIES_REALM, NPHIES_TOKEN_URL, NPHIES_VIEWER_API
- No D1 (pure API — connects directly to NPHIES)
- Route: `api.brainsait.org/nphies/*`

---

## D1 Databases

| Alias | Name | UUID (short) | Size | Tables | Bound As |
|---|---|---|---|---|---|
| d1_primary | hnh-gharnata | d6960732 | 548KB | 34 | DB (everywhere) |
| d1_his_database | his_database | f79d9487 | 2216KB | 20 | HIS_DB (v2 workers) |
| d1_basma | basma_production | c30dd8f8 | 588KB | 24 | BASMA_DB |
| d1_healthcare | brainsait-healthcare-d1 | 0def24ea | 604KB | 31 | HEALTHCARE_DB (basma-voice, sbs-portal) |
| — | sbs_db | 334fd7dc | 72KB | — | — (unbound, possibly retired) |

**hnh-gharnata (34 tables):** Full clinical HIS — patients, encounters, vitals, medications, labs, radiology, OR, ICU, nursing, pharmacy, bed management, codes, billing

**his_database (20 tables):** NPHIES integration — nphies_submissions, patients, claims, prior_authorizations, coverage, eligibility, organizations

**basma_production (24 tables):** Patient engagement — patients, appointments, RAG knowledge base, oracle_sync, sessions, conversations

**brainsait-healthcare-d1 (31 tables):** SDC + advanced clinical — care_plans, clinical_rotations, channels, shifts, prior_auth_items, sdc_questionnaires, sdc_operations_log, simulation_sessions, rcm_kpi_daily, urgent_alerts, knowledge_base, document_extractions, users, coverage, claims, claim_line_items, organizations, audit_logs

---

## Cloudflare Tunnels

| Name | ID (short) | Status | Purpose |
|---|---|---|---|
| oracle-hospitals | 9175a180 | ⛔ DOWN | Direct tunnel to 6 hospital Oracle systems (cloudflared not running) |
| hayath-mcp | e5cb8c86 | ✅ HEALTHY (4 conns) | Hayath MCP server |
| penguin new | 7fd4dd6a | ✅ HEALTHY (3 conns) | This penguin server (localhost) |
| browser-agent | 6afa7f74 | ⛔ DOWN | — |
| hermes-agent-public | efaa7cdc | ⛔ DOWN | — |

**oracle-hospitals tunnel ingress rules (when cloudflared is running):**
```
oracle-riyadh.brainsait.org   → https://128.1.1.185  (noTLSVerify)
oracle-madinah.brainsait.org  → http://172.25.11.26
oracle-unaizah.brainsait.org  → http://10.0.100.105
oracle-khamis.brainsait.org   → http://172.30.0.77
oracle-jizan.brainsait.org    → http://172.17.4.84
oracle-abha.brainsait.org     → http://172.19.1.1
```
The oracle-bridge worker connects via its own stored credentials, NOT via this tunnel currently.

---

## Control Tower Status (last checked)

- Endpoint: `portals.brainsait.org/api/control-tower/summary`
- 5/6 hospitals online (Unaizah: HTTP 500 ⚠️)
- Oracle claim scanner: degraded (HTTP 404 on batch route)
- Basma Patient Gateway: offline
- 2 critical + 4 high priority actions pending

---

## Oracle Portal Credentials (stored in penguin-secrets vault)

All 5 portals: HTTP 200 accessible, route via CF proxy → Oracle servers have public IPs.

| Branch | Vault Key | URL | User |
|---|---|---|---|
| Riyadh | `oracle_riyadh` | https://oracle-riyadh.brainsait.org/prod/faces/Login.jsf | U29200 |
| Madinah | `oracle_madinah` | https://oracle-madinah.brainsait.org/Oasis/faces/Login.jsf | U29200 |
| Abha | `oracle_abha` | https://oracle-abha.brainsait.org/Oasis/faces/Login.jsf | U2415 |
| Jizan | `oracle_jizan` | https://oracle-jizan.brainsait.org/prod/faces/Login.jsf | U29958 |
| Khamis | `oracle_khamis` | https://oracle-khamis.brainsait.org/prod/faces/Login.jsf | U29958 |

**Oracle ADF selectors:** username `input[name=it1]`, password `input[name=it2]`, login button `#login`
**Login note:** Headless browser login returns "Invalid Credentials" — Oracle likely allowlists specific source IPs. Use `oracle_claim_scanner` worker (which has BROWSER binding + ORACLE credentials) for authenticated access from within the oracle-bridge routing context.

---

## Known Issues

1. **Unaizah hospital offline** — oracle-bridge returns 500 for Unaizah branch. Hospital's private IP (10.0.100.105) may be unreachable from oracle-bridge.
2. **oracle-hospitals tunnel DOWN** — cloudflared not running on hospital networks. Not blocking oracle-bridge (uses direct creds), but tunnel-based routing unavailable.
3. **Oracle claim scanner degraded** — `/api/scan/batch` returns 404. Route may be missing or broken in oracle-claim-scanner worker.
4. **sbs-portal no custom domain** — accessible only via workers.dev (behind CF Access). Consider adding `sbs.hnh.brainsait.org/*` route.
5. **portals_admin credential** — password is placeholder `CHANGE_ME` in penguin-secrets vault.
6. **ORACLE_BRIDGE_API_KEY** — needed for authenticated oracle-bridge API calls; stored as secret in oracle-bridge worker but not in penguin-secrets vault.

---

## GitHub Repo

`Fadil369/hnh` — public repo
- `apps/frontend/` — Basma + SBS pages (Next.js/Astro)
- `workers/` — basma-crm, basma-portal, givc
- `integrations/` — brainsait-voice, maillinc, nphies-mirror
- Root: `worker.js` + `wrangler.toml` (hnh-unified)
