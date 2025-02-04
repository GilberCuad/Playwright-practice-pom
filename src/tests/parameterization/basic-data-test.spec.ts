import test, { expect, Locator, BrowserContext, Page } from "playwright/test";
import { BasicData, ConnectionData } from "../../pages/parameterization/parameterization-page";
import { LoginPage } from "../../pages/login/login-page";
import { LoginUtil } from "../../utils/login/login-util";
import * as fs from "fs";
import { config } from "../../utils/config/constants";
import { LocatorsParameterization } from "../../pages/parameterization/parameterization-locators-page";
import { MessageUtilPage } from "../../utils/Message/message-util";
import { ParameterizationBasicDataUtil } from "../../utils/parameterization/parameterization-util";

test.describe("Basic data page", () => {
  let basicDataPage: BasicData;
  let basicDataUtil: ParameterizationBasicDataUtil;
  let loginPage: LoginPage;
  let loginUtil: LoginUtil;
  let buttonContinue: Locator;
  let connectionData: ConnectionData;
  let context: BrowserContext;
  let page: Page;

  test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
    loginPage = new LoginPage(page);
    loginUtil = new LoginUtil(page);
    await loginPage.goto();
    await page.waitForLoadState("domcontentloaded");
    await loginUtil.performLoginCredentialCorrects();
    await loginPage.goToBasicDataPage();
  });

  test.beforeEach(async () => {
    basicDataPage = new BasicData(page);
    basicDataUtil = new ParameterizationBasicDataUtil(page, basicDataPage);
    buttonContinue = page.locator(LocatorsParameterization.buttonContinue);
    connectionData = new ConnectionData(page);
    await basicDataPage.validationScreen();
  });

  test("[@HU02-CA01] Basic data creation", async () => {
    await test.step("Creating basic data", async () => {
      await basicDataUtil.performInsertionBasicData();
    });

    await test.step("Validation screen connection data", async () => {
      await connectionData.validationScreen();
    });
  });

  test("[@HU02-CA02] Basic data - validations", async () => {
    await test.step("Validation disabling of the continue button", async () => {
      const nameValueInput = await page
        .locator(LocatorsParameterization.basicData.nameInput)
        .inputValue();

      if (nameValueInput === "") {
        await expect(buttonContinue).toBeDisabled();
      } else {
        throw new Error("Test failed: The name input are not empty.");
      }
    });

    await test.step("Validation fields requires", async () => {
      await basicDataUtil.performFieldRequireUtil();
      await expect(
        page.locator(LocatorsParameterization.basicData.nameInputFieldRequire)
      ).toHaveText(MessageUtilPage.errorValidationInputs.messageMandatoryInput);
    });
  });

  test("[@HU02-CA03] Basic data - validation of lengths inputs", async () => {
    await test.step("Validation of minimum lengths", async () => {
      await basicDataUtil.performLengthMinimumField();
      const maxLengthValidation = [
        {
          locator: page.locator(
            LocatorsParameterization.basicData.messageLengthMinimumNameInput
          ),
          expectedText: MessageUtilPage.dataBasic.lengthMinimumNameInput,
        },
        {
          locator: page.locator(
            LocatorsParameterization.basicData
              .messageLengthMinimumDescriptionInput
          ),
          expectedText: MessageUtilPage.dataBasic.lengthMinimumDescriptionInput,
        },
      ];

      for (const { locator, expectedText } of maxLengthValidation) {
        const textActually = await locator.textContent();
        const cleanText = textActually?.replace(/\\"/g, "'");
        expect.soft(cleanText?.trim()).toBe(expectedText);
      }

      await basicDataPage.clearInputs();
    });

    await test.step("Validation of maximum lengths", async () => {
      await basicDataUtil.performLengthMaximumField();

      const maxLengthValidation = [
        {
          locator: page.locator(
            LocatorsParameterization.basicData.messageLengthMaximumNameInput
          ),
          expectedText: MessageUtilPage.dataBasic.lengthMaximumNameInput,
        },
        {
          locator: page.locator(
            LocatorsParameterization.basicData
              .messageLengthMaximumDescriptionInput
          ),
          expectedText: MessageUtilPage.dataBasic.lengthMaximumDescriptionInput,
        },
      ];

      for (const { locator, expectedText } of maxLengthValidation) {
        const textActually = await locator.textContent();
        const cleanText = textActually?.replace(/\\"/g, "'");
        expect.soft(cleanText?.trim()).toBe(expectedText);
      }

      await basicDataPage.clearInputs();
    });
  });

  test("[@HU02-CA04] Basic data - validation cancel functionality", async () => {
    await test.step("Validation cancel functionality", async () => {
      const isNameInputVisible = page
        .locator(LocatorsParameterization.basicData.nameInput)
        .isVisible();

      await page
        .locator(LocatorsParameterization.actionCancel.buttonCancel)
        .click();

      await expect(
        page.locator(LocatorsParameterization.actionCancel.titlePopup)
      ).toHaveText(MessageUtilPage.popupCancel.tittlePopupCanceled);

      await page
        .locator(LocatorsParameterization.actionCancel.buttonReturnPopUp)
        .click();

      expect(isNameInputVisible).toBeTruthy();

      await page
        .locator(LocatorsParameterization.actionCancel.buttonCancel)
        .click();

      await page
        .locator(LocatorsParameterization.actionCancel.buttonConfirmCancel)
        .click();

      await loginPage.validationHomeScreen(page);
    });
  });

  test("[@HU02-CA05] Basic data button return", async () => {
    await test.step("Filling in fields", async () => {
      await basicDataUtil.performValidationReturnButton();
    });

    await test.step("Click on the back button", async () => {
      await page
        .locator(LocatorsParameterization.basicData.buttonReturn)
        .click();
    });

    await test.step("Validation at the home page", async () => {
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
