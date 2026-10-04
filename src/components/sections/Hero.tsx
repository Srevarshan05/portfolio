"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

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
    <section id="home" aria-labelledby="hero-title">
      {/* The name and title live inside the hand-drawn hero artwork; this gives them to search engines and screen readers */}
      <h1 id="hero-title" className="sr-only">Sre Varshan — Applied AI Engineer, building the next generation of intelligence</h1>

      {/* Hero artwork on its own layer, edges masked so the paper melts into the page colour */}
      <div className="hero-art" aria-hidden="true" />

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
            position={[0, 0, 16.5]}
            gravity={[0, -40, 0]}
            frontImage="/photos/Profile Home page.jpeg"
            imageFit="cover"
            lanyardWidth={1.2}
            cardXOffset={3.5}
          />
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
        <span style={{ fontFamily: "'Geist', sans-serif", fontSize: "10px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "2px", color: "var(--color-body-subtle)" }}>Scroll</span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-body-subtle)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </div>

      <style>{`
        #home {
          position: relative;
          height: 100vh;
          display: flex;
          align-items: center;
          padding-top: 90px;
          /* average of the artwork's own paper edges */
          background-color: #F1EEE6;
          overflow: hidden;
        }
        .hero-art {
          position: absolute;
          top: 90px;
          left: 50%;
          transform: translateX(-50%);
          width: min(100%, calc((100vh - 90px) * 1.7902));
          aspect-ratio: 1024 / 572;
          background: url('/hero.png') center / 100% 100% no-repeat;
          z-index: 0;
          pointer-events: none;
          /* fade all four edges; intersected so the corners fade too */
          -webkit-mask-image:
            linear-gradient(to right, transparent 0%, #000 9%, #000 91%, transparent 100%),
            linear-gradient(to bottom, transparent 0%, #000 7%, #000 86%, transparent 100%);
          -webkit-mask-composite: source-in;
          mask-image:
            linear-gradient(to right, transparent 0%, #000 9%, #000 91%, transparent 100%),
            linear-gradient(to bottom, transparent 0%, #000 7%, #000 86%, transparent 100%);
          mask-composite: intersect;
        }
        @keyframes heroFloat {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-10px); }
        }
        @keyframes pulseGreen {
          0%, 100% { box-shadow: 0 0 0 0px rgba(43,176,74,0.4); }
          50%       { box-shadow: 0 0 0 5px rgba(43,176,74,0); }
        }
        @media (max-width: 960px) {
          #home {
            padding-top: var(--nav-h);
            height: calc(100vw / 1.7902 + var(--nav-h)) !important;
            min-height: unset !important;
            align-items: flex-end !important;
          }
          .hero-art {
            top: var(--nav-h);
            width: 100%;
            -webkit-mask-image:
              linear-gradient(to right, transparent 0%, #000 5%, #000 95%, transparent 100%),
              linear-gradient(to bottom, #000 0%, #000 90%, transparent 100%);
            mask-image:
              linear-gradient(to right, transparent 0%, #000 5%, #000 95%, transparent 100%),
              linear-gradient(to bottom, #000 0%, #000 90%, transparent 100%);
          }
          .hero-lanyard-canvas {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
