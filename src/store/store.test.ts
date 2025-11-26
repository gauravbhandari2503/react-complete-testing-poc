import { describe, it, expect } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import userInformationReducer from './slices/userInformation';

describe('Redux Store Configuration', () => {
  it('should create store with userInformation reducer', () => {
    const store = configureStore({
      reducer: {
        userInformation: userInformationReducer,
      },
    });

    const state = store.getState();
    expect(state.userInformation).toBeDefined();
    expect(state.userInformation.contacts).toEqual([]);
    expect(state.userInformation.loading).toBe(false);
    expect(state.userInformation.error).toBeNull();
  });

  it('should handle state updates correctly', async () => {
    const store = configureStore({
      reducer: {
        userInformation: userInformationReducer,
      },
    });

    // Dispatch an action
    const { addContact } = await import('./slices/userInformation');
    store.dispatch(addContact({
      name: 'Test User',
      email: 'test@example.com',
      phone: '1234567890',
      message: 'Test message',
    }));

    const state = store.getState();
    expect(state.userInformation.contacts).toHaveLength(1);
    expect(state.userInformation.contacts[0].name).toBe('Test User');
  });
});
