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
    id: "spectrum",
    emoji: "🏆",
    title: "1st Place — Spectrum '25",
    subtitle: "VIT Chennai | $500 Prize",
    description: "Won first place at the Spectrum '25 National Hackathon for our innovative AI solution, competing against top university teams.",
    accent: "var(--warning)",
    accentBg: "rgba(255,176,32,0.12)",
    image: "/photos/WhatsApp Image 2026-06-24 at 10.55.18 AM (11).jpeg"
  },
  {
    id: "solvex",
    emoji: "🤖",
    title: "1st Place — SolveX AI Challenge",
    subtitle: "SolveX AI | Rs. 5,000 Prize",
    description: "Awarded first place for building outstanding AI prototypes addressing real-world operational challenges.",
    accent: "var(--teal)",
    accentBg: "rgba(45,207,160,0.12)",
    image: "/photos/WhatsApp Image 2026-06-24 at 10.55.18 AM (20).jpeg"
  },
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

const STATS = [
  { value: "1",    label: "Patent Filed" },
  { value: "98%",  label: "Best Model Accuracy" },
  { value: "90%",  label: "Data Entry Automated" },
  { value: "3+",   label: "AI Products Shipped" },
  { value: "#1",   label: "Hackathon Place" },
];

export default function AchievementsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef as React.RefObject<HTMLElement>);

  const [activeImage, setActiveImage] = useState<string | null>(null);

  // Responsive columns for stats grid
  const [statsCols, setStatsCols] = useState("repeat(5, 1fr)");
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 640) setStatsCols("repeat(2, 1fr)");
      else if (w < 1024) setStatsCols("repeat(3, 1fr)");
      else setStatsCols("repeat(5, 1fr)");
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

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
                        fontFamily: "'Bangers', cursive",
                        fontSize: "24px",
                        color: "white",
                        letterSpacing: "1px",
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
                        fontFamily: "'Bangers', cursive",
                        fontSize: "20px",
                        color: "#1C202B",
                        letterSpacing: "0.5px",
                        textTransform: "uppercase",
                        marginBottom: "8px",
                        marginTop: "4px"
                      }}
                    >
                      {item.title}
                    </h4>
                    <div
                      style={{
                        fontFamily: "'Open Sans', sans-serif",
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

      {/* Stats bar */}
      <div className="section-content" style={{ padding: "0 40px" }}>
        <div className="container reveal">
          <div
            className="achievements-stats-grid"
            style={{
              display: "grid",
              gridTemplateColumns: statsCols,
              borderTop: "1px solid rgba(255,255,255,0.1)",
              borderLeft: "1px solid rgba(255,255,255,0.1)"
            }}
          >
            {STATS.map((s) => (
              <div
                key={s.label}
                style={{
                  padding: "32px 16px",
                  textAlign: "center",
                  borderRight: "1px solid rgba(255,255,255,0.1)",
                  borderBottom: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <div
                  style={{
                    padding: "4px",
                    fontFamily: "'Bangers', cursive",
                    fontSize: "44px",
                    lineHeight: 1,
                    background: "linear-gradient(135deg, var(--gradient-from), var(--gradient-to))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    marginBottom: "8px",
                  }}
                >
                  {s.value}
                </div>
                <div style={{ fontFamily: "'Open Sans', sans-serif", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px", color: "rgba(255,255,255,0.5)" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
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
                fontFamily: "'Bangers', cursive",
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
      `}</style>
    </section>
  );
}
