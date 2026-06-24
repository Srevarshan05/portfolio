"use client";

import { useEffect, useRef, useState } from "react";

interface EyePosition {
  x: number;
  y: number;
}

export default function BlobCharacter() {
  const blobRef = useRef<SVGSVGElement>(null);
  const [leftEye, setLeftEye] = useState<EyePosition>({ x: 0, y: 0 });
  const [rightEye, setRightEye] = useState<EyePosition>({ x: 0, y: 0 });
  const [isCovering, setIsCovering] = useState(false);

  // Eye tracking — compute pupil offsets based on mouse position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!blobRef.current) return;
      const rect = blobRef.current.getBoundingClientRect();

      // Center of each eye socket (in viewport coords)
      const leftEyeCenter = {
        x: rect.left + rect.width * 0.38,
        y: rect.top + rect.height * 0.36,
      };
      const rightEyeCenter = {
        x: rect.left + rect.width * 0.62,
        y: rect.top + rect.height * 0.36,
      };

      // Max pupil travel radius
      const maxOffset = 4;

      const calcOffset = (center: { x: number; y: number }) => {
        const dx = e.clientX - center.x;
        const dy = e.clientY - center.y;
        const angle = Math.atan2(dy, dx);
        const dist = Math.min(Math.sqrt(dx * dx + dy * dy), 80);
        const ratio = dist / 80;
        return {
          x: Math.cos(angle) * maxOffset * ratio,
          y: Math.sin(angle) * maxOffset * ratio,
        };
      };

      setLeftEye(calcOffset(leftEyeCenter));
      setRightEye(calcOffset(rightEyeCenter));
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Privacy Mode — called by parent via email input focus/blur
  // Exposed via window event for simplicity
  useEffect(() => {
    const handlePrivacyOn = () => setIsCovering(true);
    const handlePrivacyOff = () => setIsCovering(false);
    window.addEventListener("blob-privacy-on", handlePrivacyOn);
    window.addEventListener("blob-privacy-off", handlePrivacyOff);
    return () => {
      window.removeEventListener("blob-privacy-on", handlePrivacyOn);
      window.removeEventListener("blob-privacy-off", handlePrivacyOff);
    };
  }, []);

  return (
    <div className="blob-container" aria-hidden="true">
      <svg
        ref={blobRef}
        width="180"
        height="200"
        viewBox="0 0 180 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="blob-body"
        style={{ overflow: "visible" }}
      >
        {/* ── BODY ── */}
        <ellipse cx="90" cy="120" rx="70" ry="72" fill="#FFE5EE" />
        <ellipse
          cx="90"
          cy="120"
          rx="70"
          ry="72"
          fill="none"
          stroke="#E22D6D"
          strokeWidth="4"
          strokeDasharray="10 6"
        />

        {/* ── LEFT ARM ── */}
        <g
          className={`blob-hand-left ${isCovering ? "covering" : "revealing"}`}
          style={{ transformOrigin: "55px 140px" }}
        >
          <path
            d="M55 140 C35 130 20 120 18 108"
            stroke="#E22D6D"
            strokeWidth="10"
            strokeLinecap="round"
          />
          {/* Hand */}
          <ellipse cx="16" cy="104" rx="10" ry="8" fill="#FFE5EE" stroke="#E22D6D" strokeWidth="3" />
        </g>

        {/* ── RIGHT ARM ── */}
        <g
          className={`blob-hand-right ${isCovering ? "covering" : "revealing"}`}
          style={{ transformOrigin: "125px 140px", transform: "scaleX(-1)", transformBox: "fill-box" }}
        >
          <path
            d="M55 140 C35 130 20 120 18 108"
            stroke="#E22D6D"
            strokeWidth="10"
            strokeLinecap="round"
          />
          <ellipse cx="16" cy="104" rx="10" ry="8" fill="#FFE5EE" stroke="#E22D6D" strokeWidth="3" />
        </g>

        {/* ── LEFT EYE SOCKET ── */}
        <ellipse cx="68" cy="108" rx="16" ry="16" fill="white" stroke="#1C202B" strokeWidth="3" />
        {/* Left Pupil (tracks mouse) */}
        <circle
          cx={68 + leftEye.x}
          cy={108 + leftEye.y}
          r="6"
          fill="#1C202B"
        />
        {/* Left eye highlight */}
        <circle
          cx={70 + leftEye.x}
          cy={105 + leftEye.y}
          r="2"
          fill="white"
          opacity="0.8"
        />

        {/* ── RIGHT EYE SOCKET ── */}
        <ellipse cx="112" cy="108" rx="16" ry="16" fill="white" stroke="#1C202B" strokeWidth="3" />
        {/* Right Pupil (tracks mouse) */}
        <circle
          cx={112 + rightEye.x}
          cy={108 + rightEye.y}
          r="6"
          fill="#1C202B"
        />
        {/* Right eye highlight */}
        <circle
          cx={114 + rightEye.x}
          cy={105 + rightEye.y}
          r="2"
          fill="white"
          opacity="0.8"
        />

        {/* ── MOUTH (smile, shifts to neutral when covering) ── */}
        {isCovering ? (
          // Nervous mouth
          <path
            d="M76 138 Q90 134 104 138"
            stroke="#1C202B"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
        ) : (
          // Happy smile
          <path
            d="M74 138 Q90 152 106 138"
            stroke="#1C202B"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
        )}

        {/* ── BLUSH MARKS ── */}
        <ellipse cx="52" cy="128" rx="9" ry="6" fill="#E22D6D" opacity="0.18" />
        <ellipse cx="128" cy="128" rx="9" ry="6" fill="#E22D6D" opacity="0.18" />

        {/* ── FEET ── */}
        <ellipse cx="72" cy="188" rx="18" ry="10" fill="#E22D6D" />
        <ellipse cx="108" cy="188" rx="18" ry="10" fill="#E22D6D" />
      </svg>

      {/* Privacy mode label */}
      <p
        style={{
          fontFamily: "'Open Sans', sans-serif",
          fontSize: "11px",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.5px",
          color: "#94A3CC",
          marginTop: "8px",
          textAlign: "center",
          opacity: isCovering ? 1 : 0,
          transition: "opacity 200ms",
        }}
      >
        🙈 I won&apos;t peek!
      </p>
    </div>
  );
}
