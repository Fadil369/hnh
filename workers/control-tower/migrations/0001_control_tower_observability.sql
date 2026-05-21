CREATE TABLE IF NOT EXISTS control_tower_runs (
  id TEXT PRIMARY KEY,
  recorded_at TEXT NOT NULL,
  version TEXT NOT NULL,
  availability_pct REAL NOT NULL,
  p95_latency_ms INTEGER NOT NULL,
  sla_target_pct REAL NOT NULL,
  breach INTEGER NOT NULL DEFAULT 0,
  oracle_online INTEGER NOT NULL DEFAULT 0,
  oracle_total INTEGER NOT NULL DEFAULT 0,
  notes TEXT
);

CREATE TABLE IF NOT EXISTS control_tower_checks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  run_id TEXT NOT NULL,
  recorded_at TEXT NOT NULL,
  scope TEXT NOT NULL,
  name TEXT NOT NULL,
  ok INTEGER NOT NULL,
  status_code INTEGER NOT NULL,
  latency_ms INTEGER NOT NULL,
  FOREIGN KEY(run_id) REFERENCES control_tower_runs(id)
);

CREATE INDEX IF NOT EXISTS idx_ct_checks_recorded_at ON control_tower_checks(recorded_at);
CREATE INDEX IF NOT EXISTS idx_ct_checks_run_id ON control_tower_checks(run_id);
CREATE INDEX IF NOT EXISTS idx_ct_checks_scope_name ON control_tower_checks(scope, name);

CREATE TABLE IF NOT EXISTS control_tower_alerts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at TEXT NOT NULL,
  alert_type TEXT NOT NULL,
  severity TEXT NOT NULL,
  fingerprint TEXT NOT NULL,
  message TEXT NOT NULL,
  channels_json TEXT,
  payload_json TEXT
);

CREATE INDEX IF NOT EXISTS idx_ct_alerts_created_at ON control_tower_alerts(created_at);
CREATE INDEX IF NOT EXISTS idx_ct_alerts_fingerprint ON control_tower_alerts(alert_type, fingerprint);

CREATE TABLE IF NOT EXISTS control_tower_training_events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at TEXT NOT NULL,
  summary TEXT NOT NULL,
  channels_json TEXT,
  metadata_json TEXT
);

CREATE INDEX IF NOT EXISTS idx_ct_training_created_at ON control_tower_training_events(created_at);
