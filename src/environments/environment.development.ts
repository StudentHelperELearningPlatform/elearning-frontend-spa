import { Environment } from './environment';

export const environment: Environment = {
  production: false,
  useMocks: true,       // MSW intercepts all /api/* calls in dev
  apiBaseUrl: '/api',
};
