import { test, expect, Locator } from "@playwright/test";
import { LoginPage } from "../../pages/login/login-page";
import { LoginUtil } from "../../utils/login/login-util";
import { LocatorsLoginPage } from "../../pages/login/login-locators-page";
import { MessageUtilPage } from "../../utils/Message/message-util";
import * as fs from "fs";
import { config } from "../../utils/config/constants";

test.describe("Login Test", () => {
  let loginPage: LoginPage;
  let loginUtil: LoginUtil;
  let apiLoginUrl: string;
  let locatorInputEmail: Locator;
  let locatorInputPassword: Locator;
  let locatorButtonLogin: Locator;

  test.beforeEach(async ({ page }) => {
    const apiLoginUrlFromConfig = config.apiLoginUrl;
    loginPage = new LoginPage(page);
    loginUtil = new LoginUtil(page);

    await loginPage.goto();
    await page.waitForLoadState("domcontentloaded");

    if (!apiLoginUrlFromConfig) {
      throw new Error(
        "API_LOGIN_URL must be defined in the environment variables."
      );
    }

    locatorInputEmail = page.locator(LocatorsLoginPage.emailInput);
    locatorInputPassword = page.locator(LocatorsLoginPage.passwordInput);
    locatorButtonLogin = page.locator(LocatorsLoginPage.buttonLogin);
    apiLoginUrl = apiLoginUrlFromConfig;
  });

  test("[@HU01-CA01] Login with valid credentials", async ({ page }) => {
    const homePageTitleLocator = page.locator(LocatorsLoginPage.homePageTitle);
    let userNameFromBackend: string | undefined;

    if (!apiLoginUrl) throw new Error("API_LOGIN_URL not defined");

    await test.step("Capture request for login", async () => {
      await page.route(apiLoginUrl, (route) => route.continue());
    });

    await test.step("Perform login", async () => {
      await loginUtil.performLoginCredentialCorrects();
    });

    await test.step("Extract username from API response", async () => {
      userNameFromBackend = await loginPage.getBackendUserName(
        apiLoginUrl,
        page
      );
    });

    await test.step("Validate username from DOM matches API response", async () => {
      let domUserName: string;

      await page.waitForSelector(LocatorsLoginPage.userNameLocator, {
        timeout: 5000,
      });

      domUserName = await page
        .locator(LocatorsLoginPage.userNameLocator)
        .innerText();

      if (!userNameFromBackend) {
        throw new Error("User name from API is undefined or empty");
      }

      expect(domUserName.trim()).toBe(userNameFromBackend);
    });

    await test.step("Validate home page hover elements", async () => {
      await page.locator(LocatorsLoginPage.hoverFilesRelocation).click();
      await expect
        .soft(homePageTitleLocator)
        .toHaveText(MessageUtilPage.messageHome.newParameterization);
    });
  });

  test("[@HU01-CA02] Login with invalid credentials", async ({ page }) => {
    if (!apiLoginUrl) throw new Error("API_LOGIN_URL not defined");

    await test.step("Login with incorrect credentials", async () => {
      await loginUtil.performLoginCredentialsIncorrect();
    });

    await test.step("Extract and validate error descriptions", async () => {
      const backendErrorDescription =
        await loginPage.getBackendErrorDescription(apiLoginUrl, page);
      const frontendErrorDescription =
        await loginPage.getFrontendErrorDescription(page);

      expect(frontendErrorDescription).toBe(backendErrorDescription);
    });
  });

  test("[@HU01-CA03] Login with credentials not registered in the system", async ({
    page,
  }) => {
    if (!apiLoginUrl) throw new Error("API_LOGIN_URL not defined");

    await test.step("Login with incorrect credentials", async () => {
      await loginUtil.performLoginCredentialsNotRegisterSystem();
    });

    await test.step("Extract and validate error descriptions", async () => {
      const backendErrorDescription =
        await loginPage.getBackendErrorDescription(apiLoginUrl, page);
      const frontendErrorDescription =
        await loginPage.getFrontendErrorDescription(page);

      expect(frontendErrorDescription).toBe(backendErrorDescription);
    });
  });

  test("[@HU01-CA04] Validation of mandatory fields", async ({ page }) => {
    const locatorRequireMessageEmail = page.locator(
      LocatorsLoginPage.requiredFieldEmailInput
    );
    const locatorRequireMessagePassword = page.locator(
      LocatorsLoginPage.requiredFieldPasswordInput
    );

    await test.step("Fill and clear login form inputs", async () => {
      await loginUtil.performRequireField();

      await test.step("Verify login button is disabled", async () => {
        await expect(locatorButtonLogin).toBeDisabled();
      });
    });

    await test.step("Make the assertion in the email and password input field is empty", async () => {
      const emailValueInput = await locatorInputEmail.inputValue();
      const passwordValueInput = await locatorInputPassword.inputValue();

      if (emailValueInput === "" && passwordValueInput === "") {
        await test.step("Message validation required field in email input", async () => {
          await expect
            .soft(locatorRequireMessageEmail)
            .toHaveText(
              MessageUtilPage.errorValidationInputs.messageMandatoryInput
            );
        });

        await test.step("Message validation required field in password input", async () => {
          await expect
            .soft(locatorRequireMessagePassword)
            .toHaveText(
              MessageUtilPage.errorValidationInputs.messageMandatoryInput
            );
        });
      } else {
        throw new Error(
          "Test failed: The email and/or password inputs are not empty."
        );
      }
    });
  });

  test("[@HU01-CA05] Validation disabling the enter button", async ({
    page,
  }) => {
    await test.step("Validating that the button is inactive", async () => {
      const emailValueInput = await locatorInputEmail.inputValue();
      const passwordValueInput = await locatorInputPassword.inputValue();

      if (emailValueInput === "" && passwordValueInput === "") {
        await expect(locatorButtonLogin).toBeDisabled();
      } else {
        throw new Error(
          "Test failed: The email and/or password inputs are not empty."
        );
      }
    });
  });

  test.skip("[@HU01-CA06] Validation of inactivity time for logout", async ({
    page,
  }) => {
    test.slow();

    test.setTimeout(config.timeOutTestMS);

    await test.step("Method call for login", async () => {
      await loginUtil.performLoginCredentialCorrects();
    });

    await test.step("Waiting 3 minutes of inactivity", async () => {
      await page.waitForTimeout(config.inactivityTimeOutMS);
    });

    await test.step("Login page validation with email form", async () => {
      await locatorInputEmail.waitFor({ state: "visible" });
      const isFormLoginVisible = await locatorInputEmail.isVisible();
      expect(isFormLoginVisible).toBeTruthy();
    });
  });
  test.afterEach(async ({ page }, testInfo) => {
    test.setTimeout(2000);
    if (!fs.existsSync("evidences")) {
      fs.mkdirSync("evidences");
    }
    await page.screenshot({
      path: `evidences/${testInfo.title}-${config.timeStampString}.png`,
    });
  });
});
