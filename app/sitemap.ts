import type { MetadataRoute } from "next";

const routes = [
  "",
  "/brands",
  "/products",
  "/services",
  "/portfolio",
  "/about",
  "/faq",
  "/contact",
  "/resources",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.colourcraftstudio.co.za";

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
