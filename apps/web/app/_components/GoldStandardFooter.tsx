import { getTranslations } from "next-intl/server";
import { Link } from "../../i18n/navigation";

export async function GoldStandardFooter() {
  const t = await getTranslations("footer");

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
              <div>{t("suiteItem1")}</div>
              <div>{t("suiteItem2")}</div>
              <div>{t("suiteItem3")}</div>
              <div>{t("suiteItem4")}</div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-[rgb(var(--secondary-rgb))]">
              {t("companyTitle")}
            </h3>
            <div className="mt-5 space-y-3 text-sm text-[rgb(var(--muted-rgb))]">
              <div>{t("companyItem1")}</div>
              <div>{t("companyItem2")}</div>
              <div>{t("companyItem3")}</div>
              <div>{t("companyItem4")}</div>
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
                  className="border-b border-[rgb(var(--stroke-rgb)/0.25)] pb-0.5 transition hover:text-[var(--fg)]"
                >
                  {t("legalItem1")}
                </Link>
              </div>
              <div>{t("legalItem2")}</div>
              <div>{t("legalItem3")}</div>
              <div>{t("legalItem4")}</div>
              <div>{t("legalItem5")}</div>
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
