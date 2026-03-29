# Royale One — Static Dashboard Frontend Roadmap

**Status:** Implementation guide (no backend).  
**References:** `docs/database/001_royale_one_mvp.sql`, `002`/`003` seeds, `docs/INTELLIGENT_LAYER.md`, `docs/CITY_DECISION_ENGINE_STRATEGY.md`.

---

## 1. Stack and principles

| Layer | Choice |
|-------|--------|
| Framework | Next.js App Router (`apps/web`) |
| Styling | Tailwind CSS 4 |
| UI primitives | shadcn/ui (add to project): tables, dialogs, cards, badges, scroll-area |
| Icons | `lucide-react` (already in repo) |
| Data | Hardcoded TypeScript/JSON mocks in `apps/web/lib/dashboard-mocks/` |
| i18n | `next-intl` — dashboard strings under `messages/{locale}.json` |

**Mock discipline:** Field names align with `royale_one.*` columns where applicable. Use `pillar_extensions` and `place_scores.details` JSON for Intelligent Layer signal placeholders. Include optional `correlationId` / `eventType` on entities that will later map to `domain_event_outbox`.

**Maps:** Phase 1 uses placeholders (static frame or empty Mapbox div). No API keys required for static UI.

---

## 2. Routing (all personas)

| Persona | Path (under `[locale]`) | Notes |
|---------|-------------------------|--------|
| Admin | `/dashboard/admin` | City OS |
| User (passenger) | `/dashboard` or `/trip` | Decision Center |
| Driver | `/dashboard/driver` | Supply Tool |

Shared: layout with sidebar + top bar; optional **dev-only** persona switcher linking the three routes.

---

# Phase 1 — Admin Dashboard (City OS)

**Goal:** High-fidelity static UI for trust, risk assets, authenticity scores, and event-pipeline visibility.

---

## 2.1. Deliverables checklist

| # | Feature | Description |
|---|---------|---------------|
| 1 | Types + mock loaders | Types mirror `001` entities; mocks respect `003` lookup codes where used |
| 2 | Admin shell layout | Sidebar nav: Moderation · Risk zones · Authenticity · Outbox (stub) |
| 3 | Moderation Inbox | Kanban by `safety_reports.moderation_status` |
| 4 | Risk Zone Editor | GeoJSON fields + map placeholder + zone list |
| 5 | Authenticity Inspector | Table of `place_scores` with expandable `details` |
| 6 | Outbox stub | Read-only table shaped like `domain_event_outbox` |

---

## 2.2. Moderation Inbox (Kanban)

**Schema anchor:** `royale_one.safety_reports`, `royale_one.report_types`.

**Columns (lanes):**

- `pending`
- `visible`
- `rejected`
- `hidden`

**Card content (per row):**

- Report type label (join mock `report_types.code` / `label`)
- Truncated `description`
- `latitude` / `longitude` (short display)
- `created_at`
- Optional `user_id` (or “Anonymous” if null)

**Interactions (static phase):**

- Click card → side **drawer** with full record + raw `pillar_extensions` JSON (read-only)
- Drag-and-drop between columns: optional Phase 1b; otherwise column filters only

**Intelligent Layer alignment:** Copy uses **relative** language; no “guaranteed safe.” Moderation supports **Layer 2** crowdsourced signals from INTELLIGENT_LAYER.

---

## 2.3. Risk Zone Editor

**Schema anchor:** `royale_one.risk_zones`.

**Form fields:**

- `risk_score` (number)
- `source` — select: `official` | `crowd` | `inferred` | `blended`
- `priority` (integer)
- `effective_from` / `effective_to` (datetime-local or ISO strings in mock)
- `area_geojson` — large textarea (JSON); validate parse client-side; show error line if invalid

**Map area:**

- Placeholder block: label e.g. “Map preview (static)” + optional bounding box image or grey canvas

**Side panel:**

- Table/list of existing zones: `id`, `source`, `risk_score`, effective window summary

---

## 2.4. Authenticity Inspector

**Schema anchors:** `royale_one.place_scores`, `royale_one.score_dimensions`, `royale_one.places`.

**Table columns:**

- Place name (from joined `places`)
- Dimension `code` / `label` (e.g. `authenticity`)
- `score`
- `rule_version`
- `calculated_at`

**Expand row:**

- Render `details` JSON as **signal breakdown** (key/value), e.g. mock keys aligned with INTELLIGENT_LAYER: `repeat_score`, `local_movement_pattern`, `price_deviation`, `time_pattern_match`, etc.

**No star ratings** in UI.

---

## 2.5. Outbox stub (future integration)

**Schema anchor:** `royale_one.domain_event_outbox`.

**Read-only table:**

- `event_type`, `schema_version`, `created_at`, `processed_at`, `correlation_id`, `producer`

Prepares Admin for replay/monitoring when backend writes real rows.

---

## 2.6. Phase 1 implementation order

1. Types + mock modules  
2. Admin layout + navigation  
3. Moderation Inbox  
4. Risk Zone Editor  
5. Authenticity Inspector  
6. Outbox stub  

