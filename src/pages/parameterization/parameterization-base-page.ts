import { Page } from "playwright";

export class BaseParameterization {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }
}
