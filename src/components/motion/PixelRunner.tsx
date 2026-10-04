"use client";

import { useEffect, useRef, useState } from "react";

/**
 * PixelRunner — a pixel character hopping across floating grass steps, left to right,
 * out the right edge and back in from the left, on a slow loop.
 *
 * Steps are laid out around the section's text, never over it: the text is measured,
 * steps go in the clear sky either side of it and in a row underneath, and every jump
 * arc is checked against the text and flattened when it would cross it.
 * Desktop only — below MIN_WIDTH nothing renders.
 *
 * Sprite sheet frames (16x24 native): 0 idle · 1 idle-breathe · 2 blink · 3–6 run · 7 rise · 8 fall.
 */

const MIN_WIDTH = 900;
const RUN_SPEED = 62;      // px per second — deliberately unhurried
const JUMP_TIME = 0.82;    // seconds in the air per hop
const FRAMES = 9;
const SCALE = 3;
const CHAR_W = 16 * SCALE;
const CHAR_H = 24 * SCALE;
const PLAT_W = 108;
const PLAT_H = 28;
const PAD = 14;            // clearance kept around text

interface Rect { l: number; t: number; r: number; b: number }
interface Step { x: number; y: number }

type Seg =
  | { kind: "run"; x0: number; x1: number; y: number; t: number }
  | { kind: "idle"; x: number; y: number; t: number }
  | { kind: "jump"; x0: number; y0: number; x1: number; y1: number; h: number; t: number };

const hits = (a: Rect, b: Rect) => a.l < b.r && a.r > b.l && a.t < b.b && a.b > b.t;
const charBox = (x: number, yFeet: number): Rect => ({ l: x + 6, r: x + CHAR_W - 6, t: yFeet - CHAR_H + 4, b: yFeet });
const jumpY = (s: { y0: number; y1: number; h: number }, k: number) => s.y0 + (s.y1 - s.y0) * k - 4 * s.h * k * (1 - k);

/** Text extents of each block inside the avoid element, relative to the layer */
function measureObstacles(layer: HTMLElement, avoid: HTMLElement): Rect[] {
  const base = layer.getBoundingClientRect();
  const out: Rect[] = [];
  avoid.querySelectorAll<HTMLElement>("h1, h2, h3, p").forEach((el) => {
    const range = document.createRange();
    range.selectNodeContents(el);
    const r = range.getBoundingClientRect();
    if (r.width && r.height) {
      out.push({ l: r.left - base.left - PAD, r: r.right - base.left + PAD, t: r.top - base.top - PAD, b: r.bottom - base.top + PAD });
    }
  });
  return out;
}

function layoutSteps(W: number, obstacles: Rect[]) {
  const textL = Math.min(...obstacles.map((o) => o.l));
  const textR = Math.max(...obstacles.map((o) => o.r));
  const textB = Math.max(...obstacles.map((o) => o.b));
  const head = obstacles.reduce((a, o) => (o.r - o.l > a.r - a.l ? o : a));   // the widest block: the heading
  const low = textB + CHAR_H + 40;              // the row beneath the text
  const near = low - 30;                        // side steps next to the row, still clear of the text
  const high = (head.t + head.b) / 2;           // side steps level with the heading

  const steps: Step[] = [];
  const leftZone = textL - 20;
  steps.push({ x: -PLAT_W * 0.3, y: leftZone > PLAT_W * 1.7 ? high : near });
  if (leftZone - PLAT_W > PLAT_W * 0.7 + 30) steps.push({ x: leftZone - PLAT_W, y: near });

  const tw = textR - textL;
  steps.push({ x: textL + tw * 0.16, y: low });
  steps.push({ x: textR - tw * 0.16 - PLAT_W, y: low + 34 });

  const rightZone = textR + 20;
  const lastX = W - PLAT_W * 0.7;
  if (lastX - rightZone > PLAT_W + 30) steps.push({ x: rightZone, y: near });
  steps.push({ x: lastX, y: W - rightZone > PLAT_W * 1.7 ? high : near });
  return { steps, floor: Math.max(...steps.map((s) => s.y)) + PLAT_H };
}

