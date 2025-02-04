import { Locator, Page } from "playwright";
import { expect } from "playwright/test";
import { BaseParameterization } from "./parameterization-base-page";
import { LocatorsParameterization } from "./parameterization-locators-page";
import { IBasicDataPage } from "../../interfaces/base-data-page";
import { IConnectionDataPage } from "../../interfaces/connection-data-page";
import { IConfigurationDataPage } from "../../interfaces/configuration-data-page";


/**
 * The `BasicData` class defines methods to interact with the input fields and buttons of the basic data section and implements an interface for methods interacted from util.
 * @author Gilber Cuadrado
 * @since 21/10/2024
 * @version 1.0
 */

export class BasicData extends BaseParameterization implements IBasicDataPage {
  private readonly nameInput: Locator;
  private readonly descriptionInput: Locator;
  private readonly buttonContinue: Locator;
  private readonly inputName: Locator;

  /**
   * The constructor initializes elements on a page using locators from a parameterized set of data.
   * @author Gilber Cuadrado
   * @param {Page} page - The `page` parameter in the constructor is typically an object that represents
   * the web page or application page where the elements are located. It is commonly used in web
   * automation Playwright to interact with elements on the page.
   * @since 21/10/2024
   * @version 1.0
   */
  constructor(page: Page) {
    super(page);

    this.nameInput = page.locator(LocatorsParameterization.basicData.nameInput);
    this.descriptionInput = page.locator(LocatorsParameterization.basicData.descriptionInput);
    this.buttonContinue = page.locator(LocatorsParameterization.buttonContinue);
    this.inputName = page.locator(LocatorsParameterization.basicData.nameInput);
  }

  /**
   * The method selectTypeRadioButton selects a radio button based on the provided type parameter.
   * @author Gilber Cuadrado
   * @param {string} type - The `type` parameter in the `selectTypeRadioButton` method is a string that
   * represents the type of radio button to be selected.
   * @since 21/10/2024
   * @version 1.0
   */

  protected async selectTypeRadioButton(type: string): Promise<void> {
    await this.page.click(type);
  }

  /**
   * The method `performFieldRequire` asynchronously fills a name input field and then clears all
   * input fields.
   * @author Gilber Cuadrado
   * @param  param.nameValue - Value random for name input
   * @returns {Promise<void>} - No return value
   * @since 21/10/2024
   * @version 1.0
   */

  async performFieldRequire({ nameValue }: { nameValue: string }): Promise<void> {
    await this.nameInput.fill(nameValue);
    await this.clearInputs();
  }

  /**
   * The method clearInputs is used for cleaning inputs
   * @author Gilber Cuadrado
   * @returns {Promise<void>} - No return value
   * @since 21/10/2024
   * @version 1.0
   */

  async clearInputs(): Promise<void> {
    await this.nameInput.fill("");
    await this.descriptionInput.fill("");
  }

  /**
   * The method `performInsertionBasicData` inserts basic data by filling in name, type, and
   * description fields and clicking a continue button.
   * @author Gilber Cuadrado
   * @param  param.nameValue - Value random for name input
   * @param  param.type - Value random for type
   * @param  param.descriptionValue - Value random for description input
   * @returns {Promise<void>} - No return value
   * @since 21/10/2024
   * @version 1.0
   */

  async performInsertionBasicData({
    nameValue,
    type,
    descriptionValue,
  }: {
    nameValue: string;
    descriptionValue: string;
    type: string;
  }): Promise<void> {
    await this.nameInput.fill(nameValue);
    await this.selectTypeRadioButton(type);
    await this.descriptionInput.fill(descriptionValue);
    await this.buttonContinue.click();
  }

  /**
   * The `lengthField` method asynchronously fills the name and description inputs with the provided
   * values.
   * @author Gilber Cuadrado
   * @param  param.nameValue - Value random for name input
   * @param  param.descriptionValue - Value random for description input
   * @returns {Promise<void>} - No return value
   * @since 21/10/2024
   * @version 1.0
   */

  async lengthField({ nameValue, descriptionValue }): Promise<void> {
    await this.nameInput.fill(nameValue);
    await this.descriptionInput.fill(descriptionValue);
  }

  /**
   * The method `performValidationReturnButton` asynchronously performs validation by filling input
   * fields and selecting a radio button.
   * @author Gilber Cuadrado
   * @param  param.nameValue - Value random for name input
   * @param  param.descriptionValue - Value random for description input
   * @param  param.type - Value random for type
   * @returns {Promise<void>} - No return value
   * @since 21/10/2024
   * @version 1.0
   */

  async performValidationReturnButton({
    nameValue,
    descriptionValue,
    type,
  }: {
    nameValue: string;
    descriptionValue: string;
    type: string;
  }): Promise<void> {
    await this.nameInput.fill(nameValue);
    await this.selectTypeRadioButton(type);
    await this.descriptionInput.fill(descriptionValue);
  }

