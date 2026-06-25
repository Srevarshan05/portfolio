"use client";

import { useRef, useState, useEffect } from "react";
import { useScrollReveal } from "@/lib/useScrollReveal";
import { SmoothCursor } from "../ui/smooth-cursor";

export default function ConnectSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef as React.RefObject<HTMLElement>);

  const [isHovering, setIsHovering] = useState(false);
  const [gmailCardOpen, setGmailCardOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile for popup positioning
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Close card when clicking outside
  useEffect(() => {
    const handleOutsideClick = () => {
      setGmailCardOpen(false);
    };
    if (gmailCardOpen) {
      window.addEventListener("click", handleOutsideClick);
    }
    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, [gmailCardOpen]);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText("srevarshan9600622@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSend = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open("mailto:srevarshan9600622@gmail.com", "_blank");
  };

  return (
    <section
      id="connect"
      className="section"
      ref={sectionRef}
      style={{
        background: "#000000", // Dark base color to blend into Contact-me-dark
        aspectRatio: "1024 / 572", // Matches the exact aspect ratio of the image
        width: "100%",
        position: "relative",
        padding: 0,
        overflow: "hidden",
      }}
    >
      {/* Smooth trailing glow cursor active only in this section */}
      <SmoothCursor isHovering={isHovering} />

      {/* Animated Background Layer */}
      <div className="connect-bg-layer reveal-scale" />

      {/* Absolute overlays for interactive link regions */}
      <div
        className="reveal stagger-2"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          zIndex: 5,
        }}
      >
        {/* Gmail Toggle Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setGmailCardOpen(!gmailCardOpen);
          }}
          style={{
            position: "absolute",
            left: "4.5%",
            top: "30%",
            width: "22%",
            height: "18%",
            cursor: "pointer",
            zIndex: 10,
            background: "none",
            border: "none",
            padding: 0,
          }}
          className="connect-link"
          title="Gmail Details"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        />

        {/* Gmail Popup Card */}
        {gmailCardOpen && (
          <div
            className="gmail-popup-card reveal"
            style={isMobile ? {
              // On mobile: fixed center-screen so overflow:hidden can't clip it
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 9999,
              background: "#FFFFFF",
              border: "3px solid #1C202B",
              boxShadow: "6px 6px 0 0 #1C202B",
              padding: "20px",
              width: "min(300px, 88vw)",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              borderRadius: "4px",
            } : {
              // Desktop: absolute inside the section
              position: "absolute",
              left: "6%",
              top: "49%",
              zIndex: 100,
              background: "#FFFFFF",
              border: "3px solid #1C202B",
              boxShadow: "6px 6px 0 0 #1C202B",
              padding: "20px",
              width: "320px",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              borderRadius: "4px",
            }}
            onClick={(e) => e.stopPropagation()} // Prevent closing popup when clicking inside it
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontFamily: "'Bangers', cursive", fontSize: "20px", color: "#1C202B", letterSpacing: "0.5px", textTransform: "uppercase" }}>
                Gmail
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setGmailCardOpen(false);
                }}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "18px",
                  color: "#1C202B",
                  fontWeight: "bold",
                }}
              >
                ×
              </button>
            </div>
            
            <div
              style={{
                fontFamily: "'Open Sans', sans-serif",
                fontSize: "12px",
                fontWeight: 700,
                color: "#1C202B",
                background: "#DFE7FF",
                padding: "8px 12px",
                border: "2px solid #1C202B",
                wordBreak: "break-all",
              }}
            >
              srevarshan9600622@gmail.com
            </div>

            <div style={{ display: "flex", gap: "10px", marginTop: "4px" }}>
              <button
                onClick={handleCopy}
                className="btn btn-secondary btn-sm"
                style={{
                  flex: 1,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  border: "2px solid #1C202B",
                  fontSize: "12px",
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
                {copied ? "Copied!" : "Copy"}
              </button>
              <button
                onClick={handleSend}
                className="btn btn-brand btn-sm"
                style={{
                  flex: 1,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  fontSize: "12px",
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                Send Email
              </button>
            </div>
          </div>
        )}

        {/* Github Link */}
        <a
          href="https://github.com/Srevarshan05"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            position: "absolute",
            left: "52%",
            top: "8%",
            width: "26%",
            height: "18%",
            cursor: "pointer",
            zIndex: 10,
          }}
          className="connect-link"
          title="Sre Varshan on GitHub"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        />

        {/* LinkedIn Link */}
        <a
          href="https://www.linkedin.com/in/srevarshan05/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            position: "absolute",
            left: "68%",
            top: "41%",
            width: "27%",
            height: "18%",
            cursor: "pointer",
            zIndex: 10,
          }}
          className="connect-link"
          title="Sre Varshan on LinkedIn"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        />
      </div>

      <style>{`
        #connect {
          cursor: none !important;
        }
        #connect a, #connect button {
          cursor: none !important;
        }
        .connect-bg-layer {
          position: absolute;
          inset: 0;
          background-image: linear-gradient(to top, #000000 0%, rgba(0, 0, 0, 0) 15%), url('/Connect.png');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          z-index: 1;
          pointer-events: none;
          
          /* Smoothly fade the paper background at the top into var(--dark-strong) without overlaying dark color on the content */
          -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 10%);
          mask-image: linear-gradient(to bottom, transparent 0%, black 10%);
        }
        .connect-link {
          transition: background-color 300ms ease, box-shadow 300ms ease, transform 300ms ease;
          border-radius: 16px !important; /* Rounded rectangle matching the logos */
          border: none !important; /* No dashed border box */
        }
        .connect-link:hover {
          background-color: rgba(45, 207, 160, 0.08) !important;
          box-shadow: 0 0 24px 8px rgba(45, 207, 160, 0.35) !important;
          transform: scale(1.03);
        }
        @media (max-width: 1023px) {
          #connect {
            aspect-ratio: 1024 / 572 !important;
            overflow: hidden !important;
          }
        }
        @media (max-width: 767px) {
          #connect {
            aspect-ratio: 1024 / 572 !important;
            /* No overflow:hidden — Gmail popup uses position:fixed and must not be clipped */
            overflow: visible !important;
            background: var(--section-light) !important;
          }
          .connect-bg-layer {
            position: absolute !important;
            inset: 0 !important;
            width: 100% !important;
            height: 100% !important;
            background-size: cover !important;
            background-position: center center !important;
            -webkit-mask-image: none !important;
            mask-image: none !important;
          }
          #connect a, #connect button {
            cursor: pointer !important;
          }
          #connect {
            cursor: auto !important;
          }
        }
        @media (max-width: 479px) {
          #connect {
            aspect-ratio: 1024 / 640 !important;
          }
        }
      `}</style>
    </section>
  );
}
