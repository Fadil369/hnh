# BRAINSAIT.md — Company & Platform Knowledge

## What BrainSAIT is

**BrainSAIT LTD** — AI-native healthcare automation platform for Saudi Arabia & MENA.
- Founded by Dr. Mohamed El Fadil
- Focus: NPHIES RCM, FHIR R4, clinical AI, Vision 2030 alignment
- Infrastructure: Cloudflare-native (Workers, D1, KV, Tunnels, Zero Trust)
- Two CF accounts:
  - **BRAINSAIT LTD** (`519d80ce438f427d096a3e3bdd98a7e0`) — 67 Workers, 10 D1 DBs, 20 KV namespaces
  - **Brainsait** (`d7b99530559ab4f2545e9bdc72a7ab9b`) — AI Gateway (brainsait-linc, default, oid, vibesdk-gateway)

---

## Public sites

| Site | URL | What it is |
|------|-----|-----------|
| Main homepage | brainsait.org | Marketing + platform overview + clinic booking |
| Health Network Hub | hnh.brainsait.org | مستشفيات الحياة الوطني — hospital group (6 branches, 700+ doctors) |
| Academy | academy.brainsait.org | BrainSAIT Academy — 43 IHI-aligned bilingual courses, 14 tracks |
| Portals | portals.brainsait.org | eCarePlus — unified patient/provider/payer/gov gateway |
| Control Tower | portals.brainsait.org/control-tower | Live operational dashboard — hospitals, claims, agents |
| Basma | bsma.elfadil.com | Arabic-first patient AI secretary (currently offline/522) |
| GIVC | givc.elfadil.com | Clinician portal with AI-assisted workflows |
| SBS | sbs.elfadil.com | Saudi Billing System — claims pipeline, denial analytics |
| Spark | spark.brainsait.org | AI Healthcare Startup Builder (6-phase) |
| MCP gateway | mcp.brainsait.org | MCP agent access point |

---

## The LINC Agent ecosystem (MASTERLINC)

| Agent | Role |
|-------|------|
| **MasterLINC** | Orchestration layer — routes all other agents |
| **ClaimLINC** | Claims automation — NPHIES submission, reconciliation |
| **ClinicalLINC** | Medical decisions, clinical NLP, FHIR validation |
| **ComplianceLINC** | Regulatory alignment — NPHIES rules, MOH standards |
| **PolicyLINC** | Insurance policy management |
| **CodeLINC** | Medical coding — ICD-10, SNOMED, Saudi code sets |
| **AuthLINC** | Prior authorization automation |
| **BridgeLINC** | Oracle ERP bridge |
| **DRGLINc** | DRG (Diagnosis Related Group) management |
| **RadioLINC** | Radiology pipeline |
| **TTLINC** | Task and timeline management |
| **Basma** | Patient-facing AI secretary (Arabic-first voice + chat) |
| **HealthcareLINC** | General healthcare coordination |

---

## Hospital network — مستشفيات الحياة الوطني (HnH)

6 branches, all connected via Cloudflare tunnels to Oracle Oasis+ ERP:

| Branch | Oracle Portal | City |
|--------|--------------|------|
| Riyadh | oracle-riyadh.brainsait.org | الرياض |
| Madinah | oracle-madinah.brainsait.org | المدينة المنورة |
| Unaizah | oracle-unaizah.brainsait.org | عنيزة (القصيم) |
| Khamis Mushait | oracle-khamis.brainsait.org | خميس مشيط |
| Jizan | oracle-jizan.brainsait.org | جازان |
| Abha | oracle-abha.brainsait.org | أبها |

All branches: +966 920000094 · info@hayathospitals.com

**Current operational state** (as of 2026-05-11):
- All 6 hospital portals: OPERATIONAL (avg latency 661ms)
- Claims batch: BAT-2026-NB-00004295-OT — 73 claims, 63 ready, 10 blocked (BLOCKER_RECODE_96092-ERR)
- Appeal window: 0 days remaining — URGENT
- Scanner feed: DEGRADED (HTTP 404 on chunks 1-7 — needs repair)
- Basma gateway: OFFLINE (HTTP 522)

---

## CF Workers estate (key workers)

| Worker | Purpose | Last Modified |
|--------|---------|--------------|
| `brainsait-doctor-hub-api` | Doctor hub API | 2026-03-01 |
| `brainsait-unified-prod` | Unified production platform | 2025-08-17 |
| `brainsait-masterlinc-production` | MasterLINC production | 2025-06-20 |
| `brainsait-healthcare-platform` | Healthcare platform | 2025-08-08 |
| `linc-agents` | LINC agent worker | 2025-08-06 |
| `givc-healthcare-api` | GIVC clinical API | 2025-07-14 |
| `brainsait-api-gateway` | API gateway | 2025-08-14 |
| `brainsait-email-worker` | Email worker | 2025-07-21 |
| `brainsait-ocr-worker` | OCR document processing | 2025-08-15 |
| `brainsait-linkedin-automation` | LinkedIn automation | 2025-08-16 |
| `rcm-validation-api` | RCM validation | 2025-08-21 |
| `penguin-secrets` | **Credential vault (NEW)** | 2026-05-11 |
| `penguin-browser-run` | **CF Browser Rendering (NEW)** | 2026-05-11 |
| `admin-linc-369` | Admin surface | 2025-06-08 |

---

## AI Gateway (account: d7b99530...)

| Gateway | Auth | Rate Limit | Notes |
|---------|------|-----------|-------|
| `brainsait-linc` | ✅ Required | 50 req/min | Main LINC gateway, log retention 100k |
| `default` | ❌ Open | None | Default passthrough |
| `oid` | ❌ Open | None | OID registry, DLP enabled, all guardrails on |
| `vibesdk-gateway` | ✅ Required | None | VoIP/comms SDK, cache 1h, cache-on-update |

---

## D1 Databases

| Name | ID | Tables | Notes |
|------|----|--------|-------|
| `black-admin-d1` | 2f0819c4 | 6 | Admin surface |
| `contextlinc-metadata` | 0ead3006 | 4 | ContextLINC metadata |
| `brainsait-db` | 79e8eb7a | 1 | Core DB |
| `dash` | bc02f5ff | 0 | Dashboard (131KB data) |
| `givc-healthcare` | 4db7654a | 0 | GIVC (may be stale) |
| `healthcloudlinc-db` | 4f32de51 | 0 | HealthCloudLINC (may be stale) |
| `medivault-database` | 0b7df012 | 0 | MediVault (may be stale) |

---

## Technology stack

- **Edge**: Cloudflare Workers, D1, KV, Tunnels, Zero Trust, Pages, R2
- **Backend**: Node.js (v22), TypeScript, Hono framework
- **AI**: Anthropic Claude (primary), Gemini (research), OpenAI Whisper (STT), ElevenLabs (TTS)
- **Healthcare**: FHIR R4, NPHIES v3.2, HL7 v2.x, Oracle Oasis+ ERP
- **Voice/Comms**: Twilio (voice/SMS), 3CX PBX (1593.3cx.cloud, ext 12310), Basma AI secretary
- **Automation**: n8n workflows (n8n.brainsait.cloud), LINC agents
- **Storage**: PostgreSQL, Redis, D1, KV
- **Monitoring**: Control Tower dashboard, n8n alerts, daily executive digest
