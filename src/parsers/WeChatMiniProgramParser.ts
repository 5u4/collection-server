import { IParser } from "../services/Parser";

export const WeChatMiniProgramParser: IParser = {
  name: "微信小程序",
  parse: async page => {
    return page.evaluate(() => {
      const name = document.getElementById("activity-name")!.innerText.trim();

      const description = (document.querySelector(
        "#js_content > p:nth-child(1) > span"
      ) as HTMLSpanElement).innerText.trim();

      return { name, description };
    });
  }
};
