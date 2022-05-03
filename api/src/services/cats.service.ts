import { Cat } from "../models";
import { CatsRepository } from "../repositories";

/**
 * Cats Service.
 */
class CatsService {
  constructor(private catsRepository: CatsRepository) {}

  async add(cat: Partial<Cat>): Promise<Cat> {
    return this.catsRepository.add(cat);
  }

  async delete(id: string): Promise<boolean> {
    return this.catsRepository.delete(id);
  }

  async getById(id: string): Promise<Cat | undefined> {
    return this.catsRepository.getById(id);
  }

  async get(page: number = 0, size: number = 25): Promise<Cat[]> {
    return this.catsRepository.get(page, size);
  }

  async search(q: string): Promise<Cat[]> {
    return this.catsRepository.search(q);
  }

  async update(id: string, cat: Cat): Promise<Cat> {
    return this.catsRepository.update(id, cat);
  }
}

export default CatsService;
