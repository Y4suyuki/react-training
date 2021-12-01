import { test, expect } from "@playwright/test"

test('basic test', async ({ page }) => {
  await page.goto('http://playwright.dev/');
  const title = page.locator('.navbar__inner .navbar__title');
  await expect(title).toHaveText('Playwright');
})
