import { IParser, Parser } from "../services/Parser";

export const DefaultParser: IParser = {
  name: undefined,
  parse: async page => Parser.defaultNameDescriptionParsing(page)
};
