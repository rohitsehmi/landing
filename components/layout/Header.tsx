'use client'

import { useState, useEffect } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { trackEvent } from '@/lib/analytics'

interface HeaderProps {
  ctaLabel?: string
  ctaHref?: string
}

const navLinks = [
  { label: 'Work', href: '#features' },
  { label: 'Approach', href: '#showcase' },
  { label: 'FAQ', href: '#faq' },
]

export function Header({ ctaLabel = 'Join waitlist', ctaHref = '#waitlist' }: HeaderProps){
  const [scrolled, setScrolled] = useState(false)
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    function onScroll() { setScrolled(window.scrollY > 16) }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ opacity: 0, y: prefersReduced ? 0 : -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 100,
        height: 60,
        display: 'flex',
        alignItems: 'center',
        padding: '0 clamp(16px, 5vw, 48px)',
        justifyContent: 'space-between',
        transition: 'background 0.3s ease, border-color 0.3s ease',
        background: scrolled ? 'color-mix(in srgb, var(--theme-surface-page) 85%, transparent)' : 'transparent',
        borderBottom: `1px solid ${scrolled ? 'var(--theme-border-subtle)' : 'transparent'}`,
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
      }}
    >
      <a
        href="/"
        data-testid="header-logo"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.0625rem',
          fontWeight: 400,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--theme-text-default)',
          textDecoration: 'none',
        }}
        aria-label="Deesyn — home"
      >
        Deesyn
      </a>

      <nav aria-label="Main navigation" style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
        {navLinks.map(link => (
          <a
            key={link.label}
            href={link.href}
            data-testid={`nav-link-${link.label.toLowerCase()}`}
            style={{
              fontSize: '0.875rem',
              color: 'var(--theme-text-muted)',
              textDecoration: 'none',
              letterSpacing: '0.01em',
              display: 'none',
            }}
            className="header-nav-link"
          >
            {link.label}
          </a>
        ))}
        <a
          href={ctaHref}
          onClick={() => trackEvent({ name: 'cta_click', props: { label: ctaLabel, location: 'nav' } })}
          data-testid="header-cta"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '8px 18px',
            borderRadius: 'var(--brand-radius, var(--radius-md))',
            backgroundColor: 'var(--theme-brand-primary)',
            color: 'var(--theme-text-on-brand)',
            fontSize: '0.8125rem',
            fontWeight: 500,
            textDecoration: 'none',
            letterSpacing: '0.02em',
          }}
        >
          {ctaLabel}
        </a>
      </nav>

      <style>{`@media(min-width:640px){.header-nav-link{display:inline !important}}`}</style>
    </motion.header>
  )
}
