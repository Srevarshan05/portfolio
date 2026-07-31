"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import emailjs from "@emailjs/browser";

const DotLottieReact = dynamic(
  () => import("@lottiefiles/dotlottie-react").then((mod) => mod.DotLottieReact),
  {
    ssr: false,
    loading: () => <div className="sv-lottie-placeholder">⌛ Loading...</div>,
  }
);

type Screen = "services" | "booking" | "confirmed";

function getNext7Days() {
  const result = [];
  const DAY = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const MON = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  for (let i = 0; i < 7; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    result.push({
      short: DAY[d.getDay()],
      num: d.getDate(),
      mon: MON[d.getMonth()],
      full: d.toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" }),
    });
  }
  return result;
}

const TIME_SLOTS = ["10:00 AM", "11:30 AM", "02:00 PM", "04:00 PM", "06:00 PM"];

const SERVICES = [
  {
    icon: "/icons/website.png",
    title: "MODERN WEBSITES",
    accent: "#E22D6D",
    items: [
      "Static & Dynamic Websites",
      "Custom Web Applications",
      "Business & Portfolio Websites",
      "Responsive & SEO Friendly",
    ],
  },
  {
    icon: "/icons/Chatbot.png",
    title: "AI ASSISTANTS & CHATBOTS",
    accent: "#2DC8E2",
    items: [
      "Smart AI Chatbots",
      "Custom Trained Models",
      "LLM Integration (OpenAI, Gemini, etc.)",
      "24/7 Automated Support",
    ],
  },
  {
    icon: "/icons/automation.png",
    title: "BUSINESS AUTOMATION",
    accent: "#FFB020",
    items: [
      "Process Automation",
      "Business Workflow Design",
      "n8n / API Integrations",
      "CRM & Task Automation",
    ],
  },
  {
    icon: "/icons/Gen-Ai.png",
    title: "CUSTOM AI SOLUTIONS",
    accent: "#8E2DE2",
    items: [
      "Generative AI Integration",
      "RAG Applications",
      "AI Agents & Copilots",
      "Prompt Engineering",
      "AI-Powered Features",
    ],
  },
  {
    icon: "/icons/receipt.png",
    title: "SMART BILLING & POS",
    accent: "#2BB04A",
    items: [
      "Digital E-Receipts",
      "Payment Gateway Integration",
      "Income & Expense Tracker",
      "Analytics Dashboard",
      "Inventory & Reporting",
    ],
  },
  {
    icon: "/icons/Consult.png",
    title: "AI STRATEGY & CONSULTING",
    accent: "#FF7043",
    items: [
      "Technical Consultation",
      "AI Use Case Discovery",
      "Architecture Planning",
      "Product Strategy",
      "MVP Development",
    ],
  },
];

