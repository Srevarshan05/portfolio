"use client";

import { useRef, useState, useEffect } from "react";
import { useScrollReveal } from "@/lib/useScrollReveal";

interface Achievement {
  id: string;
  emoji: string;
  title: string;
  subtitle: string;
  description: string;
  accent: string;
  accentBg: string;
  image: string;
}

const ACHIEVEMENTS: Achievement[] = [
  {
    id: "niftem",
    emoji: "🎥",
    title: "2nd Prize — Video Making",
    subtitle: "NIFTEM Tanjore | Rs. 3,000 Prize",
    description: "Won second prize in the national video production competition for creative storytelling and execution.",
    accent: "var(--brand)",
    accentBg: "rgba(226,45,109,0.15)",
    image: "/photos/WhatsApp Image 2026-06-24 at 10.55.18 AM (32).jpeg"
  },
  {
    id: "uzhavu",
    emoji: "🌱",
    title: "Top 8 National — NAF Uzhavu",
    subtitle: "IIT Madras | IIM Mentorship",
    description: "Recognized as a Top 8 national finalist at IIT Madras and selected for the prestigious IIM Product Commercialisation Mentorship.",
    accent: "var(--indigo)",
    accentBg: "rgba(77,91,255,0.12)",
    image: "/photos/WhatsApp Image 2026-06-24 at 10.55.18 AM (24).jpeg"
  },
  {
    id: "goa",
    emoji: "🛸",
    title: "IIT Goa National Workshop",
    subtitle: "5-Day AIML & Drone Training",
    description: "Completed an intensive hands-on national level workshop at IIT Goa focused on Autonomous Drones and Edge AI/ML applications.",
    accent: "var(--purple)",
    accentBg: "rgba(162,61,219,0.12)",
    image: "/photos/WhatsApp Image 2026-06-24 at 10.55.18 AM (1).jpeg"
  },
  {
    id: "iic",
    emoji: "💡",
    title: "IIC Regional Meet 2025",
    subtitle: "Best Innovation Across South",
    description: "Awarded the Best Innovation accolade across the Southern region at the Thirunelveli regional meetup.",
    accent: "var(--teal)",
    accentBg: "rgba(45,207,160,0.12)",
    image: "/photos/IMG_3057.jpeg"
  },
  {
    id: "dindugal",
    emoji: "🔬",
    title: "Dindugal Science Fest",
    subtitle: "7-Day Pitching & Networking",
    description: "Successfully pitched our edge computing product to CEOs, founders, high-ranking government officers, and domain experts.",
    accent: "var(--warning)",
    accentBg: "rgba(255,176,32,0.12)",
    image: "/photos/IMG_3045.jpeg"
  },
  {
    id: "outreach",
    emoji: "🏫",
    title: "AI School Outreach Program",
    subtitle: "Government School Careers in AI",
    description: "Organized educational sessions for higher secondary students to introduce AI careers and provide hands-on experience with edge hardware.",
    accent: "var(--brand)",
    accentBg: "rgba(226,45,109,0.15)",
    image: "/photos/new2.jpg"
  },
  {
    id: "patent",
    emoji: "🏛️",
    title: "Government Patent Published",
    subtitle: "App No. 202541116228 A",
    description: "Filed and published a government patent for a novel acoustic-sensing system for early banana weevil detection on edge hardware.",
    accent: "var(--indigo)",
    accentBg: "rgba(77,91,255,0.12)",
    image: "/photos/banana-weevil-setup.jpg"
  },
  {
    id: "tensor",
    emoji: "⚡",
    title: "Organized TENSOR'26 Hackathon",
    subtitle: "National Level AI Hackathon",
    description: "Core organizer and developer managing infrastructure, scheduling, and participant experience for a national-scale hackathon.",
    accent: "var(--purple)",
    accentBg: "rgba(162,61,219,0.12)",
    image: "/photos/new1.jpg"
  },
  {
    id: "foss",
    emoji: "🎨",
    title: "FOSS Design Head",
    subtitle: "SRM IST Trichy FOSS Society",
    description: "Led the design team for the Free and Open Source Software (FOSS) society, creating branding and UI assets for community projects.",
    accent: "var(--teal)",
    accentBg: "rgba(45,207,160,0.12)",
    image: "/photos/WhatsApp Image 2026-06-24 at 10.55.18 AM (30).jpeg"
  }
];

