import { Page } from '@playwright/test';
import { BasePage } from '../base/BasePage';
import { CheckoutOverviewLocators } from '../locators/CheckoutOverviewLocators';
import { pricing } from '../data/testData';
import { calculateOrderSummary, formatPrice, parsePrice } from '../utils/pricing';

export type SummaryLabels = {
  itemTotal: string;
  tax: string;
  total: string;
};

export class CheckoutOverviewPage extends BasePage {
  readonly locators: CheckoutOverviewLocators;

  constructor(page: Page) {
    super(page);
    this.locators = new CheckoutOverviewLocators(page);
  }

  async getItemPrices(): Promise<number[]> {
    await this.waitForVisible(this.locators.itemPrices.first());
    return (await this.getAllTexts(this.locators.itemPrices)).map(parsePrice);
  }

  async getExpectedSummary(): Promise<SummaryLabels> {
    const summary = calculateOrderSummary(await this.getItemPrices(), pricing.taxRate);
    return {
      itemTotal: `Item total: ${formatPrice(summary.itemTotal)}`,
      tax: `Tax: ${formatPrice(summary.tax)}`,
      total: `Total: ${formatPrice(summary.total)}`,
    };
  }
}
