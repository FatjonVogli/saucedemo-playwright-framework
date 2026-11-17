import Ajv, { AnySchema } from 'ajv';
import addFormats from 'ajv-formats';

const ajv = new Ajv({ allErrors: true, strict: true });
addFormats(ajv);

export const validateSchema = (schema: AnySchema, data: unknown): string[] => {
  const validate = ajv.compile(schema);
  if (validate(data)) {
    return [];
  }
  return (validate.errors ?? []).map((e) => `${e.instancePath || '/'} ${e.message}`);
};
