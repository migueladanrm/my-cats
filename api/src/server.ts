import bodyParser from "body-parser";
import express from "express";
import * as http from "http";
import morgan from "morgan";
import { AppDataSource } from "./data/typeorm";
import {
  TypeOrmCatTrackingRepository,
  TypeOrmCatsRepository
} from "./data/typeorm/repositories";
import environment from "./environment";
import { CatsRepository, CatTrackingRepository } from "./repositories";
import { CatsRoute, CatTrackingRoute } from "./routes";
import { CatsService, CatTrackingService } from "./services";
import log from "./telemetry";

const App = async () => {
  const { port } = environment;

  AppDataSource.initialize()
    .then(() => log.info("Database connection complete"))
    .catch((err) => log.fatal(err));

  let catsRepository: CatsRepository;
  let catTrackingRepository: CatTrackingRepository;

  catTrackingRepository = new TypeOrmCatTrackingRepository();
  catsRepository = new TypeOrmCatsRepository();

  const catsService = new CatsService(catsRepository);
  const catTrackingService = new CatTrackingService(catTrackingRepository);

  const app = express()
    .use(morgan("dev"))
    .use((req, res, next) => {
      res
        .header("Access-Control-Allow-Origin", "*")
        .header("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS")
        .header(
          "Access-Control-Allow-Headers",
          "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials"
        );
      next();
    })
    .use(bodyParser.json())
    .get("/", (req, res) => {
      res.send(`<h1 style="font-family:Arial, sans-serif;">Hello, world!</h1>`);
    })
    .use("/cats", CatsRoute(catsService))
    .use("/tracking",CatTrackingRoute(catTrackingService));

  return http
    .createServer(app)
    .listen(port)
    .on("listening", () => {
      log.info(`Server listening on port ${port}`);
    })
    .on("error", (error) => {
      log.fatal(error);
    });
};

export default App;
