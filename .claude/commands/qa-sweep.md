# /qa-sweep

Run a full QA sweep of $ARGUMENTS (or the entire codebase if no argument given).

## Functionality
- [ ] All interactive elements work as expected
- [ ] Forms validate correctly — client (Zod) and server (API route)
- [ ] API routes return correct status codes and error messages
- [ ] Loading states visible during all async operations
- [ ] Error states handled — no blank screens or unhandled rejections
- [ ] Empty states handled — no broken layouts when data is absent
- [ ] All links and routes resolve — no 404s

## Accessibility
- [ ] Keyboard navigation: Tab, Enter, Escape, Arrow keys all work
- [ ] All images have meaningful `alt` text
- [ ] All form inputs have associated `<label>` or `aria-label`
- [ ] Colour contrast passes WCAG AA — 4.5:1 text, 3:1 UI components
- [ ] Focus indicators visible and not suppressed
- [ ] ARIA roles correct where semantic HTML is insufficient
- [ ] No `eslint-plugin-jsx-a11y` errors

## Design Fidelity
- [ ] Components use semantic design tokens — no hardcoded values
- [ ] Motion respects `prefers-reduced-motion`
- [ ] Dark mode renders correctly
- [ ] Typography scale consistent — no arbitrary font sizes
- [ ] Responsive at all breakpoints

## Code Quality
- [ ] No `console.error` or `console.warn` in production paths
- [ ] No unused imports or dead code
- [ ] No `any` TypeScript types
- [ ] Images use `next/image` with correct sizing
- [ ] No hardcoded secrets anywhere
- [ ] All API routes have Upstash rate limiting

## Output format

```
FUNCTIONALITY   4/7 — ❌ /api/contact returns 500 with no error message
ACCESSIBILITY   6/7 — ❌ <img> on HomePage missing alt text (line 42)
DESIGN FIDELITY 7/7 — ✅
CODE QUALITY    5/6 — ❌ Unused import in UserCard.tsx

READY? ❌ — 3 issues to fix first
```

Ask: "Fix all critical issues automatically?"
