"use client";

import { useState } from "react";
import { Link } from "../../../i18n/navigation";

type Language = "en" | "es";

const COOKIE_COPY: Record<
  Language,
  {
    pageTitle: string;
    pageSubtitle: string;
    preludeTitle: string;
    preludeBody: string;
    essentialTitle: string;
    essentialBody: string;
    analyticsTitle: string;
    analyticsBody: string;
    adaptationTitle: string;
    adaptationBody: string;
    saveLabel: string;
    acceptAllLabel: string;
    privacyLink: string;
  }
> = {
  en: {
    pageTitle: "Orchestration Center",
    pageSubtitle: "Cookie Preferences",
    preludeTitle: "The Prelude",
    preludeBody:
      "Personalize your digital footprint. We use cookies to orchestrate your experience, ensuring every interaction with the Suite is as unique as your journey.",
    essentialTitle: "Essential Harmony",
    essentialBody:
      "Strictly Necessary. These are the foundations of the Suite, enabling secure access and real-time synchrony. (Locked: Always Active)",
    analyticsTitle: "Analytic Insight",
    analyticsBody:
      "Performance. We observe city patterns to refine our dispatch precision. These cookies allow us to evolve with the city's pulse.",
    adaptationTitle: "Bespoke Adaptation",
    adaptationBody:
      "Personalization. Remember your preferred districts and habitation styles for an effortless return to the Suite.",
    saveLabel: "Save My Selection",
    acceptAllLabel: "Accept All",
    privacyLink: "Read The Digital Sanctuary",
  },
  es: {
    pageTitle: "Centro de Orquestación",
    pageSubtitle: "Preferencias de Cookies",
    preludeTitle: "El Preludio",
    preludeBody:
      "Personalice su huella digital. Utilizamos cookies para orquestar su experiencia, asegurando que cada interacción con la Suite sea tan única como su trayecto.",
    essentialTitle: "Armonía Esencial",
    essentialBody:
      "Estrictamente Necesarias. Son los cimientos de la Suite, permitiendo el acceso seguro y la sincronía en tiempo real. (Bloqueado: Siempre Activo)",
    analyticsTitle: "Percepción Analítica",
    analyticsBody:
      "Rendimiento. Observamos los patrones de la ciudad para refinar nuestra precisión de despacho. Estas cookies nos permiten evolucionar con el pulso urbano.",
    adaptationTitle: "Adaptación a Medida",
    adaptationBody:
      "Personalización. Recuerde sus distritos preferidos y estilos de estancia para un regreso sin esfuerzo a la Suite.",
    saveLabel: "Guardar Mi Selección",
    acceptAllLabel: "Aceptar Todo",
    privacyLink: "Leer El Santuario Digital",
  },
};

function PreferenceToggle({
  checked,
  onChange,
  disabled = false,
}: {
  checked: boolean;
  onChange: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onChange}
      disabled={disabled}
      aria-pressed={checked}
      className={[
        "relative h-8 w-14 shrink-0 rounded-full border transition",
        "border-[rgb(var(--privacy-border-rgb)/0.35)]",
        checked ? "bg-[rgb(var(--privacy-border-rgb)/0.18)]" : "bg-[rgb(var(--surface-rgb)/0.06)]",
        disabled ? "cursor-not-allowed opacity-80" : "cursor-pointer",
      ].join(" ")}
    >
      <span
        className={[
          "absolute top-1 h-6 w-6 rounded-full transition-all",
          "bg-[#58562d]",
          checked ? "left-7" : "left-1",
        ].join(" ")}
      />
    </button>
  );
}

