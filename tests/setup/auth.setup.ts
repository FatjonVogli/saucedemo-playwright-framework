import { test as setup, expect } from '../../src/fixtures';
import { authFiles, pageTitles, users } from '../../src/data/testData';

setup('authenticate standard_user', async ({ page, loginPage, inventoryPage }) => {
  await loginPage.open();
  await loginPage.login(users.standard.username, users.standard.password);
  await expect(inventoryPage.locators.title).toHaveText(pageTitles.inventory);
  await page.context().storageState({ path: authFiles.standard });
});

setup('authenticate problem_user', async ({ page, loginPage, inventoryPage }) => {
  await loginPage.open();
  await loginPage.login(users.problem.username, users.problem.password);
  await expect(inventoryPage.locators.title).toHaveText(pageTitles.inventory);
  await page.context().storageState({ path: authFiles.problem });
});
