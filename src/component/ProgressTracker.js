import React, { useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import Calendar from 'react-calendar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesome
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons'; // Import sun and moon icons
import 'react-circular-progressbar/dist/styles.css';
import 'react-calendar/dist/Calendar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from './Navbar';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ProgressTracker = ({ courses }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activityDates, setActivityDates] = useState({});

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const markDateAsActive = (date, courseId) => {
    const dateString = date.toISOString().split('T')[0];
    setActivityDates((prev) => ({
      ...prev,
      [dateString]: {
        ...prev[dateString],
        [courseId]: true,
      },
    }));
  };

  const themeStyles = {
    backgroundColor: isDarkMode ? '#1e1e1e' : '#f8f9fa',
    textColor: isDarkMode ? '#fff' : '#000',
    cardBackground: isDarkMode ? '#2c2c2c' : '#fff',
    cardTextColor: isDarkMode ? '#fff' : '#000',
    sidebarBackground: isDarkMode ? '#1e1e1e' : '#f8f9fa',
    sidebarBorder: isDarkMode ? '#444' : '#ddd',
    progressBarPathColor: isDarkMode ? '#3CA9D1' : '#3CA9D1',
    progressBarTrailColor: isDarkMode ? '#444' : '#ddd',
    chartTextColor: isDarkMode ? '#fff' : '#000',
    chartGridColor: isDarkMode ? '#444' : '#ddd',
    calendarBackground: isDarkMode ? '#2c2c2c' : '#fff',
    calendarTextColor: isDarkMode ? '#fff' : '#000',
  };

  const cardStyle = {
    width: '100%',
    maxWidth: '22rem',
    backgroundColor: themeStyles.cardBackground,
    transition: 'transform 0.3s ease, box-shadow 0.3s ease, color 0.3s ease',
    color: themeStyles.cardTextColor,
  };

  const cardHoverStyle = {
    transform: 'translateY(-10px)',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)',
    color: '#3CA9D1',
  };

  const getChartData = (course) => {
    return {
      labels: ['Progress', 'Remaining'],
      datasets: [
        {
          label: 'Course Progress',
          data: [course.progress, 100 - course.progress],
          backgroundColor: ['#3CA9D1', themeStyles.progressBarTrailColor],
          borderColor: ['#3CA9D1', themeStyles.progressBarTrailColor],
          borderWidth: 1,
        },
      ],
    };
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Progress Overview',
        color: themeStyles.chartTextColor,
      },
    },
    scales: {
      x: {
        ticks: {
          color: themeStyles.chartTextColor,
        },
        grid: {
          color: themeStyles.chartGridColor,
        },
      },
      y: {
        ticks: {
          color: themeStyles.chartTextColor,
        },
        grid: {
          color: themeStyles.chartGridColor,
        },
      },
    },
  };

  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const dateString = date.toISOString().split('T')[0];
      return (
        <div style={{ display: 'flex', gap: '2px', justifyContent: 'center' }}>
          {courses.map((course) => {
            const isActive = activityDates[dateString]?.[course.id];
            return (
              <div
                key={course.id}
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: isActive ? '#28a745' : '#F44336', // Green for active, red for inactive
                }}
              />
            );
          })}
        </div>
      );
    }
    return null;
  };

  return (
    <div
      className="vh-100 d-flex"
      style={{ backgroundColor: themeStyles.backgroundColor, color: themeStyles.textColor }}
    >
      <Sidebar isDarkMode={isDarkMode} themeStyles={themeStyles} />

      <div className="flex-grow-1 p-4 overflow-auto">
        {/* Theme Toggle Icon */}
        <div className="d-flex justify-content-end mb-4">
          <button
            className="btn btn-link"
            onClick={toggleTheme}
            style={{ color: themeStyles.textColor }}
          >
            <FontAwesomeIcon
              icon={isDarkMode ? faSun : faMoon} // Show sun icon in dark mode, moon icon in light mode
              size="lg"
            />
          </button>
        </div>

        <h1 className="mb-4">Student Progress Tracker</h1>

        <div className="container d-flex flex-wrap justify-content-center align-items-center gap-4 py-4">
          {courses.map((course, index) => (
            <div
              key={index}
              className="card"
              style={cardStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = cardHoverStyle.transform;
                e.currentTarget.style.boxShadow = cardHoverStyle.boxShadow;
                e.currentTarget.style.color = cardHoverStyle.color;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.color = themeStyles.cardTextColor;
              }}
            >
              <div className="card-body text-center">
                <h3 className="card-title mb-3">{course.name}</h3>
                <div style={{ width: '150px', margin: '0 auto', position: 'relative' }}>
                  <CircularProgressbar
                    value={course.progress}
                    text={`${course.progress}%`}
                    styles={buildStyles({
                      pathTransitionDuration: 1,
                      pathColor: themeStyles.progressBarPathColor,
                      textColor: themeStyles.textColor,
                      trailColor: themeStyles.progressBarTrailColor,
                      textSize: '16px',
                    })}
                  />
                  <style>
                    {`
                      @keyframes rotatePath {
                        from {
                          transform: rotate(0deg);
                        }
                        to {
                          transform: rotate(360deg);
                        }
                      }
                      .CircularProgressbar-path {
                        animation: rotatePath 5s;
                        transform-origin: center center;
                      }
                    `}
                  </style>
                </div>
                <div className="mt-3">
                  <p className="mb-1">Completed Quizzes: {course.completedQuizzes}</p>
                  <p className="mb-0">Weak Areas: {course.weakAreas.join(', ')}</p>
                </div>
                <div className="mt-4">
                  <Bar data={getChartData(course)} options={chartOptions} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="card mt-4" style={{ backgroundColor: themeStyles.cardBackground, color: themeStyles.cardTextColor }}>
          <div className="card-body">
            <h3 className="card-title mb-4 ">Activity Calendar</h3>
            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Calendar
                onChange={(date) => markDateAsActive(date, courses[0].id)}
                value={new Date()}
                tileContent={tileContent}
                className="react-calendar"
                style={{
                  backgroundColor: themeStyles.calendarBackground,
                  color: themeStyles.calendarTextColor,
                  border: `1px solid ${themeStyles.sidebarBorder}`,
                  borderRadius: '8px',
                  padding: '10px',
                  width: '100%',
                  maxWidth: '400px',
                }}
                tileClassName={({ date }) => {
                  const dateString = date.toISOString().split('T')[0];
                  return activityDates[dateString] ? 'active-date' : '';
                }}
                view="month"
                showDoubleView
              />
            </div>
          </div>
        </div>
      </div>

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

          .react-calendar {
            width: 100%;
            max-width: 800px;
            margin: 0 auto;
          }

          .react-calendar__tile {
            padding: 10px;
            border-radius: 4px;
          }

          .react-calendar__tile--active {
            background-color: #3CA9D1 !important;
            color: #fff !important;
          }

          .react-calendar__tile--now {
            background-color: #ffeb3b !important;
            color: #000 !important;
          }

          .react-calendar__navigation {
            margin-bottom: 10px;
          }

          .react-calendar__navigation button {
            background-color: transparent;
            color: ${themeStyles.calendarTextColor};
            border: none;
            font-size: 16px;
          }

          .react-calendar__navigation button:hover {
            background-color: #3CA9D1;
            color: #fff;
          }

          .react-calendar__month-view__weekdays {
            text-transform: uppercase;
            font-size: 12px;
            color: ${themeStyles.calendarTextColor};
          }

          .react-calendar__month-view__days__day--weekend {
            color: #f44336;
          }

          .active-date {
            background-color: #28a745 !important; /* Green for active dates */
            color: #fff !important;
          }

          @media (max-width: 768px) {
            .sidebar {
              display: none;
            }
            .card {
              width: 100%;
            }
            .react-calendar {
              max-width: 100%;
            }
          }
        `}
      </style>
    </div>
  );
};

export default ProgressTracker;