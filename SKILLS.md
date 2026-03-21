# SKILLS.md
> Reusable prompt patterns for this project.
> These are systems, not one-liners. Add to this as you discover what works.

---

## Self-Critique & Output Elevation

Use this after any first-pass generation — component, page, or design decision.
Forces Claude to assess against production standards before presenting.

```
You just generated [X]. Before finalising, grade your own output:

DESIGN
- Does every visual decision reference a semantic token? Flag any hardcoded value.
- Is the typography hierarchy intentional — or just default scale progression?
- Does the spacing feel considered, or is it mechanically consistent?
- Would a senior product designer at Linear, Vercel, or Stripe ship this as-is?

CODE
- Is every prop typed explicitly? No any, no implicit returns.
- Are loading, error, and empty states all handled — not just the happy path?
- Does motion respect prefers-reduced-motion?
- Is there anything that could cause a hydration mismatch?

ACCESSIBILITY
- Does keyboard navigation work through every interactive element?
- Are ARIA attributes semantically correct — not just present?
- Does colour contrast pass WCAG AA at every state (hover, disabled, focus)?

After grading, list what you would change. Make those changes.
Do not present the original — only the improved version.
```

---

## Component Generation

```
Build [ComponentName] in components/[feature]/[ComponentName].tsx

Requirements:
- Semantic tokens only — no hardcoded Tailwind colour classes
- Explicit TypeScript interface, no any
- cn() for all conditional class logic
- Named export, not default
- Variants: [list]
- States: default, hover, focus, active, disabled, loading, error, empty
- Motion: motion/react with useReducedMotion() fallback
- Density: accept density prop (compact | default | comfortable)

After building, run the self-critique standard above.
Then show a usage example.
```

---

## Page Build — First Pass

Enable Extended Thinking before using this.

```
Build the [PageName] page at app/[route]/page.tsx

Work in this exact order:
1. Define semantic structure — sections, hierarchy, content regions
2. Wire all layout to spacing tokens — no arbitrary values
3. Apply typography tokens to every text element
4. Apply surface and border tokens to every container
5. Motion: staggered entrance by section, scroll-triggered reveals,
   micro-interactions on interactive elements. useReducedMotion() on all.
6. Responsive: mobile → tablet → desktop. No layout breaks.
7. Run the self-critique standard in SKILLS.md.

Design direction: [describe aesthetic — reference Figma frame or screenshot]
Avoid: generic layouts, symmetrical grids, default shadcn styling, corporate spacing.
Reference: /style-guide for token values.
```

---

## Design Decision — Extended Thinking

Always enable Extended Thinking before using this.

```
I need a design decision on [topic].

Context:
- [What you are building and who uses it]
- [Current constraints — token system, component library, existing patterns]
- [What you have already tried or considered]

Evaluate properly:
- What are the real trade-offs, not just the obvious ones?
- What breaks downstream if we choose X over Y?
- What would a Lead Designer at Linear, Vercel, or Stripe decide — and why?
- Are there options we have not considered?

Give a recommendation with reasoning.
Flag anything that should be logged in DECISIONS.md.
```

---

## Token System Audit — Deep

For full system reasoning, beyond the /token-audit slash command.

```
Audit the entire token system across tokens/ and styles/ for:

ARCHITECTURE
- Are all primitives truly atomic — no semantic meaning baked in?
- Is the semantic layer complete — every component state has a token?
- Are dark mode overrides comprehensive — no light-mode values leaking?
- Are motion tokens used — or are animations hardcoded?

CONSISTENCY
- Are naming conventions consistent across all token files?
- Are there duplicate values that should reference each other?
- Are deprecated tokens still being referenced anywhere in code?

GAPS
- What component states exist in code with no corresponding token?
- What density variants are missing?
- Are elevation tokens correctly wired in tailwind.config.ts?

Output: grouped by category, severity (critical / warning / suggestion), file and line.
Prioritised fix list. Ask before making changes.
```

---

## Supabase — Full Type Safety

```
Write a Supabase query for [describe what you need].

Requirements:
- Server client from lib/supabase/server.ts
- Fully typed using Database type from types/supabase.ts — no casting
- RLS-aware — does not bypass user context unless explicitly using service client
- Error handling: distinguish between empty result and query failure
- Return shape: typed interface defined above the function
- If paginated: accept page and pageSize, return PaginatedResponse<T>

After writing, explain:
- Which RLS policy this query relies on
- What happens if the user is not authenticated
- What index should exist on this table for performance
```

---

## API Route — Production Grade

```
Build an API route at app/api/[route]/route.ts

Requirements:
- Rate limiting via the correct limiter from lib/ratelimit.ts
- Zod validation from lib/validations.ts
- Typed with ApiResponse<T> from types/index.ts
- Supabase service client for DB operations
- Error handling: 400 validation, 401 auth, 429 rate limit, 500 server
- No sensitive data in client-facing error messages
- console.error with full context on server errors

After building, list:
- Limiter applied and its threshold
- Zod schema validating input
- Supabase table affected and RLS policies that apply
```

