"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const NAV_LINKS = [
  { id: "home",         label: "Home" },
  { id: "gallery",      label: "Gallery" },
  { id: "about",        label: "About" },
  { id: "skills",       label: "Skills" },
  { id: "experience",   label: "Experience" },
  { id: "projects",     label: "Projects" },
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
    background: "#ffffff", // clean white pill
    border: "3px solid #1C202B", // neobrutalist border
    borderRadius: isMobile && mobileOpen ? "24px" : "9999px",
    boxShadow: "5px 5px 0 0 #1C202B", // neobrutalist slab shadow
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
          gap: isMobile ? "0" : "16px",
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
          {/* Favicon logo image */}
          <div
            aria-hidden="true"
            style={{
              width:        "36px",
              height:       "36px",
              borderRadius: "50%",
              overflow:     "hidden",
              flexShrink:   0,
              border:       "2px solid #1C202B",
            }}
          >
            <img
              src="/Portfolio-favi.png"
              alt="Sre Varshan logo"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </div>

          {/* Name & Title (hidden on compact mobile mode) */}
          {(!isMobile || mobileOpen) && (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", lineHeight: 1.1, gap: "1px" }}>
              <span style={{ fontFamily: "'Bangers', cursive", fontSize: "16px", letterSpacing: "1.5px", color: "#1C202B", textTransform: "uppercase" }}>
                Sre Varshan
              </span>
              <span style={{ fontFamily: "'Open Sans', sans-serif", fontSize: "9px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", color: "var(--brand)" }}>
                Applied AI & GenAI Engineer
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
              gap:            "4px",
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
                    letterSpacing:   "0.6px",
                    color:           isActive ? "#FFFFFF" : "#1C202B",
                    background:      isActive ? "var(--brand)" : isHovered ? "rgba(28, 32, 43, 0.08)" : "transparent",
                    border:          "none",
                    height:          "32px",
                    display:         "inline-flex",
                    alignItems:      "center",
                    justifyContent:  "center",
                    padding:         "0 10px",
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

            {/* ── Solutions Page Link ── */}
            <Link
              href="/services"
              id="nav-services-page"
              style={{
                fontFamily:    "'Open Sans', sans-serif",
                fontSize:      "11px",
                fontWeight:    700,
                textTransform: "uppercase",
                letterSpacing: "0.6px",
                color:         "#E22D6D",
                background:    "rgba(226,45,109,0.08)",
                border:        "1.5px solid rgba(226,45,109,0.3)",
                height:        "32px",
                display:       "inline-flex",
                alignItems:    "center",
                justifyContent:"center",
                padding:       "0 12px",
                borderRadius:  "9999px",
                textDecoration:"none",
                transition:    "all 150ms",
                whiteSpace:    "nowrap",
                flexShrink:    0,
              }}
            >
              Solutions
            </Link>
          </nav>
        )}

        {/* Actions Row */}
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "12px", flexShrink: 0 }}>
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
                    background: "#1C202B",
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
            borderTop:     "2px solid #1C202B",
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
                color:        active === link.id ? "white" : "#1C202B",
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
          {/* Services Page Link */}
          <Link
            href="/services"
            onClick={() => setMobileOpen(false)}
            style={{
              fontFamily:    "'Open Sans', sans-serif",
              fontSize:      "13px",
              fontWeight:    700,
              textTransform: "uppercase",
              letterSpacing: "0.8px",
              color:         "#E22D6D",
              background:    "rgba(226,45,109,0.08)",
              border:        "1.5px solid rgba(226,45,109,0.2)",
              borderRadius:  "12px",
              padding:       "10px 14px",
              textAlign:     "left",
              cursor:        "pointer",
              width:         "100%",
              textDecoration:"none",
              display:       "block",
            }}
          >
            Solutions
          </Link>
        </div>
      )}
    </header>
  );
}
