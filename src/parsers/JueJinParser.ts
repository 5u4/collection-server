import { IParser, Parser } from "../services/Parser";

export const JueJinParser: IParser = {
  name: "掘金",
  parse: async page => {
    const { name, description } = await Parser.defaultNameDescriptionParsing(
      page
    );

    return { name: name.replace(" - 掘金", ""), description };
  }
};
