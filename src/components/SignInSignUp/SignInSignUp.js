import React, { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import bgVideo from '../assets/videos/bg.mp4';
import './SignInSignUp.css';

const SignInSignUp = () => {
  const { login } = useContext(UserContext);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isSignIn, setIsSignIn] = useState(true);

  // State for form inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Toggle between dark and light mode
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Theme-based styles
  const themeStyles = {
    backgroundColor: isDarkMode ? '#1e1e1e' : '#f8f9fa',
    textColor: isDarkMode ? '#fff' : '#000',
    cardBackground: isDarkMode ? 'rgba(44, 44, 44, 0.8)' : 'rgba(255, 255, 255, 0.8)',
    cardTextColor: isDarkMode ? '#fff' : '#000',
    inputBackground: isDarkMode ? '#444' : '#ddd',
    inputTextColor: isDarkMode ? '#fff' : '#000',
    buttonBackground: isDarkMode ? '#3CA9D1' : '#3CA9D1',
    buttonTextColor: isDarkMode ? '#fff' : '#000',
    linkColor: isDarkMode ? '#3CA9D1' : '#3CA9D1',
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
    backdropFilter: 'blur(0.5px)',
    transition: '1s ease',
    animation: isSignIn ? 'fadeInSlideUp 0.5s ease' : 'fadeInSlideUp 0.5s ease',
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
    transition: 'all 0.3s ease',
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulate user data (replace with actual API call)
    const userDetails = {
      name: isSignIn ? 'John Doe' : fullName, // Use fullName for sign-up
      email: email,
      profilePic: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrCLHZeA--7ckaEIUPD-Z0XASJ5BxYQYLsdA&s',
      enrolledCourses: [
        { courseId: 'C001', title: 'Introduction to Python Programming', progress: 75 },
        { courseId: 'C003', title: 'Web Development Fundamentals', progress: 50 },
        { courseId: 'C005', title: 'SQL for Beginners', progress: 90 },
      ],
    };

    // Log in the user
    login(userDetails);
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
              <input
                type="email"
                placeholder="Email"
                style={inputStyle}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                style={inputStyle}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                style={inputStyle}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Email"
                style={inputStyle}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                style={inputStyle}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Confirm Password"
                style={inputStyle}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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