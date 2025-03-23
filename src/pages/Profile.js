import React, { useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const initialUser = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  profilePic: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrCLHZeA--7ckaEIUPD-Z0XASJ5BxYQYLsdA&s', // Placeholder image URL
  enrolledCourses: [
    { courseId: 'C001', title: 'Introduction to Python Programming', progress: 75 },
    { courseId: 'C003', title: 'Web Development Fundamentals', progress: 90 },
    { courseId: 'C002', title: 'Advanced Machine Learning', progress: 60 },
  ],
};

const UserProfile = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const [user, setUser] = useState(initialUser);
  const [isEditing, setIsEditing] = useState(false);

  const themeStyles = {
    backgroundColor: isDarkMode ? '#1e1e1e' : '#f8f9fa',
    textColor: isDarkMode ? '#fff' : '#000',
    cardBackground: isDarkMode ? '#2c2c2c' : '#fff',
    cardTextColor: isDarkMode ? '#fff' : '#000',
    progressBarPathColor: isDarkMode ? '#3CA9D1' : '#3CA9D1',
    progressBarTrailColor: isDarkMode ? '#444' : '#ddd',
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleProfilePicUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser({
          ...user,
          profilePic: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
  };

  return (
    <div
      className="vh-100 d-flex"
      style={{ backgroundColor: themeStyles.backgroundColor, color: themeStyles.textColor }}
    >
      {/* Vertical Sidebar */}
      <div
        className="sidebar p-3"
        style={{ width: '250px', borderRight: `1px solid ${isDarkMode ? '#444' : '#ddd'}`, backgroundColor: themeStyles.cardBackground }}
      >
        <h3 className="mb-4">IntelliLearn</h3>
        <hr/>
        <ul className="nav flex-column gap-2">
          <li className="nav-item">
            <a className="nav-link hover-effect" href="#" style={{ color: themeStyles.textColor }}>
              Home
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link hover-effect" href="#" style={{ color: themeStyles.textColor }}>
              Courses
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link hover-effect" href="#" style={{ color: themeStyles.textColor }}>
              Dashboard
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link active hover-effect" href="#" style={{ color: themeStyles.textColor }}>
              Profile
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link hover-effect" href="#" style={{ color: themeStyles.textColor }}>
              Logout
            </a>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 p-4 overflow-auto">
        {/* Theme Toggle Button */}
        <div className="d-flex justify-content-end mb-4">
          <button className="btn btn-primary" onClick={toggleTheme}>
            Switch to {isDarkMode ? 'Light' : 'Dark'} Mode
          </button>
        </div>

        {/* User Profile Section */}
        <div className="mb-4">
          <h2>User Profile</h2>
          <div className="d-flex align-items-center gap-4">
            <img
              src={user.profilePic}
              alt="Profile"
              className="rounded-circle"
              style={{ width: '100px', height: '100px' }}
            />
            <div>
              {isEditing ? (
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      value={user.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={user.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="profilePic" className="form-label">Profile Picture</label>
                    <input
                      type="file"
                      className="form-control"
                      id="profilePic"
                      name="profilePic"
                      accept="image/*"
                      onChange={handleProfilePicUpload}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">Save</button>
                  <button type="button" className="btn btn-secondary ms-2" onClick={() => setIsEditing(false)}>Cancel</button>
                </form>
              ) : (
                <>
                  <h3>{user.name}</h3>
                  <p className="mb-0">{user.email}</p>
                  <button className="btn btn-primary mt-3" onClick={() => setIsEditing(true)}>
                    Edit Profile
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Enrolled Courses Section */}
        <div className="mb-4">
          <h3>Enrolled Courses</h3>
          {user.enrolledCourses.map(course => (
            <div key={course.courseId} className="card mb-3" style={{ backgroundColor: themeStyles.cardBackground, color: themeStyles.cardTextColor }}>
              <div className="card-body">
                <h4 className="card-title">{course.title}</h4>
                <div style={{ width: '100px', marginBottom: '10px' }}>
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
                </div>
                <p className="card-text">Progress: {course.progress}%</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Custom CSS for Sidebar Links */}
      <style>
        {`
          /* Hover effect for sidebar links */
          .hover-effect {
            padding: 8px 12px;
            border-radius: 4px;
            transition: background-color 0.3s ease, color 0.3s ease;
          }

          .hover-effect:hover {
            background-color: #3CA9D1; /* Sky blue background on hover */
            color: #fff !important; /* White text on hover */
          }

          /* Active link styling */
          .hover-effect.active {
            background-color: #3CA9D1; /* Sky blue background for active link */
            color: #fff !important; /* White text for active link */
          }

          /* Responsive adjustments */
          @media (max-width: 768px) {
            .sidebar {
              display: none; /* Hide sidebar on small screens */
            }
          }
        `}
      </style>
    </div>
  );
};

export default UserProfile;