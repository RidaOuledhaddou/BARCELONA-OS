"use client";

import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import { Moon, SunMedium } from "lucide-react";
import { storageKey, useTheme } from "../../app/theme-provider";
import { Button } from "../ui/button";

const segmentBase =
  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--accent-rgb))] focus-visible:ring-offset-2 focus-visible:ring-offset-[rgb(var(--bg-rgb))]";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const isSunny = resolvedTheme === "sunny";

  function toggleTheme() {
    const nextTheme = isSunny ? "midnight" : "sunny";
    window.localStorage.setItem(storageKey, nextTheme);
    setTheme(nextTheme);
  }

  return (
    <Button
      type="button"
      variant="secondary"
      size="icon"
      className="relative overflow-hidden border-[rgb(var(--stroke-rgb)/var(--stroke-alpha))] bg-[rgb(var(--surface-rgb)/var(--surface-alpha))]"
      onClick={toggleTheme}
      aria-label={isSunny ? "Switch to midnight mode" : "Switch to sunny mode"}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isSunny ? "sunny" : "midnight"}
          initial={{ opacity: 0, rotate: -24, scale: 0.6 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 24, scale: 0.6 }}
          transition={{ duration: 0.2 }}
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
        >
          {isSunny ? (
            <Moon className="h-4 w-4" />
          ) : (
            <SunMedium className="h-4 w-4" />
          )}
        </motion.span>
      </AnimatePresence>
    </Button>
  );
}

/** Sun + moon as separate targets — clearer on dashboard layouts where a single icon felt broken. */
export function DashboardThemeModes() {
  const { resolvedTheme, setTheme } = useTheme();

  function pick(theme: "midnight" | "sunny") {
    window.localStorage.setItem(storageKey, theme);
    setTheme(theme);
  }

  return (
    <div
      role="group"
      aria-label="Theme mode"
      className="flex h-10 shrink-0 items-center gap-0.5 rounded-full border border-[rgb(var(--stroke-rgb)/var(--stroke-alpha))] bg-[rgb(var(--surface-rgb)/var(--surface-alpha))] p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
    >
      <button
        type="button"
        aria-pressed={resolvedTheme === "midnight"}
        aria-label="Midnight mode"
        onClick={() => pick("midnight")}
        className={clsx(
          segmentBase,
          resolvedTheme === "midnight"
            ? "bg-[rgb(var(--button-secondary-rgb)/var(--button-secondary-hover-alpha))] text-[var(--fg)] shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]"
            : "text-[rgb(var(--muted-rgb))] hover:bg-[rgb(var(--surface-rgb)/0.5)] hover:text-[var(--fg)]",
        )}
      >
        <Moon className="h-4 w-4" aria-hidden />
      </button>
      <button
        type="button"
        aria-pressed={resolvedTheme === "sunny"}
        aria-label="Sunny mode"
        onClick={() => pick("sunny")}
        className={clsx(
          segmentBase,
          resolvedTheme === "sunny"
            ? "bg-[rgb(var(--button-secondary-rgb)/var(--button-secondary-hover-alpha))] text-[var(--fg)] shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]"
            : "text-[rgb(var(--muted-rgb))] hover:bg-[rgb(var(--surface-rgb)/0.5)] hover:text-[var(--fg)]",
        )}
      >
        <SunMedium className="h-4 w-4" aria-hidden />
      </button>
    </div>
  );
}
