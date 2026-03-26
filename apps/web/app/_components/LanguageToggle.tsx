"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "../../i18n/navigation";

const locales = ["en", "es", "ca"] as const;

export function LanguageToggle({ className = "" }: { className?: string }) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div
      className={[
        "glass-panel flex items-center gap-1 rounded-full border border-[rgb(var(--accent-rgb)/0.24)] p-1 text-[11px] md:text-xs",
        className,
      ].join(" ")}
      aria-label="Language switcher"
    >
      {locales.map((nextLocale) => {
        const active = nextLocale === locale;
        return (
          <button
            key={nextLocale}
            type="button"
            onClick={() => router.replace(pathname, { locale: nextLocale })}
            className={[
              "rounded-full px-3 py-2 font-semibold uppercase tracking-[0.2em] transition",
              active
                ? "bg-[rgb(var(--accent-rgb))] text-[rgb(var(--bg-rgb))]"
                : "text-[rgb(var(--fg-rgb)/0.74)] hover:bg-[rgb(var(--surface-strong-rgb)/0.88)] hover:text-[var(--fg)]",
            ].join(" ")}
          >
            {nextLocale}
          </button>
        );
      })}
    </div>
  );
}
