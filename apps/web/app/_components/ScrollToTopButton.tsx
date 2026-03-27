"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 220);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <button
      type="button"
      aria-label="Scroll to top"
      onClick={() => {
        setVisible(false);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      className="gold-ring flex h-10 w-10 items-center justify-center rounded-full border border-[rgb(var(--stroke-rgb)/var(--stroke-alpha))] bg-[radial-gradient(circle_at_30%_30%,rgb(var(--secondary-rgb)/0.24),rgb(var(--surface-rgb)/var(--surface-alpha)),rgba(0,0,0,0))] text-[rgb(var(--secondary-rgb))] backdrop-blur-xl transition hover:-translate-y-1 md:h-11 md:w-11"
    >
      <ArrowUp className="h-4 w-4" />
    </button>
  );
}
