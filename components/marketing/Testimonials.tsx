'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'
import { trackEvent } from '@/lib/analytics'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

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

export function Testimonials({ eyebrow, headline, testimonials }: TestimonialsProps){
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
          <motion.div
            key={t.author}
            initial={{ opacity: 0, y: prefersReduced ? 0 : 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: prefersReduced ? 0 : i * 0.1 }}
          >
            <Card
              style={{
                backgroundColor: 'var(--theme-surface-default)',
                borderColor: 'var(--theme-border-default)',
                boxShadow: 'var(--elevation-card)',
                height: '100%',
              }}
              role="figure"
              aria-label={`Testimonial from ${t.author}`}
            >
              <CardContent style={{ padding: 'var(--spacing-8)' }}>
                <blockquote>
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
                    <Avatar>
                      {t.avatar && <AvatarImage src={t.avatar} alt={t.author} />}
                      <AvatarFallback style={{
                        backgroundColor: 'var(--theme-surface-subtle)',
                        color: 'var(--theme-brand-primary)',
                        fontWeight: 700,
                        fontSize: 'var(--text-body-sm)',
                      }}>
                        {t.author[0]}
                      </AvatarFallback>
                    </Avatar>
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
                </blockquote>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
