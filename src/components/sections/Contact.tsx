"use client";

import { useState, useRef } from "react";
import dynamic from "next/dynamic";
import { useScrollReveal } from "@/lib/useScrollReveal";

const BlobCharacter = dynamic(() => import("../blob/BlobCharacter"), { ssr: false });

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef as React.RefObject<HTMLElement>);

  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <section id="contact" className="section section-light" ref={sectionRef}>
      <div className="container section-content">

        {/* Header */}
        <div className="section-header" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px", alignItems: "flex-end" }}>
          <div className="reveal reveal-left">
            <div className="eyebrow" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <img src="/icons/contact.png" alt="" style={{ width: "16px", height: "16px", objectFit: "contain" }} />
              Get in Touch
            </div>
            <h2 style={{ marginBottom: 0 }}>Let&apos;s Build<br />Something Great.</h2>
          </div>
          <div className="reveal reveal-right" style={{ paddingBottom: "4px" }}>
            <p className="leading" style={{ color: "var(--color-body)" }}>
              Project ideas, research collaborations, or just want to say hi —
              I&apos;m always open to interesting conversations.
            </p>
          </div>
        </div>

        {/* Content: 3-col layout — form | blob | links */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 240px 260px", gap: "40px", alignItems: "start" }}>

          {/* ── Form ── */}
          <div className="reveal contact-form-card">
            {/* Top Badge */}
            <div className="contact-form-badge" style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
              <img src="/icons/contact.png" alt="" style={{ width: "12px", height: "12px", objectFit: "contain", filter: "brightness(0)" }} />
              GET IN TOUCH
            </div>

            <h3 className="contact-form-title">GET STARTED</h3>
            <p className="contact-form-subtitle">Leave a message and I&apos;ll get back to you within 24 hours.</p>

            {submitted ? (
              <div className="card card-feature" style={{ borderColor: "var(--border-success)", background: "var(--success-soft)", boxShadow: "8px 8px 0 0 var(--success)", textAlign: "center", position: "relative", zIndex: 2 }}>
                <div style={{ fontSize: "48px", marginBottom: "16px" }}>✅</div>
                <h4 style={{ color: "var(--fg-success)", marginBottom: "12px" }}>Message Sent!</h4>
                <p className="normal" style={{ color: "var(--fg-success)", margin: "0 auto" }}>
                  Thanks, {form.name || "friend"}! I&apos;ll get back within 24 hours.
                </p>
                <button onClick={() => setSubmitted(false)} className="btn btn-brand btn-base" style={{ marginTop: "24px" }} id="contact-send-another">
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: "20px", position: "relative", zIndex: 2 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <div className="input-wrapper">
                    <label htmlFor="contact-name" className="input-label" style={{ color: "#1C202B", fontWeight: 800 }}>Name</label>
                    <input type="text" id="contact-name" name="name" className="contact-input-field" placeholder="Your name" value={form.name} onChange={handle} required />
                  </div>
                  <div className="input-wrapper">
                    <label htmlFor="contact-email" className="input-label" style={{ color: "#1C202B", fontWeight: 800 }}>Email</label>
                    <input
                      type="email" id="contact-email" name="email" className="contact-input-field"
                      placeholder="you@example.com" value={form.email} onChange={handle}
                      onFocus={() => window.dispatchEvent(new Event("blob-privacy-on"))}
                      onBlur={() => window.dispatchEvent(new Event("blob-privacy-off"))}
                      required
                    />
                  </div>
                </div>

                <div className="input-wrapper">
                  <label htmlFor="contact-subject" className="input-label" style={{ color: "#1C202B", fontWeight: 800 }}>Subject</label>
                  <input type="text" id="contact-subject" name="subject" className="contact-input-field" placeholder="Project, collab, or hello" value={form.subject} onChange={handle} required />
                </div>

                <div className="input-wrapper">
                  <label htmlFor="contact-message" className="input-label" style={{ color: "#1C202B", fontWeight: 800 }}>Message</label>
                  <textarea id="contact-message" name="message" className="contact-input-field contact-textarea-field" placeholder="Tell me about your idea…" value={form.message} onChange={handle} required />
                </div>

                <button type="submit" className="contact-submit-btn" disabled={submitting} id="contact-submit">
                  {submitting ? (
                    <>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" style={{ animation: "spin 1s linear infinite" }} aria-hidden="true">
                        <path d="M21 12a9 9 0 00-9-9"/>
                      </svg>
                      Sending…
                    </>
                  ) : (
                    <>
                      Send Message →
                    </>
                  )}
                </button>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    fontFamily: "'Open Sans', sans-serif",
                    fontSize: "11px",
                    color: "#1C202B",
                    fontWeight: 700,
                    marginTop: "12px",
                    justifyContent: "center",
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2BB04A" strokeWidth="2.5">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                  Your email is safe with me — no spam, ever.
                </div>
              </form>
            )}
          </div>

          {/* ── Blob ── */}
          <div className="reveal stagger-2" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", paddingTop: "8px" }}>
            <BlobCharacter />
            <p className="small" style={{ color: "var(--color-body-subtle)", textAlign: "center", fontStyle: "italic", maxWidth: "180px" }}>
              Focus the email field and watch what happens 👀
            </p>
          </div>

          {/* ── Quick Links ── */}
          <div className="reveal stagger-3">
            <div className="card card-feature" style={{ padding: "28px" }}>
              <h5 style={{ marginBottom: "20px" }}>Find Me Online</h5>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {[
                  { label: "GitHub",          href: "https://github.com/srevarshan",      icon: "/icons/github.png", sub: "View my code" },
                  { label: "LinkedIn",        href: "https://linkedin.com/in/srevarshan", icon: "/icons/linkedin.png", sub: "Connect" },
                  { label: "Resume (PDF)",    href: "/resume.pdf",                        icon: "/icons/cv.png", sub: "Download / View" },
                ].map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    id={`contact-link-${l.label.toLowerCase().replace(/\s|\(|\)/g, "-")}`}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      padding: "12px 14px",
                      background: "var(--section-light)",
                      border: "2px solid var(--border-default)",
                      borderRadius: "var(--radius-base)",
                      textDecoration: "none",
                      boxShadow: "var(--shadow-2xs)",
                      transition: "transform 100ms, box-shadow 100ms, border-color 120ms",
                    }}
                    onMouseEnter={(e) => {
                      const t = e.currentTarget as HTMLElement;
                      t.style.transform = "translate(-2px,-2px)";
                      t.style.boxShadow = "var(--shadow-sm)";
                      t.style.borderColor = "var(--brand)";
                    }}
                    onMouseLeave={(e) => {
                      const t = e.currentTarget as HTMLElement;
                      t.style.transform = "";
                      t.style.boxShadow = "var(--shadow-2xs)";
                      t.style.borderColor = "var(--border-default)";
                    }}
                  >
                    {l.icon.endsWith(".png") ? (
                      <img src={l.icon} alt="" style={{ width: "20px", height: "20px", objectFit: "contain" }} />
                    ) : (
                      <span style={{ fontSize: "20px" }}>{l.icon}</span>
                    )}
                    <div>
                      <div style={{ fontFamily: "'Open Sans', sans-serif", fontSize: "14px", fontWeight: 700, color: "var(--color-heading)" }}>{l.label}</div>
                      <div style={{ fontFamily: "'Open Sans', sans-serif", fontSize: "11px", color: "var(--color-body-subtle)" }}>{l.sub}</div>
                    </div>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--color-body-subtle)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: "auto" }} aria-hidden="true">
                      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
                      <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                    </svg>
                  </a>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        .contact-form-card {
          background: #FFE5EE;
          border: 6px dashed var(--brand);
          box-shadow: 10px 10px 0 0 #1C202B;
          border-radius: 8px;
          padding: 44px 36px 36px 36px;
          position: relative;
        }
        .contact-form-badge {
          position: absolute;
          top: -14px;
          left: 24px;
          background: #1C202B;
          border: 2px solid #1C202B;
          color: #FFFFFF;
          padding: 6px 12px;
          font-family: 'Open Sans', sans-serif;
          font-size: 10px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          border-radius: 2px;
          z-index: 5;
        }
        .contact-form-title {
          font-family: 'Bangers', cursive;
          font-size: 38px;
          color: #1C202B;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          margin: 0 0 4px 0;
          transform: skewX(-6deg);
          font-style: italic;
        }
        .contact-form-subtitle {
          font-family: 'Open Sans', sans-serif;
          font-size: 13px;
          color: #1C202B;
          opacity: 0.8;
          margin: 0 0 28px 0;
          font-weight: 600;
        }
        .contact-input-field {
          width: 100%;
          background: #FFFFFF;
          border: 3px solid #1C202B;
          box-shadow: 4px 4px 0 0 #1C202B;
          border-radius: 6px;
          padding: 12px 16px;
          font-family: 'Open Sans', sans-serif;
          font-size: 14px;
          color: #1C202B;
          outline: none;
          transition: box-shadow 150ms, border-color 150ms;
        }
        .contact-input-field:focus {
          border-color: #1C202B;
          box-shadow: 4px 4px 0 0 var(--brand);
        }
        .contact-textarea-field {
          min-height: 120px;
          resize: vertical;
        }
        .contact-submit-btn {
          width: 100%;
          background: #1C202B;
          border: 3px solid #1C202B;
          box-shadow: 5px 5px 0 0 var(--brand);
          color: #FFFFFF;
          padding: 16px 24px;
          font-family: 'Open Sans', sans-serif;
          font-size: 14px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          border-radius: 4px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: transform 80ms, box-shadow 80ms;
        }
        .contact-submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .contact-submit-btn:hover:not(:disabled) {
          transform: translate(-2px, -2px);
          box-shadow: 7px 7px 0 0 var(--brand);
        }
        .contact-submit-btn:active:not(:disabled) {
          transform: translate(2px, 2px);
          box-shadow: 1px 1px 0 0 var(--brand);
        }
        @media (max-width: 900px) {
          #contact .container > div:last-child {
            grid-template-columns: 1fr !important;
          }
          #contact .container > div:last-child > div:nth-child(2),
          #contact .container > div:last-child > div:nth-child(3) {
            display: none !important;
          }
          #contact .container > div:first-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
