import {
  Body, Container, Head, Heading, Html,
  Preview, Section, Text,
} from '@react-email/components'

interface ClientNotifyEmailProps {
  email: string
  name?: string
}

export function ClientNotifyEmail({ email, name }: ClientNotifyEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>New waitlist signup: {email}</Preview>
      <Body style={{ backgroundColor: '#f9fafb', fontFamily: 'system-ui, sans-serif' }}>
        <Container style={{ maxWidth: '480px', margin: '40px auto', padding: '0 16px' }}>
          <Section style={{ backgroundColor: '#ffffff', borderRadius: '8px', padding: '32px' }}>
            <Heading style={{ fontSize: '18px', fontWeight: '600', color: '#111827', margin: '0 0 16px' }}>
              New waitlist signup
            </Heading>
            <Text style={{ color: '#374151', margin: '0 0 8px' }}>
              <strong>Email:</strong> {email}
            </Text>
            {name && (
              <Text style={{ color: '#374151', margin: '0' }}>
                <strong>Name:</strong> {name}
              </Text>
            )}
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

export default ClientNotifyEmail
