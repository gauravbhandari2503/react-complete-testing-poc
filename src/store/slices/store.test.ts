import { describe, it, expect } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from '../store';

describe('Store', () => {
  it('should create a store with root reducer', () => {
    const store = configureStore({
      reducer: rootReducer,
    });
    expect(store.getState()).toBeDefined();
  });
});
