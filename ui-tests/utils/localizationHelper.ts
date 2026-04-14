import { Page } from "@playwright/test";

type LanguageSetup = {
  country: string;
  language: string;
};

export class LanguageHelper {
  constructor(private page: Page) {}

  async setup(data: LanguageSetup): Promise<void> {
    const countrySelect = this.page.locator("select").nth(0);
    const languageSelect = this.page.locator("select").nth(1);

    const continueButton = this.page.locator(
      'a.ui-button--primary[href^="/shop"]',
    );

    await countrySelect.waitFor({ state: "visible", timeout: 10000 });
    await countrySelect.selectOption(data.country);

    await languageSelect.waitFor({ state: "visible", timeout: 10000 });
    await languageSelect.selectOption(data.language);

    await continueButton.waitFor({ state: "visible", timeout: 10000 });
    await continueButton.click();
  }
}
