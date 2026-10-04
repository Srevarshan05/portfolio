"use client";

/**
 * Motion primitives — the site's one motion language.
 * Tetris is the idea: things fall, land, lock into place.
 * All of it respects prefers-reduced-motion through <MotionConfig reducedMotion="user"> in page.tsx.
 */
import { createElement, useEffect, useRef, type ReactNode } from "react";
import {
  animate,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  type Variants,
} from "framer-motion";

export const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* ─────────────────────────────────────────────────────────────
   TetrisText — each letter drops from above and locks into place,
   landing in a scattered order like pieces in a stack.
   ───────────────────────────────────────────────────────────── */
interface TetrisTextProps {
  text: string;
  as?: "span" | "h1" | "h2" | "h3" | "h4" | "p" | "div";
  className?: string;
  id?: string;
  delay?: number;
  /** seconds between letters */
  step?: number;
}

export function TetrisText({ text, as = "span", className, id, delay = 0, step = 0.028 }: TetrisTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();
  const words = text.split(" ");
  const letterCount = text.replace(/\s/g, "").length;
  let index = 0;

  return createElement(
    as,
    { id, className, "aria-label": text },
    <span ref={ref}>
    {words.map((word, w) => (
        <span key={w} aria-hidden="true" style={{ display: "inline-block", whiteSpace: "nowrap" }}>
          {Array.from(word).map((ch) => {
            const i = index++;
            // Deterministic scatter: same order on server and client
            const order = (i * 7 + 3) % Math.max(letterCount, 1);
            const tilt = ((i * 37) % 50) - 25;
            return (
              <motion.span
                key={i}
                style={{ display: "inline-block", willChange: "transform" }}
                initial={reduce ? false : { y: "-120%", rotate: tilt, opacity: 0 }}
                animate={inView || reduce ? { y: "0%", rotate: 0, opacity: 1 } : undefined}
                transition={{
                  type: "spring",
                  stiffness: 560,
                  damping: 19,
                  mass: 0.9,
                  delay: delay + order * step,
                  opacity: { duration: 0.12, delay: delay + order * step },
                }}
              >
                {ch}
              </motion.span>
            );
          })}
          {w < words.length - 1 && " "}
        </span>
    ))}
    </span>
  );
}

/* ─────────────────────────────────────────────────────────────
   Reveal — one element entering on scroll
   ───────────────────────────────────────────────────────────── */
type RevealKind = "up" | "left" | "right" | "scale" | "wipe" | "blur" | "drop";

const revealVariants: Record<RevealKind, Variants> = {
  up:    { hidden: { opacity: 0, y: 56, filter: "blur(10px)" }, shown: { opacity: 1, y: 0, filter: "blur(0px)" } },
  left:  { hidden: { opacity: 0, x: -72, filter: "blur(10px)" }, shown: { opacity: 1, x: 0, filter: "blur(0px)" } },
  right: { hidden: { opacity: 0, x: 72, filter: "blur(10px)" }, shown: { opacity: 1, x: 0, filter: "blur(0px)" } },
  scale: { hidden: { opacity: 0, scale: 0.86, filter: "blur(12px)" }, shown: { opacity: 1, scale: 1, filter: "blur(0px)" } },
  blur:  { hidden: { opacity: 0, filter: "blur(18px)" }, shown: { opacity: 1, filter: "blur(0px)" } },
  wipe:  { hidden: { clipPath: "inset(0 100% 0 0)" }, shown: { clipPath: "inset(0 0% 0 0)" } },
  drop:  { hidden: { opacity: 0, y: -90, rotate: -6 }, shown: { opacity: 1, y: 0, rotate: 0 } },
};

interface RevealProps {
  children: ReactNode;
  kind?: RevealKind;
  delay?: number;
  duration?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article" | "aside" | "header" | "figure" | "p" | "span";
  amount?: number;
  style?: React.CSSProperties;
}

