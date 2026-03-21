'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'
import { trackEvent } from '@/lib/analytics'
import type { LucideIcon } from 'lucide-react'

interface Feature {
  icon: LucideIcon
  title: string
  description: string
}

interface FeatureGridProps {
  eyebrow?: string
  headline: string
  subline?: string
  features: Feature[]
  columns?: 2 | 3
  className?: string
}

export function FeatureGrid({
  eyebrow, headline, subline, features, columns = 3, className,
}: FeatureGridProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const prefersReduced = useReducedMotion()

  return (
    <section
      ref={ref}
      className={cn('', className)}
      style={{ padding: 'var(--spacing-20) 0' }}
      aria-labelledby="features-headline"
    >
      <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-16)' }}>
        {eyebrow && (
          <p style={{
            fontSize: 'var(--text-body-xs)',
            fontWeight: 'var(--font-weight-semibold)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--theme-text-muted)',
            marginBottom: 'var(--spacing-3)',
          }}>
            {eyebrow}
          </p>
        )}
        <h2
          id="features-headline"
          style={{
            fontSize: 'var(--text-display-lg)',
            fontFamily: 'var(--font-display)',
            fontWeight: 'var(--font-weight-bold)',
            color: 'var(--theme-text-default)',
            letterSpacing: '-0.02em',
            lineHeight: 'var(--font-line-height-tight)',
            marginBottom: subline ? 'var(--spacing-4)' : 0,
          }}
        >
          {headline}
        </h2>
        {subline && (
          <p style={{
            fontSize: 'var(--text-body-lg)',
            color: 'var(--theme-text-muted)',
            maxWidth: '520px',
            margin: '0 auto',
          }}>
            {subline}
          </p>
        )}
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: 'var(--spacing-6)',
      }}>
        {features.map((feature, i) => {
          const Icon = feature.icon
          return (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: prefersReduced ? 0 : 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: prefersReduced ? 0 : i * 0.08 }}
              onViewportEnter={() => trackEvent({ name: 'feature_view', props: { feature: feature.title } })}
              style={{
                padding: 'var(--spacing-8)',
                borderRadius: 'var(--radius-xl)',
                border: '1px solid var(--theme-border-default)',
                backgroundColor: 'var(--theme-surface-default)',
                boxShadow: 'var(--elevation-card)',
              }}
            >
              <div style={{
                width: 44, height: 44,
                borderRadius: 'var(--radius-lg)',
                backgroundColor: 'var(--color-brand-subtle)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 'var(--spacing-4)',
              }}>
                <Icon size={20} style={{ color: 'var(--color-brand-primary)' }} />
              </div>
              <h3 style={{
                fontSize: 'var(--text-body-lg)',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--theme-text-default)',
                marginBottom: 'var(--spacing-2)',
              }}>
                {feature.title}
              </h3>
              <p style={{
                fontSize: 'var(--text-body-sm)',
                color: 'var(--theme-text-muted)',
                lineHeight: 'var(--font-line-height-relaxed)',
              }}>
                {feature.description}
              </p>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
