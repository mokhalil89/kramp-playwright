import { test as base, expect as baseExpect } from "@playwright/test";
import { CookieHelper } from "../utils/cookieHelper";

export const test = base.extend<{}>({
  context: async ({ browser }, use) => {
    const context = await browser.newContext({
      viewport: { width: 1920, height: 1080 },
    });
    await use(context);
    await context.close();
  },

  page: async ({ page }, use) => {
    await page.goto("/");
    const cookies = new CookieHelper(page);
    await cookies.acceptCookiesIfVisible();
    await use(page);
  },
});

export { baseExpect as expect };
