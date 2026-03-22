'use client'

import { createContext, useContext, useEffect, useState } from 'react'

export type BrandDirection = 'a' | 'b' | 'c'

interface BrandContextValue {
  brand: BrandDirection
  setBrand: (brand: BrandDirection) => void
}

const BrandContext = createContext<BrandContextValue | undefined>(undefined)

export function useBrand() {
  const ctx = useContext(BrandContext)
  if (!ctx) throw new Error('useBrand must be used within BrandProvider')
  return ctx
}

interface BrandProviderProps {
  children: React.ReactNode
  defaultBrand?: BrandDirection
}

export function BrandProvider({ children, defaultBrand = 'a' }: BrandProviderProps) {
  const [brand, setBrandState] = useState<BrandDirection>(defaultBrand)

  useEffect(() => {
    const stored = localStorage.getItem('brand-direction') as BrandDirection | null
    if (stored && ['a', 'b', 'c'].includes(stored)) setBrandState(stored)
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-brand', brand)
  }, [brand])

  const setBrand = (b: BrandDirection) => {
    localStorage.setItem('brand-direction', b)
    setBrandState(b)
  }

  return (
    <BrandContext.Provider value={{ brand, setBrand }}>
      {children}
    </BrandContext.Provider>
  )
}
