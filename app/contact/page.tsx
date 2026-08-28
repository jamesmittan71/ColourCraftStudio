import type { Metadata } from "next";
import { InquiryForm } from "@/components/inquiry-form";
import { SectionHeading } from "@/components/section-heading";
import { firstParam } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Colour Craft Studio to request a quote, book a colour consultation, or discuss premium paint supply in Hermanus.",
};

type PageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function ContactPage({ searchParams }: PageProps) {
  const params = searchParams ? await searchParams : {};
  const requestedService = firstParam(params.service) ?? "";
  const requestedProduct = firstParam(params.product) ?? "";

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-16 lg:px-10">
      <SectionHeading
        eyebrow="Contact"
        title="Let’s plan your next finish with clarity."
        description="Use the enquiry form for quotes and product guidance, or book a dedicated colour consultation with a preferred appointment window."
      />
      <div className="mt-10 grid gap-8 xl:grid-cols-[0.9fr_1.1fr]">
        <aside className="space-y-6 rounded-[2rem] border border-[var(--border)] bg-white p-8 shadow-[0_10px_30px_rgba(22,22,22,0.04)]">
          <div>
            <h2 className="text-2xl font-semibold tracking-[-0.04em]">
              Studio details
            </h2>
            <dl className="mt-5 space-y-4 text-base leading-7 text-[var(--muted)]">
              <div>
                <dt className="font-semibold text-[var(--foreground)]">Location</dt>
                <dd>Hermanus, Walker Bay, Western Cape, South Africa</dd>
              </div>
              <div>
                <dt className="font-semibold text-[var(--foreground)]">Email</dt>
                <dd>hello@colourcraftstudio.co.za</dd>
              </div>
              <div>
                <dt className="font-semibold text-[var(--foreground)]">Phone</dt>
                <dd>+27 (0) 28 312 1450</dd>
              </div>
              <div>
                <dt className="font-semibold text-[var(--foreground)]">Hours</dt>
                <dd>Mon–Fri 08:00–17:00 · Sat 09:00–13:00</dd>
              </div>
            </dl>
          </div>
          <div className="rounded-[1.5rem] overflow-hidden border border-[var(--border)]">
            <iframe
              title="Colour Craft Studio Hermanus map"
              src="https://www.google.com/maps?q=Hermanus%20Western%20Cape&output=embed"
              className="h-72 w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="rounded-[1.5rem] bg-[var(--surface)] p-6 text-sm leading-7 text-[var(--muted)]">
            Follow our latest palettes and project inspiration on
            {" "}
            <a className="font-semibold text-[var(--accent)]" href="https://www.instagram.com/" target="_blank" rel="noreferrer">
              Instagram
            </a>
            {" "}
            and
            {" "}
            <a className="font-semibold text-[var(--accent)]" href="https://www.facebook.com/" target="_blank" rel="noreferrer">
              Facebook
            </a>
            .
          </div>
        </aside>

        <div className="space-y-8">
          <InquiryForm
            endpoint="/api/contact"
            title="General enquiry / quote request"
            description="Share your brief, room type, product interests, or delivery needs and we’ll follow up within 48 hours."
            submitLabel="Send enquiry"
            defaultService={requestedService || "General enquiry"}
            defaultMessage={
              requestedProduct
                ? `I would like a quote for ${requestedProduct}.`
                : ""
            }
          />
          <div id="booking">
            <InquiryForm
              endpoint="/api/bookings"
              title="Book colour consultation"
              description="Tell us your preferred date, time, and property context. We’ll confirm availability and send your booking details."
              submitLabel="Request consultation"
              defaultService="Colour consultation"
              isBooking
            />
          </div>
        </div>
      </div>
    </div>
  );
}
