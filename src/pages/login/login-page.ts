import { Locator, expect } from "@playwright/test";
import { LoginBasePage } from "./login-base-page";
import { Page, Response } from "playwright";
import { LocatorsLoginPage } from "./login-locators-page";
import { config } from "../../utils/config/constants";
import { LocatorsParameterization } from "../parameterization/parameterization-locators-page";

/**
 *
 * The `LoginPage` class in TypeScript extends `LoginBasePage` and provides methods for navigating to a login page, filling in email and password inputs, and clicking the login button.
 * @author Gilber Cuadrado
 * @since 23/08/2024
 * @version 1.0
 *
 */

export class LoginPage extends LoginBasePage {
  private readonly addressUrl: string;
  protected readonly emailInput: Locator;
  protected readonly passwordInput: Locator;
  protected readonly loginButton: Locator;

  /**
   *
   * The constructor method is in charge of initializing the values to the object properties, in this case the locators.
   * @author Gilber Cuadrado
   * @param page
   * @since 23/08/2024
   * @version 1.0
   *
   */

  constructor(page: Page) {
    super(page);
    if (!config.addressUrl) {
      throw new Error(
        "ADDRESS_URL must be defined in the environment variables."
      );
    }
    this.emailInput = page.locator(LocatorsLoginPage.emailInput);
    this.passwordInput = page.locator(LocatorsLoginPage.passwordInput);
    this.loginButton = page.locator(LocatorsLoginPage.buttonLogin);
    this.addressUrl = config.addressUrl;
  }

  /**
   *
   * This method receives the .env variables from the url performing binding validation and finally navigating to the indicated page.
   * @author Gilber Cuadrado
   * @param goto
   * @since 26/08/2024
   * @version 1.0
   *
   */

  async goto(): Promise<void> {
    await this.navigateTo(this.addressUrl);
  }

  /**
   * The validationHomeScreen method is in charge of validating that you are on the home page.
   * @author Gilber Cuadrado
   * @param {page} Page
   * @since 25/10/2024
   * @version 1.0
   */

  async validationHomeScreen(page: Page): Promise<void> {
    const currentUrl = page.url();
    expect(currentUrl).toBe(config.addressUrl);
  }

  /**
   * The `fillEmail` method asynchronously fills an email input field with the provided username.
   * @author Gilber Cuadrado
   * @param {string} username - The `fillEmail` method takes a `username` parameter of type `string`.
   * @since 26/08/2024
   * @version 1.0
   */

  protected async fillEmail(username: string): Promise<void> {
    await this.emailInput.fill(username);
  }

  /**
   * This TypeScript method navigates to the basic data page by hovering over a specific element and
   * clicking on another element.
   * @author Gilber Cuadrado
   * @param goToBasicDataPage
   * @since 21/10/2024
   * @version 1.0
   *
   */

  async goToBasicDataPage(): Promise<void> {
    await this.page.locator(LocatorsLoginPage.hoverFilesRelocation).click();
    await this.page.locator(LocatorsParameterization.homePageTitle).click();
  }

  /**
   *
   * Method that receives as parameter the email and inserts this value to the input.
   * @author Gilber Cuadrado
   * @param fillPassword
   * @since 26/08/2024
   * @version 1.0
   *
   */

  protected async fillPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  /**
   * The clickLoginButton method execute click on button login
   * @author Gilber Cuadrado
   * @returns {Promise<void>} - No returns value
   * @since 26/08/2024
   * @version 1.0
   *
   */

  protected async clickLoginButton(): Promise<void> {
    await this.loginButton.click();
  }

  /**
   *
   * This method is in charge of receiving the login data and finally executing the expected actions.
   * @author Gilber Cuadrado
   * @param login
   * @since 23/08/2024
   * @version 1.0
   *
   */

