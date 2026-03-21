# FIRST-RUN.md
> Complete this once per project. Takes ~20 mins the first time, ~10 mins after that.
> Tick every box before writing a single line of product code.

---

## Phase 1 — Repository (2 mins)

- [ ] Unzip `project-template.zip`
- [ ] Rename folder to your project name e.g. `clearpath`
- [ ] Create private repo on GitHub
- [ ] Push:
```bash
git init
git add -A
git commit -m "feat: initial project scaffold"
git remote add origin https://github.com/[your-username]/landing.git
git push -u origin main
git checkout -b dev
```
- [ ] Create `dev` branch for active work — `main` is deploy-only

---

## Phase 2 — Dependencies (2 mins)

```bash
npm install
```

- [ ] `npm install` completes with no errors
- [ ] Verify TypeScript hook works — edit any `.ts` file, save, confirm type-check runs automatically

---

## Phase 3 — Fill in placeholders (5 mins)

### Global find & replace
Open Cursor or VS Code → `Cmd+Shift+H` → replace across all files:

| Find | Replace with |
|---|---|
| `Landing` | Your project name e.g. `ClearPath` |
| `[YOUR_DOMAIN]` | Your sending domain e.g. `clearpath.app` |
| `[YOUR_EMAIL]` | Your notification email e.g. `ro@deesyn.com` |
| `landing` | Lowercase kebab e.g. `clearpath` |

- [ ] All four replacements done
- [ ] `package.json` name field updated
- [ ] `app/layout.tsx` title and description updated

### CLAUDE.md
- [ ] `Landing` filled in
- [ ] Description filled in (one sentence)
- [ ] Status set to `Planning`
- [ ] `[CURRENT_TASK]` set to `Initial setup`

### PLAN.md
- [ ] Phase set to `1 — Foundation`
- [ ] Sprint goal written

---

## Phase 4 — Fonts (3 mins)

