import { authTest as test, authExpect as expect } from "../fixtures/authTest";
import { CookieHelper } from "../utils/cookieHelper";
import { LanguageHelper } from "../utils/localizationHelper";

test("user can access homepage with HTTP auth", async ({ page }) => {
  const cookies = new CookieHelper(page);
  const languageHelper = new LanguageHelper(page);
  await page.goto("/");
  await expect(page.locator("body")).toBeVisible();
  await cookies.acceptCookiesIfVisible();

  await languageHelper.setup({
    country: "OTHER",
    language: "en",
  });
  await expect(page).toHaveURL(/shop-de|shop-en/);
});
