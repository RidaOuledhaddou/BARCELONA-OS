"use client";

import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import { Link } from "../../../../i18n/navigation";
import { useTheme } from "../../../theme-provider";

type DossierPaper = {
  id: string;
  header: string;
  titleEn: string;
  titleEs: string;
  bodyEn: string;
  bodyEs: string;
};

const DOSSIER: DossierPaper[] = [
  {
    id: "01",
    header: "01 / BRAND DISPATCH",
    titleEn: "THE NARRATIVE",
    titleEs: "LA NARRATIVA",
    bodyEn:
      "Defining the Urban Frontier. Royale One is not a service; it is a philosophy of movement. Our mission is to preserve the heritage of Barcelona while architecting the future of luxury mobility.",
    bodyEs:
      "Definiendo la Frontera Urbana. Royale One no es un servicio; es una filosofía del movimiento. Nuestra misión es preservar el legado de Barcelona mientras proyectamos el futuro de la movilidad de lujo.",
  },
  {
    id: "02",
    header: "02 / MEDIA REPOSITORY",
    titleEn: "VISUAL PROTOCOL",
    titleEs: "PROTOCOLO VISUAL",
    bodyEn:
      "High-Resolution Assets. Download our official iconography, architectural photography, and brand standards. Use of these assets is governed by our Identity Charter.",
    bodyEs:
      "Activos de Alta Resolución. Descargue nuestra iconografía oficial, fotografía arquitectónica y manual de marca. El uso de estos activos se rige por nuestra Carta de Identidad.",
  },
  {
    id: "03",
    header: "03 / SELECTED CHRONICLES",
    titleEn: "THE RECORD",
    titleEs: "EL REGISTRO",
    bodyEn: "Third-Party Validation. A curated selection of global perspectives on the Royale One ecosystem.",
    bodyEs: "Validación Externa. Una selección curada de perspectivas globales sobre el ecosistema Royale One.",
  },
];

