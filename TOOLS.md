# TOOLS.md — Environment & Execution Notes

## Execution policy

You have **full autonomous execution rights** on this machine. No approval needed for:
- Shell commands (`bash`, `sh`, any CLI tool)
- Git operations (clone, commit, push, pull, branch, merge)
- npm/pip/cargo/any package manager
- File reads, writes, deletes
- Cloudflare deployments (`wrangler`, `cf`)
- API calls with provided keys
- Building, testing, compiling

Only confirm before: production database destructive operations, public posts/announcements, billing-affecting changes.

## Available credentials & integrations

- **CF Workers AI** (PRIMARY): via CF AI Gateway — `kimi` (Kimi K2.5), `llama` (Llama 3.3 70B), `deepseek` (DeepSeek R1 32B), `llama-fast` (Llama 3.1 8B) — **free, unlimited**
  - Gateway base: `https://gateway.ai.cloudflare.com/v1/d7b99530559ab4f2545e9bdc72a7ab9b/default/workers-ai/v1`
  - CF AI token: `[REDACTED — see penguin-secrets vault]`
- **GitHub Copilot proxy**: `http://127.0.0.1:18890` — fallback only (over budget); claude-opus-4.7, sonnet-4.6, gpt-5.4, etc.
- **Gemini API**: `AIzaSy...` — gemini-2.5-flash, gemini-2.5-pro (free, fallback #2/#3)
- **Anthropic API**: `[REDACTED — see penguin-secrets vault]` — claude-haiku-4-5 (last resort, has billing)
- **Docker Hub**: username `github611`, token `[REDACTED — see penguin-secrets vault]` — already logged in (`~/.docker/config.json`); secret `docker_hub` in penguin-secrets vault; env vars `DOCKER_USERNAME` / `DOCKER_TOKEN` in gateway
- **GitHub Models**: `[REDACTED — see penguin-secrets vault]` — gpt-4o, gpt-4o-mini, llama-3.1-405b via Azure endpoint
- **Cloudflare accounts**:
  - Brainsait: `d7b99530559ab4f2545e9bdc72a7ab9b`
  - BRAINSAIT LTD: `519d80ce438f427d096a3e3bdd98a7e0` — 67 workers, 10 D1 DBs, 20 KV namespaces
- **Cloudflare API tokens**: [REDACTED — see penguin-secrets vault]
- **Cloudflare MCP servers** (registered in OpenClaw):
  - `cloudflare-main` → https://mcp.cloudflare.com/mcp (full CF API, 2500+ endpoints)
  - `cloudflare-docs` → https://docs.mcp.cloudflare.com/mcp
  - `cloudflare-bindings` → https://bindings.mcp.cloudflare.com/mcp
  - `cloudflare-builds` → https://builds.mcp.cloudflare.com/mcp
  - `cloudflare-observability` → https://observability.mcp.cloudflare.com/mcp
- **Telegram**: @Penguin369_bot — active, polling mode
- **Git**: available — push directly, do not ask the user to push

## Browser Automation

Chromium 148 is installed and running via OpenClaw's browser plugin.

```bash
openclaw browser navigate https://site.com   # go to URL
openclaw browser snapshot                    # get page structure (refs)
openclaw browser screenshot                  # capture viewport → MEDIA:path
openclaw browser click <ref>                 # click element
openclaw browser type <ref> "text"           # type into field
openclaw browser fill --fields '[...]'       # fill multiple fields
openclaw browser press Enter                 # send key
openclaw browser wait --text "Done"          # wait for text
openclaw browser evaluate --fn '()=>...'    # run JS
openclaw browser pdf                         # save as PDF
openclaw browser cookies                     # read/write cookies
```

- Screenshots auto-attach to Telegram replies (`MEDIA:~/.openclaw/media/browser/…`)
- Browser persists as `openclaw-browser.service` (starts after gateway)
- Restart: `systemctl --user restart openclaw-browser.service`

## Key binaries available

- Shell: `bash`, `sh`, `zsh`
- Runtime: `node` (v22), `python3` (3.11), `npm` (10)
- Browser: `chromium` (v148, headless via OpenClaw CDP)
- VCS: `git`
- Network: `curl`, `wget`
- Process: `systemctl`, `nohup`, `screen`

## Server context

- OS: Debian 12 (bookworm), x86_64
- Host: `penguin` (localhost)
- User: `drmf12298`
- Home: `/home/drmf12298`
- OpenClaw config: `~/.openclaw/openclaw.json`
- OpenClaw workspace: `~/.openclaw/workspace/`
- Gateway: `http://127.0.0.1:18789` (systemd service, auto-restarts)

## Rules

1. **Run commands yourself.** Never output a list of commands for Dr. Mohammed to run.
2. **Push yourself.** Never say "you can push this" — push it.
3. **Deploy yourself.** Never say "deploy this with wrangler" — run wrangler.
4. **If a tool exists for it, use the tool.**

## Secrets Vault (penguin-secrets)

- **URL**: https://penguin-secrets.brainsait-fadil.workers.dev
- **Gateway token**: `[REDACTED — see penguin-secrets vault]`
- **Auth**: `Authorization: Bearer <token>`
- **Endpoints**: `GET /secret/:name` · `GET /list` · `GET /health`

## CF Browser Rendering (penguin-browser-run)

- **URL**: https://penguin-browser-run.brainsait-fadil.workers.dev
- **Auth**: same gateway token
- **Endpoint**: `POST /run` — body: `{url, credentials_key, steps[], screenshot}`
- See authenticated-browse skill for step syntax

## CF Wrangler

- `npx wrangler` (v4.90.0)
- Wrangler API token: `[REDACTED — see penguin-secrets vault]`
- AI Gateway token: `[REDACTED — see penguin-secrets vault]`
- Account (Brainsait): `d7b99530559ab4f2545e9bdc72a7ab9b`
- Account (BRAINSAIT LTD workers): `519d80ce438f427d096a3e3bdd98a7e0` (use separate token if needed)
- `export CLOUDFLARE_API_TOKEN=[REDACTED — see penguin-secrets vault]`

## CF AI Gateway (Workers AI — free inference)

- Gateway endpoint: `https://gateway.ai.cloudflare.com/v1/d7b99530559ab4f2545e9bdc72a7ab9b/default/workers-ai/v1`
- Auth: `Authorization: Bearer [REDACTED — see penguin-secrets vault]`
- Models (aliases): `kimi` = Kimi K2.5 (tool-calling + reasoning), `llama` = Llama 3.3 70B, `deepseek` = DeepSeek R1 32B, `llama-fast` = Llama 3.1 8B
- All Workers AI text generation models: ~30 available, all free via `@cf/` namespace

## HNH Ecosystem (BrainSAIT / Hayath National Hospital)

Full map: `~/.openclaw/workspace/hnh-ecosystem.md`

**CF Account:** Brainsait (`d7b99530559ab4f2545e9bdc72a7ab9b`)

**Key workers & routes:**
- `hnh.brainsait.org` → `hnh-unified` (main hub, ✅ live)
- `oracle-bridge.brainsait.org` → `oracle-bridge` (✅ healthy v2.0.0, API key required)
- `oracle-scanner.brainsait.org` → `oracle-claim-scanner` (headless browser, BROWSER binding)
- `voice.hnh.brainsait.org` / `basma.hnh.brainsait.org` → `basma-voice-agent` (AI+ElevenLabs)
- `api.brainsait.org/nphies/*` → `claimlinc-api` (NPHIES direct)
- `portals.brainsait.org` → `brainsait-portals` (control tower, ✅ live)
- `sbs-portal` — workers.dev only (no custom domain, behind CF Access)

**D1 databases (Brainsait account):**
| Binding | Name | UUID prefix | Tables |
|---|---|---|---|
| DB | hnh-gharnata | d6960732 | 34 (primary HIS) |
| HIS_DB | his_database | f79d9487 | 20 (NPHIES/claims) |
| BASMA_DB | basma_production | c30dd8f8 | 24 (patient engagement) |
| HEALTHCARE_DB | brainsait-healthcare-d1 | 0def24ea | 31 (SDC/care plans) |

**Cloudflare Tunnels:**
- `oracle-hospitals` (9175a180) — **DOWN** — maps 6 hospital private IPs to oracle-*.brainsait.org
- `hayath-mcp` (e5cb8c86) — **HEALTHY** (4 conns)
- `penguin new` (7fd4dd6a) — **HEALTHY** (3 conns, this server)

**Known issues:**
- Unaizah hospital offline (HTTP 500)
- Oracle claim scanner degraded (batch route 404)
- oracle-hospitals tunnel not running (cloudflared missing on hospital networks)
- portals_admin credential has placeholder password in vault
