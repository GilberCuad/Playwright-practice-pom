import test, { expect, Locator, BrowserContext, Page } from "playwright/test";
import { BasicData, ConfigurationData, ConnectionData } from "../../pages/parameterization/parameterization-page";
import { LoginPage } from "../../pages/login/login-page";
import { LoginUtil } from "../../utils/login/login-util";
import * as fs from "fs";
import { config } from "../../utils/config/constants";
import { LocatorsParameterization } from "../../pages/parameterization/parameterization-locators-page";
import { MessageUtilPage } from "../../utils/Message/message-util";
import {
  ParameterizationBasicDataUtil,
  ConnectionDataUtil,
  ConfigurationDataUtil,
} from "../../utils/parameterization/parameterization-util";

test.describe("test", () => {
  let basicDataUtil: ParameterizationBasicDataUtil;
  let connectionDataUtil: ConnectionDataUtil;
  let configurationDataUtil: ConfigurationDataUtil;
  let configurationDataPage: ConfigurationData;
  let loginPage: LoginPage;
  let loginUtil: LoginUtil;
  let buttonContinue: Locator;
  let context: BrowserContext;
  let page: Page;
  let connectionDataPage: ConnectionData;
  let basicDataPage: BasicData;

  test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
    loginPage = new LoginPage(page);
    loginUtil = new LoginUtil(page);
    basicDataPage = new BasicData(page);
    basicDataUtil = new ParameterizationBasicDataUtil(page, basicDataPage);
    connectionDataPage = new ConnectionData(page);
    connectionDataUtil = new ConnectionDataUtil(page, connectionDataPage);
    buttonContinue = page.locator(LocatorsParameterization.buttonContinue);
    await loginPage.goto();
    await page.waitForLoadState("domcontentloaded");
    await loginUtil.performLoginCredentialCorrects();
    await loginPage.goToBasicDataPage();
    await basicDataUtil.performInsertionBasicData();
    await connectionDataUtil.submitFormConnectionData();
    await buttonContinue.click();
  });

  test.beforeEach(async () => {
    configurationDataPage = new ConfigurationData(page);
    configurationDataUtil = new ConfigurationDataUtil(page, configurationDataPage);
    await configurationDataPage.validationScreen();
  });

  test("[@HU02-CA10] Configuration data", async () => {
    await test.step("Filling in configuration data", async () => {
      await configurationDataUtil.submitFormConfigData();
    });

    await test.step("Validation screen schedule periodicity", async () => {
      expect(
        page.locator(LocatorsParameterization.programPeriodicity.titlePage)
      ).toHaveText(MessageUtilPage.schedulePeriodicity.titlePage);
    });
  });

  test("[@HU02-CA11] Configuration data - validations", async () => {
    await test.step("Validation field required", async () => {
      const locatorRequireRegexInput = page.locator(
        LocatorsParameterization.configData.messageFieldRequireRegexInput
      );
      await configurationDataUtil.requireField();

      await expect
        .soft(locatorRequireRegexInput)
        .toHaveText(
          MessageUtilPage.errorValidationInputs.messageMandatoryInput
        );
    });

    await test.step("Validation disabling of the continue button", async () => {
      const valueRegex = await page
        .locator(LocatorsParameterization.configData.regexInput)
        .inputValue();

      if (valueRegex !== "") {
        throw new Error("Test failed: The name input are not empty.");
      }

      await expect(buttonContinue).toBeDisabled();
    });
  });

  test("[@HU02-CA12] Configuration data - validation of lengths inputs", async () => {
    await test.step("Validation of minimum lengths", async () => {
      await configurationDataUtil.lengthMinValidation();

      await expect(
        page.locator(
          LocatorsParameterization.configData.messageLengthMinRegexInput
        )
      ).toHaveText(MessageUtilPage.configData.messageLengthMinRegexInput);

      await configurationDataPage.clearInput();
    });

    await test.step("Validation of maximum lengths", async () => {
      await configurationDataUtil.lengthMaxValidation();
      await expect(
        page.locator(
          LocatorsParameterization.configData.messageLengthMaxRegexInput
        )
      ).toHaveText(MessageUtilPage.configData.messageLengthMaxRegexInput);

      await configurationDataPage.clearInput();
    });
  });

  test("[@HU02-CA13] Configuration data - validation cancel functionality", async () => {
    await test.step("Validation cancel functionality", async () => {
      const isRegexInputVisible = page
        .locator(LocatorsParameterization.configData.regexInput)
        .isVisible();

      await page
        .locator(LocatorsParameterization.actionCancel.buttonCancel)
        .click();

      await expect(
        page.locator(LocatorsParameterization.actionCancel.titlePopup)
      ).toContainText(MessageUtilPage.popupCancel.tittlePopupCanceled);

      await page
        .locator(LocatorsParameterization.actionCancel.buttonReturnPopUp)
        .click();

      expect(isRegexInputVisible).toBeTruthy();

      await page
        .locator(LocatorsParameterization.actionCancel.buttonCancel)
        .click();

      await page
        .locator(LocatorsParameterization.actionCancel.buttonConfirmCancel)
        .click();

      await loginPage.validationHomeScreen(page);
    });
  });

  test.afterEach(async ({ }, testInfo) => {
    test.setTimeout(config.timeOutScreenCapture);
    if (!fs.existsSync("evidences")) {
      fs.mkdirSync("evidences");
    }
    await page.screenshot({
      path: `evidences/${testInfo.title}-${config.timeStampString}.png`,
    });
  });

  test.afterAll(async () => {
    await context.close();
  });
});
