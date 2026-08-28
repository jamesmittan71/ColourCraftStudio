import type { Metadata } from "next";
import Image from "next/image";
import { SectionHeading } from "@/components/section-heading";
import { getPortfolio } from "@/lib/runtime-data";
import { firstParam } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "View Colour Craft Studio’s curated project gallery for living spaces, kitchens, bedrooms, commercial interiors, and coastal exteriors.",
};

type PageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function PortfolioPage({ searchParams }: PageProps) {
  const params = searchParams ? await searchParams : {};
  const roomType = firstParam(params.room) ?? "all";
  const entries = await getPortfolio();
  const roomTypes = ["all", ...new Set(entries.map((entry) => entry.roomType))];
  const filtered =
    roomType === "all"
      ? entries
      : entries.filter((entry) => entry.roomType === roomType);

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-16 lg:px-10">
      <SectionHeading
        eyebrow="Project gallery"
        title="Before-and-after inspired visuals, organised for quick specification reviews."
        description="A minimalist gallery structure with lazy-loaded images and room-type filtering to support design conversations and client approvals."
      />
      <form className="mt-8 flex flex-wrap items-center gap-4 rounded-[1.5rem] border border-[var(--border)] bg-white/75 p-4 backdrop-blur">
        <label htmlFor="room" className="text-sm font-medium text-[var(--muted)]">
          Filter by room type
        </label>
        <select
          id="room"
          name="room"
          defaultValue={roomType}
          className="min-w-52 rounded-full border border-[var(--border)] bg-white px-4 py-2.5 text-sm"
        >
          {roomTypes.map((option) => (
            <option key={option} value={option}>
              {option === "all" ? "All room types" : option}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-white"
        >
          Apply
        </button>
      </form>

      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((entry, index) => (
          <article
            key={entry.slug}
            className="overflow-hidden rounded-[1.75rem] border border-[var(--border)] bg-white shadow-[0_10px_30px_rgba(22,22,22,0.04)]"
          >
            <Image
              src={entry.image}
              alt={entry.imageAlt}
              width={720}
              height={540}
              className="h-72 w-full object-cover"
              loading={index < 2 ? "eager" : "lazy"}
            />
            <div className="p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">
                {entry.roomType}
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em]">
                {entry.title}
              </h2>
              <p className="mt-4 text-base leading-7 text-[var(--muted)]">
                {entry.description}
              </p>
              <p className="mt-5 text-sm text-[var(--muted)]">
                Colours used:{" "}
                <span className="font-medium text-[var(--foreground)]">
                  {entry.coloursUsed.join(" · ")}
                </span>
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
