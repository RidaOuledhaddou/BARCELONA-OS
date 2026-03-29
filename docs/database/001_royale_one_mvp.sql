-- =============================================================================
-- Royale One - MVP schema (PostgreSQL 16+ / 18+)
-- Connect in pgAdmin to DATABASE royale_one. App tables + functions use SCHEMA royale_one.
--
-- Spatial data: NO PostGIS required. Points use WGS84 longitude/latitude; risk zone boundaries use GeoJSON in JSONB.
-- To use PostGIS geography/GiST later, install PostGIS on the server (Stack Builder on Windows), then migrate columns.
--
-- Extension: pg_trgm (text search) — ships with PostgreSQL; if CREATE EXTENSION fails, install "contrib" for your version.
--
-- pgAdmin: Execute (F5), NOT Explain. For CREATE FUNCTION, select from CREATE through the final ';' on that statement (entire function).
-- =============================================================================

CREATE SCHEMA IF NOT EXISTS royale_one;
SET search_path TO royale_one, public;

CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- Trigger helper function is defined once, immediately before trg_users_updated_at (below). Body uses single-quoted string (no $$).
-- >>> Users: run from CREATE SCHEMA through users trigger, or run whole file. <<<
CREATE TABLE royale_one.users (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT NOT NULL,
    password_hash TEXT NOT NULL,
    full_name TEXT,
    phone TEXT,
    status TEXT NOT NULL DEFAULT 'active'
      CHECK (status IN ('active', 'suspended', 'pending')),
    pillar_extensions JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    deleted_at TIMESTAMPTZ
);
CREATE UNIQUE INDEX users_email_active_uq ON royale_one.users (lower(email)) WHERE deleted_at IS NULL;
CREATE UNIQUE INDEX users_phone_active_uq ON royale_one.users (phone) WHERE phone IS NOT NULL AND deleted_at IS NULL;

-- Trigger needs the function to exist first. PG14+: CREATE OR REPLACE TRIGGER is safe if you run CREATE without the prior DROP.
CREATE OR REPLACE FUNCTION royale_one.royale_touch_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS 'BEGIN NEW.updated_at := now(); RETURN NEW; END;';

CREATE OR REPLACE TRIGGER trg_users_updated_at
  BEFORE UPDATE ON royale_one.users
  FOR EACH ROW
  EXECUTE FUNCTION royale_one.royale_touch_updated_at();

CREATE TABLE royale_one.roles (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    pillar_extensions JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    deleted_at TIMESTAMPTZ
);
CREATE UNIQUE INDEX roles_name_active_uq ON royale_one.roles (name) WHERE deleted_at IS NULL;
CREATE OR REPLACE TRIGGER trg_roles_updated_at BEFORE UPDATE ON royale_one.roles FOR EACH ROW EXECUTE FUNCTION royale_one.royale_touch_updated_at();

CREATE TABLE royale_one.user_roles (
    user_id uuid NOT NULL REFERENCES royale_one.users (id) ON DELETE CASCADE,
    role_id uuid NOT NULL REFERENCES royale_one.roles (id) ON DELETE RESTRICT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    deleted_at TIMESTAMPTZ,
    PRIMARY KEY (user_id, role_id)
);
CREATE OR REPLACE TRIGGER trg_user_roles_updated_at BEFORE UPDATE ON royale_one.user_roles FOR EACH ROW EXECUTE FUNCTION royale_one.royale_touch_updated_at();

CREATE TABLE royale_one.drivers (
    id uuid PRIMARY KEY REFERENCES royale_one.users (id) ON DELETE CASCADE,
    license_number TEXT,
    verified BOOLEAN NOT NULL DEFAULT false,
    status TEXT NOT NULL DEFAULT 'offline'
      CHECK (status IN ('offline', 'online', 'busy', 'suspended')),
    pillar_extensions JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    deleted_at TIMESTAMPTZ
);
CREATE UNIQUE INDEX drivers_license_active_uq ON royale_one.drivers (license_number) WHERE license_number IS NOT NULL AND deleted_at IS NULL;
CREATE OR REPLACE TRIGGER trg_drivers_updated_at BEFORE UPDATE ON royale_one.drivers FOR EACH ROW EXECUTE FUNCTION royale_one.royale_touch_updated_at();

