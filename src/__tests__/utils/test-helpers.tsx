import { waitFor } from '@testing-library/react';

/**
 * Wait for async operations to complete
 */
export const waitForLoadingToFinish = () =>
  waitFor(
    () => {
      const loadingElements = [
        ...document.querySelectorAll('[aria-busy="true"]'),
        ...document.querySelectorAll('[data-testid="loading"]'),
      ];
      expect(loadingElements).toHaveLength(0);
    },
    { timeout: 3000 }
  );

/**
 * Create mock file for file upload tests
 */
export const createMockFile = (
  name = 'test.png',
  size = 1024,
  type = 'image/png'
): File => {
  const file = new File(['(⌐□_□)'], name, { type });
  Object.defineProperty(file, 'size', { value: size });
  return file;
};

/**
 * Mock promise that resolves after delay
 */
export const delay = (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms));

/**
 * Generate mock pagination data
 */
export const generatePaginatedData = (
  items: T[],
  page = 1,
  pageSize = 10
) => ({
  data: items.slice((page - 1) * pageSize, page * pageSize),
  total: items.length,
  page,
  pageSize,
  totalPages: Math.ceil(items.length / pageSize),
});