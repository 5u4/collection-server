import { WeChatMiniProgramParser } from "./../parsers/WeChatMiniProgramParser";
import { JueJinParser } from "../parsers/JueJinParser";
import { ZhiHuZhuanLanParser } from "../parsers/ZhiHuZhuanLanParser";
import { parse } from "url";
import * as puppeteer from "puppeteer";
import { DefaultParser } from "../parsers/DefaultParser";

export interface IParser {
  name?: string;
  parse: (
    page: puppeteer.Page
  ) => Promise<{ name: string; description: string | undefined }>;
}

export class Parser {
  private static parsers: { [hostname: string]: IParser } = {
    "zhuanlan.zhihu.com": ZhiHuZhuanLanParser,
    "juejin.im": JueJinParser,
    "mp.weixin.qq.com": WeChatMiniProgramParser,
    default: DefaultParser
  };

  static async parse(page: puppeteer.Page) {
    const hostname = this.parseHostName(page.url());

    const parser = this.getParser(hostname);

    return { ...(await parser.parse(page)), from: parser.name };
  }

  static async defaultNameDescriptionParsing(page: puppeteer.Page) {
    return page.evaluate(() => {
      const name = document.title.trim();

      const descriptionElement = document.getElementsByName("description");

      if (!descriptionElement || descriptionElement.length < 1) {
        return { name, description: undefined };
      }

      const description = (descriptionElement[0] as HTMLMetaElement).content;

      return { name, description };
    });
  }

  private static parseHostName(url: string) {
    return parse(url).hostname;
  }

  private static getParser(hostname: string | undefined) {
    if (!hostname || !(hostname in this.parsers)) {
      return this.parsers.default;
    }

    return this.parsers[hostname];
  }
}
