import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate(); // Use navigate for redirection

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  const handleSignInSubmit = (event) => {
    event.preventDefault();
    navigate('/dashboard');  // Redirect to dashboard after successful login
  };

  const handleSignUpSubmit = (event) => {
    event.preventDefault();
    // Handle sign-up logic here
    navigate('/dashboard');  // Redirect to dashboard after successful signup
  };

  return (
    <div className="login-container">
      {isSignUp ? (
        <div className="login-form">
          <h2>Sign Up</h2>
          <form onSubmit={handleSignUpSubmit}>
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input type="text" id="fullName" name="fullName" placeholder="Name" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" name="email" placeholder="Email" required />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" placeholder="Password" required />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm Password" required />
            </div>
            <button type="submit">Sign Up</button>
          </form>
          <p>
            Already have an account?{' '}
            <button onClick={toggleForm} className="toggle-button">Sign In</button>
          </p>
        </div>
      ) : (
        <div className="login-form">
          <h2>Sign In</h2>
          <p>Fill in your email and password to proceed further</p>
          <form onSubmit={handleSignInSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" placeholder="Your email address" required />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" placeholder="Your password" required />
            </div>
            <p className="forgot-password">
              <a href="/forgot-password">Forgot Password?</a>
            </p>
            <button type="submit">Sign In</button>
          </form>
          <p>
            Don't have an account?{' '}
            <button onClick={toggleForm} className="toggle-button">Sign Up</button>
          </p>
        </div>
      )}
      <div className="login-illustration">
        <img src="/UNDRAW~1.PNG" alt="Login Illustration" />
      </div>
    </div>
  );
}

export default LoginPage;
