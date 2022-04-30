import 'reflect-metadata';
import Container from 'typedi';
import MyCatsServer from "./server";
import log from "./telemetry";

log.info("Starting MyCats API...");

const server = MyCatsServer();


export { server };
