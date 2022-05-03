import axios from "axios";
import { Cat } from "../models";

class CatsService {
  constructor() {}

  BASE_URL = "http://localhost:5500";

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

  async delete(id: string): Promise<boolean> {
    return axios
      .delete(`${this.BASE_URL}/cats/${id}`)
      .then((response) => response.status === 204)
      .catch((err) => {
        console.log(err);
        return false;
      });
  }

  async get(): Promise<Cat[]> {
    const response = await axios.get<Cat[]>(`${this.BASE_URL}/cats`);
    return response.data;
  }

  async getById(id: string): Promise<Cat | undefined> {
    const response = await axios.get<Cat>(`${this.BASE_URL}/cats/${id}`);
    if (response.status === 200) return response.data;
    return undefined;
  }

  async update(id: string, cat: Cat): Promise<Cat | undefined> {
    return axios
      .patch<Cat>(`${this.BASE_URL}/cats/${id}`, cat)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log(err);
        return undefined;
      });
  }
}

export default new CatsService() as CatsService;
