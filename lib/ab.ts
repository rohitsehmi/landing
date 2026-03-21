// A/B testing — Vercel Edge Config + middleware
// Uses cookies to persist variant assignment across requests
// Zero client-side JS — assignment happens at the edge

export type Variant = 'a' | 'b'

export interface Experiment {
  id: string
  variants: readonly ['a', 'b']
  weights?: [number, number] // [0.5, 0.5] = 50/50 split
}

// Define experiments here
export const EXPERIMENTS = {
  'hero-headline': {
    id: 'hero-headline',
    variants: ['a', 'b'] as const,
    weights: [0.5, 0.5],
  },
  'cta-label': {
    id: 'cta-label',
    variants: ['a', 'b'] as const,
    weights: [0.5, 0.5],
  },
} satisfies Record<string, Experiment>

export type ExperimentId = keyof typeof EXPERIMENTS

// Assign a variant based on weights
export function assignVariant(weights: [number, number] = [0.5, 0.5]): Variant {
  return Math.random() < weights[0] ? 'a' : 'b'
}

// Cookie name for an experiment
export function experimentCookie(id: string): string {
  return `ab_${id}`
}

// Read variant from cookie string (for use in Server Components)
export function getVariantFromCookies(
  cookies: string,
  experimentId: ExperimentId
): Variant | null {
  const cookieName = experimentCookie(experimentId)
  const match = cookies.match(new RegExp(`${cookieName}=([ab])`))
  return (match?.[1] as Variant) ?? null
}

// Example usage in a Server Component:
//
// import { cookies } from 'next/headers'
// import { getVariantFromCookies } from '@/lib/ab'
//
// const cookieStore = await cookies()
// const variant = getVariantFromCookies(
//   cookieStore.toString(),
//   'hero-headline'
// )
// const headline = variant === 'b'
//   ? 'The faster way to ship'
//   : 'Ship better products'
