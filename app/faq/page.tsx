import type { Metadata } from "next";
import { SectionHeading } from "@/components/section-heading";
import { faqs } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Find answers about Colour Craft Studio’s consultation process, paint selection, delivery, brand comparisons, and bookings.",
};

export default function FaqPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-16 lg:px-10">
      <SectionHeading
        eyebrow="Frequently asked questions"
        title="Clear answers, without the usual paint-industry clutter."
        description="Everything from colour consultations to delivery logistics and premium brand comparisons."
      />
      <div className="mt-10 space-y-4">
        {faqs.map((faq) => (
          <details
            key={faq.question}
            className="rounded-[1.5rem] border border-[var(--border)] bg-white p-6 shadow-[0_10px_30px_rgba(22,22,22,0.04)]"
          >
            <summary className="cursor-pointer list-none text-lg font-semibold tracking-[-0.03em]">
              {faq.question}
            </summary>
            <p className="mt-4 text-base leading-8 text-[var(--muted)]">
              {faq.answer}
            </p>
          </details>
        ))}
      </div>
    </div>
  );
}
