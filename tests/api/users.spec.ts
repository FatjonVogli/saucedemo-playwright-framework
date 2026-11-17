import { test, expect } from '../../src/fixtures';
import { apiData } from '../../src/data/testData';
import { userSchema } from '../../src/api/schemas/userSchema';
import { validateSchema } from '../../src/utils/schemaValidator';

test.describe('GET /users/{id}', () => {
  test('user matches the user contract', { tag: '@smoke' }, async ({ usersApi }) => {
    const { status, body } = await usersApi.getUser(apiData.existingUserId);

    expect(status).toBe(200);
    expect(validateSchema(userSchema, body)).toEqual([]);
    expect(body.id).toBe(apiData.existingUserId);
  });

  test('unknown user returns 404', { tag: '@regression' }, async ({ usersApi }) => {
    const { status } = await usersApi.getUser(apiData.unknownUserId);

    expect(status).toBe(404);
  });

  test('schema rejects a response that breaks the contract', { tag: '@regression' }, async ({ usersApi }) => {
    const { body } = await usersApi.getUser(apiData.existingUserId);
    const broken = { ...body, email: 'not-an-email', id: undefined };

    expect(validateSchema(userSchema, broken)).not.toEqual([]);
  });
});
