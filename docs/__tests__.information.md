# Test Setup and Utilities Documentation

This document explains the purpose and usage of the global test setup and utility files in the project.

## 1. Global Test Setup (`src/__tests__/setup.ts`)

This file is automatically run before each test file. It configures the testing environment, mocks global browser APIs that are not available in the Node.js-based test runner (Vitest/JSDOM), and extends Vitest's assertions.

### Key Features:

- **Extends Matchers:** Imports `@testing-library/jest-dom/matchers` to add DOM-specific assertions like `.toBeInTheDocument()`, `.toHaveClass()`, etc.
- **Mocks Browser APIs:**
    - `window.matchMedia`: Required by many UI libraries (like Ant Design) for responsive design logic.
    - `IntersectionObserver`: Used for lazy loading and infinite scrolling components.
    - `ResizeObserver`: Used by components that respond to element size changes.
- **Console Error Suppression:** Suppresses specific, noisy console warnings (like ReactDOM warnings) to keep test output clean.

### Example Usage:

You don't need to import this file manually. It is configured in `vitest.config.ts` to run automatically.

```typescript
// In your test file
import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';

test('example', () => {
  render(<div className="foo">Hello</div>);
  
  // This assertion works because of setup.ts
  expect(screen.getByText('Hello')).toHaveClass('foo'); 
});
```

---

## 2. Test Utilities (`src/__tests__/utils/test-utils.tsx`)

This file provides a custom render function `renderWithProviders` that wraps your components with all the necessary global providers (Redux, Router, React Query, Ant Design) required for them to function correctly in tests.

### Key Features:

- **`renderWithProviders`:** A wrapper around React Testing Library's `render`.
    - **Redux Provider:** Creates a real Redux store for each test, allowing you to pass an initial state (`preloadedState`).
    - **Router:** Wraps components in `BrowserRouter`. You can set the initial route via the `route` option.
    - **React Query:** Provides a `QueryClient` with retry disabled (for faster failure in tests).
    - **Ant Design ConfigProvider:** Ensures Ant Design components render correctly.
- **Re-exports:** Re-exports everything from `@testing-library/react` and `userEvent`, so you can import everything from one place.

### Example Usage:

**Basic Component Render:**

```tsx
import { renderWithProviders, screen } from '@/__tests__/utils/test-utils';
import MyComponent from './MyComponent';

test('renders correctly', () => {
  renderWithProviders(<MyComponent />);
  expect(screen.getByText('Content')).toBeInTheDocument();
});
```

**Testing with Redux State:**

```tsx
import { renderWithProviders, screen } from '@/__tests__/utils/test-utils';
import UserProfile from './UserProfile';

test('shows user name', () => {
  const preloadedState = {
    userInformation: {
      user: { name: 'John Doe', email: 'john@example.com' },
      isAuthenticated: true
    }
  };

  renderWithProviders(<UserProfile />, { preloadedState });
  expect(screen.getByText('John Doe')).toBeInTheDocument();
});
```

**Testing with Routes:**

```tsx
import { renderWithProviders, screen } from '@/__tests__/utils/test-utils';
import App from './App';

test('navigates to contact page', () => {
  renderWithProviders(<App />, { route: '/contact' });
  expect(screen.getByText('Contact Us')).toBeInTheDocument();
});
```
