import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Landing'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#0a0a0a',
          padding: '80px',
          position: 'relative',
        }}
      >
        {/* Grid texture */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* Left accent bar */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: 6,
            height: '100%',
            backgroundColor: '#ffffff',
          }}
        />

        {/* Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            justifyContent: 'space-between',
            position: 'relative',
          }}
        >
          {/* Top — logo / brand */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 8,
                backgroundColor: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div style={{ width: 20, height: 20, backgroundColor: '#0a0a0a', borderRadius: 4 }} />
            </div>
            <span
              style={{
                color: '#ffffff',
                fontSize: 20,
                fontWeight: 700,
                letterSpacing: '-0.02em',
              }}
            >
              Landing
            </span>
          </div>

          {/* Middle — headline */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div
              style={{
                display: 'inline-flex',
                backgroundColor: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 100,
                padding: '6px 16px',
                width: 'fit-content',
              }}
            >
              <span style={{ color: '#9ca3af', fontSize: 13, fontWeight: 600, letterSpacing: '0.08em' }}>
                COMING SOON
              </span>
            </div>
            <h1
              style={{
                color: '#ffffff',
                fontSize: 64,
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
                margin: 0,
                maxWidth: 800,
              }}
            >
              [PROJECT_TAGLINE]
            </h1>
            <p
              style={{
                color: '#6b7280',
                fontSize: 22,
                margin: 0,
                maxWidth: 600,
                lineHeight: 1.5,
              }}
            >
              [PROJECT_DESCRIPTION]
            </p>
          </div>

          {/* Bottom — CTA hint */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <span style={{ color: '#374151', fontSize: 14 }}>
              deesyn.com
            </span>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                backgroundColor: '#ffffff',
                borderRadius: 8,
                padding: '10px 20px',
              }}
            >
              <span style={{ color: '#0a0a0a', fontSize: 15, fontWeight: 700 }}>
                Join the waitlist
              </span>
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
