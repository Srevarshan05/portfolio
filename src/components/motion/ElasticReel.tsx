"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * ElasticReel: a row of narrow vertical bars, each a slice of its image.
 * Bars near the pointer widen and rise dock-style on an elastic spring; when idle an autoplay
 * sweep walks the focus along the row. Click (or Enter) opens a bar to the full image while
 * the rest dim and blur. Wheel and arrow keys step the focus.
 */
export interface ReelItem {
  src: string;
  /** small centre-cropped thumbnail shown on the closed bar */
  thumb: string;
  alt: string;
  title: string;
  subtitle?: string;
  /** width / height of the image, used when the bar opens */
  aspect: number;
}

interface Props {
  items: ReelItem[];
  barWidth?: number;
  barHeight?: number;     // fraction of the component height
  gap?: number;
  radius?: number;
  magnify?: number;       // width multiplier at the focus
  lift?: number;          // height multiplier at the focus
  influence?: number;     // px around the focus that grows
  openSize?: number;      // height of an open item as a fraction of the component
  elasticity?: number;    // 0 smooth … 1 springy
  blur?: number;
  dim?: number;
  interval?: number;      // seconds per autoplay step
  height?: number;
}

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));


export default function ElasticReel({
  items,
  barWidth = 44,
  barHeight = 0.5,
  gap = 10,
  radius = 12,
  magnify = 2.4,
  lift = 1.15,
  influence = 200,
  openSize = 0.72,
  elasticity = 0.35,
  blur = 0.5,
  dim = 0.45,
  interval = 4,
  height = 560,
}: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const barRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [open, setOpen] = useState(-1);
  const [focusIdx, setFocusIdx] = useState(0);
  const [width, setWidth] = useState(0);
  const openRef = useRef(-1);
  useEffect(() => { openRef.current = open; }, [open]);

  // pointer / autoplay focus, in "rest layout" px from the row's left edge
  const target = useRef({ x: 0, strength: 0, hovering: false, autoIdx: 0 });
  const spring = useRef({ x: 0, vx: 0, s: 0, vs: 0 });
  const bars = useRef<{ w: number; vw: number; h: number; vh: number; dirty: boolean }[]>([]);

  const n = items.length;
  // fit the row to the container
  const bw = width ? clamp((width - 32) / n - gap, 10, barWidth) : barWidth;
  const g = width && bw < barWidth ? Math.max(3, gap * (bw / barWidth)) : gap;
  const restRow = n * bw + (n - 1) * g;
  // narrow screens: gentler swell so the row never overflows
  const small = width > 0 && width < 700;
  const mag = small ? Math.min(magnify, 1.7) : magnify;
  const inf = small ? Math.min(influence, 70) : influence;
  const restCenter = (i: number) => i * (bw + g) + bw / 2;

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setWidth(e.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // autoplay sweep: step the focus along the row while idle
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || interval <= 0) return;
    const id = window.setInterval(() => {
      const t = target.current;
      if (t.hovering || openRef.current >= 0) return;
      t.autoIdx = (t.autoIdx + 1) % n;
      setFocusIdx(t.autoIdx);
    }, interval * 1000);
    return () => window.clearInterval(id);
  }, [interval, n]);

  // spring loop: focus position, focus strength, and each bar's size
  useEffect(() => {
    if (!width) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (bars.current.length !== n) bars.current = items.map(() => ({ w: bw, vw: 0, h: 0, vh: 0, dirty: true }));
    const H = rootRef.current?.clientHeight ?? height;
    const restH = H * barHeight;
    const k = 170, damp = 2 * Math.sqrt(k) * (1 - clamp(elasticity, 0, 0.95) * 0.8);
    let raf = 0, last = performance.now(), visible = true;

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) { last = performance.now(); raf = requestAnimationFrame(tick); }
    });
    if (rootRef.current) io.observe(rootRef.current);

    function tick(now: number) {
      if (!visible) return;
      const dt = Math.min(0.033, (now - last) / 1000); last = now;
      const t = target.current, sp = spring.current;
      const op = openRef.current;
      const tx = t.hovering ? t.x : restCenter(t.autoIdx);
      const ts = op >= 0 ? 0 : t.hovering ? 1 : 0.85;
      if (reduce) { sp.x = tx; sp.s = ts; } else {
        sp.vx += (k * (tx - sp.x) - damp * sp.vx) * dt; sp.x += sp.vx * dt;
        sp.vs += (k * (ts - sp.s) - damp * sp.vs) * dt; sp.s += sp.vs * dt;
      }
      for (let i = 0; i < n; i++) {
        const b = bars.current[i];
        let tw: number, th: number;
        if (op >= 0) {
          if (i === op) { th = H * openSize; tw = Math.min(th * items[i].aspect, (rootRef.current?.clientWidth ?? 800) - 40); th = tw / items[i].aspect; }
          else { tw = bw * 0.7; th = restH * 0.82; }
        } else {
          const d = Math.abs(restCenter(i) - sp.x);
          const f = d < inf ? Math.cos((d / inf) * (Math.PI / 2)) ** 2 : 0;
          const e = f * clamp(sp.s, 0, 1.2);
          tw = bw * (1 + (mag - 1) * e);
          th = restH * (1 + (lift - 1) * e);
        }
        const settled = Math.abs(tw - b.w) < 0.2 && Math.abs(th - b.h) < 0.2 && Math.abs(b.vw) < 0.2 && Math.abs(b.vh) < 0.2;
        if (settled && !b.dirty) continue;
        if (reduce || settled) { b.w = tw; b.h = th; b.vw = 0; b.vh = 0; } else {
          b.vw += (k * (tw - b.w) - damp * b.vw) * dt; b.w += b.vw * dt;
          b.vh += (k * (th - b.h) - damp * b.vh) * dt; b.h += b.vh * dt;
        }
        b.dirty = !settled;
        const el = barRefs.current[i];
        if (el) {
          // whole pixels: avoids re-rasterising the images on sub-pixel changes
          el.style.width = `${Math.max(4, Math.round(b.w))}px`;
          el.style.height = `${Math.max(10, Math.round(b.h))}px`;
        }
      }
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); io.disconnect(); };
  }, [width, bw, g, n, items, barHeight, elasticity, inf, mag, lift, openSize, height]); // eslint-disable-line react-hooks/exhaustive-deps

  const onPointerMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || openRef.current >= 0) return;
    const el = rootRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left - (r.width - restRow) / 2;
    const t = target.current;
    t.hovering = true;
    t.x = clamp(x, -inf / 2, restRow + inf / 2);
    const idx = clamp(Math.round((t.x - bw / 2) / (bw + g)), 0, n - 1);
    t.autoIdx = idx;
    setFocusIdx(idx);
  };
  const onPointerLeave = () => { target.current.hovering = false; };

  const step = useCallback((dir: number) => {
    const t = target.current;
    t.hovering = false;
    t.autoIdx = (t.autoIdx + dir + n) % n;
    setFocusIdx(t.autoIdx);
    if (openRef.current >= 0) setOpen(t.autoIdx);
  }, [n]);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    let acc = 0;
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) < Math.abs(e.deltaY) && openRef.current < 0) return;   // let vertical scroll pass unless open
      e.preventDefault();
      acc += e.deltaX || e.deltaY;
      if (Math.abs(acc) > 60) { step(acc > 0 ? 1 : -1); acc = 0; }
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [step]);

  const toggle = (i: number) => {
    target.current.autoIdx = i;
    setFocusIdx(i);
    setOpen((o) => (o === i ? -1 : i));
  };

  const shown = open >= 0 ? open : focusIdx;
  const item = items[shown];

  return (
    <div
      ref={rootRef}
      className={`er ${open >= 0 ? "is-open" : ""}`}
      style={{ height, ["--er-radius" as string]: `${radius}px`, ["--er-gap" as string]: `${g}px`, ["--er-blur" as string]: `${blur * 6}px`, ["--er-dim" as string]: `${1 - dim}` }}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") { e.preventDefault(); step(1); }
        if (e.key === "ArrowLeft") { e.preventDefault(); step(-1); }
        if (e.key === "Escape" && open >= 0) { e.preventDefault(); setOpen(-1); }
      }}
      role="group"
      aria-roledescription="carousel"
      aria-label="Certificates. Hover or use arrow keys to browse, click to open."
    >
      <div className="er-row">
        {items.map((it, i) => (
          <button
            key={it.src}
            ref={(el) => { barRefs.current[i] = el; }}
            type="button"
            className={`er-bar ${i === open ? "is-active" : ""} ${open >= 0 && i !== open ? "is-dimmed" : ""}`}
            style={{ width: bw, height: height * barHeight }}
            onClick={() => toggle(i)}
            onFocus={() => { target.current.hovering = false; target.current.autoIdx = i; setFocusIdx(i); }}
            aria-label={`${it.title}${it.subtitle ? `, ${it.subtitle}` : ""}`}
            aria-pressed={i === open}
          >
            <img className="er-thumb" src={it.thumb} alt="" loading="lazy" decoding="async" draggable={false} />
            {/* the full certificate is only fetched once its bar is opened */}
            {i === open && <img className="er-full" src={it.src} alt={it.alt} decoding="async" draggable={false} />}
          </button>
        ))}
      </div>
      <div className="er-caption" aria-live="polite">
        <strong>{item?.title}</strong>
        {item?.subtitle && <span>{item.subtitle}</span>}
      </div>

      <style>{`
        .er { position: relative; width: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; outline: none; user-select: none; }
        .er:focus-visible { box-shadow: inset 0 0 0 2px rgba(255,255,255,0.4); }
        .er-row { display: flex; align-items: center; justify-content: center; gap: var(--er-gap); width: 100%; }
        .er-bar {
          position: relative; flex: none; padding: 0; border: 0; cursor: pointer; overflow: hidden;
          border-radius: var(--er-radius); background: #F4F4F2;
          contain: strict;
          transition: filter 380ms cubic-bezier(0.16,1,0.3,1), opacity 380ms;
          will-change: width, height;
        }
        .er-bar img { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; }
        .er-thumb { object-fit: cover; object-position: center; }
        .er-full { object-fit: contain; background: #FFFFFF; animation: erIn 320ms ease both; }
        @keyframes erIn { from { opacity: 0; } to { opacity: 1; } }
        .er-bar.is-dimmed { filter: blur(var(--er-blur)) brightness(var(--er-dim)); }
        .er-bar:focus-visible { outline: 2px solid #FFFFFF; outline-offset: 3px; }
        .er-caption {
          min-height: 46px; margin-top: 22px; display: flex; flex-direction: column; align-items: center; gap: 4px;
          text-align: center; padding: 0 16px; font-family: 'Geist', system-ui, sans-serif;
        }
        .er-caption strong { font-size: 16px; font-weight: 600; letter-spacing: -0.01em; color: #FFFFFF; }
        .er-caption span { font-size: 13.5px; color: #B7C4ED; }
        @media (prefers-reduced-motion: reduce) { .er-bar { transition: none; } }
      `}</style>
    </div>
  );
}
