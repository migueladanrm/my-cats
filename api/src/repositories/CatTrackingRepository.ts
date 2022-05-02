import { TrackingPoint } from "../models";

interface CatTrackingRepository {
  add(catId: string, point: TrackingPoint): Promise<void>;
  get(catId: string, page: number, size: number): Promise<TrackingPoint[]>;
  getLast(catId: string): Promise<TrackingPoint | undefined>;
}

export default CatTrackingRepository;