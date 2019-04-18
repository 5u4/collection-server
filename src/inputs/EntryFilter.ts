import { Entry } from "./../models/Entry";
import { InputType, Field } from "type-graphql";
import { SelectQueryBuilder } from "typeorm";

@InputType()
export class EntryFilter {
  @Field({ nullable: true })
  keyword?: string;

  buildQuery(queryBuilder: SelectQueryBuilder<Entry>) {
    if (!this.keyword) {
      return;
    }

    const name = `%${this.keyword.toLowerCase()}%`;
    queryBuilder
      .where("post.name LIKE :name", { name })
      .orWhere("post.description LIKE :name", { name });
  }
}
