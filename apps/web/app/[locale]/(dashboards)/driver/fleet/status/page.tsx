import { GlassCard } from "@dashboard/components/shared/GlassCard";

export default function DriverFleetStatusPage() {
  return (
    <GlassCard>
      <p className="text-xs font-bold uppercase tracking-widest text-[var(--fg)]">
        Fleet · status
      </p>
      <p className="mt-2 text-sm text-[rgb(var(--muted-rgb))]">
        Boilerplate · vehicle compliance panel
      </p>
    </GlassCard>
  );
}
