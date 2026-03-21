import {
  Body, Button, Container, Head, Heading,
  Hr, Html, Preview, Row, Column,
  Section, Text, Link, Font,
} from '@react-email/components'

interface WaitlistConfirmEmailProps {
  name?: string
  projectName?: string
  projectUrl?: string
}

export function WaitlistConfirmEmail({
  name,
  projectName = 'Landing',
  projectUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'https://yourproject.com',
}: WaitlistConfirmEmailProps) {
  return (
    <Html lang="en">
      <Head>
        <Font
          fontFamily="Inter"
          fallbackFontFamily="Helvetica"
          webFont={{
            url: 'https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2',
            format: 'woff2',
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Preview>You are on the {projectName} waitlist — we will be in touch</Preview>

      <Body style={styles.body}>
        <Container style={styles.container}>

          {/* Header */}
          <Section style={styles.header}>
            <Text style={styles.logo}>{projectName}</Text>
          </Section>

          {/* Hero */}
          <Section style={styles.hero}>
            <Heading style={styles.heading}>
              {name ? `You're in, ${name}.` : `You're on the list.`}
            </Heading>
            <Text style={styles.subtext}>
              Thanks for signing up. We are building something worth waiting for
              and you will be among the first to know when it is ready.
            </Text>
            <Button href={projectUrl} style={styles.button}>
              Learn more
            </Button>
          </Section>

          <Hr style={styles.divider} />

          {/* What to expect */}
          <Section style={styles.section}>
            <Heading as="h2" style={styles.subheading}>What happens next</Heading>
            <Row>
              <Column style={styles.step}>
                <Text style={styles.stepNumber}>01</Text>
                <Text style={styles.stepText}>
                  We are finishing the last pieces. No bloat, just what matters.
                </Text>
              </Column>
              <Column style={styles.step}>
                <Text style={styles.stepNumber}>02</Text>
                <Text style={styles.stepText}>
                  You will get early access before the public launch.
                </Text>
              </Column>
              <Column style={styles.step}>
                <Text style={styles.stepNumber}>03</Text>
                <Text style={styles.stepText}>
                  Your feedback will shape the product directly.
                </Text>
              </Column>
            </Row>
          </Section>

          <Hr style={styles.divider} />

          {/* Footer */}
          <Section style={styles.footer}>
            <Text style={styles.footerText}>
              You received this because you signed up at{' '}
              <Link href={projectUrl} style={styles.footerLink}>
                {projectUrl.replace('https://', '')}
              </Link>
            </Text>
            <Text style={styles.footerText}>
              © {new Date().getFullYear()} {projectName}. All rights reserved.
            </Text>
          </Section>

        </Container>
      </Body>
    </Html>
  )
}

// ─── Styles ───────────────────────────────────────────────────────────────────
// Email CSS must be inline — no Tailwind, no CSS variables
// Max width 600px, no flexbox, always include font fallbacks

const styles = {
  body: {
    backgroundColor: '#f4f4f5',
    fontFamily: 'Inter, Helvetica, Arial, sans-serif',
    margin: '0',
    padding: '0',
  },
  container: {
    maxWidth: '560px',
    margin: '40px auto',
    padding: '0 16px',
  },
  header: {
    padding: '24px 0 0',
    textAlign: 'center' as const,
  },
  logo: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#111827',
    margin: '0',
    letterSpacing: '-0.02em',
  },
  hero: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '48px 40px 40px',
    marginTop: '24px',
    textAlign: 'left' as const,
  },
  heading: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#111827',
    lineHeight: '1.25',
    margin: '0 0 16px',
    letterSpacing: '-0.02em',
  },
  subtext: {
    fontSize: '16px',
    color: '#4b5563',
    lineHeight: '1.6',
    margin: '0 0 32px',
  },
  button: {
    backgroundColor: '#111827',
    borderRadius: '8px',
    color: '#ffffff',
    fontSize: '14px',
    fontWeight: '600',
    padding: '12px 24px',
    textDecoration: 'none',
    display: 'inline-block',
  },
  divider: {
    borderColor: '#e5e7eb',
    margin: '0',
  },
  section: {
    backgroundColor: '#ffffff',
    padding: '32px 40px',
  },
  subheading: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#9ca3af',
    letterSpacing: '0.08em',
    textTransform: 'uppercase' as const,
    margin: '0 0 24px',
  },
  step: {
    paddingRight: '24px',
    verticalAlign: 'top' as const,
  },
  stepNumber: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#e5e7eb',
    margin: '0 0 8px',
    letterSpacing: '-0.02em',
  },
  stepText: {
    fontSize: '14px',
    color: '#4b5563',
    lineHeight: '1.6',
    margin: '0',
  },
  footer: {
    backgroundColor: '#ffffff',
    borderRadius: '0 0 12px 12px',
    padding: '24px 40px 32px',
  },
  footerText: {
    fontSize: '12px',
    color: '#9ca3af',
    lineHeight: '1.6',
    margin: '0 0 4px',
  },
  footerLink: {
    color: '#9ca3af',
    textDecoration: 'underline',
  },
} as const

export default WaitlistConfirmEmail
