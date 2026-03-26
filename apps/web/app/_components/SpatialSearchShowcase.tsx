"use client";

import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useTranslations } from "next-intl";

export default function SpatialSearchShowcase() {
  const t = useTranslations("showcase");

  return (
    <section
      id="hotels"
      className="grid gap-6 rounded-[32px] border border-[rgb(var(--accent-rgb)/0.16)] bg-[rgb(var(--surface-rgb)/0.72)] p-6 backdrop-blur-xl lg:grid-cols-[1.05fr_0.95fr]"
    >
      <div className="space-y-5">
        <div className="text-xs font-semibold uppercase tracking-[0.28em] text-[rgb(var(--accent-rgb))]">
          {t("subtitle")}
        </div>
        <div>
          <h2 className="text-3xl font-semibold text-[var(--fg)] md:text-4xl">
            {t("title")}
          </h2>
        </div>
        <div className="flex items-center gap-3 rounded-full border border-[rgb(var(--accent-rgb)/0.16)] bg-[rgb(var(--surface-strong-rgb)/0.7)] px-4 py-3">
          <Search className="h-4 w-4 text-[rgb(var(--accent-rgb))]" />
          <span className="text-sm text-[rgb(var(--fg-rgb)/0.72)]">
            {t("placeholder")}
          </span>
        </div>
        <div className="rounded-[26px] bg-[rgb(var(--surface-strong-rgb)/0.75)] p-5">
          <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[rgb(var(--accent-rgb))]">
            Match
          </div>
          <div className="mt-3 text-lg font-medium text-[var(--fg)]">
            {t("result")}
          </div>
          <div className="mt-4 flex gap-2 text-xs text-[rgb(var(--fg-rgb)/0.65)]">
            <span className="rounded-full bg-[rgb(var(--accent-rgb)/0.12)] px-3 py-2">
              Premium inventory
            </span>
            <span className="rounded-full bg-[rgb(var(--accent-rgb)/0.12)] px-3 py-2">
              Live taxi reach
            </span>
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-[30px] border border-[rgb(var(--accent-rgb)/0.18)] bg-[linear-gradient(180deg,rgba(212,175,55,0.08),rgba(0,0,0,0)),rgb(var(--surface-strong-rgb)/0.8)] p-6">
        <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(212,175,55,0.13)_1px,transparent_1px),linear-gradient(90deg,rgba(212,175,55,0.13)_1px,transparent_1px)] [background-size:34px_34px]" />
        <div className="absolute left-[18%] top-[22%] h-24 w-24 rounded-full border border-[rgb(var(--accent-soft-rgb)/0.32)]" />
        <div className="absolute right-[16%] top-[36%] h-20 w-20 rounded-full border border-[rgb(var(--accent-rgb)/0.28)]" />
        <div className="absolute bottom-[20%] left-[38%] h-28 w-28 rounded-full border border-[rgb(var(--accent-rgb)/0.24)]" />

        <motion.div
          animate={{ x: [0, 36, 18, 52], y: [0, 18, 42, 24] }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
          className="absolute left-[26%] top-[32%] z-10 flex h-10 w-10 items-center justify-center rounded-full bg-[rgb(var(--accent-rgb))] text-[rgb(var(--bg-rgb))] shadow-[0_14px_35px_rgba(212,175,55,0.45)]"
        >
          B
        </motion.div>

        <motion.div
          animate={{ scale: [1, 1.18, 1], opacity: [0.35, 0.15, 0.35] }}
          transition={{ duration: 2.2, repeat: Infinity }}
          className="absolute left-[24%] top-[30%] h-16 w-16 rounded-full border border-[rgb(var(--accent-rgb)/0.45)]"
        />

        <div className="absolute inset-x-6 bottom-6 rounded-[22px] border border-[rgb(var(--accent-rgb)/0.16)] bg-[rgb(var(--surface-rgb)/0.78)] px-4 py-4 backdrop-blur-xl">
          <div className="text-xs uppercase tracking-[0.2em] text-[rgb(var(--accent-rgb))]">
            Spatial match
          </div>
          <div className="mt-2 text-sm text-[rgb(var(--fg-rgb)/0.72)]">
            Eixample, 2 minutes from the active taxi lane with premium room availability.
          </div>
        </div>
      </div>
    </section>
  );
}
