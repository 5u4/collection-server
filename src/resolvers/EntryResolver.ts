import { Query, Resolver, Mutation, Arg, Authorized } from "type-graphql";
import { Entry } from "../models/Entry";
import { EntryInput } from "../inputs/EntryInput";
import { PaginationInput } from "../inputs/PaginationInput";
import { EntryFilter } from "../inputs/EntryFilter";

@Resolver()
export class EntryResolver {
  @Query(returns => [Entry])
  async entries(
    @Arg("filter", { defaultValue: new EntryFilter() })
    entryFilter: EntryFilter,
    @Arg("pagination", { defaultValue: new PaginationInput() })
    pagination: PaginationInput
  ) {
    const queryBuilder = Entry.createQueryBuilder("post");

    entryFilter.buildQuery(queryBuilder);
    pagination.buildQuery(queryBuilder);

    return queryBuilder.getMany();
  }

  @Authorized()
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
