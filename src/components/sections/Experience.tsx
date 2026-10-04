"use client";

import { useRef, useState } from "react";
import { useScrollReveal } from "@/lib/useScrollReveal";
import { useDialog } from "@/lib/useDialog";

interface ReportSection {
  title: string;
  content: string | string[];
}

interface Impact {
  value: string;
  label: string;
}

interface Role {
  id: string;
  period: string;
  location: string;
  role: string;
  company: string;
  type: string;
  accent: string;
  logo: string;
  logoWidth: number;
  description: string;
  skills: string[];
  linkText: string;
  linkUrl: string;
  thumbnail: string | null;
  thumbnailLabel: string | null;
  highlights: string[];
  /** Headline outcome, quoted from the report below */
  impact: Impact;
  /** Which report section lists the engineering work, rendered as the "What I built" list */
  builtSection: string;
  workflowImage: string | null;
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
    logo:     "/EmedLogix-logo.jpg",
    logoWidth: 132,
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
    thumbnailLabel: null,
    highlights: [
      "Enterprise Healthcare SaaS Focus",
      "Intelligent Document Processing (OCR)",
      "Plain-English Database Chatbot Interface",
      "Production AWS & Entra ID SSO Integration"
    ],
    impact: {
      value: "~90%",
      label: "less manual data entry through automated document extraction and autofill",
    },
    builtSection: "Key Contributions & Engineering Impact",
    workflowImage: null,
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
    logo:     "/Edunet-Microsoft-logo.png",
    logoWidth: 156,
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
    thumbnail: "/thumbs/ai-nose-prototype.webp",
    thumbnailLabel: "Hardware Prototype",
    highlights: [
      "Hardware: ESP32 Microcontroller",
      "Sensors: MQ3 & MQ9 Gas Sensors",
      "Database: Firebase Realtime Database",
      "Dashboard: Python Gradio Visualizer"
    ],
    impact: {
      value: "98%",
      label: "classification accuracy from a Random Forest model that runs in milliseconds on the server",
    },
    builtSection: "System Architecture & Engineering Steps",
    workflowImage: "/AI_Nose_Workflow.png",
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

/** "Title: body" bullets → [title, body] */
function splitBullet(bullet: string): [string | null, string] {
  const i = bullet.indexOf(":");
  return i === -1 ? [null, bullet] : [bullet.slice(0, i), bullet.slice(i + 1).trim()];
}

function builtTitles(r: Role): string[] {
  const section = r.fullReportSections.find((s) => s.title === r.builtSection);
  if (!section || !Array.isArray(section.content)) return [];
  return section.content.map((b) => splitBullet(b)[0]).filter((t): t is string => Boolean(t));
}

function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

function RoleCase({ r, index, onOpenWorkflow }: { r: Role; index: number; onOpenWorkflow: (src: string, alt: string) => void }) {
  const [open, setOpen] = useState(false);
  const reportId = `${r.id}-report`;
  const built = builtTitles(r);

  return (
    <li className={`xp-entry reveal stagger-${index + 1}`} style={{ ["--accent" as string]: r.accent }}>
      {/* ── Timeline rail: when / where / who ── */}
      <div className="xp-rail">
        <span className="xp-node" aria-hidden="true" />
        <p className="xp-period">{r.period}</p>
        <p className="xp-rail-meta">
          <span className="xp-type">{r.type}</span>
          <span>{r.location}</span>
        </p>
        <div className="xp-logo-tile">
          <img src={r.logo} alt={`${r.company} logo`} width={r.logoWidth} height={48} loading="lazy" decoding="async" />
        </div>
      </div>

      {/* ── The case ── */}
      <article id={r.id} className="xp-card" aria-labelledby={`${r.id}-title`}>
        <span className="xp-tetro xp-tetro-l" aria-hidden="true">
          <svg width="30" height="42" viewBox="0 0 30 42">
            <rect x="1" y="1" width="12" height="12" fill="var(--brand)" stroke="#1C202B" strokeWidth="2.5" />
            <rect x="1" y="15" width="12" height="12" fill="var(--brand)" stroke="#1C202B" strokeWidth="2.5" />
            <rect x="1" y="29" width="12" height="12" fill="var(--brand)" stroke="#1C202B" strokeWidth="2.5" />
            <rect x="15" y="29" width="12" height="12" fill="var(--brand)" stroke="#1C202B" strokeWidth="2.5" />
          </svg>
        </span>

        <header className="xp-card-head">
          <h3 id={`${r.id}-title`} className="xp-role">{r.role}</h3>
          <p className="xp-company">@ {r.company}</p>
        </header>

        <div className="xp-card-grid">
          <div className="xp-main">
            <p className="xp-desc">{r.description}</p>

            <div className="xp-impact">
              <span className="xp-impact-value">{r.impact.value}</span>
              <span className="xp-impact-label">{r.impact.label}</span>
            </div>

            {built.length > 0 && (
              <div className="xp-built">
                <h4 className="xp-sub">What I built</h4>
                <ul className="xp-built-list">
                  {built.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <aside className="xp-side" aria-label={`${r.company} highlights`}>
            {r.thumbnail && (
              <figure className="xp-figure">
                <img src={r.thumbnail} alt={`${r.company} ${r.thumbnailLabel ?? "photo"}`} width={640} height={420} loading="lazy" decoding="async" />
                {r.thumbnailLabel && <figcaption>{r.thumbnailLabel}</figcaption>}
              </figure>
            )}
            <div className="xp-highlights">
              <h4 className="xp-sub">Key Highlights</h4>
              <ul>
                {r.highlights.map((hl) => {
                  const [k, v] = splitBullet(hl);
                  return (
                    <li key={hl}>
                      {k ? (<><span className="xp-hl-key">{k}</span><span>{v}</span></>) : <span>{v}</span>}
                    </li>
                  );
                })}
              </ul>
            </div>
          </aside>
        </div>

        <ul className="xp-skills" aria-label="Skills and technologies">
          {r.skills.map((s) => <li key={s}>{s}</li>)}
        </ul>

        <div className="xp-actions">
          <button
            type="button"
            className="xp-btn xp-btn-primary"
            aria-expanded={open}
            aria-controls={reportId}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? "Hide detailed report" : "Read detailed report"}
            <svg className="xp-chev" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>
          {r.workflowImage && (
            <button
              type="button"
              className="xp-btn xp-btn-secondary"
              onClick={() => onOpenWorkflow(r.workflowImage!, "AI Nose Environmental Odor Detection System Workflow")}
            >
              See Internship Workflow
            </button>
          )}
          <a href={r.linkUrl} target="_blank" rel="noopener noreferrer" className="xp-btn xp-btn-link">
            {r.linkText} <Arrow />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </div>

        {/* ── Full report: expands in place, no modal ── */}
        <div id={reportId} className={`xp-report ${open ? "is-open" : ""}`} hidden={!open}>
          <div className="xp-report-inner">
            <h4 className="xp-report-title">{r.modalTitle}</h4>
            <p className="xp-report-intro">{r.introduction}</p>
            <div className="xp-report-sections">
              {r.fullReportSections.map((section) => (
                <section key={section.title} className={`xp-report-section ${Array.isArray(section.content) ? "is-list" : ""}`}>
                  <h5>{section.title}</h5>
                  {Array.isArray(section.content) ? (
                    <ul>
                      {section.content.map((bullet) => {
                        const [k, v] = splitBullet(bullet);
                        return (
                          <li key={bullet}>
                            {k ? (<><strong>{k}:</strong> {v}</>) : v}
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <p>{section.content}</p>
                  )}
                </section>
              ))}
            </div>
          </div>
        </div>
      </article>
    </li>
  );
}

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef as React.RefObject<HTMLElement>);

  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);
  const closeLightbox = () => setLightbox(null);
  const lightboxRef = useDialog<HTMLDivElement>(lightbox !== null, closeLightbox);

  return (
    <section id="experience" className="section xp-section" ref={sectionRef} aria-labelledby="experience-title">
      {/* Hand-drawn squiggle edges, kept from the sketchbook system */}
      <svg className="xp-edge xp-edge-top" viewBox="0 0 1200 16" preserveAspectRatio="none" fill="none" stroke="#1C202B" strokeWidth="4" aria-hidden="true">
        <path d="M0,8 Q50,0 100,8 T200,8 T300,8 T400,8 T500,8 T600,8 T700,8 T800,8 T900,8 T1000,8 T1100,8 T1200,8" />
      </svg>
      <svg className="xp-edge xp-edge-bottom" viewBox="0 0 1200 16" preserveAspectRatio="none" fill="none" stroke="#1C202B" strokeWidth="4" aria-hidden="true">
        <path d="M0,8 Q50,16 100,8 T200,8 T300,8 T400,8 T500,8 T600,8 T700,8 T800,8 T900,8 T1000,8 T1100,8 T1200,8" />
      </svg>

      <div className="container section-content">
        <header className="xp-header">
          <div className="reveal reveal-left">
          <h2 id="experience-title" className="xp-title">
            Real Work, Real Impact.
            <svg className="xp-title-underline" width="240" height="12" viewBox="0 0 240 12" fill="none" aria-hidden="true">
              <path d="M5 8C50 3.5 120 2.5 235 8" stroke="#FFB020" strokeWidth="4" strokeLinecap="round" />
              <path d="M15 10C70 5.5 140 4.5 220 10" stroke="#FFB020" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </h2>
          </div>
          <p className="xp-lead reveal reveal-right">
            Every role I&apos;ve taken has been about building something
            that genuinely works for real people — not just demos.
          </p>
        </header>

        <ol className="xp-timeline">
          {ROLES.map((r, i) => (
            <RoleCase key={r.id} r={r} index={i} onOpenWorkflow={(src, alt) => setLightbox({ src, alt })} />
          ))}
        </ol>
      </div>

      {/* Workflow diagram lightbox — image viewing is the one place a dialog earns its keep */}
      {lightbox && (
        <div className="xp-lightbox" onClick={closeLightbox}>
          <div
            ref={lightboxRef}
            className="xp-lightbox-panel"
            role="dialog"
            aria-modal="true"
            aria-label={lightbox.alt}
            tabIndex={-1}
            onClick={(e) => e.stopPropagation()}
          >
            <img src={lightbox.src} alt={lightbox.alt} />
            <button type="button" className="xp-lightbox-close" onClick={closeLightbox} aria-label="Close workflow diagram">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
            </button>
          </div>
        </div>
      )}

      <style>{`
        .xp-section {
          background-color: #FFFFFF;
          background-image:
            linear-gradient(rgba(28, 32, 43, 0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(28, 32, 43, 0.035) 1px, transparent 1px);
          background-size: 24px 24px;
          isolation: isolate;
        }
        .xp-edge { position: absolute; left: 0; width: 100%; height: 16px; pointer-events: none; z-index: 10; }
        .xp-edge-top { top: 0; }
        .xp-edge-bottom { bottom: 0; }

        /* ── Header ── */
        .xp-header {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
          gap: 48px;
          align-items: end;
          margin-bottom: 72px;
        }
        .xp-title {
          font-size: clamp(40px, 5vw, 56px);
          letter-spacing: 1px;
          margin: 0;
          transform: skewX(-6deg);
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .xp-title-underline { max-width: 100%; height: auto; }
        .xp-lead {
          font-size: 17px;
          line-height: 1.6;
          max-width: 48ch;
          color: var(--color-body);
        }

        /* ── Timeline ── */
        .xp-timeline {
          list-style: none;
          max-width: 1120px;
          margin: 0 auto;
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 56px;
        }
        .xp-timeline::before {
          content: "";
          position: absolute;
          top: 10px;
          bottom: 40px;
          left: 11px;
          border-left: 3px dashed rgba(28, 32, 43, 0.28);
        }
        .xp-entry {
          display: grid;
          grid-template-columns: 220px minmax(0, 1fr);
          gap: 40px;
          position: relative;
        }

        .xp-rail {
          position: sticky;
          top: calc(var(--nav-h) + 24px);
          align-self: start;
          padding-left: 40px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .xp-node {
          position: absolute;
          left: 0;
          top: 4px;
          width: 25px;
          height: 25px;
          background: var(--accent);
          border: 3px solid #1C202B;
          box-shadow: 3px 3px 0 0 #1C202B;
        }
        .xp-period {
          font-family: 'Bangers', cursive;
          font-size: 26px;
          letter-spacing: 0.5px;
          line-height: 1.05;
          color: #1C202B;
          margin: 0;
        }
        .xp-rail-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 6px 10px;
          align-items: center;
          font-size: 13px;
          font-weight: 700;
          color: var(--color-body-subtle);
          margin: 0;
        }
        .xp-type {
          background: #1C202B;
          color: #FFFFFF;
          padding: 3px 8px;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.6px;
          text-transform: uppercase;
          border-radius: 3px;
        }
        .xp-logo-tile {
          margin-top: 6px;
          background: #FFFFFF;
          border: 2.5px solid #1C202B;
          border-radius: 8px;
          box-shadow: 4px 4px 0 0 var(--accent);
          padding: 12px 14px;
          width: fit-content;
          max-width: 100%;
        }
        .xp-logo-tile img {
          display: block;
          height: 44px;
          width: auto;
          max-width: 100%;
          object-fit: contain;
        }

        /* ── Case card ── */
        .xp-card {
          position: relative;
          background: #FFFFFF;
          border: 3.5px solid #1C202B;
          border-radius: 12px;
          box-shadow: 8px 8px 0 0 #1C202B;
          padding: 32px 34px 28px;
          scroll-margin-top: calc(var(--nav-h) + 24px);
        }
        .xp-tetro { position: absolute; pointer-events: none; z-index: 2; }
        .xp-tetro-l { top: -16px; right: 28px; }

        .xp-card-head { margin-bottom: 18px; }
        .xp-role {
          font-family: 'Open Sans', sans-serif;
          font-size: clamp(22px, 2.3vw, 30px);
          font-weight: 800;
          text-transform: none;
          letter-spacing: -0.4px;
          line-height: 1.15;
          margin: 0 0 4px;
          color: #1C202B;
          text-wrap: balance;
        }
        .xp-company {
          font-family: 'Bangers', cursive;
          font-size: 22px;
          letter-spacing: 0.6px;
          color: #1C202B;
          margin: 0;
          display: inline-block;
          background: linear-gradient(transparent 58%, color-mix(in srgb, var(--accent) 38%, transparent) 58%);
          padding: 0 4px;
        }

        .xp-card-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.45fr) minmax(0, 1fr);
          gap: 32px;
          align-items: start;
        }
        .xp-main { display: flex; flex-direction: column; gap: 22px; min-width: 0; }
        .xp-desc { font-size: 15.5px; line-height: 1.65; color: var(--color-body); margin: 0; max-width: 62ch; }

        .xp-impact {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 14px 18px;
          background: #FFFDF6;
          border: 2.5px solid #1C202B;
          border-radius: 8px;
        }
        .xp-impact-value {
          font-family: 'Bangers', cursive;
          font-size: 46px;
          line-height: 1;
          letter-spacing: 0.5px;
          color: #1C202B;
          flex-shrink: 0;
          text-shadow: 3px 3px 0 var(--accent);
        }
        .xp-impact-label { font-size: 14px; font-weight: 700; line-height: 1.45; color: #1C202B; }

        .xp-sub {
          font-family: 'Open Sans', sans-serif;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 1.2px;
          text-transform: uppercase;
          color: var(--color-body-subtle);
          margin: 0 0 10px;
        }
        .xp-built-list {
          list-style: none;
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 8px 20px;
        }
        .xp-built-list li {
          position: relative;
          padding-left: 20px;
          font-size: 14px;
          font-weight: 700;
          line-height: 1.4;
          color: #1C202B;
        }
        .xp-built-list li::before {
          content: "";
          position: absolute;
          left: 0;
          top: 5px;
          width: 9px;
          height: 9px;
          background: var(--accent);
          border: 2px solid #1C202B;
        }

        .xp-side { display: flex; flex-direction: column; gap: 16px; min-width: 0; }
        .xp-figure {
          position: relative;
          margin: 0;
          border: 2.5px solid #1C202B;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 4px 4px 0 0 var(--accent);
        }
        .xp-figure img { display: block; width: 100%; height: 200px; object-fit: cover; }
        .xp-figure figcaption {
          position: absolute;
          left: 10px;
          bottom: 10px;
          background: #FFB020;
          border: 2px solid #1C202B;
          color: #1C202B;
          padding: 3px 8px;
          font-size: 11px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.4px;
          border-radius: 4px;
        }
        .xp-highlights {
          background: #FFFDF6;
          border: 2.5px solid #1C202B;
          border-radius: 8px;
          padding: 16px 18px;
        }
        .xp-highlights ul { list-style: none; display: flex; flex-direction: column; gap: 10px; }
        .xp-highlights li {
          display: flex;
          flex-direction: column;
          gap: 1px;
          font-size: 14px;
          font-weight: 700;
          line-height: 1.35;
          color: #1C202B;
          padding-bottom: 10px;
          border-bottom: 1.5px dashed rgba(28, 32, 43, 0.18);
        }
        .xp-highlights li:last-child { padding-bottom: 0; border-bottom: 0; }
        .xp-hl-key {
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.8px;
          text-transform: uppercase;
          color: var(--color-body-subtle);
        }

        .xp-skills {
          list-style: none;
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin: 26px 0 0;
          padding-top: 22px;
          border-top: 2px dashed rgba(28, 32, 43, 0.15);
        }
        .xp-skills li {
          background: #F4F6FF;
          color: #1C202B;
          border: 1.5px solid #1C202B;
          padding: 5px 10px;
          font-size: 12px;
          font-weight: 700;
          line-height: 1.2;
          border-radius: 4px;
        }

        .xp-actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 22px; align-items: center; }
        .xp-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          min-height: 44px;
          padding: 10px 18px;
          font-family: 'Open Sans', sans-serif;
          font-size: 13px;
          font-weight: 800;
          letter-spacing: 0.6px;
          text-transform: uppercase;
          text-decoration: none;
          border-radius: 6px;
          cursor: pointer;
          transition: transform 100ms ease-out, box-shadow 100ms ease-out, background-color 150ms;
        }
        .xp-btn-primary { background: #1C202B; color: #FFFFFF; border: 2.5px solid #1C202B; box-shadow: 4px 4px 0 0 #FFB020; }
        .xp-btn-secondary { background: #FFFFFF; color: #1C202B; border: 2.5px solid #1C202B; box-shadow: 4px 4px 0 0 #B7C4ED; }
        .xp-btn-primary:hover, .xp-btn-secondary:hover { transform: translate(-2px, -2px); }
        .xp-btn-primary:hover { box-shadow: 6px 6px 0 0 #FFB020; }
        .xp-btn-secondary:hover { box-shadow: 6px 6px 0 0 #B7C4ED; }
        .xp-btn-primary:active, .xp-btn-secondary:active { transform: translate(2px, 2px); box-shadow: 1px 1px 0 0 #1C202B; }
        .xp-btn-link { color: #1C202B; border: 2.5px solid transparent; padding-left: 6px; padding-right: 6px; text-decoration: underline; text-underline-offset: 4px; text-decoration-thickness: 2px; }
        .xp-btn-link:hover { color: var(--brand-strong); }
        .xp-chev { transition: transform 200ms cubic-bezier(0.22, 1, 0.36, 1); }
        .xp-btn[aria-expanded="true"] .xp-chev { transform: rotate(180deg); }

        /* ── Inline report ── */
        .xp-report { margin-top: 26px; }
        .xp-report.is-open .xp-report-inner { animation: xpReportIn 360ms cubic-bezier(0.22, 1, 0.36, 1); }
        @keyframes xpReportIn {
          from { opacity: 0; transform: translateY(-8px); clip-path: inset(0 0 100% 0); }
          to   { opacity: 1; transform: none; clip-path: inset(0 0 0 0); }
        }
        .xp-report-inner {
          background: #FFFDF6;
          border: 2.5px solid #1C202B;
          border-radius: 10px;
          padding: 28px 30px;
        }
        .xp-report-title {
          font-size: 28px;
          letter-spacing: 0.6px;
          margin: 0 0 14px;
          color: #1C202B;
        }
        .xp-report-intro {
          font-size: 16px;
          font-weight: 600;
          line-height: 1.65;
          color: #1C202B;
          max-width: 72ch;
          margin: 0 0 26px;
          padding-bottom: 22px;
          border-bottom: 2px dashed rgba(28, 32, 43, 0.15);
        }
        .xp-report-sections { display: flex; flex-direction: column; gap: 28px; }
        .xp-report-section h5 {
          font-family: 'Open Sans', sans-serif;
          font-size: 13px;
          font-weight: 800;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: #1C202B;
          margin: 0 0 10px;
        }
        .xp-report-section p { font-size: 15px; line-height: 1.7; white-space: pre-line; margin: 0; max-width: 70ch; }
        .xp-report-section ul {
          list-style: none;
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 14px 36px;
        }
        .xp-report-section li {
          font-size: 14.5px;
          line-height: 1.65;
          color: var(--color-body);
          padding-left: 16px;
          border-left: 1px solid rgba(28, 32, 43, 0.2);
        }
        .xp-report-section li strong { color: #1C202B; }

        /* ── Lightbox ── */
        .xp-lightbox {
          position: fixed;
          inset: 0;
          z-index: 99999;
          background: rgba(15, 18, 24, 0.88);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          cursor: zoom-out;
          animation: xpFade 180ms ease-out;
        }
        @keyframes xpFade { from { opacity: 0; } to { opacity: 1; } }
        .xp-lightbox-panel { position: relative; max-width: 1100px; width: 100%; cursor: default; outline: none; }
        .xp-lightbox-panel img {
          display: block;
          max-width: 100%;
          max-height: 86vh;
          margin: 0 auto;
          object-fit: contain;
          background: #FFFFFF;
          border: 4px solid #1C202B;
          box-shadow: 10px 10px 0 0 #000;
          border-radius: 4px;
        }
        .xp-lightbox-close {
          position: absolute;
          top: -18px;
          right: -10px;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: var(--brand);
          color: #FFFFFF;
          border: 3px solid #1C202B;
          box-shadow: 3px 3px 0 0 #1C202B;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        /* ── Responsive ── */
        @media (max-width: 1023px) {
          .xp-entry { grid-template-columns: 1fr; gap: 18px; }
          .xp-rail {
            position: relative;
            top: 0;
            flex-direction: row;
            flex-wrap: wrap;
            align-items: center;
            gap: 10px 16px;
          }
          .xp-rail .xp-logo-tile { margin-top: 0; padding: 8px 10px; }
          .xp-rail .xp-logo-tile img { height: 32px; }
          .xp-card-grid { grid-template-columns: 1fr; gap: 24px; }
        }
        @media (max-width: 767px) {
          .xp-header { grid-template-columns: 1fr; gap: 16px; margin-bottom: 44px; }
          .xp-timeline { gap: 44px; }
          .xp-timeline::before { left: 9px; }
          .xp-rail { padding-left: 34px; }
          .xp-node { width: 21px; height: 21px; }
          .xp-period { font-size: 22px; }
          .xp-card { padding: 24px 18px 20px; box-shadow: 5px 5px 0 0 #1C202B; border-width: 3px; }
          .xp-impact { flex-direction: column; align-items: flex-start; gap: 6px; }
          .xp-built-list, .xp-report-section ul { grid-template-columns: 1fr; }
          .xp-report-inner { padding: 20px 16px; }
          .xp-actions { flex-direction: column; align-items: stretch; }
          .xp-btn-link { justify-content: flex-start; }
        }
      `}</style>
    </section>
  );
}
