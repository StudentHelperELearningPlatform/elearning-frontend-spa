import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  login(email: string, requestedRole?: string):Observable<{token: string, role: string}> {
    // Mock login
    let role = requestedRole || 'STUDENT';
    if (!requestedRole) {
      if (email.includes('teacher')) role = 'TEACHER';
      if (email.includes('admin')) role = 'ADMIN';
    }
    return of({ token: 'mock-jwt-token', role });
  }

  logout() {
    // Mock logout
  }
}
