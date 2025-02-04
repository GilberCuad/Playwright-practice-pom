import test, { expect, Locator, BrowserContext, Page } from "playwright/test";
import {
  ConnectionData,
  ConfigurationData,
  BasicData,
} from "../../pages/parameterization/parameterization-page";
import { LoginPage } from "../../pages/login/login-page";
import { LoginUtil } from "../../utils/login/login-util";
import * as fs from "fs";
import { config } from "../../utils/config/constants";
import { LocatorsParameterization } from "../../pages/parameterization/parameterization-locators-page";
import { MessageUtilPage } from "../../utils/Message/message-util";
import {
  ParameterizationBasicDataUtil,
  ConnectionDataUtil,
} from "../../utils/parameterization/parameterization-util";

test.describe("Connection data page", () => {
  let basicDataPage: BasicData;
  let basicDataUtil: ParameterizationBasicDataUtil;
  let connectionDataUtil: ConnectionDataUtil;
  let loginPage: LoginPage;
  let configurationData: ConfigurationData;
  let loginUtil: LoginUtil;
  let connectionDataPage: ConnectionData;
  let buttonContinue: Locator;
  let context: BrowserContext;
  let page: Page;

  test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
    loginPage = new LoginPage(page);
    loginUtil = new LoginUtil(page);
    basicDataPage = new BasicData(page);
    basicDataUtil = new ParameterizationBasicDataUtil(page, basicDataPage);
    await loginPage.goto();
    await page.waitForLoadState("domcontentloaded");
    await loginUtil.performLoginCredentialCorrects();
    await loginPage.goToBasicDataPage();
    await basicDataUtil.performInsertionBasicData();
  });

  test.beforeEach(async () => {
    configurationData = new ConfigurationData(page);
    buttonContinue = page.locator(LocatorsParameterization.buttonContinue);
    connectionDataPage = new ConnectionData(page);
    connectionDataUtil = new ConnectionDataUtil(page, connectionDataPage);
    await connectionDataPage.validationScreen();
  });

  test("[@HU02-CA06] Connection data creation", async () => {
    await test.step("Create data", async () => {
      await connectionDataUtil.submitFormConnectionData();
    });

    await test.step("click continue button", async () => {
      await buttonContinue.click();
    });

    await test.step("Validation screen connection data", async () => {
      await configurationData.validationScreen();
    });
  });

  test("[@HU02-CA07] Connection data - validations", async () => {
    const fieldLocators = [
      page.locator(
        LocatorsParameterization.connectionData.hostInputFieldRequired
      ),
      page.locator(
        LocatorsParameterization.connectionData.portInputFieldRequired
      ),

      page.locator(
        LocatorsParameterization.connectionData.userInputFieldRequired
      ),

      page.locator(
        LocatorsParameterization.connectionData.passwordInputFieldRequired
      ),
      page.locator(
        LocatorsParameterization.connectionData.originInputFieldRequired
      ),
      page.locator(
        LocatorsParameterization.connectionData.destinationInputFieldRequired
      ),
    ];

    await test.step("Field require", async () => {
      await connectionDataUtil.validateFieldRequire();

      for (const fieldLocator of fieldLocators) {
        await expect
          .soft(fieldLocator)
          .toHaveText(
            MessageUtilPage.errorValidationInputs.messageMandatoryInput
          );
      }
    });

    await test.step("Validation disabling of the continue button", async () => {
      const inputsConnectionData = [
        page.locator(LocatorsParameterization.connectionData.hostInput),
        page.locator(LocatorsParameterization.connectionData.portInput),
        page.locator(LocatorsParameterization.connectionData.userInput),
        page.locator(LocatorsParameterization.connectionData.passwordInput),
        page.locator(LocatorsParameterization.connectionData.originInput),
        page.locator(LocatorsParameterization.connectionData.destinationInput),
      ];

      for (const input of inputsConnectionData) {
        const valueInput = await input.inputValue();

        if (valueInput !== "") {
          throw new Error("Test failed: The input is not empty.");
        }
        await expect(buttonContinue).toBeDisabled();
      }
    });
  });

  test("[@HU02-CA08] Connection data - validation of lengths inputs", async () => {
    await test.step("Validation length minimum", async () => {
      await connectionDataUtil.validateMinLength();
      const minLengthValidations = [
        {
          locator: page.locator(
            LocatorsParameterization.connectionData.messageLengthMinHostInput
          ),
          expectedText: MessageUtilPage.connectionData.messageMinHostInput,
        },
        {
          locator: page.locator(
            LocatorsParameterization.connectionData.messageLengthMinPortInput
          ),
          expectedText: MessageUtilPage.connectionData.messageMinPortInput,
        },
        {
          locator: page.locator(
            LocatorsParameterization.connectionData.messageLengthMinUserInput
          ),
          expectedText: MessageUtilPage.connectionData.messageMinUserInput,
        },
        {
          locator: page.locator(
            LocatorsParameterization.connectionData
              .messageLengthMinPasswordInput
          ),
          expectedText: MessageUtilPage.connectionData.messageMinPasswordInput,
        },
        {
          locator: page.locator(
            LocatorsParameterization.connectionData.messageLengthMinOriginInput
          ),
          expectedText: MessageUtilPage.connectionData.messageMinOriginInput,
        },
        {
          locator: page.locator(
            LocatorsParameterization.connectionData
              .messageLengthMinDestinationInput
          ),
          expectedText:
            MessageUtilPage.connectionData.messageMinDestinationInput,
        },
      ];

      for (const { locator, expectedText } of minLengthValidations) {
        const textActually = await locator.textContent();
        const cleanText = textActually?.replace(/\\"/g, "'");
        expect.soft(cleanText?.trim()).toBe(expectedText);
      }

      await test.step("Field cleaning", async () => {
        await connectionDataPage.clearInputs();
      });

      await test.step("Validation length maximum", async () => {
        await connectionDataUtil.validateMaxLength();

        const maxLengthValidations = [
          {
            locator: page.locator(
              LocatorsParameterization.connectionData.messageLengthMaxHostInput
            ),
            expectedText: MessageUtilPage.connectionData.messageMaxHostInput,
          },
          {
            locator: page.locator(
              LocatorsParameterization.connectionData.messageLengthMaxPortInput
            ),
            expectedText: MessageUtilPage.connectionData.messageMaxPortInput,
          },
          {
            locator: page.locator(
              LocatorsParameterization.connectionData.messageLengthMaxUserInput
            ),
            expectedText: MessageUtilPage.connectionData.messageMaxUserInput,
          },
          {
            locator: page.locator(
              LocatorsParameterization.connectionData
                .messageLengthMaxPasswordInput
            ),
            expectedText:
              MessageUtilPage.connectionData.messageMaxPasswordInput,
          },
          {
            locator: page.locator(
              LocatorsParameterization.connectionData
                .messageLengthMaxOriginInput
            ),
            expectedText: MessageUtilPage.connectionData.messageMaxOriginInput,
          },
          {
            locator: page.locator(
              LocatorsParameterization.connectionData
                .messageLengthMaxDestinationInput
            ),
            expectedText:
              MessageUtilPage.connectionData.messageMaxDestinationInput,
          },
        ];

        for (const { locator, expectedText } of maxLengthValidations) {
          const textActually = await locator.textContent();
          const cleanText = textActually?.replace(/\\"/g, "'");
          expect.soft(cleanText?.trim()).toBe(expectedText);
        }
      });
    });
  });

  test("[@HU02-CA09] Connection data - validation cancel functionality", async () => {
    await test.step("Validation cancel functionality", async () => {
      await page
        .locator(LocatorsParameterization.actionCancel.buttonCancel)
        .click();

      await expect(
        page.locator(LocatorsParameterization.actionCancel.titlePopup)
      ).toContainText(MessageUtilPage.popupCancel.tittlePopupCanceled);

      await page
        .locator(LocatorsParameterization.actionCancel.buttonReturnPopUp)
        .click();

      await connectionDataPage.validationScreen();

      await page
        .locator(LocatorsParameterization.actionCancel.buttonCancel)
        .click();

      await page
        .locator(LocatorsParameterization.actionCancel.buttonConfirmCancel)
        .click();

      await loginPage.validationHomeScreen(page);
    });
  });

  test.afterEach(async ({}, testInfo) => {
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
