import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { CityBackground } from "@/components/city-background";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.ledger-lending.com"),
  title: {
    default: "Ledger & Lending Co. | Accounting, Tax & Commercial Finance",
    template: "%s | Ledger & Lending Co.",
  },
  description:
    "A discreet, premium advisory practice spanning accounting, tax, and commercial finance for business owners across New Zealand.",
  keywords: [
    "accounting",
    "tax",
    "commercial finance",
    "business advisory",
    "IRD",
    "chartered accountant",
    "New Zealand",
  ],
  openGraph: {
    title: "Ledger & Lending Co.",
    description:
      "Accounting, tax and commercial finance in one disciplined advisory practice for business owners across New Zealand.",
    type: "website",
    locale: "en_NZ",
    siteName: "Ledger & Lending Co.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ledger & Lending Co.",
    description:
      "Accounting, tax and commercial finance in one disciplined advisory practice for business owners across New Zealand.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${cormorant.variable} ${jakarta.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <CityBackground />
        <div aria-hidden className="scene-veil" />
        <SiteNav />
        <main id="main" tabIndex={-1} className="relative z-10">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
