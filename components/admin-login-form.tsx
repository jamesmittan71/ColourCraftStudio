"use client";

import { useState } from "react";

export function AdminLoginForm({
  hasConfiguredSecret,
}: {
  hasConfiguredSecret: boolean;
}) {
  const [status, setStatus] = useState(
    hasConfiguredSecret ? "" : "Set ADMIN_SECRET before using the admin dashboard.",
  );
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(formData: FormData) {
    setSubmitting(true);
    setStatus("");

    try {
      const response = await fetch("/api/admin/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ secret: formData.get("secret") }),
      });
      const result = await response.json();
      setStatus(result.message ?? "Access updated.");

      if (response.ok) {
        window.location.reload();
      }
    } catch {
      setStatus("Unable to sign in right now. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="mt-8 rounded-[2rem] border border-[var(--border)] bg-white p-8 shadow-[0_10px_30px_rgba(22,22,22,0.04)]">
      <p className="text-base leading-8 text-[var(--muted)]">
        Enter the value configured in
        {" "}
        <code className="rounded bg-[var(--surface)] px-2 py-1 text-sm">
          ADMIN_SECRET
        </code>
        {" "}
        to create a secure, cookie-backed admin session.
      </p>
      <form action={handleSubmit} className="mt-6 flex flex-col gap-4 sm:flex-row">
        <input
          required
          type="password"
          name="secret"
          placeholder="Admin key"
          className="min-w-0 flex-1 rounded-full border border-[var(--border)] px-4 py-3 text-sm"
        />
        <button
          type="submit"
          disabled={!hasConfiguredSecret || submitting}
          className="rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white disabled:opacity-60"
        >
          {submitting ? "Signing in..." : "Access dashboard"}
        </button>
      </form>
      {status ? <p className="mt-4 text-sm text-[var(--muted)]">{status}</p> : null}
    </section>
  );
}
