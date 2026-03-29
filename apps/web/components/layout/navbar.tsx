"use client";

import { useEffect, useState } from "react";
import {
  ArrowRight,
  BarChart3,
  Building2,
  CarTaxiFront,
  Hotel,
  LogIn,
  Map,
  Sparkles,
  UserRound,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { dashboardPaths } from "@dashboard/lib/dashboard-navigation";
import { Link } from "../../i18n/navigation";
import { ThemeToggle } from "./theme-toggle";

const sections = [
  { key: "mapExplorer", href: "#map-explorer", icon: Map },
  { key: "taxiFleet", href: "#taxi-fleet", icon: CarTaxiFront },
  { key: "hotels", href: "#hotels", icon: Hotel },
  { key: "analytics", href: "#analytics", icon: BarChart3 },
] as const;

const dashboardStrip = [
  {
    key: "dashboardAdmin" as const,
    href: dashboardPaths.adminHome,
    icon: Building2,
  },
  {
    key: "dashboardUser" as const,
    href: dashboardPaths.userHome,
    icon: UserRound,
  },
  {
    key: "dashboardDriver" as const,
    href: dashboardPaths.driverHome,
    icon: CarTaxiFront,
  },
];

export type NavbarVariant = "marketing" | "dashboard";

export function Navbar({ variant = "marketing" }: { variant?: NavbarVariant }) {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const onDashboard =
    variant === "dashboard" ||
    /^\/[^/]+\/(admin|user|driver)(\/|$)/.test(pathname);

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
            "mx-auto flex max-w-6xl items-center rounded-full border px-3 py-2 transition-all duration-300 md:px-3.5",
            isScrolled
              ? "bg-[var(--nav-bg-strong)] border-[rgb(var(--stroke-rgb)/var(--stroke-alpha))] shadow-[var(--card-shadow)] backdrop-blur-[12px]"
              : "bg-[var(--nav-bg)] border-[rgb(var(--stroke-rgb)/var(--stroke-alpha))] backdrop-blur-[12px]",
          ].join(" ")}
        >
          <Link
            href="/"
            locale={locale}
            className="group flex h-10 items-center gap-2 rounded-full px-3 pr-4 text-sm font-semibold tracking-[0.12em] uppercase text-[rgb(var(--secondary-rgb))] transition hover:bg-[rgb(var(--surface-rgb)/var(--surface-alpha))]"
          >
            <span className="relative flex h-8 w-8 items-center justify-center rounded-full border border-[rgb(var(--stroke-rgb)/var(--stroke-alpha))] bg-[rgb(var(--surface-rgb)/var(--surface-alpha))]">
              <Sparkles className="h-3.5 w-3.5 text-[rgb(var(--secondary-rgb))]" aria-hidden />
            </span>
            <span className="hidden leading-none sm:block">{t("brand")}</span>
          </Link>

          {onDashboard ? (
            <nav
              className="hidden md:ml-1 md:flex md:items-center md:gap-1 border-l border-[rgb(var(--stroke-rgb)/var(--stroke-alpha))] pl-2"
              aria-label={t("dashboardsAria")}
            >
              {dashboardStrip.map(({ key, href, icon: Icon }) => (
                <Link
                  key={key}
                  href={href}
                  className="flex h-10 items-center justify-center gap-1.5 rounded-full px-3 text-sm font-medium text-[rgb(var(--muted-rgb))] transition hover:bg-[rgb(var(--surface-rgb)/var(--surface-alpha))] hover:text-[var(--fg)]"
                >
                  <Icon className="h-3.5 w-3.5 text-[rgb(var(--dashboard-accent-rgb))]" aria-hidden />
                  <span>{t(key)}</span>
                </Link>
              ))}
            </nav>
          ) : null}

          <nav className="hidden md:ml-2 md:flex md:flex-1 md:items-center md:justify-center md:gap-1">
            {sections.map(({ key, href, icon: Icon }) => (
              <a
                key={key}
                href={sectionHref(href)}
                className="flex h-10 items-center justify-center gap-1.5 rounded-full px-3.5 text-sm font-medium text-[rgb(var(--muted-rgb))] transition hover:bg-[rgb(var(--surface-rgb)/var(--surface-alpha))] hover:text-[var(--fg)]"
              >
                <Icon className="h-3.5 w-3.5 text-[rgb(var(--secondary-rgb))]" aria-hidden />
                <span>{t(key)}</span>
              </a>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <ThemeToggle />

            <Link
              href="/login"
              locale={locale}
              className="hidden h-10 items-center justify-center gap-1.5 rounded-full border border-[rgb(var(--stroke-rgb)/var(--stroke-alpha))] bg-[rgb(var(--button-secondary-rgb)/var(--button-secondary-alpha))] px-4 text-sm font-semibold text-[var(--fg)] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_10px_26px_rgba(0,0,0,0.16)] transition hover:-translate-y-0.5 hover:bg-[rgb(var(--button-secondary-rgb)/var(--button-secondary-hover-alpha))] md:flex"
            >
              <LogIn className="h-3.5 w-3.5 text-[rgb(var(--secondary-rgb))]" aria-hidden />
              <span>{t("signIn")}</span>
            </Link>

            <Link
              href="/signup"
              locale={locale}
              className="join-fleet-button hidden h-10 items-center justify-center gap-1.5 rounded-full border border-[rgb(var(--stroke-rgb)/var(--stroke-alpha))] bg-[linear-gradient(180deg,rgb(var(--button-top-rgb)),rgb(var(--button-bottom-rgb)))] px-4 text-sm font-bold text-[rgb(var(--button-fg-rgb))] shadow-[inset_0_1px_0_rgba(255,255,255,0.22),0_14px_40px_rgb(var(--button-shadow-rgb)/0.22)] transition hover:-translate-y-0.5 hover:[filter:brightness(var(--button-hover-brightness))] md:flex"
            >
              <span>{t("signUp")}</span>
              <ArrowRight className="h-3.5 w-3.5" aria-hidden />
            </Link>

            <Link
              href="/login"
              locale={locale}
              className="flex h-10 min-w-[6.5rem] items-center justify-center rounded-full border border-[rgb(var(--stroke-rgb)/var(--stroke-alpha))] bg-[linear-gradient(180deg,rgb(var(--button-top-rgb)),rgb(var(--button-bottom-rgb)))] px-3.5 text-sm font-semibold text-[rgb(var(--button-fg-rgb))] shadow-[inset_0_1px_0_rgba(255,255,255,0.22),0_14px_40px_rgb(var(--button-shadow-rgb)/0.22)] transition hover:-translate-y-0.5 hover:[filter:brightness(var(--button-hover-brightness))] md:hidden"
            >
              {t("signIn")}
            </Link>
          </div>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-4 z-40 px-3 md:hidden">
        <div className="mx-auto max-w-sm rounded-3xl border border-[rgb(var(--stroke-rgb)/var(--stroke-alpha))] bg-[var(--nav-bg)] px-2 py-2 backdrop-blur-[10px] shadow-[var(--card-shadow)]">
          {onDashboard ? (
            <div className="grid grid-cols-3 gap-1 border-b border-[rgb(var(--stroke-rgb)/0.12)] pb-2">
              {dashboardStrip.map(({ key, href, icon: Icon }) => (
                <Link
                  key={key}
                  href={href}
                  className="flex flex-col items-center gap-1 rounded-2xl px-1 py-2 text-[10px] font-medium text-[rgb(var(--muted-rgb))] transition hover:bg-[rgb(var(--surface-rgb)/var(--surface-alpha))] hover:text-[var(--fg)]"
                >
                  <Icon className="h-4 w-4 text-[rgb(var(--dashboard-accent-rgb))]" aria-hidden />
                  <span className="text-center leading-tight">{t(key)}</span>
                </Link>
              ))}
            </div>
          ) : null}
          <div className={`grid grid-cols-4 gap-1 ${onDashboard ? "pt-2" : ""}`}>
            {sections.map(({ key, href, icon: Icon }) => (
              <a
                key={key}
                href={sectionHref(href)}
                className="flex flex-col items-center gap-1 rounded-2xl px-2 py-2 text-[10px] font-medium text-[rgb(var(--muted-rgb))] transition hover:bg-[rgb(var(--surface-rgb)/var(--surface-alpha))] hover:text-[var(--fg)]"
              >
                <Icon className="h-4 w-4 text-[rgb(var(--secondary-rgb))]" aria-hidden />
                <span>{t(key)}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
