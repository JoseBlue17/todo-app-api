import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Connection } from 'mongoose';
import { InjectConnection } from '@nestjs/mongoose';

import { ALREADY_EXISTS } from './antd-validation.constants';

@ValidatorConstraint({ name: 'FieldExistsRule', async: true })
@Injectable()
export class FieldExistsRule implements ValidatorConstraintInterface {
  constructor(@InjectConnection() private connection: Connection) {}

  async validate(fieldvalue: string, parameters) {
    const {
      property: { fieldName: defaultFieldName },
      constraints: [
        { repositoryName, parentName = [], fieldName: fieldNameAlias },
      ],
    } = parameters;

    const fieldName = fieldNameAlias || defaultFieldName;

    const query = this.buildQuery({ fieldName, parentName, fieldvalue });

    return !(await this.checkIfExists({ repositoryName, query }));
  }

  defaultMessage() {
    return ALREADY_EXISTS;
  }

  private buildQuery({ parentName, fieldName, fieldvalue }) {
    const query = {};
    const property = this.buildName({
      parentName,
      fieldName,
    });
    query[property] = fieldvalue;
    return query;
  }

  private buildName({ parentName = [], fieldName }) {
    return [...parentName, fieldName].join('.');
  }

  private async checkIfExists({ repositoryName, query }) {
    const repository = await this.connection.model(repositoryName);
    return (await repository.findOne(query)) ? true : false;
  }
}

export function FieldExists(
  property: FieldExistsProperties,
  validationOptions?: ValidationOptions,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'FieldExists',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [property],
      validator: FieldExistsRule,
    });
  };
}

interface FieldExistsProperties {
  repositoryName: string;
  parentName?: any[];
  fieldName?: string;
}
