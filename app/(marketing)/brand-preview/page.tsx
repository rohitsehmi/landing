'use client'

import Link from 'next/link'

// ── Brand Direction Preview ───────────────────────────────────────────────────
// Self-contained comparison page. No token rebuild required.
// Visit /brand-preview in dev to compare all three directions.

type Swatch = { name: string; value: string }

interface Direction {
  id: string
  name: string
  refs: string
  headline: string
  subline: string
  cta: string
  bg: string
  surface: string
  surfaceHover: string
  border: string
  text: string
  textMuted: string
  accent: string
  accentFg: string
  swatches: Swatch[]
  typeSamples: { label: string; sample: string; style: React.CSSProperties }[]
  btnStyle: React.CSSProperties
  logoStyle: React.CSSProperties
  badgeStyle: React.CSSProperties
  dividerColor: string
}

const directions: Direction[] = [
  // ── A: Dark & Precise ──────────────────────────────────────────────────────
  {
    id: 'A',
    name: 'Dark & Precise',
    refs: 'Pentagram · Sagmeister & Walsh',
    headline: 'Design that\ncommands attention.',
    subline: 'Deesyn shapes brands and products that earn their place in the world.',
    cta: 'Get early access',
    bg: '#0C0C0C',
    surface: '#161616',
    surfaceHover: '#1C1C1C',
    border: '#2A2A2A',
    text: '#F2EDE6',
    textMuted: '#7A7068',
    accent: '#C9A96E',
    accentFg: '#0C0C0C',
    swatches: [
      { name: 'Page',    value: '#0C0C0C' },
      { name: 'Surface', value: '#161616' },
      { name: 'Text',    value: '#F2EDE6' },
      { name: 'Muted',   value: '#7A7068' },
      { name: 'Accent',  value: '#C9A96E' },
    ],
    typeSamples: [
      {
        label: 'Display',
        sample: 'Craft, not\ncommodity.',
        style: {
          fontFamily: 'var(--font-display, Georgia, serif)',
          fontSize: '1.625rem',
          fontWeight: 300,
          letterSpacing: '-0.03em',
          lineHeight: 1.08,
          color: '#F2EDE6',
        },
      },
      {
        label: 'Body',
        sample: 'We work with founders and teams who believe design is a strategic advantage, not a deliverable.',
        style: {
          fontFamily: 'var(--font-body, system-ui, sans-serif)',
          fontSize: '0.875rem',
          fontWeight: 400,
          letterSpacing: '0.005em',
          lineHeight: 1.65,
          color: '#7A7068',
        },
      },
      {
        label: 'Label',
        sample: 'EST. 2024 · LONDON',
        style: {
          fontFamily: 'var(--font-mono, monospace)',
          fontSize: '0.6875rem',
          fontWeight: 400,
          letterSpacing: '0.14em',
          lineHeight: 1.4,
          color: '#C9A96E',
        },
      },
    ],
    btnStyle: {
      background: '#C9A96E',
      color: '#0C0C0C',
      border: 'none',
      borderRadius: 2,
      padding: '10px 20px',
      fontSize: '0.8125rem',
      fontWeight: 500,
      letterSpacing: '0.02em',
      cursor: 'pointer',
      fontFamily: 'var(--font-body, system-ui, sans-serif)',
    },
    logoStyle: {
      fontFamily: 'var(--font-display, Georgia, serif)',
      fontSize: '1.0625rem',
      fontWeight: 300,
      letterSpacing: '0.18em',
      textTransform: 'uppercase' as const,
      color: '#F2EDE6',
    },
    badgeStyle: {
      fontFamily: 'var(--font-mono, monospace)',
      fontSize: '0.625rem',
      letterSpacing: '0.14em',
      color: '#C9A96E',
      textTransform: 'uppercase' as const,
      border: '1px solid #2A2A2A',
      padding: '3px 8px',
      borderRadius: 2,
    },
    dividerColor: '#2A2A2A',
  },

  // ── B: Warm & Editorial ────────────────────────────────────────────────────
  {
    id: 'B',
    name: 'Warm & Editorial',
    refs: 'Wolff Olins · Bureau Borsche',
    headline: 'Design with a\npoint of view.',
    subline: 'Deesyn partners with people who want their brand to mean something.',
    cta: 'Join the waitlist',
    bg: '#FAF7F2',
    surface: '#F0EAE0',
    surfaceHover: '#EAE3D8',
    border: '#DDD5C8',
    text: '#1C1814',
    textMuted: '#7C7068',
    accent: '#D94F30',
    accentFg: '#FAF7F2',
    swatches: [
      { name: 'Page',    value: '#FAF7F2' },
      { name: 'Surface', value: '#F0EAE0' },
      { name: 'Text',    value: '#1C1814' },
      { name: 'Muted',   value: '#7C7068' },
      { name: 'Accent',  value: '#D94F30' },
    ],
    typeSamples: [
      {
        label: 'Display',
        sample: 'Ideas that\nfeel inevitable.',
        style: {
          fontFamily: 'var(--font-display, Georgia, serif)',
          fontSize: '1.625rem',
          fontWeight: 400,
          letterSpacing: '-0.025em',
          lineHeight: 1.12,
          color: '#1C1814',
        },
      },
      {
        label: 'Body',
        sample: 'We believe design is a form of argument. Every choice is intentional, every system earns its reason to exist.',
        style: {
          fontFamily: 'var(--font-body, system-ui, sans-serif)',
          fontSize: '0.875rem',
          fontWeight: 400,
          letterSpacing: '0',
          lineHeight: 1.65,
          color: '#7C7068',
        },
      },
      {
        label: 'Label',
        sample: 'Design Consultancy',
        style: {
          fontFamily: 'var(--font-body, system-ui, sans-serif)',
          fontSize: '0.6875rem',
          fontWeight: 600,
          letterSpacing: '0.1em',
          lineHeight: 1.4,
          textTransform: 'uppercase' as const,
          color: '#D94F30',
        },
      },
    ],
    btnStyle: {
      background: '#D94F30',
      color: '#FAF7F2',
      border: 'none',
      borderRadius: 4,
      padding: '10px 20px',
      fontSize: '0.8125rem',
      fontWeight: 500,
      letterSpacing: '0.01em',
      cursor: 'pointer',
      fontFamily: 'var(--font-body, system-ui, sans-serif)',
    },
    logoStyle: {
      fontFamily: 'var(--font-display, Georgia, serif)',
      fontSize: '1.25rem',
      fontWeight: 500,
      letterSpacing: '0.02em',
      color: '#1C1814',
    },
    badgeStyle: {
      fontFamily: 'var(--font-body, system-ui, sans-serif)',
      fontSize: '0.625rem',
      fontWeight: 700,
      letterSpacing: '0.1em',
      color: '#D94F30',
      textTransform: 'uppercase' as const,
      background: '#F0EAE0',
      padding: '3px 8px',
      borderRadius: 2,
    },
    dividerColor: '#DDD5C8',
  },

  // ── C: Bold & Systemic ─────────────────────────────────────────────────────
  {
    id: 'C',
    name: 'Bold & Systemic',
    refs: 'Experimental Jetset · 2×4',
    headline: 'Systems that\nthink. Design\nthat proves it.',
    subline: 'Deesyn builds rigorous visual systems for brands that need to scale.',
    cta: 'Request access',
    bg: '#F8F8F8',
    surface: '#EEEEEE',
    surfaceHover: '#E5E5E5',
    border: '#D0D0D0',
    text: '#0A0A0A',
    textMuted: '#5C5C5C',
    accent: '#0F00E8',
    accentFg: '#F8F8F8',
    swatches: [
      { name: 'Page',    value: '#F8F8F8' },
      { name: 'Surface', value: '#EEEEEE' },
      { name: 'Text',    value: '#0A0A0A' },
      { name: 'Muted',   value: '#5C5C5C' },
      { name: 'Accent',  value: '#0F00E8' },
    ],
    typeSamples: [
      {
        label: 'Display',
        sample: 'No decoration.\nOnly structure.',
        style: {
          fontFamily: 'var(--font-display, Georgia, serif)',
          fontSize: '1.625rem',
          fontWeight: 600,
          letterSpacing: '-0.045em',
          lineHeight: 1.0,
          color: '#0A0A0A',
        },
      },
      {
        label: 'Body',
        sample: 'Design is a system of decisions. We make them explicit, then make them beautiful.',
        style: {
          fontFamily: 'var(--font-body, system-ui, sans-serif)',
          fontSize: '0.875rem',
          fontWeight: 400,
          letterSpacing: '-0.005em',
          lineHeight: 1.55,
          color: '#5C5C5C',
        },
      },
      {
        label: 'Label',
        sample: '01 / DEESYN',
        style: {
          fontFamily: 'var(--font-mono, monospace)',
          fontSize: '0.6875rem',
          fontWeight: 400,
          letterSpacing: '0.08em',
          lineHeight: 1.4,
          color: '#0F00E8',
        },
      },
    ],
    btnStyle: {
      background: '#0A0A0A',
      color: '#F8F8F8',
      border: 'none',
      borderRadius: 0,
      padding: '10px 20px',
      fontSize: '0.8125rem',
      fontWeight: 500,
      letterSpacing: '0.04em',
      textTransform: 'uppercase' as const,
      cursor: 'pointer',
      fontFamily: 'var(--font-body, system-ui, sans-serif)',
    },
    logoStyle: {
      fontFamily: 'var(--font-body, system-ui, sans-serif)',
      fontSize: '1rem',
      fontWeight: 700,
      letterSpacing: '0.12em',
      textTransform: 'uppercase' as const,
      color: '#0A0A0A',
    },
    badgeStyle: {
      fontFamily: 'var(--font-mono, monospace)',
      fontSize: '0.625rem',
      letterSpacing: '0.08em',
      color: '#0F00E8',
      background: '#EEEEEE',
      padding: '3px 8px',
      borderRadius: 0,
    },
    dividerColor: '#D0D0D0',
  },
]

