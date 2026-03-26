export function HeroSceneSkeleton() {
  return (
    <div className="glass-panel relative h-[320px] w-full max-w-[520px] overflow-hidden rounded-[30px] border border-[rgb(var(--accent-rgb)/0.18)] sm:h-[340px] md:h-[370px] lg:h-[430px] lg:max-w-[620px]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(212,175,55,0.18),transparent_32%),radial-gradient(circle_at_70%_60%,rgba(226,114,91,0.16),transparent_30%)]" />
      <div className="absolute inset-0 animate-pulse bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.08),transparent)]" />
      <div className="absolute left-1/2 top-1/2 h-[220px] w-[220px] -translate-x-1/2 -translate-y-[58%] rounded-full border border-[rgb(var(--accent-rgb)/0.18)] sm:h-[240px] sm:w-[240px] lg:h-[280px] lg:w-[280px]" />
      <div className="absolute inset-x-4 bottom-4 h-12 rounded-[24px] bg-[rgb(var(--surface-rgb)/0.72)] sm:inset-x-6 sm:bottom-6 lg:inset-x-8 lg:bottom-8" />
    </div>
  );
}
