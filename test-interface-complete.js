#!/usr/bin/env node

/**
 * Script de test complet de l'interface FuturistCards
 * Vérifie toutes les pages et fonctionnalités
 */

const { chromium } = require('playwright');

const PAGES_TO_TEST = [
  { url: '/', name: 'HomePage', requiresAuth: false },
  { url: '/login', name: 'LoginPage', requiresAuth: false },
  { url: '/register', name: 'RegisterPage', requiresAuth: false },
  { url: '/cards', name: 'CardsPage', requiresAuth: false },
  { url: '/services', name: 'ServicesPage', requiresAuth: false },
  { url: '/packs', name: 'PacksPage', requiresAuth: false },
  { url: '/contact', name: 'ContactPage', requiresAuth: false },
  { url: '/about', name: 'AboutPage', requiresAuth: false },
  { url: '/dashboard', name: 'DashboardPage', requiresAuth: true },
  { url: '/profile', name: 'ProfilePage', requiresAuth: true },
  { url: '/favorites', name: 'FavoritesPage', requiresAuth: true },
  { url: '/create-card', name: 'CreateCardPage', requiresAuth: true, requiresBusiness: true },
  { url: '/admin', name: 'AdminPage', requiresAuth: true, requiresAdmin: true }
];

const TEST_USERS = {
  user: { email: 'testnormal@example.com', password: 'TestPass123!', role: 'user' },
  business: { email: 'testpro@example.com', password: 'TestPass123!', role: 'business' },
  admin: { email: 'admin@example.com', password: 'TestPass123!', role: 'admin' }
};

