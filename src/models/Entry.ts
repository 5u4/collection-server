import { Parser } from "../services/Parser";
import { browser } from "./../server";
import { BaseEntity, PrimaryGeneratedColumn, Column, Entity } from "typeorm";
import { ObjectType, Field, ID, Int } from "type-graphql";

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

  @Column({ nullable: true })
  @Field({ nullable: true })
  from?: string;

  @Column("text", { nullable: true })
  @Field({ nullable: true })
  description?: string;

  @Column("integer")
  @Field(returns => Int)
  createdAt: number = (Date.now() / 1000) | 0;

  async crawlSite() {
    this.source = this.source.trim();

    const page = await browser.newPage();
    await page.goto(this.source, { waitUntil: "networkidle0" });

    const { name, description, from } = await Parser.parse(page);
    if (this.name === undefined) {
      this.name = name.toLowerCase();
    }
    this.description = description ? description.toLowerCase() : undefined;
    this.from = from ? from.toLowerCase() : undefined;

    await page.close();
  }
}
