import { CatsRepository } from "../src/repositories";
import { CatsService } from "../src/services";
import { InMemoryCatsRepository } from "../src/data/in-memory/repositories";
import { Cat } from "../src/models";

describe("Cat Service Tests", () => {
  let emptyCatsService: CatsService;
  let nonEmptyCatsService: CatsService;

  beforeEach(() => {
    emptyCatsService = new CatsService(new InMemoryCatsRepository());
    nonEmptyCatsService = new CatsService(
      new InMemoryCatsRepository([
        { id: "test-cat-0", name: "Tom", breed: "Angora" },
        { id: "test-cat-1", name: "Kira", breed: "British Shorthair" }
      ])
    );
  });

  test("Add Cat", async () => {
    await emptyCatsService.add({ name: "Example Cat" });
    const allCats = await emptyCatsService.get(0, 10);
    expect(allCats.length).toBe(1);
  });

  test("Delete Cat", async () => {
    await nonEmptyCatsService.delete("test-cat-0");
    const allCats = await nonEmptyCatsService.get(0, 10);
    expect(allCats.length).toBe(1);
  });

  test("Get Cat by ID exists", async () => {
    const cat = await nonEmptyCatsService.getById("test-cat-0");
    expect(cat !== undefined).toBe(true);
  });

  test("Get Cat with wrong ID is undefined", async () => {
    const cat = await nonEmptyCatsService.getById("non-existing-cat-id");
    expect(cat).toBeUndefined();
  });

  test("Search Cat", async () => {
    const matches = await nonEmptyCatsService.search("kir");
    expect(matches.length).toBe(1);
  });

  test("Update Cat", async () => {
    await nonEmptyCatsService.update("test-cat-0", { name: "Nina" } as Cat);
    const updatedCat = await nonEmptyCatsService.getById("test-cat-0");
    expect(updatedCat.name).toBe("Nina");
  });
});
