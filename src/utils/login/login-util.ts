import { Page } from "playwright";
import { LoginPage } from "../../pages/login/login-page";
import { config } from "../../utils/config/constants";

/**
 *
 * The `LoginUtil` class contains methods for performing login actions with correct, incorrect,
 * unregistered, and inactive user credentials, as well as handling required fields during login.
 * @autor Gilber Cuadrado
 * @since 30/09/2024
 * @version 1.1
 *
 */

export class LoginUtil {
  readonly page: Page;
  protected loginPage: LoginPage;

  /**
   * 
   * The constructor function initializes a new instance of a class with a specified page parameter.
   * @autor Gilber Cuadrado
   * @param {Page} page - The `constructor` function takes a `Page` object as a parameter and assigns it
   * to the `page` property of the class instance. This allows the class to work with the provided `Page`
   * object within its methods and properties.
   * @since 30/09/2024
   * @version 1.1
   * 
   */

  constructor(page: Page) {
    this.page = page;
    this.loginPage = new LoginPage(page);
  }

  /**
   * 
   * The function `performLoginCredentialCorrects` performs a login using the provided user email and password if they are defined as environment variables.
   * @autor Gilber Cuadrado
   * @param performLoginCredentialCorrects
   * @since 30/09/2024
   * @version 1.1
   * @returnsReturn promise that does not return a specific value [Promise<void>]
   *  
   * */

  async performLoginCredentialCorrects(): Promise<void> {

    if (!config.userMail || !config.password) {
      throw new Error(
        "The environment variable USER_MAIL & PASSWORD is not defined."
      );
    }
    await this.loginPage.login({
      username: config.userMail,
      password: config.password,
    });
  }

  /**
   * 
   * The function `performLoginCredentialsIncorrect` attempts to log in with empty username and password fields.
   * @autor Gilber Cuadrado
   * @param performLoginCredentialsIncorrect
   * @since 30/09/2024
   * @version 1.1
   * @returns Return promise that does not return a specific value [Promise<void>]
   * 
   */

  async performLoginCredentialsIncorrect(): Promise<void> {
    await this.loginPage.login({
      username: "filemvt@fidubogota.com",
      password: "Teps12305!",
    });
  }

  /**
   * 
   * The function `performLoginCredentialsNotRegisterSystem` attempts to log in with empty username and password fields.
   * @autor Gilber Cuadrado
   * @param performLoginCredentialsNotRegisterSystem
   * @since 30/09/2024
   * @version 1.1
   * @returns Return promise that does not return a specific value [Promise<void>]
   * 
   */

  async performLoginCredentialsNotRegisterSystem(): Promise<void> {
    await this.loginPage.login({
      username: "pruebausernotfound@fidubogota.com",
      password: "ExampleKey_2000",
    });
  }

  /**
   *
   * The function `performRequireField` creates a new instance of `LoginFieldRequire` and calls the `performLoginFieldRequire` method with empty username and password fields.
   * @autor Gilber Cuadrado
   * @param constructor
   * @since 26/08/2024
   * @version 1.1
   *
   */

  async performRequireField(): Promise<void> {
    const loginFieldPage = new LoginPage(this.page);
    await loginFieldPage.performLoginFieldRequire({
      username: "correo.usuario@fidubogota.com",
      password: "ValidField_123",
    });
  }
}
