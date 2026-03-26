"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

const storageKey = "barcelona-city-os-theme";
type ThemeName = "midnight" | "sunny";

function getAstronomicalTheme() {
  const hour = new Date().getHours();
  return hour >= 6 && hour < 19 ? "sunny" : "midnight";
}

type ThemeContextValue = {
  resolvedTheme: ThemeName;
  setTheme: (theme: ThemeName) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function applyTheme(theme: ThemeName) {
  const root = document.documentElement;
  root.classList.remove("midnight", "sunny");
  root.classList.add(theme);
}

function getStoredTheme() {
  const value = window.localStorage.getItem(storageKey);
  return value === "midnight" || value === "sunny" ? value : null;
}

function TimeBasedThemeSync({ setTheme }: { setTheme: (theme: ThemeName) => void }) {

  useEffect(() => {
    const override = getStoredTheme();
    if (!override) {
      setTheme(getAstronomicalTheme());
    }

    const interval = window.setInterval(() => {
      const persisted = getStoredTheme();
      if (!persisted) {
        setTheme(getAstronomicalTheme());
      }
    }, 60_000);

    return () => window.clearInterval(interval);
  }, [setTheme]);

  return null;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeName>("midnight");

  function setTheme(nextTheme: ThemeName) {
    setThemeState(nextTheme);
    applyTheme(nextTheme);
  }

  useEffect(() => {
    const storedTheme = getStoredTheme();
    const initialTheme = storedTheme ?? getAstronomicalTheme();
    setThemeState(initialTheme);
    applyTheme(initialTheme);
  }, []);

  const value = useMemo<ThemeContextValue>(
    () => ({
      resolvedTheme: theme,
      setTheme,
    }),
    [theme],
  );

  return (
    <ThemeContext.Provider value={value}>
      <TimeBasedThemeSync setTheme={setTheme} />
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }

  return context;
}

export { storageKey };
