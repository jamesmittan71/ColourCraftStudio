"use client";

import { useState } from "react";

type InquiryFormProps = {
  endpoint: string;
  title: string;
  description: string;
  submitLabel: string;
  defaultService?: string;
  defaultMessage?: string;
  isBooking?: boolean;
};

export function InquiryForm({
  endpoint,
  title,
  description,
  submitLabel,
  defaultService = "",
  defaultMessage = "",
  isBooking = false,
}: InquiryFormProps) {
  const [status, setStatus] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(formData: FormData) {
    setSubmitting(true);
    setStatus("");

    const payload = Object.fromEntries(formData.entries());
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    setStatus(result.message ?? "Submission received.");
    setSubmitting(false);

    if (response.ok) {
      const form = document.getElementById(
        `${title.replaceAll(" ", "-").toLowerCase()}-form`,
      ) as HTMLFormElement | null;
      form?.reset();
    }
  }

  return (
    <section className="rounded-[2rem] border border-[var(--border)] bg-white p-8 shadow-[0_10px_30px_rgba(22,22,22,0.04)]">
      <div className="max-w-2xl">
        <h2 className="text-3xl font-semibold tracking-[-0.05em]">{title}</h2>
        <p className="mt-4 text-base leading-7 text-[var(--muted)]">{description}</p>
      </div>
      <form
        id={`${title.replaceAll(" ", "-").toLowerCase()}-form`}
        action={handleSubmit}
        className="mt-8 grid gap-4 md:grid-cols-2"
      >
        <input
          required
          name="name"
          placeholder="Full name"
          className="rounded-[1.2rem] border border-[var(--border)] px-4 py-3.5 text-sm"
        />
        <input
          required
          type="email"
          name="email"
          placeholder="Email address"
          className="rounded-[1.2rem] border border-[var(--border)] px-4 py-3.5 text-sm"
        />
        <input
          name="phone"
          placeholder="Phone number"
          className="rounded-[1.2rem] border border-[var(--border)] px-4 py-3.5 text-sm"
        />
        <input
          name="serviceInterest"
          defaultValue={defaultService}
          placeholder="Service interest"
          className="rounded-[1.2rem] border border-[var(--border)] px-4 py-3.5 text-sm"
        />
        {isBooking ? (
          <>
            <input
              required
              type="date"
              name="appointmentDate"
              className="rounded-[1.2rem] border border-[var(--border)] px-4 py-3.5 text-sm"
            />
            <input
              required
              type="time"
              name="appointmentTime"
              className="rounded-[1.2rem] border border-[var(--border)] px-4 py-3.5 text-sm"
            />
          </>
        ) : null}
        <textarea
          required
          name="message"
          defaultValue={defaultMessage}
          placeholder="Tell us about your project"
          rows={5}
          className="md:col-span-2 rounded-[1.2rem] border border-[var(--border)] px-4 py-3.5 text-sm"
        />
        <div className="md:col-span-2 flex flex-wrap items-center gap-4">
          <button
            type="submit"
            disabled={submitting}
            className="rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-white disabled:opacity-60"
          >
            {submitting ? "Sending..." : submitLabel}
          </button>
          {status ? <p className="text-sm text-[var(--muted)]">{status}</p> : null}
        </div>
      </form>
    </section>
  );
}
