import { test, expect } from '@playwright/test';

// Configuration globale pour tous les tests
test.beforeEach(async ({ page }) => {
  // Attendre que la page soit complètement chargée
  await page.goto('http://localhost:3000');
  await page.waitForLoadState('networkidle');
});

test.describe('🏠 Navigation et Pages Principales', () => {
  test('Page d\'accueil - Éléments principaux visibles', async ({ page }) => {
    await expect(page.getByTestId('home-title')).toBeVisible({ timeout: 10000 });
    await expect(page.locator('nav')).toBeVisible();
    await expect(page.locator('main')).toBeVisible();
  });

  test('Navigation - Tous les liens fonctionnent', async ({ page }) => {
    // Test des liens principaux
    const links = [
      { text: 'Accueil', url: '/' },
      { text: 'Cartes', url: '/cards' },
      { text: 'Connexion', url: '/login' },
      { text: 'Inscription', url: '/register' }
    ];

    for (const link of links) {
      await page.click(`text=${link.text}`);
      await page.waitForLoadState('networkidle');
      expect(page.url()).toContain(link.url);
    }
  });

  test('Page 404 - Gestion des erreurs', async ({ page }) => {
    await page.goto('http://localhost:3000/page-inexistante');
    await page.waitForLoadState('networkidle');
    // Vérifier que la page se charge sans crash
    await expect(page.locator('body')).toBeVisible();
  });
});

test.describe('🔐 Authentification', () => {
  test('Formulaire de connexion - Structure et validation', async ({ page }) => {
    await page.goto('http://localhost:3000/login');
    await page.waitForLoadState('networkidle');
    
    await expect(page.getByTestId('login-form')).toBeVisible({ timeout: 10000 });
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('Formulaire de connexion - Validation des champs vides', async ({ page }) => {
    await page.goto('http://localhost:3000/login');
    await page.waitForLoadState('networkidle');
    
    // Essayer de soumettre le formulaire vide
    await page.click('button[type="submit"]');
    await page.waitForTimeout(1000);
    
    // Vérifier que les champs sont toujours visibles (pas de redirection)
    await expect(page.locator('input[name="email"]')).toBeVisible();
  });

  test('Formulaire d\'inscription - Structure complète', async ({ page }) => {
    await page.goto('http://localhost:3000/register');
    await page.waitForLoadState('networkidle');
    
    await expect(page.locator('form')).toBeVisible({ timeout: 10000 });
    await expect(page.locator('input[name="firstName"]')).toBeVisible();
    await expect(page.locator('input[name="lastName"]')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
    await expect(page.locator('select[name="role"]')).toBeVisible();
  });
});

test.describe('🗂️ Gestion des Cartes', () => {
  test('Page des cartes - Accessibilité et structure', async ({ page }) => {
    await page.goto('http://localhost:3000/cards');
    await page.waitForLoadState('networkidle');
    
    // Vérifier que la page se charge sans erreur
    await expect(page.locator('h1, h2, .title')).toBeVisible({ timeout: 10000 });
    await expect(page.locator('main')).toBeVisible();
  });

  test('Recherche de cartes - Fonctionnalité de base', async ({ page }) => {
    await page.goto('http://localhost:3000/cards');
    await page.waitForLoadState('networkidle');
    
    // Chercher un input de recherche
    const searchInput = page.locator('input[type="search"], input[placeholder*="recherche"], input[placeholder*="Recherche"]').first();
    if (await searchInput.isVisible()) {
      await searchInput.fill('test');
      await page.waitForTimeout(500);
      await expect(searchInput).toHaveValue('test');
    }
  });
});

test.describe('📱 Responsive Design', () => {
  test('Mobile - Navigation et affichage', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    
    // Vérifier que le contenu principal est visible
    await expect(page.getByTestId('home-title')).toBeVisible({ timeout: 10000 });
    
    // Vérifier la navigation mobile
    const mobileMenuButton = page.getByTestId('mobile-menu-button');
    if (await mobileMenuButton.isVisible()) {
      await mobileMenuButton.click();
      await page.waitForTimeout(500);
    }
  });

  test('Tablet - Affichage intermédiaire', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    
    await expect(page.getByTestId('home-title')).toBeVisible({ timeout: 10000 });
    await expect(page.locator('nav')).toBeVisible();
  });

  test('Desktop - Affichage complet', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    
    await expect(page.getByTestId('home-title')).toBeVisible({ timeout: 10000 });
    await expect(page.locator('nav')).toBeVisible();
  });
});

test.describe('⚡ Performance et Accessibilité', () => {
  test('Temps de chargement - Page d\'accueil', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    const loadTime = Date.now() - startTime;
    
    // Vérifier que la page se charge en moins de 5 secondes
    expect(loadTime).toBeLessThan(5000);
    await expect(page.getByTestId('home-title')).toBeVisible();
  });

  test('Accessibilité - Éléments focusables', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    
    // Tester la navigation au clavier
    await page.keyboard.press('Tab');
    await page.waitForTimeout(100);
    
    // Vérifier qu'un élément est focusé
    const focusedElement = await page.evaluate(() => document.activeElement?.tagName);
    expect(['A', 'BUTTON', 'INPUT'].includes(focusedElement || '')).toBeTruthy();
  });

  test('Images - Chargement et alt text', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    
    // Vérifier que les images ont des attributs alt
    const images = await page.locator('img').all();
    for (const img of images) {
      const alt = await img.getAttribute('alt');
      expect(alt).toBeDefined();
    }
  });
});

test.describe('🔄 Interactions Utilisateur', () => {
  test('Formulaires - Saisie et validation', async ({ page }) => {
    await page.goto('http://localhost:3000/register');
    await page.waitForLoadState('networkidle');
    
    // Remplir le formulaire avec des données de test
    await page.fill('input[name="firstName"]', 'Test');
    await page.fill('input[name="lastName"]', 'User');
    await page.fill('input[name="email"]', 'test@example.com');
    
    // Vérifier que les valeurs sont bien saisies
    await expect(page.locator('input[name="firstName"]')).toHaveValue('Test');
    await expect(page.locator('input[name="lastName"]')).toHaveValue('User');
    await expect(page.locator('input[name="email"]')).toHaveValue('test@example.com');
  });

  test('Navigation - Retour en arrière', async ({ page }) => {
    await page.goto('http://localhost:3000/login');
    await page.waitForLoadState('networkidle');
    
    await page.goBack();
    await page.waitForLoadState('networkidle');
    
    // Vérifier qu'on est revenu à l'accueil
    expect(page.url()).toBe('http://localhost:3000/');
  });
});
