"use client";

import { useRef } from "react";
import { useScrollReveal } from "@/lib/useScrollReveal";

const ROLES = [
  {
    id:       "emedlogix",
    period:   "Dec 2024 — Present",
    location: "Chennai, India",
    role:     "AI Product Developer",
    company:  "EmedLogix",
    type:     "Full-time",
    accent:   "var(--purple)",
    accentBg: "rgba(162,61,219,0.08)",
    accentBadge: "badge-purple",
    typeBadge:   "badge-dark",
    sidebarBadge: "90% REDUCED",
    sidebarText: "Clinicians query complex medical databases in plain English — what once took hours now takes seconds.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    ),
    description:
      "Designed natural language database agents and automated data extraction pipelines, cutting manual data entry by 90% for enterprise healthcare clients. Clinicians query complex medical databases in plain English — what once took hours now takes seconds.",
    metrics: [
      { value: "90%",        label: "Manual Entry Reduced" },
      { value: "3+",         label: "NL→SQL Agents Built" },
      { value: "Enterprise", label: "Client Scale" },
    ],
    skills: ["Python", "LangChain", "SQL Agents", "RAG", "NLP", "Healthcare AI"],
  },
  {
    id:       "microsoft",
    period:   "Jun 2024 — Aug 2024",
    location: "Remote",
    role:     "AI/ML Intern",
    company:  "Microsoft × Edunet",
    type:     "Internship",
    accent:   "var(--sky)",
    accentBg: "rgba(45,200,226,0.08)",
    accentBadge: "badge-sky",
    typeBadge:   "badge-gray",
    sidebarBadge: "98% ACCURACY",
    sidebarText: "Classifies live air quality sensor data and categorises health risk tiers entirely offline on Raspberry Pi hardware.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z"/>
      </svg>
    ),
    description:
      "Built an AI-powered real-time air quality classification system using IoT sensors and machine learning, achieving 98% accuracy on live sensor data. The system categorises air quality into actionable health tiers entirely offline — no cloud required post-deployment.",
    metrics: [
      { value: "98%",          label: "Classification Accuracy" },
      { value: "Raspberry Pi", label: "Hardware Platform" },
      { value: "Offline",      label: "Deployment Mode" },
    ],
    skills: ["IoT", "TensorFlow Lite", "Python", "Edge AI", "Raspberry Pi", "Data Science"],
  },
];

