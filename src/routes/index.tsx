import type { RouteObject } from 'react-router-dom';
import Home from '../views/Home';
import About from '../views/About';
import NotFound from '../views/NotFound';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/about',
    element: <About />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
];
