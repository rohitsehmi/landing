'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'
import { trackEvent } from '@/lib/analytics'

interface LogoBarProps {
  label?: string
  logos: { name: string; src: string }[]
}

interface WaitlistCounterProps {
  count: number
  label?: string
}

// Logo bar — shows company/partner logos
export function LogoBar({ label = 'Trusted by teams at', logos }: LogoBarProps){
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })
  const prefersReduced = useReducedMotion()

  return (
    <div
      ref={ref}
      style={{ textAlign: 'center', padding: 'var(--spacing-12) 0' }}
      onMouseEnter={() => trackEvent({ name: 'social_proof_view', props: { type: 'logo' } })}
    >
      <p style={{
        fontSize: 'var(--text-body-xs)', fontWeight: 600,
        letterSpacing: '0.1em', textTransform: 'uppercase',
        color: 'var(--theme-text-subtle)', marginBottom: 'var(--spacing-8)',
      }}>
        {label}
      </p>
      <div style={{
        display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-10)',
        justifyContent: 'center', alignItems: 'center',
      }}>
        {logos.map((logo, i) => (
          <motion.img
            key={logo.name}
            src={logo.src}
            alt={logo.name}
            height={28}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: prefersReduced ? 1 : 0.5 } : {}}
            whileHover={prefersReduced ? undefined : { opacity: 1 }}
            transition={{ duration: prefersReduced ? 0 : 0.3, delay: prefersReduced ? 0 : i * 0.05 }}
            style={{ filter: 'grayscale(100%)', transition: prefersReduced ? 'none' : 'filter 0.2s' }}
          />
        ))}
      </div>
    </div>
  )
}

// Animated waitlist counter
export function WaitlistCounter({ count, label = 'people already on the waitlist' }: WaitlistCounterProps){
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })
  const prefersReduced = useReducedMotion()
  const [displayed, setDisplayed] = useState(prefersReduced ? count : 0)

  useEffect(() => {
    if (!inView || prefersReduced) return
    trackEvent({ name: 'social_proof_view', props: { type: 'counter' } })

    const duration = 1200
    const start = performance.now()

    function animate(now: number) {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3) // ease out cubic
      setDisplayed(Math.round(eased * count))
      if (progress < 1) requestAnimationFrame(animate)
    }

    requestAnimationFrame(animate)
  }, [inView, count, prefersReduced])

  return (
    <div
      ref={ref}
      style={{ textAlign: 'center', padding: 'var(--spacing-8) 0' }}
      aria-label={`${count} ${label}`}
    >
      <div style={{
        fontSize: 'clamp(3rem, 6vw, 5rem)',
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        color: 'var(--theme-text-default)',
        letterSpacing: '-0.04em',
        lineHeight: 1,
      }}>
        {displayed.toLocaleString()}+
      </div>
      <p style={{
        fontSize: 'var(--text-body-md)',
        color: 'var(--theme-text-muted)',
        marginTop: 'var(--spacing-2)',
      }}>
        {label}
      </p>
    </div>
  )
}