function TetromCorner({ color }: { color: string }) {
  return (
    <div aria-hidden="true" style={{ position: "absolute", top: "16px", right: "16px", opacity: 0.15 }}>
      <svg width="22" height="22" viewBox="0 0 22 22" fill={color}>
        <rect x="0" y="0" width="9" height="9"/>
        <rect x="11" y="0" width="9" height="9"/>
        <rect x="0" y="11" width="9" height="9"/>
      </svg>
    </div>
  );
}

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef as React.RefObject<HTMLElement>);

  return (
    <section id="experience" className="section section-white" ref={sectionRef}>
      <div className="container section-content">

        {/* ── Header ── */}
        <div
          style={{
            display:       "grid",
            gridTemplateColumns: "1fr 1fr",
            gap:           "48px",
            alignItems:    "flex-end",
            marginBottom:  "72px",
          }}
        >
          <div className="reveal reveal-left">
            <div className="eyebrow" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <img src="/icons/internship.png" alt="" style={{ width: "16px", height: "16px", objectFit: "contain" }} />
              Work History
            </div>
            <h2 style={{ marginBottom: 0 }}>Real Work,<br />Real Impact.</h2>
          </div>
          <div className="reveal reveal-right" style={{ paddingBottom: "4px" }}>
            <p className="leading" style={{ color: "var(--color-body)" }}>
              Every role I&apos;ve taken has been about building something
              that genuinely works for real people — not just demos.
            </p>
          </div>
        </div>

        {/* ── Cards ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "48px" }}>
          {ROLES.map((r, i) => {
            const renderPinkL = (
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  top: "-15px",
                  left: "-15px",
                  pointerEvents: "none",
                  zIndex: 10,
                }}
              >
                <svg width="30" height="50" viewBox="0 0 30 50">
                  <rect x="0" y="0" width="12" height="12" fill="var(--brand)" stroke="#1C202B" strokeWidth="2.5" />
                  <rect x="0" y="14" width="12" height="12" fill="var(--brand)" stroke="#1C202B" strokeWidth="2.5" />
                  <rect x="0" y="28" width="12" height="12" fill="var(--brand)" stroke="#1C202B" strokeWidth="2.5" />
                  <rect x="14" y="28" width="12" height="12" fill="var(--brand)" stroke="#1C202B" strokeWidth="2.5" />
                </svg>
              </div>
            );

            const renderYellowO = (
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  bottom: "-15px",
                  right: "-15px",
                  pointerEvents: "none",
                  zIndex: 10,
                }}
              >
                <svg width="32" height="32" viewBox="0 0 32 32">
                  <rect x="0" y="0" width="12" height="12" fill="#FFB020" stroke="#1C202B" strokeWidth="2" />
                  <rect x="14" y="0" width="12" height="12" fill="#FFB020" stroke="#1C202B" strokeWidth="2" />
                  <rect x="0" y="14" width="12" height="12" fill="#FFB020" stroke="#1C202B" strokeWidth="2" />
                  <rect x="14" y="14" width="12" height="12" fill="#FFB020" stroke="#1C202B" strokeWidth="2" />
                </svg>
              </div>
            );

            return (
              <article
                key={r.id}
                id={r.id}
                className={`experience-card-wrapper reveal stagger-${i + 1}`}
              >
                {/* Tetromino components */}
                {renderPinkL}
                {renderYellowO}

                {/* Left Column: Description & Heading */}
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                  {/* Eyebrow badge */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      fontFamily: "'Open Sans', sans-serif",
                      fontSize: "11px",
                      fontWeight: 800,
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      color: "var(--brand)",
                    }}
                  >
                    <span
                      style={{
                        width: "12px",
                        height: "12px",
                        background: "var(--brand)",
                        border: "1.5px solid #1C202B",
                        display: "inline-block",
                      }}
                    />
                    {r.type}
                  </div>

                  {/* Title (Oblique italic display headings) */}
                  <h3
                    style={{
                      fontFamily: "'Bangers', cursive",
                      fontSize: "44px",
                      color: "#1C202B",
                      letterSpacing: "0.5px",
                      textTransform: "uppercase",
                      lineHeight: 1.15,
                      margin: "18px 0 14px 0",
                      transform: "skewX(-6deg)",
                      fontStyle: "italic",
                    }}
                  >
                    {r.role}.{" "}
                    <span
                      style={{
                        color: "var(--brand)",
                        textShadow: "2px 2px 0px #1C202B",
                      }}
                    >
                      {r.company}.
                    </span>
                  </h3>

                  {/* Subtext description */}
                  <p
                    style={{
                      fontFamily: "'Open Sans', sans-serif",
                      fontSize: "15px",
                      lineHeight: 1.7,
                      color: "var(--color-body)",
                      margin: 0,
                    }}
                  >
                    {r.description}
                  </p>

                  {/* Skills badges at bottom left */}
                  <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "24px" }}>
                    {r.skills.slice(0, 3).map((s) => (
                      <span
                        key={s}
                        style={{
                          background: "#1C202B",
                          color: "#FFFFFF",
                          border: "2px solid #1C202B",
                          boxShadow: "3px 3px 0 0 #B7C4ED",
                          padding: "8px 14px",
                          fontFamily: "'Open Sans', sans-serif",
                          fontSize: "11px",
                          fontWeight: 800,
                          textTransform: "uppercase",
                          letterSpacing: "0.5px",
                        }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right Column: Dark Container */}
                <div className="experience-sidebar-card">
                  {/* Yellow Badge */}
                  <div
                    style={{
                      position: "absolute",
                      top: "24px",
                      left: "24px",
                      background: "#FFB020",
                      border: "2px solid #1C202B",
                      color: "#1C202B",
                      padding: "6px 12px",
                      fontFamily: "'Open Sans', sans-serif",
                      fontSize: "10px",
                      fontWeight: 800,
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    {r.sidebarBadge}
                  </div>

                  {/* Green Shield Icon */}
                  <div
                    style={{
                      position: "absolute",
                      top: "24px",
                      right: "24px",
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2DCFA0" strokeWidth="2.5">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    </svg>
                  </div>

                  {/* Sidebar text */}
                  <p
                    style={{
                      fontFamily: "'Open Sans', sans-serif",
                      fontSize: "14px",
                      lineHeight: 1.6,
                      color: "#FFFFFF",
                      margin: 0,
                      marginTop: "48px",
                    }}
                  >
                    {/* Make key metric values bold */}
                    {r.id === "emedlogix" ? (
                      <>
                        Clinicians query complex medical databases in plain English — what once took hours now takes <strong style={{ color: "#FFB020" }}>seconds</strong>.
                      </>
                    ) : (
                      <>
                        Classifies live air quality sensor data and categorises health risk tiers entirely <strong style={{ color: "#2DC8E2" }}>offline</strong> on Raspberry Pi.
                      </>
                    )}
                  </p>
                </div>
              </article>
            );
          })}
        </div>

        {/* ── "More coming" hint ── */}
        <div className="reveal" style={{ textAlign: "center", marginTop: "48px" }}>
          <p className="small" style={{ color: "var(--color-body-subtle)" }}>
            Building more at{" "}
            <a href="https://github.com/srevarshan" target="_blank" rel="noopener noreferrer" style={{ fontWeight: 700 }}>
              github.com/srevarshan
            </a>{" "}
            🚀
          </p>
        </div>
      </div>

      <style>{`
        .experience-card-wrapper {
          background: #FFFFFF;
          border: 6px dashed #1C202B;
          box-shadow: 10px 10px 0 0 #1C202B;
          border-radius: 8px;
          padding: 48px;
          position: relative;
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: 40px;
          align-items: center;
          transition: transform 150ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 150ms;
        }
        .experience-card-wrapper:hover {
          transform: translateY(-4px);
          box-shadow: 14px 14px 0 0 #1C202B;
        }
        .experience-sidebar-card {
          width: 100%;
          background: #1C202B;
          border: 4px dashed #FFFFFF;
          box-shadow: 10px 10px 0 0 var(--brand);
          padding: 32px;
          position: relative;
          min-height: 200px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        @media (max-width: 990px) {
          .experience-card-wrapper {
            grid-template-columns: 1fr;
            padding: 32px 24px;
            gap: 32px;
          }
        }
        @media (max-width: 680px) {
          #experience .section-header {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
