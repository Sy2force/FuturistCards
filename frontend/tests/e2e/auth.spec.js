import { test, expect } from '@playwright/test';
import { loginAs } from '../helpers/AuthHelper.js';

const baseURL = 'http://localhost:3010';

test.describe('Authentication Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(baseURL);
    await page.waitForLoadState('networkidle');
    await page.waitForSelector('[data-testid="navbar-visitor"]', { timeout: 10000 });
  });

  test('should display correct navbar for visitors (unauthenticated)', async ({ page }) => {
    await expect(page.getByTestId('navbar-visitor')).toBeVisible();
    await expect(page.getByTestId('navbar-link-login')).toBeVisible();
    await expect(page.getByTestId('navbar-link-register')).toBeVisible();
    
    // Vérifier que les éléments authentifiés ne sont pas visibles
    await expect(page.getByTestId('navbar-logout')).not.toBeVisible();
    await expect(page.getByTestId('user-badge')).not.toBeVisible();
  });

  test('should login as regular user and display correct navbar', async ({ page }) => {
    await loginAs(page, 'user');
    
    await expect(page.getByTestId('navbar-user')).toBeVisible();
    await expect(page.getByTestId('navbar-link-user')).toBeVisible();
    await expect(page.getByTestId('user-badge')).toContainText('User');
    await expect(page.getByTestId('navbar-profile')).toBeVisible();
    await expect(page.getByTestId('navbar-favorites')).toBeVisible();
    await expect(page.getByTestId('navbar-logout')).toBeVisible();
    
    // Vérifier que les éléments business/admin ne sont pas visibles
    await expect(page.getByTestId('navbar-create-card')).not.toBeVisible();
    await expect(page.getByTestId('navbar-link-business')).not.toBeVisible();
    await expect(page.getByTestId('navbar-link-admin')).not.toBeVisible();
  });

  test('should login as business user and display correct navbar', async ({ page }) => {
    await loginAs(page, 'business');
    
    await expect(page.getByTestId('navbar-business')).toBeVisible();
    await expect(page.getByTestId('navbar-link-business')).toBeVisible();
    await expect(page.getByTestId('user-badge')).toContainText('Business');
    await expect(page.getByTestId('navbar-create-card')).toBeVisible();
    await expect(page.getByTestId('navbar-logout')).toBeVisible();
    
    // Vérifier que les éléments admin ne sont pas visibles
    await expect(page.getByTestId('navbar-link-admin')).not.toBeVisible();
  });

  test('should login as admin and display correct navbar', async ({ page }) => {
    await loginAs(page, 'admin');
    
    await expect(page.getByTestId('navbar-admin')).toBeVisible();
    await expect(page.getByTestId('navbar-link-admin')).toBeVisible();
    await expect(page.getByTestId('user-badge')).toContainText('Admin');
    await expect(page.getByTestId('navbar-create-card')).toBeVisible();
    await expect(page.getByTestId('navbar-logout')).toBeVisible();
  });

  test('should logout successfully', async ({ page }) => {
    await loginAs(page, 'user');
    
    await page.getByTestId('navbar-logout').click();
    
    // Attendre que la navbar visiteur réapparaisse
    await page.waitForSelector('[data-testid="navbar-visitor"]', { timeout: 15000 });
    await expect(page.getByTestId('navbar-visitor')).toBeVisible();
    await expect(page.getByTestId('navbar-link-login')).toBeVisible();
    await expect(page.getByTestId('navbar-link-register')).toBeVisible();
    
    // Vérifier que les éléments authentifiés ne sont plus visibles
    await expect(page.getByTestId('navbar-logout')).not.toBeVisible();
    await expect(page.getByTestId('user-badge')).not.toBeVisible();
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
    await page.waitForSelector('[data-testid="unauthorized-page"]', { timeout: 10000 });
    
    await expect(page).toHaveURL(/unauthorized/);
    await expect(page.getByTestId('unauthorized-page')).toBeVisible();
  });

  test('should protect admin routes from non-admin users', async ({ page }) => {
    await loginAs(page, 'business');
    
    await page.goto(`${baseURL}/admin`);
    await page.waitForSelector('[data-testid="unauthorized-page"]', { timeout: 10000 });
    
    await expect(page).toHaveURL(/unauthorized/);
    await expect(page.getByTestId('unauthorized-page')).toBeVisible();
  });

  test('should allow business user to access cards page', async ({ page }) => {
    await loginAs(page, 'business');
    
    // Vérifier qu'on est bien sur /cards après login
    await expect(page).toHaveURL(/cards/);
    
    // Vérifier que la page se charge correctement
    await page.waitForLoadState('networkidle');
    await expect(page.locator('body')).toBeVisible();
  });

  test('should allow admin user to access Admin page', async ({ page }) => {
    await loginAs(page, 'admin');
    
    await page.goto(`${baseURL}/admin`);
    await page.waitForSelector('[data-testid="admin-page"]', { timeout: 10000 });
    
    await expect(page).toHaveURL(/admin/);
    await expect(page.getByTestId('admin-page')).toBeVisible();
  });
});
