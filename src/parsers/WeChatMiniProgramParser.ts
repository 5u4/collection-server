import { IParser } from "../services/Parser";

export const WeChatMiniProgramParser: IParser = {
  name: "微信小程序",
  parse: async page => {
    return page.evaluate(() => {
      const name = document.getElementById("activity-name")!.innerText.trim();

      const description = (document.getElementById("js_content")!
        .firstElementChild as HTMLElement).innerText.trim();

      return { name, description };
    });
  }
};
