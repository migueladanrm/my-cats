import { Service } from "typedi";
import { Cat } from "../../../models";
import { CatsRepository } from "../../../repositories";
import { v4 as uuid } from "uuid";
@Service("catsRepository")
class InMemoryCatsRepository implements CatsRepository {
  constructor(
    private cats: Cat[] = [
      {
        id: "94337a83-2e6a-4836-bf85-0057fbb4a25c",
        name: "Tommy",
        breed: "Absinio",
        createdAt: new Date()
      }
    ]
  ) {}
  async add(cat: Partial<Cat>): Promise<Cat> {
    cat.id = uuid();
    cat.createdAt = new Date();
    this.cats.push(cat as Cat);
    return cat as Cat;
  }
  delete(id: number): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  getById(id: number): Promise<Cat> {
    throw new Error("Method not implemented.");
  }

  search(q: string): Promise<Cat[]> {
    throw new Error("Method not implemented.");
  }
  
  update(cat: Cat): Promise<Cat> {
    throw new Error("Method not implemented.");
  }

  async get(page: number, size: number): Promise<Cat[]> {
    return this.cats;
  }
}

export default InMemoryCatsRepository;
