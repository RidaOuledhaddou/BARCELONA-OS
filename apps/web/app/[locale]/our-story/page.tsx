"use client";

import { motion, useAnimationControls, useDragControls } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "../../../i18n/navigation";
import { useTheme } from "../../theme-provider";

type Language = "en" | "es";

type StoryPage = {
  heading: string;
  body: string;
  footer?: string;
  watermark?: string;
  isCover?: boolean;
};

const EN_PAGES: StoryPage[] = [
  {
    heading: "Our Story",
    body: "A digital manuscript of origin, identity, and legacy.",
    footer: "Tap right to begin.",
    isCover: true,
  },
  {
    heading: "Born in Barcelona",
    body: "Royale One was conceived in the heart of Catalonia to transform travel into a human masterpiece. We moved away from standardized luxury to create a single point of trust.",
    watermark: "RC",
  },
  {
    heading: "Royale. One.",
    body: "\"Royale\" represents the distinction of our service. \"One\" symbolizes uniqueness-a handcrafted experience designed from scratch for a single individual.",
    footer: "Handcrafted from scratch.",
  },
  {
    heading: "The Art of Human Service",
    body: "Our mission is to simplify the exceptional. From daily needs to urban foresight, we handle the complexity so our members can experience the city with absolute serenity.",
  },
  {
    heading: "Elegant Silence",
    body: "We believe in warm, discreet support. In a world of noise, Royale One is the quiet architect of your urban footprint.",
  },
  {
    heading: "Refining the Experience",
    body: "Today, we are more than a concierge; we are the guardians of the Barcelona heritage. Welcome to the Suite.",
  },
];

const ES_PAGES: StoryPage[] = [
  {
    heading: "Nuestra Historia",
    body: "Un manuscrito digital de origen, identidad, misión, filosofía y legado.",
    footer: "Toque a la derecha para comenzar.",
    isCover: true,
  },
  {
    heading: "Nacido en Barcelona",
    body: "Royale One nace en el corazón de Cataluña para transformar el viaje en una obra humana. Dejamos atrás el lujo estandarizado para crear un único punto de confianza.",
    watermark: "RC",
  },
  {
    heading: "Royale. One.",
    body: "\"Royale\" representa la distinción del servicio. \"One\" simboliza la singularidad: una experiencia artesanal creada desde cero para una sola persona.",
    footer: "Creado desde cero.",
  },
  {
    heading: "El Arte del Servicio Humano",
    body: "Nuestra misión es simplificar lo excepcional. Desde necesidades diarias hasta prospectiva urbana, gestionamos la complejidad para que nuestros miembros vivan la ciudad con serenidad absoluta.",
  },
  {
    heading: "Silencio Elegante",
    body: "Creemos en un acompañamiento cálido y discreto. En un mundo de ruido, Royale One es el arquitecto silencioso de su huella urbana.",
  },
  {
    heading: "Refinando la Experiencia",
    body: "Hoy somos más que conserjería; somos guardianes del legado de Barcelona. Bienvenido a la Suite.",
  },
];

const stackRotations = [-1, 0.6, -0.4, 0.9, -0.2];

