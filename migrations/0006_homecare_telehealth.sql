-- Migration 0006: Home Care & Telehealth tables
-- HNH Portal v9.1.0 — BrainSAIT Healthcare OS

-- Home care visit records
CREATE TABLE IF NOT EXISTS homecare_visits (
  id TEXT PRIMARY KEY,
  patient_id TEXT NOT NULL,
  nurse_id TEXT,
  branch_id TEXT NOT NULL DEFAULT 'R001',
  visit_date TEXT NOT NULL,
  visit_time TEXT,
  status TEXT DEFAULT 'scheduled',
  visit_type TEXT DEFAULT 'routine',
  address TEXT NOT NULL,
  city TEXT DEFAULT 'الرياض',
  lat REAL,
  lng REAL,
  chief_complaint TEXT,
  notes TEXT,
  vitals_json TEXT,
  insurance_company TEXT,
  insurance_id TEXT,
  completed_at TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

-- Home care nurses / field staff
CREATE TABLE IF NOT EXISTS homecare_nurses (
  id TEXT PRIMARY KEY,
  name_ar TEXT NOT NULL,
  name_en TEXT,
  phone TEXT,
  branch_id TEXT DEFAULT 'R001',
  specialty TEXT DEFAULT 'general',
  status TEXT DEFAULT 'active',
  current_lat REAL,
  current_lng REAL,
  created_at TEXT DEFAULT (datetime('now'))
);

-- Telehealth (video consultation) sessions
CREATE TABLE IF NOT EXISTS telehealth_sessions (
  id TEXT PRIMARY KEY,
  patient_id TEXT NOT NULL,
  provider_id TEXT,
  branch_id TEXT DEFAULT 'R001',
  session_date TEXT NOT NULL,
  session_time TEXT NOT NULL,
  duration_min INTEGER DEFAULT 30,
  status TEXT DEFAULT 'scheduled',
  session_type TEXT DEFAULT 'consultation',
  department_id TEXT,
  chief_complaint TEXT,
  room_code TEXT UNIQUE,
  join_url TEXT,
  prescription_id TEXT,
  notes TEXT,
  started_at TEXT,
  ended_at TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

-- Telehealth prescriptions (issued after session)
CREATE TABLE IF NOT EXISTS telehealth_prescriptions (
  id TEXT PRIMARY KEY,
  session_id TEXT NOT NULL,
  patient_id TEXT NOT NULL,
  provider_id TEXT,
  medications_json TEXT NOT NULL,
  diagnosis_codes TEXT,
  instructions TEXT,
  status TEXT DEFAULT 'active',
  dispensed_at TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

-- Email send log (audit trail)
CREATE TABLE IF NOT EXISTS email_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  recipient TEXT NOT NULL,
  subject TEXT NOT NULL,
  template TEXT,
  ref_id TEXT,
  status TEXT DEFAULT 'pending',
  error TEXT,
  sent_at TEXT DEFAULT (datetime('now'))
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_homecare_visits_patient  ON homecare_visits(patient_id);
CREATE INDEX IF NOT EXISTS idx_homecare_visits_date     ON homecare_visits(visit_date);
CREATE INDEX IF NOT EXISTS idx_homecare_visits_status   ON homecare_visits(status);
CREATE INDEX IF NOT EXISTS idx_homecare_visits_nurse    ON homecare_visits(nurse_id);
CREATE INDEX IF NOT EXISTS idx_telehealth_patient       ON telehealth_sessions(patient_id);
CREATE INDEX IF NOT EXISTS idx_telehealth_date          ON telehealth_sessions(session_date);
CREATE INDEX IF NOT EXISTS idx_telehealth_room          ON telehealth_sessions(room_code);
CREATE INDEX IF NOT EXISTS idx_telehealth_provider      ON telehealth_sessions(provider_id);
CREATE INDEX IF NOT EXISTS idx_email_log_ref            ON email_log(ref_id);
