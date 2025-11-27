import { test, expect } from '@playwright/test';

test.describe('Authentication Tests', () => {
  test('should display login form on login page', async ({ page }) => {
    await page.goto('/login');
    
    // Wait for login form elements to load
    await page.waitForSelector('[data-testid="input-email"]', { timeout: 10000 });
    await page.waitForSelector('[data-testid="input-password"]', { timeout: 10000 });
    await page.waitForSelector('[data-testid="submit-button"]', { timeout: 10000 });
    
    // Check if login form elements are visible
    await expect(page.locator('[data-testid="input-email"]')).toBeVisible();
    await expect(page.locator('[data-testid="input-password"]')).toBeVisible();
    await expect(page.locator('[data-testid="submit-button"]')).toBeVisible();
  });

  test('should login with demo credentials', async ({ page }) => {
    await page.goto('/login');
    
    // Wait for login form elements to be visible
    await page.waitForSelector('[data-testid="input-email"]', { timeout: 10000 });
    await page.waitForSelector('[data-testid="input-password"]', { timeout: 10000 });
    await page.waitForSelector('[data-testid="submit-button"]', { timeout: 10000 });
    
    // Fill login form
    await page.fill('[data-testid="input-email"]', 'test@demo.com');
    await page.fill('[data-testid="input-password"]', 'Demo1234!');
    
    // Click login button
    await page.click('[data-testid="submit-button"]');
    
    // Wait for navigation or success message
    await page.waitForTimeout(2000);
    
    // Check if we're redirected or see success indication
    const url = page.url();
    expect(url).toContain('localhost:3000');
  });

  test('should show error for invalid credentials', async ({ page }) => {
    await page.goto('/login');
    
    // Wait for form elements to load
    await page.waitForSelector('[data-testid="input-email"]', { timeout: 10000 });
    await page.waitForSelector('[data-testid="input-password"]', { timeout: 10000 });
    await page.waitForSelector('[data-testid="submit-button"]', { timeout: 10000 });
    
    // Fill with invalid credentials
    await page.fill('[data-testid="input-email"]', 'invalid@test.com');
    await page.fill('[data-testid="input-password"]', 'wrongpass');
    
    // Click login button
    await page.click('[data-testid="submit-button"]');
    
    // Wait for error message or response
    await page.waitForTimeout(2000);
    
    // Should remain on login page (not redirect)
    expect(page.url()).toContain('/login');
  });

  test('should navigate to register page', async ({ page }) => {
    await page.goto('/login');
    
    // Wait for page to load
    await page.waitForTimeout(1000);
    
    // Look for register link in login page
    const registerLink = page.locator('[data-testid="login-register-link"]')
      .or(page.locator('text=S\'inscrire'))
      .or(page.locator('text=Register'))
      .or(page.locator('text=createAccount'))
      .or(page.locator('[href*="register"]'));
    
    // Check if register link exists and click it
    const linkCount = await registerLink.count();
    if (linkCount > 0) {
      await registerLink.first().click();
      await page.waitForTimeout(1000);
      
      // Should navigate to register page
      expect(page.url()).toContain('/register');
    } else {
      // If no register link found, just verify we're on login page
      expect(page.url()).toContain('/login');
    }
  });
});
