"use client";

import { useRef } from "react";
import { useScrollReveal } from "@/lib/useScrollReveal";
import { PROFILES, type Profile } from "@/lib/profiles";

const GROUPS: { id: Profile["group"]; title: string; note: string }[] = [
  { id: "build", title: "Where the work lives", note: "Code, write-ups and demos" },
  { id: "compete", title: "Where I sharpen it", note: "Competitive programming & practice" },
];

// Hand-set resting tilts so the stamps read as pinned by hand, not gridded by machine
const TILTS = ["-1.6deg", "1.2deg", "-0.8deg", "1.8deg"];

function Stamp({ p, tilt, index }: { p: Profile; tilt: string; index: number }) {
  return (
    <li className={`pf-item reveal stagger-${(index % 4) + 1}`}>
      <a
        href={p.url}
        target="_blank"
        rel="noopener noreferrer"
        className="pf-stamp"
        style={{ ["--accent" as string]: p.color, ["--tilt" as string]: tilt }}
      >
        <span className="pf-inset" aria-hidden="true" />

        <span className="pf-top">
          <span className="pf-mark" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor"><path d={p.svgPath} /></svg>
          </span>
          <span className="pf-go" aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7M8 7h9v9" /></svg>
          </span>
        </span>

        <span className="pf-name">{p.name}</span>
        <span className="pf-category">{p.category}</span>
        <span className="pf-desc">{p.desc}</span>
        <span className="pf-handle">{p.handle}</span>
        <span className="sr-only">(opens in a new tab)</span>
      </a>
    </li>
  );
}