CREATE TABLE royale_one.vehicle_types (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    code TEXT NOT NULL,
    label TEXT NOT NULL,
    pillar_extensions JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    deleted_at TIMESTAMPTZ
);
CREATE UNIQUE INDEX vehicle_types_code_active_uq ON royale_one.vehicle_types (code) WHERE deleted_at IS NULL;
CREATE OR REPLACE TRIGGER trg_vehicle_types_updated_at BEFORE UPDATE ON royale_one.vehicle_types FOR EACH ROW EXECUTE FUNCTION royale_one.royale_touch_updated_at();

CREATE TABLE royale_one.vehicles (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    driver_id uuid NOT NULL REFERENCES royale_one.drivers (id) ON DELETE CASCADE,
    vehicle_type_id uuid REFERENCES royale_one.vehicle_types (id) ON DELETE RESTRICT,
    brand TEXT,
    model TEXT,
    plate_number TEXT NOT NULL,
    pillar_extensions JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    deleted_at TIMESTAMPTZ
);
CREATE UNIQUE INDEX vehicles_plate_active_uq ON royale_one.vehicles (plate_number) WHERE deleted_at IS NULL;
CREATE INDEX idx_vehicles_driver ON royale_one.vehicles (driver_id) WHERE deleted_at IS NULL;
CREATE OR REPLACE TRIGGER trg_vehicles_updated_at BEFORE UPDATE ON royale_one.vehicles FOR EACH ROW EXECUTE FUNCTION royale_one.royale_touch_updated_at();

CREATE TABLE royale_one.categories (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT,
    pillar_extensions JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    deleted_at TIMESTAMPTZ
);
CREATE UNIQUE INDEX categories_name_active_uq ON royale_one.categories (name) WHERE deleted_at IS NULL;
CREATE OR REPLACE TRIGGER trg_categories_updated_at BEFORE UPDATE ON royale_one.categories FOR EACH ROW EXECUTE FUNCTION royale_one.royale_touch_updated_at();

CREATE TABLE royale_one.places (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    longitude DOUBLE PRECISION NOT NULL CHECK (longitude >= -180 AND longitude <= 180),
    latitude DOUBLE PRECISION NOT NULL CHECK (latitude >= -90 AND latitude <= 90),
    price_level SMALLINT CHECK (price_level IS NULL OR (price_level >= 1 AND price_level <= 5)),
    is_active BOOLEAN NOT NULL DEFAULT true,
    pillar_extensions JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    deleted_at TIMESTAMPTZ
);
CREATE INDEX idx_places_lat_lon ON royale_one.places (latitude, longitude) WHERE deleted_at IS NULL;
CREATE INDEX idx_places_active ON royale_one.places (is_active) WHERE deleted_at IS NULL;

CREATE INDEX idx_places_name_trgm ON royale_one.places USING gin (name gin_trgm_ops);
CREATE OR REPLACE TRIGGER trg_places_updated_at BEFORE UPDATE ON royale_one.places FOR EACH ROW EXECUTE FUNCTION royale_one.royale_touch_updated_at();

CREATE TABLE royale_one.place_categories (
    place_id uuid NOT NULL REFERENCES royale_one.places (id) ON DELETE CASCADE,
    category_id uuid NOT NULL REFERENCES royale_one.categories (id) ON DELETE RESTRICT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    deleted_at TIMESTAMPTZ,
    PRIMARY KEY (place_id, category_id)
);
CREATE OR REPLACE TRIGGER trg_place_categories_updated_at BEFORE UPDATE ON royale_one.place_categories FOR EACH ROW EXECUTE FUNCTION royale_one.royale_touch_updated_at();

