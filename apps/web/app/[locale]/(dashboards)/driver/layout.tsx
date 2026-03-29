import { DriverDashboardShell } from "@dashboard/apps/driver/layout";

export default function DriverLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DriverDashboardShell>{children}</DriverDashboardShell>;
}
