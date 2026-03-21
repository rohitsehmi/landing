// Feature flags — powered by Vercel Feature Flags
// https://vercel.com/docs/workflow-collaboration/feature-flags
//
// Usage:
//   import { isFeatureEnabled } from '@/lib/flags'
//   const enabled = await isFeatureEnabled('new-dashboard')
//
// To add a new flag:
//   1. Add to the FLAGS object below
//   2. Add to vercel.json flags array
//   3. Enable/disable in Vercel dashboard per environment

export const FLAGS = {
  // Example flags — replace with your own
  'new-dashboard':    false,
  'ai-features':      false,
  'beta-onboarding':  false,
} as const

export type FlagKey = keyof typeof FLAGS

// Simple flag check — reads from env or falls back to default
// For production use with Vercel Edge Config, upgrade to @vercel/flags
export async function isFeatureEnabled(flag: FlagKey): Promise<boolean> {
  const envKey = `NEXT_PUBLIC_FLAG_${flag.toUpperCase().replace(/-/g, '_')}`
  const envValue = process.env[envKey]

  if (envValue !== undefined) {
    return envValue === 'true' || envValue === '1'
  }

  return FLAGS[flag]
}

// For use in Server Components
export async function getFlags(): Promise<Record<FlagKey, boolean>> {
  const entries = await Promise.all(
    (Object.keys(FLAGS) as FlagKey[]).map(async (key) => [
      key,
      await isFeatureEnabled(key),
    ])
  )
  return Object.fromEntries(entries) as Record<FlagKey, boolean>
}
