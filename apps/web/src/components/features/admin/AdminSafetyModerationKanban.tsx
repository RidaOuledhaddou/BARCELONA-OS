"use client";

import { placeScoreRowKey } from "@dashboard/modules/authenticity";
import {
  groupReportsByModerationStatus,
  MODERATION_LANES,
} from "@dashboard/modules/safety";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import type {
  PlaceScoreTableRow,
  SafetyReportKanbanItem,
} from "@dashboard/lib/mock-data";

function formatCoord(lat: number, lon: number) {
  return `${lat.toFixed(4)}, ${lon.toFixed(4)}`;
}

function DetailsJson({ value }: { value: Record<string, unknown> }) {
  const entries = Object.entries(value);
  if (entries.length === 0) {
    return <p className="text-xs text-[rgb(var(--muted-rgb)/0.7)]">—</p>;
  }
  return (
    <dl className="grid gap-1 text-xs text-[rgb(var(--muted-rgb))] sm:grid-cols-2">
      {entries.map(([k, v]) => (
        <div key={k} className="flex gap-2 border-b border-[rgb(var(--stroke-rgb)/0.06)] py-1">
          <dt className="shrink-0 font-mono text-[10px] uppercase tracking-wider text-[rgb(var(--secondary-rgb)/0.85)]">
            {k}
          </dt>
          <dd className="min-w-0 truncate font-mono text-[11px] text-[var(--fg)]">
            {typeof v === "object" ? JSON.stringify(v) : String(v)}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export type AdminSafetyModerationKanbanProps = {
  reports: SafetyReportKanbanItem[];
  placeScores: PlaceScoreTableRow[];
  className?: string;
};

export function AdminSafetyModerationKanban({
  reports,
  placeScores,
  className,
}: AdminSafetyModerationKanbanProps) {
  const grouped = useMemo(
    () => groupReportsByModerationStatus(reports),
    [reports],
  );
  const [openPlaceIdDim, setOpenPlaceIdDim] = useState<string | null>(null);
  const [drawerReport, setDrawerReport] = useState<SafetyReportKanbanItem | null>(
    null,
  );

  return (
    <motion.div layout className={clsx("flex flex-col gap-6", className)}>
      <div>
        <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--fg)]">
          Moderation
        </h2>
        <p className="mt-1 text-xs text-[rgb(var(--muted-rgb)/0.85)]">
          Lanes by <code className="font-mono">moderation_status</code> ·
          data-dense
        </p>
        <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {MODERATION_LANES.map((lane) => (
            <section
              key={lane}
              className="flex min-h-[280px] flex-col rounded-[var(--dashboard-card-radius)] border border-[rgb(var(--stroke-rgb)/var(--stroke-alpha))] bg-[rgb(var(--surface-rgb)/var(--surface-glass-strong-alpha))] shadow-[var(--card-shadow)] backdrop-blur-[var(--panel-blur)] backdrop-saturate-100"
            >
              <header className="border-b border-[rgb(var(--stroke-rgb)/var(--stroke-alpha))] px-4 py-3">
                <h3 className="text-[11px] font-bold uppercase tracking-wider text-[var(--fg)]">
                  {lane}
                </h3>
                <p className="text-[10px] text-[rgb(var(--muted-rgb)/0.85)]">
                  {grouped[lane].length} open
                </p>
              </header>
              <ul className="flex flex-1 flex-col gap-2.5 overflow-y-auto p-3">
                {grouped[lane].map((r) => (
                  <li key={r.id}>
                    <button
                      type="button"
                      onClick={() => setDrawerReport(r)}
                      className="w-full rounded-lg border border-[rgb(var(--stroke-rgb)/var(--stroke-alpha))] bg-[rgb(var(--surface-strong-rgb)/var(--surface-glass-strong-alpha))] px-3 py-2.5 text-left transition hover:border-[rgb(var(--accent-rgb)/0.4)]"
                    >
                      <p className="text-[11px] font-semibold text-[var(--fg)]">
                        {r.type_label}{" "}
                        <span className="font-mono font-normal text-[rgb(var(--muted-rgb))]">
                          {r.type_code}
                        </span>
                      </p>
                      <p className="line-clamp-2 text-[10px] text-[rgb(var(--muted-rgb)/0.9)]">
                        {r.description ?? "—"}
                      </p>
                      <p className="mt-1 font-mono text-[9px] text-[rgb(var(--secondary-rgb)/0.7)]">
                        {formatCoord(r.latitude, r.longitude)} ·{" "}
                        {new Date(r.created_at).toLocaleString()}
                      </p>
                      <p className="text-[9px] text-[rgb(var(--muted-rgb)/0.65)]">
                        {r.user_id ?? "Anonymous"}
                      </p>
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--fg)]">
          Authenticity · place_scores
        </h2>
        <div className="mt-3 overflow-x-auto rounded-[var(--dashboard-card-radius)] border border-[rgb(var(--stroke-rgb)/var(--stroke-alpha))] bg-[rgb(var(--surface-rgb)/var(--surface-glass-strong-alpha))] shadow-[var(--card-shadow)] backdrop-blur-[var(--panel-blur)] backdrop-saturate-100">
          <table className="w-full min-w-[720px] border-collapse text-left text-xs">
            <thead>
              <tr className="border-b border-[rgb(var(--stroke-rgb)/var(--stroke-alpha))] text-[10px] uppercase tracking-wider text-[rgb(var(--muted-rgb)/0.95)]">
                <th className="px-4 py-3 font-semibold">Place</th>
                <th className="px-4 py-3 font-semibold">Dimension</th>
                <th className="px-4 py-3 font-semibold">Score</th>
                <th className="px-4 py-3 font-semibold">rule_version</th>
                <th className="px-4 py-3 font-semibold">calculated_at</th>
                <th className="px-4 py-3 font-semibold">details</th>
              </tr>
            </thead>
            <tbody>
              {placeScores.map((row) => {
                const key = placeScoreRowKey(row.place_id, row.dimension_id);
                const expanded = openPlaceIdDim === key;
                return (
                  <AdminPlaceScoreFragmentRow
                    key={key}
                    row={row}
                    expanded={expanded}
                    onToggle={() => setOpenPlaceIdDim(expanded ? null : key)}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <AnimatePresence>
        {drawerReport ? (
          <motion.aside
            key={drawerReport.id}
            initial={{ opacity: 0, x: 48 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 48 }}
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
            className="fixed inset-y-0 right-0 z-[100] flex w-[min(100vw,420px)] flex-col border-l border-[rgb(var(--stroke-rgb)/var(--stroke-alpha))] bg-[rgb(var(--bg-rgb)/0.98)] p-6 shadow-[var(--card-shadow)] backdrop-blur-xl backdrop-saturate-100"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[10px] font-mono uppercase text-[rgb(var(--secondary-rgb))]">
                  Report · {drawerReport.id}
                </p>
                <h3 className="mt-1 text-sm font-semibold text-[var(--fg)]">
                  {drawerReport.type_label}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setDrawerReport(null)}
                className="rounded-lg border border-[rgb(var(--stroke-rgb)/0.2)] px-2 py-1 text-[10px] text-[rgb(var(--muted-rgb))]"
              >
                Close
              </button>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-[rgb(var(--muted-rgb))]">
              {drawerReport.description ?? "—"}
            </p>
            <p className="mt-2 font-mono text-[10px] text-[rgb(var(--secondary-rgb)/0.8)]">
              {formatCoord(drawerReport.latitude, drawerReport.longitude)}
            </p>
            <div className="mt-6">
              <h4 className="text-[10px] font-bold uppercase tracking-wider text-[rgb(var(--muted-rgb))]">
                pillar_extensions
              </h4>
              <div className="mt-2 max-h-[40vh] overflow-auto rounded-lg border border-[rgb(var(--stroke-rgb)/var(--stroke-alpha))] bg-[rgb(var(--surface-strong-rgb)/var(--surface-glass-strong-alpha))] p-4">
                <DetailsJson value={drawerReport.pillar_extensions} />
              </div>
            </div>
          </motion.aside>
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
}

function AdminPlaceScoreFragmentRow({
  row,
  expanded,
  onToggle,
}: {
  row: PlaceScoreTableRow;
  expanded: boolean;
  onToggle: () => void;
}) {
  return (
    <>
      <tr className="border-b border-[rgb(var(--stroke-rgb)/var(--stroke-alpha))] text-[var(--fg)]">
        <td className="px-4 py-3 font-medium">{row.place_name}</td>
        <td className="px-4 py-3">
          <span className="font-mono text-[10px] text-[rgb(var(--secondary-rgb))]">
            {row.dimension_code}
          </span>{" "}
          <span className="text-[rgb(var(--muted-rgb)/0.9)]">
            {row.dimension_label}
          </span>
        </td>
        <td className="px-4 py-3 font-mono">{row.score.toFixed(2)}</td>
        <td className="px-4 py-3 font-mono text-[rgb(var(--muted-rgb))]">
          {row.rule_version ?? "—"}
        </td>
        <td className="px-4 py-3 font-mono text-[10px] text-[rgb(var(--muted-rgb)/0.85)]">
          {new Date(row.calculated_at).toLocaleString()}
        </td>
        <td className="px-4 py-3">
          <button
            type="button"
            onClick={onToggle}
            className="rounded-md border border-[rgb(var(--stroke-rgb)/0.15)] px-2 py-1 text-[10px] font-semibold text-[rgb(var(--accent-soft-rgb))]"
          >
            {expanded ? "Collapse" : "Expand JSONB"}
          </button>
        </td>
      </tr>
      {expanded ? (
        <tr className="bg-[rgb(var(--surface-strong-rgb)/var(--surface-glass-strong-alpha))]">
          <td colSpan={6} className="px-4 py-4">
            <DetailsJson value={row.details} />
          </td>
        </tr>
      ) : null}
    </>
  );
}
