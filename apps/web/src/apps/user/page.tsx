import { UserJourneyChoiceCards } from "@dashboard/components/features/user/UserJourneyChoiceCards";
import { GlassCard } from "@dashboard/components/shared/GlassCard";

export function UserDashboardHome() {
  return (
    <>
      <section id="journeys" className="scroll-mt-28">
        <UserJourneyChoiceCards journeys={[]} riskZones={[]} />
      </section>
      <section id="places" className="scroll-mt-28 mt-10">
        <GlassCard>
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--fg)]">
            Places
          </p>
          <p className="mt-2 text-sm text-[rgb(var(--muted-rgb))]">
            Authenticity-first hints — wire to places and scores.
          </p>
        </GlassCard>
      </section>
    </>
  );
}
