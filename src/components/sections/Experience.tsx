"use client";

import { useRef, useState } from "react";
import { useScrollReveal } from "@/lib/useScrollReveal";

interface ReportSection {
  title: string;
  content: string | string[];
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
  description: string;
  skills: string[];
  linkText: string;
  linkUrl: string;
  thumbnail: string | null;
  highlights: string[];
  modalTitle: string;
  introduction: string;
  fullReportSections: ReportSection[];
}

const ROLES: Role[] = [
  {
    id:       "emedlogix",
    period:   "Dec 2025 — June 2026",
    location: "Remote",
    role:     "Intelligent System Developer",
    company:  "EmedLogix",
    type:     "7-Month Internship",
    accent:   "#A23DDB",
    accentBg: "rgba(162,61,219,0.08)",
    accentBadge: "badge-purple",
    typeBadge:   "badge-dark",
    description:
      "Worked as an AI Product Developer Intern at EmedLogix (US-based healthcare technology SaaS), contributing to a production provider onboarding and credential management system active in the market.",
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
    thumbnail: null,
    highlights: [
      "Enterprise Healthcare SaaS Focus",
      "Intelligent Document Processing (OCR)",
      "Plain-English Database Chatbot Interface",
      "Production AWS & Entra ID SSO Integration"
    ],
    modalTitle: "EmedLogix Internship Report",
    introduction: "I worked as an AI Product Developer Intern at EmedLogix, a US-based healthcare technology product company, where I spent over 7 months developing an enterprise-grade healthcare credentialing platform used by healthcare organizations to automate and accelerate provider onboarding and credential management workflows.",
    fullReportSections: [
      {
        title: "Role and Context",
        content: "Unlike a research internship, this was a production engineering role where I contributed to building features that are actively used by real customers. I worked closely with a team of four engineers to design, develop, integrate, and deploy automated capabilities across the platform.\n\nThe primary objective of the product was to eliminate repetitive manual work involved in healthcare credentialing—a process that traditionally requires healthcare administrators to verify provider information, process hundreds of documents, complete lengthy forms, communicate with multiple organizations, and ensure regulatory compliance. Our platform automated much of this workflow using intelligent document processing, cloud-native services, and conversational interfaces."
      },
      {
        title: "Key Contributions & Engineering Impact",
        content: [
          "Intelligent Document Processing: Built document reading pipelines capable of extracting structured information from healthcare documents such as licenses, certificates, identity proofs, and credentialing forms. Reduced manual data entry by nearly 90% through automated extraction and autofill.",
          "Assisted Workflows & User Trust: Integrated conversational support features throughout the platform to assist users during credentialing. Implemented features that provide transparent reasoning behind suggestions, increasing user trust and adoption.",
          "Healthcare API & External Integration: Connected multiple external registry databases and healthcare APIs to automatically retrieve provider information, validate credentials, and streamline multi-step onboarding processes into guided workflows.",
          "Plain-English Database Search: Built a conversational database interface over PostgreSQL. This allowed administrators to query provider onboarding statuses and operational metrics in plain English rather than writing SQL database queries.",
          "Enterprise Security & SSO: Implemented secure Role-Based Access Control (RBAC) to ensure users could only access data relevant to their roles, and integrated Microsoft Azure Entra ID Single Sign-On (SSO) for secure enterprise authentication.",
          "Scheduled Jobs & Cloud Infrastructure: Developed automated notification services for workflow updates. Built scheduled nightly analysis jobs that automatically processed operational data to prepare insight reports. Contributed to deploying backend services via AWS Elastic Beanstalk, databases via Amazon RDS (PostgreSQL), and frontends via AWS Amplify."
        ]
      },
      {
        title: "Outcome & Value Added",
        content: "This internship provided me with invaluable experience building real-world enterprise healthcare software, working alongside a core team of four engineers. Rather than developing proof-of-concept applications, I worked on a production healthcare platform that organizations actively use to automate credentialing workflows and reduce administrative overhead.\n\nDue to NDA restrictions, I cannot share the application's internal architecture, source code, or credentials. However, the publicly accessible product can be found at enroll.pmslogix.com.\n\nWorking at EmedLogix gave me a deep understanding of how intelligent automation can be integrated into enterprise healthcare software to solve practical business problems while meeting the security, scalability, and reliability requirements expected in production systems."
      }
    ]
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
    description:
      "Developed 'AI Nose', an intelligent real-time odor detection and environmental monitoring system that combines IoT, Machine Learning, and Cloud Computing to identify unpleasant odor conditions.",
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
    thumbnail: "/photos/IMG_0755.jpeg",
    highlights: [
      "Hardware: ESP32 Microcontroller",
      "Sensors: MQ3 & MQ9 Gas Sensors",
      "Database: Firebase Realtime Database",
      "Dashboard: Python Gradio Visualizer"
    ],
    modalTitle: "AI Nose Internship Report",
    introduction: "During my Microsoft Edunet Foundation AI/ML Internship, I developed AI Nose, an intelligent real-time odor detection and environmental monitoring system that combines IoT, Machine Learning, and Cloud Computing to identify unpleasant odor conditions and trigger immediate sanitation alerts.",
    fullReportSections: [
      {
        title: "Project Objective",
        content: "The goal of the project was to replace subjective human inspection with an automated air quality monitoring system. The system continuously analyzes air quality and Volatile Organic Compounds (VOCs) in enclosed environments such as public restrooms, hospitals, labs, and industrial spaces."
      },
      {
        title: "System Architecture & Engineering Steps",
        content: [
          "IoT Hardware & Sensors: Programmed an ESP32 microcontroller integrated with MQ3 and MQ9 gas sensors. These sensors measure concentrations of alcohol vapors, carbon monoxide, methane, LPG, and hydrogen.",
          "Signal Processing & Cloud Sync: Developed initial ESP32 preprocessing routines for sensor calibration, value normalization, and noise filtering. Timestamped datasets were streamed in real time to Firebase Realtime Database for instant synchronization.",
          "Odor Level Classification Model: Collected a labeled sensor dataset categorized into Clean, Moderate, Foul, and Very Foul. Tested various machine learning models to choose the most reliable and fastest one, settling on a decision-tree-based algorithm (Random Forest) that achieves 98% accuracy and runs in milliseconds on the server.",
          "Live Monitoring Web Dashboard: Built a Gradio web application visualizing live sensor readings, predicted odor classes, and historical trends for remote monitoring.",
          "Automated Sanitation Alerts: Programmed alerts that trigger whenever predicted levels are Foul or Very Foul, notifying maintenance teams immediately so they can clean proactively rather than on a fixed schedule."
        ]
      },
      {
        title: "Outcome & Impact",
        content: "This project demonstrated how combining smart sensors with lightweight machine learning algorithms can automate environmental monitoring. It replaces subjective human facility checks with automated, data-driven decisions that improve hygiene and operational efficiency."
      }
    ]
  }
];

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef as React.RefObject<HTMLElement>);

  const [activeRole, setActiveRole] = useState<typeof ROLES[0] | null>(null);
  const [isWorkflowOpen, setIsWorkflowOpen] = useState(false);

  return (
    <section id="experience" className="section section-white-grid experience-section" ref={sectionRef}>
      {/* Hand-drawn squiggly dividers at the section boundaries for smooth smudging */}
      <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "16px", overflow: "hidden", pointerEvents: "none", zIndex: 10 }}>
        <svg width="100%" height="16" viewBox="0 0 1200 16" preserveAspectRatio="none" fill="none" stroke="#1C202B" strokeWidth="4">
          <path d="M0,8 Q50,0 100,8 T200,8 T300,8 T400,8 T500,8 T600,8 T700,8 T800,8 T900,8 T1000,8 T1100,8 T1200,8" />
        </svg>
      </div>

      <div style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: "16px", overflow: "hidden", pointerEvents: "none", zIndex: 10 }}>
        <svg width="100%" height="16" viewBox="0 0 1200 16" preserveAspectRatio="none" fill="none" stroke="#1C202B" strokeWidth="4">
          <path d="M0,8 Q50,16 100,8 T200,8 T300,8 T400,8 T500,8 T600,8 T700,8 T800,8 T900,8 T1000,8 T1100,8 T1200,8" />
        </svg>
      </div>

      {/* Hand-drawn decorative sketch icons */}
      <div className="sketch-decor star-top-left" aria-hidden="true">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#A23DDB" strokeWidth="2" strokeLinecap="round">
          <path d="M12 2l2.4 4.8 5.3.8-3.8 3.7.9 5.3-4.8-2.5-4.8 2.5.9-5.3-3.8-3.7 5.3-.8z" />
        </svg>
      </div>
      <div className="sketch-decor arrow-bottom-right" aria-hidden="true">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="#2DC8E2" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 12c12 2 18 10 24 22M26 34h8v-8" />
        </svg>
      </div>

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
            <h2 style={{ marginBottom: 0, display: "flex", flexDirection: "column", gap: "12px", position: "relative" }}>
              <span style={{ 
                fontFamily: "'Bangers', cursive", 
                fontSize: "52px", 
                color: "#1C202B",
                transform: "skewX(-6deg)",
                letterSpacing: "1px",
                display: "inline-block"
              }}>
                Real Work, Real Impact.
              </span>
              {/* Squiggle underline SVG */}
              <svg width="240" height="12" viewBox="0 0 240 12" fill="none" style={{ marginTop: "-5px" }}>
                <path d="M5 8C50 3.5 120 2.5 235 8" stroke="#FFB020" strokeWidth="4" strokeLinecap="round"/>
                <path d="M15 10C70 5.5 140 4.5 220 10" stroke="#FFB020" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
            </h2>
          </div>
          <div className="reveal reveal-right" style={{ paddingBottom: "4px" }}>
            <p className="leading" style={{ fontFamily: "'Open Sans', sans-serif", fontSize: "16px", color: "var(--color-body)" }}>
              Every role I&apos;ve taken has been about building something
              that genuinely works for real people — not just demos.
            </p>
          </div>
        </div>

        {/* ── Cards ── */}
        <div className="exp-cards-list" style={{ display: "flex", flexDirection: "column", gap: "54px" }}>
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
                className={`sketch-card reveal stagger-${i + 1}`}
              >
                {/* Tetromino components */}
                {renderPinkL}
                {renderYellowO}

                {/* Left Column: Description & Heading */}
                <div className="experience-card-copy">
                  {/* Eyebrow badge */}
                  <div className="experience-eyebrow" style={{ color: r.accent }}>
                    <span
                      style={{
                        width: "12px",
                        height: "12px",
                        background: r.accent,
                        border: "1.5px solid #1C202B",
                        display: "inline-block",
                        borderRadius: "3px"
                      }}
                    />
                    {r.type}
                  </div>

                  {/* Title & Logo Container */}
                  <div className="experience-title-row">
                    <img 
                      src={r.id === "emedlogix" ? "/EmedLogix-logo.jpg" : "/Edunet-Microsoft-logo.png"} 
                      alt={`${r.company} logo`}
                      style={{
                        width: r.id === "emedlogix" ? "160px" : "190px",
                        maxWidth: "100%",
                        height: "auto",
                        maxHeight: "65px",
                        objectFit: "contain",
                        objectPosition: "left",
                        flexShrink: 0,
                        marginRight: "8px"
                      }}
                    />
                    <div className="experience-title-copy">
                      <h3 className="experience-role-title">
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
                      <div className="experience-meta">
                        {r.period} · {r.location}
                      </div>
                    </div>
                  </div>

                  {/* Subtext description */}
                  <p className="experience-description">
                    {r.description}
                  </p>

                  {/* Action button styled as sketch badge */}
                  <button
                    onClick={() => setActiveRole(r)}
                    className="sketch-btn"
                  >
                    View Detailed Report →
                  </button>

                  {/* Skills badges at bottom left */}
                  <div className="experience-skill-list">
                    {r.skills.slice(0, 4).map((s) => (
                      <span key={s} className="experience-skill-pill">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right Column: Thumbnail Image / Highlights Panel */}
                <div className="sketch-right-col" style={{ width: "100%", position: "relative", ['--accent']: r.accent } as React.CSSProperties}>
                  {r.thumbnail ? (
                    <div className="sketch-image-wrapper">
                      <img
                        src={r.thumbnail}
                        alt={`${r.company} Prototype`}
                        style={{
                          width: "100%",
                          height: "220px",
                          objectFit: "cover",
                          display: "block"
                        }}
                      />
                      <span
                        style={{
                          position: "absolute",
                          bottom: "12px",
                          left: "12px",
                          background: "#FFB020",
                          border: "2px solid #1C202B",
                          color: "#1C202B",
                          padding: "4px 8px",
                          fontFamily: "'Open Sans', sans-serif",
                          fontSize: "10px",
                          fontWeight: 800,
                          textTransform: "uppercase",
                          boxShadow: "2px 2px 0 0 #1C202B",
                          borderRadius: "4px 10px 4px 10px/10px 4px 10px 4px"
                        }}
                      >
                        Hardware Prototype
                      </span>
                    </div>
                  ) : (
                    <div className="sketch-highlights-box">
                      <div className="sketch-highlights-title">
                        Key Highlights
                      </div>
                      <ul className="sketch-highlights-list">
                        {r.highlights.map((hl, idx) => (
                          <li 
                            key={idx}
                            className="sketch-highlights-item"
                          >
                            <span style={{ color: r.accent, fontWeight: 900, fontSize: "14px" }}>✓</span>
                            <span>{hl}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>

      </div>

      {/* Internship Details Modal */}
      {activeRole && (
        <div
          className="modal-backdrop"
          onClick={() => setActiveRole(null)}
        >
          <div
            className="sketch-modal-container"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="experience-modal-header" style={{ borderBottomColor: activeRole.accent, background: "#FFFDF6" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
                <img 
                  src={activeRole.id === "emedlogix" ? "/EmedLogix-logo.jpg" : "/Edunet-Microsoft-logo.png"} 
                  alt={`${activeRole.company} logo`}
                  style={{
                    width: activeRole.id === "emedlogix" ? "100px" : "120px",
                    height: "auto",
                    maxHeight: "45px",
                    objectFit: "contain",
                    objectPosition: "left",
                  }}
                />
                <div>
                  <h3 className="experience-modal-title" style={{ fontFamily: "'Bangers', cursive", fontSize: "28px", letterSpacing: "0.5px" }}>{activeRole.role}</h3>
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

            {/* Modal Body: Organized sketchbook reading flow */}
            <div className="experience-modal-body" style={{ padding: "32px 40px" }}>
              <div className="modal-document-layout" style={{ display: "flex", flexDirection: "column", gap: "32px", position: "relative" }}>
                
                {/* Simulated vertical red binder line of a notepad */}
                <div style={{
                  position: "absolute",
                  left: "-20px",
                  top: 0,
                  bottom: 0,
                  width: "2px",
                  background: "rgba(255, 95, 86, 0.4)",
                }} />

                {/* Introduction Section */}
                <div className="modal-doc-intro" style={{ borderLeft: `5px solid ${activeRole.accent}`, paddingLeft: "20px" }}>
                  <p style={{ fontFamily: "'Open Sans', sans-serif", fontSize: "15px", lineHeight: "1.65", color: "#1C202B", fontWeight: 600, margin: 0 }}>
                    {activeRole.introduction}
                  </p>
                </div>

                {/* Structured Narrative Sections */}
                {activeRole.fullReportSections.map((section, idx) => (
                  <div key={idx} className="modal-doc-section" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    <h4 
                      style={{ 
                        fontFamily: "'Bangers', cursive", 
                        fontSize: "26px", 
                        color: "#1C202B", 
                        letterSpacing: "0.5px",
                        margin: 0,
                        borderBottom: `2.5px dashed ${activeRole.accent}`,
                        paddingBottom: "6px",
                        alignSelf: "flex-start"
                      }}
                    >
                      {section.title}
                    </h4>
                    
                    {Array.isArray(section.content) ? (
                      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
                        {section.content.map((bullet, bIdx) => {
                          const colonIndex = bullet.indexOf(":");
                          if (colonIndex !== -1) {
                            const boldTitle = bullet.slice(0, colonIndex);
                            const description = bullet.slice(colonIndex + 1);
                            return (
                              <li 
                                key={bIdx} 
                                style={{ 
                                  fontFamily: "'Open Sans', sans-serif", 
                                  fontSize: "14.5px", 
                                  lineHeight: "1.6", 
                                  color: "var(--color-body)", 
                                  position: "relative",
                                  paddingLeft: "20px"
                                }}
                              >
                                <span style={{ color: activeRole.accent, position: "absolute", left: 0, fontWeight: 900 }}>•</span>
                                <strong>{boldTitle}:</strong>{description}
                              </li>
                            );
                          }
                          return (
                            <li 
                              key={bIdx} 
                              style={{ 
                                fontFamily: "'Open Sans', sans-serif", 
                                fontSize: "14.5px", 
                                lineHeight: "1.6", 
                                color: "var(--color-body)", 
                                position: "relative",
                                paddingLeft: "20px"
                              }}
                            >
                              <span style={{ color: activeRole.accent, position: "absolute", left: 0, fontWeight: 900 }}>•</span>
                              {bullet}
                            </li>
                          );
                        })}
                      </ul>
                    ) : (
                      <p style={{ fontFamily: "'Open Sans', sans-serif", fontSize: "14.5px", lineHeight: "1.65", color: "var(--color-body)", margin: 0, whiteSpace: "pre-line" }}>
                        {section.content}
                      </p>
                    )}
                  </div>
                ))}

                {/* Technical Skills Gained List */}
                <div className="modal-doc-section" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <h4 
                    style={{ 
                      fontFamily: "'Bangers', cursive", 
                      fontSize: "26px", 
                      color: "#1C202B", 
                      letterSpacing: "0.5px",
                      margin: 0,
                      borderBottom: `2.5px dashed #E22D6D`,
                      paddingBottom: "6px",
                      alignSelf: "flex-start"
                    }}
                  >
                    Skills & Technologies Applied
                  </h4>
                  <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "4px" }}>
                    {activeRole.skills.map((s) => (
                      <span
                        key={s}
                        style={{
                          background: "#FFFFFF",
                          color: "#1C202B",
                          border: "2px solid #1C202B",
                          boxShadow: "2px 2px 0 0 #1C202B",
                          padding: "6px 12px",
                          fontFamily: "'Open Sans', sans-serif",
                          fontSize: "12px",
                          fontWeight: 700,
                          borderRadius: "4px",
                        }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            </div>

            {/* Modal Footer */}
            <div className="experience-modal-header" style={{ borderTop: "2.5px dashed rgba(28, 32, 43, 0.15)", borderBottom: "none", padding: "20px 32px", background: "#FFFDF6" }}>
              <div style={{ display: "flex", width: "100%", justifyContent: "flex-end", gap: "12px", flexWrap: "wrap" }}>
                {activeRole.id === "microsoft" && (
                  <button
                    onClick={() => setIsWorkflowOpen(true)}
                    className="modal-action-btn secondary-btn"
                    style={{ cursor: "pointer", fontFamily: "'Open Sans', sans-serif" }}
                  >
                    See Internship Workflow →
                  </button>
                )}
                <a
                  href={activeRole.linkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="modal-action-btn primary-btn"
                  style={{ ['--brand']: activeRole.accent, fontFamily: "'Open Sans', sans-serif" } as React.CSSProperties}
                >
                  {activeRole.linkText} →
                </a>
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
        .section-white-grid {
          background-color: #FFFFFF;
          background-image:
            linear-gradient(rgba(28, 32, 43, 0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(28, 32, 43, 0.035) 1px, transparent 1px);
          background-size: 24px 24px;
          position: relative;
          overflow: hidden;
        }
        .experience-section {
          isolation: isolate;
        }

        /* Doodle Sketch Decorations */
        .sketch-decor {
          position: absolute;
          pointer-events: none;
          opacity: 0.3;
          z-index: 1;
        }
        .sketch-decor.star-top-left {
          top: 40px;
          left: 5%;
          transform: rotate(-15deg);
        }
        .sketch-decor.arrow-bottom-right {
          bottom: 40px;
          right: 5%;
          transform: rotate(10deg);
        }

        .sketch-card {
          background: #FFFFFF;
          border: 4px solid #1C202B;
          border-radius: 8px;
          box-shadow: 10px 10px 0 0 #1C202B;
          padding: 0;
          position: relative;
          display: flex;
          flex-direction: column;
          transition: transform 150ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 150ms;
          overflow: hidden;
          z-index: 2;
        }
        .sketch-card:hover {
          transform: translateY(-4px);
          box-shadow: 14px 14px 0 0 #1C202B;
        }
        .exp-cards-list {
          display: grid !important;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 32px !important;
          align-items: stretch;
        }
        .experience-card-copy {
          display: flex;
          flex-direction: column;
          flex-grow: 1;
          min-width: 0;
          padding: 0 24px 24px;
        }
        .experience-eyebrow {
          position: absolute;
          top: 14px;
          left: 14px;
          z-index: 5;
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: 'Open Sans', sans-serif;
          font-size: 11px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          background: #FFFFFF;
          border: 2px solid #1C202B;
          border-radius: 2px;
          padding: 6px 12px;
        }
        .experience-title-row {
          display: grid;
          grid-template-columns: auto minmax(0, 1fr);
          align-items: center;
          gap: 24px;
          margin: 0 -24px 24px;
          padding: 58px 24px 28px;
          min-height: 180px;
          background: #F4F6FF;
          border-bottom: 4px solid #1C202B;
        }
        .experience-title-copy {
          min-width: 0;
        }
        .experience-role-title {
          font-family: 'Open Sans', sans-serif;
          font-size: clamp(23px, 2vw, 31px);
          font-weight: 900;
          color: #1C202B;
          letter-spacing: 0.2px;
          line-height: 1.16;
          margin: 0;
          text-transform: none;
        }
        .experience-role-title span {
          font-style: normal;
          font-weight: 900;
        }
        .experience-meta {
          margin-top: 8px;
          font-family: 'Open Sans', sans-serif;
          font-size: 13px;
          font-weight: 700;
          color: var(--color-body-subtle);
          letter-spacing: 0.1px;
        }
        .experience-description {
          font-family: 'Open Sans', sans-serif;
          font-size: 14px;
          line-height: 1.6;
          color: #2F3645;
          min-height: 90px;
          margin: 0 0 20px;
        }
        .experience-description::after {
          content: "";
          display: block;
          border-top: 2px dashed rgba(28, 32, 43, 0.15);
          margin-top: 20px;
          width: 100%;
        }
        .experience-skill-list {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-top: 20px;
        }
        .experience-skill-pill {
          background: #1C202B;
          color: #FFFFFF;
          border: 2px solid #1C202B;
          box-shadow: 3px 3px 0 0 #B7C4ED;
          padding: 8px 12px;
          font-family: 'Open Sans', sans-serif;
          font-size: 10.5px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.55px;
          line-height: 1;
          border-radius: 4px;
        }
        .sketch-right-col {
          padding: 0 24px 24px;
        }

        .sketch-highlights-box {
          background: #FFFDF6;
          border: 3px solid #1C202B;
          border-radius: 6px;
          box-shadow: 5px 5px 0 0 var(--accent);
          padding: 18px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          min-height: 190px;
        }
        .sketch-highlights-title {
          font-family: 'Bangers', cursive;
          font-size: 24px;
          color: #1C202B;
          letter-spacing: 0.6px;
          text-transform: uppercase;
          border-bottom: 2px dashed rgba(28, 32, 43, 0.55);
          padding-bottom: 8px;
        }
        .sketch-highlights-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 11px;
        }
        .sketch-highlights-item {
          font-family: 'Open Sans', sans-serif;
          font-size: 13.5px;
          font-weight: 700;
          color: var(--color-body);
          display: flex;
          align-items: flex-start;
          gap: 9px;
          line-height: 1.45;
        }

        .sketch-image-wrapper {
          border: 3px solid #1C202B;
          border-radius: 6px;
          box-shadow: 5px 5px 0 0 var(--accent);
          overflow: hidden;
          position: relative;
        }

        .sketch-btn {
          width: 100%;
          background: #1C202B;
          color: #FFFFFF;
          border: 3px solid #1C202B;
          border-radius: 4px;
          box-shadow: 5px 5px 0 0 #FFB020;
          font-family: 'Open Sans', sans-serif;
          font-size: 13px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          cursor: pointer;
          padding: 14px 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          transition: transform 100ms, box-shadow 100ms;
        }
        .sketch-btn:hover {
          transform: translate(-2px, -2px);
          box-shadow: 7px 7px 0 0 #FFB020;
        }
        .sketch-btn:active {
          transform: translate(2px, 2px);
          box-shadow: 1px 1px 0 0 #FFB020;
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
        .sketch-modal-container {
          background: #FFFDF6;
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
          .exp-cards-list {
            grid-template-columns: 1fr !important;
            max-width: 680px;
            margin: 0 auto;
          }
          .sketch-card {
            border-radius: 14px;
          }
          .exp-header-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
            margin-bottom: 48px !important;
          }
        }
        @media (max-width: 767px) {
          .exp-cards-list {
            max-width: none;
          }
          .sketch-card {
            border-radius: 12px;
            box-shadow: 6px 6px 0 0 #1C202B;
          }
          .experience-title-row {
            grid-template-columns: 1fr;
            gap: 14px;
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
