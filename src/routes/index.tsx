import type { RouteObject } from 'react-router-dom';
import Home from '../views/Home';
import About from '../views/About';
import Contact from '../views/Contact';
import Users from '../views/Users';
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
    path: '/contact',
    element: <Contact />,
  },
  {
    path: '/users',
    element: <Users />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
];
