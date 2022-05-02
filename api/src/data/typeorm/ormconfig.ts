import { DataSource } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

export const AppDataSource = new DataSource({
  name: "default",
  type: "postgres",
  url: process.env.DB_CONNECTION_STRING || "postgres://mycats:mycats@localhost:5432/mycats",
  synchronize: true,
  logging: true,
  migrationsRun: true,
  entities: [__dirname + "/../**/*.entity.{js,ts}"],
  migrations: [__dirname + "/../**/migration/*.{js,ts}"],
  migrationsTableName: "__migrations",
  namingStrategy: new SnakeNamingStrategy()
});
