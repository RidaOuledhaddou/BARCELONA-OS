import { getTranslations } from "next-intl/server";

export async function GoldStandardFooter() {
  const t = await getTranslations("footer");

  return (
    <footer className="mt-16 rounded-[32px] border border-[rgb(var(--accent-rgb)/0.16)] bg-[rgb(var(--surface-rgb)/0.72)] p-6 backdrop-blur-xl md:p-8">
      <div className="grid gap-8 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div className="max-w-md">
          <div className="text-sm font-semibold uppercase tracking-[0.24em] text-[rgb(var(--accent-rgb))]">
            Barcelona City OS
          </div>
          <p className="mt-4 text-sm leading-7 text-[rgb(var(--fg-rgb)/0.72)]">
            {t("about")}
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-[rgb(var(--accent-rgb))]">
            {t("platform")}
          </h3>
          <div className="mt-4 space-y-3 text-sm text-[rgb(var(--fg-rgb)/0.72)]">
            <div>Dispatch</div>
            <div>Hotels</div>
            <div>Maps</div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-[rgb(var(--accent-rgb))]">
            {t("company")}
          </h3>
          <div className="mt-4 space-y-3 text-sm text-[rgb(var(--fg-rgb)/0.72)]">
            <div>Barcelona</div>
            <div>Operators</div>
            <div>Partners</div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-[rgb(var(--accent-rgb))]">
            {t("systemStatus")}
          </h3>
          <div className="mt-4 rounded-[24px] border border-[rgb(var(--accent-rgb)/0.16)] bg-[rgb(var(--surface-strong-rgb)/0.72)] p-4">
            <div className="flex items-center gap-3">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
              <span className="text-sm font-medium text-[var(--fg)]">
                {t("status")}
              </span>
            </div>
          </div>
          <div className="mt-4 text-sm text-[rgb(var(--fg-rgb)/0.72)]">
            {t("legal")}
          </div>
        </div>
      </div>
    </footer>
  );
}
