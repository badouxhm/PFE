// ProtectedRoute.js
import React from 'react';
import {  Navigate } from 'react-router-dom';

const rolesPermissions = {
  0: 'admin',
  1: 'editeur',
  2: 'viewer'
};

const ProtectedRoute = ({ allowedRoles,children }) => {
  const user =  JSON.parse(sessionStorage.getItem('user'))
    console.log(user)
  // Vérifie si l'utilisateur est authentifié et s'il a le rôle requis
  const isAuthenticated = !!user; // Si l'objet user existe, l'utilisateur est authentifié
  const userRole = rolesPermissions[user?.role];
  console.log(userRole)

  const isAuthorized = isAuthenticated && allowedRoles.includes(userRole);

  // Si l'utilisateur n'est pas authentifié ou n'a pas le rôle requis,
  // redirigez-le vers la page de connexion
  if (!isAuthorized) {
    return <Navigate to="/" />;
  }

  // Renvoie le composant de la route demandée si l'utilisateur est autorisé
  return children;
};

export default ProtectedRoute;