---

# Phase 2 — User Dashboard (Decision Center)

**Goal:** Static “decision layer” UX — ranked mobility options, safe vs fast route comparison, authenticity-first place hints.

---

## 3.1. Deliverables checklist

| # | Feature | Description |
|---|---------|---------------|
| 1 | Journey mocks | Options: Metro, Taxi, Hybrid; times, costs, risk bands, explanations |
| 2 | Ranked option cards | Visual comparison; “why” text; GTFS-RT degradation flag |
| 3 | Split-map view | Fastest vs recommended safe route (mock GeoJSON polylines) |
| 4 | Authenticity strip | Place cards with structural signals from `details`-shaped mocks |
| 5 | Disclaimer block | Short static copy (INTELLIGENT_LAYER legal/confidence tone) |

---

## 3.2. Ranked option cards

**Data shape (mock, not in SQL yet):**

- `mode`: `metro` | `taxi` | `hybrid`
- `duration_min`, `cost_eur`
- `risk_band`: e.g. `low` | `medium` | `high` + optional numeric
- `rank`, `summary_bullets[]`, `confidence_note`
- `gtfs_rt_degraded`: boolean (graceful degradation narrative)

**UI:**

- Card per option: icon, duration, cost, **risk band** chip (icon + text, not color-only)
- Primary CTA disabled: “Reserve / book — coming soon”

---

## 3.3. Split-map view

**Layout:**

- Two equal panels: **Fastest route** | **Recommended safe route**
- Each: map placeholder + mock **LineString** or static polyline illustration
- Shared **legend:** risk gradient meaning (relative, not absolute safety)

**Copy example (static):** “+3 min vs fastest — avoids higher relative exposure in [zone label]”

---

## 3.4. Authenticity strip (place cards)

**Data:** Reuse `places` + `place_scores`-style mocks.

**Per card:**

- Name, optional category
- **Structural signals** only (from `details`): e.g. vs area median, local mix, volatility — **no star row**

---

## 3.5. Phase 2 implementation order

1. Journey + place mock types  
2. Ranked option cards section  
3. Split-map section  
4. Authenticity strip (horizontal scroll or grid)  
5. Disclaimer component  

---

# Phase 3 — Driver Dashboard (Supply Tool)

**Goal:** Static supply-side UI — inferred demand, job offers, vehicle compliance.

---

## 4.1. Deliverables checklist

| # | Feature | Description |
|---|---------|---------------|
| 1 | Driver / vehicle mocks | From `drivers`, `vehicles`, `vehicle_types` |
| 2 | Demand heatmap UI | Map placeholder + legend “Inferred demand” |
| 3 | Job card stack | ETA, distance, pickup risk summary, `correlationId` |
| 4 | Vehicle status panel | Plate, type, verification badge, driver status |

---

## 4.2. Demand heatmap interface

**Mock data:**

- Grid cells or zones: `id`, `inferred_score` (0–100), `label`, `time_window`

**UI:**

- Full-width map placeholder  
- **Legend:** gradient or steps labeled “Inferred demand (model v0)”  
- Side list: top N zones by score  

**Intelligent Layer:** Copy states estimates are **inferred** (historical / TOD / zone — strategy doc), not live operator API.

---

## 4.3. Job card stack

**Mock shape:**

- `id`, `pickup_label`, `eta_min`, `distance_km`
- `pickup_risk_band` + one-line summary
- `correlation_id` (UUID string) for future outbox linkage

**UI:**

- Stacked cards; Accept / Decline buttons (no-op, static)

---

## 4.4. Vehicle status panel

**Schema anchors:** `vehicles`, `vehicle_types`, `drivers`.

**Display:**

- `plate_number`, vehicle type label  
- `verified` badge (boolean)  
- Driver `status`: `offline` | `online` | `busy` | `suspended`  

---

## 4.5. Phase 3 implementation order

1. Driver/vehicle/job/demand mocks  
2. Vehicle status panel (compact, top or sidebar)  
3. Demand heatmap + legend  
4. Job card stack  

---

# 5. Cross-cutting (all phases)

| Topic | Guidance |
|-------|----------|
| Components | `app/[locale]/dashboard/_components/{admin,user,driver}/` + shared primitives after shadcn install |
| Event readiness | Optional `correlationId`, `eventType` on journey/job mocks |
| Accessibility | Kanban focus order; table headers; risk not color-only |
| Testing | Smoke: routes render; no network required |

---

# 6. Recommendation: what to build first

| Option | Rationale |
|--------|-----------|
| **Phase 1 first (recommended)** | Tightest coupling to existing SQL (`safety_reports`, `risk_zones`, `place_scores`, `domain_event_outbox`); no map vendor; establishes tables, drawers, JSON viewers for the whole program. |
| **Phase 2 first** | Best for stakeholder demos of the “decision layer” story before Admin is polished. |
| **Phase 3 first** | Use after Phase 1 outbox stub + Phase 2 `correlation_id` pattern so driver jobs feel on the same event story. |

---

*Update this document when schema or Intelligent Layer docs change.*
