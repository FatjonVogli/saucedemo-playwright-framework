import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutInfoPage } from '../pages/CheckoutInfoPage';
import { CheckoutOverviewPage } from '../pages/CheckoutOverviewPage';
import { UsersApi } from '../api/UsersApi';
import { PostsApi } from '../api/PostsApi';

type Pages = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkoutInfoPage: CheckoutInfoPage;
  checkoutOverviewPage: CheckoutOverviewPage;
};

type Apis = {
  usersApi: UsersApi;
  postsApi: PostsApi;
};

export const test = base.extend<Pages & Apis>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  checkoutInfoPage: async ({ page }, use) => {
    await use(new CheckoutInfoPage(page));
  },
  checkoutOverviewPage: async ({ page }, use) => {
    await use(new CheckoutOverviewPage(page));
  },
  usersApi: async ({ request }, use) => {
    await use(new UsersApi(request));
  },
  postsApi: async ({ request }, use) => {
    await use(new PostsApi(request));
  },
});

export { expect };
