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
          --text: #0f172a;
          --muted: #475569;
          --border: #e2e8f0;
          --bg-pink: #fff0f4;
        }

        body, .sp-page {
          font-family: 'Inter', system-ui, -apple-system, sans-serif !important;
          background: #f8fafc;
          color: var(--text);
          min-height: 100vh;
        }

        /* ═══ CRITICAL FONT OVERRIDES TO OVERRIDE BANGERS ════════════════ */
        .sp-page h1, .sp-page h2, .sp-page h3, .sp-page h4,
        .sp-hero-h1, .sp-h2, .sp-process-h2, .sp-svc-title,
        .sp-nav-brand-name, .sp-process-step-title {
          font-family: 'Inter', system-ui, -apple-system, sans-serif !important;
          text-transform: uppercase;
        }

        /* ═══ NAV ════════════════════════════════════════════════════════ */
        .sp-nav {
          position: sticky; top: 0; z-index: 200;
          background: #ffffff;
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
          color: var(--dark);
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
        .sp-hero-wrap {
          display: grid;
          grid-template-columns: 1fr 44%;
          min-height: 85vh;
          background: #ffffff;
        }

        .sp-hero-left {
          display: flex; flex-direction: column; justify-content: center;
          padding: clamp(40px,6vw,80px) clamp(24px,5vw,72px);
          background: #ffffff;
        }
        .sp-hero-eyebrow {
          font-size: 12px; font-weight: 800; text-transform: uppercase;
          letter-spacing: 3px; color: var(--brand);
          margin-bottom: 18px; display: block;
        }
        .sp-hero-h1 {
          font-size: clamp(42px, 5.5vw, 68px) !important;
          font-weight: 900 !important;
          line-height: 1.06;
          color: #0f172a !important;
          margin-bottom: 22px;
          letter-spacing: -1.5px !important;
        }
        .sp-hero-h1 em {
          color: var(--brand) !important;
          font-style: normal;
          font-weight: 900 !important;
        }
        .sp-hero-p {
          font-size: 16px; color: var(--muted);
          line-height: 1.75; margin-bottom: 36px;
          max-width: 440px; font-weight: 500;
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

        .sp-hero-right {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: clamp(24px, 4vw, 48px);
          background: #ffffff;
        }
        .sp-hero-right img {
          width: 100%;
          max-width: 460px;
          height: auto;
          max-height: 520px;
          object-fit: contain;
          border-radius: 20px;
          display: block;
        }

        /* ═══ SMUDGED SECTION DIVIDERS ═══════════════════════════════════ */
        /* Soft smudged gradient blend between Hero & Services */
        .sp-smudge-hero-services {
          height: 90px;
          background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
          position: relative;
          overflow: hidden;
        }
        .sp-smudge-hero-services::before {
          content: '';
          position: absolute;
          top: -40px; left: 20%; right: 20%; height: 80px;
          background: radial-gradient(ellipse at center, rgba(226,45,109,0.12) 0%, transparent 70%);
          filter: blur(20px);
          pointer-events: none;
        }

        /* Soft smudged gradient blend between Services & Process (Dark) */
        .sp-smudge-services-process {
          height: 100px;
          background: linear-gradient(180deg, #f8fafc 0%, #1C202B 100%);
          position: relative;
          overflow: hidden;
        }
        .sp-smudge-services-process::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 50%, rgba(226,45,109,0.15) 0%, transparent 65%);
          filter: blur(25px);
          pointer-events: none;
        }

        /* Soft smudged gradient blend between Process (Dark) & Expect */
        .sp-smudge-process-expect {
          height: 100px;
          background: linear-gradient(180deg, #1C202B 0%, #f8fafc 100%);
          position: relative;
          overflow: hidden;
        }
        .sp-smudge-process-expect::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 50%, rgba(226,45,109,0.15) 0%, transparent 65%);
          filter: blur(25px);
          pointer-events: none;
        }

        /* ═══ SECTION SHELL ═════════════════════════════════════════════ */
        .sp-section {
          max-width: 1140px; margin: 0 auto;
          padding: 60px clamp(16px,4vw,48px) 80px;
        }
        .sp-section-top { text-align: center; margin-bottom: 56px; }
        .sp-eyebrow {
          font-size: 12px; font-weight: 800; text-transform: uppercase;
          letter-spacing: 3px; color: var(--brand);
          display: block; margin-bottom: 12px;
        }
        .sp-h2 {
          font-size: clamp(32px, 4vw, 46px) !important;
          font-weight: 900 !important;
          color: #0f172a !important;
          letter-spacing: -1px !important;
          line-height: 1.1; margin-bottom: 12px;
        }
        .sp-subtext {
          font-size: 16px; color: var(--muted); line-height: 1.65; font-weight: 500;
        }

        /* ═══ SERVICES GRID ══════════════════════════════════════════════ */
        .sp-services-grid {
          display: grid;
          grid-template-columns: repeat(3,1fr);
          gap: 28px;
        }
        .sp-svc-card {
          background: #ffffff;
          border: 2px solid var(--border);
          border-radius: 24px; padding: 32px 26px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.03);
          transition: border-color 200ms, box-shadow 200ms, transform 200ms;
          position: relative; overflow: hidden;
        }
        .sp-svc-card::after {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 4px;
          background: linear-gradient(90deg,var(--brand),#c0185a);
          transform: scaleX(0); transform-origin: left; transition: transform 200ms;
        }
        .sp-svc-card:hover {
          border-color: var(--brand);
          box-shadow: 0 16px 45px rgba(226,45,109,0.15);
          transform: translateY(-6px);
        }
        .sp-svc-card:hover::after { transform: scaleX(1); }
        .sp-svc-icon-wrap {
          width: 58px; height: 58px; border-radius: 18px;
          background: var(--bg-pink); border: 1.5px solid #ffd6e4;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 20px;
        }
        .sp-svc-icon-wrap img { width: 32px; height: 32px; object-fit: contain; }
        .sp-svc-title {
          font-size: 19px !important;
          font-weight: 800 !important;
          color: #0f172a !important;
          margin-bottom: 10px; line-height: 1.35;
        }
        .sp-svc-desc {
          font-size: 14px; color: var(--muted);
          line-height: 1.65; margin-bottom: 20px; font-weight: 400;
        }
        .sp-svc-bullets { list-style: none; display: flex; flex-direction: column; gap: 8px; }
        .sp-svc-bullet {
          font-size: 13.5px; color: #1e293b; font-weight: 600;
          display: flex; align-items: flex-start; gap: 8px; line-height: 1.45;
        }
        .sp-svc-check { color: var(--brand); font-weight: 900; flex-shrink: 0; margin-top: 1px; font-size: 14px; }

        /* ═══ PROCESS (DARK SECTION WITH ENHANCED FONTS & ICONS) ════════ */
        .sp-process-outer {
          background: var(--dark);
          padding: 80px clamp(16px,4vw,48px);
          position: relative; overflow: hidden;
        }
        .sp-process-outer::before {
          content: '';
          position: absolute; inset: 0;
          background:
            radial-gradient(ellipse at 15% 80%, rgba(226,45,109,0.22) 0%, transparent 55%),
            radial-gradient(ellipse at 85% 20%, rgba(226,45,109,0.15) 0%, transparent 50%);
          filter: blur(30px);
          pointer-events: none;
        }
        .sp-process-inner {
          max-width: 1140px; margin: 0 auto; position: relative; z-index: 2;
        }
        .sp-process-eyebrow {
          font-size: 12px; font-weight: 800; text-transform: uppercase;
          letter-spacing: 3px; color: var(--brand); margin-bottom: 12px; text-align: center;
        }
        .sp-process-h2 {
          font-size: clamp(32px, 4.5vw, 48px) !important;
          font-weight: 900 !important;
          color: #ffffff !important;
          letter-spacing: -1px !important;
          margin-bottom: 56px; text-align: center;
        }
        .sp-process-steps {
          display: grid; grid-template-columns: repeat(5,1fr); gap: 24px;
          position: relative;
        }
        .sp-process-steps::before {
          content: '';
          position: absolute; top: 30px;
          left: calc(10% + 15px); right: calc(10% + 15px);
          height: 2px;
          background: linear-gradient(90deg, rgba(226,45,109,0.3), rgba(255,255,255,0.2), rgba(226,45,109,0.3));
          z-index: 0;
        }
        .sp-process-step {
          display: flex; flex-direction: column;
          align-items: center; text-align: center; gap: 14px; z-index: 1;
        }
        .sp-process-circle {
          width: 60px; height: 60px; border-radius: 50%;
          background: linear-gradient(135deg, var(--brand) 0%, #ff528c 100%);
          display: flex; align-items: center; justify-content: center;
          font-size: 22px; font-weight: 900; color: #ffffff;
          box-shadow: 0 0 25px rgba(226,45,109,0.5);
          transition: transform 200ms, box-shadow 200ms;
        }
        .sp-process-step:hover .sp-process-circle {
          transform: scale(1.1);
          box-shadow: 0 0 35px rgba(226,45,109,0.7);
        }
        .sp-process-step-title {
          font-size: 19px !important;
          font-weight: 800 !important;
          color: #ffffff !important;
          margin-top: 4px;
          letter-spacing: -0.3px;
        }
        .sp-process-step-desc {
          font-size: 13.5px;
          color: rgba(255,255,255,0.78);
          line-height: 1.6;
          font-weight: 400;
          max-width: 200px;
        }

        /* ═══ EXPECT ═════════════════════════════════════════════════════ */
        .sp-expect-grid {
          display: grid; grid-template-columns: repeat(6,1fr); gap: 18px;
        }
        .sp-expect-item {
          display: flex; flex-direction: column; align-items: center;
          text-align: center; gap: 12px;
          padding: 24px 14px; border: 2px solid var(--border);
          border-radius: 20px; background: #ffffff;
          box-shadow: 0 2px 12px rgba(0,0,0,0.02);
          transition: all 180ms;
        }
        .sp-expect-item:hover {
          border-color: var(--brand); background: var(--bg-pink);
          transform: translateY(-4px); box-shadow: 0 10px 25px rgba(226,45,109,0.12);
        }
        .sp-expect-icon {
          width: 52px; height: 52px; border-radius: 16px;
          background: var(--bg-pink); border: 1.5px solid #ffd6e4;
          display: flex; align-items: center; justify-content: center; font-size: 24px;
        }
        .sp-expect-label {
          font-size: 13px; font-weight: 700; color: var(--text);
          line-height: 1.45; white-space: pre-line;
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
          .sp-hero-right { padding: 32px; }
        }
        @media (max-width: 640px) {
          .sp-nav-links { display: none; }
          .sp-services-grid { grid-template-columns: 1fr; }
          .sp-expect-grid   { grid-template-columns: repeat(2,1fr); }
          .sp-process-steps { grid-template-columns: repeat(2,1fr); }
          .sp-hero-left { padding: 40px 20px; }
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

          {/* Right — photo */}
          <div className="sp-hero-right">
            <img src="/icons/new-model-card.png" alt="Sre Varshan — Let's Build Together" />
          </div>

        </div>

        {/* Smudged transition between Hero & Services */}
        <div className="sp-smudge-hero-services" />

        {/* ══ SERVICES I PROVIDE ═════════════════════════════════════════ */}
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
                  <h3 className="sp-svc-title">{svc.title}</h3>
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

        {/* Smudged transition between Services & Process */}
        <div className="sp-smudge-services-process" />

        {/* ══ PROCESS (DARK SECTION WITH ENHANCED FONTS) ═════════════════ */}
        <div className="sp-process-outer">
          <div className="sp-process-inner">
            <p className="sp-process-eyebrow">MY PROCESS</p>
            <h2 className="sp-process-h2">How We Work Together</h2>
            <div className="sp-process-steps">
              {PROCESS.map((p) => (
                <div className="sp-process-step" key={p.step}>
                  <div className="sp-process-circle">{p.step}</div>
                  <h3 className="sp-process-step-title">{p.label}</h3>
                  <p className="sp-process-step-desc">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Smudged transition between Process & Expect */}
        <div className="sp-smudge-process-expect" />

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
              background:"#fff", borderRadius:"24px", padding:"48px",
              maxWidth:"440px", width:"100%", textAlign:"center",
              boxShadow:"0 40px 100px rgba(0,0,0,0.4)",
              animation:"slideUp 0.35s cubic-bezier(0.22,1,0.36,1)"
            }}>
              <div style={{fontSize:"56px",marginBottom:"20px"}}>📅</div>
              <h3 style={{fontFamily:"Inter, sans-serif !important",fontWeight:900,fontSize:"26px",color:"#0f172a",marginBottom:"12px",letterSpacing:"-0.5px"}}>
                Book a Free Call
              </h3>
              <p style={{fontSize:"14px",color:"#475569",lineHeight:"1.65",marginBottom:"28px"}}>
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
                  background:"none",border:"none",color:"#94a3b8",
                  fontSize:"13px",cursor:"pointer",fontFamily:"Inter, sans-serif"
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
