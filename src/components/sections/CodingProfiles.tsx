"use client";

import { useRef, useState, useEffect } from "react";
import { useScrollReveal } from "@/lib/useScrollReveal";

const PROFILES = [
  {
    id: "leetcode",
    num: "01",
    name: "LeetCode",
    category: "DSA & ALGORITHMS",
    desc: "500+ problems solved across data structures, algorithms & dynamic programming.",
    url: "https://leetcode.com/u/srevarshan9600622/",
    color: "#FFA116",
    badgeColor: "#FFA116",
    idleRot: "-2.5deg",
    parallaxSpeed: -0.32,
    svgPath: "M16.102 17.93l-2.697 2.607c-.466.467-1.111.662-1.823.662s-1.357-.195-1.824-.662l-4.332-4.363c-.467-.467-.702-1.15-.702-1.863 0-.713.235-1.357.702-1.824l4.319-4.38c.467-.467 1.125-.645 1.837-.645s1.357.195 1.823.662l2.697 2.606c.514.515 1.365.497 1.9-.038.535-.536.553-1.387.039-1.901l-2.609-2.636a5.07 5.07 0 0 0-3.85-1.428c-1.503 0-2.906.58-3.957 1.631L3.92 10.669A5.55 5.55 0 0 0 2.29 14.61c0 1.545.602 2.997 1.63 4.025l4.333 4.364c1.05 1.051 2.454 1.631 3.957 1.631 1.488 0 2.876-.566 3.892-1.583l2.609-2.589c.514-.514.496-1.365-.039-1.9-.535-.535-1.386-.553-1.9-.039zM10.811 13.784a1.2 1.2 0 0 0 0 2.4h10.978a1.2 1.2 0 0 0 0-2.4H10.811z",
    delay: 0,
  },
  {
    id: "hackerrank",
    num: "02",
    name: "HackerRank",
    category: "CERTIFIED SKILLS",
    desc: "Problem solving certifications and core domain competency tracks.",
    url: "https://www.hackerrank.com/profile/srevarshan960061",
    color: "#2EC866",
    badgeColor: "#2EC866",
    idleRot: "2.2deg",
    parallaxSpeed: 0.35,
    svgPath: "M12 0c1.285 0 9.75 4.886 10.392 6 .645 1.115.645 10.885 0 12S13.287 24 12 24C10.715 24 2.25 19.114 1.608 18 .963 16.886.963 7.114 1.608 6 2.25 4.886 10.715 0 12 0zm2.295 6.799c-.141 0-.258.115-.258.258v3.875H9.963V6.799c0-.141-.115-.258-.258-.258H8.963c-.141 0-.258.115-.258.258v10.402c0 .141.115.258.258.258h.742c.141 0 .258-.115.258-.258v-4.357h4.074v4.357c0 .141.115.258.258.258h.742c.141 0 .258-.115.258-.258V6.799c0-.141-.115-.258-.258-.258z",
    delay: 70,
  },
  {
    id: "codechef",
    num: "03",
    name: "CodeChef",
    category: "GLOBAL CONTESTS",
    desc: "Active competitive programming in monthly challenges and rated rounds.",
    url: "https://www.codechef.com/users/ss2535srmist",
    color: "#F9A825",
    badgeColor: "#FFB020",
    idleRot: "-2deg",
    parallaxSpeed: -0.28,
    svgPath: "M11.257.004C6.38-.082 1.906 3.652.574 8.354c-.88 2.46-.73 5.22.63 7.47 1.74 3.15 5.13 8.67 5.36 3.31.33 6.81-.79 9.09-3.18 2.55-2.54 3.49-6.28 2.67-9.76C20.534 3.474 16.164.08 11.257.004zm-.42 2.17c.16 0 .31.01.47.02-1.08.55-2.08 1.26-2.96 2.09-.9-.56-1.9-.99-2.97-1.26.45-.2.91-.36 1.37-.49.7-.21 1.41-.33 2.12-.36.33-.01.65-.01.97 0zm4.54 1.27c.89.52 1.69 1.17 2.37 1.93-1.06-.01-2.1.2-3.09.56-.45-.89-1.01-1.72-1.67-2.48.78-.19 1.6-.2 2.39-.01zm-9.54.4c1.24.27 2.38.8 3.37 1.55-.82.92-1.47 2.01-1.86 3.2-.9-.29-1.85-.44-2.81-.45-.67-.01-1.35.05-2.02.19.36-1.96 1.55-3.71 3.32-4.49zm12.4 1.27c1.38 1.43 2.12 3.42 2.13 5.41-.63-.2-1.28-.3-1.94-.3-1.04.01-2.04.27-2.95.74-.43-1.18-1.07-2.3-1.91-3.27.66-.39 1.29-.82 1.85-1.33.36-.33.69-.68.98-1.07.63.24 1.22.52 1.84.82zM9.847 6.984c.51.38 1 .8 1.45 1.27.45.45.84.95 1.17 1.49-.97.26-1.89.67-2.74 1.2-.4-.9-.92-1.74-1.56-2.49.52-.54 1.08-1.03 1.68-1.47zm-4.32 2.99c.88.01 1.73.19 2.54.51-.4.8-.67 1.65-.8 2.53-.93.55-1.76 1.26-2.47 2.09-.33-.33-.64-.67-.92-1.03-1.01-1.3-1.4-3.04-1.09-4.7.9-.24 1.82-.41 2.74-.4zm9.84.17c.79 0 1.57.14 2.32.4.33 1.58.04 3.32-.89 4.65-.3.43-.66.82-1.05 1.17-.72-.86-1.57-1.6-2.52-2.19-.07-.87-.29-1.73-.64-2.53.88-.35 1.82-.52 2.78-.5zm-5.2 1.05c.25 0 .5.01.75.03.47.67.85 1.4 1.12 2.18-.92.67-1.72 1.5-2.36 2.46-.68-.92-1.5-1.73-2.43-2.4.26-.8.64-1.55 1.13-2.23.59-.03 1.19-.04 1.79-.04zm2.31 3.3c.77.49 1.46 1.1 2.05 1.8-.65.49-1.36.89-2.11 1.17-.47-.83-1.04-1.59-1.71-2.27.6-.27 1.19-.49 1.77-.7zm-4.65.02c.59.21 1.18.44 1.75.71-.65.67-1.21 1.42-1.67 2.25-.76-.28-1.47-.68-2.12-1.18.58-.69 1.26-1.3 2.04-1.78zm2.34 1.7c.58.58 1.08 1.24 1.48 1.96-.49.09-.99.14-1.49.14-.51 0-1.01-.05-1.5-.14.4-.72.9-1.38 1.51-1.96z",
    delay: 140,
  },
  {
    id: "hackerearth",
    num: "04",
    name: "HackerEarth",
    category: "HACKATHONS",
    desc: "National level hackathons, live coding sprints & algorithmic tracks.",
    url: "https://www.hackerearth.com/@srevarshan9600622/",
    color: "#4B9FE1",
    badgeColor: "#2DC8E2",
    idleRot: "2.5deg",
    parallaxSpeed: 0.32,
    svgPath: "M22.75 0h-21.5C.56 0 0 .56 0 1.25v21.5C0 23.44.56 24 1.25 24h21.5c.69 0 1.25-.56 1.25-1.25V1.25C24 .56 23.44 0 22.75 0zM7.15 16.8H4.8V7.2h2.35V16.8zm9.9 0h-2.36v-4.64H9.26V16.8H6.9V7.2h2.36v2.67h5.43V7.2h2.36V16.8z",
    delay: 210,
  },
  {
    id: "medium",
    num: "05",
    name: "Medium",
    category: "TECH ARTICLES",
    desc: "In-depth breakdowns on Edge AI, LLMs & Full-stack Architecture.",
    url: "https://medium.com/@srevarshan9600622",
    color: "#292929",
    badgeColor: "#4D5BFF",
    idleRot: "-2.6deg",
    parallaxSpeed: -0.35,
    svgPath: "M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z",
    delay: 280,
  },
  {
    id: "youtube",
    num: "06",
    name: "YouTube",
    category: "DEMO VIDEOS",
    desc: "Live project demos, prototype showcases & AI talks.",
    url: "https://www.youtube.com/@SreVarshanAI",
    color: "#FF0000",
    badgeColor: "#E22D6D",
    idleRot: "2deg",
    parallaxSpeed: 0.3,
    svgPath: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
    delay: 350,
  },
];

