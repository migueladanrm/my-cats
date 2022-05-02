import { DataSource } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

//export default new DataSource({
export const AppDataSource = new DataSource({
  name: "default",
  type: "postgres",
  url: process.env.DB_CONNECTION_STRING || "postgres://mycats:mycats@localhost:5432/mycats",
  synchronize: true,
  logging: true,
  migrationsRun: true,
  entities: ["src/data/typeorm/entities/**/*.entity.ts"],
  migrations: ["src/data/typeorm/migrations/*.ts"],
  migrationsTableName: "__migrations",
  namingStrategy: new SnakeNamingStrategy()
});

// export const AppDataSource = new DataSource({
//   name: "prod",
//   type: "postgres",
//   url: process.env.DB_CONNECTION_STRING || "postgres://mycats:mycats@localhost:5432/mycats",
//   synchronize: true,
//   logging: true,
//   migrationsRun: true,
//   entities: [CatEntity, CatTrackingEntity],
//   migrations: [],
//   migrationsTableName: "__migrations",
//   namingStrategy: new SnakeNamingStrategy()
// });

// export const AppDb = new DataSource({
//   name: "prod",
//   type: "postgres",
//   url: process.env.DB_CONNECTION_STRING || "postgres://mycats:mycats@localhost:5432/mycats",
//   synchronize: true,
//   logging: true,
//   migrationsRun: true,
//   entities: [CatEntity, CatTrackingEntity],
//   migrations: ["src/data/typeorm/migrations/*.ts"],
//   migrationsTableName: "__migrations",
//   namingStrategy: new SnakeNamingStrategy()
// });

// export function __createConnection() {
//   await createConnection();
//   return new DataSource({
//     name: "prod",
//     type: "postgres",
//     url: process.env.DB_CONNECTION_STRING || "postgres://mycats:mycats@localhost:5432/mycats",
//     synchronize: true,
//     logging: true,
//     migrationsRun: true,
//     entities: [CatEntity, CatTrackingEntity],
//     migrations: ["src/data/typeorm/migrations/*.ts"],
//     migrationsTableName: "__migrations",
//     namingStrategy: new SnakeNamingStrategy()
//   });
// }

//export = config;

// export const config:={}
