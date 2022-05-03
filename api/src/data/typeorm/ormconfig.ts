import { DataSource } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import environment from "../../environment";

export const AppDataSource = new DataSource({
  name: "default",
  type: "postgres",
  url: environment.dbConnectionString || "postgres://mycats:mycats@localhost:5432/mycats",
  synchronize: true,
  logging: true,
  migrationsRun: true,
  entities: [__dirname + "/../**/*.entity.{js,ts}"],
  migrations: [__dirname + "/../**/migrations/*.{js,ts}"],
  subscribers:[__dirname + "/../**/subscribers/*.{js,ts}"],
  migrationsTableName: "__migrations",
  namingStrategy: new SnakeNamingStrategy()
});
