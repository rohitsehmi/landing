# /deploy-check

Pre-deploy verification for $ARGUMENTS (defaults to full project).
Run before every merge to `main` and Vercel deploy.

## Environment
- [ ] All vars in `.env.example` set in Vercel dashboard
- [ ] No `.env.local` values committed to git
- [ ] `NEXT_PUBLIC_APP_URL` set to production domain
- [ ] Supabase pointing to production instance

## Build
- [ ] `npm run build` passes with zero errors
- [ ] No TypeScript errors (`npx tsc --noEmit`)
- [ ] No ESLint errors
- [ ] No chunk over 500kb

## Code Review
- [ ] `/code-review` run on the PR
- [ ] All issues above 80 confidence resolved
- [ ] No debug code or TODO comments in production paths

## Functionality
- [ ] Auth flow works end-to-end
- [ ] Waitlist form submits and triggers emails
- [ ] Supabase RLS tested — users only see their own data
- [ ] Rate limiting active on all public API routes

## SEO & Sharing
- [ ] `title` and `description` set for all public routes
- [ ] `opengraph-image.tsx` present for key routes
- [ ] OG image tested at opengraph.xyz
- [ ] `robots.txt` and `sitemap.xml` present

## Monitoring
- [ ] Sentry receiving test events
- [ ] Vercel Analytics in root layout
- [ ] Error alert configured

## Final
- [ ] Tested on real mobile device
- [ ] Tested in Safari
- [ ] Lighthouse 90+ on production URL
- [ ] Custom domain + SSL active

## Output
```
ENVIRONMENT     3/4 — ⚠️ NEXT_PUBLIC_APP_URL still localhost
BUILD           4/4 — ✅
CODE REVIEW     2/2 — ✅
FUNCTIONALITY   4/4 — ✅
SEO & SHARING   3/5 — ⚠️ Missing OG on /about
MONITORING      3/3 — ✅
FINAL           2/4 — ⚠️ Lighthouse 84

READY? ❌ — 3 issues to resolve
```

Ask: "Fix blocking issues automatically?"
