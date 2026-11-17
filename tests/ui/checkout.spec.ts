import { test, expect } from '../../src/fixtures';
import { authFiles, knownDefects, products } from '../../src/data/testData';

test.describe('Checkout as standard_user', () => {
  test.use({ storageState: authFiles.standard });

  test('item total, tax and total match the item prices', { tag: '@smoke' }, async ({ inventoryPage, cartPage, checkoutInfoPage, checkoutOverviewPage }) => {
    await inventoryPage.open();
    await inventoryPage.addItemToCart(products.backpack);
    await inventoryPage.addItemToCart(products.bikeLight);
    await inventoryPage.openCart();
    await cartPage.checkout();
    await checkoutInfoPage.submitCustomerInfo();

    await expect(checkoutOverviewPage.locators.cartItems).toHaveCount(2);
    const expected = await checkoutOverviewPage.getExpectedSummary();
    await expect(checkoutOverviewPage.locators.subtotalLabel).toHaveText(expected.itemTotal);
    await expect(checkoutOverviewPage.locators.taxLabel).toHaveText(expected.tax);
    await expect(checkoutOverviewPage.locators.totalLabel).toHaveText(expected.total);
  });
});

test.describe('Checkout as problem_user', () => {
  test.use({ storageState: authFiles.problem });

  test('item total, tax and total match the item prices', { tag: '@known-defect' }, async ({ inventoryPage, cartPage, checkoutInfoPage, checkoutOverviewPage }) => {
    test.fail(true, knownDefects.problemUserCheckout);

    await inventoryPage.open();
    await inventoryPage.addItemToCart(products.backpack);
    await inventoryPage.addItemToCart(products.bikeLight);
    await inventoryPage.openCart();
    await cartPage.checkout();
    await checkoutInfoPage.submitCustomerInfo();

    await expect(checkoutOverviewPage.locators.cartItems).toHaveCount(2);
    const expected = await checkoutOverviewPage.getExpectedSummary();
    await expect(checkoutOverviewPage.locators.subtotalLabel).toHaveText(expected.itemTotal);
    await expect(checkoutOverviewPage.locators.taxLabel).toHaveText(expected.tax);
    await expect(checkoutOverviewPage.locators.totalLabel).toHaveText(expected.total);
  });
});
