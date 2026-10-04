"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useDialog } from "@/lib/useDialog";
import { CountUp, EASE_OUT, Reveal, Stagger, StaggerItem, TetrisText } from "@/components/motion";

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
  highlights: string[];
  /** Headline outcome, quoted from the report below */
  impact: Impact;
  /** Which report section lists the engineering work */
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
/** Accent tints that hold contrast on the dark ground */
const ACCENT_TEXT: Record<string, string> = {
  emedlogix: "#D29BF5",
  microsoft: "#7FE1F2",
};

/** "Title: body" → [title, body] */
function splitBullet(bullet: string): [string | null, string] {
  const i = bullet.indexOf(":");
  return i === -1 ? [null, bullet] : [bullet.slice(0, i), bullet.slice(i + 1).trim()];
}

function parseImpact(value: string) {
  const m = value.match(/^(\D*)(\d+)(\D*)$/);
  return m ? { prefix: m[1], num: Number(m[2]), suffix: m[3] } : null;
}

function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

function Chapter({ r, onWorkflow }: { r: Role; onWorkflow: (src: string, alt: string) => void }) {
  const chapterRef = useRef<HTMLElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  // Rail fills as the story is read
  const { scrollYProgress: storyProgress } = useScroll({ target: storyRef, offset: ["start 72%", "end 72%"] });
  const fill = useSpring(storyProgress, { stiffness: 140, damping: 26, restDelta: 0.001 });
  const headTop = useTransform(fill, (v) => `${v * 100}%`);

  // Giant outlined company name drifts across behind the chapter
  const { scrollYProgress: chapterProgress } = useScroll({ target: chapterRef, offset: ["start end", "end start"] });
  const bandX = useTransform(chapterProgress, [0, 1], ["6%", "-42%"]);

  const builtSection = r.fullReportSections.find((s) => s.title === r.builtSection);
  const built = Array.isArray(builtSection?.content) ? builtSection.content.map(splitBullet) : [];
  const prose = r.fullReportSections.filter((s) => !Array.isArray(s.content));
  const context = prose[0];
  const outcome = prose.length > 1 ? prose[prose.length - 1] : null;
  const impact = parseImpact(r.impact.value);
  const reportId = `${r.id}-report`;

  return (
    <article
      ref={chapterRef}
      id={r.id}
      className="xs-chapter"
      aria-labelledby={`${r.id}-role`}
      style={{ ["--accent" as string]: r.accent, ["--accent-text" as string]: ACCENT_TEXT[r.id] ?? r.accent }}
    >
      <motion.div className="xs-band" style={{ x: bandX }} aria-hidden="true">
        {r.company}&nbsp;&nbsp;{r.company}
      </motion.div>

      {/* ── Pinned identity ── */}
      <div className="xs-pin-col">
        <div className="xs-pin">
          <Reveal kind="left" as="p" className="xs-when">
            <span className="xs-node" aria-hidden="true" />
            {r.period}
            <span className="xs-sep" aria-hidden="true">/</span>
            <span className="xs-loc">{r.location}</span>
          </Reveal>
          <Reveal kind="drop" delay={0.1} as="span" className="xs-type">{r.type}</Reveal>

          <TetrisText as="h3" id={`${r.id}-role`} className="xs-role" text={r.role} delay={0.15} />

          <Reveal kind="up" delay={0.35} className="xs-company">
            <span className="xs-logo">
              <img src={r.logo} alt={`${r.company} logo`} width={r.logoWidth} height={44} loading="lazy" decoding="async" />
            </span>
            <span className="xs-at">@ {r.company}</span>
          </Reveal>

          <div className="xs-impact">
            {impact ? (
              <CountUp className="xs-impact-num" value={impact.num} prefix={impact.prefix} suffix={impact.suffix} />
            ) : (
              <span className="xs-impact-num">{r.impact.value}</span>
            )}
            <Reveal kind="blur" delay={0.3} as="p" className="xs-impact-label">{r.impact.label}</Reveal>
          </div>

          <Stagger as="ul" className="xs-hl" gap={0.07} delay={0.2}>
            {r.highlights.map((hl) => (
              <StaggerItem as="li" key={hl}>{hl}</StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>

      {/* ── The story, read top to bottom ── */}
      <div ref={storyRef} className="xs-story">
        <div className="xs-rail" aria-hidden="true">
          <motion.div className="xs-rail-fill" style={{ scaleY: fill }} />
          <motion.span className="xs-rail-head" style={{ top: headTop }} />
        </div>

        <Reveal className="xs-step">
          <h4 className="xs-step-title">The brief</h4>
          <p className="xs-brief">{r.description}</p>
        </Reveal>

        {built.length > 0 && (
          <div className="xs-step">
            <Reveal><h4 className="xs-step-title">What I built</h4></Reveal>
            <Stagger as="ol" className="xs-built" gap={0.11} amount={0.08}>
              {built.map(([title, body]) => (
                <StaggerItem as="li" kind="right" key={body} className="xs-built-item">
                  <span className="xs-built-block" aria-hidden="true" />
                  <div>
                    {title && <h5>{title}</h5>}
                    <p>{body}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        )}

        <div className="xs-step">
          <Reveal><h4 className="xs-step-title">Stack</h4></Reveal>
          <Stagger as="ul" className="xs-stack" gap={0.045}>
            {r.skills.map((s) => (
              <StaggerItem as="li" kind="pop" key={s}>{s}</StaggerItem>
            ))}
          </Stagger>
        </div>

        {outcome && (
          <Reveal className="xs-step">
            <h4 className="xs-step-title">Outcome</h4>
            <p className="xs-outcome">{outcome.content as string}</p>
          </Reveal>
        )}

        <Reveal className="xs-actions">
          <button
            type="button"
            className="xs-btn xs-btn-ghost"
            aria-expanded={open}
            aria-controls={reportId}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "Hide full report" : "Read the full report"}
            <motion.svg animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3, ease: EASE_OUT }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m6 9 6 6 6-6" />
            </motion.svg>
          </button>
          {r.workflowImage && (
            <button
              type="button"
              className="xs-btn xs-btn-ghost"
              onClick={() => onWorkflow(r.workflowImage!, "AI Nose Environmental Odor Detection System Workflow")}
            >
              See Internship Workflow
            </button>
          )}
          <a href={r.linkUrl} target="_blank" rel="noopener noreferrer" className="xs-btn xs-btn-solid">
            {r.linkText} <Arrow />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </Reveal>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              id={reportId}
              className="xs-report"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.55, ease: EASE_OUT }}
            >
              <div className="xs-report-inner">
                <h5 className="xs-report-title">{r.modalTitle}</h5>
                <p>{r.introduction}</p>
                {context && (
                  <>
                    <h6>{context.title}</h6>
                    <p>{context.content as string}</p>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </article>
  );
}

export default function ExperienceSection() {
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);
  const closeLightbox = () => setLightbox(null);
  const lightboxRef = useDialog<HTMLDivElement>(lightbox !== null, closeLightbox);

  return (
    <section id="experience" className="xs-section" aria-labelledby="experience-title">
      <header className="xs-header">
        <TetrisText as="h2" id="experience-title" className="xs-title" text="Real Work, Real Impact." />
        <Reveal kind="up" delay={0.5} as="p" className="xs-lead">
          Every role I&apos;ve taken has been about building something
          that genuinely works for real people — not just demos.
        </Reveal>
      </header>

      {ROLES.map((r) => (
        <Chapter key={r.id} r={r} onWorkflow={(src, alt) => setLightbox({ src, alt })} />
      ))}

      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="xs-lightbox"
            onClick={closeLightbox}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              ref={lightboxRef}
              className="xs-lightbox-panel"
              role="dialog"
              aria-modal="true"
              aria-label={lightbox.alt}
              tabIndex={-1}
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.94, y: 20 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
            >
              <img src={lightbox.src} alt={lightbox.alt} />
              <button type="button" className="xs-lightbox-close" onClick={closeLightbox} aria-label="Close workflow diagram">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .xs-section {
          position: relative;
          overflow: clip;
          background: #0D1016;
          color: #FFFFFF;
          padding: 140px 40px 120px;
          isolation: isolate;
        }

        /* ── Header ── */
        .xs-header {
          max-width: 1240px;
          margin: 0 auto 24px;
          display: grid;
          grid-template-columns: minmax(0, 1.35fr) minmax(0, 1fr);
          gap: 48px;
          align-items: end;
        }
        .xs-title {
          font-size: clamp(54px, 8vw, 124px);
          line-height: 0.9;
          letter-spacing: 1px;
          color: #FFFFFF;
          margin: 0;
          transform: skewX(-6deg);
          transform-origin: left bottom;
          text-shadow: 5px 5px 0 var(--brand);
        }
        .xs-lead { font-size: 18px; line-height: 1.6; color: #B7C4ED; max-width: 42ch; margin: 0 0 10px; }

        /* ── Chapter ── */
        .xs-chapter {
          position: relative;
          max-width: 1240px;
          margin: 0 auto;
          padding: 120px 0 110px;
          display: grid;
          grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
          gap: 80px;
          scroll-margin-top: var(--nav-h);
        }
        .xs-chapter + .xs-chapter { border-top: 2px dashed #232838; }
        .xs-band {
          position: absolute;
          top: 34px;
          left: 0;
          z-index: -1;
          white-space: nowrap;
          font-family: 'Bangers', cursive;
          font-size: clamp(150px, 22vw, 340px);
          line-height: 1;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: transparent;
          -webkit-text-stroke: 2px rgba(255, 255, 255, 0.065);
          pointer-events: none;
          user-select: none;
        }

        .xs-pin { position: sticky; top: calc(var(--nav-h) + 44px); }
        .xs-when {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 10px;
          margin: 0;
          font-family: 'Bangers', cursive;
          font-size: 24px;
          letter-spacing: 0.6px;
          color: var(--accent-text);
        }
        .xs-node { width: 16px; height: 16px; background: var(--accent); flex-shrink: 0; }
        .xs-sep { color: #4A5468; }
        .xs-loc { color: #94A3CC; }
        .xs-type {
          display: inline-block;
          margin: 14px 0 20px;
          background: #FFFFFF;
          color: #0D1016;
          padding: 4px 10px;
          font: 800 11px 'Open Sans', sans-serif;
          letter-spacing: 1px;
          text-transform: uppercase;
          border-radius: 3px;
        }
        .xs-role {
          font-size: clamp(40px, 4.6vw, 68px);
          line-height: 0.95;
          letter-spacing: 0.5px;
          color: #FFFFFF;
          margin: 0 0 22px;
        }
        .xs-company { display: flex; align-items: center; flex-wrap: wrap; gap: 16px; }
        .xs-logo {
          display: inline-flex;
          background: #FFFFFF;
          border-radius: 8px;
          padding: 8px 12px;
          box-shadow: 4px 4px 0 0 var(--accent);
        }
        .xs-logo img { display: block; height: 32px; width: auto; max-width: 170px; object-fit: contain; }
        .xs-at { font-family: 'Bangers', cursive; font-size: 26px; letter-spacing: 0.6px; color: var(--accent-text); }

        .xs-impact { margin-top: 40px; padding-top: 30px; border-top: 2px dashed #2A3040; }
        .xs-impact-num {
          display: block;
          font-family: 'Bangers', cursive;
          font-size: clamp(100px, 10.5vw, 168px);
          line-height: 0.85;
          letter-spacing: 1px;
          color: #FFFFFF;
          text-shadow: 6px 6px 0 var(--accent);
          font-variant-numeric: tabular-nums;
        }
        .xs-impact-label { margin: 14px 0 0; max-width: 30ch; font-size: 16px; font-weight: 600; line-height: 1.5; color: #C8D4FF; }

        .xs-hl { list-style: none; margin: 34px 0 0; display: grid; gap: 11px; }
        .xs-hl li {
          position: relative;
          padding-left: 22px;
          font-size: 14px;
          font-weight: 700;
          line-height: 1.4;
          color: #DFE7FF;
        }
        .xs-hl li::before {
          content: "";
          position: absolute;
          left: 0;
          top: 5px;
          width: 9px;
          height: 9px;
          background: var(--accent);
        }

        /* ── Story ── */
        .xs-story { position: relative; padding-left: 60px; display: flex; flex-direction: column; gap: 64px; }
        .xs-rail { position: absolute; left: 0; top: 10px; bottom: 10px; width: 3px; background: #232838; }
        .xs-rail-fill { position: absolute; inset: 0; background: var(--accent); transform-origin: 50% 0%; }
        .xs-rail-head {
          position: absolute;
          left: 50%;
          width: 17px;
          height: 17px;
          margin: -8px 0 0 -8.5px;
          background: var(--accent);
          border: 3px solid #0D1016;
          box-shadow: 0 0 0 2px var(--accent);
        }
        .xs-step-title {
          font-size: 32px;
          letter-spacing: 1px;
          color: #FFFFFF;
          margin: 0 0 20px;
        }
        .xs-brief { margin: 0; max-width: 50ch; font-size: clamp(19px, 1.7vw, 23px); line-height: 1.55; color: #EEF2FF; }

        .xs-built { list-style: none; border-top: 1px dashed #2A3040; }
        .xs-built-item {
          display: grid;
          grid-template-columns: 14px minmax(0, 1fr);
          gap: 20px;
          padding: 22px 0;
          border-bottom: 1px dashed #2A3040;
        }
        .xs-built-block { width: 14px; height: 14px; margin-top: 5px; background: var(--accent); }
        .xs-built-item h5 {
          font-family: 'Open Sans', sans-serif;
          font-size: 18px;
          font-weight: 800;
          letter-spacing: -0.2px;
          line-height: 1.3;
          text-transform: none;
          color: #FFFFFF;
          margin: 0 0 6px;
        }
        .xs-built-item p { margin: 0; max-width: 62ch; font-size: 15.5px; line-height: 1.65; color: #A9B4D0; }

        .xs-stack { list-style: none; display: flex; flex-wrap: wrap; gap: 10px; }
        .xs-stack li {
          background: #141821;
          color: #DFE7FF;
          border: 1.5px solid #333949;
          padding: 7px 13px;
          border-radius: 4px;
          font-size: 13px;
          font-weight: 700;
          transition: background 180ms, color 180ms, border-color 180ms;
        }
        .xs-stack li:hover { background: var(--accent); border-color: var(--accent); color: #0D1016; }

        .xs-outcome { margin: 0; max-width: 64ch; font-size: 16px; line-height: 1.75; color: #C8D4FF; white-space: pre-line; }

        .xs-actions { display: flex; flex-wrap: wrap; gap: 14px; align-items: center; }
        .xs-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          min-height: 46px;
          padding: 10px 20px;
          border-radius: 6px;
          font: 800 13px 'Open Sans', sans-serif;
          letter-spacing: 0.6px;
          text-transform: uppercase;
          text-decoration: none;
          cursor: pointer;
          transition: transform 140ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 140ms cubic-bezier(0.16, 1, 0.3, 1), background 160ms, color 160ms;
        }
        .xs-btn-solid { background: #FFFFFF; color: #0D1016; border: 2px solid #FFFFFF; box-shadow: 4px 4px 0 0 var(--accent); }
        .xs-btn-solid:hover { color: #0D1016; transform: translate(-2px, -2px); box-shadow: 6px 6px 0 0 var(--accent); }
        .xs-btn-ghost { background: transparent; color: #FFFFFF; border: 2px solid #4A5468; }
        .xs-btn-ghost:hover { border-color: #FFFFFF; }
        .xs-btn:active { transform: translate(2px, 2px); box-shadow: none; }

        .xs-report { overflow: hidden; margin-top: -32px; }
        .xs-report-inner {
          background: #121620;
          border: 1.5px solid #2A3040;
          border-radius: 10px;
          padding: 28px 30px;
        }
        .xs-report-title { font-size: 26px; letter-spacing: 0.6px; color: #FFFFFF; margin: 0 0 14px; }
        .xs-report-inner h6 {
          font: 800 13px 'Open Sans', sans-serif;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: #FFFFFF;
          margin: 24px 0 8px;
        }
        .xs-report-inner p { margin: 0; max-width: 70ch; font-size: 15.5px; line-height: 1.7; color: #B7C4ED; white-space: pre-line; }

        /* ── Lightbox ── */
        .xs-lightbox {
          position: fixed;
          inset: 0;
          z-index: 99999;
          background: rgba(9, 11, 15, 0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          cursor: zoom-out;
        }
        .xs-lightbox-panel { position: relative; max-width: 1100px; width: 100%; cursor: default; outline: none; }
        .xs-lightbox-panel img {
          display: block;
          max-width: 100%;
          max-height: 86vh;
          margin: 0 auto;
          object-fit: contain;
          background: #FFFFFF;
          border: 4px solid #1C202B;
          border-radius: 4px;
        }
        .xs-lightbox-close {
          position: absolute;
          top: -18px;
          right: -10px;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: var(--brand);
          color: #FFFFFF;
          border: 3px solid #1C202B;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        /* ── Responsive ── */
        @media (max-width: 1023px) {
          .xs-section { padding: 112px 32px 96px; }
          .xs-chapter { grid-template-columns: 1fr; gap: 48px; padding: 88px 0 80px; }
          .xs-pin { position: relative; top: 0; }
          .xs-band { font-size: 38vw; top: 24px; }
        }
        @media (max-width: 767px) {
          .xs-section { padding: 96px 20px 80px; }
          .xs-header { grid-template-columns: 1fr; gap: 20px; }
          .xs-title { text-shadow: 3px 3px 0 var(--brand); }
          .xs-chapter { padding: 72px 0 64px; gap: 40px; }
          .xs-impact-num { font-size: clamp(84px, 26vw, 120px); text-shadow: 4px 4px 0 var(--accent); }
          .xs-story { padding-left: 30px; gap: 52px; }
          .xs-step-title { font-size: 28px; }
          .xs-built-item { gap: 14px; }
          .xs-actions { flex-direction: column; align-items: stretch; }
          .xs-report-inner { padding: 20px 16px; }
        }
      `}</style>
    </section>
  );
}
