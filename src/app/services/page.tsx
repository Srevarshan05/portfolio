import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Solutions & Services — Sre Varshan | AI, Web & Automation",
  description:
    "Explore how Sre Varshan helps businesses with AI-powered solutions, modern web development, business automation, AI chatbots, custom AI systems, and billing systems.",
};

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
  { step: "1", icon: "🔍", title: "Discover",  desc: "We understand your requirements and goals." },
  { step: "2", icon: "📋", title: "Plan",       desc: "We plan the best solution for you." },
  { step: "3", icon: "⚙️",  title: "Build",     desc: "We build with clean code and modern technologies." },
  { step: "4", icon: "🔬", title: "Test",       desc: "We test everything to ensure quality." },
  { step: "5", icon: "🚀", title: "Deliver",    desc: "We deliver on time and provide long-term support." },
];

const EXPECT = [
  { icon: "💬", label: "Clear\nCommunication" },
  { icon: "⚡", label: "Modern\nTechnologies" },
  { icon: "📈", label: "Scalable\nSolutions" },
  { icon: "⏰", label: "On-Time\nDelivery" },
  { icon: "🤝", label: "Long-Term\nSupport" },
  { icon: "💰", label: "Affordable for\nStartups" },
];

const HERO_BADGES = [
  { icon: "/icons/Gen-Ai.png",  label: "AI-Powered Solutions" },
  { icon: "/icons/website.png", label: "Clean & Scalable Code" },
  { icon: "/icons/mobile.png",  label: "On-Time Delivery" },
  { icon: "/icons/Consult.png", label: "Long-Term Support" },
];

