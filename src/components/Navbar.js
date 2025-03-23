// import { Link } from "react-router-dom";

// const Navbar = () => {
//   return (
//     <nav className="p-4 bg-blue-500 text-white flex gap-4">
//       <Link to="/">Home</Link>
//       <Link to="/courses">Courses</Link>
//       <Link to="/dashboard">Dashboard</Link>
//       <Link to="/profile">Profile</Link>
//     </nav>
//   );
// };

// export default Navbar;
import { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = () => {

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" to="/">IntelliLearn</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link text-dark" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-dark" to="/courses">Courses</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-dark" to="/dashboard">Dashboard</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-dark" to="/profile">Profile</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
















// import React from 'react';

// const Navbar = ({ isDarkMode, themeStyles }) => {
//   return (
//     <div
//       className="sidebar p-3"
//       style={{ width: '250px', borderRight: `1px solid ${isDarkMode ? '#444' : '#ddd'}`, backgroundColor: themeStyles.cardBackground }}
//     >
//       <h3 className="mb-4">IntelliLearn</h3>
//       <hr />
//       <ul className="nav flex-column gap-2">
//         <li className="nav-item">
//           <a className="nav-link hover-effect" href="#" style={{ color: themeStyles.textColor }}>
//             Home
//           </a>
//         </li>
//         <li className="nav-item">
//           <a className="nav-link hover-effect" href="#" style={{ color: themeStyles.textColor }}>
//             Courses
//           </a>
//         </li>
//         <li className="nav-item">
//           <a className="nav-link active hover-effect" href="#" style={{ color: themeStyles.textColor }}>
//             Dashboard
//           </a>
//         </li>
//         <li className="nav-item">
//           <a className="nav-link hover-effect" href="#" style={{ color: themeStyles.textColor }}>
//             Profile
//           </a>
//         </li>
//         <li className="nav-item">
//           <a className="nav-link hover-effect" href="#" style={{ color: themeStyles.textColor }}>
//             Logout
//           </a>
//         </li>
//       </ul>

//       {/* Custom CSS for Sidebar Links */}
//       <style>
//         {`
//           /* Hover effect for sidebar links */
//           .hover-effect {
//             padding: 8px 12px;
//             border-radius: 4px;
//             transition: background-color 0.3s ease, color 0.3s ease;
//           }

//           .hover-effect:hover {
//             background-color: #3CA9D1; /* Sky blue background on hover */
//             color: #fff !important; /* White text on hover */
//           }

//           /* Active link styling */
//           .hover-effect.active {
//             background-color: #3CA9D1; /* Sky blue background for active link */
//             color: #fff !important; /* White text for active link */
//           }

//           /* Responsive adjustments */
//           @media (max-width: 768px) {
//             .sidebar {
//               display: none; /* Hide sidebar on small screens */
//             }
//           }
//         `}
//       </style>
//     </div>
//   );
// };

// export default Navbar;