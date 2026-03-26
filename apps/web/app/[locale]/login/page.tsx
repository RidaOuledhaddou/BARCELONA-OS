import { getTranslations } from "next-intl/server";
import { Link } from "../../../i18n/navigation";
import { Button } from "../../../components/ui/button";

export default async function LoginPage() {
  const t = await getTranslations("auth");

  return (
    <main className="mx-auto flex min-h-[calc(100vh-10rem)] max-w-6xl items-center">
      <section className="grid w-full overflow-hidden rounded-[36px] border border-[rgb(var(--accent-rgb)/0.16)] bg-[rgb(var(--surface-rgb)/0.74)] backdrop-blur-xl md:grid-cols-2">
        <div className="bg-[linear-gradient(180deg,rgba(212,175,55,0.18),rgba(0,0,0,0)),rgb(var(--surface-strong-rgb)/0.9)] p-8 md:p-10">
          <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[rgb(var(--accent-rgb))]">
            Access
          </div>
          <h1 className="mt-4 text-4xl font-semibold text-[var(--fg)]">
            {t("loginTitle")}
          </h1>
          <p className="mt-4 max-w-md text-base leading-7 text-[rgb(var(--fg-rgb)/0.72)]">
            {t("loginBody")}
          </p>
        </div>

        <div className="p-8 md:p-10">
          <form className="space-y-5">
            <div>
              <label className="mb-2 block text-sm text-[rgb(var(--fg-rgb)/0.72)]">
                {t("email")}
              </label>
              <input
                type="email"
                className="w-full rounded-2xl border border-[rgb(var(--accent-rgb)/0.16)] bg-[rgb(var(--surface-strong-rgb)/0.7)] px-4 py-3 outline-none"
                placeholder="operator@barcelonaos.com"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm text-[rgb(var(--fg-rgb)/0.72)]">
                {t("password")}
              </label>
              <input
                type="password"
                className="w-full rounded-2xl border border-[rgb(var(--accent-rgb)/0.16)] bg-[rgb(var(--surface-strong-rgb)/0.7)] px-4 py-3 outline-none"
                placeholder="••••••••"
              />
            </div>

            <Button type="submit" className="w-full justify-center">
              {t("submitLogin")}
            </Button>
          </form>

          <div className="mt-5 text-sm text-[rgb(var(--fg-rgb)/0.72)]">
            {t("switchToSignup")}{" "}
            <Link href="/signup" className="text-[rgb(var(--accent-rgb))]">
              Sign Up
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
