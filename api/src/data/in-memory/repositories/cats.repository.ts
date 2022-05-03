import { v4 as uuid } from "uuid";
import { Cat } from "../../../models";
import { CatsRepository } from "../../../repositories";

class InMemoryCatsRepository implements CatsRepository {
  constructor(private cats: Cat[] = []) {}

  async add(cat: Partial<Cat>): Promise<Cat> {
    if (!cat.id) cat.id = uuid();
    cat.createdAt = new Date();
    this.cats.push(cat as Cat);
    return cat as Cat;
  }

  async delete(id: string): Promise<boolean> {
    this.cats = this.cats.filter((c) => c.id !== id);
    return true;
  }

  async getById(id: string): Promise<Cat> {
    return this.cats.find((c) => c.id === id);
  }

  async search(q: string): Promise<Cat[]> {
    return this.cats.filter((c) => c.name.toLowerCase().includes(q.toLowerCase()));
  }

  async update(id: string, cat: Cat): Promise<Cat> {
    let updatedCat = await this.getById(id);
    updatedCat = { ...updatedCat, ...cat };
    this.cats = this.cats.filter((c) => c.id !== id).concat(updatedCat);
    return updatedCat;
  }

  async get(page: number, size: number): Promise<Cat[]> {
    return this.cats.slice(page * size, page * size + size);
  }
}

export default InMemoryCatsRepository;
