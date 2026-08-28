import { NextResponse } from "next/server";
import { upsertRuntimeRecord } from "@/lib/storage";
import { validateAdminPortfolio } from "@/lib/validators";

export async function POST(request: Request) {
  const body = await request.json();
  const entry = validateAdminPortfolio(body);
  const saved = await upsertRuntimeRecord("portfolio.json", entry);

  return NextResponse.json({
    ok: true,
    entry: saved,
    message: "Portfolio entry saved successfully.",
  });
}
