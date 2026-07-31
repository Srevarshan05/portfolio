import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { name, email, phone, date, time, subject, message } = await request.json();

    const clientName  = name || 'Guest Client';
    const clientEmail = email || 'srevarshan9600622@gmail.com';
    const clientPhone = phone || 'Not provided';
    const bookDate    = date || 'Requested Date';
    const bookTime    = time || 'Requested Time';

    const mailSubject = subject || `🔥 NEW DISCOVERY CALL BOOKING: ${clientName}`;
    const formattedMessage = `
📅 NEW 1-ON-1 DISCOVERY CALL BOOKING
==================================================
👤 Client Name: ${clientName}
✉️ Email: ${clientEmail}
📞 Phone: ${clientPhone}

📆 Scheduled Date: ${bookDate}
⏰ Scheduled Time: ${bookTime}
==================================================
Destination: srevarshan9600622@gmail.com
    `.trim();

    let delivered = false;

    // Service 1: FormSubmit HTTP Direct Dispatch API
    try {
      const fsRes = await fetch("https://formsubmit.co/ajax/srevarshan9600622@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          name: clientName,
          email: clientEmail,
          phone: clientPhone,
          date: bookDate,
          time: bookTime,
          _subject: mailSubject,
          message: formattedMessage,
        }),
      });
      const fsData = await fsRes.json();
      console.log("FormSubmit API Delivery:", fsData);
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
          text: formattedMessage,
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

  } catch (error: any) {
    console.error("Booking Transmission Error:", error);
    return NextResponse.json(
      { status: "error", message: error.message || "Internal failure" },
      { status: 500 }
    );
  }
}