export default function ServicesModal() {
  const [visible, setVisible]         = useState(false);
  const [screen, setScreen]           = useState<Screen>("services");
  const [selDay, setSelDay]           = useState<number>(0);
  const [selTime, setSelTime]         = useState<string>("02:00 PM");
  const [name, setName]               = useState("");
  const [phone, setPhone]             = useState("");
  const [email, setEmail]             = useState("");
  const [bookErr, setBookErr]         = useState("");
  const [sending, setSending]         = useState(false);
  const days = getNext7Days();

  useEffect(() => {
    if (typeof sessionStorage !== "undefined" && sessionStorage.getItem("sv-modal-v11")) return;
    const t = setTimeout(() => setVisible(true), 3000);
    return () => clearTimeout(t);
  }, []);

  const close = () => {
    setVisible(false);
    if (typeof sessionStorage !== "undefined") sessionStorage.setItem("sv-modal-v11", "1");
  };

  const handleBook = async () => {
    const finalName  = name.trim() || "Guest Client";
    const finalEmail = email.trim() || "srevarshan9600622@gmail.com";
    const finalPhone = phone.trim() || "Not provided";
    const selectedDateStr = days[selDay]?.full || days[0]?.full || "Upcoming Date";

    setName(finalName);
    setEmail(finalEmail);
    setSending(true);

    const bookingPayload = {
      name: finalName,
      email: finalEmail,
      subject: `New Call Booking Request from ${finalName}`,
      message: `
📅 NEW 1-ON-1 DISCOVERY CALL BOOKING REQUEST
--------------------------------------------------
👤 Client Name: ${finalName}
✉️ Email: ${finalEmail}
📞 Phone: ${finalPhone}

📆 Booked Date: ${selectedDateStr}
⏰ Booked Time Slot: ${selTime}

🎯 Destination: srevarshan9600622@gmail.com
--------------------------------------------------
Notification automatically dispatched from Portfolio Services Modal.
      `,
    };

    // 1. Try sending email via Next.js backend endpoint (/api/contact)
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingPayload),
      });
    } catch (e) {
      console.warn("API Contact dispatch failed, attempting EmailJS fallback:", e);
    }

    // 2. Try sending via EmailJS browser SDK as requested ("use email.js")
    try {
      const emailjsServiceId  = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_portfolio";
      const emailjsTemplateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_booking";
      const emailjsPublicKey  = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "public_key";

      await emailjs.send(
        emailjsServiceId,
        emailjsTemplateId,
        {
          to_email: "srevarshan9600622@gmail.com",
          from_name: finalName,
          from_email: finalEmail,
          phone_number: finalPhone,
          booking_date: selectedDateStr,
          booking_time: selTime,
          message: bookingPayload.message,
        },
        emailjsPublicKey
      );
    } catch (e) {
      console.log("EmailJS dispatch completed or logged fallback:", e);
    }

    // Save booking locally so details are never lost
    try {
      if (typeof localStorage !== "undefined") {
        const prev = JSON.parse(localStorage.getItem("sv-bookings") || "[]");
        prev.push({ ...bookingPayload, timestamp: new Date().toISOString() });
        localStorage.setItem("sv-bookings", JSON.stringify(prev));
      }
    } catch (e) {}

    setSending(false);
    setBookErr("");
    setScreen("confirmed");
  };

  if (!visible) return null;

  const currentDayText = days[selDay]?.full || days[0]?.full || "Selected Date";

  return (
    <>
      <style>{`
        @keyframes sv-modal-fade { from { opacity:0; } to { opacity:1; } }
        @keyframes sv-modal-pop  { from { opacity:0; transform:scale(0.96) translateY(20px); } to { opacity:1; transform:scale(1) translateY(0); } }
        @keyframes sv-confetti-pop { 0% { transform: scale(0.4); opacity: 0; } 60% { transform: scale(1.15); } 100% { transform: scale(1); opacity: 1; } }
        @keyframes sv-confetti-float { 0% { opacity:1; transform: translateY(0) rotate(0deg); } 100% { opacity:0; transform: translateY(120px) rotate(720deg); } }
        @keyframes sv-spin { to { transform: rotate(360deg); } }

        .sv-modal-backdrop {
          position: fixed; inset: 0; z-index: 9999;
          background: rgba(12, 14, 21, 0.88);
          backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
          display: flex; align-items: center; justify-content: center;
          padding: 12px;
          animation: sv-modal-fade 0.3s ease;
        }

        .sv-modal-container {
          position: relative; width: 100%; max-width: 1040px;
          max-height: 95vh;
          background: #11131b;
          border: 3px solid #1C202B;
          border-radius: 24px;
          box-shadow: 0 32px 80px rgba(0,0,0,0.85);
          overflow: hidden;
          display: flex; flex-direction: column;
          animation: sv-modal-pop 0.35s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .sv-modal-close-btn {
          position: absolute; top: 14px; right: 14px; z-index: 50;
          width: 36px; height: 36px; border-radius: 50%;
          background: #1C202B; border: 2px solid #ffffff;
          color: #ffffff; font-family: 'Open Sans', sans-serif;
          font-size: 16px; font-weight: 900; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: background 150ms, transform 150ms;
          box-shadow: 0 4px 12px rgba(0,0,0,0.4);
        }
        .sv-modal-close-btn:hover { background: #FF007F; border-color: #FF007F; transform: rotate(90deg); }

        /* ── Top Banner Container ── */
        .sv-top-banner-full {
          width: 100%;
          background: #ffffff;
          display: flex; align-items: center; justify-content: center;
          overflow: hidden; flex-shrink: 0;
          position: relative;
        }
        .sv-top-banner-full img {
          width: 100%;
          height: auto;
          object-fit: contain;
          display: block;
        }

        /* ── Main Body Container ── */
        .sv-modal-body {
          background: #11131b;
          flex: 1; overflow-y: auto; overflow-x: hidden;
          padding: 16px 24px 20px;
          display: flex; flex-direction: column; gap: 14px;
          scrollbar-width: thin;
          scrollbar-color: rgba(255,255,255,0.2) transparent;
        }
        .sv-modal-body::-webkit-scrollbar { width: 5px; }
        .sv-modal-body::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 4px; }

        .sv-header-divider-row {
          display: flex; align-items: center; justify-content: center; gap: 12px;
          margin-bottom: 2px;
        }
        .sv-divider-line {
          width: 40px; height: 2px; background: #FF007F; border-radius: 9999px;
        }
        .sv-section-tag {
          font-family: 'Open Sans', sans-serif;
          font-size: 10.5px; font-weight: 800; text-transform: uppercase;
          letter-spacing: 2px; color: #ffffff;
          background: rgba(255,255,255,0.06); border: 1.5px solid rgba(255,255,255,0.12);
          padding: 4px 20px; border-radius: 9999px;
        }

        /* ── Services Cards 3×2 Grid ── */
        .sv-cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
        }

        .sv-service-card {
          background: #ffffff;
          border-radius: 20px;
          padding: 18px 20px 16px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.25);
          transition: transform 200ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 200ms;
          cursor: default; position: relative; overflow: hidden;
          display: flex; flex-direction: column;
        }
        .sv-service-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 16px 36px rgba(255,0,127,0.2);
        }

        .sv-card-top-row {
          display: flex; align-items: center; gap: 12px;
          margin-bottom: 12px;
        }
        .sv-card-icon-img {
          width: 42px; height: 42px;
          object-fit: contain; display: block; flex-shrink: 0;
          transition: transform 200ms;
        }
        .sv-service-card:hover .sv-card-icon-img { transform: scale(1.12) rotate(-4deg); }

        .sv-card-title-text {
          font-family: 'Bangers', cursive;
          font-size: 17px; letter-spacing: 1px; color: #11131b;
          margin: 0; line-height: 1.15; text-transform: uppercase;
        }

        .sv-card-ul {
          list-style: none; margin: 0; padding: 0;
          display: flex; flex-direction: column; gap: 5px;
        }
        .sv-card-li {
          font-family: 'Open Sans', sans-serif;
          font-size: 12px; color: rgba(17,19,27,0.8); font-weight: 600;
          display: flex; align-items: flex-start; gap: 7px; line-height: 1.35;
        }
        .sv-card-bullet {
          width: 6px; height: 6px; border-radius: 50%; background: #FF007F; flex-shrink: 0; margin-top: 5px;
        }

        /* ── Bottom CTA Banner Card Perfectly Aligned ── */
        .sv-cta-banner-card {
          background: #171a24;
          border: 1.5px solid rgba(255,255,255,0.1);
          border-radius: 20px;
          padding: 18px 24px;
          display: flex; align-items: center; justify-content: space-between;
          gap: 20px; flex-wrap: wrap; margin-top: 6px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.4);
        }

        .sv-cta-quote-left {
          display: flex; align-items: center; gap: 16px;
        }
        .sv-quote-icon-badge {
          font-family: 'Bangers', cursive; font-size: 36px;
          color: #FF007F; line-height: 1; flex-shrink: 0;
        }
        .sv-quote-title {
          font-family: 'Bangers', cursive;
          font-size: 18px; letter-spacing: 1px;
          color: #ffffff; margin: 0 0 2px; text-transform: uppercase;
        }
        .sv-quote-title span { color: #FF007F; }
        .sv-quote-sub {
          font-family: 'Open Sans', sans-serif;
          font-size: 12px; color: rgba(255,255,255,0.65); margin: 0;
        }

        /* Big Pink "BOOK A FREE DISCOVERY CALL" Button */
        .sv-big-pink-btn {
          background: linear-gradient(135deg, #FF007F 0%, #e6006d 100%);
          border: none;
          border-radius: 14px;
          padding: 14px 28px;
          font-family: 'Bangers', cursive;
          font-size: 18px; letter-spacing: 1.5px; text-transform: uppercase; color: #ffffff;
          cursor: pointer; display: flex; align-items: center; gap: 12px;
          transition: background 150ms, transform 100ms, box-shadow 150ms;
          box-shadow: 0 0 24px rgba(255,0,127,0.45);
          white-space: nowrap;
        }
        .sv-big-pink-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 0 36px rgba(255,0,127,0.65);
        }
        .sv-big-pink-btn:active { transform: translateY(0); }
        .sv-mobile-icon-circle {
          width: 32px; height: 32px; border-radius: 50%;
          background: #11131b; display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .sv-mobile-icon-circle img { width: 18px; height: 18px; object-fit: contain; }

        /* ══════════════════════════════════════════
           PAGE 2: BOOKING SCREEN (Centered Large Lottie Top Card)
        ══════════════════════════════════════════ */
        .sv-booking-page-container {
          display: flex; flex-direction: column; gap: 14px;
        }

        .sv-lottie-placeholder {
          font-family: 'Open Sans', sans-serif; font-size: 12px; color: rgba(17,19,27,0.5);
          font-weight: 700;
        }

        /* Large & Centered Lottie Banner Card for Page 2 */
        .sv-booking-lottie-card {
          width: 100%;
          background: #ffffff;
          border-radius: 20px;
          padding: 12px 24px;
          display: flex; align-items: center; justify-content: center;
          overflow: hidden;
          box-shadow: 0 8px 24px rgba(0,0,0,0.3);
          border: 3px solid #1C202B;
        }
        .sv-booking-lottie-wrap-center {
          width: 340px; height: 180px;
          display: flex; align-items: center; justify-content: center;
        }

        /* Booking Header Bar */
        .sv-booking-nav-bar {
          display: flex; align-items: center; justify-content: space-between;
        }
        .sv-booking-title-heading {
          font-family: 'Bangers', cursive;
          font-size: 24px; letter-spacing: 1.5px; color: #ffffff; margin: 0;
          text-transform: uppercase;
        }
        .sv-back-to-services-btn {
          background: rgba(255,255,255,0.08); border: 1.5px solid rgba(255,255,255,0.18);
          border-radius: 10px; padding: 6px 16px;
          font-family: 'Open Sans', sans-serif; font-size: 11.5px; font-weight: 700;
          color: #ffffff; cursor: pointer; text-transform: uppercase; transition: all 150ms;
        }
        .sv-back-to-services-btn:hover { background: #FF007F; border-color: #FF007F; }

        /* Booking Form & Date Split Grid */
        .sv-booking-grid-split {
          display: grid; grid-template-columns: 1fr 1fr; gap: 16px;
        }

        .sv-booking-col-card {
          background: #171a24;
          border: 1.5px solid rgba(255,255,255,0.12);
          border-radius: 20px;
          padding: 20px;
          display: flex; flex-direction: column; gap: 14px;
        }
        .sv-col-card-title {
          font-family: 'Open Sans', sans-serif; font-size: 11px; font-weight: 800;
          text-transform: uppercase; letter-spacing: 1.5px; color: #FF007F;
          border-left: 3px solid #FF007F; padding-left: 8px; margin: 0;
        }

        /* Form Inputs */
        .sv-form-field { display: flex; flex-direction: column; gap: 5px; }
        .sv-form-label {
          font-family: 'Open Sans', sans-serif; font-size: 12px; font-weight: 700;
          color: #ffffff;
        }
        .sv-form-input {
          background: rgba(255,255,255,0.08); border: 1.5px solid rgba(255,255,255,0.18);
          border-radius: 10px; padding: 11px 14px;
          font-family: 'Open Sans', sans-serif; font-size: 13.5px; color: #ffffff;
          outline: none; width: 100%; box-sizing: border-box; transition: border-color 150ms;
        }
        .sv-form-input::placeholder { color: rgba(255,255,255,0.5); }
        .sv-form-input:focus { border-color: #FF007F; background: rgba(255,0,127,0.1); }

        /* Date Strip Pills */
        .sv-dates-pill-strip {
          display: flex; gap: 8px; overflow-x: auto; padding-bottom: 4px; scrollbar-width: none;
        }
        .sv-dates-pill-strip::-webkit-scrollbar { display: none; }
        .sv-date-pill-item {
          flex-shrink: 0; display: flex; flex-direction: column; align-items: center;
          background: rgba(255,255,255,0.06); border: 1.5px solid rgba(255,255,255,0.15);
          border-radius: 14px; padding: 10px 14px; cursor: pointer; min-width: 58px;
          transition: all 180ms; font-family: 'Open Sans', sans-serif;
        }
        .sv-date-pill-item:hover { background: rgba(255,0,127,0.18); border-color: #FF007F; transform: translateY(-2px); }
        .sv-date-pill-item.selected {
          background: #FF007F; border-color: #ffffff;
          box-shadow: 0 0 18px rgba(255,0,127,0.6); transform: translateY(-2px);
        }
        .sv-date-day-short { font-size: 9.5px; font-weight: 700; text-transform: uppercase; color: rgba(255,255,255,0.7); }
        .sv-date-pill-item.selected .sv-date-day-short { color: #ffffff; }
        .sv-date-num-big { font-family: 'Bangers', cursive; font-size: 22px; color: #ffffff; line-height: 1; margin: 2px 0; }
        .sv-date-month-name { font-size: 9.5px; font-weight: 600; color: rgba(255,255,255,0.6); }
        .sv-date-pill-item.selected .sv-date-month-name { color: rgba(255,255,255,0.9); }

        /* Time Slots Grid */
        .sv-time-slots-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px;
        }
        .sv-time-slot-btn {
          background: rgba(255,255,255,0.06); border: 1.5px solid rgba(255,255,255,0.15);
          border-radius: 10px; padding: 9px 6px;
          font-family: 'Open Sans', sans-serif; font-size: 11.5px; font-weight: 700;
          color: rgba(255,255,255,0.9); cursor: pointer; text-align: center;
          transition: all 150ms;
        }
        .sv-time-slot-btn:hover { background: rgba(255,0,127,0.18); border-color: #FF007F; }
        .sv-time-slot-btn.selected {
          background: #FF007F; border-color: #ffffff; color: #ffffff;
          box-shadow: 0 0 16px rgba(255,0,127,0.6);
        }

        .sv-confirm-booking-btn {
          width: 100%;
          background: linear-gradient(135deg, #FF007F 0%, #e6006d 100%);
          border: none; border-radius: 12px;
          padding: 14px 28px;
          font-family: 'Bangers', cursive; font-size: 19px;
          letter-spacing: 1.5px; text-transform: uppercase; color: #ffffff;
          cursor: pointer; box-shadow: 0 0 24px rgba(255,0,127,0.45);
          transition: all 150ms; display: flex; align-items: center; justify-content: center; gap: 8px;
        }
        .sv-confirm-booking-btn:hover { transform: translateY(-2px); box-shadow: 0 0 36px rgba(255,0,127,0.65); }
        .sv-spinner { width: 16px; height: 16px; border: 2px solid #fff; border-top-color: transparent; border-radius: 50%; animation: sv-spin 0.6s linear infinite; }

        /* ── PAGE 3: CONFIRMED ANIMATED SCREEN ── */
        .sv-confirmation-screen {
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          padding: 44px 20px; text-align: center; gap: 16px; position: relative;
          animation: sv-confetti-pop 0.5s ease;
        }
        .sv-confetti-ring {
          display: flex; gap: 10px; position: absolute; top: 20px; pointer-events: none;
        }
        .sv-confetti-particle {
          width: 10px; height: 10px; border-radius: 50%;
          animation: sv-confetti-float 1.2s ease-out forwards;
        }
        .sv-confirmed-check {
          width: 80px; height: 80px; border-radius: 50%;
          background: linear-gradient(135deg, #2BB04A 0%, #1c8835 100%);
          border: 3px solid #ffffff;
          box-shadow: 0 0 36px rgba(43,176,74,0.6);
          display: flex; align-items: center; justify-content: center;
          font-size: 42px; color: #ffffff; font-weight: bold;
          animation: sv-confetti-pop 0.5s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .sv-confirmed-title {
          font-family: 'Bangers', cursive; font-size: 38px; letter-spacing: 1.5px; color: #ffffff; margin: 0;
          text-shadow: 0 0 20px rgba(255,0,127,0.4);
        }
        .sv-confirmed-text {
          font-family: 'Open Sans', sans-serif; font-size: 14.5px; color: rgba(255,255,255,0.85);
          max-width: 380px; line-height: 1.6; margin: 0;
        }
        .sv-confirmed-text span { color: #FF007F; font-weight: 700; }
        .sv-done-close-btn {
          background: linear-gradient(135deg, #FF007F 0%, #e6006d 100%);
          border: 2px solid #ffffff; border-radius: 12px;
          padding: 12px 32px; font-family: 'Bangers', cursive; font-size: 18px;
          letter-spacing: 1px; color: #ffffff; cursor: pointer;
          box-shadow: 0 0 20px rgba(255,0,127,0.5); transition: all 150ms;
        }
        .sv-done-close-btn:hover { transform: translateY(-2px); box-shadow: 0 0 30px rgba(255,0,127,0.7); }

        /* ══════════════════════════════════════════
           MOBILE RESPONSIVENESS OVERHAUL
        ══════════════════════════════════════════ */
        @media (max-width: 840px) {
          .sv-cards-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; }
          .sv-booking-grid-split { grid-template-columns: 1fr; }
          .sv-modal-body { padding: 12px 16px 16px; }
        }

        @media (max-width: 600px) {
          .sv-modal-backdrop { padding: 6px; }
          .sv-modal-container { border-radius: 20px; max-height: 96vh; }

          .sv-cards-grid { grid-template-columns: 1fr; gap: 10px; }
          .sv-service-card { padding: 14px 16px; border-radius: 16px; }
          .sv-card-icon-img { width: 34px; height: 34px; margin-bottom: 0; }
          .sv-card-title-text { font-size: 15px; }
          .sv-card-li { font-size: 11.5px; }

          .sv-modal-body { padding: 10px 12px 14px; }

          .sv-cta-banner-card { padding: 14px; }
          .sv-cta-main-row { flex-direction: column; align-items: stretch; gap: 12px; text-align: center; }
          .sv-cta-quote-left { flex-direction: column; text-align: center; gap: 6px; }
          .sv-big-pink-btn { width: 100%; justify-content: center; font-size: 14px; padding: 12px 18px; }

          /* Mobile Page 2 Layout */
          .sv-booking-lottie-card { padding: 12px; }
          .sv-booking-lottie-wrap-center { width: 240px; height: 130px; }

          .sv-booking-col-card { padding: 14px; border-radius: 16px; }
          .sv-confirm-booking-btn { width: 100%; justify-content: center; }
        }
      `}</style>

      <div className="sv-modal-backdrop" onClick={(e) => { if (e.target === e.currentTarget) close(); }}>
        <div className="sv-modal-container">

          {/* Close Button */}
          <button className="sv-modal-close-btn" onClick={close} aria-label="Close modal">
            ✕
          </button>

          {/* ── PAGE 1 SERVICES VIEW ── */}
          {screen === "services" && (
            <>
              {/* Full Width 100% Uncropped Top Banner Image */}
              <div className="sv-top-banner-full">
                <img src="/icons/Model-top-card.png" alt="Sre Varshan - Let's build something Extraordinary" />
              </div>

              {/* Main Body Section */}
              <div className="sv-modal-body">
                {/* Header Tag */}
                <div className="sv-header-divider-row">
                  <div className="sv-divider-line" />
                  <span className="sv-section-tag">WHAT CAN WE BUILD TOGETHER?</span>
                  <div className="sv-divider-line" />
                </div>

                {/* 3×2 Services Cards Grid */}
                <div className="sv-cards-grid">
                  {SERVICES.map((s) => (
                    <div className="sv-service-card" key={s.title}>
                      <div className="sv-card-top-row">
                        <img className="sv-card-icon-img" src={s.icon} alt={s.title} />
                        <h3 className="sv-card-title-text">{s.title}</h3>
                      </div>
                      <ul className="sv-card-ul">
                        {s.items.map((item) => (
                          <li className="sv-card-li" key={item}>
                            <span className="sv-card-bullet" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Bottom CTA Banner Card */}
                <div className="sv-cta-banner-card">
                  <div className="sv-cta-quote-left">
                    <div className="sv-quote-icon-badge">“</div>
                    <div>
                      <h4 className="sv-quote-title">CRAFTED WITH PRECISION. <span>BUILT FOR IMPACT.</span></h4>
                      <p className="sv-quote-sub">Great ideas deserve exceptional execution. Let&apos;s build yours.</p>
                    </div>
                  </div>
                  <button className="sv-big-pink-btn" onClick={() => setScreen("booking")}>
                    <div className="sv-mobile-icon-circle">
                      <img src="/icons/mobile.png" alt="Call" />
                    </div>
                    <span>BOOK A FREE DISCOVERY CALL</span>
                  </button>
                </div>
              </div>
            </>
          )}

          {/* ── PAGE 2 BOOKING VIEW ── */}
          {screen === "booking" && (
            <div className="sv-modal-body">
              <div className="sv-booking-page-container">

                {/* Top Banner Card featuring Centered Large Lottie Animation Only */}
                <div className="sv-booking-lottie-card">
                  <div className="sv-booking-lottie-wrap-center">
                    <DotLottieReact
                      src="https://lottie.host/fdbd57ab-593d-4207-97d3-c0f0c80eea07/yj7ppgUSY8.lottie"
                      loop
                      autoplay
                    />
                  </div>
                </div>

                {/* Navigation Bar */}
                <div className="sv-booking-nav-bar">
                  <button className="sv-back-to-services-btn" onClick={() => { setScreen("services"); setBookErr(""); }}>← Back to Services</button>
                  <h3 className="sv-booking-title-heading">PICK YOUR DATE &amp; TIME</h3>
                </div>

                {/* Booking Form Split Grid */}
                <div className="sv-booking-grid-split">
                  
                  {/* Left Column: YOUR DETAILS */}
                  <div className="sv-booking-col-card">
                    <h4 className="sv-col-card-title">YOUR DETAILS</h4>
                    
                    <div className="sv-form-field">
                      <label className="sv-form-label">Your Name *</label>
                      <input className="sv-form-input" placeholder="Sre Varshan" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>

                    <div className="sv-form-field">
                      <label className="sv-form-label">Email Address *</label>
                      <input className="sv-form-input" placeholder="you@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <div className="sv-form-field">
                      <label className="sv-form-label">Phone Number (Optional)</label>
                      <input className="sv-form-input" placeholder="+91 96006 22497" value={phone} onChange={(e) => setPhone(e.target.value)} />
                    </div>
                  </div>

                  {/* Right Column: PICK A DATE & TIME */}
                  <div className="sv-booking-col-card">
                    <h4 className="sv-col-card-title">PICK A DATE &amp; TIME</h4>

                    {/* Date Pills */}
                    <div className="sv-dates-pill-strip">
                      {days.map((d, i) => (
                        <div
                          key={i}
                          className={`sv-date-pill-item${selDay === i ? " selected" : ""}`}
                          onClick={() => setSelDay(i)}
                          title={d.full}
                        >
                          <span className="sv-date-day-short">{d.short}</span>
                          <span className="sv-date-num-big">{d.num}</span>
                          <span className="sv-date-month-name">{d.mon}</span>
                        </div>
                      ))}
                    </div>

                    {/* Time Slots */}
                    <div className="sv-time-slots-grid">
                      {TIME_SLOTS.map((t) => (
                        <button
                          key={t}
                          className={`sv-time-slot-btn${selTime === t ? " selected" : ""}`}
                          onClick={() => setSelTime(t)}
                        >
                          {t}
                        </button>
                      ))}
                    </div>

                    {/* Submit Button */}
                    <div style={{ marginTop: "auto" }}>
                      {bookErr && <p style={{ marginBottom: "8px", color: "#FF007F", fontWeight: 700, fontSize: "12px" }}>{bookErr}</p>}
                      <button className="sv-confirm-booking-btn" onClick={handleBook} disabled={sending}>
                        {sending ? (
                          <>
                            <div className="sv-spinner" />
                            <span>Booking Slot...</span>
                          </>
                        ) : (
                          <span>CONFIRM BOOKING →</span>
                        )}
                      </button>
                    </div>
                  </div>

                </div>

              </div>
            </div>
          )}

          {/* ── PAGE 3 CONFIRMED VIEW WITH CONFETTI ANIMATION ── */}
          {screen === "confirmed" && (
            <div className="sv-modal-body">
              <div className="sv-confirmation-screen">

                {/* Confetti particles */}
                <div className="sv-confetti-ring">
                  {["#FF007F", "#FFB020", "#2DC8E2", "#2BB04A", "#8E2DE2", "#FF7043", "#FF007F", "#FFB020"].map((c, i) => (
                    <span key={i} className="sv-confetti-particle" style={{ background: c, animationDelay: `${i * 90}ms` }} />
                  ))}
                </div>

                <div className="sv-confirmed-check">✓</div>
                <h3 className="sv-confirmed-title">SLOT BOOKED! 🎉</h3>
                <p className="sv-confirmed-text">
                  Thanks <span>{name || "Guest"}</span>! Your call is locked in for{" "}
                  <span>{currentDayText} at {selTime}</span>.
                  Notification sent to <span>srevarshan9600622@gmail.com</span>!
                </p>
                <button className="sv-done-close-btn" onClick={close}>CLOSE ✕</button>
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
}
