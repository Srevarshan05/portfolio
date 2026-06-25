"use client";

import { useRef, useState } from "react";
import { useScrollReveal } from "@/lib/useScrollReveal";

interface Contribution {
  title: string;
  desc: string;
}

interface Role {
  id: string;
  period: string;
  location: string;
  role: string;
  company: string;
  type: string;
  accent: string;
  accentBg: string;
  accentBadge: string;
  typeBadge: string;
  sidebarBadge: string;
  sidebarText: string;
  description: string;
  contributions: Contribution[];
  skills: string[];
  linkText: string;
  linkUrl: string;
  outcome: string;
}

const ROLES: Role[] = [
  {
    id:       "emedlogix",
    period:   "Dec 2025 — June 2026",
    location: "Chennai, India",
    role:     "Intelligent System Developer",
    company:  "EmedLogix",
    type:     "7-Month Internship",
    accent:   "#A23DDB",
    accentBg: "rgba(162,61,219,0.08)",
    accentBadge: "badge-purple",
    typeBadge:   "badge-dark",
    sidebarBadge: "90% REDUCED",
    sidebarText: "Automated repetitive credentialing manual data entry by 90% via AI-powered OCR, Generative AI, and AWS cloud workflows.",
    description:
      "Worked as an Intelligent System Developer Intern at EmedLogix (US-based healthcare technology SaaS), contributing to a production provider onboarding and credential management system active in the market.",
    contributions: [
      {
        title: "AI-Powered OCR & Intelligent Document Processing",
        desc: "Built OCR extraction pipelines for certificates, licenses, identity proofs, and credentialing forms. Reduced administrative manual entry by 90% via automated validation and autofill."
      },
      {
        title: "Generative AI & Explainable Systems",
        desc: "Integrated LLM features for clinical administrative queries. Implemented Explainable AI frameworks providing transparent reasoning behind AI suggestions, accelerating user decision times."
      },
      {
        title: "Healthcare Workflow Automation & APIs",
        desc: "Connected US government databases and healthcare APIs to automate provider verification and validation. Designed scheduled nightly analysis and reporting cron jobs on operational data."
      },
      {
        title: "Natural Language Database Agent",
        desc: "Built a conversational text-to-SQL chatbot over PostgreSQL, allowing administrators to query provider onboarding statuses and operational metrics in plain English."
      },
      {
        title: "Enterprise Identity & Security",
        desc: "Implemented Role-Based Access Control (RBAC) and integrated Microsoft Azure Entra ID (Active Directory) Single Sign-On (SSO) for centralized enterprise identity management."
      },
      {
        title: "Cloud Infrastructure (AWS)",
        desc: "Helped deploy and manage the production application on AWS using Elastic Beanstalk (backends), Amazon RDS PostgreSQL (database), and AWS Amplify (frontend hosting)."
      }
    ],
    skills: [
      "Generative AI",
      "OCR Document Ingestion",
      "Explainable AI",
      "FastAPI / Python",
      "PostgreSQL",
      "Microsoft Azure Entra ID",
      "AWS Beanstalk / RDS / Amplify",
      "SaaS Production Architecture",
      "Team-based Agile Development"
    ],
    linkText: "Public Product Site",
    linkUrl: "https://enroll.pmslogix.com/",
    outcome: "Gained invaluable experience building real-world enterprise healthcare software, working alongside a core team of four engineers. Successfully automated provider onboarding workflows, reduced administrative overhead, and met strict security, scalability, and reliability requirements expected in production healthcare systems."
  },
  {
    id:       "microsoft",
    period:   "Jun 2024 — Aug 2024",
    location: "Remote",
    role:     "AI/ML Intern",
    company:  "Microsoft × Edunet",
    type:     "Internship",
    accent:   "#2DC8E2",
    accentBg: "rgba(45,200,226,0.08)",
    accentBadge: "badge-sky",
    typeBadge:   "badge-gray",
    sidebarBadge: "98% ACCURACY",
    sidebarText: "Built 'AI Nose', a real-time IoT air quality monitoring system deploying Random Forest on ESP32 microcontrollers.",
    description:
      "Developed 'AI Nose', an intelligent real-time odor detection and environmental monitoring system that combines IoT, Machine Learning, and Cloud Computing to identify unpleasant odor conditions.",
    contributions: [
      {
        title: "IoT Hardware & Data Acquisition",
        desc: "Designed and built an ESP32 microcontroller system integrating MQ3 and MQ9 gas sensors. Set up continuous analog measurements for Alcohol Vapors, Carbon Monoxide, Methane, LPG, and Hydrogen."
      },
      {
        title: "Edge Signal Processing & Calibration",
        desc: "Developed initial ESP32 preprocessing routines for sensor calibration, value normalization, and signal noise filtering before transmitting timestamped datasets."
      },
      {
        title: "Cloud Streaming & Firebase",
        desc: "Streamed real-time environmental data logs directly to Firebase Realtime Database, enabling continuous cloud synchronization with minimal transmission latency."
      },
      {
        title: "Random Forest Classification Model",
        desc: "Collected and preprocessed a labeled dataset (Clean, Moderate, Foul, Very Foul). Evaluated Decision Trees, SVMs, and Random Forests, deploying the Random Forest classifier for its 98% accuracy and low latency."
      },
      {
        title: "Real-time Gradio Dashboard",
        desc: "Developed a Python Gradio dashboard visualising live sensor concentrations, predicted odor levels, and historical air quality trends for remote monitoring."
      },
      {
        title: "Automated Sanitation Alert System",
        desc: "Programmed automated alert triggers. Whenever predicted odor indices exceed threshold (Foul/Very Foul), it immediately recommends sanitation, enabling proactive maintenance."
      }
    ],
    skills: [
      "Embedded ESP32",
      "IoT Sensor Integration",
      "Firebase Cloud Services",
      "Random Forest Model",
      "Gradio Dashboards",
      "Python Data Science",
      "Feature Engineering",
      "Odor & Gas Calibration",
      "Predictive Maintenance"
    ],
    linkText: "LinkedIn Demo Video",
    linkUrl: "https://www.linkedin.com/posts/srevarshan05_microsoftinternship-ai-iot-activity-7338604105734516738-nhXW?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEKT0FcBMM9w3S7gM-7uREe1XD9wlLa3REs",
    outcome: "Demonstrated how Artificial Intelligence can be combined with IoT edge devices to build scalable, real-time environmental monitoring solutions. Replaced subjective human facility inspections with automated, predictive decision-making."
  }
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

  const [activeRole, setActiveRole] = useState<typeof ROLES[0] | null>(null);
  const [isWorkflowOpen, setIsWorkflowOpen] = useState(false);

  return (
    <section id="experience" className="section section-white" ref={sectionRef}>
      <div className="container section-content">

        {/* ── Header ── */}
        <div
          className="exp-header-grid"
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
            <h2 style={{ marginBottom: 0, display: "flex", alignItems: "center", gap: "16px" }}>
              <span>Real Work,<br />Real Impact.</span>
              <img src="/icons/internship.png" alt="Work History" style={{ width: "68px", height: "68px", objectFit: "contain" }} />
            </h2>
          </div>
          <div className="reveal reveal-right" style={{ paddingBottom: "4px" }}>
            <p className="leading" style={{ color: "var(--color-body)" }}>
              Every role I&apos;ve taken has been about building something
              that genuinely works for real people — not just demos.
            </p>
          </div>
        </div>

        {/* ── Cards ── */}
        <div className="exp-cards-list" style={{ display: "flex", flexDirection: "column", gap: "48px" }}>
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
                      color: r.accent,
                    }}
                  >
                    <span
                      style={{
                        width: "12px",
                        height: "12px",
                        background: r.accent,
                        border: "1.5px solid #1C202B",
                        display: "inline-block",
                      }}
                    />
                    {r.type}
                  </div>

                  {/* Title & Logo Container */}
                  <div style={{ display: "flex", alignItems: "center", gap: "24px", margin: "18px 0 14px 0", flexWrap: "wrap" }}>
                    <img 
                      src={r.id === "emedlogix" ? "/EmedLogix-logo.jpg" : "/Edunet-Microsoft-logo.png"} 
                      alt={`${r.company} logo`}
                      style={{
                        width: "130px",
                        height: "80px",
                        objectFit: "contain",
                        border: "3px solid #1C202B",
                        borderRadius: "8px",
                        boxShadow: "5px 5px 0 0 #1C202B",
                        background: "#ffffff",
                        padding: "8px",
                        flexShrink: 0,
                      }}
                    />
                    <div>
                      <h3
                        style={{
                          fontFamily: "'Open Sans', sans-serif",
                          fontSize: "26px",
                          fontWeight: 800,
                          color: "#1C202B",
                          letterSpacing: "-0.5px",
                          textTransform: "uppercase",
                          lineHeight: 1.2,
                          margin: 0,
                        }}
                      >
                        {r.role}{" "}
                        <span
                          style={{
                            color: r.accent,
                            display: "inline-block",
                          }}
                        >
                          @ {r.company}
                        </span>
                      </h3>
                      <div style={{ marginTop: "6px", fontFamily: "'Open Sans', sans-serif", fontSize: "13px", fontWeight: 700, color: "var(--color-body-subtle)" }}>
                        {r.period} · {r.location}
                      </div>
                    </div>
                  </div>

                  {/* Subtext description */}
                  <p
                    style={{
                      fontFamily: "'Open Sans', sans-serif",
                      fontSize: "15px",
                      lineHeight: 1.7,
                      color: "var(--color-body)",
                      margin: "0 0 16px 0",
                    }}
                  >
                    {r.description}
                  </p>

                  {/* Action button */}
                  <button
                    onClick={() => setActiveRole(r)}
                    style={{
                      alignSelf: "flex-start",
                      background: "none",
                      border: "none",
                      color: r.accent,
                      fontFamily: "'Open Sans', sans-serif",
                      fontSize: "13px",
                      fontWeight: 800,
                      textTransform: "uppercase",
                      letterSpacing: "1.5px",
                      cursor: "pointer",
                      padding: 0,
                      display: "flex",
                      alignItems: "center",
                      gap: "6px"
                    }}
                  >
                    Read Internship Report →
                  </button>

                  {/* Skills badges at bottom left */}
                  <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "24px" }}>
                    {r.skills.slice(0, 4).map((s) => (
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
                <div className="experience-sidebar-card" style={{ ['--brand']: r.accent } as React.CSSProperties}>
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
                    {r.sidebarText}
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

      {/* Internship Details Modal */}
      {activeRole && (
        <div
          className="modal-backdrop"
          onClick={() => setActiveRole(null)}
        >
          <div
            className="experience-modal-container"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="experience-modal-header" style={{ borderBottomColor: activeRole.accent }}>
              <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
                <img 
                  src={activeRole.id === "emedlogix" ? "/EmedLogix-logo.jpg" : "/Edunet-Microsoft-logo.png"} 
                  alt={`${activeRole.company} logo`}
                  style={{
                    width: "80px",
                    height: "45px",
                    objectFit: "contain",
                    border: "2px solid #1C202B",
                    borderRadius: "6px",
                    boxShadow: "3px 3px 0 0 #1C202B",
                    background: "#ffffff",
                    padding: "4px",
                  }}
                />
                <div>
                  <h3 className="experience-modal-title">{activeRole.role}</h3>
                  <div style={{ fontFamily: "'Open Sans', sans-serif", fontSize: "13px", fontWeight: 700, color: "var(--color-body-subtle)" }}>
                    {activeRole.company} · {activeRole.period} · {activeRole.location}
                  </div>
                </div>
              </div>
              <button
                className="experience-modal-close-btn"
                onClick={() => setActiveRole(null)}
                aria-label="Close details"
              >
                ×
              </button>
            </div>

            {/* Modal Body */}
            <div className="experience-modal-body">
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                {/* Overview */}
                <div className="modal-overview">
                  <p style={{ borderLeftColor: activeRole.accent }}>
                    {activeRole.description}
                  </p>
                </div>

                <div className="modal-divider" />

                {/* 2-Column Grid */}
                <div className="modal-details-grid">
                  {/* Left Column: Contributions */}
                  <div className="modal-grid-col" style={{ gap: "16px" }}>
                    <h4 style={{ fontFamily: "'Bangers', cursive", fontSize: "24px", color: "#1C202B", margin: "0 0 4px 0", letterSpacing: "0.5px" }}>
                      Key Contributions & Work
                    </h4>
                    {activeRole.contributions.map((c, idx) => (
                      <div className="modal-section-card" key={idx}>
                        <h5 className="modal-section-title" style={{ color: activeRole.accent, fontSize: "14px", fontFamily: "'Open Sans', sans-serif", fontWeight: 800, textTransform: "uppercase", margin: "0 0 6px 0" }}>
                          {c.title}
                        </h5>
                        <p className="modal-text">{c.desc}</p>
                      </div>
                    ))}
                  </div>

                  {/* Right Column: Skills, Outcomes & Attachments */}
                  <div className="modal-grid-col" style={{ gap: "16px" }}>
                    {/* Skills Gained */}
                    <div className="modal-section-card">
                      <h4 className="modal-section-title" style={{ color: "#E22D6D" }}>
                        Technical Skills Gained
                      </h4>
                      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "8px" }}>
                        {activeRole.skills.map((s) => (
                          <span
                            key={s}
                            style={{
                              background: "#F1F5F9",
                              color: "#1C202B",
                              border: "1.5px solid #1C202B",
                              boxShadow: "2px 2px 0 0 #1C202B",
                              padding: "4px 8px",
                              fontFamily: "'Open Sans', sans-serif",
                              fontSize: "11px",
                              fontWeight: 700,
                              borderRadius: "4px",
                            }}
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Outcome */}
                    <div className="modal-section-card">
                      <h4 className="modal-section-title" style={{ color: "#2BB04A" }}>
                        Outcome & Learning
                      </h4>
                      <p className="modal-text">{activeRole.outcome}</p>
                    </div>

                    {/* Additional Media / Links */}
                    {activeRole.id === "microsoft" && (
                      <div className="modal-section-card" style={{ borderStyle: "dashed" }}>
                        <h4 className="modal-section-title" style={{ color: "#FFB020" }}>
                          Odor Monitoring Hardware (AI Nose)
                        </h4>
                        <img 
                          src="/photos/IMG_0755.jpeg" 
                          alt="AI Nose hardware prototype" 
                          style={{
                            width: "100%",
                            borderRadius: "6px",
                            border: "2px solid #1C202B",
                            boxShadow: "4px 4px 0 0 #1C202B",
                            marginTop: "8px",
                            maxHeight: "220px",
                            objectFit: "cover"
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="modal-divider" />

                {/* Footer */}
                <div className="modal-footer" style={{ justifyContent: "flex-end" }}>
                  <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                    {activeRole.id === "microsoft" && (
                      <button
                        onClick={() => setIsWorkflowOpen(true)}
                        className="modal-action-btn secondary-btn"
                        style={{ cursor: "pointer" }}
                      >
                        See Internship Workflow →
                      </button>
                    )}
                    <a
                      href={activeRole.linkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="modal-action-btn primary-btn"
                      style={{ ['--brand']: activeRole.accent } as React.CSSProperties}
                    >
                      {activeRole.linkText} →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox Modal for Workflow */}
      {isWorkflowOpen && (
        <div
          onClick={() => setIsWorkflowOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(28, 32, 43, 0.85)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 99999,
            padding: "24px",
            backdropFilter: "blur(4px)",
            cursor: "zoom-out",
          }}
        >
          <div
            style={{
              position: "relative",
              maxWidth: "1100px",
              width: "100%",
              maxHeight: "90vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src="/AI_Nose_Workflow.png"
              alt="AI Nose Environmental Odor Detection System Workflow"
              style={{
                maxWidth: "100%",
                maxHeight: "90vh",
                objectFit: "contain",
                border: "4px solid #1C202B",
                boxShadow: "10px 10px 0 0 #1C202B",
                borderRadius: "4px",
                backgroundColor: "#FFFFFF",
              }}
            />
            <button
              onClick={() => setIsWorkflowOpen(false)}
              style={{
                position: "absolute",
                top: "-18px",
                right: "-18px",
                background: "#E22D6D",
                border: "3px solid #1C202B",
                boxShadow: "3px 3px 0 0 #1C202B",
                color: "white",
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                fontFamily: "'Bangers', cursive",
                fontSize: "20px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              title="Close Workflow"
            >
              ×
            </button>
          </div>
        </div>
      )}

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

        /* Modal backdrop styling */
        .modal-backdrop {
          position: fixed;
          inset: 0;
          background-color: rgba(28, 32, 43, 0.85);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          padding: 24px;
          backdrop-filter: blur(4px);
        }

        /* Modal Container */
        .experience-modal-container {
          background: #FFFFFF;
          border: 4px solid #1C202B;
          box-shadow: 10px 10px 0 0 #1C202B;
          border-radius: 8px;
          max-width: 860px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          animation: modalAppear 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes modalAppear {
          from {
            transform: scale(0.95) translateY(10px);
            opacity: 0;
          }
          to {
            transform: scale(1) translateY(0);
            opacity: 1;
          }
        }

        /* Modal Header */
        .experience-modal-header {
          padding: 24px 28px;
          border-bottom: 4px solid #1C202B;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #FFFFFF;
        }

        .experience-modal-title {
          font-family: 'Open Sans', sans-serif;
          font-size: 26px;
          font-weight: 800;
          color: #1C202B;
          margin: 0;
          transform: skewX(-4deg);
          text-transform: uppercase;
          line-height: 1.2;
        }

        .experience-modal-close-btn {
          background: #E22D6D;
          border: 3px solid #1C202B;
          box-shadow: 3px 3px 0 0 #1C202B;
          color: white;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          font-family: 'Bangers', cursive;
          font-size: 20px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.1s;
        }
        .experience-modal-close-btn:hover {
          transform: translate(-1px, -1px);
          box-shadow: 4px 4px 0 0 #1C202B;
        }
        .experience-modal-close-btn:active {
          transform: translate(1px, 1px);
          box-shadow: 1px 1px 0 0 #1C202B;
        }

        /* Modal Body */
        .experience-modal-body {
          padding: 28px;
        }

        .modal-overview p {
          font-family: 'Open Sans', sans-serif;
          font-size: 15px;
          line-height: 1.65;
          color: #1C202B;
          margin: 0;
          font-style: italic;
          border-left: 4px solid var(--brand);
          padding-left: 16px;
        }

        .modal-divider {
          height: 2px;
          border-top: 2.5px dashed rgba(28, 32, 43, 0.15);
          margin: 20px 0;
        }

        .modal-details-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 28px;
        }

        .modal-grid-col {
          display: flex;
          flex-direction: column;
        }

        .modal-section-card {
          background: #F8FAFC;
          border: 2.5px solid #1C202B;
          box-shadow: 4px 4px 0 0 #1C202B;
          border-radius: 6px;
          padding: 20px;
        }

        .modal-section-title {
          font-family: 'Bangers', cursive;
          font-size: 22px;
          letter-spacing: 0.5px;
          margin: 0 0 10px 0;
          text-transform: uppercase;
        }

        .modal-text {
          font-family: 'Open Sans', sans-serif;
          font-size: 13.5px;
          line-height: 1.6;
          color: var(--color-body);
          margin: 0;
        }

        .modal-list {
          list-style: none;
          padding: 0;
          margin: 8px 0 0 0;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .modal-list li {
          font-family: 'Open Sans', sans-serif;
          font-size: 13px;
          line-height: 1.55;
          color: var(--color-body);
          position: relative;
          padding-left: 16px;
        }

        .modal-list li::before {
          content: "•";
          color: var(--brand);
          font-size: 16px;
          position: absolute;
          left: 0;
          top: -2px;
        }

        .modal-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 20px;
        }

        .modal-action-btn {
          font-family: 'Open Sans', sans-serif;
          font-size: 12px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 1px;
          padding: 12px 20px;
          border-radius: 4px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          text-decoration: none;
          transition: transform 80ms, box-shadow 80ms;
        }

        .modal-action-btn.primary-btn {
          background: #1C202B;
          color: #FFFFFF;
          border: 3px solid #1C202B;
          box-shadow: 4px 4px 0 0 var(--brand);
        }
        .modal-action-btn.primary-btn:hover {
          transform: translate(-1px, -1px);
          box-shadow: 5px 5px 0 0 var(--brand);
        }
        .modal-action-btn.primary-btn:active {
          transform: translate(1px, 1px);
          box-shadow: 2px 2px 0 0 var(--brand);
        }

        .modal-action-btn.secondary-btn {
          background: #FFFFFF;
          color: #1C202B;
          border: 3px solid #1C202B;
          box-shadow: 4px 4px 0 0 #B7C4ED;
        }
        .modal-action-btn.secondary-btn:hover {
          transform: translate(-1px, -1px);
          box-shadow: 5px 5px 0 0 #B7C4ED;
        }
        .modal-action-btn.secondary-btn:active {
          transform: translate(1px, 1px);
          box-shadow: 2px 2px 0 0 #B7C4ED;
        }

        @media (max-width: 1023px) {
          .experience-card-wrapper {
            grid-template-columns: 1fr;
            padding: 36px 28px;
            gap: 28px;
          }
          .exp-header-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
            margin-bottom: 48px !important;
          }
          .modal-details-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          .modal-action-btn {
            width: 100%;
            justify-content: center;
          }
          .modal-footer {
            flex-direction: column;
            align-items: stretch;
          }
        }
        @media (max-width: 767px) {
          .experience-card-wrapper {
            grid-template-columns: 1fr;
            padding: 24px 16px;
            gap: 24px;
            box-shadow: 6px 6px 0 0 #1C202B;
          }
          .experience-sidebar-card {
            padding: 24px 16px;
            min-height: unset;
          }
          .exp-header-grid {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
            margin-bottom: 36px !important;
          }
          .exp-cards-list {
            gap: 32px !important;
          }
        }
      `}</style>
    </section>
  );
}
