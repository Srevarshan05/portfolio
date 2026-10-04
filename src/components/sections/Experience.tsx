"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { useDialog } from "@/lib/useDialog";
import { CountUp, EASE_OUT, Reveal, Stagger, StaggerItem } from "@/components/motion";

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
/** Per-role banner colour and the pixel scene drawn for each contribution */
const LOOK: Record<string, { banner: [string, string]; scenes: string[]; tag: string; headline: string }> = {
  emedlogix: {
    banner: ["#0A5FB4", "#1690E8"],
    scenes: ["emed-1", "emed-2", "emed-3", "emed-4", "emed-5", "emed-6"],
    tag: "Healthcare SaaS · Production",
    headline: "less manual data entry.",
  },
  microsoft: {
    banner: ["#0B7E62", "#16A97F"],
    scenes: ["nose-1", "nose-2", "nose-3", "nose-4", "nose-5"],
    tag: "IoT · Machine Learning",
    headline: "classification accuracy.",
  },
};
const SQUARES = ["#1E88E5", "#F2A33A", "#E4572E"];

/** "Title: body" → [title, body] */
function splitBullet(bullet: string): [string | null, string] {
  const i = bullet.indexOf(":");
  return i === -1 ? [null, bullet] : [bullet.slice(0, i), bullet.slice(i + 1).trim()];
}

function parseImpact(value: string) {
  const m = value.match(/^(\D*)(\d+)(\D*)$/);
  return m ? { prefix: m[1], num: Number(m[2]), suffix: m[3] } : null;
}

function upperFirst(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function ArrowUpRight() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" aria-hidden="true">
      <path d="M7 17 17 7M9 7h8v8" />
    </svg>
  );
}

function Squares() {
  return (
    <span className="px-squares" aria-hidden="true">
      {SQUARES.map((c) => <i key={c} style={{ background: c }} />)}
    </span>
  );
}