  /**
   * The `validationScreen` method in TypeScript ensures that the inputName element is visible before
   * proceeding with validation.
   * @author Gilber Cuadrado
   * @returns {Promise<void>} - No return value
   * @since 23/10/2024
   * @version 1.0
   */

  async validationScreen(): Promise<void> {
    await this.inputName.waitFor({ state: "visible" });
    const isNameInputVisible = await this.inputName.isVisible();
    expect(isNameInputVisible).toBeTruthy();
  }
}


/**
 * The `ConnectionData` class defines methods to interact with input fields and the various functionalities in the connection data section and implements an interface for methods interacted from util.
 * @author Gilber Cuadrado
 * @since 21/10/2024
 * @version 1.0
 */

export class ConnectionData extends BaseParameterization implements IConnectionDataPage {
  private readonly hostInput: Locator;
  private readonly portInput: Locator;
  private readonly userInput: Locator;
  private readonly passwordInput: Locator;
  private readonly originInput: Locator;
  private readonly destinationInput: Locator;
  private readonly buttonContinue: Locator;

  /**
   * The constructor initializes elements on a page using locators from a parameterized set of data.
   * @author Gilber Cuadrado
   * @param {Page} page - The `page` parameter in the constructor is typically an object that represents
   * the web page or application page where the elements are located. It is commonly used in web
   * automation Playwright to interact with elements on the page.
   * @since 23/10/2024
   * @version 1.0
   */

  constructor(page: Page) {
    super(page);

    this.hostInput = page.locator(LocatorsParameterization.connectionData.hostInput);
    this.portInput = page.locator(LocatorsParameterization.connectionData.portInput);
    this.userInput = page.locator(LocatorsParameterization.connectionData.userInput);
    this.passwordInput = page.locator(LocatorsParameterization.connectionData.passwordInput);
    this.originInput = page.locator(LocatorsParameterization.connectionData.originInput);
    this.destinationInput = page.locator(LocatorsParameterization.connectionData.destinationInput);
    this.buttonContinue = page.locator(LocatorsParameterization.buttonContinue);
  }

  /**
   * The clickContinue method is an asynchronous method that clicks on a button named buttonContinue.
   * @author Gilber Cuadrado
   * @since 23/10/2024
   * @returns {Promise<void>} - No return value
   * @version 1.0
   */

  protected async clickContinue(): Promise<void> {
    await this.buttonContinue.click();
  }

  /**
   * The `clearInputs` method clears the input fields for host, port, user, password, origin, and
   * destination.
   * @author Gilber Cuadrado
   * @since 23/10/2024
   * @returns {Promise<void>} - No return value
   * @version 1.0
   */

  async clearInputs(): Promise<void> {
    await this.hostInput.fill("");
    await this.portInput.fill("");
    await this.userInput.fill("");
    await this.passwordInput.fill("");
    await this.originInput.fill("");
    await this.destinationInput.fill("");
  }

  /**
   * The method `performInsertionConnectionData` asynchronously fills input fields with connection
   * data for host, port, user, password, origin, and destination.
   * @param param.host - Value random for host input
   * @param param.port - Value random for port input
   * @param param.user - Value random for user input
   * @param param.password - Value random for password input
   * @param param.origin - Value random for origin input
   * @param param.destination - Value random for destination input
   * @author Gilber Cuadrado
   * @since 23/10/2024
   * @returns {Promise<void>} - No return value
   * @version 1.0
   */

  async performInsertionConnectionData({
    host,
    port,
    user,
    password,
    origin,
    destination,
  }: {
    host: string;
    port: string;
    user: string;
    password: string;
    origin: string;
    destination: string;
  }): Promise<void> {
    await this.hostInput.fill(host);
    await this.portInput.fill(port);
    await this.userInput.fill(user);
    await this.passwordInput.fill(password);
    await this.originInput.fill(origin);
    await this.destinationInput.fill(destination);
  }

  /**
   * The method `validateRequiredFields` asynchronously fills input fields for host, port, user,
   * password, origin, and destination, then clears all inputs.
   * @param param.host - Value random for host input
   * @param param.port - Value random for port input
   * @param param.user - Value random for user input
   * @param param.password - Value random for password input
   * @param param.origin - Value random for origin input
   * @param param.destination - Value random for destination input
   * @author Gilber Cuadrado
   * @since 23/10/2024
   * @returns {Promise<void>} - No return value
   * @version 1.0
   */

  async validateRequiredFields({
    host,
    port,
    user,
    password,
    origin,
    destination,
  }: {
    host: string;
    port: string;
    user: string;
    password: string;
    origin: string;
    destination: string;
  }): Promise<void> {
    await this.hostInput.fill(host);
    await this.portInput.fill(port);
    await this.userInput.fill(user);
    await this.passwordInput.fill(password);
    await this.originInput.fill(origin);
    await this.destinationInput.fill(destination);
    await this.clearInputs();
  }

