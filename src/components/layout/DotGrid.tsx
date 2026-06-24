"use client";

import { useEffect, useRef } from "react";

interface DotGridProps {
  dotSize?: number;
  gap?: number;
  baseColor?: string;
  activeColor?: string;
  proximity?: number;
  speedTrigger?: number;
  shockRadius?: number;
  shockStrength?: number;
  maxSpeed?: number;
  resistance?: number;
  returnDuration?: number;
  className?: string;
}

/**
 * DotGrid — Interactive dot-grid background.
 * Mouse proximity activates dots; fast mouse movement sends a shock wave.
 * Config matches the react-bits DotGrid-JS-CSS screenshot exactly.
 */
export default function DotGrid({
  dotSize       = 5,
  gap           = 15,
  baseColor     = "#c8d4ff",
  activeColor   = "#5227FF",
  proximity     = 120,
  speedTrigger  = 100,
  shockRadius   = 250,
  shockStrength = 5,
  maxSpeed      = 5000,
  resistance    = 900,
  returnDuration = 1.5,
  className,
}: DotGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // --- Dot state ---
    interface Dot {
      x: number;     // base x
      y: number;     // base y
      cx: number;    // current x (with displacement)
      cy: number;    // current y
      vx: number;    // velocity x
      vy: number;    // velocity y
      color: string; // current color
      alpha: number; // 0-1 brightness
    }

    let dots: Dot[] = [];
    let mouseX = -9999;
    let mouseY = -9999;
    let lastMouseX = -9999;
    let lastMouseY = -9999;
    let lastTime = performance.now();
    let raf: number;

    const buildDots = () => {
      dots = [];
      const cols = Math.ceil(canvas.width  / (dotSize + gap));
      const rows = Math.ceil(canvas.height / (dotSize + gap));
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * (dotSize + gap) + dotSize;
          const y = r * (dotSize + gap) + dotSize;
          dots.push({ x, y, cx: x, cy: y, vx: 0, vy: 0, color: baseColor, alpha: 1 });
        }
      }
    };

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      buildDots();
    };

    resize();
    window.addEventListener("resize", resize);

    // --- Color lerp helper ---
    const hexToRgb = (hex: string) => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return { r, g, b };
    };
    const bc = hexToRgb(baseColor);
    const ac = hexToRgb(activeColor);

    const lerpColor = (t: number) => {
      const r = Math.round(bc.r + (ac.r - bc.r) * t);
      const g = Math.round(bc.g + (ac.g - bc.g) * t);
      const b = Math.round(bc.b + (ac.b - bc.b) * t);
      return `rgb(${r},${g},${b})`;
    };

    // --- Send shock wave from mouse when speed threshold hit ---
    const sendShock = (sx: number, sy: number) => {
      dots.forEach((d) => {
        const dx = d.x - sx;
        const dy = d.y - sy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < shockRadius && dist > 0) {
          const force = (1 - dist / shockRadius) * shockStrength;
          const angle = Math.atan2(dy, dx);
          d.vx += Math.cos(angle) * force * 80;
          d.vy += Math.sin(angle) * force * 80;
        }
      });
    };

    // --- Mouse/touch tracking ---
    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;

      const now = performance.now();
      const dt = Math.max(now - lastTime, 1);
      const vx = (mouseX - lastMouseX) / dt;
      const vy = (mouseY - lastMouseY) / dt;
      const speed = Math.sqrt(vx * vx + vy * vy) * 1000;

      if (speed > speedTrigger) sendShock(mouseX, mouseY);

      lastMouseX = mouseX;
      lastMouseY = mouseY;
      lastTime = now;
    };

    canvas.addEventListener("mousemove", onMouseMove);

    // --- Animation loop ---
    const resistFactor = 1 - resistance / 10000;
    const returnFactor = 1 / (returnDuration * 60);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      dots.forEach((d) => {
        // Distance from mouse → activation
        const dx = mouseX - d.x;
        const dy = mouseY - d.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const activation = dist < proximity ? Math.pow(1 - dist / proximity, 2) : 0;

        // Return to origin spring
        const rx = d.x - d.cx;
        const ry = d.y - d.cy;
        d.vx += rx * returnFactor * 4;
        d.vy += ry * returnFactor * 4;

        // Apply velocity damping (resistance)
        d.vx *= resistFactor;
        d.vy *= resistFactor;

        // Cap velocity
        const spd = Math.sqrt(d.vx * d.vx + d.vy * d.vy);
        if (spd > maxSpeed) {
          d.vx = (d.vx / spd) * maxSpeed;
          d.vy = (d.vy / spd) * maxSpeed;
        }

        d.cx += d.vx;
        d.cy += d.vy;

        // Draw dot
        ctx.beginPath();
        ctx.arc(d.cx, d.cy, dotSize / 2, 0, Math.PI * 2);
        ctx.fillStyle = activation > 0.05 ? lerpColor(activation) : baseColor;
        ctx.globalAlpha = 0.7 + activation * 0.3;
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      raf = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMouseMove);
    };
  }, [dotSize, gap, baseColor, activeColor, proximity, speedTrigger, shockRadius, shockStrength, maxSpeed, resistance, returnDuration]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "auto", // needs mouse events
        zIndex: 0,
        display: "block",
      }}
    />
  );
}
