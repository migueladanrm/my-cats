import { Inject, Service } from "typedi";
import { Cat } from "../models";
import { CatsRepository } from "../repositories";

@Service()
class CatsService {
  constructor(private catsRepository: CatsRepository) {}

  async add(cat: Partial<Cat>): Promise<Cat> {
    return this.catsRepository.add(cat);
  }

  async delete(id: number): Promise<boolean> {
    return this.catsRepository.delete(id);
  }

  async getById(id: number): Promise<Cat | undefined> {
    return this.catsRepository.getById(id);
  }

  async get(page: number = 0, size: number = 25): Promise<Cat[]> {
    return this.catsRepository.get(page, size);
  }

  async search(q: string): Promise<Cat[]> {
    return this.catsRepository.search(q);
  }

  async update(cat: Cat): Promise<Cat> {
    return this.catsRepository.update(cat);
  }
}

export default CatsService;
