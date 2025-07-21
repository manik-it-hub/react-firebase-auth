// src/components/Signup.jsx
import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { signup } from '../firebase';
import styles from './AuthForm.module.css'; // Import reusable form styles

// For icons, you can use a simple SVG or Font Awesome (requires installation)
// Example simple eye icon (you'd put this directly or use a helper component)
const EyeIcon = ({ onClick }) => (
  <button type="button" className={styles.passwordToggle} onClick={onClick}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20px" height="20px">
      <path d="M12 4.5c5.01 0 9.32 3.19 11.2 7.5-.95 2.21-2.9 4.09-5.11 5.37-2.21 1.28-4.8 2.01-7.09 2.01-4.22 0-8.08-1.52-11.2-4.5C2.68 11.19 4.99 4.5 12 4.5zm0 2c-3.14 0-5.99 1.76-8.2 4.5C4.01 13.74 6.86 16.5 12 16.5c3.14 0 5.99-1.76 8.2-4.5C19.99 8.26 17.14 5.5 12 6.5zm0 3C9.24 9.5 7 11.74 7 14.5S9.24 19.5 12 19.5c2.76 0 5-2.24 5-5S14.76 9.5 12 9.5z"/>
    </svg>
  </button>
);

const EyeOffIcon = ({ onClick }) => (
  <button type="button" className={styles.passwordToggle} onClick={onClick}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20px" height="20px">
      <path d="M12 7c-2.76 0-5 2.24-5 5 0 .34.05.67.11.99L5.3 15.3l-1.3-1.3C2.68 11.19 4.99 4.5 12 4.5c1.94 0 3.74.52 5.3 1.4L15.3 8.3C13.74 7.52 12 7 12 7zM4.2 14.2l1.4 1.4L1.8 19 3 20.2l3.4-3.4 1.4 1.4L3 21.8 1.8 20.6 4.2 14.2zM21 12c0 2.68-.56 5.27-1.61 7.66l1.32 1.32c1.04-2.39 1.61-4.98 1.61-7.66 0-7.01-4.99-10.5-12-10.5-.83 0-1.63.1-2.4.28L4.85 4.05C6.46 3.3 8.18 2.8 12 2.8c7.01 0 12 6.51 12 11.7zm-7.09 7.99l-1.32-1.32c.3-.06.63-.11.99-.11 2.76 0 5-2.24 5-5s-2.24-5-5-5c-.34 0-.67.05-.99.11L6.3 7.3l-1.3-1.3L.6 10.6l1.2 1.2L4.2 14.2z"/>
    </svg>
  </button>
);


function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signup(email, password);
      alert("Account created successfully!"); // Simple alert for now
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.authContainer}>
      <h2 className={styles.heading}>Create Your Account</h2>
      {error && (
        <div className={`${styles.alert} ${styles.error}`}>
          <span className={styles.alertIcon}>&#9888;</span> {/* Unicode for warning icon */}
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formControl}>
          <label htmlFor="email" className={styles.formLabel}>Email address</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className={styles.input}
          />
        </div>
        <div className={styles.formControl}>
          <label htmlFor="password" className={styles.formLabel}>Password</label>
          <div className={styles.inputGroup}>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimum 6 characters"
              required
              className={styles.input}
            />
            <div className={styles.inputRightElement}>
              {showPassword ? (
                <EyeOffIcon onClick={() => setShowPassword(false)} />
              ) : (
                <EyeIcon onClick={() => setShowPassword(true)} />
              )}
            </div>
          </div>
        </div>
        <button
          type="submit"
          className={styles.mainButton}
          disabled={loading}
        >
          {loading ? 'Signing Up...' : 'Sign Up'}
        </button>
      </form>
      <p className={styles.linkText}>
        Already have an account?{' '}
        <RouterLink to="/login" className={styles.link}>
          Log In
        </RouterLink>
      </p>
    </div>
  );
}

export default Signup;