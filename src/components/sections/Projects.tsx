"use client";

import { useRef, useState } from "react";
import { useScrollReveal } from "@/lib/useScrollReveal";

const PROJECTS = [
  {
    id: "agrocare",
    accent: "#2BB04A",
    badgeText: "1ST PRIZE · SPECTRUM '25",
    isPinkCard: false,
    image: "/AgroCare-spectrum-award.jpeg",
    tetromino: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="#2BB04A">
        <rect x="0" y="0" width="8" height="8" stroke="#1C202B" strokeWidth="1.5" />
        <rect x="10" y="0" width="8" height="8" stroke="#1C202B" strokeWidth="1.5" />
        <rect x="20" y="0" width="8" height="8" stroke="#1C202B" strokeWidth="1.5" />
        <rect x="10" y="10" width="8" height="8" stroke="#1C202B" strokeWidth="1.5" />
      </svg>
    ),
    illustration: null,
    title: "AgroCare — Multimodal AI & IoT for Cotton Farming",
    description: "An award-winning precision farming platform combining a custom field probe, drone crop imagery, CNN disease detection, and LLM-guided recommendations.",
    features: [
      { icon: "🌱", text: "Custom pH, NPK & moisture probe" },
      { icon: "📡", text: "ESP32 + LoRa field telemetry" },
      { icon: "🚁", text: "Drone crop imaging + SLAM" },
      { icon: "🤖", text: "CNN disease detection + LLM advice" }
    ],
    btnText: "VIEW ON GITHUB",
    btnLink: "https://github.com/Srevarshan05/Agro-s-Care-IITM",
  },
  {
    id: "textlens",
    accent: "#2BB04A",
    badgeText: "LOCAL OCR FRAMEWORK",
    isPinkCard: false,
    image: "/TextLens-video-thumb.png",
    tetromino: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="#2BB04A">
        {/* S-block */}
        <rect x="10" y="0" width="8" height="8" stroke="#1C202B" strokeWidth="1.5" />
        <rect x="20" y="0" width="8" height="8" stroke="#1C202B" strokeWidth="1.5" />
        <rect x="0" y="10" width="8" height="8" stroke="#1C202B" strokeWidth="1.5" />
        <rect x="10" y="10" width="8" height="8" stroke="#1C202B" strokeWidth="1.5" />
      </svg>
    ),
    illustration: null,
    title: "TextLens — GPU-Accelerated VLM OCR Framework",
    description: "A Python framework that makes local document OCR simple to set up, reuse, and run across images and PDFs.",
    features: [
      { icon: "⚡", text: "Local image & PDF OCR" },
      { icon: "🖥️", text: "GPU-aware model setup" },
      { icon: "📦", text: "Batch processing & caching" },
      { icon: "🔌", text: "FastAPI OCR serving" }
    ],
    btnText: "VIEW ON GITHUB",
    btnLink: "https://github.com/Srevarshan05/textlens",
  },
  {
    id: "rag-pipeline",
    accent: "#E22D6D",
    badgeText: "RAG FROM SCRATCH",
    isPinkCard: false,
    image: "/RAG-Pipeline-front-card.png",
    illustration: (
      <svg width="100%" height="120" viewBox="0 0 260 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Document to answer RAG pipeline illustration">
        <rect x="12" y="35" width="44" height="54" rx="5" fill="#FFE5EE" stroke="#1C202B" strokeWidth="2.5" />
        <path d="M23 50H45M23 61H45M23 72H38" stroke="#E22D6D" strokeWidth="3" strokeLinecap="round" />
        <path d="M66 62H89" stroke="#1C202B" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M84 56L92 62L84 68" stroke="#1C202B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="118" cy="62" r="25" fill="#E8F4FD" stroke="#1C202B" strokeWidth="2.5" />
        <circle cx="109" cy="53" r="4" fill="#4D5BFF" />
        <circle cx="126" cy="51" r="4" fill="#8E2DE2" />
        <circle cx="119" cy="68" r="4" fill="#2BB04A" />
        <circle cx="134" cy="70" r="4" fill="#FFB020" />
        <path d="M150 62H173" stroke="#1C202B" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M168 56L176 62L168 68" stroke="#1C202B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <ellipse cx="205" cy="44" rx="31" ry="11" fill="#F4E8FD" stroke="#1C202B" strokeWidth="2.5" />
        <path d="M174 44V79C174 85 236 85 236 79V44" fill="#F4E8FD" stroke="#1C202B" strokeWidth="2.5" />
        <ellipse cx="205" cy="79" rx="31" ry="11" fill="#F4E8FD" stroke="#1C202B" strokeWidth="2.5" />
        <path d="M219 43C232 34 246 40 246 51C246 62 232 66 219 59" fill="#FFFFFF" stroke="#1C202B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="230" cy="50" r="2" fill="#E22D6D" />
      </svg>
    ),
    title: "RAG Pipeline From Scratch",
    description: "A fundamental document-grounded question-answering pipeline built hands-on to understand retrieval, embeddings, and context generation.",
    features: [
      { icon: "📥", text: "Multi-format document ingestion" },
      { icon: "✂️", text: "Chunking & preprocessing" },
      { icon: "🔎", text: "ChromaDB similarity retrieval" },
      { icon: "💬", text: "Groq-grounded answers" }
    ],
    btnText: "VIEW ON GITHUB",
    btnLink: "https://github.com/Srevarshan05/RAG-Pipeline-From-Scratch",
  },
  {
    id: "banana-weevil",
    accent: "var(--brand)",
    badgeText: "PATENTED AI",
    isPinkCard: true,
    image: "/photos/banana-weevil-setup.jpg",
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
    title: "Banana Weevil Detection project using Deep Learning",
    description: "A dual-mode acoustic sensing system that detects Odoiporous longicollis infestations in banana crops entirely offline.",
    features: [
      { icon: "⚡", text: "Offline Inference" },
      { icon: "🔊", text: "Acoustic dual-sensing" },
      { icon: "🔋", text: "Low-power Raspberry Pi" },
      { icon: "🏛️", text: "Government Patented" }
    ],
    btnText: "READ PATENT",
    btnLink: "https://drive.google.com/file/d/1aHz-L_QBa_YLxD9TSk-3CfKgHFpKw0RI/view?usp=sharing",
  },
  {
    id: "nutriminds",
    accent: "#2DC8E2",
    badgeText: "AI NUTRITION PLATFORM",
    isPinkCard: false,
    image: "/Nutriminds_Thumbnail.png",
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
    title: "NutriMinds AI",
    description: "An AI-powered nutrition intelligence platform analyzing medical reports and food labels via Vision-Language models and fine-tuned LLMs for personalized dietary analysis.",
    features: [
      { icon: "🔍", text: "VLM OCR & Reasoning" },
      { icon: "🤖", text: "Fine-tuned Mistral 7B" },
      { icon: "🍎", text: "Open Food Facts Data" },
      { icon: "🩺", text: "Clinical Nutrition Rules" }
    ],
    btnText: "VIEW ON GITHUB",
    btnLink: "https://github.com/srevarshan/NutriMinds",
  },
  {
    id: "acas-dhristi",
    accent: "#FFB020",
    badgeText: "PREDICTIVE GOVERNANCE",
    isPinkCard: false,
    image: "/ACAS_Thumbnail.png",
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
    title: "ACAS DHRISTI",
    description: "A predictive governance framework for UIDAI proactively forecasting stress at 173,225+ Tamil Nadu Aadhaar centers 7 days in advance.",
    features: [
      { icon: "🗺️", text: "173,225 centers mapped" },
      { icon: "🔮", text: "7-Day Stress Forecast" },
      { icon: "🤖", text: "n8n autonomous routing" },
      { icon: "🛡️", text: "CIDR Privacy Compliant" }
    ],
    btnText: "VIEW ON GITHUB",
    btnLink: "https://github.com/Srevarshan05/UIDAI-Acas",
  },
  {
    id: "xenia-crm",
    accent: "#8E2DE2",
    badgeText: "AI-POWERED CRM",
    isPinkCard: false,
    image: "/Xenia-thumbnai.png",
    tetromino: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="#8E2DE2">
        <rect x="0" y="0" width="8" height="8" stroke="#1C202B" strokeWidth="1.5" />
        <rect x="0" y="10" width="8" height="8" stroke="#1C202B" strokeWidth="1.5" />
        <rect x="10" y="0" width="8" height="8" stroke="#1C202B" strokeWidth="1.5" />
        <rect x="10" y="10" width="8" height="8" stroke="#1C202B" strokeWidth="1.5" />
      </svg>
    ),
    illustration: (
      <svg width="100%" height="90" viewBox="0 0 200 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="50" y="20" width="100" height="50" rx="4" fill="#F4E8FD" stroke="#1C202B" strokeWidth="2.5" />
        <circle cx="75" cy="45" r="12" fill="#8E2DE2" stroke="#1C202B" strokeWidth="2" />
        <line x1="95" y1="40" x2="135" y2="40" stroke="#1C202B" strokeWidth="2" strokeLinecap="round" />
        <line x1="95" y1="50" x2="125" y2="50" stroke="#1C202B" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: "Xenia CRM",
    description: "An enterprise retail CRM with automated AI voice outreach (ElevenLabs), Llama 3.3 campaign generation, and Gradient Boosting churn prediction.",
    features: [
      { icon: "📞", text: "AI Voice Campaigns" },
      { icon: "🤖", text: "Llama 3.3 Copywriting" },
      { icon: "🔮", text: "GBM Churn Classifier" },
      { icon: "📊", text: "Event Loop Simulator" }
    ],
    btnText: "LIVE DEMO",
    btnLink: "https://xenia-crm-frontend.vercel.app/",
  },
];

