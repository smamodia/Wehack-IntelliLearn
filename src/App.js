

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProgressTracker from './component/ProgressTracker';
import CoursePage from './component/CoursePage';
import CourseList from './component/CourseList';
import LoginPage from './component/LoginPage';
import QuizSection from './component/QuizSection';
import Chatbot from './component/chatbot';
const courses = [
    {
      name: 'Introduction to Python Programming',
      progress: 75,
      completedQuizzes: 8,
      weakAreas: ['Functions', 'Loops'],
    },
    {
      name: 'Advanced Machine Learning',
      progress: 60,
      completedQuizzes: 5,
      weakAreas: ['Neural Networks', 'Gradient Descent'],
    },
    {
      name: 'Web Development Fundamentals',
      progress: 90,
      completedQuizzes: 10,
      weakAreas: ['Responsive Design'],
    }
  // Add more courses as needed
];

const App = () => {
  return (
    <Router>
      
        <Routes>
          {/* Route for the Dashboard */}
          <Route path="/" element={<CourseList/>} />
          <Route path="/dashboard" element={<ProgressTracker courses={courses} />} />

          {/* Route for the Courses section */}
          <Route path="/courses" element={<CourseList/>} />
          <Route path="/course/:courseId" element={<CoursePage />} />
          <Route path="/course/:courseId/quiz" element={<QuizSection />} />       
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/chatbot" element={<Chatbot />} />
          {/* Add more routes as needed */}
        </Routes>
    </Router>
  );
};

export default App;


// function App() {
//   return (
//     <div>
//       <ProgressTracker courses={courses} />
//       {/* return <CoursePage courseId="C001" studyMaterials={studyMaterials} />; */}
//     </div>
//   );
// }

// export default App;