import Link from "next/link";

const navItems = [
  { href: "/brands", label: "Brands" },
  { href: "/products", label: "Products" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-white/60 bg-[rgba(247,245,241,0.82)] backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4 lg:px-10">
        <Link href="/" className="text-lg font-semibold tracking-[0.18em]">
          COLOUR CRAFT STUDIO
        </Link>
        <nav className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-[var(--muted)]">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-[var(--foreground)]">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
