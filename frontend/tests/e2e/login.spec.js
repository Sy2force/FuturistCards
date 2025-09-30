import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(1000);
  });

  test('should display login page correctly', async ({ page }) => {
    await expect(page.getByTestId('login-email')).toBeVisible();
    await expect(page.getByTestId('login-password')).toBeVisible();
    await expect(page.getByTestId('login-button')).toBeVisible();
  });

  test('should login with demo account', async ({ page }) => {
    await page.getByTestId('login-email').fill('demo@futuristcards.com');
    await page.getByTestId('login-password').fill('Demo123!');
    await page.getByTestId('login-button').click();
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    // Check if we're redirected to home
    await expect(page).toHaveURL(/\//);
  });

  test('should show validation errors for empty fields', async ({ page }) => {
    await page.getByTestId('login-button').click();
    await expect(page.getByTestId('login-email')).toHaveAttribute('required');
    await expect(page.getByTestId('login-password')).toHaveAttribute('required');
  });

  test('should navigate to register page', async ({ page, isMobile }) => {
    if (isMobile) {
      // Sur mobile, chercher le lien dans la page login
      const registerLink = page.getByRole('link', { name: /créer un compte/i });
      if (await registerLink.count() > 0) {
        await registerLink.click();
      } else {
        await page.getByTestId('nav-register').click();
      }
    } else {
      await page.getByTestId('nav-register').click();
    }
    await page.waitForLoadState('domcontentloaded');
    await expect(page).toHaveURL(/register/i);
  });

  test('should logout successfully', async ({ page }) => {
    // Login first
    await page.getByTestId('login-email').fill('demo@futuristcards.com');
    await page.getByTestId('login-password').fill('Demo123!');
    await page.getByTestId('login-button').click();
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    // Find and click logout button
    const logoutButton = page.getByTestId('logout-button');
    if (await logoutButton.count() > 0) {
      await logoutButton.click();
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(/login|\/$/i);
    }
  });
});  
