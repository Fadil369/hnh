# HNH Gharnata — Unified Integration
## BrainSAIT Healthcare OS v4.0.0

**Single canonical Cloudflare Worker** serving `hnh.brainsait.org`

### Architecture
```
hnh.brainsait.org → hnh-unified (Cloudflare Worker)
  ├── GET /              Bilingual HTML shell (AR/EN)
  ├── GET /api/stats     Live hospital stats
  ├── GET /api/branches  5 branch data
  ├── /api/patients      PMI — patient registration & search
  ├── /api/appointments  OPD scheduling
  ├── /api/providers     Doctor directory
  ├── /api/eligibility   NPHIES eligibility check
  ├── /api/nphies/*      NPHIES integration hub
  ├── /api/chat          Basma AI assistant
  └── /api/claims        Claims (protected: X-API-Key)
      /api/visits         GIVC clinical encounters
      /api/orders         CPOE orders
      /api/rcm            Revenue cycle dashboard
```

### Replaces
- `hnh-portal` (frontend worker) — **removed** (was in `hnh-portal/`; merged into root worker)
- `hnh-gharnata-api` (API gateway worker) — **deprecated**

### Repo layout
```
.
├── worker.js, wrangler.toml      Canonical hnh-unified worker (root)
├── index.html                    Marketing landing (GitHub Pages)
├── apps/
│   ├── frontend/                 Next.js app (built to apps/frontend/out, served via [site] bucket)
│   └── site/                     Static info site (merged from former site/ + hnh-site/)
├── workers/
│   ├── basma-portal/             bsma.elfadil.com
│   ├── basma-crm/                crm.brainsait.org
│   └── givc/                     hnh.brainsait.org/givc/* + givc.elfadil.com
├── integrations/                 External integration helpers (brainsait-voice, nphies-mirror, maillinc)
├── migrations/                   D1 SQL migrations
├── docs/                         Project documentation
├── schema.sql                    Source-of-truth D1 schema
└── .agent/                       Local agent runtime (AGENTS.md, SOUL.md, memory/)
```

### Deploy
```bash
# Set secrets (one-time)
npx wrangler secret put ORACLE_API_KEY
npx wrangler secret put API_KEY

# Deploy
npx wrangler deploy

# Smoke test
curl https://hnh-unified.brainsait-fadil.workers.dev/health
```

### D1 Database
- **Name:** `hnh-gharnata`
- **UUID:** `d6960732-d5d0-4271-84e9-ba988c9c32dc`
- **Schema:** `schema.sql`
- **Migrations:** `migrations/`
- **Architecture:** [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md)
- **Agent runtime:** [`.agent/AGENTS.md`](.agent/AGENTS.md)

### Status
- **Phase 1:** ✅ Foundation (D1, Worker, Schema)
- **Phase 2:** ✅ Core APIs (Patients, Appointments, Claims)
- **Phase 3:** ✅ Clinical (GIVC: Visits, Orders, Labs)
- **Phase 4:** ✅ AI & Voice (Basma chat)
- **Phase 5:** 🔄 Advanced (RAG, Analytics, Mobile)

---
*Facility License: 10000000000988 | Org: 624 (AlInma Medical Services)*
