"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Moon, SunMedium } from "lucide-react";
import { useTheme } from "next-themes";
import { storageKey } from "../../app/theme-provider";
import { Button } from "../ui/button";

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
      className="relative overflow-hidden border-[rgb(var(--accent-rgb)/0.22)]"
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
          className="absolute inset-0 flex items-center justify-center"
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
