# Performance Budget

> Target: Lighthouse 90+ across all categories on production URL.
> Core Web Vitals measured on real devices, not just lab conditions.

---

## Core Web Vitals Targets

| Metric | Target | Critical threshold |
|---|---|---|
| LCP (Largest Contentful Paint) | < 2.5s | > 4.0s = fail |
| INP (Interaction to Next Paint) | < 200ms | > 500ms = fail |
| CLS (Cumulative Layout Shift) | < 0.1 | > 0.25 = fail |
| FCP (First Contentful Paint) | < 1.8s | > 3.0s = fail |
| TTFB (Time to First Byte) | < 800ms | > 1800ms = fail |

---

## Bundle Size Limits

| Asset | Limit | Action if exceeded |
|---|---|---|
| First load JS (shared) | 150kb gzipped | Audit imports, lazy load |
| Single page chunk | 100kb gzipped | Split component, dynamic import |
| Total CSS | 50kb gzipped | Audit unused tokens, purge |
| Images (per image) | 200kb | Compress, use next/image |

---

## Monitoring

```bash
# Analyse bundle locally
npm run analyze

# Lighthouse CI on every PR (via GitHub Actions)
# Results in PR comment automatically
```

---

## Common causes of regressions

- Importing a full library when only one function is needed (`lodash` → `lodash/get`)
- Not using `next/dynamic` for heavy components below the fold
- Images not using `next/image` with correct sizing
- Unused shadcn components still in bundle
- Motion library loaded on server — should be client-only
- Large font files — use `display: swap` and subset correctly

---

## Fixes

```tsx
// Dynamic import for heavy below-fold components
const HeavyChart = dynamic(() => import('@/components/HeavyChart'), {
  loading: () => <Skeleton className="h-64" />,
  ssr: false,
})

// Subset fonts in next/font
const displayFont = Fraunces({
  subsets: ['latin'],      // not 'latin-ext' unless needed
  display: 'swap',
  preload: true,
})
```
