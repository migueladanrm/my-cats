import { Entity } from "typeorm";
import { Cat } from "../../../models";

@Entity({ name: "cat" })
export default class CatEntity implements Cat {
  id?: number;
  name: string;
  breed: string;
  createdAt: Date;
}