const ALL = [...ACHIEVEMENTS, ...ACHIEVEMENTS];

interface Featured {
  id: string;
  photo: string;
  photoAlt: string;
  tag: string;
  kicker: string;
  title: string;
  text: React.ReactNode;
  chips: string[];
  person?: { img: string; name: string; role: string };
  team?: string;
}

const FEATURED: Featured[] = [
  {
    id: "mcc",
    photo: "/mcc/group.webp",
    photoAlt: "Team CocoSense with Prof. Minoru Sasaki at the SRM Nihon Culture and Education Centre",
    tag: "Best Presentation · $50 cash prize",
    kicker: "Latest · Micro-Credential Course, SRM IST Trichy × Gifu University",
    title: "Best Presentation at the Physical AI & Robotics MCC",
    text: (
      <>
        My first in-person course taught by an international professor: five days on AI, robotics, Physical AI, sensing and
        autonomous systems, plus a window into Japanese culture and work life. On the final day our team turned a real-world use case
        into <strong>CocoSense</strong>, an autonomous drone that maps coconut plantations and flags affected trees for targeted treatment
        instead of blanket pesticide spraying.
      </>
    ),
    chips: ["Edge AI", "Computer Vision", "LiDAR", "SLAM", "GPS", "Jetson Orin Nano"],
    person: { img: "/mcc/prof-sasaki.webp", name: "Prof. Minoru Sasaki", role: "Professor Emeritus, Gifu University, Japan" },
    team: "With Sushma Karthikeyan, Raga Amirtha A, Madhan Kumar and Bumeeswar S.",
  },
  {
    id: "spectrum",
    photo: "/mcc/spectrum.webp",
    photoAlt: "Winning teams on stage at Spectrum '25, VIT Chennai",
    tag: "1st Prize · $500 in prizes",
    kicker: "National hackathon · Spectrum '25, VIT Chennai",
    title: "1st Prize at Spectrum '25 with AgroCare",
    text: (
      <>
        Built in just <strong>24 hours</strong>: <strong>AgroCare</strong>, a precision farming platform for cotton that combines a custom
        soil probe, drone crop imaging, CNN disease detection and LLM-guided advice for farmers. It won first place against top
        university teams for joining practical hardware, AI and farmer-focused decision support.
      </>
    ),
    chips: ["ESP32 + LoRa", "Soil pH / NPK probe", "Drone imaging + SLAM", "CNN disease detection", "LLM advice"],
  },
  {
    id: "solvex",
    photo: "/mcc/solvex.webp",
    photoAlt: "Receiving the first place certificate at the SolveX AI Challenge",
    tag: "1st Place · Rs. 5,000 prize",
    kicker: "AI challenge · SolveX AI",
    title: "1st Place at the SolveX AI Challenge",
    text: (
      <>
        Awarded first place for building outstanding AI prototypes that address real-world operational challenges.
      </>
    ),
    chips: ["Applied AI", "Rapid prototyping"],
  },
];

