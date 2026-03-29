"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export type DashboardPersona = "admin" | "user" | "driver";

function personaFromPathname(pathname: string): DashboardPersona {
  const segments = pathname.split("/").filter(Boolean);
  const hit = segments.find((s) => s === "admin" || s === "user" || s === "driver");
  if (hit === "user" || hit === "driver") return hit;
  return "admin";
}

export function DashboardPersonaSurface({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const persona = personaFromPathname(pathname);

  return (
    <div
      data-shell="dashboard"
      data-dashboard={persona}
      className="dashboard-persona-surface min-h-[50vh] transition-[background] duration-500 ease-out"
    >
      {children}
    </div>
  );
}
