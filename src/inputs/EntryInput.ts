import { InputType, Field } from "type-graphql";
import { IsNotEmpty, IsUrl } from "class-validator";
import { UniqueSource } from "../validators/UniqueSource";

@InputType()
export class EntryInput {
  @Field({ nullable: true })
  name?: string;

  @Field()
  @IsNotEmpty()
  @IsUrl()
  @UniqueSource()
  source: string;
}