export default function AchievementsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef as React.RefObject<HTMLElement>);

  const [activeImage, setActiveImage] = useState<string | null>(null);

  return (
    <section 
      id="achievements" 
      className="section" 
      ref={sectionRef} 
      style={{ 
        paddingLeft: 0, 
        paddingRight: 0, 
        background: "var(--dark-strong)", 
        position: "relative" 
      }}
    >
      {/* Header */}
      <div className="section-content" style={{ padding: "0 40px", marginBottom: "64px" }}>
        <div className="container" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px", alignItems: "flex-end" }}>
          <div className="reveal reveal-left">
            <div className="eyebrow" style={{ color: "var(--fg-brand)", display: "flex", alignItems: "center", gap: "8px" }}>
              <img src="/icons/trophy.png" alt="" style={{ width: "16px", height: "16px", objectFit: "contain" }} />
              Highlights
            </div>
            <h2 style={{ color: "white", marginBottom: 0, display: "flex", alignItems: "center", gap: "12px" }}>
              <span>The Trophy Room</span>
              <img src="/icons/trophy.png" alt="Trophy" style={{ width: "54px", height: "54px", objectFit: "contain" }} />
            </h2>
          </div>
          <div className="reveal reveal-right" style={{ paddingBottom: "4px" }}>
            <p className="leading" style={{ color: "var(--neutral-primary-soft)", opacity: 0.8 }}>
              A few things I&apos;m proud of — from government patents to hackathon wins and community impact.
            </p>
          </div>
        </div>
      </div>

      {/* ── Featured achievements ── */}
      <div className="section-content mcc-wrap">
        {FEATURED.map((f, i) => (
          <article key={f.id} className={`mcc ${i % 2 ? "is-flip" : ""}`} aria-labelledby={`feat-${f.id}`}>
            <div className="mcc-photo">
              <img src={f.photo} alt={f.photoAlt} loading="lazy" decoding="async" />
              <span className="mcc-tag">{f.tag}</span>
            </div>
            <div className="mcc-body">
              <p className="mcc-kicker">{f.kicker}</p>
              <h3 id={`feat-${f.id}`} className="mcc-title">{f.title}</h3>
              <p className="mcc-text">{f.text}</p>
              <ul className="mcc-stack" aria-label={`${f.title}: key elements`}>
                {f.chips.map((t) => <li key={t}>{t}</li>)}
              </ul>
              {f.person && (
                <div className="mcc-prof">
                  <img src={f.person.img} alt={f.person.name} width={56} height={56} loading="lazy" />
                  <div>
                    <strong>{f.person.name}</strong>
                    <span>{f.person.role}</span>
                  </div>
                </div>
              )}
              {f.team && <p className="mcc-team">{f.team}</p>}
            </div>
          </article>
        ))}
      </div>

      {/* Marquee — full bleed with Custom Stamp themed cards */}
      <div className="section-content marquee-wrapper reveal" style={{ marginBottom: "80px" }}>
        <div className="marquee-track">
          {ALL.map((item, idx) => {
            const numberStr = String(idx + 1).padStart(2, "0");
            const badgeColors = ["#2DC8E2", "#E22D6D", "#FFB020", "#4D5BFF", "#A23DDB"];
            const badgeColor = badgeColors[idx % badgeColors.length];
            return (
              <div
                key={`${item.id}-${idx}`}
                className="stamp-card-wrapper"
                onClick={() => setActiveImage(item.image)}
                style={{
                  position: "relative",
                  width: "360px",
                  margin: "18px 14px 24px 14px",
                  flexShrink: 0,
                  filter: "drop-shadow(6px 6px 0px #1C202B)",
                  cursor: "zoom-in"
                }}
              >
                {/* Stamp Card Body */}
                <div
                  className="stamp-card"
                  style={{
                    padding: "48px 24px 24px 24px",
                    minHeight: "380px",
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {/* Dashed inset border */}
                  <div
                    style={{
                      position: "absolute",
                      inset: "12px",
                      border: "2px dashed rgba(28,32,43,0.12)",
                      pointerEvents: "none",
                      borderRadius: "2px",
                    }}
                  />

                  {/* Top Badges (Number Block only, emojis removed) */}
                  <div
                    style={{
                      position: "absolute",
                      top: "-18px",
                      left: "14px",
                      display: "flex",
                      alignItems: "center",
                      zIndex: 10,
                    }}
                  >
                    {/* Number Block */}
                    <div
                      style={{
                        width: "48px",
                        height: "44px",
                        background: badgeColor,
                        border: "3px solid #1C202B",
                        boxShadow: "3px 3px 0px #1C202B",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontFamily: "'Geist', sans-serif", fontWeight: 600,
                        fontSize: "24px",
                        color: "white",
                        letterSpacing: "-0.035em",
                      }}
                    >
                      {numberStr}
                    </div>
                  </div>

                  {/* Content */}
                  <div style={{ position: "relative", zIndex: 2 }}>
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.title}
                        style={{
                          width: "100%",
                          height: "140px",
                          objectFit: "cover",
                          borderRadius: "4px",
                          border: "2.5px solid #1C202B",
                          boxShadow: "3px 3px 0px #1C202B",
                          marginBottom: "16px",
                          display: "block"
                        }}
                      />
                    )}
                    <h4
                      style={{
                        fontFamily: "'Geist', sans-serif", fontWeight: 600,
                        fontSize: "20px",
                        color: "#1C202B",
                        letterSpacing: "-0.035em",
                        textTransform: "none",
                        marginBottom: "8px",
                        marginTop: "4px"
                      }}
                    >
                      {item.title}
                    </h4>
                    <div
                      style={{
                        fontFamily: "'Geist', sans-serif",
                        fontSize: "11px",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                        color: item.accent,
                        marginBottom: "12px"
                      }}
                    >
                      {item.subtitle}
                    </div>
                    <p
                      style={{
                        color: "var(--color-body)",
                        fontSize: "13px",
                        lineHeight: 1.6,
                        margin: 0
                      }}
                    >
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>



      {/* Full screen Lightbox Modal for enlarged stamp images */}
      {activeImage && (
        <div
          onClick={() => setActiveImage(null)}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(28, 32, 43, 0.9)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 999999,
            padding: "24px",
            backdropFilter: "blur(6px)",
            cursor: "zoom-out",
          }}
        >
          <div
            style={{
              position: "relative",
              maxWidth: "90vw",
              maxHeight: "90vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={activeImage}
              alt="Enlarged Achievement"
              style={{
                maxWidth: "100%",
                maxHeight: "90vh",
                objectFit: "contain",
                border: "4px solid #1C202B",
                boxShadow: "10px 10px 0 0 #1C202B",
                borderRadius: "6px",
                backgroundColor: "#FFFFFF",
              }}
            />
            <button
              onClick={() => setActiveImage(null)}
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
                fontFamily: "'Geist', sans-serif",
                fontSize: "20px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              title="Close Image"
            >
              ×
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes marqueeScroll3D {
          from {
            transform: translate3d(0, 0, 0);
          }
          to {
            transform: translate3d(-50%, 0, 0);
          }
        }
        .marquee-track {
          display: flex;
          width: max-content;
          animation: marqueeScroll3D 45s linear infinite;
          will-change: transform;
          backface-visibility: hidden;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
        .stamp-card {
          background-color: transparent;
          background-image:
            radial-gradient(circle at 0px 50%, transparent 6px, white 7px),
            radial-gradient(circle at 100% 50%, transparent 6px, white 7px),
            radial-gradient(circle at 50% 0px, transparent 6px, white 7px),
            radial-gradient(circle at 50% 100%, transparent 6px, white 7px),
            linear-gradient(white, white);
          background-repeat: repeat-y, repeat-y, repeat-x, repeat-x, no-repeat;
          background-position: left, right, top, bottom, center;
          background-size: 12px 24px, 12px 24px, 24px 12px, 24px 12px, calc(100% - 20px) calc(100% - 20px);
          will-change: transform;
          transform: translate3d(0, 0, 0);
          backface-visibility: hidden;
        }
        .stamp-card-wrapper {
          transition: transform 150ms cubic-bezier(0.22, 1, 0.36, 1), filter 150ms;
          will-change: transform, filter;
          transform: translate3d(0, 0, 0);
          backface-visibility: hidden;
        }
        .stamp-card-wrapper:hover {
          transform: translateY(-6px) translate3d(0, 0, 0);
          filter: drop-shadow(8px 8px 0px var(--brand)) !important;
        }
        .stamp-card-wrapper:active {
          transform: translateY(2px) translateX(2px) translate3d(0, 0, 0);
          filter: drop-shadow(2px 2px 0px #1C202B) !important;
        }
        
        /* ── Responsive: Achievements ── */
        @media (max-width: 1023px) {
          .achievements-stats-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
          #achievements .section-content {
            padding: 0 24px !important;
          }
          #achievements .container > div:first-child {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
        }
        @media (max-width: 767px) {
          .achievements-stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .achievements-stats-grid > div {
            padding: 20px 12px !important;
          }
          #achievements .section-content {
            padding: 0 16px !important;
          }
          #achievements .container > div:first-child {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
        }
      
        .mcc-wrap { padding: 0 40px; margin-bottom: 64px; display: flex; flex-direction: column; gap: 40px; }
        .mcc {
          max-width: 1240px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1.1fr);
          background: #FFFFFF;
          border: 3px solid #1C202B;
          box-shadow: 8px 8px 0 0 var(--brand);
          font-family: 'Geist', system-ui, sans-serif;
        }
        .mcc-photo { position: relative; border-right: 3px solid #1C202B; min-height: 100%; }
        .mcc.is-flip { grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr); box-shadow: 8px 8px 0 0 #FFB020; }
        .mcc.is-flip .mcc-photo { order: 2; border-right: 0; border-left: 3px solid #1C202B; }
        .mcc:nth-child(3) { box-shadow: 8px 8px 0 0 #2DC8E2; }
        .mcc-photo img { display: block; width: 100%; height: 100%; object-fit: cover; }
        .mcc-tag {
          position: absolute; left: 14px; top: 14px;
          background: #FFB020; color: #1C202B; border: 2px solid #1C202B;
          padding: 5px 10px; font-size: 12px; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase;
        }
        .mcc-body { padding: 30px 32px; display: flex; flex-direction: column; gap: 14px; }
        .mcc-kicker { margin: 0; font-family: 'Geist Mono', monospace; font-size: 11.5px; letter-spacing: 0.12em; text-transform: uppercase; color: #B11F55; }
        .mcc-title { margin: 0; font-size: clamp(24px, 2.4vw, 32px); font-weight: 600; letter-spacing: -0.03em; line-height: 1.15; color: #1C202B; text-transform: none; }
        .mcc-text { margin: 0; font-size: 15.5px; line-height: 1.65; color: #2F3645; }
        .mcc-text strong { color: #1C202B; }
        .mcc-stack { list-style: none; display: flex; flex-wrap: wrap; gap: 6px; }
        .mcc-stack li { padding: 5px 10px; border: 1.5px solid #1C202B; background: #F4F6FF; font-size: 12.5px; font-weight: 600; color: #1C202B; }
        .mcc-prof { display: flex; align-items: center; gap: 14px; padding: 12px 14px; border: 1.5px dashed rgba(28,32,43,0.3); }
        .mcc-prof img { width: 56px; height: 56px; object-fit: cover; border-radius: 50%; border: 2px solid #1C202B; }
        .mcc-prof div { display: flex; flex-direction: column; gap: 2px; }
        .mcc-prof strong { font-size: 15px; color: #1C202B; }
        .mcc-prof span { font-size: 13px; color: #4A5468; }
        .mcc-team { margin: 0; font-size: 13.5px; color: #4A5468; }
        @media (max-width: 900px) {
          .mcc-wrap { padding: 0 16px; }
          .mcc { grid-template-columns: 1fr; box-shadow: 5px 5px 0 0 var(--brand); }
          .mcc-photo { border-right: 0; border-bottom: 3px solid #1C202B; aspect-ratio: 4 / 3; }
          .mcc.is-flip { grid-template-columns: 1fr; box-shadow: 5px 5px 0 0 #FFB020; }
          .mcc.is-flip .mcc-photo { order: 0; border-left: 0; }
          .mcc:nth-child(3) { box-shadow: 5px 5px 0 0 #2DC8E2; }
          .mcc-body { padding: 22px 18px; }
        }
      `}</style>
    </section>
  );
}
