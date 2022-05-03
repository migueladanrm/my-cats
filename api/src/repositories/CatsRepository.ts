import { Cat } from "../models";

/**
 * Cats Repository
 */
interface CatsRepository {
  add(cat: Partial<Cat>): Promise<Cat>;
  delete(id: string): Promise<boolean>;
  get(page: number, size: number): Promise<Cat[]>;
  getById(id: string): Promise<Cat>;
  search(q: string): Promise<Cat[]>;
  update(id:string,cat: Cat): Promise<Cat>;
}

export default CatsRepository;
