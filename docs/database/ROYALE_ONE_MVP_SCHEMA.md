# Royale One — MVP database schema (PostgreSQL 18)

**Artifacts in this doc:** UUID strategy, Mermaid ER diagram, full DDL (copy into `001_royale_one_mvp.sql` or run from psql), index rationale, migration path to future pillars.

**Related:** [INTELLIGENT_LAYER.md](../INTELLIGENT_LAYER.md). (Internal plan: MVP schema foundation review in `.cursor/plans`.)

---

## Why UUID primary keys (not `SERIAL` / `BIGINT`) for Royale One

| Topic | UUID (v4 `gen_random_uuid()` or v7 when available) | `BIGSERIAL` |
|--------|---------------------------------------------------|-----------|
| **Distributed systems** | IDs can be created on app servers or mobile **without** a single DB round-trip sequence coordinator. | Sequence is a **single-writer** hotspot and harder to merge across shards. |
| **Sharding / fan-out** | Natural keys for **partitioning** or routing (hash user id) without exposing sequential user counts. | Sequential IDs **leak** signup rate and are easier to scrape. |
| **Merging data** | Import from staging or another region **without** PK collisions. | Collisions unless you renumber. |
| **ORM / API exposure** | Same string shape everywhere (URLs, JWT `sub`, logs). | Mixed int/uuid across services is painful. |

**UUID v7 (when you enable it):** time-ordered, better **index locality** on clustered PKs than random v4. On PostgreSQL 18, check whether `uuidv7()` exists in your build; otherwise keep `gen_random_uuid()` until you add an extension.

**Trade-off:** UUIDs use more space than `bigint`; for Royale One’s entity counts this is a good exchange for **operational flexibility**.

---

## Entity–relationship diagram (Mermaid)

```mermaid
erDiagram
  users ||--o{ user_roles : has
  roles ||--o{ user_roles : grants
  users ||--o| drivers : extends
  drivers ||--o{ vehicles : owns
  vehicle_types ||--o{ vehicles : classifies
  places ||--o{ place_categories : tagged
  categories ||--o{ place_categories : tagged
  places ||--o{ place_external_refs : synced
  places ||--o{ place_scores : scored
  score_dimensions ||--o{ place_scores : dimension
  report_types ||--o{ safety_reports : typed
  users ||--o{ safety_reports : submits
  users {
    uuid id PK
    text email
    timestamptz deleted_at
  }
  roles {
    uuid id PK
    text name
  }
  user_roles {
    uuid user_id PK_FK
    uuid role_id PK_FK
  }
  drivers {
    uuid id PK_FK
  }
  vehicles {
    uuid id PK
    uuid driver_id FK
  }
  places {
    uuid id PK
    geography location
  }
  place_scores {
    uuid place_id PK_FK
    uuid dimension_id PK_FK
  }
  safety_reports {
    uuid id PK
    uuid user_id FK_nullable
  }
  risk_zones {
    uuid id PK
    geography area
  }
  domain_event_outbox {
    uuid id PK
    timestamptz processed_at
  }
```

**Cardinality notes**

- **users → drivers:** one-to-one optional (`drivers.id` = `users.id`).
- **users ↔ roles:** many-to-many via `user_roles`.
- **places ↔ categories:** many-to-many via `place_categories`.
- **place_scores:** many-to-one to `places`, composite PK `(place_id, dimension_id)`.
- **risk_zones:** standalone polygons (no FK to places in MVP); join in queries by `ST_Covers` / `ST_Intersects`.

---

## Foreign key `ON DELETE` summary

| Relationship | ON DELETE | Reason |
|--------------|-----------|--------|
| `user_roles.user_id` → `users` | **CASCADE** | Membership dies with hard-deleted user. |
| `user_roles.role_id` → `roles` | **RESTRICT** | Cannot delete a role still assigned. |
| `drivers.id` → `users` | **CASCADE** | Driver profile is an extension of the user row. |
| `vehicles.driver_id` → `drivers` | **CASCADE** | Vehicles belong to the driver account. |
| `vehicles.vehicle_type_id` | **RESTRICT** | Keep type dictionary stable. |
| `place_categories` → `places` | **CASCADE** | Tags removed with place. |
| `place_categories` → `categories` | **RESTRICT** | Cannot delete category in use. |
| `place_external_refs`, `place_scores` → `places` | **CASCADE** | Child data removed with place. |
| `place_scores.dimension_id` | **RESTRICT** | Keep dimension dictionary stable. |
| `safety_reports.user_id` → `users` | **SET NULL** | GDPR: delete user but keep anonymised report. |
| `safety_reports.type_id` | **RESTRICT** | Keep type stable. |

