type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
  as?: "h1" | "h2";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  as: Tag = "h2",
}: SectionHeadingProps) {
  return (
    <div className="max-w-3xl">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[var(--accent)]">
        {eyebrow}
      </p>
      <Tag className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-balance sm:text-5xl">
        {title}
      </Tag>
      <p className="mt-5 text-lg leading-8 text-[var(--muted)]">{description}</p>
    </div>
  );
}
