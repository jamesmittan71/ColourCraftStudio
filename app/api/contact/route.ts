import { NextResponse } from "next/server";
import { submitInquiry } from "@/lib/inquiries";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const submission = await submitInquiry({
      type: "contact",
      name: body.name,
      email: body.email,
      phone: body.phone,
      message: body.message,
      serviceInterest: body.serviceInterest,
    });

    return NextResponse.json({
      ok: true,
      submission,
      message: "Thank you. Your enquiry has been received.",
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to process enquiry.";
    return NextResponse.json({ ok: false, message }, { status: 400 });
  }
}
