import { test, expect } from '@playwright/test';

test.describe('Navigation Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should navigate to Home page', async ({ page }) => {
    await page.getByTestId('navbar-link-home').click();
    await expect(page).toHaveURL(/.*\//);
    await expect(page.locator('h1')).toBeVisible();
  });

  test('should navigate to Cards page', async ({ page }) => {
    await page.getByTestId('navbar-link-cards').click();
    await expect(page).toHaveURL(/.*cards/);
    await expect(page.locator('h1')).toBeVisible();
  });

  test('should navigate to About page', async ({ page }) => {
    await page.getByTestId('navbar-link-about').click();
    await expect(page).toHaveURL(/.*about/);
    await expect(page.locator('h1')).toBeVisible();
  });

  test('should navigate to Login page', async ({ page }) => {
    await page.getByTestId('navbar-link-login').click();
    await expect(page).toHaveURL(/.*login/);
    await expect(page.locator('form')).toBeVisible();
  });

  test('should navigate to Register page', async ({ page }) => {
    await page.getByTestId('navbar-link-register').click();
    await expect(page).toHaveURL(/.*register/);
    await expect(page.locator('form')).toBeVisible();
  });

  test('should navigate via footer links', async ({ page }) => {
    // Test About link in footer
    await page.getByTestId('footer-link-about').click();
    await expect(page).toHaveURL(/.*about/);
    
    // Go back to home
    await page.goto('/');
    
    // Test Contact link in footer
    await page.getByTestId('footer-link-contact').click();
    await expect(page).toHaveURL(/.*contact/);
    
    // Go back to home
    await page.goto('/');
    
    // Test Privacy link in footer
    await page.getByTestId('footer-link-privacy').click();
    await expect(page).toHaveURL(/.*privacy/);
  });

  test('should have accessible navigation links', async ({ page }) => {
    // Check that all navbar links are keyboard accessible
    const homeLink = page.getByTestId('navbar-link-home');
    
    // Focus the home link directly
    await homeLink.focus();
    await expect(homeLink).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/.*\//);
    
    // Go back and test Cards link
    await page.goto('/');
    const cardsLink = page.getByTestId('navbar-link-cards');
    await cardsLink.focus();
    await expect(cardsLink).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/.*cards/);
  });

  test('should work on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Open mobile menu
    await page.getByTestId('navbar-mobile-toggle').click();
    
    // Wait for mobile menu to appear and be stable
    await page.waitForTimeout(500);
    await page.waitForSelector('.md\\:hidden.py-4', { state: 'visible', timeout: 10000 });
    
    // Test navigation in mobile menu - wait for link to be clickable
    const mobileHomeLink = page.locator('.md\\:hidden').getByText('Accueil').first();
    await mobileHomeLink.waitFor({ state: 'visible' });
    await mobileHomeLink.click();
    await expect(page).toHaveURL(/.*\//);
  });

  test('should display correct language in navbar', async ({ page }) => {
    // Test French (default)
    await expect(page.getByTestId('navbar-link-home')).toContainText('Accueil');
    await expect(page.getByTestId('navbar-link-cards')).toContainText('Cartes');
    await expect(page.getByTestId('navbar-link-about')).toContainText('À propos');
    
    // Switch to English and test
    const languageSelector = page.locator('select[data-testid="language-selector"]');
    await languageSelector.selectOption('en');
    
    await expect(page.getByTestId('navbar-link-home')).toContainText('Home');
    await expect(page.getByTestId('navbar-link-cards')).toContainText('Cards');
    await expect(page.getByTestId('navbar-link-about')).toContainText('About');
  });

  test('should toggle theme correctly', async ({ page }) => {
    // Test theme toggle button exists
    const themeToggle = page.getByTestId('theme-toggle');
    await expect(themeToggle).toBeVisible();
    
    // Click theme toggle
    await themeToggle.click();
    
    // Check if dark mode is applied
    const html = page.locator('html');
    await expect(html).toHaveClass(/dark/);
    
    // Click again to toggle back
    await themeToggle.click();
    await expect(html).not.toHaveClass(/dark/);
  });
});
