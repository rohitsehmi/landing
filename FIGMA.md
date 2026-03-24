# FIGMA.md
> Design system rules for Figma-to-code workflows via MCP. Keep this accurate and concise.

---

## Stack

| Layer | Tool |
|---|---|
| Framework | Next.js 14+ (App Router) |
| Language | TypeScript (strict) |
| Utility CSS | Tailwind CSS v3 |
| Component Variants | Class Variance Authority (CVA) |
| Primitives | Base-UI (unstyled, accessible) |
| Animation | Motion for React |
| Icons | Lucide React |
| Token Pipeline | Style Dictionary v4 (JSON → CSS) |

---

## Token System

### Hierarchy
```
tokens/primitives.json
  → tokens/semantic.json
    → tokens/typography.json
    → tokens/elevation.json
    → tokens/motion.json
    → tokens/states.json
    → tokens/icons.json
    → tokens/themes/light.json   → styles/tokens.css
    → tokens/themes/dark.json    → styles/tokens-dark.css
    → tokens/themes/direction-a.json → styles/tokens-direction-a.css
    → tokens/themes/direction-b.json → styles/tokens-direction-b.css
    → tokens/themes/direction-c.json → styles/tokens-direction-c.css
```

Run `npm run tokens:build` after any token change.

### CSS Selectors
| File | Selector |
|---|---|
| `tokens.css` | `:root, [data-theme='light']` |
| `tokens-dark.css` | `[data-theme='dark']` |
| `tokens-direction-a.css` | `[data-brand='a']` |
| `tokens-direction-b.css` | `[data-brand='b']` |
| `tokens-direction-c.css` | `[data-brand='c']` |

### Token Categories & CSS Variables
```css
/* Colors — brand */
--color-brand-primary
--color-brand-secondary
--color-brand-subtle

/* Colors — surface */
--theme-surface-page
--theme-surface-default
--theme-surface-subtle

/* Colors — text */
--theme-text-default
--theme-text-muted
--theme-text-on-brand

/* Colors — border */
--theme-border-default
--theme-border-subtle
--theme-border-strong

/* Colors — feedback */
--color-feedback-error
--color-feedback-success
--color-feedback-warning
--color-feedback-info

/* Spacing — 4px base scale */
--spacing-1   /* 4px */
--spacing-2   /* 8px */
--spacing-3   /* 12px */
--spacing-4   /* 16px */
--spacing-5   /* 20px */
--spacing-6   /* 24px */
--spacing-8   /* 32px */
--spacing-10  /* 40px */
--spacing-12  /* 48px */
--spacing-16  /* 64px */

/* Radius */
--radius-sm
--radius-md
--radius-lg
--radius-xl
--radius-full

/* Typography */
--font-display    /* Fraunces */
--font-body       /* DM Sans */
--font-mono       /* Geist Mono */
--font-size-xs    /* 0.75rem */
--font-size-sm    /* 0.875rem */
--font-size-base  /* 1rem */
--font-size-lg    /* 1.125rem */
--font-size-xl    /* 1.25rem */
--font-size-2xl   /* 1.5rem */
--font-size-3xl   /* 1.875rem */
--font-size-4xl   /* 2.25rem */
--font-size-5xl   /* 3rem */

/* Elevation */
--elevation-card
--elevation-raised
--elevation-overlay
--elevation-modal

/* Motion */
--motion-duration-instant   /* 0ms */
--motion-duration-fast      /* 150ms */
--motion-duration-normal    /* 250ms */
--motion-duration-slow      /* 400ms */
--motion-duration-slower    /* 600ms */
--motion-easing-default
--motion-easing-in
--motion-easing-out
--motion-easing-spring

/* Icon sizes */
--icon-size-xs   /* 12px */
--icon-size-sm   /* 16px */
--icon-size-md   /* 20px */
--icon-size-lg   /* 24px */
--icon-size-xl   /* 32px */
```

### Tailwind Aliases
These Tailwind utilities map directly to token CSS variables:

```
bg-brand-primary        → var(--color-brand-primary)
bg-surface-default      → var(--theme-surface-default)
text-content-default    → var(--theme-text-default)
text-content-muted      → var(--theme-text-muted)
border-border-default   → var(--theme-border-default)
shadow-card             → var(--elevation-card)
shadow-raised           → var(--elevation-raised)
rounded-sm/md/lg/xl     → var(--radius-*)
font-display            → var(--font-display)
font-body               → var(--font-body)
font-mono               → var(--font-mono)
```