export default function ServicesPage() {
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

        body { font-family: 'Inter', sans-serif; }

        .sp-page {
          background: #fff;
          color: var(--text);
          min-height: 100vh;
          font-family: 'Inter', sans-serif;
        }

        /* ════ NAV ═════════════════════════════════════════════════════ */
        .sp-nav {
          position: sticky; top: 0; z-index: 200;
          background: #fff;
          border-bottom: 2px solid var(--dark);
          box-shadow: 0 3px 0 0 var(--dark);
          height: 60px;
          display: flex; align-items: center;
          padding: 0 clamp(16px, 4vw, 48px);
          gap: 0;
        }
        .sp-nav-brand {
          display: flex; align-items: center; gap: 10px;
          text-decoration: none; flex-shrink: 0;
          margin-right: clamp(16px, 4vw, 48px);
        }
        .sp-nav-brand img {
          width: 34px; height: 34px; border-radius: 50%;
          border: 2px solid var(--dark); object-fit: cover;
        }
        .sp-nav-brand span {
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
          transition: background 120ms, color 120ms;
          white-space: nowrap;
        }
        .sp-nav-links a:hover { background: rgba(28,32,43,0.07); }
        .sp-nav-links a.sp-active { background: var(--brand); color: #fff; }
        .sp-nav-cta {
          flex-shrink: 0;
          background: var(--brand); color: #fff !important;
          font-size: 12px; font-weight: 700; text-transform: uppercase;
          letter-spacing: 0.5px;
          padding: 8px 20px; border-radius: 9999px;
          text-decoration: none;
          transition: background 150ms;
          white-space: nowrap;
        }
        .sp-nav-cta:hover { background: #c0185a; }
        .sp-nav-mobile-hide { display: none; }

        /* ════ HERO ════════════════════════════════════════════════════ */
        .sp-hero-outer {
          background: #fff;
          padding: 0 clamp(16px, 4vw, 48px);
        }
        .sp-hero {
          max-width: 1100px; margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 380px;
          align-items: center;
          gap: 48px;
          padding: 64px 0 56px;
        }
        .sp-hero-eyebrow {
          font-size: 11px; font-weight: 700; text-transform: uppercase;
          letter-spacing: 2px; color: var(--brand);
          margin-bottom: 16px; display: block;
        }
        .sp-hero-h1 {
          font-size: clamp(40px, 5.5vw, 64px);
          font-weight: 900; line-height: 1.05;
          color: var(--dark); margin-bottom: 20px;
          letter-spacing: -1px;
        }
        .sp-hero-h1 em { color: var(--brand); font-style: normal; }
        .sp-hero-p {
          font-size: 15px; color: var(--muted);
          line-height: 1.75; margin-bottom: 32px;
          max-width: 460px;
        }
        .sp-hero-badges {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px; margin-bottom: 36px;
        }
        .sp-hero-badge {
          display: flex; align-items: center; gap: 10px;
          background: #f9fafb; border: 1.5px solid var(--border);
          border-radius: 12px; padding: 10px 14px;
          font-size: 12.5px; font-weight: 600; color: var(--text);
        }
        .sp-hero-badge img {
          width: 28px; height: 28px; object-fit: contain; flex-shrink: 0;
        }
        .sp-hero-btn {
          display: inline-flex; align-items: center; gap: 10px;
          background: var(--brand); color: #fff;
          font-size: 14px; font-weight: 700; text-transform: uppercase;
          letter-spacing: 1px;
          padding: 14px 28px; border-radius: 12px;
          text-decoration: none;
          box-shadow: 4px 4px 0 0 var(--dark);
          transition: transform 120ms, box-shadow 120ms;
        }
        .sp-hero-btn:hover { transform: translate(-2px,-2px); box-shadow: 6px 6px 0 0 var(--dark); }
        .sp-hero-img {
          position: relative;
        }
        .sp-hero-img img {
          width: 100%; border-radius: 24px;
          filter: drop-shadow(0 20px 40px rgba(226,45,109,0.3));
          display: block;
        }

        /* ════ DIVIDER ═════════════════════════════════════════════════ */
        .sp-divider { border: none; border-top: 1.5px solid var(--border); }

        /* ════ SECTION SHELL ═══════════════════════════════════════════ */
        .sp-section {
          max-width: 1100px; margin: 0 auto;
          padding: 64px clamp(16px, 4vw, 48px);
        }
        .sp-section-top { text-align: center; margin-bottom: 48px; }
        .sp-eyebrow {
          font-size: 11px; font-weight: 700; text-transform: uppercase;
          letter-spacing: 2px; color: var(--brand);
          display: block; margin-bottom: 10px;
        }
        .sp-h2 {
          font-size: clamp(28px, 4vw, 42px);
          font-weight: 900; color: var(--dark);
          letter-spacing: -0.5px; line-height: 1.1;
          margin-bottom: 10px;
        }
        .sp-subtext {
          font-size: 14px; color: var(--muted); line-height: 1.6;
        }

        /* ════ SERVICES GRID ═══════════════════════════════════════════ */
        .sp-services-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        .sp-svc-card {
          border: 2px solid var(--border);
          border-radius: 20px; padding: 28px 24px;
          background: #fff;
          transition: border-color 180ms, box-shadow 180ms, transform 180ms;
          position: relative; overflow: hidden;
        }
        .sp-svc-card::after {
          content: ''; position: absolute; bottom: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, var(--brand), #c0185a);
          transform: scaleX(0); transform-origin: left;
          transition: transform 200ms;
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
          margin-bottom: 18px;
        }
        .sp-svc-icon-wrap img { width: 30px; height: 30px; object-fit: contain; }
        .sp-svc-title {
          font-size: 16px; font-weight: 800; color: var(--dark);
          margin-bottom: 8px; line-height: 1.3;
        }
        .sp-svc-desc {
          font-size: 13px; color: var(--muted);
          line-height: 1.65; margin-bottom: 18px;
        }
        .sp-svc-bullets { list-style: none; display: flex; flex-direction: column; gap: 7px; }
        .sp-svc-bullet {
          font-size: 12.5px; color: #374151;
          display: flex; align-items: flex-start; gap: 8px;
          line-height: 1.4;
        }
        .sp-svc-check { color: var(--brand); font-weight: 900; flex-shrink: 0; margin-top: 1px; }

        /* ════ PROCESS ═════════════════════════════════════════════════ */
        .sp-process-outer {
          padding: 0 clamp(16px, 4vw, 48px) 64px;
        }
        .sp-process-card {
          background: var(--dark); border-radius: 24px;
          padding: clamp(32px, 5vw, 56px) clamp(24px, 5vw, 56px);
          max-width: 1100px; margin: 0 auto;
          position: relative; overflow: hidden;
        }
        .sp-process-card::before {
          content: '';
          position: absolute; inset: 0;
          background:
            radial-gradient(ellipse at 0% 100%, rgba(226,45,109,0.2) 0%, transparent 55%),
            radial-gradient(ellipse at 100% 0%, rgba(226,45,109,0.1) 0%, transparent 50%);
          pointer-events: none;
        }
        .sp-process-eyebrow {
          font-size: 11px; font-weight: 700; text-transform: uppercase;
          letter-spacing: 2px; color: var(--brand); margin-bottom: 10px;
        }
        .sp-process-h2 {
          font-size: clamp(26px, 3.5vw, 38px);
          font-weight: 900; color: #fff;
          letter-spacing: -0.5px; margin-bottom: 40px;
        }
        .sp-process-steps {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 20px;
          position: relative;
        }
        .sp-process-steps::before {
          content: '';
          position: absolute; top: 28px;
          left: calc(10% + 16px); right: calc(10% + 16px);
          height: 1px; background: rgba(255,255,255,0.15);
          z-index: 0;
        }
        .sp-process-step {
          display: flex; flex-direction: column;
          align-items: center; text-align: center;
          gap: 10px; position: relative; z-index: 1;
        }
        .sp-process-dot {
          width: 56px; height: 56px; border-radius: 50%;
          background: linear-gradient(135deg, var(--brand) 0%, #c0185a 100%);
          display: flex; align-items: center; justify-content: center;
          font-size: 22px;
          box-shadow: 0 4px 16px rgba(226,45,109,0.45);
          flex-shrink: 0;
        }
        .sp-process-num {
          font-size: 11px; font-weight: 700;
          color: rgba(255,255,255,0.4); letter-spacing: 1px;
        }
        .sp-process-title {
          font-size: 14px; font-weight: 700; color: #fff;
        }
        .sp-process-desc {
          font-size: 12px; color: rgba(255,255,255,0.5); line-height: 1.55;
        }

        /* ════ EXPECT ══════════════════════════════════════════════════ */
        .sp-expect-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 16px;
        }
        .sp-expect-item {
          display: flex; flex-direction: column; align-items: center;
          text-align: center; gap: 10px;
          padding: 22px 12px;
          border: 2px solid var(--border); border-radius: 16px;
          background: #fff;
          transition: all 150ms;
        }
        .sp-expect-item:hover {
          border-color: var(--brand);
          background: var(--bg-pink);
          transform: translateY(-3px);
        }
        .sp-expect-icon {
          width: 48px; height: 48px; border-radius: 14px;
          background: var(--bg-pink); border: 1.5px solid #ffd6e4;
          display: flex; align-items: center; justify-content: center;
          font-size: 22px; flex-shrink: 0;
        }
        .sp-expect-label {
          font-size: 12px; font-weight: 700; color: var(--text);
          line-height: 1.4; white-space: pre-line;
        }

        /* ════ CTA ═════════════════════════════════════════════════════ */
        .sp-cta-outer {
          padding: 0 clamp(16px, 4vw, 48px) 80px;
        }
        .sp-cta-card {
          max-width: 1100px; margin: 0 auto;
          background: var(--bg-pink);
          border: 2px solid #ffd6e4;
          border-radius: 24px;
          padding: clamp(32px, 5vw, 60px) clamp(24px, 5vw, 56px);
          display: flex; align-items: center;
          justify-content: space-between; gap: 32px;
        }
        .sp-cta-left { flex: 1; min-width: 0; }
        .sp-cta-eyebrow {
          font-size: 11px; font-weight: 700; text-transform: uppercase;
          letter-spacing: 2px; color: var(--brand); margin-bottom: 10px;
        }
        .sp-cta-h2 {
          font-size: clamp(26px, 4vw, 42px);
          font-weight: 900; color: var(--dark);
          letter-spacing: -0.5px; line-height: 1.1;
          margin-bottom: 12px;
        }
        .sp-cta-p {
          font-size: 14px; color: var(--muted); line-height: 1.65;
          max-width: 420px; margin-bottom: 28px;
        }
        .sp-cta-btn {
          display: inline-flex; align-items: center; gap: 10px;
          background: var(--brand); color: #fff;
          font-size: 14px; font-weight: 700; text-transform: uppercase;
          letter-spacing: 1px;
          padding: 14px 28px; border-radius: 12px;
          text-decoration: none;
          box-shadow: 4px 4px 0 0 var(--dark);
          transition: transform 120ms, box-shadow 120ms;
        }
        .sp-cta-btn:hover { transform: translate(-2px,-2px); box-shadow: 6px 6px 0 0 var(--dark); }
        .sp-cta-right {
          flex-shrink: 0; width: 200px; text-align: center;
          font-size: 90px; line-height: 1; user-select: none;
          opacity: 0.7;
        }

        /* ════ RESPONSIVE ══════════════════════════════════════════════ */
        @media (max-width: 1024px) {
          .sp-services-grid { grid-template-columns: repeat(2, 1fr); }
          .sp-expect-grid   { grid-template-columns: repeat(3, 1fr); }
          .sp-hero          { grid-template-columns: 1fr; padding: 48px 0 40px; }
          .sp-hero-img      { display: none; }
          .sp-hero-badges   { grid-template-columns: repeat(2, 1fr); }
          .sp-process-steps { grid-template-columns: repeat(3, 1fr); }
          .sp-process-steps::before { display: none; }
          .sp-cta-right     { display: none; }
        }

        @media (max-width: 640px) {
          .sp-nav-links        { display: none; }
          .sp-nav-mobile-hide  { display: none; }
          .sp-services-grid    { grid-template-columns: 1fr; gap: 16px; }
          .sp-expect-grid      { grid-template-columns: repeat(2, 1fr); }
          .sp-process-steps    { grid-template-columns: repeat(2, 1fr); }
          .sp-hero-badges      { grid-template-columns: 1fr 1fr; gap: 10px; }
          .sp-section          { padding: 48px clamp(16px, 4vw, 48px); }
          .sp-cta-card         { flex-direction: column; }
        }
      `}</style>

      <div className="sp-page">

        {/* ══ NAV ══════════════════════════════════════════════════════ */}
        <nav className="sp-nav">
          <Link className="sp-nav-brand" href="/">
            <img src="/Portfolio-favi.png" alt="Sre Varshan" />
            <span>SRE VARSHAN</span>
          </Link>

          <ul className="sp-nav-links">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/#about">About Me</Link></li>
            <li><Link href="/services" className="sp-active">Services</Link></li>
            <li><Link href="/#projects">Work</Link></li>
            <li><Link href="/#contact">Contact Me</Link></li>
          </ul>

          <Link className="sp-nav-cta" href="/#contact">
            Let&apos;s Talk →
          </Link>
        </nav>

        {/* ══ HERO ═════════════════════════════════════════════════════ */}
        <div className="sp-hero-outer">
          <div className="sp-hero">

            {/* Left text */}
            <div>
              <span className="sp-hero-eyebrow">SERVICES</span>
              <h1 className="sp-hero-h1">
                Build <em>Smarter.</em><br />
                Grow <em>Faster.</em>
              </h1>
              <p className="sp-hero-p">
                Helping businesses leverage AI, automation, and modern software
                to solve real-world problems.
              </p>

              <div className="sp-hero-badges">
                {HERO_BADGES.map((b) => (
                  <div className="sp-hero-badge" key={b.label}>
                    <img src={b.icon} alt={b.label} />
                    {b.label}
                  </div>
                ))}
              </div>

              <Link className="sp-hero-btn" href="/#contact">
                📅&nbsp; Book a Free Call
              </Link>
            </div>

            {/* Right photo */}
            <div className="sp-hero-img">
              <img src="/icons/new-model-card.png" alt="Sre Varshan" />
            </div>

          </div>
        </div>

        <hr className="sp-divider" />

        {/* ══ SERVICES ═════════════════════════════════════════════════ */}
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
                        <span className="sp-svc-check">✓</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <hr className="sp-divider" />

        {/* ══ PROCESS ══════════════════════════════════════════════════ */}
        <div style={{ padding: "64px 0 0" }}>
          <div className="sp-process-outer">
            <div className="sp-process-card">
              <p className="sp-process-eyebrow">MY PROCESS</p>
              <h2 className="sp-process-h2">How We Work Together</h2>
              <div className="sp-process-steps">
                {PROCESS.map((p) => (
                  <div className="sp-process-step" key={p.step}>
                    <div className="sp-process-dot">{p.icon}</div>
                    <span className="sp-process-num">{p.step}</span>
                    <p className="sp-process-title">{p.title}</p>
                    <p className="sp-process-desc">{p.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <hr className="sp-divider" />

        {/* ══ EXPECT ═══════════════════════════════════════════════════ */}
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

        <hr className="sp-divider" />

        {/* ══ CTA ══════════════════════════════════════════════════════ */}
        <div style={{ paddingTop: "64px" }}>
          <div className="sp-cta-outer">
            <div className="sp-cta-card">
              <div className="sp-cta-left">
                <p className="sp-cta-eyebrow">LET&apos;S BUILD SOMETHING</p>
                <h2 className="sp-cta-h2">
                  Let&apos;s Build Something<br />Amazing Together
                </h2>
                <p className="sp-cta-p">
                  Have an idea or a project in mind? Let&apos;s discuss how
                  I can help you bring it to life.
                </p>
                <Link className="sp-cta-btn" href="/#contact">
                  📅&nbsp; Book a Call
                </Link>
              </div>
              <div className="sp-cta-right">📅</div>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
