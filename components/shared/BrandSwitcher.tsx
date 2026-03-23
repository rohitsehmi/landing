'use client'

import { useBrand, type BrandDirection } from './BrandProvider'

const directions: { id: BrandDirection; label: string; desc: string }[] = [
  { id: 'a', label: 'A', desc: 'Dark & Precise' },
  { id: 'b', label: 'B', desc: 'Warm & Editorial' },
  { id: 'c', label: 'C', desc: 'Bold & Systemic' },
]

export function BrandSwitcher(){
  const { brand, setBrand } = useBrand()

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: 8,
        fontFamily: 'var(--font-mono, monospace)',
      }}
      aria-label="Brand direction switcher"
    >
      <p style={{ fontSize: '0.5625rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--theme-text-subtle)', marginBottom: 2 }}>
        Direction
      </p>
      <div style={{ display: 'flex', gap: 6 }}>
        {directions.map(d => {
          const active = brand === d.id
          return (
            <button
              key={d.id}
              onClick={() => setBrand(d.id)}
              title={d.desc}
              data-testid={`brand-switcher-${d.id}`}
              style={{
                width: 36,
                height: 36,
                borderRadius: 6,
                border: active ? '1.5px solid currentColor' : '1px solid var(--theme-border-default)',
                background: active ? 'var(--theme-brand-primary)' : 'var(--theme-surface-subtle)',
                color: active ? 'var(--theme-text-on-brand)' : 'var(--theme-text-muted)',
                fontSize: '0.75rem',
                fontWeight: active ? 600 : 400,
                letterSpacing: '0.04em',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                backdropFilter: 'blur(8px)',
                fontFamily: 'var(--font-mono, monospace)',
              }}
              aria-pressed={active}
              aria-label={`Direction ${d.id}: ${d.desc}`}
            >
              {d.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
