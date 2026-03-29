# Admin dashboard (City OS)

**Persona:** operators, trust & safety, risk.

**Data access (target):**

- `royale_one.safety_reports`, `report_types` — moderation queues and drawer payloads (`pillar_extensions`).
- `royale_one.place_scores`, `score_dimensions`, `places` — authenticity table and JSONB `details`.
- `royale_one.risk_zones` — GeoJSON areas (editor route).
- Server loaders or edge BFF later; static phase uses props from `@dashboard/lib/mock-data` shapes.

**Routes:** `/[locale]/admin`, `/[locale]/admin/ops/moderation`.

**Shell:** `layout.tsx` re-exported as `AdminDashboardShell` for Next `app/[locale]/admin/layout.tsx`.
