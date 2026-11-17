import { Locator, Page } from '@playwright/test';

export class InventoryLocators {
  public readonly title: Locator;
  public readonly inventoryItems: Locator;
  public readonly cartLink: Locator;

  constructor(page: Page) {
    this.title = page.getByTestId('title');
    this.inventoryItems = page.getByTestId('inventory-item');
    this.cartLink = page.getByTestId('shopping-cart-link');
  }
}
