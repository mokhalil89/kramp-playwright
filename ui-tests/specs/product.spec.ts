import { authTest as test, authExpect as expect } from "../fixtures/authTest";
import { PageManager } from "../pages/pageManager";
import testData from "../data/testData.json";

test.describe("Product Detail Page Tests", () => {
  test.setTimeout(90_000);

  test("User can open product details page from search results", async ({
    page,
  }) => {
    const pm = new PageManager(page);
    const product = testData.search.validProduct;

    await test.step("Open homepage", async () => {
      await page.goto("/");
    });

    await test.step("Accept cookies", async () => {
      await pm.cookies.acceptCookiesIfVisible();
    });

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

    await test.step("Search for product", async () => {
      await pm.home.searchFor(product.query);
    });

    await test.step("Click correct product", async () => {
      const productLink = page
        .locator('a[data-testid="item-tile-title"]')
        .filter({ hasText: product.productNumber })
        .first();

      await expect(productLink).toBeVisible({ timeout: 30000 });

      await Promise.all([page.waitForURL(/\/p\//), productLink.click()]);

      await expect(page.locator('[data-testid="ProductHeader"]')).toBeVisible({
        timeout: 30000,
      });
    });

    await test.step("Wait for product page", async () => {
      await expect(page.locator('[data-testid="attributes-list"]')).toBeVisible(
        {
          timeout: 30000,
        },
      );

      await expect(page.getByTestId("ProductHeader")).toBeVisible({
        timeout: 30000,
      });
    });

    await test.step("Verify product title", async () => {
      await test.step("Verify product title", async () => {
        await expect(page.getByTestId("ItemName")).toHaveText(product.title);
      });
    });

    await test.step("Verify product number", async () => {
      await expect(page.getByTestId("ItemNumber")).toHaveText(
        product.productNumber,
      );
    });

    await test.step("Verify EAN", async () => {
      await expect(
        page
          .locator('tr[data-testid="attribute-row"]', { hasText: "EAN" })
          .locator("td")
          .first(),
      ).toHaveText(product.ean);
    });

    await test.step("Verify brand", async () => {
      await expect(page.locator("#brand td").first()).toHaveText(product.brand);
    });

    await test.step("Verify product image is visible", async () => {
      await expect(
        page.locator('[data-testid="ProductImage"], img').first(),
      ).toBeVisible();
    });
  });
});
