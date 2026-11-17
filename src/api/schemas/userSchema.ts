import { JSONSchemaType } from 'ajv';
import { User } from '../models';

const stringField = { type: 'string', minLength: 1 } as const;

export const userSchema: JSONSchemaType<User> = {
  type: 'object',
  required: ['id', 'name', 'username', 'email', 'address', 'phone', 'website', 'company'],
  properties: {
    id: { type: 'integer', minimum: 1 },
    name: stringField,
    username: stringField,
    email: { type: 'string', format: 'email' },
    address: {
      type: 'object',
      required: ['street', 'suite', 'city', 'zipcode', 'geo'],
      properties: {
        street: stringField,
        suite: stringField,
        city: stringField,
        zipcode: stringField,
        geo: {
          type: 'object',
          required: ['lat', 'lng'],
          properties: {
            lat: { type: 'string', pattern: '^-?\\d+(\\.\\d+)?$' },
            lng: { type: 'string', pattern: '^-?\\d+(\\.\\d+)?$' },
          },
        },
      },
    },
    phone: stringField,
    website: stringField,
    company: {
      type: 'object',
      required: ['name', 'catchPhrase', 'bs'],
      properties: {
        name: stringField,
        catchPhrase: stringField,
        bs: stringField,
      },
    },
  },
};
