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
    result.push({ short: DAY[d.getDay()], num: d.getDate(), mon: MON[d.getMonth()],
      full: d.toLocaleDateString("en-IN", { weekday:"long", year:"numeric", month:"long", day:"numeric" }) });
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
    if (typeof sessionStorage !== "undefined" && sessionStorage.getItem("sv-modal-v2")) return;
    const t = setTimeout(() => setVisible(true), 3000);
    return () => clearTimeout(t);
  }, []);

  const close = () => {
    setVisible(false);
    if (typeof sessionStorage !== "undefined") sessionStorage.setItem("sv-modal-v2", "1");
  };

  const handleBook = () => {
    if (selDay === null)   { setBookErr("Please pick a date."); return; }
    if (!name.trim())      { setBookErr("Enter your name."); return; }
    if (!email.trim())     { setBookErr("Enter your email."); return; }
    setBookErr("");
    setScreen("confirmed");
  };

  if (!visible) return null;

  return (
    <>
      {/* ── Fonts ── */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />

      <style>{`
        /* ── Animations ── */
        @keyframes sv2-fade    { from{opacity:0}          to{opacity:1} }
        @keyframes sv2-up      { from{opacity:0;transform:translateY(40px)} to{opacity:1;transform:translateY(0)} }
        @keyframes sv2-pop     { 0%{transform:scale(.5);opacity:0} 65%{transform:scale(1.1)} 100%{transform:scale(1);opacity:1} }
        @keyframes sv2-float   { 0%,100%{transform:rotate(-4deg) translateY(0)} 50%{transform:rotate(-4deg) translateY(-8px)} }
        @keyframes sv2-confetti{ 0%{opacity:1;transform:translateY(0) rotate(0)} 100%{opacity:0;transform:translateY(100px) rotate(720deg)} }
        @keyframes sv2-pulse   { 0%,100%{box-shadow:0 0 0 0 rgba(255,0,127,.5)} 60%{box-shadow:0 0 0 10px rgba(255,0,127,0)} }
        @keyframes sv2-stagger { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }

        /* ── Backdrop ── */
        .sv2-backdrop {
          position:fixed; inset:0; z-index:9999;
          background:rgba(0,0,0,.82);
          backdrop-filter:blur(6px); -webkit-backdrop-filter:blur(6px);
          display:flex; align-items:center; justify-content:center;
          padding:12px;
          animation:sv2-fade .35s ease;
        }

        /* ── Modal shell ── */
        .sv2-modal {
          position:relative; width:100%; max-width:1100px;
          max-height:94vh;
          background:#0f1115;
          border-radius:2rem;
          overflow:hidden;
          box-shadow:0 40px 100px rgba(0,0,0,.7);
          display:flex; flex-direction:column;
          animation:sv2-up .42s cubic-bezier(.22,1,.36,1);
        }

        /* ── Close btn ── */
        .sv2-close {
          position:absolute; top:18px; right:18px; z-index:50;
          width:38px; height:38px; border-radius:50%;
          background:#fff; border:none;
          display:flex; align-items:center; justify-content:center;
          cursor:pointer;
          box-shadow:0 2px 12px rgba(0,0,0,.25);
          transition:background 150ms, transform 150ms;
        }
        .sv2-close .ms { font-family:"Material Symbols Outlined"; font-size:20px; color:#111; }
        .sv2-close:hover { background:#f0f0f0; transform:rotate(90deg); }

        /* ══════════════════════════════════════════
           HEADER  (light pink gradient)
        ══════════════════════════════════════════ */
        .sv2-header {
          background:linear-gradient(135deg,#fff 0%,#fff5f8 60%,#ffe6ef 100%);
          padding:36px 48px 80px;
          text-align:center;
          position:relative; overflow:hidden;
          clip-path:polygon(0 0,100% 0,100% calc(100% - 44px),0 100%);
          flex-shrink:0;
        }
        /* subtle blobs */
        .sv2-header::before {
          content:""; position:absolute; inset:0; pointer-events:none;
          background:radial-gradient(circle at 90% 10%,rgba(255,0,127,.12) 0%,transparent 55%),
                     radial-gradient(circle at 10% 90%,rgba(255,0,127,.06) 0%,transparent 50%);
        }
        .sv2-header-inner { position:relative; z-index:1; display:flex; flex-direction:column; align-items:center; gap:0; }
        .sv2-logo-box {
          width:108px; height:108px; border-radius:20px;
          background:#111; overflow:hidden;
          transform:rotate(-4deg);
          box-shadow:0 16px 40px rgba(0,0,0,.35);
          margin-bottom:20px;
          animation:sv2-float 3.5s ease-in-out infinite;
        }
        .sv2-logo-box img { width:100%; height:100%; object-fit:cover; display:block; }
        .sv2-tagline-wrap { position:relative; margin-bottom:12px; display:inline-block; }
        .sv2-tagline {
          font-family:"Inter",sans-serif;
          font-size:15px; font-weight:600; font-style:italic;
          color:#FF007F; letter-spacing:.5px;
        }
        .sv2-tagline-line {
          position:absolute; bottom:-4px; left:0; width:100%; height:2px;
          background:linear-gradient(90deg,transparent,#FF007F,transparent);
        }
        .sv2-headline {
          font-family:"Inter",sans-serif;
          font-size:clamp(52px,7vw,82px);
          font-weight:900; letter-spacing:-3px;
          line-height:1; color:#1a1c20; margin:0 0 16px;
          text-transform:uppercase;
        }
        .sv2-subtext {
          font-family:"Inter",sans-serif;
          font-size:16px; line-height:1.55;
          color:rgba(26,28,32,.72);
          max-width:560px; margin:0 auto 20px;
        }
        .sv2-subtext strong { color:#FF007F; font-weight:700; }
        .sv2-badges {
          display:flex; flex-wrap:wrap; justify-content:center; gap:24px;
        }
        .sv2-badge {
          display:flex; align-items:center; gap:7px;
          font-family:"Inter",sans-serif; font-size:13px; font-weight:600;
          color:rgba(26,28,32,.65);
        }
        .sv2-badge .ms { font-family:"Material Symbols Outlined"; font-size:17px; color:#FF007F; font-variation-settings:"FILL" 1; }

        /* ══════════════════════════════════════════
           BODY  (dark)
        ══════════════════════════════════════════ */
        .sv2-body {
          background:#0f1115;
          flex:1; overflow-y:auto; overflow-x:hidden;
          display:flex; flex-direction:column;
          padding:0 40px 28px;
          gap:0;
          scrollbar-width:thin;
          scrollbar-color:rgba(255,255,255,.1) transparent;
        }
        .sv2-body::-webkit-scrollbar { width:4px; }
        .sv2-body::-webkit-scrollbar-thumb { background:rgba(255,255,255,.1); border-radius:4px; }

        /* pill */
        .sv2-pill-row { display:flex; justify-content:center; padding:20px 0 18px; }
        .sv2-pill {
          background:transparent; border:1.5px solid rgba(255,255,255,.15);
          border-radius:9999px; padding:8px 26px;
          font-family:"Inter",sans-serif; font-size:11px; font-weight:700;
          letter-spacing:2.5px; text-transform:uppercase;
          color:rgba(255,255,255,.55);
        }

        /* ── Cards grid ── */
        .sv2-grid {
          display:grid; grid-template-columns:repeat(3,1fr);
          gap:20px;
          margin-bottom:28px;
        }
        .sv2-card {
          background:#fff; border-radius:22px;
          padding:28px 24px 22px;
          position:relative; overflow:hidden;
          transition:transform 240ms cubic-bezier(.22,1,.36,1), box-shadow 240ms;
          cursor:default;
          animation:sv2-stagger .5s ease both;
        }
        .sv2-card:hover {
          transform:translateY(-6px);
          box-shadow:0 20px 48px rgba(255,0,127,.15), 0 2px 0 rgba(255,0,127,.3);
        }
        /* pink glow circle bottom-right */
        .sv2-card-glow {
          position:absolute; right:-20px; bottom:-20px;
          width:80px; height:80px; border-radius:50%;
          background:rgba(255,0,127,.12);
          transition:transform .5s ease;
        }
        .sv2-card:hover .sv2-card-glow { transform:scale(2.8); }
        /* dark icon square */
        .sv2-icon-sq {
          width:52px; height:52px; border-radius:14px;
          background:#11131b;
          display:flex; align-items:center; justify-content:center;
          margin-bottom:18px;
          box-shadow:0 4px 12px rgba(0,0,0,.25);
        }
        .sv2-icon-sq .ms {
          font-family:"Material Symbols Outlined"; font-size:26px; color:#e1e2ed;
        }
        .sv2-card-title {
          font-family:"Inter",sans-serif;
          font-size:17px; font-weight:800;
          color:#11131b; margin-bottom:10px;
        }
        .sv2-card-bar {
          width:36px; height:3px;
          background:#FF007F; border-radius:9999px;
          margin-bottom:14px;
          transition:width 250ms;
        }
        .sv2-card:hover .sv2-card-bar { width:60px; }
        .sv2-card-list { list-style:none; margin:0; padding:0; display:flex; flex-direction:column; gap:8px; }
        .sv2-card-item {
          display:flex; align-items:flex-start; gap:8px;
          font-family:"Inter",sans-serif; font-size:13px;
          color:rgba(26,28,32,.7);
        }
        .sv2-card-dot { width:6px; height:6px; border-radius:50%; background:#FF007F; flex-shrink:0; margin-top:5px; }

        /* ── CTA Banner ── */
        .sv2-cta {
          background:#111520; border:1.5px solid rgba(255,255,255,.07);
          border-radius:18px; padding:20px 28px;
          display:flex; align-items:center; justify-content:space-between;
          gap:20px; flex-wrap:wrap;
        }
        .sv2-cta-left { display:flex; align-items:center; gap:18px; }
        .sv2-cal-icon {
          width:50px; height:50px; border-radius:50%;
          background:#1a1c24; border:1.5px solid rgba(255,255,255,.1);
          display:flex; align-items:center; justify-content:center; flex-shrink:0;
        }
        .sv2-cal-icon .ms { font-family:"Material Symbols Outlined"; font-size:24px; color:#FF007F; }
        .sv2-cta-title { font-family:"Inter",sans-serif; font-size:19px; font-weight:800; color:#e1e2ed; }
        .sv2-cta-sub   { font-family:"Inter",sans-serif; font-size:12px; color:rgba(255,255,255,.4); margin-top:2px; }
        .sv2-book-btn {
          display:flex; align-items:center; gap:10px;
          background:#FF007F; border:none; border-radius:14px;
          padding:14px 28px; cursor:pointer;
          font-family:"Inter",sans-serif; font-size:13px; font-weight:700;
          letter-spacing:1.5px; text-transform:uppercase; color:#fff;
          white-space:nowrap;
          transition:background 150ms, transform 120ms, box-shadow 150ms;
          box-shadow:0 0 22px rgba(255,0,127,.4);
          animation:sv2-pulse 2.5s ease-out infinite;
        }
        .sv2-book-btn .ms { font-family:"Material Symbols Outlined"; font-size:20px; }
        .sv2-book-btn:hover { background:#e6006d; transform:translateY(-2px); box-shadow:0 0 36px rgba(255,0,127,.6); }
        .sv2-book-btn:active { transform:translateY(0); }

        /* ══════════════════════════════════════════
           BOOKING VIEW
        ══════════════════════════════════════════ */
        .sv2-booking {
          display:flex; flex-direction:column; gap:16px;
          animation:sv2-up .35s cubic-bezier(.22,1,.36,1);
          padding-top:4px;
        }
        .sv2-bk-head {
          display:flex; align-items:center; gap:14px;
          font-family:"Inter",sans-serif; font-size:22px; font-weight:800; color:#e1e2ed;
        }
        .sv2-back {
          background:rgba(255,255,255,.06); border:1.5px solid rgba(255,255,255,.1);
          border-radius:8px; padding:6px 14px;
          font-family:"Inter",sans-serif; font-size:11px; font-weight:700; letter-spacing:1px;
          color:rgba(255,255,255,.5); cursor:pointer; text-transform:uppercase;
          transition:all 150ms;
        }
        .sv2-back:hover { background:rgba(255,255,255,.12); color:#e1e2ed; }

        /* Day pills */
        .sv2-days { display:flex; gap:10px; overflow-x:auto; padding-bottom:4px; scrollbar-width:none; }
        .sv2-days::-webkit-scrollbar { display:none; }
        .sv2-day {
          flex-shrink:0; display:flex; flex-direction:column; align-items:center;
          background:rgba(255,255,255,.04); border:1.5px solid rgba(255,255,255,.08);
          border-radius:16px; padding:12px 18px; cursor:pointer; min-width:70px;
          transition:all 200ms cubic-bezier(.22,1,.36,1);
          font-family:"Inter",sans-serif;
        }
        .sv2-day:hover { background:rgba(255,0,127,.1); border-color:rgba(255,0,127,.3); transform:translateY(-3px); }
        .sv2-day.on { background:#FF007F; border-color:#FF007F; transform:translateY(-4px) scale(1.06); box-shadow:0 6px 20px rgba(255,0,127,.4); }
        .sv2-day-short { font-size:9px; font-weight:700; text-transform:uppercase; letter-spacing:1px; color:rgba(255,255,255,.45); margin-bottom:3px; }
        .sv2-day.on .sv2-day-short { color:rgba(255,255,255,.85); }
        .sv2-day-num { font-size:28px; font-weight:900; color:#e1e2ed; line-height:1; }
        .sv2-day-mon { font-size:9px; font-weight:600; color:rgba(255,255,255,.35); margin-top:2px; }
        .sv2-day.on .sv2-day-mon { color:rgba(255,255,255,.75); }

        .sv2-sel-label {
          font-family:"Inter",sans-serif; font-size:12px; font-weight:700;
          color:#FF007F; min-height:18px;
        }

        /* Fields */
        .sv2-fields { display:grid; grid-template-columns:1fr 1fr 1fr; gap:14px; }
        .sv2-field  { display:flex; flex-direction:column; gap:6px; }
        .sv2-flabel {
          font-family:"Inter",sans-serif; font-size:10px; font-weight:700;
          text-transform:uppercase; letter-spacing:1.5px; color:rgba(255,255,255,.35);
        }
        .sv2-finput {
          background:rgba(255,255,255,.05); border:1.5px solid rgba(255,255,255,.1);
          border-radius:12px; padding:11px 14px;
          font-family:"Inter",sans-serif; font-size:14px; color:#e1e2ed;
          outline:none; width:100%; box-sizing:border-box; transition:all 150ms;
        }
        .sv2-finput::placeholder { color:rgba(255,255,255,.2); }
        .sv2-finput:focus { border-color:#FF007F; background:rgba(255,0,127,.06); }
        .sv2-err { font-family:"Inter",sans-serif; font-size:12px; font-weight:700; color:#FF007F; min-height:18px; }
        .sv2-confirm {
          align-self:flex-end; display:flex; align-items:center; gap:10px;
          background:#FF007F; border:none; border-radius:12px;
          padding:13px 30px; cursor:pointer;
          font-family:"Inter",sans-serif; font-size:14px; font-weight:700;
          letter-spacing:1px; color:#fff;
          transition:all 150ms; box-shadow:0 0 22px rgba(255,0,127,.35);
        }
        .sv2-confirm:hover { background:#e6006d; transform:translateY(-2px); }
        .sv2-confirm .ms { font-family:"Material Symbols Outlined"; font-size:18px; }

        /* ══════════════════════════════════════════
           CONFIRMED VIEW
        ══════════════════════════════════════════ */
        .sv2-conf-wrap {
          display:flex; flex-direction:column; align-items:center; justify-content:center;
          flex:1; gap:18px; padding:20px; text-align:center;
          animation:sv2-fade .5s ease;
        }
        .sv2-check {
          width:90px; height:90px; border-radius:50%;
          background:linear-gradient(135deg,#FF007F,#8E2DE2);
          display:flex; align-items:center; justify-content:center;
          box-shadow:0 0 50px rgba(255,0,127,.55);
          animation:sv2-pop .6s cubic-bezier(.22,1,.36,1);
        }
        .sv2-check .ms { font-family:"Material Symbols Outlined"; font-size:44px; color:#fff; font-variation-settings:"FILL" 1; }
        .sv2-conf-title { font-family:"Inter",sans-serif; font-size:clamp(28px,5vw,48px); font-weight:900; color:#e1e2ed; line-height:1.1; }
        .sv2-conf-sub { font-family:"Inter",sans-serif; font-size:15px; color:rgba(255,255,255,.55); max-width:340px; line-height:1.6; }
        .sv2-conf-sub span { color:#FF007F; font-weight:700; }
        .sv2-conf-close {
          background:#FF007F; border:none; border-radius:12px; padding:12px 32px; cursor:pointer;
          font-family:"Inter",sans-serif; font-size:14px; font-weight:700; color:#fff;
          transition:all 150ms; margin-top:6px;
        }
        .sv2-conf-close:hover { background:#e6006d; transform:translateY(-2px); }
        /* confetti */
        .sv2-cfetti-ring { display:flex; gap:8px; }
        .sv2-cfetti {
          width:10px; height:10px; border-radius:50%;
          animation:sv2-confetti 1.4s ease-out forwards;
        }

        /* ══════════════════════════════════════════
           RESPONSIVE
        ══════════════════════════════════════════ */
        @media (max-width:860px) {
          .sv2-grid   { grid-template-columns:repeat(2,1fr); gap:14px; }
          .sv2-fields { grid-template-columns:1fr 1fr; }
          .sv2-header { padding:28px 28px 64px; }
          .sv2-body   { padding:0 24px 24px; }
          .sv2-headline { font-size:52px; }
        }
        @media (max-width:600px) {
          .sv2-modal  { border-radius:20px; }
          .sv2-header { padding:24px 20px 56px; }
          .sv2-logo-box { width:80px; height:80px; }
          .sv2-headline { font-size:40px; letter-spacing:-2px; }
          .sv2-subtext  { font-size:14px; }
          .sv2-grid   { grid-template-columns:1fr 1fr; gap:10px; }
          .sv2-card   { padding:18px 16px 14px; }
          .sv2-card-title { font-size:14px; }
          .sv2-body   { padding:0 16px 20px; }
          .sv2-cta    { flex-direction:column; align-items:flex-start; }
          .sv2-book-btn { width:100%; justify-content:center; }
          .sv2-fields { grid-template-columns:1fr; }
          .sv2-confirm { align-self:stretch; justify-content:center; }
          .sv2-badges { gap:12px; }
        }
        @media (max-width:420px) {
          .sv2-grid { grid-template-columns:1fr; }
          .sv2-headline { font-size:34px; }
        }
      `}</style>

      <div className="sv2-backdrop" onClick={(e) => { if (e.target === e.currentTarget) close(); }}>
        <div className="sv2-modal">

          {/* ── Close ── */}
          <button className="sv2-close" onClick={close} aria-label="Close modal">
            <span className="ms">close</span>
          </button>

          {/* ══════════ HEADER ══════════ */}
          <div className="sv2-header">
            <div className="sv2-header-inner">
              <div className="sv2-logo-box">
                <img src="/Portfolio-favi.png" alt="Sre Varshan" />
              </div>
              <div className="sv2-tagline-wrap">
                <span className="sv2-tagline">Let&apos;s build something</span>
                <span className="sv2-tagline-line" />
              </div>
              <h2 className="sv2-headline">Extraordinary</h2>
              <p className="sv2-subtext">
                I help startups, businesses &amp; innovators turn ideas into{" "}
                <strong>AI-powered solutions</strong> and custom softwares at affordable prices.
              </p>
              <div className="sv2-badges">
                {["Clean Code","Scalable Solutions","Modern AI","Real Results"].map((b) => (
                  <span className="sv2-badge" key={b}>
                    <span className="ms" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    {b}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* ══════════ BODY ══════════ */}
          <div className="sv2-body">

            {/* ─── SERVICES VIEW ─── */}
            {screen === "services" && (
              <>
                <div className="sv2-pill-row">
                  <span className="sv2-pill">How I can help you</span>
                </div>

                <div className="sv2-grid">
                  {SERVICES.map((s, i) => (
                    <div className="sv2-card" key={s.title} style={{ animationDelay: `${i*70}ms` }}>
                      <div className="sv2-card-glow" />
                      <div className="sv2-icon-sq">
                        <span className="ms">{s.icon}</span>
                      </div>
                      <div className="sv2-card-title">{s.title}</div>
                      <div className="sv2-card-bar" />
                      <ul className="sv2-card-list">
                        {s.items.map((item) => (
                          <li className="sv2-card-item" key={item}>
                            <span className="sv2-card-dot" />{item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div className="sv2-cta">
                  <div className="sv2-cta-left">
                    <div className="sv2-cal-icon">
                      <span className="ms">calendar_month</span>
                    </div>
                    <div>
                      <div className="sv2-cta-title">Let&apos;s discuss your project</div>
                      <div className="sv2-cta-sub">30-Min Free Discovery Call</div>
                    </div>
                  </div>
                  <button className="sv2-book-btn" onClick={() => setScreen("booking")}>
                    <span className="ms">calendar_month</span>
                    BOOK A FREE CALL
                    <span className="ms">arrow_forward</span>
                  </button>
                </div>
              </>
            )}

            {/* ─── BOOKING VIEW ─── */}
            {screen === "booking" && (
              <div className="sv2-booking">
                <div className="sv2-bk-head">
                  <button className="sv2-back" onClick={() => { setScreen("services"); setSelDay(null); }}>← Back</button>
                  Pick Your Date
                </div>

                <div className="sv2-days">
                  {days.map((d, i) => (
                    <div
                      key={i}
                      className={`sv2-day${selDay === i ? " on" : ""}`}
                      onClick={() => setSelDay(i)}
                      title={d.full}
                    >
                      <span className="sv2-day-short">{d.short}</span>
                      <span className="sv2-day-num">{d.num}</span>
                      <span className="sv2-day-mon">{d.mon}</span>
                    </div>
                  ))}
                </div>

                <p className="sv2-sel-label">
                  {selDay !== null ? `✓ ${days[selDay].full}` : "Select a date above"}
                </p>

                <div className="sv2-fields">
                  <div className="sv2-field">
                    <label className="sv2-flabel">Your Name *</label>
                    <input className="sv2-finput" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} />
                  </div>
                  <div className="sv2-field">
                    <label className="sv2-flabel">Phone Number</label>
                    <input className="sv2-finput" placeholder="+91 99999 99999" value={phone} onChange={(e) => setPhone(e.target.value)} />
                  </div>
                  <div className="sv2-field">
                    <label className="sv2-flabel">Email Address *</label>
                    <input className="sv2-finput" placeholder="you@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                </div>

                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", gap:12 }}>
                  <p className="sv2-err">{bookErr}</p>
                  <button className="sv2-confirm" onClick={handleBook}>
                    Confirm Booking
                    <span className="ms">arrow_forward</span>
                  </button>
                </div>
              </div>
            )}

            {/* ─── CONFIRMED VIEW ─── */}
            {screen === "confirmed" && (
              <div className="sv2-conf-wrap">
                <div className="sv2-cfetti-ring">
                  {["#FF007F","#FFB020","#2DC8E2","#2BB04A","#8E2DE2","#FF7043","#FF007F","#FFB020"].map((c, i) => (
                    <span key={i} className="sv2-cfetti" style={{ background: c, animationDelay: `${i*90}ms` }} />
                  ))}
                </div>
                <div className="sv2-check">
                  <span className="ms">check_circle</span>
                </div>
                <div className="sv2-conf-title">Slot Booked! 🎉</div>
                <p className="sv2-conf-sub">
                  Thanks <span>{name}</span>! Your call is locked in for{" "}
                  <span>{selDay !== null ? days[selDay].full : "your chosen date"}</span>.{" "}
                  I&apos;ll reach out to you soon — can&apos;t wait!
                </p>
                <button className="sv2-conf-close" onClick={close}>Close ✕</button>
              </div>
            )}

          </div>
        </div>
      </div>
    </>
  );
}