function buildPath(W: number, steps: Step[], obstacles: Rect[]): Seg[] {
  const segs: Seg[] = [];
  const run = (x0: number, x1: number, y: number) => segs.push({ kind: "run", x0, x1, y, t: Math.abs(x1 - x0) / RUN_SPEED });
  const idle = (x: number, y: number, t: number) => segs.push({ kind: "idle", x, y, t });
  const jump = (x0: number, y0: number, x1: number, y1: number) => {
    const t = JUMP_TIME + Math.abs(x1 - x0) / 1400;
    const natural = Math.max(54, Math.min(110, Math.abs(x1 - x0) * 0.22));
    // highest arc that stays clear of the text
    for (const h of [natural, 70, 44, 24, 10, 0]) {
      let clear = true;
      for (let i = 0; i <= 24 && clear; i++) {
        const k = i / 24;
        const box = charBox(x0 + (x1 - x0) * k, jumpY({ y0, y1, h }, k));
        clear = !obstacles.some((o) => hits(box, o));
      }
      if (clear || h === 0) { segs.push({ kind: "jump", x0, y0, x1, y1, h, t }); return; }
    }
  };

  const inset = CHAR_W * 0.15;
  const mid = (s: Step) => s.x + PLAT_W / 2 - CHAR_W / 2;
  const nearLeft = (s: Step) => s.x + inset;
  const nearRight = (s: Step) => s.x + PLAT_W - CHAR_W - inset;
  const last = steps.length - 1;

  run(-CHAR_W - 20, mid(steps[0]), steps[0].y);
  idle(mid(steps[0]), steps[0].y, 0.9);
  for (let i = 0; i < last; i++) {
    const from = i === 0 ? mid(steps[0]) : nearRight(steps[i]);
    jump(from, steps[i].y, nearLeft(steps[i + 1]), steps[i + 1].y);
    run(nearLeft(steps[i + 1]), i + 1 === last ? mid(steps[last]) : nearRight(steps[i + 1]), steps[i + 1].y);
    if (steps[i + 1].y > steps[i].y + 10 && i + 1 < last) idle(nearRight(steps[i + 1]), steps[i + 1].y, 1.3);
  }
  idle(mid(steps[last]), steps[last].y, 0.9);
  run(mid(steps[last]), W + 24, steps[last].y);       // off the right edge; the loop re-enters from the left
  return segs;
}

export default function PixelRunner({ avoid }: { avoid: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const spriteRef = useRef<HTMLDivElement>(null);
  const [scene, setScene] = useState<{ W: number; steps: Step[]; segs: Seg[] } | null>(null);

  // Measure the text and lay the steps out around it
  useEffect(() => {
    const wrap = wrapRef.current;
    const host = wrap?.parentElement;
    const target = host?.querySelector<HTMLElement>(avoid);
    if (!wrap || !host || !target) return;

    let timer = 0;
    const measure = () => {
      const W = wrap.clientWidth;
      if (W < MIN_WIDTH) { setScene(null); host.style.removeProperty("--runner-floor"); return; }
      const obstacles = measureObstacles(wrap, target);
      if (!obstacles.length) return;
      const { steps, floor } = layoutSteps(W, obstacles);
      // make room beneath the text for the lower row of steps
      const textB = Math.max(...obstacles.map((o) => o.b));
      host.style.setProperty("--runner-floor", `${Math.max(0, Math.ceil(floor - textB + 24))}px`);
      setScene({ W, steps, segs: buildPath(W, steps, obstacles) });
    };
    const later = () => { window.clearTimeout(timer); timer = window.setTimeout(measure, 120); };

    measure();
    document.fonts?.ready.then(measure);
    const ro = new ResizeObserver(later);
    ro.observe(wrap);
    // text eases in on first view; measure again once it has settled
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) window.setTimeout(measure, 1600); });
    io.observe(target);
    return () => { ro.disconnect(); io.disconnect(); window.clearTimeout(timer); host.style.removeProperty("--runner-floor"); };
  }, [avoid]);

  // Drive the sprite
  useEffect(() => {
    const sprite = spriteRef.current;
    const wrap = wrapRef.current;
    if (!sprite || !wrap || !scene) return;

    const place = (x: number, yFeet: number, frame: number) => {
      sprite.style.transform = `translate3d(${Math.round(x)}px, ${Math.round(yFeet - CHAR_H + 2)}px, 0)`;
      sprite.style.backgroundPosition = `${-frame * CHAR_W}px 0`;
    };

    const { segs, steps } = scene;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const s = steps[Math.floor(steps.length / 2)];
      place(s.x + PLAT_W / 2 - CHAR_W / 2, s.y, 0);
      return;
    }

    const total = segs.reduce((a, s) => a + s.t, 0);
    let visible = false;
    let raf = 0;
    let last = performance.now();
    let clock = 0;

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
        place(seg.x0 + (seg.x1 - seg.x0) * k, jumpY(seg, k), k < 0.5 ? 7 : 8);
      }
      raf = requestAnimationFrame(tick);
    }

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible) { last = performance.now(); raf = requestAnimationFrame(tick); }
    });
    io.observe(wrap);
    return () => { cancelAnimationFrame(raf); io.disconnect(); };
  }, [scene]);

  return (
    <div ref={wrapRef} className="pr-layer" aria-hidden="true">
      {scene && scene.steps.map((s, i) => (
        <img
          key={i}
          className="pr-step"
          src="/pixel/platform.png"
          alt=""
          width={PLAT_W}
          height={PLAT_H}
          style={{ left: s.x, top: s.y }}
        />
      ))}
      {scene && (
        <div
          ref={spriteRef}
          className="pr-sprite"
          style={{ width: CHAR_W, height: CHAR_H, backgroundSize: `${FRAMES * CHAR_W}px ${CHAR_H}px`, transform: "translate3d(-200px, 0, 0)" }}
        />
      )}
      <style>{`
        .pr-layer { position: absolute; inset: 0; pointer-events: none; z-index: 1; }
        .pr-step { position: absolute; width: ${PLAT_W}px; height: ${PLAT_H}px; image-rendering: pixelated; }
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
