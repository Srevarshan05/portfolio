import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Solutions & Services — Sre Varshan | AI, Web Development & Automation",
  description:
    "Explore how Sre Varshan helps businesses with AI-powered solutions, modern web development, business automation, AI chatbots, custom AI systems, and e-receipt billing systems.",
};

/* ─── Data ─────────────────────────────────────────────────────────── */
const SERVICES = [
  {
    icon: "/icons/website.png",
    title: "Website Development",
    desc: "Modern, fast, and responsive websites that help your business build trust and grow online.",
    bullets: [
      "Custom Website Design",
      "Mobile Friendly",
      "Fast Loading",
      "SEO Optimised",
      "Easy to Manage",
    ],
  },
  {
    icon: "/icons/Chatbot.png",
    title: "AI Chatbots & Assistants",
    desc: "Smart chatbots that engage customers, answer questions, and automate conversations 24/7.",
    bullets: [
      "Website Chatbots",
      "WhatsApp Chatbots",
      "AI Customer Support",
      "FAQ Automation",
      "Appointment Booking",
    ],
  },
  {
    icon: "/icons/automation.png",
    title: "AI Workflow Automation",
    desc: "Automate your repetitive tasks and focus on growing your business.",
    bullets: [
      "Email Automation",
      "Google Workspace Automation",
      "Custom Automation",
    ],
  },
  {
    icon: "/icons/Gen-Ai.png",
    title: "Custom AI Solutions",
    desc: "Tailored AI solutions to solve your unique business challenges.",
    bullets: [
      "AI Applications",
      "AI Agents",
      "Document Intelligence",
      "AI Dashboards",
      "Generative AI Integration",
    ],
  },
  {
    icon: "/icons/receipt.png",
    title: "E-Receipt & Business System",
    desc: "Digital billing and business management system to simplify your daily operations.",
    bullets: [
      "Digital Receipts",
      "Inventory Management",
      "Sales & Expense Tracking",
      "Reports & Analytics",
      "GST Ready",
    ],
  },
  {
    icon: "/icons/Consult.png",
    title: "AI Consulting",
    desc: "Get expert guidance to understand AI, plan your products, and build the right solution.",
    bullets: [
      "AI Strategy",
      "Technology Guidance",
      "Product Planning",
      "Proof of Concept",
    ],
  },
];

const PROCESS = [
  {
    step: "1",
    icon: "🔍",
    title: "Discover",
    desc: "We understand your requirements and goals.",
  },
  {
    step: "2",
    icon: "📋",
    title: "Plan",
    desc: "We plan the best solution for you.",
  },
  {
    step: "3",
    icon: "⚙️",
    title: "Build",
    desc: "We build with clean code and modern technologies.",
  },
  {
    step: "4",
    icon: "🔬",
    title: "Test",
    desc: "We test everything to ensure quality.",
  },
  {
    step: "5",
    icon: "🚀",
    title: "Deliver",
    desc: "We deliver on time and provide long-term support.",
  },
];

const EXPECT = [
  { icon: "💬", label: "Clear Communication" },
  { icon: "⚡", label: "Modern Technologies" },
  { icon: "📈", label: "Scalable Solutions" },
  { icon: "⏰", label: "On-Time Delivery" },
  { icon: "🤝", label: "Long-Term Support" },
  { icon: "💰", label: "Affordable for Startups" },
];

