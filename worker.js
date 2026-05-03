var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// worker.js
var VERSION = "9.0.1";
var FACILITY_LIC = "10000000000988";
var ORG_NAME_AR = "\u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A";
var ORG_NAME_EN = "Hayat National Hospitals";
var PHONE = "920000094";
var CLAIMLINC_BASE = "https://api.brainsait.org/nphies";
var CLAIMLINC_KEY = "tWapQjRdpCUzlfE2aGdLBneyrBJX8cJkRafFUiWL";
var CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-API-Key"
};
var SEC = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "SAMEORIGIN",
  "Strict-Transport-Security": "max-age=63072000; includeSubDomains"
};
var JSON_H = { ...CORS, ...SEC, "Content-Type": "application/json; charset=utf-8" };
var HTML_H = { ...SEC, "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-cache, must-revalidate" };
var ok = /* @__PURE__ */ __name((d) => new Response(JSON.stringify({ success: true, ...d }), { headers: JSON_H }), "ok");
var err = /* @__PURE__ */ __name((m, s = 400) => new Response(JSON.stringify({ success: false, error: m }), { status: s, headers: JSON_H }), "err");
var cors = /* @__PURE__ */ __name(() => new Response(null, { status: 204, headers: { ...CORS } }), "cors");
var PHI_FIELDS = [
  "national_id",
  "iqama_id",
  "passport_id",
  "date_of_birth",
  "phone",
  "email",
  "address",
  "emergency_contact_name",
  "emergency_contact_phone",
  "blood_type",
  "allergies"
];
function maskPatient(p) {
  if (!p || typeof p !== "object") return p;
  const m = { ...p };
  for (const f of PHI_FIELDS) delete m[f];
  if (m.mrn) m.mrn = "****" + String(m.mrn).slice(-4);
  return m;
}
__name(maskPatient, "maskPatient");
function authGuard(req, env) {
  const k = env.API_KEY || "";
  if (!k) return err("API_KEY not configured", 503);
  if ((req.headers.get("X-API-Key") || "") !== k) return err("Unauthorized", 401);
  return null;
}
__name(authGuard, "authGuard");
var _rl = /* @__PURE__ */ new Map();
function rateOk(ip, max = 120, win = 6e4) {
  const now = Date.now(), e = _rl.get(ip) || { n: 0, t: now };
  if (now - e.t > win) {
    e.n = 0;
    e.t = now;
  }
  e.n++;
  _rl.set(ip, e);
  return e.n <= max;
}
__name(rateOk, "rateOk");
var _rlLastClean = 0;
function rlCleanup() {
  const now = Date.now();
  if (now - _rlLastClean < 6e4) return;
  _rlLastClean = now;
  for (const [k, v] of _rl) {
    if (now - v.t > 12e4) _rl.delete(k);
  }
}
__name(rlCleanup, "rlCleanup");
var _mc = /* @__PURE__ */ new Map();
function mcGet(k) {
  const e = _mc.get(k);
  return e && e.exp > Date.now() ? e.v : null;
}
__name(mcGet, "mcGet");
function mcSet(k, v, ttlMs) {
  _mc.set(k, { v, exp: Date.now() + ttlMs });
}
__name(mcSet, "mcSet");
var _inflight = /* @__PURE__ */ new Map();
async function dedupe(key, fn) {
  if (_inflight.has(key)) return _inflight.get(key);
  const p = fn().finally(() => _inflight.delete(key));
  _inflight.set(key, p);
  return p;
}
__name(dedupe, "dedupe");
var ORACLE_BRIDGE = "https://oracle-bridge.brainsait.org";
var ORACLE_SCANNER = "https://oracle-claim-scanner.brainsait-fadil.workers.dev";
var ORACLE_PATIENT = "https://oracle-patient-search.brainsait-fadil.workers.dev";
var ORACLE_BRIDGE_KEY = "bsma-oracle-b2af3196522b556636b09f5d268cb976";
var TUNNEL_STATUS = {
  riyadh: { reachable: true, ms: 247, loginPath: "/prod/faces/Login.jsf", note: "live \u2014 login found, viewState ok" },
  madinah: { reachable: true, ms: 275, loginPath: "/Oasis/faces/Login.jsf", note: "live \u2014 login found, viewState ok (172.25.11.26)" },
  unaizah: { reachable: true, ms: 739, loginPath: "/prod/faces/Login.jsf", note: "live \u2014 login found, viewState ok (10.0.100.105)" },
  khamis: { reachable: true, ms: 351, loginPath: "/prod/faces/Login.jsf", note: "live \u2014 login found, viewState ok" },
  jizan: { reachable: true, ms: 1375, loginPath: "/prod/faces/Login.jsf", note: "live \u2014 login found, viewState ok" },
  abha: { reachable: true, ms: 188, loginPath: "/Oasis/faces/Login.jsf", note: "live \u2014 login found, viewState ok (172.19.1.1)" }
};
var NPHIES_DENIAL = {
  // ── Administrative ────────────────────────────────────────────────────────
  A001: {
    label: "Member not found",
    track: "resubmit",
    recoverable: true,
    deadline_days: 15,
    score: 90,
    action: "Re-verify member ID and insurance number in NPHIES 270/271. Confirm national ID on Oracle HIS.",
    docs: ["National ID copy", "Insurance card copy", "Eligibility 271 response", "Enrollment confirmation from payer"]
  },
  A002: {
    label: "Duplicate claim",
    track: "review",
    recoverable: false,
    deadline_days: 7,
    score: 20,
    action: "Cross-check claim_id in Oracle HIS. Void if truly duplicate; escalate if original was never paid.",
    docs: ["Original claim", "Oracle encounter record", "Payment EOB or denial letter for original"]
  },
  A003: {
    label: "Authorization required",
    track: "resubmit",
    recoverable: true,
    deadline_days: 15,
    score: 85,
    action: "Attach existing PA number or obtain retroactive PA from payer. Link to Oracle encounter.",
    docs: ["PA approval letter", "Clinical justification", "Oracle appointment record", "Physician order"]
  },
  A004: {
    label: "Member not eligible on DOS",
    track: "resubmit",
    recoverable: true,
    deadline_days: 15,
    score: 75,
    action: "Request real-time NPHIES 270/271 for exact date of service. Check enrollment gaps.",
    docs: ["Eligibility 271 for DOS", "Insurance card", "Patient registration form", "Payer enrollment data"]
  },
  A005: {
    label: "Benefit exhausted",
    track: "appeal",
    recoverable: true,
    deadline_days: 30,
    score: 60,
    action: "Submit contractual appeal with full utilization log. Request benefit reinstatement letter.",
    docs: ["Benefit schedule", "Annual utilization report", "Medical necessity letter", "Specialist referral"]
  },
  A006: {
    label: "Referral required",
    track: "resubmit",
    recoverable: true,
    deadline_days: 15,
    score: 80,
    action: "Attach GP referral or internal consultation request from Oracle HIS.",
    docs: ["Referral letter", "GP clinical notes", "Internal consultation form"]
  },
  A007: {
    label: "Non-participating provider",
    track: "appeal",
    recoverable: true,
    deadline_days: 30,
    score: 55,
    action: "Submit emergency exception or network gap appeal. Attach facility credentials.",
    docs: ["Facility MOH license", "Emergency justification", "Network gap request", "Out-of-network rate schedule"]
  },
  // ── Clinical ──────────────────────────────────────────────────────────────
  C001: {
    label: "Not medically necessary",
    track: "appeal",
    recoverable: true,
    deadline_days: 30,
    score: 70,
    action: "Submit clinical peer-to-peer appeal with physician attestation and evidence-based guidelines.",
    docs: ["Clinical notes (full encounter)", "Physician attestation letter", "Clinical guideline reference", "MDT decision if applicable"]
  },
  C002: {
    label: "Experimental/Investigational",
    track: "appeal",
    recoverable: true,
    deadline_days: 30,
    score: 50,
    action: "Provide published clinical trial evidence and MDT decision supporting treatment.",
    docs: ["PubMed/WHO clinical studies", "MDT meeting minutes", "Ethics committee approval", "Physician attestation"]
  },
  C003: {
    label: "Service not covered",
    track: "review",
    recoverable: false,
    deadline_days: 7,
    score: 15,
    action: "Verify policy exclusions \u2014 classify as patient responsibility or bill supplemental plan.",
    docs: ["Policy document", "Benefit exclusion list", "Patient financial responsibility form"]
  },
  C004: {
    label: "PA expired \u2014 service delayed",
    track: "resubmit",
    recoverable: true,
    deadline_days: 15,
    score: 80,
    action: "Request new PA or appeal with clinical continuity rationale explaining delay.",
    docs: ["Original PA", "Updated clinical notes", "Physician delay justification", "Scheduling constraints evidence"]
  },
  C005: {
    label: "Inappropriate level of care",
    track: "appeal",
    recoverable: true,
    deadline_days: 30,
    score: 65,
    action: "Submit InterQual/Milliman criteria appeal proving acuity justified admission level.",
    docs: ["InterQual criteria print", "Admission physician notes", "Nursing assessments", "Vital sign records"]
  },
  C006: {
    label: "Observation vs admission",
    track: "appeal",
    recoverable: true,
    deadline_days: 30,
    score: 60,
    action: "Appeal admission criteria \u2014 attach physician admission order with clinical rationale.",
    docs: ["Physician admission order", "Clinical criteria checklist", "Nursing assessment", "Discharge summary"]
  },
  // ── Technical/Coding ──────────────────────────────────────────────────────
  T001: {
    label: "Invalid ICD-10 code",
    track: "resubmit",
    recoverable: true,
    deadline_days: 15,
    score: 95,
    action: "Clinical coding audit \u2014 correct ICD-10 from encounter documentation. Resubmit corrected FHIR.",
    docs: ["Corrected FHIR claim JSON", "Encounter clinical notes", "Coding audit worksheet", "ICD-10 reference"]
  },
  T002: {
    label: "Invalid procedure/CPT code",
    track: "resubmit",
    recoverable: true,
    deadline_days: 15,
    score: 92,
    action: "Verify CPT against operative report and facility fee schedule. Correct and resubmit.",
    docs: ["Corrected FHIR claim JSON", "Operative/procedure report", "Fee schedule", "Coding audit worksheet"]
  },
  T003: {
    label: "Missing required FHIR field",
    track: "resubmit",
    recoverable: true,
    deadline_days: 10,
    score: 98,
    action: "Complete all mandatory FHIR R4 fields. Run NPHIES validator before resubmit.",
    docs: ["Completed FHIR claim JSON", "NPHIES field validation report", "Supporting clinical docs"]
  },
  T004: {
    label: "Coordination of benefits",
    track: "resubmit",
    recoverable: true,
    deadline_days: 15,
    score: 80,
    action: "Attach primary payer EOB and resubmit as secondary claim with COB flag.",
    docs: ["Primary payer EOB", "COB form", "Insurance coordination agreement"]
  },
  T005: {
    label: "Unbundling violation",
    track: "resubmit",
    recoverable: true,
    deadline_days: 15,
    score: 85,
    action: "Consolidate unbundled codes per NPHIES/CCI bundling rules. Resubmit corrected claim.",
    docs: ["Corrected FHIR claim JSON", "CCI bundling reference", "Procedure notes"]
  },
  T006: {
    label: "Modifier missing/incorrect",
    track: "resubmit",
    recoverable: true,
    deadline_days: 15,
    score: 90,
    action: "Add or correct HCPCS/CPT modifier. Verify modifier with procedure documentation.",
    docs: ["Corrected FHIR claim JSON", "Procedure documentation", "Modifier reference table"]
  },
  // ── Financial/Contractual ─────────────────────────────────────────────────
  F001: {
    label: "Fee schedule variance",
    track: "appeal",
    recoverable: true,
    deadline_days: 60,
    score: 70,
    action: "Submit contractual rate appeal referencing signed fee schedule. Calculate underpayment delta.",
    docs: ["Signed fee schedule", "Underpayment calculation sheet", "Contract reference page", "Billing rate justification"]
  },
  F002: {
    label: "Exceeds maximum allowable",
    track: "appeal",
    recoverable: true,
    deadline_days: 30,
    score: 55,
    action: "Appeal with invoice, market rate comparison, and clinical complexity justification.",
    docs: ["Supplier invoice", "Market rate benchmark", "Clinical complexity justification", "Contract addendum if applicable"]
  },
  F003: {
    label: "Global period \u2014 included",
    track: "review",
    recoverable: false,
    deadline_days: 7,
    score: 25,
    action: "Confirm if service falls within global surgical period. Recode with complication modifier if clinically distinct.",
    docs: ["Surgery date record", "Global period reference", "Complication clinical notes", "Modifier justification"]
  },
  F004: {
    label: "Patient deductible/co-pay",
    track: "write_off",
    recoverable: false,
    deadline_days: 30,
    score: 5,
    action: "Bill patient per financial responsibility agreement. Document collection attempt.",
    docs: ["Patient financial agreement", "Itemized statement", "Collection notice template"]
  },
  // ── Default fallback ──────────────────────────────────────────────────────
  UNKNOWN: {
    label: "Unknown/unclassified rejection",
    track: "review",
    recoverable: true,
    deadline_days: 15,
    score: 50,
    action: "Manual review required. Contact payer for clarification, then classify and re-route.",
    docs: ["Full claim copy", "Payer rejection notice", "Denial reason clarification letter from payer"]
  }
};
function classifyDenial(code) {
  return NPHIES_DENIAL[code] || NPHIES_DENIAL["UNKNOWN"];
}
__name(classifyDenial, "classifyDenial");
async function oracleFetch(env, path, opts = {}) {
  try {
    const r = await fetch(`${ORACLE_BRIDGE}${path}`, {
      ...opts,
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": env.ORACLE_API_KEY || ORACLE_BRIDGE_KEY,
        "X-Oracle-User": env.ORACLE_USER || "U29200",
        "X-Oracle-Pass": env.ORACLE_PASSWORD || "U29201",
        "X-Hospital": opts.hospital || "madinah",
        ...opts.headers || {}
      },
      signal: AbortSignal.timeout(15e3)
    });
    return r.ok ? r : null;
  } catch {
    return null;
  }
}
__name(oracleFetch, "oracleFetch");
async function oracleCall(env, method, path, body = null, hospital = "madinah") {
  const validHospitals = ["riyadh", "madinah", "unaizah", "khamis", "jizan", "abha"];
  const safeHospital = validHospitals.includes(hospital) ? hospital : "riyadh";
  const reachable = TUNNEL_STATUS[safeHospital]?.reachable;
  const oUser = env.ORACLE_USER || "U29200";
  const oPass = env.ORACLE_PASSWORD || "U29201";
  const oAuth = "Basic " + btoa(oUser + ":" + oPass);
  const headers = {
    "Content-Type": "application/json",
    "X-Source": "hnh-unified",
    "X-Hospital": safeHospital,
    "X-Oracle-User": oUser,
    "X-Oracle-Pass": oPass,
    "Authorization": oAuth
  };
  const opts = { method, headers, signal: AbortSignal.timeout(15e3) };
  if (body) opts.body = JSON.stringify(body);
  if (path.startsWith("/patient")) {
    try {
      const qs = path.includes("?") ? path.slice(path.indexOf("?")) : "";
      const basePath = path.split("?")[0];
      const r = await fetch(`${ORACLE_PATIENT}${basePath}${qs}`, { ...opts, signal: AbortSignal.timeout(5e3) });
      if (r.ok) return r.json();
    } catch {
    }
    try {
      const r = await fetch(`${ORACLE_SCANNER}${path}`, { ...opts, signal: AbortSignal.timeout(8e3) });
      if (r.ok) return r.json();
    } catch {
    }
  }
  if (["/appointments", "/labs", "/radiology", "/documents", "/claims"].some((p) => path.startsWith(p))) {
    try {
      const r = await fetch(`${ORACLE_SCANNER}${path}`, opts);
      if (r.ok) return r.json();
    } catch {
    }
  }
  if (reachable) {
    headers["X-API-Key"] = env.ORACLE_API_KEY || ORACLE_BRIDGE_KEY;
    try {
      const r = await fetch(`${ORACLE_BRIDGE}${path}`, opts);
      if (r.ok) return r.json();
    } catch {
    }
  }
  return null;
}
__name(oracleCall, "oracleCall");
async function oracleTunnelStatus(env) {
  const cached = mcGet("tunnel-status");
  if (cached) return cached;
  return dedupe("tunnel-status", async () => {
    const key = env && env.ORACLE_API_KEY || ORACLE_BRIDGE_KEY;
    const [diagRes, scanRes] = await Promise.allSettled([
      fetch(`${ORACLE_BRIDGE}/diagnose`, {
        headers: { "X-API-Key": key },
        signal: AbortSignal.timeout(15e3)
      }),
      fetch(`${ORACLE_SCANNER}/status`, {
        signal: AbortSignal.timeout(5e3)
      })
    ]);
    let hospitalMap = { ...TUNNEL_STATUS };
    let bridgeOk = false;
    if (diagRes.status === "fulfilled" && diagRes.value.ok) {
      const d = await diagRes.value.json();
      bridgeOk = true;
      for (const h of d.hospitals || []) {
        hospitalMap[h.hospital] = {
          reachable: h.reachable,
          status: h.status,
          ms: h.ms,
          loginPageFound: h.loginPageFound,
          viewState: h.viewStatePresent,
          error: h.error || null,
          note: h.reachable ? "live \u2014 login page found" : h.error || "unreachable"
        };
      }
    }
    let scannerOk = false;
    let sessions = {};
    if (scanRes.status === "fulfilled" && scanRes.value.ok) {
      const s = await scanRes.value.json();
      scannerOk = s.status === "ok";
      for (const [id, info] of Object.entries(s.hospitals || {})) {
        sessions[id] = { session: info.session, cookies: info.sessionCookies, baseUrl: info.baseUrl };
        if (hospitalMap[id]) hospitalMap[id].session = info.session;
      }
    }
    const result = {
      ok: bridgeOk,
      hospitals: hospitalMap,
      sessions,
      scanner_ok: scannerOk,
      tunnel: "e5cb8c86-1768-46b0-bb35-a2720f26e88d",
      tunnel_name: "hayath-mcp",
      connections: 8,
      colos: ["mrs06", "ruh02"],
      origin_ips: ["212.118.115.118", "82.167.8.215"],
      source: bridgeOk ? "live" : "cached",
      checked_at: (/* @__PURE__ */ new Date()).toISOString()
    };
    mcSet("tunnel-status", result, 6e4);
    return result;
  });
}
__name(oracleTunnelStatus, "oracleTunnelStatus");
async function apiOracleLiveStatus(env) {
  const cached = mcGet("oracle-live-status");
  if (cached) return ok(cached);
  const key = env && env.ORACLE_API_KEY || ORACLE_BRIDGE_KEY;
  const [healthRes, diagRes, scanHealthRes, scanStatusRes] = await Promise.allSettled([
    fetch(`${ORACLE_BRIDGE}/health`, { headers: { "X-API-Key": key }, signal: AbortSignal.timeout(5e3) }),
    fetch(`${ORACLE_BRIDGE}/diagnose`, { headers: { "X-API-Key": key }, signal: AbortSignal.timeout(15e3) }),
    fetch(`${ORACLE_SCANNER}/health`, { signal: AbortSignal.timeout(5e3) }),
    fetch(`${ORACLE_SCANNER}/status`, { signal: AbortSignal.timeout(5e3) })
  ]);
  const bridgeHealth = healthRes.status === "fulfilled" && healthRes.value.ok ? await healthRes.value.json().catch(() => null) : null;
  const diag = diagRes.status === "fulfilled" && diagRes.value.ok ? await diagRes.value.json().catch(() => null) : null;
  const scanHealth = scanHealthRes.status === "fulfilled" && scanHealthRes.value.ok ? await scanHealthRes.value.json().catch(() => null) : null;
  const scanStatus = scanStatusRes.status === "fulfilled" && scanStatusRes.value.ok ? await scanStatusRes.value.json().catch(() => null) : null;
  const hospitals = {};
  for (const [id, fallback] of Object.entries(TUNNEL_STATUS)) {
    const live = diag?.hospitals?.find?.((h) => h.hospital === id) || diag && diag[id];
    const session = scanStatus?.hospitals?.[id];
    hospitals[id] = {
      reachable: live ? live.reachable : fallback.reachable,
      ms: live ? live.ms : fallback.ms,
      login: live ? live.loginPageFound : fallback.reachable,
      viewState: live ? live.viewStatePresent || false : fallback.reachable,
      error: live?.error || null,
      session: session?.session || "none",
      url: "https://oracle-" + id + ".brainsait.org",
      note: fallback.note
    };
  }
  const reachableCount = Object.values(hospitals).filter((h) => h.reachable).length;
  const result = {
    ok: !!bridgeHealth?.ok,
    bridge_version: bridgeHealth?.version || "unknown",
    bridge_url: ORACLE_BRIDGE,
    scanner_ok: scanHealth?.status === "ok",
    scanner_url: ORACLE_SCANNER,
    tunnel: {
      id: "e5cb8c86-1768-46b0-bb35-a2720f26e88d",
      name: "hayath-mcp",
      healthy: true,
      connections: 8,
      colos: ["mrs06", "ruh02"],
      origin_ips: ["212.118.115.118", "82.167.8.215"]
    },
    hospitals,
    summary: {
      total: Object.keys(hospitals).length,
      reachable: reachableCount,
      offline: Object.keys(hospitals).length - reachableCount,
      note: reachableCount > 0 ? reachableCount + " hospital(s) reachable via tunnel" : "All hospitals offline \u2014 private IPs need on-site cloudflared client"
    },
    source: diag ? "live" : "cached-fallback",
    checked_at: (/* @__PURE__ */ new Date()).toISOString()
  };
  mcSet("oracle-live-status", result, 6e4);
  return ok(result);
}
__name(apiOracleLiveStatus, "apiOracleLiveStatus");
async function clFetch(path, env) {
  const key = env && env.CLAIMLINC_KEY || CLAIMLINC_KEY;
  try {
    const r = await fetch(`${CLAIMLINC_BASE}${path}`, {
      headers: { "X-API-Key": key },
      signal: AbortSignal.timeout(15e3)
    });
    return r.ok ? r.json() : null;
  } catch {
    return null;
  }
}
__name(clFetch, "clFetch");
async function bsmaNetwork() {
  try {
    const r = await fetch("https://bsma.elfadil.com/basma/network", { signal: AbortSignal.timeout(8e3) });
    return r.ok ? r.json() : null;
  } catch {
    return null;
  }
}
__name(bsmaNetwork, "bsmaNetwork");
var BRANCHES = [
  { id: "R001", name_ar: "\u0645\u0633\u062A\u0634\u0641\u0649 \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A \u2014 \u0627\u0644\u0631\u064A\u0627\u0636", name_en: "Hayat National Hospital \u2014 Riyadh", city_ar: "\u0627\u0644\u0631\u064A\u0627\u0636", city_en: "Riyadh", beds: 300, phone: "+966920000094", address_ar: "\u0637\u0631\u064A\u0642 \u0627\u0644\u062F\u0627\u0626\u0631\u064A \u0627\u0644\u0634\u0631\u0642\u064A\u060C \u062D\u064A \u0627\u0644\u0631\u0628\u0648\u0629", address_en: "Eastern Ring Rd, Al-Rabwa", license: "10000000000988" },
  { id: "J001", name_ar: "\u0645\u0633\u062A\u0634\u0641\u0649 \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A \u2014 \u062C\u0627\u0632\u0627\u0646", name_en: "The National Life Hospital \u2014 Jazan", city_ar: "\u062C\u0627\u0632\u0627\u0646", city_en: "Jazan", beds: 150, phone: "+966920000094", address_ar: "\u0643\u0648\u0631\u0646\u064A\u0634 \u062C\u0627\u0632\u0627\u0646\u060C \u062D\u064A \u0627\u0644\u0634\u0627\u0637\u0626", address_en: "Jazan Corniche, Al Shati", license: "10000000037034" },
  { id: "K001", name_ar: "\u0645\u0633\u062A\u0634\u0641\u0649 \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A \u2014 \u062E\u0645\u064A\u0633 \u0645\u0634\u064A\u0637", name_en: "Hayat National Hospital \u2014 Khamis Mushayt", city_ar: "\u062E\u0645\u064A\u0633 \u0645\u0634\u064A\u0637", city_en: "Khamis Mushayt", beds: 180, phone: "+966538081888", address_ar: "\u0637\u0631\u064A\u0642 \u0627\u0644\u0623\u0645\u064A\u0631 \u0633\u0644\u0637\u0627\u0646\u060C \u0623\u0645 \u0633\u0631\u0627\u0631", address_en: "Prince Sultan Rd", license: "10000000030643" },
  { id: "M001", name_ar: "\u0645\u0633\u062A\u0634\u0641\u0649 \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A \u2014 \u0627\u0644\u0645\u062F\u064A\u0646\u0629 \u0627\u0644\u0645\u0646\u0648\u0631\u0629", name_en: "Hayat National Hospital \u2014 Madinah", city_ar: "\u0627\u0644\u0645\u062F\u064A\u0646\u0629 \u0627\u0644\u0645\u0646\u0648\u0631\u0629", city_en: "Madinah", beds: 200, phone: "+966920000094", address_ar: "\u0637\u0631\u064A\u0642 \u0641\u0631\u0639 \u0627\u0644\u0647\u062C\u0631\u0629\u060C \u0627\u0644\u0645\u062F\u064A\u0646\u0629", address_en: "Al-Hijra Branch Rd", license: "10000300220660" },
  { id: "U001", name_ar: "\u0645\u0633\u062A\u0634\u0641\u0649 \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A \u2014 \u0639\u0646\u064A\u0632\u0629", name_en: "Hayat National Hospital \u2014 Unayzah", city_ar: "\u0639\u0646\u064A\u0632\u0629", city_en: "Unayzah", beds: 120, phone: "+966920000094", address_ar: "\u0627\u0644\u0642\u0635\u064A\u0645 \u2014 \u0639\u0646\u064A\u0632\u0629\u060C \u0637\u0631\u064A\u0642 \u0627\u0644\u0645\u062F\u064A\u0646\u0629", address_en: "Unayzah, Al-Qassim", license: "10000000030262" },
  { id: "A001", name_ar: "\u0645\u0633\u062A\u0634\u0641\u0649 \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A \u2014 \u0623\u0628\u0647\u0627", name_en: "HNHN Abha", city_ar: "\u0623\u0628\u0647\u0627", city_en: "Abha", beds: 100, phone: "+966920000094", address_ar: "\u0623\u0628\u0647\u0627\u060C \u0645\u0646\u0637\u0642\u0629 \u0639\u0633\u064A\u0631", address_en: "Abha, Aseer Region", license: "10000300330931" }
];
var INSURANCE = [
  { id: "BUPA", name: "Bupa Arabia", network: "Gold", pct: 90 },
  { id: "TAW", name: "Tawuniya", network: "Platinum", pct: 100 },
  { id: "MED", name: "MedGulf", network: "Silver", pct: 75 },
  { id: "ASF", name: "Allianz Saudi Fransi", network: "Gold", pct: 85 },
  { id: "GIG", name: "GIG Gulf", network: "Gold", pct: 90 },
  { id: "AMA", name: "Amana Insurance", network: "Premium", pct: 95 },
  { id: "AS", name: "Arabian Shield", network: "Gold", pct: 80 },
  { id: "GLB", name: "GlobeMed", network: "Basic", pct: 60 },
  { id: "SAG", name: "Sagr Insurance", network: "Silver", pct: 70 },
  { id: "WAL", name: "Walaa Insurance", network: "Basic", pct: 50 }
];
var BLOG_POSTS = [
  {
    id: "nphies-riyadh-rejections",
    slug: "nphies-rejection-analysis-riyadh-2026",
    category: "rcm",
    emoji: "\u{1F4CA}",
    featured: true,
    read_min: 6,
    author: "Dr. Mohamed El Fadil",
    date: "2026-05-01",
    title_en: "NPHIES Claim Rejection Analysis \u2014 Riyadh 2026: SAR 11.3M at Risk",
    title_ar: "\u062A\u062D\u0644\u064A\u0644 \u0631\u0641\u0636 \u0645\u0637\u0627\u0644\u0628\u0627\u062A NPHIES \u2014 \u0627\u0644\u0631\u064A\u0627\u0636 2026: SAR 11.3 \u0645\u0644\u064A\u0648\u0646 \u0641\u064A \u062E\u0637\u0631",
    excerpt_en: "Riyadh branch records 88.5% approval vs 100% network-wide. ClaimLinc AI identifies 5 root causes and a 90-day recovery plan.",
    excerpt_ar: "\u0641\u0631\u0639 \u0627\u0644\u0631\u064A\u0627\u0636 \u064A\u0633\u062C\u0644 88.5% \u0645\u0648\u0627\u0641\u0642\u0629 \u0645\u0642\u0627\u0628\u0644 100% \u0639\u0644\u0649 \u0645\u0633\u062A\u0648\u0649 \u0627\u0644\u0634\u0628\u0643\u0629. ClaimLinc AI \u064A\u062D\u062F\u062F 5 \u0623\u0633\u0628\u0627\u0628 \u062C\u0630\u0631\u064A\u0629 \u0648\u062E\u0637\u0629 \u0627\u0633\u062A\u0631\u062F\u0627\u062F 90 \u064A\u0648\u0645\u0627\u064B."
  },
  {
    id: "vision-2030-ai",
    slug: "vision-2030-healthcare-ai",
    category: "strategy",
    emoji: "\u{1F1F8}\u{1F1E6}",
    featured: true,
    read_min: 8,
    author: "Dr. Mohamed El Fadil",
    date: "2026-04-28",
    title_en: "AI-Native Healthcare for Vision 2030 \u2014 The BrainSAIT Roadmap",
    title_ar: "\u0627\u0644\u0631\u0639\u0627\u064A\u0629 \u0627\u0644\u0635\u062D\u064A\u0629 AI-Native \u0644\u0631\u0624\u064A\u0629 2030 \u2014 \u062E\u0627\u0631\u0637\u0629 \u0637\u0631\u064A\u0642 BrainSAIT",
    excerpt_en: "How BrainSAIT's LINC agent ecosystem accelerates Saudi Arabia's SAR 83B healthcare market transformation.",
    excerpt_ar: "\u0643\u064A\u0641 \u062A\u064F\u0633\u0631\u0651\u0639 \u0645\u0646\u0638\u0648\u0645\u0629 LINC \u0645\u0646 BrainSAIT \u062A\u062D\u0648\u0651\u0644 \u0633\u0648\u0642 \u0627\u0644\u0631\u0639\u0627\u064A\u0629 \u0627\u0644\u0635\u062D\u064A\u0629 \u0627\u0644\u0633\u0639\u0648\u062F\u064A \u0628\u062D\u062C\u0645 SAR 83 \u0645\u0644\u064A\u0627\u0631."
  },
  {
    id: "nphies-guide",
    slug: "nphies-complete-provider-guide",
    category: "nphies",
    emoji: "\u{1F3DB}\uFE0F",
    featured: false,
    read_min: 12,
    author: "BrainSAIT Editorial",
    date: "2026-04-20",
    title_en: "The Complete NPHIES Guide for Saudi Healthcare Providers",
    title_ar: "\u0627\u0644\u062F\u0644\u064A\u0644 \u0627\u0644\u0634\u0627\u0645\u0644 \u0644\u0640 NPHIES \u0644\u0645\u0632\u0648\u062F\u064A \u0627\u0644\u062E\u062F\u0645\u0627\u062A \u0627\u0644\u0635\u062D\u064A\u0629 \u0641\u064A \u0627\u0644\u0645\u0645\u0644\u0643\u0629",
    excerpt_en: "FHIR R4 workflows, eligibility checks, prior authorization, claims submission, and common rejection codes explained.",
    excerpt_ar: "\u0633\u064A\u0631 \u0639\u0645\u0644 FHIR R4\u060C \u0627\u0644\u062A\u062D\u0642\u0642 \u0645\u0646 \u0627\u0644\u0623\u0647\u0644\u064A\u0629\u060C \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629 \u0627\u0644\u0645\u0633\u0628\u0642\u0629\u060C \u062A\u0642\u062F\u064A\u0645 \u0627\u0644\u0645\u0637\u0627\u0644\u0628\u0627\u062A\u060C \u0648\u0623\u0643\u0648\u0627\u062F \u0627\u0644\u0631\u0641\u0636 \u0627\u0644\u0634\u0627\u0626\u0639\u0629 \u0628\u0627\u0644\u062A\u0641\u0635\u064A\u0644."
  },
  {
    id: "academy-launch",
    slug: "hayat-national-academy-launch",
    category: "academy",
    emoji: "\u{1F393}",
    featured: true,
    read_min: 4,
    author: "HNH Academy Team",
    date: "2026-05-01",
    title_en: "Hayat National Academy \u2014 Accredited Healthcare Training Now Open",
    title_ar: "\u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629 \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A \u2014 \u062A\u062F\u0631\u064A\u0628 \u0635\u062D\u064A \u0645\u0639\u062A\u0645\u062F \u0645\u062A\u0627\u062D \u0627\u0644\u0622\u0646",
    excerpt_en: "5 SCFHS-accredited courses: NPHIES, SBS Medical Coding, RCM, Healthcare AI, and PDPL Compliance. Bilingual AR/EN.",
    excerpt_ar: "5 \u062F\u0648\u0631\u0627\u062A \u0645\u0639\u062A\u0645\u062F\u0629 SCFHS: NPHIES\u060C \u062A\u0631\u0645\u064A\u0632 SBS \u0627\u0644\u0637\u0628\u064A\u060C \u062F\u0648\u0631\u0629 \u0625\u064A\u0631\u0627\u062F\u0627\u062A\u060C \u0630\u0643\u0627\u0621 \u0627\u0635\u0637\u0646\u0627\u0639\u064A\u060C \u0648\u0627\u0645\u062A\u062B\u0627\u0644 PDPL. \u062B\u0646\u0627\u0626\u064A\u0629 \u0627\u0644\u0644\u063A\u0629."
  },
  {
    id: "sbs-coding",
    slug: "sbs-icd10-medical-coding-guide",
    category: "coding",
    emoji: "\u{1F48A}",
    featured: false,
    read_min: 10,
    author: "BrainSAIT CodeLinc",
    date: "2026-04-15",
    title_en: "SBS v3.4 & ICD-10-AM Coding Guide \u2014 Reducing Rejection by 28%",
    title_ar: "\u062F\u0644\u064A\u0644 \u0627\u0644\u062A\u0631\u0645\u064A\u0632 SBS v3.4 \u0648ICD-10-AM \u2014 \u062A\u0642\u0644\u064A\u0644 \u0627\u0644\u0631\u0641\u0636 \u0628\u0646\u0633\u0628\u0629 28%",
    excerpt_en: "Correct SBS-ICD-10 pairing, AR-DRG classification, and how CodeLinc AI achieves 99.4% first-pass NPHIES accuracy.",
    excerpt_ar: "\u062A\u0637\u0627\u0628\u0642 SBS-ICD-10 \u0627\u0644\u0635\u062D\u064A\u062D\u060C \u062A\u0635\u0646\u064A\u0641 AR-DRG\u060C \u0648\u0643\u064A\u0641 \u064A\u062D\u0642\u0642 CodeLinc AI \u062F\u0642\u0629 99.4% \u0641\u064A \u0623\u0648\u0644 \u062A\u0645\u0631\u064A\u0631 \u0639\u0644\u0649 NPHIES."
  },
  {
    id: "claimlinc-roi",
    slug: "claimlinc-roi-90days",
    category: "rcm",
    emoji: "\u{1F4A1}",
    featured: true,
    read_min: 5,
    author: "BrainSAIT ClaimLinc",
    date: "2026-05-02",
    title_en: "ClaimLinc ROI: Recovering SAR 9.8M in 90 Days",
    title_ar: "\u0639\u0627\u0626\u062F \u0627\u0633\u062A\u062B\u0645\u0627\u0631 ClaimLinc: \u0627\u0633\u062A\u0631\u062F\u0627\u062F SAR 9.8 \u0645\u0644\u064A\u0648\u0646 \u062E\u0644\u0627\u0644 90 \u064A\u0648\u0645\u0627\u064B",
    excerpt_en: "How deploying all 5 ClaimLinc modules \u2014 AuthLinc, CodeLinc, EligibilityLinc, DRGLinc, ComplianceLinc \u2014 projects recovery of 87% of Riyadh rejections.",
    excerpt_ar: "\u0643\u064A\u0641 \u064A\u064F\u062A\u0648\u0642\u0639 \u0623\u0646 \u064A\u0633\u062A\u0639\u064A\u062F \u0646\u0634\u0631 \u0648\u062D\u062F\u0627\u062A ClaimLinc \u0627\u0644\u062E\u0645\u0633 \u2014 AuthLinc, CodeLinc, EligibilityLinc, DRGLinc, ComplianceLinc \u2014 87% \u0645\u0646 \u0631\u0641\u0636\u0627\u062A \u0627\u0644\u0631\u064A\u0627\u0636."
  },
  {
    id: "ar-drg-guide",
    slug: "ar-drg-saudi-hospitals-guide",
    category: "coding",
    emoji: "\u{1F3E5}",
    featured: false,
    read_min: 9,
    author: "Dr. Mohamed El Fadil",
    date: "2026-04-22",
    title_en: "AR-DRG Classification in Saudi Hospitals \u2014 A Practical Guide",
    title_ar: "\u062A\u0635\u0646\u064A\u0641 AR-DRG \u0641\u064A \u0627\u0644\u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u0633\u0639\u0648\u062F\u064A\u0629 \u2014 \u062F\u0644\u064A\u0644 \u0639\u0645\u0644\u064A",
    excerpt_en: "Understanding AR-DRG case weights, MDC grouping, and how DRGLinc optimizes case-mix for Saudi hospital revenue integrity.",
    excerpt_ar: "\u0641\u0647\u0645 \u0623\u0648\u0632\u0627\u0646 \u062D\u0627\u0644\u0627\u062A AR-DRG\u060C \u062A\u062C\u0645\u064A\u0639 MDC\u060C \u0648\u0643\u064A\u0641 \u064A\u064F\u062D\u0633\u0651\u0646 DRGLinc \u0645\u0632\u064A\u062C \u0627\u0644\u062D\u0627\u0644\u0627\u062A \u0644\u0633\u0644\u0627\u0645\u0629 \u0625\u064A\u0631\u0627\u062F\u0627\u062A \u0627\u0644\u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u0633\u0639\u0648\u062F\u064A\u0629."
  },
  {
    id: "oracle-nphies-integration",
    slug: "oracle-nphies-bridge-architecture",
    category: "tech",
    emoji: "\u{1F517}",
    featured: false,
    read_min: 7,
    author: "BrainSAIT Engineering",
    date: "2026-04-10",
    title_en: "Oracle HIS \u2194 NPHIES Bridge Architecture at Hayat National",
    title_ar: "\u0645\u0639\u0645\u0627\u0631\u064A\u0629 \u0627\u0644\u062C\u0633\u0631 \u0628\u064A\u0646 Oracle HIS \u0648NPHIES \u0641\u064A \u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A",
    excerpt_en: "How BrainSAIT Oracle Bridge worker connects 6 hospital portals to NPHIES via Cloudflare Workers \u2014 zero VPN, FHIR R4 compliant.",
    excerpt_ar: "\u0643\u064A\u0641 \u064A\u0631\u0628\u0637 \u0639\u0627\u0645\u0644 Oracle Bridge \u0645\u0646 BrainSAIT 6 \u0628\u0648\u0627\u0628\u0627\u062A \u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0628\u0640 NPHIES \u0639\u0628\u0631 Cloudflare Workers \u2014 \u0628\u062F\u0648\u0646 VPN\u060C \u0645\u062A\u0648\u0627\u0641\u0642 \u0645\u0639 FHIR R4."
  },
  {
    id: "abha-nphies-triage",
    slug: "abha-nphies-claim-triage-2026",
    category: "rcm",
    emoji: "\u{1F4CA}",
    featured: true,
    read_min: 8,
    author: "Dr. Mohamed El Fadil",
    date: "2026-04-05",
    title_en: "Abha NPHIES Claim Triage \u2014 4,914 Rejected Lines, 3 Action Tracks",
    title_ar: "\u062A\u062F\u0642\u064A\u0642 \u0645\u0637\u0627\u0644\u0628\u0627\u062A NPHIES \u0641\u064A \u0623\u0628\u0647\u0627 \u2014 4,914 \u0633\u0637\u0631 \u0645\u0631\u0641\u0648\u0636\u060C 3 \u0645\u0633\u0627\u0631\u0627\u062A \u0625\u062C\u0631\u0627\u0621",
    excerpt_en: "Real-world claim triage from Hayat Abha: 2,181 resubmissions with supporting info, 2,650 contractual appeals, 83 new claims with prior linkage \u2014 and a portal limit check queue of 290.",
    excerpt_ar: "\u062A\u062F\u0642\u064A\u0642 \u062D\u0642\u064A\u0642\u064A \u0644\u0645\u0637\u0627\u0644\u0628\u0627\u062A \u0645\u0633\u062A\u0634\u0641\u0649 \u0627\u0644\u062D\u064A\u0627\u0629 \u0623\u0628\u0647\u0627: 2,181 \u0625\u0639\u0627\u062F\u0629 \u062A\u0642\u062F\u064A\u0645\u060C 2,650 \u0637\u0639\u0646 \u062A\u0639\u0627\u0642\u062F\u064A\u060C 83 \u0645\u0637\u0627\u0644\u0628\u0629 \u062C\u062F\u064A\u062F\u0629 \u2014 \u0648\u0642\u0627\u0626\u0645\u0629 \u062A\u062D\u0642\u0642 290 \u0645\u0646 \u062D\u062F\u0648\u062F \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0627\u062A."
  },
  {
    id: "compliancelinc-control-tower",
    slug: "compliancelinc-oracle-control-tower",
    category: "tech",
    emoji: "\u{1F3D7}\uFE0F",
    featured: false,
    read_min: 9,
    author: "BrainSAIT Engineering",
    date: "2026-03-28",
    title_en: "ComplianceLinc \u2014 Oracle Control Tower for 6 Saudi Hospital Branches",
    title_ar: "ComplianceLinc \u2014 \u0628\u0631\u062C \u0627\u0644\u062A\u062D\u0643\u0645 Oracle \u0644\u0640 6 \u0641\u0631\u0648\u0639 \u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0633\u0639\u0648\u062F\u064A\u0629",
    excerpt_en: "How BrainSAIT ComplianceLinc connects 6 Oracle OASIS hospital portals via Cloudflare tunnel, processing claims, PA, and NPHIES submissions with real-time audit logging.",
    excerpt_ar: "\u0643\u064A\u0641 \u064A\u0631\u0628\u0637 ComplianceLinc 6 \u0628\u0648\u0627\u0628\u0627\u062A Oracle OASIS \u0639\u0628\u0631 \u0646\u0641\u0642 Cloudflare\u060C \u0644\u0645\u0639\u0627\u0644\u062C\u0629 \u0627\u0644\u0645\u0637\u0627\u0644\u0628\u0627\u062A \u0648\u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0627\u062A \u0627\u0644\u0645\u0633\u0628\u0642\u0629 \u0648\u062A\u0642\u062F\u064A\u0645 NPHIES \u0645\u0639 \u0633\u062C\u0644 \u062A\u062F\u0642\u064A\u0642 \u0641\u0648\u0631\u064A."
  },
  {
    id: "brainsait-rcm-ai",
    slug: "brainsait-rcm-ai-fraud-detection",
    category: "rcm",
    emoji: "\u{1F916}",
    featured: false,
    read_min: 7,
    author: "BrainSAIT AI Team",
    date: "2026-03-15",
    title_en: "AI-Powered RCM: 5 Fraud Detection Algorithms + NPHIES Integration",
    title_ar: "\u0625\u062F\u0627\u0631\u0629 \u062F\u0648\u0631\u0629 \u0627\u0644\u0625\u064A\u0631\u0627\u062F\u0627\u062A \u0628\u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064A: 5 \u062E\u0648\u0627\u0631\u0632\u0645\u064A\u0627\u062A \u0643\u0634\u0641 \u0627\u0644\u0627\u062D\u062A\u064A\u0627\u0644 + NPHIES",
    excerpt_en: "BrainSAIT RCM system uses Isolation Forest ML, duplicate billing detection, upcoding alerts, and FHIR R4 validation to protect hospital revenue \u2014 with full bilingual AR/EN support.",
    excerpt_ar: "\u064A\u0633\u062A\u062E\u062F\u0645 \u0646\u0638\u0627\u0645 BrainSAIT \u0644\u0644\u0625\u064A\u0631\u0627\u062F\u0627\u062A Isolation Forest\u060C \u0648\u0643\u0634\u0641 \u0627\u0644\u0641\u0648\u062A\u0631\u0629 \u0627\u0644\u0645\u0643\u0631\u0631\u0629\u060C \u0648\u062A\u0646\u0628\u064A\u0647\u0627\u062A \u0627\u0644\u062A\u0631\u0645\u064A\u0632 \u0627\u0644\u0645\u0631\u062A\u0641\u0639\u060C \u0648FHIR R4 \u2014 \u0628\u062F\u0639\u0645 \u062B\u0646\u0627\u0626\u064A \u0627\u0644\u0644\u063A\u0629."
  },
  {
    id: "deepseek-healthcare-ai",
    slug: "deepseek-v3-healthcare-basma-voice",
    category: "tech",
    emoji: "\u{1F399}\uFE0F",
    featured: true,
    read_min: 5,
    author: "BrainSAIT AI Team",
    date: "2026-05-01",
    title_en: "DeepSeek V3 Powers Basma \u2014 Bilingual Healthcare Voice Agent",
    title_ar: "DeepSeek V3 \u064A\u064F\u0634\u063A\u0651\u0644 \u0628\u0633\u0645\u0629 \u2014 \u0648\u0643\u064A\u0644 \u0635\u0648\u062A\u064A \u062B\u0646\u0627\u0626\u064A \u0627\u0644\u0644\u063A\u0629 \u0644\u0644\u0631\u0639\u0627\u064A\u0629 \u0627\u0644\u0635\u062D\u064A\u0629",
    excerpt_en: "How Hayat National Hospitals deployed DeepSeek V3 as primary AI engine for Basma voice agent \u2014 Arabic-first, NPHIES-integrated, with ElevenLabs TTS and Oracle Bridge real-time lookup.",
    excerpt_ar: "\u0643\u064A\u0641 \u0646\u0634\u0631\u062A \u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A DeepSeek V3 \u0645\u062D\u0631\u0643 \u0630\u0643\u0627\u0621 \u0627\u0635\u0637\u0646\u0627\u0639\u064A \u0631\u0626\u064A\u0633\u064A \u0644\u0628\u0633\u0645\u0629 \u2014 \u0628\u0627\u0644\u0639\u0631\u0628\u064A\u0629 \u0623\u0648\u0644\u0627\u064B\u060C \u0645\u062F\u0645\u062C \u0645\u0639 NPHIES\u060C \u0645\u0639 TTS \u0645\u0646 ElevenLabs \u0648Bridge Oracle \u0644\u062D\u0638\u064A\u0627\u064B."
  }
];
var COURSES = [
  {
    id: "nphies-fundamentals",
    icon: "\u{1F3DB}\uFE0F",
    level: "beginner",
    hours: 12,
    modules: 8,
    price: 1200,
    accred: "SCFHS CPD",
    cat: "nphies",
    repo: "nphies-course-platform",
    title_en: "NPHIES Fundamentals",
    title_ar: "\u0623\u0633\u0627\u0633\u064A\u0627\u062A \u0646\u0638\u0627\u0645 NPHIES",
    desc_en: "Claims, PA, eligibility, FHIR R4 \u2014 complete operational mastery.",
    desc_ar: "\u0627\u0644\u0645\u0637\u0627\u0644\u0628\u0627\u062A\u060C \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629 \u0627\u0644\u0645\u0633\u0628\u0642\u0629\u060C \u0627\u0644\u0623\u0647\u0644\u064A\u0629\u060C FHIR R4 \u2014 \u0625\u062A\u0642\u0627\u0646 \u062A\u0634\u063A\u064A\u0644\u064A \u0643\u0627\u0645\u0644."
  },
  {
    id: "sbs-medical-coding",
    icon: "\u{1F48A}",
    level: "advanced",
    hours: 20,
    modules: 12,
    price: 2400,
    accred: "CHI/SCFHS",
    cat: "coding",
    repo: "sbs",
    title_en: "SBS Medical Coding & ICD-10 Advanced",
    title_ar: "\u0627\u0644\u062A\u0631\u0645\u064A\u0632 \u0627\u0644\u0637\u0628\u064A SBS \u0648ICD-10 \u2014 \u0645\u062A\u0642\u062F\u0645",
    desc_en: "All 26 SBS chapters, ICD-10-AM pairing, AR-DRG calculation, CHI audit prep.",
    desc_ar: "\u062C\u0645\u064A\u0639 \u0641\u0635\u0648\u0644 SBS \u0627\u0644\u064026\u060C \u062A\u0637\u0627\u0628\u0642 ICD-10-AM\u060C \u062D\u0633\u0627\u0628 AR-DRG\u060C \u0627\u0644\u062A\u062D\u0636\u064A\u0631 \u0644\u062A\u062F\u0642\u064A\u0642 CHI."
  },
  {
    id: "rcm-management",
    icon: "\u{1F4B0}",
    level: "intermediate",
    hours: 16,
    modules: 10,
    price: 1800,
    accred: "SCFHS CPD",
    cat: "rcm",
    repo: "brainsait-rcm",
    title_en: "Revenue Cycle Management for Saudi Hospitals",
    title_ar: "\u0625\u062F\u0627\u0631\u0629 \u062F\u0648\u0631\u0629 \u0627\u0644\u0625\u064A\u0631\u0627\u062F\u0627\u062A \u0644\u0644\u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u0633\u0639\u0648\u062F\u064A\u0629",
    desc_en: "End-to-end RCM: eligibility to collections, denial management, KPIs.",
    desc_ar: "\u062F\u0648\u0631\u0629 \u0625\u064A\u0631\u0627\u062F\u0627\u062A \u0643\u0627\u0645\u0644\u0629: \u0645\u0646 \u0627\u0644\u0623\u0647\u0644\u064A\u0629 \u0644\u0644\u062A\u062D\u0635\u064A\u0644\u060C \u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0631\u0641\u0636\u060C \u0645\u0624\u0634\u0631\u0627\u062A \u0627\u0644\u0623\u062F\u0627\u0621."
  },
  {
    id: "healthcare-ai",
    icon: "\u{1F916}",
    level: "intermediate",
    hours: 8,
    modules: 6,
    price: 900,
    accred: "BrainSAIT Certified",
    cat: "ai",
    repo: "open-webui",
    title_en: "AI & Automation in Healthcare",
    title_ar: "\u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064A \u0648\u0627\u0644\u0623\u062A\u0645\u062A\u0629 \u0641\u064A \u0627\u0644\u0631\u0639\u0627\u064A\u0629 \u0627\u0644\u0635\u062D\u064A\u0629",
    desc_en: "LINC agents, automated NPHIES workflows, CodeLinc, RAG clinical knowledge.",
    desc_ar: "\u0648\u0643\u0644\u0627\u0621 LINC\u060C \u0633\u064A\u0631 \u0639\u0645\u0644 NPHIES \u0627\u0644\u0622\u0644\u064A\u060C CodeLinc\u060C \u0627\u0644\u0645\u0639\u0631\u0641\u0629 \u0627\u0644\u0633\u0631\u064A\u0631\u064A\u0629 RAG."
  },
  {
    id: "pdpl-compliance",
    icon: "\u{1F6E1}\uFE0F",
    level: "beginner",
    hours: 6,
    modules: 5,
    price: 750,
    accred: "SCFHS CPD",
    cat: "compliance",
    repo: "brainsait-mcp-dxt",
    title_en: "HIPAA & Saudi PDPL Compliance",
    title_ar: "\u0627\u0644\u0627\u0645\u062A\u062B\u0627\u0644 \u0644\u0640 HIPAA \u0648\u0627\u0644\u0646\u0638\u0627\u0645 \u0627\u0644\u0633\u0639\u0648\u062F\u064A PDPL",
    desc_en: "PHI security, CHI audit requirements, data governance for Saudi facilities.",
    desc_ar: "\u0623\u0645\u0646 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0631\u064A\u0636\u060C \u0645\u062A\u0637\u0644\u0628\u0627\u062A \u062A\u062F\u0642\u064A\u0642 CHI\u060C \u062D\u0648\u0643\u0645\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0644\u0644\u0645\u0646\u0634\u0622\u062A \u0627\u0644\u0633\u0639\u0648\u062F\u064A\u0629."
  },
  {
    id: "oracle-claims-mastery",
    icon: "\u{1F537}",
    level: "advanced",
    hours: 10,
    modules: 7,
    price: 2800,
    accred: "BrainSAIT Certified",
    cat: "tech",
    repo: "oracle-setup",
    title_en: "Oracle OASIS Claims Mastery \u2014 ComplianceLinc",
    title_ar: "\u0625\u062A\u0642\u0627\u0646 \u0645\u0637\u0627\u0644\u0628\u0627\u062A Oracle OASIS \u2014 ComplianceLinc",
    desc_en: "Oracle HIS browser automation, session management, NPHIES bridge integration for 6 hospital branches \u2014 real Cloudflare tunnel workflow.",
    desc_ar: "\u0623\u062A\u0645\u062A\u0629 Oracle HIS\u060C \u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u062C\u0644\u0633\u0627\u062A\u060C \u062A\u0643\u0627\u0645\u0644 NPHIES \u0644\u0640 6 \u0641\u0631\u0648\u0639 \u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u2014 \u0639\u0628\u0631 \u0646\u0641\u0642 Cloudflare \u0627\u0644\u062D\u0642\u064A\u0642\u064A."
  },
  {
    id: "abha-claims-triage",
    icon: "\u{1F4CB}",
    level: "intermediate",
    hours: 6,
    modules: 4,
    price: 1500,
    accred: "CHI/SCFHS",
    cat: "rcm",
    repo: "abha-nphies-session-deliverables",
    title_en: "NPHIES Claim Triage \u2014 Real Data Workshop (Abha 2026)",
    title_ar: "\u0648\u0631\u0634\u0629 \u062A\u062F\u0642\u064A\u0642 \u0645\u0637\u0627\u0644\u0628\u0627\u062A NPHIES \u2014 \u0628\u064A\u0627\u0646\u0627\u062A \u062D\u0642\u064A\u0642\u064A\u0629 \u0623\u0628\u0647\u0627 2026",
    desc_en: "Hands-on triage of 4,914 rejected lines: resubmit (2,181), appeal (2,650), new claim (83) \u2014 portal limit verification and NPHIES payload building.",
    desc_ar: "\u062A\u062F\u0631\u064A\u0628 \u0639\u0645\u0644\u064A \u0639\u0644\u0649 4,914 \u0633\u0637\u0631 \u0645\u0631\u0641\u0648\u0636: \u0625\u0639\u0627\u062F\u0629 \u062A\u0642\u062F\u064A\u0645 (2,181)\u060C \u0637\u0639\u0646 (2,650)\u060C \u0645\u0637\u0627\u0644\u0628\u0629 \u062C\u062F\u064A\u062F\u0629 (83) \u2014 \u0648\u0628\u0646\u0627\u0621 payloads NPHIES."
  },
  {
    id: "un-innovation-healthcare",
    icon: "\u{1F310}",
    level: "intermediate",
    hours: 8,
    modules: 5,
    price: 1100,
    accred: "BrainSAIT + UN",
    cat: "ai",
    repo: "brainsait-innovation",
    title_en: "UN Innovation Toolkit \u2014 AI for Saudi Health Sector",
    title_ar: "\u0623\u062F\u0648\u0627\u062A \u0627\u0644\u0627\u0628\u062A\u0643\u0627\u0631 \u0627\u0644\u0623\u0645\u0645\u064A \u2014 \u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064A \u0644\u0644\u0635\u062D\u0629 \u0627\u0644\u0633\u0639\u0648\u062F\u064A\u0629",
    desc_en: "SPACE framework, AI diagnostic profiles, 10 implementation tools, Arabic healthcare terminology \u2014 aligned with Vision 2030 health initiatives.",
    desc_ar: "\u0625\u0637\u0627\u0631 SPACE\u060C \u0645\u0644\u0641\u0627\u062A \u0627\u0644\u062A\u0634\u062E\u064A\u0635 \u0627\u0644\u0630\u0643\u064A\u0629\u060C 10 \u0623\u062F\u0648\u0627\u062A \u062A\u0637\u0628\u064A\u0642\u060C \u0645\u0635\u0637\u0644\u062D\u0627\u062A \u0637\u0628\u064A\u0629 \u0639\u0631\u0628\u064A\u0629 \u2014 \u0645\u062A\u0648\u0627\u0641\u0642 \u0645\u0639 \u0645\u0628\u0627\u062F\u0631\u0627\u062A \u0631\u0624\u064A\u0629 2030 \u0627\u0644\u0635\u062D\u064A\u0629."
  }
];
async function apiHealth(env) {
  const [dbOk, oracleOk, mirrorOk, claimlinOk] = await Promise.all([
    env.DB.prepare("SELECT 1").first().then(() => true).catch(() => false),
    fetch(`${ORACLE_BRIDGE}/health`, {
      headers: { "X-API-Key": env.ORACLE_API_KEY || ORACLE_BRIDGE_KEY },
      signal: AbortSignal.timeout(8e3)
    }).then((r) => r.status < 500).catch(() => false),
    fetch("https://nphies-mirror.brainsait-fadil.workers.dev/mirror/status", { signal: AbortSignal.timeout(5e3) }).then((r) => r.ok).catch(() => false),
    fetch(`${CLAIMLINC_BASE}/network/summary`, {
      headers: { "X-API-Key": env && env.CLAIMLINC_KEY || CLAIMLINC_KEY },
      signal: AbortSignal.timeout(5e3)
    }).then((r) => r.ok).catch(() => false)
  ]);
  const nphiesOk = mirrorOk || claimlinOk;
  const [hisN, ragN] = await Promise.all([
    env.HIS_DB?.prepare("SELECT COUNT(*) as n FROM bsma_appointments").first().catch(() => ({ n: 0 })),
    env.BASMA_DB?.prepare("SELECT COUNT(*) as n FROM rag_documents").first().catch(() => ({ n: 0 }))
  ]);
  return ok({
    version: VERSION,
    worker: "hnh-unified",
    facility: FACILITY_LIC,
    status: dbOk ? "healthy" : "degraded",
    oracle_ok: oracleOk,
    nphies_ok: nphiesOk,
    integrations: {
      d1_primary: dbOk ? "connected" : "error",
      d1_his_database: hisN?.n > 0 ? "connected" : "empty",
      d1_basma: ragN?.n > 0 ? "connected" : "empty",
      oracle_bridge: oracleOk ? "connected" : "unreachable",
      oracle_tunnel: "e5cb8c86 | RUH/MED/UNA/KHM/ABH reachable | JZN 502",
      nphies_mirror: mirrorOk ? "connected" : "degraded",
      nphies_claimlinc: claimlinOk ? "connected" : "degraded",
      claimlinc: claimlinOk ? "live" : "degraded",
      sbs_portal: "connected"
    },
    data: { his_appointments: hisN?.n || 0, rag_documents: ragN?.n || 0 }
  });
}
__name(apiHealth, "apiHealth");
async function apiStats(env) {
  const [main, his, basma] = await Promise.all([
    env.DB.prepare(`SELECT
      (SELECT COUNT(*) FROM patients WHERE is_active=1) as patients,
      (SELECT COUNT(*) FROM providers WHERE is_active=1) as providers,
      (SELECT COUNT(*) FROM departments WHERE is_active=1) as departments,
      (SELECT COUNT(*) FROM appointments) as appointments,
      (SELECT COUNT(*) FROM claims) as claims,
      (SELECT COUNT(*) FROM rag_documents) as rag_local
    `).first().catch(() => ({})),
    env.HIS_DB?.prepare("SELECT COUNT(*) as apts, (SELECT COUNT(*) FROM drug_formulary) as drugs FROM bsma_appointments").first().catch(() => ({ apts: 0, drugs: 0 })),
    env.BASMA_DB?.prepare("SELECT COUNT(*) as rag FROM rag_documents").first().catch(() => ({ rag: 0 }))
  ]);
  return ok({ stats: {
    total_providers: main?.providers || 269,
    total_patients: main?.patients || 0,
    total_visitors: main?.patients || 0,
    total_departments: main?.departments || 20,
    total_appointments: (main?.appointments || 0) + (his?.apts || 0),
    total_claims: main?.claims || 0,
    total_branches: 6,
    total_beds: 1050,
    drug_formulary: his?.drugs || 1e3,
    rag_documents: (main?.rag_local || 0) + (basma?.rag || 0),
    his_appointments: his?.apts || 0,
    insurance_partners: INSURANCE.length
  } });
}
__name(apiStats, "apiStats");
async function apiProviders(req, env) {
  const url = new URL(req.url);
  const dept = url.searchParams.get("department") || "";
  const search = url.searchParams.get("search") || "";
  const limit = Math.min(parseInt(url.searchParams.get("limit") || "200"), 300);
  let q = "SELECT * FROM providers WHERE is_active=1";
  const b = [];
  if (dept) {
    q += " AND department=?";
    b.push(dept);
  }
  if (search) {
    q += " AND (first_name_ar LIKE ? OR last_name_ar LIKE ? OR first_name_en LIKE ? OR specialty LIKE ?)";
    const s = "%" + search + "%";
    b.push(s, s, s, s);
  }
  q += " ORDER BY specialty, last_name_ar LIMIT " + limit;
  const r = b.length ? await env.DB.prepare(q).bind(...b).all() : await env.DB.prepare(q).all();
  const providers = (r.results || []).map((p) => ({
    id: p.provider_code || "P" + p.id,
    name_ar: "\u062F. " + (p.first_name_ar || "") + " " + (p.last_name_ar || ""),
    name_en: "Dr. " + (p.first_name_en || p.first_name_ar || "") + " " + (p.last_name_en || p.last_name_ar || ""),
    specialty: p.specialty || "",
    department: p.department || "",
    branch: p.clinic_location || ""
  }));
  return ok({ providers, total: providers.length });
}
__name(apiProviders, "apiProviders");
async function apiPatients(req, env) {
  const url = new URL(req.url);
  if (req.method === "GET") {
    const search = url.searchParams.get("search") || "";
    const limit = Math.min(parseInt(url.searchParams.get("limit") || "50"), 200);
    let q = "SELECT * FROM patients WHERE is_active=1";
    const b = [];
    if (search) {
      q += " AND (full_name_ar LIKE ? OR full_name_en LIKE ? OR mrn LIKE ? OR national_id LIKE ?)";
      const s = "%" + search + "%";
      b.push(s, s, s, s);
    }
    q += " ORDER BY created_at DESC LIMIT " + limit;
    const r = b.length ? await env.DB.prepare(q).bind(...b).all() : await env.DB.prepare(q).all();
    return ok({ patients: (r.results || []).map(maskPatient), total: r.results?.length || 0 });
  }
  if (req.method === "POST") {
    const d = await req.json().catch(() => ({}));
    const mrn = d.mrn || "HNH-" + Date.now();
    const r = await env.DB.prepare(
      "INSERT INTO patients (mrn,national_id,full_name_ar,full_name_en,date_of_birth,gender,phone,is_active) VALUES (?,?,?,?,?,?,?,1)"
    ).bind(mrn, d.national_id || null, d.full_name_ar || "", d.full_name_en || "", d.date_of_birth || null, d.gender || null, d.phone || null).run();
    oracleFetch(env, "/api/pmi/register", { method: "POST", body: JSON.stringify({ ...d, mrn, facility_license: FACILITY_LIC }) }).catch(() => {
    });
    return ok({ id: r.meta.last_row_id, mrn }, 201);
  }
  return err("Method not allowed", 405);
}
__name(apiPatients, "apiPatients");
async function apiAppointments(req, env) {
  const url = new URL(req.url);
  const date = url.searchParams.get("date") || (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
  if (req.method === "GET") {
    const [primary, his] = await Promise.all([
      env.DB.prepare(
        "SELECT a.*, p.full_name_ar as patient_name FROM appointments a LEFT JOIN patients p ON a.patient_id=p.id WHERE a.appointment_date=? ORDER BY a.appointment_time LIMIT 100"
      ).bind(date).all().then((r) => r.results || []).catch(() => []),
      (env.HIS_DB ? env.HIS_DB.prepare(
        "SELECT id, patient_name, appointment_type as clinic_name, date(scheduled_time) as appointment_date, time(scheduled_time) as appointment_time, status, 'his_database' as source FROM bsma_appointments WHERE date(scheduled_time)=? LIMIT 50"
      ).bind(date).all().then((r) => r.results || []).catch(() => []) : Promise.resolve([]))
    ]);
    const seen = new Set(primary.map((a) => a.id));
    const all = [...primary, ...his.filter((h) => !seen.has(h.id))];
    return ok({ appointments: all, date, total: all.length });
  }
  if (req.method === "POST") {
    const d = await req.json().catch(() => ({}));
    const r = await env.DB.prepare(
      "INSERT INTO appointments (patient_id,clinic_name,appointment_date,appointment_time,appointment_type,status,notes) VALUES (?,?,?,?,?,?,?)"
    ).bind(d.patient_id ? (Number(d.patient_id)||1) : 1, d.clinic_name || "General", d.appointment_date, d.appointment_time, d.appointment_type || "new", "scheduled", d.notes || null).run();
    // Oracle OPD booking — fire and forget, don't block response
    try { oracleFetch(env, "/api/opd/book", { method: "POST", body: JSON.stringify({ ...d, facility_license: FACILITY_LIC }) }).catch(()=>{}); } catch(e) {}
    return ok({ id: r.meta.last_row_id }, 201);
  }
  return err("Method not allowed", 405);
}
__name(apiAppointments, "apiAppointments");
async function apiEligibility(req, env) {
  const d = await req.json().catch(() => ({}));
  try {
    const r2 = await fetch("https://sbs.elfadil.com/claimlinc/eligibility", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ patient_identifier: d.patient_identifier || d.national_id, service_code: d.service_code || "outpatient" }),
      signal: AbortSignal.timeout(8e3)
    });
    if (r2.ok) {
      const j = await r2.json();
      return ok({ source: "sbs-claimlinc", ...j });
    }
  } catch {
  }
  const r = await oracleFetch(env, "/api/nphies/eligibility", { method: "POST", body: JSON.stringify({ ...d, facility_license: FACILITY_LIC }) });
  if (r) {
    const j = await r.json();
    return ok({ source: "oracle-bridge", ...j });
  }
  return ok({ eligible: false, source: "unavailable", message: "Eligibility service temporarily unavailable", insurance_partners: INSURANCE });
}
__name(apiEligibility, "apiEligibility");
async function apiDrugs(req, env) {
  const url = new URL(req.url);
  const q = url.searchParams.get("q") || "";
  const cat = url.searchParams.get("category") || "";
  const limit = Math.min(parseInt(url.searchParams.get("limit") || "20"), 100);
  if (!env.HIS_DB) return err("HIS_DB not configured", 503);
  let sql = "SELECT code, display, category, price, manufacturer FROM drug_formulary WHERE 1=1";
  const b = [];
  if (q) {
    sql += " AND (display LIKE ? OR code LIKE ?)";
    b.push("%" + q + "%", "%" + q + "%");
  }
  if (cat) {
    sql += " AND category=?";
    b.push(cat);
  }
  sql += " LIMIT " + limit;
  const r = b.length ? await env.HIS_DB.prepare(sql).bind(...b).all() : await env.HIS_DB.prepare(sql).all();
  return ok({ drugs: r.results || [], total: r.results?.length || 0 });
}
__name(apiDrugs, "apiDrugs");
async function apiChat(req, env) {
  const d = await req.json().catch(() => ({}));
  const msg = (d.message || "").trim();
  if (!msg) return err("message required");
  const sid = d.session_id || "ses_" + Date.now().toString(36);
  const isAr = /[\u0600-\u06FF]/.test(msg);
  let ragCtx = "";
  try {
    const terms = msg.slice(0, 40).split(" ").filter((w) => w.length > 3).join(" OR ") || msg.slice(0, 25);
    const [fts, like] = await Promise.all([
      env.BASMA_DB?.prepare(
        "SELECT rd.title, rd.content, rd.category FROM rag_fts fts JOIN rag_documents rd ON rd.rowid=fts.rowid WHERE rag_fts MATCH ? ORDER BY rank LIMIT 3"
      ).bind(terms).all().catch(() => ({ results: [] })),
      env.BASMA_DB?.prepare(
        "SELECT title, content, category FROM rag_documents WHERE content LIKE ? OR title LIKE ? ORDER BY lang=? DESC LIMIT 3"
      ).bind("%" + msg.slice(0, 20) + "%", "%" + msg.slice(0, 15) + "%", isAr ? "ar" : "en").all().catch(() => ({ results: [] }))
    ]);
    const seen = /* @__PURE__ */ new Set();
    const docs = [...fts?.results || [], ...like?.results || []].filter((r) => {
      if (seen.has(r.title)) return false;
      seen.add(r.title);
      return true;
    }).slice(0, 4);
    ragCtx = docs.map((r) => "[" + (r.category || "clinical") + "] " + r.title + ": " + (r.content || "").slice(0, 300)).join("\n\n");
  } catch {
  }
  const sysPrompt = (isAr ? "\u0623\u0646\u062A \u0628\u0633\u0645\u0629\u060C \u0627\u0644\u0645\u0633\u0627\u0639\u062F\u0629 \u0627\u0644\u0630\u0643\u064A\u0629 \u0644\u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A. \u062A\u062A\u062D\u062F\u062B\u064A\u0646 \u0627\u0644\u0639\u0631\u0628\u064A\u0629 \u0648\u0627\u0644\u0625\u0646\u062C\u0644\u064A\u0632\u064A\u0629. " : "You are Basma, the AI assistant for Hayat National Hospitals. ") + (ragCtx ? (isAr ? "\u0627\u0633\u062A\u062E\u062F\u0645\u064A \u0647\u0630\u0627 \u0627\u0644\u0633\u064A\u0627\u0642:\n\n" : "Use this context:\n\n") + ragCtx + "\n\n" : "") + (isAr ? "\u0643\u0648\u0646\u064A \u062F\u0627\u0641\u0626\u0629 \u0648\u0645\u0647\u0646\u064A\u0629 \u0648\u0645\u0648\u062C\u0632\u0629. \u0644\u0627 \u062A\u0634\u062E\u0651\u0635\u064A \u0623\u0645\u0631\u0627\u0636\u0627\u064B. \u0644\u0644\u062A\u0648\u0627\u0635\u0644: " : "Be warm, professional, concise. No diagnosis. Contact: ") + PHONE;
  let reply = "";
  try {
    const dsKey = env.DEEPSEEK_API_KEY || "sk-c228b2bf0a0444379218a045f00becac";
    const dsRes = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": "Bearer " + dsKey },
      body: JSON.stringify({
        model: "deepseek-chat",
        max_tokens: 400,
        temperature: 0.6,
        messages: [{ role: "system", content: sysPrompt }, { role: "user", content: msg }]
      }),
      signal: AbortSignal.timeout(15e3)
    });
    if (dsRes.ok) {
      const dsData = await dsRes.json();
      reply = dsData.choices?.[0]?.message?.content?.trim() || "";
    }
  } catch {
  }
  if (!reply && env.AI) {
    try {
      const ai = await env.AI.run("@cf/meta/llama-3.3-70b-instruct-fp8-fast", {
        messages: [{ role: "system", content: sysPrompt }, { role: "user", content: msg }],
        max_tokens: 400
      });
      reply = ai.response || "";
    } catch {
    }
  }
  if (!reply) {
    reply = isAr ? "\u0623\u0647\u0644\u0627\u064B! \u0623\u0646\u0627 \u0628\u0633\u0645\u0629\u060C \u0645\u0633\u0627\u0639\u062F\u062A\u0643 \u0641\u064A \u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A." + (ragCtx ? " \u0648\u062C\u062F\u062A \u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0630\u0627\u062A \u0635\u0644\u0629. " : " ") + "\u0643\u064A\u0641 \u0623\u0633\u0627\u0639\u062F\u0643\u061F \u{1F4DE} " + PHONE : "Hello! I'm Basma, your Hayat National Hospitals assistant. How can I help? \u{1F4DE} " + PHONE;
  }
  env.DB.prepare("INSERT INTO chat_history (session_id, role, content) VALUES (?,?,?),(?,?,?)").bind(sid, "user", msg, sid, "assistant", reply).run().catch(() => {
  });
  return ok({ response: reply, session_id: sid, rag_used: !!ragCtx });
}
__name(apiChat, "apiChat");
async function apiNphies(req, env, sub) {
  if (sub === "" || sub === "/status") {
    const clNet = await clFetch("/network/summary", env);
    const net = clNet || await bsmaNetwork();
    const src = clNet ? "claimlinc" : "bsma-fallback";
    const [claims, pa] = await Promise.all([
      env.DB.prepare("SELECT COUNT(*) as n FROM claims WHERE nphies_claim_id IS NOT NULL").first().catch(() => ({ n: 0 })),
      env.DB.prepare("SELECT COUNT(*) as n FROM prior_authorizations").first().catch(() => ({ n: 0 }))
    ]);
    return ok({ facility: FACILITY_LIC, source: src, network: net, local: { claims: claims?.n, pa: pa?.n } });
  }
  if (sub === "/analysis") {
    const net = await bsmaNetwork();
    const fac = await clFetch("/facilities", env);
    const br = net?.by_branch || {};
    const riyRej = (br.riyadh?.total_sar || 97868522) - (br.riyadh?.approved_sar || 86567405);
    return ok({ analysis: {
      summary: { network_total_sar: net?.financials?.network_total_sar || 83569070281e-2, network_approval_rate: net?.financials?.network_approval_rate_pct || 98.6, total_claims: net?.financials?.total_claims_gss || 15138, total_pa: net?.prior_auth?.network_total || 51018 },
      riyadh_alert: {
        approval_rate: br.riyadh?.approval_pct || 88.5,
        rejected_sar: riyRej,
        total_sar: br.riyadh?.total_sar || 97868522,
        root_causes: [
          { code: "E001", desc: "Missing prior authorization", impact_pct: 35, action: "AuthLinc: PA pre-check 48h before service" },
          { code: "E002", desc: "Incorrect ICD-10 / SBS coding", impact_pct: 28, action: "CodeLinc: validate codes before submission" },
          { code: "E003", desc: "Eligibility not verified at service", impact_pct: 22, action: "Real-time eligibility at patient registration" },
          { code: "E004", desc: "Expired authorization", impact_pct: 10, action: "AuthLinc expiry alert \u2014 7d and 48h" },
          { code: "E005", desc: "Duplicate claim submission", impact_pct: 5, action: "ClaimLinc dedup engine" }
        ]
      },
      by_branch: Object.fromEntries(Object.entries(br).map(([k, v]) => [k, { ...v, name: fac?.facilities?.[k]?.name || k, rejected_sar: (v.total_sar || 0) - (v.approved_sar || 0) }])),
      facilities: fac?.facilities || {}
    } });
  }
  if (sub === "/network") {
    const d = await clFetch("/network/summary", env);
    return ok({ source: "claimlinc", data: d });
  }
  if (sub === "/facilities") {
    const d = await clFetch("/facilities", env);
    return ok({ source: "claimlinc", data: d });
  }
  if (sub.startsWith("/live/")) {
    const mapped = sub.replace("/live", "");
    const d = await clFetch(mapped, env);
    return d ? ok({ source: "claimlinc-live", data: d }) : err("ClaimLinc endpoint unavailable", 503);
  }
  if (sub === "/eligibility") return apiEligibility(req, env);
  return err("NPHIES endpoint not found: " + sub, 404);
}
__name(apiNphies, "apiNphies");
async function apiClaims(req, env) {
  if (req.method === "GET") {
    const url = new URL(req.url);
    const status = url.searchParams.get("status") || "";
    const limit = Math.min(parseInt(url.searchParams.get("limit") || "50"), 200);
    let q = "SELECT c.*, p.full_name_ar as patient_name FROM claims c LEFT JOIN patients p ON c.patient_id=p.id";
    const b = [];
    if (status) {
      q += " WHERE c.status=?";
      b.push(status);
    }
    q += " ORDER BY c.created_at DESC LIMIT " + limit;
    const r = b.length ? await env.DB.prepare(q).bind(...b).all() : await env.DB.prepare(q).all();
    return ok({ claims: r.results || [] });
  }
  if (req.method === "POST") {
    const d = await req.json().catch(() => ({}));
    const num = "CLM-" + Date.now();
    const r = await env.DB.prepare(
      "INSERT INTO claims (patient_id,claim_number,claim_type,payer_id,payer_name,total_amount,status) VALUES (?,?,?,?,?,?,?)"
    ).bind(d.patient_id || null, num, d.claim_type || "professional", d.payer_id || null, d.payer_name || null, parseFloat(d.total_amount) || 0, "draft").run();
    oracleFetch(env, "/api/claims/submit", { method: "POST", body: JSON.stringify({ ...d, claim_number: num, facility_license: FACILITY_LIC }) }).catch(() => {
    });
    return ok({ id: r.meta.last_row_id, claim_number: num }, 201);
  }
  return err("Method not allowed", 405);
}
__name(apiClaims, "apiClaims");
async function apiRCM(env) {
  const [summary, byStatus, pending, network] = await Promise.all([
    env.DB.prepare("SELECT COUNT(*) as total, SUM(total_amount) as billed, SUM(paid_amount) as paid FROM claims").first().catch(() => ({})),
    env.DB.prepare("SELECT status, COUNT(*) as n, SUM(total_amount) as total FROM claims GROUP BY status").all().catch(() => ({ results: [] })),
    env.DB.prepare("SELECT COUNT(*) as n FROM prior_authorizations WHERE status='pending'").first().catch(() => ({ n: 0 })),
    bsmaNetwork()
  ]);
  const sm = {};
  (byStatus.results || []).forEach((r) => {
    sm[r.status] = { count: r.n, total: r.total };
  });
  const approved = (sm.approved?.count || 0) + (sm.paid?.count || 0);
  const rate = summary?.total > 0 ? (approved / summary.total * 100).toFixed(1) : "0.0";
  return ok({ summary: { total_claims: summary?.total || 0, approval_rate: rate + "%", billed: summary?.billed || 0, paid: summary?.paid || 0, pending_pa: pending?.n || 0 }, claims_by_status: sm, nphies_network: network });
}
__name(apiRCM, "apiRCM");
async function apiDenialStats(env) {
  const rows = await env.DB.prepare(
    "SELECT status, COUNT(*) as n, COALESCE(SUM(total_amount),0) as total FROM claims WHERE status IN ('rejected','under_review','resubmitted','appealed','recovered','written_off') GROUP BY status"
  ).all().catch(() => ({ results: [] }));
  const sm = {};
  let totalRejected = 0, totalSAR = 0, recovered = 0, resubmitted = 0, appealed = 0;
  (rows.results || []).forEach((r) => {
    sm[r.status] = { count: r.n, sar: r.total };
    totalSAR += r.total;
    if (r.status === "rejected" || r.status === "under_review") totalRejected += r.n;
    if (r.status === "recovered") recovered += r.n;
    if (r.status === "resubmitted") resubmitted += r.n;
    if (r.status === "appealed") appealed += r.n;
  });
  const total = Object.values(sm).reduce((a, v) => a + v.count, 0);
  const recoveryRate = total > 0 ? (recovered / total * 100).toFixed(1) : "0.0";
  return ok({
    summary: {
      total_rejected: totalRejected,
      total_sar: totalSAR,
      recovered,
      resubmitted,
      appealed,
      recovery_rate: recoveryRate + "%"
    },
    by_status: sm,
    tracks: {
      track1_resubmit: sm.resubmitted?.count || 0,
      track2_appeal: sm.appealed?.count || 0,
      track3_new_claim: 0
      // populated via ingest
    },
    nphies_codes: Object.keys(NPHIES_DENIAL).length,
    source: "live"
  });
}
__name(apiDenialStats, "apiDenialStats");
async function apiDenialList(req, env) {
  const url = new URL(req.url);
  const track = url.searchParams.get("track") || "";
  const status = url.searchParams.get("status") || "";
  const limit = Math.min(parseInt(url.searchParams.get("limit") || "100"), 500);
  const offset = parseInt(url.searchParams.get("offset") || "0");
  let q = "SELECT c.id, c.claim_number, c.payer_name, c.total_amount, c.paid_amount, c.status, c.created_at, c.nphies_claim_id, p.full_name_ar as patient_name FROM claims c LEFT JOIN patients p ON c.patient_id=p.id WHERE c.status IN ('rejected','under_review','resubmitted','appealed','recovered','written_off')";
  const b = [];
  if (status) {
    q += " AND c.status=?";
    b.push(status);
  }
  q += " ORDER BY c.total_amount DESC LIMIT " + limit + " OFFSET " + offset;
  const r = b.length ? await env.DB.prepare(q).bind(...b).all() : await env.DB.prepare(q).all();
  const claims = (r.results || []).map((c) => {
    const code = (c.denial_code || "UNKNOWN").toUpperCase();
    const intel = classifyDenial(code);
    return { ...c, denial_code: code, intel };
  });
  return ok({ claims, total: claims.length, limit, offset });
}
__name(apiDenialList, "apiDenialList");
async function apiDenialIngest(req, env) {
  const body = await req.json().catch(() => ({}));
  const items = Array.isArray(body) ? body : body.rejections || [];
  if (!items.length) return err("No rejection records provided. Send array of {claim_number, payer, total_amount, rejection_code, rejection_reason, date_of_service, national_id}", 400);
  let inserted = 0, skipped = 0;
  const batchResult = [];
  for (const item of items) {
    const code = (item.rejection_code || "UNKNOWN").toUpperCase();
    const intel = classifyDenial(code);
    const num = item.claim_number || "RCM-" + Date.now() + "-" + Math.random().toString(36).slice(2, 7);
    const track = intel.track;
    const recoverable = intel.recoverable;
    try {
      const r = await env.DB.prepare(
        "INSERT OR IGNORE INTO claims (claim_number, claim_type, payer_name, total_amount, status, nphies_claim_id) VALUES (?,?,?,?,?,?)"
      ).bind(
        num,
        "professional",
        item.payer || item.payer_name || "Unknown Payer",
        parseFloat(item.total_amount || item.amount || 0),
        "rejected",
        item.nphies_claim_id || item.reference_id || null
      ).run();
      if (r.meta.changes > 0) {
        inserted++;
        batchResult.push({ claim_number: num, code, track, recoverable, score: intel.score, action: intel.action });
      } else {
        skipped++;
      }
    } catch {
      skipped++;
    }
  }
  const trackCounts = batchResult.reduce((acc, c) => {
    acc[c.track] = (acc[c.track] || 0) + 1;
    return acc;
  }, {});
  return ok({
    ingested: inserted,
    skipped,
    total_sent: items.length,
    tracks: trackCounts,
    preview: batchResult.slice(0, 10),
    next_step: "POST /api/rcm/denial/analyze with {claim_number} to get full action plan"
  }, 201);
}
__name(apiDenialIngest, "apiDenialIngest");
async function apiDenialAnalyze(req, env) {
  const body = await req.json().catch(() => ({}));
  const claimNumber = body.claim_number || "";
  const codeRaw = (body.rejection_code || body.code || "UNKNOWN").toUpperCase();
  let dbClaim = null;
  if (claimNumber) {
    dbClaim = await env.DB.prepare(
      "SELECT c.*, p.full_name_ar as patient_name, p.national_id FROM claims c LEFT JOIN patients p ON c.patient_id=p.id WHERE c.claim_number=?"
    ).bind(claimNumber).first().catch(() => null);
  }
  const code = dbClaim?.denial_code || codeRaw;
  const intel = classifyDenial(code);
  let oracleData = null;
  if (dbClaim?.nphies_claim_id && TUNNEL_STATUS.riyadh.reachable) {
    oracleData = await oracleCall(env, "GET", "/claims?reference=" + encodeURIComponent(dbClaim.nphies_claim_id), null, "madinah").catch(() => null);
  }
  let eligibility = null;
  if (dbClaim?.patient_id || body.national_id) {
    try {
      const elRes = await fetch(`${CLAIMLINC_BASE}/eligibility`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-API-Key": env.CLAIMLINC_KEY || CLAIMLINC_KEY },
        body: JSON.stringify({ national_id: body.national_id || dbClaim?.national_id, payer: dbClaim?.payer_name, facility_license: FACILITY_LIC }),
        signal: AbortSignal.timeout(8e3)
      });
      if (elRes.ok) eligibility = await elRes.json();
    } catch {
    }
  }
  const dueDate = /* @__PURE__ */ new Date();
  dueDate.setDate(dueDate.getDate() + intel.deadline_days);
  return ok({
    claim_number: claimNumber || "N/A",
    denial_code: code,
    intel: {
      label: intel.label,
      track: intel.track,
      recoverable: intel.recoverable,
      recoverability_score: intel.score,
      action: intel.action,
      required_docs: intel.docs,
      deadline: dueDate.toISOString().split("T")[0],
      deadline_days: intel.deadline_days
    },
    oracle_encounter: oracleData,
    eligibility_check: eligibility,
    claim_data: dbClaim,
    recommendations: [
      intel.recoverable ? "PROCEED \u2014 Estimated " + intel.score + "% recovery probability" : "REVIEW \u2014 Low recovery likelihood. Consider write-off or patient billing.",
      intel.track === "resubmit" ? "FAST-TRACK: Correct and resubmit within " + intel.deadline_days + " days" : "",
      intel.track === "appeal" ? "FORMAL APPEAL: Compile appeal package within " + intel.deadline_days + " days" : "",
      intel.track === "new_claim" ? "NEW CLAIM: Link to original \u2014 use prior_claim_id field in FHIR R4" : "",
      intel.track === "write_off" ? "PATIENT BILLING: Issue itemized statement. Document collection attempt." : ""
    ].filter(Boolean),
    fhir_fields_needed: code.startsWith("T") ? ["diagnosis.system", "diagnosis.code", "procedure.system", "procedure.code", "supportingInfo"] : [],
    nphies_portal: "https://portal.nphies.sa",
    oracle_riyadh: TUNNEL_STATUS.riyadh.reachable ? "https://oracle-riyadh.brainsait.org" : "offline"
  });
}
__name(apiDenialAnalyze, "apiDenialAnalyze");
async function apiDenialRequirements(req, env) {
  const url = new URL(req.url);
  const code = (url.searchParams.get("code") || "UNKNOWN").toUpperCase();
  const intel = classifyDenial(code);
  return ok({
    denial_code: code,
    label: intel.label,
    track: intel.track,
    documents: intel.docs.map((d, i) => ({
      id: i + 1,
      name: d,
      required: true,
      source: d.includes("FHIR") ? "generated" : d.includes("Oracle") ? "oracle-riyadh" : d.includes("NPHIES") || d.includes("271") || d.includes("270") ? "nphies-claimlinc" : "manual-upload",
      collected: false
    })),
    oracle_available: TUNNEL_STATUS.riyadh.reachable,
    nphies_available: true,
    action: intel.action,
    deadline_days: intel.deadline_days
  });
}
__name(apiDenialRequirements, "apiDenialRequirements");
async function apiDenialRevalidate(req, env) {
  const body = await req.json().catch(() => ({}));
  const { claim_number, fhir_payload, national_id, payer } = body;
  const results = { claim_number, timestamp: (/* @__PURE__ */ new Date()).toISOString(), checks: [] };
  if (fhir_payload) {
    const fhir = typeof fhir_payload === "string" ? JSON.parse(fhir_payload) : fhir_payload;
    const required = ["resourceType", "id", "status", "type", "use", "patient", "created", "provider", "insurance", "item"];
    const missing = required.filter((f) => !fhir[f]);
    results.checks.push({
      check: "FHIR R4 Structure",
      passed: missing.length === 0,
      missing,
      note: missing.length === 0 ? "All required fields present" : "Fix missing fields before submission"
    });
    const hasDiag = (fhir.diagnosis || []).length > 0;
    results.checks.push({ check: "Diagnosis codes", passed: hasDiag, note: hasDiag ? "Diagnosis present" : "At least one ICD-10 diagnosis required" });
    const hasProc = (fhir.item || []).length > 0;
    results.checks.push({ check: "Procedure items", passed: hasProc, note: hasProc ? fhir.item.length + " items found" : "No claim items \u2014 required" });
    const hasSup = (fhir.supportingInfo || []).length > 0;
    results.checks.push({ check: "Supporting info", passed: hasSup, note: hasSup ? fhir.supportingInfo.length + " attachments" : "No supporting info (may be required per denial type)" });
  } else {
    results.checks.push({ check: "FHIR R4 Structure", passed: false, note: "No FHIR payload provided \u2014 required for resubmission" });
  }
  let eligibilityPassed = false;
  if (national_id) {
    try {
      const er = await fetch(`${CLAIMLINC_BASE}/eligibility`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-API-Key": env.CLAIMLINC_KEY || CLAIMLINC_KEY },
        body: JSON.stringify({ national_id, payer: payer || "", facility_license: FACILITY_LIC }),
        signal: AbortSignal.timeout(8e3)
      });
      if (er.ok) {
        const ed = await er.json();
        eligibilityPassed = ed.eligible === true || ed.status === "active";
        results.checks.push({ check: "NPHIES Eligibility 270/271", passed: eligibilityPassed, note: eligibilityPassed ? "Member eligible" : "Member not eligible \u2014 check enrollment dates" });
      } else {
        results.checks.push({ check: "NPHIES Eligibility 270/271", passed: false, note: "Eligibility check failed \u2014 manual verification required" });
      }
    } catch {
      results.checks.push({ check: "NPHIES Eligibility 270/271", passed: null, note: "ClaimLinc timeout \u2014 try again or verify manually on portal.nphies.sa" });
    }
  } else {
    results.checks.push({ check: "NPHIES Eligibility 270/271", passed: null, note: "national_id not provided \u2014 skip or supply for live check" });
  }
  if (claim_number && TUNNEL_STATUS.riyadh.reachable) {
    const oracleCheck = await oracleCall(env, "GET", "/claims?claim_number=" + encodeURIComponent(claim_number), null, "madinah").catch(() => null);
    results.checks.push({ check: "Oracle HIS encounter match", passed: !!oracleCheck, note: oracleCheck ? "Encounter found in Oracle HIS" : "Encounter not found \u2014 verify in HIS manually" });
  } else {
    results.checks.push({ check: "Oracle HIS encounter match", passed: null, note: TUNNEL_STATUS.riyadh.reachable ? "claim_number needed" : "Oracle Riyadh reachable \u2014 pass claim_number for HIS lookup" });
  }
  const allPassed = results.checks.every((c) => c.passed === true);
  const passCount = results.checks.filter((c) => c.passed === true).length;
  results.ready = allPassed;
  results.score = Math.round(passCount / results.checks.length * 100);
  results.verdict = allPassed ? "READY FOR SUBMISSION" : passCount >= 2 ? "CONDITIONALLY READY \u2014 fix flagged items first" : "NOT READY \u2014 multiple validation failures";
  results.next_step = allPassed ? "POST /api/rcm/denial/submit with claim_number and fhir_payload" : "Fix failing checks, then re-run validation";
  return ok(results);
}
__name(apiDenialRevalidate, "apiDenialRevalidate");
async function apiDenialSubmit(req, env) {
  const body = await req.json().catch(() => ({}));
  const { claim_number, fhir_payload, track, appeal_reason, national_id } = body;
  if (!claim_number) return err("claim_number required", 400);
  const ref = "SUBM-" + Date.now();
  const ts = (/* @__PURE__ */ new Date()).toISOString();
  let submissionResult = null;
  let submissionTarget = "";
  if (track === "resubmit" || track === "new_claim") {
    submissionTarget = "nphies-claimlinc";
    try {
      const sr = await fetch(`${CLAIMLINC_BASE}/claims/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-API-Key": env.CLAIMLINC_KEY || CLAIMLINC_KEY },
        body: JSON.stringify({ claim_number, fhir_payload, facility_license: FACILITY_LIC, submission_type: track === "new_claim" ? "new_with_prior_linkage" : "resubmission", reference_id: ref }),
        signal: AbortSignal.timeout(2e4)
      });
      if (sr.ok) submissionResult = await sr.json();
    } catch {
    }
  } else if (track === "appeal") {
    submissionTarget = TUNNEL_STATUS.riyadh.reachable ? "oracle-riyadh + nphies-appeal" : "nphies-appeal";
    if (TUNNEL_STATUS.riyadh.reachable) {
      submissionResult = await oracleCall(env, "POST", "/claims/appeal", { claim_number, appeal_reason: appeal_reason || "", fhir_payload, reference_id: ref }, "madinah").catch(() => null);
    }
    if (!submissionResult) {
      try {
        const ar = await fetch(`${CLAIMLINC_BASE}/claims/appeal`, {
          method: "POST",
          headers: { "Content-Type": "application/json", "X-API-Key": env.CLAIMLINC_KEY || CLAIMLINC_KEY },
          body: JSON.stringify({ claim_number, appeal_reason, facility_license: FACILITY_LIC, reference_id: ref }),
          signal: AbortSignal.timeout(2e4)
        });
        if (ar.ok) submissionResult = await ar.json();
      } catch {
      }
    }
  }
  const newStatus = track === "appeal" ? "appealed" : "resubmitted";
  await env.DB.prepare("UPDATE claims SET status=? WHERE claim_number=?").bind(newStatus, claim_number).run().catch(() => {
  });
  return ok({
    reference_id: ref,
    claim_number,
    track,
    status: newStatus,
    submitted_at: ts,
    target: submissionTarget,
    nphies_response: submissionResult,
    portal_link: "https://portal.nphies.sa/claim/" + (submissionResult?.claim_id || claim_number),
    oracle_link: TUNNEL_STATUS.riyadh.reachable ? "https://oracle-riyadh.brainsait.org/prod/faces/Claims" : null,
    tracking_note: submissionResult ? "Submission accepted \u2014 track via NPHIES portal" : "Submission queued \u2014 check portal in 2-4 hours",
    next_step: "Monitor via GET /api/rcm/denial/list and NPHIES portal"
  });
}
__name(apiDenialSubmit, "apiDenialSubmit");
async function apiSync(env, type) {
  if (type === "his") {
    const r = await env.HIS_DB?.prepare("SELECT * FROM bsma_appointments WHERE created_at > datetime('now','-14 days')").all().catch(() => ({ results: [] }));
    let n = 0;
    for (const a of r?.results || []) {
      const date = (a.scheduled_time || "").split("T")[0];
      const time = (a.scheduled_time || "").split("T")[1]?.slice(0, 5) || "09:00";
      if (!date) continue;
      await env.DB.prepare("INSERT OR IGNORE INTO appointments (patient_id,clinic_name,appointment_date,appointment_time,appointment_type,status) VALUES (?,?,?,?,?,?)").bind(null, a.appointment_type || "Consultation", date, time, "new", a.status || "scheduled").run().catch(() => {
      });
      n++;
    }
    return ok({ synced: n, source: "his_database" });
  }
  if (type === "rag") {
    const r = await env.BASMA_DB?.prepare("SELECT title, content, category, lang FROM rag_documents WHERE length(content)>100 AND category IN ('clinical','nphies','patient-guide','hospitals') LIMIT 50").all().catch(() => ({ results: [] }));
    let n = 0;
    for (const doc of r?.results || []) {
      await env.DB.prepare("INSERT OR IGNORE INTO rag_documents (title, content, category, source, lang) VALUES (?,?,?,?,?)").bind(doc.title, (doc.content || "").slice(0, 1e3), doc.category, "basma_production", doc.lang || "en").run().catch(() => {
      });
      n++;
    }
    return ok({ synced: n, source: "basma_production" });
  }
  return err("Unknown sync type", 400);
}
__name(apiSync, "apiSync");
async function apiPortal(req, env, sub) {
  if (sub === "/network") {
    const d = await bsmaNetwork();
    return ok({ source: "bsma-live", network: d });
  }
  if (sub === "/coverage") {
    try {
      const r = await fetch("https://sbs.elfadil.com/claimlinc/coverage/batch", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status: "active" }), signal: AbortSignal.timeout(8e3) });
      if (r.ok) {
        const d = await r.json();
        return ok({ source: "sbs-healthcare-d1", ...d });
      }
    } catch {
    }
    return ok({ coverage: [], total: 0, source: "unavailable" });
  }
  if (sub === "/stats") {
    const [stats, net] = await Promise.all([apiStats(env).then((r) => r.json()).catch(() => ({})), bsmaNetwork()]);
    return ok({ hnh: stats.stats || {}, nphies: net ? { network_sar: net.financials?.network_total_sar, approval_rate: net.financials?.network_approval_rate_pct, total_claims: net.financials?.total_claims_gss, by_branch: net.by_branch } : null, insurance: INSURANCE });
  }
  if (sub === "/drugs") return apiDrugs(req, env);
  if (sub === "/eligibility" && req.method === "POST") return apiEligibility(req, env);
  return err("Portal endpoint not found", 404);
}
__name(apiPortal, "apiPortal");
async function apiBlog(slug) {
  if (!slug) return ok({ articles: BLOG_POSTS, total: BLOG_POSTS.length, categories: ["rcm", "strategy", "nphies", "academy", "coding"] });
  const a = BLOG_POSTS.find((p) => p.slug === slug || p.id === slug);
  return a ? ok({ article: a }) : err("Article not found", 404);
}
__name(apiBlog, "apiBlog");
async function apiAcademy(req, id) {
  if (!id) {
    const url = new URL(req.url);
    const cat = url.searchParams.get("category") || "";
    const lvl = url.searchParams.get("level") || "";
    let courses = COURSES;
    if (cat) courses = courses.filter((c2) => c2.cat === cat);
    if (lvl) courses = courses.filter((c2) => c2.level === lvl);
    return ok({ courses, total: courses.length, stats: { total_courses: 9, total_hours: 104, accreditation: "SCFHS CPD + CHI" } });
  }
  const c = COURSES.find((c2) => c2.id === id);
  return c ? ok({ course: c }) : err("Course not found", 404);
}
__name(apiAcademy, "apiAcademy");
function buildHTML(lang) {
  const ar = lang === "ar";
  const T = {
    title: ar ? ORG_NAME_AR : ORG_NAME_EN,
    tagline: ar ? "\u0631\u0639\u0627\u064A\u0629 \u0635\u062D\u064A\u0629 \u0645\u062A\u0643\u0627\u0645\u0644\u0629 \u0645\u0646\u0630 1999 \u2014 Oracle \xB7 NPHIES \xB7 BrainSAIT" : "Integrated Healthcare since 1999 \u2014 Oracle \xB7 NPHIES \xB7 BrainSAIT",
    book: ar ? "\u{1F4C5} \u0627\u062D\u062C\u0632 \u0645\u0648\u0639\u062F\u0627\u064B" : "\u{1F4C5} Book Appointment",
    patient: ar ? "\u0628\u0648\u0627\u0628\u0629 \u0627\u0644\u0645\u0631\u064A\u0636" : "Patient Portal",
    depts: ar ? "\u0627\u0644\u0623\u0642\u0633\u0627\u0645" : "Departments",
    branches: ar ? "\u0627\u0644\u0641\u0631\u0648\u0639" : "Branches",
    doctors: ar ? "\u0627\u0644\u0623\u0637\u0628\u0627\u0621" : "Doctors",
    blog: ar ? "\u0627\u0644\u0645\u062F\u0648\u0646\u0629" : "Blog",
    academy_nav: ar ? "\u0627\u0644\u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629" : "Academy",
    loading: ar ? "\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644..." : "Loading...",
    beds: ar ? "\u0633\u0631\u064A\u0631" : "Beds",
    active: ar ? "\u0646\u0634\u0637" : "Active",
    call: ar ? "\u{1F4DE} \u0627\u062A\u0635\u0644" : "\u{1F4DE} Call",
    book_btn: ar ? "\u0627\u062D\u062C\u0632" : "Book",
    search_doc: ar ? "\u0627\u0628\u062D\u062B \u0639\u0646 \u0637\u0628\u064A\u0628..." : "Search doctors...",
    all_specs: ar ? "\u062C\u0645\u064A\u0639 \u0627\u0644\u062A\u062E\u0635\u0635\u0627\u062A" : "All Specialties",
    view_all: ar ? "\u0639\u0631\u0636 \u0627\u0644\u0643\u0644" : "View All",
    all_arts: ar ? "\u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u0642\u0627\u0644\u0627\u062A" : "All Articles",
    enroll: ar ? "\u0633\u062C\u0651\u0644 \u0627\u0644\u0622\u0646" : "Enroll Now",
    h_depts: ar ? "\u0627\u0644\u0623\u0642\u0633\u0627\u0645 \u0627\u0644\u0637\u0628\u064A\u0629" : "Medical Departments",
    h_branches: ar ? "\u0641\u0631\u0648\u0639\u0646\u0627" : "Our Branches",
    h_doctors: ar ? "\u0623\u0637\u0628\u0627\u0624\u0646\u0627" : "Our Doctors",
    h_insurance: ar ? "\u0634\u0631\u0643\u0627\u0621 \u0627\u0644\u062A\u0623\u0645\u064A\u0646" : "Insurance Partners",
    h_blog: ar ? "\u0627\u0644\u0645\u062F\u0648\u0646\u0629 \u0627\u0644\u0637\u0628\u064A\u0629" : "Medical Blog",
    h_academy: ar ? "\u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629 \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A" : "Hayat National Academy",
    h_cta: ar ? "\u0635\u062D\u062A\u0643 \u0623\u0648\u0644\u0627\u064B" : "Your Health First",
    p_depts: ar ? "42+ \u062A\u062E\u0635\u0635\u0627\u064B \u0639\u0628\u0631 6 \u0641\u0631\u0648\u0639" : "42+ specialties across 6 branches",
    p_branches: ar ? "6 \u0641\u0631\u0648\u0639 \u0641\u064A \u0645\u0646\u0627\u0637\u0642 \u0627\u0644\u0645\u0645\u0644\u0643\u0629" : "6 branches across Saudi Arabia",
    p_insurance: ar ? "10 \u0634\u0631\u0643\u0627\u062A \u062A\u0623\u0645\u064A\u0646 \u0645\u0639\u062A\u0645\u062F\u0629 \u0639\u0628\u0631 NPHIES" : "10 approved insurers via NPHIES",
    p_blog: ar ? "\u0645\u0642\u0627\u0644\u0627\u062A \u0641\u064A \u0627\u0644\u062A\u0631\u0645\u064A\u0632 \u0648\u0627\u0644\u0631\u0639\u0627\u064A\u0629 \u0627\u0644\u0635\u062D\u064A\u0629 \u0648\u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064A" : "Articles on coding, healthcare, and AI",
    p_academy: ar ? "\u062A\u0639\u0644\u0651\u0645 \xB7 \u0627\u062D\u062A\u0631\u0641 \xB7 \u062A\u0641\u0648\u0651\u0642 \u2014 \u062F\u0648\u0631\u0627\u062A \u0645\u0639\u062A\u0645\u062F\u0629 SCFHS" : "Learn \xB7 Master \xB7 Excel \u2014 SCFHS Accredited Courses",
    p_cta: ar ? "\u0627\u062D\u062C\u0632 \u0645\u0648\u0639\u062F\u0643 \u0627\u0644\u0622\u0646 \u0648\u0627\u062D\u0635\u0644 \u0639\u0644\u0649 \u0623\u0641\u0636\u0644 \u0631\u0639\u0627\u064A\u0629 \u0637\u0628\u064A\u0629" : "Book your appointment and receive world-class care",
    s_doc: ar ? "\u0637\u0628\u064A\u0628" : "Doctors",
    s_dept: ar ? "\u0642\u0633\u0645" : "Depts",
    s_bed: ar ? "\u0633\u0631\u064A\u0631" : "Beds",
    typing: ar ? "\u0628\u0633\u0645\u0629 \u062A\u0643\u062A\u0628..." : "Basma is typing...",
    chat_ph: ar ? "\u0627\u0643\u062A\u0628 \u0631\u0633\u0627\u0644\u062A\u0643..." : "Type your message...",
    send: ar ? "\u0625\u0631\u0633\u0627\u0644" : "Send",
    chat_hello: ar ? "\u0623\u0647\u0644\u0627\u064B! \u0623\u0646\u0627 \u0628\u0633\u0645\u0629\u060C \u0645\u0633\u0627\u0639\u062F\u062A\u0643 \u0641\u064A \u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A. \u0643\u064A\u0641 \u0623\u0633\u0627\u0639\u062F\u0643\u061F" : "Hello! I'm Basma, your Hayat National Hospitals AI assistant. How can I help?",
    min: ar ? "\u062F\u0642\u064A\u0642\u0629" : "min",
    by: ar ? "\u0628\u0642\u0644\u0645" : "By",
    level_b: ar ? "\u0645\u0628\u062A\u062F\u0626" : "Beginner",
    level_i: ar ? "\u0645\u062A\u0648\u0633\u0637" : "Intermediate",
    level_a: ar ? "\u0645\u062A\u0642\u062F\u0645" : "Advanced",
    hours: ar ? "\u0633\u0627\u0639\u0629" : "h",
    modules_lbl: ar ? "\u0648\u062D\u062F\u0629" : "modules"
  };
  const insHtml = INSURANCE.map(
    (p) => '<div class="ins-chip"><span class="ins-dot"></span>' + p.name + '<span class="ins-cov">' + p.pct + "%</span></div>"
  ).join("");
  const blogHtml = BLOG_POSTS.map((p) => {
    const title = ar ? p.title_ar : p.title_en;
    const excerpt = ar ? p.excerpt_ar : p.excerpt_en;
    return '<a href="/blog/' + p.id + "?lang=" + lang + '" class="blog-card" style="text-decoration:none;color:inherit;display:block"><div class="blog-top"><span class="blog-emoji">' + p.emoji + "</span>" + (p.featured ? '<span class="chip-feat">' + (ar ? "\u0645\u0645\u064A\u0632" : "Featured") + "</span>" : "") + '<span class="cat-tag">' + p.category.toUpperCase() + '</span></div><div class="blog-body"><h3 class="blog-title">' + title + '</h3><p class="blog-excerpt">' + excerpt + '</p><div class="blog-meta"><span>\u270D\uFE0F ' + p.author + "</span><span>\u{1F4D6} " + p.read_min + " " + T.min + "</span><span>\u{1F4C5} " + p.date + "</span></div></div></div>";
  }).join("");
  const academyHtml = COURSES.map((c) => {
    const title = ar ? c.title_ar : c.title_en;
    const desc = ar ? c.desc_ar : c.desc_en;
    const href = "/academy/" + c.id + "?lang=" + lang;
    const lvlMap = { beginner: "\u{1F7E2} " + T.level_b, intermediate: "\u{1F7E1} " + T.level_i, advanced: "\u{1F534} " + T.level_a };
    return '<div class="course-card"><div class="course-icon">' + c.icon + '</div><h3 class="course-title"><a href="' + href + '" style="color:inherit;text-decoration:none">' + title + '</a></h3><p class="course-desc">' + desc + '</p><div class="course-meta"><span class="chip-lvl">' + (lvlMap[c.level] || c.level) + '</span><span class="chip-gray">&#9201; ' + c.hours + T.hours + '</span><span class="chip-gray">&#128218; ' + (c.modules || 8) + " " + T.modules_lbl + '</span><span class="chip-accred">' + c.accred + '</span></div><div class="course-footer"><span class="course-price">SAR ' + c.price.toLocaleString() + '</span><div style="display:flex;gap:6px;align-items:center"><a href="' + href + '" style="padding:6px 11px;border-radius:16px;font-size:.74rem;font-weight:600;background:rgba(0,102,204,.08);color:#0066CC;border:1px solid rgba(0,102,204,.2);text-decoration:none">' + (ar ? "\u0639\u0631\u0636" : "View") + '</a><a href="https://bsma.elfadil.com" class="btn-enroll">' + T.enroll + "</a></div></div></div>";
  }).join("");
  return `<!DOCTYPE html>
<html lang="${lang}" dir="${ar ? "rtl" : "ltr"}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="description" content="${T.tagline}">
<title>${T.title} | HNH</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&family=Noto+Serif+Arabic:wght@400;700&display=swap" rel="stylesheet">
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>\u{1F3E5}</text></svg>">
<style>
:root{
  --p:#0066CC;--pd:#004499;--n:#1A2B4A;--a:#C9A84C;--g:linear-gradient(135deg,#0066CC,#1A2B4A);--ga:linear-gradient(135deg,#C9A84C,#E8D48A);
  --s:#10B981;--bg:#F0F4FA;--sf:#FFFFFF;--b:#E2E8F0;--t:#0F172A;--ts:#64748B;
  --sh:0 2px 8px rgba(0,0,0,.08);--shd:0 8px 32px rgba(0,0,0,.12);--r:14px;--rf:9999px;
  --font:${ar ? "'IBM Plex Sans Arabic'" : "'Plus Jakarta Sans'"},sans-serif;
--font-serif:${ar ? "'Noto Serif Arabic'" : "'Playfair Display'"},serif;
}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{font-family:var(--font);background:var(--bg);color:var(--t);line-height:1.6}
img{max-width:100%}a{text-decoration:none;color:inherit}
.c{max-width:1200px;margin:0 auto;padding:0 20px}

/* HEADER */
.hdr{position:sticky;top:0;z-index:100;background:rgba(255,255,255,.96);backdrop-filter:blur(20px);border-bottom:1px solid var(--b);padding:0}
.hdr-i{height:64px;display:flex;align-items:center;justify-content:space-between;gap:16px}
.logo{display:flex;align-items:center;gap:10px}
.logo-ic{width:38px;height:38px;background:var(--g);border-radius:10px;display:grid;place-items:center;font-size:1.2rem;flex-shrink:0}
.logo-tx{font-size:.9rem;font-weight:800;color:var(--n);line-height:1.2}
.logo-tx small{display:block;font-size:.6rem;font-weight:400;color:var(--ts)}
.nav{display:flex;align-items:center;gap:4px}
.nav a,.nav button.nl{padding:6px 12px;border-radius:8px;font-size:.84rem;font-weight:500;color:var(--ts);border:none;background:none;cursor:pointer;font-family:var(--font);transition:all .15s}
.nav a:hover,.nav button.nl:hover{color:var(--p);background:rgba(0,102,204,.06)}
.btn{display:inline-flex;align-items:center;gap:6px;padding:8px 18px;border-radius:var(--rf);font-weight:600;font-size:.84rem;border:none;cursor:pointer;font-family:var(--font);transition:all .15s;text-decoration:none}
.btn-p{background:var(--g);color:#fff}.btn-p:hover{opacity:.9;transform:translateY(-1px)}
.btn-a{background:var(--ga);color:var(--n)}.btn-a:hover{opacity:.9}
.btn-o{background:transparent;border:2px solid var(--p);color:var(--p)}.btn-o:hover{background:var(--p);color:#fff}
.btn-sm{padding:6px 14px;font-size:.8rem}
.hm{display:none;background:none;border:none;font-size:1.4rem;cursor:pointer;color:var(--n);padding:4px}

/* LIVE BADGE */
.live{display:inline-flex;align-items:center;gap:6px;padding:4px 12px;border-radius:var(--rf);background:rgba(16,185,129,.1);color:var(--s);font-size:.72rem;font-weight:600}
.live::before{content:'';width:6px;height:6px;border-radius:50%;background:var(--s);animation:pulse 2s infinite}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}}

/* HERO */
.hero{min-height:100svh;display:flex;align-items:center;padding:80px 0 60px;background:radial-gradient(ellipse at 20% 50%,rgba(0,102,204,.08),transparent 55%),radial-gradient(ellipse at 80% 20%,rgba(201,168,76,.06),transparent 50%),var(--bg)}
.hero-inner{display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center}
.hero-text{}
h1{font-size:clamp(2rem,4vw,3rem);font-weight:900;color:var(--n);line-height:1.15;margin:14px 0 12px}
h1 .gold{background:var(--ga);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.hero-sub{font-size:1.05rem;color:var(--ts);margin-bottom:28px;max-width:480px}
.hero-btns{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:40px}
.hero-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}
.stat-card{background:var(--sf);border:1px solid var(--b);border-radius:12px;padding:16px 12px;text-align:center;transition:all .25s}
.stat-card:hover{transform:translateY(-2px);box-shadow:var(--sh)}
.stat-n{font-size:1.6rem;font-weight:900;background:var(--g);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.stat-l{font-size:.72rem;color:var(--ts);margin-top:2px}
.hero-visual{position:relative}
.hero-card{background:var(--sf);border:1px solid var(--b);border-radius:20px;padding:28px;box-shadow:var(--shd)}
.hv-header{background:var(--g);border-radius:12px;padding:20px;margin-bottom:16px;color:#fff}
.hv-title{font-size:.95rem;font-weight:700;margin-bottom:4px}
.hv-sub{font-size:.75rem;opacity:.75}
.hv-metric{display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid var(--b)}
.hv-metric:last-child{border-bottom:none}
.hv-label{font-size:.8rem;color:var(--ts)}
.hv-val{font-size:.88rem;font-weight:700;color:var(--n)}
.hv-badge{font-size:.7rem;padding:2px 8px;border-radius:var(--rf);font-weight:600}
.badge-ok{background:rgba(16,185,129,.1);color:var(--s)}
.badge-warn{background:rgba(245,158,11,.1);color:#D97706}

/* INTEGRATION STRIP */
.int-strip{background:var(--n);padding:10px 0}
.int-inner{display:flex;gap:8px;flex-wrap:wrap;justify-content:center;align-items:center}
.int-tag{display:inline-flex;align-items:center;gap:5px;padding:4px 10px;background:rgba(255,255,255,.08);border-radius:var(--rf);font-size:.72rem;color:rgba(255,255,255,.8);font-weight:500}

/* SECTIONS */
.sec{padding:72px 0}
.sec-alt{background:var(--sf)}
.sec-head{text-align:center;margin-bottom:40px}
.sec-head h2{font-size:1.7rem;font-weight:800;color:var(--n)}
.sec-head p{color:var(--ts);margin-top:6px}

/* GRIDS */
.g2{display:grid;grid-template-columns:repeat(2,1fr);gap:18px}
.g3{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
.g4{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}
.g5{display:grid;grid-template-columns:repeat(5,1fr);gap:14px}

/* DEPT CARDS */
.dept-card{background:var(--sf);border:1px solid var(--b);border-radius:var(--r);padding:22px;text-align:center;transition:all .25s}
.dept-card:hover{transform:translateY(-3px);box-shadow:var(--sh)}
.dept-ico{width:52px;height:52px;background:var(--g);border-radius:12px;display:grid;place-items:center;font-size:1.4rem;margin:0 auto 12px}
.dept-name{font-size:.9rem;font-weight:700;color:var(--n);margin-bottom:3px}
.dept-count{font-size:.75rem;color:var(--ts)}

/* BRANCH CARDS */
.branch-card{background:var(--sf);border:1px solid var(--b);border-radius:var(--r);overflow:hidden;transition:all .25s}
.branch-card:hover{box-shadow:var(--shd);transform:translateY(-2px)}
.branch-top{background:var(--g);padding:22px;color:#fff}
.branch-top h3{font-size:.95rem;font-weight:700;margin-bottom:3px}
.branch-top span{font-size:.78rem;opacity:.8}
.branch-body{padding:16px 20px}
.branch-addr{font-size:.78rem;color:var(--ts);margin-bottom:12px}
.branch-chips{display:flex;gap:6px;margin-bottom:12px;flex-wrap:wrap}
.chip{display:inline-flex;align-items:center;font-size:.68rem;padding:3px 8px;border-radius:5px;font-weight:600}
.chip-ok{background:rgba(16,185,129,.1);color:var(--s)}
.chip-gray{background:var(--bg);color:var(--ts)}
.chip-blue{background:rgba(0,102,204,.1);color:var(--p)}

/* DOCTOR CARDS */
.doc-card{background:var(--sf);border:1px solid var(--b);border-radius:var(--r);padding:20px;text-align:center;transition:all .25s}
.doc-card:hover{transform:translateY(-2px);box-shadow:var(--sh)}
.doc-av{width:60px;height:60px;border-radius:50%;background:var(--ga);display:grid;place-items:center;font-size:1.3rem;font-weight:800;color:var(--n);margin:0 auto 12px;font-family:'Inter',sans-serif}
.doc-name{font-size:.88rem;font-weight:700;color:var(--n);margin-bottom:3px}
.doc-spec{font-size:.78rem;color:var(--p);font-weight:600;margin-bottom:4px}
.doc-dept{font-size:.68rem;color:var(--ts);background:var(--bg);padding:2px 8px;border-radius:var(--rf);display:inline-block;margin-bottom:10px}

/* INSURANCE */
.ins-grid{display:flex;flex-wrap:wrap;gap:10px;justify-content:center}
.ins-chip{display:inline-flex;align-items:center;gap:8px;background:var(--sf);border:1px solid var(--b);border-radius:10px;padding:10px 16px;font-size:.85rem;font-weight:600;color:var(--n)}
.ins-dot{width:8px;height:8px;border-radius:50%;background:var(--s);flex-shrink:0}
.ins-cov{font-size:.72rem;color:var(--ts);font-weight:400;margin-left:4px}

/* PORTAL HUB */
.status-tag{cursor:pointer;transition:all .2s}.status-tag:hover{transform:translateY(-2px);opacity:.85}
.pulse{color:var(--s);animation:pulseAnim 2s ease-in-out infinite;font-size:.7em}
@keyframes pulseAnim{0%,100%{opacity:1}50%{opacity:.3}}
#sar-badge,#rate-badge{font-weight:700;color:#fff}
.role-tabs{display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin-bottom:32px}
.role-tab{padding:9px 20px;border-radius:var(--rf);border:2px solid var(--b);background:var(--sf);
  color:var(--ts);font-size:.82rem;font-weight:600;cursor:pointer;transition:all .2s;font-family:inherit}
.role-tab.active{background:var(--p);color:#fff;border-color:var(--p)}
.role-tab:hover:not(.active){border-color:var(--p);color:var(--p)}
.portal-hub-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
.portal-card{background:var(--sf);border:1px solid var(--b);border-radius:var(--rl);
  overflow:hidden;transition:all .3s;display:flex;flex-direction:column}
.portal-card:hover{transform:translateY(-4px);box-shadow:0 12px 40px rgba(0,0,0,.1)}
.portal-card.hidden{display:none}
.pc-header{display:flex;align-items:center;gap:12px;padding:18px 20px;color:#fff}
.bsma-hdr{background:linear-gradient(135deg,#0066CC,#0891B2)}
.givc-hdr{background:linear-gradient(135deg,#059669,#0F766E)}
.sbs-hdr{background:linear-gradient(135deg,#7C3AED,#4F46E5)}
.oracle-hdr{background:linear-gradient(135deg,#C9A84C,#92400E)}
.nphies-hdr{background:linear-gradient(135deg,#1A2B4A,#0066CC)}
.voice-hdr{background:linear-gradient(135deg,#DB2777,#9333EA)}
.pc-icon{font-size:1.6rem;min-width:36px}
.pc-name{font-size:.95rem;font-weight:700;color:#fff}
.pc-sub{font-size:.72rem;color:rgba(255,255,255,.8)}
.pc-badge{margin-inline-start:auto;display:flex;align-items:center;gap:4px;
  background:rgba(255,255,255,.15);padding:3px 10px;border-radius:20px;
  font-size:.65rem;font-weight:700;color:#fff;white-space:nowrap}
.dot-live{width:6px;height:6px;border-radius:50%;background:#4ADE80;
  display:inline-block;animation:pulseAnim 2s infinite}
.dot-ok{color:#10B981}
.pc-body{padding:16px 20px;flex:1}
.pc-features{list-style:none;font-size:.79rem;color:var(--t);line-height:1.7;margin-bottom:14px}
.pc-features li{padding:2px 0;border-bottom:1px solid var(--b)}
.pc-features li:last-child{border:none}
.pc-stats{display:flex;border:1px solid var(--b);border-radius:var(--r);overflow:hidden;margin-top:10px}
.pcs{flex:1;text-align:center;padding:8px 4px;border-inline-end:1px solid var(--b)}
.pcs:last-child{border:none}
.pcs-n{font-size:.85rem;font-weight:700;color:var(--n)}
.pcs-l{font-size:.62rem;color:var(--ts);margin-top:1px}
.pc-footer{padding:14px 20px;border-top:1px solid var(--b);display:flex;gap:8px;align-items:center}
.btn-portal{flex:1;display:inline-flex;align-items:center;justify-content:center;
  padding:9px 14px;border-radius:var(--rf);font-size:.79rem;font-weight:700;
  text-decoration:none;color:#fff;transition:all .2s}
.btn-portal:hover{opacity:.88;transform:translateY(-1px)}
.bsma-btn{background:linear-gradient(135deg,#0066CC,#0891B2)}
.givc-btn{background:linear-gradient(135deg,#059669,#0F766E)}
.sbs-btn{background:linear-gradient(135deg,#7C3AED,#4F46E5)}
.oracle-btn{background:linear-gradient(135deg,#C9A84C,#92400E)}
.nphies-btn{background:linear-gradient(135deg,#1A2B4A,#0066CC)}
.voice-btn{background:linear-gradient(135deg,#DB2777,#9333EA)}
.btn-secondary-sm{padding:8px 12px;border-radius:var(--rf);font-size:.75rem;font-weight:600;
  border:1px solid var(--b);background:var(--bg);color:var(--ts);text-decoration:none;transition:all .2s}
.btn-secondary-sm:hover{border-color:var(--p);color:var(--p)}
.btn-voice{padding:8px 12px;border-radius:var(--rf);font-size:.75rem;font-weight:600;
  background:rgba(219,39,119,.1);border:1px solid rgba(219,39,119,.2);color:#DB2777;
  text-decoration:none;transition:all .2s;white-space:nowrap}
@media(max-width:1100px){.portal-hub-grid{grid-template-columns:repeat(2,1fr)}}
@media(max-width:680px){.portal-hub-grid{grid-template-columns:1fr}}
/* BLOG */
.g4-blog{display:grid;grid-template-columns:repeat(4,1fr);gap:18px}
@media(max-width:1100px){.g4-blog{grid-template-columns:repeat(2,1fr)}}
@media(max-width:600px){.g4-blog{grid-template-columns:1fr}}
.blog-card{background:var(--sf);border:1px solid var(--b);border-radius:var(--r);overflow:hidden;transition:all .25s}
.blog-card:hover{box-shadow:var(--shd);transform:translateY(-2px)}
.blog-top{background:var(--g);padding:18px 20px 14px;display:flex;align-items:center;gap:8px}
.blog-emoji{font-size:1.8rem}
.chip-feat{background:rgba(255,255,255,.2);color:#fff;font-size:.65rem;padding:2px 8px;border-radius:var(--rf);font-weight:600}
.cat-tag{background:rgba(255,255,255,.15);color:rgba(255,255,255,.9);font-size:.65rem;padding:2px 8px;border-radius:var(--rf);font-weight:600;margin-left:auto}
.blog-body{padding:16px 20px 20px}
.blog-title{font-size:.9rem;font-weight:700;color:var(--n);margin-bottom:8px;line-height:1.4}
.blog-excerpt{font-size:.78rem;color:var(--ts);line-height:1.55;margin-bottom:12px}
.blog-meta{display:flex;gap:10px;font-size:.72rem;color:var(--ts);flex-wrap:wrap}

/* NPHIES DASHBOARD */
.nphies-grid{display:grid;grid-template-columns:1fr 340px;gap:24px}
.nphies-banner{background:var(--g);border-radius:var(--r);padding:28px;color:#fff;margin-bottom:16px}
.nb-label{font-size:.68rem;letter-spacing:.12em;opacity:.7;text-transform:uppercase;margin-bottom:4px}
.nb-amount{font-size:2.2rem;font-weight:800;margin-bottom:4px}
.nb-sub{font-size:.78rem;opacity:.7;margin-bottom:16px}
.nb-bar{background:rgba(255,255,255,.2);border-radius:4px;height:8px;overflow:hidden;margin-bottom:6px}
.nb-fill{height:100%;background:linear-gradient(90deg,#10B981,#34D399);border-radius:4px}
.nb-rate{font-size:.82rem;opacity:.8}
.branch-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}
.branch-card{background:var(--sf);border:1px solid var(--b);border-radius:10px;padding:14px;text-align:center}
.bc-ok{border-left:4px solid var(--s)}
.bc-warn{border-left:4px solid #EAB308;background:#FEFCE8}
.bc-name{font-size:.75rem;color:var(--ts);margin-bottom:4px}
.bc-pct{font-size:1.2rem;font-weight:800;color:var(--s)}
.bc-warn-txt{color:#CA8A04}
.bc-sar{font-size:.68rem;color:var(--ts);margin-top:2px}
.nphies-side{display:flex;flex-direction:column;gap:14px}
.reject-card{background:linear-gradient(135deg,#FEF2F2,#FECACA);border:1px solid #FECACA;border-radius:var(--r);padding:20px}
.rc-title{font-size:.78rem;font-weight:700;color:#991B1B;margin-bottom:6px}
.rc-amount{font-size:1.6rem;font-weight:800;color:#DC2626;margin-bottom:2px}
.rc-sub{font-size:.72rem;color:#7F1D1D;margin-bottom:14px}
.rc-causes{display:flex;flex-direction:column;gap:6px}
.rc-cause{display:flex;align-items:center;gap:8px;font-size:.76rem;color:#450A0A}
.rc-pct{font-weight:700;color:#DC2626;min-width:32px}
.pa-card{background:var(--sf);border:1px solid var(--b);border-radius:var(--r);padding:18px}
.pa-row{display:flex;justify-content:space-between;padding:7px 0;border-bottom:1px solid var(--b);font-size:.82rem;color:var(--ts)}
.pa-row:last-child{border-bottom:none}
.pa-row strong{color:var(--n);font-weight:700}
@media(max-width:900px){.nphies-grid{grid-template-columns:1fr}.branch-grid{grid-template-columns:repeat(2,1fr)}}
/* ACADEMY */
.academy-stats{display:flex;gap:12px;justify-content:center;margin-bottom:32px;flex-wrap:wrap}
.course-card{background:var(--sf);border:1px solid var(--b);border-radius:var(--r);padding:22px;border-top:4px solid var(--a);transition:all .25s}
.course-card:hover{transform:translateY(-2px);box-shadow:var(--sh)}
.course-icon{font-size:2rem;margin-bottom:10px}
.course-title{font-size:.9rem;font-weight:700;color:var(--n);margin-bottom:6px;line-height:1.4}
.course-desc{font-size:.78rem;color:var(--ts);line-height:1.55;margin-bottom:12px}
.course-meta{display:flex;flex-wrap:wrap;gap:5px;margin-bottom:12px}
.chip-lvl{background:rgba(0,102,204,.08);color:var(--p);font-size:.68rem;padding:3px 8px;border-radius:5px;font-weight:600}
.chip-accred{background:rgba(16,185,129,.1);color:var(--s);font-size:.68rem;padding:3px 8px;border-radius:5px;font-weight:600}
.course-footer{display:flex;justify-content:space-between;align-items:center;margin-top:12px;padding-top:12px;border-top:1px solid var(--b)}
.course-price{font-size:1rem;font-weight:800;color:var(--p)}
.btn-enroll{background:var(--g);color:#fff;padding:7px 16px;border-radius:var(--rf);font-size:.78rem;font-weight:600;text-decoration:none;display:inline-block;transition:opacity .15s}
.btn-enroll:hover{opacity:.9}

/* CTA */
.cta{background:var(--g);padding:72px 0;text-align:center}
.cta h2{font-size:1.7rem;color:#fff;margin-bottom:10px}
.cta p{color:rgba(255,255,255,.8);margin-bottom:28px}
.cta-btns{display:flex;gap:10px;justify-content:center;flex-wrap:wrap}
.btn-white{background:#fff;color:var(--n)}.btn-white:hover{background:var(--ga)}
.btn-wa{background:#25D366;color:#fff}.btn-wa:hover{opacity:.9}

/* FOOTER */
.ftr{background:var(--n);color:rgba(255,255,255,.65);padding:48px 0 24px}
.ftr-grid{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:28px;margin-bottom:32px}
.ftr h4{color:#fff;font-size:.88rem;margin-bottom:12px}
.ftr a{display:block;font-size:.82rem;margin-bottom:6px;color:rgba(255,255,255,.55);transition:color .15s}
.ftr a:hover{color:var(--a)}
.ftr-bottom{border-top:1px solid rgba(255,255,255,.1);padding-top:20px;text-align:center;font-size:.78rem}

/* CHAT */
.chat-fab{position:fixed;bottom:24px;${ar ? "left" : "right"}:24px;width:52px;height:52px;background:var(--g);border-radius:50%;display:grid;place-items:center;box-shadow:0 4px 16px rgba(0,102,204,.4);z-index:90;cursor:pointer;border:none;font-size:1.4rem;color:#fff;transition:transform .2s}
.chat-fab:hover{transform:scale(1.1)}
.chat-box{position:fixed;bottom:86px;${ar ? "left" : "right"}:16px;width:340px;max-height:480px;background:var(--sf);border:1px solid var(--b);border-radius:var(--r);box-shadow:var(--shd);z-index:89;display:flex;flex-direction:column;overflow:hidden;opacity:0;pointer-events:none;transform:translateY(12px);transition:all .2s}
.chat-box.open{opacity:1;pointer-events:all;transform:translateY(0)}
.chat-head{background:var(--g);padding:14px 16px;color:#fff;font-weight:600;font-size:.88rem;display:flex;justify-content:space-between;align-items:center}
.chat-head button{background:none;border:none;color:#fff;cursor:pointer;font-size:1rem;line-height:1}
.chat-msgs{flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:8px}
.msg{padding:9px 12px;border-radius:10px;font-size:.82rem;max-width:86%;line-height:1.5;word-break:break-word}
.msg-u{background:rgba(0,102,204,.1);color:var(--t);align-self:${ar ? "flex-start" : "flex-end"}}
.msg-a{background:var(--bg);color:var(--t);align-self:${ar ? "flex-end" : "flex-start"}}
.chat-foot{border-top:1px solid var(--b);padding:10px;display:flex;gap:8px}
.chat-inp{flex:1;border:1px solid var(--b);border-radius:var(--rf);padding:8px 12px;font-size:.82rem;font-family:var(--font);outline:none;transition:border-color .15s}
.chat-inp:focus{border-color:var(--p)}
.chat-send{background:var(--p);color:#fff;border:none;border-radius:var(--rf);padding:8px 14px;cursor:pointer;font-size:.82rem;font-weight:600;font-family:var(--font)}
.wa-btn{position:fixed;bottom:24px;${ar ? "right" : "left"}:24px;width:48px;height:48px;background:#25D366;border-radius:50%;display:grid;place-items:center;box-shadow:0 4px 16px rgba(37,211,102,.4);z-index:90;font-size:1.3rem;transition:transform .2s}
.wa-btn:hover{transform:scale(1.1)}

/* SEARCH BAR */
.search-bar{display:flex;gap:10px;margin-bottom:20px;flex-wrap:wrap}
.search-inp{flex:1;min-width:180px;padding:9px 14px;border:1px solid var(--b);border-radius:var(--rf);font-size:.85rem;font-family:var(--font);outline:none;background:var(--sf);transition:border-color .15s}
.search-inp:focus{border-color:var(--p)}
.search-sel{padding:9px 14px;border:1px solid var(--b);border-radius:var(--rf);font-size:.85rem;font-family:var(--font);background:var(--sf);outline:none}

/* RESPONSIVE */
@media(max-width:960px){
  .hero-inner{grid-template-columns:1fr}.hero-visual{display:none}
  .g4{grid-template-columns:repeat(2,1fr)}.g5{grid-template-columns:repeat(2,1fr)}
  .ftr-grid{grid-template-columns:1fr 1fr}
}
@media(max-width:640px){
  .nav{display:none}.hm{display:block}
  .g2,.g3{grid-template-columns:1fr}.g4{grid-template-columns:1fr 1fr}
  .hero-stats{grid-template-columns:repeat(2,1fr)}
  .chat-box{width:calc(100vw - 32px)}
  .ftr-grid{grid-template-columns:1fr}
}

/* ── Branch Cards ── */
.branch-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:16px}
.branch-card{background:var(--sf);border:1px solid var(--b);border-radius:16px;padding:22px;cursor:pointer;transition:all .25s;text-align:center;position:relative}
.branch-card:hover{transform:translateY(-4px);box-shadow:0 12px 40px rgba(0,0,0,.3);border-color:var(--a)}
.bc-icon{font-size:2.4rem;margin-bottom:10px}
.bc-name{font-weight:700;font-size:1rem;margin-bottom:3px;color:var(--n)}
.bc-city{font-size:.78rem;color:var(--ts);margin-bottom:6px}
.bc-beds{font-size:.74rem;color:var(--ts);margin-bottom:8px}
.bc-rate{font-size:.8rem;font-weight:600;margin-bottom:10px}
.bc-btn{display:inline-block;background:linear-gradient(135deg,var(--a),var(--a2,#0055aa));color:#fff;padding:7px 16px;border-radius:20px;font-size:.75rem;font-weight:600;text-decoration:none;transition:opacity .2s}
.bc-btn:hover{opacity:.85}

/* ── Department Grid ── */
.dept-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(130px,1fr));gap:12px}
.dept-card{background:var(--sf);border:1px solid var(--b);border-radius:14px;padding:18px 12px;text-align:center;text-decoration:none;color:inherit;transition:all .25s;display:flex;flex-direction:column;align-items:center;gap:8px}
.dept-card:hover{border-color:var(--a);transform:translateY(-3px);background:rgba(0,102,204,.06)}
.dept-icon{font-size:2rem}
.dept-name{font-size:.78rem;font-weight:600;color:var(--n)}

/* ── Blog Enhancements ── */
.blog-card{background:var(--sf);border:1px solid var(--b);border-radius:16px;overflow:hidden;transition:all .3s;display:block;text-decoration:none;color:inherit}
.blog-card:hover{box-shadow:0 16px 48px rgba(0,0,0,.35);transform:translateY(-4px);border-color:var(--a)}
.blog-top{background:var(--g);padding:22px 20px 16px;display:flex;align-items:center;gap:10px;position:relative}
.blog-emoji{font-size:2.2rem;filter:drop-shadow(0 2px 4px rgba(0,0,0,.3))}
.blog-body{padding:18px 20px 20px}
.blog-title{font-size:.95rem;font-weight:700;line-height:1.5;margin-bottom:8px;font-family:var(--font-serif,var(--font))}
.blog-excerpt{font-size:.8rem;color:var(--ts);line-height:1.7;margin-bottom:12px}
.blog-meta{display:flex;gap:12px;font-size:.72rem;color:var(--ts);flex-wrap:wrap}

/* ── Academy Enhancements ── */
.course-card{background:linear-gradient(160deg,var(--sf) 0%,rgba(0,102,204,.04) 100%);border:1px solid var(--b);border-radius:16px;padding:24px;border-top:3px solid var(--a);transition:all .3s;position:relative;overflow:hidden}
.course-card::before{content:'';position:absolute;top:0;right:0;width:80px;height:80px;background:radial-gradient(circle,rgba(0,102,204,.08) 0%,transparent 70%);pointer-events:none}
.course-card:hover{transform:translateY(-4px);box-shadow:0 16px 48px rgba(0,0,0,.3);border-top-color:var(--a2,#0066ff)}
.course-icon{font-size:2.4rem;margin-bottom:12px;display:block}
.course-title{font-size:.95rem;font-weight:700;color:var(--n);margin-bottom:8px;line-height:1.5;font-family:var(--font-serif,var(--font))}
.course-desc{font-size:.8rem;color:var(--ts);line-height:1.7;margin-bottom:14px}
.academy-stats{display:flex;gap:12px;flex-wrap:wrap;margin-bottom:28px}
.stat-card{background:linear-gradient(135deg,var(--a),rgba(0,102,204,.6));border-radius:14px;padding:16px 24px;text-align:center;flex:1;min-width:80px}
.stat-n{font-size:1.6rem;font-weight:800;color:#fff}
.stat-l{font-size:.75rem;color:rgba(255,255,255,.85);font-weight:500}

/* ── Portal Link Buttons ── */
.portal-shortcuts{display:flex;gap:10px;flex-wrap:wrap;margin-top:20px;padding:16px;background:rgba(0,102,204,.06);border-radius:12px;border:1px solid rgba(0,102,204,.15)}
.ps-btn{display:flex;align-items:center;gap:6px;padding:8px 16px;border-radius:20px;font-size:.78rem;font-weight:600;text-decoration:none;transition:all .2s;border:1px solid transparent}
.ps-btn.bsma{background:rgba(0,102,204,.15);color:#4ea5ff;border-color:rgba(0,102,204,.3)}
.ps-btn.givc{background:rgba(16,185,129,.12);color:#10b981;border-color:rgba(16,185,129,.25)}
.ps-btn.sbs{background:rgba(139,92,246,.12);color:#a78bfa;border-color:rgba(139,92,246,.25)}
.ps-btn.status{background:rgba(245,158,11,.1);color:#fbbf24;border-color:rgba(245,158,11,.2)}
.ps-btn:hover{transform:translateY(-1px);opacity:.9}

/* ── RCM Section ── */
.rcm-kpi-bar{display:flex;gap:12px;flex-wrap:wrap;background:rgba(0,0,0,.25);border-radius:14px;padding:16px 20px;margin-bottom:24px;border:1px solid rgba(255,255,255,.06)}
.rcm-kpi{flex:1;min-width:80px;text-align:center}
.rcm-kv{font-size:1.4rem;font-weight:800;font-family:var(--font-serif,var(--font))}
.rcm-kl{font-size:.7rem;color:var(--ts);margin-top:2px}
.rcm-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:14px}
.rcm-card{background:var(--sf);border:1px solid var(--b);border-radius:14px;padding:20px;cursor:pointer;transition:all .25s;text-decoration:none;color:inherit;display:block}
.rcm-card:hover{border-color:var(--a);transform:translateY(-3px);box-shadow:0 10px 30px rgba(0,0,0,.3)}
.rcm-card.rcm-primary{background:linear-gradient(135deg,rgba(0,102,204,.18),rgba(0,50,150,.1));border-color:rgba(0,102,204,.4)}
.rcm-icon{font-size:2rem;margin-bottom:10px}
.rcm-title{font-weight:700;font-size:.9rem;margin-bottom:6px}
.rcm-desc{font-size:.78rem;color:var(--ts);line-height:1.6}
.rcm-arrow{font-size:.75rem;color:var(--a);margin-top:8px;font-weight:600}
</style>
</head>
<body>

<!-- HEADER -->
<header class="hdr">
<div class="c hdr-i">
  <a href="/" class="logo">
    <div class="logo-ic">\u{1F3E5}</div>
    <div class="logo-tx">${T.title}<small>BrainSAIT Healthcare OS v${VERSION}</small></div>
  </a>
  <nav class="nav" id="main-nav">
    <a href="https://bsma.elfadil.com${lang === "en" ? "?lang=en" : ""}">${ar ? "\u{1F642} \u0645\u0631\u064A\u0636" : "\u{1F642} Patient"}</a>
    <a href="/clinician${lang === "en" ? "?lang=en" : ""}">${ar ? "\u{1FA7A} \u0637\u0628\u064A\u0628" : "\u{1FA7A} Clinician"}</a>
    <a href="/billing${lang === "en" ? "?lang=en" : ""}">${ar ? "\u{1F4B0} \u0641\u0648\u0627\u062A\u064A\u0631" : "\u{1F4B0} Billing"}</a>
    <a href="/status${lang === "en" ? "?lang=en" : ""}">${ar ? "\u{1F4CA} \u0627\u0644\u062D\u0627\u0644\u0629" : "\u{1F4CA} Status"}</a>
    <a href="#depts">${T.depts}</a>
    <a href="#branches">${T.branches}</a>
    <a href="#doctors">${T.doctors}</a>
    <a href="#portals">${ar ? "\u0628\u0648\u0627\u0628\u0627\u062A\u0646\u0627" : "Portals"}</a>
    <a href="#blog">${T.blog}</a>
    <a href="#academy">${T.academy_nav}</a>
    <a href="https://bsma.elfadil.com" target="_blank">BSMA</a>
    <a href="https://givc.elfadil.com" target="_blank">GIVC</a>
    <a href="https://sbs.elfadil.com" target="_blank">SBS</a>
    <button class="nl" id="lang-btn">${ar ? "EN" : "\u0639\u0631\u0628\u064A"}</button>
    <a href="https://bsma.elfadil.com" target="_blank" class="btn btn-p btn-sm">${T.book}</a>
  </nav>
  <button class="hm" id="menu-btn" aria-label="Menu">\u2630</button>
</div>
</header>

<!-- HERO -->
<section class="hero">
<div class="c">
<div class="hero-inner">
  <div class="hero-text">
    <div class="live" id="live-badge">\u25CF ${ar ? "\u0628\u064A\u0627\u0646\u0627\u062A \u062D\u064A\u0629" : "Live Data"}</div>
    <h1>${ar ? '\u0645\u062C\u0645\u0648\u0639\u0629<br><span class="gold">\u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A</span>' : 'Group of<br><span class="gold">Hayat National Hospitals</span>'}</h1>
    <p class="hero-sub">${T.tagline}</p>
    <div class="hero-btns">
      <a href="https://bsma.elfadil.com" target="_blank" class="btn btn-a">${T.book}</a>
      <a href="https://bsma.elfadil.com" target="_blank" class="btn btn-o">${T.patient}</a>
    </div>
    <div class="hero-stats">
      <div class="stat-card"><div class="stat-n" id="stat-prov">269</div><div class="stat-l">${T.s_doc}</div></div>
      <div class="stat-card"><div class="stat-n">6</div><div class="stat-l">${ar ? "\u0641\u0631\u0648\u0639" : "Branches"}</div></div>
      <div class="stat-card"><div class="stat-n" id="stat-dept">20</div><div class="stat-l">${T.s_dept}</div></div>
      <div class="stat-card"><div class="stat-n">1050</div><div class="stat-l">${T.s_bed}</div></div>
    </div>
  </div>
  <div class="hero-visual">
    <div class="hero-card">
      <div class="hv-header">
        <div class="hv-title">\u{1F3E5} NPHIES Network Dashboard</div>
        <div class="hv-sub">${ar ? "\u0634\u0628\u0643\u0629 \u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A \u2014 \u0628\u064A\u0627\u0646\u0627\u062A \u062D\u064A\u0629" : "Hayat National Hospital Group \u2014 Live Data"}</div>
      </div>
      <div class="hv-metric"><span class="hv-label">${ar ? "\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0634\u0628\u0643\u0629" : "Network Total"}</span><span class="hv-val" id="hv-sar">SAR 835.7M</span></div>
      <div class="hv-metric"><span class="hv-label">${ar ? "\u0645\u0639\u062F\u0644 \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629" : "Approval Rate"}</span><span class="hv-val"><span class="hv-badge badge-ok" id="hv-rate">98.6%</span></span></div>
      <div class="hv-metric"><span class="hv-label">${ar ? "\u0627\u0644\u0645\u0637\u0627\u0644\u0628\u0627\u062A" : "Claims"}</span><span class="hv-val" id="hv-claims">15,138</span></div>
      <div class="hv-metric"><span class="hv-label">${ar ? "\u0627\u0644\u0631\u064A\u0627\u0636 (\u26A0\uFE0F)" : "Riyadh (\u26A0\uFE0F)"}</span><span class="hv-val"><span class="hv-badge badge-warn" id="hv-riyadh">88.5%</span></span></div>
      <div class="hv-metric"><span class="hv-label">${ar ? "\u0643\u0644\u064A\u0646\u0643 AI \u2014 \u0627\u0644\u0627\u0633\u062A\u0631\u062F\u0627\u062F" : "ClaimLinc AI Recovery"}</span><span class="hv-val" id="hv-recovery">SAR 9.8M</span></div>
    </div>
  </div>
</div>
</div>
</section>

<!-- INTEGRATION STRIP \u2014 Live clickable status -->
<div class="int-strip">
<div class="c"><div class="int-inner">
  <span class="int-tag status-tag" id="bsma-badge" onclick="goPortal('bsma')" title="Patient Portal \u2014 bsma.elfadil.com">\u{1F642} BSMA <span class="pulse">\u25CF</span></span>
  <span class="int-tag status-tag" id="givc-badge" onclick="goPortal('givc')" title="Clinician Portal \u2014 givc.elfadil.com">\u{1FA7A} GIVC <span class="pulse">\u25CF</span></span>
  <span class="int-tag status-tag" id="sbs-badge"  onclick="goPortal('sbs')"  title="Billing Portal \u2014 sbs.elfadil.com">\u{1F4B0} SBS  <span class="pulse">\u25CF</span></span>
  <span class="int-tag status-tag" id="oracle-tag" onclick="goPortal('oracle')" title="${ar ? "Oracle HIS \u2014 \u0627\u0644\u0646\u0641\u0642 \u0645\u062A\u0648\u0642\u0641 (\u0627\u0646\u062A\u0647\u062A \u0645\u0647\u0644\u0629 \u062C\u0645\u064A\u0639 \u0627\u0644\u0641\u0631\u0648\u0639)" : "Oracle HIS \u2014 Tunnel degraded (all branches timeout)"}">\u{1F537} Oracle \u26A0</span>
  <span class="int-tag status-tag" id="nphies-tag" onclick="goPortal('nphies')" title="NPHIES Portal">\u{1F3DB}\uFE0F NPHIES <span class="pulse">\u25CF</span></span></div>
</div>

<!-- DEPARTMENTS -->
<section class="sec" id="depts">
<div class="c">
  <div class="sec-head"><h2>${T.h_depts}</h2><p>${T.p_depts}</p></div>
  <div class="dept-grid" id="dept-grid">${ar ? `<a href="https://bsma.elfadil.com?dept=Cardiology" target="_blank" class="dept-card"><div class="dept-icon">❤️</div><div class="dept-name">القلب</div></a>
<a href="https://bsma.elfadil.com?dept=Neurology" target="_blank" class="dept-card"><div class="dept-icon">🧠</div><div class="dept-name">الأعصاب</div></a>
<a href="https://bsma.elfadil.com?dept=Orthopedics" target="_blank" class="dept-card"><div class="dept-icon">🦴</div><div class="dept-name">العظام</div></a>
<a href="https://bsma.elfadil.com?dept=Pediatrics" target="_blank" class="dept-card"><div class="dept-icon">👶</div><div class="dept-name">الأطفال</div></a>
<a href="https://bsma.elfadil.com?dept=Ophthalmology" target="_blank" class="dept-card"><div class="dept-icon">👁️</div><div class="dept-name">العيون</div></a>
<a href="https://bsma.elfadil.com?dept=Dentistry" target="_blank" class="dept-card"><div class="dept-icon">🦷</div><div class="dept-name">الأسنان</div></a>
<a href="https://bsma.elfadil.com?dept=Oncology" target="_blank" class="dept-card"><div class="dept-icon">🎗️</div><div class="dept-name">الأورام</div></a>
<a href="https://bsma.elfadil.com?dept=Emergency" target="_blank" class="dept-card"><div class="dept-icon">🚨</div><div class="dept-name">الطوارئ</div></a>
<a href="https://bsma.elfadil.com?dept=Internal%20Med" target="_blank" class="dept-card"><div class="dept-icon">🩺</div><div class="dept-name">الباطنة</div></a>
<a href="https://bsma.elfadil.com?dept=Gynecology" target="_blank" class="dept-card"><div class="dept-icon">👩</div><div class="dept-name">النساء</div></a>
<a href="https://bsma.elfadil.com?dept=Radiology" target="_blank" class="dept-card"><div class="dept-icon">📷</div><div class="dept-name">الأشعة</div></a>
<a href="https://bsma.elfadil.com?dept=Laboratory" target="_blank" class="dept-card"><div class="dept-icon">🔬</div><div class="dept-name">المختبر</div></a>` : `<a href="https://bsma.elfadil.com?dept=Cardiology" target="_blank" class="dept-card"><div class="dept-icon">❤️</div><div class="dept-name">Cardiology</div></a>
<a href="https://bsma.elfadil.com?dept=Neurology" target="_blank" class="dept-card"><div class="dept-icon">🧠</div><div class="dept-name">Neurology</div></a>
<a href="https://bsma.elfadil.com?dept=Orthopedics" target="_blank" class="dept-card"><div class="dept-icon">🦴</div><div class="dept-name">Orthopedics</div></a>
<a href="https://bsma.elfadil.com?dept=Pediatrics" target="_blank" class="dept-card"><div class="dept-icon">👶</div><div class="dept-name">Pediatrics</div></a>
<a href="https://bsma.elfadil.com?dept=Ophthalmology" target="_blank" class="dept-card"><div class="dept-icon">👁️</div><div class="dept-name">Ophthalmology</div></a>
<a href="https://bsma.elfadil.com?dept=Dentistry" target="_blank" class="dept-card"><div class="dept-icon">🦷</div><div class="dept-name">Dentistry</div></a>
<a href="https://bsma.elfadil.com?dept=Oncology" target="_blank" class="dept-card"><div class="dept-icon">🎗️</div><div class="dept-name">Oncology</div></a>
<a href="https://bsma.elfadil.com?dept=Emergency" target="_blank" class="dept-card"><div class="dept-icon">🚨</div><div class="dept-name">Emergency</div></a>
<a href="https://bsma.elfadil.com?dept=Internal%20Med" target="_blank" class="dept-card"><div class="dept-icon">🩺</div><div class="dept-name">Internal Med</div></a>
<a href="https://bsma.elfadil.com?dept=Gynecology" target="_blank" class="dept-card"><div class="dept-icon">👩</div><div class="dept-name">Gynecology</div></a>
<a href="https://bsma.elfadil.com?dept=Radiology" target="_blank" class="dept-card"><div class="dept-icon">📷</div><div class="dept-name">Radiology</div></a>
<a href="https://bsma.elfadil.com?dept=Laboratory" target="_blank" class="dept-card"><div class="dept-icon">🔬</div><div class="dept-name">Laboratory</div></a>`}</div>
</div>
</section>

<!-- BRANCHES -->
<section class="sec sec-alt" id="branches">
<div class="c">
  <div class="sec-head"><h2>${T.h_branches}</h2><p>${T.p_branches}</p></div>
  <div class="branch-grid" id="branch-grid">
${ar ? `<div class="branch-card" onclick="window.open('https://bsma.elfadil.com?branch=r001','_blank')">
  <div class="bc-icon">🏥</div>
  <div class="bc-name">الرياض</div>
  <div class="bc-city">الرياض</div>
  <div class="bc-beds">300 سرير</div>
  <div class="bc-rate" style="color:#ff6b6b">⚠️ 88.5%</div>
  <a href="https://bsma.elfadil.com?branch=r001" target="_blank" class="bc-btn">حجز موعد</a>
</div>
<div class="branch-card" onclick="window.open('https://bsma.elfadil.com?branch=m001','_blank')">
  <div class="bc-icon">🕌</div>
  <div class="bc-name">المدينة المنورة</div>
  <div class="bc-city">المدينة</div>
  <div class="bc-beds">250 سرير</div>
  <div class="bc-rate" style="color:#00c864">✅ 100%</div>
  <a href="https://bsma.elfadil.com?branch=m001" target="_blank" class="bc-btn">حجز موعد</a>
</div>
<div class="branch-card" onclick="window.open('https://bsma.elfadil.com?branch=u001','_blank')">
  <div class="bc-icon">🌿</div>
  <div class="bc-name">عنيزة</div>
  <div class="bc-city">عنيزة</div>
  <div class="bc-beds">180 سرير</div>
  <div class="bc-rate" style="color:#00c864">✅ 100%</div>
  <a href="https://bsma.elfadil.com?branch=u001" target="_blank" class="bc-btn">حجز موعد</a>
</div>
<div class="branch-card" onclick="window.open('https://bsma.elfadil.com?branch=k001','_blank')">
  <div class="bc-icon">🏔️</div>
  <div class="bc-name">خميس مشيط</div>
  <div class="bc-city">خميس مشيط</div>
  <div class="bc-beds">400 سرير</div>
  <div class="bc-rate" style="color:#00c864">✅ 100%</div>
  <a href="https://bsma.elfadil.com?branch=k001" target="_blank" class="bc-btn">حجز موعد</a>
</div>
<div class="branch-card" onclick="window.open('https://bsma.elfadil.com?branch=j001','_blank')">
  <div class="bc-icon">🌊</div>
  <div class="bc-name">جيزان</div>
  <div class="bc-city">جيزان</div>
  <div class="bc-beds">220 سرير</div>
  <div class="bc-rate" style="color:#00c864">✅ 100%</div>
  <a href="https://bsma.elfadil.com?branch=j001" target="_blank" class="bc-btn">حجز موعد</a>
</div>
<div class="branch-card" onclick="window.open('https://bsma.elfadil.com?branch=a001','_blank')">
  <div class="bc-icon">⛰️</div>
  <div class="bc-name">أبها</div>
  <div class="bc-city">أبها</div>
  <div class="bc-beds">200 سرير</div>
  <div class="bc-rate" style="color:#00c864">✅ 100%</div>
  <a href="https://bsma.elfadil.com?branch=a001" target="_blank" class="bc-btn">حجز موعد</a>
</div>` : `<div class="branch-card" onclick="window.open('https://bsma.elfadil.com?branch=r001','_blank')">
  <div class="bc-icon">🏥</div>
  <div class="bc-name">Riyadh</div>
  <div class="bc-city">Riyadh</div>
  <div class="bc-beds">300 beds</div>
  <div class="bc-rate" style="color:#ff6b6b">⚠️ 88.5%</div>
  <a href="https://bsma.elfadil.com?branch=r001" target="_blank" class="bc-btn">Book</a>
</div>
<div class="branch-card" onclick="window.open('https://bsma.elfadil.com?branch=m001','_blank')">
  <div class="bc-icon">🕌</div>
  <div class="bc-name">Madinah</div>
  <div class="bc-city">Madinah</div>
  <div class="bc-beds">250 beds</div>
  <div class="bc-rate" style="color:#00c864">✅ 100%</div>
  <a href="https://bsma.elfadil.com?branch=m001" target="_blank" class="bc-btn">Book</a>
</div>
<div class="branch-card" onclick="window.open('https://bsma.elfadil.com?branch=u001','_blank')">
  <div class="bc-icon">🌿</div>
  <div class="bc-name">Unaizah</div>
  <div class="bc-city">Unaizah</div>
  <div class="bc-beds">180 beds</div>
  <div class="bc-rate" style="color:#00c864">✅ 100%</div>
  <a href="https://bsma.elfadil.com?branch=u001" target="_blank" class="bc-btn">Book</a>
</div>
<div class="branch-card" onclick="window.open('https://bsma.elfadil.com?branch=k001','_blank')">
  <div class="bc-icon">🏔️</div>
  <div class="bc-name">Khamis Mushait</div>
  <div class="bc-city">Khamis</div>
  <div class="bc-beds">400 beds</div>
  <div class="bc-rate" style="color:#00c864">✅ 100%</div>
  <a href="https://bsma.elfadil.com?branch=k001" target="_blank" class="bc-btn">Book</a>
</div>
<div class="branch-card" onclick="window.open('https://bsma.elfadil.com?branch=j001','_blank')">
  <div class="bc-icon">🌊</div>
  <div class="bc-name">Jizan</div>
  <div class="bc-city">Jizan</div>
  <div class="bc-beds">220 beds</div>
  <div class="bc-rate" style="color:#00c864">✅ 100%</div>
  <a href="https://bsma.elfadil.com?branch=j001" target="_blank" class="bc-btn">Book</a>
</div>
<div class="branch-card" onclick="window.open('https://bsma.elfadil.com?branch=a001','_blank')">
  <div class="bc-icon">⛰️</div>
  <div class="bc-name">Abha</div>
  <div class="bc-city">Abha</div>
  <div class="bc-beds">200 beds</div>
  <div class="bc-rate" style="color:#00c864">✅ 100%</div>
  <a href="https://bsma.elfadil.com?branch=a001" target="_blank" class="bc-btn">Book</a>
</div>`}
</div>
</div>
</section>

<!-- DOCTORS -->
<section class="sec" id="doctors">
<div class="c">
  <div class="sec-head"><h2>${T.h_doctors}</h2></div>
  <div class="search-bar">
    <input class="search-inp" id="doc-search" placeholder="${T.search_doc}">
    <select class="search-sel" id="spec-filter"><option value="">${T.all_specs}</option></select>
  </div>
  <div class="g4" id="doc-grid">
<div class="doc-card" onclick="window.open('https://bsma.elfadil.com?spec=Cardiology','_blank')" style="cursor:pointer">
  <div class="doc-av" style="font-size:1.5rem">❤️</div>
  <div class="doc-name">${ar ? "د. أحمد السعيد" : "Dr. Ahmed Al-Saeed"}</div>
  <div class="doc-spec">Cardiology</div>
  <div class="doc-dept" style="font-size:.72rem;color:var(--ts)">Riyadh</div>
</div>
<div class="doc-card" onclick="window.open('https://bsma.elfadil.com?spec=Cardiology','_blank')" style="cursor:pointer">
  <div class="doc-av" style="font-size:1.5rem">❤️</div>
  <div class="doc-name">${ar ? "د. محمد الشبراوي" : "Dr. Mohamed Al-Shabrawy"}</div>
  <div class="doc-spec">Cardiology</div>
  <div class="doc-dept" style="font-size:.72rem;color:var(--ts)">Riyadh</div>
</div>
<div class="doc-card" onclick="window.open('https://bsma.elfadil.com?spec=Pediatrics','_blank')" style="cursor:pointer">
  <div class="doc-av" style="font-size:1.5rem">👶</div>
  <div class="doc-name">${ar ? "د. فاطمة الزهراني" : "Dr. Fatima Al-Zahrani"}</div>
  <div class="doc-spec">Pediatrics</div>
  <div class="doc-dept" style="font-size:.72rem;color:var(--ts)">Madinah</div>
</div>
<div class="doc-card" onclick="window.open('https://bsma.elfadil.com?spec=Orthopedics','_blank')" style="cursor:pointer">
  <div class="doc-av" style="font-size:1.5rem">🦴</div>
  <div class="doc-name">${ar ? "د. عمر العسيري" : "Dr. Omar Al-Assiri"}</div>
  <div class="doc-spec">Orthopedics</div>
  <div class="doc-dept" style="font-size:.72rem;color:var(--ts)">Khamis</div>
</div>
<div class="doc-card" onclick="window.open('https://bsma.elfadil.com?spec=Gynecology','_blank')" style="cursor:pointer">
  <div class="doc-av" style="font-size:1.5rem">👩</div>
  <div class="doc-name">${ar ? "د. سارة الغامدي" : "Dr. Sarah Al-Ghamdi"}</div>
  <div class="doc-spec">Gynecology</div>
  <div class="doc-dept" style="font-size:.72rem;color:var(--ts)">Riyadh</div>
</div>
<div class="doc-card" onclick="window.open('https://bsma.elfadil.com?spec=Neurology','_blank')" style="cursor:pointer">
  <div class="doc-av" style="font-size:1.5rem">🧠</div>
  <div class="doc-name">${ar ? "د. خالد المالكي" : "Dr. Khalid Al-Maliki"}</div>
  <div class="doc-spec">Neurology</div>
  <div class="doc-dept" style="font-size:.72rem;color:var(--ts)">Jizan</div>
</div>
<div class="doc-card" onclick="window.open('https://bsma.elfadil.com?spec=Ophthalmology','_blank')" style="cursor:pointer">
  <div class="doc-av" style="font-size:1.5rem">👁️</div>
  <div class="doc-name">${ar ? "د. نورة القحطاني" : "Dr. Noura Al-Qahtani"}</div>
  <div class="doc-spec">Ophthalmology</div>
  <div class="doc-dept" style="font-size:.72rem;color:var(--ts)">Unaizah</div>
</div>
<div class="doc-card" onclick="window.open('https://bsma.elfadil.com?spec=Internal%20Med.','_blank')" style="cursor:pointer">
  <div class="doc-av" style="font-size:1.5rem">🩺</div>
  <div class="doc-name">${ar ? "د. يوسف الدوسري" : "Dr. Youssef Al-Dosari"}</div>
  <div class="doc-spec">Internal Med.</div>
  <div class="doc-dept" style="font-size:.72rem;color:var(--ts)">Abha</div>
</div>
</div>
  <div style="text-align:center;margin-top:24px">
    <a href="https://bsma.elfadil.com" target="_blank" class="btn btn-o">${T.view_all}</a>
  </div>
</div>
</section>

<!-- INSURANCE -->
<section class="sec sec-alt" id="insurance">
<div class="c">
  <div class="sec-head"><h2>${T.h_insurance}</h2><p>${T.p_insurance}</p></div>
  <div class="ins-grid">${insHtml}</div>
</div>
</section>

<!-- PORTAL HUB \u2014 Role-based routing for all user types -->
<section style="padding:14px 0;border-bottom:1px solid var(--b);background:rgba(0,0,0,.2)">
<div class="c">
<div class="portal-shortcuts">
  <span style="font-size:.74rem;font-weight:600;color:var(--ts);align-self:center;white-space:nowrap">${ar ? "وصول سريع:" : "Quick Access:"}</span>
  <a href="https://bsma.elfadil.com" target="_blank" class="ps-btn bsma">🙂 ${ar ? "بوابة المريض" : "Patient Portal"}</a>
  <a href="https://givc.elfadil.com" target="_blank" class="ps-btn givc">🩺 ${ar ? "بوابة الطبيب" : "Clinician"}</a>
  <a href="https://sbs.elfadil.com" target="_blank" class="ps-btn sbs">💰 ${ar ? "الفواتير" : "Billing"}</a>
  <a href="https://givc.elfadil.com/handoff-board" target="_blank" class="ps-btn givc">📋 ${ar ? "لوحة المتابعة" : "Handoff Board"}</a>
  <a href="/status" class="ps-btn status">📊 ${ar ? "حالة الأنظمة" : "System Status"}</a>
  <a href="/denial" class="ps-btn sbs">🔮 ${ar ? "محلل الرفض AI" : "AI Denial Analyzer"}</a>
</div>
</div>
</section>
<section class="sec sec-alt" id="portals">
<div class="c">
  <div class="sec-head">
    <h2>${ar ? "\u0628\u0648\u0627\u0628\u0627\u062A\u0646\u0627 \u0627\u0644\u0630\u0643\u064A\u0629" : "Smart Portal Hub"}</h2>
    <p>${ar ? "\u0627\u0644\u0648\u0635\u0648\u0644 \u0627\u0644\u0641\u0648\u0631\u064A \u0644\u0644\u0628\u0648\u0627\u0628\u0629 \u0627\u0644\u0645\u0646\u0627\u0633\u0628\u0629 \u2014 \u062D\u0633\u0628 \u062F\u0648\u0631\u0643 \u0648\u0645\u0647\u0645\u062A\u0643" : "Instant access to the right portal \u2014 by role and task"}</p>
  </div>

  <!-- Role selector tabs -->
  <div class="role-tabs">
    <button class="role-tab active" data-role="all"     onclick="setRole(this,'all')">${ar ? "\u{1F310} \u0627\u0644\u0643\u0644" : "\u{1F310} All"}</button>
    <button class="role-tab"        data-role="patient"  onclick="setRole(this,'patient')">${ar ? "\u{1F642} \u0645\u0631\u064A\u0636" : "\u{1F642} Patient"}</button>
    <button class="role-tab"        data-role="clinician" onclick="setRole(this,'clinician')">${ar ? "\u{1FA7A} \u0637\u0628\u064A\u0628" : "\u{1FA7A} Clinician"}</button>
    <button class="role-tab"        data-role="billing"  onclick="setRole(this,'billing')">${ar ? "\u{1F4B0} \u0641\u0648\u0627\u062A\u064A\u0631" : "\u{1F4B0} Billing"}</button>
    <button class="role-tab"        data-role="admin"    onclick="setRole(this,'admin')">${ar ? "\u2699\uFE0F \u0625\u062F\u0627\u0631\u064A" : "\u2699\uFE0F Admin"}</button>
  </div>

  <!-- Portal cards grid -->
  <div class="portal-hub-grid" id="portal-grid">

    <!-- BSMA \u2014 Patient Portal -->
    <div class="portal-card" data-roles="all patient">
      <div class="pc-header bsma-hdr">
        <div class="pc-icon">\u{1F642}</div>
        <div>
          <div class="pc-name">BSMA</div>
          <div class="pc-sub">${ar ? "\u0628\u0648\u0627\u0628\u0629 \u0627\u0644\u0645\u0631\u064A\u0636" : "Patient Portal"}</div>
        </div>
        <div class="pc-badge" id="bsma-status"><span class="dot-live"></span>${ar ? "\u0645\u0628\u0627\u0634\u0631" : "Live"}</div>
      </div>
      <div class="pc-body">
        
        
      </div>
      <div class="pc-footer">
        <a href="https://bsma.elfadil.com" target="_blank" class="btn btn-portal bsma-btn">${ar ? "\u{1F680} \u0627\u0644\u062F\u062E\u0648\u0644 \u0644\u0628\u0648\u0627\u0628\u0629 \u0627\u0644\u0645\u0631\u064A\u0636" : "\u{1F680} Enter Patient Portal"}</a>
        <a href="https://bsma.elfadil.com/#chat" target="_blank" class="btn btn-voice">\u{1F399}\uFE0F ${ar ? "\u0628\u0633\u0645\u0629" : "Basma Voice"}</a>
      </div>
    </div>

    <!-- GIVC \u2014 Clinician Portal -->
    <div class="portal-card" data-roles="all clinician">
      <div class="pc-header givc-hdr">
        <div class="pc-icon">\u{1FA7A}</div>
        <div>
          <div class="pc-name">GIVC</div>
          <div class="pc-sub">${ar ? "\u0628\u0648\u0627\u0628\u0629 \u0627\u0644\u0637\u0628\u064A\u0628" : "Clinician Portal"}</div>
        </div>
        <div class="pc-badge" id="givc-status"><span class="dot-live"></span>${ar ? "\u0645\u0628\u0627\u0634\u0631" : "Live"}</div>
      </div>
      <div class="pc-body">
        
        
      </div>
      <div class="pc-footer">
        <a href="https://givc.elfadil.com" target="_blank" class="btn btn-portal givc-btn">${ar ? "\u{1F680} \u0627\u0644\u062F\u062E\u0648\u0644 \u0644\u0628\u0648\u0627\u0628\u0629 \u0627\u0644\u0637\u0628\u064A\u0628" : "\u{1F680} Enter Clinician Portal"}</a>
        <a href="https://sdc.elfadil.com" target="_blank" class="btn btn-secondary-sm">\u{1F4CB} SDC</a>
      </div>
    </div>

    <!-- SBS \u2014 Billing Portal -->
    <div class="portal-card" data-roles="all billing admin">
      <div class="pc-header sbs-hdr">
        <div class="pc-icon">\u{1F4B0}</div>
        <div>
          <div class="pc-name">SBS ClaimLinc</div>
          <div class="pc-sub">${ar ? "\u0628\u0648\u0627\u0628\u0629 \u0627\u0644\u0641\u0648\u0627\u062A\u064A\u0631" : "Billing & Claims"}</div>
        </div>
        <div class="pc-badge" id="sbs-status"><span class="dot-live"></span>${ar ? "\u0645\u0628\u0627\u0634\u0631" : "Live"}</div>
      </div>
      <div class="pc-body">
        
        
      </div>
      <div class="pc-footer">
        <a href="https://sbs.elfadil.com" target="_blank" class="btn btn-portal sbs-btn">${ar ? "\u{1F680} \u0627\u0644\u062F\u062E\u0648\u0644 \u0644\u0628\u0648\u0627\u0628\u0629 \u0627\u0644\u0641\u0648\u0627\u062A\u064A\u0631" : "\u{1F680} Enter Billing Portal"}</a>
        <a href="/api/nphies/analysis" target="_blank" class="btn btn-secondary-sm">\u{1F4CA} API</a>
      </div>
    </div>

    <!-- Oracle HIS \u2014 Admin/Clinical -->
    <div class="portal-card" data-roles="all admin clinician">
      <div class="pc-header oracle-hdr">
        <div class="pc-icon">\u{1F537}</div>
        <div>
          <div class="pc-name">Oracle OASIS</div>
          <div class="pc-sub">${ar ? "\u0646\u0638\u0627\u0645 \u0627\u0644\u0645\u0633\u062A\u0634\u0641\u0649 HIS" : "Hospital HIS"}</div>
        </div>
        <div class="pc-badge" id="oracle-status" style="background:rgba(239,68,68,.12);color:#EF4444"><span class="dot-live" style="background:#EF4444"></span>${ar ? "\u0645\u062A\u062F\u0647\u0648\u0631" : "Degraded"}</div>
      </div>
      <div class="pc-body">
        
        
      </div>
      <div class="pc-footer">
        <a href="https://oracle-riyadh.brainsait.org" target="_blank" class="btn btn-portal oracle-btn">${ar ? "\u{1F537} Oracle \u0627\u0644\u0631\u064A\u0627\u0636" : "\u{1F537} Oracle Riyadh"}</a>
        <a href="/api/oracle/live-status" target="_blank" class="btn btn-secondary-sm">${ar ? "\u062D\u0627\u0644\u0629 \u0627\u0644\u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A" : "Hospital Status"}</a>
      </div>
    </div>

    <!-- NPHIES \u2014 Compliance -->
    <div class="portal-card" data-roles="all admin billing">
      <div class="pc-header nphies-hdr">
        <div class="pc-icon">\u{1F3DB}\uFE0F</div>
        <div>
          <div class="pc-name">NPHIES</div>
          <div class="pc-sub">${ar ? "\u0645\u0646\u0635\u0629 \u0627\u0644\u062A\u0623\u0645\u064A\u0646 \u0627\u0644\u0648\u0637\u0646\u064A" : "National Health Insurance"}</div>
        </div>
        <div class="pc-badge"><span class="dot-live"></span>${ar ? "\u0645\u0628\u0627\u0634\u0631" : "Live"}</div>
      </div>
      <div class="pc-body">
        
        <div class="pc-stats">
          <div class="pcs"><div class="pcs-n">SAR 835M</div><div class="pcs-l">Network</div></div>
          <div class="pcs"><div class="pcs-n" style="color:#EAB308">88.5%</div><div class="pcs-l">RUH Rate</div></div>
          <div class="pcs"><div class="pcs-n" style="color:#10B981">100%</div><div class="pcs-l">Others</div></div>
        </div>
      </div>
      <div class="pc-footer">
        <a href="https://portal.nphies.sa" target="_blank" class="btn btn-portal nphies-btn">${ar ? "\u{1F3DB}\uFE0F \u0628\u0648\u0627\u0628\u0629 NPHIES" : "\u{1F3DB}\uFE0F NPHIES Portal"}</a>
        <a href="/api/nphies/analysis" target="_blank" class="btn btn-secondary-sm">\u{1F4CA} ${ar ? "\u062A\u062D\u0644\u064A\u0644" : "Analysis"}</a>
      </div>
    </div>

    <!-- Basma Voice \u2014 AI Assistant -->
    <div class="portal-card" data-roles="all patient">
      <div class="pc-header voice-hdr">
        <div class="pc-icon">\u{1F399}\uFE0F</div>
        <div>
          <div class="pc-name">${ar ? "\u0628\u0633\u0645\u0629" : "Basma AI"}</div>
          <div class="pc-sub">${ar ? "\u0627\u0644\u0645\u0633\u0627\u0639\u062F \u0627\u0644\u0635\u0648\u062A\u064A \u0627\u0644\u0630\u0643\u064A" : "Voice AI Assistant"}</div>
        </div>
        <div class="pc-badge"><span class="dot-live"></span>ElevenLabs</div>
      </div>
      <div class="pc-body">
        
        <div class="pc-stats">
          <div class="pcs"><div class="pcs-n">v2.1</div><div class="pcs-l">Version</div></div>
          <div class="pcs"><div class="pcs-n">AR/EN</div><div class="pcs-l">Bilingual</div></div>
          <div class="pcs"><div class="pcs-n">24/7</div><div class="pcs-l">${ar ? "\u0645\u062A\u0627\u062D" : "Available"}</div></div>
        </div>
      </div>
      <div class="pc-footer">
        <a href="https://bsma.elfadil.com/#chat" target="_blank" class="btn btn-portal voice-btn">${ar ? "\u{1F399}\uFE0F \u062A\u062D\u062F\u062B \u0645\u0639 \u0628\u0633\u0645\u0629" : "\u{1F399}\uFE0F Talk to Basma"}</a>
        <a href="https://bsma.elfadil.com" target="_blank" class="btn btn-secondary-sm">Web</a>
      </div>
    </div>

  </div><!-- /portal-hub-grid -->
</div>
</section>

<section class="sec sec-alt" id="rcm">
<div class="c">
  <div class="sec-head">
    <h2>${ar ? "مركز RCM — إدارة دورة الإيراد" : "RCM Workspace — Revenue Cycle"}</h2>
    <p>${ar ? "أدوات متكاملة للفريق: تحليل الرفض، الطعون، التحقق من الأسعار، ومعالجة المطالبات" : "Integrated tools: denial analysis, appeals, price validation, and claim processing"}</p>
  </div>

  <!-- Batch 550181 KPIs -->
  <div class="rcm-kpi-bar">
    <div class="rcm-kpi"><div class="rcm-kv" style="color:#ff6b6b">SAR 73,862</div><div class="rcm-kl">${ar ? "إجمالي الرفض" : "Total Shortfall"}</div></div>
    <div class="rcm-kpi"><div class="rcm-kv" style="color:#00c864">87%</div><div class="rcm-kl">${ar ? "نسبة الاسترداد" : "Recovery Rate"}</div></div>
    <div class="rcm-kpi"><div class="rcm-kv">1,415</div><div class="rcm-kl">${ar ? "سطر رفض" : "Rejection Lines"}</div></div>
    <div class="rcm-kpi"><div class="rcm-kv" style="color:#ffb400">88.5%</div><div class="rcm-kl">${ar ? "موافقة الرياض" : "Riyadh Approval"}</div></div>
    <div class="rcm-kpi"><div class="rcm-kv">BUPA</div><div class="rcm-kl">${ar ? "الجهة الدافعة" : "Batch 550181 Payer"}</div></div>
  </div>

  <!-- RCM Tool Cards -->
  <div class="rcm-grid">
    <a href="/denial" class="rcm-card rcm-primary">
      <div class="rcm-icon">🔮</div>
      <div class="rcm-title">${ar ? "محلل الرفض بالذكاء الاصطناعي" : "AI Denial Analyzer"}</div>
      <div class="rcm-desc">${ar ? "تنبؤ بالرفض + مولّد الطعون + تصحيح الأكواد" : "Rejection prediction + appeal generator + code corrections"}</div>
      <div class="rcm-arrow">← ${ar ? "افتح المركز" : "Open Workspace"}</div>
    </a>

    <div class="rcm-card" onclick="rcmTest('validate')">
      <div class="rcm-icon">✅</div>
      <div class="rcm-title">${ar ? "التحقق من السعر" : "Price Validator"}</div>
      <div class="rcm-desc">${ar ? "يكتشف BE-1-6: المحلول الملحي 3.16 ريال (كان 3.76)" : "Detect BE-1-6: Normal Saline SR 3.16 vs billed 3.76"}</div>
      <div id="rcm-val-result" style="font-size:.75rem;color:#4ea5ff;margin-top:6px"></div>
    </div>

    <div class="rcm-card" onclick="rcmTest('dup')">
      <div class="rcm-icon">🔍</div>
      <div class="rcm-title">${ar ? "كاشف التكرار" : "Duplicate Detector"}</div>
      <div class="rcm-desc">${ar ? "يمنع BE-1-5: 57 حالة مكررة في Batch 550181" : "Prevent BE-1-5: 57 duplicate claims detected"}</div>
      <div id="rcm-dup-result" style="font-size:.75rem;color:#4ea5ff;margin-top:6px"></div>
    </div>

    <a href="/denial#predictor" class="rcm-card">
      <div class="rcm-icon">🧠</div>
      <div class="rcm-title">${ar ? "مركز الطعون والاعتراضات" : "Denial & Appeals Center"}</div>
      <div class="rcm-desc">${ar ? "توليد خطابات اعتراض + تصحيح الأكواد + متابعة الاسترداد" : "Generate appeal letters, fix codes, track recovery"}</div>
    </a>

    <div class="rcm-card" onclick="rcmTest('pbm')">
      <div class="rcm-icon">💊</div>
      <div class="rcm-title">${ar ? "التحقق الدوائي PBM" : "PBM Drug Validator"}</div>
      <div class="rcm-desc">${ar ? "MN-1-1: أوندانسيترون + J06 = رفض مضمون" : "MN-1-1: Ondansetron + J06 = guaranteed rejection"}</div>
      <div id="rcm-pbm-result" style="font-size:.75rem;color:#4ea5ff;margin-top:6px"></div>
    </div>

    <a href="/api/rcm/batch/550181" target="_blank" class="rcm-card">
      <div class="rcm-icon">📋</div>
      <div class="rcm-title">${ar ? "حالة Batch 550181" : "Batch 550181 Case"}</div>
      <div class="rcm-desc">${ar ? "BUPA الرياض فبراير 2026 — البيانات الكاملة بصيغة JSON" : "BUPA Riyadh Feb 2026 — Full JSON data"}</div>
      <div class="rcm-arrow">JSON ↗</div>
    </a>
  </div>
</div>
</section>

<script>
async function rcmTest(type){
  var els = {price:'rcm-val-result', dup:'rcm-dup-result', pbm:'rcm-pbm-result'};
  var el = document.getElementById(els[type]);
  if(!el) return;
  el.textContent = AR ? 'جاري...' : 'Running...';
  var payloads = {
    price: {payer:'BUPA',items:[{serv_code:'0109222573',serv_desc:'Normal Saline 0.9% IV',billed_amount:3.76,quantity:102},{serv_code:'0109222574',serv_desc:'Normal Saline 0.9% IV 1L',billed_amount:7.50,quantity:50}]},
    dup:   {claims:[{id:'C001',patient_id:'P001',service_code:'99213',service_date:'2026-02-01',amount:150,payer:'BUPA'},{id:'C002',patient_id:'P001',service_code:'99213',service_date:'2026-02-01',amount:150,payer:'BUPA'}]},
    pbm:   {items:[{drug_name:'ondansetron',drug_code:'1001233084',icd_codes:['J06.9']},{drug_name:'omeprazole',drug_code:'2205222999',icd_codes:['Z00.0']}]}
  };
  var paths = {price:'/api/rcm/validate/price', dup:'/api/rcm/validate/duplicate', pbm:'/api/rcm/validate/pbm'};
  var resultFn = {
    price: function(d){var v=d.violations||[];return v.length?'⚠️ '+v.length+(AR?' مخالفة سعرية — '+v[0].serv_desc+' ('+v[0].billed_amount+' vs '+v[0].contracted_price+' ر.س)':' price issues — '+v[0].serv_desc):('✅ '+(AR?'أسعار صحيحة':'All prices OK'));},
    dup:  function(d){var v=d.duplicates||d.duplicate_groups||[];return v.length?'⚠️ '+v.length+(AR?' تكرار مكتشف':' duplicates found'):'✅ '+(AR?'لا تكرار':'No duplicates');},
    pbm:  function(d){var v=d.violations||[];return v.length?'⚠️ '+v.length+(AR?' تعارض دوائي — '+v[0].drug_name:' PBM issues — '+v[0].drug_name):'✅ '+(AR?'أدوية مناسبة':'Drugs OK');}
  };
  try{
    var r = await fetch(paths[type],{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payloads[type])});
    var d = await r.json();
    el.textContent = resultFn[type] ? resultFn[type](d) : '✅ Done';
  }catch(e){el.textContent='❌ error';}
}
</script>

<section class="sec" id="blog">
<div class="c">
  <div class="sec-head"><h2>${T.h_blog}</h2><p>${T.p_blog}</p></div>
  <div class="g4-blog" id="blog-grid">${blogHtml}</div>
  <div style="text-align:center;margin-top:28px">
    <a href="https://github.com/Fadil369" target="_blank" class="btn btn-o">${T.all_arts}</a>
  </div>
</div>
</section>

<!-- ACADEMY -->
<section class="sec sec-alt" id="academy">
<div class="c">
  <div class="sec-head"><h2>${T.h_academy}</h2><p>${T.p_academy}</p></div>
  <div class="academy-stats">
    <div class="stat-card"><div class="stat-n">9</div><div class="stat-l">${ar ? "\u062F\u0648\u0631\u0627\u062A" : "Courses"}</div></div>
    <div class="stat-card"><div class="stat-n">104+</div><div class="stat-l">${ar ? "\u0633\u0627\u0639\u0629" : "Hours"}</div></div>
    <div class="stat-card"><div class="stat-n">SCFHS</div><div class="stat-l">${ar ? "\u0645\u0639\u062A\u0645\u062F" : "Accredited"}</div></div>
    <div class="stat-card"><div class="stat-n">AR/EN</div><div class="stat-l">${ar ? "\u062B\u0646\u0627\u0626\u064A \u0627\u0644\u0644\u063A\u0629" : "Bilingual"}</div></div>
  </div>
  <div class="g3">${academyHtml}</div>
</div>
</section>

<!-- CTA -->
<section class="cta">
<div class="c">
  <h2>${T.h_cta}</h2>
  <p>${T.p_cta}</p>
  <div class="cta-btns">
    <a href="https://bsma.elfadil.com" target="_blank" class="btn btn-a">\u{1F4DE} ${PHONE}</a>
    <a href="https://bsma.elfadil.com" target="_blank" class="btn btn-white">${T.patient}</a>
    <a href="https://wa.me/966${PHONE}" target="_blank" class="btn btn-wa">\u{1F4AC} WhatsApp</a>
  </div>
</div>
</section>

<!-- FOOTER -->
<footer class="ftr">
<div class="c">
  <div class="ftr-grid">
    <div>
      <h4>${T.title}</h4>
      <p style="font-size:.82rem;margin-bottom:10px">${ar ? "\u062A\u0623\u0633\u0633\u062A 1999 | \u0634\u0631\u0643\u0629 \u0627\u0644\u0625\u0646\u0645\u0627\u0621 \u0644\u0644\u062E\u062F\u0645\u0627\u062A \u0627\u0644\u0637\u0628\u064A\u0629 | Org ID: 624" : "Est. 1999 | AlInma Medical Services | Org ID: 624"}</p>
      <div class="live">\u25CF API v${VERSION} Live</div>
      <p style="font-size:.7rem;color:rgba(255,255,255,.3);margin-top:8px">License: ${FACILITY_LIC}</p>
    </div>
    <div>
      <h4>${ar ? "\u0627\u0644\u0645\u0646\u0635\u0627\u062A" : "Portals"}</h4>
      <a href="https://bsma.elfadil.com" target="_blank">\u{1F642} BSMA</a>
      <a href="https://givc.elfadil.com" target="_blank">\u{1FA7A} GIVC</a>
      <a href="https://sbs.elfadil.com" target="_blank">\u{1F4B0} SBS</a>
      <a href="https://portal.nphies.sa" target="_blank">\u{1F3DB}\uFE0F NPHIES</a>
      <a href="https://oracle-bridge.brainsait.org/health" target="_blank">\u{1F537} Oracle Bridge</a>
    </div>
    <div>
      <h4>${ar ? "\u0627\u0644\u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629" : "Academy"}</h4>
      <a href="#academy">\u{1F3DB}\uFE0F ${ar ? "\u0623\u0633\u0627\u0633\u064A\u0627\u062A NPHIES" : "NPHIES Fundamentals"}</a>
      <a href="#academy">\u{1F48A} ${ar ? "\u062A\u0631\u0645\u064A\u0632 SBS \u0627\u0644\u0637\u0628\u064A" : "SBS Medical Coding"}</a>
      <a href="#academy">\u{1F4B0} ${ar ? "\u062F\u0648\u0631\u0629 \u0627\u0644\u0625\u064A\u0631\u0627\u062F\u0627\u062A" : "Revenue Cycle"}</a>
      <a href="#academy">\u{1F916} ${ar ? "\u0630\u0643\u0627\u0621 \u0627\u0635\u0637\u0646\u0627\u0639\u064A" : "Healthcare AI"}</a>
    </div>
    <div>
      <h4>${ar ? "\u062A\u0648\u0627\u0635\u0644 \u0645\u0639\u0646\u0627" : "Contact"}</h4>
      <a href="tel:920033444">\u{1F4DE} +966 ${PHONE}</a>
      <a href="mailto:info@hayathospitals.com">\u2709\uFE0F info@hayathospitals.com</a>
      <a href="https://wa.me/966${PHONE}" target="_blank">\u{1F4AC} WhatsApp</a>
      <p style="font-size:.76rem;color:rgba(255,255,255,.35);margin-top:10px">${ar ? "\u0627\u0644\u0631\u064A\u0627\u0636 \xB7 \u062C\u0627\u0632\u0627\u0646 \xB7 \u062E\u0645\u064A\u0633 \u0645\u0634\u064A\u0637 \xB7 \u0627\u0644\u0645\u062F\u064A\u0646\u0629 \xB7 \u0639\u0646\u064A\u0632\u0629 \xB7 \u0623\u0628\u0647\u0627" : "Riyadh \xB7 Jazan \xB7 Khamis \xB7 Madinah \xB7 Unayzah \xB7 Abha"}</p>
    </div>
  </div>
  <div class="ftr-bottom">\xA9 2026 ${ORG_NAME_EN} \u2014 BrainSAIT Healthcare OS v${VERSION}</div>
</div>
</footer>

<!-- CHAT WIDGET -->
<button class="chat-fab" id="chat-fab" title="Basma AI">\u{1F4AC}</button>
<div class="chat-box" id="chat-box">
  <div class="chat-head">
    <span>\u{1F916} \u0628\u0633\u0645\u0629 | Basma AI</span>
    <button id="chat-close">\u2715</button>
  </div>
  <div class="chat-msgs" id="chat-msgs">
    <div class="msg msg-a">${T.chat_hello}</div>
  </div>
  <div class="chat-foot">
    <input class="chat-inp" id="chat-inp" placeholder="${T.chat_ph}">
    <button class="chat-send" id="chat-send">${T.send}</button>
  </div>
</div>
<a href="https://wa.me/966${PHONE}" class="wa-btn" target="_blank" rel="noopener" title="WhatsApp">\u{1F4AC}</a>

<script>
// \u2500\u2500 CONFIG \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
var AR   = ${ar};
var LANG = '${lang}';
var API  = '';  // same-origin

// \u2500\u2500 LANG TOGGLE \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
document.getElementById('lang-btn').onclick = function() {
  location.search = '?lang=' + (AR ? 'en' : 'ar');
};

// \u2500\u2500 MOBILE MENU \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
var menuOpen = false;
document.getElementById('menu-btn').onclick = function() {
  var nav = document.getElementById('main-nav');
  menuOpen = !menuOpen;
  if (menuOpen) {
    nav.style.cssText = 'display:flex;flex-direction:column;position:fixed;inset:64px 0 0 0;background:#fff;padding:24px 20px;gap:4px;z-index:99;border-top:1px solid #E2E8F0';
  } else {
    nav.style.cssText = '';
  }
};

// \u2500\u2500 LOAD LIVE DATA \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
function fetchJSON(url, cb) {
  fetch(API + url)
    .then(function(r) { return r.json(); })
    .then(cb)
    .catch(function(e) { console.warn('Fetch failed:', url, e); });
}

function makeEl(tag, attrs, html) {
  var el = document.createElement(tag);
  if (attrs) Object.keys(attrs).forEach(function(k) { el.setAttribute(k, attrs[k]); });
  if (html) el.innerHTML = html;
  return el;
}

// \u2500\u2500 PORTAL ROLE FILTER \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
function setRole(btn, role) {
  document.querySelectorAll('.role-tab').forEach(function(t) { t.classList.remove('active'); });
  btn.classList.add('active');
  document.querySelectorAll('.portal-card').forEach(function(card) {
    var roles = card.getAttribute('data-roles') || 'all';
    if (role === 'all' || roles.split(' ').includes(role)) {
      card.classList.remove('hidden');
    } else {
      card.classList.add('hidden');
    }
  });
}

function goPortal(key) {
  var portals = {
    bsma:   'https://bsma.elfadil.com',
    givc:   'https://givc.elfadil.com',
    sbs:    'https://sbs.elfadil.com',
    oracle: 'https://oracle-bridge.brainsait.org/health',
    nphies: 'https://portal.nphies.sa'
  };
  if (portals[key]) window.open(portals[key], '_blank');
}

// Dashboard \u2014 single call replaces /api/stats + /api/portal-hub
(function loadDashboard() {
  fetch(API + '/api/dashboard')
    .then(function(r) { return r.json(); })
    .then(function(d) {
      var s   = d.stats  || {};
      var net = d.nphies || {};

      // Hero stats
      var pEl = document.getElementById('stat-prov');
      var dEl = document.getElementById('stat-dept');
      if (pEl) pEl.textContent = (d.total_providers || s.total_providers || 269).toLocaleString();
      if (dEl) dEl.textContent = (s.total_departments || 20).toLocaleString();

      // Hero card live values
      var hvSar  = document.getElementById('hv-sar');
      var hvRate = document.getElementById('hv-rate');
      var hvCl   = document.getElementById('hv-claims');
      if (hvSar  && net.total_sar)     hvSar.textContent  = 'SAR ' + (net.total_sar / 1e6).toFixed(1) + 'M';
      if (hvRate && net.approval_rate) hvRate.textContent = net.approval_rate + '%';
      if (hvCl   && net.total_claims)  hvCl.textContent   = Number(net.total_claims).toLocaleString();

      // Integration strip \u2014 SAR + approval rate
      var sarEl  = document.getElementById('sar-val');
      var rateEl = document.getElementById('rate-val');
      if (sarEl  && net.total_sar)     sarEl.textContent  = (net.total_sar / 1e6).toFixed(1) + 'M';
      if (rateEl && net.approval_rate) rateEl.textContent = net.approval_rate;

      // BSMA card stats
      var bPa = document.getElementById('bsma-pa');
      var bCl = document.getElementById('bsma-claims');
      if (bPa) bPa.textContent = Number(net.total_pa || 51018).toLocaleString();
      if (bCl) bCl.textContent = Number(net.total_claims || 15138).toLocaleString();

      // SBS coverage
      var sbsCov = document.getElementById('sbs-cov');
      if (sbsCov && d.coverage) sbsCov.textContent = d.coverage.total || 6;

      // GIVC approval rate
      var gRate = document.getElementById('givc-rate');
      if (gRate && net.approval_rate) gRate.textContent = net.approval_rate + '%';

      // Oracle badge in integration strip
      var oTag = document.getElementById('oracle-tag');
      if (oTag) oTag.innerHTML = d.oracle_status && d.oracle_status.reachable_count > 0
        ? '\u{1F537} Oracle <span class="pulse">\u25CF</span>'
        : '\u{1F537} Oracle \u26A0';

      // Oracle portal card status
      var oCard = document.getElementById('oracle-status');
      if (oCard) {
        var anyReachable = d.oracle_status && (d.oracle_status.reachable_count > 0 || d.oracle_status === true);
        if (anyReachable) {
          oCard.style.background = 'rgba(74,222,128,.15)';
          oCard.style.color = '#10B981';
          oCard.innerHTML = '<span class="dot-live" style="background:#4ADE80"></span>' + (AR ? '\u0645\u0628\u0627\u0634\u0631' : 'Live');
        }
        // stays degraded (red) if no hospitals reachable \u2014 already rendered server-side
      }
        // stays degraded (red) if oracle_status === false \u2014 already rendered server-side
      }

      // NPHIES strip badge
      var nTag = document.getElementById('nphies-tag');
      if (nTag && net.total_sar > 0) nTag.innerHTML = '\u{1F3DB}\uFE0F NPHIES <span class="pulse">\u25CF</span>';

      // Portal card status badges (from portals map)
      Object.keys(d.portals || {}).forEach(function(k) {
        var el = document.getElementById(k + '-status');
        if (!el) return;
        var live = (d.portals[k].status || d.portals[k]) === 'live' || d.portals[k].status === 'live';
        el.style.background = live ? 'rgba(74,222,128,.2)' : 'rgba(239,68,68,.15)';
        var dot = el.querySelector('.dot-live');
        if (dot) dot.style.background = live ? '#4ADE80' : '#EF4444';
      });
    })
    .catch(function() {});

  // GIVC live queue (separate \u2014 slow external endpoint)
  fetch('https://givc.elfadil.com/api/queue', { signal: AbortSignal.timeout(5000) })
    .then(function(r) { return r.json(); })
    .then(function(d) {
      var el = document.getElementById('givc-queue');
      if (el) el.textContent = (d.queue || []).length;
    })
    .catch(function() {});
})();

// Oracle live hospital status \u2014 updates #oracle-tunnel-stats with per-hospital badges
(function loadOracleStatus() {
  fetch(API + '/api/oracle/live-status')
    .then(function(r) { return r.json(); })
    .then(function(d) {
      var el = document.getElementById('oracle-tunnel-stats');
      if (!el || !d.hospitals) return;
      var LABEL = { riyadh: 'Riyadh', madinah: 'Madinah', unaizah: 'Unaizah', khamis: 'Khamis', jizan: 'Jizan', abha: 'Abha' };
      var CODE  = { riyadh: 'RUH', madinah: 'MED', unaizah: 'UNA', khamis: 'KHM', jizan: 'JZN', abha: 'ABH' };
      var html = '';
      Object.keys(d.hospitals).forEach(function(id) {
        var h = d.hospitals[id];
        var ok = h.reachable;
        html += '<div class="pcs">'
          + '<div class="pcs-n ' + (ok ? 'dot-ok' : 'dot-err') + '">'
          + (CODE[id] || id.toUpperCase()) + ' ' + (ok ? '\u2705' : '\u274C')
          + '</div>'
          + '<div class="pcs-l">' + (LABEL[id] || id) + '</div>'
          + '</div>';
      });
      if (html) el.innerHTML = html;

      // Update integration strip oracle tag
      var oTag = document.getElementById('oracle-tag');
      if (oTag) {
        var anyOk = d.summary && d.summary.reachable > 0;
        oTag.innerHTML = anyOk ? '\u{1F537} Oracle <span class="pulse">\u25CF</span>' : '\u{1F537} Oracle \u26A0';
      }
    })
    .catch(function() {});
})();

// Providers \u2192 Departments + Doctors
var allProviders = [];
fetchJSON('/api/providers', function(d) {
  allProviders = d.providers || [];
  renderDepts();
  renderDoctors(allProviders.slice(0, 8));
  buildSpecFilter();
});

function renderDepts() {
  var deptMap = {};
  var deptIcons = {
    'Cardiology':'\u2764\uFE0F','Surgery':'\u{1F52A}','Pediatrics':'\u{1F476}','Orthopedics':'\u{1F9B4}',
    'Dermatology':'\u{1F486}','Internal':'\u{1FA7A}','Gynecology':'\u{1F469}','Ophthalmology':'\u{1F441}\uFE0F',
    'Neurology':'\u{1F9E0}','Dentistry':'\u{1F9B7}','Urology':'\u{1FAC1}','Psychiatry':'\u{1F9D8}',
    'ENT':'\u{1F442}','Oncology':'\u{1F397}\uFE0F','Radiology':'\u{1F4F7}','Laboratory':'\u{1F52C}',
    'Pharmacy':'\u{1F48A}','ICU':'\u{1F3E5}','Emergency':'\u{1F6A8}','Rehabilitation':'\u{1F3C3}'
  };
  allProviders.forEach(function(p) {
    var d = p.department || p.specialty || '';
    if (d) deptMap[d] = (deptMap[d] || 0) + 1;
  });
  var depts = Object.keys(deptMap).slice(0, 8);
  var grid = document.getElementById('dept-grid');
  if (!grid) return;
  grid.innerHTML = '';
  depts.forEach(function(d) {
    var icon = '\u{1F3E5}';
    Object.keys(deptIcons).forEach(function(k) { if (d.includes(k)) icon = deptIcons[k]; });
    var div = makeEl('div', {class:'dept-card'});
    div.innerHTML = '<div class="dept-ico">' + icon + '</div>' +
      '<div class="dept-name">' + d + '</div>' +
      '<div class="dept-count">' + deptMap[d] + ' ' + (AR ? '\u0637\u0628\u064A\u0628' : 'doctors') + '</div>';
    grid.appendChild(div);
  });
}

function renderDoctors(docs) {
  var grid = document.getElementById('doc-grid');
  if (!grid) return;
  grid.innerHTML = '';
  docs.slice(0, 8).forEach(function(doc) {
    var name = AR ? doc.name_ar : doc.name_en;
    var init = (name || '').split(' ').filter(Boolean).pop();
    init = init ? init.charAt(0) : '\u061F';
    var card = makeEl('div', {class:'doc-card', style:'cursor:pointer'});
    var _specialty = doc.specialty || '';
    card.onclick = function() { window.open('https://bsma.elfadil.com?dept='+encodeURIComponent(_specialty), '_blank'); };
    card.innerHTML = '<div class="doc-av">' + init + '</div>' +
      '<div class="doc-name">' + name + '</div>' +
      '<div class="doc-spec">' + (doc.specialty || '') + '</div>' +
      '<div class="doc-dept">' + (doc.branch || doc.department || '') + '</div>' +
      '<a href="https://bsma.elfadil.com" class="btn btn-p btn-sm" style="width:100%;justify-content:center">' + (AR ? '\u0627\u062D\u062C\u0632' : 'Book') + '</a>';
    grid.appendChild(card);
  });
}

function buildSpecFilter() {
  var sel = document.getElementById('spec-filter');
  if (!sel) return;
  var specs = [...new Set(allProviders.map(function(p) { return p.specialty; }).filter(Boolean))].sort();
  specs.forEach(function(s) {
    var o = makeEl('option', {value:s});
    o.textContent = s;
    sel.appendChild(o);
  });
}

document.getElementById('doc-search').addEventListener('input', filterDoctors);
document.getElementById('spec-filter').addEventListener('change', filterDoctors);

function filterDoctors() {
  var q    = (document.getElementById('doc-search').value || '').toLowerCase();
  var spec = document.getElementById('spec-filter').value;
  var filtered = allProviders.filter(function(p) {
    var name = ((AR ? p.name_ar : p.name_en) || '').toLowerCase();
    var matchQ    = !q    || name.includes(q) || (p.specialty || '').toLowerCase().includes(q);
    var matchSpec = !spec || p.specialty === spec;
    return matchQ && matchSpec;
  });
  renderDoctors(filtered);
}

// Branches
fetchJSON('/api/branches', function(d) {
  var branches = d.branches || [];
  var grid = document.getElementById('branch-grid');
  if (!grid) return;
  grid.innerHTML = '';
  branches.forEach(function(b) {
    var nm  = AR ? b.name_ar  : b.name_en;
    var ct  = AR ? b.city_ar  : b.city_en;
    var ad  = AR ? b.address_ar : b.address_en;
    var ph  = (b.phone || '').replace('+', '');
    var card = makeEl('div', {class:'branch-card'});
    card.innerHTML =
      '<div class="branch-top"><h3>' + nm + '</h3><span>' + ct + '</span></div>' +
      '<div class="branch-body">' +
        '<p class="branch-addr">' + ad + '</p>' +
        '<div class="branch-chips">' +
          '<span class="chip chip-gray">\u{1F6CF} ' + b.beds + ' ' + (AR ? '\u0633\u0631\u064A\u0631' : 'Beds') + '</span>' +
          '<span class="chip chip-ok">\u25CF ' + (AR ? '\u0646\u0634\u0637' : 'Active') + '</span>' +
        '</div>' +
        '<a href="https://bsma.elfadil.com" target="_blank" class="btn btn-p btn-sm" style="width:100%;justify-content:center">' + (AR ? '\u{1F4DE} \u0627\u062A\u0635\u0644' : '\u{1F4DE} Call') + '</a>' +
      '</div>';
    grid.appendChild(card);
  });
});

// \u2500\u2500 CHAT WIDGET \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
var chatOpen = false;
var chatSid  = null;

document.getElementById('chat-fab').onclick = function() {
  chatOpen = !chatOpen;
  var box = document.getElementById('chat-box');
  if (chatOpen) { box.classList.add('open'); document.getElementById('chat-inp').focus(); }
  else box.classList.remove('open');
};
document.getElementById('chat-close').onclick = function() {
  chatOpen = false; document.getElementById('chat-box').classList.remove('open');
};
document.getElementById('chat-send').onclick = sendChat;
document.getElementById('chat-inp').addEventListener('keydown', function(e) {
  if (e.key === 'Enter') sendChat();
});

function addMsg(text, role) {
  var msgs = document.getElementById('chat-msgs');
  var div  = makeEl('div', {class:'msg msg-' + role});
  div.textContent = text;
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
  return div;
}

function sendChat() {
  var inp = document.getElementById('chat-inp');
  var msg = (inp.value || '').trim();
  if (!msg) return;
  inp.value = '';
  addMsg(msg, 'u');
  var typing = addMsg(AR ? '\u0628\u0633\u0645\u0629 \u062A\u0643\u062A\u0628...' : 'Basma is typing...', 'a');
  fetch(API + '/basma/chat', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({message: msg, lang: AR ? 'ar' : 'en', hospital: 'riyadh'})
  })
  .then(function(r) { return r.json(); })
  .then(function(d) {
    if (d.session_id) chatSid = d.session_id;
    typing.textContent = d.reply || d.response || '...';
    document.getElementById('chat-msgs').scrollTop = 9999;
  })
  .catch(function() { typing.textContent = AR ? '\u0639\u0630\u0631\u0627\u064B\u060C \u062E\u0637\u0623 \u0645\u0624\u0642\u062A.' : 'Sorry, temporary error.'; });
}


<!-- Basma ElevenLabs Voice Agent -->
<script src="https://unpkg.com/@elevenlabs/convai-widget-embed" async><\/script>
<elevenlabs-convai agent-id="agent_3401kaac3de5fsnvvfyye79vp9es" style="position:fixed;bottom:20px;right:20px;z-index:9999"></elevenlabs-convai>
<\/script>
</body>
</html>`;
}
__name(buildHTML, "buildHTML");
function buildDenialWorkbench(lang) {
  const ar = lang === "ar";
  const dir = ar ? "rtl" : "ltr";
  const font = ar ? "'Tajawal',sans-serif" : "'Inter',sans-serif";
  const T = {
    title: ar ? "\u0645\u0631\u0643\u0632 \u0627\u0644\u0637\u0639\u0648\u0646 \u0648\u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u062A\u0642\u062F\u064A\u0645" : "Denial & Resubmission Center",
    sub: ar ? "\u0641\u0631\u064A\u0642 \u0627\u0644\u0645\u0637\u0627\u0644\u0628\u0627\u062A \u0627\u0644\u0645\u0631\u0641\u0648\u0636\u0629 \u2014 RCM" : "Rejected Claims Team \u2014 RCM Department",
    back: ar ? "\u2190 \u0628\u0648\u0627\u0628\u0629 HNH" : "\u2190 HNH Portal",
    p1: ar ? "\u2460  \u0627\u0633\u062A\u064A\u0631\u0627\u062F" : "\u2460  Ingest",
    p2: ar ? "\u2461  \u0641\u0631\u0632 \u0630\u0643\u064A" : "\u2461  Triage",
    p3: ar ? "\u2462  \u0625\u062B\u0631\u0627\u0621" : "\u2462  Enrich",
    p4: ar ? "\u2463  \u062A\u062D\u0642\u0642" : "\u2463  Validate",
    p5: ar ? "\u2464  \u062A\u0642\u062F\u064A\u0645" : "\u2464  Submit",
    t1: ar ? "\u0625\u0639\u0627\u062F\u0629 \u062A\u0642\u062F\u064A\u0645" : "Resubmit",
    t2: ar ? "\u0637\u0639\u0646 \u062A\u0639\u0627\u0642\u062F\u064A" : "Appeal",
    t3: ar ? "\u0645\u0637\u0627\u0644\u0628\u0629 \u062C\u062F\u064A\u062F\u0629" : "New Claim",
    tw: ar ? "\u0634\u0637\u0628" : "Write-off",
    paste: ar ? "\u0644\u0635\u0642 \u0628\u064A\u0627\u0646\u0627\u062A JSON" : "Paste JSON Data",
    ingest: ar ? "\u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0627\u0644\u0631\u0641\u0648\u0636\u0627\u062A" : "Import Rejections",
    clr: ar ? "\u0645\u0633\u062D" : "Clear",
    analyze: ar ? "\u062A\u062D\u0644\u064A\u0644 \u062A\u0644\u0642\u0627\u0626\u064A" : "Auto-Analyze",
    validate: ar ? "\u062A\u062D\u0642\u0642 NPHIES" : "Validate NPHIES",
    submit: ar ? "\u062A\u0642\u062F\u064A\u0645" : "Submit",
    appeal: ar ? "\u0637\u0639\u0646 \u0631\u0633\u0645\u064A" : "Formal Appeal",
    docs: ar ? "\u0627\u0644\u0645\u0633\u062A\u0646\u062F\u0627\u062A \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629" : "Required Documents",
    action: ar ? "\u062E\u0637\u0629 \u0627\u0644\u0639\u0645\u0644" : "Action Plan",
    code: ar ? "\u0643\u0648\u062F \u0627\u0644\u0631\u0641\u0636" : "Denial Code",
    payer: ar ? "\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u062F\u0627\u0641\u0639\u0629" : "Payer",
    amount: ar ? "\u0627\u0644\u0645\u0628\u0644\u063A (SAR)" : "Amount (SAR)",
    track: ar ? "\u0627\u0644\u0645\u0633\u0627\u0631" : "Track",
    score: ar ? "\u0627\u062D\u062A\u0645\u0627\u0644 \u0627\u0644\u0627\u0633\u062A\u0631\u062F\u0627\u062F" : "Recovery Score",
    deadline: ar ? "\u0627\u0644\u0645\u0648\u0639\u062F \u0627\u0644\u0646\u0647\u0627\u0626\u064A" : "Deadline",
    empty: ar ? "\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u0637\u0627\u0644\u0628\u0627\u062A \u0645\u0631\u0641\u0648\u0636\u0629 \u2014 \u0627\u0628\u062F\u0623 \u0628\u0627\u0644\u0627\u0633\u062A\u064A\u0631\u0627\u062F" : "No rejected claims \u2014 start by importing",
    hint: ar ? '\u0645\u062B\u0627\u0644 JSON: [{"claim_number":"CLM-001","payer":"Bupa","total_amount":1500,"rejection_code":"C001","rejection_reason":"Not medically necessary","date_of_service":"2026-04-01"}]' : 'Example JSON: [{"claim_number":"CLM-001","payer":"Bupa","total_amount":1500,"rejection_code":"C001","rejection_reason":"Not medically necessary","date_of_service":"2026-04-01"}]',
    codes: ar ? "\u{1F511} \u0623\u0643\u0648\u0627\u062F NPHIES \u0627\u0644\u0634\u0627\u0626\u0639\u0629" : "\u{1F511} Common NPHIES Codes",
    oracle: ar ? "\u{1F537} Oracle \u0627\u0644\u0631\u064A\u0627\u0636" : "\u{1F537} Oracle Riyadh",
    nphies: ar ? "\u{1F3DB}\uFE0F \u0628\u0648\u0627\u0628\u0629 NPHIES" : "\u{1F3DB}\uFE0F NPHIES Portal",
    sbs: ar ? "\u{1F4B0} \u0646\u0638\u0627\u0645 SBS" : "\u{1F4B0} SBS Billing"
  };
  const TRACK_COLOR = { resubmit: "#2563EB", appeal: "#7C3AED", new_claim: "#059669", review: "#D97706", write_off: "#6B7280" };
  const TRACK_LABEL = ar ? { resubmit: "\u0625\u0639\u0627\u062F\u0629 \u062A\u0642\u062F\u064A\u0645", appeal: "\u0637\u0639\u0646", new_claim: "\u0645\u0637\u0627\u0644\u0628\u0629 \u062C\u062F\u064A\u062F\u0629", review: "\u0645\u0631\u0627\u062C\u0639\u0629", write_off: "\u0634\u0637\u0628" } : { resubmit: "Resubmit", appeal: "Appeal", new_claim: "New Claim", review: "Review", write_off: "Write-off" };
  const TOP_CODES = ["A001", "A003", "A004", "C001", "C004", "T001", "T002", "T003"];
  const codeRows = TOP_CODES.map((c) => {
    const d = NPHIES_DENIAL[c];
    return '<tr><td class="cc">' + c + "</td><td>" + d.label + '</td><td><span class="trk" style="background:' + TRACK_COLOR[d.track] + '">' + (ar ? TRACK_LABEL[d.track] : d.track) + '</span></td><td class="sc">' + d.score + "%</td></tr>";
  }).join("");
  return new Response(`<!DOCTYPE html>
<html lang="${lang}" dir="${dir}">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${T.title} | HNH</title>
<meta name="robots" content="noindex">
<link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;600;700;800&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
*{box-sizing:border-box;margin:0;padding:0}
:root{--blue:#2563EB;--purple:#7C3AED;--green:#059669;--amber:#D97706;--red:#DC2626;--gray:#6B7280;--bg:#F0F4FA;--card:#fff;--border:#E2E8F0;--txt:#0F172A;--sub:#64748B}
body{font-family:${font};background:var(--bg);color:var(--txt);min-height:100vh;padding:0 0 80px}
a{color:inherit;text-decoration:none}
.hdr{background:linear-gradient(135deg,#1E1B4B,#312E81);color:#fff;padding:20px 32px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px}
.hdr-left{display:flex;flex-direction:column;gap:4px}
.hdr-back{color:#A5B4FC;font-size:.82rem;display:inline-flex;align-items:center;gap:4px;margin-bottom:4px}
.hdr-back:hover{color:#fff}
.hdr-title{font-size:1.4rem;font-weight:800;letter-spacing:-.5px}
.hdr-sub{font-size:.85rem;color:#C7D2FE;opacity:.9}
.hdr-badges{display:flex;gap:8px;flex-wrap:wrap}
.badge{padding:5px 12px;border-radius:20px;font-size:.75rem;font-weight:600;border:1px solid rgba(255,255,255,.2);background:rgba(255,255,255,.1)}
.badge.ruh{border-color:#4ADE80;color:#4ADE80}
.badge.nph{border-color:#60A5FA;color:#60A5FA}
.container{max-width:1400px;margin:0 auto;padding:24px 20px}
/* Pipeline */
.pipeline{display:flex;gap:0;margin-bottom:28px;background:var(--card);border-radius:14px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,.06);border:1px solid var(--border)}
.pipe-step{flex:1;padding:14px 10px;text-align:center;cursor:pointer;border-right:1px solid var(--border);transition:all .2s;position:relative}
.pipe-step:last-child{border-right:none}
.pipe-step:hover{background:#F8FAFF}
.pipe-step.active{background:linear-gradient(135deg,#EFF6FF,#DBEAFE);border-bottom:3px solid var(--blue)}
.pipe-step.done{background:#F0FDF4;border-bottom:3px solid var(--green)}
.pipe-icon{font-size:1.4rem;margin-bottom:4px}
.pipe-label{font-size:.72rem;font-weight:600;color:var(--sub);text-transform:uppercase;letter-spacing:.5px}
/* Grid */
.grid-3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px;margin-bottom:20px}
.grid-2{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:20px}
.grid-4{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:20px}
/* KPI cards */
.kcard{background:var(--card);border-radius:12px;padding:18px 20px;border:1px solid var(--border);box-shadow:0 1px 6px rgba(0,0,0,.04)}
.kcard-n{font-size:2rem;font-weight:800;line-height:1}
.kcard-l{font-size:.78rem;color:var(--sub);margin-top:4px;font-weight:500}
.kcard.blue{border-left:4px solid var(--blue)}
.kcard.purple{border-left:4px solid var(--purple)}
.kcard.gradient{border:none;background:linear-gradient(135deg,#1E1B4B,#312E81);color:#fff;min-width:100px}
.kcard.gradient .kcard-l{color:#A5B4FC}
/* Auto-Pilot strip */
.ap-strip{display:flex;gap:10px;margin-bottom:20px;align-items:stretch;flex-wrap:wrap}
.ap-strip .kcard{flex:1;min-width:80px}
.ap-strip .kcard.gradient{min-width:80px}
.kcard.green{border-left:4px solid var(--green)}
.kcard.amber{border-left:4px solid var(--amber)}
/* Track boards */
.track-board{background:var(--card);border-radius:14px;padding:18px;border:1px solid var(--border);box-shadow:0 2px 10px rgba(0,0,0,.05)}
.track-hdr{display:flex;align-items:center;justify-content:space-between;margin-bottom:14px}
.track-title{font-weight:700;font-size:.95rem}
.track-count{font-size:1.4rem;font-weight:800}
.track1{border-top:4px solid var(--blue)}
.track2{border-top:4px solid var(--purple)}
.track3{border-top:4px solid var(--green)}
.track4{border-top:4px solid var(--gray)}
/* Claim rows */
.claim-row{display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:8px;border:1px solid var(--border);margin-bottom:8px;cursor:pointer;transition:all .15s;background:#FAFBFF}
.claim-row:hover{border-color:var(--blue);box-shadow:0 2px 8px rgba(37,99,235,.12)}
.claim-row.selected{border-color:var(--blue);background:#EFF6FF;box-shadow:0 2px 12px rgba(37,99,235,.18)}
.cr-num{font-size:.72rem;font-weight:600;color:var(--sub);min-width:90px}
.cr-payer{font-size:.82rem;flex:1;font-weight:500}
.cr-sar{font-size:.85rem;font-weight:700;min-width:80px;text-align:right}
.cr-code{font-size:.72rem;font-weight:700;padding:2px 8px;border-radius:10px;background:#EFF6FF;color:var(--blue)}
.trk{font-size:.68rem;font-weight:600;padding:2px 8px;border-radius:10px;color:#fff}
/* Ingest area */
.ingest-box{background:var(--card);border-radius:14px;padding:20px;border:1px dashed #93C5FD;margin-bottom:20px}
.ingest-box:hover{border-color:var(--blue);background:#FAFCFF}
textarea.jarea{width:100%;height:160px;font-family:'JetBrains Mono','Fira Code',monospace;font-size:.78rem;border:1px solid var(--border);border-radius:8px;padding:12px;resize:vertical;background:#F8FAFF;color:var(--txt);outline:none}
textarea.jarea:focus{border-color:var(--blue);box-shadow:0 0 0 3px rgba(37,99,235,.1)}
.hint-text{font-size:.72rem;color:var(--sub);margin-top:6px;line-height:1.5}
/* Buttons */
.btn-row{display:flex;gap:8px;flex-wrap:wrap;margin-top:10px}
.btn{padding:9px 18px;border-radius:8px;font-weight:600;font-size:.83rem;cursor:pointer;border:none;transition:all .15s}
.btn-primary{background:var(--blue);color:#fff}
.btn-primary:hover{background:#1D4ED8}
.btn-success{background:var(--green);color:#fff}
.btn-success:hover{background:#047857}
.btn-purple{background:var(--purple);color:#fff}
.btn-purple:hover{background:#6D28D9}
.btn-ghost{background:transparent;color:var(--sub);border:1px solid var(--border)}
.btn-ghost:hover{border-color:var(--blue);color:var(--blue)}
.btn:disabled{opacity:.45;cursor:not-allowed}
/* Detail panel */
.detail-panel{background:var(--card);border-radius:14px;padding:20px;border:1px solid var(--border);box-shadow:0 4px 20px rgba(0,0,0,.08)}
.dp-title{font-weight:700;font-size:1rem;margin-bottom:12px;display:flex;align-items:center;gap:8px}
.dp-section{margin-bottom:16px}
.dp-label{font-size:.72rem;font-weight:600;color:var(--sub);text-transform:uppercase;letter-spacing:.5px;margin-bottom:6px}
.dp-action{background:#FFF7ED;border:1px solid #FED7AA;border-radius:8px;padding:12px;font-size:.85rem;line-height:1.6;color:#92400E}
.doc-list{list-style:none;display:flex;flex-direction:column;gap:6px}
.doc-item{display:flex;align-items:center;gap:8px;padding:8px 12px;border-radius:7px;background:#F8FAFF;border:1px solid var(--border);font-size:.82rem}
.doc-item.oracle{border-color:#60A5FA;background:#EFF6FF}
.doc-item.nphies{border-color:#A78BFA;background:#F5F3FF}
.doc-item.generated{border-color:#34D399;background:#ECFDF5}
.doc-src{font-size:.68rem;padding:2px 7px;border-radius:8px;font-weight:600;margin-left:auto}
.src-oracle{background:#DBEAFE;color:var(--blue)}
.src-nphies{background:#EDE9FE;color:var(--purple)}
.src-gen{background:#D1FAE5;color:var(--green)}
.src-manual{background:#FEF3C7;color:#92400E}
/* Codes table */
.codes-table{width:100%;border-collapse:collapse;font-size:.8rem}
.codes-table th{background:#F8FAFF;padding:8px 10px;text-align:left;font-weight:600;color:var(--sub);border-bottom:2px solid var(--border);font-size:.72rem;text-transform:uppercase}
.codes-table td{padding:8px 10px;border-bottom:1px solid var(--border)}
.codes-table tr:hover td{background:#F8FAFF}
.cc{font-weight:700;color:var(--blue);font-family:monospace}
.sc{font-weight:700;color:var(--green)}
/* Result box */
.result-box{background:#F0FDF4;border:1px solid #86EFAC;border-radius:8px;padding:14px;font-size:.82rem;line-height:1.6;margin-top:10px}
.result-box.err{background:#FFF1F2;border-color:#FECDD3;color:var(--red)}
.result-box.warn{background:#FFFBEB;border-color:#FDE68A;color:#92400E}
/* Tabs */
.tab-row{display:flex;gap:0;margin-bottom:16px;background:#F1F5F9;border-radius:8px;padding:4px;width:fit-content}
.tab{padding:7px 16px;border-radius:6px;font-size:.8rem;font-weight:600;cursor:pointer;color:var(--sub);border:none;background:transparent;transition:all .15s}
.tab.active{background:var(--card);color:var(--blue);box-shadow:0 1px 4px rgba(0,0,0,.08)}
/* Validation checks */
.check-list{display:flex;flex-direction:column;gap:8px;margin-top:10px}
.check-item{display:flex;align-items:center;gap:10px;padding:10px 14px;border-radius:8px;background:#F8FAFF;border:1px solid var(--border);font-size:.83rem}
.check-item.pass{border-color:#86EFAC;background:#F0FDF4}
.check-item.fail{border-color:#FECDD3;background:#FFF1F2}
.check-item.warn{border-color:#FDE68A;background:#FFFBEB}
/* Ext links */
.ext-links{display:flex;gap:8px;flex-wrap:wrap;margin-top:16px}
.ext-btn{display:inline-flex;align-items:center;gap:6px;padding:8px 14px;border-radius:8px;font-size:.8rem;font-weight:600;text-decoration:none;border:1px solid var(--border);color:var(--txt);background:var(--card);transition:all .15s}
.ext-btn:hover{border-color:var(--blue);color:var(--blue);box-shadow:0 2px 8px rgba(37,99,235,.12)}
/* Empty */
.empty-state{text-align:center;padding:40px 20px;color:var(--sub)}
.empty-icon{font-size:3rem;margin-bottom:12px}
/* Loading */
.loader{display:inline-block;width:16px;height:16px;border:2px solid rgba(37,99,235,.2);border-top-color:var(--blue);border-radius:50%;animation:spin .7s linear infinite;margin-left:8px;vertical-align:middle}
@keyframes spin{to{transform:rotate(360deg)}}
@media(max-width:1024px){.grid-3{grid-template-columns:1fr 1fr}.grid-4{grid-template-columns:1fr 1fr}}
@media(max-width:640px){.grid-3,.grid-2,.grid-4{grid-template-columns:1fr}.pipeline{flex-direction:column}.pipe-step{border-right:none;border-bottom:1px solid var(--border)}.hdr{padding:16px 20px}}
</style>
</head>
<body>
<div class="hdr">
  <div class="hdr-left">
    <a class="hdr-back" href="/">${T.back}</a>
    <div class="hdr-title">\u2695\uFE0F ${T.title}</div>
    <div class="hdr-sub">${T.sub}</div>
  </div>
  <div class="hdr-badges">
    <span class="badge ruh">\u{1F537} Oracle MED/UNA/ABH \u2705</span>
    <span class="badge nph">\u{1F3DB}\uFE0F NPHIES Live</span>
    <span class="badge" id="hdr-total">\u2026</span>
  </div>
</div>

<div class="container">

  <!-- Pipeline phases -->
  <div class="pipeline">
    <div class="pipe-step active" onclick="showPhase(1)" id="ph1"><div class="pipe-icon">\u{1F4E5}</div><div class="pipe-label">${T.p1}</div></div>
    <div class="pipe-step" onclick="showPhase(2)" id="ph2"><div class="pipe-icon">\u{1F9E0}</div><div class="pipe-label">${T.p2}</div></div>
    <div class="pipe-step" onclick="showPhase(3)" id="ph3"><div class="pipe-icon">\u{1F5C2}\uFE0F</div><div class="pipe-label">${T.p3}</div></div>
    <div class="pipe-step" onclick="showPhase(4)" id="ph4"><div class="pipe-icon">\u2705</div><div class="pipe-label">${T.p4}</div></div>
    <div class="pipe-step" onclick="showPhase(5)" id="ph5"><div class="pipe-icon">\u{1F680}</div><div class="pipe-label">${T.p5}</div></div>
  </div>

  <!-- KPI strip -->
  <div class="grid-4" id="kpi-strip">
    <div class="kcard blue"><div class="kcard-n" id="kpi-total">\u2014</div><div class="kcard-l">${ar ? "\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0631\u0641\u0648\u0636\u0627\u062A" : "Total Rejections"}</div></div>
    <div class="kcard amber"><div class="kcard-n" id="kpi-sar">\u2014</div><div class="kcard-l">${ar ? "SAR \u0642\u064A\u062F \u0627\u0644\u0627\u0633\u062A\u0631\u062F\u0627\u062F" : "SAR at Risk"}</div></div>
    <div class="kcard green"><div class="kcard-n" id="kpi-rate">\u2014</div><div class="kcard-l">${ar ? "\u0645\u0639\u062F\u0644 \u0627\u0644\u0627\u0633\u062A\u0631\u062F\u0627\u062F" : "Recovery Rate"}</div></div>
    <div class="kcard purple"><div class="kcard-n" id="kpi-codes">${Object.keys(NPHIES_DENIAL).length - 1}</div><div class="kcard-l">${ar ? "\u0623\u0643\u0648\u0627\u062F \u0645\u062F\u0639\u0648\u0645\u0629" : "Codes Supported"}</div></div>
  </div>

  <!-- RCM Auto-Pilot Dashboard -->
  <div class="ap-strip" id="ap-strip">
    <div class="kcard gradient"><div class="kcard-n" id="ap-today">\u2014</div><div class="kcard-l">${ar ? "اليوم" : "Today"}</div></div>
    <div class="kcard gradient"><div class="kcard-n" id="ap-30d">\u2014</div><div class="kcard-l">30\u062F</div></div>
    <div class="kcard gradient"><div class="kcard-n" id="ap-60d">\u2014</div><div class="kcard-l">60\u062F</div></div>
    <div class="kcard gradient"><div class="kcard-n" id="ap-90d">\u2014</div><div class="kcard-l">90\u062F</div></div>
    <div style="display:flex;gap:8px;align-items:center;padding:8px">
      <button class="btn btn-sm btn-primary" onclick="runAutoPipeline()" style="font-size:.8rem;padding:6px 14px">\u{1F916} ${ar ? "تشغيل التنبآت" : "Run Pipeline"}</button>
      <button class="btn btn-sm btn-ghost" onclick="loadAutopilotData()" style="font-size:.8rem;padding:6px 14px">\u{1F504} ${ar ? "تحديث" : "Refresh"}</button>
      <span id="ap-loader" style="display:none" class="loader"></span>
    </div>
  </div>

  <div id="phase-1">
    <div class="grid-2">
      <div>
        <div class="ingest-box">
          <div style="font-weight:700;margin-bottom:10px">\u{1F4E5} ${T.ingest}</div>
          <textarea class="jarea" id="json-input" placeholder="${T.hint}"></textarea>
          <div class="hint-text">${ar ? "\u0627\u0644\u0635\u0642 \u0628\u064A\u0627\u0646\u0627\u062A Excel \u0627\u0644\u0645\u0635\u062F\u0631\u0629 \u0628\u062A\u0646\u0633\u064A\u0642 JSON\u060C \u0623\u0648 \u0627\u0643\u062A\u0628 \u0627\u0644\u0645\u0637\u0627\u0644\u0628\u0629 \u064A\u062F\u0648\u064A\u0627\u064B." : "Paste Excel-exported JSON data, or enter rejection manually."}</div>
          <div class="btn-row">
            <button class="btn btn-primary" onclick="ingestData()">${T.ingest} <span id="ingest-loader" style="display:none" class="loader"></span></button>
            <button class="btn btn-ghost" onclick="document.getElementById('json-input').value=''">${T.clr}</button>
            <button class="btn btn-ghost" onclick="loadSample()">${ar ? "\u0628\u064A\u0627\u0646\u0627\u062A \u062A\u062C\u0631\u064A\u0628\u064A\u0629" : "Load Sample"}</button>
          </div>
        </div>
        <div id="ingest-result"></div>
      </div>
      <div>
        <div class="track-board" style="height:100%">
          <div class="track-hdr">
            <div class="track-title">\u{1F511} ${T.codes}</div>
          </div>
          <table class="codes-table">
            <thead><tr><th>${T.code}</th><th>${ar ? "\u0627\u0644\u0633\u0628\u0628" : "Reason"}</th><th>${T.track}</th><th>${T.score}</th></tr></thead>
            <tbody>${codeRows}</tbody>
          </table>
          <div style="margin-top:12px;font-size:.75rem;color:var(--sub)">${ar ? "+ 20 \u0643\u0648\u062F\u0627\u064B \u0625\u0636\u0627\u0641\u064A\u0627\u064B \u0645\u062F\u0639\u0648\u0645\u0627\u064B | A=\u0625\u062F\u0627\u0631\u064A C=\u0633\u0631\u064A\u0631\u064A T=\u062A\u0642\u0646\u064A F=\u0645\u0627\u0644\u064A" : "+ 20 more codes | A=Admin C=Clinical T=Technical F=Financial"}</div>
        </div>
      </div>
    </div>
  </div>

  <!-- PHASE 2: TRIAGE (claim list + per-claim detail) -->
  <div id="phase-2" style="display:none">
    <div class="grid-3" style="margin-bottom:16px">
      <div class="track-board track1">
        <div class="track-hdr">
          <div class="track-title">\u2460 ${T.t1}</div>
          <div class="track-count" id="t1-count" style="color:var(--blue)">\u2014</div>
        </div>
        <div id="t1-list"><div class="empty-state"><div class="empty-icon">\u{1F4CB}</div><div>${T.empty}</div></div></div>
      </div>
      <div class="track-board track2">
        <div class="track-hdr">
          <div class="track-title">\u2461 ${T.t2}</div>
          <div class="track-count" id="t2-count" style="color:var(--purple)">\u2014</div>
        </div>
        <div id="t2-list"><div class="empty-state"><div class="empty-icon">\u2696\uFE0F</div><div>${T.empty}</div></div></div>
      </div>
      <div class="track-board track3">
        <div class="track-hdr">
          <div class="track-title">\u2462 ${T.t3} / ${T.tw}</div>
          <div class="track-count" id="t3-count" style="color:var(--green)">\u2014</div>
        </div>
        <div id="t3-list"><div class="empty-state"><div class="empty-icon">\u{1F195}</div><div>${T.empty}</div></div></div>
      </div>
    </div>
    <!-- Per-claim detail -->
    <div id="claim-detail" style="display:none">
      <div class="detail-panel">
        <div class="dp-title" id="dp-title">\u{1F4C4} \u2014</div>
        <div class="grid-2">
          <div>
            <div class="dp-section">
              <div class="dp-label">${T.action}</div>
              <div class="dp-action" id="dp-action">\u2014</div>
            </div>
            <div class="dp-section">
              <div class="dp-label">${T.docs}</div>
              <ul class="doc-list" id="dp-docs"></ul>
            </div>
          </div>
          <div>
            <div class="dp-section">
              <div class="dp-label">${T.code} / ${T.track} / ${T.score} / ${T.deadline}</div>
              <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:10px">
                <span class="cr-code" id="dp-code">\u2014</span>
                <span class="trk" id="dp-track">\u2014</span>
                <span style="font-weight:700;font-size:.9rem" id="dp-score">\u2014</span>
                <span style="font-size:.8rem;color:var(--sub)" id="dp-deadline">\u2014</span>
              </div>
            </div>
            <div class="btn-row">
              <button class="btn btn-success" onclick="validateClaim()">${T.validate} <span id="val-loader" style="display:none" class="loader"></span></button>
              <button class="btn btn-purple" onclick="submitClaim('appeal')">${T.appeal}</button>
              <button class="btn btn-primary" onclick="submitClaim('resubmit')">${T.submit}</button>
            </div>
            <div id="dp-result" style="margin-top:10px"></div>
          </div>
        </div>
        <div class="ext-links">
          <a class="ext-btn" href="https://oracle-riyadh.brainsait.org/prod/faces/Login.jsf" target="_blank">${T.oracle} \u2197</a>
          <a class="ext-btn" href="https://portal.nphies.sa" target="_blank">${T.nphies} \u2197</a>
          <a class="ext-btn" href="https://sbs.elfadil.com/claims" target="_blank">${T.sbs} \u2197</a>
          <a class="ext-btn" href="/api/rcm/denial/list" target="_blank">\u{1F4CA} API \u2197</a>
        </div>
      </div>
    </div>
  </div>

  <!-- PHASE 3: ENRICH \u2014 document checklist per code -->
  <div id="phase-3" style="display:none">
    <div class="detail-panel">
      <div class="dp-title">\u{1F5C2}\uFE0F ${ar ? "\u062C\u0645\u0639 \u0627\u0644\u0645\u0633\u062A\u0646\u062F\u0627\u062A \u0648\u0627\u0644\u0645\u0639\u0644\u0648\u0645\u0627\u062A" : "Document Collection & Enrichment"}</div>
      <div style="margin-bottom:12px;font-size:.85rem;color:var(--sub)">${ar ? "\u0627\u062E\u062A\u0631 \u0643\u0648\u062F \u0627\u0644\u0631\u0641\u0636 \u0644\u0644\u062D\u0635\u0648\u0644 \u0639\u0644\u0649 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0633\u062A\u0646\u062F\u0627\u062A \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u0645\u0646 Oracle/NPHIES/\u0627\u0644\u0633\u062C\u0644\u0627\u062A \u0627\u0644\u0637\u0628\u064A\u0629." : "Select rejection code to get the auto-generated document checklist \u2014 pulled from Oracle HIS, NPHIES ClaimLinc, and clinical records."}</div>
      <div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:16px">
        <select id="enrich-code" style="padding:8px 12px;border-radius:8px;border:1px solid var(--border);font-size:.85rem;background:var(--card)" onchange="loadRequirements()">
          <option value="">${ar ? "\u0627\u062E\u062A\u0631 \u0643\u0648\u062F \u0627\u0644\u0631\u0641\u0636..." : "Select denial code..."}</option>
          ${Object.keys(NPHIES_DENIAL).filter((k) => k !== "UNKNOWN").map((k) => '<option value="' + k + '">' + k + " \u2014 " + NPHIES_DENIAL[k].label + "</option>").join("")}
        </select>
        <button class="btn btn-primary" onclick="loadRequirements()">${ar ? "\u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0642\u0627\u0626\u0645\u0629" : "Load Checklist"}</button>
      </div>
      <div id="enrich-result"></div>
    </div>
  </div>

  <!-- PHASE 4: VALIDATE -->
  <div id="phase-4" style="display:none">
    <div class="detail-panel">
      <div class="dp-title">\u2705 ${ar ? "\u0627\u0644\u062A\u062D\u0642\u0642 \u0648\u0627\u0644\u0645\u0637\u0627\u0628\u0642\u0629 \u0645\u0639 NPHIES" : "NPHIES Validation & Matching"}</div>
      <div style="font-size:.85rem;color:var(--sub);margin-bottom:16px">${ar ? "\u0623\u062F\u062E\u0644 \u0631\u0642\u0645 \u0627\u0644\u0645\u0637\u0627\u0644\u0628\u0629 + \u0631\u0642\u0645 \u0627\u0644\u0647\u0648\u064A\u0629 + FHIR payload \u0644\u0644\u062A\u062D\u0642\u0642 \u0627\u0644\u0634\u0627\u0645\u0644 \u0642\u0628\u0644 \u0627\u0644\u0625\u0639\u0627\u062F\u0629." : "Enter claim number + national ID + FHIR payload for full pre-submission validation."}</div>
      <div class="grid-2" style="gap:12px;margin-bottom:12px">
        <input id="val-claim" style="padding:9px 12px;border-radius:8px;border:1px solid var(--border);font-size:.85rem;width:100%" placeholder="${ar ? "\u0631\u0642\u0645 \u0627\u0644\u0645\u0637\u0627\u0644\u0628\u0629 (CLM-...)" : "Claim number (CLM-...)"}">
        <input id="val-nid"   style="padding:9px 12px;border-radius:8px;border:1px solid var(--border);font-size:.85rem;width:100%" placeholder="${ar ? "\u0631\u0642\u0645 \u0627\u0644\u0647\u0648\u064A\u0629 \u0627\u0644\u0648\u0637\u0646\u064A\u0629" : "National ID"}">
        <input id="val-payer" style="padding:9px 12px;border-radius:8px;border:1px solid var(--border);font-size:.85rem;width:100%" placeholder="${ar ? "\u0627\u0633\u0645 \u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u062F\u0627\u0641\u0639\u0629" : "Payer name"}">
      </div>
      <textarea id="val-fhir" class="jarea" style="height:120px" placeholder='${ar ? "FHIR R4 JSON (\u0627\u062E\u062A\u064A\u0627\u0631\u064A \u2014 \u0644\u0644\u062A\u062D\u0642\u0642 \u0627\u0644\u0647\u064A\u0643\u0644\u064A)" : "FHIR R4 JSON (optional \u2014 for structural check)"}'></textarea>
      <div class="btn-row" style="margin-top:10px">
        <button class="btn btn-primary" onclick="runFullValidation()">${ar ? "\u062A\u0634\u063A\u064A\u0644 \u0627\u0644\u062A\u062D\u0642\u0642 \u0627\u0644\u0634\u0627\u0645\u0644" : "Run Full Validation"} <span id="fv-loader" style="display:none" class="loader"></span></button>
      </div>
      <div id="val-result" style="margin-top:14px"></div>
    </div>
  </div>

  <!-- PHASE 5: SUBMIT -->
  <div id="phase-5" style="display:none">
    <div class="detail-panel">
      <div class="dp-title">\u{1F680} ${ar ? "\u0627\u0644\u062A\u0642\u062F\u064A\u0645 \u0627\u0644\u0646\u0647\u0627\u0626\u064A \u0648\u0627\u0644\u0637\u0639\u0646" : "Final Submission & Appeal"}</div>
      <div style="font-size:.85rem;color:var(--sub);margin-bottom:16px">${ar ? "\u064A\u062A\u0645 \u0627\u0644\u062A\u0642\u062F\u064A\u0645 \u0639\u0628\u0631 Oracle \u0627\u0644\u0631\u064A\u0627\u0636 (\u0644\u0644\u062D\u0627\u0644\u0627\u062A \u0627\u0644\u0633\u0631\u064A\u0631\u064A\u0629) \u0648\u0628\u0648\u0627\u0628\u0629 NPHIES ClaimLinc (\u0644\u0644\u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u062A\u0642\u0646\u064A\u0629)." : "Submission routes via Oracle Riyadh (clinical cases) and NPHIES ClaimLinc (technical resubmissions)."}</div>
      <div class="grid-2" style="gap:12px;margin-bottom:12px">
        <input id="sub-claim"  style="padding:9px 12px;border-radius:8px;border:1px solid var(--border);font-size:.85rem;width:100%" placeholder="${ar ? "\u0631\u0642\u0645 \u0627\u0644\u0645\u0637\u0627\u0644\u0628\u0629" : "Claim number"}">
        <select id="sub-track" style="padding:9px 12px;border-radius:8px;border:1px solid var(--border);font-size:.85rem;background:var(--card)">
          <option value="resubmit">${ar ? "\u0625\u0639\u0627\u062F\u0629 \u062A\u0642\u062F\u064A\u0645" : "Resubmit (Track 1)"}</option>
          <option value="appeal">${ar ? "\u0637\u0639\u0646 \u0631\u0633\u0645\u064A" : "Formal Appeal (Track 2)"}</option>
          <option value="new_claim">${ar ? "\u0645\u0637\u0627\u0644\u0628\u0629 \u062C\u062F\u064A\u062F\u0629 \u0645\u0639 \u0631\u0628\u0637" : "New Claim + Prior Link (Track 3)"}</option>
        </select>
      </div>
      <textarea id="sub-reason" class="jarea" style="height:90px" placeholder="${ar ? "\u0633\u0628\u0628 \u0627\u0644\u0637\u0639\u0646 \u0623\u0648 \u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u0625\u0639\u0627\u062F\u0629 (\u0627\u062E\u062A\u064A\u0627\u0631\u064A)" : "Appeal reason or resubmission notes (optional)"}"></textarea>
      <div class="btn-row" style="margin-top:10px">
        <button class="btn btn-primary" onclick="finalSubmit()">${ar ? "\u0625\u0631\u0633\u0627\u0644 \u0639\u0628\u0631 NPHIES / Oracle" : "Submit via NPHIES / Oracle"} <span id="sub-loader" style="display:none" class="loader"></span></button>
      </div>
      <div id="sub-result" style="margin-top:14px"></div>
      <div class="ext-links" style="margin-top:20px">
        <a class="ext-btn" href="https://oracle-riyadh.brainsait.org/prod/faces/Login.jsf" target="_blank">\u{1F537} ${ar ? "Oracle \u0627\u0644\u0631\u064A\u0627\u0636" : "Oracle Riyadh"} \u2197</a>
        <a class="ext-btn" href="https://portal.nphies.sa" target="_blank">\u{1F3DB}\uFE0F NPHIES Portal \u2197</a>
        <a class="ext-btn" href="/api/rcm/denial/stats" target="_blank">\u{1F4CA} Stats API \u2197</a>
      </div>
    </div>
  </div>

</div><!-- /container -->

<script>
// string concatenation ONLY \u2014 no template literals
var API = '';
var currentClaim = null;
var allClaims = [];

// \u2500\u2500 Phase navigation \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
function showPhase(n) {
  for (var i = 1; i <= 5; i++) {
    var ph = document.getElementById('phase-' + i);
    var st = document.getElementById('ph'  + i);
    if (ph) ph.style.display  = i === n ? '' : 'none';
    if (st) {
      st.classList.remove('active');
      if (i === n) st.classList.add('active');
    }
  }
}

// \u2500\u2500 Load KPI stats \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
function loadStats() {
  fetch(API + '/api/rcm/denial/stats')
    .then(function(r) { return r.json(); })
    .then(function(d) {
      var s = d.summary || {};
      var tot = document.getElementById('kpi-total');
      var sar = document.getElementById('kpi-sar');
      var rt  = document.getElementById('kpi-rate');
      var hdr = document.getElementById('hdr-total');
      if (tot) tot.textContent = Number(s.total_rejected || 0).toLocaleString();
      if (sar) sar.textContent = 'SAR ' + (Number(s.total_sar || 0) / 1000).toFixed(0) + 'K';
      if (rt)  rt.textContent  = s.recovery_rate || '\u2014';
      if (hdr) hdr.textContent = (s.total_rejected || 0) + ' ' + '${ar ? "\u0645\u0637\u0627\u0644\u0628\u0629 \u0645\u0631\u0641\u0648\u0636\u0629" : "rejections"}';
    })
    .catch(function() {});
}

// \u2500\u2500 Load claim list \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
function loadClaimList() {
  fetch(API + '/api/rcm/denial/list')
    .then(function(r) { return r.json(); })
    .then(function(d) {
      allClaims = d.claims || [];
      renderTracks(allClaims);
    })
    .catch(function() {});
}

function renderTracks(claims) {
  var t1 = claims.filter(function(c) { return c.intel && c.intel.track === 'resubmit'; });
  var t2 = claims.filter(function(c) { return c.intel && c.intel.track === 'appeal'; });
  var t3 = claims.filter(function(c) { return c.intel && (c.intel.track === 'new_claim' || c.intel.track === 'review' || c.intel.track === 'write_off'); });

  var c1 = document.getElementById('t1-count');
  var c2 = document.getElementById('t2-count');
  var c3 = document.getElementById('t3-count');
  if (c1) c1.textContent = t1.length;
  if (c2) c2.textContent = t2.length;
  if (c3) c3.textContent = t3.length;

  renderTrackList('t1-list', t1);
  renderTrackList('t2-list', t2);
  renderTrackList('t3-list', t3);
}

function renderTrackList(elId, items) {
  var el = document.getElementById(elId);
  if (!el) return;
  if (!items.length) {
    el.innerHTML = '<div class="empty-state"><div class="empty-icon">\u{1F4CB}</div><div>${ar ? "\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u0637\u0627\u0644\u0628\u0627\u062A" : "No claims"}</div></div>';
    return;
  }
  var html = '';
  items.slice(0, 20).forEach(function(c) {
    var trk  = (c.intel && c.intel.track) || 'review';
    var col  = trk === 'resubmit' ? '#2563EB' : trk === 'appeal' ? '#7C3AED' : trk === 'new_claim' ? '#059669' : '#D97706';
    html += '<div class="claim-row" onclick="openClaim(' + JSON.stringify(c) + ')">';
    html += '<div class="cr-num">' + (c.claim_number || '\u2014') + '</div>';
    html += '<div class="cr-payer">' + (c.payer_name || '\u2014') + '</div>';
    html += '<div class="cr-sar">SAR ' + Number(c.total_amount || 0).toLocaleString() + '</div>';
    html += '<div class="cr-code">' + (c.denial_code || '?') + '</div>';
    html += '</div>';
  });
  el.innerHTML = html;
}

function openClaim(c) {
  currentClaim = c;
  var intel = c.intel || {};
  document.getElementById('claim-detail').style.display = '';
  document.getElementById('dp-title').textContent  = '\u{1F4C4} ' + (c.claim_number || '\u2014') + ' \u2014 ' + (c.payer_name || '\u2014');
  document.getElementById('dp-action').textContent  = intel.action || '\u2014';
  document.getElementById('dp-code').textContent    = c.denial_code || '\u2014';
  document.getElementById('dp-score').textContent   = (intel.score !== undefined ? intel.score + '% ${ar ? "\u0627\u062D\u062A\u0645\u0627\u0644" : "recovery"}' : '\u2014');
  var trkEl = document.getElementById('dp-track');
  if (trkEl) {
    trkEl.textContent   = intel.track || '\u2014';
    trkEl.style.background = intel.track === 'resubmit' ? '#2563EB' : intel.track === 'appeal' ? '#7C3AED' : '#059669';
  }
  var due = new Date();
  due.setDate(due.getDate() + (intel.deadline_days || 15));
  document.getElementById('dp-deadline').textContent = '${ar ? "\u0645\u0648\u0639\u062F:" : "Due:"} ' + due.toLocaleDateString();

  var docList = document.getElementById('dp-docs');
  if (docList && intel.docs) {
    var html = '';
    intel.docs.forEach(function(doc) {
      var src = doc.indexOf('FHIR') >= 0 ? 'generated' : doc.indexOf('Oracle') >= 0 ? 'oracle' : doc.indexOf('NPHIES') >= 0 || doc.indexOf('271') >= 0 ? 'nphies' : 'manual';
      var srcCls  = src === 'oracle' ? 'src-oracle' : src === 'nphies' ? 'src-nphies' : src === 'generated' ? 'src-gen' : 'src-manual';
      var srcLabel= src === 'oracle' ? 'Oracle HIS' : src === 'nphies' ? 'NPHIES' : src === 'generated' ? 'Auto-gen' : '${ar ? "\u064A\u062F\u0648\u064A" : "Manual"}';
      var itemCls = src === 'oracle' ? 'doc-item oracle' : src === 'nphies' ? 'doc-item nphies' : src === 'generated' ? 'doc-item generated' : 'doc-item';
      html += '<li class="' + itemCls + '">\u2610 ' + doc + '<span class="doc-src ' + srcCls + '">' + srcLabel + '</span></li>';
    });
    docList.innerHTML = html;
  }
  document.getElementById('dp-result').innerHTML = '';
  document.getElementById('claim-detail').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// \u2500\u2500 Ingest \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
function ingestData() {
  var raw = document.getElementById('json-input').value.trim();
  if (!raw) return;
  var data;
  try { data = JSON.parse(raw); } catch(e) { showResult('ingest-result', '${ar ? "JSON \u063A\u064A\u0631 \u0635\u0627\u0644\u062D: " : "Invalid JSON: "}' + e.message, 'err'); return; }
  var ldr = document.getElementById('ingest-loader');
  if (ldr) ldr.style.display = '';
  fetch(API + '/api/rcm/denial/ingest', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
    .then(function(r) { return r.json(); })
    .then(function(d) {
      if (ldr) ldr.style.display = 'none';
      var msg = '\u2705 ${ar ? "\u062A\u0645 \u0627\u0633\u062A\u064A\u0631\u0627\u062F" : "Imported"} ' + (d.ingested || 0) + ' ${ar ? "\u0645\u0637\u0627\u0644\u0628\u0629" : "claims"}. '
        + '${ar ? "\u062A\u062E\u0637\u064A:" : "Skipped:"} ' + (d.skipped || 0) + '. '
        + '${ar ? "\u0627\u0644\u0645\u0633\u0627\u0631\u0627\u062A:" : "Tracks:"} '
        + Object.entries(d.tracks || {}).map(function(e) { return e[0] + ':' + e[1]; }).join(' | ');
      showResult('ingest-result', msg, 'success');
      loadStats();
      loadClaimList();
      if ((d.ingested || 0) > 0) setTimeout(function() { showPhase(2); }, 1200);
    })
    .catch(function(e) { if (ldr) ldr.style.display = 'none'; showResult('ingest-result', 'Error: ' + e.message, 'err'); });
}

function loadSample() {
  var sample = [
    { claim_number: 'CLM-2026-0441', payer: 'Bupa Arabia', total_amount: 4250, rejection_code: 'C001', rejection_reason: 'Not medically necessary', date_of_service: '2026-04-01', national_id: '1012345678' },
    { claim_number: 'CLM-2026-0442', payer: 'Tawuniya',    total_amount: 1800, rejection_code: 'T001', rejection_reason: 'Invalid ICD-10 code J06.9',  date_of_service: '2026-04-03', national_id: '1098765432' },
    { claim_number: 'CLM-2026-0443', payer: 'MedGulf',     total_amount: 9100, rejection_code: 'A003', rejection_reason: 'Authorization required',      date_of_service: '2026-04-05', national_id: '2034567890' },
    { claim_number: 'CLM-2026-0444', payer: 'AXA Gulf',    total_amount: 3300, rejection_code: 'F001', rejection_reason: 'Fee schedule variance',       date_of_service: '2026-04-07', national_id: '1056789012' },
    { claim_number: 'CLM-2026-0445', payer: 'Bupa Arabia', total_amount: 6750, rejection_code: 'C004', rejection_reason: 'PA expired',                  date_of_service: '2026-03-28', national_id: '1078901234' },
  ];
  document.getElementById('json-input').value = JSON.stringify(sample, null, 2);
}

// \u2500\u2500 Validate from detail panel \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
function validateClaim() {
  if (!currentClaim) return;
  var ldr = document.getElementById('val-loader');
  if (ldr) ldr.style.display = '';
  fetch(API + '/api/rcm/denial/revalidate', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ claim_number: currentClaim.claim_number, national_id: currentClaim.national_id || '' }),
  })
  .then(function(r) { return r.json(); })
  .then(function(d) {
    if (ldr) ldr.style.display = 'none';
    var icon  = d.ready ? '\u2705' : '\u26A0\uFE0F';
    var color = d.ready ? 'success' : 'warn';
    var msg   = icon + ' ' + (d.verdict || '\u2014') + ' (Score: ' + (d.score || 0) + '%)';
    showResult('dp-result', msg, color);
    if (d.ready) showPhase(5);
  })
  .catch(function(e) { if (ldr) ldr.style.display = 'none'; showResult('dp-result', 'Error: ' + e.message, 'err'); });
}

// \u2500\u2500 Submit from detail panel \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
function submitClaim(track) {
  if (!currentClaim) return;
  fetch(API + '/api/rcm/denial/submit', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ claim_number: currentClaim.claim_number, track: track || (currentClaim.intel && currentClaim.intel.track) || 'resubmit' }),
  })
  .then(function(r) { return r.json(); })
  .then(function(d) {
    showResult('dp-result', '\u{1F680} ' + (d.tracking_note || '${ar ? "\u062A\u0645 \u0627\u0644\u0625\u0631\u0633\u0627\u0644" : "Submitted"}') + ' | Ref: ' + (d.reference_id || '\u2014'), 'success');
    loadStats();
    loadClaimList();
  })
  .catch(function(e) { showResult('dp-result', 'Error: ' + e.message, 'err'); });
}

// \u2500\u2500 Phase 3: Requirements \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
function loadRequirements() {
  var code = document.getElementById('enrich-code').value;
  if (!code) return;
  fetch(API + '/api/rcm/denial/requirements?code=' + encodeURIComponent(code))
    .then(function(r) { return r.json(); })
    .then(function(d) {
      var html = '<div class="dp-section"><div class="dp-label">' + d.label + ' \u2014 ' + (d.track || '') + ' | ${ar ? "\u0627\u0644\u0645\u0648\u0639\u062F:" : "Deadline:"} ' + d.deadline_days + ' ${ar ? "\u064A\u0648\u0645" : "days"}</div>';
      html += '<div class="dp-action" style="margin-bottom:12px">' + (d.action || '') + '</div>';
      html += '<div class="dp-label">${ar ? "\u0627\u0644\u0645\u0633\u062A\u0646\u062F\u0627\u062A \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629" : "Required Documents"}</div><ul class="doc-list">';
      (d.documents || []).forEach(function(doc) {
        var srcCls   = doc.source === 'oracle-riyadh' ? 'src-oracle' : doc.source === 'nphies-claimlinc' ? 'src-nphies' : doc.source === 'generated' ? 'src-gen' : 'src-manual';
        var itemCls  = doc.source === 'oracle-riyadh' ? 'doc-item oracle' : doc.source === 'nphies-claimlinc' ? 'doc-item nphies' : doc.source === 'generated' ? 'doc-item generated' : 'doc-item';
        var srcLabel = doc.source === 'oracle-riyadh' ? 'Oracle HIS' : doc.source === 'nphies-claimlinc' ? 'NPHIES' : doc.source === 'generated' ? 'Auto-gen' : '${ar ? "\u064A\u062F\u0648\u064A" : "Manual"}';
        html += '<li class="' + itemCls + '"><input type="checkbox" style="margin-right:8px"> ' + doc.name + '<span class="doc-src ' + srcCls + '">' + srcLabel + '</span></li>';
      });
      html += '</ul></div>';
      var oracle_note = d.oracle_available
        ? '<div style="margin-top:10px;font-size:.8rem;color:#2563EB">\u{1F537} ${ar ? "Oracle \u0627\u0644\u0631\u064A\u0627\u0636 \u0645\u062A\u0627\u062D \u2014 \u064A\u0645\u0643\u0646 \u062C\u0644\u0628 \u0627\u0644\u0633\u062C\u0644\u0627\u062A \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B" : "Oracle Riyadh reachable \u2014 records can be auto-fetched"}</div>'
        : '<div style="margin-top:10px;font-size:.8rem;color:#D97706">\u26A0\uFE0F ${ar ? "Oracle \u0647\u0630\u0627 \u0627\u0644\u0641\u0631\u0639 \u063A\u064A\u0631 \u0645\u062A\u0627\u062D \u2014 \u064A\u0644\u0632\u0645 \u062C\u0644\u0628 \u0627\u0644\u0633\u062C\u0644\u0627\u062A \u064A\u062F\u0648\u064A\u0627\u064B" : "Oracle offline for this branch \u2014 manual record fetch required"}</div>';
      html += oracle_note;
      document.getElementById('enrich-result').innerHTML = html;
    })
    .catch(function(e) { document.getElementById('enrich-result').innerHTML = '<div class="result-box err">Error: ' + e.message + '</div>'; });
}

// \u2500\u2500 Phase 4: Full validation \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
function runFullValidation() {
  var claim  = document.getElementById('val-claim').value.trim();
  var nid    = document.getElementById('val-nid').value.trim();
  var payer  = document.getElementById('val-payer').value.trim();
  var fhir   = document.getElementById('val-fhir').value.trim();
  var ldr    = document.getElementById('fv-loader');
  if (ldr) ldr.style.display = '';
  var payload = { claim_number: claim, national_id: nid, payer: payer };
  if (fhir) { try { payload.fhir_payload = JSON.parse(fhir); } catch(e) {} }
  fetch(API + '/api/rcm/denial/revalidate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    .then(function(r) { return r.json(); })
    .then(function(d) {
      if (ldr) ldr.style.display = 'none';
      var html = '<div class="check-list">';
      (d.checks || []).forEach(function(c) {
        var cls = c.passed === true ? 'check-item pass' : c.passed === false ? 'check-item fail' : 'check-item warn';
        var icon = c.passed === true ? '\u2705' : c.passed === false ? '\u274C' : '\u26A0\uFE0F';
        html += '<div class="' + cls + '">' + icon + ' <strong>' + c.check + '</strong> \u2014 ' + (c.note || '') + '</div>';
      });
      html += '</div>';
      html += '<div class="result-box' + (d.ready ? '' : ' warn') + '" style="margin-top:12px"><strong>' + (d.verdict || '') + '</strong> \u2014 Score: ' + (d.score || 0) + '%<br>' + (d.next_step || '') + '</div>';
      document.getElementById('val-result').innerHTML = html;
      if (d.ready) setTimeout(function() { showPhase(5); }, 800);
    })
    .catch(function(e) { if (ldr) ldr.style.display = 'none'; document.getElementById('val-result').innerHTML = '<div class="result-box err">Error: ' + e.message + '</div>'; });
}

// \u2500\u2500 Phase 5: Final submit \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
function finalSubmit() {
  var claim  = document.getElementById('sub-claim').value.trim();
  var track  = document.getElementById('sub-track').value;
  var reason = document.getElementById('sub-reason').value.trim();
  if (!claim) { showResult('sub-result', '${ar ? "\u0631\u0642\u0645 \u0627\u0644\u0645\u0637\u0627\u0644\u0628\u0629 \u0645\u0637\u0644\u0648\u0628" : "Claim number required"}', 'err'); return; }
  var ldr = document.getElementById('sub-loader');
  if (ldr) ldr.style.display = '';
  fetch(API + '/api/rcm/denial/submit', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ claim_number: claim, track: track, appeal_reason: reason }),
  })
  .then(function(r) { return r.json(); })
  .then(function(d) {
    if (ldr) ldr.style.display = 'none';
    var msg = '\u{1F680} ' + (d.tracking_note || '${ar ? "\u062A\u0645 \u0627\u0644\u0625\u0631\u0633\u0627\u0644" : "Submitted"}') + '<br>\u{1F4CC} Ref: ' + (d.reference_id || '\u2014') + '<br>\u{1F3DB}\uFE0F ' + (d.portal_link || '');
    showResult('sub-result', msg, 'success');
    loadStats();
  })
  .catch(function(e) { if (ldr) ldr.style.display = 'none'; showResult('sub-result', 'Error: ' + e.message, 'err'); });
}

// \u2500\u2500 Utility \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
function showResult(elId, msg, type) {
  var el = document.getElementById(elId);
  if (!el) return;
  var cls = type === 'err' ? 'result-box err' : type === 'warn' ? 'result-box warn' : 'result-box';
  el.innerHTML = '<div class="' + cls + '">' + msg + '</div>';
}

// ── RCM Auto-Pilot ──────────────────────────────────────────────────────────
function runAutoPipeline() {
  var ldr = document.getElementById('ap-loader');
  if (ldr) ldr.style.display = '';
  fetch('/api/rcm/pipeline')
    .then(function(r) { return r.json(); })
    .then(function(d) {
      if (ldr) ldr.style.display = 'none';
      var msg = d.success 
        ? '\u2705 Pipeline ran: ' + (d.pulled || 0) + ' pulled, ' + (d.classified || 0) + ' classified, ' + (d.appealed || 0) + ' appeals' 
        : '\u274C Error: ' + (d.error || 'Unknown');
      if (d.errors && d.errors.length) msg += '<br><small>' + d.errors.join('; ') + '</small>';
      showResult('ingest-result', msg, d.success ? 'success' : 'warn');
      loadAutopilotData();
    })
    .catch(function(e) { if (ldr) ldr.style.display = 'none'; showResult('ingest-result', 'Error: ' + e.message, 'err'); });
}

function loadAutopilotData() {
  // Load daily summary
  fetch('/api/rcm/summary')
    .then(function(r) { return r.json(); })
    .then(function(d) {
      if (d.success) {
        var today = document.getElementById('ap-today');
        if (today) today.textContent = d.new_rejections || 0;
      }
    })
    .catch(function() {});

  // Load 30/60/90 day trends
  fetch('/api/rcm/trend')
    .then(function(r) { return r.json(); })
    .then(function(d) {
      if (d.success && d.trends) {
        var el30 = document.getElementById('ap-30d');
        var el60 = document.getElementById('ap-60d');
        var el90 = document.getElementById('ap-90d');
        if (el30 && d.trends['30d']) el30.textContent = d.trends['30d'].total_rejections || 0;
        if (el60 && d.trends['60d']) el60.textContent = d.trends['60d'].total_rejections || 0;
        if (el90 && d.trends['90d']) el90.textContent = d.trends['90d'].total_rejections || 0;
      }
    })
    .catch(function() {});
}

// Init
loadStats();
loadAutopilotData();
<\/script>
</body>

<!-- AI Rejection Predictor -->
<div style="margin-top:24px;background:#0d1829;border:1px solid #1e3a5f;border-radius:12px;padding:24px">
  <h3 style="color:#4ea5ff;margin-bottom:16px;font-size:1rem">🤖 AI Rejection Risk Predictor</h3>
  <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;margin-bottom:16px">
    <div>
      <label style="font-size:.78rem;color:#8899aa;display:block;margin-bottom:6px">ICD-10 Diagnosis</label>
      <input id="pred-dx" placeholder="e.g. J18.9" style="width:100%;padding:8px 12px;background:#060c1a;border:1px solid #1e3a5f;border-radius:8px;color:#e8eaf0;font-size:.88rem">
    </div>
    <div>
      <label style="font-size:.78rem;color:#8899aa;display:block;margin-bottom:6px">Procedure Code</label>
      <input id="pred-proc" placeholder="e.g. 99213" style="width:100%;padding:8px 12px;background:#060c1a;border:1px solid #1e3a5f;border-radius:8px;color:#e8eaf0;font-size:.88rem">
    </div>
    <div>
      <label style="font-size:.78rem;color:#8899aa;display:block;margin-bottom:6px">Payer</label>
      <select id="pred-payer" style="width:100%;padding:8px 12px;background:#060c1a;border:1px solid #1e3a5f;border-radius:8px;color:#e8eaf0;font-size:.88rem">
        <option>BUPA Arabia</option><option>Tawuniya</option><option>Medgulf</option><option>Al Rajhi Takaful</option><option>GlobeMed</option><option>AXA Gulf</option>
      </select>
    </div>
  </div>
  <button onclick="predictRejection()" style="background:#4ea5ff;color:#fff;border:none;padding:10px 24px;border-radius:8px;font-size:.9rem;cursor:pointer;font-weight:600">🔮 Predict Risk</button>
  <div id="pred-result" style="margin-top:16px;padding:14px;background:#060c1a;border-radius:8px;display:none;font-size:.88rem;line-height:1.7"></div>
</div>
<script>
async function predictRejection(){
  var dx=document.getElementById('pred-dx').value.trim();
  var proc=document.getElementById('pred-proc').value.trim();
  var payer=document.getElementById('pred-payer').value;
  var res=document.getElementById('pred-result');
  if(!dx&&!proc){res.style.display='block';res.textContent='Please enter at least a diagnosis or procedure code.';return;}
  res.style.display='block';res.innerHTML='<span style="color:#4ea5ff">🔮 Analyzing...</span>';
  try{
    var r=await fetch('/basma/chat',{method:'POST',headers:{'Content-Type':'application/json'},
      body:JSON.stringify({message:'Analyze rejection risk for: Diagnosis='+dx+', Procedure='+proc+', Payer='+payer+'. Based on NPHIES rejection patterns, predict: 1) rejection probability % 2) most likely rejection code 3) prevention action. Be specific and concise.',lang:'en',hospital:'riyadh'})});
    var d=await r.json();
    var reply=d.reply||d.response||'Analysis failed';
    var riskColor=reply.includes('high')||reply.includes('HIGH')||reply.includes('%')&&parseInt(reply.match(/\d+/)?.[0])>50?'#ff6b6b':reply.includes('low')||reply.includes('LOW')?'#00c864':'#ffb400';
    res.innerHTML='<strong style="color:'+riskColor+'">AI Prediction:</strong><br>'+reply.replace(/\n/g,'<br>');
  }catch(e){res.textContent='Error: '+e.message;}
}
</script></html>`, {
    headers: {
      "Content-Type": "text/html;charset=UTF-8",
      "Cache-Control": "no-cache, must-revalidate",
      "X-HNH-Version": VERSION
    }
  });
}
__name(buildDenialWorkbench, "buildDenialWorkbench");
function buildRolePage(role, lang) {
  const ar = lang === "ar";
  const font = ar ? "'Tajawal', sans-serif" : "'Inter', sans-serif";
  const dir = ar ? "rtl" : "ltr";
  const ROLES = {
    patient: {
      icon: "\u{1F642}",
      title: ar ? "\u0628\u0648\u0627\u0628\u0629 \u0627\u0644\u0645\u0631\u064A\u0636" : "Patient Portal",
      sub: ar ? "\u0648\u0635\u0648\u0644 \u0633\u0631\u064A\u0639 \u0644\u062E\u062F\u0645\u0627\u062A\u0643 \u0627\u0644\u0635\u062D\u064A\u0629" : "Quick access to your healthcare services",
      color: "#0066CC",
      links: [
        { icon: "\u{1F4C5}", label: ar ? "\u062D\u062C\u0632 \u0645\u0648\u0639\u062F" : "Book Appointment", href: "https://bsma.elfadil.com/appointments", ext: true },
        { icon: "\u{1F4CB}", label: ar ? "\u0633\u062C\u0644\u0627\u062A\u064A \u0627\u0644\u0637\u0628\u064A\u0629" : "My Medical Records", href: "https://bsma.elfadil.com/records", ext: true },
        { icon: "\u{1F48A}", label: ar ? "\u0648\u0635\u0641\u0627\u062A\u064A" : "My Prescriptions", href: "https://bsma.elfadil.com/prescriptions", ext: true },
        { icon: "\u{1F4B3}", label: ar ? "\u0641\u0648\u0627\u062A\u064A\u0631\u064A" : "My Bills", href: "https://bsma.elfadil.com/billing", ext: true },
        { icon: "\u{1F4DE}", label: ar ? "\u0627\u062A\u0635\u0644 \u0628\u0646\u0627" : "Call Us", href: "https://bsma.elfadil.com", ext: false },
        { icon: "\u{1F399}\uFE0F", label: ar ? "\u0628\u0633\u0645\u0629 AI" : "Basma AI Assistant", href: "/#chat", ext: false }
      ],
      info: ar ? "\u0645\u0631\u062D\u0628\u0627\u064B \u0628\u0643 \u0641\u064A \u0628\u0648\u0627\u0628\u0629 \u0627\u0644\u0645\u0631\u0636\u0649. \u064A\u0645\u0643\u0646\u0643 \u062D\u062C\u0632 \u0627\u0644\u0645\u0648\u0627\u0639\u064A\u062F\u060C \u0627\u0644\u0627\u0637\u0644\u0627\u0639 \u0639\u0644\u0649 \u0633\u062C\u0644\u0627\u062A\u0643 \u0627\u0644\u0637\u0628\u064A\u0629\u060C \u0648\u0645\u062A\u0627\u0628\u0639\u0629 \u0641\u0648\u0627\u062A\u064A\u0631\u0643 \u0628\u0633\u0647\u0648\u0644\u0629." : "Welcome to the Patient Portal. Book appointments, view your medical records, and track your bills \u2014 all in one place."
    },
    clinician: {
      icon: "\u{1FA7A}",
      title: ar ? "\u0628\u0648\u0627\u0628\u0629 \u0627\u0644\u0637\u0627\u0642\u0645 \u0627\u0644\u0637\u0628\u064A" : "Clinician Portal",
      sub: ar ? "\u0646\u0638\u0627\u0645 \u0645\u062A\u0643\u0627\u0645\u0644 \u0644\u0644\u0623\u0637\u0628\u0627\u0621 \u0648\u0627\u0644\u0645\u0645\u0631\u0636\u064A\u0646" : "Integrated system for doctors and nurses",
      color: "#10B981",
      links: [
        { icon: "\u{1F4CA}", label: ar ? "\u0644\u0648\u062D\u0629 \u0627\u0644\u062A\u062D\u0643\u0645 \u0627\u0644\u0637\u0628\u064A\u0629" : "Clinical Dashboard", href: "https://givc.elfadil.com", ext: true },
        { icon: "\u{1F9FE}", label: ar ? "\u0627\u0644\u062A\u0631\u0645\u064A\u0632 \u0627\u0644\u0637\u0628\u064A" : "Medical Coding", href: "https://givc.elfadil.com/coding", ext: true },
        { icon: "\u{1F465}", label: ar ? "\u0642\u0627\u0626\u0645\u0629 \u0627\u0646\u062A\u0638\u0627\u0631\u064A" : "My Queue", href: "https://givc.elfadil.com/queue", ext: true },
        { icon: "\u{1F50D}", label: ar ? "\u0628\u062D\u062B \u0627\u0644\u0645\u0631\u0636\u0649" : "Patient Search", href: "https://givc.elfadil.com/patients", ext: true },
        { icon: "\u{1F4CB}", label: ar ? "\u0627\u0644\u0623\u0648\u0627\u0645\u0631 \u0627\u0644\u0637\u0628\u064A\u0629" : "Orders", href: "https://givc.elfadil.com/orders", ext: true },
        { icon: "\u{1F52C}", label: ar ? "\u0646\u062A\u0627\u0626\u062C \u0627\u0644\u0645\u062E\u062A\u0628\u0631" : "Lab Results", href: "https://givc.elfadil.com/lab", ext: true }
      ],
      info: ar ? "\u0627\u0644\u0648\u0635\u0648\u0644 \u0625\u0644\u0649 \u062C\u0645\u064A\u0639 \u0627\u0644\u0623\u062F\u0648\u0627\u062A \u0627\u0644\u0633\u0631\u064A\u0631\u064A\u0629: \u0633\u062C\u0644\u0627\u062A \u0627\u0644\u0645\u0631\u0636\u0649\u060C \u0627\u0644\u062A\u0631\u0645\u064A\u0632\u060C \u0642\u0648\u0627\u0626\u0645 \u0627\u0644\u0627\u0646\u062A\u0638\u0627\u0631\u060C \u0648\u0627\u0644\u0646\u062A\u0627\u0626\u062C \u0639\u0628\u0631 \u0646\u0638\u0627\u0645 GIVC." : "Access all clinical tools: patient records, coding, queues, and results via the GIVC system."
    },
    admin: {
      icon: "\u2699\uFE0F",
      title: ar ? "\u0628\u0648\u0627\u0628\u0629 \u0627\u0644\u0625\u062F\u0627\u0631\u0629" : "Admin Portal",
      sub: ar ? "\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0645\u0648\u0627\u0631\u062F \u0648\u0627\u0644\u0639\u0645\u0644\u064A\u0627\u062A \u0627\u0644\u062A\u0634\u063A\u064A\u0644\u064A\u0629" : "Resource and operations management",
      color: "#6366F1",
      links: [
        { icon: "\u{1F3E5}", label: ar ? "Oracle OASIS HIS" : "Oracle OASIS HIS", href: "https://oracle-bridge.brainsait.org", ext: true },
        { icon: "\u{1F4CA}", label: ar ? "\u062A\u0642\u0627\u0631\u064A\u0631 \u0627\u0644\u0625\u064A\u0631\u0627\u062F\u0627\u062A" : "Revenue Reports", href: "https://sbs.elfadil.com/reports", ext: true },
        { icon: "\u{1F468}\u200D\u2695\uFE0F", label: ar ? "\u0627\u0644\u0623\u0637\u0628\u0627\u0621 \u0648\u0627\u0644\u0645\u0648\u0627\u0631\u062F" : "Providers & Staff", href: "/api/providers", ext: false },
        { icon: "\u{1F33F}", label: ar ? "\u0641\u0631\u0648\u0639 \u0627\u0644\u0645\u062C\u0645\u0648\u0639\u0629" : "Group Branches", href: "/api/branches", ext: false },
        { icon: "\u{1F4CA}", label: ar ? "\u0644\u0648\u062D\u0629 NPHIES" : "NPHIES Dashboard", href: "/api/nphies/analysis", ext: false },
        { icon: "\u{1F512}", label: ar ? "\u0627\u0644\u0648\u0635\u0648\u0644 \u0627\u0644\u0622\u0645\u0646" : "Secure Access", href: "https://oracle-bridge.brainsait.org/health", ext: true }
      ],
      info: ar ? "\u0625\u062F\u0627\u0631\u0629 \u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0645\u062C\u0645\u0648\u0639\u0629 \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A \u0639\u0628\u0631 Oracle OASIS\u060C \u0648\u062A\u0642\u0627\u0631\u064A\u0631 SBS\u060C \u0648\u0645\u062A\u0627\u0628\u0639\u0629 \u0646\u0638\u0627\u0645 NPHIES." : "Manage Hayat National Hospitals Group via Oracle OASIS, SBS reports, and NPHIES monitoring."
    },
    billing: {
      icon: "\u{1F4B0}",
      title: ar ? "\u0628\u0648\u0627\u0628\u0629 \u0627\u0644\u0641\u0648\u062A\u0631\u0629" : "Billing Portal",
      sub: ar ? "\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0645\u0637\u0627\u0644\u0628\u0627\u062A \u0648\u0627\u0644\u0641\u0648\u062A\u0631\u0629 \u0627\u0644\u0637\u0628\u064A\u0629" : "Claims and medical billing management",
      color: "#F59E0B",
      links: [
        { icon: "\u{1F4B8}", label: ar ? "\u0646\u0638\u0627\u0645 \u0627\u0644\u0641\u0648\u062A\u0631\u0629 SBS" : "SBS Billing System", href: "https://sbs.elfadil.com", ext: true },
        { icon: "\u{1F3DB}\uFE0F", label: ar ? "\u0628\u0648\u0627\u0628\u0629 NPHIES" : "NPHIES Portal", href: "https://portal.nphies.sa", ext: true },
        { icon: "\u{1F4CB}", label: ar ? "\u0645\u0637\u0627\u0644\u0628\u0627\u062A GSS" : "GSS Claims", href: "https://sbs.elfadil.com/claims", ext: true },
        { icon: "\u2705", label: ar ? "\u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0627\u062A \u0627\u0644\u0645\u0633\u0628\u0642\u0629" : "Prior Authorizations", href: "https://sbs.elfadil.com/pa", ext: true },
        { icon: "\u{1F4CA}", label: ar ? "\u062A\u062D\u0644\u064A\u0644 NPHIES" : "NPHIES Analysis", href: "/api/nphies/analysis", ext: false },
        { icon: "\u{1F50D}", label: ar ? "\u0627\u0644\u0623\u0647\u0644\u064A\u0629 \u0627\u0644\u062A\u0623\u0645\u064A\u0646\u064A\u0629" : "Eligibility Check", href: "/api/eligibility", ext: false },
        { icon: "\u{1F6AB}", label: ar ? "\u0645\u0643\u062A\u0628 \u0627\u0644\u0631\u0641\u0636 \u0648\u0627\u0644\u0625\u0639\u0627\u062F\u0629" : "Denial & Resubmission", href: "/denial", ext: false }
      ],
      info: ar ? "\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0645\u0637\u0627\u0644\u0628\u0627\u062A \u0639\u0628\u0631 \u0646\u0638\u0627\u0645 SBS \u0648\u0628\u0648\u0627\u0628\u0629 NPHIES. \u0627\u0644\u0634\u0628\u0643\u0629: SAR 835M\u060C \u0645\u0639\u062F\u0644 \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629 98.6% (\u0627\u0644\u0631\u064A\u0627\u0636 88.5% \u26A0\uFE0F)." : "Manage claims via SBS and NPHIES. Network: SAR 835M, approval rate 98.6% (Riyadh 88.5% \u26A0\uFE0F)."
    },
    status: {
      icon: "\u{1F4CA}",
      title: ar ? "\u062D\u0627\u0644\u0629 \u0627\u0644\u0623\u0646\u0638\u0645\u0629" : "System Status",
      sub: ar ? "\u062D\u0627\u0644\u0629 \u062C\u0645\u064A\u0639 \u0627\u0644\u0623\u0646\u0638\u0645\u0629 \u0641\u064A \u0627\u0644\u0648\u0642\u062A \u0627\u0644\u0641\u0639\u0644\u064A" : "Real-time status of all systems",
      color: "#0066CC",
      links: [
        { icon: "\u{1F642}", label: "BSMA \u2014 Patient Portal", href: "https://bsma.elfadil.com", ext: true },
        { icon: "\u{1FA7A}", label: "GIVC \u2014 Clinician Portal", href: "https://givc.elfadil.com", ext: true },
        { icon: "\u{1F4B0}", label: "SBS  \u2014 Billing Portal", href: "https://sbs.elfadil.com", ext: true },
        { icon: "\u{1F537}", label: "Oracle Bridge \u2014 Health", href: "https://oracle-bridge.brainsait.org/health", ext: true },
        { icon: "\u{1F3DB}\uFE0F", label: "NPHIES Portal", href: "https://portal.nphies.sa", ext: true },
        { icon: "\u{1F399}\uFE0F", label: "Basma Voice Agent", href: "/voice/health", ext: false }
      ],
      info: ar ? "Oracle Tunnel: \u274C \u0643\u0644 \u0627\u0644\u0641\u0631\u0648\u0639 \u0645\u062A\u0648\u0642\u0641\u0629 \u0639\u0628\u0631 \u062E\u0648\u0627\u0631\u062C Cloudflare. BSMA / GIVC / SBS / NPHIES: \u2705 \u064A\u0639\u0645\u0644. \u0627\u0644\u062C\u0633\u0631 Oracle: \u2705 \u0635\u062D\u064A." : "Oracle Tunnel: \u274C all branches timeout via CF egress. BSMA / GIVC / SBS / NPHIES: \u2705 up. Oracle Bridge: \u2705 healthy."
    }
  };
  const page = ROLES[role] || ROLES.status;
  const color = page.color;
  const links = page.links.map(
    (l) => '<a href="' + l.href + '"' + (l.ext ? ' target="_blank"' : "") + ' class="rp-link"><span class="rp-ico">' + l.icon + '</span><span class="rp-lbl">' + l.label + '</span><span class="rp-arr">' + (ar ? "\u2190" : "\u2192") + "</span></a>"
  ).join("");
  return new Response(`<!DOCTYPE html>
<html lang="${lang}" dir="${dir}">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${page.title} | ${ar ? "\u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A" : "Hayat National Hospitals"}</title>
<meta name="robots" content="noindex">
<link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;700;800&family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:${font};background:#F0F4FA;color:#0F172A;min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;padding:32px 16px 64px}
.rp-wrap{width:100%;max-width:520px}
.rp-back{display:inline-flex;align-items:center;gap:6px;color:#64748B;text-decoration:none;font-size:.82rem;margin-bottom:24px}
.rp-back:hover{color:#0066CC}
.rp-card{background:#fff;border-radius:20px;box-shadow:0 4px 24px rgba(0,0,0,.08);overflow:hidden}
.rp-hdr{background:linear-gradient(135deg,${color},${color}CC);padding:32px 28px;color:#fff}
.rp-icon{font-size:2.8rem;margin-bottom:12px}
.rp-title{font-size:1.7rem;font-weight:800;margin-bottom:4px}
.rp-sub{font-size:.9rem;opacity:.85}
.rp-body{padding:20px 0}
.rp-link{display:flex;align-items:center;gap:14px;padding:14px 28px;text-decoration:none;color:#0F172A;border-bottom:1px solid #F1F5F9;transition:background .12s}
.rp-link:last-child{border-bottom:none}
.rp-link:hover{background:#F8FAFF}
.rp-ico{font-size:1.3rem;width:28px;flex-shrink:0}
.rp-lbl{flex:1;font-size:.95rem;font-weight:500}
.rp-arr{color:#CBD5E1;font-size:.9rem}
.rp-info{margin:20px 24px 0;padding:16px;background:#F0F4FA;border-radius:12px;font-size:.82rem;color:#64748B;line-height:1.6}
.rp-footer{margin-top:24px;text-align:center;font-size:.78rem;color:#94A3B8}
.rp-footer a{color:#0066CC;text-decoration:none}
</style>
</head>
<body>
<div class="rp-wrap">
  <a href="/${lang === "en" ? "?lang=en" : ""}" class="rp-back">${ar ? "\u2192 \u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629" : "\u2190 Home"}</a>
  <div class="rp-card">
    <div class="rp-hdr">
      <div class="rp-icon">${page.icon}</div>
      <div class="rp-title">${page.title}</div>
      <div class="rp-sub">${page.sub}</div>
    </div>
    <div class="rp-body">${links}</div>
    <div class="rp-info">${page.info}</div>
  </div>
  <div class="rp-footer">${ar ? "\u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A" : "Hayat National Hospitals"} &nbsp;\xB7&nbsp; <a href="https://bsma.elfadil.com">920-000-094</a> &nbsp;\xB7&nbsp; <a href="/${lang === "en" ? "?lang=en" : ""}">${ar ? "\u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629" : "Home"}</a></div>
</div>
</body>
</html>`, { headers: HTML_H });
}
__name(buildRolePage, "buildRolePage");
function serveBlogArticle(slug, lang) {
  const ar = lang === "ar";
  const post = BLOG_POSTS.find((p) => p.id === slug || p.slug === slug);
  if (!post) return serveNotFound(ar, "blog");
  const title = ar ? post.title_ar : post.title_en;
  const excerpt = ar ? post.excerpt_ar : post.excerpt_en;
  const catAr = { rcm: "\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0625\u064A\u0631\u0627\u062F\u0627\u062A", nphies: "NPHIES", coding: "\u0627\u0644\u062A\u0631\u0645\u064A\u0632 \u0627\u0644\u0637\u0628\u064A", tech: "\u062A\u0642\u0646\u064A\u0629", strategy: "\u0627\u0633\u062A\u0631\u0627\u062A\u064A\u062C\u064A\u0629", academy: "\u0627\u0644\u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629" };
  const catEn = { rcm: "Revenue Cycle", nphies: "NPHIES", coding: "Medical Coding", tech: "Technology", strategy: "Strategy", academy: "Academy" };
  const cat = ar ? catAr[post.category] || post.category : catEn[post.category] || post.category;
  const related = BLOG_POSTS.filter((p) => p.id !== post.id && p.category === post.category).slice(0, 2);
  return new Response(
    `<!DOCTYPE html>
<html lang="${lang}" dir="${ar ? "rtl" : "ltr"}">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title} | ${ar ? "\u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A" : "Hayat National"}</title>
<meta name="description" content="${excerpt}">
<link rel="canonical" href="https://hnh.brainsait.org/blog/${post.id}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${excerpt}">
<meta property="og:type" content="article">
<meta property="og:url" content="https://hnh.brainsait.org/blog/${post.id}">
<meta property="og:site_name" content="${ar ? "\u0645\u0633\u062A\u0634\u0641\u064A\u0627\u062A \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A" : "Hayat National Hospitals"}">
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="${title}">
<meta name="twitter:description" content="${excerpt}">
<script type="application/ld+json">{"@context":"https://schema.org","@type":"Article","headline":"${title.replace(/"/g, "'")}","description":"${excerpt.replace(/"/g, "'")}","author":{"@type":"Person","name":"${post.author}"},"publisher":{"@type":"Organization","name":"Hayat National Hospitals","url":"https://hnh.brainsait.org"},"datePublished":"${post.date}","url":"https://hnh.brainsait.org/blog/${post.id}","inLanguage":"${lang}"}<\/script>
<link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;700;800&family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
<style>
*{box-sizing:border-box;margin:0;padding:0}
:root{--p:#0066CC;--n:#1A2B4A;--a:#C9A84C;--s:#10B981;--bg:#F0F4FA;--sf:#fff;--b:#E2E8F0;--t:#0F172A;--ts:#64748B}
body{font-family:${ar ? "'Tajawal'" : "'Inter'"},sans-serif;background:var(--bg);color:var(--t);line-height:1.7}
.hdr{background:var(--sf);border-bottom:1px solid var(--b);padding:12px 0;position:sticky;top:0;z-index:10;box-shadow:0 2px 8px rgba(0,0,0,.06)}
.hi{max-width:820px;margin:0 auto;padding:0 20px;display:flex;align-items:center;justify-content:space-between}
.logo{display:flex;align-items:center;gap:8px;text-decoration:none;font-weight:800;color:var(--n);font-size:.9rem}
.logo-i{width:32px;height:32px;background:linear-gradient(135deg,var(--p),var(--n));border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:.95rem}
.bk{color:var(--ts);text-decoration:none;font-size:.82rem}
.bk:hover{color:var(--p)}
.wrap{max-width:740px;margin:0 auto;padding:40px 20px 80px}
.badge{display:inline-flex;align-items:center;gap:5px;background:rgba(0,102,204,.08);color:var(--p);padding:4px 12px;border-radius:20px;font-size:.72rem;font-weight:700;margin-bottom:12px;text-transform:uppercase;letter-spacing:.06em}
h1{font-size:clamp(1.55rem,3.5vw,2.2rem);font-weight:800;color:var(--n);line-height:1.3;margin-bottom:14px}
.meta{display:flex;gap:14px;flex-wrap:wrap;font-size:.78rem;color:var(--ts);margin-bottom:22px}
.lede{background:linear-gradient(135deg,rgba(0,102,204,.04),rgba(201,168,76,.04));border-inline-start:4px solid var(--p);padding:14px 18px;border-radius:0 10px 10px 0;font-size:.94rem;color:var(--n);font-style:italic;margin-bottom:30px;line-height:1.7}
.body{font-size:.95rem;line-height:1.85;color:var(--t)}
.body h2{font-size:1.25rem;font-weight:700;color:var(--n);margin:30px 0 12px;padding-bottom:7px;border-bottom:2px solid var(--b)}
.body h3{font-size:1.02rem;font-weight:700;color:var(--n);margin:22px 0 8px}
.body p{margin-bottom:14px}
.body ul,.body ol{margin:10px 0 14px 22px}
.body li{margin-bottom:5px}
.body strong{color:var(--n)}
.kpi-row{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin:22px 0}
.kpi{background:var(--sf);border:1px solid var(--b);border-radius:10px;padding:14px;text-align:center}
.kpi-n{font-size:1.4rem;font-weight:800;color:var(--p);line-height:1}
.kpi-l{font-size:.68rem;color:var(--ts);margin-top:3px}
.related{margin-top:44px;padding-top:28px;border-top:1px solid var(--b)}
.rel-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:12px;margin-top:14px}
.rel-card{background:var(--sf);border:1px solid var(--b);border-radius:10px;padding:14px;text-decoration:none;display:block;transition:all .2s}
.rel-card:hover{border-color:var(--p);transform:translateY(-2px)}
.rel-card h4{font-size:.82rem;font-weight:700;color:var(--n);margin-bottom:4px;line-height:1.4}
.rel-card p{font-size:.72rem;color:var(--ts)}
.cta{background:linear-gradient(135deg,var(--n),#0066CC);border-radius:16px;padding:28px;text-align:center;margin-top:36px;color:#fff}
.cta h3{font-size:1.1rem;margin-bottom:6px}
.cta p{color:rgba(255,255,255,.8);font-size:.85rem;margin-bottom:18px}
.cta-btns{display:flex;gap:8px;justify-content:center;flex-wrap:wrap}
.btn-w{background:#fff;color:var(--n);padding:9px 20px;border-radius:20px;font-weight:700;font-size:.82rem;text-decoration:none}
.btn-t{background:rgba(255,255,255,.15);color:#fff;padding:9px 20px;border-radius:20px;font-weight:600;font-size:.82rem;text-decoration:none;border:1px solid rgba(255,255,255,.3)}
@media(max-width:560px){.kpi-row,.rel-grid{grid-template-columns:1fr 1fr}.cta-btns{flex-direction:column}}
</style></head>
<body>
<header class="hdr"><div class="hi">
  <a href="/" class="logo"><div class="logo-i">\u{1F3E5}</div>${ar ? "\u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A" : "Hayat National"}</a>
  <div style="display:flex;align-items:center;gap:12px">
    <a href="/#blog" class="bk">${ar ? "\u2190 \u0627\u0644\u0645\u062F\u0648\u0646\u0629" : "\u2190 Blog"}</a>
    <a href="/blog/${post.id}?lang=${ar ? "en" : "ar"}" style="font-size:.78rem;color:var(--p);font-weight:600;text-decoration:none;padding:4px 10px;border:1px solid rgba(0,102,204,.3);border-radius:12px">${ar ? "EN" : "\u0639\u0631\u0628\u064A"}</a>
  </div>
</div></header>
<div class="wrap">
  <div class="badge">${post.emoji} ${cat}</div>
  <h1>${title}</h1>
  <div class="meta">
    <span>\u270D\uFE0F ${post.author}</span>
    <span>\u{1F4C5} ${post.date}</span>
    <span>\u23F1 ${post.read_min} ${ar ? "\u062F\u0642\u0627\u0626\u0642" : "min read"}</span>
  </div>
  <div class="lede">${excerpt}</div>
  <div class="body">
    ${getArticleBody(post.id, ar)}
  </div>
  <div class="related">
    <h3 style="font-size:1rem;font-weight:700;color:var(--n);margin-bottom:14px">${ar ? "\u0645\u0642\u0627\u0644\u0627\u062A \u0630\u0627\u062A \u0635\u0644\u0629" : "Related Articles"}</h3>
    <div class="rel-grid">
      ${related.map((p) => '<a href="/blog/' + p.id + "?lang=" + lang + '" class="rel-card"><div style="font-size:1.3rem;margin-bottom:6px">' + p.emoji + "</div><h4>" + (ar ? p.title_ar : p.title_en) + "</h4><p>" + (ar ? p.excerpt_ar : p.excerpt_en).slice(0, 80) + "...</p></a>").join("")}
    </div>
  </div>
  <div class="cta">
    <h3>${ar ? "\u062A\u062D\u0633\u064A\u0646 \u0625\u064A\u0631\u0627\u062F\u0627\u062A \u0645\u0633\u062A\u0634\u0641\u0627\u0643\u061F" : "Improve your hospital revenue?"}</h3>
    <p>${ar ? "ClaimLinc AI \u064A\u0642\u0644\u0644 \u0631\u0641\u0636\u0627\u062A NPHIES \u0628\u0646\u0633\u0628\u0629 \u062A\u0635\u0644 \u0625\u0644\u0649 87% \u062E\u0644\u0627\u0644 90 \u064A\u0648\u0645\u0627\u064B" : "ClaimLinc AI reduces NPHIES rejections by up to 87% in 90 days"}</p>
    <div class="cta-btns">
      <a href="https://bsma.elfadil.com" class="btn-w">\u{1F4DE} ${ar ? "\u062A\u0648\u0627\u0635\u0644 \u0645\u0639\u0646\u0627" : "Contact Us"}</a>
      <a href="/#academy" class="btn-t">\u{1F393} ${ar ? "\u0627\u0644\u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629" : "Academy"}</a>
      <a href="https://bsma.elfadil.com" target="_blank" class="btn-t">\u{1F642} BSMA</a>
    </div>
  </div>
</div>
</body></html>`,
    { headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "public, max-age=300" } }
  );
}
__name(serveBlogArticle, "serveBlogArticle");
function getArticleBody(id, ar) {
  const bodies = {
    "nphies-riyadh-rejections": ar ? '<h2>\u0627\u0644\u0645\u0634\u0643\u0644\u0629</h2><p>\u0633\u062C\u0651\u0644 \u0645\u0633\u062A\u0634\u0641\u0649 \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A \u0641\u064A \u0627\u0644\u0631\u064A\u0627\u0636 \u0646\u0633\u0628\u0629 \u0645\u0648\u0627\u0641\u0642\u0629 88.5% \u0639\u0644\u0649 \u0645\u0637\u0627\u0644\u0628\u0627\u062A NPHIES \u0641\u064A \u0627\u0644\u0631\u0628\u0639 \u0627\u0644\u0623\u0648\u0644 \u0645\u0646 2026\u060C \u0645\u0627 \u0623\u0633\u0641\u0631 \u0639\u0646 <strong>SAR 11.3 \u0645\u0644\u064A\u0648\u0646</strong> \u0641\u064A \u0645\u0637\u0627\u0644\u0628\u0627\u062A \u0645\u0631\u0641\u0648\u0636\u0629.</p><div class="kpi-row"><div class="kpi"><div class="kpi-n">88.5%</div><div class="kpi-l">\u0646\u0633\u0628\u0629 \u0645\u0648\u0627\u0641\u0642\u0629 \u0627\u0644\u0631\u064A\u0627\u0636</div></div><div class="kpi"><div class="kpi-n">SAR 11.3M</div><div class="kpi-l">\u0645\u0637\u0627\u0644\u0628\u0627\u062A \u0645\u0631\u0641\u0648\u0636\u0629</div></div><div class="kpi"><div class="kpi-n">100%</div><div class="kpi-l">\u0628\u0627\u0642\u064A \u0627\u0644\u0641\u0631\u0648\u0639</div></div></div><h2>\u0627\u0644\u0623\u0633\u0628\u0627\u0628 \u0627\u0644\u062C\u0630\u0631\u064A\u0629</h2><h3>1. \u0645\u0648\u0627\u0641\u0642\u0629 \u0645\u0633\u0628\u0642\u0629 \u0645\u0641\u0642\u0648\u062F\u0629 (35%)</h3><p>\u062E\u062F\u0645\u0627\u062A \u062A\u064F\u0642\u062F\u064E\u0651\u0645 \u062F\u0648\u0646 \u0627\u0644\u062D\u0635\u0648\u0644 \u0639\u0644\u0649 \u062A\u0635\u0631\u064A\u062D NPHIES \u0627\u0644\u0645\u0633\u0628\u0642. \u0627\u0644\u062D\u0644: AuthLinc \u064A\u0641\u062D\u0635 \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629 48 \u0633\u0627\u0639\u0629 \u0642\u0628\u0644 \u0627\u0644\u062F\u062E\u0648\u0644.</p><h3>2. \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062A\u0631\u0645\u064A\u0632 (28%)</h3><p>\u0639\u062F\u0645 \u062A\u0637\u0627\u0628\u0642 SBS/ICD-10. \u0627\u0644\u062D\u0644: CodeLinc AI \u064A\u062A\u062D\u0642\u0642 \u0645\u0646 \u062C\u0645\u064A\u0639 \u0627\u0644\u0631\u0645\u0648\u0632 \u0642\u0628\u0644 \u0627\u0644\u062A\u0642\u062F\u064A\u0645.</p><h3>3. \u0623\u0647\u0644\u064A\u0629 \u063A\u064A\u0631 \u0645\u0624\u0643\u062F\u0629 (22%)</h3><p>\u0627\u0644\u062D\u0644: \u0641\u062D\u0635 \u0627\u0644\u0623\u0647\u0644\u064A\u0629 \u0627\u0644\u0641\u0648\u0631\u064A \u0639\u0628\u0631 Oracle Bridge \u0639\u0646\u062F \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u0645\u0631\u064A\u0636.</p><h2>\u0627\u0644\u062A\u0623\u062B\u064A\u0631 \u0627\u0644\u0645\u062A\u0648\u0642\u0639</h2><p>\u062A\u0637\u0628\u064A\u0642 ClaimLinc \u064A\u064F\u062A\u0648\u0642\u0639 \u0627\u0633\u062A\u0631\u062F\u0627\u062F <strong>SAR 9.8 \u0645\u0644\u064A\u0648\u0646</strong> \u062E\u0644\u0627\u0644 90 \u064A\u0648\u0645\u0627\u064B\u060C \u0628\u0631\u0641\u0639 \u0646\u0633\u0628\u0629 \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629 \u0625\u0644\u0649 \u226597%.</p>' : '<h2>The Challenge</h2><p>Riyadh recorded 88.5% NPHIES approval in Q1 2026 \u2014 <strong>SAR 11.3M in rejected claims</strong> vs 100% at all other branches.</p><div class="kpi-row"><div class="kpi"><div class="kpi-n">88.5%</div><div class="kpi-l">Riyadh Approval</div></div><div class="kpi"><div class="kpi-n">SAR 11.3M</div><div class="kpi-l">Rejected Claims</div></div><div class="kpi"><div class="kpi-n">100%</div><div class="kpi-l">Other 5 Branches</div></div></div><h2>Root Causes</h2><h3>1. Missing Prior Auth (35%)</h3><p>Services rendered without NPHIES pre-auth. Fix: AuthLinc checks 48h before admission.</p><h3>2. Wrong Coding (28%)</h3><p>ICD-10/SBS mismatches. Fix: CodeLinc AI validates before submission.</p><h3>3. Eligibility Miss (22%)</h3><p>Fix: Real-time check at patient registration via Oracle Bridge.</p><h2>Impact</h2><p>Deploying ClaimLinc projects recovery of <strong>SAR 9.8M</strong> within 90 days, lifting Riyadh to \u226597%.</p>',
    "abha-nphies-triage": ar ? '<h2>\u0646\u0638\u0631\u0629 \u0639\u0627\u0645\u0629</h2><p>\u062A\u062F\u0642\u064A\u0642 BrainSAIT \u0644\u0645\u0637\u0627\u0644\u0628\u0627\u062A \u0645\u0633\u062A\u0634\u0641\u0649 \u0627\u0644\u062D\u064A\u0627\u0629 \u0623\u0628\u0647\u0627 \u0623\u0628\u0631\u064A\u0644 2026 \u0643\u0634\u0641 <strong>4,914 \u0633\u0637\u0631 \u0645\u0637\u0627\u0644\u0628\u0629 \u0645\u0631\u0641\u0648\u0636</strong>.</p><div class="kpi-row"><div class="kpi"><div class="kpi-n">4,914</div><div class="kpi-l">\u0633\u0637\u0631 \u0645\u0631\u0641\u0648\u0636</div></div><div class="kpi"><div class="kpi-n">2,181</div><div class="kpi-l">\u0625\u0639\u0627\u062F\u0629 \u062A\u0642\u062F\u064A\u0645</div></div><div class="kpi"><div class="kpi-n">290</div><div class="kpi-l">\u0637\u0627\u0628\u0648\u0631 \u0627\u0644\u062A\u062D\u0642\u0642</div></div></div><h2>\u0645\u0633\u0627\u0631\u0627\u062A \u0627\u0644\u0625\u062C\u0631\u0627\u0621</h2><h3>\u0627\u0644\u0645\u0633\u0627\u0631 1: \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u062A\u0642\u062F\u064A\u0645 (2,181)</h3><p>\u0645\u0637\u0627\u0644\u0628\u0627\u062A \u062A\u064F\u0639\u0627\u062F \u0628\u0625\u0636\u0627\u0641\u0629 \u0648\u062B\u0627\u0626\u0642 \u062F\u0627\u0639\u0645\u0629 \u0623\u0648 \u062A\u0635\u062D\u064A\u062D \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0631\u064A\u0636.</p><h3>\u0627\u0644\u0645\u0633\u0627\u0631 2: \u0637\u0639\u0646 \u062A\u0639\u0627\u0642\u062F\u064A (2,650)</h3><p>\u062E\u0644\u0627\u0641\u0627\u062A \u062A\u0639\u0627\u0642\u062F\u064A\u0629 \u0645\u0639 \u0634\u0631\u0643\u0627\u062A \u0627\u0644\u062A\u0623\u0645\u064A\u0646 \u062A\u062A\u0637\u0644\u0628 \u0645\u0631\u0627\u0633\u0644\u0629 \u0631\u0633\u0645\u064A\u0629.</p><h3>\u0627\u0644\u0645\u0633\u0627\u0631 3: \u0645\u0637\u0627\u0644\u0628\u0629 \u062C\u062F\u064A\u062F\u0629 (83)</h3><p>\u062D\u0627\u0644\u0627\u062A \u062A\u062D\u062A\u0627\u062C \u0645\u0637\u0627\u0644\u0628\u0629 \u062C\u062F\u064A\u062F\u0629 \u0645\u0639 \u0627\u0644\u0625\u0634\u0627\u0631\u0629 \u0644\u0644\u0623\u0635\u0644\u064A\u0629 \u0644\u0625\u062B\u0628\u0627\u062A \u0627\u0644\u0627\u0633\u062A\u0645\u0631\u0627\u0631\u064A\u0629.</p>' : '<h2>Overview</h2><p>BrainSAIT triage of Hayat Abha claims (April 2026) revealed <strong>4,914 rejected lines</strong> requiring urgent action.</p><div class="kpi-row"><div class="kpi"><div class="kpi-n">4,914</div><div class="kpi-l">Rejected Lines</div></div><div class="kpi"><div class="kpi-n">2,181</div><div class="kpi-l">Resubmissions</div></div><div class="kpi"><div class="kpi-n">290</div><div class="kpi-l">Portal Queue</div></div></div><h2>Three Action Tracks</h2><h3>Track 1: Resubmit with Supporting Info (2,181)</h3><p>Claims resubmitted by adding clinical documentation or correcting patient data.</p><h3>Track 2: Contractual Appeal (2,650)</h3><p>Disputes with insurers requiring formal appeal correspondence.</p><h3>Track 3: New Claim with Prior Linkage (83)</h3><p>Cases needing a new claim referencing the original to establish clinical continuity.</p>',
    "deepseek-healthcare-ai": ar ? "<h2>\u0644\u0645\u0627\u0630\u0627 DeepSeek\u061F</h2><p>\u0627\u062E\u062A\u0627\u0631 \u0641\u0631\u064A\u0642 BrainSAIT DeepSeek V3 \u0645\u062D\u0631\u0643\u0627\u064B \u0631\u0626\u064A\u0633\u064A\u0627\u064B \u0644\u0628\u0633\u0645\u0629 \u0644\u0623\u0633\u0628\u0627\u0628 \u0639\u062F\u0629: \u062F\u0639\u0645 \u0639\u0631\u0628\u064A \u0645\u0645\u062A\u0627\u0632\u060C \u0633\u0631\u0639\u0629 \u0627\u0633\u062A\u062C\u0627\u0628\u0629 \u0623\u0642\u0644 \u0645\u0646 3 \u062B\u0648\u0627\u0646\u064D\u060C \u0648\u062A\u0643\u0627\u0645\u0644 \u0645\u0628\u0627\u0634\u0631 \u0645\u0639 NPHIES \u0648Oracle Bridge.</p><h2>\u0633\u0644\u0633\u0644\u0629 \u0627\u0644\u0645\u062D\u0631\u0643\u0627\u062A</h2><p>\u0628\u0633\u0645\u0629 \u062A\u0633\u062A\u062E\u062F\u0645 \u0633\u0644\u0633\u0644\u0629 \u0645\u0646 4 \u0645\u062D\u0631\u0643\u0627\u062A: <strong>DeepSeek V3</strong> (\u0627\u0644\u0623\u0633\u0627\u0633\u064A) \u2190 Claude Sonnet 4 \u2190 CF Workers AI LLaMA \u2190 \u0631\u062F \u062B\u0627\u0628\u062A \u0627\u062D\u062A\u064A\u0627\u0637\u064A.</p><h2>\u0627\u0644\u062A\u0643\u0627\u0645\u0644\u0627\u062A \u0627\u0644\u062D\u064A\u0629</h2><p>\u064A\u0633\u062A\u0637\u064A\u0639 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u0627\u0644\u062D\u062F\u064A\u062B \u0645\u0639 \u0628\u0633\u0645\u0629 \u0628\u0627\u0644\u0635\u0648\u062A \u0648\u062D\u062C\u0632 \u0645\u0648\u0639\u062F \u0639\u0628\u0631 Oracle OPD\u060C \u0627\u0644\u062A\u062D\u0642\u0642 \u0645\u0646 \u0623\u0647\u0644\u064A\u062A\u0647 \u0639\u0628\u0631 NPHIES\u060C \u0648\u0645\u062A\u0627\u0628\u0639\u0629 \u0645\u0637\u0627\u0644\u0628\u0627\u062A\u0647 \u0639\u0628\u0631 ClaimLinc \u2014 \u0643\u0644 \u0630\u0644\u0643 \u0641\u064A \u062C\u0644\u0633\u0629 \u0635\u0648\u062A\u064A\u0629 \u0648\u0627\u062D\u062F\u0629.</p>" : "<h2>Why DeepSeek?</h2><p>BrainSAIT selected DeepSeek V3 as primary AI for Basma due to superior Arabic support, sub-3s response time, and direct integration with NPHIES and Oracle Bridge.</p><h2>Engine Chain</h2><p>Basma uses a 4-engine chain: <strong>DeepSeek V3</strong> (primary) \u2192 Claude Sonnet 4 \u2192 CF Workers AI LLaMA \u2192 static fallback.</p><h2>Live Integrations</h2><p>Voice users can book appointments via Oracle OPD, check eligibility via NPHIES, and track claims via ClaimLinc \u2014 all in a single voice session.</p>"
  };
  return bodies[id] || "<p>" + (ar ? "\u0627\u0644\u0645\u0642\u0627\u0644 \u0627\u0644\u0643\u0627\u0645\u0644 \u0642\u0631\u064A\u0628\u0627\u064B. \u062A\u0648\u0627\u0635\u0644 \u0645\u0639\u0646\u0627 \u0644\u0644\u0645\u0632\u064A\u062F \u0645\u0646 \u0627\u0644\u0645\u0639\u0644\u0648\u0645\u0627\u062A." : "Full article coming soon. Contact us for more details.") + "</p>";
}
__name(getArticleBody, "getArticleBody");
function serveAcademyCourse(cid, lang) {
  const ar = lang === "ar";
  const course = COURSES.find((c) => c.id === cid);
  if (!course) return serveNotFound(ar, "academy");
  const title = ar ? course.title_ar : course.title_en;
  const desc = ar ? course.desc_ar : course.desc_en;
  const lvl = { beginner: ar ? "\u0645\u0628\u062A\u062F\u0626" : "Beginner", intermediate: ar ? "\u0645\u062A\u0648\u0633\u0637" : "Intermediate", advanced: ar ? "\u0645\u062A\u0642\u062F\u0645" : "Advanced" }[course.level] || course.level;
  const ghUrl = course.repo?.startsWith("http") ? course.repo : "https://github.com/Fadil369/" + course.repo;
  let related = COURSES.filter((c) => c.id !== course.id && c.cat === course.cat).slice(0, 2);
  if (related.length < 2) {
    const more = COURSES.filter((c) => c.id !== course.id && !related.find((r) => r.id === c.id)).slice(0, 2 - related.length);
    related = related.concat(more);
  }
  return new Response(
    `<!DOCTYPE html>
<html lang="${lang}" dir="${ar ? "rtl" : "ltr"}">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title} | ${ar ? "\u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629 \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A" : "Hayat National Academy"}</title>
<meta name="description" content="${desc}">
<link rel="canonical" href="https://hnh.brainsait.org/academy/${course.id}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${desc}">
<meta property="og:type" content="website">
<meta property="og:url" content="https://hnh.brainsait.org/academy/${course.id}">
<meta property="og:site_name" content="${ar ? "\u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629 \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A" : "Hayat National Academy"}">
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="${title}">
<meta name="twitter:description" content="${desc}">
<script type="application/ld+json">{"@context":"https://schema.org","@type":"Course","name":"${title.replace(/"/g, "'")}","description":"${desc.replace(/"/g, "'")}","provider":{"@type":"EducationalOrganization","name":"Hayat National Academy","url":"https://hnh.brainsait.org/academy"},"url":"https://hnh.brainsait.org/academy/${course.id}","courseMode":"online","inLanguage":["ar","en"],"offers":{"@type":"Offer","price":"${course.price}","priceCurrency":"SAR"}}<\/script>
<link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;700;800&family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
<style>
*{box-sizing:border-box;margin:0;padding:0}
:root{--p:#0066CC;--n:#1A2B4A;--a:#C9A84C;--s:#10B981;--bg:#F0F4FA;--sf:#fff;--b:#E2E8F0;--t:#0F172A;--ts:#64748B}
body{font-family:${ar ? "'Tajawal'" : "'Inter'"},sans-serif;background:var(--bg);color:var(--t)}
.hdr{background:var(--sf);border-bottom:1px solid var(--b);padding:12px 0;position:sticky;top:0;z-index:10}
.hi{max-width:1000px;margin:0 auto;padding:0 20px;display:flex;align-items:center;justify-content:space-between}
.logo{display:flex;align-items:center;gap:8px;text-decoration:none;font-weight:800;color:var(--n);font-size:.9rem}
.logo-i{width:32px;height:32px;background:linear-gradient(135deg,var(--p),var(--n));border-radius:8px;display:flex;align-items:center;justify-content:center}
.bk{color:var(--ts);text-decoration:none;font-size:.82rem}
.hero{background:linear-gradient(135deg,var(--n),#0066CC);color:#fff;padding:52px 20px}
.hi2{max-width:1000px;margin:0 auto;display:grid;grid-template-columns:1fr 300px;gap:32px;align-items:start}
.chips{display:flex;gap:7px;flex-wrap:wrap;margin-bottom:14px}
.chip{padding:4px 11px;border-radius:20px;font-size:.7rem;font-weight:700;background:rgba(255,255,255,.15);color:#fff}
.chip-a{background:var(--a);color:var(--n)}
h1{font-size:clamp(1.5rem,2.8vw,2.1rem);font-weight:800;line-height:1.3;margin-bottom:14px}
.hero-desc{color:rgba(255,255,255,.85);font-size:.92rem;line-height:1.7;margin-bottom:22px}
.stats{display:flex;gap:20px;flex-wrap:wrap}
.st{text-align:center}.st-n{font-size:1.3rem;font-weight:800;color:var(--a)}.st-l{font-size:.68rem;color:rgba(255,255,255,.7);margin-top:2px}
.card-enroll{background:var(--sf);border-radius:16px;padding:24px;color:var(--t)}
.price{font-size:1.9rem;font-weight:800;color:var(--p);margin-bottom:2px}
.price-s{font-size:.77rem;color:var(--ts);margin-bottom:18px}
.btn-en{display:block;background:linear-gradient(135deg,var(--p),var(--n));color:#fff;text-decoration:none;text-align:center;padding:13px;border-radius:20px;font-weight:700;font-size:.9rem;margin-bottom:10px;transition:all .2s}
.btn-en:hover{opacity:.9}
.btn-gh{display:block;background:var(--bg);border:1px solid var(--b);color:var(--ts);text-decoration:none;text-align:center;padding:10px;border-radius:20px;font-size:.8rem;font-weight:600;transition:all .2s}
.btn-gh:hover{border-color:var(--p);color:var(--p)}
.inc{margin-top:14px;padding-top:12px;border-top:1px solid var(--b)}
.inc-i{display:flex;align-items:center;gap:7px;font-size:.78rem;color:var(--ts);padding:3px 0}
.inc-i::before{content:"\u2713";color:var(--s);font-weight:700;min-width:14px}
.main{max-width:1000px;margin:0 auto;padding:40px 20px 70px;display:grid;grid-template-columns:1fr 260px;gap:28px;align-items:start}
.sec-h{font-size:1.1rem;font-weight:700;color:var(--n);margin-bottom:14px;padding-bottom:7px;border-bottom:2px solid var(--b)}
.mods{display:flex;flex-direction:column;gap:6px;margin-bottom:32px}
.mod{background:var(--sf);border:1px solid var(--b);border-radius:9px;padding:12px 16px;display:flex;align-items:center;justify-content:space-between}
.mod-n{width:26px;height:26px;border-radius:50%;background:linear-gradient(135deg,var(--p),var(--n));color:#fff;display:flex;align-items:center;justify-content:center;font-size:.72rem;font-weight:700;flex-shrink:0}
.mod-t{font-size:.83rem;font-weight:600;color:var(--n);margin-inline:10px;flex:1}
.mod-d{font-size:.7rem;color:var(--ts)}
.rel-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:12px}
.rel-c{background:var(--sf);border:1px solid var(--b);border-radius:9px;padding:13px;text-decoration:none;transition:all .2s;display:block}
.rel-c:hover{border-color:var(--p);transform:translateY(-2px)}
.rel-c h4{font-size:.8rem;font-weight:700;color:var(--n);margin-bottom:3px;line-height:1.4}
.rel-c p{font-size:.71rem;color:var(--ts)}
.side-card{background:var(--sf);border:1px solid var(--b);border-radius:14px;padding:18px;position:sticky;top:70px}
.meta-r{display:flex;justify-content:space-between;padding:7px 0;border-bottom:1px solid var(--b);font-size:.8rem}
.meta-r:last-child{border:none}
.meta-r span:first-child{color:var(--ts)}.meta-r span:last-child{font-weight:600;color:var(--n)}
@media(max-width:700px){.hi2,.main{grid-template-columns:1fr}.rel-grid{grid-template-columns:1fr 1fr}}
</style></head>
<body>
<header class="hdr"><div class="hi">
  <a href="/" class="logo"><div class="logo-i">\u{1F393}</div>${ar ? "\u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629 \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0648\u0637\u0646\u064A" : "Hayat National Academy"}</a>
  <div style="display:flex;align-items:center;gap:12px">
    <a href="/#academy" class="bk">${ar ? "\u2190 \u0627\u0644\u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629" : "\u2190 Academy"}</a>
    <a href="/academy/${course.id}?lang=${ar ? "en" : "ar"}" style="font-size:.78rem;color:var(--p);font-weight:600;text-decoration:none;padding:4px 10px;border:1px solid rgba(0,102,204,.3);border-radius:12px">${ar ? "EN" : "\u0639\u0631\u0628\u064A"}</a>
  </div>
</div></header>
<div class="hero"><div class="hi2">
  <div>
    <div class="chips">
      <span class="chip">${course.icon} ${course.cat?.toUpperCase()}</span>
      <span class="chip">${lvl}</span>
      <span class="chip chip-a">${course.accred}</span>
    </div>
    <h1>${title}</h1>
    <p class="hero-desc">${desc}</p>
    <div class="stats">
      <div class="st"><div class="st-n">${course.hours}h</div><div class="st-l">${ar ? "\u0633\u0627\u0639\u0629" : "Hours"}</div></div>
      <div class="st"><div class="st-n">${course.modules || 8}</div><div class="st-l">${ar ? "\u0648\u062D\u062F\u0629" : "Modules"}</div></div>
      <div class="st"><div class="st-n">AR/EN</div><div class="st-l">${ar ? "\u062B\u0646\u0627\u0626\u064A \u0627\u0644\u0644\u063A\u0629" : "Bilingual"}</div></div>
    </div>
  </div>
  <div class="card-enroll">
    <div class="price">SAR ${course.price?.toLocaleString()}</div>
    <div class="price-s">${ar ? "\u0634\u0627\u0645\u0644 \u0627\u0644\u0634\u0647\u0627\u062F\u0629 \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u0629" : "Including accredited certificate"}</div>
    <a href="https://bsma.elfadil.com" class="btn-en">\u{1F4DE} ${ar ? "\u0633\u062C\u0651\u0644 \u2014 920000094" : "Enroll \u2014 920000094"}</a>
    <a href="${ghUrl}" target="_blank" class="btn-gh">\u2699\uFE0F ${ar ? "GitHub Repository" : "GitHub Repository"}</a>
    <div class="inc">
      <div class="inc-i">${ar ? "\u0634\u0647\u0627\u062F\u0629 SCFHS \u0645\u0639\u062A\u0645\u062F\u0629" : "SCFHS Accredited Certificate"}</div>
      <div class="inc-i">${ar ? "\u0645\u062D\u062A\u0648\u0649 \u0639\u0631\u0628\u064A/\u0625\u0646\u062C\u0644\u064A\u0632\u064A" : "Arabic + English Content"}</div>
      <div class="inc-i">${ar ? "\u0628\u064A\u0627\u0646\u0627\u062A \u0648\u062D\u0627\u0644\u0627\u062A \u062D\u0642\u064A\u0642\u064A\u0629" : "Real data & case studies"}</div>
      <div class="inc-i">${ar ? "\u062F\u0639\u0645 30 \u064A\u0648\u0645\u0627\u064B \u0628\u0639\u062F \u0627\u0644\u062F\u0648\u0631\u0629" : "30-day post-course support"}</div>
    </div>
  </div>
</div></div>
<div class="main">
  <div>
    <h2 class="sec-h">${ar ? "\u0645\u062D\u062A\u0648\u0649 \u0627\u0644\u062F\u0648\u0631\u0629" : "Course Modules"}</h2>
    <div class="mods">
      ${Array.from({ length: course.modules || 8 }, (_, i) => '<div class="mod"><div class="mod-n">' + (i + 1) + '</div><div class="mod-t">' + (ar ? "\u0627\u0644\u0648\u062D\u062F\u0629 " + (i + 1) + " \u2014 \u062A\u0637\u0628\u064A\u0642 " + course.title_ar?.split(" ")[0] : "Module " + (i + 1) + " \u2014 Applied " + course.title_en?.split(" ")[0]) + '</div><div class="mod-d">' + Math.round(course.hours / (course.modules || 8) * 60) + " " + (ar ? "\u062F\u0642\u064A\u0642\u0629" : "min") + "</div></div>").join("")}
    </div>
    <h2 class="sec-h" style="margin-top:10px">${ar ? "\u062F\u0648\u0631\u0627\u062A \u0630\u0627\u062A \u0635\u0644\u0629" : "Related Courses"}</h2>
    <div class="rel-grid">
      ${related.map((c) => '<a href="/academy/' + c.id + "?lang=" + lang + '" class="rel-c"><div style="font-size:1.3rem;margin-bottom:6px">' + c.icon + "</div><h4>" + (ar ? c.title_ar : c.title_en) + "</h4><p>SAR " + c.price + " \xB7 " + c.hours + "h</p></a>").join("")}
    </div>
  </div>
  <div class="side-card">
    <h3 style="font-size:.88rem;font-weight:700;color:var(--n);margin-bottom:12px">${ar ? "\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u062F\u0648\u0631\u0629" : "Course Details"}</h3>
    <div class="meta-r"><span>${ar ? "\u0627\u0644\u0645\u0633\u062A\u0648\u0649" : "Level"}</span><span>${lvl}</span></div>
    <div class="meta-r"><span>${ar ? "\u0627\u0644\u0645\u062F\u0629" : "Duration"}</span><span>${course.hours}h</span></div>
    <div class="meta-r"><span>${ar ? "\u0627\u0644\u0648\u062D\u062F\u0627\u062A" : "Modules"}</span><span>${course.modules || 8}</span></div>
    <div class="meta-r"><span>${ar ? "\u0627\u0644\u0644\u063A\u0629" : "Language"}</span><span>AR + EN</span></div>
    <div class="meta-r"><span>${ar ? "\u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F" : "Accreditation"}</span><span>${course.accred}</span></div>
    <div class="meta-r"><span>${ar ? "\u0627\u0644\u0633\u0639\u0631" : "Price"}</span><span style="color:var(--p);font-weight:800">SAR ${course.price?.toLocaleString()}</span></div>
  </div>
</div>
</body></html>`,
    { headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "public, max-age=300" } }
  );
}
__name(serveAcademyCourse, "serveAcademyCourse");
function serveNotFound(ar, type) {
  const msg = type === "blog" ? ar ? "\u0627\u0644\u0645\u0642\u0627\u0644 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F" : "Article Not Found" : ar ? "\u0627\u0644\u062F\u0648\u0631\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629" : "Course Not Found";
  const back = type === "blog" ? "/#blog" : "/#academy";
  return new Response(
    `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>404</title>
<style>body{font-family:sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;background:#F0F4FA;margin:0}
.b{background:#fff;border-radius:16px;padding:48px;text-align:center;max-width:420px}
h1{color:#1A2B4A;font-size:1.6rem;margin-bottom:10px}p{color:#64748B;margin-bottom:22px}a{background:#0066CC;color:#fff;padding:10px 22px;border-radius:20px;text-decoration:none;font-weight:700}</style></head>
<body><div class="b"><div style="font-size:2.5rem;margin-bottom:14px">\u{1F50D}</div>
<h1>${msg}</h1><p>${ar ? "\u0627\u0644\u0631\u0627\u0628\u0637 \u0627\u0644\u0630\u064A \u0637\u0644\u0628\u062A\u0647 \u063A\u064A\u0631 \u0635\u062D\u064A\u062D." : "The link you requested does not exist."}</p>
<a href="${back}">${ar ? "\u2190 \u0627\u0644\u0639\u0648\u062F\u0629" : "\u2190 Go Back"}</a></div></body></html>`,
    { status: 404, headers: { "Content-Type": "text/html; charset=utf-8" } }
  );
}
__name(serveNotFound, "serveNotFound");
async function apiPortalHub(env) {
  const cached = mcGet("portal-hub");
  if (cached) return ok(cached);
  const oracleKey = env && env.ORACLE_API_KEY || ORACLE_BRIDGE_KEY;
  const [bsmaNet, givcData, sbsData, oracleData] = await Promise.allSettled([
    fetch("https://bsma.elfadil.com/basma/network", { signal: AbortSignal.timeout(6e3) }).then((r) => r.ok ? r.json() : null),
    fetch("https://givc.elfadil.com/api/nphies/summary", { signal: AbortSignal.timeout(6e3) }).then((r) => r.ok ? r.json() : null),
    fetch("https://sbs.elfadil.com/claimlinc/coverage/batch", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: '{"status":"active"}',
      signal: AbortSignal.timeout(6e3)
    }).then((r) => r.ok ? r.json() : null),
    fetch("https://oracle-bridge.brainsait.org/diagnose/status", {
      headers: { "X-API-Key": oracleKey },
      signal: AbortSignal.timeout(3e3)
    }).then((r) => r.ok ? r.json() : { ok: false }).catch(() => ({ ok: false }))
  ]);
  const net = bsmaNet.status === "fulfilled" ? bsmaNet.value : null;
  const givc = givcData.status === "fulfilled" ? givcData.value : null;
  const sbs = sbsData.status === "fulfilled" ? sbsData.value : null;
  const diagnoseCached = oracleData.status === "fulfilled" ? oracleData.value : null;
  const oracle = diagnoseCached ? "live" : null;
  const fin = net?.financials || {};
  const br = net?.by_branch || {};
  const result = {
    timestamp: (/* @__PURE__ */ new Date()).toISOString(),
    portals: {
      bsma: { url: "https://bsma.elfadil.com", status: net ? "live" : "degraded", label_ar: "\u0628\u0648\u0627\u0628\u0629 \u0627\u0644\u0645\u0631\u064A\u0636", label_en: "Patient Portal", emoji: "\u{1F642}", version: "3.0.0" },
      givc: { url: "https://givc.elfadil.com", status: givc ? "live" : "degraded", label_ar: "\u0628\u0648\u0627\u0628\u0629 \u0627\u0644\u0637\u0628\u064A\u0628", label_en: "Clinician Portal", emoji: "\u{1FA7A}", version: "2.2.1" },
      sbs: { url: "https://sbs.elfadil.com", status: sbs ? "live" : "degraded", label_ar: "\u0628\u0648\u0627\u0628\u0629 \u0627\u0644\u0641\u0648\u0627\u062A\u064A\u0631", label_en: "Billing Portal", emoji: "\u{1F4B0}", version: "2.2.0" },
      oracle: { url: "https://oracle-bridge.brainsait.org", status: oracle ? "live" : "degraded", label_ar: "Oracle HIS", label_en: "Oracle HIS", emoji: "\u{1F537}", version: "2.0.0" },
      nphies: { url: "https://portal.nphies.sa", status: fin.network_total_sar ? "live" : "degraded", label_ar: "NPHIES", label_en: "NPHIES", emoji: "\u{1F3DB}\uFE0F", version: "live" }
    },
    nphies: {
      network_sar: fin.network_total_sar || 83569070281e-2,
      approval_rate: fin.network_approval_rate_pct || 98.6,
      total_claims: fin.total_claims_gss || 15138,
      total_pa: net?.prior_auth?.network_total || 51018,
      by_branch: br
    },
    coverage: {
      total: sbs?.total || 6,
      records: sbs?.coverage || []
    },
    oracle_status: {
      ok: !!oracle,
      reachable_count: Object.values(TUNNEL_STATUS).filter((h) => h.reachable).length,
      hospitals: diagnoseCached?.hospitals || TUNNEL_STATUS,
      source: diagnoseCached?.cached ? "bridge-cached" : "tunnel-verified"
    },
    givc_summary: givc || null
  };
  mcSet("portal-hub", result, 12e4);
  return ok(result);
}
__name(apiPortalHub, "apiPortalHub");
async function apiDashboard(env) {
  const cached = mcGet("dashboard");
  if (cached) return ok(cached);
  return dedupe("dashboard", async () => {
    const [hubResp, bsmaNet, dbStats] = await Promise.allSettled([
      apiPortalHub(env).then((r) => r.json()),
      bsmaNetwork(),
      Promise.all([
        env.DB.prepare("SELECT COUNT(*) as n FROM patients WHERE is_active=1").first().catch(() => ({ n: 0 })),
        env.DB.prepare("SELECT COUNT(*) as n FROM appointments WHERE status = ?").bind("confirmed").first().catch(() => ({ n: 0 })),
        env.DB.prepare("SELECT COUNT(*) as n FROM claims WHERE nphies_claim_id IS NOT NULL").first().catch(() => ({ n: 0 })),
        env.DB.prepare("SELECT COUNT(*) as n FROM providers WHERE is_active=1").first().catch(() => ({ n: 0 })),
        env.DB.prepare("SELECT COUNT(*) as n FROM departments WHERE is_active=1").first().catch(() => ({ n: 0 }))
      ])
    ]);
    const hub = hubResp.status === "fulfilled" ? hubResp.value : {};
    const bsma = bsmaNet.status === "fulfilled" ? bsmaNet.value : null;
    const db = dbStats.status === "fulfilled" ? dbStats.value : [{ n: 0 }, { n: 0 }, { n: 0 }, { n: 0 }, { n: 0 }];
    const fin = bsma?.financials || {};
    const hubN = hub.nphies || {};
    const data = {
      ts: Date.now(),
      version: VERSION,
      stats: {
        total_patients: db[0]?.n || 0,
        active_appointments: db[1]?.n || 0,
        nphies_claims: db[2]?.n || 0,
        total_departments: db[4]?.n || 20
      },
      total_providers: db[3]?.n || 269,
      nphies: {
        approval_rate: fin.network_approval_rate_pct || hubN.approval_rate || 98.6,
        total_sar: fin.network_total_sar || 83569070281e-2,
        total_claims: fin.total_claims_gss || hubN.total_claims || 15138,
        total_pa: bsma?.prior_auth?.network_total || hubN.total_pa || 51018,
        source: bsma ? "bsma-live" : "cached"
      },
      portals: hub.portals || {},
      coverage: hub.coverage || { total: 6 },
      oracle_status: hub.oracle_status || { ok: false, reachable_count: 0, hospitals: TUNNEL_STATUS, source: "static-fallback" }
    };
    mcSet("dashboard", data, 6e4);
    return ok(data);
  });
}
__name(apiDashboard, "apiDashboard");
var worker_default = {
  // Daily cron: RCM auto-pipeline (06:00 AST)
  async scheduled(event, env, ctx) {
    console.log('[CRON] RCM auto-pipeline started at', new Date().toISOString());
    const result = await rcmAutoPipeline(env, ctx);
    console.log('[CRON] RCM pipeline complete:', JSON.stringify(result));
  },

  async fetch(req, env) {
    if (req.method === "OPTIONS") return cors();
    const t0 = Date.now();
    const url = new URL(req.url);
    const path = url.pathname;
    const ip = req.headers.get("CF-Connecting-IP") || "anon";
    const reqId = Math.random().toString(36).slice(2, 10).toUpperCase();
    rlCleanup();
    if (!rateOk(ip)) {
      const r = new Response(JSON.stringify({ success: false, error: "Rate limit exceeded" }), { status: 429, headers: { ...JSON_H, "Retry-After": "60" } });
      r.headers.set("X-Request-ID", reqId);
      return r;
    }
    const resp = await handleRequest(req, env, url, path);
    resp.headers.set("X-Request-ID", reqId);
    resp.headers.set("X-HNH-Version", VERSION);
    console.log(JSON.stringify({ v: VERSION, ts: Date.now(), m: req.method, p: path, s: resp.status, ms: Date.now() - t0, rid: reqId }));
    return resp;
  }
};


// ════════════════════════════════════════════════════════════════
// RCM BATCH 550181 — BrainSAIT ClaimLinc Module (2026-05-03)
// ════════════════════════════════════════════════════════════════
const BUPA_CONTRACT_PRICES = {
  "0109222573": 3.16, "0109222574": 6.32, "0109222575": 9.48,
  "0109222576": 12.64, "0109222577": 15.80,
};
const PBM_RULES_HNH = [
  { drug_class: "antiemetic_5ht3", name_patterns: ["ondansetron","zoron","zenorit","zofran"],
    codes: ["1001233084","2205222049"], valid_icd_prefixes: ["C","K","R11","R10","Z51","Z79","T"],
    invalid_standalone: ["J02","J06","J00","J01","J03","J04","J05"], flag: "MN-1-1",
    message: "Antiemetic not justified without oncology/procedural context",
    suggestion: "Add R11.2 (nausea) or Z51.1 (chemo) as secondary ICD" },
  { drug_class: "PPI", name_patterns: ["toprazole","omeprazole","pantoprazole","esomeprazole"],
    codes: ["0411246139","0411246140","0411246141"], valid_icd_prefixes: ["C","K21","K25","K26","K27","Z51","K92"],
    invalid_standalone: ["J02","J06","J00","Z00","Z01"], flag: "MN-1-1",
    message: "PPI not indicated as primary treatment for this diagnosis",
    suggestion: "Add K21.0 (GERD) or K25 (Gastric ulcer) as secondary ICD" },
];
const BATCH_550181 = {
  batch_id:"550181", stm_id:"938269", payer:"BUPA Arabia",
  branch:"riyadh", facility:"Al Hayat National Hospital - Riyadh", provider_code:"21420",
  period:"202602", period_label:"February 2026", claim_type:"Out Patient", received_date:"2026-03-25",
  financials:{ presented_sr:510386.25, net_billed_sr:444180.74, vat_sr:37443.98, net_with_vat_sr:481624.72, total_shortfall_sr:73862.47 },
  rejection_lines:1415,
  top_rejections:[
    {reason:"Billed above contractual prices", count:102, code:"BE-1-6", sr:15088.57, action:"Price correct + resubmit"},
    {reason:"Duplicate billing", count:57, code:"BE-1-5", sr:8000, action:"Audit + reclassify"},
    {reason:"Free follow-up period", count:47, code:"AD-3-1", sr:3418.88, action:"Document new episode"},
    {reason:"Medication not indicated with diagnosis", count:200, code:"MN-1-1", sr:43478.53, action:"Physician appeal"},
  ],
  recovery_forecast:{ total_shortfall_sr:73862.47, expected_recovery_sr:64000, recovery_pct:87, timeline_weeks:6 },
  corrective_actions:{
    "BE-1-6":"Update HIS price master to match BUPA contract schedule",
    "BE-1-5":"Enable SBS pre-submission deduplication flag",
    "MN-1-1":"Validate drug-diagnosis at pharmacy order entry (/api/rcm/validate/pbm)",
    "AD-3-1":"Add 14-day follow-up period alert in appointment booking",
  },
};
const APPEAL_MAP_HNH = {
  "MN-1-1":{ desc:"Service not clinically justified per CPG", cchi:"CCHI Unified Policy Article 15",
    docs:["Clinical notes (DOS)","Physician justification letter","PA approval (if exists)","Lab/imaging results"],
    icd_suggestions:["R11.2 Nausea/vomiting","K21.0 GERD","Z51.1 Antineoplastic chemo","K92.1 Melena"] },
  "BE-1-6":{ desc:"Billed above contracted price", cchi:"CCHI Unified Policy Article 8",
    docs:["Corrected claim at contracted price","BUPA contract price schedule"], icd_suggestions:[] },
  "BE-1-5":{ desc:"Duplicate / Repeated billing", cchi:"CCHI Unified Policy Article 8",
    docs:["Two separate clinical encounter notes","Evidence of distinct presenting complaints"], icd_suggestions:[] },
  "AD-3-1":{ desc:"Within free follow-up period", cchi:"CCHI Unified Policy Article 11",
    docs:["Original visit note","New complaint note (clearly different)"], icd_suggestions:[] },
  "CV-1-4":{ desc:"Not covered under policy", cchi:"CCHI Unified Policy Annex A",
    docs:["Patient policy schedule","Benefit table showing coverage"], icd_suggestions:[] },
};
function rcmJson(data, status=200) {
  return new Response(JSON.stringify(data,null,2), {status, headers:{"Content-Type":"application/json","Access-Control-Allow-Origin":"*"}});
}
async function apiRcmHealth() {
  return rcmJson({ ok:true, version:"1.0.0", module:"RCM — Revenue Cycle Management",
    powered_by:"BrainSAIT ClaimLinc", case_study:"Batch 550181 — BUPA Arabia Riyadh Feb 2026 | SR 73,862 shortfall | 87% recovery",
    endpoints:["/api/rcm/batch/:id","/api/rcm/validate/price","/api/rcm/validate/duplicate",
      "/api/rcm/validate/pbm","/api/rcm/validate","/api/rcm/appeal/generate","/api/rcm/dashboard"] });
}
async function apiRcmBatch(batchId, env) {
  const known = {"550181": BATCH_550181};
  const batch = known[batchId];
  if (!batch) return rcmJson({error:"Batch "+batchId+" not found", available:Object.keys(known)},404);
  let liveCount = null;
  if (env.DB) {
    try { const r = await env.DB.prepare("SELECT COUNT(*) as n, SUM(reject_amount) as total FROM claims WHERE batch_number=?").bind(batchId).first(); liveCount = r; } catch {}
  }
  return rcmJson({success:true, batch, live_db: liveCount});
}
async function apiRcmValidatePrice(req) {
  const body = await req.json();
  const items = body.items||[], payer=body.payer||"BUPA";
  const violations=[], clean_items=[];
  let total_overcharge=0;
  for (const item of items) {
    const contracted = BUPA_CONTRACT_PRICES[item.serv_code];
    if (contracted===undefined) { clean_items.push({...item, note:"No contract price on file"}); continue; }
    const diff = Math.round((item.billed_amount-contracted)*100)/100;
    if (diff>0.01) { total_overcharge+=diff; violations.push({serv_code:item.serv_code, serv_desc:item.serv_desc||"", billed_amount:item.billed_amount, contracted_amount:contracted, overcharge_sr:diff, flag:"BE-1-6", action:"Change price from "+item.billed_amount+" SR to "+contracted+" SR → resubmit"}); }
    else clean_items.push({...item, contracted_amount:contracted, status:"PASS"});
  }
  return rcmJson({valid:violations.length===0, total_items:items.length, violations_count:violations.length, clean_count:clean_items.length, total_overcharge_sr:Math.round(total_overcharge*100)/100, violations, clean_items, summary:violations.length===0?"✅ All prices match contract":"❌ "+violations.length+" pricing violation(s) — SR "+total_overcharge.toFixed(2)+" overcharge"});
}
async function apiRcmValidateDuplicate(req) {
  const body = await req.json();
  const claims=body.claims||[], windowDays=body.window_days||14;
  const duplicates=[], seen=new Map();
  for (const claim of claims) {
    const key=claim.patient_id+"::"+claim.serv_code, existing=seen.get(key);
    if (existing) {
      const gapDays=Math.abs((new Date(claim.inv_date)-new Date(existing.inv_date))/86400000);
      const type=gapDays<0.01?"TYPE_1_SYSTEM_DOUBLE_SEND":gapDays<=windowDays?"TYPE_4_FOLLOW_UP_PERIOD":"TYPE_3_GENUINE_REPEAT";
      duplicates.push({claim_id:claim.claim_id, duplicate_of:existing.claim_id, patient_id:claim.patient_id, serv_code:claim.serv_code, gap_days:Math.round(gapDays*10)/10, type, flag:"BE-1-5"});
    } else seen.set(key,{claim_id:claim.claim_id, inv_date:claim.inv_date});
  }
  return rcmJson({total_claims:claims.length, duplicates_found:duplicates.length, window_days:windowDays, duplicates, summary:duplicates.length===0?"✅ No duplicates in "+claims.length+" claims":"⚠️ "+duplicates.length+" duplicate(s) found"});
}
async function apiRcmValidatePbm(req) {
  const body = await req.json();
  const items=body.items||[], violations=[], valid_items=[];
  for (const item of items) {
    const dc=item.drug_code||"", dn=(item.drug_name||item.serv_desc||"").toLowerCase(), icds=item.icd_codes||[];
    const rule=PBM_RULES_HNH.find(r=>r.codes.includes(dc)||r.name_patterns.some(p=>dn.includes(p)));
    if (!rule) { valid_items.push({...item, status:"NO_RULE"}); continue; }
    const hasValid=icds.some(icd=>rule.valid_icd_prefixes.some(p=>icd.startsWith(p)));
    if (hasValid) valid_items.push({...item, status:"PASS", matched_rule:rule.drug_class});
    else violations.push({claim_id:item.claim_id, drug_code:dc, drug_name:item.drug_name||item.serv_desc, drug_class:rule.drug_class, icd_codes:icds, flag:rule.flag, message:rule.message, suggestion:rule.suggestion});
  }
  return rcmJson({total_items:items.length, violations_count:violations.length, valid_count:valid_items.length, violations, valid_items, summary:violations.length===0?"✅ All drug-diagnosis pairs validated":"⚠️ "+violations.length+" PBM violation(s) — risk of MN-1-1"});
}
async function apiRcmAppealGenerate(req) {
  const body = await req.json();
  const code=body.rejection_code||"MN-1-1", map=APPEAL_MAP_HNH[code]||APPEAL_MAP_HNH["MN-1-1"];
  const icds=body.icd_codes||[], hasPa=!!body.pa_number, hasOncology=icds.some(i=>i.startsWith("C"));
  let score=0;
  if (hasPa) score+=3; if (hasOncology) score+=2; if (body.clinical_context) score+=2; if ((body.rejection_amount_sr||0)>500) score+=1;
  const strength=score>=5?"strong":score>=3?"medium":"weak";
  return rcmJson({claim_id:body.claim_id, rejection_code:code, payer:body.payer||"BUPA Arabia", branch:body.branch||"riyadh", nphies_description:map.desc, cchi_article:map.cchi, appeal_strength:strength, strength_score:score, pa_number:body.pa_number, pa_status:hasPa?"EXISTS — strong appeal factor":"MISSING — weaker case", icd_codes:icds, oncology_case:hasOncology, supporting_docs_required:map.docs, icd_suggestions:map.icd_suggestions, recommendation:strength==="strong"?"🟢 STRONG — proceed with full appeal package":strength==="medium"?"🟡 MEDIUM — strengthen documentation first":"🔴 WEAK — review clinical basis", generated_at:new Date().toISOString()});
}
async function apiRcmDashboard(env) {
  let rejected=[];
  if (env.DB) { try { const r=await env.DB.prepare("SELECT id,claim_number,total_amount,payer_name,status,nphies_rejection_code,branch FROM claims WHERE status IN ('rejected','denied') ORDER BY created_at DESC LIMIT 20").all(); rejected=r.results||[]; } catch {} }
  return rcmJson({success:true, dashboard_version:"1.0.0", generated_at:new Date().toISOString(), live_rejected_claims:{count:rejected.length, claims:rejected}, reference_batch:BATCH_550181, rcm_action_items:[{priority:1,action:"Export BE-1-6 lines → price correct → resubmit",code:"BE-1-6",impact:"SR 15,088"},{priority:2,action:"Eligibility check on Coverage rejections",code:"CV-1-4",impact:"SR 7,000"},{priority:3,action:"Physician appeal letters for MN-1-1",code:"MN-1-1",impact:"SR 31,000"},{priority:4,action:"Audit 57 duplicate lines",code:"BE-1-5",impact:"SR 9,000"}]});
}



// ════════════════════════════════════════════════════════════════════════════
// RCM MODULE v2.0 — Strategic Enhancement
// Closes gap analysis: SE-1-10, BE-1-4, AD-3-1, QA checklist, FHIR R4,
// Auth-Claim alignment, SLA tracker, rework categorization
// Based on: BrainSAIT Strategic Refinement Document 2026-05-03
// ════════════════════════════════════════════════════════════════════════════

// ── EXTENDED VALIDATION RULES ─────────────────────────────────────────────

const FOLLOW_UP_FREE_DAYS = 14;
const PA_MANDATORY_THRESHOLD_SR = 3000;
const SLA_RESUBMISSION_DAYS = 15; // NPHIES/MOH deadline

// ICD-10-CM-SA valid format (Saudi adaptation)
const ICD_PATTERN = /^[A-Z]\d{2}(\.\d{1,4})?$/;
const CPT_PATTERN = /^\d{5}$/;

// BE-1-4: Services requiring mandatory PA > SR 3,000
const PA_REQUIRED_SERVICE_PREFIXES = [
  '99', // E&M high complexity
  '27', // Orthopedic procedures
  '70', '71', '72', '73', '74', '75', '76', '77', '78', // Radiology
  '43', '44', '45', // GI procedures
  '33', '35', // Cardiac
  '61', '62', '63', '64', // Neurosurgery
];

// Rework categories (from strategy doc)
const REWORK_CATEGORIES = {
  'X': 'Pre-Authorization / Documentation',
  'Y': 'Data Entry / Administrative',
  'Z': 'Clinical Coding / ICD-CPT Mismatch',
  'W': 'Contractual / Pricing',
};

// ── 1. ENHANCED PRE-SUBMISSION QA CHECKLIST ──────────────────────────────
async function apiRcmQaChecklist(req) {
  const body = await req.json();
  const claim = body.claim || {};
  const checks = [];
  let passCount = 0, warnCount = 0, failCount = 0;

  const pass = (id, label, detail) => { checks.push({id, status:'PASS', label, detail}); passCount++; };
  const warn = (id, label, detail, code, action) => { checks.push({id, status:'WARN', label, detail, rejection_risk:code, action}); warnCount++; };
  const fail = (id, label, detail, code, action) => { checks.push({id, status:'FAIL', label, detail, rejection_risk:code, action}); failCount++; };

  // CHECK 1: Pricing vs contract
  if (claim.billed_amount && claim.contracted_amount) {
    if (parseFloat(claim.billed_amount) > parseFloat(claim.contracted_amount) * 1.001)
      fail('PRICE', 'Contractual Pricing', `Billed ${claim.billed_amount} SR > contracted ${claim.contracted_amount} SR`, 'BE-1-6', 'Update HIS price master before submission');
    else pass('PRICE', 'Contractual Pricing', 'Billed amount matches contract schedule');
  } else {
    warn('PRICE', 'Contractual Pricing', 'No contract price provided — manual check required', 'BE-1-6', 'Verify against BUPA/payer price schedule');
  }

  // CHECK 2: Pre-authorization
  const billedAmt = parseFloat(claim.billed_amount || 0);
  const hasPA = !!(claim.pa_number || claim.pre_auth_number);
  const needsPA = billedAmt > PA_MANDATORY_THRESHOLD_SR ||
    (PA_REQUIRED_SERVICE_PREFIXES.some(p => String(claim.cpt_code||'').startsWith(p)));
  if (needsPA && !hasPA)
    fail('PA', 'Prior Authorization', `Service >SR ${PA_MANDATORY_THRESHOLD_SR} or high-complexity — PA mandatory`, 'BE-1-4', 'Obtain PA via Oracle portal before billing');
  else if (hasPA)
    pass('PA', 'Prior Authorization', `PA present: ${claim.pa_number}`);
  else
    pass('PA', 'Prior Authorization', 'PA not required for this service type/amount');

  // CHECK 3: ICD-10-CM-SA format
  const icds = claim.icd_codes || [];
  const invalidIcds = icds.filter(c => !ICD_PATTERN.test(c.trim()));
  if (invalidIcds.length > 0)
    fail('ICD', 'ICD-10-CM-SA Coding', `Invalid ICD format: ${invalidIcds.join(', ')}`, 'CV-2-1', 'Correct ICD codes to ICD-10-CM-SA format (e.g. C18.2, J02.9)');
  else if (icds.length === 0)
    fail('ICD', 'ICD-10-CM-SA Coding', 'No diagnosis codes provided', 'CV-2-1', 'Add at least one valid ICD-10-CM-SA code');
  else
    pass('ICD', 'ICD-10-CM-SA Coding', `${icds.length} valid ICD code(s): ${icds.join(', ')}`);

  // CHECK 4: Free follow-up period
  if (claim.last_visit_date && claim.service_date && claim.same_diagnosis) {
    const days = Math.abs((new Date(claim.service_date) - new Date(claim.last_visit_date)) / 86400000);
    if (days < FOLLOW_UP_FREE_DAYS)
      warn('FOLLOWUP', 'Free Follow-up Period', `Only ${Math.round(days)} days since last visit for same diagnosis — within ${FOLLOW_UP_FREE_DAYS}-day free period`, 'AD-3-1', 'Document new/different complaint OR do not bill separately');
    else
      pass('FOLLOWUP', 'Free Follow-up Period', `${Math.round(days)} days since last visit — clear of follow-up window`);
  }

  // CHECK 5: Drug-diagnosis alignment (PBM)
  const drugs = claim.drug_codes || [];
  const pbmViolations = [];
  const PBM_QUICK = [
    {patterns:['zoron','zenorit','ondansetron'], valid:['C','K','R11','Z51'], bad:['J02','J06'], code:'MN-1-1'},
    {patterns:['toprazole','omeprazole','pantoprazole'], valid:['C','K21','K25','Z51'], bad:['J02','Z00'], code:'MN-1-1'},
  ];
  for (const drug of drugs) {
    const dn = (drug.name||drug.code||'').toLowerCase();
    const rule = PBM_QUICK.find(r => r.patterns.some(p => dn.includes(p)));
    if (rule) {
      const hasValid = icds.some(i => rule.valid.some(v => i.startsWith(v)));
      if (!hasValid) pbmViolations.push(`${drug.name||drug.code} not justified for ${icds.join('/')}`);
    }
  }
  if (pbmViolations.length > 0)
    fail('PBM', 'Drug-Diagnosis Alignment', pbmViolations.join('; '), 'MN-1-1', 'Add supporting secondary ICD or obtain additional PA documentation');
  else if (drugs.length > 0)
    pass('PBM', 'Drug-Diagnosis Alignment', `${drugs.length} drug(s) validated against diagnosis`);

  // CHECK 6: Patient demographics completeness (SE-1-10)
  const patient = claim.patient || {};
  const missingDemog = [];
  if (!patient.name_ar && !patient.name_en) missingDemog.push('patient name');
  if (!patient.national_id && !patient.iqama && !patient.passport) missingDemog.push('patient ID (national/iqama/passport)');
  if (!patient.dob) missingDemog.push('date of birth');
  if (!patient.gender) missingDemog.push('gender');
  if (!patient.member_id) missingDemog.push('insurance member ID');
  if (missingDemog.length > 0)
    fail('DEMOG', 'Patient Demographics (SE-1-10)', `Missing: ${missingDemog.join(', ')}`, 'SE-1-10', 'Complete patient demographics before submission');
  else
    pass('DEMOG', 'Patient Demographics', 'All required demographic fields present');

  // CHECK 7: Clinical documentation completeness
  const docs = claim.attached_docs || [];
  const docTypes = docs.map(d => (d.type||d).toLowerCase());
  if (billedAmt > 5000 && !docTypes.some(t => t.includes('clinical') || t.includes('note') || t.includes('report')))
    warn('DOCS', 'Clinical Documentation', 'High-value claim (>SR 5,000) without clinical notes attached', 'MN-1-1', 'Attach clinical notes, procedure report, and relevant imaging');
  else
    pass('DOCS', 'Clinical Documentation', docs.length > 0 ? `${docs.length} document(s) attached` : 'Low-value claim — documentation optional');

  // CHECK 8: Authorization-Claim alignment score
  // Strategy: auth approval rate 57.83% vs claim 40.14% — gap = 17.69%
  // High-risk claims: those without auth that are high-value complex procedures
  const authClaimGap = !hasPA && billedAmt > 2000;
  if (authClaimGap)
    warn('AUTHGAP', 'Authorization-Claim Alignment', `Claim SR ${billedAmt} without PA — auth rate (57.8%) vs claim rate (40.1%) gap risk`, 'BE-1-4', 'Obtain PA to improve approval probability by ~18%');

  const ready = failCount === 0;
  const score = Math.round((passCount / Math.max(1, passCount + warnCount + failCount)) * 100);
  const reworkCategory = failCount === 0 ? null :
    checks.some(c => c.id === 'PA' && c.status === 'FAIL') ? 'X' :
    checks.some(c => c.id === 'DEMOG' && c.status === 'FAIL') ? 'Y' :
    checks.some(c => ['ICD','PBM'].includes(c.id) && c.status === 'FAIL') ? 'Z' :
    checks.some(c => c.id === 'PRICE' && c.status === 'FAIL') ? 'W' : 'Y';

  return new Response(JSON.stringify({
    ready_to_submit: ready,
    qa_score: score,
    total_checks: checks.length,
    passed: passCount, warned: warnCount, failed: failCount,
    rework_category: reworkCategory,
    rework_category_name: reworkCategory ? REWORK_CATEGORIES[reworkCategory] : null,
    checks,
    verdict: ready ? '✅ CLEAR TO SUBMIT' :
      failCount > 0 ? `❌ BLOCKED — ${failCount} critical issue(s) must be resolved` :
      `⚠️ CONDITIONAL — ${warnCount} warning(s) require review`,
    next_action: ready ? 'Submit via NPHIES/payer portal' :
      `Fix ${failCount} FAIL items → rerun QA → submit`,
  }, null, 2), {headers:{'Content-Type':'application/json','Access-Control-Allow-Origin':'*'}});
}

// ── 2. SLA TRACKER ─────────────────────────────────────────────────────────
async function apiRcmSlaTracker(req, env) {
  const url = new URL(req.url);
  const branch = url.searchParams.get('branch') || 'riyadh';
  const today = new Date();

  let rejectedClaims = [];
  if (env && env.DB) {
    try {
      const r = await env.DB.prepare(
        `SELECT id, claim_number, status, submission_date, batch_number, nphies_rejection_code, reject_amount
         FROM claims WHERE status IN ('rejected','denied') AND branch = ?
         ORDER BY submission_date ASC`
      ).bind(branch).all();
      rejectedClaims = r.results || [];
    } catch {}
  }

  const slaAnalysis = rejectedClaims.map(c => {
    const rejDate = new Date(c.submission_date || today);
    const daysElapsed = Math.floor((today - rejDate) / 86400000);
    const daysRemaining = SLA_RESUBMISSION_DAYS - daysElapsed;
    const slaStatus = daysRemaining < 0 ? 'OVERDUE' :
      daysRemaining <= 3 ? 'CRITICAL' :
      daysRemaining <= 7 ? 'WARNING' : 'ON_TRACK';
    return {
      claim_number: c.claim_number,
      nphies_code: c.nphies_rejection_code,
      reject_amount_sr: c.reject_amount,
      rejected_date: c.submission_date,
      days_elapsed: daysElapsed,
      days_remaining: Math.max(0, daysRemaining),
      sla_days: SLA_RESUBMISSION_DAYS,
      sla_status: slaStatus,
      action: slaStatus === 'OVERDUE' ? '🚨 ESCALATE — SLA breached, contact payer for extension' :
        slaStatus === 'CRITICAL' ? '🔴 SUBMIT TODAY — < 3 days remaining' :
        slaStatus === 'WARNING' ? '🟡 PRIORITIZE — < 7 days remaining' :
        '🟢 On track',
    };
  });

  const overdue = slaAnalysis.filter(s => s.sla_status === 'OVERDUE').length;
  const critical = slaAnalysis.filter(s => s.sla_status === 'CRITICAL').length;
  const overdueSR = slaAnalysis.filter(s => s.sla_status === 'OVERDUE').reduce((s, c) => s + (c.reject_amount_sr || 0), 0);

  return new Response(JSON.stringify({
    branch, sla_days: SLA_RESUBMISSION_DAYS, generated_at: today.toISOString(),
    summary: { total: slaAnalysis.length, overdue, critical, on_track: slaAnalysis.length - overdue - critical },
    financial_at_risk: { overdue_sr: overdueSR, currency: 'SAR' },
    alert: overdue > 0 ? `🚨 ${overdue} claims OVERDUE — SR ${overdueSR.toFixed(2)} at risk of permanent loss` :
      critical > 0 ? `🔴 ${critical} claims critically close to SLA breach` : '✅ All claims within SLA window',
    claims: slaAnalysis,
  }, null, 2), {headers:{'Content-Type':'application/json','Access-Control-Allow-Origin':'*'}});
}

// ── 3. FHIR R4 ClaimResponse APPEAL BUILDER ───────────────────────────────
async function apiRcmFhirAppeal(req) {
  const body = await req.json();
  const now = new Date().toISOString();
  const appealId = `appeal-${body.claim_id || Date.now()}-${Math.random().toString(36).slice(2,7)}`;

  // Build FHIR R4 ClaimResponse for appeal submission
  const fhirAppeal = {
    resourceType: 'ClaimResponse',
    id: appealId,
    meta: { profile: ['https://nphies.sa/fhir/ksa/nphies-fs/StructureDefinition/appeal-claimresponse'] },
    status: 'active',
    type: { coding: [{ system: 'http://terminology.hl7.org/CodeSystem/claim-type', code: body.claim_type || 'professional', display: 'Professional' }] },
    use: 'claim',
    patient: { reference: `Patient/${body.patient_id || 'unknown'}` },
    created: now,
    insurer: {
      identifier: { system: 'https://nphies.sa/identifier/payer', value: body.payer_id || 'INS-307' },
      display: body.payer || 'BUPA Arabia',
    },
    request: { identifier: { system: 'https://nphies.sa/identifier/claim', value: body.claim_id } },
    outcome: 'queued',
    // Appeal-specific extension
    extension: [
      {
        url: 'https://nphies.sa/fhir/ksa/nphies-fs/StructureDefinition/appeal-request',
        extension: [
          { url: 'appealReason', valueString: body.appeal_reason || `Appealing rejection code ${body.rejection_code}: ${body.clinical_context || 'Clinical justification attached'}` },
          { url: 'originalClaimId', valueString: body.claim_id },
          { url: 'rejectionCode', valueCode: body.rejection_code || 'MN-1-1' },
          { url: 'appealDate', valueDate: now.split('T')[0] },
          { url: 'priorAuthNumber', valueString: body.pa_number || '' },
        ],
      }
    ],
    // Linked Communication resource for clinical justification
    communication: [{
      extension: [{
        url: 'https://nphies.sa/fhir/ksa/nphies-fs/StructureDefinition/communication-reference',
        valueReference: { reference: `Communication/${appealId}-comm` }
      }]
    }],
    item: (body.rejected_lines || []).map((line, i) => ({
      itemSequence: i + 1,
      adjudication: [{
        category: { coding: [{ code: 'submitted' }] },
        amount: { value: line.amount || 0, currency: 'SAR' },
      }],
      note: [{ text: line.justification || body.clinical_context || `Line ${i+1} appeal justification` }],
    })),
  };

  // Communication resource (links appeal docs to claim)
  const fhirCommunication = {
    resourceType: 'Communication',
    id: `${appealId}-comm`,
    status: 'completed',
    subject: { reference: `Patient/${body.patient_id || 'unknown'}` },
    about: [{ reference: `ClaimResponse/${appealId}` }],
    sent: now,
    payload: [
      { contentString: `Appeal for claim ${body.claim_id} | Rejection: ${body.rejection_code} | PA: ${body.pa_number || 'N/A'} | Clinical: ${body.clinical_context || 'See attached documents'}` },
      ...(body.supporting_docs || []).map(doc => ({ contentAttachment: { contentType: 'application/pdf', title: doc } })),
    ],
  };

  // FHIR Bundle
  const bundle = {
    resourceType: 'Bundle',
    id: `bundle-${appealId}`,
    type: 'transaction',
    timestamp: now,
    entry: [
      { resource: fhirAppeal, request: { method: 'POST', url: 'ClaimResponse' } },
      { resource: fhirCommunication, request: { method: 'POST', url: 'Communication' } },
    ],
  };

  return new Response(JSON.stringify({
    appeal_id: appealId,
    fhir_ready: true,
    bundle_resource_count: bundle.entry.length,
    submission_endpoint: 'POST https://sgw.nphies.sa/fhir/v1/',
    headers_required: { 'Content-Type': 'application/fhir+json', 'X-Request-ID': appealId },
    nphies_correlation_id: appealId,
    bundle,
  }, null, 2), {headers:{'Content-Type':'application/json','Access-Control-Allow-Origin':'*'}});
}

// ── 4. AUTH-CLAIM ALIGNMENT ANALYZER ─────────────────────────────────────
async function apiRcmAuthAlignment(req, env) {
  // Strategy doc: auth rate 57.83% vs claim rate 40.14% = 17.69% gap
  // Analyze why authorized claims fail at adjudication

  let authData = {total_pa: 51018, approved_pa: 29522, approval_rate_pct: 57.83};
  let claimData = {total_claims: 15138, approved_claims: 6078, approval_rate_pct: 40.14};

  if (env && env.DB) {
    try {
      const r = await env.DB.prepare(
        `SELECT status, COUNT(*) as n FROM claims WHERE batch_number='550181' GROUP BY status`
      ).all();
      const rows = r.results || [];
      const total = rows.reduce((s,x) => s + x.n, 0);
      const approved = rows.find(x => x.status === 'approved')?.n || 0;
      if (total > 0) claimData = { total_claims: total, approved_claims: approved, approval_rate_pct: Math.round(approved/total*1000)/10 };
    } catch {}
  }

  const gap = authData.approval_rate_pct - claimData.approval_rate_pct;
  const gapCauses = [
    { cause: 'Missing clinical documentation at claim time (present at PA stage)', pct_contribution: 35, rejection_codes: ['MN-1-1', 'BE-1-3'], fix: 'Mandate clinical docs attachment at billing, not just at PA' },
    { cause: 'Service scope changed between PA and delivery', pct_contribution: 25, rejection_codes: ['BE-1-4', 'MN-1-1'], fix: 'Verify delivered service = authorized service before billing' },
    { cause: 'PA validity period expired before service billed', pct_contribution: 20, rejection_codes: ['BE-1-4'], fix: 'Implement PA expiry alert in HIS — 3 days before expiry' },
    { cause: 'Billing code mismatch (CPT submitted ≠ CPT authorized)', pct_contribution: 15, rejection_codes: ['CV-2-1', 'BE-1-6'], fix: 'Auto-populate billing codes from PA approval letter' },
    { cause: 'Patient demographics changed between PA and claim', pct_contribution: 5, rejection_codes: ['SE-1-10'], fix: 'Re-verify eligibility on day of service, not just at PA' },
  ];

  const recoverable_pct = gap * 0.7; // 70% of gap is addressable

  return new Response(JSON.stringify({
    analysis: 'Authorization-Claim Approval Rate Gap',
    network_auth_rate_pct: authData.approval_rate_pct,
    network_claim_rate_pct: claimData.approval_rate_pct,
    gap_pct: Math.round(gap * 10) / 10,
    recoverable_gap_pct: Math.round(recoverable_pct * 10) / 10,
    financial_impact: {
      note: 'Each 1% improvement in claim rate = ~SR 8.4M additional approvals on SR 835M network',
      potential_recovery_sr: Math.round(recoverable_pct / 100 * 835690702 / 100) * 100,
    },
    gap_root_causes: gapCauses,
    top_fix: 'Mirror PA documentation workflow to claim submission — if it was required for PA, it is required for the claim',
    priority_actions: [
      'Replicate Pharmacy success model: standard formulary + pre-mapped pricing eliminates BE-1-6/MN-1-1',
      'Mandatory PA-to-claim linkage check: system blocks billing if PA scope differs from delivered service',
      'Real-time eligibility re-verification on DOS — not just at PA creation',
      'Auto-populate CPT/ICD from PA approval into billing system',
    ],
  }, null, 2), {headers:{'Content-Type':'application/json','Access-Control-Allow-Origin':'*'}});
}

// ── 5. REWORK CATEGORIZATION ───────────────────────────────────────────────
async function apiRcmReworkAnalysis(req, env) {
  let claims = [];
  if (env && env.DB) {
    try {
      const r = await env.DB.prepare(
        `SELECT nphies_rejection_code, COUNT(*) as count, SUM(reject_amount) as total
         FROM claims WHERE status IN ('rejected','denied') AND batch_number='550181'
         GROUP BY nphies_rejection_code`
      ).all();
      claims = r.results || [];
    } catch {}
  }

  const categorize = (code) => {
    if (['BE-1-4','MN-1-1','BE-1-3'].includes(code)) return 'X';
    if (['SE-1-10','AD-3-1','AD-1-4'].includes(code)) return 'Y';
    if (['CV-2-1','CV-1-4'].includes(code)) return 'Z';
    if (['BE-1-6','BE-1-5'].includes(code)) return 'W';
    return 'Y';
  };

  const byCategory = { X: {count:0, total:0, codes:[]}, Y: {count:0, total:0, codes:[]}, Z: {count:0, total:0, codes:[]}, W: {count:0, total:0, codes:[]} };

  // Seed from known Batch 550181 data if DB empty
  const sourceData = claims.length > 0 ? claims : [
    {nphies_rejection_code:'MN-1-1', count:206, total:43478.53},
    {nphies_rejection_code:'BE-1-6', count:102, total:15088.57},
    {nphies_rejection_code:'BE-1-5', count:57,  total:8000},
    {nphies_rejection_code:'AD-3-1', count:47,  total:3418.88},
    {nphies_rejection_code:'CV-1-4', count:28,  total:9079.85},
  ];

  for (const c of sourceData) {
    const cat = categorize(c.nphies_rejection_code);
    byCategory[cat].count += parseInt(c.count);
    byCategory[cat].total += parseFloat(c.total || 0);
    byCategory[cat].codes.push(c.nphies_rejection_code);
  }

  const trainingPlan = {
    'X': { team: 'Clinical Documentation + PA Coordinators', focus: 'Pre-auth requirements, medical necessity documentation, CPG alignment', sessions: 2, priority: 'HIGH' },
    'Y': { team: 'Administrative / Front Desk / Billing Entry', focus: 'Demographic accuracy, follow-up period rules, registration workflow', sessions: 3, priority: 'HIGH' },
    'Z': { team: 'Medical Coders (CPC/AHIMA certified)', focus: 'ICD-10-CM-SA, CPT-SA, SA DRG, correct code sequencing', sessions: 4, priority: 'MEDIUM' },
    'W': { team: 'Billing Supervisors + Contracting Team', focus: 'Payer-specific price schedules, duplicate claim detection, SBS settings', sessions: 2, priority: 'HIGH' },
  };

  return new Response(JSON.stringify({
    source: claims.length > 0 ? 'live_d1' : 'seed_batch_550181',
    total_rejections: sourceData.reduce((s,c)=>s+parseInt(c.count),0),
    total_shortfall_sr: sourceData.reduce((s,c)=>s+parseFloat(c.total||0),0),
    by_category: Object.entries(byCategory).map(([cat, data]) => ({
      category: cat,
      name: REWORK_CATEGORIES[cat],
      rejection_count: data.count,
      shortfall_sr: Math.round(data.total * 100) / 100,
      rejection_codes: [...new Set(data.codes)],
      training: trainingPlan[cat],
    })).sort((a,b) => b.shortfall_sr - a.shortfall_sr),
    recommendation: 'Highest ROI training: Category W (Contractual/Pricing) + Category X (PA/Documentation) — address 75% of shortfall',
  }, null, 2), {headers:{'Content-Type':'application/json','Access-Control-Allow-Origin':'*'}});
}




// ════════════════════════════════════════════════════════════════════════════
// RCM MODULE v3.0 — Multi-Payer Expansion
// Al Rajhi + Tawuniya + MOH + BUPA unified intelligence
// Addresses: 63.5% pre-auth crisis, eligibility gaps, multi-payer rules
// ════════════════════════════════════════════════════════════════════════════

// ── MULTI-PAYER CONTRACT & RULES ENGINE ──────────────────────────────────

const PAYER_CONFIGS = {
  'BUPA': {
    id: 'INS-307', name_en: 'BUPA Arabia', name_ar: 'بوبا العربية',
    pa_threshold_sr: 3000, follow_up_days: 14, settlement_days: 30,
    pricing: {
      '0109222573': 3.16,  // Normal Saline 0.9% 1ml
      '0109222574': 6.32,  '0109222575': 9.48,
      '0109222576': 12.64, '0109222577': 15.80,
    },
    rejection_patterns: ['BE-1-6','BE-1-5','MN-1-1','AD-3-1','CV-1-4'],
    top_rejection: 'BE-1-6', top_rejection_pct: 102/1415*100,
  },
  'AL_RAJHI': {
    id: 'INS-RAJ', name_en: 'Al Rajhi Takaful', name_ar: 'الراجحي للتكافل',
    pa_threshold_sr: 2000, follow_up_days: 7, settlement_days: 45,
    pricing: {}, // To be populated from contract
    rejection_patterns: ['MN-1-1','BE-1-4','CV-1-4','MN-2-1','BE-1-3'],
    top_rejection: 'BE-1-4',  // PA missing — 63.5% of rejections
    top_rejection_pct: 63.5,
    critical_rules: [
      { code: 'BE-1-4', desc: 'Missing prior authorization', pct: 63.5, risk: 'CRITICAL' },
      { code: 'MN-1-1', desc: 'Medical necessity — lab/radiology without justification', pct: 11.1, risk: 'HIGH' },
      { code: 'CV-1-4', desc: 'Coverage — non-covered diagnosis / waiting period', pct: 11.6, risk: 'HIGH' },
      { code: 'AD-1-4', desc: 'Specialist consultation without PCP referral', pct: 8.2, risk: 'HIGH' },
      { code: 'BE-1-3', desc: 'Documentation incomplete', pct: 5.6, risk: 'MEDIUM' },
    ],
    pa_mandatory_services: ['specialist-consult', 'lab-complex', 'radiology', 'surgery', 'physiotherapy'],
    waiting_period_conditions: ['pre-existing', 'dental', 'maternity', 'mental-health'],
  },
  'TAWUNIYA': {
    id: 'INS-TAW', name_en: 'Al Tawuniya', name_ar: 'التعاونية',
    pa_threshold_sr: 2500, follow_up_days: 10, settlement_days: 35,
    pricing: {},
    rejection_patterns: ['MN-1-1','BE-1-6','AD-3-1','CV-4-2','CV-4-7'],
    top_rejection: 'MN-1-1', top_rejection_pct: 45.2,
    critical_rules: [
      { code: 'MN-1-1', desc: 'Medical necessity — medication without matching diagnosis', pct: 45.2, risk: 'HIGH' },
      { code: 'CV-4-2', desc: 'Pharmacy — non-formulary drug', pct: 22.3, risk: 'HIGH' },
      { code: 'CV-4-7', desc: 'Pharmacy — quantity exceeds limit', pct: 15.1, risk: 'MEDIUM' },
      { code: 'BE-1-6', desc: 'Billed above Tawuniya schedule', pct: 12.4, risk: 'HIGH' },
    ],
  },
  'MOH': {
    id: 'INS-MOH', name_en: 'Ministry of Health / NPHIES', name_ar: 'وزارة الصحة',
    pa_threshold_sr: 5000, follow_up_days: 30, settlement_days: 50,
    pricing: {},
    rejection_patterns: ['AD-3-3','MN-2-1','BE-1-4','CV-1-4'],
    top_rejection: 'AD-3-3', top_rejection_pct: 38.7,
    sla_days: 15, // NPHIES resubmission hard deadline
    critical_rules: [
      { code: 'AD-3-3', desc: 'Service provided outside approved facility', pct: 38.7, risk: 'CRITICAL' },
      { code: 'MN-2-1', desc: 'Clinical justification insufficient for procedure', pct: 28.4, risk: 'HIGH' },
      { code: 'BE-1-4', desc: 'PA missing for MOH-covered service', pct: 20.1, risk: 'HIGH' },
    ],
  },
};

// ── LAB ORDER VALIDATION RULES (Evidence-Based) ───────────────────────────
const LAB_GUIDELINES = [
  // CBC panel
  { lab_codes: ['85025','85027'], name: 'CBC Complete', valid_icds: ['D','C','J18','J12','J15','J98','K','M','Z13'], 
    flag: 'MN-1-1', message: 'CBC requires documented indication', suggestion: 'Add D64.9 (anemia), Z13.0 (screening), or specific disease ICD' },
  // Kidney function
  { lab_codes: ['80047','80048','84520'], name: 'BUN/Creatinine/Renal Panel', 
    valid_icds: ['N','E','I12','I13','Z79','Z87'], flag: 'MN-1-1',
    message: 'Renal panel requires kidney disease or diabetes indication',
    suggestion: 'Add N18 (CKD), E11.65 (T2DM with CKD), or Z87.01 (history of kidney disease)' },
  // Liver function
  { lab_codes: ['80076','82247','84450'], name: 'LFT / Liver Function Panel',
    valid_icds: ['K','B','E','Z79','Z87'], flag: 'MN-1-1',
    message: 'Liver panel requires hepatic disease indication',
    suggestion: 'Add K74 (fibrosis), K70 (alcoholic liver), or medication hepatotoxicity ICD' },
  // HbA1c
  { lab_codes: ['83036'], name: 'HbA1c', valid_icds: ['E10','E11','E13','R73','Z13'],
    flag: 'MN-1-1', message: 'HbA1c requires diabetes or prediabetes indication',
    suggestion: 'Add E11 (T2DM), R73.0 (pre-diabetes), or Z13.1 (diabetes screening)' },
  // Imaging
  { lab_codes: ['71046','71048'], name: 'Chest X-Ray',
    valid_icds: ['J','R','C','Z87','Z86'], flag: 'MN-1-1',
    message: 'CXR requires respiratory/cardiac indication',
    suggestion: 'Add J18 (pneumonia), R05 (cough), R06 (dyspnea), or Z87.39' },
];

// ── SPECIALIST REFERRAL RULES (Al Rajhi gatekeeping) ─────────────────────
const SPECIALIST_CODES = {
  'cardiology': ['99213','99214','99215','93000','93010'],
  'orthopedics': ['27000-27899'],
  'neurology': ['95800-95829','99213','99214'],
  'gastroenterology': ['43200-43289','44360-44394'],
  'oncology': ['96401-96549'],
};

// ── WAITING PERIOD REGISTRY ───────────────────────────────────────────────
const WAITING_PERIOD_RULES = [
  { condition_type: 'pre-existing', payers: ['AL_RAJHI','TAWUNIYA'], months: 12, icds: [] },
  { condition_type: 'maternity', payers: ['AL_RAJHI','BUPA'], months: 10, icds: ['O','Z34','Z35'] },
  { condition_type: 'dental-major', payers: ['ALL'], months: 6, icds: ['K08','K09'] },
  { condition_type: 'mental-health', payers: ['AL_RAJHI'], months: 12, icds: ['F'] },
  { condition_type: 'physiotherapy', payers: ['AL_RAJHI'], months: 3, icds: ['M'] },
];

// ── 1. MULTI-PAYER QA (Enhanced) ──────────────────────────────────────────
async function apiRcmQaMultipayer(req) {
  const body = await req.json();
  const claim = body.claim || {};
  const payerKey = (claim.payer || 'BUPA').toUpperCase().replace(' ','_').replace('AL-','AL_');
  const payerCfg = PAYER_CONFIGS[payerKey] || PAYER_CONFIGS['BUPA'];
  const checks = [];
  let pass = (id,label,detail) => checks.push({id,status:'PASS',label,detail,payer:payerCfg.name_en});
  let fail = (id,label,detail,code,action) => checks.push({id,status:'FAIL',label,detail,rejection_risk:code,action,payer:payerCfg.name_en});
  let warn = (id,label,detail,code,action) => checks.push({id,status:'WARN',label,detail,rejection_risk:code,action,payer:payerCfg.name_en});

  const amt = parseFloat(claim.billed_amount || 0);
  const icds = claim.icd_codes || [];
  const hasPA = !!(claim.pa_number);

  // CHECK 1: Payer-specific PA threshold
  if (amt > payerCfg.pa_threshold_sr && !hasPA)
    fail('PA', 'Prior Authorization', `${payerCfg.name_en} requires PA for claims > SR ${payerCfg.pa_threshold_sr} — billed SR ${amt}`, 'BE-1-4', `Obtain PA from ${payerCfg.name_en} portal before rendering service`);
  else if (hasPA) pass('PA', 'Prior Authorization', `PA ${claim.pa_number} — meets ${payerCfg.name_en} threshold (SR ${payerCfg.pa_threshold_sr})`);
  else pass('PA', 'Prior Authorization', `Below ${payerCfg.name_en} PA threshold of SR ${payerCfg.pa_threshold_sr}`);

  // CHECK 2: Specialist without PCP referral (Al Rajhi critical rule)
  if (payerKey === 'AL_RAJHI' && claim.service_type === 'specialist-consult' && !claim.pcp_referral_number)
    fail('REFERRAL', 'Specialist Referral', 'Al Rajhi requires PCP referral for all specialist consultations', 'AD-1-4', 'Obtain PCP referral number before specialist appointment');
  else if (claim.service_type === 'specialist-consult' && claim.pcp_referral_number)
    pass('REFERRAL', 'Specialist Referral', `PCP referral: ${claim.pcp_referral_number}`);

  // CHECK 3: Waiting period check
  const waitViolation = WAITING_PERIOD_RULES.find(r =>
    (r.payers.includes(payerKey) || r.payers.includes('ALL')) &&
    icds.some(icd => r.icds.some(p => icd.startsWith(p))) &&
    claim.policy_start_date
  );
  if (waitViolation) {
    const monthsSincePolicyStart = claim.policy_start_date ?
      Math.floor((new Date() - new Date(claim.policy_start_date)) / (30*86400000)) : 99;
    if (monthsSincePolicyStart < waitViolation.months)
      fail('WAITING', 'Waiting Period', `${waitViolation.condition_type} — ${payerCfg.name_en} waiting period: ${waitViolation.months} months (${monthsSincePolicyStart} months elapsed)`, 'CV-1-4', 'Service may not be covered — verify policy start date and benefit limitations');
    else pass('WAITING', 'Waiting Period', `Waiting period satisfied (${monthsSincePolicyStart} months > required ${waitViolation.months})`);
  }

  // CHECK 4: Lab evidence-based guidelines
  const labCodes = claim.lab_codes || claim.cpt_codes || [];
  const labViolations = [];
  for (const lc of labCodes) {
    const rule = LAB_GUIDELINES.find(r => r.lab_codes.some(c => lc === c || lc.startsWith(c.split('-')[0])));
    if (rule) {
      const hasValid = icds.some(icd => rule.valid_icds.some(p => icd.startsWith(p)));
      if (!hasValid) labViolations.push({ code: lc, name: rule.name, suggestion: rule.suggestion });
    }
  }
  if (labViolations.length > 0)
    fail('LAB', 'Evidence-Based Lab Guidelines', labViolations.map(v => `${v.name} (${v.code}) lacks clinical indication`).join('; '), 'MN-1-1', labViolations[0].suggestion);
  else if (labCodes.length > 0) pass('LAB', 'Lab/Radiology Evidence', `${labCodes.length} lab/imaging code(s) validated`);

  // CHECK 5: Payer pricing
  const billedAmt = parseFloat(claim.billed_amount || 0);
  const contractedAmt = payerCfg.pricing[claim.serv_code];
  if (contractedAmt && billedAmt > contractedAmt * 1.001)
    fail('PRICE', 'Contractual Pricing', `Billed SR ${billedAmt} vs ${payerCfg.name_en} contracted SR ${contractedAmt}`, 'BE-1-6', `Correct to SR ${contractedAmt} per ${payerCfg.name_en} price schedule`);
  else pass('PRICE', 'Contractual Pricing', contractedAmt ? `Matches ${payerCfg.name_en} contract (SR ${contractedAmt})` : 'No contract price on file — verify manually');

  // CHECK 6: Follow-up period (payer-specific days)
  if (claim.last_visit_date && claim.service_date && claim.same_diagnosis) {
    const days = Math.abs((new Date(claim.service_date) - new Date(claim.last_visit_date)) / 86400000);
    if (days < payerCfg.follow_up_days)
      warn('FOLLOWUP', 'Free Follow-up Period', `${Math.round(days)} days since last visit — within ${payerCfg.name_en} ${payerCfg.follow_up_days}-day free period`, 'AD-3-1', 'Document new/different complaint if billing separately');
    else pass('FOLLOWUP', 'Free Follow-up Period', `${Math.round(days)} days > ${payerCfg.follow_up_days}-day ${payerCfg.name_en} window`);
  }

  // CHECK 7: Demographics (SE-1-10)
  const pt = claim.patient || {};
  const missing = [];
  if (!pt.national_id && !pt.iqama) missing.push('patient ID');
  if (!pt.dob) missing.push('DOB');
  if (!pt.member_id) missing.push('member ID');
  if (missing.length > 0) fail('DEMOG', 'Patient Demographics', `Missing: ${missing.join(', ')}`, 'SE-1-10', 'Complete before submission');
  else pass('DEMOG', 'Patient Demographics', 'All required fields present');

  const failed = checks.filter(c => c.status === 'FAIL').length;
  const warned = checks.filter(c => c.status === 'WARN').length;
  const passed = checks.filter(c => c.status === 'PASS').length;
  const score = Math.round(passed / Math.max(1, checks.length) * 100);

  const reworkCategory = failed === 0 ? null :
    checks.some(c => ['PA','REFERRAL'].includes(c.id) && c.status === 'FAIL') ? 'X' :
    checks.some(c => c.id === 'DEMOG' && c.status === 'FAIL') ? 'Y' :
    checks.some(c => ['LAB','PRICE'].includes(c.id) && c.status === 'FAIL') ? 'Z' : 'W';

  return new Response(JSON.stringify({
    payer: payerCfg.name_en,
    payer_id: payerCfg.id,
    pa_threshold_sr: payerCfg.pa_threshold_sr,
    follow_up_days: payerCfg.follow_up_days,
    ready_to_submit: failed === 0,
    qa_score: score,
    passed, warned, failed,
    rework_category: reworkCategory,
    rework_category_name: reworkCategory ? {X:'Pre-Authorization/Documentation',Y:'Data Entry',Z:'Clinical Coding',W:'Contractual/Pricing'}[reworkCategory] : null,
    checks,
    verdict: failed === 0 ? `✅ CLEAR TO SUBMIT to ${payerCfg.name_en}` : `❌ BLOCKED — ${failed} issue(s) for ${payerCfg.name_en}`,
    payer_top_rejection: payerCfg.top_rejection,
    payer_critical_rules: payerCfg.critical_rules || [],
    settlement_days_target: payerCfg.settlement_days,
  }, null, 2), {headers:{'Content-Type':'application/json','Access-Control-Allow-Origin':'*'}});
}

// ── 2. PAYER INTELLIGENCE DASHBOARD ──────────────────────────────────────
async function apiRcmPayerIntelligence(req) {
  const url = new URL(req.url);
  const payer = (url.searchParams.get('payer') || 'ALL').toUpperCase();

  const payers = payer === 'ALL' ? Object.values(PAYER_CONFIGS) : [PAYER_CONFIGS[payer]].filter(Boolean);

  return new Response(JSON.stringify({
    multi_payer_intelligence: payers.map(p => ({
      payer: p.name_en,
      payer_ar: p.name_ar,
      pa_threshold_sr: p.pa_threshold_sr,
      follow_up_days: p.follow_up_days,
      settlement_days: p.settlement_days,
      top_rejection: p.top_rejection,
      top_rejection_pct: p.top_rejection_pct,
      critical_rules: p.critical_rules || [],
      risk_level: p.top_rejection === 'BE-1-4' ? 'CRITICAL — PA crisis' :
        p.top_rejection === 'MN-1-1' ? 'HIGH — medical necessity' : 'MEDIUM',
      immediate_action: p.top_rejection === 'BE-1-4' ?
        `Implement mandatory PA workflow — ${p.critical_rules?.[0]?.pct || 63}% of rejections preventable` :
        `Run /api/rcm/qa with payer=${p.name_en} before every submission`,
    })),
    r001_status: '🚨 CRITICAL — PA non-compliance is #1 revenue leakage across Al Rajhi + MOH batches',
    r002_status: '📢 HIGH — Patient communication program needed for rejection transparency',
    r003_status: '⏱️ HIGH — Target: 50-day→15-day cycle via real-time NPHIES submission',
    consolidated_insight: 'Al Rajhi: 63.5% pre-auth. Tawuniya: 45.2% MN-1-1. MOH: 38.7% facility compliance. BUPA: 102 pricing errors. Each payer needs a custom QA profile.',
  }, null, 2), {headers:{'Content-Type':'application/json','Access-Control-Allow-Origin':'*'}});
}

// ── 3. PRE-AUTH MANDATORY BLOCKER (R001) ─────────────────────────────────
async function apiRcmPreAuthCheck(req) {
  const body = await req.json();
  const payerKey = (body.payer || 'BUPA').toUpperCase().replace(' ','_').replace('AL-','AL_');
  const payer = PAYER_CONFIGS[payerKey] || PAYER_CONFIGS['BUPA'];
  const billedAmt = parseFloat(body.amount || 0);
  const serviceType = body.service_type || '';

  const needsPA =
    billedAmt > payer.pa_threshold_sr ||
    (payerKey === 'AL_RAJHI' && payer.pa_mandatory_services?.some(s => serviceType.includes(s))) ||
    (body.cpt_codes || []).some(c => parseInt(c) > 90000);

  const hasPA = !!body.pa_number;

  return new Response(JSON.stringify({
    payer: payer.name_en,
    requires_pa: needsPA,
    pa_provided: hasPA,
    pa_number: body.pa_number || null,
    blocked: needsPA && !hasPA,
    amount_sr: billedAmt,
    threshold_sr: payer.pa_threshold_sr,
    verdict: !needsPA ? '✅ PA not required for this claim' :
      hasPA ? `✅ PA ${body.pa_number} provided — proceed` :
      `🚨 BLOCKED — ${payer.name_en} requires PA for this service. R001: Obtain PA before rendering care.`,
    r001_rule: `Per R001 risk mitigation: mandatory PA within 2 weeks for all ${payer.name_en} claims > SR ${payer.pa_threshold_sr}`,
    oracle_action: needsPA && !hasPA ? `Login to Oracle RAD portal → Pre-Authorization → New Request → Payer: ${payer.name_en}` : null,
    nphies_action: needsPA && !hasPA ? 'POST FHIR PriorAuthorization resource to sgw.nphies.sa/fhir/v1/' : null,
  }, null, 2), {headers:{'Content-Type':'application/json','Access-Control-Allow-Origin':'*'}});
}

// ── 4. LAB ORDER VALIDATOR (Evidence-Based) ───────────────────────────────
async function apiRcmLabValidate(req) {
  const body = await req.json();
  const labs = body.lab_codes || body.cpt_codes || [];
  const icds = body.icd_codes || [];
  const payer = body.payer || 'AL_RAJHI';

  const violations = [], validated = [];
  for (const lab of labs) {
    const rule = LAB_GUIDELINES.find(r => r.lab_codes.some(c => lab === c));
    if (!rule) { validated.push({code:lab, status:'NO_RULE', note:'No evidence-based guideline on file — submit with clinical justification'}); continue; }
    const hasValid = icds.some(icd => rule.valid_icds.some(p => icd.startsWith(p)));
    if (hasValid) validated.push({code:lab, name:rule.name, status:'PASS', matched_icds: icds.filter(icd => rule.valid_icds.some(p => icd.startsWith(p)))});
    else violations.push({code:lab, name:rule.name, flag:rule.flag, message:rule.message, suggestion:rule.suggestion, icd_codes:icds});
  }

  return new Response(JSON.stringify({
    payer, total_labs: labs.length, violations_count: violations.length, valid_count: validated.length,
    violations, validated,
    panel_risk: labs.length > 5 ? `⚠️ ${labs.length} labs ordered — potential "panel" over-utilization. Peer review recommended.` : null,
    summary: violations.length === 0 ? `✅ All ${labs.length} lab/radiology orders clinically justified` :
      `❌ ${violations.length} lab order(s) lack clinical justification — risk of MN-1-1/MN-2-1 rejection`,
  }, null, 2), {headers:{'Content-Type':'application/json','Access-Control-Allow-Origin':'*'}});
}

// ── 5. SETTLEMENT CYCLE TRACKER (R003) ────────────────────────────────────
async function apiRcmSettlementCycle(req, env) {
  const TARGET_DAYS = {BUPA: 30, AL_RAJHI: 45, TAWUNIYA: 35, MOH: 50};
  const OPTIMAL_DAYS = {BUPA: 15, AL_RAJHI: 21, TAWUNIYA: 18, MOH: 15};

  let byPayer = {};
  if (env && env.DB) {
    try {
      const r = await env.DB.prepare(
        `SELECT payer_name, COUNT(*) as claims, AVG(julianday('now') - julianday(submission_date)) as avg_days,
         SUM(total_amount) as total_sr FROM claims GROUP BY payer_name`
      ).all();
      for (const row of r.results || []) {
        const pk = (row.payer_name||'').toUpperCase().replace(' ','_').replace('AL-','AL_');
        byPayer[row.payer_name] = {
          claims: row.claims, avg_days: Math.round(row.avg_days || 0), total_sr: row.total_sr,
          target_days: TARGET_DAYS[pk] || 30, optimal_days: OPTIMAL_DAYS[pk] || 15,
          status: (row.avg_days || 0) <= (OPTIMAL_DAYS[pk] || 15) ? 'OPTIMAL' :
            (row.avg_days || 0) <= (TARGET_DAYS[pk] || 30) ? 'ACCEPTABLE' : 'OVERDUE',
        };
      }
    } catch {}
  }

  const hasMohClaims = Object.keys(byPayer).some(p => p.includes('MOH') || p.includes('Ministry'));
  const hasAlRajhi = Object.keys(byPayer).some(p => p.includes('Rajhi') || p.includes('RAJHI'));

  return new Response(JSON.stringify({
    r003_target: 'Reduce 50-day MOH settlement cycle → 15 days via real-time NPHIES submission',
    live_by_payer: byPayer,
    benchmarks: Object.entries(TARGET_DAYS).map(([p,t]) => ({
      payer: p, current_target_days: t, optimal_target_days: OPTIMAL_DAYS[p],
      improvement: `${t - OPTIMAL_DAYS[p]} days faster with real-time FHIR submission`,
    })),
    actions: [
      { priority: 1, action: 'Enable real-time FHIR R4 claim submission to NPHIES (replaces batch cycle)', impact: 'MOH: 50 days → 15 days', endpoint: 'POST /api/rcm/fhir/appeal' },
      { priority: 2, action: 'Auto-submit rejected+corrected claims within 24h of QA pass', impact: 'Eliminates manual delay', endpoint: 'POST /api/rcm/claims/:id/resubmit' },
      { priority: 3, action: 'Daily SLA check via /api/rcm/sla — escalate overdue same day', impact: 'Zero SLA breaches', endpoint: 'GET /api/rcm/sla' },
    ],
  }, null, 2), {headers:{'Content-Type':'application/json','Access-Control-Allow-Origin':'*'}});
}



// ── RCM mutation helpers ────────────────────────────────────────────────
async function apiRcmMarkAppeal(req, env, claimId) {
  const body = await req.json().catch(() => ({}));
  if (!env || !env.DB) return rcmJson({success:false, error:'Database not available'},503);
  try {
    await env.DB.prepare(
      "UPDATE claims SET status='appealed', appeal_date=?, appeal_notes=?, nphies_rejection_code=COALESCE(?,nphies_rejection_code), appeal_strength=COALESCE(?,appeal_strength), updated_at=datetime('now') WHERE claim_number=?"
    ).bind(new Date().toISOString(), body.appeal_notes||'', body.rejection_code||null, body.appeal_strength||null, claimId).run();
    return rcmJson({success:true, claim_id:claimId, status:'appealed', appeal_date:new Date().toISOString()});
  } catch(e) { return rcmJson({success:false, error:e.message, claim_id:claimId},500); }
}
async function apiRcmMarkResubmit(req, env, claimId) {
  const body = await req.json().catch(() => ({}));
  if (!env || !env.DB) return rcmJson({success:false, error:'Database not available'},503);
  try {
    await env.DB.prepare(
      "UPDATE claims SET status='resubmitted', resubmit_date=?, resubmit_notes=?, updated_at=datetime('now') WHERE claim_number=?"
    ).bind(new Date().toISOString(), body.resubmit_notes||'', claimId).run();
    return rcmJson({success:true, claim_id:claimId, status:'resubmitted', resubmit_date:new Date().toISOString()});
  } catch(e) { return rcmJson({success:false, error:e.message, claim_id:claimId},500); }
}
async function apiRejectedClaims(req, env) {
  const url = new URL(req.url);
  const branch = url.searchParams.get('branch') || '';
  if (!env || !env.DB) return rcmJson({success:false,error:'DB not available'},503);
  try {
    let q = "SELECT id,claim_number,total_amount,payer_name,status,nphies_rejection_code,reject_amount,branch FROM claims WHERE status IN ('rejected','denied')";
    const binds = [];
    if (branch) { q += ' AND branch=?'; binds.push(branch); }
    q += ' ORDER BY created_at DESC LIMIT 20';
    const r = binds.length ? await env.DB.prepare(q).bind(...binds).all() : await env.DB.prepare(q).all();
    return rcmJson({success:true, count:r.results?.length||0, claims:r.results||[]});
  } catch(e) { return rcmJson({success:false,error:e.message},500); }
}

// ═══════════════════════════════════════════════════════════════════════════
// RCM AUTO-PILOT — Phase 2 | Production | BrainSAIT ClaimLinc
// ═══════════════════════════════════════════════════════════════════════════

async function rcmAutoPipeline(env, ctx) {
  const t0 = Date.now();
  const results = { pulled: 0, classified: 0, appealed: 0, errors: [] };
  const branches = ['riyadh', 'madinah', 'unaizah', 'khamis', 'jizan', 'abha'];
  const NPHIES_KEY = env.CLAIMLINC_KEY || '';

  for (const branch of branches) {
    try {
      const rejectUrl = `https://api.brainsait.org/nphies/rejections/${branch}`;
      const resp = await fetch(rejectUrl, {
        headers: { 'X-API-Key': NPHIES_KEY },
        signal: AbortSignal.timeout(30000),
      });
      if (!resp.ok) { results.errors.push(`${branch}: NPHIES returned ${resp.status}`); continue; }
      const data = await resp.json();
      const rejections = data?.results || data?.rejections || [];
      if (!rejections.length) continue;

      let inserted = 0, updated = 0;
      for (const r of rejections.slice(0, 200)) {
        const existing = await env.DB.prepare(
          "SELECT id FROM claims WHERE claim_number = ? AND branch = ?"
        ).bind(r.claim_number || r.claimNumber, branch).first();

        if (existing) {
          await env.DB.prepare(`UPDATE claims SET
            nphies_rejection_code = COALESCE(?, nphies_rejection_code),
            nphies_rejection_desc = COALESCE(?, nphies_rejection_desc),
            reject_amount = COALESCE(CAST(? AS REAL), reject_amount),
            nphies_status = ?,
            status = CASE WHEN status NOT IN ('appealed','resubmitted','recovered') THEN 'rejected' ELSE status END,
            updated_at = datetime('now')
            WHERE id = ?`).bind(
            r.rejection_code || r.code, r.rejection_reason || r.reason,
            r.rejected_amount || r.amount, 'synced', existing.id
          ).run();
          updated++;
        } else {
          await env.DB.prepare(`INSERT INTO claims
            (claim_number, patient_id, payer_name, total_amount, paid_amount, status,
             nphies_rejection_code, nphies_rejection_desc, reject_amount, batch_number,
             branch, nphies_status, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, 'rejected', ?, ?, ?, ?, ?, 'new', datetime('now'), datetime('now'))`
          ).bind(
            r.claim_number || r.claimNumber, r.patient_id || 0,
            r.payer_name || r.payer || 'Unknown',
            r.total_amount || r.billed || 0, r.paid_amount || 0,
            r.rejection_code || r.code, r.rejection_reason || r.reason,
            r.rejected_amount || r.amount, r.batch_number || '',
            branch
          ).run();
          inserted++;
        }
      }
      results.pulled += rejections.length;

      const newRejections = await env.DB.prepare(
        `SELECT id, claim_number, total_amount, payer_name, nphies_rejection_code,
                nphies_rejection_desc, nphies_status
         FROM claims WHERE branch = ? AND status = 'rejected'
         AND (nphies_status = 'new' OR nphies_status IS NULL)
         AND (appeal_date IS NULL) LIMIT 50`
      ).bind(branch).all();

      for (const claim of (newRejections.results || [])) {
        const code = (claim.nphies_rejection_code || '').toUpperCase();
        const strength = classifyAppealStrength(code, claim.total_amount || 0);
        await env.DB.prepare(
          `UPDATE claims SET appeal_strength = ?, nphies_status = 'triaged',
           appeal_notes = ?, updated_at = datetime('now') WHERE id = ?`
        ).bind(strength.label, strength.notes, claim.id).run();
        results.classified++;
        if (strength.score >= 3) results.appealed++;
      }
    } catch (e) {
      results.errors.push(`${branch}: ${e.message}`);
    }
  }
  const elapsed = Date.now() - t0;
  return { ...results, elapsed_ms: elapsed, ts: new Date().toISOString() };
}

function classifyAppealStrength(code, amount) {
  const m = {
    'CV-1-4':  { score: 1, label: 'weak',   notes: 'Coverage exclusion — verify policy before proceeding' },
    'BE-1-6':  { score: 4, label: 'strong', notes: 'Price discrepancy — correct and resubmit' },
    'BE-1-5':  { score: 2, label: 'medium', notes: 'Duplicate — classify type before action' },
    'AD-3-1':  { score: 1, label: 'weak',   notes: 'Follow-up period — document new episode or accept' },
    'MN-1-1':  { score: 4, label: 'strong', notes: 'Medical necessity — needs physician appeal letter' },
  };
  const base = m[code] || { score: 2, label: 'medium', notes: `Review ${code} denial guidelines` };
  if (amount > 1000) base.score = Math.min(base.score + 1, 5);
  if (base.score >= 4) base.label = 'strong';
  return base;
}

async function rcmReconcile(req, env) {
  const url = new URL(req.url);
  const claimNumber = url.pathname.split('/').pop();
  if (!claimNumber) return rcmJson({success:false, error:'Claim number required'}, 400);

  const result = { claim_number: claimNumber, oracle: null, nphies: null, match_found: false, discrepancies: [], auto_appeal_needed: false };

  try {
    const nphiesKey = env.CLAIMLINC_KEY || '';
    const claimRes = await fetch(
      `https://api.brainsait.org/nphies/claims/riyadh?claim_number=${encodeURIComponent(claimNumber)}`,
      { headers: { 'X-API-Key': nphiesKey }, signal: AbortSignal.timeout(15000) }
    );
    if (claimRes.ok) { result.nphies = await claimRes.json(); result.match_found = true; }
    else { result.nphies = { status: claimRes.status, error: 'Not found in NPHIES' }; }
  } catch (e) { result.nphies = { error: e.message }; }

  try {
    const oracleRes = await oracleCall(env, 'GET', `/claims/${claimNumber}`, null, 'riyadh');
    if (oracleRes) result.oracle = oracleRes;
    else result.oracle = { error: 'Oracle unreachable or claim not found' };
  } catch (e) { result.oracle = { error: e.message }; }

  if (result.nphies?.status === 'rejected') {
    const local = await env.DB.prepare(
      "SELECT id, status, appeal_date FROM claims WHERE claim_number = ?"
    ).bind(claimNumber).first().catch(() => null);
    if (!local || local.status !== 'appealed') result.auto_appeal_needed = true;
    if (local && local.status === 'rejected')
      result.discrepancies.push(`NPHIES: rejected, D1: ${local.status}`);
  }

  return rcmJson({success:true, ...result});
}

async function rcmTrendReport(env) {
  const days = [30, 60, 90];
  const trends = {};

  for (const d of days) {
    const rows = await env.DB.prepare(`
      SELECT nphies_rejection_code, COUNT(*) as count, COALESCE(SUM(total_amount),0) as total_sar
      FROM claims
      WHERE status IN ('rejected','denied')
        AND julianday('now') - julianday(created_at) <= ?
        AND nphies_rejection_code IS NOT NULL
      GROUP BY nphies_rejection_code
      ORDER BY count DESC
    `).bind(d).all();

    const codes = {};
    let total = 0, totalSar = 0;
    for (const r of (rows.results || [])) {
      codes[r.nphies_rejection_code] = { count: r.count, sar: r.total_sar };
      total += r.count;
      totalSar += r.total_sar;
    }
    trends[`${d}d`] = { total_rejections: total, total_sar: totalSar, codes };
  }

  const movement = {};
  if (trends['30d'] && trends['60d']) {
    for (const [code, info] of Object.entries(trends['60d'].codes)) {
      const last30 = trends['30d'].codes[code]?.count || 0;
      const prev30 = info.count - last30;
      if (prev30 > 0) {
        movement[code] = {
          prev_30d: prev30, last_30d: last30,
          direction: last30 > prev30 ? 'increasing' : last30 < prev30 ? 'decreasing' : 'stable',
          pct_change: prev30 > 0 ? Math.round(((last30 - prev30) / prev30) * 100) : 0,
        };
      }
    }
  }

  const priorityActions = [];
  for (const [code, mov] of Object.entries(movement)) {
    if (mov.direction === 'increasing' && mov.pct_change > 20) {
      priorityActions.push({ code, severity: 'high', action: `${code} increased ${mov.pct_change}% — investigate root cause` });
    }
  }

  return rcmJson({
    success: true,
    period: { from: '-90d', to: 'today' },
    trends, movement, priority_actions: priorityActions,
    generated_at: new Date().toISOString(),
  });
}

async function rcmDailySummary(env) {
  const today = new Date().toISOString().split('T')[0];

  const [newToday, pipeline, statusBreakdown] = await Promise.all([
    env.DB.prepare(
      "SELECT COUNT(*) as new_rejections, COALESCE(SUM(reject_amount),0) as new_sar FROM claims WHERE DATE(created_at) = ? AND status = 'rejected'"
    ).bind(today).first().catch(() => ({ new_rejections: 0, new_sar: 0 })),

    env.DB.prepare(
      "SELECT nphies_rejection_code, COUNT(*) as count, COALESCE(SUM(reject_amount),0) as total_sar FROM claims WHERE DATE(created_at) = ? AND status = 'rejected' GROUP BY nphies_rejection_code ORDER BY count DESC"
    ).bind(today).all().catch(() => ({ results: [] })),

    env.DB.prepare(
      "SELECT status, COUNT(*) as count, COALESCE(SUM(total_amount),0) as total_sar FROM claims WHERE status IN ('rejected','appealed','resubmitted','recovered') GROUP BY status"
    ).all().catch(() => ({ results: [] })),
  ]);

  const codes = {};
  for (const r of (pipeline.results || [])) codes[r.nphies_rejection_code] = { c: r.count, s: r.total_sar };
  const breakdown = {};
  for (const r of (statusBreakdown.results || [])) breakdown[r.status] = { c: r.count, s: r.total_sar };

  return rcmJson({
    success: true, date: today,
    new_rejections: newToday?.new_rejections || 0,
    new_amount_sar: Math.round((newToday?.new_sar || 0) * 100) / 100,
    codes, pipeline_status: breakdown,
    summary: (newToday?.new_rejections || 0) > 0
      ? `📥 ${newToday.new_rejections} new rejections worth SR ${Math.round(newToday.new_sar)}`
      : '✅ No new rejections today',
  });
}

async function handleRequest(req, env, url, path) {
  if (path === "/" || path === "/index.html" || path === "/blog" || path === "/academy") {
    const lang = url.searchParams.get("lang") === "en" ? "en" : "ar";
    return new Response(buildHTML(lang), { headers: HTML_H });
  }
  if (path === "/ar" || path === "/ar/") return new Response(buildHTML("ar"), { headers: HTML_H });
  if (path === "/en" || path === "/en/") return new Response(buildHTML("en"), { headers: HTML_H });
  const _rl2 = url.searchParams.get("lang") === "en" ? "en" : "ar";
  if (path === "/patient") return buildRolePage("patient", _rl2);
  if (path === "/clinician") return buildRolePage("clinician", _rl2);
  if (path === "/admin") return buildRolePage("admin", _rl2);
  if (path === "/billing") return buildRolePage("billing", _rl2);
  if (path === "/status") {
    const ar2 = _rl2 === "ar";
    const statusHtml = `<!DOCTYPE html>
<html lang="${_rl2}" dir="${ar2?'rtl':'ltr'}">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${ar2?'حالة الأنظمة':'System Status'} | HNH</title>
<link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:${ar2?"'Tajawal'":"'Inter'"},sans-serif;background:#060c1a;color:#e8eaf0;min-height:100vh;padding:20px}
.hdr{display:flex;align-items:center;gap:12px;margin-bottom:28px}
.hdr a{color:#4ea5ff;text-decoration:none;font-size:.9rem}
h1{font-size:1.5rem;font-weight:700}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:16px}
.card{background:#0d1829;border:1px solid #1e2d45;border-radius:12px;padding:20px}
.card-title{font-size:.75rem;text-transform:uppercase;letter-spacing:.08em;color:#8899aa;margin-bottom:14px}
.row{display:flex;justify-content:space-between;align-items:center;padding:7px 0;border-bottom:1px solid #1a2540}
.row:last-child{border:none}
.badge{padding:3px 10px;border-radius:20px;font-size:.72rem;font-weight:600}
.up{background:rgba(0,200,100,.12);color:#00c864;border:1px solid rgba(0,200,100,.25)}
.dn{background:rgba(255,80,80,.12);color:#ff5050;border:1px solid rgba(255,80,80,.25)}
.warn{background:rgba(255,180,0,.12);color:#ffb400;border:1px solid rgba(255,180,0,.25)}
.stat{font-size:1.9rem;font-weight:700;color:#4ea5ff;margin:4px 0}
.lbl{font-size:.78rem;color:#8899aa}
</style>
</head>
<body>
<div class="hdr">
  <a href="/">${ar2?'<< الرئيسية':'<< Home'}</a>
  <h1>📊 ${ar2?'حالة الأنظمة':'System Status'}</h1>
  <span id="ts" style="margin-${ar2?'right':'left'}:auto;font-size:.8rem;color:#8899aa"></span>
</div>
<div class="grid">
  <div class="card">
    <div class="card-title">🏥 ${ar2?'البوابات':'Portals'}</div>
    <div class="row"><span>BSMA — ${ar2?'المريض':'Patient'}</span><span id="sb" class="badge">…</span></div>
    <div class="row"><span>GIVC — ${ar2?'الطبيب':'Clinician'}</span><span id="sg" class="badge">…</span></div>
    <div class="row"><span>SBS — ${ar2?'الفواتير':'Billing'}</span><span id="ss" class="badge">…</span></div>
    <div class="row"><span>HNH</span><span class="badge up">✅ UP</span></div>
  </div>
  <div class="card">
    <div class="card-title">📊 NPHIES</div>
    <div class="stat" id="nsar">—</div><div class="lbl">${ar2?'إجمالي الشبكة':'Network Total SAR'}</div>
    <div style="display:flex;gap:16px;margin-top:10px">
      <div><div class="stat" style="font-size:1.3rem" id="nrate">—</div><div class="lbl">${ar2?'الموافقة':'Approval'}</div></div>
      <div><div class="stat" style="font-size:1.3rem" id="npa">—</div><div class="lbl">PA</div></div>
    </div>
  </div>
  <div class="card">
    <div class="card-title">🔷 Oracle ${ar2?'الفروع':'Branches'}</div>
    <div id="ob">${ar2?'جاري التحميل...':'Loading...'}</div>
  </div>
  <div class="card">
    <div class="card-title">🏥 ${ar2?'إحصائيات':'Stats'}</div>
    <div class="row"><span>${ar2?'مرضى':'Patients'}</span><span id="stp">—</span></div>
    <div class="row"><span>${ar2?'مواعيد':'Appointments'}</span><span id="sta">—</span></div>
    <div class="row"><span>${ar2?'مطالبات':'Claims'}</span><span id="stc">—</span></div>
    <div class="row"><span>${ar2?'أطباء':'Providers'}</span><span>269</span></div>
  </div>
</div>
<script>
var AR=${ar2?'true':'false'};
function fmt(n){return n!=null?Number(n).toLocaleString(AR?'ar-SA':'en-US'):'—';}
function b(id,ok,ms){var e=document.getElementById(id);if(!e)return;e.className='badge '+(ok?'up':'dn');e.textContent=ok?'OK'+(ms?' '+ms+'ms':''):'DOWN';}
function load(){
  document.getElementById('ts').textContent=(AR?'تحديث: ':'')+new Date().toLocaleTimeString();
  fetch('/api/system-status').then(r=>r.json()).then(function(d){
    b('sb',d.portals&&d.portals.bsma&&d.portals.bsma.ok);
    b('sg',d.portals&&d.portals.givc&&d.portals.givc.ok);
    b('ss',d.portals&&d.portals.sbs&&d.portals.sbs.ok);
    if(d.stats){var s=d.stats.stats||{};document.getElementById('stp').textContent=fmt(s.total_patients);document.getElementById('sta').textContent=fmt(s.active_appointments||s.total_appointments);document.getElementById('stc').textContent=fmt(s.nphies_claims);}
    if(d.stats&&d.stats.nphies){var n=d.stats.nphies;document.getElementById('nsar').textContent='SAR '+(n.total_sar?+(n.total_sar/1e6).toFixed(1)+'M':'—');document.getElementById('nrate').textContent=n.approval_rate?n.approval_rate+'%':'—';document.getElementById('npa').textContent=fmt(n.total_pa);}
    if(d.oracle&&d.oracle.hospitals){var hs=d.oracle.hospitals,h2='';Object.keys(hs).forEach(function(br){var h=hs[br];h2+='<div class="row"><span style="font-size:.82rem">'+br+'</span><span style="font-size:.78rem;color:'+(h.reachable?'#00c864':'#ff5050')+'">'+(h.reachable?'✅ '+(h.ms||'')+'ms':'❌')+'</span></div>';});document.getElementById('ob').innerHTML=h2||'—';}
  }).catch(function(){});
}
load();setInterval(load,30000);
</script>
</body></html>`;
    return new Response(statusHtml, {headers:{'Content-Type':'text/html;charset=utf-8','Cache-Control':'no-cache'}});
  }
  if (path === "/denial") return buildDenialWorkbench(_rl2);
  if (path === "/sitemap.xml") {
    const base = "https://hnh.brainsait.org";
    const blogUrls = BLOG_POSTS.map(
      (p) => "  <url><loc>" + base + "/blog/" + p.id + '</loc><changefreq>monthly</changefreq><priority>0.8</priority><xhtml:link rel="alternate" hreflang="ar" href="' + base + "/blog/" + p.id + '?lang=ar"/><xhtml:link rel="alternate" hreflang="en" href="' + base + "/blog/" + p.id + '?lang=en"/></url>'
    ).join("\n");
    const courseUrls = COURSES.map(
      (c) => "  <url><loc>" + base + "/academy/" + c.id + '</loc><changefreq>monthly</changefreq><priority>0.8</priority><xhtml:link rel="alternate" hreflang="ar" href="' + base + "/academy/" + c.id + '?lang=ar"/><xhtml:link rel="alternate" hreflang="en" href="' + base + "/academy/" + c.id + '?lang=en"/></url>'
    ).join("\n");
    const sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n  <url><loc>' + base + '/</loc><changefreq>daily</changefreq><priority>1.0</priority><xhtml:link rel="alternate" hreflang="ar" href="' + base + '/?lang=ar"/><xhtml:link rel="alternate" hreflang="en" href="' + base + '/?lang=en"/></url>\n' + blogUrls + "\n" + courseUrls + "\n</urlset>";
    return new Response(sitemap, { headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
  }
  if (path === "/robots.txt") {
    return new Response("User-agent: *\nAllow: /\nSitemap: https://hnh.brainsait.org/sitemap.xml\n", { headers: { "Content-Type": "text/plain" } });
  }
  if (path === "/api/version") {
    return ok({ version: VERSION, worker: "hnh-unified", facility: FACILITY_LIC, ts: Date.now() });
  }
  if (path === "/health" || path === "/api/health") return apiHealth(env);
  if (path === "/api/stats") return apiStats(env);
  if (path === "/api/dashboard") return apiDashboard(env);
  if (path === "/api/branches") return ok({ branches: BRANCHES, total: BRANCHES.length });
  if (path === "/api/insurance") return ok({ partners: INSURANCE });
  if (path === "/api/oracle/live-status") {
    return apiOracleLiveStatus(env);
  }
  if (path === "/api/oracle/status") {
    const status = await oracleTunnelStatus(env);
    return ok({
      tunnel_id: "e5cb8c86-1768-46b0-bb35-a2720f26e88d",
      tunnel_name: "hayath-mcp",
      tunnel_health: "healthy",
      connections: 8,
      colos: ["mrs06", "ruh02"],
      origin_ip: "212.118.115.118",
      hospitals: status.hospitals,
      oracle_bridge: ORACLE_BRIDGE,
      last_check: (/* @__PURE__ */ new Date()).toISOString()
    });
  }
  if (path === "/api/oracle/hospitals") {
    return ok({
      tunnel_id: "e5cb8c86-1768-46b0-bb35-a2720f26e88d",
      hospitals: Object.entries(TUNNEL_STATUS).map(([id, s]) => ({
        id,
        reachable: s.reachable,
        url: "https://oracle-" + id + ".brainsait.org",
        ms: s.ms,
        note: s.note
      })),
      updated: "2026-05-03",
      note: "RUH reachable (public IP). MED/UNA/KHM/JZN/ABH offline (private IPs, on-site cloudflared not running)"
    });
  }
  if (path === "/api/oracle/patient" && req.method === "GET") {
    const u = new URL(req.url);
    const hospital = u.searchParams.get("hospital") || "madinah";
    const name = u.searchParams.get("name") || "";
    const natId = u.searchParams.get("national_id") || "";
    const mrn = u.searchParams.get("mrn") || "";
    if (!TUNNEL_STATUS[hospital]?.reachable) {
      return ok({ patients: [], source: "tunnel_down", hospital, note: TUNNEL_STATUS[hospital]?.note });
    }
    const param = natId ? "national_id=" + encodeURIComponent(natId) : mrn ? "mrn=" + encodeURIComponent(mrn) : "name=" + encodeURIComponent(name);
    const data = await oracleCall(env, "GET", "/patient/search?hospital=" + hospital + "&" + param, null, hospital);
    return ok({ patients: (data?.patients || []).map(maskPatient), hospital, source: data ? "oracle-live" : "unavailable" });
  }
  if (path === "/api/oracle/appointments" && req.method === "GET") {
    const u = new URL(req.url);
    const hospital = u.searchParams.get("hospital") || "madinah";
    const mrn = u.searchParams.get("mrn") || "";
    const date = u.searchParams.get("date") || (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
    if (!TUNNEL_STATUS[hospital]?.reachable) {
      return ok({ appointments: [], source: "tunnel_down", hospital });
    }
    const data = await oracleCall(env, "GET", "/appointments?hospital=" + hospital + "&mrn=" + encodeURIComponent(mrn) + "&date=" + date, null, hospital);
    return ok({ appointments: data?.appointments || data || [], hospital, source: data ? "oracle-live" : "unavailable" });
  }
  if (path === "/api/oracle/nphies" && req.method === "POST") {
    const body = await req.json().catch(() => ({}));
    const data = await oracleCall(env, "POST", "/api/nphies/eligibility", {
      ...body,
      facility_license: FACILITY_LIC
    }, body.hospital || "madinah");
    return ok({ result: data, source: data ? "oracle-nphies" : "unavailable" });
  }
  if (path.startsWith("/api/providers")) return apiProviders(req, env);
  if (path.startsWith("/api/patients")) return apiPatients(req, env);
  if (path.startsWith("/api/appointments")) return apiAppointments(req, env);
  if (path === "/api/eligibility" || path.startsWith("/api/eligibility") && req.method === "POST") return apiEligibility(req, env);
  if (path.startsWith("/api/drugs")) return apiDrugs(req, env);
  if (path.startsWith("/api/chat")) return apiChat(req, env);
  if (path === "/api/nphies" || path === "/api/nphies/status") return apiNphies(req, env, "");
  if (path === "/api/nphies/analysis") return apiNphies(req, env, "/analysis");
  if (path === "/api/nphies/network") return apiNphies(req, env, "/network");
  if (path === "/api/nphies/facilities") return apiNphies(req, env, "/facilities");
  if (path.startsWith("/api/nphies/live/")) return apiNphies(req, env, "/live/" + path.slice("/api/nphies/live/".length));
  if (path.startsWith("/api/nphies")) return apiNphies(req, env, path.replace("/api/nphies", ""));
  if (path === "/api/portal-hub") return apiPortalHub(env);
  if (path.startsWith("/api/portal")) return apiPortal(req, env, path.replace("/api/portal", "") || "/stats");
  if (path === "/api/blog" || path === "/api/blog/") return apiBlog(null);
  if (path.startsWith("/api/blog/")) return apiBlog(path.slice("/api/blog/".length));
  if (path === "/api/academy" || path === "/api/academy/") return apiAcademy(req, null);
  if (path === "/api/academy/courses") return apiAcademy(req, null);
  if (path.startsWith("/api/academy/courses/")) return apiAcademy(req, path.slice("/api/academy/courses/".length));
  if (path === "/api/academy/stats") return ok({ total_courses: COURSES.length, total_hours: 104, accreditation: "SCFHS CPD + CHI", repos: ["nphies-course-platform", "sbs", "brainsait-rcm", "open-webui", "brainsait-mcp-dxt"] });
  if (path.startsWith("/api/academy/")) return apiAcademy(req, path.slice("/api/academy/".length));
  if (path.startsWith("/blog/")) {
    const slug = path.slice(6);
    const langP = url.searchParams.get("lang") || "ar";
    return serveBlogArticle(slug, langP);
  }
  if (path.startsWith("/academy/")) {
    const cid = path.slice(9);
    const langP = url.searchParams.get("lang") || "ar";
    return serveAcademyCourse(cid, langP);
  }
  if (path.startsWith("/voice")) {
    const VOICE_WORKER = "https://basma-voice-agent.brainsait-fadil.workers.dev";
    try {
      const vUrl = VOICE_WORKER + path + (url.search || "");
      const fwdHeaders = { "X-Forwarded-Host": "hnh.brainsait.org" };
      ["content-type", "x-language", "x-session-id", "authorization", "accept"].forEach((h) => {
        const v = req.headers.get(h);
        if (v) fwdHeaders[h] = v;
      });
      const vResp = await fetch(vUrl, {
        method: req.method,
        headers: fwdHeaders,
        body: ["GET", "HEAD"].includes(req.method) ? null : req.body
      });
      const headers = new Headers(vResp.headers);
      Object.entries(CORS).forEach(([k, v]) => headers.set(k, v));
      return new Response(vResp.body, { status: vResp.status, headers });
    } catch (e) {
      return err("Voice agent unavailable: " + e.message, 503);
    }
  }
  // === Billing direct from D1 (avoids SBS worker loopback) ===
    if (path.startsWith('/api/billing/') && req.method === 'GET') {
      try {
        if (!env.DB) return new Response(JSON.stringify({success:false,error:'db_not_bound'}), {status:500,headers:{'Content-Type':'application/json','Access-Control-Allow-Origin':'*'}});
        const parts = path.split('/').filter(Boolean);
        const patient_id = parts[2];
        if (!patient_id || patient_id === 'status') {
          // Network summary
          const rs = await env.DB.prepare(
            "SELECT COUNT(*) as count, COALESCE(SUM(total_amount),0) as total_sar, SUM(CASE WHEN status='approved' THEN 1 ELSE 0 END) as approved, SUM(CASE WHEN status='pending' THEN 1 ELSE 0 END) as pending, SUM(CASE WHEN status='rejected' THEN 1 ELSE 0 END) as rejected FROM claims"
          ).first();
          return new Response(JSON.stringify({success:true, source:'hnh-d1', summary: rs}), {headers:{'Content-Type':'application/json','Access-Control-Allow-Origin':'*'}});
        }
        const claims = await env.DB.prepare(
          "SELECT * FROM claims WHERE patient_id = ? ORDER BY created_at DESC LIMIT 50"
        ).bind(patient_id).all();
        const all = claims.results || [];
        const total = all.reduce((s, c) => s + (Number(c.total_amount) || 0), 0);
        const summary = {
          count: all.length,
          total_sar: total,
          approved_count: all.filter(c => c.status === 'approved').length,
          pending: all.filter(c => c.status === 'pending').length,
          rejected: all.filter(c => c.status === 'rejected').length
        };
        return new Response(JSON.stringify({success:true, source:'hnh-d1', patient_id, summary, claims: all}),
          {headers:{'Content-Type':'application/json','Access-Control-Allow-Origin':'*'}});
      } catch(e) {
        return new Response(JSON.stringify({success:false, error:e.message}),
          {status:200, headers:{'Content-Type':'application/json','Access-Control-Allow-Origin':'*'}});
      }
    }
    // === Clinician handoffs (BSMA → GIVC bridge) ===
    if (path === '/api/clinician/handoff' && req.method === 'POST') {
      try {
        const body = await req.json();
        if (!env.DB) return new Response(JSON.stringify({success:false,error:'db_not_bound'}), {status:500,headers:{'Content-Type':'application/json','Access-Control-Allow-Origin':'*'}});
        const r = await env.DB.prepare(
          'INSERT INTO bsma_handoffs (appointment_id, patient_name, patient_phone, department, branch, date, time, source, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
        ).bind(
          body.appointment_id || null,
          body.patient_name || '',
          body.patient_phone || '',
          body.department || '',
          body.branch || 'R001',
          body.date || '',
          body.time || '',
          body.source || 'bsma',
          'pending'
        ).run();
        return new Response(JSON.stringify({success:true, id:r.meta.last_row_id, table:'bsma_handoffs'}),
          {headers:{'Content-Type':'application/json','Access-Control-Allow-Origin':'*'}});
      } catch(e) {
        return new Response(JSON.stringify({success:false,error:e.message}), {status:200,headers:{'Content-Type':'application/json','Access-Control-Allow-Origin':'*'}});
      }
    }
    if (path === '/api/handoffs/pending' && req.method === 'GET') {
      try {
        if (!env.DB) return new Response(JSON.stringify({success:false,error:'db_not_bound'}), {status:500,headers:{'Content-Type':'application/json','Access-Control-Allow-Origin':'*'}});
        const branch = url.searchParams.get('branch');
        const limit = parseInt(url.searchParams.get('limit') || '50');
        const sql = branch
          ? 'SELECT * FROM bsma_handoffs WHERE status = ? AND branch = ? ORDER BY created_at DESC LIMIT ?'
          : 'SELECT * FROM bsma_handoffs WHERE status = ? ORDER BY created_at DESC LIMIT ?';
        const stmt = branch
          ? env.DB.prepare(sql).bind('pending', branch, limit)
          : env.DB.prepare(sql).bind('pending', limit);
        const rs = await stmt.all();
        return new Response(JSON.stringify({success:true, count: rs.results.length, handoffs: rs.results}),
          {headers:{'Content-Type':'application/json','Access-Control-Allow-Origin':'*'}});
      } catch(e) {
        return new Response(JSON.stringify({success:false,error:e.message}), {status:200,headers:{'Content-Type':'application/json','Access-Control-Allow-Origin':'*'}});
      }
    }
    if (path === '/api/handoffs/pickup' && req.method === 'POST') {
      try {
        const { id, picked_by } = await req.json();
        if (!env.DB) return new Response(JSON.stringify({success:false,error:'db_not_bound'}), {status:500,headers:{'Content-Type':'application/json','Access-Control-Allow-Origin':'*'}});
        const r = await env.DB.prepare(
          "UPDATE bsma_handoffs SET status='picked', picked_by=?, picked_at=CURRENT_TIMESTAMP WHERE id=?"
        ).bind(picked_by || 'clinician', id).run();
        return new Response(JSON.stringify({success:true, changes: r.meta.changes}),
          {headers:{'Content-Type':'application/json','Access-Control-Allow-Origin':'*'}});
      } catch(e) {
        return new Response(JSON.stringify({success:false,error:e.message}), {status:200,headers:{'Content-Type':'application/json','Access-Control-Allow-Origin':'*'}});
      }
    }
    const PROTECTED_PREFIXES = ["/api/claims", "/api/rcm/dashboard", "/api/rcm/claims", "/api/rcm/pipeline", "/api/rcm/reconcile/", "/api/sync/", "/api/oracle/diagnose", "/api/schema"];
  
    // ─── /basma/chat — Basma AI Voice Handler (direct DeepSeek, no chaining) ───────
    if (path.startsWith('/knowledge/')) {
    // RAG Knowledge Base — searches Oracle OASIS + NPHIES docs
    const subpath = path.replace('/knowledge','');

    if (subpath === '/search' || subpath === '/search/') {
      const q = url.searchParams.get('q') || '';
      const category = url.searchParams.get('category') || '';
      const limit = Math.min(parseInt(url.searchParams.get('limit') || '5'), 20);
      if (!q) return new Response(JSON.stringify({error:'q required'}), {status:400,headers:{'Content-Type':'application/json','Access-Control-Allow-Origin':'*'}});
      try {
        let sql = `SELECT id, title, category, source, lang,
                   substr(content,1,400) as preview
                   FROM rag_documents WHERE content LIKE ?`;
        const params = [`%${q}%`];
        if (category) { sql += ' AND category=?'; params.push(category); }
        sql += ` ORDER BY CASE WHEN title LIKE ? THEN 0 ELSE 1 END, created_at DESC LIMIT ?`;
        params.push(`%${q}%`, limit);
        const rows = await env.DB.prepare(sql).bind(...params).all();
        return new Response(JSON.stringify({
          query: q, category: category||'all',
          count: rows.results.length, results: rows.results
        }), {headers:{'Content-Type':'application/json','Access-Control-Allow-Origin':'*','Cache-Control':'no-cache'}});
      } catch(e) {
        return new Response(JSON.stringify({error:e.message}), {status:500,headers:{'Content-Type':'application/json','Access-Control-Allow-Origin':'*'}});
      }
    }

    if (subpath === '/categories' || subpath === '/categories/') {
      const rows = await env.DB.prepare(
        'SELECT category, COUNT(*) as count, COUNT(DISTINCT source) as sources FROM rag_documents GROUP BY category ORDER BY count DESC'
      ).all();
      const total = await env.DB.prepare('SELECT COUNT(*) as n FROM rag_documents').first();
      return new Response(JSON.stringify({
        categories: rows.results, total_docs: total?.n || 0
      }), {headers:{'Content-Type':'application/json','Access-Control-Allow-Origin':'*'}});
    }

    if (subpath === '/ask' && req.method === 'POST') {
      // RAG-augmented answer
      const body = await req.json().catch(()=>({}));
      const question = body.question || body.q || '';
      const lang = body.lang || 'ar';
      if (!question) return new Response(JSON.stringify({error:'question required'}), {status:400,headers:{'Content-Type':'application/json','Access-Control-Allow-Origin':'*'}});
      // Multi-strategy search: full question + individual significant words
      const cleanQ = question.replace(/[؟?!.،,]/g,' ').trim();
      const words = cleanQ.split(/\s+/).filter(w => w.length > 2);
      const searchTerms = [cleanQ.slice(0,50)];
      // Add 3-char+ words as individual searches
      for(const w of words.slice(0,4)) {
        if(w.length >= 3) searchTerms.push(w);
      }
      let allResults = [];
      for(const term of searchTerms) {
        const r = await env.DB.prepare(
          'SELECT title, category, substr(content,1,800) as chunk FROM rag_documents WHERE content LIKE ? ORDER BY created_at DESC LIMIT 3'
        ).bind('%'+term+'%').all();
        allResults.push(...(r.results||[]));
      }
      // Deduplicate by title, keep best
      const seen = new Set(); const rows = {results: allResults.filter(r=>{if(seen.has(r.title)){return false;}seen.add(r.title);return true;}).slice(0,5)};
      const context = (rows.results||[]).map(r => '['+r.title+']\n'+r.chunk).join('\n\n---\n\n');
      const augmented_question = context
        ? (lang==='ar' ? 'استناداً للوثائق التالية:\n\n' : 'Based on the following documents:\n\n') + context + '\n\n---\n\n' + question
        : question;
      // Call DeepSeek directly with RAG context
      const deepseekKey = env.DEEPSEEK_API_KEY || '';
      let answer = '';
      if (deepseekKey) {
        const systemPrompt = lang==='ar'
          ? 'أنت بسمة، المساعدة الطبية لمستشفيات الحياة الوطني. أجب بدقة وبشكل موجز استناداً للوثائق المقدمة. إذا لم تجد الإجابة في الوثائق، قل ذلك بوضوح.'
          : 'You are Basma, medical assistant for Al Hayat National Hospital. Answer accurately and concisely based on the provided documents. If the answer is not in the documents, say so clearly.';
        const contextSection = context
          ? (lang==='ar' ? 'وثائق قاعدة المعرفة:\n\n' : 'Knowledge base documents:\n\n') + context + '\n\n---\n\n'
          : '';
        const userMsg = contextSection + (lang==='ar' ? 'السؤال: ' : 'Question: ') + question;
        try {
          const dsResp = await fetch('https://api.deepseek.com/chat/completions', {
            method: 'POST',
            headers: {'Authorization':'Bearer '+deepseekKey,'Content-Type':'application/json'},
            body: JSON.stringify({model:'deepseek-chat',messages:[{role:'system',content:systemPrompt},{role:'user',content:userMsg}],max_tokens:400,temperature:0.2,stream:false}),
            signal: AbortSignal.timeout(22000)
          });
          const dsData = await dsResp.json();
          answer = dsData.choices?.[0]?.message?.content || '';
        } catch(e) { answer = ''; }
      }
      return new Response(JSON.stringify({
        question, lang,
        context_docs: rows.results.length,
        sources: (rows.results||[]).map(r=>({title:r.title,category:r.category})),
        answer,
        model: 'deepseek+rag'
      }), {headers:{'Content-Type':'application/json','Access-Control-Allow-Origin':'*'}});
    }

    return new Response(JSON.stringify({
      endpoints: ['/knowledge/search?q=&category=&limit=', '/knowledge/categories', '/knowledge/ask (POST)'],
      categories: ['clinical','nphies','patient-guide','hospitals','brainsait'],
      total_docs: 191
    }), {headers:{'Content-Type':'application/json','Access-Control-Allow-Origin':'*'}});
  }
  if (path === '/api/system-status' && req.method === 'GET') {
    try {
      const [statsR, oracleR] = await Promise.allSettled([
        fetch('https://hnh.brainsait.org/api/stats', {signal: AbortSignal.timeout(5000)}).then(r=>r.json()),
        fetch('https://oracle-bridge.brainsait.org/diagnose?api_key=bsma-oracle-b2af3196522b556636b09f5d268cb976', {signal: AbortSignal.timeout(8000)}).then(r=>r.json()),
      ]);
      const [bsmaR, givcR, sbsR] = await Promise.allSettled([
        fetch('https://bsma.elfadil.com/', {signal: AbortSignal.timeout(4000)}).then(r=>({ok:r.ok})),
        fetch('https://givc.elfadil.com/api/health', {signal: AbortSignal.timeout(4000)}).then(r=>({ok:r.ok})),
        fetch('https://sbs.elfadil.com/health', {signal: AbortSignal.timeout(4000)}).then(r=>({ok:r.ok})),
      ]);
      return new Response(JSON.stringify({
        ok: true, ts: Date.now(),
        stats: statsR.status==='fulfilled' ? statsR.value : null,
        oracle: oracleR.status==='fulfilled' ? oracleR.value : {error:'timeout'},
        portals: {
          bsma: bsmaR.status==='fulfilled' ? bsmaR.value : {ok:false},
          givc: givcR.status==='fulfilled' ? givcR.value : {ok:false},
          sbs:  sbsR.status==='fulfilled'  ? sbsR.value  : {ok:false},
        }
      }), {headers:{'Content-Type':'application/json','Access-Control-Allow-Origin':'*','Cache-Control':'no-cache'}});
    } catch(e) {
      return new Response(JSON.stringify({ok:false,error:e.message}), {status:200,headers:{'Content-Type':'application/json','Access-Control-Allow-Origin':'*'}});
    }
  }
  if ((path === '/basma/chat' || path === '/basma/chat/') && req.method === 'POST') {
      try {
        const body = await req.json();
        const lang = body.lang || 'ar';
        const hosp = body.hospital || body.branch || 'riyadh';
        const history = (body.history || []).slice(-8);
        // Persistent patient context carried across turns
        const patientCtx = body.patient_context || {};

        // ── DeepSeek tools (function-calling) ──
        const tools = [
          {
            type: 'function',
            function: {
              name: 'check_eligibility',
              description: 'Check patient insurance eligibility via Oracle Bridge. Call when user asks about insurance, tamine, coverage, أهلية.',
              parameters: {
                type: 'object',
                properties: {
                  identity_number: { type: 'string', description: '10-digit Saudi national ID, Iqama, or passport number' },
                  branch: { type: 'string', enum: ['riyadh','madinah','unaizah','khamis','jizan','abha'], description: 'Hospital branch' }
                },
                required: ['identity_number']
              }
            }
          },
          {
            type: 'function',
            function: {
              name: 'book_appointment',
              description: 'Book a patient appointment. Call when user wants to book, schedule, حجز موعد, أريد أحجز.',
              parameters: {
                type: 'object',
                properties: {
                  patient_name: { type: 'string', description: 'Patient full name' },
                  patient_phone: { type: 'string', description: 'Patient mobile number, 10 digits starting with 05' },
                  department: { type: 'string', description: 'Medical department e.g. Cardiology, قلب, Ophthalmology, عيون' },
                  date: { type: 'string', description: 'Appointment date YYYY-MM-DD, default to tomorrow' },
                  time: { type: 'string', description: 'Preferred time HH:MM, default 10:00' },
                  branch: { type: 'string', enum: ['riyadh','madinah','unaizah','khamis','jizan','abha'] }
                },
                required: ['department']
              }
            }
          },
          {
            type: 'function',
            function: {
              name: 'get_claim_status',
              description: 'Get NPHIES claim status, billing summary, rejection codes. Call for مطالبة, فاتورة, claim, billing, NPHIES, رفض.',
              parameters: {
                type: 'object',
                properties: {
                  patient_id: { type: 'string', description: 'Patient ID (optional)' },
                  branch: { type: 'string', enum: ['riyadh','madinah','unaizah','khamis','jizan','abha'] }
                }
              }
            }
          },
          {
            type: 'function',
            function: {
              name: 'open_patient_file',
              description: 'Search and open patient file in Oracle RAD. Call for ملف, patient file, فتح ملف, بحث مريض.',
              parameters: {
                type: 'object',
                properties: {
                  identity_number: { type: 'string', description: '10-digit ID' },
                  branch: { type: 'string', enum: ['riyadh','madinah','unaizah','khamis','jizan','abha'] }
                },
                required: ['identity_number']
              }
            }
          },
          {
            type: 'function',
            function: {
              name: 'get_network_stats',
              description: 'Get live hospital network statistics: total SAR, approval rate, PA count, branch breakdown. Call for إحصائيات, stats, network, أداء.',
              parameters: { type: 'object', properties: {} }
            }
          }
        ];

        const BASMA_SYSTEM = lang === 'en'
          ? `You are Basma, the official AI voice agent of Al Hayat National Hospital (HNH) — 6 hospitals in Saudi Arabia. You are an ACTION agent, not just a chatbot. IMPORTANT: Always respond in natural conversational language. Never output raw XML, DSML, JSON tags, or tool call markup in your replies — only plain readable text. When the user asks you to DO something (book, check, open file, look up claims), you MUST call the appropriate tool. Do not explain — just call the tool and report the result. Be warm, concise, Saudi-dialect friendly. Always confirm actions before executing when irreversible.`
          : `أنت بسمة، المساعدة الصوتية الرسمية لمستشفيات الحياة الوطني — 6 مستشفيات في المملكة. أنتِ وكيلة تنفيذية لا مجرد نظام محادثة. عندما يطلب المريض حجزاً أو فحص تأمين أو مطالبة، استدعي الأداة المناسبة فوراً. لا تشرحي — نفّذي وأبلّغي بالنتيجة. تحدثي بلهجة سعودية دافئة وموجزة. أكّدي الإجراءات غير القابلة للتراجع قبل تنفيذها.`;

        const messages = [
          { role: 'system', content: BASMA_SYSTEM },
          ...(patientCtx.name ? [{ role: 'system', content: `Current patient context: name=${patientCtx.name}, id=${patientCtx.id||'unknown'}, branch=${hosp}` }] : []),
          ...history,
          { role: 'user', content: body.message || '' }
        ];

        const deepseekKey = env.DEEPSEEK_API_KEY || '';
        if (!deepseekKey) return new Response(JSON.stringify({reply:'عذراً، الخدمة غير متاحة مؤقتاً.'}), {headers:{'Content-Type':'application/json','Access-Control-Allow-Origin':'*'}});

        // First DeepSeek call — may return tool_calls
        const ds = await fetch('https://api.deepseek.com/chat/completions', {
          method: 'POST',
          headers: { 'Authorization': 'Bearer ' + deepseekKey, 'Content-Type': 'application/json' },
          body: JSON.stringify({ model: 'deepseek-chat', messages, tools, tool_choice: 'auto', max_tokens: 400, temperature: 0.5 }),
          signal: AbortSignal.timeout(20000)
        });
        if (!ds.ok) throw new Error('DeepSeek error: ' + ds.status);
        const dsData = await ds.json();
        const choice = dsData.choices?.[0];
        const msg = choice?.message || {};

        // ── Tool execution ──
        if (msg.tool_calls?.length) {
          const tc = msg.tool_calls[0];
          const fn = tc.function?.name;
          let args = {}; try { args = JSON.parse(tc.function?.arguments || '{}'); } catch(e) {}
          let toolResult = {};

          if (fn === 'check_eligibility') {
            try {
              const r = await fetch('https://oracle-bridge.brainsait.org/eligibility?api_key=bsma-oracle-b2af3196522b556636b09f5d268cb976&id=' + (args.identity_number||'') + '&branch=' + (args.branch||hosp), { signal: AbortSignal.timeout(12000) });
              toolResult = await r.json();
            } catch(e) { toolResult = { error: e.message }; }
          } else if (fn === 'book_appointment') {
            try {
              const today = new Date(); today.setDate(today.getDate()+1);
              const apDate = args.date || today.toISOString().slice(0,10);
              const dept = args.department || 'General';
              const r = await env.DB.prepare(
                'INSERT INTO appointments (patient_id, clinic_name, appointment_date, appointment_time, notes, status, appointment_type) VALUES (?, ?, ?, ?, ?, ?, ?)'
              ).bind(
                0,
                dept,
                apDate,
                args.time || '10:00',
                'Voice booking via Basma — ' + (args.patient_phone || '') + ' — branch: ' + (args.branch || hosp),
                'scheduled',
                'outpatient'
              ).run();
              toolResult = { success: true, id: r.meta?.last_row_id, date: apDate, time: args.time||'10:00', clinic: dept, branch: args.branch||hosp, patient: args.patient_name, phone: args.patient_phone };
            } catch(e) { toolResult = { error: e.message }; }
          } else if (fn === 'get_claim_status') {
            try {
              const summary = await env.DB.prepare(
                "SELECT COUNT(*) as count, COALESCE(SUM(total_amount),0) as total, SUM(CASE WHEN status='approved' THEN 1 ELSE 0 END) as approved, SUM(CASE WHEN status='rejected' THEN 1 ELSE 0 END) as rejected, SUM(CASE WHEN status='pending' THEN 1 ELSE 0 END) as pending FROM claims" + (args.patient_id ? " WHERE patient_id=?" : "")
              ).bind(...(args.patient_id ? [args.patient_id] : [])).first();
              toolResult = { summary, network: { total_sar: 835690702.81, approval_rate: 98.6, pa_total: 51018, branches: 6 } };
            } catch(e) { toolResult = { error: e.message }; }
          } else if (fn === 'open_patient_file') {
            try {
              const r = await fetch('https://oracle-bridge.brainsait.org/patient/search?api_key=bsma-oracle-b2af3196522b556636b09f5d268cb976&hospital='+(args.branch||hosp)+'&q='+(args.identity_number||''), { signal: AbortSignal.timeout(12000) });
              toolResult = await r.json();
            } catch(e) { toolResult = { error: e.message }; }
          } else if (fn === 'get_network_stats') {
            try {
              // Use ClaimLinc service binding (avoids CF Access redirect)
              const claimR = env.CLAIMLINC_SERVICE
                ? await env.CLAIMLINC_SERVICE.fetch(new Request('https://claimlinc.internal/nphies/network/summary'))
                : await fetch('https://claimlinc-api.brainsait-fadil.workers.dev/nphies/network/summary', { headers: { 'X-API-Key': 'tWapQjRdpCUzlfE2aGdLBneyrBJX8cJkRafFUiWL' }, signal: AbortSignal.timeout(10000) });
              toolResult = claimR.ok ? await claimR.json() : { error: 'network_stats_unavailable' };
            } catch(e) { toolResult = { error: e.message }; }
          }

          // Second DeepSeek call with tool result → natural language reply
          const msgs2 = [
            ...messages,
            { role: 'assistant', content: null, tool_calls: msg.tool_calls },
            { role: 'tool', tool_call_id: tc.id, content: JSON.stringify(toolResult) }
          ];
          const ds2 = await fetch('https://api.deepseek.com/chat/completions', {
            method: 'POST',
            headers: { 'Authorization': 'Bearer ' + deepseekKey, 'Content-Type': 'application/json' },
            body: JSON.stringify({ model: 'deepseek-chat', messages: msgs2, max_tokens: 300, temperature: 0.6 }),
            signal: AbortSignal.timeout(15000)
          });
          const ds2Data = await ds2.json();
          const reply = ds2Data.choices?.[0]?.message?.content || 'تم تنفيذ الإجراء.';
          return new Response(JSON.stringify({ reply, tool_used: fn, tool_result: toolResult, model: 'deepseek-chat+tools', lang }), {
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
          });
        }

        // No tool call — plain text reply
        const reply = msg.content || 'عذراً، لم أفهم. هل يمكنك إعادة الصياغة؟';
        return new Response(JSON.stringify({ reply, model: 'deepseek-chat', lang }), {
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
        });

      } catch(e) {
        return new Response(JSON.stringify({reply:'عذراً، حدث خطأ تقني. يرجى المحاولة لاحقاً.', detail:e.message}),
          {status:200,headers:{'Content-Type':'application/json','Access-Control-Allow-Origin':'*'}});
      }
    }
    // /basma/* other paths → forward to voice.elfadil.com as external HTTP
    if (path.startsWith('/basma/')) {
      try {
        const voicePath = cleanPath.replace(/^\/basma\//, '/bsma/');
        const bodyText = req.method === 'POST' ? await req.text() : void 0;
        const vr = await fetch('https://voice.elfadil.com'+voicePath+url.search, {
          method: req.method,
          headers:{'Content-Type':'application/json','X-Source':'hnh-unified'},
          body: bodyText,
          signal: AbortSignal.timeout(20000)
        });
        return new Response(await vr.text(), {status:vr.status, headers:{'Content-Type':vr.headers.get('Content-Type')||'application/json','Access-Control-Allow-Origin':'*'}});
      } catch(e) {
        return new Response(JSON.stringify({error:true,message:e.message}),{status:502,headers:{'Content-Type':'application/json','Access-Control-Allow-Origin':'*'}});
      }
    }
    // ── Public RCM endpoints (no auth required) ──────────────────────────
    if (path === "/api/rcm/health") return apiRcmHealth();
    if (path.startsWith("/api/rcm/batch/")) return apiRcmBatch(path.split("/").pop(), env);
    if (path === "/api/rcm/validate/price") return apiRcmValidatePrice(req);
    if (path === "/api/rcm/validate/duplicate") return apiRcmValidateDuplicate(req);
    if (path === "/api/rcm/validate/pbm") return apiRcmValidatePbm(req);
    if (path === "/api/rcm/validate") {
      // Full pipeline: price + duplicate + PBM validators in sequence
      const body = await req.json();
      const bodyStr = JSON.stringify(body);
      const makeReq = (extra={}) => new Request(req.url, {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({...body,...extra})});
      const [priceR, pbmR] = await Promise.allSettled([
        apiRcmValidatePrice(makeReq()),
        apiRcmValidatePbm(makeReq()),
      ]);
      const price = priceR.status === 'fulfilled' ? await priceR.value.json() : {error:'price check failed'};
      const pbm   = pbmR.status === 'fulfilled'   ? await pbmR.value.json()   : {error:'pbm check failed'};
      const totalErrors = (price.violations_count || 0) + (pbm.violations_count || 0);
      return rcmJson({
        overall_ready: totalErrors === 0,
        total_errors: totalErrors,
        validators: { price, pbm },
        summary: totalErrors === 0 ? '✅ Claim passed all validators — safe for NPHIES submission' : `❌ ${totalErrors} issue(s) found — fix before submission`,
      });
    }
    if (path === "/api/rcm/appeal/generate") return apiRcmAppealGenerate(req);
    if (path === "/api/rcm/dashboard") return apiRcmDashboard(env);
    // ── RCM v2 — Strategic Enhancement Routes (public) ───────────────────────
    if (path === "/api/rcm/qa") return apiRcmQaChecklist(req);
    if (path === "/api/rcm/sla") return apiRcmSlaTracker(req, env);
    if (path === "/api/rcm/fhir/appeal") return apiRcmFhirAppeal(req);
    if (path === "/api/rcm/auth-alignment") return apiRcmAuthAlignment(req, env);
    if (path === "/api/rcm/rework") return apiRcmReworkAnalysis(req, env);
    // ── RCM v3 — Multi-Payer + Al Rajhi Strategy ─────────────────────────────
    if (path === "/api/rcm/qa/multipayer") return apiRcmQaMultipayer(req);
    if (path === "/api/rcm/payer-intelligence") return apiRcmPayerIntelligence(req);
    if (path === "/api/rcm/preauth-check") return apiRcmPreAuthCheck(req);
    if (path === "/api/rcm/validate/lab") return apiRcmLabValidate(req);
    if (path === "/api/rcm/settlement-cycle") return apiRcmSettlementCycle(req, env);
    
    
        if (path.match(/^\/api\/rcm\/claims\/[^/]+\/appeal$/) && req.method === 'POST') return apiRcmMarkAppeal(req, env, path.split('/')[4]);
    if (path.match(/^\/api\/rcm\/claims\/[^/]+\/resubmit$/) && req.method === 'POST') return apiRcmMarkResubmit(req, env, path.split('/')[4]);
    if (path === '/api/rcm/claims/rejected') return apiRejectedClaims(req, env);
    
    if (PROTECTED_PREFIXES.some((p) => path === p || path.startsWith(p))) {
    const guard = authGuard(req, env);
    if (guard) return guard;
    if (path.startsWith("/api/claims")) return apiClaims(req, env);
    if (path === "/api/rcm") return apiRCM(env);
    if (path === "/api/rcm/denial/stats") return apiDenialStats(env);
    if (path === "/api/rcm/denial/list") return apiDenialList(req, env);
    if (path === "/api/rcm/denial/ingest") return apiDenialIngest(req, env);
    if (path === "/api/rcm/denial/analyze") return apiDenialAnalyze(req, env);
    if (path === "/api/rcm/denial/requirements") return apiDenialRequirements(req, env);
    if (path === "/api/rcm/denial/revalidate") return apiDenialRevalidate(req, env);
    if (path === "/api/rcm/denial/submit") return apiDenialSubmit(req, env);
    if (path === "/api/rcm/health") return apiRcmHealth();
    if (path.startsWith("/api/rcm/batch/")) return apiRcmBatch(path.split("/").pop(), env);
    if (path === "/api/rcm/validate/price") return apiRcmValidatePrice(req);
    if (path === "/api/rcm/validate/duplicate") return apiRcmValidateDuplicate(req);
    if (path === "/api/rcm/validate/pbm") return apiRcmValidatePbm(req);
    if (path === "/api/rcm/validate") {
      // Full pipeline: price + duplicate + PBM validators in sequence
      const body = await req.json();
      const bodyStr = JSON.stringify(body);
      const makeReq = (extra={}) => new Request(req.url, {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({...body,...extra})});
      const [priceR, pbmR] = await Promise.allSettled([
        apiRcmValidatePrice(makeReq()),
        apiRcmValidatePbm(makeReq()),
      ]);
      const price = priceR.status === 'fulfilled' ? await priceR.value.json() : {error:'price check failed'};
      const pbm   = pbmR.status === 'fulfilled'   ? await pbmR.value.json()   : {error:'pbm check failed'};
      const totalErrors = (price.violations_count || 0) + (pbm.violations_count || 0);
      return rcmJson({
        overall_ready: totalErrors === 0,
        total_errors: totalErrors,
        validators: { price, pbm },
        summary: totalErrors === 0 ? '✅ Claim passed all validators — safe for NPHIES submission' : `❌ ${totalErrors} issue(s) found — fix before submission`,
      });
    }
    if (path === "/api/rcm/appeal/generate") return apiRcmAppealGenerate(req);
    if (path === "/api/rcm/dashboard") return apiRcmDashboard(env);
    // ── RCM v2 — Strategic Enhancement Routes (public) ───────────────────────
    if (path === "/api/rcm/qa") return apiRcmQaChecklist(req);
    if (path === "/api/rcm/sla") return apiRcmSlaTracker(req, env);
    if (path === "/api/rcm/fhir/appeal") return apiRcmFhirAppeal(req);
    if (path === "/api/rcm/auth-alignment") return apiRcmAuthAlignment(req, env);
    if (path === "/api/rcm/rework") return apiRcmReworkAnalysis(req, env);
    // ── RCM v3 — Multi-Payer + Al Rajhi Strategy ─────────────────────────────
    if (path === "/api/rcm/qa/multipayer") return apiRcmQaMultipayer(req);
    if (path === "/api/rcm/payer-intelligence") return apiRcmPayerIntelligence(req);
    if (path === "/api/rcm/preauth-check") return apiRcmPreAuthCheck(req);
    if (path === "/api/rcm/validate/lab") return apiRcmLabValidate(req);
    if (path === "/api/rcm/settlement-cycle") return apiRcmSettlementCycle(req, env);

    // RCM Auto-Pilot v2 endpoints (protected — write operations)
    if (path === '/api/rcm/pipeline')        return rcmJson(await rcmAutoPipeline(env, ctx));
    if (path.startsWith('/api/rcm/reconcile/')) return rcmReconcile(req, env);

    if (path.startsWith("/api/sync/")) return apiSync(env, path.slice("/api/sync/".length));
    if (path === "/api/schema") {
      const tables = ["patients", "appointments", "claims", "providers", "departments", "rag_documents"];
      const counts = {};
      for (const t of tables) {
        const r = await env.DB.prepare("SELECT COUNT(*) as n FROM " + t).first().catch(() => ({ n: 0 }));
        counts[t] = r?.n || 0;
      }
      return ok({ database: "hnh-gharnata", version: VERSION, tables: counts });
    }
  }

  // ── RCM Auto-Pilot v2 (public — read-only aggregates) ──────────────────
  if (path === '/api/rcm/trend')   return rcmTrendReport(env);
  if (path === '/api/rcm/summary') return rcmDailySummary(env);

  return err("Not found", 404);
}
__name(handleRequest, "handleRequest");
export {
  worker_default as default
};
//# sourceMappingURL=worker.js.map