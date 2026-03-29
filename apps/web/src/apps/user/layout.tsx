"use client";

import type { ReactNode } from "react";

export function UserDashboardShell({ children }: { children: ReactNode }) {
  return (
    <div className="user-dashboard min-h-[70vh] text-[var(--fg)]">
      <header className="mb-8 border-b border-[rgb(var(--stroke-rgb)/0.12)] pb-6">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[rgb(var(--dashboard-accent-rgb))]">
            Concierge
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight">Journeys</h1>
        </div>
      </header>
      {children}
    </div>
  );
}
