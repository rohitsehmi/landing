// Icon system — using lucide-react as base
// Add custom SVG icons here as React components
// All icons should accept a `size` prop mapped to the icon size token
// and a `className` prop for colour overrides via CSS custom properties

// Re-export commonly used lucide icons for consistent usage across the project
export {
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  ChevronUp,
  X,
  Check,
  Plus,
  Minus,
  Search,
  Menu,
  ArrowRight,
  ArrowLeft,
  ExternalLink,
  AlertCircle,
  AlertTriangle,
  CheckCircle,
  Info,
  Loader2,
  Eye,
  EyeOff,
  User,
  Settings,
  LogOut,
} from 'lucide-react'

// Icon size tokens — maps to spacing scale
export const iconSize = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
} as const

export type IconSize = keyof typeof iconSize
