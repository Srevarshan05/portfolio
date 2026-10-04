# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
A mixed public audience: recruiters and hiring managers, interviewers, LinkedIn profile viewers, fellow students, professors, clients, collaborators, researchers and peers. Most arrive from a resume, LinkedIn or a shared link and are judging Sre Varshan's capability and credibility, then deciding whether to contact, hire, or collaborate.

## Product Purpose
Personal portfolio (V1) of Sre Varshan, an AI/ML engineer based in Tiruchirappalli, India. It presents projects, experience, skills, achievements, coding profiles and gallery, and lets visitors get in touch (contact form with optional AI-drafted email, services inquiry, resume, QR vCard). Success: visitors understand quickly what he builds and reach out.

## Positioning
AI Systems & GenAI Engineer turning research into real-world impact: end-to-end builder of multimodal AI, GenAI tools and full-stack systems across OCR, VLMs, LLMs and ML, applied to agriculture, healthcare and beyond, with hands-on experience taking AI systems to edge devices.

## Operating Context
Visitors skim on desktop and mobile; the site also serves as the canonical link behind resume and LinkedIn (srevarshan.in). Contact flows: Nodemailer API with mailto fallback, Groq-powered "Draft with AI", EmailJS services modal.

## Capabilities and Constraints
- Built on Next.js 16 (App Router), React 19, Tailwind v4; existing sections, projects, experience, factual claims and functionality (including contact/AI drafting, command palette, Services modal) must be preserved.
- Current visual design (neobrutalist "Tetris Design System") is NOT final. V1 is intentionally open to redesign and visual evolution.
- Priorities for V1: strong information architecture, clear storytelling, responsive UX, accessibility, and a polished structural foundation that can be redesigned later without major structural changes.

## Brand Commitments
Name: Sre Varshan. Do not invent or alter factual claims (projects, patent, metrics, bio, credentials).

## Evidence on Hand
Real projects and assets in `public/`: NutriMinds AI, ACAS Dhristi, Banana Weevil detection (patent: dual-mode acoustic sensing and edge AI), TextLens (open-source OCR framework), Xenia, AgroCare, RAG pipeline; resume, profile photos, workflow diagrams, award/team photos. Facts in `src/app/layout.tsx` JSON-LD and the section components are the source of truth. Do not fabricate testimonials, metrics or clients.

## Product Principles
- Truth first: every claim traces to existing content; never embellish.
- Tell one story: research to deployed, edge-capable systems, end to end.
- Serve a mixed audience: a recruiter should grasp value in seconds; a researcher can go deep.
- Structure over styling: keep the content architecture stable so the visual layer can be replaced.
- Reachable by anyone: responsive and accessible by default.

## Accessibility & Inclusion
No specific standard stated; accessibility is an explicit V1 priority (assume WCAG 2.1 AA as a working target unless told otherwise).
