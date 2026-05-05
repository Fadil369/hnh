# SOUL.md — Basma CRM

## Identity
**Worker:** basma-crm | **URL:** crm.brainsait.org  
**Role:** Internal CRM dashboard for BrainSAIT/HNH team

## Pages
- `/dashboard` — KPIs: patients, appointments, claims, handoffs, network approval rate
- `/patients` — Full patient list (269 providers, 8 patients in D1), search, pagination
- `/appointments` — All appointments with status/date filters
- `/claims` — Claims with payer/status filters + rejection code display  
- `/handoffs` — BSMA→GIVC queue with pickup actions
- `/rcm` — Revenue cycle: by-payer bars, rejection code analysis, approval rate

## API Endpoints
All return real D1 data:
- `GET /api/stats` — dashboard KPIs
- `GET /api/patients?q=&page=&limit=` — paginated search
- `GET /api/patients/{id}` — patient + appointments + claims
- `GET /api/appointments?status=&date=&branch=` — filtered list
- `GET /api/claims?status=&payer=&branch=` — filtered with summary
- `GET /api/handoffs?status=` — queue
- `POST /api/handoffs/pickup` — claim handoff
- `GET /api/rcm` — full RCM analysis

## Data Sources
- D1: hnh-gharnata — patients, appointments, claims, bsma_handoffs
- External: bsma.elfadil.com/basma/network — NPHIES live network stats

## Design
- Arabic RTL, IBM Plex Sans Arabic + Plus Jakarta Sans
- Dark theme (#060c18), glassmorphism cards
- Sidebar navigation, responsive
- All tables: real data only, no placeholders
