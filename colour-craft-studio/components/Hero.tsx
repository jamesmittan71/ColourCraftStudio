import Link from 'next/link';

interface HeroProps {
  title: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  centered?: boolean;
}

export default function Hero({
  title,
  subtitle,
  ctaLabel,
  ctaHref = '/contact',
  secondaryCtaLabel,
  secondaryCtaHref,
  centered = true,
}: HeroProps) {
  return (
    <section className="pt-24 pb-16 sm:pt-32 sm:pb-24 bg-white">
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${centered ? 'text-center' : ''}`}>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-6 text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        )}
        {(ctaLabel || secondaryCtaLabel) && (
          <div className={`mt-10 flex flex-col sm:flex-row gap-4 ${centered ? 'justify-center' : ''}`}>
            {ctaLabel && (
              <Link
                href={ctaHref}
                className="px-8 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
              >
                {ctaLabel}
              </Link>
            )}
            {secondaryCtaLabel && secondaryCtaHref && (
              <Link
                href={secondaryCtaHref}
                className="px-8 py-3 rounded-lg border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
              >
                {secondaryCtaLabel}
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
