import { User } from '@/types';

export const mockUser: User = {
  id: '1',
  email: 'test@example.com',
  name: 'Test User',
  role: 'learner',
  avatar: 'https://via.placeholder.com/150',
};

export const mockAuthState = {
  user: mockUser,
  token: 'mock-jwt-token',
  isAuthenticated: true,
  loading: false,
  error: null,
};

export const mockCourse = {
  id: '1',
  title: 'React Testing Fundamentals',
  description: 'Learn testing in React',
  instructor: 'John Doe',
  duration: 120,
  enrolledUsers: 50,
};

export const mockCourses = Array.from({ length: 20 }, (_, i) => ({
  ...mockCourse,
  id: `${i + 1}`,
  title: `Course ${i + 1}`,
}));