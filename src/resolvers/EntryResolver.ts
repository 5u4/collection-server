import { Query, Resolver, Mutation, Arg } from "type-graphql";
import { Entry } from "../models/Entry";
import { EntryInput } from "../inputs/EntryInput";

@Resolver()
export class EntryResolver {
  @Query(returns => [Entry])
  async entries() {
    return Entry.find();
  }

  @Mutation(returns => Entry)
  async addEntry(@Arg("entryInput") entryInput: EntryInput) {
    const entry = Entry.create({
      name: entryInput.name,
      source: entryInput.source
    });

    await entry.crawlSite();
    await entry.save();

    return entry;
  }
}
