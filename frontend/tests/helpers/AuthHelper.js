// Helper functions for Playwright tests
export async function waitForPageLoad(page) {
  await page.waitForLoadState('networkidle');
  // Wait for React app to mount by checking for the root element and navbar
  await page.waitForSelector('#root', { timeout: 15000 });
  await page.waitForTimeout(2000); // Give React time to render
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
  
  console.log(`Logging in as ${role}: ${email}`);
  
  // Make direct API call to login
  const response = await page.request.post('http://localhost:5001/api/auth/login', {
    data: { email, password }
  });
  
  if (!response.ok()) {
    throw new Error(`API login failed: ${response.status()} ${await response.text()}`);
  }
  
  const data = await response.json();
  console.log('API login successful:', data.user?.email, 'Role:', data.user?.role);
  
  // Navigate to any page first to ensure we have a context
  await page.goto('/');
  await waitForPageLoad(page);
  
  // Set authentication data in localStorage and trigger AuthContext
  await page.evaluate((loginData) => {
    localStorage.setItem('token', loginData.token);
    localStorage.setItem('user', JSON.stringify(loginData.user));
    
    // Trigger the userChanged event that AuthContext listens to
    window.dispatchEvent(new Event('userChanged'));
    
    console.log('Auth data set in localStorage:', {
      token: !!loginData.token,
      user: loginData.user?.email,
      role: loginData.user?.role
    });
  }, data);
  
  // Wait for AuthContext to update
  await page.waitForTimeout(2000);
  
  // Navigate to cards page to trigger authentication check
  await page.goto('/cards');
  await waitForPageLoad(page);
  
  // Verify authentication by checking for logout link (desktop or mobile)
  try {
    await page.waitForSelector('[data-testid="link-logout"], [data-testid="mobile-link-logout"]', { timeout: 10000 });
    console.log('Login completed successfully - logout link found');
  } catch (error) {
    console.log('Logout link not found, checking auth state...');
    
    // Debug: check what's in localStorage and DOM
    const debugInfo = await page.evaluate(() => ({
      token: !!localStorage.getItem('token'),
      user: localStorage.getItem('user'),
      desktopLogoutExists: !!document.querySelector('[data-testid="link-logout"]'),
      mobileLogoutExists: !!document.querySelector('[data-testid="mobile-link-logout"]'),
      loginLinkExists: !!document.querySelector('[data-testid="link-login"]')
    }));
    
    console.log('Debug info:', debugInfo);
    throw new Error('Authentication verification failed - logout link not found');
  }
};

export async function logout(page) {
  await page.getByTestId('link-logout').click();
  await page.waitForSelector('[data-testid="link-login"]', { timeout: 15000 });
}
