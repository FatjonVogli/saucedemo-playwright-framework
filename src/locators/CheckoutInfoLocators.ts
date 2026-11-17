import { Locator, Page } from '@playwright/test';

export class CheckoutInfoLocators {
  public readonly firstNameInput: Locator;
  public readonly lastNameInput: Locator;
  public readonly postalCodeInput: Locator;
  public readonly continueButton: Locator;

  constructor(page: Page) {
    this.firstNameInput = page.getByTestId('firstName');
    this.lastNameInput = page.getByTestId('lastName');
    this.postalCodeInput = page.getByTestId('postalCode');
    this.continueButton = page.getByTestId('continue');
  }
}