  async login({
    username,
    password,
  }: {
    username: string;
    password: string;
  }): Promise<void> {
    await this.emailInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  /**
   *
   * Method inherited from parent class to add additional behaviors
   * @author Gilber Cuadrado
   * @param performLoginFieldRequire
   * @since 26/08/2024
   * @version 1.0
   *
   */

  async performLoginFieldRequire({
    username,
    password,
  }: {
    username: string;
    password: string;
  }): Promise<void> {
    await this.fillEmail(username);
    await this.fillPassword(password);
    await this.clearInputs();
  }

  /**
   *
   * Method used to delete the values of inputs
   * @author Gilber Cuadrado
   * @param clearInputs
   * @since 26/08/2024
   * @version 1.0
   *
   */

  async clearInputs(): Promise<void> {
    await this.emailInput.fill("");
    await this.passwordInput.fill("");
  }

  /**
   *
   * The method `getBackendUserName` asynchronously fetches the name of a user from a backend response
   * based on a provided login URL and page.
   * @author Gilber Cuadrado
   * @param {string} loginUrl - The `loginUrl` parameter is a string that represents the URL used for
   * logging in to the backend system.
   * @param {Page} page - The `page` parameter in the `getBackendUserName` method is likely an
   * instance of a Puppeteer Page object. Puppeteer is a Node library which provides a high-level API to
   * control headless Chrome or Chromium over the DevTools Protocol. The `page` object represents a
   * single tab or
   * @returns The method `getBackendUserName` returns a Promise that resolves to an object containing
   * the `statusDescriptionNameUser` property, which is a string or undefined.
   *
   */

  async getBackendUserName(
    loginUrl: string,
    page: Page
  ): Promise<string | undefined> {
    let statusCode: number;
    let response: Response | undefined;
    let responseBody: { data?: { name?: string } };
    let statusDescriptionNameUser: string | undefined;

    response = await page.waitForResponse((resp) => resp.url() === loginUrl, {
      timeout: 5000,
    });

    if (!response) {
      throw new Error("No response from the backend.");
    }

    statusCode = response.status();

    if (!response.ok()) {
      throw new Error(`Expected an error status, but received ${statusCode}`);
    }

    responseBody = await response.json();

    statusDescriptionNameUser = responseBody.data?.name;

    if (!statusDescriptionNameUser) {
      throw new Error(
        "The 'statusDescription' field was not found in the backend response."
      );
    }

    return responseBody.data?.name;
  }

  /**
   *
   * This TypeScript method asynchronously retrieves and returns the error description from a backend
   * response based on a provided login URL and page.
   * @author Gilber Cuadrado
   * @param {string} loginUrl - The `loginUrl` parameter is a string that represents the URL used for
   * logging in to the backend system.
   * @param {Page} page - The `page` parameter in the `getBackendErrorDescription` method is likely
   * referring to a Puppeteer Page object. Puppeteer is a Node library which provides a high-level API
   * to control headless Chrome or Chromium over the DevTools Protocol. The `page` parameter is used to
   * interact with the
   * @returns The method `getBackendErrorDescription` returns a Promise that resolves to a string,
   * which is the `statusDescription` extracted from the backend response.
   * @since 01/10/2024
   * @version 1.0
   *
   */

  async getBackendErrorDescription(
    loginUrl: string,
    page: Page
  ): Promise<string | undefined> {
    let response: Response | undefined;
    let statusCode: number;
    let responseBody: { status?: { statusDescription?: string } };
    let statusBackendDescription: string | undefined;

    response = await page.waitForResponse((resp) => resp.url() === loginUrl, {
      timeout: 5000,
    });

    if (!response) {
      throw new Error("No response from the backend.");
    }

    statusCode = response.status();
    if (statusCode < 400) {
      throw new Error(`Expected an error status, but received ${statusCode}`);
    }

    responseBody = await response.json();
    statusBackendDescription = responseBody.status?.statusDescription;

    if (!statusBackendDescription) {
      throw new Error(
        "The 'statusDescription' field was not found in the backend response."
      );
    }
    return responseBody.status?.statusDescription;
  }

  /**
   *
   * This TypeScript method retrieves the frontend error description from a login error popup on a web
   * page.
   * @author Gilber Cuadrado
   * @param {Page} page - The `page` parameter in the `getFrontendErrorDescription` method is an
   * object representing a web page. It is likely an instance of a Puppeteer Page object that allows you
   * to interact with a web page in a headless browser environment.
   * @returns The method `getFrontendErrorDescription` returns a Promise that resolves to a string.
   * The string being returned is the frontend error description extracted from the login error popup on
   * the provided page. The method waits for the login error popup to be visible on the page,
   * retrieves the text content of the popup element, and then returns the frontend error description
   * after removing the prefix "error_description: ".
   * @since 01/10/2024
   * @version 1.0
   *
   */

  async getFrontendErrorDescription(page: Page): Promise<string> {
    await page.waitForSelector(LocatorsLoginPage.loginErrorPopUp, {
      timeout: 5000,
    });
    const frontendErrorDescription = await page
      .locator(LocatorsLoginPage.loginErrorPopUp)
      .innerText();

    return frontendErrorDescription.replace("error_description: ", "");
  }
}
