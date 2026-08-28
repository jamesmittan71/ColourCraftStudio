import Link from 'next/link';
import {
  BUSINESS_ADDRESS_FULL,
  BUSINESS_EMAIL,
  BUSINESS_PHONE,
  BUSINESS_PHONE_TEL,
} from '@/lib/constants';

const SOCIAL_LINKS = [
  { href: 'https://facebook.com/colourcraftstudio', label: 'Facebook' },
  { href: 'https://instagram.com/colourcraftstudio', label: 'Instagram' },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <p className="text-white font-bold tracking-widest uppercase text-sm mb-3">
            Colour Craft Studio
          </p>
          <p className="text-sm leading-relaxed text-gray-400">
            Premium paint supply &amp; colour consultation in Hermanus, Western Cape.
          </p>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            {[
              { href: '/brands', label: 'Our Brands' },
              { href: '/products', label: 'Products' },
              { href: '/services', label: 'Services' },
              { href: '/portfolio', label: 'Portfolio' },
              { href: '/about', label: 'About Us' },
              { href: '/contact', label: 'Contact' },
            ].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-white transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">Contact</h3>
          <address className="not-italic space-y-2 text-sm text-gray-400">
            <p>{BUSINESS_ADDRESS_FULL}</p>
            <p>
              <a href={`tel:${BUSINESS_PHONE_TEL}`} className="hover:text-white transition-colors">
                {BUSINESS_PHONE}
              </a>
            </p>
            <p>
              <a href={`mailto:${BUSINESS_EMAIL}`} className="hover:text-white transition-colors">
                {BUSINESS_EMAIL}
              </a>
            </p>
            <p className="pt-1">
              Mon–Thu: 7:00 AM – 4:30 PM<br />
              Fri: 7:00 AM – 3:00 PM<br />
              Sat: 7:30 AM – 12:00 PM<br />
              Sun: Closed
            </p>
            <div className="flex gap-4 pt-2">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </address>
        </div>
      </div>

      <div className="border-t border-gray-800 py-4 text-center text-xs text-gray-500">
        &copy; {new Date().getFullYear()} Colour Craft Studio. All rights reserved.
      </div>
    </footer>
  );
}
