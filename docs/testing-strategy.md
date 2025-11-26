# Complete Vitest Testing Strategy for Disprz

## Table of Contents
1. [Installation & Setup](#installation--setup)
2. [Project Structure](#project-structure)
3. [Configuration Files](#configuration-files)
4. [Testing Utilities](#testing-utilities)
5. [Testing Patterns](#testing-patterns)
6. [Best Practices](#best-practices)
7. [CI/CD Integration](#cicd-integration)

---

## 1. Installation & Setup

### Step 1.1: Install Testing Dependencies

```bash
npm install -D vitest @vitest/ui @vitest/coverage-v8 jsdom
npm install -D @testing-library/react @testing-library/jest-dom @testing-library/user-event
npm install -D @types/testing-library__jest-dom
```

### Step 1.2: Update package.json Scripts

```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:run": "vitest run",
    "test:coverage": "vitest run --coverage",
    "test:watch": "vitest --watch",
    "test:ci": "vitest run --coverage --reporter=json --reporter=html"
  }
}
```

---

## 2. Project Structure

```
src/
├── __tests__/                    # Global test utilities and setup
│   ├── setup.ts                  # Test setup file
│   ├── utils/
│   │   └── test-utils.tsx        # Custom render functions
│
│
├── components/
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.test.tsx       # Component tests
│   │   ├── Button.stories.tsx    # Storybook stories
│   │   └── index.ts
│   │
│   └── Form/
│       ├── LoginForm.tsx
│       ├── LoginForm.test.tsx
│       └── LoginForm.integration.test.tsx  # Integration tests
│
├── hooks/
│   ├── useAuth.ts
│   └── useAuth.test.ts           # Hook tests
│
├── store/
│   ├── slices/
│   │   ├── authSlice.ts
│   │   └── authSlice.test.ts     # Redux slice tests
│   └── store.test.ts
│
├── utils/
│   ├── validation.ts
│   └── validation.test.ts        # Utility tests
│
└── pages/
    ├── Dashboard/
    │   ├── Dashboard.tsx
    │   └── Dashboard.test.tsx    # Page-level tests
```

---

## 3. Configuration Files

### vitest.config.ts

```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/__tests__/setup.ts'],
    css: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      exclude: [
        'node_modules/',
        'src/__tests__/',
        '**/*.d.ts',
        '**/*.config.*',
        '**/*.stories.tsx',
        'src/main.tsx',
        'dist/',
      ],
      thresholds: {
        branches: 70,
        functions: 70,
        lines: 70,
        statements: 70,
      },
    },
    include: ['**/*.{test,spec}.{ts,tsx}'],
    exclude: ['node_modules', 'dist', '.idea', '.git', '.cache'],
    testTimeout: 10000,
    hookTimeout: 10000,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@store': path.resolve(__dirname, './src/store'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@services': path.resolve(__dirname, './src/services'),
    },
  },
});
```

### src/__tests__/setup.ts

```typescript
import { expect, afterEach, beforeAll, afterAll } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

// Extend Vitest matchers with jest-dom
expect.extend(matchers);

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  takeRecords() {
    return [];
  }
  unobserve() {}
} as any;

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
global.localStorage = localStorageMock as any;

// Suppress console errors in tests (optional)
const originalError = console.error;
beforeAll(() => {
  console.error = (...args: any[]) => {
    if (
      typeof args[0] === 'string' &&
      (args[0].includes('Warning: ReactDOM.render') ||
        args[0].includes('Not implemented: HTMLFormElement.prototype.submit'))
    ) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});
```

---

## 4. Testing Utilities

### src/__tests__/utils/test-utils.tsx

```typescript
import { ReactElement, ReactNode } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConfigProvider } from 'antd';
import { configureStore, PreloadedState } from '@reduxjs/toolkit';
import { RootState, AppStore } from '@/store/store';
import rootReducer from '@/store/rootReducer';

// Create a custom render function
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
  queryClient?: QueryClient;
  route?: string;
}

export function renderWithProviders(
  ui: ReactElement,
  {
    preloadedState = {},
    store = configureStore({
      reducer: rootReducer,
      preloadedState,
    }),
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
          gcTime: 0,
        },
        mutations: {
          retry: false,
        },
      },
    }),
    route = '/',
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  window.history.pushState({}, 'Test page', route);

  function Wrapper({ children }: { children: ReactNode }) {
    return (
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <ConfigProvider>{children}</ConfigProvider>
          </BrowserRouter>
        </QueryClientProvider>
      </Provider>
    );
  }

  return {
    store,
    queryClient,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
}

// Re-export everything from React Testing Library
export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';
```



---

## 5. Testing Patterns

### 5.1 Component Testing

#### Button.test.tsx
```typescript
import { describe, it, expect, vi } from 'vitest';
import { render, screen, userEvent } from '@/__tests__/utils/test-utils';
import { Button } from './Button';

describe('Button Component', () => {
  it('renders with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('handles click events', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    
    render(<Button onClick={handleClick}>Click me</Button>);
    
    await user.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('applies correct variant styles', () => {
    const { rerender } = render(<Button variant="primary">Primary</Button>);
    expect(screen.getByRole('button')).toHaveClass('btn-primary');
    
    rerender(<Button variant="secondary">Secondary</Button>);
    expect(screen.getByRole('button')).toHaveClass('btn-secondary');
  });
});
```

### 5.2 Form Testing with React Hook Form

#### LoginForm.test.tsx
```typescript
import { describe, it, expect, vi } from 'vitest';
import { renderWithProviders, screen, userEvent, waitFor } from '@/__tests__/utils/test-utils';
import { LoginForm } from './LoginForm';

describe('LoginForm', () => {
  it('validates email field', async () => {
    const user = userEvent.setup();
    renderWithProviders(<LoginForm />);
    
    const emailInput = screen.getByLabelText(/email/i);
    await user.type(emailInput, 'invalid-email');
    await user.tab();
    
    await waitFor(() => {
      expect(screen.getByText(/invalid email/i)).toBeInTheDocument();
    });
  });

  it('submits form with valid data', async () => {
    const handleSubmit = vi.fn();
    const user = userEvent.setup();
    
    renderWithProviders(<LoginForm onSubmit={handleSubmit} />);
    
    await user.type(screen.getByLabelText(/email/i), 'test@example.com');
    await user.type(screen.getByLabelText(/password/i), 'password123');
    await user.click(screen.getByRole('button', { name: /login/i }));
    
    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });
    });
  });

  it('shows loading state during submission', async () => {
    const user = userEvent.setup();
    renderWithProviders(<LoginForm />);
    
    await user.type(screen.getByLabelText(/email/i), 'test@example.com');
    await user.type(screen.getByLabelText(/password/i), 'password123');
    await user.click(screen.getByRole('button', { name: /login/i }));
    
    expect(screen.getByRole('button')).toBeDisabled();
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });
});
```

### 5.3 Custom Hook Testing

#### useAuth.test.ts
```typescript
import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useAuth } from './useAuth';
import { mockUser } from '@/__tests__/utils/mock-data';

describe('useAuth Hook', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('initializes with unauthenticated state', () => {
    const { result } = renderHook(() => useAuth());
    
    expect(result.current.user).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
  });

  it('logs in user successfully', async () => {
    const { result } = renderHook(() => useAuth());
    
    await waitFor(() => {
      result.current.login('test@example.com', 'password123');
    });
    
    await waitFor(() => {
      expect(result.current.isAuthenticated).toBe(true);
      expect(result.current.user).toEqual(mockUser);
    });
  });

  it('logs out user', async () => {
    const { result } = renderHook(() => useAuth());
    
    await waitFor(() => {
      result.current.login('test@example.com', 'password123');
    });
    
    await waitFor(() => {
      result.current.logout();
    });
    
    expect(result.current.user).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
  });
});
```

### 5.4 Redux Slice Testing

#### authSlice.test.ts
```typescript
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
```



---

## 6. Best Practices

### 6.1 Testing Pyramid

- **70% Unit Tests**: Individual components, hooks, utilities
- **20% Integration Tests**: Component interactions, forms, user flows
- **10% E2E Tests**: Critical user journeys (use Playwright/Cypress)

### 6.2 What to Test

✅ **DO TEST:**
- User interactions (clicks, typing, form submissions)
- Conditional rendering
- Error states and edge cases
- Accessibility (ARIA labels, keyboard navigation)
- API integration with mocked responses
- Redux state changes
- Custom hook behavior
- Form validation

❌ **DON'T TEST:**
- Implementation details (internal state, component methods)
- Third-party library internals (Ant Design, React Router)
- Styling (use visual regression tools instead)
- Trivial code (getters/setters)

### 6.3 Naming Conventions

```typescript
// File naming
ComponentName.test.tsx       // Unit tests
ComponentName.integration.test.tsx  // Integration tests
useHookName.test.ts          // Hook tests

// Test naming
describe('ComponentName', () => {
  it('renders correctly', () => {});
  it('handles user interaction', () => {});
  it('shows error state when API fails', () => {});
});
```

### 6.4 AAA Pattern

```typescript
it('updates cart when item is added', async () => {
  // Arrange
  const user = userEvent.setup();
  renderWithProviders(<ProductCard product={mockProduct} />);
  
  // Act
  await user.click(screen.getByRole('button', { name: /add to cart/i }));
  
  // Assert
  expect(screen.getByText(/item added/i)).toBeInTheDocument();
});
```

### 6.5 Accessibility Testing

```typescript
import { axe, toHaveNoViolations } from 'jest-axe';
expect.extend(toHaveNoViolations);

it('has no accessibility violations', async () => {
  const { container } = render(<Button>Click me</Button>);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

---

## 7. CI/CD Integration

### GitHub Actions (.github/workflows/test.yml)

```yaml
name: Tests

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run linter
        run: npm run lint
      
      - name: Run tests
        run: npm run test:ci
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/lcov.info
          flags: unittests
          name: codecov-umbrella
      
      - name: Comment PR with coverage
        if: github.event_name == 'pull_request'
        uses: romeovs/lcov-reporter-action@v0.3.1
        with:
          lcov-file: ./coverage/lcov.info
          github-token: ${{ secrets.GITHUB_TOKEN }}
```

### Pre-commit Hook (with Husky)

```bash
# .husky/pre-commit
npm run lint:fix
npm run test:run
```

---

## Quick Start Checklist

- [ ] Install all testing dependencies
- [ ] Create vitest.config.ts
- [ ] Set up test utilities and mock handlers
- [ ] Write first component test
- [ ] Configure CI/CD pipeline
- [ ] Set coverage thresholds
- [ ] Document team testing standards

---

## Coverage Goals

| Metric | Target | Critical |
|--------|--------|----------|
| Statements | 70% | 80% |
| Branches | 70% | 75% |
| Functions | 70% | 75% |
| Lines | 70% | 80% |

Critical paths (auth, payments, data submission) should maintain 80%+ coverage.