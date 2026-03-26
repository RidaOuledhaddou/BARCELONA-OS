"use client";

import { useEffect, useRef, useState } from "react";

type StatItem = {
  label: string;
  value: number;
  suffix?: string;
  decimals?: number;
};

function formatValue(value: number, decimals = 0) {
  return value.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function LiveStatsTicker({ items }: { items: StatItem[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [values, setValues] = useState(items.map(() => 0));

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setActive(true);
        }
      },
      { threshold: 0.3 },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!active) {
      return;
    }

    const duration = 1200;
    const start = performance.now();

    let frame = 0;
    const tick = (time: number) => {
      const progress = Math.min((time - start) / duration, 1);
      setValues(items.map((item) => item.value * progress));
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, items]);

  return (
    <div
      ref={ref}
      className="glass-panel mt-10 rounded-[28px] border border-[rgb(var(--accent-rgb)/0.18)] px-4 py-4 md:px-6"
    >
      <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-[rgb(var(--accent-rgb))]">
        <span className="inline-flex h-2.5 w-2.5 rounded-full bg-[rgb(var(--accent-rgb))] animate-pulse" />
        Live Data
      </div>
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {items.map((item, index) => (
          <div key={item.label} className="rounded-3xl bg-[rgb(var(--surface-strong-rgb)/0.6)] px-5 py-4">
            <div className="text-2xl font-semibold text-[var(--fg)] md:text-3xl">
              {formatValue(values[index] ?? 0, item.decimals)}
              {item.suffix ?? ""}
            </div>
            <div className="mt-2 text-sm text-[rgb(var(--fg-rgb)/0.72)]">
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