**NEVER** use raw hex values or Tailwind's default color palette (`blue-600`, `gray-100`, etc.) in components. Always use the semantic token aliases above.

---

## Component Rules

### File Locations
```
components/ui/          ← shadcn/Base-UI primitives — NEVER edit directly
components/marketing/   ← Marketing page sections
components/layout/      ← Header, Footer
components/shared/      ← Global providers and utilities
components/forms/       ← Form components
```

### Standard Component Shape
```tsx
interface ComponentProps {
  // All props typed — never use `any`
  className?: string
}

export function Component({ className, ...props }: ComponentProps) {
  return (
    <div className={cn("base-classes", className)} {...props} />
  )
}
```

### Class Merging
Always use `cn()` from `lib/utils.ts` for conditional/merged classes:
```tsx
import { cn } from '@/lib/utils'

className={cn("base", condition && "conditional", className)}
```

### CVA Variants
Use CVA for components with multiple variants:
```tsx
import { cva, type VariantProps } from 'class-variance-authority'

const componentVariants = cva("base-classes", {
  variants: {
    variant: { default: "...", outline: "..." },
    size: { sm: "...", md: "...", lg: "..." }
  },
  defaultVariants: { variant: "default", size: "md" }
})
```

### Icons
Import from `lucide-react`. Use token sizes:
```tsx
import { ArrowRight } from 'lucide-react'

<ArrowRight className="size-4" />   // --icon-size-sm (16px)
<ArrowRight className="size-5" />   // --icon-size-md (20px)
<ArrowRight className="size-6" />   // --icon-size-lg (24px)
```

---

## Animation Rules

Always include a `prefers-reduced-motion` fallback:

```tsx
import { useReducedMotion } from 'motion/react'

function AnimatedComponent() {
  const prefersReduced = useReducedMotion()

  return (
    <motion.div
      initial={{ opacity: 0, y: prefersReduced ? 0 : 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: prefersReduced ? 0 : 0.25 }}
    />
  )
}
```

Use motion tokens for duration/easing — never hardcode values.

---

## Theming

### Theme (Light/Dark)
- Controlled by `ThemeProvider` — sets `data-theme` on `<html>`
- Supports: `light`, `dark`, `system`
- Component code never needs to know the theme — tokens switch automatically

### Brand Direction (A/B/C)
- Controlled by `BrandProvider` — sets `data-brand` on `<html>`
- Direction A: Dark & Precise
- Direction B: Warm & Editorial
- Direction C: Bold & Systemic
- `BrandSwitcher` component visible in dev for testing all three

---

## Fonts
| Role | Family | Variable |
|---|---|---|
| Display/Headings | Fraunces | `font-display` |
| Body | DM Sans | `font-body` |
| Monospace | Geist Mono | `font-mono` |

---

## Figma-to-Code Translation Rules

When converting Figma designs:

1. **Colors** — map Figma token names to CSS variables above. Never use raw hex.
2. **Spacing** — snap to the 4px spacing scale (`--spacing-*`).
3. **Typography** — use `font-display` for headings, `font-body` for body text.
4. **Shadows** — use `shadow-card`, `shadow-raised`, `shadow-overlay`, `shadow-modal`.
5. **Radius** — use `rounded-sm/md/lg/xl/full` (maps to token variables).
6. **Icons** — use Lucide React equivalents; size with `size-*` utilities.
7. **Animations** — use Motion for React with reduced-motion fallback.
8. **Components** — check `components/ui/` first; wrap existing primitives before creating new ones.
9. **Validation** — any form input uses Zod schema from `lib/validations.ts`.
10. **Accessibility** — ARIA labels, keyboard nav, semantic HTML required on all interactive elements.

---

## Absolute Imports
```ts
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { waitlistSchema } from '@/lib/validations'
```

---

## Quality Checks Before Presenting Code
- [ ] No raw hex colors or hardcoded Tailwind palette values
- [ ] No `any` TypeScript types
- [ ] All props have explicit interfaces
- [ ] Semantic tokens used throughout
- [ ] `prefers-reduced-motion` fallback on all animations
- [ ] Loading, error, empty states on all async components
- [ ] `cn()` used for all class merging
- [ ] Accessible markup (ARIA, keyboard nav, semantic HTML)
