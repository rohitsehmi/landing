'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'
import { trackEvent } from '@/lib/analytics'

interface Testimonial {
  quote: string
  author: string
  role: string
  company?: string
  avatar?: string
}

interface TestimonialsProps {
  eyebrow?: string
  headline: string
  testimonials: Testimonial[]
}

export function Testimonials({ eyebrow, headline, testimonials }: TestimonialsProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const prefersReduced = useReducedMotion()

  return (
    <section
      ref={ref}
      style={{ padding: 'var(--spacing-20) 0' }}
      aria-labelledby="testimonials-headline"
      onFocus={() => trackEvent({ name: 'social_proof_view', props: { type: 'testimonial' } })}
    >
      <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-12)' }}>
        {eyebrow && (
          <p style={{
            fontSize: 'var(--text-body-xs)', fontWeight: 600,
            letterSpacing: '0.1em', textTransform: 'uppercase',
            color: 'var(--theme-text-muted)', marginBottom: 'var(--spacing-3)',
          }}>
            {eyebrow}
          </p>
        )}
        <h2 id="testimonials-headline" style={{
          fontSize: 'var(--text-display-lg)', fontFamily: 'var(--font-display)',
          fontWeight: 700, color: 'var(--theme-text-default)', letterSpacing: '-0.02em',
        }}>
          {headline}
        </h2>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${Math.min(testimonials.length, 3)}, 1fr)`,
        gap: 'var(--spacing-5)',
      }}>
        {testimonials.map((t, i) => (
          <motion.blockquote
            key={t.author}
            initial={{ opacity: 0, y: prefersReduced ? 0 : 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: prefersReduced ? 0 : i * 0.1 }}
            style={{
              margin: 0,
              padding: 'var(--spacing-8)',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--theme-border-default)',
              backgroundColor: 'var(--theme-surface-default)',
              boxShadow: 'var(--elevation-card)',
            }}
          >
            <p style={{
              fontSize: 'var(--text-body-md)',
              color: 'var(--theme-text-default)',
              lineHeight: 'var(--font-line-height-relaxed)',
              marginBottom: 'var(--spacing-6)',
              fontStyle: 'italic',
            }}>
              &ldquo;{t.quote}&rdquo;
            </p>
            <footer style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)' }}>
              {t.avatar && (
                <img
                  src={t.avatar}
                  alt={`${t.author} avatar`}
                  width={40} height={40}
                  style={{ borderRadius: '50%', flexShrink: 0 }}
                />
              )}
              {!t.avatar && (
                <div style={{
                  width: 40, height: 40, borderRadius: '50%', flexShrink: 0,
                  backgroundColor: 'var(--color-brand-subtle)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 'var(--text-body-sm)', fontWeight: 700,
                  color: 'var(--color-brand-primary)',
                }}>
                  {t.author[0]}
                </div>
              )}
              <div>
                <div style={{
                  fontSize: 'var(--text-body-sm)', fontWeight: 600,
                  color: 'var(--theme-text-default)',
                }}>
                  {t.author}
                </div>
                <div style={{ fontSize: 'var(--text-body-xs)', color: 'var(--theme-text-muted)' }}>
                  {t.role}{t.company && `, ${t.company}`}
                </div>
              </div>
            </footer>
          </motion.blockquote>
        ))}
      </div>
    </section>
  )
}
