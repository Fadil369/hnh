-- HNH Gharnata Branch Database Schema
-- Version: 1.0
-- Date: 2026-04-30

-- ============================================
-- 1. PATIENT MASTER INDEX (PMI)
-- ============================================
CREATE TABLE IF NOT EXISTS patients (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    mrn TEXT UNIQUE NOT NULL,  -- Medical Record Number
    national_id TEXT,
    iqama_id TEXT,
    passport_id TEXT,
    first_name_ar TEXT,
    first_name_en TEXT,
    last_name_ar TEXT,
    last_name_en TEXT,
    full_name_ar TEXT,
    full_name_en TEXT,
    date_of_birth TEXT,
    gender TEXT CHECK(gender IN ('M', 'F')),
    marital_status TEXT,
    nationality TEXT,
    phone TEXT,
    email TEXT,
    address TEXT,
    city TEXT,
    emergency_contact_name TEXT,
    emergency_contact_phone TEXT,
    blood_type TEXT,
    allergies TEXT,
    photo_url TEXT,
    oracle_patient_id TEXT,  -- Oracle RAD patient ID
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now')),
    is_active INTEGER DEFAULT 1
);

-- ============================================
-- 2. INSURANCE & ELIGIBILITY
-- ============================================
CREATE TABLE IF NOT EXISTS insurance (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    patient_id INTEGER NOT NULL,
    payer_id TEXT NOT NULL,  -- NPHIES payer ID
    payer_name TEXT,
    policy_number TEXT,
    member_id TEXT,
    group_number TEXT,
    class_type TEXT,  -- OPD, ADT, etc.
    start_date TEXT,
    end_date TEXT,
    status TEXT DEFAULT 'active',
    oracle_contract_id TEXT,
    nphies_verified INTEGER DEFAULT 0,
    verified_at TEXT,
    created_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (patient_id) REFERENCES patients(id)
);

CREATE TABLE IF NOT EXISTS eligibility_checks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    patient_id INTEGER NOT NULL,
    insurance_id INTEGER,
    check_date TEXT DEFAULT (datetime('now')),
    status TEXT,  -- eligible, not_eligible, pending
    response_data TEXT,  -- JSON response from NPHIES/Oracle
    source TEXT,  -- oracle, nphies, bsma
    FOREIGN KEY (patient_id) REFERENCES patients(id)
);

-- ============================================
-- 3. APPOINTMENTS
-- ============================================
CREATE TABLE IF NOT EXISTS appointments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    patient_id INTEGER NOT NULL,
    provider_id INTEGER,
    clinic_code TEXT,
    clinic_name TEXT,
    appointment_date TEXT,
    appointment_time TEXT,
    status TEXT DEFAULT 'scheduled',  -- scheduled, confirmed, checked_in, in_progress, completed, cancelled, no_show
    appointment_type TEXT,  -- new, follow_up, emergency
    reason TEXT,
    notes TEXT,
    oracle_appointment_id TEXT,
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (patient_id) REFERENCES patients(id)
);

-- ============================================
-- 4. PROVIDERS (Doctors)
-- ============================================
CREATE TABLE IF NOT EXISTS providers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    provider_code TEXT UNIQUE,
    first_name_ar TEXT,
    first_name_en TEXT,
    last_name_ar TEXT,
    last_name_en TEXT,
    specialty TEXT,
    subspecialty TEXT,
    license_number TEXT,
    department TEXT,
    clinic_location TEXT,
    phone TEXT,
    email TEXT,
    is_active INTEGER DEFAULT 1,
    oracle_provider_id TEXT,
    created_at TEXT DEFAULT (datetime('now'))
);

-- ============================================
-- 5. VISITS & ENCOUNTERS
-- ============================================
CREATE TABLE IF NOT EXISTS visits (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    patient_id INTEGER NOT NULL,
    provider_id INTEGER,
    visit_date TEXT DEFAULT (datetime('now')),
    visit_type TEXT,  -- opd, emergency, inpatient
    chief_complaint TEXT,
    diagnosis_code TEXT,  -- ICD-10
    diagnosis_description TEXT,
    status TEXT DEFAULT 'open',  -- open, closed, cancelled
    oracle_visit_id TEXT,
    created_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (patient_id) REFERENCES patients(id),
    FOREIGN KEY (provider_id) REFERENCES providers(id)
);

