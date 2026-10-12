"use client";

import Link from "next/link";
import { useRef } from "react";
import { MotionConfig, motion, useScroll, useSpring, useTransform } from "framer-motion";
import { CountUp, EASE_OUT, Reveal, Stagger, StaggerItem } from "@/components/motion";

/* ─── Content (every claim traces to shipped work on the main site) ─────────── */

const PROOF = [
  { value: 7, suffix: " mo", label: "building a production healthcare SaaS at EmedLogix" },
  { value: 4, suffix: " days", label: "from paper plan to a working edge-to-AWS product" },
  { value: 9, suffix: "", label: "AWS services orchestrated in one deployed system" },
  { value: 60, suffix: "+", label: "documents per provider tracked by an automation I built" },
];

const LAYERS = [
  { id: "ui", name: "Interface", what: "Web apps, dashboards and landing pages people enjoy using", tech: ["React", "Next.js", "TypeScript", "Tailwind"], color: "#E22D6D" },
  { id: "ai", name: "AI & intelligence", what: "LLMs, agents, OCR, vision and models that solve the actual problem", tech: ["LLMs & agents", "Text-to-SQL", "Qwen2.5-VL OCR", "RAG", "PyTorch"], color: "#A23DDB" },
  { id: "api", name: "Backend & data", what: "APIs, business logic, auth and databases that stay correct under load", tech: ["FastAPI", "Python", "PostgreSQL", "DynamoDB", "Auth & SSO"], color: "#1E88E5" },
  { id: "cloud", name: "Cloud & delivery", what: "Deployed, monitored and ready to scale from day one", tech: ["AWS Lambda", "API Gateway", "RDS", "Amplify", "Docker"], color: "#F2A33A" },
  { id: "edge", name: "Edge & hardware", what: "Sensors and devices that talk to the cloud reliably", tech: ["ESP32", "Jetson", "LoRa", "Sensors"], color: "#2BB04A" },
];

const CASES = [
  {
    tag: "Production · Healthcare SaaS",
    title: "Gen AI inside a live credentialing platform",
    text: "Seven months on a US healthcare product in daily use: a Text-to-SQL agent over PostgreSQL on AWS RDS, an OCR pipeline that autofills forms, deadline tracking for 60+ documents per provider, and Entra ID single sign-on.",
    stack: ["FastAPI", "PostgreSQL · RDS", "Qwen2.5-VL", "Azure Entra ID", "AWS"],
    href: "/#experience",
    link: "Read the experience",
  },
  {
    tag: "Edge to cloud · 4 days",
    title: "Algae air purifier, device to dashboard",
    text: "A working unit with sensors and a blower, streaming readings over LoRa and Wi-Fi into API Gateway, Lambda and DynamoDB, with Cognito sign-in, a FastAPI backend on RDS and a React dashboard on Amplify.",
    stack: ["ESP32", "API Gateway", "Lambda", "DynamoDB", "Cognito", "Amplify"],
    href: "/#projects",
    link: "See the project",
  },
  {
    tag: "Open source · Developer tool",
    title: "TextLens, a reusable OCR framework",
    text: "A Python framework that makes local document OCR simple to set up and reuse: hardware-aware model selection, batch processing, caching and FastAPI serving, packaged so other developers can build on it.",
    stack: ["Python", "PyTorch", "CUDA", "FastAPI", "Docker"],
    href: "/#projects",
    link: "See the project",
  },
];

const SERVICES = [
  { title: "Websites & web apps", desc: "Fast, responsive sites and full web applications that build trust and grow with you.", items: ["Custom design", "Mobile-first", "SEO", "Easy to manage"] },
  { title: "AI chatbots & assistants", desc: "Assistants that answer customers, book appointments and handle questions around the clock.", items: ["Website & WhatsApp bots", "Customer support", "FAQ automation", "Booking"] },
  { title: "Workflow automation", desc: "Take repetitive work off your team's plate: emails, documents, reports and approvals.", items: ["Email automation", "Google Workspace", "Document pipelines", "Custom flows"] },
  { title: "Custom AI solutions", desc: "AI built around your data and your problem, not a generic demo.", items: ["AI agents", "Document intelligence", "AI dashboards", "GenAI integration"] },
  { title: "Business systems", desc: "Billing, inventory and operations software that simplifies the day-to-day.", items: ["Digital receipts", "Inventory", "Sales & expenses", "GST-ready reports"] },
  { title: "AI consulting", desc: "A clear plan before you spend: what to build, with what, and what it will take.", items: ["AI strategy", "Tech guidance", "Product planning", "Proof of concept"] },
];

