# /new-component

Scaffold $ARGUMENTS as a new component following project conventions.

## Before starting — confirm:
1. **Component name** from $ARGUMENTS (PascalCase)
2. **Type** — UI primitive / feature component / page section / layout
3. **Where it lives** — `components/ui/`, `components/[feature]/`, or `components/shared/`
4. **Does it fetch data?** — yes / no
5. **Motion?** — yes / no

## Scaffold template

```tsx
import { cn } from '@/lib/utils'
// import { motion, useReducedMotion } from 'motion/react' — if motion: yes

interface [ComponentName]Props {
  className?: string
  density?: 'compact' | 'default' | 'comfortable'
  // add props here
}

export function [ComponentName]({ className, density = 'default', ...props }: [ComponentName]Props) {
  // if data fetching: loading, error, empty states required
  // if motion: const prefersReduced = useReducedMotion()

  return (
    <div className={cn('', className)}>
      {/* component content */}
    </div>
  )
}
```

## Rules
- Semantic tokens only — no hardcoded Tailwind colour classes
- cn() for all conditional class logic
- Named export, not default
- Explicit TypeScript interface, no `any`
- If motion: useReducedMotion() fallback always
- If data: loading, error, empty states are required

After scaffolding, run the self-critique from SKILLS.md.
