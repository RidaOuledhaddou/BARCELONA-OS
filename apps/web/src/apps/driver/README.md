# Driver dashboard (Earnings tool)

**Persona:** supply-side drivers.

**Data access (target):**

- `royale_one.drivers`, `vehicles`, `vehicle_types` — status and compliance.
- Inferred demand cells and job offers from orchestration layer (mocked shapes in static phase).
- Map viewport shared via `SharedMapViewport` (`persona="driver"`); customize via props only.

**Routes:** `/[locale]/driver`, `/[locale]/driver/fleet/status`.

**Shell:** `DriverDashboardShell` for Next `app/[locale]/driver/layout.tsx`.
