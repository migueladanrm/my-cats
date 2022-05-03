import "reflect-metadata";
import App from "./app";
import log from "./telemetry";

log.info("Starting MyCats API...");

const app = App();

export { app };
