# Spacing

> Defines what each spacing value means semantically.
> All values map to `tokens/primitives.json` spacing scale.

---

## Scale

| Token | Value | Semantic meaning | Use for |
|---|---|---|---|
| `spacing.1` | 4px | Micro | Icon gap, tight badge padding |
| `spacing.2` | 8px | XSmall | Input internal padding Y, inline gap |
| `spacing.3` | 12px | Small | Input internal padding X, compact list item gap |
| `spacing.4` | 16px | Base | Default component internal padding, form field gap |
| `spacing.5` | 20px | Medium | Card internal padding (compact) |
| `spacing.6` | 24px | Large | Card internal padding (default), section element gap |
| `spacing.8` | 32px | XLarge | Section internal padding, between-component gap |
| `spacing.10` | 40px | 2XLarge | Page section padding (mobile) |
| `spacing.12` | 48px | 3XLarge | Page section padding (tablet) |
| `spacing.16` | 64px | 4XLarge | Page section padding (desktop) |
| `spacing.20` | 80px | 5XLarge | Hero section spacing |
| `spacing.24` | 96px | 6XLarge | Max hero/feature spacing |

---

## Rules

- **Internal padding** → use component density tokens
- **External margin** → prefer layout gap/grid, avoid direct margin
- **Section padding** → always use page-level spacing tokens
- **Never use arbitrary values** — if the scale doesn't have it, update and document why
