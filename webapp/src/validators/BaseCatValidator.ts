import { AsyncValidator, Validator } from "fluentvalidation-ts";
import { Cat } from "../models";
import { defaultValidatorMessage } from "./misc";

export default class BaseCatValidator extends Validator<Cat> {
  constructor() {
    super();

    this.ruleFor("name").notNull().withMessage(defaultValidatorMessage);
    this.ruleFor("name").notEmpty().withMessage(defaultValidatorMessage);

    this.ruleFor("breed").notNull().withMessage(defaultValidatorMessage);
    this.ruleFor("breed").notEmpty().withMessage(defaultValidatorMessage);
  }
}
