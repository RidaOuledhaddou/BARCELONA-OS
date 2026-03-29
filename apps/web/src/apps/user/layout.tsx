"use client";

import { dashboardPaths } from "@dashboard/lib/dashboard-navigation";
import { Link } from "../../../i18n/navigation";
import clsx from "clsx";
import type { ReactNode } from "react";

export function UserDashboardShell({ children }: { children: ReactNode }) {
  return (
    <div className="user-dashboard min-h-[70vh] text-[var(--fg)]">
      <header className="mb-8 flex flex-col gap-4 border-b border-[rgb(var(--stroke-rgb)/0.12)] pb-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[rgb(var(--dashboard-accent-rgb))]">
            Concierge
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight">Journeys</h1>
        </div>
        <nav className="flex flex-wrap gap-2 text-sm">
          <Link
            href={dashboardPaths.userHome}
            className={clsx(
              "rounded-full border border-[rgb(var(--stroke-rgb)/var(--stroke-alpha))] px-4 py-2",
              "min-h-[44px] min-w-[44px] content-center bg-[rgb(var(--surface-rgb)/0.08)] backdrop-blur-md",
            )}
          >
            Home
          </Link>
        </nav>
      </header>
      {children}
    </div>
  );
}
