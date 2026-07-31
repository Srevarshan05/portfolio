import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { name, email, phone, date, time, subject } = await request.json();

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

  } catch (error: any) {
    console.error("Booking Transmission Error:", error);
    return NextResponse.json(
      { status: "error", message: error.message || "Internal failure" },
      { status: 500 }
    );
  }
}
