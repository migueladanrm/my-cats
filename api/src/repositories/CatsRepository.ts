import { Cat } from "../models";

interface CatsRepository {
  add(cat: Partial<Cat>): Promise<Cat>;
  delete(id: number): Promise<boolean>;
  get(page: number, size: number): Promise<Cat[]>;
  getById(id: number): Promise<Cat>;
  search(q: string): Promise<Cat[]>;
  update(cat: Cat): Promise<Cat>;
}

export default CatsRepository;
