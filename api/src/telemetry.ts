import { Logger } from "tslog";

const log: Logger = new Logger({
  name: "default",
  displayFilePath: "hidden",
  displayFunctionName: false
});

export default log;
