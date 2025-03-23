import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import {
  faHome,
  faBook,
  faChartLine,
  faUser,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';

const Sidebar = ({ isDarkMode, themeStyles }) => {
  return (
    <div
      className="sidebar p-3"
      style={{ width: '250px', borderRight: `1px solid ${isDarkMode ? '#444' : '#ddd'}`, backgroundColor: themeStyles.cardBackground }}
    >
      <h3 className="mb-4">IntelliLearn</h3>
      <hr />
      <ul className="nav flex-column gap-2">
        <li className="nav-item">
          <Link
            to="/" // Navigate to the Dashboard (Home)
            className="nav-link hover-effect"
            style={{ color: themeStyles.textColor }}
          >
            <FontAwesomeIcon icon={faHome} className="me-2" /> Home
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/courses" // Navigate to the Courses section
            className="nav-link hover-effect"
            style={{ color: themeStyles.textColor }}
          >
            <FontAwesomeIcon icon={faBook} className="me-2" /> Courses
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/dashboard" // Navigate to the Dashboard
            className="nav-link hover-effect"
            style={{ color: themeStyles.textColor }}
          >
            <FontAwesomeIcon icon={faChartLine} className="me-2" /> Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/login" // Navigate to the Profile
            className="nav-link hover-effect"
            style={{ color: themeStyles.textColor }}
          >
            <FontAwesomeIcon icon={faUser} className="me-2" /> Profile
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/logout" // Navigate to Logout (or handle logout logic)
            className="nav-link hover-effect"
            style={{ color: themeStyles.textColor }}
          >
            <FontAwesomeIcon icon={faSignOutAlt} className="me-2" /> Logout
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;