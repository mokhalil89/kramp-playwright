import { authTest as test, authExpect as expect } from "../fixtures/authTest";
import { PageManager } from "../pages/pageManager";
import testData from "../data/testData.json";
import * as dotenv from "dotenv";

dotenv.config();

test.describe("KRAMP Authentication Tests", () => {
  test.setTimeout(90_000);

  test("@smoke Positive HTTP + UI Login", async ({ page }) => {
    const pm = new PageManager(page);

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
  });

  test("@negative Invalid HTTP auth", async ({ browser }) => {
    const context = await browser.newContext({
      httpCredentials: {
        username: testData.credentials.invalid.username,
        password: testData.credentials.invalid.password,
      },
    });

    const page = await context.newPage();

    const response = await page.goto("/");

    expect([401, 403]).toContain(response?.status());

    await context.close();
  });

  test("@negative Invalid UI login", async ({ page }) => {
    const pm = new PageManager(page);

    await test.step("Select language", async () => {
      await pm.language.setup({
        country: "OTHER",
        language: "en",
      });
    });

    await test.step("Open login page", async () => {
      await pm.home.openLoginPage();
      await pm.cookies.acceptCookiesIfVisible();
    });

    await test.step("Try invalid login", async () => {
      await pm.login.login(
        testData.credentials.invalid.username,
        testData.credentials.invalid.password,
      );
    });

    await test.step("Verify error message", async () => {
      await pm.login.expectErrorMessage();
    });
  });
});
