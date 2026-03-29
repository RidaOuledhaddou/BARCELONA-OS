"use client";

import { useState } from "react";
import { Link } from "../../../../i18n/navigation";

type Language = "en" | "es";

const TERMS_COPY: Record<
  Language,
  {
    pageTitle: string;
    pageSubtitle: string;
    sections: Array<{ title: string; body: string }>;
    updated: string;
    printLabel: string;
  }
> = {
  en: {
    pageTitle: "Executive Accord",
    pageSubtitle: "Terms of Service",
    sections: [
      {
        title: "The Accord",
        body: "This Accord governs your entry into the Royale One Suite. By engaging our services, you enter a covenant of mutual distinction.",
      },
      {
        title: "Membership & Conduct",
        body: "Membership is a privilege, not a right. We maintain the harmony of our fleet by requiring impeccable conduct from all Members.",
      },
      {
        title: "Mobility & Arrival",
        body: "We strive for timely, well-coordinated arrivals. External urban factors (traffic, events, weather) may still affect timing. Royale One acts as your coordinator, but cannot be held liable for conditions outside our reasonable control.",
      },
      {
        title: "Financial Transactions",
        body: "All bespoke bookings are final. Cancellation within the 2-hour window of a 'VIP' arrival incurs the full service fee to protect the integrity of the fleet.",
      },
      {
        title: "Fleet Partners & Compensation",
        body: "Any description on our websites of commissions, earnings, fees, or economic arrangements is illustrative of our partner program goals only. No marketing copy, summary, or oral statement guarantees a particular level of income or employment status. Only a signed Fleet Partner Agreement (or equivalent written contract) together with applicable law governs compensation, classification, tax, and obligations. Prospective partners should rely on the written agreement and formal disclosures provided during onboarding—not on this site alone.",
      },
      {
        title: "Sovereign Jurisdiction",
        body: "This Accord is governed by the laws of the Kingdom of Spain, with exclusive jurisdiction held by the courts of Barcelona.",
      },
    ],
    updated: "Last Updated: March 2026. Barcelona, Spain.",
    printLabel: "Print for Your Records",
  },
  es: {
    pageTitle: "Acuerdo Ejecutivo",
    pageSubtitle: "Términos del Servicio",
    sections: [
      {
        title: "El Acuerdo",
        body: "Este Acuerdo rige su entrada en la Suite Royale One. Al contratar nuestros servicios, usted suscribe un pacto de mutua distinción.",
      },
      {
        title: "Membresía y Conducta",
        body: "La membresía es un privilegio, no un derecho. Mantenemos la armonía de nuestra flota exigiendo una conducta impecable a todos nuestros Miembros.",
      },
      {
        title: "Movilidad y Llegada",
        body: "Buscamos llegadas puntuales y bien coordinadas. Factores urbanos externos (tráfico, eventos, meteorología) pueden afectar los tiempos. Royale One actúa como coordinador, sin responsabilidad por circunstancias fuera de un control razonable.",
      },
      {
        title: "Transacciones Financieras",
        body: "Todas las reservas a medida son definitivas. Las cancelaciones dentro del margen de 2 horas conllevan el cargo íntegro del servicio.",
      },
      {
        title: "Socios de flota y compensación",
        body: "Cualquier descripción en nuestros sitios sobre comisiones, ingresos, honorarios o condiciones económicas es meramente ilustrativa de los objetivos del programa de socios. Ningún texto de marketing, resumen o declaración verbal garantiza un nivel concreto de ingresos ni una clasificación laboral concreta. Solo un Acuerdo de socio de flota firmado (o contrato escrito equivalente), junto con la ley aplicable, rige la compensación, la clasificación, los impuestos y las obligaciones. Los socios potenciales deben basarse en el acuerdo escrito y las divulgaciones formales del proceso de incorporación—no únicamente en este sitio.",
      },
      {
        title: "Jurisdicción Soberana",
        body: "Este Acuerdo se rige por las leyes del Reino de España, con jurisdicción exclusiva en los tribunales de Barcelona.",
      },
    ],
    updated: "Última actualización: marzo de 2026. Barcelona, España.",
    printLabel: "Imprimir para sus registros",
  },
};

