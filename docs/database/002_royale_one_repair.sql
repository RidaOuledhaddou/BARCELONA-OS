-- =============================================================================
-- Royale One — repair / align DB with 001_royale_one_mvp.sql
-- Database: royale_one | Query Tool: prefer Ctrl+A then F5 (entire script).
--
-- Seeds run FIRST as separate INSERT statements (no DO block) so one failure
-- does not roll back the rest. For seeds only, use 003_royale_one_seed_lookups_only.sql
-- =============================================================================

SET search_path TO royale_one, public;

-- -----------------------------------------------------------------------------
-- A) Lookup seeds — one INSERT per row (no DO block; safe partial reruns)
-- -----------------------------------------------------------------------------
INSERT INTO royale_one.roles (id, name, description)
SELECT gen_random_uuid(), 'user', 'Standard member / traveler'
WHERE NOT EXISTS (SELECT 1 FROM royale_one.roles r WHERE r.name = 'user' AND r.deleted_at IS NULL);
INSERT INTO royale_one.roles (id, name, description)
SELECT gen_random_uuid(), 'driver', 'Mobility supply profile'
WHERE NOT EXISTS (SELECT 1 FROM royale_one.roles r WHERE r.name = 'driver' AND r.deleted_at IS NULL);
INSERT INTO royale_one.roles (id, name, description)
SELECT gen_random_uuid(), 'admin', 'Internal operator'
WHERE NOT EXISTS (SELECT 1 FROM royale_one.roles r WHERE r.name = 'admin' AND r.deleted_at IS NULL);

INSERT INTO royale_one.score_dimensions (id, code, label)
SELECT gen_random_uuid(), 'authenticity', 'Anti-tourist-trap / local signal score'
WHERE NOT EXISTS (SELECT 1 FROM royale_one.score_dimensions s WHERE s.code = 'authenticity' AND s.deleted_at IS NULL);

INSERT INTO royale_one.vehicle_types (id, code, label)
SELECT gen_random_uuid(), 'car', 'Car'
WHERE NOT EXISTS (SELECT 1 FROM royale_one.vehicle_types t WHERE t.code = 'car' AND t.deleted_at IS NULL);
INSERT INTO royale_one.vehicle_types (id, code, label)
SELECT gen_random_uuid(), 'van', 'Van'
WHERE NOT EXISTS (SELECT 1 FROM royale_one.vehicle_types t WHERE t.code = 'van' AND t.deleted_at IS NULL);
INSERT INTO royale_one.vehicle_types (id, code, label)
SELECT gen_random_uuid(), 'mpv', 'MPV'
WHERE NOT EXISTS (SELECT 1 FROM royale_one.vehicle_types t WHERE t.code = 'mpv' AND t.deleted_at IS NULL);

INSERT INTO royale_one.report_types (id, code, label)
SELECT gen_random_uuid(), 'theft', 'Theft or attempted theft'
WHERE NOT EXISTS (SELECT 1 FROM royale_one.report_types rt WHERE rt.code = 'theft' AND rt.deleted_at IS NULL);
INSERT INTO royale_one.report_types (id, code, label)
SELECT gen_random_uuid(), 'suspicious', 'Suspicious activity'
WHERE NOT EXISTS (SELECT 1 FROM royale_one.report_types rt WHERE rt.code = 'suspicious' AND rt.deleted_at IS NULL);
INSERT INTO royale_one.report_types (id, code, label)
SELECT gen_random_uuid(), 'crowded_unsafe', 'Crowded / unsafe area'
WHERE NOT EXISTS (SELECT 1 FROM royale_one.report_types rt WHERE rt.code = 'crowded_unsafe' AND rt.deleted_at IS NULL);

-- -----------------------------------------------------------------------------
-- B) Verification (expect n_active: roles 3, score_dimensions 1, vehicle_types 3, report_types 3)
-- -----------------------------------------------------------------------------
SELECT 'roles' AS t, count(*)::bigint AS n_active FROM royale_one.roles WHERE deleted_at IS NULL
UNION ALL SELECT 'score_dimensions', count(*) FROM royale_one.score_dimensions WHERE deleted_at IS NULL
UNION ALL SELECT 'vehicle_types', count(*) FROM royale_one.vehicle_types WHERE deleted_at IS NULL
UNION ALL SELECT 'report_types', count(*) FROM royale_one.report_types WHERE deleted_at IS NULL;

-- -----------------------------------------------------------------------------
-- 1) Stray duplicate users table in public
-- -----------------------------------------------------------------------------
DROP TABLE IF EXISTS public.users CASCADE;

-- -----------------------------------------------------------------------------
-- 2) Align pg_trgm with 001 (extension objects in public)
-- -----------------------------------------------------------------------------
DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM pg_extension e
    JOIN pg_namespace n ON n.oid = e.extnamespace
    WHERE e.extname = 'pg_trgm'
      AND n.nspname <> 'public'
  ) THEN
    ALTER EXTENSION pg_trgm SET SCHEMA public;
  END IF;
END;
$$;

-- -----------------------------------------------------------------------------
-- 3) Trigger function
-- -----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION royale_one.royale_touch_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS 'BEGIN NEW.updated_at := now(); RETURN NEW; END;';

