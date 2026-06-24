"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

interface CommandItem {
  id: string;
  label: string;
  description: string;
  icon: string;
  action: () => void;
  category: string;
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    onClose();
  }, [onClose]);

  const openExternal = useCallback((url: string) => {
    window.open(url, "_blank", "noopener noreferrer");
    onClose();
  }, [onClose]);

  const commands: CommandItem[] = [
    {
      id: "home",
      label: "Home",
      description: "Go to the top of the page",
      icon: "🏠",
      category: "Navigation",
      action: () => scrollToSection("home"),
    },
    {
      id: "experience",
      label: "Experience",
      description: "View work history and internships",
      icon: "💼",
      category: "Navigation",
      action: () => scrollToSection("experience"),
    },
    {
      id: "projects",
      label: "Projects",
      description: "Browse AI/ML projects",
      icon: "🔬",
      category: "Navigation",
      action: () => scrollToSection("projects"),
    },
    {
      id: "achievements",
      label: "Achievements",
      description: "Patents, hackathon wins, and more",
      icon: "🏆",
      category: "Navigation",
      action: () => scrollToSection("achievements"),
    },
    {
      id: "contact",
      label: "Contact",
      description: "Get in touch with Sre Varshan",
      icon: "📬",
      category: "Navigation",
      action: () => scrollToSection("contact"),
    },
    {
      id: "resume",
      label: "View Resume",
      description: "Download or view the full resume (PDF)",
      icon: "📄",
      category: "Quick Actions",
      action: () => openExternal("/resume.pdf"),
    },
    {
      id: "github",
      label: "GitHub",
      description: "View code and repositories",
      icon: "🐙",
      category: "Quick Actions",
      action: () => openExternal("https://github.com/srevarshan"),
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      description: "Connect on LinkedIn",
      icon: "💼",
      category: "Quick Actions",
      action: () => openExternal("https://linkedin.com/in/srevarshan"),
    },
    {
      id: "banana-weevil",
      label: "Banana Weevil Detection System",
      description: "AI-powered acoustic pest detection on Raspberry Pi",
      icon: "🍌",
      category: "Projects",
      action: () => scrollToSection("projects"),
    },
    {
      id: "nutriminds",
      label: "NutriMinds AI",
      description: "Food label health analysis mobile app",
      icon: "🥗",
      category: "Projects",
      action: () => scrollToSection("projects"),
    },
    {
      id: "docparser",
      label: "Document Parsing VLM",
      description: "Chat with your PDF documents using local AI",
      icon: "📑",
      category: "Projects",
      action: () => scrollToSection("projects"),
    },
  ];

  const filtered = commands.filter(
    (cmd) =>
      query === "" ||
      cmd.label.toLowerCase().includes(query.toLowerCase()) ||
      cmd.description.toLowerCase().includes(query.toLowerCase()) ||
      cmd.category.toLowerCase().includes(query.toLowerCase())
  );

  // Group by category
  const grouped = filtered.reduce<Record<string, CommandItem[]>>((acc, cmd) => {
    if (!acc[cmd.category]) acc[cmd.category] = [];
    acc[cmd.category].push(cmd);
    return acc;
  }, {});

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((i) => Math.min(i + 1, filtered.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter") {
        if (filtered[selectedIndex]) {
          filtered[selectedIndex].action();
        }
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, filtered, selectedIndex, onClose]);

  // Reset state on open
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Reset selected index on filter change
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  if (!isOpen) return null;

  let globalIndex = -1;

  return (
    <div
      className="cmd-overlay"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
    >
      <div className="cmd-modal">
        {/* Header / Search Input */}
        <div className="cmd-input-wrapper">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <circle cx="9" cy="9" r="6" stroke="#94A3CC" strokeWidth="2" />
            <path d="M13.5 13.5L17 17" stroke="#94A3CC" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            className="cmd-input"
            placeholder="Search sections, projects, or actions…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            aria-label="Command search"
            id="command-palette-input"
          />
          <kbd>ESC</kbd>
        </div>

        {/* Results */}
        <div className="cmd-results" role="listbox">
          {Object.entries(grouped).map(([category, items]) => (
            <div key={category} style={{ marginBottom: "8px" }}>
              {/* Category header */}
              <div
                style={{
                  fontFamily: "'Open Sans', sans-serif",
                  fontSize: "11px",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  color: "var(--color-body-subtle)",
                  padding: "8px 16px 4px",
                }}
              >
                {category}
              </div>

              {items.map((cmd) => {
                globalIndex++;
                const currentIndex = globalIndex;
                return (
                  <div
                    key={cmd.id}
                    className={`cmd-result-item ${selectedIndex === currentIndex ? "selected" : ""}`}
                    onClick={cmd.action}
                    onMouseEnter={() => setSelectedIndex(currentIndex)}
                    role="option"
                    aria-selected={selectedIndex === currentIndex}
                    id={`cmd-item-${cmd.id}`}
                  >
                    <div className="cmd-result-icon" aria-hidden="true">
                      <span style={{ fontSize: "16px" }}>{cmd.icon}</span>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          fontFamily: "'Open Sans', sans-serif",
                          fontSize: "15px",
                          fontWeight: 600,
                          color: "var(--color-heading)",
                        }}
                      >
                        {cmd.label}
                      </div>
                      <div
                        style={{
                          fontFamily: "'Open Sans', sans-serif",
                          fontSize: "13px",
                          color: "var(--color-body-subtle)",
                        }}
                      >
                        {cmd.description}
                      </div>
                    </div>
                    {selectedIndex === currentIndex && (
                      <kbd>↵</kbd>
                    )}
                  </div>
                );
              })}
            </div>
          ))}

          {filtered.length === 0 && (
            <div
              style={{
                padding: "32px 20px",
                textAlign: "center",
                fontFamily: "'Open Sans', sans-serif",
                fontSize: "14px",
                color: "var(--color-body-subtle)",
              }}
            >
              No results for &quot;{query}&quot;
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="cmd-footer">
          <span className="cmd-key">
            <kbd>↑</kbd><kbd>↓</kbd> Navigate
          </span>
          <span className="cmd-key">
            <kbd>↵</kbd> Select
          </span>
          <span className="cmd-key">
            <kbd>ESC</kbd> Close
          </span>
        </div>
      </div>
    </div>
  );
}
