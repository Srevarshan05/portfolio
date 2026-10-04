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

    // ── Discovery-call booking (ServicesModal) — unchanged behaviour ──
    const { name, email, phone, date, time, subject } = body;

    const clientName  = name || 'Guest Client';
    const clientEmail = email || 'srevarshan9600622@gmail.com';
    const clientPhone = phone || 'Not provided';
    const bookDate    = date || 'Requested Date';
    const bookTime    = time || 'Requested Time';

    const mailSubject = subject || `🔥 NEW DISCOVERY CALL BOOKING: ${clientName}`;

    let delivered = false;

    // Service 1: FormSubmit API with Styled Table Template for srevarshan.in
    try {
      const fsRes = await fetch("https://formsubmit.co/ajax/srevarshan9600622@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Origin": "https://srevarshan.in",
          "Referer": "https://srevarshan.in/",
        },
        body: JSON.stringify({
          _subject: mailSubject,
          _template: "table",
          _captcha: "false",
          _url: "https://srevarshan.in",
          "Client Name": clientName,
          "Email Address": clientEmail,
          "Phone Number": clientPhone,
          "Scheduled Date": bookDate,
          "Scheduled Time Slot": bookTime,
        }),
      });
      const fsData = await fsRes.json();
      if (fsData.success === "true" || fsData.success === true) {
        delivered = true;
      }
    } catch (fsErr) {
      console.warn("FormSubmit Dispatch Warning:", fsErr);
    }

    // Service 2: Nodemailer Gmail SMTP Engine
    try {
      const userEmail = process.env.EMAIL_USER || 'srevarshan9600622@gmail.com';
      const passSecret = (process.env.EMAIL_PASS || '').replace(/\s+/g, '');

      if (passSecret) {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: userEmail,
            pass: passSecret,
          },
        });

        await transporter.sendMail({
          from: userEmail,
          to: 'srevarshan9600622@gmail.com',
          replyTo: clientEmail,
          subject: mailSubject,
          html: `
            <div style="font-family: 'Open Sans', Arial, sans-serif; background-color: #0f1117; padding: 24px; color: #ffffff;">
              <div style="max-width: 560px; margin: 0 auto; background-color: #171a24; border: 2px solid #E22D6D; border-radius: 16px; overflow: hidden;">
                <div style="background: linear-gradient(135deg, #E22D6D 0%, #8E2DE2 100%); padding: 20px; text-align: center;">
                  <h2 style="color: #ffffff; margin: 0; font-size: 22px; text-transform: uppercase; letter-spacing: 1px;">📅 New Discovery Call Booking (srevarshan.in)</h2>
                </div>
                <div style="padding: 24px;">
                  <table style="width: 100%; border-collapse: collapse; color: #ffffff;">
                    <tr><td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.1); font-weight: bold; color: #E22D6D;">👤 Client Name:</td><td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.1); text-align: right;">${clientName}</td></tr>
                    <tr><td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.1); font-weight: bold; color: #E22D6D;">✉️ Email Address:</td><td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.1); text-align: right;">${clientEmail}</td></tr>
                    <tr><td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.1); font-weight: bold; color: #E22D6D;">📞 Phone Number:</td><td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.1); text-align: right;">${clientPhone}</td></tr>
                    <tr><td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.1); font-weight: bold; color: #E22D6D;">📆 Scheduled Date:</td><td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.1); text-align: right; color: #FFB020; font-weight: bold;">${bookDate}</td></tr>
                    <tr><td style="padding: 10px 0; font-weight: bold; color: #E22D6D;">⏰ Time Slot:</td><td style="padding: 10px 0; text-align: right; color: #2DC8E2; font-weight: bold;">${bookTime}</td></tr>
                  </table>
                </div>
              </div>
            </div>
          `,
        });
        delivered = true;
      }
    } catch (nmErr) {
      console.warn("Nodemailer Dispatch Warning:", nmErr);
    }

    return NextResponse.json(
      { status: "success", delivered, message: "Booking notification dispatched to srevarshan9600622@gmail.com" },
      { status: 200 }
    );

  } catch (error: unknown) {
    console.error("Booking Transmission Error:", error);
    return NextResponse.json(
      { status: "error", message: error instanceof Error ? error.message : "Internal failure" },
      { status: 500 }
    );
  }
}
