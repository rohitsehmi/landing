# DECISIONS.md
> Architecture Decision Records. Log what you chose and *why*.
> Format: date · decision · reason · alternatives considered

---

## Template

### [DATE] — [Decision title]
**Decision:** [What you chose]
**Why:** [Reasoning]
**Alternatives considered:** [What else you looked at]
**Trade-offs:** [What you gave up]

---

## Decisions

### [DATE] — Initial stack
**Decision:** Next.js App Router + Supabase + Vercel
**Why:** Fastest path to production with auth, DB, and deployment in one coherent stack
**Alternatives considered:** Remix, PlanetScale, Railway
**Trade-offs:** Vendor lock-in to Vercel/Supabase ecosystem
