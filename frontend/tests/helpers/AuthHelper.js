// Helper functions for Playwright tests
export async function waitForPageLoad(page) {
  await page.waitForLoadState('networkidle');
}

export async function waitForFramerMotion(page, timeout = 800) {
  await page.waitForTimeout(timeout);
}

// Test credentials for different user roles
const testCredentials = {
  user: {
    email: 'testnormal@example.com',
    password: 'TestPass123!'
  },
  business: {
    email: 'testpro@example.com', 
    password: 'TestPass123!'
  },
  admin: {
    email: 'admin@example.com',
    password: 'TestPass123!'
  }
};

export function getTestCredentials(role = 'user') {
  return testCredentials[role] || testCredentials.user;
}

export const loginAs = async (page, role = 'user') => {
  const { email, password } = testCredentials[role];
  
  await page.goto('http://localhost:3010/login');
  await waitForPageLoad(page);
  await waitForFramerMotion(page);
  
  await page.fill('[data-testid="login-email"]', email);
  await page.fill('[data-testid="login-password"]', password);
  await page.click('[data-testid="submit-button"]');
  
  // Wait for form submission and any navigation
  await waitForPageLoad(page);
  await waitForFramerMotion(page);
  
  // Wait for the navbar to be visible with correct role
  await page.waitForSelector(`[data-testid="navbar-${role}"]`, { timeout: 15000 });
};

export async function logout(page) {
  await page.getByTestId('link-logout').click();
  await page.waitForSelector('[data-testid="link-login"]', { timeout: 15000 });
}
