import { type ReactElement, type ReactNode } from 'react';
import { render, type RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConfigProvider } from 'antd';
import { configureStore, PreloadedState } from '@reduxjs/toolkit';
import { persistedReducer } from '../../store/store';
import type { RootState, AppStore } from '../../store/store';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
  queryClient?: QueryClient;
  route?: string;
}

function Wrapper({ children, store, queryClient }: Readonly<{ children: ReactNode; store: AppStore; queryClient: QueryClient }>) {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <ConfigProvider>
            {children}
          </ConfigProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </Provider>
  );
}

export function renderWithProviders(
  ui: ReactElement,
  {
    preloadedState = {},
    store = configureStore({
      reducer: persistedReducer,
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
  globalThis.history.pushState({}, 'Test page', route);
  return {
    store,
    queryClient,
    ...render(ui, { wrapper: (props) => <Wrapper store={store} queryClient={queryClient}>{props.children}</Wrapper>, ...renderOptions }),
  };
}

// Re-export everything from React Testing Library
export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';