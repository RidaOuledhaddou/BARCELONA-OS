import { FooterFloatingControls } from "../../_components/FooterFloatingControls";
import { GoldStandardFooter } from "../../_components/GoldStandardFooter";
import { Navbar } from "../../../components/layout/navbar";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar variant="marketing" />
      <div className="px-5 pb-32 pt-20 sm:px-8 md:pt-24">
        {children}
        <GoldStandardFooter />
      </div>
      <FooterFloatingControls
        showLanguageToggle={false}
        showScrollToTop={true}
      />
    </>
  );
}
