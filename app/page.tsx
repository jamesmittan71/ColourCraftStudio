import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";
import { brands, services, testimonials } from "@/lib/site-data";

export default function HomePage() {
  return (
    <div className="pb-24">
      <section className="mx-auto grid w-full max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[1.2fr_0.8fr] lg:px-10 lg:py-24">
        <div className="flex flex-col justify-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.32em] text-[var(--accent)]">
            Hermanus · Walker Bay · Western Cape
          </p>
          <h1 className="max-w-3xl text-5xl font-semibold tracking-[-0.05em] text-balance sm:text-6xl lg:text-7xl">
            Colour Expertise. Premium Finishes.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--muted)] sm:text-xl">
            Colour Craft Studio curates luxury paint systems, confident colour
            palettes, and boutique project support for homeowners, decorators,
            and premium contractors across the Overberg.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/contact#booking"
              className="inline-flex items-center justify-center rounded-full bg-[var(--accent)] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[var(--accent-strong)]"
            >
              Book Colour Consultation
            </Link>
            <Link
              href="/brands"
              className="inline-flex items-center justify-center rounded-full border border-[var(--border)] bg-white/70 px-7 py-3.5 text-sm font-semibold backdrop-blur transition hover:border-[var(--accent)]"
            >
              Explore Our Brands
            </Link>
          </div>
          <dl className="mt-12 grid gap-6 sm:grid-cols-3">
            {[
              ["6", "premium supplier partners"],
              ["48h", "quote response target"],
              ["1:1", "designer-led consultation"],
            ].map(([value, label]) => (
              <div key={label} className="rounded-3xl border border-[var(--border)] bg-white/70 p-6 backdrop-blur">
                <dt className="text-sm uppercase tracking-[0.24em] text-[var(--muted)]">
                  {label}
                </dt>
                <dd className="mt-3 text-3xl font-semibold tracking-[-0.04em]">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="rounded-[2rem] border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(239,232,223,0.95))] p-4 shadow-[0_24px_80px_rgba(22,22,22,0.08)]">
          <div className="rounded-[1.6rem] border border-black/5 bg-[#f9f7f3] p-5">
            <Image
              src="/hero-studio.svg"
              alt="Abstract premium interior palette for Colour Craft Studio"
              width={800}
              height={960}
              className="w-full rounded-[1.25rem]"
              priority
            />
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {[
                "Luxury residential specification",
                "Decorator & contractor account support",
                "Low-VOC and exterior durability guidance",
              ].map((item) => (
                <div key={item} className="rounded-2xl bg-white p-4 text-sm leading-6 text-[var(--muted)]">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 py-10 lg:px-10">
        <SectionHeading
          eyebrow="Featured brands"
          title="A considered edit of trusted premium paint partners."
          description="Our supplier mix balances architectural performance, artisan finishes, eco-conscious options, and broad colour confidence for coastal homes."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {brands.map((brand) => (
            <article
              key={brand.slug}
              className="rounded-[1.75rem] border border-[var(--border)] bg-white/75 p-6 backdrop-blur transition hover:-translate-y-0.5 hover:shadow-[0_20px_40px_rgba(22,22,22,0.06)]"
            >
              <p className="text-2xl font-semibold tracking-[0.08em]">{brand.logoText}</p>
              <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
                {brand.description}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {brand.paintTypes.map((type) => (
                  <span
                    key={type}
                    className="rounded-full bg-[var(--surface)] px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-[var(--accent-strong)]"
                  >
                    {type}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 py-16 lg:px-10">
        <SectionHeading
          eyebrow="Why clients choose us"
          title="Minimalist service, deeply practical project support."
          description="Every interaction is designed to remove decision fatigue and raise finish quality from first shortlist to final coat."
        />
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {services.slice(0, 3).map((service) => (
            <article
              key={service.slug}
              className="rounded-[1.75rem] border border-[var(--border)] bg-white p-7 shadow-[0_10px_30px_rgba(22,22,22,0.04)]"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[var(--accent)]">
                {service.icon}
              </p>
              <h2 className="mt-4 text-2xl font-semibold tracking-[-0.04em]">
                {service.title}
              </h2>
              <p className="mt-4 text-base leading-7 text-[var(--muted)]">
                {service.description}
              </p>
              <Link
                href={service.href}
                className="mt-6 inline-flex text-sm font-semibold text-[var(--accent)]"
              >
                {service.cta} →
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid gap-8 rounded-[2rem] border border-[var(--border)] bg-white/80 p-8 backdrop-blur lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionHeading
              eyebrow="Client confidence"
              title="Trusted by discerning homeowners and specification-led teams."
              description="A calm, high-touch process that respects timelines, finishes, and the realities of coastal living."
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {testimonials.map((testimonial) => (
              <blockquote
                key={testimonial.name}
                className="rounded-[1.5rem] bg-[var(--surface)] p-6"
              >
                <p className="text-lg leading-8 tracking-[-0.02em]">
                  “{testimonial.quote}”
                </p>
                <footer className="mt-5 text-sm text-[var(--muted)]">
                  <span className="font-semibold text-[var(--foreground)]">
                    {testimonial.name}
                  </span>
                  <span> · {testimonial.role}</span>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 py-10 lg:px-10">
        <div className="rounded-[2rem] bg-[var(--accent-strong)] px-8 py-10 text-white">
          <p className="text-sm uppercase tracking-[0.28em] text-white/70">
            Ready to begin?
          </p>
          <div className="mt-4 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className="text-3xl font-semibold tracking-[-0.05em] sm:text-4xl">
                Specify the right palette, finish, and coating system from the start.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-white/75">
                Share your project brief and we’ll recommend premium products,
                finishes, and a practical consultation path.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-[var(--accent-strong)]"
            >
              Start Your Enquiry
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
