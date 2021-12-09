import { test, expect } from "@playwright/test"

test.describe('scenario', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  })
  test.describe('initial state', () => {
    test('show basic info', async ({ page }) => {
      const title = page.locator('title');
      await expect(title).toHaveText('React App');
      const nextP = page.locator('text=Next player: X');
      await expect(nextP).toBeVisible()
    });
  });

  test.describe('gameboard', () => {
    test('x get fastest win', async ({ page }) => {
      const nextP = page.locator('text=Next player: X');
      await expect(nextP).toBeVisible();

      // x
      await page.click('div div:nth-child(1) button:nth-child(1)');
      // o
      await page.click('div div:nth-child(1) button:nth-child(2)');
      // x
      await page.click('div div:nth-child(2) button:nth-child(2)');
      // o
      await page.click('div div:nth-child(2) button:nth-child(1)');
      // x
      await page.click('div:nth-child(3) button:nth-child(3)');

      const winnerX = page.locator('text=Winner: X');
      await expect(winnerX).toBeVisible();
    });

    test('clicking same place change nothing', async ({ page }) => {
      // x
      await page.click('div div:nth-child(1) button:nth-child(1)');
      await page.click('div div:nth-child(1) button:nth-child(1)');
      const upperLeft = page.locator('div.game-board div div:nth-child(1) button:nth-child(1)');
      expect(upperLeft).toHaveText('X');
    });
  });

  test.describe('history', () => {
    test('go back to game start', async ({ page }) => {
      const gamestart = page.locator('text=Go to game start');
      await expect(gamestart).toBeVisible();

      await page.click('div div:nth-child(1) button:nth-child(1)');

      const upperLeft = page.locator('.game-board div div:nth-child(1) button:nth-child(1)')
      await expect(upperLeft).toHaveText('X');

      await gamestart.click();

      await page.click('div div:nth-child(1) button:nth-child(2)');
      await page.click('div div:nth-child(1) button:nth-child(1)');

      await expect(upperLeft).toHaveText('O');
    });
  });
});
