import { getTranslations } from "next-intl/server";

export async function GoldStandardFooter() {
  const t = await getTranslations("footer");

  return (
    <footer className="premium-card section-glow mt-20 rounded-[36px] p-8 md:p-10">
      <div className="premium-grid md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div className="max-w-md">
          <div className="text-sm font-semibold uppercase tracking-[0.26em] text-[rgb(var(--secondary-rgb))]">
            Barcelona City OS
          </div>
          <p className="mt-5 text-sm leading-7 text-[rgb(var(--muted-rgb))]">
            {t("about")}
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-[rgb(var(--secondary-rgb))]">
            {t("platform")}
          </h3>
          <div className="mt-5 space-y-3 text-sm text-[rgb(var(--muted-rgb))]">
            <div>Dispatch</div>
            <div>Hotels</div>
            <div>Maps</div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-[rgb(var(--secondary-rgb))]">
            {t("company")}
          </h3>
          <div className="mt-5 space-y-3 text-sm text-[rgb(var(--muted-rgb))]">
            <div>Barcelona</div>
            <div>Operators</div>
            <div>Partners</div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-[rgb(var(--secondary-rgb))]">
            {t("systemStatus")}
          </h3>
          <div className="mt-5 rounded-[26px] border border-[rgb(var(--stroke-rgb)/var(--stroke-alpha))] bg-[rgb(var(--surface-rgb)/var(--surface-alpha))] p-5">
            <div className="flex items-center gap-3">
              <span className="h-2.5 w-2.5 rounded-full bg-[rgb(var(--secondary-rgb))] shadow-[0_0_18px_rgb(var(--secondary-rgb)/0.35)]" />
              <span className="text-sm font-medium text-[var(--fg)]">
                {t("status")}
              </span>
            </div>
          </div>
          <div className="mt-5 text-sm text-[rgb(var(--muted-rgb))]">
            {t("legal")}
          </div>
        </div>
      </div>
    </footer>
  );
}
