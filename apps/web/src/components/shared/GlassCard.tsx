import clsx from "clsx";
import type { ReactNode } from "react";
import { glassPanel } from "./BentoGrid";

export function GlassCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={clsx(glassPanel, "p-4 md:p-5", className)}>{children}</div>
  );
}
