# /test

Write tests for $ARGUMENTS following project conventions.

## Determine what to write

For a **utility function** (lib/utils.ts, lib/validations.ts):
- Vitest unit tests in tests/unit/[filename].test.ts
- Test: happy path, edge cases, invalid input, boundary conditions
- No mocks unless absolutely necessary — test the real function

For an **API route**:
- Vitest unit tests for the route handler logic
- Mock: Supabase client, Resend, Upstash
- Test: valid input, invalid input, rate limit, auth failure, DB error

For a **component**:
- Playwright E2E test for critical user interactions
- Test: renders correctly, keyboard navigation, form submission, error states

For a **critical user flow**:
- Playwright E2E in tests/e2e/[feature].spec.ts
- Test: happy path end-to-end, validation errors, edge cases

## Rules
- Tests must be readable — test names describe behaviour in plain English
- No `describe` nesting more than 2 levels deep
- No testing implementation details — test behaviour and outcomes
- Each test must be independent — no shared state between tests
- Use `data-testid` attributes for targeting elements in E2E tests

## After writing tests
Run them: `npm run test` or `npm run test:e2e`
Fix any failures before presenting.
Report: X tests written, X passing, X failing (with reasons).
