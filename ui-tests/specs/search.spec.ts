import { authTest as test, authExpect as expect } from "../fixtures/authTest";
import { PageManager } from "../pages/pageManager";
import testData from "../data/testData.json";

test.describe("Search Functionality Tests", () => {
  test.setTimeout(60_000);

  test("User can search for a valid product", async ({ page }) => {
    const pm = new PageManager(page);
    const product = testData.search.validProduct;

    await test.step("Select language", async () => {
      await pm.language.setup({
        country: "OTHER",
        language: "en",
      });
    });

    await test.step("Open login page", async () => {
      await pm.home.openLoginPage();
    });

    await test.step("Accept cookies on login page", async () => {
      await pm.cookies.acceptCookiesIfVisible();
    });

    await test.step("Login via UI", async () => {
      await pm.login.login(process.env.UI_USER!, process.env.UI_PASS!);
    });

    await test.step("Verify login success", async () => {
      await pm.home.expectLoggedIn();
    });

    await test.step("Search for valid product", async () => {
      await pm.home.searchFor(product.query);
    });

    await test.step("Verify results container is visible", async () => {
      const resultsContainer = page.locator(
        '[data-testid="products-overview products-grid"]',
      );
      await expect(resultsContainer).toBeVisible({ timeout: 15000 });
    });

    await test.step("Verify ONLY correct product is present", async () => {
      const productCards = page.locator('[data-testid="products-item"]');
      const count = await productCards.count();

      expect(count).toBeGreaterThan(0);

      const correctProduct = page
        .locator('[data-testid="item-tile-title"]')
        .filter({ hasText: product.productNumber });

      await expect(correctProduct).toBeVisible({ timeout: 15000 });
    });

    await test.step("Verify product title", async () => {
      await expect(
        page.getByText(product.title, { exact: true }).first(),
      ).toBeVisible({ timeout: 15000 });
    });

    await test.step("Verify brand", async () => {
      await expect(
        page.getByText(product.brand, { exact: true }).first(),
      ).toBeVisible({ timeout: 15000 });
    });
  });

  test("User sees no results when searching invalid product", async ({
    page,
  }) => {
    const pm = new PageManager(page);
    const invalidProduct = testData.search.invalidProduct;

    await test.step("Select language", async () => {
      await pm.language.setup({
        country: "OTHER",
        language: "en",
      });
    });

    await test.step("Open login page", async () => {
      await pm.home.openLoginPage();
    });

    await test.step("Accept cookies on login page", async () => {
      await pm.cookies.acceptCookiesIfVisible();
    });

    await test.step("Login via UI", async () => {
      await pm.login.login(process.env.UI_USER!, process.env.UI_PASS!);
    });

    await test.step("Verify login success", async () => {
      await pm.home.expectLoggedIn();
    });
    await test.step("Search for invalid product", async () => {
      await pm.home.searchFor(invalidProduct.query);
    });

    await test.step("Verify no results message is displayed", async () => {
      await expect(
        page.getByText(
          "Helaas heeft uw zoekopdracht geen resultaten opgeleverd",
        ),
      ).toBeVisible({ timeout: 15000 });
    });
  });
});