CREATE TABLE royale_one.place_external_refs (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    place_id uuid NOT NULL REFERENCES royale_one.places (id) ON DELETE CASCADE,
    source TEXT NOT NULL,
    external_id TEXT NOT NULL,
    pillar_extensions JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    deleted_at TIMESTAMPTZ
);
CREATE UNIQUE INDEX place_external_refs_source_id_active_uq ON royale_one.place_external_refs (source, external_id) WHERE deleted_at IS NULL;
CREATE INDEX idx_place_external_refs_place ON royale_one.place_external_refs (place_id) WHERE deleted_at IS NULL;
CREATE OR REPLACE TRIGGER trg_place_external_refs_updated_at BEFORE UPDATE ON royale_one.place_external_refs FOR EACH ROW EXECUTE FUNCTION royale_one.royale_touch_updated_at();

CREATE TABLE royale_one.score_dimensions (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    code TEXT NOT NULL,
    label TEXT NOT NULL,
    pillar_extensions JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    deleted_at TIMESTAMPTZ
);
CREATE UNIQUE INDEX score_dimensions_code_active_uq ON royale_one.score_dimensions (code) WHERE deleted_at IS NULL;
CREATE OR REPLACE TRIGGER trg_score_dimensions_updated_at BEFORE UPDATE ON royale_one.score_dimensions FOR EACH ROW EXECUTE FUNCTION royale_one.royale_touch_updated_at();

CREATE TABLE royale_one.place_scores (
    place_id uuid NOT NULL REFERENCES royale_one.places (id) ON DELETE CASCADE,
    dimension_id uuid NOT NULL REFERENCES royale_one.score_dimensions (id) ON DELETE RESTRICT,
    score DOUBLE PRECISION NOT NULL,
    rule_version TEXT,
    details JSONB NOT NULL DEFAULT '{}'::jsonb,
    calculated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    pillar_extensions JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    deleted_at TIMESTAMPTZ,
    PRIMARY KEY (place_id, dimension_id)
);
CREATE INDEX idx_place_scores_dimension ON royale_one.place_scores (dimension_id) WHERE deleted_at IS NULL;
CREATE OR REPLACE TRIGGER trg_place_scores_updated_at BEFORE UPDATE ON royale_one.place_scores FOR EACH ROW EXECUTE FUNCTION royale_one.royale_touch_updated_at();

CREATE TABLE royale_one.report_types (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    code TEXT NOT NULL,
    label TEXT NOT NULL,
    pillar_extensions JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    deleted_at TIMESTAMPTZ
);
CREATE UNIQUE INDEX report_types_code_active_uq ON royale_one.report_types (code) WHERE deleted_at IS NULL;
CREATE OR REPLACE TRIGGER trg_report_types_updated_at BEFORE UPDATE ON royale_one.report_types FOR EACH ROW EXECUTE FUNCTION royale_one.royale_touch_updated_at();

CREATE TABLE royale_one.safety_reports (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES royale_one.users (id) ON DELETE SET NULL,
    type_id uuid NOT NULL REFERENCES royale_one.report_types (id) ON DELETE RESTRICT,
    longitude DOUBLE PRECISION NOT NULL CHECK (longitude >= -180 AND longitude <= 180),
    latitude DOUBLE PRECISION NOT NULL CHECK (latitude >= -90 AND latitude <= 90),
    description TEXT,
    moderation_status TEXT NOT NULL DEFAULT 'pending'
      CHECK (moderation_status IN ('pending', 'visible', 'rejected', 'hidden')),
    pillar_extensions JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    deleted_at TIMESTAMPTZ
);
CREATE INDEX idx_safety_reports_lat_lon ON royale_one.safety_reports (latitude, longitude) WHERE deleted_at IS NULL;
CREATE INDEX idx_safety_reports_created_at ON royale_one.safety_reports (created_at DESC) WHERE deleted_at IS NULL;
CREATE INDEX idx_safety_reports_type_time ON royale_one.safety_reports (type_id, created_at DESC) WHERE deleted_at IS NULL;
CREATE INDEX idx_safety_reports_user ON royale_one.safety_reports (user_id) WHERE deleted_at IS NULL;
CREATE OR REPLACE TRIGGER trg_safety_reports_updated_at BEFORE UPDATE ON royale_one.safety_reports FOR EACH ROW EXECUTE FUNCTION royale_one.royale_touch_updated_at();

