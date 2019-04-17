import { IParser, Parser } from "../services/Parser";

export const ItCodeMonkeyParser: IParser = {
  name: "IT程序猿",
  parse: async page => {
    const { name, description } = await Parser.defaultNameDescriptionParsing(
      page
    );

    return { name: name.replace("- IT程序猿", "").trim(), description };
  }
};
