"use client";

import { useState } from "react";

export function AdminPortfolioForm() {
  const [status, setStatus] = useState("");

  async function handleSubmit(formData: FormData) {
    try {
      const payload = {
        slug: formData.get("slug"),
        title: formData.get("title"),
        roomType: formData.get("roomType"),
        description: formData.get("description"),
        image: formData.get("image"),
        imageAlt: formData.get("imageAlt"),
        coloursUsed: String(formData.get("coloursUsed") ?? "")
          .split(",")
          .map((colour) => colour.trim())
          .filter(Boolean),
      };

      const response = await fetch("/api/admin/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      setStatus(result.message ?? "Saved.");
    } catch {
      setStatus("Unable to save portfolio entry right now. Please try again.");
    }
  }

  return (
    <section className="rounded-[2rem] border border-[var(--border)] bg-white p-8 shadow-[0_10px_30px_rgba(22,22,22,0.04)]">
      <h2 className="text-3xl font-semibold tracking-[-0.05em]">
        Manage portfolio gallery
      </h2>
      <p className="mt-4 text-base leading-7 text-[var(--muted)]">
        Add or update a gallery item by reusing its slug. Uploaded image paths
        can point to files you add under the public folder.
      </p>
      <form action={handleSubmit} className="mt-8 grid gap-4">
        {[
          ["slug", "Slug"],
          ["title", "Project title"],
          ["roomType", "Room type"],
          ["image", "Image path e.g. /portfolio-lounge.svg"],
          ["imageAlt", "Image alt text"],
          ["coloursUsed", "Comma-separated colours used"],
        ].map(([name, label]) => (
          <input
            key={name}
            required
            name={name}
            placeholder={label}
            className="rounded-[1.2rem] border border-[var(--border)] px-4 py-3.5 text-sm"
          />
        ))}
        <textarea
          required
          name="description"
          placeholder="Project description"
          rows={5}
          className="rounded-[1.2rem] border border-[var(--border)] px-4 py-3.5 text-sm"
        />
        <div className="flex items-center gap-4">
          <button
            type="submit"
            className="rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-white"
          >
            Save portfolio entry
          </button>
          {status ? <p className="text-sm text-[var(--muted)]">{status}</p> : null}
        </div>
      </form>
    </section>
  );
}
