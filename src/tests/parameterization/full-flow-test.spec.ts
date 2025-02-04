import test, { Locator } from "playwright/test";
import { BasicData, ConnectionData, ConfigurationData } from "../../pages/parameterization/parameterization-page";
import { LoginPage } from "../../pages/login/login-page";
import { LoginUtil } from "../../utils/login/login-util";
import * as fs from "fs";
import { config } from "../../utils/config/constants";
import { LocatorsParameterization } from "../../pages/parameterization/parameterization-locators-page";
import { ParameterizationBasicDataUtil, ConfigurationDataUtil, ConnectionDataUtil, SchedulePeriodicityUtil, } from "../../utils/parameterization/parameterization-util";

test.describe("Complete test execution", () => {
  let basicDataPage: BasicData;
  let basicDataUtil: ParameterizationBasicDataUtil;
  let loginPage: LoginPage;
  let connectionDataPage: ConnectionData;
  let loginUtil: LoginUtil;
  let buttonContinue: Locator;
  let configurationDataUtil: ConfigurationDataUtil;
  let connectionDataUtil: ConnectionDataUtil;
  let schedulePeriodicityUtil: SchedulePeriodicityUtil;
  let configurationDataPage: ConfigurationData;

  test.beforeEach(async ({ page }) => {
    buttonContinue = page.locator(LocatorsParameterization.buttonContinue);
    basicDataPage = new BasicData(page);
    basicDataUtil = new ParameterizationBasicDataUtil(page, basicDataPage);
    connectionDataPage = new ConnectionData(page);
    connectionDataUtil = new ConnectionDataUtil(page, connectionDataPage);
    schedulePeriodicityUtil = new SchedulePeriodicityUtil(page);
    loginPage = new LoginPage(page);
    loginUtil = new LoginUtil(page);
    configurationDataPage = new ConfigurationData(page);
    configurationDataUtil = new ConfigurationDataUtil(page, configurationDataPage);
    await loginPage.goto();
    await page.waitForLoadState("domcontentloaded");
    await loginUtil.performLoginCredentialCorrects();
    await loginPage.goToBasicDataPage();
    await basicDataPage.validationScreen();
  });


  test("[@HU02-CA16] Full flow test parameterization", async ({ page }) => {

    await test.step("Data Basic", async () => {
      await basicDataUtil.performInsertionBasicData();
    });

    await test.step("Connection Data", async () => {
      await connectionDataUtil.submitFormConnectionData();
      await buttonContinue.click();
    });

    await test.step("Configuration Data", async () => {
      await configurationDataUtil.submitFormConfigData();
    });

    await test.step("Schedule Periodicity", async () => {
      await schedulePeriodicityUtil.randomSelectPeriodicity();
      await page.waitForTimeout(1000);
      await loginPage.validationHomeScreen(page);
    });

  });

  test.afterEach(async ({ page }, testInfo) => {
    test.setTimeout(config.timeOutScreenCapture);
    if (!fs.existsSync("evidences")) {
      fs.mkdirSync("evidences");
    }
    await page.screenshot({
      path: `evidences/${testInfo.title}-${config.timeStampString}.png`,
    });
  });
});
