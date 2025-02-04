interface ILoginPageLocators {
  emailInput: string;
  passwordInput: string;
  buttonLogin: string;
  hoverFilesRelocation: string;
  homePageTitle: string;
  loginErrorPopUp: string;
  requiredFieldPasswordInput: string;
  requiredFieldEmailInput: string;
  userNameLocator: string;
}

export const LocatorsLoginPage: ILoginPageLocators = {
  emailInput: "#email",
  passwordInput: "#password",
  buttonLogin: "#button-login",
  homePageTitle: "#new-parameterization",
  hoverFilesRelocation: "#file-transfer",
  loginErrorPopUp: "#alert-message",
  requiredFieldPasswordInput: "#password-error-message",
  requiredFieldEmailInput: "#email-error-message",
  userNameLocator: "#username",
};
