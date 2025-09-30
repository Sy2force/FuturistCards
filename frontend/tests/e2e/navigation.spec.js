import { test, expect } from '@playwright/test';

test.describe('Navigation Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
  });

  test('should navigate to home page', async ({ page, isMobile }) => {
    if (isMobile) {
      await page.getByTestId('mobile-menu-button').click();
      await page.waitForTimeout(500);
    }
    
    await page.getByTestId('nav-home').click();
    await page.waitForLoadState('domcontentloaded');
    await expect(page).toHaveURL(/\/$/);
  });

  test('should navigate to cards page', async ({ page, isMobile }) => {
    if (isMobile) {
      await page.getByTestId('mobile-menu-button').click();
      await page.waitForTimeout(500);
    }
    
    await page.getByTestId('nav-cards').click();
    await page.waitForLoadState('domcontentloaded');
    await expect(page).toHaveURL(/\/cards/);
  });

  test('should navigate to about page', async ({ page, isMobile }) => {
    if (isMobile) {
      await page.getByTestId('mobile-menu-button').click();
      await page.waitForTimeout(500);
    }
    
    await page.getByTestId('nav-about').click();
    await page.waitForLoadState('domcontentloaded');
    await expect(page).toHaveURL(/\/about/);
  });

  test('should display search functionality in navbar', async ({ page }) => {
    await expect(page.getByTestId('search-input')).toBeVisible();
    
    await page.getByTestId('search-input').fill('tech');
    await page.getByTestId('search-input').press('Enter');
  });

  test('should show login and register links when not authenticated', async ({ page }) => {
    await expect(page.getByTestId('nav-login')).toBeVisible();
    await expect(page.getByTestId('nav-register')).toBeVisible();
  });

  test('should navigate to login page', async ({ page }) => {
    await page.getByTestId('nav-login').click();
    await page.waitForLoadState('domcontentloaded');
    await expect(page).toHaveURL(/\/login/);
  });

  test('should navigate to register page', async ({ page }) => {
    await page.getByTestId('nav-register').click();
    await page.waitForLoadState('domcontentloaded');
    await expect(page).toHaveURL(/\/register/);
  });

  test('should have responsive mobile menu', async ({ page, isMobile }) => {
    if (isMobile) {
      await expect(page.getByTestId('mobile-menu-button')).toBeVisible();
      
      await page.getByTestId('mobile-menu-button').click();
      await page.waitForTimeout(500);
      
      await expect(page.getByTestId('nav-home')).toBeVisible();
      await expect(page.getByTestId('nav-cards')).toBeVisible();
      await expect(page.getByTestId('nav-about')).toBeVisible();
    }
  });
});
