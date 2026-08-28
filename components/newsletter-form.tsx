"use client";

import { useState } from "react";

export function NewsletterForm() {
  const [status, setStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(formData: FormData) {
    setSubmitting(true);
    setStatus("");
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.get("email") }),
      });
      const result = await response.json();
      setStatus(result.message ?? "Subscribed.");
    } catch {
      setStatus("Unable to subscribe right now. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="rounded-[1.5rem] border border-[var(--border)] bg-white p-5">
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">
        Newsletter
      </p>
      <p className="mt-3 text-base leading-7 text-[var(--muted)]">
        Receive colour trend notes, supplier updates, and luxury project advice.
      </p>
      <form action={handleSubmit} className="mt-4 flex flex-col gap-3 sm:flex-row">
        <input
          required
          type="email"
          name="email"
          placeholder="Your email address"
          className="min-w-0 flex-1 rounded-full border border-[var(--border)] px-4 py-3 text-sm"
        />
        <button
          type="submit"
          disabled={submitting}
          className="rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white disabled:opacity-60"
        >
          {submitting ? "Joining..." : "Subscribe"}
        </button>
      </form>
      {status ? <p className="mt-3 text-sm text-[var(--muted)]">{status}</p> : null}
    </div>
  );
}
