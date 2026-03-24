'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'

interface Stat {
  value: string
  label: string
}

interface StatsBarProps {
  stats: Stat[]
}

export function StatsBar({ stats }: StatsBarProps){
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })
  const prefersReduced = useReducedMotion()

  return (
    <div
      ref={ref}
      style={{
        borderTop: '1px solid var(--theme-border-subtle)',
        borderBottom: '1px solid var(--theme-border-subtle)',
      }}
    >
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${stats.length}, 1fr)`,
        maxWidth: 1200,
        margin: '0 auto',
        padding: '0 clamp(16px, 5vw, 48px)',
      }}>
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: prefersReduced ? 0 : 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: i * 0.07 }}
            style={{
              padding: 'var(--spacing-8) 0',
              textAlign: 'center',
              borderRight: i < stats.length - 1 ? '1px solid var(--theme-border-subtle)' : 'none',
            }}
          >
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
              fontWeight: 400,
              letterSpacing: '-0.03em',
              lineHeight: 1,
              color: 'var(--theme-text-default)',
              marginBottom: 6,
            }}>
              {stat.value}
            </div>
            <div style={{
              fontSize: '0.8125rem',
              color: 'var(--theme-text-muted)',
              letterSpacing: '0.02em',
            }}>
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