export default function OurStoryPage() {
  const { resolvedTheme } = useTheme();
  const isSunny = resolvedTheme === "sunny";
  const [language, setLanguage] = useState<Language>("en");
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [pendingIndex, setPendingIndex] = useState<number | null>(null);
  const [isFlinging, setIsFlinging] = useState(false);
  const [tiltX, setTiltX] = useState(0);
  const [tiltY, setTiltY] = useState(0);
  const controls = useAnimationControls();
  const dragControls = useDragControls();

  const pages = useMemo(() => (language === "en" ? EN_PAGES : ES_PAGES), [language]);
  const total = pages.length;
  const current = pages[index];

  const underPageIndexA =
    isFlinging && direction < 0
      ? Math.max(index - 1, 0)
      : Math.min(index + 1, total - 1);
  const underPageIndexB =
    isFlinging && direction < 0
      ? Math.max(index - 2, 0)
      : Math.min(index + 2, total - 1);
  const underPageA = pages[underPageIndexA];
  const underPageB = pages[underPageIndexB];

  const borderColor = isSunny ? "rgb(88 86 45 / 0.15)" : "rgb(165 162 131 / 0.15)";
  const pageBg = isSunny ? "#e5e3d6" : "#000000";
  const textColor = isSunny ? "#452821" : "#a5a283";
  const manuscriptBorder = isSunny ? "rgb(165 162 131 / 0.3)" : "#58562d";
  const sunnyBookBg =
    "linear-gradient(180deg, rgb(var(--button-top-rgb) / 0.2), rgb(var(--button-bottom-rgb) / 0.16)), #e5e3d6";
  const progress = `${((index + 1) / total) * 100}%`;
  const tiltStrength = Math.abs(tiltX) + Math.abs(tiltY);

  useEffect(() => {
    setIndex(0);
    setPendingIndex(null);
    setIsFlinging(false);
    controls.set({ x: 0, rotate: 0, z: 0, opacity: 1, scale: 1 });
  }, [language, controls]);

  const flingTo = (targetIndex: number, dir: 1 | -1) => {
    if (isFlinging || targetIndex === index || targetIndex < 0 || targetIndex >= total) {
      return;
    }

    setDirection(dir);
    setPendingIndex(targetIndex);
    setIsFlinging(true);

    controls.start({
      x: dir > 0 ? window.innerWidth * 1.08 : -window.innerWidth * 1.08,
      rotate: dir > 0 ? 2.4 : -2.4,
      z: -120,
      opacity: 0,
      scale: 0.96,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    });
  };

  const goNext = () => {
    if (index >= total - 1) {
      return;
    }
    flingTo(index + 1, 1);
  };

  const goPrev = () => {
    if (index <= 0) {
      return;
    }
    flingTo(index - 1, -1);
  };

  const handleCardTap = (event: React.PointerEvent<HTMLElement>) => {
    if (isFlinging) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const tappedLeft = event.clientX < rect.left + rect.width / 2;
    if (tappedLeft) {
      goPrev();
    } else {
      goNext();
    }
  };

  return (
    <main
      className="relative left-1/2 min-h-[calc(100vh-5rem)] w-screen -translate-x-1/2 px-0 pb-20 pt-2 sm:px-8"
      style={{ background: pageBg, color: textColor }}
    >
      <div className="mx-auto w-[96%] max-w-[calc(100vw-18px)] sm:w-full sm:max-w-[800px]">
        <div className="sticky top-2 z-20 flex items-center justify-between rounded-full border px-3 py-2 backdrop-blur-md">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 border-b pb-0.5 text-[0.7rem] font-light uppercase tracking-[0.4em]"
            style={{ borderColor, color: textColor }}
          >
            <span className="transition-transform duration-200 group-hover:-translate-x-1">←</span>
            Return to Suite
          </Link>

          <div className="inline-flex rounded-full border p-1" style={{ borderColor }}>
            <button
              type="button"
              onClick={() => setLanguage("en")}
              className="rounded-full px-3 py-1 text-[0.72rem] font-light uppercase tracking-[0.2em]"
              style={{
                background: language === "en" ? (isSunny ? "rgb(88 86 45 / 0.18)" : "rgb(165 162 131 / 0.18)") : "transparent",
                color: textColor,
              }}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLanguage("es")}
              className="rounded-full px-3 py-1 text-[0.72rem] font-light uppercase tracking-[0.2em]"
              style={{
                background: language === "es" ? (isSunny ? "rgb(88 86 45 / 0.18)" : "rgb(165 162 131 / 0.18)") : "transparent",
                color: textColor,
              }}
            >
              ES
            </button>
          </div>
        </div>

        <div className="relative mt-8 pl-4 sm:pl-8">
          <div className="pointer-events-none absolute bottom-4 left-0 top-4 w-px bg-[rgb(88,86,45,0.2)]" />
          <div className="absolute bottom-4 left-0 top-4 w-px bg-[rgb(88,86,45,0.2)]">
            <motion.div
              className="w-px bg-[#58562d]"
              style={{ height: progress }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            />
          </div>

          <div className="relative min-h-[620px] sm:min-h-[640px]">
            <div
              className="pointer-events-none absolute inset-0 rounded-[28px] p-7 md:p-10"
              style={{
                border: `1px solid ${borderColor}`,
                background: isSunny ? sunnyBookBg : "rgb(0 0 0 / 0.96)",
                transform: `translateY(16px) rotate(${stackRotations[(index + 2) % stackRotations.length]}deg)`,
                zIndex: 1,
              }}
            >
              <div className="absolute right-7 top-6 text-[0.9rem] opacity-60 [font-family:'Charnoir',var(--font-geist),serif]">
                {String(underPageIndexB).padStart(2, "0")}
              </div>
              <h2 className="text-[2.3rem] tracking-tight opacity-40 [font-family:'Charnoir',var(--font-geist),serif]">
                {underPageB.heading}
              </h2>
            </div>

            <div
              className="pointer-events-none absolute inset-0 rounded-[28px] p-7 md:p-10"
              style={{
                border: `1px solid ${borderColor}`,
                background: isSunny ? sunnyBookBg : "rgb(0 0 0 / 0.98)",
                transform: `translateY(8px) rotate(${stackRotations[(index + 1) % stackRotations.length]}deg)`,
                zIndex: 2,
              }}
            >
              <div className="absolute right-7 top-6 text-[0.9rem] opacity-65 [font-family:'Charnoir',var(--font-geist),serif]">
                {String(underPageIndexA).padStart(2, "0")}
              </div>
              <h2 className="text-[2.3rem] tracking-tight opacity-45 [font-family:'Charnoir',var(--font-geist),serif]">
                {underPageA.heading}
              </h2>
            </div>

            <motion.article
              onPointerUp={handleCardTap}
              drag="x"
              dragListener={false}
              dragControls={dragControls}
              onPointerDown={(event) => {
                if (!isFlinging) {
                  dragControls.start(event);
                }
              }}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.1}
              whileDrag={{ scale: 1.01 }}
              onDrag={(_, info) => {
                // Add perspective tilt while dragging to mimic paper behavior.
                const nextTilt = Math.max(-10, Math.min(10, -info.offset.x / 28));
                setTiltY(nextTilt);
              }}
              onDragEnd={(_, info) => {
                if (isFlinging) {
                  return;
                }
                setTiltY(0);
                if (Math.abs(info.offset.x) > 200) {
                  const dir = info.offset.x > 0 ? 1 : -1;
                  const target = dir > 0 ? Math.min(index + 1, total - 1) : Math.max(index - 1, 0);
                  flingTo(target, dir);
                  return;
                }
                controls.start({
                  x: 0,
                  rotate: 0,
                  scale: 1,
                  opacity: 1,
                  transition: { type: "spring", stiffness: 300, damping: 30 },
                });
              }}
              onAnimationComplete={() => {
                if (!isFlinging || pendingIndex === null) {
                  return;
                }
                setTiltY(0);
                setTiltX(0);
                setIndex(pendingIndex);
                setPendingIndex(null);
                setIsFlinging(false);
                controls.set({ x: 0, rotate: 0, z: 0, opacity: 1, scale: 1 });
              }}
              animate={controls}
              className="relative z-10 min-h-[620px] cursor-grab active:cursor-grabbing rounded-[28px] p-7 md:p-10"
              onPointerMove={(event) => {
                if (isFlinging) {
                  return;
                }
                const rect = event.currentTarget.getBoundingClientRect();
                const relX = (event.clientX - rect.left) / rect.width;
                const relY = (event.clientY - rect.top) / rect.height;
                setTiltY((relX - 0.5) * 4);
                setTiltX((0.5 - relY) * 3);
              }}
              onPointerLeave={() => {
                setTiltY(0);
                setTiltX(0);
              }}
              style={{
                border: `1px solid ${borderColor}`,
                background:
                  current.isCover
                    ? isSunny
                      ? sunnyBookBg
                      : "linear-gradient(150deg, #000000 0%, #030303 48%, #0a0a0a 100%)"
                    : isSunny
                      ? sunnyBookBg
                      : "#000000",
                backgroundBlendMode: "multiply",
                rotateY: `${tiltY}deg`,
                rotateX: `${tiltX}deg`,
                transformPerspective: 1000,
                boxShadow: current.isCover
                  ? isSunny
                    ? `${10 + tiltStrength * 0.5}px ${16 + tiltStrength * 1.2}px 22px rgba(69,40,33,0.12), ${16 + tiltStrength * 0.7}px ${36 + tiltStrength * 1.4}px 58px rgba(69,40,33,0.14), ${24 + tiltStrength * 0.9}px ${58 + tiltStrength * 1.8}px 96px rgba(69,40,33,0.09)`
                    : `${10 + tiltStrength * 0.6}px ${18 + tiltStrength * 1.4}px 28px rgba(229,227,214,0.22), ${18 + tiltStrength * 0.8}px ${40 + tiltStrength * 1.6}px 64px rgba(229,227,214,0.18), ${28 + tiltStrength * 1}px ${64 + tiltStrength * 1.8}px 104px rgba(229,227,214,0.12)`
                  : isSunny
                    ? `${14 + tiltStrength * 0.7}px ${28 + tiltStrength * 1.2}px ${80 + tiltStrength * 2}px rgba(69, 40, 33, ${0.12 + tiltStrength * 0.006})`
                    : `${16 + tiltStrength * 0.8}px ${28 + tiltStrength * 1.4}px ${80 + tiltStrength * 2}px rgba(229, 227, 214, ${0.16 + tiltStrength * 0.004})`,
              }}
            >
                <div
                  className="pointer-events-none absolute inset-0 rounded-[28px] opacity-20"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 20% 20%, rgb(0 0 0 / 0.08) 0.7px, transparent 1px), radial-gradient(circle at 80% 30%, rgb(0 0 0 / 0.06) 0.6px, transparent 1px), radial-gradient(circle at 40% 70%, rgb(0 0 0 / 0.07) 0.5px, transparent 1px)",
                    backgroundSize: "16px 16px, 22px 22px, 28px 28px",
                    mixBlendMode: isSunny ? "multiply" : "screen",
                  }}
                />

                {current.isCover ? (
                  <>
                    <div
                      className="pointer-events-none absolute inset-[18px] rounded-[22px]"
                      style={{
                        border: `1px double ${manuscriptBorder}`,
                      }}
                    />
                    <div
                      className="pointer-events-none absolute inset-[28px] rounded-[18px]"
                      style={{
                        border: `1px solid ${manuscriptBorder}`,
                      }}
                    />
                    <svg className="pointer-events-none absolute inset-8 h-[42px] w-[42px] opacity-50" viewBox="0 0 42 42" fill="none">
                      <path d="M4 20C4 11.16 11.16 4 20 4" stroke={isSunny ? "#a5a283" : "#58562d"} strokeWidth="1.1" />
                      <path d="M8 20C8 13.37 13.37 8 20 8" stroke={isSunny ? "#a5a283" : "#58562d"} strokeWidth="0.9" />
                      <circle cx="20" cy="20" r="1.6" fill={isSunny ? "#a5a283" : "#58562d"} />
                    </svg>
                    <svg className="pointer-events-none absolute right-8 top-8 h-[42px] w-[42px] opacity-50" viewBox="0 0 42 42" fill="none">
                      <path d="M38 20C38 11.16 30.84 4 22 4" stroke={isSunny ? "#a5a283" : "#58562d"} strokeWidth="1.1" />
                      <path d="M34 20C34 13.37 28.63 8 22 8" stroke={isSunny ? "#a5a283" : "#58562d"} strokeWidth="0.9" />
                      <circle cx="22" cy="20" r="1.6" fill={isSunny ? "#a5a283" : "#58562d"} />
                    </svg>
                    <svg className="pointer-events-none absolute bottom-8 left-8 h-[42px] w-[42px] opacity-50" viewBox="0 0 42 42" fill="none">
                      <path d="M4 22C4 30.84 11.16 38 20 38" stroke={isSunny ? "#a5a283" : "#58562d"} strokeWidth="1.1" />
                      <path d="M8 22C8 28.63 13.37 34 20 34" stroke={isSunny ? "#a5a283" : "#58562d"} strokeWidth="0.9" />
                      <circle cx="20" cy="22" r="1.6" fill={isSunny ? "#a5a283" : "#58562d"} />
                    </svg>
                    <svg className="pointer-events-none absolute bottom-8 right-8 h-[42px] w-[42px] opacity-50" viewBox="0 0 42 42" fill="none">
                      <path d="M38 22C38 30.84 30.84 38 22 38" stroke={isSunny ? "#a5a283" : "#58562d"} strokeWidth="1.1" />
                      <path d="M34 22C34 28.63 28.63 34 22 34" stroke={isSunny ? "#a5a283" : "#58562d"} strokeWidth="0.9" />
                      <circle cx="22" cy="22" r="1.6" fill={isSunny ? "#a5a283" : "#58562d"} />
                    </svg>
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                      <span
                        className="select-none text-[7.8rem] leading-none opacity-[0.06] [font-family:'Charnoir',var(--font-geist),serif]"
                        style={{ color: isSunny ? "#452821" : "#e5e3d6" }}
                      >
                        RC
                      </span>
                    </div>
                    <div
                      className="pointer-events-none absolute bottom-0 right-0 top-0 w-[20px] opacity-45"
                      style={{
                        background:
                          isSunny
                            ? "repeating-linear-gradient(180deg, rgb(165 162 131 / 0.2) 0 2px, transparent 2px 8px)"
                            : "repeating-linear-gradient(180deg, rgb(88 86 45 / 0.35) 0 2px, transparent 2px 8px)",
                        clipPath:
                          "polygon(48% 0%, 100% 0%, 100% 100%, 52% 100%, 65% 92%, 40% 84%, 70% 76%, 38% 68%, 66% 58%, 36% 48%, 68% 38%, 42% 28%, 64% 18%, 44% 10%)",
                      }}
                    />
                  </>
                ) : null}

                {!current.isCover ? (
                  <div className="absolute right-7 top-6 text-[0.9rem] opacity-70 [font-family:'Charnoir',var(--font-geist),serif]">
                    {String(index).padStart(2, "0")}
                  </div>
                ) : null}

                {current.watermark ? (
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center text-[8rem] font-light opacity-[0.05] [font-family:'Charnoir',var(--font-geist),serif]">
                    {current.watermark}
                  </div>
                ) : null}

                {current.isCover ? (
                  <>
                    <div className="pointer-events-none absolute right-9 top-10 h-28 w-28 opacity-25 sm:h-36 sm:w-36">
                      <svg viewBox="0 0 220 220" className="h-full w-full" fill="none" aria-hidden>
                        <circle cx="110" cy="110" r="96" stroke={isSunny ? "rgb(88 86 45 / 0.45)" : "rgb(165 162 131 / 0.4)"} strokeWidth="1" />
                        <circle cx="110" cy="110" r="72" stroke={isSunny ? "rgb(88 86 45 / 0.35)" : "rgb(165 162 131 / 0.3)"} strokeWidth="0.8" />
                        <path d="M110 16V204M16 110H204" stroke={isSunny ? "rgb(88 86 45 / 0.35)" : "rgb(165 162 131 / 0.3)"} strokeWidth="0.8" />
                        <path d="M51 51L169 169M169 51L51 169" stroke={isSunny ? "rgb(88 86 45 / 0.25)" : "rgb(165 162 131 / 0.2)"} strokeWidth="0.6" />
                        <text x="110" y="30" textAnchor="middle" fontSize="11" fill={isSunny ? "rgb(88 86 45 / 0.45)" : "rgb(165 162 131 / 0.45)"} style={{ letterSpacing: "0.28em" }}>N</text>
                        <text x="110" y="202" textAnchor="middle" fontSize="11" fill={isSunny ? "rgb(88 86 45 / 0.45)" : "rgb(165 162 131 / 0.45)"} style={{ letterSpacing: "0.28em" }}>S</text>
                        <text x="24" y="114" textAnchor="middle" fontSize="11" fill={isSunny ? "rgb(88 86 45 / 0.45)" : "rgb(165 162 131 / 0.45)"} style={{ letterSpacing: "0.28em" }}>W</text>
                        <text x="196" y="114" textAnchor="middle" fontSize="11" fill={isSunny ? "rgb(88 86 45 / 0.45)" : "rgb(165 162 131 / 0.45)"} style={{ letterSpacing: "0.28em" }}>E</text>
                      </svg>
                    </div>
                    <div className="pointer-events-none absolute inset-0">
                      {[...Array(12)].map((_, i) => (
                        <span
                          key={`grain-${i}`}
                          className="absolute text-[0.85rem] opacity-25"
                          style={{
                            left: `${9 + (i % 6) * 16}%`,
                            top: `${14 + Math.floor(i / 3) * 18}%`,
                            color: isSunny ? "#8c8967" : "#58562d",
                          }}
                        >
                          ✦
                        </span>
                      ))}
                    </div>
                    <div
                      className="mx-auto mt-8 w-fit rounded-full border px-4 py-1 text-center text-[0.65rem] font-light uppercase tracking-[0.4em] [font-family:'Montserrat',var(--font-geist),sans-serif]"
                      style={{
                        borderColor: manuscriptBorder,
                        color: isSunny ? "#58562d" : "#a5a283",
                      }}
                    >
                      [ VOL. 2026 — BARCELONA ]
                    </div>
                  </>
                ) : null}

                <h1
                  className={`${current.isCover ? "mx-auto mt-16 max-w-full text-center text-[4.5rem]" : "max-w-[16ch] text-[2.8rem]"} tracking-tight [font-family:'Charnoir',var(--font-geist),serif]`}
                  style={
                    current.isCover
                      ? {
                          color: isSunny ? "#452821" : "#e5e3d6",
                          textShadow: "1px 1px 0px rgba(0,0,0,0.05)",
                          fontWeight: 700,
                        }
                      : undefined
                  }
                >
                  {current.heading}
                </h1>
                <p
                  className={`${current.isCover ? "mx-auto mt-6 max-w-[56ch] text-center text-[0.85rem] uppercase leading-[2.1] tracking-[0.5em]" : "mt-8 max-w-[58ch] text-[1.1rem] leading-[1.9]"} font-light [font-family:'Montserrat',var(--font-geist),sans-serif]`}
                  style={current.isCover ? { color: isSunny ? "#58562d" : "#a5a283" } : undefined}
                >
                  {current.body}
                </p>

                {current.footer ? (
                  <p
                    className={`${current.isCover ? "mt-44 text-center text-[0.95rem] not-italic uppercase tracking-[0.2em]" : "mt-10 text-[1rem] italic"} font-light [font-family:'Montserrat',var(--font-geist),sans-serif]`}
                    style={current.isCover ? { color: isSunny ? "#452821" : "#e5e3d6" } : undefined}
                  >
                    {current.isCover ? "Tap to Open the Vault" : current.footer}
                  </p>
                ) : null}

                <div className="mt-12 flex items-center justify-between text-[0.74rem] uppercase tracking-[0.3em] opacity-70 [font-family:'Montserrat',var(--font-geist),sans-serif]">
                  <span>{current.isCover ? "" : "Tap right next · left previous"}</span>
                  <span />
                </div>
            </motion.article>
          </div>
        </div>
      </div>
    </main>
  );
}

