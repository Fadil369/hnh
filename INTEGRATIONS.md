# INTEGRATIONS.md — All External Services & Credentials

All credentials are stored encrypted in the penguin-secrets CF worker.
**Vault**: `https://penguin-secrets.brainsait-fadil.workers.dev`
**Gateway token**: stored in OpenClaw as `SECRETS_GATEWAY_TOKEN` — see TOOLS.md

To fetch a credential:
```bash
curl -s https://penguin-secrets.brainsait-fadil.workers.dev/secret/<KEY> \
  -H "Authorization: Bearer <GATEWAY_TOKEN>"
```

To update a credential (populate CHANGE_ME placeholders):
```bash
echo '{"username":"real_user","password":"real_pass","url":"...","notes":"..."}' | \
  CLOUDFLARE_API_TOKEN=[REDACTED — see penguin-secrets vault] \
  npx wrangler secret put CREDENTIAL_KEY --name penguin-secrets
```

---

## Hospital Oracle Portals

All via Cloudflare tunnel to Oracle Oasis+ ERP. Login at `/prod/faces/Login.jsf` or `/Oasis/faces/Login.jsf`.

| Secret key | URL | Branch |
|-----------|-----|--------|
| `oracle_riyadh` | oracle-riyadh.brainsait.org | Riyadh |
| `oracle_madinah` | oracle-madinah.brainsait.org | Madinah |
| `oracle_unaizah` | oracle-unaizah.brainsait.org | Unaizah/Qassim |
| `oracle_khamis` | oracle-khamis.brainsait.org | Khamis Mushait |
| `oracle_jizan` | oracle-jizan.brainsait.org | Jizan |
| `oracle_abha` | oracle-abha.brainsait.org | Abha |

---

## Healthcare Gov Portals

| Secret key | URL | What it is |
|-----------|-----|-----------|
| `nphies_portal` | https://nphies.sa/ | NPHIES — national health insurance exchange |
| `moh_claims` | https://moh-claims.brainsait.org/ | MOH claims portal (GlobeMed Saudi) |
| `moh_approval` | https://moh-approval.brainsait.org/ | MOH purchasing/approval portal |

---

## BrainSAIT Platform Admin

| Secret key | URL | What it is |
|-----------|-----|-----------|
| `portals_admin` | portals.brainsait.org/admin | eCarePlus admin surface |
| `basma_admin` | bsma.elfadil.com | Basma patient gateway (offline — HTTP 522) |
| `givc_admin` | givc.elfadil.com | GIVC clinician portal admin |
| `sbs_admin` | sbs.elfadil.com | SBS ClaimLinc admin |
| `n8n_admin` | n8n.brainsait.cloud | n8n automation workflows |

---

## Control Tower

- **Public URL**: https://portals.brainsait.org/control-tower
- **Status API**: https://portals.brainsait.org/control-tower/status
- **SLA API**: https://portals.brainsait.org/control-tower/sla
- **History API**: https://portals.brainsait.org/control-tower/history?hours=24
- **Business case API**: https://portals.brainsait.org/control-tower/business-case?days=30
- **Executive digest test API**: POST https://portals.brainsait.org/control-tower/executive-digest/test
- **Manual alert test**: https://portals.brainsait.org/control-tower/alerts/test
- **OpenClaw training update**: POST https://portals.brainsait.org/control-tower/train-update
- **OpenClaw→Telegram gateway**: POST https://portals.brainsait.org/control-tower/gateway/openclaw-telegram
- **Worker config**: workers/control-tower/wrangler.toml
- **Worker source**: workers/control-tower/src/worker.js
- **D1 migrations**: workers/control-tower/migrations/

Deep integration coverage:
- HNH health API status
- Oracle bridge status
- Oracle authenticated session probe (via Oracle bridge)
- NPHIES mirror and NPHIES core health checks
- Branch-level Oracle portal probes:
  - oracle-riyadh.brainsait.org
  - oracle-madinah.brainsait.org
  - oracle-unaizah.brainsait.org
  - oracle-khamis.brainsait.org
  - oracle-jizan.brainsait.org
  - oracle-abha.brainsait.org

Deployment:
```bash
npm run workers:control-tower:migrate:remote
npm run workers:control-tower:dry
npm run workers:control-tower:deploy
npm run workers:control-tower:test:aggressive
```

Security:
- Set `CONTROL_TOWER_KEY` to protect JSON status API.
- Access protected status endpoint with header: `x-control-tower-key: <value>`.
- Optional Oracle session probe path can be set with `ORACLE_SESSION_PROBE_PATH` (default `/portal/session/health`).

OpenClaw + Telegram awareness/training:
- Set `OPENCLAW_AGENT_WEBHOOK_URL` and optional `OPENCLAW_AGENT_TOKEN`.
- Set `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID`.
- Control Tower v2 sends operational alerts and training updates to both channels through an AI gateway.
- AI gateway uses Workers AI (`env.AI`) with `AI_MODEL` to summarize payloads before Telegram dispatch.

