'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { ChevronDown } from 'lucide-react'
import { trackEvent } from '@/lib/analytics'
import { FAQSchema } from '@/components/seo/StructuredData'

interface FAQItem {
  question: string
  answer: string
}

interface FAQProps {
  eyebrow?: string
  headline?: string
  items: FAQItem[]
  includeSchema?: boolean
}

export function FAQ({ eyebrow, headline = 'Frequently asked questions', items, includeSchema = true }: FAQProps) {
  const [open, setOpen] = useState<number | null>(null)
  const prefersReduced = useReducedMotion()

  function toggle(i: number) {
    const question = items[i].question
    if (open !== i) {
      trackEvent({ name: 'faq_expand', props: { question } })
    }
    setOpen(open === i ? null : i)
  }

  return (
    <section
      style={{ padding: 'var(--spacing-20) 0', maxWidth: '680px', margin: '0 auto' }}
      aria-labelledby="faq-headline"
    >
      {includeSchema && <FAQSchema questions={items} />}

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
        <h2 id="faq-headline" style={{
          fontSize: 'var(--text-display-lg)', fontFamily: 'var(--font-display)',
          fontWeight: 700, color: 'var(--theme-text-default)', letterSpacing: '-0.02em',
        }}>
          {headline}
        </h2>
      </div>

      <dl>
        {items.map((item, i) => (
          <div
            key={item.question}
            style={{
              borderBottom: '1px solid var(--theme-border-subtle)',
            }}
          >
            <dt>
              <button
                onClick={() => toggle(i)}
                aria-expanded={open === i}
                aria-controls={`faq-answer-${i}`}
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: 'var(--spacing-5) 0',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  gap: 'var(--spacing-4)',
                }}
              >
                <span style={{
                  fontSize: 'var(--text-body-md)',
                  fontWeight: 600,
                  color: 'var(--theme-text-default)',
                }}>
                  {item.question}
                </span>
                <motion.div
                  animate={{ rotate: open === i ? 180 : 0 }}
                  transition={{ duration: prefersReduced ? 0 : 0.2 }}
                  style={{ flexShrink: 0 }}
                >
                  <ChevronDown size={18} style={{ color: 'var(--theme-text-muted)' }} />
                </motion.div>
              </button>
            </dt>
            <AnimatePresence initial={false}>
              {open === i && (
                <motion.dd
                  id={`faq-answer-${i}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: prefersReduced ? 0 : 0.25, ease: 'easeInOut' }}
                  style={{ overflow: 'hidden', margin: 0 }}
                >
                  <p style={{
                    fontSize: 'var(--text-body-md)',
                    color: 'var(--theme-text-muted)',
                    lineHeight: 'var(--font-line-height-relaxed)',
                    paddingBottom: 'var(--spacing-5)',
                  }}>
                    {item.answer}
                  </p>
                </motion.dd>
              )}
            </AnimatePresence>
          </div>
        ))}
      </dl>
    </section>
  )
}
