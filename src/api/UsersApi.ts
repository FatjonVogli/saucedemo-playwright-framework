import { BaseApi } from '../base/BaseApi';
import { ApiResult, User } from './models';

export class UsersApi extends BaseApi {
  private readonly path = '/users';

  async getUser(id: number): Promise<ApiResult<User>> {
    const response = await this.get(`${this.path}/${id}`);
    return { status: response.status(), body: await response.json() };
  }
}
