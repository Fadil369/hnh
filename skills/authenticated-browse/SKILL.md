---
name: authenticated-browse
description: Navigate to sites that require login using credentials stored in the CF Secrets vault. Handles Oracle portals, NPHIES, MOH, Basma, and all BrainSAIT platform surfaces.
model: copilot/claude-opus-4.7
---

# Authenticated Browse

Access any site in the credential vault — Oracle hospital portals, NPHIES, MOH, Basma, GIVC, SBS — without being asked for passwords.

## Two execution modes

### Mode A — Local Chromium (default)
Uses the local browser already running on this server. Fast, interactive, screenshots go to Telegram.

### Mode B — CF Browser Run (remote)
Executes inside Cloudflare's Browser Rendering infrastructure via `penguin-browser-run`. Useful if the local browser is unavailable or a different IP is needed.

---

## Credential vault

**Vault URL**: `https://penguin-secrets.brainsait-fadil.workers.dev`  
**Auth**: Bearer token from `SECRETS.GATEWAY_TOKEN` (stored in TOOLS.md)

### Available credentials

| Key | Site | Notes |
|-----|------|-------|
| `portals_admin` | portals.brainsait.org/admin | BrainSAIT portal admin |
| `oracle_riyadh` | oracle-riyadh.brainsait.org | Oracle Riyadh hospital |
| `oracle_madinah` | oracle-madinah.brainsait.org | Oracle Madinah hospital |
| `oracle_unaizah` | oracle-unaizah.brainsait.org | Oracle Unaizah hospital |
| `oracle_khamis` | oracle-khamis.brainsait.org | Oracle Khamis Mushait |
| `oracle_jizan` | oracle-jizan.brainsait.org | Oracle Jizan hospital |
| `oracle_abha` | oracle-abha.brainsait.org | Oracle Abha hospital |
| `nphies_portal` | nphies.sa | NPHIES national platform |
| `moh_claims` | moh-claims.brainsait.org | MOH claims (GlobeMed) |
| `moh_approval` | moh-approval.brainsait.org | MOH approval portal |
| `basma_admin` | bsma.elfadil.com | Basma patient gateway admin |
| `elevenlabs` | api.elevenlabs.io | ElevenLabs TTS API key |
| `twilio` | Twilio account | Voice/SMS credentials |
| `3cx_pbx` | 1593.3cx.cloud | 3CX PBX — ext 12310 |

To add/update a credential:
```bash
echo '{"username":"user","password":"pass","url":"https://...","notes":"..."}' | \
  CLOUDFLARE_API_TOKEN=[REDACTED — see penguin-secrets vault] \
  npx wrangler secret put CREDENTIAL_NAME --name penguin-secrets
```

---

## Mode A — Local browser workflow

```
1. Fetch creds:
   curl -s https://penguin-secrets.brainsait-fadil.workers.dev/secret/oracle_riyadh \
     -H "Authorization: Bearer <GATEWAY_TOKEN>"

2. Navigate:
   openclaw browser navigate <url>

3. Fill login form:
   openclaw browser snapshot           # get field refs
   openclaw browser type <ref> "<user>"
   openclaw browser type <ref> "<pass>"
   openclaw browser press Enter

4. Wait for dashboard:
   openclaw browser wait --text "Welcome"

5. Screenshot or extract:
   openclaw browser screenshot
   openclaw browser snapshot
```

### Oracle portal login pattern
```
navigate https://oracle-riyadh.brainsait.org/prod/faces/Login.jsf
snapshot   → find #username and #password refs
type #username → creds.username
type #password → creds.password
click "Login" button
wait --text "Home"
screenshot
```

### NPHIES login pattern
```
navigate https://nphies.sa/
snapshot → locate login fields
type username → creds.username
type password → creds.password
press Enter
wait for dashboard
```

---

## Mode B — CF Browser Run (remote)

Call `penguin-browser-run.brainsait-fadil.workers.dev/run` with a step array.
Supports credential injection via `__USERNAME__` / `__PASSWORD__` placeholders.

```bash
curl -s -X POST https://penguin-browser-run.brainsait-fadil.workers.dev/run \
  -H "Authorization: Bearer <GATEWAY_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://oracle-riyadh.brainsait.org/prod/faces/Login.jsf",
    "credentials_key": "oracle_riyadh",
    "screenshot": true,
    "steps": [
      { "type": "wait_for",  "selector": "#username" },
      { "type": "type",      "selector": "#username", "value": "__USERNAME__" },
      { "type": "type",      "selector": "#password", "value": "__PASSWORD__" },
      { "type": "press",     "key": "Enter" },
      { "type": "wait_for_text", "value": "Home" },
      { "type": "extract_all", "selector": ".dashboard-item", "as": "items" }
    ]
  }'
```

Response:
```json
{
  "ok": true,
  "title": "Oracle Riyadh — Home",
  "url": "https://oracle-riyadh.brainsait.org/prod/faces/Home",
  "text": "...",
  "screenshot": "<base64-jpeg>",
  "extracted": { "items": ["..."] },
  "steps": [{ "type": "wait_for", "ok": true }, ...]
}
```

---

## Quick reference — which mode to use

| Scenario | Mode |
|----------|------|
| Dr. Mohammed asks "check Riyadh Oracle portal" | A — local browser, screenshot to Telegram |
| Scheduled nightly claim extraction | B — CF Browser Run, no local browser needed |
| Need to fill a form and submit | A — local browser, more control |
| Quick status check from Telegram | A — local, screenshot auto-attaches |
| Running as autonomous cron agent | B — CF, isolated, no session state needed |

---

## Rules

- Never log or expose passwords in responses to Dr. Mohammed
- Always confirm the site before taking any write/submit action
- If a credential returns `CHANGE_ME`, stop and ask Dr. Mohammed to update the secret
- Screenshot confirms you're on the right page — always take one after login
