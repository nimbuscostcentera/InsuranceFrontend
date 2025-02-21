import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate,Outlet } from 'react-router-dom';
import PrivateLayout from './PrivateLayout';
function ProtectedRoute() {
  const { userInfo } = useSelector((state) => state.auth);
  const authtoken = userInfo?.data?.token;
  console.log(authtoken)
  return authtoken ? <PrivateLayout/> : <Navigate to="/" />;
}

export default ProtectedRoute;