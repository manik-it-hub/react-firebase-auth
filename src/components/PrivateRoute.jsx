// src/components/PrivateRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import styles from '../App.module.css'; // Use App.module.css for loading spinner

function PrivateRoute({ children }) {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <div className={styles.loadingPage}>
        <div className={styles.spinner}></div>
        <p>Loading content...</p>
      </div>
    );
  }

  return currentUser ? children : <Navigate to="/login" replace />;
}

export default PrivateRoute;