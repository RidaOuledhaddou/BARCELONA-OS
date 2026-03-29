/**
 * Central navigation identity for dashboards. Keys are globally unique.
 * Paths are relative to the locale prefix (next-intl adds /en, /es, …).
 */

export const DASHBOARD_NAV_KEYS = {
  admin_dashboard: "admin_dashboard",
  user_dashboard: "user_dashboard",
  driver_dashboard: "driver_dashboard",
} as const;

export type DashboardNavKey =
  (typeof DASHBOARD_NAV_KEYS)[keyof typeof DASHBOARD_NAV_KEYS];

export const dashboardNavMeta = {
  [DASHBOARD_NAV_KEYS.admin_dashboard]: {
    key: DASHBOARD_NAV_KEYS.admin_dashboard,
    path: "/admin",
    label: "City OS",
  },
  [DASHBOARD_NAV_KEYS.user_dashboard]: {
    key: DASHBOARD_NAV_KEYS.user_dashboard,
    path: "/user",
    label: "Concierge",
  },
  [DASHBOARD_NAV_KEYS.driver_dashboard]: {
    key: DASHBOARD_NAV_KEYS.driver_dashboard,
    path: "/driver",
    label: "Earnings",
  },
} as const satisfies Record<
  DashboardNavKey,
  { key: DashboardNavKey; path: string; label: string }
>;

export const dashboardPaths = {
  adminHome: "/admin",
  adminOpsModeration: "/admin/ops/moderation",
  userHome: "/user",
  driverHome: "/driver",
  driverFleetStatus: "/driver/fleet/status",
} as const;
