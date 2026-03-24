# EMAIL-SETUP.md
> How to get a custom domain email working with ImprovMX + Resend.

---

## Overview

| Tool | Role |
|---|---|
| ImprovMX | Receive email + reply from custom address via Gmail |
| Resend | Send transactional email (waitlist confirms, notifications) |

---

## Step 1 — ImprovMX (inbox + replies)

1. Sign up at improvmx.com → add your domain
2. Add these DNS records at your registrar:

| Type | Name | Value | Priority |
|---|---|---|---|
| MX | `@` | `mx1.improvmx.com` | 10 |
| MX | `@` | `mx2.improvmx.com` | 20 |
| TXT | `@` | `v=spf1 include:spf.improvmx.com ~all` | — |

3. In Gmail → Settings → Accounts and Import → Send mail as → Add another email address:
   - SMTP Server: `smtp.improvmx.com`
   - Port: `587`
   - Username: `hello@yourdomain.com`
   - Password: from ImprovMX → SMTP Credentials

---

## Step 2 — Resend (transactional sending)

1. Sign up at resend.com → Domains → Add Domain
2. Add these DNS records (Resend provides exact values):

| Type | Purpose |
|---|---|
| TXT | SPF — authorises Resend to send from your domain |
| TXT (×2) | DKIM — cryptographic signature |
| TXT | DMARC — policy for failed checks |

3. Click Verify in Resend dashboard — usually confirms within 10 mins
4. Get API key → add to `.env.local` as `RESEND_API_KEY`

---

## Step 3 — Update project constants

In `app/api/waitlist/route.ts` replace:
- `Landing` → your project name
- `deesyn.com` → your domain e.g. `clearpath.app`
- `hello@deesyn.com` → your personal email for notifications

---

## Step 4 — Preview emails locally

```bash
npx react-email dev --dir emails --port 3001
```

Opens at localhost:3001 — live preview of all email templates.

---

## Step 5 — Test before going live

1. Send a test from Resend dashboard
2. Check it lands in inbox (not spam)
3. Verify from address shows correctly
4. Test reply goes to your Gmail

---

## Notes

- ImprovMX MX records and Resend TXT records do not conflict
- SPF record: if you have both ImprovMX and Resend, combine into one:
  `v=spf1 include:spf.improvmx.com include:amazonses.com ~all`
- DMARC policy: start with `p=none` (monitor only), move to `p=quarantine` once stable
