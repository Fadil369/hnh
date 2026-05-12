-- Migration 0005: RCM columns for claims table
-- BrainSAIT ClaimLinc — Revenue Cycle Management
-- 2026-05-03

ALTER TABLE claims ADD COLUMN IF NOT EXISTS batch_number TEXT;
ALTER TABLE claims ADD COLUMN IF NOT EXISTS nphies_rejection_code TEXT;
ALTER TABLE claims ADD COLUMN IF NOT EXISTS nphies_rejection_desc TEXT;
ALTER TABLE claims ADD COLUMN IF NOT EXISTS rejection_bundle TEXT;
ALTER TABLE claims ADD COLUMN IF NOT EXISTS reject_amount REAL DEFAULT 0;
ALTER TABLE claims ADD COLUMN IF NOT EXISTS appeal_date TEXT;
ALTER TABLE claims ADD COLUMN IF NOT EXISTS appeal_notes TEXT;
ALTER TABLE claims ADD COLUMN IF NOT EXISTS appeal_strength TEXT CHECK(appeal_strength IN ('strong','medium','weak'));
ALTER TABLE claims ADD COLUMN IF NOT EXISTS resubmit_date TEXT;
ALTER TABLE claims ADD COLUMN IF NOT EXISTS resubmit_notes TEXT;
ALTER TABLE claims ADD COLUMN IF NOT EXISTS branch TEXT DEFAULT 'riyadh';

-- Index for RCM queries
CREATE INDEX IF NOT EXISTS idx_claims_status ON claims(status);
CREATE INDEX IF NOT EXISTS idx_claims_batch ON claims(batch_number);
CREATE INDEX IF NOT EXISTS idx_claims_branch ON claims(branch);
CREATE INDEX IF NOT EXISTS idx_claims_payer ON claims(payer_name);
CREATE INDEX IF NOT EXISTS idx_claims_nphies_code ON claims(nphies_rejection_code);
