import { Page } from "@playwright/test";
import { HomePage } from "./homePage";
import { LoginPage } from "./loginPage";
import { CookieHelper } from "../utils/cookieHelper";
import { LanguageHelper } from "../utils/localizationHelper";

export class PageManager {
  readonly page: Page;
  public home: HomePage;
  public login: LoginPage;
  readonly cookies: CookieHelper;
  readonly language: LanguageHelper;

  constructor(page: Page) {
    this.page = page;
    this.home = new HomePage(page);
    this.login = new LoginPage(page);
    this.cookies = new CookieHelper(page);
    this.language = new LanguageHelper(page);
  }
}
