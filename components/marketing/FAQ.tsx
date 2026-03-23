'use client'

import { trackEvent } from '@/lib/analytics'
import { FAQSchema } from '@/components/seo/StructuredData'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

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

export function FAQ({ eyebrow, headline = 'Frequently asked questions', items, includeSchema = true }: FAQProps){
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

      <Accordion>
        {items.map((item, i) => (
          <AccordionItem key={item.question} value={item.question}>
            <AccordionTrigger
              onClick={() => trackEvent({ name: 'faq_expand', props: { question: item.question } })}
              data-testid={`faq-trigger-${i}`}
              style={{
              fontSize: 'var(--text-body-md)',
              fontWeight: 600,
              color: 'var(--theme-text-default)',
              textAlign: 'left',
            }}>
              {item.question}
            </AccordionTrigger>
            <AccordionContent style={{
              fontSize: 'var(--text-body-md)',
              color: 'var(--theme-text-muted)',
              lineHeight: 'var(--font-line-height-relaxed)',
            }}>
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  )
}