-- ============================================
-- 6. ORDERS (CPOE)
-- ============================================
CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    visit_id INTEGER NOT NULL,
    patient_id INTEGER NOT NULL,
    provider_id INTEGER NOT NULL,
    order_type TEXT,  -- lab, radiology, pharmacy, procedure, consultation
    order_item TEXT,
    order_item_code TEXT,
    quantity INTEGER DEFAULT 1,
    instructions TEXT,
    status TEXT DEFAULT 'ordered',  -- ordered, approved, completed, cancelled
    priority TEXT DEFAULT 'routine',  -- routine, urgent, stat
    order_date TEXT DEFAULT (datetime('now')),
    completed_date TEXT,
    result_data TEXT,  -- JSON result data
    oracle_order_id TEXT,
    FOREIGN KEY (visit_id) REFERENCES visits(id),
    FOREIGN KEY (patient_id) REFERENCES patients(id)
);

-- ============================================
-- 7. LAB RESULTS
-- ============================================
CREATE TABLE IF NOT EXISTS lab_results (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER,
    patient_id INTEGER NOT NULL,
    test_code TEXT,
    test_name TEXT,
    result_value TEXT,
    result_unit TEXT,
    reference_range TEXT,
    abnormal_flag TEXT,  -- H, L, HH, LL, N
    status TEXT DEFAULT 'pending',  -- pending, final, amended
    result_date TEXT,
    verified_by TEXT,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (patient_id) REFERENCES patients(id)
);

-- ============================================
-- 8. PHARMACY
-- ============================================
CREATE TABLE IF NOT EXISTS prescriptions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    visit_id INTEGER,
    patient_id INTEGER NOT NULL,
    provider_id INTEGER NOT NULL,
    drug_name TEXT,
    drug_code TEXT,
    dosage TEXT,
    frequency TEXT,
    duration TEXT,
    route TEXT,
    quantity INTEGER,
    refills INTEGER DEFAULT 0,
    status TEXT DEFAULT 'active',  -- active, completed, discontinued
    dispensed INTEGER DEFAULT 0,
    dispensed_date TEXT,
    oracle_prescription_id TEXT,
    FOREIGN KEY (patient_id) REFERENCES patients(id)
);

-- ============================================
-- 9. CLAIMS & BILLING
-- ============================================
CREATE TABLE IF NOT EXISTS claims (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    patient_id INTEGER NOT NULL,
    visit_id INTEGER,
    claim_number TEXT UNIQUE,
    claim_type TEXT,  -- professional, institutional
    payer_id TEXT,
    payer_name TEXT,
    total_amount REAL,
    approved_amount REAL,
    paid_amount REAL,
    status TEXT DEFAULT 'draft',  -- draft, submitted, approved, rejected, paid
    submission_date TEXT,
    approval_date TEXT,
    rejection_code TEXT,
    rejection_reason TEXT,
    nphies_claim_id TEXT,
    oracle_claim_id TEXT,
    created_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (patient_id) REFERENCES patients(id)
);

CREATE TABLE IF NOT EXISTS claim_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    claim_id INTEGER NOT NULL,
    item_code TEXT,
    item_description TEXT,
    quantity INTEGER,
    unit_price REAL,
    total_price REAL,
    FOREIGN KEY (claim_id) REFERENCES claims(id)
);

-- ============================================
-- 10. PRIOR AUTHORIZATION
-- ============================================
CREATE TABLE IF NOT EXISTS prior_authorizations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    patient_id INTEGER NOT NULL,
    insurance_id INTEGER,
    pa_number TEXT,
    request_type TEXT,  -- medication, procedure, admission
    request_details TEXT,
    status TEXT DEFAULT 'pending',  -- pending, approved, rejected
    approval_date TEXT,
    expiry_date TEXT,
    nphies_pa_id TEXT,
    created_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (patient_id) REFERENCES patients(id)
);

-- ============================================
-- 11. CONTRACTS & TARIFFS
-- ============================================
CREATE TABLE IF NOT EXISTS contracts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    payer_id TEXT NOT NULL,
    payer_name TEXT,
    contract_class TEXT,  -- OPD CLASS B, ADT CLASS A, etc.
    start_date TEXT,
    end_date TEXT,
    status TEXT,  -- active, expired, pending
    discount_percentage REAL,
    tariff_rules TEXT,  -- JSON rules
    oracle_contract_id TEXT,
    created_at TEXT DEFAULT (datetime('now'))
);

