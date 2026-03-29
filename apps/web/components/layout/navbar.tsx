"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  BarChart3,
  Building2,
  CarTaxiFront,
  Compass,
  Hotel,
  LayoutDashboard,
  LogIn,
  Map,
  Route,
  Shield,
  Sparkles,
  UserRound,
  Wrench,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { dashboardPaths } from "@dashboard/lib/dashboard-navigation";
import { Link } from "../../i18n/navigation";
import { ThemeToggle } from "./theme-toggle";

type DashboardPersona = "admin" | "user" | "driver";

function personaFromPath(pathname: string): DashboardPersona {
  if (pathname.includes("/admin")) return "admin";
  if (pathname.includes("/user")) return "user";
  if (pathname.includes("/driver")) return "driver";
  return "admin";
}

const sections = [
  { key: "mapExplorer", href: "#map-explorer", icon: Map },
  { key: "taxiFleet", href: "#taxi-fleet", icon: CarTaxiFront },
  { key: "hotels", href: "#hotels", icon: Hotel },
  { key: "analytics", href: "#analytics", icon: BarChart3 },
] as const;

const personaSwitch = [
  { persona: "admin" as const, key: "dashboardAdmin" as const, href: dashboardPaths.adminHome, icon: Building2 },
  { persona: "user" as const, key: "dashboardUser" as const, href: dashboardPaths.userHome, icon: UserRound },
  { persona: "driver" as const, key: "dashboardDriver" as const, href: dashboardPaths.driverHome, icon: CarTaxiFront },
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

  const persona = useMemo(() => personaFromPath(pathname), [pathname]);

  const dashboardCenter = useMemo(() => {
    switch (persona) {
      case "admin":
        return [
          {
            key: "dashNavAdminOverview" as const,
            href: dashboardPaths.adminHome,
            icon: LayoutDashboard,
          },
          {
            key: "dashNavAdminModeration" as const,
            href: dashboardPaths.adminOpsModeration,
            icon: Shield,
          },
        ];
      case "user":
        return [
          {
            key: "dashNavUserJourneys" as const,
            href: dashboardPaths.userHome,
            icon: Route,
          },
          {
            key: "dashNavUserPlaces" as const,
            href: dashboardPaths.userHome,
            icon: Compass,
          },
        ];
      case "driver":
        return [
          {
            key: "dashNavDriverShift" as const,
            href: dashboardPaths.driverHome,
            icon: Wrench,
          },
          {
            key: "dashNavDriverFleet" as const,
            href: dashboardPaths.driverFleetStatus,
            icon: CarTaxiFront,
          },
        ];
    }
  }, [persona]);

  const dashboardCtas = useMemo(() => {
    switch (persona) {
      case "admin":
        return [
          {
            key: "dashCtaAdminSecondary" as const,
            href: dashboardPaths.adminHome,
            primary: false,
          },
          {
            key: "dashCtaAdminPrimary" as const,
            href: dashboardPaths.adminOpsModeration,
            primary: true,
          },
        ];
      case "user":
        return [
          {
            key: "dashCtaUserSecondary" as const,
            href: dashboardPaths.userHome,
            primary: false,
          },
          {
            key: "dashCtaUserPrimary" as const,
            href: dashboardPaths.userHome,
            primary: true,
          },
        ];
      case "driver":
        return [
          {
            key: "dashCtaDriverSecondary" as const,
            href: dashboardPaths.driverFleetStatus,
            primary: false,
          },
          {
            key: "dashCtaDriverPrimary" as const,
            href: dashboardPaths.driverHome,
            primary: true,
          },
        ];
    }
  }, [persona]);

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
            className="group flex h-10 shrink-0 items-center gap-2 rounded-full px-3 pr-4 text-sm font-semibold tracking-[0.12em] uppercase text-[rgb(var(--secondary-rgb))] transition hover:bg-[rgb(var(--surface-rgb)/var(--surface-alpha))]"
          >
            <span className="relative flex h-8 w-8 items-center justify-center rounded-full border border-[rgb(var(--stroke-rgb)/var(--stroke-alpha))] bg-[rgb(var(--surface-rgb)/var(--surface-alpha))]">
              <Sparkles className="h-3.5 w-3.5 text-[rgb(var(--secondary-rgb))]" aria-hidden />
            </span>
            <span className="hidden leading-none sm:block">{t("brand")}</span>
          </Link>

          {onDashboard ? (
            <>
              <Link
                href="/"
                locale={locale}
                className="ml-2 hidden h-10 shrink-0 items-center gap-1.5 rounded-full border border-[rgb(var(--stroke-rgb)/var(--stroke-alpha))] bg-[rgb(var(--surface-rgb)/var(--surface-alpha))] px-3 text-xs font-semibold tracking-[0.18em] text-[rgb(var(--dashboard-accent-rgb))] transition hover:brightness-110 md:inline-flex"
              >
                <Compass className="h-3.5 w-3.5 opacity-90" aria-hidden />
                <span className="uppercase">{t("dashboardReturnSuite")}</span>
              </Link>

              <nav
                className="hidden min-w-0 flex-1 flex-nowrap items-center justify-center gap-1 md:flex"
                aria-label={t("dashboardContextAria")}
              >
                {dashboardCenter.map(({ key, href, icon: Icon }) => (
                  <Link
                    key={key}
                    href={href}
                    className="flex h-10 shrink-0 items-center justify-center gap-1.5 rounded-full px-3 text-sm font-medium text-[rgb(var(--muted-rgb))] transition hover:bg-[rgb(var(--surface-rgb)/var(--surface-alpha))] hover:text-[var(--fg)]"
                  >
                    <Icon className="h-3.5 w-3.5 text-[rgb(var(--dashboard-accent-rgb))]" aria-hidden />
                    <span>{t(key)}</span>
                  </Link>
                ))}
                <span
                  className="mx-1 hidden h-5 w-px shrink-0 bg-[rgb(var(--stroke-rgb)/var(--stroke-alpha))] lg:block"
                  aria-hidden
                />
                <span className="hidden items-center gap-1 lg:flex">
                  {personaSwitch
                    .filter((s) => s.persona !== persona)
                    .map(({ key, href, icon: Icon }) => (
                      <Link
                        key={key}
                        href={href}
                        className="flex h-9 shrink-0 items-center gap-1 rounded-full px-2.5 text-[11px] font-semibold uppercase tracking-wider text-[rgb(var(--muted-rgb)/0.82)] transition hover:bg-[rgb(var(--surface-rgb)/var(--surface-alpha))] hover:text-[var(--fg)]"
                      >
                        <Icon className="h-3 w-3 text-[rgb(var(--secondary-rgb)/0.85)]" aria-hidden />
                        <span className="max-w-[5.5rem] truncate">{t(key)}</span>
                      </Link>
                    ))}
                </span>
              </nav>
            </>
          ) : (
            <nav className="hidden min-w-0 flex-1 items-center justify-center gap-1 md:flex">
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
          )}

          <div className="ml-auto flex shrink-0 items-center gap-2">
            <ThemeToggle />

            {onDashboard ? (
              <>
                {dashboardCtas.map((cta) =>
                  cta.primary ? (
                    <Link
                      key={cta.key}
                      href={cta.href}
                      className="join-fleet-button hidden h-10 items-center justify-center gap-1.5 rounded-full border border-[rgb(var(--stroke-rgb)/var(--stroke-alpha))] bg-[linear-gradient(180deg,rgb(var(--button-top-rgb)),rgb(var(--button-bottom-rgb)))] px-4 text-xs font-bold text-[rgb(var(--button-fg-rgb))] shadow-[inset_0_1px_0_rgba(255,255,255,0.22),0_14px_40px_rgb(var(--button-shadow-rgb)/0.22)] transition hover:-translate-y-0.5 hover:[filter:brightness(var(--button-hover-brightness))] md:flex"
                    >
                      <span>{t(cta.key)}</span>
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                    </Link>
                  ) : (
                    <Link
                      key={cta.key}
                      href={cta.href}
                      className="hidden h-10 items-center justify-center gap-1.5 rounded-full border border-[rgb(var(--stroke-rgb)/var(--stroke-alpha))] bg-[rgb(var(--button-secondary-rgb)/var(--button-secondary-alpha))] px-4 text-xs font-semibold text-[var(--fg)] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_10px_26px_rgba(0,0,0,0.16)] transition hover:-translate-y-0.5 hover:bg-[rgb(var(--button-secondary-rgb)/var(--button-secondary-hover-alpha))] md:flex"
                    >
                      <span>{t(cta.key)}</span>
                    </Link>
                  ),
                )}
                <Link
                  href={dashboardCtas.find((c) => c.primary)?.href ?? dashboardPaths.adminHome}
                  className="flex h-10 min-w-[8rem] items-center justify-center rounded-full border border-[rgb(var(--stroke-rgb)/var(--stroke-alpha))] bg-[linear-gradient(180deg,rgb(var(--button-top-rgb)),rgb(var(--button-bottom-rgb)))] px-3 text-xs font-bold text-[rgb(var(--button-fg-rgb))] shadow-[inset_0_1px_0_rgba(255,255,255,0.22),0_14px_40px_rgb(var(--button-shadow-rgb)/0.22)] transition hover:-translate-y-0.5 hover:[filter:brightness(var(--button-hover-brightness))] md:hidden"
                >
                  {t(
                    (dashboardCtas.find((c) => c.primary) ?? dashboardCtas[0]).key,
                  )}
                </Link>
              </>
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-4 z-40 px-3 md:hidden">
        <div className="mx-auto max-w-sm rounded-3xl border border-[rgb(var(--stroke-rgb)/var(--stroke-alpha))] bg-[var(--nav-bg)] px-2 py-2 backdrop-blur-[10px] shadow-[var(--card-shadow)]">
          {onDashboard ? (
            <div className="flex flex-col gap-2">
              <Link
                href="/"
                locale={locale}
                className="flex h-11 w-full items-center justify-center gap-2 rounded-2xl border border-[rgb(var(--stroke-rgb)/var(--stroke-alpha))] bg-[rgb(var(--surface-rgb)/var(--surface-alpha))] text-[11px] font-bold uppercase tracking-[0.2em] text-[rgb(var(--dashboard-accent-rgb))]"
              >
                <Compass className="h-4 w-4" aria-hidden />
                {t("dashboardReturnSuite")}
              </Link>
              <div className="grid grid-cols-2 gap-1">
                {dashboardCenter.map(({ key, href, icon: Icon }) => (
                  <Link
                    key={key}
                    href={href}
                    className="flex flex-col items-center gap-1 rounded-2xl px-2 py-2.5 text-[10px] font-medium text-[rgb(var(--muted-rgb))] transition hover:bg-[rgb(var(--surface-rgb)/var(--surface-alpha))] hover:text-[var(--fg)]"
                  >
                    <Icon className="h-4 w-4 text-[rgb(var(--dashboard-accent-rgb))]" aria-hidden />
                    <span className="text-center leading-tight">{t(key)}</span>
                  </Link>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-1 border-t border-[rgb(var(--stroke-rgb)/0.12)] pt-2">
                {dashboardCtas.map((cta) => (
                  <Link
                    key={cta.key}
                    href={cta.href}
                    className={
                      cta.primary
                        ? "flex h-10 items-center justify-center rounded-2xl bg-[linear-gradient(180deg,rgb(var(--button-top-rgb)),rgb(var(--button-bottom-rgb)))] text-[10px] font-bold text-[rgb(var(--button-fg-rgb))]"
                        : "flex h-10 items-center justify-center rounded-2xl border border-[rgb(var(--stroke-rgb)/var(--stroke-alpha))] bg-[rgb(var(--button-secondary-rgb)/var(--button-secondary-alpha))] text-[10px] font-semibold text-[var(--fg)]"
                    }
                  >
                    {t(cta.key)}
                  </Link>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-1 border-t border-[rgb(var(--stroke-rgb)/0.12)] pt-2">
                {personaSwitch.map(({ key, href, icon: Icon }) => (
                  <Link
                    key={key}
                    href={href}
                    className="flex flex-col items-center gap-1 rounded-2xl px-1 py-2 text-[9px] font-semibold uppercase tracking-wider text-[rgb(var(--muted-rgb))] opacity-90"
                  >
                    <Icon className="h-3.5 w-3.5 text-[rgb(var(--secondary-rgb))]" aria-hidden />
                    <span className="leading-tight">{t(key)}</span>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-1">
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
          )}
        </div>
      </div>
    </>
  );
}
