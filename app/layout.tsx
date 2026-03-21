import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import { ThemeProvider } from '@/components/shared/ThemeProvider'
import { SkipToContent } from '@/components/shared/SkipToContent'
import { CookieConsent } from '@/components/shared/CookieConsent'
import { WebsiteSchema, OrganizationSchema } from '@/components/seo/StructuredData'
import '@/styles/globals.css'
import '@/styles/tokens.css'
import '@/styles/tokens-dark.css'

// ── Fonts ────────────────────────────────────────────────────────────────────
// Replace with your chosen fonts from next/font/google
// import { Fraunces, DM_Sans, JetBrains_Mono } from 'next/font/google'
//
// const displayFont = Fraunces({ subsets: ['latin'], variable: '--font-display' })
// const bodyFont = DM_Sans({ subsets: ['latin'], variable: '--font-body' })
// const monoFont = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' })

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://yourproject.com'

// ── Metadata ─────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: {
    default: 'Landing',
    template: `%s · Landing`,
  },
  description: '[PROJECT_DESCRIPTION]',
  metadataBase: new URL(BASE_URL),
  openGraph: {
    title: 'Landing',
    description: '[PROJECT_DESCRIPTION]',
    siteName: 'Landing',
    locale: 'en_GB',
    type: 'website',
    url: BASE_URL,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Landing',
    description: '[PROJECT_DESCRIPTION]',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: BASE_URL,
  },
  // Verification — add once you have Google Search Console set up
  // verification: {
  //   google: 'your-google-verification-code',
  // },
}

// ── Layout ───────────────────────────────────────────────────────────────────
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        // Uncomment once fonts are configured:
        // className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable}`}
      >
        {/* Structured data — read by Google, not visible to users */}
        <WebsiteSchema
          name="Landing"
          url={BASE_URL}
          description="[PROJECT_DESCRIPTION]"
        />
        <OrganizationSchema
          name="Landing"
          url={BASE_URL}
          description="[PROJECT_DESCRIPTION]"
          // logo={`${BASE_URL}/logo.png`}
          // sameAs={['https://twitter.com/yourhandle', 'https://linkedin.com/company/yourco']}
          // contactEmail="hello@[YOUR_DOMAIN]"
        />

        <ThemeProvider defaultTheme="system">
          <SkipToContent />
          <main id="main-content">
            {children}
          </main>
          <CookieConsent />
        </ThemeProvider>

        {/* Analytics — consent-aware via CookieConsent component */}
        <Analytics />
      </body>
    </html>
  )
}
