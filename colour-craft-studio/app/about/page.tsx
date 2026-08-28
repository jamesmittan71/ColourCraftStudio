import type { Metadata } from 'next';
import Hero from '@/components/Hero';
import CTA from '@/components/CTA';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about Colour Craft Studio — a premium paint supplier and colour consultancy rooted in Hermanus, Western Cape.',
};

const VALUES = [
  { title: 'Quality First', description: 'We stock only products we believe in and recommend them with confidence.' },
  { title: 'Expert Knowledge', description: 'Our team has decades of combined experience in paints, colour and finishes.' },
  { title: 'Local Commitment', description: "We're proudly rooted in Hermanus and invested in our community's growth." },
  { title: 'Sustainability', description: 'We champion low-VOC and eco-friendly products wherever possible.' },
];

const WHY_US = [
  'Curated selection of South Africa\'s finest paint brands',
  'Personalised colour consultation — not just product sales',
  'Deep knowledge of coastal and semi-arid climate requirements',
  'Trade accounts and contractor support for professionals',
];

export default function AboutPage() {
  return (
    <>
      <Hero
        title="About Colour Craft Studio"
        subtitle="Rooted in Hermanus. Trusted by homeowners, decorators and contractors across the Walkerbay."
      />

      {/* Story */}
      <section className="pb-20 bg-white" aria-labelledby="story-heading">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="story-heading" className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
            Our Story
          </h2>
          <div className="space-y-5 text-gray-600 leading-relaxed">
            <p>
              Colour Craft Studio was born from a simple belief: that choosing the right paint should be an inspiring experience, not a daunting one. Situated in the heart of Hermanus &mdash; one of South Africa&apos;s most beautiful coastal towns &mdash; we set out to create a destination for homeowners and professionals who demand the very best in colour and quality.
            </p>
            <p>
              From day one we&apos;ve partnered with South Africa&apos;s most respected paint brands, including Plascon, Dulux, MIDAS, Dekster, Earthcote and Envirolite. Each brand was hand-selected not only for product quality but for the breadth and innovation of their colour ranges.
            </p>
            <p>
              Today, our team of colour specialists serves a growing community of discerning homeowners, interior decorators and building contractors who appreciate expert advice, premium products and the kind of personal service you simply can&apos;t get from a big-box store.
            </p>
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="py-16 bg-gray-50" aria-labelledby="why-heading">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="why-heading" className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">
            Why Choose Us
          </h2>
          <ul className="space-y-4">
            {WHY_US.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-1 h-5 w-5 shrink-0 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold" aria-hidden="true">
                  ✓
                </span>
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-white" aria-labelledby="values-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="values-heading" className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-10">
            Our Values
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((v) => (
              <div key={v.title} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <h3 className="font-semibold text-gray-900 mb-2">{v.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA
        title="Let's work together"
        subtitle="Whether you're a homeowner, decorator or contractor — we'd love to hear from you."
        ctaLabel="Get in Touch"
        ctaHref="/contact"
      />
    </>
  );
}
