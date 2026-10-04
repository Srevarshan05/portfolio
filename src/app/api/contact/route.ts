import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { rateLimit, clientKey } from '@/lib/rateLimit';

const OWNER_EMAIL = 'srevarshan9600622@gmail.com';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Contact-form message (sent with `kind: "message"` from the Contact section).
 * Unlike the booking flow below, this reports honestly: 502 when no channel
 * delivered, so the client can keep the draft and offer a fallback.
 */
async function deliverMessage(body: Record<string, unknown>) {
  const name = String(body.name ?? '').trim().slice(0, 120);
  const email = String(body.email ?? '').trim().slice(0, 200);
  const subjectInput = String(body.subject ?? '').trim().slice(0, 200);
  const message = String(body.message ?? '').trim().slice(0, 5000);

  if (!name || !EMAIL_RE.test(email) || message.length < 10) {
    return NextResponse.json(
      { status: 'error', delivered: false, message: 'Please add your name, a valid email and a message.' },
      { status: 400 }
    );
  }

  const subject = `Portfolio message: ${subjectInput || 'Portfolio Inquiry'} — ${name}`;
  let delivered = false;

  // Primary: Gmail SMTP
  const passSecret = (process.env.EMAIL_PASS || '').replace(/\s+/g, '');
  if (passSecret) {
    try {
      const userEmail = process.env.EMAIL_USER || OWNER_EMAIL;
      const transporter = nodemailer.createTransport({ service: 'gmail', auth: { user: userEmail, pass: passSecret } });
      await transporter.sendMail({
        from: userEmail,
        to: OWNER_EMAIL,
        replyTo: `${name} <${email}>`,
        subject,
        text: `${message}\n\n— ${name} <${email}>\nSent from srevarshan.in`,
        html: `
          <div style="font-family: 'Open Sans', Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1C202B;">
            <div style="background: #1C202B; color: #ffffff; padding: 16px 20px; border-radius: 8px 8px 0 0;">
              <strong>New message from srevarshan.in</strong>
            </div>
            <div style="border: 2px solid #1C202B; border-top: 0; padding: 20px; border-radius: 0 0 8px 8px;">
              <p style="margin: 0 0 4px;"><strong>From:</strong> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p>
              <p style="margin: 0 0 16px;"><strong>Subject:</strong> ${escapeHtml(subjectInput || 'Portfolio Inquiry')}</p>
              <div style="white-space: pre-wrap; line-height: 1.6; border-top: 1px dashed #C8D4FF; padding-top: 16px;">${escapeHtml(message)}</div>
            </div>
          </div>
        `,
      });
      delivered = true;
    } catch (err) {
      console.warn('Contact message SMTP failure:', err);
    }
  }

  // Fallback: FormSubmit
  if (!delivered) {
    try {
      const fsRes = await fetch(`https://formsubmit.co/ajax/${OWNER_EMAIL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Origin': 'https://srevarshan.in',
          'Referer': 'https://srevarshan.in/',
        },
        body: JSON.stringify({
          _subject: subject,
          _template: 'table',
          _captcha: 'false',
          _replyto: email,
          Name: name,
          Email: email,
          Subject: subjectInput || 'Portfolio Inquiry',
          Message: message,
        }),
      });
      const fsData = await fsRes.json().catch(() => ({}));
      delivered = fsData.success === 'true' || fsData.success === true;
    } catch (err) {
      console.warn('Contact message FormSubmit failure:', err);
    }
  }

  return delivered
    ? NextResponse.json({ status: 'success', delivered: true })
    : NextResponse.json(
        { status: 'error', delivered: false, message: "The mail service is unavailable right now." },
        { status: 502 }
      );
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (body?.kind === 'message') {
      if (!rateLimit(`contact:${clientKey(request)}`, 5, 10 * 60 * 1000)) {
        return NextResponse.json(
          { status: 'error', delivered: false, message: 'Too many messages in a short time. Please wait a few minutes.' },
          { status: 429 }
        );
      }
      return deliverMessage(body);
    }

    // ── Discovery-call booking (the "Let's connect" pop-up) ──
    if (!rateLimit(`booking:${clientKey(request)}`, 5, 10 * 60 * 1000)) {
      return NextResponse.json(
        { status: 'error', delivered: false, message: 'Too many bookings in a short time. Please wait a few minutes.' },
        { status: 429 }
      );
    }
    const clip = (v: unknown, n: number) => String(v ?? '').trim().slice(0, n);
    const clientName = clip(body.name, 120);
    const clientEmail = clip(body.email, 200);
    const clientPhone = clip(body.phone, 40);
    const bookDate = clip(body.date, 80);
    const bookTime = clip(body.time, 30);
    const topic = clip(body.topic, 80) || 'Not specified';
    const note = clip(body.note, 1000) || 'No details provided';
    if (!clientName || !EMAIL_RE.test(clientEmail) || !clientPhone || !bookDate) {
      return NextResponse.json(
        { status: 'error', delivered: false, message: 'Please add your name, a valid email, a phone number and a date.' },
        { status: 400 }
      );
    }
    const mailSubject = clip(body.subject, 200) || `New call booking: ${clientName}`;
    const rows: [string, string][] = [
      ['Name', clientName], ['Email', clientEmail], ['Phone', clientPhone],
      ['Topic', topic], ['Date', bookDate], ['Time', bookTime], ['Project', note],
    ];
    let delivered = false;

    // Primary: Gmail SMTP — one email
    const passSecret = (process.env.EMAIL_PASS || '').replace(/\s+/g, '');
    if (passSecret) {
      try {
        const userEmail = process.env.EMAIL_USER || OWNER_EMAIL;
        const transporter = nodemailer.createTransport({ service: 'gmail', auth: { user: userEmail, pass: passSecret } });
        await transporter.sendMail({
          from: userEmail,
          to: OWNER_EMAIL,
          replyTo: `${clientName} <${clientEmail}>`,
          subject: mailSubject,
          text: rows.map(([k, v]) => `${k}: ${v}`).join("\n") + "\n\nSent from srevarshan.in",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #141414;">
              <div style="background: #1F7A4C; color: #ffffff; padding: 16px 20px; border-radius: 8px 8px 0 0;">
                <strong>New call booking from srevarshan.in</strong>
              </div>
              <table style="width: 100%; border-collapse: collapse; border: 1px solid #E6E3DD; border-top: 0;">
                ${rows.map(([k, v]) => `<tr><td style="padding: 10px 16px; border-bottom: 1px solid #E6E3DD; color: #6E6E6E; width: 90px; vertical-align: top;">${k}</td><td style="padding: 10px 16px; border-bottom: 1px solid #E6E3DD; white-space: pre-wrap;">${escapeHtml(v)}</td></tr>`).join('')}
              </table>
            </div>
          `,
        });
        delivered = true;
      } catch (err) {
        console.warn('Booking SMTP failure:', err);
      }
    }

    // Fallback: FormSubmit, only if Gmail didn't send
    if (!delivered) {
      try {
        const fsRes = await fetch(`https://formsubmit.co/ajax/${OWNER_EMAIL}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Origin': 'https://srevarshan.in', 'Referer': 'https://srevarshan.in/' },
          body: JSON.stringify({ _subject: mailSubject, _template: 'table', _captcha: 'false', _replyto: clientEmail, ...Object.fromEntries(rows) }),
        });
        const fsData = await fsRes.json().catch(() => ({}));
        delivered = fsData.success === 'true' || fsData.success === true;
      } catch (err) {
        console.warn('Booking FormSubmit failure:', err);
      }
    }

    return delivered
      ? NextResponse.json({ status: 'success', delivered: true })
      : NextResponse.json({ status: 'error', delivered: false, message: 'The mail service is unavailable right now.' }, { status: 502 });

  } catch (error: unknown) {
    console.error("Booking Transmission Error:", error);
    return NextResponse.json(
      { status: "error", message: error instanceof Error ? error.message : "Internal failure" },
      { status: 500 }
    );
  }
}
