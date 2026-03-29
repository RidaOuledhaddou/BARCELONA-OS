"use client";

import { useState } from "react";
import { Link } from "../../../../i18n/navigation";

type Language = "en" | "es";

const SOVEREIGNTY_COPY: Record<
  Language,
  {
    pageTitle: string;
    sections: Array<{ title: string; body: string }>;
  }
> = {
  en: {
    pageTitle: "Data Sovereignty",
    sections: [
      {
        title: "Scope",
        body: "This page describes our data-sovereignty commitments for Royale One services as they are built and operated. This marketing website alone does not move trip or payment data through a live backend visible here; processing today is limited as described in the Privacy Policy. The principles below apply to the full Suite once corresponding infrastructure is deployed.",
      },
      {
        title: "Jurisdiction",
        body: "We design processing to align with EU and Spanish law, including the GDPR, for personal data we control. We avoid unnecessary transfers outside adequate jurisdictions.",
      },
      {
        title: "Infrastructure",
        body: "For production workloads, we target hosting and providers in the European Economic Area or equivalent safeguards. Architectural choices (including strong access control and minimization) are implemented as engineering milestones land—not every claim on this page describes the current static site.",
      },
      {
        title: "Your control",
        body: "You may request access, portability, correction, or erasure of personal data we hold, subject to law and legitimate retention needs. Contact us through channels provided on the site.",
      },
    ],
  },
  es: {
    pageTitle: "Soberania de Datos",
    sections: [
      {
        title: "Alcance",
        body: "Esta página describe los compromisos de soberanía de datos de los servicios Royale One a medida que se construyen y operan. Este sitio de marketing por sí solo no mueve datos de trayectos o pagos a través de un backend en vivo aquí; el tratamiento hoy es limitado según la Política de Privacidad. Los principios siguientes se aplican a la Suite completa cuando la infraestructura correspondiente esté desplegada.",
      },
      {
        title: "Jurisdiccion",
        body: "Diseñamos el tratamiento para alinearlo con la ley de la UE y España, incluido el RGPD, respecto de los datos personales que controlamos. Evitamos transferencias innecesarias fuera de jurisdicciones adecuadas.",
      },
      {
        title: "Infraestructura",
        body: "Para cargas de producción, apuntamos a alojamiento y proveedores en el Espacio Económico Europeo o salvaguardas equivalentes. Las decisiones arquitectónicas (incluido control de acceso fuerte y minimización) se implementan a medida que avanzan los hitos de ingeniería—no cada afirmación de esta página describe el sitio estático actual.",
      },
      {
        title: "Su control",
        body: "Puede solicitar acceso, portabilidad, rectificación o supresión de los datos personales que tratemos, con sujeción a la ley y necesidades legítimas de conservación. Contacte a través de los canales indicados en el sitio.",
      },
    ],
  },
};

export default function DataSovereigntyPage() {
  const [language, setLanguage] = useState<Language>("en");
  const copy = SOVEREIGNTY_COPY[language];

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

          <div className="relative mt-8 pl-6 md:pl-8">
            <div className="pointer-events-none absolute bottom-0 left-0 top-0 w-px bg-[rgb(88,86,45,0.2)]" />
            {copy.sections.map((section) => (
              <section key={section.title} className="py-10 first:pt-2">
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

