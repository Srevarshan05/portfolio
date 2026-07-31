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
  const days = getNext7Days();

  useEffect(() => {
    if (typeof sessionStorage !== "undefined" && sessionStorage.getItem("sv-modal-v5")) return;
    const t = setTimeout(() => setVisible(true), 3000);
    return () => clearTimeout(t);
  }, []);

  const close = () => {
    setVisible(false);
    if (typeof sessionStorage !== "undefined") sessionStorage.setItem("sv-modal-v5", "1");
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

        /* ── Top Header Image (Model-top-card.png) ── */
        .sv-top-card-banner {
          width: 100%;
          background: #ffffff;
          border-bottom: 3px solid #1C202B;
          display: flex; align-items: center; justify-content: center;
          overflow: hidden; flex-shrink: 0;
          padding: 10px 16px;
        }
        .sv-top-card-img {
          width: 100%;
          max-height: 210px;
          object-fit: contain;
          display: block;
        }

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

        /* "Let's Talk" Button Style */
        .sv-lets-talk-btn {
          background: #11131b;
          border: 1.5px solid rgba(255,255,255,0.25);
          border-radius: 10px;
          padding: 10px 24px;
          font-family: 'Open Sans', sans-serif;
          font-size: 14px; font-weight: 700;
          color: #ffffff; cursor: pointer;
          display: flex; align-items: center; gap: 10px;
          transition: all 150ms ease;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
          white-space: nowrap;
        }
        .sv-lets-talk-btn:hover {
          background: #E22D6D;
          border-color: #E22D6D;
          transform: translateY(-2px);
          box-shadow: 0 6px 18px rgba(226,45,109,0.4);
        }
        .sv-lets-talk-btn:active { transform: translateY(0); }

        /* ── Booking View ── */
        .sv-booking-view {
          display: flex; flex-direction: column; gap: 12px;
        }
        
        /* Top Lottie Animation in Booking Page */
        .sv-lottie-booking-top {
          width: 100%; height: 90px;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 2px;
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
          .sv-top-card-banner { padding: 8px 12px; }
          .sv-top-card-img { max-height: 160px; }
          .sv-modal-body { padding: 12px 16px 14px; }
        }

        @media (max-width: 600px) {
          .sv-modal-backdrop { padding: 8px; }
          .sv-modal-container { border-radius: 18px; max-height: 96vh; }
          
          /* Mobile Banner */
          .sv-top-card-banner { padding: 6px 8px; }
          .sv-top-card-img { max-height: 130px; }

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
          .sv-lets-talk-btn { width: 100%; justify-content: center; padding: 10px 16px; font-size: 14px; }

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

          {/* ── TOP BANNER IMAGE (Model-top-card.png) ── */}
          <div className="sv-top-card-banner">
            <img src="/icons/Model-top-card.png" alt="Sre Varshan - Let's build something Extraordinary" className="sv-top-card-img" />
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
                  {SERVICES.map((s) => (
                    <div className="sv-service-card" key={s.title}>
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
                  <button className="sv-lets-talk-btn" onClick={() => setScreen("booking")}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                    <span>Let&apos;s Talk</span>
                  </button>
                </div>
              </>
            )}

            {/* Booking View */}
            {screen === "booking" && (
              <div className="sv-booking-view">
                {/* Lottie Animation Moved to Booking Page Top */}
                <div className="sv-lottie-booking-top">
                  <DotLottieReact
                    src="https://lottie.host/fdbd57ab-593d-4207-97d3-c0f0c80eea07/yj7ppgUSY8.lottie"
                    loop
                    autoplay
                  />
                </div>

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
