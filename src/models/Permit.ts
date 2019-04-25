import { BaseEntity, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Permit extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;
}
