import { Validator } from "fluentvalidation-ts";
import { Cat } from "../models";

class NewCatValidator extends Validator<Cat> {
  constructor() {
    super();
  }
}

export default NewCatValidator;
