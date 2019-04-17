import { Parser } from "./../parsers/Parser";
import { browser } from "./../server";
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

  @Column({ unique: true })
  @Field()
  source: string;

  @Column("text", { nullable: true })
  @Field({ nullable: true })
  description?: string;

  async crawlSite() {
    this.source = this.source.trim();

    const page = await browser.newPage();
    await page.goto(this.source);

    const { name, description } = await Parser.parse(page);
    if (this.name === undefined) {
      this.name = name;
    }
    this.description = description;

    await page.close();
  }
}