Executive proof / business value model:
- `GET /control-tower/business-case?days=30` returns audited KPIs from D1 (`runs`, `checks`, `alerts`) and an estimated value model.
- KPI fields include availability, SLA breaches, endpoint availability, Oracle portal availability, alert counts, monitored runs, and automated checks.
- Value fields include automation hours saved, automation savings, outage hours avoided, and estimated total value.
- Optional tuning vars in worker environment:
  - `BASELINE_AVAILABILITY_PCT` (default `98.0`)
  - `MANUAL_CHECK_MINUTES_PER_RUN` (default `8`)
  - `OUTAGE_COST_PER_HOUR_USD` (default `1200`)
  - `OPS_HOURLY_RATE_USD` (default `45`)

Executive automation cadence:
- Every 5 minutes: operational health probe + alert logic.
- Every Monday 07:00 UTC: scheduled executive digest via OpenClaw+Telegram AI gateway.
- Digest feature flags:
  - `EXECUTIVE_DIGEST_ENABLED` (default `true`)
  - `EXECUTIVE_DIGEST_DAYS` (default `30`)

---

## Voice & Telephony

### ElevenLabs TTS
- **Secret key**: `elevenlabs`
- **API**: `https://api.elevenlabs.io/v1`
- **Use**: Basma voice AI, TTS for Arabic/English responses
- **Model**: Eleven Multilingual v2 (preferred for Arabic)

### Twilio
- **Secret key**: `twilio`
- **Use**: Voice calls, SMS — Basma calling integration
- **Worker**: `masterlinc/apps/workers/voice/` — Twilio WebSocket stream → AI transcription (OpenAI Whisper) → Claude → ElevenLabs TTS

### 3CX PBX
- **Secret key**: `threecx_pbx` (stored as `3CX_PBX`)
- **FQDN**: `1593.3cx.cloud`
- **Extension**: `12310`
- **MCP package**: `masterlinc/packages/3cx-mcp/` — @basma/3cx-mcp, MCP server for PBX control
- **Use**: VoIP calls, call routing, Basma AI phone integration

---

## Cloudflare

### CF API Token (cfut_…)
- **Token**: `[REDACTED — see penguin-secrets vault]`
- **Account**: Brainsait (`d7b99530559ab4f2545e9bdc72a7ab9b`)
- **Email**: brainsait@hotmail.com
- **Use**: Deploy workers, set secrets, manage D1/KV/AI Gateway

### CF AI Gateway
- **brainsait-linc**: `https://gateway.ai.cloudflare.com/v1/d7b99530.../brainsait-linc/...`
  - Auth required, rate limited 50/min, 100k log retention
- **oid**: Has DLP + all guardrails enabled
- **vibesdk-gateway**: VoIP/comms SDK, auth required, 1h cache

### CF Tunnels
- All 6 hospital branches connected via tunnel mesh (all healthy as of 2026-05-11)
- Repository: `Fadil369/oracle-setup` (GitHub, branch: main)

### CF Email
- Worker: `brainsait-email-worker` — email send/routing via CF Email Workers
- Can send/receive email on brainsait.org domain

---

## Communication Stack

### Basma AI Secretary
Full voice AI for patient intake:
- **Input**: Twilio → WebSocket → Worker
- **STT**: OpenAI Whisper-1 (audio transcription)
- **LLM**: Anthropic Claude (conversation)
- **TTS**: ElevenLabs → μ-law frames → Twilio stream
- **Status**: Infrastructure ready, bsma.elfadil.com offline (HTTP 522 — needs fixing)

### Telegram
- **Bot**: @Penguin369_bot
- **Chat ID**: 2076569901 (Dr. Mohammed)
- **Status**: Active, polling mode

---

## AI Models in Use

| Provider | Models | Use case |
|---------|--------|---------|
| Anthropic (direct) | claude-haiku-4-5, claude-sonnet-4-6 | Fallback, paid |
| Copilot proxy (:18890) | claude-opus-4.7, claude-sonnet-4.6, gpt-5.4, gpt-5.5, codex | Primary — free |
| Gemini (direct) | gemini-2.5-flash, gemini-2.5-pro | Research, data |
| GitHub Models | gpt-4o, llama-3.1-405b | Azure endpoint |
| OpenAI (via workers) | whisper-1 | Speech-to-text only |
| ElevenLabs | Eleven Multilingual v2 | Basma TTS |

---

## n8n Automation Workflows

- **URL**: n8n.brainsait.cloud
- **Webhooks**: `/webhook/sbs-claim-submission`, latency escalation, daily digest
- **Playbooks**: Rejected claim recovery, eligibility pre-check, latency escalation, daily executive digest

---

## TURN / WebRTC

- Referenced in tech stack for real-time voice/video
- Config location: check `masterlinc/services/telehealth/`
- Likely used with GIVC telemedicine and Basma voice calls

---

## Upcoming / Needs attention

1. **Basma offline** (bsma.elfadil.com HTTP 522) — check CF Worker binding or upstream
2. **Oracle scanner feed degraded** — HTTP 404 on claims chunks, needs route fix
3. **63 claims** in appeal batch — 0 days remaining in window (URGENT)
4. **CHANGE_ME credentials** — populate real values in penguin-secrets vault before auth-browse use
