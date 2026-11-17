import { test, expect } from '../../src/fixtures';
import { apiData } from '../../src/data/testData';
import { dataFactory } from '../../src/utils/dataFactory';

test.describe('POST /posts then GET', () => {
  test('create returns 201 and echoes the post with a new id', { tag: '@smoke' }, async ({ postsApi }) => {
    const newPost = dataFactory.post();

    const { status, body } = await postsApi.createPost(newPost);

    expect(status).toBe(201);
    expect(body).toMatchObject(newPost);
    expect(body.id).toEqual(expect.any(Number));
  });

  test('created post is not persisted by the fake service', { tag: '@regression' }, async ({ postsApi }) => {
    test.info().annotations.push({
      type: 'service-limitation',
      description: 'jsonplaceholder fakes writes: POST returns an id but GET on that id returns 404',
    });
    const created = await postsApi.createPost(dataFactory.post());
    expect(created.status).toBe(201);

    const readBack = await postsApi.getPost(created.body.id);

    expect(readBack.status).toBe(404);
  });

  test('existing post can be read back by id', { tag: '@regression' }, async ({ postsApi }) => {
    const { status, body } = await postsApi.getPost(apiData.existingPostId);

    expect(status).toBe(200);
    expect(body).toMatchObject({ id: apiData.existingPostId, userId: expect.any(Number), title: expect.any(String), body: expect.any(String) });
  });
});
