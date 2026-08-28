import { NextResponse } from "next/server";
import { brands } from "@/lib/site-data";
import { getPortfolio, getProducts } from "@/lib/runtime-data";

export async function GET() {
  const [products, portfolio] = await Promise.all([getProducts(), getPortfolio()]);

  return NextResponse.json({
    brands,
    products,
    portfolio,
    generatedAt: new Date().toISOString(),
  });
}
