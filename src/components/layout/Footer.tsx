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
    <footer className="portfolio-footer">
      <div className="footer-container">
        
        {/* Main Grid Layout */}
        <div className="footer-grid">
          
          {/* Column 1: Brand details & Back to Top */}
          <div className="brand-col">
            <div className="brand-title">SRE VARSHAN</div>
            <p className="brand-subtitle">AI Engineer · Tiruchirappalli, India</p>
            
            {/* Command Palette Search Hint */}
            <div className="search-hint">
              <span>Press</span>
              <kbd className="cmd-kbd">Ctrl+K</kbd>
              <span>to search</span>
            </div>
            
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="back-to-top-btn"
            >
              Back to Top ↑
            </button>
          </div>

          {/* Column 2: Sitemap Links */}
          <div className="links-col">
            <h5 className="col-header">Sitemap</h5>
            <div className="links-wrapper">
              {[
                { label: "Home", id: "hero" },
                { label: "About", id: "about" },
                { label: "Experience", id: "experience" },
                { label: "Contact", id: "contact" }
              ].map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollToSection(link.id)}
                  className="footer-link"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Column 3: Portfolio Links */}
          <div className="links-col">
            <h5 className="col-header">Portfolio</h5>
            <div className="links-wrapper">
              {[
                { label: "Projects", id: "projects" },
                { label: "Skills", id: "skills" },
                { label: "Achievements", id: "achievements" },
                { label: "Gallery", id: "gallery" }
              ].map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollToSection(link.id)}
                  className="footer-link"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Column 4: Connect Links & QR Code */}
          <div className="connect-col">
            <div className="connect-links-side">
              <h5 className="col-header">Connect</h5>
              <div className="links-wrapper">
                <a
                  href="https://github.com/Srevarshan05"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link"
                >
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/srevarshan05/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link"
                >
                  LinkedIn
                </a>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link"
                >
                  Resume
                </a>
                <a
                  href="mailto:srevarshan9600622@gmail.com"
                  className="footer-email-link"
                >
                  srevarshan9600622@gmail.com
                </a>
              </div>
            </div>

            <div className="qr-side">
              <div className="qr-wrapper">
                <QRCode
                  value={vCardData}
                  size={96}
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                  viewBox={`0 0 256 256`}
                />
              </div>
              <span className="qr-label">Scan to Connect</span>
            </div>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="footer-bottom">
          <p className="copyright-text">
            © 2026 Sre Varshan. All rights reserved.
          </p>
          <p className="technical-badge">
            vCard 3.0 QR Integrated
          </p>
        </div>

      </div>

      {/* Scoped CSS styling to make it completely independent of Tailwind compiler */}
      <style>{`
        .portfolio-footer {
          background-color: #0F1218;
          border-top: 4px solid #1C202B;
          padding: 48px 40px;
          color: #ffffff;
          font-family: 'Open Sans', sans-serif;
          position: relative;
          width: 100%;
          box-sizing: border-box;
        }

        .footer-container {
          max-width: 1240px;
          margin: 0 auto;
          width: 100%;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 1.2fr 1fr 1fr 1.6fr;
          gap: 32px;
          align-items: start;
        }

        .brand-col {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .brand-title {
          font-family: 'Bangers', cursive;
          font-size: 28px;
          letter-spacing: 2px;
          color: #ffffff;
          text-transform: uppercase;
          line-height: 1;
        }

        .brand-subtitle {
          font-size: 13px;
          color: #94A3CC;
          font-weight: 600;
          line-height: 1.5;
          margin: 0;
        }

        .search-hint {
          font-size: 13px;
          color: #94A3CC;
          display: flex;
          align-items: center;
          gap: 6px;
          opacity: 0.8;
        }

        .cmd-kbd {
          background: rgba(255, 255, 255, 0.08);
          border: 1.5px solid rgba(255, 255, 255, 0.15);
          padding: 1px 6px;
          border-radius: 3px;
          font-size: 10px;
          font-weight: bold;
          font-family: 'Open Sans', sans-serif;
          color: #ffffff;
        }

        .back-to-top-btn {
          margin-top: 8px;
          align-self: flex-start;
          background: transparent;
          border: 2px solid #1C202B;
          color: #94A3CC;
          font-weight: 700;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 1px;
          padding: 8px 16px;
          border-radius: 4px;
          cursor: pointer;
          box-shadow: 4px 4px 0 0 #1C202B;
          transition: transform 80ms ease-out, box-shadow 80ms ease-out, border-color 150ms, color 150ms;
        }

        .back-to-top-btn:hover {
          border-color: #E22D6D;
          color: #E22D6D;
        }

        .back-to-top-btn:active {
          transform: translate(2px, 2px);
          box-shadow: 2px 2px 0 0 #1C202B;
        }

        .links-col {
          display: flex;
          flex-direction: column;
        }

        .col-header {
          font-family: 'Bangers', cursive;
          font-size: 18px;
          tracking: 1px;
          color: #E22D6D;
          margin: 0 0 16px 0;
          text-transform: uppercase;
          line-height: 1;
        }

        .links-wrapper {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .footer-link {
          background: none;
          border: none;
          padding: 0;
          text-align: left;
          font-family: 'Open Sans', sans-serif;
          font-size: 14px;
          font-weight: 700;
          color: #B7C4ED;
          text-decoration: none;
          cursor: pointer;
          transition: color 150ms;
          display: inline-block;
        }

        .footer-link:hover {
          color: #E22D6D;
          text-decoration: none;
        }

        .footer-email-link {
          font-family: 'Open Sans', sans-serif;
          font-size: 13px;
          font-weight: 600;
          color: #94A3CC;
          text-decoration: none;
          word-break: break-all;
          margin-top: 4px;
          transition: color 150ms;
          display: inline-block;
        }

        .footer-email-link:hover {
          color: #E22D6D;
          text-decoration: none;
        }

        .connect-col {
          display: flex;
          flex-direction: row;
          gap: 24px;
          justify-content: space-between;
          width: 100%;
        }

        .connect-links-side {
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .qr-side {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
        }

        .qr-wrapper {
          background-color: #ffffff;
          padding: 10px;
          border-radius: 6px;
          border: 2px solid #1C202B;
          box-shadow: 4px 4px 0 0 #1C202B;
          display: inline-block;
          line-height: 0;
        }

        .qr-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          color: #94A3CC;
          margin: 0;
          text-align: center;
        }

        .footer-bottom {
          border-top: 1px solid rgba(255, 255, 255, 0.07);
          margin-top: 40px;
          padding-top: 24px;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
        }

        .copyright-text {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.3);
          margin: 0;
        }

        .technical-badge {
          font-size: 11px;
          color: rgba(255, 255, 255, 0.2);
          font-family: monospace;
          margin: 0;
        }

        /* Responsive Breakpoints */
        @media (max-width: 1023px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: 40px;
          }
          
          .connect-col {
            grid-column: span 2;
            justify-content: flex-start;
            gap: 64px;
          }
        }

        @media (max-width: 767px) {
          .portfolio-footer {
            padding: 40px 20px;
          }
          
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }

          .connect-col {
            grid-column: span 1;
            flex-direction: column;
            gap: 32px;
          }

          .qr-side {
            align-self: flex-start;
          }
          
          .footer-bottom {
            flex-direction: column;
            text-align: center;
            gap: 12px;
          }
        }
      `}</style>
    </footer>
  );
}
