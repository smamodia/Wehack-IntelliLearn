// import React, { useState, useEffect } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import Navbar from '../components/Navbar'; // Import the Navbar component
// import courses from '../courses.json';

// const CourseList = () => {
//   const [isDarkMode, setIsDarkMode] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filteredCourses, setFilteredCourses] = useState([]);
//   const [enrolledCourses, setEnrolledCourses] = useState([]);

//   const themeStyles = {
//     backgroundColor: isDarkMode ? '#1e1e1e' : '#f8f9fa',
//     textColor: isDarkMode ? '#fff' : '#000',
//     cardBackground: isDarkMode ? '#2c2c2c' : '#fff',
//     cardTextColor: isDarkMode ? '#fff' : '#000',
//   };

//   const toggleTheme = () => {
//     setIsDarkMode(!isDarkMode);
//   };

//   const handleSearch = (event) => {
//     const term = event.target.value;
//     setSearchTerm(term);

//     const filtered = courses.filter(course => {
//       const courseTitle = course.title.toLowerCase();
//       const courseDifficulty = course.difficulty.toLowerCase();
//       return (
//         courseTitle.includes(term.toLowerCase()) ||
//         courseDifficulty.includes(term.toLowerCase())
//       );
//     });

//     setFilteredCourses(filtered);
//   };

//   const handleEnroll = (courseId) => {
//     setEnrolledCourses(prev => [...prev, courseId]);
//   };

//   useEffect(() => {
//     setFilteredCourses(courses);
//   }, []);

//   return (
//     <div
//       className="vh-100 d-flex"
//       style={{ backgroundColor: themeStyles.backgroundColor, color: themeStyles.textColor }}
//     >
//       {/* Use the Navbar component */}
//       <Navbar isDarkMode={isDarkMode} themeStyles={themeStyles} />

//       {/* Main Content */}
//       <div className="flex-grow-1 p-4 overflow-auto">
//         {/* Theme Toggle Button */}
//         <div className="d-flex justify-content-end mb-4">
//           <button className="btn btn-primary" onClick={toggleTheme}>
//             Switch to {isDarkMode ? 'Light' : 'Dark'} Mode
//           </button>
//         </div>

//         {/* Search/Filter Bar */}
//         <div className="mb-4">
//           <input
//             type="text"
//             className="form-control"
//             placeholder="Search by title, difficulty..."
//             value={searchTerm}
//             onChange={handleSearch}
//           />
//         </div>

//         {/* Course List */}
//         <div className="container">
//           {filteredCourses.map(course => (
//             <div key={course.course_id} className="card mb-3" style={{ backgroundColor: themeStyles.cardBackground, color: themeStyles.cardTextColor }}>
//               <div className="card-body">
//                 <h3 className="card-title">{course.title}</h3>
//                 <p className="card-text">
//                   {course.description}
//                 </p>
//                 <p className="card-text">
//                   Difficulty: {course.difficulty} | Time Required: {course.time_required_hours} hours
//                 </p>
//                 <button
//                   className="btn btn-primary"
//                   onClick={() => handleEnroll(course.course_id)}
//                   disabled={enrolledCourses.includes(course.course_id)}
//                 >
//                   {enrolledCourses.includes(course.course_id) ? 'Enrolled' : 'Enroll'}
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CourseList;











import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 

import courses from '../courses.json';

const CourseList = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCourses, setFilteredCourses] = useState([]);

  const [enrolledCourses, setEnrolledCourses] = useState([]);

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
  };

  useEffect(() => {
    setFilteredCourses(courses);
  }, []);

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
            <a className="nav-link active hover-effect" href="#" style={{ color: themeStyles.textColor }}>
              Dashboard
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link hover-effect" href="#" style={{ color: themeStyles.textColor }}>
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

        {/* Search/Filter Bar */}
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
            <div key={course.course_id} className="card mb-3" style={{ backgroundColor: themeStyles.cardBackground, color: themeStyles.cardTextColor }}>
              <div className="card-body">
                <h3 className="card-title">{course.title}</h3>
                <p className="card-text">
                  {course.description}
                </p>
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

export default CourseList;