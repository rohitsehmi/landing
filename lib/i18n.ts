// Internationalisation — using next-intl
// https://next-intl-docs.vercel.app/
//
// Currently: English only (en.json)
// To add a language:
//   1. Create messages/[locale].json
//   2. Add locale to LOCALES array below
//   3. next-intl handles routing automatically
//
// To enable: npm install next-intl
// Then follow setup guide: https://next-intl-docs.vercel.app/docs/getting-started/app-router

export const LOCALES = ['en'] as const
export const DEFAULT_LOCALE = 'en' as const

export type Locale = typeof LOCALES[number]

// Type-safe message keys — add as you expand messages/en.json
export type MessageKey =
  | 'common.loading'
  | 'common.error'
  | 'common.retry'
  | 'waitlist.heading'
  | 'waitlist.success'
  | string // allow any string for now — tighten as needed
