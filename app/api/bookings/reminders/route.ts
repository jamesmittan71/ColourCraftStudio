import { NextResponse } from "next/server";
import { getSubmissions } from "@/lib/runtime-data";
import { postWebhookJson } from "@/lib/storage";

function hoursUntil(date: Date) {
  return (date.getTime() - Date.now()) / 3_600_000;
}

export async function GET() {
  const bookings = (await getSubmissions()).filter(
    (submission) => submission.type === "booking" && submission.appointmentDate,
  );

  const due = bookings.filter((booking) => {
    const appointment = new Date(
      `${booking.appointmentDate}T${booking.appointmentTime ?? "09:00"}:00`,
    );
    const remaining = hoursUntil(appointment);
    return remaining >= 23 && remaining <= 25;
  });

  const webhook = process.env.BOOKING_REMINDER_WEBHOOK_URL;
  if (webhook && due.length > 0) {
    await postWebhookJson(webhook, { due, generatedAt: new Date().toISOString() });
  }

  return NextResponse.json({
    ok: true,
    count: due.length,
    due,
  });
}
