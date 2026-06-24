"use client";

import { useEffect, useState } from "react";

const NAV_LINKS = [
  { id: "home",         label: "Home" },
  { id: "gallery",      label: "Gallery" },
  { id: "about",        label: "About" },
  { id: "skills",       label: "Skills" },
  { id: "experience",   label: "Experience" },
  { id: "projects",     label: "Projects" },
  { id: "achievements", label: "Achievements" },
  { id: "contact",      label: "Contact" },
];

interface TopNavProps {
  onCommandPaletteOpen: () => void;
}

export default function TopNav({ onCommandPaletteOpen }: TopNavProps) {
  const [active, setActive]       = useState("home");
  const [scrolled, setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hovered, setHovered]     = useState<string | null>(null);
  const [isMobile, setIsMobile]   = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 860);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
      const ids = NAV_LINKS.map((l) => l.id);
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActive(ids[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMobileOpen(false);
  };

  /* ── Dynamic Island Nav Style ── */
  const containerStyle: React.CSSProperties = {
    position: "fixed",
    top: scrolled ? "12px" : "20px",
    left: "50%",
    transform: "translateX(-50%)",
    width: isMobile
      ? (mobileOpen ? "calc(100% - 32px)" : "142px")
      : "auto",
    maxWidth: isMobile ? (mobileOpen ? "480px" : "142px") : "calc(100% - 32px)",
    height: isMobile
      ? "auto"
      : (scrolled ? "50px" : "58px"),
    background: "rgba(20, 23, 31, 0.94)", // deep rich charcoal tetris theme base
    backdropFilter: "blur(20px) saturate(180%)",
    WebkitBackdropFilter: "blur(20px) saturate(180%)",
    border: "2px solid rgba(255, 255, 255, 0.12)",
    borderRadius: isMobile && mobileOpen ? "24px" : "9999px",
    boxShadow: scrolled
      ? "0 12px 32px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.05)"
      : "0 8px 24px rgba(0,0,0,0.2), 0 0 0 1px rgba(255,255,255,0.05)",
    zIndex: 1000,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: isMobile && mobileOpen
      ? "16px 20px"
      : (scrolled ? "0 24px" : "0 32px"),
    transition: "all 400ms cubic-bezier(0.22, 1, 0.36, 1)",
    overflow: "hidden",
  };

  return (
    <header style={containerStyle} role="banner">
      {/* Top Row: Brand, Desktop Nav Links & Actions / Mobile Hamburger */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: isMobile ? "0" : "40px",
          width: "100%",
          height: isMobile ? "44px" : "100%",
          transition: "height 300ms",
        }}
      >
        {/* Logo Button */}
        <button
          onClick={() => { scrollTo("home"); setMobileOpen(false); }}
          id="nav-logo"
          aria-label="Go to home"
          style={{
            display:        "flex",
            alignItems:     "center",
            gap:            "10px",
            background:     "none",
            border:         "none",
            cursor:         "pointer",
            padding:        0,
            textDecoration: "none",
            flexShrink:     0,
          }}
        >
          {/* Tetris-clip mark */}
          <div
            aria-hidden="true"
            style={{
              width:           "32px",
              height:          "32px",
              background:      "linear-gradient(135deg, #ff512f, #dd2476)",
              clipPath:        "polygon(calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 8px), 0 0)",
              display:         "flex",
              alignItems:      "center",
              justifyContent:  "center",
              color:           "white",
              fontFamily:      "'Bangers', cursive",
              fontSize:        "14px",
              letterSpacing:   "0",
              flexShrink:      0,
            }}
          >
            SV
          </div>

          {/* Name & Title (hidden on compact mobile mode) */}
          {(!isMobile || mobileOpen) && (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", lineHeight: 1.1, gap: "1px" }}>
              <span style={{ fontFamily: "'Bangers', cursive", fontSize: "16px", letterSpacing: "1.5px", color: "white", textTransform: "uppercase" }}>
                Sre Varshan
              </span>
              <span style={{ fontFamily: "'Open Sans', sans-serif", fontSize: "9px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", color: "var(--brand)" }}>
                AI / ML Engineer
              </span>
            </div>
          )}
        </button>

        {/* Desktop Navigation Links */}
        {!isMobile && (
          <nav
            aria-label="Main navigation"
            style={{
              display:        "flex",
              flexDirection:  "row",
              alignItems:     "center",
              gap:            "12px",
              listStyle:      "none",
            }}
          >
            {NAV_LINKS.map((link) => {
              const isActive  = active  === link.id;
              const isHovered = hovered === link.id;
              return (
                <button
                  key={link.id}
                  id={`nav-${link.id}`}
                  onClick={() => scrollTo(link.id)}
                  onMouseEnter={() => setHovered(link.id)}
                  onMouseLeave={() => setHovered(null)}
                  aria-current={isActive ? "page" : undefined}
                  style={{
                    fontFamily:      "'Open Sans', sans-serif",
                    fontSize:        "11px",
                    fontWeight:      700,
                    textTransform:   "uppercase",
                    letterSpacing:   "0.8px",
                    color:           isActive ? "#FFFFFF" : isHovered ? "#FFFFFF" : "rgba(255,255,255,0.7)",
                    background:      isActive ? "var(--brand)" : isHovered ? "rgba(255,255,255,0.08)" : "transparent",
                    border:          "none",
                    height:          "32px",
                    display:         "inline-flex",
                    alignItems:      "center",
                    justifyContent:  "center",
                    padding:         "0 12px",
                    borderRadius:    "9999px",
                    cursor:          "pointer",
                    transition:      "all 150ms",
                    whiteSpace:      "nowrap",
                    boxSizing:       "border-box",
                  }}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>
        )}

        {/* Actions Row */}
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "12px", flexShrink: 0 }}>
          {!isMobile && (
            <>
              {/* Cmd+K Search */}
              <button
                onClick={onCommandPaletteOpen}
                aria-label="Open command palette (Ctrl+K)"
                id="nav-cmd"
                style={{
                  display:      "inline-flex",
                  alignItems:   "center",
                  justifyContent: "center",
                  height:       "32px",
                  gap:          "6px",
                  fontFamily:   "'Open Sans', sans-serif",
                  fontSize:     "11px",
                  fontWeight:   700,
                  color:        "rgba(255,255,255,0.8)",
                  background:   "rgba(255,255,255,0.08)",
                  border:       "1px solid rgba(255,255,255,0.15)",
                  borderRadius: "9999px",
                  padding:      "0 12px",
                  cursor:       "pointer",
                  transition:   "all 150ms",
                  whiteSpace:   "nowrap",
                  boxSizing:    "border-box",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.15)";
                  (e.currentTarget as HTMLElement).style.color      = "#FFFFFF";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)";
                  (e.currentTarget as HTMLElement).style.color      = "rgba(255,255,255,0.8)";
                }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="M21 21l-4.35-4.35"/>
                </svg>
                Search
                <kbd style={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "1px 5px",
                  fontFamily: "'Open Sans', sans-serif",
                  fontSize: "9px",
                  fontWeight: 700,
                  background: "rgba(255,255,255,0.12)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: "3px",
                  color: "rgba(255,255,255,0.7)"
                }}>
                  ⌘K
                </kbd>
              </button>

              {/* Resume CTA — fully rounded pill style */}
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                id="nav-resume"
                style={{
                  display:        "inline-flex",
                  alignItems:     "center",
                  justifyContent: "center",
                  height:         "32px",
                  gap:            "6px",
                  fontFamily:     "'Open Sans', sans-serif",
                  fontWeight:     700,
                  fontSize:       "11px",
                  textTransform:  "uppercase",
                  letterSpacing:  "0.8px",
                  color:          "white",
                  background:     "linear-gradient(135deg, #ff512f, #dd2476)",
                  border:         "0",
                  padding:        "0 16px",
                  borderRadius:   "9999px",
                  cursor:         "pointer",
                  textDecoration: "none",
                  transition:     "transform 80ms ease-out, filter 120ms",
                  boxShadow:      "0 4px 12px rgba(226, 45, 109, 0.25)",
                  boxSizing:      "border-box",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.filter = "brightness(1.15)")}
                onMouseLeave={(e) => (e.currentTarget.style.filter = "none")}
              >
                <img src="/icons/cv.png" alt="" style={{ width: "12px", height: "12px", objectFit: "contain" }} />
                Resume
              </a>
            </>
          )}

          {/* Hamburger (only shown on mobile) */}
          {isMobile && (
            <button
              id="nav-hamburger"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              style={{
                display:        "flex",
                flexDirection:  "column",
                gap:            "4px",
                background:     "none",
                border:         "none",
                cursor:         "pointer",
                padding:        "8px",
                justifyContent: "center",
                alignItems:     "center",
              }}
            >
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  style={{
                    display:    "block",
                    width:      "18px",
                    height:     "2px",
                    background: "white",
                    borderRadius: "1px",
                    transition: "transform 300ms, opacity 300ms",
                    transform: mobileOpen
                      ? i === 0 ? "translateY(6px) rotate(45deg)"
                      : i === 2 ? "translateY(-6px) rotate(-45deg)"
                      : "translateY(0)"
                      : "translateY(0)",
                    opacity: mobileOpen && i === 1 ? 0 : 1,
                  }}
                />
              ))}
            </button>
          )}
        </div>
      </div>

      {/* Expanded Menu for Mobile (styled inside the Island) */}
      {isMobile && mobileOpen && (
        <div
          role="dialog"
          aria-label="Mobile navigation menu"
          style={{
            display:       "flex",
            flexDirection: "column",
            gap:           "6px",
            marginTop:     "16px",
            borderTop:     "1px solid rgba(255,255,255,0.1)",
            paddingTop:    "12px",
            animation:     "fadeIn 300ms ease-out",
          }}
        >
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              style={{
                fontFamily:   "'Open Sans', sans-serif",
                fontSize:     "13px",
                fontWeight:   700,
                textTransform:"uppercase",
                letterSpacing:"0.8px",
                color:        active === link.id ? "white" : "rgba(255,255,255,0.7)",
                background:   active === link.id ? "var(--brand)" : "transparent",
                border:       "none",
                borderRadius: "12px",
                padding:      "10px 14px",
                textAlign:    "left",
                cursor:       "pointer",
                width:        "100%",
                transition:   "all 150ms",
              }}
            >
              {link.label}
            </button>
          ))}

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginTop: "10px", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "12px" }}>
            {/* Search */}
            <button
              onClick={() => { onCommandPaletteOpen(); setMobileOpen(false); }}
              style={{
                display:        "flex",
                alignItems:     "center",
                justifyContent: "center",
                gap:            "6px",
                fontFamily:     "'Open Sans', sans-serif",
                fontSize:       "11px",
                fontWeight:     700,
                color:          "white",
                background:     "rgba(255,255,255,0.08)",
                border:         "1px solid rgba(255,255,255,0.15)",
                borderRadius:   "12px",
                padding:        "10px",
                cursor:         "pointer",
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/>
                <path d="M21 21l-4.35-4.35"/>
              </svg>
              Search
            </button>

            {/* Resume */}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display:        "inline-flex",
                alignItems:     "center",
                justifyContent: "center",
                gap:            "6px",
                fontFamily:     "'Open Sans', sans-serif",
                fontWeight:     700,
                fontSize:       "11px",
                textTransform:  "uppercase",
                letterSpacing:  "0.8px",
                color:          "white",
                background:     "linear-gradient(135deg, #ff512f, #dd2476)",
                padding:        "10px",
                borderRadius:   "12px",
                textDecoration: "none",
                textAlign:      "center",
                boxShadow:      "0 4px 12px rgba(226, 45, 109, 0.25)"
              }}
              onClick={() => setMobileOpen(false)}
            >
              <img src="/icons/cv.png" alt="" style={{ width: "12px", height: "12px", objectFit: "contain" }} />
              Resume
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
