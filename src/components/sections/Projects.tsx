"use client";

import { useRef, useState } from "react";
import { useScrollReveal } from "@/lib/useScrollReveal";

const PROJECTS = [
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
    btnLink: "https://github.com/srevarshan",
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
];

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef as React.RefObject<HTMLElement>);
  
  const [activeProject, setActiveProject] = useState<typeof PROJECTS[0] | null>(null);
  const [isWorkflowOpen, setIsWorkflowOpen] = useState(false);

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

        {/* Projects Grid */}
        <div className="projects-grid">
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
                  onClick={() => setActiveProject(p)}
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
              {activeProject.id === "banana-weevil" ? (
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
                        onClick={() => setIsWorkflowOpen(true)}
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
                        onClick={() => setIsWorkflowOpen(true)}
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
                        onClick={() => setIsWorkflowOpen(true)}
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
                activeProject?.id === "acas-dhristi"
                  ? "/Acas_Workflow.png"
                  : activeProject?.id === "nutriminds"
                  ? "/Nutriminds.png"
                  : "/Banana_Weevil_Portfolio.png"
              }
              alt={
                activeProject?.id === "acas-dhristi"
                  ? "ACAS Dhristi Workflow Diagram"
                  : activeProject?.id === "nutriminds"
                  ? "NutriMinds AI Workflow Diagram"
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
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
        }
        
        .project-dashed-card {
          border-radius: 8px;
          padding: 0;
          position: relative;
          display: flex;
          flex-direction: column;
          box-shadow: 10px 10px 0 0 #1C202B;
          transition: transform 150ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 150ms;
          overflow: hidden;
        }
        .project-dashed-card:hover {
          transform: translateY(-4px);
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
          .modal-footer {
            flex-direction: column;
            align-items: stretch;
            gap: 12px;
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
