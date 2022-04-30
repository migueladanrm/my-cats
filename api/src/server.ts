import bodyParser from "body-parser";
import express from "express";
import * as http from "http";
import morgan from "morgan";
import Container from "typedi";
import { InMemoryCatsRepository } from "./data/in-memory/repositories";
import environment from "./environment";
import { CatsRoute } from "./routes";
import { CatsService } from "./services";
import log from "./telemetry";

const MyCatsServer = () => {
  const { port } = environment;

  const catsRepository = new InMemoryCatsRepository();
  const catsService = new CatsService(catsRepository);

  const app = express()
    .use(morgan("dev"))
    .use(bodyParser.json())
    .get("/", (req, res) => {
      res.send(`<h1 style="font-family:Arial, sans-serif;">Hello, world!</h1>`);
    })
    .use("/cats", CatsRoute(catsService));

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

export default MyCatsServer;
