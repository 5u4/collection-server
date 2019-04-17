import { IParser } from "../services/Parser";

export const GitHubParser: IParser = {
  name: "GitHub",
  parse: async page => {
    return page.evaluate(() => {
      const name = (document.getElementsByName(
        "twitter:title"
      )[0] as HTMLMetaElement).content.trim();

      const description = (document.getElementsByName(
        "description"
      )[0] as HTMLMetaElement).content.trim();

      return { name, description };
    });
  }
};
