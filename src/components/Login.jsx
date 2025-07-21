// src/components/Login.jsx
import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { login, signInWithGoogle } from '../firebase';
import styles from './AuthForm.module.css'; // Import reusable form styles

// Re-using EyeIcon/EyeOffIcon from Signup.jsx (or put them in a common 'icons' folder)
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


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleEmailPasswordLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      alert("Logged in successfully!");
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setLoading(true);
    try {
      await signInWithGoogle();
      alert("Logged in with Google!");
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.authContainer}>
      <h2 className={styles.heading}>Welcome Back!</h2>
      {error && (
        <div className={`${styles.alert} ${styles.error}`}>
          <span className={styles.alertIcon}>&#9888;</span>
          {error}
        </div>
      )}
      <form onSubmit={handleEmailPasswordLogin} className={styles.form}>
        <div className={styles.formControl}>
          <label htmlFor="email" className={styles.formLabel}>Email address</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
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
              placeholder="Your password"
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
          {loading ? 'Logging In...' : 'Log In'}
        </button>
      </form>

      <div className={styles.divider}><span>OR</span></div>

      <button
        onClick={handleGoogleLogin}
        className={styles.googleButton}
        disabled={loading}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="20px" height="20px">
          <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
          <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,2.678,0.56,5.266,1.606,7.662l6.571-4.819C11.758,26.888,11.23,25.43,11.23,24C11.23,21.844,12.012,19.897,13.388,18.397L6.306,14.691z"/>
          <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.571-4.819C29.23,35.117,26.711,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.571,4.819C9.732,39.35,16.291,44,24,44z"/>
          <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.002,0.003-0.003l6.571,4.819C39.268,39.35,40.55,36.54,41.408,33H44V24C44,22.659,43.862,21.35,43.611,20.083z"/>
        </svg>
        Sign In with Google
      </button>
      <p className={styles.linkText}>
        Don't have an account?{' '}
        <RouterLink to="/signup" className={styles.link}>
          Sign Up
        </RouterLink>
      </p>
    </div>
  );
}

export default Login;