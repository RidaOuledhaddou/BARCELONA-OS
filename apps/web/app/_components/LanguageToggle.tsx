"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "../../i18n/navigation";

const locales = ["en", "es"] as const;

export function LanguageToggle({ className = "" }: { className?: string }) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div
      className={[
        "flex items-center gap-1 rounded-full border border-[rgb(var(--stroke-rgb)/var(--stroke-alpha))] bg-[rgb(var(--surface-rgb)/var(--surface-alpha))] p-1 text-[11px] backdrop-blur-xl md:text-xs",
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
                ? "bg-[rgb(var(--accent-rgb))] text-[rgb(var(--button-fg-rgb))] shadow-[0_10px_30px_rgb(var(--button-shadow-rgb)/0.18)]"
                : "text-[rgb(var(--muted-rgb))] hover:bg-[rgb(var(--surface-rgb)/var(--surface-strong-alpha))] hover:text-[var(--fg)]",
            ].join(" ")}
          >
            {nextLocale}
          </button>
        );
      })}
    </div>
  );
}
