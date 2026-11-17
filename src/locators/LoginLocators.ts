import { Locator, Page } from '@playwright/test';

export class LoginLocators {
  public readonly usernameInput: Locator;
  public readonly passwordInput: Locator;
  public readonly loginButton: Locator;

  constructor(page: Page) {
    this.usernameInput = page.getByTestId('username');
    this.passwordInput = page.getByTestId('password');
    this.loginButton = page.getByTestId('login-button');
  }
}
