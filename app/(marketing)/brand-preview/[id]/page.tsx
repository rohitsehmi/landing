import Link from 'next/link'
import { notFound } from 'next/navigation'

// ── Full-screen direction previews ────────────────────────────────────────────

const directions = {
  a: {
    id: 'A',
    name: 'Dark & Precise',
    refs: 'Pentagram · Sagmeister & Walsh',
    bg: '#0C0C0C',
    surface: '#161616',
    border: '#2A2A2A',
    text: '#F2EDE6',
    textMuted: '#7A7068',
    accent: '#C9A96E',
    accentFg: '#0C0C0C',
    navItems: ['Work', 'Approach', 'Studio'],
    headline: 'Design that\ncommands attention.',
    subline: 'Deesyn shapes brands and products that earn their place in the world.',
    cta: 'Get early access',
    ctaSecondary: 'See our work',
    tag: 'Est. 2024 · London',
    stat1: { value: '40+', label: 'Projects shipped' },
    stat2: { value: '12', label: 'Clients retained' },
    stat3: { value: '3×', label: 'Avg. revenue lift' },
    pullquote: 'We don\'t decorate businesses.\nWe build design systems that perform.',
    serviceItems: ['Brand identity', 'Design systems', 'Product design', 'Art direction'],
    logoStyle: {
      fontFamily: 'var(--font-display, Georgia, serif)',
      fontSize: '1rem',
      fontWeight: 300,
      letterSpacing: '0.2em',
      textTransform: 'uppercase' as const,
      color: '#F2EDE6',
    },
    headingXl: {
      fontFamily: 'var(--font-display, Georgia, serif)',
      fontSize: 'clamp(2.5rem, 6vw, 5rem)',
      fontWeight: 300,
      letterSpacing: '-0.035em',
      lineHeight: 1.06,
      color: '#F2EDE6',
      whiteSpace: 'pre-line' as const,
    },
    headingMd: {
      fontFamily: 'var(--font-display, Georgia, serif)',
      fontSize: 'clamp(1.375rem, 3vw, 2rem)',
      fontWeight: 300,
      letterSpacing: '-0.025em',
      lineHeight: 1.2,
      color: '#F2EDE6',
    },
    body: {
      fontFamily: 'var(--font-body, system-ui, sans-serif)',
      fontSize: '1rem',
      fontWeight: 400,
      letterSpacing: '0.005em',
      lineHeight: 1.65,
      color: '#7A7068',
    },
    label: {
      fontFamily: 'var(--font-mono, monospace)',
      fontSize: '0.6875rem',
      letterSpacing: '0.14em',
      textTransform: 'uppercase' as const,
      color: '#C9A96E',
    },
    btnPrimary: {
      background: '#C9A96E',
      color: '#0C0C0C',
      border: 'none',
      borderRadius: 2,
      padding: '12px 24px',
      fontSize: '0.875rem',
      fontWeight: 500,
      letterSpacing: '0.02em',
      cursor: 'pointer',
      fontFamily: 'var(--font-body, system-ui, sans-serif)',
      display: 'inline-block',
      textDecoration: 'none',
    },
    btnSecondary: {
      background: 'transparent',
      color: '#7A7068',
      border: '1px solid #2A2A2A',
      borderRadius: 2,
      padding: '11px 24px',
      fontSize: '0.875rem',
      fontWeight: 400,
      letterSpacing: '0.02em',
      cursor: 'pointer',
      fontFamily: 'var(--font-body, system-ui, sans-serif)',
      display: 'inline-block',
      textDecoration: 'none',
    },
  },
  b: {
    id: 'B',
    name: 'Warm & Editorial',
    refs: 'Wolff Olins · Bureau Borsche',
    bg: '#FAF7F2',
    surface: '#F0EAE0',
    border: '#DDD5C8',
    text: '#1C1814',
    textMuted: '#7C7068',
    accent: '#D94F30',
    accentFg: '#FAF7F2',
    navItems: ['Work', 'Approach', 'Studio'],
    headline: 'Design with a\npoint of view.',
    subline: 'Deesyn partners with people who want their brand to mean something.',
    cta: 'Join the waitlist',
    ctaSecondary: 'View selected work',
    tag: 'Design Consultancy',
    stat1: { value: '40+', label: 'Projects shipped' },
    stat2: { value: '12', label: 'Clients retained' },
    stat3: { value: '3×', label: 'Avg. revenue lift' },
    pullquote: 'Great design isn\'t a veneer.\nIt\'s the argument your brand makes every day.',
    serviceItems: ['Brand identity', 'Design systems', 'Product design', 'Art direction'],
    logoStyle: {
      fontFamily: 'var(--font-display, Georgia, serif)',
      fontSize: '1.125rem',
      fontWeight: 500,
      letterSpacing: '0.02em',
      color: '#1C1814',
    },
    headingXl: {
      fontFamily: 'var(--font-display, Georgia, serif)',
      fontSize: 'clamp(2.5rem, 6vw, 5rem)',
      fontWeight: 400,
      letterSpacing: '-0.025em',
      lineHeight: 1.1,
      color: '#1C1814',
      whiteSpace: 'pre-line' as const,
    },
    headingMd: {
      fontFamily: 'var(--font-display, Georgia, serif)',
      fontSize: 'clamp(1.375rem, 3vw, 2rem)',
      fontWeight: 400,
      letterSpacing: '-0.02em',
      lineHeight: 1.2,
      color: '#1C1814',
    },
    body: {
      fontFamily: 'var(--font-body, system-ui, sans-serif)',
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.65,
      color: '#7C7068',
    },
    label: {
      fontFamily: 'var(--font-body, system-ui, sans-serif)',
      fontSize: '0.6875rem',
      fontWeight: 700,
      letterSpacing: '0.1em',
      textTransform: 'uppercase' as const,
      color: '#D94F30',
    },
    btnPrimary: {
      background: '#D94F30',
      color: '#FAF7F2',
      border: 'none',
      borderRadius: 4,
      padding: '12px 24px',
      fontSize: '0.875rem',
      fontWeight: 500,
      letterSpacing: '0.01em',
      cursor: 'pointer',
      fontFamily: 'var(--font-body, system-ui, sans-serif)',
      display: 'inline-block',
      textDecoration: 'none',
    },
    btnSecondary: {
      background: 'transparent',
      color: '#7C7068',
      border: '1px solid #DDD5C8',
      borderRadius: 4,
      padding: '11px 24px',
      fontSize: '0.875rem',
      fontWeight: 400,
      cursor: 'pointer',
      fontFamily: 'var(--font-body, system-ui, sans-serif)',
      display: 'inline-block',
      textDecoration: 'none',
    },
  },
  c: {
    id: 'C',
    name: 'Bold & Systemic',
    refs: 'Experimental Jetset · 2×4',
    bg: '#F8F8F8',
    surface: '#EEEEEE',
    border: '#D0D0D0',
    text: '#0A0A0A',
    textMuted: '#5C5C5C',
    accent: '#0F00E8',
    accentFg: '#F8F8F8',
    navItems: ['Work', 'Approach', 'Studio'],
    headline: 'Systems that\nthink. Design\nthat proves it.',
    subline: 'Deesyn builds rigorous visual systems for brands that need to scale.',
    cta: 'Request access',
    ctaSecondary: 'Selected work →',
    tag: '01 / Deesyn',
    stat1: { value: '40+', label: 'Projects' },
    stat2: { value: '12', label: 'Retained' },
    stat3: { value: '3×', label: 'Revenue' },
    pullquote: 'A design system is a theory of your brand.\nWe make it rigorous.',
    serviceItems: ['Brand identity', 'Design systems', 'Product design', 'Art direction'],
    logoStyle: {
      fontFamily: 'var(--font-body, system-ui, sans-serif)',
      fontSize: '0.9375rem',
      fontWeight: 700,
      letterSpacing: '0.14em',
      textTransform: 'uppercase' as const,
      color: '#0A0A0A',
    },
    headingXl: {
      fontFamily: 'var(--font-display, Georgia, serif)',
      fontSize: 'clamp(2.5rem, 6vw, 5rem)',
      fontWeight: 600,
      letterSpacing: '-0.045em',
      lineHeight: 0.97,
      color: '#0A0A0A',
      whiteSpace: 'pre-line' as const,
    },
    headingMd: {
      fontFamily: 'var(--font-display, Georgia, serif)',
      fontSize: 'clamp(1.375rem, 3vw, 2rem)',
      fontWeight: 600,
      letterSpacing: '-0.04em',
      lineHeight: 1.1,
      color: '#0A0A0A',
    },
    body: {
      fontFamily: 'var(--font-body, system-ui, sans-serif)',
      fontSize: '1rem',
      fontWeight: 400,
      letterSpacing: '-0.005em',
      lineHeight: 1.55,
      color: '#5C5C5C',
    },
    label: {
      fontFamily: 'var(--font-mono, monospace)',
      fontSize: '0.6875rem',
      letterSpacing: '0.08em',
      textTransform: 'uppercase' as const,
      color: '#0F00E8',
    },
    btnPrimary: {
      background: '#0A0A0A',
      color: '#F8F8F8',
      border: 'none',
      borderRadius: 0,
      padding: '12px 24px',
      fontSize: '0.8125rem',
      fontWeight: 500,
      letterSpacing: '0.06em',
      textTransform: 'uppercase' as const,
      cursor: 'pointer',
      fontFamily: 'var(--font-body, system-ui, sans-serif)',
      display: 'inline-block',
      textDecoration: 'none',
    },
    btnSecondary: {
      background: 'transparent',
      color: '#0A0A0A',
      border: 'none',
      borderRadius: 0,
      padding: '12px 0',
      fontSize: '0.8125rem',
      fontWeight: 400,
      letterSpacing: '0.04em',
      cursor: 'pointer',
      fontFamily: 'var(--font-body, system-ui, sans-serif)',
      display: 'inline-block',
      textDecoration: 'none',
    },
  },
} as const