Soft deletes: application should **filter `deleted_at IS NULL`**; hard deletes use the rules above.

---

## Indexes (MVP query patterns)

| Index | Type | Supports |
|-------|------|----------|
| `places` GIST(`location`) | GiST | Nearby places (full index; no partial `WHERE` on geo). |
| `safety_reports` GIST(`location`) | GiST | Reports near a point. |
| `risk_zones` GIST(`area`) | GiST | Point-in-polygon risk lookup. |
| `places` GIN(`name` gin_trgm_ops) | GIN + `pg_trgm` | Name search / `ILIKE`. |
| `safety_reports (created_at DESC)` partial | B-tree | “Recent reports” feed. |
| `safety_reports (type_id, created_at DESC)` partial | B-tree | Filter by type + time window. |
| `domain_event_outbox (created_at)` WHERE `processed_at IS NULL` | B-tree | Outbox poller. |
| Partial **UNIQUE** on `users(lower(email))`, `roles(name)`, etc. | Unique | Enforce uniqueness **among active rows** only (`deleted_at IS NULL`). |

Optional later: **partition** `safety_reports` / `domain_event_outbox` by month when volume grows.

---

## `pillar_extensions` JSONB (temporary pillar data)

- On **users**, **places**, **drivers**, **vehicles**, and reference tables: `pillar_extensions JSONB NOT NULL DEFAULT '{}'::jsonb`.
- **Use for:** flags or small blobs for a pillar **not** yet modelled (e.g. experiment, partner beta).
- **Rule:** when a pillar ships, **migrate** keys into real columns/tables and **strip** the JSON key in a data migration; do not let JSON become the permanent source of truth for money or legal fields.

---

## Migration strategy: MVP → future pillars (no breaking changes)

1. **Keep stable:** `users.id`, `places.id`, `roles`, `categories`, `score_dimensions.code`, geography columns. New pillars **add tables** with FKs to these UUIDs.
2. **Trips / dispatch:** `trips` (`id`, `passenger_user_id`, `driver_id` nullable, `pickup_place_id` nullable, …) — references existing tables only.
3. **Stays / bookings:** `listings`, `bookings` — separate from `places` unless you explicitly model hotels as `places`; prefer FK to `places` only when the same entity.
4. **GTFS:** New schema `transit_*` or prefix `gtfs_agencies`, `gtfs_stops`, … — **no** FK from `places` to `stops` until linking rules exist; optional `place_stop_links(place_id, stop_id, distance_m)`.
5. **Payments:** `wallets`, `ledger_entries` — never stuff into `pillar_extensions`; new tables + strong ACID.
6. **Score history:** Add `place_score_history` or SCD2 columns without dropping `place_scores`; backfill from current rows.
7. **Outbox → Kafka:** Keep inserting `domain_event_outbox`; worker publishes and sets `processed_at`; later add external topic without renaming MVP table.

---

## Complete SQL DDL

Save the following as `docs/database/001_royale_one_mvp.sql` (or run in pgAdmin).

**Database:** Create and use **`royale_one`** (not `postgres`). In pgAdmin, open **Query Tool** on **Databases → royale_one**, then run the script.

**Schema:** The script creates schema **`royale_one`** and sets `search_path` so all MVP tables, indexes, triggers, and the `royale_touch_updated_at` function live in `royale_one`. Extensions (`postgis`, `pg_trgm`) remain in `public` as usual.

**Note:** Triggers call `royale_one.royale_touch_updated_at()` with `EXECUTE FUNCTION` (PostgreSQL 14+ including 18). The function is schema-qualified so it works even if `search_path` changes.

**Seed `INSERT`s:** The last line of each seed must be `WHERE NOT EXISTS (SELECT 1 FROM ...)` — not `WHERE NOT (SELECT 1 ...)` without `EXISTS` (that is a syntax error).

