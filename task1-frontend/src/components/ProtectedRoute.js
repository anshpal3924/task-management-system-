import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <h2>Loading...</h2>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (requiredRole) {
    if (requiredRole === 'admin' && user.role !== 'admin') {
      return (
        <div className="auth-container">
          <div className="auth-card">
            <div className="alert alert-error">
              Access Denied: Admin role required
            </div>
          </div>
        </div>
      );
    }
    if (requiredRole === 'moderator' && user.role !== 'moderator' && user.role !== 'admin') {
      return (
        <div className="auth-container">
          <div className="auth-card">
            <div className="alert alert-error">
              Access Denied: Moderator or Admin role required
            </div>
          </div>
        </div>
      );
    }
  }

  return children;
};

export default ProtectedRoute;
