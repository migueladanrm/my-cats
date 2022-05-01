import { Cat } from "../models";

class CatsService {
  constructor() {}

  async get(): Promise<Cat[]> {
    throw new Error("Not implemented yet!");
  }

  async add(cat: Cat): Promise<Cat> {
    throw new Error("Not implemented yet!");
  }
}

export default CatsService;
