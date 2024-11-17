import React, { ReactElement, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../../hooks/auth/useAuth';

const Auth: React.FC = (): ReactElement => {
  const user = useSelector((state: RootState) => state.auth?.user);

  const { validate } = useAuth();

  useEffect(() => {
    validate();
  }, []);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default Auth;