type DirectionKey = keyof typeof directions

export default async function BrandDirectionPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const key = id.toLowerCase() as DirectionKey
  const d = directions[key]
  if (!d) notFound()

  const isLight = d.bg !== '#0C0C0C'

  return (
    <div style={{ background: d.bg, minHeight: '100vh', fontFamily: 'var(--font-body, system-ui, sans-serif)' }}>

      {/* ── Nav ── */}
      <nav style={{ padding: '0 48px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: `1px solid ${d.border}` }}>
        <span style={d.logoStyle}>Deesyn</span>
        <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
          {d.navItems.map(item => (
            <span key={item} style={{ fontFamily: 'var(--font-body, system-ui, sans-serif)', fontSize: '0.875rem', color: d.textMuted, cursor: 'pointer' }}>
              {item}
            </span>
          ))}
          <span style={{ ...d.btnPrimary, padding: '8px 16px', fontSize: '0.8125rem' }}>
            {d.cta}
          </span>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section style={{ padding: 'clamp(64px, 10vw, 120px) 48px clamp(80px, 12vw, 160px)', maxWidth: 1200, margin: '0 auto' }}>
        <p style={{ ...d.label, marginBottom: 28 }}>{d.tag}</p>
        <h1 style={{ ...d.headingXl, maxWidth: 800, marginBottom: 28 }}>{d.headline}</h1>
        <p style={{ ...d.body, maxWidth: 480, marginBottom: 40, fontSize: '1.0625rem' }}>{d.subline}</p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={d.btnPrimary}>{d.cta}</span>
          <span style={d.btnSecondary}>{d.ctaSecondary}</span>
        </div>
      </section>

      {/* ── Stats ── */}
      <section style={{ borderTop: `1px solid ${d.border}`, borderBottom: `1px solid ${d.border}` }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 48px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
          {[d.stat1, d.stat2, d.stat3].map((s, i) => (
            <div key={i} style={{ padding: '36px 0', borderRight: i < 2 ? `1px solid ${d.border}` : 'none', paddingRight: i < 2 ? 48 : 0, paddingLeft: i > 0 ? 48 : 0 }}>
              <p style={{ ...d.headingMd, marginBottom: 6 }}>{s.value}</p>
              <p style={{ ...d.body, fontSize: '0.875rem' }}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Pull quote ── */}
      <section style={{ padding: 'clamp(64px, 10vw, 120px) 48px', maxWidth: 1200, margin: '0 auto' }}>
        <p style={{ ...d.label, marginBottom: 24 }}>Approach</p>
        <blockquote style={{ ...d.headingMd, maxWidth: 720, whiteSpace: 'pre-line', fontStyle: 'normal', marginBottom: 32 }}>
          {d.pullquote}
        </blockquote>
        <p style={{ ...d.body, maxWidth: 560 }}>
          Every engagement starts with understanding the system before touching the surface. We work upstream — strategy, structure, language — before a single pixel is placed.
        </p>
      </section>

      {/* ── Services ── */}
      <section style={{ borderTop: `1px solid ${d.border}`, padding: 'clamp(48px, 8vw, 96px) 48px', maxWidth: 1200, margin: '0 auto' }}>
        <p style={{ ...d.label, marginBottom: 32 }}>Services</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
          {d.serviceItems.map((s, i) => (
            <div key={s} style={{ padding: '20px 24px', background: d.surface, borderRadius: d.id === 'C' ? 0 : d.id === 'A' ? 2 : 4 }}>
              <p style={{ ...d.label, marginBottom: 8 }}>{String(i + 1).padStart(2, '0')}</p>
              <p style={{ fontFamily: 'var(--font-body, system-ui, sans-serif)', fontSize: '0.9375rem', fontWeight: 500, color: d.text, letterSpacing: d.id === 'C' ? '-0.02em' : 0 }}>{s}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Waitlist CTA ── */}
      <section style={{ borderTop: `1px solid ${d.border}`, padding: 'clamp(64px, 10vw, 120px) 48px', maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 32 }}>
        <div>
          <p style={{ ...d.label, marginBottom: 16 }}>Early access</p>
          <h2 style={{ ...d.headingMd, maxWidth: 400, marginBottom: 12 }}>Be first to work with us.</h2>
          <p style={{ ...d.body, maxWidth: 360, fontSize: '0.9375rem' }}>
            We take a limited number of new clients each quarter. Leave your email and we'll be in touch.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 0, flexShrink: 0 }}>
          <input
            placeholder="your@email.com"
            style={{
              background: d.surface,
              border: `1px solid ${d.border}`,
              borderRight: 'none',
              borderRadius: d.id === 'C' ? 0 : d.id === 'A' ? '2px 0 0 2px' : '4px 0 0 4px',
              padding: '12px 16px',
              fontSize: '0.875rem',
              color: d.text,
              fontFamily: 'var(--font-body, system-ui, sans-serif)',
              width: 240,
              outline: 'none',
            }}
          />
          <span style={{ ...d.btnPrimary, borderRadius: d.id === 'C' ? 0 : d.id === 'A' ? '0 2px 2px 0' : '0 4px 4px 0', padding: '12px 20px' }}>
            Notify me
          </span>
        </div>
      </section>

      {/* ── Back bar ── */}
      <div style={{ borderTop: `1px solid ${d.border}`, padding: '16px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link
          href="/brand-preview"
          style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '0.6875rem', letterSpacing: '0.1em', color: d.textMuted, textDecoration: 'none' }}
        >
          ← Back to comparison
        </Link>
        <span style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '0.6875rem', letterSpacing: '0.08em', color: d.textMuted }}>
          Direction {d.id} · {d.name}
        </span>
      </div>

    </div>
  )
}
