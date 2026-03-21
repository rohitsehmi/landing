# Landing

> [One sentence — what it is and who it's for]

**Status:** Planning | **Owner:** Deesyn | **Stack:** Next.js · Supabase · Vercel

---

## Quick start

```bash
# Install dependencies
npm install

# Copy env vars and fill in your keys
cp .env.example .env.local

# Build design tokens
npm run tokens:build

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Stack

| Layer | Tool |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + CSS custom properties |
| Components | shadcn/ui |
| Motion | Motion for React |
| Tokens | Style Dictionary |
| Database | Supabase (Postgres + Auth) |
| Email | Resend + React Email |
| Rate Limiting | Upstash Redis |
| Error Monitoring | Sentry |
| Deployment | Vercel |

---

## Development

```bash
npm run dev          # Start dev server
npm run type-check   # TypeScript check
npm run lint         # ESLint
npm run test         # Unit tests (Vitest)
npm run test:e2e     # End-to-end tests (Playwright)
npm run tokens:build # Rebuild CSS from token JSON
npm run analyze      # Bundle size analysis
npm run db:types     # Regenerate Supabase TypeScript types
```

---

## Project structure

```
app/          Next.js App Router — (auth) (marketing) (app) api
components/   ui/ shared/ layout/ forms/
tokens/       Design token JSON — primitives, semantic, themes
lib/          supabase/ utils validations ratelimit flags
tests/        unit/ e2e/
.claude/      Claude Code — commands, agents, settings, hooks
.cursor/      Cursor BMAD agent rules
docs/         Spacing, typography, performance, email setup
```

---

## Key documents

| Document | Purpose |
|---|---|
| `FIRST-RUN.md` | Setup checklist for new projects |
| `WORKFLOW.md` | Session discipline and build phases |
| `CLAUDE.md` | Claude Code context — read every session |
| `AGENTS.md` | BMAD agent definitions for Cursor |
| `SKILLS.md` | Reusable advanced prompt patterns |
| `PLAN.md` | Current sprint goals and feature status |
| `DECISIONS.md` | Architecture Decision Records |
| `a11y.md` | Accessibility specification |
| `docs/performance.md` | Performance budget and Core Web Vitals |

---

## Deploy

Deployed on Vercel. `dev` branch → Preview. `main` branch → Production.

Before any deploy run:
```bash
/deploy-check   # in Claude Code
```

---

## Licence

Private. © [YEAR] Deesyn. All rights reserved.
