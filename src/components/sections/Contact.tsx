"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { EASE_OUT, Reveal, Stagger, StaggerItem, TetrisText } from "@/components/motion";
import { profileById } from "@/lib/profiles";

const TO_EMAIL = "srevarshan9600622@gmail.com";
const DRAFT_KEY = "sv-contact-draft";

type Fields = { name: string; email: string; subject: string; message: string };
type FieldErrors = Partial<Record<keyof Fields, string>>;
type SendState = "idle" | "sending" | "sent" | "failed";

const EMPTY: Fields = { name: "", email: "", subject: "", message: "" };

const CHANNELS = ["linkedin", "github", "youtube"].map(profileById);
const CHANNEL_TINT: Record<string, string> = { linkedin: "#3D8FE0", github: "#FFFFFF", youtube: "#FF3B3B" };
const CAPABILITIES = ["LLMs", "VLMs", "OCR", "Edge AI", "RAG", "AI Agents", "Full-Stack AI", "NVIDIA Jetson"];

/* Tetromino cells on a 4x2 grid */
const SHAPES: Record<string, [number, number][]> = {
  I: [[0, 0], [1, 0], [2, 0], [3, 0]],
  O: [[0, 0], [1, 0], [0, 1], [1, 1]],
  T: [[0, 0], [1, 0], [2, 0], [1, 1]],
  L: [[0, 0], [0, 1], [1, 1], [2, 1]],
  S: [[1, 0], [2, 0], [0, 1], [1, 1]],
};
const BLOCKS = [
  { shape: "T", left: 4, size: 14, dur: 19, delay: -2, color: "#E22D6D", spin: 1 },
  { shape: "I", left: 14, size: 10, dur: 26, delay: -14, color: "#2DC8E2", spin: -1 },
  { shape: "O", left: 27, size: 12, dur: 22, delay: -7, color: "#FFB020", spin: 1 },
  { shape: "L", left: 41, size: 9, dur: 30, delay: -20, color: "#A23DDB", spin: -1 },
  { shape: "S", left: 55, size: 13, dur: 21, delay: -11, color: "#2BB04A", spin: 1 },
  { shape: "T", left: 68, size: 10, dur: 27, delay: -4, color: "#2DC8E2", spin: -1 },
  { shape: "I", left: 79, size: 12, dur: 24, delay: -17, color: "#E22D6D", spin: 1 },
  { shape: "O", left: 90, size: 9, dur: 29, delay: -9, color: "#A23DDB", spin: -1 },
  { shape: "L", left: 96, size: 11, dur: 23, delay: -24, color: "#FFB020", spin: 1 },
];

function FallingBlocks() {
  return (
    <div className="fx-blocks" aria-hidden="true">
      {BLOCKS.map((b, i) => (
        <svg
          key={i}
          className="fx-block"
          width={b.size * 4 + 6}
          height={b.size * 2 + 6}
          viewBox={`-3 -3 ${b.size * 4 + 6} ${b.size * 2 + 6}`}
          style={{
            left: `${b.left}%`,
            animationDuration: `${b.dur}s`,
            animationDelay: `${b.delay}s`,
            ["--spin" as string]: `${b.spin * 180}deg`,
          }}
        >
          {SHAPES[b.shape].map(([x, y], j) => (
            <rect key={j} x={x * b.size} y={y * b.size} width={b.size - 1.5} height={b.size - 1.5} fill={b.color} />
          ))}
        </svg>
      ))}
    </div>
  );
}
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(f: Fields): FieldErrors {
  const errors: FieldErrors = {};
  if (!f.email.trim()) errors.email = "Add your email so I can reply.";
  else if (!EMAIL_RE.test(f.email.trim())) errors.email = "That email doesn't look right — check for typos.";
  if (!f.name.trim()) errors.name = "Add your name.";
  if (!f.message.trim()) errors.message = "Write a message, or use AI draft below.";
  else if (f.message.trim().length < 10) errors.message = "Add a little more detail (at least 10 characters).";
  return errors;
}

