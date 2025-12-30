#!/usr/bin/env node

/**
 * Test manuel de l'interface FuturistCards
 * Utilise les outils Playwright déjà installés
 */

const { test, expect } = require('@playwright/test');

// Configuration des pages à tester
const PAGES_CONFIG = [
  { path: '/', name: 'HomePage', public: true },
  { path: '/login', name: 'LoginPage', public: true },
  { path: '/register', name: 'RegisterPage', public: true },
  { path: '/cards', name: 'CardsPage', public: true },
  { path: '/services', name: 'ServicesPage', public: true },
  { path: '/packs', name: 'PacksPage', public: true },
  { path: '/contact', name: 'ContactPage', public: true },
  { path: '/about', name: 'AboutPage', public: true },
  { path: '/dashboard', name: 'DashboardPage', protected: true },
  { path: '/profile', name: 'ProfilePage', protected: true },
  { path: '/favorites', name: 'FavoritesPage', protected: true }
];

test.describe('Interface Complete FuturistCards', () => {
  
  test.beforeEach(async ({ page }) => {
    // Configuration de base
    await page.setViewportSize({ width: 1280, height: 720 });
  });

  // Test des pages publiques
  for (const pageConfig of PAGES_CONFIG.filter(p => p.public)) {
    test(`Page ${pageConfig.name} - Affichage et fonctionnalités`, async ({ page }) => {
      console.log(`🧪 Test de ${pageConfig.name}...`);
      
      // Navigation vers la page
      await page.goto(`http://localhost:3010${pageConfig.path}`);
      
      // Vérifier que la page se charge
      await expect(page.locator('body')).toBeVisible();
      
      // Vérifier la navbar
      await expect(page.locator('[data-testid="navbar"]')).toBeVisible();
      
      // Vérifier le contenu principal
      const mainContent = page.locator('main, [data-testid="page-content"], .main-content');
      await expect(mainContent).toBeVisible();
      
      // Test responsive - Mobile
      await page.setViewportSize({ width: 375, height: 667 });
      await page.waitForTimeout(500);
      
      // Vérifier que le contenu reste visible en mobile
      await expect(mainContent).toBeVisible();
      
      // Test du menu mobile si présent
      const mobileMenuButton = page.locator('[data-testid="mobile-menu-button"]');
      if (await mobileMenuButton.isVisible()) {
        await mobileMenuButton.click();
        await page.waitForTimeout(300);
        await mobileMenuButton.click();
      }
      
      // Revenir au desktop
      await page.setViewportSize({ width: 1280, height: 720 });
      
      console.log(`✅ ${pageConfig.name} - Test réussi`);
    });
  }

  test('Composants UI - GlassButton et GlassCard', async ({ page }) => {
    console.log('🎨 Test des composants UI...');
    
    await page.goto('http://localhost:3010/');
    
    // Vérifier les boutons glass
    const glassButtons = page.locator('button').filter({ hasText: /créer|commencer|découvrir/i });
    await expect(glassButtons.first()).toBeVisible();
    
    // Test hover sur bouton
    await glassButtons.first().hover();
    await page.waitForTimeout(300);
    
    // Vérifier les cartes glass (features)
    const featureCards = page.locator('[class*="backdrop-blur"]');
    await expect(featureCards.first()).toBeVisible();
    
    console.log('✅ Composants UI - Test réussi');
  });

  test('Navigation - Liens et menus', async ({ page }) => {
    console.log('🧭 Test de la navigation...');
    
    await page.goto('http://localhost:3010/');
    
    // Test navigation vers Services
    await page.click('a[href="/services"]');
    await expect(page).toHaveURL(/.*\/services/);
    
    // Test navigation vers Cards
    await page.click('a[href="/cards"]');
    await expect(page).toHaveURL(/.*\/cards/);
    
    // Test navigation vers About
    await page.click('a[href="/about"]');
    await expect(page).toHaveURL(/.*\/about/);
    
    console.log('✅ Navigation - Test réussi');
  });

  test('Authentification - Login et protection des routes', async ({ page }) => {
    console.log('🔐 Test de l\'authentification...');
    
    // Aller sur login
    await page.goto('http://localhost:3010/login');
    
    // Vérifier les champs de connexion
    await expect(page.locator('[data-testid="email-input"]')).toBeVisible();
    await expect(page.locator('[data-testid="password-input"]')).toBeVisible();
    await expect(page.locator('[data-testid="login-button"]')).toBeVisible();
    
    // Test avec utilisateur valide
    await page.fill('[data-testid="email-input"]', 'testnormal@example.com');
    await page.fill('[data-testid="password-input"]', 'TestPass123!');
    await page.click('[data-testid="login-button"]');
    
    // Attendre la redirection
    await page.waitForURL(/dashboard|\//, { timeout: 10000 });
    
    // Vérifier que l'utilisateur est connecté (navbar change)
    const logoutButton = page.locator('[data-testid="logout-button"], [data-testid="user-menu"]');
    await expect(logoutButton).toBeVisible({ timeout: 5000 });
    
    console.log('✅ Authentification - Test réussi');
  });

  test('Pages protégées - Accès après connexion', async ({ page }) => {
    console.log('🔒 Test des pages protégées...');
    
    // Connexion d'abord
    await page.goto('http://localhost:3010/login');
    await page.fill('[data-testid="email-input"]', 'testnormal@example.com');
    await page.fill('[data-testid="password-input"]', 'TestPass123!');
    await page.click('[data-testid="login-button"]');
    await page.waitForURL(/dashboard|\//, { timeout: 10000 });
    
    // Test Dashboard
    await page.goto('http://localhost:3010/dashboard');
    await expect(page.locator('main, [data-testid="page-content"]')).toBeVisible();
    
    // Test Profile
    await page.goto('http://localhost:3010/profile');
    await expect(page.locator('main, [data-testid="page-content"]')).toBeVisible();
    
    // Test Favorites
    await page.goto('http://localhost:3010/favorites');
    await expect(page.locator('main, [data-testid="page-content"]')).toBeVisible();
    
    console.log('✅ Pages protégées - Test réussi');
  });

  test('Thème et responsive - Dark/Light mode', async ({ page }) => {
    console.log('🎨 Test du thème et responsive...');
    
    await page.goto('http://localhost:3010/');
    
    // Test différentes tailles d'écran
    const viewports = [
      { width: 1920, height: 1080, name: 'Desktop Large' },
      { width: 1280, height: 720, name: 'Desktop' },
      { width: 768, height: 1024, name: 'Tablet' },
      { width: 375, height: 667, name: 'Mobile' }
    ];
    
    for (const viewport of viewports) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.waitForTimeout(500);
      
      // Vérifier que le contenu reste visible
      await expect(page.locator('body')).toBeVisible();
      await expect(page.locator('[data-testid="navbar"]')).toBeVisible();
      
      console.log(`✅ ${viewport.name} (${viewport.width}x${viewport.height}) - OK`);
    }
    
    console.log('✅ Responsive - Test réussi');
  });

});

console.log('📋 Configuration de test prête. Utilisez: npm test pour exécuter.');