// ── Component ─────────────────────────────────────────────────────────────────

function Swatch({ name, value }: { name: string; value: string }) {
  const isLight = parseInt(value.slice(1), 16) > 0x888888
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1 }}>
      <div
        style={{
          background: value,
          height: 32,
          borderRadius: 3,
          border: isLight ? '1px solid rgba(0,0,0,0.08)' : 'none',
        }}
      />
      <span style={{ fontSize: '0.625rem', color: '#888', letterSpacing: '0.04em', fontFamily: 'var(--font-mono, monospace)' }}>
        {name}
      </span>
    </div>
  )
}

function DirectionCard({ d }: { d: Direction }) {
  return (
    <div
      style={{
        background: '#1A1A1A',
        borderRadius: 8,
        overflow: 'hidden',
        border: '1px solid #2A2A2A',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Direction label */}
      <div style={{ padding: '16px 20px 14px', borderBottom: '1px solid #2A2A2A', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <span style={{ color: '#555', fontSize: '0.6875rem', fontFamily: 'var(--font-mono, monospace)', letterSpacing: '0.06em', marginRight: 8 }}>
            {d.id}
          </span>
          <span style={{ color: '#DDD', fontSize: '0.875rem', fontWeight: 500, fontFamily: 'var(--font-body, system-ui, sans-serif)' }}>
            {d.name}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ color: '#555', fontSize: '0.6875rem', fontFamily: 'var(--font-mono, monospace)', letterSpacing: '0.04em' }}>
            {d.refs}
          </span>
          <Link
            href={`/brand-preview/${d.id.toLowerCase()}`}
            style={{
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '0.6875rem',
              letterSpacing: '0.08em',
              color: '#888',
              textDecoration: 'none',
              border: '1px solid #333',
              padding: '3px 9px',
              borderRadius: 2,
              whiteSpace: 'nowrap',
            }}
          >
            Full preview →
          </Link>
        </div>
      </div>

      {/* Hero mock */}
      <div style={{ background: d.bg, padding: '24px 24px 28px', position: 'relative' }}>
        {/* Nav */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 36 }}>
          <span style={d.logoStyle}>Deesyn</span>
          <span style={d.badgeStyle}>Beta</span>
        </div>

        {/* Headline */}
        <h2
          style={{
            fontFamily: 'var(--font-display, Georgia, serif)',
            fontSize: '1.875rem',
            fontWeight: d.id === 'C' ? 600 : d.id === 'A' ? 300 : 400,
            letterSpacing: d.id === 'A' ? '-0.03em' : d.id === 'C' ? '-0.045em' : '-0.025em',
            lineHeight: d.id === 'C' ? 1.0 : 1.1,
            color: d.text,
            whiteSpace: 'pre-line',
            margin: '0 0 16px',
          }}
        >
          {d.headline}
        </h2>

        {/* Subline */}
        <p
          style={{
            fontFamily: 'var(--font-body, system-ui, sans-serif)',
            fontSize: '0.875rem',
            lineHeight: 1.6,
            color: d.textMuted,
            margin: '0 0 24px',
            maxWidth: 280,
          }}
        >
          {d.subline}
        </p>

        {/* CTA */}
        <button style={d.btnStyle}>{d.cta}</button>
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: '#222' }} />

      {/* Swatches */}
      <div style={{ padding: '16px 20px' }}>
        <p style={{ fontSize: '0.625rem', color: '#555', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'var(--font-mono, monospace)', marginBottom: 10 }}>
          Palette
        </p>
        <div style={{ display: 'flex', gap: 6 }}>
          {d.swatches.map(s => (
            <Swatch key={s.name} {...s} />
          ))}
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: '#222' }} />

      {/* Type specimens */}
      <div style={{ padding: '16px 20px 20px', background: d.bg, flex: 1 }}>
        <p
          style={{
            fontSize: '0.625rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            fontFamily: 'var(--font-mono, monospace)',
            marginBottom: 16,
            color: d.textMuted,
          }}
        >
          Type
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {d.typeSamples.map(ts => (
            <div key={ts.label}>
              <p
                style={{
                  fontSize: '0.5625rem',
                  color: d.accent,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  fontFamily: 'var(--font-mono, monospace)',
                  marginBottom: 5,
                }}
              >
                {ts.label}
              </p>
              <p style={{ ...ts.style, margin: 0, whiteSpace: 'pre-line' }}>{ts.sample}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function BrandPreviewPage() {
  return (
    <div
      style={{
        background: '#111111',
        minHeight: '100vh',
        padding: '48px 24px 80px',
        fontFamily: 'var(--font-body, system-ui, sans-serif)',
      }}
    >
      {/* Page header */}
      <div style={{ maxWidth: 1240, margin: '0 auto 40px' }}>
        <p
          style={{
            fontSize: '0.6875rem',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: '#555',
            fontFamily: 'var(--font-mono, monospace)',
            marginBottom: 10,
          }}
        >
          Deesyn · Brand Direction Preview
        </p>
        <h1
          style={{
            color: '#E8E4DE',
            fontSize: '1.625rem',
            fontWeight: 300,
            letterSpacing: '-0.025em',
            fontFamily: 'var(--font-display, Georgia, serif)',
            marginBottom: 8,
          }}
        >
          Three directions. Pick one.
        </h1>
        <p style={{ color: '#555', fontSize: '0.875rem', lineHeight: 1.5 }}>
          Each card shows how the brand would feel across colour, type, and a hero section.
        </p>
      </div>

      {/* Grid */}
      <div
        style={{
          maxWidth: 1240,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 20,
          alignItems: 'start',
        }}
      >
        {directions.map(d => (
          <DirectionCard key={d.id} d={d} />
        ))}
      </div>
    </div>
  )
}