type Profile = typeof PROFILES[0];

export default function CodingProfilesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef as React.RefObject<HTMLElement>);
  const [confirmProfile, setConfirmProfile] = useState<Profile | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0); // Section relative scroll position
  const [sectionTilt, setSectionTilt] = useState({ rotX: 0, scale: 1, transY: 0 });

  // Full-section 3D Scroll Tracking
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.08 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (sectionRef.current) {
            const rect = sectionRef.current.getBoundingClientRect();
            const winH = window.innerHeight;
            
            // If section is partially or fully on screen
            if (rect.top < winH && rect.bottom > 0) {
              // Normalized progress from 0 (just entered bottom) to 1 (just exited top)
              const rawProgress = (winH - rect.top) / (winH + rect.height);
              const centeredProgress = (rawProgress - 0.5) * 2; // -1 at entrance, 0 at center, +1 at exit
              
              setScrollProgress(centeredProgress * 30); // ±30px range for parallax

              // Calculate entire section 3D perspective dynamics
              const rotX = centeredProgress * -4.5; // subtle 3D tilt when scrolling
              const scale = 1 - Math.abs(centeredProgress) * 0.035; // scales up to 1 at center
              const transY = centeredProgress * -12; // subtle float

              setSectionTilt({ rotX, scale, transY });
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleConfirm = () => {
    if (confirmProfile) {
      window.open(confirmProfile.url, "_blank", "noopener,noreferrer");
      setConfirmProfile(null);
    }
  };

  return (
    <>
      <style>{`
        @keyframes cp-popup-in {
          from { opacity: 0; transform: translateY(16px) scale(0.95); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes cp-fade-bg { from { opacity: 0; } to { opacity: 1; } }
        @keyframes cp-doodle-bob {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50%      { transform: translateY(-8px) rotate(3deg); }
        }

        .cp-section {
          position: relative;
          background: #0F1218;
          width: 100%;
          padding: 85px 0 105px;
          overflow: hidden;
          border-top: 2.5px solid #262B38;
          border-bottom: 2.5px solid #262B38;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          text-rendering: optimizeLegibility;
        }

        /* ── Razor-Sharp Section Container ── */
        .cp-inner {
          position: relative;
          z-index: 3;
          max-width: 1060px;
          margin: 0 auto;
          padding: 0 24px;
        }

        /* ── Header ── */
        .cp-header {
          text-align: center;
          margin-bottom: 40px;
          position: relative;
          will-change: transform;
          transition: transform 120ms ease-out;
        }
        .cp-badge-slanted {
          display: inline-block;
          background: #FF8B2D;
          color: #0F1218;
          font-family: 'Open Sans', sans-serif;
          font-weight: 800;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 2px;
          padding: 4px 14px;
          border: 2px solid #000;
          border-radius: 4px;
          box-shadow: 2.5px 2.5px 0 0 #000;
          transform: rotate(-2deg);
          margin-bottom: 12px;
          transition: transform 180ms ease;
        }
        .cp-badge-slanted:hover {
          transform: rotate(0deg) scale(1.05);
        }
        .cp-title {
          font-family: 'Bangers', cursive;
          font-size: clamp(40px, 5.8vw, 72px);
          letter-spacing: 2px;
          color: #FFFFFF;
          text-transform: uppercase;
          line-height: 1;
          margin: 0 0 6px;
          transform: skewX(-4deg);
          text-shadow: 3px 3px 0px #000000;
        }
        .cp-doodle-line {
          width: 220px;
          height: 12px;
          margin: 4px auto 0;
        }

        /* ── Low-Opacity Background Doodle SVGs & Illustrations ── */
        .cp-bg-doodle {
          position: absolute;
          pointer-events: none;
          z-index: 1;
          opacity: 0.16;
          color: #94A3CC;
          will-change: transform;
          transition: transform 120ms ease-out;
        }
        .cp-doodle-star-img {
          position: absolute;
          pointer-events: none;
          z-index: 2;
          width: 60px;
          height: auto;
          opacity: 0.85;
          filter: drop-shadow(0 4px 12px rgba(255, 139, 45, 0.25));
          animation: cp-doodle-bob 6s ease-in-out infinite;
          will-change: transform;
        }

        /* ── Stamp Grid ── */
        .cp-stamp-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 26px;
          padding-top: 14px;
        }

        /* ── Stamp Card Outer Wrapper ── */
        .cp-stamp-wrapper {
          position: relative;
          filter: drop-shadow(5px 5px 0px #000000);
          cursor: pointer;
          opacity: 0;
          will-change: transform, opacity, filter;
          transition: opacity 500ms cubic-bezier(0.2, 0.8, 0.2, 1),
                      transform 120ms ease-out,
                      filter 180ms ease;
          -webkit-tap-highlight-color: transparent;
        }
        .cp-stamp-grid.is-animated .cp-stamp-wrapper {
          opacity: 1;
        }

        .cp-stamp-wrapper:hover {
          transform: translateY(-8px) scale(1.04) rotate(0deg) !important;
          filter: drop-shadow(8px 8px 0px var(--stamp-accent)) !important;
          z-index: 10;
        }
        .cp-stamp-wrapper:active {
          transform: translateY(2px) scale(1) !important;
          filter: drop-shadow(2px 2px 0px #000000) !important;
        }

        /* ── Authentic Stamp Body with Scalloped Edges ── */
        .cp-stamp-body {
          position: relative;
          background-color: transparent;
          background-image:
            radial-gradient(circle at 0px 50%, transparent 5px, #FFFFFF 6px),
            radial-gradient(circle at 100% 50%, transparent 5px, #FFFFFF 6px),
            radial-gradient(circle at 50% 0px, transparent 5px, #FFFFFF 6px),
            radial-gradient(circle at 50% 100%, transparent 5px, #FFFFFF 6px),
            linear-gradient(#FFFFFF, #FFFFFF);
          background-repeat: repeat-y, repeat-y, repeat-x, repeat-x, no-repeat;
          background-position: left, right, top, bottom, center;
          background-size: 10px 20px, 10px 20px, 20px 10px, 20px 10px, calc(100% - 16px) calc(100% - 16px);
          padding: 34px 18px 18px 18px;
          display: flex;
          flex-direction: column;
          min-height: 245px;
        }

        /* Dashed inset frame */
        .cp-stamp-inset {
          position: absolute;
          inset: 10px;
          border: 1.5px dashed rgba(28, 32, 43, 0.2);
          pointer-events: none;
          border-radius: 2px;
        }

        /* Number Badge Stamp Block on Top-Left */
        .cp-stamp-number {
          position: absolute;
          top: -14px;
          left: 12px;
          width: 40px;
          height: 36px;
          background: var(--badge-bg);
          border: 2.5px solid #1C202B;
          box-shadow: 2.5px 2.5px 0 0 #1C202B;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Bangers', cursive;
          font-size: 20px;
          color: white;
          letter-spacing: 1px;
          z-index: 10;
          transition: transform 180ms ease;
        }
        .cp-stamp-wrapper:hover .cp-stamp-number {
          transform: rotate(-4deg) scale(1.08);
        }

        /* Stamp Card Logo Showcase Box */
        .cp-stamp-logo-frame {
          width: 100%;
          height: 68px;
          border: 2px solid #1C202B;
          border-radius: 6px;
          background: #F4F6FC;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 12px;
          box-shadow: 2px 2px 0 0 rgba(28,32,43,0.15);
          position: relative;
          z-index: 2;
          transition: background 180ms ease;
        }
        .cp-stamp-wrapper:hover .cp-stamp-logo-frame {
          background: #FFFFFF;
        }

        /* Typography inside Stamp */
        .cp-stamp-title {
          font-family: 'Bangers', cursive;
          font-size: 20px;
          letter-spacing: 0.8px;
          color: #1C202B;
          text-transform: uppercase;
          margin: 0 0 2px 0;
          line-height: 1.1;
          position: relative;
          z-index: 2;
        }
        .cp-stamp-category {
          font-family: 'Open Sans', sans-serif;
          font-size: 10.5px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          color: var(--stamp-accent);
          margin-bottom: 6px;
          position: relative;
          z-index: 2;
        }
        .cp-stamp-desc {
          font-family: 'Open Sans', sans-serif;
          font-size: 11.5px;
          color: #4B5565;
          line-height: 1.45;
          margin: 0 0 12px 0;
          position: relative;
          z-index: 2;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Stamp Footer Button */
        .cp-stamp-btn {
          margin-top: auto;
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 6px 12px;
          background: #1C202B;
          border: 1.5px solid #1C202B;
          border-radius: 6px;
          color: #FFFFFF;
          font-family: 'Open Sans', sans-serif;
          font-size: 11px;
          font-weight: 800;
          box-shadow: 1.5px 1.5px 0 0 #000;
          transition: background 180ms ease, color 180ms ease;
        }
        .cp-stamp-wrapper:hover .cp-stamp-btn {
          background: var(--stamp-accent);
          color: #1C202B;
          border-color: #000;
        }

        /* ── Popup Confirmation with High-Visibility Bold Link ── */
        .cp-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(15, 18, 24, 0.88);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          z-index: 99999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          animation: cp-fade-bg 160ms ease both;
        }
        .cp-popup {
          background: #14171F;
          border: 2.5px solid #262B38;
          border-radius: 20px;
          max-width: 440px;
          width: 100%;
          overflow: hidden;
          box-shadow: 8px 8px 0px #000000;
          animation: cp-popup-in 200ms cubic-bezier(.22,1,.36,1) both;
        }
        .cp-popup-strip { height: 5px; background: var(--strip-clr); }
        .cp-popup-top {
          padding: 22px 24px 18px;
          display: flex;
          align-items: center;
          gap: 14px;
          border-bottom: 2px solid #262B38;
          background: #1C202B;
        }
        .cp-popup-logo-wrap {
          width: 50px;
          height: 50px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          background: #FFFFFF;
          border: 2px solid #262B38;
          box-shadow: 2.5px 2.5px 0px #000;
        }
        .cp-popup-pname { font-family: 'Open Sans', sans-serif; font-size: 19px; font-weight: 800; color: #FFFFFF; margin-bottom: 2px; }
        .cp-popup-pdesc { font-family: 'Open Sans', sans-serif; font-size: 12px; color: #94A3CC; }
        .cp-popup-body { padding: 22px 24px 26px; }
        .cp-popup-msg { font-family: 'Open Sans', sans-serif; font-size: 14px; color: #DFE7FF; line-height: 1.55; margin-bottom: 14px; }
        
        /* High-Visibility Link Box */
        .cp-popup-url-box {
          background: #1C202B;
          border: 2px solid #333949;
          border-radius: 10px;
          padding: 12px 14px;
          margin-bottom: 22px;
          box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.4);
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .cp-popup-url-label {
          font-family: 'Open Sans', sans-serif;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: #94A3CC;
        }
        .cp-popup-url-text {
          font-family: monospace;
          font-size: 12px;
          font-weight: 800;
          color: #FFFFFF;
          word-break: break-all;
          line-height: 1.4;
        }

        .cp-popup-btns { display: flex; gap: 12px; }
        .cp-btn-no {
          flex: 1;
          padding: 12px 0;
          border-radius: 10px;
          border: 2px solid #262B38;
          background: #1C202B;
          color: #DFE7FF;
          font-family: 'Open Sans', sans-serif;
          font-size: 13.5px;
          font-weight: 700;
          cursor: pointer;
          box-shadow: 2px 2px 0px #000;
          transition: all 150ms ease;
        }
        .cp-btn-no:hover { background: #262B38; color: #FFFFFF; }
        .cp-btn-yes {
          flex: 1.6;
          padding: 12px 0;
          border-radius: 10px;
          border: 2px solid #000;
          font-family: 'Open Sans', sans-serif;
          font-size: 13.5px;
          font-weight: 800;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          box-shadow: 3px 3px 0px #000;
          transition: all 150ms ease;
        }
        .cp-btn-yes:hover {
          transform: translate(-1px, -1px);
          box-shadow: 4px 4px 0px #000;
        }

        /* ── Responsive Tablet & Mobile ── */
        @media (max-width: 860px) {
          .cp-stamp-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }
        }
        @media (max-width: 600px) {
          .cp-section { padding: 60px 0 75px; perspective: none; }
          .cp-inner { padding: 0 16px; transform: none !important; }
          /* Mobile 2-Column Grid Layout */
          .cp-stamp-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 14px !important;
          }
          .cp-stamp-wrapper {
            transform: none !important;
          }
          .cp-stamp-body {
            padding: 28px 12px 14px 12px;
            min-height: 215px;
          }
          .cp-stamp-number {
            width: 34px;
            height: 30px;
            font-size: 16px;
            top: -12px;
            left: 8px;
          }
          .cp-stamp-logo-frame {
            height: 52px;
            margin-bottom: 8px;
          }
          .cp-stamp-logo-frame svg {
            width: 26px !important;
            height: 26px !important;
          }
          .cp-stamp-title {
            font-size: 16px;
          }
          .cp-stamp-category {
            font-size: 9.5px;
            margin-bottom: 4px;
          }
          .cp-stamp-desc {
            font-size: 10.5px;
            line-height: 1.35;
            margin-bottom: 8px;
            -webkit-line-clamp: 2;
          }
          .cp-stamp-btn {
            padding: 4px 8px;
            font-size: 10px;
          }
          .cp-popup { border-radius: 16px; }
          .cp-doodle-star-img { width: 44px; }
        }
      `}</style>

      {/* Confirmation Modal */}
      {confirmProfile && (
        <div className="cp-backdrop" onClick={() => setConfirmProfile(null)}>
          <div className="cp-popup" onClick={(e) => e.stopPropagation()}>
            <div className="cp-popup-strip" style={{ "--strip-clr": confirmProfile.color } as React.CSSProperties} />
            <div className="cp-popup-top">
              <div className="cp-popup-logo-wrap">
                <svg viewBox="0 0 24 24" fill={confirmProfile.color} width="28" height="28">
                  <path d={confirmProfile.svgPath} />
                </svg>
              </div>
              <div>
                <div className="cp-popup-pname">{confirmProfile.name}</div>
                <div className="cp-popup-pdesc">{confirmProfile.category}</div>
              </div>
            </div>
            <div className="cp-popup-body">
              <p className="cp-popup-msg">
                You&apos;re about to leave this page and open my <strong style={{ color: "#FFFFFF", fontWeight: 800 }}>{confirmProfile.name}</strong> profile in a new tab.
              </p>
              
              {/* Clearly Visible Bold URL Box */}
              <div className="cp-popup-url-box">
                <span className="cp-popup-url-label">Target Profile URL:</span>
                <span className="cp-popup-url-text">{confirmProfile.url}</span>
              </div>

              <div className="cp-popup-btns">
                <button className="cp-btn-no" onClick={() => setConfirmProfile(null)}>Cancel</button>
                <button
                  className="cp-btn-yes"
                  style={{
                    background: confirmProfile.color === "#292929" ? "#4D5BFF" : confirmProfile.color,
                    color: "#FFFFFF",
                  }}
                  onClick={handleConfirm}
                >
                  Open Profile
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
                    <polyline points="15 3 21 3 21 9"/>
                    <line x1="10" y1="14" x2="21" y2="3"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <section id="coding-profiles" className="cp-section" ref={sectionRef}>
        {/* Low-Opacity Doodle Vectors Scattered in Background with Parallax */}
        <div
          className="cp-bg-doodle"
          style={{
            top: "30px",
            left: "2%",
            transform: `translateY(${scrollProgress * 0.4}px)`,
          }}
        >
          <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="16 18 22 12 16 6"/>
            <polyline points="8 6 2 12 8 18"/>
          </svg>
        </div>
        <div
          className="cp-bg-doodle"
          style={{
            top: "40px",
            right: "3%",
            transform: `translateY(${scrollProgress * -0.35}px)`,
          }}
        >
          <svg width="55" height="55" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
          </svg>
        </div>
        <div
          className="cp-bg-doodle"
          style={{
            bottom: "35px",
            left: "3%",
            transform: `translateY(${scrollProgress * -0.4}px)`,
          }}
        >
          <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
          </svg>
        </div>
        <div
          className="cp-bg-doodle"
          style={{
            bottom: "40px",
            right: "2%",
            transform: `translateY(${scrollProgress * 0.38}px)`,
          }}
        >
          <svg width="55" height="55" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
        </div>

        {/* Floating Doodle Stars */}
        <img
          src="/icons/doodle-stars.png"
          alt="Doodle Stars"
          className="cp-doodle-star-img"
          style={{
            top: "35px",
            left: "6%",
            transform: `translateY(${scrollProgress * 0.25}px)`,
          }}
        />
        <img
          src="/icons/doodle-stars.png"
          alt="Doodle Stars"
          className="cp-doodle-star-img"
          style={{
            top: "45px",
            right: "6%",
            animationDelay: "1.2s",
            transform: `translateY(${scrollProgress * -0.25}px)`,
          }}
        />

        {/* Crystal-Clear Inner Section Container */}
        <div
          className="cp-inner"
          style={{
            transform: isVisible
              ? `translateY(${Math.round(sectionTilt.transY)}px)`
              : "translateY(20px)",
          }}
        >
          {/* Header with scroll parallax */}
          <div
            className="cp-header"
            style={{
              transform: `translateY(${scrollProgress * -0.15}px)`,
            }}
          >
            <div className="cp-badge-slanted">AROUND THE WEB</div>
            <h2 className="cp-title">CODING &amp; SOCIAL PROFILES</h2>
            
            {/* Doodle scribble underline */}
            <svg className="cp-doodle-line" viewBox="0 0 220 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 9C55 3 165 2 217 9" stroke="#E22D6D" strokeWidth="3.5" strokeLinecap="round"/>
            </svg>
          </div>

          {/* Stamp Card Grid with live parallax scroll response */}
          <div className={`cp-stamp-grid ${isVisible ? "is-animated" : ""}`}>
            {PROFILES.map((p, i) => {
              const cardY = scrollProgress * p.parallaxSpeed;
              return (
                <div
                  key={p.id}
                  className="cp-stamp-wrapper"
                  style={{
                    // @ts-expect-error custom css property
                    "--stamp-accent": p.color,
                    "--badge-bg": p.badgeColor,
                    transform: isVisible
                      ? `translateY(${cardY}px) rotate(${p.idleRot})`
                      : "translateY(40px) scale(0.94)",
                    transitionDelay: `${p.delay}ms`,
                  }}
                  onClick={() => setConfirmProfile(p)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && setConfirmProfile(p)}
                >
                  {/* Number Badge Block at top-left */}
                  <div className="cp-stamp-number">{p.num}</div>

                  {/* Stamp Body with Scalloped Edge Mask */}
                  <div className="cp-stamp-body">
                    {/* Dashed Inset Border */}
                    <div className="cp-stamp-inset" />

                    {/* Logo Frame Box */}
                    <div className="cp-stamp-logo-frame">
                      <svg viewBox="0 0 24 24" fill={p.color} width="32" height="32">
                        <path d={p.svgPath} />
                      </svg>
                    </div>

                    {/* Title & Category */}
                    <h4 className="cp-stamp-title">{p.name}</h4>
                    <div className="cp-stamp-category">{p.category}</div>
                    <p className="cp-stamp-desc">{p.desc}</p>

                    {/* Action Footer */}
                    <div className="cp-stamp-btn">
                      <span>Visit Profile</span>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="7" y1="17" x2="17" y2="7"/>
                        <polyline points="7 7 17 7 17 17"/>
                      </svg>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}


