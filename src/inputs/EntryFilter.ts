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

    const searchTerm = `%${this.keyword.replace(/[\t\n\v\f\r ]/g, "%")}%`;

    queryBuilder.orWhere(`post.name ILIKE :name`, { name: searchTerm });
    queryBuilder.orWhere(`post.description ILIKE :description`, {
      description: searchTerm
    });
  }
}
