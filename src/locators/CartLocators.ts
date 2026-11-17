import { Locator, Page } from '@playwright/test';

export class CartLocators {
  public readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.checkoutButton = page.getByTestId('checkout');
  }
}
