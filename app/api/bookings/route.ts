import { NextResponse } from "next/server";
import { submitInquiry } from "@/lib/inquiries";

export async function POST(request: Request) {
  const body = await request.json();
  const submission = await submitInquiry({
    type: "booking",
    name: body.name,
    email: body.email,
    phone: body.phone,
    message: body.message,
    serviceInterest: body.serviceInterest,
    appointmentDate: body.appointmentDate,
    appointmentTime: body.appointmentTime,
  });

  return NextResponse.json({
    ok: true,
    submission,
    message:
      "Your consultation request has been logged. We’ll confirm availability and send booking details shortly.",
  });
}
