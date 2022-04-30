import { ConnectionOptions, DataSourceOptions, getConnectionManager } from "typeorm";

const dbConfiguration: DataSourceOptions = {
  type: "postgres",
  url: "",
  synchronize: true,
  logging: true,
  entities: [],
  migrations: [],
  migrationsTableName: "__migrations"
};

function getConnection() {
  const connectionManager = getConnectionManager();
}
