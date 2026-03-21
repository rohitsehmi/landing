// Analytics event tracking — Vercel Analytics + extensible for PostHog/Hotjar
// Import and call these at key interaction points in your landing page
// Only fires after cookie consent is granted

import { track } from '@vercel/analytics'

// ── Event types ────────────────────────────────────────────────────────────────
export type AnalyticsEvent =
  | { name: 'waitlist_submit';     props: { location: string } }
  | { name: 'cta_click';          props: { label: string; location: string } }
  | { name: 'scroll_depth';       props: { depth: 25 | 50 | 75 | 100 } }
  | { name: 'pricing_view';       props: { plan?: string } }
  | { name: 'faq_expand';         props: { question: string } }
  | { name: 'social_proof_view';  props: { type: 'testimonial' | 'logo' | 'counter' } }
  | { name: 'feature_view';       props: { feature: string } }
  | { name: 'exit_intent';        props: { page: string } }

// ── Track function ─────────────────────────────────────────────────────────────
export function trackEvent(event: AnalyticsEvent) {
  try {
    // Vercel Analytics
    track(event.name, event.props)

    // PostHog — uncomment if using PostHog
    // if (typeof window !== 'undefined' && (window as any).posthog) {
    //   (window as any).posthog.capture(event.name, event.props)
    // }

  } catch (err) {
    // Never throw — analytics should never break the page
    console.warn('[analytics] Failed to track event:', err)
  }
}

// ── Scroll depth tracking ──────────────────────────────────────────────────────
// Add to your marketing layout or root layout
export function useScrollDepthTracking() {
  if (typeof window === 'undefined') return

  const depths = new Set<number>()
  const thresholds = [25, 50, 75, 100] as const

  function onScroll() {
    const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100

    for (const threshold of thresholds) {
      if (scrolled >= threshold && !depths.has(threshold)) {
        depths.add(threshold)
        trackEvent({ name: 'scroll_depth', props: { depth: threshold } })
      }
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true })
  return () => window.removeEventListener('scroll', onScroll)
}

// ── Exit intent ────────────────────────────────────────────────────────────────
export function useExitIntent(page: string) {
  if (typeof window === 'undefined') return

  let fired = false

  function onMouseLeave(e: MouseEvent) {
    if (e.clientY <= 0 && !fired) {
      fired = true
      trackEvent({ name: 'exit_intent', props: { page } })
    }
  }

  document.addEventListener('mouseleave', onMouseLeave)
  return () => document.removeEventListener('mouseleave', onMouseLeave)
}
