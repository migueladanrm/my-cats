import axios from "axios";
import { TrackingPoint } from "../models";

class CatTrackingService {
  constructor() {}

  BASE_URL = "http://localhost:5500";

  async getLast(catId: string): Promise<TrackingPoint> {
    return axios
      .get<TrackingPoint>(`${this.BASE_URL}/tracking/${catId}/last`)
      .then((lastPoint) => {
        return lastPoint;
      })
      .catch((err) => {
        return err;
      });
  }
}

export default new CatTrackingService() as CatTrackingService;
