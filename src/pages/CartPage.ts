import { Page } from '@playwright/test';
import { BasePage } from '../base/BasePage';
import { CartLocators } from '../locators/CartLocators';

export class CartPage extends BasePage {
  readonly locators: CartLocators;

  constructor(page: Page) {
    super(page);
    this.locators = new CartLocators(page);
  }

  async checkout(): Promise<void> {
    await this.click(this.locators.checkoutButton);
  }
}
