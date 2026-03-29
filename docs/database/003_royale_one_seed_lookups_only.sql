-- =============================================================================
-- Royale One — lookup seeds ONLY (no DO block: each INSERT is its own statement)
-- Database: royale_one | Ctrl+A then F5. Messages should show INSERT 0 1 or INSERT 0 0 per line.
-- =============================================================================

SET search_path TO royale_one, public;

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

SELECT 'roles' AS t, count(*)::bigint AS n_active FROM royale_one.roles WHERE deleted_at IS NULL
UNION ALL SELECT 'score_dimensions', count(*) FROM royale_one.score_dimensions WHERE deleted_at IS NULL
UNION ALL SELECT 'vehicle_types', count(*) FROM royale_one.vehicle_types WHERE deleted_at IS NULL
UNION ALL SELECT 'report_types', count(*) FROM royale_one.report_types WHERE deleted_at IS NULL;
