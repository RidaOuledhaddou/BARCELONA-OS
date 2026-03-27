import { getTranslations } from "next-intl/server";
import { Link } from "../../../i18n/navigation";

export default async function LoginPage() {
  const t = await getTranslations("auth");

  return (
    <main className="relative -mt-5 min-h-[calc(100vh-5rem)] w-full max-w-full overflow-x-hidden overflow-y-auto bg-[var(--auth-bg)] pb-28 pt-0 text-[var(--auth-primary)] md:-mt-9 lg:overflow-y-hidden lg:pb-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgb(var(--auth-divider-rgb)/0.1),transparent_24%),radial-gradient(circle_at_78%_66%,rgb(var(--auth-divider-rgb)/0.05),transparent_22%)]" />
      <div className="relative mx-auto grid w-full max-w-[1100px] grid-cols-1 items-start gap-10 overflow-hidden px-6 pt-[15px] md:pt-[15px] lg:min-h-[calc(100vh-5rem)] lg:grid-cols-[minmax(0,1fr)_minmax(420px,460px)] lg:items-center lg:gap-14 lg:pt-[15px]">
        <div className="relative flex items-start justify-center py-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_34%,rgb(var(--auth-divider-rgb)/0.14),transparent_16%),radial-gradient(circle_at_58%_60%,rgb(var(--auth-divider-rgb)/0.05),transparent_18%)]" />
          <div className="relative z-10 flex w-full max-w-[30rem] flex-col items-start">
            <div className="rounded-full border border-[rgb(var(--auth-primary-rgb)/0.22)] bg-[rgb(var(--auth-google-bg-rgb)/0.06)] px-3.5 py-1.5 text-[10px] font-medium uppercase tracking-[0.3em] text-[var(--auth-primary)] backdrop-blur-xl auth-reveal-title">
              Access Layer
            </div>
            <h1 className="mt-5 whitespace-nowrap [font-family:var(--font-geist)] text-[2.9rem] font-bold leading-[1.1] tracking-[-0.02em] text-[var(--auth-primary)] auth-reveal-title md:text-[3.4rem] lg:text-[3.8rem]">
              {t("loginTitle")}
            </h1>
            <p className="mt-6 max-w-[400px] text-[14px] font-normal leading-[1.6] text-[rgb(var(--auth-primary-rgb)/0.7)] auth-reveal-title md:text-[15px]">
              {t("loginBody")}
            </p>

            <div className="relative mt-5 flex h-[122px] w-[122px] items-center justify-center self-center auth-reveal-cube md:mt-6 md:h-[148px] md:w-[148px]">
              <div className="cyber-cube relative h-[78px] w-[78px] md:h-[96px] md:w-[96px]">
                <div
                  className="cyber-cube-face"
                  style={{ transform: "rotateY(0deg) translateZ(39px)" }}
                />
                <div
                  className="cyber-cube-face"
                  style={{ transform: "rotateY(90deg) translateZ(39px)" }}
                />
                <div
                  className="cyber-cube-face"
                  style={{ transform: "rotateY(180deg) translateZ(39px)" }}
                />
                <div
                  className="cyber-cube-face"
                  style={{ transform: "rotateY(-90deg) translateZ(39px)" }}
                />
                <div
                  className="cyber-cube-face"
                  style={{ transform: "rotateX(90deg) translateZ(39px)" }}
                />
                <div
                  className="cyber-cube-face"
                  style={{ transform: "rotateX(-90deg) translateZ(39px)" }}
                />
                <div className="absolute inset-0 flex items-center justify-center text-[9px] font-semibold uppercase tracking-[0.28em] text-[var(--auth-primary)] md:text-[10px]">
                  Access
                </div>
              </div>
              <div className="absolute inset-x-5 bottom-3 h-6 rounded-full bg-[radial-gradient(circle,var(--auth-cube-ground),transparent)] blur-2xl" />
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 lg:block">
          <div className="cyber-divider h-[300px] w-px bg-[linear-gradient(to_bottom,transparent,rgb(var(--auth-divider-rgb)/var(--auth-divider-alpha)),transparent)]" />
        </div>

        <div className="relative flex items-start justify-start py-0 lg:pl-0">
          <div className="w-full max-w-[26rem]">
            <div className="flex items-center justify-between gap-3">
              <div className="text-[10px] font-semibold uppercase tracking-[0.4em] text-[var(--auth-primary)]">
                Operator Sign-In
              </div>
              <div className="inline-flex items-center rounded-full border border-[rgb(var(--auth-input-border-rgb)/0.24)] bg-[rgb(var(--auth-google-bg-rgb)/0.06)] p-1 text-[10px] font-semibold uppercase tracking-[0.2em]">
                <Link href="/login" locale="en" className="rounded-full px-2.5 py-1 text-[var(--auth-primary)] transition hover:bg-[rgb(var(--auth-google-bg-rgb)/0.12)]">
                  EN
                </Link>
                <Link href="/login" locale="es" className="rounded-full px-2.5 py-1 text-[var(--auth-primary)] transition hover:bg-[rgb(var(--auth-google-bg-rgb)/0.12)]">
                  ES
                </Link>
              </div>
            </div>

            <form className="mt-5 space-y-4.5 auth-reveal-form">
              <div className="grid gap-3 md:grid-cols-2">
                <div>
                  <label className="mb-2 block whitespace-nowrap text-[10px] font-medium uppercase tracking-[0.28em] text-[var(--auth-primary)]">
                    {t("email")}
                  </label>
                  <input
                    type="email"
                    className="h-12 w-full border-0 border-b border-[rgb(var(--auth-input-border-rgb)/var(--auth-input-border-alpha))] bg-transparent px-0 py-2.5 text-[14px] text-[var(--auth-primary)] outline-none transition placeholder:text-[var(--auth-primary)]/70 focus:border-[rgb(var(--auth-input-border-rgb)/0.92)]"
                    placeholder="operator@barcelonaos.com"
                  />
                </div>

                <div>
                  <label className="mb-2 block whitespace-nowrap text-[10px] font-medium uppercase tracking-[0.28em] text-[var(--auth-primary)]">
                    {t("password")}
                  </label>
                  <input
                    type="password"
                    className="h-12 w-full border-0 border-b border-[rgb(var(--auth-input-border-rgb)/var(--auth-input-border-alpha))] bg-transparent px-0 py-2.5 text-[14px] text-[var(--auth-primary)] outline-none transition placeholder:text-[var(--auth-primary)]/70 focus:border-[rgb(var(--auth-input-border-rgb)/0.92)]"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="flex h-12 w-full items-center justify-center rounded-xl border border-[rgb(var(--auth-input-border-rgb)/0.26)] px-4 text-[14px] font-semibold text-[var(--auth-main-btn-fg)] transition hover:-translate-y-0.5 active:scale-[0.98] hover:brightness-105"
                style={{
                  background: "var(--auth-main-btn-bg)",
                  boxShadow:
                    "inset 0 1px 0 rgba(255,255,255,0.85), var(--auth-main-btn-shadow)",
                }}
              >
                {t("submitLogin")}
              </button>

              <div className="h-px w-full bg-[linear-gradient(90deg,transparent,rgb(var(--auth-divider-rgb)/0.16),transparent)]" />

              <button
                type="button"
                className="flex h-12 w-full items-center justify-center gap-2.5 rounded-xl border border-[rgb(var(--auth-input-border-rgb)/0.2)] bg-[rgb(var(--auth-google-bg-rgb)/var(--auth-google-bg-alpha))] px-4 text-[14px] font-medium text-[var(--auth-google-text)] shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_10px_24px_rgba(0,0,0,0.22)] backdrop-blur-[12px] transition hover:-translate-y-0.5 hover:bg-[rgb(var(--auth-google-bg-rgb)/0.05)]"
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-full border border-[rgba(229,227,214,0.18)] bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.22),rgba(165,162,131,0.12))] text-[9px] font-semibold text-white shadow-[0_4px_12px_rgba(0,0,0,0.2)]">
                  G
                </span>
                <span>Continue with Google</span>
              </button>
            </form>

            <div className="mt-5 text-[13px] text-[var(--auth-secondary)]">
              {t("switchToSignup")}{" "}
              <Link href="/signup" className="text-[var(--auth-primary)] transition hover:text-white">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
