import { FooterFloatingControls } from "../../_components/FooterFloatingControls";
import { GoldStandardFooter } from "../../_components/GoldStandardFooter";
import { Navbar } from "../../../components/layout/navbar";
import { DashboardPersonaSurface } from "../../../components/layout/dashboard-persona-surface";

export default function DashboardsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar variant="dashboard" />
      <div className="px-5 pb-32 pt-20 sm:px-8 md:pt-24">
        <DashboardPersonaSurface>{children}</DashboardPersonaSurface>
        <GoldStandardFooter />
      </div>
      <FooterFloatingControls
        showLanguageToggle={false}
        showScrollToTop={false}
      />
    </>
  );
}
