import React from 'react';
import {  Navigate } from 'react-router-dom';

const rolesPermissions = {
  0: 'admin',
  1: 'editeur',
  2: 'viewer'
};

const ProtectedRoute = ({ allowedRoles,children }) => {
  const user =  JSON.parse(sessionStorage.getItem('user'))

  const isAuthenticated = !!user;
  const userRole = rolesPermissions[user?.role];

  const isAuthorized = isAuthenticated && allowedRoles.includes(userRole);


  if (!isAuthorized) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
