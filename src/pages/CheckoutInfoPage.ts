import { Page } from '@playwright/test';
import { BasePage } from '../base/BasePage';
import { CheckoutInfoLocators } from '../locators/CheckoutInfoLocators';
import { dataFactory } from '../utils/dataFactory';

export type CustomerInfo = {
  firstName: string;
  lastName: string;
  postalCode: string;
};

export class CheckoutInfoPage extends BasePage {
  readonly locators: CheckoutInfoLocators;

  constructor(page: Page) {
    super(page);
    this.locators = new CheckoutInfoLocators(page);
  }

  async submitCustomerInfo(customer: CustomerInfo = dataFactory.customer()): Promise<void> {
    await this.type(this.locators.firstNameInput, customer.firstName);
    await this.type(this.locators.lastNameInput, customer.lastName);
    await this.type(this.locators.postalCodeInput, customer.postalCode);
    await this.click(this.locators.continueButton);
  }
}
