import { Column, Entity, Index, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Cat } from "../../../models";

@Entity({ name: "cat" })
class CatEntity implements Cat {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column({ type: "varchar", length: 64, nullable: false })
  @Index({ unique: true })
  name: string;

  @Column({ type: "varchar", length: 64, nullable: false })
  breed: string;

  @Column({ type: "varchar", length: 300, nullable: true })
  description?: string;

  @Column({ type: "date", nullable: true })
  birthdate?: Date;

  @Column({ type: "varchar", length: 128, nullable: true })
  profilePicture?: string;

  @Column({ type: "timestamp without time zone", nullable: false, default: () => "now()" })
  createdAt?: Date;

  @Column({ type: "timestamp without time zone", nullable: true })
  lastSeen?: Date;
}

export default CatEntity;
