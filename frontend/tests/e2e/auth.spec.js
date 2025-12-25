import { test, expect } from '@playwright/test';
import { loginAs } from '../helpers/AuthHelper.js';

const baseURL = 'http://localhost:3010';

test.describe('Authentication Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(baseURL);
    await page.waitForLoadState('networkidle');
    await page.waitForSelector('[data-testid="navbar"]', { timeout: 10000 });
  });

  test('should display correct navbar for visitors (unauthenticated)', async ({ page }) => {
    // Check navbar is visible
    await expect(page.getByTestId('navbar')).toBeVisible();
    await expect(page.getByTestId('nav-login')).toBeVisible();
    await expect(page.getByTestId('nav-register')).toBeVisible();
    
    // Vérifier que les éléments authentifiés n'existent pas dans le DOM
    await expect(page.getByTestId('logout-button')).toHaveCount(0);
    await expect(page.getByTestId('user-badge')).toHaveCount(0);
  });

  test('should login as regular user and display correct navbar', async ({ page }) => {
    await loginAs(page, 'user');
    
    // Check navbar is visible
    await expect(page.getByTestId('navbar')).toBeVisible();
    await expect(page.getByTestId('user-badge')).toContainText('User');
    await expect(page.getByTestId('navbar-link-profile')).toBeVisible();
    await expect(page.getByTestId('navbar-link-favorites')).toBeVisible();
    await expect(page.getByTestId('logout-button')).toBeVisible();
    
    // Vérifier que les éléments business/admin n'existent pas
    await expect(page.getByTestId('navbar-link-create-card')).toHaveCount(0);
    await expect(page.getByTestId('navbar-link-my-cards')).toHaveCount(0);
    await expect(page.getByTestId('navbar-link-admin')).toHaveCount(0);
  });

  test('should login as business user and display correct navbar', async ({ page }) => {
    await loginAs(page, 'business');
    
    // Check navbar is visible
    await expect(page.getByTestId('navbar')).toBeVisible();
    await expect(page.getByTestId('user-badge')).toContainText('Business');
    await expect(page.getByTestId('navbar-link-create-card')).toBeVisible();
    await expect(page.getByTestId('logout-button')).toBeVisible();
    
    // Vérifier que les éléments admin n'existent pas
    await expect(page.getByTestId('navbar-link-admin')).toHaveCount(0);
  });

  test('should login as admin and display correct navbar', async ({ page }) => {
    await loginAs(page, 'admin');
    
    // Check navbar is visible
    await expect(page.getByTestId('navbar')).toBeVisible();
    await expect(page.getByTestId('navbar-link-admin')).toBeVisible();
    await expect(page.getByTestId('user-badge')).toContainText('Admin');
    await expect(page.getByTestId('navbar-link-create-card')).toBeVisible();
    await expect(page.getByTestId('navbar-link-my-cards')).toBeVisible();
    await expect(page.getByTestId('logout-button')).toBeVisible();
  });

  test('should logout successfully', async ({ page }) => {
    await loginAs(page, 'user');
    
    // Click logout and wait for navigation
    await page.getByTestId('logout-button').click();
    await page.waitForURL(url => url.toString().includes('/login'), { timeout: 15000 });
    
    // Wait for login page to be ready
    await page.waitForSelector('[data-testid="login-page"]', { timeout: 10000 });
    
    // Verify we're on login page and elements are visible
    await expect(page).toHaveURL(/login/);
    await expect(page.getByTestId('login-page')).toBeVisible();
    await expect(page.getByTestId('nav-login')).toBeVisible();
    await expect(page.getByTestId('nav-register')).toBeVisible();
    
    // Vérifier que les éléments authentifiés ne sont plus visibles
    await expect(page.getByTestId('logout-button')).toHaveCount(0);
    await expect(page.getByTestId('user-badge')).toHaveCount(0);
  });

  test('should redirect unauthenticated users to login', async ({ page }) => {
    await page.goto(`${baseURL}/profile`);
    await page.waitForSelector('[data-testid="login-page"]', { timeout: 10000 });
    
    await expect(page).toHaveURL(/login/);
    await expect(page.getByTestId('login-page')).toBeVisible();
  });

  test('should protect business routes from regular users', async ({ page }) => {
    await loginAs(page, 'user');
    
    await page.goto(`${baseURL}/cards/create`);
    
    // Wait for either unauthorized page or redirect to login
    try {
      await page.waitForSelector('[data-testid="unauthorized-page"]', { timeout: 5000 });
      await expect(page.getByTestId('unauthorized-page')).toBeVisible();
    } catch {
      // If redirected to login, that's also valid protection
      await expect(page).toHaveURL(/login/);
    }
  });

  test('should protect admin routes from non-admin users', async ({ page }) => {
    await loginAs(page, 'business');
    
    await page.goto(`${baseURL}/admin`);
    await page.waitForSelector('[data-testid="unauthorized-page"]', { timeout: 10000 });
    
    await expect(page).toHaveURL(/unauthorized/);
    await expect(page.getByTestId('unauthorized-page')).toBeVisible();
  });

  test('should allow business user to access cards page', async ({ page }) => {
    // Login as business user (déjà sur /cards après login)
    await loginAs(page, 'business');
    
    // Vérifier que nous sommes sur la page cards et qu'elle est visible
    await expect(page).toHaveURL(/.*cards/);
    await expect(page.getByTestId('cards-page')).toBeVisible();
  });

  test('should allow admin user to access Admin page', async ({ page }) => {
    await loginAs(page, 'admin');
    
    await page.goto(`${baseURL}/admin`);
    await page.waitForSelector('[data-testid="admin-page"]', { timeout: 10000 });
    
    await expect(page).toHaveURL(/admin/);
    await expect(page.getByTestId('admin-page')).toBeVisible();
  });
});
