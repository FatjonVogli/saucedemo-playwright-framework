import 'dotenv/config';
import inspector from 'node:inspector';

export const env = {
  baseUrl: process.env.BASE_URL ?? '',
  apiUrl: process.env.API_URL ?? '',
  username: process.env.APP_USERNAME ?? '',
  problemUsername: process.env.PROBLEM_USERNAME ?? '',
  password: process.env.APP_PASSWORD ?? '',
  testIdAttribute: process.env.TEST_ID_ATTRIBUTE ?? 'data-test',
  headless: process.env.HEADLESS !== 'false',
  slowMo: Number(process.env.SLOW_MO ?? 0),
  isCI: !!process.env.CI,
  isDebugging: !!process.env.PWDEBUG || !!inspector.url(),
};
