import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from './Navbar';
import courses from './courses.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesome
import { faSun, faMoon, faUserCircle, faCommentDots } from '@fortawesome/free-solid-svg-icons'; // Import icons

const CourseList = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const navigate = useNavigate();

  const themeStyles = {
    backgroundColor: isDarkMode ? '#1e1e1e' : '#f8f9fa',
    textColor: isDarkMode ? '#fff' : '#000',
    cardBackground: isDarkMode ? '#2c2c2c' : '#fff',
    cardTextColor: isDarkMode ? '#fff' : '#000',
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);

    const filtered = courses.filter(course => {
      const courseTitle = course.title.toLowerCase();
      const courseDifficulty = course.difficulty.toLowerCase();
      return (
        courseTitle.includes(term.toLowerCase()) ||
        courseDifficulty.includes(term.toLowerCase())
      );
    });

    setFilteredCourses(filtered);
  };

  const handleEnroll = (courseId) => {
    setEnrolledCourses(prev => [...prev, courseId]);
    navigate(`/course/${courseId}`);
  };

  useEffect(() => {
    setFilteredCourses(courses);
  }, []);

  return (
    <div
      className="vh-100 d-flex"
      style={{ backgroundColor: themeStyles.backgroundColor, color: themeStyles.textColor }}
    >
      <Sidebar isDarkMode={isDarkMode} themeStyles={themeStyles} />

      <div className="flex-grow-1 p-4 overflow-auto">
        {/* Top Right Section with Day/Night Icons and User Profile */}
        <div className="d-flex justify-content-end mb-4 align-items-center gap-3">
          {/* Day/Night Mode Toggle Icon */}
          <div
            style={{ cursor: 'pointer', color: themeStyles.textColor }}
            onClick={toggleTheme}
          >
            <FontAwesomeIcon
              icon={isDarkMode ? faSun : faMoon} // Show sun icon in dark mode, moon icon in light mode
              size="lg"
            />
          </div>

          {/* User Profile Icon */}
          <div
            style={{ cursor: 'pointer', color: themeStyles.textColor }}
            onClick={() => navigate('/profile')} // Navigate to the user profile page
          >
            <FontAwesomeIcon
              icon={faUserCircle} // User profile icon
              size="lg"
            />
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title, difficulty..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>

        {/* Course List */}
        <div className="container">
          {filteredCourses.map(course => (
            <div
              key={course.course_id}
              className="card mb-3"
              style={{ backgroundColor: themeStyles.cardBackground, color: themeStyles.cardTextColor }}
            >
              <div className="card-body">
                <h3 className="card-title">{course.title}</h3>
                <p className="card-text">{course.description}</p>
                <p className="card-text">
                  Difficulty: {course.difficulty} | Time Required: {course.time_required_hours} hours
                </p>
                <button
                  className="btn btn-primary"
                  onClick={() => handleEnroll(course.course_id)}
                  disabled={enrolledCourses.includes(course.course_id)}
                >
                  {enrolledCourses.includes(course.course_id) ? 'Enrolled' : 'Enroll'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Chat Icon */}
        <div
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            cursor: 'pointer',
            color: themeStyles.textColor,
          }}
          onClick={() => navigate('/chatbot')} // Navigate to the chatbox page
        >
          <FontAwesomeIcon
            icon={faCommentDots} // Chat icon
            size="2x"
          />
        </div>
      </div>

      {/* Inline Styles */}
      <style>
        {`
          .hover-effect {
            padding: 8px 12px;
            border-radius: 4px;
            transition: background-color 0.3s ease, color 0.3s ease;
          }

          .hover-effect:hover {
            background-color: #3CA9D1;
            color: #fff !important;
          }

          .hover-effect.active {
            background-color: #3CA9D1;
            color: #fff !important;
          }

          @media (max-width: 768px) {
            .sidebar {
              display: none;
            }
          }
        `}
      </style>
    </div>
  );
};

export default CourseList;