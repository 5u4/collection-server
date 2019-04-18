import { IParser } from "../services/Parser";

export const YouTubeParser: IParser = {
  name: "YouTube",
  parse: async page => {
    return page.evaluate(() => {
      const name = document.title.replace(" - YouTube", "").trim();

      const description = (document.getElementById("description")!
        .firstChild as HTMLElement).innerText.trim();

      return { name, description };
    });
  }
};
