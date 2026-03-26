"use client";

import { LanguageToggle } from "./LanguageToggle";
import { ScrollToTopButton } from "./ScrollToTopButton";

export function FooterFloatingControls() {
  return (
    <div className="pointer-events-none fixed bottom-[92px] right-3 z-40 flex items-center gap-2 md:bottom-6 md:right-6">
      <div className="pointer-events-auto">
        <ScrollToTopButton />
      </div>
      <div className="pointer-events-auto">
        <LanguageToggle />
      </div>
    </div>
  );
}