---

## Motion — Page Choreography

Enable Extended Thinking before using this.

```
Design the motion system for [PageName / feature].

Principles:
- Motion communicates hierarchy — what enters first signals importance
- Entrance: staggered by section, not by element. Sections enter as units.
- Scroll: reveal on viewport entry. Not on load.
- Interaction: micro-animations must feel instant (<150ms)
- Exit: only animate exits that matter (modal close, toast dismiss, page transition)

Use motion tokens from tokens/motion.json for all duration and easing.
Wrap everything in useReducedMotion() — if reduced, snap to final state instantly.

Deliver:
1. Motion narrative — the intended feeling in plain language
2. Implementation — motion/react with correct token references
3. Self-critique — intentional or decorative?
```

---

## Case Study — Design Process Documentation

```
Build a full design case study at app/case-studies/[slug]/page.tsx for [project/feature].

Structure:
1. Problem — what was broken or missing, and for whom
2. Constraints — technical, time, resource, user
3. Research — what signals informed the direction
4. Exploration — directions considered and why they were rejected
5. Decision — what was chosen and the reasoning
6. Implementation — specific technical or design decisions worth documenting
7. Iterations — what changed after first build and why
8. Outcome — measurable or qualitative result
9. Lessons — what you would do differently

Design: editorial, long-form, generous whitespace. Not a slide deck.
Typography: display font for section headers, body font for prose.
Semantic tokens throughout. No hardcoded values.

Self-critique after building: does this read like a thoughtful designer's thinking,
or like a feature list? Rewrite any section that sounds like documentation.
```

---

## Figma → Code Fidelity Check

```
Compare [ComponentName / PageName] implementation against the Figma design.

Check:
- Spacing: all gaps and padding matching Figma variable values?
- Typography: font size, weight, line height, letter spacing — exact?
- Colour: every surface, text, border referencing the correct semantic token?
- Radius: matching radius tokens?
- Elevation: shadows matching elevation tokens?
- States: hover, focus, active, disabled — matching Figma component variants?
- Motion: matching the intent from the Figma prototype?

Output: table of mismatches — Figma value vs code value vs correct token.
Fix all mismatches. Re-check after.
```

---

## Refactor — Design System Compliance

```
Refactor [ComponentName] to full design system compliance.

Fix:
- Replace all hardcoded values with semantic tokens
- Add missing states: [list which]
- Add density variants if absent
- Complete and explicit TypeScript interface
- Motion: entrance + interaction states if missing
- ARIA attributes: semantically correct, not just present
- data-testid on all interactive elements

Constraints:
- Do not change external API (prop names, exported function name)
- Do not change visual output — only the implementation
- If a token does not exist for a value, flag it — do not invent one

After refactoring:
- Run self-critique standard
- List any tokens that were missing and need adding to the system
```

---

## Landing Page — Full Build

Enable Extended Thinking before using this.

```
Build the marketing landing page at app/(marketing)/(home)/page.tsx

Import and use components from components/marketing/:
  Hero, FeatureGrid, Testimonials, LogoBar, WaitlistCounter, FAQ

Required sections in this order:
1. Hero — headline, subline, waitlist CTA, eyebrow label
2. LogoBar or WaitlistCounter — social proof above the fold
3. FeatureGrid — 3 or 6 features in a grid, with icons from lucide-react
4. Testimonials — 3 testimonials (write compelling placeholder copy)
5. FAQ — 5–7 questions with FAQSchema for SEO rich results
6. Final CTA — repeat the waitlist form with urgency copy

Structured data:
- WebsiteSchema and OrganizationSchema already in layout.tsx
- FAQSchema is built into the FAQ component (includeSchema=true)
- Add SoftwareAppSchema to page.tsx if this is a SaaS product

Analytics:
- trackEvent is wired into all marketing components automatically
- Add useScrollDepthTracking() in a useEffect in the page

A/B testing:
- Read variant from cookies for the hero headline:
  const cookieStore = await cookies()
  const variant = getVariantFromCookies(cookieStore.toString(), 'hero-headline')
  const headline = variant === 'b' ? '[VARIANT_B_HEADLINE]' : '[DEFAULT_HEADLINE]'

Design direction: [describe the aesthetic — reference Figma or screenshot]
Avoid: generic SaaS layouts, purple gradients, symmetrical grids, stock photography.
Reference: /style-guide for all token values.

After building, run self-critique from SKILLS.md.
Ask: does this feel like a top-10 product in its category, or like a template?
```

---

## OG Image — Custom Design

```
Redesign app/opengraph-image.tsx for Landing.

Requirements:
- Edge runtime (already set)
- 1200x630px
- Uses next/og ImageResponse
- No external font loading (use system fonts or base64 encoded font)
- Reflects the actual brand — colour, typography, tone
- Shows: project name, tagline, and a clear CTA hint
- Works in both light contexts (Twitter) and dark (Discord, Slack)

Design direction: [describe — dark/light, minimal/editorial, etc.]

After building, test at: https://www.opengraph.xyz
```
