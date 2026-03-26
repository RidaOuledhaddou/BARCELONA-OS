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
      className="group rounded-[28px] border border-[rgb(var(--accent-rgb)/0.16)] bg-[rgb(var(--surface-rgb)/0.78)] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.18)] backdrop-blur-xl"
    >
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-[rgb(var(--accent-rgb)/0.24)] bg-[rgb(var(--accent-rgb)/0.12)] text-[rgb(var(--accent-rgb))] transition group-hover:scale-105">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="text-lg font-semibold text-[var(--fg)]">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-[rgb(var(--fg-rgb)/0.72)]">
        {body}
      </p>
    </motion.div>
  );
}
