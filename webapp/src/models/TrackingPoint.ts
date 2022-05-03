interface TrackingPoint {
  id?:number;
  point: GeoPoint2D;
  createdAt: Date;
}

interface GeoPoint2D {
  latitude: number;
  longitude: number;
}

export default TrackingPoint;
