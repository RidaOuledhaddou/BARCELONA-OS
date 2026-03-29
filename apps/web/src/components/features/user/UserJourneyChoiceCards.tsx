"use client";

import { SharedMapViewport } from "@dashboard/components/shared/maps/SharedMapViewport";
import clsx from "clsx";
import { motion } from "framer-motion";
import { useState } from "react";
import type { JourneyComparisonOption, RiskZoneMapItem } from "@dashboard/lib/mock-data";

function riskBandClasses(band: JourneyComparisonOption["risk_band"]) {
  switch (band) {
    case "low":
      return "border-emerald-400/40 text-emerald-200 bg-emerald-500/10";
    case "medium":
      return "border-amber-400/40 text-amber-100 bg-amber-500/15";
    case "high":
      return "border-rose-400/45 text-rose-100 bg-rose-500/15";
    default:
      return "border-[rgb(var(--stroke-rgb)/0.2)] text-[var(--fg)]";
  }
}

function UserRiskZonesGeoJsonOverlay({ zones }: { zones: RiskZoneMapItem[] }) {
  if (zones.length === 0) {
    return (
      <div className="flex h-full items-center justify-center text-center text-xs text-white/50">
        No risk zones in props
      </div>
    );
  }
  return (
    <div className="flex h-full flex-col gap-1 overflow-auto p-2">
      {zones.map((z) => (
        <div
          key={z.id}
          className="rounded-lg border border-rose-400/30 bg-rose-500/20 px-2 py-1.5 text-[10px] text-white/90 backdrop-blur-md"
        >
          <span className="font-mono opacity-80">{z.id.slice(0, 8)}…</span> ·{" "}
          {z.source} · score {z.risk_score.toFixed(1)}
          <pre className="mt-1 max-h-16 overflow-auto whitespace-pre-wrap break-all font-mono text-[9px] opacity-70">
            {JSON.stringify(z.area_geojson).slice(0, 280)}
            {JSON.stringify(z.area_geojson).length > 280 ? "…" : ""}
          </pre>
        </div>
      ))}
    </div>
  );
}

export type UserJourneyChoiceCardsProps = {
  journeys: JourneyComparisonOption[];
  riskZones: RiskZoneMapItem[];
  className?: string;
};

export function UserJourneyChoiceCards({
  journeys,
  riskZones,
  className,
}: UserJourneyChoiceCardsProps) {
  const [safeMode, setSafeMode] = useState(false);

  return (
    <motion.div layout className={clsx("flex flex-col gap-5", className)}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-base font-semibold tracking-tight text-[var(--fg)]">
            Routes
          </h2>
          <p className="text-xs text-[rgb(var(--muted-rgb)/0.9)]">
            Compare options · mobile-first
          </p>
        </div>
        <label className="flex min-h-[44px] cursor-pointer items-center gap-3 rounded-full border border-[rgb(var(--stroke-rgb)/var(--stroke-alpha))] bg-[rgb(var(--surface-rgb)/0.08)] px-4 py-2 backdrop-blur-md backdrop-saturate-150">
          <span className="text-sm font-medium text-[var(--fg)]">Safe Mode</span>
          <input
            type="checkbox"
            className="h-5 w-5 accent-[rgb(var(--accent-rgb))]"
            checked={safeMode}
            onChange={(e) => setSafeMode(e.target.checked)}
            aria-label="Overlay risk zones GeoJSON on map"
          />
          <span className="text-xs text-[rgb(var(--muted-rgb))]">Risk zones</span>
        </label>
      </div>

      <div className="grid gap-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {journeys.map((j, i) => (
          <motion.article
            layout
            key={j.id}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className={clsx(
              "flex min-h-[160px] flex-col rounded-2xl border border-[rgb(var(--stroke-rgb)/var(--stroke-alpha))] bg-[rgb(var(--surface-rgb)/0.08)] p-4 shadow-[var(--card-shadow)] backdrop-blur-[var(--panel-blur)] backdrop-saturate-150",
            )}
            style={{ order: i }}
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-[rgb(var(--secondary-rgb))]">
                  {j.mode}
                </p>
                <h3 className="mt-1 text-sm font-semibold text-[var(--fg)]">
                  {j.label}
                </h3>
              </div>
              <span
                className={clsx(
                  "rounded-full border px-2 py-1 text-[10px] font-semibold",
                  riskBandClasses(j.risk_band),
                )}
              >
                Risk: {j.risk_band}
              </span>
            </div>
            <dl className="mt-3 grid grid-cols-2 gap-2 text-xs">
              <div>
                <dt className="text-[10px] text-[rgb(var(--muted-rgb))]">Time</dt>
                <dd className="font-semibold text-[var(--fg)]">{j.duration_min} min</dd>
              </div>
              <div>
                <dt className="text-[10px] text-[rgb(var(--muted-rgb))]">Cost</dt>
                <dd className="font-semibold text-[var(--fg)]">€{j.cost_eur.toFixed(2)}</dd>
              </div>
            </dl>
            <ul className="mt-3 list-disc space-y-1 pl-4 text-[11px] leading-snug text-[rgb(var(--muted-rgb)/0.95)]">
              {j.summary_bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </motion.article>
        ))}
      </div>

      <SharedMapViewport
        persona="user"
        title="Map · route comparison"
        baseLayer={
          <div className="flex flex-1 items-center justify-center text-xs text-white/40">
            Base map placeholder
          </div>
        }
        showOverlay={safeMode}
        overlay={
          <>
            <div className="absolute inset-0 bg-gradient-to-b from-rose-600/25 via-amber-500/10 to-transparent mix-blend-screen" />
            <div className="relative z-[1] mt-auto flex h-full flex-col border border-rose-400/20 bg-black/35 backdrop-blur-sm">
              <p className="border-b border-rose-400/15 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-rose-100/90">
                Risk overlay (GeoJSON)
              </p>
              <div className="min-h-0 flex-1 overflow-hidden">
                <UserRiskZonesGeoJsonOverlay zones={riskZones} />
              </div>
            </div>
          </>
        }
      />
    </motion.div>
  );
}
