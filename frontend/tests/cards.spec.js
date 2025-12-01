import { test, expect } from '@playwright/test';

test.describe('Cards Management', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the app
    await page.goto('/');
  });

  test('should display cards page', async ({ page }) => {
    await page.click('text=Cards');
    await expect(page).toHaveURL(/.*cards/);
    await expect(page.locator('h1')).toContainText('Cards');
  });

  test('should search cards', async ({ page }) => {
    await page.goto('/cards');
    
    // Wait for cards to load
    await page.waitForSelector('[data-testid="card-item"]', { timeout: 10000 });
    
    // Search functionality
    const searchInput = page.locator('input[placeholder*="Search"]');
    if (await searchInput.count() > 0) {
      await searchInput.fill('test');
      await page.keyboard.press('Enter');
      
      // Wait for search results
      await page.waitForTimeout(1000);
    }
  });

  test('should navigate to card details', async ({ page }) => {
    await page.goto('/cards');
    
    // Wait for cards to load
    await page.waitForSelector('[data-testid="card-item"]', { timeout: 10000 });
    
    // Click on first card if available
    const firstCard = page.locator('[data-testid="card-item"]').first();
    if (await firstCard.count() > 0) {
      await firstCard.click();
      await expect(page).toHaveURL(/.*cards\/[a-f0-9]{24}/);
    }
  });

  test('should handle card creation flow (authenticated)', async ({ page }) => {
    // Try to access create card page
    await page.goto('/create-card');
    
    // Should redirect to login if not authenticated
    await expect(page).toHaveURL(/.*login/);
    
    // Login form should be visible
    await expect(page.locator('form')).toBeVisible();
  });

  test('should display favorites page', async ({ page }) => {
    await page.goto('/favorites');
    
    // Should redirect to login if not authenticated
    await expect(page).toHaveURL(/.*login/);
  });

  test('should handle 404 for invalid card ID', async ({ page }) => {
    await page.goto('/cards/invalid-id-123');
    
    // Should show 404 or error page
    await expect(page.locator('text=404')).toBeVisible({ timeout: 5000 });
  });
});
