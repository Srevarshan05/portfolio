"use client";

import Link from "next/link";
import { useState } from "react";

/* ─── Data ─────────────────────────────────────────────────────────── */
const SERVICES = [
  {
    icon: "/icons/website.png",
    title: "Website Development",
    desc: "Modern, fast, and responsive websites that help your business build trust and grow online.",
    bullets: ["Custom Website Design", "Mobile Friendly", "Fast Loading", "SEO Optimised", "Easy to Manage"],
  },
  {
    icon: "/icons/Chatbot.png",
    title: "AI Chatbots & Assistants",
    desc: "Smart chatbots that engage customers, answer questions, and automate conversations 24/7.",
    bullets: ["Website Chatbots", "WhatsApp Chatbots", "AI Customer Support", "FAQ Automation", "Appointment Booking"],
  },
  {
    icon: "/icons/automation.png",
    title: "AI Workflow Automation",
    desc: "Automate your repetitive tasks and focus on growing your business.",
    bullets: ["Email Automation", "Google Workspace Automation", "Custom Automation"],
  },
  {
    icon: "/icons/Gen-Ai.png",
    title: "Custom AI Solutions",
    desc: "Tailored AI solutions to solve your unique business challenges.",
    bullets: ["AI Applications", "AI Agents", "Document Intelligence", "AI Dashboards", "Generative AI Integration"],
  },
  {
    icon: "/icons/receipt.png",
    title: "E-Receipt & Business System",
    desc: "Digital billing and business management system to simplify your daily operations.",
    bullets: ["Digital Receipts", "Inventory Management", "Sales & Expense Tracking", "Reports & Analytics", "GST Ready"],
  },
  {
    icon: "/icons/Consult.png",
    title: "AI Consulting",
    desc: "Get expert guidance to understand AI, plan your products, and build the right solution.",
    bullets: ["AI Strategy", "Technology Guidance", "Product Planning", "Proof of Concept"],
  },
];

const PROCESS = [
  { step: "1", label: "Discover",  desc: "We understand your requirements and goals." },
  { step: "2", label: "Plan",      desc: "We plan the best solution for you." },
  { step: "3", label: "Build",     desc: "We build with clean code and modern technologies." },
  { step: "4", label: "Test",      desc: "We test everything to ensure quality." },
  { step: "5", label: "Deliver",   desc: "We deliver on time and provide long-term support." },
];

const EXPECT = [
  { icon: "💬", label: "Clear\nCommunication" },
  { icon: "⚡", label: "Modern\nTechnologies" },
  { icon: "📈", label: "Scalable\nSolutions" },
  { icon: "⏰", label: "On-Time\nDelivery" },
  { icon: "🤝", label: "Long-Term\nSupport" },
  { icon: "💰", label: "Affordable for\nStartups" },
];

