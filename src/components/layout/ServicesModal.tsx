"use client";

import { useEffect, useState } from "react";

export default function ServicesModal() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show the modal after 3 seconds, only once per session
    if (typeof sessionStorage !== "undefined" && sessionStorage.getItem("sv-services-seen")) return;
    const t = setTimeout(() => setVisible(true), 3000);
    return () => clearTimeout(t);
  }, []);

  const close = () => {
    setVisible(false);
    if (typeof sessionStorage !== "undefined") {
      sessionStorage.setItem("sv-services-seen", "1");
    }
  };

  if (!visible) return null;

  return (
    <>
      {/* ── Google Fonts for modal ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');

        .sv-modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.82);
          backdrop-filter: blur(6px);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
          overflow-y: auto;
          animation: sv-fade-in 0.35s ease;
        }
        @keyframes sv-fade-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .sv-modal-container {
          position: relative;
          width: 100%;
          max-width: 1100px;
          background: #0f1115;
          border-radius: 2rem;
          overflow: hidden;
          box-shadow: 0 20px 60px -15px rgba(0,0,0,0.8);
          animation: sv-slide-up 0.4s cubic-bezier(0.22,1,0.36,1);
          margin: auto;
        }
        @keyframes sv-slide-up {
          from { opacity: 0; transform: translateY(40px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .sv-close-btn {
          position: absolute;
          top: 20px;
          right: 20px;
          width: 40px;
          height: 40px;
          background: #ffffff;
          border: none;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          font-weight: bold;
          color: #111;
          cursor: pointer;
          z-index: 20;
          transition: background 150ms;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          font-family: 'Material Symbols Outlined', sans-serif;
        }
        .sv-close-btn:hover { background: #f0f0f0; }

        /* Header */
        .sv-header {
          position: relative;
          background: #f8f9fa;
          padding: 60px 64px 100px;
          text-align: center;
          clip-path: polygon(0 0, 100% 0, 100% calc(100% - 40px), 0 100%);
        }
        .sv-header-bg {
          position: absolute;
          inset: 0;
          opacity: 0.1;
          pointer-events: none;
          background: radial-gradient(circle at 100% 0%, #FF007F, transparent 50%),
                      radial-gradient(circle at 0% 100%, #11131b, transparent 50%);
        }
        .sv-header-inner {
          position: relative;
          z-index: 10;
          max-width: 800px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .sv-logo-box {
          width: 96px;
          height: 96px;
          margin-bottom: 24px;
          background: #111;
          border-radius: 16px;
          transform: rotate(-3deg);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 24px rgba(0,0,0,0.3);
          overflow: hidden;
        }
        .sv-logo-box img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .sv-tagline {
          font-family: 'Inter', sans-serif;
          font-size: 15px;
          font-style: italic;
          color: #FF007F;
          margin-bottom: 12px;
        }
        .sv-headline {
          font-family: 'Inter', sans-serif;
          font-size: clamp(36px, 6vw, 64px);
          font-weight: 900;
          letter-spacing: -0.04em;
          text-transform: uppercase;
          color: #0f1115;
          margin-bottom: 16px;
          line-height: 1.05;
        }
        .sv-subtext {
          font-family: 'Inter', sans-serif;
          font-size: 17px;
          line-height: 1.6;
          color: rgba(15,17,21,0.75);
          max-width: 580px;
          margin: 0 auto 24px;
        }
        .sv-subtext span.sv-accent {
          color: #FF007F;
          font-weight: 700;
        }
        .sv-badges {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 16px 28px;
        }
        .sv-badge {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          font-weight: 600;
          color: rgba(15,17,21,0.65);
        }
        .sv-badge .ms { font-family: 'Material Symbols Outlined'; font-size: 18px; color: #FF007F; }

        /* Body */
        .sv-body {
          background: #0f1115;
          padding: 0 32px 40px;
          margin-top: -16px;
        }
        .sv-pill-row {
          display: flex;
          justify-content: center;
          margin-bottom: 36px;
          padding-top: 24px;
        }
        .sv-pill {
          background: #1a1c24;
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 9999px;
          padding: 10px 28px;
          font-family: 'Inter', sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #e1e2ed;
        }
        .sv-cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-bottom: 40px;
        }
        @media (max-width: 900px) {
          .sv-cards-grid { grid-template-columns: repeat(2, 1fr); }
          .sv-header { padding: 48px 32px 80px; }
          .sv-body { padding: 0 20px 32px; }
        }
        @media (max-width: 600px) {
          .sv-cards-grid { grid-template-columns: 1fr; }
          .sv-header { padding: 48px 20px 80px; }
        }
        .sv-card {
          background: #fff;
          border-radius: 16px;
          padding: 28px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.15);
          position: relative;
          overflow: hidden;
          transition: transform 250ms cubic-bezier(0.22,1,0.36,1);
        }
        .sv-card:hover { transform: translateY(-4px); }
        .sv-card-glow {
          position: absolute;
          right: -12px;
          bottom: -12px;
          width: 56px;
          height: 56px;
          background: #FF007F;
          border-radius: 50%;
          opacity: 0.08;
          transition: transform 500ms;
        }
        .sv-card:hover .sv-card-glow { transform: scale(3.2); }
        .sv-card-icon-wrap {
          width: 48px;
          height: 48px;
          background: #11131b;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
          border: 1px solid rgba(255,255,255,0.08);
        }
        .sv-card-icon-wrap .ms {
          font-family: 'Material Symbols Outlined';
          font-size: 26px;
          color: #e1e2ed;
        }
        .sv-card-title {
          font-family: 'Inter', sans-serif;
          font-size: 17px;
          font-weight: 800;
          color: #0f1115;
          margin-bottom: 10px;
          line-height: 1.3;
        }
        .sv-card-divider {
          width: 28px;
          height: 3px;
          background: #FF007F;
          border-radius: 9999px;
          margin-bottom: 16px;
        }
        .sv-card-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .sv-card-list li {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          color: rgba(15,17,21,0.75);
        }
        .sv-card-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #FF007F;
          flex-shrink: 0;
          margin-top: 5px;
        }

        /* CTA Banner */
        .sv-cta-banner {
          background: #1a1c24;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 16px;
          padding: 28px 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          flex-wrap: wrap;
          margin-bottom: 20px;
        }
        .sv-cta-left {
          display: flex;
          align-items: center;
          gap: 20px;
        }
        .sv-cta-icon-wrap {
          width: 56px;
          height: 56px;
          background: #282a32;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(255,255,255,0.1);
          flex-shrink: 0;
        }
        .sv-cta-icon-wrap .ms {
          font-family: 'Material Symbols Outlined';
          font-size: 28px;
          color: #FF007F;
        }
        .sv-cta-title {
          font-family: 'Inter', sans-serif;
          font-size: 22px;
          font-weight: 800;
          color: #e1e2ed;
          margin-bottom: 4px;
        }
        .sv-cta-sub {
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          color: #909095;
        }
        .sv-cta-btn {
          background: #FF007F;
          border: none;
          border-radius: 14px;
          padding: 14px 28px;
          font-family: 'Inter', sans-serif;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #fff;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 10px;
          transition: background 150ms, box-shadow 150ms;
          box-shadow: 0 0 20px rgba(255,0,127,0.35);
          white-space: nowrap;
          text-decoration: none;
        }
        .sv-cta-btn:hover {
          background: #e60073;
          box-shadow: 0 0 32px rgba(255,0,127,0.55);
        }
        .sv-cta-btn .ms {
          font-family: 'Material Symbols Outlined';
          font-size: 20px;
        }
        .sv-footer-note {
          text-align: center;
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          color: #909095;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }
        .sv-footer-note .ms {
          font-family: 'Material Symbols Outlined';
          font-size: 16px;
          color: #FF007F;
        }
        .sv-accent-text { color: #FF007F; font-weight: 600; }
      `}</style>

      <div className="sv-modal-backdrop" onClick={(e) => { if (e.target === e.currentTarget) close(); }}>
        <div className="sv-modal-container">
          {/* Close Button */}
          <button className="sv-close-btn" onClick={close} aria-label="Close services modal">
            <span className="ms">close</span>
          </button>

          {/* Header */}
          <div className="sv-header">
            <div className="sv-header-bg" />
            <div className="sv-header-inner">
              {/* Logo */}
              <div className="sv-logo-box">
                <img src="/Portfolio-favi.png" alt="Sre Varshan logo" />
              </div>
              <p className="sv-tagline">Let&apos;s build something</p>
              <h1 className="sv-headline">Extraordinary</h1>
              <p className="sv-subtext">
                I help startups, businesses &amp; innovators turn ideas into{" "}
                <span className="sv-accent">AI-powered solutions</span> and custom softwares at affordable prices.
              </p>
              <div className="sv-badges">
                {[
                  { icon: "check_circle", text: "Clean Code" },
                  { icon: "check_circle", text: "Scalable Solutions" },
                  { icon: "check_circle", text: "Modern AI" },
                  { icon: "check_circle", text: "Real Results" },
                ].map((b) => (
                  <div className="sv-badge" key={b.text}>
                    <span className="ms">{b.icon}</span>
                    {b.text}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="sv-body">
            <div className="sv-pill-row">
              <div className="sv-pill">How I can help you</div>
            </div>

            <div className="sv-cards-grid">
              {[
                {
                  icon: "language",
                  title: "Website Development",
                  items: ["Static & Dynamic Websites", "Custom Web Applications", "Modern & Responsive Design"],
                },
                {
                  icon: "forum",
                  title: "AI Chatbot Solutions",
                  items: ["Smart AI Chatbots", "Custom Trained Models", "24/7 Automated Support"],
                },
                {
                  icon: "account_tree",
                  title: "AI Workflow Automation",
                  items: ["Process Automation", "Business Workflow Design", "API Integrations"],
                },
                {
                  icon: "memory",
                  title: "Generative AI Integration",
                  items: ["LLM Integration (OpenAI, etc.)", "RAG Applications", "Prompt Engineering"],
                },
                {
                  icon: "receipt_long",
                  title: "Online E-Receipt Applications",
                  items: ["Payment Gateway", "Income Tracker", "Advanced Analytics"],
                },
                {
                  icon: "lightbulb",
                  title: "AI Consulting & Strategy",
                  items: ["Technical Consultation", "Use Case Discovery", "Architecture Design"],
                },
              ].map((card) => (
                <div className="sv-card" key={card.title}>
                  <div className="sv-card-glow" />
                  <div className="sv-card-icon-wrap">
                    <span className="ms">{card.icon}</span>
                  </div>
                  <div className="sv-card-title">{card.title}</div>
                  <div className="sv-card-divider" />
                  <ul className="sv-card-list">
                    {card.items.map((item) => (
                      <li key={item}>
                        <span className="sv-card-dot" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* CTA Banner */}
            <div className="sv-cta-banner">
              <div className="sv-cta-left">
                <div className="sv-cta-icon-wrap">
                  <span className="ms">calendar_month</span>
                </div>
                <div>
                  <div className="sv-cta-title">Let&apos;s discuss your project</div>
                  <div className="sv-cta-sub">30-Min Free Discovery Call</div>
                </div>
              </div>
              <a
                href="mailto:srevarshan9600622@gmail.com?subject=Free%20Discovery%20Call%20-%20Portfolio%20Inquiry"
                className="sv-cta-btn"
              >
                BOOK A FREE CALL
                <span className="ms">arrow_forward</span>
              </a>
            </div>

            {/* Footer Note */}
            <div className="sv-footer-note">
              <span className="ms">verified</span>
              Trusted by founders &amp; teams to deliver{" "}
              <span className="sv-accent-text">reliable, production-ready</span> solutions.
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
