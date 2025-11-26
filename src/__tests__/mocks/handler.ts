import { http, HttpResponse } from 'msw';
import { mockUser, mockCourses } from '../utils/mock-data';

export const handlers = [
  // Auth endpoints
  http.post('/api/auth/login', async ({ request }) => {
    const { email, password } = await request.json();
    
    if (email === 'test@example.com' && password === 'password123') {
      return HttpResponse.json({
        user: mockUser,
        token: 'mock-jwt-token',
      });
    }
    
    return HttpResponse.json(
      { message: 'Invalid credentials' },
      { status: 401 }
    );
  }),

  // Courses endpoints
  http.get('/api/courses', () => {
    return HttpResponse.json({
      data: mockCourses,
      total: mockCourses.length,
    });
  }),

  http.get('/api/courses/:id', ({ params }) => {
    const course = mockCourses.find(c => c.id === params.id);
    if (!course) {
      return HttpResponse.json(
        { message: 'Course not found' },
        { status: 404 }
      );
    }
    return HttpResponse.json(course);
  }),
];