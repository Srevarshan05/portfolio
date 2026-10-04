"use client";

import { useRef, useState } from "react";
import { useScrollReveal } from "@/lib/useScrollReveal";
import { EMAIL, profileById } from "@/lib/profiles";

const github = profileById("github");
const linkedin = profileById("linkedin");

function BrandMark({ path, color }: { path: string; color: string }) {
  return (
    <span className="cn-mark" style={{ color }} aria-hidden="true">
      <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor"><path d={path} /></svg>
    </span>
  );
}

export default function ConnectSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef as React.RefObject<HTMLElement>);
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch { /* clipboard blocked — the address stays visible */ }
  };

  const writeHere = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.setTimeout(() => document.getElementById("contact-email")?.focus({ preventScroll: true }), 650);
  };

  return (
    <section id="connect" className="cn-section" ref={sectionRef} aria-labelledby="connect-title">
      <div className="cn-paper" aria-hidden="true" />

      <div className="cn-inner">
        <div className="reveal"><h2 id="connect-title" className="cn-title">Connect with me</h2></div>

        <div className="cn-board">
          {/* Email note */}
          <div className="cn-col-mail reveal reveal-left">
          <div className="cn-note cn-note-mail">
            <div className="cn-note-head">
              <span className="cn-mark cn-mark-mail" aria-hidden="true">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2.5" y="4.5" width="19" height="15" rx="2" />
                  <path d="m3 6 9 7 9-7" />
                </svg>
              </span>
              <h3 className="cn-note-title">Email</h3>
            </div>
            <a className="cn-address" href={`mailto:${EMAIL}`}>{EMAIL}</a>
            <div className="cn-note-actions">
              <button type="button" className="cn-btn" onClick={copy}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
                <span aria-live="polite">{copied ? "Copied!" : "Copy"}</span>
              </button>
              <a className="cn-btn cn-btn-dark" href="#contact" onClick={writeHere}>Write to me</a>
            </div>
          </div>
          </div>

          {/* The sketch — intentional artwork, kept */}
          <figure className="cn-figure reveal-scale">
            <img src="/sketch-holding.webp" alt="Pencil sketch of Sre Varshan holding a hardware prototype" width={628} height={774} loading="lazy" decoding="async" />
            <svg className="cn-arrow cn-arrow-mail" viewBox="0 0 160 120" fill="none" aria-hidden="true">
              <path d="M6 10c40 4 30 60 70 70s50 26 76 32" stroke="#1C202B" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="7 8" />
              <path d="m140 102 13 10-16 4" stroke="#1C202B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <svg className="cn-arrow cn-arrow-gh" viewBox="0 0 160 90" fill="none" aria-hidden="true">
              <path d="M154 8c-30 0-40 30-70 40S30 70 10 82" stroke="#1C202B" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="7 8" />
              <path d="m24 84-15-1 7-13" stroke="#1C202B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <svg className="cn-arrow cn-arrow-li" viewBox="0 0 160 120" fill="none" aria-hidden="true">
              <path d="M150 8c10 40-40 30-50 60s-50 30-90 42" stroke="#1C202B" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="7 8" />
              <path d="m24 116-15-5 11-11" stroke="#1C202B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </figure>

          {/* Profiles */}
          <div className="cn-links reveal reveal-right stagger-2">
            {[github, linkedin].map((p) => (
              <a
                key={p.id}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`cn-note cn-link cn-link-${p.id}`}
              >
                <div className="cn-note-head">
                  <BrandMark path={p.svgPath} color={p.color} />
                  <span className="cn-note-title">{p.name}</span>
                  <svg className="cn-go" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9" /></svg>
                </div>
                <span className="cn-handle">{p.handle}</span>
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .cn-section {
          position: relative;
          overflow: hidden;
          background: #F4F3F0;
          padding: 96px 40px 0;
          isolation: isolate;
        }
        .cn-paper {
          position: absolute;
          inset: 0;
          z-index: -1;
          background:
            radial-gradient(ellipse 70% 60% at 50% 55%, rgba(255,255,255,0.7), transparent 70%),
            linear-gradient(to bottom, #F4F3F0 80%, #ECEAE4);
        }
        .cn-inner { max-width: 1180px; margin: 0 auto; }
        .cn-title {
          text-align: center;
          font-size: clamp(38px, 5vw, 60px);
          letter-spacing: 1.5px;
          color: #1C202B;
          margin: 0 0 28px;
          transform: skewX(-5deg);
        }

        .cn-board {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(280px, 440px) minmax(0, 1fr);
          align-items: center;
          gap: 24px;
        }

        /* Notes: hand-placed paper cards */
        .cn-note {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 10px;
          background: #FFFFFF;
          color: #1C202B;
          border: 3px solid #1C202B;
          border-radius: 10px;
          box-shadow: 6px 6px 0 0 #1C202B;
          padding: 20px 22px;
          text-decoration: none;
          max-width: 340px;
        }
        .cn-col-mail { display: flex; justify-content: flex-end; }
        .cn-note-mail { transform: rotate(-1.5deg); }
        .cn-note-head { display: flex; align-items: center; gap: 12px; }
        .cn-mark {
          width: 48px;
          height: 48px;
          flex-shrink: 0;
          display: grid;
          place-items: center;
          background: #F4F6FF;
          border: 2px solid #1C202B;
          border-radius: 8px;
        }
        .cn-mark-mail { color: var(--brand); }
        .cn-note-title {
          font-family: 'Bangers', cursive;
          font-size: 30px;
          letter-spacing: 1px;
          line-height: 1;
          text-transform: uppercase;
          color: #1C202B;
          margin: 0;
        }
        .cn-address {
          font-size: 15px;
          font-weight: 700;
          color: #1C202B;
          text-decoration-color: var(--brand);
          text-decoration-thickness: 2px;
          overflow-wrap: anywhere;
        }
        .cn-address:hover { color: var(--brand-strong); }
        .cn-note-actions { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 4px; }
        .cn-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          min-height: 44px;
          padding: 8px 16px;
          border: 2px solid #1C202B;
          border-radius: 6px;
          background: #FFFFFF;
          color: #1C202B;
          font: 800 13px 'Open Sans', sans-serif;
          letter-spacing: 0.4px;
          text-decoration: none;
          cursor: pointer;
          transition: transform 100ms ease-out, box-shadow 100ms ease-out, background 150ms;
          box-shadow: 3px 3px 0 0 #1C202B;
        }
        .cn-btn:hover { transform: translate(-1px, -1px); box-shadow: 4px 4px 0 0 #1C202B; color: #1C202B; }
        .cn-btn:active { transform: translate(2px, 2px); box-shadow: 1px 1px 0 0 #1C202B; }
        .cn-btn-dark { background: #1C202B; color: #FFFFFF; box-shadow: 3px 3px 0 0 var(--brand); }
        .cn-btn-dark:hover { color: #FFFFFF; box-shadow: 4px 4px 0 0 var(--brand); }

        .cn-links { display: flex; flex-direction: column; gap: 44px; }
        .cn-link {
          transition: transform 220ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 220ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .cn-link-github { transform: rotate(1.5deg); }
        .cn-link-linkedin { transform: rotate(-1deg); margin-left: 36px; }
        .cn-link:hover { transform: rotate(0) translateY(-4px); box-shadow: 9px 9px 0 0 #1C202B; color: #1C202B; }
        .cn-link:active { transform: translateY(1px); box-shadow: 2px 2px 0 0 #1C202B; }
        .cn-go { margin-left: auto; transition: transform 220ms cubic-bezier(0.22, 1, 0.36, 1); }
        .cn-link:hover .cn-go { transform: translate(3px, -3px); }
        .cn-handle {
          font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
          font-size: 13px;
          font-weight: 600;
          color: #4A5468;
        }

        /* Figure + doodled connectors */
        .cn-figure { position: relative; margin: 0; align-self: end; }
        .cn-figure img { display: block; width: 100%; height: auto; }
        .cn-arrow { position: absolute; pointer-events: none; }
        .cn-arrow-mail { width: 20%; left: -4%; top: 52%; }
        .cn-arrow-gh { width: 34%; right: -20%; top: 6%; }
        .cn-arrow-li { width: 30%; right: -16%; top: 52%; }

        @media (max-width: 1023px) {
          .cn-section { padding: 80px 32px 0; }
          .cn-board { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); }
          .cn-figure { grid-column: 1 / -1; grid-row: 2; max-width: 380px; justify-self: center; }
          .cn-col-mail { display: block; }
          .cn-note-mail { max-width: none; transform: none; }
          .cn-links { gap: 20px; }
          .cn-link-github, .cn-link-linkedin { transform: none; margin-left: 0; max-width: none; }
          .cn-arrow { display: none; }
        }
        @media (max-width: 639px) {
          .cn-section { padding: 64px 16px 0; }
          .cn-board { grid-template-columns: 1fr; gap: 20px; }
          .cn-figure { grid-row: auto; max-width: 300px; }
          .cn-note { box-shadow: 5px 5px 0 0 #1C202B; }
        }
      `}</style>
    </section>
  );
}
