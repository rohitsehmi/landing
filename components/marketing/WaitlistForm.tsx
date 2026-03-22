'use client'

import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { trackEvent } from '@/lib/analytics'

interface WaitlistFormProps {
  eyebrow?: string
  headline?: string
  subline?: string
  id?: string
}

export function WaitlistForm({
  eyebrow = 'Early access',
  headline = 'Be first to work with us.',
  subline = 'We take a limited number of new clients each quarter. Leave your email and we\'ll be in touch.',
  id = 'waitlist',
}: WaitlistFormProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const prefersReduced = useReducedMotion()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email || status === 'loading') return
    setStatus('loading')

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
      trackEvent({ name: 'waitlist_submit', props: { location: id } })
    } catch {
      setStatus('error')
    }
  }

  return (
    <section
      id={id}
      aria-labelledby="waitlist-headline"
      style={{
        padding: 'var(--spacing-24, 96px) clamp(16px, 5vw, 48px)',
        backgroundColor: 'var(--theme-surface-default)',
        borderTop: '1px solid var(--theme-border-subtle)',
        borderBottom: '1px solid var(--theme-border-subtle)',
      }}
    >
      <div style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center' }}>
        {eyebrow && (
          <p style={{
            fontSize: '0.6875rem',
            fontWeight: 600,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--theme-brand-primary)',
            marginBottom: 16,
            fontFamily: 'var(--font-mono)',
          }}>
            {eyebrow}
          </p>
        )}
        <h2
          id="waitlist-headline"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
            fontWeight: 400,
            letterSpacing: '-0.025em',
            lineHeight: 1.1,
            color: 'var(--theme-text-default)',
            marginBottom: 16,
          }}
        >
          {headline}
        </h2>
        <p style={{
          fontSize: '1rem',
          color: 'var(--theme-text-muted)',
          lineHeight: 1.65,
          marginBottom: 36,
          maxWidth: 480,
          margin: '0 auto 36px',
        }}>
          {subline}
        </p>

        {status === 'success' ? (
          <motion.div
            initial={{ opacity: 0, scale: prefersReduced ? 1 : 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              padding: '16px 24px',
              borderRadius: 'var(--brand-radius, var(--radius-md))',
              backgroundColor: 'var(--theme-surface-subtle)',
              border: '1px solid var(--theme-border-default)',
              color: 'var(--theme-text-default)',
              fontSize: '0.9375rem',
            }}
          >
            You're on the list. We'll be in touch.
          </motion.div>
        ) : (
          <form
            onSubmit={handleSubmit}
            style={{ display: 'flex', gap: 0, maxWidth: 440, margin: '0 auto' }}
            aria-label="Waitlist signup form"
          >
            <label htmlFor="waitlist-email" style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0,0,0,0)' }}>
              Email address
            </label>
            <input
              id="waitlist-email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              disabled={status === 'loading'}
              style={{
                flex: 1,
                padding: '12px 16px',
                fontSize: '0.9375rem',
                color: 'var(--theme-text-default)',
                backgroundColor: 'var(--theme-surface-page)',
                border: '1px solid var(--theme-border-default)',
                borderRight: 'none',
                borderRadius: 'var(--brand-radius, var(--radius-md)) 0 0 var(--brand-radius, var(--radius-md))',
                outline: 'none',
                fontFamily: 'var(--font-body)',
              }}
            />
            <button
              type="submit"
              disabled={status === 'loading' || !email}
              style={{
                padding: '12px 22px',
                backgroundColor: 'var(--theme-brand-primary)',
                color: 'var(--theme-text-on-brand, #fff)',
                border: 'none',
                borderRadius: '0 var(--brand-radius, var(--radius-md)) var(--brand-radius, var(--radius-md)) 0',
                fontSize: '0.875rem',
                fontWeight: 500,
                letterSpacing: '0.02em',
                cursor: status === 'loading' ? 'wait' : 'pointer',
                fontFamily: 'var(--font-body)',
                whiteSpace: 'nowrap',
                opacity: status === 'loading' ? 0.7 : 1,
              }}
            >
              {status === 'loading' ? 'Sending…' : 'Notify me'}
            </button>
          </form>
        )}

        {status === 'error' && (
          <p role="alert" style={{ marginTop: 12, fontSize: '0.875rem', color: 'var(--state-error-color, #dc2626)' }}>
            Something went wrong — please try again.
          </p>
        )}
      </div>
    </section>
  )
}
