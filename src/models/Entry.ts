import { BaseEntity, PrimaryGeneratedColumn, Column, Entity } from "typeorm";

@Entity()
export class Entry extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  source: string;

  @Column("text")
  text: string;
}
