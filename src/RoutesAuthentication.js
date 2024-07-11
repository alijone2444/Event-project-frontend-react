import React from 'react';
import { Navigate } from 'react-router-dom';

// Function for general authentication
export const RequireAuth = ({ children }) => {
  const authToken = localStorage.getItem('authToken');
  if (!authToken) {
    // Redirect to the login page if not authenticated
    return <Navigate to="/" />;
  }
  return children;
};

// Function for admin authentication
export const RequireAdminAuth = ({ children }) => {
  const authToken = localStorage.getItem('authToken');
  const userType = localStorage.getItem('userType');

  if (!authToken || userType !== 'admin') {
    // Redirect to the login page if not authenticated or not admin
    return <Navigate to="/admin" />;
  }

  return children;
};
