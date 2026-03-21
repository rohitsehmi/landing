'use client'

import { useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'
import { trackEvent } from '@/lib/analytics'

interface HeroProps {
  eyebrow?: string
  headline: string
  subline: string
  ctaLabel?: string
  ctaHref?: string
  onCtaClick?: () => void
  badge?: string
  className?: string
}

export function Hero({
  eyebrow,
  headline,
  subline,
  ctaLabel = 'Join the waitlist',
  ctaHref = '#waitlist',
  onCtaClick,
  badge,
  className,
}: HeroProps) {
  const prefersReduced = useReducedMotion()

  const variants = {
    hidden: { opacity: 0, y: prefersReduced ? 0 : 20 },
    visible: { opacity: 1, y: 0 },
  }

  function handleCta() {
    trackEvent({ name: 'cta_click', props: { label: ctaLabel, location: 'hero' } })
    onCtaClick?.()
  }

  return (
    <section
      className={cn('relative overflow-hidden', className)}
      aria-labelledby="hero-headline"
      style={{ padding: 'var(--spacing-20) 0' }}
    >
      <div style={{ maxWidth: '760px', margin: '0 auto', textAlign: 'center' }}>

        {eyebrow && (
          <motion.div
            initial="hidden" animate="visible"
            variants={variants} transition={{ duration: 0.4, delay: 0 }}
          >
            <span
              style={{
                display: 'inline-block',
                fontSize: 'var(--font-size-xs)',
                fontWeight: 'var(--font-weight-semibold)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--theme-text-muted)',
                marginBottom: 'var(--spacing-4)',
                padding: '4px 12px',
                borderRadius: 'var(--radius-full)',
                border: '1px solid var(--theme-border-default)',
                backgroundColor: 'var(--theme-surface-subtle)',
              }}
            >
              {eyebrow}
            </span>
          </motion.div>
        )}

        <motion.h1
          id="hero-headline"
          initial="hidden" animate="visible"
          variants={variants} transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            fontSize: 'clamp(2.25rem, 5vw, var(--text-display-2xl))',
            fontFamily: 'var(--font-display)',
            fontWeight: 'var(--font-weight-bold)',
            color: 'var(--theme-text-default)',
            lineHeight: 'var(--font-line-height-tight)',
            letterSpacing: '-0.03em',
            marginBottom: 'var(--spacing-6)',
          }}
        >
          {headline}
        </motion.h1>

        <motion.p
          initial="hidden" animate="visible"
          variants={variants} transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            fontSize: 'var(--text-body-lg)',
            color: 'var(--theme-text-muted)',
            lineHeight: 'var(--font-line-height-relaxed)',
            marginBottom: 'var(--spacing-10)',
            maxWidth: '560px',
            margin: '0 auto var(--spacing-10)',
          }}
        >
          {subline}
        </motion.p>

        <motion.div
          initial="hidden" animate="visible"
          variants={variants} transition={{ duration: 0.5, delay: 0.3 }}
          style={{ display: 'flex', gap: 'var(--spacing-3)', justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <a
            href={ctaHref}
            onClick={handleCta}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '14px 28px',
              borderRadius: 'var(--radius-lg)',
              backgroundColor: 'var(--color-brand-primary)',
              color: 'var(--color-text-on-brand)',
              fontSize: 'var(--text-body-md)',
              fontWeight: 'var(--font-weight-semibold)',
              textDecoration: 'none',
              border: 'none',
              cursor: 'pointer',
              transition: 'opacity var(--motion-duration-fast) var(--motion-easing-default)',
            }}
          >
            {ctaLabel}
          </a>
        </motion.div>

        {badge && (
          <motion.p
            initial="hidden" animate="visible"
            variants={variants} transition={{ duration: 0.5, delay: 0.4 }}
            style={{
              marginTop: 'var(--spacing-4)',
              fontSize: 'var(--text-body-sm)',
              color: 'var(--theme-text-subtle)',
            }}
          >
            {badge}
          </motion.p>
        )}

      </div>
    </section>
  )
}
