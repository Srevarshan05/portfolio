"use client";

import { useState } from "react";

export default function ConsoleSection() {
  const [hovered, setHovered] = useState(false);

  return (
    <section
      id="console"
      className="section section-light"
      style={{
        borderTop: "4px solid var(--border-default)",
        padding: "100px 40px",
        background: "#F4F6FF",
      }}
    >
      <div className="container" style={{ textAlign: "center" }}>
        {/* Section Header */}
        <div className="section-header section-header-center">
          <div className="eyebrow" style={{ justifyContent: "center" }}>
            Interactive Terminal
          </div>
          <h2>Download my Resume</h2>
          <p className="normal" style={{ margin: "0 auto", maxWidth: "600px" }}>
            Grab my resume directly from the retro workstation console or view my current location.
          </p>
        </div>

        {/* Side-by-side layout: Retro computer & Map Card */}
        <div
          className="console-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 0.8fr",
            gap: "48px",
            alignItems: "stretch",
            maxWidth: "1150px",
            margin: "0 auto",
          }}
        >
          {/* Retro Computer card */}
          <div
            className="reveal reveal-left"
            style={{
              position: "relative",
              border: "8px dashed var(--border-default)",
              borderRadius: "var(--radius-base)",
              boxShadow: "var(--shadow-md)",
              overflow: "hidden",
              background: "#A1C7E6",
              transition: "all 300ms cubic-bezier(0.22, 1, 0.36, 1)",
              transform: hovered ? "translateY(-4px)" : "translateY(0)",
              display: "flex",
              alignItems: "center",
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <img
              src="/Jukebox-Convert--to-Outlines-Header.webp"
              alt="Retro Workstation Terminal"
              style={{
                width: "100%",
                height: "auto",
                display: "block",
                transition: "transform 500ms cubic-bezier(0.22, 1, 0.36, 1)",
                transform: hovered ? "scale(1.02)" : "scale(1)",
              }}
            />

            {/* Solid Screen Card Overlay covering the original screen size exactly */}
            <div
              style={{
                position: "absolute",
                top: "26.4%",
                left: "37.1%",
                width: "21.3%",
                height: "30.0%",
                background: "#E36C2C",
                borderRadius: "4px",
                boxShadow: "inset 0 0 12px rgba(0,0,0,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 10,
              }}
            >
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-dark"
                style={{
                  fontSize: "clamp(8px, 1.1vw, 14px)",
                  padding: "clamp(6px, 0.8vw, 11px) clamp(10px, 1.4vw, 20px)",
                  border: "0",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  whiteSpace: "nowrap",
                  transform: hovered ? "scale(1.05)" : "scale(1)",
                  transition: "transform 150ms",
                  boxShadow: "var(--shadow-2xs)",
                  borderRadius: "0",
                }}
              >
                Get Resume
              </a>
            </div>
          </div>

          {/* Map Card */}
          <div
            className="card card-interactive reveal reveal-right"
            style={{
              background: "white",
              padding: "28px",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              justifyContent: "center",
              alignItems: "stretch",
            }}
          >
            {/* Location details */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span style={{ fontSize: "24px" }}>📍</span>
              <div style={{ textAlign: "left" }}>
                <h4 style={{ fontFamily: "'Bangers', cursive", fontSize: "22px", color: "#1C202B", marginBottom: "4px", textTransform: "uppercase" }}>
                  Current Location
                </h4>
                <div style={{ fontFamily: "'Open Sans', sans-serif", fontSize: "14px", fontWeight: 700, color: "var(--fg-brand)" }}>
                  Chennai, Tamil Nadu
                </div>
                <div style={{ fontFamily: "'Open Sans', sans-serif", fontSize: "11px", color: "var(--color-body-subtle)", marginTop: "2px" }}>
                  India · IST (UTC+5:30)
                </div>
              </div>
            </div>

            {/* Map Image Widget */}
            <div
              style={{
                width: "100%",
                borderRadius: "2px",
                border: "3px solid var(--border-default)",
                boxShadow: "var(--shadow-xs)",
                overflow: "hidden",
                position: "relative",
                background: "#F4F6FF"
              }}
            >
              <img
                src="/Location.jpg"
                alt="My Location map: Chennai, India"
                style={{
                  width: "100%",
                  height: "230px",
                  objectFit: "cover",
                  display: "block"
                }}
              />
              {/* Coordinate label */}
              <div style={{
                position: "absolute",
                bottom: "8px",
                right: "8px",
                background: "rgba(20,23,31,0.9)",
                color: "white",
                padding: "3px 8px",
                fontSize: "9px",
                fontWeight: 700,
                fontFamily: "monospace",
                borderRadius: "2px",
                border: "1px solid rgba(255,255,255,0.2)"
              }}>
                13.0827° N, 80.2707° E
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .console-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
        }
      `}</style>
    </section>
  );
}
