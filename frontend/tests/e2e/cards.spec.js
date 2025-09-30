import { test, expect } from '@playwright/test';

test.describe('Cards Management', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
    
    // Se connecter en tant que business
    await page.click('text=Connexion');
    await page.fill('input[name="email"]', 'business@test.com');
    await page.fill('input[name="password"]', 'Test1234!');
    await page.click('button[type="submit"]');
    await page.waitForSelector('text=Mon Profil');
  });

  test('should create a new card', async ({ page }) => {
    // Aller à la page de création
    await page.click('text=Créer une carte');
    
    // Remplir le formulaire
    await page.fill('input[name="title"]', 'Test Card');
    await page.fill('textarea[name="description"]', 'Description de test pour la carte');
    await page.fill('input[name="company"]', 'Test Company');
    await page.fill('input[name="position"]', 'Test Position');
    await page.fill('input[name="email"]', 'card@test.com');
    await page.fill('input[name="phone"]', '0501234567');
    await page.fill('input[name="address"]', '123 Test Street, Test City');
    
    // Soumettre
    await page.click('button[type="submit"]');
    
    // Vérifier la redirection
    await expect(page).toHaveURL(/\/my-cards/);
    
    // Vérifier que la carte est créée
    await expect(page.locator('text=Test Card')).toBeVisible();
  });

  test('should edit a card', async ({ page }) => {
    // Aller à mes cartes
    await page.click('text=Mes cartes');
    
    // Cliquer sur éditer (première carte)
    await page.click('button[aria-label="Edit card"]').first();
    
    // Modifier le titre
    await page.fill('input[name="title"]', 'Updated Card Title');
    
    // Sauvegarder
    await page.click('button[type="submit"]');
    
    // Vérifier la mise à jour
    await expect(page.locator('text=Updated Card Title')).toBeVisible();
  });

  test('should delete a card', async ({ page }) => {
    // Aller à mes cartes
    await page.click('text=Mes cartes');
    
    // Compter les cartes avant suppression
    const cardsBefore = await page.locator('.card-item').count();
    
    // Cliquer sur supprimer (première carte)
    await page.click('button[aria-label="Delete card"]').first();
    
    // Confirmer la suppression
    await page.click('text=Confirmer');
    
    // Vérifier qu'il y a une carte de moins
    const cardsAfter = await page.locator('.card-item').count();
    expect(cardsAfter).toBe(cardsBefore - 1);
  });

  test('should add card to favorites', async ({ page }) => {
    // Aller à la page des cartes
    await page.click('text=Toutes les cartes');
    
    // Cliquer sur le cœur de la première carte
    await page.click('button[aria-label="Add to favorites"]').first();
    
    // Aller aux favoris
    await page.click('text=Mes favoris');
    
    // Vérifier que la carte est dans les favoris
    expect(await page.locator('.card-item').count()).toBeGreaterThan(0);
  });

  test('should remove card from favorites', async ({ page }) => {
    // Aller aux favoris
    await page.click('text=Mes favoris');
    
    // Compter les favoris avant
    const favoritesBefore = await page.locator('.card-item').count();
    
    // Retirer des favoris
    await page.click('button[aria-label="Remove from favorites"]').first();
    
    // Vérifier qu'il y a un favori de moins
    const favoritesAfter = await page.locator('.card-item').count();
    expect(favoritesAfter).toBe(favoritesBefore - 1);
  });
});