export default function CodingProfilesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef as React.RefObject<HTMLElement>);

  return (
    <section id="coding-profiles" className="pf-section" ref={sectionRef} aria-labelledby="profiles-title">
      {/* White pixel clouds bobbing gently in the side margins, clear of the title and cards */}
      <div className="pf-sky" aria-hidden="true">
        <img className="pf-cloud pf-cloud-1" src="/pixel/cloud-3.png" alt="" width={368} height={168} />
        <img className="pf-cloud pf-cloud-2" src="/pixel/cloud-1.png" alt="" width={288} height={144} />
        <img className="pf-cloud pf-cloud-3" src="/pixel/cloud-2.png" alt="" width={224} height={120} />
        <img className="pf-cloud pf-cloud-4" src="/pixel/cloud-1.png" alt="" width={288} height={144} />
        <img className="pf-cloud pf-cloud-5" src="/pixel/cloud-2.png" alt="" width={224} height={120} />
      </div>
      <img className="pf-doodle pf-doodle-l" src="/icons/doodle-stars.png" alt="" aria-hidden="true" width={60} height={60} loading="lazy" />
      <img className="pf-doodle pf-doodle-r" src="/icons/doodle-stars.png" alt="" aria-hidden="true" width={60} height={60} loading="lazy" />

      <div className="pf-inner">
        <header className="pf-header reveal">
          <h2 id="profiles-title" className="pf-title">Coding &amp; Social Profiles</h2>
          <svg className="pf-underline" viewBox="0 0 220 12" fill="none" aria-hidden="true">
            <path d="M3 9C55 3 165 2 217 9" stroke="#E22D6D" strokeWidth="3.5" strokeLinecap="round" />
          </svg>
        </header>

        {GROUPS.map((g) => {
          const items = PROFILES.filter((p) => p.group === g.id);
          return (
            <div key={g.id} className="pf-group">
              <div className="pf-group-head">
                <h3 className="pf-group-title" id={`pf-${g.id}`}>{g.title}</h3>
                <p className="pf-group-note">{g.note}</p>
              </div>
              <ul className="pf-grid" aria-labelledby={`pf-${g.id}`}>
                {items.map((p, i) => (
                  <Stamp key={p.id} p={p} tilt={TILTS[i % TILTS.length]} index={i} />
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      <style>{`
        .pf-section {
          position: relative;
          overflow: hidden;
          /* white at both edges so it melts into Projects above and the resume section below */
          background: linear-gradient(to bottom,
            #FFFFFF 0%, #F6FAFE 6%, #E9F4FD 16%, #DFEFFC 30%, #DCEEFB 50%,
            #DFEFFC 70%, #E9F4FD 84%, #F6FAFE 94%, #FFFFFF 100%);
          padding: 140px 40px 140px;
        }
        .pf-inner { position: relative; z-index: 2; max-width: 1180px; margin: 0 auto; }
        .pf-sky { position: absolute; inset: 0; z-index: 0; overflow: hidden; pointer-events: none; }
        .pf-cloud {
          position: absolute;
          height: auto;
          image-rendering: pixelated;
          filter: drop-shadow(0 6px 0 rgba(120, 160, 200, 0.18));
          will-change: transform;
          animation: pfBob 9s ease-in-out infinite alternate;
        }
        /* small horizontal sway only: the clouds stay in the margins */
        @keyframes pfBob { from { transform: translate3d(-14px, 0, 0); } to { transform: translate3d(14px, -6px, 0); } }
        .pf-cloud-1 { width: 276px; top: 220px; left: calc(50% - 900px); animation-duration: 11s; }
        .pf-cloud-2 { width: 216px; top: 300px; right: calc(50% - 860px); animation-duration: 9s; animation-delay: -3s; }
        .pf-cloud-3 { width: 150px; top: 46%; left: calc(50% - 790px); animation-duration: 10s; animation-delay: -5s; opacity: 0.9; }
        .pf-cloud-4 { width: 216px; top: 58%; right: calc(50% - 900px); animation-duration: 12s; animation-delay: -2s; }
        .pf-cloud-5 { width: 150px; bottom: 90px; left: calc(50% - 860px); animation-duration: 8s; animation-delay: -6s; opacity: 0.9; }
        /* narrower screens: margins are too small, so two small clouds sit fully in view in the top corners */
        @media (max-width: 1699px) {
          .pf-cloud-3, .pf-cloud-4, .pf-cloud-5 { display: none; }
          .pf-cloud-1 { width: 170px; top: 22px; left: 3%; }
          .pf-cloud-2 { width: 140px; top: 46px; right: 3%; }
        }
        @media (prefers-reduced-motion: reduce) { .pf-cloud { animation: none; } }
        .pf-doodle { position: absolute; top: 110px; width: 60px; height: auto; opacity: 0.8; pointer-events: none; z-index: 1; }
        .pf-doodle-l { left: 6%; }
        .pf-doodle-r { right: 6%; transform: scaleX(-1); }

        .pf-header { text-align: center; margin-bottom: 56px; }
        .pf-title {
          font-size: clamp(40px, 5.8vw, 72px);
          letter-spacing: -0.04em;
          font-weight: 600;
          color: #141414;
          margin: 0;
          text-wrap: balance;
        }
        .pf-underline { display: block; width: 220px; height: 12px; margin: 6px auto 0; }

        .pf-group + .pf-group { margin-top: 64px; }
        .pf-group-head {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 4px 16px;
          padding-bottom: 14px;
          margin-bottom: 30px;
          border-bottom: 1px dashed rgba(20, 20, 20, 0.2);
        }
        .pf-group-title {
          font-size: clamp(26px, 3vw, 34px);
          letter-spacing: -0.03em;
          font-weight: 600;
          color: #141414;
          margin: 0;
        }
        .pf-group-note { margin: 0; font-family: 'Geist Mono', ui-monospace, monospace; font-size: 12.5px; letter-spacing: 0.12em; text-transform: uppercase; color: #4D5566; }

        .pf-grid {
          list-style: none;
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 28px;
        }
        .pf-item { display: flex; }

        /* ── Stamp: a real link, scalloped like a postage stamp ── */
        .pf-stamp {
          position: relative;
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 4px;
          padding: 24px 22px 20px;
          color: #1C202B;
          text-decoration: none;
          background:
            radial-gradient(circle at 0 50%, transparent 5px, #FFFFFF 5.5px) left / 10px 20px repeat-y,
            radial-gradient(circle at 100% 50%, transparent 5px, #FFFFFF 5.5px) right / 10px 20px repeat-y,
            radial-gradient(circle at 50% 0, transparent 5px, #FFFFFF 5.5px) top / 20px 10px repeat-x,
            radial-gradient(circle at 50% 100%, transparent 5px, #FFFFFF 5.5px) bottom / 20px 10px repeat-x,
            linear-gradient(#FFFFFF, #FFFFFF) center / calc(100% - 18px) calc(100% - 18px) no-repeat;
          filter: drop-shadow(5px 5px 0 #1C202B);
          transform: rotate(var(--tilt));
          transition: transform 220ms cubic-bezier(0.22, 1, 0.36, 1), filter 220ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .pf-stamp:hover, .pf-stamp:focus-visible {
          transform: rotate(0deg) translateY(-6px);
          filter: drop-shadow(8px 8px 0 var(--accent));
          color: #1C202B;
        }
        .pf-stamp:active { transform: rotate(0deg) translateY(1px); filter: drop-shadow(2px 2px 0 #1C202B); }
        .pf-stamp:focus-visible { outline: 3px solid var(--brand); outline-offset: 6px; }
        .pf-inset {
          position: absolute;
          inset: 12px;
          border: 1.5px dashed rgba(28, 32, 43, 0.22);
          border-radius: 2px;
          pointer-events: none;
        }

        .pf-top {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 12px;
        }
        .pf-mark {
          width: 52px;
          height: 52px;
          display: grid;
          place-items: center;
          color: var(--accent);
          background: #F4F6FF;
          border: 2px solid #1C202B;
          border-radius: 8px;
          transition: background 180ms;
        }
        .pf-stamp:hover .pf-mark { background: #FFFFFF; }
        .pf-go {
          width: 34px;
          height: 34px;
          display: grid;
          place-items: center;
          border: 2px solid #1C202B;
          border-radius: 50%;
          background: #FFFFFF;
          transition: background 180ms, color 180ms, transform 220ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .pf-stamp:hover .pf-go { background: #1C202B; color: #FFFFFF; transform: translate(2px, -2px); }

        .pf-name {
          position: relative;
          font-family: 'Geist', sans-serif;
          font-size: 21px;
          font-weight: 600;
          letter-spacing: -0.02em;
          line-height: 1.15;
        }
        .pf-category {
          position: relative;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: #4A5468;
        }
        .pf-desc {
          position: relative;
          font-size: 14px;
          line-height: 1.5;
          color: #2F3645;
          margin-top: 8px;
          flex: 1;
        }
        .pf-handle {
          position: relative;
          margin-top: 14px;
          padding-top: 10px;
          border-top: 1.5px dashed rgba(28, 32, 43, 0.18);
          font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
          font-size: 12px;
          font-weight: 600;
          color: #4A5468;
          overflow-wrap: anywhere;
        }

        @media (max-width: 1023px) {
          .pf-section { padding: 112px 32px 120px; }
          .pf-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 24px; }
        }
        /* phones: a compact two-column grid of small stamps so the whole section fits in a couple of screens */
        @media (max-width: 559px) {
          .pf-section { padding: 80px 14px 84px; }
          .pf-header { margin-bottom: 28px; }
          .pf-group-head { margin-bottom: 18px; padding-bottom: 10px; }
          .pf-group-title { font-size: 22px; }
          .pf-group-note { font-size: 10.5px; }
          .pf-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px; }
          .pf-stamp { transform: none; padding: 18px 16px 14px; filter: drop-shadow(3px 3px 0 #1C202B); }
          .pf-inset { inset: 9px; }
          .pf-top { margin-bottom: 8px; }
          .pf-mark { width: 38px; height: 38px; border-radius: 6px; }
          .pf-mark svg, .pf-mark img { width: 20px; height: 20px; }
          .pf-go { width: 26px; height: 26px; }
          .pf-go svg { width: 11px; height: 11px; }
          .pf-name { font-size: 16px; }
          .pf-category { font-size: 9.5px; letter-spacing: 0.6px; }
          .pf-desc { display: none; }
          .pf-handle { margin-top: 8px; padding-top: 7px; font-size: 10.5px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; overflow-wrap: normal; }
          .pf-doodle { width: 34px; top: 54px; }
          .pf-doodle-l { left: 4%; } .pf-doodle-r { right: 4%; }
          .pf-group + .pf-group { margin-top: 36px; }
          .pf-sky { display: none; }
        }
      `}</style>
    </section>
  );
}
