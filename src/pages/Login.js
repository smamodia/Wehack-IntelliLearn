import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesomeIcon
import { faSignInAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons'; // Import icons
import bgVideo from './bg.mp4'; // Import background video

const SignInSignUp = ({ onLogin }) => {
  // State to manage theme (light/dark)
  const [isDarkMode, setIsDarkMode] = useState(true);

  // State to toggle between Sign In and Sign Up
  const [isSignIn, setIsSignIn] = useState(true);

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
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your authentication logic here (e.g., API call)
    // For now, simulate a successful login
    onLogin(); // Call the onLogin function passed from App.js
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

      {/* Theme Toggle Button */}
      <button
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          backgroundColor: themeStyles.buttonBackground,
          color: themeStyles.buttonTextColor,
          border: 'none',
          borderRadius: '5px',
          padding: '10px 20px',
          cursor: 'pointer',
          zIndex: 2,
        }}
        onClick={toggleTheme}
      >
        Switch to {isDarkMode ? 'Light' : 'Dark'} Mode
      </button>

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
              <input type="email" placeholder="Email" style={inputStyle} required />
              <input type="password" placeholder="Password" style={inputStyle} required />
              <button type="submit" style={buttonStyle}>
                Sign In
              </button>
            </>
          ) : (
            <>
              <h2>Sign Up</h2>
              <input type="text" placeholder="Full Name" style={inputStyle} required />
              <input type="email" placeholder="Email" style={inputStyle} required />
              <input type="password" placeholder="Password" style={inputStyle} required />
              <input type="password" placeholder="Confirm Password" style={inputStyle} required />
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