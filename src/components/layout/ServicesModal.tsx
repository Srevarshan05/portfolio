"use client";

import { useEffect, useState } from "react";

type Screen = "services" | "booking" | "confirmed";

function getNext7Days() {
  const result = [];
  const DAY  = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  const MON  = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  for (let i = 1; i <= 7; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    result.push({ 
      short: DAY[d.getDay()], 
      num: d.getDate(), 
      mon: MON[d.getMonth()],
      full: d.toLocaleDateString("en-IN", { weekday:"long", year:"numeric", month:"long", day:"numeric" }) 
    });
  }
  return result;
}

const SERVICES = [
  { icon: "language",     title: "Website Development",           items: ["Static & Dynamic Websites","Custom Web Applications","Modern & Responsive Design"] },
  { icon: "forum",        title: "AI Chatbot Solutions",          items: ["Smart AI Chatbots","Custom Trained Models","24/7 Automated Support"] },
  { icon: "account_tree", title: "AI Workflow Automation",        items: ["Process Automation","Business Workflow Design","API Integrations"] },
  { icon: "memory",       title: "Generative AI Integration",     items: ["LLM Integration (OpenAI, etc.)","RAG Applications","Prompt Engineering"] },
  { icon: "receipt_long", title: "Online E-Receipt Applications", items: ["Payment Gateway","Income Tracker","Advanced Analytics"] },
  { icon: "lightbulb",    title: "AI Consulting & Strategy",      items: ["Technical Consultation","Use Case Discovery","Architecture Design"] },
];

