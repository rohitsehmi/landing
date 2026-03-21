import { test, expect } from '@playwright/test'

test.describe('Navigation', () => {
  test('home page loads', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/[A-Z]/)
    await expect(page.locator('main')).toBeVisible()
  })

  test('style guide loads', async ({ page }) => {
    await page.goto('/style-guide')
    await expect(page.locator('main')).toBeVisible()
  })

  test('unauthenticated user redirected from dashboard', async ({ page }) => {
    await page.goto('/dashboard')
    await expect(page).toHaveURL(/login/)
  })
})
