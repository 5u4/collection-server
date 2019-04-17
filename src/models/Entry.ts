import { BaseEntity, PrimaryGeneratedColumn, Column, Entity } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";

@Entity()
@ObjectType()
export class Entry extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @Field(returns => ID)
  id: string;

  @Column()
  @Field()
  name: string;

  @Column({ nullable: true, unique: true })
  @Field()
  source: string;

  @Column("text")
  @Field()
  content: string;

  async crawlSite() {}
}
