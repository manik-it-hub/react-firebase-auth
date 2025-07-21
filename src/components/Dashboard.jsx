// src/components/Dashboard.jsx
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { logout } from '../firebase';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import styles from './Dashboard.module.css'; // Import dashboard styles

function Dashboard() {
  const { currentUser } = useAuth();
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogout = async () => {
    setError('');
    try {
      await logout();
      alert("Logged out successfully!");
      navigate('/login');
    } catch (err) {
      setError(err.message);
    }
  };

  // Function to get initials for avatar
  const getInitials = (email, displayName) => {
    if (displayName) {
      const parts = displayName.split(' ');
      if (parts.length > 1) {
        return (parts[0][0] + parts[1][0]).toUpperCase();
      }
      return parts[0][0].toUpperCase();
    }
    if (email) {
      return email[0].toUpperCase();
    }
    return '?'; // Fallback
  };

  return (
    <div className={styles.dashboardContainer}>
      <h2 className={styles.heading}>Welcome to Your Dashboard!</h2>
      {error && (
        <div className={`${styles.alert} ${styles.error}`}>
          <span className={styles.alertIcon}>&#9888;</span>
          {error}
        </div>
      )}
      {currentUser ? (
        <>
          {currentUser.photoURL ? (
            <img src={currentUser.photoURL} alt="User Avatar" className={styles.avatar} />
          ) : (
            <div className={styles.avatar}>
              {getInitials(currentUser.email, currentUser.displayName)}
            </div>
          )}

          <p className={styles.userInfo}>
            You are logged in as{' '}
            <span className={styles.userEmailBadge}>
              {currentUser.email || currentUser.displayName || 'Guest'}
            </span>
          </p>
          <p className={styles.userIdText}>
            Your User ID: {currentUser.uid}
          </p>
          <button onClick={handleLogout} className={styles.logoutButton}>
            Log Out
          </button>
        </>
      ) : (
        <p className={styles.loginPrompt}>
          You need to be logged in to see this content. Please{' '}
          <RouterLink to="/login" className={styles.loginPromptLink}>
            log in
          </RouterLink>.
        </p>
      )}
    </div>
  );
}

export default Dashboard;