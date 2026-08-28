import { NextResponse } from "next/server";
import { AdminAuthError, AdminConfigError, assertAdminAuthorized } from "@/lib/admin";
import { getProducts } from "@/lib/runtime-data";
import { upsertRuntimeRecord } from "@/lib/storage";
import { validateAdminProduct } from "@/lib/validators";

export async function POST(request: Request) {
  try {
    assertAdminAuthorized(request);
    const body = await request.json();
    const product = validateAdminProduct(body);
    if (product.newestRank <= 0) {
      const products = await getProducts();
      const maxNewestRank = products.reduce(
        (max, entry) => Math.max(max, entry.newestRank),
        0,
      );
      product.newestRank = maxNewestRank + 1;
    }
    const saved = await upsertRuntimeRecord("products.json", product);

    return NextResponse.json({
      ok: true,
      product: saved,
      message: "Product saved successfully.",
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to save product.";
    const status =
      error instanceof AdminAuthError
        ? 401
        : error instanceof AdminConfigError
          ? 503
          : 400;
    return NextResponse.json({ ok: false, message }, { status });
  }
}
