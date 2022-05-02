import { Point } from "geojson";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { TrackingPoint } from "../../../models";
import CatEntity from "./cat.entity";
//import { GeoPoint2D } from "../../../models/TrackingPoint";

@Entity({ name: "cat_tracking" })
export default class CatTrackingEntity implements TrackingPoint {
  @PrimaryColumn()
  id?: number;

  @ManyToOne(() => CatEntity, (cat) => cat.id, { nullable: false })
  @JoinColumn({ name: "cat_id" })
  catId: string;

  @Column({
    type: "geometry",
    spatialFeatureType: "Point",
    srid: 4326,
    nullable: true
  })
  point: Point;

  @Column({ type: "timestamp", nullable: false, default: () => "now()" })
  createdAt: Date;
}
