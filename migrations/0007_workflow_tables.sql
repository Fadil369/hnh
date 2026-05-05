-- Migration: 0007_workflow_tables
-- Adds tables required by the workflow orchestration layer

CREATE TABLE IF NOT EXISTS prior_authorizations (
  id              TEXT PRIMARY KEY,
  patient_id      TEXT NOT NULL,
  provider_id     TEXT,
  payer_id        TEXT,
  service_code    TEXT NOT NULL,
  diagnosis_code  TEXT,
  urgency         TEXT NOT NULL DEFAULT 'routine',
  status          TEXT NOT NULL DEFAULT 'pending',
  ai_decision     TEXT,
  reviewer_notes  TEXT,
  submitted_at    TEXT DEFAULT (datetime('now')),
  decided_at      TEXT,
  expires_at      TEXT,
  nphies_ref      TEXT,
  created_at      TEXT DEFAULT (datetime('now')),
  updated_at      TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_prior_auth_patient   ON prior_authorizations(patient_id);
CREATE INDEX IF NOT EXISTS idx_prior_auth_status    ON prior_authorizations(status);

CREATE TABLE IF NOT EXISTS clinical_notes (
  id              TEXT PRIMARY KEY,
  patient_id      TEXT NOT NULL,
  provider_id     TEXT NOT NULL,
  appointment_id  TEXT,
  note_type       TEXT NOT NULL DEFAULT 'progress',
  chief_complaint TEXT,
  subjective      TEXT,
  objective       TEXT,
  assessment      TEXT,
  plan            TEXT,
  full_text       TEXT,
  ai_summary      TEXT,
  language        TEXT NOT NULL DEFAULT 'ar',
  confidential    INTEGER NOT NULL DEFAULT 0,
  signed_at       TEXT,
  created_at      TEXT DEFAULT (datetime('now')),
  updated_at      TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_clinical_notes_patient  ON clinical_notes(patient_id);
CREATE INDEX IF NOT EXISTS idx_clinical_notes_provider ON clinical_notes(provider_id);
CREATE INDEX IF NOT EXISTS idx_clinical_notes_appt     ON clinical_notes(appointment_id);

CREATE TABLE IF NOT EXISTS prescriptions (
  id               TEXT PRIMARY KEY,
  patient_id       TEXT NOT NULL,
  provider_id      TEXT NOT NULL,
  appointment_id   TEXT,
  clinical_note_id TEXT,
  medication_name  TEXT NOT NULL,
  medication_name_ar TEXT,
  generic_name     TEXT,
  dosage           TEXT NOT NULL,
  frequency        TEXT NOT NULL,
  duration_days    INTEGER,
  route            TEXT DEFAULT 'oral',
  quantity         INTEGER,
  refills          INTEGER DEFAULT 0,
  instructions     TEXT,
  instructions_ar  TEXT,
  contraindications TEXT,
  status           TEXT NOT NULL DEFAULT 'active',
  dispensed_at     TEXT,
  expires_at       TEXT,
  nphies_ref       TEXT,
  created_at       TEXT DEFAULT (datetime('now')),
  updated_at       TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_prescriptions_patient ON prescriptions(patient_id);
CREATE INDEX IF NOT EXISTS idx_prescriptions_status  ON prescriptions(status);

CREATE TABLE IF NOT EXISTS diagnoses (
  id               TEXT PRIMARY KEY,
  patient_id       TEXT NOT NULL,
  provider_id      TEXT NOT NULL,
  appointment_id   TEXT,
  clinical_note_id TEXT,
  icd10_code       TEXT NOT NULL,
  icd10_desc       TEXT,
  icd10_desc_ar    TEXT,
  diagnosis_type   TEXT NOT NULL DEFAULT 'primary',
  severity         TEXT DEFAULT 'moderate',
  onset_date       TEXT,
  resolution_date  TEXT,
  chronic          INTEGER NOT NULL DEFAULT 0,
  status           TEXT NOT NULL DEFAULT 'active',
  notes            TEXT,
  created_at       TEXT DEFAULT (datetime('now')),
  updated_at       TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_diagnoses_patient ON diagnoses(patient_id);
CREATE INDEX IF NOT EXISTS idx_diagnoses_icd10   ON diagnoses(icd10_code);
CREATE INDEX IF NOT EXISTS idx_diagnoses_status  ON diagnoses(status);

CREATE TABLE IF NOT EXISTS insurance_info (
  id                TEXT PRIMARY KEY,
  patient_id        TEXT NOT NULL UNIQUE,
  payer_id          TEXT,
  payer_name        TEXT,
  payer_name_ar     TEXT,
  plan_name         TEXT,
  policy_number     TEXT NOT NULL,
  member_id         TEXT NOT NULL,
  group_number      TEXT,
  coverage_type     TEXT DEFAULT 'comprehensive',
  network_type      TEXT DEFAULT 'in_network',
  deductible_amount REAL DEFAULT 0,
  deductible_met    REAL DEFAULT 0,
  out_of_pocket_max REAL DEFAULT 0,
  out_of_pocket_met REAL DEFAULT 0,
  copay_primary     REAL DEFAULT 0,
  copay_specialist  REAL DEFAULT 0,
  copay_er          REAL DEFAULT 0,
  coinsurance_pct   REAL DEFAULT 0,
  effective_date    TEXT NOT NULL,
  expiry_date       TEXT,
  is_active         INTEGER NOT NULL DEFAULT 1,
  nphies_payer_id   TEXT,
  nphies_member_id  TEXT,
  last_verified_at  TEXT,
  created_at        TEXT DEFAULT (datetime('now')),
  updated_at        TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_insurance_patient ON insurance_info(patient_id);
CREATE INDEX IF NOT EXISTS idx_insurance_payer   ON insurance_info(payer_id);
CREATE INDEX IF NOT EXISTS idx_insurance_active  ON insurance_info(is_active);