function RoleBlock({ r, index, onWorkflow }: { r: Role; index: number; onWorkflow: (src: string, alt: string) => void }) {
  const [open, setOpen] = useState(false);
  const look = LOOK[r.id];
  const builtSection = r.fullReportSections.find((s) => s.title === r.builtSection);
  const built = Array.isArray(builtSection?.content) ? builtSection.content.map(splitBullet) : [];
  const prose = r.fullReportSections.filter((s) => !Array.isArray(s.content));
  const impact = parseImpact(r.impact.value);
  const reportId = `${r.id}-report`;
  const [typeLead, ...typeRest] = r.type.split(" ");

  return (
    <article id={r.id} className="px-role" aria-labelledby={`${r.id}-role`}>
      {/* ── Header row ── */}
      <div className="px-role-head">
        <Reveal kind="up" className="px-role-title">
          <p className="px-mono px-index">
            {String(index + 1).padStart(2, "0")} / {r.company}
          </p>
          <h3 id={`${r.id}-role`} className="px-h3">{r.role}</h3>
        </Reveal>
        <Reveal kind="up" delay={0.12} as="p" className="px-role-desc">{r.description}</Reveal>
      </div>

      {/* ── Banner ── */}
      {/* The observer sits on an unclipped wrapper: a fully clipped element never reports as in view */}
      <motion.div initial="hidden" whileInView="shown" viewport={{ once: true, amount: 0.3 }}>
      <motion.div
        className="px-banner-wrap"
        variants={{ hidden: { clipPath: "inset(0 100% 0 0)" }, shown: { clipPath: "inset(0 0% 0 0)" } }}
        transition={{ duration: 0.9, ease: (t: number) => Math.ceil(t * 12) / 12 }}
      >
        <div
          className="px-banner px-notch"
          style={{ background: `linear-gradient(135deg, ${look.banner[0]} 0%, ${look.banner[1]} 100%)`, ["--banner-ink" as string]: look.banner[0] }}
        >
          <img className="px-banner-clouds px-banner-clouds-a" src="/pixel/banner-clouds.png" alt="" aria-hidden="true" width={800} height={300} />
          <img className="px-banner-clouds px-banner-clouds-b" src="/pixel/banner-clouds.png" alt="" aria-hidden="true" width={800} height={300} />

          <div className="px-banner-main">
            <p className="px-banner-headline">
              <span className="px-pill">
                {impact ? <CountUp value={impact.num} prefix={impact.prefix} suffix={impact.suffix} /> : r.impact.value}
              </span>{" "}
              {look.headline}
            </p>
            <p className="px-mono px-banner-meta">
              <Squares />
              {r.period} · {r.location}
            </p>
            <span className="px-chip">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" />
              </svg>
              <b>{typeLead}</b> {typeRest.join(" ")}
              <span className="px-chip-sep" aria-hidden="true">·</span>
              {look.tag}
            </span>
          </div>

          <div className="px-banner-side">
            <p>{upperFirst(r.impact.label)}.</p>
            <a className="px-mono px-banner-link" href={r.linkUrl} target="_blank" rel="noopener noreferrer">
              {r.linkText} <ArrowUpRight />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>
        </div>
      </motion.div>
      </motion.div>

      {/* ── What I built: one pixel scene per contribution ── */}
      <Stagger as="ol" className="px-cards" gap={0.09} amount={0.1}>
        {built.map(([title, body], i) => (
          <StaggerItem as="li" kind="tilt" key={body} className="px-card">
            <div className="px-card-art px-notch-sm">
              <img src={`/pixel/${look.scenes[i % look.scenes.length]}.webp`} alt="" aria-hidden="true" width={600} height={300} loading="lazy" decoding="async" />
            </div>
            <div className="px-card-body">
              <p className="px-mono px-card-label">
                <i style={{ background: SQUARES[i % SQUARES.length] }} aria-hidden="true" />
                Build {String(i + 1).padStart(2, "0")}
              </p>
              {title && <h4 className="px-card-title">{title}</h4>}
              <p className="px-card-text">{body}</p>
            </div>
          </StaggerItem>
        ))}
      </Stagger>

      {/* ── Highlights + stack ── */}
      <div className="px-meta-grid">
        <Reveal kind="up" className="px-meta">
          <p className="px-mono px-meta-label">Key highlights</p>
          <ul className="px-highlights">
            {r.highlights.map((hl) => <li key={hl}>{hl}</li>)}
          </ul>
        </Reveal>
        <Reveal kind="up" delay={0.1} className="px-meta">
          <p className="px-mono px-meta-label">Stack</p>
          <Stagger as="ul" className="px-stack" gap={0.035}>
            {r.skills.map((s) => <StaggerItem as="li" kind="pop" key={s}>{s}</StaggerItem>)}
          </Stagger>
        </Reveal>
      </div>

      <div className="px-actions">
        <button type="button" className="px-mono px-action" aria-expanded={open} aria-controls={reportId} onClick={() => setOpen((v) => !v)}>
          {open ? "Hide the full report" : "Read the full report"}
          <motion.svg animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3, ease: EASE_OUT }} width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" aria-hidden="true">
            <path d="m6 9 6 6 6-6" />
          </motion.svg>
        </button>
        {r.workflowImage && (
          <button
            type="button"
            className="px-mono px-action"
            onClick={() => onWorkflow(r.workflowImage!, "AI Nose Environmental Odor Detection System Workflow")}
          >
            See internship workflow <ArrowUpRight />
          </button>
        )}
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={reportId}
            className="px-report"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.55, ease: EASE_OUT }}
          >
            <div className="px-report-inner">
              <h4 className="px-report-title">{r.modalTitle}</h4>
              <p>{r.introduction}</p>
              {prose.map((section) => (
                <section key={section.title}>
                  <h5 className="px-mono">{section.title}</h5>
                  <p>{section.content as string}</p>
                </section>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}

export default function ExperienceSection() {
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);
  const closeLightbox = () => setLightbox(null);
  const lightboxRef = useDialog<HTMLDivElement>(lightbox !== null, closeLightbox);

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const skyY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

  return (
    <section id="experience" className="px-section" aria-labelledby="experience-title">
      <span className="px-guide px-guide-l" aria-hidden="true" />
      <span className="px-guide px-guide-r" aria-hidden="true" />

      {/* ── Sky hero ── */}
      <div ref={heroRef} className="px-hero">
        <motion.div className="px-sky" style={{ y: skyY }} aria-hidden="true" />
        <div className="px-hero-copy">
          <Reveal kind="up" as="p" className="px-mono px-kicker">Work experience · 02 roles</Reveal>
          <Reveal kind="up" delay={0.08}>
            <h2 id="experience-title" className="px-h2">Real work, real impact.</h2>
          </Reveal>
          <Reveal kind="up" delay={0.16} as="p" className="px-lead">
            Every role I&apos;ve taken has been about building something
            that genuinely works for real people — not just demos.
          </Reveal>
          <Reveal kind="blur" delay={0.3} as="p" className="px-mono px-hero-note">
            Healthcare SaaS · IoT + machine learning · Remote
          </Reveal>
        </div>
      </div>

      <div className="px-roles">
        {ROLES.map((r, i) => (
          <RoleBlock key={r.id} r={r} index={i} onWorkflow={(src, alt) => setLightbox({ src, alt })} />
        ))}
      </div>

      <AnimatePresence>
        {lightbox && (
          <motion.div className="px-lightbox" onClick={closeLightbox} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div
              ref={lightboxRef}
              className="px-lightbox-panel"
              role="dialog"
              aria-modal="true"
              aria-label={lightbox.alt}
              tabIndex={-1}
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.92, y: 24 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 16 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
            >
              <img src={lightbox.src} alt={lightbox.alt} />
              <button type="button" className="px-lightbox-close" onClick={closeLightbox} aria-label="Close workflow diagram">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="square" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .px-section {
          --px-bg: #FAF9F7;
          --px-ink: #141414;
          --px-body: #4D4D4D;
          --px-muted: #6E6E6E;
          --px-line: #E6E3DD;
          position: relative;
          overflow: clip;
          isolation: isolate;
          background: var(--px-bg);
          color: var(--px-ink);
          font-family: 'Geist', 'Open Sans', system-ui, sans-serif;
          padding: 0 0 120px;
        }
        .px-mono { font-family: 'Geist Mono', ui-monospace, SFMono-Regular, Menlo, monospace; text-transform: uppercase; }

        /* thin guide rules framing the content column */
        .px-guide { position: absolute; top: 0; bottom: 0; width: 1px; background: var(--px-line); z-index: 1; pointer-events: none; }
        .px-guide-l { left: max(16px, calc(50% - 650px)); }
        .px-guide-r { right: max(16px, calc(50% - 650px)); }

        /* ── Sky hero ── */
        .px-hero { position: relative; overflow: hidden; padding: 250px 24px 120px; text-align: center; }
        .px-hero::after {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 42%;
          z-index: -1;
          background: linear-gradient(to bottom, rgba(250, 249, 247, 0), var(--px-bg) 85%);
          pointer-events: none;
        }
        .px-sky {
          position: absolute;
          inset: -6% 0 0;
          z-index: -1;
          background: url('/pixel/sky.webp') center top / cover no-repeat;
          image-rendering: pixelated;
          animation: pxDrift 26s ease-in-out infinite alternate;
        }
        @keyframes pxDrift { from { background-position: 48% top; } to { background-position: 52% top; } }
        .px-hero-copy { position: relative; z-index: 2; max-width: 860px; margin: 0 auto; }
        .px-kicker { margin: 0 0 18px; font-size: 13px; font-weight: 500; letter-spacing: 0.16em; color: #15803D; }
        .px-h2 {
          font-family: inherit;
          font-size: clamp(44px, 6.4vw, 88px);
          font-weight: 600;
          line-height: 1.02;
          letter-spacing: -0.04em;
          text-transform: none;
          color: var(--px-ink);
          margin: 0 0 22px;
          text-wrap: balance;
        }
        .px-lead { margin: 0 auto; max-width: 52ch; font-size: 18px; line-height: 1.6; color: var(--px-body); }
        .px-hero-note { margin: 44px 0 0; font-size: 12px; letter-spacing: 0.14em; color: var(--px-muted); }

        /* ── Roles ── */
        .px-roles { position: relative; z-index: 2; max-width: 1240px; margin: 0 auto; padding: 0 64px; }
        .px-role { padding-top: 64px; scroll-margin-top: var(--nav-h); }
        .px-role + .px-role { margin-top: 72px; padding-top: 96px; border-top: 1px solid var(--px-line); }

        .px-role-head {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
          gap: 48px;
          align-items: end;
          margin-bottom: 40px;
        }
        .px-index { margin: 0 0 10px; font-size: 13px; letter-spacing: 0.08em; color: #15803D; }
        .px-h3 {
          font-family: inherit;
          font-size: clamp(30px, 3.3vw, 44px);
          font-weight: 600;
          line-height: 1.08;
          letter-spacing: -0.03em;
          text-transform: none;
          color: var(--px-ink);
          margin: 0;
        }
        .px-role-desc {
          margin: 0;
          justify-self: end;
          max-width: 46ch;
          text-align: right;
          font-size: 16.5px;
          line-height: 1.6;
          color: var(--px-body);
        }

        /* Stepped pixel corners */
        .px-notch {
          clip-path: polygon(
            12px 0, calc(100% - 12px) 0, calc(100% - 12px) 6px, calc(100% - 6px) 6px, calc(100% - 6px) 12px, 100% 12px,
            100% calc(100% - 12px), calc(100% - 6px) calc(100% - 12px), calc(100% - 6px) calc(100% - 6px), calc(100% - 12px) calc(100% - 6px), calc(100% - 12px) 100%,
            12px 100%, 12px calc(100% - 6px), 6px calc(100% - 6px), 6px calc(100% - 12px), 0 calc(100% - 12px),
            0 12px, 6px 12px, 6px 6px, 12px 6px
          );
        }
        .px-notch-sm {
          clip-path: polygon(
            8px 0, calc(100% - 8px) 0, calc(100% - 8px) 4px, calc(100% - 4px) 4px, calc(100% - 4px) 8px, 100% 8px,
            100% calc(100% - 8px), calc(100% - 4px) calc(100% - 8px), calc(100% - 4px) calc(100% - 4px), calc(100% - 8px) calc(100% - 4px), calc(100% - 8px) 100%,
            8px 100%, 8px calc(100% - 4px), 4px calc(100% - 4px), 4px calc(100% - 8px), 0 calc(100% - 8px),
            0 8px, 4px 8px, 4px 4px, 8px 4px
          );
        }

        /* ── Banner ── */
        .px-banner {
          position: relative;
          overflow: hidden;
          display: grid;
          grid-template-columns: minmax(0, 1.25fr) minmax(0, 1fr);
          align-items: end;
          gap: 40px;
          padding: 64px 48px 46px;
          color: #FFFFFF;
          min-height: 300px;
        }
        .px-banner-clouds { position: absolute; image-rendering: pixelated; pointer-events: none; opacity: 0.16; height: auto; }
        .px-banner-clouds-a { width: 44%; right: -4%; top: -6%; animation: pxFloat 18s ease-in-out infinite alternate; }
        .px-banner-clouds-b { width: 30%; left: 44%; bottom: -14%; opacity: 0.12; animation: pxFloat 22s ease-in-out infinite alternate-reverse; }
        @keyframes pxFloat { from { transform: translateX(-12px); } to { transform: translateX(12px); } }

        .px-banner-main, .px-banner-side { position: relative; z-index: 1; }
        .px-banner-headline {
          margin: 0 0 26px;
          color: #FFFFFF;
          font-size: clamp(36px, 4.4vw, 60px);
          font-weight: 600;
          line-height: 1.08;
          letter-spacing: -0.035em;
          text-wrap: balance;
        }
        .px-pill {
          display: inline-block;
          background: #FFFFFF;
          color: var(--banner-ink, #0A5FB4);
          padding: 0 14px 4px;
          border-radius: 12px;
          font-variant-numeric: tabular-nums;
        }
        .px-banner-meta {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 14px;
          margin: 0 0 16px;
          font-size: 13px;
          letter-spacing: 0.18em;
          color: rgba(255, 255, 255, 0.92);
        }
        .px-squares { display: inline-flex; gap: 3px; padding: 3px; background: #FFFFFF; }
        .px-squares i { display: block; width: 9px; height: 9px; }
        .px-chip {
          display: inline-flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 8px;
          padding: 9px 14px;
          border: 1.5px solid rgba(255, 255, 255, 0.45);
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.08);
          font-family: 'Geist Mono', ui-monospace, monospace;
          font-size: 12.5px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.92);
        }
        .px-chip b { font-weight: 700; color: #FFFFFF; }
        .px-chip-sep { opacity: 0.6; }
        .px-banner-side { justify-self: end; max-width: 40ch; text-align: right; }
        .px-banner-side p { margin: 0 0 16px; font-size: 16px; line-height: 1.55; color: rgba(255, 255, 255, 0.95); }
        .px-banner-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.14em;
          color: #FFFFFF;
          text-decoration: none;
          border-bottom: 1.5px solid rgba(255, 255, 255, 0.5);
          padding-bottom: 3px;
          transition: border-color 160ms;
        }
        .px-banner-link:hover { color: #FFFFFF; border-color: #FFFFFF; }
        .px-banner-link:focus-visible { outline-color: #FFFFFF; }

        /* ── Cards ── */
        .px-cards {
          list-style: none;
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 24px;
          margin-top: 24px;
        }
        .px-card {
          display: flex;
          flex-direction: column;
          background: #FFFFFF;
          border: 1px solid var(--px-line);
          padding: 8px;
          transition: transform 260ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 260ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        .px-card:hover { transform: translateY(-4px); box-shadow: 0 14px 28px -18px rgba(20, 20, 20, 0.35); }
        .px-card-art { overflow: hidden; aspect-ratio: 2 / 1; background: #BFE5FC; }
        .px-card-art img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          image-rendering: pixelated;
          transition: transform 600ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        .px-card:hover .px-card-art img { transform: scale(1.06); }
        .px-card-body { padding: 22px 16px 18px; }
        .px-card-label {
          display: flex;
          align-items: center;
          gap: 9px;
          margin: 0 0 12px;
          font-size: 12.5px;
          letter-spacing: 0.12em;
          color: var(--px-muted);
        }
        .px-card-label i { display: block; width: 9px; height: 9px; }
        .px-card-title {
          font-family: inherit;
          font-size: 19px;
          font-weight: 600;
          line-height: 1.25;
          letter-spacing: -0.02em;
          text-transform: none;
          color: var(--px-ink);
          margin: 0 0 8px;
        }
        .px-card-text { margin: 0; font-size: 14.5px; line-height: 1.6; color: var(--px-body); }

        /* ── Highlights + stack ── */
        .px-meta-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1.4fr);
          gap: 24px;
          margin-top: 24px;
        }
        .px-meta { background: #FFFFFF; border: 1px solid var(--px-line); padding: 24px 26px; }
        .px-meta-label { margin: 0 0 14px; font-size: 12px; letter-spacing: 0.16em; color: #15803D; }
        .px-highlights { list-style: none; display: grid; gap: 10px; }
        .px-highlights li { position: relative; padding-left: 18px; font-size: 15px; font-weight: 500; line-height: 1.4; color: var(--px-ink); }
        .px-highlights li::before { content: ""; position: absolute; left: 0; top: 6px; width: 8px; height: 8px; background: #1E88E5; }
        .px-stack { list-style: none; display: flex; flex-wrap: wrap; gap: 8px; }
        .px-stack li {
          font-family: 'Geist Mono', ui-monospace, monospace;
          font-size: 12.5px;
          letter-spacing: 0.02em;
          color: var(--px-ink);
          background: var(--px-bg);
          border: 1px solid var(--px-line);
          padding: 6px 10px;
        }

        .px-actions { display: flex; flex-wrap: wrap; gap: 28px; margin-top: 28px; }
        .px-action {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          min-height: 44px;
          padding: 0;
          background: none;
          border: 0;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.14em;
          color: var(--px-ink);
          cursor: pointer;
          border-bottom: 1.5px solid transparent;
          transition: border-color 160ms;
        }
        .px-action:hover { border-bottom-color: var(--px-ink); }

        .px-report { overflow: hidden; }
        .px-report-inner { margin-top: 16px; background: #FFFFFF; border: 1px solid var(--px-line); padding: 30px 32px; }
        .px-report-title {
          font-family: inherit;
          font-size: 24px;
          font-weight: 600;
          letter-spacing: -0.02em;
          text-transform: none;
          color: var(--px-ink);
          margin: 0 0 14px;
        }
        .px-report-inner h5 { font-size: 12px; font-weight: 500; letter-spacing: 0.14em; color: #15803D; margin: 26px 0 8px; }
        .px-report-inner p { margin: 0; max-width: 72ch; font-size: 15.5px; line-height: 1.7; color: var(--px-body); white-space: pre-line; }

        /* ── Lightbox ── */
        .px-lightbox {
          position: fixed;
          inset: 0;
          z-index: 99999;
          background: rgba(20, 20, 20, 0.82);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          cursor: zoom-out;
        }
        .px-lightbox-panel { position: relative; max-width: 1100px; width: 100%; cursor: default; outline: none; }
        .px-lightbox-panel img { display: block; max-width: 100%; max-height: 86vh; margin: 0 auto; object-fit: contain; background: #FFFFFF; }
        .px-lightbox-close {
          position: absolute;
          top: -16px;
          right: -8px;
          width: 44px;
          height: 44px;
          display: grid;
          place-items: center;
          background: #FFFFFF;
          color: var(--px-ink);
          border: 1px solid var(--px-line);
          cursor: pointer;
        }

        /* ── Responsive ── */
        @media (max-width: 1023px) {
          .px-roles { padding: 0 40px; }
          .px-hero { padding: 200px 24px 96px; }
          .px-banner { grid-template-columns: 1fr; gap: 28px; padding: 52px 36px 40px; }
          .px-banner-side { justify-self: start; text-align: left; }
          .px-cards { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .px-meta-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 767px) {
          .px-section { padding-bottom: 88px; }
          .px-guide { display: none; }
          .px-roles { padding: 0 16px; }
          .px-hero { padding: 150px 16px 72px; }
          .px-sky { background-size: auto 100%; }
          .px-role-head { grid-template-columns: 1fr; gap: 16px; margin-bottom: 28px; }
          .px-role-desc { justify-self: start; text-align: left; }
          .px-banner { padding: 44px 24px 32px; min-height: 0; }
          .px-cards { grid-template-columns: 1fr; gap: 16px; }
          .px-meta { padding: 20px; }
          .px-report-inner { padding: 22px 18px; }
          .px-actions { gap: 8px 24px; }
        }
      `}</style>
    </section>
  );
}
