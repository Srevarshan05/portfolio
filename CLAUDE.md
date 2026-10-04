# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

Run from `portfolio-app/` (the git repo root for the app; the parent folder only holds loose design assets).

- `npm run dev` — dev server (uses `next dev --webpack`, not Turbopack, because of the `.glb` webpack rule in `next.config.ts`)
- `npm run build` / `npm start` — production build / serve
- `npm run lint` — ESLint (flat config, `eslint.config.mjs`)

There is no test suite.

## Architecture

Single-page Next.js 16 (App Router) + React 19 + Tailwind v4 portfolio. Path alias `@/*` → `src/*`.

- `src/app/page.tsx` is a client component that stacks every section in order (Hero → Gallery → About → Skills → Experience → Projects → … → Contact → Footer) and owns the global Ctrl/Cmd+K command palette state. Adding a section means adding it here and, if navigable, to `TopNav` / `CommandPalette` / `FloatingDock`.
- `src/components/sections/*` — one file per page section; `src/components/layout/*` — nav, footer, modals, and WebGL/canvas visuals (`Lanyard` uses react-three-fiber + rapier with `public/card.glb`; `DomeGallery`, `DotGrid`, `ShapeGrid`).
- `src/lib/useScrollReveal.ts` — IntersectionObserver hook; children with `.reveal`, `.reveal-left`, `.reveal-right`, `.reveal-scale` get `.visible` added on entering the viewport. The CSS for these lives in `globals.css`.
- `src/app/layout.tsx` — metadata plus a large schema.org JSON-LD block (SEO identity of the owner); keep it in sync when facts about projects/patents change.
- `src/app/services/page.tsx` — separate `/services` route.
- Styling: the "Tetris Design System" is defined as CSS custom properties at the top of `src/app/globals.css` (neobrutalist look; tokens like `--brand`, `--neutral-*`). Prefer these tokens over hard-coded colors.

### Contact / email flow (two independent paths)

- `src/app/api/contact/route.ts` — sends mail via Nodemailer using `EMAIL_USER` / `EMAIL_PASS`; the client falls back to a prefilled `mailto:` if this fails or env vars are missing.
- `src/app/api/draft/route.ts` — "Draft with AI": calls Groq (`llama-3.3-70b-versatile`) with `GROQ_API_KEY` and expects a JSON `{subject, message}` back.
- `ServicesModal` uses EmailJS client-side via `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`, `NEXT_PUBLIC_EMAILJS_SERVICE_ID`, `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`.

Env vars live in `.env.local` (git-ignored; never print or commit its contents).

### Assets

Images referenced by the site must be in `public/` (served from `/`). The loose images in the parent directory (`../*.png`, WhatsApp images, etc.) are source material, not served.
