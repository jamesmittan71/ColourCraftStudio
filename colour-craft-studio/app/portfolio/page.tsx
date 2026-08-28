import type { Metadata } from 'next';
import Hero from '@/components/Hero';
import CTA from '@/components/CTA';

export const metadata: Metadata = {
  title: 'Portfolio',
  description:
    'Browse Colour Craft Studio\'s project portfolio — interior and exterior colour transformations across Hermanus and the Walkerbay.',
};

const ROOM_TYPES = ['All', 'Living', 'Bedroom', 'Kitchen', 'Commercial', 'Exterior'] as const;

const PROJECTS = [
  { id: 1, title: 'Coastal Living Room', room: 'Living', colour: '#B2CEDE', brand: 'Plascon', before: null, after: null },
  { id: 2, title: 'Master Bedroom Suite', room: 'Bedroom', colour: '#D8C9AA', brand: 'Dulux', before: null, after: null },
  { id: 3, title: 'Modern Kitchen', room: 'Kitchen', colour: '#E8E8E8', brand: 'Earthcote', before: null, after: null },
  { id: 4, title: 'Boutique Office', room: 'Commercial', colour: '#F0EBE1', brand: 'MIDAS', before: null, after: null },
  { id: 5, title: 'Heritage Exterior', room: 'Exterior', colour: '#C4B49C', brand: 'Dekster', before: null, after: null },
  { id: 6, title: 'Open Plan Living', room: 'Living', colour: '#D4E0C8', brand: 'Envirolite', before: null, after: null },
  { id: 7, title: "Children's Bedroom", room: 'Bedroom', colour: '#F9D5C8', brand: 'Dulux', before: null, after: null },
  { id: 8, title: 'Restaurant Interior', room: 'Commercial', colour: '#8B7355', brand: 'Plascon', before: null, after: null },
  { id: 9, title: 'Coastal Exterior', room: 'Exterior', colour: '#FFFFFF', brand: 'MIDAS', before: null, after: null },
];

export default function PortfolioPage({
  searchParams,
}: {
  searchParams: { room?: string };
}) {
  const activeRoom = searchParams.room ?? 'All';
  const filtered =
    activeRoom === 'All' ? PROJECTS : PROJECTS.filter((p) => p.room === activeRoom);

  return (
    <>
      <Hero
        title="Our Portfolio"
        subtitle="A showcase of colour transformations across the Hermanus area — from intimate bedrooms to bold commercial spaces."
      />

      {/* Filter */}
      <section className="py-6 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap gap-2">
          {ROOM_TYPES.map((room) => (
            <a
              key={room}
              href={room === 'All' ? '/portfolio' : `/portfolio?room=${room}`}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                activeRoom === room
                  ? 'bg-blue-600 text-white'
                  : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              {room}
            </a>
          ))}
        </div>
      </section>

      {/* Gallery grid */}
      <section className="py-12 pb-24 bg-white" aria-labelledby="portfolio-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="portfolio-heading" className="sr-only">Project gallery</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project) => (
              <article
                key={project.id}
                className="group rounded-2xl overflow-hidden border border-gray-100 hover:shadow-md transition-shadow"
              >
                {/* Colour swatch placeholder */}
                <div
                  className="h-48 w-full"
                  style={{ backgroundColor: project.colour }}
                  aria-label={`${project.title} colour swatch`}
                  role="img"
                />
                <div className="p-5">
                  <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
                    {project.room} · {project.brand}
                  </p>
                  <h3 className="text-base font-semibold text-gray-900">{project.title}</h3>
                </div>
              </article>
            ))}
          </div>
          {filtered.length === 0 && (
            <p className="text-gray-500">No projects in this category yet. Check back soon!</p>
          )}
        </div>
      </section>

      <CTA
        title="Inspired? Let's create something beautiful."
        subtitle="Book a consultation and our colour experts will help you plan your next project."
        ctaLabel="Book Consultation"
        ctaHref="/contact"
      />
    </>
  );
}
