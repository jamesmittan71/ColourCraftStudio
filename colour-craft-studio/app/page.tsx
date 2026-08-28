import Link from 'next/link';
import { initDb, getAllBrands } from '@/lib/db';
import type { Brand } from '@/lib/brands';
import CTA from '@/components/CTA';

const VALUE_PROPS = [
  {
    icon: '🎨',
    title: 'Expert Colour Consultation',
    description:
      'Our colour specialists guide you from concept to completion, helping you choose the perfect palette for any space.',
  },
  {
    icon: '🏆',
    title: 'Premium Paint Brands',
    description:
      'We stock the best: MIDAS, Dekster, Earthcote, Envirolite, Plascon and Dulux — all under one roof.',
  },
  {
    icon: '📍',
    title: 'Local Hermanus Service',
    description:
      'Proudly serving Hermanus and the greater Walkerbay area with personalised, hands-on service.',
  },
];

const TESTIMONIALS = [
  {
    quote:
      'The colour consultation was outstanding. They understood our vision immediately and suggested a palette that completely transformed our home.',
    name: 'Sarah & Mark T.',
    role: 'Homeowners, Hermanus',
  },
  {
    quote:
      'As an interior decorator I rely on consistent quality. Colour Craft Studio is my first call for every project — their product knowledge is second to none.',
    name: 'Liezel van der Berg',
    role: 'Interior Decorator',
  },
  {
    quote:
      'Fast delivery, honest advice, and the best range in the area. My contracting business has never been smoother.',
    name: 'Danie Swart',
    role: 'Building Contractor',
  },
];

export default async function HomePage() {
  initDb();
  const brands = getAllBrands() as Brand[];

  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-20 sm:pt-40 sm:pb-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-4">
            Hermanus · Western Cape · South Africa
          </p>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight tracking-tight text-balance">
            Colour Expertise.<br />Premium Finishes.
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Your trusted partner for specialist paint and colour consultation in Hermanus.
            Serving discerning homeowners, interior decorators and contractors.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-8 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
            >
              Book Consultation
            </Link>
            <Link
              href="/products"
              className="px-8 py-3 rounded-lg border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
            >
              Explore Products
            </Link>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-gray-100" />

      {/* Brands showcase */}
      <section className="py-20 bg-white" aria-labelledby="brands-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            id="brands-heading"
            className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-12"
          >
            Our Premium Paint Brands
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
            {brands.map((brand) => (
              <Link
                key={brand.id}
                href={`/brands`}
                className="group flex flex-col items-center justify-center gap-3 p-8 rounded-2xl border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-200"
              >
                <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center text-xl font-bold text-blue-700">
                  {brand.name.charAt(0)}
                </div>
                <span className="text-sm font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                  {brand.name}
                </span>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/brands"
              className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors"
            >
              View all brands →
            </Link>
          </div>
        </div>
      </section>

      {/* Value props */}
      <section className="py-20 bg-gray-50" aria-labelledby="values-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            id="values-heading"
            className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-12"
          >
            Why Choose Colour Craft Studio?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {VALUE_PROPS.map((vp) => (
              <div
                key={vp.title}
                className="bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-md transition-shadow"
              >
                <span className="text-3xl" aria-hidden="true">{vp.icon}</span>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">{vp.title}</h3>
                <p className="mt-2 text-sm text-gray-500 leading-relaxed">{vp.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white" aria-labelledby="testimonials-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            id="testimonials-heading"
            className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-12"
          >
            What Our Clients Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t) => (
              <figure
                key={t.name}
                className="bg-gray-50 rounded-2xl p-8 flex flex-col gap-4"
              >
                <blockquote className="text-gray-700 leading-relaxed text-sm">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-auto">
                  <p className="font-semibold text-sm text-gray-900">{t.name}</p>
                  <p className="text-xs text-gray-400">{t.role}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTA
        title="Ready to Transform Your Space?"
        subtitle="Browse our full range of premium paints or book a colour consultation with our experts."
        ctaLabel="Explore Our Products"
        ctaHref="/products"
      />
    </>
  );
}

