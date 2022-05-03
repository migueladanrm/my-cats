import { Validator } from "fluentvalidation-ts";
import { Cat } from "../models";

class NewCatValidator extends Validator<Cat> {
  constructor() {
    super();

    const defaultMessage = "Required field";

    this.ruleFor("name").notEmpty().withMessage(defaultMessage);
    this.ruleFor("name").notNull().withMessage(defaultMessage);

    this.ruleFor("breed").notEmpty().withMessage(defaultMessage);
    this.ruleFor("breed").notNull().withMessage(defaultMessage);
  }
}

export default NewCatValidator;
