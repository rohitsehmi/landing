'use client'

import { useEffect } from 'react'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div
      role="alert"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '50vh',
        gap: '16px',
        padding: '40px',
        textAlign: 'center',
      }}
    >
      <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--theme-text-default)' }}>
        Something went wrong
      </h2>
      <p style={{ fontSize: '0.875rem', color: 'var(--theme-text-muted)', maxWidth: '400px' }}>
        {error.digest ? `Error ID: ${error.digest}` : 'An unexpected error occurred.'}
      </p>
      <button
        onClick={reset}
        style={{
          padding: '10px 20px',
          borderRadius: 'var(--radius-md)',
          backgroundColor: 'var(--color-brand-primary)',
          color: 'var(--color-text-on-brand)',
          border: 'none',
          cursor: 'pointer',
          fontSize: '0.875rem',
          fontWeight: 500,
        }}
      >
        Try again
      </button>
    </div>
  )
}
