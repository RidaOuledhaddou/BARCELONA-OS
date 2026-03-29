"use client";

import clsx from "clsx";
import { LayoutGroup, motion } from "framer-motion";

export const glassPanel =
  "rounded-2xl border border-[rgb(var(--stroke-rgb)/var(--stroke-alpha))] bg-[rgb(var(--surface-rgb)/0.08)] shadow-[var(--card-shadow)] backdrop-blur-[var(--panel-blur)] backdrop-saturate-150";

type BentoGridProps = {
  children: React.ReactNode;
  className?: string;
  layoutIdPrefix?: string;
};

export function BentoGrid({
  children,
  className,
  layoutIdPrefix = "bento",
}: BentoGridProps) {
  return (
    <LayoutGroup id={layoutIdPrefix}>
      <motion.div
        layout
        className={clsx(
          "grid w-full gap-3 sm:gap-4 md:gap-5",
          "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-[auto_auto]",
          className,
        )}
      >
        {children}
      </motion.div>
    </LayoutGroup>
  );
}

type BentoItemProps = {
  children: React.ReactNode;
  className?: string;
  colSpan?: 1 | 2 | 3 | 4;
  rowSpan?: 1 | 2;
  layoutId?: string;
};

const colSpanClass: Record<NonNullable<BentoItemProps["colSpan"]>, string> = {
  1: "sm:col-span-1",
  2: "sm:col-span-2",
  3: "sm:col-span-2 lg:col-span-3",
  4: "sm:col-span-2 lg:col-span-4",
};

const rowSpanClass: Record<NonNullable<BentoItemProps["rowSpan"]>, string> = {
  1: "",
  2: "sm:row-span-2",
};

export function BentoItem({
  children,
  className,
  colSpan = 1,
  rowSpan = 1,
  layoutId,
}: BentoItemProps) {
  return (
    <motion.section
      layout
      layoutId={layoutId}
      transition={{ type: "spring", stiffness: 320, damping: 28 }}
      className={clsx(
        glassPanel,
        "min-h-0 p-4 md:p-5",
        colSpanClass[colSpan],
        rowSpanClass[rowSpan],
        className,
      )}
    >
      {children}
    </motion.section>
  );
}
