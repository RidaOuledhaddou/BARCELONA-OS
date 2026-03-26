"use client";

import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import { useEffect } from "react";

const storageKey = "barcelona-city-os-theme";

function getAstronomicalTheme() {
  const hour = new Date().getHours();
  return hour >= 6 && hour < 19 ? "sunny" : "midnight";
}

function TimeBasedThemeSync() {
  const { setTheme } = useTheme();

  useEffect(() => {
    const override = window.localStorage.getItem(storageKey);
    if (!override) {
      setTheme(getAstronomicalTheme());
    }

    const interval = window.setInterval(() => {
      const persisted = window.localStorage.getItem(storageKey);
      if (!persisted) {
        setTheme(getAstronomicalTheme());
      }
    }, 60_000);

    return () => window.clearInterval(interval);
  }, [setTheme]);

  return null;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="midnight"
      enableSystem={false}
      themes={["midnight", "sunny"]}
    >
      <TimeBasedThemeSync />
      {children}
    </NextThemesProvider>
  );
}

export { storageKey };