export default function ServicesModal() {
  const [visible,  setVisible]  = useState(false);
  const [screen,   setScreen]   = useState<Screen>("services");
  const [selDay,   setSelDay]   = useState<number | null>(null);
  const [name,     setName]     = useState("");
  const [phone,    setPhone]    = useState("");
  const [email,    setEmail]    = useState("");
  const [bookErr,  setBookErr]  = useState("");
  const days = getNext7Days();

  useEffect(() => {
    if (typeof sessionStorage !== "undefined" && sessionStorage.getItem("sv-modal-v3")) return;
    const t = setTimeout(() => setVisible(true), 3000);
    return () => clearTimeout(t);
  }, []);

  const close = () => {
    setVisible(false);
    if (typeof sessionStorage !== "undefined") sessionStorage.setItem("sv-modal-v3", "1");
  };

  const handleBook = () => {
    if (selDay === null)   { setBookErr("Please pick a date above."); return; }
    if (!name.trim())      { setBookErr("Please enter your name."); return; }
    if (!email.trim())     { setBookErr("Please enter your email address."); return; }
    setBookErr("");
    setScreen("confirmed");
  };

  if (!visible) return null;

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />

      <style>{`
        @keyframes sv3-fade    { from{opacity:0} to{opacity:1} }
        @keyframes sv3-up      { from{opacity:0;transform:translateY(24px) scale(0.98)} to{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes sv3-pop     { 0%{transform:scale(.5);opacity:0} 65%{transform:scale(1.1)} 100%{transform:scale(1);opacity:1} }
        @keyframes sv3-pulse   { 0%,100%{box-shadow:0 0 0 0 rgba(255,0,127,.5)} 60%{box-shadow:0 0 0 10px rgba(255,0,127,0)} }

        .sv3-backdrop {
          position: fixed; inset: 0; z-index: 9999;
          background: rgba(0, 0, 0, 0.82);
          backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
          display: flex; align-items: center; justify-content: center;
          padding: 12px;
          animation: sv3-fade 0.3s ease;
        }

        .sv3-modal {
          position: relative; width: 100%; max-width: 1020px;
          max-height: 92vh;
          background: #0f1115;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 32px 80px rgba(0,0,0,0.8), 0 0 0 1.5px rgba(255,0,127,0.2);
          display: flex; flex-direction: column;
          animation: sv3-up 0.35s cubic-bezier(.22,1,.36,1);
        }

        .sv3-close {
          position: absolute; top: 12px; right: 12px; z-index: 50;
          width: 34px; height: 34px; border-radius: 50%;
          background: #ffffff; border: none;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          box-shadow: 0 2px 10px rgba(0,0,0,0.3);
          transition: background 150ms, transform 150ms;
        }
        .sv3-close .ms { font-family: "Material Symbols Outlined"; font-size: 18px; color: #111; }
        .sv3-close:hover { background: #FF007F; transform: rotate(90deg); }
        .sv3-close:hover .ms { color: #ffffff; }

        /* ── Compact Header ── */
        .sv3-header {
          background: linear-gradient(135deg, #ffffff 0%, #fff2f6 55%, #ffe5ee 100%);
          padding: 18px 32px 34px;
          text-align: center;
          position: relative; overflow: hidden;
          clip-path: polygon(0 0, 100% 0, 100% calc(100% - 22px), 0 100%);
          flex-shrink: 0;
        }
        .sv3-header-inner {
          position: relative; z-index: 1;
          display: flex; flex-direction: column; align-items: center;
        }
        .sv3-logo-box {
          width: 48px; height: 48px; border-radius: 12px;
          background: #111; overflow: hidden;
          transform: rotate(-3deg);
          box-shadow: 0 6px 18px rgba(0,0,0,0.25);
          margin-bottom: 6px;
        }
        .sv3-logo-box img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .sv3-tagline {
          font-family: "Inter", sans-serif;
          font-size: 12px; font-weight: 600; font-style: italic;
          color: #FF007F; margin-bottom: 2px;
          text-decoration: underline text-decoration-color #FF007F;
          text-underline-offset: 3px;
        }
        .sv3-headline {
          font-family: "Inter", sans-serif;
          font-size: clamp(24px, 3.8vw, 38px);
          font-weight: 900; letter-spacing: -1.5px;
          line-height: 1; color: #11131b; margin: 0 0 4px;
          text-transform: uppercase;
        }
        .sv3-subtext {
          font-family: "Inter", sans-serif;
          font-size: 13px; line-height: 1.4;
          color: rgba(17,19,27,0.72);
          max-width: 520px; margin: 0 auto 8px;
        }
        .sv3-subtext strong { color: #FF007F; font-weight: 700; }
        .sv3-badges {
          display: flex; flex-wrap: wrap; justify-content: center; gap: 14px;
        }
        .sv3-badge {
          display: flex; align-items: center; gap: 5px;
          font-family: "Inter", sans-serif; font-size: 11px; font-weight: 600;
          color: rgba(17,19,27,0.7);
        }
        .sv3-badge .ms { font-family: "Material Symbols Outlined"; font-size: 15px; color: #FF007F; font-variation-settings: "FILL" 1; }

        /* ── Dark Content Container ── */
        .sv3-body {
          background: #0f1115;
          flex: 1; overflow-y: auto; overflow-x: hidden;
          display: flex; flex-direction: column;
          padding: 0 28px 20px;
          gap: 0;
          scrollbar-width: thin;
          scrollbar-color: rgba(255,255,255,0.15) transparent;
        }
        .sv3-body::-webkit-scrollbar { width: 4px; }
        .sv3-body::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.15); border-radius: 4px; }

        .sv3-pill-row { display: flex; justify-content: center; padding: 12px 0 10px; }
        .sv3-pill {
          background: transparent; border: 1.5px solid rgba(255,255,255,0.15);
          border-radius: 9999px; padding: 4px 18px;
          font-family: "Inter", sans-serif; font-size: 10px; font-weight: 700;
          letter-spacing: 2px; text-transform: uppercase;
          color: rgba(255,255,255,0.6);
        }

        /* Cards Grid */
        .sv3-grid {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin-bottom: 14px;
        }
        .sv3-card {
          background: #ffffff; border-radius: 18px;
          padding: 16px 18px 14px;
          position: relative; overflow: hidden;
          transition: transform 200ms cubic-bezier(.22,1,.36,1), box-shadow 200ms;
          box-shadow: 0 4px 14px rgba(0,0,0,0.15);
        }
        .sv3-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 28px rgba(255,0,127,0.18);
        }
        .sv3-card-glow {
          position: absolute; right: -16px; bottom: -16px;
          width: 54px; height: 54px; border-radius: 50%;
          background: rgba(255,0,127,0.12);
        }
        .sv3-icon-sq {
          width: 38px; height: 38px; border-radius: 10px;
          background: #11131b;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 10px;
        }
        .sv3-icon-sq .ms {
          font-family: "Material Symbols Outlined"; font-size: 20px; color: #ffffff;
        }
        .sv3-card-title {
          font-family: "Inter", sans-serif;
          font-size: 14px; font-weight: 800;
          color: #11131b; margin-bottom: 6px;
          line-height: 1.25;
        }
        .sv3-card-bar {
          width: 28px; height: 3px;
          background: #FF007F; border-radius: 9999px;
          margin-bottom: 8px;
        }
        .sv3-card-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 4px; }
        .sv3-card-item {
          display: flex; align-items: flex-start; gap: 6px;
          font-family: "Inter", sans-serif; font-size: 11px;
          color: rgba(17,19,27,0.72); line-height: 1.3;
        }
        .sv3-card-dot { width: 5px; height: 5px; border-radius: 50%; background: #FF007F; flex-shrink: 0; margin-top: 4px; }

        /* CTA Row */
        .sv3-cta {
          background: #151822; border: 1.5px solid rgba(255,255,255,0.08);
          border-radius: 16px; padding: 10px 18px;
          display: flex; align-items: center; justify-content: space-between;
          gap: 12px; flex-wrap: wrap; margin-top: auto;
        }
        .sv3-cta-left { display: flex; align-items: center; gap: 12px; }
        .sv3-cal-icon {
          width: 38px; height: 38px; border-radius: 50%;
          background: #202432; border: 1px solid rgba(255,255,255,0.1);
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .sv3-cal-icon .ms { font-family: "Material Symbols Outlined"; font-size: 20px; color: #FF007F; }
        .sv3-cta-title { font-family: "Inter", sans-serif; font-size: 15px; font-weight: 800; color: #ffffff; }
        .sv3-cta-sub   { font-family: "Inter", sans-serif; font-size: 11px; color: rgba(255,255,255,0.45); }
        .sv3-book-btn {
          display: flex; align-items: center; gap: 8px;
          background: #FF007F; border: none; border-radius: 12px;
          padding: 10px 22px; cursor: pointer;
          font-family: "Inter", sans-serif; font-size: 12px; font-weight: 700;
          letter-spacing: 1px; text-transform: uppercase; color: #ffffff;
          white-space: nowrap;
          transition: background 150ms, transform 120ms, box-shadow 150ms;
          box-shadow: 0 0 16px rgba(255,0,127,0.4);
          animation: sv3-pulse 2.5s ease-out infinite;
        }
        .sv3-book-btn .ms { font-family: "Material Symbols Outlined"; font-size: 18px; }
        .sv3-book-btn:hover { background: #e6006d; transform: translateY(-2px); box-shadow: 0 0 28px rgba(255,0,127,0.6); }

        /* ── Booking View ── */
        .sv3-booking {
          display: flex; flex-direction: column; gap: 12px;
          padding-top: 4px;
        }
        .sv3-bk-head {
          display: flex; align-items: center; gap: 12px;
          font-family: "Inter", sans-serif; font-size: 18px; font-weight: 800; color: #ffffff;
        }
        .sv3-back {
          background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.12);
          border-radius: 8px; padding: 4px 12px;
          font-family: "Inter", sans-serif; font-size: 11px; font-weight: 700;
          color: rgba(255,255,255,0.7); cursor: pointer; text-transform: uppercase;
        }
        .sv3-back:hover { background: rgba(255,255,255,0.16); color: #ffffff; }

        .sv3-days { display: flex; gap: 8px; overflow-x: auto; padding-bottom: 4px; scrollbar-width: none; }
        .sv3-days::-webkit-scrollbar { display: none; }
        .sv3-day {
          flex-shrink: 0; display: flex; flex-direction: column; align-items: center;
          background: rgba(255,255,255,0.05); border: 1.5px solid rgba(255,255,255,0.1);
          border-radius: 14px; padding: 8px 14px; cursor: pointer; min-width: 60px;
          transition: all 180ms ease;
          font-family: "Inter", sans-serif;
        }
        .sv3-day:hover { background: rgba(255,0,127,0.12); border-color: rgba(255,0,127,0.4); }
        .sv3-day.on { background: #FF007F; border-color: #FF007F; box-shadow: 0 4px 16px rgba(255,0,127,0.4); }
        .sv3-day-short { font-size: 9px; font-weight: 700; text-transform: uppercase; color: rgba(255,255,255,0.5); }
        .sv3-day.on .sv3-day-short { color: rgba(255,255,255,0.9); }
        .sv3-day-num { font-size: 22px; font-weight: 900; color: #ffffff; line-height: 1; margin: 2px 0; }
        .sv3-day-mon { font-size: 9px; font-weight: 600; color: rgba(255,255,255,0.4); }
        .sv3-day.on .sv3-day-mon { color: rgba(255,255,255,0.8); }

        .sv3-sel-label {
          font-family: "Inter", sans-serif; font-size: 11px; font-weight: 700;
          color: #FF007F; min-height: 16px;
        }

        .sv3-fields { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; }
        .sv3-field { display: flex; flex-direction: column; gap: 4px; }
        .sv3-flabel {
          font-family: "Inter", sans-serif; font-size: 9px; font-weight: 700;
          text-transform: uppercase; letter-spacing: 1px; color: rgba(255,255,255,0.4);
        }
        .sv3-finput {
          background: rgba(255,255,255,0.06); border: 1.5px solid rgba(255,255,255,0.12);
          border-radius: 10px; padding: 9px 12px;
          font-family: "Inter", sans-serif; font-size: 13px; color: #ffffff;
          outline: none; width: 100%; box-sizing: border-box;
        }
        .sv3-finput:focus { border-color: #FF007F; background: rgba(255,0,127,0.08); }
        .sv3-err { font-family: "Inter", sans-serif; font-size: 11px; font-weight: 700; color: #FF007F; min-height: 16px; }
        .sv3-confirm {
          align-self: flex-end; display: flex; align-items: center; gap: 8px;
          background: #FF007F; border: none; border-radius: 10px;
          padding: 10px 24px; cursor: pointer;
          font-family: "Inter", sans-serif; font-size: 13px; font-weight: 700;
          letter-spacing: 1px; color: #ffffff;
          box-shadow: 0 0 16px rgba(255,0,127,0.4);
        }
        .sv3-confirm:hover { background: #e6006d; }
        .sv3-confirm .ms { font-family: "Material Symbols Outlined"; font-size: 16px; }

        /* Confirmed View */
        .sv3-conf-wrap {
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          padding: 24px 12px; text-align: center; gap: 14px;
        }
        .sv3-check {
          width: 70px; height: 70px; border-radius: 50%;
          background: linear-gradient(135deg, #FF007F, #8E2DE2);
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 0 36px rgba(255,0,127,0.5);
          animation: sv3-pop 0.5s ease;
        }
        .sv3-check .ms { font-family: "Material Symbols Outlined"; font-size: 36px; color: #ffffff; font-variation-settings: "FILL" 1; }
        .sv3-conf-title { font-family: "Inter", sans-serif; font-size: clamp(24px, 4vw, 36px); font-weight: 900; color: #ffffff; }
        .sv3-conf-sub { font-family: "Inter", sans-serif; font-size: 13px; color: rgba(255,255,255,0.6); max-width: 320px; line-height: 1.5; }
        .sv3-conf-sub span { color: #FF007F; font-weight: 700; }
        .sv3-conf-close {
          background: #FF007F; border: none; border-radius: 10px; padding: 10px 24px; cursor: pointer;
          font-family: "Inter", sans-serif; font-size: 13px; font-weight: 700; color: #ffffff;
        }

        /* ══════════════════════════════════════════
           MOBILE RESPONSIVENESS OVERHAUL (Mobile Phones & Tablets)
        ══════════════════════════════════════════ */
        @media (max-width: 820px) {
          .sv3-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; }
          .sv3-fields { grid-template-columns: 1fr 1fr; }
          .sv3-header { padding: 16px 20px 28px; }
          .sv3-body { padding: 0 18px 18px; }
        }

        @media (max-width: 600px) {
          .sv3-backdrop { padding: 8px; }
          .sv3-modal { border-radius: 18px; max-height: 95vh; }
          
          /* Compact Header Layout for Mobile */
          .sv3-header { padding: 14px 16px 24px; text-align: left; }
          .sv3-header-inner { flex-direction: row; align-items: center; gap: 12px; text-align: left; }
          .sv3-logo-box { width: 42px; height: 42px; margin-bottom: 0; flex-shrink: 0; }
          .sv3-headline { font-size: 22px; letter-spacing: -0.5px; margin: 0; }
          .sv3-tagline { font-size: 10px; margin-bottom: 1px; }
          .sv3-subtext { display: none; } /* Hide heavy subtext on small phones to save height */
          .sv3-badges { display: none; }  /* Hide extra badges on small mobile screens */

          /* Mobile Grid */
          .sv3-grid { grid-template-columns: 1fr; gap: 8px; }
          .sv3-card { padding: 12px 14px; border-radius: 14px; }
          .sv3-icon-sq { width: 32px; height: 32px; margin-bottom: 6px; border-radius: 8px; }
          .sv3-icon-sq .ms { font-size: 17px; }
          .sv3-card-title { font-size: 13px; margin-bottom: 4px; }
          .sv3-card-bar { display: none; }
          .sv3-card-list { gap: 2px; }
          .sv3-card-item { font-size: 10px; }

          .sv3-body { padding: 0 12px 14px; }
          .sv3-pill-row { padding: 8px 0 6px; }

          /* Mobile CTA Banner */
          .sv3-cta { padding: 10px 12px; flex-direction: column; align-items: stretch; gap: 8px; }
          .sv3-cta-left { gap: 10px; }
          .sv3-cal-icon { width: 32px; height: 32px; }
          .sv3-cal-icon .ms { font-size: 16px; }
          .sv3-cta-title { font-size: 13px; }
          .sv3-cta-sub { font-size: 10px; }
          .sv3-book-btn { width: 100%; justify-content: center; padding: 10px 16px; font-size: 11px; }

          /* Mobile Booking */
          .sv3-fields { grid-template-columns: 1fr; }
          .sv3-confirm { width: 100%; justify-content: center; }
        }
      `}</style>

      <div className="sv3-backdrop" onClick={(e) => { if (e.target === e.currentTarget) close(); }}>
        <div className="sv3-modal">

          {/* Close button */}
          <button className="sv3-close" onClick={close} aria-label="Close">
            <span className="ms">close</span>
          </button>

          {/* ── HEADER ── */}
          <div className="sv3-header">
            <div className="sv3-header-inner">
              <div className="sv3-logo-box">
                <img src="/Portfolio-favi.png" alt="Sre Varshan" />
              </div>
              <div>
                <p className="sv3-tagline">Let&apos;s build something</p>
                <h2 className="sv3-headline">Extraordinary</h2>
                <p className="sv3-subtext">
                  I help startups &amp; teams turn ideas into <strong>AI-powered solutions</strong> at affordable prices.
                </p>
                <div className="sv3-badges">
                  {["Clean Code", "Scalable Solutions", "Modern AI", "Real Results"].map((b) => (
                    <span className="sv3-badge" key={b}>
                      <span className="ms">check_circle</span>
                      {b}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── BODY ── */}
          <div className="sv3-body">

            {/* Services View */}
            {screen === "services" && (
              <>
                <div className="sv3-pill-row">
                  <span className="sv3-pill">How I can help you</span>
                </div>

                {/* 3×2 Grid */}
                <div className="sv3-grid">
                  {SERVICES.map((s) => (
                    <div className="sv3-card" key={s.title}>
                      <div className="sv3-card-glow" />
                      <div className="sv3-icon-sq">
                        <span className="ms">{s.icon}</span>
                      </div>
                      <div className="sv3-card-title">{s.title}</div>
                      <div className="sv3-card-bar" />
                      <ul className="sv3-card-list">
                        {s.items.map((item) => (
                          <li className="sv3-card-item" key={item}>
                            <span className="sv3-card-dot" />{item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* CTA Row */}
                <div className="sv3-cta">
                  <div className="sv3-cta-left">
                    <div className="sv3-cal-icon">
                      <span className="ms">calendar_month</span>
                    </div>
                    <div>
                      <div className="sv3-cta-title">Let&apos;s discuss your project</div>
                      <div className="sv3-cta-sub">30-Min Free Discovery Call</div>
                    </div>
                  </div>
                  <button className="sv3-book-btn" onClick={() => setScreen("booking")}>
                    <span className="ms">calendar_month</span>
                    BOOK A FREE CALL
                  </button>
                </div>
              </>
            )}

            {/* Booking View */}
            {screen === "booking" && (
              <div className="sv3-booking">
                <div className="sv3-bk-head">
                  <button className="sv3-back" onClick={() => { setScreen("services"); setSelDay(null); }}>← Back</button>
                  Pick Your Date
                </div>

                <div className="sv3-days">
                  {days.map((d, i) => (
                    <div
                      key={i}
                      className={`sv3-day${selDay === i ? " on" : ""}`}
                      onClick={() => setSelDay(i)}
                      title={d.full}
                    >
                      <span className="sv3-day-short">{d.short}</span>
                      <span className="sv3-day-num">{d.num}</span>
                      <span className="sv3-day-mon">{d.mon}</span>
                    </div>
                  ))}
                </div>

                <p className="sv3-sel-label">
                  {selDay !== null ? `✓ Selected: ${days[selDay].full}` : "Select a date above"}
                </p>

                <div className="sv3-fields">
                  <div className="sv3-field">
                    <label className="sv3-flabel">Your Name *</label>
                    <input className="sv3-finput" placeholder="Sre Varshan" value={name} onChange={(e) => setName(e.target.value)} />
                  </div>
                  <div className="sv3-field">
                    <label className="sv3-flabel">Phone Number</label>
                    <input className="sv3-finput" placeholder="+91 96006 22497" value={phone} onChange={(e) => setPhone(e.target.value)} />
                  </div>
                  <div className="sv3-field">
                    <label className="sv3-flabel">Email Address *</label>
                    <input className="sv3-finput" placeholder="you@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                  <p className="sv3-err">{bookErr}</p>
                  <button className="sv3-confirm" onClick={handleBook}>
                    Confirm Booking
                    <span className="ms">arrow_forward</span>
                  </button>
                </div>
              </div>
            )}

            {/* Confirmed View */}
            {screen === "confirmed" && (
              <div className="sv3-conf-wrap">
                <div className="sv3-check">
                  <span className="ms">check_circle</span>
                </div>
                <div className="sv3-conf-title">Slot Booked! 🎉</div>
                <p className="sv3-conf-sub">
                  Thanks <span>{name}</span>! Your call is locked in for{" "}
                  <span>{selDay !== null ? days[selDay].full : "your chosen date"}</span>.{" "}
                  I&apos;ll reach out to you soon!
                </p>
                <button className="sv3-conf-close" onClick={close}>Close ✕</button>
              </div>
            )}

          </div>
        </div>
      </div>
    </>
  );
}
