import axios from "axios";
import { Cat } from "../models";

class CatsService {
  constructor() {}

  BASE_URL = "http://localhost:5500";

  async get(): Promise<Cat[]> {
    const response = await axios.get<Cat[]>(`${this.BASE_URL}/cats`);
    return response.data;
  }

  async add(cat: Cat): Promise<Cat> {
    return axios
      .post<Cat>(`${this.BASE_URL}/cats`, cat)
      .then((createdCat) => {
        return createdCat;
      })
      .catch((err) => {
        return err;
      });
  }
}

export default new CatsService() as CatsService;
