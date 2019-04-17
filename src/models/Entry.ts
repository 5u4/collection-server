import { browser } from "./../server";
import { BaseEntity, PrimaryGeneratedColumn, Column, Entity } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { minify } from "html-minifier";
import { config } from "../config/config";

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

  @Column("text")
  @Field()
  content: string;

  async crawlSite() {
    const page = await browser.newPage();
    await page.goto(this.source);
    this.content = minify(
      await page.evaluate(() => document.body.innerHTML),
      config.minifier
    );

    if (this.name === undefined) {
      this.name = await page.evaluate(() => document.title);
    }

    await page.close();
  }
}
