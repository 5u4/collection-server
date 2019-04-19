import { DIRECTION } from "./../enums/Direction";
import { Entry } from "./../models/Entry";
import { InputType, Field } from "type-graphql";
import { SelectQueryBuilder } from "typeorm";

@InputType()
export class EntryFilter {
  @Field({ nullable: true })
  keyword?: string;

  @Field(returns => DIRECTION, { defaultValue: DIRECTION.DESC })
  direction: DIRECTION = DIRECTION.DESC;

  buildQuery(queryBuilder: SelectQueryBuilder<Entry>) {
    const direction = DIRECTION[this.direction] as "DESC" | "ASC";

    queryBuilder.orderBy("post.createdAt", direction);

    if (!this.keyword) {
      return;
    }

    const name = `%${this.keyword.toLowerCase()}%`;
    queryBuilder
      .where("post.name LIKE :name", { name })
      .orWhere("post.description LIKE :name", { name });
  }
}
