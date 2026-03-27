"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useLocale } from "next-intl";
import { Link } from "../../../i18n/navigation";
import { useTheme } from "../../theme-provider";

type PaperModule = {
  id: string;
  headerEn: string;
  headerEs: string;
  titleEn: string;
  titleEs: string;
  bodyEn: string;
  bodyEs: string;
};

const PAPERS: PaperModule[] = [
  {
    id: "01",
    headerEn: "01 / THE ELITE ORDER",
    headerEs: "01 / EL ORDEN DE ÉLITE",
    titleEn: "THE STANDARD",
    titleEs: "EL ESTÁNDAR",
    bodyEn:
      "Command the City. We do not seek drivers; we recruit partners. Royale One is a guild of precision, discretion, and local mastery. If you represent the peak of Barcelona's hospitality, you belong in the Fleet.",
    bodyEs:
      "Comande la Ciudad. No buscamos conductores; reclutamos socios. Royale One es un gremio de precisión, discreción y maestría local. Si representa la cima de la hospitalidad en Barcelona, pertenece a la Flota.",
  },
  {
    id: "02",
    headerEn: "02 / BEYOND THE GIG",
    headerEs: "02 / MÁS ALLÁ DE LA 'GIG ECONOMY'",
    titleEn: "ECONOMIC SOVEREIGNTY",
    titleEs: "SOBERANÍA ECONÓMICA",
    bodyEn:
      "Fair Exchange. We reject the 'gig-economy' volatility. Our partners enjoy guaranteed commissions, transparent earnings, and the dignity of a long-term professional alliance.",
    bodyEs:
      "Intercambio Justo. Rechazamos la volatilidad de la 'economía gig'. Nuestros socios disfrutan de comisiones garantizadas, ganancias transparentes y la dignidad de una alianza profesional a largo plazo.",
  },
  {
    id: "03",
    headerEn: "03 / SILENT ARCHITECTURE",
    headerEs: "03 / ARQUITECTURA SILENCIOSA",
    titleEn: "THE PROTOCOL",
    titleEs: "EL PROTOCOLO",
    bodyEn:
      "The Art of Discretion. Every movement is governed by our Ethics Charter. We provide the technology; you provide the human soul. Together, we refine the urban experience.",
    bodyEs:
      "El Arte de la Discreción. Cada movimiento se rige por nuestra Carta Ética. Nosotros aportamos la tecnología; usted aporta el alma humana. Juntos, refinamos la experiencia urbana.",
  },
];

function CompassWatermark({ stroke }: { stroke: string }) {
  return (
    <svg viewBox="0 0 220 220" className="h-full w-full" fill="none" aria-hidden>
      <circle cx="110" cy="110" r="96" stroke={stroke} strokeWidth="1" />
      <circle cx="110" cy="110" r="72" stroke={stroke} strokeWidth="0.8" />
      <path d="M110 16V204M16 110H204" stroke={stroke} strokeWidth="0.8" />
      <path d="M51 51L169 169M169 51L51 169" stroke={stroke} strokeWidth="0.6" />
      <path d="M110 40L126 110L110 180L94 110L110 40Z" stroke={stroke} strokeWidth="1.1" />
      <path d="M40 110L110 126L180 110L110 94L40 110Z" stroke={stroke} strokeWidth="1.1" />
      <text x="110" y="30" textAnchor="middle" fontSize="11" fill={stroke} style={{ letterSpacing: "0.28em" }}>
        N
      </text>
      <text x="110" y="202" textAnchor="middle" fontSize="11" fill={stroke} style={{ letterSpacing: "0.28em" }}>
        S
      </text>
      <text x="24" y="114" textAnchor="middle" fontSize="11" fill={stroke} style={{ letterSpacing: "0.28em" }}>
        W
      </text>
      <text x="196" y="114" textAnchor="middle" fontSize="11" fill={stroke} style={{ letterSpacing: "0.28em" }}>
        E
      </text>
    </svg>
  );
}

