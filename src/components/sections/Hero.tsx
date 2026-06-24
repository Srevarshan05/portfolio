"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const ShapeGrid = dynamic(() => import("../layout/ShapeGrid"), { ssr: false });
const Lanyard = dynamic(() => import("../layout/Lanyard"), { ssr: false });

export default function HeroSection() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 120);
    return () => clearTimeout(t);
  }, []);

  const fade = (delay: number): React.CSSProperties => ({
    opacity:    loaded ? 1 : 0,
    transform:  loaded ? "translateY(0)" : "translateY(28px)",
    transition: `opacity 700ms ${delay}ms cubic-bezier(0.22,1,0.36,1),
                 transform  700ms ${delay}ms cubic-bezier(0.22,1,0.36,1)`,
  });

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="home"
      style={{
        position: "relative",
        minHeight: "100vh",
        paddingTop: "calc(var(--nav-h) + 80px)",
        paddingBottom: "80px",
        display: "flex",
        alignItems: "center",
        background: "#F4F6FF",
        overflow: "hidden",
      }}
    >
      {/* ── Interactive ShapeGrid background ── */}
      <div style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 0 }}>
        <ShapeGrid
          speed={0.25}
          squareSize={35}
          direction="diagonal"
          borderColor="#DFE7FF"
          hoverFillColor="#FFE5EE"
          shape="square"
          hoverTrailAmount={4}
        />
      </div>

      {/* ── Gradient overlay so text stays readable ── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 70% 80% at 35% 50%, rgba(244,246,255,0.85) 0%, rgba(244,246,255,0.55) 60%, transparent 100%)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      {/* ── Full page interactive 3D Lanyard Canvas ── */}
      <div 
        className="hero-lanyard-canvas"
        style={{ 
          position: "absolute", 
          inset: 0, 
          zIndex: 1,
          pointerEvents: "none"
        }}
      >
        <div style={{ width: "100%", height: "100%", pointerEvents: "auto" }}>
          <Lanyard
            position={[0, 0, 13]}
            gravity={[0, -40, 0]}
            frontImage="/photos/Profile Home page.jpeg"
            imageFit="cover"
            lanyardWidth={1.2}
            cardXOffset={1.8}
          />
        </div>
      </div>

      <div
        className="container"
        style={{ position: "relative", zIndex: 2, padding: "0 40px", pointerEvents: "none" }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 500px",
            gap: "40px",
            alignItems: "center",
          }}
        >
          {/* ── LEFT: text ── */}
          <div style={{ pointerEvents: "auto" }}>
            {/* Eyebrow */}
            <div
              style={{
                ...fade(0),
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "18px",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: "28px",
                  height: "3px",
                  background: "var(--brand)",
                  borderRadius: "2px",
                }}
              />
              <span
                style={{
                  fontFamily: "'Open Sans', sans-serif",
                  fontSize: "12px",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "2px",
                  color: "var(--fg-brand)",
                }}
              >
                Pre-final Year · AI / ML Engineer
              </span>
            </div>

            {/* H1 */}
            <h1
              style={{
                ...fade(80),
                lineHeight: 1.0,
                marginBottom: "22px",
                fontFamily: "'Bangers', cursive",
                fontSize: "clamp(52px, 7vw, 92px)",
                textTransform: "uppercase",
                letterSpacing: "2px",
                color: "var(--color-heading)",
              }}
            >
              Hi, I&apos;m{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #ff512f, #dd2476)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Sre&nbsp;Varshan.
              </span>
              <br />
              I build fast,
              <br />
              local AI systems.
            </h1>

            {/* Sub-headline */}
            <p
              style={{
                ...fade(180),
                fontFamily: "'Open Sans', sans-serif",
                fontSize: "18px",
                lineHeight: 1.7,
                color: "var(--color-body)",
                maxWidth: "520px",
                marginBottom: "40px",
              }}
            >
              Pre-final year AI/ML engineer turning complex data into
              real-world applications — from healthcare platforms to
              rural agricultural tech. I ship things that work,
              completely offline.
            </p>

            {/* CTAs */}
            <div
              style={{
                ...fade(260),
                display: "flex",
                gap: "16px",
                flexWrap: "wrap",
                marginBottom: "44px",
              }}
            >
              <button
                className="btn btn-brand btn-lg"
                onClick={() => scrollTo("contact")}
                id="hero-cta-contact"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                Let&apos;s Talk
              </button>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary btn-lg"
                id="hero-cta-resume"
                style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
              >
                <img src="/icons/cv.png" alt="CV" style={{ width: "16px", height: "16px", objectFit: "contain" }} />
                View Resume
              </a>
              <a
                href="https://github.com/srevarshan"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-dark btn-lg"
                id="hero-github"
                aria-label="GitHub profile"
                style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
              >
                <img src="/icons/github.png" alt="GitHub" style={{ width: "16px", height: "16px", objectFit: "contain" }} />
                GitHub
              </a>
            </div>

            {/* Stat pills */}
            <div
              style={{
                ...fade(340),
                display: "flex",
                gap: "10px",
                flexWrap: "wrap",
              }}
            >
              {[
                { val: "98%",  label: "Model accuracy @ Microsoft", color: "var(--brand)" },
                { val: "90%",  label: "Data entry cut @ EmedLogix", color: "var(--indigo)" },
                { val: "3+",   label: "AI products shipped",        color: "var(--teal)" },
              ].map((s) => (
                <div
                  key={s.val}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "6px 14px",
                    background: "rgba(255,255,255,0.85)",
                    border: "2px solid var(--border-default)",
                    borderRadius: "var(--radius-full)",
                    boxShadow: "var(--shadow-2xs)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  <span style={{ fontFamily: "'Bangers', cursive", fontSize: "18px", color: s.color, lineHeight: 1 }}>{s.val}</span>
                  <span style={{ fontFamily: "'Open Sans', sans-serif", fontSize: "12px", color: "var(--color-body-subtle)" }}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Interactive 3D Lanyard Placeholder ── */}
          <div
            style={{
              ...fade(420),
              display: "flex",
              flexDirection: "column",
              gap: "24px",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: "660px",
              position: "relative",
              pointerEvents: "none",
            }}
          >
            {/* Availability */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "12px 16px",
                background: "rgba(228,255,224,0.95)",
                border: "2px solid var(--border-success)",
                borderRadius: "var(--radius-base)",
                boxShadow: "var(--shadow-xs)",
                width: "100%",
                maxWidth: "340px",
                justifyContent: "center",
                pointerEvents: "auto",
                marginTop: "auto",
              }}
            >
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--success)", display: "inline-block", boxShadow: "0 0 0 3px rgba(43,176,74,0.25)", flexShrink: 0, animation: "pulseGreen 2s ease-in-out infinite" }} />
              <span style={{ fontFamily: "'Open Sans', sans-serif", fontSize: "12px", fontWeight: 700, color: "var(--fg-success)" }}>
                Open to internships &amp; collaborations
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "28px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "6px",
          animation: "heroFloat 2.8s ease-in-out infinite",
          opacity: loaded ? 0.45 : 0,
          transition: "opacity 600ms 800ms",
          zIndex: 2,
          pointerEvents: "none",
        }}
      >
        <span style={{ fontFamily: "'Open Sans', sans-serif", fontSize: "10px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "2px", color: "var(--color-body-subtle)" }}>Scroll</span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-body-subtle)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </div>

      <style>{`
        @keyframes heroFloat {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-10px); }
        }
        @keyframes pulseGreen {
          0%, 100% { box-shadow: 0 0 0 0px rgba(43,176,74,0.4); }
          50%       { box-shadow: 0 0 0 5px rgba(43,176,74,0); }
        }
        @media (max-width: 960px) {
          #home .container > div {
            grid-template-columns: 1fr !important;
          }
          #home .container > div > div:last-child {
            display: none !important;
          }
          .hero-lanyard-canvas {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
