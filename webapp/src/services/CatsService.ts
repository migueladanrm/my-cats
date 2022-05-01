import axios from "axios";
import { Cat } from "../models";

class CatsService {
  constructor() {}

  async get(): Promise<Cat[]> {
    const response = await axios.get<Cat[]>("/api/cats");
    return response.data;
  }

  async add(cat: Cat): Promise<Cat> {
    throw new Error("Not implemented yet!");
  }
}

export default new CatsService() as CatsService;
