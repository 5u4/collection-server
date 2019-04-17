import { Parser } from "./Parser";

export const ZhiHuZhuanLanParser: Parser = {
  name: "知乎专栏",
  parse: async page => {
    return page.evaluate(() => {
      const name = document.title.replace("- 知乎", "").trim();

      const descriptionElement = document.getElementsByName("description");

      if (!descriptionElement || descriptionElement.length < 1) {
        return { name, description: undefined };
      }

      const description = (descriptionElement[0] as HTMLMetaElement).content;

      return { name, description };
    });
  }
};
