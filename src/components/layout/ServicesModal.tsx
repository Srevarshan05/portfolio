"use client";

import { useEffect, useState } from "react";
import { useDialog } from "@/lib/useDialog";

/* ─── Types ─────────────────────────────────────────────────────────── */
type Screen = "booking" | "confirmed";

/* ─── Calendar helpers ───────────────────────────────────────────────── */
const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];
const DAYS_SHORT = ["SUN","MON","TUE","WED","THU","FRI","SAT"];

const TIME_SLOTS = [
  "10:00 AM","11:00 AM","12:00 PM",
  "02:00 PM","03:00 PM","04:00 PM",
  "05:00 PM","06:00 PM","07:00 PM",
];

const TOPICS = [
  "AI / ML Project",
  "Software Development",
  "AI Automation",
  "Research & Collaboration",
  "Freelance / Consulting",
  "Other",
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function buildCalendar(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrev = new Date(year, month, 0).getDate();
  const cells: { day: number; month: "prev" | "cur" | "next" }[] = [];
  for (let i = firstDay - 1; i >= 0; i--) cells.push({ day: daysInPrev - i, month: "prev" });
  for (let d = 1; d <= daysInMonth; d++) cells.push({ day: d, month: "cur" });
  let next = 1;
  while (cells.length % 7 !== 0) cells.push({ day: next++, month: "next" });
  return cells;
}

/* ─── Main Component ─────────────────────────────────────────────────── */
export default function ServicesModal() {
  const [visible, setVisible]   = useState(false);
  const [screen, setScreen]     = useState<Screen>("booking");
  const [name, setName]         = useState("");
  const [email, setEmail]       = useState("");
  const [phone, setPhone]       = useState("");
  const [topic, setTopic]       = useState("");
  const [note, setNote]         = useState("");
  const [sending, setSending]   = useState(false);
  const [errors, setErrors]     = useState<Record<string, string>>({});
  const [sendError, setSendError] = useState("");

  /* Calendar state */
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const [calYear, setCalYear]   = useState(today.getFullYear());
  const [calMonth, setCalMonth] = useState(today.getMonth());
  const [selDay, setSelDay]     = useState(today.getDate());
  const [selTime, setSelTime]   = useState("02:00 PM");

  const cells = buildCalendar(calYear, calMonth);

  useEffect(() => {
    // ?book=1 (from the Services page) opens immediately
    if (new URLSearchParams(window.location.search).get("book") === "1") {
      const url = new URL(window.location.href);
      url.searchParams.delete("book");
      window.history.replaceState({}, "", url.toString());
      const t = setTimeout(() => setVisible(true), 0);
      return () => clearTimeout(t);
    }
    try { if (sessionStorage.getItem("sv-modal-v20")) return; } catch { /* storage blocked */ }
    const t = setTimeout(() => setVisible(true), 3000);
    return () => clearTimeout(t);
  }, []);

  const close = () => {
    setVisible(false);
    try { sessionStorage.setItem("sv-modal-v20", "1"); } catch { /* storage blocked */ }
  };
  const panelRef = useDialog<HTMLDivElement>(visible, close);

  const selectedDateStr = selDay
    ? new Date(calYear, calMonth, selDay).toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })
    : "";

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Add your name.";
    if (!email.trim()) e.email = "Add your email so I can reply.";
    else if (!EMAIL_RE.test(email.trim())) e.email = "That email doesn't look right.";
    if (!phone.trim()) e.phone = "Add a phone number for the call.";
    else if (phone.replace(/\D/g, "").length < 7) e.phone = "That number looks too short.";
    if (!selDay) e.date = "Pick a date for the call.";
    return e;
  };

  const handleConfirm = async () => {
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length) {
      const first = ["name", "email", "phone"].find((k) => found[k]);
      if (first) document.getElementById(`bk-${first}`)?.focus();
      return;
    }
    setSending(true);
    setSendError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(), email: email.trim(), phone: phone.trim(),
          date: selectedDateStr, time: `${selTime} IST`,
          subject: `New call booking: ${name.trim()} (${topic || "General"})`,
          topic: topic || "Not specified", note: note.trim() || "No details provided",
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data.delivered === false) throw new Error("not delivered");
      setScreen("confirmed");
    } catch {
      setSendError("The booking didn't go through. Please try again, or email srevarshan9600622@gmail.com directly.");
    } finally {
      setSending(false);
    }
  };

  if (!visible) return null;

  const prevMonth = () => {
    if (calYear === today.getFullYear() && calMonth === today.getMonth()) return;   // no past months
    if (calMonth === 0) { setCalYear((y) => y - 1); setCalMonth(11); } else setCalMonth((m) => m - 1);
    setSelDay(0);
  };
  const nextMonth = () => {
    if (calMonth === 11) { setCalYear((y) => y + 1); setCalMonth(0); } else setCalMonth((m) => m + 1);
    setSelDay(0);
  };
  const atCurrentMonth = calYear === today.getFullYear() && calMonth === today.getMonth();

  return (
    <div className="bk-backdrop" onClick={(e) => { if (e.target === e.currentTarget) close(); }}>
      <div ref={panelRef} className="bk-modal" role="dialog" aria-modal="true" aria-labelledby="bk-title" tabIndex={-1}>
        <button type="button" className="bk-close" onClick={close} aria-label="Close">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="square" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
        </button>

        {/* ── Header: sky strip ── */}
        <header className="bk-head">
          <img className="bk-cloud bk-cloud-a" src="/pixel/cloud-sky-2.png" alt="" aria-hidden="true" width={224} height={120} />
          <img className="bk-cloud bk-cloud-b" src="/pixel/cloud-sky-3.png" alt="" aria-hidden="true" width={368} height={168} />
          <div className="bk-head-row">
            <img className="bk-avatar" src="/icons/new-model-card.png" alt="" aria-hidden="true" width={56} height={56} />
            <div>
              <p className="bk-mono bk-kicker">Sre Varshan · Applied AI &amp; GenAI Engineer</p>
              <h2 id="bk-title" className="bk-title">Let&apos;s connect</h2>
            </div>
          </div>
          <p className="bk-sub">Have a project, idea, or opportunity in mind? Let&apos;s discuss how we can work together.</p>
        </header>

        {screen === "booking" ? (
          <>
            <div className="bk-body">
              {/* ── Left: details ── */}
              <div className="bk-col">
                <p className="bk-mono bk-section"><i style={{ background: "#1E88E5" }} />Your details</p>

                <div className="bk-field">
                  <label htmlFor="bk-name" className="bk-label">Your Name *</label>
                  <input id="bk-name" className="bk-input" autoComplete="name" placeholder="Your full name" value={name}
                    aria-invalid={!!errors.name} onChange={(e) => { setName(e.target.value); setErrors((p) => ({ ...p, name: "" })); }} />
                  {errors.name && <p className="bk-error">{errors.name}</p>}
                </div>
                <div className="bk-field-pair">
                  <div className="bk-field">
                    <label htmlFor="bk-email" className="bk-label">Email Address *</label>
                    <input id="bk-email" className="bk-input" type="email" inputMode="email" autoComplete="email" placeholder="you@company.com" value={email}
                      aria-invalid={!!errors.email} onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: "" })); }} />
                    {errors.email && <p className="bk-error">{errors.email}</p>}
                  </div>
                  <div className="bk-field">
                    <label htmlFor="bk-phone" className="bk-label">Phone Number *</label>
                    <input id="bk-phone" className="bk-input" type="tel" inputMode="tel" autoComplete="tel" placeholder="+91 98765 43210" value={phone}
                      aria-invalid={!!errors.phone} onChange={(e) => { setPhone(e.target.value); setErrors((p) => ({ ...p, phone: "" })); }} />
                    {errors.phone && <p className="bk-error">{errors.phone}</p>}
                  </div>
                </div>

                <p className="bk-mono bk-section"><i style={{ background: "#F2A33A" }} />What can I help you with?</p>
                <div className="bk-chips" role="radiogroup" aria-label="What can I help you with?">
                  {TOPICS.map((t) => (
                    <button key={t} type="button" role="radio" aria-checked={topic === t}
                      className={`bk-chip ${topic === t ? "is-on" : ""}`} onClick={() => setTopic(topic === t ? "" : t)}>
                      {t}
                    </button>
                  ))}
                </div>

                <p className="bk-mono bk-section"><i style={{ background: "#E4572E" }} />Tell me about your project</p>
                <div className="bk-field">
                  <label htmlFor="bk-note" className="sr-only">Tell me about your project</label>
                  <textarea id="bk-note" className="bk-input bk-textarea" maxLength={300}
                    placeholder="Briefly describe your project, idea, or opportunity..." value={note} onChange={(e) => setNote(e.target.value)} />
                  <span className="bk-mono bk-count">{note.length}/300</span>
                </div>
              </div>

              {/* ── Right: date & time ── */}
              <div className="bk-col">
                <p className="bk-mono bk-section"><i style={{ background: "#2BB04A" }} />Select a date &amp; time</p>
                <div className="bk-cal">
                  <div className="bk-cal-head">
                    <button type="button" className="bk-cal-nav" onClick={prevMonth} disabled={atCurrentMonth} aria-label="Previous month">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" aria-hidden="true"><path d="m15 6-6 6 6 6" /></svg>
                    </button>
                    <span className="bk-cal-month">{MONTHS[calMonth]} {calYear}</span>
                    <button type="button" className="bk-cal-nav" onClick={nextMonth} aria-label="Next month">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" aria-hidden="true"><path d="m9 6 6 6-6 6" /></svg>
                    </button>
                  </div>
                  <div className="bk-cal-grid">
                    {DAYS_SHORT.map((d) => <span className="bk-mono bk-cal-dow" key={d}>{d.slice(0, 2)}</span>)}
                    {cells.map((c, i) => {
                      if (c.month !== "cur") return <span key={i} className="bk-cal-cell is-out">{c.day}</span>;
                      const date = new Date(calYear, calMonth, c.day);
                      const past = date < today;
                      const isToday = date.getTime() === today.getTime();
                      return (
                        <button key={i} type="button" disabled={past}
                          className={`bk-cal-cell ${selDay === c.day ? "is-sel" : ""} ${isToday ? "is-today" : ""}`}
                          aria-pressed={selDay === c.day} aria-label={date.toDateString()}
                          onClick={() => { setSelDay(c.day); setErrors((p) => ({ ...p, date: "" })); }}>
                          {c.day}
                        </button>
                      );
                    })}
                  </div>
                </div>
                {errors.date && <p className="bk-error">{errors.date}</p>}

                <p className="bk-label bk-time-label">Available Time (IST)</p>
                <div className="bk-times" role="radiogroup" aria-label="Available Time (IST)">
                  {TIME_SLOTS.map((t) => (
                    <button key={t} type="button" role="radio" aria-checked={selTime === t}
                      className={`bk-time ${selTime === t ? "is-on" : ""}`} onClick={() => setSelTime(t)}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <footer className="bk-foot">
              <p className="bk-summary">
                {selDay ? <><span className="bk-mono">Your slot</span> {selectedDateStr} · {selTime} IST</> : <span className="bk-mono">Pick a date to continue</span>}
              </p>
              {sendError && <p className="bk-error bk-send-error" role="alert">{sendError}</p>}
              <div className="bk-actions">
                <button type="button" className="bk-btn bk-btn-outline" onClick={close}>Maybe later</button>
                <button type="button" className="bk-btn bk-btn-green" onClick={handleConfirm} disabled={sending}>
                  {sending ? "Booking…" : "Confirm booking"}
                  {!sending && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>}
                </button>
              </div>
            </footer>
          </>
        ) : (
          <div className="bk-done" role="status">
            <span className="bk-done-icon" aria-hidden="true">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.75" strokeLinecap="square"><path d="m5 12 5 5 9-10" /></svg>
            </span>
            <h3 className="bk-done-title">Your call is booked</h3>
            <p className="bk-done-text">
              Thanks, {name.trim()}. I&apos;ve got your request for <strong>{selectedDateStr} at {selTime} IST</strong> and
              will confirm by email at <strong>{email.trim()}</strong>.
            </p>
            <button type="button" className="bk-btn bk-btn-green" onClick={close}>Done</button>
          </div>
        )}
      </div>

      <style>{`
        .bk-backdrop {
          position: fixed;
          inset: 0;
          z-index: 99998;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          background: rgba(20, 20, 20, 0.55);
          backdrop-filter: blur(4px);
          animation: bkFade 200ms ease-out;
        }
        @keyframes bkFade { from { opacity: 0; } to { opacity: 1; } }
        .bk-modal {
          position: relative;
          width: min(1000px, 100%);
          max-height: calc(100vh - 40px);
          overflow-y: auto;
          background: #FFFFFF;
          border: 1px solid #E6E3DD;
          box-shadow: 0 30px 60px -30px rgba(20, 20, 20, 0.5);
          font-family: 'Geist', system-ui, sans-serif;
          color: #141414;
          outline: none;
          animation: bkIn 320ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes bkIn { from { opacity: 0; transform: translateY(18px) scale(0.98); } to { opacity: 1; transform: none; } }
        .bk-mono { font-family: 'Geist Mono', ui-monospace, monospace; text-transform: uppercase; letter-spacing: 0.14em; }
        .bk-close {
          position: absolute;
          top: 14px;
          right: 14px;
          z-index: 3;
          width: 40px;
          height: 40px;
          display: grid;
          place-items: center;
          background: #FFFFFF;
          border: 1px solid #E6E3DD;
          border-radius: 4px;
          color: #141414;
          cursor: pointer;
        }
        .bk-close:hover { background: #F6F4F0; }

        /* Header */
        .bk-head {
          position: relative;
          overflow: hidden;
          padding: 28px 32px 24px;
          background: linear-gradient(to bottom, #DDF0FC 0%, #EEF7FD 55%, #FFFFFF 100%);
          border-bottom: 1px solid #E6E3DD;
        }
        .bk-cloud { position: absolute; height: auto; image-rendering: pixelated; pointer-events: none; }
        .bk-cloud-a { width: 112px; top: 22px; right: 220px; }
        .bk-cloud-b { width: 184px; top: 70px; right: 40px; }
        .bk-head > :not(img) { position: relative; z-index: 1; }
        .bk-head-row { display: flex; align-items: center; gap: 16px; margin-bottom: 12px; }
        .bk-avatar { width: 56px; height: 56px; object-fit: cover; object-position: top; background: #FFFFFF; border: 1px solid #E6E3DD; }
        .bk-kicker { margin: 0 0 4px; font-size: 11.5px; color: #1F7A4C; }
        .bk-title { margin: 0; font-size: clamp(30px, 4vw, 42px); font-weight: 600; letter-spacing: -0.04em; line-height: 1.05; color: #141414; text-transform: none; }
        .bk-sub { margin: 0; max-width: 56ch; font-size: 16px; line-height: 1.55; color: #4D4D4D; }

        /* Body */
        .bk-body { display: grid; grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr); }
        .bk-col { padding: 24px 32px 8px; display: flex; flex-direction: column; }
        .bk-col + .bk-col { border-left: 1px solid #E6E3DD; }
        .bk-section { display: flex; align-items: center; gap: 8px; margin: 0 0 14px; font-size: 12px; font-weight: 500; color: #333; }
        .bk-section i { width: 9px; height: 9px; }
        .bk-col > .bk-section:not(:first-child) { margin-top: 22px; }
        .bk-field { position: relative; display: flex; flex-direction: column; gap: 6px; margin-bottom: 12px; min-width: 0; }
        .bk-field-pair { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .bk-label { font-size: 13.5px; font-weight: 500; color: #333; margin: 0; }
        .bk-input {
          width: 100%;
          min-height: 44px;
          padding: 10px 13px;
          background: #FFFFFF;
          border: 1px solid #D9D5CE;
          border-radius: 4px;
          font: 400 15px 'Geist', system-ui, sans-serif;
          color: #141414;
          transition: border-color 150ms, box-shadow 150ms;
        }
        .bk-input::placeholder { color: #8F8F8F; }
        .bk-input:focus { outline: none; border-color: #1F7A4C; box-shadow: 0 0 0 3px rgba(31, 122, 76, 0.16); }
        .bk-input[aria-invalid="true"] { border-color: #B11F55; }
        .bk-textarea { min-height: 104px; resize: none; line-height: 1.55; }
        .bk-count { position: absolute; right: 10px; bottom: 8px; font-size: 10.5px; color: #8F8F8F; }
        .bk-error { margin: 0; font-size: 12.5px; font-weight: 500; color: #B11F55; }

        .bk-chips { display: flex; flex-wrap: wrap; gap: 8px; }
        .bk-chip {
          min-height: 38px;
          padding: 8px 12px;
          background: #FFFFFF;
          border: 1px solid #D9D5CE;
          border-radius: 4px;
          font: 500 14px 'Geist', system-ui, sans-serif;
          color: #141414;
          cursor: pointer;
          transition: background 140ms, border-color 140ms, color 140ms;
        }
        .bk-chip:hover { background: #F6F4F0; }
        .bk-chip.is-on { background: #EAF6EF; border-color: #1F7A4C; color: #17603B; }

        /* Calendar */
        .bk-cal { border: 1px solid #E6E3DD; }
        .bk-cal-head { display: flex; align-items: center; justify-content: space-between; padding: 8px; border-bottom: 1px solid #E6E3DD; }
        .bk-cal-month { font-size: 15.5px; font-weight: 600; letter-spacing: -0.01em; }
        .bk-cal-nav {
          width: 36px;
          height: 36px;
          display: grid;
          place-items: center;
          background: #FFFFFF;
          border: 1px solid #E6E3DD;
          border-radius: 4px;
          color: #141414;
          cursor: pointer;
        }
        .bk-cal-nav:hover:not(:disabled) { background: #F6F4F0; }
        .bk-cal-nav:disabled { opacity: 0.35; cursor: not-allowed; }
        .bk-cal-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 2px; padding: 8px; }
        .bk-cal-dow { text-align: center; font-size: 10.5px; color: #6E6E6E; padding: 4px 0 6px; }
        .bk-cal-cell {
          height: 36px;
          display: grid;
          place-items: center;
          background: transparent;
          border: 0;
          border-radius: 4px;
          font: 500 14px 'Geist', system-ui, sans-serif;
          color: #141414;
          cursor: pointer;
        }
        button.bk-cal-cell:hover:not(:disabled) { background: #F1EFEA; }
        .bk-cal-cell.is-out { color: #C9C5BD; cursor: default; }
        .bk-cal-cell:disabled { color: #C9C5BD; cursor: not-allowed; text-decoration: line-through; }
        .bk-cal-cell.is-today { box-shadow: inset 0 0 0 1px #1F7A4C; }
        .bk-cal-cell.is-sel { background: #1F7A4C; color: #FFFFFF; box-shadow: none; }
        .bk-time-label { margin: 18px 0 10px; }
        .bk-times { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
        .bk-time {
          min-height: 40px;
          background: #FFFFFF;
          border: 1px solid #D9D5CE;
          border-radius: 4px;
          font: 500 14px 'Geist Mono', ui-monospace, monospace;
          color: #141414;
          cursor: pointer;
          transition: background 140ms, border-color 140ms, color 140ms;
        }
        .bk-time:hover { background: #F6F4F0; }
        .bk-time.is-on { background: #1F7A4C; border-color: #17603B; color: #FFFFFF; }

        /* Footer */
        .bk-foot {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px 20px;
          margin-top: 16px;
          padding: 18px 32px 22px;
          border-top: 1px solid #E6E3DD;
          background: #FAF9F7;
        }
        .bk-summary { margin: 0; font-size: 14.5px; color: #333; }
        .bk-summary .bk-mono { font-size: 11.5px; color: #1F7A4C; margin-right: 8px; }
        .bk-send-error { flex-basis: 100%; order: 3; }
        .bk-actions { display: flex; gap: 10px; }
        .bk-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          min-height: 46px;
          padding: 10px 20px;
          border-radius: 4px;
          font: 600 15px 'Geist', system-ui, sans-serif;
          letter-spacing: -0.01em;
          cursor: pointer;
          transition: background 160ms, transform 120ms;
        }
        .bk-btn:active:not(:disabled) { transform: translateY(1px); }
        .bk-btn-green { background: #1F7A4C; color: #FFFFFF; border: 1px solid #17603B; box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.18); }
        .bk-btn-green:hover:not(:disabled) { background: #17603B; }
        .bk-btn-green:disabled { background: #9DC7AF; border-color: #9DC7AF; cursor: progress; }
        .bk-btn-outline { background: #FFFFFF; color: #141414; border: 1px solid #CFCBC3; }
        .bk-btn-outline:hover { background: #F6F4F0; }

        /* Done */
        .bk-done { display: flex; flex-direction: column; align-items: center; text-align: center; padding: 48px 32px 52px; }
        .bk-done-icon { width: 56px; height: 56px; display: grid; place-items: center; margin-bottom: 18px; background: #EAF6EF; border: 1px solid #A7D7BC; color: #1F7A4C; }
        .bk-done-title { margin: 0 0 8px; font-size: 26px; font-weight: 600; letter-spacing: -0.03em; text-transform: none; }
        .bk-done-text { margin: 0 0 24px; max-width: 46ch; font-size: 15.5px; line-height: 1.6; color: #4D4D4D; }
        .bk-done-text strong { color: #141414; font-weight: 600; }

        @media (max-width: 820px) {
          .bk-backdrop { padding: 0; align-items: stretch; }
          .bk-modal { max-height: 100vh; height: 100%; border: 0; }
          .bk-body { grid-template-columns: 1fr; }
          .bk-col { padding: 20px 18px 4px; }
          .bk-col + .bk-col { border-left: 0; border-top: 1px solid #E6E3DD; }
          .bk-head { padding: 22px 18px 20px; }
          .bk-head-row { padding-right: 48px; }
          .bk-cloud-a { right: 120px; }
          .bk-cloud-b { right: -40px; }
          .bk-field-pair { grid-template-columns: 1fr; gap: 0; }
          .bk-foot { padding: 16px 18px 22px; }
          .bk-actions { width: 100%; }
          .bk-btn { flex: 1; }
        }
      `}</style>
    </div>
  );
}
