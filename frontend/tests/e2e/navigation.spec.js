import { test, expect } from '@playwright/test';
import { waitForPageLoad, waitForFramerMotion } from '../helpers/AuthHelper.js';

test.describe('Navigation Tests', () => {
  test.beforeEach(async ({ page }) => {
    const baseURL = 'http://localhost:3010';
    await page.goto(baseURL);
    await waitForPageLoad(page);
    await waitForFramerMotion(page);
    // Wait for navbar to be visible (visitor navbar for unauthenticated users)
    await page.waitForSelector('[data-testid="navbar-visitor"]', { timeout: 15000 });
  });

  test('should navigate to Home page', async ({ page }) => {
    await page.getByTestId('navbar-logo').click();
    await expect(page).toHaveURL(/.*\//);
    await expect(page.locator('h1')).toBeVisible();
  });

  test('should navigate to Cards page', async ({ page }) => {
    // Clear any existing auth state to ensure clean test
    await page.evaluate(() => {
      localStorage.clear();
    });
    
    // Navigate directly to cards page since navbar doesn't have cards link for visitors
    await page.goto('http://localhost:3010/cards');
    await expect(page).toHaveURL(/.*cards/);
    await expect(page.locator('h1')).toBeVisible();
  });

  test('should navigate to About page', async ({ page }) => {
    // Navigate directly to about page since navbar doesn't have about link for visitors
    await page.goto('http://localhost:3010/about');
    await expect(page).toHaveURL(/.*about/);
    await expect(page.locator('h1')).toBeVisible();
  });

  test('should navigate to Login page', async ({ page }) => {
    await page.getByTestId('link-login').click();
    await expect(page).toHaveURL(/.*login/);
    await expect(page.locator('form')).toBeVisible();
  });

  test('should navigate to Register page', async ({ page }) => {
    await page.getByTestId('link-register').click();
    await expect(page).toHaveURL(/.*register/);
    await expect(page.getByTestId('register-form')).toBeVisible();
  });

  test('should navigate via footer links', async ({ page }) => {
    // Test footer exists
    await expect(page.getByTestId('footer')).toBeVisible();
    
    // Test footer navigation links
    await expect(page.getByTestId('footer-home')).toBeVisible();
    await expect(page.getByTestId('footer-cards')).toBeVisible();
    await expect(page.getByTestId('footer-about')).toBeVisible();
  });

  test('should have accessible navigation links', async ({ page }) => {
    await page.goto('/');
    const loginLink = page.getByTestId('link-login');
    await loginLink.focus();
    await expect(loginLink).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/.*login/);
  });

  test('should work on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await waitForFramerMotion(page);
    
    // Test mobile menu toggle
    await expect(page.getByTestId('mobile-menu-toggle')).toBeVisible();
    await page.getByTestId('mobile-menu-toggle').click();
    await waitForFramerMotion(page);
    
    // Test that mobile nav is visible
    await expect(page.getByTestId('mobile-nav')).toBeVisible();
    
    // Test navigation works on mobile
    await page.getByTestId('mobile-link-login').click();
    await expect(page).toHaveURL(/.*login/);
  });

  test('should display correct language in navbar', async ({ page }) => {
    // Test that navbar displays text (simplified test)
    await expect(page.getByTestId('link-login')).toContainText('Connexion');
    await expect(page.getByTestId('link-register')).toContainText('Inscription');
  });

  test('should toggle theme correctly', async ({ page }) => {
    // Test theme toggle button exists and is clickable
    await expect(page.getByTestId('dark-mode-toggle')).toBeVisible();
    
    // Click theme toggle
    await page.getByTestId('dark-mode-toggle').click();
    await waitForFramerMotion(page);
    
    // Verify theme changed (check for dark class on html or body)
    const htmlElement = page.locator('html');
    await expect(htmlElement).toHaveClass(/dark/);
    
    // Toggle back
    await page.getByTestId('dark-mode-toggle').click();
    await waitForFramerMotion(page);
    
    // Verify theme changed back
    await expect(htmlElement).not.toHaveClass(/dark/);
  });
});
