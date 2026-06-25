"use client";

import { useRef } from "react";
import { useScrollReveal } from "@/lib/useScrollReveal";
import DomeGallery from "../layout/DomeGallery";

const IMAGES = [
  {
    "src": "/photos/65F010C0-DB0B-41D2-A289-DDC08956A8DF.jpeg",
    "alt": "AI Architecture Design"
  },
  {
    "src": "/photos/F43C8DD0-AB00-45B6-B4BA-889856927836.jpeg",
    "alt": "Local Workspace Setup"
  },
  {
    "src": "/photos/IITM1.jpeg",
    "alt": "IIT Madras Research Lab"
  },
  {
    "src": "/photos/IMG_0718.jpeg",
    "alt": "Embedded System Calibration"
  },
  {
    "src": "/photos/IMG_0720.jpeg",
    "alt": "Hardware Diagnostics Bench"
  },
  {
    "src": "/photos/IMG_0755.jpeg",
    "alt": "Circuit Board Prototyping"
  },
  {
    "src": "/photos/IMG_0817.jpeg",
    "alt": "Acoustic Signal Processing"
  },
  {
    "src": "/photos/IMG_1183.jpeg",
    "alt": "Edge Intelligence Testbed"
  },
  {
    "src": "/photos/IMG_1191.jpeg",
    "alt": "Physical Computing Board"
  },
  {
    "src": "/photos/IMG_1222.jpeg",
    "alt": "Multi-sensor Node Assembly"
  },
  {
    "src": "/photos/IMG_2614.jpeg",
    "alt": "Wireless Transmitter Node"
  },
  {
    "src": "/photos/IMG_3033.jpeg",
    "alt": "Smart Medical Device Layout"
  },
  {
    "src": "/photos/IMG_3045.jpeg",
    "alt": "IoT Gateway Implementation"
  },
  {
    "src": "/photos/IMG_3051.jpeg",
    "alt": "Micro-controller Deployment"
  },
  {
    "src": "/photos/IMG_3052.jpeg",
    "alt": "Real-time Signal Modeling"
  },
  {
    "src": "/photos/IMG_3057.jpeg",
    "alt": "Sensor Interface Debug"
  },
  {
    "src": "/photos/IMG_7463.jpeg",
    "alt": "Bio-acoustic Transducer"
  },
  {
    "src": "/photos/IMG_7464.jpeg",
    "alt": "Sensor Matrix Integration"
  },
  {
    "src": "/photos/IMG_7484.jpeg",
    "alt": "Edge Network Interface"
  },
  {
    "src": "/photos/IMG_7486.jpeg",
    "alt": "Data Logging Module"
  },
  {
    "src": "/photos/IMG_7487.jpeg",
    "alt": "Acoustic Transceiver Unit"
  },
  {
    "src": "/photos/IMG_7534.jpeg",
    "alt": "Deep Learning Benchmark"
  },
  {
    "src": "/photos/new1.jpg",
    "alt": "Agricultural Tech Innovation"
  },
  {
    "src": "/photos/new2.jpg",
    "alt": "Deep Learning Node Model"
  },
  {
    "src": "/photos/new3.jpg",
    "alt": "Healthcare Signal Processing"
  },
  {
    "src": "/photos/new4.jpg",
    "alt": "Agricultural System UI"
  },
  {
    "src": "/photos/new5.jpg",
    "alt": "Brainwave Diagnostic System"
  },
  {
    "src": "/photos/new6.jpeg",
    "alt": "Edge Device Enclosure Build"
  },
  {
    "src": "/photos/Profile Home page.jpeg",
    "alt": "Engineering Log #1"
  },
  {
    "src": "/photos/WhatsApp Image 2026-06-24 at 10.55.17 AM (1).jpeg",
    "alt": "Engineering Log #2"
  },
  {
    "src": "/photos/WhatsApp Image 2026-06-24 at 10.55.17 AM (2).jpeg",
    "alt": "Engineering Log #3"
  },
  {
    "src": "/photos/WhatsApp Image 2026-06-24 at 10.55.18 AM (1).jpeg",
    "alt": "Engineering Log #4"
  },
  {
    "src": "/photos/WhatsApp Image 2026-06-24 at 10.55.18 AM (11).jpeg",
    "alt": "Engineering Log #5"
  },
  {
    "src": "/photos/WhatsApp Image 2026-06-24 at 10.55.18 AM (12).jpeg",
    "alt": "Engineering Log #6"
  },
  {
    "src": "/photos/WhatsApp Image 2026-06-24 at 10.55.18 AM (13).jpeg",
    "alt": "Engineering Log #7"
  },
  {
    "src": "/photos/WhatsApp Image 2026-06-24 at 10.55.18 AM (14).jpeg",
    "alt": "Engineering Log #8"
  },
  {
    "src": "/photos/WhatsApp Image 2026-06-24 at 10.55.18 AM (15).jpeg",
    "alt": "Engineering Log #9"
  },
  {
    "src": "/photos/WhatsApp Image 2026-06-24 at 10.55.18 AM (16).jpeg",
    "alt": "Engineering Log #10"
  },
  {
    "src": "/photos/WhatsApp Image 2026-06-24 at 10.55.18 AM (17).jpeg",
    "alt": "Engineering Log #11"
  },
  {
    "src": "/photos/WhatsApp Image 2026-06-24 at 10.55.18 AM (18).jpeg",
    "alt": "Engineering Log #12"
  },
  {
    "src": "/photos/WhatsApp Image 2026-06-24 at 10.55.18 AM (19).jpeg",
    "alt": "Engineering Log #13"
  },
  {
    "src": "/photos/WhatsApp Image 2026-06-24 at 10.55.18 AM (2).jpeg",
    "alt": "Engineering Log #14"
  },
  {
    "src": "/photos/WhatsApp Image 2026-06-24 at 10.55.18 AM (20).jpeg",
    "alt": "Engineering Log #15"
  },
  {
    "src": "/photos/WhatsApp Image 2026-06-24 at 10.55.18 AM (21).jpeg",
    "alt": "Engineering Log #16"
  },
  {
    "src": "/photos/WhatsApp Image 2026-06-24 at 10.55.18 AM (22).jpeg",
    "alt": "Engineering Log #17"
  },
  {
    "src": "/photos/WhatsApp Image 2026-06-24 at 10.55.18 AM (23).jpeg",
    "alt": "Engineering Log #18"
  },
  {
    "src": "/photos/WhatsApp Image 2026-06-24 at 10.55.18 AM (24).jpeg",
    "alt": "Engineering Log #19"
  },
  {
    "src": "/photos/WhatsApp Image 2026-06-24 at 10.55.18 AM (25).jpeg",
    "alt": "Engineering Log #20"
  },
  {
    "src": "/photos/WhatsApp Image 2026-06-24 at 10.55.18 AM (27).jpeg",
    "alt": "Engineering Log #21"
  },
  {
    "src": "/photos/WhatsApp Image 2026-06-24 at 10.55.18 AM (28).jpeg",
    "alt": "Engineering Log #22"
  },
  {
    "src": "/photos/WhatsApp Image 2026-06-24 at 10.55.18 AM (29).jpeg",
    "alt": "Engineering Log #23"
  },
  {
    "src": "/photos/WhatsApp Image 2026-06-24 at 10.55.18 AM (3).jpeg",
    "alt": "Engineering Log #24"
  },
  {
    "src": "/photos/WhatsApp Image 2026-06-24 at 10.55.18 AM (30).jpeg",
    "alt": "Engineering Log #25"
  },
  {
    "src": "/photos/WhatsApp Image 2026-06-24 at 10.55.18 AM (31).jpeg",
    "alt": "Engineering Log #26"
  },
  {
    "src": "/photos/WhatsApp Image 2026-06-24 at 10.55.18 AM (32).jpeg",
    "alt": "Engineering Log #27"
  },
  {
    "src": "/photos/WhatsApp Image 2026-06-24 at 10.55.18 AM (33).jpeg",
    "alt": "Engineering Log #28"
  },
  {
    "src": "/photos/WhatsApp Image 2026-06-24 at 10.55.18 AM (34).jpeg",
    "alt": "Engineering Log #29"
  },
  {
    "src": "/photos/WhatsApp Image 2026-06-24 at 10.55.18 AM (35).jpeg",
    "alt": "Engineering Log #30"
  },
  {
    "src": "/photos/WhatsApp Image 2026-06-24 at 10.55.18 AM (36).jpeg",
    "alt": "Engineering Log #31"
  },
  {
    "src": "/photos/WhatsApp Image 2026-06-24 at 10.55.18 AM (37).jpeg",
    "alt": "Engineering Log #32"
  },
  {
    "src": "/photos/WhatsApp Image 2026-06-24 at 10.55.18 AM (4).jpeg",
    "alt": "Engineering Log #33"
  },
  {
    "src": "/photos/WhatsApp Image 2026-06-24 at 10.55.18 AM (5).jpeg",
    "alt": "Engineering Log #34"
  },
  {
    "src": "/photos/WhatsApp Image 2026-06-24 at 10.55.18 AM (6).jpeg",
    "alt": "Engineering Log #35"
  },
  {
    "src": "/photos/WhatsApp Image 2026-06-24 at 10.55.18 AM (7).jpeg",
    "alt": "Engineering Log #36"
  },
  {
    "src": "/photos/WhatsApp Image 2026-06-24 at 10.55.18 AM (8).jpeg",
    "alt": "Engineering Log #37"
  },
  {
    "src": "/photos/WhatsApp Image 2026-06-24 at 10.55.18 AM (9).jpeg",
    "alt": "Engineering Log #38"
  },
  {
    "src": "/photos/WhatsApp Image 2026-06-24 at 10.55.18 AM.jpeg",
    "alt": "Engineering Log #39"
  }
];


