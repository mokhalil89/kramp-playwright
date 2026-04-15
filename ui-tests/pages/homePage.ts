import { Page, expect } from "@playwright/test";

export class HomePage {
  constructor(private page: Page) {}

  private locators = {
    loginIcon: () =>
      this.page.locator('a[title="Log in"], a:has-text("Log in")'),

    accountIcon: () => this.page.getByTestId("AccountItem"),

    searchInput: () => this.page.getByTestId("header-search-input"),
  };

  async openLoginPage() {
    const login = this.locators.loginIcon();

    await login.waitFor({ state: "visible", timeout: 20000 });

    // The login link navigates to a different subdomain
    // (qa-task-login.demo.kramp.com). Use Promise.all to click
    // and wait for the cross-origin navigation simultaneously.
    await Promise.all([
      this.page.waitForURL(/qa-task-login/, { timeout: 30000 }),
      login.click(),
    ]);
  }

  async searchFor(query: string) {
    const searchInput = this.locators.searchInput();

    await searchInput.waitFor({ state: "visible", timeout: 10000 });

    await searchInput.click();

    await searchInput.pressSequentially(query, { delay: 80 });

    await expect(searchInput).toHaveValue(query);

    await Promise.all([
      this.page.waitForLoadState("domcontentloaded"),
      searchInput.press("Enter"),
    ]);

    await Promise.race([
      this.page.waitForSelector('[data-testid="products-item"]', {
        timeout: 30000,
      }),
      this.page.waitForSelector("span:has-text('Helaas')", { timeout: 30000 }),
    ]);
  }

  async expectResultsVisible() {
    await expect(
      this.page.locator('[data-testid="products-overview products-grid"]'),
    ).toBeVisible();
  }

  async expectLoggedIn() {
    await expect(this.locators.accountIcon()).toBeVisible({ timeout: 15000 });
  }

  async expectLoggedOut() {
    await expect(this.locators.loginIcon()).toBeVisible();
  }
}
