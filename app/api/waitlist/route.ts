import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { Resend } from 'resend'
import { formLimiter } from '@/lib/ratelimit'
import { createServiceClient } from '@/lib/supabase/server'
import { waitlistSchema } from '@/lib/validations'
import { WaitlistConfirmEmail } from '@/emails/WaitlistConfirm'
import { ClientNotifyEmail } from '@/emails/ClientNotify'
import type { ApiResponse } from '@/types'

const resend = new Resend(process.env.RESEND_API_KEY)

const PROJECT_NAME = 'Landing'
const FROM_ADDRESS = `${PROJECT_NAME} <hello@deesyn.com>`
const NOTIFY_EMAIL = 'hello@deesyn.com'
const PROJECT_URL  = process.env.NEXT_PUBLIC_APP_URL ?? 'https://yourproject.com'

export async function POST(request: NextRequest) {
  try {
    // Rate limit
    const ip = (await headers()).get('x-forwarded-for') ?? '127.0.0.1'
    const { success } = await formLimiter.limit(ip)
    if (!success) {
      return NextResponse.json<ApiResponse>(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    // Validate
    const body = await request.json()
    const parsed = waitlistSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json<ApiResponse>(
        { error: parsed.error.issues[0].message },
        { status: 400 }
      )
    }

    const { email, name } = parsed.data

    // Insert to Supabase
    const supabase = await createServiceClient()
    const { error: dbError } = await supabase
      .from('waitlist')
      .insert({ email, name })

    if (dbError) {
      if (dbError.code === '23505') {
        return NextResponse.json<ApiResponse>(
          { message: 'You are already on the waitlist.' },
          { status: 200 }
        )
      }
      throw dbError
    }

    // Send confirmation to user
    await resend.emails.send({
      from: FROM_ADDRESS,
      to: email,
      subject: `You're on the ${PROJECT_NAME} waitlist`,
      react: WaitlistConfirmEmail({
        name,
        projectName: PROJECT_NAME,
        projectUrl: PROJECT_URL,
      }),
    })

    // Notify yourself
    await resend.emails.send({
      from: FROM_ADDRESS,
      to: NOTIFY_EMAIL,
      subject: `New waitlist signup: ${email}`,
      react: ClientNotifyEmail({ email, name }),
    })

    return NextResponse.json<ApiResponse>(
      { message: 'You are on the waitlist!' },
      { status: 201 }
    )
  } catch (error) {
    console.error('[waitlist] Error:', error)
    return NextResponse.json<ApiResponse>(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}
