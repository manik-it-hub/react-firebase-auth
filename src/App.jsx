// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import { useAuth } from './contexts/AuthContext';
import styles from './App.module.css'; // Create App.module.css if needed for global layout like spinner
// For a full page spinner, you could add:
// .loadingPage { min-height: 100vh; display: flex; align-items: center; justify-content: center; background-color: var(--light-gray); }
// .spinner { /* basic spinner styles if you don't use an icon library */ }

function App() {
  const { currentUser, loading } = useAuth();

  // Basic global spinner (you'd need to style this in App.module.css or index.css)
  if (loading) {
    return (
      <div className={styles.loadingPage || 'loading-page'}>
        <div className={styles.spinner || 'spinner'}></div> {/* Replace with actual spinner HTML/CSS */}
        <p>Loading user data...</p>
      </div>
    );
  }

  return (
    <Router>
      <Navbar />
      <div className={styles.contentWrapper || 'content-wrapper'}> {/* A simple wrapper for content */}
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/"
            element={currentUser ? <Navigate to="/dashboard" /> : <Login />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;