import "reflect-metadata";
import App from "./server";
import log from "./telemetry";

log.info("Starting MyCats API...");

const server = App();

export { server };
