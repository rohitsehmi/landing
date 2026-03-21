// ─── API responses ─────────────────────────────────────────────────────────────
export interface ApiResponse<T = void> {
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  count: number
  page: number
  pageSize: number
  hasMore: boolean
}

// ─── Common UI types ───────────────────────────────────────────────────────────
export type Size     = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type Variant  = 'default' | 'primary' | 'secondary' | 'ghost' | 'destructive'
export type Status   = 'idle' | 'loading' | 'success' | 'error'
export type Density  = 'compact' | 'default' | 'comfortable'
export type Theme    = 'light' | 'dark' | 'system'

// ─── Navigation ────────────────────────────────────────────────────────────────
export interface NavItem {
  label: string
  href: string
  icon?: React.ComponentType<{ size?: number; className?: string }>
  children?: NavItem[]
  external?: boolean
}

// ─── Add project-specific types below ─────────────────────────────────────────
