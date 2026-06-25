"use client";

import React from "react";
import QRCode from "react-qr-code";

export default function Footer() {
  const vCardData = `BEGIN:VCARD
VERSION:3.0
FN:Srevarshan AI Engineer
TEL;TYPE=WORK,VOICE:+919600622497
EMAIL:srevarshan9600622@gmail.com
URL:https://github.com/Srevarshan05
END:VCARD`;

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-[#0F1218] border-t-4 border-[#1C202B] py-12 px-6 md:px-10 text-white relative">
      <div className="max-w-[1240px] mx-auto">
        
        {/* Main Grid: stacks on mobile, 4 columns on lg screens */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 items-start">
          
          {/* Column 1: Brand Logo, Location, and Cmd Search Hint */}
          <div className="flex flex-col gap-4">
            <div>
              <div className="font-['Bangers'] text-[28px] text-white tracking-[2px] mb-1 uppercase">
                SRE VARSHAN
              </div>
              <p className="text-[13px] text-[#94A3CC] leading-relaxed font-semibold">
                AI Engineer · Tiruchirappalli, India
              </p>
            </div>
            
            {/* Press Ctrl+K search hint */}
            <div className="text-[13px] text-[#94A3CC] flex items-center gap-1.5 opacity-80 mt-2">
              <span>Press</span>
              <kbd className="bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.15)] px-2 py-0.5 rounded text-[10px] font-bold text-white">
                Ctrl+K
              </kbd>
              <span>to search</span>
            </div>
            
            {/* Back to Top Button */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="mt-4 self-start bg-transparent border-2 border-[#1C202B] hover:border-[#E22D6D] hover:text-[#E22D6D] text-[#94A3CC] font-bold text-[12px] uppercase tracking-[1px] py-2 px-4 rounded transition-all duration-150 active:translate-y-0.5"
              style={{
                boxShadow: "4px 4px 0 0 #1C202B",
              }}
            >
              Back to Top ↑
            </button>
          </div>

          {/* Column 2: Sitemap */}
          <div>
            <h5 className="font-['Bangers'] text-[18px] tracking-[1px] text-[#E22D6D] mb-4 uppercase">
              Sitemap
            </h5>
            <div className="flex flex-col gap-2.5">
              {[
                { label: "Home", id: "hero" },
                { label: "About", id: "about" },
                { label: "Experience", id: "experience" },
                { label: "Contact", id: "contact" }
              ].map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollToSection(link.id)}
                  className="text-left text-[14px] font-bold text-[#B7C4ED] hover:text-[#E22D6D] transition-colors duration-150 cursor-pointer"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Column 3: Portfolio */}
          <div>
            <h5 className="font-['Bangers'] text-[18px] tracking-[1px] text-[#E22D6D] mb-4 uppercase">
              Portfolio
            </h5>
            <div className="flex flex-col gap-2.5">
              {[
                { label: "Projects", id: "projects" },
                { label: "Skills", id: "skills" },
                { label: "Achievements", id: "achievements" },
                { label: "Gallery", id: "gallery" }
              ].map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollToSection(link.id)}
                  className="text-left text-[14px] font-bold text-[#B7C4ED] hover:text-[#E22D6D] transition-colors duration-150 cursor-pointer"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Column 4: Connect & QR Code */}
          <div className="flex flex-col md:flex-row lg:flex-col gap-6 md:gap-10 lg:gap-6 justify-between lg:justify-start w-full">
            {/* Links */}
            <div className="flex flex-col gap-2.5 min-w-[120px]">
              <h5 className="font-['Bangers'] text-[18px] tracking-[1px] text-[#E22D6D] mb-2 md:mb-4 lg:mb-2 uppercase">
                Connect
              </h5>
              <a
                href="https://github.com/Srevarshan05"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[14px] font-bold text-[#B7C4ED] hover:text-[#E22D6D] transition-colors duration-150 no-underline"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/srevarshan05/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[14px] font-bold text-[#B7C4ED] hover:text-[#E22D6D] transition-colors duration-150 no-underline"
              >
                LinkedIn
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[14px] font-bold text-[#B7C4ED] hover:text-[#E22D6D] transition-colors duration-150 no-underline"
              >
                Resume
              </a>
              {/* New mailto link */}
              <a
                href="mailto:srevarshan9600622@gmail.com"
                className="text-[13px] font-semibold text-[#94A3CC] hover:text-[#E22D6D] transition-colors duration-150 no-underline break-all mt-1"
              >
                srevarshan9600622@gmail.com
              </a>
            </div>

            {/* QR Code Container */}
            <div className="flex flex-col items-center self-start md:self-center lg:self-start gap-2">
              <div className="bg-white p-2.5 rounded-md border-2 border-[#1C202B] shadow-[4px_4px_0_0_#1C202B]">
                <QRCode
                  value={vCardData}
                  size={96}
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                  viewBox={`0 0 256 256`}
                />
              </div>
              <span className="text-[11px] font-bold tracking-[0.5px] uppercase text-[#94A3CC]">
                Scan to Connect
              </span>
            </div>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="border-t border-[rgba(255,255,255,0.07)] mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <p className="text-[12px] text-[rgba(255,255,255,0.3)]">
            © 2026 Sre Varshan. All rights reserved.
          </p>
          <p className="text-[11px] text-[rgba(255,255,255,0.2)] font-mono">
            vCard 3.0 QR Integrated
          </p>
        </div>

      </div>
    </footer>
  );
}
