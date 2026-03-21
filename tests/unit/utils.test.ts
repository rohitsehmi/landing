import { describe, it, expect } from 'vitest'
import { cn, formatDate, slugify, truncate, isDefined, capitalise } from '@/lib/utils'

describe('cn()', () => {
  it('merges class names correctly', () => {
    expect(cn('a', 'b')).toBe('a b')
  })
  it('handles conditional classes', () => {
    expect(cn('a', false && 'b', 'c')).toBe('a c')
  })
  it('deduplicates Tailwind classes — last wins', () => {
    expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500')
  })
})

describe('slugify()', () => {
  it('converts to lowercase kebab', () => {
    expect(slugify('Hello World')).toBe('hello-world')
  })
  it('removes special characters', () => {
    expect(slugify('Hello, World!')).toBe('hello-world')
  })
  it('handles multiple spaces', () => {
    expect(slugify('hello   world')).toBe('hello-world')
  })
})

describe('truncate()', () => {
  it('returns string unchanged if under limit', () => {
    expect(truncate('hello', 10)).toBe('hello')
  })
  it('truncates and adds ellipsis', () => {
    expect(truncate('hello world', 5)).toBe('hello…')
  })
})

describe('isDefined()', () => {
  it('returns true for non-null values', () => {
    expect(isDefined('hello')).toBe(true)
    expect(isDefined(0)).toBe(true)
    expect(isDefined(false)).toBe(true)
  })
  it('returns false for null and undefined', () => {
    expect(isDefined(null)).toBe(false)
    expect(isDefined(undefined)).toBe(false)
  })
})

describe('capitalise()', () => {
  it('capitalises first letter', () => {
    expect(capitalise('hello')).toBe('Hello')
  })
  it('handles empty string', () => {
    expect(capitalise('')).toBe('')
  })
})
