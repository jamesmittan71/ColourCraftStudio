import { NextResponse } from "next/server";
import {
  adminSessionCookieName,
  getAdminSessionValue,
  isValidAdminSecret,
} from "@/lib/admin";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const secret = String(body.secret ?? "").trim();

    if (!isValidAdminSecret(secret)) {
      return NextResponse.json(
        { ok: false, message: "Invalid admin key." },
        { status: 401 },
      );
    }

    const response = NextResponse.json({ ok: true, message: "Signed in." });
    response.cookies.set(adminSessionCookieName, getAdminSessionValue(), {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 8,
    });
    return response;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to create admin session.";
    return NextResponse.json({ ok: false, message }, { status: 400 });
  }
}
