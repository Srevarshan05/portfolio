"use client";

import { useState, useRef, useEffect } from "react";
import { useScrollReveal } from "@/lib/useScrollReveal";

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef as React.RefObject<HTMLElement>);

  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  
  // AI Draft State
  const [aiOpen, setAiOpen] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");
  const [drafting, setDrafting] = useState(false);

  // AI Autofill Animation States/Refs
  const [isAutofilling, setIsAutofilling] = useState(false);
  const autofillTimerRef = useRef<NodeJS.Timeout | null>(null);
  const fullTargetRef = useRef({ subject: "", message: "" });

  // Ref for textarea auto-resizing
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Keep track of the form data before clearing it so the user can "Undo"
  const prevFormRef = useRef({ name: "", email: "", subject: "", message: "" });

  const stopAutofillAndComplete = () => {
    if (autofillTimerRef.current) {
      clearInterval(autofillTimerRef.current);
      autofillTimerRef.current = null;
    }
    if (isAutofilling) {
      setForm((prev) => ({
        ...prev,
        subject: fullTargetRef.current.subject,
        message: fullTargetRef.current.message,
      }));
      setIsAutofilling(false);
    }
  };

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (isAutofilling) {
      stopAutofillAndComplete();
    }
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleInputMouseDown = () => {
    if (isAutofilling) {
      stopAutofillAndComplete();
    }
  };

  // Clear interval on unmount
  useEffect(() => {
    return () => {
      if (autofillTimerRef.current) {
        clearInterval(autofillTimerRef.current);
      }
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isAutofilling) {
      stopAutofillAndComplete();
    }
    if (!form.email || !form.message) {
      setToastMessage("Please enter your email and message.");
      setShowToast(true);
      return;
    }

    setStatus("sending");
    prevFormRef.current = { ...form };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        setStatus("success");
        setForm({ name: "", email: "", subject: "", message: "" });
        setToastMessage("Message sent.");
        setShowToast(true);
      } else {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to deliver message");
      }
    } catch (err: any) {
      console.error("API Transmission failed, falling back to mailto:", err);
      setStatus("error");
      
      // Fallback: Mailto link pre-filled
      const subjectLine = form.subject || "Portfolio Inquiry";
      const bodyText = `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`;
      const mailtoUrl = `mailto:srevarshan9600622@gmail.com?subject=${encodeURIComponent(subjectLine)}&body=${encodeURIComponent(bodyText)}`;
      
      // Open mailto link
      window.open(mailtoUrl, "_blank");
      
      // Clear form and notify user of the fallback action
      setForm({ name: "", email: "", subject: "", message: "" });
      setToastMessage("Fallback: Pre-filled email client opened.");
      setShowToast(true);
    }
  };

  const handleAiDraft = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiPrompt) return;

    setDrafting(true);
    try {
      const response = await fetch("/api/draft", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: aiPrompt }),
      });

      if (response.ok) {
        const data = await response.json();
        setAiOpen(false);
        setAiPrompt("");

        const targetSubject = data.subject || form.subject;
        const targetMessage = data.message || form.message;

        fullTargetRef.current = { subject: targetSubject, message: targetMessage };

        if (autofillTimerRef.current) {
          clearInterval(autofillTimerRef.current);
          autofillTimerRef.current = null;
        }

        setIsAutofilling(true);
        setForm((prev) => ({ ...prev, subject: "", message: "" }));

        const subjectWords = targetSubject.split(" ");
        const messageWords = targetMessage.split(" ");

        let currentSubject = "";
        let currentMessage = "";
        let subjectIndex = 0;
        let messageIndex = 0;

        const interval = setInterval(() => {
          let updated = false;

          if (subjectIndex < subjectWords.length) {
            currentSubject += (subjectIndex === 0 ? "" : " ") + subjectWords[subjectIndex];
            subjectIndex++;
            updated = true;
          }

          if (messageIndex < messageWords.length) {
            currentMessage += (messageIndex === 0 ? "" : " ") + messageWords[messageIndex];
            messageIndex++;
            updated = true;
          }

          setForm((prev) => ({
            ...prev,
            subject: currentSubject,
            message: currentMessage,
          }));

          if (!updated) {
            clearInterval(interval);
            autofillTimerRef.current = null;
            setIsAutofilling(false);
          }
        }, 20); // 20ms per word typing animation

        autofillTimerRef.current = interval;

        setToastMessage("AI Draft generated successfully.");
        setShowToast(true);
      } else {
        throw new Error("AI Generation failed");
      }
    } catch (err) {
      console.error(err);
      setToastMessage("AI Draft failed. Try again.");
      setShowToast(true);
    } finally {
      setDrafting(false);
    }
  };

  const handleUndo = () => {
    setForm(prevFormRef.current);
    setShowToast(false);
    setStatus("idle");
  };

  // Auto-dismiss toast
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  // Auto-resize textarea when text content changes
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [form.message]);

  return (
    <section id="contact" className="section" ref={sectionRef}>
      {/* Visually Hidden Header for Screen Readers & SEO */}
      <h2 className="sr-only">Contact Me</h2>

      <div className="contact-wrapper">
        
        {/* Container for the Gmail Compose Window - Normal Flow */}
        <div className="gmail-compose-container">
          {/* Gmail Compose Window Interface */}
          <div className="gmail-compose-card reveal-scale">
            
            {/* Gmail Titlebar Header - Flex Container for inline items */}
            <div className="gmail-header">
              <div className="gmail-header-left">
                <img
                  src="/icons/gmail.png"
                  alt="Gmail Logo"
                  className="gmail-header-logo"
                />
                <span className="gmail-header-title">New Message</span>
              </div>
              <div className="gmail-header-right">
                <span className="gmail-control-btn" title="Minimize">—</span>
                <span className="gmail-control-btn" title="Exit Fullscreen">⛶</span>
                <span className="gmail-control-btn" title="Close" onClick={() => setForm({ name: "", email: "", subject: "", message: "" })}>×</span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="gmail-body">
              
              {/* Row 1: To Recipient */}
              <div className="gmail-field-row">
                <span className="gmail-field-label">To</span>
                <div className="gmail-recipient-pill">
                  <span className="gmail-avatar">S</span>
                  <span className="gmail-recipient-name">Sre Varshan</span>
                  <span className="gmail-recipient-email">&lt;srevarshan9600622@gmail.com&gt;</span>
                </div>
              </div>

              {/* Row 2: From Sender Email */}
              <div className="gmail-field-row">
                <label htmlFor="contact-email" className="gmail-field-label">From</label>
                <input
                  type="email"
                  id="contact-email"
                  name="email"
                  className="gmail-field-input"
                  value={form.email}
                  onChange={handle}
                  required
                />
              </div>

              {/* Row 3: Sender Name */}
              <div className="gmail-field-row">
                <label htmlFor="contact-name" className="gmail-field-label">Name</label>
                <input
                  type="text"
                  id="contact-name"
                  name="name"
                  className="gmail-field-input"
                  value={form.name}
                  onChange={handle}
                  required
                />
              </div>

              {/* Row 4: Subject */}
              <div className="gmail-field-row">
                <label htmlFor="contact-subject" className="gmail-field-label">Subject</label>
                {drafting ? (
                  <div className="gmail-skeleton-subject shimmer"></div>
                ) : (
                  <input
                    type="text"
                    id="contact-subject"
                    name="subject"
                    className={`gmail-field-input ${isAutofilling ? "autofilling" : ""}`}
                    value={form.subject}
                    onChange={handle}
                    onMouseDown={handleInputMouseDown}
                    required
                  />
                )}
              </div>

              {/* Row 5: Message Body - Auto Resizing Textarea */}
              <div className="gmail-textarea-wrapper">
                {drafting ? (
                  <div className="gmail-skeleton-message">
                    <div className="gmail-skeleton-line shimmer" style={{ width: "90%" }}></div>
                    <div className="gmail-skeleton-line shimmer" style={{ width: "75%" }}></div>
                    <div className="gmail-skeleton-line shimmer" style={{ width: "85%" }}></div>
                    <div className="gmail-skeleton-line shimmer" style={{ width: "60%" }}></div>
                  </div>
                ) : (
                  <textarea
                    ref={textareaRef}
                    id="contact-message"
                    name="message"
                    className={`gmail-textarea ${isAutofilling ? "autofilling" : ""}`}
                    value={form.message}
                    onChange={handle}
                    onMouseDown={handleInputMouseDown}
                    required
                  />
                )}
              </div>

              {/* AI Draft input tray */}
              {aiOpen && (
                <div className="gmail-ai-prompt-box">
                  <div className="gmail-ai-row">
                    <img
                      src="/icons/doodle-stars.png"
                      alt="AI Sparkles"
                      style={{ width: "16px", height: "16px", objectFit: "contain" }}
                    />
                    <input
                      type="text"
                      className="gmail-ai-input"
                      value={aiPrompt}
                      onChange={(e) => setAiPrompt(e.target.value)}
                      placeholder="Prompt AI to draft email..."
                      disabled={drafting}
                    />
                    <button
                      type="button"
                      onClick={handleAiDraft}
                      disabled={drafting || !aiPrompt}
                      className="gmail-ai-draft-btn"
                    >
                      {drafting ? "Drafting..." : "Create"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setAiOpen(false)}
                      className="gmail-ai-close-btn"
                      disabled={drafting}
                    >
                      ×
                    </button>
                  </div>
                </div>
              )}

              {/* Row 6: Gmail-style Toolbar Footer */}
              <div className="gmail-footer">
                <div className="gmail-footer-left">
                  <button type="submit" className="gmail-send-btn" disabled={status === "sending"} id="contact-submit">
                    {status === "sending" ? "Sending..." : "Send"}
                    {status !== "sending" && (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ transform: "rotate(45deg)", marginLeft: "6px" }}>
                        <line x1="22" y1="2" x2="11" y2="13" />
                        <polygon points="22 2 15 22 11 13 2 9 22 2" />
                      </svg>
                    )}
                  </button>

                  {/* AI Email Draft Trigger Icon */}
                  <button
                    type="button"
                    className={`toolbar-icon-btn ai-draft-toggle-btn ${aiOpen ? "active" : ""}`}
                    title="Draft email with AI"
                    onClick={() => setAiOpen(!aiOpen)}
                  >
                    <img
                      src="/icons/doodle-stars.png"
                      alt="AI Stars Icon"
                      style={{ width: "18px", height: "18px", objectFit: "contain" }}
                    />
                  </button>
                </div>

                <div className="gmail-footer-right">
                  <button
                    type="button"
                    className="toolbar-icon-btn discard-btn"
                    title="Discard draft"
                    onClick={() => {
                      setForm({ name: "", email: "", subject: "", message: "" });
                      setAiOpen(false);
                      setAiPrompt("");
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6"/></svg>
                  </button>
                </div>
              </div>

            </form>
          </div>
        </div>
      </div>

      {/* Floating Gmail Send Toast */}
      {showToast && (
        <div className="gmail-toast reveal">
          <span className="gmail-toast-text">{toastMessage}</span>
          {toastMessage === "Message sent." && (
            <button onClick={handleUndo} className="gmail-toast-undo-btn">
              Undo
            </button>
          )}
          <button onClick={() => setShowToast(false)} className="gmail-toast-dismiss-btn" aria-label="Dismiss toast">
            ×
          </button>
        </div>
      )}

      {/* Styling */}
      <style>{`
        /* Visually hidden for screen readers */
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border-width: 0;
        }

        #contact {
          background-color: #000000;
          background-image: url('/Contact-me-dark.png');
          background-size: cover;
          /* Locked background alignment to the top to prevent vertical cropping of doodles/text */
          background-position: center top;
          background-repeat: no-repeat;
          position: relative;
          width: 100%;
        }

        .contact-wrapper {
          width: 100%;
          height: 100%;
          position: relative;
        }

        /* Gmail Compose Container - Centering Wrapper in Normal Flow */
        .gmail-compose-container {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: flex-start;
        }

        /* Gmail Compose Dialog styling */
        .gmail-compose-card {
          background: #ffffff;
          border: 3px solid #1C202B;
          box-shadow: 8px 8px 0 0 #1C202B;
          border-radius: 6px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          width: 100%;
          height: auto; /* Dynamic height */
        }

        .gmail-header {
          background: #1C202B;
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 16px;
          user-select: none;
        }

        .gmail-header-left {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .gmail-header-logo {
          width: 20px;
          height: 16px;
          object-fit: contain;
          display: inline-block;
        }

        .gmail-header-title {
          font-family: 'Open Sans', sans-serif;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.5px;
          line-height: 1;
        }

        .gmail-control-btn {
          color: #94A3CC;
          font-size: 14px;
          font-weight: 700;
          margin-left: 14px;
          cursor: pointer;
          transition: color 120ms;
        }

        .gmail-control-btn:hover {
          color: #ffffff;
        }

        .gmail-body {
          display: flex;
          flex-direction: column;
          flex: 1;
          background: #ffffff;
        }

        .gmail-field-row {
          display: flex;
          align-items: center;
          padding: 8px 16px;
          border-bottom: 1.5px solid rgba(28, 32, 43, 0.08);
          gap: 12px;
          min-height: 44px;
        }

        .gmail-field-label {
          font-family: 'Open Sans', sans-serif;
          font-size: 13px;
          color: #71717a;
          font-weight: 600;
          min-width: 48px;
          user-select: none;
        }

        .gmail-field-input {
          flex: 1;
          border: none;
          outline: none;
          font-family: 'Open Sans', sans-serif;
          font-size: 13px;
          color: #1C202B;
          background: transparent;
          padding: 4px 0;
        }

        /* Recipient Capsule Pill */
        .gmail-recipient-pill {
          display: inline-flex;
          align-items: center;
          background: #f1f3f4;
          border: 1.5px solid #dadce0;
          border-radius: 16px;
          padding: 3px 10px 3px 6px;
          gap: 6px;
          font-size: 12px;
          user-select: none;
        }

        .gmail-avatar {
          width: 18px;
          height: 18px;
          background: #1a73e8;
          color: #ffffff;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 10px;
        }

        .gmail-recipient-name {
          font-weight: 700;
          color: #3c4043;
          font-family: 'Open Sans', sans-serif;
        }

        .gmail-recipient-email {
          color: #5f6368;
          font-family: 'Open Sans', sans-serif;
        }

        /* AI Prompt Box */
        .gmail-ai-prompt-box {
          background: #f0f4f9;
          border-top: 1.5px solid rgba(28, 32, 43, 0.08);
          padding: 10px 16px;
        }

        .gmail-ai-row {
          display: flex;
          align-items: center;
          gap: 8px;
          width: 100%;
          flex-wrap: wrap;
        }

        .gmail-ai-input {
          flex: 1;
          min-width: 150px;
          background: #ffffff;
          border: 1.5px solid #dadce0;
          border-radius: 18px;
          padding: 6px 14px;
          font-family: 'Open Sans', sans-serif;
          font-size: 12px;
          color: #1C202B;
          outline: none;
          transition: border-color 150ms;
        }

        .gmail-ai-input:focus {
          border-color: #1a73e8;
        }

        .gmail-ai-draft-btn {
          background: #1a73e8;
          color: #ffffff;
          border: none;
          border-radius: 18px;
          padding: 6px 14px;
          font-family: 'Open Sans', sans-serif;
          font-weight: 700;
          font-size: 11px;
          cursor: pointer;
          transition: background 150ms;
        }

        .gmail-ai-draft-btn:hover {
          background: #1557b0;
        }

        .gmail-ai-draft-btn:disabled {
          background: #dadce0;
          color: #80868b;
          cursor: not-allowed;
        }

        .gmail-ai-close-btn {
          background: transparent;
          border: none;
          color: #5f6368;
          font-size: 18px;
          font-weight: 700;
          cursor: pointer;
          padding: 0 4px;
        }

        .gmail-ai-close-btn:hover {
          color: #202124;
        }

        /* Message Textarea Container */
        .gmail-textarea-wrapper {
          flex: 1;
          display: flex;
          flex-direction: column;
          min-height: 0;
        }

        .gmail-textarea {
          width: 100%;
          min-height: 120px;
          border: none;
          outline: none;
          padding: 16px;
          font-family: 'Open Sans', sans-serif;
          font-size: 13px;
          line-height: 1.6;
          color: #1C202B;
          resize: none;
          background: transparent;
          overflow-y: hidden; /* Hide scrollbar since it dynamically resizes */
          transition: background-color 0.3s ease, box-shadow 0.3s ease, color 0.3s ease;
        }

        /* Autofill streaming animation styling */
        @keyframes autofillGlow {
          0%, 100% {
            background-color: rgba(26, 115, 232, 0.03);
            box-shadow: inset 0 0 8px rgba(26, 115, 232, 0.05);
          }
          50% {
            background-color: rgba(26, 115, 232, 0.08);
            box-shadow: inset 0 0 12px rgba(26, 115, 232, 0.15);
          }
        }

        .gmail-field-input.autofilling {
          animation: autofillGlow 1.2s ease-in-out infinite;
          color: #1a73e8 !important;
          font-weight: 500;
          border-bottom: 1.5px solid rgba(26, 115, 232, 0.4) !important;
        }

        .gmail-textarea.autofilling {
          animation: autofillGlow 1.2s ease-in-out infinite;
          color: #1a73e8 !important;
          font-weight: 500;
          border-radius: 4px;
        }

        /* Skeleton Shimmer Loader styling */
        .gmail-skeleton-subject {
          height: 16px;
          width: 50%;
          max-width: 220px;
          background: #e8eaed;
          border-radius: 4px;
          margin: 6px 0;
        }

        .gmail-skeleton-message {
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          width: 100%;
          min-height: 140px;
        }

        .gmail-skeleton-line {
          height: 12px;
          background: #e8eaed;
          border-radius: 4px;
          width: 100%;
        }

        /* Shimmer Animation effect */
        .shimmer {
          background: linear-gradient(
            90deg,
            #f1f3f4 25%,
            #e8eaed 37%,
            #f1f3f4 63%
          );
          background-size: 400% 100%;
          animation: shimmerSweep 1.4s ease infinite;
        }

        @keyframes shimmerSweep {
          0% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        /* Toolbar Footer */
        .gmail-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 16px;
          border-top: 1.5px solid rgba(28, 32, 43, 0.08);
          background: #ffffff;
          user-select: none;
        }

        .gmail-footer-left {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .gmail-send-btn {
          background: #1a73e8;
          color: #ffffff;
          border: 1.5px solid #1a73e8;
          border-radius: 20px;
          padding: 8px 20px;
          font-family: 'Open Sans', sans-serif;
          font-weight: 700;
          font-size: 13px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: background 150ms, border-color 150ms;
        }

        .gmail-send-btn:hover {
          background: #1557b0;
          border-color: #1557b0;
        }

        .gmail-send-btn:disabled {
          background: #e8eaed;
          color: #b0b4b9;
          border-color: #e8eaed;
          cursor: not-allowed;
        }

        .toolbar-icon-btn {
          background: transparent;
          border: none;
          color: #5f6368;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 120ms, color 120ms;
        }

        .toolbar-icon-btn:hover {
          background: #f1f3f4;
          color: #202124;
        }

        .ai-draft-toggle-btn.active {
          background: #e8f0fe;
          color: #1a73e8;
        }

        .discard-btn:hover {
          background: #fce8e6;
          color: #c5221f;
        }

        /* Floating Toast notifications */
        .gmail-toast {
          position: fixed;
          bottom: 24px;
          left: 24px;
          background: #202124;
          color: #f1f3f4;
          padding: 12px 18px 12px 24px;
          border-radius: 4px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          gap: 20px;
          font-family: 'Open Sans', sans-serif;
          font-size: 14px;
          z-index: 10000;
          border: 1px solid #3c4043;
          animation: toastSlideUp 180ms cubic-bezier(0, 0, 0.2, 1);
        }

        .gmail-toast-text {
          font-weight: 600;
        }

        .gmail-toast-undo-btn {
          background: none;
          border: none;
          color: #8ab4f8;
          font-weight: 700;
          cursor: pointer;
          font-size: 13px;
          font-family: 'Open Sans', sans-serif;
          text-decoration: underline;
          padding: 0;
        }

        .gmail-toast-undo-btn:hover {
          color: #d2e3fc;
        }

        .gmail-toast-dismiss-btn {
          background: none;
          border: none;
          color: #9aa0a6;
          cursor: pointer;
          font-size: 18px;
          font-weight: 700;
          padding: 0;
          line-height: 1;
        }

        .gmail-toast-dismiss-btn:hover {
          color: #e8eaed;
        }

        @keyframes toastSlideUp {
          from { transform: translateY(40px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        /* Viewport Breakpoints */
        @media (min-width: 1024px) {
          #contact {
            /* Compact layout that grows dynamically with content */
            min-height: 620px;
            padding: 0; /* Clear section paddings to let margins handle spacing */
          }
          .contact-wrapper {
            width: 100%;
            max-width: 1240px;
            margin: 0 auto;
            position: relative;
          }
          .gmail-compose-container {
            position: relative; /* Restores normal document flow */
            width: 100%;
            /* Push the container DOWN by 260px to clear the text "LET'S BUILD SOMETHING GREAT" and keep headers visible */
            margin-top: 260px;
            margin-bottom: 120px;
          }
          .gmail-compose-card {
            width: 54%;
            max-width: 620px;
            height: auto;
          }
        }

        @media (max-width: 1023px) {
          #contact {
            padding: 0;
          }
          .gmail-compose-container {
            width: 100%;
            margin-top: 180px; /* Push the container down on tablets */
            margin-bottom: 60px;
            padding: 0 24px;
          }
          .gmail-compose-card {
            max-width: 600px;
            margin: 0 auto;
            height: auto;
          }
        }

        @media (max-width: 767px) {
          .gmail-compose-container {
            margin-top: 140px; /* Push down on mobile screens */
            margin-bottom: 40px;
            padding: 0 16px;
          }
          
          /* Compact spacing and sizes to fit perfectly on small screens */
          .gmail-field-row {
            padding: 6px 12px;
            min-height: 38px;
            gap: 8px;
          }
          .gmail-field-label {
            min-width: 40px;
          }
          .gmail-recipient-pill {
            flex-wrap: wrap;
            padding: 2px 6px;
            border-radius: 8px;
            gap: 4px;
          }
          .gmail-recipient-name {
            font-size: 11px;
          }
          .gmail-recipient-email {
            font-size: 9px;
          }
          .gmail-textarea {
            padding: 12px;
            min-height: 100px;
            font-size: 13px;
          }
          .gmail-footer {
            padding: 10px 12px;
          }
          .gmail-send-btn {
            padding: 6px 14px;
            font-size: 12px;
          }
          .gmail-ai-row {
            gap: 6px;
          }
          .gmail-ai-input {
            padding: 5px 10px;
            font-size: 11px;
          }
          .gmail-ai-draft-btn {
            padding: 5px 10px;
            font-size: 10px;
          }
        }
      `}</style>
    </section>
  );
}
