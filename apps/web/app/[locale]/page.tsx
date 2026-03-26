import { Suspense } from "react";
import type { DispatchJob } from "@os/types";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "../../i18n/navigation";
import { BentoCard } from "../_components/BentoCard";
import { CitizenExperienceMock } from "../_components/CitizenExperienceMock";
import { FooterFloatingControls } from "../_components/FooterFloatingControls";
import { GoldStandardFooter } from "../_components/GoldStandardFooter";
import { HeroScene } from "../_components/HeroScene";
import { HeroSceneSkeleton } from "../_components/HeroSceneSkeleton";
import { LazySpatialSearch } from "../_components/LazySpatialSearch";
import { LiveStatsTicker } from "../_components/LiveStatsTicker";

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
  const locale = await getLocale();

  return (
    <>
      <main className="mx-auto w-full max-w-7xl">
        <section
          id="map-explorer"
          className="grid items-start gap-8 pt-14 md:grid-cols-[1fr_0.78fr] md:pt-16"
        >
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[rgb(var(--accent-rgb)/0.18)] bg-[rgb(var(--surface-rgb)/0.62)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[rgb(var(--accent-rgb))]">
              <span className="h-2 w-2 rounded-full bg-[rgb(var(--accent-rgb))]" />
              {tHero("eyebrow")}
            </div>

            <h1 className="mt-6 text-5xl font-semibold leading-[0.95] text-[var(--fg)] md:text-7xl">
              {tHero("title")}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-[rgb(var(--fg-rgb)/0.72)] md:text-lg">
              {tHero("description")}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/login"
                className="rounded-full bg-[rgb(var(--accent-rgb))] px-6 py-3 text-sm font-semibold text-[rgb(var(--bg-rgb))] shadow-[0_16px_36px_rgba(212,175,55,0.24)] transition hover:brightness-110"
              >
                {tHero("primaryCta")}
              </Link>
              <a
                href="#taxi-fleet"
                className="rounded-full border border-[rgb(var(--accent-rgb)/0.16)] bg-[rgb(var(--surface-rgb)/0.72)] px-6 py-3 text-sm font-semibold text-[var(--fg)] transition hover:bg-[rgb(var(--surface-strong-rgb)/0.8)]"
              >
                {tHero("secondaryCta")}
              </a>
            </div>

            <div className="mt-6 text-sm text-[rgb(var(--accent-rgb))]">
              {tHero("status")}
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {dispatchJobs.map((job) => (
                <div
                  key={job.id}
                  className="rounded-[24px] border border-[rgb(var(--accent-rgb)/0.16)] bg-[rgb(var(--surface-rgb)/0.72)] p-4 backdrop-blur-xl"
                >
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-[rgb(var(--accent-rgb))]">
                    <span>{job.priority}</span>
                    <span>{job.etaMinutes}m ETA</span>
                  </div>
                  <div className="mt-3 text-lg font-semibold text-[var(--fg)]">
                    {job.pickupZone} to {job.destinationZone}
                  </div>
                  <div className="mt-2 text-sm text-[rgb(var(--fg-rgb)/0.72)]">
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

        <LiveStatsTicker
          locale={locale}
          items={[
            { label: tStats("activeTaxis"), value: 1420 },
            { label: tStats("dispatchTime"), value: 2.4, suffix: "m", decimals: 1 },
            { label: tStats("rooms"), value: 432 },
          ]}
        />

        <section id="taxi-fleet" className="mt-16">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold uppercase tracking-[0.28em] text-[rgb(var(--accent-rgb))]">
              Platform
            </div>
            <h2 className="mt-4 text-3xl font-semibold text-[var(--fg)] md:text-4xl">
              {tFeatures("title")}
            </h2>
            <p className="mt-4 text-base leading-7 text-[rgb(var(--fg-rgb)/0.72)]">
              {tFeatures("description")}
            </p>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr_0.9fr]">
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

        <section className="mt-16">
          <LazySpatialSearch />
        </section>

        <section className="mt-16">
          <CitizenExperienceMock />
        </section>

        <GoldStandardFooter />
      </main>

      <FooterFloatingControls />
    </>
  );
}
