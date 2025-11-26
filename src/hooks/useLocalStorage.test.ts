import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { useLocalStorage } from './useLocalStorage';


describe('useLocalStorage Hook', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should initialize with initial value', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial-value'));
    
    const [value] = result.current;
    expect(value).toBe('initial-value');
  });

  it('should save value to localStorage', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', ''));
    
    const [, setValue] = result.current;
    
    act(() => {
      setValue('new-value');
    });
      // Wait for localStorage to update
      return waitFor(() => {
        expect(localStorage.getItem('test-key')).toBe(JSON.stringify('new-value'));
      });
  });

  it('should retrieve value from localStorage', () => {
    localStorage.setItem('test-key', JSON.stringify('stored-value'));
    
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));
    
    const [value] = result.current;
      expect(value).toBe('stored-value'); // This should work, but add waitFor for safety
      return waitFor(() => {
        expect(result.current[0]).toBe('stored-value');
      });
  });

  it('should remove value from localStorage', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));
    
    const [, setValue, removeValue] = result.current;
    
    act(() => {
      setValue('temp-value');
    });
      // Wait for localStorage to update
      return waitFor(() => {
        expect(localStorage.getItem('test-key')).toBe(JSON.stringify('temp-value'));
      }).then(() => {
        act(() => {
          removeValue();
        });
        return waitFor(() => {
          expect(localStorage.getItem('test-key')).toBeNull();
        });
      });
  });

  it('should handle complex objects', () => {
    const complexObject = { name: 'Test', count: 42, nested: { value: true } };
    const { result } = renderHook(() => useLocalStorage('test-object', complexObject));
    
    const [value] = result.current;
    expect(value).toEqual(complexObject);
  });

  it('should handle arrays', () => {
    const testArray = [1, 2, 3, 4, 5];
    const { result } = renderHook(() => useLocalStorage('test-array', testArray));
    
    const [, setValue] = result.current;
    
    act(() => {
      setValue([...testArray, 6]);
    });
      // Wait for localStorage to update
      return waitFor(() => {
        const stored = JSON.parse(localStorage.getItem('test-array') || '[]');
        expect(stored).toEqual([1, 2, 3, 4, 5, 6]);
      });
  });
});
