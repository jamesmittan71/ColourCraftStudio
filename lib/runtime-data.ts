import { readRuntimeFile } from "@/lib/storage";
import {
  seedPortfolio,
  seedProducts,
  type PortfolioEntry,
  type Product,
  type Submission,
} from "@/lib/site-data";

function mergeBySlug<T extends { slug: string }>(base: T[], runtime: T[]) {
  const runtimeMap = new Map(runtime.map((item) => [item.slug, item]));
  const merged = base.map((item) => runtimeMap.get(item.slug) ?? item);
  const extras = runtime.filter((item) => !base.some((baseItem) => baseItem.slug === item.slug));
  return [...extras, ...merged];
}

export async function getProducts() {
  const runtimeProducts = await readRuntimeFile<Product[]>("products.json", []);
  return mergeBySlug(seedProducts, runtimeProducts);
}

export async function getPortfolio() {
  const runtimePortfolio = await readRuntimeFile<PortfolioEntry[]>("portfolio.json", []);
  return mergeBySlug(seedPortfolio, runtimePortfolio);
}

export async function getSubmissions() {
  return readRuntimeFile<Submission[]>("submissions.json", []);
}