CREATE TABLE royale_one.risk_zones (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    area_geojson JSONB NOT NULL,
    risk_score DOUBLE PRECISION NOT NULL,
    source TEXT NOT NULL CHECK (source IN ('official', 'crowd', 'inferred', 'blended')),
    priority INT NOT NULL DEFAULT 0,
    effective_from TIMESTAMPTZ,
    effective_to TIMESTAMPTZ,
    pillar_extensions JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    deleted_at TIMESTAMPTZ
);
CREATE INDEX idx_risk_zones_area_geojson ON royale_one.risk_zones USING gin (area_geojson jsonb_path_ops);
CREATE INDEX idx_risk_zones_effective ON royale_one.risk_zones (effective_from, effective_to) WHERE deleted_at IS NULL;
CREATE OR REPLACE TRIGGER trg_risk_zones_updated_at BEFORE UPDATE ON royale_one.risk_zones FOR EACH ROW EXECUTE FUNCTION royale_one.royale_touch_updated_at();

CREATE TABLE royale_one.domain_event_outbox (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    event_type TEXT NOT NULL,
    schema_version INT NOT NULL DEFAULT 1,
    payload JSONB NOT NULL,
    correlation_id uuid,
    producer TEXT,
    processed_at TIMESTAMPTZ,
    pillar_extensions JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    deleted_at TIMESTAMPTZ
);
CREATE INDEX idx_outbox_unprocessed ON royale_one.domain_event_outbox (created_at) WHERE processed_at IS NULL AND deleted_at IS NULL;
CREATE INDEX idx_outbox_correlation ON royale_one.domain_event_outbox (correlation_id) WHERE deleted_at IS NULL;
CREATE OR REPLACE TRIGGER trg_domain_event_outbox_updated_at BEFORE UPDATE ON royale_one.domain_event_outbox FOR EACH ROW EXECUTE FUNCTION royale_one.royale_touch_updated_at();

-- -----------------------------------------------------------------------------
-- Late install: you created tables but skipped indexes/triggers and get
--   function royale_one.royale_touch_updated_at() does not exist
-- Select the full CREATE OR REPLACE FUNCTION below (all lines through the final semicolon), then F5 — not a fragment.
-- Then run the CREATE INDEX / CREATE TRIGGER statements you still need (e.g. for royale_one.users).
-- Check: SELECT routine_name FROM information_schema.routines
--        WHERE routine_schema = 'royale_one' AND routine_name = 'royale_touch_updated_at';
-- -----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION royale_one.royale_touch_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS 'BEGIN NEW.updated_at := now(); RETURN NEW; END;';

-- Seeds -----------------------------------------------------------------------
-- Schema-qualified INSERTs + idempotent DDL below so running only this section in pgAdmin still works
-- (same column definitions as the CREATE TABLE statements earlier in this file).
SET search_path TO royale_one, public;

CREATE SCHEMA IF NOT EXISTS royale_one;

CREATE OR REPLACE FUNCTION royale_one.royale_touch_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS 'BEGIN NEW.updated_at := now(); RETURN NEW; END;';

CREATE TABLE IF NOT EXISTS royale_one.roles (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    pillar_extensions JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    deleted_at TIMESTAMPTZ
);
CREATE UNIQUE INDEX IF NOT EXISTS roles_name_active_uq ON royale_one.roles (name) WHERE deleted_at IS NULL;

