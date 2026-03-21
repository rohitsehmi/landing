import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

// ─── Redis client ──────────────────────────────────────────────────────────────
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

// ─── Rate limiters ─────────────────────────────────────────────────────────────

// General API — 20 requests per 10 seconds per IP
export const apiLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(20, '10 s'),
  analytics: true,
  prefix: 'ratelimit:api',
})

// Forms (waitlist, contact) — 3 requests per 10 minutes per IP
export const formLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(3, '10 m'),
  analytics: true,
  prefix: 'ratelimit:form',
})

// Auth (login, signup) — 5 requests per 15 minutes per IP
export const authLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, '15 m'),
  analytics: true,
  prefix: 'ratelimit:auth',
})

// ─── Helper ────────────────────────────────────────────────────────────────────
// Usage in API route:
//
// import { formLimiter } from '@/lib/ratelimit'
// import { headers } from 'next/headers'
//
// const ip = (await headers()).get('x-forwarded-for') ?? '127.0.0.1'
// const { success } = await formLimiter.limit(ip)
// if (!success) return Response.json({ error: 'Too many requests' }, { status: 429 })
