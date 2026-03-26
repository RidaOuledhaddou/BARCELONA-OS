"use client";

import { useEffect, useState } from "react";
import { BarChart3, CarTaxiFront, Hotel, Map } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "../../i18n/navigation";
import { Button } from "../ui/button";
import { ThemeToggle } from "./theme-toggle";

const sections = [
  { key: "mapExplorer", href: "#map-explorer", icon: Map },
  { key: "taxiFleet", href: "#taxi-fleet", icon: CarTaxiFront },
  { key: "hotels", href: "#hotels", icon: Hotel },
  { key: "analytics", href: "#analytics", icon: BarChart3 },
] as const;

export function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let frame = 0;

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 18);
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const sectionHref = (hash: string) => `/${locale}${hash}`;

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6">
        <div
          className={[
            "mx-auto flex max-w-7xl items-center rounded-full border px-3 py-2 transition-all duration-300 md:px-4",
            isScrolled
              ? "glass-panel border-[rgb(var(--accent-rgb)/0.24)] shadow-[0_12px_40px_rgba(0,0,0,0.28)]"
              : "bg-[rgb(var(--surface-rgb)/0.52)] border-[rgb(var(--accent-rgb)/0.16)] backdrop-blur-xl",
          ].join(" ")}
        >
          <Link
            href="/"
            locale={locale}
            className="flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold tracking-[0.2em] uppercase text-[rgb(var(--accent-rgb))]"
          >
            <span className="h-2.5 w-2.5 rounded-full bg-[rgb(var(--accent-rgb))]" />
            {t("brand")}
          </Link>

          <nav className="hidden md:ml-3 md:flex md:items-center md:gap-1">
            {sections.map(({ key, href }) => (
              <a
                key={key}
                href={sectionHref(href)}
                className="rounded-full px-4 py-2 text-sm text-[rgb(var(--fg-rgb)/0.82)] transition hover:bg-[rgb(var(--surface-strong-rgb)/0.78)] hover:text-[var(--fg)]"
              >
                {t(key)}
              </a>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <ThemeToggle />

            <Link href="/login" locale={locale} className="hidden md:block">
              <Button variant="secondary">{t("signIn")}</Button>
            </Link>

            <Link href="/signup" locale={locale} className="hidden md:block">
              <Button>{t("signUp")}</Button>
            </Link>

            <Link href="/login" locale={locale} className="md:hidden">
              <Button size="sm">{t("signIn")}</Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-4 z-40 px-3 md:hidden">
        <div className="mx-auto grid max-w-sm grid-cols-4 rounded-full border border-[rgb(var(--accent-rgb)/0.24)] bg-[rgb(var(--surface-rgb)/0.82)] px-2 py-2 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.28)]">
          {sections.map(({ key, href, icon: Icon }) => (
            <a
              key={key}
              href={sectionHref(href)}
              className="flex flex-col items-center gap-1 rounded-2xl px-2 py-2 text-[10px] font-medium text-[rgb(var(--fg-rgb)/0.82)] transition hover:bg-[rgb(var(--surface-strong-rgb)/0.78)] hover:text-[var(--fg)]"
            >
              <Icon className="h-4 w-4 text-[rgb(var(--accent-rgb))]" />
              <span>{t(key)}</span>
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
