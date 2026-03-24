import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import { ThemeProvider } from '@/components/shared/ThemeProvider'
import { BrandProvider } from '@/components/shared/BrandProvider'
import { BrandSwitcher } from '@/components/shared/BrandSwitcher'
import { SkipToContent } from '@/components/shared/SkipToContent'
import { CookieConsent } from '@/components/shared/CookieConsent'
import { WebsiteSchema, OrganizationSchema } from '@/components/seo/StructuredData'
import { TooltipProvider } from '@/components/ui/tooltip'
import '@/styles/globals.css'
import '@/styles/tokens.css'
import '@/styles/tokens-dark.css'
import '@/styles/tokens-direction-a.css'
import '@/styles/tokens-direction-b.css'
import '@/styles/tokens-direction-c.css'

// ── Fonts ────────────────────────────────────────────────────────────────────
import { Fraunces, DM_Sans, Geist_Mono, Geist } from 'next/font/google'
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const displayFont = Fraunces({ subsets: ['latin'], variable: '--font-display' })
const bodyFont = DM_Sans({ subsets: ['latin'], variable: '--font-body' })
const monoFont = Geist_Mono({ subsets: ['latin'], variable: '--font-mono' })

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://yourproject.com'

// ── Metadata ─────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: {
    default: 'Landing',
    template: `%s · Landing`,
  },
  description: 'Design consultancy — crafting brands, products, and digital experiences.',
  metadataBase: new URL(BASE_URL),
  openGraph: {
    title: 'Landing',
    description: 'Design consultancy — crafting brands, products, and digital experiences.',
    siteName: 'Landing',
    locale: 'en_GB',
    type: 'website',
    url: BASE_URL,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Landing',
    description: 'Design consultancy — crafting brands, products, and digital experiences.',
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
    <html lang="en" suppressHydrationWarning className={cn("font-sans", geist.variable)}>
      <body className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable}`}>
        {/* Structured data — read by Google, not visible to users */}
        <WebsiteSchema
          name="Landing"
          url={BASE_URL}
          description="Design consultancy — crafting brands, products, and digital experiences."
        />
        <OrganizationSchema
          name="Landing"
          url={BASE_URL}
          description="Design consultancy — crafting brands, products, and digital experiences."
          // logo={`${BASE_URL}/logo.png`}
          // sameAs={['https://twitter.com/yourhandle', 'https://linkedin.com/company/yourco']}
          // contactEmail="hello@deesyn.com"
        />

        <BrandProvider defaultBrand="a">
          <ThemeProvider defaultTheme="system">
            <TooltipProvider>
              <SkipToContent />
              <main id="main-content">
                {children}
              </main>
              <BrandSwitcher />
              <CookieConsent />
            </TooltipProvider>
          </ThemeProvider>
        </BrandProvider>

        {/* Analytics — consent-aware via CookieConsent component */}
        <Analytics />
      </body>
    </html>
  )
}
