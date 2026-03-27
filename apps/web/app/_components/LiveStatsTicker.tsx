"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

type StatItem = {
  label: string;
  value: number;
  suffix?: string;
  decimals?: number;
};

function formatValue(value: number, decimals = 0, locale = "en") {
  return value.toLocaleString(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function LiveStatsTicker({ items, locale }: { items: StatItem[]; locale: string }) {
  const tStats = useTranslations("stats");
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
      className="premium-card section-glow mt-12 rounded-[32px] px-6 py-6 md:px-8 md:py-8"
    >
      <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.28em] text-[rgb(var(--secondary-rgb))]">
        <span className="inline-flex h-2.5 w-2.5 animate-pulse rounded-full bg-[rgb(var(--secondary-rgb))] shadow-[0_0_18px_rgb(var(--secondary-rgb)/0.35)]" />
        {tStats("pulse")}
      </div>
      <div className="premium-grid mt-6 md:grid-cols-3">
        {items.map((item, index) => (
          <div
            key={item.label}
            className="rounded-[28px] border border-[rgb(var(--stroke-rgb)/var(--stroke-alpha))] bg-[rgb(var(--surface-rgb)/var(--surface-strong-alpha))] px-6 py-6"
          >
            <div className="text-3xl font-semibold tracking-[-0.04em] text-[var(--fg)] md:text-4xl">
              {formatValue(values[index] ?? 0, item.decimals, locale)}
              {item.suffix ?? ""}
            </div>
            <div className="mt-3 text-sm text-[rgb(var(--muted-rgb))]">
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
