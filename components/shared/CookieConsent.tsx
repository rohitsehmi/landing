'use client'

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

type ConsentState = 'pending' | 'accepted' | 'declined'

const CONSENT_KEY = 'cookie-consent'

export function CookieConsent(){
  const [state, setState] = useState<ConsentState | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY) as ConsentState | null
    if (!stored) {
      // Small delay so it doesn't flash on first paint
      setTimeout(() => setVisible(true), 800)
    } else {
      setState(stored)
      if (stored === 'accepted') enableAnalytics()
    }
  }, [])

  function accept() {
    localStorage.setItem(CONSENT_KEY, 'accepted')
    setState('accepted')
    setVisible(false)
    enableAnalytics()
  }

  function decline() {
    localStorage.setItem(CONSENT_KEY, 'declined')
    setState('declined')
    setVisible(false)
  }

  // Enable analytics only after consent
  function enableAnalytics() {
    // Vercel Analytics — consent-aware mode
    if (typeof window !== 'undefined' && (window as any).va) {
      (window as any).va('consent', 'granted')
    }
    // Add any other analytics initialisation here
    // e.g. PostHog, Hotjar — only call after consent
  }

  if (!visible || state !== null) return null

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      aria-live="polite"
      className={cn(
        'fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-lg',
        'rounded-xl border p-5 shadow-xl',
      )}
      style={{
        backgroundColor: 'var(--theme-surface-default)',
        borderColor: 'var(--theme-border-default)',
        boxShadow: 'var(--elevation-modal)',
      }}
    >
      <p
        style={{
          fontSize: '0.875rem',
          lineHeight: 1.6,
          color: 'var(--theme-text-muted)',
          marginBottom: '16px',
        }}
      >
        We use cookies to understand how you use this site and improve your experience.
        See our{' '}
        <a
          href="/privacy"
          data-testid="cookie-privacy-link"
          style={{ color: 'var(--color-brand-primary)', textDecoration: 'underline' }}
        >
          privacy policy
        </a>
        .
      </p>

      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
        <button
          onClick={decline}
          data-testid="cookie-decline"
          style={{
            padding: '8px 16px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--theme-border-default)',
            background: 'transparent',
            color: 'var(--theme-text-muted)',
            fontSize: '0.875rem',
            fontWeight: 500,
            cursor: 'pointer',
          }}
        >
          Decline
        </button>
        <button
          onClick={accept}
          data-testid="cookie-accept"
          style={{
            padding: '8px 16px',
            borderRadius: 'var(--radius-md)',
            border: 'none',
            backgroundColor: 'var(--color-brand-primary)',
            color: 'var(--color-text-on-brand)',
            fontSize: '0.875rem',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Accept
        </button>
      </div>
    </div>
  )
}

// Hook for checking consent status in other components
export function useConsent(): ConsentState {
  const [state, setState] = useState<ConsentState>('pending')

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY) as ConsentState | null
    setState(stored ?? 'pending')
  }, [])

  return state
}
