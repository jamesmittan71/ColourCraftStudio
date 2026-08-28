import { NextResponse } from "next/server";
import { AdminAuthError, AdminConfigError, assertAdminAuthorized } from "@/lib/admin";
import { upsertRuntimeRecord } from "@/lib/storage";
import { validateAdminPortfolio } from "@/lib/validators";

export async function POST(request: Request) {
  try {
    assertAdminAuthorized(request);
    const body = await request.json();
    const entry = validateAdminPortfolio(body);
    const saved = await upsertRuntimeRecord("portfolio.json", entry);

    return NextResponse.json({
      ok: true,
      entry: saved,
      message: "Portfolio entry saved successfully.",
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to save portfolio entry.";
    const status =
      error instanceof AdminAuthError
        ? 401
        : error instanceof AdminConfigError
          ? 503
          : 400;
    return NextResponse.json({ ok: false, message }, { status });
  }
}
