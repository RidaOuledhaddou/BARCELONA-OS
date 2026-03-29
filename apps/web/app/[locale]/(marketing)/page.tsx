import { Suspense } from "react";
import type { DispatchJob } from "@os/types";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "../../../i18n/navigation";
import { BentoCard } from "../../_components/BentoCard";
import { CitizenExperienceMock } from "../../_components/CitizenExperienceMock";
import { HeroScene } from "../../_components/HeroScene";
import { HeroSceneSkeleton } from "../../_components/HeroSceneSkeleton";
import { LazySpatialSearch } from "../../_components/LazySpatialSearch";
import { LiveStatsTicker } from "../../_components/LiveStatsTicker";
import { FooterFloatingControls } from "../../_components/FooterFloatingControls";

const dispatchJobs: DispatchJob[] = [
  {
    id: "taxi-218",
    passengerName: "A. Ortega",
    pickupZone: "Eixample",
    destinationZone: "Gracia",
    priority: "vip",
    etaMinutes: 2,
    createdAt: new Date().toISOString(),
  },
  {
    id: "taxi-044",
    passengerName: "M. Serra",
    pickupZone: "Sants",
    destinationZone: "Born",
    priority: "priority",
    etaMinutes: 4,
    createdAt: new Date().toISOString(),
  },
];

