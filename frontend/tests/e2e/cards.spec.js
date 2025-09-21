// E2E Tests for Cards Management
import { test, expect } from '@playwright/test';

test.describe('Cards Management', () => {
  test.beforeEach(async ({ page }) => {
    // Login as business user before each test
    await page.goto('http://localhost:3000/login');
    await page.fill('[data-testid="email"]', 'john.doe@example.com');
    await page.fill('[data-testid="password"]', 'Password123!');
    await page.click('[data-testid="login-button"]');
    await expect(page.locator('[data-testid="user-menu"]')).toBeVisible();
  });

  test('should display cards gallery', async ({ page }) => {
    await page.goto('http://localhost:3000/cards');
    
    // Should show cards grid
    await expect(page.locator('[data-testid="cards-grid"]')).toBeVisible();
    
    // Should show search functionality
    await expect(page.locator('[data-testid="search-input"]')).toBeVisible();
    await expect(page.locator('[data-testid="category-filter"]')).toBeVisible();
  });

  test('should create new card (business user)', async ({ page }) => {
    await page.goto('http://localhost:3000/create-card');
    
    // Fill card creation form
    await page.fill('[data-testid="card-title"]', 'Test Business Card');
    await page.fill('[data-testid="card-description"]', 'This is a test business card');
    await page.fill('[data-testid="card-company"]', 'Test Company');
    await page.fill('[data-testid="card-position"]', 'Test Position');
    await page.fill('[data-testid="card-email"]', 'test@company.com');
    await page.fill('[data-testid="card-phone"]', '+1-555-0123');
    await page.selectOption('[data-testid="card-category"]', 'Technology');
    
    // Submit form
    await page.click('[data-testid="create-card-button"]');
    
    // Should redirect to my cards page
    await expect(page).toHaveURL(/.*\/my-cards/);
    await expect(page.locator('text=Test Business Card')).toBeVisible();
  });

  test('should edit existing card', async ({ page }) => {
    await page.goto('http://localhost:3000/my-cards');
    
    // Click edit button on first card
    await page.click('[data-testid="edit-card-button"]');
    
    // Should navigate to edit page with pre-filled form
    await expect(page).toHaveURL(/.*\/edit-card/);
    
    // Update card title
    await page.fill('[data-testid="card-title"]', 'Updated Card Title');
    
    // Submit changes
    await page.click('[data-testid="update-card-button"]');
    
    // Should redirect back to my cards
    await expect(page).toHaveURL(/.*\/my-cards/);
    await expect(page.locator('text=Updated Card Title')).toBeVisible();
  });

  test('should delete card', async ({ page }) => {
    await page.goto('http://localhost:3000/my-cards');
    
    // Click delete button
    await page.click('[data-testid="delete-card-button"]');
    
    // Confirm deletion in modal
    await page.click('[data-testid="confirm-delete"]');
    
    // Card should be removed from list
    await expect(page.locator('[data-testid="no-cards-message"]')).toBeVisible();
  });

  test('should add/remove card from favorites', async ({ page }) => {
    await page.goto('http://localhost:3000/cards');
    
    // Click favorite button on first card
    await page.click('[data-testid="favorite-button"]');
    
    // Navigate to favorites page
    await page.goto('http://localhost:3000/favorites');
    
    // Should show favorited card
    await expect(page.locator('[data-testid="favorite-card"]')).toBeVisible();
    
    // Remove from favorites
    await page.click('[data-testid="remove-favorite-button"]');
    
    // Should show empty favorites message
    await expect(page.locator('text=No favorite cards yet')).toBeVisible();
  });

  test('should search and filter cards', async ({ page }) => {
    await page.goto('http://localhost:3000/cards');
    
    // Search for specific card
    await page.fill('[data-testid="search-input"]', 'Tech');
    await page.press('[data-testid="search-input"]', 'Enter');
    
    // Should show filtered results
    await expect(page.locator('[data-testid="search-results"]')).toBeVisible();
    
    // Filter by category
    await page.selectOption('[data-testid="category-filter"]', 'Technology');
    
    // Should show category filtered results
    await expect(page.locator('[data-testid="filtered-cards"]')).toBeVisible();
  });
});
