# Code Connect

> Maps Figma components to their code counterparts.
> Used by Figma's Code Connect feature to show real component code in Dev Mode.

---

## Naming contract

| Figma component name | Code component | File |
|---|---|---|
| Button / [variant] | `<Button>` | `components/ui/button.tsx` |
| Input / [state] | `<Input>` | `components/ui/input.tsx` |
| Card | `<Card>` | `components/ui/card.tsx` |
| Badge / [variant] | `<Badge>` | `components/ui/badge.tsx` |
| [Add as you build] | | |

---

## Token name mapping

| Figma variable | CSS custom property |
|---|---|
| `color/brand/primary` | `--color-brand-primary` |
| `color/surface/default` | `--color-surface-default` |
| `color/text/default` | `--color-text-default` |
| `spacing/4` | `--spacing-4` |
| `[Add as tokens are created]` | |

---

## Setup

```bash
npm install -D @figma/code-connect
npx figma connect publish
```

Add `.figma/` config to project root when Code Connect files are created.
