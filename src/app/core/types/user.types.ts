export type UserRole = 'STUDENT' | 'TEACHER' | 'ADMIN';

export interface User {
  id: string;
  email: string;
  name: string;
  roles: UserRole[];
  avatarUrl?: string;
}

export interface AuthResult {
  user: User;
  accessToken: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}
