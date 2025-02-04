import { Page } from "playwright";

/**
 * The `LoginBasePage` class in TypeScript defines a base page for handling login functionality with
 * methods for initializing a new instance and navigating to a specified URL using Puppeteer.
 * @autor Gilber Cuadrado
 * @since 23/08/2024
 * @version 1.0
 */

export class LoginBasePage {
  protected page: Page;
  /**
   * The constructor function initializes a new instance of a class with a specified page parameter.
   * @autor Gilber Cuadrado
   * @param {Page} page - The `constructor` function takes a `Page` object as a parameter and assigns it to the `page` property of the class instance.
   * @since 23/08/2024
   * @version 1.0
   */

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * The function `navigateTo` asynchronously navigates to a specified URL using Puppeteer.
   * @autor Gilber Cuadrado
   * @param {string} url - The `url` parameter in the `navigateTo` function is a string that represents the URL of the webpage that the function will navigate to.
   * @since 23/08/2024
   * @version 1.0
   */

  async navigateTo(url: string): Promise<void>  {
    await this.page.goto(url);
  }
}