  /**
   * The `validationScreen` method in TypeScript ensures that the host input element is visible before
   * performing validation.
   * @author Gilber Cuadrado
   * @since 23/10/2024
   * @returns {Promise<void>} - No return value
   * @version 1.0
   */

  async validationScreen(): Promise<void> {
    await this.hostInput.waitFor({ state: "visible" });
    const isNameInputVisible = await this.hostInput.isVisible();
    expect(isNameInputVisible).toBeTruthy();
  }
}

/**
 * The `ConfigurationData` class extends BaseParameterization and provides methods for inserting configuration data, performing field validation, and clearing input and implements an interface for methods interacted from util.
 * @author Gilber Cuadrado
 * @since 21/10/2024
 * @version 1.0
 */

export class ConfigurationData extends BaseParameterization implements IConfigurationDataPage {
  private readonly regexInput: Locator;
  private readonly buttonContinue: Locator;

  /**
   * The constructor initializes the regex input and continue button locators on the page.
   * @param {Page} page - The `page` parameter in the constructor likely refers to a web page object or
   * a page element that is being passed to the constructor method. It is used to interact with the
   * elements on the page, such as locating specific elements using locators and performing actions on
   * them.
   * @author Gilber Cuadrado
   * @since 23/10/2024
   * @version 1.0
   */

  constructor(page: Page) {
    super(page);
    this.regexInput = page.locator(
      LocatorsParameterization.configData.regexInput
    );
    this.buttonContinue = page.locator(LocatorsParameterization.buttonContinue);
  }

  /**
   * The method `clickTypeRadioButton` is a TypeScript method that clicks on a radio button based on
   * the provided configuration.
   * @param {string} configuration - The `configuration` parameter in the `clickTypeRadioButton`
   * method is a string that represents the selector of the radio button element that you want to
   * click on. This selector could be an ID, class, or any other valid CSS selector that uniquely
   * identifies the radio button element on the page.
   * @author Gilber Cuadrado
   * @since 23/10/2024
   * @returns {Promise<void>} - No value return
   * @version 1.0
   */

  protected async clickTypeRadioButton(configuration: string): Promise<void> {
    await this.page.click(configuration);
  }

  /**
   * The method `performInsertionConfigurationData` asynchronously fills a regex, clicks on radio and
   * button selectors, and then clicks a continue button.
   * @param  param.radioSelectorValue - Value random for
   * @param  param.buttonSelectorValue -
   * @param  param.regexValue -
   * @author Gilber Cuadrado
   * @since 23/10/2024
   * @returns {Promise<void>} - No value return
   * @version 1.0
   */

  async performInsertionConfigurationData({
    radioSelectorValue,
    buttonSelectorValue,
    regexValue,
  }: {
    radioSelectorValue: string;
    buttonSelectorValue: string;
    regexValue: string;
  }): Promise<void> {
    await this.regexInput.fill(regexValue);
    await this.page.click(radioSelectorValue);
    await this.page.click(buttonSelectorValue, { force: true });
    await this.buttonContinue.click();
  }

  /**
   * The method `performRequireFieldValidation` asynchronously fills a regex value and then clears an
   * input.
   * @param  param.regexValue - Value for input regex
   * @author Gilber Cuadrado
   * @since 23/10/2024
   * @returns {Promise<void>} - No value return
   * @version 1.0
   */

  async performRequireFieldValidation({
    regexValue,
  }: {
    regexValue: string;
  }): Promise<void> {
    await this.regexInput.fill(regexValue);
    await this.clearInput();
  }

  /**
   * The `clearInput` method in TypeScript asynchronously clears the content of a regex input field.
   * @author Gilber Cuadrado
   * @since 23/10/2024
   * @returns {Promise<void>} - No value return
   * @version 1.0
   */

  async clearInput(): Promise<void> {
    await this.regexInput.fill("");
  }

  /**
   * The method `performLengthValidation` asynchronously fills a regex value.
   * @param  ParameterDecorator.regexValue  - Value for input regex
   * @author Gilber Cuadrado
   * @since 23/10/2024
   * @returns {Promise<void>} - No value return
   * @version 1.0
   */

  async performLengthValidation({ regexValue }: { regexValue: string }): Promise<void> {
    await this.regexInput.fill(regexValue);
  }

  /**
   * The `validationScreen` method in TypeScript waits for a regex input to be visible and then checks
   * if it is indeed visible.
   * @author Gilber Cuadrado
   * @since 23/10/2024
   * @returns {Promise<void>} - No value return
   * @version 1.0
   */

  async validationScreen(): Promise<void> {
    await this.regexInput.waitFor({ state: "visible" });
    const isNameInputVisible = await this.regexInput.isVisible();
    expect(isNameInputVisible).toBeTruthy();
  }
}