CREATE OR REPLACE TRIGGER trg_roles_updated_at BEFORE UPDATE ON royale_one.roles FOR EACH ROW EXECUTE FUNCTION royale_one.royale_touch_updated_at();

CREATE TABLE IF NOT EXISTS royale_one.score_dimensions (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    code TEXT NOT NULL,
    label TEXT NOT NULL,
    pillar_extensions JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    deleted_at TIMESTAMPTZ
);
CREATE UNIQUE INDEX IF NOT EXISTS score_dimensions_code_active_uq ON royale_one.score_dimensions (code) WHERE deleted_at IS NULL;
CREATE OR REPLACE TRIGGER trg_score_dimensions_updated_at BEFORE UPDATE ON royale_one.score_dimensions FOR EACH ROW EXECUTE FUNCTION royale_one.royale_touch_updated_at();

CREATE TABLE IF NOT EXISTS royale_one.vehicle_types (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    code TEXT NOT NULL,
    label TEXT NOT NULL,
    pillar_extensions JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    deleted_at TIMESTAMPTZ
);
CREATE UNIQUE INDEX IF NOT EXISTS vehicle_types_code_active_uq ON royale_one.vehicle_types (code) WHERE deleted_at IS NULL;
CREATE OR REPLACE TRIGGER trg_vehicle_types_updated_at BEFORE UPDATE ON royale_one.vehicle_types FOR EACH ROW EXECUTE FUNCTION royale_one.royale_touch_updated_at();

CREATE TABLE IF NOT EXISTS royale_one.report_types (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    code TEXT NOT NULL,
    label TEXT NOT NULL,
    pillar_extensions JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    deleted_at TIMESTAMPTZ
);
CREATE UNIQUE INDEX IF NOT EXISTS report_types_code_active_uq ON royale_one.report_types (code) WHERE deleted_at IS NULL;
CREATE OR REPLACE TRIGGER trg_report_types_updated_at BEFORE UPDATE ON royale_one.report_types FOR EACH ROW EXECUTE FUNCTION royale_one.royale_touch_updated_at();

-- Each INSERT must use WHERE NOT EXISTS (...), not WHERE NOT (SELECT ...) without EXISTS.
INSERT INTO royale_one.roles (id, name, description)
SELECT gen_random_uuid(), v.name, v.description
FROM (VALUES ('user', 'Standard member / traveler'), ('driver', 'Mobility supply profile'), ('admin', 'Internal operator')) AS v(name, description)
WHERE NOT EXISTS (SELECT 1 FROM royale_one.roles r WHERE r.name = v.name AND r.deleted_at IS NULL);

INSERT INTO royale_one.score_dimensions (id, code, label)
SELECT gen_random_uuid(), v.code, v.label
FROM (VALUES ('authenticity', 'Anti-tourist-trap / local signal score')) AS v(code, label)
WHERE NOT EXISTS (SELECT 1 FROM royale_one.score_dimensions s WHERE s.code = v.code AND s.deleted_at IS NULL);

INSERT INTO royale_one.vehicle_types (id, code, label)
SELECT gen_random_uuid(), v.code, v.label
FROM (VALUES ('car', 'Car'), ('van', 'Van'), ('mpv', 'MPV')) AS v(code, label)
WHERE NOT EXISTS (SELECT 1 FROM royale_one.vehicle_types t WHERE t.code = v.code AND t.deleted_at IS NULL);

INSERT INTO royale_one.report_types (id, code, label)
SELECT gen_random_uuid(), v.code, v.label
FROM (VALUES ('theft', 'Theft or attempted theft'), ('suspicious', 'Suspicious activity'), ('crowded_unsafe', 'Crowded / unsafe area')) AS v(code, label)
WHERE NOT EXISTS (SELECT 1 FROM royale_one.report_types rt WHERE rt.code = v.code AND rt.deleted_at IS NULL);
