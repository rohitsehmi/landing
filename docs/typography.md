# Typography

> Documents the type system — scale, families, responsive behaviour.
> All values map to `tokens/typography.json`.

---

## Font Families

| Role | Token | Usage |
|---|---|---|
| Display | `font.family.display` | Headings, hero text, pull quotes |
| Body | `font.family.body` | All body copy, UI labels, inputs |
| Mono | `font.family.mono` | Code blocks, technical strings |

Set font variables in `app/layout.tsx` using `next/font`.

---

## Type Scale

| Token | Size | Usage |
|---|---|---|
| `text.display.2xl` | 3.75rem | Hero headings |
| `text.display.xl` | 3rem | Page titles |
| `text.display.lg` | 2.25rem | Section headings |
| `text.display.md` | 1.875rem | Card titles, sub-headings |
| `text.display.sm` | 1.5rem | Widget headings |
| `text.body.lg` | 1.125rem | Lead paragraph, large UI |
| `text.body.md` | 1rem | Default body copy |
| `text.body.sm` | 0.875rem | Secondary copy, labels |
| `text.body.xs` | 0.75rem | Captions, metadata, badges |

---

## Responsive Type

Display tokens scale down at mobile breakpoints:

| Token | Desktop | Mobile |
|---|---|---|
| `text.display.2xl` | 3.75rem | 2.25rem |
| `text.display.xl` | 3rem | 1.875rem |
| `text.display.lg` | 2.25rem | 1.5rem |

Implement using Tailwind responsive prefixes with token values.

---

## Rules

- Never hardcode `font-size` or `line-height` — always use tokens
- Display font for headings only — not UI labels or body copy
- Mono font for code blocks and technical content only
- Minimum body text: `text.body.sm` (0.875rem / 14px) — never smaller in production UI
