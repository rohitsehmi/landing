# Component Spec Template

> Copy this file to `docs/components/[ComponentName].md` for each new component.
> Fill in before building — spec first, code second.

---

## [ComponentName]

**Status:** Draft / Review / Stable / Deprecated
**Owner:** Deesyn
**Last updated:** [DATE]

---

## Purpose

[One sentence — what this component does and why it exists]

---

## Anatomy

List the parts that make up this component:

1. **Root** — the outer wrapper
2. **[Part name]** — [what it does]
3. **[Part name]** — [what it does]

---

## Variants

| Variant | Description | When to use |
|---|---|---|
| `default` | [description] | [guidance] |
| `[variant]` | [description] | [guidance] |

---

## States

| State | Visual change | Notes |
|---|---|---|
| Default | — | Base appearance |
| Hover | [description] | |
| Focus | Focus ring via state tokens | Keyboard/screen reader |
| Active | [description] | On press |
| Disabled | 40% opacity, not-allowed cursor | |
| Loading | Skeleton or spinner | |
| Error | Error border + text | |
| Empty | Empty state UI | When no data |

---

## Density

| Density | Padding | Font size |
|---|---|---|
| Compact | `density.compact.spacing-x/y` | `density.compact.font-size` |
| Default | `density.default.spacing-x/y` | `density.default.font-size` |
| Comfortable | `density.comfortable.spacing-x/y` | `density.comfortable.font-size` |

---

## Responsive behaviour

| Breakpoint | Behaviour |
|---|---|
| Mobile (<768px) | [how it changes] |
| Tablet (768–1024px) | [how it changes] |
| Desktop (>1024px) | Default |

---

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `className` | `string` | — | Additional CSS classes |
| `[prop]` | `[type]` | `[default]` | [description] |

---

## Tokens used

List all CSS custom properties this component references:
- `--color-brand-primary`
- `--[token-name]`

---

## Accessibility

- [ ] Keyboard navigable
- [ ] ARIA role: `[role if needed]`
- [ ] aria-label: required / optional / not needed
- [ ] Screen reader: [what it announces]

---

## Do / Don't

**Do:**
- [guidance]

**Don't:**
- [guidance]

---

## Figma

[Link to Figma component]
