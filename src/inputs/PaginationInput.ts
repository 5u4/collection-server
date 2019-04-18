import { Entry } from "./../models/Entry";
import { Max, Min } from "class-validator";
import { Field, InputType, Int } from "type-graphql";
import { SelectQueryBuilder } from "typeorm";

@InputType()
export class PaginationInput {
  static readonly DEFAULT_PAGE = 1;
  static readonly DEFAULT_PERPAGE = 10;

  @Field(returns => Int, { defaultValue: PaginationInput.DEFAULT_PAGE })
  @Min(1)
  page: number = PaginationInput.DEFAULT_PAGE;

  @Field(returns => Int, { defaultValue: PaginationInput.DEFAULT_PERPAGE })
  @Min(1)
  @Max(50)
  perPage: number = PaginationInput.DEFAULT_PERPAGE;

  get limit() {
    return this.perPage;
  }

  get offset() {
    return (this.page - 1) * this.perPage;
  }

  buildQuery(queryBuilder: SelectQueryBuilder<Entry>) {
    queryBuilder.skip(this.offset).take(this.limit);
  }
}
