import test, { expect, Locator, BrowserContext, Page } from "playwright/test";
import { LoginPage } from "../../pages/login/login-page";
import { LoginUtil } from "../../utils/login/login-util";
import * as fs from "fs";
import { BasicData, ConnectionData, ConfigurationData } from "../../pages/parameterization/parameterization-page";
import { config } from "../../utils/config/constants";
import { LocatorsParameterization } from "../../pages/parameterization/parameterization-locators-page";
import { MessageUtilPage } from "../../utils/Message/message-util";
import { ParameterizationBasicDataUtil, ConnectionDataUtil, ConfigurationDataUtil, SchedulePeriodicityUtil } from "../../utils/parameterization/parameterization-util";

test.describe("Schedule periodicity", () => {
  let basicDataUtil: ParameterizationBasicDataUtil;
  let connectionDataUtil: ConnectionDataUtil;
  let configurationDataUtil: ConfigurationDataUtil;
  let schedulePeriodicityUtil: SchedulePeriodicityUtil;
  let loginPage: LoginPage;
  let loginUtil: LoginUtil;
  let connectionDataPage: ConnectionData;
  let buttonCreate: Locator;
  let buttonContinue: Locator;
  let context: BrowserContext;
  let page: Page;
  let basicDataPage: BasicData;
  let configurationDataPage: ConfigurationData;


  test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
    page.setDefaultTimeout(20000);
    loginPage = new LoginPage(page);
    loginUtil = new LoginUtil(page);
    basicDataPage = new BasicData(page);
    basicDataUtil = new ParameterizationBasicDataUtil(page, basicDataPage);
    connectionDataPage = new ConnectionData(page);
    connectionDataUtil = new ConnectionDataUtil(page, connectionDataPage);
    buttonContinue = page.locator(LocatorsParameterization.buttonContinue);
    connectionDataPage = new ConnectionData(page);
    connectionDataUtil = new ConnectionDataUtil(page, connectionDataPage);
    schedulePeriodicityUtil = new SchedulePeriodicityUtil(page);
    configurationDataPage = new ConfigurationData(page);
    configurationDataUtil = new ConfigurationDataUtil(page, configurationDataPage);
    buttonCreate = page.locator(
      LocatorsParameterization.programPeriodicity.buttonCreate
    );

    await loginPage.goto();
    await page.waitForLoadState("domcontentloaded");
    await loginUtil.performLoginCredentialCorrects();
    await loginPage.goToBasicDataPage();
    await basicDataUtil.performInsertionBasicData();
    await connectionDataUtil.submitFormConnectionData();
    await buttonContinue.click();
    await configurationDataUtil.submitFormConfigData();

    await expect(
      page.locator(LocatorsParameterization.programPeriodicity.titlePage)
    ).toHaveText(MessageUtilPage.schedulePeriodicity.titlePage);
  });

  test("[@HU02-CA14] Schedule periodicity - successful test case", async () => {
    await page.waitForLoadState("networkidle");
    await schedulePeriodicityUtil.randomSelectPeriodicity();
    await page.waitForTimeout(1000);
    await loginPage.validationHomeScreen(page);
  });
  test("[@HU02-CA15] Schedule periodicity - validations", async () => {
    await test.step("Validation disabling of the create button", async () => {
      await expect(buttonCreate).toBeDisabled();
    });

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
      await expect(
        page.locator(LocatorsParameterization.programPeriodicity.titlePage)
      ).toHaveText(MessageUtilPage.schedulePeriodicity.titlePage);

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
