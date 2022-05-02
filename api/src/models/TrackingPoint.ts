import { Point } from "geojson";

export default interface TrackingPoint {
  id?: number;
  point: GeoPoint2D | any;
  createdAt?: Date;
}

export interface GeoPoint2D {
  latitude: number;
  longitude: number;
}
