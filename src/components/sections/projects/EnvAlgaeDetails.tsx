"use client";

import { profileById } from "@/lib/profiles";

const YT_ID = "zw1ZXmUXFCU";
const LINKS = {
  github: "https://github.com/Srevarshan05/env-hacks-2026",
  youtube: `https://youtu.be/${YT_ID}`,
  live: "https://webapp-fronted.d2g9yn1a89sqiw.amplifyapp.com/",
};

const STACK: { group: string; items: string[] }[] = [
  { group: "Edge hardware", items: ["ESP32", "BME680 sensor", "SX1278 LoRa", "12 V blower + motor driver", "Water pump"] },
  { group: "AWS", items: ["API Gateway", "Lambda", "DynamoDB", "RDS for PostgreSQL", "Cognito", "Amplify Hosting", "ECR", "Lambda Function URL"] },
  { group: "Software", items: ["React", "TypeScript", "Vite", "FastAPI", "SQLAlchemy", "Python 3.12", "Docker"] },
];

const GALLERY = [
  { src: "/env/prototype-live.webp", caption: "The working unit, streaming readings" },
  { src: "/env/algae-film.webp", caption: "Thin film of living algae" },
  { src: "/env/algae-collection.webp", caption: "Collecting algae for the film" },
  { src: "/env/prototype-wiring.webp", caption: "ESP32, motor driver and sensors" },
  { src: "/env/wiring-desk.webp", caption: "Wiring the air node" },
  { src: "/env/dashboard.webp", caption: "Live dashboard on AWS Amplify" },
];

function Node({ title, sub, aws }: { title: string; sub?: string; aws?: boolean }) {
  return (
    <div className={`env-node ${aws ? "is-aws" : ""}`}>
      <strong>{title}</strong>
      {sub && <span>{sub}</span>}
    </div>
  );
}
const Arrow = ({ label }: { label?: string }) => (
  <div className="env-arrow" aria-hidden="true">
    {label && <span>{label}</span>}
    <svg width="34" height="12" viewBox="0 0 34 12" fill="none"><path d="M0 6h30M25 1l6 5-6 5" stroke="currentColor" strokeWidth="2" /></svg>
  </div>
);

