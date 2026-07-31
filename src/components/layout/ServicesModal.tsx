"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const DotLottieReact = dynamic(
  () => import("@lottiefiles/dotlottie-react").then((mod) => mod.DotLottieReact),
  { ssr: false }
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
    accent: "#00b4d8",
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
    accent: "#00b4d8",
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
  const days = getNext7Days();

  useEffect(() => {
    if (typeof sessionStorage !== "undefined" && sessionStorage.getItem("sv-modal-v6")) return;
    const t = setTimeout(() => setVisible(true), 3000);
    return () => clearTimeout(t);
  }, []);

  const close = () => {
    setVisible(false);
    if (typeof sessionStorage !== "undefined") sessionStorage.setItem("sv-modal-v6", "1");
  };

  const handleBook = () => {
    if (!name.trim())    { setBookErr("Please enter your name."); return; }
    if (!email.trim())   { setBookErr("Please enter your email address."); return; }
    setBookErr("");
    setScreen("confirmed");
  };

  if (!visible) return null;

  return (
    <>
      <style>{`
        @keyframes sv-modal-fade { from { opacity:0; } to { opacity:1; } }
        @keyframes sv-modal-pop  { from { opacity:0; transform:scale(0.96) translateY(20px); } to { opacity:1; transform:scale(1) translateY(0); } }
        @keyframes sv-confetti-pop { 0% { transform: scale(0.6); opacity: 0; } 60% { transform: scale(1.1); } 100% { transform: scale(1); opacity: 1; } }

        .sv-modal-backdrop {
          position: fixed; inset: 0; z-index: 9999;
          background: rgba(12, 14, 21, 0.88);
          backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
          display: flex; align-items: center; justify-content: center;
          padding: 12px;
          animation: sv-modal-fade 0.3s ease;
        }

        .sv-modal-container {
          position: relative; width: 100%; max-width: 1060px;
          max-height: 94vh;
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

        /* ── Full Width Top Banner Image ── */
        .sv-top-banner-full {
          width: 100%;
          background: #ffffff;
          display: flex; align-items: center; justify-content: center;
          overflow: hidden; flex-shrink: 0;
          line-height: 0;
        }
        .sv-top-banner-full img {
          width: 100%;
          height: auto;
          max-height: 220px;
          object-fit: cover;
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
          font-size: 10px; font-weight: 800; text-transform: uppercase;
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
          font-family: 'Inter', sans-serif;
          font-size: 15px; font-weight: 900; letter-spacing: -0.2px; color: #11131b;
          margin: 0; line-height: 1.2; text-transform: uppercase;
        }

        .sv-card-ul {
          list-style: none; margin: 0; padding: 0;
          display: flex; flex-direction: column; gap: 5px;
        }
        .sv-card-li {
          font-family: 'Inter', sans-serif;
          font-size: 12px; color: rgba(17,19,27,0.78); font-weight: 600;
          display: flex; align-items: flex-start; gap: 7px; line-height: 1.35;
        }
        .sv-card-bullet {
          width: 6px; height: 6px; border-radius: 50%; background: #FF007F; flex-shrink: 0; margin-top: 5px;
        }

        /* ── Bottom CTA Banner Card ── */
        .sv-cta-banner-card {
          background: #171a24;
          border: 1.5px solid rgba(255,255,255,0.1);
          border-radius: 20px;
          padding: 16px 24px;
          display: flex; flex-direction: column; gap: 12px;
          margin-top: 4px;
        }

        .sv-cta-main-row {
          display: flex; align-items: center; justify-content: space-between;
          gap: 20px; flex-wrap: wrap;
        }

        .sv-cta-quote-left {
          display: flex; align-items: center; gap: 16px;
        }
        .sv-quote-icon-badge {
          font-family: 'Inter', sans-serif; font-size: 32px; font-weight: 900;
          color: #FF007F; line-height: 1; flex-shrink: 0;
        }
        .sv-quote-title {
          font-family: 'Inter', sans-serif;
          font-size: 14px; font-weight: 900; text-transform: uppercase;
          color: #ffffff; letter-spacing: 0.5px; margin: 0 0 2px;
        }
        .sv-quote-title span { color: #FF007F; }
        .sv-quote-sub {
          font-family: 'Inter', sans-serif;
          font-size: 12px; color: rgba(255,255,255,0.6); margin: 0;
        }

        /* Big Pink "BOOK A FREE DISCOVERY CALL" Button */
        .sv-big-pink-btn {
          background: linear-gradient(135deg, #FF007F 0%, #e6006d 100%);
          border: none;
          border-radius: 14px;
          padding: 14px 28px;
          font-family: 'Inter', sans-serif;
          font-size: 15px; font-weight: 900; font-style: italic;
          letter-spacing: 0.5px; text-transform: uppercase; color: #ffffff;
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

        /* Sub-bar badges */
        .sv-sub-badges-row {
          border-top: 1px solid rgba(255,255,255,0.08);
          padding-top: 10px;
          display: flex; align-items: center; justify-content: center; gap: 28px; flex-wrap: wrap;
          font-family: 'Inter', sans-serif; font-size: 11px; font-weight: 700; color: rgba(255,255,255,0.7);
        }
        .sv-sub-badge-item { display: flex; align-items: center; gap: 6px; }
        .sv-sub-badge-item span.pink { color: #FF007F; }

        /* Bottom note */
        .sv-bottom-trusted-note {
          text-align: center; font-family: 'Inter', sans-serif;
          font-size: 12px; color: rgba(255,255,255,0.6); margin-top: 2px;
          display: flex; align-items: center; justify-content: center; gap: 6px;
        }
        .sv-bottom-trusted-note span.pink { color: #FF007F; font-weight: 700; }

        /* ══════════════════════════════════════════
           PAGE 2: BOOKING SCREEN (Lottie Top + Split Layout)
        ══════════════════════════════════════════ */
        .sv-booking-page-container {
          display: flex; flex-direction: column; gap: 14px;
        }

        /* Top Lottie Card Banner for Booking Screen */
        .sv-booking-lottie-card {
          width: 100%;
          background: #ffffff;
          border-radius: 18px;
          padding: 12px;
          display: flex; align-items: center; justify-content: center;
          overflow: hidden;
          box-shadow: 0 4px 16px rgba(0,0,0,0.3);
          height: 140px;
        }
        .sv-booking-lottie-wrap {
          width: 160px; height: 120px;
          display: flex; align-items: center; justify-content: center;
        }

        /* Booking Header Row */
        .sv-booking-nav-bar {
          display: flex; align-items: center; justify-content: space-between;
        }
        .sv-booking-title-heading {
          font-family: 'Inter', sans-serif;
          font-size: 22px; font-weight: 900; letter-spacing: -0.5px; color: #ffffff; margin: 0;
          text-transform: uppercase;
        }
        .sv-back-to-services-btn {
          background: rgba(255,255,255,0.08); border: 1.5px solid rgba(255,255,255,0.15);
          border-radius: 10px; padding: 6px 16px;
          font-family: 'Inter', sans-serif; font-size: 12px; font-weight: 700;
          color: #ffffff; cursor: pointer; text-transform: uppercase; transition: all 150ms;
        }
        .sv-back-to-services-btn:hover { background: #FF007F; border-color: #FF007F; }

        /* Booking Form & Date Split Grid */
        .sv-booking-grid-split {
          display: grid; grid-template-columns: 1fr 1fr; gap: 16px;
        }

        .sv-booking-col-card {
          background: #171a24;
          border: 1.5px solid rgba(255,255,255,0.08);
          border-radius: 18px;
          padding: 18px;
          display: flex; flex-direction: column; gap: 12px;
        }
        .sv-col-card-title {
          font-family: 'Inter', sans-serif; font-size: 11px; font-weight: 800;
          text-transform: uppercase; letter-spacing: 1.5px; color: #FF007F;
          border-left: 3px solid #FF007F; padding-left: 8px; margin: 0;
        }

        /* Form Inputs */
        .sv-form-field { display: flex; flex-direction: column; gap: 4px; }
        .sv-form-label {
          font-family: 'Inter', sans-serif; font-size: 11px; font-weight: 700;
          color: rgba(255,255,255,0.7);
        }
        .sv-form-input {
          background: rgba(255,255,255,0.06); border: 1.5px solid rgba(255,255,255,0.12);
          border-radius: 10px; padding: 10px 14px;
          font-family: 'Inter', sans-serif; font-size: 13px; color: #ffffff;
          outline: none; width: 100%; box-sizing: border-box; transition: border-color 150ms;
        }
        .sv-form-input:focus { border-color: #FF007F; background: rgba(255,0,127,0.08); }

        /* Date Strip Pills */
        .sv-dates-pill-strip {
          display: flex; gap: 8px; overflow-x: auto; padding-bottom: 4px; scrollbar-width: none;
        }
        .sv-dates-pill-strip::-webkit-scrollbar { display: none; }
        .sv-date-pill-item {
          flex-shrink: 0; display: flex; flex-direction: column; align-items: center;
          background: rgba(255,255,255,0.05); border: 1.5px solid rgba(255,255,255,0.1);
          border-radius: 12px; padding: 8px 12px; cursor: pointer; min-width: 54px;
          transition: all 180ms; font-family: 'Inter', sans-serif;
        }
        .sv-date-pill-item:hover { background: rgba(255,0,127,0.15); border-color: #FF007F; transform: translateY(-2px); }
        .sv-date-pill-item.selected {
          background: #FF007F; border-color: #FF007F;
          box-shadow: 0 4px 14px rgba(255,0,127,0.4); transform: translateY(-2px);
        }
        .sv-date-day-short { font-size: 9px; font-weight: 700; text-transform: uppercase; color: rgba(255,255,255,0.5); }
        .sv-date-pill-item.selected .sv-date-day-short { color: #ffffff; }
        .sv-date-num-big { font-family: 'Inter', sans-serif; font-size: 20px; font-weight: 900; color: #ffffff; line-height: 1; margin: 2px 0; }
        .sv-date-month-name { font-size: 9px; font-weight: 600; color: rgba(255,255,255,0.4); }
        .sv-date-pill-item.selected .sv-date-month-name { color: rgba(255,255,255,0.85); }

        /* Time Slots Grid */
        .sv-time-slots-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px;
        }
        .sv-time-slot-btn {
          background: rgba(255,255,255,0.06); border: 1.5px solid rgba(255,255,255,0.1);
          border-radius: 10px; padding: 8px 6px;
          font-family: 'Inter', sans-serif; font-size: 11px; font-weight: 700;
          color: rgba(255,255,255,0.8); cursor: pointer; text-align: center;
          transition: all 150ms;
        }
        .sv-time-slot-btn:hover { background: rgba(255,0,127,0.15); border-color: #FF007F; }
        .sv-time-slot-btn.selected {
          background: #FF007F; border-color: #FF007F; color: #ffffff;
          box-shadow: 0 2px 10px rgba(255,0,127,0.4);
        }

        .sv-confirm-booking-btn {
          width: 100%;
          background: linear-gradient(135deg, #FF007F 0%, #e6006d 100%);
          border: none; border-radius: 12px;
          padding: 13px 28px;
          font-family: 'Inter', sans-serif; font-size: 15px; font-weight: 900;
          letter-spacing: 0.5px; text-transform: uppercase; color: #ffffff;
          cursor: pointer; box-shadow: 0 0 20px rgba(255,0,127,0.4);
          transition: all 150ms;
        }
        .sv-confirm-booking-btn:hover { transform: translateY(-2px); box-shadow: 0 0 30px rgba(255,0,127,0.6); }

        /* Confirmed Screen */
        .sv-confirmation-screen {
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          padding: 32px 16px; text-align: center; gap: 14px;
        }
        .sv-confirmed-check {
          width: 72px; height: 72px; border-radius: 50%;
          background: #2BB04A; border: 3px solid #ffffff;
          box-shadow: 0 0 30px rgba(43,176,74,0.5);
          display: flex; align-items: center; justify-content: center;
          font-size: 36px; color: #ffffff; font-weight: bold;
          animation: sv-confetti-pop 0.5s ease;
        }
        .sv-confirmed-title {
          font-family: 'Inter', sans-serif; font-size: 32px; font-weight: 900; color: #ffffff; margin: 0;
        }
        .sv-confirmed-text {
          font-family: 'Inter', sans-serif; font-size: 14px; color: rgba(255,255,255,0.7);
          max-width: 360px; line-height: 1.5; margin: 0;
        }
        .sv-confirmed-text span { color: #FF007F; font-weight: 700; }
        .sv-done-close-btn {
          background: #FF007F; border: none; border-radius: 12px;
          padding: 10px 28px; font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 700;
          color: #ffffff; cursor: pointer; box-shadow: 0 0 16px rgba(255,0,127,0.4);
        }

        /* ══════════════════════════════════════════
           MOBILE RESPONSIVENESS OVERHAUL
        ══════════════════════════════════════════ */
        @media (max-width: 840px) {
          .sv-cards-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; }
          .sv-booking-grid-split { grid-template-columns: 1fr; }
          .sv-top-banner-full img { max-height: 170px; }
          .sv-modal-body { padding: 12px 16px 16px; }
        }

        @media (max-width: 600px) {
          .sv-modal-backdrop { padding: 8px; }
          .sv-modal-container { border-radius: 18px; max-height: 96vh; }
          .sv-top-banner-full img { max-height: 130px; }

          .sv-cards-grid { grid-template-columns: 1fr; gap: 10px; }
          .sv-service-card { padding: 14px 16px; border-radius: 16px; }
          .sv-card-icon-img { width: 34px; height: 34px; margin-bottom: 0; }
          .sv-card-title-text { font-size: 14px; }
          .sv-card-li { font-size: 11px; }

          .sv-modal-body { padding: 10px 12px 14px; }

          .sv-cta-banner-card { padding: 12px 14px; }
          .sv-cta-main-row { flex-direction: column; align-items: stretch; gap: 10px; }
          .sv-big-pink-btn { width: 100%; justify-content: center; font-size: 13px; padding: 12px 18px; }

          .sv-booking-lottie-card { height: 110px; }
          .sv-booking-lottie-wrap { width: 130px; height: 90px; }
          .sv-booking-grid-split { grid-template-columns: 1fr; gap: 10px; }
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
              {/* Full Width Top Banner Image (Model-top-card.png) */}
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
                  <div className="sv-cta-main-row">
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

                  <div className="sv-sub-badges-row">
                    <div className="sv-sub-badge-item"><span className="pink">✓</span> 30-Minute Call</div>
                    <div className="sv-sub-badge-item"><span className="pink">✓</span> No Obligation</div>
                    <div className="sv-sub-badge-item"><span className="pink">✈️</span> Let&apos;s Discuss Your Idea</div>
                  </div>
                </div>

                {/* Bottom trusted note */}
                <div className="sv-bottom-trusted-note">
                  🛡️ Trusted by startups, founders &amp; businesses building <span className="pink">the future.</span>
                </div>
              </div>
            </>
          )}

          {/* ── PAGE 2 BOOKING VIEW ── */}
          {screen === "booking" && (
            <div className="sv-modal-body">
              <div className="sv-booking-page-container">

                {/* Top Lottie Animation Card (Replaces photo card) */}
                <div className="sv-booking-lottie-card">
                  <div className="sv-booking-lottie-wrap">
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
                      {bookErr && <p className="sv-form-error-msg" style={{ marginBottom: "8px" }}>{bookErr}</p>}
                      <button className="sv-confirm-booking-btn" onClick={handleBook}>
                        CONFIRM BOOKING →
                      </button>
                    </div>
                  </div>

                </div>

              </div>
            </div>
          )}

          {/* ── PAGE 3 CONFIRMED VIEW ── */}
          {screen === "confirmed" && (
            <div className="sv-modal-body">
              <div className="sv-confirmation-screen">
                <div className="sv-confirmed-check">✓</div>
                <h3 className="sv-confirmed-title">SLOT BOOKED! 🎉</h3>
                <p className="sv-confirmed-text">
                  Thanks <span>{name}</span>! Your call is scheduled for{" "}
                  <span>{days[selDay].full} at {selTime}</span>.
                  I&apos;ll reach out to you soon!
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
