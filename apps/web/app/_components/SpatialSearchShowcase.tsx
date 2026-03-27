"use client";

import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useTranslations } from "next-intl";

export default function SpatialSearchShowcase() {
  const t = useTranslations("showcase");

  return (
    <section
      id="hotels"
      className="premium-card section-glow grid gap-8 rounded-[36px] p-8 lg:grid-cols-[1.05fr_0.95fr] lg:p-10"
    >
      <div className="space-y-5">
        <div className="text-xs font-semibold uppercase tracking-[0.3em] text-[rgb(var(--secondary-rgb))]">
          {t("subtitle")}
        </div>
        <div>
          <h2 className="text-3xl font-semibold tracking-[-0.04em] text-[var(--fg)] md:text-5xl">
            {t("title")}
          </h2>
        </div>
        <div className="rounded-[28px] border border-[rgb(var(--stroke-rgb)/var(--stroke-alpha))] bg-[rgb(var(--surface-rgb)/var(--surface-strong-alpha))] p-[1px] shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_20px_50px_rgba(0,0,0,0.08)]">
          <div className="flex items-center gap-3 rounded-[27px] bg-[rgb(var(--surface-rgb)/var(--surface-alpha))] px-5 py-4 shadow-[inset_0_1px_10px_rgba(255,255,255,0.05)]">
            <Search className="h-4 w-4 text-[rgb(var(--secondary-rgb))]" />
            <span className="text-sm text-[rgb(var(--muted-rgb))]">
            {t("placeholder")}
            </span>
          </div>
        </div>
        <div className="rounded-[30px] border border-[rgb(var(--stroke-rgb)/var(--stroke-alpha))] bg-[rgb(var(--surface-rgb)/var(--surface-strong-alpha))] p-6">
          <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[rgb(var(--secondary-rgb))]">
            Match
          </div>
          <div className="mt-3 text-lg font-medium tracking-[-0.03em] text-[var(--fg)]">
            {t("result")}
          </div>
          <div className="mt-5 flex flex-wrap gap-2 text-xs text-[rgb(var(--muted-rgb))]">
            <span className="rounded-full border border-[rgb(var(--stroke-rgb)/var(--stroke-alpha))] bg-[rgb(var(--surface-rgb)/var(--surface-alpha))] px-3 py-2">
              Premium inventory
            </span>
            <span className="rounded-full border border-[rgb(var(--stroke-rgb)/var(--stroke-alpha))] bg-[rgb(var(--surface-rgb)/var(--surface-alpha))] px-3 py-2">
              Live taxi reach
            </span>
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-[32px] border border-[rgb(var(--stroke-rgb)/var(--stroke-alpha))] bg-[rgb(var(--surface-rgb)/var(--surface-strong-alpha))] p-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgb(var(--accent-soft-rgb)/0.18),transparent_20%),radial-gradient(circle_at_82%_28%,rgb(var(--secondary-rgb)/0.12),transparent_24%),linear-gradient(rgb(var(--stroke-rgb)/0.08)_1px,transparent_1px),linear-gradient(90deg,rgb(var(--stroke-rgb)/0.08)_1px,transparent_1px)] [background-size:auto,auto,36px_36px,36px_36px]" />
        <div className="absolute left-[18%] top-[22%] h-24 w-24 rounded-full border border-[rgb(var(--stroke-rgb)/var(--stroke-alpha))] bg-[rgb(var(--secondary-rgb)/0.05)]" />
        <div className="absolute right-[16%] top-[36%] h-20 w-20 rounded-full border border-[rgb(var(--stroke-rgb)/var(--stroke-alpha))] bg-[rgb(var(--secondary-rgb)/0.05)]" />
        <div className="absolute bottom-[20%] left-[38%] h-28 w-28 rounded-full border border-[rgb(var(--stroke-rgb)/var(--stroke-alpha))] bg-[rgb(var(--secondary-rgb)/0.05)]" />

        <motion.div
          animate={{ x: [0, 36, 18, 52], y: [0, 18, 42, 24] }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
          className="absolute left-[26%] top-[32%] z-10 flex h-10 w-10 items-center justify-center rounded-full bg-[rgb(var(--accent-rgb))] text-[rgb(var(--button-fg-rgb))] shadow-[0_0_28px_rgb(var(--secondary-rgb)/0.28)]"
        >
          B
        </motion.div>

        <motion.div
          animate={{ scale: [1, 1.18, 1], opacity: [0.35, 0.15, 0.35] }}
          transition={{ duration: 2.2, repeat: Infinity }}
          className="absolute left-[24%] top-[30%] h-16 w-16 rounded-full border border-[rgb(var(--secondary-rgb)/0.4)]"
        />

        <div className="absolute inset-x-6 bottom-6 rounded-[24px] border border-[rgb(var(--stroke-rgb)/var(--stroke-alpha))] bg-[rgb(var(--surface-rgb)/var(--surface-alpha))] px-5 py-5 backdrop-blur-xl">
          <div className="text-xs uppercase tracking-[0.2em] text-[rgb(var(--secondary-rgb))]">
            Spatial match
          </div>
          <div className="mt-2 text-sm leading-7 text-[rgb(var(--muted-rgb))]">
            Eixample, 2 minutes from the active taxi lane with premium room availability.
          </div>
        </div>
      </div>
    </section>
  );
}
