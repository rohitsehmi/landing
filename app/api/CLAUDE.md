# app/api/CLAUDE.md
> Rules specific to API routes. Read alongside root CLAUDE.md.

## Every API route must have
1. Rate limiting — import correct limiter from `lib/ratelimit.ts`
2. Zod validation — schema in `lib/validations.ts`
3. Typed response — use `ApiResponse<T>` from `types/index.ts`
4. Error handling — distinguish 400 / 401 / 429 / 500
5. No sensitive data in client-facing error messages
6. `console.error` with context on 500 errors (not just the error object)

## Client selection
- `createClient()` from `lib/supabase/server.ts` — for user-scoped queries (respects RLS)
- `createServiceClient()` — for admin operations only (bypasses RLS — use sparingly)
- NEVER import browser client in API routes

## Pattern
```ts
// 1. Rate limit
const ip = (await headers()).get('x-forwarded-for') ?? '127.0.0.1'
const { success } = await limiter.limit(ip)
if (!success) return NextResponse.json({ error: 'Too many requests' }, { status: 429 })

// 2. Validate
const parsed = schema.safeParse(await request.json())
if (!parsed.success) return NextResponse.json({ error: parsed.error.errors[0].message }, { status: 400 })

// 3. Execute + respond
```
