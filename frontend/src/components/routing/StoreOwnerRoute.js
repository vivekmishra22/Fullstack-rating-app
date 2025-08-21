import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from '../../context/auth.context';

const StoreOwnerRoute = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  return user && user.role === 'store_owner' ? <Outlet /> : <Navigate to="/" />;
};

export default StoreOwnerRoute;