-- ============================================
-- 12. DEPARTMENTS & CLINICS
-- ============================================
CREATE TABLE IF NOT EXISTS departments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    dept_code TEXT UNIQUE,
    dept_name_ar TEXT,
    dept_name_en TEXT,
    dept_type TEXT,  -- clinical, administrative, support
    location TEXT,
    floor INTEGER,
    building TEXT,
    is_active INTEGER DEFAULT 1,
    oracle_dept_id TEXT
);

CREATE TABLE IF NOT EXISTS clinics (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    clinic_code TEXT UNIQUE,
    clinic_name_ar TEXT,
    clinic_name_en TEXT,
    department_id INTEGER,
    provider_id INTEGER,
    capacity INTEGER,
    schedule TEXT,  -- JSON schedule
    is_active INTEGER DEFAULT 1,
    oracle_clinic_id TEXT,
    FOREIGN KEY (department_id) REFERENCES departments(id)
);

-- ============================================
-- 13. INVENTORY & PHARMACY
-- ============================================
CREATE TABLE IF NOT EXISTS inventory_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    item_code TEXT UNIQUE,
    item_name_ar TEXT,
    item_name_en TEXT,
    category TEXT,
    unit TEXT,
    current_stock INTEGER DEFAULT 0,
    minimum_stock INTEGER DEFAULT 0,
    maximum_stock INTEGER DEFAULT 0,
    unit_cost REAL,
    expiry_date TEXT,
    oracle_item_id TEXT
);

-- ============================================
-- 14. NURSING DOCUMENTATION
-- ============================================
CREATE TABLE IF NOT EXISTS nursing_notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    patient_id INTEGER NOT NULL,
    visit_id INTEGER,
    nurse_id INTEGER,
    note_type TEXT,  -- assessment, intervention, evaluation
    note_text TEXT,
    vital_signs TEXT,  -- JSON: {bp, hr, temp, rr, spo2, pain}
    created_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (patient_id) REFERENCES patients(id)
);

-- ============================================
-- 15. CONSENT FORMS
-- ============================================
CREATE TABLE IF NOT EXISTS consent_forms (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    patient_id INTEGER NOT NULL,
    visit_id INTEGER,
    form_type TEXT,  -- general, surgical, anesthesia, blood_transfusion
    form_data TEXT,  -- JSON form data
    signature_url TEXT,
    signed_at TEXT,
    signed_by TEXT,
    status TEXT DEFAULT 'pending',  -- pending, signed, revoked
    FOREIGN KEY (patient_id) REFERENCES patients(id)
);

-- ============================================
-- 16. AUDIT LOG
-- ============================================
CREATE TABLE IF NOT EXISTS audit_log (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT,
    action TEXT,
    entity_type TEXT,
    entity_id INTEGER,
    old_value TEXT,
    new_value TEXT,
    ip_address TEXT,
    user_agent TEXT,
    created_at TEXT DEFAULT (datetime('now'))
);

-- ============================================
-- 17. RAG DOCUMENTS (Knowledge Base)
-- ============================================
CREATE TABLE IF NOT EXISTS rag_documents (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    category TEXT,
    source TEXT,
    lang TEXT DEFAULT 'en',
    embedding TEXT,  -- JSON vector
    created_at TEXT DEFAULT (datetime('now'))
);

-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX IF NOT EXISTS idx_patients_mrn ON patients(mrn);
CREATE INDEX IF NOT EXISTS idx_patients_national_id ON patients(national_id);
CREATE INDEX IF NOT EXISTS idx_patients_iqama ON patients(iqama_id);
CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments(appointment_date);
CREATE INDEX IF NOT EXISTS idx_appointments_patient ON appointments(patient_id);
CREATE INDEX IF NOT EXISTS idx_visits_patient ON visits(patient_id);
CREATE INDEX IF NOT EXISTS idx_visits_status ON visits(status);
CREATE INDEX IF NOT EXISTS idx_orders_visit ON orders(visit_id);
CREATE INDEX IF NOT EXISTS idx_orders_patient ON orders(patient_id);
CREATE INDEX IF NOT EXISTS idx_orders_type ON orders(order_type);
CREATE INDEX IF NOT EXISTS idx_claims_status ON claims(status);
CREATE INDEX IF NOT EXISTS idx_claims_payer ON claims(payer_id);
CREATE INDEX IF NOT EXISTS idx_claims_patient ON claims(patient_id);
CREATE INDEX IF NOT EXISTS idx_contracts_payer ON contracts(payer_id);
CREATE INDEX IF NOT EXISTS idx_contracts_status ON contracts(status);
CREATE INDEX IF NOT EXISTS idx_pa_status ON prior_authorizations(status);
CREATE INDEX IF NOT EXISTS idx_pa_patient ON prior_authorizations(patient_id);
CREATE INDEX IF NOT EXISTS idx_eligibility_patient ON eligibility_checks(patient_id);
CREATE INDEX IF NOT EXISTS idx_rag_category ON rag_documents(category);

