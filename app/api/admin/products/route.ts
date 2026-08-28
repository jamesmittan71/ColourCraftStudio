import { NextResponse } from "next/server";
import { upsertRuntimeRecord } from "@/lib/storage";
import { validateAdminProduct } from "@/lib/validators";

export async function POST(request: Request) {
  const body = await request.json();
  const product = validateAdminProduct(body);
  const saved = await upsertRuntimeRecord("products.json", product);

  return NextResponse.json({
    ok: true,
    product: saved,
    message: "Product saved successfully.",
  });
}
