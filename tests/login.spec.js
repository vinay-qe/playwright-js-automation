import { test, expect } from '@playwright/test';

test('Verify Swag Labs Shopping Flow', async ({ page }) => {
  // 1. Navigate to the practice site
  await page.goto('https://www.saucedemo.com/');

  // 2. Login
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  // 3. Assertion: Verify we logged in successfully by checking the header
  await expect(page.locator('.app_logo')).toHaveText('Swag Labs');

  // 4. Action: Add the first item to the cart
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

  // 5. Assertion: Verify the cart badge shows "1"
  const cartBadge = page.locator('.shopping_cart_badge');
  await expect(cartBadge).toHaveText('1');
  
  // Optional: Take a screenshot for your Jenkins report
  await page.screenshot({ path: 'screenshots/cart-verified.png' });
});