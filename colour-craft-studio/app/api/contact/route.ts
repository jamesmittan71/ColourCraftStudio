import { NextRequest, NextResponse } from 'next/server';
import { initDb, saveConsultation } from '@/lib/db';

function sanitise(val: unknown): string {
  if (typeof val !== 'string') return '';
  return val.trim().replace(/[<>]/g, '');
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const name = sanitise(body.name);
    const email = sanitise(body.email);
    const phone = sanitise(body.phone);
    const message = sanitise(body.message);

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email and message are required.' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Please provide a valid email address.' }, { status: 400 });
    }

    if (name.length > 200 || message.length > 5000) {
      return NextResponse.json({ error: 'Input too long.' }, { status: 400 });
    }

    initDb();
    const id = saveConsultation({ name, email, phone: phone || undefined, message });

    // Optional email notification — only runs if SMTP env vars are set
    if (
      process.env.SMTP_HOST &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS &&
      process.env.NOTIFY_EMAIL
    ) {
      try {
        const nodemailer = await import('nodemailer');
        const transporter = nodemailer.default.createTransport({
          host: process.env.SMTP_HOST,
          port: parseInt(process.env.SMTP_PORT ?? '587', 10),
          secure: process.env.SMTP_SECURE === 'true',
          auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
        });

        await transporter.sendMail({
          from: `"Colour Craft Studio" <${process.env.SMTP_USER}>`,
          to: process.env.NOTIFY_EMAIL,
          subject: `New enquiry from ${name}`,
          text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || 'not provided'}\n\nMessage:\n${message}`,
          html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Phone:</strong> ${phone || 'not provided'}</p><hr/><p>${message.replace(/\n/g, '<br/>')}</p>`,
        });
      } catch {
        // Email failure is non-fatal — enquiry is already saved
        console.error('Email notification failed');
      }
    }

    return NextResponse.json({ success: true, id });
  } catch {
    return NextResponse.json({ error: 'Server error. Please try again.' }, { status: 500 });
  }
}
