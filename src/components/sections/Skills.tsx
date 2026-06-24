"use client";

import { useRef } from "react";
import { useScrollReveal } from "@/lib/useScrollReveal";

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef as React.RefObject<HTMLElement>);

  return (
    <section
      id="skills"
      className="section"
      ref={sectionRef}
      style={{
        backgroundColor: "#ffffff", // Solid white background matching Skills-Section-Final.png
        borderTop: "4px solid var(--border-default)",
        position: "relative",
        overflow: "hidden",
        padding: "80px 0",
      }}
    >
      <div className="flex flex-col items-center" style={{ width: "100%", maxWidth: "1400px", margin: "0 auto", padding: "0 24px" }}>
        {/* Slanted Title Badge */}
        <div
          className="reveal reveal-left stagger-1"
          style={{
            display: "inline-block",
            background: "var(--orange)", // #FF8B2D
            color: "#14171F",
            fontFamily: "'Open Sans', sans-serif",
            fontWeight: 800,
            fontSize: "12px",
            textTransform: "uppercase",
            letterSpacing: "1.5px",
            padding: "6px 14px",
            border: "2px solid #000",
            transform: "rotate(-1.5deg)",
            marginBottom: "16px",
            boxShadow: "2px 2px 0 0 #000",
          }}
        >
          Tech Stack
        </div>

        {/* Section Heading */}
        <h2
          className="reveal reveal-scale stagger-2"
          style={{
            fontFamily: "'Bangers', cursive",
            fontSize: "clamp(38px, 5vw, 64px)",
            color: "var(--color-heading)",
            textTransform: "uppercase",
            transform: "skewX(-6deg)",
            marginBottom: "32px",
            letterSpacing: "1.5px",
            textAlign: "center",
          }}
        >
          SKILL SET &amp; CAPABILITIES
        </h2>

        {/* Entire Section Image Display */}
        <div
          className="skills-image-container reveal reveal-scale stagger-3"
          style={{
            position: "relative",
            width: "100%",
            maxWidth: "1400px", // Full-width display to utilize the complete section space
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src="/Skills-Section-Final.png"
            alt="Sre Varshan Tech Stack and Skills Illustration"
            className="skills-themed-image"
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              userSelect: "none",
            }}
          />
        </div>
      </div>

      <style>{`
        .skills-image-container {
          cursor: pointer;
          width: 100%;
          display: flex;
          justify-content: center;
        }
        .skills-themed-image {
          transition: transform 450ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .skills-image-container:hover .skills-themed-image {
          transform: translateY(-8px) scale(1.015);
        }
        @media (max-width: 768px) {
          .skills-image-container:hover .skills-themed-image {
            transform: translateY(-4px) scale(1.008);
          }
        }
      `}</style>
    </section>
  );
}
