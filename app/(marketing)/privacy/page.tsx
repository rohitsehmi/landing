import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How we collect, use, and protect your data.',
  robots: { index: true, follow: true },
}

export default function PrivacyPage() {
  return (
    <main
      id="main-content"
      style={{
        maxWidth: '680px',
        margin: '0 auto',
        padding: 'var(--spacing-20) var(--spacing-6)',
      }}
    >
      <h1
        style={{
          fontSize: 'var(--text-display-lg)',
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          color: 'var(--theme-text-default)',
          letterSpacing: '-0.02em',
          marginBottom: 'var(--spacing-4)',
        }}
      >
        Privacy Policy
      </h1>
      <p style={{ fontSize: 'var(--text-body-sm)', color: 'var(--theme-text-muted)', marginBottom: 'var(--spacing-10)' }}>
        Last updated: {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
      </p>

      {[
        {
          heading: 'What we collect',
          body: 'We collect your email address when you join the waitlist. We do not collect any other personal data without your explicit consent.',
        },
        {
          heading: 'How we use it',
          body: 'Your email is used solely to notify you when the product launches and to send you relevant updates. We will never sell or share your data with third parties.',
        },
        {
          heading: 'Cookies',
          body: 'We use cookies to understand how you use this site (analytics) and to remember your preferences. You can decline non-essential cookies via the consent banner.',
        },
        {
          heading: 'Your rights',
          body: 'Under GDPR, you have the right to access, correct, or delete your data at any time. Contact us at hello@deesyn.com to exercise these rights.',
        },
        {
          heading: 'Data retention',
          body: 'We retain your email address until you unsubscribe or request deletion. Analytics data is retained for 12 months.',
        },
        {
          heading: 'Contact',
          body: 'For any privacy-related questions, email us at hello@deesyn.com.',
        },
      ].map(({ heading, body }) => (
        <section key={heading} style={{ marginBottom: 'var(--spacing-10)' }}>
          <h2 style={{
            fontSize: 'var(--text-body-lg)',
            fontWeight: 600,
            color: 'var(--theme-text-default)',
            marginBottom: 'var(--spacing-3)',
          }}>
            {heading}
          </h2>
          <p style={{
            fontSize: 'var(--text-body-md)',
            color: 'var(--theme-text-muted)',
            lineHeight: 'var(--font-line-height-relaxed)',
          }}>
            {body}
          </p>
        </section>
      ))}
    </main>
  )
}
