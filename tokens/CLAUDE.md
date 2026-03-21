# tokens/CLAUDE.md
> Rules for the token system. Read alongside root CLAUDE.md.

## Hierarchy (strict — never skip a level)
primitives.json → semantic.json → component tokens (optional) → CSS output

## Files
- `primitives.json` — raw values only. No semantic meaning in names.
- `semantic.json` — always reference primitives. Never hardcode values.
- `themes/light.json` + `themes/dark.json` — theme overrides only.
- `typography.json` — font family, size, weight, line-height, letter-spacing.
- `elevation.json` — shadow scale + semantic elevation layer.
- `motion.json` — duration and easing tokens.
- `states.json` — interactive states + density variants.
- `icons.json` — icon size scale + semantic icon colours.
- `deprecated.json` — retired tokens with replacement. Update before removing.

## Rules
- NEVER add a hardcoded value to semantic.json — always reference a primitive
- NEVER use a primitive token directly in a component — always use semantic
- ALL dark mode tokens must have a [data-theme="dark"] variant
- When adding a token, ask: does this belong in primitives or semantic?
- When removing a token: add to deprecated.json first, migrate all usages, then remove

## After any change
Run `npm run tokens:build` to regenerate CSS files.
