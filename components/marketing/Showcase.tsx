'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'

interface ShowcaseItem {
  eyebrow: string
  headline: string
  body: string
  reverse?: boolean
}

interface ShowcaseProps {
  items: ShowcaseItem[]
}

function ShowcaseRow({ item, index }: { item: ShowcaseItem; index: number }){
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const prefersReduced = useReducedMotion()
  const reverse = item.reverse ?? index % 2 !== 0

  return (
    <div
      ref={ref}
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 'clamp(32px, 6vw, 80px)',
        alignItems: 'center',
        padding: 'var(--spacing-16) 0',
        borderBottom: '1px solid var(--theme-border-subtle)',
      }}
    >
      {/* Text — swap order via CSS order */}
      <motion.div
        initial={{ opacity: 0, x: prefersReduced ? 0 : (reverse ? 24 : -24) }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{ order: reverse ? 2 : 1 }}
      >
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.6875rem',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--theme-brand-primary)',
          marginBottom: 16,
        }}>
          {item.eyebrow}
        </p>
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
          fontWeight: 400,
          letterSpacing: '-0.025em',
          lineHeight: 1.15,
          color: 'var(--theme-text-default)',
          marginBottom: 20,
        }}>
          {item.headline}
        </h3>
        <p style={{
          fontSize: '1rem',
          color: 'var(--theme-text-muted)',
          lineHeight: 1.7,
          maxWidth: 420,
        }}>
          {item.body}
        </p>
      </motion.div>

      {/* Visual placeholder */}
      <motion.div
        initial={{ opacity: 0, x: prefersReduced ? 0 : (reverse ? -24 : 24) }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{ order: reverse ? 1 : 2 }}
      >
        <div style={{
          aspectRatio: '4/3',
          borderRadius: 'var(--radius-xl)',
          backgroundColor: 'var(--theme-surface-default)',
          border: '1px solid var(--theme-border-default)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          position: 'relative',
        }}>
          {/* Abstract grid decoration */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: `
              linear-gradient(var(--theme-border-subtle) 1px, transparent 1px),
              linear-gradient(90deg, var(--theme-border-subtle) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            opacity: 0.5,
          }} />
          <div style={{
            position: 'relative',
            width: '60%',
            aspectRatio: '1',
            borderRadius: 'var(--radius-xl)',
            backgroundColor: 'var(--theme-surface-subtle)',
            border: '1px solid var(--theme-border-default)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <div style={{
              width: 40, height: 40,
              borderRadius: '50%',
              backgroundColor: 'var(--theme-brand-primary)',
              opacity: 0.15,
            }} />
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export function Showcase({ items }: ShowcaseProps){
  return (
    <section
      id="showcase"
      aria-label="Approach showcase"
      style={{ padding: 'var(--spacing-20) 0' }}
    >
      {items.map((item, i) => (
        <ShowcaseRow key={item.eyebrow} item={item} index={i} />
      ))}
    </section>
  )
}
