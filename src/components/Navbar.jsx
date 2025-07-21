// src/components/Navbar.jsx
import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { logout } from '../firebase';
import styles from './Navbar.module.css'; // Import the CSS module

function Navbar() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
      alert('Logged out successfully!'); // Replace with a more sophisticated notification later
    } catch (error) {
      alert('Error logging out: ' + error.message);
      console.error("Failed to log out:", error.message);
    }
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <RouterLink to="/" className={styles.brand}>
          AuthPortal
        </RouterLink>
        <div className={styles.navLinks}>
          {!currentUser && (
            <>
              <RouterLink to="/signup" className={styles.navLink}>
                Sign Up
              </RouterLink>
              <RouterLink to="/login" className={styles.navLink}>
                Login
              </RouterLink>
            </>
          )}
          {currentUser && (
            <>
              <RouterLink to="/dashboard" className={styles.navLink}>
                Dashboard
              </RouterLink>
              <button onClick={handleLogout} className={styles.logoutButton}>
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;