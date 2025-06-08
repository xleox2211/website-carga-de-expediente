// components/protectedRout.jsx
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../userContext';
import { userIsAdmin } from '../../UserManage';

interface ProtectedRouteProps {
    children?: React.ReactNode;
    redirectPath?: string;
}

import React, { useEffect, useState } from 'react';

const ProtectedAdminRoute = ({ children, redirectPath = '/' }: ProtectedRouteProps) => {
  const { isAuthenticated, user } = useAuth();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && user.CI) {
      userIsAdmin(user.CI)
        .then(admin => {
          setIsAdmin(admin);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error checking admin status:', error);
          setIsAdmin(false);
          setLoading(false);
        });
    } else {
      setIsAdmin(false);
      setLoading(false);
    }
  }, [user]);

  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }
  if (!user || !user.CI) {
    return <Navigate to={redirectPath} replace />;
  }
  if (loading) {
    return null; // or a loading spinner
  }
  if (!isAdmin) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedAdminRoute;