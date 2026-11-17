import { Locator, Page } from '@playwright/test';

export abstract class BasePage {
  constructor(protected readonly page: Page) {}

  async openApp(path = '/'): Promise<void> {
    await this.page.goto(path);
  }

  async click(element: Locator): Promise<void> {
    await element.click();
  }

  async type(element: Locator, text: string): Promise<void> {
    await element.fill(text);
  }

  async getAllTexts(element: Locator): Promise<string[]> {
    return (await element.allInnerTexts()).map((t) => t.trim());
  }

  async waitForVisible(element: Locator): Promise<void> {
    await element.waitFor({ state: 'visible' });
  }
}
