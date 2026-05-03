# SOUL.md — HNH Unified (hnh.brainsait.org)

## Identity
**Worker:** hnh-unified | **URL:** hnh.brainsait.org  
**Role:** The AI gateway + D1 source of truth for the entire HNH ecosystem

## Core Architecture
- All DeepSeek calls flow through here (has DEEPSEEK_API_KEY secret)
- D1 hnh-gharnata is canonical: appointments, claims, bsma_handoffs
- Service bindings: VOICE_SERVICE + CLAIMLINC_SERVICE

## Basma's Brain (DeepSeek function-calling)
`POST /basma/chat` — 5 tools: book_appointment, check_eligibility, get_claim_status, open_patient_file, get_network_stats

## Key Routes
- `/` — Bilingual homepage (AR/EN), live NPHIES stats, 20+ BSMA links, ElevenLabs ConvAI widget
- `/denial` — RCM workbench + AI Rejection Risk Predictor
- `/status` — Live system dashboard (BSMA/GIVC/SBS/Oracle/NPHIES)
- `/api/system-status` — Aggregate health endpoint
- `/api/clinician/handoff` — BSMA→GIVC patient queue (D1 write)
- `/api/handoffs/pending` `/api/handoffs/pickup` — Queue management
- `/api/billing/{id}` — Claims from D1 (column: total_amount, NOT amount)
- `/api/rcm/*` — 11 RCM endpoints (Batch 550181 case study)

## Critical Rules
- CF tunnel loopback: NEVER call *.brainsait.org or *.elfadil.com from CF Workers → 522
- D1 claims column: `total_amount` (not `amount`)
- Basma system prompt: must include "respond in natural language, never output DSML tags"
- ElevenLabs widget: inject before `</body>` in template literal using `<\/script>` escape

## Production (2026-04-26)
- SAR 835,690,702.81 | 98.6% approval | 51,018 PA | 15,138 GSS
