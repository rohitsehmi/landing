import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['selector', '[data-theme="dark"]'],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './emails/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Wire Tailwind colour utilities to CSS custom properties
        // This means bg-brand-primary uses var(--color-brand-primary)
        brand: {
          primary:   'var(--color-brand-primary)',
          secondary: 'var(--color-brand-secondary)',
          subtle:    'var(--color-brand-subtle)',
        },
        surface: {
          page:    'var(--theme-surface-page)',
          default: 'var(--theme-surface-default)',
          subtle:  'var(--theme-surface-subtle)',
          muted:   'var(--theme-surface-muted)',
          inverse: 'var(--theme-surface-inverse)',
        },
        content: {
          default:  'var(--theme-text-default)',
          muted:    'var(--theme-text-muted)',
          subtle:   'var(--theme-text-subtle)',
          disabled: 'var(--theme-text-disabled)',
          inverse:  'var(--theme-text-inverse)',
          'on-brand': 'var(--theme-text-on-brand)',
        },
        border: {
          default: 'var(--theme-border-default)',
          subtle:  'var(--theme-border-subtle)',
          strong:  'var(--theme-border-strong)',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        body:    ['var(--font-body)',    'system-ui', 'sans-serif'],
        mono:    ['var(--font-mono)',    'ui-monospace', 'monospace'],
      },
      boxShadow: {
        card:    'var(--elevation-card)',
        raised:  'var(--elevation-raised)',
        overlay: 'var(--elevation-overlay)',
        modal:   'var(--elevation-modal)',
      },
      borderRadius: {
        sm:   'var(--radius-sm)',
        md:   'var(--radius-md)',
        lg:   'var(--radius-lg)',
        xl:   'var(--radius-xl)',
        full: 'var(--radius-full)',
      },
    },
  },
  plugins: [],
}

export default config
