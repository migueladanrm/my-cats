import { Column, Entity, Index, PrimaryColumn } from "typeorm";
import { Cat } from "../../../models";

@Entity({ name: "cat" })
class CatEntity implements Cat {
  @PrimaryColumn("uuid")
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

  @Column({ type: "timestamp", nullable: false, default: () => "now()" })
  createdAt?: Date;

  lastSeen?: Date;
}

export default CatEntity;
