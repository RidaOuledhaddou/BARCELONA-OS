"use client";

import { useState } from "react";
import { Link } from "../../../i18n/navigation";

type Language = "en" | "es";

const PRIVACY_COPY: Record<
  Language,
  {
    pageTitle: string;
    sections: Array<{ title: string; body: string }>;
    cta: string;
  }
> = {
  en: {
    pageTitle: "The Digital Sanctuary",
    sections: [
      {
        title: "The Vow",
        body: "Your privacy is our cornerstone. We do not track to sell; we observe to serve. This Sanctuary outlines how we safeguard your urban footprint.",
      },
      {
        title: "Data Curation",
        body: "We collect only the essentials: your location for arrival precision, your device and IP signals for session security, and your preferences for bespoke habitation. Your data is encrypted at an executive grade.",
      },
      {
        title: "Discreet Sharing",
        body: "We only share fragments of your journey with our vetted fleet and hotel partners to ensure a seamless transition. We never sell your identity to third-party brokers.",
      },
      {
        title: "Sovereign Rights",
        body: "Under the jurisdiction of Barcelona and the GDPR, you hold absolute sovereignty over your data. You may request its total erasure from the Suite at any moment.",
      },
    ],
    cta: "Exercise Your Rights",
  },
  es: {
    pageTitle: "El Santuario Digital",
    sections: [
      {
        title: "El Voto",
        body: "Su privacidad es nuestra piedra angular. No rastreamos para vender; observamos para servir. Este Santuario describe cómo salvaguardamos su huella urbana.",
      },
      {
        title: "Curaduría de Datos",
        body: "Recopilamos solo lo esencial: su ubicación para la precisión de llegada, señales de IP y dispositivo para la seguridad de sesión, y sus preferencias para una estancia a medida. Sus datos están cifrados con grado ejecutivo.",
      },
      {
        title: "Intercambio Discreto",
        body: "Solo compartimos fragmentos de su trayecto con nuestra flota y socios hoteleros verificados para asegurar una transición fluida. Nunca vendemos su identidad a terceros.",
      },
      {
        title: "Derechos Soberanos",
        body: "Bajo la jurisdicción de Barcelona y el RGPD, usted ostenta la soberanía absoluta sobre sus datos. Puede solicitar su eliminación total de la Suite en cualquier momento.",
      },
    ],
    cta: "Ejercer Sus Derechos",
  },
};

export default function PrivacyPolicyPage() {
  const [language, setLanguage] = useState<Language>("en");
  const copy = PRIVACY_COPY[language];

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

        <article className="terms-fade relative mt-6 w-full rounded-[28px] border border-[rgb(var(--privacy-border-rgb)/var(--privacy-border-alpha))] bg-[var(--privacy-bg)] p-6 sm:mt-8 sm:bg-[rgb(var(--surface-rgb)/0.04)] sm:p-7 md:p-10">
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
          <h1 className="text-[3.5rem] font-normal leading-[1.06] tracking-[-0.02em] text-[var(--privacy-title)] [font-family:'Charnoir',var(--font-geist),serif]">
            {copy.pageTitle}
          </h1>

          <div className="mt-8">
            {copy.sections.map((section) => (
              <section
                key={section.title}
                className="py-[4.5rem]"
                style={{
                  borderBottomWidth: "1px",
                  borderBottomStyle: "solid",
                  borderBottomColor: "rgb(var(--privacy-border-rgb)/0.1)",
                }}
              >
                <h2 className="text-[1.8rem] font-normal tracking-[-0.01em] text-[var(--privacy-subheading)] [font-family:'Charnoir',var(--font-geist),serif]">
                  {section.title}
                </h2>
                <p className="mt-4 text-[1.1rem] font-light leading-[1.9] text-[var(--privacy-body)] [font-family:'Montserrat',var(--font-geist),sans-serif]">
                  {section.body}
                </p>
              </section>
            ))}
          </div>

          <div className="mt-10 border-t border-[rgb(var(--privacy-border-rgb)/var(--privacy-border-alpha))] pt-5">
            <a
              href="mailto:privacy@royaleone.com"
              className="inline-flex w-full items-center justify-center rounded-full border border-[rgb(var(--privacy-border-rgb)/0.35)] px-5 py-3 text-center text-[0.78rem] font-light uppercase tracking-[0.4em] text-[var(--privacy-subheading)] transition hover:bg-[rgb(var(--privacy-border-rgb)/0.08)] hover:text-[var(--privacy-title)] [font-family:'Montserrat',var(--font-geist),sans-serif] sm:w-auto"
            >
              {copy.cta}
            </a>
          </div>
        </article>
      </div>
    </main>
  );
}

