import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { USER_PLATFORM_API_URL } from '@core/tokens/api.token';

@Injectable({ providedIn: 'root' })
export class AdminService {
  private readonly http = inject(HttpClient);
  private readonly apiBase = inject(USER_PLATFORM_API_URL);

  deleteUser(userId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiBase}/admin/users/${userId}`);
  }
}
