# CLAUDE.md
> Claude Code reads this at the start of every session. Keep it accurate and concise.

---

## Project Overview

**Name:** Landing
**Description:** Marketing and waitlist site for Deesyn, a design consultancy.
**Status:** Planning
**Owner:** Deesyn

---

## Stack

| Layer | Tool |
|---|---|
| Framework | Next.js 14+ (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + CSS custom properties |
| Components | shadcn/ui |
| Motion | Motion for React |
| Design Tokens | Style Dictionary |
| Database | Supabase |
| Auth | Supabase Auth |
| Email | Resend + React Email |
| Rate Limiting | Upstash Redis |
| Deployment | Vercel |

---

## Folder Structure

```
/
├── app/                    # Next.js App Router
│   ├── (auth)/             # Auth route group
│   ├── (marketing)/        # Public-facing pages
│   ├── (app)/              # Authenticated app pages
│   ├── api/                # API routes
│   └── layout.tsx          # Root layout
├── components/
│   ├── ui/                 # shadcn primitives — DO NOT edit directly
│   ├── [feature]/          # Feature-specific components
│   └── shared/             # Shared/global components
├── emails/                 # React Email templates
├── lib/
│   ├── supabase/           # Supabase client helpers
│   ├── utils.ts            # Shared utility functions
│   └── validations.ts      # Zod schemas
├── tokens/                 # Raw design token JSON (W3C format)
├── styles/
│   ├── globals.css         # CSS custom properties output
│   └── tokens.css          # Generated token output from Style Dictionary
├── public/                 # Static assets
├── CLAUDE.md               # This file
├── AGENTS.md               # BMAD agent context (Cursor)
├── PLAN.md                 # Roadmap and sprint goals
├── DECISIONS.md            # Architecture decisions
└── SKILLS.md               # Reusable prompt patterns
```

---

## Naming Conventions

- **Components:** PascalCase — `UserCard.tsx`, `WaitlistForm.tsx`
- **Hooks:** camelCase with `use` prefix — `useAuth.ts`, `useTokens.ts`
- **Utilities:** camelCase — `formatDate.ts`, `cn.ts`
- **API routes:** kebab-case — `/api/waitlist-submit`
- **CSS variables:** kebab-case, semantic layering — `--color-surface-default`
- **Types/interfaces:** PascalCase with descriptive suffix — `UserProfile`, `ApiResponse`
- **Supabase tables:** snake_case — `waitlist_entries`, `user_profiles`

---

## Design Token Conventions

Tokens follow a **primitive → semantic** layering pattern:

```css
/* Primitives — never use directly in components */
--color-blue-600: #2563eb;

/* Semantic — always use these in components */
--color-brand-primary: var(--color-blue-600);
--color-surface-default: var(--color-neutral-50);
```

Run `npm run tokens:build` to regenerate CSS from token JSON after any Figma export.

---

## Component Conventions

- All new components use **TypeScript** with explicit prop interfaces
- Use `cn()` utility for conditional class merging (from `lib/utils.ts`)
- Prefer **CSS custom properties** over hardcoded Tailwind colour values
- Wrap shadcn primitives rather than editing them directly
- Motion: always include `prefers-reduced-motion` fallback

```tsx
// Standard component shape
interface ComponentProps {
  // props here
}

export function Component({ ...props }: ComponentProps) {
  return (...)
}
```

---

## Rules — What Claude Should and Shouldn't Do

**DO:**
- Follow the folder structure above strictly
- Use semantic tokens, not primitive colours
- Add TypeScript types for all props and API responses
- Write accessible markup (ARIA labels, keyboard nav, semantic HTML)
- Add loading, error, and empty states to every data-fetching component
- Use Zod for all form and API validation
- Self-critique every output against the standards in `SKILLS.md` before presenting
- For complex UI tasks (full pages, design system decisions, motion systems, architecture)
  — enable **Extended Thinking** before prompting for noticeably better output quality

**DON'T:**
- Edit files in `components/ui/` directly — wrap them instead
- Hardcode colours, spacing, or font sizes outside of token variables
- Use `any` as a TypeScript type
- Create new API routes without rate limiting via Upstash
- Add new dependencies without flagging it first
- Present a first draft as final — always run the self-critique pass

---

## Quality Bar

This project is held to a high production standard. The reference points are:
**Linear, Vercel, Stripe** — considered design, precise engineering, nothing gratuitous.

When in doubt on a design or code decision, ask: would a senior engineer or lead designer
at one of those companies ship this? If not, iterate before presenting.

---

## Environment Variables

See `.env.example` for full list. Core vars:

```bash
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
RESEND_API_KEY
UPSTASH_REDIS_REST_URL
UPSTASH_REDIS_REST_TOKEN
NEXT_PUBLIC_APP_URL
```

---

## Current Focus

> Update this section at the start of each session or when context shifts.

**Working on:** Initial setup
**Avoid touching:** components/ui/
**Blocked by:** Env vars (Supabase, Resend, Upstash) not yet configured

---

## Gotchas & Notes

> Add project-specific quirks here as you discover them.

- [ ] [e.g. Supabase RLS policies must be set before testing auth flows]
- [ ] [e.g. Token rebuild required after any Figma variable change]

---

## Workflow Rules

### Plan Mode — mandatory for complex tasks
For any task touching more than 2 files, introducing a new pattern, or with unclear scope:
1. Run `/plan` first — produce a written plan before any code
2. Review and approve the plan explicitly
3. Only then implement
4. If the approach changes during implementation, update the plan and flag it

Never skip this under time pressure. A bad plan costs more than writing one.

### Context Window — the 60% rule
Context quality degrades measurably above 60% usage.

Split all complex work into four phases with `/compact` between each:
```
Research → Plan → Implement → Validate
```

- Use `/context-check` to monitor usage during long sessions
- Save decisions to `DECISIONS.md` before compacting
- Never start a new major feature in a context already heavy from another task
- Use `/clear` between unrelated features — do not carry stale context forward

### Parallel execution — use it
For complex components or uncertain approaches:
- Use `/parallel-build 2` to get two independent implementations
- Compare approaches and merge the winner
- LLM non-determinism is a feature, not a bug — exploit it

### Session hygiene
- Name sessions descriptively when starting: `/rename [feature-name]`
- Run `/common-ground` at the start of any session resuming previous work
- Commit after each stable, working state — not just at end of session
- Run `/token-audit components/[changed-folder]` after any component work
