import { http, HttpResponse } from 'msw';

export const authHandlers = [
import { http, HttpResponse } from 'msw';

export const authHandlers = [
  // 1. Check Email Handler
  // Merged: Uses the logic from develop (available: boolean) 
  // but keeps the cleaner URL handling from the branch.
  http.get('/api/auth/check-email', ({ request }) => {
    const url = new URL(request.url);
    const email = url.searchParams.get('email');
    
    // We'll use 'available' to match the frontend expectation 
    // of checking if a user CAN use this email.
    const isTaken = email === 'student@test.com';
    return HttpResponse.json({ available: !isTaken });
  }),

  // 2. Register Handler
  http.post('/api/auth/register', async ({ request }) => {
    const body = await request.json() as { email?: string };
    if (body?.email === 'student@test.com') {
      return HttpResponse.json(
        { message: 'Email already registered' },
        { status: 409 }
      );
    }
    return HttpResponse.json(
      { message: 'Registration successful' },
      { status: 201 }
    );
  }),

  // 3. Forgot Password (Restored from Branch)
  http.post('/api/auth/forgot-password', async () => {
    return HttpResponse.json({ message: 'Reset link sent' });
  }),

  // 4. Reset Password (Restored from Branch)
  http.post('/api/auth/reset-password', async ({ request }) => {
    const body = await request.json() as { token?: string };
    if (body?.token === 'invalid') {
      return HttpResponse.json(
        { message: 'Invalid or expired reset link' }, 
        { status: 400 }
      );
    }
    return HttpResponse.json({ message: 'Password reset successful' });
  }),
];
];
