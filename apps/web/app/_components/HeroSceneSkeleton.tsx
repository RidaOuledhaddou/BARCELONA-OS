export function HeroSceneSkeleton() {
  return (
    <div className="premium-card relative h-[300px] w-full max-w-[620px] overflow-hidden rounded-[32px] sm:h-[320px] md:h-[350px] lg:h-[390px] lg:max-w-[700px]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgb(var(--accent-soft-rgb)/0.14),transparent_22%),radial-gradient(circle_at_78%_26%,rgb(var(--accent-rgb)/0.12),transparent_24%)]" />
      <div className="absolute inset-0 animate-pulse bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.08),transparent)]" />
      <div className="absolute inset-x-8 top-8 h-10 rounded-full border border-[rgb(var(--stroke-rgb)/var(--stroke-alpha))] bg-[rgb(var(--surface-rgb)/var(--surface-alpha))]" />
      <div className="absolute left-1/2 top-1/2 h-[150px] w-[240px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[rgb(var(--accent-soft-rgb)/0.08)] blur-2xl sm:h-[170px] sm:w-[280px] lg:h-[200px] lg:w-[320px]" />
    </div>
  );
}
