import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'
import { assignVariant, experimentCookie, EXPERIMENTS } from '@/lib/ab'

export async function middleware(request: NextRequest) {
  // 1. Supabase session
  const response = await updateSession(request)

  // 2. A/B variant assignment — only on marketing pages, not API routes
  const isMarketingPage = request.nextUrl.pathname === '/'
  if (isMarketingPage) {
    for (const [id, experiment] of Object.entries(EXPERIMENTS)) {
      const cookieName = experimentCookie(id)
      if (!request.cookies.has(cookieName)) {
        const variant = assignVariant(experiment.weights)
        response.cookies.set(cookieName, variant, {
          maxAge: 60 * 60 * 24 * 30, // 30 days
          httpOnly: false, // readable by client for analytics
          sameSite: 'lax',
        })
      }
    }
  }

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
