import { NextResponse } from "next/server";
import { submitInquiry } from "@/lib/inquiries";

export async function POST(request: Request) {
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
}
