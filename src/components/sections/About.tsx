"use client";

import { useRef } from "react";
import { useScrollReveal } from "@/lib/useScrollReveal";

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef as React.RefObject<HTMLElement>);

  return (
    <section
      id="about"
      className="section"
      ref={sectionRef}
      style={{
        background: "#120F17", // Rich dark background matching Visual Archive
        borderTop: "4px solid var(--border-default)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="container section-content">
        <div
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
          style={{ width: "100%" }}
        >
          {/* ── Column 1: Profile photo (Spans 5) ── */}
          <div
            className="lg:col-span-5 flex justify-center lg:justify-start"
            style={{ width: "100%" }}
          >
            {/* Profile Image Container */}
            <div
              className="profile-widget-container reveal reveal-left"
              style={{
                position: "relative",
                width: "100%",
                maxWidth: "380px", // Larger Profile Image (was 320px)
                aspectRatio: "1/1",
              }}
            >
              {/* Cyan Offset Background Block */}
              <div
                className="profile-shadow-block"
                aria-hidden="true"
                style={{
                  position: "absolute",
                  top: "16px",
                  left: "16px",
                  right: "-16px",
                  bottom: "-16px",
                  backgroundColor: "var(--cyan)",
                  border: "3px solid #000",
                  zIndex: 1,
                }}
              />

              {/* Yellow Image Frame Block */}
              <div
                className="profile-frame-block"
                style={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                  backgroundColor: "#FFD984", // Warning yellow
                  border: "3px solid #000",
                  zIndex: 2,
                  overflow: "hidden",
                }}
              >
                <img
                  src="/Profile.jpg"
                  alt="Sre Varshan Portrait"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    mixBlendMode: "multiply",
                    filter: "grayscale(1) contrast(1.15)",
                  }}
                />
              </div>
            </div>
          </div>

          {/* ── Column 2: Text content + stats (Spans 4) ── */}
          <div className="lg:col-span-4 flex flex-col items-start">
            {/* Orange Slanted Badge */}
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
                transform: "rotate(-2deg)",
                transformOrigin: "left center",
                marginBottom: "16px",
                boxShadow: "2px 2px 0 0 #000",
              }}
            >
              Meet Sre Varshan
            </div>

            {/* ObliqueBang Heading */}
            <h2
              className="reveal reveal-left stagger-2"
              style={{
                fontFamily: "'Bangers', cursive",
                fontSize: "clamp(46px, 6vw, 76px)",
                lineHeight: "0.85",
                color: "white",
                textTransform: "uppercase",
                transform: "skewX(-6deg)",
                marginBottom: "24px",
                letterSpacing: "1.5px",
              }}
            >
              SRE <br />
              VARSHAN
            </h2>

            {/* Primary Paragraph */}
            <p
              className="reveal stagger-3"
              style={{
                fontFamily: "'Open Sans', sans-serif",
                fontSize: "clamp(15px, 2.2vw, 18px)",
                fontWeight: 600,
                lineHeight: "1.6",
                color: "white",
                marginBottom: "18px",
              }}
            >
              Pre-final year AI/ML engineer with a published patent, building
              offline-first intelligent systems and low-latency healthcare
              automation.
            </p>

            {/* Secondary Paragraph */}
            <p
              className="reveal stagger-4"
              style={{
                fontFamily: "'Open Sans', sans-serif",
                fontSize: "14px",
                lineHeight: "1.65",
                color: "var(--neutral-quaternary)",
                marginBottom: "28px",
              }}
            >
              After designing natural language database agents that cut medical data entry by 90%
              at EmedLogix, and deploying offline IoT ML classifiers with Microsoft, I realized
              that modern AI belongs at the edge. I build robust, production-grade intelligence
              that runs locally, securely, and efficiently.
            </p>

            {/* Blocky inline stats row */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "20px",
                width: "100%",
                borderTop: "2px dashed rgba(255,255,255,0.12)",
                paddingTop: "20px",
                alignItems: "center",
              }}
            >
              {/* Stat 1 */}
              <div className="reveal reveal-scale stagger-5" style={{ display: "flex", flexDirection: "column" }}>
                <span
                  style={{
                    fontFamily: "'Bangers', cursive",
                    fontSize: "38px",
                    color: "white",
                    lineHeight: "1",
                    transform: "skewX(-6deg)",
                  }}
                >
                  1
                </span>
                <span
                  style={{
                    fontFamily: "'Open Sans', sans-serif",
                    fontSize: "10px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    color: "var(--neutral-quaternary)",
                    marginTop: "4px",
                  }}
                >
                  Patent Filed
                </span>
              </div>

              {/* Divider */}
              <div
                aria-hidden="true"
                className="hidden sm:block"
                style={{
                  width: "2px",
                  height: "32px",
                  backgroundColor: "rgba(255,255,255,0.12)",
                }}
              />

              {/* Stat 2 */}
              <div className="reveal reveal-scale stagger-6" style={{ display: "flex", flexDirection: "column" }}>
                <span
                  style={{
                    fontFamily: "'Bangers', cursive",
                    fontSize: "38px",
                    color: "white",
                    lineHeight: "1",
                    transform: "skewX(-6deg)",
                  }}
                >
                  98%
                </span>
                <span
                  style={{
                    fontFamily: "'Open Sans', sans-serif",
                    fontSize: "10px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    color: "var(--neutral-quaternary)",
                    marginTop: "4px",
                  }}
                >
                  Model Accuracy
                </span>
              </div>

              {/* Divider */}
              <div
                aria-hidden="true"
                className="hidden sm:block"
                style={{
                  width: "2px",
                  height: "32px",
                  backgroundColor: "rgba(255,255,255,0.12)",
                }}
              />

              {/* Stat 3 */}
              <div className="reveal reveal-scale stagger-7" style={{ display: "flex", flexDirection: "column" }}>
                <span
                  style={{
                    fontFamily: "'Bangers', cursive",
                    fontSize: "38px",
                    color: "white",
                    lineHeight: "1",
                    transform: "skewX(-6deg)",
                  }}
                >
                  3+
                </span>
                <span
                  style={{
                    fontFamily: "'Open Sans', sans-serif",
                    fontSize: "10px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    color: "var(--neutral-quaternary)",
                    marginTop: "4px",
                  }}
                >
                  AI Products Shipped
                </span>
              </div>
            </div>
          </div>

          {/* ── Column 3: Map widget (Spans 3) ── */}
          <div
            className="lg:col-span-3 flex justify-center lg:justify-end"
            style={{ width: "100%" }}
          >
            <div className="reveal reveal-right" style={{ display: "flex", flexDirection: "column", width: "100%", maxWidth: "330px" }}>
              {/* Title above the map */}
              <div
                style={{
                  fontFamily: "'Bangers', cursive",
                  fontSize: "20px",
                  color: "var(--brand)",
                  textTransform: "uppercase",
                  letterSpacing: "1.5px",
                  transform: "skewX(-6deg)",
                  marginBottom: "12px",
                }}
              >
                BASED IN
              </div>

              {/* Map Image Container */}
              <div
                className="map-widget-container"
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "1.5/1",
                }}
              >
                {/* Pink Offset Background Block */}
                <div
                  className="map-shadow-block"
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    top: "12px",
                    left: "12px",
                    right: "-12px",
                    bottom: "-12px",
                    backgroundColor: "var(--brand)", // Pink shadow for map
                    border: "3px solid #000",
                    zIndex: 1,
                  }}
                />

                {/* White Map Frame Block */}
                <div
                  className="map-frame-block"
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    backgroundColor: "#FFFFFF",
                    border: "3px solid #000",
                    zIndex: 2,
                    overflow: "hidden",
                  }}
                >
                  <img
                    src="/Location.jpg"
                    alt="My Location map: Chennai, India"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                  {/* Coordinate label */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: "6px",
                      right: "6px",
                      background: "rgba(20,23,31,0.9)",
                      color: "white",
                      padding: "2px 6px",
                      fontSize: "8px",
                      fontWeight: 700,
                      fontFamily: "monospace",
                      borderRadius: "2px",
                      border: "1px solid rgba(255,255,255,0.2)",
                    }}
                  >
                    13.0827° N, 80.2707° E
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .profile-widget-container {
          cursor: pointer;
        }
        .profile-shadow-block, .profile-frame-block {
          transition: transform 250ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .profile-widget-container:hover .profile-frame-block {
          transform: translate(-6px, -6px);
        }
        .profile-widget-container:hover .profile-shadow-block {
          transform: translate(6px, 6px);
        }

        .map-widget-container {
          cursor: pointer;
        }
        .map-shadow-block, .map-frame-block {
          transition: transform 250ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .map-widget-container:hover .map-frame-block {
          transform: translate(-6px, -6px);
        }
        .map-widget-container:hover .map-shadow-block {
          transform: translate(6px, 6px);
        }
      `}</style>
    </section>
  );
}
