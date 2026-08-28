import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const siteUrl = "https://www.colourcraftstudio.co.za";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Colour Craft Studio | Premium Paint Supplier in Hermanus",
    template: "%s | Colour Craft Studio",
  },
  description:
    "Premium paint supply, colour consultancy, and project support for luxury homes and contractors in Hermanus and Walker Bay.",
  keywords: [
    "Colour Craft Studio",
    "paint supplier Hermanus",
    "colour consultation Walker Bay",
    "luxury paint finishes South Africa",
    "premium paint Hermanus",
  ],
  openGraph: {
    title: "Colour Craft Studio",
    description:
      "Colour expertise, premium finishes, and boutique project support in Hermanus, South Africa.",
    url: siteUrl,
    siteName: "Colour Craft Studio",
    locale: "en_ZA",
    type: "website",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Colour Craft Studio premium paint and colour consultancy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Colour Craft Studio",
    description:
      "Premium paint supply and colour consultancy for Hermanus homes, decorators, and contractors.",
    images: ["/og-image.svg"],
  },
  alternates: {
    canonical: siteUrl,
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Colour Craft Studio",
  image: `${siteUrl}/og-image.svg`,
  url: siteUrl,
  telephone: "+27-28-312-1450",
  email: "hello@colourcraftstudio.co.za",
  description:
    "Premium paint retailer and colour consultancy serving Hermanus, Walker Bay, and the Overberg.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Hermanus",
    addressRegion: "Western Cape",
    postalCode: "7200",
    addressCountry: "ZA",
  },
  areaServed: ["Hermanus", "Walker Bay", "Overberg", "Western Cape"],
  openingHours: "Mo-Fr 08:00-17:00, Sa 09:00-13:00",
  sameAs: [
    "https://www.instagram.com/",
    "https://www.facebook.com/",
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-ZA" className="h-full scroll-smooth antialiased">
      <body className="min-h-full bg-[var(--background)] text-[var(--foreground)]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
