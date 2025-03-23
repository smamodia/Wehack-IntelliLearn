import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTasks,
  faCheckCircle,
  faPlayCircle,
  faSun,
  faMoon,
  faUserCircle,
} from '@fortawesome/free-solid-svg-icons'; // Import icons
import studyMaterials from './studyMaterial.json';
import Sidebar from './Navbar';

const CoursePage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [completedMaterials, setCompletedMaterials] = useState({});
  const [attemptedTests, setAttemptedTests] = useState(0); // Start with 0 attempted tests
  const [completedTests, setCompletedTests] = useState(0); // Start with 0 completed tests

  const courseMaterials = studyMaterials.filter(material => material.course_id === courseId);
  const progress = (Object.keys(completedMaterials).length / courseMaterials.length) * 100;

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const markAsCompleted = (materialId) => {
    setCompletedMaterials(prev => ({
      ...prev,
      [materialId]: true,
    }));
  };

  const handleTakeQuiz = () => {
    // Navigate to the quiz page
    navigate(`/course/${courseId}/quiz`);
  };

  // Function to update test progress after attempting a quiz
  const updateTestProgress = (isCompleted) => {
    setAttemptedTests(prev => prev + 1); // Increment attempted tests
    if (isCompleted) {
      setCompletedTests(prev => prev + 1); // Increment completed tests if the quiz is completed
    }
  };

  const handleAskDoubt = () => {
    navigate('/chatbot'); // Navigate to the chatbot route
  };

  const themeStyles = {
    backgroundColor: isDarkMode ? '#1e1e1e' : '#f8f9fa',
    textColor: isDarkMode ? '#fff' : '#000',
    cardBackground: isDarkMode ? '#2c2c2c' : '#fff',
    cardTextColor: isDarkMode ? '#fff' : '#000',
    progressBarColor: '#3CA9D1',
    progressBarBackground: isDarkMode ? '#444' : '#ddd',
  };

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

        {/* Course Progress Section */}
        <div className="mb-4 p-3" style={{ borderRadius: '10px', backgroundColor: themeStyles.cardBackground }}>
          <h3>
            <FontAwesomeIcon icon={faTasks} className="me-2" /> Course Progress
          </h3>
          <div style={{ width: '100%', backgroundColor: themeStyles.progressBarBackground, borderRadius: '5px', overflow: 'hidden', height: '15px' }}>
            <div
              style={{
                width: `${progress}%`,
                height: '100%',
                backgroundColor: themeStyles.progressBarColor,
                transition: 'width 0.5s ease',
              }}
            />
          </div>
          <p className="mt-2">{Math.round(progress)}% Completed</p>
        </div>

        {/* Test Progress Section */}
        <div className="mb-4 p-3" style={{ borderRadius: '10px', backgroundColor: themeStyles.cardBackground }}>
          <h3>Test Progress</h3>
          <div className="d-flex gap-3">
            <div className="flex-grow-1">
              <div className="d-flex align-items-center gap-2 mb-2">
                <FontAwesomeIcon icon={faCheckCircle} style={{ color: '#28a745' }} />
                <span>Completed Tests</span>
              </div>
              <div style={{ width: '05%', backgroundColor: themeStyles.progressBarBackground, borderRadius: '5px', overflow: 'hidden', height: '15px' }}>
                <div
                  style={{
                    width: `${(completedTests / (completedTests + attemptedTests)) * 100}%`,
                    height: '100%',
                    backgroundColor: '#28a745',
                    transition: 'width 0.5s ease',
                  }}
                />
              </div>
              <p className="mt-2">{completedTests} Completed</p>
            </div>

            <div className="flex-grow-1">
              <div className="d-flex align-items-center gap-2 mb-2">
                <FontAwesomeIcon icon={faPlayCircle} style={{ color: '#ffc107' }} />
                <span>Attempted Tests</span>
              </div>
              <div style={{ width: '100%', backgroundColor: themeStyles.progressBarBackground, borderRadius: '5px', overflow: 'hidden', height: '15px' }}>
                <div
                  style={{
                    width: `${(attemptedTests / (completedTests + attemptedTests)) * 100}%`,
                    height: '100%',
                    backgroundColor: '#ffc107',
                    transition: 'width 0.5s ease',
                  }}
                />
              </div>
              <p className="mt-2">{attemptedTests} Attempted</p>
            </div>
          </div>
        </div>

        {/* Course Materials Section */}
        <div className="row">
          {courseMaterials.map(material => (
            <div key={material.material_id} className="col-md-6 mb-4">
              <div className="card h-100" style={{ backgroundColor: themeStyles.cardBackground, color: themeStyles.cardTextColor }}>
                <div className="card-body">
                  <h4 className="card-title">{material.title}</h4>
                  <p className="card-text">
                    Type: {material.type} | Difficulty: {material.difficulty} | Time Required: {material.time_required_hours} hours
                  </p>
                  {material.type === 'Video' && (
                    <div className="embed-responsive embed-responsive-16by9">
                      <iframe
                        className="embed-responsive-item"
                        src={`https://www.youtube.com/embed/VIDEO_ID`}
                        allowFullScreen
                      />
                    </div>
                  )}
                  {material.type === 'PDF' && (
                    <a href={`/path/to/pdf/${material.material_id}.pdf`} target="_blank" rel="noopener noreferrer">
                      Open PDF
                    </a>
                  )}
                  {material.type === 'Interactive' && (
                    <button className="btn btn-primary" onClick={() => alert('Launch Interactive Content')}>
                      Launch Interactive
                    </button>
                  )}
                  <div className="mt-3">
                    <button
                      className="btn btn-success me-2"
                      onClick={() => markAsCompleted(material.material_id)}
                      disabled={completedMaterials[material.material_id]}
                    >
                      {completedMaterials[material.material_id] ? 'Completed' : 'Mark as Completed'}
                    </button>
                    <button className="btn btn-warning" onClick={handleTakeQuiz}>
                      Take Quiz
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer with Chatbot Link */}
      <footer
        className="p-3 text-center"
        style={{
          backgroundColor: isDarkMode ? '#2c2c2c' : '#f8f9fa',
          borderTop: `1px solid ${isDarkMode ? '#444' : '#ddd'}`,
          position: 'fixed',
          bottom: 0,
          left: '250px',
          right: 0,
        }}
      >
        <div
          className="d-flex align-items-center justify-content-center gap-2"
          style={{ cursor: 'pointer' }}
          onClick={handleAskDoubt}
        >
          <span style={{ fontSize: '1.2rem', color: '#3CA9D1' }}>Ask the Doubt to Chatbot</span>
          <span
            style={{
              fontSize: '1.5rem',
              color: '#3CA9D1',
              transition: 'transform 0.3s ease',
            }}
            className="hover-effect-chat"
          >
            💬
          </span>
        </div>
      </footer>

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

          .hover-effect-chat:hover {
            transform: scale(1.2);
          }

          @media (max-width: 768px) {
            .sidebar {
              display: none;
            }
            .col-md-6 {
              width: 100%;
            }
            footer {
              left: 0;
            }
          }
        `}
      </style>
    </div>
  );
};

export default CoursePage;