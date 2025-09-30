import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('should login successfully', async ({ page }) => {
    // Aller à la page de connexion
    await page.click('text=Connexion');
    
    // Remplir le formulaire
    await page.fill('input[name="email"]', 'user@test.com');
    await page.fill('input[name="password"]', 'Test1234!');
    
    // Soumettre
    await page.click('button[type="submit"]');
    
    // Vérifier la redirection
    await expect(page).toHaveURL('http://localhost:3000/');
    
    // Vérifier que l'utilisateur est connecté
    await expect(page.locator('text=Mon Profil')).toBeVisible();
  });

  test('should show error on invalid credentials', async ({ page }) => {
    await page.click('text=Connexion');
    
    await page.fill('input[name="email"]', 'invalid@test.com');
    await page.fill('input[name="password"]', 'wrong');
    
    await page.click('button[type="submit"]');
    
    // Vérifier le message d'erreur
    await expect(page.locator('text=Email ou mot de passe incorrect')).toBeVisible();
  });

  test('should register new user', async ({ page }) => {
    await page.click('text=Inscription');
    
    // Remplir le formulaire
    await page.fill('input[name="firstName"]', 'Test');
    await page.fill('input[name="lastName"]', 'User');
    await page.fill('input[name="email"]', `test${Date.now()}@test.com`);
    await page.fill('input[name="password"]', 'Test1234!');
    await page.fill('input[name="phone"]', '0501234567');
    
    await page.click('button[type="submit"]');
    
    // Vérifier la redirection vers login
    await expect(page).toHaveURL('http://localhost:3000/login');
  });

  test('should logout successfully', async ({ page }) => {
    // Se connecter d'abord
    await page.click('text=Connexion');
    await page.fill('input[name="email"]', 'user@test.com');
    await page.fill('input[name="password"]', 'Test1234!');
    await page.click('button[type="submit"]');
    
    // Attendre que la connexion soit effective
    await page.waitForSelector('text=Mon Profil');
    
    // Se déconnecter
    await page.click('text=Déconnexion');
    
    // Vérifier la déconnexion
    await expect(page.locator('text=Connexion')).toBeVisible();
  });
});