export default function TermsOfServicePage() {
  const [language, setLanguage] = useState<Language>("en");
  const copy = TERMS_COPY[language];

  return (
    <main className="terms-shell relative left-1/2 min-h-[calc(100vh-5rem)] w-screen -translate-x-1/2 bg-[var(--terms-bg)] px-0 pb-20 sm:px-8">
      <div className="mx-auto w-full max-w-none sm:max-w-[800px]">
        <div className="sticky top-2 z-20 flex items-center justify-between rounded-full border border-[rgb(var(--terms-border-rgb)/var(--terms-mobile-border-alpha))] bg-[rgb(var(--terms-header-bg-rgb)/0.8)] px-3 py-2 backdrop-blur-md sm:border-[rgb(var(--terms-border-rgb)/var(--terms-border-alpha))]">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 border-b border-[rgb(var(--terms-border-rgb)/0.5)] pb-0.5 text-[0.8rem] font-light uppercase tracking-[0.2em] text-[var(--terms-return)] transition hover:text-[var(--terms-title)] [font-family:'Montserrat',var(--font-geist),sans-serif]"
          >
            <span className="transition-transform duration-200 group-hover:-translate-x-1">←</span>
            Return to Suite
          </Link>

          <div className="inline-flex rounded-full border border-[rgb(var(--terms-border-rgb)/var(--terms-border-alpha))] bg-[rgb(var(--surface-rgb)/0.08)] p-1">
            <button
              type="button"
              onClick={() => setLanguage("en")}
              className={[
                "rounded-full px-3 py-1 text-[0.72rem] font-light uppercase tracking-[0.2em] transition",
                language === "en"
                  ? "bg-[rgb(var(--terms-border-rgb)/0.16)] text-[var(--terms-title)]"
                  : "text-[var(--terms-body)] hover:text-[var(--terms-title)]",
              ].join(" ")}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLanguage("es")}
              className={[
                "rounded-full px-3 py-1 text-[0.72rem] font-light uppercase tracking-[0.2em] transition",
                language === "es"
                  ? "bg-[rgb(var(--terms-border-rgb)/0.16)] text-[var(--terms-title)]"
                  : "text-[var(--terms-body)] hover:text-[var(--terms-title)]",
              ].join(" ")}
            >
              ES
            </button>
          </div>
        </div>

        <article
          key={language}
          className="terms-fade relative mt-6 w-full rounded-[28px] border border-[rgb(var(--terms-border-rgb)/var(--terms-mobile-border-alpha))] bg-[var(--terms-bg)] p-6 sm:mt-8 sm:border-[rgb(var(--terms-border-rgb)/var(--terms-border-alpha))] sm:bg-[rgb(var(--surface-rgb)/0.04)] sm:p-7 md:p-10"
        >
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
          <h1
            className="text-[2.4rem] font-normal leading-[1.06] tracking-[-0.02em] text-[var(--terms-title)] [font-family:'Charnoir',var(--font-geist),serif] sm:text-[3.5rem]"
            style={{ textShadow: "var(--terms-title-shadow)" }}
          >
            {copy.pageTitle}
          </h1>
          <p className="mt-3 text-[0.7rem] font-light uppercase tracking-[0.4em] text-[#a5a283] [font-family:'Montserrat',var(--font-geist),sans-serif]">
            {copy.pageSubtitle}
          </p>

          <div className="mt-8">
            {copy.sections.map((section) => (
              <section
                key={section.title}
                className="pb-16 pt-6"
                style={{
                  borderBottomWidth: "1px",
                  borderBottomStyle: "solid",
                  borderBottomColor:
                    "var(--terms-section-border, rgba(165, 162, 131, 0.1))",
                }}
              >
                <h2 className="text-[1.8rem] font-normal tracking-[-0.01em] text-[#58562d] [font-family:'Charnoir',var(--font-geist),serif]">
                  {section.title}
                </h2>
                <p className="mt-4 text-[1.05rem] font-light leading-[1.75] text-[var(--terms-body)] [font-family:'Montserrat',var(--font-geist),sans-serif] sm:text-[1.1rem] sm:leading-[1.8]">
                  {section.body}
                </p>
              </section>
            ))}
          </div>

          <div className="mt-10 flex flex-col gap-4 border-t border-[rgb(var(--terms-border-rgb)/var(--terms-border-alpha))] pt-5">
            <button
              type="button"
              onClick={() => window.print()}
              className="w-full border-b border-transparent pb-1 text-center text-[0.78rem] font-light uppercase tracking-[0.22em] text-[#a5a283] transition hover:border-current hover:text-[#58562d] [font-family:'Montserrat',var(--font-geist),sans-serif] sm:w-fit sm:text-left"
            >
              {copy.printLabel}
            </button>
            <footer className="text-sm font-light text-[var(--terms-body)] [font-family:'Montserrat',var(--font-geist),sans-serif]">
              {copy.updated}
            </footer>
          </div>
        </article>
      </div>
    </main>
  );
}

