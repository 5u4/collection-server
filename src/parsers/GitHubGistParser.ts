import { IParser, Parser } from "../services/Parser";

export const GitHubGistParser: IParser = {
  name: "GitHub Gist",
  parse: async page => Parser.defaultNameDescriptionParsing(page)
};
