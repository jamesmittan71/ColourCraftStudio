import type { Metadata } from "next";
import { cookies } from "next/headers";
import { AdminLoginForm } from "@/components/admin-login-form";
import { AdminPortfolioForm } from "@/components/admin-portfolio-form";
import { AdminProductForm } from "@/components/admin-product-form";
import { SectionHeading } from "@/components/section-heading";
import {
  adminSessionCookieName,
  getConfiguredAdminSecret,
  hasValidAdminSessionCookie,
} from "@/lib/admin";
import { getPortfolio, getProducts, getSubmissions } from "@/lib/runtime-data";

export const metadata: Metadata = {
  title: "Admin",
  description:
    "Internal dashboard for managing catalogue content, portfolio entries, and inbound enquiries for Colour Craft Studio.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminPage() {
  const configuredSecret = getConfiguredAdminSecret();
  const cookieStore = await cookies();
  const hasSession = hasValidAdminSessionCookie(
    cookieStore.get(adminSessionCookieName)?.value,
  );

  if (!configuredSecret || !hasSession) {
    return (
      <div className="mx-auto w-full max-w-3xl px-6 py-16 lg:px-10">
        <SectionHeading
          eyebrow="Admin dashboard"
          title="Protected studio access"
          description="Sign in with the configured admin key to manage products, gallery entries, and booking inbox data."
          as="h1"
        />
        <AdminLoginForm hasConfiguredSecret={Boolean(configuredSecret)} />
      </div>
    );
  }

  const [products, portfolio, submissions] = await Promise.all([
    getProducts(),
    getPortfolio(),
    getSubmissions(),
  ]);

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-16 lg:px-10">
      <SectionHeading
        eyebrow="Admin dashboard"
        title="A lightweight content and booking management layer."
        description="Use the forms below to add or update catalogue products and portfolio entries. Existing enquiries and bookings are listed for quick follow-up."
        as="h1"
      />

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {[
          ["Products", String(products.length)],
          ["Portfolio items", String(portfolio.length)],
          ["Inquiries logged", String(submissions.length)],
        ].map(([label, value]) => (
          <article
            key={label}
            className="rounded-[1.5rem] border border-[var(--border)] bg-white p-6 shadow-[0_10px_30px_rgba(22,22,22,0.04)]"
          >
            <p className="text-sm uppercase tracking-[0.24em] text-[var(--muted)]">
              {label}
            </p>
            <p className="mt-3 text-4xl font-semibold tracking-[-0.05em]">{value}</p>
          </article>
        ))}
      </div>

      <div className="mt-8 grid gap-8 xl:grid-cols-2">
        <AdminProductForm />
        <AdminPortfolioForm />
      </div>

      <section className="mt-8 rounded-[2rem] border border-[var(--border)] bg-white p-8 shadow-[0_10px_30px_rgba(22,22,22,0.04)]">
        <h2 className="text-3xl font-semibold tracking-[-0.05em]">
          Booking and enquiry management
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-7 text-[var(--muted)]">
          Recent contact forms, booking requests, newsletter signups, and quote
          requests are stored in a lightweight JSON inbox for cPanel-friendly
          maintenance.
        </p>
        <div className="mt-8 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b border-[var(--border)] text-[var(--muted)]">
                <th className="px-3 py-3 font-medium">Date</th>
                <th className="px-3 py-3 font-medium">Type</th>
                <th className="px-3 py-3 font-medium">Name</th>
                <th className="px-3 py-3 font-medium">Email</th>
                <th className="px-3 py-3 font-medium">Service</th>
                <th className="px-3 py-3 font-medium">Appointment</th>
              </tr>
            </thead>
            <tbody>
              {submissions.slice(0, 12).map((submission) => (
                <tr key={submission.id} className="border-b border-[var(--border)]">
                  <td className="px-3 py-4 text-[var(--muted)]">
                    {new Date(submission.createdAt).toLocaleDateString("en-ZA")}
                  </td>
                  <td className="px-3 py-4">{submission.type}</td>
                  <td className="px-3 py-4">{submission.name ?? "Newsletter lead"}</td>
                  <td className="px-3 py-4">{submission.email}</td>
                  <td className="px-3 py-4">{submission.serviceInterest ?? "—"}</td>
                  <td className="px-3 py-4 text-[var(--muted)]">
                    {submission.appointmentDate
                      ? `${submission.appointmentDate} ${submission.appointmentTime ?? ""}`.trim()
                      : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