const PROJECT_ORDER = [
  "banana-weevil",
  "agrocare",
  "textlens",
  "nutriminds",
  "rag-pipeline",
  "acas-dhristi",
  "xenia-crm",
];

function WalkthroughPlayer({ embedUrl, youtubeUrl, title }: { embedUrl: string; youtubeUrl: string; title: string }) {
  return (
    <div className="walkthrough-player">
      <iframe
        src={embedUrl}
        title={`${title} walkthrough`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
      <a href={youtubeUrl} target="_blank" rel="noopener noreferrer">
        Watch on YouTube →
      </a>
    </div>
  );
}

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef as React.RefObject<HTMLElement>);
  
  const [activeProject, setActiveProject] = useState<typeof PROJECTS[0] | null>(null);
  const [isWorkflowOpen, setIsWorkflowOpen] = useState(false);
  const [isPinPromptOpen, setIsPinPromptOpen] = useState(false);
  const [pinTarget, setPinTarget] = useState<"project" | "workflow">("workflow");
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);

  const handleOpenWorkflow = () => {
    if (activeProject?.id !== "banana-weevil" || isUnlocked) {
      setIsWorkflowOpen(true);
    } else {
      setPinTarget("workflow");
      setPinInput("");
      setPinError(false);
      setIsPinPromptOpen(true);
    }
  };

  const handleOpenProject = (project: typeof PROJECTS[0]) => {
    if (project.id === "banana-weevil" && !isUnlocked) {
      setPinTarget("project");
      setPinInput("");
      setPinError(false);
      setIsPinPromptOpen(true);
      return;
    }
    setActiveProject(project);
  };

  const handlePinSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (pinInput.trim() === "1971") {
      setIsUnlocked(true);
      setIsPinPromptOpen(false);
      setPinError(false);
      if (pinTarget === "project") {
        const bananaProject = PROJECTS.find((project) => project.id === "banana-weevil");
        if (bananaProject) setActiveProject(bananaProject);
      } else {
        setIsWorkflowOpen(true);
      }
    } else {
      setPinError(true);
    }
  };

  return (
    <section id="projects" className="section section-white" ref={sectionRef} style={{ background: "#FFFFFF" }}>
      <div className="container section-content">

        {/* Header */}
        <div className="section-header section-header-center" style={{ maxWidth: "680px", margin: "0 auto 72px" }}>
          <h2 className="reveal stagger-2">What I&apos;ve Built</h2>
          <p className="leading reveal stagger-3" style={{ margin: "0 auto", color: "var(--color-body)", fontSize: "16px", lineHeight: "1.6" }}>
            Not stopping in the classroom — taking concepts from theory and engineering them into real-world deployed solutions.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="projects-grid">
          {PROJECTS.slice().sort((a, b) => PROJECT_ORDER.indexOf(a.id) - PROJECT_ORDER.indexOf(b.id)).map((p, i) => (
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
              <div aria-hidden="true" style={{ position: "absolute", top: "20px", right: "20px", zIndex: 5 }}>
                {p.tetromino}
              </div>

              {/* Card Header (Image or Illustration) */}
              <div className="project-card-header" style={{ backgroundColor: p.isPinkCard ? "#FFE5EE" : "#F4F6FF" }}>
                {p.image ? (
                  <img
                    src={p.image}
                    alt={p.title}
                    className="project-card-image"
                  />
                ) : (
                  <div className="project-card-illustration">
                    {p.illustration}
                  </div>
                )}
              </div>

              {/* Card Body Content */}
              <div className="project-card-body">
                <h3 className="project-card-title">{p.title}</h3>
                <p className="project-card-desc">{p.description}</p>
                
                {/* Dashed Separator */}
                <div className="project-card-separator" />

                {/* Action Button */}
                <button
                  onClick={() => handleOpenProject(p)}
                  className="project-card-btn"
                  style={{
                    ['--btn-shadow-color']: p.isPinkCard ? "var(--brand)" : "#B7C4ED"
                  } as React.CSSProperties}
                >
                  Read More →
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Project Details Modal */}
      {activeProject && (
        <div
          className="modal-backdrop"
          onClick={() => setActiveProject(null)}
        >
          <div
            className="project-modal-container"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="project-modal-header" style={{ borderBottomColor: activeProject.accent }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
                <h3 className="project-modal-title">{activeProject.title}</h3>
                <span className="project-modal-badge" style={{ backgroundColor: activeProject.accent, borderColor: "#1C202B" }}>
                  {activeProject.badgeText}
                </span>
              </div>
              <button
                className="project-modal-close-btn"
                onClick={() => setActiveProject(null)}
                aria-label="Close details"
              >
                ×
              </button>
            </div>

            {/* Modal Body */}
            <div className="project-modal-body">
              {activeProject.id === "agrocare" ? (
                /* AgroCare Details */
                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  <div className="modal-overview">
                    <p style={{ borderLeftColor: "#2BB04A" }}>
                      AgroCare is a field-to-decision precision agriculture platform for cotton farming. It combines real-time soil and environmental telemetry from a custom probe with drone-acquired crop imagery, then turns disease and field-condition signals into clear, farmer-ready recommendations.
                    </p>
                  </div>

                  <div className="modal-divider" />

                  <div className="modal-details-grid">
                    <div className="modal-grid-col" style={{ gap: "16px" }}>
                      <div className="modal-section-card">
                        <h4 className="modal-section-title" style={{ color: "#2BB04A" }}>
                          Custom Field Hardware
                        </h4>
                        <p className="modal-text">
                          A field-deployable ESP32 sensing probe captures the soil and microclimate conditions that affect crop health.
                        </p>
                        <ul className="modal-list">
                          <li><strong>Soil sensing:</strong> pH, nitrogen, phosphorus, potassium, and soil moisture.</li>
                          <li><strong>Environmental sensing:</strong> temperature and humidity for field context.</li>
                          <li><strong>Connectivity:</strong> LoRa-based long-range telemetry through an ESP32 node and gateway architecture.</li>
                        </ul>
                      </div>

                      <div className="modal-section-card">
                        <h4 className="modal-section-title" style={{ color: "#2DC8E2" }}>
                          Aerial Crop Intelligence
                        </h4>
                        <p className="modal-text">
                          A drone acquires crop and leaf imagery across the field, with SLAM-assisted navigation supporting positioning and movement. A trained CNN processes those images to identify cotton leaf disease signals.
                        </p>
                      </div>

                      <div className="modal-section-card">
                        <h4 className="modal-section-title" style={{ color: "#FFB020" }}>
                          Recognition
                        </h4>
                        <p className="modal-text">
                          Built and developed in just <strong>24 hours</strong> at <strong>Spectrum '25</strong>, a national-level hackathon. AgroCare earned <strong>1st Prize</strong> and $500 worth of prizes for connecting practical hardware, AI, and farmer-focused decision support.
                        </p>
                      </div>
                    </div>

                    <div className="modal-grid-col" style={{ gap: "16px" }}>
                      <div className="modal-section-card">
                        <h4 className="modal-section-title" style={{ color: "#8E2DE2" }}>
                          Multimodal Decision Layer
                        </h4>
                        <p className="modal-text">
                          AgroCare fuses visual crop health with live soil and environmental data instead of treating them as separate systems. An LLM recommendation layer translates this context into understandable fertilizer guidance, application timing, and field alerts.
                        </p>
                      </div>

                      <div className="modal-section-card">
                        <h4 className="modal-section-title" style={{ color: "#E22D6D" }}>
                          Farmer-First Application
                        </h4>
                        <ul className="modal-list">
                          <li><strong>Simple dashboard:</strong> crop health, disease alerts, soil status, and field insights in one place.</li>
                          <li><strong>Actionable output:</strong> raw measurements become context, recommendations, and next steps.</li>
                          <li><strong>Accessible UX:</strong> multilingual support helps make the platform useful beyond English-only technical interfaces.</li>
                        </ul>
                      </div>

                      <div className="modal-section-card">
                        <h4 className="modal-section-title" style={{ color: "#4D5BFF" }}>
                          Technology Stack
                        </h4>
                        <p className="modal-text">
                          CNN · Computer Vision · LLMs · ESP32 · LoRa · pH / NPK / moisture sensors · UAV + SLAM · Firebase real-time synchronization · Multilingual web/mobile interface
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="modal-section-card">
                    <h4 className="modal-section-title" style={{ color: "#FFB020" }}>
                      Built in 24 Hours at Spectrum '25
                    </h4>
                    <div className="agrocare-photo-grid">
                      <img src="/AgroCare-spectrum-award.jpeg" alt="AgroCare award moment at Spectrum 25" />
                      <img src="/AgroCare-spectrum-build.jpeg" alt="AgroCare team building during Spectrum 25" />
                      <img src="/AgroCare-spectrum-team.jpeg" alt="AgroCare team at Spectrum 25" />
                    </div>
                  </div>

                  <div className="modal-divider" />

                  <div className="modal-footer" style={{ justifyContent: "flex-end" }}>
                    <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                      <button onClick={handleOpenWorkflow} className="modal-action-btn secondary-btn" style={{ cursor: "pointer" }}>
                        See Architecture →
                      </button>
                      <a href={activeProject.btnLink} target="_blank" rel="noopener noreferrer" className="modal-action-btn primary-btn">
                        {activeProject.btnText} →
                      </a>
                    </div>
                  </div>
                </div>
              ) : activeProject.id === "rag-pipeline" ? (
                /* RAG Pipeline Details */
                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  <div className="modal-overview">
                    <p style={{ borderLeftColor: "#E22D6D" }}>
                      A fundamental RAG pipeline built from scratch to understand what actually happens behind document-based question answering — from ingestion and chunking through retrieval and document-grounded generation.
                    </p>
                  </div>

                  <div className="modal-divider" />

                  <div className="modal-details-grid">
                    <div className="modal-grid-col" style={{ gap: "16px" }}>
                      <div className="modal-section-card">
                        <h4 className="modal-section-title" style={{ color: "#E22D6D" }}>
                          Document Preparation
                        </h4>
                        <ul className="modal-list">
                          <li><strong>Ingestion:</strong> Parses PDF, TXT, HTML, and CSV files into structured documents with content and metadata.</li>
                          <li><strong>Chunking:</strong> Splits documents into smaller pieces and explores how chunk size and overlap influence retrieval quality.</li>
                          <li><strong>Embeddings:</strong> Converts text to vector representations using Sentence Transformers to enable semantic similarity search.</li>
                        </ul>
                      </div>

                      <div className="modal-section-card">
                        <h4 className="modal-section-title" style={{ color: "#4D5BFF" }}>
                          Local Vector Search
                        </h4>
                        <p className="modal-text">
                          Stores embeddings locally in ChromaDB, making them searchable by meaning rather than only by exact keyword matches.
                        </p>
                      </div>
                    </div>

                    <div className="modal-grid-col" style={{ gap: "16px" }}>
                      <div className="modal-section-card">
                        <h4 className="modal-section-title" style={{ color: "#2BB04A" }}>
                          Retrieval & Answers
                        </h4>
                        <p className="modal-text">
                          Query → embedding → similarity search → top-K relevant chunks → context. The retrieved context and query are then sent to Groq to generate a response grounded in the source documents.
                        </p>
                      </div>

                      <div className="modal-section-card">
                        <h4 className="modal-section-title" style={{ color: "#FFB020" }}>
                          Intentional Scope
                        </h4>
                        <p className="modal-text">
                          This keeps the focus on the core RAG building blocks: no re-ranking, hybrid search, agents, or complex orchestration.
                        </p>
                      </div>

                      <div className="modal-section-card">
                        <h4 className="modal-section-title" style={{ color: "#8E2DE2" }}>
                          Tech Stack
                        </h4>
                        <p className="modal-text">Python · LangChain · Sentence Transformers · ChromaDB · Groq</p>
                      </div>
                    </div>
                  </div>

                  <div className="modal-divider" />

                  <div className="modal-footer" style={{ justifyContent: "flex-end" }}>
                    <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                      <button
                        onClick={handleOpenWorkflow}
                        className="modal-action-btn secondary-btn"
                        style={{ cursor: "pointer" }}
                      >
                        See Project Workflow →
                      </button>
                      <a
                        href={activeProject.btnLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="modal-action-btn primary-btn"
                      >
                        {activeProject.btnText} →
                      </a>
                    </div>
                  </div>
                </div>
              ) : activeProject.id === "textlens" ? (
                /* TextLens Details */
                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  <div className="modal-overview">
                    <p style={{ borderLeftColor: "#2BB04A" }}>
                      TextLens is a Python framework that makes document OCR easier to set up, reuse, and run locally. It handles hardware detection, GPU configuration, model selection, document processing, batch OCR, and OCR serving through a simple developer workflow.
                    </p>
                  </div>

                  <div className="modal-divider" />

                  <div className="modal-details-grid">
                    <div className="modal-grid-col" style={{ gap: "16px" }}>
                      <div className="modal-section-card">
                        <h4 className="modal-section-title" style={{ color: "#2BB04A" }}>
                          Local-First OCR
                        </h4>
                        <p className="modal-text">
                          Process images and PDFs locally with multiple OCR model options, automatic model downloads, and caching for repeatable offline workflows.
                        </p>
                        <ul className="modal-list">
                          <li><strong>Document support:</strong> Local image and PDF OCR.</li>
                          <li><strong>Model flexibility:</strong> Multiple OCR models with automatic download and caching.</li>
                          <li><strong>Batch workflows:</strong> Run OCR across collections of documents from the CLI.</li>
                        </ul>
                      </div>

                      <div className="modal-section-card">
                        <h4 className="modal-section-title" style={{ color: "#4D5BFF" }}>
                          Hardware-Aware Setup
                        </h4>
                        <p className="modal-text">
                          Detects NVIDIA GPUs and CUDA availability, recommends models based on the available hardware, and automatically falls back to CPU when a GPU is not available.
                        </p>
                      </div>
                    </div>

                    <div className="modal-grid-col" style={{ gap: "16px" }}>
                      <div className="modal-section-card">
                        <h4 className="modal-section-title" style={{ color: "#FFB020" }}>
                          Developer Workflow
                        </h4>
                        <p className="modal-text">
                          TextLens provides a simple Python API and developer-friendly CLI tools for configuring, running, and integrating OCR without managing the underlying setup manually.
                        </p>
                      </div>

                      <div className="modal-section-card">
                        <h4 className="modal-section-title" style={{ color: "#8E2DE2" }}>
                          Tech Stack
                        </h4>
                        <p className="modal-text">
                          Python · PyTorch · CUDA · Transformers · FastAPI · Docker
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="modal-divider" />

                  <div className="modal-footer" style={{ justifyContent: "space-between" }}>
                    <WalkthroughPlayer
                      title="TextLens"
                      embedUrl="https://www.youtube-nocookie.com/embed/CGADrrqRZ7Q?rel=0"
                      youtubeUrl="https://youtu.be/CGADrrqRZ7Q"
                    />
                    <a
                      href={activeProject.btnLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="modal-action-btn primary-btn"
                    >
                      {activeProject.btnText} →
                    </a>
                  </div>
                </div>
              ) : activeProject.id === "banana-weevil" ? (
                /* Banana Weevil Details */
                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  {/* Overview */}
                  <div className="modal-overview">
                    <p>
                      A portable, non-destructive system designed to detect hidden weevil infestations inside banana plants. By listening to the plant&apos;s internal sounds, it helps farmers identify damaged stems early, preventing crop loss without harming the plant.
                    </p>
                  </div>

                  <div className="modal-divider" />

                  {/* 2-Column Grid */}
                  <div className="modal-details-grid">
                    {/* Left Column */}
                    <div className="modal-grid-col">
                      <div className="modal-section-card">
                        <h4 className="modal-section-title" style={{ color: "#E22D6D" }}>
                          The Problem
                        </h4>
                        <p className="modal-text">
                          The larvae of the weevil tunnel deep inside the banana stem, making them invisible from the outside. By the time damage is visible on the exterior, the core of the plant is already hollowed out and the crop is destroyed. Traditional inspection methods are slow, require expert knowledge, and require physically cutting into the plant, which damages the crop.
                        </p>
                      </div>

                      <div className="modal-section-card" style={{ marginTop: "16px" }}>
                        <h4 className="modal-section-title" style={{ color: "#2BB04A" }}>
                          The Solution
                        </h4>
                        <p className="modal-text">
                          A dual-mode acoustic sensor system that acts like a stethoscope for plants:
                        </p>
                        <ul className="modal-list">
                          <li>
                            <strong>Passive Listening:</strong> The device captures the very faint, microscopic chewing sounds made by the larvae inside the stem.
                          </li>
                          <li>
                            <strong>Active Testing:</strong> The device gently taps the stem and measures how the plant vibrates, confirming if the core is solid or hollowed out.
                          </li>
                          <li>
                            <strong>Machine Learning Detection:</strong> The recorded sounds and vibration patterns are processed directly on-device using a lightweight machine learning algorithm to instantly classify the health status of the plant.
                          </li>
                        </ul>
                        <p className="modal-text" style={{ marginTop: "8px" }}>
                          By combining physical sensing with local machine learning analysis, the system provides an accurate diagnosis entirely in the field.
                        </p>
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="modal-grid-col">
                      <div className="modal-section-card">
                        <h4 className="modal-section-title" style={{ color: "#4D5BFF" }}>
                          Real-World Design
                        </h4>
                        <p className="modal-text">
                          Farms often lack reliable internet connection. The system is designed to run entirely offline on a low-cost, portable microcomputer (a Raspberry Pi) carried by the farmer. This allows instant, real-time results in remote fields without any network connection.
                        </p>
                      </div>

                      <div className="modal-section-card" style={{ marginTop: "16px" }}>
                        <h4 className="modal-section-title" style={{ color: "#8E2DE2" }}>
                          Research Journey
                        </h4>
                        <p className="modal-text">
                          Developing this solution required extensive scientific validation:
                        </p>
                        <ul className="modal-list">
                          <li>
                            <strong>National Institute Collaboration:</strong> Got the opportunity to visit the ICAR-National Research Centre for Banana (NRCB) to study the pest behaviour and collect stage-wise sound recordings of the insect.
                          </li>
                          <li>
                            <strong>2-Year Timeline:</strong> Spent around 2 years of continuous engineering and field testing to refine the system up to Technology Readiness Level 5 (TRL 5), demonstrating its effectiveness in actual farm conditions.
                          </li>
                        </ul>
                      </div>

                      <div className="modal-section-card" style={{ marginTop: "16px" }}>
                        <h4 className="modal-section-title" style={{ color: "#FFB020" }}>
                          Funding and Recognition
                        </h4>
                        <ul className="modal-list">
                          <li>
                            <strong>Seed Funding:</strong> Secured ₹20,000 in seed funding to support the development and prototyping of this project.
                          </li>
                          <li>
                            <strong>Award Winner:</strong> Won at the Institution&apos;s Innovation Council (IIC) Regional Meet in Tirunelveli, 2025.
                          </li>
                          <li>
                            <strong>Patent Status:</strong> Officially recognized under Indian Patent Application No. <strong>202541116228 A</strong>.
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="modal-divider" />

                  {/* Footer */}
                  <div className="modal-footer" style={{ justifyContent: "flex-end" }}>
                    <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                      <button
                        onClick={handleOpenWorkflow}
                        className="modal-action-btn secondary-btn"
                        style={{ cursor: "pointer" }}
                      >
                        See Project Workflow →
                      </button>
                      <a
                        href={activeProject.btnLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="modal-action-btn primary-btn"
                      >
                        {activeProject.btnText} →
                      </a>
                    </div>
                  </div>
                </div>
              ) : activeProject.id === "nutriminds" ? (
                /* Nutriminds Details */
                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  {/* Overview */}
                  <div className="modal-overview">
                    <p style={{ borderLeftColor: "#2DC8E2" }}>
                      NutriMinds AI is an end-to-end AI-powered nutrition analysis platform that helps users determine whether a packaged food product is suitable for their specific medical conditions. The system combines Vision Language Models (VLMs), OCR, a fine-tuned Large Language Model (LLM), and nutrition knowledge to provide personalized dietary recommendations based on both a user&apos;s medical report and the nutritional information printed on food packaging.
                    </p>
                  </div>

                  <div className="modal-divider" />

                  {/* 2-Column Grid */}
                  <div className="modal-details-grid">
                    {/* Left Column */}
                    <div className="modal-grid-col" style={{ gap: "16px" }}>
                      <div className="modal-section-card">
                        <h4 className="modal-section-title" style={{ color: "#2DC8E2" }}>
                          Objective & Core Features
                        </h4>
                        <p className="modal-text">
                          Bridges the gap between complex nutritional labels and clinical healthcare. Users upload medical/blood reports or prescription documents alongside food labels. The AI automatically analyzes both to check:
                        </p>
                        <ul className="modal-list">
                          <li><strong>Safety Analysis:</strong> Whether the food is safe, recommended or not recommended.</li>
                          <li><strong>Parameters Evaluated:</strong> Serving size guidelines, health risks, ingredient interactions, additive impact, and disease-specific nutritional compatibility.</li>
                        </ul>
                      </div>

                      <div className="modal-section-card">
                        <h4 className="modal-section-title" style={{ color: "#FFB020" }}>
                          OCR & Multi-Modal Pipeline
                        </h4>
                        <p className="modal-text">
                          To extract information accurately, the pipeline implements distinct technologies:
                        </p>
                        <ul className="modal-list">
                          <li>
                            <strong>Medical Reports:</strong> Processed using a Vision-Language Model (VLM) for semantic layout, table, and terminology understanding instead of traditional OCR.
                          </li>
                          <li>
                            <strong>Food Labels:</strong> PaddleOCR extracts multilingual ingredient lists, serving details, and additive INS numbers, normalizing them before inference.
                          </li>
                        </ul>
                      </div>

                      <div className="modal-section-card">
                        <h4 className="modal-section-title" style={{ color: "#2BB04A" }}>
                          Dataset Construction
                        </h4>
                        <p className="modal-text">
                          Combined multiple data sources to train a medically reliable reasoning model:
                        </p>
                        <ul className="modal-list">
                          <li><strong>Open Food Facts:</strong> 900,000+ packaged products with ingredients and nutritional values.</li>
                          <li><strong>Medical Nutrition Therapy:</strong> Dietary rules and targets for Chronic Kidney Disease, Diabetes, Hypertension, etc.</li>
                          <li><strong>Synthetic Medical Dataset:</strong> Disease-food compatibility scenarios with deep clinical reasoning.</li>
                        </ul>
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="modal-grid-col" style={{ gap: "16px" }}>
                      <div className="modal-section-card">
                        <h4 className="modal-section-title" style={{ color: "#8E2DE2" }}>
                          Fine-Tuning Configuration
                        </h4>
                        <p className="modal-text">
                          Fine-tuned <strong>Mistral 7B Instruct</strong> using QLoRA via Unsloth on a Google Colab T4 GPU (16GB VRAM) for optimized reasoning performance.
                        </p>
                        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px", fontFamily: "'Open Sans', sans-serif", fontSize: "13px" }}>
                          <thead>
                            <tr style={{ borderBottom: "2px solid #1C202B" }}>
                              <th style={{ textAlign: "left", padding: "6px 0", fontWeight: "800" }}>Parameter</th>
                              <th style={{ textAlign: "left", padding: "6px 0", fontWeight: "800" }}>Value</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr style={{ borderBottom: "1px solid rgba(28,32,43,0.1)" }}>
                              <td style={{ padding: "6px 0" }}>Base Model</td>
                              <td style={{ padding: "6px 0", fontWeight: "600" }}>Mistral 7B Instruct</td>
                            </tr>
                            <tr style={{ borderBottom: "1px solid rgba(28,32,43,0.1)" }}>
                              <td style={{ padding: "6px 0" }}>Framework / Method</td>
                              <td style={{ padding: "6px 0", fontWeight: "600" }}>Unsloth / QLoRA 4-bit</td>
                            </tr>
                            <tr style={{ borderBottom: "1px solid rgba(28,32,43,0.1)" }}>
                              <td style={{ padding: "6px 0" }}>Rank (r) / Alpha (α)</td>
                              <td style={{ padding: "6px 0", fontWeight: "600" }}>16–32 / 32–64</td>
                            </tr>
                            <tr style={{ borderBottom: "1px solid rgba(28,32,43,0.1)" }}>
                              <td style={{ padding: "6px 0" }}>Optimizer / LR</td>
                              <td style={{ padding: "6px 0", fontWeight: "600" }}>AdamW 8-bit / 2e-4</td>
                            </tr>
                            <tr style={{ borderBottom: "1px solid rgba(28,32,43,0.1)" }}>
                              <td style={{ padding: "6px 0" }}>Sequence Length</td>
                              <td style={{ padding: "6px 0", fontWeight: "600" }}>2048 tokens</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <div className="modal-section-card">
                        <h4 className="modal-section-title" style={{ color: "#E22D6D" }}>
                          Structured Analysis Output
                        </h4>
                        <p className="modal-text">
                          The final inference pipeline returns structured JSON payload details:
                        </p>
                        <ul className="modal-list">
                          <li><strong>Compatibility Score:</strong> Rating of suitability for patient conditions.</li>
                          <li><strong>Risk Analysis:</strong> Allergen detection, additive danger, sugar/sodium/potassium impact.</li>
                          <li><strong>Consumption Guideline:</strong> Safe serving size and recommended consumption frequency.</li>
                        </ul>
                      </div>

                      <div className="modal-section-card">
                        <h4 className="modal-section-title" style={{ color: "#4D5BFF" }}>
                          Deployment & Tech Stack
                        </h4>
                        <p className="modal-text">
                          Designed as a modular, low-latency service:
                        </p>
                        <ul className="modal-list">
                          <li><strong>Frontend:</strong> React.js Dashboard</li>
                          <li><strong>Backend:</strong> FastAPI with cloud-hosted API</li>
                          <li><strong>Inference:</strong> Mistral 7B (4-bit quantized)</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="modal-divider" />

                  {/* Footer */}
                  <div className="modal-footer" style={{ justifyContent: "flex-end" }}>
                    <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                      <button
                        onClick={handleOpenWorkflow}
                        className="modal-action-btn secondary-btn"
                        style={{ cursor: "pointer" }}
                      >
                        See Project Workflow →
                      </button>
                      <a
                        href={activeProject.btnLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="modal-action-btn primary-btn"
                      >
                        {activeProject.btnText} →
                      </a>
                    </div>
                  </div>
                </div>
              ) : activeProject.id === "xenia-crm" ? (
                /* Xenia CRM Details */
                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  {/* Overview */}
                  <div className="modal-overview">
                    <p style={{ borderLeftColor: "#8E2DE2" }}>
                      Xenia CRM is a full-stack enterprise retail customer relationship management platform built to help marketing teams identify customer opportunities, create targeted campaigns, manage promotional offers, automate premium voice outreach, monitor customer engagement, and measure campaign performance through complete lifecycle tracking.
                    </p>
                  </div>

                  <div className="modal-divider" />

                  {/* 2-Column Grid */}
                  <div className="modal-details-grid">
                    {/* Left Column */}
                    <div className="modal-grid-col" style={{ gap: "16px" }}>
                      <div className="modal-section-card">
                        <h4 className="modal-section-title" style={{ color: "#8E2DE2" }}>
                          Shopper Intelligence & Churn GBM
                        </h4>
                        <p className="modal-text">
                          Treats every customer as an individual profile rather than a simple database record. Shoppers maintain detailed behavioral history:
                        </p>
                        <ul className="modal-list">
                          <li><strong>Data Features:</strong> Complete purchase history, categories, lifetime spending (CLV), campaign engagement, and journey timeline.</li>
                          <li><strong>Churn Prediction:</strong> A <strong>Gradient Boosting Machine (GBM)</strong> model trained on behavioral signals (inactivity, frequency, spending habits) predicts the probability of customer churn to identify high-risk shoppers.</li>
                        </ul>
                      </div>

                      <div className="modal-section-card">
                        <h4 className="modal-section-title" style={{ color: "#E22D6D" }}>
                          Campaign Lifecycle & Preview
                        </h4>
                        <p className="modal-text">
                          Marketers can plan, configure promotions, select target audiences, and launch multi-channel campaigns. Before dispatching, the platform renders interactive previews:
                        </p>
                        <ul className="modal-list">
                          <li><strong>Channels Supported:</strong> WhatsApp, Email, SMS, and AI Voice Calls.</li>
                          <li><strong>Full Funnel Tracking:</strong> Logs every step of the user engagement flow: <em>Queued → Sent → Delivered → Opened → Clicked → Promotion Redeemed → Purchase Completed</em>.</li>
                        </ul>
                      </div>

                      <div className="modal-section-card">
                        <h4 className="modal-section-title" style={{ color: "#2BB04A" }}>
                          Cloud Infrastructure & DB
                        </h4>
                        <p className="modal-text">
                          Engineered for scalable, high-performance database transactions:
                        </p>
                        <ul className="modal-list">
                          <li><strong>AWS Elastic Beanstalk:</strong> Deployed as two separate scalable microservice environments (Core CRM and Channel Simulator) running FastAPI on Python 3.12.</li>
                          <li><strong>Neon Serverless PostgreSQL:</strong> Leverages connection pooling and auto-scaling to manage customer records, attributions, and campaign timelines.</li>
                        </ul>
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="modal-grid-col" style={{ gap: "16px" }}>
                      <div className="modal-section-card">
                        <h4 className="modal-section-title" style={{ color: "#2DC8E2" }}>
                          ElevenLabs Voice Campaigns
                        </h4>
                        <p className="modal-text">
                          Outbound voice campaign manager targeting premium customer segments:
                        </p>
                        <ul className="modal-list">
                          <li><strong>API Synthesis:</strong> Integrates <strong>ElevenLabs Text-to-Speech API</strong> for high-fidelity natural voice synthesis.</li>
                          <li><strong>Customization:</strong> Supports preferred voice profiles, multi-language translation, speaking styles, voice script planning, and call performance reporting.</li>
                        </ul>
                      </div>

                      <div className="modal-section-card">
                        <h4 className="modal-section-title" style={{ color: "#FFB020" }}>
                          Channel Event Simulator
                        </h4>
                        <p className="modal-text">
                          A dedicated FastAPI microservice that emulates external telcos and email clients to avoid integration costs during testing:
                        </p>
                        <ul className="modal-list">
                          <li><strong>Automated Interaction Loop:</strong> Simulates customer behaviors (e.g. opening emails, clicking SMS links, applying discount codes) and sends real-time webhooks back to the core API.</li>
                          <li><strong>Attribution Pipeline:</strong> Converts simulated events into hard ROI analytics (conversion rate, revenue attributed, and promo usage).</li>
                        </ul>
                      </div>

                      <div className="modal-section-card">
                        <h4 className="modal-section-title" style={{ color: "#4D5BFF" }}>
                          Technology Stack Summary
                        </h4>
                        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px", fontFamily: "'Open Sans', sans-serif", fontSize: "12.5px" }}>
                          <tbody>
                            <tr style={{ borderBottom: "1px solid rgba(28,32,43,0.1)" }}>
                              <td style={{ padding: "5px 0", fontWeight: "bold" }}>Frontend</td>
                              <td style={{ padding: "5px 0" }}>React, TypeScript, Vite, Lucide</td>
                            </tr>
                            <tr style={{ borderBottom: "1px solid rgba(28,32,43,0.1)" }}>
                              <td style={{ padding: "5px 0", fontWeight: "bold" }}>Backend</td>
                              <td style={{ padding: "5px 0" }}>FastAPI, SQLAlchemy, Alembic, ReportLab</td>
                            </tr>
                            <tr style={{ borderBottom: "1px solid rgba(28,32,43,0.1)" }}>
                              <td style={{ padding: "5px 0", fontWeight: "bold" }}>Database</td>
                              <td style={{ padding: "5px 0" }}>PostgreSQL on Neon Serverless</td>
                            </tr>
                            <tr style={{ borderBottom: "1px solid rgba(28,32,43,0.1)" }}>
                              <td style={{ padding: "5px 0", fontWeight: "bold" }}>ML & APIs</td>
                              <td style={{ padding: "5px 0" }}>GBM Churn, Groq Llama 3.3, ElevenLabs</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  <div className="modal-divider" />

                  {/* Footer */}
                  <div className="modal-footer" style={{ justifyContent: "space-between" }}>
                    <WalkthroughPlayer
                      title="Xenia CRM"
                      embedUrl="https://www.youtube-nocookie.com/embed/8VAZWC9b_Do?start=25&rel=0"
                      youtubeUrl="https://www.youtube.com/watch?v=8VAZWC9b_Do&t=25s"
                    />
                    <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                      <button
                        onClick={handleOpenWorkflow}
                        className="modal-action-btn secondary-btn"
                        style={{ cursor: "pointer" }}
                      >
                        See Project Workflow →
                      </button>
                      <a
                        href={activeProject.btnLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="modal-action-btn primary-btn"
                      >
                        {activeProject.btnText} →
                      </a>
                    </div>
                  </div>
                </div>
              ) : (
                /* ACAS Dhristi Details */
                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  {/* Overview */}
                  <div className="modal-overview">
                    <p style={{ borderLeftColor: "#FFB020" }}>
                      ACAS Dhristi is a predictive governance framework designed for the Unique Identification Authority of India (UIDAI). Built after deep research of actual UIDAI enrollment systems, it proactively forecasts operational stress up to 7 days in advance across all 173,225+ Tamil Nadu Aadhaar centers. The system takes proactive decisions on real-time data ingested from UIDAI&apos;s CIDR database while strictly preserving privacy by never accessing personal identity data.
                    </p>
                  </div>

                  <div className="modal-divider" />

                  {/* 2-Column Grid */}
                  <div className="modal-details-grid">
                    {/* Left Column */}
                    <div className="modal-grid-col" style={{ gap: "16px" }}>
                      <div className="modal-section-card">
                        <h4 className="modal-section-title" style={{ color: "#FFB020" }}>
                          The Problem Solved
                        </h4>
                        <p className="modal-text">
                          Traditional Aadhaar enrollment centers operate reactively — staff is deployed only after queues form or biometric delays trigger citizen complaints. ACAS Dhristi converts raw, aggregated operational metadata into prioritized, spatially-mapped stress alerts to prevent disruptions before they happen.
                        </p>
                      </div>

                      <div className="modal-section-card">
                        <h4 className="modal-section-title" style={{ color: "#2DC8E2" }}>
                          UIDAI Metadata Pattern Analysis (EDA)
                        </h4>
                        <p className="modal-text">
                          Performed Exploratory Data Analysis (EDA) on raw operational metadata provided by UIDAI to identify structural demand behaviors and key seasonal patterns:
                        </p>
                        <ul className="modal-list">
                          <li><strong>Mandatory Biometric Updates (MBU):</strong> Tracks MBU updates for children to predict demand surges during school admission seasons.</li>
                          <li><strong>Temporal Surges:</strong> Captures month-end/year-end rushes and consistent weekday vs. weekend demand differences.</li>
                          <li><strong>Resident Migration:</strong> Explores cross-district movement of residents to capture spatial load distribution.</li>
                        </ul>
                      </div>

                      <div className="modal-section-card">
                        <h4 className="modal-section-title" style={{ color: "#2BB04A" }}>
                          Spatio-Temporal Stress Index
                        </h4>
                        <p className="modal-text">
                          Instead of simple footfall count, the stress index dynamically aggregates multiple key signals:
                        </p>
                        <div style={{ padding: "10px", margin: "10px 0", border: "1.5px dashed #1C202B", background: "#FFFFFF", borderRadius: "4px", textAlign: "center", fontFamily: "'Bangers', cursive", fontSize: "16px", color: "#1C202B", transform: "skewX(-3deg)" }}>
                          Stress Index = (Biometric Intensity + Student Lead Factor) / Temporal Weight
                        </div>
                        <ul className="modal-list">
                          <li><strong>Signal 1 (The Monday Effect):</strong> Multiplies stress index by 1.4× to account for consistent 40% surges at week-start.</li>
                          <li><strong>Signal 2 (Student Lead Factor):</strong> Tracks MBU cycles to predict surges 3–5 days prior to queue formation.</li>
                          <li><strong>Signal 3 (Spatial Spillover GNN):</strong> Captures spatial propagation from high-load centers to neighboring nodes using Graph Neural Networks.</li>
                        </ul>
                      </div>

                      <div className="modal-section-card">
                        <h4 className="modal-section-title" style={{ color: "#4D5BFF" }}>
                          Privacy & Compliance
                        </h4>
                        <ul className="modal-list">
                          <li><strong>Data Anonymization:</strong> Ingests aggregated operational metadata only — zero resident private identifier files.</li>
                          <li><strong>Isolated Scope:</strong> Operates without connecting to central CIDR resident identity records.</li>
                          <li><strong>Regulatory Compliance:</strong> Fully compliant with UIDAI data protection guidelines and GIGW 3.0 government standards.</li>
                        </ul>
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="modal-grid-col" style={{ gap: "16px" }}>
                      <div className="modal-section-card">
                        <h4 className="modal-section-title" style={{ color: "#E22D6D" }}>
                          Force-Detection Priority Engine
                        </h4>
                        <p className="modal-text">
                          Stress levels trigger automated response protocols according to a 5-tier classification model:
                        </p>
                        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px", fontFamily: "'Open Sans', sans-serif", fontSize: "12px" }}>
                          <thead>
                            <tr style={{ borderBottom: "2px solid #1C202B" }}>
                              <th style={{ textAlign: "left", padding: "6px 0", fontWeight: "800" }}>Priority & Condition</th>
                              <th style={{ textAlign: "left", padding: "6px 0", fontWeight: "800" }}>Automated Response</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr style={{ borderBottom: "1px solid rgba(28,32,43,0.1)" }}>
                              <td style={{ padding: "6px 0", color: "#E22D6D" }}>🔴 <strong>P5 - EMERGENCY</strong> (Risk &gt; 50 & Demand &gt; 100)</td>
                              <td style={{ padding: "6px 0" }}>Deploy Mobile Enrollment Vans</td>
                            </tr>
                            <tr style={{ borderBottom: "1px solid rgba(28,32,43,0.1)" }}>
                              <td style={{ padding: "6px 0", color: "#FFB020" }}>🟠 <strong>P4 - SATURATED</strong> (Risk &gt; 30 or Demand &gt; 150)</td>
                              <td style={{ padding: "6px 0" }}>Activate 2nd Shift Staffing</td>
                            </tr>
                            <tr style={{ borderBottom: "1px solid rgba(28,32,43,0.1)" }}>
                              <td style={{ padding: "6px 0", color: "#8E2DE2" }}>🟡 <strong>P3 - MISSION</strong> (Student Lead &gt; 2.5)</td>
                              <td style={{ padding: "6px 0" }}>Dedicate Counter #1 for MBUs</td>
                            </tr>
                            <tr style={{ borderBottom: "1px solid rgba(28,32,43,0.1)" }}>
                              <td style={{ padding: "6px 0", color: "#4D5BFF" }}>🔵 <strong>P2 - MONITOR</strong> (Risk &gt; 15)</td>
                              <td style={{ padding: "6px 0" }}>Monitor Real-time Wait Times</td>
                            </tr>
                            <tr style={{ borderBottom: "1px solid rgba(28,32,43,0.1)" }}>
                              <td style={{ padding: "6px 0", color: "#2BB04A" }}>🟢 <strong>P1 - STABLE</strong> (Risk &lt; 15)</td>
                              <td style={{ padding: "6px 0" }}>Standard Preventive Maintenance</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <div className="modal-section-card">
                        <h4 className="modal-section-title" style={{ color: "#8E2DE2" }}>
                          Predictive Machine Learning Core
                        </h4>
                        <ul className="modal-list">
                          <li>
                            <strong>XGBoost Model (Temporal Demand):</strong>
                            <div style={{ fontSize: "12px", marginTop: "3px" }}>
                              Learns historical demand patterns to forecast enrollment center stress up to 7 days in advance. Utilizes time-based features (weekday, month, trends) and engineered signals (baseline, student lead factor) for structured data accuracy.
                            </div>
                          </li>
                          <li style={{ marginTop: "8px" }}>
                            <strong>Graph Neural Network (GNN / ST-GNN):</strong>
                            <div style={{ fontSize: "12px", marginTop: "3px" }}>
                              Detects hidden network pressure and spatial spillover across neighboring districts. Models centers as connected nodes in a graph to capture migration-driven loads, even when local historical averages appear normal.
                            </div>
                          </li>
                        </ul>
                      </div>

                      <div className="modal-section-card">
                        <h4 className="modal-section-title" style={{ color: "#4D5BFF" }}>
                          Technology Stack
                        </h4>
                        <p className="modal-text" style={{ fontWeight: "bold", marginBottom: "4px" }}>
                          Frontend & Mapping:
                        </p>
                        <div style={{ fontSize: "12.5px", color: "var(--color-body)", marginBottom: "8px" }}>
                          Next.js 14 (SSR), React 18, TypeScript, Tailwind CSS, Framer Motion, and Leaflet.js for high-performance spatial stress mapping of 173,225+ nodes.
                        </div>
                        <p className="modal-text" style={{ fontWeight: "bold", marginBottom: "4px" }}>
                          Backend & Automation:
                        </p>
                        <div style={{ fontSize: "12.5px", color: "var(--color-body)" }}>
                          n8n Workflow Engine for automated data ingestion and alert routing, and Google Sheets API for closed-loop governance auditing.
                        </div>
                      </div>

                      <div className="modal-section-card">
                        <h4 className="modal-section-title" style={{ color: "#FFB020" }}>
                          Framework Scalability
                        </h4>
                        <p className="modal-text">
                          Designed with a state-agnostic architecture. Expanding the pilot from Tamil Nadu (173,225 nodes) to other states requires zero layout redesign — only center coordinate ingestion and retraining baseline temporal multipliers.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="modal-divider" />

                  {/* Footer */}
                  <div className="modal-footer" style={{ justifyContent: "flex-end" }}>
                    <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                      <button
                        onClick={handleOpenWorkflow}
                        className="modal-action-btn secondary-btn"
                        style={{ cursor: "pointer" }}
                      >
                        See Project Workflow →
                      </button>
                      <a
                        href={activeProject.btnLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="modal-action-btn primary-btn"
                      >
                        {activeProject.btnText} →
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── PIN Protection Verification Modal ── */}
      {isPinPromptOpen && (
        <div
          className="modal-backdrop"
          onClick={() => setIsPinPromptOpen(false)}
          style={{ zIndex: 99999, backgroundColor: "rgba(28, 32, 43, 0.85)", backdropFilter: "blur(6px)" }}
        >
          <div
            className="project-modal-container"
            style={{
              maxWidth: "420px",
              width: "90%",
              padding: "40px 32px 32px",
              textAlign: "center",
              borderRadius: "8px",
              boxShadow: "0 16px 48px rgba(28, 32, 43, 0.18)",
              border: "1px solid #E2E8F0",
              background: "#FFFFFF",
              position: "relative",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsPinPromptOpen(false)}
              style={{
                position: "absolute",
                top: "14px",
                right: "16px",
                background: "none",
                border: "none",
                fontSize: "22px",
                fontWeight: "bold",
                color: "#1C202B",
                cursor: "pointer",
              }}
            >
              ✕
            </button>

            <img
              src="/banana-project-padlock.png"
              alt="Locked Banana Weevil project"
              style={{
                display: "block",
                width: "46px",
                height: "46px",
                objectFit: "contain",
                margin: "0 auto 12px",
              }}
            />
            <h3
              style={{
                fontFamily: "'Open Sans', sans-serif",
                fontSize: "20px",
                fontWeight: 800,
                letterSpacing: "0.2px",
                color: "#1C202B",
                margin: "0 0 8px",
              }}
            >
              PIN PROTECTED
            </h3>
            <p
              style={{
                fontFamily: "'Open Sans', sans-serif",
                fontSize: "13px",
                color: "#4A5468",
                lineHeight: "1.5",
                margin: "0 0 22px",
              }}
            >
              Enter the 4-digit PIN password to open the protected <strong>{activeProject?.title || "Banana Weevil"}</strong> project.
            </p>

            <form
              onSubmit={handlePinSubmit}
              style={{ display: "flex", flexDirection: "column", gap: "14px", alignItems: "center", width: "100%" }}
            >
              {/* Discrete 4-Digit Box Indicators */}
              <div
                onClick={() => {
                  const el = document.getElementById("pin-hidden-input");
                  if (el) el.focus();
                }}
                style={{
                  display: "flex",
                  gap: "14px",
                  justifyContent: "center",
                  cursor: "pointer",
                  margin: "4px 0 8px",
                }}
              >
                {[0, 1, 2, 3].map((idx) => {
                  const isFilled = pinInput.length > idx;
                  const isCurrent = pinInput.length === idx;
                  return (
                    <div
                      key={idx}
                      style={{
                        width: "38px",
                        height: "42px",
                        borderRadius: "2px",
                        border: pinError
                          ? "1px solid #E22D6D"
                          : isCurrent || isFilled
                          ? "1px solid #94A3B8"
                          : "1px solid #D7DDE5",
                        background: "#FFFFFF",
                        boxShadow: isCurrent
                          ? "0 0 0 2px rgba(148, 163, 184, 0.15)"
                          : "0 1px 2px rgba(28, 32, 43, 0.04)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "18px",
                        color: "#1C202B",
                        transition: "all 150ms ease",
                      }}
                    >
                      {isFilled ? "●" : <span style={{ opacity: 0.25, fontSize: "16px" }}>○</span>}
                    </div>
                  );
                })}
              </div>

              {/* Input field (styled clean and clear) */}
              <input
                id="pin-hidden-input"
                type="password"
                maxLength={4}
                value={pinInput}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, "");
                  setPinInput(val);
                  setPinError(false);
                }}
                autoFocus
                style={{
                  position: "absolute",
                  opacity: 0,
                  pointerEvents: "none",
                  width: "1px",
                  height: "1px",
                }}
              />

              {pinError ? (
                <p style={{ color: "#E22D6D", fontSize: "13px", fontWeight: "bold", margin: 0 }}>
                  ❌ Incorrect PIN. Access Denied.
                </p>
              ) : (
                <p style={{ color: "#64748B", fontSize: "12px", margin: 0 }}>
                  Enter the 4-digit access PIN
                </p>
              )}

              <div style={{ display: "flex", gap: "12px", width: "100%", marginTop: "8px" }}>
                <button
                  type="button"
                  onClick={() => setIsPinPromptOpen(false)}
                  style={{
                    flex: 1,
                    padding: "12px",
                    borderRadius: "10px",
                    border: "2.5px solid #1C202B",
                    background: "#FFFFFF",
                    color: "#1C202B",
                    fontFamily: "'Open Sans', sans-serif",
                    fontWeight: "700",
                    fontSize: "13px",
                    cursor: "pointer",
                    textTransform: "uppercase",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    flex: 1,
                    padding: "12px",
                    borderRadius: "10px",
                    border: "2.5px solid #1C202B",
                    background: "var(--brand)",
                    color: "#FFFFFF",
                    fontFamily: "'Bangers', cursive",
                    fontSize: "17px",
                    letterSpacing: "1px",
                    cursor: "pointer",
                    boxShadow: "3px 3px 0 0 #1C202B",
                    textTransform: "uppercase",
                  }}
                >
                  UNLOCK →
                </button>
              </div>
            </form>
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
              src={
                activeProject?.id === "agrocare"
                  ? "/AgroCare-architecture.png"
                  : activeProject?.id === "acas-dhristi"
                  ? "/Acas_Workflow.png"
                  : activeProject?.id === "nutriminds"
                  ? "/Nutriminds.png"
                  : activeProject?.id === "xenia-crm"
                  ? "/Xenia-worflow.png"
                  : activeProject?.id === "rag-pipeline"
                  ? "/RAG-Pipeline-workflow.png"
                  : "/Banana_Weevil_Portfolio.png"
              }
              alt={
                activeProject?.id === "agrocare"
                  ? "AgroCare precision farming architecture diagram"
                  : activeProject?.id === "acas-dhristi"
                  ? "ACAS Dhristi Workflow Diagram"
                  : activeProject?.id === "nutriminds"
                  ? "NutriMinds AI Workflow Diagram"
                  : activeProject?.id === "xenia-crm"
                  ? "Xenia CRM Workflow Diagram"
                  : activeProject?.id === "rag-pipeline"
                  ? "RAG Pipeline Workflow Diagram"
                  : "Banana Weevil Pest Detection Workflow"
              }
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
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 32px;
        }
        
        .project-dashed-card {
          border-radius: 8px;
          padding: 0;
          position: relative;
          display: flex;
          flex-direction: column;
          box-shadow: 10px 10px 0 0 #1C202B;
          transition: opacity 550ms cubic-bezier(0.2, 0.8, 0.2, 1),
                      transform 500ms cubic-bezier(0.22, 1, 0.36, 1),
                      box-shadow 150ms ease;
          overflow: hidden;
          will-change: transform, opacity;
        }
        .project-dashed-card.reveal {
          opacity: 0;
          transform: translateY(36px) scale(0.96);
        }
        .project-dashed-card.reveal.visible {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
        .project-dashed-card:hover {
          transform: translateY(-6px) scale(1.015) !important;
          box-shadow: 14px 14px 0 0 #1C202B;
        }
        .project-dashed-card.pink-card {
          background: #FFE5EE;
          border: 4px solid #1C202B;
        }
        .project-dashed-card.white-card {
          background: #FFFFFF;
          border: 4px solid #1C202B;
        }
        
        .project-card-header {
          width: 100%;
          height: 180px;
          border-bottom: 4px solid #1C202B;
          overflow: hidden;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .project-card-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }
        .project-dashed-card:hover .project-card-image {
          transform: scale(1.05);
        }
        
        .project-card-illustration {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        
        .project-card-body {
          padding: 28px 24px 24px 24px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }
        
        .project-card-badge {
          position: absolute;
          top: 14px;
          left: 14px;
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
          font-family: 'Open Sans', sans-serif;
          font-size: 25px;
          font-weight: 800;
          color: #1C202B;
          letter-spacing: -0.5px;
          text-transform: uppercase;
          margin: 0 0 10px 0;
          transform: skewX(-6deg);
          line-height: 1.2;
        }
        
        .project-card-desc {
          font-family: 'Open Sans', sans-serif;
          font-size: 14px;
          line-height: 1.6;
          color: var(--color-body);
          margin: 0 0 20px 0;
          min-height: 68px;
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
          font-style: italic;
          transform: skewX(-4deg);
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
          margin-top: auto;
        }
        .project-card-btn:hover {
          transform: translate(-2px, -2px);
          box-shadow: 7px 7px 0 0 var(--btn-shadow-color);
        }
        .project-card-btn:active {
          transform: translate(2px, 2px);
          box-shadow: 1px 1px 0 0 var(--btn-shadow-color);
        }
        
        /* Modal Backdrop */
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
        .project-modal-container {
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
        .project-modal-header {
          padding: 24px 28px;
          border-bottom: 4px solid #1C202B;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #FFFFFF;
        }
        
        .project-modal-title {
          font-family: 'Open Sans', sans-serif;
          font-size: 28px;
          font-weight: 800;
          color: #1C202B;
          margin: 0;
          transform: skewX(-4deg);
          text-transform: uppercase;
          line-height: 1.2;
        }
        
        .project-modal-badge {
          color: #FFFFFF;
          font-family: 'Open Sans', sans-serif;
          font-size: 10px;
          font-weight: 800;
          padding: 4px 8px;
          border: 2px solid #1C202B;
          border-radius: 4px;
          box-shadow: 2px 2px 0 0 #1C202B;
          text-transform: uppercase;
        }
        
        .project-modal-close-btn {
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
        .project-modal-close-btn:hover {
          transform: translate(-1px, -1px);
          box-shadow: 4px 4px 0 0 #1C202B;
        }
        .project-modal-close-btn:active {
          transform: translate(1px, 1px);
          box-shadow: 1px 1px 0 0 #1C202B;
        }
        
        /* Modal Body */
        .project-modal-body {
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

        .agrocare-photo-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
        }

        .agrocare-photo-grid img {
          width: 100%;
          height: 150px;
          object-fit: cover;
          border: 2px solid #1C202B;
          border-radius: 4px;
          background: #FFFFFF;
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

        .walkthrough-player {
          width: min(100%, 300px);
          overflow: hidden;
          background: #1C202B;
          border: 3px solid #1C202B;
          border-radius: 6px;
          box-shadow: 4px 4px 0 0 #FF0000;
        }

        .walkthrough-player iframe {
          display: block;
          width: 100%;
          aspect-ratio: 16 / 9;
          border: 0;
        }

        .walkthrough-player a {
          display: block;
          padding: 8px 10px;
          color: #FFFFFF;
          font-family: 'Open Sans', sans-serif;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.4px;
          text-align: center;
          text-decoration: none;
          text-transform: uppercase;
        }

        .walkthrough-player a:hover {
          background: #FF0000;
        }
        
        .modal-metrics {
          display: flex;
          gap: 36px;
        }
        
        .modal-metric {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        
        .modal-metric-label {
          font-family: 'Open Sans', sans-serif;
          font-size: 10px;
          font-weight: 800;
          color: var(--color-body-subtle);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .modal-metric-value {
          font-family: 'Bangers', cursive;
          font-size: 26px;
          color: #1C202B;
          letter-spacing: 0.5px;
          font-style: italic;
          transform: skewX(-4deg);
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
        
        @media (max-width: 1024px) {
          .projects-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 24px;
          }
          #projects .section-header {
            max-width: 100% !important;
          }
        }
        
        @media (max-width: 768px) {
          .projects-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          .project-dashed-card {
            box-shadow: 6px 6px 0 0 #1C202B;
          }
          .project-card-header {
            height: 160px;
          }
          .project-card-body {
            padding: 20px 16px 16px 16px;
          }
          .project-card-btn {
            min-height: 48px;
            padding: 14px 20px;
          }
          .modal-details-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          .agrocare-photo-grid {
            grid-template-columns: 1fr;
          }
          .agrocare-photo-grid img {
            height: 220px;
          }
          .modal-footer {
            flex-direction: column;
            align-items: stretch;
            gap: 12px;
          }
          .walkthrough-player {
            width: 100%;
          }
          .modal-action-btn {
            min-height: 48px;
            width: 100%;
            justify-content: center;
          }
          .project-modal-container {
            max-height: 95vh;
            border-radius: 4px;
          }
          .project-modal-body {
            padding: 20px 16px;
          }
          .project-modal-header {
            padding: 16px 20px;
          }
        }
      `}</style>
    </section>
  );
}
