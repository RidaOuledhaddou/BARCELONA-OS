import { UserDashboardShell } from "@dashboard/apps/user/layout";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <UserDashboardShell>{children}</UserDashboardShell>;
}
