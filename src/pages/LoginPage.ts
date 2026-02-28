import { Page, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;

  // Absolute URL avoids issues with missing baseURL
  private readonly fullUrl = 'https://pocketaces2.github.io/fashionhub/login.html';

  constructor(page: Page) {
    this.page = page;
  }

// -------- Selectors--------

get usernameInput() {
    return this.page.locator('input[name="username"]');
  }

  get passwordInput() {
    return this.page.locator('input[name="password"]');
  }

  get loginButton() {
    return this.page.locator('input[type="submit"][value="Login"]');
  }


  get welcomeMessage() {
    return this.page.locator('.account-page h2');
  }

  // -------- Actions --------

  async goto(): Promise<void> {
    await this.page.goto(this.fullUrl);
  }

  async fillCredentials(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
  }

  async submitLogin(): Promise<void> {
    await this.loginButton.click();
  }

  async assertWelcome(userName: string): Promise<void> {
    await expect(this.welcomeMessage).toContainText(userName);
  }
}