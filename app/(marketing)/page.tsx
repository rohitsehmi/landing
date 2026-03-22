'use client'

import { useEffect } from 'react'
import {
  Layers, Compass, Zap,
  BarChart2, PenTool, Repeat,
} from 'lucide-react'

import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/marketing/Hero'
import { StatsBar } from '@/components/marketing/StatsBar'
import { FeatureGrid } from '@/components/marketing/FeatureGrid'
import { Showcase } from '@/components/marketing/Showcase'
import { Testimonials } from '@/components/marketing/Testimonials'
import { FAQ } from '@/components/marketing/FAQ'
import { WaitlistForm } from '@/components/marketing/WaitlistForm'
import { useScrollDepthTracking } from '@/lib/analytics'

// ── Content ───────────────────────────────────────────────────────────────────

const stats = [
  { value: '40+', label: 'Projects shipped' },
  { value: '12', label: 'Retained clients' },
  { value: '3×', label: 'Avg. revenue lift' },
  { value: '6wk', label: 'Brand to launch' },
]

const features = [
  {
    icon: Layers,
    title: 'Brand identity',
    description: 'Marks, wordmarks, colour systems, and brand guidelines built to last beyond the first refresh.',
  },
  {
    icon: Compass,
    title: 'Design systems',
    description: 'Component libraries and token architectures that make every team member faster.',
  },
  {
    icon: PenTool,
    title: 'Art direction',
    description: 'Campaign, editorial, and product visual languages that make your brand unmistakable.',
  },
  {
    icon: Zap,
    title: 'Product design',
    description: 'Interface design and UX strategy grounded in how real people actually use things.',
  },
  {
    icon: BarChart2,
    title: 'Strategy',
    description: 'Positioning, naming, and messaging that gives your visual work something to say.',
  },
  {
    icon: Repeat,
    title: 'Ongoing partnership',
    description: 'Embedded design support for teams who need consistent excellence, not one-off deliverables.',
  },
]

const showcase = [
  {
    eyebrow: '01 / Process',
    headline: 'We start with the problem, not the brief.',
    body: 'Before a single sketch, we spend time understanding the pressures your brand is under — market forces, internal friction, audience shifts. The work follows from that understanding, not from a template.',
  },
  {
    eyebrow: '02 / Systems',
    headline: 'Design systems, not design deliverables.',
    body: 'A logo deck is not a brand. We build the underlying system — the logic, the rules, the tokens — so your brand stays consistent whether it\'s a billboard or a mobile notification.',
  },
]

const testimonials = [
  {
    quote: 'Working with Deesyn felt less like a brief and more like a thought partnership. They asked better questions than we did.',
    author: 'Amara Nwosu',
    role: 'CEO',
    company: 'Forma Studio',
  },
  {
    quote: 'The design system they built for us has cut our product iteration cycle in half. It\'s the best investment we\'ve made.',
    author: 'James Caldwell',
    role: 'Head of Product',
    company: 'Kova',
  },
  {
    quote: 'They pushed back on our assumptions three times in the first week. Every time, they were right. That\'s rare.',
    author: 'Priya Mehta',
    role: 'Founder',
    company: 'Lune Health',
  },
]

const faqs = [
  {
    question: 'What kinds of clients do you work with?',
    answer: 'We work with founders and product teams who take design seriously — typically Series A–C companies, ambitious studios, and established brands going through a meaningful transition. We\'re not the right fit for everyone, and we\'re upfront about that.',
  },
  {
    question: 'How long does a typical engagement take?',
    answer: 'Brand identity projects run 6–10 weeks. Design systems vary from 4 weeks (audit + foundation) to 16 weeks for a full component build. We\'ll scope honestly after a discovery call — no bloated timelines.',
  },
  {
    question: 'Do you take on one-off projects or only retainers?',
    answer: 'Both. We do focused project engagements (brand, system, campaign) and ongoing embedded design partnerships. The latter suits teams who want consistent design excellence without the overhead of a full in-house hire.',
  },
  {
    question: 'What makes Deesyn different from a larger agency?',
    answer: 'You work directly with the people doing the work — no account manager layer, no juniors on the deliverables. We keep our client list small on purpose so every project gets our full attention.',
  },
  {
    question: 'How do we get started?',
    answer: 'Leave your email on the waitlist. We\'ll reach out within a week for a 30-minute discovery call — no pitch, no deck, just an honest conversation about whether we\'re a good fit.',
  },
]

// ── Page ──────────────────────────────────────────────────────────────────────

export default function HomePage() {
  useScrollDepthTracking()

  return (
    <div style={{ background: 'var(--theme-surface-page)', minHeight: '100vh' }}>
      <Header />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(16px, 5vw, 48px)' }}>

        {/* Hero */}
        <div style={{ paddingTop: 60 }}>
          <Hero
            eyebrow="Design consultancy · London"
            headline="Design that earns its place in the world."
            subline="Deesyn partners with founders and product teams to build brands, systems, and experiences that perform as well as they look."
            ctaLabel="Join the waitlist"
            ctaHref="#waitlist"
            badge="Limited availability — Q2 2026"
          />
        </div>

      </div>

      {/* Stats bar — full width */}
      <StatsBar stats={stats} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(16px, 5vw, 48px)' }}>

        {/* Features */}
        <div id="features">
        <FeatureGrid
          eyebrow="What we do"
          headline="Six disciplines. One studio."
          subline="We work across the full surface area of design — from brand logic to interface components."
          features={features}
          columns={3}
        />
        </div>

        {/* Showcase */}
        <Showcase items={showcase} />

        {/* Testimonials */}
        <Testimonials
          eyebrow="Client stories"
          headline="What happens when design is taken seriously."
          testimonials={testimonials}
        />

        {/* FAQ */}
        <div id="faq">
          <FAQ
            eyebrow="Questions"
            headline="The things people usually ask."
            items={faqs}
          />
        </div>

      </div>

      {/* Waitlist CTA — full width */}
      <WaitlistForm
        eyebrow="Early access"
        headline="Be first to work with us."
        subline="We take a limited number of new clients each quarter. Leave your email and we'll be in touch within a week."
        id="waitlist"
      />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(16px, 5vw, 48px)' }}>
        <Footer />
      </div>
    </div>
  )
}