export default function JoinTheFleetPage() {
  const { resolvedTheme } = useTheme();
  const locale = useLocale();
  const isSunny = resolvedTheme === "sunny";
  const { scrollYProgress } = useScroll();
  const compassRotate = useTransform(scrollYProgress, [0, 1], [0, 64]);

  const bg = isSunny ? "#e5e3d6" : "#000000";
  const text = isSunny ? "#452821" : "#a5a283";
  const accent = "#58562d";
  const border = isSunny ? "rgb(165 162 131 / 0.45)" : "rgb(88 86 45 / 0.7)";
  const descriptionColor = "var(--privacy-body)";
  const isSpanish = locale === "es";

  return (
    <main
      className="relative left-1/2 min-h-[calc(100vh-5rem)] w-screen -translate-x-1/2 overflow-x-hidden px-3 pb-20 pt-8 sm:px-6"
      style={{ background: bg, color: text }}
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-7 flex items-center justify-between rounded-full border px-4 py-2" style={{ borderColor: border }}>
          <Link
            href="/"
            className="text-[0.7rem] uppercase tracking-[0.38em] [font-family:'Montserrat',var(--font-geist),sans-serif]"
            style={{ color: text }}
          >
            {isSpanish ? "Volver a la Suite" : "Return to Suite"}
          </Link>
          <span
            className="text-[0.64rem] uppercase tracking-[0.4em] [font-family:'Montserrat',var(--font-geist),sans-serif]"
            style={{ color: accent }}
          >
            {isSpanish ? "[ MANUAL DE CAMPO: BARCELONA ]" : "[ BARCELONA FIELD MANUAL ]"}
          </span>
        </div>

        <section className="relative mb-12 overflow-hidden rounded-[30px] border px-5 py-12 sm:px-10" style={{ borderColor: border }}>
          <motion.div
            className="pointer-events-none absolute right-[-5rem] top-[-4.5rem] h-[280px] w-[280px] opacity-25 sm:h-[340px] sm:w-[340px]"
            style={{ rotate: compassRotate }}
          >
            <CompassWatermark stroke={isSunny ? "rgb(88 86 45 / 0.65)" : "rgb(165 162 131 / 0.34)"} />
          </motion.div>

          <p
            className="text-center text-[0.75rem] font-light uppercase tracking-[0.4em] [font-family:'Montserrat',var(--font-geist),sans-serif]"
            style={{ color: accent }}
          >
            {isSpanish ? "Manuscrito Técnico" : "Technical Manuscript"}
          </p>
          <h1
            className="mt-4 text-center text-[2.8rem] font-bold tracking-tight [font-family:'Charnoir',var(--font-geist),serif]"
            style={{ color: isSunny ? "#452821" : "#a5a283" }}
          >
            {isSpanish ? "Únase a la Flota" : "Join The Fleet"}
          </h1>
          <p
            className="mx-auto mt-7 max-w-3xl text-center text-[1.1rem] font-light leading-[1.8] [font-family:'Montserrat',var(--font-geist),sans-serif]"
            style={{ color: descriptionColor }}
          >
            {isSpanish
              ? "Protocolo de incorporación para operadores de élite, especialistas en hospitalidad y expertos locales alineados con los estándares de Royale One."
              : "Blueprint intake for elite operators, hospitality specialists, and local experts aligned with Royale One standards."}
          </p>
        </section>

        <div className="space-y-6">
          {PAPERS.map((paper, idx) => (
            <motion.article
              key={paper.id}
              initial={{ opacity: 0, y: 28, rotate: -0.4 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              animate={{ y: [0, -4, 0] }}
              className="relative overflow-hidden rounded-[28px] border p-5 sm:p-8"
              style={{
                borderColor: border,
                background: isSunny
                  ? "linear-gradient(140deg, rgb(229 227 214 / 0.98), rgb(223 221 208 / 0.98))"
                  : "linear-gradient(150deg, rgb(0 0 0 / 0.96), rgb(8 8 8 / 0.98))",
                boxShadow: isSunny
                  ? "10px 16px 36px rgba(69,40,33,0.11)"
                  : "10px 16px 36px rgba(229,227,214,0.1)",
              }}
              transition={{
                duration: 0.55,
                delay: idx * 0.08,
                ease: "easeOut",
                y: { duration: 5.5 + idx * 0.6, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" },
              }}
            >
              <div className="pointer-events-none absolute inset-3 rounded-[22px] border" style={{ borderColor: border }} />
              <span
                className="absolute left-4 top-3 text-[0.58rem] uppercase tracking-[0.3em] [font-family:'Montserrat',var(--font-geist),sans-serif]"
                style={{ color: accent }}
              >
                41.3851 N
              </span>
              <span
                className="absolute right-4 top-3 text-[0.58rem] uppercase tracking-[0.3em] [font-family:'Montserrat',var(--font-geist),sans-serif]"
                style={{ color: accent }}
              >
                2.1734 E
              </span>
              <span
                className="absolute bottom-3 left-4 text-[0.58rem] uppercase tracking-[0.3em] [font-family:'Montserrat',var(--font-geist),sans-serif]"
                style={{ color: accent }}
              >
                BCN GRID
              </span>
              <span
                className="absolute bottom-3 right-4 text-[0.58rem] uppercase tracking-[0.3em] [font-family:'Montserrat',var(--font-geist),sans-serif]"
                style={{ color: accent }}
              >
                RO-OPS
              </span>

              <div className="relative z-10 px-2 pb-8 pt-7 sm:px-6">
                <p className="text-[0.75rem] font-light uppercase tracking-[0.4em] [font-family:'Montserrat',var(--font-geist),sans-serif]" style={{ color: accent }}>
                  <span className="mr-2 text-[1.2rem] font-bold [font-family:'Charnoir',var(--font-geist),serif]">{paper.id}</span>
                  <span>{isSpanish ? paper.headerEs.replace(`${paper.id} / `, "") : paper.headerEn.replace(`${paper.id} / `, "")}</span>
                </p>
                <h2 className="mt-4 text-[2rem] font-bold tracking-tight [font-family:'Charnoir',var(--font-geist),serif]">
                  {isSpanish ? paper.titleEs : paper.titleEn} <span className="opacity-70">|</span> {isSpanish ? paper.titleEn : paper.titleEs}
                </h2>

                <p
                  className="mt-8 text-[1.1rem] font-light leading-[1.8] [font-family:'Montserrat',var(--font-geist),sans-serif]"
                  style={{ color: descriptionColor }}
                >
                  {isSpanish ? paper.bodyEs : paper.bodyEn}
                </p>
              </div>
            </motion.article>
          ))}
        </div>

        <section className="relative mt-10 rounded-[28px] border p-6 sm:p-9" style={{ borderColor: border }}>
          <div className="pointer-events-none absolute inset-3 rounded-[20px] border" style={{ borderColor: border }} />
          <div className="relative z-10">
            <p className="text-[0.75rem] font-light uppercase tracking-[0.4em] [font-family:'Montserrat',var(--font-geist),sans-serif]" style={{ color: accent }}>
              <span className="mr-2 text-[1.2rem] font-bold [font-family:'Charnoir',var(--font-geist),serif]">04</span>
              <span>{isSpanish ? "LLAMADA AL PROTOCOLO" : "CALL TO PROTOCOL"}</span>
            </p>
            <h3 className="mt-4 text-[2.1rem] font-bold tracking-tight [font-family:'Charnoir',var(--font-geist),serif]">
              {isSpanish ? "CALL TO PROTOCOL" : "Inquire for Commission"}
            </h3>
            <p
              className="mt-5 max-w-3xl text-[1.1rem] font-light leading-[1.8] [font-family:'Montserrat',var(--font-geist),sans-serif]"
              style={{ color: descriptionColor }}
            >
              {isSpanish
                ? "Envíe su perfil para una revisión de cualificación privada. Cada solicitud es evaluada bajo estrictos criterios de discreción, conocimiento local y precisión en la hospitalidad."
                : "Submit your profile for a private qualification review. Every application is screened for discretion, local knowledge, and hospitality precision."}
            </p>

            <div className="mt-8">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center rounded-full border px-6 py-3 text-[0.8rem] uppercase tracking-[0.3em] transition duration-300 [font-family:'Montserrat',var(--font-geist),sans-serif]"
                style={{
                  borderColor: border,
                  color: text,
                  boxShadow: "0 0 0 rgba(165,162,131,0)",
                }}
                onMouseEnter={(event) => {
                  event.currentTarget.style.boxShadow = "0 0 24px rgba(165,162,131,0.33)";
                }}
                onMouseLeave={(event) => {
                  event.currentTarget.style.boxShadow = "0 0 0 rgba(165,162,131,0)";
                }}
              >
                {isSpanish ? "Solicitar Incorporación" : "Inquire for Commission"}
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
