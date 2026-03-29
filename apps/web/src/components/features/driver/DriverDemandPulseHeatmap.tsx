"use client";

import { SharedMapViewport } from "@dashboard/components/shared/maps/SharedMapViewport";
import clsx from "clsx";
import { motion } from "framer-motion";
import type {
  DemandPulseCell,
  DriverJobOffer,
  ShiftTimelineWindow,
} from "@dashboard/lib/mock-data";

function riskBadge(band: DriverJobOffer["pickup_risk_band"]) {
  const map = {
    low: "bg-emerald-400 text-black",
    medium: "bg-amber-300 text-black",
    high: "bg-rose-400 text-black",
  } as const;
  return map[band];
}

export type DriverDemandPulseHeatmapProps = {
  jobs: DriverJobOffer[];
  demandCells: DemandPulseCell[];
  shiftWindows: ShiftTimelineWindow[];
  className?: string;
};

export function DriverDemandPulseHeatmap({
  jobs,
  demandCells,
  shiftWindows,
  className,
}: DriverDemandPulseHeatmapProps) {
  const maxScore =
    demandCells.length > 0
      ? Math.max(...demandCells.map((c) => c.inferred_score))
      : 1;

  const pulseGrid = (
    <div className="grid h-full w-full grid-cols-2 gap-2 p-2 sm:grid-cols-3 md:grid-cols-4">
      {demandCells.map((cell) => {
        const intensity = Math.round((cell.inferred_score / maxScore) * 100);
        return (
          <div
            key={cell.id}
            className="relative min-h-[72px] overflow-hidden rounded-xl border border-[rgb(var(--stroke-rgb)/var(--stroke-alpha))] bg-[rgb(var(--surface-strong-rgb)/0.65)]"
          >
            <div
              className="absolute inset-0 bg-gradient-to-br from-[rgb(var(--dashboard-accent-rgb)/0.22)] via-[rgb(var(--dashboard-accent-soft-rgb)/0.12)] to-[rgb(var(--dashboard-glow-rgb)/0.08)]"
              style={{ opacity: intensity / 100 }}
            />
            <div className="relative flex h-full flex-col justify-center p-2">
              <p className="text-[11px] font-bold text-[var(--fg)]">{cell.label}</p>
              <p className="font-mono text-[10px] text-[rgb(var(--muted-rgb))]">
                {cell.inferred_score}
                {cell.time_window ? ` · ${cell.time_window}` : ""}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <motion.div
      layout
      className={clsx(
        "flex flex-col gap-6 rounded-[var(--dashboard-card-radius)] border border-[rgb(var(--stroke-rgb)/var(--stroke-alpha))] bg-[rgb(var(--surface-rgb)/var(--surface-glass-alpha))] px-4 py-5 text-[var(--fg)] shadow-[var(--card-shadow)] backdrop-blur-[var(--panel-blur)] backdrop-saturate-100 sm:px-5",
        className,
      )}
    >
      <header>
        <h2 className="text-lg font-bold tracking-tight text-[var(--fg)]">Shift & demand</h2>
        <p className="text-sm text-[rgb(var(--muted-rgb))]">
          High-contrast · large targets · inferred demand pulse
        </p>
      </header>

      <section aria-label="Shift timeline">
        <h3 className="text-xs font-bold uppercase tracking-widest text-[rgb(var(--muted-rgb))]">
          Shift timeline
        </h3>
        <div className="mt-3 flex gap-2 overflow-x-auto pb-2 [-webkit-overflow-scrolling:touch]">
          {shiftWindows.map((w) => (
            <motion.div
              layout
              key={w.id}
              className="flex min-h-[88px] min-w-[140px] shrink-0 flex-col justify-between rounded-xl border border-[rgb(var(--stroke-rgb)/var(--stroke-alpha))] bg-[rgb(var(--surface-strong-rgb)/var(--surface-glass-strong-alpha))] px-3 py-3 shadow-[var(--card-shadow)] backdrop-blur-[var(--panel-blur)]"
            >
              <span className="text-[11px] font-semibold leading-tight text-[var(--fg)]">
                {w.label}
              </span>
              <span className="font-mono text-[10px] text-[rgb(var(--muted-rgb))]">
                {new Date(w.starts_at).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}{" "}
                –{" "}
                {new Date(w.ends_at).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
              <div
                className="mt-2 h-2 rounded-full bg-[rgb(var(--stroke-rgb)/0.25)]"
                title="Demand index"
              >
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[rgb(var(--dashboard-accent-rgb))] to-[rgb(var(--dashboard-glow-rgb))]"
                  style={{ width: `${Math.min(100, w.demand_index)}%` }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <SharedMapViewport
        persona="driver"
        title="Demand pulse"
        variantLabel="shared viewport (fleet)"
        minHeightClass="min-h-[200px] sm:min-h-[240px]"
        baseLayer={pulseGrid}
        showOverlay={false}
      />

      <section aria-label="Job offers">
        <h3 className="text-xs font-bold uppercase tracking-widest text-[rgb(var(--muted-rgb))]">
          Jobs
        </h3>
        <ul className="mt-3 flex flex-col gap-3">
          {jobs.map((job) => (
            <li key={job.id}>
              <motion.div
                layout
                className="min-h-[56px] rounded-[var(--dashboard-card-radius)] border border-[rgb(var(--stroke-rgb)/var(--stroke-alpha))] bg-[rgb(var(--surface-strong-rgb)/var(--surface-glass-strong-alpha))] px-4 py-4 shadow-[var(--card-shadow)] backdrop-blur-[var(--panel-blur)]"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <p className="text-base font-bold text-[var(--fg)]">{job.pickup_label}</p>
                    <p className="text-sm text-[rgb(var(--muted-rgb))]">{job.pickup_zone}</p>
                  </div>
                  <span
                    className={clsx(
                      "rounded-full px-3 py-1 text-xs font-extrabold uppercase tracking-wide",
                      riskBadge(job.pickup_risk_band),
                    )}
                  >
                    {job.pickup_risk_band} risk
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap gap-4 font-mono text-sm text-[var(--fg)]">
                  <span>ETA {job.eta_min}m</span>
                  <span>{job.distance_km.toFixed(1)} km</span>
                  <span className="font-semibold text-[rgb(var(--accent-rgb))]">
                    €{job.estimated_earnings_eur.toFixed(2)} est.
                  </span>
                </div>
              </motion.div>
            </li>
          ))}
        </ul>
      </section>
    </motion.div>
  );
}