const PROCESS = [
  { label: "Discover", desc: "We talk through your goals, users and constraints until the problem is clear.", get: "A written scope you can hold me to" },
  { label: "Plan", desc: "I design the system: architecture, data, integrations and a delivery plan.", get: "Architecture and timeline" },
  { label: "Build", desc: "Working software in short cycles, so you see real progress every week.", get: "Weekly demos you can click" },
  { label: "Test", desc: "Every flow checked end to end, including the edge cases and failure paths.", get: "A tested, documented build" },
  { label: "Deliver", desc: "Deployed to the cloud, handed over cleanly, and supported after launch.", get: "Live system plus ongoing support" },
];

const EXPECT = [
  { title: "Clear communication", text: "Plain-language updates. You always know what is done and what is next." },
  { title: "Modern technology", text: "Proven tools that are easy to hire for and maintain later." },
  { title: "Built to scale", text: "Architecture that grows with your users instead of being rebuilt." },
  { title: "On-time delivery", text: "Short cycles and visible progress, so dates hold." },
  { title: "Long-term support", text: "I stay around after launch for fixes and next features." },
  { title: "Startup friendly", text: "Scoped to your budget, starting with what matters most." },
];

/* ─── Small parts ─────────────────────────────────────────────────────────── */

function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function ProcessRail() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 24, restDelta: 0.001 });
  const width = useTransform(fill, (v) => `${v * 100}%`);
  return (
    <ol ref={ref} className="sv-steps">
      <span className="sv-rail" aria-hidden="true"><motion.span className="sv-rail-fill" style={{ width }} /></span>
      {PROCESS.map((p, i) => (
        <Reveal as="li" kind="fade" key={p.label} delay={i * 0.08} className="sv-step">
          <span className="sv-step-dot" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
          <h3>{p.label}</h3>
          <p>{p.desc}</p>
          <p className="sv-mono sv-step-get">You get: {p.get}</p>
        </Reveal>
      ))}
    </ol>
  );
}

/* ─── Page ─────────────────────────────────────────────────────────────────── */