async function loginUser(page, userType) {
  const user = TEST_USERS[userType];
  console.log(`🔐 Connexion en tant que ${userType}: ${user.email}`);
  
  await page.goto('http://localhost:3010/login');
  await page.waitForSelector('[data-testid="email-input"]', { timeout: 5000 });
  
  await page.fill('[data-testid="email-input"]', user.email);
  await page.fill('[data-testid="password-input"]', user.password);
  await page.click('[data-testid="login-button"]');
  
  // Attendre la redirection après connexion
  await page.waitForURL(/dashboard|\//, { timeout: 10000 });
  console.log(`✅ Connexion réussie pour ${userType}`);
}

async function testPageAccess(page, pageInfo, userRole = null) {
  try {
    console.log(`🧪 Test de la page: ${pageInfo.name} (${pageInfo.url})`);
    
    await page.goto(`http://localhost:3010${pageInfo.url}`, { waitUntil: 'networkidle' });
    
    // Vérifier que la page ne montre pas d'erreur
    const errorElement = await page.$('[data-testid="error-message"]');
    if (errorElement) {
      throw new Error('Page affiche une erreur');
    }
    
    // Vérifier que le contenu principal est chargé
    await page.waitForSelector('main, [data-testid="page-content"], .main-content', { timeout: 5000 });
    
    // Vérifier la navbar
    const navbar = await page.$('[data-testid="navbar"]');
    if (!navbar) {
      console.warn(`⚠️  Navbar manquante sur ${pageInfo.name}`);
    }
    
    // Vérifier les éléments interactifs
    const buttons = await page.$$('button:not([disabled])');
    const links = await page.$$('a[href]');
    
    console.log(`✅ ${pageInfo.name}: ${buttons.length} boutons, ${links.length} liens`);
    
    // Test responsive - simuler mobile
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(500);
    
    // Vérifier que le menu mobile fonctionne
    const mobileMenuButton = await page.$('[data-testid="mobile-menu-button"]');
    if (mobileMenuButton) {
      await mobileMenuButton.click();
      await page.waitForTimeout(500);
      await mobileMenuButton.click(); // Fermer
    }
    
    // Revenir au desktop
    await page.setViewportSize({ width: 1280, height: 720 });
    
    return { success: true, page: pageInfo.name };
    
  } catch (error) {
    console.error(`❌ Erreur sur ${pageInfo.name}: ${error.message}`);
    return { success: false, page: pageInfo.name, error: error.message };
  }
}

async function testUIComponents(page) {
  console.log('🎨 Test des composants UI...');
  
  try {
    // Aller sur la page d'accueil pour tester les composants
    await page.goto('http://localhost:3010/', { waitUntil: 'networkidle' });
    
    // Test des boutons GlassButton
    const glassButtons = await page.$$('[class*="glass"], button[class*="backdrop-blur"]');
    console.log(`✅ ${glassButtons.length} boutons glass trouvés`);
    
    // Test des cartes GlassCard
    const glassCards = await page.$$('[class*="backdrop-blur"][class*="rounded"]');
    console.log(`✅ ${glassCards.length} cartes glass trouvées`);
    
    // Test des animations (hover)
    if (glassButtons.length > 0) {
      await glassButtons[0].hover();
      await page.waitForTimeout(300);
    }
    
    return { success: true, components: glassButtons.length + glassCards.length };
    
  } catch (error) {
    console.error(`❌ Erreur test composants UI: ${error.message}`);
    return { success: false, error: error.message };
  }
}

async function testNavigation(page) {
  console.log('🧭 Test de la navigation...');
  
  try {
    await page.goto('http://localhost:3010/');
    
    // Test navigation via navbar
    const navLinks = await page.$$('[data-testid="nav-link"]');
    let successfulNavs = 0;
    
    for (let i = 0; i < Math.min(navLinks.length, 5); i++) {
      try {
        const href = await navLinks[i].getAttribute('href');
        if (href && !href.startsWith('#')) {
          await navLinks[i].click();
          await page.waitForTimeout(1000);
          successfulNavs++;
        }
      } catch (e) {
        console.warn(`⚠️  Navigation échouée pour le lien ${i}`);
      }
    }
    
    console.log(`✅ ${successfulNavs}/${navLinks.length} navigations réussies`);
    return { success: true, navigations: successfulNavs };
    
  } catch (error) {
    console.error(`❌ Erreur test navigation: ${error.message}`);
    return { success: false, error: error.message };
  }
}

async function runCompleteInterfaceTest() {
  console.log('🚀 Démarrage du test complet de l\'interface FuturistCards\n');
  
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  const results = {
    pages: [],
    components: null,
    navigation: null,
    summary: { total: 0, success: 0, failed: 0 }
  };
  
  try {
    // Test des pages publiques
    console.log('📄 Test des pages publiques...\n');
    for (const pageInfo of PAGES_TO_TEST.filter(p => !p.requiresAuth)) {
      const result = await testPageAccess(page, pageInfo);
      results.pages.push(result);
      results.summary.total++;
      if (result.success) results.summary.success++;
      else results.summary.failed++;
    }
    
    // Test avec utilisateur connecté
    console.log('\n👤 Test des pages avec utilisateur connecté...\n');
    await loginUser(page, 'user');
    
    for (const pageInfo of PAGES_TO_TEST.filter(p => p.requiresAuth && !p.requiresBusiness && !p.requiresAdmin)) {
      const result = await testPageAccess(page, pageInfo, 'user');
      results.pages.push(result);
      results.summary.total++;
      if (result.success) results.summary.success++;
      else results.summary.failed++;
    }
    
    // Test avec utilisateur business
    console.log('\n💼 Test des pages business...\n');
    await loginUser(page, 'business');
    
    for (const pageInfo of PAGES_TO_TEST.filter(p => p.requiresBusiness)) {
      const result = await testPageAccess(page, pageInfo, 'business');
      results.pages.push(result);
      results.summary.total++;
      if (result.success) results.summary.success++;
      else results.summary.failed++;
    }
    
    // Test avec admin
    console.log('\n👑 Test des pages admin...\n');
    await loginUser(page, 'admin');
    
    for (const pageInfo of PAGES_TO_TEST.filter(p => p.requiresAdmin)) {
      const result = await testPageAccess(page, pageInfo, 'admin');
      results.pages.push(result);
      results.summary.total++;
      if (result.success) results.summary.success++;
      else results.summary.failed++;
    }
    
    // Test des composants UI
    console.log('\n🎨 Test des composants UI...\n');
    results.components = await testUIComponents(page);
    
    // Test de la navigation
    console.log('\n🧭 Test de la navigation...\n');
    results.navigation = await testNavigation(page);
    
  } catch (error) {
    console.error(`❌ Erreur générale: ${error.message}`);
  } finally {
    await browser.close();
  }
  
  // Rapport final
  console.log('\n' + '='.repeat(60));
  console.log('📊 RAPPORT FINAL - TEST INTERFACE COMPLETE');
  console.log('='.repeat(60));
  console.log(`📄 Pages testées: ${results.summary.total}`);
  console.log(`✅ Succès: ${results.summary.success}`);
  console.log(`❌ Échecs: ${results.summary.failed}`);
  console.log(`📈 Taux de réussite: ${Math.round((results.summary.success / results.summary.total) * 100)}%`);
  
  if (results.components && results.components.success) {
    console.log(`🎨 Composants UI: ${results.components.components} éléments trouvés`);
  }
  
  if (results.navigation && results.navigation.success) {
    console.log(`🧭 Navigation: ${results.navigation.navigations} liens testés`);
  }
  
  console.log('\n📝 Détails des échecs:');
  results.pages.filter(p => !p.success).forEach(p => {
    console.log(`   ❌ ${p.page}: ${p.error}`);
  });
  
  console.log('\n🎉 Test terminé!');
  
  return results;
}

// Exécution si appelé directement
if (require.main === module) {
  runCompleteInterfaceTest().catch(console.error);
}

module.exports = { runCompleteInterfaceTest };
