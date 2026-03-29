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
            className="relative min-h-[72px] overflow-hidden rounded-xl border border-white/15 bg-black/40"
          >
            <div
              className="absolute inset-0 bg-gradient-to-br from-cyan-500/30 via-indigo-500/25 to-fuchsia-500/20"
              style={{ opacity: intensity / 100 }}
            />
            <div className="relative flex h-full flex-col justify-center p-2">
              <p className="text-[11px] font-bold text-white">{cell.label}</p>
              <p className="font-mono text-[10px] text-zinc-400">
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
        "flex flex-col gap-6 rounded-2xl border border-white/20 bg-zinc-950 px-4 py-5 text-zinc-50 shadow-[0_24px_80px_rgba(0,0,0,0.55)] sm:px-5",
        className,
      )}
    >
      <header>
        <h2 className="text-lg font-bold tracking-tight text-white">Shift & demand</h2>
        <p className="text-sm text-zinc-400">
          High-contrast · large targets · inferred demand pulse
        </p>
      </header>

      <section aria-label="Shift timeline">
        <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500">
          Shift timeline
        </h3>
        <div className="mt-3 flex gap-2 overflow-x-auto pb-2 [-webkit-overflow-scrolling:touch]">
          {shiftWindows.map((w) => (
            <motion.div
              layout
              key={w.id}
              className="flex min-h-[88px] min-w-[140px] shrink-0 flex-col justify-between rounded-xl border-2 border-white/25 bg-white/10 px-3 py-3 backdrop-blur-md"
            >
              <span className="text-[11px] font-semibold leading-tight text-white">
                {w.label}
              </span>
              <span className="font-mono text-[10px] text-zinc-300">
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
              <div className="mt-2 h-2 rounded-full bg-black/40" title="Demand index">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-amber-400 to-orange-500"
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
        className="border-white/20 bg-zinc-900/60"
        minHeightClass="min-h-[200px] sm:min-h-[240px]"
        baseLayer={pulseGrid}
        showOverlay={false}
      />

      <section aria-label="Job offers">
        <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500">Jobs</h3>
        <ul className="mt-3 flex flex-col gap-3">
          {jobs.map((job) => (
            <li key={job.id}>
              <motion.div
                layout
                className="min-h-[56px] rounded-2xl border-2 border-white/25 bg-white/10 px-4 py-4 backdrop-blur-md"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <p className="text-base font-bold text-white">{job.pickup_label}</p>
                    <p className="text-sm text-zinc-400">{job.pickup_zone}</p>
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
                <div className="mt-3 flex flex-wrap gap-4 font-mono text-sm text-zinc-200">
                  <span>ETA {job.eta_min}m</span>
                  <span>{job.distance_km.toFixed(1)} km</span>
                  <span className="text-amber-300">
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