export default async function LandingPage() {
  const tHero = await getTranslations("hero");
  const tFeatures = await getTranslations("features");
  const tStats = await getTranslations("stats");
  const tLanding = await getTranslations("landing");
  const locale = await getLocale();

  return (
    <>
      <main className="mx-auto w-full max-w-[92rem]">
        <section
          id="map-explorer"
          className="section-glow grid items-start gap-10 pb-16 pt-0 md:grid-cols-[1.02fr_0.98fr] md:pt-0 lg:gap-14"
        >
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[rgb(var(--stroke-rgb)/var(--stroke-alpha))] bg-[rgb(var(--surface-rgb)/var(--surface-alpha))] px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-[rgb(var(--secondary-rgb))]">
              <span className="h-2 w-2 rounded-full bg-[rgb(var(--secondary-rgb))] shadow-[0_0_16px_rgb(var(--secondary-rgb)/0.28)]" />
              {tHero("eyebrow")}
            </div>

            <h1 className="mt-7 max-w-4xl [font-family:var(--font-geist)] text-5xl font-semibold leading-[0.9] tracking-[-0.065em] text-[var(--fg)] md:text-7xl xl:text-[5.6rem]">
              {tHero("title")}
            </h1>
            <p className="mt-7 max-w-xl text-base leading-8 text-[rgb(var(--muted-rgb))] md:text-lg">
              {tHero("description")}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/login"
                className="rounded-full border border-[rgb(var(--stroke-rgb)/var(--stroke-alpha))] bg-[linear-gradient(180deg,rgb(var(--button-top-rgb)),rgb(var(--button-bottom-rgb)))] px-7 py-3.5 text-sm font-bold text-[rgb(var(--button-fg-rgb))] shadow-[inset_0_1px_0_rgba(255,255,255,0.22),0_0_0_1px_rgba(255,255,255,0.05),0_18px_50px_rgb(var(--button-shadow-rgb)/0.24)] transition hover:-translate-y-0.5 hover:[filter:brightness(var(--button-hover-brightness))]"
              >
                {tHero("primaryCta")}
              </Link>
              <a
                href="#taxi-fleet"
                className="rounded-full border border-[rgb(var(--stroke-rgb)/var(--stroke-alpha))] bg-[rgb(var(--button-secondary-rgb)/var(--button-secondary-alpha))] px-7 py-3.5 text-sm font-semibold text-[var(--fg)] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_12px_30px_rgba(0,0,0,0.18)] backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-[rgb(var(--button-secondary-rgb)/var(--button-secondary-hover-alpha))]"
              >
                {tHero("secondaryCta")}
              </a>
            </div>

            <div className="mt-7 text-sm text-[rgb(var(--secondary-rgb))]">
              {tHero("status")}
            </div>

            <div className="premium-grid mt-10 sm:grid-cols-2">
              {dispatchJobs.map((job) => (
                <div
                  key={job.id}
                  className="premium-card rounded-[28px] p-6"
                >
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.24em] text-[rgb(var(--secondary-rgb))]">
                    <span>{job.priority}</span>
                    <span>{job.etaMinutes}m ETA</span>
                  </div>
                  <div className="mt-4 text-xl font-semibold tracking-[-0.03em] text-[var(--fg)]">
                    {job.pickupZone} to {job.destinationZone}
                  </div>
                  <div className="mt-3 text-sm text-[rgb(var(--muted-rgb))]">
                    Passenger {job.passengerName}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center md:justify-end">
            <Suspense fallback={<HeroSceneSkeleton />}>
              <HeroScene />
            </Suspense>
          </div>
        </section>

        <section className="mx-auto mt-4 w-full max-w-[1050px]">
          <div className="h-px w-full bg-[rgb(165,162,131,0.2)]" />
          <div className="mt-10">
            <h2 className="text-3xl font-medium tracking-[-0.03em] text-[rgb(var(--fg-rgb))] md:text-4xl">
              {tLanding("provenanceTitle")}
            </h2>
            <p className="mt-5 max-w-[760px] text-base leading-8 text-[rgb(var(--muted-rgb))] md:text-lg">
              {tLanding("provenanceBody")}
            </p>
          </div>
        </section>

        <LiveStatsTicker
          locale={locale}
          items={[
            { label: tStats("activeTaxis"), value: 1420 },
            { label: tStats("dispatchTime"), value: 2.4, suffix: "m", decimals: 1 },
            { label: tStats("rooms"), value: 432 },
          ]}
        />

        <section id="taxi-fleet" className="section-glow mt-20">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold uppercase tracking-[0.32em] text-[rgb(var(--secondary-rgb))]">
              Platform
            </div>
            <h2 className="mt-5 text-3xl font-semibold tracking-[-0.04em] text-[var(--fg)] md:text-5xl">
              {tFeatures("title")}
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-[rgb(var(--muted-rgb))]">
              {tFeatures("description")}
            </p>
          </div>

          <div className="premium-grid mt-10 lg:grid-cols-[1.1fr_0.9fr_0.9fr]">
            <BentoCard
              icon="taxis"
              title={tFeatures("taxis.title")}
              body={tFeatures("taxis.body")}
            />
            <BentoCard
              icon="hotels"
              title={tFeatures("hotels.title")}
              body={tFeatures("hotels.body")}
            />
            <BentoCard
              icon="analytics"
              title={tFeatures("analytics.title")}
              body={tFeatures("analytics.body")}
            />
          </div>
        </section>

        <section className="mt-20">
          <LazySpatialSearch />
        </section>

        <section className="mx-auto mt-20 w-full max-w-[1050px]">
          <div className="rounded-[32px] border border-[rgb(var(--stroke-rgb)/var(--stroke-alpha))] bg-[rgb(var(--surface-rgb)/var(--surface-alpha))] p-7 md:p-10">
            <div className="text-xs font-semibold uppercase tracking-[0.32em] text-[rgb(var(--secondary-rgb))]">
              {tLanding("signatureEyebrow")}
            </div>
            <h3 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-[rgb(var(--fg-rgb))] md:text-4xl">
              {tLanding("signatureTitle")}
            </h3>

            <div className="mt-8 space-y-6">
              {[
                {
                  heading: tLanding("signatureStep1Title"),
                  body: tLanding("signatureStep1Body"),
                },
                {
                  heading: tLanding("signatureStep2Title"),
                  body: tLanding("signatureStep2Body"),
                },
                {
                  heading: tLanding("signatureStep3Title"),
                  body: tLanding("signatureStep3Body"),
                },
              ].map((step, index) => (
                <div key={step.heading} className="flex gap-4">
                  <div className="flex w-8 flex-col items-center">
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#58562d]" />
                    {index < 2 ? (
                      <span className="mt-2 h-full w-px bg-[rgb(165,162,131,0.2)]" />
                    ) : null}
                  </div>
                  <div className="pb-2">
                    <div className="text-lg font-semibold text-[rgb(var(--fg-rgb))]">
                      {step.heading}
                    </div>
                    <p className="mt-2 max-w-[760px] text-base leading-7 text-[rgb(var(--muted-rgb))]">
                      {step.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto mt-20 w-full max-w-[1050px]">
          <div className="rounded-[32px] border border-[rgb(var(--stroke-rgb)/var(--stroke-alpha))] bg-[rgb(var(--surface-rgb)/var(--surface-alpha))] p-7 md:p-10">
            <div className="text-xs font-semibold uppercase tracking-[0.32em] text-[rgb(var(--secondary-rgb))]">
              {tLanding("testimonyEyebrow")}
            </div>
            <h3 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-[rgb(var(--fg-rgb))] md:text-4xl">
              {tLanding("testimonyTitle")}
            </h3>

            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <blockquote className="rounded-[24px] border border-[rgb(var(--stroke-rgb)/var(--stroke-alpha))] bg-[rgb(var(--surface-rgb)/var(--surface-strong-alpha))] p-6">
                <p className="text-lg leading-8 text-[rgb(var(--fg-rgb))]">
                  {tLanding("testimonyQuote1")}
                </p>
                <footer className="mt-5 text-sm uppercase tracking-[0.2em] text-[rgb(var(--secondary-rgb))]">
                  {tLanding("testimonyAuthor1")}
                </footer>
              </blockquote>

              <blockquote className="rounded-[24px] border border-[rgb(var(--stroke-rgb)/var(--stroke-alpha))] bg-[rgb(var(--surface-rgb)/var(--surface-strong-alpha))] p-6">
                <p className="text-lg leading-8 text-[rgb(var(--fg-rgb))]">
                  {tLanding("testimonyQuote2")}
                </p>
                <footer className="mt-5 text-sm uppercase tracking-[0.2em] text-[rgb(var(--secondary-rgb))]">
                  {tLanding("testimonyAuthor2")}
                </footer>
              </blockquote>
            </div>
          </div>
        </section>

        <section className="mt-20">
          <CitizenExperienceMock />
        </section>

      </main>

      <FooterFloatingControls
        showScrollToTop={false}
        showLanguageToggle={true}
      />
    </>
  );
}
