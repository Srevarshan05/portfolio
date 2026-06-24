"use client";

import React, { useEffect, useState } from "react";

interface DockItem {
  id: string;
  label: string;
  href: string;
  icon: React.ReactNode;
}

const dockItems: DockItem[] = [
  {
    id: "dock-home",
    label: "Home",
    href: "#home",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  },
  {
    id: "dock-experience",
    label: "Experience",
    href: "#experience",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
        <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/>
      </svg>
    ),
  },
  {
    id: "dock-projects",
    label: "Projects",
    href: "#projects",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 7 12 12 22 7 12 2"/>
        <polyline points="2 17 12 22 22 17"/>
        <polyline points="2 12 12 17 22 12"/>
      </svg>
    ),
  },
  {
    id: "dock-achievements",
    label: "Wins",
    href: "#achievements",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="6"/>
        <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
      </svg>
    ),
  },
  {
    id: "dock-contact",
    label: "Contact",
    href: "#contact",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
  },
];

interface FloatingDockProps {
  onCommandPaletteOpen: () => void;
}

export default function FloatingDock({ onCommandPaletteOpen }: FloatingDockProps) {
  const [activeSection, setActiveSection] = useState("home");

  // Track active section on scroll
  useEffect(() => {
    const sectionIds = ["home", "experience", "projects", "achievements", "contact"];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.4 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav
      className="floating-dock"
      aria-label="Primary navigation"
      role="navigation"
    >
      {dockItems.map((item, index) => (
        <div key={item.id} style={{ display: "flex", alignItems: "center" }}>
          <a
            href={item.href}
            id={item.id}
            className={`dock-item ${activeSection === item.href.replace("#", "") ? "active" : ""}`}
            onClick={(e) => handleClick(e, item.href)}
            aria-label={item.label}
            title={item.label}
            style={{
              color: activeSection === item.href.replace("#", "")
                ? "var(--brand)"
                : "var(--color-heading)",
            }}
          >
            <div className="dock-item-icon">{item.icon}</div>
            <span className="dock-item-label">{item.label}</span>
          </a>
          {index === 1 && <div className="dock-divider" />}
        </div>
      ))}

      {/* Divider + Command Palette trigger */}
      <div className="dock-divider" />
      <button
        onClick={onCommandPaletteOpen}
        className="dock-item"
        aria-label="Open command palette (Ctrl+K)"
        title="Search ⌘K"
        id="dock-command"
        style={{
          background: "none",
          color: "var(--color-heading)",
          cursor: "pointer",
        }}
      >
        <div className="dock-item-icon">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
        </div>
        <span className="dock-item-label">Search</span>
      </button>
    </nav>
  );
}
