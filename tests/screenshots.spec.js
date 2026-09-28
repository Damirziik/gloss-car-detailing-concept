import { test } from '@playwright/test';

for (const width of [390, 768, 1440, 1920]) {
  test(`capture ${width}`, async ({ page }) => {
    await page.setViewportSize({ width, height: width === 390 ? 844 : 1000 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.evaluate(async () => {
      const step = Math.max(500, window.innerHeight * 0.75);
      for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise((resolve) => setTimeout(resolve, 40));
      }
      window.scrollTo(0, 0);
      await new Promise((resolve) => setTimeout(resolve, 150));
    });
    await page.screenshot({ path: `reports/screenshots/home-${width}.png`, fullPage: true });
  });
}
