import { test as base, expect as baseExpect } from "@playwright/test";
import * as dotenv from "dotenv";

dotenv.config();

export const authTest = base.extend({
  context: async (
    { browser }: { browser: any },
    use: (context: any) => Promise<void>,
  ) => {
    const { BASIC_AUTH_USER: username, BASIC_AUTH_PASS: password } =
      process.env;

    if (!username || !password) {
      throw new Error(
        "Environment variables BASIC_AUTH_USER and BASIC_AUTH_PASS must be set in .env",
      );
    }

    const context = await browser.newContext({
      httpCredentials: {
        username,
        password,
      },
    });

    await use(context);
    await context.close();
  },

  page: async ({ context }, use) => {
    const page = await context.newPage();
    await use(page);
  },
});

export { baseExpect as authExpect };
