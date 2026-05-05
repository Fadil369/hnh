-- Initial schema for HNH Portal
-- Hayat National Hospital - BrainSAIT Healthcare OS

CREATE TABLE IF NOT EXISTS patients (
  id TEXT PRIMARY KEY,
  national_id TEXT UNIQUE,
  name_ar TEXT NOT NULL,
  name_en TEXT,
  phone TEXT NOT NULL,
  email TEXT,
  dob TEXT,
  gender TEXT,
  insurance_company TEXT,
  insurance_id TEXT,
  blood_type TEXT,
  allergies TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS appointments (
  id TEXT PRIMARY KEY,
  patient_id TEXT NOT NULL,
  provider_id TEXT,
  branch_id TEXT NOT NULL,
  department_id TEXT NOT NULL,
  appointment_date TEXT NOT NULL,
  appointment_time TEXT NOT NULL,
  status TEXT DEFAULT 'scheduled',
  type TEXT DEFAULT 'regular',
  notes TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS claims (
  id TEXT PRIMARY KEY,
  claim_number TEXT UNIQUE,
  patient_id TEXT NOT NULL,
  provider_id TEXT,
  branch_id TEXT NOT NULL,
  diagnosis_codes TEXT,
  procedure_codes TEXT,
  total_amount REAL NOT NULL,
  insurance_share REAL,
  patient_share REAL,
  status TEXT DEFAULT 'draft',
  nphies_status TEXT,
  nphies_transaction_id TEXT,
  submission_date TEXT,
  notes TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS eligibility_checks (
  id TEXT PRIMARY KEY,
  patient_id TEXT,
  insurance_company TEXT,
  service_type TEXT,
  check_date TEXT DEFAULT (datetime('now')),
  response_json TEXT,
  status TEXT
);

CREATE TABLE IF NOT EXISTS chat_history (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  session_id TEXT NOT NULL,
  role TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now'))
);
