import { AsyncValidator } from "fluentvalidation-ts";
import { Cat } from "../models";

class NewCatValidator extends AsyncValidator<Cat> {
  constructor() {
    super();
  }
}

export { NewCatValidator };
