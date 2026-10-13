"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const NAV_LINKS = [
  { id: "home",       label: "Home" },
  { id: "gallery",    label: "Gallery" },
  { id: "about",      label: "About" },
  { id: "skills",     label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects",   label: "Projects" },
];

const PHONE = "+91 9600622497";
const PHONE_HREF = "tel:+919600622497";
const EMAIL = "srevarshan9600622@gmail.com";

interface TopNavProps {
  onCommandPaletteOpen: () => void;
}

/** Phone + email, revealed from the "Contact me" button */
function ContactPanel({ onClose }: { onClose: () => void }) {
  const [copied, setCopied] = useState<"" | "phone" | "email">("");
  const copy = async (value: string, which: "phone" | "email") => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(which);
      setTimeout(() => setCopied(""), 1800);
    } catch { /* clipboard blocked — the value stays visible */ }
  };
  return (
    <div className="tn-panel" role="dialog" aria-label="Contact details">
      <p className="tn-panel-kicker">Get in touch</p>
      <div className="tn-row">
        <a className="tn-row-link" href={PHONE_HREF}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" /></svg>
          <span><strong>Call</strong>{PHONE}</span>
        </a>
        <button type="button" className="tn-copy" onClick={() => copy(PHONE, "phone")} aria-label="Copy phone number">
          {copied === "phone" ? "Copied" : "Copy"}
        </button>
      </div>
      <div className="tn-row">
        <a className="tn-row-link" href={`mailto:${EMAIL}`}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2.5" y="4.5" width="19" height="15" rx="2" /><path d="m3 6 9 7 9-7" /></svg>
          <span><strong>Email</strong>{EMAIL}</span>
        </a>
        <button type="button" className="tn-copy" onClick={() => copy(EMAIL, "email")} aria-label="Copy email address">
          {copied === "email" ? "Copied" : "Copy"}
        </button>
      </div>
      <button
        type="button"
        className="tn-panel-more"
        onClick={() => { onClose(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" }); }}
      >
        Or write to me on this page →
      </button>
    </div>
  );
}

export default function TopNav(_props: TopNavProps) {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const contactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
      const ids = [...NAV_LINKS.map((l) => l.id), "contact"];
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        if (el && el.getBoundingClientRect().top <= 120) { setActive(ids[i]); break; }
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the contact panel on outside click or Escape
  useEffect(() => {
    if (!contactOpen) return;
    const onDown = (e: PointerEvent) => {
      if (contactRef.current && !contactRef.current.contains(e.target as Node)) setContactOpen(false);
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setContactOpen(false); };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("pointerdown", onDown); document.removeEventListener("keydown", onKey); };
  }, [contactOpen]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  };

  return (
    <header className={`tn-wrap ${scrolled ? "is-scrolled" : ""}`}>
      <nav className="tn" aria-label="Main navigation">
        <button type="button" className="tn-brand" onClick={() => scrollTo("home")} aria-label="Sre Varshan, go to top">
          <img src="/Portfolio-favi.png" alt="" width={34} height={34} />
          <span>Sre Varshan</span>
        </button>

        <ul className="tn-links">
          {NAV_LINKS.map((l) => (
            <li key={l.id}>
              <button type="button" className={active === l.id ? "is-on" : ""} aria-current={active === l.id ? "true" : undefined} onClick={() => scrollTo(l.id)}>
                {l.label}
              </button>
            </li>
          ))}
          <li><Link href="/services" className="tn-solutions">Solutions</Link></li>
        </ul>

        <div className="tn-contact" ref={contactRef}>
          <button type="button" className="tn-cta" aria-expanded={contactOpen} onClick={() => { setContactOpen((v) => !v); setMenuOpen(false); }}>
            Contact me
          </button>
          {contactOpen && <ContactPanel onClose={() => setContactOpen(false)} />}
        </div>

        <button type="button" className="tn-burger" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} onClick={() => { setMenuOpen((v) => !v); setContactOpen(false); }}>
          <span /><span /><span />
        </button>
      </nav>

      {menuOpen && (
        <div className="tn-menu">
          {NAV_LINKS.map((l) => (
            <button key={l.id} type="button" className={active === l.id ? "is-on" : ""} onClick={() => scrollTo(l.id)}>{l.label}</button>
          ))}
          <button type="button" className={active === "contact" ? "is-on" : ""} onClick={() => scrollTo("contact")}>Contact</button>
          <Link href="/services" className="tn-solutions" onClick={() => setMenuOpen(false)}>Solutions</Link>
          <div className="tn-menu-contact">
            <a href={PHONE_HREF}>Call {PHONE}</a>
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          </div>
        </div>
      )}

      <style>{`
        .tn-wrap {
          position: fixed; left: 0; right: 0; top: 18px; z-index: 1000;
          display: flex; flex-direction: column; align-items: center; gap: 8px;
          padding: 0 16px; pointer-events: none;
          transition: top 300ms cubic-bezier(0.22, 1, 0.36, 1);
          font-family: 'Geist', system-ui, sans-serif;
        }
        .tn-wrap.is-scrolled { top: 10px; }
        .tn {
          pointer-events: auto;
          display: flex; align-items: center; gap: 20px;
          max-width: 100%;
          padding: 8px 8px 8px 12px;
          background: rgba(255, 255, 255, 0.94);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 2px solid #1C202B;
          box-shadow: 4px 4px 0 0 #1C202B;
        }
        .tn-brand {
          display: flex; align-items: center; gap: 10px; flex-shrink: 0;
          background: none; border: 0; padding: 0; cursor: pointer;
          font: 700 16px 'Geist', system-ui, sans-serif; letter-spacing: -0.02em; color: #141414;
        }
        .tn-brand img { width: 34px; height: 34px; border-radius: 50%; border: 2px solid #1C202B; object-fit: cover; }
        .tn-links { list-style: none; display: flex; align-items: center; gap: 2px; }
        .tn-links button, .tn-links a, .tn-menu button, .tn-menu a {
          display: block; padding: 9px 10px; background: none; border: 0; cursor: pointer;
          font-family: 'Silkscreen', 'Geist Mono', monospace; font-size: 11px; letter-spacing: 0.04em; text-transform: uppercase;
          color: #1C202B; text-decoration: none; white-space: nowrap;
          transition: background 140ms, color 140ms;
        }
        .tn-links button:hover, .tn-links a:hover { background: #F1EFEA; color: #1C202B; }
        .tn-links .is-on, .tn-menu .is-on { background: var(--brand); color: #FFFFFF; }
        .tn-links .is-on:hover { background: var(--brand); color: #FFFFFF; }
        .tn-solutions { color: var(--brand) !important; box-shadow: inset 0 0 0 1.5px rgba(226, 45, 109, 0.4); }
        .tn-contact { position: relative; flex-shrink: 0; }
        .tn-cta {
          min-height: 42px; padding: 10px 18px; border-radius: 4px; cursor: pointer;
          background: #1F7A4C; color: #FFFFFF; border: 1px solid #17603B;
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.18);
          font: 600 15px 'Geist', system-ui, sans-serif; letter-spacing: -0.01em;
          transition: background 160ms;
        }
        .tn-cta:hover, .tn-cta[aria-expanded="true"] { background: #17603B; }

        .tn-panel {
          position: absolute; right: -10px; top: calc(100% + 14px);
          width: 330px; padding: 18px;
          background: #FFFFFF; border: 2px solid #1C202B; box-shadow: 5px 5px 0 0 #1C202B;
          animation: tnIn 200ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes tnIn { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: none; } }
        .tn-panel-kicker { margin: 0 0 10px; font-family: 'Geist Mono', monospace; font-size: 11.5px; letter-spacing: 0.14em; text-transform: uppercase; color: #166534; }
        .tn-row { display: flex; align-items: center; gap: 10px; padding: 10px 0; border-top: 1px solid #E6E3DD; }
        .tn-row-link { flex: 1; min-width: 0; display: flex; align-items: center; gap: 12px; color: #141414; text-decoration: none; }
        .tn-row-link svg { flex-shrink: 0; color: #1F7A4C; }
        .tn-row-link span { display: flex; flex-direction: column; min-width: 0; font-size: 14.5px; overflow-wrap: anywhere; }
        .tn-row-link strong { font-size: 12px; font-weight: 600; color: #6E6E6E; }
        .tn-row-link:hover span { text-decoration: underline; text-underline-offset: 3px; }
        .tn-copy {
          flex-shrink: 0; min-height: 34px; padding: 6px 10px; cursor: pointer;
          background: #FFFFFF; color: #141414; border: 1px solid #CFCBC3; border-radius: 4px;
          font: 600 12px 'Geist', system-ui, sans-serif;
        }
        .tn-copy:hover { background: #F6F4F0; }
        .tn-panel-more { display: block; width: 100%; text-align: left; background: none; border-left: 0; border-right: 0; border-bottom: 0; cursor: pointer; font-family: inherit; margin-top: 8px; padding-top: 12px; border-top: 1px solid #E6E3DD; font-size: 13.5px; font-weight: 500; color: #141414; text-decoration: none; }
        .tn-panel-more:hover { color: var(--brand-strong); }

        .tn-burger { display: none; width: 42px; height: 42px; flex-direction: column; align-items: center; justify-content: center; gap: 4px; background: none; border: 0; cursor: pointer; }
        .tn-burger span { width: 18px; height: 2px; background: #1C202B; }
        .tn-menu {
          pointer-events: auto; width: min(420px, 100%);
          display: flex; flex-direction: column; gap: 2px; padding: 10px;
          background: #FFFFFF; border: 2px solid #1C202B; box-shadow: 4px 4px 0 0 #1C202B;
          animation: tnIn 200ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        .tn-menu button, .tn-menu a { text-align: left; padding: 12px 12px; font-size: 12.5px; }
        .tn-menu-contact { display: flex; flex-direction: column; gap: 2px; margin-top: 6px; padding-top: 8px; border-top: 1px solid #E6E3DD; }
        .tn-menu .tn-menu-contact a { font-family: 'Geist', system-ui, sans-serif; font-size: 14px; letter-spacing: 0; text-transform: none; color: #1F7A4C; font-weight: 600; overflow-wrap: anywhere; white-space: normal; }

        @media (max-width: 1180px) {
          .tn { gap: 12px; }
          .tn-links button, .tn-links a { padding: 8px 7px; font-size: 10px; }
        }
        @media (max-width: 980px) {
          .tn-links { display: none; }
          .tn-burger { display: flex; }
          .tn-contact { display: none; }   /* on mobile, phone + email live in the menu */
        }
        @media (max-width: 480px) {
          .tn-brand span { display: none; }
          /* the nav's backdrop-filter makes it the containing block, so anchor to the (centred) nav */
          .tn-contact { position: static; }
          .tn-panel { left: 50%; right: auto; width: calc(100vw - 32px); margin-left: calc(16px - 50vw); }
        }
      `}</style>
    </header>
  );
}
