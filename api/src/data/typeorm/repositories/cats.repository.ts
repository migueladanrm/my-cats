import { CatEntity } from "../entities";
import { AppDataSource } from "../ormconfig";
import { Cat } from "../../../models";
import { CatsRepository } from "../../../repositories";

export default class TypeOrmCatsRepository implements CatsRepository {
  constructor() {}

  async add(cat: Cat): Promise<Cat> {
    const result = await AppDataSource.createQueryBuilder()
      .insert()
      .into(CatEntity)
      .values(cat)
      .returning("*")
      .execute();

    return 0 < result.generatedMaps.length ? (result.generatedMaps[0] as Cat) : undefined;
  }

  async delete(id: string): Promise<boolean> {
    const result = await AppDataSource.createQueryBuilder()
      .delete()
      .from(CatEntity)
      .where("id = :id", { id: id })
      .execute();

    return 0 < result.affected;
  }

  async get(page: number, size: number): Promise<Cat[]> {
    return await AppDataSource.getRepository(CatEntity)
      .createQueryBuilder("c")
      .orderBy("c.name", "ASC")
      .skip(page * size)
      .take(size)
      .loadAllRelationIds()
      .getMany();
  }

  async getById(id: string): Promise<Cat> {
    return await AppDataSource.getRepository(CatEntity)
      .createQueryBuilder("c")
      .where("c.id = :id", { id: id })
      .loadAllRelationIds()
      .getOne();
  }

  async search(q: string): Promise<Cat[]> {
    const target = `%${q.toLowerCase()}%`;
    return await AppDataSource.getRepository(CatEntity)
      .createQueryBuilder("c")
      .where("lower(c.name) LIKE :q", { q: target })
      .orWhere("lower(c.description) LIKE :q", { q: target })
      .orderBy("c.name", "ASC")
      .loadAllRelationIds()
      .getMany();
  }

  async update(id: string, cat: Cat): Promise<Cat> {
    const result = await AppDataSource.createQueryBuilder()
      .update(CatEntity)
      .set({ ...cat })
      .where("id = :id", { id })
      .returning("id")
      .execute();

    return 0 < result.affected ? this.getById(id) : undefined;
  }
}
