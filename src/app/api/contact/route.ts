import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();

    // Validate inputs
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { status: "error", message: "Missing required fields" },
        { status: 400 }
      );
    }

    // 1. Initialize the transport engine using secure variables
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 2. Format the layout of the notification email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // always your email address
      replyTo: email, 
      subject: `Portfolio Message: ${subject}`,
      text: `
==================================================
NEW PORTFOLIO TRANSMISSION
==================================================
Sender Name:    ${name}
Sender Email:   ${email}
Subject Line:   ${subject}
--------------------------------------------------
Message Payload:

${message}
==================================================
      `,
    };

    // 3. Execute transmission
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { status: "success", message: "Payload delivered securely" },
      { status: 200 }
    );

  } catch (error: any) {
    console.error("Transmission Error:", error);
    return NextResponse.json(
      { status: "error", message: error.message || "Internal transmission failure" },
      { status: 500 }
    );
  }
}
