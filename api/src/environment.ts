const environment = {
  dbConnectionString: process.env.DB_CONNECTION_STRING || "",
  port: process.env.PORT || 5500,
  defaultPageSize: 25
};

export default environment;
