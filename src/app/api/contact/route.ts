import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { name, email, subject, message, phone, date, time } = await request.json();

    // Validate inputs
    if (!name || !email) {
      return NextResponse.json(
        { status: "error", message: "Missing required fields" },
        { status: 400 }
      );
    }

    const userEmail = process.env.EMAIL_USER || 'srevarshan9600622@gmail.com';
    const passSecret = (process.env.EMAIL_PASS || 'oheiswanxeabmgtd').replace(/\s+/g, '');

    // 1. Initialize Nodemailer transport using Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: userEmail,
        pass: passSecret,
      },
    });

    const mailSubject = subject || `New Booking Request from ${name}`;
    const mailContent = message || `
📅 NEW DISCOVERY CALL BOOKING
--------------------------------------------------
👤 Client Name: ${name}
✉️ Email: ${email}
📞 Phone: ${phone || 'Not provided'}
📆 Date: ${date || 'Requested'}
⏰ Time Slot: ${time || 'Requested'}
--------------------------------------------------
Notification sent to srevarshan9600622@gmail.com
    `;

    // 2. Format mail options
    const mailOptions = {
      from: userEmail,
      to: 'srevarshan9600622@gmail.com',
      replyTo: email,
      subject: mailSubject,
      text: mailContent,
    };

    // 3. Execute transmission
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { status: "success", message: "Notification email sent successfully!" },
      { status: 200 }
    );

  } catch (error: any) {
    console.error("Nodemailer Transmission Warning:", error.message);
    return NextResponse.json(
      { status: "error", message: error.message || "Email dispatch warning" },
      { status: 500 }
    );
  }
}
