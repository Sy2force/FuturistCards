// Test credentials for different user roles
const testCredentials = {
  user: {
    email: 'user@demo.com',
    password: 'Demo1234!'
  },
  business: {
    email: 'business@demo.com', 
    password: 'Demo1234!'
  },
  admin: {
    email: 'admin@demo.com',
    password: 'Demo1234!'
  }
};

export function getTestCredentials(role = 'user') {
  return testCredentials[role] || testCredentials.user;
}

export const loginAs = async (page, userType) => {
  // Go to login page
  await page.goto('http://localhost:3010/login');
  await page.waitForLoadState('networkidle');

  // Use the existing test credentials
  const creds = getTestCredentials(userType);
  
  // Fill login form using data-testid
  await page.fill('[data-testid="login-email"]', creds.email);
  await page.fill('[data-testid="login-password"]', creds.password);
  
  // Submit form
  await page.click('[data-testid="login-submit"]');
  
  // Attendre que la navigation vers /cards soit terminée
  await page.waitForURL('**/cards', { timeout: 30000 });
  
  // Attendre que l'état soit stable avant de vérifier les éléments
  await page.waitForTimeout(3000);
  
  // Attendre que le logout button soit visible (indique que l'utilisateur est connecté)
  await page.waitForSelector('[data-testid="logout-button"]', { timeout: 30000 });
};

export async function logout(page) {
  await page.getByTestId('logout-button').click();
  await page.waitForSelector('[data-testid="login-button"]', { timeout: 15000 });
}
