"use client";

import { useState } from "react";
import { Link } from "../../../i18n/navigation";

type Language = "en" | "es";

const ETHICS_COPY: Record<
  Language,
  {
    pageTitle: string;
    sections: Array<{ title: string; body: string }>;
  }
> = {
  en: {
    pageTitle: "Ethics Charter / Carta Ética",
    sections: [
      {
        title: "Purpose",
        body: "Criterium over Scale. Royale One operates under a non-negotiable principle: trust precedes growth. Every system decision is designed to preserve individual dignity, absolute safety, and legal rigor.",
      },
      {
        title: "Data Integrity",
        body: "Inviolable Identity. We collect only the trail necessary to ensure service excellence. We do not monetize identities. We document every process of access, retention, and erasure to ensure total sovereign traceability.",
      },
      {
        title: "Human Supremacy",
        body: "Human Judgment as a Filter. Automation assists; it never replaces. Critical decisions affecting our Members or Fleet Partners are always submitted to expert review. Technology serves judgment, not the reverse.",
      },
      {
        title: "Equity of Standard",
        body: "Unified Protocol. Our service standards are unalterable. We reject any form of bias or discrimination, maintaining a treatment of maximum distinction and respect in every interaction within the Suite.",
      },
      {
        title: "Resolution & Guarantee",
        body: "Active Responsibility. Any incident triggers an immediate correction protocol. We guarantee direct communication channels for process repair, ensuring every measure is auditable and complies with current regulations.",
      },
    ],
  },
  es: {
    pageTitle: "Ethics Charter / Carta Ética",
    sections: [
      {
        title: "Propósito",
        body: "Criterio sobre Escala. Royale One opera bajo un principio innegociable: la confianza precede al crecimiento. Cada decisión del sistema está diseñada para preservar la dignidad individual, la seguridad absoluta y el rigor legal.",
      },
      {
        title: "Integridad de Datos",
        body: "Identidad Inviolable. Recopilamos únicamente el rastro necesario para garantizar la excelencia del servicio. No monetizamos identidades. Documentamos cada proceso de acceso, retención y eliminación para asegurar una trazabilidad total y soberana.",
      },
      {
        title: "Supremacía Humana",
        body: "El Juicio Humano como Filtro. La automatización asiste, nunca sustituye. Las decisiones críticas que afecten a nuestros Miembros o Socios de Flota se someten siempre a una revisión por expertos. La tecnología está al servicio del juicio, no al revés.",
      },
      {
        title: "Equidad de Estándar",
        body: "Protocolo Unificado. Nuestros estándares de servicio son inalterables. Rechazamos cualquier forma de sesgo o discriminación, manteniendo un trato de máxima distinción y respeto en cada interacción dentro de la Suite.",
      },
      {
        title: "Resolución y Garantía",
        body: "Responsabilidad Activa. Cualquier incidencia activa un protocolo de corrección inmediata. Garantizamos canales de comunicación directos para la reparación de procesos, asegurando que cada medida sea auditable y cumpla con la normativa vigente.",
      },
    ],
  },
};

export default function EthicsCharterPage() {
  const [language, setLanguage] = useState<Language>("en");
  const copy = ETHICS_COPY[language];

  return (
    <main className="terms-shell relative left-1/2 min-h-[calc(100vh-5rem)] w-screen -translate-x-1/2 bg-[var(--privacy-bg)] px-0 pb-20 sm:px-8">
      <div className="mx-auto w-full max-w-none sm:max-w-[800px]">
        <div className="sticky top-2 z-20 flex items-center justify-between rounded-full border border-[rgb(var(--privacy-border-rgb)/var(--privacy-border-alpha))] bg-[rgb(var(--privacy-header-bg-rgb)/0.8)] px-3 py-2 backdrop-blur-md">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 border-b border-[rgb(var(--privacy-border-rgb)/0.5)] pb-0.5 text-[0.7rem] font-light uppercase tracking-[0.4em] text-[var(--privacy-body)] transition hover:text-[var(--privacy-title)] [font-family:'Montserrat',var(--font-geist),sans-serif]"
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
          <h1 className="text-[3.5rem] font-normal leading-[1.06] tracking-[-0.02em] text-[var(--privacy-title)] [font-family:'Charnoir',var(--font-geist),serif]">
            {copy.pageTitle}
          </h1>

          <div className="mt-8">
            {copy.sections.map((section) => (
              <section
                key={section.title}
                className="py-10 first:pt-2"
                style={{
                  borderBottomWidth: "1px",
                  borderBottomStyle: "solid",
                  borderBottomColor: "rgb(var(--privacy-border-rgb)/0.15)",
                }}
              >
                <h2 className="text-[1.6rem] font-normal tracking-[-0.01em] text-[var(--privacy-subheading)] [font-family:'Charnoir',var(--font-geist),serif]">
                  {section.title}
                </h2>
                <p className="mt-4 text-[1.05rem] font-light leading-[1.8] text-[var(--privacy-body)] [font-family:'Montserrat',var(--font-geist),sans-serif]">
                  {section.body}
                </p>
              </section>
            ))}
          </div>
        </article>
      </div>
    </main>
  );
}

