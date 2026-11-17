import { APIRequestContext, APIResponse } from '@playwright/test';

type Body = Record<string, unknown> | unknown[];

export abstract class BaseApi {
  constructor(protected readonly request: APIRequestContext) {}

  protected get(url: string): Promise<APIResponse> {
    return this.request.get(url);
  }

  protected post(url: string, data: Body): Promise<APIResponse> {
    return this.request.post(url, { data });
  }
}
