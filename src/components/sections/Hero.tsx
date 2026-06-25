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
    <section id="home">

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
        <span style={{ fontFamily: "'Open Sans', sans-serif", fontSize: "10px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "2px", color: "var(--color-body-subtle)" }}>Scroll</span>
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
          background-image: 
            linear-gradient(to right, #f3f1e5 0%, rgba(243, 241, 229, 0) 15%, rgba(243, 241, 229, 0) 85%, #f3f1e5 100%),
            linear-gradient(to top, #f3f1e5 0%, rgba(243, 241, 229, 0) 10%),
            url('/hero.png');
          background-position: center top, center top, center top;
          background-size: 100% 100%, 100% 100%, contain;
          background-repeat: no-repeat, no-repeat, no-repeat;
          background-origin: padding-box, padding-box, content-box;
          background-color: #f3f1e5;
          overflow: hidden;
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
            /* padding-top creates the space below the nav bar */
            padding-top: var(--nav-h);
            /* Height = image height (aspect ratio) + nav height */
            height: calc(100vw / 1.7902 + var(--nav-h)) !important;
            min-height: unset !important;
            /* background-origin: content-box pushes the image to start AFTER padding-top */
            background-origin: padding-box, padding-box, content-box !important;
            background-size: 100% 100%, 100% 100%, 100% 100% !important;
            background-position: center, center, center !important;
            align-items: flex-end !important;
          }
          .hero-lanyard-canvas {
            display: none !important;
          }
        }
        @media (max-width: 767px) {
          #home {
            padding-top: var(--nav-h) !important;
            height: calc(100vw / 1.7902 + var(--nav-h)) !important;
            min-height: unset !important;
            /* content-box: image starts below the nav padding */
            background-origin: padding-box, padding-box, content-box !important;
            background-size: 100% 100%, 100% 100%, 100% 100% !important;
            background-position: center, center, center !important;
            background-image:
              linear-gradient(to right, #f3f1e5 0%, rgba(243,241,229,0) 6%, rgba(243,241,229,0) 94%, #f3f1e5 100%),
              linear-gradient(to top, #f3f1e5 0%, rgba(243,241,229,0) 8%),
              url('/hero.png') !important;
            background-color: #f3f1e5;
            overflow: hidden !important;
          }
          .hero-lanyard-canvas {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
