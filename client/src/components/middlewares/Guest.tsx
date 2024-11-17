import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Navigate, Outlet } from 'react-router-dom';

const Guest: React.FC = (): ReactElement => {
  const user = useSelector((state: RootState) => state.auth?.user);
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default Guest;