-- -----------------------------------------------------------------------------
-- 4) Indexes (IF NOT EXISTS)
-- -----------------------------------------------------------------------------
CREATE UNIQUE INDEX IF NOT EXISTS users_email_active_uq ON royale_one.users (lower(email)) WHERE deleted_at IS NULL;

CREATE UNIQUE INDEX IF NOT EXISTS vehicles_plate_active_uq ON royale_one.vehicles (plate_number) WHERE deleted_at IS NULL;

CREATE INDEX IF NOT EXISTS idx_places_lat_lon ON royale_one.places (latitude, longitude) WHERE deleted_at IS NULL;

CREATE INDEX IF NOT EXISTS idx_places_name_trgm ON royale_one.places USING gin (name public.gin_trgm_ops);

CREATE INDEX IF NOT EXISTS idx_safety_reports_lat_lon ON royale_one.safety_reports (latitude, longitude) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_safety_reports_created_at ON royale_one.safety_reports (created_at DESC) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_safety_reports_type_time ON royale_one.safety_reports (type_id, created_at DESC) WHERE deleted_at IS NULL;

CREATE INDEX IF NOT EXISTS idx_risk_zones_area_geojson ON royale_one.risk_zones USING gin (area_geojson jsonb_path_ops);

CREATE INDEX IF NOT EXISTS idx_outbox_unprocessed ON royale_one.domain_event_outbox (created_at) WHERE processed_at IS NULL AND deleted_at IS NULL;

CREATE UNIQUE INDEX IF NOT EXISTS place_external_refs_source_id_active_uq ON royale_one.place_external_refs (source, external_id) WHERE deleted_at IS NULL;

-- -----------------------------------------------------------------------------
-- 5) Triggers — OR REPLACE so running only the CREATE line does not error (PG14+)
-- -----------------------------------------------------------------------------
CREATE OR REPLACE TRIGGER trg_user_roles_updated_at BEFORE UPDATE ON royale_one.user_roles FOR EACH ROW EXECUTE FUNCTION royale_one.royale_touch_updated_at();

CREATE OR REPLACE TRIGGER trg_drivers_updated_at BEFORE UPDATE ON royale_one.drivers FOR EACH ROW EXECUTE FUNCTION royale_one.royale_touch_updated_at();

CREATE OR REPLACE TRIGGER trg_vehicle_types_updated_at BEFORE UPDATE ON royale_one.vehicle_types FOR EACH ROW EXECUTE FUNCTION royale_one.royale_touch_updated_at();

CREATE OR REPLACE TRIGGER trg_vehicles_updated_at BEFORE UPDATE ON royale_one.vehicles FOR EACH ROW EXECUTE FUNCTION royale_one.royale_touch_updated_at();

CREATE OR REPLACE TRIGGER trg_categories_updated_at BEFORE UPDATE ON royale_one.categories FOR EACH ROW EXECUTE FUNCTION royale_one.royale_touch_updated_at();

CREATE OR REPLACE TRIGGER trg_places_updated_at BEFORE UPDATE ON royale_one.places FOR EACH ROW EXECUTE FUNCTION royale_one.royale_touch_updated_at();

CREATE OR REPLACE TRIGGER trg_place_categories_updated_at BEFORE UPDATE ON royale_one.place_categories FOR EACH ROW EXECUTE FUNCTION royale_one.royale_touch_updated_at();

CREATE OR REPLACE TRIGGER trg_place_external_refs_updated_at BEFORE UPDATE ON royale_one.place_external_refs FOR EACH ROW EXECUTE FUNCTION royale_one.royale_touch_updated_at();

CREATE OR REPLACE TRIGGER trg_score_dimensions_updated_at BEFORE UPDATE ON royale_one.score_dimensions FOR EACH ROW EXECUTE FUNCTION royale_one.royale_touch_updated_at();

CREATE OR REPLACE TRIGGER trg_place_scores_updated_at BEFORE UPDATE ON royale_one.place_scores FOR EACH ROW EXECUTE FUNCTION royale_one.royale_touch_updated_at();

CREATE OR REPLACE TRIGGER trg_report_types_updated_at BEFORE UPDATE ON royale_one.report_types FOR EACH ROW EXECUTE FUNCTION royale_one.royale_touch_updated_at();

CREATE OR REPLACE TRIGGER trg_safety_reports_updated_at BEFORE UPDATE ON royale_one.safety_reports FOR EACH ROW EXECUTE FUNCTION royale_one.royale_touch_updated_at();

CREATE OR REPLACE TRIGGER trg_risk_zones_updated_at BEFORE UPDATE ON royale_one.risk_zones FOR EACH ROW EXECUTE FUNCTION royale_one.royale_touch_updated_at();

CREATE OR REPLACE TRIGGER trg_domain_event_outbox_updated_at BEFORE UPDATE ON royale_one.domain_event_outbox FOR EACH ROW EXECUTE FUNCTION royale_one.royale_touch_updated_at();

CREATE OR REPLACE TRIGGER trg_users_updated_at BEFORE UPDATE ON royale_one.users FOR EACH ROW EXECUTE FUNCTION royale_one.royale_touch_updated_at();

CREATE OR REPLACE TRIGGER trg_roles_updated_at BEFORE UPDATE ON royale_one.roles FOR EACH ROW EXECUTE FUNCTION royale_one.royale_touch_updated_at();
