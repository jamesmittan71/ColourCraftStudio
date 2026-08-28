import { type PortfolioEntry, type Product } from "@/lib/site-data";

function requiredString(value: unknown, label: string) {
  const stringValue = String(value ?? "").trim();
  if (!stringValue) {
    throw new Error(`${label} is required.`);
  }
  return stringValue;
}

export function validateAdminProduct(input: Record<string, unknown>): Product {
  return {
    slug: requiredString(input.slug, "Slug"),
    brand: requiredString(input.brand, "Brand"),
    brandSlug: requiredString(input.brandSlug, "Brand slug"),
    name: requiredString(input.name, "Product name"),
    line: requiredString(input.line, "Product line"),
    paintType: requiredString(input.paintType, "Paint type"),
    finish: requiredString(input.finish, "Finish"),
    description: requiredString(input.description, "Description"),
    priceFrom: String(input.priceFrom ?? "Available on request").trim() || "Available on request",
    sortPrice: Number(input.sortPrice ?? 0) || 0,
    stockStatus: requiredString(input.stockStatus, "Stock status"),
    swatch: requiredString(input.swatch, "Swatch"),
    sourceUrl: requiredString(input.sourceUrl, "Source URL"),
    newestRank: 0,
    features: Array.isArray(input.features)
      ? input.features.map((item) => String(item))
      : [requiredString(input.features, "Features")],
  };
}

export function validateAdminPortfolio(
  input: Record<string, unknown>,
): PortfolioEntry {
  return {
    slug: requiredString(input.slug, "Slug"),
    title: requiredString(input.title, "Title"),
    roomType: requiredString(input.roomType, "Room type"),
    description: requiredString(input.description, "Description"),
    image: requiredString(input.image, "Image"),
    imageAlt: requiredString(input.imageAlt, "Image alt"),
    coloursUsed: Array.isArray(input.coloursUsed)
      ? input.coloursUsed.map((item) => String(item))
      : [requiredString(input.coloursUsed, "Colours used")],
  };
}
