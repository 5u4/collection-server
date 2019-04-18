import { Max, Min } from "class-validator";
import { Field, InputType, Int } from "type-graphql";

@InputType()
export class PaginationInput {
  static readonly DEFAULT_PAGE = 1;
  static readonly DEFAULT_PERPAGE = 10;

  @Field(returns => Int, { defaultValue: PaginationInput.DEFAULT_PAGE })
  @Min(1)
  page: number;

  @Field(returns => Int, { defaultValue: PaginationInput.DEFAULT_PERPAGE })
  @Min(1)
  @Max(50)
  perPage: number;

  get limit() {
    return this.perPage;
  }

  get offset() {
    return (this.page - 1) * this.perPage;
  }
}
