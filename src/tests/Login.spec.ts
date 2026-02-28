
import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Login Page', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('User wants to verify the login functionality', async () => {
    // Given a valid user provides the right username & password
    await loginPage.fillCredentials('demouser', 'fashion123');

    // When the user submits the login form
    await loginPage.submitLogin();

    // Then the user should see a welcome message with his username
    await loginPage.assertWelcome('demouser');
  });
});