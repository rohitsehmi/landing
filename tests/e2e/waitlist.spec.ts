import { test, expect } from '@playwright/test'

test.describe('Waitlist form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('submits valid email successfully', async ({ page }) => {
    const emailInput = page.getByRole('textbox', { name: /email/i })
    await emailInput.fill('test@example.com')
    await page.getByRole('button', { name: /join|submit|sign up/i }).click()
    await expect(page.getByText(/waitlist|thank|success/i)).toBeVisible({ timeout: 5000 })
  })

  test('shows validation error for invalid email', async ({ page }) => {
    const emailInput = page.getByRole('textbox', { name: /email/i })
    await emailInput.fill('not-an-email')
    await page.getByRole('button', { name: /join|submit|sign up/i }).click()
    await expect(page.getByText(/valid email/i)).toBeVisible()
  })

  test('form is keyboard navigable', async ({ page }) => {
    await page.keyboard.press('Tab')
    const focused = page.locator(':focus')
    await expect(focused).toBeVisible()
  })
})
