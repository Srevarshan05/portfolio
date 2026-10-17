"use client";

import { useRef } from "react";
import { useScrollReveal } from "@/lib/useScrollReveal";

export default function ConsoleSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef as React.RefObject<HTMLElement>);

  return (
    <section
      id="console"
      className="section"
      ref={sectionRef}
      style={{
        backgroundImage: "linear-gradient(to bottom, #FFFFFF 0%, rgba(255, 255, 255, 0) 15%), linear-gradient(to top, var(--dark-strong) 0%, rgba(15, 18, 24, 0) 15%), url('/Resume.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        aspectRatio: "1024 / 572", // Matches the exact aspect ratio of the image (no cropping)
        width: "100%",
        position: "relative",
        display: "flex",
        alignItems: "stretch", // Stretch height to allow flex alignment inside
        justifyContent: "center",
        padding: 0, // Remove padding so image spans full height/width of section
      }}
    >
      {/* Mobile-only Image (hidden on desktop, visible on mobile to stack layout) */}
      <img
        src="/Resume.png"
        alt="Sre Varshan Resume Overview"
        className="resume-mobile-img"
        style={{
          display: "none",
          width: "100%",
          height: "auto",
        }}
      />

      <div
        className="resume-btn-container reveal"
        style={{
          width: "100%",
          maxWidth: "1200px",
          margin: "0 auto",
          position: "relative",
          display: "flex",
          alignItems: "flex-end", // Align button to bottom
          justifyContent: "flex-start", // Align button to left
          padding: "0 0 8% 35%", // Pad from left to place in the center-left empty space
          height: "100%",
        }}
      >
        <a
          href="/resume.pdf"
          download="Srevarshan_Resume_AIML27.pdf"
          className="rs-btn"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Download Resume
        </a>
      </div>

      <style>{`
        /* brand pink, with the site's hard ink shadow */
        .rs-btn {
          display: inline-flex; align-items: center; justify-content: center; gap: 10px;
          min-height: 50px; padding: 13px 26px; border-radius: 4px;
          background: var(--brand); color: #FFFFFF; border: 1px solid #C21F58;
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.18), 4px 4px 0 0 #1C202B;
          font: 600 16px 'Geist', system-ui, sans-serif; letter-spacing: -0.01em; text-decoration: none;
          transition: transform 160ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 160ms cubic-bezier(0.22, 1, 0.36, 1), background 160ms;
        }
        .rs-btn:hover { background: #C8235E; color: #FFFFFF; text-decoration: none; transform: translate(-2px, -2px); box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.18), 6px 6px 0 0 #1C202B; }
        .rs-btn:active { transform: translate(2px, 2px); box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.18), 1px 1px 0 0 #1C202B; }
        .rs-btn:focus-visible { outline: 3px solid var(--brand); outline-offset: 4px; }
        @media (max-width: 900px) {
          #console {
            background-image: none !important;
            aspect-ratio: auto !important;
            flex-direction: column !important;
            padding: 48px 20px !important;
            background-color: #F4F6FF !important;
            align-items: center !important;
            overflow: hidden !important;
          }
          .resume-mobile-img {
            display: block !important;
            width: calc(100% - 12px) !important; /* subtract shadow offset so it stays in viewport */
            max-width: 480px !important;
            height: auto !important;
            border: 4px solid #1C202B !important;
            box-shadow: 6px 6px 0 0 #1C202B !important;
            margin-bottom: 24px !important;
            margin-right: 6px !important; /* offset to balance the shadow without overflow */
            border-radius: var(--radius-base) !important;
            align-self: center !important;
          }
          .resume-btn-container {
            width: 100% !important;
            padding: 0 !important;
            display: flex !important;
            justify-content: center !important;
            align-items: center !important;
            height: auto !important;
          }
        }
      `}</style>
    </section>
  );
}
