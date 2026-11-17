import { env } from '../config/env';

export const users = {
  standard: { username: env.username, password: env.password },
  problem: { username: env.problemUsername, password: env.password },
} as const;

export const authFiles = {
  standard: 'playwright/.auth/standard.json',
  problem: 'playwright/.auth/problem.json',
} as const;

export const pageTitles = {
  inventory: 'Products',
} as const;

export const products = {
  backpack: 'Sauce Labs Backpack',
  bikeLight: 'Sauce Labs Bike Light',
} as const;

export const pricing = {
  taxRate: 0.08,
} as const;

export const knownDefects = {
  problemUserCheckout: 'problem_user cannot complete checkout: last name input does not accept text',
} as const;

export const apiData = {
  existingUserId: 1,
  unknownUserId: 9999,
  existingPostId: 1,
} as const;
