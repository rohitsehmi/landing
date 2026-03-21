# components/CLAUDE.md
> Rules specific to the components folder. Read alongside root CLAUDE.md.

## Structure
- `ui/` — shadcn primitives. NEVER edit directly. Always wrap.
- `shared/` — used across multiple features (ThemeProvider, SkipToContent, etc.)
- `layout/` — Header, Footer, page-level layout components
- `forms/` — form components with Zod validation
- `[feature]/` — components scoped to a specific feature

## Every component must have
- Explicit TypeScript interface for all props — no `any`
- Named export (not default)
- `cn()` for all conditional class logic
- Semantic token usage — no hardcoded Tailwind colour classes
- Loading state (if async)
- Error state (if async)
- Empty state (if data can be absent)
- Motion with `useReducedMotion()` fallback (if animated)
- `data-testid` on all interactive elements

## File naming
- PascalCase: `UserCard.tsx`, `WaitlistForm.tsx`
- Co-locate types in same file unless shared
- Export shared types from `types/index.ts`