-- ============================================
-- SCHEMA MIGRATIONS (v2 → v3: Unified Hub)
-- ============================================

-- Add missing columns to contracts table (needed by SBS portal)
ALTER TABLE contracts ADD COLUMN contract_type TEXT;
ALTER TABLE contracts ADD COLUMN contract_details TEXT;
ALTER TABLE contracts ADD COLUMN updated_at TEXT DEFAULT (datetime('now'));

-- Backfill contract_type from legacy contract_class where not yet set.
-- NOTE: This runs on each schema apply but is safe — WHERE contract_type IS NULL
-- ensures it only touches rows that haven't been migrated yet.
UPDATE contracts
SET contract_type = contract_class
WHERE contract_type IS NULL
  AND contract_class IS NOT NULL;

-- Add updated_at to prior_authorizations (needed for NPHIES PA async callback)
ALTER TABLE prior_authorizations ADD COLUMN updated_at TEXT DEFAULT (datetime('now'));

-- ============================================
-- 18. GIVC DOCTOR NETWORK (v3.1: Embedded GIVC)
-- ============================================
-- Add GIVC OID field to providers table for doctor network integration
ALTER TABLE providers ADD COLUMN givc_oid TEXT;
ALTER TABLE providers ADD COLUMN givc_registered INTEGER DEFAULT 0;
ALTER TABLE providers ADD COLUMN givc_registered_at TEXT;
ALTER TABLE providers ADD COLUMN givc_specialty_code TEXT;
ALTER TABLE providers ADD COLUMN givc_branch_code TEXT;

-- Create GIVC doctor registry table for network tracking
CREATE TABLE IF NOT EXISTS givc_doctors (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    givc_oid TEXT UNIQUE NOT NULL,
    provider_id INTEGER,
    national_id TEXT,
    name_ar TEXT,
    name_en TEXT,
    specialty TEXT,
    subspecialty TEXT,
    license_number TEXT,
    license_issuing_authority TEXT,
    facility_oid TEXT,
    facility_name TEXT,
    branch_code TEXT,
    department TEXT,
    clinic_location TEXT,
    phone TEXT,
    email TEXT,
    npi TEXT,
    givc_status TEXT DEFAULT 'pending',
    network_visibility TEXT DEFAULT 'internal',
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (provider_id) REFERENCES providers(id)
);

CREATE INDEX IF NOT EXISTS idx_givc_oid ON givc_doctors(givc_oid);
CREATE INDEX IF NOT EXISTS idx_givc_provider ON givc_doctors(provider_id);
CREATE INDEX IF NOT EXISTS idx_givc_status ON givc_doctors(givc_status);

-- Portal session tracking
CREATE TABLE IF NOT EXISTS portal_sessions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    session_token TEXT UNIQUE NOT NULL,
    user_id TEXT,
    portal TEXT CHECK(portal IN ('bsma', 'givc', 'sbs', 'nphies', 'admin')),
    role TEXT,
    created_at TEXT DEFAULT (datetime('now')),
    expires_at TEXT,
    last_activity TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_sessions_token ON portal_sessions(session_token);
CREATE INDEX IF NOT EXISTS idx_sessions_portal ON portal_sessions(portal);

-- ============================================
-- VIEWS
-- ============================================
CREATE VIEW IF NOT EXISTS v_patient_summary AS
SELECT 
    p.id,
    p.mrn,
    p.full_name_ar,
    p.full_name_en,
    p.national_id,
    p.phone,
    p.gender,
    p.date_of_birth,
    COUNT(DISTINCT v.id) as total_visits,
    COUNT(DISTINCT c.id) as total_claims,
    MAX(v.visit_date) as last_visit
FROM patients p
LEFT JOIN visits v ON p.id = v.patient_id
LEFT JOIN claims c ON p.id = c.patient_id
WHERE p.is_active = 1
GROUP BY p.id;

CREATE VIEW IF NOT EXISTS v_daily_stats AS
SELECT 
    DATE(visit_date) as visit_day,
    COUNT(*) as total_visits,
    COUNT(DISTINCT patient_id) as unique_patients,
    visit_type
FROM visits
WHERE visit_date >= DATE('now', '-30 days')
GROUP BY DATE(visit_date), visit_type;