export default function ServicesPage() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const skyY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const photoY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);

  return (
    <MotionConfig reducedMotion="user">
      <a href="#main" className="skip-link">Skip to content</a>

      {/* ══ NAV ══ */}
      <header className="sv-nav-wrap">
        <nav className="sv-nav" aria-label="Main navigation">
          <Link className="sv-brand" href="/">
            <img src="/Portfolio-favi.png" alt="" width={34} height={34} />
            <span>Sre Varshan</span>
          </Link>
          <ul className="sv-links">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/#experience">Experience</Link></li>
            <li><Link href="/#projects">Work</Link></li>
            <li><Link href="/services" aria-current="page" className="is-on">Solutions</Link></li>
            <li><Link href="/#contact">Contact</Link></li>
          </ul>
          <Link className="sv-btn sv-btn-green sv-nav-cta" href="/?book=1">Book a call</Link>
        </nav>
      </header>

      <main id="main" tabIndex={-1} className="sv">
        {/* ══ HERO ══ */}
        <section ref={heroRef} className="sv-hero" aria-labelledby="sv-title">
          <motion.div className="sv-sky" style={{ y: skyY }} aria-hidden="true" />
          <div className="sv-hero-inner">
            <div className="sv-hero-copy">
              <Reveal kind="fade" as="p" className="sv-mono sv-kicker">Solutions · AI &amp; software, end to end</Reveal>
              <Reveal kind="fade" delay={0.08}>
                <h1 id="sv-title" className="sv-h1">
                  From your requirement to a system <span>running at scale.</span>
                </h1>
              </Reveal>
              <Reveal kind="fade" delay={0.16} as="p" className="sv-lead">
                I design, build and deploy complete software: the interface, the AI, the backend, the cloud, and even the hardware
                when your idea needs it. One builder who owns the whole system, so nothing gets lost between teams.
              </Reveal>
              <Reveal kind="fade" delay={0.24} className="sv-actions">
                <Link className="sv-btn sv-btn-green sv-btn-lg" href="/?book=1">Book a free call <Arrow /></Link>
                <Link className="sv-btn sv-btn-outline sv-btn-lg" href="/#projects">See shipped work</Link>
              </Reveal>
              <Reveal kind="fade" delay={0.32} as="p" className="sv-mono sv-hero-note">
                Production healthcare SaaS · AWS deployments · Government patent · National hackathon wins
              </Reveal>
            </div>
            <motion.div
              className="sv-photo"
              style={{ y: photoY }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.15 }}
            >
              <img src="/solutions-portrait.webp" alt="Sre Varshan" width={900} height={900} />
              <motion.span
                className="sv-badge sv-badge-a"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.7 }}
              >
                <i style={{ background: "#2BB04A" }} /> Applied AI &amp; GenAI Engineer
              </motion.span>
              <motion.span
                className="sv-badge sv-badge-b"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.9 }}
              >
                <i style={{ background: "#F2A33A" }} /> Ships to AWS
              </motion.span>
            </motion.div>
          </div>
        </section>

        {/* ══ PROOF NUMBERS ══ */}
        <section className="sv-proof" aria-label="Track record">
          <Stagger as="ul" className="sv-proof-list" gap={0.08}>
            {PROOF.map((p) => (
              <StaggerItem as="li" kind="fade" key={p.label}>
                <CountUp className="sv-proof-num" value={p.value} suffix={p.suffix} />
                <span className="sv-proof-label">{p.label}</span>
              </StaggerItem>
            ))}
          </Stagger>
        </section>

        {/* ══ END TO END ══ */}
        <section className="sv-block" aria-labelledby="sv-e2e">
          <div className="sv-head">
            <Reveal kind="fade" as="p" className="sv-mono sv-kicker">End to end</Reveal>
            <Reveal kind="fade" delay={0.06}><h2 id="sv-e2e" className="sv-h2">Every layer of your system, built by one person who sees all of it.</h2></Reveal>
            <Reveal kind="fade" delay={0.12} as="p" className="sv-sub">
              Most projects break at the seams between teams. I build each layer myself, so the device, the data, the AI and the
              screen your users touch are designed to work together.
            </Reveal>
          </div>
          <Stagger as="ol" className="sv-stack" gap={0.1} amount={0.15}>
            {LAYERS.map((l, i) => (
              <StaggerItem as="li" kind="fade" key={l.id} className="sv-layer" style={{ ["--c" as string]: l.color }}>
                <span className="sv-layer-num sv-mono">{String(i + 1).padStart(2, "0")}</span>
                <div className="sv-layer-main">
                  <h3>{l.name}</h3>
                  <p>{l.what}</p>
                </div>
                <ul className="sv-layer-tech">{l.tech.map((t) => <li key={t}>{t}</li>)}</ul>
              </StaggerItem>
            ))}
          </Stagger>
        </section>

        {/* ══ CASES ══ */}
        <section className="sv-block sv-block-tint" aria-labelledby="sv-cases">
          <div className="sv-head">
            <Reveal kind="fade" as="p" className="sv-mono sv-kicker">Shipped, not slideware</Reveal>
            <Reveal kind="fade" delay={0.06}><h2 id="sv-cases" className="sv-h2">Real systems I have built and deployed.</h2></Reveal>
          </div>
          <Stagger className="sv-cases" gap={0.1} amount={0.1}>
            {CASES.map((c) => (
              <StaggerItem as="article" kind="fade" key={c.title} className="sv-case">
                <p className="sv-mono sv-case-tag">{c.tag}</p>
                <h3>{c.title}</h3>
                <p className="sv-case-text">{c.text}</p>
                <ul className="sv-chips">{c.stack.map((s) => <li key={s}>{s}</li>)}</ul>
                <Link className="sv-case-link" href={c.href}>{c.link} <Arrow /></Link>
              </StaggerItem>
            ))}
          </Stagger>
        </section>

        {/* ══ SERVICES ══ */}
        <section className="sv-block" aria-labelledby="sv-services">
          <div className="sv-head">
            <Reveal kind="fade" as="p" className="sv-mono sv-kicker">What I build</Reveal>
            <Reveal kind="fade" delay={0.06}><h2 id="sv-services" className="sv-h2">Pick a starting point. I&apos;ll take it the whole way.</h2></Reveal>
          </div>
          <Stagger as="ul" className="sv-services" gap={0.06} amount={0.1}>
            {SERVICES.map((s, i) => (
              <StaggerItem as="li" kind="fade" key={s.title} className="sv-service">
                <span className="sv-mono sv-service-num">{String(i + 1).padStart(2, "0")}</span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <ul className="sv-service-items">{s.items.map((it) => <li key={it}>{it}</li>)}</ul>
              </StaggerItem>
            ))}
          </Stagger>
        </section>

        {/* ══ PROCESS ══ */}
        <section className="sv-block sv-block-dark" aria-labelledby="sv-process">
          <div className="sv-head">
            <Reveal kind="fade" as="p" className="sv-mono sv-kicker sv-kicker-light">How we work</Reveal>
            <Reveal kind="fade" delay={0.06}><h2 id="sv-process" className="sv-h2 sv-h2-light">Five steps from first call to live system.</h2></Reveal>
          </div>
          <ProcessRail />
        </section>

        {/* ══ EXPECT ══ */}
        <section className="sv-block" aria-labelledby="sv-expect">
          <div className="sv-head">
            <Reveal kind="fade" as="p" className="sv-mono sv-kicker">Working with me</Reveal>
            <Reveal kind="fade" delay={0.06}><h2 id="sv-expect" className="sv-h2">What you can count on.</h2></Reveal>
          </div>
          <Stagger as="ul" className="sv-expect" gap={0.06} amount={0.15}>
            {EXPECT.map((e) => (
              <StaggerItem as="li" kind="fade" key={e.title}>
                <h3>{e.title}</h3>
                <p>{e.text}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </section>

        {/* ══ CTA ══ */}
        <section className="sv-cta" aria-labelledby="sv-cta">
          <div className="sv-cta-sky" aria-hidden="true" />
          <Reveal kind="fade" className="sv-cta-inner">
            <h2 id="sv-cta" className="sv-h2">Have a requirement? Let&apos;s turn it into a working system.</h2>
            <p className="sv-sub">A free call to understand what you need. You leave with a clear plan, whether or not we work together.</p>
            <div className="sv-actions sv-actions-center">
              <Link className="sv-btn sv-btn-green sv-btn-lg" href="/?book=1">Book a free call <Arrow /></Link>
              <a className="sv-btn sv-btn-outline sv-btn-lg" href="mailto:srevarshan9600622@gmail.com">Email me</a>
            </div>
          </Reveal>
        </section>
      </main>

      <style>{`
        .sv, .sv-nav-wrap {
          --ink: #141414; --body: #4D4D4D; --muted: #6E6E6E; --line: #E6E3DD; --bg: #FAF9F7;
          --green: #1F7A4C; --green-d: #17603B;
          font-family: 'Geist', system-ui, sans-serif;
          color: var(--ink);
        }
        .sv { background: var(--bg); overflow-x: clip; }
        .sv-mono { font-family: 'Geist Mono', ui-monospace, monospace; text-transform: uppercase; letter-spacing: 0.14em; }

        /* Nav */
        .sv-nav-wrap { position: fixed; top: 16px; left: 0; right: 0; z-index: 1000; display: flex; justify-content: center; padding: 0 16px; pointer-events: none; }
        .sv-nav {
          pointer-events: auto;
          display: flex; align-items: center; gap: 22px;
          padding: 8px 8px 8px 14px;
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(10px);
          border: 2px solid #1C202B;
          box-shadow: 4px 4px 0 0 #1C202B;
        }
        .sv-brand { display: flex; align-items: center; gap: 10px; color: var(--ink); text-decoration: none; font-weight: 700; letter-spacing: -0.02em; }
        .sv-brand img { width: 34px; height: 34px; border-radius: 50%; border: 2px solid #1C202B; object-fit: cover; }
        .sv-links { list-style: none; display: flex; gap: 2px; }
        .sv-links a {
          display: block; padding: 8px 10px;
          font-family: 'Silkscreen', 'Geist Mono', monospace; font-size: 11px; letter-spacing: 0.04em; text-transform: uppercase;
          color: #1C202B; text-decoration: none;
        }
        .sv-links a:hover { background: #F1EFEA; color: #1C202B; }
        .sv-links a.is-on { background: var(--brand); color: #FFFFFF; }

        /* Buttons */
        .sv-btn {
          display: inline-flex; align-items: center; justify-content: center; gap: 8px;
          min-height: 44px; padding: 10px 18px; border-radius: 4px;
          font: 600 15px 'Geist', system-ui, sans-serif; letter-spacing: -0.01em; text-decoration: none;
          transition: background 160ms, transform 160ms, box-shadow 160ms;
        }
        .sv-btn-lg { min-height: 52px; padding: 12px 24px; font-size: 16px; }
        .sv-btn-green { background: var(--green); color: #FFFFFF; border: 1px solid var(--green-d); box-shadow: inset 0 1px 0 rgba(255,255,255,0.18); }
        .sv-btn-green:hover { background: var(--green-d); color: #FFFFFF; transform: translateY(-2px); box-shadow: 0 10px 20px -12px rgba(23, 96, 59, 0.7); }
        .sv-btn-outline { background: #FFFFFF; color: var(--ink); border: 1px solid #CFCBC3; }
        .sv-btn-outline:hover { background: #F6F4F0; color: var(--ink); transform: translateY(-2px); }
        .sv-btn svg { transition: transform 200ms; }
        .sv-btn:hover svg { transform: translateX(3px); }

        /* Hero */
        .sv-hero { position: relative; overflow: hidden; padding: 150px 40px 0; isolation: isolate; }
        .sv-sky {
          position: absolute; inset: -8% 0 0; z-index: -2;
          background: url('/pixel/sky.webp') center top / cover no-repeat; image-rendering: pixelated;
          animation: svDrift 28s ease-in-out infinite alternate;
        }
        @keyframes svDrift { from { background-position: 47% top; } to { background-position: 53% top; } }
        .sv-hero::after {
          content: ""; position: absolute; left: 0; right: 0; bottom: 0; height: 40%; z-index: -1;
          background: linear-gradient(to bottom, rgba(250,249,247,0), var(--bg) 90%);
        }
        .sv-hero-inner { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr); gap: 32px; align-items: end; }
        .sv-hero-copy { position: relative; padding-bottom: 80px; }
        /* soft light wash so pixel clouds never sit behind the text */
        .sv-hero-copy::before {
          content: ""; position: absolute; inset: -40px -80px 0 -120px; z-index: -1;
          background: radial-gradient(ellipse 60% 55% at 40% 45%, rgba(255,255,255,0.78), rgba(255,255,255,0) 72%);
          pointer-events: none;
        }
        .sv-kicker { display: inline-block; margin: 0 0 18px; padding: 6px 12px; background: rgba(255,255,255,0.9); border: 1px solid rgba(21,128,61,0.25); font-size: 12.5px; font-weight: 600; color: #166534; }
        .sv-kicker-light { background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.2); color: #9BE3B9; }
        .sv-h1 { margin: 0 0 22px; font-size: clamp(42px, 6vw, 82px); font-weight: 600; line-height: 1.02; letter-spacing: -0.045em; color: var(--ink); text-transform: none; text-wrap: balance; }
        .sv-h1 span { color: var(--brand); }
        .sv-lead { margin: 0 0 30px; max-width: 54ch; font-size: 18.5px; line-height: 1.6; color: #2F3645; }
        .sv-actions { display: flex; flex-wrap: wrap; gap: 12px; }
        .sv-actions-center { justify-content: center; }
        .sv-hero-note { margin: 28px 0 0; font-size: 11.5px; color: #4D5566; }
        .sv-photo { position: relative; align-self: end; }
        .sv-photo img { display: block; width: 100%; height: auto; filter: drop-shadow(0 30px 40px rgba(20, 40, 80, 0.18)); }
        .sv-badge {
          position: absolute; display: inline-flex; align-items: center; gap: 8px;
          padding: 9px 14px; background: #FFFFFF; border: 2px solid #1C202B; box-shadow: 4px 4px 0 0 #1C202B;
          font-size: 14px; font-weight: 600; white-space: nowrap;
          animation: svFloat 5s ease-in-out infinite;
        }
        .sv-badge i { width: 10px; height: 10px; }
        .sv-badge-a { left: -6%; top: 38%; }
        .sv-badge-b { right: 0; top: 62%; animation-delay: -2.5s; }
        @keyframes svFloat { 0%, 100% { translate: 0 0; } 50% { translate: 0 -8px; } }

        /* Proof */
        .sv-proof { position: relative; z-index: 2; padding: 0 40px; margin-top: -1px; }
        .sv-proof-list {
          list-style: none; max-width: 1200px; margin: 0 auto;
          display: grid; grid-template-columns: repeat(4, minmax(0, 1fr));
          background: #FFFFFF; border: 1px solid var(--line);
        }
        .sv-proof-list li { padding: 26px 24px; display: flex; flex-direction: column; gap: 8px; }
        .sv-proof-list li + li { border-left: 1px solid var(--line); }
        .sv-proof-num { font-size: clamp(36px, 3.6vw, 48px); font-weight: 600; letter-spacing: -0.04em; line-height: 1; color: var(--ink); font-variant-numeric: tabular-nums; }
        .sv-proof-label { font-size: 14.5px; line-height: 1.45; color: var(--body); }

        /* Blocks */
        .sv-block { padding: 120px 40px; }
        .sv-block-tint { background: linear-gradient(to bottom, var(--bg), #EAF4FC 30%, #EAF4FC 70%, var(--bg)); }
        .sv-block-dark { background: #0F1218; color: #FFFFFF; }
        .sv-head { max-width: 1200px; margin: 0 auto 48px; }
        .sv-h2 { margin: 0; max-width: 24ch; font-size: clamp(32px, 4vw, 52px); font-weight: 600; line-height: 1.08; letter-spacing: -0.04em; color: var(--ink); text-transform: none; text-wrap: balance; }
        .sv-h2-light { color: #FFFFFF; }
        .sv-sub { margin: 18px 0 0; max-width: 60ch; font-size: 17.5px; line-height: 1.6; color: var(--body); }

        /* Stack */
        .sv-stack { list-style: none; max-width: 1200px; margin: 0 auto; display: flex; flex-direction: column; gap: 10px; }
        .sv-layer {
          display: grid; grid-template-columns: 56px minmax(0, 1fr) minmax(0, 1.1fr); gap: 24px; align-items: center;
          padding: 22px 26px; background: #FFFFFF; border: 1px solid var(--line);
          transition: transform 220ms cubic-bezier(0.16,1,0.3,1), border-color 220ms, box-shadow 220ms;
        }
        .sv-layer:hover { transform: translateX(6px); border-color: var(--c); }
        .sv-layer-num { width: 44px; height: 44px; display: grid; place-items: center; background: var(--c); color: #FFFFFF; font-size: 13px; font-weight: 600; letter-spacing: 0.04em; }
        .sv-layer-main h3 { margin: 0 0 4px; font-size: 21px; font-weight: 600; letter-spacing: -0.02em; text-transform: none; color: var(--ink); }
        .sv-layer-main p { margin: 0; font-size: 15px; line-height: 1.55; color: var(--body); }
        .sv-layer-tech { list-style: none; display: flex; flex-wrap: wrap; gap: 6px; justify-content: flex-end; }
        .sv-layer-tech li { padding: 5px 10px; border: 1px solid #D9D5CE; background: var(--bg); font-size: 13px; font-weight: 500; }

        /* Cases */
        .sv-cases { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 20px; }
        .sv-case {
          display: flex; flex-direction: column; gap: 12px; padding: 28px 26px;
          background: #FFFFFF; border: 2px solid #1C202B; box-shadow: 6px 6px 0 0 #1C202B;
          transition: transform 220ms cubic-bezier(0.16,1,0.3,1), box-shadow 220ms;
        }
        .sv-case:hover { transform: translate(-3px, -3px); box-shadow: 9px 9px 0 0 var(--brand); }
        .sv-case-tag { margin: 0; font-size: 11.5px; color: #B11F55; }
        .sv-case h3 { margin: 0; font-size: 23px; font-weight: 600; line-height: 1.2; letter-spacing: -0.025em; text-transform: none; color: var(--ink); }
        .sv-case-text { margin: 0; font-size: 15px; line-height: 1.65; color: var(--body); flex: 1; }
        .sv-chips { list-style: none; display: flex; flex-wrap: wrap; gap: 6px; }
        .sv-chips li { padding: 4px 9px; border: 1px solid #F5C27A; background: #FFF6E8; font-size: 12.5px; font-weight: 500; }
        .sv-case-link { display: inline-flex; align-items: center; gap: 8px; margin-top: 6px; font-weight: 600; color: var(--ink); text-decoration: underline; text-underline-offset: 4px; }
        .sv-case-link:hover { color: var(--brand-strong); }

        /* Services */
        .sv-services { list-style: none; max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); border-top: 1px solid var(--line); border-left: 1px solid var(--line); }
        .sv-service { padding: 30px 28px; border-right: 1px solid var(--line); border-bottom: 1px solid var(--line); background: #FFFFFF; transition: background 200ms; }
        .sv-service:hover { background: #FFFBF4; }
        .sv-service-num { display: block; margin-bottom: 18px; font-size: 12px; color: var(--muted); }
        .sv-service h3 { margin: 0 0 8px; font-size: 21px; font-weight: 600; letter-spacing: -0.02em; text-transform: none; color: var(--ink); }
        .sv-service p { margin: 0 0 16px; font-size: 15px; line-height: 1.6; color: var(--body); }
        .sv-service-items { list-style: none; display: grid; gap: 7px; }
        .sv-service-items li { position: relative; padding-left: 16px; font-size: 14px; font-weight: 500; color: var(--ink); }
        .sv-service-items li::before { content: ""; position: absolute; left: 0; top: 7px; width: 7px; height: 7px; background: var(--green); }

        /* Process */
        .sv-steps { position: relative; list-style: none; max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 24px; }
        .sv-rail { position: absolute; top: 22px; left: 22px; right: 22px; height: 2px; background: #2A2F3B; }
        .sv-rail-fill { position: absolute; left: 0; top: 0; bottom: 0; background: linear-gradient(90deg, #2BB04A, #F2A33A 50%, #E22D6D); }
        .sv-step { position: relative; display: flex; flex-direction: column; gap: 10px; }
        .sv-step-dot {
          position: relative; z-index: 1; width: 46px; height: 46px; display: grid; place-items: center;
          background: #0F1218; border: 2px solid #FFFFFF; color: #FFFFFF;
          font: 600 13px 'Geist Mono', monospace;
        }
        .sv-step h3 { margin: 8px 0 0; font-size: 21px; font-weight: 600; letter-spacing: -0.02em; text-transform: none; color: #FFFFFF; }
        .sv-step p { margin: 0; font-size: 14.5px; line-height: 1.6; color: #B7C4ED; }
        .sv-step .sv-step-get { font-size: 11px; color: #9BE3B9; line-height: 1.5; }

        /* Expect */
        .sv-expect { list-style: none; max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 36px 40px; }
        .sv-expect li { padding-top: 18px; border-top: 2px solid #1C202B; }
        .sv-expect h3 { margin: 0 0 6px; font-size: 19px; font-weight: 600; letter-spacing: -0.02em; text-transform: none; color: var(--ink); }
        .sv-expect p { margin: 0; font-size: 15px; line-height: 1.6; color: var(--body); }

        /* CTA */
        .sv-cta { position: relative; overflow: hidden; padding: 140px 40px 160px; text-align: center; isolation: isolate; }
        .sv-cta-sky {
          position: absolute; inset: 0; z-index: -1;
          background: url('/pixel/sky.webp') center bottom / cover no-repeat; image-rendering: pixelated; opacity: 0.55;
          -webkit-mask-image: linear-gradient(to bottom, transparent, #000 45%);
          mask-image: linear-gradient(to bottom, transparent, #000 45%);
        }
        .sv-cta-inner::before {
          content: ""; position: absolute; inset: -60px -120px; z-index: -1;
          background: radial-gradient(ellipse 55% 60% at 50% 50%, rgba(250,249,247,0.92), rgba(250,249,247,0) 75%);
          pointer-events: none;
        }
        .sv-cta-inner { position: relative; max-width: 760px; margin: 0 auto; display: flex; flex-direction: column; align-items: center; }
        .sv-cta .sv-h2 { max-width: 20ch; }
        .sv-cta .sv-sub { margin-bottom: 28px; }

        @media (max-width: 1023px) {
          .sv-links { display: none; }
          .sv-hero { padding: 120px 24px 0; }
          .sv-hero-inner { grid-template-columns: 1fr; }
          .sv-hero-copy { padding-bottom: 20px; }
          .sv-photo { max-width: 460px; justify-self: center; }
          .sv-proof { padding: 0 24px; }
          .sv-proof-list { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .sv-proof-list li:nth-child(3) { border-left: 0; }
          .sv-proof-list li:nth-child(n+3) { border-top: 1px solid var(--line); }
          .sv-block { padding: 88px 24px; }
          .sv-layer { grid-template-columns: 48px minmax(0, 1fr); }
          .sv-layer-tech { grid-column: 2; justify-content: flex-start; }
          .sv-cases, .sv-services { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .sv-steps { grid-template-columns: 1fr; gap: 28px; padding-left: 66px; }
          .sv-rail { top: 0; bottom: 0; left: 22px; right: auto; width: 2px; height: auto; }
          .sv-rail-fill { display: none; }
          .sv-step-dot { position: absolute; left: -66px; top: -4px; }
          .sv-step h3 { margin-top: 0; }
          .sv-expect { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }
        @media (max-width: 640px) {
          .sv-nav { gap: 12px; }
          .sv-brand span { display: none; }
          .sv-hero { padding: 110px 16px 0; }
          .sv-hero-copy::before { inset: -30px -16px 0; background: linear-gradient(to bottom, rgba(255,255,255,0.55), rgba(255,255,255,0.8) 40%, rgba(255,255,255,0) 100%); }
          .sv-badge { font-size: 12.5px; padding: 7px 10px; }
          .sv-badge-a { left: 0; }
          .sv-proof { padding: 0 16px; }
          .sv-proof-list { grid-template-columns: 1fr; }
          .sv-proof-list li + li { border-left: 0; border-top: 1px solid var(--line); }
          .sv-block { padding: 72px 16px; }
          .sv-layer { grid-template-columns: 1fr; gap: 12px; padding: 20px; }
          .sv-layer-tech { grid-column: auto; }
          .sv-cases, .sv-services, .sv-expect { grid-template-columns: 1fr; }
          .sv-cta { padding: 100px 16px 120px; }
        }
      `}</style>
    </MotionConfig>
  );
}
