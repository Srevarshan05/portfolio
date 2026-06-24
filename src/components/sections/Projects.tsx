"use client";

import { useRef } from "react";
import { useScrollReveal } from "@/lib/useScrollReveal";

const PROJECTS = [
  {
    id: "banana-weevil",
    accent: "var(--brand)",
    badgeText: "PATENTED AI",
    isPinkCard: true,
    tetromino: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="var(--brand)">
        {/* T-block */}
        <rect x="10" y="0" width="8" height="8" stroke="#1C202B" strokeWidth="1.5" />
        <rect x="0" y="10" width="8" height="8" stroke="#1C202B" strokeWidth="1.5" />
        <rect x="10" y="10" width="8" height="8" stroke="#1C202B" strokeWidth="1.5" />
        <rect x="20" y="10" width="8" height="8" stroke="#1C202B" strokeWidth="1.5" />
      </svg>
    ),
    illustration: (
      <svg width="100%" height="90" viewBox="0 0 200 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="40" y="25" width="120" height="40" rx="6" fill="#FFE5EE" stroke="#1C202B" strokeWidth="2.5" />
        <path d="M50 35 C 70 30, 130 30, 150 35 C 130 50, 70 50, 50 35 Z" fill="#FFB020" stroke="#1C202B" strokeWidth="2.5" />
        <path d="M120 15 C 135 25, 135 35, 120 45 C 105 35, 105 25, 120 15 Z" fill="#2DCFA0" stroke="#1C202B" strokeWidth="2.5" />
        <path d="M30 45 L20 45" stroke="#1C202B" strokeWidth="3" strokeLinecap="round" />
        <path d="M25 35 C 15 40, 15 50, 25 55" stroke="#1C202B" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M170 45 L180 45" stroke="#1C202B" strokeWidth="3" strokeLinecap="round" />
        <path d="M175 35 C 185 40, 185 50, 175 55" stroke="#1C202B" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      </svg>
    ),
    title: "BANANA DETECT",
    description: "A dual-mode acoustic sensing system that detects Odoiporous longicollis infestations in banana crops entirely offline.",
    features: [
      { icon: "⚡", text: "Offline Inference" },
      { icon: "🔊", text: "Acoustic dual-sensing" },
      { icon: "🔋", text: "Low-power Raspberry Pi" },
      { icon: "🏛️", text: "Government Patented" }
    ],
    metrics: [
      { label: "ACCURACY", value: "95%" },
      { label: "HARDWARE", value: "RPi 4B" }
    ],
    btnText: "READ PATENT",
    btnLink: "https://github.com/srevarshan",
  },
  {
    id: "nutriminds",
    accent: "#2DC8E2",
    badgeText: "MOBILE ON-DEVICE",
    isPinkCard: false,
    tetromino: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="#2DC8E2">
        {/* Z-block */}
        <rect x="0" y="0" width="8" height="8" stroke="#1C202B" strokeWidth="1.5" />
        <rect x="10" y="0" width="8" height="8" stroke="#1C202B" strokeWidth="1.5" />
        <rect x="10" y="10" width="8" height="8" stroke="#1C202B" strokeWidth="1.5" />
        <rect x="20" y="10" width="8" height="8" stroke="#1C202B" strokeWidth="1.5" />
      </svg>
    ),
    illustration: (
      <svg width="100%" height="90" viewBox="0 0 200 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="75" y="10" width="50" height="70" rx="8" fill="#E8F4FD" stroke="#1C202B" strokeWidth="2.5" />
        <rect x="81" y="16" width="38" height="50" rx="4" fill="#FFFFFF" stroke="#1C202B" strokeWidth="1.5" />
        <line x1="70" y1="40" x2="130" y2="40" stroke="#FF512F" strokeWidth="2.5" strokeDasharray="3 3" />
        <path d="M100 48 C 96 44, 92 48, 100 56 C 108 48, 104 44, 100 48 Z" fill="var(--brand)" stroke="#1C202B" strokeWidth="1.5" />
        <rect x="92" y="24" width="16" height="12" rx="2" fill="#FFB020" stroke="#1C202B" strokeWidth="1.5" />
        <circle cx="100" cy="30" r="3" fill="#FFFFFF" stroke="#1C202B" strokeWidth="1" />
      </svg>
    ),
    title: "NUTRIMINDS AI",
    description: "Reads food labels and medical reports using your camera, delivering instant health advice via local LLMs.",
    features: [
      { icon: "📷", text: "Camera Label Scan" },
      { icon: "🔒", text: "100% On-device Privacy" },
      { icon: "🤖", text: "Fine-tuned Local LLM" },
      { icon: "📱", text: "iOS & Android Support" }
    ],
    metrics: [
      { label: "LATENCY", value: "0s" },
      { label: "ACCURACY", value: "98%" }
    ],
    btnText: "VIEW ON GITHUB",
    btnLink: "https://github.com/srevarshan/NutriMinds",
  },
  {
    id: "doc-parser",
    accent: "#FFB020",
    badgeText: "VISION RAG SYSTEM",
    isPinkCard: false,
    tetromino: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="#FFB020">
        {/* L-block */}
        <rect x="0" y="0" width="8" height="8" stroke="#1C202B" strokeWidth="1.5" />
        <rect x="0" y="10" width="8" height="8" stroke="#1C202B" strokeWidth="1.5" />
        <rect x="0" y="20" width="8" height="8" stroke="#1C202B" strokeWidth="1.5" />
        <rect x="10" y="20" width="8" height="8" stroke="#1C202B" strokeWidth="1.5" />
      </svg>
    ),
    illustration: (
      <svg width="100%" height="90" viewBox="0 0 200 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="65" y="15" width="50" height="60" rx="4" fill="#FFFFFF" stroke="#1C202B" strokeWidth="2.5" />
        <line x1="75" y1="28" x2="105" y2="28" stroke="#1C202B" strokeWidth="2" strokeLinecap="round" />
        <line x1="75" y1="38" x2="105" y2="38" stroke="#1C202B" strokeWidth="2" strokeLinecap="round" />
        <line x1="75" y1="48" x2="95" y2="48" stroke="#1C202B" strokeWidth="2" strokeLinecap="round" />
        <path d="M115 25 C115 15, 145 15, 145 25 C145 32, 135 35, 130 40 L128 42 L128 35 C115 35, 115 30, 115 25 Z" fill="#2DC8E2" stroke="#1C202B" strokeWidth="2" />
        <circle cx="110" cy="55" r="10" fill="#FFE0EA" stroke="#1C202B" strokeWidth="2" />
        <line x1="117" y1="62" x2="128" y2="73" stroke="#1C202B" strokeWidth="3" strokeLinecap="round" />
      </svg>
    ),
    title: "DOC PARSER VLM",
    description: "A PDF Q&A system allowing natural document chats. Runs fully locally or via an optional fast cloud mode.",
    features: [
      { icon: "📄", text: "Smart VLM Chunking" },
      { icon: "💬", text: "Chat Q&A Interface" },
      { icon: "⚙️", text: "Local + Cloud Runtime" },
      { icon: "📂", text: "Multi-format PDF Parser" }
    ],
    metrics: [
      { label: "LATENCY", value: "1.2s" },
      { label: "ACCURACY", value: "96%" }
    ],
    btnText: "EXPLORE REPO",
    btnLink: "https://github.com/srevarshan",
  },
];

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef as React.RefObject<HTMLElement>);

  return (
    <section id="projects" className="section section-white" ref={sectionRef} style={{ background: "#FFFFFF" }}>
      <div className="container section-content">

        {/* Header */}
        <div className="section-header section-header-center" style={{ maxWidth: "620px", margin: "0 auto 72px" }}>
          <div className="reveal eyebrow" style={{ justifyContent: "center" }}>The Workshop</div>
          <h2 className="reveal stagger-2">What I&apos;ve Built</h2>
          <p className="leading reveal stagger-3" style={{ margin: "0 auto", color: "var(--color-body)" }}>
            Practical AI engineered to run anywhere — from hospital servers to
            a Raspberry Pi in a banana plantation.
          </p>
        </div>

        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "32px" }}>
          {PROJECTS.map((p, i) => (
            <article
              key={p.id}
              id={p.id}
              className={`project-dashed-card reveal stagger-${i + 1} ${p.isPinkCard ? "pink-card" : "white-card"}`}
            >
              {/* Top Badge */}
              <div className={`project-card-badge ${p.isPinkCard ? "badge-black" : "badge-outline"}`}>
                {p.badgeText}
              </div>

              {/* Top-Right Tetromino decoration */}
              <div aria-hidden="true" style={{ position: "absolute", top: "24px", right: "24px", zIndex: 5 }}>
                {p.tetromino}
              </div>

              {/* SVG Illustration spacer */}
              <div style={{ width: "100%", height: "90px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px", marginTop: "24px" }}>
                {p.illustration}
              </div>

              {/* Title */}
              <h3 className="project-card-title">{p.title}</h3>

              {/* Description */}
              <p className="project-card-desc">{p.description}</p>

              {/* Features List */}
              <ul className="project-card-features">
                {p.features.map((f, idx) => (
                  <li key={idx} className="project-feature-item">
                    <span className="project-feature-icon">{f.icon}</span>
                    <span className="project-feature-text">{f.text}</span>
                  </li>
                ))}
              </ul>

              {/* Dashed Separator */}
              <div className="project-card-separator" />

              {/* Metrics Row */}
              <div className="project-card-metrics">
                {p.metrics.map((m, idx) => (
                  <div key={idx} style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    <span className="project-metric-label">{m.label}</span>
                    <span className="project-metric-value">{m.value}</span>
                  </div>
                ))}
              </div>

              {/* Action Button */}
              <a
                href={p.btnLink}
                target="_blank"
                rel="noopener noreferrer"
                className="project-card-btn"
                style={{
                  ['--btn-shadow-color']: p.isPinkCard ? "var(--brand)" : "#B7C4ED"
                } as React.CSSProperties}
              >
                {p.btnText} →
              </a>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        .project-dashed-card {
          border-radius: 8px;
          padding: 40px 32px 32px 32px;
          position: relative;
          display: flex;
          flex-direction: column;
          box-shadow: 10px 10px 0 0 #1C202B;
          transition: transform 150ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 150ms;
        }
        .project-dashed-card:hover {
          transform: translateY(-4px);
          box-shadow: 14px 14px 0 0 #1C202B;
        }
        .project-dashed-card.pink-card {
          background: #FFE5EE;
          border: 6px dashed var(--brand);
        }
        .project-dashed-card.white-card {
          background: #FFFFFF;
          border: 6px dashed #1C202B;
        }
        .project-card-badge {
          position: absolute;
          top: -14px;
          left: 24px;
          padding: 6px 12px;
          font-family: 'Open Sans', sans-serif;
          font-size: 10px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          border-radius: 2px;
          z-index: 5;
        }
        .project-card-badge.badge-black {
          background: #1C202B;
          color: #FFFFFF;
          border: 2px solid #1C202B;
        }
        .project-card-badge.badge-outline {
          background: #FFFFFF;
          color: #1C202B;
          border: 2px solid #1C202B;
        }
        .project-card-title {
          font-family: 'Bangers', cursive;
          font-size: 34px;
          color: #1C202B;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          margin: 16px 0 10px 0;
          transform: skewX(-6deg);
          font-style: italic;
        }
        .project-card-desc {
          font-family: 'Open Sans', sans-serif;
          font-size: 14px;
          line-height: 1.6;
          color: var(--color-body);
          margin: 0 0 24px 0;
          min-height: 64px;
        }
        .project-card-features {
          list-style: none;
          padding: 0;
          margin: 0 0 24px 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
          flex: 1;
        }
        .project-feature-item {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .project-feature-icon {
          width: 22px;
          height: 22px;
          background: #FFE5EE;
          border: 1.5px solid var(--brand);
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          flex-shrink: 0;
        }
        .project-feature-text {
          font-family: 'Open Sans', sans-serif;
          font-size: 13px;
          font-weight: 600;
          color: #1C202B;
        }
        .project-card-separator {
          border-top: 2px dashed rgba(28, 32, 43, 0.15);
          margin: 0 0 20px 0;
          width: 100%;
        }
        .project-card-metrics {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 24px;
        }
        .project-metric-label {
          font-family: 'Open Sans', sans-serif;
          font-size: 10px;
          font-weight: 800;
          color: var(--color-body-subtle);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .project-metric-value {
          font-family: 'Bangers', cursive;
          font-size: 26px;
          color: #1C202B;
          letter-spacing: 0.5px;
        }
        .project-card-btn {
          width: 100%;
          background: #1C202B;
          border: 3px solid #1C202B;
          box-shadow: 5px 5px 0 0 var(--btn-shadow-color);
          color: #FFFFFF;
          padding: 14px 20px;
          font-family: 'Open Sans', sans-serif;
          font-size: 13px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          border-radius: 4px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          text-decoration: none;
          transition: transform 80ms, box-shadow 80ms;
        }
        .project-card-btn:hover {
          transform: translate(-2px, -2px);
          box-shadow: 7px 7px 0 0 var(--btn-shadow-color);
        }
        .project-card-btn:active {
          transform: translate(2px, 2px);
          box-shadow: 1px 1px 0 0 var(--btn-shadow-color);
        }
      `}</style>
    </section>
  );
}
