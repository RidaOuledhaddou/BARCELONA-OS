"use client";

import { dashboardPaths } from "@dashboard/lib/dashboard-navigation";
import { Link } from "../../../i18n/navigation";
import clsx from "clsx";
import type { ReactNode } from "react";

export function AdminDashboardShell({ children }: { children: ReactNode }) {
  return (
    <div className="admin-dashboard min-h-[70vh] text-[var(--fg)]">
      <header
        className={clsx(
          "mb-8 flex flex-col gap-5 rounded-[var(--dashboard-card-radius)] border border-[rgb(var(--stroke-rgb)/var(--stroke-alpha))]",
          "bg-[rgb(var(--surface-rgb)/var(--surface-glass-alpha))] px-5 py-6 shadow-[var(--card-shadow)] backdrop-blur-[var(--panel-blur)] backdrop-saturate-100 md:flex-row md:items-center md:justify-between md:px-6 md:py-7",
        )}
      >
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[rgb(var(--muted-rgb))]">
            City OS
          </p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-[var(--fg)]">
            Operations
          </h1>
        </div>
        <nav className="flex flex-wrap gap-2 text-sm font-medium">
          <Link
            href={dashboardPaths.adminHome}
            className={clsx(
              "rounded-full border border-[rgb(var(--stroke-rgb)/var(--stroke-alpha))] px-4 py-2.5 transition",
              "bg-[rgb(var(--button-secondary-rgb)/var(--button-secondary-alpha))] text-[rgb(var(--muted-rgb))] hover:border-[rgb(var(--accent-rgb)/0.45)] hover:text-[var(--fg)]",
            )}
          >
            Overview
          </Link>
          <Link
            href={dashboardPaths.adminOpsModeration}
            className={clsx(
              "rounded-full border border-[rgb(var(--stroke-rgb)/var(--stroke-alpha))] px-4 py-2.5 transition",
              "bg-[rgb(var(--button-secondary-rgb)/var(--button-secondary-alpha))] text-[rgb(var(--muted-rgb))] hover:border-[rgb(var(--accent-rgb)/0.45)] hover:text-[var(--fg)]",
            )}
          >
            Ops · Moderation
          </Link>
        </nav>
      </header>
      {children}
    </div>
  );
}
