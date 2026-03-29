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
  const isUser = persona === "user";
  return (
    <div
      className={clsx(
        "relative overflow-hidden rounded-2xl border border-[rgb(var(--stroke-rgb)/var(--stroke-alpha))] bg-[rgb(var(--surface-rgb)/0.06)] shadow-inner backdrop-blur-md backdrop-saturate-150",
        isUser ? "" : "border-white/20 bg-zinc-900/80",
        minHeightClass,
        className,
      )}
    >
      <div
        className={clsx(
          "absolute inset-0",
          isUser
            ? "bg-[radial-gradient(ellipse_at_30%_20%,rgb(var(--accent-rgb)/0.12),transparent_55%),linear-gradient(160deg,rgb(0_0_0/0.35),rgb(255_255_255/0.02))]"
            : "bg-[radial-gradient(circle_at_70%_30%,rgb(34_211_238/0.12),transparent_50%),linear-gradient(200deg,rgb(0_0_0/0.5),rgb(255_255_255/0.03))]",
        )}
        aria-hidden
      />
      <div className={clsx("relative flex h-full flex-col p-4", minHeightClass)}>
        <p
          className={clsx(
            "text-[10px] font-bold uppercase tracking-wider",
            isUser ? "text-white/60" : "text-zinc-400",
          )}
        >
          {title}
          {variantLabel ? (
            <span className="ml-2 font-mono font-normal normal-case opacity-70">
              · {variantLabel}
            </span>
          ) : null}
        </p>
        <div className="relative mt-2 flex min-h-0 flex-1 items-stretch overflow-hidden rounded-xl border border-white/10 bg-black/25">
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
