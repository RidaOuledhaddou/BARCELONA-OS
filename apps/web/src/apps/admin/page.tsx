import { AdminRiskZoneEditor } from "@dashboard/components/features/admin/AdminRiskZoneEditor";
import { BentoGrid, BentoItem } from "@dashboard/components/shared/BentoGrid";

export function AdminDashboardHome() {
  return (
    <BentoGrid layoutIdPrefix="admin-bento">
      <BentoItem colSpan={2} rowSpan={1} layoutId="admin-summary">
        <p className="text-xs font-semibold uppercase tracking-wider text-[var(--fg)]">
          Summary
        </p>
        <p className="mt-2 text-sm text-[rgb(var(--muted-rgb))]">Boilerplate · wire KPIs</p>
      </BentoItem>
      <BentoItem colSpan={2} layoutId="admin-risk">
        <AdminRiskZoneEditor />
      </BentoItem>
    </BentoGrid>
  );
}
