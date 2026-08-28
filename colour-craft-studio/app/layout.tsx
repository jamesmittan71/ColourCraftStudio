import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './globals.css';

export const metadata: Metadata = {
  title: {
    template: '%s | Colour Craft Studio',
    default: 'Colour Craft Studio – Premium Paint Supply & Colour Consultation, Hermanus',
  },
  description:
    'Specialist paint supply and colour consultation for homeowners, decorators and contractors in Hermanus, Western Cape. Stockists of MIDAS, Dekster, Earthcote, Envirolite, Plascon and Dulux.',
  metadataBase: new URL('https://www.colourcraftstudio.co.za'),
  openGraph: {
    siteName: 'Colour Craft Studio',
    locale: 'en_ZA',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Inter via Google Fonts — loads at runtime, gracefully degrades to system-ui */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-white text-gray-900 antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
