import { NextResponse } from "next/server";
import { submitInquiry } from "@/lib/inquiries";

export async function POST(request: Request) {
  const body = await request.json();
  const submission = await submitInquiry({
    type: "newsletter",
    email: body.email,
  });

  return NextResponse.json({
    ok: true,
    submission,
    message: "You’re subscribed to Colour Craft Studio updates.",
  });
}
