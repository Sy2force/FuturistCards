import { test, expect } from '@playwright/test';
import { loginAs } from '../helpers/AuthHelper.js';

const baseURL = 'http://localhost:3010';

test.describe('Authentication Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(baseURL);
    await page.waitForSelector('[data-testid="navbar-visitor"]', { timeout: 10000 });
  });



  test('should display correct navbar for visitors', async ({ page }) => {
    await expect(page.getByTestId('navbar-visitor')).toBeVisible();
    await expect(page.getByTestId('navbar-home')).toBeVisible();
    await expect(page.getByTestId('navbar-cards')).toBeVisible();
    await expect(page.getByTestId('navbar-about')).toBeVisible();
    await expect(page.getByTestId('navbar-login')).toBeVisible();
    await expect(page.getByTestId('navbar-register')).toBeVisible();
    
    await expect(page.getByTestId('navbar-profile')).not.toBeVisible();
    await expect(page.getByTestId('navbar-create-card')).not.toBeVisible();
    await expect(page.getByTestId('navbar-admin')).not.toBeVisible();
  });

  test('should login as user and display correct navbar', async ({ page }) => {
    await loginAs(page, 'user');
    
    await expect(page.getByTestId('navbar-user')).toBeVisible();
    await expect(page.getByTestId('user-badge')).toContainText('User');
    
    await expect(page.getByTestId('navbar-profile')).toBeVisible();
    await expect(page.getByTestId('navbar-favorites')).toBeVisible();
    
    await expect(page.getByTestId('navbar-create-card')).not.toBeVisible();
    await expect(page.getByTestId('navbar-my-cards')).not.toBeVisible();
    await expect(page.getByTestId('navbar-admin')).not.toBeVisible();
  });

  test('should login as business and display correct navbar', async ({ page }) => {
    await loginAs(page, 'business');
    
    await expect(page.getByTestId('navbar-business')).toBeVisible();
    await expect(page.getByTestId('user-badge')).toContainText('Business');
    
    await expect(page.getByTestId('navbar-create-card')).toBeVisible();
    await expect(page.getByTestId('navbar-my-cards')).toBeVisible();
    
    await expect(page.getByTestId('navbar-admin')).not.toBeVisible();
  });

  test('should login as admin and display correct navbar', async ({ page }) => {
    await loginAs(page, 'admin');
    
    await expect(page.getByTestId('navbar-admin')).toBeVisible();
    await expect(page.getByTestId('user-badge')).toContainText('Admin');
    
    await expect(page.getByTestId('navbar-create-card')).toBeVisible();
    await expect(page.getByTestId('navbar-admin-link')).toBeVisible();
    await expect(page.getByTestId('navbar-my-cards')).toBeVisible();
    await expect(page.getByTestId('navbar-admin')).toBeVisible();
  });

  test('should protect business routes from regular users', async ({ page }) => {
    await loginAs(page, 'user');
    
    await page.goto(`${baseURL}/cards/create`);
    await page.waitForURL(/unauthorized/, { timeout: 10000 });
    
    await expect(page).toHaveURL(/unauthorized/);
    await expect(page.getByTestId('unauthorized-page')).toBeVisible();
  });

  test('should protect admin routes from non-admin users', async ({ page }) => {
    await loginAs(page, 'business');
    
    await page.goto(`${baseURL}/admin`);
    await page.waitForURL(/unauthorized/, { timeout: 10000 });
    
    await expect(page).toHaveURL(/unauthorized/);
    await expect(page.getByTestId('unauthorized-page')).toBeVisible();
  });

  test('should redirect unauthenticated users to login', async ({ page }) => {
    await page.goto(`${baseURL}/profile`);
    await page.waitForURL(/login/, { timeout: 10000 });
    
    await expect(page).toHaveURL(/login/);
    await expect(page.getByTestId('login-page')).toBeVisible();
  });

  test('should allow business users to access MyCards page', async ({ page }) => {
    await loginAs(page, 'business');
    
    await page.goto(`${baseURL}/my-cards`);
    await expect(page).toHaveURL(/my-cards/);
    await expect(page.getByTestId('my-cards-page')).toBeVisible();
  });

  test('should allow admin users to access admin page', async ({ page }) => {
    await loginAs(page, 'admin');
    
    await page.goto(`${baseURL}/admin`);
    await expect(page).toHaveURL(/admin/);
    await expect(page.getByTestId('admin-page')).toBeVisible();
  });

  test('should logout successfully', async ({ page }) => {
    await loginAs(page, 'user');
    
    await page.getByTestId('navbar-logout').click();
    
    // Attendre la redirection forcée vers la home page
    await page.waitForURL(/\/$/, { timeout: 10000 });
    await page.waitForLoadState('networkidle');
    
    // Attendre explicitement que la navbar visitor soit présente
    await page.waitForSelector('[data-testid="navbar-visitor"]', { timeout: 10000 });
    
    // Vérifier que nous sommes bien sur la home page
    await expect(page).toHaveURL(/\/$/);
    await expect(page.getByTestId('navbar-visitor')).toBeVisible();
    await expect(page.getByTestId('navbar-login')).toBeVisible();
    await expect(page.getByTestId('navbar-logout')).not.toBeVisible();
    await expect(page.getByTestId('user-badge')).not.toBeVisible();
  });
});
