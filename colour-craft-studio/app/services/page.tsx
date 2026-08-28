import type { Metadata } from 'next';
import Link from 'next/link';
import Hero from '@/components/Hero';
import CTA from '@/components/CTA';

export const metadata: Metadata = {
  title: 'Our Services',
  description:
    'Colour Craft Studio offers colour consultation, paint supply & delivery, contractor partnerships and professional application guidance in Hermanus.',
};

const SERVICES = [
  {
    icon: '🎨',
    title: 'Colour Consultation',
    description:
      'Work with our colour specialists to choose the perfect palette for your space. We consider lighting, architecture, furnishings and your personal style to arrive at a colour scheme you\'ll love for years.',
    cta: 'Book a Consultation',
    href: '/contact',
  },
  {
    icon: '🚚',
    title: 'Paint Supply & Delivery',
    description:
      'Premium paint supply from trusted international and local brands. We offer delivery throughout the Hermanus and Walkerbay area so your project stays on schedule.',
    cta: 'Browse Products',
    href: '/products',
  },
  {
    icon: '🤝',
    title: 'Contractor Partnerships',
    description:
      'Dedicated support for interior decorators and building contractors. Enjoy trade pricing, priority stock allocation, and a dedicated account manager for your business.',
    cta: 'Become a Partner',
    href: '/contact',
  },
  {
    icon: '📚',
    title: 'Application Guidance',
    description:
      'Not sure how to achieve a particular finish? Our team provides professional guidance on surface preparation, primer selection and application techniques for flawless results.',
    cta: 'Ask Our Experts',
    href: '/contact',
  },
];

export default function ServicesPage() {
  return (
    <>
      <Hero
        title="Our Services"
        subtitle="From colour selection to delivery and contractor support — we make your painting project seamless."
      />

      <section className="pb-24 bg-white" aria-labelledby="services-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="services-heading" className="sr-only">Service list</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {SERVICES.map((s) => (
              <article
                key={s.title}
                className="bg-white rounded-2xl border border-gray-100 p-8 flex flex-col gap-4 hover:shadow-md transition-shadow"
              >
                <span className="text-4xl" aria-hidden="true">{s.icon}</span>
                <h3 className="text-xl font-semibold text-gray-900">{s.title}</h3>
                <p className="text-gray-500 leading-relaxed flex-1">{s.description}</p>
                <Link
                  href={s.href}
                  className="inline-block px-6 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 self-start"
                >
                  {s.cta}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTA
        title="Ready to get started?"
        subtitle="Contact us today and let's bring your vision to life."
        ctaLabel="Contact Us"
        ctaHref="/contact"
      />
    </>
  );
}
