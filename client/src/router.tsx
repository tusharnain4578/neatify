import DashboardLayout from './components/layouts/DashboardLayout/Master';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import Login from './pages/authentication/login';
import Register from './pages/authentication/register';
import Auth from './components/middlewares/Auth';
import Guest from './components/middlewares/Guest';
import Team from './pages/team';
import Projects from './pages/projects';
import Project from './pages/project';
import Dashboard from './pages/dashboard';

const guestRoutes = [
  { path: '/', element: <Navigate to="/login" replace /> },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
];

const protectedRoutes = [
  { path: '', element: <Dashboard /> },
  { path: 'project/:id', element: <Project /> },
  { path: 'projects', element: <Projects /> },
  { path: 'team', element: <Team /> },
];

const router = createBrowserRouter(
  [
    { element: <Guest />, children: guestRoutes },
    {
      element: <Auth />,
      children: [
        {
          path: '/dashboard',
          element: <DashboardLayout />,
          children: protectedRoutes,
        },
      ],
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);

export default router;
