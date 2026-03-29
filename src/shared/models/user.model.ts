export type UserRole = 'STUDENT' | 'TEACHER' | 'PARENT' | 'ADMIN';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

export interface AuthResult {
  user: User;
  accessToken: string;
  refreshToken: string;
}
