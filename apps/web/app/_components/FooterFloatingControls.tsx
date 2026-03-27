"use client";

import { LanguageToggle } from "./LanguageToggle";
import { ScrollToTopButton } from "./ScrollToTopButton";

export function FooterFloatingControls({
  showScrollToTop = true,
  showLanguageToggle = true,
}: {
  showScrollToTop?: boolean;
  showLanguageToggle?: boolean;
}) {
  return (
    <>
      {showScrollToTop ? (
        <div className="pointer-events-none fixed bottom-[92px] left-3 z-40 md:bottom-6 md:left-6">
          <div className="pointer-events-auto">
            <ScrollToTopButton />
          </div>
        </div>
      ) : null}
      {showLanguageToggle ? (
        <div className="pointer-events-none fixed bottom-[92px] right-3 z-40 md:bottom-6 md:right-6">
          <div className="pointer-events-auto">
            <LanguageToggle />
          </div>
        </div>
      ) : null}
    </>
  );
}
