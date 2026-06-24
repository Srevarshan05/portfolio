"use client";

import { useEffect, useState, useCallback } from "react";

import HeroSection        from "@/components/sections/Hero";
import ExperienceSection  from "@/components/sections/Experience";
import ProjectsSection    from "@/components/sections/Projects";
import ConsoleSection     from "@/components/sections/Console";
import AchievementsSection from "@/components/sections/Achievements";
import GallerySection      from "@/components/sections/Gallery";
import AboutSection        from "@/components/sections/About";
import SkillsSection       from "@/components/sections/Skills";
import ContactSection      from "@/components/sections/Contact";

import TopNav            from "@/components/layout/TopNav";
import CommandPalette    from "@/components/layout/CommandPalette";

export default function Home() {
  const [cmdOpen, setCmdOpen] = useState(false);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault();
      setCmdOpen((p) => !p);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <>
      {/* ── Fixed top navigation ── */}
      <TopNav onCommandPaletteOpen={() => setCmdOpen(true)} />

      <main>
        {/* Sections alternate: light → dark → white → dark → light */}
        <HeroSection />
        <GallerySection />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <ConsoleSection />
        <AchievementsSection />
        <ContactSection />

        {/* ── Footer ── */}
        <footer
          style={{
            background: "var(--dark-strong)",
            borderTop: "4px solid var(--border-default)",
            padding: "48px 40px",
          }}
        >
          <div
            className="container"
            style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "center", gap: "24px" }}
          >
            {/* Left: logo */}
            <div>
              <div style={{ fontFamily: "'Bangers', cursive", fontSize: "24px", color: "white", letterSpacing: "2px", marginBottom: "6px" }}>
                SRE VARSHAN
              </div>
              <p className="small" style={{ color: "var(--neutral-quaternary)", maxWidth: "260px" }}>
                AI/ML Engineer · Chennai, India · Built with the Tetris Design System
              </p>
            </div>

            {/* Centre: nav links */}
            <nav aria-label="Footer navigation">
              <div style={{ display: "flex", gap: "24px" }}>
                {["Home", "Gallery", "About", "Skills", "Experience", "Projects", "Achievements", "Contact"].map((label) => (
                  <button
                    key={label}
                    onClick={() => document.getElementById(label.toLowerCase())?.scrollIntoView({ behavior: "smooth" })}
                    style={{
                      fontFamily: "'Open Sans', sans-serif",
                      fontSize: "12px",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.8px",
                      color: "var(--neutral-quaternary)",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      transition: "color 120ms",
                    }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--fg-brand)")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--neutral-quaternary)")}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </nav>

            {/* Right: social + cmd hint */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "12px" }}>
              <div style={{ display: "flex", gap: "12px" }}>
                {[
                  { href: "https://github.com/srevarshan",      label: "GitHub" },
                  { href: "https://linkedin.com/in/srevarshan", label: "LinkedIn" },
                  { href: "/resume.pdf",                        label: "Resume" },
                ].map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontFamily: "'Open Sans', sans-serif",
                      fontSize: "12px", fontWeight: 700,
                      textTransform: "uppercase", letterSpacing: "0.5px",
                      color: "var(--neutral-quaternary)",
                      textDecoration: "none",
                      transition: "color 120ms",
                    }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--fg-brand)")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--neutral-quaternary)")}
                  >
                    {l.label}
                  </a>
                ))}
              </div>
              <p
                className="small"
                style={{ color: "rgba(255,255,255,0.25)", margin: 0 }}
              >
                Press{" "}
                <kbd style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", padding: "1px 6px", borderRadius: "3px", fontSize: "10px" }}>
                  Ctrl+K
                </kbd>
                {" "}to search
              </p>
            </div>
          </div>

          <div className="container" style={{ borderTop: "1px solid rgba(255,255,255,0.07)", marginTop: "32px", paddingTop: "24px", textAlign: "center" }}>
            <p className="small" style={{ color: "rgba(255,255,255,0.25)", margin: 0 }}>
              © 2026 Sre Varshan. All rights reserved.
            </p>
          </div>
        </footer>
      </main>

      {/* ── Command Palette ── */}
      <CommandPalette isOpen={cmdOpen} onClose={() => setCmdOpen(false)} />
    </>
  );
}
