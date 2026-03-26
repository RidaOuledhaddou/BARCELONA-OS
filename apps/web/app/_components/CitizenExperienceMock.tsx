import { getTranslations } from "next-intl/server";

export async function CitizenExperienceMock() {
  const t = await getTranslations("mobileMock");

  return (
    <section
      id="analytics"
      className="grid gap-8 rounded-[32px] border border-[rgb(var(--accent-rgb)/0.16)] bg-[rgb(var(--surface-rgb)/0.72)] p-6 backdrop-blur-xl md:grid-cols-[1.1fr_0.9fr]"
    >
      <div className="max-w-xl">
        <div className="text-xs font-semibold uppercase tracking-[0.28em] text-[rgb(var(--accent-rgb))]">
          Mobile
        </div>
        <h2 className="mt-4 text-3xl font-semibold text-[var(--fg)] md:text-4xl">
          {t("title")}
        </h2>
        <p className="mt-4 text-base leading-7 text-[rgb(var(--fg-rgb)/0.72)]">
          {t("body")}
        </p>
      </div>

      <div className="mx-auto w-full max-w-[320px] rounded-[38px] border border-[rgb(var(--accent-rgb)/0.22)] bg-[linear-gradient(180deg,rgba(212,175,55,0.08),rgba(0,0,0,0)),rgb(var(--surface-strong-rgb)/0.86)] p-4 shadow-[0_28px_90px_rgba(0,0,0,0.28)]">
        <div className="mx-auto mb-4 h-7 w-28 rounded-full bg-[rgb(var(--bg-rgb))]" />
        <div className="rounded-[28px] bg-[rgb(var(--surface-rgb)/0.78)] p-4">
          <div className="rounded-[24px] border border-[rgb(var(--accent-rgb)/0.16)] bg-[rgb(var(--accent-rgb)/0.12)] p-4">
            <div className="text-xs uppercase tracking-[0.2em] text-[rgb(var(--accent-rgb))]">
              Live arrival
            </div>
            <div className="mt-3 text-lg font-semibold text-[var(--fg)]">
              {t("notification")}
            </div>
          </div>
          <div className="mt-4 rounded-[24px] bg-[rgb(var(--surface-strong-rgb)/0.76)] p-4">
            <div className="h-36 rounded-[20px] bg-[radial-gradient(circle_at_30%_30%,rgba(212,175,55,0.28),rgba(0,0,0,0)),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(0,0,0,0.1))]" />
            <div className="mt-4 flex items-center justify-between text-sm text-[rgb(var(--fg-rgb)/0.72)]">
              <span>Sagrada pickup</span>
              <span>2.4 min ETA</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
