"use client";
import { useEffect, useRef } from "react";

// Open dialogs, innermost last — only the top one reacts to Escape / Tab
const stack: symbol[] = [];
let lockedOverflow: string | null = null;

/**
 * useDialog — shared behaviour for every overlay on the page.
 * While `open`: Escape closes, the page behind stops scrolling, focus moves
 * into the dialog (first focusable element), Tab stays inside it, and focus
 * returns to whatever opened it on close.
 * Attach the returned ref to the dialog panel (not the backdrop).
 */
export function useDialog<T extends HTMLElement = HTMLDivElement>(open: boolean, onClose: () => void) {
  const panelRef = useRef<T>(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!open) return;
    const id = Symbol("dialog");
    stack.push(id);
    const isTop = () => stack[stack.length - 1] === id;
    const opener = document.activeElement as HTMLElement | null;
    const panel = panelRef.current;
    const focusables = () =>
      panel
        ? Array.from(
            panel.querySelectorAll<HTMLElement>(
              'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), iframe, [tabindex]:not([tabindex="-1"])'
            )
          )
        : [];

    const first = focusables()[0];
    (first ?? panel)?.focus({ preventScroll: true });

    const onKey = (e: KeyboardEvent) => {
      if (!isTop()) return;
      if (e.key === "Escape") {
        e.stopPropagation();
        onCloseRef.current();
        return;
      }
      if (e.key !== "Tab" || !panel) return;
      const items = focusables();
      if (items.length === 0) return;
      const head = items[0];
      const tail = items[items.length - 1];
      if (e.shiftKey && document.activeElement === head) {
        e.preventDefault();
        tail.focus();
      } else if (!e.shiftKey && document.activeElement === tail) {
        e.preventDefault();
        head.focus();
      }
    };

    if (stack.length === 1) {
      lockedOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
    }
    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("keydown", onKey);
      const at = stack.indexOf(id);
      if (at !== -1) stack.splice(at, 1);
      if (stack.length === 0) {
        document.body.style.overflow = lockedOverflow ?? "";
        lockedOverflow = null;
      }
      opener?.focus?.({ preventScroll: true });
    };
  }, [open]);

  return panelRef;
}
