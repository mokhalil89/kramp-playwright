import { test as baseTest, expect as baseExpect } from "./baseTest";
import * as dotenv from "dotenv";

dotenv.config();

export const authTest = baseTest.extend({
  context: async ({ browser }, use) => {
    const { BASIC_AUTH_USER, BASIC_AUTH_PASS } = process.env;

    if (!BASIC_AUTH_USER || !BASIC_AUTH_PASS) {
      throw new Error("Missing BASIC_AUTH_USER or BASIC_AUTH_PASS");
    }

    const context = await browser.newContext({
      httpCredentials: {
        username: BASIC_AUTH_USER,
        password: BASIC_AUTH_PASS,
      },
      viewport: { width: 1920, height: 1080 },
    });

    await use(context);
    await context.close();
  },
});

export { baseExpect as authExpect };
