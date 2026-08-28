import { getSubmissions } from "@/lib/runtime-data";
import { postWebhookJson, writeRuntimeFile } from "@/lib/storage";
import { type Submission } from "@/lib/site-data";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

type SubmissionInput = Omit<Submission, "id" | "createdAt">;

function assertStringLength(value: string | undefined, label: string, max = 5000) {
  if (value && value.length > max) {
    throw new Error(`${label} is too long.`);
  }
}

export async function submitInquiry(input: SubmissionInput) {
  const email = String(input.email ?? "").trim();
  if (!isValidEmail(email)) {
    throw new Error("A valid email address is required.");
  }

  if (input.type !== "newsletter" && !String(input.name ?? "").trim()) {
    throw new Error("Name is required.");
  }

  assertStringLength(input.name, "Name", 120);
  assertStringLength(input.phone, "Phone", 40);
  assertStringLength(input.message, "Message", 2000);
  assertStringLength(input.serviceInterest, "Service interest", 120);

  const submission: Submission = {
    ...input,
    email,
    name: input.name?.trim(),
    phone: input.phone?.trim(),
    message: input.message?.trim(),
    serviceInterest: input.serviceInterest?.trim(),
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };

  const current = await getSubmissions();
  const next = [submission, ...current];
  await writeRuntimeFile("submissions.json", next);

  const webhook =
    submission.type === "booking"
      ? process.env.BOOKING_WEBHOOK_URL
      : submission.type === "newsletter"
        ? process.env.NEWSLETTER_WEBHOOK_URL
        : process.env.CONTACT_WEBHOOK_URL;

  if (webhook) {
    await postWebhookJson(webhook, submission);
  }

  return submission;
}
