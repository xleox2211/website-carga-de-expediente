import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AuthProvider } from './userContext'
import './index.css'
import LoginPage from './pages/PageLogin'
import DashboardPage from './pages/PageDashboard'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/dashboard",
    element: <DashboardPage />,
  }
]);


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
