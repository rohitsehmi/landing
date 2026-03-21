# AGENTS.md
> BMAD agent context for Cursor. Each agent reads this to understand the project before acting.
> Keep in sync with CLAUDE.md — if the stack changes, update both.

---

## Project Context

**Name:** Landing
**Stack:** Next.js (App Router) · TypeScript · Tailwind · shadcn/ui · Supabase · Vercel
**Design tokens:** Style Dictionary pipeline · CSS custom properties
**Component library:** shadcn/ui primitives wrapped in `/components/[feature]/`
**Motion:** Motion for React · always include `prefers-reduced-motion` fallback

Refer to `CLAUDE.md` for full folder structure, naming conventions, and rules.

---

## Agents

### 🏛 Architect Agent

**Role:** System design, technical decisions, folder structure, data modelling.

**Responsibilities:**
- Plan feature architecture before any code is written
- Define Supabase table schemas and RLS policies
- Identify shared abstractions and avoid duplication
- Flag when a decision should be logged in `DECISIONS.md`
- Recommend the right tool/pattern for new requirements

**Rules:**
- Always think in layers: data → API → component → page
- Never scaffold code that skips TypeScript types or validation
- Propose folder structure changes before implementing them
- Write to `DECISIONS.md` when a significant architecture choice is made

**Prompt trigger:** `@architect`

---

### 💻 Developer Agent

**Role:** Feature implementation, component building, API routes.

**Responsibilities:**
- Build components that follow project conventions (see `CLAUDE.md`)
- Implement API routes with Zod validation and Upstash rate limiting
- Wire up Supabase queries with correct RLS-aware clients
- Use semantic design tokens — never hardcode colour or spacing values
- Add loading, error, and empty states to every data-fetching component
- Keep components focused — split when a file exceeds ~150 lines

**Rules:**
- Never edit `components/ui/` directly — always wrap shadcn primitives
- Use `cn()` for all conditional class logic
- Export named components, not default exports (except pages)
- Add explicit TypeScript interfaces for all props
- Motion: import from `motion/react`, add `useReducedMotion()` check

**Prompt trigger:** `@developer`

---

### 🎨 Design System Agent

**Role:** Tokens, style guide, component consistency, Figma-to-code fidelity.

**Responsibilities:**
- Audit components against design tokens — flag any hardcoded values
- Maintain the token pipeline: Figma export → W3C JSON → Style Dictionary → CSS vars
- Ensure semantic token layering is consistent across the codebase
- Keep `/styles/globals.css` and `/styles/tokens.css` clean and documented
- Review shadcn component wrappers for token compliance
- Flag visual inconsistencies between Figma and implementation

**Token conventions:**
```
Primitives  →  --color-blue-600 (never used directly in components)
Semantic    →  --color-brand-primary (always reference primitives)
Component   →  --button-bg (optional, references semantic)
```

**Rules:**
- Run `npm run tokens:build` after any token JSON change
- Dark mode: all semantic tokens must have a `[data-theme="dark"]` variant
- Typography: use type scale tokens — never hardcode `font-size` or `line-height`
- Never approve a component that uses raw Tailwind colour classes (e.g. `bg-blue-600`) instead of token vars

**Prompt trigger:** `@design-system`

---

### 🎉 QA / Party Mode Agent

**Role:** Full review sweep before any merge to `main` or deploy to production.

**Run this agent when:** a feature is complete, before any Vercel deploy.

**Checklist:**

#### Functionality
- [ ] All interactive elements work as expected
- [ ] Forms validate correctly (client + server side)
- [ ] API routes return correct status codes and error messages
- [ ] Loading states visible during async operations
- [ ] Error states handled gracefully (no blank screens)
- [ ] Empty states handled (no broken layouts with no data)

#### Accessibility
- [ ] Keyboard navigation works across all interactive elements (Tab, Enter, Escape)
- [ ] All images have meaningful `alt` text
- [ ] All form inputs have associated `<label>` elements
- [ ] Colour contrast passes WCAG AA (4.5:1 text, 3:1 UI components)
- [ ] Focus indicators visible and not suppressed
- [ ] `eslint-plugin-jsx-a11y` passes with zero errors
- [ ] `axe-core` audit passes in dev environment

#### Design Fidelity
- [ ] Components match Figma at all defined breakpoints
- [ ] No hardcoded colour or spacing values (token audit)
- [ ] Motion respects `prefers-reduced-motion`
- [ ] Dark mode renders correctly (if applicable)
- [ ] Typography scale is consistent

#### Performance & Code Quality
- [ ] No `console.error` or `console.warn` in production build
- [ ] No unused imports or dead code
- [ ] No `any` TypeScript types
- [ ] Images use `next/image` with correct `width`/`height` or `fill`
- [ ] No hardcoded secrets or API keys in code

#### Pre-Deploy
- [ ] All env vars in `.env.example` are set in Vercel dashboard
- [ ] OG image and meta tags set for all public routes
- [ ] Lighthouse score 90+ across Performance, Accessibility, Best Practices, SEO
- [ ] Tested on real mobile device (not just DevTools)
- [ ] Sentry error monitoring receiving events

**Prompt trigger:** `@qa` or `@party`

---

## Shared Rules (All Agents)

- Always read `PLAN.md` before starting work to understand current sprint goals
- Log significant decisions in `DECISIONS.md` — not just what, but *why*
- If a task is ambiguous, ask one clarifying question before proceeding
- Never introduce a new dependency without flagging it with a brief justification
- Prefer editing existing files over creating new ones when the scope fits
- Keep file sizes focused — if a component or utility is growing, propose a split

---

## Parallel Subagent Strategy

### When to spawn parallel subagents
Use parallel subagents — via "run these as parallel subagents" — when:
- QA sweep covers multiple independent domains (a11y + token audit simultaneously)
- A complex component has two viable architectural approaches worth comparing
- A feature can be decomposed into genuinely independent parts (e.g. API + UI)

### Defined subagent roles

**`a11y-auditor`**
Focus: WCAG compliance, keyboard navigation, ARIA correctness, contrast ratios.
Tools: Read, Grep. No write access.
Returns: table of violations with file, line, severity, and fix.

**`token-auditor`**
Focus: hardcoded values, token misuse, dark mode gaps, naming inconsistencies.
Tools: Read, Grep. No write access.
Returns: grouped violations by file with correct token replacements.

**`implementation-a` / `implementation-b`**
Used with `/parallel-build`. Each receives the same spec.
Each implements independently in its own worktree.
Returns: working implementation + brief summary of approach and trade-offs.

### Subagents vs Agent Teams
- **Subagents** — isolated workers reporting back to you. Use for parallel QA, parallel builds.
- **Agent Teams** — collaborative squad that communicates laterally. Use only for very large features where cross-checking between agents adds genuine value. Token cost is significantly higher.

### Invocation
```
Run a11y-auditor and token-auditor as parallel subagents on components/forms/.
Report back when both are complete.
```
