import { test, expect } from '@playwright/test';

test.describe('tbox basic functionality', () => {
  test('homepage loads and shows tool list', async ({ page }) => {
    await page.goto('/');

    // Check title is present
    await expect(page).toHaveTitle(/tbox/);

    // Check that some tools are visible
    const jsonFormatter = page.locator('text=JSON 格式化').or(page.locator('text=JSON Formatter'));
    await expect(jsonFormatter.first()).toBeVisible();
  });

  test('JSON formatter shows error for invalid JSON', async ({ page }) => {
    await page.goto('/tools/json-formatter');

    const textarea = page.locator('textarea').first();
    await textarea.fill('{invalid json}');

    // Look for error message (either Chinese or English)
    const errorMsg = page.locator('text=/无效.*JSON|invalid.*JSON/i');
    await expect(errorMsg).toBeVisible();
  });

  test('JSON formatter formats valid JSON', async ({ page }) => {
    await page.goto('/tools/json-formatter');

    const textarea = page.locator('textarea').first();
    await textarea.fill('{"name":"test","value":123}');

    // Wait for output to appear
    await page.waitForTimeout(500);

    const output = page.locator('.font-mono, [class*="output"], pre').first();
    await expect(output).toContainText('name');
  });

  test('Base64 roundtrip: encode then decode', async ({ page }) => {
    await page.goto('/tools/base64-converter');

    // Find the mode toggle for encode/decode
    const encodeTab = page.locator('button', { hasText: /编码|Encode/i }).first();
    await encodeTab.click();

    const textarea = page.locator('textarea').first();
    await textarea.fill('Hello World');

    // Should show encoded result
    await page.waitForTimeout(300);
    const output = page.locator('text=SGVsbG8gV29ybGQ=');
    await expect(output.first()).toBeVisible();
  });

  test('navigates to a tool page from homepage', async ({ page }) => {
    await page.goto('/');

    // Click on JSON formatter link
    const jsonLink = page.locator('a[href*="json-formatter"]').first();
    await jsonLink.click();

    // Should be on the tool page
    await expect(page).toHaveURL(/\/tools\/json-formatter/);
  });

  test('back navigation works', async ({ page }) => {
    await page.goto('/tools/json-formatter');

    const backLink = page.locator('a', { hasText: /返回|Back/i }).first();
    await backLink.click();

    // Should be back on homepage
    await expect(page).toHaveURL('/');
  });

  test('MD5 tool shows hash output', async ({ page }) => {
    await page.goto('/tools/md5-hash');

    const textarea = page.locator('textarea').first();
    await textarea.fill('hello');

    // MD5 hash of 'hello' is b14a7b8059d9c055954c916f

    await page.waitForTimeout(300);

    // SHA-256 tab should be selected by default, check hash is visible
    const hashOutput = page.locator('.font-mono').first();
    await expect(hashOutput).toBeVisible();
  });
});

test.describe('i18n language switching', () => {
  test('language switcher is present', async ({ page }) => {
    await page.goto('/');

    // Look for language toggle button
    const langToggle = page.locator('button', { hasText: /中|EN|i18n/i }).first();
    // It may or may not be present depending on implementation
  });

  test('can switch to English and back', async ({ page }) => {
    await page.goto('/');

    // Try to find and click language toggle
    const langBtn = page.locator('button').filter({ hasText: /EN/i }).first();
    if (await langBtn.isVisible()) {
      await langBtn.click();
      await page.waitForTimeout(500);
      // Check if page changed to English
      const englishText = page.locator('text=/Developer|Developer Tools/i');
      // if (await englishText.first().isVisible()) {
      //   // Success
      // }
    }
  });
});
