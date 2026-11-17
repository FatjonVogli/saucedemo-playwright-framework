import { BaseApi } from '../base/BaseApi';
import { ApiResult, NewPost, Post } from './models';

export class PostsApi extends BaseApi {
  private readonly path = '/posts';

  async createPost(post: NewPost): Promise<ApiResult<Post>> {
    const response = await this.post(this.path, post);
    return { status: response.status(), body: await response.json() };
  }

  async getPost(id: number): Promise<ApiResult<Post>> {
    const response = await this.get(`${this.path}/${id}`);
    return { status: response.status(), body: await response.json() };
  }
}
