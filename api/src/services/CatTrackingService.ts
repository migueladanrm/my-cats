import { TrackingPoint } from "../models";
import { CatTrackingRepository } from "../repositories";

class CatTrackingService {
  constructor(private catTrackingRepository: CatTrackingRepository) {}

  async add(catId: string, point: TrackingPoint) {
    await this.catTrackingRepository.add(catId, point);
  }

  async get(catId: string, page: number, size: number): Promise<TrackingPoint[]> {
    return await this.catTrackingRepository.get(catId, page, size);
  }

  async getLast(catId: string): Promise<TrackingPoint | undefined> {
    return await this.catTrackingRepository.getLast(catId);
  }
}

export default CatTrackingService;
