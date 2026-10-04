"use client";

import { useEffect, useRef, useState } from "react";

/**
 * PixelRunner — a little pixel character hopping across floating grass steps,
 * left to right, out the right edge and back in from the left, on a slow loop.
 * Sprite sheet frames (16x24 native): 0 idle · 1 idle-breathe · 2 blink · 3–6 run · 7 rise · 8 fall.
 */

/** Platform layout as fractions of the container (x = left edge, w = width in native px multiples) */
const STEPS = [
  { x: -0.02, y: 0.80 },
  { x: 0.125, y: 0.56 },
  { x: 0.28, y: 0.45 },
  { x: 0.44, y: 0.77 },
  { x: 0.585, y: 0.86 },
  { x: 0.805, y: 0.70 },
  { x: 0.935, y: 0.46 },
];

const RUN_SPEED = 62;      // px per second — deliberately unhurried
const JUMP_TIME = 0.82;    // seconds in the air per hop
const FRAMES = 9;

type Seg =
  | { kind: "run"; x0: number; x1: number; y: number; t: number }
  | { kind: "idle"; x: number; y: number; t: number }
  | { kind: "jump"; x0: number; y0: number; x1: number; y1: number; apex: number; t: number };

function buildPath(W: number, H: number, platW: number, charW: number): Seg[] {
  const tops = STEPS.map((s) => ({ left: s.x * W, right: s.x * W + platW, y: s.y * H }));
  const segs: Seg[] = [];
  const run = (x0: number, x1: number, y: number) => segs.push({ kind: "run", x0, x1, y, t: Math.abs(x1 - x0) / RUN_SPEED });
  const idle = (x: number, y: number, t: number) => segs.push({ kind: "idle", x, y, t });
  const jump = (x0: number, y0: number, x1: number, y1: number) => {
    const rise = Math.max(54, Math.min(110, Math.abs(x1 - x0) * 0.22));
    segs.push({ kind: "jump", x0, y0, x1, y1, apex: Math.min(y0, y1) - rise, t: JUMP_TIME + Math.abs(x1 - x0) / 1400 });
  };

  const inset = charW * 0.15;
  const mid = (i: number) => (tops[i].left + tops[i].right) / 2 - charW / 2;
  const nearLeft = (i: number) => tops[i].left + inset;
  const nearRight = (i: number) => tops[i].right - charW - inset;

  // enter from off-screen left onto the first step
  run(-charW - 20, mid(0), tops[0].y);
  idle(mid(0), tops[0].y, 0.9);
  for (let i = 0; i < tops.length - 1; i++) {
    const from = i === 0 ? mid(0) : nearRight(i);
    jump(from, tops[i].y, nearLeft(i + 1), tops[i + 1].y);
    run(nearLeft(i + 1), i + 1 === tops.length - 1 ? mid(i + 1) : nearRight(i + 1), tops[i + 1].y);
    if (i + 1 === 3) idle(nearRight(i + 1), tops[i + 1].y, 1.6);     // centre stage, under the lead
    if (i + 1 === 1 || i + 1 === 5) idle(nearRight(i + 1), tops[i + 1].y, 0.8);
  }
  const last = tops.length - 1;
  idle(mid(last), tops[last].y, 0.9);
  // run off the right edge — the loop brings him back in from the left
  run(mid(last), W + 24, tops[last].y);
  return segs;
}

export default function PixelRunner() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const spriteRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ W: 0, H: 0 });

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setSize({ W: e.contentRect.width, H: e.contentRect.height }));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const small = size.W > 0 && size.W < 768;
  const scale = small ? 2 : 3;             // integer scales keep every pixel square
  const charW = 16 * scale;
  const charH = 24 * scale;
  const platW = 54 * (small ? 1.5 : 2);
  const platH = 14 * (small ? 1.5 : 2);

  useEffect(() => {
    const sprite = spriteRef.current;
    const wrap = wrapRef.current;
    if (!sprite || !wrap || size.W === 0) return;

    const place = (x: number, yFeet: number, frame: number) => {
      sprite.style.transform = `translate3d(${Math.round(x)}px, ${Math.round(yFeet - charH + 2)}px, 0)`;
      sprite.style.backgroundPosition = `${-frame * charW}px 0`;
    };

    const segs = buildPath(size.W, size.H, platW, charW);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      const s = STEPS[3];
      place(s.x * size.W + platW / 2 - charW / 2, s.y * size.H, 0);
      return;
    }

    const total = segs.reduce((a, s) => a + s.t, 0);
    let visible = true;
    let raf = 0;
    let last = performance.now();
    let clock = 0;

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) { last = performance.now(); raf = requestAnimationFrame(tick); }
    });
    io.observe(wrap);

    function tick(now: number) {
      if (!visible) return;
      clock = (clock + Math.min(0.12, (now - last) / 1000)) % total;   // cap only real stalls (tab switches)
      last = now;
      let t = clock;
      let seg = segs[0];
      for (const s of segs) {
        if (t <= s.t) { seg = s; break; }
        t -= s.t;
      }
      const k = seg.t ? t / seg.t : 0;
      if (seg.kind === "run") {
        place(seg.x0 + (seg.x1 - seg.x0) * k, seg.y, 3 + (Math.floor(now / 110) % 4));
      } else if (seg.kind === "idle") {
        const blink = Math.floor(now / 140) % 22 === 0;
        place(seg.x, seg.y, blink ? 2 : Math.floor(now / 520) % 2);
      } else {
        // parabola through take-off, apex and landing
        const x = seg.x0 + (seg.x1 - seg.x0) * k;
        const y = (1 - k) * (1 - k) * seg.y0 + 2 * (1 - k) * k * (2 * seg.apex - (seg.y0 + seg.y1) / 2) + k * k * seg.y1;
        place(x, y, k < 0.5 ? 7 : 8);
      }
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [size, charW, charH, platW]);

  return (
    <div ref={wrapRef} className="pr-layer" aria-hidden="true">
      {size.W > 0 && STEPS.map((s, i) => (
        <img
          key={i}
          className="pr-step"
          src="/pixel/platform.png"
          alt=""
          width={platW}
          height={platH}
          style={{ left: s.x * size.W, top: s.y * size.H, width: platW, height: platH }}
        />
      ))}
      <div
        ref={spriteRef}
        className="pr-sprite"
        style={{
          width: charW,
          height: charH,
          backgroundSize: `${FRAMES * charW}px ${charH}px`,
          transform: "translate3d(-200px, 0, 0)",
        }}
      />
      <style>{`
        .pr-layer { position: absolute; inset: 0; pointer-events: none; z-index: 3; }
        .pr-step { position: absolute; image-rendering: pixelated; }
        .pr-sprite {
          position: absolute;
          left: 0;
          top: 0;
          background-image: url('/pixel/runner.png');
          background-repeat: no-repeat;
          image-rendering: pixelated;
          will-change: transform;
          filter: drop-shadow(0 2px 0 rgba(20, 20, 20, 0.18));
        }
      `}</style>
    </div>
  );
}
