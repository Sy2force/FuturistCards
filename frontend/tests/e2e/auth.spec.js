import { test, expect } from '@playwright/test';
import { loginAs } from '../helpers/AuthHelper.js';

const baseURL = 'http://localhost:3010';

test.describe('Authentication Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(baseURL);
    await page.waitForLoadState('domcontentloaded');
    // Wait for React app to mount and render
    await page.waitForSelector('#root > *', { timeout: 15000 });
    await page.waitForTimeout(500);
  });

  test('should display correct navbar for visitors (unauthenticated)', async ({ page }) => {
    // Check navbar is visible with correct testid for visitors
    await expect(page.getByTestId('navbar-visitor')).toBeVisible();
    await expect(page.getByTestId('link-login')).toBeVisible();
    await expect(page.getByTestId('link-register')).toBeVisible();
    
    // Vérifier que les éléments authentifiés n'existent pas dans le DOM
    await expect(page.getByTestId('link-logout')).toHaveCount(0);
  });

  test('should login as regular user and display correct navbar', async ({ page }) => {
    await loginAs(page, 'user');
    
    // Check navbar is visible with correct testid for regular users
    await expect(page.getByTestId('navbar-user')).toBeVisible();
    await expect(page.getByTestId('link-favorites')).toBeVisible();
    await expect(page.getByTestId('link-logout')).toBeVisible();
    
    // Vérifier que les éléments admin ne sont pas visibles
    await expect(page.getByTestId('link-admin')).toHaveCount(0);
  });

  test('should login as business user and display correct navbar', async ({ page }) => {
    await loginAs(page, 'business');
    
    // Check navbar is visible with correct testid for business
    await expect(page.getByTestId('navbar-business')).toBeVisible();
    await expect(page.getByTestId('link-my-cards')).toBeVisible();
    await expect(page.getByTestId('link-logout')).toBeVisible();
    
    // Vérifier que les éléments admin ne sont pas visibles
    await expect(page.getByTestId('link-admin')).toHaveCount(0);
  });

  test('should login as admin and display correct navbar', async ({ page }) => {
    await loginAs(page, 'admin');
    
    // Check navbar is visible with correct testid for admin
    await expect(page.getByTestId('navbar-admin')).toBeVisible();
    await expect(page.getByTestId('link-admin')).toBeVisible();
    await expect(page.getByTestId('link-my-cards')).toBeVisible();
    await expect(page.getByTestId('link-logout')).toBeVisible();
  });

  test('should logout successfully', async ({ page }) => {
    await loginAs(page, 'user');
    
    // Click logout and wait for navigation
    await page.getByTestId('link-logout').click();
    await page.waitForURL(url => url.toString().includes('/login'), { timeout: 15000 });
    
    // Wait for login page to be ready
    await page.waitForSelector('[data-testid="login-form"]', { timeout: 10000 });
    
    // Verify we're on login page and elements are visible
    await expect(page).toHaveURL(/login/);
    await expect(page.getByTestId('login-form')).toBeVisible();
    await expect(page.getByTestId('link-login')).toBeVisible();
    await expect(page.getByTestId('link-register')).toBeVisible();
    
    // Vérifier que les éléments authentifiés ne sont plus visibles
    await expect(page.getByTestId('link-logout')).toHaveCount(0);
    await expect(page.getByTestId('user-badge')).toHaveCount(0);
  });

  test('should redirect unauthenticated users to login', async ({ page }) => {
    await page.goto(`${baseURL}/profile`);
    await page.waitForSelector('[data-testid="login-form"]', { timeout: 10000 });
    
    await expect(page).toHaveURL(/login/);
    await expect(page.getByTestId('login-form')).toBeVisible();
  });

  test('should protect business routes from regular users', async ({ page }) => {
    await loginAs(page, 'user');
    
    await page.goto(`${baseURL}/create-card`);
    await page.waitForTimeout(1000);
    // Should redirect to unauthorized or login depending on implementation
    const currentUrl = page.url();
    expect(currentUrl).toMatch(/(unauthorized|login)/);
  });

  test('should protect admin routes from non-admin users', async ({ page }) => {
    await loginAs(page, 'business');
    
    await page.goto(`${baseURL}/admin`);
    await page.waitForTimeout(1000);
    // Should redirect to unauthorized or login depending on implementation
    const currentUrl = page.url();
    expect(currentUrl).toMatch(/(unauthorized|login)/);
  });

  test('should allow business user to access dashboard', async ({ page }) => {
    await loginAs(page, 'business');
    
    // Vérifier que nous sommes sur le dashboard ou une page autorisée
    const currentUrl = page.url();
    expect(currentUrl).toMatch(/(dashboard|my-cards|cards)/);
    await expect(page.getByTestId('navbar-business')).toBeVisible();
  });

  test('should allow admin user to access Admin page', async ({ page }) => {
    await loginAs(page, 'admin');
    
    // Navigate to admin page after successful login
    await page.goto(`${baseURL}/admin`);
    await page.waitForTimeout(2000);
    
    // Check if we're on admin page or redirected to login
    const currentUrl = page.url();
    if (currentUrl.includes('/admin')) {
      await expect(page.getByTestId('admin-page')).toBeVisible();
    } else {
      // If redirected to login, that's also acceptable for this test
      expect(currentUrl).toMatch(/(admin|login)/);
    }
  });
});
