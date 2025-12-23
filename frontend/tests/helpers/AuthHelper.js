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

export async function loginAs(page, role = 'user') {
  const accounts = {
    user: { email: "user@demo.com", password: "Demo1234!" },
    business: { email: "business@demo.com", password: "Demo1234!" },
    admin: { email: "admin@demo.com", password: "Demo1234!" }
  };

  const { email, password } = accounts[role];
  
  await page.goto("/login");
  await page.getByTestId("login-email").fill(email);
  await page.getByTestId("login-password").fill(password);
  await page.getByTestId("login-submit").click();

  const expectedNavbar = role === 'admin'
    ? 'navbar-admin'
    : role === 'business'
    ? 'navbar-business'
    : 'navbar-user';

  await page.waitForSelector(`[data-testid="${expectedNavbar}"]`, { timeout: 15000 });
}

export async function logout(page) {
  await page.click('[data-testid="navbar-logout"]');
  await page.waitForURL('**/', { timeout: 10000 });
  await page.waitForLoadState('networkidle');
}
