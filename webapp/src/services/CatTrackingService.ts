import axios from "axios";
import { TrackingPoint } from "../models";

class CatTrackingService {
  constructor() {}

  private BASE_URL = process.env.REACT_APP_API_BASE_URL;

  async getLast(catId: string): Promise<TrackingPoint> {
    return axios
      .get<TrackingPoint>(`${this.BASE_URL}/tracking/${catId}/last`)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        return err;
      });
  }
}

export default new CatTrackingService() as CatTrackingService;
