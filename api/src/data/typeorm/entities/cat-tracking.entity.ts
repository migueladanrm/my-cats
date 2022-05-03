import { Feature, Point } from "geojson";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn
} from "typeorm";
import { TrackingPoint } from "../../../models";
import CatEntity from "./cat.entity";
//import { GeoPoint2D } from "../../../models/TrackingPoint";

@Entity({ name: "cat_tracking" })
export default class CatTrackingEntity implements TrackingPoint {
  @PrimaryGeneratedColumn("increment")
  id?: number;

  @ManyToOne(() => CatEntity, (cat) => cat.id, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "cat_id" })
  catId: string;

  @Column({
    type: "geometry",
    spatialFeatureType: "Point",
    srid: 4326,
    nullable: true
  })
  point: Point;

  @Column({ type: "timestamp without time zone", nullable: false, default: () => "now()" })
  createdAt: Date;
}
