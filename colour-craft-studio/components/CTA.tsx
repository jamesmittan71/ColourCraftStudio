import Link from 'next/link';

interface CTAProps {
  title: string;
  subtitle?: string;
  ctaLabel: string;
  ctaHref: string;
  dark?: boolean;
}

export default function CTA({ title, subtitle, ctaLabel, ctaHref, dark = false }: CTAProps) {
  return (
    <section className={`py-20 ${dark ? 'bg-gray-900' : 'bg-blue-600'}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white">{title}</h2>
        {subtitle && <p className="mt-4 text-lg text-white/80">{subtitle}</p>}
        <Link
          href={ctaHref}
          className={`mt-8 inline-block px-8 py-3 rounded-lg font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            dark
              ? 'bg-blue-600 text-white hover:bg-blue-500 focus:ring-blue-600'
              : 'bg-white text-blue-600 hover:bg-blue-50 focus:ring-white'
          }`}
        >
          {ctaLabel}
        </Link>
      </div>
    </section>
  );
}
