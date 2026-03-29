# User dashboard (Concierge / journey-decision-center)

**Persona:** passenger, decision-centric mobility.

**Data access (target):**

- Journey options and comparisons (`@dashboard/modules/mobility`).
- `royale_one.risk_zones` GeoJSON surfaced through `UserJourneyChoiceCards` + `SharedMapViewport` (`persona="user"`), overlays via props.
- `places` / `place_scores` for authenticity hints on adjacent routes (later).

**Routes:** `/[locale]/user` (concierge home).

**Shell:** `UserDashboardShell` for Next `app/[locale]/user/layout.tsx`.