export default function PressPage() {
  const { resolvedTheme } = useTheme();
  const locale = useLocale();
  const isSunny = resolvedTheme === "sunny";
  const isSpanish = locale === "es";

  const bg = isSunny ? "#e5e3d6" : "#000000";
  const text = isSunny ? "#452821" : "#a5a283";
  const accent = "#58562d";
  const border = isSunny ? "rgb(165 162 131 / 0.45)" : "rgb(88 86 45 / 0.72)";
  const bodyColor = "var(--privacy-body)";

  return (
    <main
      className="relative left-1/2 min-h-[calc(100vh-5rem)] w-screen -translate-x-1/2 overflow-x-hidden px-3 pb-20 pt-8 sm:px-6"
      style={{ background: bg, color: text }}
    >
      <motion.div
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[160px] bg-[linear-gradient(180deg,rgba(165,162,131,0.12),rgba(165,162,131,0))]"
        animate={{ y: ["-18vh", "120vh"] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />

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
            {isSpanish ? "[ ASUNTOS PÚBLICOS ]" : "[ PUBLIC AFFAIRS ]"}
          </span>
        </div>

        <section className="relative mb-12 overflow-hidden rounded-[30px] border px-5 py-12 sm:px-10" style={{ borderColor: border }}>
          <div
            className="pointer-events-none absolute inset-3 rounded-[22px] border"
            style={{ borderColor: border }}
          />
          <div
            className="pointer-events-none absolute left-7 top-6 text-[0.56rem] uppercase tracking-[0.32em] [font-family:'Montserrat',var(--font-geist),sans-serif]"
            style={{ color: accent }}
          >
            FILE NO: RO-PR-2026
          </div>
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <span
              className="select-none text-center text-[2.3rem] font-light uppercase tracking-[0.36em] opacity-[0.08] [font-family:'Montserrat',var(--font-geist),sans-serif] sm:text-[3rem]"
              style={{ color: accent }}
            >
              OFFICIAL ARCHIVE
            </span>
          </div>

          <div className="relative z-20">
            <p
              className="text-center text-[0.75rem] font-light uppercase tracking-[0.4em] [font-family:'Montserrat',var(--font-geist),sans-serif]"
              style={{ color: accent }}
            >
              {isSpanish ? "Activos de Medios" : "Media Assets"}
            </p>
            <h1 className="mt-4 text-center text-[2.8rem] font-bold tracking-tight [font-family:'Charnoir',var(--font-geist),serif]">
              {isSpanish ? "Consultas de Prensa" : "Press Inquiries"}
            </h1>
            <p
              className="mx-auto mt-7 max-w-3xl text-center text-[1.1rem] font-light leading-[1.8] [font-family:'Montserrat',var(--font-geist),sans-serif]"
              style={{ color: bodyColor }}
            >
              {isSpanish
                ? "Acceda a los registros oficiales de Royale One. Para especialistas en medios que requieran activos de alta definición y narrativas verificadas."
                : "Access the official records of Royale One. For media specialists requiring high-definition assets and verified narratives."}
            </p>
          </div>
        </section>

        <div className="space-y-6">
          {DOSSIER.map((paper, idx) => (
            <motion.article
              key={paper.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.22 }}
              transition={{ duration: 0.52, delay: idx * 0.06, ease: "easeOut" }}
              className="relative overflow-hidden rounded-[28px] border p-5 sm:p-8"
              style={{
                borderColor: border,
                background: isSunny
                  ? "linear-gradient(145deg, rgb(229 227 214 / 0.98), rgb(223 221 208 / 0.98))"
                  : "linear-gradient(150deg, rgb(0 0 0 / 0.96), rgb(8 8 8 / 0.98))",
                boxShadow: isSunny ? "10px 16px 34px rgba(69,40,33,0.1)" : "10px 16px 34px rgba(229,227,214,0.09)",
              }}
            >
              <div className="pointer-events-none absolute inset-3 rounded-[22px] border" style={{ borderColor: border }} />
              <span
                className="absolute left-4 top-3 text-[0.58rem] uppercase tracking-[0.3em] [font-family:'Montserrat',var(--font-geist),sans-serif]"
                style={{ color: accent }}
              >
                41.3902 N
              </span>
              <span
                className="absolute right-4 top-3 text-[0.58rem] uppercase tracking-[0.3em] [font-family:'Montserrat',var(--font-geist),sans-serif]"
                style={{ color: accent }}
              >
                2.1540 E
              </span>
              <span
                className="absolute bottom-3 left-4 text-[0.58rem] uppercase tracking-[0.3em] [font-family:'Montserrat',var(--font-geist),sans-serif]"
                style={{ color: accent }}
              >
                MEDIA HUB
              </span>
              <span
                className="absolute bottom-3 right-4 text-[0.58rem] uppercase tracking-[0.3em] [font-family:'Montserrat',var(--font-geist),sans-serif]"
                style={{ color: accent }}
              >
                GRID RO-OPS
              </span>

              <div className="relative z-10 px-2 pb-8 pt-7 sm:px-6">
                <p className="text-[0.75rem] font-light uppercase tracking-[0.4em] [font-family:'Montserrat',var(--font-geist),sans-serif]" style={{ color: accent }}>
                  <span className="mr-2 text-[1.2rem] font-bold [font-family:'Charnoir',var(--font-geist),serif]">{paper.id}</span>
                  <span>{paper.header.replace(`${paper.id} / `, "")}</span>
                </p>
                <h2 className="mt-4 text-[2rem] font-bold tracking-tight [font-family:'Charnoir',var(--font-geist),serif]">
                  {isSpanish ? paper.titleEs : paper.titleEn} <span className="opacity-70">|</span> {isSpanish ? paper.titleEn : paper.titleEs}
                </h2>
                <p
                  className="mt-8 text-[1.1rem] font-light leading-[1.8] [font-family:'Montserrat',var(--font-geist),sans-serif]"
                  style={{ color: bodyColor }}
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
            <p
              className="text-[0.75rem] font-light uppercase tracking-[0.4em] [font-family:'Montserrat',var(--font-geist),sans-serif]"
              style={{ color: accent }}
            >
              <span className="mr-2 text-[1.2rem] font-bold [font-family:'Charnoir',var(--font-geist),serif]">04</span>
              <span>{isSpanish ? "KIT DE PRENSA" : "PRESS KIT ACTION"}</span>
            </p>

            <div className="group mt-8 inline-flex flex-col items-start">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-full border px-6 py-3 text-[0.8rem] uppercase tracking-[0.3em] transition duration-300 [font-family:'Montserrat',var(--font-geist),sans-serif]"
                style={{
                  borderColor: border,
                  color: text,
                  background: "transparent",
                }}
              >
                {isSpanish ? "Descargar Dossier de Prensa" : "Download Press Dossier"}
              </button>
              <span
                className="mt-2 text-[0.56rem] uppercase tracking-[0.32em] opacity-0 transition-opacity duration-300 group-hover:opacity-100 [font-family:'Montserrat',var(--font-geist),sans-serif]"
                style={{ color: accent }}
              >
                FILE SIZE: 42.8MB
              </span>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
