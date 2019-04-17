import * as puppeteer from "puppeteer";

export class Browser {
  browser: puppeteer.Browser;

  async initialize() {
    this.browser = await puppeteer.launch();
  }

  async newPage() {
    return this.browser.newPage();
  }
}
