import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { FooterFloatingControls } from "../_components/FooterFloatingControls";
import { GoldStandardFooter } from "../_components/GoldStandardFooter";
import { Navbar } from "../../components/layout/navbar";
import { routing } from "../../i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <Navbar />
      <div className="px-5 pb-32 pt-20 sm:px-8 md:pt-24">
        {children}
        <GoldStandardFooter />
      </div>
      <FooterFloatingControls showLanguageToggle={false} />
    </NextIntlClientProvider>
  );
}
