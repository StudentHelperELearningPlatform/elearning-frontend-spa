import { http, HttpResponse } from 'msw';

export const authHandlers = [
  http.get('/api/auth/check-email', ({ request }: { request: Request }) => {
    const url = new URL(request.url);
    const email = url.searchParams.get('email');
    return HttpResponse.json({ exists: email === 'student@test.com' });
  }),

  http.post('/api/auth/register', async ({ request }: { request: Request }) => {
    const body = await request.json() as Record<string, string>;
    if (body['email'] === 'student@test.com') {
      return HttpResponse.json(
        { message: 'This email is already registered' }, { status: 409 }
      );
    }
    return HttpResponse.json(
      { message: 'Registration successful' }, { status: 201 }
    );
  }),

  http.post('/api/auth/forgot-password', async ({ request }: { request: Request }) => {
    return HttpResponse.json({ message: 'Reset link sent' });
  }),

  http.post('/api/auth/reset-password', async ({ request }: { request: Request }) => {
    const body = await request.json() as Record<string, string>;
    if (body['token'] === 'invalid') {
      return HttpResponse.json(
        { message: 'Invalid or expired reset link' }, { status: 400 }
      );
    }
    return HttpResponse.json({ message: 'Password reset successful' });
  }),
];
