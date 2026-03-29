"use client";

import { GlassCard } from "@dashboard/components/shared/GlassCard";

/** Risk zone form + GeoJSON editor (wire through @dashboard/modules/safety later). */
export function AdminRiskZoneEditor() {
  return (
    <GlassCard>
      <p className="text-xs font-semibold uppercase tracking-wider text-[var(--fg)]">
        Risk zones
      </p>
      <p className="mt-2 text-sm text-[rgb(var(--muted-rgb))]">Boilerplate · editor shell</p>
    </GlassCard>
  );
}
