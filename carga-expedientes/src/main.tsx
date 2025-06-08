import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AuthProvider } from './userContext';
import './index.css';
import LoginPage from './pages/PageLogin';
import ProtectedRoute from './components/protectedRoutes/protectedRout';
import ProtectedAdminRoute from './components/protectedRoutes/protectedAdminRout';
import DashboardPage from './pages/PageDashboard';
import UserManagePage from './pages/PageUserManage';
import { createBrowserRouter, RouterProvider } from "react-router-dom";


const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardPage />
      </ProtectedRoute>
    )
  },
  {
    path: "/admin",
    element: (
      <ProtectedAdminRoute>
        <UserManagePage />
      </ProtectedAdminRoute>
    )
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
);