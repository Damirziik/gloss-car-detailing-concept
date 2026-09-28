import { test, expect } from '@playwright/test';

const widths = [320, 360, 390, 430, 768, 1024, 1280, 1440, 1920];

for (const width of widths) {
  test(`layout has no horizontal overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: width < 768 ? 844 : 900 });
    const errors = [];
    page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
    page.on('pageerror', (error) => errors.push(error.message));
    page.on('requestfailed', (request) => errors.push(`request failed: ${request.url()}`));
    page.on('response', (response) => { if (response.status() >= 400) errors.push(`${response.status()}: ${response.url()}`); });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(1);
    expect(errors).toEqual([]);
  });
}

test('mobile menu opens, navigates and closes', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.locator('.menu-toggle').click();
  await expect(page.locator('.mobile-menu')).toHaveClass(/is-open/);
  await page.locator('.mobile-menu a[href="#faq"]').click();
  await expect(page.locator('.mobile-menu')).not.toHaveClass(/is-open/);
  await expect(page).toHaveURL(/#faq$/);
});

test('gallery lightbox supports keyboard and Escape', async ({ page }) => {
  await page.goto('/');
  await page.locator('[data-gallery-index="0"]').click();
  await expect(page.locator('.lightbox')).toHaveClass(/is-open/);
  await expect(page.locator('.lightbox figcaption span')).toHaveText('01 / 06');
  await page.keyboard.press('ArrowRight');
  await expect(page.locator('.lightbox figcaption span')).toHaveText('02 / 06');
  await page.keyboard.press('Escape');
  await expect(page.locator('.lightbox')).not.toHaveClass(/is-open/);
  await expect(page.locator('body')).not.toHaveClass(/scroll-lock/);
});

test('before/after range changes divider', async ({ page }) => {
  await page.goto('/');
  const range = page.locator('[data-compare] input');
  await range.fill('73');
  await expect(range).toHaveValue('73');
  await expect(page.locator('[data-compare]')).toHaveAttribute('style', /73%/);
});

test('FAQ accordion exposes one panel at a time', async ({ page }) => {
  await page.goto('/');
  const second = page.locator('.accordion-item button').nth(1);
  await second.click();
  await expect(second).toHaveAttribute('aria-expanded', 'true');
  await expect(page.locator('.accordion-item button').first()).toHaveAttribute('aria-expanded', 'false');
});

test('form validates and generates a WhatsApp destination', async ({ page, context }) => {
  await page.goto('/');
  await page.locator('.booking-form button').click();
  await expect(page.locator('.booking-form label').first()).toHaveClass(/has-error/);
  await page.locator('[name="name"]').fill('Али');
  await page.locator('[name="phone"]').fill('+7 700 123 45 67');
  await page.locator('[name="service"]').selectOption({ index: 1 });
  const popupPromise = context.waitForEvent('page');
  await page.locator('.booking-form button').click();
  const popup = await popupPromise;
  expect(popup.url()).toMatch(/(?:wa\.me\/77052398878|api\.whatsapp\.com\/send\/\?phone=77052398878)/);
});

test('reduced motion keeps content visible', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.locator('.service').first()).toHaveCSS('opacity', '1');
});
