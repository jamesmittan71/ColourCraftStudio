import type { Metadata } from 'next';
import { initDb, getAllBrands } from '@/lib/db';
import type { Brand } from '@/lib/brands';
import BrandCard from '@/components/BrandCard';
import Hero from '@/components/Hero';
import CTA from '@/components/CTA';

export const metadata: Metadata = {
  title: 'Our Brands',
  description:
    'Discover the premium paint brands stocked by Colour Craft Studio: MIDAS, Dekster, Earthcote, Envirolite, Plascon and Dulux.',
};

export default async function BrandsPage() {
  initDb();
  const brands = getAllBrands() as Brand[];

  return (
    <>
      <Hero
        title="Our Premium Paint Brands"
        subtitle="We partner with South Africa's most trusted paint brands to bring you an unmatched selection of quality finishes."
        ctaLabel="View All Products"
        ctaHref="/products"
      />

      <section className="pb-24 bg-white" aria-labelledby="brands-list-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="brands-list-heading" className="sr-only">
            Brand list
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {brands.map((brand) => (
              <BrandCard key={brand.id} brand={brand} />
            ))}
          </div>
        </div>
      </section>

      <CTA
        title="Not sure which brand is right for you?"
        subtitle="Book a free colour consultation and our experts will guide you to the perfect product."
        ctaLabel="Book Consultation"
        ctaHref="/contact"
      />
    </>
  );
}
