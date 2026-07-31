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
  for (let i = 1; i <= 7; i++) {
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

const SERVICES = [
  {
    icon: "/icons/website.png",
    title: "Website Development",
    accent: "#E22D6D",
    items: ["Static & Dynamic Websites", "Custom Web Applications", "Modern & Responsive Design"],
  },
  {
    icon: "/icons/Chatbot.png",
    title: "AI Chatbot Solutions",
    accent: "#2DC8E2",
    items: ["Smart AI Chatbots", "Custom Trained Models", "24/7 Automated Support"],
  },
  {
    icon: "/icons/automation.png",
    title: "AI Workflow Automation",
    accent: "#FFB020",
    items: ["Process Automation", "Business Workflow Design", "API Integrations"],
  },
  {
    icon: "/icons/Gen-Ai.png",
    title: "Generative AI Integration",
    accent: "#8E2DE2",
    items: ["LLM Integration (OpenAI, etc.)", "RAG Applications", "Prompt Engineering"],
  },
  {
    icon: "/icons/receipt.png",
    title: "Online E-Receipt Apps",
    accent: "#2BB04A",
    items: ["Payment Gateway", "Income Tracker", "Advanced Analytics"],
  },
  {
    icon: "/icons/Consult.png",
    title: "AI Consulting & Strategy",
    accent: "#FF7043",
    items: ["Technical Consultation", "Use Case Discovery", "Architecture Design"],
  },
];

export default function ServicesModal() {
  const [visible, setVisible]         = useState(false);
  const [screen, setScreen]           = useState<Screen>("services");
  const [selDay, setSelDay]           = useState<number | null>(null);
  const [name, setName]               = useState("");
  const [phone, setPhone]             = useState("");
  const [email, setEmail]             = useState("");
  const [bookErr, setBookErr]         = useState("");
  const [cardHover, setCardHover]     = useState<number | null>(null);
  const days = getNext7Days();

  useEffect(() => {
    if (typeof sessionStorage !== "undefined" && sessionStorage.getItem("sv-modal-v4")) return;
    const t = setTimeout(() => setVisible(true), 3000);
    return () => clearTimeout(t);
  }, []);

  const close = () => {
    setVisible(false);
    if (typeof sessionStorage !== "undefined") sessionStorage.setItem("sv-modal-v4", "1");
  };

  const handleBook = () => {
    if (selDay === null) { setBookErr("Please pick a date above."); return; }
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
        @keyframes sv-pulse-pink { 0%, 100% { box-shadow: 4px 4px 0 #1C202B, 0 0 0 0 rgba(226,45,109,0.5); } 50% { box-shadow: 4px 4px 0 #1C202B, 0 0 0 10px rgba(226,45,109,0); } }
        @keyframes sv-confetti-pop { 0% { transform: scale(0.6); opacity: 0; } 60% { transform: scale(1.1); } 100% { transform: scale(1); opacity: 1; } }

        .sv-modal-backdrop {
          position: fixed; inset: 0; z-index: 9999;
          background: rgba(15, 18, 24, 0.86);
          backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
          display: flex; align-items: center; justify-content: center;
          padding: 14px;
          animation: sv-modal-fade 0.3s ease;
        }

        .sv-modal-container {
          position: relative; width: 100%; max-width: 1040px;
          max-height: 94vh;
          background: #f3f1e5;
          border: 3px solid #1C202B;
          border-radius: 24px;
          box-shadow: 8px 8px 0 0 #1C202B;
          overflow: hidden;
          display: flex; flex-direction: column;
          animation: sv-modal-pop 0.35s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .sv-modal-close-btn {
          position: absolute; top: 14px; right: 14px; z-index: 50;
          width: 36px; height: 36px; border-radius: 50%;
          background: #1C202B; border: 2px solid #1C202B;
          color: #ffffff; font-family: 'Open Sans', sans-serif;
          font-size: 16px; font-weight: 900; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: background 150ms, transform 150ms;
          box-shadow: 2px 2px 0 0 #E22D6D;
        }
        .sv-modal-close-btn:hover { background: #E22D6D; transform: rotate(90deg); }

        /* ── Header with Lottie & Left Logo ── */
        .sv-modal-header {
          background: #ffffff;
          border-bottom: 3px solid #1C202B;
          padding: 14px 24px 18px;
          position: relative;
          display: flex; flex-direction: column; align-items: center;
          flex-shrink: 0;
        }

        /* Top Lottie Animation */
        .sv-lottie-top {
          width: 110px; height: 75px;
          margin-bottom: 2px;
          display: flex; align-items: center; justify-content: center;
        }

        .sv-header-row {
          width: 100%;
          display: flex; align-items: center; justify-content: space-between;
          gap: 16px;
        }

        .sv-header-left {
          display: flex; align-items: center; gap: 14px;
        }

        /* Left-aligned SV Logo */
        .sv-logo-badge {
          width: 48px; height: 48px; border-radius: 12px;
          background: #1C202B; border: 2.5px solid #1C202B;
          overflow: hidden; flex-shrink: 0;
          box-shadow: 3px 3px 0 0 #E22D6D;
          transform: rotate(-3deg);
          transition: transform 200ms;
        }
        .sv-logo-badge:hover { transform: rotate(0deg) scale(1.05); }
        .sv-logo-badge img { width: 100%; height: 100%; object-fit: cover; display: block; }

        .sv-header-info { text-align: left; }
        .sv-tagline-text {
          font-family: 'Open Sans', sans-serif;
          font-size: 11px; font-weight: 700; text-transform: uppercase;
          letter-spacing: 1.5px; color: #E22D6D; margin: 0 0 1px;
        }
        .sv-headline-title {
          font-family: 'Bangers', cursive;
          font-size: clamp(26px, 3.5vw, 38px);
          letter-spacing: 1.5px; line-height: 1;
          color: #1C202B; margin: 0 0 2px;
          text-transform: uppercase;
        }
        .sv-subtext-desc {
          font-family: 'Open Sans', sans-serif;
          font-size: 11.5px; color: rgba(28,32,43,0.75); margin: 0;
          max-width: 480px;
        }
        .sv-subtext-desc strong { color: #E22D6D; font-weight: 700; }

        .sv-header-badges {
          display: flex; gap: 10px; flex-wrap: wrap; align-items: center;
        }
        .sv-badge-pill {
          font-family: 'Open Sans', sans-serif;
          font-size: 10px; font-weight: 700; text-transform: uppercase;
          letter-spacing: 0.8px; color: #1C202B;
          background: #f3f1e5; border: 1.5px solid #1C202B;
          padding: 3px 10px; border-radius: 9999px;
          display: flex; align-items: center; gap: 4px;
        }
        .sv-badge-dot { width: 5px; height: 5px; background: #E22D6D; border-radius: 50%; }

        /* ── Main Body Section ── */
        .sv-modal-body {
          background: #1C202B;
          flex: 1; overflow-y: auto; overflow-x: hidden;
          padding: 16px 24px 18px;
          display: flex; flex-direction: column; gap: 12px;
          scrollbar-width: thin;
          scrollbar-color: rgba(255,255,255,0.2) transparent;
        }
        .sv-modal-body::-webkit-scrollbar { width: 5px; }
        .sv-modal-body::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 4px; }

        .sv-pill-header {
          display: flex; justify-content: center; margin-bottom: 2px;
        }
        .sv-section-tag {
          font-family: 'Open Sans', sans-serif;
          font-size: 9.5px; font-weight: 700; text-transform: uppercase;
          letter-spacing: 2px; color: #F3F1E5;
          background: rgba(255,255,255,0.06); border: 1.5px solid rgba(255,255,255,0.12);
          padding: 4px 18px; border-radius: 9999px;
        }

        /* ── Services Cards 3×2 Grid ── */
        .sv-cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }

        .sv-service-card {
          background: #ffffff;
          border: 2.5px solid #1C202B;
          border-radius: 16px;
          padding: 14px 16px 12px;
          box-shadow: 4px 4px 0 0 #1C202B;
          transition: transform 200ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 200ms;
          cursor: default; position: relative; overflow: hidden;
        }
        .sv-service-card:hover {
          transform: translateY(-4px);
          box-shadow: 6px 6px 0 0 #E22D6D;
        }
        .sv-card-icon-img {
          width: 38px; height: 38px;
          object-fit: contain; display: block;
          margin-bottom: 8px;
          transition: transform 200ms;
        }
        .sv-service-card:hover .sv-card-icon-img { transform: scale(1.15) rotate(-4deg); }

        .sv-card-title-text {
          font-family: 'Bangers', cursive;
          font-size: 17px; letter-spacing: 1px; color: #1C202B;
          margin: 0 0 6px; line-height: 1.1;
        }
        .sv-card-accent-bar {
          height: 3px; border-radius: 9999px; margin-bottom: 8px;
          width: 24px; transition: width 200ms;
        }
        .sv-service-card:hover .sv-card-accent-bar { width: 44px; }

        .sv-card-ul {
          list-style: none; margin: 0; padding: 0;
          display: flex; flex-direction: column; gap: 4px;
        }
        .sv-card-li {
          font-family: 'Open Sans', sans-serif;
          font-size: 11px; color: rgba(28,32,43,0.75);
          display: flex; align-items: flex-start; gap: 6px; line-height: 1.3;
        }
        .sv-card-bullet {
          width: 5px; height: 5px; border-radius: 50%; flex-shrink: 0; margin-top: 4px;
        }

        /* ── CTA Banner Row ── */
        .sv-cta-banner-row {
          background: #252a38;
          border: 2.5px solid #1C202B;
          border-radius: 16px;
          padding: 12px 20px;
          display: flex; align-items: center; justify-content: space-between;
          gap: 14px; flex-wrap: wrap; margin-top: auto;
          box-shadow: 4px 4px 0 0 #1C202B;
        }

        .sv-cta-left-content { display: flex; align-items: center; gap: 12px; }
        .sv-cta-icon-box {
          width: 40px; height: 40px; border-radius: 50%;
          background: #1C202B; border: 2px solid #E22D6D;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; box-shadow: 2px 2px 0 0 #E22D6D;
        }
        .sv-cta-icon-box img { width: 22px; height: 22px; object-fit: contain; }

        .sv-cta-heading {
          font-family: 'Bangers', cursive;
          font-size: 20px; letter-spacing: 1px; color: #ffffff; margin: 0 0 1px;
        }
        .sv-cta-subheading {
          font-family: 'Open Sans', sans-serif;
          font-size: 11px; color: rgba(255,255,255,0.6); margin: 0;
        }

        /* "Book a Call Now" Button with Mobile Icon */
        .sv-book-call-btn {
          background: #E22D6D;
          border: 2px solid #1C202B;
          border-radius: 12px;
          padding: 10px 22px;
          font-family: 'Bangers', cursive;
          font-size: 17px; letter-spacing: 1.5px; color: #ffffff;
          cursor: pointer; display: flex; align-items: center; gap: 9px;
          transition: background 150ms, transform 100ms, box-shadow 150ms;
          box-shadow: 4px 4px 0 0 #1C202B;
          animation: sv-pulse-pink 2.5s ease-out infinite;
          white-space: nowrap;
        }
        .sv-book-call-btn:hover {
          background: #c0224f; transform: translateY(-2px);
          box-shadow: 6px 6px 0 0 #1C202B;
        }
        .sv-book-call-btn:active { transform: translateY(0); }
        .sv-call-icon-img { width: 20px; height: 20px; object-fit: contain; display: block; filter: brightness(0) invert(1); }

        /* ── Booking View ── */
        .sv-booking-view {
          display: flex; flex-direction: column; gap: 12px;
        }
        .sv-booking-header-row {
          display: flex; align-items: center; gap: 14px;
        }
        .sv-booking-title-text {
          font-family: 'Bangers', cursive;
          font-size: 24px; letter-spacing: 1.5px; color: #ffffff; margin: 0;
        }
        .sv-back-nav-btn {
          background: rgba(255,255,255,0.08); border: 1.5px solid rgba(255,255,255,0.15);
          border-radius: 8px; padding: 4px 14px;
          font-family: 'Open Sans', sans-serif; font-size: 11px; font-weight: 700;
          color: #f3f1e5; cursor: pointer; text-transform: uppercase; transition: all 150ms;
        }
        .sv-back-nav-btn:hover { background: #E22D6D; border-color: #E22D6D; }

        .sv-calendar-strip {
          display: flex; gap: 8px; overflow-x: auto; padding-bottom: 4px; scrollbar-width: none;
        }
        .sv-calendar-strip::-webkit-scrollbar { display: none; }
        .sv-day-card-pill {
          flex-shrink: 0; display: flex; flex-direction: column; align-items: center;
          background: rgba(255,255,255,0.05); border: 2px solid rgba(255,255,255,0.1);
          border-radius: 14px; padding: 8px 14px; cursor: pointer; min-width: 60px;
          transition: all 180ms; font-family: 'Open Sans', sans-serif;
        }
        .sv-day-card-pill:hover { background: rgba(226,45,109,0.15); border-color: #E22D6D; transform: translateY(-2px); }
        .sv-day-card-pill.selected {
          background: #E22D6D; border-color: #1C202B;
          box-shadow: 3px 3px 0 0 #1C202B; transform: translateY(-2px);
        }
        .sv-day-short-name { font-size: 9px; font-weight: 700; text-transform: uppercase; color: rgba(255,255,255,0.6); }
        .sv-day-card-pill.selected .sv-day-short-name { color: #ffffff; }
        .sv-day-number { font-family: 'Bangers', cursive; font-size: 22px; color: #ffffff; line-height: 1; margin: 2px 0; }
        .sv-day-month-name { font-size: 9px; font-weight: 600; color: rgba(255,255,255,0.45); }
        .sv-day-card-pill.selected .sv-day-month-name { color: rgba(255,255,255,0.85); }

        .sv-selected-date-indicator {
          font-family: 'Open Sans', sans-serif; font-size: 11.5px; font-weight: 700;
          color: #E22D6D; min-height: 16px; margin: 0;
        }

        .sv-form-fields-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; }
        .sv-input-field-group { display: flex; flex-direction: column; gap: 4px; }
        .sv-input-label {
          font-family: 'Open Sans', sans-serif; font-size: 9.5px; font-weight: 700;
          text-transform: uppercase; letter-spacing: 1px; color: rgba(255,255,255,0.5);
        }
        .sv-form-input-element {
          background: rgba(255,255,255,0.06); border: 2px solid rgba(255,255,255,0.12);
          border-radius: 10px; padding: 9px 12px;
          font-family: 'Open Sans', sans-serif; font-size: 13px; color: #ffffff;
          outline: none; width: 100%; box-sizing: border-box; transition: border-color 150ms;
        }
        .sv-form-input-element:focus { border-color: #E22D6D; background: rgba(226,45,109,0.08); }

        .sv-form-error-msg { font-family: 'Open Sans', sans-serif; font-size: 11px; font-weight: 700; color: #E22D6D; margin: 0; }
        .sv-confirm-submit-btn {
          background: #E22D6D; border: 2px solid #1C202B; border-radius: 10px;
          padding: 10px 24px; font-family: 'Bangers', cursive; font-size: 17px;
          letter-spacing: 1px; color: #ffffff; cursor: pointer;
          box-shadow: 3px 3px 0 0 #1C202B; transition: all 150ms;
        }
        .sv-confirm-submit-btn:hover { background: #c0224f; transform: translateY(-2px); box-shadow: 5px 5px 0 0 #1C202B; }

        /* Confirmed View */
        .sv-confirmation-wrap {
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          padding: 20px 12px; text-align: center; gap: 12px;
        }
        .sv-confirmed-check-circle {
          width: 64px; height: 64px; border-radius: 50%;
          background: #2BB04A; border: 3px solid #1C202B;
          box-shadow: 4px 4px 0 0 #1C202B;
          display: flex; align-items: center; justify-content: center;
          animation: sv-confetti-pop 0.5s ease;
          font-size: 32px; color: #ffffff; font-weight: bold;
        }
        .sv-confirmed-heading {
          font-family: 'Bangers', cursive; font-size: 32px; letter-spacing: 1.5px; color: #ffffff; margin: 0;
        }
        .sv-confirmed-desc {
          font-family: 'Open Sans', sans-serif; font-size: 13px; color: rgba(255,255,255,0.7);
          max-width: 340px; line-height: 1.5; margin: 0;
        }
        .sv-confirmed-desc span { color: #E22D6D; font-weight: 700; }
        .sv-close-done-btn {
          background: #E22D6D; border: 2px solid #1C202B; border-radius: 10px;
          padding: 8px 24px; font-family: 'Bangers', cursive; font-size: 16px;
          color: #ffffff; cursor: pointer; box-shadow: 3px 3px 0 0 #1C202B;
        }

        /* ══════════════════════════════════════════
           MOBILE RESPONSIVENESS OVERHAUL
        ══════════════════════════════════════════ */
        @media (max-width: 820px) {
          .sv-cards-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; }
          .sv-form-fields-grid { grid-template-columns: 1fr 1fr; }
          .sv-modal-header { padding: 12px 18px 14px; }
          .sv-modal-body { padding: 12px 16px 14px; }
        }

        @media (max-width: 600px) {
          .sv-modal-backdrop { padding: 8px; }
          .sv-modal-container { border-radius: 18px; max-height: 96vh; }
          
          /* Compact Header Layout for Mobile */
          .sv-modal-header { padding: 10px 14px 12px; }
          .sv-lottie-top { width: 70px; height: 50px; margin-bottom: 0; }
          .sv-logo-badge { width: 38px; height: 38px; }
          .sv-headline-title { font-size: 22px; letter-spacing: 1px; }
          .sv-tagline-text { font-size: 9.5px; }
          .sv-subtext-desc { display: none; } /* Hide heavy subtext on small screens */
          .sv-header-badges { display: none; }

          /* Mobile Grid */
          .sv-cards-grid { grid-template-columns: 1fr; gap: 8px; }
          .sv-service-card { padding: 12px 14px; }
          .sv-card-icon-img { width: 30px; height: 30px; margin-bottom: 6px; }
          .sv-card-title-text { font-size: 15px; margin-bottom: 4px; }
          .sv-card-accent-bar { display: none; }
          .sv-card-ul { gap: 2px; }
          .sv-card-li { font-size: 10.5px; }

          .sv-modal-body { padding: 10px 12px 12px; }
          .sv-pill-header { padding-bottom: 4px; }

          /* Mobile CTA Banner */
          .sv-cta-banner-row { padding: 10px 12px; flex-direction: column; align-items: stretch; gap: 8px; }
          .sv-cta-left-content { gap: 10px; }
          .sv-cta-icon-box { width: 34px; height: 34px; }
          .sv-cta-icon-box img { width: 18px; height: 18px; }
          .sv-cta-heading { font-size: 17px; }
          .sv-cta-subheading { font-size: 10px; }
          .sv-book-call-btn { width: 100%; justify-content: center; padding: 10px 16px; font-size: 15px; }

          /* Mobile Form */
          .sv-form-fields-grid { grid-template-columns: 1fr; }
          .sv-confirm-submit-btn { width: 100%; justify-content: center; }
        }
      `}</style>

      <div className="sv-modal-backdrop" onClick={(e) => { if (e.target === e.currentTarget) close(); }}>
        <div className="sv-modal-container">

          {/* Close button */}
          <button className="sv-modal-close-btn" onClick={close} aria-label="Close modal">
            ✕
          </button>

          {/* ── HEADER ── */}
          <div className="sv-modal-header">
            {/* Lottie Animation at Top */}
            <div className="sv-lottie-top">
              <DotLottieReact
                src="https://lottie.host/fdbd57ab-593d-4207-97d3-c0f0c80eea07/yj7ppgUSY8.lottie"
                loop
                autoplay
              />
            </div>

            <div className="sv-header-row">
              {/* Left-aligned SV Logo & Header Text */}
              <div className="sv-header-left">
                <div className="sv-logo-badge">
                  <img src="/Portfolio-favi.png" alt="Sre Varshan" />
                </div>
                <div className="sv-header-info">
                  <p className="sv-tagline-text">Let&apos;s build something</p>
                  <h2 className="sv-headline-title">Extraordinary</h2>
                  <p className="sv-subtext-desc">
                    I help startups &amp; teams turn ideas into <strong>AI-powered solutions</strong> at affordable prices.
                  </p>
                </div>
              </div>

              {/* Badges on right side */}
              <div className="sv-header-badges">
                {["Clean Code", "Scalable Solutions", "Modern AI", "Real Results"].map((b) => (
                  <span className="sv-badge-pill" key={b}>
                    <span className="sv-badge-dot" /> {b}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* ── BODY ── */}
          <div className="sv-modal-body">

            {/* Services View */}
            {screen === "services" && (
              <>
                <div className="sv-pill-header">
                  <span className="sv-section-tag">How I can help you</span>
                </div>

                {/* 3×2 Services Grid */}
                <div className="sv-cards-grid">
                  {SERVICES.map((s, i) => (
                    <div
                      className="sv-service-card"
                      key={s.title}
                      onMouseEnter={() => setCardHover(i)}
                      onMouseLeave={() => setCardHover(null)}
                    >
                      <img className="sv-card-icon-img" src={s.icon} alt={s.title} />
                      <h3 className="sv-card-title-text">{s.title}</h3>
                      <div className="sv-card-accent-bar" style={{ background: s.accent }} />
                      <ul className="sv-card-ul">
                        {s.items.map((item) => (
                          <li className="sv-card-li" key={item}>
                            <span className="sv-card-bullet" style={{ background: s.accent }} />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* CTA Row */}
                <div className="sv-cta-banner-row">
                  <div className="sv-cta-left-content">
                    <div className="sv-cta-icon-box">
                      <img src="/icons/mobile.png" alt="Call icon" />
                    </div>
                    <div>
                      <h4 className="sv-cta-heading">Let&apos;s discuss your project</h4>
                      <p className="sv-cta-subheading">30-Min Free Discovery Call</p>
                    </div>
                  </div>
                  <button className="sv-book-call-btn" onClick={() => setScreen("booking")}>
                    <img className="sv-call-icon-img" src="/icons/mobile.png" alt="Call" />
                    BOOK A CALL NOW
                  </button>
                </div>
              </>
            )}

            {/* Booking View */}
            {screen === "booking" && (
              <div className="sv-booking-view">
                <div className="sv-booking-header-row">
                  <button className="sv-back-nav-btn" onClick={() => { setScreen("services"); setSelDay(null); }}>← Back</button>
                  <h3 className="sv-booking-title-text">Pick Your Date</h3>
                </div>

                <div className="sv-calendar-strip">
                  {days.map((d, i) => (
                    <div
                      key={i}
                      className={`sv-day-card-pill${selDay === i ? " selected" : ""}`}
                      onClick={() => setSelDay(i)}
                      title={d.full}
                    >
                      <span className="sv-day-short-name">{d.short}</span>
                      <span className="sv-day-number">{d.num}</span>
                      <span className="sv-day-month-name">{d.mon}</span>
                    </div>
                  ))}
                </div>

                <p className="sv-selected-date-indicator">
                  {selDay !== null ? `✓ Selected: ${days[selDay].full}` : "Select a date above"}
                </p>

                <div className="sv-form-fields-grid">
                  <div className="sv-input-field-group">
                    <label className="sv-input-label">Your Name *</label>
                    <input className="sv-form-input-element" placeholder="Sre Varshan" value={name} onChange={(e) => setName(e.target.value)} />
                  </div>
                  <div className="sv-input-field-group">
                    <label className="sv-input-label">Phone Number</label>
                    <input className="sv-form-input-element" placeholder="+91 96006 22497" value={phone} onChange={(e) => setPhone(e.target.value)} />
                  </div>
                  <div className="sv-input-field-group">
                    <label className="sv-input-label">Email Address *</label>
                    <input className="sv-form-input-element" placeholder="you@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                  <p className="sv-form-error-msg">{bookErr}</p>
                  <button className="sv-confirm-submit-btn" onClick={handleBook}>
                    Confirm Booking →
                  </button>
                </div>
              </div>
            )}

            {/* Confirmed View */}
            {screen === "confirmed" && (
              <div className="sv-confirmation-wrap">
                <div className="sv-confirmed-check-circle">✓</div>
                <h3 className="sv-confirmed-heading">Slot Booked! 🎉</h3>
                <p className="sv-confirmed-desc">
                  Thanks <span>{name}</span>! Your call is locked in for{" "}
                  <span>{selDay !== null ? days[selDay].full : "your chosen date"}</span>.{" "}
                  I&apos;ll reach out to you soon!
                </p>
                <button className="sv-close-done-btn" onClick={close}>Close ✕</button>
              </div>
            )}

          </div>
        </div>
      </div>
    </>
  );
}