export default function GallerySection() {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef as React.RefObject<HTMLElement>);

  return (
    <section
      id="gallery"
      className="section"
      ref={sectionRef}
      style={{
        paddingLeft: 0,
        paddingRight: 0,
        background: "#120F17", // Rich dark background matching overlayBlurColor
        position: "relative",
        borderTop: "4px solid var(--border-default)",
        overflow: "hidden"
      }}
    >
      {/* Header */}
      <div className="section-content" style={{ padding: "0 40px", marginBottom: "40px" }}>
        <div className="container" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px", alignItems: "flex-end" }}>
          <div className="reveal reveal-left">
            <div className="eyebrow" style={{ color: "var(--fg-brand)" }}>Showcase</div>
            <h2 style={{ color: "white", marginBottom: 0, display: "flex", alignItems: "center", gap: "12px" }}>
              <span>Visual Archive</span>
              <img
                src="/icons/walk.png"
                alt="Walk Icon"
                style={{
                  width: "54px",
                  height: "54px",
                  objectFit: "contain",
                  filter: "brightness(0) invert(1)"
                }}
              />
            </h2>
          </div>
          <div className="reveal reveal-right" style={{ paddingBottom: "4px" }}>
            <p className="leading" style={{ color: "var(--neutral-primary-soft)", opacity: 0.8 }}>
              An interactive 3D dome workspace showcasing snapshots of my projects, research locations, and technical interests. Drag to rotate the dome, and click any item to inspect.
            </p>
          </div>
        </div>
      </div>

      {/* Gallery Canvas Container */}
      <div
        className="reveal"
        style={{
          width: "100%",
          height: "720px",
          position: "relative",
          zIndex: 2,
          borderTop: "2px solid rgba(255, 255, 255, 0.08)",
          borderBottom: "2px solid rgba(255, 255, 255, 0.08)",
        }}
      >
        <DomeGallery
          images={IMAGES}
          fit={0.95}
          fitBasis="height"
          minRadius={750}
          maxRadius={1200}
          padFactor={0.15}
          overlayBlurColor="#120F17"
          grayscale={false}
          openedImageWidth="320px"
          openedImageHeight="450px"
          imageBorderRadius="12px"
          openedImageBorderRadius="16px"
        />
      </div>

      <style>{`
        @media (max-width: 1023px) {
          #gallery .section-content > .container {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
          #gallery .section-content {
            padding: 0 24px !important;
          }
        }
        @media (max-width: 767px) {
          #gallery .section-content > .container {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
          #gallery .section-content {
            padding: 0 16px !important;
          }
          #gallery .reveal[style*="height: 720px"] {
            height: 380px !important;
          }
        }
      `}</style>
    </section>
  );
}
