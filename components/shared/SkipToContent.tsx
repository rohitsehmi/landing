// Required a11y component — must be first focusable element in root layout
// See a11y.md for specification

export function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:rounded-md focus:text-sm focus:font-medium"
      style={{
        backgroundColor: 'var(--color-brand-primary)',
        color: 'var(--color-text-on-brand)',
      }}
    >
      Skip to content
    </a>
  )
}
