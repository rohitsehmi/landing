import { describe, it, expect } from 'vitest'
import { waitlistSchema, loginSchema, signupSchema } from '@/lib/validations'

describe('waitlistSchema', () => {
  it('accepts valid email', () => {
    const result = waitlistSchema.safeParse({ email: 'test@example.com' })
    expect(result.success).toBe(true)
  })
  it('rejects invalid email', () => {
    const result = waitlistSchema.safeParse({ email: 'not-an-email' })
    expect(result.success).toBe(false)
  })
  it('accepts optional name', () => {
    const result = waitlistSchema.safeParse({ email: 'test@example.com', name: 'Ro' })
    expect(result.success).toBe(true)
  })
})

describe('loginSchema', () => {
  it('accepts valid credentials', () => {
    const result = loginSchema.safeParse({ email: 'test@example.com', password: 'Password1' })
    expect(result.success).toBe(true)
  })
  it('rejects short password', () => {
    const result = loginSchema.safeParse({ email: 'test@example.com', password: 'short' })
    expect(result.success).toBe(false)
  })
})

describe('signupSchema', () => {
  it('rejects password without uppercase', () => {
    const result = signupSchema.safeParse({
      email: 'test@example.com',
      password: 'password1',
      name: 'Ro Test',
    })
    expect(result.success).toBe(false)
  })
  it('rejects password without number', () => {
    const result = signupSchema.safeParse({
      email: 'test@example.com',
      password: 'Password',
      name: 'Ro Test',
    })
    expect(result.success).toBe(false)
  })
  it('accepts valid signup', () => {
    const result = signupSchema.safeParse({
      email: 'test@example.com',
      password: 'Password1',
      name: 'Ro Test',
    })
    expect(result.success).toBe(true)
  })
})