export default function EnvAlgaeDetails() {
  const gh = profileById("github");
  const yt = profileById("youtube");

  return (
    <div className="env-wrap">
      <p className="env-lead">
        Built in four days, from paper plan to working product, for <strong>AWS Environmental Hacks 2026</strong> (WeMakeDevs × AWS).
        A blower pushes air across a thin film of living algae while an ESP32 reads the air every 10 seconds, tunes the blower,
        and streams readings over LoRa and Wi-Fi to AWS. Each unit runs on its own and new units join without rebuilding anything.
        Four computer science students, learning the biology and the electrical engineering as we built it.
      </p>

      {/* Video + links */}
      <div className="env-media">
        <div className="env-video">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${YT_ID}?rel=0`}
            title="Thin-film algae air purifier: video walkthrough"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
        <div className="env-links">
          <a className="env-link" href={LINKS.github} target="_blank" rel="noopener noreferrer">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d={gh.svgPath} /></svg>
            <span><strong>GitHub</strong><em>env-hacks-2026</em></span>
            <span className="sr-only">(opens in a new tab)</span>
          </a>
          <a className="env-link" href={LINKS.youtube} target="_blank" rel="noopener noreferrer">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="#FF0000" aria-hidden="true"><path d={yt.svgPath} /></svg>
            <span><strong>YouTube</strong><em>Video walkthrough</em></span>
            <span className="sr-only">(opens in a new tab)</span>
          </a>
          <a className="env-link" href={LINKS.live} target="_blank" rel="noopener noreferrer">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 3 2.5 15 0 18M12 3c-2.5 3-2.5 15 0 18" /></svg>
            <span><strong>Live site</strong><em>Hosted on AWS Amplify</em></span>
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </div>
      </div>

      {/* Tech stack */}
      <section className="env-block">
        <h4 className="env-h">Tech stack</h4>
        <div className="env-stack">
          {STACK.map((g) => (
            <div key={g.group} className="env-stack-row">
              <span className="env-mono">{g.group}</span>
              <ul>{g.items.map((i) => <li key={i} className={g.group === "AWS" ? "is-aws" : ""}>{i}</li>)}</ul>
            </div>
          ))}
        </div>
      </section>

      {/* Architecture */}
      <section className="env-block">
        <h4 className="env-h">Architecture</h4>
        <div className="env-arch" role="img" aria-label="Telemetry flows from the ESP32 air node over LoRa and Wi-Fi to API Gateway, Lambda and DynamoDB. Users reach a React app on Amplify, sign in with Cognito, and a FastAPI service on Lambda reads and writes RDS PostgreSQL.">
          <p className="env-mono env-lane">Telemetry path</p>
          <div className="env-flow">
            <Node title="Algae unit" sub="blower · pump · thin film" />
            <Arrow />
            <Node title="ESP32 air node" sub="Wi-Fi + HTTPS, every 10 s" />
            <Arrow />
            <Node title="API Gateway" aws />
            <Arrow />
            <Node title="Lambda" aws />
            <Arrow />
            <Node title="DynamoDB" sub="readings" aws />
          </div>
          <p className="env-arch-note">LoRa (SX1278) carries the same readings node-to-node as a second link.</p>

          <p className="env-mono env-lane">People path</p>
          <div className="env-flow">
            <Node title="QR on the unit" sub="hydrate the algae" />
            <Arrow />
            <Node title="React app" sub="Amplify Hosting" aws />
            <Arrow />
            <Node title="Cognito" aws />
            <Arrow />
            <Node title="FastAPI on Lambda" sub="container from ECR" aws />
            <Arrow />
            <Node title="RDS PostgreSQL" sub="users · refills · points" aws />
          </div>
          <p className="env-arch-note">The phone never reports how much water was added: a flow sensor measures it, the server verifies it, and points are credited exactly once.</p>
        </div>
      </section>

      {/* Circuit */}
      <section className="env-block env-two">
        <div>
          <h4 className="env-h">Sensing &amp; transmission circuit</h4>
          <p className="env-text">
            The air node: a BME680 on I²C reads temperature, humidity, pressure and gas; an SX1278 LoRa radio on SPI sends it at 433 MHz.
            Getting HTTPS to AWS working meant syncing the ESP32&apos;s clock first, since certificates depend on the correct time.
          </p>
        </div>
        <a className="env-circuit" href="/env/air-node-wiring.webp" target="_blank" rel="noopener noreferrer">
          <img src="/env/air-node-wiring.webp" alt="Wiring diagram: BME680 connected to the ESP32 over I2C (GPIO 21 SDA, GPIO 22 SCL) and an SX1278 LoRa module over SPI (GPIO 18 SCK, 19 MISO, 23 MOSI, 5 NSS, 14 RST, 2 DIO0)" loading="lazy" />
          <span className="sr-only">(opens full size in a new tab)</span>
        </a>
      </section>

      {/* Build gallery */}
      <section className="env-block">
        <h4 className="env-h">From the build</h4>
        <ul className="env-gallery">
          {GALLERY.map((g) => (
            <li key={g.src}>
              <img src={g.src} alt={g.caption} loading="lazy" />
              <span>{g.caption}</span>
            </li>
          ))}
        </ul>
      </section>

      <p className="env-team">
        Team .env: Sre Varshan S, Pranav S, Shamyukthaa D and Archana S.
      </p>

      <style>{`
        .env-wrap { display: flex; flex-direction: column; gap: 26px; font-family: 'Geist', system-ui, sans-serif; color: #141414; }
        .env-mono { font-family: 'Geist Mono', ui-monospace, monospace; text-transform: uppercase; letter-spacing: 0.12em; font-size: 11.5px; color: #4D5566; }
        .env-lead { margin: 0; font-size: 16px; line-height: 1.7; color: #333; max-width: 80ch; }
        .env-lead strong { color: #141414; }
        .env-h { font-family: inherit; font-size: 19px; font-weight: 600; letter-spacing: -0.02em; text-transform: none; margin: 0 0 12px; color: #141414; }
        .env-text { margin: 0; font-size: 15px; line-height: 1.65; color: #4D4D4D; }

        .env-media { display: grid; grid-template-columns: minmax(0, 1.7fr) minmax(0, 1fr); gap: 16px; align-items: stretch; }
        .env-video { position: relative; aspect-ratio: 16 / 9; background: #000; border: 1px solid #E6E3DD; }
        .env-video iframe { position: absolute; inset: 0; width: 100%; height: 100%; border: 0; }
        .env-links { display: flex; flex-direction: column; gap: 10px; }
        .env-link {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 14px 16px;
          background: #FFFFFF;
          border: 1px solid #E6E3DD;
          color: #141414;
          text-decoration: none;
          transition: border-color 160ms, transform 160ms, box-shadow 160ms;
        }
        .env-link:hover { color: #141414; border-color: #141414; transform: translateY(-2px); box-shadow: 0 10px 20px -16px rgba(20,20,20,0.5); }
        .env-link > span:not(.sr-only) { display: flex; flex-direction: column; gap: 2px; }
        .env-link strong { font-size: 15.5px; font-weight: 600; }
        .env-link em { font-style: normal; font-size: 13px; color: #6E6E6E; }

        .env-stack { border: 1px solid #E6E3DD; }
        .env-stack-row { display: grid; grid-template-columns: 150px minmax(0, 1fr); gap: 16px; align-items: center; padding: 12px 16px; }
        .env-stack-row + .env-stack-row { border-top: 1px solid #E6E3DD; }
        .env-stack-row ul { list-style: none; display: flex; flex-wrap: wrap; gap: 6px; }
        .env-stack-row li { padding: 5px 10px; border: 1px solid #D9D5CE; background: #FAF9F7; font-size: 13px; font-weight: 500; }
        .env-stack-row li.is-aws { border-color: #F5C27A; background: #FFF6E8; }

        .env-arch { border: 1px solid #E6E3DD; overflow: hidden; background: linear-gradient(to bottom, #F2F9FE, #FFFFFF); padding: 18px 18px 6px; }
        .env-lane { margin: 0 0 22px; }
        .env-flow { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr) 30px) minmax(0, 1fr); align-items: center; gap: 6px 2px; }
        .env-node {
          display: flex;
          flex-direction: column;
          gap: 2px;
          padding: 10px 10px;
          background: #FFFFFF;
          border: 1px solid #CFCBC3;
          min-width: 0;
          height: 100%;
          justify-content: center;
        }
        .env-node strong { font-size: 13.5px; font-weight: 600; line-height: 1.25; }
        .env-node span { font-size: 12px; color: #6E6E6E; }
        .env-node.is-aws { border-color: #F0A93A; background: #FFFBF4; }
        .env-arrow { position: relative; display: flex; justify-content: center; color: #8F8F8F; }
        .env-arrow svg { width: 26px; }
        .env-arrow span { position: absolute; bottom: 100%; left: 50%; transform: translateX(-50%); margin-bottom: 4px; font-family: 'Geist Mono', monospace; font-size: 9.5px; color: #6E6E6E; white-space: nowrap; }
        .env-arch-note { margin: 10px 0 18px; font-size: 13.5px; line-height: 1.55; color: #4D4D4D; }

        .env-two { display: grid; grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.4fr); gap: 22px; align-items: center; }
        .env-circuit { display: block; border: 1px solid #E6E3DD; background: #FFFFFF; cursor: zoom-in; }
        .env-circuit img { display: block; width: 100%; height: auto; }

        .env-gallery { list-style: none; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; }
        .env-gallery li { border: 1px solid #E6E3DD; background: #FFFFFF; }
        .env-gallery img { display: block; width: 100%; aspect-ratio: 4 / 3; object-fit: cover; }
        .env-gallery span { display: block; padding: 8px 10px; font-size: 12.5px; color: #4D4D4D; }

        .env-team { margin: 0; font-size: 14px; color: #6E6E6E; }

        @media (max-width: 768px) {
          .env-media, .env-two { grid-template-columns: 1fr; }
          .env-stack-row { grid-template-columns: 1fr; gap: 8px; }
          .env-gallery { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .env-flow { grid-template-columns: 1fr; gap: 4px; }
          .env-arrow { transform: rotate(90deg); height: 22px; align-items: center; }
          .env-arrow span { display: none; }
        }
      `}</style>
    </div>
  );
}