export function Reveal({ children, kind = "up", delay = 0, duration = 0.95, className, as = "div", amount = 0.25, style }: RevealProps) {
  const Comp = motion[as];
  const spring = kind === "drop";
  return (
    <Comp
      className={className}
      style={style}
      variants={revealVariants[kind]}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount }}
      transition={spring ? { type: "spring", stiffness: 380, damping: 18, delay } : { duration, ease: EASE_OUT, delay }}
    >
      {children}
    </Comp>
  );
}

/* ─────────────────────────────────────────────────────────────
   Stagger — children enter one after another
   ───────────────────────────────────────────────────────────── */
export function Stagger({
  children, className, as = "div", gap = 0.08, delay = 0, amount = 0.2,
}: { children: ReactNode; className?: string; as?: "div" | "ul" | "ol"; gap?: number; delay?: number; amount?: number }) {
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount }}
      variants={{ hidden: {}, shown: { transition: { staggerChildren: gap, delayChildren: delay } } }}
    >
      {children}
    </Comp>
  );
}

const itemVariants: Record<string, Variants> = {
  up:    { hidden: { opacity: 0, y: 36, filter: "blur(8px)" }, shown: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: EASE_OUT } } },
  right: { hidden: { opacity: 0, x: 60, filter: "blur(8px)" }, shown: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: EASE_OUT } } },
  pop:   { hidden: { opacity: 0, scale: 0.4, rotate: -8 }, shown: { opacity: 1, scale: 1, rotate: 0, transition: { type: "spring", stiffness: 520, damping: 20 } } },
  stamp: {
    hidden: { opacity: 0, scale: 1.9, rotate: -14, filter: "blur(6px)" },
    shown:  { opacity: 1, scale: 1, rotate: 0, filter: "blur(0px)", transition: { type: "spring", stiffness: 420, damping: 15, mass: 1.1 } },
  },
  tilt: {
    hidden: { opacity: 0, rotateX: 38, y: 90, transformPerspective: 1200 },
    shown:  { opacity: 1, rotateX: 0, y: 0, transformPerspective: 1200, transition: { duration: 1.1, ease: EASE_OUT } },
  },
};

export function StaggerItem({
  children, className, as = "div", kind = "up", style,
}: { children: ReactNode; className?: string; as?: "div" | "li" | "article" | "span"; kind?: keyof typeof itemVariants; style?: React.CSSProperties }) {
  const Comp = motion[as];
  return (
    <Comp className={className} variants={itemVariants[kind]} style={style}>
      {children}
    </Comp>
  );
}

/* ─────────────────────────────────────────────────────────────
   CountUp — a number that counts into place once it is seen
   ───────────────────────────────────────────────────────────── */
export function CountUp({ value, prefix = "", suffix = "", duration = 1.8, className }: {
  value: number; prefix?: string; suffix?: string; duration?: number; className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.8 });
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || !inView) return;
    if (reduce) { el.textContent = `${prefix}${value}${suffix}`; return; }
    const controls = animate(0, value, {
      duration,
      ease: EASE_OUT,
      onUpdate: (v) => { el.textContent = `${prefix}${Math.round(v)}${suffix}`; },
    });
    return () => controls.stop();
  }, [inView, value, prefix, suffix, duration, reduce]);

  return (
    <span ref={ref} className={className} aria-label={`${prefix}${value}${suffix}`}>
      {`${prefix}0${suffix}`}
    </span>
  );
}

/* ─────────────────────────────────────────────────────────────
   ScrollProgress — brand bar across the top of the viewport
   ───────────────────────────────────────────────────────────── */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 26, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden="true"
      style={{
        scaleX,
        transformOrigin: "0% 50%",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 4,
        zIndex: 2000,
        background: "linear-gradient(90deg, #FFB020, #E22D6D 45%, #A23DDB 75%, #2DC8E2)",
      }}
    />
  );
}
