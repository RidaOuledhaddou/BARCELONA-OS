"use client";

import { useEffect, useState } from "react";
import {
  ArrowRight,
  BarChart3,
  CarTaxiFront,
  Hotel,
  LogIn,
  Map,
  Sparkles,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "../../i18n/navigation";
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
            "mx-auto flex max-w-5xl items-center rounded-full border px-2.5 py-1.5 transition-all duration-300 md:px-3",
            isScrolled
              ? "glass-panel border-[rgb(var(--accent-rgb)/0.12)] shadow-[0_10px_28px_rgba(0,0,0,0.2)]"
              : "bg-[rgb(var(--surface-rgb)/0.56)] border-[rgb(var(--accent-rgb)/0.08)] backdrop-blur-xl",
          ].join(" ")}
        >
          <Link
            href="/"
            locale={locale}
            className="group flex h-9 items-center gap-2 rounded-full px-2.5 pr-3 text-sm font-semibold tracking-[0.12em] uppercase text-[rgb(var(--accent-rgb))] transition hover:bg-[rgb(var(--surface-strong-rgb)/0.32)]"
          >
            <span className="relative flex h-7 w-7 items-center justify-center rounded-full bg-[rgb(var(--surface-strong-rgb)/0.55)]">
              <Sparkles className="h-3.5 w-3.5 text-[rgb(var(--accent-rgb))]" aria-hidden />
            </span>
            <span className="hidden leading-none sm:block">{t("brand")}</span>
          </Link>

          <nav className="hidden md:ml-2 md:flex md:flex-1 md:items-center md:justify-center md:gap-1">
            {sections.map(({ key, href, icon: Icon }) => (
              <a
                key={key}
                href={sectionHref(href)}
                className="flex h-9 items-center justify-center gap-1.5 rounded-full px-3 text-sm font-medium text-[rgb(var(--fg-rgb)/0.76)] transition hover:bg-[rgb(var(--surface-strong-rgb)/0.34)] hover:text-[var(--fg)]"
              >
                <Icon className="h-3.5 w-3.5 text-[rgb(var(--accent-rgb)/0.9)]" aria-hidden />
                <span>{t(key)}</span>
              </a>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <ThemeToggle />

            <Link
              href="/login"
              locale={locale}
              className="hidden md:flex h-9 items-center justify-center gap-1.5 rounded-full border border-[rgb(var(--accent-rgb)/0.1)] bg-[rgb(var(--surface-rgb)/0.44)] px-3.5 text-sm font-semibold text-[var(--fg)] transition hover:bg-[rgb(var(--surface-strong-rgb)/0.34)]"
            >
              <LogIn className="h-3.5 w-3.5 text-[rgb(var(--accent-rgb))]" aria-hidden />
              <span>{t("signIn")}</span>
            </Link>

            <Link
              href="/signup"
              locale={locale}
              className="hidden md:flex h-9 items-center justify-center gap-1.5 rounded-full bg-[rgb(var(--accent-rgb))] px-3.5 text-sm font-semibold text-[rgb(var(--bg-rgb))] shadow-[0_8px_20px_rgba(212,175,55,0.16)] transition hover:brightness-105"
            >
              <span>{t("signUp")}</span>
              <ArrowRight className="h-3.5 w-3.5" aria-hidden />
            </Link>

            <Link
              href="/login"
              locale={locale}
              className="flex h-9 min-w-[6.25rem] items-center justify-center rounded-full bg-[rgb(var(--accent-rgb))] px-3.5 text-sm font-semibold text-[rgb(var(--bg-rgb))] shadow-[0_8px_20px_rgba(212,175,55,0.16)] md:hidden"
            >
              {t("signIn")}
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
