import { Parser } from "./Parser";

export const DefaultParser: Parser = {
  name: undefined,
  parse: async page => {
    return page.evaluate(() => {
      return { name: document.title.trim(), description: undefined };
    });
  }
};
