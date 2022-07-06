import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ async: true })
export class IsNotExistConstraint implements ValidatorConstraintInterface {
  validate(userName: any, args: ValidationArguments) {
    // return UserRepository.findOneByName(userName).then((user) => {
    //   if (user) return false;
    return true;
    // });
  }
}

export function IsExists(
  model: string,
  uniqueField: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [model, uniqueField],
      validator: IsNotExistConstraint,
    });
  };
}