/* ─── Page ──────────────────────────────────────────────────────────── */
export default function ServicesPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bangers&family=Open+Sans:wght@400;600;700;800&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .sv-page {
          font-family: 'Open Sans', sans-serif;
          background: #ffffff;
          color: #111827;
          min-height: 100vh;
        }

        /* ── TOP NAV ─────────────────────────────────────────────────── */
        .sv-nav {
          position: sticky; top: 0; z-index: 100;
          background: #fff;
          border-bottom: 2px solid #1C202B;
          box-shadow: 0 3px 0 0 #1C202B;
          display: flex; align-items: center;
          padding: 0 40px; height: 64px;
          gap: 40px;
        }
        .sv-nav-logo {
          font-family: 'Bangers', cursive;
          font-size: 20px; letter-spacing: 2px; color: #1C202B;
          text-decoration: none; text-transform: uppercase;
          display: flex; align-items: center; gap: 10px;
        }
        .sv-nav-logo img {
          width: 36px; height: 36px; border-radius: 50%;
          border: 2px solid #1C202B; object-fit: cover;
        }
        .sv-nav-links {
          display: flex; align-items: center; gap: 4px;
          list-style: none; flex: 1;
        }
        .sv-nav-links a {
          font-family: 'Open Sans', sans-serif;
          font-size: 11px; font-weight: 700; text-transform: uppercase;
          letter-spacing: 0.8px; color: #1C202B; text-decoration: none;
          padding: 6px 14px; border-radius: 9999px;
          transition: all 130ms;
        }
        .sv-nav-links a:hover { background: rgba(28,32,43,0.08); }
        .sv-nav-links a.active {
          background: #E22D6D; color: #fff;
        }
        .sv-nav-cta {
          background: #1C202B; color: #fff !important;
          border-radius: 9999px !important; padding: 8px 18px !important;
          font-size: 11px !important; font-weight: 700 !important;
          text-decoration: none !important;
        }
        .sv-nav-cta:hover { background: #E22D6D !important; }

        /* ── HERO ────────────────────────────────────────────────────── */
        .sv-hero {
          display: grid;
          grid-template-columns: 1fr 420px;
          align-items: center;
          gap: 40px;
          max-width: 1100px; margin: 0 auto;
          padding: 70px 40px 60px;
        }
        .sv-hero-eyebrow {
          font-size: 12px; font-weight: 800; text-transform: uppercase;
          letter-spacing: 2px; color: #E22D6D;
          margin-bottom: 14px;
        }
        .sv-hero-title {
          font-family: 'Bangers', cursive;
          font-size: clamp(44px, 6vw, 70px);
          letter-spacing: 1px; line-height: 1.05;
          color: #1C202B; margin-bottom: 18px;
        }
        .sv-hero-title span { color: #E22D6D; }
        .sv-hero-sub {
          font-size: 15px; color: #6b7280;
          line-height: 1.7; max-width: 480px; margin-bottom: 32px;
        }
        .sv-hero-badges {
          display: flex; flex-wrap: wrap; gap: 18px;
          align-items: center; margin-bottom: 36px;
        }
        .sv-hero-badge {
          display: flex; align-items: center; gap: 8px;
          font-size: 12px; font-weight: 700; color: #374151;
        }
        .sv-hero-badge-icon {
          width: 40px; height: 40px; border-radius: 12px;
          background: #fff0f4; border: 1.5px solid #ffd6e4;
          display: flex; align-items: center; justify-content: center;
        }
        .sv-hero-badge-icon img {
          width: 22px; height: 22px; object-fit: contain;
        }
        .sv-hero-photo {
          position: relative;
          display: flex; align-items: flex-end; justify-content: center;
        }
        .sv-hero-photo img.photo {
          width: 100%; max-width: 380px;
          object-fit: cover; object-position: top;
          border-radius: 24px;
          filter: drop-shadow(0 16px 40px rgba(226,45,109,0.25));
        }
        .sv-hero-cta {
          display: inline-flex; align-items: center; gap: 10px;
          background: #E22D6D; color: #fff;
          font-family: 'Bangers', cursive;
          font-size: 18px; letter-spacing: 1.5px; text-transform: uppercase;
          padding: 14px 28px; border-radius: 14px;
          text-decoration: none;
          box-shadow: 4px 4px 0 0 #1C202B;
          transition: all 150ms;
        }
        .sv-hero-cta:hover { transform: translate(-2px,-2px); box-shadow: 6px 6px 0 0 #1C202B; }

        /* ── SECTION WRAPPER ─────────────────────────────────────────── */
        .sv-section {
          padding: 72px 40px;
          max-width: 1100px; margin: 0 auto;
        }
        .sv-section-eyebrow {
          text-align: center;
          font-size: 11px; font-weight: 800; text-transform: uppercase;
          letter-spacing: 2px; color: #E22D6D;
          margin-bottom: 10px;
        }
        .sv-section-title {
          text-align: center;
          font-family: 'Bangers', cursive;
          font-size: clamp(32px, 4vw, 48px);
          letter-spacing: 1px; color: #1C202B;
          margin-bottom: 8px;
        }
        .sv-section-sub {
          text-align: center;
          font-size: 14px; color: #6b7280;
          margin-bottom: 52px;
        }
        .sv-divider { border: none; border-top: 2px solid #f3f4f6; margin: 0; }

        /* ── SERVICES GRID ───────────────────────────────────────────── */
        .sv-services-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        .sv-service-card {
          background: #fff; border: 2px solid #f3f4f6;
          border-radius: 20px; padding: 28px 24px;
          transition: all 200ms; position: relative;
          overflow: hidden;
        }
        .sv-service-card::before {
          content: ''; position: absolute; top: 0; left: 0;
          width: 100%; height: 4px;
          background: linear-gradient(90deg, #E22D6D, #c0185a);
          transform: scaleX(0); transform-origin: left;
          transition: transform 200ms;
        }
        .sv-service-card:hover { border-color: #E22D6D; box-shadow: 0 8px 32px rgba(226,45,109,0.12); transform: translateY(-4px); }
        .sv-service-card:hover::before { transform: scaleX(1); }
        .sv-service-icon {
          width: 56px; height: 56px; border-radius: 16px;
          background: #fff0f4; border: 1.5px solid #ffd6e4;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 16px;
        }
        .sv-service-icon img { width: 30px; height: 30px; object-fit: contain; }
        .sv-service-title {
          font-family: 'Open Sans', sans-serif;
          font-size: 16px; font-weight: 800; color: #1C202B;
          margin-bottom: 8px;
        }
        .sv-service-desc {
          font-size: 13px; color: #6b7280; line-height: 1.6;
          margin-bottom: 16px;
        }
        .sv-service-bullets { list-style: none; display: flex; flex-direction: column; gap: 6px; }
        .sv-service-bullet {
          font-size: 12.5px; color: #374151;
          display: flex; align-items: center; gap: 8px;
        }
        .sv-service-bullet::before {
          content: '✓'; color: #E22D6D; font-weight: 900;
          font-size: 12px; flex-shrink: 0;
        }

        /* ── PROCESS ─────────────────────────────────────────────────── */
        .sv-process-wrap {
          background: #1C202B; border-radius: 28px;
          padding: 52px 48px; max-width: 1100px;
          margin: 0 40px; position: relative;
          overflow: hidden;
        }
        .sv-process-wrap::before {
          content: ''; position: absolute; inset: 0;
          background: radial-gradient(ellipse at 20% 50%, rgba(226,45,109,0.15) 0%, transparent 60%),
                      radial-gradient(ellipse at 80% 20%, rgba(226,45,109,0.08) 0%, transparent 50%);
          pointer-events: none;
        }
        .sv-process-eyebrow {
          font-size: 11px; font-weight: 800; text-transform: uppercase;
          letter-spacing: 2px; color: #E22D6D; margin-bottom: 10px;
        }
        .sv-process-title {
          font-family: 'Bangers', cursive;
          font-size: clamp(28px, 4vw, 42px);
          letter-spacing: 1px; color: #fff; margin-bottom: 40px;
        }
        .sv-process-steps {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 24px; position: relative;
        }
        .sv-process-steps::before {
          content: '';
          position: absolute; top: 30px; left: 10%; right: 10%; height: 2px;
          background: rgba(255,255,255,0.1);
          z-index: 0;
        }
        .sv-process-step {
          display: flex; flex-direction: column; align-items: center;
          text-align: center; gap: 12px; position: relative; z-index: 1;
        }
        .sv-process-circle {
          width: 60px; height: 60px; border-radius: 50%;
          background: linear-gradient(135deg, #E22D6D, #c0185a);
          display: flex; align-items: center; justify-content: center;
          font-size: 24px;
          box-shadow: 0 6px 20px rgba(226,45,109,0.4);
        }
        .sv-process-num {
          font-family: 'Bangers', cursive;
          font-size: 13px; letter-spacing: 1px; color: rgba(255,255,255,0.5);
        }
        .sv-process-step-title {
          font-family: 'Open Sans', sans-serif;
          font-size: 14px; font-weight: 800; color: #fff;
        }
        .sv-process-step-desc {
          font-size: 12px; color: rgba(255,255,255,0.55); line-height: 1.5;
        }

        /* ── EXPECT ─────────────────────────────────────────────────── */
        .sv-expect-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 20px;
        }
        .sv-expect-item {
          display: flex; flex-direction: column; align-items: center;
          gap: 10px; text-align: center;
          padding: 24px 12px;
          border: 2px solid #f3f4f6; border-radius: 16px;
          transition: all 150ms;
        }
        .sv-expect-item:hover {
          border-color: #E22D6D; background: #fff8fa;
          transform: translateY(-3px);
        }
        .sv-expect-icon {
          width: 48px; height: 48px; border-radius: 14px;
          background: #fff0f4; border: 1.5px solid #ffd6e4;
          display: flex; align-items: center; justify-content: center;
          font-size: 22px;
        }
        .sv-expect-label {
          font-size: 12px; font-weight: 700; color: #374151;
          line-height: 1.3;
        }

        /* ── CTA BANNER ──────────────────────────────────────────────── */
        .sv-cta-wrap {
          background: linear-gradient(135deg, #fff0f4 0%, #fce4ed 100%);
          border: 2px solid #ffd6e4;
          border-radius: 28px;
          padding: 60px 48px;
          max-width: 1100px; margin: 0 40px 80px;
          display: flex; align-items: center;
          justify-content: space-between; gap: 32px;
        }
        .sv-cta-left { flex: 1; }
        .sv-cta-eyebrow {
          font-size: 11px; font-weight: 800; text-transform: uppercase;
          letter-spacing: 2px; color: #E22D6D; margin-bottom: 10px;
        }
        .sv-cta-title {
          font-family: 'Bangers', cursive;
          font-size: clamp(32px, 4vw, 52px);
          letter-spacing: 1px; color: #1C202B; line-height: 1.05;
          margin-bottom: 12px;
        }
        .sv-cta-sub {
          font-size: 14px; color: #6b7280; line-height: 1.6;
          max-width: 420px;
        }
        .sv-cta-btn {
          display: inline-flex; align-items: center; gap: 10px;
          background: #E22D6D; color: #fff;
          font-family: 'Bangers', cursive;
          font-size: 18px; letter-spacing: 1.5px; text-transform: uppercase;
          padding: 14px 28px; border-radius: 14px;
          text-decoration: none; white-space: nowrap;
          box-shadow: 4px 4px 0 0 #1C202B;
          margin-top: 28px; transition: all 150ms;
          display: inline-flex;
        }
        .sv-cta-btn:hover { transform: translate(-2px,-2px); box-shadow: 6px 6px 0 0 #1C202B; }
        .sv-cta-right {
          flex-shrink: 0; font-size: 100px; line-height: 1;
          opacity: 0.8;
        }

        /* ── RESPONSIVE ──────────────────────────────────────────────── */
        @media (max-width: 1000px) {
          .sv-services-grid { grid-template-columns: repeat(2, 1fr); }
          .sv-expect-grid   { grid-template-columns: repeat(3, 1fr); }
          .sv-process-steps { grid-template-columns: repeat(3, 1fr); }
          .sv-process-steps::before { display: none; }
          .sv-hero { grid-template-columns: 1fr; padding: 50px 24px 40px; }
          .sv-hero-photo { display: none; }
          .sv-cta-wrap { flex-direction: column; margin: 0 24px 60px; padding: 40px 28px; }
          .sv-cta-right { display: none; }
          .sv-process-wrap { margin: 0 24px; padding: 40px 28px; }
        }

        @media (max-width: 640px) {
          .sv-nav { padding: 0 16px; gap: 16px; }
          .sv-nav-links { display: none; }
          .sv-services-grid { grid-template-columns: 1fr; gap: 16px; }
          .sv-expect-grid   { grid-template-columns: repeat(2, 1fr); }
          .sv-process-steps { grid-template-columns: repeat(2, 1fr); }
          .sv-section { padding: 48px 20px; }
          .sv-process-wrap { margin: 0 16px; padding: 32px 20px; }
          .sv-cta-wrap { margin: 0 16px 48px; }
        }
      `}</style>

      <div className="sv-page">

        {/* ══ STICKY NAV ════════════════════════════════════════════════ */}
        <nav className="sv-nav">
          <Link className="sv-nav-logo" href="/">
            <img src="/Portfolio-favi.png" alt="Sre Varshan" />
            SRE VARSHAN
          </Link>
          <ul className="sv-nav-links">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/#about">About Me</Link></li>
            <li><Link href="/services" className="active">Services</Link></li>
            <li><Link href="/#projects">Work</Link></li>
            <li><Link href="/#contact">Contact Me</Link></li>
          </ul>
          <Link className="sv-nav-cta" href="/#contact">Let&apos;s Talk →</Link>
        </nav>

        {/* ══ HERO ══════════════════════════════════════════════════════ */}
        <section className="sv-hero">
          <div>
            <p className="sv-hero-eyebrow">SERVICES</p>
            <h1 className="sv-hero-title">
              Build <span>Smarter.</span><br />Grow <span>Faster.</span>
            </h1>
            <p className="sv-hero-sub">
              Helping businesses leverage AI, automation, and modern software to solve
              real-world problems.
            </p>

            <div className="sv-hero-badges">
              {[
                { icon: "/icons/Gen-Ai.png", label: "AI-Powered Solutions" },
                { icon: "/icons/website.png", label: "Clean & Scalable Code" },
                { icon: "/icons/mobile.png",  label: "On-Time Delivery" },
                { icon: "/icons/Consult.png", label: "Long-Term Support" },
              ].map((b) => (
                <div className="sv-hero-badge" key={b.label}>
                  <div className="sv-hero-badge-icon">
                    <img src={b.icon} alt={b.label} />
                  </div>
                  {b.label}
                </div>
              ))}
            </div>

            <Link className="sv-hero-cta" href="/#contact">
              📅 Book a Free Call →
            </Link>
          </div>

          <div className="sv-hero-photo">
            <img
              className="photo"
              src="/icons/new-model-card.png"
              alt="Sre Varshan"
            />
          </div>
        </section>

        <hr className="sv-divider" />

        {/* ══ SERVICES ══════════════════════════════════════════════════ */}
        <section className="sv-section">
          <p className="sv-section-eyebrow">WHAT I DO</p>
          <h2 className="sv-section-title">Services I Provide</h2>
          <p className="sv-section-sub">Simple solutions. Powerful results.</p>

          <div className="sv-services-grid">
            {SERVICES.map((svc) => (
              <div className="sv-service-card" key={svc.title}>
                <div className="sv-service-icon">
                  <img src={svc.icon} alt={svc.title} />
                </div>
                <h3 className="sv-service-title">{svc.title}</h3>
                <p className="sv-service-desc">{svc.desc}</p>
                <ul className="sv-service-bullets">
                  {svc.bullets.map((b) => (
                    <li className="sv-service-bullet" key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <hr className="sv-divider" />

        {/* ══ PROCESS ═══════════════════════════════════════════════════ */}
        <div style={{ padding: "72px 0" }}>
          <div className="sv-process-wrap">
            <p className="sv-process-eyebrow">MY PROCESS</p>
            <h2 className="sv-process-title">How We Work Together</h2>
            <div className="sv-process-steps">
              {PROCESS.map((p) => (
                <div className="sv-process-step" key={p.step}>
                  <div className="sv-process-circle">{p.icon}</div>
                  <span className="sv-process-num">{p.step}</span>
                  <p className="sv-process-step-title">{p.title}</p>
                  <p className="sv-process-step-desc">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <hr className="sv-divider" />

        {/* ══ EXPECT ════════════════════════════════════════════════════ */}
        <section className="sv-section">
          <p className="sv-section-eyebrow">WHY WORK WITH ME</p>
          <h2 className="sv-section-title">What You Can Expect</h2>
          <p className="sv-section-sub" style={{ marginBottom: "40px" }}>&nbsp;</p>
          <div className="sv-expect-grid">
            {EXPECT.map((e) => (
              <div className="sv-expect-item" key={e.label}>
                <div className="sv-expect-icon">{e.icon}</div>
                <span className="sv-expect-label">{e.label}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="sv-divider" />

        {/* ══ CTA BANNER ════════════════════════════════════════════════ */}
        <div style={{ padding: "72px 0" }}>
          <div className="sv-cta-wrap">
            <div className="sv-cta-left">
              <p className="sv-cta-eyebrow">LET&apos;S BUILD SOMETHING</p>
              <h2 className="sv-cta-title">
                Let&apos;s Build Something<br />Amazing Together
              </h2>
              <p className="sv-cta-sub">
                Have an idea or a project in mind? Let&apos;s discuss how I can help you bring it to life.
              </p>
              <Link className="sv-cta-btn" href="/#contact">
                📅 Book a Call →
              </Link>
            </div>
            <div className="sv-cta-right">📅</div>
          </div>
        </div>

      </div>
    </>
  );
}
