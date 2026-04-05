export type UserRole = 'STUDENT' | 'TEACHER' | 'ADMIN';

export interface User {
  id: string;
  email: string;
  name: string;
  roles: string[];
  avatar?: string;
}

export interface AuthResult {
  user: User;
  token: string;
}

export interface LoginCredentials {
  email: string;
  password?: string;
}
