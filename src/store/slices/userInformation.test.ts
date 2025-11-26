import { describe, it, expect } from 'vitest';
import authReducer, { login, logout, setUser } from './authSlice';
import { mockUser, mockAuthState } from '@/__tests__/utils/mock-data';

describe('Auth Slice', () => {
  it('should handle initial state', () => {
    expect(authReducer(undefined, { type: 'unknown' })).toEqual({
      user: null,
      token: null,
      isAuthenticated: false,
      loading: false,
      error: null,
    });
  });

  it('should handle login', () => {
    const actual = authReducer(undefined, login({ user: mockUser, token: 'token' }));
    expect(actual.user).toEqual(mockUser);
    expect(actual.isAuthenticated).toBe(true);
  });

  it('should handle logout', () => {
    const actual = authReducer(mockAuthState, logout());
    expect(actual.user).toBeNull();
    expect(actual.isAuthenticated).toBe(false);
  });
});