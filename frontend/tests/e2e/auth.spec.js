// E2E Tests for Authentication Flow
import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('should register new user successfully', async ({ page }) => {
    // Navigate to register page
    await page.click('text=Register');
    await expect(page).toHaveURL(/.*\/register/);

    // Fill registration form
    await page.fill('[data-testid="firstName"]', 'Test');
    await page.fill('[data-testid="lastName"]', 'User');
    await page.fill('[data-testid="email"]', 'test@example.com');
    await page.fill('[data-testid="password"]', 'TestPass123!');
    await page.selectOption('[data-testid="role"]', 'user');

    // Submit form
    await page.click('[data-testid="register-button"]');

    // Should redirect to home page after successful registration
    await expect(page).toHaveURL('http://localhost:3000/');
    await expect(page.locator('[data-testid="user-menu"]')).toBeVisible();
  });

  test('should login existing user successfully', async ({ page }) => {
    // Navigate to login page
    await page.click('text=Login');
    await expect(page).toHaveURL(/.*\/login/);

    // Fill login form
    await page.fill('[data-testid="email"]', 'test@example.com');
    await page.fill('[data-testid="password"]', 'TestPass123!');

    // Submit form
    await page.click('[data-testid="login-button"]');

    // Should redirect to home page after successful login
    await expect(page).toHaveURL('http://localhost:3000/');
    await expect(page.locator('[data-testid="user-menu"]')).toBeVisible();
  });

  test('should show validation errors for invalid input', async ({ page }) => {
    await page.click('text=Register');

    // Try to submit empty form
    await page.click('[data-testid="register-button"]');

    // Should show validation errors
    await expect(page.locator('text=First name is required')).toBeVisible();
    await expect(page.locator('text=Email is required')).toBeVisible();
  });

  test('should logout user successfully', async ({ page }) => {
    // Login first
    await page.click('text=Login');
    await page.fill('[data-testid="email"]', 'test@example.com');
    await page.fill('[data-testid="password"]', 'TestPass123!');
    await page.click('[data-testid="login-button"]');

    // Wait for login to complete
    await expect(page.locator('[data-testid="user-menu"]')).toBeVisible();

    // Logout
    await page.click('[data-testid="user-menu"]');
    await page.click('text=Logout');

    // Should redirect to home page and show login/register buttons
    await expect(page).toHaveURL('http://localhost:3000/');
    await expect(page.locator('text=Login')).toBeVisible();
    await expect(page.locator('text=Register')).toBeVisible();
  });

  test('should protect routes for unauthenticated users', async ({ page }) => {
    // Try to access protected route
    await page.goto('http://localhost:3000/my-cards');

    // Should redirect to login page
    await expect(page).toHaveURL(/.*\/login/);
  });
});
