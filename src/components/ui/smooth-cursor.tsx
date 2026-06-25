"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface SmoothCursorProps {
  isHovering: boolean;
}

export function SmoothCursor({ isHovering }: SmoothCursorProps) {
  const cursorRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 20, stiffness: 200, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const connectSection = document.getElementById("connect");
      if (!connectSection) return;

      const rect = connectSection.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      ) {
        mouseX.set(x);
        mouseY.set(y);
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [mouseX, mouseY]);

  if (!isVisible) return null;

  return (
    <motion.div
      ref={cursorRef}
      style={{
        position: "absolute",
        left: cursorX,
        top: cursorY,
        translateX: "-2px",
        translateY: "-2px",
        pointerEvents: "none",
        zIndex: 9999,
      }}
      animate={{
        scale: isHovering ? 1.2 : 1.0,
      }}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
      className="hidden md:block"
    >
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          filter: "drop-shadow(2px 3px 3px rgba(0, 0, 0, 0.3))",
        }}
      >
        <path
          d="M4.5 3V17.5L8.5 13.5L12.5 20.5L15.5 18.5L11.5 12L16.5 12L4.5 3Z"
          fill={isHovering ? "#2DC8E2" : "#4D5BFF"}
          stroke="#FFFFFF"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    </motion.div>
  );
}
