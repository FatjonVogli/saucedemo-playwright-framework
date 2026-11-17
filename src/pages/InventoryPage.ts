import { Page } from '@playwright/test';
import { BasePage } from '../base/BasePage';
import { InventoryLocators } from '../locators/InventoryLocators';

export class InventoryPage extends BasePage {
  readonly locators: InventoryLocators;
  private readonly path = '/inventory.html';

  constructor(page: Page) {
    super(page);
    this.locators = new InventoryLocators(page);
  }

  async open(): Promise<void> {
    await this.openApp(this.path);
  }

  async addItemToCart(productName: string): Promise<void> {
    const item = this.locators.inventoryItems.filter({ hasText: productName });
    await this.click(item.getByRole('button', { name: 'Add to cart' }));
    await this.waitForVisible(item.getByRole('button', { name: 'Remove' }));
  }

  async openCart(): Promise<void> {
    await this.click(this.locators.cartLink);
  }
}
