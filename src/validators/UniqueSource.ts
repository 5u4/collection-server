import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from "class-validator";
import { Entry } from "../models/Entry";

@ValidatorConstraint({ async: true })
export class UniqueSourceConstraint implements ValidatorConstraintInterface {
  async validate(source: any) {
    return !(await Entry.findOne({ where: { source } }));
  }

  defaultMessage() {
    return "Source $value already exists";
  }
}

export function UniqueSource(validationOptions?: ValidationOptions) {
  return function(object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: UniqueSourceConstraint
    });
  };
}
