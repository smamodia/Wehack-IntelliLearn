import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesomeIcon
import { faSignInAlt, faUserPlus, faSun, faMoon } from '@fortawesome/free-solid-svg-icons'; // Import icons
import bgVideo from './bg.mp4'; // Import background video

const SignInSignUp = ({ onLogin }) => {
  // State to manage theme (light/dark)
  const [isDarkMode, setIsDarkMode] = useState(true);

  // State to toggle between Sign In and Sign Up
  const [isSignIn, setIsSignIn] = useState(true);

  // State for Sign In form
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // State for Sign Up form
  const [fullName, setFullName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Function to toggle theme
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Theme-based styles
  const themeStyles = {
    backgroundColor: isDarkMode ? '#1e1e1e' : '#f8f9fa',
    textColor: isDarkMode ? '#fff' : '#000',
    cardBackground: isDarkMode ? 'rgba(44, 44, 44, 0.8)' : 'rgba(255, 255, 255, 0.8)', // Add transparency
    cardTextColor: isDarkMode ? '#fff' : '#000',
    inputBackground: isDarkMode ? '#444' : '#ddd',
    inputTextColor: isDarkMode ? '#fff' : '#000',
    buttonBackground: isDarkMode ? '#3CA9D1' : '#3CA9D1',
    buttonTextColor: isDarkMode ? '#fff' : '#000',
    linkColor: isDarkMode ? '#3CA9D1' : '#3CA9D1', // Color for the "Sign In" link
  };

  // Inline styles for the container
  const containerStyle = {
    minHeight: '100vh',
    backgroundColor: themeStyles.backgroundColor,
    color: themeStyles.textColor,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    position: 'relative',
    overflow: 'hidden',
  };

  // Inline styles for the card
  const cardStyle = {
    backgroundColor: themeStyles.cardBackground,
    color: themeStyles.cardTextColor,
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    padding: '20px',
    maxWidth: '500px',
    width: '100%',
    textAlign: 'center',
    position: 'relative',
    zIndex: 1,
    backdropFilter: 'blur(0.5px)', // Add blur effect for better transparency
    transition: '1s ease', // Add transition effect
    animation: isSignIn ? 'fadeInSlideUp 0.5s ease' : 'fadeInSlideUp 0.5s ease', // Animation effect
  };

  // Inline styles for the input fields
  const inputStyle = {
    backgroundColor: themeStyles.inputBackground,
    color: themeStyles.inputTextColor,
    border: 'none',
    borderRadius: '5px',
    padding: '10px',
    margin: '10px 0',
    width: '100%',
  };

  // Inline styles for the button
  const buttonStyle = {
    backgroundColor: themeStyles.buttonBackground,
    color: themeStyles.buttonTextColor,
    border: 'none',
    borderRadius: '5px',
    padding: '10px 20px',
    margin: '10px 0',
    width: '100%',
    cursor: 'pointer',
    transition: 'all 0.3s ease', // Add transition effect
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isSignIn ? '/api/auth/signin' : '/api/auth/signup';
      const body = isSignIn
        ? { email, password }
        : { username: fullName, email: signUpEmail, password: signUpPassword };

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      if (response.ok) {
        if (isSignIn) {
          localStorage.setItem('token', data.token); // Store token
          localStorage.setItem('username', data.username); // Store username
          if (typeof onLogin === 'function') {
            onLogin(); // Call the onLogin function to handle post-login logic
          } else {
            console.error('onLogin is not a function');
          }
        } else {
          alert('User created successfully');
          setIsSignIn(true); // Switch to sign-in form after successful sign-up
        }
      } else {
        alert(data.error || 'Invalid credentials');
      }
    } catch (err) {
      console.error('Error during sign-in/sign-up:', err);
      alert('An error occurred during sign-in/sign-up');
    }
  };

  return (
    <div style={containerStyle}>
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        style={{
          position: 'absolute',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0,
        }}
      >
        <source src={bgVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Day/Night Mode Toggle Icon */}
      <div
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          cursor: 'pointer',
          color: themeStyles.textColor,
          zIndex: 2,
        }}
        onClick={toggleTheme}
      >
        <FontAwesomeIcon
          icon={isDarkMode ? faSun : faMoon} // Show sun icon in dark mode, moon icon in light mode
          size="lg"
        />
      </div>

      {/* Card Container */}
      <div style={cardStyle}>
        {/* Login Symbol */}
        <div style={{ fontSize: '48px', marginBottom: '20px' }}>
          {isSignIn ? (
            <FontAwesomeIcon icon={faSignInAlt} />
          ) : (
            <FontAwesomeIcon icon={faUserPlus} />
          )}
        </div>

        {/* Toggle between Sign In and Sign Up */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '20px' }}>
          <button
            style={{
              ...buttonStyle,
              backgroundColor: isSignIn ? themeStyles.buttonBackground : 'transparent',
              color: isSignIn ? themeStyles.buttonTextColor : themeStyles.textColor,
            }}
            onClick={() => setIsSignIn(true)}
          >
            Sign In
          </button>
          <button
            style={{
              ...buttonStyle,
              backgroundColor: !isSignIn ? themeStyles.buttonBackground : 'transparent',
              color: !isSignIn ? themeStyles.buttonTextColor : themeStyles.textColor,
            }}
            onClick={() => setIsSignIn(false)}
          >
            Sign Up
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {isSignIn ? (
            <>
              <h2>Sign In</h2>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={inputStyle}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={inputStyle}
                required
              />
              <button type="submit" style={buttonStyle}>
                Sign In
              </button>
            </>
          ) : (
            <>
              <h2>Sign Up</h2>
              <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                style={inputStyle}
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={signUpEmail}
                onChange={(e) => setSignUpEmail(e.target.value)}
                style={inputStyle}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={signUpPassword}
                onChange={(e) => setSignUpPassword(e.target.value)}
                style={inputStyle}
                required
              />
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={inputStyle}
                required
              />
              <button type="submit" style={buttonStyle}>
                Sign Up
              </button>
              {/* Switch to Sign In */}
              <p style={{ marginTop: '10px', color: themeStyles.textColor }}>
                You already have an account?{' '}
                <span
                  style={{ color: themeStyles.linkColor, cursor: 'pointer', textDecoration: 'underline' }}
                  onClick={() => setIsSignIn(true)}
                >
                  Sign In
                </span>
              </p>
            </>
          )}
        </form>
      </div>

      {/* Animation Keyframes */}
      <style>
        {`
          @keyframes fadeInSlideUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
};

export default SignInSignUp;