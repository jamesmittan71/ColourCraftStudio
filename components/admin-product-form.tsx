"use client";

import { useState } from "react";

export function AdminProductForm() {
  const [status, setStatus] = useState("");

  async function handleSubmit(formData: FormData) {
    try {
      const payload = {
        slug: formData.get("slug"),
        brand: formData.get("brand"),
        brandSlug: formData.get("brandSlug"),
        name: formData.get("name"),
        line: formData.get("line"),
        paintType: formData.get("paintType"),
        finish: formData.get("finish"),
        description: formData.get("description"),
        priceFrom: formData.get("priceFrom"),
        sortPrice: Number(formData.get("sortPrice")),
        stockStatus: formData.get("stockStatus"),
        swatch: formData.get("swatch"),
        sourceUrl: formData.get("sourceUrl"),
        features: String(formData.get("features") ?? "")
          .split(",")
          .map((feature) => feature.trim())
          .filter(Boolean),
      };

      const response = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      setStatus(result.message ?? "Saved.");
    } catch {
      setStatus("Unable to save product right now. Please try again.");
    }
  }

  return (
    <section className="rounded-[2rem] border border-[var(--border)] bg-white p-8 shadow-[0_10px_30px_rgba(22,22,22,0.04)]">
      <h2 className="text-3xl font-semibold tracking-[-0.05em]">
        Add or update product
      </h2>
      <p className="mt-4 text-base leading-7 text-[var(--muted)]">
        Save a new catalogue item or update an existing one by reusing its slug.
      </p>
      <form action={handleSubmit} className="mt-8 grid gap-4 md:grid-cols-2">
        {[
          ["slug", "Slug"],
          ["brand", "Brand name"],
          ["brandSlug", "Brand slug"],
          ["name", "Product name"],
          ["line", "Product line"],
          ["paintType", "Paint type"],
          ["finish", "Finish"],
          ["priceFrom", "Price display"],
          ["sortPrice", "Sort price number"],
          ["stockStatus", "Stock status"],
          ["swatch", "Swatch hex"],
          ["sourceUrl", "Supplier URL"],
        ].map(([name, label]) => (
          <input
            key={name}
            required={name !== "priceFrom"}
            name={name}
            placeholder={label}
            className="rounded-[1.2rem] border border-[var(--border)] px-4 py-3.5 text-sm"
          />
        ))}
        <textarea
          required
          name="description"
          placeholder="Product description"
          rows={4}
          className="md:col-span-2 rounded-[1.2rem] border border-[var(--border)] px-4 py-3.5 text-sm"
        />
        <textarea
          required
          name="features"
          placeholder="Comma-separated features"
          rows={3}
          className="md:col-span-2 rounded-[1.2rem] border border-[var(--border)] px-4 py-3.5 text-sm"
        />
        <div className="md:col-span-2 flex items-center gap-4">
          <button
            type="submit"
            className="rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-white"
          >
            Save product
          </button>
          {status ? <p className="text-sm text-[var(--muted)]">{status}</p> : null}
        </div>
      </form>
    </section>
  );
}
