import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "../../i18n/navigation";

/** Same anchors as `components/layout/navbar.tsx` — home page sections. */
const SUITE_HOME_HASHES = ["#map-explorer", "#taxi-fleet", "#hotels", "#analytics"] as const;

export async function GoldStandardFooter() {
  const t = await getTranslations("footer");
  const locale = await getLocale();

  return (
    <footer className="mt-20 rounded-[36px] border border-[rgb(var(--stroke-rgb)/var(--stroke-alpha))] bg-[rgb(var(--bg-rgb))] p-8 md:p-10">
      <div className="mx-auto w-full max-w-[1050px]">
        <div className="premium-grid md:grid-cols-[1.6fr_repeat(3,1fr)]">
          <div className="max-w-md">
            <div className="text-sm font-semibold uppercase tracking-[0.26em] text-[rgb(var(--secondary-rgb))]">
              {t("brandTitle")}
            </div>
            <p className="mt-5 text-sm leading-7 text-[rgb(var(--muted-rgb))]">
              {t("brandBody")}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-[rgb(var(--secondary-rgb))]">
              {t("suiteTitle")}
            </h3>
            <div className="mt-5 space-y-3 text-sm text-[rgb(var(--muted-rgb))]">
              {SUITE_HOME_HASHES.map((hash, index) => {
                const key = `suiteItem${index + 1}` as "suiteItem1" | "suiteItem2" | "suiteItem3" | "suiteItem4";
                return (
                  <div key={hash}>
                    <a
                      href={`/${locale}${hash}`}
                      className="border-b border-[rgb(var(--stroke-rgb)/0.25)] pb-0.5 transition hover:text-[var(--fg)]"
                    >
                      {t(key)}
                    </a>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-[rgb(var(--secondary-rgb))]">
              {t("companyTitle")}
            </h3>
            <div className="mt-5 space-y-3 text-sm text-[rgb(var(--muted-rgb))]">
              <div>
                <Link
                  href="/our-story"
                  locale={locale}
                  className="border-b border-[rgb(var(--stroke-rgb)/0.25)] pb-0.5 transition hover:text-[var(--fg)]"
                >
                  {t("companyItem1")}
                </Link>
              </div>
              <div>
                <Link
                  href="/join-the-fleet"
                  locale={locale}
                  className="border-b border-[rgb(var(--stroke-rgb)/0.25)] pb-0.5 transition hover:text-[var(--fg)]"
                >
                  {t("companyItem2")}
                </Link>
              </div>
              <div>
                <Link
                  href="/press"
                  locale={locale}
                  className="border-b border-[rgb(var(--stroke-rgb)/0.25)] pb-0.5 transition hover:text-[var(--fg)]"
                >
                  {t("companyItem3")}
                </Link>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-[rgb(var(--secondary-rgb))]">
              {t("legalTitle")}
            </h3>
            <div className="mt-5 space-y-3 text-sm text-[rgb(var(--muted-rgb))]">
              <div>
                <Link
                  href="/terms-of-service"
                  locale={locale}
                  className="border-b border-[rgb(var(--stroke-rgb)/0.25)] pb-0.5 transition hover:text-[var(--fg)]"
                >
                  {t("legalItem1")}
                </Link>
              </div>
              <div>
                <Link
                  href="/privacy-policy"
                  locale={locale}
                  className="border-b border-[rgb(var(--stroke-rgb)/0.25)] pb-0.5 transition hover:text-[var(--fg)]"
                >
                  {t("legalItem2")}
                </Link>
              </div>
              <div>
                <Link
                  href="/cookie-preferences"
                  locale={locale}
                  className="border-b border-[rgb(var(--stroke-rgb)/0.25)] pb-0.5 transition hover:text-[var(--fg)]"
                >
                  {t("legalItem3")}
                </Link>
              </div>
              <div>
                <Link
                  href="/data-sovereignty"
                  locale={locale}
                  className="border-b border-[rgb(var(--stroke-rgb)/0.25)] pb-0.5 transition hover:text-[var(--fg)]"
                >
                  {t("legalItem4")}
                </Link>
              </div>
              <div>
                <Link
                  href="/ethics-charter"
                  locale={locale}
                  className="border-b border-[rgb(var(--stroke-rgb)/0.25)] pb-0.5 transition hover:text-[var(--fg)]"
                >
                  {t("legalItem5")}
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-[rgb(var(--stroke-rgb)/var(--stroke-alpha))] pt-5 text-sm text-[rgb(var(--muted-rgb))]">
          {t("bottomRow")}
        </div>
      </div>
    </footer>
  );
}