export default function CookiePreferencesPage() {
  const [language, setLanguage] = useState<Language>("en");
  const [analytics, setAnalytics] = useState(false);
  const [adaptation, setAdaptation] = useState(false);
  const copy = COOKIE_COPY[language];

  const acceptAll = () => {
    setAnalytics(true);
    setAdaptation(true);
  };

  return (
    <main className="terms-shell relative left-1/2 min-h-[calc(100vh-5rem)] w-screen -translate-x-1/2 bg-[var(--privacy-bg)] px-0 pb-20 sm:px-8">
      <div className="mx-auto w-full max-w-none sm:max-w-[800px]">
        <div className="sticky top-2 z-20 flex items-center justify-between rounded-full border border-[rgb(var(--privacy-border-rgb)/var(--privacy-border-alpha))] bg-[rgb(var(--privacy-header-bg-rgb)/0.8)] px-3 py-2 backdrop-blur-md">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 border-b border-[rgb(var(--privacy-border-rgb)/0.5)] pb-0.5 text-[0.8rem] font-light uppercase tracking-[0.2em] text-[var(--privacy-return)] transition hover:text-[var(--privacy-title)] [font-family:'Montserrat',var(--font-geist),sans-serif]"
          >
            <span className="transition-transform duration-200 group-hover:-translate-x-1">←</span>
            Return to Suite
          </Link>

          <div className="inline-flex rounded-full border border-[rgb(var(--privacy-border-rgb)/var(--privacy-border-alpha))] bg-[rgb(var(--surface-rgb)/0.08)] p-1">
            <button
              type="button"
              onClick={() => setLanguage("en")}
              className={[
                "rounded-full px-3 py-1 text-[0.72rem] font-light uppercase tracking-[0.2em]",
                language === "en"
                  ? "bg-[rgb(var(--privacy-border-rgb)/0.16)] text-[var(--privacy-title)]"
                  : "text-[var(--privacy-body)] hover:text-[var(--privacy-title)]",
              ].join(" ")}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLanguage("es")}
              className={[
                "rounded-full px-3 py-1 text-[0.72rem] font-light uppercase tracking-[0.2em]",
                language === "es"
                  ? "bg-[rgb(var(--privacy-border-rgb)/0.16)] text-[var(--privacy-title)]"
                  : "text-[var(--privacy-body)] hover:text-[var(--privacy-title)]",
              ].join(" ")}
            >
              ES
            </button>
          </div>
        </div>

        <article className="terms-fade relative mt-6 w-full rounded-[28px] border border-[rgb(var(--privacy-border-rgb)/0.1)] bg-[var(--privacy-bg)] p-6 sm:mt-8 sm:bg-[rgb(var(--surface-rgb)/0.04)] sm:p-7 md:p-10">
          <div className="pointer-events-none absolute right-4 top-4 h-28 w-28 opacity-25 sm:h-36 sm:w-36">
            <svg viewBox="0 0 220 220" className="h-full w-full" fill="none" aria-hidden>
              <circle cx="110" cy="110" r="96" stroke="rgb(88 86 45 / 0.45)" strokeWidth="1" />
              <circle cx="110" cy="110" r="72" stroke="rgb(88 86 45 / 0.35)" strokeWidth="0.8" />
              <path d="M110 16V204M16 110H204" stroke="rgb(88 86 45 / 0.35)" strokeWidth="0.8" />
              <path d="M51 51L169 169M169 51L51 169" stroke="rgb(88 86 45 / 0.25)" strokeWidth="0.6" />
              <text x="110" y="30" textAnchor="middle" fontSize="11" fill="rgb(88 86 45 / 0.45)" style={{ letterSpacing: "0.28em" }}>N</text>
              <text x="110" y="202" textAnchor="middle" fontSize="11" fill="rgb(88 86 45 / 0.45)" style={{ letterSpacing: "0.28em" }}>S</text>
              <text x="24" y="114" textAnchor="middle" fontSize="11" fill="rgb(88 86 45 / 0.45)" style={{ letterSpacing: "0.28em" }}>W</text>
              <text x="196" y="114" textAnchor="middle" fontSize="11" fill="rgb(88 86 45 / 0.45)" style={{ letterSpacing: "0.28em" }}>E</text>
            </svg>
          </div>
          <h1 className="text-[3rem] font-normal leading-[1.06] tracking-[-0.02em] text-[var(--privacy-title)] [font-family:'Charnoir',var(--font-geist),serif]">
            {copy.pageTitle}
          </h1>
          <p className="mt-3 text-[0.7rem] font-light uppercase tracking-[0.4em] text-[#a5a283] [font-family:'Montserrat',var(--font-geist),sans-serif]">
            {copy.pageSubtitle}
          </p>

          <section
            className="mt-8 rounded-[20px] border border-[rgb(var(--privacy-border-rgb)/0.1)] p-5 md:p-6"
            style={{ borderColor: "rgb(var(--privacy-border-rgb)/0.1)" }}
          >
            <h2 className="text-[1.6rem] font-normal text-[var(--privacy-subheading)] [font-family:'Charnoir',var(--font-geist),serif]">
              {copy.preludeTitle}
            </h2>
            <p className="mt-4 text-[1.05rem] font-light leading-[1.9] text-[var(--privacy-body)] [font-family:'Montserrat',var(--font-geist),sans-serif]">
              {copy.preludeBody}
            </p>
          </section>

          <section
            className="mt-5 rounded-[20px] border border-[rgb(var(--privacy-border-rgb)/0.1)] p-5 md:p-6"
            style={{ borderColor: "rgb(var(--privacy-border-rgb)/0.1)" }}
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <h2 className="text-[1.6rem] font-normal text-[var(--privacy-subheading)] [font-family:'Charnoir',var(--font-geist),serif]">
                  {copy.essentialTitle}
                </h2>
                <p className="mt-4 text-[1.05rem] font-light leading-[1.9] text-[var(--privacy-body)] [font-family:'Montserrat',var(--font-geist),sans-serif]">
                  {copy.essentialBody}
                </p>
              </div>
              <div className="flex justify-end sm:justify-start">
                <PreferenceToggle checked onChange={() => {}} disabled />
              </div>
            </div>
          </section>

          <section
            className="mt-5 rounded-[20px] border border-[rgb(var(--privacy-border-rgb)/0.1)] p-5 md:p-6"
            style={{ borderColor: "rgb(var(--privacy-border-rgb)/0.1)" }}
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <h2 className="text-[1.6rem] font-normal text-[var(--privacy-subheading)] [font-family:'Charnoir',var(--font-geist),serif]">
                  {copy.analyticsTitle}
                </h2>
                <p className="mt-4 text-[1.05rem] font-light leading-[1.9] text-[var(--privacy-body)] [font-family:'Montserrat',var(--font-geist),sans-serif]">
                  {copy.analyticsBody}
                </p>
              </div>
              <div className="flex justify-end sm:justify-start">
                <PreferenceToggle checked={analytics} onChange={() => setAnalytics((v) => !v)} />
              </div>
            </div>
          </section>

          <section
            className="mt-5 rounded-[20px] border border-[rgb(var(--privacy-border-rgb)/0.1)] p-5 md:p-6"
            style={{ borderColor: "rgb(var(--privacy-border-rgb)/0.1)" }}
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <h2 className="text-[1.6rem] font-normal text-[var(--privacy-subheading)] [font-family:'Charnoir',var(--font-geist),serif]">
                  {copy.adaptationTitle}
                </h2>
                <p className="mt-4 text-[1.05rem] font-light leading-[1.9] text-[var(--privacy-body)] [font-family:'Montserrat',var(--font-geist),sans-serif]">
                  {copy.adaptationBody}
                </p>
              </div>
              <div className="flex justify-end sm:justify-start">
                <PreferenceToggle checked={adaptation} onChange={() => setAdaptation((v) => !v)} />
              </div>
            </div>
          </section>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              className="inline-flex h-12 items-center justify-center rounded-full border border-[rgb(var(--privacy-border-rgb)/0.35)] px-5 text-center text-[0.78rem] font-light uppercase tracking-[0.4em] text-[var(--privacy-subheading)] transition hover:bg-[rgb(var(--privacy-border-rgb)/0.08)] hover:text-[var(--privacy-title)] [font-family:'Montserrat',var(--font-geist),sans-serif]"
            >
              {copy.saveLabel}
            </button>
            <button
              type="button"
              onClick={acceptAll}
              className="inline-flex h-12 items-center justify-center rounded-full border border-[rgb(var(--privacy-border-rgb)/0.35)] px-5 text-center text-[0.78rem] font-light uppercase tracking-[0.4em] text-[var(--privacy-subheading)] transition hover:bg-[rgb(var(--privacy-border-rgb)/0.08)] hover:text-[var(--privacy-title)] [font-family:'Montserrat',var(--font-geist),sans-serif]"
            >
              {copy.acceptAllLabel}
            </button>
          </div>

          <div className="mt-8 border-t border-[rgb(var(--privacy-border-rgb)/var(--privacy-border-alpha))] pt-5">
            <Link
              href="/privacy-policy"
              className="inline-flex border-b border-[rgb(var(--privacy-border-rgb)/0.35)] pb-0.5 text-sm font-light tracking-[0.08em] text-[var(--privacy-return)] transition hover:text-[var(--privacy-title)] [font-family:'Montserrat',var(--font-geist),sans-serif]"
            >
              {copy.privacyLink}
            </Link>
          </div>
        </article>
      </div>
    </main>
  );
}

