import express from "express";
import * as http from "http";
import environment from "./environment";
import log from "./telemetry";

const MyCatsServer = () => {
  const { port } = environment;

  const app = express().get("/", (req, res) => {
    res.send(`<h1 style="font-family:Arial, sans-serif;">Hello, world!</h1>`);
  });

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