function mailtoHref(f: Fields) {
  const subject = f.subject.trim() || "Portfolio Inquiry";
  const body = `${f.message}\n\n— ${f.name}${f.email ? ` (${f.email})` : ""}`;
  return `mailto:${TO_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function ContactSection() {
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [sendState, setSendState] = useState<SendState>("idle");
  const [sendError, setSendError] = useState("");
  const [minimized, setMinimized] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  // Window leans toward the cursor, and holds still while someone is typing
  const [focusWithin, setFocusWithin] = useState(false);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-6, 6]), { stiffness: 140, damping: 18 });
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [5, -5]), { stiffness: 140, damping: 18 });
  const onTilt = (e: React.PointerEvent<HTMLDivElement>) => {
    if (focusWithin || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };
  const resetTilt = () => { px.set(0); py.set(0); };

  // AI draft
  const [aiOpen, setAiOpen] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");
  const [drafting, setDrafting] = useState(false);
  const [aiError, setAiError] = useState("");
  const [typing, setTyping] = useState(false);
  const [preDraft, setPreDraft] = useState<Pick<Fields, "subject" | "message"> | null>(null);

  const typingTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const typingTarget = useRef<Pick<Fields, "subject" | "message">>({ subject: "", message: "" });
  const abortRef = useRef<AbortController | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const aiInputRef = useRef<HTMLInputElement>(null);
  const restored = useRef(false);

  /* ── Draft persistence: a reload never loses what someone wrote ── */
  useEffect(() => {
    let saved: Fields | null = null;
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (raw) saved = { ...EMPTY, ...JSON.parse(raw) };
    } catch { /* storage unavailable — start empty */ }
    restored.current = true;
    if (!saved) return;
    const draftToRestore = saved;
    const frame = requestAnimationFrame(() => setFields(draftToRestore));
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!restored.current) return;
    try {
      const hasContent = Object.values(fields).some((v) => v.trim());
      if (hasContent) localStorage.setItem(DRAFT_KEY, JSON.stringify(fields));
      else localStorage.removeItem(DRAFT_KEY);
    } catch { /* ignore */ }
  }, [fields]);

  /* ── Auto-grow message body ── */
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 520)}px`;
  }, [fields.message, minimized, expanded]);

  useEffect(() => () => {
    if (typingTimer.current) clearInterval(typingTimer.current);
    abortRef.current?.abort();
  }, []);

  useEffect(() => {
    if (aiOpen) aiInputRef.current?.focus();
  }, [aiOpen]);

  /* ── Typing animation: fields are read-only while it runs; any interaction completes it ── */
  const finishTyping = useCallback(() => {
    if (typingTimer.current) {
      clearInterval(typingTimer.current);
      typingTimer.current = null;
    }
    setFields((prev) => ({ ...prev, ...typingTarget.current }));
    setTyping(false);
  }, []);

  const typeIn = useCallback((target: Pick<Fields, "subject" | "message">) => {
    typingTarget.current = target;
    if (prefersReducedMotion()) {
      setFields((prev) => ({ ...prev, ...target }));
      return;
    }
    const subjectTokens = target.subject.split(/(\s+)/);
    const messageTokens = target.message.split(/(\s+)/);
    // Finish in roughly a second and a half no matter how long the draft is
    const step = Math.max(1, Math.ceil(messageTokens.length / 70));
    let s = 0;
    let m = 0;
    setTyping(true);
    setFields((prev) => ({ ...prev, subject: "", message: "" }));
    typingTimer.current = setInterval(() => {
      s = Math.min(subjectTokens.length, s + step);
      m = Math.min(messageTokens.length, m + step);
      setFields((prev) => ({
        ...prev,
        subject: subjectTokens.slice(0, s).join(""),
        message: messageTokens.slice(0, m).join(""),
      }));
      if (s >= subjectTokens.length && m >= messageTokens.length) finishTyping();
    }, 22);
  }, [finishTyping]);

  const update = (key: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (typing) return;
    const value = e.target.value;
    setFields((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
    if (sendState === "failed") setSendState("idle");
  };

  /* ── Send ── */
  const send = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (typing) finishTyping();
    if (sendState === "sending") return;

    const current = typing ? { ...fields, ...typingTarget.current } : fields;
    const found = validate(current);
    setErrors(found);
    if (Object.keys(found).length) {
      const first = (["email", "name", "message"] as const).find((k) => found[k]);
      if (first) document.getElementById(`contact-${first}`)?.focus();
      return;
    }

    setSendState("sending");
    setSendError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind: "message",
          name: current.name.trim(),
          email: current.email.trim(),
          subject: current.subject.trim(),
          message: current.message.trim(),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data.delivered === false) {
        throw new Error(data.message || "The mail server didn't accept the message.");
      }
      setSendState("sent");
      setFields(EMPTY);
      setPreDraft(null);
      setAiOpen(false);
    } catch (err) {
      setSendState("failed");
      setSendError(err instanceof Error ? err.message : "Something went wrong while sending.");
    }
  };

  const onFormKeyDown = (e: React.KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      send();
    }
  };

  /* ── AI draft (its own form — Enter here never sends the email) ── */
  const draft = async (e: React.FormEvent) => {
    e.preventDefault();
    const prompt = aiPrompt.trim();
    if (!prompt || drafting) return;
    if (typing) finishTyping();

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    setDrafting(true);
    setAiError("");
    try {
      const res = await fetch("/api/draft", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
        signal: controller.signal,
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || (!data.subject && !data.message)) {
        throw new Error(data.message || "The AI couldn't write a draft this time.");
      }
      setPreDraft({ subject: fields.subject, message: fields.message });
      setAiPrompt("");
      setAiOpen(false);
      setErrors((prev) => ({ ...prev, message: undefined }));
      typeIn({ subject: data.subject || fields.subject, message: data.message || fields.message });
    } catch (err) {
      if (controller.signal.aborted) return;
      setAiError(err instanceof Error ? `${err.message} Try rephrasing, or write it yourself.` : "Draft failed. Try again.");
    } finally {
      if (abortRef.current === controller) {
        abortRef.current = null;
        setDrafting(false);
      }
    }
  };

  const cancelDraft = () => {
    abortRef.current?.abort();
    abortRef.current = null;
    setDrafting(false);
  };

  const undoDraft = () => {
    if (!preDraft) return;
    if (typing) finishTyping();
    setFields((prev) => ({ ...prev, ...preDraft }));
    setPreDraft(null);
  };

  const discard = () => {
    const hasContent = Object.values(fields).some((v) => v.trim());
    if (hasContent && !window.confirm("Discard this draft?")) return;
    if (typing) finishTyping();
    cancelDraft();
    setFields(EMPTY);
    setErrors({});
    setPreDraft(null);
    setAiOpen(false);
    setSendState("idle");
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(TO_EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch { /* clipboard blocked — the address is visible to copy by hand */ }
  };

  const busy = drafting || typing;
  const status =
    sendState === "sending" ? "Sending your message…" :
    drafting ? "Writing a draft…" :
    typing ? "Draft ready — click any field to skip the animation." : "";

  return (
    <section id="contact" className="fx-section" aria-labelledby="contact-title">
      <FallingBlocks />

      <div className="fx-inner">
        <header className="fx-head">
          <h2 id="contact-title" className="fx-title" aria-label="Let's Build Something Great!">
            <TetrisText className="fx-line" text="Let's Build" step={0.04} />
            <TetrisText className="fx-line fx-line-2" text="Something Great!" delay={0.3} step={0.035} />
          </h2>
          <Reveal as="p" kind="up" delay={0.7} className="fx-lead">
            Hiring, collaborating, or have a problem worth solving with AI? Write to me here,
            or describe what you need and let AI draft the email for you.
          </Reveal>
        </header>

        <div className={`fx-grid ${expanded ? "is-wide" : ""}`}>
          <aside className="fx-channels" aria-label="Other ways to reach me">
            <Stagger as="ul" className="fx-ch-list" gap={0.09} delay={0.2}>
              <StaggerItem as="li" className="fx-ch fx-ch-mail">
                <span className="fx-ch-icon" aria-hidden="true">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round"><rect x="2.5" y="4.5" width="19" height="15" rx="2" /><path d="m3 6 9 7 9-7" /></svg>
                </span>
                <span className="fx-ch-text">
                  <span className="fx-ch-name">Email</span>
                  <a className="fx-ch-value" href={`mailto:${TO_EMAIL}`}>{TO_EMAIL}</a>
                </span>
                <button type="button" className="fx-copy" onClick={copyEmail}>
                  <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
                </button>
              </StaggerItem>
              {CHANNELS.map((c) => (
                <StaggerItem as="li" key={c.id} className="fx-ch">
                  <a className="fx-ch-link" href={c.url} target="_blank" rel="noopener noreferrer" style={{ ["--ch" as string]: CHANNEL_TINT[c.id] }}>
                    <span className="fx-ch-icon" aria-hidden="true">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d={c.svgPath} /></svg>
                    </span>
                    <span className="fx-ch-text">
                      <span className="fx-ch-name">{c.name}</span>
                      <span className="fx-ch-value">{c.handle}</span>
                    </span>
                    <svg className="fx-ch-go" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9" /></svg>
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </StaggerItem>
              ))}
            </Stagger>
            <Reveal as="p" kind="blur" delay={0.6} className="fx-based">
              <span className="fx-based-dot" aria-hidden="true" /> Based in Tiruchirappalli, India
            </Reveal>
          </aside>

          <motion.div
            className="fx-stage"
            initial={{ opacity: 0, y: 90, rotateX: 28, transformPerspective: 1400 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0, transformPerspective: 1400 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.1, ease: EASE_OUT, delay: 0.15 }}
          >
          <motion.div
            className="fx-tilt"
            style={{ rotateX, rotateY, transformPerspective: 1200 }}
            onPointerMove={onTilt}
            onPointerLeave={resetTilt}
            onFocusCapture={() => { setFocusWithin(true); resetTilt(); }}
            onBlurCapture={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocusWithin(false); }}
          >
          <div className={`ct-window ${minimized ? "is-min" : ""} ${expanded ? "is-wide" : ""}`}>
            {/* Title bar — every control works */}
            <div className="ct-bar">
              <span className="ct-bar-title">{sendState === "sent" ? "Message sent" : "New Message"}</span>
              <div className="ct-bar-controls">
                <button type="button" onClick={() => setMinimized((v) => !v)} aria-label={minimized ? "Restore message window" : "Minimize message window"} aria-pressed={minimized}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.75" strokeLinecap="round" aria-hidden="true">
                    {minimized ? <path d="M6 15l6-6 6 6" /> : <path d="M5 18h14" />}
                  </svg>
                </button>
                <button type="button" className="ct-only-desktop" onClick={() => { setExpanded((v) => !v); setMinimized(false); }} aria-label={expanded ? "Shrink message window" : "Expand message window"} aria-pressed={expanded}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    {expanded
                      ? <path d="M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5" />
                      : <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />}
                  </svg>
                </button>
                <button type="button" onClick={discard} aria-label="Discard draft">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.75" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
                </button>
              </div>
            </div>

            {!minimized && (
            <AnimatePresence mode="wait" initial={false}>
            {sendState === "sent" ? (
              <motion.div
                key="sent"
                className="ct-sent"
                role="status"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <svg className="ct-plane" width="140" height="110" viewBox="0 0 140 110" fill="none" aria-hidden="true">
                  <motion.path
                    d="M4 104c26-4 36-22 52-40"
                    stroke="#94A3CC" strokeWidth="3" strokeLinecap="round" strokeDasharray="5 8"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                    transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.25 }}
                  />
                  <motion.g
                    initial={{ x: -70, y: 50, rotate: -22, opacity: 0 }}
                    animate={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 160, damping: 14, delay: 0.15 }}
                  >
                    <path d="M50 66 128 14 100 104 78 78 50 66Z" fill="#FFFFFF" stroke="#1C202B" strokeWidth="4" strokeLinejoin="round" />
                    <path d="M128 14 78 78v24l14-17" stroke="#1C202B" strokeWidth="4" strokeLinejoin="round" strokeLinecap="round" />
                  </motion.g>
                </svg>
                <h3 className="ct-sent-title">Message sent!</h3>
                <p className="ct-sent-text">Thanks for reaching out. Your message is in my inbox and I&apos;ll reply to the email you gave.</p>
                <button type="button" className="ct-btn ct-btn-ghost" onClick={() => setSendState("idle")}>
                  Write another message
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="compose"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, rotateX: 72, y: -70, scale: 0.78, transition: { duration: 0.5, ease: [0.7, 0, 0.84, 0] } }}
                transition={{ duration: 0.45, ease: EASE_OUT }}
                style={{ transformOrigin: "50% 0%", transformPerspective: 1000 }}
              >
                <form id="compose-form" className="ct-form" onSubmit={send} onKeyDown={onFormKeyDown} noValidate aria-busy={busy}>
                  <div className="ct-row">
                    <span className="ct-label" id="contact-to-label">To</span>
                    <span className="ct-recipient" aria-labelledby="contact-to-label">
                      <span className="ct-avatar" aria-hidden="true">S</span>
                      <span className="ct-recipient-name">Sre Varshan</span>
                      <span className="ct-recipient-email">{TO_EMAIL}</span>
                    </span>
                  </div>

                  <div className={`ct-row ${errors.email ? "has-error" : ""}`}>
                    <label htmlFor="contact-email" className="ct-label">From</label>
                    <input
                      id="contact-email" name="email" type="email" inputMode="email" autoComplete="email"
                      className="ct-input" placeholder="you@company.com"
                      value={fields.email} onChange={update("email")}
                      aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "contact-email-error" : undefined}
                      readOnly={typing} onPointerDown={typing ? finishTyping : undefined}
                    />
                  </div>
                  {errors.email && <p id="contact-email-error" className="ct-error">{errors.email}</p>}

                  <div className={`ct-row ${errors.name ? "has-error" : ""}`}>
                    <label htmlFor="contact-name" className="ct-label">Name</label>
                    <input
                      id="contact-name" name="name" type="text" autoComplete="name"
                      className="ct-input" placeholder="Your name"
                      value={fields.name} onChange={update("name")}
                      aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "contact-name-error" : undefined}
                      readOnly={typing} onPointerDown={typing ? finishTyping : undefined}
                    />
                  </div>
                  {errors.name && <p id="contact-name-error" className="ct-error">{errors.name}</p>}

                  <div className="ct-row">
                    <label htmlFor="contact-subject" className="ct-label">Subject</label>
                    <input
                      id="contact-subject" name="subject" type="text"
                      className={`ct-input ${typing ? "is-typing" : ""} ${drafting ? "is-loading" : ""}`}
                      placeholder="Portfolio Inquiry"
                      value={fields.subject} onChange={update("subject")}
                      readOnly={busy} onPointerDown={typing ? finishTyping : undefined}
                      onKeyDown={typing ? finishTyping : undefined}
                    />
                  </div>

                  <div className={`ct-body ${errors.message ? "has-error" : ""}`}>
                    <label htmlFor="contact-message" className="sr-only">Message</label>
                    <textarea
                      ref={textareaRef}
                      id="contact-message" name="message"
                      className={`ct-textarea ${typing ? "is-typing" : ""}`}
                      placeholder="What are you building, and how can I help?"
                      value={fields.message} onChange={update("message")}
                      aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "contact-message-error" : undefined}
                      readOnly={busy} onPointerDown={typing ? finishTyping : undefined}
                      onKeyDown={typing ? finishTyping : undefined}
                    />
                    {drafting && (
                      <div className="ct-skeleton" aria-hidden="true">
                        <span style={{ width: "92%" }} /><span style={{ width: "78%" }} /><span style={{ width: "86%" }} /><span style={{ width: "54%" }} />
                      </div>
                    )}
                  </div>
                  {errors.message && <p id="contact-message-error" className="ct-error ct-error-body">{errors.message}</p>}
                </form>

                {aiOpen && (
                  <form className="ct-ai" onSubmit={draft}>
                    <label htmlFor="contact-ai" className="ct-ai-label">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l1.8 5.6L19 9.5l-5.2 1.9L12 17l-1.8-5.6L5 9.5l5.2-1.9L12 2Zm7 12 .9 2.6 2.6.9-2.6.9L19 21l-.9-2.6-2.6-.9 2.6-.9L19 14Z" /></svg>
                      Describe your email
                    </label>
                    <div className="ct-ai-row">
                      <input
                        ref={aiInputRef}
                        id="contact-ai"
                        className="ct-ai-input"
                        value={aiPrompt}
                        maxLength={500}
                        onChange={(e) => setAiPrompt(e.target.value)}
                        placeholder="e.g. Invite him to interview for an ML engineer role"
                        disabled={drafting}
                        onKeyDown={(e) => { if (e.key === "Escape") { e.stopPropagation(); setAiOpen(false); } }}
                      />
                      {drafting ? (
                        <button type="button" className="ct-btn ct-btn-ghost ct-btn-sm" onClick={cancelDraft}>Cancel</button>
                      ) : (
                        <button type="submit" className="ct-btn ct-btn-ai ct-btn-sm" disabled={!aiPrompt.trim()}>Write draft</button>
                      )}
                    </div>
                    {aiError && <p className="ct-error ct-error-ai" role="alert">{aiError}</p>}
                    {(fields.subject || fields.message) && !drafting && (
                      <p className="ct-ai-hint">The draft replaces the current subject and message. You can undo it afterwards.</p>
                    )}
                  </form>
                )}

                {sendState === "failed" && (
                  <div className="ct-failed" role="alert">
                    <p><strong>Your message didn&apos;t send.</strong> {sendError} Nothing was lost; your draft is still here.</p>
                    <div className="ct-failed-actions">
                      <button type="button" className="ct-btn ct-btn-ghost ct-btn-sm" onClick={() => send()}>Try again</button>
                      <a className="ct-btn ct-btn-ghost ct-btn-sm" href={mailtoHref(fields)}>Open in my email app</a>
                    </div>
                  </div>
                )}

                <div className="ct-foot">
                  <div className="ct-foot-left">
                    <button type="submit" form="compose-form" className="ct-btn ct-btn-send" disabled={sendState === "sending"}>
                      {sendState === "sending" ? "Sending…" : "Send"}
                      {sendState !== "sending" && (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7Z" />
                        </svg>
                      )}
                    </button>
                    <button
                      type="button"
                      className={`ct-btn ct-btn-ghost ct-btn-sm ct-ai-toggle ${aiOpen ? "is-on" : ""}`}
                      onClick={() => setAiOpen((v) => !v)}
                      aria-expanded={aiOpen}
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l1.8 5.6L19 9.5l-5.2 1.9L12 17l-1.8-5.6L5 9.5l5.2-1.9L12 2Zm7 12 .9 2.6 2.6.9-2.6.9L19 21l-.9-2.6-2.6-.9 2.6-.9L19 14Z" /></svg>
                      Draft with AI
                    </button>
                    {preDraft && !drafting && (
                      <button type="button" className="ct-link-btn" onClick={undoDraft}>Undo draft</button>
                    )}
                  </div>
                  <span className="ct-kbd" aria-hidden="true">Ctrl + Enter to send</span>
                </div>
              </motion.div>
            )}
            </AnimatePresence>
            )}

            <p className="sr-only" role="status" aria-live="polite">{status}</p>
          </div>

          </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Capability band — the finale's closing beat */}
      <div className="fx-marquee" aria-hidden="true">
        <div className="fx-marquee-track">
          {[0, 1].map((copy) => (
            <span key={copy} className="fx-marquee-set">
              {CAPABILITIES.map((c) => (
                <span key={c} className="fx-marquee-item">
                  {c}<span className="fx-marquee-block" />
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      <style>{`
        .fx-section {
          position: relative;
          overflow: clip;
          isolation: isolate;
          background: #07080B;
          color: #FFFFFF;
          padding: 140px 40px 56px;
        }
        .fx-section::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: -2;
          background: radial-gradient(ellipse 55% 45% at 72% 58%, rgba(226, 45, 109, 0.16), transparent 70%);
        }

        /* Falling tetrominoes — slow, behind everything */
        .fx-blocks { position: absolute; inset: 0; z-index: -1; pointer-events: none; overflow: hidden; }
        .fx-block {
          position: absolute;
          top: -80px;
          opacity: 0.2;
          animation-name: fxFall;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        @keyframes fxFall {
          from { transform: translateY(0) rotate(0deg); }
          to   { transform: translateY(1700px) rotate(var(--spin)); }
        }

        .fx-inner { max-width: 1240px; margin: 0 auto; }

        /* ── Headline ── */
        .fx-head { margin-bottom: 64px; }
        .fx-title {
          display: flex;
          flex-direction: column;
          margin: 0 0 24px;
          font-size: clamp(56px, 9.6vw, 156px);
          line-height: 0.88;
          letter-spacing: 1.5px;
          color: #FFFFFF;
          transform: skewX(-6deg);
          transform-origin: left bottom;
        }
        .fx-line { display: block; text-shadow: 5px 5px 0 #1C202B; }
        .fx-line-2 { color: var(--brand); text-shadow: 5px 5px 0 #FFFFFF; padding-left: 0.6em; }
        .fx-lead { margin: 0; max-width: 52ch; font-size: 19px; line-height: 1.6; color: #C8D4FF; }

        /* ── Grid ── */
        .fx-grid {
          display: grid;
          grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
          gap: 64px;
          align-items: start;
        }
        .fx-grid.is-wide .fx-channels { display: none; }
        .fx-grid.is-wide { grid-template-columns: 1fr; }

        /* Channels */
        .fx-ch-list { list-style: none; border-top: 1px solid #262B38; }
        .fx-ch { border-bottom: 1px solid #262B38; }
        .fx-ch-mail, .fx-ch-link {
          position: relative;
          display: flex;
          align-items: center;
          gap: 18px;
          padding: 22px 6px;
          isolation: isolate;
        }
        .fx-ch-link { color: #FFFFFF; text-decoration: none; }
        .fx-ch-link::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: -1;
          background: #FFFFFF;
          transform: scaleX(0);
          transform-origin: left center;
          transition: transform 420ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        .fx-ch-link:hover::before, .fx-ch-link:focus-visible::before { transform: scaleX(1); }
        .fx-ch-link:hover, .fx-ch-link:focus-visible { color: #07080B; }
        .fx-ch-icon {
          width: 48px;
          height: 48px;
          flex-shrink: 0;
          display: grid;
          place-items: center;
          border: 2px solid #333949;
          border-radius: 8px;
          color: var(--ch, var(--brand));
          transition: border-color 300ms, background 300ms;
        }
        .fx-ch-mail .fx-ch-icon { color: var(--brand); }
        .fx-ch-link:hover .fx-ch-icon { border-color: #07080B; background: #07080B; }
        .fx-ch-text { display: flex; flex-direction: column; gap: 2px; min-width: 0; flex: 1; }
        .fx-ch-name {
          font-family: 'Bangers', cursive;
          font-size: 28px;
          letter-spacing: 1px;
          line-height: 1;
          text-transform: uppercase;
        }
        .fx-ch-value {
          font-size: 14px;
          font-weight: 600;
          color: #94A3CC;
          overflow-wrap: anywhere;
          transition: color 300ms;
        }
        a.fx-ch-value { color: #DFE7FF; text-decoration-color: var(--brand); text-decoration-thickness: 2px; }
        a.fx-ch-value:hover { color: #FFFFFF; }
        .fx-ch-link:hover .fx-ch-value { color: #2F3645; }
        .fx-ch-go { flex-shrink: 0; transition: transform 420ms cubic-bezier(0.16, 1, 0.3, 1); }
        .fx-ch-link:hover .fx-ch-go { transform: translate(4px, -4px) scale(1.15); }
        .fx-copy {
          flex-shrink: 0;
          min-height: 40px;
          padding: 8px 14px;
          background: transparent;
          color: #FFFFFF;
          border: 2px solid #4A5468;
          border-radius: 6px;
          font: 800 12px 'Open Sans', sans-serif;
          letter-spacing: 0.6px;
          text-transform: uppercase;
          cursor: pointer;
          transition: border-color 160ms, background 160ms, color 160ms;
        }
        .fx-copy:hover { border-color: #FFFFFF; background: #FFFFFF; color: #07080B; }
        .fx-based {
          display: flex;
          align-items: center;
          gap: 10px;
          margin: 26px 0 0;
          font-size: 14px;
          font-weight: 600;
          color: #94A3CC;
        }
        .fx-based-dot {
          width: 10px;
          height: 10px;
          background: #2BB04A;
          border-radius: 50%;
          box-shadow: 0 0 0 0 rgba(43, 176, 74, 0.6);
          animation: fxPulse 2.4s ease-out infinite;
        }
        @keyframes fxPulse {
          0%   { box-shadow: 0 0 0 0 rgba(43, 176, 74, 0.55); }
          70%  { box-shadow: 0 0 0 12px rgba(43, 176, 74, 0); }
          100% { box-shadow: 0 0 0 0 rgba(43, 176, 74, 0); }
        }

        /* Stage */
        .fx-stage { position: relative; }
        .fx-tilt { transform-style: preserve-3d; will-change: transform; }

        .ct-window {
          position: relative;
          z-index: 2;
          background: #FFFFFF;
          color: #1C202B;
          border: 3px solid #1C202B;
          border-radius: 8px;
          box-shadow: 10px 10px 0 0 var(--brand);
          overflow: hidden;
          transition: box-shadow 200ms;
        }
        .ct-window.is-wide { grid-column: 1 / -1; }
        .ct-window.is-min { align-self: end; max-width: 360px; }

        .ct-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          background: #1C202B;
          color: #FFFFFF;
          padding: 6px 8px 6px 18px;
          min-height: 48px;
        }
        .ct-bar-title { font: 700 14px 'Open Sans', sans-serif; letter-spacing: 0.3px; }
        .ct-bar-controls { display: flex; gap: 2px; }
        .ct-bar-controls button {
          width: 36px;
          height: 36px;
          display: grid;
          place-items: center;
          background: transparent;
          color: #B7C4ED;
          border: 0;
          border-radius: 6px;
          cursor: pointer;
          transition: background 120ms, color 120ms;
        }
        .ct-bar-controls button:hover { background: #333949; color: #FFFFFF; }

        .ct-form { display: flex; flex-direction: column; }
        .ct-row {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 6px 20px;
          min-height: 52px;
          border-bottom: 1.5px solid rgba(28, 32, 43, 0.09);
        }
        .ct-row.has-error { box-shadow: inset 3px 0 0 #B11F55; }
        .ct-label {
          flex: 0 0 60px;
          font: 600 14px 'Open Sans', sans-serif;
          color: #4A5468;
        }
        .ct-input {
          flex: 1;
          min-width: 0;
          border: 0;
          outline: 0;
          background: transparent;
          font: 400 15px 'Open Sans', sans-serif;
          color: #1C202B;
          padding: 8px 0;
        }
        .ct-input::placeholder, .ct-textarea::placeholder { color: #6B7489; }
        .ct-input:focus-visible, .ct-textarea:focus-visible { outline: none; }
        .ct-row:focus-within, .ct-body:focus-within { background: #F7F9FF; box-shadow: inset 4px 0 0 var(--brand); }
        .ct-recipient {
          display: inline-flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 4px 8px;
          background: #F4F6FF;
          border: 1.5px solid #C8D4FF;
          border-radius: 999px;
          padding: 3px 12px 3px 4px;
          font-size: 13px;
          max-width: 100%;
        }
        .ct-avatar {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          display: grid;
          place-items: center;
          background: var(--brand);
          color: #FFFFFF;
          font: 400 14px 'Bangers', cursive;
          letter-spacing: 0.5px;
        }
        .ct-recipient-name { font-weight: 700; color: #1C202B; }
        .ct-recipient-email { color: #4A5468; word-break: break-all; }

        .ct-body { position: relative; }
        .ct-body.has-error { box-shadow: inset 3px 0 0 #B11F55; }
        .ct-textarea {
          display: block;
          width: 100%;
          min-height: 190px;
          border: 0;
          outline: 0;
          resize: none;
          background: transparent;
          padding: 18px 20px;
          font: 400 15px/1.65 'Open Sans', sans-serif;
          color: #1C202B;
          overflow-y: auto;
        }
        .ct-window.is-wide .ct-textarea { min-height: 280px; }
        .is-typing { color: #B11F55 !important; caret-color: transparent; }
        .ct-skeleton {
          position: absolute;
          inset: 0;
          padding: 22px 20px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          background: #FFFFFF;
        }
        .ct-skeleton span, .ct-input.is-loading {
          height: 12px;
          border-radius: 4px;
          background: linear-gradient(90deg, #EFF3FF 25%, #DFE7FF 40%, #EFF3FF 60%);
          background-size: 300% 100%;
          animation: ctShimmer 1.3s ease-in-out infinite;
        }
        .ct-input.is-loading { height: 16px; color: transparent; padding: 0; max-width: 240px; }
        .ct-input.is-loading::placeholder { color: transparent; }
        @keyframes ctShimmer { from { background-position: 100% 0; } to { background-position: 0 0; } }

        .ct-error {
          margin: 0;
          padding: 6px 20px 8px 94px;
          font-size: 13px;
          font-weight: 700;
          color: #B11F55;
          background: #FFF5F8;
          border-bottom: 1.5px solid rgba(28, 32, 43, 0.09);
        }
        .ct-error-body { padding-left: 20px; }
        .ct-error-ai { padding: 8px 0 0; background: transparent; border: 0; }

        /* AI tray */
        .ct-ai {
          border-top: 1.5px solid rgba(28, 32, 43, 0.09);
          background: #FFF5F8;
          padding: 14px 20px 16px;
        }
        .ct-ai-label {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font: 800 12px 'Open Sans', sans-serif;
          letter-spacing: 0.8px;
          text-transform: uppercase;
          color: #B11F55;
          margin-bottom: 8px;
        }
        .ct-ai-row { display: flex; gap: 10px; }
        .ct-ai-input {
          flex: 1;
          min-width: 0;
          min-height: 44px;
          border: 2px solid #1C202B;
          border-radius: 6px;
          padding: 8px 14px;
          font: 400 14px 'Open Sans', sans-serif;
          color: #1C202B;
          background: #FFFFFF;
        }
        .ct-ai-input:disabled { background: #EFF3FF; }
        .ct-ai-hint { margin: 8px 0 0; font-size: 12.5px; color: #4A5468; }

        .ct-failed {
          border-top: 1.5px solid rgba(28, 32, 43, 0.09);
          background: #FFF5F8;
          padding: 14px 20px;
        }
        .ct-failed p { margin: 0 0 10px; font-size: 14px; color: #1C202B; }
        .ct-failed-actions { display: flex; flex-wrap: wrap; gap: 10px; }

        /* Footer */
        .ct-foot {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          flex-wrap: wrap;
          padding: 14px 20px;
          border-top: 1.5px solid rgba(28, 32, 43, 0.09);
        }
        .ct-foot-left { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
        .ct-kbd { font-size: 12px; color: #4A5468; }

        .ct-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          min-height: 44px;
          padding: 10px 22px;
          border-radius: 6px;
          font: 800 14px 'Open Sans', sans-serif;
          letter-spacing: 0.4px;
          text-decoration: none;
          cursor: pointer;
          transition: transform 100ms ease-out, box-shadow 100ms ease-out, background 150ms;
        }
        .ct-btn-sm { min-height: 40px; padding: 8px 14px; font-size: 13px; }
        .ct-btn-send {
          background: var(--brand);
          color: #FFFFFF;
          border: 2.5px solid #1C202B;
          box-shadow: 4px 4px 0 0 #1C202B;
          padding-left: 26px;
          padding-right: 24px;
        }
        .ct-btn-send:hover:not(:disabled) { transform: translate(-2px, -2px); box-shadow: 6px 6px 0 0 #1C202B; }
        .ct-btn-send:active:not(:disabled) { transform: translate(2px, 2px); box-shadow: 1px 1px 0 0 #1C202B; }
        .ct-btn-send:disabled { background: #94A3CC; cursor: progress; }
        .ct-btn-ghost {
          background: #FFFFFF;
          color: #1C202B;
          border: 2px solid #1C202B;
        }
        .ct-btn-ghost:hover { background: #F4F6FF; color: #1C202B; }
        .ct-ai-toggle.is-on { background: #1C202B; color: #FFFFFF; }
        .ct-btn-ai { background: #1C202B; color: #FFFFFF; border: 2px solid #1C202B; }
        .ct-btn-ai:disabled { background: #C8D4FF; border-color: #C8D4FF; color: #4A5468; cursor: not-allowed; }
        .ct-link-btn {
          background: none;
          border: 0;
          padding: 8px 4px;
          font: 700 13px 'Open Sans', sans-serif;
          color: #1C202B;
          text-decoration: underline;
          text-underline-offset: 3px;
          cursor: pointer;
        }

        /* Sent */
        .ct-sent {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 48px 24px 52px;
        }
        .ct-plane { margin-bottom: 12px; }
        .ct-plane-body { animation: ctFly 900ms cubic-bezier(0.22, 1, 0.36, 1) both; transform-origin: 30px 52px; }
        .ct-plane-trail { animation: ctTrail 900ms 150ms ease-out both; }
        @keyframes ctFly { from { transform: translate(-28px, 22px) rotate(-8deg); opacity: 0; } to { transform: none; opacity: 1; } }
        @keyframes ctTrail { from { opacity: 0; } to { opacity: 1; } }
        .ct-sent-title { font-size: 40px; letter-spacing: 0.6px; color: #1C202B; margin: 0 0 8px; }
        .ct-sent-text { font-size: 15px; color: #4A5468; max-width: 40ch; margin: 0 0 24px; }


        /* Capability band */
        .fx-marquee {
          margin-top: 120px;
          border-top: 2px solid #1C202B;
          background: var(--brand);
          overflow: hidden;
          width: 112%;
          margin-left: -6%;
          transform: rotate(-1.5deg);
          transform-origin: center;
        }
        .fx-marquee-track {
          display: flex;
          width: max-content;
          animation: fxMarquee 34s linear infinite;
        }
        .fx-marquee:hover .fx-marquee-track { animation-play-state: paused; }
        .fx-marquee-set { display: flex; }
        .fx-marquee-item {
          display: inline-flex;
          align-items: center;
          gap: 36px;
          padding: 18px 0 14px 36px;
          font-family: 'Bangers', cursive;
          font-size: clamp(34px, 4.6vw, 64px);
          letter-spacing: 1.5px;
          line-height: 1;
          text-transform: uppercase;
          color: #07080B;
          white-space: nowrap;
        }
        .fx-marquee-block { width: 18px; height: 18px; background: #07080B; transform: rotate(45deg); }
        @keyframes fxMarquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }

        /* ── Responsive ── */
        @media (max-width: 1023px) {
          .fx-section { padding: 112px 32px 48px; }
          .fx-grid { grid-template-columns: 1fr; gap: 48px; }
          .fx-channels { order: 2; }
          .ct-only-desktop { display: none !important; }
          .fx-grid.is-wide .fx-channels { display: block; }
        }
        @media (max-width: 767px) {
          .fx-section { padding: 96px 16px 40px; }
          .fx-head { margin-bottom: 40px; }
          .fx-line { text-shadow: 3px 3px 0 #1C202B; }
          .fx-line-2 { text-shadow: 3px 3px 0 #FFFFFF; padding-left: 0.3em; }
          .fx-lead { font-size: 16px; }
          .ct-window { box-shadow: 6px 6px 0 0 var(--brand); }
          .ct-window.is-min { max-width: none; }
          .ct-row { padding: 6px 14px; gap: 10px; }
          .ct-label { flex-basis: 52px; }
          .ct-error { padding-left: 14px; }
          .ct-textarea { padding: 14px; }
          .ct-ai, .ct-failed, .ct-foot { padding-left: 14px; padding-right: 14px; }
          .ct-ai-row { flex-direction: column; }
          .ct-kbd { display: none; }
          .ct-recipient-email { font-size: 12px; }
          .fx-ch-name { font-size: 24px; }
          .fx-marquee { margin-top: 80px; }
        }
      `}</style>
    </section>
  );
}