export default function ServicesPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --brand: #E22D6D;
          --dark: #1C202B;
          --text: #111827;
          --muted: #6b7280;
          --border: #e5e7eb;
          --bg-pink: #fff0f4;
        }
        body, .sp-page { font-family: 'Inter', sans-serif; }
        .sp-page { background: #f6f7fb; color: var(--text); min-height: 100vh; }

        /* ═══ NAV ════════════════════════════════════════════════════════ */
        .sp-nav {
          position: sticky; top: 0; z-index: 200;
          background: #fff;
          border-bottom: 2px solid var(--dark);
          box-shadow: 0 3px 0 0 var(--dark);
          height: 60px;
          display: flex; align-items: center;
          padding: 0 clamp(16px,4vw,56px);
        }
        .sp-nav-brand {
          display: flex; align-items: center; gap: 10px;
          text-decoration: none; flex-shrink: 0;
          margin-right: clamp(16px,4vw,56px);
        }
        .sp-nav-brand img {
          width: 34px; height: 34px; border-radius: 50%;
          border: 2px solid var(--dark); object-fit: cover;
        }
        .sp-nav-brand-name {
          font-size: 15px; font-weight: 900; letter-spacing: 1.5px;
          color: var(--dark); text-transform: uppercase;
        }
        .sp-nav-links {
          display: flex; align-items: center; gap: 4px;
          flex: 1; list-style: none;
        }
        .sp-nav-links a {
          font-size: 12px; font-weight: 600; text-transform: uppercase;
          letter-spacing: 0.5px; color: var(--dark); text-decoration: none;
          padding: 6px 14px; border-radius: 9999px;
          transition: background 120ms;
        }
        .sp-nav-links a:hover { background: rgba(28,32,43,0.07); }
        .sp-nav-links a.sp-active { background: var(--brand); color: #fff; }
        .sp-nav-cta {
          flex-shrink: 0;
          background: var(--brand); color: #fff;
          font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;
          padding: 8px 20px; border-radius: 9999px;
          text-decoration: none; transition: background 150ms; white-space: nowrap;
        }
        .sp-nav-cta:hover { background: #c0185a; }

        /* ═══ HERO ═══════════════════════════════════════════════════════ */
        /* Full-bleed two-column: left text, right = full photo */
        .sp-hero-wrap {
          display: grid;
          grid-template-columns: 1fr 42%;
          min-height: 88vh;
          background: #fff;
        }

        /* Left side */
        .sp-hero-left {
          display: flex; flex-direction: column; justify-content: center;
          padding: clamp(40px,6vw,80px) clamp(24px,5vw,72px);
          background: #fff;
        }
        .sp-hero-eyebrow {
          font-size: 11px; font-weight: 700; text-transform: uppercase;
          letter-spacing: 2.5px; color: var(--brand);
          margin-bottom: 18px; display: block;
        }
        .sp-hero-h1 {
          font-size: clamp(42px, 5.5vw, 68px);
          font-weight: 800;
          line-height: 1.08;
          color: var(--dark);
          margin-bottom: 22px;
          letter-spacing: -1.5px;
        }
        .sp-hero-h1 em {
          color: var(--brand);
          font-style: normal;
          font-weight: 900;
        }
        .sp-hero-p {
          font-size: 16px; color: var(--muted);
          line-height: 1.75; margin-bottom: 36px;
          max-width: 440px;
        }
        .sp-hero-actions { display: flex; gap: 14px; flex-wrap: wrap; }
        .sp-btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          background: var(--brand); color: #fff;
          font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;
          padding: 14px 28px; border-radius: 12px;
          border: none; cursor: pointer;
          box-shadow: 4px 4px 0 0 var(--dark);
          transition: transform 120ms, box-shadow 120ms;
          text-decoration: none;
        }
        .sp-btn-primary:hover { transform: translate(-2px,-2px); box-shadow: 6px 6px 0 0 var(--dark); }
        .sp-btn-ghost {
          display: inline-flex; align-items: center; gap: 8px;
          background: #fff; color: var(--dark);
          font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;
          padding: 14px 28px; border-radius: 12px;
          border: 2px solid var(--dark); cursor: pointer;
          text-decoration: none;
          transition: background 120ms;
        }
        .sp-btn-ghost:hover { background: rgba(28,32,43,0.05); }

        /* Right side — full image fill */
        .sp-hero-right {
          position: relative;
          overflow: hidden;
          background: #f5f5f5;
        }
        .sp-hero-right img {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: cover;
          object-position: 55% top;
        }

        /* ═══ DIVIDER ════════════════════════════════════════════════════ */
        .sp-divider { border: none; border-top: 1.5px solid var(--border); }

        /* ═══ SECTION ════════════════════════════════════════════════════ */
        .sp-section {
          max-width: 1140px; margin: 0 auto;
          padding: 72px clamp(16px,4vw,48px);
        }
        .sp-section-top { text-align: center; margin-bottom: 48px; }
        .sp-eyebrow {
          font-size: 11px; font-weight: 700; text-transform: uppercase;
          letter-spacing: 2.5px; color: var(--brand);
          display: block; margin-bottom: 10px;
        }
        .sp-h2 {
          font-size: clamp(30px,4vw,44px);
          font-weight: 900; color: var(--dark);
          letter-spacing: -0.5px; line-height: 1.1; margin-bottom: 10px;
        }
        .sp-subtext {
          font-size: 15px; color: var(--muted); line-height: 1.65;
        }

        /* ═══ SERVICES GRID ══════════════════════════════════════════════ */
        .sp-services-grid {
          display: grid;
          grid-template-columns: repeat(3,1fr);
          gap: 24px;
        }
        .sp-svc-card {
          background: #fff;
          border: 2px solid var(--border);
          border-radius: 20px; padding: 28px 24px;
          transition: border-color 180ms, box-shadow 180ms, transform 180ms;
          position: relative; overflow: hidden;
        }
        .sp-svc-card::after {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg,var(--brand),#c0185a);
          transform: scaleX(0); transform-origin: left; transition: transform 200ms;
        }
        .sp-svc-card:hover {
          border-color: var(--brand);
          box-shadow: 0 12px 40px rgba(226,45,109,0.13);
          transform: translateY(-4px);
        }
        .sp-svc-card:hover::after { transform: scaleX(1); }
        .sp-svc-icon-wrap {
          width: 56px; height: 56px; border-radius: 16px;
          background: var(--bg-pink); border: 1.5px solid #ffd6e4;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 16px;
        }
        .sp-svc-icon-wrap img { width: 30px; height: 30px; object-fit: contain; }
        .sp-svc-title {
          font-size: 16px; font-weight: 800; color: var(--dark);
          margin-bottom: 8px; line-height: 1.3;
        }
        .sp-svc-desc {
          font-size: 13px; color: var(--muted);
          line-height: 1.65; margin-bottom: 16px;
        }
        .sp-svc-bullets { list-style: none; display: flex; flex-direction: column; gap: 7px; }
        .sp-svc-bullet {
          font-size: 12.5px; color: #374151;
          display: flex; align-items: flex-start; gap: 8px; line-height: 1.4;
        }
        .sp-svc-check { color: var(--brand); font-weight: 900; flex-shrink: 0; margin-top: 1px; }

        /* ═══ PROCESS (dark section) ═════════════════════════════════════ */
        .sp-process-outer {
          background: var(--dark);
          padding: 72px clamp(16px,4vw,48px);
          position: relative; overflow: hidden;
        }
        .sp-process-outer::before {
          content: '';
          position: absolute; inset: 0;
          background:
            radial-gradient(ellipse at 5% 80%, rgba(226,45,109,0.18) 0%, transparent 50%),
            radial-gradient(ellipse at 90% 10%, rgba(226,45,109,0.1) 0%, transparent 50%);
          pointer-events: none;
        }
        .sp-process-inner {
          max-width: 1140px; margin: 0 auto; position: relative;
        }
        .sp-process-eyebrow {
          font-size: 11px; font-weight: 700; text-transform: uppercase;
          letter-spacing: 2.5px; color: var(--brand); margin-bottom: 10px;
        }
        .sp-process-h2 {
          font-size: clamp(28px,3.5vw,40px);
          font-weight: 900; color: #fff;
          letter-spacing: -0.5px; margin-bottom: 48px;
        }
        .sp-process-steps {
          display: grid; grid-template-columns: repeat(5,1fr); gap: 20px;
          position: relative;
        }
        .sp-process-steps::before {
          content: '';
          position: absolute; top: 24px;
          left: calc(10% + 12px); right: calc(10% + 12px);
          height: 1px; background: rgba(255,255,255,0.12); z-index: 0;
        }
        .sp-process-step {
          display: flex; flex-direction: column;
          align-items: center; text-align: center; gap: 10px; z-index: 1;
        }
        .sp-process-circle {
          width: 48px; height: 48px; border-radius: 50%;
          background: linear-gradient(135deg, var(--brand) 0%, #c0185a 100%);
          display: flex; align-items: center; justify-content: center;
          font-size: 16px; font-weight: 900; color: #fff;
          box-shadow: 0 4px 16px rgba(226,45,109,0.45);
        }
        .sp-process-step-num {
          font-size: 11px; font-weight: 700; color: rgba(255,255,255,0.35);
          letter-spacing: 1px;
        }
        .sp-process-step-title {
          font-size: 14px; font-weight: 700; color: #fff;
        }
        .sp-process-step-desc {
          font-size: 12px; color: rgba(255,255,255,0.5); line-height: 1.55;
        }

        /* ═══ EXPECT ═════════════════════════════════════════════════════ */
        .sp-expect-grid {
          display: grid; grid-template-columns: repeat(6,1fr); gap: 16px;
        }
        .sp-expect-item {
          display: flex; flex-direction: column; align-items: center;
          text-align: center; gap: 10px;
          padding: 22px 12px; border: 2px solid var(--border);
          border-radius: 16px; background: #fff;
          transition: all 150ms;
        }
        .sp-expect-item:hover {
          border-color: var(--brand); background: var(--bg-pink);
          transform: translateY(-3px);
        }
        .sp-expect-icon {
          width: 48px; height: 48px; border-radius: 14px;
          background: var(--bg-pink); border: 1.5px solid #ffd6e4;
          display: flex; align-items: center; justify-content: center; font-size: 22px;
        }
        .sp-expect-label {
          font-size: 12px; font-weight: 700; color: var(--text);
          line-height: 1.4; white-space: pre-line;
        }

        /* ═══ BOOKING MODAL (inline) ══════════════════════════════════════ */
        .sp-modal-backdrop {
          position: fixed; inset: 0; z-index: 9999;
          background: rgba(10,12,20,0.7); backdrop-filter: blur(10px);
          display: flex; align-items: center; justify-content: center; padding: 16px;
          animation: fadeIn 0.2s ease;
        }
        @keyframes fadeIn { from { opacity:0 } to { opacity:1 } }
        @keyframes slideUp { from { opacity:0; transform:translateY(24px) scale(0.97) } to { opacity:1; transform:none } }

        /* ═══ RESPONSIVE ═════════════════════════════════════════════════ */
        @media (max-width: 1024px) {
          .sp-services-grid { grid-template-columns: repeat(2,1fr); }
          .sp-expect-grid   { grid-template-columns: repeat(3,1fr); }
          .sp-process-steps { grid-template-columns: repeat(3,1fr); }
          .sp-process-steps::before { display: none; }
          .sp-hero-wrap { grid-template-columns: 1fr; min-height: unset; }
          .sp-hero-right { min-height: 360px; }
        }
        @media (max-width: 640px) {
          .sp-nav-links { display: none; }
          .sp-services-grid { grid-template-columns: 1fr; }
          .sp-expect-grid   { grid-template-columns: repeat(2,1fr); }
          .sp-process-steps { grid-template-columns: repeat(2,1fr); }
          .sp-hero-left { padding: 40px 20px; }
          .sp-hero-right { min-height: 280px; }
        }
      `}</style>

      <div className="sp-page">

        {/* ══ NAV ═══════════════════════════════════════════════════════ */}
        <nav className="sp-nav">
          <Link className="sp-nav-brand" href="/">
            <img src="/Portfolio-favi.png" alt="Sre Varshan" />
            <span className="sp-nav-brand-name">SRE VARSHAN</span>
          </Link>
          <ul className="sp-nav-links">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/#about">About Me</Link></li>
            <li><Link href="/services" className="sp-active">Services</Link></li>
            <li><Link href="/#projects">Work</Link></li>
            <li><Link href="/#contact">Contact Me</Link></li>
          </ul>
          <Link className="sp-nav-cta" href="/#contact">Let&apos;s Talk →</Link>
        </nav>

        {/* ══ HERO ══════════════════════════════════════════════════════ */}
        <div className="sp-hero-wrap">

          {/* Left */}
          <div className="sp-hero-left">
            <span className="sp-hero-eyebrow">SERVICES</span>
            <h1 className="sp-hero-h1">
              Build <em>Smarter.</em><br />
              Grow <em>Faster.</em>
            </h1>
            <p className="sp-hero-p">
              Helping businesses leverage AI, automation, and modern software
              to solve real-world problems.
            </p>
            <div className="sp-hero-actions">
              <button
                className="sp-btn-primary"
                onClick={() => setModalOpen(true)}
              >
                📅&nbsp; Book a Free Call
              </button>
              <Link className="sp-btn-ghost" href="/#projects">
                View My Work →
              </Link>
            </div>
          </div>

          {/* Right — full photo */}
          <div className="sp-hero-right">
            <img src="/icons/new-model-card.png" alt="Sre Varshan — Let's Build Together" />
          </div>

        </div>

        <hr className="sp-divider" />

        {/* ══ SERVICES ══════════════════════════════════════════════════ */}
        <section>
          <div className="sp-section">
            <div className="sp-section-top">
              <span className="sp-eyebrow">WHAT I DO</span>
              <h2 className="sp-h2">Services I Provide</h2>
              <p className="sp-subtext">Simple solutions. Powerful results.</p>
            </div>
            <div className="sp-services-grid">
              {SERVICES.map((svc) => (
                <div className="sp-svc-card" key={svc.title}>
                  <div className="sp-svc-icon-wrap">
                    <img src={svc.icon} alt={svc.title} />
                  </div>
                  <p className="sp-svc-title">{svc.title}</p>
                  <p className="sp-svc-desc">{svc.desc}</p>
                  <ul className="sp-svc-bullets">
                    {svc.bullets.map((b) => (
                      <li className="sp-svc-bullet" key={b}>
                        <span className="sp-svc-check">✓</span>{b}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ PROCESS ═══════════════════════════════════════════════════ */}
        <div className="sp-process-outer">
          <div className="sp-process-inner">
            <p className="sp-process-eyebrow">MY PROCESS</p>
            <h2 className="sp-process-h2">How We Work Together</h2>
            <div className="sp-process-steps">
              {PROCESS.map((p) => (
                <div className="sp-process-step" key={p.step}>
                  <div className="sp-process-circle">{p.step}</div>
                  <span className="sp-process-step-num">{p.step}</span>
                  <p className="sp-process-step-title">{p.label}</p>
                  <p className="sp-process-step-desc">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <hr className="sp-divider" />

        {/* ══ EXPECT ════════════════════════════════════════════════════ */}
        <section>
          <div className="sp-section">
            <div className="sp-section-top">
              <span className="sp-eyebrow">WHY WORK WITH ME</span>
              <h2 className="sp-h2">What You Can Expect</h2>
            </div>
            <div className="sp-expect-grid">
              {EXPECT.map((e) => (
                <div className="sp-expect-item" key={e.label}>
                  <div className="sp-expect-icon">{e.icon}</div>
                  <span className="sp-expect-label">{e.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ BOOKING MODAL ═════════════════════════════════════════════ */}
        {modalOpen && (
          <div
            className="sp-modal-backdrop"
            onClick={(e) => { if (e.target === e.currentTarget) setModalOpen(false); }}
          >
            {/* Redirect to home — ServicesModal auto-opens there */}
            <div style={{
              background:"#fff", borderRadius:"20px", padding:"48px",
              maxWidth:"440px", width:"100%", textAlign:"center",
              boxShadow:"0 40px 100px rgba(0,0,0,0.4)",
              animation:"slideUp 0.35s cubic-bezier(0.22,1,0.36,1)"
            }}>
              <div style={{fontSize:"56px",marginBottom:"20px"}}>📅</div>
              <h3 style={{fontFamily:"Inter",fontWeight:900,fontSize:"26px",color:"#111827",marginBottom:"12px",letterSpacing:"-0.5px"}}>
                Book a Free Call
              </h3>
              <p style={{fontSize:"14px",color:"#6b7280",lineHeight:"1.65",marginBottom:"28px"}}>
                Click below to open the booking form where you can select a date
                and time that works for you.
              </p>
              <Link
                href="/?book=1"
                style={{
                  display:"inline-flex",alignItems:"center",gap:"8px",
                  background:"#E22D6D",color:"#fff",fontWeight:700,
                  fontSize:"14px",textTransform:"uppercase",letterSpacing:"1px",
                  padding:"14px 28px",borderRadius:"12px",textDecoration:"none",
                  boxShadow:"4px 4px 0 0 #1C202B"
                }}
              >
                Open Booking Form →
              </Link>
              <button
                onClick={() => setModalOpen(false)}
                style={{
                  display:"block",marginTop:"16px",
                  background:"none",border:"none",color:"#9ca3af",
                  fontSize:"13px",cursor:"pointer",fontFamily:"Inter"
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

      </div>
    </>
  );
}
