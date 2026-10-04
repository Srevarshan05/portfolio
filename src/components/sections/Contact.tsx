"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const TO_EMAIL = "srevarshan9600622@gmail.com";
const DRAFT_KEY = "sv-contact-draft";

type Fields = { name: string; email: string; subject: string; message: string };
type FieldErrors = Partial<Record<keyof Fields, string>>;
type SendState = "idle" | "sending" | "sent" | "failed";

const EMPTY: Fields = { name: "", email: "", subject: "", message: "" };
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

  return (
    <section id="contact" className="ct-section" aria-labelledby="contact-title">
      <div className="ct-grain" aria-hidden="true" />

      <div className="ct-inner">
        <header className="ct-header">
          <h2 id="contact-title" className="ct-title">Let&apos;s Build Something Great!</h2>
          <p className="ct-lead">
            Hiring, collaborating, or have a problem worth solving with AI? Write to me here,
            or describe what you need and let AI draft the email for you.
          </p>
          <p className="ct-direct">
            <span>Prefer your own inbox?</span>
            <a href={`mailto:${TO_EMAIL}`} className="ct-direct-link">{TO_EMAIL}</a>
            <button type="button" className="ct-copy" onClick={copyEmail} aria-live="polite">
              {copied ? "Copied" : "Copy"}
            </button>
          </p>
        </header>

        <div className="ct-stage">
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

            {!minimized && (sendState === "sent" ? (
              <div className="ct-sent" role="status">
                <svg className="ct-plane" width="96" height="96" viewBox="0 0 96 96" fill="none" aria-hidden="true">
                  <path className="ct-plane-trail" d="M6 78c14-2 22-10 30-20" stroke="#94A3CC" strokeWidth="3" strokeLinecap="round" strokeDasharray="4 7" />
                  <path className="ct-plane-body" d="M30 52 88 14 66 82 50 62 30 52Z" fill="#FFFFFF" stroke="#1C202B" strokeWidth="4" strokeLinejoin="round" />
                  <path d="M88 14 50 62v18l10-13" stroke="#1C202B" strokeWidth="4" strokeLinejoin="round" strokeLinecap="round" />
                </svg>
                <h3 className="ct-sent-title">Message sent!</h3>
                <p className="ct-sent-text">Thanks for reaching out. Your message is in my inbox and I&apos;ll reply to the email you gave.</p>
                <button type="button" className="ct-btn ct-btn-ghost" onClick={() => setSendState("idle")}>
                  Write another message
                </button>
              </div>
            ) : (
              <>
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
              </>
            ))}

            <p className="sr-only" role="status" aria-live="polite">{status}</p>
          </div>

          <img
            className="ct-sketch"
            src="/sketch-leaning.webp"
            alt=""
            aria-hidden="true"
            width={392}
            height={952}
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>

      <style>{`
        .ct-section {
          position: relative;
          overflow: hidden;
          background: #07080B;
          color: #FFFFFF;
          padding: 112px 40px 0;
          isolation: isolate;
        }
        .ct-grain {
          position: absolute;
          inset: 0;
          z-index: -1;
          background-image:
            radial-gradient(ellipse 60% 50% at 30% 40%, rgba(226, 45, 109, 0.10), transparent 70%),
            linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px);
          background-size: auto, 48px 48px, 48px 48px;
        }
        .ct-inner { max-width: 1180px; margin: 0 auto; }

        /* ── Header ── */
        .ct-header { max-width: 760px; margin-bottom: 44px; }
        .ct-title {
          font-size: clamp(44px, 6.4vw, 84px);
          letter-spacing: 1.5px;
          line-height: 0.95;
          color: #FFFFFF;
          margin: 0 0 20px;
          transform: skewX(-5deg);
          transform-origin: left bottom;
          text-shadow: 4px 4px 0 var(--brand);
          text-wrap: balance;
        }
        .ct-lead {
          font-size: 18px;
          line-height: 1.6;
          color: #C8D4FF;
          max-width: 56ch;
          margin: 0 0 18px;
        }
        .ct-direct {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 8px 12px;
          font-size: 14px;
          color: #94A3CC;
          margin: 0;
        }
        .ct-direct-link {
          color: #FFFFFF;
          font-weight: 700;
          text-decoration-color: var(--brand);
          text-decoration-thickness: 2px;
          word-break: break-all;
        }
        .ct-direct-link:hover { color: var(--brand-soft); }
        .ct-copy {
          background: transparent;
          color: #DFE7FF;
          border: 1.5px solid #333949;
          border-radius: 4px;
          padding: 4px 10px;
          min-height: 32px;
          font: 700 12px 'Open Sans', sans-serif;
          letter-spacing: 0.4px;
          cursor: pointer;
          transition: border-color 150ms, color 150ms;
        }
        .ct-copy:hover { border-color: #94A3CC; color: #FFFFFF; }

        /* ── Stage: compose window + sketch ── */
        .ct-stage {
          position: relative;
          display: grid;
          grid-template-columns: minmax(0, 680px) minmax(0, 1fr);
          align-items: end;
          gap: 24px;
        }
        .ct-window {
          position: relative;
          z-index: 2;
          margin-bottom: 96px;
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

        /* Sketch — leans on the right, looking at the window */
        .ct-sketch {
          justify-self: end;
          align-self: end;
          display: block;
          width: auto;
          height: min(620px, 62vw);
          max-width: 100%;
          object-fit: contain;
          object-position: right bottom;
          pointer-events: none;
          user-select: none;
          opacity: 0.94;
        }

        /* ── Responsive ── */
        @media (max-width: 1023px) {
          .ct-section { padding: 88px 32px 0; }
          .ct-stage { grid-template-columns: minmax(0, 1fr) 180px; }
          .ct-sketch { height: 440px; }
          .ct-only-desktop { display: none !important; }
          .ct-window.is-wide { grid-column: auto; }
        }
        @media (max-width: 767px) {
          .ct-section { padding: 72px 16px 0; }
          .ct-header { margin-bottom: 32px; }
          .ct-title { text-shadow: 3px 3px 0 var(--brand); }
          .ct-lead { font-size: 16px; }
          .ct-stage { grid-template-columns: 1fr; }
          .ct-window { margin-bottom: 0; box-shadow: 6px 6px 0 0 var(--brand); }
          .ct-window.is-min { max-width: none; }
          .ct-sketch { height: 260px; justify-self: end; margin-top: -8px; margin-right: -8px; }
          .ct-row { padding: 6px 14px; gap: 10px; }
          .ct-label { flex-basis: 52px; }
          .ct-error { padding-left: 14px; }
          .ct-textarea { padding: 14px; }
          .ct-ai, .ct-failed, .ct-foot { padding-left: 14px; padding-right: 14px; }
          .ct-ai-row { flex-direction: column; }
          .ct-kbd { display: none; }
          .ct-recipient-email { font-size: 12px; }
        }
      `}</style>
    </section>
  );
}
