import type { Metadata } from "next";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Colour Craft Studio’s luxury paint expertise, local Hermanus perspective, and specification-led service approach.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-16 lg:px-10">
      <SectionHeading
        eyebrow="About us"
        title="Colour Craft Studio brings boutique paint knowledge to the Hermanus coast."
        description="We’re built for clients who want elegant finishes, calm decision-making, and practical answers about products, colours, and coastal durability."
        as="h1"
      />
      <div className="mt-10 space-y-8 rounded-[2rem] border border-[var(--border)] bg-white p-8 text-base leading-8 text-[var(--muted)] shadow-[0_10px_30px_rgba(22,22,22,0.04)]">
        <p>
          Colour Craft Studio was created for the way premium homes are actually
          designed and delivered in Hermanus: collaboratively, carefully, and
          with a high sensitivity to light, materiality, and long-term
          performance. Our team helps clients cut through overwhelming paint
          choices and move quickly toward palettes that feel tailored and calm.
        </p>
        <p>
          Our consultations combine local coastal knowledge with trusted supplier
          relationships. That means stronger guidance on finishes, maintenance,
          substrate preparation, and the differences between premium interior,
          exterior, decorative, and eco-focused systems.
        </p>
        <p>
          Whether you are refreshing a weekend residence, preparing a showhouse,
          or specifying coatings across a luxury build, Colour Craft Studio acts
          as both supplier and advisor—bringing clarity from mood board to final
          delivery.
        </p>
        <div className="grid gap-5 md:grid-cols-2">
          <article className="rounded-[1.5rem] bg-[var(--surface)] p-6">
            <h2 className="text-xl font-semibold tracking-[-0.03em] text-[var(--foreground)]">
              Team credentials
            </h2>
            <p className="mt-3">
              Colour-led consultations, product specification support, and
              premium brand sourcing tailored to decorators, architects, and
              site teams.
            </p>
          </article>
          <article className="rounded-[1.5rem] bg-[var(--surface)] p-6">
            <h2 className="text-xl font-semibold tracking-[-0.03em] text-[var(--foreground)]">
              Local insight
            </h2>
            <p className="mt-3">
              Coastal exposure, Hermanus light quality, and local project
              timelines all shape our recommendations and service model.
            </p>
          </article>
        </div>
        <div>
          <h2 className="text-2xl font-semibold tracking-[-0.04em] text-[var(--foreground)]">
            Why choose us
          </h2>
          <ul className="mt-4 space-y-2">
            <li>• Premium, specification-ready supplier curation</li>
            <li>• High-touch colour guidance for luxury residential spaces</li>
            <li>• Practical contractor and decorator coordination</li>
            <li>• A local Hermanus perspective on maintenance and durability</li>
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-semibold tracking-[-0.04em] text-[var(--foreground)]">
            Community
          </h2>
          <p className="mt-4">
            We prioritise local relationships, design collaboration, and
            responsibly specified finishes that support better homes across
            Walker Bay and the Overberg.
          </p>
        </div>
      </div>
    </div>
  );
}
