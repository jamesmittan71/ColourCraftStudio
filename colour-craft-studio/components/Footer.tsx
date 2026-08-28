import Link from 'next/link';

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
            <p>Hermanus, Western Cape</p>
            <p>South Africa</p>
            <p>
              <a href="tel:+27280000000" className="hover:text-white transition-colors">
                +27 (0)28 000 0000
              </a>
            </p>
            <p>
              <a href="mailto:info@colourcraftstudio.co.za" className="hover:text-white transition-colors">
                info@colourcraftstudio.co.za
              </a>
            </p>
            <p className="pt-1">Mon–Fri: 8:00 – 17:00<br />Sat: 9:00 – 13:00</p>
          </address>
        </div>
      </div>

      <div className="border-t border-gray-800 py-4 text-center text-xs text-gray-500">
        &copy; {new Date().getFullYear()} Colour Craft Studio. All rights reserved.
      </div>
    </footer>
  );
}
