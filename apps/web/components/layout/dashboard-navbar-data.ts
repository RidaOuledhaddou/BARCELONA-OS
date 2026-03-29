import type { LucideIcon } from "lucide-react";
import {
  CarTaxiFront,
  LayoutDashboard,
  MapPin,
  Route,
  Shield,
  Wrench,
} from "lucide-react";
import { dashboardPaths } from "@dashboard/lib/dashboard-navigation";

export type DashboardPersona = "admin" | "user" | "driver";

export type DashboardNavLink = {
  key:
    | "dashNavAdminOverview"
    | "dashNavAdminModeration"
    | "dashNavUserJourneys"
    | "dashNavUserPlaces"
    | "dashNavDriverShift"
    | "dashNavDriverFleet";
  href: string;
  icon: LucideIcon;
};

export type DashboardNavbarConfig = {
  persona: DashboardPersona;
  contextAriaKey:
    | "dashboardContextAriaAdmin"
    | "dashboardContextAriaUser"
    | "dashboardContextAriaDriver";
  center: readonly DashboardNavLink[];
};

/** City OS — only `/admin` routes. */
export const adminDashboardNavbar: DashboardNavbarConfig = {
  persona: "admin",
  contextAriaKey: "dashboardContextAriaAdmin",
  center: [
    {
      key: "dashNavAdminOverview",
      href: dashboardPaths.adminHome,
      icon: LayoutDashboard,
    },
    {
      key: "dashNavAdminModeration",
      href: dashboardPaths.adminOpsModeration,
      icon: Shield,
    },
  ],
};

/** Concierge — only `/user` routes. */
export const userDashboardNavbar: DashboardNavbarConfig = {
  persona: "user",
  contextAriaKey: "dashboardContextAriaUser",
  center: [
    {
      key: "dashNavUserJourneys",
      href: dashboardPaths.userHome,
      icon: Route,
    },
    {
      key: "dashNavUserPlaces",
      href: `${dashboardPaths.userHome}#places`,
      icon: MapPin,
    },
  ],
};

/** Fleet / earnings — only `/driver` routes. */
export const driverDashboardNavbar: DashboardNavbarConfig = {
  persona: "driver",
  contextAriaKey: "dashboardContextAriaDriver",
  center: [
    {
      key: "dashNavDriverShift",
      href: dashboardPaths.driverHome,
      icon: Wrench,
    },
    {
      key: "dashNavDriverFleet",
      href: dashboardPaths.driverFleetStatus,
      icon: CarTaxiFront,
    },
  ],
};

export function dashboardNavbarConfigForPath(pathname: string): DashboardNavbarConfig {
  if (pathname.includes("/admin")) return adminDashboardNavbar;
  if (pathname.includes("/user")) return userDashboardNavbar;
  if (pathname.includes("/driver")) return driverDashboardNavbar;
  return adminDashboardNavbar;
}
