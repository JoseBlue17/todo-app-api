import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';
import { isValidObjectId } from 'mongoose';

export function IsObjectId(validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      name: 'IsObjectId',
      target: object.constructor,
      propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any) {
          return isValidObjectId(value);
        },
        defaultMessage(args: ValidationArguments) {
          return `(${args.value}) is not an ObjectId!`;
        },
      },
    });
  };
}
