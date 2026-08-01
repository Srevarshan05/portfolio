"use client";

import { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";

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
  "AI Solutions & Chatbots",
  "Modern Website Development",
  "Business Automation",
  "Custom AI Integration",
  "Smart Billing & POS",
  "AI Strategy & Consulting",
  "Other / General Inquiry",
];

function buildCalendar(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrev = new Date(year, month, 0).getDate();
  const cells: { day: number; month: "prev" | "cur" | "next" }[] = [];

  for (let i = firstDay - 1; i >= 0; i--) {
    cells.push({ day: daysInPrev - i, month: "prev" });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, month: "cur" });
  }
  let next = 1;
  while (cells.length % 7 !== 0) {
    cells.push({ day: next++, month: "next" });
  }
  return cells;
}

/* ─── Services list (left panel) ────────────────────────────────────── */
const SERVICES_LEFT = [
  {
    icon: "/icons/Gen-Ai.png",
    title: "AI-Powered Solutions",
    desc: "Custom AI solutions, chatbots, and automation that solve real problems.",
  },
  {
    icon: "/icons/website.png",
    title: "Modern Web Development",
    desc: "Fast, responsive and scalable websites built for performance.",
  },
  {
    icon: "/icons/automation.png",
    title: "Business Automation",
    desc: "Streamline workflows and save time with intelligent automation.",
  },
  {
    icon: "/icons/Consult.png",
    title: "Consulting & Strategy",
    desc: "From idea to execution — get the right AI strategy for your business.",
  },
];

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

  /* Calendar state */
  const today = new Date();
  const [calYear, setCalYear]   = useState(today.getFullYear());
  const [calMonth, setCalMonth] = useState(today.getMonth());
  const [selDay, setSelDay]     = useState(today.getDate());
  const [selTime, setSelTime]   = useState("02:00 PM");

  const cells = buildCalendar(calYear, calMonth);

  useEffect(() => {
    // If ?book=1 is in the URL (coming from Services page), open immediately
    if (typeof window !== "undefined" && new URLSearchParams(window.location.search).get("book") === "1") {
      setVisible(true);
      // Clean the URL param without reload
      const url = new URL(window.location.href);
      url.searchParams.delete("book");
      window.history.replaceState({}, "", url.toString());
      return;
    }
    if (typeof sessionStorage !== "undefined" && sessionStorage.getItem("sv-modal-v20")) return;
    const t = setTimeout(() => setVisible(true), 3000);
    return () => clearTimeout(t);
  }, []);

  const close = () => {
    setVisible(false);
    if (typeof sessionStorage !== "undefined") sessionStorage.setItem("sv-modal-v20", "1");
  };

  const selectedDateStr = new Date(calYear, calMonth, selDay).toLocaleDateString("en-IN", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });

  const handleConfirm = async () => {
    const finalName  = name.trim()  || "Guest Client";
    const finalEmail = email.trim() || "srevarshan9600622@gmail.com";
    const finalPhone = phone.trim() || "Not provided";
    const finalTopic = topic || "General Inquiry";
    const finalNote  = note.trim()  || "No additional notes";

    setSending(true);

    const mailSubject = `🔥 NEW DISCOVERY CALL BOOKING: ${finalName}`;

    // Service 1: FormSubmit API (styled table)
    try {
      await fetch("https://formsubmit.co/ajax/srevarshan9600622@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
          _subject: mailSubject,
          _template: "table",
          _captcha: "false",
          "Client Name": finalName,
          "Email Address": finalEmail,
          "Phone Number": finalPhone,
          "Topic": finalTopic,
          "Project Notes": finalNote,
          "Scheduled Date": selectedDateStr,
          "Scheduled Time Slot": selTime,
        }),
      });
    } catch (e) { console.warn("FormSubmit dispatch:", e); }

    // Service 2: API route
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: finalName, email: finalEmail, phone: finalPhone,
          date: selectedDateStr, time: selTime,
          subject: mailSubject,
          topic: finalTopic, note: finalNote,
        }),
      });
    } catch (e) { console.warn("API route dispatch:", e); }

    // Service 3: EmailJS
    try {
      const svcId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_portfolio";
      const tplId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_booking";
      const pubKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "public_key";
      await emailjs.send(svcId, tplId, {
        to_email: "srevarshan9600622@gmail.com",
        from_name: finalName, from_email: finalEmail,
        phone_number: finalPhone, booking_date: selectedDateStr, booking_time: selTime,
      }, pubKey);
    } catch (e) { console.log("EmailJS dispatch:", e); }

    // Save locally
    try {
      if (typeof localStorage !== "undefined") {
        const prev = JSON.parse(localStorage.getItem("sv-bookings") || "[]");
        prev.push({ name: finalName, email: finalEmail, phone: finalPhone, date: selectedDateStr, time: selTime, timestamp: new Date().toISOString() });
        localStorage.setItem("sv-bookings", JSON.stringify(prev));
      }
    } catch (e) {}

    setSending(false);
    setScreen("confirmed");
  };

  if (!visible) return null;

  const prevMonth = () => {
    if (calMonth === 0) { setCalYear(y => y - 1); setCalMonth(11); }
    else setCalMonth(m => m - 1);
    setSelDay(0);
  };
  const nextMonth = () => {
    if (calMonth === 11) { setCalYear(y => y + 1); setCalMonth(0); }
    else setCalMonth(m => m + 1);
    setSelDay(0);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bangers&family=Open+Sans:wght@400;600;700;800&display=swap');

        @keyframes sv-fade-in   { from { opacity:0 } to { opacity:1 } }
        @keyframes sv-slide-up  { from { opacity:0; transform:translateY(24px) scale(0.97) } to { opacity:1; transform:none } }
        @keyframes sv-pop-check { 0%{transform:scale(0.3);opacity:0} 60%{transform:scale(1.2)} 100%{transform:scale(1);opacity:1} }
        @keyframes sv-confetti  { 0%{opacity:1;transform:translateY(0) rotate(0deg)} 100%{opacity:0;transform:translateY(100px) rotate(720deg)} }
        @keyframes sv-spin      { to { transform:rotate(360deg) } }

        /* ── Backdrop ─────────────────────────────────────────────── */
        .bk-backdrop {
          position: fixed; inset: 0; z-index: 9999;
          background: rgba(10,12,20,0.75);
          backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
          display: flex; align-items: center; justify-content: center;
          padding: 12px;
          animation: sv-fade-in 0.25s ease;
        }

        /* ── Modal Shell ──────────────────────────────────────────── */
        .bk-modal {
          position: relative;
          width: 100%; max-width: 1060px;
          max-height: 92vh;
          background: #ffffff;
          border-radius: 24px;
          box-shadow: 0 40px 100px rgba(0,0,0,0.45);
          overflow: hidden;
          display: flex;
          animation: sv-slide-up 0.35s cubic-bezier(0.22,1,0.36,1);
        }

        /* ── Close Button ─────────────────────────────────────────── */
        .bk-close {
          position: absolute; top: 18px; right: 18px; z-index: 20;
          width: 36px; height: 36px; border-radius: 50%;
          background: #f3f4f6; border: none; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          font-size: 18px; color: #111827; font-weight: 900;
          transition: background 150ms, transform 150ms;
          box-shadow: 0 2px 8px rgba(0,0,0,0.12);
        }
        .bk-close:hover { background: #E22D6D; color: #fff; transform: rotate(90deg); }

        /* ── Left Panel ───────────────────────────────────────────── */
        .bk-left {
          width: 310px; flex-shrink: 0;
          background: #f8f9fb;
          border-right: 1.5px solid #f0f0f0;
          display: flex; flex-direction: column;
          overflow-y: auto;
        }

        .bk-profile-photo {
          width: 100%;
          background: #ffffff;
          display: flex; align-items: center; justify-content: center;
          overflow: hidden;
          min-height: 200px;
          position: relative;
        }
        .bk-profile-photo img {
          width: 100%; height: 240px;
          object-fit: cover; object-position: top center;
          display: block;
        }

        .bk-bio {
          padding: 20px 22px 16px;
          border-bottom: 1px solid #ececec;
        }
        .bk-hey {
          font-family: 'Open Sans', sans-serif;
          font-size: 13px; color: #6b7280; margin-bottom: 4px; display: block;
        }
        .bk-name {
          font-family: 'Bangers', cursive;
          font-size: 26px; letter-spacing: 1px; color: #111827;
          margin: 0 0 4px; text-transform: uppercase;
        }
        .bk-title-tag {
          font-family: 'Open Sans', sans-serif;
          font-size: 12.5px; font-weight: 700; color: #E22D6D;
          margin: 0;
        }

        .bk-services-list {
          padding: 16px 22px;
          display: flex; flex-direction: column; gap: 12px;
          flex: 1;
        }
        .bk-svc-row {
          display: flex; align-items: flex-start; gap: 12px;
        }
        .bk-svc-icon {
          width: 36px; height: 36px; border-radius: 10px;
          background: #fff; border: 1.5px solid #f0f0f0;
          display: flex; align-items: center; justify-content: center;
          font-size: 17px; flex-shrink: 0;
          box-shadow: 0 2px 6px rgba(0,0,0,0.07);
        }
        .bk-svc-title {
          font-family: 'Open Sans', sans-serif;
          font-size: 13px; font-weight: 700; color: #111827;
          margin: 0 0 2px;
        }
        .bk-svc-desc {
          font-family: 'Open Sans', sans-serif;
          font-size: 11.5px; color: #6b7280; margin: 0; line-height: 1.4;
        }

        .bk-bottom-banner {
          margin: 16px 22px 22px;
          background: #fff0f4; border: 1.5px solid #ffd6e4;
          border-radius: 14px; padding: 14px 16px;
          display: flex; align-items: center; gap: 12px;
        }
        .bk-banner-icon { font-size: 24px; flex-shrink: 0; }
        .bk-banner-text {
          font-family: 'Open Sans', sans-serif;
          font-size: 12px; color: #374151; line-height: 1.5; margin: 0;
        }
        .bk-banner-text strong { color: #E22D6D; display: block; }

        /* ── Right Panel ──────────────────────────────────────────── */
        .bk-right {
          flex: 1;
          overflow-y: auto; overflow-x: hidden;
          display: flex; flex-direction: column;
          scrollbar-width: thin; scrollbar-color: #e5e7eb transparent;
        }
        .bk-right::-webkit-scrollbar { width: 4px; }
        .bk-right::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 4px; }

        /* ── Right Header ─────────────────────────────────────────── */
        .bk-right-header {
          padding: 28px 32px 20px;
          border-bottom: 1px solid #f0f0f0;
          display: flex; align-items: center; gap: 18px;
        }
        .bk-header-icon {
          width: 54px; height: 54px; border-radius: 16px;
          background: #fff0f4; border: 2px solid #ffd6e4;
          display: flex; align-items: center; justify-content: center;
          font-size: 26px; flex-shrink: 0;
        }
        .bk-header-title {
          font-family: 'Bangers', cursive;
          font-size: 32px; letter-spacing: 1.5px; color: #111827;
          margin: 0; text-transform: uppercase; line-height: 1;
        }
        .bk-header-sub {
          font-family: 'Open Sans', sans-serif;
          font-size: 13px; color: #6b7280; margin: 4px 0 0;
        }

        /* ── Right Body ───────────────────────────────────────────── */
        .bk-right-body {
          padding: 24px 32px 20px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 28px;
          flex: 1;
        }

        /* ── Section Headers ─────────────────────────────────────── */
        .bk-section-title {
          font-family: 'Open Sans', sans-serif;
          font-size: 11px; font-weight: 800; text-transform: uppercase;
          letter-spacing: 1.5px; color: #E22D6D;
          border-left: 3px solid #E22D6D; padding-left: 10px;
          margin: 0 0 16px;
        }

        /* ── Form Fields ─────────────────────────────────────────── */
        .bk-form-col { display: flex; flex-direction: column; gap: 14px; }
        .bk-field { display: flex; flex-direction: column; gap: 5px; }
        .bk-label {
          font-family: 'Open Sans', sans-serif;
          font-size: 12.5px; font-weight: 700; color: #374151;
        }
        .bk-input-wrap {
          position: relative;
        }
        .bk-input-icon {
          position: absolute; left: 13px; top: 50%; transform: translateY(-50%);
          font-size: 14px; color: #9ca3af; pointer-events: none;
        }
        .bk-input {
          width: 100%; box-sizing: border-box;
          background: #f9fafb; border: 1.5px solid #e5e7eb;
          border-radius: 10px; padding: 10px 14px 10px 38px;
          font-family: 'Open Sans', sans-serif; font-size: 13.5px; color: #111827;
          outline: none; transition: border-color 150ms, box-shadow 150ms;
        }
        .bk-input::placeholder { color: #9ca3af; }
        .bk-input:focus { border-color: #E22D6D; box-shadow: 0 0 0 3px rgba(226,45,109,0.1); background: #fff; }
        .bk-select {
          width: 100%; box-sizing: border-box;
          background: #f9fafb; border: 1.5px solid #e5e7eb;
          border-radius: 10px; padding: 10px 14px 10px 38px;
          font-family: 'Open Sans', sans-serif; font-size: 13.5px; color: #111827;
          outline: none; cursor: pointer; appearance: none;
          transition: border-color 150ms;
        }
        .bk-select:focus { border-color: #E22D6D; }

        .bk-textarea-wrap { position: relative; }
        .bk-textarea-icon {
          position: absolute; left: 13px; top: 12px;
          font-size: 14px; color: #9ca3af;
        }
        .bk-textarea {
          width: 100%; box-sizing: border-box; resize: none;
          background: #f9fafb; border: 1.5px solid #e5e7eb;
          border-radius: 10px; padding: 10px 14px 28px 38px;
          font-family: 'Open Sans', sans-serif; font-size: 13.5px; color: #111827;
          outline: none; min-height: 90px;
          transition: border-color 150ms;
        }
        .bk-textarea::placeholder { color: #9ca3af; }
        .bk-textarea:focus { border-color: #E22D6D; background: #fff; }
        .bk-char-count {
          position: absolute; bottom: 8px; right: 12px;
          font-size: 11px; color: #9ca3af;
          font-family: 'Open Sans', sans-serif;
        }

        .bk-privacy-box {
          background: #f0fdf4; border: 1.5px solid #bbf7d0;
          border-radius: 12px; padding: 12px 14px;
          display: flex; align-items: flex-start; gap: 10px;
          margin-top: 2px;
        }
        .bk-privacy-icon { font-size: 18px; flex-shrink: 0; margin-top: 1px; }
        .bk-privacy-text {
          font-family: 'Open Sans', sans-serif;
          font-size: 12px; color: #374151; line-height: 1.5; margin: 0;
        }
        .bk-privacy-text strong { color: #059669; display: block; }

        /* ── Calendar ──────────────────────────────────────────────── */
        .bk-cal-col { display: flex; flex-direction: column; gap: 0; }
        .bk-cal-header {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 14px;
        }
        .bk-cal-nav-btn {
          width: 28px; height: 28px; border-radius: 8px;
          background: #f3f4f6; border: 1px solid #e5e7eb;
          cursor: pointer; display: flex; align-items: center; justify-content: center;
          font-size: 13px; color: #374151; transition: all 130ms;
        }
        .bk-cal-nav-btn:hover { background: #E22D6D; color: #fff; border-color: #E22D6D; }
        .bk-cal-month {
          font-family: 'Open Sans', sans-serif;
          font-size: 14px; font-weight: 700; color: #111827;
        }
        .bk-cal-grid {
          display: grid; grid-template-columns: repeat(7, 1fr);
          gap: 2px;
        }
        .bk-cal-day-hdr {
          font-family: 'Open Sans', sans-serif;
          font-size: 10px; font-weight: 700; color: #9ca3af;
          text-align: center; padding: 4px 0 6px;
          text-transform: uppercase;
        }
        .bk-cal-cell {
          font-family: 'Open Sans', sans-serif;
          font-size: 13px; color: #374151;
          text-align: center; padding: 7px 4px;
          border-radius: 8px; cursor: pointer;
          transition: all 130ms;
        }
        .bk-cal-cell.other-month { color: #d1d5db; cursor: default; }
        .bk-cal-cell.today { color: #E22D6D; font-weight: 700; }
        .bk-cal-cell:not(.other-month):not(.selected):hover {
          background: #fff0f4; color: #E22D6D;
        }
        .bk-cal-cell.selected {
          background: #E22D6D; color: #fff; font-weight: 700;
          box-shadow: 0 2px 10px rgba(226,45,109,0.4);
        }

        /* ── Time Slots ────────────────────────────────────────────── */
        .bk-time-section { margin-top: 18px; }
        .bk-time-label {
          font-family: 'Open Sans', sans-serif;
          font-size: 12px; font-weight: 700; color: #374151; margin-bottom: 10px;
        }
        .bk-time-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px;
        }
        .bk-time-btn {
          background: #f9fafb; border: 1.5px solid #e5e7eb;
          border-radius: 10px; padding: 8px 4px;
          font-family: 'Open Sans', sans-serif; font-size: 12px; font-weight: 700;
          color: #374151; cursor: pointer; text-align: center;
          transition: all 130ms;
        }
        .bk-time-btn:hover { background: #fff0f4; border-color: #E22D6D; color: #E22D6D; }
        .bk-time-btn.selected {
          background: #E22D6D; border-color: #E22D6D; color: #fff;
          box-shadow: 0 2px 10px rgba(226,45,109,0.4);
        }

        /* ── Bottom Action Bar ─────────────────────────────────────── */
        .bk-footer {
          padding: 18px 32px;
          border-top: 1px solid #f0f0f0;
          display: flex; align-items: center; justify-content: space-between;
          gap: 16px; background: #fff;
        }
        .bk-footer-hint {
          display: flex; align-items: center; gap: 12px;
        }
        .bk-hint-icon {
          width: 40px; height: 40px; border-radius: 12px;
          background: #fff0f4; border: 1.5px solid #ffd6e4;
          display: flex; align-items: center; justify-content: center;
          font-size: 20px; flex-shrink: 0;
        }
        .bk-hint-text {
          font-family: 'Open Sans', sans-serif;
          font-size: 12.5px; color: #6b7280; margin: 0; line-height: 1.5;
        }
        .bk-hint-text strong { color: #111827; display: block; }
        .bk-confirm-btn {
          background: linear-gradient(135deg, #E22D6D 0%, #c0185a 100%);
          border: none; border-radius: 14px;
          padding: 14px 30px;
          font-family: 'Bangers', cursive; font-size: 19px;
          letter-spacing: 1.5px; text-transform: uppercase; color: #ffffff;
          cursor: pointer;
          display: flex; align-items: center; gap: 12px;
          box-shadow: 0 6px 24px rgba(226,45,109,0.45);
          transition: transform 150ms, box-shadow 150ms;
          white-space: nowrap;
        }
        .bk-confirm-btn:hover { transform: translateY(-2px); box-shadow: 0 10px 32px rgba(226,45,109,0.6); }
        .bk-confirm-btn:active { transform: none; }
        .bk-confirm-btn:disabled { opacity: 0.7; cursor: not-allowed; transform: none; }
        .bk-btn-icon { font-size: 20px; }
        .bk-spinner {
          width: 16px; height: 16px;
          border: 2.5px solid rgba(255,255,255,0.5);
          border-top-color: #fff; border-radius: 50%;
          animation: sv-spin 0.6s linear infinite;
        }

        /* ── Confirmed Screen ──────────────────────────────────────── */
        .bk-confirmed-wrap {
          flex: 1; display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          padding: 48px 32px; text-align: center;
          position: relative; gap: 16px;
          animation: sv-slide-up 0.4s ease;
        }
        .bk-confetti-row {
          display: flex; gap: 10px; position: absolute; top: 24px; pointer-events: none;
        }
        .bk-confetti-dot {
          width: 10px; height: 10px; border-radius: 50%;
          animation: sv-confetti 1.2s ease-out forwards;
        }
        .bk-check-circle {
          width: 84px; height: 84px; border-radius: 50%;
          background: linear-gradient(135deg, #059669 0%, #047857 100%);
          border: 3px solid #fff;
          box-shadow: 0 0 40px rgba(5,150,105,0.5);
          display: flex; align-items: center; justify-content: center;
          font-size: 44px; color: #fff;
          animation: sv-pop-check 0.5s cubic-bezier(0.22,1,0.36,1);
        }
        .bk-confirmed-title {
          font-family: 'Bangers', cursive;
          font-size: 38px; letter-spacing: 1.5px; color: #111827; margin: 0;
        }
        .bk-confirmed-sub {
          font-family: 'Open Sans', sans-serif;
          font-size: 14.5px; color: #6b7280;
          max-width: 360px; line-height: 1.6; margin: 0;
        }
        .bk-confirmed-sub span { color: #E22D6D; font-weight: 700; }
        .bk-close-btn {
          background: linear-gradient(135deg, #E22D6D 0%, #c0185a 100%);
          border: none; border-radius: 12px;
          padding: 12px 32px;
          font-family: 'Bangers', cursive; font-size: 18px;
          letter-spacing: 1px; color: #fff; cursor: pointer;
          box-shadow: 0 6px 20px rgba(226,45,109,0.4);
          transition: all 150ms;
        }
        .bk-close-btn:hover { transform: translateY(-2px); box-shadow: 0 10px 28px rgba(226,45,109,0.55); }

        /* ── RESPONSIVE ────────────────────────────────────────────── */
        @media (max-width: 860px) {
          .bk-modal { flex-direction: column; max-height: 96vh; }
          .bk-left { width: 100%; flex-direction: row; align-items: center; flex-shrink: 0; border-right: none; border-bottom: 1.5px solid #f0f0f0; }
          .bk-profile-photo { width: 120px; height: 120px; min-height: unset; flex-shrink: 0; border-radius: 0; overflow: hidden; }
          .bk-profile-photo img { height: 120px; }
          .bk-bio { border-bottom: none; border-right: 1px solid #ececec; padding: 12px 16px; }
          .bk-services-list { display: none; }
          .bk-bottom-banner { display: none; }
          .bk-right-body { grid-template-columns: 1fr; gap: 20px; }
          .bk-right-header { padding: 18px 20px 14px; }
          .bk-right-body { padding: 16px 20px; }
          .bk-footer { padding: 14px 20px; }
        }

        @media (max-width: 600px) {
          .bk-modal { border-radius: 20px; }
          .bk-left { display: block; }
          .bk-profile-photo { width: 100%; height: 180px; }
          .bk-profile-photo img { height: 180px; width: 100%; object-fit: cover; object-position: top; }
          .bk-bio { border-right: none; border-bottom: 1px solid #ececec; }
          .bk-services-list { display: flex; padding: 14px 16px; gap: 10px; }
          .bk-bottom-banner { margin: 0 16px 16px; }
          .bk-right-body { grid-template-columns: 1fr; gap: 16px; padding: 14px 16px; }
          .bk-right-header { padding: 16px 16px 12px; }
          .bk-header-title { font-size: 24px; }
          .bk-footer { flex-direction: column; align-items: stretch; padding: 14px 16px; }
          .bk-confirm-btn { justify-content: center; font-size: 17px; }
          .bk-time-grid { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>

      <div className="bk-backdrop" onClick={(e) => { if (e.target === e.currentTarget) close(); }}>
        <div className="bk-modal">

          {/* ── Close Button ──────────────────────────── */}
          <button className="bk-close" onClick={close} aria-label="Close">✕</button>

          {/* ════════════════════════════════════════════
              LEFT PANEL
          ════════════════════════════════════════════ */}
          <div className="bk-left">
            {/* Profile Photo */}
            <div className="bk-profile-photo">
              <img src="/icons/new-model-card.png" alt="Sre Varshan" />
            </div>

            {/* Bio */}
            <div className="bk-bio">
              <span className="bk-hey">Hey there! 👋</span>
              <h2 className="bk-name">I&apos;M SRE VARSHAN</h2>
              <p className="bk-title-tag">Applied AI &amp; GenAI Engineer</p>
            </div>

            {/* Services List */}
            <div className="bk-services-list">
              {SERVICES_LEFT.map((s) => (
                <div className="bk-svc-row" key={s.title}>
                  <div className="bk-svc-icon">
                    <img src={s.icon} alt={s.title} width={24} height={24} style={{objectFit:"contain"}} />
                  </div>
                  <div>
                    <p className="bk-svc-title">{s.title}</p>
                    <p className="bk-svc-desc">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ════════════════════════════════════════════
              RIGHT PANEL
          ════════════════════════════════════════════ */}
          <div className="bk-right">

            {screen === "booking" && (
              <>
                {/* Header */}
                <div className="bk-right-header">
                  <div className="bk-header-icon">
                    <img src="/icons/mobile.png" alt="Book a Call" width={32} height={32} style={{objectFit:"contain"}} />
                  </div>
                  <div>
                    <h3 className="bk-header-title">BOOK A CALL</h3>
                    <p className="bk-header-sub">Let&apos;s discuss your project and explore how I can help you.</p>
                  </div>
                </div>

                {/* Body Grid */}
                <div className="bk-right-body">

                  {/* Left Col — Your Details */}
                  <div className="bk-form-col">
                    <p className="bk-section-title">YOUR DETAILS</p>

                    <div className="bk-field">
                      <label className="bk-label">Your Name *</label>
                      <div className="bk-input-wrap">
                        <span className="bk-input-icon">👤</span>
                        <input className="bk-input" placeholder="Enter your name" value={name} onChange={e => setName(e.target.value)} />
                      </div>
                    </div>

                    <div className="bk-field">
                      <label className="bk-label">Email Address *</label>
                      <div className="bk-input-wrap">
                        <span className="bk-input-icon">✉️</span>
                        <input className="bk-input" type="email" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} />
                      </div>
                    </div>

                    <div className="bk-field">
                      <label className="bk-label">Phone Number *</label>
                      <div className="bk-input-wrap">
                        <span className="bk-input-icon">📞</span>
                        <input className="bk-input" placeholder="Enter your phone number" value={phone} onChange={e => setPhone(e.target.value)} />
                      </div>
                    </div>

                    <div className="bk-field">
                      <label className="bk-label">What would you like to discuss?</label>
                      <div className="bk-input-wrap">
                        <span className="bk-input-icon">💬</span>
                        <select className="bk-select" value={topic} onChange={e => setTopic(e.target.value)}>
                          <option value="">Select a topic</option>
                          {TOPICS.map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                      </div>
                    </div>

                    <div className="bk-field">
                      <label className="bk-label">Tell me more about your project (optional)</label>
                      <div className="bk-textarea-wrap">
                        <span className="bk-textarea-icon">✏️</span>
                        <textarea
                          className="bk-textarea"
                          placeholder="Briefly describe your project or idea..."
                          maxLength={300}
                          value={note}
                          onChange={e => setNote(e.target.value)}
                        />
                        <span className="bk-char-count">{note.length}/300</span>
                      </div>
                    </div>


                  </div>

                  {/* Right Col — Calendar & Time */}
                  <div className="bk-cal-col">
                    <p className="bk-section-title">PICK A DATE &amp; TIME</p>

                    {/* Calendar */}
                    <div className="bk-cal-header">
                      <button className="bk-cal-nav-btn" onClick={prevMonth}>‹</button>
                      <span className="bk-cal-month">{MONTHS[calMonth]} {calYear}</span>
                      <button className="bk-cal-nav-btn" onClick={nextMonth}>›</button>
                    </div>

                    <div className="bk-cal-grid">
                      {DAYS_SHORT.map(d => (
                        <div className="bk-cal-day-hdr" key={d}>{d}</div>
                      ))}
                      {cells.map((c, i) => {
                        const isOther   = c.month !== "cur";
                        const isToday   = c.month === "cur" && c.day === today.getDate() && calMonth === today.getMonth() && calYear === today.getFullYear();
                        const isSel     = c.month === "cur" && c.day === selDay;
                        let cls = "bk-cal-cell";
                        if (isOther) cls += " other-month";
                        else if (isSel) cls += " selected";
                        else if (isToday) cls += " today";
                        return (
                          <div
                            key={i}
                            className={cls}
                            onClick={() => { if (!isOther) setSelDay(c.day); }}
                          >
                            {c.day}
                          </div>
                        );
                      })}
                    </div>

                    {/* Time Slots */}
                    <div className="bk-time-section">
                      <p className="bk-time-label">Available Time (IST)</p>
                      <div className="bk-time-grid">
                        {TIME_SLOTS.map(t => (
                          <button
                            key={t}
                            className={`bk-time-btn${selTime === t ? " selected" : ""}`}
                            onClick={() => setSelTime(t)}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                </div>

                {/* Footer */}
                <div className="bk-footer">
                  <div className="bk-footer-hint">
                    <div className="bk-hint-icon">🎧</div>
                    <p className="bk-hint-text">
                      <strong>Not sure about the requirement?</strong>
                      Book a free discovery call and lets talk!
                    </p>
                  </div>
                  <button className="bk-confirm-btn" onClick={handleConfirm} disabled={sending}>
                    {sending ? <><div className="bk-spinner" /><span>Booking...</span></> : <span>CONFIRM BOOKING →</span>}
                  </button>
                </div>
              </>
            )}

            {/* ── Confirmed Screen ──────────────────── */}
            {screen === "confirmed" && (
              <div className="bk-confirmed-wrap">
                <div className="bk-confetti-row">
                  {["#E22D6D","#FFB020","#2DC8E2","#059669","#8E2DE2","#FF7043","#E22D6D","#FFB020"].map((c, i) => (
                    <span key={i} className="bk-confetti-dot" style={{ background: c, animationDelay: `${i * 90}ms` }} />
                  ))}
                </div>
                <div className="bk-check-circle">✓</div>
                <h3 className="bk-confirmed-title">SLOT BOOKED! 🎉</h3>
                <p className="bk-confirmed-sub">
                  Thanks <span>{name || "there"}</span>! Your call is locked in for{" "}
                  <span>{selectedDateStr} at {selTime}</span>.
                  An email notification has been sent to <span>srevarshan9600622@gmail.com</span>!
                </p>
                <button className="bk-close-btn" onClick={close}>CLOSE ✕</button>
              </div>
            )}
          </div>

        </div>
      </div>
    </>
  );
}
