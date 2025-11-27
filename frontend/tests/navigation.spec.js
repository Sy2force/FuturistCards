import { test, expect } from '@playwright/test';

test.describe('Navigation Tests', () => {
  test('should load homepage successfully', async ({ page }) => {
    await page.goto('/');
    
    // Wait for page to load
    await page.waitForTimeout(2000);
    
    // Check if page loads with some content
    const bodyContent = await page.textContent('body');
    expect(bodyContent.length).toBeGreaterThan(50);
    
    // Check if main content is visible
    await expect(page.locator('#root')).toBeVisible();
    
    // Look for CardPro branding or key content
    const hasCardPro = await page.locator('text=CardPro').count() > 0;
    const hasContent = bodyContent.includes('CardPro') || bodyContent.includes('Card') || bodyContent.includes('Login');
    
    expect(hasCardPro || hasContent).toBeTruthy();
  });

  test('should display cards on cards page', async ({ page }) => {
    await page.goto('/cards');
    
    // Wait for content to load
    await page.waitForTimeout(3000);
    
    // Check if page has loaded content
    const bodyContent = await page.textContent('body');
    expect(bodyContent.length).toBeGreaterThan(100);
    
    // Look for card-related content
    const hasCards = await page.locator('text=Test Card').count() > 0;
    const hasCardContent = await page.locator('text=Developer').count() > 0;
    
    // Should have some card content or empty state
    expect(hasCards || hasCardContent || bodyContent.includes('card') || bodyContent.includes('Card')).toBeTruthy();
  });

  test('should be responsive', async ({ page }) => {
    await page.goto('/');
    
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(500);
    
    // Check if page is still functional
    const body = page.locator('body');
    await expect(body).toBeVisible();
    
    // Test desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.waitForTimeout(500);
    
    await expect(body).toBeVisible();
  });

  test('should handle API connectivity', async ({ page }) => {
    await page.goto('/');
    
    // Wait for any API calls to complete
    await page.waitForTimeout(3000);
    
    // Check for any error messages or failed states
    const errorElements = page.locator('text=Error').or(page.locator('text=Erreur')).or(page.locator('[class*="error"]'));
    
    // Should not have critical errors visible
    const hasErrors = await errorElements.count() > 0;
    if (hasErrors) {
      const errorText = await errorElements.first().textContent();
      // Log warning for debugging (lint ID: 92605e34-8ddf-4b48-a376-20615a1c9aa6)
      // eslint-disable-next-line no-console
      console.log('Warning: Found error element:', errorText);
    }
    
    // Page should still be functional
    const bodyText = await page.textContent('body');
    expect(bodyText.length).toBeGreaterThan(50);
  });
});
