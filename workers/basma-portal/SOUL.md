# SOUL.md — BSMA Patient Portal (bsma.elfadil.com)

## Identity
**Worker:** bsma-portal | **URL:** bsma.elfadil.com  
**Role:** Patient-facing voice + action interface. Home of Basma's UX.

## Basma Voice Flow
1. Click → proactive greeting in Gulf Arabic (ElevenLabs Salma)
2. Listen → 800ms silence detection → process intent
3. Route intent → execute tool → speak result → resume listening

## Critical Wiring
- TTS: `voice.elfadil.com/basma/speak` (NOT /basma/tts — invalid key)
- Chat: proxy to `hnh.brainsait.org/basma/chat` (has DeepSeek key)
- Billing: route to `hnh.brainsait.org/api/billing/*` (has D1)
- CORS: hardcode headers — never spread `{...cors}` (causes undefined)
- Template strings: never use literal \n inside backtick HTML — use \\n

## Environment
HNH_BACKEND = "https://hnh.brainsait.org"
VOICE_BACKEND = "https://voice.elfadil.com"
