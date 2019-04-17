import { InputType, Field } from "type-graphql";
import { IsNotEmpty, IsUrl } from "class-validator";

@InputType()
export class EntryInput {
  @Field({ nullable: true })
  name?: string;

  @Field()
  @IsNotEmpty()
  @IsUrl()
  source: string;
}
