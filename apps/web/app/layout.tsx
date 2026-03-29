import "./globals.css";
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { ThemeProvider } from "./theme-provider";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

export const metadata: Metadata = {
  title: "Royale One",
  description:
    "Royale One — Barcelona-rooted concierge for mobility, stays, and executive clarity.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className="midnight">
      <body className={geist.variable}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
