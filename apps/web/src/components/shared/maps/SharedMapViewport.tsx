"use client";

import clsx from "clsx";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

export type SharedMapPersona = "user" | "driver";

export type SharedMapViewportProps = {
  persona: SharedMapPersona;
  title: string;
  className?: string;
  minHeightClass?: string;
  baseLayer: ReactNode;
  overlay?: ReactNode;
  showOverlay?: boolean;
  /** e.g. route comparison vs fleet demand */
  variantLabel?: string;
};

export function SharedMapViewport({
  persona,
  title,
  className,
  minHeightClass = "min-h-[220px] sm:min-h-[280px]",
  baseLayer,
  overlay,
  showOverlay = false,
  variantLabel,
}: SharedMapViewportProps) {
  return (
    <div
      className={clsx(
        "relative overflow-hidden rounded-[var(--dashboard-card-radius)] border border-[rgb(var(--stroke-rgb)/var(--stroke-alpha))] bg-[rgb(var(--surface-rgb)/var(--surface-glass-strong-alpha))] shadow-inner backdrop-blur-[var(--panel-blur)] backdrop-saturate-100",
        minHeightClass,
        className,
      )}
    >
      <div
        className={clsx(
          "absolute inset-0",
          persona === "user"
            ? "bg-[radial-gradient(ellipse_at_30%_20%,rgb(var(--dashboard-accent-rgb)/0.14),transparent_55%),linear-gradient(160deg,rgb(var(--fg-rgb)/0.04),transparent)]"
            : "bg-[radial-gradient(circle_at_70%_30%,rgb(var(--dashboard-accent-rgb)/0.16),transparent_50%),linear-gradient(200deg,rgb(var(--fg-rgb)/0.03),transparent)]",
        )}
        aria-hidden
      />
      <div className={clsx("relative flex h-full flex-col p-4", minHeightClass)}>
        <p className="text-[10px] font-bold uppercase tracking-wider text-[rgb(var(--muted-rgb))]">
          {title}
          {variantLabel ? (
            <span className="ml-2 font-mono font-normal normal-case opacity-80">
              · {variantLabel}
            </span>
          ) : null}
        </p>
        <div className="relative mt-2 flex min-h-0 flex-1 items-stretch overflow-hidden rounded-xl border border-[rgb(var(--stroke-rgb)/var(--stroke-alpha))] bg-[rgb(var(--surface-strong-rgb)/var(--surface-glass-strong-alpha))]">
          <div className="relative flex min-h-[140px] w-full flex-1">{baseLayer}</div>
          {overlay ? (
            <motion.div
              layout
              className={clsx(
                "absolute inset-0 z-10 flex flex-col transition-opacity duration-300",
                showOverlay ? "opacity-100" : "pointer-events-none opacity-0",
              )}
              aria-hidden={!showOverlay}
            >
              {overlay}
            </motion.div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
