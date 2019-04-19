import * as puppeteer from "puppeteer";

export class Browser {
  browser: puppeteer.Browser;

  async initialize() {
    const launchOptions: puppeteer.LaunchOptions =
      process.env.NODE_ENV === "production"
        ? {
            executablePath: "/usr/bin/chromium-browser",
            args: ["--no-sandbox", "--headless", "--disable-gpu"]
          }
        : {};

    this.browser = await puppeteer.launch(launchOptions);
  }

  async newPage() {
    return this.browser.newPage();
  }
}
