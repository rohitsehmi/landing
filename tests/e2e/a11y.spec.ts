import { test, expect } from '@playwright/test'
import { injectAxe, checkA11y } from 'axe-playwright'

test.describe('Accessibility', () => {
  test('home page passes axe audit', async ({ page }) => {
    await page.goto('/')
    await injectAxe(page)
    await checkA11y(page, undefined, {
      detailedReport: true,
      detailedReportOptions: { html: true },
    })
  })

  test('style guide passes axe audit', async ({ page }) => {
    await page.goto('/style-guide')
    await injectAxe(page)
    await checkA11y(page)
  })

  test('skip link is first focusable element', async ({ page }) => {
    await page.goto('/')
    await page.keyboard.press('Tab')
    const focused = page.locator(':focus')
    await expect(focused).toHaveText(/skip/i)
  })
})
