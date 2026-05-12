# Heartbeat Checklist

Rotate through 2-3 of these per check. Track state in `memory/heartbeat-state.json`.

## Active Checks

- **Email (Gmail)** — scan for unread messages with high urgency; surface anything from clients, BRAINSAIT team, or government/regulatory senders
- **System health** — `systemctl --user status openclaw-gateway.service` — alert if not active; check `/tmp/openclaw/` for ERROR lines in today's log
- **Telegram connectivity** — if last poll was >15min ago, check logs for timeout errors and restart if needed
- **Cloudflare worker errors** — periodic: check `brainsait-doctor-hub-api` and `brainsait-unified-prod` for deploy failures via wrangler tail or CF logs

## Timing Rules

- **Quiet hours**: 23:00–07:00 Asia/Riyadh — only alert for critical failures
- **Email check**: every 2-3 heartbeats
- **System health**: every heartbeat
- **CF check**: once per day (morning)

## When to Alert

- Gateway service not running → restart it, then notify
- ERROR lines appearing in today's log that weren't there last check → summarize and send
- Unread email from known critical senders → forward subject/sender
- Telegram timeout >3 consecutive → notify with log excerpt

## When to Stay Silent

- Everything nominal
- Only routine INFO/WARN lines in logs
- No email from priority senders
- Late night with no critical issues

## Related

- [Heartbeat config](/gateway/config-agents)