Go to [fonts.google.com](https://fonts.google.com) and choose:
- A **display font** for headings (e.g. Playfair Display, Fraunces, DM Serif Display)
- A **body font** for UI and copy (e.g. DM Sans, Plus Jakarta Sans, Geist)
- A **mono font** for code (e.g. JetBrains Mono, Geist Mono)

In `app/layout.tsx`:

- [ ] Import chosen fonts from `next/font/google`
- [ ] Add `variable` prop to each: `variable: '--font-display'` etc.
- [ ] Uncomment the `className` line on `<body>`
- [ ] Verify font variables match `tokens/typography.json` font family values

```tsx
// Example
import { Fraunces, DM_Sans, JetBrains_Mono } from 'next/font/google'

const displayFont = Fraunces({ subsets: ['latin'], variable: '--font-display' })
const bodyFont = DM_Sans({ subsets: ['latin'], variable: '--font-body' })
const monoFont = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' })
```

---

## Phase 5 — Design tokens (5 mins)

### Option A — You have Figma variables ready
- [ ] Export variables from Figma as W3C Design Token JSON
- [ ] Paste colour values into `tokens/primitives.json`
- [ ] Update `tokens/themes/light.json` and `tokens/themes/dark.json` with brand colours
- [ ] Update `tokens/typography.json` font family values to match chosen fonts
- [ ] Run `npm run tokens:build`
- [ ] Verify `styles/tokens.css` generated with your values
- [ ] Open `app/style-guide` in browser — confirm tokens rendering

### Option B — No Figma variables yet
- [ ] Leave `tokens/primitives.json` with placeholder values for now
- [ ] Run `npm run tokens:build` with placeholder values so CSS is generated
- [ ] Come back to this after design phase — rebuild tokens then

---

## Phase 6 — Environment variables (5 mins)

Copy `.env.example` to `.env.local` and fill in:

```bash
cp .env.example .env.local
```

### Supabase
- [ ] Create project at [supabase.com](https://supabase.com)
- [ ] Copy `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
- [ ] Copy `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] Copy `service_role` key → `SUPABASE_SERVICE_ROLE_KEY`
- [ ] Create `waitlist` table:
```sql
create table waitlist (
  id uuid default gen_random_uuid() primary key,
  email text unique not null,
  name text,
  created_at timestamptz default now()
);
alter table waitlist enable row level security;
```
- [ ] Generate TypeScript types:
```bash
npm run db:types
```

### Resend
- [ ] Create account at [resend.com](https://resend.com)
- [ ] Add and verify your domain (follow DNS instructions)
- [ ] Create API key → `RESEND_API_KEY`
- [ ] Send a test email to confirm domain is verified

### Upstash
- [ ] Create Redis database at [upstash.com](https://upstash.com)
- [ ] Copy `UPSTASH_REDIS_REST_URL`
- [ ] Copy `UPSTASH_REDIS_REST_TOKEN`

### Sentry
- [ ] Run setup wizard:
```bash
npx @sentry/wizard@latest -i nextjs
```
- [ ] `SENTRY_DSN` and `SENTRY_AUTH_TOKEN` added to `.env.local` by wizard

### App URL
- [ ] `NEXT_PUBLIC_APP_URL=http://localhost:3000` for now
  (update to production URL before deploy)

---

## Phase 7 — Cursor BMAD agents (2 mins)

Cursor reads `.mdc` files, not `.md`. You need to copy content from `AGENTS.md` into each rule file.

- [ ] Open `.cursor/rules/architect.mdc` → paste the **Architect Agent** section from `AGENTS.md`
- [ ] Open `.cursor/rules/developer.mdc` → paste the **Developer Agent** section
- [ ] Open `.cursor/rules/design-system.mdc` → paste the **Design System Agent** section
- [ ] Open `.cursor/rules/qa.mdc` → paste the **QA / Party Mode Agent** section

---

## Phase 8 — Verify everything works (3 mins)

```bash
# Type check — should pass with zero errors
npm run type-check

# Lint — should pass
npm run lint

# Dev server — should start without errors
npm run dev
```

- [ ] `npm run type-check` — zero errors
- [ ] `npm run lint` — zero errors
- [ ] `npm run dev` — starts on localhost:3000
- [ ] `localhost:3000` loads in browser
- [ ] `localhost:3000/style-guide` loads (even if unstyled)
- [ ] No console errors in browser devtools

---

## Phase 9 — First Claude Code session (1 min)

```bash
# Start Claude Code from project root
claude

# Name the session
/rename initial-setup

# Surface assumptions
/common-ground
```

- [ ] Claude Code starts and reads `CLAUDE.md` automatically
- [ ] `/common-ground` runs and Claude correctly describes the project
- [ ] Session hook fires on start — PLAN.md contents shown

---

## Phase 10 — Vercel (pre-deploy, do this now even if not deploying yet)

- [ ] Connect GitHub repo to [vercel.com](https://vercel.com)
- [ ] Add all env vars from `.env.local` to Vercel dashboard
- [ ] Set `dev` branch → Preview deployments
- [ ] Set `main` branch → Production
- [ ] Deploy preview — confirm it builds

---

## ✅ You are ready

Once all boxes are ticked:

- Claude Code reads your project context automatically on every session
- TypeScript checks fire on every file save
- All slash commands available: `/plan`, `/common-ground`, `/context-check`, `/token-audit`, `/new-component`, `/qa-sweep`, `/deploy-check`, `/parallel-build`
- Subagents ready: `a11y-auditor`, `token-auditor`, `code-reviewer`
- Supabase, Resend, Upstash, Sentry all connected
- Vercel deploy pipeline live

**First real prompt after setup:**
```
/plan [first feature]
```

---

## Subsequent projects

After your first setup, future projects take ~10 mins because:
- Supabase, Resend, Upstash, Sentry accounts already exist
- Font preferences are known
- Find & replace is muscle memory
- You skip Phase 1 setup reading time

Keep this template updated as your stack evolves.
Last updated by Deesyn — update `CHANGELOG.md` when the template changes.

---

## Phase 11 — Testing setup (3 mins)

```bash
# Install Playwright browsers
npx playwright install chromium

# Run unit tests — should pass out of the box
npm run test

# Verify e2e setup (will fail until app is running but config should load)
npx playwright --version
```

- [ ] `npm run test` — all unit tests pass
- [ ] Playwright installed correctly

---

## Phase 12 — Database migrations (2 mins)

```bash
# Install Supabase CLI if not already installed
npm install -g supabase

# Link to your project
npx supabase login
npx supabase link --project-ref [YOUR_PROJECT_REF]

# Push initial migration
npx supabase db push
```

- [ ] Supabase CLI linked to project
- [ ] Initial migration pushed (waitlist table created)
- [ ] `npm run db:types` — TypeScript types generated

---

## You are now fully set up

All 12 phases complete. Every system is wired and verified.

Open Claude Code:
```bash
claude
/rename initial-setup
/common-ground
/plan [first feature]
```
