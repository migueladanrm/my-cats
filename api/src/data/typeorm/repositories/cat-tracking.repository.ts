import { AppDataSource } from "..";
import { TrackingPoint } from "../../../models";
import { CatTrackingEntity } from "../entities";
import { CatTrackingRepository } from "../../../repositories";
import GeoJSON from "geojson";

export default class TypeOrmCatTrackingRepository implements CatTrackingRepository {
  async add(catId: string, trackingPoint: TrackingPoint): Promise<void> {
    let point: GeoJSON.Point = {
      type: "Point",
      coordinates: [trackingPoint.point.longitude, trackingPoint.point.latitude]
    };
    await AppDataSource.createQueryBuilder()
      .insert()
      .into(CatTrackingEntity)
      .values({ catId, point })
      .returning("*")
      .execute();
  }

  async get(catId: string, page: number, size: number): Promise<TrackingPoint[]> {
    const points = await AppDataSource.getRepository(CatTrackingEntity)
      .createQueryBuilder("ct")
      .where("ct.cat_id = :catId", { catId })
      .orderBy("ct.created_at", "DESC")
      .skip(page * size)
      .take(size)
      .getMany();

    return points.map(this.toTrackingPoint);
  }

  async getLast(catId: string): Promise<TrackingPoint> {
    const last = await AppDataSource.getRepository(CatTrackingEntity)
      .createQueryBuilder("ct")
      .where("ct.cat_id = :catId", { catId })
      .orderBy("ct.created_at", "DESC")
      .getOne();

    if (last) return this.toTrackingPoint(last);
  }

  /**
   * Maps a Cat Tracking Entity to a generic Tracking Point.
   * @param trackingPoint Source Cat Tracking Point.
   * @returns Tracking Point.
   */
  private toTrackingPoint(trackingPoint: CatTrackingEntity): TrackingPoint {
    return {
      ...trackingPoint,
      point: {
        longitude: trackingPoint.point.coordinates[0],
        latitude: trackingPoint.point.coordinates[1]
      }
    };
  }
}
