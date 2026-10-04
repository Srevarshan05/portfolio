"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EASE_OUT, Reveal, Stagger, StaggerItem, TetrisText } from "@/components/motion";
import { profileById } from "@/lib/profiles";

const TO_EMAIL = "srevarshan9600622@gmail.com";
const DRAFT_KEY = "sv-contact-draft";

type Fields = { name: string; email: string; subject: string; message: string };
type FieldErrors = Partial<Record<keyof Fields, string>>;
type SendState = "idle" | "sending" | "sent" | "failed";

const EMPTY: Fields = { name: "", email: "", subject: "", message: "" };

const CHANNELS = ["linkedin", "github", "youtube"].map(profileById);
const CHANNEL_TINT: Record<string, string> = { linkedin: "#0A66C2", github: "#1C202B", youtube: "#FF0000" };

/** Places along the journey, drawn into /pixel/places.png (x = % across the artwork) */
const PLACES: { name: string; x: number; high?: boolean }[] = [{"name": "Goa", "x": 4.21}, {"name": "Kerala", "x": 14.08}, {"name": "Bangalore", "x": 24.47}, {"name": "Metro", "x": 40.2, "high": true}, {"name": "IIT", "x": 34.47}, {"name": "Chennai", "x": 43.42}, {"name": "NIT", "x": 52.37}, {"name": "Madurai", "x": 59.47}, {"name": "Dindigul", "x": 68.42}, {"name": "Tirunelveli", "x": 78.95}];

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

  const openDraft = () => {
    setMinimized(false);
    setAiOpen(true);
    document.getElementById("compose-card")?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <section id="contact" className="cx-section" aria-labelledby="contact-title">
      <span className="cx-guide cx-guide-l" aria-hidden="true" />
      <span className="cx-guide cx-guide-r" aria-hidden="true" />
      <div className="cx-places" aria-hidden="true">
        <div className="cx-places-art">
          <img src="/pixel/places.png" alt="" width={2280} height={510} loading="lazy" decoding="async" />
          {PLACES.map((p) => (
            <span key={p.name} className={`cx-mono cx-place ${p.high ? "is-high" : ""}`} style={{ left: `${p.x}%` }}>
              <i />{p.name}
            </span>
          ))}
        </div>
      </div>

      <div className="cx-inner">
        <header className="cx-head">
          <Reveal kind="up" as="p" className="cx-mono cx-kicker">Contact · open inbox</Reveal>
          <h2 id="contact-title" className="cx-title" aria-label="Let's build something great!">
            <TetrisText className="cx-line" text="Let's build" step={0.035} />
            <TetrisText className="cx-line cx-line-2" text="something great!" delay={0.25} step={0.03} />
          </h2>
          <Reveal as="p" kind="up" delay={0.5} className="cx-lead">
            Hiring, collaborating, or have a problem worth solving with AI? Write to me here,
            or describe what you need and let AI draft the email for you.
          </Reveal>
        </header>

        <div className={`cx-grid ${expanded ? "is-wide" : ""}`}>
          {/* ── Left: channels + optional AI card ── */}
          <div className="cx-side">
            <Reveal kind="up" className="cx-card cx-find">
              <div className="cx-find-top">
                <img className="cx-find-cloud cx-find-cloud-a" src="/pixel/cloud-sky-2.png" alt="" aria-hidden="true" width={224} height={120} />
                <img className="cx-find-cloud cx-find-cloud-b" src="/pixel/cloud-sky-3.png" alt="" aria-hidden="true" width={368} height={168} />
                <p className="cx-mono cx-find-kicker">Find me online</p>
                <p className="cx-find-big"><span>@</span>srevarshan05</p>
                <p className="cx-mono cx-find-caption">On GitHub and LinkedIn</p>
                <p className="cx-find-copy">
                  Every channel below reaches me directly. Write to me by email, or find my code,
                  write-ups and project demos on the rest.
                </p>
                <a className="cx-btn cx-btn-green cx-btn-block cx-find-cta" href={`mailto:${TO_EMAIL}`}>
                  Email me
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8" /></svg>
                </a>
              </div>
              <div className="cx-find-bottom">
                <Stagger as="ul" className="cx-rows" gap={0.07}>
                  <StaggerItem as="li" className="cx-row">
                    <span className="cx-row-text">
                      <span className="cx-row-name">Email</span>
                      <a className="cx-mono cx-row-handle cx-row-mail" href={`mailto:${TO_EMAIL}`}>{TO_EMAIL}</a>
                    </span>
                    <button type="button" className="cx-icon-btn" onClick={copyEmail} aria-label={copied ? "Email address copied" : "Copy email address"}>
                      {copied ? (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" aria-hidden="true"><path d="m5 12 5 5 9-10" /></svg>
                      ) : (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="9" y="9" width="12" height="12" rx="2" /><path d="M5 15V5a2 2 0 0 1 2-2h8" /></svg>
                      )}
                    </button>
                  </StaggerItem>
                  {CHANNELS.map((c) => (
                    <StaggerItem as="li" key={c.id} className="cx-row">
                      <a className="cx-row-link" href={c.url} target="_blank" rel="noopener noreferrer">
                        <span className="cx-row-mark" style={{ color: CHANNEL_TINT[c.id] }} aria-hidden="true">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d={c.svgPath} /></svg>
                        </span>
                        <span className="cx-row-text">
                          <span className="cx-row-name">{c.name}</span>
                          <span className="cx-mono cx-row-handle">{c.handle}</span>
                        </span>
                        <svg className="cx-row-go" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="square" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8" /></svg>
                        <span className="sr-only">(opens in a new tab)</span>
                      </a>
                    </StaggerItem>
                  ))}
                </Stagger>
                <p className="cx-find-fine">
                  Based in Tiruchirappalli, India. Messages sent from this page land in the same inbox as email.
                </p>
              </div>
            </Reveal>

            <Reveal kind="up" delay={0.12} className="cx-card cx-card-tint">
              <div className="cx-card-body">
                <p className="cx-mono cx-optional">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l1.8 5.6L19 9.5l-5.2 1.9L12 17l-1.8-5.6L5 9.5l5.2-1.9L12 2Z" /></svg>
                  Optional
                </p>
                <h3 className="cx-card-title">Let AI write the first draft</h3>
                <p className="cx-card-sub">Describe what you need in one sentence and AI drafts the subject and message for you. You can edit everything before sending.</p>
                <div className="cx-btn-row">
                  <button type="button" className="cx-btn cx-btn-green" onClick={openDraft}>
                    Draft with AI
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8" /></svg>
                  </button>
                  <a className="cx-btn cx-btn-outline" href="#projects">
                    See my projects
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                  </a>
                </div>
              </div>
            </Reveal>
          </div>

          {/* ── Right: compose window, built like a real mail client ── */}
          <motion.div
            id="compose-card"
            className={`cx-mail ${minimized ? "is-min" : ""}`}
            initial={{ opacity: 0, y: 48 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.1 }}
          >
            <div className="cx-mail-bar">
              <span className="cx-mail-title">{sendState === "sent" ? "Message sent" : "New Message"}</span>
              <div className="cx-mail-controls">
                <button type="button" onClick={() => setMinimized((v) => !v)} aria-label={minimized ? "Restore message window" : "Minimize message window"} aria-pressed={minimized}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" aria-hidden="true">
                    {minimized ? <path d="M6 15l6-6 6 6" /> : <path d="M5 18h14" />}
                  </svg>
                </button>
                <button type="button" className="cx-only-desktop" onClick={() => { setExpanded((v) => !v); setMinimized(false); }} aria-label={expanded ? "Shrink message window" : "Expand message window"} aria-pressed={expanded}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="square" aria-hidden="true">
                    {expanded ? <path d="M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5" /> : <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />}
                  </svg>
                </button>
                <button type="button" onClick={discard} aria-label="Close and discard draft">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
                </button>
              </div>
            </div>

            {!minimized && (
            <AnimatePresence mode="wait" initial={false}>
            {sendState === "sent" ? (
              <motion.div key="sent" className="cx-sent" role="status" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                <svg className="cx-plane" width="140" height="110" viewBox="0 0 140 110" fill="none" aria-hidden="true">
                  <motion.path
                    d="M4 104c26-4 36-22 52-40"
                    stroke="#A8B0C0" strokeWidth="3" strokeLinecap="round" strokeDasharray="5 8"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                    transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.25 }}
                  />
                  <motion.g
                    initial={{ x: -70, y: 50, rotate: -22, opacity: 0 }}
                    animate={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 160, damping: 14, delay: 0.15 }}
                  >
                    <path d="M50 66 128 14 100 104 78 78 50 66Z" fill="#FFFFFF" stroke="#141414" strokeWidth="4" strokeLinejoin="round" />
                    <path d="M128 14 78 78v24l14-17" stroke="#141414" strokeWidth="4" strokeLinejoin="round" strokeLinecap="round" />
                  </motion.g>
                </svg>
                <h3 className="cx-card-title">Message sent!</h3>
                <p className="cx-card-sub">Thanks for reaching out. Your message is in my inbox and I&apos;ll reply to the email you gave.</p>
                <button type="button" className="cx-btn cx-btn-outline" onClick={() => setSendState("idle")}>Write another message</button>
              </motion.div>
            ) : (
              <motion.div
                key="compose"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, rotateX: 72, y: -70, scale: 0.8, transition: { duration: 0.5, ease: [0.7, 0, 0.84, 0] } }}
                transition={{ duration: 0.4, ease: EASE_OUT }}
                style={{ transformOrigin: "50% 0%", transformPerspective: 1000 }}
              >
                <form id="compose-form" className="cx-mail-form" onSubmit={send} onKeyDown={onFormKeyDown} noValidate aria-busy={busy}>
                  <div className="cx-mail-row">
                    <span className="cx-mail-label" id="contact-to-label">To</span>
                    <span className="cx-mail-to" aria-labelledby="contact-to-label">
                      <span className="cx-mail-avatar" aria-hidden="true">S</span>
                      Sre Varshan <span className="cx-mail-addr">&lt;{TO_EMAIL}&gt;</span>
                    </span>
                    <button type="button" className="cx-icon-btn cx-mail-copy" onClick={copyEmail} aria-label={copied ? "Email address copied" : "Copy email address"}>
                      {copied ? (
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" aria-hidden="true"><path d="m5 12 5 5 9-10" /></svg>
                      ) : (
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="9" y="9" width="12" height="12" rx="2" /><path d="M5 15V5a2 2 0 0 1 2-2h8" /></svg>
                      )}
                    </button>
                  </div>

                  <div className={`cx-mail-row ${errors.email ? "has-error" : ""}`}>
                    <label htmlFor="contact-email" className="cx-mail-label">From</label>
                    <input
                      id="contact-email" name="email" type="email" inputMode="email" autoComplete="email"
                      className="cx-mail-input" placeholder="your@email.com"
                      value={fields.email} onChange={update("email")}
                      aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "contact-email-error" : undefined}
                      readOnly={typing} onPointerDown={typing ? finishTyping : undefined}
                    />
                  </div>
                  {errors.email && <p id="contact-email-error" className="cx-mail-error">{errors.email}</p>}

                  <div className={`cx-mail-row ${errors.name ? "has-error" : ""}`}>
                    <label htmlFor="contact-name" className="cx-mail-label">Name</label>
                    <input
                      id="contact-name" name="name" type="text" autoComplete="name"
                      className="cx-mail-input" placeholder="Your name"
                      value={fields.name} onChange={update("name")}
                      aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "contact-name-error" : undefined}
                      readOnly={typing} onPointerDown={typing ? finishTyping : undefined}
                    />
                  </div>
                  {errors.name && <p id="contact-name-error" className="cx-mail-error">{errors.name}</p>}

                  <div className="cx-mail-row">
                    <label htmlFor="contact-subject" className="sr-only">Subject</label>
                    <input
                      id="contact-subject" name="subject" type="text"
                      className={`cx-mail-input cx-mail-subject ${typing ? "is-typing" : ""} ${drafting ? "is-loading" : ""}`}
                      placeholder="Subject"
                      value={fields.subject} onChange={update("subject")}
                      readOnly={busy} onPointerDown={typing ? finishTyping : undefined}
                      onKeyDown={typing ? finishTyping : undefined}
                    />
                  </div>

                  <div className={`cx-mail-body ${errors.message ? "has-error" : ""}`}>
                    <label htmlFor="contact-message" className="sr-only">Message</label>
                    <textarea
                      ref={textareaRef}
                      id="contact-message" name="message"
                      className={`cx-mail-textarea ${typing ? "is-typing" : ""}`}
                      placeholder="What are you building, and how can I help?"
                      value={fields.message} onChange={update("message")}
                      aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "contact-message-error" : undefined}
                      readOnly={busy} onPointerDown={typing ? finishTyping : undefined}
                      onKeyDown={typing ? finishTyping : undefined}
                    />
                    {drafting && (
                      <div className="cx-skeleton" aria-hidden="true">
                        <span style={{ width: "92%" }} /><span style={{ width: "78%" }} /><span style={{ width: "86%" }} /><span style={{ width: "54%" }} />
                      </div>
                    )}
                  </div>
                  {errors.message && <p id="contact-message-error" className="cx-mail-error">{errors.message}</p>}
                </form>

                <AnimatePresence initial={false}>
                  {aiOpen && (
                    <motion.form
                      className="cx-ai"
                      onSubmit={draft}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: EASE_OUT }}
                    >
                      <label htmlFor="contact-ai" className="cx-ai-label">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l1.8 5.6L19 9.5l-5.2 1.9L12 17l-1.8-5.6L5 9.5l5.2-1.9L12 2Z" /></svg>
                        Help me write
                      </label>
                      <div className="cx-ai-row">
                        <input
                          ref={aiInputRef}
                          id="contact-ai"
                          className="cx-input"
                          value={aiPrompt}
                          maxLength={500}
                          onChange={(e) => setAiPrompt(e.target.value)}
                          placeholder="e.g. Invite him to interview for an ML engineer role"
                          disabled={drafting}
                          onKeyDown={(e) => { if (e.key === "Escape") { e.stopPropagation(); setAiOpen(false); } }}
                        />
                        {drafting ? (
                          <button type="button" className="cx-btn cx-btn-outline" onClick={cancelDraft}>Cancel</button>
                        ) : (
                          <button type="submit" className="cx-btn cx-btn-send-pill" disabled={!aiPrompt.trim()}>Create</button>
                        )}
                      </div>
                      {aiError && <p className="cx-mail-error cx-mail-error-flat" role="alert">{aiError}</p>}
                      {(fields.subject || fields.message) && !drafting && (
                        <p className="cx-fine">The draft replaces the current subject and message. You can undo it afterwards.</p>
                      )}
                    </motion.form>
                  )}
                </AnimatePresence>

                {sendState === "failed" && (
                  <div className="cx-failed" role="alert">
                    <p><strong>Your message didn&apos;t send.</strong> {sendError} Nothing was lost; your draft is still here.</p>
                    <div className="cx-btn-row">
                      <button type="button" className="cx-btn cx-btn-outline" onClick={() => send()}>Try again</button>
                      <a className="cx-btn cx-btn-outline" href={mailtoHref(fields)}>Open in my email app</a>
                    </div>
                  </div>
                )}

                <div className="cx-mail-toolbar">
                  <button type="submit" form="compose-form" className="cx-btn cx-btn-send-pill" disabled={sendState === "sending"}>
                    {sendState === "sending" ? "Sending…" : "Send"}
                    {sendState !== "sending" && (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" aria-hidden="true"><path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7Z" /></svg>
                    )}
                  </button>
                  <button
                    type="button"
                    className={`cx-tool ${aiOpen ? "is-on" : ""}`}
                    onClick={() => setAiOpen((v) => !v)}
                    aria-expanded={aiOpen}
                    aria-label="Draft with AI"
                    title="Draft with AI"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l1.8 5.6L19 9.5l-5.2 1.9L12 17l-1.8-5.6L5 9.5l5.2-1.9L12 2Zm7 12 .9 2.6 2.6.9-2.6.9L19 21l-.9-2.6-2.6-.9 2.6-.9L19 14Z" /></svg>
                    <span className="cx-tool-text">Draft with AI</span>
                  </button>
                  {preDraft && !drafting && (
                    <button type="button" className="cx-link-btn" onClick={undoDraft}>Undo draft</button>
                  )}
                  <span className="cx-mail-hint">Ctrl + Enter</span>
                  <button type="button" className="cx-tool cx-tool-end" onClick={discard} aria-label="Discard draft" title="Discard draft">
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" aria-hidden="true"><path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3" /></svg>
                  </button>
                </div>
              </motion.div>
            )}
            </AnimatePresence>
            )}

            <p className="sr-only" role="status" aria-live="polite">{status}</p>
          </motion.div>
        </div>
      </div>

      <style>{`
        .cx-section {
          --cx-bg: #FAF9F7;
          --cx-ink: #141414;
          --cx-body: #4D4D4D;
          --cx-muted: #6E6E6E;
          --cx-line: #E6E3DD;
          --cx-green: #1F7A4C;
          --cx-green-dark: #17603B;
          position: relative;
          overflow: clip;
          isolation: isolate;
          background: var(--cx-bg);
          color: var(--cx-ink);
          padding: 140px 40px 400px;
        }
        .cx-mono { font-family: 'Geist Mono', ui-monospace, SFMono-Regular, Menlo, monospace; text-transform: uppercase; letter-spacing: 0.12em; }
        .cx-guide { position: absolute; top: 0; bottom: 0; width: 1px; background: var(--cx-line); z-index: 0; pointer-events: none; }
        .cx-guide-l { left: max(16px, calc(50% - 650px)); }
        .cx-guide-r { right: max(16px, calc(50% - 650px)); }
        .cx-inner { position: relative; z-index: 1; max-width: 1172px; margin: 0 auto; }

        /* ── Headline ── */
        .cx-head { margin-bottom: 56px; }
        .cx-kicker { margin: 0 0 18px; font-size: 13px; font-weight: 500; color: #15803D; }
        .cx-title {
          display: flex;
          flex-direction: column;
          margin: 0 0 22px;
          font-size: clamp(48px, 7.2vw, 104px);
          font-weight: 600;
          line-height: 0.98;
          letter-spacing: -0.045em;
          color: var(--cx-ink);
        }
        .cx-line { display: block; }
        .cx-line-2 { color: var(--brand); }
        .cx-lead { margin: 0; max-width: 54ch; font-size: 18px; line-height: 1.6; color: var(--cx-body); }

        /* ── Grid ── */
        .cx-grid { display: grid; grid-template-columns: minmax(0, 5fr) minmax(0, 7fr); gap: 28px; align-items: start; }
        .cx-grid.is-wide { grid-template-columns: 1fr; }
        .cx-grid.is-wide .cx-side { display: none; }
        .cx-side { display: flex; flex-direction: column; gap: 20px; }

        /* ── Card system (thin border, strip header, divided rows) ── */
        .cx-card { background: #FFFFFF; border: 1px solid var(--cx-line); }
        .cx-strip {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 8px;
          min-height: 46px;
          padding: 0 22px;
          border-bottom: 1px solid var(--cx-line);
          font-size: 12.5px;
          color: var(--cx-body);
        }
        .cx-strip-split { justify-content: space-between; padding-right: 10px; }
        .cx-controls { display: flex; gap: 2px; }
        .cx-controls button, .cx-icon-btn {
          width: 36px;
          height: 36px;
          display: grid;
          place-items: center;
          background: transparent;
          border: 0;
          border-radius: 6px;
          color: var(--cx-ink);
          cursor: pointer;
          transition: background 150ms;
        }
        .cx-controls button:hover, .cx-icon-btn:hover { background: #F1EFEA; }
        .cx-card-body { padding: 24px 24px 22px; }
        .cx-card-title { font-size: 22px; font-weight: 600; letter-spacing: -0.025em; line-height: 1.2; color: var(--cx-ink); margin: 0 0 8px; }
        .cx-card-sub { margin: 0 0 20px; font-size: 15px; line-height: 1.55; color: var(--cx-body); }

        .cx-rows { list-style: none; border-top: 1px solid var(--cx-line); }
        .cx-row { display: flex; align-items: center; gap: 12px; padding: 14px 0; border-bottom: 1px solid var(--cx-line); }
        .cx-row:last-child { border-bottom: 0; padding-bottom: 0; }
        .cx-row-link { flex: 1; display: flex; align-items: center; gap: 12px; color: var(--cx-ink); text-decoration: none; min-height: 40px; }
        .cx-row-mark { width: 34px; height: 34px; display: grid; place-items: center; border: 1px solid var(--cx-line); border-radius: 6px; flex-shrink: 0; }
        .cx-row-text { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 3px; }
        .cx-row-name { font-size: 15.5px; font-weight: 500; color: var(--cx-ink); }
        .cx-row-handle { font-size: 12px; letter-spacing: 0.02em; text-transform: none; color: var(--cx-muted); overflow-wrap: anywhere; }
        .cx-row-mail { color: var(--cx-ink); text-decoration: underline; text-decoration-color: var(--cx-line); text-underline-offset: 3px; }
        .cx-row-mail:hover { color: var(--cx-green); text-decoration-color: currentColor; }
        .cx-row-go { color: var(--cx-muted); transition: transform 300ms cubic-bezier(0.16, 1, 0.3, 1), color 200ms; }
        .cx-row-link:hover .cx-row-go { transform: translate(3px, -3px); color: var(--cx-ink); }
        .cx-row-link:hover .cx-row-name { text-decoration: underline; text-underline-offset: 3px; }
        .cx-tag {
          flex-shrink: 0;
          padding: 3px 7px;
          border: 1px solid #A7D7BC;
          background: #EAF6EF;
          color: var(--cx-green);
          border-radius: 4px;
          font-family: 'Geist Mono', ui-monospace, monospace;
          font-size: 10.5px;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        /* "Find me online" — sky-topped card */
        .cx-find { overflow: hidden; }
        .cx-find-top {
          position: relative;
          overflow: hidden;
          padding: 30px 26px 28px;
          background: linear-gradient(to bottom, #DDF0FC 0%, #EEF7FD 45%, #FFFFFF 100%);
          border-bottom: 1px solid var(--cx-line);
        }
        .cx-find-cloud { position: absolute; height: auto; image-rendering: pixelated; pointer-events: none; }
        .cx-find-cloud-a { width: 112px; top: 18px; right: 70px; }
        .cx-find-cloud-b { width: 184px; top: 86px; right: -46px; }
        .cx-find-top > :not(img) { position: relative; z-index: 1; }
        .cx-find-kicker { margin: 0 0 10px; font-size: 13px; font-weight: 500; letter-spacing: 0.22em; color: #333; }
        .cx-find-big {
          margin: 0;
          font-family: 'Geist Mono', ui-monospace, monospace;
          font-size: clamp(34px, 3.6vw, 48px);
          font-weight: 600;
          line-height: 1.05;
          letter-spacing: -0.04em;
          color: #141414;
        }
        .cx-find-big span { color: #0B5FA5; }
        .cx-find-caption { margin: 12px 0 20px; font-size: 13px; font-weight: 500; letter-spacing: 0.22em; color: #333; }
        .cx-find-copy { margin: 0 0 22px; font-size: 16.5px; line-height: 1.6; color: #333; max-width: 42ch; }
        .cx-find-cta { min-height: 48px; font-size: 16px; }
        .cx-find-bottom { padding: 8px 26px 22px; }
        .cx-find-bottom .cx-rows { border-top: 0; }
        .cx-find-fine { margin: 16px 0 0; font-size: 14px; line-height: 1.55; color: #6E6E6E; }

        /* Tinted optional card */
        .cx-card-tint {
          position: relative;
          overflow: hidden;
          border-color: #A7D7BC;
          background: linear-gradient(180deg, #EEF7F1 0%, #E4F2EA 100%);
        }
        .cx-card-tint::after {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 55%;
          background: url('/pixel/sky.webp') center 70% / cover no-repeat;
          image-rendering: pixelated;
          opacity: 0.22;
          -webkit-mask-image: linear-gradient(to top, #000, transparent);
          mask-image: linear-gradient(to top, #000, transparent);
          pointer-events: none;
        }
        .cx-card-tint .cx-card-body { position: relative; z-index: 1; }
        .cx-optional { display: flex; align-items: center; gap: 8px; margin: 0 0 12px; font-size: 12px; color: var(--cx-green); }

        /* Buttons */
        .cx-btn-row { display: flex; flex-wrap: wrap; align-items: center; gap: 10px; }
        .cx-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          min-height: 44px;
          padding: 10px 18px;
          border-radius: 4px;
          font: 600 15px 'Geist', system-ui, sans-serif;
          letter-spacing: -0.01em;
          text-decoration: none;
          cursor: pointer;
          transition: background 160ms, border-color 160ms, color 160ms, transform 120ms;
        }
        .cx-btn:active:not(:disabled) { transform: translateY(1px); }
        .cx-btn-green { background: var(--cx-green); color: #FFFFFF; border: 1px solid var(--cx-green-dark); box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.18); }
        .cx-btn-green:hover:not(:disabled) { background: var(--cx-green-dark); color: #FFFFFF; }
        .cx-btn-green:disabled { background: #9DC7AF; border-color: #9DC7AF; cursor: not-allowed; }
        .cx-btn-outline { background: #FFFFFF; color: var(--cx-ink); border: 1px solid #CFCBC3; box-shadow: 0 1px 2px rgba(20, 20, 20, 0.06); }
        .cx-btn-outline:hover { background: #F6F4F0; color: var(--cx-ink); }
        .cx-btn-block { width: 100%; }
        .cx-link-btn {
          background: none;
          border: 0;
          padding: 8px 4px;
          font: 500 14px 'Geist', system-ui, sans-serif;
          color: var(--cx-ink);
          text-decoration: underline;
          text-underline-offset: 3px;
          cursor: pointer;
        }

        /* ── Compose card ── */
        .cx-compose.is-min { align-self: start; }
        .cx-compose-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
        .cx-chip {
          display: inline-flex;
          align-items: center;
          padding: 4px 8px;
          border: 1px dashed #7FBF9B;
          background: #F2FAF5;
          color: var(--cx-green);
          border-radius: 4px;
          font-size: 13px;
          font-weight: 500;
        }
        .cx-recipient {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 0;
          border-top: 1px solid var(--cx-line);
          border-bottom: 1px solid var(--cx-line);
          margin-bottom: 22px;
        }
        .cx-form { display: flex; flex-direction: column; gap: 18px; }
        .cx-field-pair { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        .cx-field { display: flex; flex-direction: column; gap: 8px; min-width: 0; }
        .cx-label { font-size: 12px; font-weight: 500; color: var(--cx-body); }
        .cx-input {
          width: 100%;
          min-height: 44px;
          padding: 10px 14px;
          background: #FFFFFF;
          border: 1px solid #D9D5CE;
          border-radius: 4px;
          font: 400 15px 'Geist', system-ui, sans-serif;
          color: var(--cx-ink);
          transition: border-color 150ms, box-shadow 150ms;
        }
        .cx-input::placeholder { color: #8F8F8F; }
        .cx-input:focus { outline: none; border-color: var(--cx-green); box-shadow: 0 0 0 3px rgba(31, 122, 76, 0.16); }
        .cx-input[aria-invalid="true"] { border-color: #B11F55; }
        .cx-input:disabled { background: #F4F2EE; }
        .cx-textarea-wrap { position: relative; }
        .cx-textarea { display: block; min-height: 170px; resize: none; line-height: 1.6; overflow-y: auto; }
        .is-typing { color: var(--cx-green) !important; caret-color: transparent; }
        .cx-skeleton {
          position: absolute;
          inset: 1px;
          padding: 16px 14px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          background: #FFFFFF;
          border-radius: 4px;
        }
        .cx-skeleton span, .cx-input.is-loading {
          background: linear-gradient(90deg, #F1EFEA 25%, #E6E3DD 40%, #F1EFEA 60%);
          background-size: 300% 100%;
          animation: cxShimmer 1.3s ease-in-out infinite;
        }
        .cx-skeleton span { height: 11px; border-radius: 3px; }
        .cx-input.is-loading { color: transparent; }
        .cx-input.is-loading::placeholder { color: transparent; }
        @keyframes cxShimmer { from { background-position: 100% 0; } to { background-position: 0 0; } }
        .cx-error { margin: 0; font-size: 13px; font-weight: 500; color: #B11F55; }

        .cx-ai { overflow: hidden; display: flex; flex-direction: column; gap: 8px; margin-top: 18px; padding-top: 18px; border-top: 1px solid var(--cx-line); }
        .cx-ai-row { display: flex; gap: 10px; }
        .cx-failed { margin-top: 18px; padding: 14px 16px; border: 1px solid #F2B8CB; background: #FFF5F8; }
        .cx-failed p { margin: 0 0 10px; font-size: 14px; color: var(--cx-ink); }
        .cx-send-row { margin: 22px 0 12px; }
        .cx-btn-send { min-width: 140px; }
        .cx-fine { margin: 12px 0 0; font-size: 13px; line-height: 1.5; color: var(--cx-muted); }

        .cx-sent { display: flex; flex-direction: column; align-items: center; text-align: center; padding: 44px 24px 28px; }
        .cx-sent .cx-btn-block { max-width: 320px; }
        .cx-plane { margin-bottom: 14px; }

        /* ── Mail client ── */
        .cx-mail {
          background: #FFFFFF;
          border: 1px solid #D9D5CE;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 24px 48px -28px rgba(20, 20, 20, 0.35), 0 2px 6px rgba(20, 20, 20, 0.06);
        }
        .cx-mail.is-min { align-self: start; }
        .cx-mail-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 46px;
          padding: 0 8px 0 18px;
          background: #2B2F36;
          color: #FFFFFF;
        }
        .cx-mail-title { font-size: 14.5px; font-weight: 500; letter-spacing: -0.01em; }
        .cx-mail-controls { display: flex; gap: 2px; }
        .cx-mail-controls button {
          width: 34px;
          height: 34px;
          display: grid;
          place-items: center;
          background: transparent;
          border: 0;
          border-radius: 6px;
          color: #D7DBE2;
          cursor: pointer;
          transition: background 140ms, color 140ms;
        }
        .cx-mail-controls button:hover { background: rgba(255, 255, 255, 0.12); color: #FFFFFF; }
        .cx-mail-controls button:focus-visible { outline-color: #FFFFFF; }

        .cx-mail-form { display: flex; flex-direction: column; }
        .cx-mail-row {
          display: flex;
          align-items: center;
          gap: 12px;
          min-height: 46px;
          padding: 0 18px;
          border-bottom: 1px solid #ECE9E3;
        }
        .cx-mail-row:focus-within { box-shadow: inset 0 -1px 0 #0B57D0; }
        .cx-mail-row.has-error { box-shadow: inset 0 -1px 0 #B11F55; }
        .cx-mail-label { flex: 0 0 46px; font-size: 14px; color: #6E6E6E; }
        .cx-mail-to { flex: 1; display: flex; align-items: center; gap: 8px; min-width: 0; font-size: 14.5px; color: var(--cx-ink); flex-wrap: wrap; }
        .cx-mail-addr { color: #6E6E6E; overflow-wrap: anywhere; }
        .cx-mail-avatar {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          display: grid;
          place-items: center;
          background: var(--brand);
          color: #FFFFFF;
          font-size: 11.5px;
          font-weight: 600;
        }
        .cx-mail-copy { width: 32px; height: 32px; color: #6E6E6E; }
        .cx-mail-input {
          flex: 1;
          min-width: 0;
          height: 44px;
          border: 0;
          background: transparent;
          font: 400 15px 'Geist', system-ui, sans-serif;
          color: var(--cx-ink);
        }
        .cx-mail-input:focus { outline: none; }
        .cx-mail-input::placeholder, .cx-mail-textarea::placeholder { color: #8F8F8F; }
        .cx-mail-subject { font-weight: 500; }
        .cx-mail-body { position: relative; }
        .cx-mail-body.has-error { box-shadow: inset 0 -1px 0 #B11F55; }
        .cx-mail-textarea {
          display: block;
          width: 100%;
          min-height: 240px;
          padding: 16px 18px;
          border: 0;
          resize: none;
          background: transparent;
          font: 400 15px/1.65 'Geist', system-ui, sans-serif;
          color: var(--cx-ink);
          overflow-y: auto;
        }
        .cx-mail-textarea:focus { outline: none; }
        .cx-mail-body .cx-skeleton { inset: 0; padding: 18px; border-radius: 0; }
        .cx-mail-error { margin: 0; padding: 8px 18px; font-size: 13px; font-weight: 500; color: #B11F55; background: #FFF5F8; border-bottom: 1px solid #ECE9E3; }
        .cx-mail-error-flat { padding: 0; background: none; border: 0; }
        .cx-mail .cx-ai { margin: 0; padding: 14px 18px; border-top: 1px solid #ECE9E3; background: #F7F9FD; }
        .cx-ai-label { display: inline-flex; align-items: center; gap: 6px; font-size: 13.5px; font-weight: 500; color: #0B57D0; }
        .cx-mail .cx-failed { margin: 0 18px 14px; }

        .cx-mail-toolbar {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 12px 14px 14px 18px;
          border-top: 1px solid #ECE9E3;
        }
        .cx-btn-send-pill {
          background: #0B57D0;
          color: #FFFFFF;
          border: 0;
          border-radius: 999px;
          padding: 10px 22px;
          min-height: 40px;
          font-weight: 500;
        }
        .cx-btn-send-pill:hover:not(:disabled) { background: #0A4AB0; color: #FFFFFF; }
        .cx-btn-send-pill:disabled { background: #AFC4EB; cursor: not-allowed; }
        .cx-tool {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          height: 38px;
          padding: 0 10px;
          margin-left: 6px;
          background: transparent;
          border: 0;
          border-radius: 999px;
          color: #444746;
          font: 500 14px 'Geist', system-ui, sans-serif;
          cursor: pointer;
          transition: background 140ms, color 140ms;
        }
        .cx-tool:hover { background: #F1F3F4; }
        .cx-tool.is-on { background: #E8F0FE; color: #0B57D0; }
        .cx-tool-end { margin-left: 0; }
        .cx-mail-hint { margin-left: auto; font-size: 12.5px; color: #8F8F8F; }
        .cx-mail .cx-sent { padding: 44px 24px 34px; }

        /* ── Places along the journey ── */
        .cx-places {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 0;
          overflow: hidden;
          pointer-events: none;
          background: linear-gradient(to bottom, rgba(250, 249, 247, 0), #D7ECFB 45%, #CDE7FA);
          padding-top: 120px;
        }
        .cx-places-art { position: relative; width: 100%; min-width: 1100px; left: 50%; transform: translateX(-50%); }
        .cx-places-art img { display: block; width: 100%; height: auto; image-rendering: pixelated; }
        .cx-place {
          position: absolute;
          bottom: 12%;
          transform: translateX(-50%);
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 3px 7px;
          background: rgba(255, 255, 255, 0.92);
          border: 1px solid rgba(20, 20, 20, 0.15);
          border-radius: 3px;
          font-size: 10.5px;
          font-weight: 500;
          letter-spacing: 0.1em;
          color: var(--cx-ink);
          white-space: nowrap;
        }
        .cx-place i { width: 6px; height: 6px; background: var(--brand); }
        .cx-place.is-high { bottom: 52%; }

        /* ── Responsive ── */
        @media (max-width: 1023px) {
          .cx-section { padding: 112px 32px 340px; }
          .cx-grid { grid-template-columns: 1fr; }
          .cx-side { order: 2; }
          .cx-only-desktop { display: none !important; }
          .cx-grid.is-wide .cx-side { display: flex; }
        }
        @media (max-width: 767px) {
          .cx-section { padding: 96px 16px 300px; }
          .cx-guide { display: none; }
          .cx-head { margin-bottom: 36px; }
          .cx-lead { font-size: 16px; }
          .cx-card-body { padding: 20px 16px 18px; }
          .cx-strip { padding: 0 16px; }
          .cx-strip-split { padding-right: 6px; }
          .cx-field-pair { grid-template-columns: 1fr; }
          .cx-ai-row { flex-direction: column; }
          .cx-mail-hint, .cx-tool-text { display: none; }
          .cx-mail-addr { display: none; }
          .cx-mail-label { flex-basis: 40px; }
        }
      `}</style>
    </section>
  );
}
