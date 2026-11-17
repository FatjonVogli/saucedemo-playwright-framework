import { Locator, Page } from '@playwright/test';

export class CheckoutOverviewLocators {
  public readonly cartItems: Locator;
  public readonly itemPrices: Locator;
  public readonly subtotalLabel: Locator;
  public readonly taxLabel: Locator;
  public readonly totalLabel: Locator;

  constructor(page: Page) {
    this.cartItems = page.getByTestId('inventory-item');
    this.itemPrices = this.cartItems.getByTestId('inventory-item-price');
    this.subtotalLabel = page.getByTestId('subtotal-label');
    this.taxLabel = page.getByTestId('tax-label');
    this.totalLabel = page.getByTestId('total-label');
  }
}
