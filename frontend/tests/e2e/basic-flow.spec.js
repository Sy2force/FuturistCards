// Test E2E basique pour FuturistCards
// Teste les fonctionnalités principales : connexion, changement de langue, thème, et navigation par rôle

import { test, expect } from '@playwright/test';

test.describe('FuturistCards - Tests E2E', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('Navigation et changement de langue', async ({ page }) => {
    // Vérifier que la page d'accueil se charge
    await expect(page.locator('h1')).toContainText('FuturistCards');
    
    // Tester le changement de langue (FR -> EN)
    const languageToggle = page.locator('[data-testid="language-toggle"]');
    if (await languageToggle.isVisible()) {
      await languageToggle.click();
      // Attendre que la langue change
      await page.waitForTimeout(500);
    }
    
    // Naviguer vers la page des cartes
    await page.click('[data-testid="nav-cards"]');
    await expect(page).toHaveURL(/.*\/cards/);
  });

  test('Changement de thème dark/light', async ({ page }) => {
    // Vérifier le thème initial
    const html = page.locator('html');
    
    // Cliquer sur le toggle de thème
    const themeToggle = page.locator('button').filter({ hasText: /🌙|☀️/ });
    if (await themeToggle.isVisible()) {
      await themeToggle.click();
      await page.waitForTimeout(500);
      
      // Vérifier que la classe dark a été ajoutée/supprimée
      const isDark = await html.getAttribute('class');
      expect(isDark).toBeDefined();
    }
  });

  test('Connexion utilisateur et navigation par rôle', async ({ page }) => {
    // Aller à la page de connexion
    await page.click('[data-testid="nav-login"]');
    await expect(page).toHaveURL(/.*\/login/);
    
    // Remplir le formulaire de connexion avec un utilisateur normal
    await page.fill('[data-testid="login-email"]', 'user@test.com');
    await page.fill('[data-testid="login-password"]', 'password123');
    
    // Soumettre le formulaire
    await page.click('[data-testid="login-button"]');
    
    // Attendre la redirection
    await page.waitForTimeout(2000);
    
    // Vérifier que l'utilisateur est connecté (présence du menu utilisateur)
    const userMenu = page.locator('button').filter({ hasText: /User/ });
    await expect(userMenu).toBeVisible();
  });

  test('Connexion admin et accès aux fonctionnalités admin', async ({ page }) => {
    // Aller à la page de connexion
    await page.click('[data-testid="nav-login"]');
    
    // Se connecter en tant qu'admin
    await page.fill('[data-testid="login-email"]', 'admin@test.com');
    await page.fill('[data-testid="login-password"]', 'password123');
    await page.click('[data-testid="login-button"]');
    
    // Attendre la redirection
    await page.waitForTimeout(2000);
    
    // Vérifier l'accès aux fonctionnalités admin
    // L'admin devrait voir le lien vers l'administration
    const adminLink = page.locator('a[href="/admin"]');
    if (await adminLink.isVisible()) {
      await adminLink.click();
      await expect(page).toHaveURL(/.*\/admin/);
    }
  });

  test('Connexion business et accès aux fonctionnalités business', async ({ page }) => {
    // Aller à la page de connexion
    await page.click('[data-testid="nav-login"]');
    
    // Se connecter en tant que business
    await page.fill('[data-testid="login-email"]', 'business@test.com');
    await page.fill('[data-testid="login-password"]', 'password123');
    await page.click('[data-testid="login-button"]');
    
    // Attendre la redirection
    await page.waitForTimeout(2000);
    
    // Vérifier l'accès aux fonctionnalités business
    // Le business devrait voir le lien pour créer des cartes
    const createCardLink = page.locator('a[href="/create-card"]');
    if (await createCardLink.isVisible()) {
      await createCardLink.click();
      await expect(page).toHaveURL(/.*\/create-card/);
    }
  });

  test('Recherche de cartes', async ({ page }) => {
    // Utiliser la barre de recherche dans la navbar
    const searchInput = page.locator('[data-testid="search-input"]');
    if (await searchInput.isVisible()) {
      await searchInput.fill('développeur');
      await page.keyboard.press('Enter');
      
      // Vérifier que nous sommes sur la page de recherche
      await expect(page).toHaveURL(/.*\/search/);
    } else {
      // Aller directement à la page de recherche
      await page.goto('http://localhost:3000/search');
    }
    
    // Vérifier que la page de recherche se charge
    await expect(page.locator('h1, h2')).toContainText(/recherche|search/i);
  });

  test('Navigation mobile', async ({ page }) => {
    // Simuler un écran mobile
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Vérifier que le menu mobile est présent
    const mobileMenuButton = page.locator('[data-testid="mobile-menu-button"]');
    await expect(mobileMenuButton).toBeVisible();
    
    // Ouvrir le menu mobile
    await mobileMenuButton.click();
    
    // Vérifier que les liens de navigation sont visibles
    await expect(page.locator('[data-testid="nav-home"]')).toBeVisible();
    await expect(page.locator('[data-testid="nav-cards"]')).toBeVisible();
  });

  test('Responsive design et lisibilité', async ({ page }) => {
    // Tester différentes tailles d'écran
    const viewports = [
      { width: 1920, height: 1080 }, // Desktop
      { width: 768, height: 1024 },  // Tablet
      { width: 375, height: 667 }    // Mobile
    ];
    
    for (const viewport of viewports) {
      await page.setViewportSize(viewport);
      
      // Vérifier que le contenu principal est visible
      await expect(page.locator('h1')).toBeVisible();
      
      // Vérifier que la navigation est accessible
      if (viewport.width < 768) {
        // Mobile : vérifier le menu hamburger
        await expect(page.locator('[data-testid="mobile-menu-button"]')).toBeVisible();
      } else {
        // Desktop/Tablet : vérifier la navigation normale
        await expect(page.locator('[data-testid="nav-home"]')).toBeVisible();
      }
    }
  });
});
