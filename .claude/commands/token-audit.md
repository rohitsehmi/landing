# /token-audit

Audit $ARGUMENTS (or all of /components/ if no argument given) for design token compliance.

## What to check

1. **Hardcoded colours** — flag any Tailwind colour classes (e.g. `bg-blue-600`, `text-gray-900`) that should be CSS custom properties
2. **Hardcoded spacing** — flag arbitrary Tailwind values (e.g. `mt-[24px]`) that should reference spacing tokens
3. **Hardcoded font sizes** — flag `text-sm`, `text-lg` etc. not mapped to type scale tokens
4. **Hardcoded border radius** — flag `rounded-lg` etc. that should use radius tokens
5. **Missing dark mode** — flag semantic token usage with no `[data-theme="dark"]` variant

## Output format

```
components/ui/Button.tsx
  ❌ bg-blue-600 → should be var(--color-brand-primary)
  ❌ text-white → should be var(--color-text-on-brand)

components/shared/Card.tsx
  ✅ No violations found
```

Summarise total violations. Prioritise by frequency.
Ask: "Fix all automatically, fix by file, or just report?"
