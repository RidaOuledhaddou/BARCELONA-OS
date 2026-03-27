import { getTranslations } from "next-intl/server";
import { Link } from "../../../i18n/navigation";

export default async function LoginPage() {
  const t = await getTranslations("auth");

  return (
    <main className="relative min-h-[calc(100vh-5rem)] w-full max-w-full overflow-x-hidden overflow-y-hidden bg-[var(--auth-bg)] text-[var(--auth-primary)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgb(var(--auth-divider-rgb)/0.1),transparent_24%),radial-gradient(circle_at_78%_66%,rgb(var(--auth-divider-rgb)/0.05),transparent_22%)]" />
      <div className="relative mx-auto grid min-h-[calc(100vh-5rem)] w-full max-w-[1050px] items-center gap-8 overflow-hidden px-6 md:grid-cols-[minmax(0,1fr)_minmax(360px,430px)] md:gap-10 lg:gap-12">
        <div className="relative flex items-start justify-center py-8 md:py-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_34%,rgb(var(--auth-divider-rgb)/0.14),transparent_16%),radial-gradient(circle_at_58%_60%,rgb(var(--auth-divider-rgb)/0.05),transparent_18%)]" />
          <div className="relative z-10 flex w-full max-w-[30rem] flex-col items-start">
            <div className="rounded-full border border-[rgb(var(--auth-primary-rgb)/0.22)] bg-[rgb(var(--auth-google-bg-rgb)/0.06)] px-3.5 py-1.5 text-[10px] font-medium uppercase tracking-[0.3em] text-[var(--auth-primary)] backdrop-blur-xl">
              Access Layer
            </div>
            <h1 className="mt-5 whitespace-nowrap [font-family:var(--font-geist)] bg-[linear-gradient(180deg,var(--auth-primary)_0%,var(--auth-primary)_62%,var(--auth-secondary)_100%)] bg-clip-text text-[2.9rem] font-extrabold leading-[0.92] tracking-[-0.04em] text-transparent md:text-[3.4rem] lg:text-[3.8rem]">
              {t("loginTitle")}
            </h1>
            <p className="mt-4 max-w-[22rem] text-[14px] leading-7 text-[var(--auth-secondary)] md:text-[15px]">
              {t("loginBody")}
            </p>

            <div className="relative mt-5 flex h-[122px] w-[122px] items-center justify-center self-center md:mt-6 md:h-[148px] md:w-[148px]">
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

        <div className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 md:block">
          <div className="cyber-divider h-[300px] w-px bg-[linear-gradient(to_bottom,transparent,rgb(var(--auth-divider-rgb)/var(--auth-divider-alpha)),transparent)]" />
        </div>

        <div className="relative flex items-start justify-start py-10 pl-2 md:py-12 md:pl-0">
          <div className="w-full max-w-[26rem]">
            <div className="text-[10px] font-semibold uppercase tracking-[0.4em] text-[var(--auth-primary)]">
              Operator Sign-In
            </div>

            <form className="mt-5 space-y-4.5">
              <div className="grid gap-3 md:grid-cols-2">
                <div>
                  <label className="mb-2 block whitespace-nowrap text-[10px] font-medium uppercase tracking-[0.28em] text-[var(--auth-primary)]">
                    {t("email")}
                  </label>
                  <input
                    type="email"
                    className="w-full rounded-xl border border-[rgb(var(--auth-input-border-rgb)/var(--auth-input-border-alpha))] bg-[rgb(var(--auth-input-bg-rgb)/var(--auth-input-bg-alpha))] px-3.5 py-2.5 text-[14px] text-[var(--auth-primary)] outline-none shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition placeholder:text-[var(--auth-primary)]/70 focus:border-white focus:shadow-[0_0_0_2px_rgba(255,255,255,0.08)]"
                    placeholder="operator@barcelonaos.com"
                  />
                </div>

                <div>
                  <label className="mb-2 block whitespace-nowrap text-[10px] font-medium uppercase tracking-[0.28em] text-[var(--auth-primary)]">
                    {t("password")}
                  </label>
                  <input
                    type="password"
                    className="w-full rounded-xl border border-[rgb(var(--auth-input-border-rgb)/var(--auth-input-border-alpha))] bg-[rgb(var(--auth-input-bg-rgb)/var(--auth-input-bg-alpha))] px-3.5 py-2.5 text-[14px] text-[var(--auth-primary)] outline-none shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition placeholder:text-[var(--auth-primary)]/70 focus:border-white focus:shadow-[0_0_0_2px_rgba(255,255,255,0.08)]"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="flex h-10 w-full items-center justify-center rounded-xl border border-[rgb(var(--auth-input-border-rgb)/0.26)] px-4 text-[13px] font-semibold text-[var(--auth-main-btn-fg)] transition hover:-translate-y-0.5 active:scale-[0.98] hover:brightness-105"
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
                className="flex h-10 w-full items-center justify-center gap-2.5 rounded-xl border border-[rgb(var(--auth-input-border-rgb)/0.2)] bg-[rgb(var(--auth-google-bg-rgb)/var(--auth-google-bg-alpha))] px-4 text-[13px] font-medium text-[var(--auth-google-text)] shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_10px_24px_rgba(0,0,0,0.22)] backdrop-blur-[12px] transition hover:-translate-y-0.5 hover:bg-[rgb(var(--auth-google-bg-rgb)/0.05)]"
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
