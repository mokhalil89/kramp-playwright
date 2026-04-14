import { Page } from "@playwright/test";

export class CookieHelper {
  constructor(private page: Page) {}

  private get acceptButton() {
    return this.page.locator("#onetrust-accept-btn-handler");
  }

  async acceptCookiesIfVisible(): Promise<void> {
    try {
      await this.acceptButton.waitFor({ state: "visible", timeout: 5000 });
      await this.acceptButton.click();
      await this.acceptButton.waitFor({ state: "hidden", timeout: 5000 });
    } catch {}
  }
}
