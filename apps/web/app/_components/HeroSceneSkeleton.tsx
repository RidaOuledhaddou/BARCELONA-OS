export function HeroSceneSkeleton() {
  return (
    <div className="glass-panel relative h-[360px] overflow-hidden rounded-[32px] border border-[rgb(var(--accent-rgb)/0.18)] md:h-[540px]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(212,175,55,0.18),transparent_32%),radial-gradient(circle_at_70%_60%,rgba(226,114,91,0.16),transparent_30%)]" />
      <div className="absolute inset-0 animate-pulse bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.08),transparent)]" />
      <div className="absolute inset-x-10 top-10 h-10 rounded-full bg-[rgb(var(--surface-strong-rgb)/0.8)]" />
      <div className="absolute inset-x-16 top-28 h-48 rounded-full border border-[rgb(var(--accent-rgb)/0.18)]" />
      <div className="absolute bottom-10 left-10 right-10 h-20 rounded-[24px] bg-[rgb(var(--surface-rgb)/0.72)]" />
    </div>
  );
}
