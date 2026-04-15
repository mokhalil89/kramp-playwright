import { Page, expect } from "@playwright/test";

export class LoginPage {
  constructor(private page: Page) {}

  private locators = {
    username: () => this.page.getByTestId("username"),
    password: () => this.page.getByTestId("password"),
    loginBtn: () => this.page.getByRole("button", { name: /log in/i }),
    errorMsg: () =>
      this.page.locator("p").filter({
        hasText:
          "The username or password is incorrect. Please check your details and try again.",
      }),
  };

  async login(username: string, password: string) {
    await this.locators.username().fill(username);
    await this.locators.password().fill(password);
    await this.locators.loginBtn().click();
  }

  async expectErrorMessage() {
    await expect(this.locators.errorMsg()).toBeVisible();
  }
}
