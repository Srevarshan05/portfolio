"use client";

import { useEffect, useState } from "react";

type Screen = "services" | "booking" | "confirmed";

function getNext7Days() {
  const days = [];
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  for (let i = 1; i <= 7; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    days.push({
      dayName: dayNames[d.getDay()],
      date: d.getDate(),
      month: monthNames[d.getMonth()],
      full: d.toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" }),
    });
  }
  return days;
}

const SERVICES = [
  { icon: "🌐", title: "Website Development",       items: ["Static & Dynamic Websites", "Custom Web Apps"] },
  { icon: "🤖", title: "AI Chatbot Solutions",       items: ["Smart AI Chatbots", "24/7 Auto-Support"] },
  { icon: "⚙️", title: "AI Workflow Automation",    items: ["Process Automation", "API Integrations"] },
  { icon: "🧠", title: "Generative AI Integration",  items: ["LLM / RAG Apps", "Prompt Engineering"] },
  { icon: "🧾", title: "E-Receipt Applications",    items: ["Payment Gateways", "Advanced Analytics"] },
  { icon: "💡", title: "AI Consulting & Strategy",  items: ["Tech Consultation", "Architecture Design"] },
];

export default function ServicesModal() {
  const [visible, setVisible]         = useState(false);
  const [screen, setScreen]           = useState<Screen>("services");
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [name, setName]               = useState("");
  const [phone, setPhone]             = useState("");
  const [email, setEmail]             = useState("");
  const [cardHover, setCardHover]     = useState<number | null>(null);
  const [logoFloat, setLogoFloat]     = useState(false);
  const [bookError, setBookError]     = useState("");
  const days = getNext7Days();

  useEffect(() => {
    if (typeof sessionStorage !== "undefined" && sessionStorage.getItem("sv-services-seen")) return;
    const t = setTimeout(() => { setVisible(true); setLogoFloat(true); }, 3000);
    return () => clearTimeout(t);
  }, []);

  const close = () => {
    setVisible(false);
    if (typeof sessionStorage !== "undefined") sessionStorage.setItem("sv-services-seen", "1");
  };

  const handleBook = () => {
    if (!selectedDay) { setBookError("Please pick a date first."); return; }
    if (!name.trim())  { setBookError("Enter your name."); return; }
    if (!email.trim()) { setBookError("Enter your email."); return; }
    setBookError("");
    setScreen("confirmed");
  };

  if (!visible) return null;

  return (
    <>
      <style>{`
        @keyframes sv-fade  { from{opacity:0} to{opacity:1} }
        @keyframes sv-up    { from{opacity:0;transform:translateY(36px)} to{opacity:1;transform:translateY(0)} }
        @keyframes sv-float { 0%,100%{transform:rotate(-4deg) translateY(0)} 50%{transform:rotate(-4deg) translateY(-7px)} }
        @keyframes sv-spin  { to{transform:rotate(360deg)} }
        @keyframes sv-pop   { 0%{transform:scale(0.6);opacity:0} 60%{transform:scale(1.12)} 100%{transform:scale(1);opacity:1} }
        @keyframes sv-confetti {
          0%   { opacity:1; transform: translateY(0) rotate(0deg); }
          100% { opacity:0; transform: translateY(90px) rotate(720deg); }
        }
        @keyframes sv-slide-right { from{opacity:0;transform:translateX(-20px)} to{opacity:1;transform:translateX(0)} }
        @keyframes sv-slide-left  { from{opacity:0;transform:translateX(20px)}  to{opacity:1;transform:translateX(0)} }
        @keyframes sv-pulse-ring  { 0%{box-shadow:0 0 0 0 rgba(226,45,109,0.5)} 70%{box-shadow:0 0 0 14px rgba(226,45,109,0)} 100%{box-shadow:0 0 0 0 rgba(226,45,109,0)} }

        .sv-backdrop {
          position:fixed; inset:0;
          background:rgba(0,0,0,0.85);
          backdrop-filter:blur(8px);
          -webkit-backdrop-filter:blur(8px);
          z-index:9999;
          display:flex; align-items:center; justify-content:center;
          padding:12px;
          animation:sv-fade 0.35s ease;
        }
        .sv-modal {
          position:relative;
          width:100%; max-width:1060px;
          max-height:93vh;
          background:#f3f1e5;
          border-radius:28px;
          overflow:hidden;
          box-shadow:0 32px 80px rgba(0,0,0,0.6), 0 0 0 2px rgba(226,45,109,0.15);
          animation:sv-up 0.42s cubic-bezier(0.22,1,0.36,1);
          display:flex; flex-direction:column;
        }
        .sv-close {
          position:absolute; top:14px; right:14px; z-index:30;
          width:36px; height:36px;
          background:#1C202B; border:none; border-radius:50%;
          color:#fff; font-size:18px; font-weight:900;
          cursor:pointer; display:flex; align-items:center; justify-content:center;
          transition:background 150ms, transform 150ms;
          font-family:'Open Sans',sans-serif;
          box-shadow:0 2px 8px rgba(0,0,0,0.3);
        }
        .sv-close:hover { background:#E22D6D; transform:rotate(90deg); }

        /* ── Header ── */
        .sv-header {
          background:linear-gradient(135deg,#fff 0%,#fceef3 60%,#f3f1e5 100%);
          padding:18px 32px 14px;
          text-align:center;
          flex-shrink:0;
          border-bottom:2px solid rgba(28,32,43,0.07);
          position:relative;
          overflow:hidden;
        }
        .sv-header::before {
          content:''; position:absolute;
          width:260px; height:260px;
          background:radial-gradient(circle,rgba(226,45,109,0.12),transparent 70%);
          top:-80px; right:-60px; pointer-events:none;
        }
        .sv-header::after {
          content:''; position:absolute;
          width:180px; height:180px;
          background:radial-gradient(circle,rgba(28,32,43,0.06),transparent 70%);
          bottom:-60px; left:-40px; pointer-events:none;
        }
        .sv-header-inner { position:relative; z-index:1; display:flex; align-items:center; gap:20px; justify-content:center; flex-wrap:wrap; }
        .sv-logo {
          width:64px; height:64px; border-radius:14px; overflow:hidden;
          border:3px solid #1C202B;
          box-shadow:4px 4px 0 #E22D6D;
          animation: ${logoFloat ? "sv-float 3.2s ease-in-out infinite" : "none"};
          flex-shrink:0;
        }
        .sv-logo img { width:100%; height:100%; object-fit:cover; display:block; }
        .sv-header-text { text-align:left; }
        .sv-tagline {
          font-family:'Open Sans',sans-serif;
          font-size:11px; font-weight:700;
          text-transform:uppercase; letter-spacing:2px;
          color:#E22D6D; margin-bottom:2px;
        }
        .sv-headline {
          font-family:'Bangers',cursive;
          font-size:clamp(28px,4vw,46px);
          letter-spacing:2px; line-height:1;
          color:#1C202B; margin:0 0 4px;
        }
        .sv-subtext {
          font-family:'Open Sans',sans-serif;
          font-size:12px; color:rgba(28,32,43,0.7); margin:0;
          max-width:380px;
        }
        .sv-badges {
          display:flex; flex-wrap:wrap; gap:6px 14px;
          margin-top:8px;
        }
        .sv-badge {
          font-family:'Open Sans',sans-serif;
          font-size:10px; font-weight:700;
          text-transform:uppercase; letter-spacing:0.8px;
          color:#1C202B; display:flex; align-items:center; gap:5px;
        }
        .sv-badge-dot { width:6px;height:6px;background:#E22D6D;border-radius:50%; }

        /* ── Body (scrollable only on tiny screens) ── */
        .sv-body {
          background:#1C202B;
          flex:1; overflow:hidden;
          display:flex; flex-direction:column;
          padding:16px 28px 14px;
          gap:12px;
        }

        /* ── Section pill ── */
        .sv-pill-row { display:flex; justify-content:center; }
        .sv-pill {
          background:rgba(255,255,255,0.06);
          border:1.5px solid rgba(255,255,255,0.1);
          border-radius:9999px; padding:5px 20px;
          font-family:'Open Sans',sans-serif;
          font-size:9px; font-weight:700;
          letter-spacing:2px; text-transform:uppercase;
          color:rgba(243,241,229,0.6);
        }

        /* ── Service cards grid ── */
        .sv-grid {
          display:grid;
          grid-template-columns:repeat(3,1fr);
          gap:10px;
          flex:1;
        }
        .sv-card {
          background:rgba(255,255,255,0.04);
          border:1.5px solid rgba(255,255,255,0.06);
          border-radius:16px;
          padding:14px 16px 12px;
          cursor:default;
          transition:transform 220ms cubic-bezier(0.22,1,0.36,1),
                      background 220ms,
                      border-color 220ms,
                      box-shadow 220ms;
          position:relative; overflow:hidden;
        }
        .sv-card.hovered {
          transform:translateY(-4px) scale(1.01);
          background:rgba(226,45,109,0.08);
          border-color:rgba(226,45,109,0.4);
          box-shadow:0 8px 28px rgba(226,45,109,0.18), inset 0 0 0 1px rgba(226,45,109,0.2);
        }
        .sv-card::before {
          content:''; position:absolute;
          top:-30px; right:-30px;
          width:80px; height:80px;
          background:radial-gradient(circle,rgba(226,45,109,0.15),transparent 60%);
          pointer-events:none;
          opacity:0; transition:opacity 300ms;
        }
        .sv-card.hovered::before { opacity:1; }
        .sv-card-icon {
          font-size:22px; margin-bottom:8px;
          display:block;
          transition:transform 200ms;
        }
        .sv-card.hovered .sv-card-icon { transform:scale(1.2) rotate(-6deg); }
        .sv-card-title {
          font-family:'Bangers',cursive;
          font-size:17px; letter-spacing:1px;
          color:#f3f1e5; margin-bottom:6px; line-height:1.1;
        }
        .sv-card-bar {
          width:24px; height:2px; background:#E22D6D;
          border-radius:9999px; margin-bottom:8px;
          transition:width 220ms;
        }
        .sv-card.hovered .sv-card-bar { width:44px; }
        .sv-card-items { list-style:none; margin:0; padding:0; display:flex; flex-direction:column; gap:4px; }
        .sv-card-item {
          font-family:'Open Sans',sans-serif;
          font-size:10px; color:rgba(243,241,229,0.6);
          display:flex; align-items:center; gap:5px;
        }
        .sv-card-dot2 { width:4px;height:4px;background:#E22D6D;border-radius:50%;flex-shrink:0; }

        /* ── CTA Row ── */
        .sv-cta-row {
          display:flex; align-items:center; justify-content:space-between;
          gap:12px; flex-wrap:wrap;
          background:rgba(255,255,255,0.04);
          border:1.5px solid rgba(255,255,255,0.08);
          border-radius:14px; padding:12px 18px;
          flex-shrink:0;
        }
        .sv-cta-text {
          font-family:'Bangers',cursive;
          font-size:19px; letter-spacing:1px; color:#f3f1e5;
        }
        .sv-cta-sub {
          font-family:'Open Sans',sans-serif;
          font-size:10px; color:rgba(243,241,229,0.45);
          margin-top:2px;
        }
        .sv-book-btn {
          background:#E22D6D; border:none; border-radius:10px;
          padding:10px 22px;
          font-family:'Bangers',cursive; font-size:16px; letter-spacing:1.5px;
          color:#fff; cursor:pointer;
          display:flex; align-items:center; gap:8px;
          transition:background 150ms, transform 100ms, box-shadow 150ms;
          box-shadow:0 0 18px rgba(226,45,109,0.4);
          animation:sv-pulse-ring 2.4s ease-out infinite;
          white-space:nowrap;
        }
        .sv-book-btn:hover { background:#c0224f; transform:translateY(-2px); box-shadow:0 0 30px rgba(226,45,109,0.6); }
        .sv-book-btn:active { transform:translateY(0); }

        /* ── Booking Screen ── */
        .sv-booking {
          display:flex; flex-direction:column; gap:12px; height:100%;
          animation:sv-slide-left 0.35s cubic-bezier(0.22,1,0.36,1);
        }
        .sv-booking-title {
          font-family:'Bangers',cursive; font-size:26px;
          letter-spacing:2px; color:#f3f1e5;
          display:flex; align-items:center; gap:12px;
        }
        .sv-back-btn {
          background:rgba(255,255,255,0.07); border:1.5px solid rgba(255,255,255,0.1);
          border-radius:8px; padding:4px 12px;
          font-family:'Open Sans',sans-serif; font-size:11px; font-weight:700;
          color:rgba(243,241,229,0.6); cursor:pointer; transition:all 150ms;
        }
        .sv-back-btn:hover { background:rgba(255,255,255,0.12); color:#f3f1e5; }
        .sv-cal-days {
          display:flex; gap:8px; overflow-x:auto; padding-bottom:4px;
          scrollbar-width:none;
        }
        .sv-cal-days::-webkit-scrollbar { display:none; }
        .sv-day-pill {
          flex-shrink:0;
          display:flex; flex-direction:column; align-items:center;
          background:rgba(255,255,255,0.05);
          border:1.5px solid rgba(255,255,255,0.08);
          border-radius:12px; padding:10px 14px;
          cursor:pointer; min-width:64px;
          transition:all 200ms cubic-bezier(0.22,1,0.36,1);
          font-family:'Open Sans',sans-serif;
        }
        .sv-day-pill:hover {
          background:rgba(226,45,109,0.1);
          border-color:rgba(226,45,109,0.3);
          transform:translateY(-3px);
        }
        .sv-day-pill.selected {
          background:#E22D6D;
          border-color:#E22D6D;
          box-shadow:0 4px 16px rgba(226,45,109,0.4);
          transform:translateY(-3px) scale(1.05);
        }
        .sv-day-name { font-size:9px; font-weight:700; text-transform:uppercase; letter-spacing:1px; color:rgba(243,241,229,0.5); }
        .sv-day-pill.selected .sv-day-name { color:rgba(255,255,255,0.8); }
        .sv-day-num {
          font-family:'Bangers',cursive; font-size:24px; letter-spacing:1px;
          color:#f3f1e5; line-height:1.1;
        }
        .sv-day-month { font-size:9px; color:rgba(243,241,229,0.45); font-weight:600; }
        .sv-day-pill.selected .sv-day-month { color:rgba(255,255,255,0.7); }

        .sv-fields {
          display:grid; grid-template-columns:1fr 1fr 1fr; gap:10px;
          animation:sv-slide-right 0.4s 0.1s both cubic-bezier(0.22,1,0.36,1);
        }
        .sv-field {
          display:flex; flex-direction:column; gap:5px;
        }
        .sv-field-label {
          font-family:'Open Sans',sans-serif;
          font-size:9px; font-weight:700;
          text-transform:uppercase; letter-spacing:1.5px;
          color:rgba(243,241,229,0.45);
        }
        .sv-field-input {
          background:rgba(255,255,255,0.05);
          border:1.5px solid rgba(255,255,255,0.1);
          border-radius:10px; padding:9px 12px;
          font-family:'Open Sans',sans-serif; font-size:13px;
          color:#f3f1e5; outline:none;
          transition:border-color 150ms, background 150ms;
          width:100%; box-sizing:border-box;
        }
        .sv-field-input::placeholder { color:rgba(243,241,229,0.25); }
        .sv-field-input:focus {
          border-color:#E22D6D;
          background:rgba(226,45,109,0.05);
        }
        .sv-error {
          font-family:'Open Sans',sans-serif; font-size:11px;
          color:#E22D6D; font-weight:700; min-height:16px;
        }
        .sv-confirm-btn {
          background:#E22D6D; border:none; border-radius:12px;
          padding:12px 32px; align-self:flex-end;
          font-family:'Bangers',cursive; font-size:18px; letter-spacing:1.5px;
          color:#fff; cursor:pointer;
          transition:all 150ms;
          box-shadow:0 0 20px rgba(226,45,109,0.35);
          display:flex; align-items:center; gap:8px;
        }
        .sv-confirm-btn:hover { background:#c0224f; transform:translateY(-2px); }
        .sv-confirm-btn:disabled { opacity:0.4; cursor:not-allowed; transform:none; }

        /* ── Confirmation Screen ── */
        .sv-confirmed {
          display:flex; flex-direction:column;
          align-items:center; justify-content:center;
          height:100%; gap:16px;
          animation:sv-fade 0.5s ease;
        }
        .sv-checkmark {
          width:80px; height:80px; border-radius:50%;
          background:linear-gradient(135deg,#E22D6D,#8E2DE2);
          display:flex; align-items:center; justify-content:center;
          font-size:36px;
          animation:sv-pop 0.6s cubic-bezier(0.22,1,0.36,1);
          box-shadow:0 0 40px rgba(226,45,109,0.5);
        }
        .sv-conf-title {
          font-family:'Bangers',cursive;
          font-size:clamp(28px,5vw,44px); letter-spacing:2px;
          color:#f3f1e5; text-align:center;
        }
        .sv-conf-sub {
          font-family:'Open Sans',sans-serif;
          font-size:14px; color:rgba(243,241,229,0.6);
          text-align:center; max-width:320px; line-height:1.6;
        }
        .sv-conf-sub span { color:#E22D6D; font-weight:700; }
        .sv-confetti-wrap {
          position:absolute; top:30%; left:50%;
          transform:translateX(-50%);
          display:flex; gap:6px;
          pointer-events:none;
        }
        .sv-dot-conf {
          width:8px; height:8px; border-radius:50%;
          animation:sv-confetti 1.2s ease-out forwards;
        }
        .sv-close-conf {
          background:#E22D6D; border:none; border-radius:10px;
          padding:10px 28px; margin-top:8px;
          font-family:'Bangers',cursive; font-size:17px; letter-spacing:1px;
          color:#fff; cursor:pointer;
          transition:all 150ms;
        }
        .sv-close-conf:hover { background:#c0224f; transform:translateY(-2px); }

        /* ── Responsive ── */
        @media (max-width:860px) {
          .sv-grid { grid-template-columns:repeat(2,1fr); }
          .sv-fields { grid-template-columns:1fr 1fr; }
          .sv-header { padding:14px 20px 12px; }
          .sv-body { padding:12px 16px 12px; }
          .sv-headline { font-size:32px; }
        }
        @media (max-width:580px) {
          .sv-modal { border-radius:20px; max-height:96vh; }
          .sv-grid { grid-template-columns:repeat(2,1fr); gap:8px; }
          .sv-card { padding:10px 12px 10px; }
          .sv-card-title { font-size:14px; }
          .sv-header-inner { flex-direction:column; gap:10px; text-align:center; }
          .sv-header-text { text-align:center; }
          .sv-subtext { display:none; }
          .sv-fields { grid-template-columns:1fr; }
          .sv-confirm-btn { align-self:stretch; justify-content:center; }
          .sv-cta-row { flex-direction:column; align-items:flex-start; }
          .sv-book-btn { width:100%; justify-content:center; }
          .sv-logo { width:52px; height:52px; }
        }
        @media (max-width:400px) {
          .sv-grid { grid-template-columns:1fr 1fr; gap:6px; }
          .sv-card-items { display:none; }
        }
      `}</style>

      <div className="sv-backdrop" onClick={(e) => { if (e.target === e.currentTarget) close(); }}>
        <div className="sv-modal">

          {/* Close button */}
          <button className="sv-close" onClick={close} aria-label="Close">✕</button>

          {/* ── HEADER ── */}
          <div className="sv-header">
            <div className="sv-header-inner">
              <div className="sv-logo">
                <img src="/Portfolio-favi.png" alt="Sre Varshan" />
              </div>
              <div className="sv-header-text">
                <p className="sv-tagline">Let&apos;s build something</p>
                <h2 className="sv-headline">Extraordinary</h2>
                <p className="sv-subtext">
                  I turn ideas into <strong style={{ color: "#E22D6D" }}>AI-powered solutions</strong> at affordable prices.
                </p>
                <div className="sv-badges">
                  {["Clean Code", "Scalable", "Modern AI", "Real Results"].map((b) => (
                    <span className="sv-badge" key={b}>
                      <span className="sv-badge-dot" /> {b}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── BODY ── */}
          <div className="sv-body">

            {/* Services View */}
            {screen === "services" && (
              <>
                <div className="sv-pill-row">
                  <span className="sv-pill">How I can help you</span>
                </div>

                {/* 3×2 Cards Grid */}
                <div className="sv-grid">
                  {SERVICES.map((svc, i) => (
                    <div
                      key={svc.title}
                      className={`sv-card${cardHover === i ? " hovered" : ""}`}
                      onMouseEnter={() => setCardHover(i)}
                      onMouseLeave={() => setCardHover(null)}
                      style={{ animationDelay: `${i * 60}ms` }}
                    >
                      <span className="sv-card-icon">{svc.icon}</span>
                      <div className="sv-card-title">{svc.title}</div>
                      <div className="sv-card-bar" />
                      <ul className="sv-card-items">
                        {svc.items.map((item) => (
                          <li className="sv-card-item" key={item}>
                            <span className="sv-card-dot2" /> {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* CTA Row */}
                <div className="sv-cta-row">
                  <div>
                    <div className="sv-cta-text">Ready to work together?</div>
                    <div className="sv-cta-sub">Book a free 30-min discovery call</div>
                  </div>
                  <button className="sv-book-btn" onClick={() => setScreen("booking")}>
                    📅 BOOK A FREE CALL
                  </button>
                </div>
              </>
            )}

            {/* Booking View */}
            {screen === "booking" && (
              <div className="sv-booking">
                <div className="sv-booking-title">
                  <button className="sv-back-btn" onClick={() => setScreen("services")}>← Back</button>
                  Pick a Date
                </div>

                {/* 7-day calendar */}
                <div className="sv-cal-days">
                  {days.map((d, i) => (
                    <div
                      key={i}
                      className={`sv-day-pill${selectedDay === i ? " selected" : ""}`}
                      onClick={() => setSelectedDay(i)}
                      title={d.full}
                    >
                      <span className="sv-day-name">{d.dayName}</span>
                      <span className="sv-day-num">{d.date}</span>
                      <span className="sv-day-month">{d.month}</span>
                    </div>
                  ))}
                </div>

                {selectedDay !== null && (
                  <p style={{ fontFamily: "'Open Sans',sans-serif", fontSize: "11px", color: "#E22D6D", fontWeight: 700, margin: 0 }}>
                    ✓ Selected: {days[selectedDay].full}
                  </p>
                )}

                {/* Fields */}
                <div className="sv-fields">
                  <div className="sv-field">
                    <label className="sv-field-label">Your Name *</label>
                    <input className="sv-field-input" placeholder="Sre Varshan" value={name} onChange={(e) => setName(e.target.value)} />
                  </div>
                  <div className="sv-field">
                    <label className="sv-field-label">Phone Number</label>
                    <input className="sv-field-input" placeholder="+91 96006 22497" value={phone} onChange={(e) => setPhone(e.target.value)} />
                  </div>
                  <div className="sv-field">
                    <label className="sv-field-label">Email Address *</label>
                    <input className="sv-field-input" placeholder="you@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
                  <p className="sv-error">{bookError}</p>
                  <button className="sv-confirm-btn" onClick={handleBook}>
                    Confirm Booking →
                  </button>
                </div>
              </div>
            )}

            {/* Confirmed View */}
            {screen === "confirmed" && (
              <div className="sv-confirmed">
                {/* Confetti dots */}
                <div className="sv-confetti-wrap">
                  {["#E22D6D","#FFB020","#2DC8E2","#2BB04A","#8E2DE2","#FF7043","#E22D6D","#FFB020"].map((c, i) => (
                    <span key={i} className="sv-dot-conf" style={{ background: c, animationDelay: `${i * 80}ms` }} />
                  ))}
                </div>
                <div className="sv-checkmark">✓</div>
                <div className="sv-conf-title">Slot Booked! 🎉</div>
                <p className="sv-conf-sub">
                  Thanks <span>{name || "there"}</span>! Your call is locked in for{" "}
                  <span>{selectedDay !== null ? days[selectedDay].full : "your chosen date"}</span>.
                  I&apos;ll reach out soon — looking forward to it!
                </p>
                <button className="sv-close-conf" onClick={close}>Close ✕</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
