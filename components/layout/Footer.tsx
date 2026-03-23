interface FooterProps {
  links?: { label: string; href: string }[]
}

const defaultLinks = [
  { label: 'Privacy', href: '/privacy' },
  { label: 'Twitter', href: 'https://twitter.com/deesyn' },
  { label: 'LinkedIn', href: 'https://linkedin.com/company/deesyn' },
]

export function Footer({ links = defaultLinks }: FooterProps){
  return (
    <footer
      style={{
        borderTop: '1px solid var(--theme-border-subtle)',
        padding: 'var(--spacing-8) clamp(16px, 5vw, 48px)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 16,
      }}
      aria-label="Site footer"
    >
      <span style={{
        fontFamily: 'var(--font-display)',
        fontSize: '0.875rem',
        fontWeight: 400,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: 'var(--theme-text-muted)',
      }}>
        Deesyn
      </span>

      <nav aria-label="Footer navigation" style={{ display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}>
        {links.map(link => (
          <a
            key={link.label}
            href={link.href}
            data-testid={`footer-link-${link.label.toLowerCase()}`}
            style={{
              fontSize: '0.8125rem',
              color: 'var(--theme-text-muted)',
              textDecoration: 'none',
              letterSpacing: '0.01em',
            }}
          >
            {link.label}
          </a>
        ))}
      </nav>

      <p style={{ fontSize: '0.75rem', color: 'var(--theme-text-muted)', margin: 0 }}>
        © {new Date().getFullYear()} Deesyn
      </p>
    </footer>
  )
}
