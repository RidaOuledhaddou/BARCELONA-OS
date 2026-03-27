"use client";

import { motion } from "framer-motion";
import { BarChart3, CarTaxiFront, Hotel } from "lucide-react";

const iconMap = {
  taxis: CarTaxiFront,
  hotels: Hotel,
  analytics: BarChart3,
} as const;

export function BentoCard({
  icon,
  title,
  body,
}: {
  icon: keyof typeof iconMap;
  title: string;
  body: string;
}) {
  const Icon = iconMap[icon];

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 220, damping: 22 }}
      className="premium-card group rounded-[32px] p-8"
    >
      <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-3xl border border-[rgb(var(--stroke-rgb)/var(--stroke-alpha))] bg-[linear-gradient(180deg,rgb(var(--secondary-rgb)/0.2),rgb(var(--secondary-rgb)/0.08))] text-[rgb(var(--secondary-rgb))] transition group-hover:scale-105 group-hover:shadow-[0_0_32px_rgb(var(--secondary-rgb)/0.18)]">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="text-xl font-semibold tracking-[-0.03em] text-[var(--fg)]">{title}</h3>
      <p className="mt-4 text-sm leading-7 text-[rgb(var(--muted-rgb))]">
        {body}
      </p>
    </motion.div>
  );
}
