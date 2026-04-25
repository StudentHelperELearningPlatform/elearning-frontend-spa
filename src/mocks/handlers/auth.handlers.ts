import { http, HttpResponse } from 'msw';

export const authHandlers = [
  http.get('/api/auth/check-email', ({ request }) => {
    const url = new URL(request.url);
    const email = url.searchParams.get('email') ?? '';
    if (email === 'student@test.com') {
      return HttpResponse.json({ available: false });
    }
    return HttpResponse.json({ available: true });
  }),

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
];
