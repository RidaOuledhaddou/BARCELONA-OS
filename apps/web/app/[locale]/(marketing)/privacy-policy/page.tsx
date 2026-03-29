"use client";

import { useState } from "react";
import { Link } from "../../../../i18n/navigation";

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
        title: "Scope & This Website",
        body: "This Policy describes how Royale One processes personal data. This public website is primarily informational: it does not currently provide live booking, in-app payments, or full account-backed concierge services. Unless you use a feature that explicitly collects information (for example, a contact or application form), we typically process only limited technical data common to all websites—such as standard server logs and, in your browser, preferences like theme choice. Optional analytics or personalization cookies are described in Cookie Preferences and apply only if and when those tools are enabled. When member, guest, or partner services launch, we will update this Policy with additional categories (for example, precise location for trips), purposes, legal bases, and retention. Later sections also describe practices we apply or intend to apply for the full Suite.",
      },
      {
        title: "The Vow",
        body: "Your privacy is our cornerstone. We do not build a business on selling personal data. This Sanctuary outlines how we intend to safeguard your information as services expand.",
      },
      {
        title: "Data We Collect",
        body: "We collect data proportionate to what you use. On this marketing site, that may include information you voluntarily submit, technical connection data from infrastructure, and cookies you consent to under Cookie Preferences. When trip, stay, or payment features are live, we may collect additional data as disclosed at that time (for example, pickup preferences or location if you grant it). We apply encryption and access controls where they are technically deployed.",
      },
      {
        title: "Sharing",
        body: "When operational services exist, we may share limited personal data with vetted fleet, stay, or payment partners solely to fulfill your requests. We do not sell personal data to data brokers. Until those flows are active, partner sharing through this site is generally not applicable.",
      },
      {
        title: "Your Rights",
        body: "Where the GDPR and applicable law apply, you have rights of access, rectification, erasure, restriction, portability, and objection. Contact us to exercise rights regarding data we hold. We will respond in line with legal timeframes.",
      },
    ],
    cta: "Exercise Your Rights",
  },
  es: {
    pageTitle: "El Santuario Digital",
    sections: [
      {
        title: "Alcance y este sitio web",
        body: "Esta Política describe cómo Royale One trata los datos personales. Este sitio público es principalmente informativo: no ofrece actualmente reservas en vivo, pagos integrales en la aplicación ni servicios de conserjería completos vinculados a cuenta. Salvo que utilice una función que recopile información de forma explícita (por ejemplo, un formulario de contacto o solicitud), solemos tratar solo datos técnicos limitados habituales en cualquier web—como registros estándar del servidor y, en su navegador, preferencias como el tema visual. Las cookies analíticas o de personalización opcionales se describen en Preferencias de cookies y solo aplican si y cuando esas herramientas estén activas. Cuando se lancen servicios para miembros, huéspedes o socios, actualizaremos esta Política con categorías adicionales (por ejemplo, ubicación precisa para trayectos), finalidades, bases legales y conservación. Las secciones siguientes describen también prácticas que aplicamos o prevémos para la Suite completa.",
      },
      {
        title: "El Voto",
        body: "Su privacidad es nuestra piedra angular. No basamos el negocio en la venta de datos personales. Este Santuario describe cómo pretendemos proteger su información a medida que los servicios crezcan.",
      },
      {
        title: "Datos que recopilamos",
        body: "Recopilamos datos proporcionales a lo que utilice. En este sitio de marketing, puede incluir información que envíe voluntariamente, datos técnicos de conexión de la infraestructura y cookies que acepte en Preferencias de cookies. Cuando las funciones de trayecto, estancia o pago estén activas, podremos recopilar datos adicionales según se informe en ese momento (por ejemplo, preferencias de recogida o ubicación si usted la autoriza). Aplicamos cifrado y controles de acceso donde estén desplegados técnicamente.",
      },
      {
        title: "Compartición",
        body: "Cuando existan servicios operativos, podremos compartir datos personales limitados con socios de flota, estancia o pago auditados únicamente para ejecutar sus solicitudes. No vendemos datos personales a intermediarios de datos. Hasta que esos flujos estén activos, la compartición con socios a través de este sitio suele no ser aplicable.",
      },
      {
        title: "Sus derechos",
        body: "Cuando el RGPD y la ley aplicable rijan, usted tiene derechos de acceso, rectificación, supresión, limitación, portabilidad y oposición. Contacte con nosotros para ejercer derechos sobre los datos que tratemos. Responderemos en los plazos legales.",
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

