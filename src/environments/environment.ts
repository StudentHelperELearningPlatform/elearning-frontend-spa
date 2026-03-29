// environment.ts — base (imported by other envs)
export interface Environment {
  production: boolean;
  useMocks: boolean;
  apiBaseUrl: string;
}
