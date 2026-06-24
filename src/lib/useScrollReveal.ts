"use client";
import { useEffect, useRef, RefObject } from "react";

/**
 * useScrollReveal — Attaches IntersectionObserver to a container ref.
 * Any child with class "reveal", "reveal-left", "reveal-right", or "reveal-scale"
 * gets the "visible" class added when it enters the viewport.
 */
export function useScrollReveal(ref: RefObject<HTMLElement | null>, rootMargin = "-60px") {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets = el.querySelectorAll<HTMLElement>(
      ".reveal, .reveal-left, .reveal-right, .reveal-scale"
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            // Once visible, stop watching — no repeat animation
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin, threshold: 0.12 }
    );

    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, [ref, rootMargin]);
}

/**
 * useElementReveal — Directly observe a single element.
 */
export function useElementReveal(rootMargin = "-40px") {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.disconnect();
        }
      },
      { rootMargin, threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  return ref;
}
