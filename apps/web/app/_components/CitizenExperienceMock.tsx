import { getTranslations } from "next-intl/server";

export async function CitizenExperienceMock() {
  const t = await getTranslations("mobileMock");

  return (
    <section
      id="analytics"
      className="premium-card section-glow grid gap-10 rounded-[36px] p-8 md:grid-cols-[1.1fr_0.9fr] lg:p-10"
    >
      <div className="max-w-xl">
        <div className="text-xs font-semibold uppercase tracking-[0.3em] text-[rgb(var(--secondary-rgb))]">
          Mobile
        </div>
        <h2 className="mt-5 text-3xl font-semibold tracking-[-0.04em] text-[var(--fg)] md:text-5xl">
          {t("title")}
        </h2>
        <p className="mt-5 text-base leading-8 text-[rgb(var(--muted-rgb))]">
          {t("body")}
        </p>
      </div>

      <div className="mx-auto w-full max-w-[340px] rounded-[40px] border border-[rgb(var(--stroke-rgb)/var(--stroke-alpha))] bg-[rgb(var(--surface-rgb)/var(--surface-strong-alpha))] p-5 shadow-[var(--card-shadow)]">
        <div className="mx-auto mb-5 h-7 w-28 rounded-full bg-[rgb(var(--surface-rgb)/var(--surface-heavy-alpha))]" />
        <div className="rounded-[30px] bg-[rgb(var(--surface-rgb)/var(--surface-alpha))] p-5 backdrop-blur-xl">
          <div className="rounded-[26px] border border-[rgb(var(--stroke-rgb)/var(--stroke-alpha))] bg-[linear-gradient(180deg,rgb(var(--secondary-rgb)/0.18),rgb(var(--secondary-rgb)/0.08))] p-5">
            <div className="text-xs uppercase tracking-[0.2em] text-[rgb(var(--secondary-rgb))]">
              {t("arrivalEyebrow")}
            </div>
            <div className="mt-3 text-lg font-semibold tracking-[-0.03em] text-[var(--fg)]">
              {t("notification")}
            </div>
          </div>
          <div className="mt-5 rounded-[26px] border border-[rgb(var(--stroke-rgb)/var(--stroke-alpha))] bg-[rgb(var(--surface-rgb)/var(--surface-alpha))] p-5">
            <div className="h-40 rounded-[22px] bg-[radial-gradient(circle_at_30%_30%,rgb(var(--secondary-rgb)/0.22),rgba(0,0,0,0)),linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))]" />
            <div className="mt-4 flex items-center justify-between text-sm text-[rgb(var(--muted-rgb))]">
              <span>{t("sampleRoute")}</span>
              <span>{t("sampleEta")}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
