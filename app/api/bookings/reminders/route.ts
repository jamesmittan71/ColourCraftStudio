import { NextResponse } from "next/server";
import { AdminAuthError, AdminConfigError, assertAdminAuthorized } from "@/lib/admin";
import { getSubmissions } from "@/lib/runtime-data";
import { postWebhookJson } from "@/lib/storage";

function hoursUntil(date: Date) {
  return (date.getTime() - Date.now()) / 3_600_000;
}

export async function GET(request: Request) {
  try {
    assertAdminAuthorized(request);
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
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to collect reminders.";
    const status =
      error instanceof AdminAuthError
        ? 401
        : error instanceof AdminConfigError
          ? 503
          : 400;
    return NextResponse.json({ ok: false, message }, { status });
  }
}
