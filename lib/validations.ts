import { z } from 'zod'

// ─── Common fields ─────────────────────────────────────────────────────────────
const email = z.string().email('Please enter a valid email address')
const name  = z.string().min(2, 'Name must be at least 2 characters').max(100)

// ─── Waitlist ──────────────────────────────────────────────────────────────────
export const waitlistSchema = z.object({
  email,
  name: name.optional(),
})
export type WaitlistInput = z.infer<typeof waitlistSchema>

// ─── Auth ──────────────────────────────────────────────────────────────────────
export const loginSchema = z.object({
  email,
  password: z.string().min(8, 'Password must be at least 8 characters'),
})
export type LoginInput = z.infer<typeof loginSchema>

export const signupSchema = z.object({
  email,
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Must contain at least one number'),
  name,
})
export type SignupInput = z.infer<typeof signupSchema>

// ─── Add project-specific schemas below ───────────────────────────────────────