```sql
-- =============================================================================
-- Royale One - MVP schema (PostgreSQL 16+ / 18+)
-- Database: royale_one  |  Tables + trigger function in schema "royale_one".
-- Extensions (postgis, pg_trgm) live in "public" as usual.
-- pgAdmin: Query Tool on database royale_one -> Open 001_royale_one_mvp.sql -> Execute (F5).
-- Run the ENTIRE script from the top (do not skip CREATE SCHEMA / search_path).
-- =============================================================================

CREATE SCHEMA IF NOT EXISTS royale_one;
SET search_path TO royale_one, public;

CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS pg_trgm;

CREATE OR REPLACE FUNCTION royale_one.royale_touch_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at := now();
  RETURN NEW;
END;
$$;

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
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
CREATE UNIQUE INDEX users_email_active_uq ON users (lower(email)) WHERE deleted_at IS NULL;
CREATE UNIQUE INDEX users_phone_active_uq ON users (phone) WHERE phone IS NOT NULL AND deleted_at IS NULL;
CREATE TRIGGER trg_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION royale_one.royale_touch_updated_at();

CREATE TABLE roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    pillar_extensions JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    deleted_at TIMESTAMPTZ
);
CREATE UNIQUE INDEX roles_name_active_uq ON roles (name) WHERE deleted_at IS NULL;
CREATE TRIGGER trg_roles_updated_at BEFORE UPDATE ON roles FOR EACH ROW EXECUTE FUNCTION royale_one.royale_touch_updated_at();

CREATE TABLE user_roles (
    user_id UUID NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    role_id UUID NOT NULL REFERENCES roles (id) ON DELETE RESTRICT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    deleted_at TIMESTAMPTZ,
    PRIMARY KEY (user_id, role_id)
);
CREATE TRIGGER trg_user_roles_updated_at BEFORE UPDATE ON user_roles FOR EACH ROW EXECUTE FUNCTION royale_one.royale_touch_updated_at();

CREATE TABLE drivers (
    id UUID PRIMARY KEY REFERENCES users (id) ON DELETE CASCADE,
    license_number TEXT,
    verified BOOLEAN NOT NULL DEFAULT false,
    status TEXT NOT NULL DEFAULT 'offline'
      CHECK (status IN ('offline', 'online', 'busy', 'suspended')),
    pillar_extensions JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    deleted_at TIMESTAMPTZ
);
CREATE UNIQUE INDEX drivers_license_active_uq ON drivers (license_number) WHERE license_number IS NOT NULL AND deleted_at IS NULL;
CREATE TRIGGER trg_drivers_updated_at BEFORE UPDATE ON drivers FOR EACH ROW EXECUTE FUNCTION royale_one.royale_touch_updated_at();

CREATE TABLE vehicle_types (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code TEXT NOT NULL,
    label TEXT NOT NULL,
    pillar_extensions JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    deleted_at TIMESTAMPTZ
);
CREATE UNIQUE INDEX vehicle_types_code_active_uq ON vehicle_types (code) WHERE deleted_at IS NULL;
CREATE TRIGGER trg_vehicle_types_updated_at BEFORE UPDATE ON vehicle_types FOR EACH ROW EXECUTE FUNCTION royale_one.royale_touch_updated_at();

CREATE TABLE vehicles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    driver_id UUID NOT NULL REFERENCES drivers (id) ON DELETE CASCADE,
    vehicle_type_id UUID REFERENCES vehicle_types (id) ON DELETE RESTRICT,
    brand TEXT,
    model TEXT,
    plate_number TEXT NOT NULL,
    pillar_extensions JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    deleted_at TIMESTAMPTZ
);
CREATE UNIQUE INDEX vehicles_plate_active_uq ON vehicles (plate_number) WHERE deleted_at IS NULL;
CREATE INDEX idx_vehicles_driver ON vehicles (driver_id) WHERE deleted_at IS NULL;
CREATE TRIGGER trg_vehicles_updated_at BEFORE UPDATE ON vehicles FOR EACH ROW EXECUTE FUNCTION royale_one.royale_touch_updated_at();

CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT,
    pillar_extensions JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    deleted_at TIMESTAMPTZ
);
CREATE UNIQUE INDEX categories_name_active_uq ON categories (name) WHERE deleted_at IS NULL;
CREATE TRIGGER trg_categories_updated_at BEFORE UPDATE ON categories FOR EACH ROW EXECUTE FUNCTION royale_one.royale_touch_updated_at();

CREATE TABLE places (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    location GEOGRAPHY(POINT, 4326) NOT NULL,
    price_level SMALLINT CHECK (price_level IS NULL OR (price_level >= 1 AND price_level <= 5)),
    is_active BOOLEAN NOT NULL DEFAULT true,
    pillar_extensions JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    deleted_at TIMESTAMPTZ
);
-- Full GiST (no partial WHERE): avoids rare PostGIS + partial-index issues in pgAdmin.
CREATE INDEX idx_places_location_gist ON places USING GIST (location);
CREATE INDEX idx_places_active ON places (is_active) WHERE deleted_at IS NULL;
CREATE INDEX idx_places_name_trgm ON places USING gin (name gin_trgm_ops);
CREATE TRIGGER trg_places_updated_at BEFORE UPDATE ON places FOR EACH ROW EXECUTE FUNCTION royale_one.royale_touch_updated_at();

CREATE TABLE place_categories (
    place_id UUID NOT NULL REFERENCES places (id) ON DELETE CASCADE,
    category_id UUID NOT NULL REFERENCES categories (id) ON DELETE RESTRICT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    deleted_at TIMESTAMPTZ,
    PRIMARY KEY (place_id, category_id)
);
CREATE TRIGGER trg_place_categories_updated_at BEFORE UPDATE ON place_categories FOR EACH ROW EXECUTE FUNCTION royale_one.royale_touch_updated_at();

CREATE TABLE place_external_refs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    place_id UUID NOT NULL REFERENCES places (id) ON DELETE CASCADE,
    source TEXT NOT NULL,
    external_id TEXT NOT NULL,
    pillar_extensions JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    deleted_at TIMESTAMPTZ
);
CREATE UNIQUE INDEX place_external_refs_source_id_active_uq ON place_external_refs (source, external_id) WHERE deleted_at IS NULL;
CREATE INDEX idx_place_external_refs_place ON place_external_refs (place_id) WHERE deleted_at IS NULL;
CREATE TRIGGER trg_place_external_refs_updated_at BEFORE UPDATE ON place_external_refs FOR EACH ROW EXECUTE FUNCTION royale_one.royale_touch_updated_at();

CREATE TABLE score_dimensions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code TEXT NOT NULL,
    label TEXT NOT NULL,
    pillar_extensions JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    deleted_at TIMESTAMPTZ
);
CREATE UNIQUE INDEX score_dimensions_code_active_uq ON score_dimensions (code) WHERE deleted_at IS NULL;
CREATE TRIGGER trg_score_dimensions_updated_at BEFORE UPDATE ON score_dimensions FOR EACH ROW EXECUTE FUNCTION royale_one.royale_touch_updated_at();

CREATE TABLE place_scores (
    place_id UUID NOT NULL REFERENCES places (id) ON DELETE CASCADE,
    dimension_id UUID NOT NULL REFERENCES score_dimensions (id) ON DELETE RESTRICT,
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
CREATE INDEX idx_place_scores_dimension ON place_scores (dimension_id) WHERE deleted_at IS NULL;
CREATE TRIGGER trg_place_scores_updated_at BEFORE UPDATE ON place_scores FOR EACH ROW EXECUTE FUNCTION royale_one.royale_touch_updated_at();

CREATE TABLE report_types (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code TEXT NOT NULL,
    label TEXT NOT NULL,
    pillar_extensions JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    deleted_at TIMESTAMPTZ
);
CREATE UNIQUE INDEX report_types_code_active_uq ON report_types (code) WHERE deleted_at IS NULL;
CREATE TRIGGER trg_report_types_updated_at BEFORE UPDATE ON report_types FOR EACH ROW EXECUTE FUNCTION royale_one.royale_touch_updated_at();

CREATE TABLE safety_reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users (id) ON DELETE SET NULL,
    type_id UUID NOT NULL REFERENCES report_types (id) ON DELETE RESTRICT,
    location GEOGRAPHY(POINT, 4326) NOT NULL,
    description TEXT,
    moderation_status TEXT NOT NULL DEFAULT 'pending'
      CHECK (moderation_status IN ('pending', 'visible', 'rejected', 'hidden')),
    pillar_extensions JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    deleted_at TIMESTAMPTZ
);
CREATE INDEX idx_safety_reports_location_gist ON safety_reports USING GIST (location);
CREATE INDEX idx_safety_reports_created_at ON safety_reports (created_at DESC) WHERE deleted_at IS NULL;
CREATE INDEX idx_safety_reports_type_time ON safety_reports (type_id, created_at DESC) WHERE deleted_at IS NULL;
CREATE INDEX idx_safety_reports_user ON safety_reports (user_id) WHERE deleted_at IS NULL;
CREATE TRIGGER trg_safety_reports_updated_at BEFORE UPDATE ON safety_reports FOR EACH ROW EXECUTE FUNCTION royale_one.royale_touch_updated_at();

CREATE TABLE risk_zones (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    area GEOGRAPHY(POLYGON, 4326) NOT NULL,
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
CREATE INDEX idx_risk_zones_area_gist ON risk_zones USING GIST (area);
CREATE INDEX idx_risk_zones_effective ON risk_zones (effective_from, effective_to) WHERE deleted_at IS NULL;
CREATE TRIGGER trg_risk_zones_updated_at BEFORE UPDATE ON risk_zones FOR EACH ROW EXECUTE FUNCTION royale_one.royale_touch_updated_at();

CREATE TABLE domain_event_outbox (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_type TEXT NOT NULL,
    schema_version INT NOT NULL DEFAULT 1,
    payload JSONB NOT NULL,
    correlation_id UUID,
    producer TEXT,
    processed_at TIMESTAMPTZ,
    pillar_extensions JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    deleted_at TIMESTAMPTZ
);
CREATE INDEX idx_outbox_unprocessed ON domain_event_outbox (created_at) WHERE processed_at IS NULL AND deleted_at IS NULL;
CREATE INDEX idx_outbox_correlation ON domain_event_outbox (correlation_id) WHERE deleted_at IS NULL;
CREATE TRIGGER trg_domain_event_outbox_updated_at BEFORE UPDATE ON domain_event_outbox FOR EACH ROW EXECUTE FUNCTION royale_one.royale_touch_updated_at();

-- Seeds: each must end with WHERE NOT EXISTS (...), not WHERE NOT (SELECT ...) without EXISTS.
INSERT INTO roles (id, name, description)
SELECT gen_random_uuid(), v.name, v.description
FROM (VALUES ('user', 'Standard member / traveler'), ('driver', 'Mobility supply profile'), ('admin', 'Internal operator')) AS v(name, description)
WHERE NOT EXISTS (SELECT 1 FROM roles r WHERE r.name = v.name AND r.deleted_at IS NULL);

INSERT INTO score_dimensions (id, code, label)
SELECT gen_random_uuid(), v.code, v.label
FROM (VALUES ('authenticity', 'Anti-tourist-trap / local signal score')) AS v(code, label)
WHERE NOT EXISTS (SELECT 1 FROM score_dimensions s WHERE s.code = v.code AND s.deleted_at IS NULL);

INSERT INTO vehicle_types (id, code, label)
SELECT gen_random_uuid(), v.code, v.label
FROM (VALUES ('car', 'Car'), ('van', 'Van'), ('mpv', 'MPV')) AS v(code, label)
WHERE NOT EXISTS (SELECT 1 FROM vehicle_types t WHERE t.code = v.code AND t.deleted_at IS NULL);

INSERT INTO report_types (id, code, label)
SELECT gen_random_uuid(), v.code, v.label
FROM (VALUES ('theft', 'Theft or attempted theft'), ('suspicious', 'Suspicious activity'), ('crowded_unsafe', 'Crowded / unsafe area')) AS v(code, label)
WHERE NOT EXISTS (SELECT 1 FROM report_types rt WHERE rt.code = v.code AND rt.deleted_at IS NULL);
```

---

## Row-Level Security (RLS) and encryption (next hardening step)

This DDL does **not** enable RLS. Before production, add policies per table (e.g. users read own row; drivers read own vehicles). **Encryption at rest** is configured on the host or managed service (RDS, Azure, etc.), not in SQL.

---

## pgAdmin / PostgreSQL version notes

- **Standalone script:** Use `docs/database/001_royale_one_mvp.sql` (kept in sync with the block above). Run it in pgAdmin **Query Tool on database `royale_one`** (empty or first run); the script creates schema **`royale_one`** and all tables inside it.
- Triggers use `EXECUTE FUNCTION royale_one.royale_touch_updated_at()` (PostgreSQL 14+). If your build rejects it, try `EXECUTE PROCEDURE` with the same function name.
- Confirm `postgis` and `pg_trgm` are available in your PG 18 install.
- After first run, **document** role/dimension UUIDs your app seeds rely on, or resolve by `code` in queries.
