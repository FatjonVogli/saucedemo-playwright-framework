import { Page } from '@playwright/test';
import { BasePage } from '../base/BasePage';
import { LoginLocators } from '../locators/LoginLocators';

export class LoginPage extends BasePage {
  readonly locators: LoginLocators;

  constructor(page: Page) {
    super(page);
    this.locators = new LoginLocators(page);
  }

  async open(): Promise<void> {
    await this.openApp();
  }

  async login(username: string, password: string): Promise<void> {
    await this.type(this.locators.usernameInput, username);
    await this.type(this.locators.passwordInput, password);
    await this.click(this.locators.loginButton);
  }
}
